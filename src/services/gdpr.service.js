const { Database, logger } = require('../database/postgres');
const crypto = require('crypto');
const fs = require('fs').promises;
const path = require('path');
const archiver = require('archiver');

/**
 * GDPR Compliance Service - Handles data privacy and compliance requirements
 */
class GDPRService {
    /**
     * Export all user data (Right to Data Portability)
     * @param {string} userId - User ID requesting data
     * @param {string} organizationId - Organization ID
     * @returns {Promise<Object>} Export details
     */
    async exportUserData(userId, organizationId) {
        try {
            logger.info('Starting GDPR data export', { userId, organizationId });

            const exportData = {
                exportDate: new Date().toISOString(),
                userId,
                organizationId,
                data: {}
            };

            // 1. User Profile Data
            exportData.data.profile = await Database.getOne(
                'SELECT * FROM users WHERE id = $1',
                [userId]
            );
            delete exportData.data.profile.password_hash; // Remove sensitive data

            // 2. Organization Membership
            exportData.data.membership = await Database.getOne(
                `SELECT om.*, o.name as org_name 
                 FROM organization_members om
                 JOIN organizations o ON om.organization_id = o.id
                 WHERE om.user_id = $1 AND om.organization_id = $2`,
                [userId, organizationId]
            );

            // 3. Worksheets Created
            exportData.data.worksheets = await Database.getMany(
                'SELECT * FROM worksheets WHERE created_by = $1 AND organization_id = $2',
                [userId, organizationId]
            );

            // 4. Analyses Performed
            exportData.data.analyses = await Database.getMany(
                'SELECT * FROM analyses WHERE created_by = $1 AND organization_id = $2',
                [userId, organizationId]
            );

            // 5. Reports Generated
            exportData.data.reports = await Database.getMany(
                'SELECT * FROM reports WHERE generated_by = $1 AND organization_id = $2',
                [userId, organizationId]
            );

            // 6. Documents Uploaded
            exportData.data.documents = await Database.getMany(
                'SELECT * FROM documents WHERE uploaded_by = $1 AND organization_id = $2',
                [userId, organizationId]
            );

            // 7. Activity Logs
            exportData.data.activities = await Database.getMany(
                'SELECT * FROM audit_logs WHERE user_id = $1 AND organization_id = $2',
                [userId, organizationId]
            );

            // 8. Sessions
            exportData.data.sessions = await Database.getMany(
                'SELECT id, device_name, ip_address, created_at, last_activity_at FROM sessions WHERE user_id = $1',
                [userId]
            );

            // Create export file
            const exportId = crypto.randomUUID();
            const filename = `gdpr-export-${userId}-${Date.now()}.json`;
            const filepath = path.join(__dirname, '../../exports', filename);
            
            await fs.mkdir(path.dirname(filepath), { recursive: true });
            await fs.writeFile(filepath, JSON.stringify(exportData, null, 2));

            // Log the export
            await Database.insert('gdpr_requests', {
                id: exportId,
                user_id: userId,
                organization_id: organizationId,
                request_type: 'data_export',
                status: 'completed',
                file_path: filepath,
                completed_at: new Date()
            });

            logger.info('GDPR data export completed', { exportId, userId });

            return {
                exportId,
                filename,
                filepath,
                recordCount: Object.values(exportData.data).reduce(
                    (sum, data) => sum + (Array.isArray(data) ? data.length : 1), 0
                ),
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
            };
        } catch (error) {
            logger.error('GDPR data export failed:', error);
            throw error;
        }
    }

    /**
     * Delete all user data (Right to Erasure / Right to be Forgotten)
     * @param {string} userId - User ID to delete
     * @param {string} organizationId - Organization ID
     * @param {Object} options - Deletion options
     * @returns {Promise<Object>} Deletion summary
     */
    async deleteUserData(userId, organizationId, options = {}) {
        const {
            reason = 'User requested deletion',
            retainAnonymized = true,
            confirmDeletion = false
        } = options;

        if (!confirmDeletion) {
            throw new Error('Deletion must be explicitly confirmed with confirmDeletion: true');
        }

        try {
            logger.warn('Starting GDPR data deletion', { userId, organizationId, reason });

            const deletionSummary = {
                userId,
                organizationId,
                reason,
                deletedAt: new Date(),
                deletedRecords: {}
            };

            await Database.transaction(async (client) => {
                // 1. Anonymize or delete worksheets
                if (retainAnonymized) {
                    const worksheets = await Database.update(
                        'worksheets',
                        { 
                            created_by: null,
                            data: Database.query(`jsonb_set(data, '{anonymized}', 'true')`)
                        },
                        { created_by: userId, organization_id: organizationId }
                    );
                    deletionSummary.deletedRecords.worksheets = worksheets.length;
                } else {
                    const result = await Database.delete('worksheets', {
                        created_by: userId,
                        organization_id: organizationId
                    });
                    deletionSummary.deletedRecords.worksheets = result;
                }

                // 2. Anonymize analyses
                const analyses = await Database.update(
                    'analyses',
                    { created_by: null },
                    { created_by: userId, organization_id: organizationId }
                );
                deletionSummary.deletedRecords.analyses = analyses.length;

                // 3. Anonymize reports
                const reports = await Database.update(
                    'reports',
                    { generated_by: null },
                    { generated_by: userId, organization_id: organizationId }
                );
                deletionSummary.deletedRecords.reports = reports.length;

                // 4. Delete documents (mark as deleted, don't actually remove)
                const documents = await Database.update(
                    'documents',
                    { 
                        deleted_at: new Date(),
                        deleted_by: userId
                    },
                    { uploaded_by: userId, organization_id: organizationId }
                );
                deletionSummary.deletedRecords.documents = documents.length;

                // 5. Remove from organization
                await Database.delete('organization_members', {
                    user_id: userId,
                    organization_id: organizationId
                });

                // 6. Delete sessions
                const sessions = await Database.delete('sessions', {
                    user_id: userId
                });
                deletionSummary.deletedRecords.sessions = sessions;

                // 7. Anonymize audit logs
                await Database.update(
                    'audit_logs',
                    { 
                        user_id: null,
                        metadata: Database.query(`jsonb_set(metadata, '{anonymized}', 'true')`)
                    },
                    { user_id: userId, organization_id: organizationId }
                );

                // 8. If user has no other organizations, delete account
                const otherOrgs = await Database.getMany(
                    'SELECT * FROM organization_members WHERE user_id = $1',
                    [userId]
                );

                if (otherOrgs.length === 0) {
                    // Soft delete user account
                    await Database.update(
                        'users',
                        {
                            email: `deleted-${userId}@deleted.com`,
                            first_name: 'Deleted',
                            last_name: 'User',
                            is_active: false,
                            deleted_at: new Date()
                        },
                        { id: userId }
                    );
                    deletionSummary.accountDeleted = true;
                }

                // Log the deletion
                await Database.insert('gdpr_requests', {
                    user_id: userId,
                    organization_id: organizationId,
                    request_type: 'data_deletion',
                    status: 'completed',
                    metadata: deletionSummary,
                    completed_at: new Date()
                });
            });

            logger.info('GDPR data deletion completed', deletionSummary);
            return deletionSummary;
        } catch (error) {
            logger.error('GDPR data deletion failed:', error);
            throw error;
        }
    }

    /**
     * Get user consent status
     * @param {string} userId - User ID
     * @returns {Promise<Object>} Consent status
     */
    async getConsentStatus(userId) {
        const consents = await Database.getMany(
            `SELECT * FROM user_consents 
             WHERE user_id = $1 
             ORDER BY created_at DESC`,
            [userId]
        );

        const currentConsents = {};
        const consentTypes = [
            'terms_of_service',
            'privacy_policy',
            'marketing_emails',
            'data_processing',
            'cookies',
            'analytics'
        ];

        for (const type of consentTypes) {
            const consent = consents.find(c => c.consent_type === type);
            currentConsents[type] = {
                consented: consent?.consented || false,
                consentedAt: consent?.created_at,
                version: consent?.version || '1.0'
            };
        }

        return currentConsents;
    }

    /**
     * Update user consent
     * @param {string} userId - User ID
     * @param {Object} consents - Consent updates
     * @returns {Promise<void>}
     */
    async updateConsent(userId, consents) {
        for (const [type, consented] of Object.entries(consents)) {
            await Database.insert('user_consents', {
                user_id: userId,
                consent_type: type,
                consented: consented,
                version: '1.0',
                ip_address: consents.ipAddress,
                user_agent: consents.userAgent
            });
        }

        // Log consent update
        await Database.insert('audit_logs', {
            user_id: userId,
            action: 'consent_updated',
            resource_type: 'consent',
            metadata: consents
        });
    }

    /**
     * Process data retention
     * @returns {Promise<Object>} Retention summary
     */
    async processDataRetention() {
        const retentionPolicies = {
            audit_logs: 365 * 2, // 2 years
            sessions: 90,        // 90 days
            documents: 365 * 3,  // 3 years
            reports: 365 * 5,    // 5 years
            analyses: 365 * 5    // 5 years
        };

        const summary = {};

        for (const [table, days] of Object.entries(retentionPolicies)) {
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - days);

            let result;
            if (table === 'documents') {
                // Soft delete for documents
                result = await Database.update(
                    table,
                    { deleted_at: new Date() },
                    Database.query(`created_at < $1 AND deleted_at IS NULL`, [cutoffDate])
                );
            } else if (table === 'audit_logs' || table === 'sessions') {
                // Hard delete for logs and sessions
                result = await Database.delete(
                    table,
                    Database.query(`created_at < $1`, [cutoffDate])
                );
            } else {
                // Archive for reports and analyses
                result = await Database.update(
                    table,
                    { archived: true },
                    Database.query(`created_at < $1`, [cutoffDate])
                );
            }

            summary[table] = result;
        }

        logger.info('Data retention processing completed', summary);
        return summary;
    }

    /**
     * Get data processing activities
     * @param {string} organizationId - Organization ID
     * @returns {Promise<Object>} Processing activities
     */
    async getDataProcessingActivities(organizationId) {
        const activities = {
            purposes: [
                {
                    name: 'Service Provision',
                    description: 'Processing data to provide the ScaleOps6 platform services',
                    lawfulBasis: 'Contract',
                    dataCategories: ['Profile', 'Worksheets', 'Analyses'],
                    retention: '5 years after account closure'
                },
                {
                    name: 'Analytics',
                    description: 'Analyzing usage patterns to improve the platform',
                    lawfulBasis: 'Legitimate Interest',
                    dataCategories: ['Usage Data', 'Performance Metrics'],
                    retention: '2 years'
                },
                {
                    name: 'Security',
                    description: 'Ensuring platform security and preventing fraud',
                    lawfulBasis: 'Legal Obligation',
                    dataCategories: ['Audit Logs', 'Access Logs'],
                    retention: '2 years'
                }
            ],
            dataSubjects: ['Users', 'Organization Members'],
            recipients: [
                {
                    name: 'AWS',
                    purpose: 'Cloud Infrastructure',
                    location: 'United States',
                    safeguards: 'Standard Contractual Clauses'
                }
            ],
            internationalTransfers: [
                {
                    country: 'United States',
                    mechanism: 'Standard Contractual Clauses',
                    safeguards: 'Encryption, Access Controls'
                }
            ]
        };

        return activities;
    }

    /**
     * Generate privacy report
     * @param {string} organizationId - Organization ID
     * @returns {Promise<Object>} Privacy report
     */
    async generatePrivacyReport(organizationId) {
        const report = {
            generatedAt: new Date(),
            organizationId,
            dataInventory: {},
            consentRecords: {},
            retentionCompliance: {},
            accessRequests: {},
            deletionRequests: {}
        };

        // Data inventory
        report.dataInventory = await Database.getOne(`
            SELECT 
                COUNT(DISTINCT user_id) as users,
                COUNT(DISTINCT id) as worksheets,
                COUNT(DISTINCT id) as analyses,
                COUNT(DISTINCT id) as reports
            FROM (
                SELECT user_id FROM organization_members WHERE organization_id = $1
            ) users,
            (SELECT id FROM worksheets WHERE organization_id = $1) worksheets,
            (SELECT id FROM analyses WHERE organization_id = $1) analyses,
            (SELECT id FROM reports WHERE organization_id = $1) reports
        `, [organizationId]);

        // GDPR requests
        report.accessRequests = await Database.getMany(
            `SELECT * FROM gdpr_requests 
             WHERE organization_id = $1 AND request_type = 'data_export'
             ORDER BY created_at DESC LIMIT 10`,
            [organizationId]
        );

        report.deletionRequests = await Database.getMany(
            `SELECT * FROM gdpr_requests 
             WHERE organization_id = $1 AND request_type = 'data_deletion'
             ORDER BY created_at DESC LIMIT 10`,
            [organizationId]
        );

        return report;
    }

    /**
     * Handle data breach notification
     * @param {Object} breachData - Breach details
     * @returns {Promise<Object>} Breach record
     */
    async reportDataBreach(breachData) {
        const {
            organizationId,
            description,
            affectedUsers,
            dataCategories,
            severity,
            discoveredAt,
            actions
        } = breachData;

        const breach = await Database.insert('data_breaches', {
            organization_id: organizationId,
            description,
            affected_users: affectedUsers,
            data_categories: dataCategories,
            severity,
            discovered_at: discoveredAt,
            actions_taken: actions,
            reported_to_authorities: false,
            users_notified: false
        });

        // If high severity, trigger notifications
        if (severity === 'high') {
            // Notify authorities within 72 hours
            // Notify affected users
            logger.error('High severity data breach reported', breach);
        }

        return breach;
    }
}

// Create GDPR tables if not exists
const createGDPRTables = async () => {
    try {
        await Database.query(`
            CREATE TABLE IF NOT EXISTS gdpr_requests (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                user_id UUID REFERENCES users(id),
                organization_id UUID REFERENCES organizations(id),
                request_type VARCHAR(50),
                status VARCHAR(50),
                file_path TEXT,
                metadata JSONB,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                completed_at TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS user_consents (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                user_id UUID REFERENCES users(id),
                consent_type VARCHAR(50),
                consented BOOLEAN,
                version VARCHAR(20),
                ip_address INET,
                user_agent TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS data_breaches (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                organization_id UUID REFERENCES organizations(id),
                description TEXT,
                affected_users INTEGER,
                data_categories TEXT[],
                severity VARCHAR(20),
                discovered_at TIMESTAMP,
                actions_taken TEXT,
                reported_to_authorities BOOLEAN DEFAULT FALSE,
                users_notified BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE INDEX idx_gdpr_requests_user ON gdpr_requests(user_id);
            CREATE INDEX idx_gdpr_requests_org ON gdpr_requests(organization_id);
            CREATE INDEX idx_user_consents_user ON user_consents(user_id);
        `);
    } catch (error) {
        logger.error('Failed to create GDPR tables:', error);
    }
};

// Initialize GDPR tables
createGDPRTables();

// Export singleton instance
module.exports = new GDPRService();
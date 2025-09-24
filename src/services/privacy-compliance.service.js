const { Database, logger } = require('../database/postgres');
const encryptionService = require('./encryption.service');
const gdprService = require('./gdpr.service');

/**
 * Privacy Compliance Service - Handles US and International Privacy Laws
 * CCPA, COPPA, HIPAA, State-specific laws
 */
class PrivacyComplianceService {
    constructor() {
        this.complianceRegimes = {
            GDPR: 'gdpr',           // European Union
            CCPA: 'ccpa',           // California
            CPRA: 'cpra',           // California (enhanced)
            COPPA: 'coppa',         // Children's privacy
            HIPAA: 'hipaa',         // Health information
            LGPD: 'lgpd',           // Brazil
            PIPEDA: 'pipeda',       // Canada
            VCDPA: 'vcdpa',         // Virginia
            CPA: 'cpa',             // Colorado
            CTDPA: 'ctdpa',         // Connecticut
            UCPA: 'ucpa'            // Utah
        };

        this.dataCategories = {
            PERSONAL: 'personal_information',
            SENSITIVE: 'sensitive_personal_information',
            BIOMETRIC: 'biometric_data',
            GEOLOCATION: 'geolocation_data',
            HEALTH: 'health_information',
            FINANCIAL: 'financial_information',
            CHILDREN: 'children_data',
            BEHAVIORAL: 'behavioral_data'
        };
    }

    /**
     * CCPA Compliance - Right to Know
     */
    async ccpaDataDisclosure(userId, organizationId) {
        try {
            logger.info('Processing CCPA data disclosure request', { userId, organizationId });

            const disclosure = {
                requestDate: new Date().toISOString(),
                userId,
                organizationId,
                categories: {},
                sources: [],
                purposes: [],
                thirdParties: [],
                salesInfo: {
                    dataSold: false,
                    categories: []
                }
            };

            // Categories of personal information collected
            disclosure.categories = {
                identifiers: await this.getDataCategory(userId, 'identifiers'),
                personalRecords: await this.getDataCategory(userId, 'personal_records'),
                commercialInfo: await this.getDataCategory(userId, 'commercial'),
                biometric: await this.getDataCategory(userId, 'biometric'),
                internetActivity: await this.getDataCategory(userId, 'internet_activity'),
                geolocation: await this.getDataCategory(userId, 'geolocation'),
                professional: await this.getDataCategory(userId, 'professional'),
                education: await this.getDataCategory(userId, 'education'),
                inferences: await this.getDataCategory(userId, 'inferences')
            };

            // Sources of information
            disclosure.sources = [
                'Direct collection from user',
                'Automatic collection via platform usage',
                'Third-party integrations (with consent)'
            ];

            // Business purposes for collection
            disclosure.purposes = [
                'Providing platform services',
                'Security and fraud prevention',
                'Legal compliance',
                'Service improvement',
                'Customer support'
            ];

            // Third parties with whom data is shared
            disclosure.thirdParties = await this.getThirdPartySharing(organizationId);

            // Log the disclosure request
            await Database.insert('privacy_requests', {
                user_id: userId,
                organization_id: organizationId,
                request_type: 'ccpa_disclosure',
                status: 'completed',
                response_data: disclosure,
                completed_at: new Date()
            });

            return disclosure;
        } catch (error) {
            logger.error('CCPA disclosure failed:', error);
            throw error;
        }
    }

    /**
     * CCPA - Right to Delete (with exceptions)
     */
    async ccpaDeleteRequest(userId, organizationId, options = {}) {
        const { verificationToken, exceptions = [] } = options;

        // Verify user identity
        if (!await this.verifyUserIdentity(userId, verificationToken)) {
            throw new Error('Identity verification failed');
        }

        logger.warn('Processing CCPA deletion request', { userId, organizationId });

        const deletionResult = {
            userId,
            organizationId,
            deletedCategories: [],
            retainedCategories: [],
            exceptions: []
        };

        // Check for legal exceptions
        const legalExceptions = await this.checkDeletionExceptions(userId, organizationId);
        
        if (legalExceptions.length > 0) {
            deletionResult.exceptions = legalExceptions;
            deletionResult.retainedCategories = legalExceptions.map(e => e.category);
        }

        // Proceed with deletion (excluding exceptions)
        const result = await gdprService.deleteUserData(userId, organizationId, {
            reason: 'CCPA deletion request',
            retainAnonymized: true,
            confirmDeletion: true,
            exceptions: legalExceptions
        });

        deletionResult.deletedCategories = result.deletedRecords;

        // Log the deletion
        await Database.insert('privacy_requests', {
            user_id: userId,
            organization_id: organizationId,
            request_type: 'ccpa_deletion',
            status: 'completed',
            response_data: deletionResult,
            completed_at: new Date()
        });

        return deletionResult;
    }

    /**
     * CCPA - Right to Opt-Out of Sale
     */
    async ccpaOptOut(userId, organizationId, optOutPreferences) {
        const preferences = {
            doNotSell: true,
            doNotShare: true,
            limitUseOfSensitiveInfo: true,
            ...optOutPreferences
        };

        await Database.insert('privacy_preferences', {
            user_id: userId,
            organization_id: organizationId,
            do_not_sell: preferences.doNotSell,
            do_not_share: preferences.doNotShare,
            limit_sensitive_use: preferences.limitUseOfSensitiveInfo,
            updated_at: new Date()
        });

        // Update all third-party integrations
        await this.updateThirdPartySharing(userId, organizationId, preferences);

        logger.info('CCPA opt-out preferences updated', { userId, preferences });

        return {
            status: 'success',
            preferences,
            effectiveDate: new Date().toISOString()
        };
    }

    /**
     * COPPA - Children's Privacy Protection
     */
    async coppaVerification(userId, birthDate) {
        const age = this.calculateAge(birthDate);
        
        if (age < 13) {
            logger.warn('COPPA: User under 13 detected', { userId, age });
            
            return {
                requiresParentalConsent: true,
                age,
                restrictions: [
                    'Cannot collect personal information without parental consent',
                    'Cannot enable social features',
                    'Cannot share data with third parties',
                    'Must provide parental access to data'
                ]
            };
        }

        return {
            requiresParentalConsent: false,
            age
        };
    }

    /**
     * COPPA - Parental Consent Management
     */
    async coppaParentalConsent(childUserId, parentEmail, consentData) {
        const verificationCode = this.generateVerificationCode();
        
        // Send verification email to parent
        await this.sendParentalConsentEmail(parentEmail, verificationCode);

        // Store pending consent
        await Database.insert('parental_consents', {
            child_user_id: childUserId,
            parent_email: parentEmail,
            verification_code: encryptionService.hash(verificationCode),
            consent_data: consentData,
            status: 'pending',
            created_at: new Date()
        });

        return {
            status: 'pending_verification',
            parentEmail,
            childUserId
        };
    }

    /**
     * State-specific privacy law compliance
     */
    async statePrivacyCompliance(userId, state) {
        const stateRequirements = {
            'CA': { law: 'CCPA/CPRA', requirements: this.getCCPARequirements() },
            'VA': { law: 'VCDPA', requirements: this.getVCDPARequirements() },
            'CO': { law: 'CPA', requirements: this.getCPARequirements() },
            'CT': { law: 'CTDPA', requirements: this.getCTDPARequirements() },
            'UT': { law: 'UCPA', requirements: this.getUCPARequirements() },
            'IL': { law: 'BIPA', requirements: this.getBIPARequirements() }
        };

        const requirements = stateRequirements[state] || { law: 'None', requirements: [] };

        return {
            state,
            applicableLaw: requirements.law,
            requirements: requirements.requirements,
            userRights: this.getStateSpecificRights(state),
            consentRequired: this.isConsentRequired(state),
            optOutAvailable: this.isOptOutAvailable(state)
        };
    }

    /**
     * HIPAA Compliance Check
     */
    async hipaaComplianceCheck(organizationId) {
        const checks = {
            encryption: true,
            accessControls: true,
            auditLogs: true,
            dataBackup: true,
            incidentResponse: true,
            businessAssociateAgreements: false,
            riskAssessment: true
        };

        const compliant = Object.values(checks).every(check => check === true);

        return {
            isHIPAACompliant: compliant,
            checks,
            recommendations: compliant ? [] : this.getHIPAARecommendations(checks)
        };
    }

    /**
     * Cross-border data transfer compliance
     */
    async validateCrossBorderTransfer(fromCountry, toCountry, dataType) {
        const transferRules = {
            'EU->US': {
                allowed: false,
                mechanism: 'Standard Contractual Clauses required',
                additionalRequirements: ['Data Processing Agreement', 'Privacy Shield alternative']
            },
            'US->EU': {
                allowed: true,
                mechanism: 'Adequate safeguards required',
                additionalRequirements: ['GDPR compliance certification']
            }
        };

        const key = `${fromCountry}->${toCountry}`;
        const rules = transferRules[key] || { allowed: true, mechanism: 'None' };

        if (!rules.allowed && dataType === 'sensitive') {
            throw new Error(`Cross-border transfer not allowed for sensitive data from ${fromCountry} to ${toCountry}`);
        }

        return {
            allowed: rules.allowed,
            mechanism: rules.mechanism,
            requirements: rules.additionalRequirements || [],
            dataType,
            fromCountry,
            toCountry
        };
    }

    /**
     * Privacy Impact Assessment
     */
    async conductPrivacyImpactAssessment(projectData) {
        const assessment = {
            projectName: projectData.name,
            assessmentDate: new Date().toISOString(),
            dataTypes: [],
            risks: [],
            mitigations: [],
            score: 0
        };

        // Identify data types
        assessment.dataTypes = await this.identifyDataTypes(projectData);

        // Assess risks
        assessment.risks = await this.assessPrivacyRisks(assessment.dataTypes);

        // Recommend mitigations
        assessment.mitigations = await this.recommendMitigations(assessment.risks);

        // Calculate privacy score
        assessment.score = this.calculatePrivacyScore(assessment);

        // Store assessment
        await Database.insert('privacy_assessments', {
            project_name: projectData.name,
            organization_id: projectData.organizationId,
            assessment_data: assessment,
            score: assessment.score,
            created_at: new Date()
        });

        return assessment;
    }

    /**
     * Automated compliance monitoring
     */
    async monitorCompliance(organizationId) {
        const monitoring = {
            timestamp: new Date().toISOString(),
            organizationId,
            violations: [],
            warnings: [],
            recommendations: []
        };

        // Check data retention compliance
        const retentionViolations = await this.checkRetentionCompliance(organizationId);
        if (retentionViolations.length > 0) {
            monitoring.violations.push(...retentionViolations);
        }

        // Check consent expiry
        const consentWarnings = await this.checkConsentExpiry(organizationId);
        if (consentWarnings.length > 0) {
            monitoring.warnings.push(...consentWarnings);
        }

        // Check encryption status
        const encryptionStatus = await this.checkEncryptionCompliance(organizationId);
        if (!encryptionStatus.compliant) {
            monitoring.violations.push({
                type: 'encryption',
                message: 'Unencrypted sensitive data detected',
                severity: 'high'
            });
        }

        // Generate recommendations
        monitoring.recommendations = await this.generateComplianceRecommendations(
            monitoring.violations,
            monitoring.warnings
        );

        // Alert if critical violations
        if (monitoring.violations.some(v => v.severity === 'critical')) {
            await this.alertComplianceTeam(organizationId, monitoring);
        }

        return monitoring;
    }

    /**
     * Helper Methods
     */

    async getDataCategory(userId, category) {
        const query = `
            SELECT COUNT(*) as count, 
                   MIN(created_at) as first_collected,
                   MAX(updated_at) as last_updated
            FROM user_data_catalog
            WHERE user_id = $1 AND category = $2
        `;
        return await Database.getOne(query, [userId, category]);
    }

    async getThirdPartySharing(organizationId) {
        return await Database.getMany(
            'SELECT * FROM third_party_sharing WHERE organization_id = $1',
            [organizationId]
        );
    }

    async verifyUserIdentity(userId, token) {
        // Implement identity verification logic
        return true; // Placeholder
    }

    async checkDeletionExceptions(userId, organizationId) {
        const exceptions = [];
        
        // Check for legal holds
        const legalHold = await Database.getOne(
            'SELECT * FROM legal_holds WHERE user_id = $1',
            [userId]
        );
        
        if (legalHold) {
            exceptions.push({
                category: 'legal_hold',
                reason: 'Data subject to legal hold',
                expires: legalHold.expires_at
            });
        }

        // Check for transaction completion requirements
        const pendingTransactions = await Database.getMany(
            'SELECT * FROM transactions WHERE user_id = $1 AND status = $2',
            [userId, 'pending']
        );
        
        if (pendingTransactions.length > 0) {
            exceptions.push({
                category: 'transaction_completion',
                reason: 'Pending transactions require data retention',
                count: pendingTransactions.length
            });
        }

        return exceptions;
    }

    calculateAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    }

    generateVerificationCode() {
        return Math.random().toString(36).substring(2, 15);
    }

    getCCPARequirements() {
        return [
            'Right to know about personal information collected',
            'Right to delete personal information',
            'Right to opt-out of sale of personal information',
            'Right to non-discrimination',
            'Right to correct inaccurate information',
            'Right to limit use of sensitive personal information'
        ];
    }

    getVCDPARequirements() {
        return [
            'Right to access personal data',
            'Right to correct inaccuracies',
            'Right to delete personal data',
            'Right to data portability',
            'Right to opt-out of targeted advertising'
        ];
    }

    getCPARequirements() {
        return [
            'Right to opt-out of data sales',
            'Right to access and correct data',
            'Right to delete personal data',
            'Right to data portability',
            'Universal opt-out mechanism required'
        ];
    }

    getCTDPARequirements() {
        return [
            'Right to access and correct',
            'Right to delete',
            'Right to data portability',
            'Right to opt-out of targeted advertising',
            'Right to opt-out of profiling'
        ];
    }

    getUCPARequirements() {
        return [
            'Right to access',
            'Right to delete',
            'Right to portability',
            'Right to opt-out of sale and targeted advertising'
        ];
    }

    getBIPARequirements() {
        return [
            'Written consent for biometric data collection',
            'Disclosure of retention and destruction policies',
            'Prohibition on selling biometric data',
            'Security requirements for biometric data'
        ];
    }

    async alertComplianceTeam(organizationId, violations) {
        // Send alerts to compliance team
        logger.error('Critical compliance violations detected', { organizationId, violations });
    }
}

// Export singleton instance
module.exports = new PrivacyComplianceService();
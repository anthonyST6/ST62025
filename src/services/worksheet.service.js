const { Database, logger } = require('../database/postgres');
const crypto = require('crypto');

/**
 * Worksheet Service - Handles worksheet versioning and persistence
 */
class WorksheetService {
    /**
     * Save worksheet with automatic versioning
     * @param {Object} params - Worksheet parameters
     * @returns {Promise<Object>} Saved worksheet
     */
    async saveWorksheet(params) {
        const {
            organizationId,
            workspaceId,
            userId,
            blockId,
            subcomponentId,
            title,
            data,
            attachments = [],
            status = 'draft',
            changeSummary = null
        } = params;

        try {
            return await Database.transaction(async (client) => {
                // Get current version if exists
                const currentVersion = await Database.getOne(
                    `SELECT * FROM worksheets 
                     WHERE organization_id = $1 
                       AND subcomponent_id = $2 
                       AND is_current = true`,
                    [organizationId, subcomponentId]
                );

                let newVersion = 1;
                let parentVersionId = null;

                if (currentVersion) {
                    // Mark current version as not current
                    await Database.update('worksheets', 
                        { is_current: false },
                        { id: currentVersion.id }
                    );
                    
                    newVersion = currentVersion.version + 1;
                    parentVersionId = currentVersion.id;
                }

                // Create new version
                const worksheet = await Database.insert('worksheets', {
                    organization_id: organizationId,
                    workspace_id: workspaceId,
                    block_id: blockId,
                    subcomponent_id: subcomponentId,
                    version: newVersion,
                    is_current: true,
                    title: title || `${subcomponentId} v${newVersion}`,
                    data: data,
                    attachments: attachments,
                    status: status,
                    created_by: userId,
                    parent_version_id: parentVersionId,
                    change_summary: changeSummary,
                    tags: this.extractTags(data)
                });

                // Log activity
                await Database.insert('audit_logs', {
                    organization_id: organizationId,
                    user_id: userId,
                    action: 'worksheet_saved',
                    resource_type: 'worksheet',
                    resource_id: worksheet.id,
                    resource_name: worksheet.title,
                    changes: {
                        version: newVersion,
                        previous_version: currentVersion?.version || 0
                    }
                });

                logger.info('Worksheet saved', {
                    worksheetId: worksheet.id,
                    version: newVersion,
                    subcomponentId
                });

                return worksheet;
            });
        } catch (error) {
            logger.error('Error saving worksheet:', error);
            throw error;
        }
    }

    /**
     * Get current worksheet
     * @param {string} organizationId - Organization ID
     * @param {string} subcomponentId - Subcomponent ID
     * @returns {Promise<Object>} Current worksheet
     */
    async getCurrentWorksheet(organizationId, subcomponentId) {
        const worksheet = await Database.getOne(
            `SELECT w.*, 
                    u.first_name || ' ' || u.last_name as created_by_name,
                    u.email as created_by_email
             FROM worksheets w
             JOIN users u ON w.created_by = u.id
             WHERE w.organization_id = $1 
               AND w.subcomponent_id = $2 
               AND w.is_current = true`,
            [organizationId, subcomponentId]
        );

        return worksheet;
    }

    /**
     * Get worksheet by ID
     * @param {string} organizationId - Organization ID
     * @param {string} worksheetId - Worksheet ID
     * @returns {Promise<Object>} Worksheet
     */
    async getWorksheetById(organizationId, worksheetId) {
        const worksheet = await Database.getOne(
            `SELECT w.*, 
                    u.first_name || ' ' || u.last_name as created_by_name,
                    u.email as created_by_email
             FROM worksheets w
             JOIN users u ON w.created_by = u.id
             WHERE w.organization_id = $1 
               AND w.id = $2`,
            [organizationId, worksheetId]
        );

        return worksheet;
    }

    /**
     * Get worksheet history
     * @param {string} organizationId - Organization ID
     * @param {string} subcomponentId - Subcomponent ID
     * @param {number} limit - Number of versions to return
     * @returns {Promise<Array>} Worksheet versions
     */
    async getWorksheetHistory(organizationId, subcomponentId, limit = 50) {
        const history = await Database.getMany(
            `SELECT w.*, 
                    u.first_name || ' ' || u.last_name as created_by_name,
                    u.email as created_by_email
             FROM worksheets w
             JOIN users u ON w.created_by = u.id
             WHERE w.organization_id = $1 
               AND w.subcomponent_id = $2
             ORDER BY w.version DESC
             LIMIT $3`,
            [organizationId, subcomponentId, limit]
        );

        return history;
    }

    /**
     * Get worksheet diff between versions
     * @param {string} organizationId - Organization ID
     * @param {string} worksheetId1 - First worksheet ID
     * @param {string} worksheetId2 - Second worksheet ID
     * @returns {Promise<Object>} Diff between versions
     */
    async getWorksheetDiff(organizationId, worksheetId1, worksheetId2) {
        const [worksheet1, worksheet2] = await Promise.all([
            this.getWorksheetById(organizationId, worksheetId1),
            this.getWorksheetById(organizationId, worksheetId2)
        ]);

        if (!worksheet1 || !worksheet2) {
            throw new Error('One or both worksheets not found');
        }

        // Calculate diff
        const diff = {
            version1: worksheet1.version,
            version2: worksheet2.version,
            created_at1: worksheet1.created_at,
            created_at2: worksheet2.created_at,
            changes: this.calculateChanges(worksheet1.data, worksheet2.data)
        };

        return diff;
    }

    /**
     * Restore worksheet version
     * @param {string} organizationId - Organization ID
     * @param {string} worksheetId - Worksheet ID to restore
     * @param {string} userId - User performing restore
     * @returns {Promise<Object>} Restored worksheet
     */
    async restoreVersion(organizationId, worksheetId, userId) {
        const worksheetToRestore = await this.getWorksheetById(organizationId, worksheetId);
        
        if (!worksheetToRestore) {
            throw new Error('Worksheet not found');
        }

        // Save as new version
        return await this.saveWorksheet({
            organizationId,
            workspaceId: worksheetToRestore.workspace_id,
            userId,
            blockId: worksheetToRestore.block_id,
            subcomponentId: worksheetToRestore.subcomponent_id,
            title: worksheetToRestore.title,
            data: worksheetToRestore.data,
            attachments: worksheetToRestore.attachments,
            status: worksheetToRestore.status,
            changeSummary: `Restored from version ${worksheetToRestore.version}`
        });
    }

    /**
     * Submit worksheet for review
     * @param {string} organizationId - Organization ID
     * @param {string} worksheetId - Worksheet ID
     * @param {string} userId - User submitting
     * @returns {Promise<Object>} Updated worksheet
     */
    async submitForReview(organizationId, worksheetId, userId) {
        const worksheet = await Database.update('worksheets',
            {
                status: 'submitted',
                submitted_at: new Date()
            },
            {
                id: worksheetId,
                organization_id: organizationId
            }
        );

        await Database.insert('audit_logs', {
            organization_id: organizationId,
            user_id: userId,
            action: 'worksheet_submitted',
            resource_type: 'worksheet',
            resource_id: worksheetId
        });

        return worksheet[0];
    }

    /**
     * Approve worksheet
     * @param {string} organizationId - Organization ID
     * @param {string} worksheetId - Worksheet ID
     * @param {string} userId - User approving
     * @returns {Promise<Object>} Updated worksheet
     */
    async approveWorksheet(organizationId, worksheetId, userId) {
        const worksheet = await Database.update('worksheets',
            {
                status: 'approved',
                approved_by: userId,
                approved_at: new Date()
            },
            {
                id: worksheetId,
                organization_id: organizationId
            }
        );

        await Database.insert('audit_logs', {
            organization_id: organizationId,
            user_id: userId,
            action: 'worksheet_approved',
            resource_type: 'worksheet',
            resource_id: worksheetId
        });

        return worksheet[0];
    }

    /**
     * Get all worksheets for organization
     * @param {string} organizationId - Organization ID
     * @param {Object} filters - Optional filters
     * @returns {Promise<Array>} Worksheets
     */
    async getOrganizationWorksheets(organizationId, filters = {}) {
        let query = `
            SELECT w.*, 
                   u.first_name || ' ' || u.last_name as created_by_name
            FROM worksheets w
            JOIN users u ON w.created_by = u.id
            WHERE w.organization_id = $1 AND w.is_current = true
        `;
        
        const params = [organizationId];
        let paramIndex = 2;

        if (filters.workspaceId) {
            query += ` AND w.workspace_id = $${paramIndex}`;
            params.push(filters.workspaceId);
            paramIndex++;
        }

        if (filters.blockId) {
            query += ` AND w.block_id = $${paramIndex}`;
            params.push(filters.blockId);
            paramIndex++;
        }

        if (filters.status) {
            query += ` AND w.status = $${paramIndex}`;
            params.push(filters.status);
            paramIndex++;
        }

        query += ' ORDER BY w.created_at DESC';

        if (filters.limit) {
            query += ` LIMIT $${paramIndex}`;
            params.push(filters.limit);
        }

        return await Database.getMany(query, params);
    }

    /**
     * Search worksheets
     * @param {string} organizationId - Organization ID
     * @param {string} searchTerm - Search term
     * @returns {Promise<Array>} Matching worksheets
     */
    async searchWorksheets(organizationId, searchTerm) {
        const query = `
            SELECT w.*, 
                   u.first_name || ' ' || u.last_name as created_by_name
            FROM worksheets w
            JOIN users u ON w.created_by = u.id
            WHERE w.organization_id = $1 
              AND w.is_current = true
              AND (
                  w.title ILIKE $2
                  OR w.change_summary ILIKE $2
                  OR w.data::text ILIKE $2
                  OR $2 = ANY(w.tags)
              )
            ORDER BY w.created_at DESC
            LIMIT 50
        `;

        const searchPattern = `%${searchTerm}%`;
        return await Database.getMany(query, [organizationId, searchPattern]);
    }

    /**
     * Get worksheet statistics
     * @param {string} organizationId - Organization ID
     * @returns {Promise<Object>} Statistics
     */
    async getWorksheetStats(organizationId) {
        const stats = await Database.getOne(`
            SELECT 
                COUNT(DISTINCT subcomponent_id) as total_subcomponents,
                COUNT(*) FILTER (WHERE is_current = true) as current_worksheets,
                COUNT(*) as total_versions,
                COUNT(*) FILTER (WHERE status = 'draft') as draft_count,
                COUNT(*) FILTER (WHERE status = 'submitted') as submitted_count,
                COUNT(*) FILTER (WHERE status = 'approved') as approved_count,
                AVG(version) as avg_versions_per_worksheet,
                MAX(created_at) as last_activity
            FROM worksheets
            WHERE organization_id = $1
        `, [organizationId]);

        return stats;
    }

    /**
     * Extract tags from worksheet data
     * @param {Object} data - Worksheet data
     * @returns {Array} Tags
     */
    extractTags(data) {
        const tags = [];
        
        // Extract tags from data structure
        if (data.tags) {
            tags.push(...data.tags);
        }
        
        // Extract keywords from certain fields
        if (data.problemStatement) {
            // Simple keyword extraction (in production, use NLP)
            const keywords = data.problemStatement
                .toLowerCase()
                .match(/\b[a-z]{4,}\b/g) || [];
            tags.push(...keywords.slice(0, 5));
        }
        
        return [...new Set(tags)]; // Remove duplicates
    }

    /**
     * Calculate changes between two data objects
     * @param {Object} data1 - First data object
     * @param {Object} data2 - Second data object
     * @returns {Object} Changes
     */
    calculateChanges(data1, data2) {
        const changes = {
            added: {},
            modified: {},
            removed: {}
        };

        // Find added and modified fields
        for (const key in data2) {
            if (!(key in data1)) {
                changes.added[key] = data2[key];
            } else if (JSON.stringify(data1[key]) !== JSON.stringify(data2[key])) {
                changes.modified[key] = {
                    old: data1[key],
                    new: data2[key]
                };
            }
        }

        // Find removed fields
        for (const key in data1) {
            if (!(key in data2)) {
                changes.removed[key] = data1[key];
            }
        }

        return changes;
    }

    /**
     * Export worksheets to JSON
     * @param {string} organizationId - Organization ID
     * @param {Object} options - Export options
     * @returns {Promise<Object>} Exported data
     */
    async exportWorksheets(organizationId, options = {}) {
        const worksheets = await this.getOrganizationWorksheets(organizationId, options);
        
        return {
            exportDate: new Date().toISOString(),
            organization: organizationId,
            worksheetCount: worksheets.length,
            worksheets: worksheets.map(w => ({
                id: w.id,
                subcomponentId: w.subcomponent_id,
                version: w.version,
                title: w.title,
                status: w.status,
                data: w.data,
                createdAt: w.created_at,
                createdBy: w.created_by_name
            }))
        };
    }
}

// Export singleton instance
module.exports = new WorksheetService();
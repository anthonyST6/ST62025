const { Database, logger } = require('../database/postgres');
const worksheetService = require('./worksheet.service');

/**
 * Analysis Service - Manages AI analyses and report generation
 */
class AnalysisService {
    /**
     * Save analysis results
     * @param {Object} analysisData - Analysis data
     * @returns {Promise<Object>} Saved analysis
     */
    async saveAnalysis(analysisData) {
        const {
            organizationId,
            workspaceId,
            worksheetId,
            blockId,
            subcomponentId,
            userId,
            agentType,
            agentVersion,
            analysisResults
        } = analysisData;

        try {
            return await Database.transaction(async (client) => {
                // Save analysis
                const analysis = await Database.insert('analyses', {
                    organization_id: organizationId,
                    workspace_id: workspaceId,
                    worksheet_id: worksheetId,
                    block_id: blockId,
                    subcomponent_id: subcomponentId,
                    agent_type: agentType,
                    agent_version: agentVersion || '1.0.0',
                    score: analysisResults.score,
                    confidence_level: analysisResults.confidence,
                    analysis_data: analysisResults,
                    dimensions: analysisResults.dimensions,
                    strengths: analysisResults.strengths,
                    weaknesses: analysisResults.weaknesses,
                    recommendations: analysisResults.recommendations,
                    action_items: analysisResults.actionItems,
                    benchmarks: analysisResults.benchmarks,
                    created_by: userId,
                    processing_time_ms: analysisResults.processingTime,
                    tokens_used: analysisResults.tokensUsed,
                    cost_usd: this.calculateCost(analysisResults.tokensUsed)
                });

                // Update score history
                await this.updateScoreHistory({
                    organizationId,
                    workspaceId,
                    blockId,
                    subcomponentId,
                    score: analysisResults.score,
                    analysisId: analysis.id,
                    worksheetId,
                    userId
                });

                // Log activity
                await Database.insert('audit_logs', {
                    organization_id: organizationId,
                    user_id: userId,
                    action: 'analysis_completed',
                    resource_type: 'analysis',
                    resource_id: analysis.id,
                    metadata: {
                        score: analysisResults.score,
                        agent: agentType
                    }
                });

                logger.info('Analysis saved', {
                    analysisId: analysis.id,
                    score: analysisResults.score,
                    subcomponentId
                });

                return analysis;
            });
        } catch (error) {
            logger.error('Error saving analysis:', error);
            throw error;
        }
    }

    /**
     * Get analysis by ID
     * @param {string} organizationId - Organization ID
     * @param {string} analysisId - Analysis ID
     * @returns {Promise<Object>} Analysis
     */
    async getAnalysis(organizationId, analysisId) {
        const analysis = await Database.getOne(
            `SELECT a.*, 
                    u.first_name || ' ' || u.last_name as created_by_name,
                    w.title as worksheet_title
             FROM analyses a
             JOIN users u ON a.created_by = u.id
             LEFT JOIN worksheets w ON a.worksheet_id = w.id
             WHERE a.organization_id = $1 AND a.id = $2`,
            [organizationId, analysisId]
        );

        return analysis;
    }

    /**
     * Get analyses for subcomponent
     * @param {string} organizationId - Organization ID
     * @param {string} subcomponentId - Subcomponent ID
     * @param {Object} options - Query options
     * @returns {Promise<Array>} Analyses
     */
    async getSubcomponentAnalyses(organizationId, subcomponentId, options = {}) {
        let query = `
            SELECT a.*, 
                   u.first_name || ' ' || u.last_name as created_by_name
            FROM analyses a
            JOIN users u ON a.created_by = u.id
            WHERE a.organization_id = $1 AND a.subcomponent_id = $2
        `;

        const params = [organizationId, subcomponentId];
        
        query += ' ORDER BY a.created_at DESC';

        if (options.limit) {
            query += ` LIMIT $3`;
            params.push(options.limit);
        }

        return await Database.getMany(query, params);
    }

    /**
     * Get latest analysis for subcomponent
     * @param {string} organizationId - Organization ID
     * @param {string} subcomponentId - Subcomponent ID
     * @returns {Promise<Object>} Latest analysis
     */
    async getLatestAnalysis(organizationId, subcomponentId) {
        const analysis = await Database.getOne(
            `SELECT * FROM analyses 
             WHERE organization_id = $1 AND subcomponent_id = $2
             ORDER BY created_at DESC
             LIMIT 1`,
            [organizationId, subcomponentId]
        );

        return analysis;
    }

    /**
     * Update score history
     * @param {Object} scoreData - Score data
     * @returns {Promise<Object>} Score history entry
     */
    async updateScoreHistory(scoreData) {
        const {
            organizationId,
            workspaceId,
            blockId,
            subcomponentId,
            score,
            analysisId,
            worksheetId,
            userId
        } = scoreData;

        // Get previous score
        const previousScore = await Database.getOne(
            `SELECT score FROM score_history 
             WHERE organization_id = $1 AND subcomponent_id = $2
             ORDER BY recorded_at DESC
             LIMIT 1`,
            [organizationId, subcomponentId]
        );

        const scoreChange = previousScore ? score - previousScore.score : score;
        const changeType = !previousScore ? 'initial' : 
                          scoreChange > 0 ? 'improvement' : 
                          scoreChange < 0 ? 'decline' : 'recalculation';

        // Calculate percentile rank (simplified - in production, use proper statistics)
        const percentile = await this.calculatePercentile(organizationId, score);

        const history = await Database.insert('score_history', {
            organization_id: organizationId,
            workspace_id: workspaceId,
            block_id: blockId,
            subcomponent_id: subcomponentId,
            score: score,
            previous_score: previousScore?.score,
            score_change: scoreChange,
            percentile_rank: percentile,
            change_type: changeType,
            analysis_id: analysisId,
            worksheet_id: worksheetId,
            recorded_by: userId
        });

        return history;
    }

    /**
     * Generate report
     * @param {Object} reportData - Report configuration
     * @returns {Promise<Object>} Generated report
     */
    async generateReport(reportData) {
        const {
            organizationId,
            workspaceId,
            userId,
            reportType,
            title,
            description,
            filters,
            includedBlocks
        } = reportData;

        try {
            // Gather data for report
            const reportContent = await this.gatherReportData(
                organizationId,
                reportType,
                filters,
                includedBlocks
            );

            // Generate report file (in production, use PDF generation service)
            const fileUrl = await this.generateReportFile(reportContent);

            // Save report metadata
            const report = await Database.insert('reports', {
                organization_id: organizationId,
                workspace_id: workspaceId,
                report_type: reportType,
                title: title,
                description: description,
                executive_summary: reportContent.summary,
                file_url: fileUrl,
                file_size_bytes: reportContent.sizeBytes,
                format: 'pdf',
                pages: reportContent.pages,
                data: reportContent.data,
                filters: filters,
                included_blocks: includedBlocks,
                generated_by: userId,
                generation_time_ms: reportContent.generationTime
            });

            // Log activity
            await Database.insert('audit_logs', {
                organization_id: organizationId,
                user_id: userId,
                action: 'report_generated',
                resource_type: 'report',
                resource_id: report.id,
                resource_name: title,
                metadata: { type: reportType }
            });

            logger.info('Report generated', {
                reportId: report.id,
                type: reportType,
                title
            });

            return report;
        } catch (error) {
            logger.error('Error generating report:', error);
            throw error;
        }
    }

    /**
     * Get report by ID
     * @param {string} organizationId - Organization ID
     * @param {string} reportId - Report ID
     * @returns {Promise<Object>} Report
     */
    async getReport(organizationId, reportId) {
        const report = await Database.getOne(
            `SELECT r.*, 
                    u.first_name || ' ' || u.last_name as generated_by_name
             FROM reports r
             JOIN users u ON r.generated_by = u.id
             WHERE r.organization_id = $1 AND r.id = $2`,
            [organizationId, reportId]
        );

        if (report) {
            // Update access count
            await Database.query(
                `UPDATE reports 
                 SET access_count = access_count + 1,
                     last_accessed_at = NOW()
                 WHERE id = $1`,
                [reportId]
            );
        }

        return report;
    }

    /**
     * Get organization reports
     * @param {string} organizationId - Organization ID
     * @param {Object} options - Query options
     * @returns {Promise<Array>} Reports
     */
    async getOrganizationReports(organizationId, options = {}) {
        let query = `
            SELECT r.*, 
                   u.first_name || ' ' || u.last_name as generated_by_name
            FROM reports r
            JOIN users u ON r.generated_by = u.id
            WHERE r.organization_id = $1
        `;

        const params = [organizationId];
        let paramIndex = 2;

        if (options.reportType) {
            query += ` AND r.report_type = $${paramIndex}`;
            params.push(options.reportType);
            paramIndex++;
        }

        if (options.startDate) {
            query += ` AND r.generated_at >= $${paramIndex}`;
            params.push(options.startDate);
            paramIndex++;
        }

        if (options.endDate) {
            query += ` AND r.generated_at <= $${paramIndex}`;
            params.push(options.endDate);
            paramIndex++;
        }

        query += ' ORDER BY r.generated_at DESC';

        if (options.limit) {
            query += ` LIMIT $${paramIndex}`;
            params.push(options.limit);
        }

        return await Database.getMany(query, params);
    }

    /**
     * Share report
     * @param {string} organizationId - Organization ID
     * @param {string} reportId - Report ID
     * @param {Object} shareOptions - Sharing options
     * @returns {Promise<Object>} Share details
     */
    async shareReport(organizationId, reportId, shareOptions) {
        const { isPublic, expiresIn, sharedWith } = shareOptions;

        const updates = {};
        
        if (isPublic) {
            // Generate public token
            const publicToken = crypto.randomBytes(32).toString('hex');
            updates.is_public = true;
            updates.public_token = publicToken;
        }

        if (expiresIn) {
            updates.expires_at = new Date(Date.now() + expiresIn);
        }

        if (sharedWith) {
            updates.shared_with = sharedWith;
        }

        const updated = await Database.update(
            'reports',
            updates,
            { id: reportId, organization_id: organizationId }
        );

        return {
            reportId,
            publicUrl: updates.public_token ? 
                `${process.env.APP_URL}/public/report/${updates.public_token}` : null,
            expiresAt: updates.expires_at
        };
    }

    /**
     * Get analysis statistics
     * @param {string} organizationId - Organization ID
     * @returns {Promise<Object>} Statistics
     */
    async getAnalysisStats(organizationId) {
        const stats = await Database.getOne(`
            SELECT 
                COUNT(*) as total_analyses,
                COUNT(DISTINCT subcomponent_id) as analyzed_subcomponents,
                AVG(score) as avg_score,
                MIN(score) as min_score,
                MAX(score) as max_score,
                AVG(confidence_level) as avg_confidence,
                SUM(tokens_used) as total_tokens,
                SUM(cost_usd) as total_cost,
                MAX(created_at) as last_analysis
            FROM analyses
            WHERE organization_id = $1
        `, [organizationId]);

        // Get score distribution
        const distribution = await Database.getMany(`
            SELECT 
                CASE 
                    WHEN score < 20 THEN '0-20'
                    WHEN score < 40 THEN '20-40'
                    WHEN score < 60 THEN '40-60'
                    WHEN score < 80 THEN '60-80'
                    ELSE '80-100'
                END as range,
                COUNT(*) as count
            FROM analyses
            WHERE organization_id = $1
            GROUP BY range
            ORDER BY range
        `, [organizationId]);

        stats.scoreDistribution = distribution;

        return stats;
    }

    /**
     * Calculate percentile rank
     * @param {string} organizationId - Organization ID
     * @param {number} score - Score to rank
     * @returns {Promise<number>} Percentile rank
     */
    async calculatePercentile(organizationId, score) {
        const result = await Database.getOne(`
            SELECT 
                COUNT(*) FILTER (WHERE score < $2) * 100.0 / 
                NULLIF(COUNT(*), 0) as percentile
            FROM analyses
            WHERE organization_id = $1
        `, [organizationId, score]);

        return result?.percentile || 50;
    }

    /**
     * Gather data for report
     * @private
     */
    async gatherReportData(organizationId, reportType, filters, includedBlocks) {
        const data = {
            organization: await Database.getOne(
                'SELECT name, industry, size FROM organizations WHERE id = $1',
                [organizationId]
            ),
            analyses: [],
            worksheets: [],
            scores: [],
            summary: ''
        };

        // Get relevant analyses
        if (includedBlocks && includedBlocks.length > 0) {
            data.analyses = await Database.getMany(
                `SELECT * FROM analyses 
                 WHERE organization_id = $1 
                   AND block_id = ANY($2)
                 ORDER BY created_at DESC`,
                [organizationId, includedBlocks]
            );
        }

        // Get current worksheets
        data.worksheets = await worksheetService.getOrganizationWorksheets(
            organizationId,
            { limit: 50 }
        );

        // Get score history
        data.scores = await Database.getMany(
            `SELECT * FROM score_history 
             WHERE organization_id = $1 
             ORDER BY recorded_at DESC 
             LIMIT 100`,
            [organizationId]
        );

        // Generate executive summary
        data.summary = this.generateExecutiveSummary(data);

        return {
            data,
            summary: data.summary,
            pages: Math.ceil(data.analyses.length / 5) + 3, // Estimate
            sizeBytes: JSON.stringify(data).length * 2, // Rough estimate
            generationTime: Date.now()
        };
    }

    /**
     * Generate report file
     * @private
     */
    async generateReportFile(reportContent) {
        // In production, integrate with PDF generation service
        // For now, return a placeholder URL
        const fileName = `report-${Date.now()}.pdf`;
        return `/reports/${fileName}`;
    }

    /**
     * Generate executive summary
     * @private
     */
    generateExecutiveSummary(data) {
        const avgScore = data.analyses.reduce((sum, a) => sum + a.score, 0) / 
                        (data.analyses.length || 1);
        
        return `Organization ${data.organization.name} has completed ${data.analyses.length} analyses ` +
               `with an average score of ${avgScore.toFixed(1)}%. ` +
               `${data.worksheets.length} worksheets have been created. ` +
               `The organization shows ${avgScore > 70 ? 'strong' : avgScore > 50 ? 'moderate' : 'developing'} ` +
               `GTM maturity across evaluated components.`;
    }

    /**
     * Calculate cost based on tokens
     * @private
     */
    calculateCost(tokens) {
        // Simplified cost calculation
        const costPer1000Tokens = 0.002; // $0.002 per 1K tokens
        return (tokens / 1000) * costPer1000Tokens;
    }

    /**
     * Export analyses to JSON
     * @param {string} organizationId - Organization ID
     * @param {Object} options - Export options
     * @returns {Promise<Object>} Exported data
     */
    async exportAnalyses(organizationId, options = {}) {
        const analyses = await Database.getMany(
            `SELECT * FROM analyses 
             WHERE organization_id = $1 
             ORDER BY created_at DESC`,
            [organizationId]
        );

        return {
            exportDate: new Date().toISOString(),
            organization: organizationId,
            analysisCount: analyses.length,
            analyses: analyses.map(a => ({
                id: a.id,
                subcomponentId: a.subcomponent_id,
                score: a.score,
                confidence: a.confidence_level,
                agentType: a.agent_type,
                createdAt: a.created_at,
                dimensions: a.dimensions,
                recommendations: a.recommendations
            }))
        };
    }
}

// Export singleton instance
module.exports = new AnalysisService();
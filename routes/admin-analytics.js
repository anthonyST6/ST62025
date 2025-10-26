/**
 * Admin Analytics API Routes
 * 
 * Provides endpoints for:
 * - GTM score analytics
 * - Agent usage tracking
 * - System performance metrics
 * - User activity analytics
 * 
 * All routes require admin role
 */

const express = require('express');
const router = express.Router();
const { verifyFirebaseToken, requireRole } = require('../auth-middleware');
const DatabaseService = require('../database-service');

// All routes require authentication and admin role
router.use(verifyFirebaseToken);
router.use(requireRole('admin'));

/**
 * GET /api/admin/analytics/overview
 * Get dashboard overview statistics
 */
router.get('/overview', async (req, res) => {
    try {
        const db = new DatabaseService();
        const stats = await db.getAdminOverviewStats();
        
        // Calculate additional metrics
        const avgCompletion = stats.totalAssessments > 0 
            ? Math.round((stats.totalAssessments / (stats.totalUsers * 96)) * 100)
            : 0;
        
        res.json({
            success: true,
            stats: {
                ...stats,
                avgCompletion: avgCompletion,
                conversionRate: stats.totalUsers > 0 
                    ? Math.round((stats.paidUsers / stats.totalUsers) * 100)
                    : 0
            }
        });
    } catch (error) {
        console.error('Error fetching overview stats:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch statistics',
            message: error.message 
        });
    }
});

/**
 * GET /api/admin/analytics/gtm-scores
 * Get GTM score analytics across all users
 * 
 * Query params:
 * - days: Number of days to analyze (default: 30)
 */
router.get('/gtm-scores', async (req, res) => {
    const { days = 30 } = req.query;
    
    try {
        const db = new DatabaseService();
        const analytics = await db.getGTMScoreAnalytics(parseInt(days));
        
        // Calculate top performers
        const blockAverages = {};
        analytics.forEach(item => {
            if (!blockAverages[item.block_id]) {
                blockAverages[item.block_id] = {
                    blockId: item.block_id,
                    scores: [],
                    assessments: 0
                };
            }
            blockAverages[item.block_id].scores.push(item.avg_score);
            blockAverages[item.block_id].assessments += item.assessment_count;
        });
        
        const blockSummary = Object.values(blockAverages).map(block => ({
            blockId: block.blockId,
            averageScore: Math.round(block.scores.reduce((a, b) => a + b, 0) / block.scores.length),
            totalAssessments: block.assessments
        }));
        
        res.json({
            success: true,
            analytics: analytics,
            blockSummary: blockSummary,
            period: `Last ${days} days`
        });
    } catch (error) {
        console.error('Error fetching GTM analytics:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch GTM analytics',
            message: error.message 
        });
    }
});

/**
 * GET /api/admin/analytics/agent-usage
 * Get agent usage logs and statistics
 * 
 * Query params:
 * - days: Number of days to analyze (default: 30)
 * - limit: Maximum results (default: 100)
 */
router.get('/agent-usage', async (req, res) => {
    const { days = 30, limit = 100 } = req.query;
    
    try {
        const db = new DatabaseService();
        const usage = await db.getAgentUsageLogs(parseInt(days), parseInt(limit));
        
        // Calculate agent statistics
        const agentStats = {};
        usage.forEach(log => {
            if (!agentStats[log.agent_name]) {
                agentStats[log.agent_name] = {
                    agentName: log.agent_name,
                    usageCount: 0,
                    uniqueUsers: new Set(),
                    averageScore: 0,
                    scores: []
                };
            }
            agentStats[log.agent_name].usageCount++;
            agentStats[log.agent_name].uniqueUsers.add(log.user_id);
            if (log.overall_score) {
                agentStats[log.agent_name].scores.push(log.overall_score);
            }
        });
        
        // Calculate averages
        const agentSummary = Object.values(agentStats).map(agent => ({
            agentName: agent.agentName,
            usageCount: agent.usageCount,
            uniqueUsers: agent.uniqueUsers.size,
            averageScore: agent.scores.length > 0
                ? Math.round(agent.scores.reduce((a, b) => a + b, 0) / agent.scores.length)
                : null
        }));
        
        res.json({
            success: true,
            usage: usage,
            agentSummary: agentSummary.sort((a, b) => b.usageCount - a.usageCount),
            period: `Last ${days} days`
        });
    } catch (error) {
        console.error('Error fetching agent usage:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch agent usage',
            message: error.message 
        });
    }
});

/**
 * GET /api/admin/analytics/top-performers
 * Get top performing users by GTM score
 * 
 * Query params:
 * - limit: Number of users to return (default: 10)
 */
router.get('/top-performers', async (req, res) => {
    const { limit = 10 } = req.query;
    
    try {
        const db = new DatabaseService();
        const users = await db.getUsers({ isActive: true });
        
        // Get GTM scores for each user
        const usersWithScores = await Promise.all(
            users.map(async (user) => {
                const gtmScores = await db.getUserGTMScores(user.id);
                return {
                    id: user.id,
                    email: user.email,
                    fullName: user.full_name || user.name,
                    company: user.company,
                    overallScore: gtmScores.overallAverage,
                    completedSubcomponents: gtmScores.totalSubcomponents
                };
            })
        );
        
        // Sort by score and filter out users with no scores
        const topPerformers = usersWithScores
            .filter(u => u.overallScore > 0)
            .sort((a, b) => b.overallScore - a.overallScore)
            .slice(0, parseInt(limit));
        
        res.json({
            success: true,
            topPerformers: topPerformers,
            count: topPerformers.length
        });
    } catch (error) {
        console.error('Error fetching top performers:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch top performers',
            message: error.message 
        });
    }
});

/**
 * GET /api/admin/analytics/most-improved
 * Get users with highest score improvement in last 30 days
 * 
 * Query params:
 * - limit: Number of users to return (default: 10)
 */
router.get('/most-improved', async (req, res) => {
    const { limit = 10 } = req.query;
    
    try {
        const db = new DatabaseService();
        
        // This would require tracking score changes over time
        // For now, return placeholder
        res.json({
            success: true,
            mostImproved: [],
            message: 'Feature coming soon - requires historical score tracking'
        });
    } catch (error) {
        console.error('Error fetching most improved:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch most improved users',
            message: error.message 
        });
    }
});

/**
 * GET /api/admin/analytics/heatmap
 * Get block completion heatmap data (blocks vs users)
 */
router.get('/heatmap', async (req, res) => {
    try {
        const db = new DatabaseService();
        const users = await db.getUsers({ role: 'user', isActive: true });
        
        // Get GTM scores for each user
        const heatmapData = await Promise.all(
            users.map(async (user) => {
                const gtmScores = await db.getUserGTMScores(user.id);
                return {
                    userId: user.id,
                    email: user.email,
                    fullName: user.full_name || user.name,
                    blockScores: gtmScores.blockScores || []
                };
            })
        );
        
        res.json({
            success: true,
            heatmap: heatmapData,
            userCount: heatmapData.length
        });
    } catch (error) {
        console.error('Error generating heatmap:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to generate heatmap',
            message: error.message 
        });
    }
});

module.exports = router;
/**
 * Admin VC Portfolio Management API Routes
 * 
 * Provides endpoints for:
 * - VC-to-startup assignments
 * - Portfolio viewing and management
 * - Assignment history
 * - Portfolio analytics
 * 
 * All routes require admin role
 */

const express = require('express');
const router = express.Router();
const { verifyFirebaseToken, requireRole, getClientIp } = require('../auth-middleware');
const DatabaseService = require('../database-service');

// All routes require authentication and admin role
router.use(verifyFirebaseToken);
router.use(requireRole('admin'));

/**
 * GET /api/admin/vc/assignments
 * Get all VC-to-startup assignments
 */
router.get('/assignments', async (req, res) => {
    try {
        const db = new DatabaseService();
        const assignments = await db.getVCAssignments();
        
        res.json({
            success: true,
            assignments: assignments,
            count: assignments.length
        });
    } catch (error) {
        console.error('Error fetching VC assignments:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch assignments',
            message: error.message 
        });
    }
});

/**
 * POST /api/admin/vc/assign
 * Assign one or more startups to a VC
 * 
 * Body:
 * - vcUserId: ID of the VC user
 * - startupUserIds: Array of startup user IDs
 * - notes: Optional notes about the assignment
 */
router.post('/assign', async (req, res) => {
    const { vcUserId, startupUserIds, notes } = req.body;
    
    if (!vcUserId || !startupUserIds || !Array.isArray(startupUserIds)) {
        return res.status(400).json({ 
            success: false,
            error: 'vcUserId and startupUserIds (array) are required' 
        });
    }
    
    try {
        const db = new DatabaseService();
        
        // Verify VC user exists and has VC role
        const vcUser = await db.getUserById(vcUserId);
        if (!vcUser) {
            return res.status(404).json({ 
                success: false,
                error: 'VC user not found' 
            });
        }
        
        if (vcUser.role !== 'vc') {
            return res.status(400).json({ 
                success: false,
                error: 'User is not a VC',
                userRole: vcUser.role
            });
        }
        
        // Assign startups
        const results = await db.assignStartupsToVC(
            vcUserId,
            startupUserIds,
            req.user.id,
            notes
        );
        
        // Log admin action
        await db.logAdminAction(
            req.user.id,
            'vc_assignment_created',
            vcUserId,
            { 
                startupCount: startupUserIds.length,
                startupIds: startupUserIds,
                notes: notes
            },
            getClientIp(req)
        );
        
        res.json({ 
            success: true, 
            message: `${startupUserIds.length} startup(s) assigned to VC`,
            assignments: results
        });
    } catch (error) {
        console.error('Error creating VC assignment:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to create assignment',
            message: error.message 
        });
    }
});

/**
 * DELETE /api/admin/vc/assign/:assignmentId
 * Remove a VC-to-startup assignment
 */
router.delete('/assign/:assignmentId', async (req, res) => {
    try {
        const db = new DatabaseService();
        await db.removeVCAssignment(req.params.assignmentId);
        
        // Log admin action
        await db.logAdminAction(
            req.user.id,
            'vc_assignment_removed',
            null,
            { assignmentId: req.params.assignmentId },
            getClientIp(req)
        );
        
        res.json({ 
            success: true, 
            message: 'Assignment removed successfully' 
        });
    } catch (error) {
        console.error('Error removing assignment:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to remove assignment',
            message: error.message 
        });
    }
});

/**
 * GET /api/admin/vc/:vcId/portfolio
 * Get a VC's complete portfolio with GTM scores
 */
router.get('/:vcId/portfolio', async (req, res) => {
    try {
        const db = new DatabaseService();
        const portfolio = await db.getVCPortfolio(req.params.vcId);
        
        res.json({
            success: true,
            portfolio: portfolio,
            count: portfolio.length
        });
    } catch (error) {
        console.error('Error fetching VC portfolio:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch portfolio',
            message: error.message 
        });
    }
});

/**
 * GET /api/admin/vc/list
 * Get all users with VC role
 */
router.get('/list', async (req, res) => {
    try {
        const db = new DatabaseService();
        const vcs = await db.getUsers({ role: 'vc', isActive: true });
        
        // Get assignment counts for each VC
        const vcsWithCounts = await Promise.all(
            vcs.map(async (vc) => {
                const portfolio = await db.getVCPortfolio(vc.id);
                return {
                    ...vc,
                    assignedStartups: portfolio.length
                };
            })
        );
        
        res.json({
            success: true,
            vcs: vcsWithCounts,
            count: vcsWithCounts.length
        });
    } catch (error) {
        console.error('Error fetching VCs:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch VCs',
            message: error.message 
        });
    }
});

/**
 * GET /api/admin/startups/unassigned
 * Get all startup users not assigned to any VC
 */
router.get('/startups/unassigned', async (req, res) => {
    try {
        const db = new DatabaseService();
        
        // Get all startup users
        const allStartups = await db.getUsers({ role: 'user', isActive: true });
        
        // Get all assignments
        const assignments = await db.getVCAssignments();
        const assignedStartupIds = new Set(assignments.map(a => a.startup_user_id));
        
        // Filter unassigned
        const unassigned = allStartups.filter(s => !assignedStartupIds.has(s.id));
        
        res.json({
            success: true,
            startups: unassigned,
            count: unassigned.length
        });
    } catch (error) {
        console.error('Error fetching unassigned startups:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch unassigned startups',
            message: error.message 
        });
    }
});

/**
 * POST /api/admin/vc/:vcId/portfolio/export
 * Export a VC's portfolio to CSV
 */
router.post('/:vcId/portfolio/export', async (req, res) => {
    try {
        const db = new DatabaseService();
        const portfolio = await db.getVCPortfolio(req.params.vcId);
        const vcUser = await db.getUserById(req.params.vcId);
        
        if (!vcUser) {
            return res.status(404).json({ success: false, error: 'VC not found' });
        }
        
        // Convert to CSV
        const headers = ['Startup Name', 'Email', 'Tier', 'Assigned Date', 'Overall GTM Score', 'Completed Blocks'];
        const rows = portfolio.map(s => [
            s.full_name || s.email,
            s.email,
            s.tier,
            new Date(s.assigned_at).toLocaleDateString(),
            s.gtmScores?.overallAverage || 'N/A',
            s.gtmScores?.totalSubcomponents || 0
        ]);
        
        const csv = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');
        
        // Log export action
        await db.logAdminAction(
            req.user.id,
            'vc_portfolio_exported',
            parseInt(req.params.vcId),
            { startupCount: portfolio.length },
            getClientIp(req)
        );
        
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename="vc-portfolio-${vcUser.email}-${Date.now()}.csv"`);
        res.send(csv);
    } catch (error) {
        console.error('Error exporting portfolio:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to export portfolio',
            message: error.message 
        });
    }
});

module.exports = router;
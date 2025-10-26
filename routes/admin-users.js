/**
 * Admin User Management API Routes
 * 
 * Provides endpoints for:
 * - User CRUD operations
 * - Role and tier management
 * - User activation/deactivation
 * - User search and filtering
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
 * GET /api/admin/users
 * List all users with optional filtering
 * 
 * Query params:
 * - role: Filter by role (admin, user, vc, st6_partner)
 * - tier: Filter by tier (0, 1, 2, 3)
 * - status: Filter by subscription status
 * - search: Search by email or name
 * - page: Page number (default: 1)
 * - limit: Results per page (default: 50)
 */
router.get('/users', async (req, res) => {
    const { role, tier, status, search, page = 1, limit = 50, isActive } = req.query;
    
    try {
        const db = new DatabaseService();
        const users = await db.getUsers({
            role,
            tier: tier ? parseInt(tier) : undefined,
            status,
            search,
            page: parseInt(page),
            limit: parseInt(limit),
            isActive: isActive !== undefined ? isActive === 'true' : undefined
        });
        
        // Get total count for pagination
        const allUsers = await db.getUsers({ role, tier, status, search, isActive });
        
        res.json({
            success: true,
            users: users,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: allUsers.length,
                totalPages: Math.ceil(allUsers.length / parseInt(limit))
            }
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch users',
            message: error.message 
        });
    }
});

/**
 * GET /api/admin/users/:id
 * Get detailed information about a specific user
 */
router.get('/users/:id', async (req, res) => {
    try {
        const db = new DatabaseService();
        const user = await db.getUserById(req.params.id);
        
        if (!user) {
            return res.status(404).json({ 
                success: false,
                error: 'User not found' 
            });
        }
        
        // Get additional user data
        const [tags, notes, gtmScores] = await Promise.all([
            db.getUserTags(user.id),
            db.getAdminNotes(user.id),
            db.getUserGTMScores(user.id)
        ]);
        
        res.json({
            success: true,
            user: {
                ...user,
                tags: tags,
                notes: notes,
                gtmScores: gtmScores
            }
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch user',
            message: error.message 
        });
    }
});

/**
 * PUT /api/admin/users/:id/role
 * Update user's role
 */
router.put('/users/:id/role', async (req, res) => {
    const { role } = req.body;
    
    if (!['admin', 'user', 'vc', 'st6_partner'].includes(role)) {
        return res.status(400).json({ 
            success: false,
            error: 'Invalid role',
            validRoles: ['admin', 'user', 'vc', 'st6_partner']
        });
    }
    
    try {
        const db = new DatabaseService();
        
        // Get user before update
        const user = await db.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        
        // Update role
        await db.updateUserRole(req.params.id, role);
        
        // Log admin action
        await db.logAdminAction(
            req.user.id,
            'role_changed',
            parseInt(req.params.id),
            { 
                previousRole: user.role,
                newRole: role 
            },
            getClientIp(req)
        );
        
        res.json({ 
            success: true, 
            message: 'Role updated successfully',
            previousRole: user.role,
            newRole: role
        });
    } catch (error) {
        console.error('Error updating role:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to update role',
            message: error.message 
        });
    }
});

/**
 * PUT /api/admin/users/:id/tier
 * Update user's subscription tier
 */
router.put('/users/:id/tier', async (req, res) => {
    const { tier } = req.body;
    
    if (![0, 1, 2, 3].includes(tier)) {
        return res.status(400).json({ 
            success: false,
            error: 'Invalid tier',
            validTiers: [0, 1, 2, 3]
        });
    }
    
    try {
        const db = new DatabaseService();
        
        // Get user before update
        const user = await db.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        
        // Update tier
        await db.updateUserTier(req.params.id, tier);
        
        // Log admin action
        await db.logAdminAction(
            req.user.id,
            'tier_updated',
            parseInt(req.params.id),
            { 
                previousTier: user.tier,
                newTier: tier 
            },
            getClientIp(req)
        );
        
        res.json({ 
            success: true, 
            message: 'Tier updated successfully',
            previousTier: user.tier,
            newTier: tier
        });
    } catch (error) {
        console.error('Error updating tier:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to update tier',
            message: error.message 
        });
    }
});

/**
 * POST /api/admin/users/:id/deactivate
 * Deactivate a user account
 */
router.post('/users/:id/deactivate', async (req, res) => {
    try {
        const db = new DatabaseService();
        
        // Prevent self-deactivation
        if (parseInt(req.params.id) === req.user.id) {
            return res.status(400).json({ 
                success: false,
                error: 'Cannot deactivate your own account'
            });
        }
        
        await db.deactivateUser(req.params.id);
        
        // Log admin action
        await db.logAdminAction(
            req.user.id,
            'user_deactivated',
            parseInt(req.params.id),
            {},
            getClientIp(req)
        );
        
        res.json({ 
            success: true, 
            message: 'User deactivated successfully' 
        });
    } catch (error) {
        console.error('Error deactivating user:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to deactivate user',
            message: error.message 
        });
    }
});

/**
 * POST /api/admin/users/:id/activate
 * Reactivate a deactivated user account
 */
router.post('/users/:id/activate', async (req, res) => {
    try {
        const db = new DatabaseService();
        
        // Reactivate by setting is_active = 1
        await new Promise((resolve, reject) => {
            db.db.run('UPDATE users SET is_active = 1 WHERE id = ?', [req.params.id], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        
        // Log admin action
        await db.logAdminAction(
            req.user.id,
            'user_activated',
            parseInt(req.params.id),
            {},
            getClientIp(req)
        );
        
        res.json({ 
            success: true, 
            message: 'User activated successfully' 
        });
    } catch (error) {
        console.error('Error activating user:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to activate user',
            message: error.message 
        });
    }
});

/**
 * DELETE /api/admin/users/:id
 * Permanently delete a user account
 */
router.delete('/users/:id', async (req, res) => {
    try {
        const db = new DatabaseService();
        
        // Prevent self-deletion
        if (parseInt(req.params.id) === req.user.id) {
            return res.status(400).json({ 
                success: false,
                error: 'Cannot delete your own account'
            });
        }
        
        // Get user before deletion for logging
        const user = await db.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        
        // Delete user
        await db.deleteUser(req.params.id);
        
        // Log admin action
        await db.logAdminAction(
            req.user.id,
            'user_deleted',
            parseInt(req.params.id),
            { 
                deletedEmail: user.email,
                deletedRole: user.role 
            },
            getClientIp(req)
        );
        
        res.json({ 
            success: true, 
            message: 'User deleted successfully' 
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to delete user',
            message: error.message 
        });
    }
});

/**
 * POST /api/admin/users/:id/tags
 * Add a tag to a user
 */
router.post('/users/:id/tags', async (req, res) => {
    const { tag } = req.body;
    
    if (!tag || typeof tag !== 'string') {
        return res.status(400).json({ 
            success: false,
            error: 'Tag is required' 
        });
    }
    
    try {
        const db = new DatabaseService();
        await db.addUserTag(req.params.id, tag, req.user.id);
        
        res.json({ 
            success: true, 
            message: 'Tag added successfully',
            tag: tag
        });
    } catch (error) {
        console.error('Error adding tag:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to add tag',
            message: error.message 
        });
    }
});

/**
 * DELETE /api/admin/users/:id/tags/:tag
 * Remove a tag from a user
 */
router.delete('/users/:id/tags/:tag', async (req, res) => {
    try {
        const db = new DatabaseService();
        await db.removeUserTag(req.params.id, req.params.tag);
        
        res.json({ 
            success: true, 
            message: 'Tag removed successfully' 
        });
    } catch (error) {
        console.error('Error removing tag:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to remove tag',
            message: error.message 
        });
    }
});

/**
 * POST /api/admin/users/:id/notes
 * Add an admin note to a user
 */
router.post('/users/:id/notes', async (req, res) => {
    const { note, isPinned = false } = req.body;
    
    if (!note || typeof note !== 'string') {
        return res.status(400).json({ 
            success: false,
            error: 'Note is required' 
        });
    }
    
    try {
        const db = new DatabaseService();
        const result = await db.addAdminNote(req.params.id, note, req.user.id, isPinned);
        
        res.json({ 
            success: true, 
            message: 'Note added successfully',
            noteId: result.noteId
        });
    } catch (error) {
        console.error('Error adding note:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to add note',
            message: error.message 
        });
    }
});

/**
 * GET /api/admin/users/:id/notes
 * Get all admin notes for a user
 */
router.get('/users/:id/notes', async (req, res) => {
    try {
        const db = new DatabaseService();
        const notes = await db.getAdminNotes(req.params.id);
        
        res.json({
            success: true,
            notes: notes
        });
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch notes',
            message: error.message 
        });
    }
});

/**
 * GET /api/admin/stats
 * Get admin dashboard overview statistics
 */
router.get('/stats', async (req, res) => {
    try {
        const db = new DatabaseService();
        const stats = await db.getAdminOverviewStats();
        
        res.json({
            success: true,
            stats: stats
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch statistics',
            message: error.message 
        });
    }
});

/**
 * GET /api/admin/audit-log
 * Get admin action history
 */
router.get('/audit-log', async (req, res) => {
    const { days = 30, limit = 100, actionType, adminUserId } = req.query;
    
    try {
        const db = new DatabaseService();
        const actions = await db.getAdminActionHistory({
            days: parseInt(days),
            limit: parseInt(limit),
            actionType,
            adminUserId: adminUserId ? parseInt(adminUserId) : undefined
        });
        
        res.json({
            success: true,
            actions: actions,
            count: actions.length
        });
    } catch (error) {
        console.error('Error fetching audit log:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch audit log',
            message: error.message 
        });
    }
});

/**
 * POST /api/admin/users/export
 * Export users to CSV
 */
router.post('/users/export', async (req, res) => {
    const { role, tier, status } = req.body;
    
    try {
        const db = new DatabaseService();
        const users = await db.getUsers({ role, tier, status });
        
        // Convert to CSV
        const headers = ['ID', 'Email', 'Name', 'Company', 'Role', 'Tier', 'Status', 'Created', 'Last Login'];
        const rows = users.map(u => [
            u.id,
            u.email,
            u.full_name || u.name || '',
            u.company || '',
            u.role,
            u.tier,
            u.subscription_status,
            u.created_at,
            u.last_login || 'Never'
        ]);
        
        const csv = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');
        
        // Log export action
        await db.logAdminAction(
            req.user.id,
            'users_exported',
            null,
            { count: users.length, filters: { role, tier, status } },
            getClientIp(req)
        );
        
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename="scaleops6-users-${Date.now()}.csv"`);
        res.send(csv);
    } catch (error) {
        console.error('Error exporting users:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to export users',
            message: error.message 
        });
    }
});

module.exports = router;
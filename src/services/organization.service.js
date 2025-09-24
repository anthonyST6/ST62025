const { Database, logger } = require('../database/postgres');
const crypto = require('crypto');
const emailService = require('./email.service');

/**
 * Organization Service - Manages organizations and memberships
 */
class OrganizationService {
    /**
     * Get organization by ID
     * @param {string} organizationId - Organization ID
     * @returns {Promise<Object>} Organization
     */
    async getOrganization(organizationId) {
        const org = await Database.getOne(
            `SELECT o.*, 
                    COUNT(DISTINCT om.user_id) as member_count,
                    COUNT(DISTINCT w.id) as workspace_count
             FROM organizations o
             LEFT JOIN organization_members om ON om.organization_id = o.id AND om.is_active = true
             LEFT JOIN workspaces w ON w.organization_id = o.id AND w.is_active = true
             WHERE o.id = $1
             GROUP BY o.id`,
            [organizationId]
        );

        return org;
    }

    /**
     * Update organization
     * @param {string} organizationId - Organization ID
     * @param {Object} updates - Updates to apply
     * @param {string} userId - User making the update
     * @returns {Promise<Object>} Updated organization
     */
    async updateOrganization(organizationId, updates, userId) {
        const allowedFields = [
            'name', 'logo_url', 'website', 'industry', 
            'size', 'billing_email', 'billing_address', 'settings'
        ];

        // Filter to only allowed fields
        const filteredUpdates = {};
        for (const field of allowedFields) {
            if (field in updates) {
                filteredUpdates[field] = updates[field];
            }
        }

        const updated = await Database.update(
            'organizations',
            filteredUpdates,
            { id: organizationId }
        );

        // Log activity
        await Database.insert('audit_logs', {
            organization_id: organizationId,
            user_id: userId,
            action: 'organization_updated',
            resource_type: 'organization',
            resource_id: organizationId,
            changes: filteredUpdates
        });

        return updated[0];
    }

    /**
     * Get organization members
     * @param {string} organizationId - Organization ID
     * @param {Object} options - Query options
     * @returns {Promise<Array>} Members
     */
    async getMembers(organizationId, options = {}) {
        let query = `
            SELECT 
                om.*,
                u.email,
                u.first_name,
                u.last_name,
                u.display_name,
                u.avatar_url,
                u.last_login_at,
                u.email_verified,
                inviter.display_name as invited_by_name
            FROM organization_members om
            JOIN users u ON om.user_id = u.id
            LEFT JOIN users inviter ON om.invited_by = inviter.id
            WHERE om.organization_id = $1
        `;

        const params = [organizationId];
        let paramIndex = 2;

        if (options.role) {
            query += ` AND om.role = $${paramIndex}`;
            params.push(options.role);
            paramIndex++;
        }

        if (options.isActive !== undefined) {
            query += ` AND om.is_active = $${paramIndex}`;
            params.push(options.isActive);
            paramIndex++;
        }

        query += ' ORDER BY om.joined_at DESC';

        if (options.limit) {
            query += ` LIMIT $${paramIndex}`;
            params.push(options.limit);
        }

        return await Database.getMany(query, params);
    }

    /**
     * Add member to organization
     * @param {string} organizationId - Organization ID
     * @param {string} userId - User to add
     * @param {string} role - Member role
     * @param {string} invitedBy - User who invited
     * @returns {Promise<Object>} Membership
     */
    async addMember(organizationId, userId, role, invitedBy) {
        // Check if already a member
        const existing = await Database.getOne(
            'SELECT id FROM organization_members WHERE organization_id = $1 AND user_id = $2',
            [organizationId, userId]
        );

        if (existing) {
            throw new Error('User is already a member of this organization');
        }

        // Check seat availability
        const org = await this.getOrganization(organizationId);
        if (org.member_count >= org.license_seats) {
            throw new Error('Organization has reached its seat limit');
        }

        const member = await Database.insert('organization_members', {
            organization_id: organizationId,
            user_id: userId,
            role: role,
            invited_by: invitedBy,
            invitation_accepted_at: new Date()
        });

        // Update used seats
        await Database.update(
            'organizations',
            { used_seats: org.member_count + 1 },
            { id: organizationId }
        );

        // Log activity
        await Database.insert('audit_logs', {
            organization_id: organizationId,
            user_id: invitedBy,
            action: 'member_added',
            resource_type: 'organization_member',
            resource_id: member.id,
            metadata: { new_member_id: userId, role }
        });

        return member;
    }

    /**
     * Update member role
     * @param {string} organizationId - Organization ID
     * @param {string} userId - User ID
     * @param {string} newRole - New role
     * @param {string} updatedBy - User making the change
     * @returns {Promise<Object>} Updated membership
     */
    async updateMemberRole(organizationId, userId, newRole, updatedBy) {
        // Can't change owner role if they're the only owner
        const owners = await Database.getMany(
            'SELECT user_id FROM organization_members WHERE organization_id = $1 AND role = $2',
            [organizationId, 'owner']
        );

        if (owners.length === 1 && owners[0].user_id === userId && newRole !== 'owner') {
            throw new Error('Cannot remove the last owner from the organization');
        }

        const updated = await Database.update(
            'organization_members',
            { role: newRole },
            { organization_id: organizationId, user_id: userId }
        );

        // Log activity
        await Database.insert('audit_logs', {
            organization_id: organizationId,
            user_id: updatedBy,
            action: 'member_role_updated',
            resource_type: 'organization_member',
            resource_id: userId,
            changes: { role: newRole }
        });

        return updated[0];
    }

    /**
     * Remove member from organization
     * @param {string} organizationId - Organization ID
     * @param {string} userId - User to remove
     * @param {string} removedBy - User performing removal
     * @returns {Promise<void>}
     */
    async removeMember(organizationId, userId, removedBy) {
        // Can't remove the last owner
        const owners = await Database.getMany(
            'SELECT user_id FROM organization_members WHERE organization_id = $1 AND role = $2',
            [organizationId, 'owner']
        );

        if (owners.length === 1 && owners[0].user_id === userId) {
            throw new Error('Cannot remove the last owner from the organization');
        }

        await Database.update(
            'organization_members',
            { is_active: false },
            { organization_id: organizationId, user_id: userId }
        );

        // Update used seats
        const org = await this.getOrganization(organizationId);
        await Database.update(
            'organizations',
            { used_seats: Math.max(0, org.used_seats - 1) },
            { id: organizationId }
        );

        // Log activity
        await Database.insert('audit_logs', {
            organization_id: organizationId,
            user_id: removedBy,
            action: 'member_removed',
            resource_type: 'organization_member',
            resource_id: userId
        });
    }

    /**
     * Invite user to organization
     * @param {Object} inviteData - Invitation data
     * @returns {Promise<Object>} Invitation
     */
    async inviteUser(inviteData) {
        const {
            organizationId,
            email,
            role,
            invitedBy
        } = inviteData;

        // Check if user already exists
        const existingUser = await Database.getOne(
            'SELECT id FROM users WHERE email = $1',
            [email.toLowerCase()]
        );

        if (existingUser) {
            // Check if already a member
            const existingMember = await Database.getOne(
                'SELECT id FROM organization_members WHERE organization_id = $1 AND user_id = $2',
                [organizationId, existingUser.id]
            );

            if (existingMember) {
                throw new Error('User is already a member of this organization');
            }
        }

        // Check seat availability
        const org = await this.getOrganization(organizationId);
        if (org.member_count >= org.license_seats) {
            throw new Error('Organization has reached its seat limit');
        }

        // Generate invitation token
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

        // Create invitation
        const invitation = await Database.insert('organization_invitations', {
            organization_id: organizationId,
            email: email.toLowerCase(),
            role: role,
            token: token,
            invited_by: invitedBy,
            expires_at: expiresAt
        });

        // Get inviter details
        const inviter = await Database.getOne(
            'SELECT first_name, last_name FROM users WHERE id = $1',
            [invitedBy]
        );

        // Send invitation email
        await emailService.sendInvitationEmail(
            email,
            `${inviter.first_name} ${inviter.last_name}`,
            org.name,
            token
        );

        // Log activity
        await Database.insert('audit_logs', {
            organization_id: organizationId,
            user_id: invitedBy,
            action: 'invitation_sent',
            resource_type: 'invitation',
            resource_id: invitation.id,
            metadata: { email, role }
        });

        return invitation;
    }

    /**
     * Accept invitation
     * @param {string} token - Invitation token
     * @param {string} userId - User accepting (if exists)
     * @returns {Promise<Object>} Membership
     */
    async acceptInvitation(token, userId = null) {
        // Get invitation
        const invitation = await Database.getOne(
            `SELECT i.*, o.name as org_name 
             FROM organization_invitations i
             JOIN organizations o ON i.organization_id = o.id
             WHERE i.token = $1 
               AND i.expires_at > NOW() 
               AND i.accepted_at IS NULL`,
            [token]
        );

        if (!invitation) {
            throw new Error('Invalid or expired invitation');
        }

        // If no userId provided, user needs to register first
        if (!userId) {
            return {
                requiresRegistration: true,
                invitation: {
                    email: invitation.email,
                    organizationName: invitation.org_name,
                    role: invitation.role
                }
            };
        }

        // Add user to organization
        const membership = await this.addMember(
            invitation.organization_id,
            userId,
            invitation.role,
            invitation.invited_by
        );

        // Mark invitation as accepted
        await Database.update(
            'organization_invitations',
            {
                accepted_by: userId,
                accepted_at: new Date()
            },
            { id: invitation.id }
        );

        return membership;
    }

    /**
     * Get organization statistics
     * @param {string} organizationId - Organization ID
     * @returns {Promise<Object>} Statistics
     */
    async getOrganizationStats(organizationId) {
        const stats = {};

        // Member stats
        stats.members = await Database.getOne(`
            SELECT 
                COUNT(*) as total,
                COUNT(*) FILTER (WHERE role = 'owner') as owners,
                COUNT(*) FILTER (WHERE role = 'admin') as admins,
                COUNT(*) FILTER (WHERE role = 'editor') as editors,
                COUNT(*) FILTER (WHERE role = 'viewer') as viewers
            FROM organization_members
            WHERE organization_id = $1 AND is_active = true
        `, [organizationId]);

        // Workspace stats
        stats.workspaces = await Database.getOne(`
            SELECT COUNT(*) as total
            FROM workspaces
            WHERE organization_id = $1 AND is_active = true
        `, [organizationId]);

        // Worksheet stats
        stats.worksheets = await Database.getOne(`
            SELECT 
                COUNT(DISTINCT subcomponent_id) as unique_subcomponents,
                COUNT(*) FILTER (WHERE is_current = true) as current_versions,
                COUNT(*) as total_versions
            FROM worksheets
            WHERE organization_id = $1
        `, [organizationId]);

        // Analysis stats
        stats.analyses = await Database.getOne(`
            SELECT 
                COUNT(*) as total,
                AVG(score) as avg_score,
                MAX(created_at) as last_analysis
            FROM analyses
            WHERE organization_id = $1
        `, [organizationId]);

        // Storage stats
        stats.storage = await Database.getOne(`
            SELECT 
                COUNT(*) as document_count,
                COALESCE(SUM(file_size_bytes) / 1073741824.0, 0) as used_gb
            FROM documents
            WHERE organization_id = $1 AND deleted_at IS NULL
        `, [organizationId]);

        // Activity stats
        stats.activity = await Database.getOne(`
            SELECT 
                COUNT(*) as total_actions,
                COUNT(DISTINCT user_id) as active_users,
                MAX(created_at) as last_activity
            FROM audit_logs
            WHERE organization_id = $1 
              AND created_at > NOW() - INTERVAL '30 days'
        `, [organizationId]);

        return stats;
    }

    /**
     * Get organization usage for billing
     * @param {string} organizationId - Organization ID
     * @returns {Promise<Object>} Usage data
     */
    async getOrganizationUsage(organizationId) {
        const org = await this.getOrganization(organizationId);
        const stats = await this.getOrganizationStats(organizationId);

        return {
            subscription: {
                tier: org.subscription_tier,
                status: org.subscription_status,
                trialEndsAt: org.trial_ends_at
            },
            seats: {
                used: org.used_seats || stats.members.total,
                limit: org.license_seats,
                available: org.license_seats - (org.used_seats || stats.members.total)
            },
            storage: {
                usedGb: parseFloat(stats.storage.used_gb),
                limitGb: org.storage_quota_gb,
                availableGb: org.storage_quota_gb - parseFloat(stats.storage.used_gb)
            },
            activity: {
                activeUsers: stats.activity.active_users,
                totalActions: stats.activity.total_actions,
                lastActivity: stats.activity.last_activity
            }
        };
    }

    /**
     * Update subscription
     * @param {string} organizationId - Organization ID
     * @param {Object} subscription - Subscription details
     * @returns {Promise<Object>} Updated organization
     */
    async updateSubscription(organizationId, subscription) {
        const updates = {
            subscription_tier: subscription.tier,
            subscription_status: subscription.status,
            license_seats: subscription.seats,
            storage_quota_gb: subscription.storageGb
        };

        if (subscription.tier === 'trial') {
            updates.trial_ends_at = new Date(Date.now() + subscription.trialDays * 24 * 60 * 60 * 1000);
        }

        const updated = await Database.update(
            'organizations',
            updates,
            { id: organizationId }
        );

        // Log activity
        await Database.insert('audit_logs', {
            organization_id: organizationId,
            action: 'subscription_updated',
            resource_type: 'organization',
            resource_id: organizationId,
            changes: updates
        });

        return updated[0];
    }

    /**
     * Check if user has permission in organization
     * @param {string} userId - User ID
     * @param {string} organizationId - Organization ID
     * @param {string} permission - Required permission
     * @returns {Promise<boolean>} Has permission
     */
    async hasPermission(userId, organizationId, permission) {
        const member = await Database.getOne(
            'SELECT role, permissions FROM organization_members WHERE user_id = $1 AND organization_id = $2 AND is_active = true',
            [userId, organizationId]
        );

        if (!member) {
            return false;
        }

        // Owners have all permissions
        if (member.role === 'owner') {
            return true;
        }

        // Check role-based permissions
        const rolePermissions = {
            admin: ['read', 'write', 'delete', 'invite', 'manage_workspace'],
            editor: ['read', 'write'],
            viewer: ['read']
        };

        const hasRolePermission = rolePermissions[member.role]?.includes(permission);

        // Check custom permissions
        const hasCustomPermission = member.permissions?.includes(permission);

        return hasRolePermission || hasCustomPermission;
    }
}

// Export singleton instance
module.exports = new OrganizationService();
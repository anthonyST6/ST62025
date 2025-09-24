const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { Database } = require('../database/postgres');
const jwtService = require('./jwt.service');
const emailService = require('../services/email.service');
const { logger } = require('../database/postgres');

class AuthService {
    constructor() {
        this.bcryptRounds = parseInt(process.env.BCRYPT_ROUNDS || '10');
    }

    /**
     * Register a new user and organization
     * @param {Object} userData - User registration data
     * @returns {Promise<Object>} Created user and tokens
     */
    async register(userData) {
        const {
            email,
            password,
            firstName,
            lastName,
            organizationName,
            organizationSlug,
            industry,
            size,
            role = 'owner'
        } = userData;

        try {
            // Start transaction
            return await Database.transaction(async (client) => {
                // Check if user already exists
                const existingUser = await Database.getOne(
                    'SELECT id FROM users WHERE email = $1',
                    [email.toLowerCase()]
                );

                if (existingUser) {
                    throw new Error('User with this email already exists');
                }

                // Check if organization slug is taken
                if (organizationSlug) {
                    const existingOrg = await Database.getOne(
                        'SELECT id FROM organizations WHERE slug = $1',
                        [organizationSlug.toLowerCase()]
                    );

                    if (existingOrg) {
                        throw new Error('Organization slug is already taken');
                    }
                }

                // Hash password
                const passwordHash = await bcrypt.hash(password, this.bcryptRounds);

                // Create user
                const user = await Database.insert('users', {
                    email: email.toLowerCase(),
                    password_hash: passwordHash,
                    first_name: firstName,
                    last_name: lastName,
                    display_name: `${firstName} ${lastName}`.trim(),
                    email_verified: false
                });

                // Generate organization slug if not provided
                const finalSlug = organizationSlug || 
                    this.generateSlug(organizationName || `${firstName}-${lastName}-org`);

                // Create organization
                const organization = await Database.insert('organizations', {
                    name: organizationName || `${firstName}'s Organization`,
                    slug: finalSlug.toLowerCase(),
                    industry: industry,
                    size: size,
                    subscription_tier: 'trial',
                    subscription_status: 'active',
                    trial_ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days trial
                });

                // Add user as organization owner
                await Database.insert('organization_members', {
                    organization_id: organization.id,
                    user_id: user.id,
                    role: role,
                    invitation_accepted_at: new Date()
                });

                // Create default workspace
                const workspace = await Database.insert('workspaces', {
                    organization_id: organization.id,
                    name: 'Main Workspace',
                    slug: 'main',
                    description: 'Primary workspace',
                    is_default: true,
                    created_by: user.id
                });

                // Generate tokens
                const tokens = jwtService.generateTokenPair({
                    userId: user.id,
                    organizationId: organization.id,
                    workspaceId: workspace.id,
                    role: role,
                    permissions: this.getRolePermissions(role)
                });

                // Create session
                await jwtService.createSession({
                    userId: user.id,
                    organizationId: organization.id,
                    accessToken: tokens.accessToken,
                    refreshToken: tokens.refreshToken,
                    ipAddress: userData.ipAddress,
                    userAgent: userData.userAgent
                });

                // Send verification email
                await this.sendVerificationEmail(user.email, user.id);

                // Log activity
                await this.logActivity({
                    userId: user.id,
                    organizationId: organization.id,
                    action: 'user_registered',
                    resourceType: 'user',
                    resourceId: user.id,
                    ipAddress: userData.ipAddress
                });

                return {
                    user: {
                        id: user.id,
                        email: user.email,
                        firstName: user.first_name,
                        lastName: user.last_name,
                        displayName: user.display_name,
                        emailVerified: user.email_verified
                    },
                    organization: {
                        id: organization.id,
                        name: organization.name,
                        slug: organization.slug
                    },
                    workspace: {
                        id: workspace.id,
                        name: workspace.name,
                        slug: workspace.slug
                    },
                    tokens
                };
            });
        } catch (error) {
            logger.error('Registration error:', error);
            throw error;
        }
    }

    /**
     * Login user
     * @param {Object} credentials - Login credentials
     * @returns {Promise<Object>} User data and tokens
     */
    async login(credentials) {
        const { email, password, organizationSlug, ipAddress, userAgent } = credentials;

        try {
            // Get user with organization membership
            const query = organizationSlug ? `
                SELECT u.*, om.role, om.permissions, om.organization_id,
                       o.name as org_name, o.slug as org_slug, o.subscription_status,
                       w.id as workspace_id, w.name as workspace_name
                FROM users u
                JOIN organization_members om ON om.user_id = u.id
                JOIN organizations o ON o.id = om.organization_id
                LEFT JOIN workspaces w ON w.organization_id = o.id AND w.is_default = true
                WHERE u.email = $1 AND o.slug = $2 AND om.is_active = true
            ` : `
                SELECT u.*, om.role, om.permissions, om.organization_id,
                       o.name as org_name, o.slug as org_slug, o.subscription_status,
                       w.id as workspace_id, w.name as workspace_name
                FROM users u
                LEFT JOIN organization_members om ON om.user_id = u.id
                LEFT JOIN organizations o ON o.id = om.organization_id
                LEFT JOIN workspaces w ON w.organization_id = o.id AND w.is_default = true
                WHERE u.email = $1
                LIMIT 1
            `;

            const params = organizationSlug ? 
                [email.toLowerCase(), organizationSlug.toLowerCase()] : 
                [email.toLowerCase()];

            const user = await Database.getOne(query, params);

            if (!user) {
                throw new Error('Invalid email or password');
            }

            // Check if user is active
            if (!user.is_active) {
                throw new Error('Account is deactivated');
            }

            // Check if user is locked
            if (user.locked_until && new Date(user.locked_until) > new Date()) {
                throw new Error('Account is temporarily locked due to multiple failed login attempts');
            }

            // Verify password
            const isValidPassword = await bcrypt.compare(password, user.password_hash);

            if (!isValidPassword) {
                // Increment failed login attempts
                await this.incrementFailedLoginAttempts(user.id);
                throw new Error('Invalid email or password');
            }

            // Check organization subscription status
            if (user.subscription_status === 'suspended' || user.subscription_status === 'cancelled') {
                throw new Error('Organization subscription is not active');
            }

            // Reset failed login attempts
            await Database.update('users', {
                failed_login_attempts: 0,
                locked_until: null,
                last_login_at: new Date(),
                last_login_ip: ipAddress
            }, {
                id: user.id
            });

            // Generate tokens
            const tokens = jwtService.generateTokenPair({
                userId: user.id,
                organizationId: user.organization_id,
                workspaceId: user.workspace_id,
                role: user.role,
                permissions: user.permissions || this.getRolePermissions(user.role)
            });

            // Create session
            await jwtService.createSession({
                userId: user.id,
                organizationId: user.organization_id,
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
                ipAddress,
                userAgent
            });

            // Log activity
            await this.logActivity({
                userId: user.id,
                organizationId: user.organization_id,
                action: 'user_login',
                resourceType: 'session',
                ipAddress
            });

            return {
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    displayName: user.display_name,
                    avatarUrl: user.avatar_url,
                    emailVerified: user.email_verified,
                    role: user.role
                },
                organization: user.organization_id ? {
                    id: user.organization_id,
                    name: user.org_name,
                    slug: user.org_slug
                } : null,
                workspace: user.workspace_id ? {
                    id: user.workspace_id,
                    name: user.workspace_name
                } : null,
                tokens
            };
        } catch (error) {
            logger.error('Login error:', error);
            throw error;
        }
    }

    /**
     * Logout user
     * @param {string} sessionId - Session ID
     * @param {string} userId - User ID
     */
    async logout(sessionId, userId) {
        await jwtService.revokeSession(sessionId, userId, 'User logout');
        
        await this.logActivity({
            userId,
            action: 'user_logout',
            resourceType: 'session',
            resourceId: sessionId
        });
    }

    /**
     * Request password reset
     * @param {string} email - User email
     * @returns {Promise<void>}
     */
    async requestPasswordReset(email) {
        const user = await Database.getOne(
            'SELECT id, email, first_name FROM users WHERE email = $1',
            [email.toLowerCase()]
        );

        if (!user) {
            // Don't reveal if user exists
            return;
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenHash = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        // Save reset token (expires in 1 hour)
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
        
        await Database.update('users', {
            password_reset_token: resetTokenHash,
            password_reset_expires: expiresAt
        }, {
            id: user.id
        });

        // Send reset email
        await emailService.sendPasswordResetEmail(
            user.email,
            user.first_name,
            resetToken
        );

        await this.logActivity({
            userId: user.id,
            action: 'password_reset_requested',
            resourceType: 'user',
            resourceId: user.id
        });
    }

    /**
     * Reset password with token
     * @param {string} token - Reset token
     * @param {string} newPassword - New password
     */
    async resetPassword(token, newPassword) {
        const tokenHash = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');

        const user = await Database.getOne(`
            SELECT id, email FROM users 
            WHERE password_reset_token = $1 
                AND password_reset_expires > NOW()
        `, [tokenHash]);

        if (!user) {
            throw new Error('Invalid or expired reset token');
        }

        // Hash new password
        const passwordHash = await bcrypt.hash(newPassword, this.bcryptRounds);

        // Update password and clear reset token
        await Database.update('users', {
            password_hash: passwordHash,
            password_reset_token: null,
            password_reset_expires: null,
            failed_login_attempts: 0,
            locked_until: null
        }, {
            id: user.id
        });

        // Revoke all existing sessions
        await jwtService.revokeAllUserSessions(user.id, 'Password reset');

        await this.logActivity({
            userId: user.id,
            action: 'password_reset_completed',
            resourceType: 'user',
            resourceId: user.id
        });
    }

    /**
     * Change password for authenticated user
     * @param {string} userId - User ID
     * @param {string} currentPassword - Current password
     * @param {string} newPassword - New password
     */
    async changePassword(userId, currentPassword, newPassword) {
        const user = await Database.getOne(
            'SELECT password_hash FROM users WHERE id = $1',
            [userId]
        );

        if (!user) {
            throw new Error('User not found');
        }

        // Verify current password
        const isValid = await bcrypt.compare(currentPassword, user.password_hash);
        if (!isValid) {
            throw new Error('Current password is incorrect');
        }

        // Hash new password
        const passwordHash = await bcrypt.hash(newPassword, this.bcryptRounds);

        // Update password
        await Database.update('users', {
            password_hash: passwordHash
        }, {
            id: userId
        });

        await this.logActivity({
            userId,
            action: 'password_changed',
            resourceType: 'user',
            resourceId: userId
        });
    }

    /**
     * Verify email with token
     * @param {string} token - Verification token
     */
    async verifyEmail(token) {
        // This would typically involve a verification token table
        // For now, simplified implementation
        const userId = token; // In production, decode the token

        await Database.update('users', {
            email_verified: true,
            email_verified_at: new Date()
        }, {
            id: userId
        });

        await this.logActivity({
            userId,
            action: 'email_verified',
            resourceType: 'user',
            resourceId: userId
        });
    }

    /**
     * Send verification email
     * @param {string} email - User email
     * @param {string} userId - User ID
     */
    async sendVerificationEmail(email, userId) {
        // In production, generate a proper verification token
        const verificationToken = userId; // Simplified for now
        
        // Send email (implement email service)
        logger.info(`Verification email would be sent to ${email} with token ${verificationToken}`);
    }

    /**
     * Increment failed login attempts
     * @param {string} userId - User ID
     */
    async incrementFailedLoginAttempts(userId) {
        const user = await Database.getOne(
            'SELECT failed_login_attempts FROM users WHERE id = $1',
            [userId]
        );

        const attempts = (user.failed_login_attempts || 0) + 1;
        const updates = { failed_login_attempts: attempts };

        // Lock account after 5 failed attempts for 30 minutes
        if (attempts >= 5) {
            updates.locked_until = new Date(Date.now() + 30 * 60 * 1000);
        }

        await Database.update('users', updates, { id: userId });
    }

    /**
     * Get role permissions
     * @param {string} role - User role
     * @returns {Array} Permissions array
     */
    getRolePermissions(role) {
        const permissions = {
            owner: ['*'], // All permissions
            admin: [
                'read', 'write', 'delete',
                'analyze', 'export', 'import',
                'invite_users', 'manage_users',
                'manage_workspace', 'manage_billing'
            ],
            editor: [
                'read', 'write',
                'analyze', 'export',
                'upload_documents'
            ],
            viewer: [
                'read', 'export'
            ]
        };

        return permissions[role] || permissions.viewer;
    }

    /**
     * Generate slug from text
     * @param {string} text - Text to slugify
     * @returns {string} Slug
     */
    generateSlug(text) {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .substring(0, 50);
    }

    /**
     * Log activity
     * @param {Object} activity - Activity data
     */
    async logActivity(activity) {
        try {
            await Database.insert('audit_logs', {
                organization_id: activity.organizationId,
                user_id: activity.userId,
                action: activity.action,
                resource_type: activity.resourceType,
                resource_id: activity.resourceId,
                ip_address: activity.ipAddress,
                metadata: activity.metadata || {}
            });
        } catch (error) {
            logger.error('Failed to log activity:', error);
        }
    }
}

// Export singleton instance
module.exports = new AuthService();
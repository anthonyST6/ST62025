const express = require('express');
const router = express.Router();
const Joi = require('joi');
const authService = require('../auth/auth.service');
const jwtService = require('../auth/jwt.service');
const { 
    authenticate, 
    validateBody, 
    rateLimit,
    auditLog 
} = require('../middleware/auth.middleware');
const { logger } = require('../database/postgres');

// Validation schemas
const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(128).required()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .messages({
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
        .messages({ 'any.only': 'Passwords do not match' }),
    firstName: Joi.string().min(1).max(100).required(),
    lastName: Joi.string().min(1).max(100).required(),
    organizationName: Joi.string().min(2).max(255).optional(),
    organizationSlug: Joi.string().min(2).max(100).pattern(/^[a-z0-9-]+$/).optional()
        .messages({ 'string.pattern.base': 'Organization slug can only contain lowercase letters, numbers, and hyphens' }),
    industry: Joi.string().max(100).optional(),
    size: Joi.string().valid('1-10', '11-50', '51-200', '201-500', '501-1000', '1000+').optional(),
    acceptTerms: Joi.boolean().valid(true).required()
        .messages({ 'any.only': 'You must accept the terms and conditions' })
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    organizationSlug: Joi.string().optional(),
    rememberMe: Joi.boolean().optional()
});

const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required()
});

const resetPasswordSchema = Joi.object({
    token: Joi.string().required(),
    password: Joi.string().min(8).max(128).required()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
});

const changePasswordSchema = Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().min(8).max(128).required()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/),
    confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required()
});

const refreshTokenSchema = Joi.object({
    refreshToken: Joi.string().required()
});

/**
 * @route   POST /api/auth/register
 * @desc    Register new user and organization
 * @access  Public
 */
router.post('/register',
    rateLimit({ max: 5, windowMs: 15 * 60 * 1000 }), // 5 requests per 15 minutes
    validateBody(registerSchema),
    auditLog('user_registration', 'user'),
    async (req, res) => {
        try {
            const userData = {
                ...req.body,
                ipAddress: req.ip,
                userAgent: req.headers['user-agent']
            };

            const result = await authService.register(userData);

            res.status(201).json({
                success: true,
                message: 'Registration successful. Please check your email to verify your account.',
                data: result
            });
        } catch (error) {
            logger.error('Registration error:', error);
            
            if (error.message.includes('already exists')) {
                return res.status(409).json({
                    error: error.message,
                    code: 'ALREADY_EXISTS'
                });
            }

            res.status(400).json({
                error: error.message || 'Registration failed',
                code: 'REGISTRATION_FAILED'
            });
        }
    }
);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login',
    rateLimit({ max: 10, windowMs: 15 * 60 * 1000 }), // 10 requests per 15 minutes
    validateBody(loginSchema),
    async (req, res) => {
        try {
            const credentials = {
                ...req.body,
                ipAddress: req.ip,
                userAgent: req.headers['user-agent']
            };

            const result = await authService.login(credentials);

            // Set secure HTTP-only cookie for refresh token
            if (req.body.rememberMe) {
                res.cookie('refreshToken', result.tokens.refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
                });
            }

            res.json({
                success: true,
                message: 'Login successful',
                data: result
            });
        } catch (error) {
            logger.error('Login error:', error);
            
            if (error.message.includes('locked')) {
                return res.status(423).json({
                    error: error.message,
                    code: 'ACCOUNT_LOCKED'
                });
            }

            res.status(401).json({
                error: error.message || 'Login failed',
                code: 'LOGIN_FAILED'
            });
        }
    }
);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user
 * @access  Private
 */
router.post('/logout',
    authenticate,
    async (req, res) => {
        try {
            await authService.logout(req.auth.sessionId, req.auth.userId);

            // Clear refresh token cookie
            res.clearCookie('refreshToken');

            res.json({
                success: true,
                message: 'Logout successful'
            });
        } catch (error) {
            logger.error('Logout error:', error);
            res.status(500).json({
                error: 'Logout failed',
                code: 'LOGOUT_FAILED'
            });
        }
    }
);

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh access token
 * @access  Public
 */
router.post('/refresh',
    validateBody(refreshTokenSchema),
    async (req, res) => {
        try {
            // Get refresh token from body or cookie
            const refreshToken = req.body.refreshToken || req.cookies?.refreshToken;

            if (!refreshToken) {
                return res.status(401).json({
                    error: 'Refresh token required',
                    code: 'NO_REFRESH_TOKEN'
                });
            }

            const tokens = await jwtService.refreshAccessToken(refreshToken);

            res.json({
                success: true,
                data: { tokens }
            });
        } catch (error) {
            logger.error('Token refresh error:', error);
            res.status(401).json({
                error: error.message || 'Token refresh failed',
                code: 'REFRESH_FAILED'
            });
        }
    }
);

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Request password reset
 * @access  Public
 */
router.post('/forgot-password',
    rateLimit({ max: 3, windowMs: 60 * 60 * 1000 }), // 3 requests per hour
    validateBody(forgotPasswordSchema),
    async (req, res) => {
        try {
            await authService.requestPasswordReset(req.body.email);

            // Always return success to prevent email enumeration
            res.json({
                success: true,
                message: 'If an account exists with this email, a password reset link has been sent.'
            });
        } catch (error) {
            logger.error('Password reset request error:', error);
            // Still return success to prevent enumeration
            res.json({
                success: true,
                message: 'If an account exists with this email, a password reset link has been sent.'
            });
        }
    }
);

/**
 * @route   POST /api/auth/reset-password
 * @desc    Reset password with token
 * @access  Public
 */
router.post('/reset-password',
    validateBody(resetPasswordSchema),
    auditLog('password_reset', 'user'),
    async (req, res) => {
        try {
            await authService.resetPassword(req.body.token, req.body.password);

            res.json({
                success: true,
                message: 'Password reset successful. Please login with your new password.'
            });
        } catch (error) {
            logger.error('Password reset error:', error);
            res.status(400).json({
                error: error.message || 'Password reset failed',
                code: 'RESET_FAILED'
            });
        }
    }
);

/**
 * @route   POST /api/auth/change-password
 * @desc    Change password for authenticated user
 * @access  Private
 */
router.post('/change-password',
    authenticate,
    validateBody(changePasswordSchema),
    auditLog('password_change', 'user'),
    async (req, res) => {
        try {
            await authService.changePassword(
                req.auth.userId,
                req.body.currentPassword,
                req.body.newPassword
            );

            res.json({
                success: true,
                message: 'Password changed successfully'
            });
        } catch (error) {
            logger.error('Password change error:', error);
            res.status(400).json({
                error: error.message || 'Password change failed',
                code: 'CHANGE_FAILED'
            });
        }
    }
);

/**
 * @route   GET /api/auth/verify-email/:token
 * @desc    Verify email address
 * @access  Public
 */
router.get('/verify-email/:token',
    async (req, res) => {
        try {
            await authService.verifyEmail(req.params.token);

            res.json({
                success: true,
                message: 'Email verified successfully'
            });
        } catch (error) {
            logger.error('Email verification error:', error);
            res.status(400).json({
                error: 'Email verification failed',
                code: 'VERIFICATION_FAILED'
            });
        }
    }
);

/**
 * @route   POST /api/auth/resend-verification
 * @desc    Resend verification email
 * @access  Private
 */
router.post('/resend-verification',
    authenticate,
    rateLimit({ max: 3, windowMs: 60 * 60 * 1000 }), // 3 requests per hour
    async (req, res) => {
        try {
            await authService.sendVerificationEmail(req.auth.email, req.auth.userId);

            res.json({
                success: true,
                message: 'Verification email sent'
            });
        } catch (error) {
            logger.error('Resend verification error:', error);
            res.status(500).json({
                error: 'Failed to send verification email',
                code: 'SEND_FAILED'
            });
        }
    }
);

/**
 * @route   GET /api/auth/me
 * @desc    Get current user info
 * @access  Private
 */
router.get('/me',
    authenticate,
    async (req, res) => {
        try {
            res.json({
                success: true,
                data: {
                    user: {
                        id: req.auth.userId,
                        email: req.auth.email,
                        firstName: req.auth.firstName,
                        lastName: req.auth.lastName,
                        role: req.auth.role
                    },
                    organization: req.auth.organizationId ? {
                        id: req.auth.organizationId,
                        name: req.auth.organizationName,
                        slug: req.auth.organizationSlug
                    } : null
                }
            });
        } catch (error) {
            logger.error('Get user error:', error);
            res.status(500).json({
                error: 'Failed to get user info',
                code: 'GET_USER_FAILED'
            });
        }
    }
);

/**
 * @route   GET /api/auth/sessions
 * @desc    Get user's active sessions
 * @access  Private
 */
router.get('/sessions',
    authenticate,
    async (req, res) => {
        try {
            const sessions = await jwtService.getUserActiveSessions(req.auth.userId);

            res.json({
                success: true,
                data: { sessions }
            });
        } catch (error) {
            logger.error('Get sessions error:', error);
            res.status(500).json({
                error: 'Failed to get sessions',
                code: 'GET_SESSIONS_FAILED'
            });
        }
    }
);

/**
 * @route   DELETE /api/auth/sessions/:sessionId
 * @desc    Revoke specific session
 * @access  Private
 */
router.delete('/sessions/:sessionId',
    authenticate,
    auditLog('session_revoked', 'session'),
    async (req, res) => {
        try {
            await jwtService.revokeSession(
                req.params.sessionId,
                req.auth.userId,
                'User revoked session'
            );

            res.json({
                success: true,
                message: 'Session revoked successfully'
            });
        } catch (error) {
            logger.error('Revoke session error:', error);
            res.status(500).json({
                error: 'Failed to revoke session',
                code: 'REVOKE_FAILED'
            });
        }
    }
);

/**
 * @route   POST /api/auth/revoke-all
 * @desc    Revoke all user sessions
 * @access  Private
 */
router.post('/revoke-all',
    authenticate,
    auditLog('all_sessions_revoked', 'session'),
    async (req, res) => {
        try {
            await jwtService.revokeAllUserSessions(
                req.auth.userId,
                'User revoked all sessions'
            );

            res.json({
                success: true,
                message: 'All sessions revoked successfully. Please login again.'
            });
        } catch (error) {
            logger.error('Revoke all sessions error:', error);
            res.status(500).json({
                error: 'Failed to revoke sessions',
                code: 'REVOKE_ALL_FAILED'
            });
        }
    }
);

module.exports = router;
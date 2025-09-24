const jwtService = require('../auth/jwt.service');
const { Database } = require('../database/postgres');
const { logger } = require('../database/postgres');

/**
 * Authentication middleware - verifies JWT token
 */
const authenticate = async (req, res, next) => {
    try {
        // Extract token from header
        const authHeader = req.headers.authorization;
        const token = jwtService.extractTokenFromHeader(authHeader);

        if (!token) {
            return res.status(401).json({
                error: 'Authentication required',
                code: 'NO_TOKEN'
            });
        }

        // Verify token
        let decoded;
        try {
            decoded = jwtService.verifyAccessToken(token);
        } catch (error) {
            if (error.message === 'Access token expired') {
                return res.status(401).json({
                    error: 'Token expired',
                    code: 'TOKEN_EXPIRED'
                });
            }
            return res.status(401).json({
                error: 'Invalid token',
                code: 'INVALID_TOKEN'
            });
        }

        // Validate session in database
        const session = await jwtService.validateSession(token);
        
        if (!session) {
            return res.status(401).json({
                error: 'Session not found or expired',
                code: 'INVALID_SESSION'
            });
        }

        // Set request context
        req.auth = {
            userId: session.user_id,
            organizationId: session.organization_id,
            organizationSlug: session.org_slug,
            organizationName: session.org_name,
            email: session.email,
            firstName: session.first_name,
            lastName: session.last_name,
            role: session.role,
            permissions: session.permissions || [],
            sessionId: session.id
        };

        // Set PostgreSQL session variable for RLS
        if (session.organization_id) {
            await Database.setOrganizationContext(session.organization_id);
        }

        // Log API access (for critical endpoints)
        if (req.logAccess) {
            await Database.insert('audit_logs', {
                organization_id: session.organization_id,
                user_id: session.user_id,
                session_id: session.id,
                action: `api_access:${req.method}:${req.path}`,
                resource_type: 'api',
                ip_address: req.ip,
                user_agent: req.headers['user-agent'],
                metadata: {
                    method: req.method,
                    path: req.path,
                    query: req.query
                }
            });
        }

        next();
    } catch (error) {
        logger.error('Authentication error:', error);
        return res.status(500).json({
            error: 'Authentication failed',
            code: 'AUTH_ERROR'
        });
    }
};

/**
 * Optional authentication - doesn't fail if no token
 */
const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = jwtService.extractTokenFromHeader(authHeader);

        if (token) {
            try {
                const decoded = jwtService.verifyAccessToken(token);
                const session = await jwtService.validateSession(token);
                
                if (session) {
                    req.auth = {
                        userId: session.user_id,
                        organizationId: session.organization_id,
                        organizationSlug: session.org_slug,
                        email: session.email,
                        role: session.role,
                        permissions: session.permissions || []
                    };

                    if (session.organization_id) {
                        await Database.setOrganizationContext(session.organization_id);
                    }
                }
            } catch (error) {
                // Ignore token errors for optional auth
                logger.debug('Optional auth token error:', error.message);
            }
        }

        next();
    } catch (error) {
        logger.error('Optional auth error:', error);
        next();
    }
};

/**
 * Require specific permission
 */
const requirePermission = (permission) => {
    return (req, res, next) => {
        if (!req.auth) {
            return res.status(401).json({
                error: 'Authentication required',
                code: 'NOT_AUTHENTICATED'
            });
        }

        const { permissions, role } = req.auth;

        // Owner has all permissions
        if (role === 'owner' || permissions?.includes('*')) {
            return next();
        }

        // Check specific permission
        if (!permissions?.includes(permission)) {
            logger.warn('Permission denied', {
                userId: req.auth.userId,
                required: permission,
                actual: permissions
            });

            return res.status(403).json({
                error: 'Insufficient permissions',
                code: 'PERMISSION_DENIED',
                required: permission
            });
        }

        next();
    };
};

/**
 * Require specific role
 */
const requireRole = (roles) => {
    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    
    return (req, res, next) => {
        if (!req.auth) {
            return res.status(401).json({
                error: 'Authentication required',
                code: 'NOT_AUTHENTICATED'
            });
        }

        if (!allowedRoles.includes(req.auth.role)) {
            logger.warn('Role denied', {
                userId: req.auth.userId,
                required: allowedRoles,
                actual: req.auth.role
            });

            return res.status(403).json({
                error: 'Insufficient role privileges',
                code: 'ROLE_DENIED',
                required: allowedRoles
            });
        }

        next();
    };
};

/**
 * Require organization membership
 */
const requireOrganization = async (req, res, next) => {
    if (!req.auth) {
        return res.status(401).json({
            error: 'Authentication required',
            code: 'NOT_AUTHENTICATED'
        });
    }

    if (!req.auth.organizationId) {
        return res.status(403).json({
            error: 'Organization membership required',
            code: 'NO_ORGANIZATION'
        });
    }

    // Verify organization is active
    const org = await Database.getOne(
        'SELECT subscription_status FROM organizations WHERE id = $1',
        [req.auth.organizationId]
    );

    if (!org || org.subscription_status !== 'active') {
        return res.status(403).json({
            error: 'Organization is not active',
            code: 'INACTIVE_ORGANIZATION'
        });
    }

    next();
};

/**
 * Require workspace access
 */
const requireWorkspace = (paramName = 'workspaceId') => {
    return async (req, res, next) => {
        if (!req.auth) {
            return res.status(401).json({
                error: 'Authentication required',
                code: 'NOT_AUTHENTICATED'
            });
        }

        const workspaceId = req.params[paramName] || req.body.workspaceId;
        
        if (!workspaceId) {
            return res.status(400).json({
                error: 'Workspace ID required',
                code: 'NO_WORKSPACE_ID'
            });
        }

        // Check workspace access
        const workspace = await Database.getOne(`
            SELECT w.*, wm.role as member_role
            FROM workspaces w
            LEFT JOIN workspace_members wm ON wm.workspace_id = w.id 
                AND wm.user_id = $2
            WHERE w.id = $1 
                AND w.organization_id = $3
                AND w.is_active = true
        `, [workspaceId, req.auth.userId, req.auth.organizationId]);

        if (!workspace) {
            return res.status(404).json({
                error: 'Workspace not found or access denied',
                code: 'WORKSPACE_NOT_FOUND'
            });
        }

        req.workspace = workspace;
        next();
    };
};

/**
 * Rate limiting by user/organization
 */
const rateLimit = (options = {}) => {
    const {
        windowMs = 15 * 60 * 1000, // 15 minutes
        max = 100, // limit each user to 100 requests per windowMs
        keyGenerator = (req) => req.auth?.userId || req.ip
    } = options;

    const requests = new Map();

    return (req, res, next) => {
        const key = keyGenerator(req);
        const now = Date.now();
        const windowStart = now - windowMs;

        // Clean old entries
        for (const [k, timestamps] of requests.entries()) {
            const filtered = timestamps.filter(t => t > windowStart);
            if (filtered.length === 0) {
                requests.delete(k);
            } else {
                requests.set(k, filtered);
            }
        }

        // Check rate limit
        const timestamps = requests.get(key) || [];
        const recentRequests = timestamps.filter(t => t > windowStart);

        if (recentRequests.length >= max) {
            return res.status(429).json({
                error: 'Too many requests',
                code: 'RATE_LIMIT_EXCEEDED',
                retryAfter: Math.ceil((recentRequests[0] + windowMs - now) / 1000)
            });
        }

        // Add current request
        recentRequests.push(now);
        requests.set(key, recentRequests);

        // Set rate limit headers
        res.setHeader('X-RateLimit-Limit', max);
        res.setHeader('X-RateLimit-Remaining', max - recentRequests.length);
        res.setHeader('X-RateLimit-Reset', new Date(now + windowMs).toISOString());

        next();
    };
};

/**
 * Validate request body with Joi schema
 */
const validateBody = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message
            }));

            return res.status(400).json({
                error: 'Validation failed',
                code: 'VALIDATION_ERROR',
                errors
            });
        }

        req.body = value;
        next();
    };
};

/**
 * Validate query parameters with Joi schema
 */
const validateQuery = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.query, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message
            }));

            return res.status(400).json({
                error: 'Invalid query parameters',
                code: 'VALIDATION_ERROR',
                errors
            });
        }

        req.query = value;
        next();
    };
};

/**
 * Check if user owns the resource
 */
const requireResourceOwnership = (resourceType, paramName = 'id') => {
    return async (req, res, next) => {
        if (!req.auth) {
            return res.status(401).json({
                error: 'Authentication required',
                code: 'NOT_AUTHENTICATED'
            });
        }

        const resourceId = req.params[paramName];
        
        if (!resourceId) {
            return res.status(400).json({
                error: 'Resource ID required',
                code: 'NO_RESOURCE_ID'
            });
        }

        let query;
        switch (resourceType) {
            case 'worksheet':
                query = 'SELECT created_by FROM worksheets WHERE id = $1 AND organization_id = $2';
                break;
            case 'report':
                query = 'SELECT generated_by FROM reports WHERE id = $1 AND organization_id = $2';
                break;
            case 'document':
                query = 'SELECT uploaded_by FROM documents WHERE id = $1 AND organization_id = $2';
                break;
            default:
                return res.status(400).json({
                    error: 'Invalid resource type',
                    code: 'INVALID_RESOURCE_TYPE'
                });
        }

        const resource = await Database.getOne(query, [resourceId, req.auth.organizationId]);

        if (!resource) {
            return res.status(404).json({
                error: 'Resource not found',
                code: 'RESOURCE_NOT_FOUND'
            });
        }

        // Check ownership or admin role
        const isOwner = resource.created_by === req.auth.userId || 
                       resource.generated_by === req.auth.userId ||
                       resource.uploaded_by === req.auth.userId;
        
        const isAdmin = req.auth.role === 'owner' || req.auth.role === 'admin';

        if (!isOwner && !isAdmin) {
            return res.status(403).json({
                error: 'Access denied to this resource',
                code: 'ACCESS_DENIED'
            });
        }

        req.resource = resource;
        next();
    };
};

/**
 * Log critical actions for audit
 */
const auditLog = (action, resourceType) => {
    return async (req, res, next) => {
        // Store original send function
        const originalSend = res.send;
        
        // Override send to log after response
        res.send = function(data) {
            res.send = originalSend;
            
            // Log the action
            if (res.statusCode < 400 && req.auth) {
                Database.insert('audit_logs', {
                    organization_id: req.auth.organizationId,
                    user_id: req.auth.userId,
                    session_id: req.auth.sessionId,
                    action: action,
                    resource_type: resourceType,
                    resource_id: req.params.id || req.body.id,
                    resource_name: req.body.name || req.body.title,
                    changes: req.body,
                    ip_address: req.ip,
                    user_agent: req.headers['user-agent'],
                    success: true
                }).catch(error => {
                    logger.error('Failed to create audit log:', error);
                });
            }
            
            return res.send(data);
        };
        
        next();
    };
};

module.exports = {
    authenticate,
    optionalAuth,
    requirePermission,
    requireRole,
    requireOrganization,
    requireWorkspace,
    rateLimit,
    validateBody,
    validateQuery,
    requireResourceOwnership,
    auditLog
};
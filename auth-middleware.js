/**
 * Authentication Middleware for ScaleOps6
 * 
 * Provides Firebase token verification and role-based access control
 * Integrates with SQLite database for user data
 */

const { verifyIdToken, getFirebaseAdmin } = require('./firebase-config');
const DatabaseService = require('./database-service');

/**
 * Middleware to verify Firebase authentication token
 * Attaches user data from both Firebase and SQLite to req.user
 */
async function verifyFirebaseToken(req, res, next) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
            error: 'Unauthorized',
            message: 'No authentication token provided'
        });
    }
    
    const idToken = authHeader.split('Bearer ')[1];
    
    try {
        // Verify token with Firebase
        const verification = await verifyIdToken(idToken);
        
        if (!verification.success) {
            return res.status(401).json({ 
                error: 'Unauthorized',
                message: 'Invalid authentication token'
            });
        }
        
        // Attach Firebase user data
        req.firebaseUser = {
            uid: verification.uid,
            email: verification.email,
            emailVerified: verification.emailVerified,
            customClaims: verification.customClaims
        };
        
        // Get user from SQLite database
        const db = new DatabaseService();
        const user = await db.getUserByFirebaseUid(verification.uid);
        
        if (!user) {
            // User exists in Firebase but not in database
            // This could happen on first login - create user record
            console.log(`⚠️ User ${verification.email} exists in Firebase but not in database`);
            
            // Auto-create user record
            const newUser = await db.createUser({
                firebaseUid: verification.uid,
                email: verification.email,
                fullName: verification.email.split('@')[0], // Temporary
                role: 'user',
                tier: 0,
                subscriptionStatus: 'free'
            });
            
            // Fetch the newly created user
            const createdUser = await db.getUserById(newUser.userId);
            req.user = createdUser;
            
            console.log(`✅ Auto-created database record for ${verification.email}`);
        } else {
            // Update last login
            await db.updateLastLogin(user.id);
            req.user = user;
        }
        
        // Check if user is active
        if (!req.user.is_active) {
            return res.status(403).json({
                error: 'Forbidden',
                message: 'Account has been deactivated'
            });
        }
        
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({ 
            error: 'Unauthorized',
            message: 'Authentication failed'
        });
    }
}

/**
 * Middleware to require specific role(s)
 * 
 * @param {...string} allowedRoles - Roles that can access this route
 * @returns {Function} Express middleware
 */
function requireRole(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ 
                error: 'Unauthorized',
                message: 'Authentication required'
            });
        }
        
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ 
                error: 'Forbidden',
                message: `Access denied. Required role: ${allowedRoles.join(' or ')}`,
                userRole: req.user.role
            });
        }
        
        next();
    };
}

/**
 * Middleware to require minimum tier level
 * 
 * @param {number} minTier - Minimum tier required (0, 1, 2, or 3)
 * @returns {Function} Express middleware
 */
function requireTier(minTier) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ 
                error: 'Unauthorized',
                message: 'Authentication required'
            });
        }
        
        if (req.user.tier < minTier) {
            return res.status(403).json({ 
                error: 'Forbidden',
                message: `Upgrade required. Current tier: ${req.user.tier}, Required: ${minTier}`,
                currentTier: req.user.tier,
                requiredTier: minTier,
                upgradeUrl: '/billing/upgrade'
            });
        }
        
        next();
    };
}

/**
 * Middleware to check if user can access another user's data
 * Used for VC portfolio access and ST6 partner assignments
 * 
 * @param {string} userIdParam - Request parameter name containing target user ID
 * @returns {Function} Express middleware
 */
function requireUserAccess(userIdParam = 'userId') {
    return async (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ 
                error: 'Unauthorized',
                message: 'Authentication required'
            });
        }
        
        const targetUserId = parseInt(req.params[userIdParam]);
        
        // Admin can access anyone
        if (req.user.role === 'admin') {
            return next();
        }
        
        // User can access their own data
        if (req.user.id === targetUserId) {
            return next();
        }
        
        // VC can access assigned startups
        if (req.user.role === 'vc') {
            const db = new DatabaseService();
            const assignments = await db.getVCAssignments();
            const hasAccess = assignments.some(
                a => a.vc_user_id === req.user.id && a.startup_user_id === targetUserId
            );
            
            if (hasAccess) {
                return next();
            }
        }
        
        // ST6 partner can access assigned clients
        if (req.user.role === 'st6_partner') {
            // TODO: Implement ST6 partner assignment check
            // For now, deny access
        }
        
        return res.status(403).json({ 
            error: 'Forbidden',
            message: 'You do not have access to this user\'s data'
        });
    };
}

/**
 * Optional authentication - doesn't fail if no token provided
 * Useful for public pages that show different content for logged-in users
 */
async function optionalAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // No token provided, continue without user
        req.user = null;
        return next();
    }
    
    // Token provided, try to verify
    try {
        await verifyFirebaseToken(req, res, next);
    } catch (error) {
        // Token invalid, continue without user
        req.user = null;
        next();
    }
}

/**
 * Extract IP address from request
 * 
 * @param {Object} req - Express request object
 * @returns {string} IP address
 */
function getClientIp(req) {
    return req.headers['x-forwarded-for']?.split(',')[0] || 
           req.headers['x-real-ip'] || 
           req.connection.remoteAddress || 
           req.socket.remoteAddress ||
           'unknown';
}

module.exports = {
    verifyFirebaseToken,
    requireRole,
    requireTier,
    requireUserAccess,
    optionalAuth,
    getClientIp
};
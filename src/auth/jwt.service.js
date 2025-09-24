const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { Database } = require('../database/postgres');
require('dotenv').config();

class JWTService {
    constructor() {
        this.accessSecret = process.env.JWT_SECRET || 'default_secret_change_in_production';
        this.refreshSecret = process.env.JWT_REFRESH_SECRET || 'default_refresh_secret_change_in_production';
        this.accessExpiresIn = process.env.JWT_EXPIRES_IN || '15m';
        this.refreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN || '7d';
    }

    /**
     * Generate access token
     * @param {Object} payload - Token payload
     * @returns {string} JWT access token
     */
    generateAccessToken(payload) {
        const tokenPayload = {
            sub: payload.userId,
            org: payload.organizationId,
            workspace: payload.workspaceId,
            role: payload.role,
            permissions: payload.permissions || [],
            type: 'access'
        };

        return jwt.sign(tokenPayload, this.accessSecret, {
            expiresIn: this.accessExpiresIn,
            issuer: 'scaleops6',
            audience: 'scaleops6-api',
            jwtid: crypto.randomUUID()
        });
    }

    /**
     * Generate refresh token
     * @param {Object} payload - Token payload
     * @returns {string} JWT refresh token
     */
    generateRefreshToken(payload) {
        const tokenPayload = {
            sub: payload.userId,
            org: payload.organizationId,
            type: 'refresh'
        };

        return jwt.sign(tokenPayload, this.refreshSecret, {
            expiresIn: this.refreshExpiresIn,
            issuer: 'scaleops6',
            audience: 'scaleops6-api',
            jwtid: crypto.randomUUID()
        });
    }

    /**
     * Generate both access and refresh tokens
     * @param {Object} payload - Token payload
     * @returns {Object} Access and refresh tokens
     */
    generateTokenPair(payload) {
        return {
            accessToken: this.generateAccessToken(payload),
            refreshToken: this.generateRefreshToken(payload)
        };
    }

    /**
     * Verify access token
     * @param {string} token - JWT token
     * @returns {Object} Decoded token payload
     */
    verifyAccessToken(token) {
        try {
            return jwt.verify(token, this.accessSecret, {
                issuer: 'scaleops6',
                audience: 'scaleops6-api'
            });
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new Error('Access token expired');
            } else if (error.name === 'JsonWebTokenError') {
                throw new Error('Invalid access token');
            }
            throw error;
        }
    }

    /**
     * Verify refresh token
     * @param {string} token - JWT refresh token
     * @returns {Object} Decoded token payload
     */
    verifyRefreshToken(token) {
        try {
            const decoded = jwt.verify(token, this.refreshSecret, {
                issuer: 'scaleops6',
                audience: 'scaleops6-api'
            });
            
            if (decoded.type !== 'refresh') {
                throw new Error('Invalid token type');
            }
            
            return decoded;
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new Error('Refresh token expired');
            } else if (error.name === 'JsonWebTokenError') {
                throw new Error('Invalid refresh token');
            }
            throw error;
        }
    }

    /**
     * Decode token without verification (for debugging)
     * @param {string} token - JWT token
     * @returns {Object} Decoded token
     */
    decodeToken(token) {
        return jwt.decode(token, { complete: true });
    }

    /**
     * Hash token for storage
     * @param {string} token - Token to hash
     * @returns {string} Hashed token
     */
    hashToken(token) {
        return crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');
    }

    /**
     * Create session in database
     * @param {Object} sessionData - Session data
     * @returns {Promise<Object>} Created session
     */
    async createSession(sessionData) {
        const {
            userId,
            organizationId,
            accessToken,
            refreshToken,
            deviceInfo,
            ipAddress,
            userAgent
        } = sessionData;

        const accessTokenHash = this.hashToken(accessToken);
        const refreshTokenHash = this.hashToken(refreshToken);

        // Calculate expiration times
        const accessExpiry = new Date();
        accessExpiry.setMinutes(accessExpiry.getMinutes() + 15); // 15 minutes

        const refreshExpiry = new Date();
        refreshExpiry.setDate(refreshExpiry.getDate() + 7); // 7 days

        const session = await Database.insert('sessions', {
            user_id: userId,
            organization_id: organizationId,
            access_token_hash: accessTokenHash,
            refresh_token_hash: refreshTokenHash,
            device_id: deviceInfo?.deviceId,
            device_name: deviceInfo?.deviceName,
            device_type: deviceInfo?.deviceType,
            ip_address: ipAddress,
            user_agent: userAgent,
            expires_at: accessExpiry,
            refresh_expires_at: refreshExpiry
        });

        return session;
    }

    /**
     * Validate session
     * @param {string} accessToken - Access token
     * @returns {Promise<Object>} Session data
     */
    async validateSession(accessToken) {
        const tokenHash = this.hashToken(accessToken);
        
        const session = await Database.getOne(`
            SELECT s.*, u.email, u.first_name, u.last_name, u.is_active,
                   om.role, om.permissions, o.slug as org_slug, o.name as org_name
            FROM sessions s
            JOIN users u ON s.user_id = u.id
            LEFT JOIN organization_members om ON om.user_id = s.user_id 
                AND om.organization_id = s.organization_id
            LEFT JOIN organizations o ON o.id = s.organization_id
            WHERE s.access_token_hash = $1
                AND s.expires_at > NOW()
                AND s.revoked_at IS NULL
                AND u.is_active = true
        `, [tokenHash]);

        if (!session) {
            throw new Error('Invalid or expired session');
        }

        // Update last activity
        await Database.update('sessions', 
            { last_activity_at: new Date() },
            { id: session.id }
        );

        return session;
    }

    /**
     * Refresh access token
     * @param {string} refreshToken - Refresh token
     * @returns {Promise<Object>} New token pair
     */
    async refreshAccessToken(refreshToken) {
        const tokenHash = this.hashToken(refreshToken);
        
        // Find session by refresh token
        const session = await Database.getOne(`
            SELECT s.*, u.email, u.is_active, om.role, om.permissions
            FROM sessions s
            JOIN users u ON s.user_id = u.id
            LEFT JOIN organization_members om ON om.user_id = s.user_id 
                AND om.organization_id = s.organization_id
            WHERE s.refresh_token_hash = $1
                AND s.refresh_expires_at > NOW()
                AND s.revoked_at IS NULL
                AND u.is_active = true
        `, [tokenHash]);

        if (!session) {
            throw new Error('Invalid or expired refresh token');
        }

        // Verify the refresh token
        const decoded = this.verifyRefreshToken(refreshToken);

        // Generate new token pair
        const newTokens = this.generateTokenPair({
            userId: session.user_id,
            organizationId: session.organization_id,
            role: session.role,
            permissions: session.permissions
        });

        // Update session with new tokens
        const newAccessTokenHash = this.hashToken(newTokens.accessToken);
        const newRefreshTokenHash = this.hashToken(newTokens.refreshToken);

        const newAccessExpiry = new Date();
        newAccessExpiry.setMinutes(newAccessExpiry.getMinutes() + 15);

        const newRefreshExpiry = new Date();
        newRefreshExpiry.setDate(newRefreshExpiry.getDate() + 7);

        await Database.update('sessions', {
            access_token_hash: newAccessTokenHash,
            refresh_token_hash: newRefreshTokenHash,
            expires_at: newAccessExpiry,
            refresh_expires_at: newRefreshExpiry,
            last_activity_at: new Date()
        }, {
            id: session.id
        });

        return newTokens;
    }

    /**
     * Revoke session
     * @param {string} sessionId - Session ID
     * @param {string} userId - User ID who is revoking
     * @param {string} reason - Revocation reason
     */
    async revokeSession(sessionId, userId, reason = 'User logout') {
        await Database.update('sessions', {
            revoked_at: new Date(),
            revoked_by: userId,
            revoke_reason: reason
        }, {
            id: sessionId
        });
    }

    /**
     * Revoke all user sessions
     * @param {string} userId - User ID
     * @param {string} reason - Revocation reason
     */
    async revokeAllUserSessions(userId, reason = 'Security reset') {
        await Database.query(`
            UPDATE sessions 
            SET revoked_at = NOW(), 
                revoked_by = $1,
                revoke_reason = $2
            WHERE user_id = $1 
                AND revoked_at IS NULL
        `, [userId, reason]);
    }

    /**
     * Clean up expired sessions
     */
    async cleanupExpiredSessions() {
        const result = await Database.query(`
            DELETE FROM sessions 
            WHERE (refresh_expires_at < NOW() OR revoked_at IS NOT NULL)
                AND created_at < NOW() - INTERVAL '30 days'
        `);
        
        return result.rowCount;
    }

    /**
     * Get active sessions for user
     * @param {string} userId - User ID
     * @returns {Promise<Array>} Active sessions
     */
    async getUserActiveSessions(userId) {
        return await Database.getMany(`
            SELECT id, device_name, device_type, ip_address, 
                   last_activity_at, created_at
            FROM sessions
            WHERE user_id = $1
                AND revoked_at IS NULL
                AND refresh_expires_at > NOW()
            ORDER BY last_activity_at DESC
        `, [userId]);
    }

    /**
     * Extract token from request header
     * @param {string} authHeader - Authorization header
     * @returns {string|null} Token or null
     */
    extractTokenFromHeader(authHeader) {
        if (!authHeader) return null;
        
        const parts = authHeader.split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') {
            return parts[1];
        }
        
        return null;
    }
}

// Export singleton instance
module.exports = new JWTService();
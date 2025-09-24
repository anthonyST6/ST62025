const crypto = require('crypto');
const { logger } = require('../database/postgres');

/**
 * Encryption Service - Handles data encryption/decryption for sensitive fields
 * Compliant with GDPR Article 32 (Security of Processing)
 */
class EncryptionService {
    constructor() {
        // Use environment variable or generate secure key
        this.algorithm = 'aes-256-gcm';
        this.masterKey = process.env.ENCRYPTION_MASTER_KEY || this.generateMasterKey();
        this.saltLength = 32;
        this.tagLength = 16;
        this.ivLength = 16;
        
        // Data classification levels
        this.dataClassification = {
            PUBLIC: 'public',
            INTERNAL: 'internal',
            CONFIDENTIAL: 'confidential',
            RESTRICTED: 'restricted',
            PII: 'pii',
            SENSITIVE_PII: 'sensitive_pii'
        };
    }

    /**
     * Generate a secure master key (for initial setup only)
     */
    generateMasterKey() {
        const key = crypto.randomBytes(32).toString('hex');
        logger.warn('Generated new master key - store this securely in environment variables!');
        return key;
    }

    /**
     * Derive encryption key from master key
     */
    deriveKey(salt) {
        return crypto.pbkdf2Sync(this.masterKey, salt, 100000, 32, 'sha256');
    }

    /**
     * Encrypt sensitive data
     * @param {string} text - Plain text to encrypt
     * @param {string} classification - Data classification level
     * @returns {Object} Encrypted data with metadata
     */
    encrypt(text, classification = this.dataClassification.CONFIDENTIAL) {
        try {
            if (!text) return null;

            const salt = crypto.randomBytes(this.saltLength);
            const key = this.deriveKey(salt);
            const iv = crypto.randomBytes(this.ivLength);
            
            const cipher = crypto.createCipheriv(this.algorithm, key, iv);
            
            let encrypted = cipher.update(text, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            
            const authTag = cipher.getAuthTag();

            return {
                encrypted,
                salt: salt.toString('hex'),
                iv: iv.toString('hex'),
                authTag: authTag.toString('hex'),
                algorithm: this.algorithm,
                classification,
                encryptedAt: new Date().toISOString()
            };
        } catch (error) {
            logger.error('Encryption failed:', error);
            throw new Error('Failed to encrypt data');
        }
    }

    /**
     * Decrypt sensitive data
     * @param {Object} encryptedData - Encrypted data object
     * @returns {string} Decrypted plain text
     */
    decrypt(encryptedData) {
        try {
            if (!encryptedData || !encryptedData.encrypted) return null;

            const salt = Buffer.from(encryptedData.salt, 'hex');
            const key = this.deriveKey(salt);
            const iv = Buffer.from(encryptedData.iv, 'hex');
            const authTag = Buffer.from(encryptedData.authTag, 'hex');
            
            const decipher = crypto.createDecipheriv(this.algorithm, key, iv);
            decipher.setAuthTag(authTag);
            
            let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            
            return decrypted;
        } catch (error) {
            logger.error('Decryption failed:', error);
            throw new Error('Failed to decrypt data');
        }
    }

    /**
     * Hash data for comparison (one-way)
     * @param {string} data - Data to hash
     * @returns {string} Hashed data
     */
    hash(data) {
        return crypto
            .createHash('sha256')
            .update(data)
            .digest('hex');
    }

    /**
     * Encrypt PII fields in an object
     * @param {Object} obj - Object containing PII
     * @param {Array} piiFields - Fields to encrypt
     * @returns {Object} Object with encrypted PII
     */
    encryptPII(obj, piiFields) {
        const encrypted = { ...obj };
        
        for (const field of piiFields) {
            if (obj[field]) {
                encrypted[field] = this.encrypt(
                    obj[field], 
                    this.dataClassification.PII
                );
            }
        }
        
        encrypted._encrypted_fields = piiFields;
        encrypted._encryption_version = '1.0';
        
        return encrypted;
    }

    /**
     * Decrypt PII fields in an object
     * @param {Object} obj - Object with encrypted PII
     * @returns {Object} Object with decrypted PII
     */
    decryptPII(obj) {
        const decrypted = { ...obj };
        
        if (obj._encrypted_fields) {
            for (const field of obj._encrypted_fields) {
                if (obj[field]) {
                    decrypted[field] = this.decrypt(obj[field]);
                }
            }
            
            delete decrypted._encrypted_fields;
            delete decrypted._encryption_version;
        }
        
        return decrypted;
    }

    /**
     * Tokenize sensitive data for storage
     * @param {string} data - Sensitive data
     * @returns {string} Token reference
     */
    async tokenize(data) {
        const token = crypto.randomUUID();
        const encrypted = this.encrypt(data, this.dataClassification.SENSITIVE_PII);
        
        // Store in secure token vault (implement based on your infrastructure)
        await this.storeToken(token, encrypted);
        
        return token;
    }

    /**
     * Detokenize to retrieve original data
     * @param {string} token - Token reference
     * @returns {string} Original data
     */
    async detokenize(token) {
        const encrypted = await this.retrieveToken(token);
        return this.decrypt(encrypted);
    }

    /**
     * Store token in secure vault (implement based on infrastructure)
     */
    async storeToken(token, encryptedData) {
        // This would typically use a secure key management service
        // For now, using database with additional encryption
        const { Database } = require('../database/postgres');
        
        await Database.insert('token_vault', {
            token,
            encrypted_data: encryptedData,
            created_at: new Date()
        });
    }

    /**
     * Retrieve token from vault
     */
    async retrieveToken(token) {
        const { Database } = require('../database/postgres');
        
        const result = await Database.getOne(
            'SELECT encrypted_data FROM token_vault WHERE token = $1',
            [token]
        );
        
        return result?.encrypted_data;
    }

    /**
     * Generate encryption key for file storage
     */
    generateFileKey() {
        return crypto.randomBytes(32);
    }

    /**
     * Create encrypted stream for file uploads
     */
    createEncryptStream(key) {
        const iv = crypto.randomBytes(this.ivLength);
        const cipher = crypto.createCipheriv(this.algorithm, key, iv);
        
        return {
            stream: cipher,
            iv: iv.toString('hex')
        };
    }

    /**
     * Create decryption stream for file downloads
     */
    createDecryptStream(key, iv) {
        const decipher = crypto.createDecipheriv(
            this.algorithm, 
            key, 
            Buffer.from(iv, 'hex')
        );
        
        return decipher;
    }

    /**
     * Rotate encryption keys
     */
    async rotateKeys(oldKey, newKey) {
        // Implementation for key rotation
        logger.info('Starting encryption key rotation');
        
        // This would re-encrypt all data with new key
        // Implement based on your specific needs
        
        return {
            rotated: true,
            timestamp: new Date()
        };
    }

    /**
     * Validate data classification
     */
    validateClassification(data, requiredLevel) {
        const levels = Object.values(this.dataClassification);
        const dataLevel = levels.indexOf(data.classification);
        const requiredLevelIndex = levels.indexOf(requiredLevel);
        
        return dataLevel >= requiredLevelIndex;
    }
}

// Export singleton instance
module.exports = new EncryptionService();
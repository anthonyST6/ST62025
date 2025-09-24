const { Database, logger } = require('../database/postgres');
const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

/**
 * Backup Service - Handles database backups and recovery
 */
class BackupService {
    constructor() {
        this.backupDir = process.env.BACKUP_DIR || path.join(__dirname, '../../backups');
        this.s3Bucket = process.env.BACKUP_S3_BUCKET || 'scaleops6-backups';
        this.retentionDays = parseInt(process.env.BACKUP_RETENTION_DAYS || '30');
    }

    /**
     * Create full database backup
     * @param {Object} options - Backup options
     * @returns {Promise<Object>} Backup details
     */
    async createBackup(options = {}) {
        const {
            type = 'scheduled',
            description = 'Automated backup',
            compress = true,
            encrypt = true
        } = options;

        try {
            logger.info('Starting database backup', { type, description });

            // Ensure backup directory exists
            await fs.mkdir(this.backupDir, { recursive: true });

            // Generate backup filename
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const filename = `backup-${type}-${timestamp}.sql`;
            const filepath = path.join(this.backupDir, filename);

            // Create PostgreSQL backup
            const dbUrl = process.env.DATABASE_URL || 
                `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
            
            const command = `pg_dump ${dbUrl} > ${filepath}`;
            await execAsync(command);

            // Get file size
            const stats = await fs.stat(filepath);
            const sizeBytes = stats.size;

            // Compress if requested
            let finalPath = filepath;
            if (compress) {
                const compressedPath = `${filepath}.gz`;
                await execAsync(`gzip -9 ${filepath}`);
                finalPath = compressedPath;
            }

            // Encrypt if requested
            if (encrypt && process.env.BACKUP_ENCRYPTION_KEY) {
                const encryptedPath = `${finalPath}.enc`;
                await this.encryptFile(finalPath, encryptedPath);
                await fs.unlink(finalPath); // Remove unencrypted file
                finalPath = encryptedPath;
            }

            // Upload to S3 if configured
            let s3Location = null;
            if (process.env.AWS_ACCESS_KEY_ID) {
                s3Location = await this.uploadToS3(finalPath, filename);
            }

            // Save backup metadata to database
            const backup = await Database.insert('backups', {
                filename: path.basename(finalPath),
                filepath: finalPath,
                s3_location: s3Location,
                type: type,
                description: description,
                size_bytes: sizeBytes,
                compressed: compress,
                encrypted: encrypt,
                status: 'completed',
                created_at: new Date()
            });

            // Clean up old backups
            await this.cleanupOldBackups();

            logger.info('Backup completed successfully', {
                backupId: backup.id,
                filename: backup.filename,
                size: sizeBytes
            });

            return backup;
        } catch (error) {
            logger.error('Backup failed:', error);
            throw error;
        }
    }

    /**
     * Restore from backup
     * @param {string} backupId - Backup ID or filename
     * @param {Object} options - Restore options
     * @returns {Promise<void>}
     */
    async restoreBackup(backupId, options = {}) {
        const {
            targetDatabase = process.env.DB_NAME,
            confirmRestore = false
        } = options;

        if (!confirmRestore) {
            throw new Error('Restore must be explicitly confirmed with confirmRestore: true');
        }

        try {
            logger.warn('Starting database restore', { backupId, targetDatabase });

            // Get backup metadata
            const backup = await Database.getOne(
                'SELECT * FROM backups WHERE id = $1 OR filename = $1',
                [backupId]
            );

            if (!backup) {
                throw new Error('Backup not found');
            }

            let restoreFile = backup.filepath;

            // Download from S3 if needed
            if (!await this.fileExists(restoreFile) && backup.s3_location) {
                restoreFile = await this.downloadFromS3(backup.s3_location);
            }

            // Decrypt if needed
            if (backup.encrypted) {
                const decryptedPath = restoreFile.replace('.enc', '');
                await this.decryptFile(restoreFile, decryptedPath);
                restoreFile = decryptedPath;
            }

            // Decompress if needed
            if (backup.compressed) {
                await execAsync(`gunzip ${restoreFile}`);
                restoreFile = restoreFile.replace('.gz', '');
            }

            // Restore database
            const dbUrl = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${targetDatabase}`;
            await execAsync(`psql ${dbUrl} < ${restoreFile}`);

            // Log restore
            await Database.insert('restore_history', {
                backup_id: backup.id,
                restored_to: targetDatabase,
                restored_at: new Date(),
                success: true
            });

            logger.info('Restore completed successfully', { backupId, targetDatabase });
        } catch (error) {
            logger.error('Restore failed:', error);
            
            // Log failed restore
            await Database.insert('restore_history', {
                backup_id: backupId,
                restored_to: targetDatabase,
                restored_at: new Date(),
                success: false,
                error_message: error.message
            });
            
            throw error;
        }
    }

    /**
     * Create point-in-time recovery snapshot
     * @param {string} organizationId - Organization ID
     * @returns {Promise<Object>} Snapshot details
     */
    async createSnapshot(organizationId) {
        const snapshot = {
            organizationId,
            timestamp: new Date(),
            data: {}
        };

        // Export organization data
        snapshot.data.organization = await Database.getOne(
            'SELECT * FROM organizations WHERE id = $1',
            [organizationId]
        );

        snapshot.data.members = await Database.getMany(
            'SELECT * FROM organization_members WHERE organization_id = $1',
            [organizationId]
        );

        snapshot.data.workspaces = await Database.getMany(
            'SELECT * FROM workspaces WHERE organization_id = $1',
            [organizationId]
        );

        snapshot.data.worksheets = await Database.getMany(
            'SELECT * FROM worksheets WHERE organization_id = $1',
            [organizationId]
        );

        snapshot.data.analyses = await Database.getMany(
            'SELECT * FROM analyses WHERE organization_id = $1',
            [organizationId]
        );

        snapshot.data.reports = await Database.getMany(
            'SELECT * FROM reports WHERE organization_id = $1',
            [organizationId]
        );

        // Save snapshot
        const filename = `snapshot-${organizationId}-${Date.now()}.json`;
        const filepath = path.join(this.backupDir, 'snapshots', filename);
        
        await fs.mkdir(path.dirname(filepath), { recursive: true });
        await fs.writeFile(filepath, JSON.stringify(snapshot, null, 2));

        return {
            filename,
            filepath,
            organizationId,
            timestamp: snapshot.timestamp,
            recordCount: Object.values(snapshot.data).reduce((sum, arr) => sum + arr.length, 0)
        };
    }

    /**
     * Schedule automated backups
     */
    async scheduleBackups() {
        // Daily backup at 2 AM
        const dailyBackup = async () => {
            try {
                await this.createBackup({
                    type: 'daily',
                    description: 'Scheduled daily backup'
                });
            } catch (error) {
                logger.error('Daily backup failed:', error);
            }
        };

        // Weekly backup on Sunday at 3 AM
        const weeklyBackup = async () => {
            try {
                await this.createBackup({
                    type: 'weekly',
                    description: 'Scheduled weekly backup',
                    compress: true,
                    encrypt: true
                });
            } catch (error) {
                logger.error('Weekly backup failed:', error);
            }
        };

        // Schedule using cron or similar (simplified for example)
        setInterval(dailyBackup, 24 * 60 * 60 * 1000); // Daily
        setInterval(weeklyBackup, 7 * 24 * 60 * 60 * 1000); // Weekly

        logger.info('Backup schedules initialized');
    }

    /**
     * Clean up old backups
     */
    async cleanupOldBackups() {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - this.retentionDays);

        // Get old backups
        const oldBackups = await Database.getMany(
            'SELECT * FROM backups WHERE created_at < $1',
            [cutoffDate]
        );

        for (const backup of oldBackups) {
            try {
                // Delete local file
                if (await this.fileExists(backup.filepath)) {
                    await fs.unlink(backup.filepath);
                }

                // Delete from S3
                if (backup.s3_location) {
                    await this.deleteFromS3(backup.s3_location);
                }

                // Mark as deleted in database
                await Database.update(
                    'backups',
                    { status: 'deleted', deleted_at: new Date() },
                    { id: backup.id }
                );

                logger.info('Deleted old backup', { backupId: backup.id });
            } catch (error) {
                logger.error('Failed to delete backup', { backupId: backup.id, error });
            }
        }
    }

    /**
     * Get backup status and statistics
     */
    async getBackupStatus() {
        const stats = await Database.getOne(`
            SELECT 
                COUNT(*) as total_backups,
                COUNT(*) FILTER (WHERE status = 'completed') as successful,
                COUNT(*) FILTER (WHERE status = 'failed') as failed,
                SUM(size_bytes) as total_size,
                MAX(created_at) as last_backup
            FROM backups
            WHERE created_at > NOW() - INTERVAL '30 days'
        `);

        const recentBackups = await Database.getMany(
            'SELECT * FROM backups ORDER BY created_at DESC LIMIT 10'
        );

        return {
            statistics: stats,
            recentBackups,
            nextScheduled: this.getNextScheduledBackup(),
            storageUsed: stats.total_size,
            retentionPolicy: `${this.retentionDays} days`
        };
    }

    /**
     * Verify backup integrity
     */
    async verifyBackup(backupId) {
        const backup = await Database.getOne(
            'SELECT * FROM backups WHERE id = $1',
            [backupId]
        );

        if (!backup) {
            throw new Error('Backup not found');
        }

        // Check file exists
        const exists = await this.fileExists(backup.filepath);
        
        // Check file integrity (simplified)
        if (exists) {
            const stats = await fs.stat(backup.filepath);
            const integrityCheck = stats.size > 0;
            
            return {
                backupId: backup.id,
                exists,
                integrityCheck,
                size: stats.size,
                created: backup.created_at
            };
        }

        return {
            backupId: backup.id,
            exists: false,
            integrityCheck: false
        };
    }

    // Helper methods
    async fileExists(filepath) {
        try {
            await fs.access(filepath);
            return true;
        } catch {
            return false;
        }
    }

    async encryptFile(inputPath, outputPath) {
        // Implement encryption (simplified example)
        const command = `openssl enc -aes-256-cbc -salt -in ${inputPath} -out ${outputPath} -k ${process.env.BACKUP_ENCRYPTION_KEY}`;
        await execAsync(command);
    }

    async decryptFile(inputPath, outputPath) {
        // Implement decryption
        const command = `openssl enc -d -aes-256-cbc -in ${inputPath} -out ${outputPath} -k ${process.env.BACKUP_ENCRYPTION_KEY}`;
        await execAsync(command);
    }

    async uploadToS3(filepath, key) {
        // Implement S3 upload (requires AWS SDK)
        logger.info('Would upload to S3', { filepath, key });
        return `s3://${this.s3Bucket}/${key}`;
    }

    async downloadFromS3(s3Location) {
        // Implement S3 download
        logger.info('Would download from S3', { s3Location });
        return s3Location;
    }

    async deleteFromS3(s3Location) {
        // Implement S3 deletion
        logger.info('Would delete from S3', { s3Location });
    }

    getNextScheduledBackup() {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(2, 0, 0, 0); // 2 AM tomorrow
        return tomorrow;
    }
}

// Add backup table to schema if not exists
const createBackupTable = async () => {
    try {
        await Database.query(`
            CREATE TABLE IF NOT EXISTS backups (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                filename VARCHAR(255) NOT NULL,
                filepath TEXT,
                s3_location TEXT,
                type VARCHAR(50),
                description TEXT,
                size_bytes BIGINT,
                compressed BOOLEAN DEFAULT FALSE,
                encrypted BOOLEAN DEFAULT FALSE,
                status VARCHAR(50) DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS restore_history (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                backup_id UUID REFERENCES backups(id),
                restored_to VARCHAR(255),
                restored_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                success BOOLEAN,
                error_message TEXT
            );
        `);
    } catch (error) {
        logger.error('Failed to create backup tables:', error);
    }
};

// Initialize backup tables
createBackupTable();

// Export singleton instance
module.exports = new BackupService();
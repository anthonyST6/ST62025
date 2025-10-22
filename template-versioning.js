/**
 * Template Versioning & Maintenance System
 * Manages template versions, backward compatibility, and updates
 */

const crypto = require('crypto');

class TemplateVersioningSystem {
    constructor() {
        this.versions = new Map();
        this.changeLog = [];
        this.compatibilityMatrix = new Map();
    }

    /**
     * Create a new template version
     */
    createVersion(templateId, templateData, metadata = {}) {
        const versionId = crypto.randomUUID();
        const version = {
            id: versionId,
            templateId,
            versionNumber: this.getNextVersionNumber(templateId),
            data: templateData,
            metadata: {
                createdAt: new Date().toISOString(),
                createdBy: metadata.createdBy || 'system',
                description: metadata.description || '',
                tags: metadata.tags || [],
                ...metadata
            },
            checksum: this.calculateChecksum(templateData),
            isActive: true,
            isDeprecated: false
        };

        this.versions.set(versionId, version);
        this.recordChange(templateId, 'version_created', versionId, version);

        return version;
    }

    /**
     * Get next version number for a template
     */
    getNextVersionNumber(templateId) {
        let maxVersion = 0;
        for (const [, version] of this.versions) {
            if (version.templateId === templateId) {
                maxVersion = Math.max(maxVersion, version.versionNumber);
            }
        }
        return maxVersion + 1;
    }

    /**
     * Get specific version of a template
     */
    getVersion(versionId) {
        return this.versions.get(versionId);
    }

    /**
     * Get all versions of a template
     */
    getTemplateVersions(templateId) {
        const versions = [];
        for (const [, version] of this.versions) {
            if (version.templateId === templateId) {
                versions.push(version);
            }
        }
        return versions.sort((a, b) => b.versionNumber - a.versionNumber);
    }

    /**
     * Get active version of a template
     */
    getActiveVersion(templateId) {
        const versions = this.getTemplateVersions(templateId);
        return versions.find(v => v.isActive && !v.isDeprecated);
    }

    /**
     * Deprecate a version
     */
    deprecateVersion(versionId, reason = '') {
        const version = this.versions.get(versionId);
        if (!version) throw new Error(`Version ${versionId} not found`);

        version.isDeprecated = true;
        version.deprecationReason = reason;
        version.deprecatedAt = new Date().toISOString();

        this.recordChange(version.templateId, 'version_deprecated', versionId, {
            reason,
            deprecatedAt: version.deprecatedAt
        });

        return version;
    }

    /**
     * Rollback to a previous version
     */
    rollbackToVersion(templateId, versionNumber) {
        const versions = this.getTemplateVersions(templateId);
        const targetVersion = versions.find(v => v.versionNumber === versionNumber);

        if (!targetVersion) {
            throw new Error(`Version ${versionNumber} not found for template ${templateId}`);
        }

        // Deactivate current active version
        const currentActive = this.getActiveVersion(templateId);
        if (currentActive) {
            currentActive.isActive = false;
        }

        // Activate target version
        targetVersion.isActive = true;
        targetVersion.rolledBackAt = new Date().toISOString();

        this.recordChange(templateId, 'version_rollback', targetVersion.id, {
            fromVersion: currentActive?.versionNumber,
            toVersion: versionNumber
        });

        return targetVersion;
    }

    /**
     * Check backward compatibility between versions
     */
    checkCompatibility(fromVersionId, toVersionId) {
        const fromVersion = this.versions.get(fromVersionId);
        const toVersion = this.versions.get(toVersionId);

        if (!fromVersion || !toVersion) {
            throw new Error('One or both versions not found');
        }

        const compatibility = {
            compatible: true,
            breakingChanges: [],
            deprecations: [],
            newFields: [],
            removedFields: [],
            modifiedFields: []
        };

        // Compare schemas
        const fromFields = Object.keys(fromVersion.data.schema || {});
        const toFields = Object.keys(toVersion.data.schema || {});

        // Check for removed fields (breaking change)
        fromFields.forEach(field => {
            if (!toFields.includes(field)) {
                compatibility.breakingChanges.push(`Field '${field}' removed`);
                compatibility.removedFields.push(field);
                compatibility.compatible = false;
            }
        });

        // Check for new fields
        toFields.forEach(field => {
            if (!fromFields.includes(field)) {
                compatibility.newFields.push(field);
            }
        });

        // Check for modified fields
        fromFields.forEach(field => {
            if (toFields.includes(field)) {
                const fromType = fromVersion.data.schema[field]?.type;
                const toType = toVersion.data.schema[field]?.type;
                if (fromType !== toType) {
                    compatibility.modifiedFields.push({
                        field,
                        from: fromType,
                        to: toType
                    });
                }
            }
        });

        this.compatibilityMatrix.set(`${fromVersionId}-${toVersionId}`, compatibility);
        return compatibility;
    }

    /**
     * Migrate data from one version to another
     */
    migrateData(data, fromVersionId, toVersionId) {
        const compatibility = this.checkCompatibility(fromVersionId, toVersionId);

        if (!compatibility.compatible && compatibility.breakingChanges.length > 0) {
            throw new Error(
                `Cannot migrate: Breaking changes detected: ${compatibility.breakingChanges.join(', ')}`
            );
        }

        const migratedData = { ...data };

        // Add new fields with defaults
        compatibility.newFields.forEach(field => {
            const toVersion = this.versions.get(toVersionId);
            const fieldSchema = toVersion.data.schema[field];
            migratedData[field] = fieldSchema?.default || null;
        });

        // Remove deprecated fields
        compatibility.removedFields.forEach(field => {
            delete migratedData[field];
        });

        return migratedData;
    }

    /**
     * Calculate checksum for template data
     */
    calculateChecksum(data) {
        const hash = crypto.createHash('sha256');
        hash.update(JSON.stringify(data));
        return hash.digest('hex');
    }

    /**
     * Record a change in the changelog
     */
    recordChange(templateId, action, versionId, details) {
        this.changeLog.push({
            id: crypto.randomUUID(),
            templateId,
            action,
            versionId,
            details,
            timestamp: new Date().toISOString()
        });
    }

    /**
     * Get changelog for a template
     */
    getChangeLog(templateId, limit = 50) {
        return this.changeLog
            .filter(entry => entry.templateId === templateId)
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, limit);
    }

    /**
     * Export version history as JSON
     */
    exportVersionHistory(templateId) {
        const versions = this.getTemplateVersions(templateId);
        const changelog = this.getChangeLog(templateId);

        return {
            templateId,
            versions: versions.map(v => ({
                versionNumber: v.versionNumber,
                id: v.id,
                createdAt: v.metadata.createdAt,
                description: v.metadata.description,
                isActive: v.isActive,
                isDeprecated: v.isDeprecated,
                checksum: v.checksum
            })),
            changelog,
            exportedAt: new Date().toISOString()
        };
    }

    /**
     * Validate template against schema
     */
    validateTemplate(templateData, schemaVersion) {
        const version = this.versions.get(schemaVersion);
        if (!version) throw new Error(`Schema version ${schemaVersion} not found`);

        const schema = version.data.schema;
        const errors = [];

        // Check required fields
        Object.entries(schema).forEach(([field, fieldSchema]) => {
            if (fieldSchema.required && !templateData[field]) {
                errors.push(`Required field '${field}' is missing`);
            }

            // Type validation
            if (templateData[field] && fieldSchema.type) {
                const actualType = typeof templateData[field];
                if (actualType !== fieldSchema.type) {
                    errors.push(
                        `Field '${field}' has wrong type: expected ${fieldSchema.type}, got ${actualType}`
                    );
                }
            }
        });

        return {
            valid: errors.length === 0,
            errors
        };
    }
}

/**
 * Template Maintenance Manager
 * Handles cleanup, archival, and maintenance tasks
 */
class TemplateMaintenanceManager {
    constructor(versioningSystem) {
        this.versioningSystem = versioningSystem;
        this.maintenanceLogs = [];
    }

    /**
     * Archive old versions (keep only last N versions)
     */
    archiveOldVersions(templateId, keepCount = 5) {
        const versions = this.versioningSystem.getTemplateVersions(templateId);
        const toArchive = versions.slice(keepCount);

        const archived = [];
        toArchive.forEach(version => {
            if (!version.isActive) {
                version.archived = true;
                version.archivedAt = new Date().toISOString();
                archived.push(version.id);
            }
        });

        this.logMaintenance('archive', templateId, {
            archivedCount: archived.length,
            archivedVersions: archived
        });

        return archived;
    }

    /**
     * Clean up deprecated versions
     */
    cleanupDeprecatedVersions(templateId, olderThanDays = 90) {
        const versions = this.versioningSystem.getTemplateVersions(templateId);
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);

        const cleaned = [];
        versions.forEach(version => {
            if (version.isDeprecated && version.deprecatedAt) {
                const deprecatedDate = new Date(version.deprecatedAt);
                if (deprecatedDate < cutoffDate) {
                    version.cleaned = true;
                    version.cleanedAt = new Date().toISOString();
                    cleaned.push(version.id);
                }
            }
        });

        this.logMaintenance('cleanup', templateId, {
            cleanedCount: cleaned.length,
            cleanedVersions: cleaned,
            olderThanDays
        });

        return cleaned;
    }

    /**
     * Generate maintenance report
     */
    generateMaintenanceReport(templateId) {
        const versions = this.versioningSystem.getTemplateVersions(templateId);
        const changelog = this.versioningSystem.getChangeLog(templateId);

        return {
            templateId,
            totalVersions: versions.length,
            activeVersions: versions.filter(v => v.isActive).length,
            deprecatedVersions: versions.filter(v => v.isDeprecated).length,
            archivedVersions: versions.filter(v => v.archived).length,
            totalChanges: changelog.length,
            lastModified: changelog[0]?.timestamp || null,
            oldestVersion: versions[versions.length - 1]?.metadata.createdAt || null,
            newestVersion: versions[0]?.metadata.createdAt || null,
            maintenanceLogs: this.maintenanceLogs.filter(log => log.templateId === templateId)
        };
    }

    /**
     * Log maintenance activity
     */
    logMaintenance(action, templateId, details) {
        this.maintenanceLogs.push({
            id: crypto.randomUUID(),
            action,
            templateId,
            details,
            timestamp: new Date().toISOString()
        });
    }
}

module.exports = {
    TemplateVersioningSystem,
    TemplateMaintenanceManager
};

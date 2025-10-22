/**
 * Template Manager
 * Orchestrates template system with permanent structure + dynamic data pattern
 * Handles auto-population, versioning, and persistence
 */

const { db } = require('./database');
const TemplateFieldMapper = require('./template-field-mapper');
const { getTemplate, getAllTemplates } = require('./template-registry-complete');

class TemplateManager {
    constructor() {
        this.fieldMapper = new TemplateFieldMapper();
        this._initializeDatabase();
    }

    /**
     * Initialize database tables
     */
    _initializeDatabase() {
        try {
            // Create tables directly instead of parsing SQL file
            // This avoids SQL parsing issues
            
            // Template instances table
            db.exec(`
                CREATE TABLE IF NOT EXISTS template_instances (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER NOT NULL,
                    subcomponent_id TEXT NOT NULL,
                    template_id TEXT NOT NULL,
                    analysis_id INTEGER,
                    data TEXT NOT NULL,
                    format TEXT DEFAULT 'json',
                    version TEXT DEFAULT '1.0',
                    status TEXT DEFAULT 'draft',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    UNIQUE(user_id, subcomponent_id, version)
                );
            `);

            // Template customizations table
            db.exec(`
                CREATE TABLE IF NOT EXISTS template_customizations (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    template_instance_id INTEGER NOT NULL,
                    field_name TEXT NOT NULL,
                    field_path TEXT,
                    original_value TEXT,
                    customized_value TEXT,
                    customization_type TEXT DEFAULT 'manual',
                    reason TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (template_instance_id) REFERENCES template_instances(id) ON DELETE CASCADE
                );
            `);

            // Template versions table
            db.exec(`
                CREATE TABLE IF NOT EXISTS template_versions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    template_instance_id INTEGER NOT NULL,
                    version_number INTEGER NOT NULL,
                    version_label TEXT,
                    data TEXT NOT NULL,
                    change_description TEXT,
                    changed_fields TEXT,
                    change_type TEXT DEFAULT 'manual',
                    created_by INTEGER,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (template_instance_id) REFERENCES template_instances(id) ON DELETE CASCADE,
                    UNIQUE(template_instance_id, version_number)
                );
            `);

            // Template downloads table
            db.exec(`
                CREATE TABLE IF NOT EXISTS template_downloads (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    template_instance_id INTEGER NOT NULL,
                    user_id INTEGER NOT NULL,
                    format TEXT NOT NULL,
                    file_size INTEGER,
                    download_url TEXT,
                    downloaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    ip_address TEXT,
                    user_agent TEXT,
                    FOREIGN KEY (template_instance_id) REFERENCES template_instances(id) ON DELETE CASCADE
                );
            `);

            // Template analysis links table
            db.exec(`
                CREATE TABLE IF NOT EXISTS template_analysis_links (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    template_instance_id INTEGER NOT NULL,
                    subcomponent_id TEXT NOT NULL,
                    analysis_score INTEGER,
                    analysis_data TEXT,
                    analysis_timestamp TIMESTAMP,
                    auto_populated BOOLEAN DEFAULT 0,
                    populated_fields TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (template_instance_id) REFERENCES template_instances(id) ON DELETE CASCADE,
                    UNIQUE(template_instance_id)
                );
            `);

            // Create indexes
            db.exec(`CREATE INDEX IF NOT EXISTS idx_template_instances_user ON template_instances(user_id);`);
            db.exec(`CREATE INDEX IF NOT EXISTS idx_template_instances_subcomponent ON template_instances(subcomponent_id);`);
            db.exec(`CREATE INDEX IF NOT EXISTS idx_template_customizations_instance ON template_customizations(template_instance_id);`);
            db.exec(`CREATE INDEX IF NOT EXISTS idx_template_versions_instance ON template_versions(template_instance_id);`);
            db.exec(`CREATE INDEX IF NOT EXISTS idx_template_downloads_instance ON template_downloads(template_instance_id);`);
            db.exec(`CREATE INDEX IF NOT EXISTS idx_template_analysis_links_instance ON template_analysis_links(template_instance_id);`);

            console.log('✅ Template database schema initialized');
        } catch (error) {
            console.error('❌ Failed to initialize template schema:', error);
            throw error;
        }
    }

    /**
     * Generate template from analysis results
     * This is the core auto-population function
     */
    async generateFromAnalysis(userId, subcomponentId, analysisResults, worksheetData = {}) {
        console.log(`📋 Generating template for ${subcomponentId} from analysis`);

        try {
            // Get template definition
            const templateDef = getTemplate(subcomponentId);
            if (!templateDef) {
                throw new Error(`Template not found for ${subcomponentId}`);
            }

            // Map analysis results to template fields
            const mappedData = this.fieldMapper.mapAnalysisToTemplate(
                subcomponentId,
                analysisResults,
                worksheetData
            );

            // Create or update template instance
            const instance = await this._createOrUpdateInstance(
                userId,
                subcomponentId,
                templateDef.id,
                mappedData,
                analysisResults
            );

            console.log(`✅ Template generated: ${instance.id}`);
            return instance;

        } catch (error) {
            console.error(`❌ Failed to generate template for ${subcomponentId}:`, error);
            throw error;
        }
    }

    /**
     * Create or update template instance
     */
    async _createOrUpdateInstance(userId, subcomponentId, templateId, data, analysisResults) {
        return new Promise((resolve, reject) => {
            // Check if instance already exists
            db.get(
                `SELECT id, data, version FROM template_instances 
                 WHERE user_id = ? AND subcomponent_id = ? AND status != 'archived'
                 ORDER BY created_at DESC LIMIT 1`,
                [userId, subcomponentId],
                (err, existing) => {
                    if (err) return reject(err);

                    if (existing) {
                        // Update existing instance
                        this._updateInstance(existing.id, data, analysisResults)
                            .then(resolve)
                            .catch(reject);
                    } else {
                        // Create new instance
                        this._createInstance(userId, subcomponentId, templateId, data, analysisResults)
                            .then(resolve)
                            .catch(reject);
                    }
                }
            );
        });
    }

    /**
     * Create new template instance
     */
    async _createInstance(userId, subcomponentId, templateId, data, analysisResults) {
        return new Promise((resolve, reject) => {
            const dataJson = JSON.stringify(data);
            
            db.run(
                `INSERT INTO template_instances 
                 (user_id, subcomponent_id, template_id, data, format, version, status)
                 VALUES (?, ?, ?, ?, 'json', '1.0', 'draft')`,
                [userId, subcomponentId, templateId, dataJson],
                function(err) {
                    if (err) return reject(err);

                    const instanceId = this.lastID;

                    // Create analysis link
                    db.run(
                        `INSERT INTO template_analysis_links 
                         (template_instance_id, subcomponent_id, analysis_score, analysis_data, 
                          analysis_timestamp, auto_populated, populated_fields)
                         VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, 1, ?)`,
                        [
                            instanceId,
                            subcomponentId,
                            analysisResults.score || 0,
                            JSON.stringify(analysisResults),
                            JSON.stringify(Object.keys(data))
                        ],
                        (linkErr) => {
                            if (linkErr) console.warn('Failed to create analysis link:', linkErr);

                            resolve({
                                id: instanceId,
                                userId,
                                subcomponentId,
                                templateId,
                                data,
                                version: '1.0',
                                status: 'draft',
                                autoPopulated: true
                            });
                        }
                    );
                }
            );
        });
    }

    /**
     * Update existing template instance
     */
    async _updateInstance(instanceId, data, analysisResults) {
        return new Promise((resolve, reject) => {
            const dataJson = JSON.stringify(data);

            db.run(
                `UPDATE template_instances 
                 SET data = ?, updated_at = CURRENT_TIMESTAMP
                 WHERE id = ?`,
                [dataJson, instanceId],
                (err) => {
                    if (err) return reject(err);

                    // Update analysis link
                    db.run(
                        `UPDATE template_analysis_links 
                         SET analysis_score = ?, analysis_data = ?, 
                             analysis_timestamp = CURRENT_TIMESTAMP,
                             auto_populated = 1,
                             populated_fields = ?,
                             updated_at = CURRENT_TIMESTAMP
                         WHERE template_instance_id = ?`,
                        [
                            analysisResults.score || 0,
                            JSON.stringify(analysisResults),
                            JSON.stringify(Object.keys(data)),
                            instanceId
                        ],
                        (linkErr) => {
                            if (linkErr) console.warn('Failed to update analysis link:', linkErr);

                            // Get updated instance
                            db.get(
                                `SELECT * FROM template_instances WHERE id = ?`,
                                [instanceId],
                                (getErr, instance) => {
                                    if (getErr) return reject(getErr);
                                    
                                    resolve({
                                        ...instance,
                                        data: JSON.parse(instance.data),
                                        autoPopulated: true
                                    });
                                }
                            );
                        }
                    );
                }
            );
        });
    }

    /**
     * Get template instance for user
     */
    async getTemplateInstance(userId, subcomponentId) {
        return new Promise((resolve, reject) => {
            db.get(
                `SELECT ti.*, tal.analysis_score, tal.auto_populated, tal.analysis_timestamp
                 FROM template_instances ti
                 LEFT JOIN template_analysis_links tal ON ti.id = tal.template_instance_id
                 WHERE ti.user_id = ? AND ti.subcomponent_id = ? AND ti.status != 'archived'
                 ORDER BY ti.created_at DESC LIMIT 1`,
                [userId, subcomponentId],
                (err, row) => {
                    if (err) return reject(err);
                    if (!row) return resolve(null);

                    resolve({
                        ...row,
                        data: JSON.parse(row.data)
                    });
                }
            );
        });
    }

    /**
     * Get all template instances for user
     */
    async getUserTemplates(userId) {
        return new Promise((resolve, reject) => {
            db.all(
                `SELECT ti.*, tal.analysis_score, tal.auto_populated
                 FROM template_instances ti
                 LEFT JOIN template_analysis_links tal ON ti.id = tal.template_instance_id
                 WHERE ti.user_id = ? AND ti.status != 'archived'
                 ORDER BY ti.updated_at DESC`,
                [userId],
                (err, rows) => {
                    if (err) return reject(err);
                    
                    const templates = rows.map(row => ({
                        ...row,
                        data: JSON.parse(row.data)
                    }));
                    
                    resolve(templates);
                }
            );
        });
    }

    /**
     * Customize template field
     */
    async customizeField(instanceId, fieldName, newValue, reason = 'manual') {
        return new Promise((resolve, reject) => {
            // Get current instance
            db.get(
                `SELECT data FROM template_instances WHERE id = ?`,
                [instanceId],
                (err, instance) => {
                    if (err) return reject(err);
                    if (!instance) return reject(new Error('Instance not found'));

                    const data = JSON.parse(instance.data);
                    const originalValue = data[fieldName];

                    // Update field
                    data[fieldName] = newValue;

                    // Save updated data
                    db.run(
                        `UPDATE template_instances SET data = ? WHERE id = ?`,
                        [JSON.stringify(data), instanceId],
                        (updateErr) => {
                            if (updateErr) return reject(updateErr);

                            // Record customization
                            db.run(
                                `INSERT INTO template_customizations 
                                 (template_instance_id, field_name, original_value, 
                                  customized_value, customization_type, reason)
                                 VALUES (?, ?, ?, ?, 'manual', ?)`,
                                [instanceId, fieldName, originalValue, newValue, reason],
                                (customErr) => {
                                    if (customErr) console.warn('Failed to record customization:', customErr);
                                    resolve({ success: true, fieldName, newValue });
                                }
                            );
                        }
                    );
                }
            );
        });
    }

    /**
     * Create template version snapshot
     */
    async createVersion(instanceId, versionLabel, changeDescription, userId) {
        return new Promise((resolve, reject) => {
            db.get(
                `SELECT data FROM template_instances WHERE id = ?`,
                [instanceId],
                (err, instance) => {
                    if (err) return reject(err);
                    if (!instance) return reject(new Error('Instance not found'));

                    // Get next version number
                    db.get(
                        `SELECT COALESCE(MAX(version_number), 0) + 1 as next_version
                         FROM template_versions WHERE template_instance_id = ?`,
                        [instanceId],
                        (vErr, versionInfo) => {
                            if (vErr) return reject(vErr);

                            const versionNumber = versionInfo.next_version;

                            db.run(
                                `INSERT INTO template_versions 
                                 (template_instance_id, version_number, version_label, data,
                                  change_description, change_type, created_by)
                                 VALUES (?, ?, ?, ?, ?, 'manual', ?)`,
                                [instanceId, versionNumber, versionLabel, instance.data,
                                 changeDescription, userId],
                                function(insertErr) {
                                    if (insertErr) return reject(insertErr);
                                    
                                    resolve({
                                        versionId: this.lastID,
                                        versionNumber,
                                        versionLabel
                                    });
                                }
                            );
                        }
                    );
                }
            );
        });
    }

    /**
     * Get template versions
     */
    async getVersions(instanceId) {
        return new Promise((resolve, reject) => {
            db.all(
                `SELECT * FROM template_versions 
                 WHERE template_instance_id = ?
                 ORDER BY version_number DESC`,
                [instanceId],
                (err, rows) => {
                    if (err) return reject(err);
                    
                    const versions = rows.map(row => ({
                        ...row,
                        data: JSON.parse(row.data),
                        changed_fields: row.changed_fields ? JSON.parse(row.changed_fields) : []
                    }));
                    
                    resolve(versions);
                }
            );
        });
    }

    /**
     * Record template download
     */
    async recordDownload(instanceId, userId, format, fileSize = 0) {
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO template_downloads 
                 (template_instance_id, user_id, format, file_size)
                 VALUES (?, ?, ?, ?)`,
                [instanceId, userId, format, fileSize],
                function(err) {
                    if (err) return reject(err);
                    resolve({ downloadId: this.lastID });
                }
            );
        });
    }

    /**
     * Get template analytics
     */
    async getAnalytics(subcomponentId = null) {
        return new Promise((resolve, reject) => {
            const query = subcomponentId
                ? `SELECT * FROM v_template_analytics WHERE subcomponent_id = ?`
                : `SELECT * FROM v_template_analytics`;
            
            const params = subcomponentId ? [subcomponentId] : [];

            db.all(query, params, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
}

module.exports = TemplateManager;
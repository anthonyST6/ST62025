-- Template System Database Schema
-- Implements permanent structure + dynamic data pattern
-- Supports versioning, customization, and auto-population

-- ============================================================================
-- TEMPLATE INSTANCES
-- Stores user-specific template data with analysis integration
-- ============================================================================
CREATE TABLE IF NOT EXISTS template_instances (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    subcomponent_id TEXT NOT NULL,
    template_id TEXT NOT NULL,
    analysis_id INTEGER,
    
    -- Template data (JSON format)
    data JSON NOT NULL,
    
    -- Metadata
    format TEXT DEFAULT 'json',
    version TEXT DEFAULT '1.0',
    status TEXT DEFAULT 'draft', -- draft, published, archived
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign keys
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    
    -- Indexes for performance
    UNIQUE(user_id, subcomponent_id, version)
);

CREATE INDEX IF NOT EXISTS idx_template_instances_user ON template_instances(user_id);
CREATE INDEX IF NOT EXISTS idx_template_instances_subcomponent ON template_instances(subcomponent_id);
CREATE INDEX IF NOT EXISTS idx_template_instances_status ON template_instances(status);

-- ============================================================================
-- TEMPLATE CUSTOMIZATIONS
-- Tracks user modifications to template fields
-- ============================================================================
CREATE TABLE IF NOT EXISTS template_customizations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    template_instance_id INTEGER NOT NULL,
    
    -- Field information
    field_name TEXT NOT NULL,
    field_path TEXT, -- JSON path for nested fields
    
    -- Values
    original_value TEXT,
    customized_value TEXT,
    
    -- Metadata
    customization_type TEXT DEFAULT 'manual', -- manual, ai-suggested, auto-populated
    reason TEXT, -- Why was this customized?
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign keys
    FOREIGN KEY (template_instance_id) REFERENCES template_instances(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_template_customizations_instance ON template_customizations(template_instance_id);
CREATE INDEX IF NOT EXISTS idx_template_customizations_field ON template_customizations(field_name);

-- ============================================================================
-- TEMPLATE VERSIONS
-- Tracks template changes over time for rollback capability
-- ============================================================================
CREATE TABLE IF NOT EXISTS template_versions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    template_instance_id INTEGER NOT NULL,
    
    -- Version information
    version_number INTEGER NOT NULL,
    version_label TEXT, -- e.g., "Initial Draft", "After Q1 Review"
    
    -- Snapshot of template data at this version
    data JSON NOT NULL,
    
    -- Change tracking
    change_description TEXT,
    changed_fields JSON, -- Array of field names that changed
    change_type TEXT DEFAULT 'manual', -- manual, auto-update, analysis-refresh
    
    -- Metadata
    created_by INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign keys
    FOREIGN KEY (template_instance_id) REFERENCES template_instances(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    
    -- Ensure version numbers are unique per instance
    UNIQUE(template_instance_id, version_number)
);

CREATE INDEX IF NOT EXISTS idx_template_versions_instance ON template_versions(template_instance_id);
CREATE INDEX IF NOT EXISTS idx_template_versions_created ON template_versions(created_at);

-- ============================================================================
-- TEMPLATE DOWNLOADS
-- Tracks template download history for analytics
-- ============================================================================
CREATE TABLE IF NOT EXISTS template_downloads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    template_instance_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    
    -- Download information
    format TEXT NOT NULL, -- pdf, docx, json
    file_size INTEGER,
    download_url TEXT,
    
    -- Metadata
    downloaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address TEXT,
    user_agent TEXT,
    
    -- Foreign keys
    FOREIGN KEY (template_instance_id) REFERENCES template_instances(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_template_downloads_instance ON template_downloads(template_instance_id);
CREATE INDEX IF NOT EXISTS idx_template_downloads_user ON template_downloads(user_id);
CREATE INDEX IF NOT EXISTS idx_template_downloads_date ON template_downloads(downloaded_at);

-- ============================================================================
-- TEMPLATE ANALYSIS LINKS
-- Links templates to analysis results for auto-population
-- ============================================================================
CREATE TABLE IF NOT EXISTS template_analysis_links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    template_instance_id INTEGER NOT NULL,
    subcomponent_id TEXT NOT NULL,
    
    -- Analysis information
    analysis_score INTEGER,
    analysis_data JSON,
    analysis_timestamp TIMESTAMP,
    
    -- Auto-population status
    auto_populated BOOLEAN DEFAULT 0,
    populated_fields JSON, -- Array of field names that were auto-populated
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign keys
    FOREIGN KEY (template_instance_id) REFERENCES template_instances(id) ON DELETE CASCADE,
    
    -- Ensure one link per template instance
    UNIQUE(template_instance_id)
);

CREATE INDEX IF NOT EXISTS idx_template_analysis_links_instance ON template_analysis_links(template_instance_id);
CREATE INDEX IF NOT EXISTS idx_template_analysis_links_subcomponent ON template_analysis_links(subcomponent_id);

-- ============================================================================
-- TEMPLATE SHARING
-- Allows users to share templates with team members
-- ============================================================================
CREATE TABLE IF NOT EXISTS template_shares (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    template_instance_id INTEGER NOT NULL,
    
    -- Sharing information
    shared_by INTEGER NOT NULL,
    shared_with INTEGER, -- NULL for public share
    share_token TEXT UNIQUE,
    
    -- Permissions
    can_view BOOLEAN DEFAULT 1,
    can_edit BOOLEAN DEFAULT 0,
    can_download BOOLEAN DEFAULT 1,
    
    -- Expiration
    expires_at TIMESTAMP,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_accessed_at TIMESTAMP,
    access_count INTEGER DEFAULT 0,
    
    -- Foreign keys
    FOREIGN KEY (template_instance_id) REFERENCES template_instances(id) ON DELETE CASCADE,
    FOREIGN KEY (shared_by) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (shared_with) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_template_shares_instance ON template_shares(template_instance_id);
CREATE INDEX IF NOT EXISTS idx_template_shares_token ON template_shares(share_token);
CREATE INDEX IF NOT EXISTS idx_template_shares_shared_with ON template_shares(shared_with);

-- ============================================================================
-- VIEWS FOR COMMON QUERIES
-- ============================================================================

-- View: Latest template versions per user/subcomponent
CREATE VIEW IF NOT EXISTS v_latest_templates AS
SELECT 
    ti.id,
    ti.user_id,
    ti.subcomponent_id,
    ti.template_id,
    ti.data,
    ti.format,
    ti.version,
    ti.status,
    ti.created_at,
    ti.updated_at,
    tal.analysis_score,
    tal.auto_populated,
    (SELECT COUNT(*) FROM template_versions tv WHERE tv.template_instance_id = ti.id) as version_count,
    (SELECT COUNT(*) FROM template_downloads td WHERE td.template_instance_id = ti.id) as download_count
FROM template_instances ti
LEFT JOIN template_analysis_links tal ON ti.id = tal.template_instance_id
WHERE ti.status != 'archived';

-- View: Template analytics per subcomponent
CREATE VIEW IF NOT EXISTS v_template_analytics AS
SELECT 
    ti.subcomponent_id,
    COUNT(DISTINCT ti.user_id) as unique_users,
    COUNT(ti.id) as total_templates,
    AVG(tal.analysis_score) as avg_score,
    SUM(CASE WHEN tal.auto_populated = 1 THEN 1 ELSE 0 END) as auto_populated_count,
    COUNT(td.id) as total_downloads,
    MAX(ti.updated_at) as last_updated
FROM template_instances ti
LEFT JOIN template_analysis_links tal ON ti.id = tal.template_instance_id
LEFT JOIN template_downloads td ON ti.id = td.template_instance_id
GROUP BY ti.subcomponent_id;

-- ============================================================================
-- TRIGGERS FOR AUTOMATIC UPDATES
-- ============================================================================

-- Trigger: Update template_instances.updated_at on modification
CREATE TRIGGER IF NOT EXISTS trg_template_instances_updated
AFTER UPDATE ON template_instances
FOR EACH ROW
BEGIN
    UPDATE template_instances 
    SET updated_at = CURRENT_TIMESTAMP 
    WHERE id = NEW.id;
END;

-- Trigger: Create version snapshot on template update
CREATE TRIGGER IF NOT EXISTS trg_template_version_snapshot
AFTER UPDATE OF data ON template_instances
FOR EACH ROW
WHEN OLD.data != NEW.data
BEGIN
    INSERT INTO template_versions (
        template_instance_id,
        version_number,
        data,
        change_description,
        change_type,
        created_by
    )
    VALUES (
        NEW.id,
        (SELECT COALESCE(MAX(version_number), 0) + 1 
         FROM template_versions 
         WHERE template_instance_id = NEW.id),
        OLD.data,
        'Auto-snapshot before update',
        'auto-update',
        NEW.user_id
    );
END;

-- ============================================================================
-- INITIAL DATA SETUP
-- ============================================================================

-- Insert template metadata for all 96 subcomponents
-- This ensures we have a record of all available templates
-- (Actual template content comes from template-registry-complete.js)

-- Note: This is handled by the application layer, not SQL
-- The template registry is the source of truth for template definitions

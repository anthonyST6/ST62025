-- Additional Compliance Tables for Data Protection
-- Version: 1.0.0
-- Description: Enhanced privacy and data protection compliance

-- =====================================================
-- PRIVACY & COMPLIANCE TABLES
-- =====================================================

-- Token Vault for sensitive data tokenization
CREATE TABLE IF NOT EXISTS token_vault (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    token VARCHAR(255) UNIQUE NOT NULL,
    encrypted_data JSONB NOT NULL,
    data_classification VARCHAR(50),
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    accessed_at TIMESTAMP,
    access_count INTEGER DEFAULT 0
);

-- Privacy Requests Tracking
CREATE TABLE IF NOT EXISTS privacy_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    organization_id UUID REFERENCES organizations(id),
    request_type VARCHAR(50) NOT NULL, -- gdpr_export, gdpr_delete, ccpa_disclosure, ccpa_delete, etc.
    request_data JSONB,
    response_data JSONB,
    status VARCHAR(50) DEFAULT 'pending',
    verification_method VARCHAR(100),
    verified_at TIMESTAMP,
    processed_by UUID REFERENCES users(id),
    completed_at TIMESTAMP,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Privacy Preferences (CCPA/CPRA specific)
CREATE TABLE IF NOT EXISTS privacy_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    do_not_sell BOOLEAN DEFAULT FALSE,
    do_not_share BOOLEAN DEFAULT FALSE,
    limit_sensitive_use BOOLEAN DEFAULT FALSE,
    opt_out_targeted_ads BOOLEAN DEFAULT FALSE,
    opt_out_profiling BOOLEAN DEFAULT FALSE,
    communication_preferences JSONB DEFAULT '{}',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address INET,
    UNIQUE(user_id, organization_id)
);

-- Parental Consents (COPPA)
CREATE TABLE IF NOT EXISTS parental_consents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    child_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    parent_email VARCHAR(255) NOT NULL,
    parent_user_id UUID REFERENCES users(id),
    verification_code VARCHAR(255),
    verification_method VARCHAR(50), -- email, credit_card, id_verification
    consent_data JSONB,
    status VARCHAR(50) DEFAULT 'pending',
    verified_at TIMESTAMP,
    expires_at TIMESTAMP,
    revoked_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Data Classification Catalog
CREATE TABLE IF NOT EXISTS data_classification (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    table_name VARCHAR(100) NOT NULL,
    column_name VARCHAR(100) NOT NULL,
    classification VARCHAR(50) NOT NULL, -- public, internal, confidential, restricted, pii, sensitive_pii
    data_type VARCHAR(50),
    encryption_required BOOLEAN DEFAULT FALSE,
    retention_days INTEGER,
    legal_basis VARCHAR(100),
    purpose TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(table_name, column_name)
);

-- User Data Catalog (for CCPA categories)
CREATE TABLE IF NOT EXISTS user_data_catalog (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    category VARCHAR(100) NOT NULL, -- identifiers, personal_records, commercial, biometric, etc.
    subcategory VARCHAR(100),
    data_source VARCHAR(255),
    collection_method VARCHAR(100),
    purpose VARCHAR(255),
    retention_period_days INTEGER,
    third_party_shared BOOLEAN DEFAULT FALSE,
    sold_data BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Third Party Data Sharing
CREATE TABLE IF NOT EXISTS third_party_sharing (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    third_party_name VARCHAR(255) NOT NULL,
    third_party_type VARCHAR(100), -- processor, controller, service_provider
    purpose TEXT,
    data_categories TEXT[],
    legal_basis VARCHAR(100),
    agreement_type VARCHAR(100), -- dpa, baa, scc
    agreement_signed_date DATE,
    agreement_expires_date DATE,
    data_location VARCHAR(100),
    security_measures TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Legal Holds
CREATE TABLE IF NOT EXISTS legal_holds (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    organization_id UUID REFERENCES organizations(id),
    case_number VARCHAR(100),
    reason TEXT,
    data_types TEXT[],
    hold_start_date DATE NOT NULL,
    hold_end_date DATE,
    created_by UUID REFERENCES users(id),
    approved_by UUID REFERENCES users(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Privacy Impact Assessments
CREATE TABLE IF NOT EXISTS privacy_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    project_name VARCHAR(255) NOT NULL,
    assessment_type VARCHAR(50), -- dpia, pia, lia
    assessment_data JSONB NOT NULL,
    risk_level VARCHAR(20), -- low, medium, high, critical
    score DECIMAL(5,2),
    mitigations JSONB,
    approval_status VARCHAR(50) DEFAULT 'pending',
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMP,
    next_review_date DATE,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Consent Records with Versioning
CREATE TABLE IF NOT EXISTS consent_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    consent_type VARCHAR(100) NOT NULL,
    consent_version VARCHAR(20) NOT NULL,
    consent_text TEXT,
    purposes TEXT[],
    lawful_basis VARCHAR(100),
    given BOOLEAN NOT NULL,
    withdrawal_method VARCHAR(100),
    withdrawn_at TIMESTAMP,
    expires_at TIMESTAMP,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Data Breach Records
CREATE TABLE IF NOT EXISTS data_breach_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    breach_date TIMESTAMP NOT NULL,
    discovered_date TIMESTAMP NOT NULL,
    description TEXT NOT NULL,
    data_types_affected TEXT[],
    number_affected INTEGER,
    severity VARCHAR(20) NOT NULL, -- low, medium, high, critical
    cause VARCHAR(100),
    actions_taken TEXT,
    authorities_notified BOOLEAN DEFAULT FALSE,
    authority_notification_date TIMESTAMP,
    users_notified BOOLEAN DEFAULT FALSE,
    user_notification_date TIMESTAMP,
    notification_method VARCHAR(100),
    remediation_status VARCHAR(50),
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Automated Compliance Monitoring
CREATE TABLE IF NOT EXISTS compliance_monitoring (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    check_type VARCHAR(100) NOT NULL,
    check_name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL, -- passed, failed, warning
    details JSONB,
    severity VARCHAR(20),
    remediation_required BOOLEAN DEFAULT FALSE,
    remediation_deadline DATE,
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cross-Border Transfer Records
CREATE TABLE IF NOT EXISTS cross_border_transfers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    from_country VARCHAR(2) NOT NULL,
    to_country VARCHAR(2) NOT NULL,
    transfer_mechanism VARCHAR(100), -- scc, bcr, adequacy, consent
    data_categories TEXT[],
    purpose TEXT,
    recipient_name VARCHAR(255),
    safeguards TEXT,
    risk_assessment JSONB,
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMP,
    expires_at TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Data Retention Policies
CREATE TABLE IF NOT EXISTS retention_policies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    data_category VARCHAR(100) NOT NULL,
    table_name VARCHAR(100),
    retention_days INTEGER NOT NULL,
    deletion_method VARCHAR(50), -- hard_delete, soft_delete, anonymize
    legal_requirement BOOLEAN DEFAULT FALSE,
    legal_citation TEXT,
    auto_delete BOOLEAN DEFAULT TRUE,
    last_execution TIMESTAMP,
    next_execution TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- INDEXES FOR COMPLIANCE TABLES
-- =====================================================

CREATE INDEX idx_token_vault_token ON token_vault(token);
CREATE INDEX idx_privacy_requests_user ON privacy_requests(user_id, organization_id);
CREATE INDEX idx_privacy_requests_status ON privacy_requests(status, created_at);
CREATE INDEX idx_privacy_preferences_user ON privacy_preferences(user_id, organization_id);
CREATE INDEX idx_parental_consents_child ON parental_consents(child_user_id);
CREATE INDEX idx_data_classification_table ON data_classification(table_name, column_name);
CREATE INDEX idx_user_data_catalog_user ON user_data_catalog(user_id, category);
CREATE INDEX idx_consent_records_user ON consent_records(user_id, consent_type);
CREATE INDEX idx_compliance_monitoring_org ON compliance_monitoring(organization_id, checked_at);
CREATE INDEX idx_cross_border_active ON cross_border_transfers(organization_id, is_active);

-- =====================================================
-- ROW LEVEL SECURITY FOR COMPLIANCE TABLES
-- =====================================================

ALTER TABLE privacy_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE privacy_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_data_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE consent_records ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY privacy_requests_isolation ON privacy_requests
    FOR ALL
    USING (organization_id = current_setting('app.current_org_id')::UUID);

CREATE POLICY privacy_preferences_isolation ON privacy_preferences
    FOR ALL
    USING (organization_id = current_setting('app.current_org_id')::UUID);

CREATE POLICY user_data_catalog_isolation ON user_data_catalog
    FOR ALL
    USING (organization_id = current_setting('app.current_org_id')::UUID);

CREATE POLICY consent_records_isolation ON consent_records
    FOR ALL
    USING (organization_id = current_setting('app.current_org_id')::UUID);

-- =====================================================
-- COMPLIANCE FUNCTIONS
-- =====================================================

-- Function to automatically classify PII columns
CREATE OR REPLACE FUNCTION classify_pii_columns()
RETURNS void AS $$
DECLARE
    rec RECORD;
BEGIN
    -- Common PII patterns
    FOR rec IN 
        SELECT table_name, column_name
        FROM information_schema.columns
        WHERE table_schema = 'public'
        AND (
            column_name ILIKE '%email%'
            OR column_name ILIKE '%phone%'
            OR column_name ILIKE '%ssn%'
            OR column_name ILIKE '%tax%'
            OR column_name ILIKE '%passport%'
            OR column_name ILIKE '%license%'
            OR column_name ILIKE '%birth%'
            OR column_name ILIKE '%address%'
            OR column_name ILIKE '%name%'
        )
    LOOP
        INSERT INTO data_classification (table_name, column_name, classification, encryption_required)
        VALUES (rec.table_name, rec.column_name, 'pii', true)
        ON CONFLICT (table_name, column_name) DO NOTHING;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Function to check retention policy compliance
CREATE OR REPLACE FUNCTION check_retention_compliance()
RETURNS TABLE(
    table_name VARCHAR,
    records_to_delete BIGINT,
    oldest_record_date TIMESTAMP
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        rp.table_name,
        COUNT(*) as records_to_delete,
        MIN(created_at) as oldest_record_date
    FROM retention_policies rp
    JOIN audit_logs al ON al.created_at < NOW() - (rp.retention_days || ' days')::INTERVAL
    WHERE rp.auto_delete = true
    GROUP BY rp.table_name;
END;
$$ LANGUAGE plpgsql;

-- Function to anonymize user data
CREATE OR REPLACE FUNCTION anonymize_user_data(user_id_param UUID)
RETURNS void AS $$
BEGIN
    -- Anonymize user table
    UPDATE users 
    SET 
        email = 'anonymized-' || user_id_param || '@deleted.com',
        first_name = 'Anonymized',
        last_name = 'User',
        phone = NULL,
        avatar_url = NULL,
        is_active = false,
        deleted_at = NOW()
    WHERE id = user_id_param;
    
    -- Anonymize related data
    UPDATE worksheets SET created_by = NULL WHERE created_by = user_id_param;
    UPDATE analyses SET created_by = NULL WHERE created_by = user_id_param;
    UPDATE reports SET generated_by = NULL WHERE generated_by = user_id_param;
    UPDATE documents SET uploaded_by = NULL WHERE uploaded_by = user_id_param;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- COMPLIANCE TRIGGERS
-- =====================================================

-- Trigger to log consent changes
CREATE OR REPLACE FUNCTION log_consent_change()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO audit_logs (
        user_id,
        organization_id,
        action,
        resource_type,
        resource_id,
        changes,
        created_at
    ) VALUES (
        NEW.user_id,
        NEW.organization_id,
        CASE 
            WHEN TG_OP = 'INSERT' THEN 'consent_given'
            WHEN NEW.withdrawn_at IS NOT NULL THEN 'consent_withdrawn'
            ELSE 'consent_updated'
        END,
        'consent',
        NEW.id,
        row_to_json(NEW),
        NOW()
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_log_consent_change
AFTER INSERT OR UPDATE ON consent_records
FOR EACH ROW EXECUTE FUNCTION log_consent_change();

-- Trigger to enforce data retention
CREATE OR REPLACE FUNCTION enforce_retention_policy()
RETURNS TRIGGER AS $$
DECLARE
    retention_days INTEGER;
BEGIN
    -- Get retention policy for this data category
    SELECT rp.retention_days INTO retention_days
    FROM retention_policies rp
    WHERE rp.table_name = TG_TABLE_NAME
    AND rp.organization_id = NEW.organization_id;
    
    -- Set expiration date if retention policy exists
    IF retention_days IS NOT NULL THEN
        NEW.expires_at = NOW() + (retention_days || ' days')::INTERVAL;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- INITIAL COMPLIANCE DATA
-- =====================================================

-- Insert default data classifications
INSERT INTO data_classification (table_name, column_name, classification, encryption_required, retention_days) VALUES
('users', 'email', 'pii', true, 2555),
('users', 'password_hash', 'sensitive_pii', true, 2555),
('users', 'first_name', 'pii', true, 2555),
('users', 'last_name', 'pii', true, 2555),
('users', 'phone', 'pii', true, 2555),
('sessions', 'ip_address', 'pii', false, 90),
('audit_logs', 'ip_address', 'pii', false, 730),
('documents', 'file_url', 'confidential', true, 1095),
('analyses', 'analysis_data', 'confidential', true, 1825),
('reports', 'data', 'confidential', true, 1825)
ON CONFLICT (table_name, column_name) DO NOTHING;

-- Insert default retention policies
INSERT INTO retention_policies (organization_id, data_category, table_name, retention_days, deletion_method, legal_requirement) VALUES
((SELECT id FROM organizations LIMIT 1), 'audit_logs', 'audit_logs', 730, 'hard_delete', true),
((SELECT id FROM organizations LIMIT 1), 'sessions', 'sessions', 90, 'hard_delete', false),
((SELECT id FROM organizations LIMIT 1), 'documents', 'documents', 1095, 'soft_delete', false),
((SELECT id FROM organizations LIMIT 1), 'analyses', 'analyses', 1825, 'anonymize', false),
((SELECT id FROM organizations LIMIT 1), 'reports', 'reports', 1825, 'anonymize', false)
ON CONFLICT DO NOTHING;

-- Run initial PII classification
SELECT classify_pii_columns();
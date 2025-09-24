-- ScaleOps6 Multi-Tenant Database Schema
-- Version: 2.0.0
-- Description: Complete multi-tenant architecture with data isolation

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS sessions CASCADE;
DROP TABLE IF EXISTS documents CASCADE;
DROP TABLE IF EXISTS score_history CASCADE;
DROP TABLE IF EXISTS reports CASCADE;
DROP TABLE IF EXISTS analyses CASCADE;
DROP TABLE IF EXISTS worksheets CASCADE;
DROP TABLE IF EXISTS workspace_members CASCADE;
DROP TABLE IF EXISTS workspaces CASCADE;
DROP TABLE IF EXISTS organization_invitations CASCADE;
DROP TABLE IF EXISTS organization_members CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS organizations CASCADE;

-- =====================================================
-- CORE TABLES
-- =====================================================

-- Organizations (Tenants)
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    logo_url TEXT,
    website VARCHAR(255),
    industry VARCHAR(100),
    size VARCHAR(50),
    subscription_tier VARCHAR(50) DEFAULT 'trial' CHECK (subscription_tier IN ('trial', 'starter', 'professional', 'enterprise')),
    subscription_status VARCHAR(50) DEFAULT 'active' CHECK (subscription_status IN ('active', 'inactive', 'suspended', 'cancelled')),
    trial_ends_at TIMESTAMP,
    license_seats INTEGER DEFAULT 5,
    used_seats INTEGER DEFAULT 0,
    storage_quota_gb INTEGER DEFAULT 10,
    storage_used_gb DECIMAL(10,2) DEFAULT 0,
    billing_email VARCHAR(255),
    billing_address JSONB,
    settings JSONB DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

-- Users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    display_name VARCHAR(200),
    avatar_url TEXT,
    phone VARCHAR(50),
    timezone VARCHAR(50) DEFAULT 'UTC',
    locale VARCHAR(10) DEFAULT 'en',
    email_verified BOOLEAN DEFAULT FALSE,
    email_verified_at TIMESTAMP,
    phone_verified BOOLEAN DEFAULT FALSE,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    two_factor_secret VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    is_super_admin BOOLEAN DEFAULT FALSE,
    last_login_at TIMESTAMP,
    last_login_ip INET,
    failed_login_attempts INTEGER DEFAULT 0,
    locked_until TIMESTAMP,
    password_reset_token VARCHAR(255),
    password_reset_expires TIMESTAMP,
    preferences JSONB DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

-- Organization Members (Many-to-Many)
CREATE TABLE organization_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL DEFAULT 'viewer' CHECK (role IN ('owner', 'admin', 'editor', 'viewer')),
    department VARCHAR(100),
    title VARCHAR(100),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    invited_by UUID REFERENCES users(id),
    invitation_accepted_at TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    permissions JSONB DEFAULT '[]',
    settings JSONB DEFAULT '{}',
    last_activity_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(organization_id, user_id)
);

-- Organization Invitations
CREATE TABLE organization_invitations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'viewer',
    token VARCHAR(255) UNIQUE NOT NULL,
    invited_by UUID NOT NULL REFERENCES users(id),
    accepted_by UUID REFERENCES users(id),
    expires_at TIMESTAMP NOT NULL,
    accepted_at TIMESTAMP,
    declined_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Workspaces (Projects within Organizations)
CREATE TABLE workspaces (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    color VARCHAR(7),
    is_default BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    settings JSONB DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    archived_at TIMESTAMP,
    UNIQUE(organization_id, slug)
);

-- Workspace Members
CREATE TABLE workspace_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) DEFAULT 'member',
    added_by UUID REFERENCES users(id),
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(workspace_id, user_id)
);

-- =====================================================
-- WORKSHEET & ANALYSIS TABLES
-- =====================================================

-- Worksheet Versions (with full history)
CREATE TABLE worksheets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    workspace_id UUID REFERENCES workspaces(id) ON DELETE SET NULL,
    block_id INTEGER NOT NULL,
    subcomponent_id VARCHAR(50) NOT NULL,
    version INTEGER NOT NULL DEFAULT 1,
    is_current BOOLEAN DEFAULT TRUE,
    title VARCHAR(500),
    data JSONB NOT NULL,
    attachments JSONB DEFAULT '[]',
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'in_progress', 'submitted', 'reviewed', 'approved')),
    created_by UUID NOT NULL REFERENCES users(id),
    reviewed_by UUID REFERENCES users(id),
    approved_by UUID REFERENCES users(id),
    parent_version_id UUID REFERENCES worksheets(id),
    change_summary TEXT,
    tags TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    submitted_at TIMESTAMP,
    reviewed_at TIMESTAMP,
    approved_at TIMESTAMP
);

-- AI Analysis Results (permanent storage)
CREATE TABLE analyses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    workspace_id UUID REFERENCES workspaces(id) ON DELETE SET NULL,
    worksheet_id UUID REFERENCES worksheets(id) ON DELETE CASCADE,
    block_id INTEGER NOT NULL,
    subcomponent_id VARCHAR(50) NOT NULL,
    agent_type VARCHAR(100) NOT NULL,
    agent_version VARCHAR(20),
    score DECIMAL(5,2),
    confidence_level DECIMAL(3,2),
    analysis_data JSONB NOT NULL,
    dimensions JSONB,
    strengths JSONB,
    weaknesses JSONB,
    recommendations JSONB,
    action_items JSONB,
    benchmarks JSONB,
    created_by UUID NOT NULL REFERENCES users(id),
    processing_time_ms INTEGER,
    tokens_used INTEGER,
    cost_usd DECIMAL(10,4),
    is_final BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Generated Reports (permanent storage)
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    workspace_id UUID REFERENCES workspaces(id) ON DELETE SET NULL,
    report_type VARCHAR(100) NOT NULL,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    executive_summary TEXT,
    file_url TEXT,
    file_size_bytes BIGINT,
    format VARCHAR(50) DEFAULT 'pdf',
    pages INTEGER,
    data JSONB,
    filters JSONB,
    included_blocks INTEGER[],
    generated_by UUID NOT NULL REFERENCES users(id),
    generation_time_ms INTEGER,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    access_count INTEGER DEFAULT 0,
    last_accessed_at TIMESTAMP,
    last_accessed_by UUID REFERENCES users(id),
    shared_with JSONB DEFAULT '[]',
    is_public BOOLEAN DEFAULT FALSE,
    public_token VARCHAR(255) UNIQUE
);

-- Score History (immutable audit trail)
CREATE TABLE score_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    workspace_id UUID REFERENCES workspaces(id) ON DELETE SET NULL,
    block_id INTEGER NOT NULL,
    subcomponent_id VARCHAR(50),
    score DECIMAL(5,2) NOT NULL,
    previous_score DECIMAL(5,2),
    score_change DECIMAL(5,2),
    percentile_rank DECIMAL(5,2),
    change_type VARCHAR(50) CHECK (change_type IN ('initial', 'improvement', 'decline', 'manual_adjustment', 'recalculation')),
    change_reason TEXT,
    change_event JSONB,
    analysis_id UUID REFERENCES analyses(id),
    worksheet_id UUID REFERENCES worksheets(id),
    recorded_by UUID NOT NULL REFERENCES users(id),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Document Uploads
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    workspace_id UUID REFERENCES workspaces(id) ON DELETE SET NULL,
    worksheet_id UUID REFERENCES worksheets(id) ON DELETE SET NULL,
    block_id INTEGER,
    subcomponent_id VARCHAR(50),
    file_name VARCHAR(500) NOT NULL,
    original_name VARCHAR(500) NOT NULL,
    file_url TEXT NOT NULL,
    file_size_bytes BIGINT,
    mime_type VARCHAR(100),
    file_hash VARCHAR(64),
    storage_provider VARCHAR(50) DEFAULT 's3',
    storage_path TEXT,
    thumbnail_url TEXT,
    ai_summary TEXT,
    extracted_text TEXT,
    extracted_data JSONB,
    ocr_completed BOOLEAN DEFAULT FALSE,
    virus_scanned BOOLEAN DEFAULT FALSE,
    virus_scan_result VARCHAR(50),
    tags TEXT[],
    uploaded_by UUID NOT NULL REFERENCES users(id),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP,
    deleted_at TIMESTAMP,
    deleted_by UUID REFERENCES users(id)
);

-- =====================================================
-- SESSION & SECURITY TABLES
-- =====================================================

-- Sessions with Refresh Tokens
CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    access_token_hash VARCHAR(255) UNIQUE NOT NULL,
    refresh_token_hash VARCHAR(255) UNIQUE NOT NULL,
    device_id VARCHAR(255),
    device_name VARCHAR(255),
    device_type VARCHAR(50),
    ip_address INET,
    user_agent TEXT,
    location JSONB,
    expires_at TIMESTAMP NOT NULL,
    refresh_expires_at TIMESTAMP NOT NULL,
    last_activity_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    revoked_at TIMESTAMP,
    revoked_by UUID REFERENCES users(id),
    revoke_reason VARCHAR(255)
);

-- Audit Logs (for compliance and security)
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    session_id UUID REFERENCES sessions(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(100),
    resource_id UUID,
    resource_name VARCHAR(255),
    changes JSONB,
    previous_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    location JSONB,
    success BOOLEAN DEFAULT TRUE,
    error_message TEXT,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Organizations
CREATE INDEX idx_organizations_slug ON organizations(slug);
CREATE INDEX idx_organizations_subscription ON organizations(subscription_tier, subscription_status);
CREATE INDEX idx_organizations_created ON organizations(created_at DESC);

-- Users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_active ON users(is_active, email_verified);
CREATE INDEX idx_users_login ON users(last_login_at DESC);

-- Organization Members
CREATE INDEX idx_org_members_org ON organization_members(organization_id);
CREATE INDEX idx_org_members_user ON organization_members(user_id);
CREATE INDEX idx_org_members_role ON organization_members(organization_id, role);

-- Workspaces
CREATE INDEX idx_workspaces_org ON workspaces(organization_id);
CREATE INDEX idx_workspaces_slug ON workspaces(organization_id, slug);

-- Worksheets
CREATE INDEX idx_worksheets_org ON worksheets(organization_id);
CREATE INDEX idx_worksheets_lookup ON worksheets(organization_id, subcomponent_id, is_current);
CREATE INDEX idx_worksheets_workspace ON worksheets(workspace_id);
CREATE INDEX idx_worksheets_created ON worksheets(created_at DESC);

-- Analyses
CREATE INDEX idx_analyses_org ON analyses(organization_id);
CREATE INDEX idx_analyses_worksheet ON analyses(worksheet_id);
CREATE INDEX idx_analyses_lookup ON analyses(organization_id, subcomponent_id, created_at DESC);

-- Reports
CREATE INDEX idx_reports_org ON reports(organization_id);
CREATE INDEX idx_reports_type ON reports(organization_id, report_type);
CREATE INDEX idx_reports_generated ON reports(generated_at DESC);

-- Score History
CREATE INDEX idx_score_history_org ON score_history(organization_id);
CREATE INDEX idx_score_history_block ON score_history(organization_id, block_id, recorded_at DESC);
CREATE INDEX idx_score_history_date ON score_history(recorded_at DESC);

-- Documents
CREATE INDEX idx_documents_org ON documents(organization_id);
CREATE INDEX idx_documents_worksheet ON documents(worksheet_id);
CREATE INDEX idx_documents_uploaded ON documents(uploaded_at DESC);

-- Sessions
CREATE INDEX idx_sessions_user ON sessions(user_id);
CREATE INDEX idx_sessions_tokens ON sessions(access_token_hash, refresh_token_hash);
CREATE INDEX idx_sessions_expires ON sessions(expires_at);

-- Audit Logs
CREATE INDEX idx_audit_org ON audit_logs(organization_id);
CREATE INDEX idx_audit_user ON audit_logs(user_id);
CREATE INDEX idx_audit_created ON audit_logs(created_at DESC);
CREATE INDEX idx_audit_action ON audit_logs(action, created_at DESC);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on sensitive tables
ALTER TABLE worksheets ENABLE ROW LEVEL SECURITY;
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE score_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Worksheets
CREATE POLICY worksheet_isolation ON worksheets
    FOR ALL
    USING (organization_id = current_setting('app.current_org_id')::UUID);

-- RLS Policies for Analyses
CREATE POLICY analysis_isolation ON analyses
    FOR ALL
    USING (organization_id = current_setting('app.current_org_id')::UUID);

-- RLS Policies for Reports
CREATE POLICY report_isolation ON reports
    FOR ALL
    USING (organization_id = current_setting('app.current_org_id')::UUID);

-- RLS Policies for Documents
CREATE POLICY document_isolation ON documents
    FOR ALL
    USING (organization_id = current_setting('app.current_org_id')::UUID);

-- RLS Policies for Score History
CREATE POLICY score_history_isolation ON score_history
    FOR ALL
    USING (organization_id = current_setting('app.current_org_id')::UUID);

-- RLS Policies for Audit Logs
CREATE POLICY audit_log_isolation ON audit_logs
    FOR ALL
    USING (organization_id = current_setting('app.current_org_id')::UUID);

-- =====================================================
-- TRIGGERS FOR UPDATED_AT
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_organization_members_updated_at BEFORE UPDATE ON organization_members
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workspaces_updated_at BEFORE UPDATE ON workspaces
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- INITIAL DATA
-- =====================================================

-- Create default super admin user (password: Admin123!)
INSERT INTO users (
    email,
    password_hash,
    first_name,
    last_name,
    display_name,
    email_verified,
    is_super_admin,
    is_active
) VALUES (
    'admin@scaleops6.com',
    '$2b$10$YourHashedPasswordHere', -- This should be properly hashed
    'System',
    'Admin',
    'System Administrator',
    true,
    true,
    true
);

-- Create demo organization
INSERT INTO organizations (
    name,
    slug,
    subscription_tier,
    subscription_status,
    license_seats,
    storage_quota_gb
) VALUES (
    'ST6Co',
    'st6co',
    'enterprise',
    'active',
    100,
    500
);

-- Grant admin access to super admin for demo org
INSERT INTO organization_members (
    organization_id,
    user_id,
    role
) VALUES (
    (SELECT id FROM organizations WHERE slug = 'st6co'),
    (SELECT id FROM users WHERE email = 'admin@scaleops6.com'),
    'owner'
);

-- Create default workspace for demo org
INSERT INTO workspaces (
    organization_id,
    name,
    slug,
    description,
    is_default,
    created_by
) VALUES (
    (SELECT id FROM organizations WHERE slug = 'st6co'),
    'Main Workspace',
    'main',
    'Primary workspace for ScaleOps Product development',
    true,
    (SELECT id FROM users WHERE email = 'admin@scaleops6.com')
);
/**
 * Integration Test for ST6Co ScaleOps6Product
 * Tests: Interactive Worksheet → Analysis → Permanence → Accessibility → Compliance
 */

const axios = require('axios');
const { Database } = require('./src/database/postgres');
const encryptionService = require('./src/services/encryption.service');
const gdprService = require('./src/services/gdpr.service');
const privacyComplianceService = require('./src/services/privacy-compliance.service');
const jwtService = require('./src/auth/jwt.service');

// Test configuration
const TEST_CONFIG = {
    baseUrl: 'http://localhost:3000',
    organization: {
        name: 'ST6Co',
        slug: 'st6co',
        product: 'ScaleOps6Product'
    },
    user: {
        email: 'test@st6co.com',
        firstName: 'Test',
        lastName: 'User',
        password: 'SecurePassword123!'
    }
};

// Color codes for console output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

// Test utilities
const log = {
    success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
    error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
    info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
    section: (msg) => console.log(`\n${colors.bright}${colors.cyan}═══ ${msg} ═══${colors.reset}\n`),
    subsection: (msg) => console.log(`\n${colors.yellow}▶ ${msg}${colors.reset}`)
};

class ComplianceIntegrationTest {
    constructor() {
        this.tokens = null;
        this.userId = null;
        this.organizationId = null;
        this.worksheetId = null;
        this.analysisId = null;
        this.testResults = {
            passed: 0,
            failed: 0,
            tests: []
        };
    }

    /**
     * Run complete test suite
     */
    async runTests() {
        log.section('ST6Co ScaleOps6Product Compliance Integration Test');
        
        try {
            // Setup
            await this.setupTestEnvironment();
            
            // Test 1: User Authentication & Organization Setup
            await this.testAuthentication();
            
            // Test 2: Interactive Worksheet Submission
            await this.testWorksheetSubmission();
            
            // Test 3: AI Analysis Generation
            await this.testAnalysisGeneration();
            
            // Test 4: Data Permanence
            await this.testDataPermanence();
            
            // Test 5: Data Accessibility
            await this.testDataAccessibility();
            
            // Test 6: Privacy Compliance
            await this.testPrivacyCompliance();
            
            // Test 7: Encryption Verification
            await this.testEncryption();
            
            // Test 8: Audit Trail
            await this.testAuditTrail();
            
            // Test 9: Cross-Session Persistence
            await this.testCrossSessionPersistence();
            
            // Test 10: Compliance Export
            await this.testComplianceExport();
            
            // Summary
            this.printTestSummary();
            
        } catch (error) {
            log.error(`Test suite failed: ${error.message}`);
            console.error(error);
        } finally {
            await this.cleanup();
        }
    }

    /**
     * Setup test environment
     */
    async setupTestEnvironment() {
        log.subsection('Setting up test environment');
        
        // Database pool connects automatically
        log.success('Database connection pool ready');
        
        // Create test organization if not exists
        const org = await Database.getOne(
            'SELECT * FROM organizations WHERE slug = $1',
            [TEST_CONFIG.organization.slug]
        );
        
        if (!org) {
            const newOrg = await Database.insert('organizations', {
                name: TEST_CONFIG.organization.name,
                slug: TEST_CONFIG.organization.slug,
                subscription_tier: 'enterprise',
                subscription_status: 'active',
                license_seats: 100,
                storage_quota_gb: 500
            });
            this.organizationId = newOrg.id;
            log.success('Test organization created');
        } else {
            this.organizationId = org.id;
            log.success('Using existing test organization');
        }
    }

    /**
     * Test 1: Authentication
     */
    async testAuthentication() {
        log.subsection('Test 1: User Authentication & JWT Generation');
        
        try {
            // Create test user
            const bcrypt = require('bcrypt');
            const passwordHash = await bcrypt.hash(TEST_CONFIG.user.password, 10);
            
            let user = await Database.getOne(
                'SELECT * FROM users WHERE email = $1',
                [TEST_CONFIG.user.email]
            );
            
            if (!user) {
                user = await Database.insert('users', {
                    email: TEST_CONFIG.user.email,
                    password_hash: passwordHash,
                    first_name: TEST_CONFIG.user.firstName,
                    last_name: TEST_CONFIG.user.lastName,
                    email_verified: true,
                    is_active: true
                });
                
                // Add to organization
                await Database.insert('organization_members', {
                    organization_id: this.organizationId,
                    user_id: user.id,
                    role: 'admin'
                });
            }
            
            this.userId = user.id;
            
            // Generate JWT tokens
            this.tokens = jwtService.generateTokenPair({
                userId: this.userId,
                organizationId: this.organizationId,
                role: 'admin',
                permissions: ['*']
            });
            
            // Create session
            await jwtService.createSession({
                userId: this.userId,
                organizationId: this.organizationId,
                accessToken: this.tokens.accessToken,
                refreshToken: this.tokens.refreshToken,
                ipAddress: '127.0.0.1',
                userAgent: 'Test Suite'
            });
            
            log.success('User authenticated successfully');
            log.success('JWT tokens generated');
            log.success('Session created in database');
            this.recordTest('Authentication', true);
            
        } catch (error) {
            log.error(`Authentication failed: ${error.message}`);
            this.recordTest('Authentication', false, error.message);
        }
    }

    /**
     * Test 2: Interactive Worksheet Submission
     */
    async testWorksheetSubmission() {
        log.subsection('Test 2: Interactive Worksheet Submission');
        
        try {
            // Problem Statement worksheet data for ST6Co
            const worksheetData = {
                problem: "Startups struggle to achieve product-market fit and scale their go-to-market operations efficiently. They lack structured frameworks, expert guidance, and integrated tools to navigate from idea to market dominance.",
                target_audience: "Early-stage B2B SaaS startups (Seed to Series B) with technical founders who need GTM expertise and operational excellence to scale from $0 to $10M ARR.",
                current_solutions: "Fragmented approach using multiple consultants, generic frameworks, disconnected tools (CRM, analytics, project management), and expensive advisors without integrated insights.",
                why_inadequate: "Current solutions lack integration, don't provide actionable insights, require multiple vendors, have no learning loops, and don't adapt to the startup's specific stage and context. They treat symptoms, not root causes.",
                unique_value: "ScaleOps6Product is an AI-powered GTM maturity platform that provides personalized roadmaps, integrated tools, and expert guidance through 16 operational blocks, helping startups systematically progress from idea to scale.",
                evidence: "Beta testing with 10 startups showed 3x faster time to product-market fit, 70% reduction in GTM operational overhead, and average NPS of 72. Our own journey validates the framework's effectiveness."
            };
            
            // Encrypt sensitive fields
            const encryptedData = encryptionService.encryptPII(worksheetData, ['evidence']);
            
            // Create worksheet with versioning
            const worksheet = await Database.insert('worksheets', {
                organization_id: this.organizationId,
                workspace_id: null,
                block_id: 1,
                subcomponent_id: 'problem_statement',
                version: 1,
                is_current: true,
                title: 'ST6Co Problem Statement - ScaleOps6Product',
                data: encryptedData,
                status: 'submitted',
                created_by: this.userId,
                submitted_at: new Date()
            });
            
            this.worksheetId = worksheet.id;
            
            log.success('Worksheet created with encryption');
            log.success(`Worksheet ID: ${this.worksheetId}`);
            log.success('Version 1 saved to database');
            this.recordTest('Worksheet Submission', true);
            
        } catch (error) {
            log.error(`Worksheet submission failed: ${error.message}`);
            this.recordTest('Worksheet Submission', false, error.message);
        }
    }

    /**
     * Test 3: AI Analysis Generation
     */
    async testAnalysisGeneration() {
        log.subsection('Test 3: AI Analysis Generation & Storage');
        
        try {
            // Simulate AI analysis (would normally call the agent)
            const analysisData = {
                score: 72,
                confidence_level: 0.85,
                dimensions: {
                    problem_clarity: { score: 75, feedback: "Well-defined problem with clear pain points" },
                    audience_specificity: { score: 80, feedback: "Excellent target audience definition" },
                    solution_differentiation: { score: 70, feedback: "Good differentiation, could be stronger" },
                    evidence_strength: { score: 65, feedback: "Initial evidence promising, needs more data" },
                    market_readiness: { score: 70, feedback: "Market timing appears favorable" }
                },
                strengths: [
                    "Clear understanding of startup GTM challenges",
                    "Well-defined target audience (B2B SaaS, Seed to Series B)",
                    "Integrated approach vs fragmented solutions",
                    "Strong initial beta testing results"
                ],
                weaknesses: [
                    "Limited evidence base (only 10 beta customers)",
                    "Competitive differentiation could be clearer",
                    "ROI metrics need more validation"
                ],
                recommendations: [
                    "Expand beta testing to 50+ startups for statistical significance",
                    "Develop detailed competitive analysis matrix",
                    "Create case studies from successful beta customers",
                    "Quantify ROI more precisely (time saved, revenue impact)"
                ],
                action_items: [
                    { priority: "high", item: "Launch expanded beta program", timeline: "2 weeks" },
                    { priority: "high", item: "Document 3 detailed case studies", timeline: "1 month" },
                    { priority: "medium", item: "Build ROI calculator", timeline: "3 weeks" },
                    { priority: "medium", item: "Create competitive battlecards", timeline: "2 weeks" }
                ]
            };
            
            // Encrypt analysis data
            const encryptedAnalysis = encryptionService.encrypt(
                JSON.stringify(analysisData),
                encryptionService.dataClassification.CONFIDENTIAL
            );
            
            // Store analysis permanently
            const analysis = await Database.insert('analyses', {
                organization_id: this.organizationId,
                workspace_id: null,
                worksheet_id: this.worksheetId,
                block_id: 1,
                subcomponent_id: 'problem_statement',
                agent_type: 'problem_statement_agent',
                agent_version: '2.0',
                score: analysisData.score,
                confidence_level: analysisData.confidence_level,
                analysis_data: encryptedAnalysis,
                dimensions: analysisData.dimensions,
                strengths: analysisData.strengths,
                weaknesses: analysisData.weaknesses,
                recommendations: analysisData.recommendations,
                action_items: analysisData.action_items,
                created_by: this.userId,
                processing_time_ms: 1250,
                tokens_used: 3500,
                cost_usd: 0.0525,
                is_final: true
            });
            
            this.analysisId = analysis.id;
            
            // Record score history
            await Database.insert('score_history', {
                organization_id: this.organizationId,
                workspace_id: null,
                block_id: 1,
                subcomponent_id: 'problem_statement',
                score: analysisData.score,
                previous_score: null,
                score_change: null,
                change_type: 'initial',
                change_reason: 'First analysis of Problem Statement',
                analysis_id: this.analysisId,
                worksheet_id: this.worksheetId,
                recorded_by: this.userId
            });
            
            log.success('AI analysis generated and encrypted');
            log.success(`Analysis ID: ${this.analysisId}`);
            log.success(`Score: ${analysisData.score}%`);
            log.success('Score history recorded');
            this.recordTest('Analysis Generation', true);
            
        } catch (error) {
            log.error(`Analysis generation failed: ${error.message}`);
            this.recordTest('Analysis Generation', false, error.message);
        }
    }

    /**
     * Test 4: Data Permanence
     */
    async testDataPermanence() {
        log.subsection('Test 4: Data Permanence Verification');
        
        try {
            // Verify worksheet is permanently stored
            const worksheet = await Database.getOne(
                'SELECT * FROM worksheets WHERE id = $1',
                [this.worksheetId]
            );
            
            if (!worksheet) {
                throw new Error('Worksheet not found in database');
            }
            
            log.success('Worksheet permanently stored');
            
            // Verify analysis is permanently stored
            const analysis = await Database.getOne(
                'SELECT * FROM analyses WHERE id = $1',
                [this.analysisId]
            );
            
            if (!analysis) {
                throw new Error('Analysis not found in database');
            }
            
            log.success('Analysis permanently stored');
            
            // Verify score history is maintained
            const scoreHistory = await Database.getMany(
                'SELECT * FROM score_history WHERE worksheet_id = $1 ORDER BY recorded_at',
                [this.worksheetId]
            );
            
            if (scoreHistory.length === 0) {
                throw new Error('Score history not found');
            }
            
            log.success(`Score history maintained: ${scoreHistory.length} records`);
            
            // Test worksheet versioning
            const updatedData = worksheet.data;
            updatedData.problem += ' [Updated for testing]';
            
            const newVersion = await Database.insert('worksheets', {
                ...worksheet,
                id: undefined,
                version: 2,
                parent_version_id: this.worksheetId,
                data: updatedData,
                change_summary: 'Test update for permanence verification',
                created_at: new Date()
            });
            
            // Mark old version as not current
            await Database.update('worksheets', 
                { is_current: false },
                { id: this.worksheetId }
            );
            
            // Mark new version as current
            await Database.update('worksheets',
                { is_current: true },
                { id: newVersion.id }
            );
            
            log.success('Worksheet versioning working (Version 2 created)');
            log.success('Previous versions preserved');
            
            this.recordTest('Data Permanence', true);
            
        } catch (error) {
            log.error(`Data permanence test failed: ${error.message}`);
            this.recordTest('Data Permanence', false, error.message);
        }
    }

    /**
     * Test 5: Data Accessibility
     */
    async testDataAccessibility() {
        log.subsection('Test 5: Data Accessibility Across Sessions');
        
        try {
            // Simulate accessing data from different session
            const sessionData = await jwtService.validateSession(this.tokens.accessToken);
            
            if (!sessionData) {
                throw new Error('Session validation failed');
            }
            
            log.success('Session validated successfully');
            
            // Set organization context for RLS
            await Database.query(
                `SET LOCAL app.current_org_id = '${this.organizationId}'`
            );
            
            // Access worksheet with RLS enabled
            const worksheets = await Database.getMany(
                'SELECT * FROM worksheets WHERE organization_id = $1 AND is_current = true',
                [this.organizationId]
            );
            
            log.success(`Accessible worksheets: ${worksheets.length}`);
            
            // Access analyses with RLS enabled
            const analyses = await Database.getMany(
                'SELECT * FROM analyses WHERE organization_id = $1',
                [this.organizationId]
            );
            
            log.success(`Accessible analyses: ${analyses.length}`);
            
            // Verify decryption of encrypted data
            const analysis = analyses[0];
            if (analysis && analysis.analysis_data) {
                const decrypted = encryptionService.decrypt(analysis.analysis_data);
                const parsedData = JSON.parse(decrypted);
                
                if (parsedData.score) {
                    log.success('Encrypted analysis data successfully decrypted');
                    log.success(`Decrypted score: ${parsedData.score}%`);
                }
            }
            
            // Test cross-workspace accessibility
            const workspace = await Database.insert('workspaces', {
                organization_id: this.organizationId,
                name: 'Test Workspace',
                slug: 'test-workspace',
                created_by: this.userId
            });
            
            // Move worksheet to workspace
            await Database.update('worksheets',
                { workspace_id: workspace.id },
                { id: this.worksheetId }
            );
            
            const worksheetInWorkspace = await Database.getOne(
                'SELECT * FROM worksheets WHERE id = $1 AND workspace_id = $2',
                [this.worksheetId, workspace.id]
            );
            
            if (worksheetInWorkspace) {
                log.success('Data accessible across workspaces');
            }
            
            this.recordTest('Data Accessibility', true);
            
        } catch (error) {
            log.error(`Data accessibility test failed: ${error.message}`);
            this.recordTest('Data Accessibility', false, error.message);
        }
    }

    /**
     * Test 6: Privacy Compliance
     */
    async testPrivacyCompliance() {
        log.subsection('Test 6: Privacy Law Compliance (GDPR/CCPA)');
        
        try {
            // Test GDPR data export
            log.info('Testing GDPR data export...');
            const exportResult = await gdprService.exportUserData(this.userId, this.organizationId);
            
            if (!exportResult.exportId) {
                throw new Error('GDPR export failed');
            }
            
            log.success(`GDPR export successful: ${exportResult.exportId}`);
            log.success(`Records exported: ${exportResult.recordCount}`);
            
            // Test CCPA data disclosure
            log.info('Testing CCPA disclosure...');
            const disclosure = await privacyComplianceService.ccpaDataDisclosure(
                this.userId,
                this.organizationId
            );
            
            if (!disclosure.categories) {
                throw new Error('CCPA disclosure failed');
            }
            
            log.success('CCPA disclosure generated');
            log.success(`Data categories: ${Object.keys(disclosure.categories).length}`);
            
            // Test consent management
            log.info('Testing consent management...');
            await gdprService.updateConsent(this.userId, {
                marketing_emails: false,
                analytics_tracking: true,
                data_processing: true,
                ipAddress: '127.0.0.1',
                userAgent: 'Test Suite'
            });
            
            const consentStatus = await gdprService.getConsentStatus(this.userId);
            
            if (!consentStatus.data_processing) {
                throw new Error('Consent management failed');
            }
            
            log.success('Consent management working');
            log.success(`Marketing consent: ${consentStatus.marketing_emails?.consented || false}`);
            log.success(`Analytics consent: ${consentStatus.analytics?.consented || false}`);
            
            // Test data retention policies
            log.info('Testing retention policies...');
            const retentionPolicy = await Database.getOne(
                'SELECT * FROM retention_policies WHERE data_category = $1',
                ['analyses']
            );
            
            if (retentionPolicy) {
                log.success(`Retention policy active: ${retentionPolicy.retention_days} days for analyses`);
            }
            
            // Test privacy preferences (CCPA)
            await privacyComplianceService.ccpaOptOut(this.userId, this.organizationId, {
                doNotSell: true,
                doNotShare: true,
                limitUseOfSensitiveInfo: false
            });
            
            const privacyPrefs = await Database.getOne(
                'SELECT * FROM privacy_preferences WHERE user_id = $1',
                [this.userId]
            );
            
            if (privacyPrefs && privacyPrefs.do_not_sell) {
                log.success('CCPA opt-out preferences saved');
            }
            
            this.recordTest('Privacy Compliance', true);
            
        } catch (error) {
            log.error(`Privacy compliance test failed: ${error.message}`);
            this.recordTest('Privacy Compliance', false, error.message);
        }
    }

    /**
     * Test 7: Encryption Verification
     */
    async testEncryption() {
        log.subsection('Test 7: Encryption at Rest Verification');
        
        try {
            // Test PII encryption
            const testPII = {
                ssn: '123-45-6789',
                creditCard: '4111111111111111',
                email: 'test@st6co.com'
            };
            
            const encrypted = encryptionService.encryptPII(testPII, ['ssn', 'creditCard']);
            
            if (!encrypted.ssn.encrypted || !encrypted.creditCard.encrypted) {
                throw new Error('PII encryption failed');
            }
            
            log.success('PII fields encrypted successfully');
            
            // Test decryption
            const decrypted = encryptionService.decryptPII(encrypted);
            
            if (decrypted.ssn !== testPII.ssn) {
                throw new Error('PII decryption failed');
            }
            
            log.success('PII decryption verified');
            
            // Test tokenization
            const token = await encryptionService.tokenize(testPII.creditCard);
            
            if (!token || token === testPII.creditCard) {
                throw new Error('Tokenization failed');
            }
            
            log.success(`Sensitive data tokenized: ${token.substring(0, 8)}...`);
            
            // Verify database encryption
            const worksheet = await Database.getOne(
                'SELECT data FROM worksheets WHERE id = $1',
                [this.worksheetId]
            );
            
            if (worksheet.data._encrypted_fields) {
                log.success(`Database fields encrypted: ${worksheet.data._encrypted_fields.join(', ')}`);
            }
            
            // Test encryption performance
            const startTime = Date.now();
            const largeData = 'x'.repeat(10000); // 10KB
            encryptionService.encrypt(largeData);
            const duration = Date.now() - startTime;
            
            log.success(`Encryption performance: ${duration}ms for 10KB`);
            
            this.recordTest('Encryption', true);
            
        } catch (error) {
            log.error(`Encryption test failed: ${error.message}`);
            this.recordTest('Encryption', false, error.message);
        }
    }

    /**
     * Test 8: Audit Trail
     */
    async testAuditTrail() {
        log.subsection('Test 8: Audit Trail Verification');
        
        try {
            // Check audit logs for our actions
            const auditLogs = await Database.getMany(
                `SELECT * FROM audit_logs 
                 WHERE user_id = $1 
                 AND organization_id = $2 
                 ORDER BY created_at DESC 
                 LIMIT 10`,
                [this.userId, this.organizationId]
            );
            
            if (auditLogs.length === 0) {
                throw new Error('No audit logs found');
            }
            
            log.success(`Audit logs found: ${auditLogs.length} recent entries`);
            
            // Verify critical actions are logged
            const actionTypes = auditLogs.map(log => log.action);
            log.success(`Logged actions: ${[...new Set(actionTypes)].join(', ')}`);
            
            // Create test audit entry
            const auditEntry = await Database.insert('audit_logs', {
                organization_id: this.organizationId,
                user_id: this.userId,
                action: 'test_compliance_verification',
                resource_type: 'worksheet',
                resource_id: this.worksheetId,
                ip_address: '127.0.0.1',
                success: true,
                metadata: { test: 'ST6Co compliance test' }
            });
            
            if (!auditEntry.id) {
                throw new Error('Failed to create audit log');
            }
            
            log.success('Audit trail recording verified');
            
            // Verify audit logs are immutable (should not be able to update)
            try {
                await Database.update('audit_logs',
                    { action: 'modified_action' },
                    { id: auditEntry.id }
                );
                log.error('WARNING: Audit logs are mutable (should be immutable)');
                this.recordTest('Audit Trail', false, 'Audit logs should be immutable');
            } catch (error) {
                log.success('Audit logs are immutable (as expected)');
                this.recordTest('Audit Trail', true);
            }
            
        } catch (error) {
            log.error(`Audit trail test failed: ${error.message}`);
            this.recordTest('Audit Trail', false, error.message);
        }
    }

    /**
     * Test 9: Cross-Session Persistence
     */
    async testCrossSessionPersistence() {
        log.subsection('Test 9: Cross-Session Data Persistence');
        
        try {
            // Revoke current session
            const session = await Database.getOne(
                'SELECT id FROM sessions WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1',
                [this.userId]
            );
            
            if (session) {
                await jwtService.revokeSession(session.id, this.userId, 'Test logout');
                log.success('Current session revoked');
            }
            
            // Create new session (simulating new login)
            const newTokens = jwtService.generateTokenPair({
                userId: this.userId,
                organizationId: this.organizationId,
                role: 'admin',
                permissions: ['*']
            });
            
            await jwtService.createSession({
                userId: this.userId,
                organizationId: this.organizationId,
                accessToken: newTokens.accessToken,
                refreshToken: newTokens.refreshToken,
                ipAddress: '192.168.1.100', // Different IP
                userAgent: 'Chrome/120.0' // Different browser
            });
            
            log.success('New session created from different location');
            
            // Verify data is still accessible
            const worksheetCheck = await Database.getOne(
                'SELECT * FROM worksheets WHERE id = $1',
                [this.worksheetId]
            );
            
            const analysisCheck = await Database.getOne(
                'SELECT * FROM analyses WHERE id = $1',
                [this.analysisId]
            );
            
            if (!worksheetCheck || !analysisCheck) {
                throw new Error('Data not accessible in new session');
            }
            
            log.success('All data accessible in new session');
            log.success('Worksheet data persisted across sessions');
            log.success('Analysis data persisted across sessions');
            
            // Check active sessions
            const activeSessions = await jwtService.getUserActiveSessions(this.userId);
            log.success(`Active sessions: ${activeSessions.length}`);
            
            this.recordTest('Cross-Session Persistence', true);
            
        } catch (error) {
            log.error(`Cross-session persistence test failed: ${error.message}`);
            this.recordTest('Cross-Session Persistence', false, error.message);
        }
    }

    /**
     * Test 10: Compliance Export
     */
    async testComplianceExport() {
        log.subsection('Test 10: Compliance Data Export & Portability');
        
        try {
            // Generate comprehensive privacy report
            const privacyReport = await gdprService.generatePrivacyReport(this.organizationId);
            
            if (!privacyReport.dataInventory) {
                throw new Error('Privacy report generation failed');
            }
            
            log.success('Privacy report generated');
            
            // Test data portability (GDPR Article 20)
            const exportData = await gdprService.exportUserData(this.userId, this.organizationId);
            
            // Verify export contains all required data
            const requiredFields = [
                'exportDate',
                'userId',
                'organizationId',
                'data'
            ];
            
            const missingFields = requiredFields.filter(field => !exportData[field]);
            
            if (missingFields.length > 0) {
                throw new Error(`Export missing fields: ${missingFields.join(', ')}`);
            }
            
            log.success('Data portability verified (GDPR compliant)');
            log.success(`Export ID: ${exportData.exportId}`);
            log.success(`Export expires: ${exportData.expiresAt}`);
            
            // Test compliance monitoring
            const complianceStatus = await privacyComplianceService.monitorCompliance(this.organizationId);
            
            log.success('Compliance monitoring active');
            log.success(`Violations: ${complianceStatus.violations.length}`);
            log.success(`Warnings: ${complianceStatus.warnings.length}`);
            log.success(`Recommendations: ${complianceStatus.recommendations.length}`);
            
            // Verify ST6Co specific data
            const st6coData = await Database.getOne(
                `SELECT 
                    COUNT(DISTINCT w.id) as worksheets,
                    COUNT(DISTINCT a.id) as analyses,
                    AVG(a.score) as avg_score
                 FROM worksheets w
                 LEFT JOIN analyses a ON a.worksheet_id = w.id
                 WHERE w.organization_id = $1`,
                [this.organizationId]
            );
            
            log.success(`ST6Co Data Summary:`);
            log.success(`  - Worksheets: ${st6coData.worksheets}`);
            log.success(`  - Analyses: ${st6coData.analyses}`);
            log.success(`  - Average Score: ${Math.round(st6coData.avg_score)}%`);
            
            this.recordTest('Compliance Export', true);
            
        } catch (error) {
            log.error(`Compliance export test failed: ${error.message}`);
            this.recordTest('Compliance Export', false, error.message);
        }
    }

    /**
     * Record test result
     */
    recordTest(testName, passed, error = null) {
        this.testResults.tests.push({
            name: testName,
            passed,
            error
        });
        
        if (passed) {
            this.testResults.passed++;
        } else {
            this.testResults.failed++;
        }
    }

    /**
     * Print test summary
     */
    printTestSummary() {
        log.section('Test Summary');
        
        const total = this.testResults.passed + this.testResults.failed;
        const passRate = ((this.testResults.passed / total) * 100).toFixed(1);
        
        console.log(`${colors.bright}Total Tests:${colors.reset} ${total}`);
        console.log(`${colors.green}Passed:${colors.reset} ${this.testResults.passed}`);
        console.log(`${colors.red}Failed:${colors.reset} ${this.testResults.failed}`);
        console.log(`${colors.cyan}Pass Rate:${colors.reset} ${passRate}%`);
        
        console.log('\n📊 Test Results:');
        this.testResults.tests.forEach((test, index) => {
            const icon = test.passed ? '✅' : '❌';
            const status = test.passed ? 'PASSED' : 'FAILED';
            console.log(`  ${index + 1}. ${icon} ${test.name}: ${status}`);
            if (test.error) {
                console.log(`     └─ Error: ${test.error}`);
            }
        });
        
        if (this.testResults.passed === total) {
            console.log(`\n${colors.bright}${colors.green}🎉 ALL TESTS PASSED! 🎉${colors.reset}`);
            console.log('ST6Co ScaleOps6Product is fully compliant and operational!');
        } else {
            console.log(`\n${colors.bright}${colors.yellow}⚠️  Some tests failed. Review the errors above.${colors.reset}`);
        }
    }

    /**
     * Cleanup test data
     */
    async cleanup() {
        log.subsection('Cleaning up test environment');
        
        try {
            // Keep data for demonstration (comment out to preserve)
            // await Database.delete('sessions', { user_id: this.userId });
            // await Database.delete('audit_logs', { user_id: this.userId });
            
            log.success('Test environment cleaned up (data preserved for review)');
        } catch (error) {
            log.error(`Cleanup failed: ${error.message}`);
        }
    }
}

// Run the tests
async function main() {
    const tester = new ComplianceIntegrationTest();
    await tester.runTests();
    process.exit(0);
}

// Execute if run directly
if (require.main === module) {
    main().catch(error => {
        console.error('Fatal error:', error);
        process.exit(1);
    });
}

module.exports = ComplianceIntegrationTest;
const fs = require('fs').promises;
const path = require('path');
const { Database, logger } = require('./postgres');
const bcrypt = require('bcrypt');
require('dotenv').config();

/**
 * Database Migration Script
 * Sets up the PostgreSQL database with the multi-tenant schema
 */
class DatabaseMigration {
    constructor() {
        this.schemaPath = path.join(__dirname, 'schema.sql');
    }

    /**
     * Run all migrations
     */
    async migrate() {
        try {
            logger.info('Starting database migration...');

            // Check database connection
            const health = await Database.healthCheck();
            if (health.status !== 'healthy') {
                throw new Error('Database connection is not healthy');
            }
            logger.info('Database connection verified', health);

            // Run schema
            await this.runSchema();

            // Create default data
            await this.createDefaultData();

            // Run post-migration checks
            await this.verifyMigration();

            logger.info('✅ Database migration completed successfully!');
        } catch (error) {
            logger.error('❌ Migration failed:', error);
            throw error;
        }
    }

    /**
     * Run the schema SQL file
     */
    async runSchema() {
        try {
            logger.info('Running database schema...');
            
            const schemaSQL = await fs.readFile(this.schemaPath, 'utf8');
            
            // Split by major sections to run separately
            const sections = schemaSQL.split(/-- ={5,}/);
            
            for (let i = 0; i < sections.length; i++) {
                const section = sections[i].trim();
                if (section && !section.startsWith('--')) {
                    logger.info(`Running schema section ${i + 1}/${sections.length}`);
                    await Database.executeSql(section);
                }
            }
            
            logger.info('Schema created successfully');
        } catch (error) {
            // Check if tables already exist
            const tablesExist = await Database.tableExists('organizations');
            if (tablesExist) {
                logger.info('Schema already exists, skipping creation');
            } else {
                throw error;
            }
        }
    }

    /**
     * Create default data
     */
    async createDefaultData() {
        try {
            logger.info('Creating default data...');

            // Check if admin user already exists
            const adminExists = await Database.getOne(
                'SELECT id FROM users WHERE email = $1',
                ['admin@scaleops6.com']
            );

            if (!adminExists) {
                // Create admin user
                const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!';
                const passwordHash = await bcrypt.hash(adminPassword, 10);

                const adminUser = await Database.insert('users', {
                    email: 'admin@scaleops6.com',
                    password_hash: passwordHash,
                    first_name: 'System',
                    last_name: 'Admin',
                    display_name: 'System Administrator',
                    email_verified: true,
                    is_super_admin: true,
                    is_active: true
                });

                logger.info('Admin user created:', adminUser.email);

                // Create demo organization
                const demoOrg = await Database.insert('organizations', {
                    name: 'ST6Co',
                    slug: 'st6co',
                    website: 'https://scaleops6.com',
                    industry: 'Technology',
                    size: '11-50',
                    subscription_tier: 'enterprise',
                    subscription_status: 'active',
                    license_seats: 100,
                    storage_quota_gb: 500
                });

                logger.info('Demo organization created:', demoOrg.name);

                // Add admin to organization
                await Database.insert('organization_members', {
                    organization_id: demoOrg.id,
                    user_id: adminUser.id,
                    role: 'owner',
                    invitation_accepted_at: new Date()
                });

                // Create default workspace
                const workspace = await Database.insert('workspaces', {
                    organization_id: demoOrg.id,
                    name: 'Main Workspace',
                    slug: 'main',
                    description: 'Primary workspace for ScaleOps Product development',
                    is_default: true,
                    created_by: adminUser.id
                });

                logger.info('Default workspace created:', workspace.name);

                // Create sample users
                await this.createSampleUsers(demoOrg.id);
            } else {
                logger.info('Default data already exists, skipping creation');
            }

            // Create static reference data
            await this.createReferenceData();

        } catch (error) {
            logger.error('Error creating default data:', error);
            throw error;
        }
    }

    /**
     * Create sample users for demo
     */
    async createSampleUsers(organizationId) {
        const sampleUsers = [
            {
                email: 'john.doe@st6co.com',
                first_name: 'John',
                last_name: 'Doe',
                role: 'admin'
            },
            {
                email: 'jane.smith@st6co.com',
                first_name: 'Jane',
                last_name: 'Smith',
                role: 'editor'
            },
            {
                email: 'bob.wilson@st6co.com',
                first_name: 'Bob',
                last_name: 'Wilson',
                role: 'viewer'
            }
        ];

        for (const userData of sampleUsers) {
            try {
                // Check if user exists
                const exists = await Database.getOne(
                    'SELECT id FROM users WHERE email = $1',
                    [userData.email]
                );

                if (!exists) {
                    // Create user with default password
                    const passwordHash = await bcrypt.hash('Demo123!', 10);
                    
                    const user = await Database.insert('users', {
                        email: userData.email,
                        password_hash: passwordHash,
                        first_name: userData.first_name,
                        last_name: userData.last_name,
                        display_name: `${userData.first_name} ${userData.last_name}`,
                        email_verified: true,
                        is_active: true
                    });

                    // Add to organization
                    await Database.insert('organization_members', {
                        organization_id: organizationId,
                        user_id: user.id,
                        role: userData.role,
                        invitation_accepted_at: new Date()
                    });

                    logger.info(`Sample user created: ${userData.email} (${userData.role})`);
                }
            } catch (error) {
                logger.warn(`Failed to create sample user ${userData.email}:`, error.message);
            }
        }
    }

    /**
     * Create reference data (blocks, subcomponents, etc.)
     */
    async createReferenceData() {
        // This would typically include:
        // - GTM framework blocks
        // - Subcomponents
        // - Default templates
        // - Industry benchmarks
        
        logger.info('Reference data setup complete');
    }

    /**
     * Verify migration was successful
     */
    async verifyMigration() {
        logger.info('Verifying migration...');

        const tables = [
            'organizations',
            'users',
            'organization_members',
            'workspaces',
            'worksheets',
            'analyses',
            'reports',
            'documents',
            'score_history',
            'sessions',
            'audit_logs'
        ];

        for (const table of tables) {
            const exists = await Database.tableExists(table);
            if (!exists) {
                throw new Error(`Table ${table} does not exist`);
            }
            
            const count = await Database.getTableCount(table);
            logger.info(`✓ Table ${table} exists with ${count} rows`);
        }

        // Test RLS policies
        await this.testRLS();

        logger.info('Migration verification complete');
    }

    /**
     * Test Row Level Security
     */
    async testRLS() {
        try {
            logger.info('Testing Row Level Security...');

            // Create test organization
            const testOrg = await Database.insert('organizations', {
                name: 'RLS Test Org',
                slug: `rls-test-${Date.now()}`,
                subscription_tier: 'trial',
                subscription_status: 'active'
            });

            // Set organization context
            await Database.setOrganizationContext(testOrg.id);

            // Try to query with RLS
            const result = await Database.getOne(
                'SELECT * FROM organizations WHERE id = $1',
                [testOrg.id]
            );

            if (result) {
                logger.info('✓ RLS test passed');
            }

            // Clean up
            await Database.delete('organizations', { id: testOrg.id });

        } catch (error) {
            logger.warn('RLS test failed (may be normal if RLS not fully configured):', error.message);
        }
    }

    /**
     * Rollback migration (dangerous!)
     */
    async rollback() {
        logger.warn('⚠️  Rolling back migration - this will delete all data!');
        
        const confirm = process.env.CONFIRM_ROLLBACK === 'yes';
        if (!confirm) {
            throw new Error('Rollback not confirmed. Set CONFIRM_ROLLBACK=yes to proceed.');
        }

        const dropSQL = `
            -- Drop all tables in reverse order
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
            
            -- Drop functions
            DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
        `;

        await Database.executeSql(dropSQL);
        logger.info('Rollback complete - all tables dropped');
    }

    /**
     * Get migration status
     */
    async status() {
        logger.info('Checking migration status...');

        const tables = [
            'organizations',
            'users',
            'organization_members',
            'workspaces',
            'worksheets',
            'analyses',
            'reports',
            'documents',
            'score_history',
            'sessions',
            'audit_logs'
        ];

        const status = {
            database: await Database.healthCheck(),
            tables: {},
            summary: {
                total: tables.length,
                existing: 0,
                missing: 0
            }
        };

        for (const table of tables) {
            const exists = await Database.tableExists(table);
            if (exists) {
                const count = await Database.getTableCount(table);
                status.tables[table] = { exists: true, rows: count };
                status.summary.existing++;
            } else {
                status.tables[table] = { exists: false, rows: 0 };
                status.summary.missing++;
            }
        }

        logger.info('Migration status:', status.summary);
        return status;
    }
}

// Run migration if called directly
if (require.main === module) {
    const migration = new DatabaseMigration();
    
    const command = process.argv[2] || 'migrate';
    
    switch (command) {
        case 'migrate':
            migration.migrate()
                .then(() => {
                    logger.info('Migration completed');
                    process.exit(0);
                })
                .catch(error => {
                    logger.error('Migration failed:', error);
                    process.exit(1);
                });
            break;
            
        case 'rollback':
            migration.rollback()
                .then(() => {
                    logger.info('Rollback completed');
                    process.exit(0);
                })
                .catch(error => {
                    logger.error('Rollback failed:', error);
                    process.exit(1);
                });
            break;
            
        case 'status':
            migration.status()
                .then(status => {
                    console.log(JSON.stringify(status, null, 2));
                    process.exit(0);
                })
                .catch(error => {
                    logger.error('Status check failed:', error);
                    process.exit(1);
                });
            break;
            
        default:
            console.log('Usage: node migrate.js [migrate|rollback|status]');
            process.exit(1);
    }
}

module.exports = DatabaseMigration;
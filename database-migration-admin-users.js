/**
 * Database Migration: Admin Dashboard User Management
 * 
 * This migration adds tables for:
 * - User accounts with Firebase Auth integration
 * - VC-to-startup assignments
 * - User sessions
 * - Admin audit logs
 * - Stripe event tracking
 * - User tags and notes
 * 
 * SAFE MODE: Uses IF NOT EXISTS to prevent breaking existing tables
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class AdminUserMigration {
    constructor() {
        this.dbPath = path.join(__dirname, 'scaleops6.db');
        this.db = new sqlite3.Database(this.dbPath);
    }

    async runMigration() {
        console.log('🚀 Starting Admin Dashboard Database Migration...\n');

        try {
            // Run all migrations in sequence
            await this.createUsersTable();
            await this.createVCAssignmentsTable();
            await this.createUserSessionsTable();
            await this.createAdminActionsTable();
            await this.createStripeEventsTable();
            await this.createUserTagsTable();
            await this.createAdminNotesTable();

            console.log('\n✅ Migration completed successfully!');
            console.log('📊 All admin dashboard tables created.');
            
            // Verify tables
            await this.verifyTables();
            
        } catch (error) {
            console.error('❌ Migration failed:', error);
            throw error;
        } finally {
            this.db.close();
        }
    }

    createUsersTable() {
        return new Promise((resolve, reject) => {
            console.log('📝 Extending existing users table with new columns...');
            
            // Check which columns exist
            this.db.all("PRAGMA table_info(users)", [], (err, columns) => {
                if (err) {
                    reject(err);
                    return;
                }

                const existingColumns = columns.map(c => c.name);
                const alterStatements = [];

                // Add missing columns
                if (!existingColumns.includes('firebase_uid')) {
                    alterStatements.push('ALTER TABLE users ADD COLUMN firebase_uid TEXT UNIQUE');
                }
                if (!existingColumns.includes('full_name')) {
                    alterStatements.push('ALTER TABLE users ADD COLUMN full_name TEXT');
                }
                if (!existingColumns.includes('tier')) {
                    alterStatements.push('ALTER TABLE users ADD COLUMN tier INTEGER DEFAULT 0');
                }
                if (!existingColumns.includes('subscription_status')) {
                    alterStatements.push("ALTER TABLE users ADD COLUMN subscription_status TEXT DEFAULT 'free'");
                }
                if (!existingColumns.includes('stripe_customer_id')) {
                    alterStatements.push('ALTER TABLE users ADD COLUMN stripe_customer_id TEXT');
                }
                if (!existingColumns.includes('last_login')) {
                    alterStatements.push('ALTER TABLE users ADD COLUMN last_login TIMESTAMP');
                }
                if (!existingColumns.includes('is_active')) {
                    alterStatements.push('ALTER TABLE users ADD COLUMN is_active BOOLEAN DEFAULT 1');
                }
                if (!existingColumns.includes('metadata')) {
                    alterStatements.push('ALTER TABLE users ADD COLUMN metadata TEXT');
                }

                // Execute ALTER statements sequentially
                const executeAlters = async () => {
                    for (const stmt of alterStatements) {
                        await new Promise((res, rej) => {
                            this.db.run(stmt, (err) => {
                                if (err) {
                                    console.log(`  ⚠️ Column may already exist: ${err.message}`);
                                }
                                res(); // Continue even if column exists
                            });
                        });
                    }
                };

                executeAlters()
                    .then(() => {
                        // Create indexes
                        const indexSql = `
                            CREATE INDEX IF NOT EXISTS idx_users_firebase_uid ON users(firebase_uid);
                            CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
                            CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
                            CREATE INDEX IF NOT EXISTS idx_users_tier ON users(tier);
                            CREATE INDEX IF NOT EXISTS idx_users_active ON users(is_active);
                        `;
                        
                        this.db.exec(indexSql, (err) => {
                            if (err) {
                                console.error('  ⚠️ Index creation warning:', err.message);
                            }
                            console.log(`  ✅ Users table extended (${alterStatements.length} columns added)`);
                            resolve();
                        });
                    })
                    .catch(reject);
            });
        });
    }

    createVCAssignmentsTable() {
        return new Promise((resolve, reject) => {
            console.log('📝 Creating vc_assignments table...');
            
            const sql = `
                CREATE TABLE IF NOT EXISTS vc_assignments (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    vc_user_id INTEGER NOT NULL,
                    startup_user_id INTEGER NOT NULL,
                    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    assigned_by INTEGER,
                    notes TEXT,
                    is_active BOOLEAN DEFAULT 1,
                    FOREIGN KEY (vc_user_id) REFERENCES users(id) ON DELETE CASCADE,
                    FOREIGN KEY (startup_user_id) REFERENCES users(id) ON DELETE CASCADE,
                    FOREIGN KEY (assigned_by) REFERENCES users(id),
                    UNIQUE(vc_user_id, startup_user_id)
                );

                CREATE INDEX IF NOT EXISTS idx_vc_assignments_vc ON vc_assignments(vc_user_id);
                CREATE INDEX IF NOT EXISTS idx_vc_assignments_startup ON vc_assignments(startup_user_id);
                CREATE INDEX IF NOT EXISTS idx_vc_assignments_active ON vc_assignments(is_active);
            `;

            this.db.exec(sql, (err) => {
                if (err) {
                    console.error('  ❌ Failed to create vc_assignments table:', err);
                    reject(err);
                } else {
                    console.log('  ✅ VC assignments table created successfully');
                    resolve();
                }
            });
        });
    }

    createUserSessionsTable() {
        return new Promise((resolve, reject) => {
            console.log('📝 Creating user_sessions table...');
            
            const sql = `
                CREATE TABLE IF NOT EXISTS user_sessions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER NOT NULL,
                    session_token TEXT UNIQUE NOT NULL,
                    firebase_token TEXT,
                    ip_address TEXT,
                    user_agent TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    expires_at TIMESTAMP NOT NULL,
                    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    is_active BOOLEAN DEFAULT 1,
                    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
                );

                CREATE INDEX IF NOT EXISTS idx_sessions_user ON user_sessions(user_id);
                CREATE INDEX IF NOT EXISTS idx_sessions_token ON user_sessions(session_token);
                CREATE INDEX IF NOT EXISTS idx_sessions_active ON user_sessions(is_active);
                CREATE INDEX IF NOT EXISTS idx_sessions_expires ON user_sessions(expires_at);
            `;

            this.db.exec(sql, (err) => {
                if (err) {
                    console.error('  ❌ Failed to create user_sessions table:', err);
                    reject(err);
                } else {
                    console.log('  ✅ User sessions table created successfully');
                    resolve();
                }
            });
        });
    }

    createAdminActionsTable() {
        return new Promise((resolve, reject) => {
            console.log('📝 Creating admin_actions table...');
            
            const sql = `
                CREATE TABLE IF NOT EXISTS admin_actions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    admin_user_id INTEGER NOT NULL,
                    action_type TEXT NOT NULL,
                    target_user_id INTEGER,
                    action_details TEXT,
                    ip_address TEXT,
                    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (admin_user_id) REFERENCES users(id),
                    FOREIGN KEY (target_user_id) REFERENCES users(id)
                );

                CREATE INDEX IF NOT EXISTS idx_admin_actions_admin ON admin_actions(admin_user_id);
                CREATE INDEX IF NOT EXISTS idx_admin_actions_target ON admin_actions(target_user_id);
                CREATE INDEX IF NOT EXISTS idx_admin_actions_type ON admin_actions(action_type);
                CREATE INDEX IF NOT EXISTS idx_admin_actions_timestamp ON admin_actions(timestamp);
            `;

            this.db.exec(sql, (err) => {
                if (err) {
                    console.error('  ❌ Failed to create admin_actions table:', err);
                    reject(err);
                } else {
                    console.log('  ✅ Admin actions table created successfully');
                    resolve();
                }
            });
        });
    }

    createStripeEventsTable() {
        return new Promise((resolve, reject) => {
            console.log('📝 Creating stripe_events table...');
            
            const sql = `
                CREATE TABLE IF NOT EXISTS stripe_events (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    stripe_event_id TEXT UNIQUE NOT NULL,
                    event_type TEXT NOT NULL,
                    user_id INTEGER,
                    customer_id TEXT,
                    subscription_id TEXT,
                    event_data TEXT,
                    processed BOOLEAN DEFAULT 0,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    processed_at TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users(id)
                );

                CREATE INDEX IF NOT EXISTS idx_stripe_events_user ON stripe_events(user_id);
                CREATE INDEX IF NOT EXISTS idx_stripe_events_type ON stripe_events(event_type);
                CREATE INDEX IF NOT EXISTS idx_stripe_events_processed ON stripe_events(processed);
                CREATE INDEX IF NOT EXISTS idx_stripe_events_customer ON stripe_events(customer_id);
            `;

            this.db.exec(sql, (err) => {
                if (err) {
                    console.error('  ❌ Failed to create stripe_events table:', err);
                    reject(err);
                } else {
                    console.log('  ✅ Stripe events table created successfully');
                    resolve();
                }
            });
        });
    }

    createUserTagsTable() {
        return new Promise((resolve, reject) => {
            console.log('📝 Creating user_tags table...');
            
            const sql = `
                CREATE TABLE IF NOT EXISTS user_tags (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER NOT NULL,
                    tag TEXT NOT NULL,
                    created_by INTEGER,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                    FOREIGN KEY (created_by) REFERENCES users(id),
                    UNIQUE(user_id, tag)
                );

                CREATE INDEX IF NOT EXISTS idx_user_tags_user ON user_tags(user_id);
                CREATE INDEX IF NOT EXISTS idx_user_tags_tag ON user_tags(tag);
            `;

            this.db.exec(sql, (err) => {
                if (err) {
                    console.error('  ❌ Failed to create user_tags table:', err);
                    reject(err);
                } else {
                    console.log('  ✅ User tags table created successfully');
                    resolve();
                }
            });
        });
    }

    createAdminNotesTable() {
        return new Promise((resolve, reject) => {
            console.log('📝 Creating admin_notes table...');
            
            const sql = `
                CREATE TABLE IF NOT EXISTS admin_notes (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER NOT NULL,
                    note TEXT NOT NULL,
                    created_by INTEGER NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    is_pinned BOOLEAN DEFAULT 0,
                    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                    FOREIGN KEY (created_by) REFERENCES users(id)
                );

                CREATE INDEX IF NOT EXISTS idx_admin_notes_user ON admin_notes(user_id);
                CREATE INDEX IF NOT EXISTS idx_admin_notes_pinned ON admin_notes(is_pinned);
            `;

            this.db.exec(sql, (err) => {
                if (err) {
                    console.error('  ❌ Failed to create admin_notes table:', err);
                    reject(err);
                } else {
                    console.log('  ✅ Admin notes table created successfully');
                    resolve();
                }
            });
        });
    }

    verifyTables() {
        return new Promise((resolve, reject) => {
            console.log('\n🔍 Verifying created tables...');
            
            const sql = `
                SELECT name FROM sqlite_master 
                WHERE type='table' 
                AND name IN ('users', 'vc_assignments', 'user_sessions', 'admin_actions', 'stripe_events', 'user_tags', 'admin_notes')
                ORDER BY name;
            `;

            this.db.all(sql, (err, rows) => {
                if (err) {
                    console.error('  ❌ Verification failed:', err);
                    reject(err);
                } else {
                    console.log('  ✅ Tables verified:');
                    rows.forEach(row => {
                        console.log(`     - ${row.name}`);
                    });
                    resolve();
                }
            });
        });
    }
}

// Run migration if executed directly
if (require.main === module) {
    const migration = new AdminUserMigration();
    migration.runMigration()
        .then(() => {
            console.log('\n🎉 Migration complete! Database is ready for admin dashboard.');
            process.exit(0);
        })
        .catch((error) => {
            console.error('\n💥 Migration failed:', error);
            process.exit(1);
        });
}

module.exports = AdminUserMigration;
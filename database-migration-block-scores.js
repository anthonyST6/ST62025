const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class BlockScoresMigration {
    constructor() {
        this.dbPath = path.join(__dirname, 'scaleops6.db');
        this.db = new sqlite3.Database(this.dbPath);
    }

    async migrate() {
        console.log('🔄 Starting Block Scores Migration...');
        
        try {
            // Add status column to score_history
            await this.addColumn('score_history', 'status', 'TEXT DEFAULT "Pending"');
            
            // Add analysis_event_type for yellow markers
            await this.addColumn('score_history', 'analysis_event_type', 'TEXT DEFAULT "standard"');
            
            // Create subcomponent_status table
            await this.createSubcomponentStatusTable();
            
            // Create block_scores_cache table
            await this.createBlockScoresCacheTable();
            
            // Populate initial data
            await this.populateInitialData();
            
            console.log('✅ Migration completed successfully!');
        } catch (error) {
            console.error('❌ Migration failed:', error);
            throw error;
        }
    }

    addColumn(table, column, definition) {
        return new Promise((resolve, reject) => {
            const sql = `ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`;
            this.db.run(sql, (err) => {
                if (err && !err.message.includes('duplicate column')) {
                    console.error(`Error adding column ${column}:`, err);
                    reject(err);
                } else {
                    console.log(`✅ Added column ${column} to ${table}`);
                    resolve();
                }
            });
        });
    }

    createSubcomponentStatusTable() {
        return new Promise((resolve, reject) => {
            const sql = `
                CREATE TABLE IF NOT EXISTS subcomponent_status (
                    subcomponent_id TEXT PRIMARY KEY,
                    status TEXT DEFAULT 'Pending',
                    first_analysis_date TIMESTAMP,
                    last_analysis_date TIMESTAMP,
                    analysis_count INTEGER DEFAULT 0,
                    latest_score INTEGER,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `;
            this.db.run(sql, (err) => {
                if (err) {
                    console.error('Error creating subcomponent_status table:', err);
                    reject(err);
                } else {
                    console.log('✅ Created subcomponent_status table');
                    resolve();
                }
            });
        });
    }

    createBlockScoresCacheTable() {
        return new Promise((resolve, reject) => {
            const sql = `
                CREATE TABLE IF NOT EXISTS block_scores_cache (
                    block_id INTEGER PRIMARY KEY,
                    average_score REAL,
                    completed_count INTEGER,
                    total_count INTEGER DEFAULT 6,
                    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `;
            this.db.run(sql, (err) => {
                if (err) {
                    console.error('Error creating block_scores_cache table:', err);
                    reject(err);
                } else {
                    console.log('✅ Created block_scores_cache table');
                    resolve();
                }
            });
        });
    }

    async populateInitialData() {
        console.log('📝 Populating initial data for all 96 subcomponents...');
        
        // Initialize all 96 subcomponents as "Pending"
        for (let blockId = 1; blockId <= 16; blockId++) {
            for (let subId = 1; subId <= 6; subId++) {
                const subcomponentId = `${blockId}-${subId}`;
                await this.initializeSubcomponentStatus(subcomponentId);
            }
            
            // Initialize block cache
            await this.initializeBlockCache(blockId);
        }
        
        console.log('✅ Initialized all 96 subcomponents and 16 blocks');
    }

    initializeSubcomponentStatus(subcomponentId) {
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT OR IGNORE INTO subcomponent_status 
                (subcomponent_id, status, analysis_count, updated_at)
                VALUES (?, 'Pending', 0, CURRENT_TIMESTAMP)
            `;
            this.db.run(sql, [subcomponentId], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }

    initializeBlockCache(blockId) {
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT OR IGNORE INTO block_scores_cache 
                (block_id, average_score, completed_count, total_count, last_updated)
                VALUES (?, NULL, 0, 6, CURRENT_TIMESTAMP)
            `;
            this.db.run(sql, [blockId], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.db.close((err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }
}

// Run migration if executed directly
if (require.main === module) {
    const migration = new BlockScoresMigration();
    migration.migrate()
        .then(() => migration.close())
        .then(() => {
            console.log('🎉 Migration completed successfully!');
            process.exit(0);
        })
        .catch((err) => {
            console.error('❌ Migration failed:', err);
            process.exit(1);
        });
}

module.exports = BlockScoresMigration;
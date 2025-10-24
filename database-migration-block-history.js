const sqlite3 = require('sqlite3').verbose();
const path = require('path');

/**
 * Database Migration: Add Block Score History Tracking
 * 
 * This migration adds SSOT-compliant block score history tracking:
 * - Creates block_score_history table
 * - Stores snapshots when block scores change
 * - Enables real historical data for graphs
 */

class BlockHistoryMigration {
    constructor() {
        this.dbPath = path.join(__dirname, 'scaleops6.db');
        this.db = new sqlite3.Database(this.dbPath);
    }

    async migrate() {
        console.log('\n🔄 Starting Block Score History Migration...\n');

        try {
            // Create block_score_history table
            await this.createBlockHistoryTable();
            
            // Seed initial history from current state
            await this.seedInitialHistory();
            
            console.log('\n✅ Block Score History Migration Complete!\n');
            return true;
        } catch (error) {
            console.error('\n❌ Migration Failed:', error);
            throw error;
        } finally {
            await this.close();
        }
    }

    createBlockHistoryTable() {
        return new Promise((resolve, reject) => {
            const query = `
                CREATE TABLE IF NOT EXISTS block_score_history (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    block_id INTEGER NOT NULL,
                    score REAL NOT NULL,
                    completed_count INTEGER NOT NULL DEFAULT 0,
                    total_count INTEGER NOT NULL DEFAULT 6,
                    trigger_subcomponent_id TEXT,
                    trigger_event_type TEXT DEFAULT 'analysis_completed',
                    change_description TEXT,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    
                    -- Indexes for efficient queries
                    FOREIGN KEY (block_id) REFERENCES blocks(id)
                );
                
                CREATE INDEX IF NOT EXISTS idx_block_history_block_date 
                ON block_score_history(block_id, created_at DESC);
                
                CREATE INDEX IF NOT EXISTS idx_block_history_trigger 
                ON block_score_history(trigger_subcomponent_id);
            `;

            this.db.exec(query, (err) => {
                if (err) {
                    console.error('❌ Error creating block_score_history table:', err);
                    reject(err);
                } else {
                    console.log('✅ Created block_score_history table with indexes');
                    resolve();
                }
            });
        });
    }

    seedInitialHistory() {
        return new Promise((resolve, reject) => {
            console.log('📊 Seeding initial block history from current state...');
            
            // Get current block scores from cache
            const query = `
                INSERT INTO block_score_history 
                (block_id, score, completed_count, total_count, trigger_event_type, change_description, created_at)
                SELECT 
                    block_id,
                    COALESCE(average_score, 0) as score,
                    COALESCE(completed_count, 0) as completed_count,
                    6 as total_count,
                    'baseline' as trigger_event_type,
                    'Initial baseline from migration' as change_description,
                    COALESCE(last_updated, CURRENT_TIMESTAMP) as created_at
                FROM block_scores_cache
                WHERE average_score IS NOT NULL
            `;

            this.db.run(query, [], function(err) {
                if (err) {
                    console.error('❌ Error seeding initial history:', err);
                    reject(err);
                } else {
                    console.log(`✅ Seeded ${this.changes} initial block history entries`);
                    resolve();
                }
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.db.close((err) => {
                if (err) {
                    console.error('Error closing database:', err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

// Run migration if executed directly
if (require.main === module) {
    const migration = new BlockHistoryMigration();
    migration.migrate()
        .then(() => {
            console.log('Migration completed successfully');
            process.exit(0);
        })
        .catch((error) => {
            console.error('Migration failed:', error);
            process.exit(1);
        });
}

module.exports = BlockHistoryMigration;
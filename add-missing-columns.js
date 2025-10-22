const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'scaleops6.db');
const db = new sqlite3.Database(dbPath);

console.log('🔧 Adding missing columns to score_history table...');

const alterCommands = [
    `ALTER TABLE score_history ADD COLUMN subcomponent_name TEXT`,
    `ALTER TABLE score_history ADD COLUMN agent_name TEXT`,
    `ALTER TABLE score_history ADD COLUMN block_name TEXT`,
    `ALTER TABLE score_history ADD COLUMN dimension_scores TEXT`,
    `ALTER TABLE score_history ADD COLUMN strengths TEXT`,
    `ALTER TABLE score_history ADD COLUMN weaknesses TEXT`,
    `ALTER TABLE score_history ADD COLUMN recommendations TEXT`,
    `ALTER TABLE score_history ADD COLUMN answers TEXT`,
    `ALTER TABLE score_history ADD COLUMN session_id TEXT`,
    `ALTER TABLE score_history ADD COLUMN user_id TEXT DEFAULT 'default'`,
    `ALTER TABLE score_history ADD COLUMN block_id INTEGER`,
    `ALTER TABLE score_history ADD COLUMN overall_score INTEGER`,
    `ALTER TABLE score_history ADD COLUMN executive_summary TEXT`,
    `ALTER TABLE score_history ADD COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP`
];

let completed = 0;
let errors = 0;

alterCommands.forEach((sql, index) => {
    db.run(sql, (err) => {
        if (err) {
            // Ignore "duplicate column" errors
            if (err.message.includes('duplicate column')) {
                console.log(`ℹ️  Column ${index + 1} already exists`);
            } else {
                console.error(`❌ Error adding column ${index + 1}:`, err.message);
                errors++;
            }
        } else {
            console.log(`✅ Column ${index + 1} added successfully`);
        }
        completed++;
        if (completed === alterCommands.length) {
            if (errors === 0) {
                console.log('\n🎉 All columns added successfully!');
            } else {
                console.log(`\n⚠️  Completed with ${errors} errors (may be expected if columns already exist)`);
            }
            db.close();
            process.exit(0);
        }
    });
});
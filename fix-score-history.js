// Fix the score_history table schema issue
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'scaleops6.db'));

console.log('Fixing score_history table...\n');

// First, check current schema
db.all("PRAGMA table_info(score_history)", (err, columns) => {
    if (err) {
        console.error('Error checking table:', err);
        return;
    }
    
    console.log('Current columns:', columns.map(c => c.name).join(', '));
    
    // Drop and recreate the table with correct schema
    db.run("DROP TABLE IF EXISTS score_history", (err) => {
        if (err) {
            console.error('Error dropping table:', err);
            return;
        }
        
        console.log('✅ Dropped old score_history table');
        
        // Create new table without the problematic column
        db.run(`
            CREATE TABLE score_history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                block_id INTEGER NOT NULL,
                subcomponent_id TEXT,
                old_score INTEGER,
                new_score INTEGER,
                change_type TEXT,
                change_reason TEXT,
                metadata TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `, (err) => {
            if (err) {
                console.error('Error creating table:', err);
                return;
            }
            
            console.log('✅ Created new score_history table with correct schema');
            
            // Test by inserting a sample record
            db.run(`
                INSERT INTO score_history (user_id, block_id, subcomponent_id, old_score, new_score, change_type, change_reason, metadata)
                VALUES (1, 1, '1-1', 85, 67, 'analysis', 'AI Problem Statement Analysis', '{"source": "test"}')
            `, (err) => {
                if (err) {
                    console.error('Error inserting test record:', err);
                } else {
                    console.log('✅ Successfully inserted test record');
                    
                    // Verify the record
                    db.all("SELECT * FROM score_history", (err, rows) => {
                        if (err) {
                            console.error('Error reading records:', err);
                        } else {
                            console.log('\n📊 Score history records:');
                            rows.forEach(row => {
                                console.log(`  - Block ${row.block_id}: ${row.old_score}% → ${row.new_score}% (${row.change_reason})`);
                            });
                        }
                        
                        db.close();
                        console.log('\n✅ Score history table fixed!');
                    });
                }
            });
        });
    });
});
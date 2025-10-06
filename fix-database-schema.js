const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'scaleops6.db');
const db = new sqlite3.Database(dbPath);

console.log('Fixing database schema...\n');

// Function to add column if it doesn't exist
function addColumnIfNotExists(tableName, columnName, columnDef, callback) {
    db.all(`PRAGMA table_info(${tableName})`, (err, rows) => {
        if (err) {
            console.error(`Error checking ${tableName} structure:`, err);
            callback(err);
            return;
        }
        
        const columnExists = rows.some(row => row.name === columnName);
        
        if (!columnExists) {
            const query = `ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnDef}`;
            db.run(query, (err) => {
                if (err) {
                    console.error(`Error adding column ${columnName}:`, err);
                    callback(err);
                } else {
                    console.log(`✓ Added column ${columnName} to ${tableName}`);
                    callback(null);
                }
            });
        } else {
            console.log(`- Column ${columnName} already exists in ${tableName}`);
            callback(null);
        }
    });
}

// Add missing columns to score_history table
const columnsToAdd = [
    { name: 'subcomponent_name', def: 'TEXT' },
    { name: 'agent_name', def: 'TEXT' },
    { name: 'block_name', def: 'TEXT' },
    { name: 'overall_score', def: 'INTEGER' },
    { name: 'dimension_scores', def: 'TEXT' },
    { name: 'strengths', def: 'TEXT' },
    { name: 'weaknesses', def: 'TEXT' },
    { name: 'recommendations', def: 'TEXT' },
    { name: 'answers', def: 'TEXT' },
    { name: 'session_id', def: 'TEXT' },
    { name: 'timestamp', def: 'DATETIME DEFAULT CURRENT_TIMESTAMP' }
];

let completed = 0;
const total = columnsToAdd.length;

columnsToAdd.forEach((column, index) => {
    setTimeout(() => {
        addColumnIfNotExists('score_history', column.name, column.def, (err) => {
            completed++;
            if (completed === total) {
                console.log('\n✅ Database schema fix complete!');
                
                // Verify the updated structure
                console.log('\nVerifying updated table structure...');
                db.all("PRAGMA table_info(score_history)", (err, rows) => {
                    if (err) {
                        console.error('Error checking updated structure:', err);
                    } else {
                        console.log('\nUpdated score_history columns:');
                        console.log('--------------------------------');
                        rows.forEach(row => {
                            console.log(`${row.cid}: ${row.name} (${row.type})`);
                        });
                    }
                    db.close();
                });
            }
        });
    }, index * 100); // Small delay between operations
});
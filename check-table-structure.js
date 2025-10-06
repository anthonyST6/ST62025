const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'scaleops6.db');
const db = new sqlite3.Database(dbPath);

console.log('Checking score_history table structure...\n');

db.all("PRAGMA table_info(score_history)", (err, rows) => {
    if (err) {
        console.error('Error checking table structure:', err);
    } else if (rows.length === 0) {
        console.log('Table score_history does not exist!');
    } else {
        console.log('score_history table columns:');
        console.log('----------------------------');
        rows.forEach(row => {
            console.log(`${row.cid}: ${row.name} (${row.type}) ${row.notnull ? 'NOT NULL' : 'NULL'} ${row.pk ? 'PRIMARY KEY' : ''}`);
        });
    }
    
    console.log('\n\nChecking if table exists at all...');
    db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
        if (err) {
            console.error('Error listing tables:', err);
        } else {
            console.log('Existing tables:', tables.map(t => t.name).join(', '));
        }
        db.close();
    });
});
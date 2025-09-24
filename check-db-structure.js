const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'scaleops6.db'));

console.log('Checking database structure...\n');

// Check the structure of activity_log table
db.all(`PRAGMA table_info(activity_log)`, [], (err, columns) => {
    if (err) {
        console.error('Error checking activity_log structure:', err);
    } else {
        console.log('activity_log table columns:');
        columns.forEach(col => {
            console.log(`  - ${col.name} (${col.type})`);
        });
    }
    
    // Now get actual activity log entries
    console.log('\n--- Fetching activity log entries ---\n');
    
    db.all(`
        SELECT * FROM activity_log 
        WHERE user_id = 1 
        ORDER BY created_at DESC 
        LIMIT 10
    `, [], (err, entries) => {
        if (err) {
            console.error('Error fetching activity log:', err);
        } else {
            console.log(`Found ${entries.length} activity log entries\n`);
            
            entries.forEach((entry, index) => {
                console.log(`Entry ${index + 1}:`);
                Object.keys(entry).forEach(key => {
                    if (key === 'metadata') {
                        try {
                            const metadata = JSON.parse(entry[key] || '{}');
                            console.log(`  ${key}: ${JSON.stringify(metadata, null, 2)}`);
                        } catch (e) {
                            console.log(`  ${key}: ${entry[key]}`);
                        }
                    } else {
                        console.log(`  ${key}: ${entry[key]}`);
                    }
                });
                console.log('');
            });
        }
        
        // Check worksheet_versions table
        console.log('\n--- Checking worksheet_versions ---\n');
        
        db.all(`
            SELECT * FROM worksheet_versions 
            WHERE user_id = 1 
            ORDER BY created_at DESC 
            LIMIT 5
        `, [], (err, worksheets) => {
            if (err) {
                console.error('Error fetching worksheets:', err);
            } else {
                console.log(`Found ${worksheets.length} worksheet versions\n`);
                
                worksheets.forEach((ws, index) => {
                    console.log(`Worksheet ${index + 1}:`);
                    console.log(`  Version: ${ws.version_number}`);
                    console.log(`  Created: ${new Date(ws.created_at).toLocaleString()}`);
                    
                    try {
                        const data = JSON.parse(ws.data);
                        console.log('  Data fields:');
                        Object.keys(data).forEach(key => {
                            const value = data[key] || '';
                            const preview = value.length > 80 ? value.substring(0, 80) + '...' : value;
                            console.log(`    ${key}: "${preview}"`);
                        });
                    } catch (e) {
                        console.log(`  Data: ${ws.data}`);
                    }
                    console.log('');
                });
            }
            
            db.close();
        });
    });
});
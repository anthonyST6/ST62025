const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'scaleops6.db'));

console.log('📊 Checking Database Table Structures...\n');

// Check score_history table structure
db.all(`PRAGMA table_info(score_history)`, [], (err, columns) => {
    if (err) {
        console.error('Error checking score_history table:', err);
    } else {
        console.log('score_history table columns:');
        columns.forEach(col => {
            console.log(`  - ${col.name} (${col.type})`);
        });
        console.log('');
    }
    
    // Check if we have any data
    db.get(`SELECT COUNT(*) as count FROM score_history`, [], (err, result) => {
        if (!err && result) {
            console.log(`Total rows in score_history: ${result.count}\n`);
        }
    });
    
    // Check subcomponent_scores table
    db.all(`PRAGMA table_info(subcomponent_scores)`, [], (err, columns) => {
        if (err) {
            console.error('Error checking subcomponent_scores table:', err);
        } else {
            console.log('subcomponent_scores table columns:');
            columns.forEach(col => {
                console.log(`  - ${col.name} (${col.type})`);
            });
            console.log('');
        }
        
        // Check if we have any data
        db.get(`SELECT COUNT(*) as count FROM subcomponent_scores`, [], (err, result) => {
            if (!err && result) {
                console.log(`Total rows in subcomponent_scores: ${result.count}\n`);
            }
        });
        
        // Check worksheet_versions table
        db.all(`PRAGMA table_info(worksheet_versions)`, [], (err, columns) => {
            if (err) {
                console.error('Error checking worksheet_versions table:', err);
            } else if (columns && columns.length > 0) {
                console.log('worksheet_versions table columns:');
                columns.forEach(col => {
                    console.log(`  - ${col.name} (${col.type})`);
                });
                console.log('');
                
                // Check if we have any data
                db.get(`SELECT COUNT(*) as count FROM worksheet_versions`, [], (err, result) => {
                    if (!err && result) {
                        console.log(`Total rows in worksheet_versions: ${result.count}\n`);
                    }
                });
            } else {
                console.log('worksheet_versions table does not exist\n');
            }
            
            // Check activity_log table
            db.all(`PRAGMA table_info(activity_log)`, [], (err, columns) => {
                if (err) {
                    console.error('Error checking activity_log table:', err);
                } else if (columns && columns.length > 0) {
                    console.log('activity_log table columns:');
                    columns.forEach(col => {
                        console.log(`  - ${col.name} (${col.type})`);
                    });
                    console.log('');
                    
                    // Check if we have any score_update activities
                    db.all(`
                        SELECT 
                            id,
                            activity_type,
                            created_at,
                            metadata
                        FROM activity_log
                        WHERE user_id = 1
                            AND activity_type = 'score_update'
                        ORDER BY created_at DESC
                        LIMIT 5
                    `, [], (err, rows) => {
                        if (!err && rows && rows.length > 0) {
                            console.log(`Found ${rows.length} score_update activities:\n`);
                            rows.forEach((row, index) => {
                                console.log(`Activity ${index + 1}:`);
                                console.log(`  Time: ${new Date(row.created_at).toLocaleString()}`);
                                try {
                                    const metadata = JSON.parse(row.metadata || '{}');
                                    console.log(`  Score: ${metadata.score || 'N/A'}`);
                                    console.log(`  Subcomponent: ${metadata.subcomponent_id || 'N/A'}`);
                                } catch (e) {
                                    console.log(`  Metadata: ${row.metadata}`);
                                }
                                console.log('');
                            });
                        } else {
                            console.log('No score_update activities found\n');
                        }
                        
                        db.close();
                    });
                } else {
                    console.log('activity_log table does not exist\n');
                    db.close();
                }
            });
        });
    });
});
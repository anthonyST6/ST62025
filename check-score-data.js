const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'scaleops6.db'));

console.log('Checking score history and associated worksheet data...\n');

// First, get all score updates for user 1
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
    LIMIT 10
`, [], (err, scores) => {
    if (err) {
        console.error('Error fetching scores:', err);
        db.close();
        return;
    }
    
    console.log(`Found ${scores.length} score entries:\n`);
    
    scores.forEach((entry, index) => {
        console.log(`Entry ${index + 1}:`);
        console.log(`  Time: ${new Date(entry.created_at).toLocaleString()}`);
        
        // Parse metadata to see what was analyzed
        try {
            const metadata = JSON.parse(entry.metadata || '{}');
            if (metadata.score !== undefined) {
                console.log(`  Score: ${metadata.score}%`);
            }
            if (metadata.source) {
                console.log(`  Source: ${metadata.source}`);
            }
            if (metadata.subcomponent_id) {
                console.log(`  Subcomponent: ${metadata.subcomponent_id}`);
            }
        } catch (e) {
            console.log(`  Metadata: ${entry.metadata}`);
        }
        console.log('');
    });
    
    // Now check the worksheet_versions table to see what data was submitted
    console.log('\n--- Checking worksheet data for each version ---\n');
    
    db.all(`
        SELECT 
            id,
            version_number,
            data,
            created_at
        FROM worksheet_versions
        WHERE user_id = 1
            AND subcomponent_id = '1-1'
        ORDER BY created_at DESC
        LIMIT 5
    `, [], (err, worksheets) => {
        if (err) {
            console.error('Error fetching worksheets:', err);
            db.close();
            return;
        }
        
        console.log(`Found ${worksheets.length} worksheet versions:\n`);
        
        worksheets.forEach((worksheet, index) => {
            console.log(`Version ${worksheet.version_number} (${new Date(worksheet.created_at).toLocaleString()}):`);
            
            try {
                const data = JSON.parse(worksheet.data);
                
                // Show first 100 chars of each field to compare
                Object.keys(data).forEach(key => {
                    const value = data[key] || '';
                    const preview = value.length > 100 ? value.substring(0, 100) + '...' : value;
                    console.log(`  ${key}: "${preview}"`);
                });
            } catch (e) {
                console.log(`  Could not parse data: ${worksheet.data}`);
            }
            console.log('');
        });
        
        db.close();
        
        console.log('\n--- Analysis Complete ---');
        console.log('\nIf the worksheet data is different between versions, that explains the score difference.');
        console.log('If the data is the same, there might be randomness in the AI scoring logic.');
    });
});
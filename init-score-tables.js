// Initialize score persistence tables
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'scaleops6.db'));

console.log('Creating score persistence tables...');

// Create block_scores table
db.run(`
    CREATE TABLE IF NOT EXISTS block_scores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        block_id INTEGER NOT NULL,
        score INTEGER NOT NULL,
        trend TEXT DEFAULT 'stable',
        last_change DATETIME DEFAULT CURRENT_TIMESTAMP,
        source TEXT DEFAULT 'manual',
        metadata TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, block_id)
    )
`, (err) => {
    if (err) console.error('Error creating block_scores table:', err);
    else console.log('✅ block_scores table created');
});

// Create subcomponent_scores table
db.run(`
    CREATE TABLE IF NOT EXISTS subcomponent_scores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        block_id INTEGER NOT NULL,
        subcomponent_id TEXT NOT NULL,
        score INTEGER NOT NULL,
        source TEXT DEFAULT 'manual',
        analysis_data TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, subcomponent_id)
    )
`, (err) => {
    if (err) console.error('Error creating subcomponent_scores table:', err);
    else console.log('✅ subcomponent_scores table created');
});

// Create score_history table
db.run(`
    CREATE TABLE IF NOT EXISTS score_history (
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
    if (err) console.error('Error creating score_history table:', err);
    else console.log('✅ score_history table created');
});

// Initialize scores for ST6 user (ID 1) from test company data
const { testCompany } = require('./test-company');

setTimeout(() => {
    console.log('\nInitializing scores for ST6 user...');
    
    Object.entries(testCompany.blockScores).forEach(([blockId, data]) => {
        db.run(`
            INSERT INTO block_scores (user_id, block_id, score, trend, source, metadata)
            VALUES (?, ?, ?, ?, ?, ?)
            ON CONFLICT(user_id, block_id) 
            DO UPDATE SET 
                score = excluded.score,
                trend = excluded.trend,
                source = excluded.source,
                metadata = excluded.metadata,
                updated_at = CURRENT_TIMESTAMP
        `, [1, parseInt(blockId), data.score, data.trend, 'initial', JSON.stringify(data)], (err) => {
            if (err) console.error(`Error initializing block ${blockId}:`, err);
            else console.log(`✅ Block ${blockId}: ${data.score}%`);
        });
    });
    
    setTimeout(() => {
        console.log('\n✅ Database initialization complete!');
        db.close();
    }, 2000);
}, 1000);
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'scaleops6.db');
const db = new sqlite3.Database(dbPath);

console.log('🔧 Initializing missing database tables...');

// Create missing tables
const tables = [
    `CREATE TABLE IF NOT EXISTS analysis_sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT UNIQUE NOT NULL,
        subcomponent_id TEXT NOT NULL,
        user_id TEXT DEFAULT 'default',
        start_time DATETIME DEFAULT CURRENT_TIMESTAMP,
        end_time DATETIME,
        status TEXT DEFAULT 'in_progress',
        analysis_data TEXT
    )`,
    
    `CREATE TABLE IF NOT EXISTS workspace_answers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subcomponent_id TEXT NOT NULL,
        question_id TEXT NOT NULL,
        question_text TEXT,
        answer TEXT,
        answer_type TEXT DEFAULT 'text',
        metadata TEXT,
        session_id TEXT,
        user_id TEXT DEFAULT 'default',
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(subcomponent_id, question_id, session_id)
    )`,
    
    `CREATE TABLE IF NOT EXISTS expert_recommendations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subcomponent_id TEXT NOT NULL,
        recommendation_type TEXT DEFAULT 'strategic',
        title TEXT NOT NULL,
        description TEXT,
        priority TEXT DEFAULT 'medium',
        impact_score INTEGER DEFAULT 75,
        implementation_difficulty TEXT DEFAULT 'medium',
        estimated_time TEXT,
        resources_needed TEXT,
        success_metrics TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    
    `CREATE TABLE IF NOT EXISTS templates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subcomponent_id TEXT NOT NULL,
        template_name TEXT NOT NULL,
        template_type TEXT,
        category TEXT,
        content TEXT,
        usage_count INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    
    `CREATE TABLE IF NOT EXISTS analytics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_type TEXT NOT NULL,
        subcomponent_id TEXT,
        event_data TEXT,
        user_id TEXT DEFAULT 'default',
        session_id TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    
    `CREATE TABLE IF NOT EXISTS generated_documents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subcomponent_id TEXT NOT NULL,
        document_type TEXT NOT NULL,
        document_name TEXT NOT NULL,
        file_path TEXT NOT NULL,
        file_size INTEGER,
        mime_type TEXT,
        metadata TEXT,
        session_id TEXT,
        user_id TEXT DEFAULT 'default',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`
];

// Execute each table creation
let completed = 0;
tables.forEach((sql, index) => {
    db.run(sql, (err) => {
        if (err) {
            console.error(`❌ Error creating table ${index + 1}:`, err.message);
        } else {
            console.log(`✅ Table ${index + 1} created/verified`);
        }
        completed++;
        if (completed === tables.length) {
            console.log('\n🎉 Database initialization complete!');
            db.close();
            process.exit(0);
        }
    });
});
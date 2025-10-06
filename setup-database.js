const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create or open database
const dbPath = path.join(__dirname, 'scaleops6.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err);
        process.exit(1);
    }
    console.log('Connected to SQLite database at:', dbPath);
});

// Create tables
const createTables = () => {
    // Score History table
    db.run(`
        CREATE TABLE IF NOT EXISTS score_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subcomponent_id TEXT NOT NULL,
            subcomponent_name TEXT NOT NULL,
            agent_name TEXT NOT NULL,
            block_name TEXT NOT NULL,
            overall_score INTEGER NOT NULL,
            dimension_scores TEXT NOT NULL,
            strengths TEXT NOT NULL,
            weaknesses TEXT NOT NULL,
            recommendations TEXT NOT NULL,
            answers TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            user_id TEXT DEFAULT 'default',
            session_id TEXT
        )
    `, (err) => {
        if (err) {
            console.error('Error creating score_history table:', err);
        } else {
            console.log('✓ score_history table created/verified');
            // Create indexes separately
            db.run('CREATE INDEX IF NOT EXISTS idx_subcomponent ON score_history(subcomponent_id)');
            db.run('CREATE INDEX IF NOT EXISTS idx_timestamp ON score_history(timestamp)');
            db.run('CREATE INDEX IF NOT EXISTS idx_user ON score_history(user_id)');
        }
    });

    // Generated Documents table
    db.run(`
        CREATE TABLE IF NOT EXISTS generated_documents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subcomponent_id TEXT NOT NULL,
            document_type TEXT NOT NULL,
            document_name TEXT NOT NULL,
            file_path TEXT NOT NULL,
            file_size INTEGER,
            mime_type TEXT,
            metadata TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            user_id TEXT DEFAULT 'default'
        )
    `, (err) => {
        if (err) {
            console.error('Error creating generated_documents table:', err);
        } else {
            console.log('✓ generated_documents table created/verified');
            db.run('CREATE INDEX IF NOT EXISTS idx_subcomponent_doc ON generated_documents(subcomponent_id)');
            db.run('CREATE INDEX IF NOT EXISTS idx_type ON generated_documents(document_type)');
            db.run('CREATE INDEX IF NOT EXISTS idx_created ON generated_documents(created_at)');
        }
    });

    // Templates table
    db.run(`
        CREATE TABLE IF NOT EXISTS templates (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subcomponent_id TEXT NOT NULL,
            template_name TEXT NOT NULL,
            template_type TEXT NOT NULL,
            template_content TEXT,
            file_path TEXT,
            category TEXT,
            tags TEXT,
            usage_count INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('Error creating templates table:', err);
        } else {
            console.log('✓ templates table created/verified');
            db.run('CREATE INDEX IF NOT EXISTS idx_subcomponent_template ON templates(subcomponent_id)');
            db.run('CREATE INDEX IF NOT EXISTS idx_category ON templates(category)');
        }
    });

    // Analysis Sessions table
    db.run(`
        CREATE TABLE IF NOT EXISTS analysis_sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT UNIQUE NOT NULL,
            subcomponent_id TEXT NOT NULL,
            start_time DATETIME DEFAULT CURRENT_TIMESTAMP,
            end_time DATETIME,
            status TEXT DEFAULT 'in_progress',
            analysis_data TEXT,
            user_id TEXT DEFAULT 'default',
            ip_address TEXT,
            user_agent TEXT
        )
    `, (err) => {
        if (err) {
            console.error('Error creating analysis_sessions table:', err);
        } else {
            console.log('✓ analysis_sessions table created/verified');
            db.run('CREATE INDEX IF NOT EXISTS idx_session ON analysis_sessions(session_id)');
            db.run('CREATE INDEX IF NOT EXISTS idx_status ON analysis_sessions(status)');
        }
    });

    // Expert Recommendations table
    db.run(`
        CREATE TABLE IF NOT EXISTS expert_recommendations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subcomponent_id TEXT NOT NULL,
            recommendation_type TEXT NOT NULL,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            priority TEXT DEFAULT 'medium',
            impact_score INTEGER,
            implementation_difficulty TEXT,
            estimated_time TEXT,
            resources_needed TEXT,
            success_metrics TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('Error creating expert_recommendations table:', err);
        } else {
            console.log('✓ expert_recommendations table created/verified');
            db.run('CREATE INDEX IF NOT EXISTS idx_subcomponent_rec ON expert_recommendations(subcomponent_id)');
            db.run('CREATE INDEX IF NOT EXISTS idx_priority ON expert_recommendations(priority)');
        }
    });

    // Workspace Answers table (for persistence)
    db.run(`
        CREATE TABLE IF NOT EXISTS workspace_answers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subcomponent_id TEXT NOT NULL,
            question_id TEXT NOT NULL,
            question_text TEXT NOT NULL,
            answer TEXT,
            answer_type TEXT,
            metadata TEXT,
            session_id TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            user_id TEXT DEFAULT 'default'
        )
    `, (err) => {
        if (err) {
            console.error('Error creating workspace_answers table:', err);
        } else {
            console.log('✓ workspace_answers table created/verified');
            db.run('CREATE INDEX IF NOT EXISTS idx_subcomponent_answers ON workspace_answers(subcomponent_id)');
            db.run('CREATE INDEX IF NOT EXISTS idx_session_answers ON workspace_answers(session_id)');
        }
    });

    // Analytics table
    db.run(`
        CREATE TABLE IF NOT EXISTS analytics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            event_type TEXT NOT NULL,
            subcomponent_id TEXT,
            event_data TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            user_id TEXT DEFAULT 'default',
            session_id TEXT
        )
    `, (err) => {
        if (err) {
            console.error('Error creating analytics table:', err);
        } else {
            console.log('✓ analytics table created/verified');
            db.run('CREATE INDEX IF NOT EXISTS idx_event_type ON analytics(event_type)');
            db.run('CREATE INDEX IF NOT EXISTS idx_timestamp_analytics ON analytics(timestamp)');
        }
    });
};

// Insert sample data for testing
const insertSampleData = () => {
    // Sample expert recommendations for all 96 subcomponents
    const blocks = [
        { id: 1, name: 'MISSION DISCOVERY' },
        { id: 2, name: 'CUSTOMER INSIGHTS' },
        { id: 3, name: 'STRATEGIC PRIORITIZATION' },
        { id: 4, name: 'PROTOTYPE & LAUNCH' },
        { id: 5, name: 'GO-TO-MARKET STRATEGY' },
        { id: 6, name: 'CUSTOMER ENGAGEMENT FLYWHEEL' },
        { id: 7, name: 'EARLY ADOPTER WINS' },
        { id: 8, name: 'CUSTOMER SUCCESS EXPANSION' },
        { id: 9, name: 'PRODUCT MARKET FIT' },
        { id: 10, name: 'SALES TEAM EMPOWERMENT' },
        { id: 11, name: 'HIGH PERFORMANCE TEAMS' },
        { id: 12, name: 'RETENTION SYSTEMS' },
        { id: 13, name: 'MARKET DOMINATION STRATEGIES' },
        { id: 14, name: 'OPERATIONAL INFRASTRUCTURE' },
        { id: 15, name: 'LEADERSHIP EXPANSION' },
        { id: 16, name: 'GLOBAL EXPANSION OPPORTUNITIES' }
    ];

    const recommendationTypes = ['strategic', 'tactical', 'operational'];
    const priorities = ['high', 'medium', 'low'];
    const difficulties = ['low', 'medium', 'high'];

    // Generate recommendations for each subcomponent
    blocks.forEach(block => {
        for (let sub = 1; sub <= 6; sub++) {
            const subcomponentId = `${block.id}-${sub}`;
            
            // Insert 2-3 recommendations per subcomponent
            for (let rec = 0; rec < 2; rec++) {
                const recType = recommendationTypes[rec % 3];
                const priority = priorities[rec % 3];
                const difficulty = difficulties[(rec + 1) % 3];
                
                db.run(`
                    INSERT OR IGNORE INTO expert_recommendations 
                    (subcomponent_id, recommendation_type, title, description, priority, 
                     impact_score, implementation_difficulty, estimated_time, resources_needed, success_metrics)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `, [
                    subcomponentId,
                    recType,
                    `${recType.charAt(0).toUpperCase() + recType.slice(1)} Recommendation for Block ${block.id}-${sub}`,
                    `This is a ${priority} priority ${recType} recommendation to improve performance in this area.`,
                    priority,
                    Math.floor(Math.random() * 30) + 70, // 70-100 impact score
                    difficulty,
                    `${Math.floor(Math.random() * 4) + 1} weeks`,
                    'Team resources, tools, and budget allocation',
                    'KPI improvements, customer satisfaction increase'
                ], (err) => {
                    if (err && !err.message.includes('UNIQUE constraint')) {
                        console.error('Error inserting recommendation:', err);
                    }
                });
            }

            // Insert template for each subcomponent
            db.run(`
                INSERT OR IGNORE INTO templates 
                (subcomponent_id, template_name, template_type, category, tags)
                VALUES (?, ?, ?, ?, ?)
            `, [
                subcomponentId,
                `${block.name} - Subcomponent ${sub} Template`,
                sub % 2 === 0 ? 'canvas' : 'document',
                sub <= 3 ? 'discovery' : 'execution',
                `block${block.id},subcomponent${sub},template`
            ], (err) => {
                if (err && !err.message.includes('UNIQUE constraint')) {
                    console.error('Error inserting template:', err);
                }
            });
        }
    });

    console.log('✓ Sample data insertion initiated for all 96 subcomponents');
};

// Run setup
console.log('Setting up ScaleOps6 database...\n');
createTables();

// Wait a bit for tables to be created, then insert sample data
setTimeout(() => {
    insertSampleData();
    
    // Close database after setup
    setTimeout(() => {
        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err);
            } else {
                console.log('\n✅ Database setup complete!');
                console.log('Database location:', dbPath);
            }
        });
    }, 3000); // Give more time for all inserts
}, 1000);
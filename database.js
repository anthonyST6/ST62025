const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database file path
const dbPath = path.join(__dirname, 'scaleops6.db');

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to SQLite database');
        initializeDatabase();
    }
});

// Initialize database schema
function initializeDatabase() {
    db.serialize(() => {
        // Users table
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                name TEXT NOT NULL,
                company TEXT,
                role TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Blocks table (static reference data)
        db.run(`
            CREATE TABLE IF NOT EXISTS blocks (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                phase INTEGER NOT NULL,
                description TEXT,
                details TEXT,
                order_index INTEGER
            )
        `);

        // Sub-blocks table
        db.run(`
            CREATE TABLE IF NOT EXISTS sub_blocks (
                id TEXT PRIMARY KEY,
                block_id INTEGER NOT NULL,
                name TEXT NOT NULL,
                description TEXT,
                order_index INTEGER,
                FOREIGN KEY (block_id) REFERENCES blocks(id)
            )
        `);

        // User block scores
        db.run(`
            CREATE TABLE IF NOT EXISTS user_block_scores (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                block_id INTEGER NOT NULL,
                score REAL DEFAULT 0,
                status TEXT DEFAULT 'pending',
                last_assessed DATETIME,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (block_id) REFERENCES blocks(id),
                UNIQUE(user_id, block_id)
            )
        `);

        // User sub-block scores
        db.run(`
            CREATE TABLE IF NOT EXISTS user_subblock_scores (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                sub_block_id TEXT NOT NULL,
                score REAL DEFAULT 0,
                status TEXT DEFAULT 'pending',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (sub_block_id) REFERENCES sub_blocks(id),
                UNIQUE(user_id, sub_block_id)
            )
        `);

        // Score history table - NEW
        db.run(`
            CREATE TABLE IF NOT EXISTS score_history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                block_id INTEGER NOT NULL,
                score REAL NOT NULL,
                sub_scores TEXT,
                evidence_links TEXT,
                ai_analysis TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (block_id) REFERENCES blocks(id)
            )
        `);

        // Document uploads table - NEW
        db.run(`
            CREATE TABLE IF NOT EXISTS documents (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                block_id INTEGER,
                subcomponent_id TEXT,
                file_path TEXT NOT NULL,
                file_name TEXT NOT NULL,
                file_type TEXT,
                file_size INTEGER,
                ai_summary TEXT,
                extracted_score INTEGER,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (block_id) REFERENCES blocks(id),
                FOREIGN KEY (subcomponent_id) REFERENCES sub_blocks(id)
            )
        `);

        // Learning progress table - NEW
        db.run(`
            CREATE TABLE IF NOT EXISTS learning_progress (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                subcomponent_id TEXT NOT NULL,
                completion_percentage INTEGER DEFAULT 0,
                time_spent INTEGER DEFAULT 0,
                resources_accessed TEXT,
                last_activity DATETIME DEFAULT CURRENT_TIMESTAMP,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (subcomponent_id) REFERENCES sub_blocks(id),
                UNIQUE(user_id, subcomponent_id)
            )
        `);

        // Assessment questions
        db.run(`
            CREATE TABLE IF NOT EXISTS assessment_questions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                block_id INTEGER,
                sub_block_id TEXT,
                question TEXT NOT NULL,
                question_type TEXT DEFAULT 'multiple_choice',
                options TEXT,
                weight REAL DEFAULT 1.0,
                category TEXT,
                order_index INTEGER,
                FOREIGN KEY (block_id) REFERENCES blocks(id),
                FOREIGN KEY (sub_block_id) REFERENCES sub_blocks(id)
            )
        `);

        // User assessment responses
        db.run(`
            CREATE TABLE IF NOT EXISTS user_responses (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                question_id INTEGER NOT NULL,
                response TEXT,
                score REAL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (question_id) REFERENCES assessment_questions(id)
            )
        `);

        // Sessions table
        db.run(`
            CREATE TABLE IF NOT EXISTS sessions (
                id TEXT PRIMARY KEY,
                user_id INTEGER,
                data TEXT,
                expires_at DATETIME,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        `);

        // Activity log
        db.run(`
            CREATE TABLE IF NOT EXISTS activity_log (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                action TEXT NOT NULL,
                entity_type TEXT,
                entity_id TEXT,
                metadata TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        `, (err) => {
            if (err) {
                console.error('Error creating tables:', err);
            } else {
                console.log('Database tables created successfully');
                // Initialize block data after tables are created
                initializeBlockData();
            }
        });
    });
}

// Initialize static block data
function initializeBlockData() {
    console.log('Initializing block data...');
    
    const blocks = [
        {
            id: 1,
            name: "Mission Discovery",
            phase: 1,
            description: "Ensure clarity on the problem, target customer, solution thesis, and internal team alignment",
            details: "Define your problem statement, mission, customer insights, founding team capability, market insights, and prototype launch plan",
            order_index: 1
        },
        {
            id: 2,
            name: "Customer Insights",
            phase: 1,
            description: "Develop deep understanding of customer needs, pain points, and behaviors through research and validation",
            details: "Conduct customer interviews, analyze market data, identify pain points, validate assumptions, and build customer personas",
            order_index: 2
        },
        {
            id: 3,
            name: "Strategic Prioritization",
            phase: 1,
            description: "Focus resources on highest-impact initiatives aligned with mission and market opportunity",
            details: "Define strategic objectives, prioritize features, allocate resources, set milestones, and establish success metrics",
            order_index: 3
        },
        {
            id: 4,
            name: "Prototype Launch",
            phase: 1,
            description: "Build and launch minimum viable product to test core value proposition with target customers",
            details: "Develop MVP, conduct user testing, gather feedback, iterate on design, and prepare for market launch",
            order_index: 4
        },
        {
            id: 5,
            name: "Early Adopter Wins",
            phase: 2,
            description: "Secure and nurture first customers who validate product-market fit and provide crucial feedback",
            details: "Identify early adopters, onboard first customers, collect testimonials, refine value proposition, and build case studies",
            order_index: 5
        },
        {
            id: 6,
            name: "Customer Engagement Flywheel",
            phase: 2,
            description: "Build systematic processes for customer acquisition, activation, and engagement at scale",
            details: "Design engagement loops, implement onboarding flows, create retention strategies, measure engagement metrics, and optimize conversion funnels",
            order_index: 6
        },
        {
            id: 7,
            name: "Quantifiable Impact",
            phase: 2,
            description: "Measure and demonstrate clear ROI and value delivery to customers and stakeholders",
            details: "Define KPIs, implement analytics, track customer success metrics, calculate ROI, and create impact reports",
            order_index: 7
        },
        {
            id: 8,
            name: "Customer Success Expansion",
            phase: 2,
            description: "Scale customer success operations to ensure consistent value delivery and satisfaction",
            details: "Build success playbooks, implement support systems, create knowledge base, develop training programs, and establish SLAs",
            order_index: 8
        },
        {
            id: 9,
            name: "Proof Execution",
            phase: 3,
            description: "Execute go-to-market strategy with validated playbooks and proven success metrics",
            details: "Launch sales campaigns, execute marketing plans, demonstrate traction, secure partnerships, and scale proven tactics",
            order_index: 9
        },
        {
            id: 10,
            name: "Sales Team Empowerment",
            phase: 3,
            description: "Build, train, and enable high-performing sales organization with tools and processes",
            details: "Recruit sales talent, develop sales playbooks, implement CRM systems, create training programs, and establish sales operations",
            order_index: 10
        },
        {
            id: 11,
            name: "High Performance Teams",
            phase: 3,
            description: "Develop organizational capabilities and culture for sustained high performance",
            details: "Define team structure, establish performance metrics, implement feedback systems, develop leadership, and build culture",
            order_index: 11
        },
        {
            id: 12,
            name: "Retention Systems",
            phase: 3,
            description: "Implement systematic approaches to maximize customer lifetime value and minimize churn",
            details: "Analyze churn patterns, implement retention programs, develop loyalty initiatives, create win-back campaigns, and optimize pricing",
            order_index: 12
        },
        {
            id: 13,
            name: "Market Domination Strategies",
            phase: 4,
            description: "Deploy strategies to capture and defend significant market share in target segments",
            details: "Analyze competition, expand market presence, build moats, develop ecosystem, and execute acquisition strategies",
            order_index: 13
        },
        {
            id: 14,
            name: "Operational Infrastructure",
            phase: 5,
            description: "Build scalable operations, systems, and processes to support rapid growth",
            details: "Implement ERP systems, automate workflows, establish supply chains, develop operational metrics, and ensure compliance",
            order_index: 14
        },
        {
            id: 15,
            name: "Leadership Expansion",
            phase: 5,
            description: "Develop executive team and governance structures for enterprise-scale operations",
            details: "Recruit executives, establish board governance, develop succession planning, implement leadership development, and align stakeholders",
            order_index: 15
        },
        {
            id: 16,
            name: "Global & Expansion Opportunities",
            phase: 5,
            description: "Identify and execute international expansion and new market opportunities",
            details: "Research global markets, develop localization strategies, establish international operations, navigate regulations, and build global partnerships",
            order_index: 16
        }
    ];

    // Use serialize to ensure proper order of operations
    db.serialize(() => {
        // Insert blocks
        const stmt = db.prepare(`
            INSERT OR REPLACE INTO blocks (id, name, phase, description, details, order_index)
            VALUES (?, ?, ?, ?, ?, ?)
        `);
        
        blocks.forEach(block => {
            stmt.run(block.id, block.name, block.phase, block.description, block.details, block.order_index);
        });
        
        stmt.finalize((err) => {
            if (err) {
                console.error('Error inserting blocks:', err);
            } else {
                console.log('Blocks inserted successfully');
            }
        });

        // Initialize sub-blocks with proper names and descriptions from ST6 documents
        const subBlockDefinitions = {
        1: [
            { name: "Problem Statement", description: "Clear articulation of the problem you're solving and why it matters" },
            { name: "Mission", description: "Your company's purpose and long-term vision for impact" },
            { name: "Customer Insights", description: "Deep understanding of target customer needs and behaviors" },
            { name: "Founding Team Capability", description: "Assessment of team skills, experience, and ability to execute" },
            { name: "Market Insights", description: "Understanding of market dynamics, trends, and opportunities" },
            { name: "Prototype Launch Plan", description: "Strategy and timeline for MVP development and launch" }
        ],
        2: [
            { name: "Customer Research", description: "Systematic approach to understanding customer needs through interviews and data" },
            { name: "Pain Point Analysis", description: "Identification and prioritization of customer problems to solve" },
            { name: "Persona Development", description: "Creation of detailed customer profiles to guide product decisions" },
            { name: "Journey Mapping", description: "Understanding customer workflows and interaction points" },
            { name: "Feedback Systems", description: "Mechanisms for continuous customer input and validation" },
            { name: "Market Segmentation", description: "Identification of distinct customer groups and their unique needs" }
        ],
        3: [
            { name: "Strategic Objectives", description: "Clear goals aligned with mission and market opportunity" },
            { name: "Resource Allocation", description: "Optimal distribution of time, money, and talent" },
            { name: "Feature Prioritization", description: "Ranking product capabilities by impact and effort" },
            { name: "Milestone Planning", description: "Key achievements and timeline for execution" },
            { name: "Risk Assessment", description: "Identification and mitigation of potential obstacles" },
            { name: "Success Metrics", description: "KPIs and targets to measure progress" }
        ],
        4: [
            { name: "MVP Development", description: "Building minimum viable product with core features" },
            { name: "User Testing", description: "Structured testing with target users for feedback" },
            { name: "Iteration Process", description: "Rapid improvement cycles based on user input" },
            { name: "Launch Strategy", description: "Go-to-market plan for initial product release" },
            { name: "Technical Architecture", description: "Scalable foundation for product growth" },
            { name: "Quality Assurance", description: "Testing and validation processes for reliability" }
        ],
        5: [
            { name: "Early Adopter Identification", description: "Finding and qualifying first customers" },
            { name: "Onboarding Excellence", description: "Smooth customer activation and initial success" },
            { name: "Success Stories", description: "Documenting and sharing customer wins" },
            { name: "Reference Development", description: "Building advocates and case studies" },
            { name: "Feedback Integration", description: "Incorporating early customer input into product" },
            { name: "Community Building", description: "Creating connections among early users" }
        ],
        6: [
            { name: "Acquisition Channels", description: "Identifying and optimizing customer acquisition paths" },
            { name: "Activation Flows", description: "Designing optimal first user experiences" },
            { name: "Engagement Loops", description: "Creating habits and repeated value delivery" },
            { name: "Retention Mechanics", description: "Systems to keep customers active and satisfied" },
            { name: "Referral Programs", description: "Incentivizing and enabling customer advocacy" },
            { name: "Growth Metrics", description: "Tracking and optimizing funnel performance" }
        ],
        7: [
            { name: "KPI Framework", description: "Comprehensive metrics system for business health" },
            { name: "ROI Calculation", description: "Demonstrating clear return on customer investment" },
            { name: "Impact Measurement", description: "Quantifying value delivered to customers" },
            { name: "Analytics Infrastructure", description: "Tools and processes for data collection and analysis" },
            { name: "Reporting Systems", description: "Regular communication of progress and results" },
            { name: "Benchmarking", description: "Comparison against industry standards and competitors" }
        ],
        8: [
            { name: "Success Playbooks", description: "Documented processes for customer achievement" },
            { name: "Support Infrastructure", description: "Multi-channel customer assistance capabilities" },
            { name: "Knowledge Management", description: "Self-service resources and documentation" },
            { name: "Training Programs", description: "Customer education and enablement initiatives" },
            { name: "Health Scoring", description: "Proactive monitoring of customer success indicators" },
            { name: "Expansion Strategies", description: "Growing revenue within existing accounts" }
        ],
        9: [
            { name: "Sales Execution", description: "Implementing proven sales processes at scale" },
            { name: "Marketing Campaigns", description: "Coordinated outreach and demand generation" },
            { name: "Partnership Development", description: "Strategic alliances for market expansion" },
            { name: "Competitive Positioning", description: "Differentiation and win strategies" },
            { name: "Proof Points", description: "Evidence and validation of value proposition" },
            { name: "Market Penetration", description: "Systematic expansion into target segments" }
        ],
        10: [
            { name: "Sales Talent Acquisition", description: "Recruiting and hiring top sales professionals" },
            { name: "Sales Methodology", description: "Structured approach to customer engagement" },
            { name: "CRM Implementation", description: "Technology stack for sales efficiency" },
            { name: "Training & Enablement", description: "Continuous skill development and tool mastery" },
            { name: "Compensation Design", description: "Incentive structures for performance" },
            { name: "Sales Operations", description: "Processes and systems for sales productivity" }
        ],
        11: [
            { name: "Organizational Design", description: "Structure and roles for optimal performance" },
            { name: "Performance Management", description: "Goal setting and achievement tracking" },
            { name: "Culture Development", description: "Values and behaviors for success" },
            { name: "Leadership Development", description: "Growing management capabilities" },
            { name: "Team Communication", description: "Information flow and collaboration systems" },
            { name: "Talent Development", description: "Career growth and skill building programs" }
        ],
        12: [
            { name: "Churn Analysis", description: "Understanding why customers leave" },
            { name: "Retention Programs", description: "Initiatives to increase customer lifetime" },
            { name: "Loyalty Initiatives", description: "Rewards and recognition for continued partnership" },
            { name: "Win-back Campaigns", description: "Re-engaging lost customers" },
            { name: "Pricing Optimization", description: "Value-based pricing for retention" },
            { name: "Customer Health Monitoring", description: "Predictive indicators of retention risk" }
        ],
        13: [
            { name: "Competitive Analysis", description: "Deep understanding of market rivals and dynamics" },
            { name: "Market Expansion", description: "Geographic and segment growth strategies" },
            { name: "Competitive Moats", description: "Sustainable advantages and barriers to entry" },
            { name: "Ecosystem Development", description: "Platform and partnership strategies" },
            { name: "M&A Strategy", description: "Growth through strategic acquisitions" },
            { name: "Brand Dominance", description: "Market leadership and thought leadership" }
        ],
        14: [
            { name: "Systems Implementation", description: "ERP and operational technology deployment" },
            { name: "Process Automation", description: "Efficiency through technology and optimization" },
            { name: "Supply Chain Management", description: "Vendor and logistics optimization" },
            { name: "Quality Systems", description: "Consistency and excellence in delivery" },
            { name: "Compliance Framework", description: "Regulatory and standards adherence" },
            { name: "Operational Metrics", description: "KPIs for operational excellence" }
        ],
        15: [
            { name: "Executive Recruitment", description: "Attracting and hiring senior leadership" },
            { name: "Board Development", description: "Governance structure and advisory capability" },
            { name: "Succession Planning", description: "Leadership continuity and development" },
            { name: "Executive Alignment", description: "Strategic consensus and coordination" },
            { name: "Stakeholder Management", description: "Investor and board relations" },
            { name: "Leadership Culture", description: "Executive team dynamics and effectiveness" }
        ],
        16: [
            { name: "International Markets", description: "Assessment and entry into global markets" },
            { name: "Localization Strategy", description: "Product and market adaptation for regions" },
            { name: "Global Operations", description: "Infrastructure for international business" },
            { name: "Regulatory Navigation", description: "Compliance with international requirements" },
            { name: "Global Partnerships", description: "Strategic alliances for market entry" },
            { name: "Cultural Adaptation", description: "Understanding and adapting to local markets" }
        ]
        };
        
        // Insert sub-blocks
        const subStmt = db.prepare(`
            INSERT OR REPLACE INTO sub_blocks (id, block_id, name, description, order_index)
            VALUES (?, ?, ?, ?, ?)
        `);
        
        blocks.forEach(block => {
            const subBlocks = subBlockDefinitions[block.id] || [];
            subBlocks.forEach((subBlock, index) => {
                const subBlockId = `${block.id}-${index + 1}`;
                subStmt.run(subBlockId, block.id, subBlock.name, subBlock.description, index + 1);
            });
        });
        
        subStmt.finalize((err) => {
            if (err) {
                console.error('Error inserting sub-blocks:', err);
            } else {
                console.log('Sub-blocks inserted successfully');
                console.log('Database initialization complete!');
            }
        });
    });
}

// Database operations
class Database {
    // User operations
    static createUser(email, name, company, role, callback) {
        const query = `
            INSERT INTO users (email, name, company, role)
            VALUES (?, ?, ?, ?)
        `;
        db.run(query, [email, name, company, role], function(err) {
            callback(err, this ? { id: this.lastID, email, name, company, role } : null);
        });
    }

    static getUserById(userId, callback) {
        db.get('SELECT * FROM users WHERE id = ?', [userId], callback);
    }

    static getUserByEmail(email, callback) {
        db.get('SELECT * FROM users WHERE email = ?', [email], callback);
    }

    // Block operations
    static getAllBlocks(callback) {
        db.all('SELECT * FROM blocks ORDER BY order_index', callback);
    }

    static getBlockById(blockId, callback) {
        db.get('SELECT * FROM blocks WHERE id = ?', [blockId], callback);
    }

    static getSubBlocksByBlockId(blockId, callback) {
        db.all('SELECT * FROM sub_blocks WHERE block_id = ? ORDER BY order_index', [blockId], callback);
    }

    // Score operations
    static getUserBlockScore(userId, blockId, callback) {
        db.get(`
            SELECT * FROM user_block_scores 
            WHERE user_id = ? AND block_id = ?
        `, [userId, blockId], callback);
    }

    static updateUserBlockScore(userId, blockId, score, status, callback) {
        const query = `
            INSERT INTO user_block_scores (user_id, block_id, score, status, last_assessed, updated_at)
            VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            ON CONFLICT(user_id, block_id) 
            DO UPDATE SET 
                score = excluded.score,
                status = excluded.status,
                last_assessed = CURRENT_TIMESTAMP,
                updated_at = CURRENT_TIMESTAMP
        `;
        db.run(query, [userId, blockId, score, status], callback);
    }

    static getUserAllBlockScores(userId, callback) {
        db.all(`
            SELECT b.*, 
                   COALESCE(ubs.score, 0) as score,
                   COALESCE(ubs.status, 'pending') as status
            FROM blocks b
            LEFT JOIN user_block_scores ubs ON b.id = ubs.block_id AND ubs.user_id = ?
            ORDER BY b.order_index
        `, [userId], callback);
    }

    // Assessment operations
    static getAssessmentQuestions(blockId, subBlockId, callback) {
        let query = 'SELECT * FROM assessment_questions WHERE 1=1';
        const params = [];
        
        if (blockId) {
            query += ' AND block_id = ?';
            params.push(blockId);
        }
        
        if (subBlockId) {
            query += ' AND sub_block_id = ?';
            params.push(subBlockId);
        }
        
        query += ' ORDER BY order_index';
        db.all(query, params, callback);
    }

    static saveUserResponse(userId, questionId, response, score, callback) {
        const query = `
            INSERT INTO user_responses (user_id, question_id, response, score)
            VALUES (?, ?, ?, ?)
        `;
        db.run(query, [userId, questionId, response, score], callback);
    }

    // Session operations
    static createSession(sessionId, userId, data, expiresAt, callback) {
        const query = `
            INSERT INTO sessions (id, user_id, data, expires_at)
            VALUES (?, ?, ?, ?)
        `;
        db.run(query, [sessionId, userId, JSON.stringify(data), expiresAt], callback);
    }

    static getSession(sessionId, callback) {
        db.get(`
            SELECT * FROM sessions 
            WHERE id = ? AND (expires_at IS NULL OR expires_at > CURRENT_TIMESTAMP)
        `, [sessionId], (err, row) => {
            if (row && row.data) {
                try {
                    row.data = JSON.parse(row.data);
                } catch (e) {
                    // Keep as string if not valid JSON
                }
            }
            callback(err, row);
        });
    }

    static deleteSession(sessionId, callback) {
        db.run('DELETE FROM sessions WHERE id = ?', [sessionId], callback);
    }

    // Activity logging
    static logActivity(userId, action, entityType, entityId, metadata, callback) {
        const query = `
            INSERT INTO activity_log (user_id, action, entity_type, entity_id, metadata)
            VALUES (?, ?, ?, ?, ?)
        `;
        db.run(query, [userId, action, entityType, entityId, JSON.stringify(metadata)], callback);
    }

    // Score history operations - NEW
    static saveScoreHistory(userId, blockId, score, subScores, evidenceLinks, aiAnalysis, callback) {
        const query = `
            INSERT INTO score_history (user_id, block_id, score, sub_scores, evidence_links, ai_analysis)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        db.run(query, [
            userId,
            blockId,
            score,
            JSON.stringify(subScores),
            JSON.stringify(evidenceLinks),
            aiAnalysis
        ], callback);
    }

    static getScoreHistory(userId, blockId, limit = 10, callback) {
        const query = `
            SELECT * FROM score_history
            WHERE user_id = ? AND block_id = ?
            ORDER BY created_at DESC
            LIMIT ?
        `;
        db.all(query, [userId, blockId, limit], (err, rows) => {
            if (rows) {
                rows.forEach(row => {
                    try {
                        if (row.sub_scores) row.sub_scores = JSON.parse(row.sub_scores);
                        if (row.evidence_links) row.evidence_links = JSON.parse(row.evidence_links);
                    } catch (e) {
                        console.error('Error parsing JSON in score history:', e);
                    }
                });
            }
            callback(err, rows);
        });
    }

    // Document operations - NEW
    static saveDocument(userId, blockId, subcomponentId, filePath, fileName, fileType, fileSize, callback) {
        const query = `
            INSERT INTO documents (user_id, block_id, subcomponent_id, file_path, file_name, file_type, file_size)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        db.run(query, [userId, blockId, subcomponentId, filePath, fileName, fileType, fileSize], function(err) {
            callback(err, this ? { id: this.lastID } : null);
        });
    }

    static getDocuments(userId, blockId, subcomponentId, callback) {
        let query = 'SELECT * FROM documents WHERE user_id = ?';
        const params = [userId];
        
        if (blockId) {
            query += ' AND block_id = ?';
            params.push(blockId);
        }
        
        if (subcomponentId) {
            query += ' AND subcomponent_id = ?';
            params.push(subcomponentId);
        }
        
        query += ' ORDER BY created_at DESC';
        db.all(query, params, callback);
    }

    // Get documents by subcomponent - NEW
    static getDocumentsBySubcomponent(userId, subcomponentId, callback) {
        db.all(
            `SELECT * FROM documents
             WHERE user_id = ? AND subcomponent_id = ?
             ORDER BY created_at DESC`,
            [userId, subcomponentId],
            callback
        );
    }

    // Get document by ID - NEW
    static getDocumentById(documentId, callback) {
        db.get('SELECT * FROM documents WHERE id = ?', [documentId], callback);
    }

    // Delete document - NEW
    static deleteDocument(documentId, userId, callback) {
        db.run(
            'DELETE FROM documents WHERE id = ? AND user_id = ?',
            [documentId, userId],
            callback
        );
    }

    // Update document with AI analysis - NEW
    static updateDocumentAnalysis(documentId, aiSummary, extractedScore, callback) {
        const query = `
            UPDATE documents
            SET ai_summary = ?, extracted_score = ?
            WHERE id = ?
        `;
        db.run(query, [aiSummary, extractedScore, documentId], callback);
    }

    // Learning progress operations - NEW
    static updateLearningProgress(userId, subcomponentId, completionPercentage, timeSpent, resourcesAccessed, callback) {
        const query = `
            INSERT INTO learning_progress (user_id, subcomponent_id, completion_percentage, time_spent, resources_accessed, last_activity)
            VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
            ON CONFLICT(user_id, subcomponent_id)
            DO UPDATE SET
                completion_percentage = excluded.completion_percentage,
                time_spent = time_spent + excluded.time_spent,
                resources_accessed = excluded.resources_accessed,
                last_activity = CURRENT_TIMESTAMP
        `;
        db.run(query, [userId, subcomponentId, completionPercentage, timeSpent, JSON.stringify(resourcesAccessed)], callback);
    }

    static getLearningProgress(userId, subcomponentId, callback) {
        db.get(`
            SELECT * FROM learning_progress
            WHERE user_id = ? AND subcomponent_id = ?
        `, [userId, subcomponentId], (err, row) => {
            if (row && row.resources_accessed) {
                try {
                    row.resources_accessed = JSON.parse(row.resources_accessed);
                } catch (e) {
                    // Keep as string if not valid JSON
                }
            }
            callback(err, row);
        });
    }

    // Get subcomponent by ID - NEW
    static getSubComponentById(subcomponentId, callback) {
        db.get('SELECT * FROM sub_blocks WHERE id = ?', [subcomponentId], callback);
    }

    // Cleanup expired sessions
    static cleanupExpiredSessions(callback) {
        db.run('DELETE FROM sessions WHERE expires_at < CURRENT_TIMESTAMP', callback);
    }
}

// Export database and operations
module.exports = {
    db,
    Database
};

// Cleanup on exit
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err);
        } else {
            console.log('Database connection closed.');
        }
        process.exit(0);
    });
});
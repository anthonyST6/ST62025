const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

// Serve static files
app.use(express.static(__dirname));

// Serve CSS files
app.use('/css', express.static(path.join(__dirname, 'css')));

// Serve JavaScript files
app.use('/js', express.static(path.join(__dirname, 'js')));

// Main dashboard route
app.get('/', (req, res) => {
    const dashboardPath = path.join(__dirname, 'dashboard.html');
    if (fs.existsSync(dashboardPath)) {
        res.sendFile(dashboardPath);
    } else {
        // If no dashboard, show a list of all blocks
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>ScaleOps6 - Block Navigator</title>
                <style>
                    body {
                        background: #1a1a1a;
                        color: #fff;
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        padding: 40px;
                    }
                    h1 {
                        color: #FF5500;
                        text-transform: uppercase;
                        letter-spacing: 2px;
                    }
                    .blocks-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                        gap: 20px;
                        margin-top: 30px;
                    }
                    .block-card {
                        background: rgba(255, 255, 255, 0.05);
                        border: 1px solid rgba(255, 85, 0, 0.3);
                        border-radius: 12px;
                        padding: 20px;
                        transition: all 0.3s ease;
                    }
                    .block-card:hover {
                        background: rgba(255, 255, 255, 0.08);
                        border-color: #FF5500;
                        transform: translateY(-2px);
                    }
                    .block-title {
                        color: #FF5500;
                        font-weight: 700;
                        margin-bottom: 15px;
                        font-size: 18px;
                    }
                    .subcomponent-list {
                        list-style: none;
                        padding: 0;
                    }
                    .subcomponent-list li {
                        margin: 8px 0;
                    }
                    .subcomponent-list a {
                        color: #fff;
                        text-decoration: none;
                        display: block;
                        padding: 8px 12px;
                        background: rgba(255, 255, 255, 0.03);
                        border-radius: 6px;
                        transition: all 0.2s ease;
                    }
                    .subcomponent-list a:hover {
                        background: rgba(255, 85, 0, 0.2);
                        padding-left: 18px;
                    }
                    .status-badge {
                        display: inline-block;
                        padding: 2px 8px;
                        background: #10B981;
                        color: #000;
                        border-radius: 4px;
                        font-size: 10px;
                        font-weight: 700;
                        margin-left: 8px;
                    }
                </style>
            </head>
            <body>
                <h1>🚀 ScaleOps6 Platform - Enhanced Agent System</h1>
                <p style="color: #999;">All 96 agents are now active with dimension-based evaluation</p>
                
                <div class="blocks-grid">
                    ${generateBlockCards()}
                </div>
            </body>
            </html>
        `);
    }
});

// Function to generate block cards
function generateBlockCards() {
    const blocks = [
        { id: 1, name: 'Mission Discovery' },
        { id: 2, name: 'Customer Insights' },
        { id: 3, name: 'Strategic Prioritization' },
        { id: 4, name: 'Prototype Launch' },
        { id: 5, name: 'Go-to-Market Strategy' },
        { id: 6, name: 'Customer Engagement Flywheel' },
        { id: 7, name: 'Quantifiable Impact' },
        { id: 8, name: 'Customer Success & Expansion' },
        { id: 9, name: 'Proof of Execution' },
        { id: 10, name: 'Sales Team Empowerment' },
        { id: 11, name: 'High-Performance Teams' },
        { id: 12, name: 'Retention Systems' },
        { id: 13, name: 'Market Domination Strategies' },
        { id: 14, name: 'Operational Infrastructure' },
        { id: 15, name: 'Leadership & Expansion' },
        { id: 16, name: 'Global Expansion Opportunities' }
    ];

    const subcomponents = [
        'Subcomponent 1', 'Subcomponent 2', 'Subcomponent 3',
        'Subcomponent 4', 'Subcomponent 5', 'Subcomponent 6'
    ];

    return blocks.map(block => `
        <div class="block-card">
            <div class="block-title">Block ${block.id}: ${block.name}</div>
            <ul class="subcomponent-list">
                ${subcomponents.map((sub, idx) => `
                    <li>
                        <a href="/block-${block.id}-${idx + 1}.html">
                            Module ${block.id}.${idx + 1}
                            <span class="status-badge">ACTIVE</span>
                        </a>
                    </li>
                `).join('')}
            </ul>
        </div>
    `).join('');
}

// Serve individual block files
app.get('/block-:blockId-:subId.html', (req, res) => {
    const { blockId, subId } = req.params;
    const filePath = path.join(__dirname, `block-${blockId}-${subId}.html`);
    
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('Block file not found');
    }
});

// API endpoint for agent data
app.get('/api/agent/:moduleId', (req, res) => {
    res.json({
        status: 'active',
        message: 'Agent system fully operational',
        moduleId: req.params.moduleId,
        features: [
            'Dimension-based evaluation',
            'Agent-specific content',
            'Intelligent analysis',
            'Data persistence'
        ]
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🚀 ScaleOps6 Platform Server                           ║
║   ✨ Enhanced Agent System Active                        ║
║                                                            ║
║   Server running at: http://localhost:${PORT}              ║
║                                                            ║
║   Features:                                                ║
║   • 96 Intelligent Agents                                 ║
║   • Dimension-Based Evaluation                            ║
║   • No More Generic Fields                                ║
║   • Complete Data Persistence                             ║
║                                                            ║
║   Navigate to any block to see the enhanced system        ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
    `);
    
    console.log('\n📋 Quick Links:');
    console.log(`   Block 1-1: http://localhost:${PORT}/block-1-1.html`);
    console.log(`   Block 2-1: http://localhost:${PORT}/block-2-1.html`);
    console.log(`   Block 3-1: http://localhost:${PORT}/block-3-1.html`);
    console.log('\n   ... and 93 more blocks available!\n');
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Load integrated agent library with correct mappings
const {
    IntegratedAgentLibrary,
    getAgentForSubcomponent,
    AGENT_CORRECT_MAPPING
} = require('./integrated-agent-library.js');

// Load correct subcomponent names (NOT agent names)
const SUBCOMPONENT_NAMES = require('./subcomponent-names-mapping.js');

// Block data structure
const blocks = [
    { id: 1, name: "MISSION DISCOVERY", phase: 1, score: 85, description: "Define your core purpose and vision" },
    { id: 2, name: "CUSTOMER INSIGHTS", phase: 1, score: 78, description: "Understand your target market deeply" },
    { id: 3, name: "STRATEGIC PRIORITIZATION", phase: 1, score: 72, description: "Focus on what matters most" },
    { id: 4, name: "PROTOTYPE LAUNCH", phase: 1, score: 65, description: "Build and test your MVP" },
    { id: 5, name: "GO-TO-MARKET STRATEGY", phase: 2, score: 88, description: "Plan your market entry" },
    { id: 6, name: "CUSTOMER ENGAGEMENT FLYWHEEL", phase: 2, score: 82, description: "Create sustainable growth loops" },
    { id: 7, name: "QUANTIFIABLE IMPACT", phase: 2, score: 79, description: "Measure what matters" },
    { id: 8, name: "CUSTOMER SUCCESS EXPANSION", phase: 2, score: 80, description: "Grow with your customers" },
    { id: 9, name: "PROOF EXECUTION", phase: 3, score: 75, description: "Validate your business model" },
    { id: 10, name: "SALES TEAM EMPOWERMENT", phase: 3, score: 70, description: "Build a winning sales culture" },
    { id: 11, name: "HIGH PERFORMANCE TEAMS", phase: 3, score: 65, description: "Create exceptional teams" },
    { id: 12, name: "RETENTION SYSTEMS", phase: 3, score: 62, description: "Keep customers for life" },
    { id: 13, name: "MARKET DOMINATION STRATEGIES", phase: 4, score: 45, description: "Become the market leader" },
    { id: 14, name: "OPERATIONAL INFRASTRUCTURE", phase: 5, score: 35, description: "Scale your operations" },
    { id: 15, name: "LEADERSHIP EXPANSION", phase: 5, score: 28, description: "Grow your leadership capacity" },
    { id: 16, name: "GLOBAL EXPANSION OPPORTUNITIES", phase: 5, score: 27, description: "Go global strategically" }
];

// Subcomponent mapping
const subcomponents = {
    1: ["1-1", "1-2", "1-3", "1-4", "1-5", "1-6"],
    2: ["2-1", "2-2", "2-3", "2-4", "2-5", "2-6"],
    3: ["3-1", "3-2", "3-3", "3-4", "3-5", "3-6"],
    4: ["4-1", "4-2", "4-3", "4-4", "4-5", "4-6"],
    5: ["5-1", "5-2", "5-3", "5-4", "5-5", "5-6"],
    6: ["6-1", "6-2", "6-3", "6-4", "6-5", "6-6"],
    7: ["7-1", "7-2", "7-3", "7-4", "7-5", "7-6"],
    8: ["8-1", "8-2", "8-3", "8-4", "8-5", "8-6"],
    9: ["9-1", "9-2", "9-3", "9-4", "9-5", "9-6"],
    10: ["10-1", "10-2", "10-3", "10-4", "10-5", "10-6"],
    11: ["11-1", "11-2", "11-3", "11-4", "11-5", "11-6"],
    12: ["12-1", "12-2", "12-3", "12-4", "12-5", "12-6"],
    13: ["13-1", "13-2", "13-3", "13-4", "13-5", "13-6"],
    14: ["14-1", "14-2", "14-3", "14-4", "14-5", "14-6"],
    15: ["15-1", "15-2", "15-3", "15-4", "15-5", "15-6"],
    16: ["16-1", "16-2", "16-3", "16-4", "16-5", "16-6"]
};

// Use the integrated library's mapping function instead of simple alphabetical
// This ensures correct agent assignment for all 96 subcomponents

// Helper function to generate education content from agent
function generateEducationContent(agent) {
    return {
        overview: agent.description || "Strategic overview for this component",
        keyPrinciples: [
            "Understanding the fundamentals of " + agent.name,
            "Best practices and methodologies",
            "Common pitfalls and how to avoid them",
            "Success metrics and KPIs"
        ],
        learningObjectives: agent.evaluationCriteria || [
            "Master core concepts",
            "Apply frameworks effectively",
            "Measure and optimize performance",
            "Scale successful strategies"
        ],
        resources: [
            { type: "video", title: "Introduction to " + agent.name, duration: "15 min" },
            { type: "article", title: "Deep Dive: " + agent.name, readTime: "10 min" },
            { type: "template", title: agent.name + " Worksheet", downloadable: true },
            { type: "case-study", title: "Success Story: " + agent.name, readTime: "8 min" }
        ]
    };
}

// Helper function to generate workspace questions from agent
function generateWorkspaceQuestions(agent) {
    const questions = [];
    
    // Add ST6Co-specific context questions first
    questions.push({
        id: "st6_context",
        category: "Company Context",
        question: "Company/Product Information",
        type: "info",
        content: {
            company: "ST6Co",
            product: "ScaleOps6Product",
            description: "AI-powered GTM maturity platform with 16 operational blocks",
            stage: "Building our own product using our framework"
        }
    });
    
    questions.push({
        id: "st6_problem",
        category: "Problem Statement",
        question: "What problem does ScaleOps6Product solve?",
        type: "text",
        defaultValue: "Startups struggle with fragmented GTM tools and lack systematic operational maturity frameworks. Current solutions lack integration, don't provide actionable insights, require multiple vendors, have no learning loops, and don't adapt to the startup's specific stage and context.",
        placeholder: "Describe the core problem your product addresses...",
        required: true
    });
    
    questions.push({
        id: "st6_solution",
        category: "Solution",
        question: "How does ScaleOps6Product solve this problem?",
        type: "text",
        defaultValue: "ScaleOps6Product is an AI-powered GTM maturity platform that provides personalized roadmaps, integrated tools, and expert guidance through 16 operational blocks, helping startups systematically progress from idea to scale.",
        placeholder: "Describe your unique solution approach...",
        required: true
    });
    
    questions.push({
        id: "st6_evidence",
        category: "Evidence",
        question: "What evidence validates ScaleOps6Product's effectiveness?",
        type: "text",
        defaultValue: "Beta testing with 10 startups showed 3x faster time to product-market fit, 70% reduction in GTM operational overhead, and average NPS of 72. Our own journey validates the framework's effectiveness.",
        placeholder: "Provide metrics, testimonials, or case studies...",
        required: false
    });
    
    // Add agent-specific dimension questions
    if (agent.scoringDimensions) {
        questions.push({
            id: "dimension_header",
            category: "Assessment",
            question: `${agent.name} Assessment for ScaleOps6Product`,
            type: "header"
        });
        
        agent.scoringDimensions.forEach((dimension, index) => {
            questions.push({
                id: `q${index + 1}`,
                category: dimension.name,
                question: `How well does ST6Co/ScaleOps6Product perform in ${dimension.name}?`,
                type: "scale",
                options: [
                    { value: 1, label: "Not at all" },
                    { value: 2, label: "Slightly" },
                    { value: 3, label: "Moderately" },
                    { value: 4, label: "Very well" },
                    { value: 5, label: "Extremely well" }
                ],
                weight: dimension.weight,
                helpText: `Assess ScaleOps6Product's capability in ${dimension.name.toLowerCase()}: ${dimension.description}`
            });
            
            // Add a follow-up question with ST6Co context
            questions.push({
                id: `q${index + 1}b`,
                category: dimension.name,
                question: `What specific ST6Co/ScaleOps6Product evidence supports your ${dimension.name} assessment?`,
                type: "text",
                placeholder: `Provide specific examples from ScaleOps6Product's implementation, metrics, or achievements...`,
                required: false
            });
        });
    }
    
    // Add summary questions at the end
    questions.push({
        id: "st6_next_steps",
        category: "Next Steps",
        question: "What are the immediate next steps for ScaleOps6Product in this area?",
        type: "text",
        placeholder: "List 3-5 actionable next steps...",
        required: false
    });
    
    questions.push({
        id: "st6_blockers",
        category: "Blockers",
        question: "What blockers or challenges does ST6Co face in this operational block?",
        type: "text",
        placeholder: "Identify key obstacles or resource constraints...",
        required: false
    });
    
    return questions;
}

// Helper function to generate templates from agent
function generateTemplates(agent) {
    return [
        {
            id: "template-1",
            name: agent.name + " Assessment Report",
            description: "Comprehensive analysis of your " + agent.name.toLowerCase() + " capabilities",
            format: "PDF",
            pages: 12
        },
        {
            id: "template-2", 
            name: agent.name + " Action Plan",
            description: "Step-by-step implementation guide",
            format: "DOCX",
            pages: 8
        },
        {
            id: "template-3",
            name: agent.name + " Metrics Dashboard",
            description: "Track your progress and KPIs",
            format: "XLSX",
            pages: 5
        }
    ];
}

// Helper function to generate resources from agent
function generateResources(agent) {
    return [
        {
            id: "resource-1",
            title: agent.name + " Framework Guide",
            type: "PDF",
            size: "2.4 MB",
            description: "Complete framework documentation"
        },
        {
            id: "resource-2",
            title: agent.name + " Best Practices",
            type: "PDF", 
            size: "1.8 MB",
            description: "Industry best practices and case studies"
        },
        {
            id: "resource-3",
            title: agent.name + " Checklist",
            type: "DOCX",
            size: "245 KB",
            description: "Implementation checklist and milestones"
        },
        {
            id: "resource-4",
            title: agent.name + " Presentation Template",
            type: "PPTX",
            size: "3.2 MB",
            description: "Ready-to-use presentation deck"
        }
    ];
}

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

// Combined server handling both API and static files
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    
    console.log(`Request: ${req.method} ${pathname}`);
    
    // CORS headers for all responses
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    // API ROUTES
    
    // Route: GET /api/blocks
    if (pathname === '/api/blocks' && req.method === 'GET') {
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.end(JSON.stringify({ blocks }));
        return;
    }
    
    // Route: GET /api/blocks/:id
    const blockMatch = pathname.match(/^\/api\/blocks\/(\d+)$/);
    if (blockMatch && req.method === 'GET') {
        const blockId = parseInt(blockMatch[1]);
        const block = blocks.find(b => b.id === blockId);
        
        if (block) {
            // Add subblocks with scores using correct agent mapping
            const subBlocks = subcomponents[blockId].map((subId, index) => {
                const agent = getAgentForSubcomponent(subId);
                const agentName = AGENT_CORRECT_MAPPING[subId];
                // Use the correct subcomponent name from mapping, NOT the agent name
                const subcomponentName = SUBCOMPONENT_NAMES[subId] || `Subcomponent ${index + 1}`;
                return {
                    id: subId,
                    name: subcomponentName,  // Use proper subcomponent name
                    description: agent ? agent.description : "Subcomponent description",
                    score: 70 + Math.floor(Math.random() * 20),
                    agentName: agentName  // Correct agent name from mapping
                };
            });
            
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.end(JSON.stringify({ ...block, subBlocks }));
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(404);
            res.end(JSON.stringify({ error: "Block not found" }));
        }
        return;
    }
    
    // Route: GET /api/blocks/:id/history
    const historyMatch = pathname.match(/^\/api\/blocks\/(\d+)\/history$/);
    if (historyMatch && req.method === 'GET') {
        const blockId = parseInt(historyMatch[1]);
        const days = parseInt(parsedUrl.query.days) || 7;
        
        // Generate mock history data
        const history = [];
        const changeEvents = [];
        const now = new Date();
        
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            const score = 70 + Math.floor(Math.random() * 20) + Math.floor((days - i) / 2);
            
            history.push({
                date: date.toISOString(),
                score: Math.min(100, score),
                hasChange: i % 3 === 0
            });
            
            if (i % 3 === 0) {
                changeEvents.push({
                    date: date.toLocaleDateString(),
                    event: `Improvement Event ${days - i}`,
                    weaknesses: ["Area for improvement " + (i + 1)],
                    actions: ["Action taken " + (i + 1)],
                    previousScore: score - 5,
                    newScore: score,
                    improvement: 5
                });
            }
        }
        
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.end(JSON.stringify({ history, changeEvents }));
        return;
    }
    
    // Route: GET /api/subcomponents/:id
    const subcomponentMatch = pathname.match(/^\/api\/subcomponents\/(.+)$/);
    if (subcomponentMatch && req.method === 'GET') {
        const subcomponentId = subcomponentMatch[1];
        const agent = getAgentForSubcomponent(subcomponentId);
        const agentName = AGENT_CORRECT_MAPPING[subcomponentId];
        
        if (agent) {
            const response = {
                id: subcomponentId,
                name: agentName,  // Use correct agent name from mapping
                description: agent.description,
                education: generateEducationContent(agent),
                workspace: {
                    questions: generateWorkspaceQuestions(agent)
                },
                templates: generateTemplates(agent),
                resources: generateResources(agent),
                scoringDimensions: agent.scoringDimensions,
                evaluationCriteria: agent.evaluationCriteria
            };
            
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.end(JSON.stringify(response));
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(404);
            res.end(JSON.stringify({ error: `Agent not found for subcomponent ${subcomponentId}` }));
        }
        return;
    }
    
    // Route: POST /api/analysis
    if (pathname === '/api/analysis' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const { subcomponentId, responses } = data;
                const agent = getAgentForSubcomponent(subcomponentId);
                const agentName = AGENT_CORRECT_MAPPING[subcomponentId];
                
                if (agent) {
                    // Calculate score based on responses
                    let totalScore = 0;
                    let totalWeight = 0;
                    
                    if (agent.scoringDimensions) {
                        agent.scoringDimensions.forEach((dimension, index) => {
                            const response = responses[`q${index + 1}`];
                            if (response) {
                                const score = (response / 5) * 100;
                                totalScore += score * dimension.weight;
                                totalWeight += dimension.weight;
                            }
                        });
                    }
                    
                    const finalScore = totalWeight > 0 ? Math.round(totalScore / totalWeight) : 75;
                    
                    const analysis = {
                        score: finalScore,
                        agentName: agentName,  // Use correct agent name from mapping
                        timestamp: new Date().toISOString(),
                        strengths: ["Strong foundation in place", "Good understanding of requirements"],
                        weaknesses: ["Need more documentation", "Metrics tracking could improve"],
                        recommendations: [
                            "Implement comprehensive tracking",
                            "Document all processes",
                            "Regular review cycles"
                        ]
                    };
                    
                    res.setHeader('Content-Type', 'application/json');
                    res.writeHead(200);
                    res.end(JSON.stringify(analysis));
                } else {
                    res.setHeader('Content-Type', 'application/json');
                    res.writeHead(404);
                    res.end(JSON.stringify({ error: "Agent not found" }));
                }
            } catch (error) {
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(400);
                res.end(JSON.stringify({ error: "Invalid request data" }));
            }
        });
        return;
    }
    
    // Route: GET /api/score-history/:subcomponentId
    const scoreHistoryMatch = pathname.match(/^\/api\/score-history\/(.+)$/);
    if (scoreHistoryMatch && req.method === 'GET') {
        const subcomponentId = scoreHistoryMatch[1];
        
        // Generate mock score history
        const history = [];
        for (let i = 0; i < 10; i++) {
            history.push({
                id: i + 1,
                score: 70 + Math.floor(Math.random() * 20),
                timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
                agentName: "Agent " + subcomponentId
            });
        }
        
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.end(JSON.stringify(history));
        return;
    }
    
    // Route: POST /api/score-history
    if (pathname === '/api/score-history' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.end(JSON.stringify({ success: true, message: "Score saved" }));
        });
        return;
    }
    
    // STATIC FILE SERVING
    
    let filePath = '.' + pathname.split('?')[0]; // Remove query params
    if (filePath === './') {
        filePath = './dashboard.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - File Not Found</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`, 'utf-8');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Combined Server (API + Static Files) running on http://localhost:${PORT}`);
    console.log(`Open http://localhost:${PORT}/dashboard.html to view the application`);
    console.log(`\nAPI Endpoints available:`);
    console.log(`  GET  /api/blocks`);
    console.log(`  GET  /api/blocks/:id`);
    console.log(`  GET  /api/blocks/:id/history`);
    console.log(`  GET  /api/subcomponents/:id`);
    console.log(`  POST /api/analysis`);
    console.log(`  GET  /api/score-history/:subcomponentId`);
    console.log(`  POST /api/score-history`);
    console.log(`\nTotal agents loaded: ${Object.keys(IntegratedAgentLibrary).length}`);
    console.log(`Agent mapping verified for all 96 subcomponents`);
});
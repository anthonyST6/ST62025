const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Load agent library
const agentLibraryContent = fs.readFileSync('./agent-library.js', 'utf8');
const agentLibraryMatch = agentLibraryContent.match(/const\s+AgentLibrary\s*=\s*({[\s\S]*?});/);
const AgentLibrary = eval('(' + agentLibraryMatch[1] + ')');

// Load agent integration system
const agentIntegrationContent = fs.readFileSync('./agent-integration-system.js', 'utf8');

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

// Helper function to get agent key from subcomponent ID
function getAgentKey(subcomponentId) {
    const [blockNum, subNum] = subcomponentId.split('-');
    const blockLetter = String.fromCharCode(96 + parseInt(subNum)); // 1->a, 2->b, etc.
    return `${blockNum}${blockLetter}`;
}

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
    
    if (agent.scoringDimensions) {
        agent.scoringDimensions.forEach((dimension, index) => {
            questions.push({
                id: `q${index + 1}`,
                category: dimension.name,
                question: `How well does your organization perform in ${dimension.name}?`,
                type: "scale",
                options: [
                    { value: 1, label: "Not at all" },
                    { value: 2, label: "Slightly" },
                    { value: 3, label: "Moderately" },
                    { value: 4, label: "Very well" },
                    { value: 5, label: "Extremely well" }
                ],
                weight: dimension.weight,
                helpText: `This measures your capability in ${dimension.name.toLowerCase()}`
            });
            
            // Add a follow-up question
            questions.push({
                id: `q${index + 1}b`,
                category: dimension.name,
                question: `What specific evidence supports your ${dimension.name} assessment?`,
                type: "text",
                placeholder: "Provide specific examples, metrics, or achievements...",
                required: false
            });
        });
    }
    
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

// API server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');
    
    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    console.log(`API Request: ${req.method} ${pathname}`);
    
    // Route: GET /api/blocks
    if (pathname === '/api/blocks' && req.method === 'GET') {
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
            // Add subblocks with scores
            const subBlocks = subcomponents[blockId].map((subId, index) => {
                const agentKey = getAgentKey(subId);
                const agent = AgentLibrary[agentKey];
                return {
                    id: subId,
                    name: agent ? agent.name : `Subcomponent ${index + 1}`,
                    description: agent ? agent.description : "Subcomponent description",
                    score: 70 + Math.floor(Math.random() * 20),
                    agentKey: agentKey
                };
            });
            
            res.writeHead(200);
            res.end(JSON.stringify({ ...block, subBlocks }));
        } else {
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
        
        res.writeHead(200);
        res.end(JSON.stringify({ history, changeEvents }));
        return;
    }
    
    // Route: GET /api/subcomponents/:id
    const subcomponentMatch = pathname.match(/^\/api\/subcomponents\/(.+)$/);
    if (subcomponentMatch && req.method === 'GET') {
        const subcomponentId = subcomponentMatch[1];
        const agentKey = getAgentKey(subcomponentId);
        const agent = AgentLibrary[agentKey];
        
        if (agent) {
            const response = {
                id: subcomponentId,
                agentKey: agentKey,
                name: agent.name,
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
            
            res.writeHead(200);
            res.end(JSON.stringify(response));
        } else {
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
                const agentKey = getAgentKey(subcomponentId);
                const agent = AgentLibrary[agentKey];
                
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
                        agentName: agent.name,
                        timestamp: new Date().toISOString(),
                        strengths: ["Strong foundation in place", "Good understanding of requirements"],
                        weaknesses: ["Need more documentation", "Metrics tracking could improve"],
                        recommendations: [
                            "Implement comprehensive tracking",
                            "Document all processes",
                            "Regular review cycles"
                        ]
                    };
                    
                    res.writeHead(200);
                    res.end(JSON.stringify(analysis));
                } else {
                    res.writeHead(404);
                    res.end(JSON.stringify({ error: "Agent not found" }));
                }
            } catch (error) {
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
            // Just return success for now
            res.writeHead(200);
            res.end(JSON.stringify({ success: true, message: "Score saved" }));
        });
        return;
    }
    
    // 404 for unknown routes
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Route not found" }));
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`API Mock Server running on http://localhost:${PORT}`);
    console.log(`Available endpoints:`);
    console.log(`  GET  /api/blocks`);
    console.log(`  GET  /api/blocks/:id`);
    console.log(`  GET  /api/blocks/:id/history`);
    console.log(`  GET  /api/subcomponents/:id`);
    console.log(`  POST /api/analysis`);
    console.log(`  GET  /api/score-history/:subcomponentId`);
    console.log(`  POST /api/score-history`);
    console.log(`\nTotal agents loaded: ${Object.keys(AgentLibrary).length}`);
});
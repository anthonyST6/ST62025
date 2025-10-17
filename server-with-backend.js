const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Import our new services
const FileGenerationService = require('./file-generation-service.js');
const DatabaseService = require('./database-service.js');
// UnifiedContentService is a browser-side script, not for server use

// Initialize services
const fileGenerator = new FileGenerationService();
const database = new DatabaseService();
// UnifiedContentService removed - it's a browser-side script

// Load SSOT Registry - Single Source of Truth
let { COMPLETE_SSOT_REGISTRY, getSubcomponent } = require('./core/complete-ssot-registry.js');

// Load enhanced use cases for ALL Blocks 1-16
const EnhancedUseCasesBlock1 = require('./enhanced-use-cases-block-1.js');
const EnhancedUseCasesBlock2 = require('./enhanced-use-cases-block-2.js');
const EnhancedUseCasesBlock3 = require('./enhanced-use-cases-block-3.js');
const EnhancedUseCasesBlock4 = require('./enhanced-use-cases-block-4.js');
const EnhancedUseCasesBlock5 = require('./enhanced-use-cases-block-5.js');
const EnhancedUseCasesBlock6 = require('./enhanced-use-cases-block-6.js');
const EnhancedUseCasesBlock7 = require('./enhanced-use-cases-block-7.js');
const EnhancedUseCasesBlock8 = require('./enhanced-use-cases-block-8.js');
const EnhancedUseCasesBlock9 = require('./enhanced-use-cases-block-9.js');
const EnhancedUseCasesBlock10 = require('./enhanced-use-cases-block-10.js');
const EnhancedUseCasesBlock11 = require('./enhanced-use-cases-block-11.js');
const EnhancedUseCasesBlock12 = require('./enhanced-use-cases-block-12.js');
const EnhancedUseCasesBlock13 = require('./enhanced-use-cases-block-13.js');
const EnhancedUseCasesBlock14 = require('./enhanced-use-cases-block-14.js');
const EnhancedUseCasesBlock15 = require('./enhanced-use-cases-block-15.js');
const EnhancedUseCasesBlock16 = require('./enhanced-use-cases-block-16.js');

// Load and apply use case enhancements to SSOT IMMEDIATELY
const { enhanceSSOTWithUseCases, USE_CASES_DATA } = require('./ssot-use-cases-enhancer.js');

// Apply enhancements at startup and get the enhanced registry
const ENHANCED_SSOT_REGISTRY = enhanceSSOTWithUseCases();

/**
 * Normalizes enhanced use case data structures across all blocks
 * Converts companies object format (Blocks 7-16) to useCases array format (Blocks 1-6)
 *
 * @param {Object} blockData - Raw block data from enhanced use case file
 * @returns {Object} Normalized block data with consistent useCases array structure
 */
function normalizeUseCaseStructure(blockData) {
    const normalized = {};
    
    Object.keys(blockData).forEach(subId => {
        const subData = blockData[subId];
        
        // Detect structure type
        if (subData.companies && !subData.useCases) {
            // Transform companies object to useCases array
            const useCases = Object.entries(subData.companies).map(([companyKey, companyData]) => {
                // Normalize company name: salesforce -> Salesforce, new_relic -> New Relic
                const companyName = companyKey
                    .split('_')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                
                return {
                    company: companyName,
                    challenge: companyData.challenge,
                    approach: companyData.approach,
                    definition: companyData.definition,
                    results: companyData.results,
                    keyInsight: companyData.keyInsight
                };
            });
            
            normalized[subId] = {
                title: subData.title,
                useCases: useCases
            };
            
            console.log(`  ✅ Transformed ${subId}: ${useCases.length} use cases from companies object`);
        } else if (subData.useCases) {
            // Already in correct format
            normalized[subId] = subData;
            console.log(`  ✅ Passed through ${subId}: ${subData.useCases.length} use cases (array format)`);
        } else {
            // Unknown format - log warning
            console.warn(`  ⚠️ Unknown format for ${subId}:`, Object.keys(subData));
            normalized[subId] = subData;
        }
    });
    
    return normalized;
}

// Override with enhanced content from ALL Blocks 1-16
const enhancedBlocks = [
    EnhancedUseCasesBlock1,
    EnhancedUseCasesBlock2,
    EnhancedUseCasesBlock3,
    EnhancedUseCasesBlock4,
    EnhancedUseCasesBlock5,
    EnhancedUseCasesBlock6,
    EnhancedUseCasesBlock7,
    EnhancedUseCasesBlock8,
    EnhancedUseCasesBlock9,
    EnhancedUseCasesBlock10,
    EnhancedUseCasesBlock11,
    EnhancedUseCasesBlock12,
    EnhancedUseCasesBlock13,
    EnhancedUseCasesBlock14,
    EnhancedUseCasesBlock15,
    EnhancedUseCasesBlock16
];

console.log('\n📦 Normalizing enhanced use case data structures...');

// NORMALIZE ALL BLOCKS BEFORE APPLICATION
const normalizedBlocks = enhancedBlocks.map((blockData, blockIndex) => {
    console.log(`\n📦 Processing Block ${blockIndex + 1}...`);
    return normalizeUseCaseStructure(blockData);
});

console.log('\n✅ All blocks normalized successfully!\n');

// APPLY NORMALIZED DATA TO SSOT
let totalEnhanced = 0;
let totalUseCases = 0;
normalizedBlocks.forEach((blockData, blockIndex) => {
    Object.keys(blockData).forEach(subId => {
        if (ENHANCED_SSOT_REGISTRY[subId] && blockData[subId] && blockData[subId].useCases) {
            const useCases = blockData[subId].useCases;
            ENHANCED_SSOT_REGISTRY[subId].education.useCases = useCases;
            ENHANCED_SSOT_REGISTRY[subId].education.examples = useCases;
            totalEnhanced++;
            totalUseCases += useCases.length;
            console.log(`✅ Applied enhanced use cases to ${subId} (${useCases.length} use cases)`);
        }
    });
});

console.log(`\n🎉 SSOT enhanced with detailed use cases for ALL 16 Blocks!`);
console.log(`📊 Total subcomponents enhanced: ${totalEnhanced}/96`);
console.log(`📚 Total use cases loaded: ${totalUseCases}`);

// VALIDATION: Check all 96 subcomponents
console.log(`\n🔍 Validating SSOT Enhancement...`);

const validationResults = {
    total: 96,
    enhanced: 0,
    missing: [],
    incomplete: []
};

for (let blockId = 1; blockId <= 16; blockId++) {
    for (let subId = 1; subId <= 6; subId++) {
        const subcomponentId = `${blockId}-${subId}`;
        const ssotData = ENHANCED_SSOT_REGISTRY[subcomponentId];
        
        if (ssotData && ssotData.education && ssotData.education.useCases) {
            const useCaseCount = ssotData.education.useCases.length;
            if (useCaseCount >= 6) {
                validationResults.enhanced++;
            } else {
                validationResults.incomplete.push({
                    id: subcomponentId,
                    count: useCaseCount
                });
            }
        } else {
            validationResults.missing.push(subcomponentId);
        }
    }
}

console.log(`\n📊 SSOT Enhancement Validation Results:`);
console.log(`   ✅ Enhanced: ${validationResults.enhanced}/96`);
console.log(`   ⚠️ Incomplete: ${validationResults.incomplete.length}`);
console.log(`   ❌ Missing: ${validationResults.missing.length}`);

if (validationResults.missing.length > 0) {
    console.log(`\n❌ Missing enhanced use cases for:`, validationResults.missing);
}

if (validationResults.incomplete.length > 0) {
    console.log(`\n⚠️ Incomplete use cases for:`, validationResults.incomplete);
}

if (validationResults.enhanced === 96) {
    console.log(`\n🎉 SUCCESS: All 96 subcomponents have enhanced use cases!`);
}

// Override getSubcomponent to use enhanced registry
const originalGetSubcomponent = getSubcomponent;
getSubcomponent = function(id) {
    // Use enhanced registry instead of original
    if (ENHANCED_SSOT_REGISTRY[id]) {
        return ENHANCED_SSOT_REGISTRY[id];
    }
    // Fallback to original
    return originalGetSubcomponent(id);
};

// Load integrated agent library with correct mappings (for backward compatibility)
const {
    IntegratedAgentLibrary,
    getAgentForSubcomponent,
    AGENT_CORRECT_MAPPING
} = require('./integrated-agent-library.js');

// Load correct subcomponent names (NOT agent names)
const { SUBCOMPONENT_NAMES } = require('./subcomponent-names-mapping.js');

// Load real-world examples for education tab
const { getRealWorldExamples } = require('./real-world-examples-all-96-complete.js');

// CRITICAL FIX: Import the question generation infrastructure
const AgentQuestionGenerator = require('./agent-question-generator.js');
const agentGeneratedQuestions = require('./agent-generated-questions-complete.js');
const DynamicWorksheetGenerator = require('./dynamic-worksheet-generator.js');
const { testCompany } = require('./test-company.js');

// Load complete ST6Co demo data for pre-filled worksheets
const { demoData: st6coDemoData, getDemoAnswer } = require('./st6co-demo-data-complete.js');
console.log('✅ ST6Co demo data loaded:', Object.keys(st6coDemoData).length, 'subcomponents');

// Load templates from get-templates.js (simplified version)
const { getTemplatesForSubcomponent } = require('./get-templates.js');

// Log successful loading
console.log('🚀 Enhanced Server with Full Backend Loading...');
console.log(`✅ File Generation Service: ${!!fileGenerator}`);
console.log(`✅ Database Service: ${!!database}`);
// UnifiedContentService is browser-side only
console.log(`✅ Question generators loaded: ${!!AgentQuestionGenerator}`);
console.log(`✅ Pre-generated questions available for ${Object.keys(agentGeneratedQuestions).length} subcomponents`);
console.log(`✅ ST6Co company data loaded: ${testCompany.name}`);

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
const subcomponents = {};
for (let i = 1; i <= 16; i++) {
    subcomponents[i] = [];
    for (let j = 1; j <= 6; j++) {
        subcomponents[i].push(`${i}-${j}`);
    }
}

// Helper function to integrate ST6Co data into questions
function integrateCompanyData(questions, companyData, subcomponentId = '1-1') {
    // Parse the subcomponent ID to get block and sub IDs
    const [blockId, subId] = subcomponentId.split('-');
    
    // Get demo data directly from the demoData object
    const subcomponentDemoData = st6coDemoData[subcomponentId] || {};
    
    console.log(`📝 Integrating demo data for ${subcomponentId}:`, Object.keys(subcomponentDemoData).length, 'answers available');
    
    const formattedQuestions = questions.map((q, index) => {
        // Properly capitalize category names
        let category = q.type || q.category || "Assessment";
        category = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
        
        // Get demo answer using the question ID directly from the demo data object
        const questionId = q.id || `${subcomponentId}-q${index + 1}`;
        const demoAnswer = subcomponentDemoData[questionId] || "";
        
        if (demoAnswer) {
            console.log(`  ✅ Question ${questionId} has demo data (${demoAnswer.substring(0, 80)}...)`);
        } else {
            console.log(`  ⚠️ Question ${questionId} has NO demo data`);
        }
        
        const workspaceQuestion = {
            id: questionId,
            category: category,
            question: q.text || q.question,
            type: q.inputType || "text",
            required: q.required !== false,
            minLength: q.minLength,
            maxLength: q.maxLength,
            hint: q.hint || q.helpText,
            placeholder: q.hint || "Provide detailed response...",
            defaultValue: demoAnswer // Use demo data if available
        };

        // Add example answer if provided
        if (q.exampleAnswer) {
            workspaceQuestion.example = typeof q.exampleAnswer === 'object' ?
                q.exampleAnswer.good : q.exampleAnswer;
        }

        return workspaceQuestion;
    });

    return formattedQuestions;
}

// Generate workspace questions using agent-specific generators
function generateWorkspaceQuestions(agent, subcomponentId) {
    console.log(`📝 Generating workspace for ${subcomponentId} with agent: ${agent.name}`);
    
    if (agentGeneratedQuestions[subcomponentId]) {
        console.log(`✅ Using pre-generated questions for ${subcomponentId}`);
        const questions = agentGeneratedQuestions[subcomponentId].questions;
        // Pass subcomponentId to ensure proper enhanced answers
        return integrateCompanyData(questions, testCompany, subcomponentId);
    }
    
    console.log(`🔄 Dynamically generating questions for ${subcomponentId}`);
    const generator = new AgentQuestionGenerator();
    const worksheet = generator.generateQuestions(subcomponentId, {});
    
    if (worksheet && worksheet.questions) {
        return integrateCompanyData(worksheet.questions, testCompany, subcomponentId);
    }
    
    return generateFallbackQuestions(agent, subcomponentId);
}

// Fallback question generation
function generateFallbackQuestions(agent, subcomponentId) {
    const questions = [];
    const [blockId] = subcomponentId.split('-');
    const blockScore = testCompany.blockScores[blockId];
    
    questions.push({
        id: "st6_context",
        category: "Company Context",
        question: "ST6Co/ScaleOps6 Meta-Experiment Assessment",
        type: "info",
        content: {
            company: testCompany.name,
            product: "ScaleOps6",
            blockScore: blockScore ? blockScore.score : 'N/A'
        }
    });
    
    if (agent.scoringDimensions) {
        agent.scoringDimensions.forEach((dimension, index) => {
            questions.push({
                id: `q${index + 1}`,
                category: dimension.name,
                question: `How does ${testCompany.name} perform in ${dimension.name}?`,
                type: "text",
                placeholder: `Describe ${testCompany.name}'s approach to ${dimension.name.toLowerCase()}...`,
                required: index < 3,
                minLength: 100,
                maxLength: 1000,
                hint: dimension.description
            });
        });
    }
    
    return questions;
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
    '.ico': 'image/x-icon',
    '.pdf': 'application/pdf',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
};

// Combined server handling both API and static files
const server = http.createServer(async (req, res) => {
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
    
    // ==================== NEW API ROUTES ====================
    
    // Route: POST /api/generate-pdf/:subcomponentId
    const generatePdfMatch = pathname.match(/^\/api\/generate-pdf\/(.+)$/);
    if (generatePdfMatch && req.method === 'POST') {
        const subcomponentId = generatePdfMatch[1];
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', async () => {
            try {
                const analysisData = JSON.parse(body);
                
                // Add subcomponent and agent names
                analysisData.subcomponentName = SUBCOMPONENT_NAMES[subcomponentId] || `Subcomponent ${subcomponentId}`;
                analysisData.agentName = AGENT_CORRECT_MAPPING[subcomponentId] || 'AI Agent';
                
                // Generate PDF
                const result = await fileGenerator.generateAnalysisPDF(analysisData, subcomponentId);
                
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(200);
                res.end(JSON.stringify(result));
            } catch (error) {
                console.error('Error generating PDF:', error);
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(500);
                res.end(JSON.stringify({ error: error.message }));
            }
        });
        return;
    }
    
    // Route: POST /api/generate-docx/:subcomponentId
    const generateDocxMatch = pathname.match(/^\/api\/generate-docx\/(.+)$/);
    if (generateDocxMatch && req.method === 'POST') {
        const subcomponentId = generateDocxMatch[1];
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', async () => {
            try {
                const analysisData = JSON.parse(body);
                
                // Add subcomponent and agent names
                analysisData.subcomponentName = SUBCOMPONENT_NAMES[subcomponentId] || `Subcomponent ${subcomponentId}`;
                analysisData.agentName = AGENT_CORRECT_MAPPING[subcomponentId] || 'AI Agent';
                
                // Generate DOCX
                const result = await fileGenerator.generateAnalysisDOCX(analysisData, subcomponentId);
                
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(200);
                res.end(JSON.stringify(result));
            } catch (error) {
                console.error('Error generating DOCX:', error);
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(500);
                res.end(JSON.stringify({ error: error.message }));
            }
        });
        return;
    }
    
    // Route: GET /api/generate-template/:subcomponentId/:type
    const generateTemplateMatch = pathname.match(/^\/api\/generate-template\/(.+)\/(.+)$/);
    if (generateTemplateMatch && req.method === 'GET') {
        const [, subcomponentId, templateType] = generateTemplateMatch;
        
        try {
            // Get template data from database
            const templateData = await fileGenerator.getTemplateData(subcomponentId);
            templateData.templateName = templateData.template_name || `${SUBCOMPONENT_NAMES[subcomponentId]} Template`;
            templateData.category = templateData.category || 'general';
            
            // Generate template PDF
            const result = await fileGenerator.generateTemplatePDF(templateData, subcomponentId);
            
            // Increment usage count
            if (templateData.id) {
                await database.incrementTemplateUsage(templateData.id);
            }
            
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.end(JSON.stringify(result));
        } catch (error) {
            console.error('Error generating template:', error);
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(500);
            res.end(JSON.stringify({ error: error.message }));
        }
        return;
    }
    
    // Route: GET /api/score-history-db/:subcomponentId
    const scoreHistoryDbMatch = pathname.match(/^\/api\/score-history-db\/(.+)$/);
    if (scoreHistoryDbMatch && req.method === 'GET') {
        const subcomponentId = scoreHistoryDbMatch[1];
        const limit = parseInt(parsedUrl.query.limit) || 10;
        
        try {
            const history = await database.getScoreHistory(subcomponentId, limit);
            
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.end(JSON.stringify(history));
        } catch (error) {
            console.error('Error fetching score history:', error);
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(500);
            res.end(JSON.stringify({ error: error.message }));
        }
        return;
    }
    
    // Route: POST /api/save-score-history
    if (pathname === '/api/save-score-history' && req.method === 'POST') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', async () => {
            try {
                const data = JSON.parse(body);
                
                // Save to database
                const result = await database.saveScoreHistory(data);
                
                // Log analytics event
                await database.logAnalyticsEvent('score_saved', data.subcomponentId, {
                    score: data.overallScore,
                    timestamp: new Date().toISOString()
                }, data.userId, data.sessionId);
                
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(200);
                res.end(JSON.stringify(result));
            } catch (error) {
                console.error('Error saving score history:', error);
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(500);
                res.end(JSON.stringify({ error: error.message }));
            }
        });
        return;
    }
    
    // Route: GET /api/expert-recommendations/:subcomponentId
    const expertRecsMatch = pathname.match(/^\/api\/expert-recommendations\/(.+)$/);
    if (expertRecsMatch && req.method === 'GET') {
        const subcomponentId = expertRecsMatch[1];
        
        try {
            const recommendations = await database.getExpertRecommendations(subcomponentId);
            
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.end(JSON.stringify(recommendations));
        } catch (error) {
            console.error('Error fetching expert recommendations:', error);
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(500);
            res.end(JSON.stringify({ error: error.message }));
        }
        return;
    }
    
    // Route: GET /api/templates/:subcomponentId
    const templatesMatch = pathname.match(/^\/api\/templates\/(.+)$/);
    if (templatesMatch && req.method === 'GET') {
        const subcomponentId = templatesMatch[1];
        
        try {
            const templates = await database.getTemplates(subcomponentId);
            
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.end(JSON.stringify(templates));
        } catch (error) {
            console.error('Error fetching templates:', error);
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(500);
            res.end(JSON.stringify({ error: error.message }));
        }
        return;
    }
    
    // Route: GET /api/generated-documents/:subcomponentId
    const generatedDocsMatch = pathname.match(/^\/api\/generated-documents\/(.+)$/);
    if (generatedDocsMatch && req.method === 'GET') {
        const subcomponentId = generatedDocsMatch[1];
        
        try {
            const documents = await database.getGeneratedDocuments(subcomponentId);
            
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.end(JSON.stringify(documents));
        } catch (error) {
            console.error('Error fetching generated documents:', error);
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(500);
            res.end(JSON.stringify({ error: error.message }));
        }
        return;
    }
    
    // Route: POST /api/save-workspace-answers
    if (pathname === '/api/save-workspace-answers' && req.method === 'POST') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', async () => {
            try {
                const { subcomponentId, answers, sessionId, userId } = JSON.parse(body);
                
                // Save to database
                const result = await database.saveWorkspaceAnswers(subcomponentId, answers, sessionId, userId);
                
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(200);
                res.end(JSON.stringify(result));
            } catch (error) {
                console.error('Error saving workspace answers:', error);
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(500);
                res.end(JSON.stringify({ error: error.message }));
            }
        });
        return;
    }
    
    // Route: GET /api/workspace-answers/:subcomponentId
    const workspaceAnswersMatch = pathname.match(/^\/api\/workspace-answers\/(.+)$/);
    if (workspaceAnswersMatch && req.method === 'GET') {
        const subcomponentId = workspaceAnswersMatch[1];
        const sessionId = parsedUrl.query.sessionId || null;
        
        try {
            const answers = await database.getWorkspaceAnswers(subcomponentId, sessionId);
            
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.end(JSON.stringify(answers));
        } catch (error) {
            console.error('Error fetching workspace answers:', error);
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(500);
            res.end(JSON.stringify({ error: error.message }));
        }
        return;
    }
    
    // Route: GET /generated/* - Serve generated files
    if (pathname.startsWith('/generated/')) {
        const filePath = path.join(__dirname, pathname);
        
        fs.readFile(filePath, (error, content) => {
            if (error) {
                res.writeHead(404);
                res.end('File not found');
            } else {
                const ext = path.extname(filePath);
                const contentType = mimeTypes[ext] || 'application/octet-stream';
                
                res.writeHead(200, {
                    'Content-Type': contentType,
                    'Content-Disposition': `attachment; filename="${path.basename(filePath)}"`
                });
                res.end(content);
            }
        });
        return;
    }
    
    // ==================== UNIFIED CONTENT ROUTE ====================
    
    // Route: GET /api/unified-content/:subcomponentId
    const unifiedContentMatch = pathname.match(/^\/api\/unified-content\/(.+)$/);
    if (unifiedContentMatch && req.method === 'GET') {
        const subcomponentId = unifiedContentMatch[1];
        
        try {
            console.log(`🔄 Fetching unified content for ${subcomponentId}`);
            const content = unifiedContentService.getContent(subcomponentId);
            
            // Add cache headers
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');
            res.setHeader('ETag', unifiedContentService.getContentHash(content));
            res.setHeader('X-Content-Version', content._metadata ? content._metadata.version : 'unknown');
            
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.end(JSON.stringify({
                success: true,
                content: content,
                timestamp: Date.now()
            }));
        } catch (error) {
            console.error(`Error fetching unified content for ${subcomponentId}:`, error);
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(500);
            res.end(JSON.stringify({
                success: false,
                error: error.message,
                subcomponentId
            }));
        }
        return;
    }
    
    // Route: GET /api/validate-content/:subcomponentId
    const validateContentMatch = pathname.match(/^\/api\/validate-content\/(.+)$/);
    if (validateContentMatch && req.method === 'GET') {
        const subcomponentId = validateContentMatch[1];
        
        try {
            const content = unifiedContentService.getContent(subcomponentId);
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.end(JSON.stringify({
                subcomponentId,
                valid: content._metadata ? content._metadata.validated : false,
                violations: content._metadata ? content._metadata.violations : [],
                sources: content._metadata ? content._metadata.sources : []
            }));
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(500);
            res.end(JSON.stringify({
                success: false,
                error: error.message
            }));
        }
        return;
    }
    
    // Route: GET /api/validate-all
    if (pathname === '/api/validate-all' && req.method === 'GET') {
        try {
            const results = unifiedContentService.validateAllContent();
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.end(JSON.stringify(results));
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(500);
            res.end(JSON.stringify({
                success: false,
                error: error.message
            }));
        }
        return;
    }
    
    // Route: POST /api/clear-cache/:subcomponentId?
    const clearCacheMatch = pathname.match(/^\/api\/clear-cache\/(.*)$/);
    if (pathname.startsWith('/api/clear-cache') && req.method === 'POST') {
        const subcomponentId = clearCacheMatch ? clearCacheMatch[1] : null;
        
        try {
            unifiedContentService.clearCache(subcomponentId || null);
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.end(JSON.stringify({
                success: true,
                message: subcomponentId ?
                    `Cache cleared for ${subcomponentId}` :
                    'All cache cleared'
            }));
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(500);
            res.end(JSON.stringify({
                success: false,
                error: error.message
            }));
        }
        return;
    }
    
    // ==================== REAL WORLD EXAMPLES API ROUTES ====================
    
    // Route: GET /api/real-world-examples/:subcomponentId
    const realWorldMatch = pathname.match(/^\/api\/real-world-examples\/(.+)$/);
    if (realWorldMatch && req.method === 'GET') {
        const subcomponentId = realWorldMatch[1];
        
        try {
            // Get examples from SSOT instead of getRealWorldExamples
            const ssotData = getSubcomponent(subcomponentId);
            const examples = ssotData.education.examples || [];
            
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.end(JSON.stringify({
                subcomponentId,
                examples: examples,
                hasExamples: examples.length > 0,
                count: examples.length
            }));
        } catch (error) {
            console.error(`Error fetching real world examples for ${subcomponentId}:`, error);
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(500);
            res.end(JSON.stringify({
                error: 'Failed to fetch real world examples',
                subcomponentId
            }));
        }
        return;
    }
    
    // Route: GET /api/real-world-examples-status
    if (pathname === '/api/real-world-examples-status' && req.method === 'GET') {
        try {
            const RealWorldExamplesTracker = require('./real-world-examples-tracker.js');
            const tracker = new RealWorldExamplesTracker();
            const report = tracker.getStatusReport();
            
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.end(JSON.stringify(report));
        } catch (error) {
            console.error('Error generating real world examples status:', error);
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(500);
            res.end(JSON.stringify({
                error: 'Failed to generate status report',
                message: error.message
            }));
        }
        return;
    }
    
    // ==================== EXISTING API ROUTES ====================
    
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
            const subBlocks = subcomponents[blockId].map((subId, index) => {
                const agent = getAgentForSubcomponent(subId);
                const agentName = AGENT_CORRECT_MAPPING[subId];
                const subcomponentName = SUBCOMPONENT_NAMES[subId] || `Subcomponent ${index + 1}`;
                return {
                    id: subId,
                    name: subcomponentName,
                    description: agent ? agent.description : "Subcomponent description",
                    score: testCompany.blockScores[blockId] ? 
                        testCompany.blockScores[blockId].score + (Math.random() * 10 - 5) : 
                        70 + Math.floor(Math.random() * 20),
                    agentName: agentName,
                    companyContext: {
                        company: testCompany.name,
                        blockScore: testCompany.blockScores[blockId]
                    }
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
    
    // Route: GET /api/subcomponents/:id/history
    const historyMatch = pathname.match(/^\/api\/subcomponents\/(.+)\/history$/);
    if (historyMatch && req.method === 'GET') {
        const subcomponentId = historyMatch[1];
        const userId = req.headers['x-user-id'] || '1';
        const limit = parseInt(parsedUrl.query.limit) || 10;
        
        console.log(`📊 Fetching score history for subcomponent: ${subcomponentId}`);
        
        try {
            // Get score history from database
            const history = await database.getScoreHistory(subcomponentId, limit);
            
            // Transform the data to match frontend expectations
            const transformedHistory = history.map((entry, index) => {
                // Parse JSON fields if they're strings
                let dimensionScores = {};
                let strengths = [];
                let weaknesses = [];
                let recommendations = [];
                
                try {
                    if (entry.dimension_scores) {
                        dimensionScores = typeof entry.dimension_scores === 'string' ? 
                            JSON.parse(entry.dimension_scores) : entry.dimension_scores;
                    }
                    if (entry.strengths) {
                        strengths = typeof entry.strengths === 'string' ? 
                            JSON.parse(entry.strengths) : entry.strengths;
                    }
                    if (entry.weaknesses) {
                        weaknesses = typeof entry.weaknesses === 'string' ? 
                            JSON.parse(entry.weaknesses) : entry.weaknesses;
                    }
                    if (entry.recommendations) {
                        recommendations = typeof entry.recommendations === 'string' ? 
                            JSON.parse(entry.recommendations) : entry.recommendations;
                    }
                } catch (e) {
                    console.error('Error parsing JSON fields:', e);
                }
                
                // Calculate improvement from previous entry
                let improvement = 0;
                if (index < history.length - 1) {
                    improvement = entry.overall_score - history[index + 1].overall_score;
                }
                
                return {
                    id: entry.id,
                    score: entry.overall_score || 75,
                    timestamp: entry.created_at || new Date().toISOString(),
                    source: 'Audit Score',
                    user: 'ST6C0',
                    subcomponentId: subcomponentId,
                    subcomponentName: entry.subcomponent_name || SUBCOMPONENT_NAMES[subcomponentId],
                    agentName: entry.agent_name || AGENT_CORRECT_MAPPING[subcomponentId],
                    blockName: entry.block_name,
                    analysis: {
                        executiveSummary: `Score: ${entry.overall_score}% - ${entry.subcomponent_name || 'Analysis'}`,
                        detailedScores: dimensionScores,
                        recommendations: recommendations
                    },
                    detailedScores: dimensionScores,
                    recommendations: recommendations,
                    executiveSummary: `Achieved ${entry.overall_score}% score with key strengths in ${strengths.length > 0 ? strengths[0] : 'multiple areas'}`,
                    strengths: strengths,
                    weaknesses: weaknesses,
                    improvement: improvement,
                    sessionId: entry.session_id
                };
            });
            
            console.log(`✅ Returning ${transformedHistory.length} history entries`);
            
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.end(JSON.stringify(transformedHistory));
        } catch (error) {
            console.error('Error fetching score history:', error);
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(500);
            res.end(JSON.stringify({ 
                error: 'Failed to fetch score history',
                message: error.message 
            }));
        }
        return;
    }
    
    // Route: GET /api/subcomponents/:id - NOW USING SSOT
    const subcomponentMatch = pathname.match(/^\/api\/subcomponents\/(.+)$/);
    if (subcomponentMatch && req.method === 'GET') {
        const subcomponentId = subcomponentMatch[1];
        
        try {
            // ✅ GET DATA FROM SSOT REGISTRY
            const ssotData = getSubcomponent(subcomponentId);
            const blockId = parseInt(subcomponentId.split('-')[0]);
            const block = blocks.find(b => b.id === blockId);
            
            console.log(`📍 Loading from SSOT for ${subcomponentId}:`);
            console.log(`   - Subcomponent Name: ${ssotData.name}`);
            console.log(`   - Agent Name: ${ssotData.agent.name}`);
            console.log(`   - Block Name: ${ssotData.blockName}`);
            console.log(`   - Templates: ${ssotData.resources.templates.length}`);
            
            const response = {
                id: subcomponentId,
                name: ssotData.name,
                agent: ssotData.agent.name,
                agentObject: ssotData.agent,
                description: ssotData.agent.description,
                blockName: ssotData.blockName,
                
                // ✅ EDUCATION FROM SSOT - Including Real World Examples
                education: {
                    ...ssotData.education,
                    // Include both use cases (rich format) and examples (backward compatibility)
                    useCases: ssotData.education.useCases || ssotData.education.examples || [],
                    examples: ssotData.education.examples || [],
                    agentInfo: {
                        name: ssotData.agent.name,
                        role: ssotData.agent.description,
                        dimensions: ssotData.analysis.dimensions,
                        criteria: ssotData.analysis.evaluationCriteria
                    }
                },
                
                // ✅ REAL WORLD EXAMPLES - Use rich use cases from SSOT
                realWorldExamples: ssotData.education.useCases || ssotData.education.examples || [],
                
                // ✅ WORKSPACE FROM SSOT
                workspace: {
                    ...ssotData.workspace,
                    questions: generateWorkspaceQuestions(ssotData.agent, subcomponentId)
                },
                
                // ✅ TEMPLATES FROM SSOT
                templates: ssotData.resources.templates,
                resources: {
                    templates: ssotData.resources.templates,
                    domain: ssotData.resources.domain,
                    files: []
                },
                
                // ✅ OUTPUTS FROM SSOT
                outputs: {
                    templates: ssotData.outputs.templates,
                    domain: ssotData.outputs.domain
                },
                
                // ✅ ANALYSIS FROM SSOT
                scoringDimensions: ssotData.analysis.dimensions,
                evaluationCriteria: ssotData.analysis.evaluationCriteria,
                
                companyData: {
                    name: testCompany.name,
                    product: "ScaleOps6Product",
                    metrics: testCompany.profile.keyMetrics
                },
                
                // ✅ ADD SSOT METADATA FOR VALIDATION
                _ssot: {
                    version: ssotData.meta.version,
                    lastValidated: ssotData.meta.lastValidated,
                    isComplete: ssotData.meta.completeness.isComplete,
                    dataSource: 'complete-ssot-registry'
                }
            };
            
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.end(JSON.stringify(response));
            
        } catch (error) {
            console.error(`❌ Error loading subcomponent ${subcomponentId} from SSOT:`, error);
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(404);
            res.end(JSON.stringify({
                error: `Subcomponent not found: ${subcomponentId}`,
                message: error.message
            }));
        }
        return;
    }
    
    
    // Route: POST /api/analysis (ENHANCED with database storage)
    if (pathname === '/api/analysis' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            try {
                const data = JSON.parse(body);
                const { subcomponentId, responses } = data;
                const agent = getAgentForSubcomponent(subcomponentId);
                const agentName = AGENT_CORRECT_MAPPING[subcomponentId];
                
                if (agent) {
                    // Generate session ID
                    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
                    
                    // Create analysis session
                    await database.createAnalysisSession(subcomponentId, sessionId);
                    
                    // Save workspace answers
                    await database.saveWorkspaceAnswers(subcomponentId, responses, sessionId);
                    
                    // Score based on SSOT-defined dimensions (fallback to agent if SSOT missing)
                    let totalScore = 0;
                    let totalWeight = 0;
                    let dimensionScores = {};
                    
                    // Attempt to load dimensions from SSOT for this subcomponent
                    let ssotDimensions = [];
                    try {
                        const ssotData = getSubcomponent(subcomponentId);
                        if (ssotData && ssotData.analysis && Array.isArray(ssotData.analysis.dimensions)) {
                            ssotDimensions = ssotData.analysis.dimensions;
                        }
                    } catch (e) {
                        console.warn(`⚠️ SSOT not available for ${subcomponentId}: ${e.message}`);
                    }
                    
                    const dimensionsToUse = (ssotDimensions && ssotDimensions.length > 0)
                        ? ssotDimensions
                        : (agent.scoringDimensions || []);
                    
                    if (!dimensionsToUse || dimensionsToUse.length === 0) {
                        console.warn(`⚠️ No scoring dimensions found for ${subcomponentId} (agent: ${agentName})`);
                    }
                    
                    dimensionsToUse.forEach((dimension, index) => {
                        // Try multiple key patterns to map responses to dimensions
                        // Prepare a sequential fallback list of responses (non-empty)
                        const responsesList = Object.values(responses || {}).filter(v => v !== undefined && v !== null && String(v).trim() !== '');
                        
                        let response =
                            responses[`q${index + 1}`] ??
                            responses[`dimension-${index + 1}`] ??
                            responses[dimension.name];
                        
                        // If no direct match, use nth available response as fallback
                        if ((response === undefined || response === null) && responsesList.length > index) {
                            response = responsesList[index];
                        }
                        
                        // If still nothing, try first available as a last resort
                        if (response === undefined || response === null) {
                            response = responsesList[0];
                        }
                        
                        // Score calculation
                        let score = 0;
                        if (typeof response === 'number') {
                            // If 1-5 Likert, convert to percentage; if already 0-100, clamp
                            score = response <= 5 ? (response / 5) * 100 : Math.min(100, response);
                        } else if (typeof response === 'string') {
                            // Heuristic: length-based proxy score for text responses
                            score = Math.min(100, 50 + (response.length / 10));
                        } else {
                            score = 50; // neutral default
                        }
                        
                        const weight = (typeof dimension.weight === 'number') ? dimension.weight : 20;
                        
                        // Record in object map for persistence/PDF
                        dimensionScores[dimension.name] = Math.round(score);
                        
                        // Also build an array with weight so frontend can show correct 20% weight
                        if (!Array.isArray(globalThis.__dimensionArrayTemp)) {
                            globalThis.__dimensionArrayTemp = [];
                        }
                        globalThis.__dimensionArrayTemp.push({
                            dimension: dimension.name,
                            name: dimension.name,
                            score: Math.round(score),
                            weight: weight
                        });
                        
                        totalScore += score * weight;
                        totalWeight += weight;
                    });
                    
                    const finalScore = totalWeight > 0 ? Math.round(totalScore / totalWeight) : 75;
                    
                    // Get expert recommendations from database
                    const expertRecommendations = await database.getExpertRecommendations(subcomponentId);
                    
                    // Generate analysis
                    const subcomponentName = SUBCOMPONENT_NAMES[subcomponentId] || `Subcomponent ${subcomponentId}`;
                    const blockId = parseInt(subcomponentId.split('-')[0]);
                    const block = blocks.find(b => b.id === blockId);
                    
                    const strengths = generateStrengths(dimensionScores, agent);
                    const weaknesses = generateWeaknesses(dimensionScores, agent);
                    const recommendations = expertRecommendations.length > 0 ? 
                        expertRecommendations.map(r => ({
                            title: r.title,
                            description: r.description,
                            priority: r.priority,
                            impactScore: r.impact_score,
                            estimatedTime: r.estimated_time
                        })) : 
                        generateDefaultRecommendations(dimensionScores, agent);
                    
                    // Build dimensions array from temp (if created), then clear temp
                    const dimensionArray = Array.isArray(globalThis.__dimensionArrayTemp) ? globalThis.__dimensionArrayTemp : [];
                    globalThis.__dimensionArrayTemp = [];
                    
                    const analysis = {
                        score: finalScore,
                        overallScore: finalScore,
                        agentName: agentName,
                        subcomponentName: subcomponentName,
                        blockName: block ? block.name : 'Unknown',
                        timestamp: new Date().toISOString(),
                        sessionId: sessionId,
                        company: testCompany.name,
                        product: "ScaleOps6Product",
                        // Keep object for persistence/exports
                        dimensionScores: dimensionScores,
                        // Provide array (with weights) for frontend display
                        dimensions: dimensionArray,
                        strengths: strengths,
                        weaknesses: weaknesses,
                        recommendations: recommendations,
                        nextSteps: generateNextSteps(subcomponentId, finalScore, testCompany)
                    };
                    
                    // Save score history to database
                    await database.saveScoreHistory({
                        subcomponentId: subcomponentId,
                        subcomponentName: subcomponentName,
                        agentName: agentName,
                        blockName: block ? block.name : 'Unknown',
                        overallScore: finalScore,
                        dimensionScores: dimensionScores,
                        strengths: strengths,
                        weaknesses: weaknesses,
                        recommendations: recommendations,
                        answers: responses,
                        sessionId: sessionId
                    });
                    
                    // Update analysis session
                    await database.updateAnalysisSession(sessionId, {
                        status: 'completed',
                        score: finalScore,
                        analysis: analysis
                    });
                    
                    // Log analytics event
                    await database.logAnalyticsEvent('analysis_completed', subcomponentId, {
                        score: finalScore,
                        sessionId: sessionId
                    });
                    
                    res.setHeader('Content-Type', 'application/json');
                    res.writeHead(200);
                    res.end(JSON.stringify(analysis));
                } else {
                    res.setHeader('Content-Type', 'application/json');
                    res.writeHead(404);
                    res.end(JSON.stringify({ error: "Agent not found" }));
                }
            } catch (error) {
                console.error('Error in analysis:', error);
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(400);
                res.end(JSON.stringify({ error: "Invalid request data: " + error.message }));
            }
        });
        return;
    }
    
    // ==================== STATIC FILE SERVING ====================
    
    let filePath = '.' + pathname.split('?')[0];
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

// Helper functions for analysis generation
function generateStrengths(dimensionScores, agent) {
    const strengths = [];
    
    Object.entries(dimensionScores).forEach(([dimension, score]) => {
        if (score >= 80) {
            strengths.push(`Exceptional performance in ${dimension} (${score}%)`);
        } else if (score >= 70) {
            strengths.push(`Strong foundation in ${dimension} (${score}%)`);
        } else if (score >= 60) {
            strengths.push(`Developing capability in ${dimension} (${score}%)`);
        }
    });
    
    return strengths;
}

function generateWeaknesses(dimensionScores, agent) {
    const weaknesses = [];
    
    Object.entries(dimensionScores).forEach(([dimension, score]) => {
        if (score < 50) {
            weaknesses.push(`Critical gap in ${dimension} (${score}%) requiring immediate attention`);
        } else if (score < 60) {
            weaknesses.push(`${dimension} needs improvement (${score}%)`);
        } else if (score < 70) {
            weaknesses.push(`${dimension} has optimization potential (${score}%)`);
        }
    });
    
    return weaknesses;
}

function generateDefaultRecommendations(dimensionScores, agent) {
    const recommendations = [];
    
    Object.entries(dimensionScores).forEach(([dimension, score]) => {
        if (score < 70) {
            recommendations.push({
                title: `Improve ${dimension}`,
                description: `Focus on enhancing ${dimension} to reach the 80% excellence threshold`,
                priority: score < 50 ? 'high' : 'medium',
                impactScore: 100 - score,
                estimatedTime: '30-60 days'
            });
        }
    });
    
    return recommendations;
}

function generateNextSteps(subcomponentId, score, company) {
    const nextSteps = [];
    
    if (score < 60) {
        nextSteps.push("Schedule deep-dive assessment session");
        nextSteps.push("Review foundational requirements");
        nextSteps.push("Create 30-day improvement plan");
    } else if (score < 80) {
        nextSteps.push("Implement quick wins identified");
        nextSteps.push("Establish measurement framework");
        nextSteps.push("Schedule follow-up assessment in 30 days");
    } else {
        nextSteps.push("Document best practices");
        nextSteps.push("Share learnings with team");
        nextSteps.push("Explore advanced optimization opportunities");
    }
    
    return nextSteps;
}

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`\n🚀 Enhanced Server with Full Backend Support`);
    console.log(`📊 Open http://localhost:${PORT}/dashboard.html to view the application`);
    console.log(`\n✅ Backend Services:`);
    console.log(`  • Database: SQLite with full schema`);
    console.log(`  • PDF Generation: PDFKit`);
    console.log(`  • DOCX Generation: docx library`);
    console.log(`  • File Storage: ./generated/`);
    console.log(`\n📡 New API Endpoints:`);
    console.log(`  POST /api/generate-pdf/:subcomponentId`);
    console.log(`  POST /api/generate-docx/:subcomponentId`);
    console.log(`  GET  /api/generate-template/:subcomponentId/:type`);
    console.log(`  GET  /api/score-history-db/:subcomponentId`);
    console.log(`  POST /api/save-score-history`);
    console.log(`  GET  /api/expert-recommendations/:subcomponentId`);
    console.log(`  GET  /api/templates/:subcomponentId`);
    console.log(`  GET  /api/generated-documents/:subcomponentId`);
    console.log(`  POST /api/save-workspace-answers`);
    console.log(`  GET  /api/workspace-answers/:subcomponentId`);
    console.log(`  GET  /generated/* (file downloads)`);
    console.log(`\n💾 Database Features:`);
    console.log(`  • Score history persistence`);
    console.log(`  • Workspace answer storage`);
    console.log(`  • Expert recommendations`);
    console.log(`  • Analytics tracking`);
    console.log(`  • Document generation tracking`);
});
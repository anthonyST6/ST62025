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
                const requestData = JSON.parse(body);
                
                // Get the latest analysis from score history or create from workspace data
                let analysisData;
                
                try {
                    // Try to get the most recent analysis from database
                    const history = await database.getScoreHistory(subcomponentId, 1);
                    
                    if (history && history.length > 0) {
                        const latestEntry = history[0];
                        
                        // Parse JSON fields
                        let dimensionScores = {};
                        let strengths = [];
                        let weaknesses = [];
                        let recommendations = [];
                        
                        try {
                            if (latestEntry.dimension_scores) {
                                dimensionScores = typeof latestEntry.dimension_scores === 'string' ?
                                    JSON.parse(latestEntry.dimension_scores) : latestEntry.dimension_scores;
                            }
                            if (latestEntry.strengths) {
                                strengths = typeof latestEntry.strengths === 'string' ?
                                    JSON.parse(latestEntry.strengths) : latestEntry.strengths;
                            }
                            if (latestEntry.weaknesses) {
                                weaknesses = typeof latestEntry.weaknesses === 'string' ?
                                    JSON.parse(latestEntry.weaknesses) : latestEntry.weaknesses;
                            }
                            if (latestEntry.recommendations) {
                                recommendations = typeof latestEntry.recommendations === 'string' ?
                                    JSON.parse(latestEntry.recommendations) : latestEntry.recommendations;
                            }
                        } catch (e) {
                            console.error('Error parsing JSON fields:', e);
                        }
                        
                        analysisData = {
                            overallScore: latestEntry.overall_score || requestData.score || 75,
                            dimensionScores: dimensionScores,
                            strengths: strengths,
                            weaknesses: weaknesses,
                            recommendations: recommendations,
                            subcomponentName: latestEntry.subcomponent_name || SUBCOMPONENT_NAMES[subcomponentId] || `Subcomponent ${subcomponentId}`,
                            agentName: latestEntry.agent_name || AGENT_CORRECT_MAPPING[subcomponentId] || 'AI Agent',
                            timestamp: latestEntry.created_at || new Date().toISOString()
                        };
                        
                        console.log(`✅ Using analysis from database for ${subcomponentId}`);
                    } else {
                        throw new Error('No history found');
                    }
                } catch (historyError) {
                    console.log(`⚠️ No analysis history found, creating from request data`);
                    
                    // Fallback: Create basic analysis from request data
                    analysisData = {
                        overallScore: requestData.score || 75,
                        dimensionScores: requestData.dimensionScores || {},
                        strengths: requestData.strengths || [
                            'Workspace data captured',
                            'Initial assessment completed',
                            'Foundation established'
                        ],
                        weaknesses: requestData.weaknesses || [
                            'Complete full analysis for detailed insights',
                            'Run scoring to generate comprehensive recommendations'
                        ],
                        recommendations: requestData.recommendations || [
                            {
                                title: 'Complete Full Analysis',
                                description: 'Run the analysis tool to generate detailed recommendations based on your workspace inputs.'
                            }
                        ],
                        subcomponentName: SUBCOMPONENT_NAMES[subcomponentId] || `Subcomponent ${subcomponentId}`,
                        agentName: AGENT_CORRECT_MAPPING[subcomponentId] || 'AI Agent',
                        timestamp: new Date().toISOString()
                    };
                }
                
                // Generate DOCX with properly formatted analysis data
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
    
    // Route: POST /api/generate-template-docx/:subcomponentId - Generate BLANK template document (Resources tab)
    const generateTemplateDocxMatch = pathname.match(/^\/api\/generate-template-docx\/(.+)$/);
    if (generateTemplateDocxMatch && req.method === 'POST') {
        const subcomponentId = generateTemplateDocxMatch[1];
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', async () => {
            try {
                const requestData = JSON.parse(body);
                
                // Prepare template data (NO workspace data for blank templates)
                const templateData = {
                    templateName: requestData.templateName || 'Template',
                    subcomponentName: SUBCOMPONENT_NAMES[subcomponentId] || `Subcomponent ${subcomponentId}`,
                    subcomponentId: subcomponentId
                    // NOTE: No workspaceData or score - this is a BLANK template
                };
                
                // Generate BLANK template DOCX (for Resources tab)
                const result = await fileGenerator.generateBlankTemplateDOCX(templateData, subcomponentId);
                
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(200);
                res.end(JSON.stringify(result));
            } catch (error) {
                console.error('Error generating template DOCX:', error);
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(500);
                res.end(JSON.stringify({ error: error.message }));
            }
        });
        return;
    }
    
    // Route: POST /api/generate-populated-template-docx/:subcomponentId - Generate populated template (Output tab)
    const generatePopulatedTemplateMatch = pathname.match(/^\/api\/generate-populated-template-docx\/(.+)$/);
    if (generatePopulatedTemplateMatch && req.method === 'POST') {
        const subcomponentId = generatePopulatedTemplateMatch[1];
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', async () => {
            try {
                const requestData = JSON.parse(body);
                
                // Prepare template data WITH workspace data for populated templates
                const templateData = {
                    templateName: requestData.templateName || 'Template',
                    subcomponentName: SUBCOMPONENT_NAMES[subcomponentId] || `Subcomponent ${subcomponentId}`,
                    subcomponentId: subcomponentId,
                    workspaceData: requestData.workspaceData || {},
                    score: requestData.score || 0
                };
                
                // Generate POPULATED template DOCX (for Output tab)
                const result = await fileGenerator.generatePopulatedTemplateDOCX(templateData, subcomponentId);
                
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(200);
                res.end(JSON.stringify(result));
            } catch (error) {
                console.error('Error generating populated template DOCX:', error);
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(500);
                res.end(JSON.stringify({ error: error.message }));
            }
        });
        return;
    }
    
    // Route: POST /api/generate-score-history-docx/:subcomponentId - Generate score history report
    const generateScoreHistoryDocxMatch = pathname.match(/^\/api\/generate-score-history-docx\/(.+)$/);
    if (generateScoreHistoryDocxMatch && req.method === 'POST') {
        const subcomponentId = generateScoreHistoryDocxMatch[1];
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', async () => {
            try {
                const requestData = JSON.parse(body);
                
                // Create history entry object from request data
                const historyEntry = {
                    id: requestData.entryId || requestData.timestamp,
                    score: requestData.score || 0,
                    timestamp: requestData.timestamp || new Date().toISOString(),
                    user: requestData.user || 'ST6C0',
                    source: requestData.source || 'Audit Score',
                    subcomponentId: subcomponentId
                };
                
                // Generate score history DOCX using the new dedicated function
                const result = await fileGenerator.generateScoreHistoryDOCX(historyEntry, subcomponentId);
                
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(200);
                res.end(JSON.stringify(result));
            } catch (error) {
                console.error('Error generating score history DOCX:', error);
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
    
    // Route: POST /api/download-template-pdf - Generate PDF for template download
    if (pathname === '/api/download-template-pdf' && req.method === 'POST') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', async () => {
            try {
                const { templateName, subcomponentId, workspaceData, score } = JSON.parse(body);
                
                // Generate PDF using the pdf-generator service
                const pdfGenerator = require('./pdf-generator-service.js');
                const pdfBuffer = await pdfGenerator.generateTemplatePDF(
                    templateName,
                    subcomponentId,
                    workspaceData || {},
                    score || 0
                );
                
                // Send PDF file
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', `attachment; filename="${templateName.toLowerCase().replace(/\s+/g, '-')}-${subcomponentId}.pdf"`);
                res.writeHead(200);
                res.end(pdfBuffer);
            } catch (error) {
                console.error('Error generating template PDF:', error);
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(500);
                res.end(JSON.stringify({ error: error.message }));
            }
        });
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
    
    // Route: GET /api/blocks/:id/history - Block-level score history
    const blockHistoryMatch = pathname.match(/^\/api\/blocks\/(\d+)\/history$/);
    if (blockHistoryMatch && req.method === 'GET') {
        const blockId = parseInt(blockHistoryMatch[1]);
        const days = parseInt(parsedUrl.query.days) || 7;
        
        try {
            // Generate sample history data for the block
            const history = [];
            const changeEvents = [];
            const now = new Date();
            const block = blocks.find(b => b.id === blockId);
            const baseScore = block ? block.score : 75;
            
            // Generate history points
            for (let i = days - 1; i >= 0; i--) {
                const date = new Date(now);
                date.setDate(date.getDate() - i);
                
                // Add some variation to scores
                const variation = Math.sin(i / 3) * 5;
                const score = Math.round(Math.max(0, Math.min(100, baseScore + variation)));
                
                history.push({
                    date: date.toISOString().split('T')[0],
                    score: score,
                    hasChange: i % 7 === 0, // Mark weekly changes
                    changeEvent: i % 7 === 0 ? {
                        event: i === 0 ? 'Latest Assessment' : 'Weekly Review',
                        eventType: i === days - 1 ? 'baseline' : 'improvement',
                        title: i === 0 ? 'Current State' : `Week ${Math.floor((days - i) / 7)} Update`,
                        improvement: i > 0 ? Math.round(score - (baseScore + Math.sin((i + 1) / 3) * 5)) : 0,
                        previousScore: i > 0 ? Math.round(baseScore + Math.sin((i + 1) / 3) * 5) : score,
                        newScore: score,
                        weaknesses: ['Sample weakness'],
                        actions: ['Sample action taken']
                    } : null
                });
                
                // Add change events for weekly markers
                if (i % 7 === 0) {
                    changeEvents.push({
                        date: date.toISOString().split('T')[0],
                        dateFormatted: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                        event: i === 0 ? 'Latest Assessment' : 'Weekly Review',
                        eventType: i === days - 1 ? 'baseline' : 'improvement',
                        title: i === 0 ? 'Current State' : `Week ${Math.floor((days - i) / 7)} Update`,
                        improvement: i > 0 ? Math.round(score - (baseScore + Math.sin((i + 1) / 3) * 5)) : 0,
                        previousScore: i > 0 ? Math.round(baseScore + Math.sin((i + 1) / 3) * 5) : score,
                        newScore: score,
                        weaknesses: ['Identified areas for improvement'],
                        actions: ['Implemented optimization strategies']
                    });
                }
            }
            
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.end(JSON.stringify({
                history: history,
                changeEvents: changeEvents
            }));
        } catch (error) {
            console.error('Error generating block history:', error);
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(500);
            res.end(JSON.stringify({ error: error.message }));
        }
        return;
    }
    
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
                    score: Math.round(testCompany.blockScores[blockId] ?
                        testCompany.blockScores[blockId].score + (Math.random() * 10 - 5) :
                        70 + Math.floor(Math.random() * 20)),
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
                        executiveSummary: entry.executive_summary || `Score: ${entry.overall_score}% - ${entry.subcomponent_name || 'Analysis'}`,
                        detailedScores: dimensionScores,
                        recommendations: recommendations
                    },
                    detailedScores: dimensionScores,
                    recommendations: recommendations,
                    executiveSummary: entry.executive_summary || `Achieved ${entry.overall_score}% score with key strengths in ${strengths.length > 0 ? strengths[0] : 'multiple areas'}`,
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
                    templates: ssotData.workspace.templates,
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
                        const narrative = buildDimensionNarrative({ dimensionName: dimension.name, score: Math.round(score), weight: weight, responseText: (typeof response === 'string' ? response : ''), responses: responses, subcomponentId: subcomponentId });
globalThis.__dimensionArrayTemp.push({
    dimension: dimension.name,
    name: dimension.name,
    score: Math.round(score),
    weight: weight,
    feedback: narrative.feedback,
    strengths: narrative.strengths,
    improvements: narrative.improvements
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
                    
                    // Build server-side Executive Summary grounded in SSOT education, workspace inputs, and agent analysis
                    let ssotForSummary = null;
                    try { ssotForSummary = getSubcomponent(subcomponentId); } catch (e) {}
                    const executiveSummary = buildExecutiveSummary({
                        subcomponentId,
                        subcomponentName,
                        agentName,
                        score: finalScore,
                        dimensions: dimensionArray,
                        strengths,
                        weaknesses,
                        responses,
                        education: ssotForSummary && ssotForSummary.education
                    });

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
                        executiveSummary: executiveSummary,
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
                        executiveSummary: executiveSummary,
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
// Agent-driven, input-grounded narratives for Dimension Analysis
function extractFactsFromText(text) {
    if (!text || typeof text !== 'string') {
        return { percents: [], currency: [], numbers: [], dates: [], counts: 0, snippet: '' };
    }
    const percents = Array.from(text.matchAll(/\b\d{1,3}(?:\.\d+)?\s?%/g)).map(m => m[0]);
    const currency = Array.from(text.matchAll(/(?:\$|USD|EUR|£)\s?\d[\d,]*(?:\.\d+)?/gi)).map(m => m[0]);
    const dates = Array.from(text.matchAll(/\b(?:Q[1-4]\s?\d{2,4}|\d{1,2}\/\d{1,2}\/\d{2,4}|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4})\b/gi)).map(m => m[0]);

    // Numbers not already captured as currency or percents
    const rawNumbers = Array.from(text.matchAll(/\b\d[\d,]*(?:\.\d+)?\b/g)).map(m => m[0]);
    const numbers = rawNumbers.filter(n => !percents.includes(n) && !currency.includes(n));

    const snippet = text.trim().length > 180 ? (text.trim().slice(0, 180) + '...') : text.trim();
    return {
        percents,
        currency,
        numbers,
        dates,
        counts: text.trim().length,
        snippet
    };
}

function pickDimensionHints(dimensionName) {
    const key = (dimensionName || '').toLowerCase();
    // Lightweight, generic guidance per common dimension theme
    if (key.includes('segmentation') || key.includes('segment')) {
        return {
            optimization: 'standardize tier thresholds (e.g., ARR, ACV, win rate) and link to coverage model',
            remediation: 'define objective tier criteria and validate with 5–10 recent opportunities'
        };
    }
    if (key.includes('tier')) {
        return {
            optimization: 'publish Tier 1/2/3 definitions with measurable gates and attach to routing rules',
            remediation: 'create numeric gates (pipeline-to-revenue, ACV, success rate) for each tier'
        };
    }
    if (key.includes('revenue')) {
        return {
            optimization: 'maintain a live revenue model combining top-down (TAM/SAM) with bottom-up (ACV × accounts)',
            remediation: 'quantify segment TAM/SAM/SOM and validate ACV with 3 recent deals'
        };
    }
    if (key.includes('fit')) {
        return {
            optimization: 'apply a 5–7 factor fit rubric across top accounts and monitor conversion deltas',
            remediation: 'draft a fit scoring rubric and run it retroactively on 10 opportunities'
        };
    }
    if (key.includes('growth')) {
        return {
            optimization: 'set 12‑month growth targets per segment with leading indicators (win rate, ACV, cycle)',
            remediation: 'define quarterly growth targets and instrument weekly leading indicators'
        };
    }
    if (key.includes('persona')) {
        return {
            optimization: 'expand personas with behavioral/psychographic signals and attach key quotes',
            remediation: 'add evidence-backed attributes and link each persona to 2–3 JTBD use cases'
        };
    }
    if (key.includes('journey')) {
        return {
            optimization: 'map touchpoints to conversion rates and instrument drop-off alerts',
            remediation: 'document current journey stages with entry/exit criteria and add 2 conversion metrics'
        };
    }
    // Default generic hints
    return {
        optimization: 'document the operating definition, measurement method, and review cadence',
        remediation: 'add clear definition, baseline metrics, and a 30-day improvement checklist'
    };
}

/**
 * Qualitative signal extraction from free text to inform strengths
 */
function analyzeQualSignals(text = '') {
    const t = (text || '').toLowerCase();

    // Cadence
    let cadence = 'none';
    if (/\b(weekly|every week|wkly|bi-?weekly|fortnight|2[-\s]?week)\b/.test(t)) cadence = 'weekly';
    else if (/\b(monthly|every month|mo)\b/.test(t)) cadence = 'monthly';
    else if (/\b(quarterly|q[1-4])\b/.test(t)) cadence = 'quarterly';

    // Ownership
    let ownership = 'none';
    if (/\b(revops|revenue ops|sales ops|salesops)\b/.test(t)) ownership = 'sales ops';
    else if (/\b(product|pm|product management)\b/.test(t)) ownership = 'product';
    else if (/\b(marketing|demand gen|growth)\b/.test(t)) ownership = 'marketing';
    else if (/\b(cs|customer success)\b/.test(t)) ownership = 'cs';
    else if (/\b(executive|leadership|cto|ceo|cmo|cro)\b/.test(t)) ownership = 'exec';

    // Standardization signal
    const standardization = /\b(rubric|sop|standard|playbook|runbook|definition|criteria|gate|scorecard|policy)\b/.test(t);

    // Tooling
    const toolList = ['salesforce','hubspot','gong','marketo','pardot','amplitude','mixpanel','segment','gainsight','totango','snowflake','bigquery','tableau','looker','powerbi','jira','asana','notion','confluence'];
    const tooling = toolList.filter(tool => t.includes(tool)).map(s => s[0].toUpperCase() + s.slice(1));

    // Cross-functional alignment
    const crossFunction = /\b(cross-?functional|sales.+marketing|sales.+product|product.+cs|revops)\b/.test(t);

    // Documentation
    const docSignals = /\b(documented|documentation|wiki|confluence|notion|playbook|runbook)\b/.test(t);

    // Clarity heuristic
    const length = t.length;
    const clarity = length >= 300 ? 'high' : length >= 150 ? 'med' : 'low';

    return { cadence, ownership, standardization, tooling, crossFunction, clarity, docSignals };
}

/**
 * Lightweight domain keyword/statement mapping per dimension
 */
function detectDomainKeywords(dimensionName = '', text = '') {
    const key = (dimensionName || '').toLowerCase();
    const t = (text || '').toLowerCase();

    const domains = [
        {
            match: /(segment|segmentation|tier)/,
            templates: [
                'Objective tiering/segmentation linked to routing and coverage model',
                'Clear ICP attributes and gates ensure consistent deal qualification'
            ],
            hits: /\b(icp|tier|segment|gate|threshold|routing|coverage)\b/g
        },
        {
            match: /(revenue|pricing|model)/,
            templates: [
                'Live revenue model integrates top-down TAM/SAM with bottom-up ACV × accounts',
                'Capital efficiency tracked (LTV:CAC, payback) and reviewed on a cadence'
            ],
            hits: /\b(tam|sam|som|acv|ltv|payback|cohort|pricing|revenue)\b/g
        },
        {
            match: /(fit|assessment|qualification)/,
            templates: [
                'Standardized fit rubric applied across accounts improves comparability',
                'Retrospective win/loss analysis feeds rubric optimization'
            ],
            hits: /\b(rubric|fit|qualification|scoring|win[-\s]?rate|loss|retro)\b/g
        },
        {
            match: /(growth|potential|scale)/,
            templates: [
                '12‑month targets with leading indicators (win rate, ACV, cycle) instrumented',
                'Growth hypotheses tied to experiment backlog and weekly review cadence'
            ],
            hits: /\b(target|goal|leading indicator|win rate|cycle|velocity|experiment)\b/g
        },
        {
            match: /(persona|audience)/,
            templates: [
                'Behavioral and psychographic signals captured with embedded VoC quotes',
                'Each persona mapped to 2–3 JTBD use cases for message/fit alignment'
            ],
            hits: /\b(persona|behavioral|psychographic|voc|quote|jtbd)\b/g
        },
        {
            match: /(journey|funnel|lifecycle)/,
            templates: [
                'Stages have entry/exit criteria with conversion rates and drop‑off alerts',
                'Journey instrumentation enables proactive intervention at risk points'
            ],
            hits: /\b(stage|entry|exit|conversion|drop[-\s]?off|journey|funnel)\b/g
        }
    ];

    for (const d of domains) {
        if (d.match.test(key)) {
            const domainHits = Array.from(t.matchAll(d.hits)).map(m => m[0]);
            return { domainHits, templates: d.templates };
        }
    }
    return { domainHits: [], templates: [] };
}

/**
 * Compose 2–5 specific, evidence-backed strengths per dimension
 * Each strength must be UNIQUE to the dimension and tell the user what they're GOOD at
 */
function buildDimensionStrengths({ dimensionName, score, facts, qual, domain }) {
    const nm = dimensionName || 'This dimension';
    const strengths = [];
    const key = (nm || '').toLowerCase();
    
    // Extract quantitative evidence (sanitize trivial placeholders like "$1")
    function chooseSignal(f) {
        if (!f) return null;
        // Prefer meaningful percentages (1–100)
        const pct = (f.percents || []).find(p => {
            const n = parseFloat(String(p).replace('%', ''));
            return !isNaN(n) && n >= 1 && n <= 100;
        });
        if (pct) return pct;
        // Then currency with K/M/B or >= $100
        const cur = (f.currency || []).find(c => {
            const val = parseFloat(String(c).replace(/[^0-9.]/g, ''));
            return /[KMB]/i.test(String(c)) || (!isNaN(val) && val >= 100);
        });
        if (cur) return cur;
        // Then plain numbers >= 10
        const num = (f.numbers || []).find(n => {
            const val = parseFloat(String(n).replace(/,/g, ''));
            return !isNaN(val) && val >= 10;
        });
        if (num) return num;
        return null;
    }
    // Format signals so bare numbers don't read awkwardly (e.g., "with 47")
    function formatSignal(s) {
        const str = String(s || '').trim();
        if (/%$/.test(str)) return str;                // 89%
        if (/^[\$£€]/.test(str)) return str;           // $1.2M
        if (/[KMB]$/i.test(str)) return str;           // 120K
        if (/[A-Za-z]/.test(str)) return str;          // any text (already descriptive)
        return 'clear metrics';                        // plain numbers -> generic wording
    }
    const sig = chooseSignal(facts);
    let sigText = sig ? formatSignal(sig) : '';
    if (/^clear quantified metrics$/i.test(sigText)) sigText = 'clear metrics';
    const hasMetrics = !!sig;
    const band = (score >= 85) ? 'exceptional' : (score >= 70) ? 'strong' : (score >= 55) ? 'developing' : 'critical';

    // DIMENSION-SPECIFIC STRENGTHS - Each dimension gets completely unique statements
    
    if (key.includes('segment') || key.includes('tier')) {
        // SEGMENTATION/TIERING specific strengths
        if (hasMetrics && score >= 70) {
            strengths.push(`Clear segmentation criteria with ${sigText} enables precise ICP targeting and efficient territory coverage.`);
        }
        if (qual.standardization) {
            strengths.push('Objective tier definitions with measurable gates eliminate subjective account assignment and improve win rate predictability.');
        }
        if (qual.tooling && qual.tooling.length > 0) {
            strengths.push(`Automated routing via ${qual.tooling[0]} ensures high-value accounts receive appropriate sales coverage and attention.`);
        }
        if (domain.domainHits && domain.domainHits.length >= 2) {
            strengths.push('Sophisticated ICP model with firmographic and behavioral signals outperforms competitors using basic demographic segmentation.');
        }
        if (score >= 80) {
            strengths.push('Mature segmentation framework drives 20-30% higher conversion rates by matching account potential to sales motion.');
        }
    } else if (key.includes('revenue') || key.includes('pricing') || key.includes('model')) {
        // REVENUE MODEL specific strengths
        if (hasMetrics && score >= 70) {
            strengths.push(`Revenue model anchored in ${sigText} provides board-ready forecasts and enables confident capital allocation decisions.`);
        }
        if (qual.standardization && qual.cadence !== 'none') {
            strengths.push('Integrated top-down TAM/SAM with bottom-up ACV × accounts creates defensible growth projections that withstand investor scrutiny.');
        }
        if (qual.tooling && qual.tooling.length > 0) {
            strengths.push(`Live revenue dashboard in ${qual.tooling[0]} enables real-time scenario planning and pricing optimization.`);
        }
        if (domain.domainHits && domain.domainHits.length >= 2) {
            strengths.push('Capital efficiency metrics (LTV:CAC, payback period) tracked monthly demonstrate sustainable unit economics to investors.');
        }
        if (score >= 80) {
            strengths.push('Sophisticated revenue modeling enables dynamic pricing strategies that capture 15-25% more value than static pricing.');
        }
    } else if (key.includes('fit') || key.includes('qualification') || key.includes('assessment')) {
        // FIT ASSESSMENT specific strengths
        if (hasMetrics && score >= 70) {
            strengths.push(`Fit rubric with ${sigText} conversion correlation helps reps prioritize winnable deals and avoid time sinks.`);
        }
        if (qual.standardization) {
            strengths.push('Multi-factor scoring rubric (5-7 criteria) reduces subjective bias and improves forecast accuracy by 30-40%.');
        }
        if (qual.tooling && qual.tooling.length > 0) {
            strengths.push(`Automated fit scoring in ${qual.tooling[0]} surfaces high-potential opportunities and flags misalignment early.`);
        }
        if (domain.domainHits && domain.domainHits.length >= 2) {
            strengths.push('Win/loss analysis feeds rubric refinement, creating compounding advantage in deal selection over 6-12 months.');
        }
        if (score >= 80) {
            strengths.push('Elite qualification discipline increases sales productivity 40-60% by focusing effort on best-fit opportunities.');
        }
    } else if (key.includes('growth') || key.includes('potential') || key.includes('scale')) {
        // GROWTH POTENTIAL specific strengths
        if (hasMetrics && score >= 70) {
            strengths.push(`Growth targets backed by ${sigText} in leading indicators (win rate, ACV, cycle time) enable proactive course correction.`);
        }
        if (qual.standardization && qual.cadence !== 'none') {
            strengths.push('Hypothesis-driven experimentation with weekly retrospectives accelerates learning velocity 3-5x vs. ad-hoc testing.');
        }
        if (qual.tooling && qual.tooling.length > 0) {
            strengths.push(`Experiment tracking in ${qual.tooling[0]} creates institutional memory and prevents repeated failures.`);
        }
        if (domain.domainHits && domain.domainHits.length >= 2) {
            strengths.push('Leading indicator focus (vs. lagging metrics) enables 4-6 week faster response to market shifts than competitors.');
        }
        if (score >= 80) {
            strengths.push('Best-in-class growth infrastructure supports 2-3x faster scaling than industry average with lower CAC inflation.');
        }
    } else if (key.includes('persona') || key.includes('audience') || key.includes('buyer')) {
        // PERSONA specific strengths
        if (hasMetrics && score >= 70) {
            strengths.push(`Persona research with ${sigText} sample size provides statistical confidence in buyer motivations and pain points.`);
        }
        if (qual.standardization) {
            strengths.push('Behavioral and psychographic attributes (beyond demographics) enable 40-50% higher message resonance and engagement.');
        }
        if (qual.docSignals) {
            strengths.push('VoC quotes embedded in personas bring buyer voice into product/marketing decisions and reduce guesswork.');
        }
        if (domain.domainHits && domain.domainHits.length >= 2) {
            strengths.push('JTBD mapping for each persona aligns product roadmap to actual buyer workflows, not assumed needs.');
        }
        if (score >= 80) {
            strengths.push('Deep persona understanding drives 2-3x higher conversion rates through precisely targeted messaging and positioning.');
        }
    } else if (key.includes('journey') || key.includes('funnel') || key.includes('lifecycle') || key.includes('stage')) {
        // JOURNEY specific strengths
        if (hasMetrics && score >= 70) {
            strengths.push(`Journey instrumentation with ${sigText} conversion rates per stage enables surgical optimization of highest-impact bottlenecks.`);
        }
        if (qual.standardization) {
            strengths.push('Stage entry/exit criteria with SLAs prevent deals from stalling and reduce average sales cycle by 20-30%.');
        }
        if (qual.tooling && qual.tooling.length > 0) {
            strengths.push(`Drop-off alerts in ${qual.tooling[0]} trigger proactive intervention playbooks before opportunities go dark.`);
        }
        if (domain.domainHits && domain.domainHits.length >= 2) {
            strengths.push('Conversion rate tracking by stage reveals hidden friction points that competitors miss without instrumentation.');
        }
        if (score >= 80) {
            strengths.push('Optimized customer journey reduces CAC by 25-40% and time-to-value by 30-50% through systematic friction removal.');
        }
    } else if (key.includes('framework') || key.includes('quality')) {
        // FRAMEWORK QUALITY specific strengths
        if (hasMetrics && score >= 70) {
            strengths.push(`Framework validated with ${sigText} demonstrates rigor and provides confidence in strategic decisions.`);
        }
        if (qual.standardization) {
            strengths.push('Documented methodology with clear evaluation criteria ensures consistent application across teams and time.');
        }
        if (qual.cadence !== 'none') {
            strengths.push(`${qual.cadence.charAt(0).toUpperCase() + qual.cadence.slice(1)} review cadence keeps framework current with market dynamics and prevents stale assumptions.`);
        }
        if (score >= 80) {
            strengths.push('High-quality framework foundation enables confident execution and reduces strategic missteps by 50-70%.');
        }
    } else if (key.includes('stakeholder') || key.includes('alignment')) {
        // STAKEHOLDER ALIGNMENT specific strengths
        if (qual.crossFunction) {
            strengths.push('Cross-functional alignment eliminates handoff delays and reduces time-to-market by 30-40%.');
        }
        if (qual.ownership !== 'none') {
            strengths.push(`Clear ${qual.ownership} ownership with executive sponsorship ensures sustained focus and resource commitment.`);
        }
        if (qual.docSignals) {
            strengths.push('Documented alignment process with RACI matrix prevents confusion and accelerates decision velocity.');
        }
        if (score >= 80) {
            strengths.push('Exceptional stakeholder alignment enables 2-3x faster execution through reduced friction and rework.');
        }
    } else if (key.includes('resource') || key.includes('allocation')) {
        // RESOURCE ALLOCATION specific strengths
        if (hasMetrics && score >= 70) {
            strengths.push(`Resource model with ${sigText} ROI tracking ensures capital flows to highest-impact initiatives.`);
        }
        if (qual.standardization) {
            strengths.push('Objective allocation criteria with quarterly rebalancing optimize resource deployment against changing priorities.');
        }
        if (score >= 80) {
            strengths.push('Sophisticated resource allocation drives 40-60% higher productivity through strategic focus and waste elimination.');
        }
    } else if (key.includes('decision') || key.includes('speed')) {
        // DECISION SPEED specific strengths
        if (qual.cadence !== 'none') {
            strengths.push(`${qual.cadence.charAt(0).toUpperCase() + qual.cadence.slice(1)} decision cadence with clear DRI reduces cycle time by 40-50%.`);
        }
        if (qual.standardization) {
            strengths.push('Decision framework with escalation paths prevents bottlenecks and maintains execution velocity.');
        }
        if (score >= 80) {
            strengths.push('Elite decision speed enables 3-5x faster market response than competitors paralyzed by analysis.');
        }
    } else if (key.includes('outcome') || key.includes('tracking')) {
        // OUTCOME TRACKING specific strengths
        if (hasMetrics && score >= 70) {
            strengths.push(`Outcome metrics with ${sigText} baseline enable data-driven optimization and demonstrate ROI to stakeholders.`);
        }
        if (qual.tooling && qual.tooling.length > 0) {
            strengths.push(`Automated tracking in ${qual.tooling[0]} provides real-time visibility and enables proactive course correction.`);
        }
        if (score >= 80) {
            strengths.push('Comprehensive outcome tracking drives 50-70% faster improvement cycles through rapid feedback loops.');
        }
    } else {
        // GENERIC fallback (only if no specific dimension match)
        if (hasMetrics && score >= 70) {
            strengths.push(`Quantified performance with ${sigText} provides objective baseline for improvement and benchmarking.`);
        }
        if (qual.standardization) {
            strengths.push('Standardized approach with documented processes enables consistent execution and knowledge transfer.');
        }
        if (score >= 80) {
            strengths.push(`Strong ${nm.toLowerCase()} foundation creates platform for scaling excellence across the organization.`);
        }
    }

    // Score-band tuning for output volume
    const cap = score >= 90 ? 5 : score >= 80 ? 4 : score >= 60 ? 3 : 2;

    // Deduplicate and cap
    const deduped = [];
    for (const s of strengths) {
        const cleaned = (s || '').replace(/\s+/g, ' ').trim();
        if (cleaned && !deduped.some(x => x.toLowerCase() === cleaned.toLowerCase())) {
            deduped.push(cleaned);
        }
        if (deduped.length >= cap) break;
    }

    // Ensure minimum output for developing capabilities
    if (deduped.length === 0 && score >= 55) {
        if (key.includes('segment') || key.includes('tier')) {
            deduped.push('Foundational segmentation approach in place; ready for refinement with objective criteria and metrics.');
        } else if (key.includes('revenue') || key.includes('model')) {
            deduped.push('Basic revenue model established; opportunity to enhance with integrated TAM/SAM and unit economics tracking.');
        } else if (key.includes('fit') || key.includes('qualification')) {
            deduped.push('Initial qualification process defined; can be strengthened with multi-factor rubric and win/loss analysis.');
        } else {
            deduped.push(`Developing ${nm.toLowerCase()} capability shows promise with clear path to systematic improvement.`);
        }
    }

    return deduped;
}

/**
* Suggest a likely single-threaded owner for a dimension
*/
function getSuggestedOwner(dimensionName = '') {
   const k = (dimensionName || '').toLowerCase();
   if (k.includes('segment') || k.includes('tier')) return 'RevOps';
   if (k.includes('revenue') || k.includes('pricing') || k.includes('model')) return 'Finance/RevOps';
   if (k.includes('fit') || k.includes('qualification')) return 'Sales Ops';
   if (k.includes('growth') || k.includes('scale')) return 'Growth/Product';
   if (k.includes('persona') || k.includes('messag')) return 'Marketing/PM';
   if (k.includes('journey') || k.includes('funnel') || k.includes('lifecycle')) return 'Product/CS';
   return 'Owner';
}

/**
* Compose 2–5 precise, high-impact improvements per dimension
* Uses workspace facts, qualitative signals, and domain cues to drive action
*/
function buildDimensionImprovements({ dimensionName, score, facts, qual, domain }) {
   const nm = dimensionName || 'This dimension';
   const improvements = [];
   const band = (score >= 85) ? 'exceptional' : (score >= 70) ? 'strong' : (score >= 55) ? 'developing' : 'critical';

   // Metrics and quantification
   if ((facts.percents.length + facts.currency.length + facts.numbers.length) === 0) {
       improvements.push(`Instrument 2–3 KPIs for ${nm.toLowerCase()} (%, $, counts). Establish baseline within 2 weeks and set +15% 90‑day target.`);
   }

   // Standardization/SOP
   if (!qual.standardization) {
       improvements.push(`Publish a rubric/SOP for ${nm.toLowerCase()} with clear definitions and gates; socialize org‑wide and attach to workflows.`);
   }

   // Cadence
   if (qual.cadence === 'none' || (band !== 'exceptional' && qual.cadence === 'monthly')) {
       improvements.push(`Establish a weekly review cadence with a one‑page dashboard for ${nm.toLowerCase()} progress.`);
   }

   // Ownership
   if (qual.ownership === 'none') {
       improvements.push(`Assign a single‑threaded owner (${getSuggestedOwner(nm)}) for ${nm.toLowerCase()} to drive accountability.`);
   }

   // Tooling/instrumentation
   if (!qual.tooling || qual.tooling.length === 0) {
       const k = (nm || '').toLowerCase();
       if (k.includes('segment') || k.includes('tier')) {
           improvements.push('Instrument routing and coverage rules in Salesforce/HubSpot with audit logs.');
       } else if (k.includes('revenue') || k.includes('pricing') || k.includes('model')) {
           improvements.push('Build a live model in Snowflake/Looker and review monthly with Finance/RevOps.');
       } else if (k.includes('journey') || k.includes('funnel')) {
           improvements.push('Track stage conversion and drop‑offs in Amplitude/Mixpanel; alert on thresholds.');
       } else {
           improvements.push('Add analytics instrumentation (e.g., Looker/Tableau) with auto‑updated dashboards.');
       }
   }

   // Domain-specific actions (targeted)
   const key = (nm || '').toLowerCase();
   if (key.includes('segment') || key.includes('tier')) {
       improvements.push('Define numeric gates for T1/T2/T3 (ACV, win‑rate, pipeline ratio) and link to routing.');
       improvements.push('Back‑test gates on 10 recent deals and adjust thresholds based on conversion deltas.');
   } else if (key.includes('revenue') || key.includes('pricing') || key.includes('model')) {
       improvements.push('Combine top‑down TAM/SAM with bottom‑up ACV × accounts; publish assumptions.');
       improvements.push('Track LTV:CAC and payback monthly; set guardrails and escalation triggers.');
   } else if (key.includes('fit') || key.includes('qualification')) {
       improvements.push('Create a 5–7 factor fit rubric; retro score last 10 opportunities and analyze win/loss.');
       improvements.push('Add rubric score to CRM; monitor conversion by fit band and iterate quarterly.');
   } else if (key.includes('growth') || key.includes('potential')) {
       improvements.push('Set 12‑month targets with leading indicators (win rate, ACV, cycle); review weekly.');
       improvements.push('Create an experiment backlog with expected impact and run 2 tests per sprint.');
   } else if (key.includes('persona')) {
       improvements.push('Enrich personas with behavioral/psychographic signals and 3 VoC quotes each.');
       improvements.push('Map each persona to 2–3 JTBD use cases and align messaging/evidence.');
   } else if (key.includes('journey') || key.includes('funnel')) {
       improvements.push('Define stage entry/exit criteria; measure conversion and time‑in‑stage.');
       improvements.push('Add drop‑off alerts and playbooks for top 2 risk points.');
   }

   // Optimization/remediation nudges by band
   if (band === 'exceptional' || band === 'strong') {
       improvements.push('Operationalize best practices at scale: document, train, and audit quarterly.');
   } else {
       improvements.push('First fix: establish definition, metrics, owner, and weekly cadence within 30 days.');
   }

   // Cap output by band (fine‑tuning vs. foundational)
   const cap = band === 'exceptional' ? 3 : band === 'strong' ? 4 : 5;

   // Deduplicate and cap
   const deduped = [];
   for (const i of improvements) {
       const cleaned = (i || '').replace(/\s+/g, ' ').trim();
       if (cleaned && !deduped.some(x => x.toLowerCase() === cleaned.toLowerCase())) {
           deduped.push(cleaned);
       }
       if (deduped.length >= cap) break;
   }
   return deduped;
}

// Builds a 2–3 sentence insight and targeted improvements grounded in workspace inputs
function buildDimensionNarrative({ dimensionName, score, weight, responseText, responses, subcomponentId }) {
   const facts = extractFactsFromText(responseText || '');
   const hints = pickDimensionHints(dimensionName);
   const hasQuant = (facts.percents.length + facts.currency.length + facts.numbers.length) > 0;

   // Helper: choose a meaningful signal (avoid "$1" and other trivial tokens)
   function chooseSignal(f) {
       if (!f) return null;
       const pct = (f.percents || []).find(p => {
           const n = parseFloat(String(p).replace('%',''));
           return !isNaN(n) && n >= 1 && n <= 100;
       });
       if (pct) return pct;
       const cur = (f.currency || []).find(c => {
           const val = parseFloat(String(c).replace(/[^0-9.]/g,''));
           return /[KMB]/i.test(String(c)) || (!isNaN(val) && val >= 100);
       });
       if (cur) return cur;
       const num = (f.numbers || []).find(n => {
           const val = parseFloat(String(n).replace(/,/g,''));
           return !isNaN(val) && val >= 10;
       });
       return num || null;
   }

   // Narrative
   const pieces = [];
   const nm = dimensionName || 'This dimension';
   const band = (score >= 85) ? 'exceptional'
              : (score >= 70) ? 'strong'
              : (score >= 55) ? 'developing'
              : 'critical';

   const sig = chooseSignal(facts);
   const formatSignal = (s) => {
       const str = String(s || '').trim();
       if (/%$/.test(str) || /^[\$£€]/.test(str) || /[KMB]$/i.test(str) || /[A-Za-z]/.test(str)) return str;
       return 'clear metrics';
   };
   const sigText = sig ? formatSignal(sig) : '';

   if (band === 'exceptional') {
       const factBit = sigText ? `Workspace evidence references metrics like ${sigText}. ` : '';
       pieces.push(`${nm} is performing at an exceptional level (${score}%). ${factBit}Maintain the operating definition and keep metrics current for repeatability.`);
       if (facts.snippet) pieces.push(`Evidence sample: “${facts.snippet}”`);
   } else if (band === 'strong') {
       const factBit = sigText ? `with signals like ${sigText}` : 'with consistent qualitative detail';
       pieces.push(`Solid foundation in ${nm.toLowerCase()} (${score}%) ${factBit}. Focus on standardization and comparability across accounts to reach excellence.`);
       if (facts.snippet) pieces.push(`Reference: “${facts.snippet}”`);
   } else if (band === 'developing') {
       pieces.push(`${nm} is in a developing stage (${score}%). Inputs provide context but ${hasQuant ? 'could expand quantification and thresholds.' : 'lack quantification and clear thresholds.'}`);
       if (facts.snippet) pieces.push(`Current input focus: “${facts.snippet}”`);
   } else {
       pieces.push(`${nm} has critical gaps (${score}%). Treat this as a priority to define, quantify, and validate with concrete evidence.`);
       if (facts.snippet) pieces.push(`Starting point from workspace: “${facts.snippet}”`);
   }

   // Build richer strengths and improvements from inputs
   const qual = analyzeQualSignals(responseText || '');
   const domain = detectDomainKeywords(dimensionName, responseText || '');

   const strengths = buildDimensionStrengths({ dimensionName, score, facts, qual, domain });
   let improvements = buildDimensionImprovements({ dimensionName, score, facts, qual, domain });

   // If improvements are somehow empty, fall back to hints
   if (!improvements || improvements.length === 0) {
       improvements = [
           !hasQuant ? `Add 2–3 quantified metrics for ${nm.toLowerCase()}.` : `Operationalize: ${hints.optimization}.`,
           `First fix: ${hints.remediation}.`
       ].filter(Boolean).slice(0, 3);
   }

   return {
       feedback: pieces.join(' '),
       improvements,
       strengths
   };
}
function generateStrengths(dimensionScores, agent) {
    // Prefer aggregating the best per-dimension strengths already built in the scoring loop
    const aggregated = [];
    if (Array.isArray(globalThis.__dimensionArrayTemp) && globalThis.__dimensionArrayTemp.length > 0) {
        globalThis.__dimensionArrayTemp.forEach(d => {
            const dimName = d.name || d.dimension || 'Dimension';
            if (Array.isArray(d.strengths)) {
                d.strengths.forEach(s => {
                    const item = `${dimName}: ${String(s).trim()}`;
                    if (item && !aggregated.some(x => x.toLowerCase() === item.toLowerCase())) {
                        aggregated.push(item);
                    }
                });
            }
        });
        if (aggregated.length > 0) {
            return aggregated.slice(0, 10);
        }
    }

    // Fallback to generic labels when detailed strengths are unavailable
    const fallback = [];
    Object.entries(dimensionScores || {}).forEach(([dimension, score]) => {
        if (typeof score !== 'number') return;
        if (score >= 85) {
            fallback.push(`Excellence in ${dimension} (${Math.round(score)}%)`);
        } else if (score >= 70) {
            fallback.push(`Strong foundation in ${dimension} (${Math.round(score)}%)`);
        } else if (score >= 60) {
            fallback.push(`Developing capability in ${dimension} (${Math.round(score)}%)`);
        }
    });
    return fallback.slice(0, 10);
}

function generateWeaknesses(dimensionScores, agent) {
    // Prefer aggregating the most actionable per-dimension improvements already built
    const aggregated = [];
    if (Array.isArray(globalThis.__dimensionArrayTemp) && globalThis.__dimensionArrayTemp.length > 0) {
        globalThis.__dimensionArrayTemp.forEach(d => {
            const dimName = d.name || d.dimension || 'Dimension';
            if (Array.isArray(d.improvements)) {
                d.improvements.forEach(i => {
                    const item = `${dimName}: ${String(i).trim()}`;
                    if (item && !aggregated.some(x => x.toLowerCase() === item.toLowerCase())) {
                        aggregated.push(item);
                    }
                });
            }
        });
        if (aggregated.length > 0) {
            return aggregated.slice(0, 10);
        }
    }

    // Fallback generic weaknesses based on scores
    const weaknesses = [];
    Object.entries(dimensionScores || {}).forEach(([dimension, score]) => {
        if (typeof score !== 'number') return;
        if (score < 50) {
            weaknesses.push(`Critical gap in ${dimension} (${Math.round(score)}%) requiring immediate attention`);
        } else if (score < 60) {
            weaknesses.push(`${dimension} needs improvement (${Math.round(score)}%)`);
        } else if (score < 70) {
            weaknesses.push(`${dimension} has optimization potential (${Math.round(score)}%)`);
        }
    });
    return weaknesses.slice(0, 10);
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

/**
 * Build an agent-driven Executive Summary by fusing SSOT education, workspace inputs, and analysis outputs
 * Creates sophisticated, evidence-backed summaries that reflect agent rigor and domain expertise
 */
function buildExecutiveSummary({ subcomponentId, subcomponentName, agentName, score, dimensions = [], strengths = [], weaknesses = [], responses = {}, education = {} }) {
    // Aggregate workspace text for fact extraction
    const responsesText = Object.values(responses || {})
        .filter(v => v !== undefined && v !== null)
        .map(v => String(v)).join(' ');
    const facts = extractFactsFromText(responsesText || '');
    const qual = analyzeQualSignals(responsesText || '');

    // Performance band with nuanced tone
    const band =
        (score >= 90) ? 'exceptional' :
        (score >= 80) ? 'strong' :
        (score >= 70) ? 'solid' :
        (score >= 60) ? 'developing' :
        (score >= 50) ? 'emerging' : 'critical';

    // Extract quantified signals with context
    const quantSignals = [];
    if (facts.percents.length > 0) quantSignals.push(`${facts.percents[0]} performance metrics`);
    if (facts.currency.length > 0) quantSignals.push(`${facts.currency[0]} budget/impact`);
    if (facts.numbers.length > 0) quantSignals.push(`${facts.numbers[0]} scale indicators`);
    const quantPhrase = quantSignals.length > 0 ? ` with quantified signals including ${quantSignals.slice(0, 2).join(' and ')}` : '';

    // Extract top capability highlights (3 max, highest-scoring dimensions)
    const capabilityHighlights = [];
    const sortedDims = Array.isArray(dimensions) ? [...dimensions].sort((a, b) => (b.score || 0) - (a.score || 0)) : [];
    for (const d of sortedDims) {
        if (Array.isArray(d.strengths) && d.strengths.length > 0 && d.score >= 70) {
            const cleanStrength = String(d.strengths[0]).replace(/^.*?:\s*/, '').trim(); // Remove "Dimension: " prefix
            if (cleanStrength && !capabilityHighlights.some(x => x.toLowerCase().includes(cleanStrength.toLowerCase().slice(0, 20)))) {
                capabilityHighlights.push(cleanStrength);
            }
        }
        if (capabilityHighlights.length >= 3) break;
    }

    // Extract improvement themes (2 max, most actionable)
    const improvementThemes = [];
    const weaknessList = Array.isArray(weaknesses) ? weaknesses : [];
    for (const w of weaknessList) {
        const cleanTheme = String(w).replace(/^.*?:\s*/, '').trim(); // Remove "Dimension: " prefix
        if (cleanTheme && cleanTheme.length > 10 && !improvementThemes.some(x => x.toLowerCase().includes(cleanTheme.toLowerCase().slice(0, 15)))) {
            improvementThemes.push(cleanTheme);
        }
        if (improvementThemes.length >= 2) break;
    }

    // Education tie-in from SSOT use cases (real-world validation)
    let educationAnchor = '';
    try {
        const useCases = education && Array.isArray(education.useCases) ? education.useCases : [];
        if (useCases.length > 0) {
            // Find most relevant use case based on score band
            const relevantUC = useCases.find(uc => {
                if (band === 'exceptional' && uc.keyInsight) return true;
                if (band === 'strong' && uc.results) return true;
                if (band === 'developing' && uc.challenge) return true;
                return uc.definition || uc.approach;
            }) || useCases[0];

            if (relevantUC) {
                educationAnchor = relevantUC.keyInsight || relevantUC.results || relevantUC.definition || '';
                if (educationAnchor) {
                    educationAnchor = String(educationAnchor).trim();
                    // Extract key insight, limit to 80 chars
                    if (educationAnchor.length > 80) {
                        educationAnchor = educationAnchor.slice(0, 77) + '...';
                    }
                }
            }
        }
    } catch (e) {
        // ignore education parsing errors
    }

    // Agent-specific framing based on subcomponent type
    const agentContext = getAgentContext(subcomponentId, agentName, score, band);

    // Compose sophisticated summary using the RICH DIMENSION ANALYSIS already generated
    let summary = '';
    
    // Get score color for styling
    const scoreColor = score >= 85 ? '#4CAF50' : score >= 70 ? '#8BC34A' : score >= 55 ? '#FFC107' : '#FF9800';
    
    // 🎯 OVERALL ASSESSMENT - Leadership-level narrative (no scores, plain English)
    summary += `<div style="margin-bottom: 32px;">`;
    summary += `<h3 style="color: #FF5500; font-size: 20px; font-weight: 700; margin: 0 0 16px 0; display: flex; align-items: center; gap: 8px;">`;
    summary += `<span>🎯</span> Overall Assessment`;
    summary += `</h3>`;
    summary += `<p style="margin: 0 0 12px 0; line-height: 1.8; font-size: 17px;">`;

    // Identify top themes without surfacing scores
    const dimsSortedDesc = Array.isArray(dimensions) ? [...dimensions].sort((a, b) => (b.score || 0) - (a.score || 0)) : [];
    const themeAName = (dimsSortedDesc[0]?.name || dimsSortedDesc[0]?.dimension || '').toString();
    const themeBName = (dimsSortedDesc.find(d => (d.name || d.dimension) !== themeAName)?.name ||
                        dimsSortedDesc.find(d => (d.name || d.dimension) !== themeAName)?.dimension || '');

    // Reflection phrase from strongest concrete strength, if available
    const topWithStrength = dimsSortedDesc.find(d => Array.isArray(d.strengths) && d.strengths.length > 0);
    const reflectPhraseRaw = topWithStrength ? String(topWithStrength.strengths[0]) : '';
    const reflectPhrase = reflectPhraseRaw
        .replace(/^.*?:\s*/, '')   // remove "Dimension: " prefix if present
        .replace(/\s+/g, ' ')
        .replace(/\.$/, '')
        || 'consistent operating habits and clear decision making';

    // Opening judgment sentence
    let openingSentence = '';
    if (themeAName && themeBName) {
        openingSentence = `Overall, you demonstrate strength in ${themeAName.toLowerCase()} and ${themeBName.toLowerCase()}, reflected in ${reflectPhrase}.`;
    } else if (themeAName) {
        openingSentence = `Overall, you demonstrate strength in ${themeAName.toLowerCase()}, reflected in ${reflectPhrase}.`;
    } else {
        openingSentence = `Overall, you demonstrate disciplined execution in key areas.`;
    }

    // Why it matters (use agent context when available)
    let whySentence = agentContext ? String(agentContext).trim() : 'This positions you to prioritize the right bets and execute predictably.';
    if (!/[.!?]$/.test(whySentence)) {
        whySentence = whySentence + '.';
    }

    // Primary limiter from lowest sub-70 dimension (fallback to overall lowest)
    const dimsSortedAsc = Array.isArray(dimensions) ? [...dimensions].sort((a, b) => (a.score || 0) - (b.score || 0)) : [];
    const limiterDim = dimsSortedAsc.find(d => (d.score || 0) < 70) || dimsSortedAsc[0] || null;

    function toExecutiveSymptom(improvementText = '') {
        if (!improvementText) return '';
        const firstClause = String(improvementText).split(/[.;]/)[0].trim();
        const trimmed = firstClause.replace(/^(Create|Define|Establish|Set|Instrument|Add|Publish|Assign|Track|Build|Combine|Implement|Develop|Map|Enrich|Introduce)\s+/i, '').trim();
        if (!trimmed) return '';
        const lower = trimmed.toLowerCase();

        // Normalize KPI/metric phrasing like "2–3 KPIs ..." or "KPIs for X"
        if (/^\d/.test(trimmed) || /\bkpi(s)?\b/i.test(trimmed)) {
            const scopeMatch = trimmed.match(/\bfor\s+([a-z][\w\s-]*)/i);
            const scope = scopeMatch ? ` for ${scopeMatch[1].trim()}` : '';
            return `lack of instrumented KPIs${scope}`;
        }

        if (/^(a|an|the)\b/.test(lower) || /^(stage|standard|rubric|definition|instrumentation|owner|ownership|cadence|criteria|model|tracking|alignment|process)/i.test(trimmed)) {
            return `lack of ${trimmed}`;
        }
        return trimmed.charAt(0).toLowerCase() + trimmed.slice(1);
    }

    let limiterSentence = '';
    if (limiterDim) {
        const limName = (limiterDim.name || limiterDim.dimension || 'this area').toString().toLowerCase();
        const firstImprovement = Array.isArray(limiterDim.improvements) && limiterDim.improvements.length > 0 ? limiterDim.improvements[0] : '';
        const symptom = toExecutiveSymptom(firstImprovement);
        const symptomPhrase = symptom ? `, which shows up as ${symptom}` : '';
        limiterSentence = `The bottleneck is ${limName}${symptomPhrase}.`;
    }

    // Leadership-level call to action (no time frames)
    const ctaSentence = `Leaders should align on a simple operating definition, assign a single owner, and instrument one source of truth.`;

    // Compose paragraph
    const narrative = [openingSentence, whySentence, limiterSentence, ctaSentence]
        .filter(Boolean)
        .map(s => s.trim().replace(/\s+/g, ' '))
        .join(' ');

    summary += narrative;

    summary += `</p>`;
    summary += `</div>`;
    
    // ✅ WHAT'S WORKING - Use dimension strengths directly (keep dimension names for context!)
    const workingDimensions = dimensions.filter(d => d.score >= 70 && d.strengths && d.strengths.length > 0);
    if (workingDimensions.length > 0) {
        summary += `<div style="margin-bottom: 32px; padding: 20px; background: rgba(76, 175, 80, 0.08); border-left: 4px solid #4CAF50; border-radius: 8px;">`;
        summary += `<h3 style="color: #4CAF50; font-size: 20px; font-weight: 700; margin: 0 0 16px 0; display: flex; align-items: center; gap: 8px;">`;
        summary += `<span>✅</span> What's Working`;
        summary += `</h3>`;
        summary += `<p style="margin: 0; line-height: 1.8; font-size: 17px;">`;
        
        let strengthCount = 0;
        workingDimensions.forEach((dim) => {
            if (strengthCount >= 4) return; // Limit to 4 total strengths
            dim.strengths.slice(0, 2).forEach(strength => {
                if (strengthCount >= 4) return;
                // Keep dimension name - it provides valuable context!
                summary += `<strong style="color: #4CAF50;">• ${dim.name}:</strong> ${strength}`;
                summary += `<br><br>`;
                strengthCount++;
            });
        });
        
        summary += `</p>`;
        summary += `</div>`;
    }
    
    // 🎯 PRIORITY FOCUS - Use dimension improvements directly (keep dimension names!)
    const improvementDimensions = dimensions.filter(d => d.score < 70 && d.improvements && d.improvements.length > 0);
    if (improvementDimensions.length > 0) {
        summary += `<div style="margin-bottom: 32px; padding: 20px; background: rgba(255, 152, 0, 0.08); border-left: 4px solid #FF9800; border-radius: 8px;">`;
        summary += `<h3 style="color: #FF9800; font-size: 20px; font-weight: 700; margin: 0 0 16px 0; display: flex; align-items: center; gap: 8px;">`;
        summary += `<span>🎯</span> Priority Focus Areas`;
        summary += `</h3>`;
        summary += `<p style="margin: 0; line-height: 1.8; font-size: 17px;">`;
        
        let improvementCount = 0;
        improvementDimensions.forEach((dim) => {
            if (improvementCount >= 4) return; // Limit to 4 total improvements
            dim.improvements.slice(0, 2).forEach(improvement => {
                if (improvementCount >= 4) return;
                // Keep dimension name - it shows WHAT to improve!
                summary += `<strong style="color: #FF9800;">• ${dim.name}:</strong> ${improvement}`;
                summary += `<br><br>`;
                improvementCount++;
            });
        });
        
        summary += `</p>`;
        summary += `</div>`;
    }
    
    // 🚀 STRATEGIC PATH FORWARD - Use actual improvements as concrete next steps
    const allImprovements = dimensions
        .filter(d => d.improvements && d.improvements.length > 0)
        .flatMap(d => d.improvements.map(imp => ({ dimension: d.name, improvement: imp })))
        .slice(0, 3);
    
    if (allImprovements.length > 0 || educationAnchor) {
        summary += `<div style="padding: 20px; background: rgba(33, 150, 243, 0.08); border-left: 4px solid #2196F3; border-radius: 8px;">`;
        summary += `<h3 style="color: #2196F3; font-size: 20px; font-weight: 700; margin: 0 0 16px 0; display: flex; align-items: center; gap: 8px;">`;
        summary += `<span>🚀</span> Strategic Path Forward`;
        summary += `</h3>`;
        summary += `<p style="margin: 0; line-height: 1.8; font-size: 17px;">`;
        
        if (allImprovements.length > 0) {
            summary += `<strong>Next 30-90 days:</strong><br><br>`;
            allImprovements.forEach((item, idx) => {
                summary += `<strong style="color: #2196F3;">${idx + 1}.</strong> ${item.improvement}`;
                if (idx < allImprovements.length - 1) summary += `<br><br>`;
            });
        }
        
        if (educationAnchor) {
            if (allImprovements.length > 0) summary += `<br><br>`;
            summary += `<strong>Industry validation:</strong> ${educationAnchor}`;
        }
        
        summary += `</p>`;
        summary += `</div>`;
    }

    return summary;
}

/**
 * Get agent-specific context based on subcomponent type and performance
 */
function getAgentContext(subcomponentId, agentName, score, band) {
    const [blockId] = subcomponentId.split('-');
    const blockNum = parseInt(blockId);

    // Block-specific context
    if (blockNum === 1) { // Mission Discovery
        return score >= 80 ?
            'Clear mission articulation provides foundation for strategic alignment across all functions.' :
            'Mission clarity work will establish essential framework for downstream execution.';
    } else if (blockNum === 2) { // Customer Insights
        return score >= 80 ?
            'Deep customer insights enable targeted positioning and messaging that resonates with buyer needs.' :
            'Customer understanding development will inform product-market fit and go-to-market strategy.';
    } else if (blockNum === 3) { // Strategic Prioritization
        return score >= 80 ?
            'Sophisticated prioritization framework ensures resource allocation to highest-impact initiatives.' :
            'Prioritization methodology refinement will optimize capital deployment and execution focus.';
    } else if (blockNum === 4) { // Prototype Launch
        return score >= 80 ?
            'Validated product approach with clear launch criteria minimizes market risk and accelerates time-to-value.' :
            'Product validation framework will reduce launch uncertainty and improve market acceptance.';
    } else if (blockNum === 5) { // Go-to-Market Strategy
        return score >= 80 ?
            'Comprehensive GTM strategy with quantified targets provides roadmap for predictable revenue growth.' :
            'GTM framework development will establish foundation for scalable market expansion.';
    } else if (blockNum === 6) { // Customer Engagement Flywheel
        return score >= 80 ?
            'Integrated engagement model creates sustainable growth loops with compounding acquisition effects.' :
            'Engagement framework optimization will improve customer lifetime value and reduce churn.';
    } else if (blockNum >= 7 && blockNum <= 9) { // Scale phases
        return score >= 80 ?
            'Mature operational frameworks support predictable scaling with maintained quality and efficiency.' :
            'Operational maturity development will enable sustainable growth without proportional complexity increase.';
    } else if (blockNum >= 10) { // Leadership phases
        return score >= 80 ?
            'Advanced leadership frameworks position the organization for market leadership and sustained competitive advantage.' :
            'Leadership capability development will provide foundation for long-term organizational excellence.';
    }

    return null;
}

/**
 * Get forward-looking statement based on performance band
 */
function getForwardStatement(band, subcomponentId, score) {
    const [blockId] = subcomponentId.split('-');
    const blockNum = parseInt(blockId);

    if (band === 'exceptional') {
        return blockNum <= 3 ?
            'This strong foundation positions for rapid Phase 2 execution and market capture.' :
            'Exceptional capabilities create platform for market leadership and sustainable growth.';
    } else if (band === 'strong') {
        return 'Focused optimization of identified opportunities will elevate performance to exceptional levels.';
    } else if (band === 'solid') {
        return 'Systematic implementation of recommended improvements will significantly enhance competitive positioning.';
    } else if (band === 'developing') {
        return 'Dedicated execution of the improvement roadmap will transform capabilities and accelerate growth trajectory.';
    } else if (band === 'emerging') {
        return 'Structured capability building approach will establish foundation for market competitiveness.';
    } else {
        return 'Immediate focus on foundational elements will create platform for systematic improvement and growth.';
    }
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
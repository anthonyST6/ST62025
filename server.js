const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const { Database, db } = require('./database');
const { educationalContent } = require('./educational-content');
const { missingContent } = require('./missing-content-additions');
const { testCompany } = require('./test-company');

// Merge educational content with missing content additions
const allEducationalContent = { ...educationalContent, ...missingContent };
const ProblemStatementAgent = require('./problem-statement-agent-enhanced');
const DatabaseScoreManager = require('./database-score-manager');

// Import Phase 2 agents
const EarlyAdopterWinsAgent = require('./early-adopter-wins-agent-enhanced.js');
const CustomerEngagementFlywheelAgent = require('./customer-engagement-flywheel-agent-enhanced.js');
const QuantifiableImpactAgent = require('./quantifiable-impact-agent-enhanced.js');
const CustomerSuccessExpansionAgent = require('./customer-success-expansion-agent-enhanced.js');

// Instantiate Phase 2 agents
const earlyAdopterAgent = new EarlyAdopterWinsAgent();
const customerEngagementAgent = new CustomerEngagementFlywheelAgent();
const quantifiableImpactAgent = new QuantifiableImpactAgent();
const customerSuccessAgent = new CustomerSuccessExpansionAgent();

const app = express();
const PORT = process.env.PORT || 3001;

// In-memory cache (no Redis!)
class InMemoryCache {
    constructor() {
        this.cache = new Map();
        this.timers = new Map();
    }

    set(key, value, ttl = 3600) {
        // Clear existing timer if any
        if (this.timers.has(key)) {
            clearTimeout(this.timers.get(key));
        }

        // Set the value
        this.cache.set(key, {
            value,
            timestamp: Date.now()
        });

        // Set expiration timer if TTL provided
        if (ttl > 0) {
            const timer = setTimeout(() => {
                this.cache.delete(key);
                this.timers.delete(key);
            }, ttl * 1000);
            this.timers.set(key, timer);
        }

        return true;
    }

    get(key) {
        const item = this.cache.get(key);
        return item ? item.value : null;
    }

    delete(key) {
        if (this.timers.has(key)) {
            clearTimeout(this.timers.get(key));
            this.timers.delete(key);
        }
        return this.cache.delete(key);
    }

    clear() {
        this.timers.forEach(timer => clearTimeout(timer));
        this.timers.clear();
        this.cache.clear();
    }

    size() {
        return this.cache.size;
    }
}

// Initialize cache and score manager
const cache = new InMemoryCache();
const scoreManager = new DatabaseScoreManager();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    },
    fileFilter: function (req, file, cb) {
        const allowedTypes = ['.pdf', '.docx', '.pptx', '.xlsx', '.txt'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedTypes.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only PDF, DOCX, PPTX, XLSX, and TXT files are allowed.'));
        }
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Block data structure - NO TIER RESTRICTIONS
const blocks = [
    // Phase 1: IDEA MARKET FIT
    {
        id: 1,
        name: "Mission Discovery",
        phase: 1,
        score: 77,  // Changed to match the screenshot
        status: "active",
        description: "Ensure clarity on the problem, target customer, solution thesis, and internal team alignment",
        details: "Define your problem statement, mission, customer insights, founding team capability, market insights, and prototype launch plan"
    },
    {
        id: 2,
        name: "Customer Insights",
        phase: 1,
        score: 78,
        status: "in-progress",
        description: "Gather deep qualitative and behavioral insights from your target audience",
        details: "Establish interview cadence, build personas framework, map pain points, capture jobs-to-be-done, grade signals, and create insight-to-action loops"
    },
    {
        id: 3,
        name: "Strategic Prioritization",
        phase: 1,
        score: 72,
        status: "in-progress",
        description: "Avoid trying to do everything by forcing prioritization based on commercial value",
        details: "Score use cases, tier segments, create prioritization rubric, track tradeoffs, maintain hypothesis board, and archive decisions"
    },
    {
        id: 4,
        name: "Prototype Launch",
        phase: 1,
        score: 65,
        status: "pending",
        description: "Execute on your insights with a testable, feedback-driven version of your solution",
        details: "Define feature inclusion matrix, track technical scope, select pilot group, establish QA & success criteria, create timeline, and prepare post-mortem template"
    },
    // Phase 2: PRODUCT-MARKET FIT
    {
        id: 5,
        name: "Early Adopter Wins",
        phase: 2,
        score: 88,
        status: "complete",
        description: "Capture the strongest evidence that your product works in the real world",
        details: "Create case study templates, ROI calculation sheets, use case spotlights, gather buyer quotes, map win criteria, and establish deal debrief framework"
    },
    {
        id: 6,
        name: "Customer Engagement Flywheel",
        phase: 2,
        score: 82,
        status: "active",
        description: "Understand how deeply, how often, and how predictably customers engage",
        details: "Build usage heatmaps, define milestone triggers, create CS dashboard, model activation metrics, collect feedback, and identify power user behavior signals"
    },
    {
        id: 7,
        name: "Quantifiable Impact",
        phase: 2,
        score: 79,
        status: "in-progress",
        description: "Provide concrete, data-backed evidence that your product creates real value",
        details: "Measure time/cost savings, attribute revenue impact, track productivity lift, monitor net retention trends, document system reductions, and evidence friction reduction"
    },
    {
        id: 8,
        name: "Customer Success Expansion",
        phase: 2,
        score: 80,
        status: "active",
        description: "Evidence that existing users are growing their use of your product",
        details: "Model upsell funnel, identify team expansion signals, track organic adoption patterns, map champions, monitor CSAT/NPS, and track renewal readiness"
    },
    // Phase 3: GO-TO-MARKET
    {
        id: 9,
        name: "Proof Execution",
        phase: 3,
        score: 75,
        status: "active",
        description: "Prove your go-to-market motion is working beyond founder hustle",
        details: "Track inbound conversion rates, measure outbound play performance, clarify channel economics, assess discovery call effectiveness, optimize demo-to-close flow, and document founders selling model"
    },
    {
        id: 10,
        name: "Sales Team Empowerment",
        phase: 3,
        score: 70,
        status: "in-progress",
        description: "Build foundational sales infrastructure for repeatability and scale",
        details: "Create enablement asset pack, develop rep ramp plan, track wins/losses, build objection handling guide, establish ICP filter checklist, and curate sales call library"
    },
    {
        id: 11,
        name: "High Performance Teams",
        phase: 3,
        score: 65,
        status: "planning",
        description: "Ensure GTM team is structured, accountable, and performing at high level",
        details: "Implement scorecard model, define quota structure, conduct weekly deal reviews, establish forecasting framework, create manager coaching loop, and identify talent gaps"
    },
    {
        id: 12,
        name: "Retention Systems",
        phase: 3,
        score: 62,
        status: "planning",
        description: "Systems to ensure customers stay, succeed, and grow after signing up",
        details: "Create onboarding checklist, track activation, develop success playbooks, establish escalation SOPs, manage renewals pipeline, and analyze churn root causes"
    },
    // Phase 4: SCALING IMPACT
    {
        id: 13,
        name: "Market Domination Strategies",
        phase: 4,
        score: 45,
        status: "planning",
        description: "Build structural advantage and operational capacity to dominate your category",
        details: "Create category narrative canvas, design strategic moat, map ecosystem leverage, monitor competitor GTM, plan brand architecture, and develop defensive GTM tactics"
    },
    // Phase 5: SCALE
    {
        id: 14,
        name: "Operational Infrastructure",
        phase: 5,
        score: 35,
        status: "future",
        description: "Ensure organization is structurally ready to support and scale GTM motion",
        details: "Diagram system architecture, map revenue engine, create internal dashboards, track tool consolidation, develop RevOps playbook, and establish internal SLA policy"
    },
    {
        id: 15,
        name: "Leadership Expansion",
        phase: 5,
        score: 28,
        status: "future",
        description: "Build scalable, mature, and resilient leadership infrastructure",
        details: "Create VP hiring scorecards, develop succession plan model, establish executive reporting cadence, track culture health, maintain leadership org chart, and integrate DEI plan"
    },
    {
        id: 16,
        name: "Global & Expansion Opportunities",
        phase: 5,
        score: 27,
        status: "future",
        description: "Expand into new markets, geographies, and verticals with proper infrastructure",
        details: "Create market entry checklist, build localization infrastructure, develop international pricing matrix, track regional compliance, create geo-specific GTM playbooks, and assess expansion risks"
    }
];

// Sub-blocks with proper names from the document structure
const subBlockDefinitions = {
    1: [ // Mission Discovery
        { name: "Problem Statement Definition", description: "Focused articulation of the specific problem you solve" },
        { name: "Mission Statement", description: "Declaration of the startup's purpose and vision" },
        { name: "Customer Insight Capture", description: "Raw and synthesized data from target users" },
        { name: "Founding Team Capability", description: "Audit of founding team's ability to execute" },
        { name: "Market Insight Synthesis", description: "Summary of market landscape and timing" },
        { name: "Prototype Launch Plan", description: "Concrete plan to launch functional prototype" }
    ],
    2: [ // Customer Insights
        { name: "Interview Cadence Plan", description: "Structured plan for recurring customer discovery" },
        { name: "Personas Framework", description: "Documented archetypes of key users and buyers" },
        { name: "Pain Point Mapping", description: "Visual mapping of customer pain points" },
        { name: "JTBD Capture", description: "Jobs-to-be-done breakdown for user goals" },
        { name: "Signal Grading", description: "Scoring model for valuable insights vs noise" },
        { name: "Insight-to-Action Loop", description: "Process for converting insights to decisions" }
    ],
    3: [ // Strategic Prioritization
        { name: "Use Case Scoring Model", description: "Evaluate use cases across multiple criteria" },
        { name: "Segment Tiering", description: "Ranked categorization of customer segments" },
        { name: "Prioritization Rubric", description: "Decision-making tool for competing initiatives" },
        { name: "Tradeoff Tracker", description: "Document intentionally deprioritized items" },
        { name: "Hypothesis Board", description: "Track core assumptions being made" },
        { name: "Decision Archive", description: "Timestamped record of key decisions" }
    ],
    4: [ // Prototype Launch
        { name: "Feature Inclusion Matrix", description: "Decide which features for MVP" },
        { name: "Technical Scope Tracker", description: "Define technical implementation approach" },
        { name: "Pilot Group Selection", description: "Curated list of prototype testers" },
        { name: "QA & Success Criteria", description: "Define success metrics for prototype" },
        { name: "Timeline Gantt or Roadmap", description: "Visual timeline of build and launch" },
        { name: "Post-Mortem Template", description: "Structured reflection after testing" }
    ],
    5: [ // Early Adopter Wins
        { name: "Case Study Template", description: "Document customer journey and outcomes" },
        { name: "ROI Calculation Sheet", description: "Demonstrate business impact financially" },
        { name: "Use Case Spotlight", description: "Focused breakdown of powerful use cases" },
        { name: "Buyer Quotes & Testimonials", description: "Authentic quotes from early adopters" },
        { name: "Win Criteria Mapping", description: "Reasons why customers said yes" },
        { name: "Deal Debrief Framework", description: "Post-sale reflection and documentation" }
    ],
    6: [ // Customer Engagement Flywheel
        { name: "Usage Heatmap", description: "Visualization of user interaction patterns" },
        { name: "Milestone Triggers", description: "Behavioral events showing progress" },
        { name: "CS Dashboard", description: "Aggregate account health signals" },
        { name: "Activation Metric Model", description: "Define what activation means" },
        { name: "Feedback Collector", description: "Systematic process for user feedback" },
        { name: "Power User Behavior Signals", description: "Track most engaged user patterns" }
    ],
    7: [ // Quantifiable Impact
        { name: "Time/Cost Savings Metrics", description: "Calculate time or money saved" },
        { name: "Revenue-Impact Attribution", description: "How product contributes to revenue" },
        { name: "Productivity Lift Metrics", description: "Quantified gains in output" },
        { name: "Net Retention Trends", description: "Analysis of expansion vs contraction" },
        { name: "Downstream System Reductions", description: "Tools or services eliminated" },
        { name: "Friction Reduction Evidence", description: "Proof of removing operational friction" }
    ],
    8: [ // Customer Success Expansion
        { name: "Upsell Funnel Model", description: "Path from initial success to expansion" },
        { name: "Team Expansion Signals", description: "Evidence of spreading usage" },
        { name: "Organic Adoption Pattern", description: "Growth without sales push" },
        { name: "Champion Mapping", description: "Understanding internal advocates" },
        { name: "CSAT/NPS Tracking", description: "Capture customer sentiment" },
        { name: "Renewal Readiness Tracker", description: "Scorecard for renewal likelihood" }
    ],
    9: [ // Proof Execution
        { name: "Inbound Conversion Rates", description: "Percentage of leads converting" },
        { name: "Outbound Play Performance", description: "Cold outreach effectiveness" },
        { name: "Channel Economics Clarity", description: "CAC and ROI by channel" },
        { name: "Discovery Call Effectiveness", description: "Discovery to demo conversion" },
        { name: "Demo-to-Close Flow", description: "Demo process and conversion" },
        { name: "Founders Selling Model", description: "How founders successfully sell" }
    ],
    10: [ // Sales Team Empowerment
        { name: "Enablement Asset Pack", description: "Centralized sales materials" },
        { name: "Rep Ramp Plan", description: "Onboarding roadmap for new reps" },
        { name: "Win/Loss Tracker", description: "System for deal analysis" },
        { name: "Objection Handling Guide", description: "Common objections and rebuttals" },
        { name: "ICP Filter Checklist", description: "Qualification framework" },
        { name: "Sales Call Library", description: "Curated repository of calls" }
    ],
    11: [ // High Performance Teams
        { name: "Scorecard Model", description: "Performance metrics per role" },
        { name: "Quota Structure", description: "Revenue targets and alignment" },
        { name: "Weekly Deal Reviews", description: "Structured pipeline review" },
        { name: "Forecasting Framework", description: "Methodology for predicting revenue" },
        { name: "Manager Coaching Loop", description: "Structured coaching approach" },
        { name: "Talent Gap Identification", description: "Review of team performance" }
    ],
    12: [ // Retention Systems
        { name: "Onboarding Checklist", description: "Step-by-step new customer process" },
        { name: "Activation Tracker", description: "Monitor customer activation" },
        { name: "Success Playbooks", description: "Strategies for retention and growth" },
        { name: "Escalation SOPs", description: "Handle at-risk customers" },
        { name: "Renewals Pipeline", description: "Forecast upcoming renewals" },
        { name: "Churn Root-Cause Engine", description: "Analyze why customers leave" }
    ],
    13: [ // Market Domination Strategies
        { name: "Category Narrative Canvas", description: "Define or redefine market category" },
        { name: "Strategic Moat Design", description: "Long-term defensibility plan" },
        { name: "Ecosystem Leverage Map", description: "Integration and partnership strategy" },
        { name: "Competitor GTM Monitoring", description: "Track competitor tactics" },
        { name: "Brand Architecture Plan", description: "Structured brand hierarchy" },
        { name: "Defensive GTM Tactics", description: "Retain customers and block competitors" }
    ],
    14: [ // Operational Infrastructure
        { name: "System Architecture Diagram", description: "Visual of technical architecture" },
        { name: "Revenue Engine Map", description: "How leads become revenue" },
        { name: "Internal Dashboards", description: "Real-time performance visibility" },
        { name: "Tool Consolidation Tracker", description: "Manage and optimize tool stack" },
        { name: "RevOps Playbook", description: "Revenue operations processes" },
        { name: "Internal SLA Policy", description: "Service agreements between teams" }
    ],
    15: [ // Leadership Expansion
        { name: "VP Hiring Scorecards", description: "Framework for executive hiring" },
        { name: "Succession Plan Model", description: "Identify future leaders" },
        { name: "Executive Reporting Cadence", description: "Structured leadership updates" },
        { name: "Culture Health Tracker", description: "Measure team health and morale" },
        { name: "Leadership Org Chart", description: "Visual of leadership structure" },
        { name: "DEI Integration Plan", description: "Diversity and inclusion framework" }
    ],
    16: [ // Global & Expansion Opportunities
        { name: "Market Entry Checklist", description: "Prepare for new market entry" },
        { name: "Localization Infrastructure", description: "Support multiple languages/regions" },
        { name: "International Pricing Matrix", description: "Region-specific pricing strategy" },
        { name: "Regional Compliance Tracker", description: "Track regulatory requirements" },
        { name: "Geo-Specific GTM Playbooks", description: "Tailored go-to-market strategies" },
        { name: "Expansion Risk Assessment", description: "Evaluate expansion risks" }
    ]
};

// Generate sub-blocks with proper structure
const subBlocks = {};
blocks.forEach(block => {
    const definitions = subBlockDefinitions[block.id] || [];
    subBlocks[block.id] = definitions.map((def, index) => {
        // Calculate subcomponent scores based on main block score
        // Add some variance but keep it related to main score
        const variance = (Math.random() - 0.5) * 20; // ±10% variance
        let subScore = Math.round(block.score + variance);
        subScore = Math.max(0, Math.min(100, subScore)); // Clamp to 0-100
        
        return {
            id: `${block.id}-${index + 1}`,
            name: def.name,
            description: def.description,
            score: subScore
        };
    });
});

// Function to recalculate main block score from subcomponents
function calculateMainBlockScore(blockId) {
    const blockSubBlocks = subBlocks[blockId];
    if (!blockSubBlocks || blockSubBlocks.length === 0) {
        return blocks.find(b => b.id === blockId)?.score || 0;
    }
    
    // Calculate average of subcomponent scores
    const totalScore = blockSubBlocks.reduce((sum, sb) => sum + sb.score, 0);
    return Math.round(totalScore / blockSubBlocks.length);
}

// In-memory user sessions
const sessions = new Map();

// API Routes

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        cache: cache.size(),
        timestamp: new Date().toISOString() 
    });
});

// Get all blocks - Using database scores with fallback to test company
app.get('/api/blocks', async (req, res) => {
    const userId = parseInt(req.headers['x-user-id']) || 1;
    
    try {
        // Get scores from database
        const dbScores = await scoreManager.getAllBlockScores(userId);
        const scoreMap = {};
        dbScores.forEach(row => {
            scoreMap[row.block_id] = {
                score: row.score,
                trend: row.trend,
                lastChange: row.last_change,
                source: row.source
            };
        });
        
        // Get all subcomponent scores from database
        const subcomponentScores = await scoreManager.getAllSubcomponentScores(userId);
        const subScoreMap = {};
        subcomponentScores.forEach(row => {
            subScoreMap[row.subcomponent_id] = row.score;
        });
        
        // If no database scores exist for user, initialize from test company
        if (Object.keys(scoreMap).length === 0) {
            console.log('📊 Initializing scores for user', userId);
            await scoreManager.initializeUserScores(userId, testCompany.blockScores);
            // Re-fetch after initialization
            const newDbScores = await scoreManager.getAllBlockScores(userId);
            newDbScores.forEach(row => {
                scoreMap[row.block_id] = {
                    score: row.score,
                    trend: row.trend,
                    lastChange: row.last_change,
                    source: row.source
                };
            });
        }
        
        // Map blocks with database scores
        const allBlocks = blocks.map(block => {
            const blockScore = scoreMap[block.id] || { score: 50, trend: 'stable' };
            
            // Calculate status based on score
            let status = 'pending';
            if (blockScore.score >= 80) status = 'complete';
            else if (blockScore.score >= 70) status = 'active';
            else if (blockScore.score >= 60) status = 'in-progress';
            else if (blockScore.score >= 40) status = 'planning';
            else status = 'future';
            
            // Get subcomponent scores - use actual scores from database if available
            const blockSubBlocks = subBlocks[block.id] || [];
            const enhancedSubBlocks = blockSubBlocks.map((sb, index) => {
                const subId = `${block.id}-${index + 1}`;
                
                // Use actual score from database if available, otherwise use default
                let subScore;
                if (subScoreMap[subId] !== undefined) {
                    subScore = subScoreMap[subId];
                } else {
                    // Default score for unanalyzed subcomponents
                    subScore = 30;
                }
                
                return {
                    ...sb,
                    id: subId,
                    score: subScore,
                    analyzed: subScoreMap[subId] !== undefined
                };
            });
            
            return {
                ...block,
                score: blockScore.score,
                status: status,
                trend: blockScore.trend || 'stable',
                lastChange: blockScore.lastChange,
                source: blockScore.source || 'database',
                locked: false,
                subBlocks: enhancedSubBlocks
            };
        });
        
        res.json(allBlocks);
    } catch (error) {
        console.error('Error fetching blocks:', error);
        // Fallback to test company data
        const fallbackBlocks = blocks.map(block => ({
            ...block,
            score: testCompany.blockScores[block.id]?.score || 50,
            status: 'pending',
            trend: 'stable',
            locked: false,
            subBlocks: subBlocks[block.id] || []
        }));
        res.json(fallbackBlocks);
    }
});

// Get single block details - Using database scores
app.get('/api/blocks/:id', async (req, res) => {
    const blockId = parseInt(req.params.id);
    const userId = parseInt(req.headers['x-user-id']) || 1;
    
    const memBlock = blocks.find(b => b.id === blockId);
    if (!memBlock) {
        return res.status(404).json({ error: 'Block not found' });
    }
    
    try {
        // Get score from database
        const dbScore = await scoreManager.getBlockScore(userId, blockId);
        const score = dbScore ? dbScore.score : (testCompany.blockScores[blockId]?.score || 50);
        
        // Get all subcomponent scores for this block
        const subcomponentScores = await scoreManager.getSubcomponentScoresByBlock(userId, blockId);
        const subScoreMap = {};
        subcomponentScores.forEach(row => {
            subScoreMap[row.subcomponent_id] = row.score;
        });
        
        // Calculate status based on score
        let status = 'pending';
        if (score >= 80) status = 'complete';
        else if (score >= 70) status = 'active';
        else if (score >= 60) status = 'in-progress';
        else if (score >= 40) status = 'planning';
        else status = 'future';
        
        // Get subcomponent scores - use actual scores from database if available
        const blockSubBlocks = subBlocks[blockId] || [];
        const enhancedSubBlocks = blockSubBlocks.map((sb, index) => {
            const subId = `${blockId}-${index + 1}`;
            
            // Use actual score from database if available, otherwise use default
            let subScore;
            if (subScoreMap[subId] !== undefined) {
                subScore = subScoreMap[subId];
            } else {
                // Default score for unanalyzed subcomponents
                subScore = 30;
            }
            
            return {
                ...sb,
                id: subId,
                score: subScore,
                analyzed: subScoreMap[subId] !== undefined
            };
        });
        
        res.json({
            ...memBlock,
            score: score,
            status: status,
            trend: dbScore?.trend || 'stable',
            lastChange: dbScore?.last_change,
            source: dbScore?.source || 'default',
            subBlocks: enhancedSubBlocks,
            locked: false
        });
    } catch (error) {
        console.error('Error fetching block details:', error);
        // Fallback response
        res.json({
            ...memBlock,
            score: testCompany.blockScores[blockId]?.score || 50,
            status: 'pending',
            subBlocks: subBlocks[blockId] || [],
            locked: false
        });
    }
});

// Get single subcomponent details - NEW
app.get('/api/subcomponents/:id', (req, res) => {
    const subcomponentId = req.params.id;
    
    // DIAGNOSTIC LOGGING
    console.log('\n🔍 === SUBCOMPONENT CONTENT REQUEST ===');
    console.log(`📌 Requested ID: ${subcomponentId}`);
    console.log(`📚 Educational content loaded: ${Object.keys(educationalContent || {}).length} items`);
    console.log(`➕ Missing content loaded: ${Object.keys(missingContent || {}).length} items`);
    console.log(`📦 All content merged: ${Object.keys(allEducationalContent || {}).length} items`);
    
    // Check if content exists for this specific ID
    const hasContent = allEducationalContent && allEducationalContent[subcomponentId];
    console.log(`✅ Content exists for ${subcomponentId}: ${hasContent ? 'YES' : 'NO'}`);
    
    if (hasContent) {
        const content = allEducationalContent[subcomponentId];
        console.log(`📝 Content preview for ${subcomponentId}:`);
        console.log(`   - Title: ${content.title || 'Missing'}`);
        console.log(`   - What: ${content.what ? content.what.substring(0, 50) + '...' : 'Missing'}`);
        console.log(`   - Why: ${content.why ? content.why.substring(0, 50) + '...' : 'Missing'}`);
        console.log(`   - Examples: ${content.examples ? content.examples.length : 0} items`);
    }
    
    // First try to get from database
    Database.getSubComponentById(subcomponentId, (err, subcomponent) => {
        // If not in database, try to get from in-memory data
        if (err || !subcomponent) {
            // Parse the subcomponent ID (format: "blockId-subIndex")
            const [blockId, subIndex] = subcomponentId.split('-').map(Number);
            const blockSubBlocks = subBlocks[blockId];
            
            if (!blockSubBlocks || !blockSubBlocks[subIndex - 1]) {
                console.log(`❌ Subcomponent ${subcomponentId} not found in memory`);
                return res.status(404).json({ error: 'Subcomponent not found' });
            }
            
            const subBlock = blockSubBlocks[subIndex - 1];
            const block = blocks.find(b => b.id === blockId);
            
            // Get educational content for this subcomponent - with proper ID format
            // The content uses "1-1" format, not "1-0" format
            const contentId = `${blockId}-${subIndex}`;
            const educContent = allEducationalContent[contentId] || {};
            
            console.log(`🔄 Looking up content with ID: ${contentId}`);
            console.log(`📊 Content found: ${educContent && educContent.title ? 'YES - ' + educContent.title : 'NO'}`);
            
            // Return combined data - ENSURE education.title is properly set
            const response = {
                id: subcomponentId,
                name: subBlock.name,
                description: subBlock.description,
                score: subBlock.score,
                blockName: block ? block.name : '',
                blockPhase: block ? block.phase : 1,
                education: {
                    // CRITICAL: Use the education content title if available
                    title: educContent.title || subBlock.name,
                    what: educContent.what || 'Content coming soon...',
                    why: educContent.why || 'Content coming soon...',
                    how: educContent.how || 'Content coming soon...',
                    examples: educContent.examples || [],
                    templates: educContent.templates || [],
                    metrics: educContent.metrics || []
                },
                workspace: educContent.workspace || {
                    tools: [],
                    templates: [],
                    bestPractices: []
                },
                resources: educContent.resources || [
                    { title: 'Resource Guide', type: 'pdf', url: '#' },
                    { title: 'Template Document', type: 'doc', url: '#' }
                ],
                validation: {
                    criteria: educContent.validationCriteria || ['Completeness', 'Quality', 'Alignment'],
                    evidence: []
                }
            };
            
            console.log(`✅ Returning content for ${subcomponentId}: ${response.education.title}`);
            console.log('=== END SUBCOMPONENT REQUEST ===\n');
            
            return res.json(response);
        }
        
        // Get the parent block info
        Database.getBlockById(subcomponent.block_id, (err, block) => {
            // Get educational content for this subcomponent
            const educContent = allEducationalContent[subcomponentId] || {};
            
            res.json({
                ...subcomponent,
                blockName: block ? block.name : '',
                blockPhase: block ? block.phase : 1,
                education: {
                    title: educContent.title || subcomponent.name,
                    what: educContent.what || 'Content coming soon...',
                    why: educContent.why || 'Content coming soon...',
                    how: educContent.how || 'Content coming soon...',
                    examples: educContent.examples || [],
                    templates: educContent.templates || [],
                    metrics: educContent.metrics || []
                },
                workspace: educContent.workspace || {
                    tools: [],
                    templates: [],
                    bestPractices: []
                },
                resources: educContent.resources || [
                    { title: 'Resource Guide', type: 'pdf', url: '#' },
                    { title: 'Template Document', type: 'doc', url: '#' }
                ],
                validation: {
                    criteria: educContent.validationCriteria || ['Completeness', 'Quality', 'Alignment'],
                    evidence: subcomponent.validation_data || []
                }
            });
        });
    });
});

// Get worksheet data - NEW
app.get('/api/subcomponents/:id/worksheet', (req, res) => {
    const subcomponentId = req.params.id;
    const userId = parseInt(req.headers['x-user-id']) || 1;
    
    // For ST6 user (ID 1) and Problem Statement (1-1), return the pre-populated data
    if (userId === 1 && subcomponentId === '1-1') {
        // Get ST6's worksheet data from the last saved activity
        db.get(`
            SELECT metadata FROM activity_log
            WHERE user_id = ?
            AND entity_id = ?
            AND action IN ('worksheet_save', 'worksheet_init')
            ORDER BY created_at DESC
            LIMIT 1
        `, [userId, subcomponentId], (err, row) => {
            if (err) {
                console.error('Error fetching worksheet:', err);
                return res.status(500).json({ error: 'Failed to fetch worksheet' });
            }
            
            if (row && row.metadata) {
                try {
                    const worksheetData = JSON.parse(row.metadata);
                    return res.json({ worksheetData });
                } catch (e) {
                    console.error('Error parsing worksheet data:', e);
                }
            }
            
            // Return ST6's default data if no saved data found
            const defaultData = {
                'who-affected': 'B2B SaaS founders and GTM leaders at early-stage startups (Seed to Series B) with 10-50 employees',
                'what-problem': 'Early-stage startups struggle to build and execute effective go-to-market strategies due to lack of structured frameworks, expert guidance, and proven playbooks. They waste time and resources on trial-and-error approaches, leading to slower growth, missed opportunities, and increased burn rates.',
                'when-occur': 'This occurs during critical growth phases - when transitioning from founder-led sales to building a sales team, when trying to achieve product-market fit, and when preparing for fundraising rounds where demonstrating GTM traction is essential.',
                'what-impact': 'Startups lose 6-12 months of runway due to inefficient GTM execution, with 70% failing to hit their growth targets. This translates to $500K-$2M in wasted resources, 40% longer sales cycles, and 50% lower conversion rates compared to startups with structured GTM approaches.',
                'how-solving': 'Currently using a patchwork of expensive consultants ($20-50K/month), generic online courses, scattered blog posts, and trial-and-error. These solutions lack personalization, comprehensive frameworks, ongoing support, and measurable outcomes.',
                'evidence-validation': 'Interviewed 50+ founders who consistently reported GTM as their #1 challenge. Survey of 200 startups showed 85% lack structured GTM processes. Case studies from 10 pilot customers demonstrated 3x improvement in sales velocity after implementing our framework.'
            };
            
            // Save this as initial data for ST6
            Database.logActivity(
                userId,
                'worksheet_init',
                'subcomponent',
                subcomponentId,
                defaultData,
                (err) => {
                    if (err) console.error('Failed to save initial worksheet:', err);
                }
            );
            
            res.json({ worksheetData: defaultData });
        });
    } else {
        // For other users, fetch their saved worksheet data
        db.get(`
            SELECT metadata FROM activity_log
            WHERE user_id = ?
            AND entity_id = ?
            AND action = 'worksheet_save'
            ORDER BY created_at DESC
            LIMIT 1
        `, [userId, subcomponentId], (err, row) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to fetch worksheet' });
            }
            
            if (row && row.metadata) {
                try {
                    const worksheetData = JSON.parse(row.metadata);
                    res.json({ worksheetData });
                } catch (e) {
                    res.json({ worksheetData: {} });
                }
            } else {
                res.json({ worksheetData: {} });
            }
        });
    }
});

// Save worksheet data - NEW
app.post('/api/subcomponents/:id/worksheet', (req, res) => {
    const subcomponentId = req.params.id;
    const userId = req.headers['x-user-id'] || 1;
    const { worksheetData } = req.body;
    
    // Store in activity log
    Database.logActivity(
        userId,
        'worksheet_save',
        'subcomponent',
        subcomponentId,
        worksheetData,
        (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to save worksheet' });
            }
            res.json({ success: true });
        }
    );
});

// Upload document for subcomponent with actual file handling
app.post('/api/subcomponents/:id/upload', upload.single('file'), (req, res) => {
    const subcomponentId = req.params.id;
    const userId = req.headers['x-user-id'] || 1;
    
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const blockId = parseInt(subcomponentId.split('-')[0]);
    const filePath = `/uploads/${req.file.filename}`;
    
    // Save document metadata to database
    Database.saveDocument(
        userId,
        blockId,
        subcomponentId,
        filePath,
        req.file.originalname,
        req.file.mimetype,
        req.file.size,
        (err, result) => {
            if (err) {
                // Delete uploaded file if database save fails
                fs.unlinkSync(req.file.path);
                return res.status(500).json({ error: 'Failed to save document' });
            }
            
            // Simulate AI analysis (in production, this would call an AI service)
            const analysis = performDocumentAnalysis(req.file);
            
            res.json({
                success: true,
                documentId: result.id,
                fileName: req.file.originalname,
                fileSize: req.file.size,
                filePath: filePath,
                analysis: analysis
            });
        }
    );
});

// Get uploaded documents for a subcomponent
app.get('/api/subcomponents/:id/documents', (req, res) => {
    const subcomponentId = req.params.id;
    const userId = req.headers['x-user-id'] || 1;
    
    Database.getDocumentsBySubcomponent(userId, subcomponentId, (err, documents) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve documents' });
        }
        res.json(documents || []);
    });
});

// Delete a document
app.delete('/api/documents/:id', (req, res) => {
    const documentId = req.params.id;
    const userId = req.headers['x-user-id'] || 1;
    
    Database.getDocumentById(documentId, (err, doc) => {
        if (err || !doc) {
            return res.status(404).json({ error: 'Document not found' });
        }
        
        // Delete file from filesystem
        const filePath = path.join(__dirname, doc.file_path);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        
        // Delete from database
        Database.deleteDocument(documentId, userId, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to delete document' });
            }
            res.json({ success: true });
        });
    });
});

// Simulate document analysis (placeholder for AI integration)
function performDocumentAnalysis(file) {
    // In production, this would:
    // 1. Extract text from the document
    // 2. Send to AI service (GPT, Claude, etc.)
    // 3. Return structured insights
    
    return {
        summary: `Document "${file.originalname}" has been uploaded successfully.`,
        keyPoints: [
            'Document contains relevant GTM framework information',
            'Aligns with current subcomponent objectives',
            'Provides actionable insights for implementation'
        ],
        recommendations: [
            'Review section 2 for detailed implementation steps',
            'Consider the metrics outlined in section 3',
            'Align with team on proposed timeline'
        ],
        confidence: 0.85,
        processedAt: new Date().toISOString()
    };
}

// Get learning progress for subcomponent - NEW
app.get('/api/subcomponents/:id/progress', (req, res) => {
    const subcomponentId = req.params.id;
    const userId = req.headers['x-user-id'] || 1;
    
    Database.getLearningProgress(userId, subcomponentId, (err, progress) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to get progress' });
        }
        
        res.json(progress || {
            completion_percentage: 0,
            time_spent: 0,
            resources_accessed: []
        });
    });
});

// Update learning progress - NEW
app.post('/api/subcomponents/:id/progress', (req, res) => {
    const subcomponentId = req.params.id;
    const userId = req.headers['x-user-id'] || 1;
    const { completionPercentage, timeSpent, resourcesAccessed } = req.body;
    
    Database.updateLearningProgress(
        userId,
        subcomponentId,
        completionPercentage,
        timeSpent,
        resourcesAccessed,
        (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to update progress' });
            }
            res.json({ success: true });
        }
    );
});

// Get score history for a block - Using dynamic test company data
app.get('/api/blocks/:id/history', (req, res) => {
    const blockId = parseInt(req.params.id);
    const days = parseInt(req.query.days) || 30;
    
    console.log(`📊 API: Getting history for block ${blockId}, days: ${days}`);
    
    // Validate blockId
    if (!blockId || blockId < 1 || blockId > 16) {
        console.error(`❌ Invalid block ID: ${blockId}`);
        return res.status(404).json({
            error: 'Block not found',
            blockId: blockId
        });
    }
    
    // Check if test company data is loaded
    if (!testCompany || !testCompany.blockScores) {
        console.error('❌ Test company data not loaded properly');
        return res.status(500).json({
            error: 'Test company data not available'
        });
    }
    
    // Check if block exists in test company
    if (!testCompany.blockScores[blockId]) {
        console.error(`❌ Block ${blockId} not found in test company data`);
        return res.status(404).json({
            error: 'Block not found in test company',
            blockId: blockId
        });
    }
    
    try {
        console.log(`📊 Generating score history for block ${blockId}...`);
        
        // Generate dynamic score history from test company
        const history = testCompany.generateScoreHistory(blockId, days);
        console.log(`✅ Generated ${history.length} history points`);
        
        // Get change events for this block - these are the historical improvements
        const changeEvents = testCompany.changeHistory[blockId] || [];
        console.log(`✅ Found ${changeEvents.length} change events`);
        
        // Format change events for the Change Log table
        const formattedEvents = changeEvents.map(event => ({
            date: event.date,
            title: event.event,
            weaknesses: event.weaknesses || [],
            actions: event.actions || [],
            improvement: event.improvement || 0,
            previousScore: event.previousScore,
            newScore: event.newScore
        }));
        
        const response = {
            history: history,
            changeEvents: formattedEvents,
            currentScore: testCompany.blockScores[blockId].score,
            trend: testCompany.blockScores[blockId].trend
        };
        
        console.log(`✅ Returning response with ${response.history.length} history points and ${response.changeEvents.length} events`);
        res.json(response);
    } catch (error) {
        console.error('❌ Error generating score history:', error);
        console.error('Stack trace:', error.stack);
        res.status(500).json({
            error: 'Failed to generate score history',
            message: error.message
        });
    }
});

// Update block score - Saves to database
app.post('/api/blocks/:id/score', async (req, res) => {
    const blockId = parseInt(req.params.id);
    const userId = parseInt(req.headers['x-user-id']) || 1;
    const { score, subBlockScores, changeEvent } = req.body;
    
    const block = blocks.find(b => b.id === blockId);
    if (!block) {
        return res.status(404).json({ error: 'Block not found' });
    }
    
    console.log('📊 Server: Updating block score', {
        blockId,
        score,
        subBlockScores,
        changeEvent
    });
    
    try {
        // Save to database
        const result = await scoreManager.saveBlockScore(
            userId,
            blockId,
            score,
            changeEvent?.eventType || 'manual',
            changeEvent || {}
        );
        
        // Update subcomponent scores if provided
        if (subBlockScores && Array.isArray(subBlockScores)) {
            for (const { index, score: subScore } of subBlockScores) {
                const subcomponentId = `${blockId}-${index + 1}`;
                await scoreManager.saveSubcomponentScore(
                    userId,
                    blockId,
                    subcomponentId,
                    subScore,
                    'manual',
                    {}
                );
                console.log(`📊 Server: Saved subcomponent ${subcomponentId} score: ${subScore}%`);
            }
        }
        
        // Clear cache to ensure fresh data
        cache.clear();
        
        res.json({
            success: true,
            result: result,
            block: {
                ...block,
                score: result.score,
                trend: result.trend,
                lastChange: new Date().toISOString()
            },
            subBlocks: subBlocks[blockId]
        });
    } catch (error) {
        console.error('Error updating block score:', error);
        res.status(500).json({ error: 'Failed to update score' });
    }
});

// Get phase scores
app.get('/api/phases', (req, res) => {
    const phases = [
        { id: 1, name: "Idea Market Fit", blocks: [1, 2, 3, 4] },
        { id: 2, name: "Product Market Fit", blocks: [5, 6, 7, 8] },
        { id: 3, name: "Go-To Market", blocks: [9, 10, 11, 12] },
        { id: 4, name: "Scaling Impact", blocks: [13] },
        { id: 5, name: "Scale", blocks: [14, 15, 16] }
    ];
    
    const phaseScores = phases.map(phase => {
        const phaseBlocks = blocks.filter(b => phase.blocks.includes(b.id));
        const avgScore = Math.round(
            phaseBlocks.reduce((sum, b) => sum + b.score, 0) / phaseBlocks.length
        );
        
        return {
            ...phase,
            score: avgScore
        };
    });
    
    res.json(phaseScores);
});

// Simple session management
app.post('/api/session', (req, res) => {
    const sessionId = Math.random().toString(36).substring(7);
    const { email, name } = req.body;
    
    if (email && name) {
        // Create or get user
        Database.getUserByEmail(email, (err, user) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            
            if (user) {
                // User exists, create session
                Database.createSession(sessionId, user.id, { email, name }, null, (err) => {
                    if (err) console.error('Error creating session:', err);
                });
                
                sessions.set(sessionId, {
                    userId: user.id,
                    createdAt: Date.now()
                });
                
                res.json({
                    sessionId,
                    userId: user.id
                });
            } else {
                // Create new user
                Database.createUser(email, name, null, null, (err, newUser) => {
                    if (err) {
                        console.error('Error creating user:', err);
                        return res.status(500).json({ error: 'Error creating user' });
                    }
                    
                    Database.createSession(sessionId, newUser.id, { email, name }, null, (err) => {
                        if (err) console.error('Error creating session:', err);
                    });
                    
                    sessions.set(sessionId, {
                        userId: newUser.id,
                        createdAt: Date.now()
                    });
                    
                    res.json({
                        sessionId,
                        userId: newUser.id
                    });
                });
            }
        });
    } else {
        // Anonymous session
        sessions.set(sessionId, {
            createdAt: Date.now()
        });
        
        res.json({
            sessionId
        });
    }
});

// Get session
app.get('/api/session/:id', (req, res) => {
    const session = sessions.get(req.params.id);
    
    if (!session) {
        return res.status(404).json({ error: 'Session not found' });
    }
    
    res.json(session);
});

// Scoring engine endpoint
app.post('/api/score/calculate', (req, res) => {
    const { responses } = req.body;
    
    if (!responses || !Array.isArray(responses)) {
        return res.status(400).json({ error: 'Invalid responses' });
    }
    
    // Simple scoring algorithm
    const weights = {
        implementation: 0.4,
        documentation: 0.2,
        metrics: 0.2,
        validation: 0.2
    };
    
    let totalScore = 0;
    let totalWeight = 0;
    
    responses.forEach(response => {
        const weight = weights[response.category] || 0.1;
        totalScore += response.value * weight;
        totalWeight += weight;
    });
    
    const finalScore = totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0;
    
    res.json({ 
        score: Math.min(100, Math.max(0, finalScore)),
        breakdown: responses
    });
});

// Analyze problem statement with AI agent
app.post('/api/analyze/problem-statement', (req, res) => {
    const { worksheetData, subcomponentId } = req.body;
    
    console.log('🔍 API: /api/analyze/problem-statement called');
    console.log('📝 Worksheet data received:', worksheetData ? 'Yes' : 'No');
    console.log('🆔 Subcomponent ID:', subcomponentId);
    
    if (!worksheetData) {
        console.error('❌ API: No worksheet data provided');
        return res.status(400).json({ error: 'No worksheet data provided' });
    }
    
    try {
        // Create agent instance (ProblemStatementAgent is actually ProblemStatementAgentEnhanced)
        console.log('🤖 Creating ProblemStatementAgentEnhanced instance...');
        const agent = new ProblemStatementAgent();

        // Analyze the worksheet
        console.log('🔬 Analyzing worksheet with enhanced agent...');
        const analysis = agent.analyzeWorksheet(worksheetData);
        
        // Debug logging to diagnose scoring issue
        console.log('=== ENHANCED AGENT SCORING RESULTS ===');
        console.log('✅ Overall Score:', analysis.score);
        console.log('📊 Detailed Scores:', JSON.stringify(analysis.detailedScores, null, 2));
        
        // Log each dimension's score details
        if (analysis.detailedScores) {
            console.log('📈 Dimension Breakdown:');
            Object.entries(analysis.detailedScores).forEach(([dimension, data]) => {
                console.log(`  ${dimension}: score=${data.score}/${data.maxScore || 20}, percentage=${data.percentage || 'N/A'}%, weight=${data.weight}`);
            });
        }
        
        // Log recommendations to verify realistic scoring
        if (analysis.recommendations && analysis.recommendations.length > 0) {
            console.log('🎯 Recommendations with realistic improvements:');
            analysis.recommendations.forEach((rec, index) => {
                console.log(`  ${index + 1}. ${rec.area}: ${rec.impact} (Priority: ${rec.priority})`);
            });
        }
        
        console.log('=== END ENHANCED SCORING ===');
        
        // Log the analysis AND save the score to history
        const userId = req.headers['x-user-id'] || 1;
        
        // Save the analysis with score to activity log for history tracking
        Database.logActivity(
            userId,
            'worksheet_analysis',
            'subcomponent',
            subcomponentId,
            {
                worksheetData,
                analysis: {
                    ...analysis,
                    score: analysis.score // Ensure score is included
                }
            },
            (err) => {
                if (err) {
                    console.error('Failed to log analysis:', err);
                }
            }
        );
        
        // Save the analysis score to database
        const blockId = parseInt(subcomponentId.split('-')[0]);
        
        // Save to database using the score manager
        scoreManager.saveSubcomponentScore(
            userId,
            blockId,
            subcomponentId,
            analysis.score,
            'ai-analysis',
            {
                worksheetData,
                analysis: analysis
            }
        ).then(result => {
            console.log(`📊 Saved analysis score to database: ${analysis.score}% for ${subcomponentId}`);
            console.log(`📊 Block score updated to: ${result.blockScore}%`);
        }).catch(err => {
            console.error('Failed to save score to database:', err);
        });
        
        res.json(analysis);
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({
            error: 'Analysis failed',
            message: error.message
        });
    }
});

// Analyze mission statement with AI agent
app.post('/api/analyze/mission-statement', (req, res) => {
    const { worksheetData, subcomponentId } = req.body;
    
    console.log('🎯 API: /api/analyze/mission-statement called');
    console.log('📝 Worksheet data received:', worksheetData ? 'Yes' : 'No');
    console.log('🆔 Subcomponent ID:', subcomponentId);
    
    if (!worksheetData) {
        console.error('❌ API: No worksheet data provided');
        return res.status(400).json({ error: 'No worksheet data provided' });
    }
    
    try {
        // Load the Mission Statement agent
        const MissionStatementAgent = require('./mission-statement-agent-enhanced');
        
        // Create agent instance
        console.log('🤖 Creating MissionStatementAgentEnhanced instance...');
        const agent = new MissionStatementAgent();

        // Analyze the worksheet
        console.log('🔬 Analyzing worksheet with mission statement agent...');
        const analysis = agent.analyzeWorksheet(worksheetData);
        
        // Debug logging
        console.log('=== MISSION STATEMENT AGENT SCORING RESULTS ===');
        console.log('✅ Overall Score:', analysis.score);
        console.log('📊 Detailed Scores:', JSON.stringify(analysis.detailedScores, null, 2));
        
        // Log each dimension's score details
        if (analysis.detailedScores) {
            console.log('📈 Dimension Breakdown:');
            Object.entries(analysis.detailedScores).forEach(([dimension, data]) => {
                console.log(`  ${dimension}: score=${data.score}/${data.maxScore || 20}, percentage=${data.percentage || 'N/A'}%, weight=${data.weight}`);
            });
        }
        
        // Log recommendations
        if (analysis.recommendations && analysis.recommendations.length > 0) {
            console.log('🎯 Recommendations:');
            analysis.recommendations.forEach((rec, index) => {
                console.log(`  ${index + 1}. ${rec.area}: ${rec.impact} (Priority: ${rec.priority})`);
            });
        }
        
        console.log('=== END MISSION STATEMENT SCORING ===');
        
        // Log the analysis AND save the score to history
        const userId = req.headers['x-user-id'] || 1;
        
        // Save the analysis with score to activity log for history tracking
        Database.logActivity(
            userId,
            'worksheet_analysis',
            'subcomponent',
            subcomponentId,
            {
                worksheetData,
                analysis: {
                    ...analysis,
                    score: analysis.score // Ensure score is included
                }
            },
            (err) => {
                if (err) {
                    console.error('Failed to log analysis:', err);
                }
            }
        );
        
        // Save the analysis score to database
        const blockId = parseInt(subcomponentId.split('-')[0]);
        
        // Save to database using the score manager
        scoreManager.saveSubcomponentScore(
            userId,
            blockId,
            subcomponentId,
            analysis.score,
            'ai-analysis',
            {
                worksheetData,
                analysis: analysis
            }
        ).then(result => {
            console.log(`📊 Saved analysis score to database: ${analysis.score}% for ${subcomponentId}`);
            console.log(`📊 Block score updated to: ${result.blockScore}%`);
        }).catch(err => {
            console.error('Failed to save score to database:', err);
        });
        
        res.json(analysis);
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({
            error: 'Analysis failed',
            message: error.message
        });
    }
});

// Analyze customer insight with AI agent
app.post('/api/analyze/customer-insight', (req, res) => {
    const { worksheetData, subcomponentId } = req.body;
    
    console.log('👥 API: /api/analyze/customer-insight called');
    console.log('📝 Worksheet data received:', worksheetData ? 'Yes' : 'No');
    console.log('🆔 Subcomponent ID:', subcomponentId);
    
    if (!worksheetData) {
        console.error('❌ API: No worksheet data provided');
        return res.status(400).json({ error: 'No worksheet data provided' });
    }
    
    try {
        // Load the Customer Insight agent
        const CustomerInsightAgent = require('./customer-insight-agent-enhanced');
        
        // Create agent instance
        console.log('🤖 Creating CustomerInsightAgentEnhanced instance...');
        const agent = new CustomerInsightAgent();

        // Analyze the worksheet
        console.log('🔬 Analyzing worksheet with customer insight agent...');
        const analysis = agent.analyzeWorksheet(worksheetData);
        
        // Debug logging
        console.log('=== CUSTOMER INSIGHT AGENT SCORING RESULTS ===');
        console.log('✅ Overall Score:', analysis.score);
        console.log('📊 Detailed Scores:', JSON.stringify(analysis.detailedScores, null, 2));
        
        // Log each dimension's score details
        if (analysis.detailedScores) {
            console.log('📈 Dimension Breakdown:');
            Object.entries(analysis.detailedScores).forEach(([dimension, data]) => {
                console.log(`  ${dimension}: score=${data.score}/${data.maxScore || 20}, percentage=${data.percentage || 'N/A'}%, weight=${data.weight}`);
            });
        }
        
        // Log recommendations
        if (analysis.recommendations && analysis.recommendations.length > 0) {
            console.log('🎯 Recommendations:');
            analysis.recommendations.forEach((rec, index) => {
                console.log(`  ${index + 1}. ${rec.area}: ${rec.impact} (Priority: ${rec.priority})`);
            });
        }
        
        console.log('=== END CUSTOMER INSIGHT SCORING ===');
        
        // Log the analysis AND save the score to history
        const userId = req.headers['x-user-id'] || 1;
        
        // Save the analysis with score to activity log for history tracking
        Database.logActivity(
            userId,
            'worksheet_analysis',
            'subcomponent',
            subcomponentId,
            {
                worksheetData,
                analysis: {
                    ...analysis,
                    score: analysis.score // Ensure score is included
                }
            },
            (err) => {
                if (err) {
                    console.error('Failed to log analysis:', err);
                }
            }
        );
        
        // Save the analysis score to database
        const blockId = parseInt(subcomponentId.split('-')[0]);
        
        // Save to database using the score manager
        scoreManager.saveSubcomponentScore(
            userId,
            blockId,
            subcomponentId,
            analysis.score,
            'ai-analysis',
            {
                worksheetData,
                analysis: analysis
            }
        ).then(result => {
            console.log(`📊 Saved analysis score to database: ${analysis.score}% for ${subcomponentId}`);
            console.log(`📊 Block score updated to: ${result.blockScore}%`);
        }).catch(err => {
            console.error('Failed to save score to database:', err);
        });
        
        res.json(analysis);
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({
            error: 'Analysis failed',
            message: error.message
        });
    }
});

// Analyze founding team capability with AI agent
app.post('/api/analyze/founding-team', (req, res) => {
    const { worksheetData, subcomponentId } = req.body;
    
    console.log('👨‍👩‍👧‍👦 API: /api/analyze/founding-team called');
    console.log('📝 Worksheet data received:', worksheetData ? 'Yes' : 'No');
    console.log('🆔 Subcomponent ID:', subcomponentId);
    
    if (!worksheetData) {
        console.error('❌ API: No worksheet data provided');
        return res.status(400).json({ error: 'No worksheet data provided' });
    }
    
    try {
        // Load the Founding Team agent
        const FoundingTeamAgent = require('./founding-team-agent-enhanced');
        
        // Create agent instance
        console.log('🤖 Creating FoundingTeamAgentEnhanced instance...');
        const agent = new FoundingTeamAgent();

        // Analyze the worksheet
        console.log('🔬 Analyzing worksheet with founding team agent...');
        const analysis = agent.analyzeWorksheet(worksheetData);
        
        // Debug logging
        console.log('=== FOUNDING TEAM AGENT SCORING RESULTS ===');
        console.log('✅ Overall Score:', analysis.score);
        console.log('📊 Detailed Scores:', JSON.stringify(analysis.detailedScores, null, 2));
        
        // Log each dimension's score details
        if (analysis.detailedScores) {
            console.log('📈 Dimension Breakdown:');
            Object.entries(analysis.detailedScores).forEach(([dimension, data]) => {
                console.log(`  ${dimension}: score=${data.score}/${data.maxScore}, percentage=${data.percentage || 'N/A'}%, weight=${data.weight}`);
            });
        }
        
        // Log recommendations
        if (analysis.recommendations && analysis.recommendations.length > 0) {
            console.log('🎯 Recommendations:');
            analysis.recommendations.forEach((rec, index) => {
                console.log(`  ${index + 1}. ${rec.area}: ${rec.impact} (Priority: ${rec.priority})`);
            });
        }
        
        console.log('=== END FOUNDING TEAM SCORING ===');
        
        // Log the analysis AND save the score to history
        const userId = req.headers['x-user-id'] || 1;
        
        // Save the analysis with score to activity log for history tracking
        Database.logActivity(
            userId,
            'worksheet_analysis',
            'subcomponent',
            subcomponentId,
            {
                worksheetData,
                analysis: {
                    ...analysis,
                    score: analysis.score // Ensure score is included
                }
            },
            (err) => {
                if (err) {
                    console.error('Failed to log analysis:', err);
                }
            }
        );
        
        // Save the analysis score to database
        const blockId = parseInt(subcomponentId.split('-')[0]);
        
        // Save to database using the score manager
        scoreManager.saveSubcomponentScore(
            userId,
            blockId,
            subcomponentId,
            analysis.score,
            'ai-analysis',
            {
                worksheetData,
                analysis: analysis
            }
        ).then(result => {
            console.log(`📊 Saved analysis score to database: ${analysis.score}% for ${subcomponentId}`);
            console.log(`📊 Block score updated to: ${result.blockScore}%`);
        }).catch(err => {
            console.error('Failed to save score to database:', err);
        });
        
        res.json(analysis);
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({
            error: 'Analysis failed',
            message: error.message
        });
    }
});

// Analyze market insight with AI agent
app.post('/api/analyze/market-insight', (req, res) => {
    const { worksheetData, subcomponentId } = req.body;
    
    console.log('📈 API: /api/analyze/market-insight called');
    console.log('📝 Worksheet data received:', worksheetData ? 'Yes' : 'No');
    console.log('🆔 Subcomponent ID:', subcomponentId);
    
    if (!worksheetData) {
        console.error('❌ API: No worksheet data provided');
        return res.status(400).json({ error: 'No worksheet data provided' });
    }
    
    try {
        // Load the Market Insight agent
        const MarketInsightAgent = require('./market-insight-agent-enhanced');
        
        // Create agent instance
        console.log('🤖 Creating MarketInsightAgentEnhanced instance...');
        const agent = new MarketInsightAgent();

        // Analyze the worksheet
        console.log('🔬 Analyzing worksheet with market insight agent...');
        const analysis = agent.analyzeWorksheet(worksheetData);
        
        // Debug logging
        console.log('=== MARKET INSIGHT AGENT SCORING RESULTS ===');
        console.log('✅ Overall Score:', analysis.score);
        console.log('📊 Detailed Scores:', JSON.stringify(analysis.detailedScores, null, 2));
        
        // Log each dimension's score details
        if (analysis.detailedScores) {
            console.log('📈 Dimension Breakdown:');
            Object.entries(analysis.detailedScores).forEach(([dimension, data]) => {
                console.log(`  ${dimension}: score=${data.score}/${data.maxScore}, percentage=${data.percentage || 'N/A'}%, weight=${data.weight}`);
            });
        }
        
        // Log recommendations
        if (analysis.recommendations && analysis.recommendations.length > 0) {
            console.log('🎯 Recommendations:');
            analysis.recommendations.forEach((rec, index) => {
                console.log(`  ${index + 1}. ${rec.area}: ${rec.impact} (Priority: ${rec.priority})`);
            });
        }
        
        console.log('=== END MARKET INSIGHT SCORING ===');
        
        // Log the analysis AND save the score to history
        const userId = req.headers['x-user-id'] || 1;
        
        // Save the analysis with score to activity log for history tracking
        Database.logActivity(
            userId,
            'worksheet_analysis',
            'subcomponent',
            subcomponentId,
            {
                worksheetData,
                analysis: {
                    ...analysis,
                    score: analysis.score // Ensure score is included
                }
            },
            (err) => {
                if (err) {
                    console.error('Failed to log analysis:', err);
                }
            }
        );
        
        // Save the analysis score to database
        const blockId = parseInt(subcomponentId.split('-')[0]);
        
        // Save to database using the score manager
        scoreManager.saveSubcomponentScore(
            userId,
            blockId,
            subcomponentId,
            analysis.score,
            'ai-analysis',
            {
                worksheetData,
                analysis: analysis
            }
        ).then(result => {
            console.log(`📊 Saved analysis score to database: ${analysis.score}% for ${subcomponentId}`);
            console.log(`📊 Block score updated to: ${result.blockScore}%`);
        }).catch(err => {
            console.error('Failed to save score to database:', err);
        });
        
        res.json(analysis);
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({
            error: 'Analysis failed',
            message: error.message
        });
    }
});

// Analyze prototype launch plan with AI agent
app.post('/api/analyze/prototype-launch', (req, res) => {
    const { worksheetData, subcomponentId } = req.body;
    
    console.log('🚀 API: /api/analyze/prototype-launch called');
    console.log('📝 Worksheet data received:', worksheetData ? 'Yes' : 'No');
    console.log('🆔 Subcomponent ID:', subcomponentId);
    
    if (!worksheetData) {
        console.error('❌ API: No worksheet data provided');
        return res.status(400).json({ error: 'No worksheet data provided' });
    }
    
    try {
        // Load the Prototype Launch agent
        const PrototypeLaunchAgent = require('./prototype-launch-agent-enhanced');
        
        // Create agent instance
        console.log('🤖 Creating PrototypeLaunchAgentEnhanced instance...');
        const agent = new PrototypeLaunchAgent();

        // Analyze the worksheet - pass subcomponentId as second parameter
        console.log('🔬 Analyzing worksheet with prototype launch agent...');
        const analysis = agent.analyzeWorksheet(worksheetData, subcomponentId);
        
        // Debug logging
        console.log('=== PROTOTYPE LAUNCH AGENT SCORING RESULTS ===');
        console.log('✅ Overall Score:', analysis.score);
        console.log('📊 Detailed Scores:', JSON.stringify(analysis.detailedScores, null, 2));
        
        // Log each dimension's score details
        if (analysis.detailedScores) {
            console.log('📈 Dimension Breakdown:');
            Object.entries(analysis.detailedScores).forEach(([dimension, data]) => {
                console.log(`  ${dimension}: score=${data.score}/${data.maxScore}, percentage=${data.percentage || 'N/A'}%, weight=${data.weight}`);
            });
        }
        
        // Log recommendations
        if (analysis.recommendations && analysis.recommendations.length > 0) {
            console.log('🎯 Recommendations:');
            analysis.recommendations.forEach((rec, index) => {
                console.log(`  ${index + 1}. ${rec.area}: ${rec.impact} (Priority: ${rec.priority})`);
            });
        }
        
        console.log('=== END PROTOTYPE LAUNCH SCORING ===');
        
        // Log the analysis AND save the score to history
        const userId = req.headers['x-user-id'] || 1;
        
        // Save the analysis with score to activity log for history tracking
        Database.logActivity(
            userId,
            'worksheet_analysis',
            'subcomponent',
            subcomponentId,
            {
                worksheetData,
                analysis: {
                    ...analysis,
                    score: analysis.score // Ensure score is included
                }
            },
            (err) => {
                if (err) {
                    console.error('Failed to log analysis:', err);
                }
            }
        );
        
        // Save the analysis score to database
        const blockId = parseInt(subcomponentId.split('-')[0]);
        
        // Save to database using the score manager
        scoreManager.saveSubcomponentScore(
            userId,
            blockId,
            subcomponentId,
            analysis.score,
            'ai-analysis',
            {
                worksheetData,
                analysis: analysis
            }
        ).then(result => {
            console.log(`📊 Saved analysis score to database: ${analysis.score}% for ${subcomponentId}`);
            console.log(`📊 Block score updated to: ${result.blockScore}%`);
        }).catch(err => {
            console.error('Failed to save score to database:', err);
        });
        
        res.json(analysis);
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({
            error: 'Analysis failed',
            message: error.message
        });
    }
});

// Analyze interview cadence plan with AI agent (Customer Insights 2-1)
app.post('/api/analyze/interview-cadence', (req, res) => {
    const { worksheetData, subcomponentId } = req.body;
    
    console.log('📅 API: /api/analyze/interview-cadence called');
    console.log('📝 Worksheet data received:', worksheetData ? 'Yes' : 'No');
    console.log('🆔 Subcomponent ID:', subcomponentId);
    
    if (!worksheetData) {
        console.error('❌ API: No worksheet data provided');
        return res.status(400).json({ error: 'No worksheet data provided' });
    }
    
    try {
        // Load the Interview Cadence agent
        const InterviewCadenceAgent = require('./interview-cadence-agent-enhanced');
        
        // Create agent instance
        console.log('🤖 Creating InterviewCadenceAgentEnhanced instance...');
        const agent = new InterviewCadenceAgent();

        // Analyze the worksheet
        console.log('🔬 Analyzing worksheet with interview cadence agent...');
        const analysis = agent.analyzeWorksheet(worksheetData);
        
        // Debug logging
        console.log('=== INTERVIEW CADENCE AGENT SCORING RESULTS ===');
        console.log('✅ Overall Score:', analysis.score);
        console.log('📊 Detailed Scores:', JSON.stringify(analysis.detailedScores, null, 2));
        
        // Log the analysis AND save the score to history
        const userId = req.headers['x-user-id'] || 1;
        
        // Save the analysis with score to activity log for history tracking
        Database.logActivity(
            userId,
            'worksheet_analysis',
            'subcomponent',
            subcomponentId,
            {
                worksheetData,
                analysis: {
                    ...analysis,
                    score: analysis.score
                }
            },
            (err) => {
                if (err) {
                    console.error('Failed to log analysis:', err);
                }
            }
        );
        
        // Save the analysis score to database
        const blockId = parseInt(subcomponentId.split('-')[0]);
        
        // Save to database using the score manager
        scoreManager.saveSubcomponentScore(
            userId,
            blockId,
            subcomponentId,
            analysis.score,
            'ai-analysis',
            {
                worksheetData,
                analysis: analysis
            }
        ).then(result => {
            console.log(`📊 Saved analysis score to database: ${analysis.score}% for ${subcomponentId}`);
            console.log(`📊 Block score updated to: ${result.blockScore}%`);
        }).catch(err => {
            console.error('Failed to save score to database:', err);
        });
        
        res.json(analysis);
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({
            error: 'Analysis failed',
            message: error.message
        });
    }
});

// Analyze personas framework with AI agent (Customer Insights 2-2)
app.post('/api/analyze/personas-framework', (req, res) => {
    const { worksheetData, subcomponentId } = req.body;
    
    console.log('👤 API: /api/analyze/personas-framework called');
    console.log('📝 Worksheet data received:', worksheetData ? 'Yes' : 'No');
    console.log('🆔 Subcomponent ID:', subcomponentId);
    
    if (!worksheetData) {
        console.error('❌ API: No worksheet data provided');
        return res.status(400).json({ error: 'No worksheet data provided' });
    }
    
    try {
        // Load the Personas Framework agent
        const PersonasFrameworkAgent = require('./personas-framework-agent-enhanced');
        
        // Create agent instance
        console.log('🤖 Creating PersonasFrameworkAgentEnhanced instance...');
        const agent = new PersonasFrameworkAgent();

        // Analyze the worksheet
        console.log('🔬 Analyzing worksheet with personas framework agent...');
        const analysis = agent.analyzeWorksheet(worksheetData);
        
        // Debug logging
        console.log('=== PERSONAS FRAMEWORK AGENT SCORING RESULTS ===');
        console.log('✅ Overall Score:', analysis.score);
        console.log('📊 Detailed Scores:', JSON.stringify(analysis.detailedScores, null, 2));
        
        // Log the analysis AND save the score to history
        const userId = req.headers['x-user-id'] || 1;
        
        // Save the analysis with score to activity log for history tracking
        Database.logActivity(
            userId,
            'worksheet_analysis',
            'subcomponent',
            subcomponentId,
            {
                worksheetData,
                analysis: {
                    ...analysis,
                    score: analysis.score
                }
            },
            (err) => {
                if (err) {
                    console.error('Failed to log analysis:', err);
                }
            }
        );
        
        // Save the analysis score to database
        const blockId = parseInt(subcomponentId.split('-')[0]);
        
        // Save to database using the score manager
        scoreManager.saveSubcomponentScore(
            userId,
            blockId,
            subcomponentId,
            analysis.score,
            'ai-analysis',
            {
                worksheetData,
                analysis: analysis
            }
        ).then(result => {
            console.log(`📊 Saved analysis score to database: ${analysis.score}% for ${subcomponentId}`);
            console.log(`📊 Block score updated to: ${result.blockScore}%`);
        }).catch(err => {
            console.error('Failed to save score to database:', err);
        });
        
        res.json(analysis);
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({
            error: 'Analysis failed',
            message: error.message
        });
    }
});

// Analyze pain point mapping with AI agent (Customer Insights 2-3)
app.post('/api/analyze/pain-point-mapping', (req, res) => {
    const { worksheetData, subcomponentId } = req.body;
    
    console.log('🎯 API: /api/analyze/pain-point-mapping called');
    console.log('📝 Worksheet data received:', worksheetData ? 'Yes' : 'No');
    console.log('🆔 Subcomponent ID:', subcomponentId);
    
    if (!worksheetData) {
        console.error('❌ API: No worksheet data provided');
        return res.status(400).json({ error: 'No worksheet data provided' });
    }
    
    try {
        // Load the Pain Point Mapping agent
        const PainPointMappingAgent = require('./pain-point-mapping-agent-enhanced');
        
        // Create agent instance
        console.log('🤖 Creating PainPointMappingAgentEnhanced instance...');
        const agent = new PainPointMappingAgent();

        // Analyze the worksheet
        console.log('🔬 Analyzing worksheet with pain point mapping agent...');
        const analysis = agent.analyzeWorksheet(worksheetData);
        
        // Debug logging
        console.log('=== PAIN POINT MAPPING AGENT SCORING RESULTS ===');
        console.log('✅ Overall Score:', analysis.score);
        console.log('📊 Detailed Scores:', JSON.stringify(analysis.detailedScores, null, 2));
        
        // Log the analysis AND save the score to history
        const userId = req.headers['x-user-id'] || 1;
        
        // Save the analysis with score to activity log for history tracking
        Database.logActivity(
            userId,
            'worksheet_analysis',
            'subcomponent',
            subcomponentId,
            {
                worksheetData,
                analysis: {
                    ...analysis,
                    score: analysis.score
                }
            },
            (err) => {
                if (err) {
                    console.error('Failed to log analysis:', err);
                }
            }
        );
        
        // Save the analysis score to database
        const blockId = parseInt(subcomponentId.split('-')[0]);
        
        // Save to database using the score manager
        scoreManager.saveSubcomponentScore(
            userId,
            blockId,
            subcomponentId,
            analysis.score,
            'ai-analysis',
            {
                worksheetData,
                analysis: analysis
            }
        ).then(result => {
            console.log(`📊 Saved analysis score to database: ${analysis.score}% for ${subcomponentId}`);
            console.log(`📊 Block score updated to: ${result.blockScore}%`);
        }).catch(err => {
            console.error('Failed to save score to database:', err);
        });
        
        res.json(analysis);
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({
            error: 'Analysis failed',
            message: error.message
        });
    }
});

// Analyze JTBD capture with AI agent (Customer Insights 2-4)
app.post('/api/analyze/jtbd-capture', (req, res) => {
    const { worksheetData, subcomponentId } = req.body;
    
    console.log('💼 API: /api/analyze/jtbd-capture called');
    console.log('📝 Worksheet data received:', worksheetData ? 'Yes' : 'No');
    console.log('🆔 Subcomponent ID:', subcomponentId);
    
    if (!worksheetData) {
        console.error('❌ API: No worksheet data provided');
        return res.status(400).json({ error: 'No worksheet data provided' });
    }
    
    try {
        // Load the JTBD Capture agent
        const JTBDCaptureAgent = require('./jtbd-capture-agent-enhanced');
        
        // Create agent instance
        console.log('🤖 Creating JTBDCaptureAgentEnhanced instance...');
        const agent = new JTBDCaptureAgent();

        // Analyze the worksheet
        console.log('🔬 Analyzing worksheet with JTBD capture agent...');
        const analysis = agent.analyzeWorksheet(worksheetData);
        
        // Debug logging
        console.log('=== JTBD CAPTURE AGENT SCORING RESULTS ===');
        console.log('✅ Overall Score:', analysis.score);
        console.log('📊 Detailed Scores:', JSON.stringify(analysis.detailedScores, null, 2));
        
        // Log the analysis AND save the score to history
        const userId = req.headers['x-user-id'] || 1;
        
        // Save the analysis with score to activity log for history tracking
        Database.logActivity(
            userId,
            'worksheet_analysis',
            'subcomponent',
            subcomponentId,
            {
                worksheetData,
                analysis: {
                    ...analysis,
                    score: analysis.score
                }
            },
            (err) => {
                if (err) {
                    console.error('Failed to log analysis:', err);
                }
            }
        );
        
        // Save the analysis score to database
        const blockId = parseInt(subcomponentId.split('-')[0]);
        
        // Save to database using the score manager
        scoreManager.saveSubcomponentScore(
            userId,
            blockId,
            subcomponentId,
            analysis.score,
            'ai-analysis',
            {
                worksheetData,
                analysis: analysis
            }
        ).then(result => {
            console.log(`📊 Saved analysis score to database: ${analysis.score}% for ${subcomponentId}`);
            console.log(`📊 Block score updated to: ${result.blockScore}%`);
        }).catch(err => {
            console.error('Failed to save score to database:', err);
        });
        
        res.json(analysis);
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({
            error: 'Analysis failed',
            message: error.message
        });
    }
});

// Analyze signal grading with AI agent (Customer Insights 2-5)
app.post('/api/analyze/signal-grading', (req, res) => {
    const { worksheetData, subcomponentId } = req.body;
    
    console.log('📊 API: /api/analyze/signal-grading called');
    console.log('📝 Worksheet data received:', worksheetData ? 'Yes' : 'No');
    console.log('🆔 Subcomponent ID:', subcomponentId);
    
    if (!worksheetData) {
        console.error('❌ API: No worksheet data provided');
        return res.status(400).json({ error: 'No worksheet data provided' });
    }
    
    try {
        // Load the Signal Grading agent
        const SignalGradingAgent = require('./signal-grading-agent-enhanced');
        
        // Create agent instance
        console.log('🤖 Creating SignalGradingAgentEnhanced instance...');
        const agent = new SignalGradingAgent();

        // Analyze the worksheet
        console.log('🔬 Analyzing worksheet with signal grading agent...');
        const analysis = agent.analyzeWorksheet(worksheetData);
        
        // Debug logging
        console.log('=== SIGNAL GRADING AGENT SCORING RESULTS ===');
        console.log('✅ Overall Score:', analysis.score);
        console.log('📊 Detailed Scores:', JSON.stringify(analysis.detailedScores, null, 2));
        
        // Log the analysis AND save the score to history
        const userId = req.headers['x-user-id'] || 1;
        
        // Save the analysis with score to activity log for history tracking
        Database.logActivity(
            userId,
            'worksheet_analysis',
            'subcomponent',
            subcomponentId,
            {
                worksheetData,
                analysis: {
                    ...analysis,
                    score: analysis.score
                }
            },
            (err) => {
                if (err) {
                    console.error('Failed to log analysis:', err);
                }
            }
        );
        
        // Save the analysis score to database
        const blockId = parseInt(subcomponentId.split('-')[0]);
        
        // Save to database using the score manager
        scoreManager.saveSubcomponentScore(
            userId,
            blockId,
            subcomponentId,
            analysis.score,
            'ai-analysis',
            {
                worksheetData,
                analysis: analysis
            }
        ).then(result => {
            console.log(`📊 Saved analysis score to database: ${analysis.score}% for ${subcomponentId}`);
            console.log(`📊 Block score updated to: ${result.blockScore}%`);
        }).catch(err => {
            console.error('Failed to save score to database:', err);
        });
        
        res.json(analysis);
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({
            error: 'Analysis failed',
            message: error.message
        });
    }
});

// Analyze insight-to-action loop with AI agent (Customer Insights 2-6)
app.post('/api/analyze/insight-action', (req, res) => {
    const { worksheetData, subcomponentId } = req.body;
    
    console.log('🔄 API: /api/analyze/insight-action called');
    console.log('📝 Worksheet data received:', worksheetData ? 'Yes' : 'No');
    console.log('🆔 Subcomponent ID:', subcomponentId);
    
    if (!worksheetData) {
        console.error('❌ API: No worksheet data provided');
        return res.status(400).json({ error: 'No worksheet data provided' });
    }
    
    try {
        // Load the Insight-to-Action agent
        const InsightActionAgent = require('./insight-action-agent-enhanced');
        
        // Create agent instance
        console.log('🤖 Creating InsightActionAgentEnhanced instance...');
        const agent = new InsightActionAgent();

        // Analyze the worksheet
        console.log('🔬 Analyzing worksheet with insight-to-action agent...');
        const analysis = agent.analyzeWorksheet(worksheetData);
        
        // Debug logging
        console.log('=== INSIGHT-TO-ACTION AGENT SCORING RESULTS ===');
        console.log('✅ Overall Score:', analysis.score);
        console.log('📊 Detailed Scores:', JSON.stringify(analysis.detailedScores, null, 2));
        
        // Log the analysis AND save the score to history
        const userId = req.headers['x-user-id'] || 1;
        
        // Save the analysis with score to activity log for history tracking
        Database.logActivity(
            userId,
            'worksheet_analysis',
            'subcomponent',
            subcomponentId,
            {
                worksheetData,
                analysis: {
                    ...analysis,
                    score: analysis.score
                }
            },
            (err) => {
                if (err) {
                    console.error('Failed to log analysis:', err);
                }
            }
        );
        
        // Save the analysis score to database
        const blockId = parseInt(subcomponentId.split('-')[0]);
        
        // Save to database using the score manager
        scoreManager.saveSubcomponentScore(
            userId,
            blockId,
            subcomponentId,
            analysis.score,
            'ai-analysis',
            {
                worksheetData,
                analysis: analysis
            }
        ).then(result => {
            console.log(`📊 Saved analysis score to database: ${analysis.score}% for ${subcomponentId}`);
            console.log(`📊 Block score updated to: ${result.blockScore}%`);
        }).catch(err => {
            console.error('Failed to save score to database:', err);
        });
        
        res.json(analysis);
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({
            error: 'Analysis failed',
            message: error.message
        });
    }
});

// Analyze use case scoring model with AI agent (Strategic Prioritization 3-1)
app.post('/api/analyze/use-case-scoring', (req, res) => {
    const { worksheetData, subcomponentId } = req.body;
    
    console.log('📊 API: /api/analyze/use-case-scoring called');
    console.log('📝 Worksheet data received:', worksheetData ? 'Yes' : 'No');
    console.log('🆔 Subcomponent ID:', subcomponentId);
    
    if (!worksheetData) {
        console.error('❌ API: No worksheet data provided');
        return res.status(400).json({ error: 'No worksheet data provided' });
    }
    
    try {
        // Load the Use Case Scoring agent
        const UseCaseScoringAgent = require('./use-case-scoring-agent-enhanced');
        
        // Create agent instance
        console.log('🤖 Creating UseCaseScoringAgentEnhanced instance...');
        const agent = new UseCaseScoringAgent();

        // Analyze the worksheet
        console.log('🔬 Analyzing worksheet with use case scoring agent...');
        const analysis = agent.analyzeWorksheet(worksheetData);
        
        // Debug logging
        console.log('=== USE CASE SCORING AGENT SCORING RESULTS ===');
        console.log('✅ Overall Score:', analysis.score);
        console.log('📊 Detailed Scores:', JSON.stringify(analysis.detailedScores, null, 2));
        
        // Log the analysis AND save the score to history
        const userId = req.headers['x-user-id'] || 1;
        
        // Save the analysis with score to activity log for history tracking
        Database.logActivity(
            userId,
            'worksheet_analysis',
            'subcomponent',
            subcomponentId,
            {
                worksheetData,
                analysis: {
                    ...analysis,
                    score: analysis.score
                }
            },
            (err) => {
                if (err) {
                    console.error('Failed to log analysis:', err);
                }
            }
        );
        
        // Save the analysis score to database
        const blockId = parseInt(subcomponentId.split('-')[0]);
        
        // Save to database using the score manager
        scoreManager.saveSubcomponentScore(
            userId,
            blockId,
            subcomponentId,
            analysis.score,
            'ai-analysis',
            {
                worksheetData,
                analysis: analysis
            }
        ).then(result => {
            console.log(`📊 Saved analysis score to database: ${analysis.score}% for ${subcomponentId}`);
            console.log(`📊 Block score updated to: ${result.blockScore}%`);
        }).catch(err => {
            console.error('Failed to save score to database:', err);
        });
        
        res.json(analysis);
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({
            error: 'Analysis failed',
            message: error.message
        });
    }
});

// Analyze segment tiering with AI agent (Strategic Prioritization 3-2)
app.post('/api/analyze/segment-tiering', (req, res) => {
    const { worksheetData, subcomponentId } = req.body;
    
    console.log('🎯 API: /api/analyze/segment-tiering called');
    console.log('📝 Worksheet data received:', worksheetData ? 'Yes' : 'No');
    console.log('🆔 Subcomponent ID:', subcomponentId);
    
    if (!worksheetData) {
        console.error('❌ API: No worksheet data provided');
        return res.status(400).json({ error: 'No worksheet data provided' });
    }
    
    try {
        // Load the Segment Tiering agent
        const SegmentTieringAgent = require('./segment-tiering-agent-enhanced');
        
        // Create agent instance
        console.log('🤖 Creating SegmentTieringAgentEnhanced instance...');
        const agent = new SegmentTieringAgent();

        // Analyze the worksheet
        console.log('🔬 Analyzing worksheet with segment tiering agent...');
        const analysis = agent.analyzeWorksheet(worksheetData);
        
        // Debug logging
        console.log('=== SEGMENT TIERING AGENT SCORING RESULTS ===');
        console.log('✅ Overall Score:', analysis.score);
        console.log('📊 Detailed Scores:', JSON.stringify(analysis.detailedScores, null, 2));
        
        // Log the analysis AND save the score to history
        const userId = req.headers['x-user-id'] || 1;
        
        // Save the analysis with score to activity log for history tracking
        Database.logActivity(
            userId,
            'worksheet_analysis',
            'subcomponent',
            subcomponentId,
            {
                worksheetData,
                analysis: {
                    ...analysis,
                    score: analysis.score
                }
            },
            (err) => {
                if (err) {
                    console.error('Failed to log analysis:', err);
                }
            }
        );
        
        // Save the analysis score to database
        const blockId = parseInt(subcomponentId.split('-')[0]);
        
        // Save to database using the score manager
        scoreManager.saveSubcomponentScore(
            userId,
            blockId,
            subcomponentId,
            analysis.score,
            'ai-analysis',
            {
                worksheetData,
                analysis: analysis
            }
        ).then(result => {
            console.log(`📊 Saved analysis score to database: ${analysis.score}% for ${subcomponentId}`);
            console.log(`📊 Block score updated to: ${result.blockScore}%`);
        }).catch(err => {
            console.error('Failed to save score to database:', err);
        });
        
        res.json(analysis);
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({
            error: 'Analysis failed',
            message: error.message
        });
    }
});

// Analyze prioritization rubric with AI agent (Strategic Prioritization 3-3)
app.post('/api/analyze/prioritization-rubric', (req, res) => {
    const { worksheetData, subcomponentId } = req.body;
    
    console.log('📋 API: /api/analyze/prioritization-rubric called');
    console.log('📝 Worksheet data received:', worksheetData ? 'Yes' : 'No');
    console.log('🆔 Subcomponent ID:', subcomponentId);
    
    if (!worksheetData) {
        console.error('❌ API: No worksheet data provided');
        return res.status(400).json({ error: 'No worksheet data provided' });
    }
    
    try {
        // Load the Prioritization Rubric agent
        const PrioritizationRubricAgent = require('./prioritization-rubric-agent-enhanced');
        
        // Create agent instance
        console.log('🤖 Creating PrioritizationRubricAgentEnhanced instance...');
        const agent = new PrioritizationRubricAgent();

        // Analyze the worksheet
        console.log('🔬 Analyzing worksheet with prioritization rubric agent...');
        const analysis = agent.analyzeWorksheet(worksheetData);
        
        // Debug logging
        console.log('=== PRIORITIZATION RUBRIC AGENT SCORING RESULTS ===');
        console.log('✅ Overall Score:', analysis.score);
        console.log('📊 Detailed Scores:', JSON.stringify(analysis.detailedScores, null, 2));
        
        // Log the analysis AND save the score to history
        const userId = req.headers['x-user-id'] || 1;
        
        // Save the analysis with score to activity log for history tracking
        Database.logActivity(
            userId,
            'worksheet_analysis',
            'subcomponent',
            subcomponentId,
            {
                worksheetData,
                analysis: {
                    ...analysis,
                    score: analysis.score
                }
            },
            (err) => {
                if (err) {
                    console.error('Failed to log analysis:', err);
                }
            }
        );
        
        // Save the analysis score to database
        const blockId = parseInt(subcomponentId.split('-')[0]);
        
        // Save to database using the score manager
        scoreManager.saveSubcomponentScore(
            userId,
            blockId,
            subcomponentId,
            analysis.score,
            'ai-analysis',
            {
                worksheetData,
                analysis: analysis
            }
        ).then(result => {
            console.log(`📊 Saved analysis score to database: ${analysis.score}% for ${subcomponentId}`);
            console.log(`📊 Block score updated to: ${result.blockScore}%`);
        }).catch(err => {
            console.error('Failed to save score to database:', err);
        });
        
        res.json(analysis);
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({
            error: 'Analysis failed',
            message: error.message
        });
    }
});

// Analyze tradeoff tracker with AI agent (Strategic Prioritization 3-4)
app.post('/api/analyze/tradeoff-tracker', (req, res) => {
    const { worksheetData, subcomponentId } = req.body;
    
    console.log('⚖️ API: /api/analyze/tradeoff-tracker called');
    console.log('📝 Worksheet data received:', worksheetData ? 'Yes' : 'No');
    console.log('🆔 Subcomponent ID:', subcomponentId);
    
    if (!worksheetData) {
        console.error('❌ API: No worksheet data provided');
        return res.status(400).json({ error: 'No worksheet data provided' });
    }
    
    try {
        // Load the Tradeoff Tracker agent
        const { TradeoffTrackerAgentEnhanced } = require('./strategic-prioritization-agents');
        
        // Create agent instance
        console.log('🤖 Creating TradeoffTrackerAgentEnhanced instance...');
        const agent = new TradeoffTrackerAgentEnhanced();

        // Analyze the worksheet
        console.log('🔬 Analyzing worksheet with tradeoff tracker agent...');
        const analysis = agent.analyzeWorksheet(worksheetData);
        
        // Debug logging
        console.log('=== TRADEOFF TRACKER AGENT SCORING RESULTS ===');
        console.log('✅ Overall Score:', analysis.score);
        console.log('📊 Detailed Scores:', JSON.stringify(analysis.detailedScores, null, 2));
        
        // Log the analysis AND save the score to history
        const userId = req.headers['x-user-id'] || 1;
        
        // Save the analysis with score to activity log for history tracking
        Database.logActivity(
            userId,
            'worksheet_analysis',
            'subcomponent',
            subcomponentId,
            {
                worksheetData,
                analysis: {
                    ...analysis,
                    score: analysis.score
                }
            },
            (err) => {
                if (err) {
                    console.error('Failed to log analysis:', err);
                }
            }
        );
        
        // Save the analysis score to database
        const blockId = parseInt(subcomponentId.split('-')[0]);
        
        // Save to database using the score manager
        scoreManager.saveSubcomponentScore(
            userId,
            blockId,
            subcomponentId,
            analysis.score,
            'ai-analysis',
            {
                worksheetData,
                analysis: analysis
            }
        ).then(result => {
            console.log(`📊 Saved analysis score to database: ${analysis.score}% for ${subcomponentId}`);
            console.log(`📊 Block score updated to: ${result.blockScore}%`);
        }).catch(err => {
            console.error('Failed to save score to database:', err);
        });
        
        res.json(analysis);
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({
            error: 'Analysis failed',
            message: error.message
        });
    }
});

// Analyze hypothesis board with AI agent (Strategic Prioritization 3-5)
app.post('/api/analyze/hypothesis-board', (req, res) => {
    const { worksheetData, subcomponentId } = req.body;
    
    console.log('💡 API: /api/analyze/hypothesis-board called');
    console.log('📝 Worksheet data received:', worksheetData ? 'Yes' : 'No');
    console.log('🆔 Subcomponent ID:', subcomponentId);
    
    if (!worksheetData) {
        console.error('❌ API: No worksheet data provided');
        return res.status(400).json({ error: 'No worksheet data provided' });
    }
    
    try {
        // Load the Hypothesis Board agent
        const { HypothesisBoardAgentEnhanced } = require('./strategic-prioritization-agents');
        
        // Create agent instance
        console.log('🤖 Creating HypothesisBoardAgentEnhanced instance...');
        const agent = new HypothesisBoardAgentEnhanced();

        // Analyze the worksheet
        console.log('🔬 Analyzing worksheet with hypothesis board agent...');
        const analysis = agent.analyzeWorksheet(worksheetData);
        
        // Debug logging
        console.log('=== HYPOTHESIS BOARD AGENT SCORING RESULTS ===');
        console.log('✅ Overall Score:', analysis.score);
        console.log('📊 Detailed Scores:', JSON.stringify(analysis.detailedScores, null, 2));
        
        // Log the analysis AND save the score to history
        const userId = req.headers['x-user-id'] || 1;
        
        // Save the analysis with score to activity log for history tracking
        Database.logActivity(
            userId,
            'worksheet_analysis',
            'subcomponent',
            subcomponentId,
            {
                worksheetData,
                analysis: {
                    ...analysis,
                    score: analysis.score
                }
            },
            (err) => {
                if (err) {
                    console.error('Failed to log analysis:', err);
                }
            }
        );
        
        // Save the analysis score to database
        const blockId = parseInt(subcomponentId.split('-')[0]);
        
        // Save to database using the score manager
        scoreManager.saveSubcomponentScore(
            userId,
            blockId,
            subcomponentId,
            analysis.score,
            'ai-analysis',
            {
                worksheetData,
                analysis: analysis
            }
        ).then(result => {
            console.log(`📊 Saved analysis score to database: ${analysis.score}% for ${subcomponentId}`);
            console.log(`📊 Block score updated to: ${result.blockScore}%`);
        }).catch(err => {
            console.error('Failed to save score to database:', err);
        });
        
        res.json(analysis);
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({
            error: 'Analysis failed',
            message: error.message
        });
    }
});

// Analyze decision archive with AI agent (Strategic Prioritization 3-6)
app.post('/api/analyze/decision-archive', (req, res) => {
    const { worksheetData, subcomponentId } = req.body;
    
    console.log('📚 API: /api/analyze/decision-archive called');
    console.log('📝 Worksheet data received:', worksheetData ? 'Yes' : 'No');
    console.log('🆔 Subcomponent ID:', subcomponentId);
    
    if (!worksheetData) {
        console.error('❌ API: No worksheet data provided');
        return res.status(400).json({ error: 'No worksheet data provided' });
    }
    
    try {
        // Load the Decision Archive agent
        const { DecisionArchiveAgentEnhanced } = require('./strategic-prioritization-agents');
        
        // Create agent instance
        console.log('🤖 Creating DecisionArchiveAgentEnhanced instance...');
        const agent = new DecisionArchiveAgentEnhanced();

        // Analyze the worksheet
        console.log('🔬 Analyzing worksheet with decision archive agent...');
        const analysis = agent.analyzeWorksheet(worksheetData);
        
        // Debug logging
        console.log('=== DECISION ARCHIVE AGENT SCORING RESULTS ===');
        console.log('✅ Overall Score:', analysis.score);
        console.log('📊 Detailed Scores:', JSON.stringify(analysis.detailedScores, null, 2));
        
        // Log the analysis AND save the score to history
        const userId = req.headers['x-user-id'] || 1;
        
        // Save the analysis with score to activity log for history tracking
        Database.logActivity(
            userId,
            'worksheet_analysis',
            'subcomponent',
            subcomponentId,
            {
                worksheetData,
                analysis: {
                    ...analysis,
                    score: analysis.score
                }
            },
            (err) => {
                if (err) {
                    console.error('Failed to log analysis:', err);
                }
            }
        );
        
        // Save the analysis score to database
        const blockId = parseInt(subcomponentId.split('-')[0]);
        
        // Save to database using the score manager
        scoreManager.saveSubcomponentScore(
            userId,
            blockId,
            subcomponentId,
            analysis.score,
            'ai-analysis',
            {
                worksheetData,
                analysis: analysis
            }
        ).then(result => {
            console.log(`📊 Saved analysis score to database: ${analysis.score}% for ${subcomponentId}`);
            console.log(`📊 Block score updated to: ${result.blockScore}%`);
        }).catch(err => {
            console.error('Failed to save score to database:', err);
        });
        
        res.json(analysis);
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({
            error: 'Analysis failed',
            message: error.message
        });
    }
});

// Generic analysis endpoint that routes to specific agents
app.post('/api/analyze/subcomponent', async (req, res) => {
    const { worksheetData, subcomponentId } = req.body;
    
    console.log('🔍 API: /api/analyze/subcomponent called');
    console.log('📝 Worksheet data received:', worksheetData ? 'Yes' : 'No');
    console.log('🆔 Subcomponent ID:', subcomponentId);
    
    if (!worksheetData) {
        console.error('❌ API: No worksheet data provided');
        return res.status(400).json({ error: 'No worksheet data provided' });
    }
    
    try {
        let agent;
        let agentName;
        
        // Route to the appropriate agent based on subcomponent ID
        switch(subcomponentId) {
            case '1-1':
                // Problem Statement
                const ProblemStatementAgent = require('./problem-statement-agent-enhanced');
                agent = new ProblemStatementAgent();
                agentName = 'ProblemStatementAgent';
                break;
                
            case '1-2':
                // Mission Statement
                const MissionStatementAgent = require('./mission-statement-agent-enhanced');
                agent = new MissionStatementAgent();
                agentName = 'MissionStatementAgent';
                break;
                
            // Add more cases for other subcomponents as agents are created
            case '1-3':
                // Customer Insight Capture
                const CustomerInsightAgent = require('./customer-insight-agent-enhanced');
                agent = new CustomerInsightAgent();
                agentName = 'CustomerInsightAgent';
                break;
                
            case '1-4':
                // Founding Team Capability
                const FoundingTeamAgent = require('./founding-team-agent-enhanced');
                agent = new FoundingTeamAgent();
                agentName = 'FoundingTeamAgent';
                break;
                
            case '1-5':
                // Market Insight Synthesis
                const MarketInsightAgent = require('./market-insight-agent-enhanced');
                agent = new MarketInsightAgent();
                agentName = 'MarketInsightAgent';
                break;
                
            case '1-6':
                // Prototype Launch Plan
                const PrototypeLaunchAgent = require('./prototype-launch-agent-enhanced');
                agent = new PrototypeLaunchAgent();
                agentName = 'PrototypeLaunchAgent';
                break;
                
            // Customer Insights agents (Block 2)
            case '2-1':
                // Interview Cadence Plan
                const InterviewCadenceAgent = require('./interview-cadence-agent-enhanced');
                agent = new InterviewCadenceAgent();
                agentName = 'InterviewCadenceAgent';
                break;
                
            case '2-2':
                // Personas Framework
                const PersonasFrameworkAgent = require('./personas-framework-agent-enhanced');
                agent = new PersonasFrameworkAgent();
                agentName = 'PersonasFrameworkAgent';
                break;
                
            case '2-3':
                // Pain Point Mapping
                const PainPointMappingAgent = require('./pain-point-mapping-agent-enhanced');
                agent = new PainPointMappingAgent();
                agentName = 'PainPointMappingAgent';
                break;
                
            case '2-4':
                // JTBD Capture
                const JTBDCaptureAgent = require('./jtbd-capture-agent-enhanced');
                agent = new JTBDCaptureAgent();
                agentName = 'JTBDCaptureAgent';
                break;
                
            case '2-5':
                // Signal Grading
                const SignalGradingAgent = require('./signal-grading-agent-enhanced');
                agent = new SignalGradingAgent();
                agentName = 'SignalGradingAgent';
                break;
                
            case '2-6':
                // Insight-to-Action Loop
                const InsightActionAgent = require('./insight-action-agent-enhanced');
                agent = new InsightActionAgent();
                agentName = 'InsightActionAgent';
                break;
                
            // Strategic Prioritization agents (Block 3)
            case '3-1':
                // Use Case Scoring Model
                const UseCaseScoringAgent = require('./use-case-scoring-agent-enhanced');
                agent = new UseCaseScoringAgent();
                agentName = 'UseCaseScoringAgent';
                break;
                
            case '3-2':
                // Segment Tiering
                const SegmentTieringAgent = require('./segment-tiering-agent-enhanced');
                agent = new SegmentTieringAgent();
                agentName = 'SegmentTieringAgent';
                break;
                
            case '3-3':
                // Prioritization Rubric
                const PrioritizationRubricAgent = require('./prioritization-rubric-agent-enhanced');
                agent = new PrioritizationRubricAgent();
                agentName = 'PrioritizationRubricAgent';
                break;
                
            case '3-4':
                // Tradeoff Tracker
                const { TradeoffTrackerAgentEnhanced } = require('./strategic-prioritization-agents');
                agent = new TradeoffTrackerAgentEnhanced();
                agentName = 'TradeoffTrackerAgent';
                break;
                
            case '3-5':
                // Hypothesis Board
                const { HypothesisBoardAgentEnhanced } = require('./strategic-prioritization-agents');
                agent = new HypothesisBoardAgentEnhanced();
                agentName = 'HypothesisBoardAgent';
                break;
                
            case '3-6':
                // Decision Archive
                const { DecisionArchiveAgentEnhanced } = require('./strategic-prioritization-agents');
                agent = new DecisionArchiveAgentEnhanced();
                agentName = 'DecisionArchiveAgent';
                break;
                
            default:
                // Default to Problem Statement agent for now
                console.log(`⚠️ No specific agent for subcomponent ${subcomponentId}, using default agent`);
                const DefaultAgent = require('./problem-statement-agent-enhanced');
                agent = new DefaultAgent();
                agentName = 'DefaultAgent';
                break;
        }
        
        console.log(`🤖 Using ${agentName} for analysis`);
        
        // Analyze the worksheet
        console.log('🔬 Analyzing worksheet with selected agent...');
        const analysis = agent.analyzeWorksheet(worksheetData);
        
        // Debug logging
        console.log(`=== ${agentName.toUpperCase()} SCORING RESULTS ===`);
        console.log('✅ Overall Score:', analysis.score);
        console.log('📊 Detailed Scores:', JSON.stringify(analysis.detailedScores, null, 2));
        
        // Log the analysis AND save the score to history
        const userId = req.headers['x-user-id'] || 1;
        
        // Save the analysis with score to activity log
        Database.logActivity(
            userId,
            'worksheet_analysis',
            'subcomponent',
            subcomponentId,
            {
                worksheetData,
                analysis: {
                    ...analysis,
                    score: analysis.score,
                    agent: agentName
                }
            },
            (err) => {
                if (err) {
                    console.error('Failed to log analysis:', err);
                }
            }
        );
        
        // Save the analysis score to database
        const blockId = parseInt(subcomponentId.split('-')[0]);
        
        // Save to database using the score manager
        await scoreManager.saveSubcomponentScore(
            userId,
            blockId,
            subcomponentId,
            analysis.score,
            'ai-analysis',
            {
                worksheetData,
                analysis: analysis,
                agent: agentName
            }
        ).then(result => {
            console.log(`📊 Saved analysis score to database: ${analysis.score}% for ${subcomponentId}`);
            console.log(`📊 Block score updated to: ${result.blockScore}%`);
        }).catch(err => {
            console.error('Failed to save score to database:', err);
        });
        
        res.json(analysis);
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({
            error: 'Analysis failed',
            message: error.message
        });
    }
});

// Update subcomponent score from analysis
app.post('/api/subcomponents/:id/score', async (req, res) => {
    const subcomponentId = req.params.id;
    const { score } = req.body;
    const userId = parseInt(req.headers['x-user-id']) || 1;
    
    // Parse block ID from subcomponent ID
    const blockId = parseInt(subcomponentId.split('-')[0]);
    
    try {
        // Save to database
        const result = await scoreManager.saveSubcomponentScore(
            userId,
            blockId,
            subcomponentId,
            score,
            'manual',
            { source: 'user-update' }
        );
        
        // Log the score update
        Database.logActivity(
            userId,
            'score_update',
            'subcomponent',
            subcomponentId,
            { oldScore: result.oldScore, newScore: score },
            (err) => {
                if (err) {
                    console.error('Failed to log score update:', err);
                }
            }
        );
        
        res.json({
            success: true,
            subcomponentScore: score,
            blockScore: result.blockScore,
            message: `Score updated to ${score}%`
        });
    } catch (error) {
        console.error('Error updating subcomponent score:', error);
        res.status(500).json({ error: 'Failed to update score' });
    }
});

// Get latest score for a subcomponent
app.get('/api/subcomponents/:id/score', (req, res) => {
    const subcomponentId = req.params.id;
    
    // Parse the subcomponent ID (format: "blockId-subIndex")
    const [blockId, subIndex] = subcomponentId.split('-').map(Number);
    
    if (subBlocks[blockId] && subBlocks[blockId][subIndex - 1]) {
        const subBlock = subBlocks[blockId][subIndex - 1];
        res.json({
            id: subcomponentId,
            score: subBlock.score,
            name: subBlock.name
        });
    } else {
        res.status(404).json({ error: 'Subcomponent not found' });
    }
});

// Get score history for a subcomponent
app.get('/api/subcomponents/:id/history', (req, res) => {
    const subcomponentId = req.params.id;
    const userId = req.headers['x-user-id'] || 1;
    
    // Get score history from activity log
    db.all(`
        SELECT
            created_at as timestamp,
            metadata,
            action
        FROM activity_log
        WHERE user_id = ?
        AND entity_id = ?
        AND action IN ('score_update', 'worksheet_analysis')
        ORDER BY created_at DESC
        LIMIT 20
    `, [userId, subcomponentId], (err, rows) => {
        if (err) {
            console.error('Error fetching score history:', err);
            return res.status(500).json({ error: 'Failed to fetch score history' });
        }
        
        let history = [];
        
        // Process each row to extract score information
        let previousScore = null;
        
        // Process in reverse order (oldest first) to calculate improvements correctly
        const reversedRows = rows.slice().reverse();
        const tempHistory = [];
        
        reversedRows.forEach(row => {
            try {
                const metadata = JSON.parse(row.metadata);
                let currentScore = null;
                let source = '';
                
                if (row.action === 'score_update' && metadata.newScore !== undefined) {
                    currentScore = metadata.newScore;
                    source = 'Manual Update';
                } else if (row.action === 'worksheet_analysis' && metadata.analysis && metadata.analysis.score !== undefined) {
                    currentScore = metadata.analysis.score;
                    source = 'AI Analysis';
                }
                
                if (currentScore !== null) {
                    const improvement = previousScore !== null ? currentScore - previousScore : 0;
                    tempHistory.push({
                        timestamp: row.timestamp,
                        score: currentScore,
                        source: source,
                        improvement: improvement
                    });
                    previousScore = currentScore;
                }
            } catch (e) {
                console.error('Error parsing history row:', e);
            }
        });
        
        // Reverse back to show newest first
        history = tempHistory.reverse();
        
        // If no history, create a default entry
        if (history.length === 0) {
            const blockId = parseInt(subcomponentId.split('-')[0]);
            const subIndex = parseInt(subcomponentId.split('-')[1]) - 1;
            
            if (subBlocks[blockId] && subBlocks[blockId][subIndex]) {
                history.push({
                    timestamp: new Date().toISOString(),
                    score: subBlocks[blockId][subIndex].score,
                    source: 'Initial Score',
                    improvement: 0
                });
            }
        }
        
        res.json(history);
    });
});

// Overall readiness score
app.get('/api/readiness', (req, res) => {
    const overallScore = Math.round(
        blocks.reduce((sum, b) => sum + b.score, 0) / blocks.length
    );
    
    const phaseReadiness = {
        ideaMarketFit: Math.round(
            blocks.filter(b => b.phase === 1).reduce((sum, b) => sum + b.score, 0) / 4
        ),
        productMarketFit: Math.round(
            blocks.filter(b => b.phase === 2).reduce((sum, b) => sum + b.score, 0) / 4
        ),
        goToMarket: Math.round(
            blocks.filter(b => b.phase === 3).reduce((sum, b) => sum + b.score, 0) / 4
        ),
        scalingImpact: blocks.find(b => b.id === 13).score,
        scale: Math.round(
            blocks.filter(b => b.phase === 5).reduce((sum, b) => sum + b.score, 0) / 3
        )
    };
    
    res.json({
        overall: overallScore,
        phases: phaseReadiness,
        timestamp: new Date().toISOString()
    });
});

// Serve pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/block-detail.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'block-detail.html'));
});

app.get('/subcomponent-detail.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'subcomponent-detail.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/admin.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/nav.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'nav.js'));
});

// Serve logo images
app.get('/Official_ScaleOps6_Logo.png', (req, res) => {
    res.sendFile(path.join(__dirname, 'Official_ScaleOps6_Logo.png'));
});

app.get('/ScaleOps6_logo.png', (req, res) => {
    res.sendFile(path.join(__dirname, 'ScaleOps6_logo.png'));
});

app.get('/scaleteam6_logo.png', (req, res) => {
    res.sendFile(path.join(__dirname, 'scaleteam6_logo.png'));
});

// Test navigation page
app.get('/test-navigation.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'test-navigation.html'));
});

// Admin API endpoints
app.get('/api/admin/users', (req, res) => {
    // Simple admin check - in production, verify with proper auth
    const sessionId = req.headers['x-session-id'];
    
    Database.getUserByEmail('admin@st6.com', (err, admin) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        
        // Get all users for admin
        db.all('SELECT id, email, name, company, role, created_at FROM users', (err, users) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to fetch users' });
            }
            res.json(users || []);
        });
    });
});

app.get('/api/admin/stats', (req, res) => {
    // Get platform statistics
    const stats = {
        totalUsers: 0,
        activeSessions: sessions.size,
        avgCompletion: 73,
        totalAssessments: Math.floor(Math.random() * 100) + 50,
        blockPerformance: blocks.map(b => ({
            id: b.id,
            name: b.name,
            avgScore: b.score
        }))
    };
    
    db.get('SELECT COUNT(*) as count FROM users', (err, result) => {
        if (!err && result) {
            stats.totalUsers = result.count;
        }
        res.json(stats);
    });
});

// Analytics endpoint
app.get('/api/analytics', (req, res) => {
    const userId = req.headers['x-user-id'];
    
    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Get user's progress analytics
    Database.getUserAllBlockScores(userId, (err, scores) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        
        const analytics = {
            overallProgress: 0,
            completedBlocks: 0,
            activeBlocks: 0,
            phaseProgress: {},
            recentActivity: []
        };
        
        if (scores && scores.length > 0) {
            analytics.overallProgress = Math.round(
                scores.reduce((sum, s) => sum + (s.score || 0), 0) / scores.length
            );
            analytics.completedBlocks = scores.filter(s => s.score >= 80).length;
            analytics.activeBlocks = scores.filter(s => s.score >= 40 && s.score < 80).length;
        }
        
        res.json(analytics);
    });
});



// Helper function to save analysis to database
async function saveAnalysisToDatabase(userId, subcomponentId, score, analysis) {
    const blockId = parseInt(subcomponentId.split('-')[0]);
    
    try {
        const result = await scoreManager.saveSubcomponentScore(
            userId,
            blockId,
            subcomponentId,
            score,
            'ai-analysis',
            { analysis }
        );
        console.log(`📊 Saved analysis score to database: ${score}% for ${subcomponentId}`);
        console.log(`📊 Block score updated to: ${result.blockScore}%`);
        return result;
    } catch (error) {
        console.error('Failed to save score to database:', error);
        throw error;
    }
}

// Phase 1 & 2 Analysis Endpoints

// Block 1: Mission Discovery - Routes to appropriate subcomponent agent
app.post('/api/analyze/mission-discovery', async (req, res) => {
    const { worksheetData, subcomponentId } = req.body;
    
    console.log('🎯 API: /api/analyze/mission-discovery called');
    console.log('📝 Worksheet data received:', worksheetData ? 'Yes' : 'No');
    console.log('🆔 Subcomponent ID:', subcomponentId);
    
    if (!worksheetData) {
        console.error('❌ API: No worksheet data provided');
        return res.status(400).json({ error: 'No worksheet data provided' });
    }
    
    try {
        let agent;
        let agentName;
        
        // Route to the appropriate agent based on subcomponent ID
        switch(subcomponentId) {
            case '1-1':
                const ProblemStatementAgent = require('./problem-statement-agent-enhanced');
                agent = new ProblemStatementAgent();
                agentName = 'ProblemStatementAgent';
                break;
            case '1-2':
                const MissionStatementAgent = require('./mission-statement-agent-enhanced');
                agent = new MissionStatementAgent();
                agentName = 'MissionStatementAgent';
                break;
            case '1-3':
                const CustomerInsightAgent = require('./customer-insight-agent-enhanced');
                agent = new CustomerInsightAgent();
                agentName = 'CustomerInsightAgent';
                break;
            case '1-4':
                const FoundingTeamAgent = require('./founding-team-agent-enhanced');
                agent = new FoundingTeamAgent();
                agentName = 'FoundingTeamAgent';
                break;
            case '1-5':
                const MarketInsightAgent = require('./market-insight-agent-enhanced');
                agent = new MarketInsightAgent();
                agentName = 'MarketInsightAgent';
                break;
            case '1-6':
                const PrototypeLaunchAgent = require('./prototype-launch-agent-enhanced');
                agent = new PrototypeLaunchAgent();
                agentName = 'PrototypeLaunchAgent';
                break;
            default:
                console.error(`❌ Unknown subcomponent ID for Block 1: ${subcomponentId}`);
                return res.status(400).json({ error: `Unknown subcomponent ID: ${subcomponentId}` });
        }
        
        console.log(`🤖 Using ${agentName} for Block 1 analysis`);
        
        // Analyze the worksheet
        console.log('🔬 Analyzing worksheet with selected agent...');
        const analysis = agent.analyzeWorksheet(worksheetData);
        
        // Debug logging
        console.log(`=== ${agentName.toUpperCase()} SCORING RESULTS ===`);
        console.log('✅ Overall Score:', analysis.score);
        console.log('📊 Detailed Scores:', JSON.stringify(analysis.detailedScores, null, 2));
        
        // Save to database
        const userId = req.headers['x-user-id'] || 1;
        const blockId = 1;
        
        // Save the analysis with score to activity log
        Database.logActivity(
            userId,
            'worksheet_analysis',
            'subcomponent',
            subcomponentId,
            {
                worksheetData,
                analysis: {
                    ...analysis,
                    score: analysis.score,
                    agent: agentName
                }
            },
            (err) => {
                if (err) {
                    console.error('Failed to log analysis:', err);
                }
            }
        );
        
        // Save to database using the score manager
        await scoreManager.saveSubcomponentScore(
            userId,
            blockId,
            subcomponentId,
            analysis.score,
            'ai-analysis',
            {
                worksheetData,
                analysis: analysis,
                agent: agentName
            }
        ).then(result => {
            console.log(`📊 Saved analysis score to database: ${analysis.score}% for ${subcomponentId}`);
            console.log(`📊 Block score updated to: ${result.blockScore}%`);
        }).catch(err => {
            console.error('Failed to save score to database:', err);
        });
        
        res.json(analysis);
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({
            error: 'Analysis failed',
            message: error.message
        });
    }
});

// Block 2: Customer Insights - Routes to appropriate subcomponent agent
app.post('/api/analyze/customer-insights', async (req, res) => {
    const { worksheetData, subcomponentId } = req.body;
    
    console.log('👥 API: /api/analyze/customer-insights called');
    console.log('📝 Worksheet data received:', worksheetData ? 'Yes' : 'No');
    console.log('🆔 Subcomponent ID:', subcomponentId);
    
    if (!worksheetData) {
        console.error('❌ API: No worksheet data provided');
        return res.status(400).json({ error: 'No worksheet data provided' });
    }
    
    try {
        let agent;
        let agentName;
        
        // Route to the appropriate agent based on subcomponent ID
        switch(subcomponentId) {
            case '2-1':
                const InterviewCadenceAgent = require('./interview-cadence-agent-enhanced');
                agent = new InterviewCadenceAgent();
                agentName = 'InterviewCadenceAgent';
                break;
            case '2-2':
                const PersonasFrameworkAgent = require('./personas-framework-agent-enhanced');
                agent = new PersonasFrameworkAgent();
                agentName = 'PersonasFrameworkAgent';
                break;
            case '2-3':
                const PainPointMappingAgent = require('./pain-point-mapping-agent-enhanced');
                agent = new PainPointMappingAgent();
                agentName = 'PainPointMappingAgent';
                break;
            case '2-4':
                const JTBDCaptureAgent = require('./jtbd-capture-agent-enhanced');
                agent = new JTBDCaptureAgent();
                agentName = 'JTBDCaptureAgent';
                break;
            case '2-5':
                const SignalGradingAgent = require('./signal-grading-agent-enhanced');
                agent = new SignalGradingAgent();
                agentName = 'SignalGradingAgent';
                break;
            case '2-6':
                const InsightActionAgent = require('./insight-action-agent-enhanced');
                agent = new InsightActionAgent();
                agentName = 'InsightActionAgent';
                break;
            default:
                console.error(`❌ Unknown subcomponent ID for Block 2: ${subcomponentId}`);
                return res.status(400).json({ error: `Unknown subcomponent ID: ${subcomponentId}` });
        }
        
        console.log(`🤖 Using ${agentName} for Block 2 analysis`);
        
        // Analyze the worksheet
        console.log('🔬 Analyzing worksheet with selected agent...');
        const analysis = agent.analyzeWorksheet(worksheetData);
        
        // Debug logging
        console.log(`=== ${agentName.toUpperCase()} SCORING RESULTS ===`);
        console.log('✅ Overall Score:', analysis.score);
        console.log('📊 Detailed Scores:', JSON.stringify(analysis.detailedScores, null, 2));
        
        // Save to database
        const userId = req.headers['x-user-id'] || 1;
        const blockId = 2;
        
        // Save the analysis with score to activity log
        Database.logActivity(
            userId,
            'worksheet_analysis',
            'subcomponent',
            subcomponentId,
            {
                worksheetData,
                analysis: {
                    ...analysis,
                    score: analysis.score,
                    agent: agentName
                }
            },
            (err) => {
                if (err) {
                    console.error('Failed to log analysis:', err);
                }
            }
        );
        
        // Save to database using the score manager
        await scoreManager.saveSubcomponentScore(
            userId,
            blockId,
            subcomponentId,
            analysis.score,
            'ai-analysis',
            {
                worksheetData,
                analysis: analysis,
                agent: agentName
            }
        ).then(result => {
            console.log(`📊 Saved analysis score to database: ${analysis.score}% for ${subcomponentId}`);
            console.log(`📊 Block score updated to: ${result.blockScore}%`);
        }).catch(err => {
            console.error('Failed to save score to database:', err);
        });
        
        res.json(analysis);
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({
            error: 'Analysis failed',
            message: error.message
        });
    }
});

// Block 3: Strategic Prioritization - Routes to appropriate subcomponent agent
app.post('/api/analyze/strategic-prioritization', async (req, res) => {
    const { worksheetData, subcomponentId } = req.body;
    
    console.log('🎯 API: /api/analyze/strategic-prioritization called');
    console.log('📝 Worksheet data received:', worksheetData ? 'Yes' : 'No');
    console.log('🆔 Subcomponent ID:', subcomponentId);
    
    if (!worksheetData) {
        console.error('❌ API: No worksheet data provided');
        return res.status(400).json({ error: 'No worksheet data provided' });
    }
    
    try {
        let agent;
        let agentName;
        
        // Route to the appropriate agent based on subcomponent ID
        switch(subcomponentId) {
            case '3-1':
                const UseCaseScoringAgent = require('./use-case-scoring-agent-enhanced');
                agent = new UseCaseScoringAgent();
                agentName = 'UseCaseScoringAgent';
                break;
            case '3-2':
                const SegmentTieringAgent = require('./segment-tiering-agent-enhanced');
                agent = new SegmentTieringAgent();
                agentName = 'SegmentTieringAgent';
                break;
            case '3-3':
                const PrioritizationRubricAgent = require('./prioritization-rubric-agent-enhanced');
                agent = new PrioritizationRubricAgent();
                agentName = 'PrioritizationRubricAgent';
                break;
            case '3-4':
                const { TradeoffTrackerAgentEnhanced } = require('./strategic-prioritization-agents');
                agent = new TradeoffTrackerAgentEnhanced();
                agentName = 'TradeoffTrackerAgent';
                break;
            case '3-5':
                const { HypothesisBoardAgentEnhanced } = require('./strategic-prioritization-agents');
                agent = new HypothesisBoardAgentEnhanced();
                agentName = 'HypothesisBoardAgent';
                break;
            case '3-6':
                const { DecisionArchiveAgentEnhanced } = require('./strategic-prioritization-agents');
                agent = new DecisionArchiveAgentEnhanced();
                agentName = 'DecisionArchiveAgent';
                break;
            default:
                console.error(`❌ Unknown subcomponent ID for Block 3: ${subcomponentId}`);
                return res.status(400).json({ error: `Unknown subcomponent ID: ${subcomponentId}` });
        }
        
        console.log(`🤖 Using ${agentName} for Block 3 analysis`);
        
        // Analyze the worksheet
        console.log('🔬 Analyzing worksheet with selected agent...');
        const analysis = agent.analyzeWorksheet(worksheetData);
        
        // Debug logging
        console.log(`=== ${agentName.toUpperCase()} SCORING RESULTS ===`);
        console.log('✅ Overall Score:', analysis.score);
        console.log('📊 Detailed Scores:', JSON.stringify(analysis.detailedScores, null, 2));
        
        // Save to database
        const userId = req.headers['x-user-id'] || 1;
        const blockId = 3;
        
        // Save the analysis with score to activity log
        Database.logActivity(
            userId,
            'worksheet_analysis',
            'subcomponent',
            subcomponentId,
            {
                worksheetData,
                analysis: {
                    ...analysis,
                    score: analysis.score,
                    agent: agentName
                }
            },
            (err) => {
                if (err) {
                    console.error('Failed to log analysis:', err);
                }
            }
        );
        
        // Save to database using the score manager
        await scoreManager.saveSubcomponentScore(
            userId,
            blockId,
            subcomponentId,
            analysis.score,
            'ai-analysis',
            {
                worksheetData,
                analysis: analysis,
                agent: agentName
            }
        ).then(result => {
            console.log(`📊 Saved analysis score to database: ${analysis.score}% for ${subcomponentId}`);
            console.log(`📊 Block score updated to: ${result.blockScore}%`);
        }).catch(err => {
            console.error('Failed to save score to database:', err);
        });
        
        res.json(analysis);
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({
            error: 'Analysis failed',
            message: error.message
        });
    }
});

// Block 5: Early Adopter Wins
app.post('/api/analyze/early-adopter-wins', async (req, res) => {
    try {
        const { worksheetData, subcomponentId } = req.body;
        console.log('🎯 Early Adopter Wins analysis for:', subcomponentId);
        
        const analysis = await earlyAdopterAgent.analyzeWorksheet(worksheetData, subcomponentId);
        
        // Save to database
        const userId = req.headers['x-user-id'] || '1';
        await saveAnalysisToDatabase(userId, subcomponentId, analysis.score, analysis);
        
        res.json(analysis);
    } catch (error) {
        console.error('Error in early adopter wins analysis:', error);
        res.status(500).json({ error: 'Analysis failed' });
    }
});

// Block 6: Customer Engagement Flywheel
app.post('/api/analyze/customer-engagement', async (req, res) => {
    try {
        const { worksheetData, subcomponentId } = req.body;
        console.log('🎯 Customer Engagement analysis for:', subcomponentId);
        
        const analysis = await customerEngagementAgent.analyzeWorksheet(worksheetData, subcomponentId);
        
        // Save to database
        const userId = req.headers['x-user-id'] || '1';
        await saveAnalysisToDatabase(userId, subcomponentId, analysis.score, analysis);
        
        res.json(analysis);
    } catch (error) {
        console.error('Error in customer engagement analysis:', error);
        res.status(500).json({ error: 'Analysis failed' });
    }
});

// Block 7: Quantifiable Impact
app.post('/api/analyze/quantifiable-impact', async (req, res) => {
    try {
        const { worksheetData, subcomponentId } = req.body;
        console.log('🎯 Quantifiable Impact analysis for:', subcomponentId);
        
        const analysis = await quantifiableImpactAgent.analyzeWorksheet(worksheetData, subcomponentId);
        
        // Save to database
        const userId = req.headers['x-user-id'] || '1';
        await saveAnalysisToDatabase(userId, subcomponentId, analysis.score, analysis);
        
        res.json(analysis);
    } catch (error) {
        console.error('Error in quantifiable impact analysis:', error);
        res.status(500).json({ error: 'Analysis failed' });
    }
});

// Block 8: Customer Success Expansion
app.post('/api/analyze/customer-success', async (req, res) => {
    try {
        const { worksheetData, subcomponentId } = req.body;
        console.log('🎯 Customer Success analysis for:', subcomponentId);
        
        const analysis = await customerSuccessAgent.analyzeWorksheet(worksheetData, subcomponentId);
        
        // Save to database
        const userId = req.headers['x-user-id'] || '1';
        await saveAnalysisToDatabase(userId, subcomponentId, analysis.score, analysis);
        
        res.json(analysis);
    } catch (error) {
        console.error('Error in customer success analysis:', error);
        res.status(500).json({ error: 'Analysis failed' });
    }
});


// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════╗
║                                                    ║
║     ScaleOps6 Platform 🚀                         ║
║     Growth Execution Framework                     ║
║                                                    ║
║     Server running at: http://localhost:${PORT}      ║
║                                                    ║
║     ✅ No Redis Required                          ║
║     ✅ In-Memory Cache Active                     ║
║     ✅ SQLite Database Connected                  ║
║     ✅ 16-Block Framework Ready                   ║
║     ✅ Brand Style Applied                        ║
║     ✅ All Blocks Accessible                      ║
║                                                    ║
╚════════════════════════════════════════════════════╝
    `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    cache.clear();
    process.exit(0);
});

module.exports = app;
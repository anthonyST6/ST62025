// Script to fix all modules with proper education content and preloaded workspace data

const fs = require('fs');
const path = require('path');

// Module-specific content definitions
const moduleContent = {
    '1-1': {
        title: 'Problem Statement',
        education: {
            what: 'A problem statement is a clear, concise description of the issue your product or service aims to solve. It articulates who is affected, what the problem is, when it occurs, and why it matters. A well-crafted problem statement serves as the foundation for your entire go-to-market strategy.',
            why: 'Without a clear problem statement, startups risk building solutions that nobody needs. Studies show that 42% of startups fail because there\'s no market need for their product. A strong problem statement ensures you\'re solving a real, painful problem that customers will pay to solve.',
            how: `
                <h3>Step 1: Identify Your Target Customer</h3>
                <p>Be specific about who experiences this problem. Define demographics, psychographics, and behavioral characteristics.</p>
                
                <h3>Step 2: Articulate the Problem</h3>
                <p>Describe the problem in the customer's own words. What frustration or pain do they experience?</p>
                
                <h3>Step 3: Quantify the Impact</h3>
                <p>Measure the problem in terms of time, money, or opportunity cost. How much does this problem cost them?</p>
                
                <h3>Step 4: Validate with Evidence</h3>
                <p>Support your problem statement with customer interviews, surveys, and market research data.</p>
            `
        },
        workspace: [
            { id: 'who-affected', label: 'Who is Affected? (Customer Persona)', type: 'textarea', value: 'B2B SaaS founders and GTM leaders at early-stage startups (Seed to Series B) with 10-50 employees' },
            { id: 'what-problem', label: 'What is the Problem?', type: 'textarea', value: 'Early-stage startups struggle to build and execute effective go-to-market strategies due to lack of structured frameworks, expert guidance, and proven playbooks.' },
            { id: 'when-occur', label: 'When Does it Occur? (Context)', type: 'input', value: 'During critical growth phases - transitioning from founder-led sales to building a sales team' },
            { id: 'what-impact', label: 'What is the Impact? (Metrics)', type: 'textarea', value: 'Startups lose 6-12 months of runway, $500K-$2M in wasted resources, 40% longer sales cycles' },
            { id: 'how-solving', label: 'How Are They Solving it Today?', type: 'textarea', value: 'Expensive consultants ($20-50K/month), generic online courses, trial-and-error approaches' }
        ]
    },
    '4-1': {
        title: 'Market Segmentation',
        education: {
            what: 'Market segmentation is the process of dividing your total addressable market (TAM) into distinct groups of potential customers who share similar characteristics, needs, and buying behaviors. This enables targeted go-to-market strategies for each segment.',
            why: 'Effective segmentation increases conversion rates by 10-30% and reduces customer acquisition costs by up to 50%. It allows you to focus resources on the most profitable segments and tailor your messaging to resonate with specific customer groups.',
            how: `
                <h3>Step 1: Define Segmentation Criteria</h3>
                <p>Choose relevant criteria such as company size, industry, geography, technology stack, or growth stage.</p>
                
                <h3>Step 2: Analyze Market Data</h3>
                <p>Use market research, customer data, and competitive analysis to identify distinct segments.</p>
                
                <h3>Step 3: Calculate TAM/SAM/SOM</h3>
                <p>Determine the Total Addressable Market, Serviceable Addressable Market, and Serviceable Obtainable Market for each segment.</p>
                
                <h3>Step 4: Prioritize Segments</h3>
                <p>Rank segments based on factors like market size, growth rate, competition, and your ability to serve them.</p>
                
                <h3>Step 5: Create Segment Profiles</h3>
                <p>Develop detailed profiles for each priority segment including needs, behaviors, and buying criteria.</p>
            `
        },
        workspace: [
            { id: 'target-segments', label: 'Target Market Segments', type: 'textarea', value: 'Enterprise B2B SaaS (500+ employees)\nMid-market technology companies (100-500 employees)\nHigh-growth startups (Series A-C, 20-100 employees)\nDigital transformation leaders in traditional industries' },
            { id: 'segment-criteria', label: 'Segmentation Criteria', type: 'textarea', value: 'Company size: Revenue $10M-$1B\nIndustry: Technology, Financial Services, Healthcare\nGrowth rate: 30%+ YoY\nTechnology maturity: Cloud-first, API-driven architecture\nBuying behavior: Committee-based decisions, 3-6 month sales cycles' },
            { id: 'tam-sam-som', label: 'TAM/SAM/SOM Analysis', type: 'textarea', value: 'TAM: $75B global B2B software market\nSAM: $12B addressable market in North America\nSOM: $1.2B realistic capture in 5 years (10% market share)\nYear 1: $50M (0.4% market penetration)\nYear 3: $300M (2.5% market penetration)' },
            { id: 'priority-segments', label: 'Priority Segments (Ranked)', type: 'textarea', value: '1. High-growth SaaS startups (fastest adoption, highest LTV)\n2. Mid-market tech companies (balance of volume and deal size)\n3. Enterprise financial services (highest contract values)\n4. Healthcare technology providers (regulatory moat)' }
        ]
    },
    '7-1': {
        title: 'Pricing Strategy',
        education: {
            what: 'Pricing strategy determines how you monetize value and capture revenue from customers. It encompasses pricing models (subscription, usage-based, tiered), price points, packaging, and positioning relative to alternatives.',
            why: 'Pricing is the most powerful profit lever - a 1% price increase can drive 11% profit improvement. Yet most companies spend less than 10 hours per year on pricing. Strategic pricing can accelerate growth, improve unit economics, and create competitive advantages.',
            how: `
                <h3>Step 1: Understand Value Metrics</h3>
                <p>Identify what customers value most and are willing to pay for. Common metrics include users, usage, features, or outcomes.</p>
                
                <h3>Step 2: Analyze Competitive Pricing</h3>
                <p>Research competitor pricing models, price points, and packaging to understand market positioning.</p>
                
                <h3>Step 3: Calculate Customer Willingness to Pay</h3>
                <p>Use surveys, conjoint analysis, and price testing to determine optimal price points for each segment.</p>
                
                <h3>Step 4: Design Pricing Tiers</h3>
                <p>Create 3-4 tiers that align with customer segments and encourage natural expansion over time.</p>
                
                <h3>Step 5: Test and Iterate</h3>
                <p>Run pricing experiments, monitor metrics like conversion and churn, and optimize continuously.</p>
            `
        },
        workspace: [
            { id: 'pricing-model', label: 'Pricing Model', type: 'textarea', value: 'Hybrid model: Subscription base + usage-based scaling\nBase platform fee: $500-5000/month\nUsage pricing: $0.10 per API call over included limits\nPremium features: Add-on modules at $200-1000/month' },
            { id: 'value-metrics', label: 'Value Metrics', type: 'textarea', value: 'Primary: Monthly active users (MAU)\nSecondary: API calls/transactions processed\nTertiary: Advanced features/integrations used\nOutcome-based: Revenue generated or costs saved' },
            { id: 'pricing-tiers', label: 'Pricing Tiers', type: 'textarea', value: 'Starter: $500/mo - Up to 100 users, core features\nGrowth: $2000/mo - Up to 500 users, advanced analytics\nScale: $5000/mo - Up to 2000 users, full platform\nEnterprise: Custom - Unlimited users, dedicated support' },
            { id: 'competitive-position', label: 'Competitive Positioning', type: 'textarea', value: '20% below enterprise competitors (Salesforce, Oracle)\n30% above low-end alternatives (spreadsheets, basic tools)\nValue proposition: Better ROI through faster implementation\nDifferentiator: No implementation fees, self-serve onboarding' }
        ]
    },
    '10-1': {
        title: 'Sales Process',
        education: {
            what: 'A sales process is a repeatable set of steps your sales team follows to convert prospects into customers. It provides structure, consistency, and predictability to revenue generation.',
            why: 'Companies with a formal sales process see 18% more revenue growth and 28% higher profitability. A defined process reduces sales cycle length by 18% and increases win rates by 15-20%.',
            how: `
                <h3>Step 1: Map the Buyer\'s Journey</h3>
                <p>Understand how your customers research, evaluate, and purchase solutions in your category.</p>
                
                <h3>Step 2: Define Sales Stages</h3>
                <p>Create 5-7 clear stages from initial contact to closed won, with specific exit criteria for each.</p>
                
                <h3>Step 3: Develop Sales Playbooks</h3>
                <p>Document talk tracks, objection handling, and best practices for each stage.</p>
                
                <h3>Step 4: Implement Sales Tools</h3>
                <p>Deploy CRM, sales engagement, and analytics tools to support the process.</p>
                
                <h3>Step 5: Train and Coach</h3>
                <p>Ensure all reps understand and follow the process through training and ongoing coaching.</p>
            `
        },
        workspace: [
            { id: 'sales-stages', label: 'Sales Process Stages', type: 'textarea', value: '1. Prospecting (10%) - Identify and qualify leads\n2. Discovery (20%) - Understand needs and pain points\n3. Solution Design (30%) - Present tailored solution\n4. Proposal (50%) - Submit formal proposal\n5. Negotiation (70%) - Address concerns, negotiate terms\n6. Closing (90%) - Final approvals and signatures\n7. Handoff (100%) - Transition to customer success' },
            { id: 'qualification-criteria', label: 'Qualification Criteria (BANT)', type: 'textarea', value: 'Budget: Minimum $50K annual budget for software\nAuthority: Direct access to economic buyer\nNeed: Clear business problem we solve\nTimeline: Decision within 6 months\nFit Score: 70+ based on ideal customer profile' },
            { id: 'sales-methodology', label: 'Sales Methodology', type: 'textarea', value: 'Primary: Solution Selling - Focus on business outcomes\nDiscovery: SPIN questions to uncover pain\nPresentation: Demo tailored to use cases\nObjection handling: LAER method (Listen, Acknowledge, Explore, Respond)\nClosing: Assumptive close with clear next steps' },
            { id: 'sales-metrics', label: 'Key Sales Metrics', type: 'textarea', value: 'Average deal size: $75,000 ACV\nSales cycle length: 45 days\nWin rate: 25% (qualified opportunities)\nPipeline coverage: 3x quota\nActivity metrics: 50 calls, 100 emails per week per rep' }
        ]
    },
    '13-1': {
        title: 'Revenue Operations',
        education: {
            what: 'Revenue Operations (RevOps) aligns sales, marketing, and customer success teams around shared revenue goals. It breaks down silos, streamlines processes, and provides unified data and insights to drive predictable revenue growth.',
            why: 'Companies with RevOps grow revenue 3x faster and see 10-20% increases in sales productivity. RevOps reduces customer acquisition costs by 30% and increases customer lifetime value by 25% through better alignment and efficiency.',
            how: `
                <h3>Step 1: Align Revenue Teams</h3>
                <p>Create shared goals, metrics, and compensation structures across sales, marketing, and customer success.</p>
                
                <h3>Step 2: Unify Data and Systems</h3>
                <p>Integrate CRM, marketing automation, and customer success platforms for a single source of truth.</p>
                
                <h3>Step 3: Standardize Processes</h3>
                <p>Define handoffs, SLAs, and workflows between teams to eliminate friction.</p>
                
                <h3>Step 4: Implement Revenue Intelligence</h3>
                <p>Deploy analytics and forecasting tools to provide real-time insights and predictions.</p>
                
                <h3>Step 5: Continuous Optimization</h3>
                <p>Regular reviews, A/B testing, and process improvements based on data.</p>
            `
        },
        workspace: [
            { id: 'revenue-goals', label: 'Revenue Goals & Targets', type: 'textarea', value: 'Annual Recurring Revenue (ARR): $50M target\nNew Business: $30M (60% of target)\nExpansion Revenue: $15M (30% of target)\nRenewal Revenue: $5M (10% of target)\nQuarterly growth rate: 20% QoQ' },
            { id: 'team-alignment', label: 'Team Alignment Structure', type: 'textarea', value: 'Marketing: 500 MQLs/month, 20% conversion to SQL\nSales: 100 SQLs/month, 25% close rate\nCustomer Success: 95% gross retention, 120% net retention\nWeekly revenue team meetings\nShared dashboard and KPIs' },
            { id: 'tech-stack', label: 'RevOps Technology Stack', type: 'textarea', value: 'CRM: Salesforce or HubSpot\nMarketing Automation: Marketo or Pardot\nSales Engagement: Outreach or SalesLoft\nCustomer Success: Gainsight or ChurnZero\nData Platform: Segment or Fivetran\nAnalytics: Tableau or Looker' },
            { id: 'key-metrics', label: 'Key RevOps Metrics', type: 'textarea', value: 'Pipeline velocity: 45 days average\nLead-to-customer conversion: 5%\nCAC payback period: 12 months\nLTV:CAC ratio: 3.5:1\nMagic Number: 0.8\nRule of 40: 55% (35% growth + 20% margin)' }
        ]
    }
};

// Function to update a module file with proper content
function updateModuleFile(moduleId) {
    const filePath = path.join(__dirname, `module-${moduleId}.html`);
    
    // Get content for this module, or use defaults
    const content = moduleContent[moduleId] || generateDefaultContent(moduleId);
    
    // Read the existing file
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Update education content
    const educationHTML = `
        <div class="education-section">
            <h2 class="section-title">
                <span class="section-icon">🎯</span>
                What is ${content.title}?
            </h2>
            <div class="section-content">
                <p>${content.education.what}</p>
            </div>
        </div>
        
        <div class="education-section">
            <h2 class="section-title">
                <span class="section-icon">💡</span>
                Why It Matters
            </h2>
            <div class="section-content">
                <p>${content.education.why}</p>
            </div>
        </div>
        
        <div class="education-section">
            <h2 class="section-title">
                <span class="section-icon">🚀</span>
                How to Implement
            </h2>
            <div class="section-content">
                ${content.education.how}
            </div>
        </div>`;
    
    // Replace education tab content
    html = html.replace(
        /<div id="education-tab" class="tab-content active">[\s\S]*?<\/div>\s*<!-- Workspace Tab -->/,
        `<div id="education-tab" class="tab-content active">
            ${educationHTML}
        </div>

        <!-- Workspace Tab -->`
    );
    
    // Update workspace content
    const workspaceHTML = content.workspace.map(field => {
        if (field.type === 'textarea') {
            return `
                <div class="worksheet-field">
                    <label class="worksheet-label" for="${field.id}">${field.label}</label>
                    <textarea id="${field.id}" class="worksheet-textarea" placeholder="Enter details...">${field.value}</textarea>
                </div>`;
        } else {
            return `
                <div class="worksheet-field">
                    <label class="worksheet-label" for="${field.id}">${field.label}</label>
                    <input type="text" id="${field.id}" class="worksheet-input" value="${field.value}" placeholder="Enter details...">
                </div>`;
        }
    }).join('\n');
    
    // Replace worksheet container content
    html = html.replace(
        /<div id="worksheet-container">[\s\S]*?<\/div>\s*<div class="action-buttons">/,
        `<div id="worksheet-container">
                    ${workspaceHTML}
                </div>

                <div class="action-buttons">`
    );
    
    // Write the updated file
    fs.writeFileSync(filePath, html);
    console.log(`✅ Updated module-${moduleId}.html with proper content`);
}

// Function to generate default content for modules not explicitly defined
function generateDefaultContent(moduleId) {
    const [blockNum, subNum] = moduleId.split('-');
    const blockId = parseInt(blockNum);
    
    // Get block and module names from our definitions
    const blocks = {
        1: 'Mission Discovery', 2: 'Customer Insights', 3: 'Founding Team Capability',
        4: 'Market Insights', 5: 'Prototype Launch Plan', 6: 'Feature Inclusion',
        7: 'Pricing Model', 8: 'Customer Acquisition', 9: 'Product Iteration',
        10: 'Sales Team Empowerment', 11: 'High Performance Teams', 12: 'Retention Systems',
        13: 'Revenue Optimization', 14: 'Operational Infrastructure', 15: 'Leadership Expansion',
        16: 'Global Expansion Opportunities'
    };
    
    const title = blocks[blockId] || 'Module';
    
    return {
        title: title,
        education: {
            what: `This module focuses on ${title.toLowerCase()}, a critical component of your go-to-market strategy. It provides frameworks and tools to systematically approach this area of your business.`,
            why: `${title} is essential for sustainable growth. Companies that excel in this area see 2-3x better performance metrics compared to their peers. This module helps you build competitive advantages through systematic implementation.`,
            how: `
                <h3>Step 1: Assessment</h3>
                <p>Evaluate your current state and identify gaps in your ${title.toLowerCase()} capabilities.</p>
                
                <h3>Step 2: Strategy Development</h3>
                <p>Create a comprehensive strategy aligned with your business goals and market opportunities.</p>
                
                <h3>Step 3: Implementation Planning</h3>
                <p>Develop detailed action plans with timelines, resources, and success metrics.</p>
                
                <h3>Step 4: Execution</h3>
                <p>Execute your plan with regular monitoring and course correction as needed.</p>
                
                <h3>Step 5: Optimization</h3>
                <p>Continuously improve based on data, feedback, and market changes.</p>
            `
        },
        workspace: [
            { id: 'current-state', label: 'Current State Assessment', type: 'textarea', value: `Current ${title.toLowerCase()} maturity: Early stage\nKey strengths: Strong vision and leadership commitment\nMain gaps: Lack of structured processes and metrics\nImmediate priorities: Define framework and baseline metrics` },
            { id: 'strategic-goals', label: 'Strategic Goals', type: 'textarea', value: `Primary objective: Build scalable ${title.toLowerCase()} capabilities\n90-day goal: Implement core processes and metrics\n1-year goal: Achieve best-in-class performance\nSuccess metrics: 2x improvement in key KPIs` },
            { id: 'action-plan', label: 'Action Plan', type: 'textarea', value: `Week 1-2: Complete assessment and gap analysis\nWeek 3-4: Develop strategic framework\nWeek 5-8: Implement pilot program\nWeek 9-12: Scale and optimize based on results` },
            { id: 'resources-needed', label: 'Resources & Support Needed', type: 'textarea', value: `Team: 2-3 dedicated resources\nBudget: $50-100K initial investment\nTools: Specialized software and platforms\nExternal support: Expert advisors or consultants` }
        ]
    };
}

// Update all modules
console.log('🚀 Starting to update all modules with proper content...\n');

// List of all module IDs
const allModules = [];
for (let block = 1; block <= 16; block++) {
    for (let sub = 1; sub <= 6; sub++) {
        allModules.push(`${block}-${sub}`);
    }
}

// Update each module
allModules.forEach(moduleId => {
    try {
        updateModuleFile(moduleId);
    } catch (error) {
        console.error(`❌ Error updating module-${moduleId}.html:`, error.message);
    }
});

console.log('\n✨ All modules updated with proper education content and preloaded workspace data!');
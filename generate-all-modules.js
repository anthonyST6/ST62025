
// Generate All Modules Script
// This script applies the universal template to all GTM Framework modules

const fs = require('fs');
const path = require('path');

// Module definitions for all 16 blocks with 6 subcomponents each
const moduleDefinitions = {
    // Phase 1: Foundation (Blocks 1-3)
    1: {
        name: "Mission Discovery",
        subcomponents: [
            { id: 1, title: "Problem Statement Definition", description: "Define the core problem your startup solves" },
            { id: 2, title: "Mission Statement", description: "Articulate your company's mission and purpose" },
            { id: 3, title: "Vision Alignment", description: "Align your vision with market opportunities" },
            { id: 4, title: "Core Values", description: "Establish the fundamental values that guide your company" },
            { id: 5, title: "Strategic Objectives", description: "Set clear, measurable strategic objectives" },
            { id: 6, title: "Success Metrics", description: "Define how you'll measure success" }
        ]
    },
    2: {
        name: "Customer Insights",
        subcomponents: [
            { id: 1, title: "Customer Persona Development", description: "Create detailed profiles of your ideal customers" },
            { id: 2, title: "Pain Point Analysis", description: "Identify and prioritize customer pain points" },
            { id: 3, title: "Journey Mapping", description: "Map the complete customer journey" },
            { id: 4, title: "Feedback Loops", description: "Establish systems for continuous customer feedback" },
            { id: 5, title: "Behavioral Analytics", description: "Analyze customer behavior patterns" },
            { id: 6, title: "Satisfaction Metrics", description: "Measure and track customer satisfaction" }
        ]
    },
    3: {
        name: "Market Positioning",
        subcomponents: [
            { id: 1, title: "Competitive Analysis", description: "Analyze your competitive landscape" },
            { id: 2, title: "Segment Tiering", description: "Tier and prioritize market segments" },
            { id: 3, title: "Differentiation Strategy", description: "Define your unique value proposition" },
            { id: 4, title: "Pricing Strategy", description: "Develop optimal pricing models" },
            { id: 5, title: "Brand Positioning", description: "Position your brand in the market" },
            { id: 6, title: "Market Entry Strategy", description: "Plan your market entry approach" }
        ]
    },
    
    // Phase 2: Early Adopter Wins (Blocks 4-6)
    4: {
        name: "Prototype Launch",
        subcomponents: [
            { id: 1, title: "Feature Inclusion", description: "Determine MVP feature set" },
            { id: 2, title: "Testing Protocols", description: "Establish testing procedures" },
            { id: 3, title: "User Feedback Integration", description: "Integrate early user feedback" },
            { id: 4, title: "Iteration Planning", description: "Plan product iterations" },
            { id: 5, title: "Launch Timeline", description: "Create launch schedule" },
            { id: 6, title: "Success Criteria", description: "Define launch success metrics" }
        ]
    },
    5: {
        name: "Early Adopter Acquisition",
        subcomponents: [
            { id: 1, title: "Target Identification", description: "Identify early adopter profiles" },
            { id: 2, title: "Outreach Strategy", description: "Develop outreach campaigns" },
            { id: 3, title: "Onboarding Process", description: "Create smooth onboarding" },
            { id: 4, title: "Engagement Tactics", description: "Build engagement strategies" },
            { id: 5, title: "Retention Programs", description: "Develop retention initiatives" },
            { id: 6, title: "Referral Systems", description: "Create referral programs" }
        ]
    },
    6: {
        name: "Feedback Integration",
        subcomponents: [
            { id: 1, title: "Collection Methods", description: "Establish feedback channels" },
            { id: 2, title: "Analysis Framework", description: "Analyze feedback systematically" },
            { id: 3, title: "Prioritization Matrix", description: "Prioritize feedback items" },
            { id: 4, title: "Implementation Process", description: "Implement feedback changes" },
            { id: 5, title: "Communication Loop", description: "Close the feedback loop" },
            { id: 6, title: "Impact Measurement", description: "Measure feedback impact" }
        ]
    },
    
    // Phase 3: Scale & Growth (Blocks 7-9)
    7: {
        name: "Sales Process Optimization",
        subcomponents: [
            { id: 1, title: "Pipeline Development", description: "Build scalable sales pipeline" },
            { id: 2, title: "Conversion Optimization", description: "Optimize conversion rates" },
            { id: 3, title: "Sales Enablement", description: "Enable sales team effectiveness" },
            { id: 4, title: "Deal Velocity", description: "Accelerate deal closure" },
            { id: 5, title: "Forecasting Accuracy", description: "Improve forecast precision" },
            { id: 6, title: "Territory Planning", description: "Optimize territory coverage" }
        ]
    },
    8: {
        name: "Marketing Amplification",
        subcomponents: [
            { id: 1, title: "Content Strategy", description: "Develop content marketing plan" },
            { id: 2, title: "Channel Optimization", description: "Optimize marketing channels" },
            { id: 3, title: "Campaign Management", description: "Manage marketing campaigns" },
            { id: 4, title: "Lead Generation", description: "Generate qualified leads" },
            { id: 5, title: "Brand Building", description: "Build brand awareness" },
            { id: 6, title: "Marketing Analytics", description: "Measure marketing performance" }
        ]
    },
    9: {
        name: "Partnership Development",
        subcomponents: [
            { id: 1, title: "Partner Identification", description: "Identify strategic partners" },
            { id: 2, title: "Alliance Formation", description: "Form strategic alliances" },
            { id: 3, title: "Channel Development", description: "Develop partner channels" },
            { id: 4, title: "Co-marketing Programs", description: "Create co-marketing initiatives" },
            { id: 5, title: "Integration Planning", description: "Plan technical integrations" },
            { id: 6, title: "Partner Success", description: "Ensure partner success" }
        ]
    },
    
    // Phase 4: Optimization (Blocks 10-12)
    10: {
        name: "Sales Team Empowerment",
        subcomponents: [
            { id: 1, title: "Training Programs", description: "Develop sales training" },
            { id: 2, title: "Tool Implementation", description: "Implement sales tools" },
            { id: 3, title: "Performance Metrics", description: "Track sales performance" },
            { id: 4, title: "Coaching Systems", description: "Build coaching programs" },
            { id: 5, title: "Incentive Design", description: "Design incentive structures" },
            { id: 6, title: "Knowledge Management", description: "Manage sales knowledge" }
        ]
    },
    11: {
        name: "High-Performance Teams",
        subcomponents: [
            { id: 1, title: "Team Structure", description: "Optimize team structure" },
            { id: 2, title: "Role Definition", description: "Define clear roles" },
            { id: 3, title: "Collaboration Tools", description: "Implement collaboration systems" },
            { id: 4, title: "Performance Management", description: "Manage team performance" },
            { id: 5, title: "Culture Building", description: "Build team culture" },
            { id: 6, title: "Talent Development", description: "Develop team talent" }
        ]
    },
    12: {
        name: "Retention Systems",
        subcomponents: [
            { id: 1, title: "Churn Analysis", description: "Analyze churn patterns" },
            { id: 2, title: "Customer Success", description: "Build customer success programs" },
            { id: 3, title: "Loyalty Programs", description: "Create loyalty initiatives" },
            { id: 4, title: "Upsell Strategies", description: "Develop upsell approaches" },
            { id: 5, title: "Renewal Optimization", description: "Optimize renewal rates" },
            { id: 6, title: "NPS Improvement", description: "Improve Net Promoter Score" }
        ]
    },
    
    // Phase 5: Expansion (Blocks 13-16)
    13: {
        name: "Market Domination Strategies",
        subcomponents: [
            { id: 1, title: "Market Share Growth", description: "Expand market share" },
            { id: 2, title: "Competitive Displacement", description: "Displace competitors" },
            { id: 3, title: "Category Creation", description: "Create new categories" },
            { id: 4, title: "Thought Leadership", description: "Establish thought leadership" },
            { id: 5, title: "Industry Influence", description: "Build industry influence" },
            { id: 6, title: "Market Consolidation", description: "Consolidate market position" }
        ]
    },
    14: {
        name: "Operational Infrastructure",
        subcomponents: [
            { id: 1, title: "Process Automation", description: "Automate key processes" },
            { id: 2, title: "System Integration", description: "Integrate systems" },
            { id: 3, title: "Data Infrastructure", description: "Build data infrastructure" },
            { id: 4, title: "Quality Assurance", description: "Ensure quality standards" },
            { id: 5, title: "Compliance Framework", description: "Maintain compliance" },
            { id: 6, title: "Risk Management", description: "Manage operational risks" }
        ]
    },
    15: {
        name: "Leadership Expansion",
        subcomponents: [
            { id: 1, title: "Executive Development", description: "Develop executive team" },
            { id: 2, title: "Board Management", description: "Manage board relations" },
            { id: 3, title: "Succession Planning", description: "Plan leadership succession" },
            { id: 4, title: "Leadership Pipeline", description: "Build leadership pipeline" },
            { id: 5, title: "Strategic Vision", description: "Refine strategic vision" },
            { id: 6, title: "Organizational Design", description: "Design org structure" }
        ]
    },
    16: {
        name: "Global Expansion Opportunities",
        subcomponents: [
            { id: 1, title: "Market Assessment", description: "Assess global markets" },
            { id: 2, title: "Localization Strategy", description: "Develop localization plans" },
            { id: 3, title: "International Partnerships", description: "Build international partners" },
            { id: 4, title: "Regulatory Compliance", description: "Ensure global compliance" },
            { id: 5, title: "Cultural Adaptation", description: "Adapt to local cultures" },
            { id: 6, title: "Global Operations", description: "Scale global operations" }
        ]
    }
};

// Function to generate module HTML file
function generateModuleHTML(blockId, subcomponentId, title, description) {
    const template = new (require('./universal-module-template.js'))();
    return template.generateModuleHTML(blockId, subcomponentId, title, description);
}

// Function to generate module JavaScript file
function generateModuleJS(blockId, subcomponentId) {
    const template = new (require('./universal-module-template.js'))();
    return template.generateModuleScript(blockId, subcomponentId);
}

// Function to check if file exists
function fileExists(filePath) {
    try {
        return fs.existsSync(filePath);
    } catch (err) {
        return false;
    }
}

// Main generation function
function generateAllModules() {
    console.log('🚀 Starting module generation...\n');
    
    let totalGenerated = 0;
    let totalSkipped = 0;
    let errors = [];
    
    // Process each block
    Object.keys(moduleDefinitions).forEach(blockId => {
        const block = moduleDefinitions[blockId];
        console.log(`\n📦 Processing Block ${blockId}: ${block.name}`);
        
        // Process each subcomponent
        block.subcomponents.forEach(subcomponent => {
            const htmlFileName = `block-${blockId}-${subcomponent.id}.html`;
            const jsFileName = `module-${blockId}-${subcomponent.id}.js`;
            const htmlPath = path.join(__dirname, htmlFileName);
            const jsPath = path.join(__dirname, jsFileName);
            
            try {
                // Check if files already exist
                const htmlExists = fileExists(htmlPath);
                const jsExists = fileExists(jsPath);
                
                if (htmlExists && jsExists) {
                    console.log(`  ⏭️  Skipping ${blockId}-${subcomponent.id}: ${subcomponent.title} (already exists)`);
                    totalSkipped++;
                } else {
                    // Generate HTML if doesn't exist
                    if (!htmlExists) {
                        const htmlContent = generateModuleHTML(
                            blockId,
                            subcomponent.id,
                            subcomponent.title,
                            subcomponent.description
                        );
                        fs.writeFileSync(htmlPath, htmlContent);
                        console.log(`  ✅ Generated HTML: ${htmlFileName}`);
                    }
                    
                    // Generate JS if doesn't exist
                    if (!jsExists) {
                        const jsContent = generateModuleJS(blockId, subcomponent.id);
                        fs.writeFileSync(jsPath, jsContent);
                        console.log(`  ✅ Generated JS: ${jsFileName}`);
                    }
                    
                    totalGenerated++;
                }
            } catch (error) {
                console.error(`  ❌ Error generating ${blockId}-${subcomponent.id}: ${error.message}`);
                errors.push({
                    module: `${blockId}-${subcomponent.id}`,
                    error: error.message
                });
            }
        });
    });
    
    // Generate index file for easy navigation
    generateIndexFile();
    
    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 GENERATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Modules Generated: ${totalGenerated}`);
    console.log(`⏭️  Modules Skipped: ${totalSkipped}`);
    console.log(`❌ Errors: ${errors.length}`);
    console.log(`📁 Total Modules: ${totalGenerated + totalSkipped}/${96}`);
    
    if (errors.length > 0) {
        console.log('\n❌ ERRORS:');
        errors.forEach(err => {
            console.log(`  - Module ${err.module}: ${err.error}`);
        });
    }
    
    console.log('\n✨ Module generation complete!');
}

// Generate index file for navigation
function generateIndexFile() {
    let indexHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ScaleOps6 GTM Framework - Module Index</title>
    <style>
        :root {
            --primary-orange: #FF5500;
            --dark-bg: #1a1a1a;
            --darker-bg: #0d0d0d;
            --text-white: #ffffff;
            --text-gray: #999999;
        }
        
        body {
            background: var(--dark-bg);
            color: var(--text-white);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            padding: 20px;
        }
        
        h1 {
            color: var(--primary-orange);
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        
        .phase {
            margin: 30px 0;
            padding: 20px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
        }
        
        .phase-title {
            font-size: 20px;
            font-weight: 700;
            color: var(--primary-orange);
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 20px;
        }
        
        .block {
            margin: 20px 0;
            padding: 15px;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 8px;
        }
        
        .block-title {
            font-size: 18px;
            font-weight: 600;
            color: var(--text-white);
            margin-bottom: 15px;
        }
        
        .modules {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 10px;
        }
        
        .module-link {
            display: block;
            padding: 10px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 6px;
            text-decoration: none;
            color: var(--text-gray);
            transition: all 0.3s ease;
        }
        
        .module-link:hover {
            background: rgba(255, 85, 0, 0.2);
            color: var(--text-white);
            transform: translateX(5px);
        }
        
        .module-id {
            font-size: 12px;
            color: var(--primary-orange);
            font-weight: 700;
        }
    </style>
</head>
<body>
    <h1>ScaleOps6 GTM Framework - Module Index</h1>
    
    <div class="phase">
        <div class="phase-title">Phase 1: Foundation (Blocks 1-3)</div>
`;

    // Add Phase 1 blocks
    [1, 2, 3].forEach(blockId => {
        const block = moduleDefinitions[blockId];
        indexHTML += `
        <div class="block">
            <div class="block-title">Block ${blockId}: ${block.name}</div>
            <div class="modules">`;
        
        block.subcomponents.forEach(sub => {
            indexHTML += `
                <a href="block-${blockId}-${sub.id}.html" class="module-link">
                    <div class="module-id">${blockId}.${sub.id}</div>
                    <div>${sub.title}</div>
                </a>`;
        });
        
        indexHTML += `
            </div>
        </div>`;
    });
    
    indexHTML += `
    </div>
    
    <div class="phase">
        <div class="phase-title">Phase 2: Early Adopter Wins (Blocks 4-6)</div>`;
    
    // Add Phase 2 blocks
    [4, 5, 6].forEach(blockId => {
        const block = moduleDefinitions[blockId];
        indexHTML += `
        <div class="block">
            <div class="block-title">Block ${blockId}: ${block.name}</div>
            <div class="modules">`;
        
        block.subcomponents.forEach(sub => {
            indexHTML += `
                <a href="block-${blockId}-${sub.id}.html" class="module-link">
                    <div class="module-id">${blockId}.${sub.id}</div>
                    <div>${sub.title}</div>
                </a>`;
        });
        
        indexHTML += `
            </div>
        </div>`;
    });
    
    indexHTML += `
    </div>
    
    <div class="phase">
        <div class="phase-title">Phase 3: Scale & Growth (Blocks 7-9)</div>`;
    
    // Add Phase 3 blocks
    [7, 8, 9].forEach(blockId => {
        const block = moduleDefinitions[blockId];
        indexHTML += `
        <div class="block">
            <div class="block-title">Block ${blockId}: ${block.name}</div>
            <div class="modules">`;
        
        block.subcomponents.forEach(sub => {
            indexHTML += `
                <a href="block-${blockId}-${sub.id}.html" class="module-link">
                    <div class="module-id">${blockId}.${sub.id}</div>
                    <div>${sub.title}</div>
                </a>`;
        });
        
        indexHTML += `
            </div>
        </div>`;
    });
    
    indexHTML += `
    </div>
    
    <div class="phase">
        <div class="phase-title">Phase 4: Optimization (Blocks 10-12)</div>`;
    
    // Add Phase 4 blocks
    [10, 11, 12].forEach(blockId => {
        const block = moduleDefinitions[blockId];
        indexHTML += `
        <div class="block">
            <div class="block-title">Block ${blockId}: ${block.name}</div>
            <div class="modules">`;
        
        block.subcomponents.forEach(sub => {
            indexHTML += `
                <a href="block-${blockId}-${sub.id}.html" class="module-link">
                    <div class="module-id">${blockId}.${sub.id}</div>
                    <div>${sub.title}</div>
                </a>`;
        });
        
        indexHTML += `
            </div>
        </div>`;
    });
    
    indexHTML += `
    </div>
    
    <div class="phase">
        <div class="phase-title">Phase 5: Expansion (Blocks 13-16)</div>`;
    
    // Add Phase 5 blocks
    [13, 14, 15, 16].forEach(blockId => {
        const block = moduleDefinitions[blockId];
        indexHTML += `
        <div class="block">
            <div class="block-title">Block ${blockId}: ${block.name}</div>
            <div class="modules">`;
        
        block.subcomponents.forEach(sub => {
            indexHTML += `
                <a href="block-${blockId}-${sub.id}.html" class="module-link">
                    <div class="module-id">${blockId}.${sub.id}</div>
                    <div>${sub.title}</div>
                </a>`;
        });
        
        indexHTML += `
            </div>
        </div>`;
    });
    
    indexHTML += `
    </div>
    
    <div style="margin-top: 40px; padding: 20px; background: rgba(255, 85, 0, 0.1); border-radius: 12px;">
        <h2 style="color: #FF5500;">Quick Stats</h2>
        <p>Total Modules: 96 (16 blocks × 6 subcomponents)</p>
        <p>Total Phases: 5</p>
        <p>Total Agents: 96 specialized AI agents</p>
    </div>
</body>
</html>`;
    
    // Write index file
    const indexPath = path.join(__dirname, 'module-index.html');
    fs.writeFileSync(indexPath, indexHTML);
    console.log('\n📋 Generated module index: module-index.html');
}

// Run the generator
if (require.main === module) {
    generateAllModules();
}

module.exports = { generateAllModules, moduleDefinitions };

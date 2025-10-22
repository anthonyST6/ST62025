// Script to regenerate all 96 modules with the fixed template
// Maintains original ScaleOps6 branding and adds requested features

const fs = require('fs');
const path = require('path');

// Import the template generator
const { generateModuleHTML } = require('./universal-module-template-fixed.js');

// Module definitions for all 16 blocks
const moduleDefinitions = {
    // Phase 1: Foundation (Blocks 1-3)
    1: {
        name: "Mission Discovery",
        modules: [
            { id: "1-1", title: "Problem Statement", description: "Clear articulation of the problem you're solving and why it matters" },
            { id: "1-2", title: "Vision", description: "Long-term aspirational goal for your company's impact" },
            { id: "1-3", title: "Mission", description: "Your company's purpose and approach to achieving the vision" },
            { id: "1-4", title: "Values", description: "Core principles that guide decision-making and culture" },
            { id: "1-5", title: "Success Metrics", description: "Key indicators that measure progress toward your vision" },
            { id: "1-6", title: "Stakeholder Alignment", description: "Ensuring all key parties share the same vision and goals" }
        ]
    },
    2: {
        name: "Customer Insights",
        modules: [
            { id: "2-1", title: "Customer Personas", description: "Detailed profiles of your ideal customer segments" },
            { id: "2-2", title: "Jobs to be Done", description: "Understanding what customers are trying to accomplish" },
            { id: "2-3", title: "Pain Points", description: "Specific problems and frustrations customers experience" },
            { id: "2-4", title: "Customer Journey", description: "Mapping the end-to-end customer experience" },
            { id: "2-5", title: "Voice of Customer", description: "Systematic capture and analysis of customer feedback" },
            { id: "2-6", title: "Segmentation Strategy", description: "Dividing market into actionable customer groups" }
        ]
    },
    3: {
        name: "Founding Team Capability",
        modules: [
            { id: "3-1", title: "Team Composition", description: "Optimal mix of skills, experience, and perspectives" },
            { id: "3-2", title: "Capability Gaps", description: "Identifying missing skills and expertise needed for success" },
            { id: "3-3", title: "Advisory Board", description: "Building a network of expert advisors and mentors" },
            { id: "3-4", title: "Culture Definition", description: "Establishing core cultural values and behaviors" },
            { id: "3-5", title: "Leadership Alignment", description: "Ensuring leadership team unity and direction" },
            { id: "3-6", title: "Succession Planning", description: "Preparing for leadership transitions and growth" }
        ]
    },
    // Phase 2: Idea to Market Fit (Blocks 4-6)
    4: {
        name: "Market Insights",
        modules: [
            { id: "4-1", title: "Market Segmentation", description: "Dividing the total addressable market into distinct segments" },
            { id: "4-2", title: "Competitive Landscape", description: "Understanding direct and indirect competitors" },
            { id: "4-3", title: "Market Trends", description: "Identifying shifts and emerging opportunities" },
            { id: "4-4", title: "Regulatory Environment", description: "Understanding compliance requirements and constraints" },
            { id: "4-5", title: "Market Sizing", description: "Calculating TAM, SAM, and SOM for your opportunity" },
            { id: "4-6", title: "Entry Strategy", description: "Determining optimal market entry approach and timing" }
        ]
    },
    5: {
        name: "Prototype Launch Plan",
        modules: [
            { id: "5-1", title: "Feature Prioritization", description: "Determining MVP features using impact vs effort analysis" },
            { id: "5-2", title: "Technical Architecture", description: "Designing scalable and maintainable system architecture" },
            { id: "5-3", title: "Development Roadmap", description: "Planning sprints and release cycles" },
            { id: "5-4", title: "Testing Strategy", description: "Comprehensive approach to quality assurance" },
            { id: "5-5", title: "Launch Timeline", description: "Detailed schedule from development to market release" },
            { id: "5-6", title: "Risk Mitigation", description: "Identifying and addressing potential launch risks" }
        ]
    },
    6: {
        name: "Feature Inclusion",
        modules: [
            { id: "6-1", title: "Core Features", description: "Essential functionality that delivers primary value" },
            { id: "6-2", title: "Differentiators", description: "Unique features that set you apart from competitors" },
            { id: "6-3", title: "User Experience", description: "Designing intuitive and delightful user interactions" },
            { id: "6-4", title: "Platform Integrations", description: "Connecting with essential third-party services" },
            { id: "6-5", title: "Scalability Features", description: "Building for growth and increased usage" },
            { id: "6-6", title: "Feature Validation", description: "Testing feature-market fit before full development" }
        ]
    },
    // Phase 3: Product Market Fit (Blocks 7-9)
    7: {
        name: "Pricing Model",
        modules: [
            { id: "7-1", title: "Pricing Strategy", description: "Determining optimal pricing approach for your market" },
            { id: "7-2", title: "Value Metrics", description: "Identifying what customers value and will pay for" },
            { id: "7-3", title: "Pricing Tiers", description: "Creating packages for different customer segments" },
            { id: "7-4", title: "Competitive Pricing", description: "Positioning price relative to alternatives" },
            { id: "7-5", title: "Pricing Psychology", description: "Leveraging behavioral economics in pricing decisions" },
            { id: "7-6", title: "Revenue Optimization", description: "Maximizing revenue through pricing adjustments" }
        ]
    },
    8: {
        name: "Customer Acquisition",
        modules: [
            { id: "8-1", title: "Acquisition Channels", description: "Identifying and prioritizing customer acquisition channels" },
            { id: "8-2", title: "Content Strategy", description: "Creating valuable content that attracts customers" },
            { id: "8-3", title: "Paid Acquisition", description: "Leveraging paid advertising for growth" },
            { id: "8-4", title: "Organic Growth", description: "Building sustainable non-paid growth channels" },
            { id: "8-5", title: "Referral Programs", description: "Turning customers into growth advocates" },
            { id: "8-6", title: "Conversion Optimization", description: "Improving conversion rates across the funnel" }
        ]
    },
    9: {
        name: "Product Iteration",
        modules: [
            { id: "9-1", title: "Feedback Loops", description: "Systematic collection and analysis of user feedback" },
            { id: "9-2", title: "A/B Testing", description: "Data-driven experimentation for product improvements" },
            { id: "9-3", title: "Feature Updates", description: "Planning and executing product enhancements" },
            { id: "9-4", title: "Performance Optimization", description: "Improving speed, reliability, and efficiency" },
            { id: "9-5", title: "User Analytics", description: "Tracking and analyzing user behavior patterns" },
            { id: "9-6", title: "Product Roadmap", description: "Long-term vision for product evolution" }
        ]
    },
    // Phase 4: GTM Execution (Blocks 10-12)
    10: {
        name: "Sales Team Empowerment",
        modules: [
            { id: "10-1", title: "Sales Process", description: "Defining repeatable and scalable sales methodology" },
            { id: "10-2", title: "Sales Enablement", description: "Equipping sales team with tools and resources" },
            { id: "10-3", title: "Compensation Design", description: "Creating incentive structures that drive performance" },
            { id: "10-4", title: "Sales Training", description: "Comprehensive onboarding and skill development" },
            { id: "10-5", title: "CRM Implementation", description: "Selecting and optimizing CRM systems" },
            { id: "10-6", title: "Sales Analytics", description: "Tracking and improving sales performance metrics" }
        ]
    },
    11: {
        name: "High Performance Teams",
        modules: [
            { id: "11-1", title: "Team Structure", description: "Organizing teams for maximum effectiveness" },
            { id: "11-2", title: "Hiring Process", description: "Building systematic approach to talent acquisition" },
            { id: "11-3", title: "Onboarding Program", description: "Accelerating new employee productivity" },
            { id: "11-4", title: "Performance Management", description: "Setting goals and managing performance" },
            { id: "11-5", title: "Team Development", description: "Continuous learning and skill enhancement" },
            { id: "11-6", title: "Remote Collaboration", description: "Enabling effective distributed team work" }
        ]
    },
    12: {
        name: "Retention Systems",
        modules: [
            { id: "12-1", title: "Customer Success", description: "Proactive approach to customer value realization" },
            { id: "12-2", title: "Churn Analysis", description: "Understanding and reducing customer attrition" },
            { id: "12-3", title: "Engagement Programs", description: "Keeping customers active and engaged" },
            { id: "12-4", title: "Loyalty Initiatives", description: "Building long-term customer relationships" },
            { id: "12-5", title: "Upsell Strategy", description: "Growing revenue from existing customers" },
            { id: "12-6", title: "Community Building", description: "Creating customer communities and advocacy" }
        ]
    },
    // Phase 5: Scale (Blocks 13-16)
    13: {
        name: "Revenue Optimization",
        modules: [
            { id: "13-1", title: "Revenue Operations", description: "Aligning sales, marketing, and customer success" },
            { id: "13-2", title: "Pipeline Management", description: "Optimizing deal flow and conversion" },
            { id: "13-3", title: "Forecasting Models", description: "Predicting and planning revenue growth" },
            { id: "13-4", title: "Unit Economics", description: "Understanding and improving profitability metrics" },
            { id: "13-5", title: "Expansion Revenue", description: "Maximizing growth from existing accounts" },
            { id: "13-6", title: "Revenue Intelligence", description: "Data-driven insights for revenue growth" }
        ]
    },
    14: {
        name: "Operational Infrastructure",
        modules: [
            { id: "14-1", title: "Process Automation", description: "Streamlining operations through automation" },
            { id: "14-2", title: "System Integration", description: "Connecting tools and platforms for efficiency" },
            { id: "14-3", title: "Data Infrastructure", description: "Building robust data collection and analysis systems" },
            { id: "14-4", title: "Security & Compliance", description: "Ensuring data protection and regulatory compliance" },
            { id: "14-5", title: "Vendor Management", description: "Optimizing third-party relationships and costs" },
            { id: "14-6", title: "Operational Metrics", description: "KPIs for operational excellence" }
        ]
    },
    15: {
        name: "Leadership Expansion",
        modules: [
            { id: "15-1", title: "Executive Team", description: "Building and scaling C-suite leadership" },
            { id: "15-2", title: "Board Development", description: "Creating effective board governance" },
            { id: "15-3", title: "Leadership Pipeline", description: "Developing next generation of leaders" },
            { id: "15-4", title: "Strategic Planning", description: "Long-term vision and execution planning" },
            { id: "15-5", title: "Change Management", description: "Leading through organizational transformation" },
            { id: "15-6", title: "Executive Communication", description: "Effective stakeholder and investor relations" }
        ]
    },
    16: {
        name: "Global Expansion Opportunities",
        modules: [
            { id: "16-1", title: "Market Selection", description: "Identifying and prioritizing international markets" },
            { id: "16-2", title: "Localization Strategy", description: "Adapting products and messaging for local markets" },
            { id: "16-3", title: "International Operations", description: "Setting up operations in new geographies" },
            { id: "16-4", title: "Partnership Networks", description: "Building strategic alliances for global growth" },
            { id: "16-5", title: "Cross-Border Payments", description: "Managing international financial operations" },
            { id: "16-6", title: "Global Compliance", description: "Navigating international regulations and standards" }
        ]
    }
};

// Function to generate all modules
function generateAllModules() {
    console.log('🚀 Starting module generation with fixed template...');
    let totalGenerated = 0;
    
    Object.keys(moduleDefinitions).forEach(blockId => {
        const block = moduleDefinitions[blockId];
        console.log(`\n📦 Processing Block ${blockId}: ${block.name}`);
        
        block.modules.forEach(module => {
            const moduleConfig = {
                id: module.id,
                blockId: parseInt(blockId),
                blockName: block.name,
                number: module.id.replace('-', '.'),
                title: module.title,
                description: module.description
            };
            
            const html = generateModuleHTML(moduleConfig);
            const filename = `module-${module.id}.html`;
            const filepath = path.join(__dirname, filename);
            
            fs.writeFileSync(filepath, html);
            console.log(`  ✅ Generated: ${filename}`);
            totalGenerated++;
        });
    });
    
    console.log(`\n✨ Successfully regenerated ${totalGenerated} modules with fixed template!`);
    console.log('📌 All modules now have:');
    console.log('  - Original ScaleOps6 branding and layout');
    console.log('  - Back button to framework');
    console.log('  - Preloaded workspace data');
    console.log('  - Preloaded education content');
    console.log('  - Preloaded resources');
    console.log('  - Same functionality as Phase 1 modules');
}

// Run the generation
generateAllModules();
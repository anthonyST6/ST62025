/**
 * Fix Subcomponent Names Across All Block Pages
 * Updates the display names to match the correct operational terminology
 */

const fs = require('fs');
const path = require('path');

// CORRECT Subcomponent Names as provided by user
const CORRECT_SUBCOMPONENT_NAMES = {
    // Block 1: Mission Discovery
    '1-1': 'Problem Statement Definition',
    '1-2': 'Mission Statement',
    '1-3': 'Voice of Customer',
    '1-4': 'Founding Team Capability',  // Changed from "Team Assessment"
    '1-5': 'Market Landscape',
    '1-6': 'Launch Readiness',
    
    // Block 2: Customer Insights
    '2-1': 'Jobs to be Done',
    '2-2': 'Personas Framework',
    '2-3': 'Interview Cadence',
    '2-4': 'Pain Point Mapping',
    '2-5': 'Insight Action',
    '2-6': 'Customer Journey',
    
    // Block 3: Strategic Prioritization
    '3-1': 'Use Case Scoring Model',      // Changed from "Use Case Prioritization"
    '3-2': 'Segment Tiering',             // Changed from "Resource Allocation"
    '3-3': 'Prioritization Rubric',       // Changed from "Risk Assessment"
    '3-4': 'Tradeoff Tracker',            // Same
    '3-5': 'Hypothesis Board',            // Changed from "Success Metrics"
    '3-6': 'Decision Archive',            // Changed from "Decision Framework"
    
    // Block 4: Prototype Launch
    '4-1': 'Feature Inclusion Matrix',    // Changed from "MVP Definition"
    '4-2': 'Technical Scope Tracker',     // Changed from "Feature Prioritization"
    '4-3': 'Pilot Group Selection',       // Changed from "Testing Strategy"
    '4-4': 'QA & Success Criteria',       // Changed from "Feedback Loops"
    '4-5': 'Timeline GANTT or Roadmap',   // Changed from "Iteration Planning"
    '4-6': 'Post-Mortem Template',        // Changed from "Launch Strategy"
    
    // Block 5: Go-to-Market Strategy
    '5-1': 'GTM Messaging Framework',     // Changed from "Target Identification"
    '5-2': 'Sales Enablement Assets',     // Changed from "Messaging Framework"
    '5-3': 'Pricing & Packaging Strategy', // Changed from "Channel Strategy"
    '5-4': 'Channel Partner Strategy',    // Changed from "Pricing Model"
    '5-5': 'Competitive Positioning',     // Changed from "Sales Enablement"
    '5-6': 'Launch Planning & Execution', // Changed from "Launch Planning"
    
    // Block 6: Customer Engagement Flywheel
    '6-1': 'Usage Heatmap',               // Changed from "Acquisition Strategy"
    '6-2': 'Milestone Triggers',          // Changed from "Activation Process"
    '6-3': 'CS Dashboard',                // Changed from "Retention Programs"
    '6-4': 'Activation Metric Model',     // Changed from "Referral Systems"
    '6-5': 'Feedback Collector',          // Changed from "Revenue Optimization"
    '6-6': 'Power User Behavior Signals', // Changed from "Engagement Metrics"
    
    // Block 7: Quantifiable Impact
    '7-1': 'Time/Cost Savings Metrics',   // Changed from "KPI Framework"
    '7-2': 'Revenue-Impact Attribution',  // Changed from "Data Collection"
    '7-3': 'Productivity Lift Metrics',   // Changed from "Analytics Setup"
    '7-4': 'Net Retention Trends',        // Changed from "Impact Metrics"
    '7-5': 'Downstream System Reductions', // Changed from "ROI Calculation"
    '7-6': 'Friction Reduction Evidence', // Changed from "Reporting Systems"
    
    // Block 8: Customer Success Expansion
    '8-1': 'Upsell Funnel Model',         // Changed from "Success Planning"
    '8-2': 'Team Expansion Signals',      // Changed from "Onboarding Process"
    '8-3': 'Organic Adoption Pattern',    // Changed from "Support Systems"
    '8-4': 'Champion Mapping',            // Changed from "Upsell Strategy"
    '8-5': 'CSAT/NPS Tracking',           // Changed from "Renewal Process"
    '8-6': 'Renewal Readiness Tracker',   // Changed from "Advocacy Programs"
    
    // Block 9: Proof of Execution
    '9-1': 'Inbound Conversion Rates',    // Changed from "Pilot Programs"
    '9-2': 'Outbound Play Performance',   // Changed from "Case Studies"
    '9-3': 'Channel Economics Clarity',   // Changed from "Reference Customers"
    '9-4': 'Discovery Call Effectiveness', // Changed from "Success Stories"
    '9-5': 'Demo-to-Close Flow',          // Changed from "ROI Documentation"
    '9-6': 'Founders Selling Model',      // Changed from "Market Validation"
    
    // Block 10: Sales Team Empowerment
    '10-1': 'Enablement Asset Pack',      // Changed from "Sales Training"
    '10-2': 'Rep Ramp Plan',              // Changed from "Playbook Development"
    '10-3': 'Win/Loss Tracker',           // Changed from "Tool Implementation"
    '10-4': 'Objection Handling Guide',   // Changed from "Performance Tracking"
    '10-5': 'ICP Filter Checklist',       // Changed from "Incentive Design"
    '10-6': 'Sales Call Library',         // Changed from "Team Scaling"
    
    // Block 11: High Performance Teams
    '11-1': 'Scorecard Model',            // Changed from "Team Structure"
    '11-2': 'Quota Structure',            // Changed from "Hiring Process"
    '11-3': 'Weekly Deal Reviews',        // Changed from "Culture Building"
    '11-4': 'Forecasting Framework',      // Changed from "Performance Management"
    '11-5': 'Manager Coaching Loop',      // Changed from "Development Programs"
    '11-6': 'Talent Gap Identification',  // Changed from "Leadership Pipeline"
    
    // Block 12: Retention Systems
    '12-1': 'Onboarding Checklist',       // Changed from "Churn Analysis"
    '12-2': 'Activation Tracker',         // Changed from "Retention Strategies"
    '12-3': 'Success Playbooks',          // Changed from "Customer Health"
    '12-4': 'Escalation SOPs',            // Changed from "Engagement Programs"
    '12-5': 'Renewals Pipelines',         // Changed from "Win-back Campaigns"
    '12-6': 'Churn Root-Cause Engine',    // Changed from "Loyalty Programs"
    
    // Block 13: Market Domination Strategies
    '13-1': 'Category Narrative Canvas',  // Changed from "Competitive Analysis"
    '13-2': 'Strategic MOAT Design',      // Changed from "Market Positioning"
    '13-3': 'Ecosystem Leverage Map',     // Changed from "Category Creation"
    '13-4': 'Competitor GTM Monitoring',  // Changed from "Thought Leadership"
    '13-5': 'Brand Architecture Plan',    // Changed from "Strategic Partnerships"
    '13-6': 'Defensive GTM Tactics',      // Changed from "Market Expansion"
    
    // Block 14: Operational Infrastructure
    '14-1': 'System Architecture Diagram', // Changed from "Process Optimization"
    '14-2': 'Revenue Engine Map',         // Changed from "Technology Stack"
    '14-3': 'Internal Dashboards',        // Changed from "Automation Systems"
    '14-4': 'Tool Consolidation Tracker', // Changed from "Quality Control"
    '14-5': 'RevOps Playbook',            // Changed from "Supply Chain"
    '14-6': 'Internal SLA Policy',        // Changed from "Risk Management"
    
    // Block 15: Leadership Expansion
    '15-1': 'Executive Team',             // Changed from "Executive Development"
    '15-2': 'Board Development',          // Changed from "Board Relations"
    '15-3': 'Succession Planning',        // Same
    '15-4': 'Stakeholder Alignment',      // Changed from "Leadership Training"
    '15-5': 'Investor Relations',         // Changed from "Vision Alignment"
    '15-6': 'Leadership Dynamics',        // Changed from "Strategic Planning"
    
    // Block 16: Global Expansion Opportunities
    '16-1': 'Market Selection',           // Same
    '16-2': 'Localization Infrastructure', // Changed from "Entry Strategy"
    '16-3': 'International Pricing Matrix', // Changed from "Localization"
    '16-4': 'Regional Compliance Tracker', // Changed from "Global Partnerships"
    '16-5': 'Geo-Specific GTM Playbooks', // Changed from "Regulatory Compliance"
    '16-6': 'Expansion Risk Assessment'   // Changed from "Global Operations"
};

// Function to update HTML files
function updateBlockHTML(blockId) {
    const htmlFile = `block-${blockId}.html`;
    const htmlPath = path.join(__dirname, htmlFile);
    
    if (!fs.existsSync(htmlPath)) {
        console.log(`❌ File not found: ${htmlFile}`);
        return false;
    }
    
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');
    let updated = false;
    
    // Update each subcomponent name in the HTML
    for (let i = 1; i <= 6; i++) {
        const subcomponentId = `${blockId}-${i}`;
        const correctName = CORRECT_SUBCOMPONENT_NAMES[subcomponentId];
        
        if (correctName) {
            // Multiple patterns to catch different HTML structures
            const patterns = [
                // Pattern for subcomponent cards
                new RegExp(`(data-subcomponent="${subcomponentId}"[^>]*>\\s*<h3[^>]*>)[^<]*(</h3>)`, 'gi'),
                new RegExp(`(id="subcomponent-${i}"[^>]*>\\s*<h3[^>]*>)[^<]*(</h3>)`, 'gi'),
                new RegExp(`(class="subcomponent-card"[^>]*data-id="${subcomponentId}"[^>]*>\\s*<h3[^>]*>)[^<]*(</h3>)`, 'gi'),
                // Pattern for titles in uppercase
                new RegExp(`(<h3[^>]*>)[^<]*(</h3>\\s*<[^>]*>${subcomponentId.replace('-', '\\-')})`, 'gi'),
                // Generic h3 pattern with subcomponent context
                new RegExp(`(subcomponent-${i}[^>]*>\\s*<h3[^>]*>)[^<]*(</h3>)`, 'gi')
            ];
            
            patterns.forEach(pattern => {
                if (pattern.test(htmlContent)) {
                    htmlContent = htmlContent.replace(pattern, `$1${correctName.toUpperCase()}$2`);
                    updated = true;
                }
            });
        }
    }
    
    if (updated) {
        fs.writeFileSync(htmlPath, htmlContent);
        console.log(`✅ Updated: ${htmlFile}`);
        return true;
    } else {
        console.log(`⚠️  No changes needed: ${htmlFile}`);
        return false;
    }
}

// Function to update the subcomponent mapping file
function updateSubcomponentMapping() {
    const mappingFile = 'subcomponent-names-mapping.js';
    
    const content = `/**
 * Correct Subcomponent Names Mapping
 * This file contains the official operational names for all subcomponents
 */

const SUBCOMPONENT_NAMES = ${JSON.stringify(CORRECT_SUBCOMPONENT_NAMES, null, 4)};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SUBCOMPONENT_NAMES };
}
`;
    
    fs.writeFileSync(mappingFile, content);
    console.log(`✅ Created: ${mappingFile}`);
}

// Function to update server endpoints
function updateServerFile() {
    const serverFile = 'combined-server-enhanced.js';
    const serverPath = path.join(__dirname, serverFile);
    
    if (!fs.existsSync(serverPath)) {
        console.log(`❌ Server file not found: ${serverFile}`);
        return;
    }
    
    let serverContent = fs.readFileSync(serverPath, 'utf8');
    
    // Add the correct names mapping at the top if not already present
    if (!serverContent.includes('CORRECT_SUBCOMPONENT_NAMES')) {
        const insertPoint = serverContent.indexOf('// Block and subcomponent data');
        if (insertPoint !== -1) {
            const insertion = `
// CORRECT Subcomponent Names
const CORRECT_SUBCOMPONENT_NAMES = ${JSON.stringify(CORRECT_SUBCOMPONENT_NAMES, null, 4)};

`;
            serverContent = serverContent.slice(0, insertPoint) + insertion + serverContent.slice(insertPoint);
            
            // Update API endpoints to use correct names
            serverContent = serverContent.replace(
                /subcomponentName:\s*['"`]([^'"`]+)['"`]/g,
                (match, oldName, offset) => {
                    // Find the subcomponent ID context
                    const beforeText = serverContent.slice(Math.max(0, offset - 200), offset);
                    const idMatch = beforeText.match(/subcomponentId:\s*['"`](\d+-\d+)['"`]/);
                    if (idMatch) {
                        const id = idMatch[1];
                        const correctName = CORRECT_SUBCOMPONENT_NAMES[id];
                        if (correctName) {
                            return `subcomponentName: '${correctName}'`;
                        }
                    }
                    return match;
                }
            );
            
            fs.writeFileSync(serverPath, serverContent);
            console.log(`✅ Updated: ${serverFile}`);
        }
    }
}

// Main execution
console.log('🔧 Fixing Subcomponent Names Across All Files');
console.log('=' .repeat(60));

// Update all block HTML files
console.log('\n📝 Updating Block HTML Files:');
for (let blockId = 1; blockId <= 16; blockId++) {
    updateBlockHTML(blockId);
}

// Create mapping file
console.log('\n📝 Creating Mapping File:');
updateSubcomponentMapping();

// Update server file
console.log('\n📝 Updating Server File:');
updateServerFile();

console.log('\n✅ Subcomponent names update complete!');
console.log('Please restart the server to see the changes.');
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
    '1-4': 'Founding Team Capability',
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
    '3-1': 'Use Case Scoring Model',
    '3-2': 'Segment Tiering',
    '3-3': 'Prioritization Rubric',
    '3-4': 'Tradeoff Tracker',
    '3-5': 'Hypothesis Board',
    '3-6': 'Decision Archive',
    
    // Block 4: Prototype Launch
    '4-1': 'Feature Inclusion Matrix',
    '4-2': 'Technical Scope Tracker',
    '4-3': 'Pilot Group Selection',
    '4-4': 'QA & Success Criteria',
    '4-5': 'Timeline GANTT or Roadmap',
    '4-6': 'Post-Mortem Template',
    
    // Block 5: Go-to-Market Strategy
    '5-1': 'GTM Messaging Framework',
    '5-2': 'Sales Enablement Assets',
    '5-3': 'Pricing & Packaging Strategy',
    '5-4': 'Channel Partner Strategy',
    '5-5': 'Competitive Positioning',
    '5-6': 'Launch Planning & Execution',
    
    // Block 6: Customer Engagement Flywheel
    '6-1': 'Usage Heatmap',
    '6-2': 'Milestone Triggers',
    '6-3': 'CS Dashboard',
    '6-4': 'Activation Metric Model',
    '6-5': 'Feedback Collector',
    '6-6': 'Power User Behavior Signals',
    
    // Block 7: Quantifiable Impact
    '7-1': 'Time/Cost Savings Metrics',
    '7-2': 'Revenue-Impact Attribution',
    '7-3': 'Productivity Lift Metrics',
    '7-4': 'Net Retention Trends',
    '7-5': 'Downstream System Reductions',
    '7-6': 'Friction Reduction Evidence',
    
    // Block 8: Customer Success Expansion
    '8-1': 'Upsell Funnel Model',
    '8-2': 'Team Expansion Signals',
    '8-3': 'Organic Adoption Pattern',
    '8-4': 'Champion Mapping',
    '8-5': 'CSAT/NPS Tracking',
    '8-6': 'Renewal Readiness Tracker',
    
    // Block 9: Proof of Execution
    '9-1': 'Inbound Conversion Rates',
    '9-2': 'Outbound Play Performance',
    '9-3': 'Channel Economics Clarity',
    '9-4': 'Discovery Call Effectiveness',
    '9-5': 'Demo-to-Close Flow',
    '9-6': 'Founders Selling Model',
    
    // Block 10: Sales Team Empowerment
    '10-1': 'Enablement Asset Pack',
    '10-2': 'Rep Ramp Plan',
    '10-3': 'Win/Loss Tracker',
    '10-4': 'Objection Handling Guide',
    '10-5': 'ICP Filter Checklist',
    '10-6': 'Sales Call Library',
    
    // Block 11: High Performance Teams
    '11-1': 'Scorecard Model',
    '11-2': 'Quota Structure',
    '11-3': 'Weekly Deal Reviews',
    '11-4': 'Forecasting Framework',
    '11-5': 'Manager Coaching Loop',
    '11-6': 'Talent Gap Identification',
    
    // Block 12: Retention Systems
    '12-1': 'Onboarding Checklist',
    '12-2': 'Activation Tracker',
    '12-3': 'Success Playbooks',
    '12-4': 'Escalation SOPs',
    '12-5': 'Renewals Pipelines',
    '12-6': 'Churn Root-Cause Engine',
    
    // Block 13: Market Domination Strategies
    '13-1': 'Category Narrative Canvas',
    '13-2': 'Strategic MOAT Design',
    '13-3': 'Ecosystem Leverage Map',
    '13-4': 'Competitor GTM Monitoring',
    '13-5': 'Brand Architecture Plan',
    '13-6': 'Defensive GTM Tactics',
    
    // Block 14: Operational Infrastructure
    '14-1': 'System Architecture Diagram',
    '14-2': 'Revenue Engine Map',
    '14-3': 'Internal Dashboards',
    '14-4': 'Tool Consolidation Tracker',
    '14-5': 'RevOps Playbook',
    '14-6': 'Internal SLA Policy',
    
    // Block 15: Leadership Expansion
    '15-1': 'Executive Team',
    '15-2': 'Board Development',
    '15-3': 'Succession Planning',
    '15-4': 'Stakeholder Alignment',
    '15-5': 'Investor Relations',
    '15-6': 'Leadership Dynamics',
    
    // Block 16: Global Expansion Opportunities
    '16-1': 'Market Selection',
    '16-2': 'Localization Infrastructure',
    '16-3': 'International Pricing Matrix',
    '16-4': 'Regional Compliance Tracker',
    '16-5': 'Geo-Specific GTM Playbooks',
    '16-6': 'Expansion Risk Assessment'
};

// Block names for main block files
const BLOCK_NAMES = {
    1: 'mission-discovery',
    2: 'customer-insights',
    3: 'strategic-prioritization',
    4: 'prototype-launch',
    5: 'go-to-market-strategy',
    6: 'customer-engagement-flywheel',
    7: 'quantifiable-impact',
    8: 'customer-success-expansion',
    9: 'proof-of-execution',
    10: 'sales-team-empowerment',
    11: 'high-performance-teams',
    12: 'retention-systems',
    13: 'market-domination-strategies',
    14: 'operational-infrastructure',
    15: 'leadership-expansion',
    16: 'global-expansion-opportunities'
};

// Function to update main block HTML files
function updateMainBlockHTML(blockId) {
    const blockName = BLOCK_NAMES[blockId];
    const htmlFile = `block-${blockId}-${blockName}.html`;
    const htmlPath = path.join(__dirname, htmlFile);
    
    if (!fs.existsSync(htmlPath)) {
        // Try alternate naming
        const altFile = `block-${blockId}-${blockName.replace(/-/g, '_')}.html`;
        const altPath = path.join(__dirname, altFile);
        if (fs.existsSync(altPath)) {
            return updateFile(altPath, blockId, altFile);
        }
        console.log(`❌ File not found: ${htmlFile}`);
        return false;
    }
    
    return updateFile(htmlPath, blockId, htmlFile);
}

// Function to update individual subcomponent HTML files
function updateSubcomponentHTML(blockId, subId) {
    const subcomponentId = `${blockId}-${subId}`;
    const htmlFile = `block-${subcomponentId}.html`;
    const htmlPath = path.join(__dirname, htmlFile);
    
    if (!fs.existsSync(htmlPath)) {
        return false;
    }
    
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');
    const correctName = CORRECT_SUBCOMPONENT_NAMES[subcomponentId];
    
    if (!correctName) {
        return false;
    }
    
    let updated = false;
    
    // Update title in the HTML
    const titlePatterns = [
        /<h1[^>]*>([^<]*)<\/h1>/gi,
        /<h2[^>]*class="[^"]*subcomponent-title[^"]*"[^>]*>([^<]*)<\/h2>/gi,
        /<div[^>]*class="[^"]*title[^"]*"[^>]*>([^<]*)<\/div>/gi
    ];
    
    titlePatterns.forEach(pattern => {
        htmlContent = htmlContent.replace(pattern, (match, oldTitle) => {
            updated = true;
            return match.replace(oldTitle, correctName.toUpperCase());
        });
    });
    
    if (updated) {
        fs.writeFileSync(htmlPath, htmlContent);
        console.log(`✅ Updated: ${htmlFile}`);
        return true;
    }
    
    return false;
}

// Function to update a file
function updateFile(filePath, blockId, fileName) {
    let htmlContent = fs.readFileSync(filePath, 'utf8');
    let updated = false;
    
    // Update each subcomponent name in the HTML
    for (let i = 1; i <= 6; i++) {
        const subcomponentId = `${blockId}-${i}`;
        const correctName = CORRECT_SUBCOMPONENT_NAMES[subcomponentId];
        
        if (correctName) {
            // Pattern to find subcomponent cards with various structures
            const patterns = [
                // Pattern for h3 headers in subcomponent cards
                new RegExp(`(<div[^>]*class="[^"]*subcomponent-card[^"]*"[^>]*data-subcomponent="${subcomponentId}"[^>]*>[\\s\\S]*?<h3[^>]*>)([^<]*)(</h3>)`, 'gi'),
                // Pattern for uppercase headers
                new RegExp(`(<h3[^>]*>)([A-Z][A-Z\\s&/-]+)(</h3>[\\s\\S]*?${subcomponentId})`, 'gi'),
                // Pattern for divs with subcomponent class
                new RegExp(`(<div[^>]*id="subcomponent-${i}"[^>]*>[\\s\\S]*?<h3[^>]*>)([^<]*)(</h3>)`, 'gi'),
                // Generic pattern for any h3 near subcomponent ID
                new RegExp(`(${subcomponentId}[\\s\\S]{0,100}<h3[^>]*>)([^<]*)(</h3>)`, 'gi')
            ];
            
            patterns.forEach(pattern => {
                htmlContent = htmlContent.replace(pattern, (match, prefix, oldName, suffix) => {
                    // Only replace if it's not already the correct name
                    if (oldName.trim().toUpperCase() !== correctName.toUpperCase()) {
                        updated = true;
                        return prefix + correctName.toUpperCase() + suffix;
                    }
                    return match;
                });
            });
        }
    }
    
    if (updated) {
        fs.writeFileSync(filePath, htmlContent);
        console.log(`✅ Updated: ${fileName}`);
        return true;
    } else {
        console.log(`⚠️  No changes needed: ${fileName}`);
        return false;
    }
}

// Function to update block-detail.html
function updateBlockDetailHTML() {
    const htmlFile = 'block-detail.html';
    const htmlPath = path.join(__dirname, htmlFile);
    
    if (!fs.existsSync(htmlPath)) {
        console.log(`❌ File not found: ${htmlFile}`);
        return false;
    }
    
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');
    let updated = false;
    
    // Add the correct names as a JavaScript object in the script section
    const scriptPattern = /<script[^>]*>([\s\S]*?)<\/script>/gi;
    
    htmlContent = htmlContent.replace(scriptPattern, (match, scriptContent) => {
        if (scriptContent.includes('const subcomponentNames') || scriptContent.includes('SUBCOMPONENT_NAMES')) {
            // Replace existing mapping
            const newMapping = `
    // Correct Subcomponent Names
    const SUBCOMPONENT_NAMES = ${JSON.stringify(CORRECT_SUBCOMPONENT_NAMES, null, 8)};
`;
            scriptContent = scriptContent.replace(/const\s+(subcomponentNames|SUBCOMPONENT_NAMES)\s*=\s*{[^}]*}/gi, newMapping.trim());
            updated = true;
        } else if (scriptContent.includes('loadBlockData') || scriptContent.includes('displaySubcomponents')) {
            // Add mapping if not present
            const insertion = `
    // Correct Subcomponent Names
    const SUBCOMPONENT_NAMES = ${JSON.stringify(CORRECT_SUBCOMPONENT_NAMES, null, 8)};

`;
            scriptContent = insertion + scriptContent;
            updated = true;
        }
        return `<script>${scriptContent}</script>`;
    });
    
    if (updated) {
        fs.writeFileSync(htmlPath, htmlContent);
        console.log(`✅ Updated: ${htmlFile}`);
        return true;
    } else {
        console.log(`⚠️  No changes needed: ${htmlFile}`);
        return false;
    }
}

// Main execution
console.log('🔧 Fixing Subcomponent Names Across All Files');
console.log('=' .repeat(60));

// Update main block HTML files
console.log('\n📝 Updating Main Block HTML Files:');
let mainBlocksUpdated = 0;
for (let blockId = 1; blockId <= 16; blockId++) {
    if (updateMainBlockHTML(blockId)) {
        mainBlocksUpdated++;
    }
}

// Update individual subcomponent HTML files
console.log('\n📝 Updating Individual Subcomponent HTML Files:');
let subcomponentsUpdated = 0;
for (let blockId = 1; blockId <= 16; blockId++) {
    for (let subId = 1; subId <= 6; subId++) {
        if (updateSubcomponentHTML(blockId, subId)) {
            subcomponentsUpdated++;
        }
    }
}

// Update block-detail.html
console.log('\n📝 Updating Block Detail Page:');
updateBlockDetailHTML();

// Create mapping file
console.log('\n📝 Creating/Updating Mapping File:');
const mappingContent = `/**
 * Correct Subcomponent Names Mapping
 * This file contains the official operational names for all subcomponents
 */

const SUBCOMPONENT_NAMES = ${JSON.stringify(CORRECT_SUBCOMPONENT_NAMES, null, 4)};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SUBCOMPONENT_NAMES };
}
`;

fs.writeFileSync('subcomponent-names-mapping.js', mappingContent);
console.log('✅ Created: subcomponent-names-mapping.js');

// Summary
console.log('\n' + '='.repeat(60));
console.log('📊 UPDATE SUMMARY:');
console.log(`✅ Main block files updated: ${mainBlocksUpdated}/16`);
console.log(`✅ Subcomponent files updated: ${subcomponentsUpdated}/96`);
console.log('\n✅ Subcomponent names update complete!');
console.log('The correct operational names have been applied to all block pages.');
#!/usr/bin/env node

/**
 * Fix "What" Descriptions for All Subcomponents
 * 
 * Uses SSOT (subcomponent names, agent domains, scoring dimensions)
 * to generate accurate "What" descriptions
 */

const fs = require('fs');
const { COMPLETE_SSOT_REGISTRY } = require('./complete-ssot-registry.js');
const { SUBCOMPONENT_NAMES } = require('../subcomponent-names-mapping.js');

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║  Fix "What" Descriptions Using SSOT                        ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

// Load audit results to know which ones need fixing
const auditReport = JSON.parse(fs.readFileSync('comprehensive-content-audit-report.json', 'utf8'));
const needsFix = [
    ...auditReport.criticalIssues.filter(item => 
        item.issues.some(i => i.section === 'what')
    ).map(item => item.id)
];

console.log(`Found ${needsFix.length} subcomponents needing "What" description fixes\n`);

// Generate proper "What" descriptions based on SSOT
const fixes = {};

for (const id of needsFix) {
    const ssot = COMPLETE_SSOT_REGISTRY[id];
    const name = ssot.name;
    const agent = ssot.agent;
    const dimensions = ssot.analysis.dimensions;
    
    // Generate contextual "What" description
    const dimensionNames = dimensions.map(d => d.name.toLowerCase()).join(', ');
    
    let whatDescription = '';
    
    // Generate based on subcomponent type and domain
    if (name.includes('Tracker') || name.includes('Dashboard')) {
        whatDescription = `A systematic framework for monitoring and measuring ${name.toLowerCase()} through data collection, analysis, and actionable insights. Tracks key metrics including ${dimensionNames} to enable proactive decision-making and continuous improvement.`;
    } else if (name.includes('Framework') || name.includes('Model')) {
        whatDescription = `A structured ${name.toLowerCase()} that provides clear guidelines and methodologies for ${agent.description.toLowerCase()}. Focuses on ${dimensionNames} to ensure comprehensive coverage and measurable outcomes.`;
    } else if (name.includes('Strategy') || name.includes('Plan')) {
        whatDescription = `A strategic approach to ${name.toLowerCase()} that aligns organizational efforts with business objectives. Encompasses ${dimensionNames} to drive systematic execution and measurable results.`;
    } else if (name.includes('Analysis') || name.includes('Assessment')) {
        whatDescription = `A comprehensive ${name.toLowerCase()} methodology that evaluates ${dimensionNames} to identify opportunities, risks, and optimization potential. Provides data-driven insights for strategic decision-making.`;
    } else {
        whatDescription = `A systematic approach to ${name.toLowerCase()} that ${agent.description.toLowerCase()}. Evaluates ${dimensionNames} to ensure excellence and continuous improvement in this critical capability.`;
    }
    
    fixes[id] = {
        name,
        currentWhat: '', // Will be filled from educational-content.js
        newWhat: whatDescription,
        agent: agent.name,
        dimensions: dimensions.map(d => d.name)
    };
    
    console.log(`✅ ${id}: Generated new "What" for ${name}`);
}

// Save fixes for review
fs.writeFileSync(
    'what-description-fixes.json',
    JSON.stringify(fixes, null, 2)
);

console.log(`\n📄 Fixes saved: what-description-fixes.json`);
console.log(`\n═══════════════════════════════════════════════════════════`);
console.log(`SUMMARY`);
console.log(`═══════════════════════════════════════════════════════════\n`);
console.log(`Generated fixes for: ${Object.keys(fixes).length} subcomponents`);
console.log(`\nNext steps:`);
console.log(`  1. Review what-description-fixes.json`);
console.log(`  2. Run: node core/apply-what-fixes.js`);
console.log(`  3. Regenerate SSOT`);
console.log(`  4. Test and verify\n`);
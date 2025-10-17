#!/usr/bin/env node

/**
 * Apply Custom Metrics to Educational Content
 * 
 * Automatically inserts keyMetrics into educational-content.js
 * for all 96 subcomponents
 */

const fs = require('fs');
const path = require('path');

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║  Apply Custom Metrics to Educational Content              ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

// Load the metrics to add
const metricsData = JSON.parse(fs.readFileSync('custom-metrics-to-add.json', 'utf8'));

// Read the current educational-content.js file
const filePath = path.join(__dirname, '..', 'educational-content.js');
let content = fs.readFileSync(filePath, 'utf8');

let updatedCount = 0;
let skippedCount = 0;

console.log(`Processing ${Object.keys(metricsData).length} subcomponents...\n`);

// Process each subcomponent
for (const [id, data] of Object.entries(metricsData)) {
    const searchPattern = `"${id}": {`;
    const index = content.indexOf(searchPattern);
    
    if (index === -1) {
        console.log(`⚠️  ${id}: Not found in file`);
        skippedCount++;
        continue;
    }
    
    // Find the "why" field for this subcomponent
    const whyPattern = /"why":\s*"[^"]*"/;
    const startSearch = content.substring(index);
    const whyMatch = startSearch.match(whyPattern);
    
    if (!whyMatch) {
        console.log(`⚠️  ${id}: Could not find 'why' field`);
        skippedCount++;
        continue;
    }
    
    const whyEndIndex = index + whyMatch.index + whyMatch[0].length;
    
    // Check if keyMetrics already exists
    const nextComma = content.indexOf(',', whyEndIndex);
    const nextSection = content.substring(whyEndIndex, nextComma + 200);
    
    if (nextSection.includes('"keyMetrics"')) {
        console.log(`✓ ${id}: Already has keyMetrics`);
        skippedCount++;
        continue;
    }
    
    // Insert keyMetrics after the "why" field
    const metricsJSON = JSON.stringify(data.metrics, null, 6);
    const insertion = `,\n    "keyMetrics": ${metricsJSON}`;
    
    content = content.substring(0, whyEndIndex) + insertion + content.substring(whyEndIndex);
    
    console.log(`✅ ${id}: Added custom metrics (${data.category})`);
    updatedCount++;
}

// Write the updated content back
fs.writeFileSync(filePath, content, 'utf8');

console.log(`\n═══════════════════════════════════════════════════════════`);
console.log(`RESULTS`);
console.log(`═══════════════════════════════════════════════════════════\n`);
console.log(`✅ Updated: ${updatedCount} subcomponents`);
console.log(`⏭️  Skipped: ${skippedCount} subcomponents`);
console.log(`\n✅ educational-content.js has been updated!\n`);
console.log(`Next steps:`);
console.log(`  1. Review educational-content.js`);
console.log(`  2. Run: node core/generate-complete-ssot.js`);
console.log(`  3. Restart server and test\n`);
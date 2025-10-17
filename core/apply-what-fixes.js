#!/usr/bin/env node

/**
 * Apply "What" Description Fixes
 * 
 * Updates educational-content.js with corrected "What" descriptions
 */

const fs = require('fs');
const path = require('path');

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║  Apply "What" Description Fixes                            ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

// Load fixes
const fixes = JSON.parse(fs.readFileSync('what-description-fixes.json', 'utf8'));

// Read educational-content.js
const filePath = path.join(__dirname, '..', 'educational-content.js');
let content = fs.readFileSync(filePath, 'utf8');

let updated = 0;
let failed = 0;

console.log(`Applying fixes to ${Object.keys(fixes).length} subcomponents...\n`);

for (const [id, fix] of Object.entries(fixes)) {
    try {
        // Find the subcomponent section
        const searchPattern = `"${id}": {`;
        const index = content.indexOf(searchPattern);
        
        if (index === -1) {
            console.log(`❌ ${id}: Not found in file`);
            failed++;
            continue;
        }
        
        // Find the "what" field
        const whatPattern = /"what":\s*"[^"]*(?:\\.[^"]*)*"/;
        const startSearch = content.substring(index, index + 2000);
        const whatMatch = startSearch.match(whatPattern);
        
        if (!whatMatch) {
            console.log(`❌ ${id}: Could not find 'what' field`);
            failed++;
            continue;
        }
        
        const whatStartIndex = index + whatMatch.index;
        const whatEndIndex = whatStartIndex + whatMatch[0].length;
        
        // Replace the "what" field
        const newWhat = `"what": "${fix.newWhat}"`;
        content = content.substring(0, whatStartIndex) + newWhat + content.substring(whatEndIndex);
        
        console.log(`✅ ${id}: Updated "What" for ${fix.name}`);
        updated++;
        
    } catch (error) {
        console.log(`❌ ${id}: Error - ${error.message}`);
        failed++;
    }
}

// Write back
fs.writeFileSync(filePath, content, 'utf8');

console.log(`\n═══════════════════════════════════════════════════════════`);
console.log(`RESULTS`);
console.log(`═══════════════════════════════════════════════════════════\n`);
console.log(`✅ Updated: ${updated} subcomponents`);
console.log(`❌ Failed: ${failed} subcomponents`);
console.log(`\n✅ educational-content.js has been updated!`);
console.log(`\nNext steps:`);
console.log(`  1. Run: node core/generate-complete-ssot.js`);
console.log(`  2. Run: node core/comprehensive-content-audit.js`);
console.log(`  3. Verify improvements\n`);
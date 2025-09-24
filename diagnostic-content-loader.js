// Diagnostic Content Loader - Debug why content isn't updating
const fs = require('fs');
const path = require('path');

console.log('\n=== DIAGNOSTIC CONTENT LOADER ===\n');

// Load both content files
let educationalContent = {};
let missingContent = {};

try {
    // Clear require cache to force reload
    delete require.cache[require.resolve('./educational-content.js')];
    delete require.cache[require.resolve('./missing-content-additions.js')];
    
    educationalContent = require('./educational-content.js');
    missingContent = require('./missing-content-additions.js');
    
    console.log('✓ Successfully loaded content files');
    console.log(`  - educational-content.js: ${Object.keys(educationalContent).length} entries`);
    console.log(`  - missing-content-additions.js: ${Object.keys(missingContent).length} entries`);
} catch (error) {
    console.error('✗ Error loading content files:', error.message);
}

// Merge content
const allContent = { ...educationalContent, ...missingContent };
console.log(`\n✓ Merged content: ${Object.keys(allContent).length} total entries`);

// Test specific problematic subcomponents
const testCases = [
    { id: '1-1', expected: 'Problem Statement' },
    { id: '7-1', expected: 'Time & Cost Savings' },
    { id: '8-1', expected: 'Upsell Strategy' },
    { id: '10-1', expected: 'Sales Enablement Assets' },
    { id: '11-1', expected: 'Performance Scorecard' },
    { id: '12-1', expected: 'Customer Onboarding' },
    { id: '15-1', expected: 'Executive Hiring' },
    { id: '16-1', expected: 'Market Entry Analysis' }
];

console.log('\n=== CONTENT VERIFICATION ===\n');

testCases.forEach(test => {
    const content = allContent[test.id];
    if (!content) {
        console.log(`✗ ${test.id}: MISSING CONTENT`);
    } else {
        const actualTitle = content.title;
        const matches = actualTitle === test.expected;
        console.log(`${matches ? '✓' : '✗'} ${test.id}: "${actualTitle}" ${matches ? '==' : '!='} "${test.expected}"`);
        
        if (!matches) {
            console.log(`    Current content type: ${typeof content}`);
            console.log(`    Has 'what' section: ${!!content.what}`);
            console.log(`    First 50 chars of 'what': ${content.what ? content.what.substring(0, 50) : 'N/A'}`);
        }
    }
});

// Check file modification times
console.log('\n=== FILE MODIFICATION TIMES ===\n');

const files = [
    './educational-content.js',
    './missing-content-additions.js',
    './server.js'
];

files.forEach(file => {
    try {
        const stats = fs.statSync(path.join(__dirname, file));
        const modTime = new Date(stats.mtime);
        const ageMinutes = Math.floor((Date.now() - modTime) / 60000);
        console.log(`${file}: Modified ${ageMinutes} minutes ago (${modTime.toLocaleString()})`);
    } catch (error) {
        console.log(`${file}: Unable to check (${error.message})`);
    }
});

// Check if server is using the right content
console.log('\n=== SERVER ENDPOINT CHECK ===\n');

// Simulate what the server endpoint does
function getSubcomponentContent(id) {
    const allEducationalContent = { ...educationalContent, ...missingContent };
    return allEducationalContent[id] || null;
}

// Test the endpoint logic
const testId = '1-1';
const serverContent = getSubcomponentContent(testId);
console.log(`Server would return for ${testId}:`);
console.log(`  Title: ${serverContent?.title || 'N/A'}`);
console.log(`  Has content: ${!!serverContent}`);

console.log('\n=== DIAGNOSIS COMPLETE ===\n');
console.log('Run this diagnostic to see what content is actually being loaded.');
console.log('If titles don\'t match expected values, the content files need updating.');
console.log('If files were modified recently but content is old, server needs restart.\n');
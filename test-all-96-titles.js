// Test all 96 subcomponents via API to ensure correct titles are returned
const fetch = require('node-fetch');
const { educationalContent } = require('./educational-content');
const { missingContent } = require('./missing-content-additions');

// Merge all content
const allContent = { ...educationalContent, ...missingContent };

// Base URL for API
const BASE_URL = 'http://localhost:3000';

// Define all 96 subcomponents
const subcomponents = [];
for (let block = 1; block <= 16; block++) {
    for (let sub = 1; sub <= 6; sub++) {
        subcomponents.push(`${block}-${sub}`);
    }
}

async function testSubcomponent(id) {
    try {
        const response = await fetch(`${BASE_URL}/api/subcomponents/${id}`);
        if (!response.ok) {
            return { id, error: `HTTP ${response.status}` };
        }
        
        const data = await response.json();
        const expectedContent = allContent[id];
        
        // Check if the API returns the correct title
        const apiTitle = data.education?.title || data.name;
        const expectedTitle = expectedContent?.title || 'Unknown';
        
        return {
            id,
            apiTitle,
            expectedTitle,
            match: apiTitle === expectedTitle,
            hasEducation: !!data.education,
            educationTitle: data.education?.title
        };
    } catch (error) {
        return { id, error: error.message };
    }
}

async function testAll() {
    console.log('=== TESTING ALL 96 SUBCOMPONENTS VIA API ===\n');
    
    const results = [];
    let successCount = 0;
    let failureCount = 0;
    
    // Test in batches to avoid overwhelming the server
    for (let i = 0; i < subcomponents.length; i += 10) {
        const batch = subcomponents.slice(i, i + 10);
        const batchResults = await Promise.all(batch.map(testSubcomponent));
        results.push(...batchResults);
        
        // Show progress
        console.log(`Tested ${Math.min(i + 10, subcomponents.length)}/${subcomponents.length} subcomponents...`);
    }
    
    console.log('\n=== RESULTS ===\n');
    
    // Group by block for better readability
    for (let block = 1; block <= 16; block++) {
        console.log(`\nBlock ${block}:`);
        console.log('─'.repeat(60));
        
        const blockResults = results.filter(r => r.id.startsWith(`${block}-`));
        
        blockResults.forEach(result => {
            if (result.error) {
                console.log(`  ❌ ${result.id}: ERROR - ${result.error}`);
                failureCount++;
            } else if (!result.match) {
                console.log(`  ❌ ${result.id}: MISMATCH`);
                console.log(`     API returns: "${result.apiTitle}"`);
                console.log(`     Expected: "${result.expectedTitle}"`);
                failureCount++;
            } else {
                console.log(`  ✅ ${result.id}: "${result.apiTitle}"`);
                successCount++;
            }
        });
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 SUMMARY:');
    console.log(`  ✅ Correct: ${successCount}/96`);
    console.log(`  ❌ Issues: ${failureCount}/96`);
    console.log(`  📈 Success rate: ${((successCount/96)*100).toFixed(1)}%`);
    
    // List specific problem areas
    const problems = results.filter(r => r.error || !r.match);
    if (problems.length > 0) {
        console.log('\n⚠️  PROBLEM SUBCOMPONENTS:');
        problems.forEach(p => {
            console.log(`  - ${p.id}: ${p.error || `Expected "${p.expectedTitle}", got "${p.apiTitle}"`}`);
        });
    }
}

// Run the test
testAll().catch(console.error);
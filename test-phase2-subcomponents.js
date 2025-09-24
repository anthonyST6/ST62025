// Test script for Phase 2 subcomponents (Blocks 5-8)
const fetch = require('node-fetch');

// Phase 2 structure
const phase2Blocks = [
    {
        id: 5,
        name: 'Early Adopter Wins',
        endpoint: '/api/analyze/early-adopter-wins',
        subcomponents: [
            { id: '5-1', name: 'Early Customer Pipeline' },
            { id: '5-2', name: 'Pilot Success Metrics' },
            { id: '5-3', name: 'Reference Story Development' },
            { id: '5-4', name: 'Feedback Loop Process' },
            { id: '5-5', name: 'Product Iteration Roadmap' },
            { id: '5-6', name: 'Community Building Strategy' }
        ]
    },
    {
        id: 6,
        name: 'Customer Engagement Flywheel',
        endpoint: '/api/analyze/customer-engagement',
        subcomponents: [
            { id: '6-1', name: 'Onboarding Optimization' },
            { id: '6-2', name: 'Activation Metrics' },
            { id: '6-3', name: 'Engagement Scoring' },
            { id: '6-4', name: 'Retention Analysis' },
            { id: '6-5', name: 'Expansion Playbook' },
            { id: '6-6', name: 'Advocacy Program' }
        ]
    },
    {
        id: 7,
        name: 'Quantifiable Impact',
        endpoint: '/api/analyze/quantifiable-impact',
        subcomponents: [
            { id: '7-1', name: 'ROI Calculator' },
            { id: '7-2', name: 'Time-to-Value Metrics' },
            { id: '7-3', name: 'Business Case Builder' },
            { id: '7-4', name: 'Success Metrics Dashboard' },
            { id: '7-5', name: 'Competitive Benchmarking' },
            { id: '7-6', name: 'Value Realization Framework' }
        ]
    },
    {
        id: 8,
        name: 'Customer Success Expansion',
        endpoint: '/api/analyze/customer-success',
        subcomponents: [
            { id: '8-1', name: 'Health Score Model' },
            { id: '8-2', name: 'Churn Prediction' },
            { id: '8-3', name: 'Upsell/Cross-sell Matrix' },
            { id: '8-4', name: 'Customer Journey Optimization' },
            { id: '8-5', name: 'Support Escalation Process' },
            { id: '8-6', name: 'Success Team Scaling' }
        ]
    }
];

// Sample worksheet data for testing
const sampleWorksheetData = {
    field1: 'Test data for analysis',
    field2: 'Sample customer information',
    field3: 'Product details and features',
    field4: 'Market analysis data',
    field5: 'Competitive landscape',
    field6: 'Success metrics and KPIs'
};

async function testSubcomponent(block, subcomponent) {
    console.log(`\n📋 Testing ${subcomponent.id}: ${subcomponent.name}`);
    
    try {
        // 1. Test if subcomponent loads
        console.log('  1️⃣ Checking if subcomponent loads...');
        const contentResponse = await fetch(`http://localhost:3000/api/subcomponent-content?id=${subcomponent.id}`, {
            headers: { 'x-user-id': '1' }
        });
        
        if (contentResponse.ok) {
            const content = await contentResponse.json();
            console.log(`     ✅ Loaded: ${content.title || subcomponent.name}`);
            console.log(`     📚 Has education: ${!!content.educationalContent}`);
            console.log(`     🎯 Has workspace: ${!!content.workspaceContent}`);
        } else {
            console.log(`     ❌ Failed to load content: ${contentResponse.status}`);
        }
        
        // 2. Test analysis endpoint
        console.log('  2️⃣ Testing analysis endpoint...');
        const analysisResponse = await fetch(`http://localhost:3000${block.endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-user-id': '1'
            },
            body: JSON.stringify({
                worksheetData: sampleWorksheetData,
                subcomponentId: subcomponent.id,
                uploadedDocs: []
            })
        });
        
        if (analysisResponse.ok) {
            const result = await analysisResponse.json();
            console.log('     ✅ Analysis successful!');
            console.log(`     📊 Score: ${result.score || 0}%`);
            console.log(`     💡 Recommendations: ${result.recommendations?.length || 0}`);
            
            // Check if recommendations have proper format
            if (result.recommendations && result.recommendations.length > 0) {
                const rec = result.recommendations[0];
                const hasImpact = rec.expectedImprovement || rec.impact;
                const hasActionPlan = rec.actionPlan && rec.actionPlan.length > 0;
                console.log(`     🎯 Has impact scores: ${hasImpact ? '✅' : '❌'}`);
                console.log(`     📝 Has action plans: ${hasActionPlan ? '✅' : '❌'}`);
            }
            
            // Show dimension scores if available
            if (result.detailedScores) {
                console.log(`     📈 Dimensions analyzed: ${Object.keys(result.detailedScores).length}`);
                for (const [dim, data] of Object.entries(result.detailedScores)) {
                    console.log(`        - ${dim}: ${data.score}/${data.maxScore}`);
                }
            }
            
            return { success: true, score: result.score || 0 };
        } else {
            console.log(`     ❌ Analysis failed: ${analysisResponse.status}`);
            const errorText = await analysisResponse.text();
            console.log(`     Error: ${errorText.substring(0, 100)}...`);
            return { success: false, score: 0 };
        }
        
    } catch (error) {
        console.log(`     ❌ Error: ${error.message}`);
        return { success: false, score: 0 };
    }
}

async function testPhase2() {
    console.log('🚀 Starting Phase 2 Subcomponents Test');
    console.log('============================================================\n');
    
    const results = {
        total: 0,
        successful: 0,
        failed: 0,
        blockResults: {}
    };
    
    // Test each block
    for (const block of phase2Blocks) {
        console.log(`\n🏗️  Block ${block.id} - ${block.name}`);
        console.log('--------------------------------------------------');
        
        const blockResults = {
            total: block.subcomponents.length,
            successful: 0,
            scores: []
        };
        
        // Test each subcomponent in the block
        for (const subcomponent of block.subcomponents) {
            const result = await testSubcomponent(block, subcomponent);
            results.total++;
            
            if (result.success) {
                results.successful++;
                blockResults.successful++;
                blockResults.scores.push(result.score);
            } else {
                results.failed++;
            }
            
            // Small delay to avoid overwhelming the server
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        // Calculate block average
        const avgScore = blockResults.scores.length > 0 
            ? (blockResults.scores.reduce((a, b) => a + b, 0) / blockResults.scores.length).toFixed(1)
            : 0;
        
        results.blockResults[block.name] = {
            ...blockResults,
            averageScore: avgScore
        };
    }
    
    // Display summary
    console.log('\n\n============================================================');
    console.log('📊 TEST SUMMARY');
    console.log('============================================================\n');
    
    console.log('📈 Overall Results:');
    console.log(`   Total Subcomponents: ${results.total}`);
    console.log(`   ✅ Successful: ${results.successful} (${((results.successful/results.total)*100).toFixed(1)}%)`);
    console.log(`   ❌ Failed: ${results.failed} (${((results.failed/results.total)*100).toFixed(1)}%)`);
    
    console.log('\n📊 Block-by-Block Results:\n');
    for (const [blockName, blockData] of Object.entries(results.blockResults)) {
        console.log(`   ${blockName}:`);
        console.log(`      ✅ Working: ${blockData.successful}/${blockData.total}`);
        console.log(`      📊 Average Score: ${blockData.averageScore}%`);
    }
    
    if (results.successful === results.total) {
        console.log('\n✅ All Phase 2 subcomponents are working properly!');
    } else {
        console.log(`\n⚠️ ${results.failed} subcomponents need attention.`);
    }
    
    console.log('\n\n✅ Test completed!');
}

// Run the test
testPhase2().catch(console.error);
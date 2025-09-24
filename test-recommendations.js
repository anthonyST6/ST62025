// Test script to verify Problem Statement recommendations are properly formatted
const fetch = require('node-fetch');

async function testProblemStatementRecommendations() {
    console.log('🧪 Testing Problem Statement Recommendations...\n');
    
    // Sample worksheet data
    const worksheetData = {
        'who-affected': 'B2B SaaS startups with 10-50 employees struggle to effectively manage their go-to-market strategy. These companies typically have limited resources and expertise.',
        'what-problem': 'They lack a systematic approach to validate product-market fit and scale their customer acquisition. This results in wasted resources, slow growth, and high burn rates.',
        'when-occur': 'This problem occurs immediately after initial product launch when they need to transition from founder-led sales to scalable processes.',
        'what-impact': 'Companies lose $50K-$200K per month in inefficient spending and miss 60% of qualified opportunities due to poor GTM execution.',
        'how-solving': 'Currently using expensive consultants ($20K/month), generic CRM tools, or trying to figure it out themselves with online resources.',
        'evidence-validation': 'Interviewed 150+ founders and found 87% struggle with GTM. Pilot program with 12 companies showed 3x improvement in conversion rates.'
    };
    
    try {
        // Call the API
        const response = await fetch('http://localhost:3000/api/analyze/problem-statement', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-user-id': '1'
            },
            body: JSON.stringify({
                worksheetData: worksheetData,
                subcomponentId: '1-1',
                uploadedDocs: []
            })
        });
        
        if (!response.ok) {
            throw new Error(`API returned ${response.status}: ${response.statusText}`);
        }
        
        const result = await response.json();
        
        console.log('📊 Overall Score:', result.score + '%');
        console.log('\n📋 Recommendations Analysis:\n');
        
        // Check recommendations
        if (result.recommendations && result.recommendations.length > 0) {
            console.log(`✅ Found ${result.recommendations.length} recommendations\n`);
            
            result.recommendations.forEach((rec, index) => {
                console.log(`\n📌 Recommendation ${index + 1}:`);
                console.log('   Area:', rec.area || rec.action || 'Not specified');
                console.log('   Priority:', rec.priority || 'Not specified');
                
                // Check for impact score formatting
                if (rec.expectedImprovement) {
                    console.log('   ✅ Expected Improvement:', `+${rec.expectedImprovement} points`);
                } else if (rec.impact) {
                    console.log('   ✅ Impact:', rec.impact);
                } else {
                    console.log('   ❌ No impact score found');
                }
                
                // Check for actionable steps
                if (rec.actionPlan && rec.actionPlan.length > 0) {
                    console.log('   ✅ Action Plan:', rec.actionPlan.length, 'steps');
                    rec.actionPlan.forEach((step, i) => {
                        console.log(`      ${i + 1}. ${step.substring(0, 60)}...`);
                    });
                } else {
                    console.log('   ❌ No action plan found');
                }
                
                // Check for success metrics
                if (rec.successMetrics && rec.successMetrics.length > 0) {
                    console.log('   ✅ Success Metrics:', rec.successMetrics.length, 'metrics');
                } else {
                    console.log('   ⚠️ No success metrics');
                }
            });
            
            // Summary
            console.log('\n📊 Summary:');
            const hasAllImpacts = result.recommendations.every(r => r.expectedImprovement || r.impact);
            const hasAllActions = result.recommendations.every(r => r.actionPlan && r.actionPlan.length > 0);
            const hasAllMetrics = result.recommendations.every(r => r.successMetrics && r.successMetrics.length > 0);
            
            console.log(`   Impact Scores: ${hasAllImpacts ? '✅ All present' : '❌ Some missing'}`);
            console.log(`   Action Plans: ${hasAllActions ? '✅ All present' : '❌ Some missing'}`);
            console.log(`   Success Metrics: ${hasAllMetrics ? '✅ All present' : '⚠️ Some missing'}`);
            
            // Check for resources (should be empty now)
            if (result.resources && result.resources.length > 0) {
                console.log(`\n⚠️ Resources found (${result.resources.length}) - these should be removed`);
            } else {
                console.log('\n✅ No resources section (good - user wants recommendations only)');
            }
            
        } else {
            console.log('❌ No recommendations found in response');
        }
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

// Run the test
testProblemStatementRecommendations();
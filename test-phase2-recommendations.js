// Test script to verify Phase 2 recommendations are working with "+X points" format

const EarlyAdopterWinsAgent = require('./early-adopter-wins-agent.js');
const CustomerEngagementFlywheelAgent = require('./customer-engagement-flywheel-agent.js');
const QuantifiableImpactAgent = require('./quantifiable-impact-agent.js');
const CustomerSuccessExpansionAgent = require('./customer-success-expansion-agent.js');

// Instantiate agents
const agents = {
    '5': new EarlyAdopterWinsAgent(),
    '6': new CustomerEngagementFlywheelAgent(),
    '7': new QuantifiableImpactAgent(),
    '8': new CustomerSuccessExpansionAgent()
};

console.log('🧪 Testing Phase 2 Recommendations Format\n');
console.log('=' .repeat(60));

// Test each block
async function testPhase2() {
    for (const [blockId, agent] of Object.entries(agents)) {
        console.log(`\n📦 Block ${blockId} - ${agent.name || 'Agent'}`);
        console.log('-'.repeat(40));
        
        // Test first subcomponent of each block
        const subcomponentId = `${blockId}-1`;
        const testAnswers = {
            [`${subcomponentId}_q1`]: 'We have documented 5 customer wins with measurable ROI',
            [`${subcomponentId}_q2`]: 'Average ROI is 300% with $500K savings per customer',
            [`${subcomponentId}_q3`]: 'We have case studies and testimonials from 10 customers'
        };
        
        try {
            const result = await agent.analyzeWorksheet(testAnswers, subcomponentId);
        
            if (result && result.recommendations) {
                console.log(`✅ Subcomponent ${subcomponentId}:`);
                console.log(`   Overall Score: ${result.score}%`);
                result.recommendations.forEach((rec, index) => {
                    console.log(`   ${index + 1}. ${rec.action || rec.title || 'Recommendation'}`);
                    console.log(`      Impact: ${rec.expectedImprovement || rec.impact || 'N/A'}`);
                    console.log(`      Priority: ${rec.priority}`);
                    
                    // Verify format
                    const impactField = rec.expectedImprovement || rec.impact || '';
                    if (!impactField.includes('+') || !impactField.includes('points')) {
                        console.log(`      ⚠️ WARNING: Impact not in "+X points" format!`);
                    }
                });
            } else {
                console.log(`❌ No recommendations returned for ${subcomponentId}`);
            }
        } catch (error) {
            console.log(`❌ Error testing ${subcomponentId}: ${error.message}`);
            console.log(`      Stack: ${error.stack}`);
        }
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('✨ Phase 2 Recommendations Test Complete!\n');
    
    // Also test that recommendations library wrapper is working
    try {
        const { generateDynamicRecommendations } = require('./recommendations-library-dynamic-wrapper.js');
        console.log('📚 Testing Recommendations Library Wrapper:');
        const testRecs = generateDynamicRecommendations('early-adopter-wins', { winDocumentation: { percentage: 50 } });
        console.log(`   Generated ${testRecs.length} recommendations`);
        if (testRecs.length > 0) {
            console.log(`   First recommendation:`);
            console.log(`   - Action: ${testRecs[0].action}`);
            console.log(`   - Impact: ${testRecs[0].expectedImprovement}`);
            console.log(`   - Priority: ${testRecs[0].priority}`);
        }
    } catch (error) {
        console.log(`❌ Error testing recommendations wrapper: ${error.message}`);
    }
    
    console.log('\n🎯 All tests complete!');
}

// Run the async test
testPhase2().catch(console.error);
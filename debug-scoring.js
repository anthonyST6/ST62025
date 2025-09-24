// Debug script to trace scoring flow
const { testCompany } = require('./test-company');
const ProblemStatementAgent = require('./problem-statement-agent-enhanced');

console.log('=== SCORING DIAGNOSIS ===\n');

// 1. Check test company scores
console.log('1. TEST COMPANY SCORES:');
console.log('   Block 1 (Mission Discovery):', testCompany.blockScores[1].score + '%');
console.log('   - Trend:', testCompany.blockScores[1].trend);
console.log('   - Last Change:', testCompany.blockScores[1].lastChange);

// 2. Test the agent scoring
console.log('\n2. PROBLEM STATEMENT AGENT TEST:');
const agent = new ProblemStatementAgent();
const testWorksheet = {
    'who-affected': 'B2B SaaS founders and GTM leaders at early-stage startups',
    'what-problem': 'Early-stage startups struggle to build effective go-to-market strategies',
    'when-occur': 'During critical growth phases when transitioning from founder-led sales',
    'what-impact': 'Startups lose 6-12 months of runway due to inefficient GTM execution',
    'how-solving': 'Currently using expensive consultants and generic online courses',
    'evidence-validation': 'Interviewed 50+ founders who reported GTM as #1 challenge'
};

const analysis = agent.analyzeWorksheet(testWorksheet);
console.log('   Agent Score:', analysis.score + '%');
console.log('   Confidence:', analysis.confidence);

// 3. Check scoring dimensions
console.log('\n3. DETAILED SCORING BREAKDOWN:');
if (analysis.detailedScores) {
    Object.entries(analysis.detailedScores).forEach(([dimension, data]) => {
        console.log(`   ${dimension}:`);
        console.log(`     - Score: ${data.score}/20`);
        console.log(`     - Max: ${data.maxScore}`);
        console.log(`     - Percentage: ${Math.round((data.score / data.maxScore) * 100)}%`);
        console.log(`     - Weight: ${data.weight}`);
    });
}

// 4. Check what happens when we update
console.log('\n4. SCORE UPDATE SIMULATION:');
const oldScore = testCompany.blockScores[1].score;
const result = testCompany.updateBlockScore(1, analysis.score, {
    title: 'Problem Statement Analysis',
    eventType: 'analysis',
    weaknesses: ['Previous articulation unclear'],
    actions: ['Completed AI analysis']
});
console.log('   Old Score:', oldScore + '%');
console.log('   New Score:', result.newScore + '%');
console.log('   Change:', result.change > 0 ? '+' + result.change : result.change);

// 5. Check if test company score persists
console.log('\n5. PERSISTENCE CHECK:');
console.log('   Test Company Block 1 Score After Update:', testCompany.blockScores[1].score + '%');

// 6. Generate history to see if it includes the change
console.log('\n6. HISTORY GENERATION TEST:');
const history = testCompany.generateScoreHistory(1, 7);
console.log('   Last 3 history points:');
history.slice(-3).forEach(point => {
    console.log(`     ${point.date}: ${point.score}% ${point.hasChange ? '(CHANGE EVENT)' : ''}`);
});

console.log('\n=== DIAGNOSIS COMPLETE ===');
console.log('\nKEY FINDINGS:');
console.log('1. Test company has FIXED scores that override analysis');
console.log('2. Agent calculates scores correctly but they get replaced');
console.log('3. The updateBlockScore method DOES update the test company');
console.log('4. But the test company data is not persisted between requests');
console.log('\nRECOMMENDATION: Need to persist agent scores to database, not just test company memory');
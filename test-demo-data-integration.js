/**
 * Test Demo Data Integration
 * Verifies that ST6Co demo data is properly integrated into worksheets
 */

const { st6coDemoData, getDemoAnswer } = require('./st6co-demo-data-complete.js');
const agentGeneratedQuestions = require('./agent-generated-questions-complete.js');

console.log('🧪 Testing ST6Co Demo Data Integration\n');
console.log('=' .repeat(60));

// Test configuration
const testSubcomponents = [
    '1-1', '2-3', '5-1', '7-2', '10-1', '13-4', '16-6'  // Sample across all blocks
];

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

// Helper function to check if answer meets quality criteria
function validateAnswer(answer, questionType) {
    if (!answer) return false;
    
    // Check length requirements
    if (answer.length < 100) return false;
    if (answer.length > 1000) return false;
    
    // Check for contextual relevance (must mention ST6Co/ScaleOps6)
    const hasContext = answer.toLowerCase().includes('scaleops6') || 
                      answer.toLowerCase().includes('st6co') ||
                      answer.toLowerCase().includes('platform') ||
                      answer.toLowerCase().includes('startup');
    
    // Check for type-specific content
    switch(questionType) {
        case 'diagnostic':
            return hasContext && (answer.includes('challenge') || answer.includes('problem') || answer.includes('issue'));
        case 'quantitative':
            return hasContext && /\d+/.test(answer); // Must contain numbers
        case 'strategic':
            return hasContext && (answer.includes('strategy') || answer.includes('plan') || answer.includes('approach'));
        case 'validation':
            return hasContext && (answer.includes('evidence') || answer.includes('data') || answer.includes('result'));
        case 'comparative':
            return hasContext && (answer.includes('compare') || answer.includes('versus') || answer.includes('than'));
        case 'execution':
            return hasContext && (answer.includes('implement') || answer.includes('execute') || answer.includes('action'));
        default:
            return hasContext;
    }
}

// Test each subcomponent
console.log('\n📋 Testing Demo Data Coverage and Quality:\n');

testSubcomponents.forEach(subcomponentId => {
    const [blockId, subId] = subcomponentId.split('-');
    console.log(`\n🔍 Testing Subcomponent ${subcomponentId}:`);
    console.log('-'.repeat(40));
    
    // Get questions for this subcomponent
    const questions = agentGeneratedQuestions[subcomponentId]?.questions || [];
    
    if (questions.length === 0) {
        console.log(`  ⚠️  No questions found for ${subcomponentId}`);
        failedTests++;
        totalTests++;
        return;
    }
    
    let subcomponentPassed = 0;
    let subcomponentTotal = 0;
    
    questions.forEach(question => {
        const answer = getDemoAnswer(blockId, subId, question.id);
        subcomponentTotal++;
        totalTests++;
        
        if (answer && validateAnswer(answer, question.type)) {
            console.log(`  ✅ ${question.id}: Valid answer (${answer.length} chars, type: ${question.type})`);
            subcomponentPassed++;
            passedTests++;
        } else {
            console.log(`  ❌ ${question.id}: ${!answer ? 'No answer found' : 'Invalid answer'} (type: ${question.type})`);
            failedTests++;
        }
    });
    
    const coverage = ((subcomponentPassed / subcomponentTotal) * 100).toFixed(1);
    console.log(`  📊 Coverage: ${subcomponentPassed}/${subcomponentTotal} (${coverage}%)`);
});

// Test scoring potential
console.log('\n\n📈 Testing Scoring Potential:\n');
console.log('-'.repeat(40));

testSubcomponents.forEach(subcomponentId => {
    const [blockId, subId] = subcomponentId.split('-');
    const questions = agentGeneratedQuestions[subcomponentId]?.questions || [];
    
    let scoreEstimate = 0;
    let validAnswers = 0;
    
    questions.forEach(question => {
        const answer = getDemoAnswer(blockId, subId, question.id);
        if (answer && validateAnswer(answer, question.type)) {
            validAnswers++;
            // Estimate score based on answer quality
            if (answer.length > 500) scoreEstimate += 85;
            else if (answer.length > 300) scoreEstimate += 75;
            else scoreEstimate += 65;
        }
    });
    
    const avgScore = validAnswers > 0 ? (scoreEstimate / validAnswers).toFixed(1) : 0;
    const meetsTarget = avgScore >= 70;
    
    console.log(`  ${meetsTarget ? '✅' : '❌'} ${subcomponentId}: Estimated score ${avgScore}% ${meetsTarget ? '(meets 70% target)' : '(below 70% target)'}`);
});

// Summary Report
console.log('\n\n' + '='.repeat(60));
console.log('📊 DEMO DATA INTEGRATION TEST SUMMARY');
console.log('='.repeat(60));
console.log(`\n  Total Tests: ${totalTests}`);
console.log(`  ✅ Passed: ${passedTests} (${((passedTests/totalTests)*100).toFixed(1)}%)`);
console.log(`  ❌ Failed: ${failedTests} (${((failedTests/totalTests)*100).toFixed(1)}%)`);

const overallSuccess = (passedTests / totalTests) >= 0.7;
console.log(`\n  ${overallSuccess ? '🎉' : '⚠️'} Overall Result: ${overallSuccess ? 'PASS' : 'NEEDS IMPROVEMENT'}`);

if (!overallSuccess) {
    console.log('\n  💡 Recommendations:');
    console.log('     - Review failed questions and add missing demo data');
    console.log('     - Ensure answers meet length requirements (100-1000 chars)');
    console.log('     - Include ST6Co/ScaleOps6 context in all answers');
    console.log('     - Match answer content to question type');
}

// Test specific demo data retrieval
console.log('\n\n🔬 Sample Demo Data Retrieval Test:\n');
console.log('-'.repeat(40));

const sampleAnswer = getDemoAnswer('1', '1', '1-1-q1');
if (sampleAnswer) {
    console.log('✅ Successfully retrieved demo answer for 1-1-q1:');
    console.log(`   Length: ${sampleAnswer.length} characters`);
    console.log(`   Preview: "${sampleAnswer.substring(0, 100)}..."`);
} else {
    console.log('❌ Failed to retrieve demo answer for 1-1-q1');
}

console.log('\n✨ Test Complete!\n');
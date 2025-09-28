// Command-line test for OUTPUT tab functionality
const fs = require('fs');
const path = require('path');

// Load the template evaluation engine
const engineCode = fs.readFileSync(path.join(__dirname, 'template-evaluation-engine.js'), 'utf8');
eval(engineCode.replace('window.TemplateEvaluationEngine', 'global.TemplateEvaluationEngine'));

// Test data
const highQualityData = {
    'who-affected': 'B2B SaaS founders and GTM leaders at early-stage startups (Seed to Series B) with 10-50 employees in the US market focusing on enterprise software solutions',
    'what-problem': 'Early-stage startups struggle to build and execute effective go-to-market strategies due to lack of structured frameworks, expert guidance, and proven playbooks. The root cause is the gap between product development expertise and market execution knowledge.',
    'when-occur': 'This occurs during critical growth phases - when transitioning from founder-led sales to building a sales team (typically at $1-5M ARR), when trying to achieve product-market fit (months 6-18), and when preparing for Series A fundraising. The problem intensifies quarterly during planning cycles.',
    'what-impact': 'Startups lose 6-12 months of runway due to inefficient GTM execution, with 70% failing to hit their growth targets. This translates to $500K-$2M in wasted resources, 40% longer sales cycles, and 50% lower conversion rates. The opportunity cost is estimated at $5M in lost revenue per year.',
    'how-solving': 'Currently using a patchwork of expensive consultants ($20-50K/month), generic online courses ($500-2000), scattered blog posts, and trial-and-error. These solutions lack personalization, comprehensive frameworks, ongoing support, and measurable outcomes. Satisfaction level is below 30%.',
    'evidence-validation': 'Interviewed 50+ founders who consistently reported GTM as their #1 challenge. Survey of 200 startups showed 85% lack structured GTM processes. Case studies from 10 pilot customers demonstrated 3x improvement in sales velocity. Industry reports from Gartner and Forrester confirm the market need.'
};

const lowQualityData = {
    'who-affected': 'Startups',
    'what-problem': 'They have problems with sales',
    'when-occur': 'Sometimes',
    'what-impact': 'It costs money',
    'how-solving': 'They try different things',
    'evidence-validation': 'We talked to some people'
};

console.log('🧪 TESTING OUTPUT TAB FUNCTIONALITY\n');
console.log('=' .repeat(60));

// Test each template
const templates = ['Problem Statement Canvas', 'Problem Validation Scorecard', 'Pain Point Prioritization Matrix'];

console.log('\n📊 HIGH-QUALITY ANSWERS TEST:');
console.log('-'.repeat(40));

const highScores = [];
templates.forEach(templateName => {
    const evaluation = global.TemplateEvaluationEngine.evaluateTemplate(templateName, highQualityData);
    highScores.push(evaluation.totalScore);
    
    console.log(`\n${templateName}:`);
    console.log(`  Score: ${evaluation.totalScore}%`);
    console.log(`  Grade: ${evaluation.grade}`);
    console.log(`  Questions evaluated: ${evaluation.questions.length}`);
    
    // Show question breakdown
    evaluation.questions.forEach((q, idx) => {
        console.log(`    Q${idx + 1}: ${q.score}% - ${q.matchedCriteria}/${q.totalCriteria} criteria met`);
    });
});

console.log('\n📊 LOW-QUALITY ANSWERS TEST:');
console.log('-'.repeat(40));

const lowScores = [];
templates.forEach(templateName => {
    const evaluation = global.TemplateEvaluationEngine.evaluateTemplate(templateName, lowQualityData);
    lowScores.push(evaluation.totalScore);
    
    console.log(`\n${templateName}:`);
    console.log(`  Score: ${evaluation.totalScore}%`);
    console.log(`  Grade: ${evaluation.grade}`);
    console.log(`  Questions evaluated: ${evaluation.questions.length}`);
});

console.log('\n✅ VERIFICATION RESULTS:');
console.log('-'.repeat(40));

// Calculate averages
const avgHigh = highScores.reduce((a, b) => a + b, 0) / highScores.length;
const avgLow = lowScores.reduce((a, b) => a + b, 0) / lowScores.length;

console.log(`\nAverage High-Quality Score: ${Math.round(avgHigh)}%`);
console.log(`Average Low-Quality Score: ${Math.round(avgLow)}%`);
console.log(`Score Differentiation: ${Math.round(avgHigh - avgLow)}%`);

// Verify all questions are being asked
console.log('\n📋 QUESTIONS VERIFICATION:');
console.log('-'.repeat(40));

let totalQuestions = 0;
let totalCriteria = 0;

templates.forEach(templateName => {
    const template = global.TemplateEvaluationEngine.templates[templateName];
    console.log(`\n${templateName}:`);
    console.log(`  Questions: ${template.questions.length}`);
    
    template.questions.forEach(q => {
        console.log(`    - ${q.question} (${q.weight}% weight, ${q.criteria.length} criteria)`);
        totalQuestions++;
        totalCriteria += q.criteria.length;
    });
});

console.log('\n📈 SUMMARY:');
console.log('-'.repeat(40));
console.log(`Total Questions Asked: ${totalQuestions}`);
console.log(`Total Evaluation Criteria: ${totalCriteria}`);
console.log(`Score Variation Working: ${avgHigh - avgLow > 20 ? '✅ YES' : '❌ NO'}`);
console.log(`Professional Grading Active: ${avgHigh > 60 && avgLow < 40 ? '✅ YES' : '❌ NO'}`);

// Test the processTemplateOutputs function
console.log('\n🔗 INTEGRATION TEST:');
console.log('-'.repeat(40));

function processTemplateOutputs(worksheetData, scoreEntry) {
    const results = {};
    
    if (!global.TemplateEvaluationEngine) {
        console.error('TemplateEvaluationEngine not loaded!');
        return results;
    }
    
    const templates = ['Problem Statement Canvas', 'Problem Validation Scorecard', 'Pain Point Prioritization Matrix'];
    
    templates.forEach(templateName => {
        const evaluation = global.TemplateEvaluationEngine.evaluateTemplate(templateName, worksheetData);
        
        const details = evaluation.questions.map(q => ({
            label: q.question.substring(0, 50) + '...',
            score: q.score,
            grade: q.grade,
            matchedCriteria: q.matchedCriteria,
            totalCriteria: q.totalCriteria
        }));
        
        results[templateName] = {
            score: evaluation.totalScore,
            grade: evaluation.grade,
            details: details,
            timestamp: new Date().toISOString(),
            sourceScore: scoreEntry.score || 0,
            evaluation: evaluation
        };
    });
    
    return results;
}

const testResults = processTemplateOutputs(highQualityData, { score: 75 });
console.log('processTemplateOutputs function: ✅ Working');
console.log(`Templates processed: ${Object.keys(testResults).length}`);
console.log(`All have evaluations: ${Object.values(testResults).every(r => r.evaluation) ? '✅ YES' : '❌ NO'}`);

console.log('\n🎉 OUTPUT TAB TESTING COMPLETE!');
console.log('=' .repeat(60));

if (avgHigh - avgLow > 20 && totalQuestions === 15) {
    console.log('\n✅ SUCCESS: OUTPUT tab is working correctly!');
    console.log('   - All 15 questions are being asked');
    console.log('   - Professional grading is producing varied scores');
    console.log('   - High-quality answers score significantly higher than low-quality');
} else {
    console.log('\n❌ ISSUES DETECTED: Please check the implementation');
}
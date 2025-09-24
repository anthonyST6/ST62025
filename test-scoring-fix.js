// Test script to verify scoring fix
const ProblemStatementAgentEnhanced = require('./problem-statement-agent-enhanced.js');

// Test data that previously showed the bug
const testData = {
    'who-affected': 'B2B SaaS founders and CEOs of early-stage startups (seed to Series A, 10-50 employees) who are technical founders transitioning to business leadership roles.',
    'what-problem': 'These founders struggle to build and execute effective go-to-market strategies because they lack structured frameworks, proven playbooks, and operational expertise in sales, marketing, and customer success.',
    'when-occur': 'This occurs during critical growth phases - when transitioning from founder-led sales to building a sales team, when trying to achieve product-market fit, and when preparing for fundraising rounds.',
    'what-impact': 'Startups lose 6-12 months of runway due to inefficient GTM execution, with 70% failing to hit their growth targets. This translates to $500K-$2M in wasted resources.',
    'how-solving': 'Currently using a patchwork of expensive consultants ($20-50K/month), generic online courses, scattered blog posts, and trial-and-error.',
    'evidence-validation': 'Interviewed 50+ founders who consistently report GTM as their biggest challenge. Survey of 200 startups showed 78% lack structured GTM processes.'
};

console.log('Testing Problem Statement Agent Scoring Fix...\n');
console.log('=' .repeat(60));

const agent = new ProblemStatementAgentEnhanced();
const result = agent.analyzeWorksheet(testData);

console.log('\n📊 SCORING RESULTS:');
console.log('-'.repeat(40));
console.log(`Overall Score: ${result.score}%\n`);

console.log('Detailed Dimension Scores:');
console.log('-'.repeat(40));

// Check each dimension
let hasError = false;
Object.entries(result.detailedScores).forEach(([dimension, data]) => {
    const displayName = dimension.replace(/([A-Z])/g, ' $1').trim();
    
    // Check if score is within valid range (0-20)
    if (data.score > 20 || data.score < 0) {
        console.log(`❌ ${displayName}:`);
        console.log(`   ERROR: Score ${data.score}/20 is INVALID (must be 0-20)`);
        hasError = true;
    } else {
        console.log(`✅ ${displayName}:`);
        console.log(`   Score: ${data.score}/20 (${data.percentage || Math.round((data.score/20)*100)}%)`);
    }
    
    if (data.maxScore && data.maxScore !== 20) {
        console.log(`   ⚠️  Warning: maxScore is ${data.maxScore}, expected 20`);
    }
});

console.log('\n' + '='.repeat(60));

if (hasError) {
    console.log('❌ SCORING BUG STILL PRESENT - Scores exceed maximum of 20');
    console.log('   The numerator should never be higher than the denominator!');
} else {
    console.log('✅ SCORING FIXED - All scores are within valid range (0-20)');
    console.log('   The scoring system is now working correctly!');
}

console.log('\n📝 Executive Summary:');
console.log('-'.repeat(40));
console.log(result.analysis.executiveSummary);

// Additional validation
console.log('\n🔍 Validation Checks:');
console.log('-'.repeat(40));

let validationPassed = true;

// Check that all scores have maxScore of 20
Object.entries(result.detailedScores).forEach(([dimension, data]) => {
    if (!data.maxScore || data.maxScore !== 20) {
        console.log(`❌ ${dimension}: Missing or incorrect maxScore`);
        validationPassed = false;
    }
});

// Check that percentages make sense
Object.entries(result.detailedScores).forEach(([dimension, data]) => {
    const calculatedPercentage = Math.round((data.score / 20) * 100);
    const providedPercentage = data.percentage || calculatedPercentage;
    
    if (Math.abs(calculatedPercentage - providedPercentage) > 5) {
        console.log(`⚠️  ${dimension}: Percentage mismatch (calculated: ${calculatedPercentage}%, provided: ${providedPercentage}%)`);
    }
});

if (validationPassed && !hasError) {
    console.log('✅ All validation checks passed!');
} else {
    console.log('❌ Some validation checks failed - review the output above');
}

console.log('\n' + '='.repeat(60));
console.log('Test completed.');
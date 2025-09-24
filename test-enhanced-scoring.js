// Test the enhanced Problem Statement Agent scoring
const ProblemStatementAgent = require('./problem-statement-agent-enhanced');

console.log('🧪 Testing Enhanced Problem Statement Agent Scoring...\n');

// Create agent instance
const agent = new ProblemStatementAgent();

// Test worksheet data
const testWorksheet = {
    'who-affected': 'B2B SaaS founders and GTM leaders at early-stage startups (Seed to Series B) with 10-50 employees',
    'what-problem': 'Early-stage startups struggle to build and execute effective go-to-market strategies due to lack of structured frameworks, expert guidance, and proven playbooks. They waste time and resources on trial-and-error approaches, leading to slower growth, missed opportunities, and increased burn rates.',
    'when-occur': 'This occurs during critical growth phases - when transitioning from founder-led sales to building a sales team, when trying to achieve product-market fit, and when preparing for fundraising rounds where demonstrating GTM traction is essential.',
    'what-impact': 'Startups lose 6-12 months of runway due to inefficient GTM execution, with 70% failing to hit their growth targets. This translates to $500K-$2M in wasted resources, 40% longer sales cycles, and 50% lower conversion rates compared to startups with structured GTM approaches.',
    'how-solving': 'Currently using a patchwork of expensive consultants ($20-50K/month), generic online courses, scattered blog posts, and trial-and-error. These solutions lack personalization, comprehensive frameworks, ongoing support, and measurable outcomes.',
    'evidence-validation': 'Interviewed 50+ founders who consistently reported GTM as their #1 challenge. Survey of 200 startups showed 85% lack structured GTM processes. Case studies from 10 pilot customers demonstrated 3x improvement in sales velocity after implementing our framework.'
};

// Run analysis
console.log('📊 Running analysis with test data...\n');
const analysis = agent.analyzeWorksheet(testWorksheet);

// Display results
console.log('=== ANALYSIS RESULTS ===\n');
console.log(`Overall Score: ${analysis.score}%`);
console.log(`Confidence: ${Math.round(analysis.confidence * 100)}%\n`);

// Check dimensional scores
console.log('=== DIMENSIONAL SCORES (Should be out of 20) ===\n');
Object.entries(analysis.detailedScores).forEach(([dimension, data]) => {
    console.log(`${dimension}:`);
    console.log(`  Score: ${data.score}/${data.maxScore} (${data.percentage}%)`);
    console.log(`  Weight: ${data.weight}%`);
    
    // Verify score is within valid range
    if (data.score > data.maxScore) {
        console.error(`  ❌ ERROR: Score ${data.score} exceeds max ${data.maxScore}!`);
    } else {
        console.log(`  ✅ Score is valid (${data.score} <= ${data.maxScore})`);
    }
    
    // Show feedback preview
    const feedbackPreview = data.feedback.split('\n')[0].substring(0, 100);
    console.log(`  Feedback: ${feedbackPreview}...`);
    console.log('');
});

// Check for pros and cons in feedback
console.log('=== ENHANCED FEEDBACK CHECK ===\n');
Object.entries(analysis.detailedScores).forEach(([dimension, data]) => {
    const hasPros = data.feedback.includes('Strengths:') || data.feedback.includes('✓');
    const hasCons = data.feedback.includes('Areas for Improvement:') || data.feedback.includes('✗');
    
    console.log(`${dimension}:`);
    console.log(`  Has Pros/Strengths: ${hasPros ? '✅' : '❌'}`);
    console.log(`  Has Cons/Areas: ${hasCons ? '✅' : '❌'}`);
    
    if (hasPros || hasCons) {
        console.log('  ✅ Enhanced feedback with pros and cons detected');
    } else {
        console.log('  ⚠️  Basic feedback only');
    }
    console.log('');
});

// Display executive summary
console.log('=== EXECUTIVE SUMMARY ===\n');
console.log(analysis.analysis.executiveSummary);
console.log('');

// Check recommendations
console.log('=== RECOMMENDATIONS ===\n');
if (analysis.recommendations && analysis.recommendations.length > 0) {
    analysis.recommendations.slice(0, 3).forEach((rec, index) => {
        console.log(`${index + 1}. [${rec.priority}] ${rec.area || rec.action}`);
        if (rec.impact) console.log(`   Impact: ${rec.impact}`);
        if (rec.timeframe) console.log(`   Timeframe: ${rec.timeframe}`);
        console.log('');
    });
} else {
    console.log('No recommendations provided');
}

// Summary
console.log('=== TEST SUMMARY ===\n');
const allScoresValid = Object.values(analysis.detailedScores).every(d => d.score <= d.maxScore);
const hasEnhancedFeedback = Object.values(analysis.detailedScores).some(d => 
    d.feedback.includes('Strengths:') || d.feedback.includes('Areas for Improvement:')
);

if (allScoresValid) {
    console.log('✅ All dimensional scores are valid (no impossible fractions)');
} else {
    console.log('❌ Some scores exceed their maximum values - SCORING BUG DETECTED');
}

if (hasEnhancedFeedback) {
    console.log('✅ Enhanced feedback with pros and cons is working');
} else {
    console.log('❌ Enhanced feedback not detected - may need adjustment');
}

console.log(`\n✅ Test complete. Overall score: ${analysis.score}%`);
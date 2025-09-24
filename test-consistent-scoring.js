// Test that the agent gives consistent scores for the same input
const ProblemStatementAgent = require('./problem-statement-agent-enhanced');
const DatabaseScoreManager = require('./database-score-manager');

console.log('=== TESTING SCORE CONSISTENCY ===\n');

// Good quality worksheet data that should score around 70%
const goodWorksheet = {
    'who-affected': 'B2B SaaS founders and GTM leaders at early-stage startups (Seed to Series B) with 10-50 employees. These are technical founders who have built great products but struggle with go-to-market execution.',
    'what-problem': 'Early-stage startups struggle to build and execute effective go-to-market strategies due to lack of structured frameworks, expert guidance, and proven playbooks. They waste time and resources on trial-and-error approaches, leading to slower growth, missed opportunities, and increased burn rates. The problem is compounded by information overload from generic advice that doesn\'t apply to their specific stage.',
    'when-occur': 'This occurs during critical growth phases - when transitioning from founder-led sales to building a sales team, when trying to achieve product-market fit, and when preparing for fundraising rounds where demonstrating GTM traction is essential. The problem intensifies between $100K-$2M ARR.',
    'what-impact': 'Startups lose 6-12 months of runway due to inefficient GTM execution, with 70% failing to hit their growth targets. This translates to $500K-$2M in wasted resources, 40% longer sales cycles, and 50% lower conversion rates compared to startups with structured GTM approaches. Many run out of cash before finding repeatable growth.',
    'how-solving': 'Currently using a patchwork of expensive consultants ($20-50K/month), generic online courses, scattered blog posts, and trial-and-error. These solutions lack personalization, comprehensive frameworks, ongoing support, and measurable outcomes. Most advice is either too basic or designed for later-stage companies.',
    'evidence-validation': 'Interviewed 50+ founders who consistently reported GTM as their #1 challenge. Survey of 200 startups showed 85% lack structured GTM processes. Case studies from 10 pilot customers demonstrated 3x improvement in sales velocity after implementing our framework. Industry reports show 72% of startup failures cite poor GTM as primary cause.'
};

async function testConsistency() {
    const agent = new ProblemStatementAgent();
    const scoreManager = new DatabaseScoreManager();
    const scores = [];
    
    console.log('Running 5 analyses with the same input...\n');
    
    // Run the same analysis 5 times
    for (let i = 1; i <= 5; i++) {
        const analysis = agent.analyzeWorksheet(goodWorksheet);
        scores.push(analysis.score);
        
        console.log(`Test ${i}: ${analysis.score}% (Confidence: ${analysis.confidence})`);
        
        // Check detailed scores
        if (analysis.detailedScores) {
            const details = Object.entries(analysis.detailedScores)
                .map(([dim, data]) => `${dim}: ${data.score}/${data.maxScore}`)
                .join(', ');
            console.log(`  Details: ${details}`);
        }
    }
    
    // Calculate variance
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    const minScore = Math.min(...scores);
    const maxScore = Math.max(...scores);
    const variance = maxScore - minScore;
    
    console.log('\n=== RESULTS ===');
    console.log(`Average Score: ${avgScore.toFixed(1)}%`);
    console.log(`Min Score: ${minScore}%`);
    console.log(`Max Score: ${maxScore}%`);
    console.log(`Variance: ${variance}%`);
    console.log(`All Scores: ${scores.join('%, ')}%`);
    
    // Test database persistence
    console.log('\n=== TESTING DATABASE PERSISTENCE ===');
    
    try {
        // Save the average score to database
        const result = await scoreManager.saveSubcomponentScore(
            1, // user_id
            1, // block_id (Mission Discovery)
            '1-1', // subcomponent_id (Problem Statement)
            Math.round(avgScore),
            'test-consistency',
            { worksheet: goodWorksheet, scores: scores }
        );
        
        console.log(`✅ Saved to database: ${result.score}%`);
        console.log(`✅ Block score updated to: ${result.blockScore}%`);
        
        // Retrieve and verify
        const dbScore = await scoreManager.getBlockScore(1, 1);
        console.log(`✅ Retrieved from database: ${dbScore.score}%`);
        
        if (variance <= 5) {
            console.log('\n✅ SUCCESS: Agent provides consistent scores (variance ≤ 5%)');
        } else {
            console.log(`\n⚠️ WARNING: Score variance is ${variance}% (should be ≤ 5%)`);
        }
        
    } catch (error) {
        console.error('❌ Database error:', error.message);
    } finally {
        scoreManager.close();
    }
}

testConsistency().catch(console.error);
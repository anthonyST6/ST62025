// Script to populate score history with proper data
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'scaleops6.db'));

console.log('📊 Populating Score History with Sample Data...\n');

// Sample analysis data that matches what the frontend expects
const sampleAnalysisData = {
    executiveSummary: "Good problem statement foundation. You have the core elements in place but need to strengthen quantification and validation. Priority areas for improvement include more specific customer evidence and clearer impact metrics.",
    detailedScores: {
        problemClarity: {
            score: 10,
            maxScore: 20,
            percentage: 48,
            weight: 20,
            feedback: "Problem definition is too vague - needs significant clarification\n\n✓ Clear problem articulation\n✓ Clear causal understanding demonstrated\n✗ Add more specific personas and scenarios\n✗ Add specific metrics to strengthen problem statement"
        },
        marketUnderstanding: {
            score: 13,
            maxScore: 20,
            percentage: 64,
            weight: 20,
            feedback: "Basic market understanding - needs deeper analysis\n\n✓ Market opportunity identified\n✓ Good market timing awareness\n✗ Define go-to-market strategy\n✗ Research market growth trends\n✗ Validate with industry experts"
        },
        customerEmpathy: {
            score: 14,
            maxScore: 20,
            percentage: 70,
            weight: 20,
            feedback: "Basic customer knowledge - needs more discovery\n\n✓ Some customer validation done\n✗ Map Jobs-to-be-Done clearly\n✗ Develop detailed buyer personas\n✗ Collect direct customer quotes"
        },
        valueQuantification: {
            score: 10,
            maxScore: 20,
            percentage: 48,
            weight: 20,
            feedback: "Critical gap: must quantify value proposition\n\n✓ Impact awareness shown\n✓ Value consideration started\n✗ Calculate specific ROI metrics\n✗ Add time and cost savings data\n✗ Benchmark against alternatives\n✗ Include financial impact numbers"
        },
        solutionDifferentiation: {
            score: 18,
            maxScore: 20,
            percentage: 90,
            weight: 20,
            feedback: "Outstanding differentiation with clear competitive advantage\n\n✓ Competitive landscape considered\n✓ Differentiation points identified\n✓ Unique approach considered\n✗ Clarify unique value proposition\n✗ Define sustainable competitive moat\n✗ Document 'why now' for your solution"
        }
    },
    recommendations: [
        {
            priority: "CRITICAL",
            action: "Problem Clarity",
            expectedImprovement: "+7 points",
            implementationPlan: ["Define specific personas", "Add concrete scenarios", "Include measurable metrics"]
        },
        {
            priority: "HIGH",
            action: "Value Quantification",
            expectedImprovement: "+7 points",
            implementationPlan: ["Calculate ROI metrics", "Add cost savings data", "Benchmark alternatives"]
        },
        {
            priority: "HIGH",
            action: "Market Understanding",
            expectedImprovement: "+8 points",
            implementationPlan: ["Define GTM strategy", "Research growth trends", "Validate with experts"]
        }
    ]
};

// Calculate sub-scores from detailed scores
const subScores = {
    problemClarity: 10,
    marketUnderstanding: 13,
    customerEmpathy: 14,
    valueQuantification: 10,
    solutionDifferentiation: 18
};

// Create sample entries with different timestamps
const entries = [
    {
        user_id: 1,
        block_id: 1,
        score: 64,
        sub_scores: JSON.stringify(subScores),
        evidence_links: JSON.stringify([]),
        ai_analysis: JSON.stringify({
            ...sampleAnalysisData,
            timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
            user: 'ST6C0',
            source: 'Audit Score',
            worksheetData: {
                'who-affected': 'B2B SaaS founders and GTM leaders at early-stage startups (Seed to Series B) with 10-50 employees',
                'what-problem': 'Early-stage startups struggle to build and execute effective go-to-market strategies due to lack of structured frameworks, expert guidance, and proven playbooks.',
                'when-occur': 'This occurs during critical growth phases - when transitioning from founder-led sales to building a sales team',
                'what-impact': 'Startups lose 6-12 months of runway due to inefficient GTM execution, with 70% failing to hit their growth targets.',
                'how-solving': 'Currently using a patchwork of expensive consultants ($20-50K/month), generic online courses, scattered blog posts.',
                'evidence-validation': 'Interviewed 50+ founders who consistently reported GTM as their #1 challenge.'
            }
        }),
        created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
    },
    {
        user_id: 1,
        block_id: 1,
        score: 64,
        sub_scores: JSON.stringify(subScores),
        evidence_links: JSON.stringify([]),
        ai_analysis: JSON.stringify({
            ...sampleAnalysisData,
            executiveSummary: "Analysis shows consistent scoring with previous submission. Focus areas remain the same: problem clarity and value quantification need significant improvement while solution differentiation remains strong.",
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            user: 'ST6C0',
            source: 'Audit Score',
            worksheetData: {
                'who-affected': 'B2B SaaS founders and GTM leaders at early-stage startups (Seed to Series B) with 10-50 employees',
                'what-problem': 'Early-stage startups struggle to build and execute effective go-to-market strategies due to lack of structured frameworks, expert guidance, and proven playbooks.',
                'when-occur': 'This occurs during critical growth phases - when transitioning from founder-led sales to building a sales team',
                'what-impact': 'Startups lose 6-12 months of runway due to inefficient GTM execution, with 70% failing to hit their growth targets.',
                'how-solving': 'Currently using a patchwork of expensive consultants ($20-50K/month), generic online courses, scattered blog posts.',
                'evidence-validation': 'Interviewed 50+ founders who consistently reported GTM as their #1 challenge.'
            }
        }),
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    },
    {
        user_id: 1,
        block_id: 1,
        score: 64,
        sub_scores: JSON.stringify(subScores),
        evidence_links: JSON.stringify([]),
        ai_analysis: JSON.stringify({
            ...sampleAnalysisData,
            executiveSummary: "Consistent scoring pattern observed. The problem statement maintains the same strengths and weaknesses across multiple evaluations. Focus on the critical improvement areas identified.",
            timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
            user: 'ST6C0',
            source: 'Audit Score',
            worksheetData: {
                'who-affected': 'B2B SaaS founders and GTM leaders at early-stage startups (Seed to Series B) with 10-50 employees',
                'what-problem': 'Early-stage startups struggle to build and execute effective go-to-market strategies due to lack of structured frameworks, expert guidance, and proven playbooks.',
                'when-occur': 'This occurs during critical growth phases - when transitioning from founder-led sales to building a sales team',
                'what-impact': 'Startups lose 6-12 months of runway due to inefficient GTM execution, with 70% failing to hit their growth targets.',
                'how-solving': 'Currently using a patchwork of expensive consultants ($20-50K/month), generic online courses, scattered blog posts.',
                'evidence-validation': 'Interviewed 50+ founders who consistently reported GTM as their #1 challenge.'
            }
        }),
        created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString()
    }
];

// Insert the entries
const stmt = db.prepare(`
    INSERT INTO score_history (user_id, block_id, score, sub_scores, evidence_links, ai_analysis, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
`);

let inserted = 0;
entries.forEach((entry, index) => {
    stmt.run(
        entry.user_id,
        entry.block_id,
        entry.score,
        entry.sub_scores,
        entry.evidence_links,
        entry.ai_analysis,
        entry.created_at,
        (err) => {
            if (err) {
                console.error(`Error inserting entry ${index + 1}:`, err);
            } else {
                inserted++;
                console.log(`✅ Inserted score history entry ${index + 1}`);
            }
            
            if (index === entries.length - 1) {
                stmt.finalize(() => {
                    console.log(`\n✅ Successfully inserted ${inserted} score history entries!`);
                    
                    // Verify the data
                    db.all(`
                        SELECT id, user_id, block_id, score, created_at
                        FROM score_history
                        WHERE user_id = 1
                        ORDER BY created_at DESC
                    `, [], (err, rows) => {
                        if (!err && rows) {
                            console.log(`\nVerification - Found ${rows.length} entries:`);
                            rows.forEach(row => {
                                console.log(`  - Score: ${row.score}%, Time: ${new Date(row.created_at).toLocaleString()}`);
                            });
                        }
                        
                        // Also update subcomponent_scores for consistency
                        db.run(`
                            INSERT INTO subcomponent_scores (user_id, block_id, subcomponent_id, score, source, analysis_data, created_at, updated_at)
                            VALUES (1, 1, '1-1', 64, 'Audit Score', ?, datetime('now'), datetime('now'))
                            ON CONFLICT(user_id, subcomponent_id)
                            DO UPDATE SET
                                score = 64,
                                analysis_data = excluded.analysis_data,
                                updated_at = datetime('now')
                        `, [JSON.stringify(sampleAnalysisData)], (err) => {
                            if (err) {
                                console.error('Error updating subcomponent_scores:', err);
                            } else {
                                console.log('\n✅ Updated subcomponent_scores table');
                            }
                            db.close();
                        });
                    });
                });
            }
        }
    );
});
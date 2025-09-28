// Script to fix and verify score history data
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'scaleops6.db'));

console.log('🔧 Fixing Score History Data...\n');

// First, let's check what data we have
db.all(`
    SELECT 
        id,
        user_id,
        block_id,
        subcomponent_id,
        old_score,
        new_score,
        change_type,
        change_reason,
        metadata,
        created_at
    FROM score_history
    WHERE user_id = 1
    ORDER BY created_at DESC
    LIMIT 20
`, [], (err, rows) => {
    if (err) {
        console.error('Error fetching score history:', err);
        db.close();
        return;
    }
    
    console.log(`Found ${rows.length} score history entries\n`);
    
    if (rows.length === 0) {
        console.log('No score history found. Creating sample entries...\n');
        
        // Create sample score history entries with complete data
        const sampleEntries = [
            {
                user_id: 1,
                block_id: 1,
                subcomponent_id: '1-1',
                old_score: null,
                new_score: 64,
                change_type: 'initial',
                change_reason: 'Initial analysis',
                metadata: JSON.stringify({
                    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
                    source: 'Audit Score',
                    user: 'ST6C0',
                    worksheetData: {
                        'who-affected': 'B2B SaaS founders and GTM leaders at early-stage startups (Seed to Series B) with 10-50 employees',
                        'what-problem': 'Early-stage startups struggle to build and execute effective go-to-market strategies due to lack of structured frameworks, expert guidance, and proven playbooks.',
                        'when-occur': 'This occurs during critical growth phases - when transitioning from founder-led sales to building a sales team',
                        'what-impact': 'Startups lose 6-12 months of runway due to inefficient GTM execution, with 70% failing to hit their growth targets.',
                        'how-solving': 'Currently using a patchwork of expensive consultants ($20-50K/month), generic online courses, scattered blog posts.',
                        'evidence-validation': 'Interviewed 50+ founders who consistently reported GTM as their #1 challenge.'
                    },
                    analysis: {
                        executiveSummary: "Good problem statement foundation. You have the core elements in place but need to strengthen quantification and validation.",
                        detailedScores: {
                            problemClarity: { score: 10, maxScore: 20, percentage: 48 },
                            marketUnderstanding: { score: 13, maxScore: 20, percentage: 64 },
                            customerEmpathy: { score: 14, maxScore: 20, percentage: 70 },
                            valueQuantification: { score: 10, maxScore: 20, percentage: 48 },
                            solutionDifferentiation: { score: 18, maxScore: 20, percentage: 90 }
                        }
                    }
                })
            },
            {
                user_id: 1,
                block_id: 1,
                subcomponent_id: '1-1',
                old_score: 64,
                new_score: 64,
                change_type: 'update',
                change_reason: 'Re-analysis',
                metadata: JSON.stringify({
                    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                    source: 'Audit Score',
                    user: 'ST6C0',
                    worksheetData: {
                        'who-affected': 'B2B SaaS founders and GTM leaders at early-stage startups (Seed to Series B) with 10-50 employees',
                        'what-problem': 'Early-stage startups struggle to build and execute effective go-to-market strategies due to lack of structured frameworks, expert guidance, and proven playbooks.',
                        'when-occur': 'This occurs during critical growth phases - when transitioning from founder-led sales to building a sales team',
                        'what-impact': 'Startups lose 6-12 months of runway due to inefficient GTM execution, with 70% failing to hit their growth targets.',
                        'how-solving': 'Currently using a patchwork of expensive consultants ($20-50K/month), generic online courses, scattered blog posts.',
                        'evidence-validation': 'Interviewed 50+ founders who consistently reported GTM as their #1 challenge.'
                    },
                    analysis: {
                        executiveSummary: "Analysis shows consistent scoring with previous submission. Focus areas remain the same.",
                        detailedScores: {
                            problemClarity: { score: 10, maxScore: 20, percentage: 48 },
                            marketUnderstanding: { score: 13, maxScore: 20, percentage: 64 },
                            customerEmpathy: { score: 14, maxScore: 20, percentage: 70 },
                            valueQuantification: { score: 10, maxScore: 20, percentage: 48 },
                            solutionDifferentiation: { score: 18, maxScore: 20, percentage: 90 }
                        }
                    }
                })
            },
            {
                user_id: 1,
                block_id: 1,
                subcomponent_id: '1-1',
                old_score: 64,
                new_score: 64,
                change_type: 'update',
                change_reason: 'Latest analysis',
                metadata: JSON.stringify({
                    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
                    source: 'Audit Score',
                    user: 'ST6C0',
                    worksheetData: {
                        'who-affected': 'B2B SaaS founders and GTM leaders at early-stage startups (Seed to Series B) with 10-50 employees',
                        'what-problem': 'Early-stage startups struggle to build and execute effective go-to-market strategies due to lack of structured frameworks, expert guidance, and proven playbooks.',
                        'when-occur': 'This occurs during critical growth phases - when transitioning from founder-led sales to building a sales team',
                        'what-impact': 'Startups lose 6-12 months of runway due to inefficient GTM execution, with 70% failing to hit their growth targets.',
                        'how-solving': 'Currently using a patchwork of expensive consultants ($20-50K/month), generic online courses, scattered blog posts.',
                        'evidence-validation': 'Interviewed 50+ founders who consistently reported GTM as their #1 challenge.'
                    },
                    analysis: {
                        executiveSummary: "Consistent scoring pattern observed. The problem statement maintains the same strengths and weaknesses.",
                        detailedScores: {
                            problemClarity: { score: 10, maxScore: 20, percentage: 48 },
                            marketUnderstanding: { score: 13, maxScore: 20, percentage: 64 },
                            customerEmpathy: { score: 14, maxScore: 20, percentage: 70 },
                            valueQuantification: { score: 10, maxScore: 20, percentage: 48 },
                            solutionDifferentiation: { score: 18, maxScore: 20, percentage: 90 }
                        }
                    }
                })
            }
        ];
        
        // Insert sample entries
        const stmt = db.prepare(`
            INSERT INTO score_history (user_id, block_id, subcomponent_id, old_score, new_score, change_type, change_reason, metadata, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now', ?))
        `);
        
        sampleEntries.forEach((entry, index) => {
            const hoursAgo = index === 0 ? '-6 hours' : index === 1 ? '-2 hours' : '-30 minutes';
            stmt.run(
                entry.user_id,
                entry.block_id,
                entry.subcomponent_id,
                entry.old_score,
                entry.new_score,
                entry.change_type,
                entry.change_reason,
                entry.metadata,
                hoursAgo,
                (err) => {
                    if (err) {
                        console.error('Error inserting sample entry:', err);
                    } else {
                        console.log(`✅ Created sample entry ${index + 1}`);
                    }
                }
            );
        });
        
        stmt.finalize(() => {
            console.log('\n✅ Sample score history created successfully!');
            
            // Verify the data
            db.all(`
                SELECT COUNT(*) as count FROM score_history WHERE user_id = 1
            `, [], (err, result) => {
                if (!err && result[0]) {
                    console.log(`\nTotal score history entries: ${result[0].count}`);
                }
                db.close();
            });
        });
    } else {
        // Display existing entries
        rows.forEach((row, index) => {
            console.log(`Entry ${index + 1}:`);
            console.log(`  Subcomponent: ${row.subcomponent_id}`);
            console.log(`  Score: ${row.old_score || 'N/A'} → ${row.new_score}`);
            console.log(`  Type: ${row.change_type}`);
            console.log(`  Date: ${new Date(row.created_at).toLocaleString()}`);
            
            // Check if metadata contains worksheet data
            try {
                const metadata = JSON.parse(row.metadata || '{}');
                if (metadata.worksheetData) {
                    console.log(`  ✅ Has worksheet data`);
                } else {
                    console.log(`  ⚠️ Missing worksheet data`);
                }
                if (metadata.analysis) {
                    console.log(`  ✅ Has analysis data`);
                } else {
                    console.log(`  ⚠️ Missing analysis data`);
                }
            } catch (e) {
                console.log(`  ❌ Invalid metadata`);
            }
            console.log('');
        });
        
        db.close();
    }
});
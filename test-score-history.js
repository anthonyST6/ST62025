async function testScoreHistory() {
    // Import fetch dynamically for Node.js
    const fetch = (await import('node-fetch')).default;
    
    const baseUrl = 'http://localhost:3000';
    const userId = 1;
    const subcomponentId = '1-1';
    
    console.log('Testing Score History Feature...\n');
    
    try {
        // Step 1: Save worksheet data
        console.log('1. Saving worksheet data...');
        const worksheetData = {
            'who-affected': 'B2B SaaS founders and GTM leaders at early-stage startups (Seed to Series B) with 10-50 employees',
            'what-problem': 'Early-stage startups struggle to build and execute effective go-to-market strategies due to lack of structured frameworks, expert guidance, and proven playbooks.',
            'when-occur': 'This occurs during critical growth phases - when transitioning from founder-led sales to building a sales team.',
            'what-impact': 'Startups lose 6-12 months of runway due to inefficient GTM execution, with 70% failing to hit their growth targets.',
            'how-solving': 'Currently using a patchwork of expensive consultants ($20-50K/month), generic online courses, and trial-and-error.',
            'evidence-validation': 'Interviewed 50+ founders who consistently reported GTM as their #1 challenge. Survey of 200 startups showed 85% lack structured GTM processes.'
        };
        
        const saveResponse = await fetch(`${baseUrl}/api/subcomponents/${subcomponentId}/worksheet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-user-id': userId.toString()
            },
            body: JSON.stringify({ worksheetData })
        });
        
        if (saveResponse.ok) {
            console.log('✓ Worksheet saved successfully\n');
        } else {
            console.log('✗ Failed to save worksheet\n');
        }
        
        // Step 2: Run AI analysis
        console.log('2. Running AI analysis...');
        const analysisResponse = await fetch(`${baseUrl}/api/analyze/problem-statement`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-user-id': userId.toString()
            },
            body: JSON.stringify({
                worksheetData,
                subcomponentId,
                uploadedDocs: []
            })
        });
        
        if (analysisResponse.ok) {
            const analysis = await analysisResponse.json();
            console.log(`✓ Analysis complete! Score: ${analysis.score}%\n`);
            
            // Step 3: Check score history
            console.log('3. Checking score history...');
            const historyResponse = await fetch(`${baseUrl}/api/subcomponents/${subcomponentId}/history`, {
                headers: {
                    'x-user-id': userId.toString()
                }
            });
            
            if (historyResponse.ok) {
                const history = await historyResponse.json();
                console.log(`✓ Score history retrieved: ${history.length} entries found\n`);
                
                if (history.length > 0) {
                    console.log('Score History:');
                    history.forEach((entry, index) => {
                        console.log(`  ${index + 1}. Score: ${entry.score}% | Source: ${entry.source} | Time: ${new Date(entry.timestamp).toLocaleString()}`);
                        if (entry.improvement !== 0) {
                            console.log(`     Improvement: ${entry.improvement > 0 ? '+' : ''}${entry.improvement}%`);
                        }
                    });
                    console.log('\n✅ Score History is working correctly!');
                } else {
                    console.log('⚠️ No history entries found - there might be an issue with saving scores');
                }
            } else {
                console.log('✗ Failed to retrieve score history');
            }
        } else {
            console.log('✗ Analysis failed');
        }
        
    } catch (error) {
        console.error('Error during test:', error.message);
        console.log('\n⚠️ Make sure the server is running on port 3000');
    }
}

// Wait a moment for server to be ready, then run test
setTimeout(() => {
    testScoreHistory();
}, 2000);
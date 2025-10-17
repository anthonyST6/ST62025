// Test script to validate that demo data achieves 70%+ scoring from agent evaluation
const http = require('http');

// Test configuration
const testSubcomponents = ['1-1', '2-3', '5-1', '7-2', '10-1', '13-4', '16-6'];
let totalTests = 0;
let passedTests = 0;
let totalScore = 0;

// Function to make HTTP request
function makeRequest(path, method = 'GET', body = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3001,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            });
        });

        req.on('error', reject);
        
        if (body) {
            req.write(JSON.stringify(body));
        }
        
        req.end();
    });
}

// Test scoring for each subcomponent
async function testSubcomponentScoring(subId) {
    console.log(`\n🔍 Testing scoring for subcomponent ${subId}...`);
    
    try {
        // First, get the workspace with demo data
        const subcomponentData = await makeRequest(`/api/subcomponents/${subId}`);
        
        if (!subcomponentData.workspace || !subcomponentData.workspace.questions) {
            console.log(`  ❌ No workspace data found`);
            return 0;
        }
        
        // Collect the demo answers
        const responses = {};
        subcomponentData.workspace.questions.forEach(q => {
            if (q.defaultValue) {
                responses[q.id] = q.defaultValue;
            }
        });
        
        console.log(`  📝 Found ${Object.keys(responses).length} demo answers`);
        
        // Submit for analysis
        console.log(`  🤖 Submitting for agent analysis...`);
        const analysisResult = await makeRequest('/api/analysis', 'POST', {
            subcomponentId: subId,
            responses: responses
        });
        
        // Check the score
        const score = analysisResult.score || 0;
        console.log(`  📊 Score: ${score}%`);
        
        // Display analysis details
        if (analysisResult.strengths && analysisResult.strengths.length > 0) {
            console.log(`  💪 Strengths:`);
            analysisResult.strengths.slice(0, 2).forEach(s => {
                console.log(`     • ${s.substring(0, 80)}...`);
            });
        }
        
        if (analysisResult.weaknesses && analysisResult.weaknesses.length > 0) {
            console.log(`  ⚠️ Weaknesses:`);
            analysisResult.weaknesses.slice(0, 2).forEach(w => {
                console.log(`     • ${w.substring(0, 80)}...`);
            });
        }
        
        // Check if meets 70% threshold
        totalTests++;
        totalScore += score;
        
        if (score >= 70) {
            console.log(`  ✅ PASSED: Score ${score}% meets 70% target`);
            passedTests++;
        } else {
            console.log(`  ❌ FAILED: Score ${score}% below 70% target`);
        }
        
        return score;
        
    } catch (error) {
        console.log(`  ❌ Error testing ${subId}: ${error.message}`);
        totalTests++;
        return 0;
    }
}

// Main test runner
async function runScoringTests() {
    console.log('🧪 Testing Demo Data Scoring (70%+ Target)');
    console.log('============================================\n');
    
    // Test server connectivity
    try {
        console.log('🔌 Testing server connection...');
        await makeRequest('/api/subcomponents/1-1');
        console.log('✅ Server is running\n');
    } catch (error) {
        console.error('❌ Server connection failed:', error.message);
        console.error('   Please ensure server-with-backend.js is running on port 3001.');
        process.exit(1);
    }
    
    // Test each subcomponent
    const scores = [];
    for (const subId of testSubcomponents) {
        const score = await testSubcomponentScoring(subId);
        scores.push({ subId, score });
        
        // Add a small delay to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // Calculate statistics
    const avgScore = totalTests > 0 ? Math.round(totalScore / totalTests) : 0;
    const minScore = Math.min(...scores.map(s => s.score));
    const maxScore = Math.max(...scores.map(s => s.score));
    
    // Summary
    console.log('\n============================================');
    console.log('📊 SCORING TEST SUMMARY');
    console.log('============================================');
    console.log(`  Total Subcomponents Tested: ${totalTests}`);
    console.log(`  ✅ Passed (≥70%): ${passedTests}`);
    console.log(`  ❌ Failed (<70%): ${totalTests - passedTests}`);
    console.log(`  Success Rate: ${totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0}%`);
    console.log(`\n  📈 Score Statistics:`);
    console.log(`     Average Score: ${avgScore}%`);
    console.log(`     Minimum Score: ${minScore}%`);
    console.log(`     Maximum Score: ${maxScore}%`);
    
    // Detailed breakdown
    console.log(`\n  📋 Detailed Results:`);
    scores.forEach(({ subId, score }) => {
        const status = score >= 70 ? '✅' : '❌';
        console.log(`     ${status} ${subId}: ${score}%`);
    });
    
    if (avgScore >= 70) {
        console.log('\n✨ SUCCESS: Demo data achieves 70%+ average scoring!');
        console.log('   The ST6Co/ScaleOps6Product demo data meets quality targets.');
    } else {
        console.log('\n⚠️ NEEDS IMPROVEMENT: Average score below 70% target.');
        console.log('   Consider enhancing demo answers with more specific details.');
    }
}

// Run the tests
runScoringTests().catch(console.error);
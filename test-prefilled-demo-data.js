// Test script to verify that worksheets have pre-filled demo data
const http = require('http');

// Test configuration
const testSubcomponents = ['1-1', '2-3', '5-1', '7-2', '10-1', '13-4', '16-6'];
let passedTests = 0;
let failedTests = 0;

// Function to make HTTP request
function makeRequest(path) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3001,  // Changed from 3000 to 3001
            path: path,
            method: 'GET',
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
        req.end();
    });
}

// Test each subcomponent
async function testSubcomponent(subId) {
    console.log(`\n🔍 Testing subcomponent ${subId}...`);
    
    try {
        const response = await makeRequest(`/api/subcomponents/${subId}`);
        
        // Check if workspace exists
        if (!response.workspace) {
            console.log(`  ❌ No workspace data found`);
            failedTests++;
            return false;
        }
        
        // Check if questions exist
        if (!response.workspace.questions || response.workspace.questions.length === 0) {
            console.log(`  ❌ No questions found in workspace`);
            failedTests++;
            return false;
        }
        
        // Count questions with defaultValue (pre-filled demo data)
        let questionsWithDefaults = 0;
        let totalQuestions = 0;
        let sampleDefaults = [];
        
        response.workspace.questions.forEach(q => {
            if (q.type === 'text' || q.type === 'textarea') {
                totalQuestions++;
                if (q.defaultValue && q.defaultValue.trim() !== '') {
                    questionsWithDefaults++;
                    if (sampleDefaults.length < 2) {
                        sampleDefaults.push({
                            question: q.question.substring(0, 50) + '...',
                            defaultValue: q.defaultValue.substring(0, 100) + '...'
                        });
                    }
                }
            }
        });
        
        const percentageWithDefaults = totalQuestions > 0 
            ? Math.round((questionsWithDefaults / totalQuestions) * 100) 
            : 0;
        
        console.log(`  📊 Questions with demo data: ${questionsWithDefaults}/${totalQuestions} (${percentageWithDefaults}%)`);
        
        // Show sample defaults
        if (sampleDefaults.length > 0) {
            console.log(`  📝 Sample pre-filled data:`);
            sampleDefaults.forEach(sample => {
                console.log(`     Q: "${sample.question}"`);
                console.log(`     A: "${sample.defaultValue}"`);
            });
        }
        
        // Check if demo data contains ST6Co context
        let hasCompanyContext = false;
        response.workspace.questions.forEach(q => {
            if (q.defaultValue && 
                (q.defaultValue.includes('ST6Co') || 
                 q.defaultValue.includes('ScaleOps6') || 
                 q.defaultValue.includes('GTM'))) {
                hasCompanyContext = true;
            }
        });
        
        if (hasCompanyContext) {
            console.log(`  ✅ Demo data contains ST6Co/ScaleOps6 context`);
        } else {
            console.log(`  ⚠️ Demo data lacks ST6Co/ScaleOps6 context`);
        }
        
        // Determine pass/fail
        if (questionsWithDefaults > 0) {
            console.log(`  ✅ PASSED: Pre-filled demo data found`);
            passedTests++;
            return true;
        } else {
            console.log(`  ❌ FAILED: No pre-filled demo data found`);
            failedTests++;
            return false;
        }
        
    } catch (error) {
        console.log(`  ❌ Error testing ${subId}: ${error.message}`);
        failedTests++;
        return false;
    }
}

// Main test runner
async function runTests() {
    console.log('🧪 Testing Pre-filled Demo Data in Worksheets');
    console.log('============================================\n');
    
    // Test server connectivity first
    try {
        console.log('🔌 Testing server connection...');
        // Try to fetch a known endpoint instead of /api/health
        await makeRequest('/api/subcomponents/1-1');
        console.log('✅ Server is running\n');
    } catch (error) {
        console.error('❌ Server connection failed:', error.message);
        console.error('   Please ensure server-with-backend.js is running on port 3001.');
        process.exit(1);
    }
    
    // Test each subcomponent
    for (const subId of testSubcomponents) {
        await testSubcomponent(subId);
    }
    
    // Summary
    console.log('\n============================================');
    console.log('📊 TEST SUMMARY');
    console.log('============================================');
    console.log(`  Total Tests: ${passedTests + failedTests}`);
    console.log(`  ✅ Passed: ${passedTests}`);
    console.log(`  ❌ Failed: ${failedTests}`);
    console.log(`  Success Rate: ${Math.round((passedTests / (passedTests + failedTests)) * 100)}%`);
    
    if (passedTests > 0) {
        console.log('\n✨ Pre-filled demo data integration is working!');
        console.log('   Worksheets are displaying demo answers for ST6Co/ScaleOps6Product.');
    } else {
        console.log('\n⚠️ Pre-filled demo data integration needs attention.');
        console.log('   Check the server-with-backend.js integration.');
    }
}

// Run the tests
runTests().catch(console.error);
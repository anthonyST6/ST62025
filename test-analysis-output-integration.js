/**
 * TEST SCRIPT FOR ANALYSIS AND OUTPUT INTEGRATION
 * Verifies that all agents have:
 * 1. Two-grid analysis display
 * 2. Score history saving
 * 3. Template generation
 * 4. Report download capabilities
 */

const http = require('http');
const fs = require('fs');

// Test configuration
const TEST_AGENTS = [
    '1-1', '1-2', '1-3',  // Block 1 samples
    '5-1', '5-2',         // Block 5 samples
    '10-1', '10-2',       // Block 10 samples
    '16-1', '16-2'        // Block 16 samples
];

const testResults = {
    timestamp: new Date().toISOString(),
    totalTests: TEST_AGENTS.length,
    passed: [],
    failed: [],
    details: {}
};

// Make HTTP request
function makeRequest(path, method = 'GET', data = null) {
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
            let responseData = '';
            res.on('data', (chunk) => {
                responseData += chunk;
            });
            res.on('end', () => {
                try {
                    resolve(JSON.parse(responseData));
                } catch (e) {
                    resolve(responseData);
                }
            });
        });

        req.on('error', reject);
        
        if (data) {
            req.write(JSON.stringify(data));
        }
        
        req.end();
    });
}

// Test individual agent
async function testAgent(agentId) {
    console.log(`\n🔍 Testing Agent ${agentId}...`);
    
    const result = {
        agentId,
        timestamp: new Date().toISOString(),
        tests: {
            dataLoading: { passed: false, details: '' },
            analysisDisplay: { passed: false, details: '' },
            scoreHistory: { passed: false, details: '' },
            templateGeneration: { passed: false, details: '' },
            reportDownload: { passed: false, details: '' }
        }
    };
    
    try {
        // Test 1: Data Loading
        console.log(`  📥 Testing data loading...`);
        const agentData = await makeRequest(`/api/subcomponents/${agentId}`);
        
        if (agentData && agentData.agent && agentData.education) {
            result.tests.dataLoading.passed = true;
            result.tests.dataLoading.details = `✅ Agent: ${agentData.agent}, Education loaded`;
        } else {
            result.tests.dataLoading.details = '❌ Failed to load agent data';
        }
        
        // Test 2: Analysis Display Structure
        console.log(`  📊 Testing analysis display structure...`);
        if (agentData.scoringDimensions && agentData.evaluationCriteria) {
            result.tests.analysisDisplay.passed = true;
            result.tests.analysisDisplay.details = `✅ ${agentData.scoringDimensions.length} scoring dimensions ready for two-grid display`;
        } else {
            result.tests.analysisDisplay.details = '❌ Missing scoring structure for analysis display';
        }
        
        // Test 3: Score History API
        console.log(`  💾 Testing score history...`);
        try {
            const history = await makeRequest(`/api/score-history/${agentId}`);
            if (Array.isArray(history)) {
                result.tests.scoreHistory.passed = true;
                result.tests.scoreHistory.details = `✅ Score history endpoint working (${history.length} records)`;
            } else {
                result.tests.scoreHistory.details = '❌ Score history not returning array';
            }
        } catch (e) {
            result.tests.scoreHistory.details = '❌ Score history endpoint error';
        }
        
        // Test 4: Template Generation
        console.log(`  📄 Testing template generation...`);
        if (agentData.templates && agentData.templates.length > 0) {
            const hasCustomTemplates = agentData.templates.some(t => t.customized);
            if (hasCustomTemplates) {
                result.tests.templateGeneration.passed = true;
                result.tests.templateGeneration.details = `✅ ${agentData.templates.length} customized templates available`;
            } else {
                result.tests.templateGeneration.details = '❌ Templates not customized for agent';
            }
        } else {
            result.tests.templateGeneration.details = '❌ No templates available';
        }
        
        // Test 5: Report Download Capability
        console.log(`  📥 Testing report download capability...`);
        if (agentData.resources && agentData.resources.length > 0) {
            const hasDownloadableResources = agentData.resources.some(r => r.customized);
            if (hasDownloadableResources) {
                result.tests.reportDownload.passed = true;
                result.tests.reportDownload.details = `✅ ${agentData.resources.length} downloadable resources configured`;
            } else {
                result.tests.reportDownload.details = '❌ Resources not configured for download';
            }
        } else {
            result.tests.reportDownload.details = '❌ No downloadable resources';
        }
        
        // Calculate overall result
        const allPassed = Object.values(result.tests).every(t => t.passed);
        if (allPassed) {
            testResults.passed.push(agentId);
            console.log(`  ✅ PASSED: All integration tests passed for ${agentId}`);
        } else {
            testResults.failed.push(agentId);
            const failedTests = Object.entries(result.tests)
                .filter(([_, test]) => !test.passed)
                .map(([name, _]) => name);
            console.log(`  ❌ FAILED: ${agentId} - Failed tests: ${failedTests.join(', ')}`);
        }
        
    } catch (error) {
        console.error(`  ❌ ERROR testing ${agentId}:`, error.message);
        testResults.failed.push(agentId);
        result.error = error.message;
    }
    
    testResults.details[agentId] = result;
    return result;
}

// Simulate analysis completion
async function simulateAnalysis(agentId) {
    console.log(`  🧪 Simulating analysis for ${agentId}...`);
    
    const mockAnalysis = {
        subcomponentId: agentId,
        timestamp: new Date().toISOString(),
        score: Math.floor(Math.random() * 30) + 70, // Random score 70-100
        detailedScores: {
            problemDefinition: {
                score: 8,
                maxScore: 10,
                percentage: 80,
                feedback: '✓ Clear problem statement\n✗ Needs more customer validation'
            },
            marketAnalysis: {
                score: 7,
                maxScore: 10,
                percentage: 70,
                feedback: '✓ Good market sizing\n✗ Missing competitive analysis'
            }
        },
        executiveSummary: 'Test analysis completed successfully with comprehensive scoring.',
        workspaceData: {
            'test-field-1': 'Sample data 1',
            'test-field-2': 'Sample data 2'
        }
    };
    
    try {
        await makeRequest('/api/score-history', 'POST', mockAnalysis);
        console.log(`    ✅ Analysis saved to history`);
        return true;
    } catch (e) {
        console.log(`    ❌ Failed to save analysis: ${e.message}`);
        return false;
    }
}

// Run all tests
async function runAllTests() {
    console.log('🚀 ANALYSIS AND OUTPUT INTEGRATION TEST');
    console.log('========================================');
    console.log(`Testing ${TEST_AGENTS.length} sample agents...`);
    console.log('Requirements being tested:');
    console.log('1. Data loading for analysis');
    console.log('2. Two-grid analysis display structure');
    console.log('3. Score history saving');
    console.log('4. Template generation');
    console.log('5. Report download capability');
    console.log('========================================\n');
    
    // Test each agent
    for (const agentId of TEST_AGENTS) {
        await testAgent(agentId);
        
        // Simulate an analysis for testing
        await simulateAnalysis(agentId);
        
        // Small delay between tests
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // Generate summary
    console.log('\n\n========================================');
    console.log('📊 TEST SUMMARY');
    console.log('========================================');
    console.log(`Total Agents Tested: ${TEST_AGENTS.length}`);
    console.log(`✅ Passed: ${testResults.passed.length} (${(testResults.passed.length/TEST_AGENTS.length*100).toFixed(1)}%)`);
    console.log(`❌ Failed: ${testResults.failed.length} (${(testResults.failed.length/TEST_AGENTS.length*100).toFixed(1)}%)`);
    
    if (testResults.failed.length > 0) {
        console.log('\n❌ Failed Agents:');
        testResults.failed.forEach(id => {
            const details = testResults.details[id];
            const failedTests = Object.entries(details.tests)
                .filter(([_, test]) => !test.passed)
                .map(([name, test]) => `  - ${name}: ${test.details}`);
            console.log(`\n${id}:`);
            failedTests.forEach(t => console.log(t));
        });
    }
    
    // Test category summary
    console.log('\n📈 Test Category Summary:');
    const categories = {};
    Object.values(testResults.details).forEach(result => {
        Object.entries(result.tests).forEach(([testName, test]) => {
            if (!categories[testName]) {
                categories[testName] = { passed: 0, failed: 0 };
            }
            if (test.passed) {
                categories[testName].passed++;
            } else {
                categories[testName].failed++;
            }
        });
    });
    
    Object.entries(categories).forEach(([name, stats]) => {
        const passRate = (stats.passed / (stats.passed + stats.failed) * 100).toFixed(1);
        console.log(`${name}: ${stats.passed}/${stats.passed + stats.failed} passed (${passRate}%)`);
    });
    
    // Save results
    const reportPath = 'analysis-output-test-results.json';
    fs.writeFileSync(reportPath, JSON.stringify(testResults, null, 2));
    console.log(`\n💾 Detailed results saved to: ${reportPath}`);
    
    // Overall verdict
    console.log('\n========================================');
    if (testResults.passed.length === TEST_AGENTS.length) {
        console.log('🎉 SUCCESS: All agents passed integration tests!');
        console.log('✅ Two-grid analysis display ready');
        console.log('✅ Score history saving functional');
        console.log('✅ Template generation working');
        console.log('✅ Report download capabilities active');
    } else {
        console.log(`⚠️  NEEDS ATTENTION: ${testResults.failed.length} agents need fixes`);
    }
    console.log('========================================');
}

// Check server
async function checkServer() {
    try {
        await makeRequest('/api/blocks');
        return true;
    } catch (error) {
        console.error('❌ Server not running on http://localhost:3001');
        console.log('Please ensure combined-server-enhanced.js is running');
        return false;
    }
}

// Main execution
async function main() {
    const serverRunning = await checkServer();
    if (!serverRunning) {
        process.exit(1);
    }
    
    await runAllTests();
}

// Run tests
main().catch(console.error);
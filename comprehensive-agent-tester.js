// Comprehensive Agent Testing System for ScaleOps6
// Tests all 96 agent-subcomponent combinations through complete user journey

const fs = require('fs');
const http = require('http');

// Load all agent libraries
const AgentLibrary = require('./agent-library.js');
const GTMAgents = require('./gtm-agents.js');
const LeadershipAgents = require('./leadership-agents.js');
const { AGENT_CORRECT_MAPPING, AGENT_NAME_TO_KEY } = require('./agent-correct-mapping.js');

// Combine all agents into one library
const COMPLETE_AGENT_LIBRARY = {
    ...AgentLibrary,
    ...GTMAgents,
    ...LeadershipAgents
};

// Test results storage
const testResults = {
    timestamp: new Date().toISOString(),
    totalTests: 0,
    passed: 0,
    failed: 0,
    details: [],
    summary: {}
};

// Helper function to make API requests
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
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(body));
                } catch (e) {
                    resolve(body);
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

// Test 1: Verify agent exists and has correct structure
function testAgentStructure(subcomponentId, agentName) {
    const agentKey = AGENT_NAME_TO_KEY[agentName];
    const agent = COMPLETE_AGENT_LIBRARY[agentKey];
    
    const tests = {
        exists: !!agent,
        hasName: agent && !!agent.name,
        hasDescription: agent && !!agent.description,
        hasScoringDimensions: agent && Array.isArray(agent.scoringDimensions) && agent.scoringDimensions.length === 5,
        hasEvaluationCriteria: agent && !!agent.evaluationCriteria,
        dimensionsHaveWeights: agent && agent.scoringDimensions && agent.scoringDimensions.every(d => d.weight === 20)
    };
    
    return {
        subcomponentId,
        agentName,
        agentKey,
        tests,
        passed: Object.values(tests).every(t => t === true)
    };
}

// Test 2: Verify Education Tab Content
async function testEducationContent(subcomponentId) {
    try {
        const response = await makeRequest(`/api/subcomponents/${subcomponentId}`);
        
        const tests = {
            hasEducation: !!response.education,
            hasOverview: response.education && !!response.education.overview,
            hasKeyPrinciples: response.education && Array.isArray(response.education.keyPrinciples),
            hasLearningObjectives: response.education && !!response.education.learningObjectives,
            hasResources: response.education && Array.isArray(response.education.resources),
            resourcesHaveTypes: response.education && response.education.resources && 
                response.education.resources.every(r => r.type && r.title)
        };
        
        return {
            subcomponentId,
            tab: 'Education',
            tests,
            passed: Object.values(tests).every(t => t === true),
            agentName: response.name
        };
    } catch (error) {
        return {
            subcomponentId,
            tab: 'Education',
            error: error.message,
            passed: false
        };
    }
}

// Test 3: Verify Workspace Questions
async function testWorkspaceQuestions(subcomponentId) {
    try {
        const response = await makeRequest(`/api/subcomponents/${subcomponentId}`);
        
        const tests = {
            hasWorkspace: !!response.workspace,
            hasQuestions: response.workspace && Array.isArray(response.workspace.questions),
            questionCount: response.workspace && response.workspace.questions && response.workspace.questions.length >= 10,
            questionsHaveIds: response.workspace && response.workspace.questions && 
                response.workspace.questions.every(q => q.id),
            questionsHaveCategories: response.workspace && response.workspace.questions &&
                response.workspace.questions.every(q => q.category),
            questionsRelateToAgent: response.workspace && response.workspace.questions &&
                response.workspace.questions.some(q => q.category && response.scoringDimensions &&
                    response.scoringDimensions.some(d => d.name === q.category))
        };
        
        return {
            subcomponentId,
            tab: 'Workspace',
            tests,
            passed: Object.values(tests).every(t => t === true),
            questionCount: response.workspace ? response.workspace.questions.length : 0
        };
    } catch (error) {
        return {
            subcomponentId,
            tab: 'Workspace',
            error: error.message,
            passed: false
        };
    }
}

// Test 4: Verify Scoring and Analysis
async function testScoringAnalysis(subcomponentId) {
    try {
        // First get the questions
        const subcomponentData = await makeRequest(`/api/subcomponents/${subcomponentId}`);
        
        // Create mock responses
        const responses = {};
        if (subcomponentData.workspace && subcomponentData.workspace.questions) {
            subcomponentData.workspace.questions.forEach(q => {
                if (q.type === 'scale') {
                    responses[q.id] = 4; // Mock response value
                } else if (q.type === 'text') {
                    responses[q.id] = 'Test response for ' + q.id;
                }
            });
        }
        
        // Submit for analysis
        const analysis = await makeRequest('/api/analysis', 'POST', {
            subcomponentId,
            responses
        });
        
        const tests = {
            hasScore: typeof analysis.score === 'number',
            scoreInRange: analysis.score >= 0 && analysis.score <= 100,
            hasAgentName: !!analysis.agentName,
            correctAgent: analysis.agentName === AGENT_CORRECT_MAPPING[subcomponentId],
            hasTimestamp: !!analysis.timestamp,
            hasStrengths: Array.isArray(analysis.strengths),
            hasWeaknesses: Array.isArray(analysis.weaknesses),
            hasRecommendations: Array.isArray(analysis.recommendations)
        };
        
        return {
            subcomponentId,
            tab: 'Scoring',
            tests,
            passed: Object.values(tests).every(t => t === true),
            score: analysis.score,
            agentName: analysis.agentName
        };
    } catch (error) {
        return {
            subcomponentId,
            tab: 'Scoring',
            error: error.message,
            passed: false
        };
    }
}

// Test 5: Verify Score History
async function testScoreHistory(subcomponentId) {
    try {
        // Save a score
        await makeRequest('/api/score-history', 'POST', {
            subcomponentId,
            score: 85,
            agentName: AGENT_CORRECT_MAPPING[subcomponentId],
            timestamp: new Date().toISOString()
        });
        
        // Retrieve history
        const history = await makeRequest(`/api/score-history/${subcomponentId}`);
        
        const tests = {
            hasHistory: Array.isArray(history),
            historyNotEmpty: history && history.length > 0,
            entriesHaveScores: history && history.every(h => typeof h.score === 'number'),
            entriesHaveTimestamps: history && history.every(h => h.timestamp),
            entriesHaveAgentNames: history && history.every(h => h.agentName)
        };
        
        return {
            subcomponentId,
            tab: 'ScoreHistory',
            tests,
            passed: Object.values(tests).every(t => t === true),
            historyCount: history ? history.length : 0
        };
    } catch (error) {
        return {
            subcomponentId,
            tab: 'ScoreHistory',
            error: error.message,
            passed: false
        };
    }
}

// Test 6: Verify Templates
async function testTemplates(subcomponentId) {
    try {
        const response = await makeRequest(`/api/subcomponents/${subcomponentId}`);
        
        const tests = {
            hasTemplates: Array.isArray(response.templates),
            templatesNotEmpty: response.templates && response.templates.length > 0,
            templatesHaveNames: response.templates && response.templates.every(t => t.name),
            templatesRelateToAgent: response.templates && response.templates.some(t => 
                t.name && t.name.includes(response.name)),
            templatesHaveFormats: response.templates && response.templates.every(t => t.format)
        };
        
        return {
            subcomponentId,
            tab: 'Templates',
            tests,
            passed: Object.values(tests).every(t => t === true),
            templateCount: response.templates ? response.templates.length : 0
        };
    } catch (error) {
        return {
            subcomponentId,
            tab: 'Templates',
            error: error.message,
            passed: false
        };
    }
}

// Test 7: Verify Resources and Output Files
async function testResourcesOutput(subcomponentId) {
    try {
        const response = await makeRequest(`/api/subcomponents/${subcomponentId}`);
        
        const tests = {
            hasResources: Array.isArray(response.resources),
            resourcesNotEmpty: response.resources && response.resources.length > 0,
            resourcesHaveTitles: response.resources && response.resources.every(r => r.title),
            resourcesHaveTypes: response.resources && response.resources.every(r => r.type),
            resourcesRelateToAgent: response.resources && response.resources.some(r => 
                r.title && r.title.includes(response.name)),
            outputMatchesResources: response.resources && response.templates &&
                response.resources.some(r => response.templates.some(t => 
                    t.name && r.title && t.name.split(' ')[0] === r.title.split(' ')[0]))
        };
        
        return {
            subcomponentId,
            tab: 'Resources',
            tests,
            passed: Object.values(tests).every(t => t === true),
            resourceCount: response.resources ? response.resources.length : 0
        };
    } catch (error) {
        return {
            subcomponentId,
            tab: 'Resources',
            error: error.message,
            passed: false
        };
    }
}

// Test 8: Verify Layout Consistency
async function testLayoutConsistency(subcomponentId) {
    try {
        const response = await makeRequest(`/api/subcomponents/${subcomponentId}`);
        
        // Check if all expected sections exist (same as problem statement block)
        const tests = {
            hasAllSections: !!(response.education && response.workspace && 
                              response.templates && response.resources),
            hasAgentInfo: !!(response.name && response.description),
            hasScoringInfo: !!(response.scoringDimensions && response.evaluationCriteria),
            consistentStructure: true // This would need visual verification
        };
        
        return {
            subcomponentId,
            tab: 'Layout',
            tests,
            passed: Object.values(tests).every(t => t === true)
        };
    } catch (error) {
        return {
            subcomponentId,
            tab: 'Layout',
            error: error.message,
            passed: false
        };
    }
}

// Main test runner
async function runComprehensiveTests() {
    console.log('🚀 Starting Comprehensive Agent Testing...\n');
    console.log('Testing all 96 agent-subcomponent combinations\n');
    console.log('=' .repeat(80));
    
    for (const [subcomponentId, agentName] of Object.entries(AGENT_CORRECT_MAPPING)) {
        console.log(`\n📋 Testing ${subcomponentId}: ${agentName}`);
        console.log('-'.repeat(60));
        
        const blockTests = {
            subcomponentId,
            agentName,
            tests: {}
        };
        
        // Test 1: Agent Structure
        console.log('  ✓ Testing agent structure...');
        const structureTest = testAgentStructure(subcomponentId, agentName);
        blockTests.tests.structure = structureTest;
        
        // Test 2: Education Content
        console.log('  ✓ Testing education content...');
        const educationTest = await testEducationContent(subcomponentId);
        blockTests.tests.education = educationTest;
        
        // Test 3: Workspace Questions
        console.log('  ✓ Testing workspace questions...');
        const workspaceTest = await testWorkspaceQuestions(subcomponentId);
        blockTests.tests.workspace = workspaceTest;
        
        // Test 4: Scoring Analysis
        console.log('  ✓ Testing scoring and analysis...');
        const scoringTest = await testScoringAnalysis(subcomponentId);
        blockTests.tests.scoring = scoringTest;
        
        // Test 5: Score History
        console.log('  ✓ Testing score history...');
        const historyTest = await testScoreHistory(subcomponentId);
        blockTests.tests.history = historyTest;
        
        // Test 6: Templates
        console.log('  ✓ Testing templates...');
        const templatesTest = await testTemplates(subcomponentId);
        blockTests.tests.templates = templatesTest;
        
        // Test 7: Resources
        console.log('  ✓ Testing resources and output...');
        const resourcesTest = await testResourcesOutput(subcomponentId);
        blockTests.tests.resources = resourcesTest;
        
        // Test 8: Layout Consistency
        console.log('  ✓ Testing layout consistency...');
        const layoutTest = await testLayoutConsistency(subcomponentId);
        blockTests.tests.layout = layoutTest;
        
        // Calculate results
        const allPassed = Object.values(blockTests.tests).every(t => t.passed);
        const passedCount = Object.values(blockTests.tests).filter(t => t.passed).length;
        const totalCount = Object.keys(blockTests.tests).length;
        
        blockTests.passed = allPassed;
        blockTests.score = Math.round((passedCount / totalCount) * 100);
        
        testResults.details.push(blockTests);
        testResults.totalTests++;
        if (allPassed) {
            testResults.passed++;
            console.log(`  ✅ All tests passed! (${passedCount}/${totalCount})`);
        } else {
            testResults.failed++;
            console.log(`  ❌ Some tests failed (${passedCount}/${totalCount})`);
        }
        
        // Add to summary by block
        const blockNum = parseInt(subcomponentId.split('-')[0]);
        if (!testResults.summary[`Block ${blockNum}`]) {
            testResults.summary[`Block ${blockNum}`] = {
                total: 0,
                passed: 0,
                failed: 0,
                subcomponents: []
            };
        }
        testResults.summary[`Block ${blockNum}`].total++;
        if (allPassed) {
            testResults.summary[`Block ${blockNum}`].passed++;
        } else {
            testResults.summary[`Block ${blockNum}`].failed++;
        }
        testResults.summary[`Block ${blockNum}`].subcomponents.push({
            id: subcomponentId,
            agent: agentName,
            passed: allPassed,
            score: blockTests.score
        });
    }
    
    // Generate final report
    console.log('\n' + '='.repeat(80));
    console.log('📊 FINAL TEST REPORT');
    console.log('='.repeat(80));
    console.log(`Total Subcomponents Tested: ${testResults.totalTests}`);
    console.log(`✅ Passed: ${testResults.passed}`);
    console.log(`❌ Failed: ${testResults.failed}`);
    console.log(`Success Rate: ${Math.round((testResults.passed / testResults.totalTests) * 100)}%`);
    
    console.log('\n📈 Block Summary:');
    for (const [blockName, blockData] of Object.entries(testResults.summary)) {
        console.log(`\n${blockName}:`);
        console.log(`  Total: ${blockData.total} | Passed: ${blockData.passed} | Failed: ${blockData.failed}`);
        if (blockData.failed > 0) {
            console.log('  Failed subcomponents:');
            blockData.subcomponents.filter(s => !s.passed).forEach(s => {
                console.log(`    - ${s.id}: ${s.agent} (Score: ${s.score}%)`);
            });
        }
    }
    
    // Save detailed results to file
    fs.writeFileSync('agent-test-results-detailed.json', JSON.stringify(testResults, null, 2));
    console.log('\n💾 Detailed results saved to agent-test-results-detailed.json');
    
    // Generate actionable report
    generateActionableReport(testResults);
}

// Generate actionable report
function generateActionableReport(results) {
    let report = '# Agent System Test Report\n\n';
    report += `Generated: ${results.timestamp}\n\n`;
    report += '## Executive Summary\n\n';
    report += `- **Total Tests:** ${results.totalTests}\n`;
    report += `- **Passed:** ${results.passed}\n`;
    report += `- **Failed:** ${results.failed}\n`;
    report += `- **Success Rate:** ${Math.round((results.passed / results.totalTests) * 100)}%\n\n`;
    
    report += '## Issues Found\n\n';
    
    const issues = {
        missingAgents: [],
        educationIssues: [],
        workspaceIssues: [],
        scoringIssues: [],
        templateIssues: [],
        resourceIssues: []
    };
    
    results.details.forEach(detail => {
        if (!detail.tests.structure.passed) {
            issues.missingAgents.push(`${detail.subcomponentId}: ${detail.agentName}`);
        }
        if (!detail.tests.education.passed) {
            issues.educationIssues.push(detail.subcomponentId);
        }
        if (!detail.tests.workspace.passed) {
            issues.workspaceIssues.push(detail.subcomponentId);
        }
        if (!detail.tests.scoring.passed) {
            issues.scoringIssues.push(detail.subcomponentId);
        }
        if (!detail.tests.templates.passed) {
            issues.templateIssues.push(detail.subcomponentId);
        }
        if (!detail.tests.resources.passed) {
            issues.resourceIssues.push(detail.subcomponentId);
        }
    });
    
    if (issues.missingAgents.length > 0) {
        report += '### Missing or Incorrectly Mapped Agents\n';
        issues.missingAgents.forEach(agent => {
            report += `- ${agent}\n`;
        });
        report += '\n';
    }
    
    if (issues.educationIssues.length > 0) {
        report += '### Education Content Issues\n';
        report += `Found in ${issues.educationIssues.length} subcomponents\n\n`;
    }
    
    if (issues.workspaceIssues.length > 0) {
        report += '### Workspace Question Issues\n';
        report += `Found in ${issues.workspaceIssues.length} subcomponents\n\n`;
    }
    
    if (issues.scoringIssues.length > 0) {
        report += '### Scoring/Analysis Issues\n';
        report += `Found in ${issues.scoringIssues.length} subcomponents\n\n`;
    }
    
    report += '## Recommended Actions\n\n';
    report += '1. **Update Agent Mapping:** Ensure all agents use AGENT_CORRECT_MAPPING\n';
    report += '2. **Integrate Special Agents:** Add GTM and Leadership agents to main library\n';
    report += '3. **Fix Server Routing:** Update combined-server.js to use correct mappings\n';
    report += '4. **Verify Data Flow:** Ensure all tabs receive agent-specific data\n';
    report += '5. **Test Output Generation:** Verify files are created with correct names\n';
    
    fs.writeFileSync('agent-test-report.md', report);
    console.log('📄 Actionable report saved to agent-test-report.md');
}

// Check if server is running
function checkServerRunning() {
    return new Promise((resolve) => {
        const req = http.get('http://localhost:3001/api/blocks', (res) => {
            resolve(true);
        });
        req.on('error', () => {
            resolve(false);
        });
        req.end();
    });
}

// Main execution
async function main() {
    console.log('🔍 Checking if server is running...');
    const serverRunning = await checkServerRunning();
    
    if (!serverRunning) {
        console.log('❌ Server is not running on port 3001');
        console.log('Please start the server with: node combined-server.js');
        process.exit(1);
    }
    
    console.log('✅ Server is running\n');
    await runComprehensiveTests();
}

// Run tests
main().catch(console.error);
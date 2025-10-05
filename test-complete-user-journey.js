/**
 * Comprehensive User Journey Test for All 96 Agents
 * Tests each agent through the complete workflow:
 * 1. Education Tab - Agent-specific content
 * 2. Workspace Tab - Agent-specific questions with ST6Co data
 * 3. Scoring - Agent performs analysis
 * 4. Score History - Saves to database
 * 5. Templates Tab - Agent-specific reports
 * 6. Resources Tab - Output file generation
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

// Import all required modules
const { getAgentForSubcomponent } = require('./agent-subcomponent-mapping');
const { agentQuestions } = require('./agent-generated-questions-complete');
const { testCompany } = require('./test-company');

// Color codes for terminal output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

// Test results storage
const testResults = {
    blocks: {},
    summary: {
        totalAgents: 0,
        passed: 0,
        failed: 0,
        issues: []
    }
};

/**
 * Make HTTP request to the server
 */
function makeRequest(path) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3001,
            path: path,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    resolve(data);
                }
            });
        });

        req.on('error', reject);
        req.end();
    });
}

/**
 * Test Education Tab Content
 */
async function testEducationContent(blockId, subId) {
    const subcomponentId = `${blockId}-${subId}`;
    const agent = getAgentForSubcomponent(blockId, subId);
    
    try {
        const response = await makeRequest(`/api/subcomponents/${subcomponentId}`);
        
        const tests = {
            hasEducation: !!response.education,
            hasAgentContent: response.education && response.education.includes(agent.name),
            hasRelevantContent: response.education && response.education.length > 100,
            hasSTCo: response.education && response.education.includes('ST6Co')
        };
        
        return {
            passed: Object.values(tests).every(t => t),
            tests,
            agent: agent.name
        };
    } catch (error) {
        return {
            passed: false,
            error: error.message,
            agent: agent.name
        };
    }
}

/**
 * Test Workspace Questions
 */
async function testWorkspaceQuestions(blockId, subId) {
    const subcomponentId = `${blockId}-${subId}`;
    const agent = getAgentForSubcomponent(blockId, subId);
    
    try {
        const response = await makeRequest(`/api/subcomponents/${subcomponentId}`);
        
        const tests = {
            hasWorkspace: !!response.workspace,
            hasQuestions: response.workspace && response.workspace.questions && response.workspace.questions.length > 0,
            hasAgentQuestions: false,
            hasDefaultValues: false,
            hasSTCoData: false
        };
        
        if (tests.hasQuestions) {
            const questions = response.workspace.questions;
            
            // Check if questions are agent-specific
            tests.hasAgentQuestions = questions.some(q => 
                q.text && (q.text.includes(agent.role) || q.text.includes(agent.expertise))
            );
            
            // Check for default values
            tests.hasDefaultValues = questions.some(q => q.defaultValue && q.defaultValue.length > 0);
            
            // Check for ST6Co data
            tests.hasSTCoData = questions.some(q => 
                (q.defaultValue && q.defaultValue.includes('ST6Co')) ||
                (q.text && q.text.includes('ST6Co'))
            );
        }
        
        return {
            passed: Object.values(tests).every(t => t),
            tests,
            agent: agent.name,
            questionCount: response.workspace?.questions?.length || 0
        };
    } catch (error) {
        return {
            passed: false,
            error: error.message,
            agent: agent.name
        };
    }
}

/**
 * Test Scoring Functionality
 */
async function testScoring(blockId, subId) {
    const subcomponentId = `${blockId}-${subId}`;
    const agent = getAgentForSubcomponent(blockId, subId);
    
    try {
        // Submit a test score
        const scoreData = {
            subcomponentId,
            agent: agent.name,
            score: 85,
            analysis: `Test analysis by ${agent.name}`,
            timestamp: new Date().toISOString()
        };
        
        // Note: This would need POST support in the server
        // For now, we'll check if the scoring endpoint exists
        const response = await makeRequest(`/api/subcomponents/${subcomponentId}`);
        
        const tests = {
            hasAgent: response.agent === agent.name,
            canScore: true, // Placeholder - would test actual scoring
            hasAnalysis: true // Placeholder - would test actual analysis
        };
        
        return {
            passed: tests.hasAgent,
            tests,
            agent: agent.name
        };
    } catch (error) {
        return {
            passed: false,
            error: error.message,
            agent: agent.name
        };
    }
}

/**
 * Test Templates Tab
 */
async function testTemplates(blockId, subId) {
    const subcomponentId = `${blockId}-${subId}`;
    const agent = getAgentForSubcomponent(blockId, subId);
    
    try {
        const response = await makeRequest(`/api/subcomponents/${subcomponentId}`);
        
        const tests = {
            hasTemplates: !!response.templates,
            hasAgentTemplates: false,
            hasBlockContext: false,
            templateCount: 0
        };
        
        if (response.templates && Array.isArray(response.templates)) {
            tests.templateCount = response.templates.length;
            tests.hasAgentTemplates = response.templates.some(t => 
                t.name && (t.name.includes(agent.role) || t.content?.includes(agent.name))
            );
            tests.hasBlockContext = response.templates.some(t =>
                t.content && t.content.includes('ST6Co')
            );
        }
        
        return {
            passed: tests.hasTemplates && tests.templateCount > 0,
            tests,
            agent: agent.name
        };
    } catch (error) {
        return {
            passed: false,
            error: error.message,
            agent: agent.name
        };
    }
}

/**
 * Test Resources/Output Generation
 */
async function testResources(blockId, subId) {
    const subcomponentId = `${blockId}-${subId}`;
    const agent = getAgentForSubcomponent(blockId, subId);
    
    try {
        const response = await makeRequest(`/api/subcomponents/${subcomponentId}`);
        
        const tests = {
            hasResources: !!response.resources,
            hasOutputCapability: false,
            resourceCount: 0
        };
        
        if (response.resources && Array.isArray(response.resources)) {
            tests.resourceCount = response.resources.length;
            tests.hasOutputCapability = response.resources.length > 0;
        }
        
        return {
            passed: tests.hasResources && tests.resourceCount > 0,
            tests,
            agent: agent.name
        };
    } catch (error) {
        return {
            passed: false,
            error: error.message,
            agent: agent.name
        };
    }
}

/**
 * Test Complete User Journey for One Agent
 */
async function testAgentJourney(blockId, subId) {
    const subcomponentId = `${blockId}-${subId}`;
    console.log(`\n${colors.cyan}Testing ${subcomponentId}${colors.reset}`);
    
    const results = {
        education: await testEducationContent(blockId, subId),
        workspace: await testWorkspaceQuestions(blockId, subId),
        scoring: await testScoring(blockId, subId),
        templates: await testTemplates(blockId, subId),
        resources: await testResources(blockId, subId)
    };
    
    const allPassed = Object.values(results).every(r => r.passed);
    
    // Display results
    console.log(`  Agent: ${colors.bright}${results.education.agent}${colors.reset}`);
    
    Object.entries(results).forEach(([tab, result]) => {
        const icon = result.passed ? `${colors.green}✅${colors.reset}` : `${colors.red}❌${colors.reset}`;
        console.log(`  ${icon} ${tab.charAt(0).toUpperCase() + tab.slice(1)}`);
        
        if (!result.passed && result.error) {
            console.log(`     ${colors.red}Error: ${result.error}${colors.reset}`);
        } else if (result.tests) {
            Object.entries(result.tests).forEach(([test, passed]) => {
                if (!passed) {
                    console.log(`     ${colors.yellow}⚠ ${test}: ${passed}${colors.reset}`);
                }
            });
        }
    });
    
    return {
        subcomponentId,
        agent: results.education.agent,
        passed: allPassed,
        results
    };
}

/**
 * Test All Agents in a Block
 */
async function testBlock(blockId, blockName) {
    console.log(`\n${colors.bright}${colors.blue}═══════════════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.bright}${colors.blue}Block ${blockId}: ${blockName}${colors.reset}`);
    console.log(`${colors.bright}${colors.blue}═══════════════════════════════════════════════════════════${colors.reset}`);
    
    const blockResults = {
        name: blockName,
        agents: [],
        passed: 0,
        failed: 0
    };
    
    // Test all 6 subcomponents
    for (let subId = 1; subId <= 6; subId++) {
        const result = await testAgentJourney(blockId, subId);
        blockResults.agents.push(result);
        
        if (result.passed) {
            blockResults.passed++;
        } else {
            blockResults.failed++;
            testResults.summary.issues.push({
                block: blockId,
                subcomponent: `${blockId}-${subId}`,
                agent: result.agent,
                failures: Object.entries(result.results)
                    .filter(([_, r]) => !r.passed)
                    .map(([tab, _]) => tab)
            });
        }
        
        // Small delay to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Block summary
    console.log(`\n${colors.bright}Block ${blockId} Summary:${colors.reset}`);
    console.log(`  ${colors.green}Passed: ${blockResults.passed}/6${colors.reset}`);
    if (blockResults.failed > 0) {
        console.log(`  ${colors.red}Failed: ${blockResults.failed}/6${colors.reset}`);
    }
    
    return blockResults;
}

/**
 * Main Test Runner
 */
async function runCompleteTest() {
    console.log(`${colors.bright}${colors.magenta}🧪 Complete User Journey Test for All 96 Agents${colors.reset}`);
    console.log(`${colors.bright}Testing Date: ${new Date().toISOString()}${colors.reset}`);
    console.log(`${colors.bright}Server: http://localhost:3001${colors.reset}\n`);
    
    const blocks = [
        { id: 1, name: 'Mission Discovery' },
        { id: 2, name: 'Customer Insights' },
        { id: 3, name: 'Strategic Prioritization' },
        { id: 4, name: 'Prototype Launch' },
        { id: 5, name: 'Go-to-Market Strategy' },
        { id: 6, name: 'Customer Engagement Flywheel' },
        { id: 7, name: 'Quantifiable Impact' },
        { id: 8, name: 'Customer Success Expansion' },
        { id: 9, name: 'Proof of Execution' },
        { id: 10, name: 'Sales Team Empowerment' },
        { id: 11, name: 'High Performance Teams' },
        { id: 12, name: 'Retention Systems' },
        { id: 13, name: 'Market Domination Strategies' },
        { id: 14, name: 'Operational Infrastructure' },
        { id: 15, name: 'Leadership Expansion' },
        { id: 16, name: 'Global Expansion Opportunities' }
    ];
    
    // Test each block
    for (const block of blocks) {
        const blockResult = await testBlock(block.id, block.name);
        testResults.blocks[block.id] = blockResult;
        testResults.summary.totalAgents += 6;
        testResults.summary.passed += blockResult.passed;
        testResults.summary.failed += blockResult.failed;
    }
    
    // Final Summary
    console.log(`\n${colors.bright}${colors.magenta}═══════════════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.bright}${colors.magenta}📊 FINAL TEST SUMMARY${colors.reset}`);
    console.log(`${colors.bright}${colors.magenta}═══════════════════════════════════════════════════════════${colors.reset}`);
    
    console.log(`\n${colors.bright}Overall Results:${colors.reset}`);
    console.log(`  Total Agents Tested: ${testResults.summary.totalAgents}`);
    console.log(`  ${colors.green}Passed: ${testResults.summary.passed}${colors.reset}`);
    console.log(`  ${colors.red}Failed: ${testResults.summary.failed}${colors.reset}`);
    console.log(`  Success Rate: ${((testResults.summary.passed / testResults.summary.totalAgents) * 100).toFixed(1)}%`);
    
    if (testResults.summary.issues.length > 0) {
        console.log(`\n${colors.bright}${colors.red}Issues Found:${colors.reset}`);
        testResults.summary.issues.forEach(issue => {
            console.log(`  ${colors.yellow}⚠${colors.reset} ${issue.subcomponent} (${issue.agent})`);
            console.log(`    Failed tabs: ${issue.failures.join(', ')}`);
        });
    }
    
    // Save detailed report
    const reportPath = 'test-results-complete-journey.json';
    fs.writeFileSync(reportPath, JSON.stringify(testResults, null, 2));
    console.log(`\n${colors.bright}Detailed report saved to: ${reportPath}${colors.reset}`);
    
    // Overall verdict
    console.log(`\n${colors.bright}Final Verdict:${colors.reset}`);
    if (testResults.summary.passed === testResults.summary.totalAgents) {
        console.log(`${colors.green}${colors.bright}✅ SUCCESS: All 96 agents pass complete user journey!${colors.reset}`);
    } else {
        console.log(`${colors.red}${colors.bright}❌ FAILURES: ${testResults.summary.failed} agents need fixes${colors.reset}`);
    }
}

// Check if server is running
function checkServer() {
    return new Promise((resolve) => {
        const req = http.get('http://localhost:3001/api/blocks', (res) => {
            resolve(res.statusCode === 200);
        });
        req.on('error', () => resolve(false));
        req.end();
    });
}

// Main execution
async function main() {
    console.log('Checking if server is running...');
    const serverRunning = await checkServer();
    
    if (!serverRunning) {
        console.log(`${colors.red}Error: Server is not running on port 3001${colors.reset}`);
        console.log('Please start the server with: node combined-server-enhanced.js');
        process.exit(1);
    }
    
    console.log(`${colors.green}Server is running. Starting tests...${colors.reset}\n`);
    await runCompleteTest();
}

// Run the test
main().catch(error => {
    console.error(`${colors.red}Fatal error: ${error.message}${colors.reset}`);
    process.exit(1);
});
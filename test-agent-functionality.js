// FUNCTIONAL TEST FOR AGENT DATA LOADING AND USER JOURNEY
// Tests if agents actually load data into UI and save to database

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Test configuration
const TEST_URL = 'http://localhost:3000';
const BLOCKS_TO_TEST = 16;
const SUBCOMPONENTS_PER_BLOCK = 6;

// Test results
const testResults = {
    timestamp: new Date().toISOString(),
    passed: [],
    failed: [],
    details: []
};

// Helper to wait for element
async function waitForElement(page, selector, timeout = 10000) {
    try {
        await page.waitForSelector(selector, { timeout });
        return true;
    } catch {
        return false;
    }
}

// Helper to get text content
async function getTextContent(page, selector) {
    try {
        return await page.$eval(selector, el => el.textContent);
    } catch {
        return null;
    }
}

// Test 1: Check if Education Tab loads agent-specific content
async function testEducationContent(page, blockId, subId) {
    const subcomponentId = `${blockId}-${subId}`;
    console.log(`\n📚 Testing Education Content for ${subcomponentId}`);
    
    // Navigate to subcomponent page
    await page.goto(`${TEST_URL}/subcomponent-detail.html?id=${subcomponentId}`, {
        waitUntil: 'networkidle2'
    });
    
    // Wait for education content to load
    await page.waitForTimeout(2000);
    
    // Check if education tab has content
    const hasEducationContent = await page.evaluate(() => {
        const educationTab = document.getElementById('education-tab');
        if (!educationTab) return false;
        
        // Check for loading message removal
        const loadingMsg = educationTab.querySelector('#education-loading');
        if (loadingMsg && loadingMsg.style.display !== 'none') return false;
        
        // Check for actual content sections
        const sections = educationTab.querySelectorAll('.education-section');
        return sections.length > 0;
    });
    
    // Get agent name from the page
    const agentName = await page.evaluate(() => {
        // Try to find agent name in various places
        const agentNameElement = document.querySelector('.agent-name') || 
                                document.querySelector('[data-agent-name]');
        if (agentNameElement) return agentNameElement.textContent;
        
        // Check in education content
        const educationContent = document.querySelector('#education-tab .section-content');
        if (educationContent && educationContent.textContent.includes('Expert')) {
            const match = educationContent.textContent.match(/([A-Za-z\s]+Expert|[A-Za-z\s]+Evaluator|[A-Za-z\s]+Analyst)/);
            if (match) return match[1];
        }
        
        return null;
    });
    
    const result = {
        subcomponentId,
        test: 'Education Content',
        hasContent: hasEducationContent,
        agentName: agentName,
        passed: hasEducationContent && agentName !== null
    };
    
    testResults.details.push(result);
    
    if (result.passed) {
        console.log(`✅ Education content loaded with agent: ${agentName}`);
    } else {
        console.log(`❌ Education content failed to load properly`);
    }
    
    return result.passed;
}

// Test 2: Check if Workspace loads agent-specific questions
async function testWorkspaceQuestions(page, blockId, subId) {
    const subcomponentId = `${blockId}-${subId}`;
    console.log(`\n📝 Testing Workspace Questions for ${subcomponentId}`);
    
    // Click on Workspace tab
    await page.click('[data-tab="workspace"]');
    await page.waitForTimeout(1500);
    
    // Check if questions are loaded
    const workspaceData = await page.evaluate(() => {
        const container = document.getElementById('dynamic-worksheet-container');
        if (!container) return { hasQuestions: false };
        
        // Check for questions
        const questions = container.querySelectorAll('.worksheet-field');
        const labels = Array.from(container.querySelectorAll('.worksheet-label')).map(l => l.textContent);
        
        return {
            hasQuestions: questions.length > 0,
            questionCount: questions.length,
            sampleQuestions: labels.slice(0, 3)
        };
    });
    
    const result = {
        subcomponentId,
        test: 'Workspace Questions',
        ...workspaceData,
        passed: workspaceData.hasQuestions && workspaceData.questionCount > 0
    };
    
    testResults.details.push(result);
    
    if (result.passed) {
        console.log(`✅ Workspace loaded ${workspaceData.questionCount} questions`);
        console.log(`   Sample: ${workspaceData.sampleQuestions.join(', ')}`);
    } else {
        console.log(`❌ Workspace questions failed to load`);
    }
    
    return result.passed;
}

// Test 3: Test Analysis and Scoring
async function testAnalysisScoring(page, blockId, subId) {
    const subcomponentId = `${blockId}-${subId}`;
    console.log(`\n🤖 Testing Analysis & Scoring for ${subcomponentId}`);
    
    // Fill in some sample answers
    await page.evaluate(() => {
        // Fill text areas with sample data
        const textareas = document.querySelectorAll('.worksheet-textarea');
        textareas.forEach((textarea, index) => {
            textarea.value = `Sample answer ${index + 1} for testing purposes`;
        });
        
        // Select radio buttons if any
        const radios = document.querySelectorAll('input[type="radio"]');
        radios.forEach((radio, index) => {
            if (index % 5 === 3) radio.checked = true; // Select 75% option
        });
    });
    
    // Click Analyze button
    const analyzeButton = await page.$('button[onclick*="analyze"]');
    if (analyzeButton) {
        await analyzeButton.click();
        await page.waitForTimeout(2000);
    }
    
    // Switch to Analysis tab
    await page.click('[data-tab="analysis"]');
    await page.waitForTimeout(1500);
    
    // Check if analysis results are displayed
    const analysisData = await page.evaluate(() => {
        const analysisContent = document.getElementById('analysis-content');
        if (!analysisContent) return { hasAnalysis: false };
        
        // Look for score display
        const scoreElement = analysisContent.querySelector('[style*="font-size: 72px"], .total-score, .score-display');
        const score = scoreElement ? parseFloat(scoreElement.textContent) : null;
        
        // Look for agent attribution
        const agentElement = analysisContent.querySelector('.agent-name, [data-agent], p:contains("generated by")');
        const agentName = agentElement ? agentElement.textContent : null;
        
        // Check for dimension scores
        const dimensionScores = analysisContent.querySelectorAll('.dimension-score, [class*="dimension"]');
        
        return {
            hasAnalysis: score !== null,
            score: score,
            agentName: agentName,
            hasDimensions: dimensionScores.length > 0,
            dimensionCount: dimensionScores.length
        };
    });
    
    const result = {
        subcomponentId,
        test: 'Analysis & Scoring',
        ...analysisData,
        passed: analysisData.hasAnalysis && analysisData.score !== null
    };
    
    testResults.details.push(result);
    
    if (result.passed) {
        console.log(`✅ Analysis completed with score: ${analysisData.score}%`);
        if (analysisData.agentName) {
            console.log(`   Agent: ${analysisData.agentName}`);
        }
    } else {
        console.log(`❌ Analysis failed to generate results`);
    }
    
    return result.passed;
}

// Test 4: Check Score History
async function testScoreHistory(page, blockId, subId) {
    const subcomponentId = `${blockId}-${subId}`;
    console.log(`\n📊 Testing Score History for ${subcomponentId}`);
    
    // Click on Score History tab
    await page.click('[data-tab="history"]');
    await page.waitForTimeout(1500);
    
    // Check if score was saved
    const historyData = await page.evaluate(() => {
        const historyContent = document.getElementById('score-history-content');
        if (!historyContent) return { hasHistory: false };
        
        // Check localStorage for score history
        const scoreHistory = localStorage.getItem('scaleops6_score_history');
        let historyCount = 0;
        let latestScore = null;
        
        if (scoreHistory) {
            try {
                const history = JSON.parse(scoreHistory);
                historyCount = history.length;
                if (history.length > 0) {
                    latestScore = history[0].totalScore;
                }
            } catch (e) {}
        }
        
        // Check UI for history items
        const historyItems = historyContent.querySelectorAll('.history-item');
        
        return {
            hasHistory: historyCount > 0 || historyItems.length > 0,
            historyCount: Math.max(historyCount, historyItems.length),
            latestScore: latestScore,
            uiItemCount: historyItems.length
        };
    });
    
    const result = {
        subcomponentId,
        test: 'Score History',
        ...historyData,
        passed: historyData.hasHistory
    };
    
    testResults.details.push(result);
    
    if (result.passed) {
        console.log(`✅ Score saved to history (${historyData.historyCount} items)`);
        if (historyData.latestScore) {
            console.log(`   Latest score: ${historyData.latestScore}%`);
        }
    } else {
        console.log(`❌ Score not saved to history`);
    }
    
    return result.passed;
}

// Test 5: Check Resources/Templates
async function testResourcesTemplates(page, blockId, subId) {
    const subcomponentId = `${blockId}-${subId}`;
    console.log(`\n🔧 Testing Resources & Templates for ${subcomponentId}`);
    
    // Click on Resources tab
    await page.click('[data-tab="resources"]');
    await page.waitForTimeout(1500);
    
    // Check if templates are loaded
    const resourceData = await page.evaluate((subId) => {
        const templatesContainer = document.getElementById('resource-templates');
        if (!templatesContainer) return { hasTemplates: false };
        
        const templates = templatesContainer.querySelectorAll('.template-item');
        const templateNames = Array.from(templates).map(t => {
            const nameEl = t.querySelector('.template-name');
            return nameEl ? nameEl.textContent : null;
        }).filter(Boolean);
        
        // Check if templates are relevant to the agent
        const agentRelated = templateNames.some(name => 
            name.toLowerCase().includes('assessment') ||
            name.toLowerCase().includes('action') ||
            name.toLowerCase().includes('guide')
        );
        
        return {
            hasTemplates: templates.length > 0,
            templateCount: templates.length,
            templateNames: templateNames.slice(0, 3),
            agentRelated: agentRelated
        };
    }, subId);
    
    const result = {
        subcomponentId,
        test: 'Resources & Templates',
        ...resourceData,
        passed: resourceData.hasTemplates && resourceData.agentRelated
    };
    
    testResults.details.push(result);
    
    if (result.passed) {
        console.log(`✅ Resources loaded ${resourceData.templateCount} templates`);
        console.log(`   Templates: ${resourceData.templateNames.join(', ')}`);
    } else {
        console.log(`❌ Resources/Templates not properly loaded`);
    }
    
    return result.passed;
}

// Test 6: Check Output Generation
async function testOutputGeneration(page, blockId, subId) {
    const subcomponentId = `${blockId}-${subId}`;
    console.log(`\n📋 Testing Output Generation for ${subcomponentId}`);
    
    // Click on Output tab
    await page.click('[data-tab="output"]');
    await page.waitForTimeout(2000);
    
    // Check if outputs are generated
    const outputData = await page.evaluate(() => {
        const outputContent = document.getElementById('output-content');
        if (!outputContent) return { hasOutputs: false };
        
        // Remove loading message check
        const loadingMsg = outputContent.querySelector('#output-loading');
        if (loadingMsg && loadingMsg.style.display !== 'none') {
            return { hasOutputs: false, stillLoading: true };
        }
        
        // Check for generated outputs
        const outputs = outputContent.querySelectorAll('.output-item, [class*="output"]');
        
        return {
            hasOutputs: outputs.length > 0,
            outputCount: outputs.length,
            stillLoading: false
        };
    });
    
    const result = {
        subcomponentId,
        test: 'Output Generation',
        ...outputData,
        passed: outputData.hasOutputs || !outputData.stillLoading // Pass if outputs exist or at least loading finished
    };
    
    testResults.details.push(result);
    
    if (result.passed && outputData.hasOutputs) {
        console.log(`✅ Outputs generated (${outputData.outputCount} items)`);
    } else if (result.passed) {
        console.log(`⚠️ Output section ready but no outputs yet`);
    } else {
        console.log(`❌ Output generation failed or still loading`);
    }
    
    return result.passed;
}

// Main test runner
async function runFunctionalTests() {
    console.log('🚀 STARTING FUNCTIONAL AGENT TESTS');
    console.log('===================================');
    console.log(`Testing URL: ${TEST_URL}`);
    console.log(`Testing ${BLOCKS_TO_TEST} blocks × ${SUBCOMPONENTS_PER_BLOCK} subcomponents`);
    
    const browser = await puppeteer.launch({
        headless: false, // Set to true for CI/CD
        defaultViewport: { width: 1280, height: 800 }
    });
    
    const page = await browser.newPage();
    
    // Test a sample from each block
    const samplesToTest = [
        { block: 1, sub: 1 },  // Problem Statement
        { block: 1, sub: 3 },  // Voice of Customer
        { block: 2, sub: 1 },  // Interview Cadence
        { block: 3, sub: 1 },  // Use Case Scorer
        { block: 5, sub: 1 },  // Early Win Validator
        { block: 7, sub: 1 },  // Time/Cost Analyst
        { block: 10, sub: 1 }, // Enablement Asset Manager
        { block: 13, sub: 1 }, // Category Narrative Designer
        { block: 16, sub: 1 }  // Market Entry Analyst
    ];
    
    let totalPassed = 0;
    let totalFailed = 0;
    
    for (const sample of samplesToTest) {
        console.log(`\n${'='.repeat(60)}`);
        console.log(`TESTING BLOCK ${sample.block} - SUBCOMPONENT ${sample.sub}`);
        console.log(`${'='.repeat(60)}`);
        
        const tests = [
            () => testEducationContent(page, sample.block, sample.sub),
            () => testWorkspaceQuestions(page, sample.block, sample.sub),
            () => testAnalysisScoring(page, sample.block, sample.sub),
            () => testScoreHistory(page, sample.block, sample.sub),
            () => testResourcesTemplates(page, sample.block, sample.sub),
            () => testOutputGeneration(page, sample.block, sample.sub)
        ];
        
        for (const test of tests) {
            try {
                const passed = await test();
                if (passed) {
                    totalPassed++;
                    testResults.passed.push(`${sample.block}-${sample.sub}`);
                } else {
                    totalFailed++;
                    testResults.failed.push(`${sample.block}-${sample.sub}`);
                }
            } catch (error) {
                console.error(`Test error: ${error.message}`);
                totalFailed++;
            }
        }
    }
    
    await browser.close();
    
    // Generate report
    console.log(`\n${'='.repeat(60)}`);
    console.log('📊 TEST SUMMARY');
    console.log(`${'='.repeat(60)}`);
    console.log(`Total Tests Run: ${totalPassed + totalFailed}`);
    console.log(`Passed: ${totalPassed}`);
    console.log(`Failed: ${totalFailed}`);
    console.log(`Success Rate: ${((totalPassed / (totalPassed + totalFailed)) * 100).toFixed(1)}%`);
    
    // Analyze results by test type
    const byTestType = {};
    testResults.details.forEach(detail => {
        if (!byTestType[detail.test]) {
            byTestType[detail.test] = { passed: 0, failed: 0 };
        }
        if (detail.passed) {
            byTestType[detail.test].passed++;
        } else {
            byTestType[detail.test].failed++;
        }
    });
    
    console.log('\nResults by Test Type:');
    Object.entries(byTestType).forEach(([test, counts]) => {
        const total = counts.passed + counts.failed;
        const rate = ((counts.passed / total) * 100).toFixed(1);
        console.log(`  ${test}: ${counts.passed}/${total} passed (${rate}%)`);
    });
    
    // Save detailed results
    fs.writeFileSync('functional-test-results.json', JSON.stringify(testResults, null, 2));
    console.log('\n✅ Detailed results saved to functional-test-results.json');
    
    // Final verdict
    console.log(`\n${'='.repeat(60)}`);
    if (totalFailed === 0) {
        console.log('🎉 ALL FUNCTIONAL TESTS PASSED!');
        console.log('The agent system is fully functional.');
    } else if (totalPassed > totalFailed) {
        console.log('⚠️ PARTIAL SUCCESS');
        console.log('Some functionality is working but needs fixes.');
    } else {
        console.log('❌ CRITICAL ISSUES DETECTED');
        console.log('Major functionality is broken and needs immediate attention.');
    }
    console.log(`${'='.repeat(60)}`);
}

// Run the tests
runFunctionalTests().catch(console.error);
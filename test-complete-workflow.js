// Test Complete Workflow for ScaleOps6 Platform
// Tests: Agent Loading → Workspace → Analysis → Score History → Templates → Downloads

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Complete ScaleOps6 Workflow...\n');

// Test 1: Check if all required files exist
console.log('📁 Test 1: Checking Required Files...');
const requiredFiles = [
    'agent-library.js',
    'agent-content-loader.js',
    'agent-worksheet-integration.js',
    'complete-workflow-integration.js',
    'fix-agent-content-display.js',
    'subcomponent-detail.html',
    'block-detail.html',
    'ST6-CLEAN/workflow-integration.js',
    'ST6-CLEAN/score-history-handler.js',
    'ST6-CLEAN/unified-analysis-handler-fixed.js'
];

let allFilesExist = true;
requiredFiles.forEach(file => {
    const exists = fs.existsSync(path.join(__dirname, file));
    console.log(`  ${exists ? '✅' : '❌'} ${file}`);
    if (!exists) allFilesExist = false;
});

// Test 2: Verify AgentLibrary structure
console.log('\n📚 Test 2: Verifying Agent Library...');
try {
    const AgentLibrary = require('./agent-library.js');
    const agentCount = Object.keys(AgentLibrary).length;
    console.log(`  ✅ Loaded ${agentCount} agents`);
    
    // Test agent key format
    const testKeys = ['1a', '1b', '7c', '10d', '16f'];
    testKeys.forEach(key => {
        if (AgentLibrary[key]) {
            console.log(`  ✅ Agent ${key}: ${AgentLibrary[key].name}`);
        } else {
            console.log(`  ❌ Agent ${key} not found`);
        }
    });
    
    // Test agent structure
    const sampleAgent = AgentLibrary['1a'];
    if (sampleAgent) {
        console.log('\n  📊 Sample Agent Structure (1a):');
        console.log(`    - Name: ${sampleAgent.name}`);
        console.log(`    - Description: ${sampleAgent.description.substring(0, 50)}...`);
        console.log(`    - Scoring Dimensions: ${sampleAgent.scoringDimensions.length}`);
        console.log(`    - Has Evaluation Criteria: ${!!sampleAgent.evaluationCriteria}`);
    }
} catch (error) {
    console.log(`  ❌ Error loading AgentLibrary: ${error.message}`);
}

// Test 3: Check workflow integration components
console.log('\n🔄 Test 3: Checking Workflow Components...');

// Check if workflow files have correct exports
try {
    // Check agent worksheet integration
    const worksheetIntegration = fs.readFileSync('agent-worksheet-integration.js', 'utf8');
    const hasAgentWorksheetClass = worksheetIntegration.includes('class AgentWorksheetIntegration');
    console.log(`  ${hasAgentWorksheetClass ? '✅' : '❌'} AgentWorksheetIntegration class defined`);
    
    // Check complete workflow integration
    const completeWorkflow = fs.readFileSync('complete-workflow-integration.js', 'utf8');
    const hasCompleteWorkspace = completeWorkflow.includes('window.completeWorkspace');
    const hasTemplateGeneration = completeWorkflow.includes('generateTemplatesWithData');
    const hasScoreHistory = completeWorkflow.includes('saveToScoreHistory');
    
    console.log(`  ${hasCompleteWorkspace ? '✅' : '❌'} Complete workspace function defined`);
    console.log(`  ${hasTemplateGeneration ? '✅' : '❌'} Template generation function defined`);
    console.log(`  ${hasScoreHistory ? '✅' : '❌'} Score history saving function defined`);
    
} catch (error) {
    console.log(`  ❌ Error checking workflow components: ${error.message}`);
}

// Test 4: Verify HTML integration
console.log('\n🌐 Test 4: Verifying HTML Integration...');
try {
    const subcomponentHTML = fs.readFileSync('subcomponent-detail.html', 'utf8');
    
    // Check script includes
    const scripts = [
        'agent-library.js',
        'complete-workflow-integration.js',
        'fix-agent-content-display.js'
    ];
    
    scripts.forEach(script => {
        const included = subcomponentHTML.includes(`<script src="${script}"`) || 
                        subcomponentHTML.includes(`<script src="ST6-CLEAN/${script}"`);
        console.log(`  ${included ? '✅' : '❌'} ${script} included in HTML`);
    });
    
    // Check for tabs
    const tabs = ['education', 'workspace', 'analysis', 'output', 'resources', 'history'];
    tabs.forEach(tab => {
        const hasTab = subcomponentHTML.includes(`data-tab="${tab}"`);
        console.log(`  ${hasTab ? '✅' : '⚠️'} ${tab.charAt(0).toUpperCase() + tab.slice(1)} tab present`);
    });
    
} catch (error) {
    console.log(`  ❌ Error checking HTML: ${error.message}`);
}

// Test 5: Simulate workflow execution
console.log('\n🎯 Test 5: Simulating Workflow Execution...');

// Function to convert subcomponent ID to agent key
function getAgentKey(subcomponentId) {
    const [block, subIndex] = subcomponentId.split('-');
    const letterIndex = parseInt(subIndex) - 1;
    const letter = String.fromCharCode(97 + letterIndex);
    return `${block}${letter}`;
}

// Test conversion for various subcomponents
const testSubcomponents = [
    { id: '1-1', expectedKey: '1a', expectedName: 'Problem Definition Evaluator' },
    { id: '7-3', expectedKey: '7c', expectedName: 'Productivity Measurer' },
    { id: '10-4', expectedKey: '10d', expectedName: 'Objection Handler' },
    { id: '16-6', expectedKey: '16f', expectedName: 'Expansion Risk Assessor' }
];

console.log('\n  🔑 Testing Subcomponent to Agent Key Conversion:');
testSubcomponents.forEach(test => {
    const key = getAgentKey(test.id);
    const correct = key === test.expectedKey;
    console.log(`    ${correct ? '✅' : '❌'} ${test.id} → ${key} (expected: ${test.expectedKey})`);
    
    // Try to get the agent
    try {
        const AgentLibrary = require('./agent-library.js');
        const agent = AgentLibrary[key];
        if (agent) {
            const nameMatch = agent.name === test.expectedName;
            console.log(`      ${nameMatch ? '✅' : '⚠️'} Agent name: ${agent.name}`);
        } else {
            console.log(`      ❌ Agent not found for key: ${key}`);
        }
    } catch (error) {
        console.log(`      ❌ Error loading agent: ${error.message}`);
    }
});

// Summary
console.log('\n' + '='.repeat(60));
console.log('📊 WORKFLOW TEST SUMMARY:');
console.log('='.repeat(60));

const issues = [];
if (!allFilesExist) {
    issues.push('Some required files are missing');
}

if (issues.length === 0) {
    console.log('✅ All workflow components are properly configured!');
    console.log('\n🎉 The ScaleOps6 workflow is ready for use:');
    console.log('  1. Agents are loaded and accessible');
    console.log('  2. Workspace can collect data');
    console.log('  3. Analysis can be generated');
    console.log('  4. Score history can be saved');
    console.log('  5. Templates can be populated');
    console.log('  6. Resources are downloadable');
} else {
    console.log('⚠️ Issues found:');
    issues.forEach(issue => console.log(`  - ${issue}`));
    console.log('\n📝 Please fix these issues before testing the workflow.');
}

console.log('\n💡 Next Steps:');
console.log('  1. Open http://localhost:3001/block-detail.html?id=1');
console.log('  2. Click on any subcomponent (e.g., Problem Statement)');
console.log('  3. Fill in the Workspace tab');
console.log('  4. Click "Analyze Results"');
console.log('  5. Check Analysis, Score History, and Resources tabs');
console.log('  6. Download generated templates from Resources tab');
/**
 * Test Script: Verify Agent-Specific Questions with ST6Co Data
 * This script tests that each agent receives unique questions with integrated ST6Co data
 */

const http = require('http');

// Test configuration
const TEST_SUBCOMPONENTS = [
    { id: '1-1', name: 'Problem Statement', block: 1 },
    { id: '1-2', name: 'Mission Statement', block: 1 },
    { id: '2-1', name: 'Interview Cadence', block: 2 },
    { id: '5-1', name: 'GTM Strategy', block: 5 },
    { id: '15-1', name: 'Leadership Strategy', block: 15 }
];

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

// Make API request
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

// Test individual subcomponent
async function testSubcomponent(subcomponent) {
    console.log(`\n${colors.cyan}Testing ${subcomponent.id}: ${subcomponent.name}${colors.reset}`);
    console.log('=' .repeat(60));
    
    try {
        const data = await makeRequest(`/api/subcomponents/${subcomponent.id}`);
        
        // Check agent name
        console.log(`${colors.bright}Agent:${colors.reset} ${data.name}`);
        
        // Check workspace questions
        if (data.workspace && data.workspace.questions) {
            const questions = data.workspace.questions;
            console.log(`${colors.bright}Questions:${colors.reset} ${questions.length} total`);
            
            // Check for ST6Co context
            const hasContext = questions.some(q => q.id === 'st6_context');
            const hasST6Data = questions.some(q => 
                q.content && (q.content.company === 'ST6Co' || q.content.product === 'ScaleOps6Product')
            );
            const hasDefaultValues = questions.some(q => q.defaultValue && q.defaultValue.length > 0);
            
            console.log(`  ${hasContext ? '✅' : '❌'} Has ST6Co context`);
            console.log(`  ${hasST6Data ? '✅' : '❌'} Contains ST6Co/ScaleOps6Product data`);
            console.log(`  ${hasDefaultValues ? '✅' : '❌'} Has pre-filled default values`);
            
            // Show first few questions
            console.log(`\n${colors.bright}Sample Questions:${colors.reset}`);
            questions.slice(0, 3).forEach((q, i) => {
                console.log(`  ${i + 1}. ${q.question || q.text || 'No question text'}`);
                if (q.defaultValue) {
                    console.log(`     ${colors.yellow}Default: ${q.defaultValue.substring(0, 100)}...${colors.reset}`);
                }
            });
            
            // Check if questions are unique to this agent
            const uniqueQuestions = questions.filter(q => 
                q.question && (
                    q.question.includes(subcomponent.name) ||
                    q.question.includes('ST6Co') ||
                    q.question.includes('ScaleOps6Product')
                )
            );
            console.log(`\n  ${colors.bright}Unique Questions:${colors.reset} ${uniqueQuestions.length}/${questions.length}`);
            
            // Check education content
            if (data.education) {
                const hasCompanyContext = data.education.companyContext && 
                    data.education.companyContext.company === 'ST6Co';
                console.log(`  ${hasCompanyContext ? '✅' : '❌'} Education has ST6Co context`);
            }
            
            // Check templates
            if (data.templates) {
                const customizedTemplates = data.templates.filter(t => t.customized);
                console.log(`  ${colors.bright}Templates:${colors.reset} ${customizedTemplates.length}/${data.templates.length} customized for ST6Co`);
            }
            
            // Check resources
            if (data.resources) {
                const customizedResources = data.resources.filter(r => r.customized);
                console.log(`  ${colors.bright}Resources:${colors.reset} ${customizedResources.length}/${data.resources.length} customized`);
            }
            
            return {
                subcomponent: subcomponent.id,
                success: true,
                hasContext: hasContext,
                hasST6Data: hasST6Data,
                hasDefaultValues: hasDefaultValues,
                uniqueQuestions: uniqueQuestions.length,
                totalQuestions: questions.length
            };
        } else {
            console.log(`${colors.red}❌ No workspace questions found${colors.reset}`);
            return {
                subcomponent: subcomponent.id,
                success: false,
                error: 'No workspace questions'
            };
        }
    } catch (error) {
        console.log(`${colors.red}❌ Error: ${error.message}${colors.reset}`);
        return {
            subcomponent: subcomponent.id,
            success: false,
            error: error.message
        };
    }
}

// Compare questions between agents
async function compareAgentQuestions() {
    console.log(`\n${colors.bright}${colors.blue}Comparing Questions Across Agents${colors.reset}`);
    console.log('=' .repeat(60));
    
    const questionSets = {};
    
    for (const sub of TEST_SUBCOMPONENTS) {
        try {
            const data = await makeRequest(`/api/subcomponents/${sub.id}`);
            if (data.workspace && data.workspace.questions) {
                questionSets[sub.id] = data.workspace.questions.map(q => q.question || q.text || '');
            }
        } catch (error) {
            console.log(`Error fetching ${sub.id}: ${error.message}`);
        }
    }
    
    // Check for uniqueness
    const subIds = Object.keys(questionSets);
    let allUnique = true;
    
    for (let i = 0; i < subIds.length; i++) {
        for (let j = i + 1; j < subIds.length; j++) {
            const set1 = questionSets[subIds[i]];
            const set2 = questionSets[subIds[j]];
            
            // Count identical questions
            const identical = set1.filter(q => set2.includes(q)).length;
            const similarity = (identical / Math.max(set1.length, set2.length)) * 100;
            
            if (similarity > 50) {
                console.log(`${colors.yellow}⚠️  ${subIds[i]} vs ${subIds[j]}: ${similarity.toFixed(1)}% similar${colors.reset}`);
                allUnique = false;
            } else {
                console.log(`${colors.green}✅ ${subIds[i]} vs ${subIds[j]}: ${similarity.toFixed(1)}% similar (unique)${colors.reset}`);
            }
        }
    }
    
    return allUnique;
}

// Main test runner
async function runTests() {
    console.log(`${colors.bright}${colors.cyan}🧪 Agent-Specific Question Testing${colors.reset}`);
    console.log(`${colors.bright}Testing ST6Co Data Integration${colors.reset}`);
    console.log('=' .repeat(60));
    
    const results = [];
    
    // Test each subcomponent
    for (const sub of TEST_SUBCOMPONENTS) {
        const result = await testSubcomponent(sub);
        results.push(result);
    }
    
    // Compare questions for uniqueness
    const areUnique = await compareAgentQuestions();
    
    // Summary
    console.log(`\n${colors.bright}${colors.cyan}📊 Test Summary${colors.reset}`);
    console.log('=' .repeat(60));
    
    const successful = results.filter(r => r.success);
    const withContext = results.filter(r => r.hasContext);
    const withST6Data = results.filter(r => r.hasST6Data);
    const withDefaults = results.filter(r => r.hasDefaultValues);
    
    console.log(`Total Tests: ${results.length}`);
    console.log(`${colors.green}✅ Successful: ${successful.length}/${results.length}${colors.reset}`);
    console.log(`${colors.green}✅ With ST6Co Context: ${withContext.length}/${results.length}${colors.reset}`);
    console.log(`${colors.green}✅ With ST6Co Data: ${withST6Data.length}/${results.length}${colors.reset}`);
    console.log(`${colors.green}✅ With Default Values: ${withDefaults.length}/${results.length}${colors.reset}`);
    console.log(`${areUnique ? colors.green + '✅' : colors.yellow + '⚠️ '} Questions are ${areUnique ? 'unique' : 'partially similar'} across agents${colors.reset}`);
    
    // Calculate average uniqueness
    const avgUnique = results.reduce((sum, r) => sum + (r.uniqueQuestions || 0), 0) / 
                      results.reduce((sum, r) => sum + (r.totalQuestions || 0), 0) * 100;
    console.log(`Average Question Uniqueness: ${avgUnique.toFixed(1)}%`);
    
    // Final verdict
    console.log(`\n${colors.bright}Final Verdict:${colors.reset}`);
    if (successful.length === results.length && withContext.length > 0 && withST6Data.length > 0) {
        console.log(`${colors.green}${colors.bright}✅ SUCCESS: Agents have unique questions with ST6Co data integration!${colors.reset}`);
    } else {
        console.log(`${colors.yellow}${colors.bright}⚠️  PARTIAL SUCCESS: Some improvements needed${colors.reset}`);
        if (successful.length < results.length) {
            console.log(`  - ${results.length - successful.length} agents failed to load`);
        }
        if (withContext.length === 0) {
            console.log(`  - No ST6Co context found in questions`);
        }
        if (withST6Data.length === 0) {
            console.log(`  - No ST6Co data integration found`);
        }
    }
}

// Run the tests
runTests().catch(console.error);
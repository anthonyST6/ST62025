
/**
 * Comprehensive Test: All 96 Subcomponents
 * 
 * Tests that each subcomponent has:
 * - Correct domain alignment
 * - Valid questions
 * - Educational content
 * - Proper agent mapping
 * 
 * Created: 2025-10-06
 */

const { SUBCOMPONENT_REGISTRY, getSubcomponent } = require('./core/subcomponent-registry.js');
const agentQuestions = require('./agent-generated-questions-complete.js');
const { educationalContent } = require('./educational-content.js');
const { agentMapping } = require('./agent-subcomponent-mapping.js');

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║  Testing All 96 Subcomponents                              ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

const results = {
    total: 0,
    passed: 0,
    failed: 0,
    warnings: 0,
    details: []
};

// Test each subcomponent
for (let blockId = 1; blockId <= 16; blockId++) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`BLOCK ${blockId}: ${SUBCOMPONENT_REGISTRY[`${blockId}-1`].blockName}`);
    console.log('='.repeat(60));
    
    for (let subId = 1; subId <= 6; subId++) {
        const id = `${blockId}-${subId}`;
        results.total++;
        
        const test = {
            id,
            name: '',
            checks: {
                registry: false,
                agent: false,
                questions: false,
                education: false,
                domainAlignment: false
            },
            issues: []
        };
        
        try {
            // Check 1: Registry
            const subcomponent = getSubcomponent(id);
            test.name = subcomponent.name;
            test.checks.registry = true;
            
            // Check 2: Agent mapping
            const agent = agentMapping[id];
            if (agent && agent.domain === subcomponent.name) {
                test.checks.agent = true;
            } else {
                test.issues.push(`Agent domain mismatch: "${agent?.domain}" !== "${subcomponent.name}"`);
            }
            
            // Check 3: Questions
            const questions = agentQuestions[id];
            if (questions && questions.domain === subcomponent.name) {
                test.checks.questions = true;
                
                // Check question relevance
                const hasRelevantQuestions = questions.questions.some(q => 
                    q.text.toLowerCase().includes(subcomponent.name.toLowerCase().split(' ')[0])
                );
                
                if (!hasRelevantQuestions) {
                    test.issues.push('Questions may lack domain keywords (check manually)');
                    results.warnings++;
                }
            } else {
                test.issues.push(`Question domain mismatch: "${questions?.domain}" !== "${subcomponent.name}"`);
            }
            
            // Check 4: Educational content
            const education = educationalContent[id];
            if (education && education.title === subcomponent.name) {
                test.checks.education = true;
            } else {
                test.issues.push(`Education title mismatch: "${education?.title}" !== "${subcomponent.name}"`);
            }
            
            // Check 5: Overall domain alignment
            test.checks.domainAlignment = 
                test.checks.agent && 
                test.checks.questions && 
                test.checks.education;
            
            // Determine pass/fail
            const allCriticalPassed = 
                test.checks.registry &&
                test.checks.agent &&
                test.checks.questions &&
                test.checks.education;
            
            if (allCriticalPassed) {
                results.passed++;
                console.log(`  ✅ ${id}: ${subcomponent.name}`);
            } else {
                results.failed++;
                console.log(`  ❌ ${id}: ${subcomponent.name}`);
                test.issues.forEach(issue => {
                    console.log(`     - ${issue}`);
                });
            }
            
        } catch (error) {
            results.failed++;
            test.issues.push(`Error: ${error.message}`);
            console.log(`  ❌ ${id}: ERROR - ${error.message}`);
        }
        
        results.details.push(test);
    }
}

// Summary
console.log('\n' + '='.repeat(60));
console.log('TEST SUMMARY');
console.log('='.repeat(60));
console.log(`\nTotal Subcomponents: ${results.total}`);
console.log(`Passed: ${results.passed} (${Math.round(results.passed/results.total*100)}%)`);
console.log(`Failed: ${results.failed} (${Math.round(results.failed/results.total*100)}%)`);
console.log(`Warnings: ${results.warnings}\n`);

// Breakdown by check type
const checkStats = {
    registry: 0,
    agent: 0,
    questions: 0,
    education: 0,
    domainAlignment: 0
};

results.details.forEach(test => {
    Object.keys(checkStats).forEach(check => {
        if (test.checks[check]) checkStats[check]++;
    });
});

console.log('Check Breakdown:');
console.log(`  Registry:         ${checkStats.registry}/96 ${checkStats.registry === 96 ? '✅' : '❌'}`);
console.log(`  Agent Mapping:    ${checkStats.agent}/96 ${checkStats.agent === 96 ? '✅' : '❌'}`);
console.log(`  Questions:        ${checkStats.questions}/96 ${checkStats.questions === 96 ? '✅' : '❌'}`);
console.log(`  Education:        ${checkStats.education}/96 ${checkStats.education === 96 ? '✅' : '❌'}`);
console.log(`  Domain Alignment: ${checkStats.domainAlignment}/96 ${checkStats.domainAlignment === 96 ? '✅' : '❌'}\n`);

// Failed subcomponents detail
if (results.failed > 0) {
    console.log('Failed Subcomponents:');
    results.details.filter(t => !t.checks.domainAlignment).forEach(test => {
        console.log(`\n  ${test.id}: ${test.name}`);
        test.issues.forEach(issue => console.log(`    - ${issue}`));
    });
    console.log('');
}

// Overall status
console.log('═'.repeat(60));
if (results.failed === 0) {
    console.log('✅ ALL 96 SUBCOMPONENTS PASSED!');
    console.log('\nThe SSOT solution is fully operational.');
    console.log('All layers are aligned and validated.\n');
} else {
    console.log(`⚠️  ${results.failed} subcomponents have issues`);
    console.log('\nReview failed items above and address issues.\n');
}

// Save results
const fs = require('fs');
fs.writeFileSync(
    './test-results-all-96.json',
    JSON.stringify(results, null, 2)
);
console.log('📄 Detailed results saved: test-results-all-96.json\n');
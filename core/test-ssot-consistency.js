#!/usr/bin/env node

/**
 * Automated SSOT Consistency Tests
 * 
 * Tests that verify SSOT alignment across the system
 */

const { validateAllSubcomponents } = require('./validate-ssot-alignment.js');
const { COMPLETE_SSOT_REGISTRY, getSubcomponent } = require('./complete-ssot-registry.js');
const { getTemplatesForDomain } = require('./template-registry.js');

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║  SSOT Consistency Test Suite                               ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function test(name, fn) {
    totalTests++;
    try {
        fn();
        console.log(`✅ PASS: ${name}`);
        passedTests++;
        return true;
    } catch (error) {
        console.error(`❌ FAIL: ${name}`);
        console.error(`   ${error.message}`);
        failedTests++;
        return false;
    }
}

function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

// Test Suite
console.log('Running SSOT consistency tests...\n');

// Test 1: Registry exists and has 96 subcomponents
test('Registry contains exactly 96 subcomponents', () => {
    const count = Object.keys(COMPLETE_SSOT_REGISTRY).length;
    assert(count === 96, `Expected 96 subcomponents, got ${count}`);
});

// Test 2: All subcomponents have required sections
test('All subcomponents have required sections', () => {
    const requiredSections = ['agent', 'education', 'workspace', 'analysis', 'resources', 'outputs', 'meta'];
    
    for (const [id, data] of Object.entries(COMPLETE_SSOT_REGISTRY)) {
        requiredSections.forEach(section => {
            assert(data[section], `${id} missing ${section} section`);
        });
    }
});

// Test 3: Domain consistency across all sections
test('Domain names are consistent across all sections', () => {
    for (const [id, data] of Object.entries(COMPLETE_SSOT_REGISTRY)) {
        const domains = [
            data.agent.domain,
            data.education.title,
            data.workspace.domain,
            data.analysis.domain,
            data.resources.domain,
            data.outputs.domain
        ];
        
        const uniqueDomains = [...new Set(domains)];
        assert(uniqueDomains.length === 1, 
            `${id} has inconsistent domains: ${uniqueDomains.join(', ')}`);
        assert(uniqueDomains[0] === data.name,
            `${id} domain ${uniqueDomains[0]} doesn't match name ${data.name}`);
    }
});

// Test 4: All domains have templates
test('All domains have templates defined', () => {
    for (const [id, data] of Object.entries(COMPLETE_SSOT_REGISTRY)) {
        const templates = getTemplatesForDomain(data.name);
        assert(templates && templates.length > 0,
            `${id} (${data.name}) has no templates`);
    }
});

// Test 5: Resources and outputs templates match
test('Resources and outputs templates are identical', () => {
    for (const [id, data] of Object.entries(COMPLETE_SSOT_REGISTRY)) {
        const resourceTemplates = JSON.stringify(data.resources.templates);
        const outputTemplates = JSON.stringify(data.outputs.templates);
        assert(resourceTemplates === outputTemplates,
            `${id} templates mismatch: resources=${data.resources.templates.length}, outputs=${data.outputs.templates.length}`);
    }
});

// Test 6: Specific subcomponent 2-1 has correct templates
test('Subcomponent 2-1 has correct JTBD templates', () => {
    const sub = getSubcomponent('2-1');
    const expectedTemplates = ["JTBD Interview Script", "Job Story Template", "Outcome Mapping Framework"];
    const actualTemplates = sub.resources.templates;
    
    assert(JSON.stringify(actualTemplates) === JSON.stringify(expectedTemplates),
        `2-1 templates mismatch. Expected: ${expectedTemplates.join(', ')}. Got: ${actualTemplates.join(', ')}`);
});

// Test 7: All subcomponents marked as complete
test('All subcomponents are marked as complete', () => {
    for (const [id, data] of Object.entries(COMPLETE_SSOT_REGISTRY)) {
        assert(data.meta.completeness.isComplete,
            `${id} is marked as incomplete`);
    }
});

// Test 8: Validation script passes
test('SSOT validation script passes', () => {
    const results = validateAllSubcomponents();
    assert(results.errors.length === 0,
        `Validation found ${results.errors.length} errors`);
});

// Print results
console.log('\n═══════════════════════════════════════════════════════════');
console.log('TEST RESULTS');
console.log('═══════════════════════════════════════════════════════════\n');
console.log(`Total Tests: ${totalTests}`);
console.log(`✅ Passed: ${passedTests}`);
console.log(`❌ Failed: ${failedTests}`);
console.log(`Success Rate: ${Math.round(passedTests/totalTests*100)}%\n`);

if (failedTests > 0) {
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`❌ ${failedTests} test(s) failed`);
    console.log('═══════════════════════════════════════════════════════════\n');
    process.exit(1);
} else {
    console.log('═══════════════════════════════════════════════════════════');
    console.log('✅ All tests passed!');
    console.log('═══════════════════════════════════════════════════════════\n');
    process.exit(0);
}
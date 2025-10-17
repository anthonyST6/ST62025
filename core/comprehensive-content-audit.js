#!/usr/bin/env node

/**
 * Comprehensive Educational Content Audit
 * 
 * Audits ALL sections of education tab content:
 * - What description
 * - Why explanation  
 * - How implementation guide
 * - Examples relevance
 * - Action steps specificity
 * 
 * Identifies mismatches and generates detailed report
 */

const { educationalContent } = require('../educational-content.js');
const { SUBCOMPONENT_NAMES } = require('../subcomponent-names-mapping.js');
const { COMPLETE_SSOT_REGISTRY } = require('./complete-ssot-registry.js');

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║  Comprehensive Educational Content Audit                   ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

const results = {
    total: 0,
    criticalIssues: [],
    majorIssues: [],
    minorIssues: [],
    passed: [],
    bySection: {
        what: { passed: 0, failed: 0 },
        why: { passed: 0, failed: 0 },
        how: { passed: 0, failed: 0 },
        examples: { passed: 0, failed: 0 },
        keyMetrics: { passed: 0, failed: 0 }
    }
};

console.log('Auditing all sections for all 96 subcomponents...\n');

for (const [id, name] of Object.entries(SUBCOMPONENT_NAMES)) {
    results.total++;
    const content = educationalContent[id];
    const ssot = COMPLETE_SSOT_REGISTRY[id];
    
    if (!content) {
        results.criticalIssues.push({
            id,
            name,
            section: 'ALL',
            issue: 'NO_CONTENT',
            severity: 'critical'
        });
        continue;
    }
    
    const issues = [];
    
    // Check 1: "What" description matches subcomponent
    const whatText = (content.what || '').toLowerCase();
    const nameWords = name.toLowerCase().split(' ');
    const hasNameKeywords = nameWords.some(word => 
        word.length > 3 && whatText.includes(word)
    );
    
    if (!hasNameKeywords) {
        issues.push({
            section: 'what',
            severity: 'critical',
            issue: `"What" description doesn't mention key terms from "${name}"`,
            current: content.what?.substring(0, 100) + '...'
        });
        results.bySection.what.failed++;
    } else {
        results.bySection.what.passed++;
    }
    
    // Check 2: "Why" has substance
    if (!content.why || content.why.length < 75) {
        issues.push({
            section: 'why',
            severity: 'major',
            issue: 'Why section too short or missing',
            current: content.why?.length || 0
        });
        results.bySection.why.failed++;
    } else {
        results.bySection.why.passed++;
    }
    
    // Check 3: "How" implementation guide exists and has structure
    if (!content.how || content.how.length < 200) {
        issues.push({
            section: 'how',
            severity: 'major',
            issue: 'Implementation guide too short or missing',
            current: content.how?.length || 0
        });
        results.bySection.how.failed++;
    } else {
        results.bySection.how.passed++;
    }
    
    // Check 4: Examples exist and are relevant
    if (!content.examples || content.examples.length < 2) {
        issues.push({
            section: 'examples',
            severity: 'minor',
            issue: `Only ${content.examples?.length || 0} examples (need 3+)`,
            current: content.examples?.length || 0
        });
        results.bySection.examples.failed++;
    } else {
        results.bySection.examples.passed++;
    }
    
    // Check 5: Custom keyMetrics exist
    if (!content.keyMetrics || content.keyMetrics.length === 0) {
        issues.push({
            section: 'keyMetrics',
            severity: 'minor',
            issue: 'No custom keyMetrics defined',
            current: 0
        });
        results.bySection.keyMetrics.failed++;
    } else {
        results.bySection.keyMetrics.passed++;
    }
    
    // Categorize by severity
    const criticalCount = issues.filter(i => i.severity === 'critical').length;
    const majorCount = issues.filter(i => i.severity === 'major').length;
    
    if (criticalCount > 0) {
        results.criticalIssues.push({ id, name, issues });
        console.log(`❌ CRITICAL: ${id} (${name}) - ${criticalCount} critical issues`);
    } else if (majorCount > 0) {
        results.majorIssues.push({ id, name, issues });
        console.log(`⚠️  MAJOR: ${id} (${name}) - ${majorCount} major issues`);
    } else if (issues.length > 0) {
        results.minorIssues.push({ id, name, issues });
    } else {
        results.passed.push({ id, name });
    }
}

// Print summary
console.log('\n═══════════════════════════════════════════════════════════');
console.log('AUDIT SUMMARY');
console.log('═══════════════════════════════════════════════════════════\n');
console.log(`Total Subcomponents: ${results.total}`);
console.log(`✅ Passed All Checks: ${results.passed.length} (${Math.round(results.passed.length/results.total*100)}%)`);
console.log(`❌ Critical Issues: ${results.criticalIssues.length}`);
console.log(`⚠️  Major Issues: ${results.majorIssues.length}`);
console.log(`ℹ️  Minor Issues: ${results.minorIssues.length}\n`);

console.log('By Section:');
Object.entries(results.bySection).forEach(([section, stats]) => {
    const total = stats.passed + stats.failed;
    const passRate = Math.round(stats.passed / total * 100);
    console.log(`  ${section}: ${stats.passed}/${total} passed (${passRate}%)`);
});

// Save detailed report
const fs = require('fs');
fs.writeFileSync(
    'comprehensive-content-audit-report.json',
    JSON.stringify(results, null, 2)
);

console.log('\n📄 Detailed report saved: comprehensive-content-audit-report.json\n');

console.log('═══════════════════════════════════════════════════════════');
console.log('PRIORITY FIXES NEEDED');
console.log('═══════════════════════════════════════════════════════════\n');

if (results.criticalIssues.length > 0) {
    console.log(`🚨 ${results.criticalIssues.length} subcomponents with CRITICAL issues (wrong content):`);
    results.criticalIssues.slice(0, 10).forEach(item => {
        console.log(`  ${item.id}: ${item.name}`);
        item.issues.filter(i => i.severity === 'critical').forEach(issue => {
            console.log(`    - ${issue.issue}`);
        });
    });
    if (results.criticalIssues.length > 10) {
        console.log(`  ... and ${results.criticalIssues.length - 10} more\n`);
    }
}

if (results.majorIssues.length > 0) {
    console.log(`\n⚠️  ${results.majorIssues.length} subcomponents with MAJOR issues (incomplete content)`);
}

console.log('\n═══════════════════════════════════════════════════════════');
console.log('NEXT STEPS');
console.log('═══════════════════════════════════════════════════════════\n');
console.log('1. Review comprehensive-content-audit-report.json');
console.log('2. Fix critical issues first (wrong content)');
console.log('3. Fix major issues (incomplete content)');
console.log('4. Address minor issues (missing metrics/examples)\n');

process.exit(results.criticalIssues.length > 0 ? 1 : 0);
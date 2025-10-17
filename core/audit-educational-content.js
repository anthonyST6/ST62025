#!/usr/bin/env node

/**
 * Educational Content Audit System
 * 
 * Validates that educational content matches subcomponent purpose
 * Flags misalignments and suggests corrections
 * 
 * Run: node core/audit-educational-content.js
 */

const { educationalContent } = require('../educational-content.js');
const { SUBCOMPONENT_NAMES } = require('../subcomponent-names-mapping.js');
const { COMPLETE_SSOT_REGISTRY } = require('./complete-ssot-registry.js');

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║  Educational Content Quality Audit                         ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

// Content validation rules for each subcomponent
const CONTENT_VALIDATION_RULES = {
    "Activation Tracker": {
        requiredKeywords: ["activation", "onboarding", "first value", "time to value", "feature adoption", "user journey"],
        forbiddenKeywords: ["churn", "win-back", "re-engage", "churned customers", "recovery"],
        expectedTopics: ["onboarding metrics", "activation milestones", "feature adoption", "time-to-value"],
        category: "customer_success"
    },
    "Win-Back Campaign": {
        requiredKeywords: ["churn", "win-back", "re-engage", "churned", "recovery", "reactivation"],
        forbiddenKeywords: ["onboarding", "new customer", "first time"],
        expectedTopics: ["churn analysis", "re-engagement", "offers", "campaigns"],
        category: "retention"
    },
    "Jobs to be Done": {
        requiredKeywords: ["jobs", "jtbd", "outcome", "progress", "hire", "fire"],
        forbiddenKeywords: ["interview cadence", "schedule", "recurring"],
        expectedTopics: ["customer jobs", "desired outcomes", "forces of progress"],
        category: "research"
    },
    "Interview Cadence": {
        requiredKeywords: ["interview", "cadence", "schedule", "frequency", "recurring"],
        forbiddenKeywords: [],
        expectedTopics: ["interview planning", "research rhythm", "customer discovery"],
        category: "research"
    },
    "Problem Statement Definition": {
        requiredKeywords: ["problem", "pain", "challenge", "issue", "difficulty"],
        forbiddenKeywords: ["solution", "feature", "product"],
        expectedTopics: ["problem validation", "customer pain", "market need"],
        category: "foundation"
    }
    // Add more as needed
};

/**
 * Validate content quality
 */
function validateContentQuality(subcomponentId, content, subName) {
    const issues = [];
    const warnings = [];
    
    // Check 1: Content exists
    if (!content) {
        issues.push({
            severity: 'critical',
            type: 'MISSING_CONTENT',
            message: `No educational content found`
        });
        return { valid: false, issues, warnings, score: 0 };
    }
    
    // Check 2: Required fields exist
    const requiredFields = ['what', 'why', 'how'];
    requiredFields.forEach(field => {
        if (!content[field] || content[field].length < 20) {
            issues.push({
                severity: 'error',
                type: 'MISSING_FIELD',
                field: field,
                message: `Missing or insufficient '${field}' content`
            });
        }
    });
    
    // Check 3: Title matches subcomponent name
    if (content.title !== subName) {
        issues.push({
            severity: 'error',
            type: 'TITLE_MISMATCH',
            expected: subName,
            actual: content.title,
            message: `Title '${content.title}' doesn't match subcomponent name '${subName}'`
        });
    }
    
    // Check 4: Keyword validation (if rules exist)
    const rules = CONTENT_VALIDATION_RULES[subName];
    if (rules) {
        const whatText = (content.what || '').toLowerCase();
        
        // Check for required keywords
        const hasRequired = rules.requiredKeywords.some(kw => 
            whatText.includes(kw.toLowerCase())
        );
        
        if (!hasRequired) {
            issues.push({
                severity: 'error',
                type: 'MISSING_KEYWORDS',
                expected: rules.requiredKeywords,
                message: `Content missing required keywords for ${subName}`
            });
        }
        
        // Check for forbidden keywords (indicates wrong content)
        const forbiddenFound = rules.forbiddenKeywords.filter(kw =>
            whatText.includes(kw.toLowerCase())
        );
        
        if (forbiddenFound.length > 0) {
            issues.push({
                severity: 'critical',
                type: 'WRONG_CONTENT',
                forbidden: forbiddenFound,
                message: `Content contains forbidden keywords: ${forbiddenFound.join(', ')} - likely from different subcomponent`
            });
        }
    }
    
    // Check 5: Content length validation
    if (content.what && content.what.length < 50) {
        warnings.push({
            severity: 'warning',
            type: 'SHORT_CONTENT',
            field: 'what',
            message: `'What' section is too short (${content.what.length} chars, minimum 50)`
        });
    }
    
    if (content.why && content.why.length < 75) {
        warnings.push({
            severity: 'warning',
            type: 'SHORT_CONTENT',
            field: 'why',
            message: `'Why' section is too short (${content.why.length} chars, minimum 75)`
        });
    }
    
    // Check 6: Examples validation
    if (!content.examples || content.examples.length < 2) {
        warnings.push({
            severity: 'warning',
            type: 'INSUFFICIENT_EXAMPLES',
            count: content.examples?.length || 0,
            message: `Only ${content.examples?.length || 0} examples (recommended: 3-5)`
        });
    }
    
    // Check 7: Metrics validation
    if (!content.metrics || content.metrics.length < 3) {
        warnings.push({
            severity: 'warning',
            type: 'INSUFFICIENT_METRICS',
            count: content.metrics?.length || 0,
            message: `Only ${content.metrics?.length || 0} metrics (recommended: 4-6)`
        });
    }
    
    // Calculate quality score
    let score = 100;
    score -= issues.length * 20;
    score -= warnings.length * 5;
    score = Math.max(0, score);
    
    return {
        valid: issues.length === 0,
        issues,
        warnings,
        score
    };
}

/**
 * Audit all subcomponents
 */
function auditAllContent() {
    const results = {
        total: 0,
        passed: 0,
        failed: 0,
        criticalIssues: [],
        errors: [],
        warnings: [],
        byScore: {
            excellent: 0,  // 90-100
            good: 0,       // 70-89
            fair: 0,       // 50-69
            poor: 0        // 0-49
        }
    };
    
    console.log('Auditing educational content for all 96 subcomponents...\n');
    
    for (const [id, subName] of Object.entries(SUBCOMPONENT_NAMES)) {
        results.total++;
        
        const content = educationalContent[id];
        const validation = validateContentQuality(id, content, subName);
        
        if (validation.valid) {
            results.passed++;
        } else {
            results.failed++;
        }
        
        // Categorize by score
        if (validation.score >= 90) results.byScore.excellent++;
        else if (validation.score >= 70) results.byScore.good++;
        else if (validation.score >= 50) results.byScore.fair++;
        else results.byScore.poor++;
        
        // Collect issues
        validation.issues.forEach(issue => {
            const entry = { id, subName, ...issue };
            if (issue.severity === 'critical') {
                results.criticalIssues.push(entry);
            } else {
                results.errors.push(entry);
            }
        });
        
        validation.warnings.forEach(warning => {
            results.warnings.push({ id, subName, ...warning });
        });
        
        // Log critical issues immediately
        if (validation.issues.some(i => i.severity === 'critical')) {
            console.log(`❌ CRITICAL: ${id} (${subName})`);
            validation.issues.forEach(issue => {
                if (issue.severity === 'critical') {
                    console.log(`   ${issue.message}`);
                }
            });
        }
    }
    
    return results;
}

/**
 * Print audit results
 */
function printResults(results) {
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('AUDIT RESULTS');
    console.log('═══════════════════════════════════════════════════════════\n');
    
    console.log(`Total Subcomponents: ${results.total}`);
    console.log(`✅ Passed: ${results.passed} (${Math.round(results.passed/results.total*100)}%)`);
    console.log(`❌ Failed: ${results.failed} (${Math.round(results.failed/results.total*100)}%)\n`);
    
    console.log('Quality Distribution:');
    console.log(`  🌟 Excellent (90-100): ${results.byScore.excellent}`);
    console.log(`  ✅ Good (70-89): ${results.byScore.good}`);
    console.log(`  ⚠️  Fair (50-69): ${results.byScore.fair}`);
    console.log(`  ❌ Poor (0-49): ${results.byScore.poor}\n`);
    
    console.log(`Critical Issues: ${results.criticalIssues.length}`);
    console.log(`Errors: ${results.errors.length}`);
    console.log(`Warnings: ${results.warnings.length}\n`);
    
    if (results.criticalIssues.length > 0) {
        console.log('═══════════════════════════════════════════════════════════');
        console.log('🚨 CRITICAL ISSUES (Wrong Content)');
        console.log('═══════════════════════════════════════════════════════════\n');
        
        results.criticalIssues.forEach(issue => {
            console.log(`${issue.id}: ${issue.subName}`);
            console.log(`  Type: ${issue.type}`);
            console.log(`  ${issue.message}`);
            if (issue.forbidden) {
                console.log(`  Forbidden keywords found: ${issue.forbidden.join(', ')}`);
            }
            console.log('');
        });
    }
    
    if (results.errors.length > 0 && results.errors.length <= 20) {
        console.log('═══════════════════════════════════════════════════════════');
        console.log('❌ ERRORS');
        console.log('═══════════════════════════════════════════════════════════\n');
        
        results.errors.slice(0, 20).forEach(error => {
            console.log(`${error.id}: ${error.subName}`);
            console.log(`  ${error.message}`);
            console.log('');
        });
        
        if (results.errors.length > 20) {
            console.log(`... and ${results.errors.length - 20} more errors\n`);
        }
    }
}

/**
 * Generate audit report
 */
function generateAuditReport(results) {
    const report = {
        timestamp: new Date().toISOString(),
        summary: {
            total: results.total,
            passed: results.passed,
            failed: results.failed,
            passRate: Math.round(results.passed/results.total*100)
        },
        qualityDistribution: results.byScore,
        criticalIssues: results.criticalIssues,
        errors: results.errors,
        warnings: results.warnings,
        recommendations: []
    };
    
    // Add recommendations
    if (results.criticalIssues.length > 0) {
        report.recommendations.push({
            priority: 'high',
            action: 'Fix critical content mismatches immediately',
            affected: results.criticalIssues.map(i => i.id)
        });
    }
    
    if (results.byScore.poor > 0) {
        report.recommendations.push({
            priority: 'medium',
            action: 'Regenerate poor quality content using AI',
            affected: results.byScore.poor
        });
    }
    
    return report;
}

// Main execution
if (require.main === module) {
    const results = auditAllContent();
    printResults(results);
    
    // Generate JSON report
    const report = generateAuditReport(results);
    const fs = require('fs');
    fs.writeFileSync(
        'educational-content-audit-report.json',
        JSON.stringify(report, null, 2)
    );
    
    console.log('═══════════════════════════════════════════════════════════');
    console.log('📄 Audit report saved: educational-content-audit-report.json');
    console.log('═══════════════════════════════════════════════════════════\n');
    
    if (results.criticalIssues.length > 0) {
        console.log(`❌ Audit failed: ${results.criticalIssues.length} critical issues found\n`);
        process.exit(1);
    } else if (results.failed > 0) {
        console.log(`⚠️  Audit completed with ${results.failed} failures\n`);
        process.exit(0);
    } else {
        console.log('✅ All content passed quality checks!\n');
        process.exit(0);
    }
}

module.exports = {
    validateContentQuality,
    auditAllContent,
    CONTENT_VALIDATION_RULES
};
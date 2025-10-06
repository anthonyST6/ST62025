#!/usr/bin/env node

/**
 * SSOT Alignment Validator
 * 
 * Validates that all 96 subcomponents have:
 * - Consistent domain names across all sections
 * - Templates defined for their domain
 * - Matching templates in resources and outputs
 * - Complete metadata
 * 
 * Run before commits to ensure SSOT integrity
 */

const { COMPLETE_SSOT_REGISTRY, getSubcomponent } = require('./complete-ssot-registry.js');
const { DOMAIN_TEMPLATE_MAPPING, validateTemplateRegistry } = require('./template-registry.js');

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║  SSOT Alignment Validator                                  ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

/**
 * Validate all subcomponents
 */
function validateAllSubcomponents() {
    const errors = [];
    const warnings = [];
    let passCount = 0;
    
    console.log('Validating all 96 subcomponents...\n');
    
    for (const [id, data] of Object.entries(COMPLETE_SSOT_REGISTRY)) {
        const checks = {
            domainConsistency: checkDomainConsistency(id, data),
            templatesExist: checkTemplatesExist(id, data),
            templatesMatch: checkTemplatesMatch(id, data),
            completeness: checkCompleteness(id, data)
        };
        
        const allPassed = Object.values(checks).every(c => c.passed);
        
        if (allPassed) {
            passCount++;
        } else {
            Object.values(checks).forEach(check => {
                if (!check.passed) {
                    if (check.severity === 'error') {
                        errors.push({ id, ...check });
                    } else {
                        warnings.push({ id, ...check });
                    }
                }
            });
        }
    }
    
    return { errors, warnings, passCount };
}

/**
 * Check domain consistency across all sections
 */
function checkDomainConsistency(id, data) {
    const domains = [
        data.agent.domain,
        data.education.title,
        data.workspace.domain,
        data.analysis.domain,
        data.resources.domain,
        data.outputs.domain
    ];
    
    const uniqueDomains = [...new Set(domains)];
    
    if (uniqueDomains.length > 1) {
        return {
            passed: false,
            severity: 'error',
            check: 'domainConsistency',
            message: 'Domain mismatch across sections',
            details: { 
                expected: data.name,
                found: uniqueDomains 
            }
        };
    }
    
    if (uniqueDomains[0] !== data.name) {
        return {
            passed: false,
            severity: 'error',
            check: 'domainConsistency',
            message: 'Domain does not match subcomponent name',
            details: { 
                expected: data.name, 
                actual: uniqueDomains[0] 
            }
        };
    }
    
    return { passed: true };
}

/**
 * Check that templates exist for domain
 */
function checkTemplatesExist(id, data) {
    const templates = DOMAIN_TEMPLATE_MAPPING[data.name];
    
    if (!templates || templates.length === 0) {
        return {
            passed: false,
            severity: 'error',
            check: 'templatesExist',
            message: 'No templates defined for domain',
            details: { domain: data.name }
        };
    }
    
    if (templates.length < 3) {
        return {
            passed: false,
            severity: 'warning',
            check: 'templatesExist',
            message: `Only ${templates.length} templates (expected 3)`,
            details: { 
                domain: data.name,
                count: templates.length 
            }
        };
    }
    
    return { passed: true };
}

/**
 * Check that templates match between resources and outputs
 */
function checkTemplatesMatch(id, data) {
    const resourceTemplates = JSON.stringify(data.resources.templates);
    const outputTemplates = JSON.stringify(data.outputs.templates);
    
    if (resourceTemplates !== outputTemplates) {
        return {
            passed: false,
            severity: 'error',
            check: 'templatesMatch',
            message: 'Templates mismatch between resources and outputs',
            details: {
                resources: data.resources.templates,
                outputs: data.outputs.templates
            }
        };
    }
    
    // Check if templates are empty
    if (data.resources.templates.length === 0) {
        return {
            passed: false,
            severity: 'error',
            check: 'templatesMatch',
            message: 'No templates in resources or outputs',
            details: { domain: data.name }
        };
    }
    
    return { passed: true };
}

/**
 * Check completeness metadata
 */
function checkCompleteness(id, data) {
    if (!data.meta.completeness.isComplete) {
        return {
            passed: false,
            severity: 'warning',
            check: 'completeness',
            message: 'Subcomponent marked as incomplete',
            details: data.meta.completeness
        };
    }
    
    return { passed: true };
}

/**
 * Print validation results
 */
function printResults(results) {
    console.log('═══════════════════════════════════════════════════════════');
    console.log('VALIDATION RESULTS');
    console.log('═══════════════════════════════════════════════════════════\n');
    console.log(`Total Subcomponents: 96`);
    console.log(`✅ Passed: ${results.passCount} (${Math.round(results.passCount/96*100)}%)`);
    console.log(`❌ Errors: ${results.errors.length}`);
    console.log(`⚠️  Warnings: ${results.warnings.length}\n`);
    
    if (results.errors.length > 0) {
        console.log('═══════════════════════════════════════════════════════════');
        console.log('❌ ERRORS');
        console.log('═══════════════════════════════════════════════════════════\n');
        
        results.errors.forEach(err => {
            console.log(`${err.id}: ${err.message}`);
            if (err.details) {
                console.log(`  Details: ${JSON.stringify(err.details, null, 2)}`);
            }
            console.log('');
        });
    }
    
    if (results.warnings.length > 0) {
        console.log('═══════════════════════════════════════════════════════════');
        console.log('⚠️  WARNINGS');
        console.log('═══════════════════════════════════════════════════════════\n');
        
        results.warnings.forEach(warn => {
            console.log(`${warn.id}: ${warn.message}`);
            if (warn.details) {
                console.log(`  Details: ${JSON.stringify(warn.details, null, 2)}`);
            }
            console.log('');
        });
    }
}

/**
 * Validate specific subcomponent
 */
function validateSubcomponent(subcomponentId) {
    try {
        const data = getSubcomponent(subcomponentId);
        
        console.log(`\nValidating ${subcomponentId}: ${data.name}\n`);
        
        const checks = {
            domainConsistency: checkDomainConsistency(subcomponentId, data),
            templatesExist: checkTemplatesExist(subcomponentId, data),
            templatesMatch: checkTemplatesMatch(subcomponentId, data),
            completeness: checkCompleteness(subcomponentId, data)
        };
        
        Object.entries(checks).forEach(([checkName, result]) => {
            if (result.passed) {
                console.log(`✅ ${checkName}: PASSED`);
            } else {
                const icon = result.severity === 'error' ? '❌' : '⚠️';
                console.log(`${icon} ${checkName}: ${result.message}`);
                if (result.details) {
                    console.log(`   ${JSON.stringify(result.details, null, 2)}`);
                }
            }
        });
        
        const allPassed = Object.values(checks).every(c => c.passed);
        console.log(`\n${allPassed ? '✅' : '❌'} Overall: ${allPassed ? 'PASSED' : 'FAILED'}\n`);
        
        return allPassed;
        
    } catch (error) {
        console.error(`❌ Error validating ${subcomponentId}:`, error.message);
        return false;
    }
}

// Main execution
if (require.main === module) {
    const args = process.argv.slice(2);
    
    if (args.length > 0) {
        // Validate specific subcomponent
        const subcomponentId = args[0];
        const passed = validateSubcomponent(subcomponentId);
        process.exit(passed ? 0 : 1);
    } else {
        // Validate all subcomponents
        const results = validateAllSubcomponents();
        printResults(results);
        
        if (results.errors.length > 0) {
            console.log('═══════════════════════════════════════════════════════════');
            console.log(`❌ Validation failed with ${results.errors.length} errors`);
            console.log('═══════════════════════════════════════════════════════════\n');
            process.exit(1);
        } else {
            console.log('═══════════════════════════════════════════════════════════');
            console.log('✅ All validations passed!');
            console.log('═══════════════════════════════════════════════════════════\n');
            process.exit(0);
        }
    }
}

module.exports = { 
    validateAllSubcomponents,
    validateSubcomponent,
    checkDomainConsistency,
    checkTemplatesExist,
    checkTemplatesMatch,
    checkCompleteness
};
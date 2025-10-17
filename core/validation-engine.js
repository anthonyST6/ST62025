/**
 * ScaleOps6 Validation Engine
 * 
 * Enforces consistency across all layers by validating against SSOT registry.
 * Blocks operations if critical misalignments are detected.
 * 
 * Created: 2025-10-06
 * Purpose: Prevent domain misalignment across system layers
 */

const { SUBCOMPONENT_REGISTRY, validateDomain } = require('./subcomponent-registry.js');

/**
 * Validation Error Class
 */
class ValidationError extends Error {
    constructor(message, errors = []) {
        super(message);
        this.name = 'ValidationError';
        this.errors = errors;
        this.timestamp = new Date().toISOString();
    }
}

/**
 * Base Validator Class
 */
class BaseValidator {
    constructor(name) {
        this.name = name;
        this.errors = [];
    }
    
    async validate(registry) {
        throw new Error('validate() must be implemented by subclass');
    }
    
    addError(error) {
        this.errors.push({
            ...error,
            validator: this.name,
            timestamp: new Date().toISOString()
        });
    }
    
    getResults() {
        return {
            validator: this.name,
            passed: this.errors.length === 0,
            errorCount: this.errors.length,
            errors: this.errors
        };
    }
}

/**
 * Validator 1: Agent Domain Alignment
 * Ensures agent mapping uses correct domains
 */
class AgentDomainValidator extends BaseValidator {
    constructor() {
        super('AgentDomainValidator');
    }
    
    async validate(registry) {
        this.errors = [];
        
        try {
            const agentMapping = require('../agent-subcomponent-mapping.js').agentMapping;
            
            for (const [id, subcomponent] of Object.entries(registry)) {
                const agentData = agentMapping[id];
                
                if (!agentData) {
                    this.addError({
                        type: 'MISSING_AGENT_MAPPING',
                        subcomponentId: id,
                        subcomponentName: subcomponent.name,
                        severity: 'CRITICAL',
                        message: `No agent mapping found for ${id}: ${subcomponent.name}`
                    });
                    continue;
                }
                
                // Check if agent role matches subcomponent name
                if (agentData.role && agentData.role !== subcomponent.name) {
                    this.addError({
                        type: 'AGENT_ROLE_MISMATCH',
                        subcomponentId: id,
                        expected: subcomponent.name,
                        actual: agentData.role,
                        agentName: agentData.name,
                        severity: 'CRITICAL',
                        message: `Agent role "${agentData.role}" doesn't match subcomponent "${subcomponent.name}"`
                    });
                }
            }
        } catch (error) {
            this.addError({
                type: 'VALIDATOR_ERROR',
                severity: 'CRITICAL',
                message: `Failed to load agent mapping: ${error.message}`
            });
        }
        
        return this.getResults();
    }
}

/**
 * Validator 2: Question Domain Alignment
 * Ensures question library uses correct domains
 */
class QuestionDomainValidator extends BaseValidator {
    constructor() {
        super('QuestionDomainValidator');
    }
    
    async validate(registry) {
        this.errors = [];
        
        try {
            const agentQuestions = require('../agent-generated-questions-complete.js');
            
            for (const [id, subcomponent] of Object.entries(registry)) {
                const questions = agentQuestions[id];
                
                if (!questions) {
                    this.addError({
                        type: 'MISSING_QUESTIONS',
                        subcomponentId: id,
                        subcomponentName: subcomponent.name,
                        severity: 'CRITICAL',
                        message: `No questions found for ${id}: ${subcomponent.name}`
                    });
                    continue;
                }
                
                // Check if question domain matches subcomponent name
                if (questions.domain !== subcomponent.name) {
                    this.addError({
                        type: 'QUESTION_DOMAIN_MISMATCH',
                        subcomponentId: id,
                        expected: subcomponent.name,
                        actual: questions.domain,
                        severity: 'CRITICAL',
                        message: `Question domain "${questions.domain}" doesn't match subcomponent "${subcomponent.name}"`
                    });
                }
                
                // Check if question content is relevant
                const relevanceScore = this.checkQuestionRelevance(
                    questions.questions || [],
                    subcomponent.name
                );
                
                if (relevanceScore < 0.3) {  // Less than 30% relevant
                    this.addError({
                        type: 'QUESTION_CONTENT_IRRELEVANT',
                        subcomponentId: id,
                        domain: subcomponent.name,
                        relevanceScore: Math.round(relevanceScore * 100),
                        severity: 'HIGH',
                        message: `Only ${Math.round(relevanceScore * 100)}% of questions are relevant to "${subcomponent.name}"`
                    });
                }
            }
        } catch (error) {
            this.addError({
                type: 'VALIDATOR_ERROR',
                severity: 'CRITICAL',
                message: `Failed to load questions: ${error.message}`
            });
        }
        
        return this.getResults();
    }
    
    checkQuestionRelevance(questions, domain) {
        if (!questions || questions.length === 0) return 0;
        
        const domainKeywords = domain.toLowerCase()
            .split(/[\s\-\/&]+/)
            .filter(word => word.length > 3);  // Ignore short words
        
        let relevantQuestions = 0;
        
        questions.forEach(q => {
            const questionText = (q.text + ' ' + (q.hint || '')).toLowerCase();
            const hasKeyword = domainKeywords.some(kw => questionText.includes(kw));
            if (hasKeyword) relevantQuestions++;
        });
        
        return relevantQuestions / questions.length;
    }
}

/**
 * Validator 3: Educational Content Alignment
 * Ensures educational content titles match subcomponent names
 */
class EducationalContentValidator extends BaseValidator {
    constructor() {
        super('EducationalContentValidator');
    }
    
    async validate(registry) {
        this.errors = [];
        
        try {
            const { educationalContent } = require('../educational-content.js');
            
            for (const [id, subcomponent] of Object.entries(registry)) {
                const content = educationalContent[id];
                
                if (!content) {
                    this.addError({
                        type: 'MISSING_EDUCATIONAL_CONTENT',
                        subcomponentId: id,
                        subcomponentName: subcomponent.name,
                        severity: 'HIGH',
                        message: `No educational content found for ${id}: ${subcomponent.name}`
                    });
                    continue;
                }
                
                // Check if title matches subcomponent name
                if (content.title !== subcomponent.name) {
                    this.addError({
                        type: 'EDUCATION_TITLE_MISMATCH',
                        subcomponentId: id,
                        expected: subcomponent.name,
                        actual: content.title,
                        severity: 'CRITICAL',
                        message: `Education title "${content.title}" doesn't match subcomponent "${subcomponent.name}"`
                    });
                }
            }
        } catch (error) {
            this.addError({
                type: 'VALIDATOR_ERROR',
                severity: 'CRITICAL',
                message: `Failed to load educational content: ${error.message}`
            });
        }
        
        return this.getResults();
    }
}

/**
 * Validator 4: Template Domain Alignment
 * Ensures templates reference correct domains
 */
class TemplateDomainValidator extends BaseValidator {
    constructor() {
        super('TemplateDomainValidator');
    }
    
    async validate(registry) {
        this.errors = [];
        
        try {
            const { educationalContent } = require('../educational-content.js');
            
            for (const [id, subcomponent] of Object.entries(registry)) {
                const content = educationalContent[id];
                
                if (!content || !content.templates) continue;
                
                // Check if template names reference the subcomponent
                content.templates.forEach((templateName, index) => {
                    const nameLower = subcomponent.name.toLowerCase();
                    const templateLower = templateName.toLowerCase();
                    
                    // Template should contain at least one keyword from subcomponent name
                    const keywords = nameLower.split(/[\s\-\/&]+/).filter(w => w.length > 3);
                    const hasKeyword = keywords.some(kw => templateLower.includes(kw));
                    
                    if (!hasKeyword && templateName !== 'General Template') {
                        this.addError({
                            type: 'TEMPLATE_NAME_IRRELEVANT',
                            subcomponentId: id,
                            subcomponentName: subcomponent.name,
                            templateName,
                            templateIndex: index,
                            severity: 'MEDIUM',
                            message: `Template "${templateName}" doesn't reference "${subcomponent.name}"`
                        });
                    }
                });
            }
        } catch (error) {
            this.addError({
                type: 'VALIDATOR_ERROR',
                severity: 'MEDIUM',
                message: `Failed to validate templates: ${error.message}`
            });
        }
        
        return this.getResults();
    }
}

/**
 * Main Validation Engine
 */
class ValidationEngine {
    constructor(registry = SUBCOMPONENT_REGISTRY) {
        this.registry = registry;
        this.validators = [
            new AgentDomainValidator(),
            new QuestionDomainValidator(),
            new EducationalContentValidator(),
            new TemplateDomainValidator()
        ];
        this.results = null;
    }
    
    /**
     * Run all validators
     */
    async validate() {
        console.log('🔍 Running validation engine...\n');
        
        const results = {
            timestamp: new Date().toISOString(),
            registry: {
                total: Object.keys(this.registry).length,
                version: '1.0.0'
            },
            validators: [],
            summary: {
                totalErrors: 0,
                criticalErrors: 0,
                highErrors: 0,
                mediumErrors: 0,
                lowErrors: 0
            },
            passed: true
        };
        
        // Run each validator
        for (const validator of this.validators) {
            console.log(`  Running ${validator.name}...`);
            const result = await validator.validate(this.registry);
            results.validators.push(result);
            
            // Count errors by severity
            result.errors.forEach(error => {
                results.summary.totalErrors++;
                const severity = error.severity.toLowerCase();
                results.summary[`${severity}Errors`]++;
            });
            
            if (!result.passed) {
                results.passed = false;
                console.log(`    ❌ ${result.errorCount} errors found`);
            } else {
                console.log(`    ✅ Passed`);
            }
        }
        
        this.results = results;
        return results;
    }
    
    /**
     * Enforce validation - throws if validation fails
     */
    async enforceValidation() {
        const results = await this.validate();
        
        if (!results.passed) {
            const criticalErrors = results.validators
                .flatMap(v => v.errors)
                .filter(e => e.severity === 'CRITICAL');
            
            throw new ValidationError(
                `Validation failed: ${results.summary.totalErrors} errors (${results.summary.criticalErrors} critical)`,
                criticalErrors
            );
        }
        
        return results;
    }
    
    /**
     * Generate validation report
     */
    generateReport() {
        if (!this.results) {
            return 'No validation results available. Run validate() first.';
        }
        
        let report = '╔════════════════════════════════════════════════════════════╗\n';
        report += '║         SUBCOMPONENT VALIDATION REPORT                     ║\n';
        report += '╚════════════════════════════════════════════════════════════╝\n\n';
        
        report += `Timestamp: ${this.results.timestamp}\n`;
        report += `Registry: ${this.results.registry.total} subcomponents (v${this.results.registry.version})\n`;
        report += `Status: ${this.results.passed ? '✅ PASSED' : '❌ FAILED'}\n\n`;
        
        report += '─────────────────────────────────────────────────────────────\n';
        report += 'SUMMARY\n';
        report += '─────────────────────────────────────────────────────────────\n';
        report += `Total Errors: ${this.results.summary.totalErrors}\n`;
        report += `  Critical: ${this.results.summary.criticalErrors}\n`;
        report += `  High:     ${this.results.summary.highErrors}\n`;
        report += `  Medium:   ${this.results.summary.mediumErrors}\n`;
        report += `  Low:      ${this.results.summary.lowErrors}\n\n`;
        
        // Validator results
        this.results.validators.forEach(validator => {
            report += '─────────────────────────────────────────────────────────────\n';
            report += `${validator.passed ? '✅' : '❌'} ${validator.validator}\n`;
            report += '─────────────────────────────────────────────────────────────\n';
            
            if (validator.errors.length === 0) {
                report += '  No errors found\n\n';
            } else {
                report += `  ${validator.errors.length} errors found:\n\n`;
                
                // Group errors by type
                const errorsByType = validator.errors.reduce((acc, error) => {
                    acc[error.type] = acc[error.type] || [];
                    acc[error.type].push(error);
                    return acc;
                }, {});
                
                Object.entries(errorsByType).forEach(([type, errors]) => {
                    report += `  ${type} (${errors.length}):\n`;
                    errors.slice(0, 5).forEach(error => {  // Show first 5 of each type
                        report += `    • ${error.subcomponentId}: ${error.message}\n`;
                    });
                    if (errors.length > 5) {
                        report += `    ... and ${errors.length - 5} more\n`;
                    }
                    report += '\n';
                });
            }
        });
        
        return report;
    }
    
    /**
     * Get errors by severity
     */
    getErrorsBySeverity(severity) {
        if (!this.results) return [];
        
        return this.results.validators
            .flatMap(v => v.errors)
            .filter(e => e.severity === severity);
    }
    
    /**
     * Get errors for specific subcomponent
     */
    getErrorsForSubcomponent(subcomponentId) {
        if (!this.results) return [];
        
        return this.results.validators
            .flatMap(v => v.errors)
            .filter(e => e.subcomponentId === subcomponentId);
    }
}

/**
 * Startup Validator
 * Runs on server startup and blocks if critical errors found
 */
class StartupValidator {
    constructor() {
        this.engine = new ValidationEngine();
    }
    
    async run() {
        console.log('\n╔════════════════════════════════════════════════════════════╗');
        console.log('║  ScaleOps6 Startup Validation                              ║');
        console.log('╚════════════════════════════════════════════════════════════╝\n');
        
        try {
            const results = await this.engine.validate();
            
            console.log('\n' + this.engine.generateReport());
            
            // Check for critical errors
            const criticalErrors = this.engine.getErrorsBySeverity('CRITICAL');
            
            if (criticalErrors.length > 0) {
                console.error('\n❌ CRITICAL ERRORS DETECTED - SERVER STARTUP BLOCKED\n');
                console.error('The following critical issues must be fixed before the server can start:\n');
                
                criticalErrors.forEach((error, index) => {
                    console.error(`${index + 1}. [${error.subcomponentId}] ${error.message}`);
                });
                
                console.error('\n📋 Fix these issues and restart the server.');
                console.error('💡 See SYSTEMIC_ARCHITECTURE_ANALYSIS.md for guidance.\n');
                
                process.exit(1);  // Block server startup
            }
            
            // Warn about high-severity errors but allow startup
            const highErrors = this.engine.getErrorsBySeverity('HIGH');
            if (highErrors.length > 0) {
                console.warn('\n⚠️  HIGH SEVERITY WARNINGS DETECTED\n');
                console.warn(`${highErrors.length} high-severity issues found. Server will start but these should be addressed soon.\n`);
            }
            
            console.log('\n✅ Validation passed - Server startup allowed\n');
            return results;
            
        } catch (error) {
            console.error('\n❌ VALIDATION ENGINE FAILURE\n');
            console.error(error.message);
            console.error('\nServer startup blocked due to validation system failure.\n');
            process.exit(1);
        }
    }
}

/**
 * Runtime Validator
 * Validates before displaying content to users
 */
class RuntimeValidator {
    static validateBeforeDisplay(subcomponentId, contentType, content) {
        const subcomponent = SUBCOMPONENT_REGISTRY[subcomponentId];
        
        if (!subcomponent) {
            throw new ValidationError(
                `Invalid subcomponent ID: ${subcomponentId}`,
                [{ type: 'INVALID_ID', subcomponentId, severity: 'CRITICAL' }]
            );
        }
        
        // Validate domain based on content type
        let domain;
        switch (contentType) {
            case 'questions':
                domain = content.domain;
                break;
            case 'education':
                domain = content.title;
                break;
            case 'template':
                domain = content.name;
                break;
            default:
                return { valid: true };  // Unknown type, skip validation
        }
        
        const validation = validateDomain(subcomponentId, domain, contentType);
        
        if (!validation.valid) {
            console.error(`❌ Runtime validation failed for ${subcomponentId}:`, validation.error);
            throw new ValidationError(
                `Domain mismatch in ${contentType} for ${subcomponentId}`,
                [validation.error]
            );
        }
        
        return validation;
    }
}

/**
 * Write Validator
 * Validates before saving new data
 */
class WriteValidator {
    static validateBeforeWrite(subcomponentId, dataType, data) {
        const subcomponent = SUBCOMPONENT_REGISTRY[subcomponentId];
        
        if (!subcomponent) {
            throw new ValidationError(
                `Cannot write data for invalid subcomponent: ${subcomponentId}`,
                [{ type: 'INVALID_ID', subcomponentId, severity: 'CRITICAL' }]
            );
        }
        
        // Ensure data references correct domain
        if (data.domain && data.domain !== subcomponent.name) {
            throw new ValidationError(
                `Cannot write data with mismatched domain`,
                [{
                    type: 'WRITE_DOMAIN_MISMATCH',
                    subcomponentId,
                    dataType,
                    expected: subcomponent.name,
                    actual: data.domain,
                    severity: 'CRITICAL'
                }]
            );
        }
        
        return { valid: true, subcomponent };
    }
}

// Export validators
module.exports = {
    ValidationEngine,
    ValidationError,
    AgentDomainValidator,
    QuestionDomainValidator,
    EducationalContentValidator,
    TemplateDomainValidator,
    StartupValidator,
    RuntimeValidator,
    WriteValidator
};

// Make available in browser
if (typeof window !== 'undefined') {
    window.ValidationEngine = ValidationEngine;
    window.RuntimeValidator = RuntimeValidator;
}
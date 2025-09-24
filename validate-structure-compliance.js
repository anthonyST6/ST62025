// ScaleOps6 Platform - Structure Compliance Validator
// This script validates that all pages follow the locked template structure

const fs = require('fs');
const path = require('path');

// Import the locked template configuration
const TEMPLATE_CONFIG = require('./template-config.js');

class StructureValidator {
    constructor() {
        this.errors = [];
        this.warnings = [];
        this.validated = 0;
        this.passed = 0;
        this.failed = 0;
    }

    // Validate a single HTML file
    validateHTMLFile(filePath) {
        const content = fs.readFileSync(filePath, 'utf8');
        const fileName = path.basename(filePath);
        const issues = [];

        console.log(`\n📋 Validating: ${fileName}`);

        // Check for required tab structure (5 tabs exactly)
        const tabMatches = content.match(/class="tab-button[^"]*"/g);
        if (tabMatches) {
            const tabCount = tabMatches.length;
            if (tabCount !== 5) {
                issues.push(`❌ Tab count violation: Found ${tabCount} tabs, expected exactly 5`);
                this.errors.push({ file: fileName, error: `Incorrect tab count: ${tabCount}` });
            } else {
                console.log('  ✅ Tab structure: 5 tabs present');
            }
        }

        // Check for worksheet fields (6 fields exactly)
        const fieldMatches = content.match(/class="worksheet-field[^"]*"/g);
        if (fieldMatches) {
            const fieldCount = fieldMatches.length;
            if (fieldCount !== 6) {
                issues.push(`❌ Worksheet field violation: Found ${fieldCount} fields, expected exactly 6`);
                this.errors.push({ file: fileName, error: `Incorrect field count: ${fieldCount}` });
            } else {
                console.log('  ✅ Worksheet structure: 6 fields present');
            }
        }

        // Check for scoring dimensions (5 dimensions)
        if (content.includes('detailedScores')) {
            const dimensionMatches = content.match(/dimension\d+/g);
            if (dimensionMatches) {
                const uniqueDimensions = [...new Set(dimensionMatches)];
                if (uniqueDimensions.length !== 5) {
                    issues.push(`❌ Scoring dimension violation: Found ${uniqueDimensions.length} dimensions, expected exactly 5`);
                    this.errors.push({ file: fileName, error: `Incorrect dimension count: ${uniqueDimensions.length}` });
                } else {
                    console.log('  ✅ Scoring structure: 5 dimensions present');
                }
            }
        }

        // Check for required visual theme colors
        const requiredColors = ['#FF5500', '#000000', '#4CAF50', '#FF9800', '#F44336'];
        requiredColors.forEach(color => {
            if (!content.includes(color)) {
                this.warnings.push({ file: fileName, warning: `Missing theme color: ${color}` });
            }
        });

        // Check for required sections
        const requiredSections = [
            'education-content',
            'workspace-content',
            'analysis-content',
            'resources-content',
            'history-content'
        ];

        requiredSections.forEach(section => {
            if (!content.includes(section)) {
                issues.push(`❌ Missing required section: ${section}`);
                this.errors.push({ file: fileName, error: `Missing section: ${section}` });
            }
        });

        // Update counters
        this.validated++;
        if (issues.length === 0) {
            this.passed++;
            console.log('  ✅ PASSED - Structure compliant');
        } else {
            this.failed++;
            console.log('  ❌ FAILED - Structure violations found:');
            issues.forEach(issue => console.log(`    ${issue}`));
        }

        return issues.length === 0;
    }

    // Validate all block pages
    validateBlockPages() {
        console.log('\n🎯 VALIDATING BLOCK PAGES\n' + '='.repeat(50));
        
        const blockFiles = [];
        for (let i = 1; i <= 16; i++) {
            const fileName = `block-${i}-*.html`;
            const files = fs.readdirSync('.').filter(f => f.startsWith(`block-${i}-`) && f.endsWith('.html'));
            blockFiles.push(...files);
        }

        blockFiles.forEach(file => {
            if (fs.existsSync(file)) {
                this.validateHTMLFile(file);
            }
        });
    }

    // Validate all subcomponent pages
    validateSubcomponentPages() {
        console.log('\n📝 VALIDATING SUBCOMPONENT PAGES\n' + '='.repeat(50));
        
        const subcomponentFiles = fs.readdirSync('.')
            .filter(f => f.startsWith('subcomponent-') && f.endsWith('.html'));

        subcomponentFiles.forEach(file => {
            this.validateHTMLFile(file);
        });
    }

    // Validate template configuration integrity
    validateTemplateConfig() {
        console.log('\n🔒 VALIDATING TEMPLATE CONFIGURATION\n' + '='.repeat(50));
        
        const checks = [
            { name: 'Main Page Structure', obj: TEMPLATE_CONFIG.mainPageStructure, frozen: Object.isFrozen(TEMPLATE_CONFIG.mainPageStructure) },
            { name: 'Block Structure', obj: TEMPLATE_CONFIG.blockStructure, frozen: Object.isFrozen(TEMPLATE_CONFIG.blockStructure) },
            { name: 'Subcomponent Structure', obj: TEMPLATE_CONFIG.subcomponentStructure, frozen: Object.isFrozen(TEMPLATE_CONFIG.subcomponentStructure) },
            { name: 'Agent Integration', obj: TEMPLATE_CONFIG.agentIntegration, frozen: Object.isFrozen(TEMPLATE_CONFIG.agentIntegration) },
            { name: 'Scoring Engine', obj: TEMPLATE_CONFIG.scoringEngineStructure, frozen: Object.isFrozen(TEMPLATE_CONFIG.scoringEngineStructure) },
            { name: 'Visual Theme', obj: TEMPLATE_CONFIG.visualTheme, frozen: Object.isFrozen(TEMPLATE_CONFIG.visualTheme) }
        ];

        checks.forEach(check => {
            if (check.frozen) {
                console.log(`  ✅ ${check.name}: FROZEN (immutable)`);
            } else {
                console.log(`  ❌ ${check.name}: NOT FROZEN (vulnerable to changes)`);
                this.errors.push({ config: check.name, error: 'Not frozen' });
            }
        });

        // Verify critical values
        console.log('\n📊 Verifying Critical Values:');
        
        const criticalValues = [
            { name: 'Tab Count', value: TEMPLATE_CONFIG.subcomponentStructure.tabs.length, expected: 5 },
            { name: 'Worksheet Fields', value: TEMPLATE_CONFIG.subcomponentStructure.worksheetFields.length, expected: 6 },
            { name: 'Scoring Dimensions', value: TEMPLATE_CONFIG.scoringEngineStructure.dimensions, expected: 5 },
            { name: 'Max Score Per Dimension', value: TEMPLATE_CONFIG.scoringEngineStructure.maxScorePerDimension, expected: 20 },
            { name: 'Total Max Score', value: TEMPLATE_CONFIG.scoringEngineStructure.totalMaxScore, expected: 100 }
        ];

        criticalValues.forEach(val => {
            if (val.value === val.expected) {
                console.log(`  ✅ ${val.name}: ${val.value} (correct)`);
            } else {
                console.log(`  ❌ ${val.name}: ${val.value} (expected ${val.expected})`);
                this.errors.push({ value: val.name, error: `Incorrect value: ${val.value}` });
            }
        });
    }

    // Generate compliance report
    generateReport() {
        console.log('\n' + '='.repeat(60));
        console.log('📊 STRUCTURE COMPLIANCE REPORT');
        console.log('='.repeat(60));
        
        console.log(`\n📈 Summary:`);
        console.log(`  Total Files Validated: ${this.validated}`);
        console.log(`  Passed: ${this.passed} ✅`);
        console.log(`  Failed: ${this.failed} ❌`);
        console.log(`  Compliance Rate: ${this.validated > 0 ? ((this.passed / this.validated) * 100).toFixed(1) : 0}%`);
        
        if (this.errors.length > 0) {
            console.log(`\n❌ Errors Found (${this.errors.length}):`);
            this.errors.forEach((err, idx) => {
                if (err.file) {
                    console.log(`  ${idx + 1}. ${err.file}: ${err.error}`);
                } else if (err.config) {
                    console.log(`  ${idx + 1}. Config - ${err.config}: ${err.error}`);
                } else if (err.value) {
                    console.log(`  ${idx + 1}. Value - ${err.value}: ${err.error}`);
                }
            });
        }
        
        if (this.warnings.length > 0) {
            console.log(`\n⚠️ Warnings (${this.warnings.length}):`);
            this.warnings.forEach((warn, idx) => {
                console.log(`  ${idx + 1}. ${warn.file}: ${warn.warning}`);
            });
        }
        
        if (this.errors.length === 0 && this.warnings.length === 0) {
            console.log('\n✅ ALL STRUCTURES ARE COMPLIANT!');
            console.log('The locked template structure is being followed correctly.');
        } else {
            console.log('\n⚠️ COMPLIANCE ISSUES DETECTED!');
            console.log('Please review and fix the violations listed above.');
            console.log('Refer to LOCKED_STRUCTURE_DOCUMENTATION.md for guidance.');
        }
        
        console.log('\n' + '='.repeat(60));
        console.log('Validation completed at:', new Date().toISOString());
        console.log('='.repeat(60) + '\n');

        // Return status code
        return this.errors.length === 0 ? 0 : 1;
    }

    // Run full validation
    runFullValidation() {
        console.log('\n🚀 SCALEOPS6 STRUCTURE COMPLIANCE VALIDATOR');
        console.log('Version 1.0.0 - Enforcing Locked Templates');
        console.log('='.repeat(60));
        
        // Validate template configuration
        this.validateTemplateConfig();
        
        // Validate block pages
        this.validateBlockPages();
        
        // Validate subcomponent pages
        this.validateSubcomponentPages();
        
        // Generate report
        const exitCode = this.generateReport();
        
        // Save report to file
        const report = {
            timestamp: new Date().toISOString(),
            validated: this.validated,
            passed: this.passed,
            failed: this.failed,
            complianceRate: this.validated > 0 ? ((this.passed / this.validated) * 100).toFixed(1) : 0,
            errors: this.errors,
            warnings: this.warnings
        };
        
        fs.writeFileSync('structure-compliance-report.json', JSON.stringify(report, null, 2));
        console.log('📄 Report saved to: structure-compliance-report.json\n');
        
        return exitCode;
    }
}

// Run validation if executed directly
if (require.main === module) {
    const validator = new StructureValidator();
    const exitCode = validator.runFullValidation();
    
    // Exit with appropriate code
    process.exit(exitCode);
}

// Export for use in other scripts
module.exports = StructureValidator;
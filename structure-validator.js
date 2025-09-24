/**
 * Structure Validator - Ensures NO structural changes to the platform
 * This script validates that all pages maintain the LOCKED structure
 */

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Define the LOCKED structure patterns
const LOCKED_STRUCTURES = {
    'subcomponent-detail': {
        requiredElements: [
            '.subcomponent-header',
            '.subcomponent-number',
            '.subcomponent-title',
            '.subcomponent-description',
            '.tab-navigation',
            '.tab-button[data-tab="education"]',
            '.tab-button[data-tab="workspace"]',
            '.tab-button[data-tab="analysis"]',
            '.tab-button[data-tab="resources"]',
            '.tab-button[data-tab="history"]',
            '#education-tab',
            '#workspace-tab',
            '#analysis-tab',
            '#resources-tab',
            '#history-tab',
            '.worksheet-builder',
            '.upload-zone',
            '.action-buttons'
        ],
        tabCount: 5,
        worksheetFieldCount: 6
    },
    'block-detail': {
        requiredElements: [
            '.block-header',
            '.block-number',
            '.block-title',
            '.block-description',
            '.block-score',
            '.progress-container',
            '.progress-bar',
            '.progress-fill',
            '.subblocks-container',
            '.subblocks-grid',
            '.score-history-section',
            '.change-log-section',
            '#scoreChart'
        ],
        subblockCount: 6
    },
    'admin': {
        requiredElements: [
            '.stats-grid',
            '.stat-card',
            '.section',
            '.table'
        ],
        phaseCount: 5,
        blockCount: 16
    }
};

class StructureValidator {
    constructor() {
        this.violations = [];
        this.warnings = [];
    }

    /**
     * Validate a single HTML file against locked structure
     */
    validateFile(filePath) {
        const fileName = path.basename(filePath);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const $ = cheerio.load(fileContent);
        
        console.log(`\n🔍 Validating: ${fileName}`);
        
        // Determine file type
        let structureType = null;
        if (fileName.includes('subcomponent')) {
            structureType = 'subcomponent-detail';
        } else if (fileName.includes('block-detail')) {
            structureType = 'block-detail';
        } else if (fileName === 'admin.html') {
            structureType = 'admin';
        }
        
        if (!structureType) {
            console.log(`   ⚠️  Skipping - not a structured page`);
            return true;
        }
        
        const structure = LOCKED_STRUCTURES[structureType];
        let isValid = true;
        
        // Check required elements
        console.log(`   Checking required elements...`);
        for (const selector of structure.requiredElements) {
            if ($(selector).length === 0) {
                this.violations.push({
                    file: fileName,
                    type: 'MISSING_ELEMENT',
                    selector: selector,
                    message: `Required element missing: ${selector}`
                });
                console.log(`   ❌ Missing: ${selector}`);
                isValid = false;
            }
        }
        
        // Type-specific validations
        if (structureType === 'subcomponent-detail') {
            // Check tab count
            const tabCount = $('.tab-button').length;
            if (tabCount !== structure.tabCount) {
                this.violations.push({
                    file: fileName,
                    type: 'INCORRECT_TAB_COUNT',
                    expected: structure.tabCount,
                    actual: tabCount,
                    message: `Tab count mismatch: expected ${structure.tabCount}, found ${tabCount}`
                });
                console.log(`   ❌ Tab count: ${tabCount} (expected ${structure.tabCount})`);
                isValid = false;
            }
            
            // Check worksheet fields
            const fieldCount = $('.worksheet-field').length;
            if (fieldCount > 0 && fieldCount !== structure.worksheetFieldCount) {
                this.violations.push({
                    file: fileName,
                    type: 'INCORRECT_FIELD_COUNT',
                    expected: structure.worksheetFieldCount,
                    actual: fieldCount,
                    message: `Worksheet field count mismatch: expected ${structure.worksheetFieldCount}, found ${fieldCount}`
                });
                console.log(`   ❌ Worksheet fields: ${fieldCount} (expected ${structure.worksheetFieldCount})`);
                isValid = false;
            }
        }
        
        if (structureType === 'block-detail') {
            // Check subblock count
            const subblockCount = $('.subblock').length;
            if (subblockCount > 0 && subblockCount !== structure.subblockCount) {
                this.violations.push({
                    file: fileName,
                    type: 'INCORRECT_SUBBLOCK_COUNT',
                    expected: structure.subblockCount,
                    actual: subblockCount,
                    message: `Subblock count mismatch: expected ${structure.subblockCount}, found ${subblockCount}`
                });
                console.log(`   ❌ Subblocks: ${subblockCount} (expected ${structure.subblockCount})`);
                isValid = false;
            }
        }
        
        if (isValid) {
            console.log(`   ✅ Structure validated successfully`);
        }
        
        return isValid;
    }

    /**
     * Validate all HTML files in the platform
     */
    validateAll() {
        console.log('🔒 ScaleOps6 Structure Validator');
        console.log('================================');
        console.log('Validating locked structure compliance...\n');
        
        const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
        let allValid = true;
        
        for (const file of files) {
            const isValid = this.validateFile(file);
            if (!isValid) {
                allValid = false;
            }
        }
        
        // Report results
        console.log('\n================================');
        console.log('VALIDATION REPORT');
        console.log('================================');
        
        if (this.violations.length > 0) {
            console.log('\n❌ STRUCTURE VIOLATIONS DETECTED:');
            console.log('The following violations MUST be fixed immediately:\n');
            
            for (const violation of this.violations) {
                console.log(`File: ${violation.file}`);
                console.log(`Type: ${violation.type}`);
                console.log(`Issue: ${violation.message}`);
                console.log('---');
            }
            
            console.log('\n⚠️  CRITICAL: Structure has been modified!');
            console.log('The platform structure is LOCKED and must not be changed.');
            console.log('Please restore the original structure immediately.');
            console.log('\nRun: node restore-problem-statement-template.js');
        } else {
            console.log('\n✅ ALL STRUCTURES VALIDATED SUCCESSFULLY');
            console.log('The platform structure remains intact and compliant.');
        }
        
        return allValid;
    }

    /**
     * Compare two HTML structures to detect changes
     */
    compareStructures(originalPath, currentPath) {
        const original = fs.readFileSync(originalPath, 'utf8');
        const current = fs.readFileSync(currentPath, 'utf8');
        
        const $original = cheerio.load(original);
        const $current = cheerio.load(current);
        
        const differences = [];
        
        // Compare element counts
        const selectors = [
            '.tab-button',
            '.worksheet-field',
            '.section',
            '.subblock',
            '.stat-card'
        ];
        
        for (const selector of selectors) {
            const originalCount = $original(selector).length;
            const currentCount = $current(selector).length;
            
            if (originalCount !== currentCount) {
                differences.push({
                    selector,
                    original: originalCount,
                    current: currentCount,
                    type: 'COUNT_MISMATCH'
                });
            }
        }
        
        return differences;
    }

    /**
     * Generate a structure compliance report
     */
    generateReport() {
        const report = {
            timestamp: new Date().toISOString(),
            status: this.violations.length === 0 ? 'COMPLIANT' : 'VIOLATION',
            violations: this.violations,
            warnings: this.warnings,
            recommendation: this.violations.length > 0 
                ? 'Restore original structure immediately using restore-problem-statement-template.js'
                : 'Structure is compliant. Only content changes are allowed.'
        };
        
        fs.writeFileSync('structure-compliance-report.json', JSON.stringify(report, null, 2));
        console.log('\n📄 Report saved to: structure-compliance-report.json');
        
        return report;
    }
}

// Run validation if executed directly
if (require.main === module) {
    const validator = new StructureValidator();
    const isValid = validator.validateAll();
    const report = validator.generateReport();
    
    // Exit with error code if violations found
    if (!isValid) {
        console.error('\n🚨 STRUCTURE LOCK VIOLATION DETECTED!');
        console.error('The platform structure has been modified.');
        console.error('This is strictly forbidden.');
        console.error('\nTO FIX:');
        console.error('1. Run: node restore-problem-statement-template.js');
        console.error('2. Only make content changes, never structural changes');
        console.error('3. Re-run validation: node structure-validator.js');
        process.exit(1);
    } else {
        console.log('\n✅ Structure lock validated successfully!');
        console.log('The platform structure remains unchanged.');
        console.log('You may proceed with content-only changes.');
        process.exit(0);
    }
}

module.exports = StructureValidator;
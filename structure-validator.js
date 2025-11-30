/**
 * Structure Lock Validator
 * Enforces the structure lock policy defined in STRUCTURE_LOCK.md
 * Prevents modifications to locked files while allowing content changes
 */

const fs = require('fs');
const path = require('path');

class StructureValidator {
    constructor() {
        // Define locked file patterns (CANNOT be modified)
        this.lockedPatterns = [
            // UI Structure Files
            /^dashboard\.html$/,
            /^block-detail\.html$/,
            /^subcomponent-detail\.html$/,
            /^phase-\d+-.*\.html$/,
            /^block-\d+-.*\.html$/,
            
            // Database Files
            /^database-schema\.sql$/,
            /^database-service\.js$/,
            /^database-migration-.*\.js$/,
            
            // Core Platform Logic
            /^server\.js$/,
            /^auth-.*\.js$/,
            /^payment-.*\.js$/,
            /^firebase-.*\.js$/,
            /^stripe-.*\.js$/,
            
            // Navigation and Routing
            /^nav\.js$/,
            /^router\.js$/,
            /^routes\.js$/,
            
            // Build and Config
            /^package\.json$/,
            /^package-lock\.json$/,
            /^\.gitignore$/,
            /^webpack\.config\.js$/,
            /^tsconfig\.json$/
        ];
        
        // Define content file patterns (CAN be modified)
        this.contentPatterns = [
            // Agent Files
            /.*-agent.*\.js$/,
            /^score-analysis-engine\.js$/,
            /^recommendations-library\.js$/,
            
            // Content Files
            /^educational-content\.js$/,
            /^st6co-demo-data.*\.js$/,
            /^content-library.*\.js$/,
            /^missing-content.*\.js$/,
            
            // Documentation
            /\.md$/,
            /^README.*$/,
            /^CHANGELOG.*$/,
            
            // Configuration Data (not structure)
            /^config\/.*\.json$/,
            /^data\/.*\.json$/
        ];
        
        // Define locked sections within otherwise modifiable files
        this.lockedSections = {
            'server.js': [
                { start: 'app.listen', end: 'server started', reason: 'Server initialization' },
                { start: 'app.use(express', end: 'middleware setup', reason: 'Middleware configuration' }
            ],
            'database-service.js': [
                { start: 'constructor()', end: 'this.db = new', reason: 'Database connection' },
                { start: 'CREATE TABLE', end: 'schema definition', reason: 'Schema structure' }
            ]
        };
    }
    
    /**
     * Check if a file is locked (cannot be modified)
     */
    isFileLocked(filename) {
        const basename = path.basename(filename);
        
        // Check if file matches any locked pattern
        const isLocked = this.lockedPatterns.some(pattern => pattern.test(basename));
        
        // Check if file matches any content pattern (overrides locked)
        const isContent = this.contentPatterns.some(pattern => pattern.test(basename));
        
        return isLocked && !isContent;
    }
    
    /**
     * Check if a file is content (can be modified)
     */
    isFileContent(filename) {
        const basename = path.basename(filename);
        return this.contentPatterns.some(pattern => pattern.test(basename));
    }
    
    /**
     * Validate a file modification
     */
    validateFileModification(filename, oldContent = null, newContent = null) {
        const basename = path.basename(filename);
        
        // Check if file is locked
        if (this.isFileLocked(filename)) {
            return {
                allowed: false,
                reason: 'STRUCTURE_LOCK_VIOLATION',
                message: `❌ File "${basename}" is LOCKED and cannot be modified.\n` +
                        `   See STRUCTURE_LOCK.md for details.\n` +
                        `   This file is part of the frozen platform structure.`,
                severity: 'ERROR',
                override: 'Requires technical lead approval and STRUCTURE_LOCK.md update'
            };
        }
        
        // Check if file is content (allowed)
        if (this.isFileContent(filename)) {
            return {
                allowed: true,
                reason: 'CONTENT_MODIFICATION',
                message: `✅ File "${basename}" is in content zone - modification allowed.`,
                severity: 'INFO',
                recommendations: this.getContentModificationGuidelines(basename)
            };
        }
        
        // File not explicitly locked or content - warn but allow
        return {
            allowed: true,
            reason: 'UNCLASSIFIED_FILE',
            message: `⚠️  File "${basename}" is not classified in STRUCTURE_LOCK.md.\n` +
                    `   Proceeding with caution. Consider adding to structure lock policy.`,
            severity: 'WARNING',
            recommendations: [
                'Verify this file should be modifiable',
                'Update STRUCTURE_LOCK.md if needed',
                'Test thoroughly after changes'
            ]
        };
    }
    
    /**
     * Get modification guidelines for content files
     */
    getContentModificationGuidelines(filename) {
        if (filename.includes('agent')) {
            return [
                'Modify evaluation logic freely',
                'Maintain return value structure (score, recommendations, analysis)',
                'Keep scores in 0-100 range',
                'Test with sample data after changes'
            ];
        }
        
        if (filename.includes('demo-data') || filename.includes('educational-content')) {
            return [
                'Update content text freely',
                'Maintain data structure (keys, types)',
                'Preserve field IDs and question IDs',
                'Ensure backward compatibility'
            ];
        }
        
        if (filename.includes('recommendations')) {
            return [
                'Enhance recommendation content',
                'Add new recommendations as needed',
                'Maintain recommendation object structure',
                'Test recommendation display'
            ];
        }
        
        return [
            'Follow content modification guidelines in STRUCTURE_LOCK.md',
            'Test changes before committing',
            'Document significant changes'
        ];
    }
    
    /**
     * Validate multiple file modifications (for git commits)
     */
    validateCommit(modifiedFiles) {
        const results = {
            allowed: true,
            violations: [],
            warnings: [],
            contentChanges: [],
            summary: ''
        };
        
        modifiedFiles.forEach(file => {
            const validation = this.validateFileModification(file);
            
            if (!validation.allowed) {
                results.allowed = false;
                results.violations.push({
                    file: file,
                    ...validation
                });
            } else if (validation.severity === 'WARNING') {
                results.warnings.push({
                    file: file,
                    ...validation
                });
            } else if (validation.reason === 'CONTENT_MODIFICATION') {
                results.contentChanges.push({
                    file: file,
                    ...validation
                });
            }
        });
        
        // Generate summary
        if (results.violations.length > 0) {
            results.summary = `🚫 COMMIT BLOCKED: ${results.violations.length} structure lock violation(s)\n\n` +
                            results.violations.map(v => v.message).join('\n\n') +
                            `\n\n📖 See STRUCTURE_LOCK.md for modification guidelines.`;
        } else if (results.warnings.length > 0) {
            results.summary = `⚠️  COMMIT WARNING: ${results.warnings.length} unclassified file(s)\n\n` +
                            results.warnings.map(w => w.message).join('\n\n') +
                            `\n\n✅ ${results.contentChanges.length} content file(s) modified (allowed)`;
        } else {
            results.summary = `✅ COMMIT APPROVED: ${results.contentChanges.length} content file(s) modified\n\n` +
                            results.contentChanges.map(c => `  • ${path.basename(c.file)}`).join('\n');
        }
        
        return results;
    }
    
    /**
     * Generate a report of locked vs content files
     */
    generateStructureReport(directory = '.') {
        const report = {
            locked: [],
            content: [],
            unclassified: [],
            summary: {}
        };
        
        // This would scan directory and classify files
        // Implementation depends on file system access
        
        return report;
    }
    
    /**
     * Check if specific code sections are being modified
     */
    validateCodeSection(filename, lineStart, lineEnd, content) {
        const basename = path.basename(filename);
        
        if (!this.lockedSections[basename]) {
            return { allowed: true, reason: 'No locked sections defined' };
        }
        
        // Check if modification overlaps with locked sections
        for (const section of this.lockedSections[basename]) {
            if (content.includes(section.start)) {
                return {
                    allowed: false,
                    reason: 'LOCKED_SECTION_VIOLATION',
                    message: `❌ Cannot modify locked section: ${section.reason}\n` +
                            `   This section is critical to platform structure.`,
                    section: section
                };
            }
        }
        
        return { allowed: true };
    }
}

/**
 * CLI Interface for validation
 */
function validateFromCLI() {
    const args = process.argv.slice(2);
    const validator = new StructureValidator();
    
    if (args.length === 0) {
        console.log('Usage: node structure-validator.js <file1> [file2] [file3] ...');
        console.log('       node structure-validator.js --check-all');
        process.exit(1);
    }
    
    if (args[0] === '--check-all') {
        console.log('📊 Generating structure report...\n');
        const report = validator.generateStructureReport();
        console.log(JSON.stringify(report, null, 2));
        return;
    }
    
    // Validate provided files
    const results = validator.validateCommit(args);
    
    console.log(results.summary);
    
    if (!results.allowed) {
        process.exit(1); // Exit with error code to block commit
    }
    
    process.exit(0);
}

// Export for use in other scripts
module.exports = StructureValidator;

// Run CLI if executed directly
if (require.main === module) {
    validateFromCLI();
}
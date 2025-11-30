/**
 * File Modification Guard
 * Runtime protection against accidental structure modifications
 * Wraps file system operations to enforce structure lock
 */

const fs = require('fs');
const path = require('path');
const StructureValidator = require('./structure-validator.js');

class FileModificationGuard {
    constructor(options = {}) {
        this.validator = new StructureValidator();
        this.enabled = options.enabled !== false; // Enabled by default
        this.strictMode = options.strictMode || false; // Throw errors vs warnings
        this.logFile = options.logFile || 'structure-violations.log';
        
        // Track violations for reporting
        this.violations = [];
        this.warnings = [];
    }
    
    /**
     * Guard fs.writeFileSync
     */
    guardWriteFileSync(originalWriteFileSync) {
        const self = this;
        
        return function(filepath, data, options) {
            if (!self.enabled) {
                return originalWriteFileSync.apply(fs, arguments);
            }
            
            const validation = self.validator.validateFileModification(filepath);
            
            if (!validation.allowed) {
                const error = new Error(validation.message);
                error.code = 'STRUCTURE_LOCK_VIOLATION';
                error.file = filepath;
                error.validation = validation;
                
                self.logViolation(filepath, 'writeFileSync', validation);
                
                if (self.strictMode) {
                    throw error;
                } else {
                    console.error(validation.message);
                    console.error('⚠️  Proceeding anyway (strict mode disabled)');
                }
            } else if (validation.severity === 'WARNING') {
                self.logWarning(filepath, 'writeFileSync', validation);
                console.warn(validation.message);
            }
            
            return originalWriteFileSync.apply(fs, arguments);
        };
    }
    
    /**
     * Guard fs.writeFile
     */
    guardWriteFile(originalWriteFile) {
        const self = this;
        
        return function(filepath, data, options, callback) {
            if (!self.enabled) {
                return originalWriteFile.apply(fs, arguments);
            }
            
            // Handle optional options parameter
            if (typeof options === 'function') {
                callback = options;
                options = {};
            }
            
            const validation = self.validator.validateFileModification(filepath);
            
            if (!validation.allowed) {
                const error = new Error(validation.message);
                error.code = 'STRUCTURE_LOCK_VIOLATION';
                error.file = filepath;
                error.validation = validation;
                
                self.logViolation(filepath, 'writeFile', validation);
                
                if (self.strictMode) {
                    if (callback) {
                        return callback(error);
                    }
                    throw error;
                } else {
                    console.error(validation.message);
                    console.error('⚠️  Proceeding anyway (strict mode disabled)');
                }
            } else if (validation.severity === 'WARNING') {
                self.logWarning(filepath, 'writeFile', validation);
                console.warn(validation.message);
            }
            
            return originalWriteFile.apply(fs, arguments);
        };
    }
    
    /**
     * Guard fs.unlinkSync (file deletion)
     */
    guardUnlinkSync(originalUnlinkSync) {
        const self = this;
        
        return function(filepath) {
            if (!self.enabled) {
                return originalUnlinkSync.apply(fs, arguments);
            }
            
            const validation = self.validator.validateFileModification(filepath);
            
            if (!validation.allowed) {
                const error = new Error(
                    `❌ Cannot delete locked file: ${path.basename(filepath)}\n` +
                    `   This file is part of the frozen platform structure.`
                );
                error.code = 'STRUCTURE_LOCK_VIOLATION';
                error.file = filepath;
                
                self.logViolation(filepath, 'unlinkSync', validation);
                
                if (self.strictMode) {
                    throw error;
                } else {
                    console.error(error.message);
                    console.error('⚠️  Proceeding anyway (strict mode disabled)');
                }
            }
            
            return originalUnlinkSync.apply(fs, arguments);
        };
    }
    
    /**
     * Log violation to file and memory
     */
    logViolation(filepath, operation, validation) {
        const violation = {
            timestamp: new Date().toISOString(),
            file: filepath,
            operation: operation,
            validation: validation
        };
        
        this.violations.push(violation);
        
        // Append to log file
        const logEntry = `[${violation.timestamp}] VIOLATION: ${operation} on ${filepath}\n` +
                        `  Reason: ${validation.reason}\n` +
                        `  Message: ${validation.message}\n\n`;
        
        try {
            fs.appendFileSync(this.logFile, logEntry);
        } catch (err) {
            console.error('Failed to write to violation log:', err.message);
        }
    }
    
    /**
     * Log warning to file and memory
     */
    logWarning(filepath, operation, validation) {
        const warning = {
            timestamp: new Date().toISOString(),
            file: filepath,
            operation: operation,
            validation: validation
        };
        
        this.warnings.push(warning);
        
        // Append to log file
        const logEntry = `[${warning.timestamp}] WARNING: ${operation} on ${filepath}\n` +
                        `  Reason: ${validation.reason}\n` +
                        `  Message: ${validation.message}\n\n`;
        
        try {
            fs.appendFileSync(this.logFile, logEntry);
        } catch (err) {
            console.error('Failed to write to warning log:', err.message);
        }
    }
    
    /**
     * Get violation report
     */
    getViolationReport() {
        return {
            violations: this.violations,
            warnings: this.warnings,
            summary: {
                totalViolations: this.violations.length,
                totalWarnings: this.warnings.length,
                mostViolatedFiles: this.getMostViolatedFiles(),
                recentViolations: this.violations.slice(-10)
            }
        };
    }
    
    /**
     * Get most frequently violated files
     */
    getMostViolatedFiles() {
        const fileCounts = {};
        
        this.violations.forEach(v => {
            const basename = path.basename(v.file);
            fileCounts[basename] = (fileCounts[basename] || 0) + 1;
        });
        
        return Object.entries(fileCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([file, count]) => ({ file, count }));
    }
    
    /**
     * Install guards on fs module
     */
    install() {
        if (!this.enabled) {
            console.log('⚠️  File modification guard is disabled');
            return;
        }
        
        console.log('🔒 Installing file modification guard...');
        
        // Store original functions
        this.originalWriteFileSync = fs.writeFileSync;
        this.originalWriteFile = fs.writeFile;
        this.originalUnlinkSync = fs.unlinkSync;
        
        // Replace with guarded versions
        fs.writeFileSync = this.guardWriteFileSync(this.originalWriteFileSync);
        fs.writeFile = this.guardWriteFile(this.originalWriteFile);
        fs.unlinkSync = this.guardUnlinkSync(this.originalUnlinkSync);
        
        console.log('✅ File modification guard installed');
        console.log(`   Strict mode: ${this.strictMode ? 'ON (blocks violations)' : 'OFF (warns only)'}`);
        console.log(`   Log file: ${this.logFile}`);
    }
    
    /**
     * Uninstall guards (restore original fs functions)
     */
    uninstall() {
        if (!this.enabled) {
            return;
        }
        
        console.log('🔓 Uninstalling file modification guard...');
        
        fs.writeFileSync = this.originalWriteFileSync;
        fs.writeFile = this.originalWriteFile;
        fs.unlinkSync = this.originalUnlinkSync;
        
        console.log('✅ File modification guard uninstalled');
    }
    
    /**
     * Enable strict mode (throw errors on violations)
     */
    enableStrictMode() {
        this.strictMode = true;
        console.log('🔒 Strict mode ENABLED - violations will throw errors');
    }
    
    /**
     * Disable strict mode (warn only)
     */
    disableStrictMode() {
        this.strictMode = false;
        console.log('⚠️  Strict mode DISABLED - violations will only warn');
    }
}

/**
 * Singleton instance for global use
 */
let globalGuard = null;

/**
 * Initialize and install the guard
 */
function initializeGuard(options = {}) {
    if (globalGuard) {
        console.warn('⚠️  Guard already initialized');
        return globalGuard;
    }
    
    globalGuard = new FileModificationGuard(options);
    globalGuard.install();
    
    return globalGuard;
}

/**
 * Get the global guard instance
 */
function getGuard() {
    if (!globalGuard) {
        console.warn('⚠️  Guard not initialized, creating with defaults');
        return initializeGuard();
    }
    return globalGuard;
}

/**
 * Quick check if a file can be modified
 */
function canModifyFile(filepath) {
    const guard = getGuard();
    const validation = guard.validator.validateFileModification(filepath);
    return validation.allowed;
}

/**
 * CLI Interface
 */
function runCLI() {
    const args = process.argv.slice(2);
    const command = args[0];
    
    switch (command) {
        case 'install':
            console.log('Installing file modification guard...');
            initializeGuard({ strictMode: true });
            console.log('✅ Guard installed in strict mode');
            break;
            
        case 'check':
            if (args.length < 2) {
                console.error('Usage: node file-modification-guard.js check <filepath>');
                process.exit(1);
            }
            const filepath = args[1];
            const guard = new FileModificationGuard();
            const validation = guard.validator.validateFileModification(filepath);
            console.log(validation.message);
            if (validation.recommendations) {
                console.log('\n📋 Guidelines:');
                validation.recommendations.forEach(rec => console.log(`  • ${rec}`));
            }
            process.exit(validation.allowed ? 0 : 1);
            break;
            
        case 'report':
            if (!globalGuard) {
                console.log('No violations recorded (guard not active)');
                process.exit(0);
            }
            const report = globalGuard.getViolationReport();
            console.log('📊 Structure Lock Violation Report\n');
            console.log(`Total Violations: ${report.summary.totalViolations}`);
            console.log(`Total Warnings: ${report.summary.totalWarnings}\n`);
            
            if (report.summary.mostViolatedFiles.length > 0) {
                console.log('Most Violated Files:');
                report.summary.mostViolatedFiles.forEach(({ file, count }) => {
                    console.log(`  ${count}x - ${file}`);
                });
            }
            break;
            
        default:
            console.log('File Modification Guard - Structure Lock Enforcement\n');
            console.log('Commands:');
            console.log('  install              Install guard in strict mode');
            console.log('  check <filepath>     Check if file can be modified');
            console.log('  report               Show violation report');
            console.log('\nExamples:');
            console.log('  node file-modification-guard.js check dashboard.html');
            console.log('  node file-modification-guard.js check customer-insight-agent.js');
    }
}

// Export for use in other modules
module.exports = {
    FileModificationGuard,
    initializeGuard,
    getGuard,
    canModifyFile
};

// Run CLI if executed directly
if (require.main === module) {
    runCLI();
}
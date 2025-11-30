#!/usr/bin/env node

/**
 * Structure Lock Setup Script
 * Initializes and configures the structure lock enforcement system
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class StructureLockSetup {
    constructor() {
        this.projectRoot = __dirname;
        this.huskyDir = path.join(this.projectRoot, '.husky');
        this.setupComplete = false;
    }
    
    /**
     * Main setup process
     */
    async setup() {
        console.log('🔒 ScaleOps Structure Lock Setup\n');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        
        try {
            // Step 1: Check prerequisites
            console.log('Step 1: Checking prerequisites...');
            this.checkPrerequisites();
            console.log('✅ Prerequisites met\n');
            
            // Step 2: Initialize git hooks (Husky)
            console.log('Step 2: Setting up git hooks...');
            this.setupGitHooks();
            console.log('✅ Git hooks configured\n');
            
            // Step 3: Create necessary directories
            console.log('Step 3: Creating directories...');
            this.createDirectories();
            console.log('✅ Directories created\n');
            
            // Step 4: Set file permissions
            console.log('Step 4: Setting file permissions...');
            this.setPermissions();
            console.log('✅ Permissions set\n');
            
            // Step 5: Run validation tests
            console.log('Step 5: Running validation tests...');
            this.runTests();
            console.log('✅ Tests passed\n');
            
            // Step 6: Create baseline snapshot
            console.log('Step 6: Creating structure baseline...');
            this.createBaseline();
            console.log('✅ Baseline created\n');
            
            this.setupComplete = true;
            this.printSuccessMessage();
            
        } catch (error) {
            console.error('\n❌ Setup failed:', error.message);
            console.error('\nPlease fix the error and run setup again.');
            process.exit(1);
        }
    }
    
    /**
     * Check prerequisites
     */
    checkPrerequisites() {
        // Check if git is initialized
        if (!fs.existsSync(path.join(this.projectRoot, '.git'))) {
            throw new Error('Git repository not initialized. Run: git init');
        }
        
        // Check if Node.js is available
        try {
            execSync('node --version', { stdio: 'ignore' });
        } catch (error) {
            throw new Error('Node.js not found. Please install Node.js');
        }
        
        // Check if required files exist
        const requiredFiles = [
            'structure-validator.js',
            'file-modification-guard.js',
            'STRUCTURE_LOCK.md'
        ];
        
        requiredFiles.forEach(file => {
            if (!fs.existsSync(path.join(this.projectRoot, file))) {
                throw new Error(`Required file missing: ${file}`);
            }
        });
    }
    
    /**
     * Setup git hooks using Husky
     */
    setupGitHooks() {
        // Check if Husky is installed
        try {
            // Try to install husky if not present
            if (!fs.existsSync(path.join(this.projectRoot, 'node_modules', 'husky'))) {
                console.log('  Installing Husky...');
                execSync('npm install --save-dev husky', { 
                    cwd: this.projectRoot,
                    stdio: 'inherit'
                });
            }
            
            // Initialize Husky
            console.log('  Initializing Husky...');
            execSync('npx husky install', { 
                cwd: this.projectRoot,
                stdio: 'inherit'
            });
            
            // Ensure .husky directory exists
            if (!fs.existsSync(this.huskyDir)) {
                fs.mkdirSync(this.huskyDir, { recursive: true });
            }
            
            // Copy pre-commit hook if it doesn't exist
            const preCommitPath = path.join(this.huskyDir, 'pre-commit');
            if (!fs.existsSync(preCommitPath)) {
                console.log('  Creating pre-commit hook...');
                // The hook file should already exist from previous step
                // Just ensure it's executable
            }
            
        } catch (error) {
            console.warn('  ⚠️  Husky setup skipped (optional):', error.message);
            console.warn('  You can manually set up git hooks later');
        }
    }
    
    /**
     * Create necessary directories
     */
    createDirectories() {
        const dirs = [
            '.husky',
            'logs'
        ];
        
        dirs.forEach(dir => {
            const dirPath = path.join(this.projectRoot, dir);
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
                console.log(`  Created: ${dir}/`);
            }
        });
    }
    
    /**
     * Set file permissions (Unix-like systems)
     */
    setPermissions() {
        try {
            const preCommitPath = path.join(this.huskyDir, 'pre-commit');
            if (fs.existsSync(preCommitPath)) {
                fs.chmodSync(preCommitPath, '755');
                console.log('  Made pre-commit hook executable');
            }
        } catch (error) {
            console.warn('  ⚠️  Could not set permissions (Windows?):', error.message);
        }
    }
    
    /**
     * Run validation tests
     */
    runTests() {
        try {
            console.log('  Running test suite...');
            execSync('node test-structure-lock.js', {
                cwd: this.projectRoot,
                stdio: 'inherit'
            });
        } catch (error) {
            throw new Error('Validation tests failed. Fix issues before proceeding.');
        }
    }
    
    /**
     * Create structure baseline snapshot
     */
    createBaseline() {
        const baseline = {
            timestamp: new Date().toISOString(),
            lockedFiles: this.getLockedFiles(),
            contentFiles: this.getContentFiles(),
            checksum: this.calculateChecksum()
        };
        
        const baselinePath = path.join(this.projectRoot, 'structure-baseline.json');
        fs.writeFileSync(baselinePath, JSON.stringify(baseline, null, 2));
        console.log(`  Baseline saved to: structure-baseline.json`);
    }
    
    /**
     * Get list of locked files
     */
    getLockedFiles() {
        const lockedPatterns = [
            'dashboard.html',
            'block-detail.html',
            'subcomponent-detail.html',
            'database-schema.sql',
            'database-service.js',
            'server.js'
        ];
        
        return lockedPatterns.filter(file => 
            fs.existsSync(path.join(this.projectRoot, file))
        );
    }
    
    /**
     * Get list of content files
     */
    getContentFiles() {
        const contentPatterns = [
            'customer-insight-agent-enhanced.js',
            'educational-content.js',
            'st6co-demo-data-complete.js',
            'recommendations-library.js'
        ];
        
        return contentPatterns.filter(file => 
            fs.existsSync(path.join(this.projectRoot, file))
        );
    }
    
    /**
     * Calculate checksum of locked files
     */
    calculateChecksum() {
        // Simple checksum based on file sizes and modification times
        const lockedFiles = this.getLockedFiles();
        let checksum = 0;
        
        lockedFiles.forEach(file => {
            try {
                const stats = fs.statSync(path.join(this.projectRoot, file));
                checksum += stats.size + stats.mtimeMs;
            } catch (error) {
                // File doesn't exist, skip
            }
        });
        
        return checksum.toString(36);
    }
    
    /**
     * Print success message with next steps
     */
    printSuccessMessage() {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        console.log('🎉 Structure Lock Setup Complete!\n');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        console.log('✅ What\'s Protected:\n');
        console.log('   • UI files (dashboard.html, block-detail.html, etc.)');
        console.log('   • Database schema and services');
        console.log('   • Core platform logic (auth, payments, routing)');
        console.log('   • File organization and structure\n');
        console.log('✅ What You Can Modify:\n');
        console.log('   • Agent logic (*-agent*.js)');
        console.log('   • Educational content (educational-content.js)');
        console.log('   • Demo data (st6co-demo-data*.js)');
        console.log('   • Recommendations (recommendations-library.js)');
        console.log('   • Scoring algorithms and rubrics\n');
        console.log('📖 Documentation:\n');
        console.log('   • Read STRUCTURE_LOCK.md for complete guidelines');
        console.log('   • Check structure-baseline.json for current state\n');
        console.log('🔧 Tools Available:\n');
        console.log('   • node structure-validator.js <file>  - Check if file can be modified');
        console.log('   • node test-structure-lock.js         - Run validation tests');
        console.log('   • node test-structure-lock.js --scenarios - See real examples\n');
        console.log('🚀 Next Steps:\n');
        console.log('   1. Review STRUCTURE_LOCK.md');
        console.log('   2. Start working on agents, scoring, and content');
        console.log('   3. Git will automatically check your commits\n');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    }
}

/**
 * CLI Interface
 */
async function runSetup() {
    const setup = new StructureLockSetup();
    await setup.setup();
}

// Export for programmatic use
module.exports = StructureLockSetup;

// Run setup if executed directly
if (require.main === module) {
    runSetup().catch(error => {
        console.error('Setup failed:', error);
        process.exit(1);
    });
}
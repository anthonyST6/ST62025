/**
 * Test Suite for Structure Lock Enforcement
 * Validates that the structure lock mechanisms work correctly
 */

const StructureValidator = require('./structure-validator.js');
const { FileModificationGuard } = require('./file-modification-guard.js');

class StructureLockTests {
    constructor() {
        this.validator = new StructureValidator();
        this.testResults = [];
        this.passed = 0;
        this.failed = 0;
    }
    
    /**
     * Run a single test
     */
    runTest(name, testFn) {
        try {
            const result = testFn();
            if (result) {
                this.passed++;
                this.testResults.push({ name, status: 'PASS', message: '✅' });
                console.log(`✅ PASS: ${name}`);
            } else {
                this.failed++;
                this.testResults.push({ name, status: 'FAIL', message: '❌ Test returned false' });
                console.log(`❌ FAIL: ${name}`);
            }
        } catch (error) {
            this.failed++;
            this.testResults.push({ name, status: 'ERROR', message: error.message });
            console.log(`❌ ERROR: ${name} - ${error.message}`);
        }
    }
    
    /**
     * Test: Locked files are correctly identified
     */
    testLockedFilesIdentified() {
        const lockedFiles = [
            'dashboard.html',
            'block-detail.html',
            'database-schema.sql',
            'database-service.js',
            'server.js',
            'auth-service.js',
            'payment-guard.js'
        ];
        
        return lockedFiles.every(file => {
            const validation = this.validator.validateFileModification(file);
            return !validation.allowed && validation.reason === 'STRUCTURE_LOCK_VIOLATION';
        });
    }
    
    /**
     * Test: Content files are correctly identified
     */
    testContentFilesAllowed() {
        const contentFiles = [
            'customer-insight-agent-enhanced.js',
            'educational-content.js',
            'st6co-demo-data-complete.js',
            'recommendations-library.js',
            'score-analysis-engine.js'
        ];
        
        return contentFiles.every(file => {
            const validation = this.validator.validateFileModification(file);
            return validation.allowed && validation.reason === 'CONTENT_MODIFICATION';
        });
    }
    
    /**
     * Test: Agent files can be modified
     */
    testAgentFilesModifiable() {
        const agentFiles = [
            'customer-insight-agent-enhanced.js',
            'problem-statement-agent.js',
            'strategic-prioritization-agent.js'
        ];
        
        return agentFiles.every(file => {
            const validation = this.validator.validateFileModification(file);
            return validation.allowed;
        });
    }
    
    /**
     * Test: UI files are locked
     */
    testUIFilesLocked() {
        const uiFiles = [
            'dashboard.html',
            'block-detail.html',
            'subcomponent-detail.html',
            'phase-1-idea-market-fit.html'
        ];
        
        return uiFiles.every(file => {
            const validation = this.validator.validateFileModification(file);
            return !validation.allowed;
        });
    }
    
    /**
     * Test: Database files are locked
     */
    testDatabaseFilesLocked() {
        const dbFiles = [
            'database-schema.sql',
            'database-service.js',
            'database-migration-block-scores.js'
        ];
        
        return dbFiles.every(file => {
            const validation = this.validator.validateFileModification(file);
            return !validation.allowed;
        });
    }
    
    /**
     * Test: Validation provides helpful messages
     */
    testValidationMessages() {
        const lockedValidation = this.validator.validateFileModification('dashboard.html');
        const contentValidation = this.validator.validateFileModification('customer-insight-agent.js');
        
        return lockedValidation.message.includes('LOCKED') &&
               lockedValidation.message.includes('STRUCTURE_LOCK.md') &&
               contentValidation.message.includes('allowed') &&
               contentValidation.recommendations &&
               contentValidation.recommendations.length > 0;
    }
    
    /**
     * Test: Commit validation works with multiple files
     */
    testCommitValidation() {
        const mixedFiles = [
            'customer-insight-agent.js',  // Content - OK
            'educational-content.js',      // Content - OK
            'dashboard.html'               // Locked - BLOCK
        ];
        
        const result = this.validator.validateCommit(mixedFiles);
        
        return !result.allowed &&
               result.violations.length === 1 &&
               result.contentChanges.length === 2 &&
               result.summary.includes('BLOCKED');
    }
    
    /**
     * Test: Content-only commits are allowed
     */
    testContentOnlyCommit() {
        const contentFiles = [
            'customer-insight-agent-enhanced.js',
            'st6co-demo-data-complete.js',
            'recommendations-library.js'
        ];
        
        const result = this.validator.validateCommit(contentFiles);
        
        return result.allowed &&
               result.violations.length === 0 &&
               result.contentChanges.length === 3 &&
               result.summary.includes('APPROVED');
    }
    
    /**
     * Test: File modification guard can be initialized
     */
    testGuardInitialization() {
        try {
            const guard = new FileModificationGuard({ enabled: false });
            return guard.validator instanceof StructureValidator;
        } catch (error) {
            return false;
        }
    }
    
    /**
     * Test: Guard provides helpful guidelines
     */
    testGuardGuidelines() {
        const guard = new FileModificationGuard({ enabled: false });
        const guidelines = guard.validator.validateFileModification('customer-insight-agent.js');
        
        return guidelines.recommendations &&
               guidelines.recommendations.length > 0 &&
               guidelines.recommendations.some(r => r.includes('evaluation') || r.includes('scoring'));
    }
    
    /**
     * Run all tests
     */
    runAllTests() {
        console.log('🧪 Running Structure Lock Test Suite\n');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        
        this.runTest('Locked files are correctly identified', () => this.testLockedFilesIdentified());
        this.runTest('Content files are correctly allowed', () => this.testContentFilesAllowed());
        this.runTest('Agent files can be modified', () => this.testAgentFilesModifiable());
        this.runTest('UI files are locked', () => this.testUIFilesLocked());
        this.runTest('Database files are locked', () => this.testDatabaseFilesLocked());
        this.runTest('Validation provides helpful messages', () => this.testValidationMessages());
        this.runTest('Commit validation blocks mixed changes', () => this.testCommitValidation());
        this.runTest('Content-only commits are allowed', () => this.testContentOnlyCommit());
        this.runTest('File modification guard initializes', () => this.testGuardInitialization());
        this.runTest('Guard provides helpful guidelines', () => this.testGuardGuidelines());
        
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        console.log('📊 Test Results Summary\n');
        console.log(`   Total Tests: ${this.passed + this.failed}`);
        console.log(`   ✅ Passed: ${this.passed}`);
        console.log(`   ❌ Failed: ${this.failed}`);
        console.log(`   Success Rate: ${Math.round((this.passed / (this.passed + this.failed)) * 100)}%`);
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        
        if (this.failed === 0) {
            console.log('🎉 All tests passed! Structure lock is working correctly.\n');
            return true;
        } else {
            console.log('⚠️  Some tests failed. Review implementation.\n');
            return false;
        }
    }
    
    /**
     * Run specific test scenarios
     */
    runScenarioTests() {
        console.log('\n🎬 Running Real-World Scenarios\n');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        
        // Scenario 1: Developer tries to modify agent scoring
        console.log('Scenario 1: Modifying agent scoring logic');
        const agentResult = this.validator.validateFileModification('customer-insight-agent-enhanced.js');
        console.log(`  Result: ${agentResult.allowed ? '✅ ALLOWED' : '❌ BLOCKED'}`);
        console.log(`  Reason: ${agentResult.reason}`);
        if (agentResult.recommendations) {
            console.log('  Guidelines:');
            agentResult.recommendations.forEach(r => console.log(`    • ${r}`));
        }
        console.log('');
        
        // Scenario 2: Developer tries to modify dashboard UI
        console.log('Scenario 2: Modifying dashboard layout');
        const uiResult = this.validator.validateFileModification('dashboard.html');
        console.log(`  Result: ${uiResult.allowed ? '✅ ALLOWED' : '❌ BLOCKED'}`);
        console.log(`  Reason: ${uiResult.reason}`);
        console.log(`  Message: ${uiResult.message.split('\n')[0]}`);
        console.log('');
        
        // Scenario 3: Developer updates demo data
        console.log('Scenario 3: Updating demo data content');
        const dataResult = this.validator.validateFileModification('st6co-demo-data-complete.js');
        console.log(`  Result: ${dataResult.allowed ? '✅ ALLOWED' : '❌ BLOCKED'}`);
        console.log(`  Reason: ${dataResult.reason}`);
        if (dataResult.recommendations) {
            console.log('  Guidelines:');
            dataResult.recommendations.forEach(r => console.log(`    • ${r}`));
        }
        console.log('');
        
        // Scenario 4: Mixed commit (content + structure)
        console.log('Scenario 4: Committing both content and structure changes');
        const commitResult = this.validator.validateCommit([
            'customer-insight-agent.js',
            'dashboard.html',
            'educational-content.js'
        ]);
        console.log(`  Result: ${commitResult.allowed ? '✅ ALLOWED' : '❌ BLOCKED'}`);
        console.log(`  Violations: ${commitResult.violations.length}`);
        console.log(`  Content Changes: ${commitResult.contentChanges.length}`);
        console.log(`  Summary: ${commitResult.summary.split('\n')[0]}`);
        console.log('');
        
        // Scenario 5: Content-only commit
        console.log('Scenario 5: Committing only content changes');
        const contentCommit = this.validator.validateCommit([
            'customer-insight-agent-enhanced.js',
            'st6co-demo-data-complete.js',
            'recommendations-library.js'
        ]);
        console.log(`  Result: ${contentCommit.allowed ? '✅ ALLOWED' : '❌ BLOCKED'}`);
        console.log(`  Content Changes: ${contentCommit.contentChanges.length}`);
        console.log(`  Summary: ${contentCommit.summary.split('\n')[0]}`);
        console.log('');
        
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    }
}

/**
 * CLI Interface
 */
function runTests() {
    const args = process.argv.slice(2);
    const testSuite = new StructureLockTests();
    
    if (args.includes('--scenarios')) {
        testSuite.runScenarioTests();
    } else {
        const allPassed = testSuite.runAllTests();
        
        if (args.includes('--scenarios')) {
            testSuite.runScenarioTests();
        }
        
        process.exit(allPassed ? 0 : 1);
    }
}

// Export for use in other test frameworks
module.exports = StructureLockTests;

// Run tests if executed directly
if (require.main === module) {
    runTests();
}
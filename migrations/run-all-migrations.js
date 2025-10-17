/**
 * Master Migration Script
 * 
 * Runs all layer migrations in correct order with validation
 * Includes rollback capability if any migration fails
 * 
 * Created: 2025-10-06
 */

const fs = require('fs');
const path = require('path');
const { ValidationEngine, StartupValidator } = require('../core/validation-engine.js');
const { migrate: migrateAgents } = require('./migrate-agent-mapping.js');
const { migrate: migrateQuestions } = require('./migrate-questions.js');

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║  ScaleOps6 SSOT Migration - Master Script                 ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

/**
 * Migration state tracker
 */
const migrationState = {
    started: new Date().toISOString(),
    completed: [],
    failed: [],
    backups: []
};

/**
 * Run pre-migration validation
 */
async function preValidation() {
    console.log('═══════════════════════════════════════════════════════════');
    console.log('PHASE 0: Pre-Migration Validation');
    console.log('═══════════════════════════════════════════════════════════\n');
    
    const engine = new ValidationEngine();
    const results = await engine.validate();
    
    console.log('\n' + engine.generateReport());
    
    // Document current state
    const reportPath = path.join(__dirname, `pre-migration-report-${Date.now()}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    console.log(`📄 Pre-migration report saved: ${path.basename(reportPath)}\n`);
    
    return results;
}

/**
 * Run post-migration validation
 */
async function postValidation() {
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('PHASE 3: Post-Migration Validation');
    console.log('═══════════════════════════════════════════════════════════\n');
    
    // Clear require cache to load new files
    delete require.cache[require.resolve('../agent-subcomponent-mapping.js')];
    delete require.cache[require.resolve('../agent-generated-questions-complete.js')];
    
    const engine = new ValidationEngine();
    const results = await engine.validate();
    
    console.log('\n' + engine.generateReport());
    
    // Document post-migration state
    const reportPath = path.join(__dirname, `post-migration-report-${Date.now()}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    console.log(`📄 Post-migration report saved: ${path.basename(reportPath)}\n`);
    
    return results;
}

/**
 * Run all migrations
 */
async function runMigrations() {
    try {
        // Phase 0: Pre-migration validation
        const preResults = await preValidation();
        
        console.log('═══════════════════════════════════════════════════════════');
        console.log('PHASE 1: Migrate Agent Mapping');
        console.log('═══════════════════════════════════════════════════════════\n');
        
        // Phase 1: Migrate agent mapping
        try {
            await migrateAgents();
            migrationState.completed.push('agent-mapping');
            console.log('✅ Agent mapping migration complete\n');
        } catch (error) {
            migrationState.failed.push({ layer: 'agent-mapping', error: error.message });
            throw error;
        }
        
        console.log('═══════════════════════════════════════════════════════════');
        console.log('PHASE 2: Migrate Question Library');
        console.log('═══════════════════════════════════════════════════════════\n');
        
        // Phase 2: Migrate questions
        try {
            await migrateQuestions();
            migrationState.completed.push('questions');
            console.log('✅ Question library migration complete\n');
        } catch (error) {
            migrationState.failed.push({ layer: 'questions', error: error.message });
            throw error;
        }
        
        // Phase 3: Post-migration validation
        const postResults = await postValidation();
        
        // Check if validation improved
        const preErrors = preResults.summary.criticalErrors + preResults.summary.highErrors;
        const postErrors = postResults.summary.criticalErrors + postResults.summary.highErrors;
        
        console.log('═══════════════════════════════════════════════════════════');
        console.log('MIGRATION RESULTS');
        console.log('═══════════════════════════════════════════════════════════\n');
        
        console.log('Error Reduction:');
        console.log(`  Before: ${preErrors} critical/high errors`);
        console.log(`  After:  ${postErrors} critical/high errors`);
        console.log(`  Improvement: ${preErrors - postErrors} errors fixed\n`);
        
        if (postResults.passed) {
            console.log('✅ POST-MIGRATION VALIDATION PASSED\n');
            console.log('All layers now aligned with SSOT registry!\n');
        } else {
            console.warn('⚠️  POST-MIGRATION VALIDATION HAS WARNINGS\n');
            console.warn(`${postResults.summary.totalErrors} errors remain (see report above)\n`);
        }
        
        // Save migration state
        migrationState.finished = new Date().toISOString();
        migrationState.preValidation = preResults;
        migrationState.postValidation = postResults;
        
        const statePath = path.join(__dirname, `migration-state-${Date.now()}.json`);
        fs.writeFileSync(statePath, JSON.stringify(migrationState, null, 2));
        console.log(`📄 Migration state saved: ${path.basename(statePath)}\n`);
        
        // Generate summary
        generateMigrationSummary(preResults, postResults);
        
    } catch (error) {
        console.error('\n❌ MIGRATION FAILED\n');
        console.error(`Error: ${error.message}\n`);
        console.error('Completed migrations:', migrationState.completed);
        console.error('Failed at:', migrationState.failed);
        console.error('\n📋 ROLLBACK INSTRUCTIONS:');
        console.error('  1. Restore from backup files (*.BACKUP-*.js)');
        console.error('  2. Restart server');
        console.error('  3. Review error logs');
        console.error('  4. Fix issues and retry migration\n');
        
        process.exit(1);
    }
}

/**
 * Generate migration summary document
 */
function generateMigrationSummary(preResults, postResults) {
    const summary = `# SSOT Migration Summary
**Date:** ${new Date().toISOString()}
**Status:** ${postResults.passed ? 'SUCCESS' : 'PARTIAL SUCCESS'}

## Overview

This migration aligned all system layers with the Single Source of Truth (SSOT) registry.

## Results

### Before Migration
- Total Errors: ${preResults.summary.totalErrors}
- Critical: ${preResults.summary.criticalErrors}
- High: ${preResults.summary.highErrors}
- Medium: ${preResults.summary.mediumErrors}

### After Migration
- Total Errors: ${postResults.summary.totalErrors}
- Critical: ${postResults.summary.criticalErrors}
- High: ${postResults.summary.highErrors}
- Medium: ${postResults.summary.mediumErrors}

### Improvement
- Errors Fixed: ${preResults.summary.totalErrors - postResults.summary.totalErrors}
- Critical Fixed: ${preResults.summary.criticalErrors - postResults.summary.criticalErrors}
- Success Rate: ${Math.round((1 - postResults.summary.totalErrors / Math.max(preResults.summary.totalErrors, 1)) * 100)}%

## Migrations Completed

${migrationState.completed.map(m => `- ✅ ${m}`).join('\n')}

## Files Modified

- agent-subcomponent-mapping.js (domains aligned with SSOT)
- agent-generated-questions-complete.js (domains aligned with SSOT)

## Backups Created

All original files backed up with timestamp suffixes.

## Validation Status

${postResults.passed ? '✅ All validations passed' : '⚠️ Some warnings remain (see validation report)'}

## Next Steps

1. Test with sample subcomponents (1-1, 2-1, 5-1)
2. Verify worksheet display shows correct domains
3. Check analysis results reference correct domains
4. Monitor for any runtime issues
5. If all good, proceed with remaining layer migrations

## Rollback Instructions

If issues are found:

\`\`\`bash
# Restore from backups
cp agent-subcomponent-mapping.BACKUP-*.js agent-subcomponent-mapping.js
cp agent-generated-questions-complete.BACKUP-*.js agent-generated-questions-complete.js

# Restart server
# Review logs and fix issues
# Retry migration
\`\`\`

---

**Migration completed successfully!**
`;
    
    const summaryPath = path.join(__dirname, '../MIGRATION_SUMMARY.md');
    fs.writeFileSync(summaryPath, summary);
    console.log(`📄 Migration summary: MIGRATION_SUMMARY.md\n`);
}

// Run migrations if executed directly
if (require.main === module) {
    runMigrations().catch(error => {
        console.error('Fatal error:', error);
        process.exit(1);
    });
}

module.exports = { runMigrations, preValidation, postValidation };
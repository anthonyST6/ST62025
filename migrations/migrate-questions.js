/**
 * Migration Script: Question Library Layer
 * 
 * Migrates agent-generated-questions-complete.js to use SSOT domains
 * Ensures all question domains match subcomponent names exactly
 * 
 * Created: 2025-10-06
 */

const fs = require('fs');
const path = require('path');
const { SUBCOMPONENT_REGISTRY } = require('../core/subcomponent-registry.js');

console.log('🔧 MIGRATION: Question Library Layer');
console.log('═══════════════════════════════════════════════════════════\n');

/**
 * Generate new question library from SSOT
 */
function generateNewQuestions() {
    const agentQuestions = require('../agent-generated-questions-complete.js');
    const newQuestions = {};
    let fixed = 0;
    let unchanged = 0;
    
    for (const [id, subcomponent] of Object.entries(SUBCOMPONENT_REGISTRY)) {
        const existingQuestions = agentQuestions[id];
        
        if (!existingQuestions) {
            console.warn(`⚠️  No existing questions for ${id}: ${subcomponent.name}`);
            // Create placeholder
            newQuestions[id] = createPlaceholderQuestions(id, subcomponent);
            continue;
        }
        
        // Check if domain needs fixing
        if (existingQuestions.domain !== subcomponent.name) {
            console.log(`📝 Fixing ${id}: "${existingQuestions.domain}" → "${subcomponent.name}"`);
            fixed++;
            
            newQuestions[id] = {
                domain: subcomponent.name,  // ✅ Use SSOT name
                questions: regenerateQuestionText(
                    existingQuestions.questions,
                    existingQuestions.domain,
                    subcomponent.name
                )
            };
        } else {
            unchanged++;
            newQuestions[id] = existingQuestions;
        }
    }
    
    console.log(`\n📊 Migration Summary:`);
    console.log(`   Fixed: ${fixed} domains`);
    console.log(`   Unchanged: ${unchanged} domains`);
    console.log(`   Total: ${Object.keys(newQuestions).length} subcomponents\n`);
    
    return newQuestions;
}

/**
 * Regenerate question text to match new domain
 */
function regenerateQuestionText(questions, oldDomain, newDomain) {
    return questions.map(q => {
        let newText = q.text;
        let newHint = q.hint || '';
        
        // Replace old domain references with new domain
        const oldDomainLower = oldDomain.toLowerCase();
        const newDomainLower = newDomain.toLowerCase();
        
        // Case-insensitive replacement
        newText = newText.replace(new RegExp(oldDomainLower, 'gi'), newDomain);
        newHint = newHint.replace(new RegExp(oldDomainLower, 'gi'), newDomain);
        
        // Also replace generic placeholders
        newText = newText.replace(/vision clarity|value proposition/gi, newDomain);
        newHint = newHint.replace(/vision clarity|value proposition/gi, newDomain);
        
        return {
            ...q,
            text: newText,
            hint: newHint
        };
    });
}

/**
 * Create placeholder questions for missing subcomponents
 */
function createPlaceholderQuestions(id, subcomponent) {
    return {
        domain: subcomponent.name,
        questions: [
            {
                id: `${id}-q1`,
                text: `What is your current strategy for ${subcomponent.name}?`,
                type: "strategic",
                required: true,
                minLength: 100,
                maxLength: 1000,
                hint: `Describe your ${subcomponent.name} approach and implementation`
            },
            {
                id: `${id}-q2`,
                text: `How do you measure success in ${subcomponent.name}?`,
                type: "quantitative",
                required: true,
                minLength: 100,
                maxLength: 1000,
                hint: `Provide specific metrics and KPIs for ${subcomponent.name}`
            },
            {
                id: `${id}-q3`,
                text: `What challenges do you face with ${subcomponent.name}?`,
                type: "diagnostic",
                required: false,
                minLength: 100,
                maxLength: 1000,
                hint: `Identify gaps and improvement areas in ${subcomponent.name}`
            },
            {
                id: `${id}-q4`,
                text: `What evidence demonstrates your ${subcomponent.name} effectiveness?`,
                type: "validation",
                required: true,
                minLength: 100,
                maxLength: 1000,
                hint: "Include metrics, examples, or case studies"
            },
            {
                id: `${id}-q5`,
                text: `What are your next steps to improve ${subcomponent.name}?`,
                type: "strategic",
                required: false,
                minLength: 100,
                maxLength: 1000,
                hint: "List 3-5 actionable improvements"
            }
        ]
    };
}

/**
 * Create backup of current file
 */
function createBackup() {
    const sourcePath = path.join(__dirname, '../agent-generated-questions-complete.js');
    const backupPath = path.join(__dirname, '../agent-generated-questions-complete.BACKUP-' + Date.now() + '.js');
    
    if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, backupPath);
        console.log(`✅ Backup created: ${path.basename(backupPath)}\n`);
        return backupPath;
    }
    
    console.log('⚠️  No existing file to backup\n');
    return null;
}

/**
 * Write new questions file
 */
function writeNewQuestions(questions) {
    const fileContent = `/**
 * Complete Agent-Generated Questions Library
 * SSOT-ALIGNED VERSION - All domains match subcomponent names exactly
 * Generated: ${new Date().toISOString()}
 * 
 * This file is generated from core/subcomponent-registry.js (SSOT)
 * DO NOT edit domains manually - regenerate using migrations/migrate-questions.js
 */

const agentGeneratedQuestions = ${JSON.stringify(questions, null, 2)};

// Export for use in the application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = agentGeneratedQuestions;
} else {
    window.agentGeneratedQuestions = agentGeneratedQuestions;
}
`;
    
    const outputPath = path.join(__dirname, '../agent-generated-questions-complete.js');
    fs.writeFileSync(outputPath, fileContent);
    console.log(`✅ New questions written: ${path.basename(outputPath)}\n`);
    
    return outputPath;
}

/**
 * Validate new questions
 */
function validateNewQuestions(questions) {
    console.log('🔍 Validating new questions...\n');
    
    let errors = 0;
    
    for (const [id, questionSet] of Object.entries(questions)) {
        const subcomponent = SUBCOMPONENT_REGISTRY[id];
        
        if (!subcomponent) {
            console.error(`❌ ${id}: Not in registry`);
            errors++;
            continue;
        }
        
        if (questionSet.domain !== subcomponent.name) {
            console.error(`❌ ${id}: Domain mismatch`);
            console.error(`   Expected: "${subcomponent.name}"`);
            console.error(`   Got: "${questionSet.domain}"`);
            errors++;
        }
    }
    
    if (errors === 0) {
        console.log('✅ All 96 question sets validated successfully\n');
        return true;
    } else {
        console.error(`\n❌ Validation failed: ${errors} errors found\n`);
        return false;
    }
}

/**
 * Main migration function
 */
async function migrate() {
    try {
        // Step 1: Create backup
        console.log('Step 1: Creating backup...');
        const backupPath = createBackup();
        
        // Step 2: Generate new questions from SSOT
        console.log('Step 2: Generating new questions from SSOT...');
        const newQuestions = generateNewQuestions();
        
        // Step 3: Validate new questions
        console.log('Step 3: Validating new questions...');
        const isValid = validateNewQuestions(newQuestions);
        
        if (!isValid) {
            console.error('❌ Migration aborted due to validation errors');
            process.exit(1);
        }
        
        // Step 4: Write new file
        console.log('Step 4: Writing new questions file...');
        const outputPath = writeNewQuestions(newQuestions);
        
        // Step 5: Summary
        console.log('═══════════════════════════════════════════════════════════');
        console.log('✅ MIGRATION COMPLETE\n');
        console.log('Files:');
        console.log(`  Backup: ${backupPath ? path.basename(backupPath) : 'N/A'}`);
        console.log(`  New:    ${path.basename(outputPath)}`);
        console.log('\nNext Steps:');
        console.log('  1. Review the new agent-generated-questions-complete.js');
        console.log('  2. Run validation: node core/validation-engine.js');
        console.log('  3. Test with sample subcomponents');
        console.log('  4. If issues found, restore from backup\n');
        
    } catch (error) {
        console.error('\n❌ Migration failed:', error.message);
        console.error('\nRestore from backup if needed');
        process.exit(1);
    }
}

// Run migration if executed directly
if (require.main === module) {
    migrate();
}

module.exports = { migrate, generateNewQuestions, validateNewQuestions };
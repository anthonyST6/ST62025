/**
 * Migration Script: Agent Mapping Layer
 * 
 * Migrates agent-subcomponent-mapping.js to use SSOT domains
 * Replaces "role" field with "domain" that matches subcomponent names
 * 
 * Created: 2025-10-06
 */

const fs = require('fs');
const path = require('path');
const { SUBCOMPONENT_REGISTRY } = require('../core/subcomponent-registry.js');

console.log('🔧 MIGRATION: Agent Mapping Layer');
console.log('═══════════════════════════════════════════════════════════\n');

/**
 * Generate new agent mapping from SSOT
 */
function generateNewAgentMapping() {
    const newMapping = {};
    
    for (const [id, subcomponent] of Object.entries(SUBCOMPONENT_REGISTRY)) {
        newMapping[id] = {
            name: subcomponent.agent.name,
            domain: subcomponent.name,  // ✅ Use SSOT name, not "role"
            expertise: getAgentExpertise(subcomponent.agent.name, subcomponent.name)
        };
    }
    
    return newMapping;
}

/**
 * Get agent expertise description
 */
function getAgentExpertise(agentName, domain) {
    // Map agent names to their expertise areas
    const expertiseMap = {
        'Problem Definition Evaluator': 'Problem validation and market need assessment',
        'Mission Alignment Advisor': 'Vision clarity and strategic alignment',
        'VoC Synthesizer': 'Customer voice analysis and insight synthesis',
        'Team Gap Identifier': 'Team assessment and capability analysis',
        'Market Mapper': 'Market analysis and competitive positioning',
        'Launch Plan Assessor': 'Launch readiness and go-to-market planning',
        'JTBD Specialist': 'Jobs-to-be-done framework and customer needs analysis',
        'Persona Framework Builder': 'Customer profiling and persona development',
        'Interview Cadence Analyzer': 'Research planning and interview strategy',
        'Pain Point Mapper': 'Pain analysis and problem mapping',
        'Signal Grader': 'Insight evaluation and signal analysis',
        'Insight Loop Manager': 'Journey mapping and insight action loops',
        'Use Case Scorer': 'Use case analysis and prioritization',
        'Segment Tier Analyst': 'Resource allocation and segment analysis',
        'Prioritization Expert': 'Risk assessment and priority frameworks',
        'Tradeoff Tracker': 'Timeline management and tradeoff analysis',
        'Hypothesis Validator': 'Success metrics and hypothesis testing',
        'Decision Archivist': 'Decision framework and documentation',
        'Feature Matrix Builder': 'MVP definition and feature prioritization',
        'Technical Scope Expert': 'Feature prioritization and technical scoping',
        'Pilot Group Selector': 'Testing strategy and pilot selection',
        'QA Criteria Setter': 'Feedback systems and quality assurance',
        'Timeline Planner': 'Iteration planning and timeline management',
        'Post-Mortem Analyst': 'Launch strategy and post-mortem analysis'
    };
    
    return expertiseMap[agentName] || `${domain} analysis and optimization`;
}

/**
 * Create backup of current file
 */
function createBackup() {
    const sourcePath = path.join(__dirname, '../agent-subcomponent-mapping.js');
    const backupPath = path.join(__dirname, '../agent-subcomponent-mapping.BACKUP-' + Date.now() + '.js');
    
    if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, backupPath);
        console.log(`✅ Backup created: ${path.basename(backupPath)}\n`);
        return backupPath;
    }
    
    console.log('⚠️  No existing file to backup\n');
    return null;
}

/**
 * Write new agent mapping file
 */
function writeNewMapping(mapping) {
    const fileContent = `/**
 * Agent-Subcomponent Mapping for Node.js
 * SSOT-ALIGNED VERSION - Domains match subcomponent names exactly
 * Generated: ${new Date().toISOString()}
 * 
 * This file is generated from core/subcomponent-registry.js (SSOT)
 * DO NOT edit manually - regenerate using migrations/migrate-agent-mapping.js
 */

// Complete agent mapping for all 96 subcomponents
const agentMapping = ${JSON.stringify(mapping, null, 4)};

/**
 * Get agent for a specific subcomponent
 */
function getAgentForSubcomponent(blockId, subId) {
    const subcomponentId = \`\${blockId}-\${subId}\`;
    const agent = agentMapping[subcomponentId];
    
    if (!agent) {
        console.warn(\`No agent found for subcomponent \${subcomponentId}\`);
        return {
            name: 'Default Agent',
            domain: 'General Analysis',
            expertise: 'General business operations'
        };
    }
    
    return {
        ...agent,
        blockId,
        subId,
        subcomponentId
    };
}

/**
 * Get all agents for a specific block
 */
function getAgentsForBlock(blockId) {
    const agents = [];
    for (let subId = 1; subId <= 6; subId++) {
        agents.push(getAgentForSubcomponent(blockId, subId));
    }
    return agents;
}

/**
 * Get all agents in the system
 */
function getAllAgents() {
    const agents = {};
    for (const [subcomponentId, agent] of Object.entries(agentMapping)) {
        agents[subcomponentId] = {
            ...agent,
            subcomponentId,
            blockId: parseInt(subcomponentId.split('-')[0]),
            subId: parseInt(subcomponentId.split('-')[1])
        };
    }
    return agents;
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        agentMapping,
        getAgentForSubcomponent,
        getAgentsForBlock,
        getAllAgents
    };
}
`;
    
    const outputPath = path.join(__dirname, '../agent-subcomponent-mapping.js');
    fs.writeFileSync(outputPath, fileContent);
    console.log(`✅ New mapping written: ${path.basename(outputPath)}\n`);
    
    return outputPath;
}

/**
 * Validate new mapping
 */
function validateNewMapping(mapping) {
    console.log('🔍 Validating new mapping...\n');
    
    let errors = 0;
    
    for (const [id, agent] of Object.entries(mapping)) {
        const subcomponent = SUBCOMPONENT_REGISTRY[id];
        
        if (!subcomponent) {
            console.error(`❌ ${id}: Not in registry`);
            errors++;
            continue;
        }
        
        if (agent.domain !== subcomponent.name) {
            console.error(`❌ ${id}: Domain mismatch`);
            console.error(`   Expected: "${subcomponent.name}"`);
            console.error(`   Got: "${agent.domain}"`);
            errors++;
        }
    }
    
    if (errors === 0) {
        console.log('✅ All 96 agent mappings validated successfully\n');
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
        
        // Step 2: Generate new mapping from SSOT
        console.log('Step 2: Generating new mapping from SSOT...');
        const newMapping = generateNewAgentMapping();
        console.log(`✅ Generated mapping for ${Object.keys(newMapping).length} subcomponents\n`);
        
        // Step 3: Validate new mapping
        console.log('Step 3: Validating new mapping...');
        const isValid = validateNewMapping(newMapping);
        
        if (!isValid) {
            console.error('❌ Migration aborted due to validation errors');
            process.exit(1);
        }
        
        // Step 4: Write new file
        console.log('Step 4: Writing new mapping file...');
        const outputPath = writeNewMapping(newMapping);
        
        // Step 5: Summary
        console.log('═══════════════════════════════════════════════════════════');
        console.log('✅ MIGRATION COMPLETE\n');
        console.log('Files:');
        console.log(`  Backup: ${backupPath ? path.basename(backupPath) : 'N/A'}`);
        console.log(`  New:    ${path.basename(outputPath)}`);
        console.log('\nNext Steps:');
        console.log('  1. Review the new agent-subcomponent-mapping.js');
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

module.exports = { migrate, generateNewAgentMapping, validateNewMapping };
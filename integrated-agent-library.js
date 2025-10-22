// Integrated Agent Library for ScaleOps6
// Combines standard agents with GTM and Leadership special agents

const fs = require('fs');

// Load standard agents
const standardAgentsContent = fs.readFileSync('./agent-library.js', 'utf8');
const standardMatch = standardAgentsContent.match(/const\s+AgentLibrary\s*=\s*({[\s\S]*?});/);
const StandardAgents = eval('(' + standardMatch[1] + ')');

// Load GTM agents
const GTMAgents = require('./gtm-agents.js');

// Load Leadership agents  
const LeadershipAgents = require('./leadership-agents.js');

// Load correct mapping
const { AGENT_CORRECT_MAPPING, AGENT_NAME_TO_KEY } = require('./agent-correct-mapping.js');

// Create integrated library with all agents
const IntegratedAgentLibrary = {
    ...StandardAgents,
    ...GTMAgents,
    ...LeadershipAgents
};

// Helper function to get agent by subcomponent ID using correct mapping
function getAgentForSubcomponent(subcomponentId) {
    // Get the correct agent name from mapping
    const agentName = AGENT_CORRECT_MAPPING[subcomponentId];
    if (!agentName) {
        console.error(`No agent mapping found for subcomponent: ${subcomponentId}`);
        return null;
    }
    
    // Get the agent key from name
    const agentKey = AGENT_NAME_TO_KEY[agentName];
    if (!agentKey) {
        console.error(`No agent key found for agent: ${agentName}`);
        return null;
    }
    
    // Get the agent from library
    const agent = IntegratedAgentLibrary[agentKey];
    if (!agent) {
        console.error(`Agent not found in library: ${agentKey} for ${agentName}`);
        return null;
    }
    
    return agent;
}

// Verify all mappings work
function verifyAllMappings() {
    console.log('Verifying all 96 agent mappings...');
    let success = 0;
    let failed = 0;
    const failures = [];
    
    for (const [subcomponentId, agentName] of Object.entries(AGENT_CORRECT_MAPPING)) {
        const agent = getAgentForSubcomponent(subcomponentId);
        if (agent && agent.name) {
            success++;
        } else {
            failed++;
            failures.push(`${subcomponentId}: ${agentName}`);
        }
    }
    
    console.log(`✅ Successful mappings: ${success}`);
    if (failed > 0) {
        console.log(`❌ Failed mappings: ${failed}`);
        console.log('Failed items:', failures);
    }
    
    return { success, failed, failures };
}

// Export everything needed
module.exports = {
    IntegratedAgentLibrary,
    getAgentForSubcomponent,
    verifyAllMappings,
    AGENT_CORRECT_MAPPING,
    AGENT_NAME_TO_KEY
};

// If run directly, verify mappings
if (require.main === module) {
    const results = verifyAllMappings();
    if (results.failed === 0) {
        console.log('✅ All 96 agent mappings verified successfully!');
    } else {
        console.log(`⚠️ ${results.failed} mappings need attention`);
    }
}
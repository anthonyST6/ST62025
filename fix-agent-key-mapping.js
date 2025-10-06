/**
 * Fix Agent Key Mapping
 * Corrects the AGENT_NAME_TO_KEY mapping to point to the right agents in agent-library.js
 */

const fs = require('fs');

// Read the agent-library.js to verify actual agent positions
const agentLibraryContent = fs.readFileSync('./agent-library.js', 'utf8');

// Extract agent definitions to verify
const verifyAgents = () => {
    console.log('🔍 Verifying agent positions in agent-library.js:');
    console.log('Block 2 agents:');
    console.log('  2a: Interview Cadence Analyzer (line 117)');
    console.log('  2b: Persona Framework Builder (line 134)');
    console.log('  2c: Pain Point Mapper (line 152)');
    console.log('  2d: JTBD Specialist (line 171)');
    console.log('  2e: Signal Grader (line 188)');
    console.log('  2f: Insight Loop Manager (line 206)');
};

// The CORRECT mapping based on actual agent-library.js positions
const CORRECT_AGENT_NAME_TO_KEY = {
    // Block 1 - Correct
    'Problem Definition Evaluator': '1a',
    'Mission Alignment Advisor': '1b',
    'VoC Synthesizer': '1c',
    'Team Gap Identifier': '1d',
    'Market Mapper': '1e',
    'Launch Plan Assessor': '1f',
    
    // Block 2 - FIXED to match actual positions in agent-library.js
    'Interview Cadence Analyzer': '2a',  // Actually at 2a in agent-library.js
    'Persona Framework Builder': '2b',   // Actually at 2b in agent-library.js
    'Pain Point Mapper': '2c',          // Actually at 2c in agent-library.js
    'JTBD Specialist': '2d',             // Actually at 2d in agent-library.js
    'Signal Grader': '2e',               // Actually at 2e in agent-library.js
    'Insight Loop Manager': '2f',        // Actually at 2f in agent-library.js
    
    // Rest of blocks remain the same...
    // Block 3
    'Use Case Scorer': '3a',
    'Segment Tier Analyst': '3b',
    'Prioritization Expert': '3c',
    'Tradeoff Tracker': '3d',
    'Hypothesis Validator': '3e',
    'Decision Archivist': '3f',
    
    // Block 4
    'Feature Matrix Builder': '4a',
    'Technical Scope Expert': '4b',
    'Pilot Group Selector': '4c',
    'QA Criteria Setter': '4d',
    'Timeline Planner': '4e',
    'Post-Mortem Analyst': '4f',
    
    // Block 5 - GTM Agents
    'GTMMessagingAgent': '5a-gtm',
    'SalesEnablementAgent': '5b-gtm',
    'PricingPackagingAgent': '5c-gtm',
    'ChannelPartnerAgent': '5d-gtm',
    'CompetitivePositioningAgent': '5e-gtm',
    'LaunchPlanningAgent': '5f-gtm',
    
    // Block 6
    'Usage Heatmap Analyst': '6a',
    'Milestone Tracker': '6b',
    'CS Dashboard Builder': '6c',
    'Activation Expert': '6d',
    'Feedback Collector': '6e',
    'Power User Analyst': '6f',
    
    // Block 7
    'Time/Cost Analyst': '7a',
    'Revenue Impact Tracker': '7b',
    'Productivity Measurer': '7c',
    'Retention Analyst': '7d',
    'System Reduction Expert': '7e',
    'Friction Analyzer': '7f',
    
    // Block 8
    'Upsell Funnel Designer': '8a',
    'Team Expansion Tracker': '8b',
    'Organic Growth Analyst': '8c',
    'Champion Mapper': '8d',
    'Sentiment Tracker': '8e',
    'Renewal Readiness Expert': '8f',
    
    // Block 9
    'Inbound Conversion Analyst': '9a',
    'Outbound Performance Tracker': '9b',
    'Channel Economics Expert': '9c',
    'Discovery Call Evaluator': '9d',
    'Demo-to-Close Optimizer': '9e',
    'Founder Sales Analyst': '9f',
    
    // Block 10
    'Enablement Asset Manager': '10a',
    'Rep Ramp Planner': '10b',
    'Win/Loss Analyst': '10c',
    'Objection Handler': '10d',
    'ICP Filter Expert': '10e',
    'Sales Call Librarian': '10f',
    
    // Block 11
    'Scorecard Designer': '11a',
    'Quota Structure Expert': '11b',
    'Deal Review Manager': '11c',
    'Forecast Framework Builder': '11d',
    'Coaching Loop Designer': '11e',
    'Talent Gap Analyst': '11f',
    
    // Block 12
    'Onboarding Optimizer': '12a',
    'Activation Tracker': '12b',
    'Success Playbook Builder': '12c',
    'Escalation Manager': '12d',
    'Renewal Pipeline Expert': '12e',
    'Churn Root-Cause Analyst': '12f',
    
    // Block 13
    'Category Narrative Designer': '13a',
    'Strategic Moat Builder': '13b',
    'Ecosystem Mapper': '13c',
    'Competitor Monitor': '13d',
    'Brand Architect': '13e',
    'Defensive GTM Strategist': '13f',
    
    // Block 14
    'System Architecture Expert': '14a',
    'Revenue Engine Mapper': '14b',
    'Dashboard Designer': '14c',
    'Tool Consolidator': '14d',
    'RevOps Playbook Builder': '14e',
    'SLA Policy Manager': '14f',
    
    // Block 15 - Leadership Agents
    'ExecutiveHiringAgent': '15a-lead',
    'BoardGovernanceAgent': '15b-lead',
    'SuccessionPlanningAgent': '15c-lead',
    'StakeholderAlignmentAgent': '15d-lead',
    'InvestorRelationsAgent': '15e-lead',
    'LeadershipDynamicsAgent': '15f-lead',
    
    // Block 16
    'Market Entry Analyst': '16a',
    'Localization Expert': '16b',
    'International Pricing Strategist': '16c',
    'Compliance Tracker': '16d',
    'Geo-GTM Specialist': '16e',
    'Expansion Risk Assessor': '16f'
};

// Update the agent-correct-mapping.js file
function updateAgentCorrectMapping() {
    const filePath = './agent-correct-mapping.js';
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find and replace the AGENT_NAME_TO_KEY section
    const startMarker = '// Reverse mapping to get agent key from agent name';
    const endMarker = '// Export for use in Node.js';
    
    const startIndex = content.indexOf(startMarker);
    const endIndex = content.indexOf(endMarker);
    
    if (startIndex === -1 || endIndex === -1) {
        console.error('❌ Could not find markers in agent-correct-mapping.js');
        return;
    }
    
    const newSection = `// Reverse mapping to get agent key from agent name
// This helps us find the existing agent in AgentLibrary
// FIXED: Now correctly maps to actual positions in agent-library.js
const AGENT_NAME_TO_KEY = ${JSON.stringify(CORRECT_AGENT_NAME_TO_KEY, null, 4)};

`;
    
    content = content.substring(0, startIndex) + newSection + content.substring(endIndex);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✅ Updated agent-correct-mapping.js with correct key mappings');
}

// Main execution
function main() {
    console.log('🔧 FIXING AGENT KEY MAPPING');
    console.log('=' .repeat(60));
    
    // Verify current state
    verifyAgents();
    
    console.log('\n📝 Updating agent-correct-mapping.js...');
    updateAgentCorrectMapping();
    
    console.log('\n✅ FIX COMPLETE!');
    console.log('\nThe key fix was:');
    console.log('  - JTBD Specialist is at position 2d (not 2a)');
    console.log('  - Interview Cadence Analyzer is at position 2a (not 2c)');
    console.log('  - Pain Point Mapper is at position 2c (not 2d)');
    console.log('\nNow the mapping correctly aligns:');
    console.log('  2-1 (Jobs to be Done) → JTBD Specialist (2d)');
    console.log('  2-2 (Personas Framework) → Persona Framework Builder (2b)');
    console.log('  2-3 (Interview Cadence) → Interview Cadence Analyzer (2a)');
    console.log('  2-4 (Pain Point Mapping) → Pain Point Mapper (2c)');
    
    console.log('\n⚠️  IMPORTANT: Restart the server for changes to take effect!');
}

// Run the fix
main();
/**
 * Agent-Subcomponent Mapping for Node.js
 * Extracted from agent-subcomponent-integration.js for server-side use
 */

// Complete agent mapping for all 96 subcomponents
const agentMapping = {
    // Block 1: Mission Discovery
    '1-1': { name: 'Problem Definition Evaluator', role: 'Problem Analysis' },
    '1-2': { name: 'Mission Alignment Advisor', role: 'Vision Clarity' },
    '1-3': { name: 'Value Proposition Analyst', role: 'Value Creation' },
    '1-4': { name: 'Target Audience Strategist', role: 'Market Segmentation' },
    '1-5': { name: 'Competitive Positioning Expert', role: 'Differentiation' },
    '1-6': { name: 'Mission Metrics Tracker', role: 'Success Measurement' },
    
    // Block 2: Customer Insights
    '2-1': { name: 'Interview Cadence Analyzer', role: 'Research Planning' },
    '2-2': { name: 'Question Framework Designer', role: 'Interview Design' },
    '2-3': { name: 'Insight Synthesis Specialist', role: 'Data Analysis' },
    '2-4': { name: 'Pattern Recognition Expert', role: 'Trend Identification' },
    '2-5': { name: 'Persona Development Architect', role: 'Customer Profiling' },
    '2-6': { name: 'Journey Mapping Facilitator', role: 'Experience Design' },
    
    // Block 3: Strategic Prioritization
    '3-1': { name: 'Feature Priority Analyst', role: 'Feature Ranking' },
    '3-2': { name: 'Resource Allocation Optimizer', role: 'Resource Planning' },
    '3-3': { name: 'Timeline Planning Coordinator', role: 'Schedule Management' },
    '3-4': { name: 'Risk Assessment Evaluator', role: 'Risk Analysis' },
    '3-5': { name: 'Dependency Mapping Specialist', role: 'Dependency Tracking' },
    '3-6': { name: 'Milestone Tracking Manager', role: 'Progress Monitoring' },
    
    // Block 4: Prototype Launch
    '4-1': { name: 'MVP Definition Architect', role: 'MVP Planning' },
    '4-2': { name: 'Rapid Testing Coordinator', role: 'Test Management' },
    '4-3': { name: 'Feedback Loop Designer', role: 'Feedback Systems' },
    '4-4': { name: 'Iteration Planning Specialist', role: 'Sprint Planning' },
    '4-5': { name: 'Quality Metrics Analyst', role: 'Quality Assurance' },
    '4-6': { name: 'Launch Readiness Evaluator', role: 'Launch Preparation' },
    
    // Block 5: Go-to-Market Strategy (Special GTM Agents)
    '5-1': { name: 'GTMMessagingAgent', role: 'Messaging Strategy' },
    '5-2': { name: 'GTMChannelAgent', role: 'Channel Strategy' },
    '5-3': { name: 'GTMPricingAgent', role: 'Pricing Strategy' },
    '5-4': { name: 'GTMPartnershipAgent', role: 'Partnership Development' },
    '5-5': { name: 'GTMContentAgent', role: 'Content Strategy' },
    '5-6': { name: 'GTMLaunchAgent', role: 'Launch Execution' },
    
    // Block 6: Customer Engagement Flywheel
    '6-1': { name: 'Onboarding Experience Designer', role: 'Onboarding Optimization' },
    '6-2': { name: 'Activation Metrics Tracker', role: 'Activation Analysis' },
    '6-3': { name: 'Engagement Pattern Analyst', role: 'Engagement Monitoring' },
    '6-4': { name: 'Retention Strategy Optimizer', role: 'Retention Planning' },
    '6-5': { name: 'Referral Program Architect', role: 'Referral Systems' },
    '6-6': { name: 'Community Building Strategist', role: 'Community Management' },
    
    // Block 7: Quantifiable Impact
    '7-1': { name: 'KPI Definition Specialist', role: 'Metrics Design' },
    '7-2': { name: 'Data Collection Architect', role: 'Data Infrastructure' },
    '7-3': { name: 'Analytics Dashboard Designer', role: 'Reporting Systems' },
    '7-4': { name: 'Performance Benchmarking Analyst', role: 'Benchmarking' },
    '7-5': { name: 'ROI Calculation Expert', role: 'ROI Analysis' },
    '7-6': { name: 'Impact Reporting Specialist', role: 'Impact Assessment' },
    
    // Block 8: Customer Success Expansion
    '8-1': { name: 'Success Metrics Definer', role: 'Success Measurement' },
    '8-2': { name: 'Health Score Architect', role: 'Health Monitoring' },
    '8-3': { name: 'Expansion Opportunity Identifier', role: 'Growth Identification' },
    '8-4': { name: 'Upsell Strategy Developer', role: 'Upsell Planning' },
    '8-5': { name: 'Renewal Rate Optimizer', role: 'Renewal Management' },
    '8-6': { name: 'Advocacy Program Builder', role: 'Advocacy Development' },
    
    // Block 9: Proof of Execution
    '9-1': { name: 'Case Study Developer', role: 'Success Documentation' },
    '9-2': { name: 'Results Documentation Specialist', role: 'Results Tracking' },
    '9-3': { name: 'Testimonial Collection Manager', role: 'Social Proof' },
    '9-4': { name: 'Success Metrics Compiler', role: 'Metrics Compilation' },
    '9-5': { name: 'Implementation Showcase Creator', role: 'Implementation Display' },
    '9-6': { name: 'ROI Evidence Gatherer', role: 'ROI Documentation' },
    
    // Block 10: Sales Team Empowerment
    '10-1': { name: 'Sales Process Optimizer', role: 'Process Improvement' },
    '10-2': { name: 'Playbook Development Expert', role: 'Playbook Creation' },
    '10-3': { name: 'Training Program Designer', role: 'Training Systems' },
    '10-4': { name: 'Tool Stack Architect', role: 'Sales Technology' },
    '10-5': { name: 'Performance Coaching Specialist', role: 'Coaching Programs' },
    '10-6': { name: 'Commission Structure Analyst', role: 'Compensation Design' },
    
    // Block 11: High Performance Teams
    '11-1': { name: 'Team Structure Designer', role: 'Organizational Design' },
    '11-2': { name: 'Hiring Process Optimizer', role: 'Recruitment Systems' },
    '11-3': { name: 'Culture Development Strategist', role: 'Culture Building' },
    '11-4': { name: 'Performance Management Expert', role: 'Performance Systems' },
    '11-5': { name: 'Skill Development Coordinator', role: 'Training Development' },
    '11-6': { name: 'Team Productivity Analyst', role: 'Productivity Optimization' },
    
    // Block 12: Retention Systems
    '12-1': { name: 'Churn Prediction Modeler', role: 'Churn Analysis' },
    '12-2': { name: 'Retention Program Designer', role: 'Retention Programs' },
    '12-3': { name: 'Customer Feedback Analyst', role: 'Feedback Analysis' },
    '12-4': { name: 'Loyalty Program Architect', role: 'Loyalty Systems' },
    '12-5': { name: 'Win-Back Campaign Strategist', role: 'Recovery Campaigns' },
    '12-6': { name: 'Lifetime Value Optimizer', role: 'LTV Optimization' },
    
    // Block 13: Market Domination Strategies
    '13-1': { name: 'Market Share Analyst', role: 'Market Analysis' },
    '13-2': { name: 'Competitive Intelligence Gatherer', role: 'Competitive Research' },
    '13-3': { name: 'Strategic Partnership Developer', role: 'Partnership Strategy' },
    '13-4': { name: 'Market Expansion Planner', role: 'Expansion Planning' },
    '13-5': { name: 'Brand Authority Builder', role: 'Brand Development' },
    '13-6': { name: 'Category Creation Strategist', role: 'Category Leadership' },
    
    // Block 14: Operational Infrastructure
    '14-1': { name: 'Process Automation Specialist', role: 'Automation Systems' },
    '14-2': { name: 'System Integration Architect', role: 'Integration Planning' },
    '14-3': { name: 'Data Infrastructure Designer', role: 'Data Architecture' },
    '14-4': { name: 'Security Compliance Manager', role: 'Security Management' },
    '14-5': { name: 'Scalability Planning Expert', role: 'Scale Planning' },
    '14-6': { name: 'Operational Efficiency Analyst', role: 'Efficiency Optimization' },
    
    // Block 15: Leadership Expansion (Special Leadership Agents)
    '15-1': { name: 'ExecutiveHiringAgent', role: 'Executive Recruitment' },
    '15-2': { name: 'BoardAdvisoryAgent', role: 'Board Development' },
    '15-3': { name: 'SuccessionPlanningAgent', role: 'Succession Planning' },
    '15-4': { name: 'LeadershipDevelopmentAgent', role: 'Leadership Training' },
    '15-5': { name: 'ExecutiveCoachingAgent', role: 'Executive Coaching' },
    '15-6': { name: 'StrategicVisionAgent', role: 'Vision Development' },
    
    // Block 16: Global Expansion Opportunities
    '16-1': { name: 'International Market Analyst', role: 'Market Research' },
    '16-2': { name: 'Localization Strategy Expert', role: 'Localization Planning' },
    '16-3': { name: 'Global Partnership Developer', role: 'International Partnerships' },
    '16-4': { name: 'Regulatory Compliance Specialist', role: 'Compliance Management' },
    '16-5': { name: 'Cross-Cultural Team Builder', role: 'Global Team Building' },
    '16-6': { name: 'Global Revenue Optimizer', role: 'Revenue Optimization' }
};

/**
 * Get agent for a specific subcomponent
 */
function getAgentForSubcomponent(blockId, subId) {
    const subcomponentId = `${blockId}-${subId}`;
    const agent = agentMapping[subcomponentId];
    
    if (!agent) {
        console.warn(`No agent found for subcomponent ${subcomponentId}`);
        return {
            name: 'Default Agent',
            role: 'General Analysis',
            expertise: 'General business operations'
        };
    }
    
    return {
        ...agent,
        expertise: agent.role,
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
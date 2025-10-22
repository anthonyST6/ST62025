// Correct Agent-Subcomponent Mapping based on "Subcomponent Agents Correct 10_04_25.docx"
// This file provides the authoritative mapping between subcomponent IDs and agent names
// FIXED: Block 2 agents now correctly aligned with their logical subcomponents

const AGENT_CORRECT_MAPPING = {
    // Block 1: Mission Discovery
    '1-1': 'Problem Definition Evaluator',
    '1-2': 'Mission Alignment Advisor',
    '1-3': 'VoC Synthesizer',
    '1-4': 'Team Gap Identifier',
    '1-5': 'Market Mapper',
    '1-6': 'Launch Plan Assessor',
    
    // Block 2: Customer Insights - CORRECTED MAPPING
    '2-1': 'JTBD Specialist',              // Jobs to be Done
    '2-2': 'Persona Framework Builder',    // Personas Framework
    '2-3': 'Interview Cadence Analyzer',   // Interview Cadence
    '2-4': 'Pain Point Mapper',            // Pain Point Mapping
    '2-5': 'Signal Grader',                // Insight Action
    '2-6': 'Insight Loop Manager',         // Customer Journey
    
    // Block 3: Strategic Prioritization
    '3-1': 'Use Case Scorer',
    '3-2': 'Segment Tier Analyst',
    '3-3': 'Prioritization Expert',
    '3-4': 'Tradeoff Tracker',
    '3-5': 'Hypothesis Validator',
    '3-6': 'Decision Archivist',
    
    // Block 4: Prototype Launch
    '4-1': 'Feature Matrix Builder',
    '4-2': 'Technical Scope Expert',
    '4-3': 'Pilot Group Selector',
    '4-4': 'QA Criteria Setter',
    '4-5': 'Timeline Planner',
    '4-6': 'Post-Mortem Analyst',
    
    // Block 5: Go-To-Market Strategy (Special GTM Agents)
    '5-1': 'GTMMessagingAgent',
    '5-2': 'SalesEnablementAgent',
    '5-3': 'PricingPackagingAgent',
    '5-4': 'ChannelPartnerAgent',
    '5-5': 'CompetitivePositioningAgent',
    '5-6': 'LaunchPlanningAgent',
    
    // Block 6: Customer Engagement Flywheel
    '6-1': 'Usage Heatmap Analyst',
    '6-2': 'Milestone Tracker',
    '6-3': 'CS Dashboard Builder',
    '6-4': 'Activation Expert',
    '6-5': 'Feedback Collector',
    '6-6': 'Power User Analyst',
    
    // Block 7: Quantifiable Impact
    '7-1': 'Time/Cost Analyst',
    '7-2': 'Revenue Impact Tracker',
    '7-3': 'Productivity Measurer',
    '7-4': 'Retention Analyst',
    '7-5': 'System Reduction Expert',
    '7-6': 'Friction Analyzer',
    
    // Block 8: Customer Success Expansion
    '8-1': 'Upsell Funnel Designer',
    '8-2': 'Team Expansion Tracker',
    '8-3': 'Organic Growth Analyst',
    '8-4': 'Champion Mapper',
    '8-5': 'Sentiment Tracker',
    '8-6': 'Renewal Readiness Expert',
    
    // Block 9: Proof Execution
    '9-1': 'Inbound Conversion Analyst',
    '9-2': 'Outbound Performance Tracker',
    '9-3': 'Channel Economics Expert',
    '9-4': 'Discovery Call Evaluator',
    '9-5': 'Demo-to-Close Optimizer',
    '9-6': 'Founder Sales Analyst',
    
    // Block 10: Sales Team Empowerment
    '10-1': 'Enablement Asset Manager',
    '10-2': 'Rep Ramp Planner',
    '10-3': 'Win/Loss Analyst',
    '10-4': 'Objection Handler',
    '10-5': 'ICP Filter Expert',
    '10-6': 'Sales Call Librarian',
    
    // Block 11: High Performance Teams
    '11-1': 'Scorecard Designer',
    '11-2': 'Quota Structure Expert',
    '11-3': 'Deal Review Manager',
    '11-4': 'Forecast Framework Builder',
    '11-5': 'Coaching Loop Designer',
    '11-6': 'Talent Gap Analyst',
    
    // Block 12: Retention Systems
    '12-1': 'Onboarding Optimizer',
    '12-2': 'Activation Tracker',
    '12-3': 'Success Playbook Builder',
    '12-4': 'Escalation Manager',
    '12-5': 'Renewal Pipeline Expert',
    '12-6': 'Churn Root-Cause Analyst',
    
    // Block 13: Market Domination Strategies
    '13-1': 'Category Narrative Designer',
    '13-2': 'Strategic Moat Builder',
    '13-3': 'Ecosystem Mapper',
    '13-4': 'Competitor Monitor',
    '13-5': 'Brand Architect',
    '13-6': 'Defensive GTM Strategist',
    
    // Block 14: Operational Infrastructure
    '14-1': 'System Architecture Expert',
    '14-2': 'Revenue Engine Mapper',
    '14-3': 'Dashboard Designer',
    '14-4': 'Tool Consolidator',
    '14-5': 'RevOps Playbook Builder',
    '14-6': 'SLA Policy Manager',
    
    // Block 15: Leadership Expansion (Special Leadership Agents)
    '15-1': 'ExecutiveHiringAgent',
    '15-2': 'BoardGovernanceAgent',
    '15-3': 'SuccessionPlanningAgent',
    '15-4': 'StakeholderAlignmentAgent',
    '15-5': 'InvestorRelationsAgent',
    '15-6': 'LeadershipDynamicsAgent',
    
    // Block 16: Global & Expansion Opportunities
    '16-1': 'Market Entry Analyst',
    '16-2': 'Localization Expert',
    '16-3': 'International Pricing Strategist',
    '16-4': 'Compliance Tracker',
    '16-5': 'Geo-GTM Specialist',
    '16-6': 'Expansion Risk Assessor'
};

// Reverse mapping to get agent key from agent name
// This helps us find the existing agent in AgentLibrary
// FIXED: Now correctly maps to actual positions in agent-library.js
const AGENT_NAME_TO_KEY = {
    "Problem Definition Evaluator": "1a",
    "Mission Alignment Advisor": "1b",
    "VoC Synthesizer": "1c",
    "Team Gap Identifier": "1d",
    "Market Mapper": "1e",
    "Launch Plan Assessor": "1f",
    "Interview Cadence Analyzer": "2a",
    "Persona Framework Builder": "2b",
    "Pain Point Mapper": "2c",
    "JTBD Specialist": "2d",
    "Signal Grader": "2e",
    "Insight Loop Manager": "2f",
    "Use Case Scorer": "3a",
    "Segment Tier Analyst": "3b",
    "Prioritization Expert": "3c",
    "Tradeoff Tracker": "3d",
    "Hypothesis Validator": "3e",
    "Decision Archivist": "3f",
    "Feature Matrix Builder": "4a",
    "Technical Scope Expert": "4b",
    "Pilot Group Selector": "4c",
    "QA Criteria Setter": "4d",
    "Timeline Planner": "4e",
    "Post-Mortem Analyst": "4f",
    "GTMMessagingAgent": "5a-gtm",
    "SalesEnablementAgent": "5b-gtm",
    "PricingPackagingAgent": "5c-gtm",
    "ChannelPartnerAgent": "5d-gtm",
    "CompetitivePositioningAgent": "5e-gtm",
    "LaunchPlanningAgent": "5f-gtm",
    "Usage Heatmap Analyst": "6a",
    "Milestone Tracker": "6b",
    "CS Dashboard Builder": "6c",
    "Activation Expert": "6d",
    "Feedback Collector": "6e",
    "Power User Analyst": "6f",
    "Time/Cost Analyst": "7a",
    "Revenue Impact Tracker": "7b",
    "Productivity Measurer": "7c",
    "Retention Analyst": "7d",
    "System Reduction Expert": "7e",
    "Friction Analyzer": "7f",
    "Upsell Funnel Designer": "8a",
    "Team Expansion Tracker": "8b",
    "Organic Growth Analyst": "8c",
    "Champion Mapper": "8d",
    "Sentiment Tracker": "8e",
    "Renewal Readiness Expert": "8f",
    "Inbound Conversion Analyst": "9a",
    "Outbound Performance Tracker": "9b",
    "Channel Economics Expert": "9c",
    "Discovery Call Evaluator": "9d",
    "Demo-to-Close Optimizer": "9e",
    "Founder Sales Analyst": "9f",
    "Enablement Asset Manager": "10a",
    "Rep Ramp Planner": "10b",
    "Win/Loss Analyst": "10c",
    "Objection Handler": "10d",
    "ICP Filter Expert": "10e",
    "Sales Call Librarian": "10f",
    "Scorecard Designer": "11a",
    "Quota Structure Expert": "11b",
    "Deal Review Manager": "11c",
    "Forecast Framework Builder": "11d",
    "Coaching Loop Designer": "11e",
    "Talent Gap Analyst": "11f",
    "Onboarding Optimizer": "12a",
    "Activation Tracker": "12b",
    "Success Playbook Builder": "12c",
    "Escalation Manager": "12d",
    "Renewal Pipeline Expert": "12e",
    "Churn Root-Cause Analyst": "12f",
    "Category Narrative Designer": "13a",
    "Strategic Moat Builder": "13b",
    "Ecosystem Mapper": "13c",
    "Competitor Monitor": "13d",
    "Brand Architect": "13e",
    "Defensive GTM Strategist": "13f",
    "System Architecture Expert": "14a",
    "Revenue Engine Mapper": "14b",
    "Dashboard Designer": "14c",
    "Tool Consolidator": "14d",
    "RevOps Playbook Builder": "14e",
    "SLA Policy Manager": "14f",
    "ExecutiveHiringAgent": "15a-lead",
    "BoardGovernanceAgent": "15b-lead",
    "SuccessionPlanningAgent": "15c-lead",
    "StakeholderAlignmentAgent": "15d-lead",
    "InvestorRelationsAgent": "15e-lead",
    "LeadershipDynamicsAgent": "15f-lead",
    "Market Entry Analyst": "16a",
    "Localization Expert": "16b",
    "International Pricing Strategist": "16c",
    "Compliance Tracker": "16d",
    "Geo-GTM Specialist": "16e",
    "Expansion Risk Assessor": "16f"
};

// Export for use in Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AGENT_CORRECT_MAPPING,
        AGENT_NAME_TO_KEY
    };
}
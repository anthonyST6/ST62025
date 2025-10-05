# Agent-Subcomponent Mapping Solution Architecture

## Problem Summary
The current system has major mismatches between subcomponents and their assigned agents. Most critically:
- Block 5 agents are completely wrong (using "Early Adopter Wins" agents instead of GTM agents)
- Block 15 agents need special mapping to leadership-specific agents
- Many other blocks have agents in the wrong order

## Solution Design: Dual Approach

### Approach 1: Create Correct Mapping Table
Create a comprehensive mapping file that correctly maps all 96 subcomponents to their proper agents.

### Approach 2: Create/Update Missing Agents
For blocks where agents don't exist (Block 5 GTM agents, Block 15 special agents), we need to create new agent definitions.

## Correct Agent Mappings (from Subcomponent Agents Correct 10_04_25.docx)

### Block 1: Mission Discovery ✅
- 1-1: Problem Definition Evaluator
- 1-2: Mission Alignment Advisor
- 1-3: VoC Synthesizer
- 1-4: Team Gap Identifier
- 1-5: Market Mapper
- 1-6: Launch Plan Assessor

### Block 2: Customer Insights (NEEDS REORDERING)
- 2-1: Interview Cadence Analyzer
- 2-2: Persona Framework Builder
- 2-3: Pain Point Mapper
- 2-4: JTBD Specialist
- 2-5: Signal Grader
- 2-6: Insight Loop Manager

### Block 3: Strategic Prioritization
- 3-1: Use Case Scorer
- 3-2: Segment Tier Analyst
- 3-3: Prioritization Expert
- 3-4: Tradeoff Tracker
- 3-5: Hypothesis Validator
- 3-6: Decision Archivist

### Block 4: Prototype Launch
- 4-1: Feature Matrix Builder
- 4-2: Technical Scope Expert
- 4-3: Pilot Group Selector
- 4-4: QA Criteria Setter
- 4-5: Timeline Planner
- 4-6: Post-Mortem Analyst

### Block 5: Go-To-Market Strategy (NEEDS NEW AGENTS)
- 5-1: GTMMessagingAgent (GTM Messaging Framework)
- 5-2: SalesEnablementAgent (Sales Enablement Assets)
- 5-3: PricingPackagingAgent (Pricing & Packaging Strategy)
- 5-4: ChannelPartnerAgent (Channel Partner Strategy)
- 5-5: CompetitivePositioningAgent (Competitive Positioning)
- 5-6: LaunchPlanningAgent (Launch Planning & Execution)

### Block 6: Customer Engagement Flywheel
- 6-1: Usage Heatmap Analyst
- 6-2: Milestone Tracker
- 6-3: CS Dashboard Builder
- 6-4: Activation Expert
- 6-5: Feedback Collector
- 6-6: Power User Analyst

### Block 7: Quantifiable Impact
- 7-1: Time/Cost Analyst
- 7-2: Revenue Impact Tracker
- 7-3: Productivity Measurer
- 7-4: Retention Analyst
- 7-5: System Reduction Expert
- 7-6: Friction Analyzer

### Block 8: Customer Success Expansion
- 8-1: Upsell Funnel Designer
- 8-2: Team Expansion Tracker
- 8-3: Organic Growth Analyst
- 8-4: Champion Mapper
- 8-5: Sentiment Tracker
- 8-6: Renewal Readiness Expert

### Block 9: Proof Execution
- 9-1: Inbound Conversion Analyst
- 9-2: Outbound Performance Tracker
- 9-3: Channel Economics Expert
- 9-4: Discovery Call Evaluator
- 9-5: Demo-to-Close Optimizer
- 9-6: Founder Sales Analyst

### Block 10: Sales Team Empowerment
- 10-1: Enablement Asset Manager
- 10-2: Rep Ramp Planner
- 10-3: Win/Loss Analyst
- 10-4: Objection Handler
- 10-5: ICP Filter Expert
- 10-6: Sales Call Librarian

### Block 11: High Performance Teams
- 11-1: Scorecard Designer
- 11-2: Quota Structure Expert
- 11-3: Deal Review Manager
- 11-4: Forecast Framework Builder
- 11-5: Coaching Loop Designer
- 11-6: Talent Gap Analyst

### Block 12: Retention Systems
- 12-1: Onboarding Optimizer
- 12-2: Activation Tracker
- 12-3: Success Playbook Builder
- 12-4: Escalation Manager
- 12-5: Renewal Pipeline Expert
- 12-6: Churn Root-Cause Analyst

### Block 13: Market Domination Strategies
- 13-1: Category Narrative Designer
- 13-2: Strategic Moat Builder
- 13-3: Ecosystem Mapper
- 13-4: Competitor Monitor
- 13-5: Brand Architect
- 13-6: Defensive GTM Strategist

### Block 14: Operational Infrastructure
- 14-1: System Architecture Expert
- 14-2: Revenue Engine Mapper
- 14-3: Dashboard Designer
- 14-4: Tool Consolidator
- 14-5: RevOps Playbook Builder
- 14-6: SLA Policy Manager

### Block 15: Leadership Expansion (NEEDS SPECIAL AGENTS)
- 15-1: ExecutiveHiringAgent (Executive Team)
- 15-2: BoardGovernanceAgent (Board Governance Framework)
- 15-3: SuccessionPlanningAgent (Succession Planning Matrix)
- 15-4: StakeholderAlignmentAgent (Stakeholder Alignment Plan)
- 15-5: InvestorRelationsAgent (Investor Relations Protocol)
- 15-6: LeadershipDynamicsAgent (Leadership Team Dynamics)

### Block 16: Global & Expansion Opportunities
- 16-1: Market Entry Analyst
- 16-2: Localization Expert
- 16-3: International Pricing Strategist
- 16-4: Compliance Tracker
- 16-5: Geo-GTM Specialist
- 16-6: Expansion Risk Assessor

## Implementation Plan

### Phase 1: Create Mapping Configuration
1. Create `agent-correct-mapping.js` with proper subcomponent-to-agent mappings
2. Update the mapping to use agent names (not keys) for clarity

### Phase 2: Create Missing Agents
1. Create Block 5 GTM agents (6 new agents)
2. Create Block 15 Leadership agents (6 new agents)
3. Ensure all agents have proper scoring dimensions and evaluation criteria

### Phase 3: Update Server Logic
1. Modify `combined-server.js` to use the new mapping
2. Ensure proper agent lookup based on subcomponent ID
3. Test all 96 subcomponent pages

### Phase 4: Verification
1. Test each block's subcomponents
2. Verify agent names match requirements
3. Ensure scoring and analysis work correctly
4. Validate education content, workspace questions, and templates

## Key Changes Required

### In combined-server.js:
- Replace the simple alphabetical mapping (1a, 1b, etc.) with proper agent name mapping
- Use the correct agent names from the document
- Handle special cases for Blocks 5 and 15

### New Files Needed:
1. `agent-correct-mapping.js` - Complete mapping table
2. `gtm-agents.js` - Block 5 GTM agents
3. `leadership-agents.js` - Block 15 Leadership agents

### Modified Files:
1. `agent-library.js` - Add new agents for Blocks 5 and 15
2. `combined-server.js` - Use correct mapping logic
3. `subcomponent-names-mapping.js` - Ensure subcomponent names are correct

## Success Criteria
1. All 96 subcomponents display the correct agent name
2. Agent expertise matches subcomponent purpose
3. Scoring dimensions are relevant to each subcomponent
4. Education content aligns with subcomponent goals
5. Workspace questions are appropriate for the domain
6. Templates and resources match the subcomponent needs

## Next Steps
1. Switch to Debug mode to implement the solution
2. Create the mapping and agent files
3. Update the server logic
4. Test all 96 subcomponents
5. Document the final implementation
# COMPLETE 96-SUBCOMPONENT MAPPING MATRIX
## Full Alignment Audit: Subcomponent → Agent → Education → Workspace

**Generated:** 2025-10-06  
**Purpose:** Comprehensive mapping of all misalignments across the system

---

## LEGEND

- ✅ **ALIGNED:** All layers match correctly
- ⚠️ **PARTIAL:** Minor discrepancies in naming/wording
- ❌ **MISALIGNED:** Critical mismatch between layers
- 🔍 **NEEDS VERIFICATION:** Requires manual testing

---

## BLOCK 1: MISSION DISCOVERY (6 subcomponents)

| ID | Subcomponent Name | Agent Name | Education Title | Workspace Domain | Status |
|---|---|---|---|---|---|
| 1-1 | Problem Statement Definition | Problem Definition Evaluator | Problem Statement Definition | Problem Statement Definition | ✅ ALIGNED |
| 1-2 | Mission Statement | Mission Alignment Advisor | Mission Statement | Mission Statement | ✅ ALIGNED |
| 1-3 | Voice of Customer | VoC Synthesizer | Customer Insight Capture | Voice of Customer | ⚠️ PARTIAL |
| 1-4 | Founding Team Capability | Team Gap Identifier | Founding Team Capability | Team Assessment | ⚠️ PARTIAL |
| 1-5 | Market Landscape | Market Mapper | Market Insight Synthesis | Market Landscape | ⚠️ PARTIAL |
| 1-6 | Launch Readiness | Launch Plan Assessor | Prototype Launch Plan | Launch Readiness | ⚠️ PARTIAL |

**Block 1 Summary:** 2 fully aligned, 4 partial (education titles differ slightly)

---

## BLOCK 2: CUSTOMER INSIGHTS (6 subcomponents) ⚠️ CRITICAL BLOCK

| ID | Subcomponent Name | Agent Name | Education Title | Workspace Domain | Status |
|---|---|---|---|---|---|
| 2-1 | Jobs to be Done | JTBD Specialist | Interview Cadence Plan | Interview Cadence | ❌ CRITICAL |
| 2-2 | Personas Framework | Persona Framework Builder | Personas Framework | Persona Development | ✅ ALIGNED |
| 2-3 | Interview Cadence | Interview Cadence Analyzer | Pain Point Mapping | Pain Point Analysis | ❌ CRITICAL |
| 2-4 | Pain Point Mapping | Pain Point Mapper | Jobs-to-be-Done Capture | Jobs to be Done | ❌ CRITICAL |
| 2-5 | Insight Action | Signal Grader | Signal Grading | Demand Signals | ❌ CRITICAL |
| 2-6 | Customer Journey | Insight Loop Manager | Insight-to-Action Loop | Insight Loop | ⚠️ PARTIAL |

**Block 2 Summary:** 1 aligned, 1 partial, 4 CRITICAL misalignments

### Block 2 Detailed Analysis

**The Pattern:** Education content appears to be **rotated/shifted** by 2 positions:

```
Correct Order:        Actual Education Content:
2-1: JTBD            → Interview Cadence (belongs to 2-3)
2-2: Personas        → Personas ✅
2-3: Interview       → Pain Point (belongs to 2-4)
2-4: Pain Point      → JTBD (belongs to 2-1)
2-5: Insight Action  → Signal Grading (close but wrong)
2-6: Customer Journey → Insight Loop (close)
```

---

## BLOCK 3: STRATEGIC PRIORITIZATION (6 subcomponents) ⚠️ CRITICAL BLOCK

| ID | Subcomponent Name | Agent Name | Education Title | Workspace Domain | Agent OLD Role | Status |
|---|---|---|---|---|---|---|
| 3-1 | Use Case Scoring Model | Use Case Scorer | Use Case Scoring Model | Use Case Prioritization | Use Case Analysis | ✅ ALIGNED |
| 3-2 | Segment Tiering | Segment Tier Analyst | Segment Tiering | Resource Allocation | Resource Allocation | ❌ CRITICAL |
| 3-3 | Prioritization Rubric | Prioritization Expert | Resource Allocation Framework | Risk Assessment | Risk Assessment | ❌ CRITICAL |
| 3-4 | Tradeoff Tracker | Tradeoff Tracker | Competitive Positioning | Timeline Planning | Timeline Management | ❌ CRITICAL |
| 3-5 | Hypothesis Board | Hypothesis Validator | Risk Assessment | Success Metrics | Success Metrics | ❌ CRITICAL |
| 3-6 | Decision Archive | Decision Archivist | Opportunity Evaluation | Decision Framework | Decision Framework | ⚠️ PARTIAL |

**Block 3 Summary:** 1 aligned, 1 partial, 4 CRITICAL misalignments

### Block 3 Detailed Analysis

**The Pattern:** Workspace domains match the WRONG "role" field from obsolete mapping:

```
ID   | Subcomponent Name      | Workspace Domain (WRONG) | Should Be
-----|------------------------|--------------------------|------------------
3-2  | Segment Tiering        | Resource Allocation      | Segment Tiering
3-3  | Prioritization Rubric  | Risk Assessment          | Prioritization Rubric
3-4  | Tradeoff Tracker       | Timeline Planning        | Tradeoff Tracker
3-5  | Hypothesis Board       | Success Metrics          | Hypothesis Board
```

**Root Cause:** The obsolete `agent-subcomponent-mapping.js` "role" field was used to generate workspace questions!

---

## BLOCK 4: PROTOTYPE LAUNCH (6 subcomponents)

| ID | Subcomponent Name | Agent Name | Education Title | Workspace Domain | Status |
|---|---|---|---|---|---|
| 4-1 | Feature Inclusion Matrix | Feature Matrix Builder | Feature Inclusion Matrix | MVP Definition | ⚠️ PARTIAL |
| 4-2 | Technical Scope Tracker | Technical Scope Expert | Technical Scope Tracker | Feature Prioritization | ❌ MISMATCH |
| 4-3 | Pilot Group Selection | Pilot Group Selector | Pilot Group Selection | Testing Strategy | ⚠️ PARTIAL |
| 4-4 | QA & Success Criteria | QA Criteria Setter | QA & Success Criteria | Feedback Loops | ❌ MISMATCH |
| 4-5 | Timeline GANTT or Roadmap | Timeline Planner | Timeline Gantt or Roadmap | Iteration Planning | ⚠️ PARTIAL |
| 4-6 | Post-Mortem Template | Post-Mortem Analyst | Post-Mortem Template | Launch Strategy | ⚠️ PARTIAL |

**Block 4 Summary:** 0 fully aligned, 4 partial, 2 misalignments

---

## BLOCK 5: GO-TO-MARKET STRATEGY (6 subcomponents)

| ID | Subcomponent Name | Agent Name | Education Title | Workspace Domain | Status |
|---|---|---|---|---|---|
| 5-1 | GTM Messaging Framework | GTMMessagingAgent | Case Study Template | Case Study Development | ❌ CRITICAL |
| 5-2 | Sales Enablement Assets | SalesEnablementAgent | ROI Calculation Sheet | Messaging Framework | ❌ CRITICAL |
| 5-3 | Pricing & Packaging Strategy | PricingPackagingAgent | Reference Program | Channel Strategy | ❌ CRITICAL |
| 5-4 | Channel Partner Strategy | ChannelPartnerAgent | Social Proof Collection | Pricing Model | ❌ CRITICAL |
| 5-5 | Competitive Positioning | CompetitivePositioningAgent | Pilot Program Management | Sales Enablement | ❌ CRITICAL |
| 5-6 | Launch Planning & Execution | LaunchPlanningAgent | Feedback Integration | Launch Planning | ❌ CRITICAL |

**Block 5 Summary:** 0 aligned, 6 CRITICAL misalignments - **ENTIRE BLOCK WRONG**

### Block 5 Analysis
**MAJOR ISSUE:** Education content appears to be from a completely different block (Early Adopter Wins content in GTM Strategy block)

---

## BLOCK 6: CUSTOMER ENGAGEMENT FLYWHEEL (6 subcomponents)

| ID | Subcomponent Name | Agent Name | Education Title | Workspace Domain | Status |
|---|---|---|---|---|---|
| 6-1 | Usage Heatmap | Usage Heatmap Analyst | Usage Heatmap | Acquisition Strategy | ❌ MISMATCH |
| 6-2 | Milestone Triggers | Milestone Tracker | Milestone Triggers | Activation Process | ❌ MISMATCH |
| 6-3 | CS Dashboard | CS Dashboard Builder | Engagement Scoring System | Retention Programs | ❌ MISMATCH |
| 6-4 | Activation Metric Model | Activation Expert | Retention Playbooks | Referral Systems | ❌ MISMATCH |
| 6-5 | Feedback Collector | Feedback Collector | Product Adoption Tracker | Revenue Optimization | ❌ MISMATCH |
| 6-6 | Power User Behavior Signals | Power User Analyst | Customer Feedback Loop | Engagement Metrics | ❌ MISMATCH |

**Block 6 Summary:** 0 aligned, 6 misalignments

---

## BLOCK 7: QUANTIFIABLE IMPACT (6 subcomponents)

| ID | Subcomponent Name | Agent Name | Education Title | Workspace Domain | Status |
|---|---|---|---|---|---|
| 7-1 | Time/Cost Savings Metrics | Time/Cost Analyst | Time/Cost Savings Metrics | KPI Framework | ❌ MISMATCH |
| 7-2 | Revenue-Impact Attribution | Revenue Impact Tracker | Productivity Gains | Data Collection | ❌ MISMATCH |
| 7-3 | Productivity Lift Metrics | Productivity Measurer | Outcome Tracking | Analytics Setup | ❌ MISMATCH |
| 7-4 | Net Retention Trends | Retention Analyst | Benchmark Comparisons | Impact Metrics | ❌ MISMATCH |
| 7-5 | Downstream System Reductions | System Reduction Expert | Attribution Models | ROI Calculation | ❌ MISMATCH |
| 7-6 | Friction Reduction Evidence | Friction Analyzer | Executive Dashboard | Reporting Systems | ❌ MISMATCH |

**Block 7 Summary:** 0 aligned, 6 misalignments

---

## BLOCK 8: CUSTOMER SUCCESS EXPANSION (6 subcomponents)

| ID | Subcomponent Name | Agent Name | Education Title | Workspace Domain | Status |
|---|---|---|---|---|---|
| 8-1 | Upsell Funnel Model | Upsell Funnel Designer | Onboarding Playbook | Success Planning | ❌ MISMATCH |
| 8-2 | Team Expansion Signals | Team Expansion Tracker | Health Score Algorithm | Onboarding Process | ❌ MISMATCH |
| 8-3 | Organic Adoption Pattern | Organic Growth Analyst | Expansion Triggers | Support Systems | ❌ MISMATCH |
| 8-4 | Champion Mapping | Champion Mapper | Support Ticket Taxonomy | Upsell Strategy | ❌ MISMATCH |
| 8-5 | CSAT/NPS Tracking | Sentiment Tracker | Knowledge Base Structure | Renewal Process | ❌ MISMATCH |
| 8-6 | Renewal Readiness Tracker | Renewal Readiness Expert | Renewal Forecasting | Advocacy Programs | ❌ MISMATCH |

**Block 8 Summary:** 0 aligned, 6 misalignments

---

## BLOCK 9: PROOF EXECUTION (6 subcomponents)

| ID | Subcomponent Name | Agent Name | Education Title | Workspace Domain | Status |
|---|---|---|---|---|---|
| 9-1 | Inbound Conversion Rates | Inbound Conversion Analyst | Inbound Conversion Rates | Pilot Programs | ❌ MISMATCH |
| 9-2 | Outbound Play Performance | Outbound Performance Tracker | Outbound Play Performance | Case Studies | ❌ MISMATCH |
| 9-3 | Channel Economics Clarity | Channel Economics Expert | Channel Economics Clarity | Reference Customers | ❌ MISMATCH |
| 9-4 | Discovery Call Effectiveness | Discovery Call Evaluator | Discovery Call Effectiveness | Success Stories | ❌ MISMATCH |
| 9-5 | Demo-to-Close Flow | Demo-to-Close Optimizer | Demo-to-Close Flow | ROI Documentation | ❌ MISMATCH |
| 9-6 | Founders Selling Model | Founder Sales Analyst | Founders Selling Model | Market Validation | ❌ MISMATCH |

**Block 9 Summary:** 0 aligned (education titles match but workspace domains wrong), 6 workspace misalignments

---

## BLOCK 10: SALES TEAM EMPOWERMENT (6 subcomponents)

| ID | Subcomponent Name | Agent Name | Education Title | Workspace Domain | Status |
|---|---|---|---|---|---|
| 10-1 | Enablement Asset Pack | Enablement Asset Manager | Enablement Asset Pack | Sales Enablement Assets | ⚠️ PARTIAL |
| 10-2 | Rep Ramp Plan | Rep Ramp Planner | Rep Ramp Plan | Playbook Development | ❌ MISMATCH |
| 10-3 | Win/Loss Tracker | Win/Loss Analyst | Win/Loss Tracker | Tool Implementation | ❌ MISMATCH |
| 10-4 | Objection Handling Guide | Objection Handler | Objection Handling Guide | Performance Tracking | ❌ MISMATCH |
| 10-5 | ICP Filter Checklist | ICP Filter Expert | ICP Filter Checklist | Incentive Design | ❌ MISMATCH |
| 10-6 | Sales Call Library | Sales Call Librarian | Sales Call Library | Team Scaling | ❌ MISMATCH |

**Block 10 Summary:** 0 fully aligned, 1 partial, 5 misalignments

---

## BLOCK 11: HIGH PERFORMANCE TEAMS (6 subcomponents)

| ID | Subcomponent Name | Agent Name | Education Title | Workspace Domain | Status |
|---|---|---|---|---|---|
| 11-1 | Scorecard Model | Scorecard Designer | Scorecard Model | Team Structure | ❌ MISMATCH |
| 11-2 | Quota Structure | Quota Structure Expert | Quota Structure | Hiring Process | ❌ MISMATCH |
| 11-3 | Weekly Deal Reviews | Deal Review Manager | Weekly Deal Reviews | Culture Building | ❌ MISMATCH |
| 11-4 | Forecasting Framework | Forecast Framework Builder | Forecasting Framework | Performance Management | ❌ MISMATCH |
| 11-5 | Manager Coaching Loop | Coaching Loop Designer | Manager Coaching Loop | Development Programs | ❌ MISMATCH |
| 11-6 | Talent Gap Identification | Talent Gap Analyst | Talent Gap Identification | Leadership Pipeline | ❌ MISMATCH |

**Block 11 Summary:** 0 aligned, 6 workspace domain misalignments

---

## BLOCK 12: RETENTION SYSTEMS (6 subcomponents)

| ID | Subcomponent Name | Agent Name | Education Title | Workspace Domain | Status |
|---|---|---|---|---|---|
| 12-1 | Onboarding Checklist | Onboarding Optimizer | Onboarding Checklist | Churn Analysis | ❌ MISMATCH |
| 12-2 | Activation Tracker | Activation Tracker | Activation Tracker | Retention Strategies | ❌ MISMATCH |
| 12-3 | Success Playbooks | Success Playbook Builder | Success Playbooks | Customer Health | ❌ MISMATCH |
| 12-4 | Escalation SOPs | Escalation Manager | Escalation SOPs | Engagement Programs | ❌ MISMATCH |
| 12-5 | Renewals Pipelines | Renewal Pipeline Expert | Renewals Pipeline | Win-back Campaigns | ❌ MISMATCH |
| 12-6 | Churn Root-Cause Engine | Churn Root-Cause Analyst | Churn Root-Cause Engine | Loyalty Programs | ❌ MISMATCH |

**Block 12 Summary:** 0 aligned, 6 workspace domain misalignments

---

## BLOCK 13: MARKET DOMINATION STRATEGIES (6 subcomponents)

| ID | Subcomponent Name | Agent Name | Education Title | Workspace Domain | Status |
|---|---|---|---|---|---|
| 13-1 | Category Narrative Canvas | Category Narrative Designer | Category Narrative Canvas | Competitive Analysis | ❌ MISMATCH |
| 13-2 | Strategic MOAT Design | Strategic Moat Builder | Strategic Moat Design | Market Positioning | ❌ MISMATCH |
| 13-3 | Ecosystem Leverage Map | Ecosystem Mapper | Ecosystem Development | Category Creation | ❌ MISMATCH |
| 13-4 | Competitor GTM Monitoring | Competitor Monitor | M&A Strategy | Thought Leadership | ❌ MISMATCH |
| 13-5 | Brand Architecture Plan | Brand Architect | Market Leadership | Strategic Partnerships | ❌ MISMATCH |
| 13-6 | Defensive GTM Tactics | Defensive GTM Strategist | Competitive Intelligence | Market Expansion | ❌ MISMATCH |

**Block 13 Summary:** 0 aligned, 6 misalignments (both education and workspace wrong)

---

## BLOCK 14: OPERATIONAL INFRASTRUCTURE (6 subcomponents)

| ID | Subcomponent Name | Agent Name | Education Title | Workspace Domain | Status |
|---|---|---|---|---|---|
| 14-1 | System Architecture Diagram | System Architecture Expert | System Architecture Diagram | Process Optimization | ❌ MISMATCH |
| 14-2 | Revenue Engine Map | Revenue Engine Mapper | Revenue Engine Map | Technology Stack | ❌ MISMATCH |
| 14-3 | Internal Dashboards | Dashboard Designer | Process Automation Map | Automation Systems | ❌ MISMATCH |
| 14-4 | Tool Consolidation Tracker | Tool Consolidator | Data Infrastructure Design | Quality Control | ❌ MISMATCH |
| 14-5 | RevOps Playbook | RevOps Playbook Builder | Security & Compliance Framework | Supply Chain | ❌ MISMATCH |
| 14-6 | Internal SLA Policy | SLA Policy Manager | Scalability Planning | Risk Management | ❌ MISMATCH |

**Block 14 Summary:** 0 aligned, 6 misalignments

---

## BLOCK 15: LEADERSHIP EXPANSION (6 subcomponents)

| ID | Subcomponent Name | Agent Name | Education Title | Workspace Domain | Status |
|---|---|---|---|---|---|
| 15-1 | Executive Team | ExecutiveHiringAgent | Executive Hiring Roadmap | Executive Development | ⚠️ PARTIAL |
| 15-2 | Board Development | BoardGovernanceAgent | Board Governance Framework | Board Relations | ⚠️ PARTIAL |
| 15-3 | Succession Planning | SuccessionPlanningAgent | Succession Planning Matrix | Succession Planning | ✅ ALIGNED |
| 15-4 | Stakeholder Alignment | StakeholderAlignmentAgent | Stakeholder Alignment Plan | Leadership Training | ❌ MISMATCH |
| 15-5 | Investor Relations | InvestorRelationsAgent | Investor Relations Protocol | Vision Alignment | ❌ MISMATCH |
| 15-6 | Leadership Dynamics | LeadershipDynamicsAgent | Leadership Team Dynamics | Strategic Planning | ❌ MISMATCH |

**Block 15 Summary:** 1 aligned, 2 partial, 3 misalignments

---

## BLOCK 16: GLOBAL EXPANSION OPPORTUNITIES (6 subcomponents)

| ID | Subcomponent Name | Agent Name | Education Title | Workspace Domain | Status |
|---|---|---|---|---|---|
| 16-1 | Market Selection | Market Entry Analyst | Market Entry Strategy | Market Selection | ⚠️ PARTIAL |
| 16-2 | Localization Infrastructure | Localization Expert | Localization Roadmap | Entry Strategy | ❌ MISMATCH |
| 16-3 | International Pricing Matrix | International Pricing Strategist | Global Operations Playbook | Localization | ❌ MISMATCH |
| 16-4 | Regional Compliance Tracker | Compliance Tracker | Regulatory Compliance Map | Global Partnerships | ❌ MISMATCH |
| 16-5 | Geo-Specific GTM Playbooks | Geo-GTM Specialist | Partnership Ecosystem Strategy | Regulatory Compliance | ❌ MISMATCH |
| 16-6 | Expansion Risk Assessment | Expansion Risk Assessor | Cultural Adaptation Framework | Global Operations | ❌ MISMATCH |

**Block 16 Summary:** 0 aligned, 1 partial, 5 misalignments

---

## OVERALL STATISTICS

### Alignment Summary
- ✅ **Fully Aligned:** 5/96 (5.2%)
- ⚠️ **Partially Aligned:** 15/96 (15.6%)
- ❌ **Misaligned:** 76/96 (79.2%)

### By Block
| Block | Aligned | Partial | Misaligned | Severity |
|---|---|---|---|---|
| 1 | 2 | 4 | 0 | 🟢 LOW |
| 2 | 1 | 1 | 4 | 🔴 CRITICAL |
| 3 | 1 | 1 | 4 | 🔴 CRITICAL |
| 4 | 0 | 4 | 2 | 🟡 MEDIUM |
| 5 | 0 | 0 | 6 | 🔴 CRITICAL |
| 6 | 0 | 0 | 6 | 🔴 CRITICAL |
| 7 | 0 | 0 | 6 | 🔴 CRITICAL |
| 8 | 0 | 0 | 6 | 🔴 CRITICAL |
| 9 | 0 | 0 | 6 | 🔴 CRITICAL |
| 10 | 0 | 1 | 5 | 🔴 CRITICAL |
| 11 | 0 | 0 | 6 | 🔴 CRITICAL |
| 12 | 0 | 0 | 6 | 🔴 CRITICAL |
| 13 | 0 | 0 | 6 | 🔴 CRITICAL |
| 14 | 0 | 0 | 6 | 🔴 CRITICAL |
| 15 | 1 | 2 | 3 | 🟡 MEDIUM |
| 16 | 0 | 1 | 5 | 🔴 CRITICAL |

### Critical Blocks Requiring Immediate Attention
1. **Block 2:** Customer Insights (4/6 critical)
2. **Block 3:** Strategic Prioritization (4/6 critical)
3. **Block 5:** GTM Strategy (6/6 critical - ENTIRE BLOCK)
4. **Blocks 6-14:** All have 100% misalignment in workspace domains

---

## PATTERN ANALYSIS

### Pattern 1: Education Content Rotation (Block 2)
Education content appears shifted by 2 positions in Block 2

### Pattern 2: Workspace Domain Uses OLD "Role" Field (Blocks 3, 6-14)
Workspace domains match the obsolete "role" field from `agent-subcomponent-mapping.js`

### Pattern 3: Complete Block Mismatch (Block 5)
Block 5 education content appears to be from a different block entirely

### Pattern 4: Partial Alignment (Block 1, 15, 16)
Some blocks have education titles that are close but not exact matches

---

## IMPACT BY LAYER

### Layer 1: Subcomponent Names ✅
**Status:** CORRECT  
**Source:** `subcomponent-names-mapping.js`  
**Action:** None needed

### Layer 2: Agent Names ✅
**Status:** CORRECT  
**Source:** `agent-correct-mapping.js`  
**Action:** Add missing AGENT_NAME_TO_KEY export

### Layer 3: Education Content ❌
**Status:** 76/96 MISALIGNED  
**Source:** `educational-content.js`  
**Action:** Re-index ALL content to match subcomponent names

### Layer 4: Workspace Questions ❌
**Status:** 76/96 MISALIGNED  
**Source:** `agent-generated-questions-complete.js`  
**Action:** Update ALL domain names to match subcomponent names

### Layer 5: Agent Definitions ⚠️
**Status:** FUNCTIONAL but uses indirect mapping  
**Source:** `agent-library.js`  
**Action:** Consider refactoring to use subcomponent IDs directly

---

## RECOMMENDED FIX STRATEGY

### Phase 1: Stop the Bleeding (Immediate)
1. Delete or rename `agent-subcomponent-mapping.js` to prevent further use
2. Add complete `AGENT_NAME_TO_KEY` to `agent-correct-mapping.js`
3. Document the correct mapping chain

### Phase 2: Re-index Content (1-2 days)
1. Create mapping script to re-index `educational-content.js`
2. Update all 96 entries to match `subcomponent-names-mapping.js`
3. Validate each entry manually

### Phase 3: Fix Workspace Questions (1-2 days)
1. Update all 96 domain names in `agent-generated-questions-complete.js`
2. Ensure questions align with subcomponent purpose
3. Validate question relevance

### Phase 4: Validation (1 day)
1. Test all 96 subcomponents end-to-end
2. Verify education content matches subcomponent
3. Verify workspace questions match subcomponent
4. Verify agent analysis aligns with content

### Phase 5: Prevention (Ongoing)
1. Create automated validation tests
2. Implement single source of truth pattern
3. Add CI/CD checks for alignment
4. Document correct architecture

---

## NEXT STEPS

1. ✅ **User Review:** Review this analysis for accuracy
2. ⏳ **Prioritization:** Decide which blocks to fix first
3. ⏳ **Approach Selection:** Choose fix strategy (re-index vs. refactor)
4. ⏳ **Resource Allocation:** Assign time/people to fix
5. ⏳ **Implementation:** Execute systematic fix
6. ⏳ **Validation:** Test all 96 subcomponents
7. ⏳ **Documentation:** Update architecture docs

---

## APPENDIX A: Correct Mapping Reference

### Block 2 CORRECT Mapping
```
2-1: Jobs to be Done → JTBD Specialist → JTBD content → JTBD questions
2-2: Personas Framework → Persona Framework Builder → Persona content → Persona questions
2-3: Interview Cadence → Interview Cadence Analyzer → Interview content → Interview questions
2-4: Pain Point Mapping → Pain Point Mapper → Pain Point content → Pain Point questions
2-5: Insight Action → Signal Grader → Insight Action content → Insight Action questions
2-6: Customer Journey → Insight Loop Manager → Customer Journey content → Journey questions
```

### Block 3 CORRECT Mapping
```
3-1: Use Case Scoring Model → Use Case Scorer → Use Case content → Use Case questions
3-2: Segment Tiering → Segment Tier Analyst → Segment Tiering content → Segment questions
3-3: Prioritization Rubric → Prioritization Expert → Prioritization content → Prioritization questions
3-4: Tradeoff Tracker → Tradeoff Tracker → Tradeoff content → Tradeoff questions
3-5: Hypothesis Board → Hypothesis Validator → Hypothesis content → Hypothesis questions
3-6: Decision Archive → Decision Archivist → Decision Archive content → Decision questions
```

---

## APPENDIX B: Files Requiring Changes

### Critical Files (Must Fix)
1. ✅ `subcomponent-names-mapping.js` - NO CHANGES (already correct)
2. ⚠️ `agent-correct-mapping.js` - ADD AGENT_NAME_TO_KEY export
3. ❌ `educational-content.js` - RE-INDEX all 96 entries
4. ❌ `agent-generated-questions-complete.js` - UPDATE all 96 domain names
5. ❌ `agent-subcomponent-mapping.js` - DELETE or mark obsolete

### Supporting Files (May Need Updates)
6. `server-with-backend.js` - Verify uses correct sources
7. `integrated-agent-library.js` - Verify mapping chain works
8. `agent-library.js` - Consider refactoring key system

### Test Files (Update After Fix)
9. All test files using old mappings
10. Validation scripts

---

**End of Analysis**  
**Recommendation:** Proceed with systematic re-indexing of education and workspace content  
**Estimated Effort:** 3-5 days for complete fix and validation  
**Risk Level:** HIGH if not fixed, LOW if fixed systematically
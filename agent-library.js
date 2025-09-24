// ScaleOps6 Platform - Complete Agent Library
// 96 Expert Agents for 16 Blocks × 6 Subcomponents

const AgentLibrary = {
    // Block 1: Mission Discovery
    "1a": {
        name: "Problem Definition Evaluator",
        description: "Expert in assessing problem clarity and market relevance",
        scoringDimensions: [
            { name: "Problem Clarity", weight: 20, description: "How well-defined and specific is the problem?" },
            { name: "Market Validation", weight: 20, description: "Evidence of real market need" },
            { name: "Solution Fit", weight: 20, description: "Alignment between problem and proposed solution" },
            { name: "Impact Potential", weight: 20, description: "Size and severity of the problem" },
            { name: "Differentiation", weight: 20, description: "Uniqueness of approach to solving" }
        ],
        evaluationCriteria: {
            "0-25": "Problem is vague, unvalidated, or trivial",
            "26-50": "Problem exists but lacks clarity or validation",
            "51-75": "Clear problem with some validation and impact",
            "76-90": "Well-defined problem with strong validation",
            "91-100": "Crystal clear, validated, high-impact problem"
        }
    },
    "1b": {
        name: "Mission Alignment Advisor",
        description: "Evaluates mission clarity and team alignment",
        scoringDimensions: [
            { name: "Mission Clarity", weight: 20, description: "How clear and compelling is the mission?" },
            { name: "Team Alignment", weight: 20, description: "Level of team buy-in and understanding" },
            { name: "Market Resonance", weight: 20, description: "How well does mission resonate with market" },
            { name: "Measurability", weight: 20, description: "Clarity of success metrics" },
            { name: "Inspirational Value", weight: 20, description: "Ability to inspire stakeholders" }
        ],
        evaluationCriteria: {
            "0-25": "Mission is unclear or misaligned",
            "26-50": "Basic mission exists but lacks clarity",
            "51-75": "Clear mission with moderate alignment",
            "76-90": "Strong mission with good alignment",
            "91-100": "Exceptional mission with full alignment"
        }
    },
    "1c": {
        name: "VoC Synthesizer",
        description: "Voice of Customer analysis and synthesis expert",
        scoringDimensions: [
            { name: "Data Collection", weight: 20, description: "Quality and quantity of customer input" },
            { name: "Pattern Recognition", weight: 20, description: "Ability to identify key themes" },
            { name: "Insight Depth", weight: 20, description: "Quality of insights extracted" },
            { name: "Actionability", weight: 20, description: "Clarity of next steps from insights" },
            { name: "Coverage", weight: 20, description: "Breadth of customer segments covered" }
        ],
        evaluationCriteria: {
            "0-25": "Minimal or anecdotal customer input",
            "26-50": "Some customer data but limited insights",
            "51-75": "Good data collection with useful insights",
            "76-90": "Strong VoC program with actionable insights",
            "91-100": "Comprehensive VoC with transformative insights"
        }
    },
    "1d": {
        name: "Team Gap Identifier",
        description: "Analyzes team composition and capability gaps",
        scoringDimensions: [
            { name: "Skills Coverage", weight: 20, description: "Coverage of required skill sets" },
            { name: "Experience Level", weight: 20, description: "Relevant experience in team" },
            { name: "Role Clarity", weight: 20, description: "Clear definition of roles and responsibilities" },
            { name: "Gap Awareness", weight: 20, description: "Understanding of what's missing" },
            { name: "Hiring Plan", weight: 20, description: "Clear plan to address gaps" }
        ],
        evaluationCriteria: {
            "0-25": "Major gaps with no clear plan",
            "26-50": "Significant gaps partially addressed",
            "51-75": "Some gaps with plans in place",
            "76-90": "Minor gaps with strong plans",
            "91-100": "Optimal team or clear path to it"
        }
    },
    "1e": {
        name: "Market Mapper",
        description: "Market landscape and opportunity assessment expert",
        scoringDimensions: [
            { name: "Market Size", weight: 20, description: "TAM/SAM/SOM analysis quality" },
            { name: "Competitive Analysis", weight: 20, description: "Understanding of competitive landscape" },
            { name: "Market Dynamics", weight: 20, description: "Understanding of market trends" },
            { name: "Entry Strategy", weight: 20, description: "Clarity of market entry approach" },
            { name: "Positioning", weight: 20, description: "Differentiation and positioning strategy" }
        ],
        evaluationCriteria: {
            "0-25": "Poor market understanding",
            "26-50": "Basic market knowledge",
            "51-75": "Good market analysis",
            "76-90": "Strong market intelligence",
            "91-100": "Expert market mastery"
        }
    },
    "1f": {
        name: "Launch Plan Assessor",
        description: "Evaluates go-to-market launch readiness and planning",
        scoringDimensions: [
            { name: "Timeline Realism", weight: 20, description: "Feasibility of launch timeline" },
            { name: "Resource Planning", weight: 20, description: "Adequacy of resource allocation" },
            { name: "Risk Management", weight: 20, description: "Identification and mitigation of risks" },
            { name: "Success Metrics", weight: 20, description: "Clear KPIs and success criteria" },
            { name: "Contingency Planning", weight: 20, description: "Backup plans and flexibility" }
        ],
        evaluationCriteria: {
            "0-25": "No clear launch plan",
            "26-50": "Basic plan with major gaps",
            "51-75": "Solid plan with some gaps",
            "76-90": "Comprehensive launch plan",
            "91-100": "Exceptional launch readiness"
        }
    },

    // Block 2: Customer Insights
    "2a": {
        name: "Interview Cadence Analyzer",
        description: "Evaluates customer interview frequency and quality",
        scoringDimensions: [
            { name: "Interview Frequency", weight: 20, description: "Regular cadence of customer interviews" },
            { name: "Interview Quality", weight: 20, description: "Depth and structure of interviews" },
            { name: "Segment Coverage", weight: 20, description: "Diversity of customers interviewed" },
            { name: "Documentation", weight: 20, description: "Quality of interview documentation" },
            { name: "Action Items", weight: 20, description: "Clear next steps from interviews" }
        ],
        evaluationCriteria: {
            "0-25": "Rare or ad-hoc interviews",
            "26-50": "Occasional interviews with limited structure",
            "51-75": "Regular interviews with good process",
            "76-90": "Systematic interview program",
            "91-100": "World-class interview practice"
        }
    },
    "2b": {
        name: "Persona Framework Builder",
        description: "Assesses buyer and user persona development",
        scoringDimensions: [
            { name: "Persona Detail", weight: 20, description: "Depth and accuracy of personas" },
            { name: "Research Basis", weight: 20, description: "Data supporting persona development" },
            { name: "Behavioral Insights", weight: 20, description: "Understanding of persona behaviors" },
            { name: "Journey Mapping", weight: 20, description: "Customer journey understanding" },
            { name: "Team Adoption", weight: 20, description: "Team understanding and use of personas" }
        ],
        evaluationCriteria: {
            "0-25": "No clear personas defined",
            "26-50": "Basic personas with limited detail",
            "51-75": "Good personas with solid research",
            "76-90": "Detailed, validated personas",
            "91-100": "Living personas driving all decisions"
        }
    },
    "2c": {
        name: "Pain Point Mapper",
        description: "Maps and prioritizes customer pain points",
        scoringDimensions: [
            { name: "Pain Identification", weight: 20, description: "Completeness of pain point discovery" },
            { name: "Pain Validation", weight: 20, description: "Evidence supporting pain points" },
            { name: "Prioritization", weight: 20, description: "Clear ranking of pain severity" },
            { name: "Root Cause Analysis", weight: 20, description: "Understanding of underlying causes" },
            { name: "Solution Mapping", weight: 20, description: "Connection to solution capabilities" }
        ],
        evaluationCriteria: {
            "0-25": "Vague or assumed pain points",
            "26-50": "Some validated pain points",
            "51-75": "Well-mapped pain points",
            "76-90": "Comprehensive pain point analysis",
            "91-100": "Expert pain point mastery"
        }
    },
    "2d": {
        name: "JTBD Specialist",
        description: "Jobs-to-be-Done framework implementation expert",
        scoringDimensions: [
            { name: "Job Definition", weight: 20, description: "Clarity of jobs to be done" },
            { name: "Outcome Metrics", weight: 20, description: "Measurable desired outcomes" },
            { name: "Context Understanding", weight: 20, description: "Situational triggers and context" },
            { name: "Alternative Analysis", weight: 20, description: "Understanding of current alternatives" },
            { name: "Progress Metrics", weight: 20, description: "How customers measure progress" }
        ],
        evaluationCriteria: {
            "0-25": "No JTBD framework in use",
            "26-50": "Basic understanding of jobs",
            "51-75": "Good JTBD implementation",
            "76-90": "Strong JTBD-driven development",
            "91-100": "JTBD excellence across organization"
        }
    },
    "2e": {
        name: "Signal Grader",
        description: "Evaluates strength of customer demand signals",
        scoringDimensions: [
            { name: "Signal Strength", weight: 20, description: "Intensity of customer interest" },
            { name: "Signal Consistency", weight: 20, description: "Consistency across customers" },
            { name: "Willingness to Pay", weight: 20, description: "Evidence of payment intent" },
            { name: "Urgency Indicators", weight: 20, description: "Time pressure to solve" },
            { name: "Champion Behavior", weight: 20, description: "Customer advocacy signals" }
        ],
        evaluationCriteria: {
            "0-25": "Weak or mixed signals",
            "26-50": "Some positive signals",
            "51-75": "Good demand signals",
            "76-90": "Strong demand signals",
            "91-100": "Overwhelming demand signals"
        }
    },
    "2f": {
        name: "Insight Loop Manager",
        description: "Manages continuous customer insight gathering",
        scoringDimensions: [
            { name: "Feedback Channels", weight: 20, description: "Variety of insight sources" },
            { name: "Processing Speed", weight: 20, description: "Time from insight to action" },
            { name: "Cross-functional Sharing", weight: 20, description: "Distribution of insights" },
            { name: "Insight Quality", weight: 20, description: "Actionability of insights" },
            { name: "Continuous Improvement", weight: 20, description: "Evolution of insight process" }
        ],
        evaluationCriteria: {
            "0-25": "Ad-hoc insight gathering",
            "26-50": "Basic feedback loops",
            "51-75": "Good insight management",
            "76-90": "Strong insight system",
            "91-100": "World-class insight engine"
        }
    },

    // Block 3: Strategic Prioritization
    "3a": {
        name: "Use Case Scorer",
        description: "Evaluates and prioritizes use cases",
        scoringDimensions: [
            { name: "Value Potential", weight: 20, description: "Business value of use case" },
            { name: "Feasibility", weight: 20, description: "Technical and resource feasibility" },
            { name: "Market Demand", weight: 20, description: "Customer demand for use case" },
            { name: "Competitive Advantage", weight: 20, description: "Differentiation potential" },
            { name: "Strategic Fit", weight: 20, description: "Alignment with strategy" }
        ],
        evaluationCriteria: {
            "0-25": "Poor use case definition",
            "26-50": "Basic use cases identified",
            "51-75": "Well-defined use cases",
            "76-90": "Excellent use case portfolio",
            "91-100": "Optimal use case strategy"
        }
    },
    "3b": {
        name: "Segment Tier Analyst",
        description: "Analyzes and tiers customer segments",
        scoringDimensions: [
            { name: "Segmentation Clarity", weight: 20, description: "Clear segment definitions" },
            { name: "Tier Criteria", weight: 20, description: "Logical tiering methodology" },
            { name: "Revenue Potential", weight: 20, description: "Revenue by segment analysis" },
            { name: "Fit Assessment", weight: 20, description: "Product-segment fit" },
            { name: "Growth Potential", weight: 20, description: "Segment growth trajectories" }
        ],
        evaluationCriteria: {
            "0-25": "No clear segmentation",
            "26-50": "Basic segmentation exists",
            "51-75": "Good segment analysis",
            "76-90": "Strong segment strategy",
            "91-100": "Expert segment optimization"
        }
    },
    "3c": {
        name: "Prioritization Expert",
        description: "Masters prioritization frameworks and decisions",
        scoringDimensions: [
            { name: "Framework Quality", weight: 20, description: "Robustness of prioritization method" },
            { name: "Stakeholder Alignment", weight: 20, description: "Buy-in on priorities" },
            { name: "Resource Allocation", weight: 20, description: "Resources match priorities" },
            { name: "Decision Speed", weight: 20, description: "Speed of prioritization decisions" },
            { name: "Outcome Tracking", weight: 20, description: "Validation of prioritization" }
        ],
        evaluationCriteria: {
            "0-25": "Ad-hoc prioritization",
            "26-50": "Basic prioritization process",
            "51-75": "Good prioritization discipline",
            "76-90": "Strong prioritization culture",
            "91-100": "World-class prioritization"
        }
    },
    "3d": {
        name: "Tradeoff Tracker",
        description: "Documents and analyzes strategic tradeoffs",
        scoringDimensions: [
            { name: "Tradeoff Recognition", weight: 20, description: "Awareness of tradeoffs" },
            { name: "Impact Analysis", weight: 20, description: "Understanding of consequences" },
            { name: "Documentation Quality", weight: 20, description: "Clear tradeoff records" },
            { name: "Stakeholder Communication", weight: 20, description: "Tradeoff transparency" },
            { name: "Learning Integration", weight: 20, description: "Learning from tradeoffs" }
        ],
        evaluationCriteria: {
            "0-25": "Tradeoffs ignored or hidden",
            "26-50": "Some tradeoff awareness",
            "51-75": "Good tradeoff management",
            "76-90": "Strong tradeoff discipline",
            "91-100": "Expert tradeoff optimization"
        }
    },
    "3e": {
        name: "Hypothesis Validator",
        description: "Tests and validates strategic hypotheses",
        scoringDimensions: [
            { name: "Hypothesis Clarity", weight: 20, description: "Well-formed hypotheses" },
            { name: "Test Design", weight: 20, description: "Quality of validation tests" },
            { name: "Data Collection", weight: 20, description: "Rigor of data gathering" },
            { name: "Analysis Quality", weight: 20, description: "Statistical and logical rigor" },
            { name: "Decision Making", weight: 20, description: "Acting on validation results" }
        ],
        evaluationCriteria: {
            "0-25": "No hypothesis testing",
            "26-50": "Occasional validation",
            "51-75": "Regular hypothesis testing",
            "76-90": "Strong validation culture",
            "91-100": "Scientific validation excellence"
        }
    },
    "3f": {
        name: "Decision Archivist",
        description: "Documents and learns from strategic decisions",
        scoringDimensions: [
            { name: "Documentation Completeness", weight: 20, description: "Thoroughness of records" },
            { name: "Decision Rationale", weight: 20, description: "Clear reasoning captured" },
            { name: "Outcome Tracking", weight: 20, description: "Results vs. expectations" },
            { name: "Pattern Recognition", weight: 20, description: "Learning from patterns" },
            { name: "Knowledge Sharing", weight: 20, description: "Organizational learning" }
        ],
        evaluationCriteria: {
            "0-25": "No decision documentation",
            "26-50": "Basic decision records",
            "51-75": "Good decision archiving",
            "76-90": "Strong decision learning",
            "91-100": "Learning organization excellence"
        }
    },

    // Block 4: Prototype Launch
    "4a": {
        name: "Feature Matrix Builder",
        description: "Creates and manages feature prioritization matrices",
        scoringDimensions: [
            { name: "Feature Definition", weight: 20, description: "Clarity of feature specifications" },
            { name: "Value Scoring", weight: 20, description: "Business value assessment" },
            { name: "Effort Estimation", weight: 20, description: "Development effort accuracy" },
            { name: "Dependency Mapping", weight: 20, description: "Understanding of dependencies" },
            { name: "Roadmap Alignment", weight: 20, description: "Fit with product roadmap" }
        ],
        evaluationCriteria: {
            "0-25": "No clear feature prioritization",
            "26-50": "Basic feature list exists",
            "51-75": "Good feature matrix in use",
            "76-90": "Strong feature management",
            "91-100": "Expert feature optimization"
        }
    },
    "4b": {
        name: "Technical Scope Expert",
        description: "Defines and manages technical scope boundaries",
        scoringDimensions: [
            { name: "Scope Definition", weight: 20, description: "Clarity of technical boundaries" },
            { name: "Architecture Planning", weight: 20, description: "Technical design quality" },
            { name: "Risk Assessment", weight: 20, description: "Technical risk identification" },
            { name: "Resource Planning", weight: 20, description: "Technical resource needs" },
            { name: "Scalability Design", weight: 20, description: "Future-proofing considerations" }
        ],
        evaluationCriteria: {
            "0-25": "Unclear technical scope",
            "26-50": "Basic scope definition",
            "51-75": "Well-defined technical scope",
            "76-90": "Excellent scope management",
            "91-100": "Perfect scope optimization"
        }
    },
    "4c": {
        name: "Pilot Group Selector",
        description: "Identifies and manages pilot customer groups",
        scoringDimensions: [
            { name: "Selection Criteria", weight: 20, description: "Quality of pilot selection" },
            { name: "Group Diversity", weight: 20, description: "Representative sample" },
            { name: "Engagement Level", weight: 20, description: "Pilot group commitment" },
            { name: "Feedback Quality", weight: 20, description: "Value of pilot feedback" },
            { name: "Success Metrics", weight: 20, description: "Clear pilot success criteria" }
        ],
        evaluationCriteria: {
            "0-25": "No pilot group strategy",
            "26-50": "Basic pilot group identified",
            "51-75": "Good pilot program design",
            "76-90": "Strong pilot execution",
            "91-100": "World-class pilot program"
        }
    },
    "4d": {
        name: "QA Criteria Setter",
        description: "Establishes quality assurance standards and processes",
        scoringDimensions: [
            { name: "Quality Standards", weight: 20, description: "Clear QA criteria defined" },
            { name: "Test Coverage", weight: 20, description: "Comprehensiveness of testing" },
            { name: "Automation Level", weight: 20, description: "Test automation implementation" },
            { name: "Bug Management", weight: 20, description: "Issue tracking and resolution" },
            { name: "Release Criteria", weight: 20, description: "Go/no-go decision framework" }
        ],
        evaluationCriteria: {
            "0-25": "No QA process",
            "26-50": "Basic testing in place",
            "51-75": "Good QA practices",
            "76-90": "Strong quality culture",
            "91-100": "World-class quality assurance"
        }
    },
    "4e": {
        name: "Timeline Planner",
        description: "Creates and manages project timelines",
        scoringDimensions: [
            { name: "Timeline Realism", weight: 20, description: "Achievability of timelines" },
            { name: "Milestone Definition", weight: 20, description: "Clear milestone criteria" },
            { name: "Buffer Management", weight: 20, description: "Risk buffer allocation" },
            { name: "Progress Tracking", weight: 20, description: "Timeline monitoring" },
            { name: "Adjustment Agility", weight: 20, description: "Timeline flexibility" }
        ],
        evaluationCriteria: {
            "0-25": "Unrealistic or no timeline",
            "26-50": "Basic timeline exists",
            "51-75": "Good timeline management",
            "76-90": "Excellent project planning",
            "91-100": "Perfect timeline execution"
        }
    },
    "4f": {
        name: "Post-Mortem Analyst",
        description: "Conducts thorough post-launch analysis",
        scoringDimensions: [
            { name: "Data Collection", weight: 20, description: "Comprehensiveness of data" },
            { name: "Root Cause Analysis", weight: 20, description: "Depth of problem analysis" },
            { name: "Success Measurement", weight: 20, description: "Achievement vs. goals" },
            { name: "Lesson Documentation", weight: 20, description: "Quality of learnings" },
            { name: "Action Planning", weight: 20, description: "Clear improvement actions" }
        ],
        evaluationCriteria: {
            "0-25": "No post-mortem process",
            "26-50": "Basic review conducted",
            "51-75": "Good analysis practice",
            "76-90": "Strong learning culture",
            "91-100": "Continuous improvement excellence"
        }
    },

    // Block 5: Early Adopter Wins
    "5a": {
        name: "Early Win Validator",
        description: "Validates and documents early customer wins",
        scoringDimensions: [
            { name: "Win Definition", weight: 20, description: "Clear success criteria" },
            { name: "Value Quantification", weight: 20, description: "Measurable customer value" },
            { name: "Repeatability", weight: 20, description: "Ability to replicate wins" },
            { name: "Customer Satisfaction", weight: 20, description: "Customer happiness metrics" },
            { name: "Reference Potential", weight: 20, description: "Willingness to advocate" }
        ],
        evaluationCriteria: {
            "0-25": "No clear wins documented",
            "26-50": "Some wins but poorly defined",
            "51-75": "Good win documentation",
            "76-90": "Strong win validation",
            "91-100": "Exceptional win portfolio"
        }
    },
    "5b": {
        name: "ROI Calculator",
        description: "Calculates and validates customer ROI",
        scoringDimensions: [
            { name: "Calculation Methodology", weight: 20, description: "ROI calculation rigor" },
            { name: "Data Accuracy", weight: 20, description: "Quality of input data" },
            { name: "Time to Value", weight: 20, description: "Speed of value realization" },
            { name: "Cost Completeness", weight: 20, description: "Total cost consideration" },
            { name: "Benefit Validation", weight: 20, description: "Verified benefit achievement" }
        ],
        evaluationCriteria: {
            "0-25": "No ROI calculation",
            "26-50": "Basic ROI estimates",
            "51-75": "Good ROI analysis",
            "76-90": "Strong ROI validation",
            "91-100": "Bulletproof ROI proof"
        }
    },
    "5c": {
        name: "Use Case Analyst",
        description: "Analyzes successful use case implementations",
        scoringDimensions: [
            { name: "Use Case Documentation", weight: 20, description: "Quality of documentation" },
            { name: "Success Metrics", weight: 20, description: "Clear success indicators" },
            { name: "Implementation Process", weight: 20, description: "Reproducible process" },
            { name: "Lessons Learned", weight: 20, description: "Insights from implementation" },
            { name: "Scalability Assessment", weight: 20, description: "Ability to scale use case" }
        ],
        evaluationCriteria: {
            "0-25": "Poor use case analysis",
            "26-50": "Basic use case review",
            "51-75": "Good use case studies",
            "76-90": "Strong use case portfolio",
            "91-100": "Best-in-class use cases"
        }
    },
    "5d": {
        name: "Testimonial Curator",
        description: "Collects and optimizes customer testimonials",
        scoringDimensions: [
            { name: "Testimonial Quality", weight: 20, description: "Impact and authenticity" },
            { name: "Customer Diversity", weight: 20, description: "Range of customer types" },
            { name: "Specificity", weight: 20, description: "Concrete results mentioned" },
            { name: "Media Variety", weight: 20, description: "Written, video, case studies" },
            { name: "Usage Rights", weight: 20, description: "Permission for marketing use" }
        ],
        evaluationCriteria: {
            "0-25": "No testimonials collected",
            "26-50": "Few generic testimonials",
            "51-75": "Good testimonial collection",
            "76-90": "Strong testimonial portfolio",
            "91-100": "Powerful advocacy library"
        }
    },
    "5e": {
        name: "Win Criteria Mapper",
        description: "Maps and tracks win criteria across customers",
        scoringDimensions: [
            { name: "Criteria Definition", weight: 20, description: "Clear win criteria" },
            { name: "Pattern Recognition", weight: 20, description: "Common success patterns" },
            { name: "Predictive Ability", weight: 20, description: "Ability to predict wins" },
            { name: "Criteria Evolution", weight: 20, description: "Refinement over time" },
            { name: "Team Alignment", weight: 20, description: "Shared understanding of wins" }
        ],
        evaluationCriteria: {
            "0-25": "No win criteria defined",
            "26-50": "Basic win understanding",
            "51-75": "Good win criteria mapping",
            "76-90": "Strong win prediction",
            "91-100": "Win science mastery"
        }
    },
    "5f": {
        name: "Deal Debrief Expert",
        description: "Conducts thorough deal debriefs and analysis",
        scoringDimensions: [
            { name: "Debrief Process", weight: 20, description: "Systematic debrief approach" },
            { name: "Stakeholder Input", weight: 20, description: "Comprehensive perspectives" },
            { name: "Success Factors", weight: 20, description: "Key win factors identified" },
            { name: "Improvement Areas", weight: 20, description: "Clear action items" },
            { name: "Knowledge Transfer", weight: 20, description: "Learning dissemination" }
        ],
        evaluationCriteria: {
            "0-25": "No deal debriefs",
            "26-50": "Occasional debriefs",
            "51-75": "Regular debrief practice",
            "76-90": "Strong debrief culture",
            "91-100": "World-class deal learning"
        }
    },

    // Block 6: Customer Engagement Flywheel
    "6a": {
        name: "Usage Heatmap Analyst",
        description: "Analyzes product usage patterns and engagement",
        scoringDimensions: [
            { name: "Data Collection", weight: 20, description: "Comprehensiveness of usage data" },
            { name: "Pattern Analysis", weight: 20, description: "Insight quality from patterns" },
            { name: "Feature Adoption", weight: 20, description: "Understanding feature usage" },
            { name: "User Segmentation", weight: 20, description: "Usage by user type" },
            { name: "Action Planning", weight: 20, description: "Improvements from insights" }
        ],
        evaluationCriteria: {
            "0-25": "No usage tracking",
            "26-50": "Basic usage metrics",
            "51-75": "Good usage analysis",
            "76-90": "Strong usage insights",
            "91-100": "Usage optimization mastery"
        }
    },
    "6b": {
        name: "Milestone Tracker",
        description: "Tracks customer success milestones",
        scoringDimensions: [
            { name: "Milestone Definition", weight: 20, description: "Clear success milestones" },
            { name: "Tracking Systems", weight: 20, description: "Milestone monitoring tools" },
            { name: "Progress Visibility", weight: 20, description: "Customer progress clarity" },
            { name: "Intervention Triggers", weight: 20, description: "Proactive support triggers" },
            { name: "Celebration Practices", weight: 20, description: "Success recognition" }
        ],
        evaluationCriteria: {
            "0-25": "No milestone tracking",
            "26-50": "Basic milestone awareness",
            "51-75": "Good milestone management",
            "76-90": "Strong milestone program",
            "91-100": "Perfect milestone orchestration"
        }
    },
    "6c": {
        name: "CS Dashboard Builder",
        description: "Creates customer success dashboards and metrics",
        scoringDimensions: [
            { name: "Metric Selection", weight: 20, description: "Relevance of CS metrics" },
            { name: "Data Accuracy", weight: 20, description: "Quality of data sources" },
            { name: "Visualization Quality", weight: 20, description: "Dashboard clarity and UX" },
            { name: "Actionability", weight: 20, description: "Insights drive actions" },
            { name: "Stakeholder Adoption", weight: 20, description: "Dashboard usage levels" }
        ],
        evaluationCriteria: {
            "0-25": "No CS dashboards",
            "26-50": "Basic metrics tracked",
            "51-75": "Good dashboard system",
            "76-90": "Excellent CS visibility",
            "91-100": "World-class CS analytics"
        }
    },
    "6d": {
        name: "Activation Expert",
        description: "Optimizes customer activation and onboarding",
        scoringDimensions: [
            { name: "Activation Definition", weight: 20, description: "Clear activation criteria" },
            { name: "Time to Activation", weight: 20, description: "Speed of activation" },
            { name: "Activation Rate", weight: 20, description: "Percentage achieving activation" },
            { name: "Onboarding Quality", weight: 20, description: "Onboarding experience" },
            { name: "Early Value Delivery", weight: 20, description: "Quick wins achieved" }
        ],
        evaluationCriteria: {
            "0-25": "Poor activation rates",
            "26-50": "Basic activation process",
            "51-75": "Good activation program",
            "76-90": "Strong activation success",
            "91-100": "Activation excellence"
        }
    },
    "6e": {
        name: "Feedback Collector",
        description: "Systematically collects and processes feedback",
        scoringDimensions: [
            { name: "Collection Methods", weight: 20, description: "Variety of feedback channels" },
            { name: "Response Rates", weight: 20, description: "Feedback participation levels" },
            { name: "Processing Speed", weight: 20, description: "Time to process feedback" },
            { name: "Categorization", weight: 20, description: "Feedback organization" },
            { name: "Action Conversion", weight: 20, description: "Feedback to action rate" }
        ],
        evaluationCriteria: {
            "0-25": "Minimal feedback collection",
            "26-50": "Basic feedback process",
            "51-75": "Good feedback system",
            "76-90": "Strong feedback culture",
            "91-100": "Feedback-driven excellence"
        }
    },
    "6f": {
        name: "Power User Analyst",
        description: "Identifies and nurtures power users",
        scoringDimensions: [
            { name: "Identification Criteria", weight: 20, description: "Power user definition" },
            { name: "Engagement Programs", weight: 20, description: "Power user nurturing" },
            { name: "Advocacy Development", weight: 20, description: "Converting to advocates" },
            { name: "Feedback Quality", weight: 20, description: "Power user insights" },
            { name: "Community Building", weight: 20, description: "Power user community" }
        ],
        evaluationCriteria: {
            "0-25": "No power user focus",
            "26-50": "Basic power user awareness",
            "51-75": "Good power user program",
            "76-90": "Strong power user engagement",
            "91-100": "Power user excellence"
        }
    },

    // Block 7: Quantifiable Impact
    "7a": {
        name: "Time/Cost Analyst",
        description: "Quantifies time and cost savings delivered",
        scoringDimensions: [
            { name: "Measurement Methodology", weight: 20, description: "Rigor of measurement" },
            { name: "Baseline Establishment", weight: 20, description: "Clear before state" },
            { name: "Data Collection", weight: 20, description: "Quality of savings data" },
            { name: "Validation Process", weight: 20, description: "Third-party validation" },
            { name: "Communication Clarity", weight: 20, description: "Clear value messaging" }
        ],
        evaluationCriteria: {
            "0-25": "No quantified savings",
            "26-50": "Estimated savings only",
            "51-75": "Good savings documentation",
            "76-90": "Strong value proof",
            "91-100": "Irrefutable value delivery"
        }
    },
    "7b": {
        name: "Revenue Impact Tracker",
        description: "Tracks revenue impact and growth metrics",
        scoringDimensions: [
            { name: "Revenue Attribution", weight: 20, description: "Clear revenue connection" },
            { name: "Growth Metrics", weight: 20, description: "Revenue growth tracking" },
            { name: "Expansion Tracking", weight: 20, description: "Upsell/cross-sell impact" },
            { name: "Retention Impact", weight: 20, description: "Revenue retention effect" },
            { name: "Forecast Accuracy", weight: 20, description: "Revenue prediction quality" }
        ],
        evaluationCriteria: {
            "0-25": "No revenue tracking",
            "26-50": "Basic revenue metrics",
            "51-75": "Good revenue analysis",
            "76-90": "Strong revenue impact",
            "91-100": "Revenue maximization mastery"
        }
    },
    "7c": {
        name: "Productivity Measurer",
        description: "Measures productivity improvements",
        scoringDimensions: [
            { name: "Productivity Metrics", weight: 20, description: "Clear productivity KPIs" },
            { name: "Baseline Comparison", weight: 20, description: "Before/after analysis" },
            { name: "User Efficiency", weight: 20, description: "Individual productivity gains" },
            { name: "Team Performance", weight: 20, description: "Team productivity impact" },
            { name: "Scale Effects", weight: 20, description: "Productivity at scale" }
        ],
        evaluationCriteria: {
            "0-25": "No productivity measurement",
            "26-50": "Basic efficiency tracking",
            "51-75": "Good productivity metrics",
            "76-90": "Strong productivity gains",
            "91-100": "Productivity transformation"
        }
    },
    "7d": {
        name: "Retention Analyst",
        description: "Analyzes customer retention and churn",
        scoringDimensions: [
            { name: "Retention Metrics", weight: 20, description: "Comprehensive retention KPIs" },
            { name: "Churn Analysis", weight: 20, description: "Understanding churn reasons" },
            { name: "Cohort Analysis", weight: 20, description: "Retention by cohort" },
            { name: "Predictive Modeling", weight: 20, description: "Churn prediction accuracy" },
            { name: "Intervention Success", weight: 20, description: "Save rate effectiveness" }
        ],
        evaluationCriteria: {
            "0-25": "Poor retention tracking",
            "26-50": "Basic retention metrics",
            "51-75": "Good retention analysis",
            "76-90": "Strong retention program",
            "91-100": "Best-in-class retention"
        }
    },
    "7e": {
        name: "System Reduction Expert",
        description: "Tracks system consolidation and simplification",
        scoringDimensions: [
            { name: "System Inventory", weight: 20, description: "Systems replaced/consolidated" },
            { name: "Complexity Reduction", weight: 20, description: "Simplification achieved" },
            { name: "Cost Savings", weight: 20, description: "System cost reduction" },
            { name: "Integration Benefits", weight: 20, description: "Integration value" },
            { name: "User Experience", weight: 20, description: "UX improvement" }
        ],
        evaluationCriteria: {
            "0-25": "No system reduction",
            "26-50": "Minor consolidation",
            "51-75": "Good system reduction",
            "76-90": "Major simplification",
            "91-100": "Radical simplification"
        }
    },
    "7f": {
        name: "Friction Analyzer",
        description: "Identifies and eliminates customer friction",
        scoringDimensions: [
            { name: "Friction Identification", weight: 20, description: "Finding friction points" },
            { name: "Impact Assessment", weight: 20, description: "Friction cost analysis" },
            { name: "Elimination Planning", weight: 20, description: "Friction removal strategy" },
            { name: "Implementation Success", weight: 20, description: "Friction reduction achieved" },
            { name: "Continuous Monitoring", weight: 20, description: "Ongoing friction detection" }
        ],
        evaluationCriteria: {
            "0-25": "High friction ignored",
            "26-50": "Some friction addressed",
            "51-75": "Good friction reduction",
            "76-90": "Low friction experience",
            "91-100": "Frictionless excellence"
        }
    },

    // Block 8: Customer Success Expansion
    "8a": {
        name: "Upsell Funnel Designer",
        description: "Designs and optimizes upsell funnels",
        scoringDimensions: [
            { name: "Funnel Design", weight: 20, description: "Upsell funnel structure" },
            { name: "Trigger Identification", weight: 20, description: "Upsell opportunity signals" },
            { name: "Conversion Rates", weight: 20, description: "Upsell success rates" },
            { name: "Value Positioning", weight: 20, description: "Upsell value communication" },
            { name: "Process Automation", weight: 20, description: "Automated upsell processes" }
        ],
        evaluationCriteria: {
            "0-25": "No upsell process",
            "26-50": "Ad-hoc upselling",
            "51-75": "Good upsell program",
            "76-90": "Strong upsell engine",
            "91-100": "Upsell mastery"
        }
    },
    "8b": {
        name: "Team Expansion Tracker",
        description: "Tracks account team expansion",
        scoringDimensions: [
            { name: "Expansion Metrics", weight: 20, description: "Team growth tracking" },
            { name: "Department Penetration", weight: 20, description: "Cross-department adoption" },
            { name: "User Growth Rate", weight: 20, description: "User addition velocity" },
            { name: "License Utilization", weight: 20, description: "License usage rates" },
            { name: "Expansion Patterns", weight: 20, description: "Growth pattern analysis" }
        ],
        evaluationCriteria: {
            "0-25": "No expansion tracking",
            "26-50": "Basic growth metrics",
            "51-75": "Good expansion monitoring",
            "76-90": "Strong expansion program",
            "91-100": "Expansion excellence"
        }
    },
    "8c": {
        name: "Organic Growth Analyst",
        description: "Analyzes organic growth drivers",
        scoringDimensions: [
            { name: "Viral Coefficients", weight: 20, description: "Viral growth metrics" },
            { name: "Referral Programs", weight: 20, description: "Referral effectiveness" },
            { name: "Word of Mouth", weight: 20, description: "WOM measurement" },
            { name: "Network Effects", weight: 20, description: "Network value creation" },
            { name: "Growth Attribution", weight: 20, description: "Growth source analysis" }
        ],
        evaluationCriteria: {
            "0-25": "No organic growth",
            "26-50": "Some organic growth",
            "51-75": "Good organic growth",
            "76-90": "Strong organic engine",
            "91-100": "Viral growth mastery"
        }
    },
    "8d": {
        name: "Champion Mapper",
        description: "Identifies and nurtures customer champions",
        scoringDimensions: [
            { name: "Champion Identification", weight: 20, description: "Finding champions" },
            { name: "Relationship Depth", weight: 20, description: "Champion engagement level" },
            { name: "Advocacy Actions", weight: 20, description: "Champion activities" },
            { name: "Internal Influence", weight: 20, description: "Champion's internal impact" },
            { name: "Risk Mitigation", weight: 20, description: "Champion retention" }
        ],
        evaluationCriteria: {
            "0-25": "No champion strategy",
            "26-50": "Few champions identified",
            "51-75": "Good champion program",
            "76-90": "Strong champion network",
            "91-100": "Champion excellence"
        }
    },
    "8e": {
        name: "Sentiment Tracker",
        description: "Tracks and analyzes customer sentiment",
        scoringDimensions: [
            { name: "Sentiment Measurement", weight: 20, description: "Sentiment tracking methods" },
            { name: "Trend Analysis", weight: 20, description: "Sentiment trend monitoring" },
            { name: "Driver Identification", weight: 20, description: "Sentiment driver analysis" },
            { name: "Alert Systems", weight: 20, description: "Sentiment alert triggers" },
            { name: "Response Actions", weight: 20, description: "Sentiment-based actions" }
        ],
        evaluationCriteria: {
            "0-25": "No sentiment tracking",
            "26-50": "Basic sentiment awareness",
            "51-75": "Good sentiment monitoring",
            "76-90": "Strong sentiment program",
            "91-100": "Sentiment mastery"
        }
    },
    "8f": {
        name: "Renewal Readiness Expert",
        description: "Ensures renewal readiness and success",
        scoringDimensions: [
            { name: "Renewal Process", weight: 20, description: "Renewal process maturity" },
            { name: "Early Engagement", weight: 20, description: "Renewal conversation timing" },
            { name: "Value Documentation", weight: 20, description: "Value proof for renewal" },
            { name: "Risk Identification", weight: 20, description: "Renewal risk detection" },
            { name: "Renewal Rates", weight: 20, description: "Renewal success metrics" }
        ],
        evaluationCriteria: {
            "0-25": "Poor renewal rates",
            "26-50": "Basic renewal process",
            "51-75": "Good renewal program",
            "76-90": "Strong renewal success",
            "91-100": "Renewal excellence"
        }
    },

    // Block 9: Proof Execution
    "9a": {
        name: "Inbound Conversion Analyst",
        description: "Optimizes inbound lead conversion",
        scoringDimensions: [
            { name: "Lead Quality", weight: 20, description: "Inbound lead quality scores" },
            { name: "Response Time", weight: 20, description: "Speed of lead response" },
            { name: "Conversion Rates", weight: 20, description: "Lead to opportunity conversion" },
            { name: "Nurture Programs", weight: 20, description: "Lead nurturing effectiveness" },
            { name: "Attribution Analysis", weight: 20, description: "Source attribution accuracy" }
        ],
        evaluationCriteria: {
            "0-25": "Poor inbound conversion",
            "26-50": "Basic lead handling",
            "51-75": "Good conversion process",
            "76-90": "Strong inbound engine",
            "91-100": "Inbound excellence"
        }
    },
    "9b": {
        name: "Outbound Performance Tracker",
        description: "Tracks outbound sales performance",
        scoringDimensions: [
            { name: "Activity Metrics", weight: 20, description: "Outbound activity levels" },
            { name: "Response Rates", weight: 20, description: "Outbound response rates" },
            { name: "Meeting Conversion", weight: 20, description: "Activity to meeting rate" },
            { name: "Personalization", weight: 20, description: "Outreach personalization" },
            { name: "Sequence Optimization", weight: 20, description: "Outbound sequence performance" }
        ],
        evaluationCriteria: {
            "0-25": "Ineffective outbound",
            "26-50": "Basic outbound efforts",
            "51-75": "Good outbound program",
            "76-90": "Strong outbound results",
            "91-100": "Outbound mastery"
        }
    },
    "9c": {
        name: "Channel Economics Expert",
        description: "Analyzes channel economics and efficiency",
        scoringDimensions: [
            { name: "CAC by Channel", weight: 20, description: "Customer acquisition costs" },
            { name: "Channel ROI", weight: 20, description: "Return on channel investment" },
            { name: "Channel Mix", weight: 20, description: "Optimal channel balance" },
            { name: "Efficiency Metrics", weight: 20, description: "Channel efficiency KPIs" },
            { name: "Scale Potential", weight: 20, description: "Channel scalability" }
        ],
        evaluationCriteria: {
            "0-25": "Poor channel economics",
            "26-50": "Basic channel tracking",
            "51-75": "Good channel analysis",
            "76-90": "Strong channel optimization",
            "91-100": "Channel excellence"
        }
    },
    "9d": {
        name: "Discovery Call Evaluator",
        description: "Evaluates discovery call effectiveness",
        scoringDimensions: [
            { name: "Call Structure", weight: 20, description: "Discovery call framework" },
            { name: "Question Quality", weight: 20, description: "Discovery question effectiveness" },
            { name: "Pain Uncovering", weight: 20, description: "Pain point identification" },
            { name: "Next Step Rate", weight: 20, description: "Progression to next stage" },
            { name: "Rep Consistency", weight: 20, description: "Consistent discovery quality" }
        ],
        evaluationCriteria: {
            "0-25": "Poor discovery process",
            "26-50": "Basic discovery calls",
            "51-75": "Good discovery practice",
            "76-90": "Strong discovery excellence",
            "91-100": "Discovery mastery"
        }
    },
    "9e": {
        name: "Demo-to-Close Optimizer",
        description: "Optimizes demo to close conversion",
        scoringDimensions: [
            { name: "Demo Quality", weight: 20, description: "Demo effectiveness" },
            { name: "Customization Level", weight: 20, description: "Demo personalization" },
            { name: "Follow-up Process", weight: 20, description: "Post-demo engagement" },
            { name: "Objection Handling", weight: 20, description: "Objection resolution" },
            { name: "Close Rates", weight: 20, description: "Demo to close conversion" }
        ],
        evaluationCriteria: {
            "0-25": "Poor demo conversion",
            "26-50": "Basic demo process",
            "51-75": "Good demo performance",
            "76-90": "Strong demo results",
            "91-100": "Demo excellence"
        }
    },
    "9f": {
        name: "Founder Sales Analyst",
        description: "Analyzes founder-led sales effectiveness",
        scoringDimensions: [
            { name: "Founder Involvement", weight: 20, description: "Optimal founder engagement" },
            { name: "Deal Impact", weight: 20, description: "Founder influence on deals" },
            { name: "Knowledge Transfer", weight: 20, description: "Founder sales insights" },
            { name: "Scalability Planning", weight: 20, description: "Transition from founder sales" },
            { name: "Time Allocation", weight: 20, description: "Founder time efficiency" }
        ],
        evaluationCriteria: {
            "0-25": "Ineffective founder sales",
            "26-50": "Basic founder involvement",
            "51-75": "Good founder sales",
            "76-90": "Strong founder impact",
            "91-100": "Founder sales mastery"
        }
    },

    // Block 10: Sales Team Empowerment
    "10a": {
        name: "Enablement Asset Manager",
        description: "Manages sales enablement assets and content",
        scoringDimensions: [
            { name: "Asset Completeness", weight: 20, description: "Coverage of sales needs" },
            { name: "Asset Quality", weight: 20, description: "Effectiveness of materials" },
            { name: "Asset Accessibility", weight: 20, description: "Ease of finding/using" },
            { name: "Usage Tracking", weight: 20, description: "Asset utilization metrics" },
            { name: "Update Frequency", weight: 20, description: "Content freshness" }
        ],
        evaluationCriteria: {
            "0-25": "No enablement assets",
            "26-50": "Basic sales materials",
            "51-75": "Good asset library",
            "76-90": "Strong enablement program",
            "91-100": "World-class enablement"
        }
    },
    "10b": {
        name: "Rep Ramp Planner",
        description: "Optimizes sales rep onboarding and ramp",
        scoringDimensions: [
            { name: "Onboarding Program", weight: 20, description: "Structured onboarding" },
            { name: "Ramp Time", weight: 20, description: "Time to productivity" },
            { name: "Certification Process", weight: 20, description: "Rep certification program" },
            { name: "Mentorship System", weight: 20, description: "Coaching and mentoring" },
            { name: "Early Performance", weight: 20, description: "Initial rep success" }
        ],
        evaluationCriteria: {
            "0-25": "No ramp program",
            "26-50": "Basic onboarding exists",
            "51-75": "Good ramp process",
            "76-90": "Strong ramp program",
            "91-100": "Ramp excellence"
        }
    },
    "10c": {
        name: "Win/Loss Analyst",
        description: "Conducts win/loss analysis",
        scoringDimensions: [
            { name: "Analysis Process", weight: 20, description: "Win/loss review process" },
            { name: "Data Collection", weight: 20, description: "Comprehensive data gathering" },
            { name: "Pattern Recognition", weight: 20, description: "Win/loss patterns" },
            { name: "Competitive Insights", weight: 20, description: "Competitive intelligence" },
            { name: "Action Implementation", weight: 20, description: "Acting on insights" }
        ],
        evaluationCriteria: {
            "0-25": "No win/loss analysis",
            "26-50": "Occasional reviews",
            "51-75": "Regular analysis",
            "76-90": "Strong win/loss program",
            "91-100": "Win/loss mastery"
        }
    },
    "10d": {
        name: "Objection Handler",
        description: "Masters objection handling strategies",
        scoringDimensions: [
            { name: "Objection Catalog", weight: 20, description: "Common objections documented" },
            { name: "Response Quality", weight: 20, description: "Effectiveness of responses" },
            { name: "Training Programs", weight: 20, description: "Objection handling training" },
            { name: "Success Rates", weight: 20, description: "Objection overcome rates" },
            { name: "Continuous Learning", weight: 20, description: "Response refinement" }
        ],
        evaluationCriteria: {
            "0-25": "Poor objection handling",
            "26-50": "Basic responses exist",
            "51-75": "Good objection process",
            "76-90": "Strong objection mastery",
            "91-100": "Objection excellence"
        }
    },
    "10e": {
        name: "ICP Filter Expert",
        description: "Defines and enforces ideal customer profile",
        scoringDimensions: [
            { name: "ICP Definition", weight: 20, description: "Clarity of ideal customer" },
            { name: "Qualification Rigor", weight: 20, description: "ICP adherence in pipeline" },
            { name: "Scoring Models", weight: 20, description: "Lead/account scoring" },
            { name: "Disqualification Rate", weight: 20, description: "Saying no to bad fits" },
            { name: "Win Rate Impact", weight: 20, description: "ICP correlation to wins" }
        ],
        evaluationCriteria: {
            "0-25": "No ICP definition",
            "26-50": "Basic ICP exists",
            "51-75": "Good ICP discipline",
            "76-90": "Strong ICP focus",
            "91-100": "ICP excellence"
        }
    },
    "10f": {
        name: "Sales Call Librarian",
        description: "Manages sales call recordings and insights",
        scoringDimensions: [
            { name: "Recording Coverage", weight: 20, description: "Percentage of calls recorded" },
            { name: "Categorization", weight: 20, description: "Call organization system" },
            { name: "Best Practice Extraction", weight: 20, description: "Learning from top calls" },
            { name: "Coaching Integration", weight: 20, description: "Use in coaching" },
            { name: "Knowledge Sharing", weight: 20, description: "Team learning from calls" }
        ],
        evaluationCriteria: {
            "0-25": "No call recording",
            "26-50": "Some calls recorded",
            "51-75": "Good call library",
            "76-90": "Strong call program",
            "91-100": "Call library excellence"
        }
    },

    // Block 11: High Performance Teams
    "11a": {
        name: "Scorecard Designer",
        description: "Designs performance scorecards and metrics",
        scoringDimensions: [
            { name: "Metric Selection", weight: 20, description: "Relevant KPI selection" },
            { name: "Balance", weight: 20, description: "Activity vs. outcome balance" },
            { name: "Visibility", weight: 20, description: "Scorecard transparency" },
            { name: "Actionability", weight: 20, description: "Metrics drive behavior" },
            { name: "Fairness", weight: 20, description: "Perceived scorecard fairness" }
        ],
        evaluationCriteria: {
            "0-25": "No performance scorecards",
            "26-50": "Basic metrics tracked",
            "51-75": "Good scorecard system",
            "76-90": "Strong performance management",
            "91-100": "Scorecard excellence"
        }
    },
    "11b": {
        name: "Quota Structure Expert",
        description: "Designs and manages quota systems",
        scoringDimensions: [
            { name: "Quota Methodology", weight: 20, description: "Quota setting process" },
            { name: "Attainment Rates", weight: 20, description: "Team quota achievement" },
            { name: "Fairness Perception", weight: 20, description: "Quota fairness" },
            { name: "Motivation Impact", weight: 20, description: "Quota motivational effect" },
            { name: "Adjustment Process", weight: 20, description: "Quota revision process" }
        ],
        evaluationCriteria: {
            "0-25": "Dysfunctional quotas",
            "26-50": "Basic quota system",
            "51-75": "Good quota structure",
            "76-90": "Strong quota program",
            "91-100": "Quota excellence"
        }
    },
    "11c": {
        name: "Deal Review Manager",
        description: "Manages deal review processes",
        scoringDimensions: [
            { name: "Review Cadence", weight: 20, description: "Regular deal reviews" },
            { name: "Review Quality", weight: 20, description: "Depth of deal analysis" },
            { name: "Action Items", weight: 20, description: "Clear next steps" },
            { name: "Cross-functional Input", weight: 20, description: "Stakeholder involvement" },
            { name: "Deal Velocity Impact", weight: 20, description: "Review impact on velocity" }
        ],
        evaluationCriteria: {
            "0-25": "No deal reviews",
            "26-50": "Ad-hoc reviews",
            "51-75": "Regular deal reviews",
            "76-90": "Strong review process",
            "91-100": "Deal review excellence"
        }
    },
    "11d": {
        name: "Forecast Framework Builder",
        description: "Builds accurate forecasting systems",
        scoringDimensions: [
            { name: "Forecast Accuracy", weight: 20, description: "Prediction accuracy" },
            { name: "Methodology Rigor", weight: 20, description: "Forecasting process" },
            { name: "Pipeline Coverage", weight: 20, description: "Pipeline to quota ratio" },
            { name: "Risk Assessment", weight: 20, description: "Deal risk evaluation" },
            { name: "Adjustment Agility", weight: 20, description: "Forecast flexibility" }
        ],
        evaluationCriteria: {
            "0-25": "Inaccurate forecasts",
            "26-50": "Basic forecasting",
            "51-75": "Good forecast process",
            "76-90": "Strong forecast accuracy",
            "91-100": "Forecast excellence"
        }
    },
    "11e": {
        name: "Coaching Loop Designer",
        description: "Designs sales coaching programs",
        scoringDimensions: [
            { name: "Coaching Frequency", weight: 20, description: "Regular coaching cadence" },
            { name: "Coaching Quality", weight: 20, description: "Effectiveness of coaching" },
            { name: "Skill Development", weight: 20, description: "Rep skill improvement" },
            { name: "Coaching Tools", weight: 20, description: "Coaching infrastructure" },
            { name: "Performance Impact", weight: 20, description: "Coaching ROI" }
        ],
        evaluationCriteria: {
            "0-25": "No coaching program",
            "26-50": "Occasional coaching",
            "51-75": "Regular coaching",
            "76-90": "Strong coaching culture",
            "91-100": "Coaching excellence"
        }
    },
    "11f": {
        name: "Talent Gap Analyst",
        description: "Identifies and addresses talent gaps",
        scoringDimensions: [
            { name: "Skills Assessment", weight: 20, description: "Team skills evaluation" },
            { name: "Gap Identification", weight: 20, description: "Clear gap analysis" },
            { name: "Development Plans", weight: 20, description: "Training programs" },
            { name: "Hiring Strategy", weight: 20, description: "Talent acquisition plan" },
            { name: "Succession Planning", weight: 20, description: "Leadership pipeline" }
        ],
        evaluationCriteria: {
            "0-25": "Major talent gaps",
            "26-50": "Some gaps addressed",
            "51-75": "Good talent management",
            "76-90": "Strong talent program",
            "91-100": "Talent excellence"
        }
    },

    // Block 12: Retention Systems
    "12a": {
        name: "Onboarding Optimizer",
        description: "Optimizes customer onboarding experience",
        scoringDimensions: [
            { name: "Onboarding Process", weight: 20, description: "Structured onboarding" },
            { name: "Time to Value", weight: 20, description: "Speed to first value" },
            { name: "Completion Rates", weight: 20, description: "Onboarding completion" },
            { name: "Customer Satisfaction", weight: 20, description: "Onboarding CSAT" },
            { name: "Resource Efficiency", weight: 20, description: "Onboarding scalability" }
        ],
        evaluationCriteria: {
            "0-25": "Poor onboarding",
            "26-50": "Basic onboarding",
            "51-75": "Good onboarding",
            "76-90": "Strong onboarding",
            "91-100": "Onboarding excellence"
        }
    },
    "12b": {
        name: "Activation Tracker",
        description: "Tracks customer activation metrics",
        scoringDimensions: [
            { name: "Activation Definition", weight: 20, description: "Clear activation criteria" },
            { name: "Tracking Systems", weight: 20, description: "Activation monitoring" },
            { name: "Activation Rate", weight: 20, description: "Percentage activated" },
            { name: "Time to Activation", weight: 20, description: "Activation velocity" },
            { name: "Correlation Analysis", weight: 20, description: "Activation to retention" }
        ],
        evaluationCriteria: {
            "0-25": "No activation tracking",
            "26-50": "Basic activation metrics",
            "51-75": "Good activation program",
            "76-90": "Strong activation rates",
            "91-100": "Activation excellence"
        }
    },
    "12c": {
        name: "Success Playbook Builder",
        description: "Creates customer success playbooks",
        scoringDimensions: [
            { name: "Playbook Coverage", weight: 20, description: "Scenario coverage" },
            { name: "Playbook Quality", weight: 20, description: "Effectiveness of plays" },
            { name: "Team Adoption", weight: 20, description: "Playbook usage" },
            { name: "Outcome Tracking", weight: 20, description: "Playbook success rates" },
            { name: "Continuous Improvement", weight: 20, description: "Playbook evolution" }
        ],
        evaluationCriteria: {
            "0-25": "No playbooks",
            "26-50": "Basic playbooks",
            "51-75": "Good playbook library",
            "76-90": "Strong playbook system",
            "91-100": "Playbook excellence"
        }
    },
    "12d": {
        name: "Escalation Manager",
        description: "Manages customer escalations",
        scoringDimensions: [
            { name: "Escalation Process", weight: 20, description: "Clear escalation path" },
            { name: "Response Time", weight: 20, description: "Escalation response speed" },
            { name: "Resolution Rate", weight: 20, description: "Successful resolutions" },
            { name: "Root Cause Analysis", weight: 20, description: "Preventing future escalations" },
            { name: "Customer Recovery", weight: 20, description: "Post-escalation satisfaction" }
        ],
        evaluationCriteria: {
            "0-25": "Poor escalation handling",
            "26-50": "Basic escalation process",
            "51-75": "Good escalation management",
            "76-90": "Strong escalation program",
            "91-100": "Escalation excellence"
        }
    },
    "12e": {
        name: "Renewal Pipeline Expert",
        description: "Manages renewal pipeline and forecasting",
        scoringDimensions: [
            { name: "Pipeline Visibility", weight: 20, description: "Renewal pipeline clarity" },
            { name: "Early Warning System", weight: 20, description: "Risk identification" },
            { name: "Renewal Forecasting", weight: 20, description: "Forecast accuracy" },
            { name: "Proactive Engagement", weight: 20, description: "Early renewal discussions" },
            { name: "Renewal Rates", weight: 20, description: "Actual renewal performance" }
        ],
        evaluationCriteria: {
            "0-25": "Poor renewal visibility",
            "26-50": "Basic renewal tracking",
            "51-75": "Good renewal pipeline",
            "76-90": "Strong renewal management",
            "91-100": "Renewal excellence"
        }
    },
    "12f": {
        name: "Churn Root-Cause Analyst",
        description: "Analyzes root causes of customer churn",
        scoringDimensions: [
            { name: "Data Collection", weight: 20, description: "Churn data completeness" },
            { name: "Analysis Depth", weight: 20, description: "Root cause identification" },
            { name: "Pattern Recognition", weight: 20, description: "Churn patterns" },
            { name: "Predictive Modeling", weight: 20, description: "Churn prediction" },
            { name: "Prevention Programs", weight: 20, description: "Churn prevention success" }
        ],
        evaluationCriteria: {
            "0-25": "No churn analysis",
            "26-50": "Basic churn tracking",
            "51-75": "Good churn analysis",
            "76-90": "Strong churn prevention",
            "91-100": "Churn prevention excellence"
        }
    },

    // Block 13: Market Domination Strategies
    "13a": {
        name: "Category Narrative Designer",
        description: "Creates compelling category narratives",
        scoringDimensions: [
            { name: "Narrative Clarity", weight: 20, description: "Clear category story" },
            { name: "Market Resonance", weight: 20, description: "Market acceptance" },
            { name: "Differentiation", weight: 20, description: "Unique positioning" },
            { name: "Thought Leadership", weight: 20, description: "Industry influence" },
            { name: "Adoption Rate", weight: 20, description: "Narrative adoption" }
        ],
        evaluationCriteria: {
            "0-25": "No category narrative",
            "26-50": "Basic positioning",
            "51-75": "Good category story",
            "76-90": "Strong category leadership",
            "91-100": "Category creation mastery"
        }
    },
    "13b": {
        name: "Strategic Moat Builder",
        description: "Builds competitive moats and barriers",
        scoringDimensions: [
            { name: "Moat Identification", weight: 20, description: "Clear competitive advantages" },
            { name: "Moat Depth", weight: 20, description: "Difficulty to replicate" },
            { name: "Network Effects", weight: 20, description: "Network value creation" },
            { name: "Switching Costs", weight: 20, description: "Customer lock-in" },
            { name: "Moat Expansion", weight: 20, description: "Growing advantages" }
        ],
        evaluationCriteria: {
            "0-25": "No competitive moat",
            "26-50": "Weak advantages",
            "51-75": "Good competitive position",
            "76-90": "Strong moats",
            "91-100": "Impregnable position"
        }
    },
    "13c": {
        name: "Ecosystem Mapper",
        description: "Maps and leverages ecosystem partnerships",
        scoringDimensions: [
            { name: "Ecosystem Understanding", weight: 20, description: "Market ecosystem clarity" },
            { name: "Partnership Strategy", weight: 20, description: "Strategic partnerships" },
            { name: "Integration Depth", weight: 20, description: "Technical integrations" },
            { name: "Value Exchange", weight: 20, description: "Mutual value creation" },
            { name: "Ecosystem Growth", weight: 20, description: "Expanding ecosystem" }
        ],
        evaluationCriteria: {
            "0-25": "Isolated position",
            "26-50": "Few partnerships",
            "51-75": "Good ecosystem presence",
            "76-90": "Strong ecosystem position",
            "91-100": "Ecosystem leadership"
        }
    },
    "13d": {
        name: "Competitor Monitor",
        description: "Monitors and analyzes competitive landscape",
        scoringDimensions: [
            { name: "Intelligence Gathering", weight: 20, description: "Competitive data collection" },
            { name: "Analysis Quality", weight: 20, description: "Competitive insights" },
            { name: "Response Speed", weight: 20, description: "Reaction to competition" },
            { name: "Win Rate vs Competition", weight: 20, description: "Competitive win rates" },
            { name: "Differentiation Clarity", weight: 20, description: "Clear differentiation" }
        ],
        evaluationCriteria: {
            "0-25": "Blind to competition",
            "26-50": "Basic awareness",
            "51-75": "Good competitive intel",
            "76-90": "Strong competitive advantage",
            "91-100": "Competitive dominance"
        }
    },
    "13e": {
        name: "Brand Architect",
        description: "Builds and manages brand strategy",
        scoringDimensions: [
            { name: "Brand Identity", weight: 20, description: "Clear brand definition" },
            { name: "Brand Consistency", weight: 20, description: "Consistent execution" },
            { name: "Brand Recognition", weight: 20, description: "Market awareness" },
            { name: "Brand Equity", weight: 20, description: "Brand value" },
            { name: "Brand Advocacy", weight: 20, description: "Customer advocacy" }
        ],
        evaluationCriteria: {
            "0-25": "Weak brand presence",
            "26-50": "Basic brand exists",
            "51-75": "Good brand development",
            "76-90": "Strong brand position",
            "91-100": "Iconic brand status"
        }
    },
    "13f": {
        name: "Defensive GTM Strategist",
        description: "Develops defensive go-to-market strategies",
        scoringDimensions: [
            { name: "Threat Assessment", weight: 20, description: "Competitive threat analysis" },
            { name: "Defense Strategies", weight: 20, description: "Defensive playbooks" },
            { name: "Customer Retention", weight: 20, description: "Protecting base" },
            { name: "Counter-positioning", weight: 20, description: "Competitive responses" },
            { name: "Market Share Defense", weight: 20, description: "Share protection" }
        ],
        evaluationCriteria: {
            "0-25": "Vulnerable position",
            "26-50": "Basic defenses",
            "51-75": "Good defensive position",
            "76-90": "Strong market defense",
            "91-100": "Unassailable position"
        }
    },

    // Block 14: Operational Infrastructure
    "14a": {
        name: "System Architecture Expert",
        description: "Designs scalable system architecture",
        scoringDimensions: [
            { name: "Architecture Design", weight: 20, description: "System design quality" },
            { name: "Scalability", weight: 20, description: "Ability to scale" },
            { name: "Integration Capability", weight: 20, description: "System connectivity" },
            { name: "Performance", weight: 20, description: "System performance" },
            { name: "Maintenance", weight: 20, description: "System maintainability" }
        ],
        evaluationCriteria: {
            "0-25": "Poor architecture",
            "26-50": "Basic systems",
            "51-75": "Good architecture",
            "76-90": "Strong systems",
            "91-100": "World-class architecture"
        }
    },
    "14b": {
        name: "Revenue Engine Mapper",
        description: "Maps and optimizes revenue operations",
        scoringDimensions: [
            { name: "Process Mapping", weight: 20, description: "Revenue process clarity" },
            { name: "Efficiency Metrics", weight: 20, description: "Operational efficiency" },
            { name: "Automation Level", weight: 20, description: "Process automation" },
            { name: "Data Flow", weight: 20, description: "Data integration" },
            { name: "Optimization Rate", weight: 20, description: "Continuous improvement" }
        ],
        evaluationCriteria: {
            "0-25": "Chaotic operations",
            "26-50": "Basic processes",
            "51-75": "Good RevOps",
            "76-90": "Strong revenue engine",
            "91-100": "RevOps excellence"
        }
    },
    "14c": {
        name: "Dashboard Designer",
        description: "Creates operational dashboards",
        scoringDimensions: [
            { name: "Metric Selection", weight: 20, description: "Relevant KPIs" },
            { name: "Data Quality", weight: 20, description: "Data accuracy" },
            { name: "Visualization", weight: 20, description: "Dashboard clarity" },
            { name: "Real-time Updates", weight: 20, description: "Data freshness" },
            { name: "User Adoption", weight: 20, description: "Dashboard usage" }
        ],
        evaluationCriteria: {
            "0-25": "No dashboards",
            "26-50": "Basic reporting",
            "51-75": "Good dashboards",
            "76-90": "Strong analytics",
            "91-100": "Analytics excellence"
        }
    },
    "14d": {
        name: "Tool Consolidator",
        description: "Optimizes and consolidates tool stack",
        scoringDimensions: [
            { name: "Tool Inventory", weight: 20, description: "Complete tool mapping" },
            { name: "Redundancy Elimination", weight: 20, description: "Removing duplicates" },
            { name: "Integration Quality", weight: 20, description: "Tool connectivity" },
            { name: "Cost Optimization", weight: 20, description: "Tool spend efficiency" },
            { name: "User Experience", weight: 20, description: "Tool usability" }
        ],
        evaluationCriteria: {
            "0-25": "Tool chaos",
            "26-50": "Many redundant tools",
            "51-75": "Good tool management",
            "76-90": "Optimized tool stack",
            "91-100": "Perfect tool ecosystem"
        }
    },
    "14e": {
        name: "RevOps Playbook Builder",
        description: "Creates revenue operations playbooks",
        scoringDimensions: [
            { name: "Process Documentation", weight: 20, description: "Complete process docs" },
            { name: "Best Practices", weight: 20, description: "Proven methodologies" },
            { name: "Training Materials", weight: 20, description: "Learning resources" },
            { name: "Compliance Standards", weight: 20, description: "Process compliance" },
            { name: "Update Frequency", weight: 20, description: "Playbook maintenance" }
        ],
        evaluationCriteria: {
            "0-25": "No documentation",
            "26-50": "Basic documentation",
            "51-75": "Good playbooks",
            "76-90": "Strong RevOps guides",
            "91-100": "RevOps mastery"
        }
    },
    "14f": {
        name: "SLA Policy Manager",
        description: "Manages service level agreements",
        scoringDimensions: [
            { name: "SLA Definition", weight: 20, description: "Clear SLA terms" },
            { name: "Performance Tracking", weight: 20, description: "SLA monitoring" },
            { name: "Compliance Rate", weight: 20, description: "SLA achievement" },
            { name: "Escalation Process", weight: 20, description: "SLA breach handling" },
            { name: "Customer Satisfaction", weight: 20, description: "SLA impact on CSAT" }
        ],
        evaluationCriteria: {
            "0-25": "No SLAs",
            "26-50": "Basic SLAs",
            "51-75": "Good SLA management",
            "76-90": "Strong SLA performance",
            "91-100": "SLA excellence"
        }
    },

    // Block 15: Leadership Expansion
    "15a": {
        name: "VP Hiring Expert",
        description: "Manages executive hiring process",
        scoringDimensions: [
            { name: "Role Definition", weight: 20, description: "Clear VP requirements" },
            { name: "Candidate Pipeline", weight: 20, description: "Quality candidate flow" },
            { name: "Assessment Process", weight: 20, description: "Evaluation rigor" },
            { name: "Cultural Fit", weight: 20, description: "Culture alignment" },
            { name: "Success Rate", weight: 20, description: "Hiring success" }
        ],
        evaluationCriteria: {
            "0-25": "Poor hiring process",
            "26-50": "Basic hiring exists",
            "51-75": "Good hiring practice",
            "76-90": "Strong executive hiring",
            "91-100": "World-class talent acquisition"
        }
    },
    "15b": {
        name: "Succession Planner",
        description: "Develops succession planning programs",
        scoringDimensions: [
            { name: "Succession Mapping", weight: 20, description: "Clear succession plans" },
            { name: "Talent Development", weight: 20, description: "Leadership development" },
            { name: "Bench Strength", weight: 20, description: "Ready replacements" },
            { name: "Risk Mitigation", weight: 20, description: "Key person risk" },
            { name: "Transition Success", weight: 20, description: "Smooth transitions" }
        ],
        evaluationCriteria: {
            "0-25": "No succession planning",
            "26-50": "Basic planning exists",
            "51-75": "Good succession program",
            "76-90": "Strong leadership pipeline",
            "91-100": "Succession excellence"
        }
    },
    "15c": {
        name: "Executive Cadence Manager",
        description: "Manages executive meeting rhythms",
        scoringDimensions: [
            { name: "Meeting Structure", weight: 20, description: "Clear meeting cadence" },
            { name: "Agenda Quality", weight: 20, description: "Effective agendas" },
            { name: "Decision Making", weight: 20, description: "Decision velocity" },
            { name: "Action Follow-through", weight: 20, description: "Action completion" },
            { name: "Communication Flow", weight: 20, description: "Information cascade" }
        ],
        evaluationCriteria: {
            "0-25": "Chaotic meetings",
            "26-50": "Basic meeting structure",
            "51-75": "Good meeting rhythm",
            "76-90": "Strong executive cadence",
            "91-100": "Perfect execution rhythm"
        }
    },
    "15d": {
        name: "Culture Health Tracker",
        description: "Monitors organizational culture health",
        scoringDimensions: [
            { name: "Culture Metrics", weight: 20, description: "Culture measurement" },
            { name: "Employee Engagement", weight: 20, description: "Engagement levels" },
            { name: "Values Alignment", weight: 20, description: "Living the values" },
            { name: "Feedback Systems", weight: 20, description: "Culture feedback loops" },
            { name: "Culture Evolution", weight: 20, description: "Culture development" }
        ],
        evaluationCriteria: {
            "0-25": "Toxic culture",
            "26-50": "Culture issues exist",
            "51-75": "Good culture health",
            "76-90": "Strong culture",
            "91-100": "Exceptional culture"
        }
    },
    "15e": {
        name: "Org Chart Designer",
        description: "Designs organizational structures",
        scoringDimensions: [
            { name: "Structure Clarity", weight: 20, description: "Clear org design" },
            { name: "Span of Control", weight: 20, description: "Management ratios" },
            { name: "Communication Lines", weight: 20, description: "Information flow" },
            { name: "Scalability", weight: 20, description: "Growth accommodation" },
            { name: "Agility", weight: 20, description: "Organizational flexibility" }
        ],
        evaluationCriteria: {
            "0-25": "Dysfunctional structure",
            "26-50": "Basic org structure",
            "51-75": "Good organization",
            "76-90": "Strong org design",
            "91-100": "Optimal organization"
        }
    },
    "15f": {
        name: "DEI Integration Specialist",
        description: "Integrates diversity, equity, and inclusion",
        scoringDimensions: [
            { name: "DEI Strategy", weight: 20, description: "Clear DEI plan" },
            { name: "Representation Metrics", weight: 20, description: "Diversity measures" },
            { name: "Inclusion Practices", weight: 20, description: "Inclusive behaviors" },
            { name: "Equity Systems", weight: 20, description: "Fair processes" },
            { name: "Cultural Integration", weight: 20, description: "DEI in culture" }
        ],
        evaluationCriteria: {
            "0-25": "No DEI focus",
            "26-50": "Basic DEI efforts",
            "51-75": "Good DEI progress",
            "76-90": "Strong DEI culture",
            "91-100": "DEI excellence"
        }
    },

    // Block 16: Global & Expansion Opportunities
    "16a": {
        name: "Market Entry Analyst",
        description: "Analyzes new market entry opportunities",
        scoringDimensions: [
            { name: "Market Analysis", weight: 20, description: "Market opportunity assessment" },
            { name: "Entry Strategy", weight: 20, description: "Go-to-market approach" },
            { name: "Risk Assessment", weight: 20, description: "Market entry risks" },
            { name: "Resource Planning", weight: 20, description: "Required investments" },
            { name: "Success Metrics", weight: 20, description: "Entry success criteria" }
        ],
        evaluationCriteria: {
            "0-25": "No expansion planning",
            "26-50": "Basic market research",
            "51-75": "Good entry analysis",
            "76-90": "Strong expansion strategy",
            "91-100": "Expansion excellence"
        }
    },
    "16b": {
        name: "Localization Expert",
        description: "Manages product and content localization",
        scoringDimensions: [
            { name: "Localization Strategy", weight: 20, description: "Clear localization plan" },
            { name: "Language Coverage", weight: 20, description: "Language support" },
            { name: "Cultural Adaptation", weight: 20, description: "Cultural sensitivity" },
            { name: "Technical Implementation", weight: 20, description: "Localization infrastructure" },
            { name: "Quality Assurance", weight: 20, description: "Localization quality" }
        ],
        evaluationCriteria: {
            "0-25": "No localization",
            "26-50": "Basic translation",
            "51-75": "Good localization",
            "76-90": "Strong local adaptation",
            "91-100": "Localization excellence"
        }
    },
    "16c": {
        name: "International Pricing Strategist",
        description: "Develops international pricing strategies",
        scoringDimensions: [
            { name: "Pricing Research", weight: 20, description: "Market pricing analysis" },
            { name: "Currency Strategy", weight: 20, description: "Multi-currency approach" },
            { name: "Local Competition", weight: 20, description: "Competitive pricing" },
            { name: "Value Perception", weight: 20, description: "Local value alignment" },
            { name: "Margin Management", weight: 20, description: "Profitability maintenance" }
        ],
        evaluationCriteria: {
            "0-25": "No pricing strategy",
            "26-50": "Basic pricing exists",
            "51-75": "Good pricing approach",
            "76-90": "Strong pricing strategy",
            "91-100": "Pricing excellence"
        }
    },
    "16d": {
        name: "Compliance Tracker",
        description: "Manages international compliance requirements",
        scoringDimensions: [
            { name: "Regulatory Mapping", weight: 20, description: "Compliance requirements" },
            { name: "Documentation", weight: 20, description: "Compliance records" },
            { name: "Audit Readiness", weight: 20, description: "Audit preparation" },
            { name: "Risk Management", weight: 20, description: "Compliance risks" },
            { name: "Update Management", weight: 20, description: "Regulatory changes" }
        ],
        evaluationCriteria: {
            "0-25": "Compliance gaps",
            "26-50": "Basic compliance",
            "51-75": "Good compliance",
            "76-90": "Strong compliance",
            "91-100": "Compliance excellence"
        }
    },
    "16e": {
        name: "Geo-GTM Specialist",
        description: "Develops geography-specific GTM strategies",
        scoringDimensions: [
            { name: "Local GTM Strategy", weight: 20, description: "Regional approach" },
            { name: "Channel Strategy", weight: 20, description: "Local channels" },
            { name: "Partnership Development", weight: 20, description: "Local partnerships" },
            { name: "Marketing Adaptation", weight: 20, description: "Local marketing" },
            { name: "Sales Localization", weight: 20, description: "Local sales approach" }
        ],
        evaluationCriteria: {
            "0-25": "No local GTM",
            "26-50": "Basic local presence",
            "51-75": "Good local GTM",
            "76-90": "Strong regional strategy",
            "91-100": "Local market mastery"
        }
    },
    "16f": {
        name: "Expansion Risk Assessor",
        description: "Assesses and mitigates expansion risks",
        scoringDimensions: [
            { name: "Risk Identification", weight: 20, description: "Complete risk mapping" },
            { name: "Impact Analysis", weight: 20, description: "Risk impact assessment" },
            { name: "Mitigation Planning", weight: 20, description: "Risk mitigation strategies" },
            { name: "Contingency Plans", weight: 20, description: "Backup strategies" },
            { name: "Risk Monitoring", weight: 20, description: "Ongoing risk tracking" }
        ],
        evaluationCriteria: {
            "0-25": "High unmanaged risk",
            "26-50": "Basic risk awareness",
            "51-75": "Good risk management",
            "76-90": "Strong risk control",
            "91-100": "Risk mastery"
        }
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AgentLibrary;
}
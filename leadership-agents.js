// Block 15: Leadership Expansion Agents
// These agents replace the incorrect generic agents with leadership-specific ones

const LeadershipAgents = {
    "15a-lead": {
        name: "ExecutiveHiringAgent",
        description: "Expert in executive team building and C-suite recruitment",
        scoringDimensions: [
            { name: "Role Definition", weight: 20, description: "Clarity of executive role requirements" },
            { name: "Talent Pipeline", weight: 20, description: "Quality of executive candidate pipeline" },
            { name: "Assessment Process", weight: 20, description: "Rigor of executive evaluation" },
            { name: "Cultural Fit", weight: 20, description: "Alignment with company culture and values" },
            { name: "Onboarding Success", weight: 20, description: "Executive integration and early impact" }
        ],
        evaluationCriteria: {
            "0-25": "No executive hiring strategy",
            "26-50": "Basic executive recruitment",
            "51-75": "Good executive hiring process",
            "76-90": "Strong executive team building",
            "91-100": "World-class executive talent acquisition"
        }
    },
    "15b-lead": {
        name: "BoardGovernanceAgent",
        description: "Specialist in board governance frameworks and director relations",
        scoringDimensions: [
            { name: "Board Structure", weight: 20, description: "Optimal board composition and committees" },
            { name: "Governance Policies", weight: 20, description: "Comprehensive governance framework" },
            { name: "Board Engagement", weight: 20, description: "Director involvement and value-add" },
            { name: "Compliance Standards", weight: 20, description: "Regulatory and fiduciary compliance" },
            { name: "Strategic Oversight", weight: 20, description: "Board's strategic guidance quality" }
        ],
        evaluationCriteria: {
            "0-25": "No formal board governance",
            "26-50": "Basic board structure exists",
            "51-75": "Good governance practices",
            "76-90": "Strong board governance",
            "91-100": "Best-in-class board governance"
        }
    },
    "15c-lead": {
        name: "SuccessionPlanningAgent",
        description: "Expert in succession planning and leadership continuity",
        scoringDimensions: [
            { name: "Succession Mapping", weight: 20, description: "Comprehensive succession plans for key roles" },
            { name: "Talent Development", weight: 20, description: "Internal leadership development programs" },
            { name: "Bench Strength", weight: 20, description: "Depth of ready-now successors" },
            { name: "Risk Mitigation", weight: 20, description: "Key person dependency reduction" },
            { name: "Transition Planning", weight: 20, description: "Smooth leadership transition processes" }
        ],
        evaluationCriteria: {
            "0-25": "No succession planning",
            "26-50": "Basic succession awareness",
            "51-75": "Good succession planning",
            "76-90": "Strong leadership pipeline",
            "91-100": "Exceptional succession readiness"
        }
    },
    "15d-lead": {
        name: "StakeholderAlignmentAgent",
        description: "Specialist in stakeholder alignment and engagement strategies",
        scoringDimensions: [
            { name: "Stakeholder Mapping", weight: 20, description: "Complete stakeholder identification" },
            { name: "Engagement Strategy", weight: 20, description: "Tailored stakeholder engagement plans" },
            { name: "Communication Effectiveness", weight: 20, description: "Clear and consistent messaging" },
            { name: "Alignment Metrics", weight: 20, description: "Measurable stakeholder alignment" },
            { name: "Conflict Resolution", weight: 20, description: "Effective stakeholder conflict management" }
        ],
        evaluationCriteria: {
            "0-25": "Poor stakeholder alignment",
            "26-50": "Basic stakeholder management",
            "51-75": "Good stakeholder engagement",
            "76-90": "Strong stakeholder alignment",
            "91-100": "Perfect stakeholder harmony"
        }
    },
    "15e-lead": {
        name: "InvestorRelationsAgent",
        description: "Expert in investor relations and capital market communications",
        scoringDimensions: [
            { name: "IR Strategy", weight: 20, description: "Comprehensive investor relations strategy" },
            { name: "Investor Communications", weight: 20, description: "Quality of investor updates and reporting" },
            { name: "Analyst Coverage", weight: 20, description: "Analyst relationships and coverage" },
            { name: "Market Perception", weight: 20, description: "Company valuation and market sentiment" },
            { name: "Capital Access", weight: 20, description: "Ability to raise capital when needed" }
        ],
        evaluationCriteria: {
            "0-25": "No investor relations function",
            "26-50": "Basic investor communications",
            "51-75": "Good investor relations",
            "76-90": "Strong IR program",
            "91-100": "World-class investor relations"
        }
    },
    "15f-lead": {
        name: "LeadershipDynamicsAgent",
        description: "Specialist in leadership team dynamics and executive effectiveness",
        scoringDimensions: [
            { name: "Team Cohesion", weight: 20, description: "Leadership team unity and collaboration" },
            { name: "Decision Making", weight: 20, description: "Quality and speed of executive decisions" },
            { name: "Communication Flow", weight: 20, description: "Executive team communication effectiveness" },
            { name: "Conflict Management", weight: 20, description: "Healthy conflict and resolution" },
            { name: "Performance Culture", weight: 20, description: "High-performance leadership culture" }
        ],
        evaluationCriteria: {
            "0-25": "Dysfunctional leadership team",
            "26-50": "Basic team functioning",
            "51-75": "Good leadership dynamics",
            "76-90": "Strong executive team",
            "91-100": "Exceptional leadership synergy"
        }
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LeadershipAgents;
}
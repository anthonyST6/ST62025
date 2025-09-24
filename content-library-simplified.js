// ScaleOps6 Platform - Simplified Content Library
// Provides unique educational content for all 96 subcomponents

const ContentLibrary = {};

// Generate unique content for each subcomponent
const subcomponentData = {
    "1a": { name: "Problem Statement", focus: "problem clarity and validation" },
    "1b": { name: "Mission Statement", focus: "purpose and vision alignment" },
    "1c": { name: "Voice of Customer", focus: "customer feedback and insights" },
    "1d": { name: "Team Assessment", focus: "skills and capability gaps" },
    "1e": { name: "Market Landscape", focus: "market opportunity and competition" },
    "1f": { name: "Launch Readiness", focus: "go-to-market preparation" },
    "2a": { name: "Interview Cadence", focus: "customer conversation rhythm" },
    "2b": { name: "Persona Development", focus: "customer segmentation and profiles" },
    "2c": { name: "Pain Point Analysis", focus: "problem identification and prioritization" },
    "2d": { name: "Jobs-to-be-Done", focus: "customer goals and outcomes" },
    "2e": { name: "Demand Signals", focus: "market interest indicators" },
    "2f": { name: "Insight Loop", focus: "continuous learning systems" },
    "3a": { name: "Use Case Prioritization", focus: "strategic focus areas" },
    "3b": { name: "Segment Tiering", focus: "customer segment prioritization" },
    "3c": { name: "Prioritization Framework", focus: "decision-making systems" },
    "3d": { name: "Strategic Tradeoffs", focus: "resource allocation choices" },
    "3e": { name: "Hypothesis Testing", focus: "assumption validation" },
    "3f": { name: "Decision Archive", focus: "organizational learning" },
    "4a": { name: "Feature Matrix", focus: "product capability planning" },
    "4b": { name: "Technical Scope", focus: "architecture and boundaries" },
    "4c": { name: "Pilot Group Selection", focus: "early customer recruitment" },
    "4d": { name: "QA Standards", focus: "quality assurance processes" },
    "4e": { name: "Timeline Planning", focus: "project scheduling and milestones" },
    "4f": { name: "Post-Mortem Analysis", focus: "learning from experiences" },
    "5a": { name: "Early Win Documentation", focus: "success story capture" },
    "5b": { name: "ROI Calculation", focus: "value quantification" },
    "5c": { name: "Use Case Success", focus: "implementation patterns" },
    "5d": { name: "Testimonial Collection", focus: "customer advocacy" },
    "5e": { name: "Win Criteria Mapping", focus: "success pattern recognition" },
    "5f": { name: "Deal Debrief", focus: "sales learning loops" },
    "6a": { name: "Usage Analytics", focus: "product engagement tracking" },
    "6b": { name: "Milestone Tracking", focus: "customer progress monitoring" },
    "6c": { name: "CS Dashboard Design", focus: "success metrics visualization" },
    "6d": { name: "Customer Activation", focus: "initial value delivery" },
    "6e": { name: "Feedback Collection", focus: "customer input systems" },
    "6f": { name: "Power User Development", focus: "champion cultivation" },
    "7a": { name: "Time/Cost Savings", focus: "efficiency gains measurement" },
    "7b": { name: "Revenue Impact", focus: "growth contribution tracking" },
    "7c": { name: "Productivity Measurement", focus: "output improvement metrics" },
    "7d": { name: "Retention Analysis", focus: "churn prevention insights" },
    "7e": { name: "System Consolidation", focus: "tool reduction benefits" },
    "7f": { name: "Friction Analysis", focus: "user experience optimization" },
    "8a": { name: "Upsell Strategy", focus: "expansion opportunity capture" },
    "8b": { name: "Team Expansion Tracking", focus: "account growth monitoring" },
    "8c": { name: "Organic Growth Analysis", focus: "viral and referral mechanics" },
    "8d": { name: "Champion Development", focus: "internal advocate nurturing" },
    "8e": { name: "Sentiment Tracking", focus: "customer satisfaction monitoring" },
    "8f": { name: "Renewal Readiness", focus: "retention preparation" },
    "9a": { name: "Inbound Conversion", focus: "lead to customer optimization" },
    "9b": { name: "Outbound Performance", focus: "proactive sales effectiveness" },
    "9c": { name: "Channel Economics", focus: "acquisition cost efficiency" },
    "9d": { name: "Discovery Call Excellence", focus: "needs assessment mastery" },
    "9e": { name: "Demo Optimization", focus: "value demonstration impact" },
    "9f": { name: "Founder Sales Analysis", focus: "founder-led growth leverage" },
    "10a": { name: "Sales Enablement Assets", focus: "sales tool effectiveness" },
    "10b": { name: "Rep Onboarding & Ramp", focus: "new hire productivity" },
    "10c": { name: "Win/Loss Analysis", focus: "deal outcome insights" },
    "10d": { name: "Objection Handling", focus: "resistance resolution skills" },
    "10e": { name: "ICP Definition", focus: "ideal customer clarity" },
    "10f": { name: "Sales Call Library", focus: "best practice sharing" },
    "11a": { name: "Performance Scorecard", focus: "team metrics tracking" },
    "11b": { name: "Quota Structure", focus: "target setting optimization" },
    "11c": { name: "Deal Review Process", focus: "opportunity advancement" },
    "11d": { name: "Forecast Accuracy", focus: "prediction reliability" },
    "11e": { name: "Sales Coaching Program", focus: "skill development systems" },
    "11f": { name: "Talent Gap Analysis", focus: "team capability assessment" },
    "12a": { name: "Customer Onboarding", focus: "initial success setup" },
    "12b": { name: "Activation Tracking", focus: "value realization monitoring" },
    "12c": { name: "Success Playbook Development", focus: "repeatable success processes" },
    "12d": { name: "Escalation Management", focus: "issue resolution systems" },
    "12e": { name: "Renewal Pipeline Management", focus: "retention forecasting" },
    "12f": { name: "Churn Analysis", focus: "attrition prevention insights" },
    "13a": { name: "Category Creation", focus: "market definition leadership" },
    "13b": { name: "Competitive Moat", focus: "sustainable advantage building" },
    "13c": { name: "Ecosystem Strategy", focus: "partnership network development" },
    "13d": { name: "Competitive Intelligence", focus: "market position awareness" },
    "13e": { name: "Brand Strategy", focus: "market perception management" },
    "13f": { name: "Defensive Strategy", focus: "position protection tactics" },
    "14a": { name: "System Architecture", focus: "technical foundation design" },
    "14b": { name: "Revenue Operations", focus: "operational efficiency systems" },
    "14c": { name: "Dashboard Design", focus: "data visualization excellence" },
    "14d": { name: "Tool Stack Optimization", focus: "technology consolidation" },
    "14e": { name: "RevOps Playbook", focus: "operational documentation" },
    "14f": { name: "SLA Management", focus: "service level excellence" },
    "15a": { name: "Executive Hiring", focus: "leadership recruitment" },
    "15b": { name: "Succession Planning", focus: "leadership continuity" },
    "15c": { name: "Executive Cadence", focus: "leadership rhythm" },
    "15d": { name: "Culture Health Assessment", focus: "organizational wellness" },
    "15e": { name: "Organizational Design", focus: "structure optimization" },
    "15f": { name: "DEI Integration", focus: "diversity and inclusion" },
    "16a": { name: "Market Entry Analysis", focus: "expansion opportunity assessment" },
    "16b": { name: "Localization Strategy", focus: "market adaptation planning" },
    "16c": { name: "International Pricing", focus: "global pricing optimization" },
    "16d": { name: "Compliance Management", focus: "regulatory adherence" },
    "16e": { name: "Geographic GTM Strategy", focus: "regional go-to-market" },
    "16f": { name: "Expansion Risk Assessment", focus: "growth risk mitigation" }
};

// Generate content for each subcomponent
Object.keys(subcomponentData).forEach(id => {
    const data = subcomponentData[id];
    
    ContentLibrary[id] = {
        education: {
            what: `${data.name} is a critical component of go-to-market success, focusing on ${data.focus}. It provides the foundation for making informed decisions and driving sustainable growth.`,
            why: `Mastering ${data.name} is essential because it directly impacts your ability to scale efficiently and effectively. Without strong ${data.focus}, teams struggle to achieve product-market fit and sustainable growth.`,
            include: `Your ${data.name} should include: clear objectives and success criteria, data-driven insights and validation, actionable frameworks and processes, measurable outcomes and KPIs, and continuous improvement mechanisms.`
        },
        analysis: {
            strengths: [
                `Clear understanding of ${data.focus}`,
                "Systematic approach in place",
                "Data-driven decision making"
            ],
            weaknesses: [
                "Limited validation or evidence",
                "Inconsistent implementation",
                "Lack of clear metrics"
            ],
            opportunities: [
                `Enhance ${data.focus} capabilities`,
                "Implement best practices",
                "Leverage automation and tools"
            ],
            recommendations: [
                `Conduct thorough assessment of current ${data.focus}`,
                "Develop clear action plan with milestones",
                "Establish regular review and optimization cycles"
            ]
        },
        resources: {
            templates: [
                `${data.name} Template`,
                "Assessment Framework",
                "Implementation Checklist"
            ],
            videos: [
                `Mastering ${data.name}`,
                "Best Practices Guide",
                "Expert Walkthrough"
            ],
            caseStudies: [
                "Industry Leader Example",
                "Startup Success Story",
                "Enterprise Implementation"
            ],
            tools: [
                "Analytics Platform",
                "Automation Software",
                "Collaboration Tools"
            ]
        },
        // Add specific metrics for this subcomponent
        metrics: {
            primary: `${data.name} Score`,
            secondary: [
                "Implementation completeness",
                "Quality assessment",
                "Impact measurement"
            ],
            targets: {
                minimum: 60,
                good: 75,
                excellent: 90
            }
        },
        // Add implementation tips
        tips: [
            `Start with a clear definition of what success looks like for ${data.focus}`,
            "Gather input from all relevant stakeholders",
            "Document your process and learnings",
            "Iterate based on results and feedback",
            "Share best practices across the organization"
        ]
    };
});

// Add helper functions
ContentLibrary.getEducation = function(subcomponentId) {
    return this[subcomponentId]?.education || {
        what: "This component helps optimize your go-to-market strategy.",
        why: "It's essential for sustainable growth and market success.",
        include: "Best practices, frameworks, and measurable outcomes."
    };
};

ContentLibrary.getAnalysis = function(subcomponentId) {
    return this[subcomponentId]?.analysis || {
        strengths: ["Good foundation in place"],
        weaknesses: ["Room for improvement"],
        opportunities: ["Growth potential identified"],
        recommendations: ["Focus on continuous improvement"]
    };
};

ContentLibrary.getResources = function(subcomponentId) {
    return this[subcomponentId]?.resources || {
        templates: ["Standard Template"],
        videos: ["Tutorial Video"],
        caseStudies: ["Success Story"],
        tools: ["Recommended Tool"]
    };
};

ContentLibrary.getMetrics = function(subcomponentId) {
    return this[subcomponentId]?.metrics || {
        primary: "Performance Score",
        secondary: ["Quality", "Impact", "Adoption"],
        targets: { minimum: 60, good: 75, excellent: 90 }
    };
};

ContentLibrary.getTips = function(subcomponentId) {
    return this[subcomponentId]?.tips || [
        "Start with clear objectives",
        "Measure and iterate",
        "Share learnings"
    ];
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContentLibrary;
}
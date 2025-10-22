// Block 5: Go-To-Market Strategy Agents
// These agents replace the incorrect "Early Adopter Wins" agents

const GTMAgents = {
    "5a-gtm": {
        name: "GTMMessagingAgent",
        description: "Expert in crafting compelling go-to-market messaging frameworks",
        scoringDimensions: [
            { name: "Message Clarity", weight: 20, description: "Clarity and simplicity of core messaging" },
            { name: "Value Proposition", weight: 20, description: "Strength of value proposition articulation" },
            { name: "Audience Resonance", weight: 20, description: "Message alignment with target audience needs" },
            { name: "Differentiation", weight: 20, description: "Unique positioning vs competitors" },
            { name: "Consistency", weight: 20, description: "Message consistency across channels" }
        ],
        evaluationCriteria: {
            "0-25": "No clear messaging framework",
            "26-50": "Basic messaging exists but lacks impact",
            "51-75": "Good messaging with solid value prop",
            "76-90": "Strong, differentiated messaging",
            "91-100": "World-class messaging that resonates deeply"
        }
    },
    "5b-gtm": {
        name: "SalesEnablementAgent",
        description: "Specialist in creating and optimizing sales enablement assets",
        scoringDimensions: [
            { name: "Asset Completeness", weight: 20, description: "Coverage of all sales scenarios" },
            { name: "Content Quality", weight: 20, description: "Professional and persuasive materials" },
            { name: "Sales Alignment", weight: 20, description: "Materials match sales process" },
            { name: "Ease of Use", weight: 20, description: "Sales team can easily find and use assets" },
            { name: "Performance Impact", weight: 20, description: "Measurable impact on sales metrics" }
        ],
        evaluationCriteria: {
            "0-25": "No sales enablement assets",
            "26-50": "Basic sales materials exist",
            "51-75": "Good enablement toolkit",
            "76-90": "Comprehensive enablement program",
            "91-100": "Best-in-class sales enablement"
        }
    },
    "5c-gtm": {
        name: "PricingPackagingAgent",
        description: "Expert in pricing strategy and product packaging optimization",
        scoringDimensions: [
            { name: "Pricing Strategy", weight: 20, description: "Sophistication of pricing model" },
            { name: "Value Alignment", weight: 20, description: "Price matches perceived value" },
            { name: "Package Design", weight: 20, description: "Logical and attractive packaging tiers" },
            { name: "Market Fit", weight: 20, description: "Pricing competitive in market" },
            { name: "Revenue Optimization", weight: 20, description: "Maximizes revenue potential" }
        ],
        evaluationCriteria: {
            "0-25": "No pricing strategy",
            "26-50": "Basic pricing without strategy",
            "51-75": "Good pricing with clear tiers",
            "76-90": "Strategic pricing that drives growth",
            "91-100": "Optimal pricing and packaging"
        }
    },
    "5d-gtm": {
        name: "ChannelPartnerAgent",
        description: "Specialist in channel partner strategy and ecosystem development",
        scoringDimensions: [
            { name: "Partner Strategy", weight: 20, description: "Clear channel partner strategy" },
            { name: "Partner Selection", weight: 20, description: "Quality of partner network" },
            { name: "Enablement Programs", weight: 20, description: "Partner training and support" },
            { name: "Revenue Contribution", weight: 20, description: "Channel revenue percentage" },
            { name: "Partner Satisfaction", weight: 20, description: "Partner NPS and retention" }
        ],
        evaluationCriteria: {
            "0-25": "No channel strategy",
            "26-50": "Basic partner relationships",
            "51-75": "Good partner program",
            "76-90": "Strong channel ecosystem",
            "91-100": "World-class partner network"
        }
    },
    "5e-gtm": {
        name: "CompetitivePositioningAgent",
        description: "Expert in competitive analysis and positioning strategies",
        scoringDimensions: [
            { name: "Competitive Intelligence", weight: 20, description: "Depth of competitor knowledge" },
            { name: "Differentiation Strategy", weight: 20, description: "Clear competitive advantages" },
            { name: "Battle Cards", weight: 20, description: "Quality of competitive materials" },
            { name: "Win Rate", weight: 20, description: "Success rate against competitors" },
            { name: "Market Position", weight: 20, description: "Perceived market leadership" }
        ],
        evaluationCriteria: {
            "0-25": "No competitive strategy",
            "26-50": "Basic competitive awareness",
            "51-75": "Good competitive positioning",
            "76-90": "Strong competitive advantage",
            "91-100": "Market leader positioning"
        }
    },
    "5f-gtm": {
        name: "LaunchPlanningAgent",
        description: "Specialist in product launch planning and execution",
        scoringDimensions: [
            { name: "Launch Strategy", weight: 20, description: "Comprehensive launch plan" },
            { name: "Timeline Management", weight: 20, description: "Realistic and achievable timeline" },
            { name: "Cross-functional Coordination", weight: 20, description: "Team alignment and coordination" },
            { name: "Market Readiness", weight: 20, description: "Market prepared for launch" },
            { name: "Launch Metrics", weight: 20, description: "Clear success metrics and tracking" }
        ],
        evaluationCriteria: {
            "0-25": "No launch plan",
            "26-50": "Basic launch preparation",
            "51-75": "Good launch planning",
            "76-90": "Excellent launch execution",
            "91-100": "Flawless launch with exceptional results"
        }
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GTMAgents;
}
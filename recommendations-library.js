/**
 * Centralized Recommendations Library for ScaleOps6
 * 
 * This library contains all recommendations organized by:
 * - Phase
 * - Block
 * - Subcomponent
 * - Score Range
 * 
 * Each recommendation includes:
 * - area: The focus area
 * - impact: Points improvement ("+X")
 * - actionPlan: Array of specific action items
 * - successMetrics: How to measure success
 */

const recommendationsLibrary = {
    // Phase 1: Idea-Market Fit
    phase1: {
        // Block 1: Mission Discovery
        block1: {
            problemStatement: {
                critical: [ // 0-39 score
                    {
                        area: "Problem Clarity",
                        impact: "+10 points",
                        priority: "CRITICAL",
                        actionPlan: [
                            "Interview 10 potential customers using the Mom Test framework",
                            "Document specific pain points with frequency and severity metrics",
                            "Create a problem validation scorecard with measurable criteria"
                        ],
                        successMetrics: "10 validated customer interviews with documented pain points"
                    },
                    {
                        area: "Customer Segmentation",
                        impact: "+8 points",
                        priority: "CRITICAL",
                        actionPlan: [
                            "Define 3 distinct customer segments with clear characteristics",
                            "Map pain point intensity across each segment",
                            "Identify the beachhead segment with highest pain intensity"
                        ],
                        successMetrics: "Clear beachhead segment identified with 80%+ problem validation"
                    },
                    {
                        area: "Problem Quantification",
                        impact: "+7 points",
                        priority: "CRITICAL",
                        actionPlan: [
                            "Calculate the cost of the problem for each customer segment",
                            "Document time/money/resources currently wasted",
                            "Create ROI model showing potential savings"
                        ],
                        successMetrics: "Quantified problem cost with supporting customer data"
                    }
                ],
                high: [ // 40-69 score
                    {
                        area: "Solution Validation",
                        impact: "+8 points",
                        priority: "HIGH",
                        actionPlan: [
                            "Create solution mockups or prototypes for top 3 pain points",
                            "Test with 5 customers from beachhead segment",
                            "Iterate based on feedback with measurable improvements"
                        ],
                        successMetrics: "5 customer validations with 80%+ solution acceptance"
                    },
                    {
                        area: "Competitive Differentiation",
                        impact: "+6 points",
                        priority: "HIGH",
                        actionPlan: [
                            "Analyze 5 competitor solutions and their limitations",
                            "Identify unique value proposition gaps",
                            "Document your 10x improvement opportunity"
                        ],
                        successMetrics: "Clear differentiation matrix with 3+ unique advantages"
                    }
                ],
                medium: [ // 70-89 score
                    {
                        area: "Market Sizing",
                        impact: "+5 points",
                        priority: "MEDIUM",
                        actionPlan: [
                            "Calculate TAM, SAM, and SOM for your solution",
                            "Identify growth drivers and market trends",
                            "Create 3-year market capture model"
                        ],
                        successMetrics: "$10M+ addressable market with clear capture strategy"
                    },
                    {
                        area: "Early Adopter Identification",
                        impact: "+4 points",
                        priority: "MEDIUM",
                        actionPlan: [
                            "Profile ideal early adopter characteristics",
                            "Build list of 50 qualified prospects",
                            "Create outreach strategy with value messaging"
                        ],
                        successMetrics: "50 qualified early adopters with 20%+ response rate"
                    }
                ]
            },
            missionStatement: {
                critical: [
                    {
                        area: "Stakeholder Focus",
                        impact: "+10 points",
                        priority: "CRITICAL",
                        actionPlan: [
                            "Define primary, secondary, and tertiary stakeholders",
                            "Map value creation for each stakeholder group",
                            "Create stakeholder engagement roadmap"
                        ],
                        successMetrics: "Clear stakeholder map with engagement metrics"
                    },
                    {
                        area: "Mission Clarity",
                        impact: "+8 points",
                        priority: "CRITICAL",
                        actionPlan: [
                            "Craft one-sentence mission that a 5th grader can understand",
                            "Test mission statement with 10 stakeholders",
                            "Refine based on feedback for maximum clarity"
                        ],
                        successMetrics: "90%+ stakeholder understanding and alignment"
                    },
                    {
                        area: "Impact Metrics",
                        impact: "+7 points",
                        priority: "CRITICAL",
                        actionPlan: [
                            "Define 3 measurable impact KPIs",
                            "Set 1-year and 3-year targets",
                            "Create tracking dashboard"
                        ],
                        successMetrics: "Dashboard with real-time impact tracking"
                    }
                ],
                high: [
                    {
                        area: "Vision Alignment",
                        impact: "+6 points",
                        priority: "HIGH",
                        actionPlan: [
                            "Create visual representation of future state",
                            "Develop story narrative for vision",
                            "Test resonance with key stakeholders"
                        ],
                        successMetrics: "80%+ stakeholder excitement about vision"
                    },
                    {
                        area: "Values Definition",
                        impact: "+5 points",
                        priority: "HIGH",
                        actionPlan: [
                            "Define 5 core values with behavioral examples",
                            "Create values-based decision framework",
                            "Implement values in hiring and operations"
                        ],
                        successMetrics: "Values integrated into 3+ operational processes"
                    }
                ],
                medium: [
                    {
                        area: "Mission Communication",
                        impact: "+4 points",
                        priority: "MEDIUM",
                        actionPlan: [
                            "Create mission video and one-pager",
                            "Develop elevator pitch variations",
                            "Train team on consistent messaging"
                        ],
                        successMetrics: "100% team alignment on mission messaging"
                    },
                    {
                        area: "Strategic Priorities",
                        impact: "+3 points",
                        priority: "MEDIUM",
                        actionPlan: [
                            "Define top 3 strategic priorities",
                            "Create OKRs for each priority",
                            "Establish review cadence"
                        ],
                        successMetrics: "Quarterly OKR achievement >70%"
                    }
                ]
            },
            voiceOfCustomer: {
                critical: [
                    {
                        area: "Interview Depth",
                        impact: "+10",
                        actionPlan: [
                            "Conduct 20 in-depth customer interviews",
                            "Use Jobs-to-be-Done framework",
                            "Document emotional and functional needs"
                        ],
                        successMetrics: "20 interviews with documented insights"
                    },
                    {
                        area: "Feedback Loops",
                        impact: "+8",
                        actionPlan: [
                            "Establish weekly customer feedback sessions",
                            "Create feedback tracking system",
                            "Implement 48-hour response protocol"
                        ],
                        successMetrics: "Weekly feedback with 48-hour response time"
                    },
                    {
                        area: "Customer Journey Mapping",
                        impact: "+7",
                        actionPlan: [
                            "Map end-to-end customer journey",
                            "Identify pain points at each stage",
                            "Prioritize improvements by impact"
                        ],
                        successMetrics: "Complete journey map with improvement roadmap"
                    }
                ],
                high: [
                    {
                        area: "Persona Development",
                        impact: "+6",
                        actionPlan: [
                            "Create 3 detailed buyer personas",
                            "Include demographics, psychographics, behaviors",
                            "Validate with actual customers"
                        ],
                        successMetrics: "3 validated personas driving product decisions"
                    },
                    {
                        area: "Voice of Customer Program",
                        impact: "+5",
                        actionPlan: [
                            "Implement NPS tracking system",
                            "Create customer advisory board",
                            "Establish quarterly business reviews"
                        ],
                        successMetrics: "NPS >50 with active advisory board"
                    }
                ],
                medium: [
                    {
                        area: "Sentiment Analysis",
                        impact: "+4 points",
                        priority: "MEDIUM",
                        actionPlan: [
                            "Implement sentiment tracking tools",
                            "Monitor social media and reviews",
                            "Create response playbooks"
                        ],
                        successMetrics: "Real-time sentiment tracking with <24hr response"
                    },
                    {
                        area: "Customer Success Metrics",
                        impact: "+3 points",
                        priority: "MEDIUM",
                        actionPlan: [
                            "Define customer success KPIs",
                            "Implement usage analytics",
                            "Create health score model"
                        ],
                        successMetrics: "Customer health scores for 100% of accounts"
                    }
                ]
            },
            teamAssessment: {
                critical: [
                    {
                        area: "Skill Gap Analysis",
                        impact: "+10 points",
                        priority: "CRITICAL",
                        actionPlan: [
                            "Map required skills vs current capabilities",
                            "Identify top 3 critical gaps",
                            "Create hiring or training plan"
                        ],
                        successMetrics: "Critical skill gaps filled within 90 days"
                    },
                    {
                        area: "Team Composition",
                        impact: "+8 points",
                        priority: "CRITICAL",
                        actionPlan: [
                            "Define optimal team structure",
                            "Assess current team fit",
                            "Create recruitment roadmap"
                        ],
                        successMetrics: "Key roles filled with A-players"
                    },
                    {
                        area: "Leadership Alignment",
                        impact: "+7 points",
                        priority: "CRITICAL",
                        actionPlan: [
                            "Conduct leadership team assessment",
                            "Align on vision and strategy",
                            "Establish decision-making framework"
                        ],
                        successMetrics: "100% leadership alignment on strategy"
                    }
                ],
                high: [
                    {
                        area: "Culture Definition",
                        impact: "+6 points",
                        priority: "HIGH",
                        actionPlan: [
                            "Define target culture attributes",
                            "Assess current culture gaps",
                            "Implement culture initiatives"
                        ],
                        successMetrics: "80%+ team culture satisfaction score"
                    },
                    {
                        area: "Performance Management",
                        impact: "+5 points",
                        priority: "HIGH",
                        actionPlan: [
                            "Implement OKR framework",
                            "Create performance review process",
                            "Establish feedback culture"
                        ],
                        successMetrics: "Quarterly OKRs with weekly check-ins"
                    }
                ],
                medium: [
                    {
                        area: "Team Development",
                        impact: "+4 points",
                        priority: "MEDIUM",
                        actionPlan: [
                            "Create individual development plans",
                            "Implement mentorship program",
                            "Establish learning budget"
                        ],
                        successMetrics: "100% team with development plans"
                    },
                    {
                        area: "Communication Rhythms",
                        impact: "+3 points",
                        priority: "MEDIUM",
                        actionPlan: [
                            "Establish daily standups",
                            "Implement weekly team syncs",
                            "Create communication guidelines"
                        ],
                        successMetrics: "95%+ meeting attendance and engagement"
                    }
                ]
            },
            marketLandscape: {
                critical: [
                    {
                        area: "Competitive Analysis",
                        impact: "+10 points",
                        priority: "CRITICAL",
                        actionPlan: [
                            "Analyze top 10 competitors in detail",
                            "Create competitive positioning matrix",
                            "Identify white space opportunities"
                        ],
                        successMetrics: "Clear differentiation in 3+ dimensions"
                    },
                    {
                        area: "Market Sizing",
                        impact: "+8 points",
                        priority: "CRITICAL",
                        actionPlan: [
                            "Calculate TAM with bottom-up analysis",
                            "Define SAM based on capabilities",
                            "Project SOM for years 1-3"
                        ],
                        successMetrics: "$100M+ TAM with clear capture path"
                    },
                    {
                        area: "Industry Trends",
                        impact: "+7 points",
                        priority: "CRITICAL",
                        actionPlan: [
                            "Identify top 5 industry trends",
                            "Assess impact on business model",
                            "Create trend exploitation strategy"
                        ],
                        successMetrics: "Strategy aligned with 3+ major trends"
                    }
                ],
                high: [
                    {
                        area: "Partnership Opportunities",
                        impact: "+6 points",
                        priority: "HIGH",
                        actionPlan: [
                            "Map potential strategic partners",
                            "Define partnership value propositions",
                            "Initiate partnership discussions"
                        ],
                        successMetrics: "3+ strategic partnerships in pipeline"
                    },
                    {
                        area: "Market Entry Strategy",
                        impact: "+5 points",
                        priority: "HIGH",
                        actionPlan: [
                            "Define beachhead market",
                            "Create go-to-market playbook",
                            "Establish market entry metrics"
                        ],
                        successMetrics: "Beachhead market penetration >10%"
                    }
                ],
                medium: [
                    {
                        area: "Ecosystem Mapping",
                        impact: "+4 points",
                        priority: "MEDIUM",
                        actionPlan: [
                            "Map industry ecosystem players",
                            "Identify integration opportunities",
                            "Create ecosystem engagement plan"
                        ],
                        successMetrics: "5+ ecosystem relationships established"
                    },
                    {
                        area: "Regulatory Landscape",
                        impact: "+3 points",
                        priority: "MEDIUM",
                        actionPlan: [
                            "Map regulatory requirements",
                            "Assess compliance needs",
                            "Create compliance roadmap"
                        ],
                        successMetrics: "100% regulatory compliance achieved"
                    }
                ]
            },
            launchReadiness: {
                critical: [
                    {
                        area: "MVP Definition",
                        impact: "+10 points",
                        priority: "CRITICAL",
                        actionPlan: [
                            "Define MVP feature set based on customer feedback",
                            "Create development roadmap with milestones",
                            "Establish launch criteria and metrics"
                        ],
                        successMetrics: "MVP launched with 5+ beta customers"
                    },
                    {
                        area: "Launch Strategy",
                        impact: "+8 points",
                        priority: "CRITICAL",
                        actionPlan: [
                            "Create detailed launch plan with timeline",
                            "Define launch channels and tactics",
                            "Prepare launch assets and materials"
                        ],
                        successMetrics: "Successful launch with 100+ signups"
                    },
                    {
                        area: "Beta Program",
                        impact: "+7 points",
                        priority: "CRITICAL",
                        actionPlan: [
                            "Recruit 10 beta customers",
                            "Create beta feedback framework",
                            "Implement rapid iteration process"
                        ],
                        successMetrics: "10 active beta users with weekly feedback"
                    }
                ],
                high: [
                    {
                        area: "Technical Readiness",
                        impact: "+6 points",
                        priority: "HIGH",
                        actionPlan: [
                            "Complete technical architecture review",
                            "Implement monitoring and analytics",
                            "Establish DevOps processes"
                        ],
                        successMetrics: "99.9% uptime with <200ms response time"
                    },
                    {
                        area: "Go-to-Market Preparation",
                        impact: "+5 points",
                        priority: "HIGH",
                        actionPlan: [
                            "Create sales and marketing materials",
                            "Train sales team on positioning",
                            "Establish lead generation process"
                        ],
                        successMetrics: "50+ qualified leads in pipeline"
                    }
                ],
                medium: [
                    {
                        area: "Customer Support",
                        impact: "+4 points",
                        priority: "MEDIUM",
                        actionPlan: [
                            "Set up support infrastructure",
                            "Create knowledge base and FAQs",
                            "Establish SLA commitments"
                        ],
                        successMetrics: "<2 hour first response time"
                    },
                    {
                        area: "Launch Metrics",
                        impact: "+3 points",
                        priority: "MEDIUM",
                        actionPlan: [
                            "Define success metrics and KPIs",
                            "Implement tracking and dashboards",
                            "Create reporting cadence"
                        ],
                        successMetrics: "Real-time dashboard with key metrics"
                    }
                ]
            }
        }
    }
};

/**
 * Get recommendations for a specific subcomponent based on score
 * @param {string} phase - Phase identifier (e.g., 'phase1')
 * @param {string} block - Block identifier (e.g., 'block1')
 * @param {string} subcomponent - Subcomponent identifier (e.g., 'problemStatement')
 * @param {number} score - Current score (0-100)
 * @returns {Array} Array of recommendations
 */
function getRecommendations(phase, block, subcomponent, score) {
    try {
        const recommendations = recommendationsLibrary[phase]?.[block]?.[subcomponent];
        
        if (!recommendations) {
            console.warn(`No recommendations found for ${phase}.${block}.${subcomponent}`);
            return [];
        }
        
        // Determine score range
        let range;
        if (score < 40) {
            range = 'critical';
        } else if (score < 70) {
            range = 'high';
        } else {
            range = 'medium';
        }
        
        return recommendations[range] || [];
    } catch (error) {
        console.error('Error getting recommendations:', error);
        return [];
    }
}

/**
 * Get all recommendations for a subcomponent (all score ranges)
 * @param {string} phase - Phase identifier
 * @param {string} block - Block identifier
 * @param {string} subcomponent - Subcomponent identifier
 * @returns {Object} Object with critical, high, and medium recommendations
 */
function getAllRecommendations(phase, block, subcomponent) {
    try {
        return recommendationsLibrary[phase]?.[block]?.[subcomponent] || {
            critical: [],
            high: [],
            medium: []
        };
    } catch (error) {
        console.error('Error getting all recommendations:', error);
        return { critical: [], high: [], medium: [] };
    }
}

// Export for use in Node.js environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        recommendationsLibrary,
        getRecommendations,
        getAllRecommendations
    };
}
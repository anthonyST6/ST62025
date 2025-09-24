// Founding Team Capability Analysis Agent - Evaluates team skills, experience, and ability to execute

// Import the recommendations library
const { getRecommendations } = require('./recommendations-library.js');

class FoundingTeamAgent {
    constructor() {
        this.evaluationDimensions = {
            gtmExpertise: {
                weight: 0.25,
                criteria: [
                    'Sales/marketing experience documented',
                    'Previous GTM success stories',
                    'Industry-specific knowledge',
                    'Customer acquisition expertise',
                    'Revenue generation track record'
                ]
            },
            technicalCapability: {
                weight: 0.20,
                criteria: [
                    'Technical skills inventory',
                    'Product development experience',
                    'Architecture/scaling knowledge',
                    'Security/compliance understanding',
                    'Innovation track record'
                ]
            },
            leadershipExperience: {
                weight: 0.20,
                criteria: [
                    'Previous leadership roles',
                    'Team building experience',
                    'Crisis management skills',
                    'Strategic planning ability',
                    'Stakeholder management'
                ]
            },
            domainExpertise: {
                weight: 0.20,
                criteria: [
                    'Industry experience depth',
                    'Network and relationships',
                    'Market understanding',
                    'Regulatory knowledge',
                    'Competitive insights'
                ]
            },
            teamComplementarity: {
                weight: 0.15,
                criteria: [
                    'Skill diversity across team',
                    'Clear role definition',
                    'Gap acknowledgment',
                    'Advisor/mentor network',
                    'Hiring roadmap'
                ]
            }
        };
    }

    parseWorksheetData(data) {
        // Support both field1 and field-1 formats
        const fields = {};
        for (let i = 1; i <= 6; i++) {
            fields[`field${i}`] = data[`field${i}`] || data[`field-${i}`] || '';
        }
        
        return {
            coreStrengths: fields.field1,
            gtmExperience: fields.field2,
            technicalSkills: fields.field3,
            industryBackground: fields.field4,
            leadershipRoles: fields.field5,
            gapsAndAdvisors: fields.field6
        };
    }

    evaluateDimension(dimension, parsedData) {
        const scores = {
            gtmExpertise: this.evaluateGTMExpertise(parsedData),
            technicalCapability: this.evaluateTechnicalCapability(parsedData),
            leadershipExperience: this.evaluateLeadershipExperience(parsedData),
            domainExpertise: this.evaluateDomainExpertise(parsedData),
            teamComplementarity: this.evaluateTeamComplementarity(parsedData)
        };
        
        return scores[dimension] || 0;
    }

    evaluateGTMExpertise(data) {
        let score = 0;
        
        // Check for sales/marketing experience
        const gtmKeywords = ['sales', 'marketing', 'revenue', 'growth', 'acquisition', 'GTM', 'go-to-market'];
        const hasGTMExperience = gtmKeywords.some(keyword => 
            data.gtmExperience.toLowerCase().includes(keyword)
        );
        if (hasGTMExperience) {
            score += 25;
        }
        
        // Check for metrics and achievements
        if (data.gtmExperience.includes('$') || data.gtmExperience.match(/\d+[MKB]/)) {
            score += 25;
        }
        
        // Previous company mentions
        if (data.gtmExperience.includes('VP') || data.gtmExperience.includes('Director') || data.gtmExperience.includes('Head of')) {
            score += 20;
        }
        
        // Industry-specific GTM knowledge
        if (data.industryBackground.includes('B2B') || data.industryBackground.includes('SaaS') || data.industryBackground.includes('enterprise')) {
            score += 15;
        }
        
        // Track record of success
        if (data.coreStrengths.includes('built') || data.coreStrengths.includes('scaled') || data.coreStrengths.includes('grew')) {
            score += 15;
        }
        
        return Math.min(score, 100);
    }

    evaluateTechnicalCapability(data) {
        let score = 0;
        
        // Technical skills mentioned
        const techKeywords = ['engineering', 'CTO', 'architect', 'developer', 'AI', 'ML', 'cloud', 'infrastructure'];
        const hasTechSkills = techKeywords.some(keyword => 
            data.technicalSkills.toLowerCase().includes(keyword)
        );
        if (hasTechSkills) {
            score += 30;
        }
        
        // Specific technologies or platforms
        if (data.technicalSkills.includes('AWS') || data.technicalSkills.includes('Azure') || data.technicalSkills.includes('GCP')) {
            score += 20;
        }
        
        // Product development experience
        if (data.technicalSkills.includes('product') || data.technicalSkills.includes('shipped') || data.technicalSkills.includes('launched')) {
            score += 20;
        }
        
        // Years of experience mentioned
        if (data.technicalSkills.match(/\d+\s*years/)) {
            score += 15;
        }
        
        // Patents or innovations
        if (data.coreStrengths.includes('patent') || data.coreStrengths.includes('innovate')) {
            score += 15;
        }
        
        return Math.min(score, 100);
    }

    evaluateLeadershipExperience(data) {
        let score = 0;
        
        // Leadership titles
        const leadershipTitles = ['CEO', 'COO', 'CTO', 'VP', 'Director', 'Head', 'Manager', 'Lead'];
        const hasLeadershipTitle = leadershipTitles.some(title => 
            data.leadershipRoles.includes(title)
        );
        if (hasLeadershipTitle) {
            score += 30;
        }
        
        // Team size managed
        if (data.leadershipRoles.match(/\d+\+?\s*(people|person|team|engineers|developers)/)) {
            score += 25;
        }
        
        // Previous startup experience
        if (data.leadershipRoles.includes('founder') || data.leadershipRoles.includes('co-founder') || data.leadershipRoles.includes('startup')) {
            score += 20;
        }
        
        // Budget/P&L responsibility
        if (data.leadershipRoles.includes('$') || data.leadershipRoles.includes('budget') || data.leadershipRoles.includes('P&L')) {
            score += 15;
        }
        
        // Exit or acquisition experience
        if (data.leadershipRoles.includes('exit') || data.leadershipRoles.includes('acquisition') || data.leadershipRoles.includes('IPO')) {
            score += 10;
        }
        
        return Math.min(score, 100);
    }

    evaluateDomainExpertise(data) {
        let score = 0;
        
        // Years in industry
        const yearsMatch = data.industryBackground.match(/(\d+)\+?\s*years/);
        if (yearsMatch && parseInt(yearsMatch[1]) >= 5) {
            score += 30;
        } else if (yearsMatch) {
            score += 15;
        }
        
        // Specific industry knowledge
        if (data.industryBackground.includes('expert') || data.industryBackground.includes('specialist') || data.industryBackground.includes('authority')) {
            score += 25;
        }
        
        // Network mentions
        if (data.industryBackground.includes('network') || data.industryBackground.includes('relationships') || data.industryBackground.includes('connections')) {
            score += 20;
        }
        
        // Market understanding
        if (data.industryBackground.includes('market') || data.industryBackground.includes('trends') || data.industryBackground.includes('landscape')) {
            score += 15;
        }
        
        // Publications or thought leadership
        if (data.coreStrengths.includes('speaker') || data.coreStrengths.includes('author') || data.coreStrengths.includes('published')) {
            score += 10;
        }
        
        return Math.min(score, 100);
    }

    evaluateTeamComplementarity(data) {
        let score = 0;
        
        // Multiple skill sets mentioned
        const skillCount = (data.coreStrengths.match(/,/g) || []).length + 1;
        if (skillCount >= 3) {
            score += 25;
        }
        
        // Clear role definition
        if (data.coreStrengths.includes('CEO') && data.coreStrengths.includes('CTO')) {
            score += 20;
        }
        
        // Gap acknowledgment
        if (data.gapsAndAdvisors.includes('need') || data.gapsAndAdvisors.includes('gap') || data.gapsAndAdvisors.includes('hire')) {
            score += 20;
        }
        
        // Advisor network
        if (data.gapsAndAdvisors.includes('advisor') || data.gapsAndAdvisors.includes('mentor') || data.gapsAndAdvisors.includes('board')) {
            score += 20;
        }
        
        // Hiring plan
        if (data.gapsAndAdvisors.includes('hire') || data.gapsAndAdvisors.includes('recruit') || data.gapsAndAdvisors.includes('team')) {
            score += 15;
        }
        
        return Math.min(score, 100);
    }

    generateDimensionFeedback(dimension, score, parsedData) {
        const feedback = {
            gtmExpertise: this.generateGTMExpertiseFeedback(score, parsedData),
            technicalCapability: this.generateTechnicalCapabilityFeedback(score, parsedData),
            leadershipExperience: this.generateLeadershipExperienceFeedback(score, parsedData),
            domainExpertise: this.generateDomainExpertiseFeedback(score, parsedData),
            teamComplementarity: this.generateTeamComplementarityFeedback(score, parsedData)
        };
        
        return feedback[dimension] || { strengths: [], improvements: [] };
    }

    generateGTMExpertiseFeedback(score, data) {
        const strengths = [];
        const improvements = [];
        
        if (data.gtmExperience.includes('VP') || data.gtmExperience.includes('Director')) {
            strengths.push("Strong GTM leadership experience");
        } else {
            improvements.push("Consider adding GTM expertise through advisors or hires");
        }
        
        if (data.gtmExperience.includes('$')) {
            strengths.push("Quantified revenue generation track record");
        } else {
            improvements.push("Quantify previous GTM achievements with metrics");
        }
        
        if (data.gtmExperience.toLowerCase().includes('sales') || data.gtmExperience.toLowerCase().includes('marketing')) {
            strengths.push("Direct sales/marketing experience");
        } else {
            improvements.push("Document specific GTM execution experience");
        }
        
        // Ensure we always have at least one item in each category
        if (strengths.length === 0) {
            strengths.push("GTM awareness demonstrated");
        }
        if (improvements.length === 0) {
            improvements.push("Continue building GTM expertise");
        }
        
        return { strengths, improvements };
    }

    generateTechnicalCapabilityFeedback(score, data) {
        const strengths = [];
        const improvements = [];
        
        if (data.technicalSkills.includes('CTO') || data.technicalSkills.includes('engineering')) {
            strengths.push("Strong technical leadership on team");
        } else {
            improvements.push("Consider adding senior technical talent");
        }
        
        if (data.technicalSkills.includes('shipped') || data.technicalSkills.includes('launched')) {
            strengths.push("Proven product delivery experience");
        } else {
            improvements.push("Document product development track record");
        }
        
        // Ensure we always have at least one item in each category
        if (strengths.length === 0) {
            strengths.push("Technical capability present");
        }
        if (improvements.length === 0) {
            improvements.push("Expand technical team depth");
        }
        
        return { strengths, improvements };
    }

    generateLeadershipExperienceFeedback(score, data) {
        const strengths = [];
        const improvements = [];
        
        if (data.leadershipRoles.includes('CEO') || data.leadershipRoles.includes('founder')) {
            strengths.push("Previous founder/CEO experience valuable");
        } else {
            improvements.push("Highlight leadership experience more clearly");
        }
        
        if (data.leadershipRoles.match(/\d+/)) {
            strengths.push("Team management experience quantified");
        } else {
            improvements.push("Specify team sizes and scopes managed");
        }
        
        // Ensure we always have at least one item in each category
        if (strengths.length === 0) {
            strengths.push("Leadership potential identified");
        }
        if (improvements.length === 0) {
            improvements.push("Build leadership track record");
        }
        
        return { strengths, improvements };
    }

    generateDomainExpertiseFeedback(score, data) {
        const strengths = [];
        const improvements = [];
        
        const yearsMatch = data.industryBackground.match(/(\d+)\+?\s*years/);
        if (yearsMatch && parseInt(yearsMatch[1]) >= 5) {
            strengths.push("Deep industry experience (5+ years)");
        } else {
            improvements.push("Build deeper industry expertise or add domain experts");
        }
        
        if (data.industryBackground.includes('network')) {
            strengths.push("Strong industry network established");
        } else {
            improvements.push("Develop strategic industry relationships");
        }
        
        // Ensure we always have at least one item in each category
        if (strengths.length === 0) {
            strengths.push("Industry knowledge developing");
        }
        if (improvements.length === 0) {
            improvements.push("Deepen domain expertise");
        }
        
        return { strengths, improvements };
    }

    generateTeamComplementarityFeedback(score, data) {
        const strengths = [];
        const improvements = [];
        
        if (data.gapsAndAdvisors.includes('advisor')) {
            strengths.push("Advisor network in place");
        } else {
            improvements.push("Build advisory board for expertise gaps");
        }
        
        if (data.gapsAndAdvisors.includes('hire')) {
            strengths.push("Clear hiring priorities identified");
        } else {
            improvements.push("Define key hires needed for growth");
        }
        
        // Ensure we always have at least one item in each category
        if (strengths.length === 0) {
            strengths.push("Team foundation established");
        }
        if (improvements.length === 0) {
            improvements.push("Continue building complementary skills");
        }
        
        return { strengths, improvements };
    }

    generateRecommendations(scores, parsedData) {
        const overallScore = Object.entries(scores).reduce((sum, [dim, score]) =>
            sum + score * this.evaluationDimensions[dim].weight, 0);
        
        // Get recommendations from the library
        const libraryRecommendations = getRecommendations('phase1', 'block1', 'teamCapability', overallScore);
        
        // If we have library recommendations, use them
        if (libraryRecommendations && libraryRecommendations.length > 0) {
            return libraryRecommendations.slice(0, 5); // Return top 5
        }
        
        // Fallback to original logic if library doesn't have recommendations
        const recommendations = [];
        
        // Helper function to calculate realistic improvement
        const calculateRealisticImprovement = (currentScore, priority) => {
            const gap = 100 - currentScore;
            let baseImprovement = 0;
            
            if (currentScore < 30) {
                baseImprovement = Math.min(gap * 0.6, 12);
            } else if (currentScore < 50) {
                baseImprovement = Math.min(gap * 0.5, 10);
            } else if (currentScore < 70) {
                baseImprovement = Math.min(gap * 0.4, 8);
            } else {
                baseImprovement = Math.min(gap * 0.3, 5);
            }
            
            const priorityMultiplier = priority === 'CRITICAL' ? 1.2 : priority === 'HIGH' ? 1.0 : 0.8;
            baseImprovement *= priorityMultiplier;
            
            if (overallScore > 70) {
                baseImprovement *= 0.7;
            } else if (overallScore < 40) {
                baseImprovement *= 1.1;
            }
            
            const finalImprovement = Math.max(3, Math.round(baseImprovement));
            return Math.min(finalImprovement, Math.round(gap * 0.5));
        };
        
        // Priority recommendations based on lowest scores
        const sortedDimensions = Object.entries(scores)
            .map(([dim, score]) => ({ dimension: dim, score: score, gap: 100 - score }))
            .sort((a, b) => b.gap - a.gap);
        
        // Generate recommendations for top gaps
        sortedDimensions.slice(0, 5).forEach((item, index) => {
            const priority = index === 0 ? 'CRITICAL' : index <= 2 ? 'HIGH' : 'MEDIUM';
            const improvement = calculateRealisticImprovement(item.score, priority);
            
            if (improvement >= 3) {
                const recommendation = {
                    priority: priority,
                    area: this.formatDimensionName(item.dimension),
                    currentState: Math.round(item.score * this.evaluationDimensions[item.dimension].weight),
                    currentPercentage: Math.round(item.score),
                    targetState: Math.min(100, Math.round((item.score + improvement) * this.evaluationDimensions[item.dimension].weight)),
                    expectedImprovement: improvement,
                    impact: `+${improvement} points`,
                    
                    // Use actionPlan instead of specificSteps to match Problem Statement
                    actionPlan: this.generateDimensionActionPlan(item.dimension, item.score, parsedData),
                    
                    // Add actionable recommendations instead of resources
                    recommendations: this.generateActionableRecommendations(item.dimension),
                    
                    // Add success metrics
                    successMetrics: this.defineSuccessMetrics(item.dimension),
                    
                    // Add detailed analysis for popup
                    detailedAnalysis: this.generateDetailedRecommendationAnalysis(
                        item.dimension,
                        item.score,
                        improvement,
                        priority,
                        parsedData
                    )
                };
                
                recommendations.push(recommendation);
            }
        });
        
        // Add strategic recommendation if score is low
        if (overallScore < 60 && recommendations.length < 5) {
            const strategicImprovement = 8;
            recommendations.push({
                priority: "STRATEGIC",
                area: "Team Foundation",
                actionPlan: [
                    "Build advisory board with 5 strategic advisors",
                    "Define key hire roadmap for next 18 months",
                    "Establish team culture and values",
                    "Implement leadership development program"
                ],
                impact: `+${strategicImprovement} points`,
                expectedImprovement: strategicImprovement,
                recommendations: [
                    "Identify 5 strategic advisors this week",
                    "Define top 3 critical hires for next 90 days",
                    "Create skills matrix to identify gaps",
                    "Launch advisor outreach campaign"
                ],
                successMetrics: [
                    "Advisory board established",
                    "Key roles filled",
                    "Team alignment > 90%"
                ],
                detailedAnalysis: {
                    overview: "A strong founding team is the foundation of startup success. This plan builds the team capabilities needed to execute your vision.",
                    implementation: {
                        phase1: {
                            title: "Team Assessment",
                            tasks: [
                                "Complete skills matrix",
                                "Identify critical gaps",
                                "Define role requirements",
                                "Set hiring priorities"
                            ]
                        },
                        phase2: {
                            title: "Team Building",
                            tasks: [
                                "Recruit key hires",
                                "Build advisory board",
                                "Establish team rituals",
                                "Define decision framework"
                            ]
                        },
                        phase3: {
                            title: "Team Development",
                            tasks: [
                                "Implement OKRs",
                                "Start leadership coaching",
                                "Build feedback culture",
                                "Track team performance"
                            ]
                        }
                    },
                    roi: "Strong founding teams raise 2.5x more funding and have 3x higher success rates."
                }
            });
        }
        
        return recommendations.slice(0, 5); // Return top 5 recommendations
    }
    
    // New method: Format dimension name properly
    formatDimensionName(dimension) {
        const map = {
            'gtmExpertise': 'GTM Expertise',
            'technicalCapability': 'Technical Capability',
            'leadershipExperience': 'Leadership Experience',
            'domainExpertise': 'Domain Expertise',
            'teamComplementarity': 'Team Complementarity'
        };
        return map[dimension] || dimension;
    }
    
    // New method: Generate action plan (replacing generateSpecificSteps)
    generateDimensionActionPlan(dimension, currentScore, parsedData) {
        const plans = {
            gtmExpertise: [
                "Recruit VP Sales/Marketing with proven track record",
                "Add 3 GTM advisors from successful startups",
                "Join revenue communities (RevGenius, Pavilion)",
                "Document GTM playbook and sales process"
            ],
            technicalCapability: [
                "Hire CTO or VP Engineering with scaling experience",
                "Add 2-3 senior engineers in next 60 days",
                "Establish engineering best practices",
                "Build technical advisory board"
            ],
            leadershipExperience: [
                "Engage executive coach for founders",
                "Join CEO peer groups (YPO, EO)",
                "Implement OKR framework",
                "Create board of advisors"
            ],
            domainExpertise: [
                "Interview 20 industry experts",
                "Join industry associations",
                "Build strategic partnerships",
                "Create thought leadership content"
            ],
            teamComplementarity: [
                "Complete team skills matrix",
                "Define 18-month hiring roadmap",
                "Build diverse advisory board",
                "Establish team culture and values"
            ]
        };
        
        return plans[dimension] || [
            "Assess team capabilities",
            "Identify critical gaps",
            "Create recruitment plan",
            "Build advisor network"
        ];
    }
    
    // New method: Generate actionable recommendations
    generateActionableRecommendations(dimension) {
        const recommendations = {
            gtmExpertise: [
                "Hire VP Sales with 5+ years B2B SaaS experience",
                "Add 3 GTM advisors from successful exits",
                "Join RevGenius or Pavilion community this week",
                "Document your sales process and ICP"
            ],
            technicalCapability: [
                "Recruit CTO with scaling experience ASAP",
                "Hire 2 senior engineers in next 60 days",
                "Define technical architecture and roadmap",
                "Establish code review and CI/CD processes"
            ],
            leadershipExperience: [
                "Engage executive coach for 6 months",
                "Join CEO peer group (YPO/EO) this month",
                "Implement weekly leadership team meetings",
                "Create decision-making framework"
            ],
            domainExpertise: [
                "Interview 20 industry experts this month",
                "Attend 2 industry conferences this quarter",
                "Build relationships with 5 potential partners",
                "Publish thought leadership content weekly"
            ],
            teamComplementarity: [
                "Complete team skills assessment this week",
                "Define top 5 roles to hire in next 6 months",
                "Recruit 3-5 advisors with complementary skills",
                "Create team charter and working agreements"
            ]
        };
        
        return recommendations[dimension] || [
            "Assess current capabilities",
            "Identify critical gaps",
            "Create hiring plan"
        ];
    }
    
    // New method: Define success metrics
    defineSuccessMetrics(dimension) {
        const metrics = {
            gtmExpertise: [
                "GTM leader hired",
                "Sales playbook created",
                "First customers acquired"
            ],
            technicalCapability: [
                "Technical leader in place",
                "Core team hired",
                "Product shipped on schedule"
            ],
            leadershipExperience: [
                "Leadership team complete",
                "OKRs implemented",
                "Team satisfaction > 80%"
            ],
            domainExpertise: [
                "Industry network built",
                "Thought leadership established",
                "Strategic partnerships formed"
            ],
            teamComplementarity: [
                "All key roles filled",
                "Advisory board active",
                "Team alignment high"
            ]
        };
        
        return metrics[dimension] || [
            "Team capability improved",
            "Key hires made",
            "Team performance increased"
        ];
    }
    
    // New method: Generate detailed recommendation analysis
    generateDetailedRecommendationAnalysis(dimension, currentScore, improvement, priority, parsedData) {
        const detailedPlans = {
            gtmExpertise: {
                overview: "GTM expertise is critical for customer acquisition and revenue growth. This plan builds the sales and marketing capabilities needed for scale.",
                implementation: {
                    phase1: {
                        title: "GTM Leadership",
                        tasks: [
                            "Define VP Sales/Marketing role",
                            "Launch executive search",
                            "Interview candidates",
                            "Make strategic hire"
                        ]
                    },
                    phase2: {
                        title: "GTM Foundation",
                        tasks: [
                            "Build sales playbook",
                            "Create marketing strategy",
                            "Define ICP and personas",
                            "Set up CRM and tools"
                        ]
                    },
                    phase3: {
                        title: "GTM Execution",
                        tasks: [
                            "Hire initial sales team",
                            "Launch demand generation",
                            "Start pipeline building",
                            "Track and optimize"
                        ]
                    }
                },
                recommendations: [
                    "Define VP Sales role and start search",
                    "Interview 10+ candidates in next 30 days",
                    "Check references thoroughly",
                    "Offer competitive equity package"
                ],
                risks: [
                    "Wrong GTM hire",
                    "Premature scaling",
                    "Poor product-market fit",
                    "Inefficient CAC"
                ],
                successMetrics: [
                    "GTM leader hired within 60 days",
                    "Sales pipeline built",
                    "First 10 customers acquired",
                    "CAC/LTV ratio established"
                ],
                roi: "Strong GTM leadership increases revenue growth by 2-3x and reduces customer acquisition costs by 40%."
            },
            technicalCapability: {
                overview: "Technical excellence determines product quality and scalability. This plan ensures you have the engineering talent to build and scale.",
                implementation: {
                    phase1: {
                        title: "Technical Leadership",
                        tasks: [
                            "Define CTO/VP Eng role",
                            "Recruit through networks",
                            "Technical assessment",
                            "Make strategic hire"
                        ]
                    },
                    phase2: {
                        title: "Team Building",
                        tasks: [
                            "Define engineering roles",
                            "Create hiring pipeline",
                            "Interview and assess",
                            "Build core team"
                        ]
                    },
                    phase3: {
                        title: "Engineering Excellence",
                        tasks: [
                            "Establish best practices",
                            "Set up CI/CD",
                            "Implement code reviews",
                            "Build tech debt strategy"
                        ]
                    }
                },
                recommendations: [
                    "Post CTO role on AngelList and VCs",
                    "Leverage network for warm intros",
                    "Conduct technical assessment",
                    "Build core engineering team"
                ],
                risks: [
                    "Technical debt accumulation",
                    "Scaling challenges",
                    "Security vulnerabilities",
                    "Team retention"
                ],
                successMetrics: [
                    "CTO/VP hired",
                    "Core team of 5+ engineers",
                    "Product velocity increased",
                    "Technical debt managed"
                ],
                roi: "Strong technical teams ship 2x faster with 50% fewer bugs and scale more efficiently."
            },
            leadershipExperience: {
                overview: "Leadership experience guides strategic decisions and team building. This plan develops the leadership capabilities needed for growth.",
                implementation: {
                    phase1: {
                        title: "Leadership Assessment",
                        tasks: [
                            "360 feedback process",
                            "Identify strengths/gaps",
                            "Define development plan",
                            "Engage executive coach"
                        ]
                    },
                    phase2: {
                        title: "Leadership Development",
                        tasks: [
                            "Weekly coaching sessions",
                            "Join peer groups",
                            "Leadership training",
                            "Practice new skills"
                        ]
                    },
                    phase3: {
                        title: "Leadership Systems",
                        tasks: [
                            "Implement OKRs",
                            "Build feedback culture",
                            "Create decision framework",
                            "Establish rituals"
                        ]
                    }
                },
                recommendations: [
                    "Interview 3 executive coaches this week",
                    "Join YPO or EO chapter locally",
                    "Read one leadership book monthly",
                    "Practice new leadership skills daily"
                ],
                risks: [
                    "Founder burnout",
                    "Poor decisions",
                    "Team misalignment",
                    "Culture problems"
                ],
                successMetrics: [
                    "Leadership skills improved",
                    "Team satisfaction > 80%",
                    "Decision velocity increased",
                    "Clear vision communicated"
                ],
                roi: "Strong leadership increases team performance by 30% and reduces turnover by 50%."
            },
            domainExpertise: {
                overview: "Domain expertise provides competitive advantage and credibility. This plan builds deep industry knowledge and networks.",
                implementation: {
                    phase1: {
                        title: "Industry Immersion",
                        tasks: [
                            "Interview 20 experts",
                            "Attend key conferences",
                            "Read industry reports",
                            "Map ecosystem"
                        ]
                    },
                    phase2: {
                        title: "Network Building",
                        tasks: [
                            "Join associations",
                            "Build advisor relationships",
                            "Develop partnerships",
                            "Create thought leadership"
                        ]
                    },
                    phase3: {
                        title: "Expertise Application",
                        tasks: [
                            "Inform product strategy",
                            "Guide GTM approach",
                            "Enable sales",
                            "Build credibility"
                        ]
                    }
                },
                recommendations: [
                    "Schedule 5 expert interviews weekly",
                    "Register for 2 conferences now",
                    "Join 3 industry associations",
                    "Start weekly industry newsletter"
                ],
                risks: [
                    "Shallow understanding",
                    "Wrong assumptions",
                    "Missing trends",
                    "Weak network"
                ],
                successMetrics: [
                    "20+ expert interviews",
                    "Industry network built",
                    "Thought leadership published",
                    "Strategic partnerships formed"
                ],
                roi: "Deep domain expertise increases win rates by 40% and accelerates sales cycles by 30%."
            },
            teamComplementarity: {
                overview: "Complementary skills create a complete team. This plan ensures you have all capabilities needed for success.",
                implementation: {
                    phase1: {
                        title: "Skills Assessment",
                        tasks: [
                            "Complete skills matrix",
                            "Identify gaps",
                            "Prioritize needs",
                            "Define roles"
                        ]
                    },
                    phase2: {
                        title: "Gap Filling",
                        tasks: [
                            "Recruit key hires",
                            "Build advisory board",
                            "Engage consultants",
                            "Develop existing team"
                        ]
                    },
                    phase3: {
                        title: "Team Optimization",
                        tasks: [
                            "Clarify roles",
                            "Improve collaboration",
                            "Build culture",
                            "Track performance"
                        ]
                    }
                },
                recommendations: [
                    "Map all team skills in spreadsheet",
                    "Identify top 3 skill gaps",
                    "Create 90-day hiring plan",
                    "Start advisor outreach today"
                ],
                risks: [
                    "Skills gaps",
                    "Role confusion",
                    "Team conflict",
                    "Slow hiring"
                ],
                successMetrics: [
                    "All critical roles filled",
                    "Skills gaps addressed",
                    "Team alignment high",
                    "Performance improved"
                ],
                roi: "Well-balanced teams are 2.5x more likely to succeed and grow 30% faster."
            }
        };
        
        const plan = detailedPlans[dimension] || {
            overview: `Improving ${this.formatDimensionName(dimension)} will strengthen your founding team.`,
            implementation: {
                phase1: {
                    title: "Assessment",
                    tasks: ["Evaluate current state", "Identify gaps", "Set goals", "Plan approach"]
                },
                phase2: {
                    title: "Development",
                    tasks: ["Execute plan", "Build capabilities", "Track progress", "Iterate"]
                },
                phase3: {
                    title: "Optimization",
                    tasks: ["Measure results", "Refine approach", "Scale success", "Maintain excellence"]
                }
            },
            recommendations: ["Assess current state", "Set clear goals", "Execute plan"],
            risks: ["Execution challenges", "Resource constraints", "Timeline delays"],
            successMetrics: [`${dimension} improved by ${improvement} points`],
            roi: "Expected improvement in team capability and execution ability."
        };
        
        return plan;
    }
    

    analyzeWorksheet(worksheetData) {
        console.log('👥 Founding Team Agent: Starting analysis...');
        
        const parsedData = this.parseWorksheetData(worksheetData);
        console.log('📋 Parsed founding team data');
        
        const scores = {};
        const feedback = {};
        
        // Evaluate each dimension
        for (const dimension in this.evaluationDimensions) {
            scores[dimension] = this.evaluateDimension(dimension, parsedData);
            feedback[dimension] = this.generateDimensionFeedback(dimension, scores[dimension], parsedData);
            console.log(`📊 ${dimension}: ${scores[dimension]}%`);
        }
        
        // Calculate overall score
        let overallScore = 0;
        for (const dimension in scores) {
            overallScore += scores[dimension] * this.evaluationDimensions[dimension].weight;
        }
        
        // Generate recommendations
        const recommendations = this.generateRecommendations(scores, parsedData);
        
        // Determine improvement from baseline
        const baselineScore = 25; // Assume starting team capability
        const improvement = Math.max(0, overallScore - baselineScore);
        
        console.log(`✅ Founding Team Analysis complete: ${Math.round(overallScore)}%`);
        
        // Format detailed scores for display
        const detailedScores = {};
        for (const dimension in scores) {
            detailedScores[dimension] = {
                score: Math.round(scores[dimension] * this.evaluationDimensions[dimension].weight),
                maxScore: Math.round(this.evaluationDimensions[dimension].weight * 100),
                percentage: Math.round(scores[dimension]),
                weight: this.evaluationDimensions[dimension].weight * 100,
                feedback: this.formatFeedbackForDisplay(feedback[dimension])
            };
        }
        
        // Recommendations are already properly formatted
        
        return {
            score: Math.round(overallScore),
            detailedScores: detailedScores,
            recommendations: recommendations,
            analysis: {
                executiveSummary: this.generateSummary(overallScore, scores, parsedData),
                strengths: this.extractAllStrengths(feedback),
                weaknesses: this.extractAllWeaknesses(feedback),
                improvement: Math.round(improvement)
            }
        };
    }

    generateSummary(overallScore, scores, parsedData) {
        const hasGTM = scores.gtmExpertise >= 60;
        const hasTech = scores.technicalCapability >= 60;
        const hasLeadership = scores.leadershipExperience >= 60;
        
        if (overallScore >= 80) {
            return `Exceptional founding team with ${hasGTM && hasTech ? 'balanced GTM and technical expertise' : 'strong core competencies'}. Well-positioned for rapid scaling with clear leadership experience and domain knowledge.`;
        } else if (overallScore >= 60) {
            return `Solid founding team foundation. ${hasGTM ? 'GTM expertise is strong.' : 'GTM expertise needs strengthening.'} ${hasTech ? 'Technical capability established.' : 'Technical depth should be enhanced.'} Focus on filling identified gaps through strategic hires or advisors.`;
        } else if (overallScore >= 40) {
            return `Founding team shows promise but needs strengthening. ${hasLeadership ? 'Leadership experience is valuable.' : 'Leadership development needed.'} Priority should be adding complementary skills through co-founders or early hires.`;
        } else {
            return `Founding team requires significant augmentation. Critical gaps in GTM expertise, technical capability, or domain knowledge must be addressed immediately through strategic hires or experienced advisors.`;
        }
    }
    
    formatFeedbackForDisplay(feedback) {
        const strengths = feedback.strengths || [];
        const improvements = feedback.improvements || [];
        
        let display = '';
        if (strengths.length > 0) {
            display += '✓ ' + strengths.join('\n✓ ');
        }
        if (improvements.length > 0) {
            if (display) display += '\n';
            display += '✗ ' + improvements.join('\n✗ ');
        }
        
        return display;
    }
    
    extractAllStrengths(feedback) {
        const allStrengths = [];
        for (const dimension in feedback) {
            if (feedback[dimension].strengths) {
                allStrengths.push(...feedback[dimension].strengths);
            }
        }
        return allStrengths;
    }
    
    extractAllWeaknesses(feedback) {
        const allWeaknesses = [];
        for (const dimension in feedback) {
            if (feedback[dimension].improvements) {
                allWeaknesses.push(...feedback[dimension].improvements);
            }
        }
        return allWeaknesses;
    }
}

module.exports = FoundingTeamAgent;
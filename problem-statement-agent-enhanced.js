// Enhanced Problem Statement Analysis Agent with Deep GTM Expertise
// A world-class GTM expert that provides dynamic, contextual analysis

// Import the dynamic recommendations library for intelligent recommendation generation
const DynamicRecommendationsLibrary = require('./recommendations-library-dynamic.js');
const recommendationsLib = new DynamicRecommendationsLibrary();

class ProblemStatementAgentEnhanced {
    constructor() {
        this.name = "Elite GTM Problem Statement Expert";
        this.version = "2.0.0";
        
        // Deep expertise domains
        this.expertiseDomains = {
            frameworks: [
                "Jobs-to-be-Done Theory (Clayton Christensen)",
                "Customer Development (Steve Blank)",
                "Lean Startup Methodology",
                "Value Proposition Design (Strategyzer)",
                "Blue Ocean Strategy",
                "Crossing the Chasm (Geoffrey Moore)",
                "The Mom Test (Rob Fitzpatrick)",
                "SPIN Selling",
                "MEDDIC/MEDDPICC",
                "Product-Led Growth",
                "Community-Led Growth",
                "Category Design (Play Bigger)",
                "Demand Generation Framework",
                "Account-Based Marketing",
                "Design Thinking"
            ],
            
            industryKnowledge: {
                "B2B SaaS": {
                    benchmarks: { CAC: "$5-15k", LTV: "$30-100k", churn: "5-7%", growthRate: "3x YoY" },
                    challenges: ["Long sales cycles", "Complex buying committees", "Integration requirements"],
                    successFactors: ["Product stickiness", "Network effects", "Clear ROI"]
                },
                "Enterprise": {
                    benchmarks: { dealSize: "$100k+", salesCycle: "6-18 months", NRR: "110-130%" },
                    challenges: ["Security requirements", "Compliance needs", "Change management"],
                    successFactors: ["Executive sponsorship", "Professional services", "Platform approach"]
                },
                "SMB": {
                    benchmarks: { CAC: "$500-2k", salesCycle: "1-3 months", volumeNeeded: "high" },
                    challenges: ["Price sensitivity", "Limited resources", "High churn risk"],
                    successFactors: ["Self-service capability", "Quick time-to-value", "Community support"]
                },
                "PLG": {
                    benchmarks: { viralCoefficient: ">0.5", activationRate: "20-40%", paidConversion: "2-5%" },
                    challenges: ["Monetization timing", "Feature gating", "Enterprise readiness"],
                    successFactors: ["Aha moment clarity", "Collaboration features", "Usage-based pricing"]
                }
            },
            
            psychologicalInsights: {
                buyerPsychology: ["Loss aversion", "Social proof", "Authority bias", "Urgency/Scarcity"],
                adoptionBarriers: ["Status quo bias", "Switching costs", "Risk perception", "Learning curve"],
                motivators: ["Career advancement", "Risk mitigation", "Efficiency gains", "Innovation leadership"]
            }
        };
        
        // Dynamic scoring rubric
        this.evaluationDimensions = {
            problemClarity: {
                weight: 20,
                aspects: ["Specificity", "Measurability", "Relevance", "Urgency", "Solvability"]
            },
            marketUnderstanding: {
                weight: 20,
                aspects: ["TAM sizing", "Segment definition", "Competition awareness", "Timing", "Trends"]
            },
            customerEmpathy: {
                weight: 20,
                aspects: ["Pain depth", "Persona accuracy", "Context understanding", "Emotional drivers", "JTBD clarity"]
            },
            valueQuantification: {
                weight: 20,
                aspects: ["ROI clarity", "Metric selection", "Benchmark comparison", "Impact scope", "Time-to-value"]
            },
            solutionDifferentiation: {
                weight: 20,
                aspects: ["Unique insight", "Moat potential", "Alternative analysis", "Innovation level", "Feasibility"]
            }
        };
        
        // Industry-specific patterns and insights
        this.patternLibrary = {
            strongSignals: [
                "Quantified financial impact with specific metrics",
                "Direct customer quotes validating the problem",
                "Clear trigger events identified",
                "Competitive landscape well understood",
                "Measurable current inefficiencies"
            ],
            weakSignals: [
                "Vague problem descriptions",
                "No customer validation",
                "Missing quantification",
                "Unclear target segment",
                "No differentiation identified"
            ],
            emergingTrends: [
                "AI/ML integration opportunities",
                "Remote work adaptations",
                "Sustainability requirements",
                "Data privacy concerns",
                "Platform consolidation"
            ]
        };
    }

    // Main analysis function with dynamic intelligence
    analyzeWorksheet(worksheetData, uploadedDocs = []) {
        console.log('🧠 Enhanced GTM Expert Agent: Initiating deep analysis...');
        
        // Parse and enrich data
        const enrichedData = this.enrichWorksheetData(worksheetData);
        
        // Detect industry and context
        const context = this.detectContext(enrichedData);
        
        // Perform multi-dimensional analysis
        const analysis = this.performDeepAnalysis(enrichedData, context);
        
        // Generate dynamic scoring based on context
        const scoring = this.generateContextualScoring(analysis, context);
        
        // Create personalized recommendations
        const recommendations = this.generatePersonalizedRecommendations(analysis, context, scoring);
        
        // Provide strategic insights
        const strategicInsights = this.generateStrategicInsights(analysis, context);
        
        // Benchmark against best practices
        const benchmarkAnalysis = this.performBenchmarking(analysis, context);
        
        return {
            score: scoring.overall,
            confidence: this.calculateConfidence(analysis),
            timestamp: new Date().toISOString(),
            
            analysis: {
                executiveSummary: this.generateExecutiveSummary(analysis, scoring, context),
                strengthsAndWeaknesses: this.identifyStrengthsWeaknesses(analysis),
                criticalGaps: this.identifyCriticalGaps(analysis),
                opportunities: this.identifyOpportunities(analysis, context)
            },
            
            detailedScores: scoring.dimensional,
            
            recommendations: recommendations,
            
            strategicInsights: strategicInsights,
            
            benchmarkComparison: benchmarkAnalysis,
            
            nextSteps: this.generateNextSteps(analysis, recommendations),
            
            expertAdvice: this.provideExpertCommentary(analysis, context),
            
            resources: this.recommendResources(analysis, context)
        };
    }

    // Enrich worksheet data with NLP and pattern recognition
    enrichWorksheetData(data) {
        const enriched = {
            raw: this.parseWorksheetData(data),
            entities: {},
            sentiment: {},
            keywords: {},
            patterns: {}
        };
        
        // Extract key entities and concepts
        Object.keys(enriched.raw).forEach(field => {
            const text = enriched.raw[field];
            
            // Extract metrics and numbers
            enriched.entities[field] = {
                metrics: this.extractMetrics(text),
                companies: this.extractCompanies(text),
                roles: this.extractRoles(text),
                technologies: this.extractTechnologies(text),
                timeframes: this.extractTimeframes(text)
            };
            
            // Analyze sentiment and urgency
            enriched.sentiment[field] = this.analyzeSentiment(text);
            
            // Extract keywords and themes
            enriched.keywords[field] = this.extractKeywords(text);
            
            // Identify patterns
            enriched.patterns[field] = this.identifyPatterns(text);
        });
        
        return enriched;
    }

    // Detect industry context and business model
    detectContext(enrichedData) {
        const context = {
            industry: null,
            businessModel: null,
            stage: null,
            geography: null,
            urgency: null,
            sophistication: null
        };
        
        // Industry detection
        const industrySignals = {
            "B2B SaaS": ["SaaS", "subscription", "ARR", "MRR", "churn", "cloud", "software"],
            "Enterprise": ["enterprise", "Fortune 500", "compliance", "security", "integration"],
            "SMB": ["small business", "SMB", "startup", "10-50 employees", "limited budget"],
            "Marketplace": ["marketplace", "two-sided", "buyers and sellers", "liquidity", "network effects"],
            "PLG": ["freemium", "self-serve", "product-led", "viral", "bottom-up"]
        };
        
        // Analyze text for industry signals
        const allText = Object.values(enrichedData.raw).join(" ").toLowerCase();
        let maxScore = 0;
        
        for (const [industry, signals] of Object.entries(industrySignals)) {
            const score = signals.filter(signal => allText.includes(signal)).length;
            if (score > maxScore) {
                maxScore = score;
                context.industry = industry;
            }
        }
        
        // Detect business stage
        if (allText.match(/seed|pre-seed|mvp|prototype|idea/i)) {
            context.stage = "Pre-Product Market Fit";
        } else if (allText.match(/\$1m|\$2m|\$3m|series a|product-market fit/i)) {
            context.stage = "Early Product Market Fit";
        } else if (allText.match(/\$5m|\$10m|series b|scale|growth/i)) {
            context.stage = "Growth Stage";
        } else if (allText.match(/\$20m|\$50m|series c|enterprise|mature/i)) {
            context.stage = "Scale Stage";
        }
        
        // Assess urgency
        const urgencyIndicators = allText.match(/urgent|critical|immediate|asap|burning|crisis/gi);
        context.urgency = urgencyIndicators ? "High" : "Medium";
        
        // Evaluate sophistication level
        const sophisticationScore = this.evaluateSophistication(enrichedData);
        context.sophistication = sophisticationScore > 70 ? "Advanced" : sophisticationScore > 40 ? "Intermediate" : "Beginner";
        
        return context;
    }

    // Perform deep multi-dimensional analysis
    performDeepAnalysis(enrichedData, context) {
        const analysis = {
            problemDefinition: this.analyzeProblemDefinition(enrichedData, context),
            marketOpportunity: this.analyzeMarketOpportunity(enrichedData, context),
            customerUnderstanding: this.analyzeCustomerUnderstanding(enrichedData, context),
            competitiveLandscape: this.analyzeCompetitiveLandscape(enrichedData, context),
            solutionViability: this.analyzeSolutionViability(enrichedData, context),
            gtmReadiness: this.assessGTMReadiness(enrichedData, context)
        };
        
        // Cross-reference insights
        analysis.coherenceScore = this.assessCoherence(analysis);
        analysis.innovationScore = this.assessInnovation(analysis);
        analysis.feasibilityScore = this.assessFeasibility(analysis);
        
        return analysis;
    }

    // Analyze problem definition with expert lens - DETERMINISTIC SCORING
    analyzeProblemDefinition(enrichedData, context) {
        const problemText = enrichedData.raw.problem || "";
        const analysis = {
            clarity: 0,
            specificity: 0,
            urgency: 0,
            solvability: 0,
            marketRelevance: 0,
            insights: [],
            concerns: []
        };
        
        // DETERMINISTIC CLARITY SCORING (0-100)
        // Base score from problem length and structure
        if (problemText.length >= 200) {
            analysis.clarity = 40; // Comprehensive problem statement
        } else if (problemText.length >= 100) {
            analysis.clarity = 30; // Adequate problem statement
        } else if (problemText.length >= 50) {
            analysis.clarity = 20; // Basic problem statement
        } else {
            analysis.clarity = 10; // Minimal problem statement
        }
        
        // Add points for problem indicators (deterministic)
        if (problemText.match(/struggle|challenge|pain|problem|difficulty|issue|gap/i)) {
            analysis.clarity += 15;
        }
        
        // Add points for quantification (deterministic)
        const metrics = enrichedData.entities.problem.metrics || [];
        if (metrics.length >= 3) {
            analysis.clarity += 30;
            analysis.insights.push("Excellent quantification with multiple metrics");
        } else if (metrics.length >= 2) {
            analysis.clarity += 20;
            analysis.insights.push("Good quantification with key metrics");
        } else if (metrics.length >= 1) {
            analysis.clarity += 10;
            analysis.insights.push("Some quantification present");
        } else {
            analysis.concerns.push("Add specific metrics to strengthen problem statement");
        }
        
        // Add points for causal understanding (deterministic)
        if (problemText.match(/because|due to|caused by|results in|leads to|root cause/i)) {
            analysis.clarity += 15;
            analysis.insights.push("Clear causal understanding demonstrated");
        } else {
            analysis.concerns.push("Explore root causes more deeply");
        }
        
        // Cap at 100
        analysis.clarity = Math.min(100, analysis.clarity);
        
        // DETERMINISTIC SPECIFICITY SCORING (0-100)
        analysis.specificity = 0;
        
        // Check for specific segments mentioned
        if (problemText.match(/B2B|B2C|enterprise|SMB|startup|SaaS/i)) {
            analysis.specificity += 25;
        }
        
        // Check for specific roles/personas
        if (enrichedData.entities.problem.roles && enrichedData.entities.problem.roles.length > 0) {
            analysis.specificity += 25;
        }
        
        // Check for specific scenarios
        if (problemText.match(/when|during|while|after|before/i)) {
            analysis.specificity += 25;
        }
        
        // Check for specific pain points
        const painPoints = problemText.match(/specifically|exactly|precisely|particular|concrete/gi) || [];
        analysis.specificity += Math.min(25, painPoints.length * 10);
        
        // DETERMINISTIC URGENCY SCORING (0-100)
        analysis.urgency = 30; // Base urgency
        
        if (problemText.match(/urgent|critical|immediate|asap|now|burning/i)) {
            analysis.urgency += 40;
        }
        
        if (problemText.match(/losing|missing|failing|behind|risk/i)) {
            analysis.urgency += 30;
        }
        
        // DETERMINISTIC SOLVABILITY SCORING (0-100)
        analysis.solvability = 50; // Base solvability
        
        if (problemText.match(/can be solved|solution exists|addressable|fixable|improvable/i)) {
            analysis.solvability += 30;
        }
        
        if (problemText.length > 100 && metrics.length > 0) {
            analysis.solvability += 20; // Well-defined problems are more solvable
        }
        
        // DETERMINISTIC MARKET RELEVANCE SCORING (0-100)
        analysis.marketRelevance = 40; // Base relevance
        
        // Industry-specific scoring
        if (context.industry === "B2B SaaS") {
            if (problemText.match(/integration|data silos|workflow|automation|efficiency|scale/i)) {
                analysis.marketRelevance += 40;
                analysis.insights.push("Problem aligns well with B2B SaaS market needs");
            }
        }
        
        // Check for market indicators
        if (problemText.match(/industry|market|sector|companies|organizations/i)) {
            analysis.marketRelevance += 20;
        }
        
        return analysis;
    }

    // Generate contextual scoring based on analysis
    generateContextualScoring(analysis, context) {
        const scoring = {
            overall: 0,
            dimensional: {},
            adjustments: []
        };
        
        // Base scoring from analysis
        const dimensions = {
            problemClarity: this.scoreProblemClarity(analysis.problemDefinition),
            marketUnderstanding: this.scoreMarketUnderstanding(analysis.marketOpportunity),
            customerEmpathy: this.scoreCustomerEmpathy(analysis.customerUnderstanding),
            valueQuantification: this.scoreValueQuantification(analysis),
            solutionDifferentiation: this.scoreSolutionDifferentiation(analysis)
        };
        
        // Apply contextual adjustments
        if (context.stage === "Pre-Product Market Fit") {
            // More forgiving on quantification, stricter on customer understanding
            dimensions.valueQuantification *= 0.8;
            dimensions.customerEmpathy *= 1.2;
            scoring.adjustments.push("Adjusted for early-stage context");
        }
        
        if (context.sophistication === "Beginner") {
            // Provide more generous scoring with educational focus
            Object.keys(dimensions).forEach(key => {
                dimensions[key] = Math.min(100, dimensions[key] * 1.1);
            });
            scoring.adjustments.push("Beginner-friendly scoring applied");
        }
        
        // Calculate weighted overall score
        let totalWeight = 0;
        let weightedSum = 0;
        
        for (const [dimension, score] of Object.entries(dimensions)) {
            const weight = this.evaluationDimensions[dimension]?.weight || 20;
            weightedSum += score * (weight / 100);
            totalWeight += weight / 100;
            
            // Keep scores in percentage (0-100) and let frontend handle display
            // The frontend expects score and maxScore to calculate percentage
            // We'll provide the actual points (out of 20) correctly
            const maxPoints = 20; // Each dimension is worth 20 points max
            const actualPoints = Math.round((score / 100) * maxPoints);
            
            // ALWAYS generate comprehensive feedback for every dimension
            const feedback = this.generateComprehensiveFeedback(dimension, score, analysis);
            
            scoring.dimensional[dimension] = {
                score: actualPoints,  // Actual points earned (0-20)
                maxScore: maxPoints,  // Maximum possible points (20)
                percentage: Math.round(score), // Percentage for reference
                weight: weight,
                feedback: feedback  // Always include detailed feedback
            };
        }
        
        scoring.overall = Math.round(weightedSum / totalWeight);
        
        return scoring;
    }

    // Generate personalized recommendations with realistic scoring
    generatePersonalizedRecommendations(analysis, context, scoring) {
        const currentOverallScore = scoring.overall || 50;
        const recommendations = [];
        
        // First, check if we have similar past recommendations that worked well
        const similarRecommendations = recommendationsLib.getSimilarRecommendations(
            'problemStatement',
            currentOverallScore,
            2
        );
        
        // If we have highly successful past recommendations, consider reusing them
        if (similarRecommendations.length > 0) {
            console.log('📚 Found similar past recommendations to consider');
        }
        
        // Helper function to format dimension names properly
        const formatDimensionName = (dimension) => {
            const dimensionMap = {
                'problemClarity': 'Problem Clarity',
                'marketUnderstanding': 'Market Understanding',
                'customerEmpathy': 'Customer Empathy',
                'valueQuantification': 'Value Quantification',
                'solutionDifferentiation': 'Solution Differentiation'
            };
            
            return dimensionMap[dimension] || dimension;
        };
        
        // Calculate realistic improvement potential for each dimension
        const calculateRealisticImprovement = (currentScore, maxScore, priority, overallScore) => {
            const scorePercentage = (currentScore / maxScore) * 100;
            const gap = 100 - scorePercentage;
            
            // Base improvement calculation with diminishing returns
            let baseImprovement = 0;
            
            if (scorePercentage < 30) {
                // Very low scores - high improvement potential but requires significant effort
                baseImprovement = Math.min(gap * 0.6, 12); // Max 12 points for very weak dimensions
            } else if (scorePercentage < 50) {
                // Low scores - moderate improvement potential
                baseImprovement = Math.min(gap * 0.5, 10); // Max 10 points
            } else if (scorePercentage < 70) {
                // Medium scores - smaller gains as refinement gets harder
                baseImprovement = Math.min(gap * 0.4, 8); // Max 8 points
            } else {
                // High scores - marginal gains only
                baseImprovement = Math.min(gap * 0.3, 5); // Max 5 points
            }
            
            // Adjust based on priority
            const priorityMultiplier = priority === 'CRITICAL' ? 1.2 : priority === 'HIGH' ? 1.0 : 0.8;
            baseImprovement *= priorityMultiplier;
            
            // Apply overall score constraints (can't improve everything at once)
            if (overallScore > 70) {
                baseImprovement *= 0.7; // Harder to improve when already good
            } else if (overallScore < 40) {
                baseImprovement *= 1.1; // Slightly easier gains when starting low
            }
            
            // Round to nearest integer and ensure minimum of 3 points if there's room
            const finalImprovement = Math.max(3, Math.round(baseImprovement));
            
            // Cap at realistic maximum based on current score
            return Math.min(finalImprovement, Math.round((100 - scorePercentage) * 0.5));
        };
        
        // Prioritize based on biggest gaps - this is where we generate NEW recommendations
        const gaps = this.identifyBiggestGaps(scoring);
        
        // Track total expected improvement to ensure it's realistic
        let totalExpectedImprovement = 0;
        const maxTotalImprovement = Math.min(100 - currentOverallScore, 25); // Cap at 25% or reaching 100%
        
        // First pass: calculate raw improvements
        const rawRecommendations = [];
        let rawTotal = 0;
        
        gaps.forEach((gap, index) => {
            const priority = index === 0 ? "CRITICAL" : index <= 2 ? "HIGH" : "MEDIUM";
            
            // Calculate realistic improvement for this dimension
            const currentDimScore = gap.score;
            const maxDimScore = scoring.dimensional[gap.dimension]?.maxScore || 20;
            const currentPercentage = (currentDimScore / maxDimScore) * 100;
            
            const improvement = calculateRealisticImprovement(
                currentDimScore,
                maxDimScore,
                priority,
                currentOverallScore
            );
            
            if (improvement >= 3) {
                rawRecommendations.push({
                    gap,
                    priority,
                    improvement,
                    currentDimScore,
                    maxDimScore,
                    currentPercentage
                });
                rawTotal += improvement;
            }
        });
        
        // No scaling - use raw improvements directly
        rawRecommendations.forEach(rawRec => {
            const improvement = rawRec.improvement;
            
            totalExpectedImprovement += improvement;
            
            // Generate a NEW recommendation dynamically based on the analysis
            const dynamicRecommendation = recommendationsLib.generateRecommendation({
                area: formatDimensionName(rawRec.gap.dimension),
                score: rawRec.currentPercentage,
                dimension: rawRec.gap.dimension,
                data: {
                    currentScore: rawRec.currentDimScore,
                    maxScore: rawRec.maxDimScore,
                    analysis: analysis,
                    context: context
                },
                priority: rawRec.priority,
                subcomponent: 'problemStatement'
            });
            
            // Enhance the dynamic recommendation with our specific analysis
            const recommendation = {
                ...dynamicRecommendation,
                currentState: rawRec.currentDimScore,
                currentPercentage: Math.round(rawRec.currentPercentage),
                targetState: Math.min(rawRec.currentDimScore + improvement, rawRec.maxDimScore),
                
                // Always use our comprehensive action plan
                actionPlan: this.generateComprehensiveActionPlan(rawRec.gap.dimension, analysis, context),
                
                // Merge recommendations from both sources
                recommendations: [
                    ...dynamicRecommendation.recommendations,
                    ...this.generateActionableRecommendations(rawRec.gap.dimension, context)
                ].filter((v, i, a) => a.indexOf(v) === i).slice(0, 4), // Remove duplicates, keep top 4
                
                // Always use our comprehensive success metrics
                successMetrics: this.defineComprehensiveSuccessMetrics(rawRec.gap.dimension, context),
                
                // Add detailed analysis for popup
                detailedAnalysis: this.generateDetailedRecommendationAnalysis(
                    rawRec.gap.dimension,
                    rawRec.currentDimScore,
                    rawRec.maxDimScore,
                    improvement,
                    rawRec.priority,
                    analysis,
                    context
                )
            };
            
            recommendations.push(recommendation);
        });
        
        // Add strategic recommendation if score is low and we have room
        if (currentOverallScore < 60 && totalExpectedImprovement < maxTotalImprovement) {
            const strategicImprovement = Math.min(8, maxTotalImprovement - totalExpectedImprovement);
            recommendations.push({
                priority: "STRATEGIC",
                area: "GTM Foundation",
                actionPlan: [
                    "Document your Ideal Customer Profile (ICP) with 10+ characteristics",
                    "Create a repeatable sales playbook based on successful deals",
                    "Establish clear qualification criteria (BANT/MEDDIC)",
                    "Build a customer success framework for onboarding"
                ],
                impact: `+${strategicImprovement}`,
                expectedImprovement: strategicImprovement,
                action: "Build GTM Foundation",
                recommendations: [
                    "Interview your top 10 customers to identify common characteristics",
                    "Document a repeatable sales process based on your last 5 successful deals",
                    "Create a qualification scorecard with specific criteria for each stage"
                ],
                successMetrics: [
                    "ICP documented and validated",
                    "Sales playbook created",
                    "3+ deals qualified with new criteria"
                ],
                detailedAnalysis: {
                    overview: "A comprehensive GTM foundation is essential for sustainable growth. This strategic initiative will establish the core frameworks needed for scalable customer acquisition.",
                    implementation: {
                        phase1: {
                            title: "ICP Definition",
                            tasks: [
                                "Analyze top 10 customers",
                                "Identify common characteristics",
                                "Document ideal profile",
                                "Validate with sales team"
                            ]
                        },
                        phase2: {
                            title: "Sales Playbook",
                            tasks: [
                                "Document successful sales process",
                                "Create talk tracks and objection handling",
                                "Build demo script",
                                "Train sales team"
                            ]
                        },
                        phase3: {
                            title: "Qualification & Success",
                            tasks: [
                                "Implement MEDDIC framework",
                                "Create customer success playbooks",
                                "Define success metrics",
                                "Launch pilot program"
                            ]
                        }
                    },
                    roi: "Properly implemented GTM foundation typically increases win rates by 20-30% and reduces sales cycle by 15-25%."
                }
            });
        }
        
        return recommendations.slice(0, 5); // Return top 5 recommendations
    }

    // Generate detailed recommendation analysis for popup display
    generateDetailedRecommendationAnalysis(dimension, currentScore, maxScore, improvement, priority, analysis, context) {
        const detailedPlans = {
            problemClarity: {
                overview: "Clear problem articulation is the foundation of product-market fit. This recommendation focuses on transforming vague problem descriptions into specific, measurable, and validated problem statements.",
                implementation: {
                    phase1: {
                        title: "Problem Discovery",
                        tasks: [
                            "Interview 10 customers using '5 Whys' technique",
                            "Document problem scenarios with specific examples",
                            "Identify patterns and root causes",
                            "Create problem statement draft"
                        ]
                    },
                    phase2: {
                        title: "Quantification",
                        tasks: [
                            "Measure frequency of problem occurrence",
                            "Calculate time/money impact per incident",
                            "Estimate total addressable problem (TAP)",
                            "Benchmark against industry standards"
                        ]
                    },
                    phase3: {
                        title: "Validation",
                        tasks: [
                            "Test problem statement with 20+ prospects",
                            "Refine based on feedback",
                            "Document evidence and quotes",
                            "Finalize problem articulation"
                        ]
                    }
                },
                recommendations: [
                    "Schedule 10 customer interviews this week using open-ended questions",
                    "Calculate the exact dollar amount customers lose due to this problem",
                    "Document 5 specific scenarios where the problem occurs with timestamps",
                    "Get written confirmation from 20 prospects that this problem matters"
                ],
                risks: [
                    "Confirmation bias in interviews",
                    "Over-generalization from small sample",
                    "Missing adjacent problems",
                    "Analysis paralysis"
                ],
                successMetrics: [
                    "20+ customer interviews completed",
                    "Problem quantified with 3+ metrics",
                    "80% validation rate from prospects",
                    "Clear problem statement < 100 words"
                ],
                roi: "Clear problem articulation typically increases conversion rates by 25-35% and reduces sales cycle length by 20%."
            },
            marketUnderstanding: {
                overview: "Deep market understanding enables precise targeting and positioning. This analysis will establish your total addressable market, competitive landscape, and market dynamics.",
                implementation: {
                    phase1: {
                        title: "Market Sizing",
                        tasks: [
                            "Calculate TAM using bottom-up approach",
                            "Define SAM based on current capabilities",
                            "Estimate SOM based on market position",
                            "Validate with industry reports"
                        ]
                    },
                    phase2: {
                        title: "Competitive Analysis",
                        tasks: [
                            "Map top 10 competitors",
                            "Analyze pricing and positioning",
                            "Identify market gaps",
                            "Document competitive advantages"
                        ]
                    },
                    phase3: {
                        title: "Market Dynamics",
                        tasks: [
                            "Research market trends and drivers",
                            "Identify regulatory factors",
                            "Assess timing and urgency",
                            "Create market entry strategy"
                        ]
                    }
                },
                recommendations: [
                    "Calculate TAM by multiplying total potential customers by average deal size",
                    "Sign up for competitor products and document their strengths/weaknesses",
                    "Identify 3 market trends that make your solution timely right now",
                    "Interview 5 industry experts to validate market opportunity"
                ],
                risks: [
                    "Overestimating market size",
                    "Missing indirect competitors",
                    "Rapid market changes",
                    "Incorrect segmentation"
                ],
                successMetrics: [
                    "TAM/SAM/SOM documented with sources",
                    "10+ competitors analyzed",
                    "3+ market trends identified",
                    "Go-to-market strategy defined"
                ],
                roi: "Proper market understanding reduces customer acquisition costs by 20-30% and improves product-market fit timing."
            },
            customerEmpathy: {
                overview: "True customer empathy drives product decisions and messaging that resonates. This deep dive will uncover the emotional and functional drivers behind customer behavior.",
                implementation: {
                    phase1: {
                        title: "Customer Research",
                        tasks: [
                            "Conduct 20+ in-depth interviews",
                            "Shadow customers in their environment",
                            "Document day-in-the-life scenarios",
                            "Identify emotional triggers"
                        ]
                    },
                    phase2: {
                        title: "Persona Development",
                        tasks: [
                            "Create 3-5 detailed personas",
                            "Map jobs-to-be-done for each",
                            "Document buying criteria",
                            "Validate with sales team"
                        ]
                    },
                    phase3: {
                        title: "Journey Mapping",
                        tasks: [
                            "Map complete customer journey",
                            "Identify key moments of truth",
                            "Document pain points at each stage",
                            "Create empathy maps"
                        ]
                    }
                },
                recommendations: [
                    "Shadow 5 customers for a full day to observe their workflow",
                    "Create detailed personas with actual customer quotes and pain points",
                    "Map every touchpoint from problem awareness to solution purchase",
                    "Document what customers are trying to achieve, not just what they do"
                ],
                risks: [
                    "Selection bias in interviews",
                    "Over-indexing on vocal minorities",
                    "Missing silent majority needs",
                    "Personas becoming stereotypes"
                ],
                successMetrics: [
                    "20+ customers interviewed",
                    "3-5 validated personas created",
                    "Complete journey maps",
                    "Sales team adoption > 80%"
                ],
                roi: "Strong customer empathy increases product adoption by 30-40% and reduces churn by 15-25%."
            },
            valueQuantification: {
                overview: "Quantifying value transforms vague benefits into compelling business cases. This process will establish clear ROI metrics that resonate with economic buyers.",
                implementation: {
                    phase1: {
                        title: "Value Discovery",
                        tasks: [
                            "Interview customers on current costs",
                            "Document time spent on problem",
                            "Calculate opportunity costs",
                            "Identify all value drivers"
                        ]
                    },
                    phase2: {
                        title: "ROI Modeling",
                        tasks: [
                            "Build ROI calculator",
                            "Create sensitivity analysis",
                            "Develop case studies with metrics",
                            "Validate model with customers"
                        ]
                    },
                    phase3: {
                        title: "Value Communication",
                        tasks: [
                            "Create value proposition messaging",
                            "Build sales enablement tools",
                            "Develop pricing strategy",
                            "Train team on value selling"
                        ]
                    }
                },
                recommendations: [
                    "Build a simple ROI calculator showing time and cost savings",
                    "Document 3 customer success stories with before/after metrics",
                    "Calculate payback period for your solution (aim for <12 months)",
                    "Create a value matrix comparing your solution to status quo"
                ],
                risks: [
                    "Overestimating value delivery",
                    "Complex calculations reducing credibility",
                    "Ignoring soft benefits",
                    "One-size-fits-all approach"
                ],
                successMetrics: [
                    "ROI calculator validated by 5+ customers",
                    "3+ case studies with hard metrics",
                    "Clear ROI demonstrated",
                    "Value messaging adopted by sales"
                ],
                roi: "Clear value quantification increases average deal size by 25-40% and shortens sales cycles by 20-30%."
            },
            solutionDifferentiation: {
                overview: "Sustainable differentiation creates competitive moats and pricing power. This analysis will identify and strengthen your unique value proposition.",
                implementation: {
                    phase1: {
                        title: "Competitive Deep Dive",
                        tasks: [
                            "Analyze top 5 competitors in detail",
                            "Test competitor solutions",
                            "Interview churned customers",
                            "Identify true differentiators"
                        ]
                    },
                    phase2: {
                        title: "Differentiation Strategy",
                        tasks: [
                            "Define unique value proposition",
                            "Identify defensible advantages",
                            "Create positioning statement",
                            "Develop competitive battle cards"
                        ]
                    },
                    phase3: {
                        title: "Market Validation",
                        tasks: [
                            "Test positioning with prospects",
                            "Validate differentiation claims",
                            "Refine based on feedback",
                            "Launch differentiated messaging"
                        ]
                    }
                },
                recommendations: [
                    "Test competitor products and document 5 things they can't do",
                    "Write your unique value prop in 10 words or less",
                    "Identify 3 features competitors can't copy within 12 months",
                    "Create comparison chart showing your 10x advantage"
                ],
                risks: [
                    "Feature parity race",
                    "Differentiation not valued by market",
                    "Competitors copying quickly",
                    "Over-promising capabilities"
                ],
                successMetrics: [
                    "5+ validated differentiators",
                    "Win rate improvement > 20%",
                    "Positioning resonates with 80% of prospects",
                    "Competitive wins documented"
                ],
                roi: "Strong differentiation enables 15-25% price premiums and increases win rates by 30-40%."
            }
        };
        
        const plan = detailedPlans[dimension] || {
            overview: `Improving ${dimension} will strengthen your overall problem statement and GTM readiness.`,
            implementation: {
                phase1: {
                    title: "Assessment Phase",
                    tasks: ["Review current state", "Identify gaps", "Set improvement targets", "Gather resources"]
                },
                phase2: {
                    title: "Implementation Phase",
                    tasks: ["Execute improvement plan", "Gather feedback", "Iterate on approach", "Document progress"]
                },
                phase3: {
                    title: "Validation Phase",
                    tasks: ["Test improvements", "Measure impact", "Refine based on results", "Scale successful changes"]
                }
            },
            recommendations: ["Conduct initial assessment", "Set measurable improvement goals", "Track progress weekly"],
            risks: ["Execution challenges", "Resource constraints", "Market changes"],
            successMetrics: [`${dimension} score improved by ${improvement} points`],
            roi: "Expected improvement in overall GTM effectiveness."
        };
        
        return plan;
    }

    // Generate strategic insights
    generateStrategicInsights(analysis, context) {
        const insights = {
            marketPosition: this.assessMarketPosition(analysis, context),
            competitiveAdvantage: this.identifyCompetitiveAdvantage(analysis),
            growthPotential: this.assessGrowthPotential(analysis, context),
            risks: this.identifyStrategicRisks(analysis, context),
            opportunities: this.identifyStrategicOpportunities(analysis, context)
        };
        
        // Add context-specific insights
        if (context.industry === "B2B SaaS") {
            insights.gtmMotion = this.recommendGTMMotion(analysis, context);
            insights.pricingStrategy = this.recommendPricingStrategy(analysis, context);
            insights.channelStrategy = this.recommendChannelStrategy(analysis, context);
        }
        
        return insights;
    }

    // Helper methods for extraction and analysis
    extractMetrics(text) {
        const metrics = [];
        
        // Extract percentages
        const percentages = text.match(/\d+\.?\d*\s*%/g) || [];
        metrics.push(...percentages.map(p => ({ type: 'percentage', value: p })));
        
        // Extract currency values
        const currency = text.match(/\$[\d,]+[KMB]?/gi) || [];
        metrics.push(...currency.map(c => ({ type: 'currency', value: c })));
        
        // Extract time metrics
        const time = text.match(/\d+\s*(hours?|days?|weeks?|months?|years?)/gi) || [];
        metrics.push(...time.map(t => ({ type: 'time', value: t })));
        
        // Extract quantities
        const quantities = text.match(/\d+\s*(customers?|users?|companies|employees)/gi) || [];
        metrics.push(...quantities.map(q => ({ type: 'quantity', value: q })));
        
        return metrics;
    }

    extractRoles(text) {
        const rolePatterns = [
            /\b(CEO|CTO|CFO|CMO|COO|CPO|VP|Director|Manager|Head of|Lead|Founder|Co-founder)\b/gi,
            /\b(Product Manager|Engineering Manager|Sales Director|Marketing Manager)\b/gi,
            /\b(Developer|Engineer|Designer|Analyst|Consultant)\b/gi
        ];
        
        const roles = [];
        rolePatterns.forEach(pattern => {
            const matches = text.match(pattern) || [];
            roles.push(...matches);
        });
        
        return [...new Set(roles)];
    }

    analyzeSentiment(text) {
        const positive = ["opportunity", "growth", "success", "improve", "better", "increase", "efficient"];
        const negative = ["struggle", "pain", "difficult", "challenge", "problem", "fail", "slow", "inefficient"];
        
        const positiveScore = positive.filter(word => text.toLowerCase().includes(word)).length;
        const negativeScore = negative.filter(word => text.toLowerCase().includes(word)).length;
        
        return {
            score: (positiveScore - negativeScore) / (positiveScore + negativeScore + 1),
            positive: positiveScore,
            negative: negativeScore,
            tone: negativeScore > positiveScore ? "problem-focused" : "solution-focused"
        };
    }

    // Generate executive summary with dynamic insights
    generateExecutiveSummary(analysis, scoring, context) {
        const score = scoring.overall;
        const stage = context.stage || "Unknown";
        const sophistication = context.sophistication || "Intermediate";
        
        let summary = "";
        
        if (score >= 85) {
            summary = `Exceptional problem statement articulation (${score}%). `;
            summary += `Your deep understanding of the ${context.industry || 'market'} landscape positions you well for ${stage} success. `;
            summary += `Key strengths: ${this.getTopStrengths(analysis).join(', ')}. `;
            summary += `To reach world-class (95+), focus on: ${this.getImprovementArea(analysis)}.`;
        } else if (score >= 70) {
            summary = `Strong problem statement foundation (${score}%). `;
            summary += `You demonstrate good ${sophistication}-level understanding with clear growth potential. `;
            summary += `Strengths: ${this.getTopStrengths(analysis).slice(0, 2).join(', ')}. `;
            summary += `Priority improvements: ${this.getTopImprovements(analysis).join(', ')}. `;
            summary += `You can reach excellence with focused effort.`;
        } else if (score >= 50) {
            summary = `Developing problem statement (${score}%). `;
            summary += `While you grasp the general problem space, significant gaps limit your GTM effectiveness. `;
            summary += `Critical gaps: ${this.getCriticalGaps(analysis).join(', ')}. `;
            summary += `Immediate focus needed on customer validation and quantification. `;
            summary += `You can build a strong foundation with dedicated effort.`;
        } else {
            summary = `Problem statement needs fundamental work (${score}%). `;
            summary += `Current articulation creates high GTM risk and will struggle to resonate with customers or investors. `;
            summary += `Must address: ${this.getCriticalGaps(analysis).slice(0, 3).join(', ')}. `;
            summary += `Recommend immediate customer discovery sprint followed by problem refinement workshop.`;
        }
        
        // Add context-specific advice
        if (context.industry === "B2B SaaS" && score < 70) {
            summary += ` For B2B SaaS specifically, you must demonstrate clear ROI and integration capabilities.`;
        }
        
        return summary;
    }


    // Helper methods for dynamic analysis
    getTopStrengths(analysis) {
        const strengths = [];
        
        if (analysis.problemDefinition.clarity > 70) {
            strengths.push("Clear problem articulation");
        }
        if (analysis.customerUnderstanding?.depth > 70) {
            strengths.push("Strong customer empathy");
        }
        if (analysis.marketOpportunity?.size > 70) {
            strengths.push("Large market opportunity");
        }
        if (analysis.competitiveLandscape?.differentiation > 70) {
            strengths.push("Clear differentiation");
        }
        
        return strengths.length > 0 ? strengths : ["Foundation in place"];
    }

    getTopImprovements(analysis) {
        const improvements = [];
        
        if (analysis.problemDefinition.clarity < 60) {
            improvements.push("Problem clarity");
        }
        if (!analysis.customerUnderstanding || analysis.customerUnderstanding.depth < 60) {
            improvements.push("Customer validation");
        }
        if (!analysis.marketOpportunity || analysis.marketOpportunity.quantification < 60) {
            improvements.push("Impact quantification");
        }
        
        return improvements.length > 0 ? improvements : ["Continuous refinement"];
    }

    getCriticalGaps(analysis) {
        const gaps = [];
        
        if (analysis.problemDefinition.clarity < 50) {
            gaps.push("Problem definition");
        }
        if (!analysis.customerUnderstanding || analysis.customerUnderstanding.validation < 50) {
            gaps.push("Customer evidence");
        }
        if (!analysis.marketOpportunity || analysis.marketOpportunity.size < 50) {
            gaps.push("Market sizing");
        }
        if (analysis.competitiveLandscape?.awareness < 50) {
            gaps.push("Competitive analysis");
        }
        
        return gaps.length > 0 ? gaps : ["Fundamental understanding"];
    }

    // Additional helper methods
    parseWorksheetData(data) {
        return {
            who: data['who-affected'] || '',
            problem: data['what-problem'] || '',
            when: data['when-occur'] || '',
            impact: data['what-impact'] || '',
            currentSolutions: data['how-solving'] || '',
            evidence: data['evidence-validation'] || ''
        };
    }

    extractCompanies(text) {
        // Simple company extraction - could be enhanced with NER
        const patterns = [
            /\b[A-Z][a-z]+(?:Corp|Inc|LLC|Ltd|Company|Co)\b/g,
            /\b(?:Google|Microsoft|Amazon|Facebook|Apple|Salesforce|Slack|Zoom)\b/gi
        ];
        
        const companies = [];
        patterns.forEach(pattern => {
            const matches = text.match(pattern) || [];
            companies.push(...matches);
        });
        
        return [...new Set(companies)];
    }

    extractTechnologies(text) {
        const techKeywords = [
            "AI", "ML", "API", "SaaS", "cloud", "mobile", "web", "platform",
            "integration", "automation", "analytics", "data", "software"
        ];
        
        return techKeywords.filter(tech => 
            text.toLowerCase().includes(tech.toLowerCase())
        );
    }

    extractTimeframes(text) {
        const timePatterns = [
            /\b\d+\s*(?:days?|weeks?|months?|years?)\b/gi,
            /\b(?:Q[1-4]|quarterly|annually|monthly|weekly|daily)\b/gi,
            /\b(?:immediate|urgent|asap|short-term|long-term)\b/gi
        ];
        
        const timeframes = [];
        timePatterns.forEach(pattern => {
            const matches = text.match(pattern) || [];
            timeframes.push(...matches);
        });
        
        return timeframes;
    }

    extractKeywords(text) {
        // Extract important keywords and phrases
        const words = text.toLowerCase().split(/\s+/);
        const stopWords = ["the", "is", "at", "which", "on", "and", "a", "an", "as", "are", "was", "were", "been", "be"];
        
        const keywords = words
            .filter(word => word.length > 3 && !stopWords.includes(word))
            .reduce((acc, word) => {
                acc[word] = (acc[word] || 0) + 1;
                return acc;
            }, {});
        
        return Object.entries(keywords)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([word, count]) => ({ word, count }));
    }

    identifyPatterns(text) {
        const patterns = {
            hasQuantification: /\d+/.test(text),
            hasCausality: /because|due to|caused by|results in|leads to/i.test(text),
            hasComparison: /compared to|versus|vs\.|better than|worse than/i.test(text),
            hasEvidence: /research|study|survey|interview|data|evidence/i.test(text),
            hasUrgency: /urgent|immediate|critical|asap|now/i.test(text)
        };
        
        return patterns;
    }

    evaluateSophistication(enrichedData) {
        let score = 0;
        
        // Check for metrics
        Object.values(enrichedData.entities).forEach(entities => {
            score += entities.metrics.length * 5;
        });
        
        // Check for industry terminology
        const sophisticatedTerms = [
            "TAM", "SAM", "SOM", "CAC", "LTV", "ARR", "MRR", "NRR",
            "product-market fit", "go-to-market", "value proposition",
            "customer acquisition", "retention", "churn"
        ];
        
        const allText = Object.values(enrichedData.raw).join(" ").toLowerCase();
        sophisticatedTerms.forEach(term => {
            if (allText.includes(term.toLowerCase())) {
                score += 10;
            }
        });
        
        return Math.min(100, score);
    }

    // DETERMINISTIC SCORING METHODS - NO RANDOMNESS, CONSISTENT EXPERT EVALUATION
    scoreProblemClarity(problemAnalysis) {
        // Weighted average of all problem dimensions
        const weights = {
            clarity: 0.3,      // 30% weight
            specificity: 0.25, // 25% weight
            urgency: 0.15,     // 15% weight
            solvability: 0.15, // 15% weight
            marketRelevance: 0.15 // 15% weight
        };
        
        let weightedScore = 0;
        weightedScore += (problemAnalysis.clarity || 0) * weights.clarity;
        weightedScore += (problemAnalysis.specificity || 0) * weights.specificity;
        weightedScore += (problemAnalysis.urgency || 0) * weights.urgency;
        weightedScore += (problemAnalysis.solvability || 0) * weights.solvability;
        weightedScore += (problemAnalysis.marketRelevance || 0) * weights.marketRelevance;
        
        return Math.round(Math.min(100, weightedScore));
    }

    scoreMarketUnderstanding(marketAnalysis) {
        if (!marketAnalysis) return 30; // Low base score for missing analysis
        
        // Weighted average with clear weights
        const weights = {
            size: 0.25,
            growth: 0.25,
            accessibility: 0.2,
            timing: 0.15,
            quantification: 0.15
        };
        
        let weightedScore = 0;
        weightedScore += (marketAnalysis.size || 0) * weights.size;
        weightedScore += (marketAnalysis.growth || 0) * weights.growth;
        weightedScore += (marketAnalysis.accessibility || 0) * weights.accessibility;
        weightedScore += (marketAnalysis.timing || 0) * weights.timing;
        weightedScore += (marketAnalysis.quantification || 0) * weights.quantification;
        
        return Math.round(Math.min(100, weightedScore));
    }

    scoreCustomerEmpathy(customerAnalysis) {
        if (!customerAnalysis) return 30; // Low base score for missing analysis
        
        // Weighted average with clear weights
        const weights = {
            depth: 0.3,
            validation: 0.3,
            segmentation: 0.2,
            jobsToBeDone: 0.2
        };
        
        let weightedScore = 0;
        weightedScore += (customerAnalysis.depth || 0) * weights.depth;
        weightedScore += (customerAnalysis.validation || 0) * weights.validation;
        weightedScore += (customerAnalysis.segmentation || 0) * weights.segmentation;
        weightedScore += (customerAnalysis.jobsToBeDone || 0) * weights.jobsToBeDone;
        
        return Math.round(Math.min(100, weightedScore));
    }

    scoreValueQuantification(analysis) {
        let score = 0; // Start from 0, build up based on evidence
        
        // Check for quantified problem impact (0-40 points)
        const problemMetrics = analysis.problemDefinition?.insights?.filter(i =>
            i.includes("metric") || i.includes("quantif")
        ) || [];
        score += Math.min(40, problemMetrics.length * 20);
        
        // Check for market quantification (0-30 points)
        if (analysis.marketOpportunity?.quantification >= 70) {
            score += 30;
        } else if (analysis.marketOpportunity?.quantification >= 50) {
            score += 20;
        } else if (analysis.marketOpportunity?.quantification >= 30) {
            score += 10;
        }
        
        // Check for customer validation metrics (0-30 points)
        if (analysis.customerUnderstanding?.validation >= 70) {
            score += 30;
        } else if (analysis.customerUnderstanding?.validation >= 50) {
            score += 20;
        } else if (analysis.customerUnderstanding?.validation >= 30) {
            score += 10;
        }
        
        return Math.round(Math.min(100, score));
    }

    scoreSolutionDifferentiation(analysis) {
        let score = 0; // Start from 0, build up based on evidence
        
        // Check competitive awareness (0-35 points)
        if (analysis.competitiveLandscape?.awareness >= 70) {
            score += 35;
        } else if (analysis.competitiveLandscape?.awareness >= 50) {
            score += 25;
        } else if (analysis.competitiveLandscape?.awareness >= 30) {
            score += 15;
        } else {
            score += 5;
        }
        
        // Check differentiation clarity (0-35 points)
        if (analysis.competitiveLandscape?.differentiation >= 70) {
            score += 35;
        } else if (analysis.competitiveLandscape?.differentiation >= 50) {
            score += 25;
        } else if (analysis.competitiveLandscape?.differentiation >= 30) {
            score += 15;
        } else {
            score += 5;
        }
        
        // Check solution uniqueness (0-30 points)
        if (analysis.solutionViability?.uniqueness >= 70) {
            score += 30;
        } else if (analysis.solutionViability?.uniqueness >= 50) {
            score += 20;
        } else if (analysis.solutionViability?.uniqueness >= 30) {
            score += 10;
        }
        
        return Math.round(Math.min(100, score));
    }

    // Generate comprehensive feedback for ALL dimensions with pros and cons
    generateComprehensiveFeedback(dimension, score, analysis) {
        // Always generate pros and cons for every dimension
        let pros = [];
        let cons = [];
        let summary = "";
        
        switch(dimension) {
            case "problemClarity":
                // Summary based on score
                if (score >= 85) {
                    summary = "Outstanding problem articulation with clear cause-and-effect understanding";
                } else if (score >= 70) {
                    summary = "Good problem clarity but could benefit from more specific examples";
                } else if (score >= 50) {
                    summary = "Problem is understood but lacks precision and depth";
                } else {
                    summary = "Problem definition is too vague - needs significant clarification";
                }
                
                // Always generate pros
                if (analysis.problemDefinition) {
                    if (analysis.problemDefinition.clarity >= 70) {
                        pros.push("Clear problem articulation");
                    } else if (analysis.problemDefinition.clarity >= 50) {
                        pros.push("Basic problem understanding");
                    } else {
                        pros.push("Problem identification started");
                    }
                    
                    if (analysis.problemDefinition.specificity >= 50) {
                        pros.push("Some target segments identified");
                    }
                    
                    if (analysis.problemDefinition.insights && analysis.problemDefinition.insights.length > 0) {
                        pros.push(analysis.problemDefinition.insights[0]);
                    }
                }
                
                // Always generate cons
                if (analysis.problemDefinition) {
                    if (analysis.problemDefinition.clarity < 70) {
                        cons.push("Problem needs clearer definition");
                    }
                    if (analysis.problemDefinition.specificity < 70) {
                        cons.push("Add more specific personas and scenarios");
                    }
                    if (analysis.problemDefinition.concerns && analysis.problemDefinition.concerns.length > 0) {
                        cons.push(analysis.problemDefinition.concerns[0]);
                    }
                    if (!analysis.problemDefinition.insights || analysis.problemDefinition.insights.length === 0) {
                        cons.push("Include quantifiable impact metrics");
                    }
                }
                break;
                
            case "marketUnderstanding":
                // Summary based on score
                if (score >= 85) {
                    summary = "Exceptional market insight with clear TAM/SAM/SOM understanding";
                } else if (score >= 70) {
                    summary = "Good market awareness but missing some quantification";
                } else if (score >= 50) {
                    summary = "Basic market understanding - needs deeper analysis";
                } else {
                    summary = "Insufficient market research - critical gap for GTM success";
                }
                
                // Always generate pros
                if (analysis.marketOpportunity) {
                    if (analysis.marketOpportunity.size >= 60) {
                        pros.push("Market opportunity identified");
                    }
                    if (analysis.marketOpportunity.growth >= 50) {
                        pros.push("Growth potential recognized");
                    }
                    if (analysis.marketOpportunity.timing >= 60) {
                        pros.push("Good market timing awareness");
                    }
                } else {
                    pros.push("Initial market consideration");
                }
                
                // Always generate cons
                if (!analysis.marketOpportunity || analysis.marketOpportunity.quantification < 70) {
                    cons.push("Need better market quantification (TAM/SAM/SOM)");
                }
                if (!analysis.marketOpportunity || analysis.marketOpportunity.accessibility < 60) {
                    cons.push("Define go-to-market strategy");
                }
                if (!analysis.marketOpportunity || analysis.marketOpportunity.growth < 70) {
                    cons.push("Research market growth trends");
                }
                cons.push("Validate with industry experts");
                break;
                
            case "customerEmpathy":
                // Summary based on score
                if (score >= 85) {
                    summary = "Exceptional customer empathy with validated insights";
                } else if (score >= 70) {
                    summary = "Good customer understanding with room for deeper validation";
                } else if (score >= 50) {
                    summary = "Basic customer knowledge - needs more discovery";
                } else {
                    summary = "Insufficient customer validation - high risk";
                }
                
                // Always generate pros
                if (analysis.customerUnderstanding) {
                    if (analysis.customerUnderstanding.depth >= 60) {
                        pros.push("Customer segments identified");
                    }
                    if (analysis.customerUnderstanding.validation >= 50) {
                        pros.push("Some customer validation done");
                    }
                    if (analysis.customerUnderstanding.segmentation >= 50) {
                        pros.push("Target personas defined");
                    }
                } else {
                    pros.push("Customer focus initiated");
                }
                
                // Always generate cons
                if (!analysis.customerUnderstanding || analysis.customerUnderstanding.validation < 70) {
                    cons.push("Conduct 20+ customer interviews");
                }
                if (!analysis.customerUnderstanding || analysis.customerUnderstanding.jobsToBeDone < 70) {
                    cons.push("Map Jobs-to-be-Done clearly");
                }
                if (!analysis.customerUnderstanding || analysis.customerUnderstanding.depth < 80) {
                    cons.push("Develop detailed buyer personas");
                }
                cons.push("Collect direct customer quotes");
                break;
                
            case "valueQuantification":
                // Summary based on score
                if (score >= 85) {
                    summary = "Excellent quantification with clear ROI metrics";
                } else if (score >= 70) {
                    summary = "Good value articulation but needs more specific metrics";
                } else if (score >= 50) {
                    summary = "Some quantification present - needs comprehensive metrics";
                } else {
                    summary = "Critical gap: must quantify value proposition";
                }
                
                // Always generate pros
                const hasMetrics = analysis.problemDefinition?.insights?.some(i =>
                    i.toLowerCase().includes("metric") || i.toLowerCase().includes("quantif"));
                
                if (hasMetrics) {
                    pros.push("Some metrics provided");
                }
                if (analysis.marketOpportunity?.quantification >= 50) {
                    pros.push("Impact awareness shown");
                }
                if (score >= 30) {
                    pros.push("Value consideration started");
                }
                
                // Always generate cons
                cons.push("Calculate specific ROI metrics");
                cons.push("Add time and cost savings data");
                cons.push("Benchmark against alternatives");
                if (!hasMetrics) {
                    cons.push("Include financial impact numbers");
                }
                break;
                
            case "solutionDifferentiation":
                // Summary based on score
                if (score >= 85) {
                    summary = "Outstanding differentiation with clear competitive advantage";
                } else if (score >= 70) {
                    summary = "Good differentiation understanding with room for refinement";
                } else if (score >= 50) {
                    summary = "Basic differentiation - needs stronger unique value prop";
                } else {
                    summary = "Weak differentiation - high competitive risk";
                }
                
                // Always generate pros
                if (analysis.competitiveLandscape) {
                    if (analysis.competitiveLandscape.awareness >= 60) {
                        pros.push("Competitive landscape considered");
                    }
                    if (analysis.competitiveLandscape.differentiation >= 60) {
                        pros.push("Differentiation points identified");
                    }
                } else {
                    pros.push("Solution thinking initiated");
                }
                if (analysis.solutionViability?.uniqueness >= 50) {
                    pros.push("Unique approach considered");
                }
                
                // Always generate cons
                if (!analysis.competitiveLandscape || analysis.competitiveLandscape.awareness < 80) {
                    cons.push("Analyze top 5 competitors deeply");
                }
                if (!analysis.competitiveLandscape || analysis.competitiveLandscape.differentiation < 80) {
                    cons.push("Clarify unique value proposition");
                }
                cons.push("Define sustainable competitive moat");
                cons.push("Document 'why now' for your solution");
                break;
                
            default:
                summary = `Score: ${Math.round(score)}%`;
                pros.push("Assessment completed");
                cons.push("Review detailed feedback above");
        }
        
        // Build comprehensive feedback string
        let fullFeedback = "";
        
        // Add summary
        if (summary) {
            fullFeedback = summary;
        }
        
        // Always add pros with checkmarks
        if (pros.length > 0) {
            if (fullFeedback) fullFeedback += "\n\n";
            fullFeedback += pros.map(p => `✓ ${p}`).join("\n");
        }
        
        // Always add cons with X marks
        if (cons.length > 0) {
            if (fullFeedback) fullFeedback += "\n";
            fullFeedback += cons.map(c => `✗ ${c}`).join("\n");
        }
        
        return fullFeedback;
    }
    
    // Keep the old method for backward compatibility but redirect to new one
    generateDimensionFeedback(dimension, score, analysis) {
        return this.generateComprehensiveFeedback(dimension, score, analysis);
    }
    
    // Original generateDimensionFeedback method content (now deprecated)
    _generateDimensionFeedbackOld(dimension, score, analysis) {
        const feedback = {
            excellent: score >= 85,
            good: score >= 70,
            developing: score >= 50,
            weak: score < 50
        };
        
        let pros = [];
        let cons = [];
        let message = "";
        
        switch(dimension) {
            case "problemClarity":
                // Analyze pros based on what's present
                if (analysis.problemDefinition) {
                    if (analysis.problemDefinition.clarity >= 70) {
                        pros.push("✓ Clear problem articulation");
                    }
                    if (analysis.problemDefinition.specificity >= 70) {
                        pros.push("✓ Specific target segments identified");
                    }
                    if (analysis.problemDefinition.insights && analysis.problemDefinition.insights.length > 0) {
                        pros.push("✓ " + analysis.problemDefinition.insights[0]);
                    }
                    
                    // Identify cons based on gaps
                    if (analysis.problemDefinition.clarity < 70) {
                        cons.push("✗ Problem needs clearer definition");
                    }
                    if (analysis.problemDefinition.specificity < 50) {
                        cons.push("✗ Too generic - needs specific personas");
                    }
                    if (analysis.problemDefinition.concerns && analysis.problemDefinition.concerns.length > 0) {
                        cons.push("✗ " + analysis.problemDefinition.concerns[0]);
                    }
                }
                
                if (feedback.excellent) {
                    message = "Outstanding problem articulation with clear cause-and-effect understanding";
                } else if (feedback.good) {
                    message = "Good problem clarity but could benefit from more specific examples";
                } else if (feedback.developing) {
                    message = "Problem is understood but lacks precision and depth";
                } else {
                    message = "Problem definition is too vague - needs significant clarification";
                }
                break;
                
            case "marketUnderstanding":
                // Analyze market pros and cons
                if (analysis.marketOpportunity) {
                    if (analysis.marketOpportunity.size >= 70) {
                        pros.push("✓ Large market opportunity identified");
                    }
                    if (analysis.marketOpportunity.growth >= 70) {
                        pros.push("✓ Strong growth indicators");
                    }
                    if (analysis.marketOpportunity.timing >= 80) {
                        pros.push("✓ Excellent market timing");
                    }
                    
                    if (analysis.marketOpportunity.quantification < 50) {
                        cons.push("✗ Needs better market quantification");
                    }
                    if (analysis.marketOpportunity.accessibility < 50) {
                        cons.push("✗ Market accessibility concerns");
                    }
                }
                
                if (feedback.excellent) {
                    message = "Exceptional market insight with clear TAM/SAM/SOM understanding";
                } else if (feedback.good) {
                    message = "Good market awareness but missing some quantification";
                } else if (feedback.developing) {
                    message = "Basic market understanding - needs deeper analysis";
                } else {
                    message = "Insufficient market research - critical gap for GTM success";
                }
                break;
                
            case "customerEmpathy":
                // Customer understanding pros and cons
                if (analysis.customerUnderstanding) {
                    if (analysis.customerUnderstanding.depth >= 70) {
                        pros.push("✓ Deep customer understanding");
                    }
                    if (analysis.customerUnderstanding.validation >= 70) {
                        pros.push("✓ Strong customer validation");
                    }
                    if (analysis.customerUnderstanding.segmentation >= 60) {
                        pros.push("✓ Clear customer segmentation");
                    }
                    
                    if (analysis.customerUnderstanding.validation < 50) {
                        cons.push("✗ Needs more customer interviews");
                    }
                    if (analysis.customerUnderstanding.jobsToBeDone < 60) {
                        cons.push("✗ Jobs-to-be-done not clear");
                    }
                }
                
                if (feedback.excellent) {
                    message = "Exceptional customer empathy with validated insights";
                } else if (feedback.good) {
                    message = "Good customer understanding with room for deeper validation";
                } else if (feedback.developing) {
                    message = "Basic customer knowledge - needs more discovery";
                } else {
                    message = "Insufficient customer validation - high risk";
                }
                break;
                
            case "valueQuantification":
                // Value quantification pros and cons
                const hasMetrics = analysis.problemDefinition?.insights?.some(i =>
                    i.toLowerCase().includes("metric") || i.toLowerCase().includes("quantif"));
                
                if (hasMetrics) {
                    pros.push("✓ Metrics provided");
                }
                if (analysis.marketOpportunity?.quantification >= 70) {
                    pros.push("✓ Impact well quantified");
                }
                
                if (!hasMetrics) {
                    cons.push("✗ Missing financial metrics");
                }
                if (score < 50) {
                    cons.push("✗ ROI not clearly defined");
                    cons.push("✗ Need time/cost savings data");
                }
                
                if (feedback.excellent) {
                    message = "Excellent quantification with clear ROI metrics";
                } else if (feedback.good) {
                    message = "Good value articulation but needs more specific metrics";
                } else if (feedback.developing) {
                    message = "Some quantification present - needs comprehensive metrics";
                } else {
                    message = "Critical gap: must quantify value proposition";
                }
                break;
                
            case "solutionDifferentiation":
                // Solution differentiation pros and cons
                if (analysis.competitiveLandscape) {
                    if (analysis.competitiveLandscape.awareness >= 70) {
                        pros.push("✓ Strong competitive awareness");
                    }
                    if (analysis.competitiveLandscape.differentiation >= 70) {
                        pros.push("✓ Clear differentiation identified");
                    }
                    
                    if (analysis.competitiveLandscape.awareness < 50) {
                        cons.push("✗ Limited competitive knowledge");
                    }
                    if (analysis.competitiveLandscape.differentiation < 50) {
                        cons.push("✗ Differentiation unclear");
                    }
                }
                
                if (feedback.excellent) {
                    message = "Outstanding differentiation with clear competitive advantage";
                } else if (feedback.good) {
                    message = "Good differentiation understanding with room for refinement";
                } else if (feedback.developing) {
                    message = "Basic differentiation - needs stronger unique value prop";
                } else {
                    message = "Weak differentiation - high competitive risk";
                }
                break;
                
            default:
                message = `Score: ${Math.round(score)}% - ${feedback.excellent ? 'Excellent' : feedback.good ? 'Good' : feedback.developing ? 'Developing' : 'Needs Work'}`;
        }
        
        // Always build comprehensive feedback
        let fullFeedback = "";
        
        // Always include the summary message first
        if (message) {
            fullFeedback = message;
        }
        
        // Add pros if available
        if (pros.length > 0) {
            if (fullFeedback) fullFeedback += "\n\n";
            fullFeedback += "Strengths:\n" + pros.join("\n");
        }
        
        // Add cons if available
        if (cons.length > 0) {
            if (fullFeedback) fullFeedback += "\n\n";
            fullFeedback += "Areas for Improvement:\n" + cons.join("\n");
        }
        
        // If still empty, provide default feedback
        if (!fullFeedback) {
            fullFeedback = `Score: ${Math.round(score)}% - ${feedback.excellent ? 'Excellent' : feedback.good ? 'Good' : feedback.developing ? 'Developing' : 'Needs Work'}`;
        }
        
        return fullFeedback;
    }

    // Identify biggest gaps for improvement
    identifyBiggestGaps(scoring) {
        return Object.entries(scoring.dimensional)
            .map(([dimension, data]) => ({
                dimension,
                score: data.score,
                gap: 100 - data.score
            }))
            .sort((a, b) => b.gap - a.gap)
            .slice(0, 5);
    }

    // Generate comprehensive action plan with specific, actionable steps
    generateComprehensiveActionPlan(dimension, analysis, context) {
        const plans = {
            problemClarity: [
                "Schedule 10 customer interviews this week using the '5 Whys' technique to uncover root causes",
                "Document 5 specific scenarios where the problem occurs with exact timestamps and impact metrics",
                "Calculate the exact dollar amount this problem costs your target customers per month",
                "Get 20 prospects to rank this problem in their top 3 priorities with written confirmation"
            ],
            marketUnderstanding: [
                "Calculate your TAM by multiplying total potential customers (with data source) by average deal size",
                "Sign up for your top 5 competitors' products and document their pricing, features, and weaknesses",
                "Identify 3 macro trends (with evidence) that make your solution critical right now vs. later",
                "Interview 5 industry experts/analysts this month to validate your market opportunity thesis"
            ],
            customerEmpathy: [
                "Conduct 20 customer interviews using the Mom Test framework (no leading questions allowed)",
                "Shadow 5 target customers for a full day to observe their actual workflow and pain points",
                "Create 3 data-driven personas with demographics, psychographics, and actual buying behavior",
                "Map the complete buyer journey with all touchpoints, emotions, and decision criteria"
            ],
            valueQuantification: [
                "Build an interactive ROI calculator showing payback period under 12 months for your solution",
                "Document 3 detailed case studies with specific before/after metrics and customer testimonials",
                "Calculate exact time savings (hours/week) and cost savings ($/month) for each persona",
                "Get 5 paying customers to validate and publicly endorse your ROI calculations"
            ],
            solutionDifferentiation: [
                "List 5 unique capabilities that competitors cannot replicate within the next 18 months",
                "Define your contrarian insight that the entire market has missed (with supporting evidence)",
                "Document why your solution is 10x better (not just incrementally better) than alternatives",
                "Create a detailed competitive battlecard showing your sustainable advantages"
            ]
        };
        
        return plans[dimension] || [
            "Define 3-5 specific, measurable success metrics for this improvement area",
            "Create a detailed 30-day action plan with weekly deliverables and owners",
            "Identify and execute 3 quick wins you can complete within 7 days",
            "Set up automated tracking to measure daily/weekly progress against goals"
        ];
    }

    // Keep old method for backward compatibility
    generateDimensionActionPlan(dimension, analysis, context) {
        return this.generateComprehensiveActionPlan(dimension, analysis, context);
    }

    // Generate actionable recommendations instead of resources
    generateActionableRecommendations(dimension, context) {
        const recommendations = {
            problemClarity: [
                "Interview 10 customers this week about their specific pain points",
                "Document the problem in one sentence without using jargon",
                "Calculate how much time/money the problem costs per month",
                "Get 20 prospects to confirm this is their #1 or #2 priority"
            ],
            marketUnderstanding: [
                "Research 10 competitors and document their pricing models",
                "Calculate your TAM using a bottom-up approach with real data",
                "Identify 3 market trends that create urgency for your solution",
                "Talk to 5 industry experts to validate your market thesis"
            ],
            customerEmpathy: [
                "Conduct 20 customer interviews using the Mom Test methodology",
                "Shadow 5 customers for a day to understand their workflow",
                "Create 3 detailed personas based on actual customer data",
                "Map the complete customer journey from awareness to purchase"
            ],
            valueQuantification: [
                "Build an ROI calculator that shows payback in <12 months",
                "Document 3 case studies with specific before/after metrics",
                "Calculate time savings in hours and cost savings in dollars",
                "Get 5 customers to validate your value calculations"
            ],
            solutionDifferentiation: [
                "List 5 capabilities your competitors cannot match",
                "Define your unique insight that others have missed",
                "Document why your approach is 10x better, not 10% better",
                "Create a competitive matrix showing your advantages"
            ]
        };
        
        return recommendations[dimension] || [
            "Define clear success metrics",
            "Create an implementation plan",
            "Track and measure progress weekly"
        ];
    }

    // Estimate timeframe for improvement - REMOVED per requirements
    estimateTimeframe(dimension, context) {
        // Timeframes removed - companies work at their own pace
        return null;
    }

    // Define comprehensive success metrics
    defineComprehensiveSuccessMetrics(dimension, context) {
        const metrics = {
            problemClarity: [
                "20+ customers confirm this is their #1 or #2 priority problem",
                "Problem statement refined to under 50 words with zero jargon",
                "Quantified impact shows >$10K/month cost to target customers",
                "5+ direct customer quotes validate the problem statement"
            ],
            marketUnderstanding: [
                "TAM/SAM/SOM calculated with verifiable data sources cited",
                "Competitive matrix completed for 10+ direct/indirect competitors",
                "3+ market trends validated by industry reports or experts",
                "Go-to-market strategy defined with quarterly milestones"
            ],
            customerEmpathy: [
                "20+ customer interviews completed with recorded insights",
                "3-5 data-driven personas created with actual customer data",
                "Complete journey maps with validated pain points at each stage",
                "Jobs-to-be-Done documented with success criteria for each"
            ],
            valueQuantification: [
                "ROI calculator shows <12 month payback for 80% of prospects",
                "3+ case studies show 3-10x ROI with verified metrics",
                "Time/cost savings validated by 5+ paying customers",
                "Value proposition resonates with 80% of target prospects"
            ],
            solutionDifferentiation: [
                "5+ unique capabilities competitors cannot match identified",
                "Win rate improved by 20%+ against main competitors",
                "Unique value prop validated by 80% of prospects",
                "Defensible moat strategy documented and validated"
            ]
        };
        
        return metrics[dimension] || [
            "Score improved by target amount within 30 days",
            "All action items completed with documented results",
            "Customer validation achieved from target segment",
            "Measurable business impact demonstrated"
        ];
    }

    // Keep old method for backward compatibility
    defineSuccessMetrics(dimension, context) {
        return this.defineComprehensiveSuccessMetrics(dimension, context);
    }

    // DETERMINISTIC MARKET ANALYSIS - CONSISTENT SCORING
    analyzeMarketOpportunity(enrichedData, context) {
        const analysis = {
            size: 0,
            growth: 0,
            accessibility: 0,
            timing: 0,
            quantification: 0
        };
        
        const impactText = enrichedData.raw.impact || "";
        const whenText = enrichedData.raw.when || "";
        
        // DETERMINISTIC SIZE SCORING (0-100)
        if (impactText.match(/\$\d+[BT]/i)) { // Billion or Trillion
            analysis.size = 90;
        } else if (impactText.match(/\$\d+M/i)) { // Million
            analysis.size = 70;
        } else if (impactText.match(/\$\d+K/i)) { // Thousand
            analysis.size = 50;
        } else if (impactText.match(/large|huge|massive|significant/i)) {
            analysis.size = 60;
        } else {
            analysis.size = 30;
        }
        
        // DETERMINISTIC GROWTH SCORING (0-100)
        if (impactText.match(/\d+%\s*(growth|increase|CAGR)/i)) {
            analysis.growth = 80;
        } else if (impactText.match(/growing|increasing|expanding|rising/i)) {
            analysis.growth = 60;
        } else if (impactText.match(/stable|steady|consistent/i)) {
            analysis.growth = 40;
        } else {
            analysis.growth = 30;
        }
        
        // DETERMINISTIC ACCESSIBILITY SCORING (0-100)
        analysis.accessibility = 50; // Base accessibility
        if (impactText.match(/easy|accessible|open|available/i)) {
            analysis.accessibility += 30;
        }
        if (context.stage === "Early Product Market Fit") {
            analysis.accessibility += 20;
        }
        
        // DETERMINISTIC TIMING SCORING (0-100)
        if (whenText.match(/now|immediate|urgent|critical|asap/i)) {
            analysis.timing = 90;
        } else if (whenText.match(/soon|quickly|rapidly|short.?term/i)) {
            analysis.timing = 70;
        } else if (whenText.match(/eventually|long.?term|future/i)) {
            analysis.timing = 40;
        } else {
            analysis.timing = 50;
        }
        
        // DETERMINISTIC QUANTIFICATION SCORING (0-100)
        const impactMetrics = enrichedData.entities.impact?.metrics || [];
        const problemMetrics = enrichedData.entities.problem?.metrics || [];
        const totalMetrics = impactMetrics.length + problemMetrics.length;
        
        if (totalMetrics >= 5) {
            analysis.quantification = 95;  // Exceptional quantification
        } else if (totalMetrics >= 4) {
            analysis.quantification = 85;  // Excellent quantification
        } else if (totalMetrics >= 3) {
            analysis.quantification = 70;  // Good quantification
        } else if (totalMetrics >= 2) {
            analysis.quantification = 50;  // Moderate quantification
        } else if (totalMetrics >= 1) {
            analysis.quantification = 30;  // Basic quantification
        } else {
            analysis.quantification = 10;  // No quantification
        }
        
        // Bonus for financial metrics specifically
        if (impactText.match(/\$\d+[KMB].*\$\d+[KMB]/)) {  // Multiple financial metrics
            analysis.quantification = Math.min(100, analysis.quantification + 15);
        }
        
        return analysis;
    }

    // DETERMINISTIC CUSTOMER ANALYSIS - CONSISTENT SCORING
    analyzeCustomerUnderstanding(enrichedData, context) {
        const analysis = {
            depth: 0,
            validation: 0,
            segmentation: 0,
            jobsToBeDone: 0
        };
        
        const whoText = enrichedData.raw.who || "";
        const evidenceText = enrichedData.raw.evidence || "";
        
        // DETERMINISTIC DEPTH SCORING (0-100)
        if (whoText.length >= 150) {
            analysis.depth = 70;
        } else if (whoText.length >= 100) {
            analysis.depth = 50;
        } else if (whoText.length >= 50) {
            analysis.depth = 30;
        } else {
            analysis.depth = 10;
        }
        
        // Add points for specific details
        if (whoText.match(/\d+.?\d*\s*(employees|people|users|customers)/i)) {
            analysis.depth += 20;
        }
        if (enrichedData.entities.who?.roles?.length > 2) {
            analysis.depth += 10;
        }
        
        // DETERMINISTIC SEGMENTATION SCORING (0-100)
        if (enrichedData.entities.who?.roles?.length >= 3) {
            analysis.segmentation = 80;
        } else if (enrichedData.entities.who?.roles?.length >= 2) {
            analysis.segmentation = 60;
        } else if (enrichedData.entities.who?.roles?.length >= 1) {
            analysis.segmentation = 40;
        } else {
            analysis.segmentation = 20;
        }
        
        // Add for market segments
        if (whoText.match(/B2B|B2C|enterprise|SMB|startup/i)) {
            analysis.segmentation += 20;
        }
        
        // DETERMINISTIC VALIDATION SCORING (0-100)
        // Extract interview numbers deterministically
        const interviewMatch = evidenceText.match(/(\d+)\+?\s*(interview|customer|founder|company|startup)/i);
        if (interviewMatch) {
            const count = parseInt(interviewMatch[1]);
            if (count >= 150) {
                analysis.validation = 95;  // Exceptional validation
            } else if (count >= 100) {
                analysis.validation = 85;  // Excellent validation
            } else if (count >= 50) {
                analysis.validation = 65;  // Good validation (reduced from 70)
            } else if (count >= 20) {
                analysis.validation = 45;  // Moderate validation (reduced from 60)
            } else if (count >= 10) {
                analysis.validation = 35;  // Basic validation (reduced from 50)
            } else {
                analysis.validation = 25;  // Minimal validation (reduced from 40)
            }
        } else if (evidenceText.match(/interview|survey|research|study/i)) {
            analysis.validation = 30;  // Some validation effort
        } else {
            analysis.validation = 10;  // No validation
        }
        
        // Add points for survey data
        if (evidenceText.match(/survey.*\d+/i)) {
            analysis.validation = Math.min(100, analysis.validation + 10);
        }
        
        // Add significant bonus for pilot program results
        if (evidenceText.match(/pilot program|pilot|beta|early customers.*results/i)) {
            if (evidenceText.match(/\d+x|faster|better|improvement/i)) {
                analysis.validation = Math.min(100, analysis.validation + 20);
            }
        }
        
        // DETERMINISTIC JOBS-TO-BE-DONE SCORING (0-100)
        if (enrichedData.raw.problem?.match(/trying to|need to|want to|have to/i)) {
            analysis.jobsToBeDone = 60;
        } else {
            analysis.jobsToBeDone = 30;
        }
        
        // Add points for outcome focus
        if (enrichedData.raw.impact?.match(/outcome|result|achieve|accomplish/i)) {
            analysis.jobsToBeDone += 30;
        }
        
        return analysis;
    }

    analyzeCompetitiveLandscape(enrichedData, context) {
        const analysis = {
            awareness: 0,
            differentiation: 0,
            positioning: 0
        };
        
        const solutionsText = enrichedData.raw.currentSolutions || "";
        
        // DETERMINISTIC COMPETITIVE AWARENESS SCORING
        if (solutionsText.length >= 200) {
            analysis.awareness = 80;  // Comprehensive competitive understanding
        } else if (solutionsText.length >= 100) {
            analysis.awareness = 60;  // Good competitive understanding
        } else if (solutionsText.length >= 50) {
            analysis.awareness = 40;  // Basic competitive understanding
        } else {
            analysis.awareness = 20;  // Limited competitive understanding
        }
        
        // Add points for specific competitor mentions
        if (solutionsText.match(/consultant|agency|software|tool|platform|solution/i)) {
            analysis.awareness += 15;
        }
        
        // Add points for pricing awareness
        if (solutionsText.match(/\$\d+/)) {
            analysis.awareness += 10;
        }
        
        // DETERMINISTIC DIFFERENTIATION SCORING
        if (solutionsText.match(/expensive|slow|inefficient|fragmented|generic/i)) {
            analysis.differentiation = 60;  // Clear problems with alternatives identified
        } else {
            analysis.differentiation = 30;  // Basic differentiation
        }
        
        // Add points for specific differentiation
        if (solutionsText.match(/unlike|different|unique|better|advantage|fail/i)) {
            analysis.differentiation += 20;
        }
        
        // Add points for understanding why alternatives fail
        if (solutionsText.match(/lack|missing|without|don't|cannot|unable/i)) {
            analysis.differentiation += 15;
        }
        
        // Cap scores at 100
        analysis.awareness = Math.min(100, analysis.awareness);
        analysis.differentiation = Math.min(100, analysis.differentiation);
        analysis.positioning = (analysis.awareness + analysis.differentiation) / 2;
        
        return analysis;
    }

    analyzeSolutionViability(enrichedData, context) {
        return {
            feasibility: 60,
            uniqueness: 50,
            scalability: 50
        };
    }

    assessGTMReadiness(enrichedData, context) {
        return {
            messaging: 50,
            targeting: 60,
            channels: 40,
            pricing: 40
        };
    }

    assessCoherence(analysis) {
        // Check if all parts of the analysis align
        let coherenceScore = 70;
        
        if (analysis.problemDefinition.clarity > 60 && analysis.customerUnderstanding.depth > 60) {
            coherenceScore += 10;
        }
        
        if (analysis.marketOpportunity.size > 60 && analysis.solutionViability.scalability > 60) {
            coherenceScore += 10;
        }
        
        return coherenceScore;
    }

    assessInnovation(analysis) {
        return analysis.solutionViability?.uniqueness || 50;
    }

    assessFeasibility(analysis) {
        return analysis.solutionViability?.feasibility || 60;
    }

    assessMarketPosition(analysis, context) {
        const position = {
            strength: "Developing",
            opportunities: [],
            threats: []
        };
        
        if (analysis.competitiveLandscape?.differentiation > 70) {
            position.strength = "Strong";
            position.opportunities.push("Clear differentiation advantage");
        }
        
        if (analysis.marketOpportunity?.timing > 70) {
            position.opportunities.push("Excellent market timing");
        }
        
        if (analysis.competitiveLandscape?.awareness < 50) {
            position.threats.push("Limited competitive awareness");
        }
        
        return position;
    }

    identifyCompetitiveAdvantage(analysis) {
        const advantages = [];
        
        if (analysis.customerUnderstanding?.depth > 80) {
            advantages.push("Deep customer insight");
        }
        
        if (analysis.solutionViability?.uniqueness > 70) {
            advantages.push("Unique solution approach");
        }
        
        if (analysis.marketOpportunity?.timing > 80) {
            advantages.push("First-mover advantage");
        }
        
        return advantages;
    }

    assessGrowthPotential(analysis, context) {
        let potential = "Moderate";
        
        if (analysis.marketOpportunity?.size > 70 && analysis.marketOpportunity?.growth > 70) {
            potential = "High";
        }
        
        if (context.stage === "Early Product Market Fit" && analysis.customerUnderstanding?.validation > 70) {
            potential = "Very High";
        }
        
        return {
            level: potential,
            factors: ["Market size", "Growth rate", "Customer validation"]
        };
    }

    identifyStrategicRisks(analysis, context) {
        const risks = [];
        
        if (analysis.customerUnderstanding?.validation < 50) {
            risks.push({
                risk: "Customer validation gap",
                impact: "High",
                mitigation: "Immediate customer discovery sprint"
            });
        }
        
        if (analysis.competitiveLandscape?.awareness < 50) {
            risks.push({
                risk: "Competitive blind spots",
                impact: "Medium",
                mitigation: "Competitive analysis project"
            });
        }
        
        return risks;
    }

    identifyStrategicOpportunities(analysis, context) {
        const opportunities = [];
        
        if (analysis.marketOpportunity?.growth > 70) {
            opportunities.push({
                opportunity: "High-growth market",
                action: "Aggressive market capture strategy"
            });
        }
        
        if (analysis.customerUnderstanding?.depth > 70) {
            opportunities.push({
                opportunity: "Strong customer insight",
                action: "Product-led growth potential"
            });
        }
        
        return opportunities;
    }

    recommendGTMMotion(analysis, context) {
        if (context.stage === "Pre-Product Market Fit") {
            return "Founder-led sales with heavy discovery focus";
        }
        
        if (analysis.customerUnderstanding?.validation > 70) {
            return "Product-led growth with sales assist";
        }
        
        return "Traditional sales-led with inside sales team";
    }

    recommendPricingStrategy(analysis, context) {
        if (context.industry === "B2B SaaS") {
            return {
                model: "Subscription-based",
                approach: "Value-based pricing",
                recommendation: "Start with 3 tiers, anchor on value metrics"
            };
        }
        
        return {
            model: "License-based",
            approach: "Cost-plus pricing",
            recommendation: "Competitive benchmarking needed"
        };
    }

    recommendChannelStrategy(analysis, context) {
        const channels = [];
        
        if (analysis.customerUnderstanding?.segmentation > 70) {
            channels.push("Direct sales");
        }
        
        if (analysis.marketOpportunity?.size > 80) {
            channels.push("Partner channel");
        }
        
        channels.push("Content marketing", "Product-led acquisition");
        
        return channels;
    }

    performBenchmarking(analysis, context) {
        const industryBenchmarks = this.expertiseDomains.industryKnowledge[context.industry] || 
                                  this.expertiseDomains.industryKnowledge["B2B SaaS"];
        
        return {
            yourScore: this.calculateScore(analysis),
            industryAverage: 65,
            topPerformers: 85,
            benchmarks: industryBenchmarks.benchmarks,
            comparison: "You are performing at industry average level",
            improvementPotential: "20-30 points with focused effort"
        };
    }

    calculateScore(analysis) {
        // Simplified scoring
        let total = 0;
        let count = 0;
        
        if (analysis.problemDefinition) {
            total += analysis.problemDefinition.clarity || 0;
            count++;
        }
        
        if (analysis.marketOpportunity) {
            total += analysis.marketOpportunity.size || 0;
            count++;
        }
        
        if (analysis.customerUnderstanding) {
            total += analysis.customerUnderstanding.depth || 0;
            count++;
        }
        
        return count > 0 ? Math.round(total / count) : 50;
    }

    calculateConfidence(analysis) {
        // Calculate confidence in the analysis
        let confidence = 0.5;
        
        if (analysis.customerUnderstanding?.validation > 60) {
            confidence += 0.2;
        }
        
        if (analysis.marketOpportunity?.quantification > 60) {
            confidence += 0.2;
        }
        
        if (analysis.coherenceScore > 70) {
            confidence += 0.1;
        }
        
        return Math.min(1.0, confidence);
    }

    identifyStrengthsWeaknesses(analysis) {
        return {
            strengths: this.getTopStrengths(analysis),
            weaknesses: this.getTopImprovements(analysis)
        };
    }

    identifyCriticalGaps(analysis) {
        return this.getCriticalGaps(analysis);
    }

    identifyOpportunities(analysis, context) {
        return this.identifyStrategicOpportunities(analysis, context);
    }

    generateNextSteps(analysis, recommendations) {
        // Ensure recommendations is an array
        const recs = Array.isArray(recommendations) ? recommendations : [];
        
        return {
            immediate: recs.filter(r => r.priority === "CRITICAL").map(r => r.actionPlan && r.actionPlan[0] ? r.actionPlan[0] : '').filter(Boolean),
            shortTerm: recs.filter(r => r.priority === "HIGH").map(r => r.actionPlan && r.actionPlan[0] ? r.actionPlan[0] : '').filter(Boolean),
            longTerm: recs.filter(r => r.priority === "MEDIUM").map(r => r.actionPlan && r.actionPlan[0] ? r.actionPlan[0] : '').filter(Boolean)
        };
    }

    provideExpertCommentary(analysis, context) {
        let commentary = "";
        
        if (context.industry === "B2B SaaS") {
            commentary = "For B2B SaaS success, focus on proving ROI quickly. ";
            commentary += "Your current articulation needs stronger financial quantification. ";
            commentary += "Consider implementing a value engineering framework to better communicate impact.";
        } else {
            commentary = "Your problem statement shows promise but needs refinement. ";
            commentary += "Focus on customer validation and competitive differentiation. ";
            commentary += "The market opportunity is there if you can articulate value clearly.";
        }
        
        return commentary;
    }

    recommendResources(analysis, context) {
        // Return empty array - user doesn't want resources, just actionable recommendations
        return [];
    }

    getImprovementArea(analysis) {
        const areas = this.getTopImprovements(analysis);
        return areas[0] || "continuous refinement";
    }
}

// Export for use in the platform
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProblemStatementAgentEnhanced;
}
// Customer Insight Analysis Agent - Evaluates Voice of Customer research quality

// Import the recommendations library
const { getRecommendations } = require('./recommendations-library.js');

class CustomerInsightAgent {
    constructor() {
        this.evaluationDimensions = {
            interviewDepth: {
                weight: 0.20,
                criteria: [
                    'Direct customer quotes captured',
                    'Multiple pain points identified',
                    'Specific examples provided',
                    'Emotional context understood',
                    'Previous solutions documented'
                ]
            },
            customerEmpathy: {
                weight: 0.20,
                criteria: [
                    'Uses customer\'s exact language',
                    'Understands emotional journey',
                    'Recognizes frustrations and anxieties',
                    'Captures aspirations and desires',
                    'Shows genuine understanding'
                ]
            },
            patternRecognition: {
                weight: 0.20,
                criteria: [
                    'Common themes identified',
                    'Recurring pain points noted',
                    'Shared language patterns',
                    'Similar failed solutions',
                    'Consistent success criteria'
                ]
            },
            validationQuality: {
                weight: 0.20,
                criteria: [
                    'Multiple customer perspectives',
                    'Diverse customer segments',
                    'Quantifiable pain points',
                    'Verified through research',
                    'Evidence-based insights'
                ]
            },
            insightSynthesis: {
                weight: 0.20,
                criteria: [
                    'Clear problem articulation',
                    'Actionable insights derived',
                    'Customer needs prioritized',
                    'Solution opportunities identified',
                    'Value proposition alignment'
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
            painStatements: fields.field1,
            customerLanguage: fields.field2,
            emotionalContext: fields.field3,
            previousAttempts: fields.field4,
            successVision: fields.field5,
            keyQuotes: fields.field6
        };
    }

    evaluateDimension(dimension, parsedData) {
        const scores = {
            interviewDepth: this.evaluateInterviewDepth(parsedData),
            customerEmpathy: this.evaluateCustomerEmpathy(parsedData),
            patternRecognition: this.evaluatePatternRecognition(parsedData),
            validationQuality: this.evaluateValidationQuality(parsedData),
            insightSynthesis: this.evaluateInsightSynthesis(parsedData)
        };
        
        return scores[dimension] || 0;
    }

    evaluateInterviewDepth(data) {
        let score = 0;
        
        // Check for direct quotes (looking for quotation marks)
        if (data.painStatements.includes('"') || data.painStatements.includes("'")) {
            score += 25;
        }
        
        // Multiple pain points (looking for multiple sentences or semicolons)
        const painPoints = data.painStatements.split(/[.;]/).filter(p => p.trim().length > 10);
        if (painPoints.length >= 3) {
            score += 20;
        }
        
        // Specific examples in previous attempts
        if (data.previousAttempts.includes('$') || data.previousAttempts.match(/\d+/)) {
            score += 20;
        }
        
        // Emotional context captured
        if (data.emotionalContext.length > 50) {
            score += 20;
        }
        
        // Key quotes section utilized
        if (data.keyQuotes.includes(':') || data.keyQuotes.includes('"')) {
            score += 15;
        }
        
        return Math.min(score, 100);
    }

    evaluateCustomerEmpathy(data) {
        let score = 0;
        
        // Uses customer's exact language
        if (data.customerLanguage.length > 30) {
            score += 25;
        }
        
        // Emotional words present
        const emotionalWords = ['frustrated', 'anxious', 'overwhelmed', 'excited', 'worried', 'stressed', 'confused', 'hopeful'];
        const hasEmotionalWords = emotionalWords.some(word => 
            data.emotionalContext.toLowerCase().includes(word)
        );
        if (hasEmotionalWords) {
            score += 25;
        }
        
        // Success vision in customer's words
        if (data.successVision.includes('"') || data.successVision.includes("'")) {
            score += 20;
        }
        
        // Shows understanding of journey
        if (data.previousAttempts.length > 50) {
            score += 15;
        }
        
        // Multiple perspectives captured
        if (data.keyQuotes.includes('CEO') || data.keyQuotes.includes('Founder') || data.keyQuotes.includes('VP')) {
            score += 15;
        }
        
        return Math.min(score, 100);
    }

    evaluatePatternRecognition(data) {
        let score = 0;
        
        // Common themes in pain statements
        const allText = `${data.painStatements} ${data.customerLanguage} ${data.emotionalContext}`.toLowerCase();
        
        // Look for repeated concepts
        const patterns = ['time', 'cost', 'manual', 'complex', 'slow', 'expensive', 'difficult'];
        const foundPatterns = patterns.filter(p => allText.includes(p));
        if (foundPatterns.length >= 3) {
            score += 30;
        }
        
        // Multiple failed solutions mentioned
        const attempts = data.previousAttempts.split(/[,;.]/).filter(a => a.trim().length > 10);
        if (attempts.length >= 3) {
            score += 25;
        }
        
        // Consistent language patterns
        if (data.customerLanguage.split(',').length >= 5) {
            score += 20;
        }
        
        // Success criteria alignment
        if (data.successVision.includes('clear') || data.successVision.includes('data') || data.successVision.includes('confidence')) {
            score += 25;
        }
        
        return Math.min(score, 100);
    }

    evaluateValidationQuality(data) {
        let score = 0;
        
        // Multiple customer quotes
        const quoteCount = (data.keyQuotes.match(/["']/g) || []).length / 2;
        if (quoteCount >= 2) {
            score += 30;
        }
        
        // Quantifiable metrics mentioned
        if (data.painStatements.includes('$') || data.painStatements.match(/\d+\s*(hours|days|weeks|months|%)/)) {
            score += 25;
        }
        
        // Different customer segments mentioned
        if (data.keyQuotes.includes('Series') || data.keyQuotes.includes('Seed')) {
            score += 20;
        }
        
        // Evidence of research depth
        if (data.previousAttempts.includes('$') && data.previousAttempts.includes('months')) {
            score += 25;
        }
        
        return Math.min(score, 100);
    }

    evaluateInsightSynthesis(data) {
        let score = 0;
        
        // Clear problem articulation
        if (data.painStatements.length > 100) {
            score += 20;
        }
        
        // Actionable insights (success vision)
        if (data.successVision.includes('roadmap') || data.successVision.includes('data') || data.successVision.includes('validation')) {
            score += 25;
        }
        
        // Customer needs prioritized
        if (data.customerLanguage.split(',').length >= 5) {
            score += 20;
        }
        
        // Solution opportunities identified
        if (data.previousAttempts.includes('failed') || data.previousAttempts.includes('didn\'t work')) {
            score += 20;
        }
        
        // Value proposition alignment
        if (data.keyQuotes.length > 100) {
            score += 15;
        }
        
        return Math.min(score, 100);
    }

    generateDimensionFeedback(dimension, score, parsedData) {
        const feedback = {
            interviewDepth: this.generateInterviewDepthFeedback(score, parsedData),
            customerEmpathy: this.generateCustomerEmpathyFeedback(score, parsedData),
            patternRecognition: this.generatePatternRecognitionFeedback(score, parsedData),
            validationQuality: this.generateValidationQualityFeedback(score, parsedData),
            insightSynthesis: this.generateInsightSynthesisFeedback(score, parsedData)
        };
        
        return feedback[dimension] || { strengths: [], improvements: [] };
    }

    generateInterviewDepthFeedback(score, data) {
        const strengths = [];
        const improvements = [];
        
        if (data.painStatements.includes('"') || data.painStatements.includes("'")) {
            strengths.push("Excellent use of direct customer quotes");
        } else {
            improvements.push("Add direct customer quotes to capture authentic voice");
        }
        
        if (data.previousAttempts.length > 100) {
            strengths.push("Comprehensive documentation of previous solution attempts");
        } else {
            improvements.push("Expand on what solutions customers have already tried");
        }
        
        if (data.emotionalContext.length > 50) {
            strengths.push("Good capture of emotional context");
        } else {
            improvements.push("Deeper exploration of customer emotions needed");
        }
        
        // Ensure we always have at least one item in each category
        if (strengths.length === 0) {
            strengths.push("Foundation for customer research established");
        }
        if (improvements.length === 0) {
            improvements.push("Continue expanding interview depth with more customers");
        }
        
        return { strengths, improvements };
    }

    generateCustomerEmpathyFeedback(score, data) {
        const strengths = [];
        const improvements = [];
        
        if (data.customerLanguage.length > 50) {
            strengths.push("Captured customer's actual language and terminology");
        } else {
            improvements.push("Document more of the exact words customers use");
        }
        
        if (data.emotionalContext.includes('frustrated') || data.emotionalContext.includes('anxious')) {
            strengths.push("Strong understanding of customer emotions");
        } else {
            improvements.push("Explore emotional journey more deeply");
        }
        
        if (data.successVision.includes('"')) {
            strengths.push("Success defined in customer's own words");
        } else {
            improvements.push("Capture success vision using customer quotes");
        }
        
        // Ensure we always have at least one item in each category
        if (strengths.length === 0) {
            strengths.push("Initial customer empathy demonstrated");
        }
        if (improvements.length === 0) {
            improvements.push("Deepen emotional understanding through more interviews");
        }
        
        return { strengths, improvements };
    }

    generatePatternRecognitionFeedback(score, data) {
        const strengths = [];
        const improvements = [];
        
        const attempts = data.previousAttempts.split(/[,;.]/).filter(a => a.trim().length > 10);
        if (attempts.length >= 3) {
            strengths.push("Multiple failed solutions documented showing patterns");
        } else {
            improvements.push("Identify more patterns across customer experiences");
        }
        
        if (data.customerLanguage.split(',').length >= 5) {
            strengths.push("Common language patterns identified");
        } else {
            improvements.push("Document recurring phrases and terminology");
        }
        
        // Ensure we always have at least one item in each category
        if (strengths.length === 0) {
            strengths.push("Beginning to identify customer patterns");
        }
        if (improvements.length === 0) {
            improvements.push("Look for more commonalities across customer segments");
        }
        
        return { strengths, improvements };
    }

    generateValidationQualityFeedback(score, data) {
        const strengths = [];
        const improvements = [];
        
        const quoteCount = (data.keyQuotes.match(/["']/g) || []).length / 2;
        if (quoteCount >= 2) {
            strengths.push("Multiple customer perspectives captured");
        } else {
            improvements.push("Include quotes from more diverse customers");
        }
        
        if (data.painStatements.includes('$') || data.painStatements.match(/\d+/)) {
            strengths.push("Quantifiable pain points documented");
        } else {
            improvements.push("Add specific metrics to validate pain severity");
        }
        
        // Ensure we always have at least one item in each category
        if (strengths.length === 0) {
            strengths.push("Customer validation process initiated");
        }
        if (improvements.length === 0) {
            improvements.push("Expand validation to more customer segments");
        }
        
        return { strengths, improvements };
    }

    generateInsightSynthesisFeedback(score, data) {
        const strengths = [];
        const improvements = [];
        
        if (data.successVision.length > 100) {
            strengths.push("Clear articulation of customer success criteria");
        } else {
            improvements.push("Develop clearer synthesis of customer needs");
        }
        
        if (data.previousAttempts.includes('failed') || data.previousAttempts.includes('didn\'t')) {
            strengths.push("Learning from failed solutions documented");
        } else {
            improvements.push("Analyze why previous solutions failed");
        }
        
        // Ensure we always have at least one item in each category
        if (strengths.length === 0) {
            strengths.push("Initial insight synthesis completed");
        }
        if (improvements.length === 0) {
            improvements.push("Derive more actionable insights from customer data");
        }
        
        return { strengths, improvements };
    }

    generateRecommendations(scores, parsedData) {
        const overallScore = Object.entries(scores).reduce((sum, [dim, score]) =>
            sum + score * this.evaluationDimensions[dim].weight, 0);
        
        // Get recommendations from the library
        const libraryRecommendations = getRecommendations('phase1', 'block1', 'voiceOfCustomer', overallScore);
        
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
                    currentState: Math.round(item.score * 0.2), // Convert to 0-20 scale
                    currentPercentage: Math.round(item.score),
                    targetState: Math.min(20, Math.round((item.score + improvement * 5) * 0.2)),
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
                area: "Customer Research Foundation",
                actionPlan: [
                    "Conduct 20 structured customer interviews",
                    "Create customer persona documentation",
                    "Build voice of customer repository",
                    "Establish monthly customer feedback rhythm"
                ],
                impact: `+${strategicImprovement} points`,
                expectedImprovement: strategicImprovement,
                recommendations: [
                    "Schedule 20 customer interviews this week",
                    "Use open-ended questions to avoid bias",
                    "Record and transcribe all interviews",
                    "Create affinity map of pain points"
                ],
                successMetrics: [
                    "20+ customer interviews completed",
                    "3 validated personas created",
                    "Pattern analysis documented"
                ],
                detailedAnalysis: {
                    overview: "Strong customer insight is the foundation of product-market fit. This comprehensive research plan will uncover deep customer needs.",
                    implementation: {
                        phase1: {
                            title: "Interview Planning",
                            tasks: [
                                "Define interview objectives",
                                "Create question guide",
                                "Recruit diverse customers",
                                "Schedule interviews"
                            ]
                        },
                        phase2: {
                            title: "Interview Execution",
                            tasks: [
                                "Conduct 20+ interviews",
                                "Record and transcribe",
                                "Capture exact quotes",
                                "Document pain points"
                            ]
                        },
                        phase3: {
                            title: "Synthesis & Insights",
                            tasks: [
                                "Identify patterns",
                                "Create affinity maps",
                                "Build personas",
                                "Share findings"
                            ]
                        }
                    },
                    roi: "Companies with strong customer insight achieve product-market fit 2x faster and have 30% higher retention."
                }
            });
        }
        
        return recommendations.slice(0, 5); // Return top 5 recommendations
    }
    
    // New method: Format dimension name properly
    formatDimensionName(dimension) {
        const map = {
            'interviewDepth': 'Interview Depth',
            'customerEmpathy': 'Customer Empathy',
            'patternRecognition': 'Pattern Recognition',
            'validationQuality': 'Validation Quality',
            'insightSynthesis': 'Insight Synthesis'
        };
        return map[dimension] || dimension;
    }
    
    // New method: Generate action plan (replacing generateSpecificSteps)
    generateDimensionActionPlan(dimension, currentScore, parsedData) {
        const plans = {
            interviewDepth: [
                "Conduct 10 more structured customer interviews",
                "Record exact quotes using customer's language",
                "Document specific examples and stories",
                "Capture emotional context and frustrations"
            ],
            customerEmpathy: [
                "Create empathy maps for each persona",
                "Shadow customers during problem experience",
                "Document emotional journey mapping",
                "Validate understanding with customers"
            ],
            patternRecognition: [
                "Build affinity diagram of pain points",
                "Identify top 3 recurring patterns",
                "Create pattern validation survey",
                "Test patterns with new customers"
            ],
            validationQuality: [
                "Quantify problem impact in time/money",
                "Interview diverse customer segments",
                "Create validation scorecard",
                "Test willingness to pay"
            ],
            insightSynthesis: [
                "Create one-page problem synthesis",
                "Build customer journey map",
                "Prioritize insights by impact",
                "Generate 'How Might We' statements"
            ]
        };
        
        return plans[dimension] || [
            "Conduct more customer research",
            "Document findings systematically",
            "Identify patterns and themes",
            "Validate with additional customers"
        ];
    }
    
    // New method: Generate actionable recommendations
    generateActionableRecommendations(dimension) {
        const recommendations = {
            interviewDepth: [
                "Conduct 10 more 60-minute customer interviews",
                "Ask 'why' 5 times to get to root causes",
                "Record exact quotes, not paraphrases",
                "Document specific examples with context"
            ],
            customerEmpathy: [
                "Shadow 5 customers for a full day",
                "Map emotional journey with actual quotes",
                "Identify top 3 emotional triggers",
                "Validate empathy maps with customers"
            ],
            patternRecognition: [
                "Create affinity diagram from all interviews",
                "Identify patterns that appear 3+ times",
                "Test patterns with 10 new customers",
                "Document pattern frequency and impact"
            ],
            validationQuality: [
                "Interview 10 customers from each segment",
                "Quantify problem impact in time and money",
                "Run statistical significance tests",
                "Get written validation from 30+ customers"
            ],
            insightSynthesis: [
                "Create one-page problem synthesis",
                "Generate 10 'How Might We' statements",
                "Prioritize insights by customer impact",
                "Build action plan from top 3 insights"
            ]
        };
        
        return recommendations[dimension] || [
            "Conduct more customer research",
            "Document findings systematically",
            "Validate with additional customers"
        ];
    }
    
    // New method: Define success metrics
    defineSuccessMetrics(dimension) {
        const metrics = {
            interviewDepth: [
                "20+ customer interviews completed",
                "100+ direct quotes captured",
                "All pain points quantified"
            ],
            customerEmpathy: [
                "Empathy maps for all personas",
                "90% customer validation of understanding",
                "Emotional drivers documented"
            ],
            patternRecognition: [
                "3+ validated patterns identified",
                "80% pattern occurrence rate",
                "Pattern validation from 10+ customers"
            ],
            validationQuality: [
                "Problem validated with 30+ customers",
                "Quantified impact for all segments",
                "Statistical significance achieved"
            ],
            insightSynthesis: [
                "Clear problem statement defined",
                "Insights prioritized by impact",
                "Action plan created from insights"
            ]
        };
        
        return metrics[dimension] || [
            "Dimension improvement achieved",
            "Customer validation obtained",
            "Actionable insights generated"
        ];
    }
    
    // New method: Generate detailed recommendation analysis
    generateDetailedRecommendationAnalysis(dimension, currentScore, improvement, priority, parsedData) {
        const detailedPlans = {
            interviewDepth: {
                overview: "Deep customer interviews reveal the nuanced reality of customer problems. This plan will help you capture authentic voice of customer.",
                implementation: {
                    phase1: {
                        title: "Interview Preparation",
                        tasks: [
                            "Create structured interview guide",
                            "Recruit diverse customer sample",
                            "Set up recording equipment",
                            "Practice active listening"
                        ]
                    },
                    phase2: {
                        title: "Interview Execution",
                        tasks: [
                            "Conduct 60-minute interviews",
                            "Ask open-ended questions",
                            "Capture exact quotes",
                            "Document non-verbal cues"
                        ]
                    },
                    phase3: {
                        title: "Interview Analysis",
                        tasks: [
                            "Transcribe all interviews",
                            "Code for themes",
                            "Extract key quotes",
                            "Identify patterns"
                        ]
                    }
                },
                recommendations: [
                    "Schedule 20 interviews this week",
                    "Use open-ended questions only",
                    "Record and transcribe everything",
                    "Extract 5+ quotes per pain point"
                ],
                risks: [
                    "Leading questions bias",
                    "Small sample size",
                    "Confirmation bias",
                    "Surface-level responses"
                ],
                successMetrics: [
                    "20+ interviews completed",
                    "5+ quotes per pain point",
                    "Patterns validated",
                    "Insights documented"
                ],
                roi: "Deep interviews reduce product failure risk by 40% and accelerate problem-solution fit."
            },
            customerEmpathy: {
                overview: "True empathy means feeling what customers feel. This plan helps you step into their shoes and understand their emotional journey.",
                implementation: {
                    phase1: {
                        title: "Empathy Research",
                        tasks: [
                            "Map emotional journey",
                            "Identify trigger moments",
                            "Document frustrations",
                            "Understand aspirations"
                        ]
                    },
                    phase2: {
                        title: "Empathy Validation",
                        tasks: [
                            "Share empathy maps with customers",
                            "Validate emotional understanding",
                            "Refine based on feedback",
                            "Document corrections"
                        ]
                    },
                    phase3: {
                        title: "Empathy Application",
                        tasks: [
                            "Create customer personas",
                            "Build journey maps",
                            "Design with empathy",
                            "Test solutions"
                        ]
                    }
                },
                recommendations: [
                    "Shadow 5 customers in their environment",
                    "Document emotional triggers and reactions",
                    "Create empathy maps for each persona",
                    "Validate understanding with customers"
                ],
                risks: [
                    "Projection of own feelings",
                    "Stereotyping",
                    "Missing edge cases",
                    "Empathy fatigue"
                ],
                successMetrics: [
                    "Empathy maps created",
                    "Customer validation > 90%",
                    "Emotional drivers clear",
                    "Team alignment achieved"
                ],
                roi: "High customer empathy increases product adoption by 35% and reduces churn by 25%."
            },
            patternRecognition: {
                overview: "Patterns reveal the systematic nature of problems. This plan helps you identify and validate recurring themes across customers.",
                implementation: {
                    phase1: {
                        title: "Pattern Discovery",
                        tasks: [
                            "Code interview data",
                            "Create affinity diagrams",
                            "Identify recurring themes",
                            "Document frequency"
                        ]
                    },
                    phase2: {
                        title: "Pattern Validation",
                        tasks: [
                            "Test patterns with new customers",
                            "Quantify pattern occurrence",
                            "Identify exceptions",
                            "Refine pattern definitions"
                        ]
                    },
                    phase3: {
                        title: "Pattern Application",
                        tasks: [
                            "Prioritize by frequency",
                            "Map to solutions",
                            "Create pattern library",
                            "Share with team"
                        ]
                    }
                },
                recommendations: [
                    "Code all interview data for themes",
                    "Create affinity diagram on wall/Miro",
                    "Identify top 5 recurring patterns",
                    "Validate patterns with new customers"
                ],
                risks: [
                    "False patterns",
                    "Overgeneralization",
                    "Missing nuance",
                    "Sample bias"
                ],
                successMetrics: [
                    "3+ patterns validated",
                    "80% occurrence rate",
                    "Pattern library created",
                    "Team understanding"
                ],
                roi: "Strong pattern recognition reduces development waste by 30% and improves solution fit."
            },
            validationQuality: {
                overview: "Validation transforms assumptions into facts. This plan ensures your insights are backed by robust evidence.",
                implementation: {
                    phase1: {
                        title: "Validation Planning",
                        tasks: [
                            "Define validation criteria",
                            "Design experiments",
                            "Set success metrics",
                            "Recruit participants"
                        ]
                    },
                    phase2: {
                        title: "Validation Execution",
                        tasks: [
                            "Run validation tests",
                            "Collect quantitative data",
                            "Document evidence",
                            "Track metrics"
                        ]
                    },
                    phase3: {
                        title: "Validation Analysis",
                        tasks: [
                            "Analyze results",
                            "Test significance",
                            "Document findings",
                            "Make decisions"
                        ]
                    }
                },
                recommendations: [
                    "Define clear validation criteria",
                    "Test with 30+ diverse customers",
                    "Calculate statistical significance",
                    "Document all validation evidence"
                ],
                risks: [
                    "Small sample size",
                    "Selection bias",
                    "False positives",
                    "Misinterpretation"
                ],
                successMetrics: [
                    "30+ customers validated",
                    "Statistical significance",
                    "Clear evidence",
                    "Decision confidence"
                ],
                roi: "Proper validation reduces pivot risk by 50% and increases investor confidence."
            },
            insightSynthesis: {
                overview: "Synthesis transforms data into decisions. This plan helps you extract actionable insights from customer research.",
                implementation: {
                    phase1: {
                        title: "Data Organization",
                        tasks: [
                            "Compile all research",
                            "Organize by theme",
                            "Create data repository",
                            "Tag and categorize"
                        ]
                    },
                    phase2: {
                        title: "Insight Generation",
                        tasks: [
                            "Identify key themes",
                            "Extract insights",
                            "Prioritize by impact",
                            "Create insight cards"
                        ]
                    },
                    phase3: {
                        title: "Insight Application",
                        tasks: [
                            "Generate solutions",
                            "Create action plan",
                            "Assign ownership",
                            "Track progress"
                        ]
                    }
                },
                recommendations: [
                    "Compile all research into one place",
                    "Extract top 10 actionable insights",
                    "Prioritize by impact and feasibility",
                    "Create specific action plan"
                ],
                risks: [
                    "Analysis paralysis",
                    "Cherry-picking data",
                    "Missing connections",
                    "Delayed action"
                ],
                successMetrics: [
                    "Clear insights documented",
                    "Insights prioritized",
                    "Action plan created",
                    "Progress tracked"
                ],
                roi: "Effective synthesis accelerates decision-making by 40% and improves solution quality."
            }
        };
        
        const plan = detailedPlans[dimension] || {
            overview: `Improving ${this.formatDimensionName(dimension)} will strengthen your customer understanding.`,
            implementation: {
                phase1: {
                    title: "Assessment",
                    tasks: ["Review current state", "Identify gaps", "Set goals", "Plan approach"]
                },
                phase2: {
                    title: "Execution",
                    tasks: ["Implement plan", "Collect data", "Document findings", "Iterate"]
                },
                phase3: {
                    title: "Optimization",
                    tasks: ["Analyze results", "Refine approach", "Scale success", "Share learnings"]
                }
            },
            recommendations: ["Conduct assessment", "Set clear goals", "Track progress weekly"],
            risks: ["Execution challenges", "Resource constraints", "Timeline delays"],
            successMetrics: [`${dimension} improved by ${improvement} points`],
            roi: "Expected improvement in customer understanding and product-market fit."
        };
        
        return plan;
    }
    

    analyzeWorksheet(worksheetData) {
        console.log('🔍 Customer Insight Agent: Starting analysis...');
        
        const parsedData = this.parseWorksheetData(worksheetData);
        console.log('📋 Parsed customer insight data');
        
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
        const baselineScore = 20; // Assume starting from scratch
        const improvement = Math.max(0, overallScore - baselineScore);
        
        console.log(`✅ Customer Insight Analysis complete: ${Math.round(overallScore)}%`);
        
        // Format detailed scores for display
        const detailedScores = {};
        for (const dimension in scores) {
            detailedScores[dimension] = {
                score: Math.round(scores[dimension] * 0.2), // Convert to 0-20 scale
                maxScore: 20,
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
        const hasQuotes = parsedData.painStatements.includes('"') || parsedData.keyQuotes.includes('"');
        const hasMetrics = parsedData.painStatements.includes('$') || parsedData.painStatements.match(/\d+/);
        
        if (overallScore >= 80) {
            return `Excellent customer insight with ${hasQuotes ? 'authentic voice captured' : 'strong understanding'}. Your research shows deep empathy and clear patterns. Ready to move to solution validation.`;
        } else if (overallScore >= 60) {
            return `Good foundation of customer understanding. ${hasMetrics ? 'Quantified pain points help validate severity.' : 'Consider adding metrics to strengthen validation.'} Continue interviewing to identify stronger patterns.`;
        } else if (overallScore >= 40) {
            return `Initial customer research shows promise. ${hasQuotes ? 'Good use of customer quotes.' : 'Capture more direct quotes.'} Expand your interview base and dig deeper into emotional drivers.`;
        } else {
            return `Customer insight needs significant development. Focus on conducting structured interviews, capturing exact customer language, and identifying patterns across multiple customers.`;
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

module.exports = CustomerInsightAgent;
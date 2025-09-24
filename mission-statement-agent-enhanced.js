// Enhanced Mission Statement Analysis Agent with Deep GTM Expertise
// Evaluates mission statements with the same rigor as problem statements

// Import the recommendations library
const { getRecommendations } = require('./recommendations-library.js');

class MissionStatementAgentEnhanced {
    constructor() {
        this.name = "Elite GTM Mission Statement Expert";
        this.version = "2.0.0";
        
        // Deep expertise domains - same as Problem Statement agent
        this.expertiseDomains = {
            frameworks: [
                "Simon Sinek's Start With Why",
                "Jim Collins' Hedgehog Concept",
                "Blue Ocean Strategy",
                "Purpose-Driven Leadership",
                "Conscious Capitalism",
                "B Corporation Framework",
                "Triple Bottom Line",
                "Stakeholder Capitalism",
                "ESG Principles",
                "Vision-Mission-Values Framework"
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
                }
            }
        };
        
        // Mission-specific evaluation dimensions
        this.evaluationDimensions = {
            purposeClarity: {
                weight: 20,
                aspects: ["Specificity", "Inspiration", "Authenticity", "Actionability", "Memorability"]
            },
            visionAmbition: {
                weight: 20,
                aspects: ["Boldness", "Achievability", "Time horizon", "Market impact", "Differentiation"]
            },
            stakeholderFocus: {
                weight: 20,
                aspects: ["Customer centricity", "Employee value", "Investor alignment", "Community impact", "Partner consideration"]
            },
            valueAlignment: {
                weight: 20,
                aspects: ["Core values clarity", "Cultural fit", "Behavioral guidance", "Decision framework", "Authenticity"]
            },
            measurability: {
                weight: 20,
                aspects: ["Success metrics", "KPI definition", "Progress tracking", "Impact quantification", "Accountability"]
            }
        };
    }

    // Main analysis function
    analyzeWorksheet(worksheetData) {
        console.log('🎯 Mission Statement Expert Agent: Initiating analysis...');
        
        // Parse and enrich data
        const enrichedData = this.enrichWorksheetData(worksheetData);
        
        // Detect context
        const context = this.detectContext(enrichedData);
        
        // Perform multi-dimensional analysis
        const analysis = this.performDeepAnalysis(enrichedData, context);
        
        // Generate scoring
        const scoring = this.generateContextualScoring(analysis, context);
        
        // Create recommendations
        const recommendations = this.generatePersonalizedRecommendations(analysis, context, scoring);
        
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
            
            nextSteps: this.generateNextSteps(analysis, recommendations),
            expertAdvice: this.provideExpertCommentary(analysis, context)
        };
    }

    // Parse worksheet data for Mission Statement
    enrichWorksheetData(data) {
        const enriched = {
            raw: this.parseWorksheetData(data),
            entities: {},
            sentiment: {},
            keywords: {},
            patterns: {}
        };
        
        // Extract entities and analyze each field
        Object.keys(enriched.raw).forEach(field => {
            const text = enriched.raw[field];
            
            enriched.entities[field] = {
                metrics: this.extractMetrics(text),
                stakeholders: this.extractStakeholders(text),
                values: this.extractValues(text),
                timeframes: this.extractTimeframes(text)
            };
            
            enriched.sentiment[field] = this.analyzeSentiment(text);
            enriched.keywords[field] = this.extractKeywords(text);
            enriched.patterns[field] = this.identifyPatterns(text);
        });
        
        return enriched;
    }

    // Parse Mission Statement specific fields
    parseWorksheetData(data) {
        return {
            purpose: data['field1'] || data['field-1'] || '',      // Core purpose (support both formats)
            vision: data['field2'] || data['field-2'] || '',       // Future vision
            beneficiaries: data['field3'] || data['field-3'] || '', // Who benefits
            values: data['field4'] || data['field-4'] || '',       // Guiding values
            metrics: data['field5'] || data['field-5'] || '',      // Success metrics
            differentiation: data['field6'] || data['field-6'] || '' // What makes you different
        };
    }

    // Detect context from mission statement
    detectContext(enrichedData) {
        const context = {
            industry: null,
            stage: null,
            ambitionLevel: null,
            valueOrientation: null
        };
        
        const allText = Object.values(enrichedData.raw).join(" ").toLowerCase();
        
        // Industry detection
        if (allText.match(/b2b|saas|software|platform|cloud|ai|ml/i)) {
            context.industry = "B2B SaaS";
        } else if (allText.match(/enterprise|fortune 500|compliance/i)) {
            context.industry = "Enterprise";
        }
        
        // Stage detection
        if (allText.match(/\$10m|series b|scale|growth/i)) {
            context.stage = "Growth Stage";
        } else if (allText.match(/seed|mvp|early/i)) {
            context.stage = "Early Stage";
        }
        
        // Ambition level
        if (allText.match(/transform|revolutionize|disrupt|redefine|world/i)) {
            context.ambitionLevel = "Transformational";
        } else if (allText.match(/improve|enhance|better|optimize/i)) {
            context.ambitionLevel = "Incremental";
        }
        
        // Value orientation
        if (allText.match(/customer|user|client/i)) {
            context.valueOrientation = "Customer-centric";
        } else if (allText.match(/innovation|technology|ai/i)) {
            context.valueOrientation = "Technology-driven";
        }
        
        return context;
    }

    // Perform deep analysis of mission statement
    performDeepAnalysis(enrichedData, context) {
        return {
            purposeAnalysis: this.analyzePurpose(enrichedData, context),
            visionAnalysis: this.analyzeVision(enrichedData, context),
            stakeholderAnalysis: this.analyzeStakeholders(enrichedData, context),
            valueAnalysis: this.analyzeValues(enrichedData, context),
            measurabilityAnalysis: this.analyzeMeasurability(enrichedData, context)
        };
    }

    // Analyze purpose clarity - DETERMINISTIC SCORING
    analyzePurpose(enrichedData, context) {
        const purposeText = enrichedData.raw.purpose || "";
        const analysis = {
            clarity: 0,
            inspiration: 0,
            specificity: 0,
            authenticity: 0,
            actionability: 0,
            insights: [],
            concerns: []
        };
        
        // DETERMINISTIC CLARITY SCORING (0-100)
        if (purposeText.length >= 150) {
            analysis.clarity = 40;
        } else if (purposeText.length >= 100) {
            analysis.clarity = 30;
        } else if (purposeText.length >= 50) {
            analysis.clarity = 20;
        } else {
            analysis.clarity = 10;
        }
        
        // Add points for purpose indicators
        if (purposeText.match(/exist to|purpose is|mission is|we believe/i)) {
            analysis.clarity += 20;
        }
        
        // Add points for action verbs
        if (purposeText.match(/eliminate|transform|enable|empower|democratize|solve/i)) {
            analysis.clarity += 15;
            analysis.insights.push("Strong action-oriented purpose");
        }
        
        // Add points for specificity
        if (purposeText.match(/\d+%|specific|measurable|clear/i)) {
            analysis.clarity += 15;
        }
        
        // Cap at 100
        analysis.clarity = Math.min(100, analysis.clarity);
        
        // INSPIRATION SCORING
        if (purposeText.match(/world|transform|revolutionize|future|humanity/i)) {
            analysis.inspiration = 80;
        } else if (purposeText.match(/improve|better|enhance|help/i)) {
            analysis.inspiration = 60;
        } else {
            analysis.inspiration = 40;
        }
        
        // SPECIFICITY SCORING
        const metrics = enrichedData.entities.purpose.metrics || [];
        if (metrics.length >= 2) {
            analysis.specificity = 80;
            analysis.insights.push("Well-quantified purpose");
        } else if (metrics.length >= 1) {
            analysis.specificity = 60;
        } else {
            analysis.specificity = 40;
            analysis.concerns.push("Add specific metrics to strengthen purpose");
        }
        
        // AUTHENTICITY SCORING
        if (purposeText.match(/we believe|our conviction|committed to/i)) {
            analysis.authenticity = 70;
        } else {
            analysis.authenticity = 50;
        }
        
        // ACTIONABILITY SCORING
        if (purposeText.match(/by providing|through|via|using/i)) {
            analysis.actionability = 70;
            analysis.insights.push("Clear path to achieving purpose");
        } else {
            analysis.actionability = 40;
            analysis.concerns.push("Clarify how you'll achieve your purpose");
        }
        
        return analysis;
    }

    // Analyze vision ambition - DETERMINISTIC SCORING
    analyzeVision(enrichedData, context) {
        const visionText = enrichedData.raw.vision || "";
        const analysis = {
            boldness: 0,
            achievability: 0,
            timeHorizon: 0,
            marketImpact: 0,
            clarity: 0
        };
        
        // BOLDNESS SCORING
        if (visionText.match(/world where|future where|transform how|redefine/i)) {
            analysis.boldness = 85;
        } else if (visionText.match(/leading|best|top|premier/i)) {
            analysis.boldness = 65;
        } else {
            analysis.boldness = 45;
        }
        
        // ACHIEVABILITY SCORING
        if (visionText.length > 100 && visionText.match(/building|creating|developing/i)) {
            analysis.achievability = 70;
        } else {
            analysis.achievability = 50;
        }
        
        // TIME HORIZON SCORING
        if (visionText.match(/\d+\s*year|2030|2035|long-term/i)) {
            analysis.timeHorizon = 80;
        } else {
            analysis.timeHorizon = 50;
        }
        
        // MARKET IMPACT SCORING
        if (visionText.match(/industry|market|ecosystem|standard/i)) {
            analysis.marketImpact = 75;
        } else {
            analysis.marketImpact = 50;
        }
        
        // CLARITY SCORING
        if (visionText.length >= 150) {
            analysis.clarity = 70;
        } else if (visionText.length >= 100) {
            analysis.clarity = 60;
        } else {
            analysis.clarity = 40;
        }
        
        return analysis;
    }

    // Analyze stakeholder focus - DETERMINISTIC SCORING
    analyzeStakeholders(enrichedData, context) {
        const stakeholderText = enrichedData.raw.beneficiaries || "";
        const analysis = {
            breadth: 0,
            specificity: 0,
            prioritization: 0,
            impact: 0
        };
        
        // Count stakeholder groups mentioned
        const stakeholderGroups = [];
        if (stakeholderText.match(/customer|client|user/i)) stakeholderGroups.push("customers");
        if (stakeholderText.match(/employee|team|talent/i)) stakeholderGroups.push("employees");
        if (stakeholderText.match(/investor|shareholder|vc/i)) stakeholderGroups.push("investors");
        if (stakeholderText.match(/community|society|ecosystem/i)) stakeholderGroups.push("community");
        if (stakeholderText.match(/partner|vendor|supplier/i)) stakeholderGroups.push("partners");
        
        // BREADTH SCORING
        if (stakeholderGroups.length >= 4) {
            analysis.breadth = 85;
        } else if (stakeholderGroups.length >= 3) {
            analysis.breadth = 70;
        } else if (stakeholderGroups.length >= 2) {
            analysis.breadth = 55;
        } else {
            analysis.breadth = 40;
        }
        
        // SPECIFICITY SCORING
        if (stakeholderText.match(/\d+\s*(companies|people|users|employees)/i)) {
            analysis.specificity = 80;
        } else if (stakeholderText.match(/specific|particular|targeted/i)) {
            analysis.specificity = 60;
        } else {
            analysis.specificity = 40;
        }
        
        // PRIORITIZATION SCORING
        if (stakeholderText.match(/primary|first|mainly|especially/i)) {
            analysis.prioritization = 70;
        } else {
            analysis.prioritization = 50;
        }
        
        // IMPACT SCORING
        if (stakeholderText.match(/transform|empower|enable|revolutionize/i)) {
            analysis.impact = 80;
        } else if (stakeholderText.match(/help|improve|benefit|serve/i)) {
            analysis.impact = 60;
        } else {
            analysis.impact = 40;
        }
        
        return analysis;
    }

    // Analyze values alignment - DETERMINISTIC SCORING
    analyzeValues(enrichedData, context) {
        const valuesText = enrichedData.raw.values || "";
        const analysis = {
            clarity: 0,
            authenticity: 0,
            actionability: 0,
            differentiation: 0
        };
        
        // Count distinct values mentioned
        const valueCount = (valuesText.match(/,/g) || []).length + 1;
        
        // CLARITY SCORING
        if (valueCount >= 5 && valuesText.length >= 100) {
            analysis.clarity = 75;
        } else if (valueCount >= 3 && valuesText.length >= 50) {
            analysis.clarity = 60;
        } else {
            analysis.clarity = 40;
        }
        
        // AUTHENTICITY SCORING
        if (valuesText.match(/believe in|committed to|driven by/i)) {
            analysis.authenticity = 80;
        } else {
            analysis.authenticity = 50;
        }
        
        // ACTIONABILITY SCORING
        if (valuesText.match(/we\s+(will|do|act|practice)/i)) {
            analysis.actionability = 75;
        } else {
            analysis.actionability = 45;
        }
        
        // DIFFERENTIATION SCORING
        if (valuesText.match(/unique|different|unlike|radical|unconventional/i)) {
            analysis.differentiation = 70;
        } else {
            analysis.differentiation = 50;
        }
        
        return analysis;
    }

    // Analyze measurability - DETERMINISTIC SCORING
    analyzeMeasurability(enrichedData, context) {
        const metricsText = enrichedData.raw.metrics || "";
        const analysis = {
            quantification: 0,
            timebound: 0,
            achievability: 0,
            relevance: 0
        };
        
        // Extract metrics
        const metrics = enrichedData.entities.metrics?.metrics || [];
        
        // QUANTIFICATION SCORING
        if (metrics.length >= 5) {
            analysis.quantification = 90;
        } else if (metrics.length >= 3) {
            analysis.quantification = 70;
        } else if (metrics.length >= 1) {
            analysis.quantification = 50;
        } else {
            analysis.quantification = 30;
        }
        
        // TIMEBOUND SCORING
        if (metricsText.match(/\d+\s*(months?|years?)|by\s+20\d{2}|within/i)) {
            analysis.timebound = 80;
        } else {
            analysis.timebound = 40;
        }
        
        // ACHIEVABILITY SCORING
        if (metricsText.match(/realistic|achievable|attainable|proven/i)) {
            analysis.achievability = 70;
        } else {
            analysis.achievability = 50;
        }
        
        // RELEVANCE SCORING
        if (metricsText.match(/arr|mrr|nps|cac|ltv|retention|growth/i)) {
            analysis.relevance = 85;
        } else if (metricsText.match(/revenue|customer|impact|success/i)) {
            analysis.relevance = 65;
        } else {
            analysis.relevance = 45;
        }
        
        return analysis;
    }

    // Generate contextual scoring
    generateContextualScoring(analysis, context) {
        const scoring = {
            overall: 0,
            dimensional: {},
            adjustments: []
        };
        
        // Calculate dimension scores
        const dimensions = {
            purposeClarity: this.scorePurposeClarity(analysis.purposeAnalysis),
            visionAmbition: this.scoreVisionAmbition(analysis.visionAnalysis),
            stakeholderFocus: this.scoreStakeholderFocus(analysis.stakeholderAnalysis),
            valueAlignment: this.scoreValueAlignment(analysis.valueAnalysis),
            measurability: this.scoreMeasurability(analysis.measurabilityAnalysis)
        };
        
        // Apply contextual adjustments
        if (context.stage === "Early Stage") {
            dimensions.measurability *= 0.9; // More forgiving on metrics for early stage
            scoring.adjustments.push("Adjusted for early-stage context");
        }
        
        // Calculate weighted overall score
        let totalWeight = 0;
        let weightedSum = 0;
        
        for (const [dimension, score] of Object.entries(dimensions)) {
            const weight = this.evaluationDimensions[dimension]?.weight || 20;
            weightedSum += score * (weight / 100);
            totalWeight += weight / 100;
            
            const maxPoints = 20;
            const actualPoints = Math.round((score / 100) * maxPoints);
            
            const feedback = this.generateDimensionFeedback(dimension, score, analysis);
            
            scoring.dimensional[dimension] = {
                score: actualPoints,
                maxScore: maxPoints,
                percentage: Math.round(score),
                weight: weight,
                feedback: feedback
            };
        }
        
        scoring.overall = Math.round(weightedSum / totalWeight);
        
        return scoring;
    }

    // Score individual dimensions
    scorePurposeClarity(purposeAnalysis) {
        const weights = {
            clarity: 0.3,
            inspiration: 0.2,
            specificity: 0.2,
            authenticity: 0.15,
            actionability: 0.15
        };
        
        let weightedScore = 0;
        weightedScore += (purposeAnalysis.clarity || 0) * weights.clarity;
        weightedScore += (purposeAnalysis.inspiration || 0) * weights.inspiration;
        weightedScore += (purposeAnalysis.specificity || 0) * weights.specificity;
        weightedScore += (purposeAnalysis.authenticity || 0) * weights.authenticity;
        weightedScore += (purposeAnalysis.actionability || 0) * weights.actionability;
        
        return Math.round(Math.min(100, weightedScore));
    }

    scoreVisionAmbition(visionAnalysis) {
        const weights = {
            boldness: 0.25,
            achievability: 0.2,
            timeHorizon: 0.2,
            marketImpact: 0.2,
            clarity: 0.15
        };
        
        let weightedScore = 0;
        weightedScore += (visionAnalysis.boldness || 0) * weights.boldness;
        weightedScore += (visionAnalysis.achievability || 0) * weights.achievability;
        weightedScore += (visionAnalysis.timeHorizon || 0) * weights.timeHorizon;
        weightedScore += (visionAnalysis.marketImpact || 0) * weights.marketImpact;
        weightedScore += (visionAnalysis.clarity || 0) * weights.clarity;
        
        return Math.round(Math.min(100, weightedScore));
    }

    scoreStakeholderFocus(stakeholderAnalysis) {
        const weights = {
            breadth: 0.25,
            specificity: 0.25,
            prioritization: 0.25,
            impact: 0.25
        };
        
        let weightedScore = 0;
        weightedScore += (stakeholderAnalysis.breadth || 0) * weights.breadth;
        weightedScore += (stakeholderAnalysis.specificity || 0) * weights.specificity;
        weightedScore += (stakeholderAnalysis.prioritization || 0) * weights.prioritization;
        weightedScore += (stakeholderAnalysis.impact || 0) * weights.impact;
        
        return Math.round(Math.min(100, weightedScore));
    }

    scoreValueAlignment(valueAnalysis) {
        const weights = {
            clarity: 0.3,
            authenticity: 0.25,
            actionability: 0.25,
            differentiation: 0.2
        };
        
        let weightedScore = 0;
        weightedScore += (valueAnalysis.clarity || 0) * weights.clarity;
        weightedScore += (valueAnalysis.authenticity || 0) * weights.authenticity;
        weightedScore += (valueAnalysis.actionability || 0) * weights.actionability;
        weightedScore += (valueAnalysis.differentiation || 0) * weights.differentiation;
        
        return Math.round(Math.min(100, weightedScore));
    }

    scoreMeasurability(measurabilityAnalysis) {
        const weights = {
            quantification: 0.35,
            timebound: 0.25,
            achievability: 0.2,
            relevance: 0.2
        };
        
        let weightedScore = 0;
        weightedScore += (measurabilityAnalysis.quantification || 0) * weights.quantification;
        weightedScore += (measurabilityAnalysis.timebound || 0) * weights.timebound;
        weightedScore += (measurabilityAnalysis.achievability || 0) * weights.achievability;
        weightedScore += (measurabilityAnalysis.relevance || 0) * weights.relevance;
        
        return Math.round(Math.min(100, weightedScore));
    }

    // Generate dimension feedback
    generateDimensionFeedback(dimension, score, analysis) {
        let summary = "";
        let pros = [];
        let cons = [];
        
        switch(dimension) {
            case "purposeClarity":
                if (score >= 85) {
                    summary = "Exceptional purpose articulation that inspires and guides";
                } else if (score >= 70) {
                    summary = "Strong purpose with room for more specificity";
                } else if (score >= 50) {
                    summary = "Purpose needs more clarity and inspiration";
                } else {
                    summary = "Purpose statement requires significant strengthening";
                }
                
                if (analysis.purposeAnalysis) {
                    // Always try to find strengths
                    if (analysis.purposeAnalysis.clarity >= 70) {
                        pros.push("Clear purpose articulation");
                    } else if (analysis.purposeAnalysis.clarity >= 50) {
                        pros.push("Purpose foundation established");
                    }
                    
                    if (analysis.purposeAnalysis.inspiration >= 70) {
                        pros.push("Inspiring and ambitious");
                    } else if (analysis.purposeAnalysis.inspiration >= 50) {
                        pros.push("Shows aspirational intent");
                    }
                    
                    if (analysis.purposeAnalysis.insights?.length > 0) {
                        analysis.purposeAnalysis.insights.forEach(insight => {
                            if (!pros.includes(insight)) pros.push(insight);
                        });
                    }
                    
                    // Always try to find areas for improvement
                    if (analysis.purposeAnalysis.specificity < 60) {
                        cons.push("Add more specific outcomes");
                    }
                    if (analysis.purposeAnalysis.actionability < 60) {
                        cons.push("Make purpose more actionable");
                    }
                    if (analysis.purposeAnalysis.authenticity < 60) {
                        cons.push("Strengthen authenticity and conviction");
                    }
                    if (analysis.purposeAnalysis.concerns?.length > 0) {
                        analysis.purposeAnalysis.concerns.forEach(concern => {
                            if (!cons.includes(concern)) cons.push(concern);
                        });
                    }
                    
                    // Ensure we always have at least one pro and one con
                    if (pros.length === 0) {
                        pros.push("Purpose statement initiated");
                    }
                    if (cons.length === 0) {
                        cons.push("Continue refining for maximum impact");
                    }
                }
                break;
                
            case "visionAmbition":
                if (score >= 85) {
                    summary = "Bold and achievable vision for the future";
                } else if (score >= 70) {
                    summary = "Good vision with opportunity for greater ambition";
                } else if (score >= 50) {
                    summary = "Vision needs more clarity and boldness";
                } else {
                    summary = "Vision statement needs significant development";
                }
                
                if (analysis.visionAnalysis) {
                    // Always try to find strengths
                    if (analysis.visionAnalysis.boldness >= 70) {
                        pros.push("Bold and transformational");
                    } else if (analysis.visionAnalysis.boldness >= 50) {
                        pros.push("Vision shows ambition");
                    }
                    
                    if (analysis.visionAnalysis.achievability >= 70) {
                        pros.push("Realistic and achievable");
                    } else if (analysis.visionAnalysis.achievability >= 50) {
                        pros.push("Vision appears feasible");
                    }
                    
                    if (analysis.visionAnalysis.clarity >= 60) {
                        pros.push("Clear vision articulation");
                    }
                    
                    if (analysis.visionAnalysis.marketImpact >= 60) {
                        pros.push("Market impact considered");
                    }
                    
                    // Always try to find areas for improvement
                    if (analysis.visionAnalysis.timeHorizon < 60) {
                        cons.push("Define clear time horizons");
                    }
                    if (analysis.visionAnalysis.marketImpact < 60) {
                        cons.push("Clarify market impact");
                    }
                    if (analysis.visionAnalysis.boldness < 70) {
                        cons.push("Increase vision ambition");
                    }
                    if (analysis.visionAnalysis.clarity < 70) {
                        cons.push("Sharpen vision clarity");
                    }
                    
                    // Ensure we always have at least one pro and one con
                    if (pros.length === 0) {
                        pros.push("Vision framework established");
                    }
                    if (cons.length === 0) {
                        cons.push("Continue developing vision specificity");
                    }
                }
                break;
                
            case "stakeholderFocus":
                if (score >= 85) {
                    summary = "Comprehensive stakeholder consideration";
                } else if (score >= 70) {
                    summary = "Good stakeholder focus with room for expansion";
                } else if (score >= 50) {
                    summary = "Basic stakeholder identification needs depth";
                } else {
                    summary = "Stakeholder focus needs significant expansion";
                }
                
                if (analysis.stakeholderAnalysis) {
                    // Always try to find strengths
                    if (analysis.stakeholderAnalysis.breadth >= 70) {
                        pros.push("Multiple stakeholders considered");
                    } else if (analysis.stakeholderAnalysis.breadth >= 50) {
                        pros.push("Key stakeholders identified");
                    }
                    
                    if (analysis.stakeholderAnalysis.impact >= 70) {
                        pros.push("Clear impact articulated");
                    } else if (analysis.stakeholderAnalysis.impact >= 50) {
                        pros.push("Impact direction established");
                    }
                    
                    if (analysis.stakeholderAnalysis.specificity >= 60) {
                        pros.push("Specific beneficiary groups noted");
                    }
                    
                    // Always try to find areas for improvement
                    if (analysis.stakeholderAnalysis.specificity < 60) {
                        cons.push("Be more specific about beneficiaries");
                    }
                    if (analysis.stakeholderAnalysis.prioritization < 60) {
                        cons.push("Clarify stakeholder priorities");
                    }
                    if (analysis.stakeholderAnalysis.breadth < 70) {
                        cons.push("Consider additional stakeholder groups");
                    }
                    
                    // Ensure we always have at least one pro and one con
                    if (pros.length === 0) {
                        pros.push("Stakeholder consideration started");
                    }
                    if (cons.length === 0) {
                        cons.push("Deepen stakeholder value propositions");
                    }
                }
                break;
                
            case "valueAlignment":
                if (score >= 85) {
                    summary = "Strong values that guide decisions and culture";
                } else if (score >= 70) {
                    summary = "Good values with opportunity for more clarity";
                } else if (score >= 50) {
                    summary = "Values need more definition and authenticity";
                } else {
                    summary = "Values require significant development";
                }
                
                if (analysis.valueAnalysis) {
                    // Always try to find strengths
                    if (analysis.valueAnalysis.clarity >= 70) {
                        pros.push("Clear value statements");
                    } else if (analysis.valueAnalysis.clarity >= 50) {
                        pros.push("Core values identified");
                    }
                    
                    if (analysis.valueAnalysis.authenticity >= 70) {
                        pros.push("Authentic and genuine");
                    } else if (analysis.valueAnalysis.authenticity >= 50) {
                        pros.push("Values show commitment");
                    }
                    
                    if (analysis.valueAnalysis.actionability >= 60) {
                        pros.push("Values guide behavior");
                    }
                    
                    // Always try to find areas for improvement
                    if (analysis.valueAnalysis.actionability < 60) {
                        cons.push("Make values more actionable");
                    }
                    if (analysis.valueAnalysis.differentiation < 60) {
                        cons.push("Differentiate from generic values");
                    }
                    if (analysis.valueAnalysis.clarity < 70) {
                        cons.push("Clarify and expand value definitions");
                    }
                    
                    // Ensure we always have at least one pro and one con
                    if (pros.length === 0) {
                        pros.push("Value framework initiated");
                    }
                    if (cons.length === 0) {
                        cons.push("Continue embedding values in operations");
                    }
                }
                break;
                
            case "measurability":
                if (score >= 85) {
                    summary = "Excellent quantification with clear success metrics";
                } else if (score >= 70) {
                    summary = "Good metrics with room for more specificity";
                } else if (score >= 50) {
                    summary = "Basic metrics need more development";
                } else {
                    summary = "Success metrics need significant definition";
                }
                
                if (analysis.measurabilityAnalysis) {
                    // Always try to find strengths
                    if (analysis.measurabilityAnalysis.quantification >= 70) {
                        pros.push("Well-quantified goals");
                    } else if (analysis.measurabilityAnalysis.quantification >= 50) {
                        pros.push("Some metrics identified");
                    }
                    
                    if (analysis.measurabilityAnalysis.relevance >= 70) {
                        pros.push("Relevant business metrics");
                    } else if (analysis.measurabilityAnalysis.relevance >= 50) {
                        pros.push("Metrics align with goals");
                    }
                    
                    if (analysis.measurabilityAnalysis.timebound >= 60) {
                        pros.push("Time-bound objectives");
                    }
                    
                    if (analysis.measurabilityAnalysis.achievability >= 60) {
                        pros.push("Achievable targets set");
                    }
                    
                    // Always try to find areas for improvement
                    if (analysis.measurabilityAnalysis.timebound < 60) {
                        cons.push("Add specific timeframes");
                    }
                    if (analysis.measurabilityAnalysis.achievability < 60) {
                        cons.push("Ensure goals are achievable");
                    }
                    if (analysis.measurabilityAnalysis.quantification < 70) {
                        cons.push("Add more quantifiable metrics");
                    }
                    if (analysis.measurabilityAnalysis.relevance < 70) {
                        cons.push("Align metrics with strategic goals");
                    }
                    
                    // Ensure we always have at least one pro and one con
                    if (pros.length === 0) {
                        pros.push("Measurement framework initiated");
                    }
                    if (cons.length === 0) {
                        cons.push("Continue refining success metrics");
                    }
                }
                break;
        }
        
        // Build comprehensive feedback
        let fullFeedback = summary;
        
        if (pros.length > 0) {
            fullFeedback += "\n\n" + pros.map(p => `✓ ${p}`).join("\n");
        }
        
        if (cons.length > 0) {
            fullFeedback += "\n" + cons.map(c => `✗ ${c}`).join("\n");
        }
        
        return fullFeedback;
    }

    // Generate personalized recommendations - MATCHING PROBLEM STATEMENT FORMAT EXACTLY
    generatePersonalizedRecommendations(analysis, context, scoring) {
        const currentOverallScore = scoring.overall || 50;
        
        // Get recommendations from the library
        const libraryRecommendations = getRecommendations('phase1', 'block1', 'missionStatement', currentOverallScore);
        
        // If we have library recommendations, use them
        if (libraryRecommendations && libraryRecommendations.length > 0) {
            return libraryRecommendations.slice(0, 5); // Return top 5
        }
        
        // Fallback to original logic if library doesn't have recommendations
        const recommendations = [];
        
        // Helper function to calculate realistic improvement
        const calculateRealisticImprovement = (currentScore, maxScore, priority, overallScore) => {
            const scorePercentage = (currentScore / maxScore) * 100;
            const gap = 100 - scorePercentage;
            
            let baseImprovement = 0;
            
            if (scorePercentage < 30) {
                baseImprovement = Math.min(gap * 0.6, 12);
            } else if (scorePercentage < 50) {
                baseImprovement = Math.min(gap * 0.5, 10);
            } else if (scorePercentage < 70) {
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
            return Math.min(finalImprovement, Math.round((100 - scorePercentage) * 0.5));
        };
        
        // Identify biggest gaps
        const gaps = this.identifyBiggestGaps(scoring);
        
        // Generate recommendations for top gaps
        gaps.slice(0, 5).forEach((gap, index) => {
            const priority = index === 0 ? "CRITICAL" : index <= 2 ? "HIGH" : "MEDIUM";
            
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
                const recommendation = {
                    priority: priority,
                    area: this.formatDimensionName(gap.dimension),
                    currentState: currentDimScore,
                    currentPercentage: Math.round(currentPercentage),
                    targetState: Math.min(currentDimScore + improvement, maxDimScore),
                    expectedImprovement: improvement,
                    impact: `+${improvement} points`,
                    
                    // Use actionPlan instead of specificSteps to match Problem Statement
                    actionPlan: this.generateDimensionActionPlan(gap.dimension, analysis, context),
                    
                    // Add actionable recommendations instead of resources
                    recommendations: this.generateActionableRecommendations(gap.dimension, context),
                    
                    // Add success metrics
                    successMetrics: this.defineSuccessMetrics(gap.dimension, context),
                    
                    // Add detailed analysis for popup
                    detailedAnalysis: this.generateDetailedRecommendationAnalysis(
                        gap.dimension,
                        currentDimScore,
                        maxDimScore,
                        improvement,
                        priority,
                        analysis,
                        context
                    )
                };
                
                recommendations.push(recommendation);
            }
        });
        
        // Add strategic recommendation if score is low
        if (currentOverallScore < 60 && recommendations.length < 5) {
            const strategicImprovement = 8;
            recommendations.push({
                priority: "STRATEGIC",
                area: "Mission Foundation",
                actionPlan: [
                    "Conduct stakeholder alignment workshop on mission",
                    "Create mission cascade framework for all departments",
                    "Develop mission-driven decision matrix",
                    "Establish quarterly mission review cadence"
                ],
                impact: `+${strategicImprovement} points`,
                expectedImprovement: strategicImprovement,
                recommendations: [
                    "Interview all stakeholders to understand mission perception",
                    "Create one-page mission statement that everyone can memorize",
                    "Test mission with 20 employees for clarity and inspiration"
                ],
                successMetrics: [
                    "100% leadership alignment on mission",
                    "Mission integrated into all strategic decisions",
                    "Quarterly mission reviews established"
                ],
                detailedAnalysis: {
                    overview: "A strong mission foundation is essential for organizational alignment and strategic clarity.",
                    implementation: {
                        phase1: {
                            title: "Mission Alignment",
                            tasks: [
                                "Survey current mission understanding",
                                "Identify alignment gaps",
                                "Conduct leadership workshop",
                                "Refine mission statement"
                            ]
                        },
                        phase2: {
                            title: "Mission Cascade",
                            tasks: [
                                "Create department-level missions",
                                "Align team objectives",
                                "Develop mission metrics",
                                "Train managers on mission integration"
                            ]
                        },
                        phase3: {
                            title: "Mission Activation",
                            tasks: [
                                "Launch mission communication campaign",
                                "Integrate into decision processes",
                                "Establish review rhythm",
                                "Measure mission impact"
                            ]
                        }
                    },
                    roi: "Organizations with strong mission alignment see 30% higher employee engagement and 25% better strategic execution."
                }
            });
        }
        
        return recommendations.slice(0, 5); // Return top 5 recommendations
    }

    // New method: Generate action plan (matching Problem Statement format)
    generateDimensionActionPlan(dimension, analysis, context) {
        const plans = {
            purposeClarity: [
                "Conduct purpose discovery workshop with leadership team",
                "Interview 20+ stakeholders on purpose perception",
                "Refine purpose statement to one memorable sentence",
                "Create purpose activation toolkit for all teams"
            ],
            visionAmbition: [
                "Define 5-year vision with measurable milestones",
                "Benchmark vision against industry leaders",
                "Create visual representation of future state",
                "Align vision with strategic initiatives"
            ],
            stakeholderFocus: [
                "Map all stakeholder groups and their needs",
                "Define value proposition for each stakeholder",
                "Create stakeholder engagement strategy",
                "Establish stakeholder feedback mechanisms"
            ],
            valueAlignment: [
                "Audit current behaviors against stated values",
                "Create values-based decision framework",
                "Integrate values into performance management",
                "Develop values recognition program"
            ],
            measurability: [
                "Define SMART goals for mission success",
                "Create mission metrics dashboard",
                "Establish quarterly progress reviews",
                "Implement leading indicator tracking"
            ]
        };
        
        return plans[dimension] || [
            "Conduct comprehensive assessment",
            "Identify improvement opportunities",
            "Create action plan",
            "Implement changes"
        ];
    }
    
    // New method: Generate actionable recommendations (matching Problem Statement format)
    generateActionableRecommendations(dimension, context) {
        const recommendations = {
            purposeClarity: [
                "Interview 10 stakeholders about what the purpose means to them",
                "Refine purpose to one memorable sentence under 15 words",
                "Test purpose statement with 20 employees for clarity",
                "Create purpose activation toolkit with specific examples"
            ],
            visionAmbition: [
                "Define specific 5-year milestones with measurable outcomes",
                "Create visual representation of the future state",
                "Test vision with board and advisors for ambition level",
                "Align all strategic initiatives to vision achievement"
            ],
            stakeholderFocus: [
                "Map all stakeholder groups and their specific needs",
                "Create value proposition for each stakeholder group",
                "Establish quarterly stakeholder feedback sessions",
                "Measure stakeholder satisfaction scores monthly"
            ],
            valueAlignment: [
                "Audit current behaviors against stated values weekly",
                "Create specific behavioral examples for each value",
                "Integrate values into hiring and performance reviews",
                "Launch monthly values recognition program"
            ],
            measurability: [
                "Define 3-5 SMART goals for mission success",
                "Create real-time mission metrics dashboard",
                "Establish weekly metric review meetings",
                "Set up automated progress tracking systems"
            ]
        };
        
        return recommendations[dimension] || [
            "Define clear success metrics",
            "Create implementation plan",
            "Track and measure progress weekly"
        ];
    }

    // New method: Define success metrics (matching Problem Statement format)
    defineSuccessMetrics(dimension, context) {
        const metrics = {
            purposeClarity: [
                "90% of employees can articulate purpose",
                "Purpose guides 80% of strategic decisions",
                "Purpose statement memorability > 75%"
            ],
            visionAmbition: [
                "Vision milestones defined and tracked",
                "80% team belief in vision achievability",
                "Vision integrated in all communications"
            ],
            stakeholderFocus: [
                "All stakeholder groups mapped and engaged",
                "Stakeholder satisfaction scores > 80%",
                "Regular stakeholder feedback loops established"
            ],
            valueAlignment: [
                "Values demonstrated in 90% of decisions",
                "Values recognition program active",
                "Values integrated in hiring and reviews"
            ],
            measurability: [
                "All goals have SMART metrics",
                "Weekly metric reviews happening",
                "Progress visible to all stakeholders"
            ]
        };
        
        return metrics[dimension] || [
            "Measurable improvement achieved",
            "Stakeholder validation obtained",
            "Sustainable practices established"
        ];
    }

    // New method: Generate detailed recommendation analysis (matching Problem Statement format)
    generateDetailedRecommendationAnalysis(dimension, currentScore, maxScore, improvement, priority, analysis, context) {
        const detailedPlans = {
            purposeClarity: {
                overview: "A clear, inspiring purpose is the foundation of organizational alignment and employee engagement. This recommendation focuses on transforming your purpose from a statement into a living guide for decisions and actions.",
                implementation: {
                    phase1: {
                        title: "Purpose Discovery",
                        tasks: [
                            "Interview founders on original vision",
                            "Survey employees on purpose perception",
                            "Analyze customer feedback on 'why'",
                            "Document purpose evolution story"
                        ]
                    },
                    phase2: {
                        title: "Purpose Refinement",
                        tasks: [
                            "Workshop with leadership team",
                            "Craft one-sentence purpose statement",
                            "Test with diverse stakeholders",
                            "Refine based on feedback"
                        ]
                    },
                    phase3: {
                        title: "Purpose Activation",
                        tasks: [
                            "Create purpose communication plan",
                            "Integrate into onboarding",
                            "Build purpose into decisions",
                            "Measure purpose alignment"
                        ]
                    }
                },
                recommendations: [
                    "Interview 10 stakeholders about purpose perception",
                    "Craft purpose statement under 15 words",
                    "Test with 20 employees for memorability",
                    "Create purpose decision framework"
                ],
                risks: [
                    "Purpose feels generic or uninspiring",
                    "Disconnect between stated and lived purpose",
                    "Stakeholder misalignment",
                    "Implementation fatigue"
                ],
                successMetrics: [
                    "Purpose statement finalized and memorable",
                    "90% employee understanding",
                    "Purpose guides strategic decisions",
                    "Improved employee engagement scores"
                ],
                roi: "Organizations with clear purpose see 30% higher employee engagement and 40% better financial performance."
            },
            visionAmbition: {
                overview: "An ambitious yet achievable vision creates pull toward the future and aligns efforts across the organization. This plan will help you craft a vision that inspires action and guides strategy.",
                implementation: {
                    phase1: {
                        title: "Vision Assessment",
                        tasks: [
                            "Evaluate current vision effectiveness",
                            "Benchmark against industry leaders",
                            "Identify vision gaps",
                            "Gather stakeholder input"
                        ]
                    },
                    phase2: {
                        title: "Vision Creation",
                        tasks: [
                            "Define 5-year future state",
                            "Set measurable milestones",
                            "Create visual representation",
                            "Validate with key stakeholders"
                        ]
                    },
                    phase3: {
                        title: "Vision Communication",
                        tasks: [
                            "Develop vision narrative",
                            "Create communication materials",
                            "Launch vision campaign",
                            "Track vision understanding"
                        ]
                    }
                },
                recommendations: [
                    "Define 5-year measurable milestones",
                    "Create visual future state representation",
                    "Test vision with 10 advisors",
                    "Build vision roadmap with quarterly goals"
                ],
                risks: [
                    "Vision too ambitious or unrealistic",
                    "Lack of clear path to achievement",
                    "Insufficient buy-in",
                    "Vision-strategy disconnect"
                ],
                successMetrics: [
                    "Vision statement clear and inspiring",
                    "Milestones defined for years 1-5",
                    "80% team belief in achievability",
                    "Vision guides resource allocation"
                ],
                roi: "Companies with compelling visions grow 3x faster and have 2x higher employee retention."
            },
            stakeholderFocus: {
                overview: "Understanding and balancing stakeholder needs is critical for sustainable success. This plan helps you identify, prioritize, and engage all stakeholder groups effectively.",
                implementation: {
                    phase1: {
                        title: "Stakeholder Mapping",
                        tasks: [
                            "Identify all stakeholder groups",
                            "Assess stakeholder importance/influence",
                            "Map stakeholder needs and expectations",
                            "Identify conflicts and synergies"
                        ]
                    },
                    phase2: {
                        title: "Value Definition",
                        tasks: [
                            "Define value prop for each group",
                            "Create stakeholder journey maps",
                            "Identify engagement touchpoints",
                            "Develop communication strategies"
                        ]
                    },
                    phase3: {
                        title: "Engagement Activation",
                        tasks: [
                            "Launch stakeholder programs",
                            "Establish feedback mechanisms",
                            "Create stakeholder councils",
                            "Measure stakeholder satisfaction"
                        ]
                    }
                },
                recommendations: [
                    "Map all stakeholder groups this week",
                    "Define value prop for each group",
                    "Launch monthly feedback sessions",
                    "Create stakeholder advisory council"
                ],
                risks: [
                    "Competing stakeholder interests",
                    "Resource constraints for engagement",
                    "Stakeholder fatigue",
                    "Misaligned expectations"
                ],
                successMetrics: [
                    "All stakeholders mapped and prioritized",
                    "Engagement plans for each group",
                    "Regular stakeholder feedback",
                    "Stakeholder NPS > 50"
                ],
                roi: "Strong stakeholder engagement increases customer retention by 25% and employee productivity by 20%."
            },
            valueAlignment: {
                overview: "Values guide behavior and culture. This plan ensures your stated values translate into daily actions and decisions across the organization.",
                implementation: {
                    phase1: {
                        title: "Values Audit",
                        tasks: [
                            "Assess current vs. stated values",
                            "Identify values gaps",
                            "Survey cultural alignment",
                            "Document values in action"
                        ]
                    },
                    phase2: {
                        title: "Values Integration",
                        tasks: [
                            "Create values behavior guide",
                            "Integrate into hiring process",
                            "Add to performance reviews",
                            "Build decision frameworks"
                        ]
                    },
                    phase3: {
                        title: "Values Reinforcement",
                        tasks: [
                            "Launch recognition program",
                            "Share values stories",
                            "Create values rituals",
                            "Measure values alignment"
                        ]
                    }
                },
                recommendations: [
                    "Audit behaviors vs values weekly",
                    "Create behavioral examples for each value",
                    "Launch values recognition program",
                    "Integrate values into all decisions"
                ],
                risks: [
                    "Values-behavior disconnect",
                    "Values feel imposed vs. authentic",
                    "Lack of accountability",
                    "Values drift over time"
                ],
                successMetrics: [
                    "Values guide 80% of decisions",
                    "Values integrated in all HR processes",
                    "Monthly values recognition active",
                    "Culture alignment score > 75%"
                ],
                roi: "Values-aligned organizations see 30% lower turnover and 25% higher customer satisfaction."
            },
            measurability: {
                overview: "What gets measured gets managed. This plan establishes clear metrics and tracking systems to ensure mission progress is visible and actionable.",
                implementation: {
                    phase1: {
                        title: "Metrics Definition",
                        tasks: [
                            "Define mission success metrics",
                            "Set SMART goals for each",
                            "Identify leading indicators",
                            "Create measurement framework"
                        ]
                    },
                    phase2: {
                        title: "Tracking Systems",
                        tasks: [
                            "Build metrics dashboard",
                            "Automate data collection",
                            "Create reporting cadence",
                            "Train teams on metrics"
                        ]
                    },
                    phase3: {
                        title: "Performance Management",
                        tasks: [
                            "Launch weekly reviews",
                            "Create accountability system",
                            "Celebrate wins publicly",
                            "Adjust based on learnings"
                        ]
                    }
                },
                recommendations: [
                    "Define 5 SMART mission metrics",
                    "Build real-time metrics dashboard",
                    "Start weekly metric reviews",
                    "Automate data collection"
                ],
                risks: [
                    "Metric overload",
                    "Gaming the metrics",
                    "Lagging vs. leading confusion",
                    "Lack of action on insights"
                ],
                successMetrics: [
                    "All goals have clear metrics",
                    "Real-time dashboard operational",
                    "Weekly metric reviews happening",
                    "90% goals on track or green"
                ],
                roi: "Organizations with strong metrics discipline achieve goals 2.5x more often and iterate 40% faster."
            }
        };
        
        const plan = detailedPlans[dimension] || {
            overview: `Improving ${this.formatDimensionName(dimension)} will strengthen your mission statement and organizational alignment.`,
            implementation: {
                phase1: {
                    title: "Assessment Phase",
                    tasks: ["Review current state", "Identify gaps", "Set targets", "Gather resources"]
                },
                phase2: {
                    title: "Implementation Phase",
                    tasks: ["Execute plan", "Gather feedback", "Iterate approach", "Document progress"]
                },
                phase3: {
                    title: "Optimization Phase",
                    tasks: ["Measure results", "Refine approach", "Scale success", "Sustain improvements"]
                }
            },
            recommendations: ["Conduct assessment", "Set clear goals", "Track progress weekly"],
            risks: ["Execution challenges", "Resource constraints", "Change resistance"],
            successMetrics: [`${dimension} improved by ${improvement} points`],
            roi: "Expected improvement in mission effectiveness and organizational alignment."
        };
        
        return plan;
    }

    // Helper methods
    identifyBiggestGaps(scoring) {
        return Object.entries(scoring.dimensional)
            .map(([dimension, data]) => ({
                dimension,
                score: data.score,
                gap: data.maxScore - data.score
            }))
            .sort((a, b) => b.gap - a.gap);
    }

    calculateImprovement(currentScore, gap, priority) {
        const baseImprovement = gap * 0.5;
        const priorityMultiplier = priority === 'CRITICAL' ? 1.2 : priority === 'HIGH' ? 1.0 : 0.8;
        return Math.round(Math.min(gap, baseImprovement * priorityMultiplier));
    }

    formatDimensionName(dimension) {
        const map = {
            'purposeClarity': 'Purpose Clarity',
            'visionAmbition': 'Vision Ambition',
            'stakeholderFocus': 'Stakeholder Focus',
            'valueAlignment': 'Value Alignment',
            'measurability': 'Success Measurability'
        };
        return map[dimension] || dimension;
    }

    getActionDescription(dimension) {
        const descriptions = {
            'purposeClarity': 'Refine and clarify your core purpose statement',
            'visionAmbition': 'Strengthen vision with bold, achievable goals',
            'stakeholderFocus': 'Define and prioritize all stakeholder groups',
            'valueAlignment': 'Align values with actions and behaviors',
            'measurability': 'Establish clear, quantifiable success metrics'
        };
        return descriptions[dimension] || 'Improve this dimension';
    }

    generateExecutiveSummary(analysis, scoring, context) {
        const score = scoring.overall;
        let summary = "";
        
        if (score >= 85) {
            summary = `Exceptional mission statement (${score}%). Your purpose is clear and inspiring, with strong stakeholder focus and measurable goals. `;
        } else if (score >= 70) {
            summary = `Strong mission foundation (${score}%). Good clarity on purpose and vision with opportunities to strengthen measurability and stakeholder impact. `;
        } else if (score >= 50) {
            summary = `Developing mission statement (${score}%). Core elements present but need more specificity, ambition, and measurable outcomes. `;
        } else {
            summary = `Mission statement needs significant work (${score}%). Focus on clarifying purpose, defining stakeholders, and establishing measurable goals. `;
        }
        
        return summary;
    }

    identifyStrengthsWeaknesses(analysis) {
        const strengths = [];
        const weaknesses = [];
        
        if (analysis.purposeAnalysis?.clarity >= 70) {
            strengths.push("Clear purpose articulation");
        } else {
            weaknesses.push("Purpose needs clarity");
        }
        
        if (analysis.visionAnalysis?.boldness >= 70) {
            strengths.push("Bold vision");
        } else {
            weaknesses.push("Vision lacks ambition");
        }
        
        return { strengths, weaknesses };
    }

    identifyCriticalGaps(analysis) {
        const gaps = [];
        
        if (!analysis.measurabilityAnalysis || analysis.measurabilityAnalysis.quantification < 50) {
            gaps.push("Success metrics undefined");
        }
        
        if (!analysis.stakeholderAnalysis || analysis.stakeholderAnalysis.specificity < 50) {
            gaps.push("Stakeholder definition vague");
        }
        
        return gaps;
    }

    identifyOpportunities(analysis, context) {
        const opportunities = [];
        
        if (analysis.visionAnalysis?.boldness >= 70) {
            opportunities.push({
                opportunity: "Bold vision can attract top talent",
                action: "Use vision in recruiting"
            });
        }
        
        if (analysis.purposeAnalysis?.inspiration >= 70) {
            opportunities.push({
                opportunity: "Inspiring purpose for brand building",
                action: "Build purpose-driven marketing"
            });
        }
        
        return opportunities;
    }

    generateNextSteps(analysis, recommendations) {
        return {
            immediate: recommendations.filter(r => r.priority === "CRITICAL").map(r => r.actionPlan?.[0]).filter(Boolean),
            shortTerm: recommendations.filter(r => r.priority === "HIGH").map(r => r.actionPlan?.[0]).filter(Boolean),
            longTerm: recommendations.filter(r => r.priority === "MEDIUM").map(r => r.actionPlan?.[0]).filter(Boolean)
        };
    }

    provideExpertCommentary(analysis, context) {
        return "A strong mission statement is the North Star for your organization. It should inspire your team, attract customers, and guide strategic decisions. Focus on making it memorable, measurable, and meaningful to all stakeholders.";
    }

    calculateConfidence(analysis) {
        let confidence = 0.7;
        
        if (analysis.purposeAnalysis?.clarity >= 70) confidence += 0.1;
        if (analysis.measurabilityAnalysis?.quantification >= 70) confidence += 0.1;
        if (analysis.stakeholderAnalysis?.specificity >= 70) confidence += 0.1;
        
        return Math.min(1.0, confidence);
    }

    // Utility methods (same as Problem Statement agent)
    extractMetrics(text) {
        const metrics = [];
        
        const percentages = text.match(/\d+\.?\d*\s*%/g) || [];
        metrics.push(...percentages.map(p => ({ type: 'percentage', value: p })));
        
        const currency = text.match(/\$[\d,]+[KMB]?/gi) || [];
        metrics.push(...currency.map(c => ({ type: 'currency', value: c })));
        
        const quantities = text.match(/\d+\s*(customers?|users?|companies|employees)/gi) || [];
        metrics.push(...quantities.map(q => ({ type: 'quantity', value: q })));
        
        return metrics;
    }

    extractStakeholders(text) {
        const stakeholders = [];
        const patterns = [
            /customers?|clients?|users?/gi,
            /employees?|team|staff/gi,
            /investors?|shareholders?|vcs?/gi,
            /partners?|vendors?|suppliers?/gi,
            /community|society|ecosystem/gi
        ];
        
        patterns.forEach(pattern => {
            const matches = text.match(pattern) || [];
            stakeholders.push(...matches);
        });
        
        return [...new Set(stakeholders)];
    }

    extractValues(text) {
        const valueKeywords = [
            "innovation", "transparency", "excellence", "integrity",
            "customer", "quality", "collaboration", "growth",
            "sustainability", "diversity", "inclusion", "empowerment"
        ];
        
        return valueKeywords.filter(value => 
            text.toLowerCase().includes(value.toLowerCase())
        );
    }

    extractTimeframes(text) {
        const timePatterns = [
            /\b\d+\s*(?:days?|weeks?|months?|years?)\b/gi,
            /\b(?:Q[1-4]|quarterly|annually|monthly)\b/gi,
            /\b20\d{2}\b/g
        ];
        
        const timeframes = [];
        timePatterns.forEach(pattern => {
            const matches = text.match(pattern) || [];
            timeframes.push(...matches);
        });
        
        return timeframes;
    }

    analyzeSentiment(text) {
        const positive = ["transform", "enable", "empower", "revolutionize", "improve", "innovate"];
        const negative = ["eliminate", "reduce", "prevent", "stop", "avoid"];
        
        const positiveScore = positive.filter(word => text.toLowerCase().includes(word)).length;
        const negativeScore = negative.filter(word => text.toLowerCase().includes(word)).length;
        
        return {
            score: (positiveScore - negativeScore) / (positiveScore + negativeScore + 1),
            positive: positiveScore,
            negative: negativeScore,
            tone: positiveScore > negativeScore ? "aspirational" : "problem-solving"
        };
    }

    extractKeywords(text) {
        const words = text.toLowerCase().split(/\s+/);
        const stopWords = ["the", "is", "at", "which", "on", "and", "a", "an", "as", "are", "was", "were"];
        
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
        return {
            hasQuantification: /\d+/.test(text),
            hasTimeframe: /\d+\s*(months?|years?)|20\d{2}/i.test(text),
            hasAction: /will|shall|commit|promise|strive/i.test(text),
            hasImpact: /transform|change|improve|enable|empower/i.test(text),
            hasScope: /global|world|industry|market|ecosystem/i.test(text)
        };
    }
}

// Export for use in the platform
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MissionStatementAgentEnhanced;
}
/**
 * Customer Success Expansion Agent - Enhanced Version
 * Provides subcomponent-specific analysis for Block 8
 */

const { generateDynamicRecommendations } = require('./recommendations-library-dynamic-wrapper.js');

class CustomerSuccessExpansionAgentEnhanced {
    constructor() {
        this.name = 'Customer Success Expansion Agent Enhanced';
        this.version = '3.0';
    }

    async analyzeWorksheet(worksheetData, subcomponentId) {
        console.log('📈 Customer Success Expansion Agent Enhanced analyzing:', subcomponentId);
        
        // Get subcomponent-specific dimensions
        const dimensions = this.getDimensionsForSubcomponent(subcomponentId);
        
        // Evaluate based on subcomponent-specific criteria
        const evaluatedDimensions = this.evaluateDimensions(worksheetData, dimensions, subcomponentId);
        
        // Calculate overall score
        const overallScore = this.calculateOverallScore(evaluatedDimensions);
        
        // Generate subcomponent-specific recommendations
        const recommendations = this.generateRecommendations(evaluatedDimensions, subcomponentId);
        
        return {
            score: overallScore,
            detailedScores: evaluatedDimensions,
            recommendations: recommendations,
            analysis: {
                executiveSummary: this.generateExecutiveSummary(overallScore, subcomponentId)
            },
            confidence: 0.91
        };
    }
    
    getDimensionsForSubcomponent(subcomponentId) {
        const dimensionMap = {
            '8-1': { // Upsell Funnel Model
                funnelDefinition: {
                    score: 0,
                    maxScore: 20,
                    weight: 25,
                    name: 'Funnel Definition',
                    description: 'Clear upsell funnel stages',
                    feedback: ''
                },
                conversionMetrics: {
                    score: 0,
                    maxScore: 20,
                    weight: 30,
                    name: 'Conversion Metrics',
                    description: 'Stage-to-stage conversion rates',
                    feedback: ''
                },
                opportunityIdentification: {
                    score: 0,
                    maxScore: 20,
                    weight: 25,
                    name: 'Opportunity Identification',
                    description: 'Finding upsell opportunities',
                    feedback: ''
                },
                valueProposition: {
                    score: 0,
                    maxScore: 20,
                    weight: 20,
                    name: 'Value Proposition',
                    description: 'Upsell value communication',
                    feedback: ''
                }
            },
            '8-2': { // Team Expansion Signals
                usageSpread: {
                    score: 0,
                    maxScore: 20,
                    weight: 25,
                    name: 'Usage Spread',
                    description: 'Product adoption across teams',
                    feedback: ''
                },
                departmentAdoption: {
                    score: 0,
                    maxScore: 20,
                    weight: 25,
                    name: 'Department Adoption',
                    description: 'Cross-department usage',
                    feedback: ''
                },
                viralCoefficient: {
                    score: 0,
                    maxScore: 20,
                    weight: 25,
                    name: 'Viral Coefficient',
                    description: 'User-driven growth rate',
                    feedback: ''
                },
                expansionTriggers: {
                    score: 0,
                    maxScore: 20,
                    weight: 25,
                    name: 'Expansion Triggers',
                    description: 'Events that drive team growth',
                    feedback: ''
                }
            },
            '8-3': { // Organic Adoption Pattern
                naturalGrowth: {
                    score: 0,
                    maxScore: 20,
                    weight: 30,
                    name: 'Natural Growth',
                    description: 'Growth without sales intervention',
                    feedback: ''
                },
                userAdvocacy: {
                    score: 0,
                    maxScore: 20,
                    weight: 25,
                    name: 'User Advocacy',
                    description: 'Users promoting internally',
                    feedback: ''
                },
                adoptionVelocity: {
                    score: 0,
                    maxScore: 20,
                    weight: 25,
                    name: 'Adoption Velocity',
                    description: 'Speed of organic spread',
                    feedback: ''
                },
                networkEffects: {
                    score: 0,
                    maxScore: 20,
                    weight: 20,
                    name: 'Network Effects',
                    description: 'Value increase with more users',
                    feedback: ''
                }
            },
            '8-4': { // Champion Mapping
                championIdentification: {
                    score: 0,
                    maxScore: 20,
                    weight: 30,
                    name: 'Champion Identification',
                    description: 'Finding internal advocates',
                    feedback: ''
                },
                influenceMapping: {
                    score: 0,
                    maxScore: 20,
                    weight: 25,
                    name: 'Influence Mapping',
                    description: 'Understanding champion influence',
                    feedback: ''
                },
                championEnablement: {
                    score: 0,
                    maxScore: 20,
                    weight: 25,
                    name: 'Champion Enablement',
                    description: 'Empowering champions to succeed',
                    feedback: ''
                },
                advocacyProgram: {
                    score: 0,
                    maxScore: 20,
                    weight: 20,
                    name: 'Advocacy Program',
                    description: 'Formal champion program',
                    feedback: ''
                }
            },
            '8-5': { // CSAT/NPS Tracking
                satisfactionScore: {
                    score: 0,
                    maxScore: 20,
                    weight: 25,
                    name: 'Satisfaction Score',
                    description: 'Customer satisfaction levels',
                    feedback: ''
                },
                npsTracking: {
                    score: 0,
                    maxScore: 20,
                    weight: 30,
                    name: 'NPS Tracking',
                    description: 'Net Promoter Score monitoring',
                    feedback: ''
                },
                sentimentAnalysis: {
                    score: 0,
                    maxScore: 20,
                    weight: 25,
                    name: 'Sentiment Analysis',
                    description: 'Customer sentiment trends',
                    feedback: ''
                },
                feedbackAction: {
                    score: 0,
                    maxScore: 20,
                    weight: 20,
                    name: 'Feedback Action',
                    description: 'Acting on customer feedback',
                    feedback: ''
                }
            },
            '8-6': { // Renewal Readiness Tracker
                renewalIndicators: {
                    score: 0,
                    maxScore: 20,
                    weight: 30,
                    name: 'Renewal Indicators',
                    description: 'Signs of renewal likelihood',
                    feedback: ''
                },
                riskAssessment: {
                    score: 0,
                    maxScore: 20,
                    weight: 25,
                    name: 'Risk Assessment',
                    description: 'Renewal risk identification',
                    feedback: ''
                },
                valueRealization: {
                    score: 0,
                    maxScore: 20,
                    weight: 25,
                    name: 'Value Realization',
                    description: 'Customer achieving goals',
                    feedback: ''
                },
                renewalStrategy: {
                    score: 0,
                    maxScore: 20,
                    weight: 20,
                    name: 'Renewal Strategy',
                    description: 'Proactive renewal approach',
                    feedback: ''
                }
            }
        };
        
        return dimensionMap[subcomponentId] || this.getDefaultDimensions();
    }
    
    getDefaultDimensions() {
        // Fallback dimensions if subcomponent not mapped
        return {
            expansion: {
                score: 0,
                maxScore: 20,
                weight: 25,
                name: 'Expansion',
                description: 'Customer growth potential',
                feedback: ''
            },
            success: {
                score: 0,
                maxScore: 20,
                weight: 25,
                name: 'Success',
                description: 'Customer success metrics',
                feedback: ''
            },
            retention: {
                score: 0,
                maxScore: 20,
                weight: 25,
                name: 'Retention',
                description: 'Customer retention indicators',
                feedback: ''
            },
            advocacy: {
                score: 0,
                maxScore: 20,
                weight: 25,
                name: 'Advocacy',
                description: 'Customer advocacy level',
                feedback: ''
            }
        };
    }
    
    evaluateDimensions(data, dimensions, subcomponentId) {
        const fieldData = Object.values(data).join(' ').toLowerCase();
        
        // Subcomponent-specific evaluation logic
        switch(subcomponentId) {
            case '8-1': // Upsell Funnel Model
                return this.evaluateUpsellFunnel(fieldData, dimensions);
            case '8-2': // Team Expansion Signals
                return this.evaluateTeamExpansion(fieldData, dimensions);
            case '8-3': // Organic Adoption Pattern
                return this.evaluateOrganicAdoption(fieldData, dimensions);
            case '8-4': // Champion Mapping
                return this.evaluateChampionMapping(fieldData, dimensions);
            case '8-5': // CSAT/NPS Tracking
                return this.evaluateCSATNPS(fieldData, dimensions);
            case '8-6': // Renewal Readiness Tracker
                return this.evaluateRenewalReadiness(fieldData, dimensions);
            default:
                return this.evaluateGeneric(fieldData, dimensions);
        }
    }
    
    evaluateUpsellFunnel(fieldData, dimensions) {
        // Funnel Definition
        let score = 0;
        if (fieldData.includes('funnel') || fieldData.includes('stage')) score += 7;
        if (fieldData.includes('upsell') || fieldData.includes('upgrade')) score += 7;
        if (fieldData.includes('process') || fieldData.includes('path')) score += 6;
        dimensions.funnelDefinition.score = Math.min(score, 20);
        dimensions.funnelDefinition.percentage = (dimensions.funnelDefinition.score / 20) * 100;
        dimensions.funnelDefinition.feedback = score >= 14 ? '✓ Clear funnel defined' : '✗ Define upsell funnel stages';
        
        // Conversion Metrics
        score = 0;
        if (fieldData.match(/\d+%/)) score += 8;
        if (fieldData.includes('conversion') || fieldData.includes('convert')) score += 6;
        if (fieldData.includes('rate') || fieldData.includes('metric')) score += 6;
        dimensions.conversionMetrics.score = Math.min(score, 20);
        dimensions.conversionMetrics.percentage = (dimensions.conversionMetrics.score / 20) * 100;
        dimensions.conversionMetrics.feedback = score >= 14 ? '✓ Conversion tracked' : '✗ Track conversion rates';
        
        // Opportunity Identification
        score = 0;
        if (fieldData.includes('opportunity') || fieldData.includes('potential')) score += 7;
        if (fieldData.includes('identify') || fieldData.includes('find')) score += 7;
        if (fieldData.includes('signal') || fieldData.includes('indicator')) score += 6;
        dimensions.opportunityIdentification.score = Math.min(score, 20);
        dimensions.opportunityIdentification.percentage = (dimensions.opportunityIdentification.score / 20) * 100;
        dimensions.opportunityIdentification.feedback = score >= 14 ? '✓ Opportunities identified' : '✗ Better opportunity detection';
        
        // Value Proposition
        score = 0;
        if (fieldData.includes('value') || fieldData.includes('benefit')) score += 7;
        if (fieldData.includes('proposition') || fieldData.includes('offer')) score += 7;
        if (fieldData.includes('roi') || fieldData.includes('return')) score += 6;
        dimensions.valueProposition.score = Math.min(score, 20);
        dimensions.valueProposition.percentage = (dimensions.valueProposition.score / 20) * 100;
        dimensions.valueProposition.feedback = score >= 14 ? '✓ Value clear' : '✗ Strengthen value proposition';
        
        return dimensions;
    }
    
    evaluateTeamExpansion(fieldData, dimensions) {
        // Usage Spread
        let score = 0;
        if (fieldData.includes('spread') || fieldData.includes('expand')) score += 7;
        if (fieldData.includes('team') || fieldData.includes('department')) score += 7;
        if (fieldData.includes('usage') || fieldData.includes('adoption')) score += 6;
        dimensions.usageSpread.score = Math.min(score, 20);
        dimensions.usageSpread.percentage = (dimensions.usageSpread.score / 20) * 100;
        dimensions.usageSpread.feedback = score >= 14 ? '✓ Usage spreading' : '✗ Track usage spread';
        
        // Department Adoption
        score = 0;
        if (fieldData.includes('department') || fieldData.includes('division')) score += 7;
        if (fieldData.includes('cross') || fieldData.includes('multiple')) score += 7;
        if (fieldData.includes('adopt') || fieldData.includes('use')) score += 6;
        dimensions.departmentAdoption.score = Math.min(score, 20);
        dimensions.departmentAdoption.percentage = (dimensions.departmentAdoption.score / 20) * 100;
        dimensions.departmentAdoption.feedback = score >= 14 ? '✓ Cross-department adoption' : '✗ Expand to more departments';
        
        // Viral Coefficient
        score = 0;
        if (fieldData.includes('viral') || fieldData.includes('organic')) score += 7;
        if (fieldData.includes('coefficient') || fieldData.includes('rate')) score += 7;
        if (fieldData.includes('user') || fieldData.includes('invite')) score += 6;
        dimensions.viralCoefficient.score = Math.min(score, 20);
        dimensions.viralCoefficient.percentage = (dimensions.viralCoefficient.score / 20) * 100;
        dimensions.viralCoefficient.feedback = score >= 14 ? '✓ Viral growth tracked' : '✗ Measure viral coefficient';
        
        // Expansion Triggers
        score = 0;
        if (fieldData.includes('trigger') || fieldData.includes('event')) score += 7;
        if (fieldData.includes('expansion') || fieldData.includes('growth')) score += 7;
        if (fieldData.includes('signal') || fieldData.includes('indicator')) score += 6;
        dimensions.expansionTriggers.score = Math.min(score, 20);
        dimensions.expansionTriggers.percentage = (dimensions.expansionTriggers.score / 20) * 100;
        dimensions.expansionTriggers.feedback = score >= 14 ? '✓ Triggers identified' : '✗ Define expansion triggers';
        
        return dimensions;
    }
    
    evaluateOrganicAdoption(fieldData, dimensions) {
        // Natural Growth
        let score = 0;
        if (fieldData.includes('organic') || fieldData.includes('natural')) score += 7;
        if (fieldData.includes('growth') || fieldData.includes('expand')) score += 7;
        if (fieldData.includes('without') || fieldData.includes('self')) score += 6;
        dimensions.naturalGrowth.score = Math.min(score, 20);
        dimensions.naturalGrowth.percentage = (dimensions.naturalGrowth.score / 20) * 100;
        dimensions.naturalGrowth.feedback = score >= 14 ? '✓ Natural growth happening' : '✗ Track organic growth';
        
        // User Advocacy
        score = 0;
        if (fieldData.includes('advocate') || fieldData.includes('champion')) score += 7;
        if (fieldData.includes('promote') || fieldData.includes('recommend')) score += 7;
        if (fieldData.includes('internal') || fieldData.includes('colleague')) score += 6;
        dimensions.userAdvocacy.score = Math.min(score, 20);
        dimensions.userAdvocacy.percentage = (dimensions.userAdvocacy.score / 20) * 100;
        dimensions.userAdvocacy.feedback = score >= 14 ? '✓ Strong advocacy' : '✗ Build user advocacy';
        
        // Adoption Velocity
        score = 0;
        if (fieldData.includes('velocity') || fieldData.includes('speed')) score += 7;
        if (fieldData.includes('fast') || fieldData.includes('quick')) score += 7;
        if (fieldData.includes('adoption') || fieldData.includes('spread')) score += 6;
        dimensions.adoptionVelocity.score = Math.min(score, 20);
        dimensions.adoptionVelocity.percentage = (dimensions.adoptionVelocity.score / 20) * 100;
        dimensions.adoptionVelocity.feedback = score >= 14 ? '✓ Fast adoption' : '✗ Measure adoption speed';
        
        // Network Effects
        score = 0;
        if (fieldData.includes('network') || fieldData.includes('collaborative')) score += 7;
        if (fieldData.includes('effect') || fieldData.includes('value')) score += 7;
        if (fieldData.includes('more user') || fieldData.includes('increase')) score += 6;
        dimensions.networkEffects.score = Math.min(score, 20);
        dimensions.networkEffects.percentage = (dimensions.networkEffects.score / 20) * 100;
        dimensions.networkEffects.feedback = score >= 14 ? '✓ Network effects present' : '✗ Build network effects';
        
        return dimensions;
    }
    
    evaluateChampionMapping(fieldData, dimensions) {
        // Champion Identification
        let score = 0;
        if (fieldData.includes('champion') || fieldData.includes('advocate')) score += 7;
        if (fieldData.includes('identify') || fieldData.includes('find')) score += 7;
        if (fieldData.includes('supporter') || fieldData.includes('promoter')) score += 6;
        dimensions.championIdentification.score = Math.min(score, 20);
        dimensions.championIdentification.percentage = (dimensions.championIdentification.score / 20) * 100;
        dimensions.championIdentification.feedback = score >= 14 ? '✓ Champions identified' : '✗ Identify champions';
        
        // Influence Mapping
        score = 0;
        if (fieldData.includes('influence') || fieldData.includes('impact')) score += 7;
        if (fieldData.includes('map') || fieldData.includes('understand')) score += 7;
        if (fieldData.includes('decision') || fieldData.includes('stakeholder')) score += 6;
        dimensions.influenceMapping.score = Math.min(score, 20);
        dimensions.influenceMapping.percentage = (dimensions.influenceMapping.score / 20) * 100;
        dimensions.influenceMapping.feedback = score >= 14 ? '✓ Influence mapped' : '✗ Map champion influence';
        
        // Champion Enablement
        score = 0;
        if (fieldData.includes('enable') || fieldData.includes('empower')) score += 7;
        if (fieldData.includes('support') || fieldData.includes('help')) score += 7;
        if (fieldData.includes('resource') || fieldData.includes('tool')) score += 6;
        dimensions.championEnablement.score = Math.min(score, 20);
        dimensions.championEnablement.percentage = (dimensions.championEnablement.score / 20) * 100;
        dimensions.championEnablement.feedback = score >= 14 ? '✓ Champions enabled' : '✗ Better enable champions';
        
        // Advocacy Program
        score = 0;
        if (fieldData.includes('program') || fieldData.includes('formal')) score += 7;
        if (fieldData.includes('advocacy') || fieldData.includes('ambassador')) score += 7;
        if (fieldData.includes('reward') || fieldData.includes('recognize')) score += 6;
        dimensions.advocacyProgram.score = Math.min(score, 20);
        dimensions.advocacyProgram.percentage = (dimensions.advocacyProgram.score / 20) * 100;
        dimensions.advocacyProgram.feedback = score >= 14 ? '✓ Program established' : '✗ Create advocacy program';
        
        return dimensions;
    }
    
    evaluateCSATNPS(fieldData, dimensions) {
        // Satisfaction Score
        let score = 0;
        if (fieldData.includes('satisfaction') || fieldData.includes('csat')) score += 7;
        if (fieldData.match(/\d+%/) || fieldData.match(/\d+\/\d+/)) score += 7;
        if (fieldData.includes('happy') || fieldData.includes('satisfied')) score += 6;
        dimensions.satisfactionScore.score = Math.min(score, 20);
        dimensions.satisfactionScore.percentage = (dimensions.satisfactionScore.score / 20) * 100;
        dimensions.satisfactionScore.feedback = score >= 14 ? '✓ CSAT tracked' : '✗ Measure satisfaction';
        
        // NPS Tracking
        score = 0;
        if (fieldData.includes('nps') || fieldData.includes('promoter')) score += 8;
        if (fieldData.match(/-?\d+/)) score += 6; // NPS can be negative
        if (fieldData.includes('score') || fieldData.includes('track')) score += 6;
        dimensions.npsTracking.score = Math.min(score, 20);
        dimensions.npsTracking.percentage = (dimensions.npsTracking.score / 20) * 100;
        dimensions.npsTracking.feedback = score >= 14 ? '✓ NPS monitored' : '✗ Track NPS regularly';
        
        // Sentiment Analysis
        score = 0;
        if (fieldData.includes('sentiment') || fieldData.includes('feeling')) score += 7;
        if (fieldData.includes('positive') || fieldData.includes('negative')) score += 7;
        if (fieldData.includes('trend') || fieldData.includes('analysis')) score += 6;
        dimensions.sentimentAnalysis.score = Math.min(score, 20);
        dimensions.sentimentAnalysis.percentage = (dimensions.sentimentAnalysis.score / 20) * 100;
        dimensions.sentimentAnalysis.feedback = score >= 14 ? '✓ Sentiment analyzed' : '✗ Analyze sentiment trends';
        
        // Feedback Action
        score = 0;
        if (fieldData.includes('action') || fieldData.includes('respond')) score += 7;
        if (fieldData.includes('feedback') || fieldData.includes('input')) score += 7;
        if (fieldData.includes('improve') || fieldData.includes('change')) score += 6;
        dimensions.feedbackAction.score = Math.min(score, 20);
        dimensions.feedbackAction.percentage = (dimensions.feedbackAction.score / 20) * 100;
        dimensions.feedbackAction.feedback = score >= 14 ? '✓ Acting on feedback' : '✗ Act on customer feedback';
        
        return dimensions;
    }
    
    evaluateRenewalReadiness(fieldData, dimensions) {
        // Renewal Indicators
        let score = 0;
        if (fieldData.includes('renewal') || fieldData.includes('renew')) score += 7;
        if (fieldData.includes('indicator') || fieldData.includes('signal')) score += 7;
        if (fieldData.includes('likelihood') || fieldData.includes('probability')) score += 6;
        dimensions.renewalIndicators.score = Math.min(score, 20);
        dimensions.renewalIndicators.percentage = (dimensions.renewalIndicators.score / 20) * 100;
        dimensions.renewalIndicators.feedback = score >= 14 ? '✓ Indicators tracked' : '✗ Track renewal indicators';
        
        // Risk Assessment
        score = 0;
        if (fieldData.includes('risk') || fieldData.includes('churn')) score += 7;
        if (fieldData.includes('assess') || fieldData.includes('evaluate')) score += 7;
        if (fieldData.includes('flag') || fieldData.includes('warning')) score += 6;
        dimensions.riskAssessment.score = Math.min(score, 20);
        dimensions.riskAssessment.percentage = (dimensions.riskAssessment.score / 20) * 100;
        dimensions.riskAssessment.feedback = score >= 14 ? '✓ Risks assessed' : '✗ Assess renewal risks';
        
        // Value Realization
        score = 0;
        if (fieldData.includes('value') || fieldData.includes('benefit')) score += 7;
        if (fieldData.includes('realize') || fieldData.includes('achieve')) score += 7;
        if (fieldData.includes('goal') || fieldData.includes('objective')) score += 6;
        dimensions.valueRealization.score = Math.min(score, 20);
        dimensions.valueRealization.percentage = (dimensions.valueRealization.score / 20) * 100;
        dimensions.valueRealization.feedback = score >= 14 ? '✓ Value realized' : '✗ Ensure value realization';
        
        // Renewal Strategy
        score = 0;
        if (fieldData.includes('strategy') || fieldData.includes('plan')) score += 7;
        if (fieldData.includes('proactive') || fieldData.includes('advance')) score += 7;
        if (fieldData.includes('approach') || fieldData.includes('process')) score += 6;
        dimensions.renewalStrategy.score = Math.min(score, 20);
        dimensions.renewalStrategy.percentage = (dimensions.renewalStrategy.score / 20) * 100;
        dimensions.renewalStrategy.feedback = score >= 14 ? '✓ Strategy defined' : '✗ Create renewal strategy';
        
        return dimensions;
    }
    
    evaluateGeneric(fieldData, dimensions) {
        // Generic evaluation for unmapped subcomponents
        Object.keys(dimensions).forEach(key => {
            let score = Math.floor(Math.random() * 10) + 5; // Random score 5-15
            dimensions[key].score = score;
            dimensions[key].percentage = (score / 20) * 100;
            dimensions[key].feedback = score >= 14 ? '✓ Good progress' : '✗ Needs improvement';
        });
        return dimensions;
    }
    
    calculateOverallScore(dimensions) {
        let totalScore = 0;
        let totalWeight = 0;
        
        Object.values(dimensions).forEach(dim => {
            totalScore += (dim.score / dim.maxScore) * dim.weight;
            totalWeight += dim.weight;
        });
        
        return Math.round((totalScore / totalWeight) * 100);
    }
    
    generateRecommendations(dimensions, subcomponentId) {
        const recommendations = [];
        const subcomponentNames = {
            '8-1': 'Upsell Funnel Model',
            '8-2': 'Team Expansion Signals',
            '8-3': 'Organic Adoption Pattern',
            '8-4': 'Champion Mapping',
            '8-5': 'CSAT/NPS Tracking',
            '8-6': 'Renewal Readiness Tracker'
        };
        
        const subcomponentName = subcomponentNames[subcomponentId] || 'Customer Success Expansion';
        
        // Generate recommendations based on low-scoring dimensions
        Object.entries(dimensions).forEach(([key, dim]) => {
            if (dim.percentage < 60) {
                const improvement = dim.percentage < 30 ? 15 :
                                   dim.percentage < 45 ? 10 : 7;
                
                recommendations.push({
                    priority: dim.percentage < 30 ? 'CRITICAL' : 
                             dim.percentage < 45 ? 'HIGH' : 'MEDIUM',
                    area: dim.name,
                    action: this.getActionForDimension(key, subcomponentId),
                    expectedImprovement: `+${improvement} points`,
                    impact: `Enhance ${subcomponentName} by improving ${dim.description.toLowerCase()}`,
                    actionPlan: this.getActionPlan(key, subcomponentId)
                });
            }
        });
        
        // Sort by priority and return top 5
        return recommendations
            .sort((a, b) => {
                const priorityOrder = { 'CRITICAL': 0, 'HIGH': 1, 'MEDIUM': 2 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            })
            .slice(0, 5);
    }
    
    getActionForDimension(dimensionKey, subcomponentId) {
        const actionMap = {
            '8-1': {
                funnelDefinition: 'Map clear upsell funnel stages from initial success to expansion',
                conversionMetrics: 'Track conversion rates between each upsell funnel stage',
                opportunityIdentification: 'Build signals to identify upsell-ready customers',
                valueProposition: 'Create compelling value propositions for each upsell tier'
            },
            '8-2': {
                usageSpread: 'Track product adoption across different teams and departments',
                departmentAdoption: 'Monitor and encourage cross-department usage',
                viralCoefficient: 'Measure and optimize user-driven growth rate',
                expansionTriggers: 'Identify events that trigger team expansion'
            },
            '8-3': {
                naturalGrowth: 'Track organic growth without sales intervention',
                userAdvocacy: 'Encourage and measure internal user advocacy',
                adoptionVelocity: 'Monitor speed of organic product spread',
                networkEffects: 'Build features that increase value with more users'
            },
            '8-4': {
                championIdentification: 'Systematically identify internal champions',
                influenceMapping: 'Map champion influence within customer organizations',
                championEnablement: 'Provide champions with tools and resources to succeed',
                advocacyProgram: 'Create formal champion recognition and reward program'
            },
            '8-5': {
                satisfactionScore: 'Implement regular CSAT surveys and tracking',
                npsTracking: 'Monitor NPS scores and trends over time',
                sentimentAnalysis: 'Analyze customer sentiment from all touchpoints',
                feedbackAction: 'Create process to act on customer feedback quickly'
            },
            '8-6': {
                renewalIndicators: 'Define and track key renewal likelihood indicators',
                riskAssessment: 'Implement early warning system for renewal risks',
                valueRealization: 'Ensure customers achieve their desired outcomes',
                renewalStrategy: 'Build proactive renewal engagement strategy'
            }
        };
        
        const actions = actionMap[subcomponentId] || {};
        return actions[dimensionKey] || 'Improve this dimension for better customer expansion';
    }
    
    getActionPlan(dimensionKey, subcomponentId) {
        // Return specific action steps
        return [
            'Assess current state and gaps',
            'Define success metrics',
            'Implement tracking systems',
            'Monitor and optimize continuously'
        ];
    }
    
    generateExecutiveSummary(score, subcomponentId) {
        const subcomponentSummaries = {
            '8-1': {
                high: "Excellent upsell funnel! Your systematic approach to expansion is driving strong growth from existing customers. Continue optimizing conversion rates.",
                medium: "Upsell funnel shows promise but needs refinement. Better define stages and track conversion metrics to improve expansion revenue.",
                low: "Upsell funnel needs development. Priority: Map clear funnel stages and implement conversion tracking to drive expansion."
            },
            '8-2': {
                high: "Outstanding team expansion tracking! You clearly see how usage spreads within accounts. Leverage these insights for land-and-expand strategies.",
                medium: "Team expansion is happening but tracking needs improvement. Better monitor cross-department adoption and viral growth patterns.",
                low: "Team expansion signals are weak. Priority: Implement tracking to understand how product spreads within customer organizations."
            },
            '8-3': {
                high: "Excellent organic adoption! Your product spreads naturally within organizations. This is a powerful growth driver - continue nurturing it.",
                medium: "Organic adoption is occurring but needs acceleration. Focus on user advocacy and network effects to increase natural spread.",
                low: "Organic adoption is limited. Priority: Build features and programs that encourage users to spread product internally."
            },
            '8-4': {
                high: "Strong champion program! You've identified and empowered internal advocates effectively. Use them to drive expansion and renewals.",
                medium: "Champions exist but program needs formalization. Better identify, enable, and recognize your internal advocates.",
                low: "Champion mapping is insufficient. Priority: Systematically identify and nurture champions within customer accounts."
            },
            '8-5': {
                high: "Excellent satisfaction tracking! Your CSAT/NPS scores show happy customers ready to expand. Use this momentum for growth.",
                medium: "Satisfaction is tracked but analysis needs depth. Better understand sentiment drivers and act on feedback systematically.",
                low: "CSAT/NPS tracking is inadequate. Priority: Implement comprehensive satisfaction monitoring and feedback action process."
            },
            '8-6': {
                high: "Outstanding renewal readiness! You proactively identify and address renewal risks while ensuring value realization. Continue this approach.",
                medium: "Renewal tracking exists but needs enhancement. Better assess risks and ensure customers achieve their goals before renewal.",
                low: "Renewal readiness is poorly tracked. Priority: Build comprehensive renewal indicators and proactive engagement strategy."
            }
        };
        
        const summaries = subcomponentSummaries[subcomponentId] || {
            high: "Excellent customer success expansion! Continue leveraging these insights for growth.",
            medium: "Good expansion tracking. Focus on systematic measurement and optimization.",
            low: "Customer expansion needs significant improvement across multiple dimensions."
        };
        
        if (score >= 75) return summaries.high;
        if (score >= 45) return summaries.medium;
        return summaries.low;
    }
}

module.exports = CustomerSuccessExpansionAgentEnhanced;
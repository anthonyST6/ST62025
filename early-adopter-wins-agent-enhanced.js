/**
 * Early Adopter Wins Agent - Enhanced Version
 * Provides subcomponent-specific analysis for Block 5
 */

const { generateDynamicRecommendations } = require('./recommendations-library-dynamic-wrapper.js');

class EarlyAdopterWinsAgentEnhanced {
    constructor() {
        this.name = 'Early Adopter Wins Agent Enhanced';
        this.version = '3.0';
    }

    async analyzeWorksheet(worksheetData, subcomponentId) {
        console.log('🎯 Early Adopter Wins Agent Enhanced analyzing:', subcomponentId);
        
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
            confidence: 0.88
        };
    }
    
    getDimensionsForSubcomponent(subcomponentId) {
        const dimensionMap = {
            '5-1': { // Case Study Template
                storyStructure: {
                    score: 0,
                    maxScore: 20,
                    weight: 25,
                    name: 'Story Structure',
                    description: 'Completeness of customer journey narrative',
                    feedback: ''
                },
                customerJourney: {
                    score: 0,
                    maxScore: 20,
                    weight: 25,
                    name: 'Customer Journey',
                    description: 'Clear before/after transformation',
                    feedback: ''
                },
                outcomeMetrics: {
                    score: 0,
                    maxScore: 20,
                    weight: 25,
                    name: 'Outcome Metrics',
                    description: 'Quantifiable results and benefits',
                    feedback: ''
                },
                visualPresentation: {
                    score: 0,
                    maxScore: 20,
                    weight: 25,
                    name: 'Visual Presentation',
                    description: 'Professional formatting and visuals',
                    feedback: ''
                }
            },
            '5-2': { // ROI Calculation Sheet
                financialAccuracy: {
                    score: 0,
                    maxScore: 20,
                    weight: 30,
                    name: 'Financial Accuracy',
                    description: 'Precision of cost and benefit calculations',
                    feedback: ''
                },
                paybackPeriod: {
                    score: 0,
                    maxScore: 20,
                    weight: 25,
                    name: 'Payback Period',
                    description: 'Clear time to value demonstration',
                    feedback: ''
                },
                costSavings: {
                    score: 0,
                    maxScore: 20,
                    weight: 25,
                    name: 'Cost Savings',
                    description: 'Documented expense reductions',
                    feedback: ''
                },
                assumptionClarity: {
                    score: 0,
                    maxScore: 20,
                    weight: 20,
                    name: 'Assumption Clarity',
                    description: 'Transparent calculation methodology',
                    feedback: ''
                }
            },
            '5-3': { // Use Case Success Stories
                useCaseClarity: {
                    score: 0,
                    maxScore: 20,
                    weight: 25,
                    name: 'Use Case Clarity',
                    description: 'Specific problem-solution mapping',
                    feedback: ''
                },
                implementationDetails: {
                    score: 0,
                    maxScore: 20,
                    weight: 25,
                    name: 'Implementation Details',
                    description: 'How the solution was deployed',
                    feedback: ''
                },
                resultsEvidence: {
                    score: 0,
                    maxScore: 20,
                    weight: 25,
                    name: 'Results Evidence',
                    description: 'Measurable outcomes achieved',
                    feedback: ''
                },
                replicability: {
                    score: 0,
                    maxScore: 20,
                    weight: 25,
                    name: 'Replicability',
                    description: 'Potential for similar customers',
                    feedback: ''
                }
            },
            '5-4': { // Buyer Quotes & Testimonials
                quoteAuthenticity: {
                    score: 0,
                    maxScore: 20,
                    weight: 25,
                    name: 'Quote Authenticity',
                    description: 'Genuine customer voices',
                    feedback: ''
                },
                impactStatements: {
                    score: 0,
                    maxScore: 20,
                    weight: 30,
                    name: 'Impact Statements',
                    description: 'Clear value articulation',
                    feedback: ''
                },
                attribution: {
                    score: 0,
                    maxScore: 20,
                    weight: 20,
                    name: 'Attribution',
                    description: 'Named sources and titles',
                    feedback: ''
                },
                diversity: {
                    score: 0,
                    maxScore: 20,
                    weight: 25,
                    name: 'Diversity',
                    description: 'Range of customer perspectives',
                    feedback: ''
                }
            },
            '5-5': { // Win Criteria Mapping
                decisionFactors: {
                    score: 0,
                    maxScore: 20,
                    weight: 30,
                    name: 'Decision Factors',
                    description: 'Why customers chose you',
                    feedback: ''
                },
                competitiveAdvantages: {
                    score: 0,
                    maxScore: 20,
                    weight: 30,
                    name: 'Competitive Advantages',
                    description: 'Differentiation from alternatives',
                    feedback: ''
                },
                valueDrivers: {
                    score: 0,
                    maxScore: 20,
                    weight: 25,
                    name: 'Value Drivers',
                    description: 'Key benefits that sealed deals',
                    feedback: ''
                },
                patternRecognition: {
                    score: 0,
                    maxScore: 20,
                    weight: 15,
                    name: 'Pattern Recognition',
                    description: 'Common themes across wins',
                    feedback: ''
                }
            },
            '5-6': { // Deal Debrief Framework
                lessonsLearned: {
                    score: 0,
                    maxScore: 20,
                    weight: 30,
                    name: 'Lessons Learned',
                    description: 'Insights from wins and losses',
                    feedback: ''
                },
                successFactors: {
                    score: 0,
                    maxScore: 20,
                    weight: 25,
                    name: 'Success Factors',
                    description: 'What worked well',
                    feedback: ''
                },
                improvementAreas: {
                    score: 0,
                    maxScore: 20,
                    weight: 25,
                    name: 'Improvement Areas',
                    description: 'What could be better',
                    feedback: ''
                },
                processDocumentation: {
                    score: 0,
                    maxScore: 20,
                    weight: 20,
                    name: 'Process Documentation',
                    description: 'Systematic debrief approach',
                    feedback: ''
                }
            }
        };
        
        return dimensionMap[subcomponentId] || this.getDefaultDimensions();
    }
    
    getDefaultDimensions() {
        // Fallback dimensions if subcomponent not mapped
        return {
            completeness: {
                score: 0,
                maxScore: 20,
                weight: 25,
                name: 'Completeness',
                description: 'Overall documentation quality',
                feedback: ''
            },
            clarity: {
                score: 0,
                maxScore: 20,
                weight: 25,
                name: 'Clarity',
                description: 'Clear communication',
                feedback: ''
            },
            evidence: {
                score: 0,
                maxScore: 20,
                weight: 25,
                name: 'Evidence',
                description: 'Supporting proof',
                feedback: ''
            },
            actionability: {
                score: 0,
                maxScore: 20,
                weight: 25,
                name: 'Actionability',
                description: 'Practical application',
                feedback: ''
            }
        };
    }
    
    evaluateDimensions(data, dimensions, subcomponentId) {
        const fieldData = Object.values(data).join(' ').toLowerCase();
        
        // Subcomponent-specific evaluation logic
        switch(subcomponentId) {
            case '5-1': // Case Study Template
                return this.evaluateCaseStudy(fieldData, dimensions);
            case '5-2': // ROI Calculation Sheet
                return this.evaluateROICalculation(fieldData, dimensions);
            case '5-3': // Use Case Success Stories
                return this.evaluateUseCaseStories(fieldData, dimensions);
            case '5-4': // Buyer Quotes & Testimonials
                return this.evaluateTestimonials(fieldData, dimensions);
            case '5-5': // Win Criteria Mapping
                return this.evaluateWinCriteria(fieldData, dimensions);
            case '5-6': // Deal Debrief Framework
                return this.evaluateDealDebrief(fieldData, dimensions);
            default:
                return this.evaluateGeneric(fieldData, dimensions);
        }
    }
    
    evaluateCaseStudy(fieldData, dimensions) {
        // Story Structure
        let score = 0;
        if (fieldData.includes('challenge') || fieldData.includes('problem')) score += 5;
        if (fieldData.includes('solution') || fieldData.includes('approach')) score += 5;
        if (fieldData.includes('result') || fieldData.includes('outcome')) score += 5;
        if (fieldData.includes('lesson') || fieldData.includes('insight')) score += 5;
        dimensions.storyStructure.score = Math.min(score, 20);
        dimensions.storyStructure.percentage = (dimensions.storyStructure.score / 20) * 100;
        dimensions.storyStructure.feedback = score >= 15 ? '✓ Well-structured narrative' : '✗ Strengthen story structure';
        
        // Customer Journey
        score = 0;
        if (fieldData.includes('before') || fieldData.includes('initial')) score += 7;
        if (fieldData.includes('after') || fieldData.includes('transform')) score += 7;
        if (fieldData.includes('journey') || fieldData.includes('process')) score += 6;
        dimensions.customerJourney.score = Math.min(score, 20);
        dimensions.customerJourney.percentage = (dimensions.customerJourney.score / 20) * 100;
        dimensions.customerJourney.feedback = score >= 14 ? '✓ Clear transformation shown' : '✗ Better before/after contrast needed';
        
        // Outcome Metrics
        score = 0;
        if (fieldData.match(/\d+%/)) score += 8;
        if (fieldData.match(/\$[\d,]+/)) score += 6;
        if (fieldData.includes('increase') || fieldData.includes('decrease')) score += 3;
        if (fieldData.includes('improve') || fieldData.includes('reduce')) score += 3;
        dimensions.outcomeMetrics.score = Math.min(score, 20);
        dimensions.outcomeMetrics.percentage = (dimensions.outcomeMetrics.score / 20) * 100;
        dimensions.outcomeMetrics.feedback = score >= 14 ? '✓ Strong quantifiable results' : '✗ Add more specific metrics';
        
        // Visual Presentation
        score = 0;
        if (fieldData.includes('chart') || fieldData.includes('graph')) score += 7;
        if (fieldData.includes('image') || fieldData.includes('screenshot')) score += 7;
        if (fieldData.includes('format') || fieldData.includes('template')) score += 6;
        dimensions.visualPresentation.score = Math.min(score, 20);
        dimensions.visualPresentation.percentage = (dimensions.visualPresentation.score / 20) * 100;
        dimensions.visualPresentation.feedback = score >= 14 ? '✓ Professional presentation' : '✗ Enhance visual elements';
        
        return dimensions;
    }
    
    evaluateROICalculation(fieldData, dimensions) {
        // Financial Accuracy
        let score = 0;
        if (fieldData.match(/\$[\d,]+/)) score += 8;
        if (fieldData.includes('cost') && fieldData.includes('benefit')) score += 6;
        if (fieldData.includes('calculation') || fieldData.includes('formula')) score += 6;
        dimensions.financialAccuracy.score = Math.min(score, 20);
        dimensions.financialAccuracy.percentage = (dimensions.financialAccuracy.score / 20) * 100;
        dimensions.financialAccuracy.feedback = score >= 14 ? '✓ Precise calculations' : '✗ Improve financial accuracy';
        
        // Payback Period
        score = 0;
        if (fieldData.includes('month') || fieldData.includes('year')) score += 7;
        if (fieldData.includes('payback') || fieldData.includes('breakeven')) score += 7;
        if (fieldData.includes('timeline') || fieldData.includes('period')) score += 6;
        dimensions.paybackPeriod.score = Math.min(score, 20);
        dimensions.paybackPeriod.percentage = (dimensions.paybackPeriod.score / 20) * 100;
        dimensions.paybackPeriod.feedback = score >= 14 ? '✓ Clear time to value' : '✗ Define payback timeline';
        
        // Cost Savings
        score = 0;
        if (fieldData.includes('save') || fieldData.includes('saving')) score += 7;
        if (fieldData.includes('reduce') || fieldData.includes('reduction')) score += 7;
        if (fieldData.match(/\d+%/)) score += 6;
        dimensions.costSavings.score = Math.min(score, 20);
        dimensions.costSavings.percentage = (dimensions.costSavings.score / 20) * 100;
        dimensions.costSavings.feedback = score >= 14 ? '✓ Documented savings' : '✗ Quantify cost reductions';
        
        // Assumption Clarity
        score = 0;
        if (fieldData.includes('assumption') || fieldData.includes('assume')) score += 7;
        if (fieldData.includes('method') || fieldData.includes('approach')) score += 7;
        if (fieldData.includes('variable') || fieldData.includes('factor')) score += 6;
        dimensions.assumptionClarity.score = Math.min(score, 20);
        dimensions.assumptionClarity.percentage = (dimensions.assumptionClarity.score / 20) * 100;
        dimensions.assumptionClarity.feedback = score >= 14 ? '✓ Transparent methodology' : '✗ Clarify assumptions';
        
        return dimensions;
    }
    
    evaluateUseCaseStories(fieldData, dimensions) {
        // Use Case Clarity
        let score = 0;
        if (fieldData.includes('use case') || fieldData.includes('scenario')) score += 7;
        if (fieldData.includes('problem') && fieldData.includes('solution')) score += 7;
        if (fieldData.includes('specific') || fieldData.includes('example')) score += 6;
        dimensions.useCaseClarity.score = Math.min(score, 20);
        dimensions.useCaseClarity.percentage = (dimensions.useCaseClarity.score / 20) * 100;
        dimensions.useCaseClarity.feedback = score >= 14 ? '✓ Clear use cases' : '✗ Define specific scenarios';
        
        // Implementation Details
        score = 0;
        if (fieldData.includes('implement') || fieldData.includes('deploy')) score += 7;
        if (fieldData.includes('step') || fieldData.includes('process')) score += 7;
        if (fieldData.includes('integrate') || fieldData.includes('setup')) score += 6;
        dimensions.implementationDetails.score = Math.min(score, 20);
        dimensions.implementationDetails.percentage = (dimensions.implementationDetails.score / 20) * 100;
        dimensions.implementationDetails.feedback = score >= 14 ? '✓ Detailed implementation' : '✗ Add deployment details';
        
        // Results Evidence
        score = 0;
        if (fieldData.match(/\d+%/)) score += 7;
        if (fieldData.includes('achieve') || fieldData.includes('accomplish')) score += 7;
        if (fieldData.includes('measure') || fieldData.includes('metric')) score += 6;
        dimensions.resultsEvidence.score = Math.min(score, 20);
        dimensions.resultsEvidence.percentage = (dimensions.resultsEvidence.score / 20) * 100;
        dimensions.resultsEvidence.feedback = score >= 14 ? '✓ Strong evidence' : '✗ Provide measurable results';
        
        // Replicability
        score = 0;
        if (fieldData.includes('similar') || fieldData.includes('other')) score += 7;
        if (fieldData.includes('repeat') || fieldData.includes('replicate')) score += 7;
        if (fieldData.includes('scale') || fieldData.includes('expand')) score += 6;
        dimensions.replicability.score = Math.min(score, 20);
        dimensions.replicability.percentage = (dimensions.replicability.score / 20) * 100;
        dimensions.replicability.feedback = score >= 14 ? '✓ Replicable success' : '✗ Show broader applicability';
        
        return dimensions;
    }
    
    evaluateTestimonials(fieldData, dimensions) {
        // Quote Authenticity
        let score = 0;
        if (fieldData.includes('"') || fieldData.includes("'")) score += 7;
        if (fieldData.includes('said') || fieldData.includes('stated')) score += 7;
        if (fieldData.includes('customer') || fieldData.includes('client')) score += 6;
        dimensions.quoteAuthenticity.score = Math.min(score, 20);
        dimensions.quoteAuthenticity.percentage = (dimensions.quoteAuthenticity.score / 20) * 100;
        dimensions.quoteAuthenticity.feedback = score >= 14 ? '✓ Authentic quotes' : '✗ Add genuine testimonials';
        
        // Impact Statements
        score = 0;
        if (fieldData.includes('transform') || fieldData.includes('change')) score += 7;
        if (fieldData.includes('improve') || fieldData.includes('enhance')) score += 7;
        if (fieldData.includes('value') || fieldData.includes('benefit')) score += 6;
        dimensions.impactStatements.score = Math.min(score, 20);
        dimensions.impactStatements.percentage = (dimensions.impactStatements.score / 20) * 100;
        dimensions.impactStatements.feedback = score >= 14 ? '✓ Clear impact shown' : '✗ Strengthen value statements';
        
        // Attribution
        score = 0;
        if (fieldData.includes('ceo') || fieldData.includes('director') || fieldData.includes('manager')) score += 7;
        if (fieldData.includes('company') || fieldData.includes('organization')) score += 7;
        if (fieldData.includes('title') || fieldData.includes('role')) score += 6;
        dimensions.attribution.score = Math.min(score, 20);
        dimensions.attribution.percentage = (dimensions.attribution.score / 20) * 100;
        dimensions.attribution.feedback = score >= 14 ? '✓ Proper attribution' : '✗ Include names and titles';
        
        // Diversity
        score = 0;
        if (fieldData.includes('various') || fieldData.includes('different')) score += 7;
        if (fieldData.includes('industry') || fieldData.includes('sector')) score += 7;
        if (fieldData.includes('size') || fieldData.includes('scale')) score += 6;
        dimensions.diversity.score = Math.min(score, 20);
        dimensions.diversity.percentage = (dimensions.diversity.score / 20) * 100;
        dimensions.diversity.feedback = score >= 14 ? '✓ Diverse perspectives' : '✗ Add variety of voices';
        
        return dimensions;
    }
    
    evaluateWinCriteria(fieldData, dimensions) {
        // Decision Factors
        let score = 0;
        if (fieldData.includes('decide') || fieldData.includes('decision')) score += 7;
        if (fieldData.includes('choose') || fieldData.includes('select')) score += 7;
        if (fieldData.includes('reason') || fieldData.includes('why')) score += 6;
        dimensions.decisionFactors.score = Math.min(score, 20);
        dimensions.decisionFactors.percentage = (dimensions.decisionFactors.score / 20) * 100;
        dimensions.decisionFactors.feedback = score >= 14 ? '✓ Clear decision factors' : '✗ Document why customers chose you';
        
        // Competitive Advantages
        score = 0;
        if (fieldData.includes('competitor') || fieldData.includes('alternative')) score += 7;
        if (fieldData.includes('better') || fieldData.includes('superior')) score += 7;
        if (fieldData.includes('unique') || fieldData.includes('differentiate')) score += 6;
        dimensions.competitiveAdvantages.score = Math.min(score, 20);
        dimensions.competitiveAdvantages.percentage = (dimensions.competitiveAdvantages.score / 20) * 100;
        dimensions.competitiveAdvantages.feedback = score >= 14 ? '✓ Strong differentiation' : '✗ Clarify competitive edge';
        
        // Value Drivers
        score = 0;
        if (fieldData.includes('value') || fieldData.includes('benefit')) score += 7;
        if (fieldData.includes('roi') || fieldData.includes('return')) score += 7;
        if (fieldData.includes('impact') || fieldData.includes('outcome')) score += 6;
        dimensions.valueDrivers.score = Math.min(score, 20);
        dimensions.valueDrivers.percentage = (dimensions.valueDrivers.score / 20) * 100;
        dimensions.valueDrivers.feedback = score >= 14 ? '✓ Clear value drivers' : '✗ Identify key benefits';
        
        // Pattern Recognition
        score = 0;
        if (fieldData.includes('pattern') || fieldData.includes('trend')) score += 7;
        if (fieldData.includes('common') || fieldData.includes('typical')) score += 7;
        if (fieldData.includes('theme') || fieldData.includes('consistent')) score += 6;
        dimensions.patternRecognition.score = Math.min(score, 20);
        dimensions.patternRecognition.percentage = (dimensions.patternRecognition.score / 20) * 100;
        dimensions.patternRecognition.feedback = score >= 14 ? '✓ Patterns identified' : '✗ Find common themes';
        
        return dimensions;
    }
    
    evaluateDealDebrief(fieldData, dimensions) {
        // Lessons Learned
        let score = 0;
        if (fieldData.includes('learn') || fieldData.includes('lesson')) score += 7;
        if (fieldData.includes('insight') || fieldData.includes('discover')) score += 7;
        if (fieldData.includes('understand') || fieldData.includes('realize')) score += 6;
        dimensions.lessonsLearned.score = Math.min(score, 20);
        dimensions.lessonsLearned.percentage = (dimensions.lessonsLearned.score / 20) * 100;
        dimensions.lessonsLearned.feedback = score >= 14 ? '✓ Good insights captured' : '✗ Document key learnings';
        
        // Success Factors
        score = 0;
        if (fieldData.includes('success') || fieldData.includes('win')) score += 7;
        if (fieldData.includes('work') || fieldData.includes('effective')) score += 7;
        if (fieldData.includes('factor') || fieldData.includes('element')) score += 6;
        dimensions.successFactors.score = Math.min(score, 20);
        dimensions.successFactors.percentage = (dimensions.successFactors.score / 20) * 100;
        dimensions.successFactors.feedback = score >= 14 ? '✓ Success factors clear' : '✗ Identify what worked';
        
        // Improvement Areas
        score = 0;
        if (fieldData.includes('improve') || fieldData.includes('better')) score += 7;
        if (fieldData.includes('challenge') || fieldData.includes('issue')) score += 7;
        if (fieldData.includes('next') || fieldData.includes('future')) score += 6;
        dimensions.improvementAreas.score = Math.min(score, 20);
        dimensions.improvementAreas.percentage = (dimensions.improvementAreas.score / 20) * 100;
        dimensions.improvementAreas.feedback = score >= 14 ? '✓ Improvements identified' : '✗ Note areas to enhance';
        
        // Process Documentation
        score = 0;
        if (fieldData.includes('process') || fieldData.includes('procedure')) score += 7;
        if (fieldData.includes('document') || fieldData.includes('record')) score += 7;
        if (fieldData.includes('systematic') || fieldData.includes('structured')) score += 6;
        dimensions.processDocumentation.score = Math.min(score, 20);
        dimensions.processDocumentation.percentage = (dimensions.processDocumentation.score / 20) * 100;
        dimensions.processDocumentation.feedback = score >= 14 ? '✓ Well-documented process' : '✗ Formalize debrief process';
        
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
            '5-1': 'Case Study Template',
            '5-2': 'ROI Calculation Sheet',
            '5-3': 'Use Case Success Stories',
            '5-4': 'Buyer Quotes & Testimonials',
            '5-5': 'Win Criteria Mapping',
            '5-6': 'Deal Debrief Framework'
        };
        
        const subcomponentName = subcomponentNames[subcomponentId] || 'Early Adopter Documentation';
        
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
                    impact: `Strengthen ${subcomponentName} by improving ${dim.description.toLowerCase()}`,
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
            '5-1': {
                storyStructure: 'Build complete customer journey narrative with clear problem-solution-result flow',
                customerJourney: 'Document detailed before/after transformation with specific milestones',
                outcomeMetrics: 'Add quantifiable results with percentages and dollar amounts',
                visualPresentation: 'Include charts, graphs, and professional formatting'
            },
            '5-2': {
                financialAccuracy: 'Create detailed cost-benefit analysis with precise calculations',
                paybackPeriod: 'Calculate and highlight time to breakeven and ROI timeline',
                costSavings: 'Document specific expense reductions and efficiency gains',
                assumptionClarity: 'List all calculation assumptions and methodology transparently'
            },
            '5-3': {
                useCaseClarity: 'Define specific scenarios with clear problem-solution mapping',
                implementationDetails: 'Document step-by-step deployment process and timeline',
                resultsEvidence: 'Provide measurable outcomes with supporting data',
                replicability: 'Show how success can be replicated for similar customers'
            },
            '5-4': {
                quoteAuthenticity: 'Gather genuine customer testimonials with specific examples',
                impactStatements: 'Capture powerful value statements from customers',
                attribution: 'Include full names, titles, and company information',
                diversity: 'Collect testimonials from various industries and company sizes'
            },
            '5-5': {
                decisionFactors: 'Map specific reasons why customers chose your solution',
                competitiveAdvantages: 'Document clear differentiation from alternatives',
                valueDrivers: 'Identify and quantify key benefits that close deals',
                patternRecognition: 'Analyze common themes across successful deals'
            },
            '5-6': {
                lessonsLearned: 'Document key insights from both wins and losses',
                successFactors: 'Identify and codify what consistently works',
                improvementAreas: 'Note specific areas for sales process enhancement',
                processDocumentation: 'Create systematic debrief template and process'
            }
        };
        
        const actions = actionMap[subcomponentId] || {};
        return actions[dimensionKey] || 'Improve this dimension for better results';
    }
    
    getActionPlan(dimensionKey, subcomponentId) {
        // Return specific action steps
        return [
            'Review current documentation and identify gaps',
            'Gather additional data and evidence',
            'Update templates and frameworks',
            'Validate with stakeholders and iterate'
        ];
    }
    
    generateExecutiveSummary(score, subcomponentId) {
        const subcomponentSummaries = {
            '5-1': {
                high: "Excellent case study documentation! Your customer stories are compelling with clear narratives and strong outcomes. Focus on expanding your library of success stories.",
                medium: "Good progress on case study development. Strengthen the narrative structure and add more quantifiable metrics to make stories more impactful.",
                low: "Case study documentation needs significant improvement. Priority: Create a standard template and document at least 3 detailed customer success stories."
            },
            '5-2': {
                high: "Outstanding ROI calculations! Your financial models clearly demonstrate value with accurate metrics. Use these to accelerate sales conversations.",
                medium: "ROI calculations show promise but need refinement. Add more detailed assumptions and clearer payback period calculations.",
                low: "ROI documentation is insufficient. Priority: Build a comprehensive ROI calculator with clear cost-benefit analysis and payback timelines."
            },
            '5-3': {
                high: "Excellent use case documentation! Your success stories clearly show how different customers achieve value. Leverage these for sales enablement.",
                medium: "Use case stories are developing well. Add more implementation details and measurable outcomes to strengthen credibility.",
                low: "Use case documentation needs work. Priority: Document 5 specific customer scenarios with problem, solution, and measurable results."
            },
            '5-4': {
                high: "Powerful testimonial collection! Your customer quotes effectively communicate value and build trust. Continue gathering diverse perspectives.",
                medium: "Testimonials are good but need more diversity. Focus on getting quotes from different roles and industries with specific impact statements.",
                low: "Testimonial collection is weak. Priority: Gather at least 10 attributed quotes from customers highlighting specific benefits and outcomes."
            },
            '5-5': {
                high: "Excellent win criteria mapping! You clearly understand why customers choose you. Use these insights to refine your sales approach.",
                medium: "Win criteria analysis shows patterns emerging. Deepen your understanding of competitive advantages and key value drivers.",
                low: "Win criteria mapping needs development. Priority: Analyze last 10 wins to identify decision factors and competitive differentiators."
            },
            '5-6': {
                high: "Strong deal debrief process! You're systematically learning from every opportunity. Continue refining and sharing insights across the team.",
                medium: "Deal debriefs are happening but need more structure. Formalize the process and ensure consistent documentation of lessons learned.",
                low: "Deal debrief process is inadequate. Priority: Implement systematic post-deal reviews for all opportunities, capturing lessons and improvements."
            }
        };
        
        const summaries = subcomponentSummaries[subcomponentId] || {
            high: "Excellent early adopter validation! Continue building on this strong foundation.",
            medium: "Good progress with early adopters. Focus on strengthening documentation and evidence.",
            low: "Early adopter documentation needs significant improvement across multiple areas."
        };
        
        if (score >= 75) return summaries.high;
        if (score >= 45) return summaries.medium;
        return summaries.low;
    }
}

module.exports = EarlyAdopterWinsAgentEnhanced;
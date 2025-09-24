const { generateDynamicRecommendations } = require('./recommendations-library-dynamic-wrapper');
// Use Case Scoring Model Agent - Strategic Prioritization (3-1)
// Evaluates use cases across multiple criteria for prioritization

class UseCaseScoringAgentEnhanced {
    constructor() {
        this.name = 'Use Case Scoring Model Agent';
        this.version = '2.0.0';
        this.capabilities = [
            'use_case_definition',
            'value_assessment',
            'feasibility_analysis',
            'market_alignment',
            'scoring_framework'
        ];
    }

    analyzeWorksheet(worksheetData) {
        console.log('📊 Use Case Scoring Agent: Starting analysis...');
        
        // Parse worksheet data - support both field-N and fieldN formats
        const data = this.parseWorksheetData(worksheetData);
        console.log('📋 Parsed use case scoring data');
        
        // Evaluate each dimension with fair scoring
        const scores = {
            useCaseDefinition: this.evaluateUseCaseDefinition(data),
            valueAssessment: this.evaluateValueAssessment(data),
            feasibilityAnalysis: this.evaluateFeasibilityAnalysis(data),
            marketAlignment: this.evaluateMarketAlignment(data),
            scoringFramework: this.evaluateScoringFramework(data)
        };
        
        // Log individual scores for debugging
        Object.entries(scores).forEach(([key, score]) => {
            console.log(`📊 ${key}: ${score.percentage}%`);
        });
        
        // Calculate overall score
        const overallScore = this.calculateOverallScore(scores);
        
        // Generate recommendations
        const recommendations = this.generateRecommendations(scores);
        
        // Generate summary
        const summary = this.generateSummary(overallScore, scores);
        
        console.log(`✅ Use Case Scoring Analysis complete: ${overallScore}%`);
        
        return {
            score: overallScore,
            analysis: {
                executiveSummary: summary
            },
            detailedScores: scores,
            recommendations: recommendations,
            timestamp: new Date().toISOString()
        };
    }

    parseWorksheetData(data) {
        // Support both field-N and fieldN formats
        const parsed = {};
        
        // Map field names to our internal structure
        const fieldMappings = {
            'use-cases': ['field-1', 'field1', 'use-cases', 'useCases'],
            'value-metrics': ['field-2', 'field2', 'value-metrics', 'valueMetrics'],
            'feasibility': ['field-3', 'field3', 'feasibility'],
            'market-fit': ['field-4', 'field4', 'market-fit', 'marketFit'],
            'scoring-criteria': ['field-5', 'field5', 'scoring-criteria', 'scoringCriteria'],
            'prioritization': ['field-6', 'field6', 'prioritization']
        };
        
        // Extract data using flexible field mapping
        for (const [key, possibleFields] of Object.entries(fieldMappings)) {
            for (const field of possibleFields) {
                if (data[field]) {
                    parsed[key] = data[field];
                    break;
                }
            }
        }
        
        return parsed;
    }

    evaluateUseCaseDefinition(data) {
        const content = data['use-cases'] || '';
        const length = content.length;
        
        // Fair scoring with base points for any substantive answer
        let score = 0;
        const maxScore = 20;
        
        // Base score for any substantive answer (40% = 8 points)
        if (length > 50) {
            score = 8;
        }
        
        // Additional points for quality indicators
        const qualityIndicators = [
            { pattern: /customer|user|buyer|stakeholder/gi, points: 2, label: 'customer focus' },
            { pattern: /problem|pain|challenge|issue/gi, points: 2, label: 'problem identification' },
            { pattern: /solution|feature|capability|benefit/gi, points: 2, label: 'solution mapping' },
            { pattern: /value|impact|outcome|result/gi, points: 2, label: 'value articulation' },
            { pattern: /specific|clear|defined|measurable/gi, points: 2, label: 'specificity' },
            { pattern: /priority|critical|essential|must-have/gi, points: 2, label: 'prioritization' }
        ];
        
        const foundIndicators = [];
        qualityIndicators.forEach(indicator => {
            if (indicator.pattern.test(content)) {
                score = Math.min(score + indicator.points, maxScore);
                foundIndicators.push(indicator.label);
            }
        });
        
        // Length bonus for comprehensive coverage
        if (length > 200) score = Math.min(score + 2, maxScore);
        if (length > 400) score = Math.min(score + 2, maxScore);
        
        const percentage = Math.round((score / maxScore) * 100);
        
        return {
            score: score,
            maxScore: maxScore,
            percentage: percentage,
            weight: 20,
            feedback: this.generateUseCaseFeedback(percentage, foundIndicators)
        };
    }

    evaluateValueAssessment(data) {
        const content = data['value-metrics'] || '';
        const length = content.length;
        
        let score = 0;
        const maxScore = 20;
        
        // Base score for any substantive answer
        if (length > 50) {
            score = 8;
        }
        
        // Value assessment indicators
        const valueIndicators = [
            { pattern: /revenue|cost|savings|roi|payback/gi, points: 3, label: 'financial metrics' },
            { pattern: /time|efficiency|productivity|speed/gi, points: 2, label: 'efficiency gains' },
            { pattern: /quality|accuracy|error|defect/gi, points: 2, label: 'quality improvements' },
            { pattern: /customer satisfaction|nps|retention|churn/gi, points: 3, label: 'customer metrics' },
            { pattern: /\d+%|\$\d+|[0-9]+x/gi, points: 3, label: 'quantified value' },
            { pattern: /market size|tam|sam|som/gi, points: 2, label: 'market opportunity' }
        ];
        
        const foundIndicators = [];
        valueIndicators.forEach(indicator => {
            if (indicator.pattern.test(content)) {
                score = Math.min(score + indicator.points, maxScore);
                foundIndicators.push(indicator.label);
            }
        });
        
        // Length bonus
        if (length > 200) score = Math.min(score + 2, maxScore);
        if (length > 400) score = Math.min(score + 1, maxScore);
        
        const percentage = Math.round((score / maxScore) * 100);
        
        return {
            score: score,
            maxScore: maxScore,
            percentage: percentage,
            weight: 20,
            feedback: this.generateValueFeedback(percentage, foundIndicators)
        };
    }

    evaluateFeasibilityAnalysis(data) {
        const content = data['feasibility'] || '';
        const length = content.length;
        
        let score = 0;
        const maxScore = 20;
        
        // Base score for any substantive answer
        if (length > 50) {
            score = 8;
        }
        
        // Feasibility indicators
        const feasibilityIndicators = [
            { pattern: /technical|technology|architecture|infrastructure/gi, points: 2, label: 'technical assessment' },
            { pattern: /resource|team|skill|capability/gi, points: 2, label: 'resource evaluation' },
            { pattern: /timeline|schedule|milestone|deadline/gi, points: 2, label: 'timeline planning' },
            { pattern: /risk|challenge|dependency|constraint/gi, points: 3, label: 'risk identification' },
            { pattern: /mvp|prototype|pilot|phase/gi, points: 2, label: 'phased approach' },
            { pattern: /budget|cost|investment|funding/gi, points: 2, label: 'financial planning' }
        ];
        
        const foundIndicators = [];
        feasibilityIndicators.forEach(indicator => {
            if (indicator.pattern.test(content)) {
                score = Math.min(score + indicator.points, maxScore);
                foundIndicators.push(indicator.label);
            }
        });
        
        // Length bonus
        if (length > 200) score = Math.min(score + 2, maxScore);
        if (length > 400) score = Math.min(score + 2, maxScore);
        
        const percentage = Math.round((score / maxScore) * 100);
        
        return {
            score: score,
            maxScore: maxScore,
            percentage: percentage,
            weight: 20,
            feedback: this.generateFeasibilityFeedback(percentage, foundIndicators)
        };
    }

    evaluateMarketAlignment(data) {
        const content = data['market-fit'] || '';
        const length = content.length;
        
        let score = 0;
        const maxScore = 20;
        
        // Base score for any substantive answer
        if (length > 50) {
            score = 8;
        }
        
        // Market alignment indicators
        const marketIndicators = [
            { pattern: /competitor|competition|alternative|incumbent/gi, points: 2, label: 'competitive analysis' },
            { pattern: /differentiat|unique|advantage|superior/gi, points: 3, label: 'differentiation' },
            { pattern: /trend|shift|emerging|future/gi, points: 2, label: 'market trends' },
            { pattern: /segment|vertical|industry|sector/gi, points: 2, label: 'segmentation' },
            { pattern: /demand|need|requirement|request/gi, points: 2, label: 'demand validation' },
            { pattern: /timing|window|opportunity|momentum/gi, points: 2, label: 'market timing' }
        ];
        
        const foundIndicators = [];
        marketIndicators.forEach(indicator => {
            if (indicator.pattern.test(content)) {
                score = Math.min(score + indicator.points, maxScore);
                foundIndicators.push(indicator.label);
            }
        });
        
        // Length bonus
        if (length > 200) score = Math.min(score + 2, maxScore);
        if (length > 400) score = Math.min(score + 2, maxScore);
        
        const percentage = Math.round((score / maxScore) * 100);
        
        return {
            score: score,
            maxScore: maxScore,
            percentage: percentage,
            weight: 20,
            feedback: this.generateMarketFeedback(percentage, foundIndicators)
        };
    }

    evaluateScoringFramework(data) {
        const content = data['scoring-criteria'] || '';
        const prioritization = data['prioritization'] || '';
        const combinedContent = content + ' ' + prioritization;
        const length = combinedContent.length;
        
        let score = 0;
        const maxScore = 20;
        
        // Base score for any substantive answer
        if (length > 50) {
            score = 8;
        }
        
        // Scoring framework indicators
        const frameworkIndicators = [
            { pattern: /weight|score|rank|rating|point/gi, points: 3, label: 'scoring methodology' },
            { pattern: /criteria|factor|dimension|attribute/gi, points: 2, label: 'evaluation criteria' },
            { pattern: /matrix|framework|model|rubric/gi, points: 3, label: 'structured framework' },
            { pattern: /high|medium|low|critical/gi, points: 2, label: 'priority levels' },
            { pattern: /objective|consistent|systematic|data-driven/gi, points: 2, label: 'objectivity' },
            { pattern: /decision|selection|choice|recommendation/gi, points: 2, label: 'decision support' }
        ];
        
        const foundIndicators = [];
        frameworkIndicators.forEach(indicator => {
            if (indicator.pattern.test(combinedContent)) {
                score = Math.min(score + indicator.points, maxScore);
                foundIndicators.push(indicator.label);
            }
        });
        
        // Length bonus
        if (length > 200) score = Math.min(score + 2, maxScore);
        if (length > 400) score = Math.min(score + 2, maxScore);
        
        const percentage = Math.round((score / maxScore) * 100);
        
        return {
            score: score,
            maxScore: maxScore,
            percentage: percentage,
            weight: 20,
            feedback: this.generateFrameworkFeedback(percentage, foundIndicators)
        };
    }

    generateUseCaseFeedback(percentage, indicators) {
        const strengths = [];
        const improvements = [];
        
        if (percentage >= 40) strengths.push('✓ Use cases documented');
        if (indicators.includes('customer focus')) strengths.push('✓ Customer-centric approach');
        if (indicators.includes('value articulation')) strengths.push('✓ Value clearly articulated');
        
        if (!indicators.includes('problem identification')) improvements.push('✗ Define problems more clearly');
        if (!indicators.includes('specificity')) improvements.push('✗ Add more specific details');
        if (percentage < 80) improvements.push('✗ Expand use case coverage');
        
        return strengths.concat(improvements).join('\n');
    }

    generateValueFeedback(percentage, indicators) {
        const strengths = [];
        const improvements = [];
        
        if (percentage >= 40) strengths.push('✓ Value assessment started');
        if (indicators.includes('quantified value')) strengths.push('✓ Quantified metrics provided');
        if (indicators.includes('financial metrics')) strengths.push('✓ Financial impact assessed');
        
        if (!indicators.includes('customer metrics')) improvements.push('✗ Add customer value metrics');
        if (!indicators.includes('market opportunity')) improvements.push('✗ Quantify market opportunity');
        if (percentage < 80) improvements.push('✗ Strengthen value proposition');
        
        return strengths.concat(improvements).join('\n');
    }

    generateFeasibilityFeedback(percentage, indicators) {
        const strengths = [];
        const improvements = [];
        
        if (percentage >= 40) strengths.push('✓ Feasibility considered');
        if (indicators.includes('risk identification')) strengths.push('✓ Risks identified');
        if (indicators.includes('phased approach')) strengths.push('✓ Phased implementation planned');
        
        if (!indicators.includes('resource evaluation')) improvements.push('✗ Assess resource requirements');
        if (!indicators.includes('timeline planning')) improvements.push('✗ Define clear timelines');
        if (percentage < 80) improvements.push('✗ Deepen feasibility analysis');
        
        return strengths.concat(improvements).join('\n');
    }

    generateMarketFeedback(percentage, indicators) {
        const strengths = [];
        const improvements = [];
        
        if (percentage >= 40) strengths.push('✓ Market context considered');
        if (indicators.includes('differentiation')) strengths.push('✓ Differentiation identified');
        if (indicators.includes('demand validation')) strengths.push('✓ Demand validated');
        
        if (!indicators.includes('competitive analysis')) improvements.push('✗ Analyze competition');
        if (!indicators.includes('market timing')) improvements.push('✗ Assess market timing');
        if (percentage < 80) improvements.push('✗ Strengthen market alignment');
        
        return strengths.concat(improvements).join('\n');
    }

    generateFrameworkFeedback(percentage, indicators) {
        const strengths = [];
        const improvements = [];
        
        if (percentage >= 40) strengths.push('✓ Scoring approach defined');
        if (indicators.includes('structured framework')) strengths.push('✓ Structured framework used');
        if (indicators.includes('objectivity')) strengths.push('✓ Objective criteria applied');
        
        if (!indicators.includes('evaluation criteria')) improvements.push('✗ Define clear criteria');
        if (!indicators.includes('priority levels')) improvements.push('✗ Establish priority tiers');
        if (percentage < 80) improvements.push('✗ Refine scoring methodology');
        
        return strengths.concat(improvements).join('\n');
    }

    calculateOverallScore(scores) {
        let totalWeightedScore = 0;
        let totalWeight = 0;
        
        for (const dimension of Object.values(scores)) {
            totalWeightedScore += (dimension.score / dimension.maxScore) * dimension.weight;
            totalWeight += dimension.weight;
        }
        
        return Math.round((totalWeightedScore / totalWeight) * 100);
    }

    generateRecommendations(scores) {
        const recommendations = [];
        
        // Sort dimensions by score to prioritize improvements
        const sortedDimensions = Object.entries(scores)
            .sort((a, b) => a[1].percentage - b[1].percentage);
        
        // Generate recommendations for lowest scoring areas
        sortedDimensions.slice(0, 3).forEach(([dimension, score]) => {
            if (score.percentage < 80) {
                recommendations.push(this.getRecommendation(dimension, score.percentage));
            }
        });
        
        return recommendations;
    }

    getRecommendation(dimension, percentage) {
        // Calculate realistic improvement within 20-point maxScore limit
        const maxScore = 20;
        const currentScore = Math.round((percentage / 100) * maxScore);
        const targetPercentage = 80;
        const targetScore = Math.round((targetPercentage / 100) * maxScore);
        const possibleImprovement = targetScore - currentScore;
        
        const recommendations = {
            useCaseDefinition: {
                priority: 'HIGH',
                area: 'Use Case Definition',
                suggestion: 'Document specific use cases with clear problem-solution mapping',
                impact: `+${possibleImprovement} points`
            },
            valueAssessment: {
                priority: 'HIGH',
                area: 'Value Assessment',
                suggestion: 'Quantify value metrics with specific ROI calculations',
                impact: `+${possibleImprovement} points`
            },
            feasibilityAnalysis: {
                priority: 'MEDIUM',
                area: 'Feasibility Analysis',
                suggestion: 'Assess technical and resource requirements in detail',
                impact: `+${possibleImprovement} points`
            },
            marketAlignment: {
                priority: 'HIGH',
                area: 'Market Alignment',
                suggestion: 'Validate market fit with competitive analysis',
                impact: `+${possibleImprovement} points`
            },
            scoringFramework: {
                priority: 'MEDIUM',
                area: 'Scoring Framework',
                suggestion: 'Implement structured scoring methodology with clear weights',
                impact: `+${possibleImprovement} points`
            }
        };
        
        return recommendations[dimension] || {
            priority: 'MEDIUM',
            area: dimension,
            suggestion: 'Improve documentation and analysis',
            impact: `+${possibleImprovement} points`
        };
    }

    generateSummary(overallScore, scores) {
        // Count strong and weak dimensions for context
        const strongDimensions = Object.entries(scores).filter(([_, s]) => s.percentage >= 70).length;
        const weakDimensions = Object.entries(scores).filter(([_, s]) => s.percentage < 50).length;
        
        if (overallScore >= 80) {
            return `Exceptional use case prioritization framework (${overallScore}%). Your comprehensive scoring methodology demonstrates mature strategic thinking with ${strongDimensions}/5 dimensions at excellence level. The systematic approach to value assessment and market alignment positions you to make data-driven decisions with confidence. To reach world-class status (95+), focus on refining feasibility analysis and strengthening your scoring framework documentation.`;
        } else if (overallScore >= 60) {
            return `Strong use case prioritization foundation (${overallScore}%). You've established a solid framework with clear value metrics and good market understanding. With ${strongDimensions} strong dimensions, you're well-positioned to make informed prioritization decisions. Priority improvements: enhance feasibility analysis depth, strengthen market validation, and implement more rigorous scoring criteria. These refinements will elevate your decision-making precision.`;
        } else if (overallScore >= 40) {
            return `Developing use case prioritization approach (${overallScore}%). While you grasp the importance of systematic prioritization, significant gaps limit effectiveness. ${weakDimensions} dimensions need immediate attention, particularly value quantification and feasibility assessment. Focus on: documenting specific use cases with clear problem-solution mapping, quantifying ROI metrics, and establishing objective scoring criteria. These improvements will transform your prioritization from intuitive to data-driven.`;
        } else {
            return `Use case prioritization needs fundamental development (${overallScore}%). Current approach lacks the structure needed for effective strategic decisions. Critical gaps across ${weakDimensions}/5 dimensions create high risk of resource misallocation. Immediate actions required: define clear use cases with customer problems, establish value metrics (revenue/cost/time), create basic scoring rubric. Start with documenting your top 3 use cases using a simple impact vs. effort matrix.`;
        }
    }
}

module.exports = UseCaseScoringAgentEnhanced;
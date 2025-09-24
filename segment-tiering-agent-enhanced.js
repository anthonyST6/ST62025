const { generateDynamicRecommendations } = require('./recommendations-library-dynamic-wrapper');
// Segment Tiering Agent - Strategic Prioritization (3-2)
// Evaluates customer segment prioritization and tiering strategies

class SegmentTieringAgentEnhanced {
    constructor() {
        this.name = 'Segment Tiering Agent';
        this.version = '2.0.0';
        this.capabilities = [
            'segment_definition',
            'value_analysis',
            'fit_assessment',
            'resource_allocation',
            'tiering_framework'
        ];
    }

    analyzeWorksheet(worksheetData) {
        console.log('📊 Segment Tiering Agent: Starting analysis...');
        
        // Parse worksheet data - support both field-N and fieldN formats
        const data = this.parseWorksheetData(worksheetData);
        console.log('📋 Parsed segment tiering data');
        
        // Evaluate each dimension with fair scoring
        const scores = {
            segmentDefinition: this.evaluateSegmentDefinition(data),
            valueAnalysis: this.evaluateValueAnalysis(data),
            fitAssessment: this.evaluateFitAssessment(data),
            resourceAllocation: this.evaluateResourceAllocation(data),
            tieringFramework: this.evaluateTieringFramework(data)
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
        
        console.log(`✅ Segment Tiering Analysis complete: ${overallScore}%`);
        
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
            'segments': ['field-1', 'field1', 'segments'],
            'value-metrics': ['field-2', 'field2', 'value-metrics', 'valueMetrics'],
            'fit-criteria': ['field-3', 'field3', 'fit-criteria', 'fitCriteria'],
            'resources': ['field-4', 'field4', 'resources'],
            'tiers': ['field-5', 'field5', 'tiers'],
            'strategy': ['field-6', 'field6', 'strategy']
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

    evaluateSegmentDefinition(data) {
        const content = data['segments'] || '';
        const length = content.length;
        
        let score = 0;
        const maxScore = 20;
        
        // Base score for any substantive answer (40% = 8 points)
        if (length > 50) {
            score = 8;
        }
        
        // Additional points for quality indicators
        const qualityIndicators = [
            { pattern: /enterprise|mid-market|smb|startup/gi, points: 2, label: 'segment categories' },
            { pattern: /industry|vertical|sector|market/gi, points: 2, label: 'industry focus' },
            { pattern: /size|revenue|employees|users/gi, points: 2, label: 'size criteria' },
            { pattern: /geography|region|location|global/gi, points: 2, label: 'geographic scope' },
            { pattern: /persona|buyer|decision maker|champion/gi, points: 2, label: 'buyer personas' },
            { pattern: /characteristics|attributes|profile|criteria/gi, points: 2, label: 'segment attributes' }
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
            feedback: this.generateSegmentFeedback(percentage, foundIndicators)
        };
    }

    evaluateValueAnalysis(data) {
        const content = data['value-metrics'] || '';
        const length = content.length;
        
        let score = 0;
        const maxScore = 20;
        
        // Base score for any substantive answer
        if (length > 50) {
            score = 8;
        }
        
        // Value analysis indicators
        const valueIndicators = [
            { pattern: /ltv|lifetime value|customer value/gi, points: 3, label: 'lifetime value' },
            { pattern: /cac|acquisition cost|cost to acquire/gi, points: 3, label: 'acquisition cost' },
            { pattern: /revenue|arpu|average revenue/gi, points: 2, label: 'revenue metrics' },
            { pattern: /growth|expansion|upsell/gi, points: 2, label: 'growth potential' },
            { pattern: /retention|churn|renewal/gi, points: 2, label: 'retention metrics' },
            { pattern: /margin|profitability|contribution/gi, points: 2, label: 'profitability' }
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
        if (length > 400) score = Math.min(score + 2, maxScore);
        
        const percentage = Math.round((score / maxScore) * 100);
        
        return {
            score: score,
            maxScore: maxScore,
            percentage: percentage,
            weight: 20,
            feedback: this.generateValueFeedback(percentage, foundIndicators)
        };
    }

    evaluateFitAssessment(data) {
        const content = data['fit-criteria'] || '';
        const length = content.length;
        
        let score = 0;
        const maxScore = 20;
        
        // Base score for any substantive answer
        if (length > 50) {
            score = 8;
        }
        
        // Fit assessment indicators
        const fitIndicators = [
            { pattern: /product.?market fit|pmf/gi, points: 3, label: 'product-market fit' },
            { pattern: /ideal customer|icp|perfect fit/gi, points: 3, label: 'ideal customer profile' },
            { pattern: /use case|scenario|application/gi, points: 2, label: 'use case alignment' },
            { pattern: /pain point|problem|challenge/gi, points: 2, label: 'problem-solution fit' },
            { pattern: /competitive|differentiat|advantage/gi, points: 2, label: 'competitive position' },
            { pattern: /readiness|maturity|sophistication/gi, points: 2, label: 'market readiness' }
        ];
        
        const foundIndicators = [];
        fitIndicators.forEach(indicator => {
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
            feedback: this.generateFitFeedback(percentage, foundIndicators)
        };
    }

    evaluateResourceAllocation(data) {
        const content = data['resources'] || '';
        const length = content.length;
        
        let score = 0;
        const maxScore = 20;
        
        // Base score for any substantive answer
        if (length > 50) {
            score = 8;
        }
        
        // Resource allocation indicators
        const resourceIndicators = [
            { pattern: /sales|marketing|support|success/gi, points: 2, label: 'team allocation' },
            { pattern: /budget|investment|spend|allocation/gi, points: 3, label: 'budget planning' },
            { pattern: /priority|focus|concentration/gi, points: 2, label: 'prioritization' },
            { pattern: /coverage|territory|assignment/gi, points: 2, label: 'coverage model' },
            { pattern: /effort|time|bandwidth|capacity/gi, points: 2, label: 'effort distribution' },
            { pattern: /roi|return|efficiency|optimization/gi, points: 2, label: 'resource optimization' }
        ];
        
        const foundIndicators = [];
        resourceIndicators.forEach(indicator => {
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
            feedback: this.generateResourceFeedback(percentage, foundIndicators)
        };
    }

    evaluateTieringFramework(data) {
        const tiersContent = data['tiers'] || '';
        const strategyContent = data['strategy'] || '';
        const combinedContent = tiersContent + ' ' + strategyContent;
        const length = combinedContent.length;
        
        let score = 0;
        const maxScore = 20;
        
        // Base score for any substantive answer
        if (length > 50) {
            score = 8;
        }
        
        // Tiering framework indicators
        const frameworkIndicators = [
            { pattern: /tier 1|tier 2|tier 3|platinum|gold|silver/gi, points: 3, label: 'tier structure' },
            { pattern: /criteria|qualification|threshold|requirement/gi, points: 2, label: 'tier criteria' },
            { pattern: /service level|sla|support|engagement/gi, points: 2, label: 'service levels' },
            { pattern: /pricing|discount|terms|contract/gi, points: 2, label: 'pricing strategy' },
            { pattern: /migration|upgrade|progression|graduation/gi, points: 2, label: 'tier progression' },
            { pattern: /review|reassess|evaluate|monitor/gi, points: 2, label: 'review process' }
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

    generateSegmentFeedback(percentage, indicators) {
        const strengths = [];
        const improvements = [];
        
        if (percentage >= 40) strengths.push('✓ Segments identified');
        if (indicators.includes('segment categories')) strengths.push('✓ Clear segment categories');
        if (indicators.includes('buyer personas')) strengths.push('✓ Buyer personas defined');
        
        if (!indicators.includes('size criteria')) improvements.push('✗ Define size criteria');
        if (!indicators.includes('industry focus')) improvements.push('✗ Specify target industries');
        if (percentage < 80) improvements.push('✗ Refine segment definitions');
        
        return strengths.concat(improvements).join('\n');
    }

    generateValueFeedback(percentage, indicators) {
        const strengths = [];
        const improvements = [];
        
        if (percentage >= 40) strengths.push('✓ Value metrics considered');
        if (indicators.includes('lifetime value')) strengths.push('✓ LTV analyzed');
        if (indicators.includes('acquisition cost')) strengths.push('✓ CAC evaluated');
        
        if (!indicators.includes('profitability')) improvements.push('✗ Assess profitability');
        if (!indicators.includes('growth potential')) improvements.push('✗ Evaluate growth potential');
        if (percentage < 80) improvements.push('✗ Deepen value analysis');
        
        return strengths.concat(improvements).join('\n');
    }

    generateFitFeedback(percentage, indicators) {
        const strengths = [];
        const improvements = [];
        
        if (percentage >= 40) strengths.push('✓ Fit criteria established');
        if (indicators.includes('ideal customer profile')) strengths.push('✓ ICP defined');
        if (indicators.includes('problem-solution fit')) strengths.push('✓ Problem-solution fit assessed');
        
        if (!indicators.includes('competitive position')) improvements.push('✗ Analyze competitive position');
        if (!indicators.includes('market readiness')) improvements.push('✗ Assess market readiness');
        if (percentage < 80) improvements.push('✗ Strengthen fit assessment');
        
        return strengths.concat(improvements).join('\n');
    }

    generateResourceFeedback(percentage, indicators) {
        const strengths = [];
        const improvements = [];
        
        if (percentage >= 40) strengths.push('✓ Resource planning started');
        if (indicators.includes('budget planning')) strengths.push('✓ Budget allocated');
        if (indicators.includes('team allocation')) strengths.push('✓ Team resources planned');
        
        if (!indicators.includes('coverage model')) improvements.push('✗ Define coverage model');
        if (!indicators.includes('resource optimization')) improvements.push('✗ Optimize resource allocation');
        if (percentage < 80) improvements.push('✗ Refine resource strategy');
        
        return strengths.concat(improvements).join('\n');
    }

    generateFrameworkFeedback(percentage, indicators) {
        const strengths = [];
        const improvements = [];
        
        if (percentage >= 40) strengths.push('✓ Tiering approach defined');
        if (indicators.includes('tier structure')) strengths.push('✓ Clear tier structure');
        if (indicators.includes('service levels')) strengths.push('✓ Service levels defined');
        
        if (!indicators.includes('tier progression')) improvements.push('✗ Define progression paths');
        if (!indicators.includes('review process')) improvements.push('✗ Establish review process');
        if (percentage < 80) improvements.push('✗ Strengthen tiering framework');
        
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
        const targetPercentage = 80; // Target 80% achievement
        const targetScore = Math.round((targetPercentage / 100) * maxScore);
        const possibleImprovement = targetScore - currentScore;
        
        const recommendations = {
            segmentDefinition: {
                priority: 'HIGH',
                area: 'Segment Definition',
                suggestion: 'Define clear segment criteria with specific attributes',
                impact: `+${possibleImprovement} points`
            },
            valueAnalysis: {
                priority: 'HIGH',
                area: 'Value Analysis',
                suggestion: 'Calculate LTV, CAC, and profitability by segment',
                impact: `+${possibleImprovement} points`
            },
            fitAssessment: {
                priority: 'MEDIUM',
                area: 'Fit Assessment',
                suggestion: 'Evaluate product-market fit and ICP alignment',
                impact: `+${possibleImprovement} points`
            },
            resourceAllocation: {
                priority: 'MEDIUM',
                area: 'Resource Allocation',
                suggestion: 'Optimize resource distribution based on segment value',
                impact: `+${possibleImprovement} points`
            },
            tieringFramework: {
                priority: 'HIGH',
                area: 'Tiering Framework',
                suggestion: 'Establish clear tier structure with progression paths',
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
            return `Outstanding segment tiering strategy (${overallScore}%). Your sophisticated approach to customer segmentation with ${strongDimensions}/5 dimensions at excellence demonstrates deep market understanding. The clear tier structure with defined service levels and resource allocation will drive efficient growth. Your LTV/CAC analysis and ICP alignment position you for scalable customer acquisition. To achieve world-class segmentation (95+), focus on enhancing tier progression paths and implementing dynamic segment review processes.`;
        } else if (overallScore >= 60) {
            return `Solid segment tiering foundation (${overallScore}%). You've established good segmentation principles with clear value metrics and resource planning. With ${strongDimensions} strong dimensions, you're positioned to optimize customer engagement effectively. Priority improvements: deepen value analysis with LTV/CAC calculations, strengthen product-market fit assessment per segment, and establish clear tier progression criteria. These enhancements will maximize resource efficiency and customer lifetime value.`;
        } else if (overallScore >= 40) {
            return `Developing segment tiering approach (${overallScore}%). While basic segmentation exists, significant gaps limit your ability to optimize resource allocation. ${weakDimensions} dimensions need immediate attention, particularly value analysis and tiering framework. Critical actions: calculate LTV and CAC by segment, define clear tier criteria (revenue/engagement/growth potential), establish service level differentiation. These improvements will transform your segmentation from basic categorization to strategic resource optimization.`;
        } else {
            return `Segment tiering strategy requires fundamental development (${overallScore}%). Current approach lacks the structure needed for effective customer prioritization. With ${weakDimensions}/5 dimensions below threshold, you risk misallocating resources and missing growth opportunities. Immediate priorities: identify top 3 customer segments, calculate basic value metrics (revenue per segment), create simple tier structure (Gold/Silver/Bronze). Start by analyzing your best 10 customers to identify common characteristics.`;
        }
    }
}

module.exports = SegmentTieringAgentEnhanced;
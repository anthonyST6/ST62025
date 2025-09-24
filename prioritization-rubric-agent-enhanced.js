const { generateDynamicRecommendations } = require('./recommendations-library-dynamic-wrapper');
// Prioritization Rubric Agent - Strategic Prioritization (3-3)
// Evaluates decision-making frameworks for competing initiatives

class PrioritizationRubricAgentEnhanced {
    constructor() {
        this.name = 'Prioritization Rubric Agent';
        this.version = '2.0.0';
        this.capabilities = [
            'criteria_definition',
            'weighting_system',
            'scoring_methodology',
            'decision_framework',
            'consistency_check'
        ];
    }

    analyzeWorksheet(worksheetData) {
        console.log('📊 Prioritization Rubric Agent: Starting analysis...');
        
        // Parse worksheet data - support both field-N and fieldN formats
        const data = this.parseWorksheetData(worksheetData);
        console.log('📋 Parsed prioritization rubric data');
        
        // Evaluate each dimension with fair scoring
        const scores = {
            criteriaDefinition: this.evaluateCriteriaDefinition(data),
            weightingSystem: this.evaluateWeightingSystem(data),
            scoringMethodology: this.evaluateScoringMethodology(data),
            decisionFramework: this.evaluateDecisionFramework(data),
            consistencyCheck: this.evaluateConsistencyCheck(data)
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
        
        console.log(`✅ Prioritization Rubric Analysis complete: ${overallScore}%`);
        
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
            'criteria': ['field-1', 'field1', 'criteria'],
            'weights': ['field-2', 'field2', 'weights'],
            'scoring': ['field-3', 'field3', 'scoring'],
            'framework': ['field-4', 'field4', 'framework'],
            'validation': ['field-5', 'field5', 'validation'],
            'application': ['field-6', 'field6', 'application']
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

    evaluateCriteriaDefinition(data) {
        const content = data['criteria'] || '';
        const length = content.length;
        
        let score = 0;
        const maxScore = 20;
        
        // Base score for any substantive answer (40% = 8 points)
        if (length > 50) {
            score = 8;
        }
        
        // Additional points for quality indicators
        const qualityIndicators = [
            { pattern: /impact|value|benefit|outcome/gi, points: 3, label: 'impact criteria' },
            { pattern: /effort|cost|resource|complexity/gi, points: 3, label: 'effort assessment' },
            { pattern: /risk|uncertainty|dependency/gi, points: 2, label: 'risk factors' },
            { pattern: /strategic|alignment|vision|goal/gi, points: 2, label: 'strategic alignment' },
            { pattern: /customer|user|market|demand/gi, points: 2, label: 'customer focus' },
            { pattern: /measurable|quantifiable|objective/gi, points: 2, label: 'measurability' }
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
            feedback: this.generateCriteriaFeedback(percentage, foundIndicators)
        };
    }

    evaluateWeightingSystem(data) {
        const content = data['weights'] || '';
        const length = content.length;
        
        let score = 0;
        const maxScore = 20;
        
        // Base score for any substantive answer
        if (length > 50) {
            score = 8;
        }
        
        // Weighting system indicators
        const weightIndicators = [
            { pattern: /\d+%|\d+\s*percent/gi, points: 3, label: 'percentage weights' },
            { pattern: /weight|importance|priority|significance/gi, points: 2, label: 'weight terminology' },
            { pattern: /relative|comparative|balanced/gi, points: 2, label: 'relative weighting' },
            { pattern: /100|total|sum|distribution/gi, points: 2, label: 'weight distribution' },
            { pattern: /critical|essential|nice.to.have/gi, points: 2, label: 'priority levels' },
            { pattern: /justify|rationale|reasoning|basis/gi, points: 2, label: 'weight justification' }
        ];
        
        const foundIndicators = [];
        weightIndicators.forEach(indicator => {
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
            feedback: this.generateWeightingFeedback(percentage, foundIndicators)
        };
    }

    evaluateScoringMethodology(data) {
        const content = data['scoring'] || '';
        const length = content.length;
        
        let score = 0;
        const maxScore = 20;
        
        // Base score for any substantive answer
        if (length > 50) {
            score = 8;
        }
        
        // Scoring methodology indicators
        const scoringIndicators = [
            { pattern: /scale|1.?5|1.?10|rating/gi, points: 3, label: 'scoring scale' },
            { pattern: /rubric|matrix|framework|grid/gi, points: 3, label: 'scoring framework' },
            { pattern: /consistent|standardized|uniform/gi, points: 2, label: 'consistency' },
            { pattern: /example|sample|illustration/gi, points: 2, label: 'examples provided' },
            { pattern: /threshold|cutoff|minimum|qualification/gi, points: 2, label: 'thresholds defined' },
            { pattern: /calibrat|normaliz|adjust/gi, points: 2, label: 'calibration method' }
        ];
        
        const foundIndicators = [];
        scoringIndicators.forEach(indicator => {
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
            feedback: this.generateScoringFeedback(percentage, foundIndicators)
        };
    }

    evaluateDecisionFramework(data) {
        const content = data['framework'] || '';
        const length = content.length;
        
        let score = 0;
        const maxScore = 20;
        
        // Base score for any substantive answer
        if (length > 50) {
            score = 8;
        }
        
        // Decision framework indicators
        const frameworkIndicators = [
            { pattern: /process|workflow|steps|procedure/gi, points: 2, label: 'decision process' },
            { pattern: /stakeholder|approval|consensus|committee/gi, points: 2, label: 'stakeholder involvement' },
            { pattern: /data.driven|evidence|analysis|insight/gi, points: 3, label: 'data-driven approach' },
            { pattern: /review|revisit|update|iterate/gi, points: 2, label: 'review mechanism' },
            { pattern: /document|record|track|audit/gi, points: 2, label: 'documentation' },
            { pattern: /transparent|clear|explicit|objective/gi, points: 2, label: 'transparency' }
        ];
        
        const foundIndicators = [];
        frameworkIndicators.forEach(indicator => {
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
            feedback: this.generateFrameworkFeedback(percentage, foundIndicators)
        };
    }

    evaluateConsistencyCheck(data) {
        const validationContent = data['validation'] || '';
        const applicationContent = data['application'] || '';
        const combinedContent = validationContent + ' ' + applicationContent;
        const length = combinedContent.length;
        
        let score = 0;
        const maxScore = 20;
        
        // Base score for any substantive answer
        if (length > 50) {
            score = 8;
        }
        
        // Consistency check indicators
        const consistencyIndicators = [
            { pattern: /test|validate|verify|check/gi, points: 2, label: 'validation methods' },
            { pattern: /bias|subjective|objective|fair/gi, points: 3, label: 'bias mitigation' },
            { pattern: /calibration|alignment|consensus/gi, points: 2, label: 'calibration process' },
            { pattern: /historical|past|previous|benchmark/gi, points: 2, label: 'historical validation' },
            { pattern: /feedback|improve|refine|optimize/gi, points: 2, label: 'continuous improvement' },
            { pattern: /audit|review|quality|accuracy/gi, points: 2, label: 'quality assurance' }
        ];
        
        const foundIndicators = [];
        consistencyIndicators.forEach(indicator => {
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
            feedback: this.generateConsistencyFeedback(percentage, foundIndicators)
        };
    }

    generateCriteriaFeedback(percentage, indicators) {
        const strengths = [];
        const improvements = [];
        
        if (percentage >= 40) strengths.push('✓ Criteria documented');
        if (indicators.includes('impact criteria')) strengths.push('✓ Impact criteria defined');
        if (indicators.includes('measurability')) strengths.push('✓ Measurable criteria');
        
        if (!indicators.includes('strategic alignment')) improvements.push('✗ Add strategic alignment');
        if (!indicators.includes('risk factors')) improvements.push('✗ Include risk assessment');
        if (percentage < 80) improvements.push('✗ Expand criteria coverage');
        
        return strengths.concat(improvements).join('\n');
    }

    generateWeightingFeedback(percentage, indicators) {
        const strengths = [];
        const improvements = [];
        
        if (percentage >= 40) strengths.push('✓ Weighting system started');
        if (indicators.includes('percentage weights')) strengths.push('✓ Quantified weights');
        if (indicators.includes('weight justification')) strengths.push('✓ Weights justified');
        
        if (!indicators.includes('weight distribution')) improvements.push('✗ Ensure weights sum to 100%');
        if (!indicators.includes('priority levels')) improvements.push('✗ Define priority tiers');
        if (percentage < 80) improvements.push('✗ Refine weighting logic');
        
        return strengths.concat(improvements).join('\n');
    }

    generateScoringFeedback(percentage, indicators) {
        const strengths = [];
        const improvements = [];
        
        if (percentage >= 40) strengths.push('✓ Scoring method defined');
        if (indicators.includes('scoring scale')) strengths.push('✓ Clear scoring scale');
        if (indicators.includes('consistency')) strengths.push('✓ Consistent approach');
        
        if (!indicators.includes('examples provided')) improvements.push('✗ Add scoring examples');
        if (!indicators.includes('calibration method')) improvements.push('✗ Define calibration process');
        if (percentage < 80) improvements.push('✗ Strengthen methodology');
        
        return strengths.concat(improvements).join('\n');
    }

    generateFrameworkFeedback(percentage, indicators) {
        const strengths = [];
        const improvements = [];
        
        if (percentage >= 40) strengths.push('✓ Framework established');
        if (indicators.includes('data-driven approach')) strengths.push('✓ Data-driven decisions');
        if (indicators.includes('transparency')) strengths.push('✓ Transparent process');
        
        if (!indicators.includes('stakeholder involvement')) improvements.push('✗ Define stakeholder roles');
        if (!indicators.includes('review mechanism')) improvements.push('✗ Add review process');
        if (percentage < 80) improvements.push('✗ Enhance framework');
        
        return strengths.concat(improvements).join('\n');
    }

    generateConsistencyFeedback(percentage, indicators) {
        const strengths = [];
        const improvements = [];
        
        if (percentage >= 40) strengths.push('✓ Consistency considered');
        if (indicators.includes('bias mitigation')) strengths.push('✓ Bias addressed');
        if (indicators.includes('continuous improvement')) strengths.push('✓ Improvement process');
        
        if (!indicators.includes('validation methods')) improvements.push('✗ Add validation steps');
        if (!indicators.includes('quality assurance')) improvements.push('✗ Implement QA process');
        if (percentage < 80) improvements.push('✗ Strengthen consistency checks');
        
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
            criteriaDefinition: {
                priority: 'HIGH',
                area: 'Criteria Definition',
                suggestion: 'Define comprehensive, measurable prioritization criteria',
                impact: `+${possibleImprovement} points`
            },
            weightingSystem: {
                priority: 'HIGH',
                area: 'Weighting System',
                suggestion: 'Establish clear weights with justification for each criterion',
                impact: `+${possibleImprovement} points`
            },
            scoringMethodology: {
                priority: 'MEDIUM',
                area: 'Scoring Methodology',
                suggestion: 'Implement consistent scoring scale with examples',
                impact: `+${possibleImprovement} points`
            },
            decisionFramework: {
                priority: 'HIGH',
                area: 'Decision Framework',
                suggestion: 'Create transparent, data-driven decision process',
                impact: `+${possibleImprovement} points`
            },
            consistencyCheck: {
                priority: 'MEDIUM',
                area: 'Consistency Check',
                suggestion: 'Add validation and bias mitigation mechanisms',
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
            return `Exceptional prioritization rubric (${overallScore}%). Your sophisticated decision-making framework with ${strongDimensions}/5 dimensions at excellence demonstrates mature strategic thinking. The combination of clear criteria, weighted scoring, and bias mitigation creates a robust system for consistent, data-driven decisions. Your transparent methodology enables stakeholder alignment and defensible choices. To reach world-class status (95+), focus on implementing historical validation and continuous calibration processes.`;
        } else if (overallScore >= 60) {
            return `Strong prioritization foundation (${overallScore}%). You've established solid decision-making principles with clear criteria and structured approach. With ${strongDimensions} strong dimensions, you're equipped to make consistent prioritization decisions. Key improvements needed: strengthen weighting justification, add concrete scoring examples, implement bias mitigation techniques. These enhancements will transform good judgment into systematic excellence.`;
        } else if (overallScore >= 40) {
            return `Developing prioritization framework (${overallScore}%). While you understand the need for systematic prioritization, critical gaps limit effectiveness. ${weakDimensions} dimensions require immediate attention, particularly criteria definition and scoring methodology. Essential actions: define measurable criteria (impact/effort/risk), establish clear weights with rationale, create scoring scale with examples. These improvements will reduce decision bias and increase consistency.`;
        } else {
            return `Prioritization rubric needs fundamental development (${overallScore}%). Current approach relies too heavily on intuition rather than systematic evaluation. With ${weakDimensions}/5 dimensions below threshold, decisions risk being inconsistent and difficult to defend. Immediate priorities: define 5-7 key criteria, assign percentage weights totaling 100%, create 1-5 scoring scale. Start with a simple impact vs. effort matrix for your next three decisions.`;
        }
    }
}

module.exports = PrioritizationRubricAgentEnhanced;
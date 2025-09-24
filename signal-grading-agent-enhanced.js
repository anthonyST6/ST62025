// Signal Grading Analysis Agent
// Evaluates scoring model for valuable insights vs noise

const { RecommendationsLibraryDynamic } = require('./recommendations-library-dynamic');

class SignalGradingAgentEnhanced {
    constructor() {
        this.dimensions = {
            signalIdentification: {
                weight: 20,
                maxScore: 20,
                evaluate: (data) => this.evaluateSignalIdentification(data)
            },
            noiseFiltering: {
                weight: 20,
                maxScore: 20,
                evaluate: (data) => this.evaluateNoiseFiltering(data)
            },
            scoringFramework: {
                weight: 20,
                maxScore: 20,
                evaluate: (data) => this.evaluateScoringFramework(data)
            },
            validationProcess: {
                weight: 20,
                maxScore: 20,
                evaluate: (data) => this.evaluateValidationProcess(data)
            },
            actionThresholds: {
                weight: 20,
                maxScore: 20,
                evaluate: (data) => this.evaluateActionThresholds(data)
            }
        };
    }

    analyzeWorksheet(worksheetData) {
        console.log('📊 Signal Grading Agent: Starting analysis...');
        
        const parsedData = this.parseWorksheetData(worksheetData);
        console.log('📋 Parsed signal grading data');
        
        const scores = {};
        let totalScore = 0;
        
        for (const [key, dimension] of Object.entries(this.dimensions)) {
            const dimensionScore = dimension.evaluate(parsedData);
            const percentage = Math.round((dimensionScore / dimension.maxScore) * 100);
            
            scores[key] = {
                score: dimensionScore,
                maxScore: dimension.maxScore,
                percentage: percentage,
                weight: dimension.weight,
                feedback: this.generateDimensionFeedback(key, dimensionScore, dimension.maxScore)
            };
            
            totalScore += dimensionScore;
            console.log(`📊 ${key}: ${percentage}%`);
        }
        
        const overallScore = Math.round(totalScore);
        console.log(`✅ Signal Grading Analysis complete: ${overallScore}%`);
        
        return {
            score: overallScore,
            detailedScores: scores,
            recommendations: this.generateRecommendations(scores, parsedData),
            analysis: {
                executiveSummary: this.generateExecutiveSummary(overallScore, scores, parsedData)
            }
        };
    }

    parseWorksheetData(worksheetData) {
        const getValue = (num) => {
            return worksheetData[`field-${num}`] || 
                   worksheetData[`field${num}`] || 
                   worksheetData[`field_${num}`] || 
                   '';
        };
        
        return {
            signals: getValue(1),         // Key signals to track
            noise: getValue(2),           // Common noise patterns
            scoring: getValue(3),         // Scoring methodology
            validation: getValue(4),      // Validation approach
            thresholds: getValue(5),      // Action thresholds
            application: getValue(6)      // How signals drive decisions
        };
    }

    evaluateSignalIdentification(data) {
        let score = 0;
        const signals = data.signals.toLowerCase();
        
        // Base score for any substantive answer
        if (signals.length > 20) {
            score = 8; // Start with 40% base score
        }
        
        // Check for leading indicators
        if (signals.includes('leading') || signals.includes('early') ||
            signals.includes('predictive') || signals.includes('indicator') ||
            signals.includes('signal') || signals.includes('sign') ||
            signals.includes('warning') || signals.includes('trend')) {
            score += 3;
        }
        
        // Check for behavioral signals
        if (signals.includes('behavior') || signals.includes('action') ||
            signals.includes('usage') || signals.includes('engagement') ||
            signals.includes('activity') || signals.includes('interaction') ||
            signals.includes('pattern') || signals.includes('habit')) {
            score += 3;
        }
        
        // Check for quantitative signals
        if (/\d+/.test(signals) || signals.includes('metric') ||
            signals.includes('measure') || signals.includes('data') ||
            signals.includes('number') || signals.includes('score') ||
            signals.includes('rate') || signals.includes('percentage')) {
            score += 3;
        }
        
        // Check for multiple signal types
        if (signals.includes('multiple') || signals.includes('various') ||
            signals.includes('different') || signals.includes('types') ||
            signals.includes('several') || signals.includes('many') ||
            signals.includes('diverse') || signals.includes('range')) {
            score += 3;
        }
        
        // Bonus for comprehensive answers
        if (signals.length > 100) {
            score += 2;
        }
        
        return Math.min(score, 20);
    }

    evaluateNoiseFiltering(data) {
        let score = 0;
        const noise = data.noise.toLowerCase();
        
        // Base score for any substantive answer
        if (noise.length > 20) {
            score = 8; // Start with 40% base score
        }
        
        // Check for noise identification
        if (noise.includes('noise') || noise.includes('false') ||
            noise.includes('irrelevant') || noise.includes('distraction') ||
            noise.includes('misleading') || noise.includes('unimportant') ||
            noise.includes('outlier') || noise.includes('anomaly')) {
            score += 3;
        }
        
        // Check for filtering criteria
        if (noise.includes('filter') || noise.includes('exclude') ||
            noise.includes('ignore') || noise.includes('remove') ||
            noise.includes('eliminate') || noise.includes('discard') ||
            noise.includes('separate') || noise.includes('isolate')) {
            score += 3;
        }
        
        // Check for pattern recognition
        if (noise.includes('pattern') || noise.includes('common') ||
            noise.includes('typical') || noise.includes('recurring') ||
            noise.includes('frequent') || noise.includes('regular') ||
            noise.includes('consistent') || noise.includes('repeat')) {
            score += 3;
        }
        
        // Check for validation
        if (noise.includes('validate') || noise.includes('verify') ||
            noise.includes('confirm') || noise.includes('check') ||
            noise.includes('test') || noise.includes('prove') ||
            noise.includes('ensure') || noise.includes('accurate')) {
            score += 3;
        }
        
        // Bonus for comprehensive answers
        if (noise.length > 100) {
            score += 2;
        }
        
        return Math.min(score, 20);
    }

    evaluateScoringFramework(data) {
        let score = 0;
        const scoring = data.scoring.toLowerCase();
        
        // Base score for any substantive answer
        if (scoring.length > 20) {
            score = 8; // Start with 40% base score
        }
        
        // Check for scoring methodology
        if (scoring.includes('score') || scoring.includes('weight') ||
            scoring.includes('rank') || scoring.includes('grade') ||
            scoring.includes('rate') || scoring.includes('evaluate') ||
            scoring.includes('assess') || scoring.includes('measure')) {
            score += 3;
        }
        
        // Check for criteria definition
        if (scoring.includes('criteria') || scoring.includes('factor') ||
            scoring.includes('dimension') || scoring.includes('attribute') ||
            scoring.includes('element') || scoring.includes('component') ||
            scoring.includes('aspect') || scoring.includes('variable')) {
            score += 3;
        }
        
        // Check for quantification
        if (/\d+/.test(scoring) || scoring.includes('scale') ||
            scoring.includes('range') || scoring.includes('point') ||
            scoring.includes('number') || scoring.includes('value') ||
            scoring.includes('metric') || scoring.includes('percentage')) {
            score += 3;
        }
        
        // Check for consistency
        if (scoring.includes('consistent') || scoring.includes('standard') ||
            scoring.includes('framework') || scoring.includes('systematic') ||
            scoring.includes('uniform') || scoring.includes('structured') ||
            scoring.includes('method') || scoring.includes('approach')) {
            score += 3;
        }
        
        // Bonus for comprehensive answers
        if (scoring.length > 100) {
            score += 2;
        }
        
        return Math.min(score, 20);
    }

    evaluateValidationProcess(data) {
        let score = 0;
        const validation = data.validation.toLowerCase();
        
        // Base score for any substantive answer
        if (validation.length > 20) {
            score = 8; // Start with 40% base score
        }
        
        // Check for validation methods
        if (validation.includes('test') || validation.includes('validate') ||
            validation.includes('verify') || validation.includes('confirm') ||
            validation.includes('check') || validation.includes('prove') ||
            validation.includes('assess') || validation.includes('evaluate')) {
            score += 3;
        }
        
        // Check for data sources
        if (validation.includes('source') || validation.includes('data') ||
            validation.includes('evidence') || validation.includes('proof') ||
            validation.includes('information') || validation.includes('input') ||
            validation.includes('feedback') || validation.includes('result')) {
            score += 3;
        }
        
        // Check for cross-validation
        if (validation.includes('cross') || validation.includes('multiple') ||
            validation.includes('triangulate') || validation.includes('corroborate') ||
            validation.includes('compare') || validation.includes('different') ||
            validation.includes('various') || validation.includes('several')) {
            score += 3;
        }
        
        // Check for iteration
        if (validation.includes('iterate') || validation.includes('refine') ||
            validation.includes('improve') || validation.includes('update') ||
            validation.includes('adjust') || validation.includes('optimize') ||
            validation.includes('enhance') || validation.includes('evolve')) {
            score += 3;
        }
        
        // Bonus for comprehensive answers
        if (validation.length > 100) {
            score += 2;
        }
        
        return Math.min(score, 20);
    }

    evaluateActionThresholds(data) {
        let score = 0;
        const thresholds = data.thresholds.toLowerCase();
        const application = data.application.toLowerCase();
        const combined = thresholds + ' ' + application;
        
        // Base score for any substantive answer
        if (combined.length > 40) {
            score = 8; // Start with 40% base score
        }
        
        // Check for threshold definition
        if (thresholds.includes('threshold') || thresholds.includes('trigger') ||
            thresholds.includes('level') || thresholds.includes('point') ||
            thresholds.includes('limit') || thresholds.includes('boundary') ||
            thresholds.includes('cutoff') || thresholds.includes('benchmark')) {
            score += 3;
        }
        
        // Check for action mapping
        if (thresholds.includes('action') || thresholds.includes('response') ||
            thresholds.includes('decision') || thresholds.includes('intervention') ||
            thresholds.includes('step') || thresholds.includes('measure') ||
            thresholds.includes('react') || thresholds.includes('proceed')) {
            score += 3;
        }
        
        // Check for prioritization
        if (application.includes('priority') || application.includes('urgent') ||
            application.includes('critical') || application.includes('important') ||
            application.includes('high') || application.includes('immediate') ||
            application.includes('focus') || application.includes('key')) {
            score += 3;
        }
        
        // Check for implementation
        if (application.includes('implement') || application.includes('execute') ||
            application.includes('apply') || application.includes('use') ||
            application.includes('deploy') || application.includes('activate') ||
            application.includes('launch') || application.includes('start')) {
            score += 3;
        }
        
        // Bonus for comprehensive answers
        if (combined.length > 150) {
            score += 2;
        }
        
        return Math.min(score, 20);
    }

    generateDimensionFeedback(dimension, score, maxScore) {
        const percentage = (score / maxScore) * 100;
        const feedback = {
            signalIdentification: {
                high: "✓ Leading indicators identified\n✓ Multiple signal types\n✓ Quantitative measures included",
                medium: "✓ Some signals identified\n✗ Add leading indicators\n✗ Include more signal types",
                low: "✗ Identify key signals\n✗ Define leading indicators\n✗ Add quantitative measures"
            },
            noiseFiltering: {
                high: "✓ Noise patterns identified\n✓ Clear filtering criteria\n✓ Validation process defined",
                medium: "✓ Some noise awareness\n✗ Define filtering criteria\n✗ Add validation steps",
                low: "✗ Identify noise patterns\n✗ Create filtering criteria\n✗ Establish validation"
            },
            scoringFramework: {
                high: "✓ Clear scoring methodology\n✓ Criteria well-defined\n✓ Consistent framework",
                medium: "✓ Basic scoring approach\n✗ Define clear criteria\n✗ Ensure consistency",
                low: "✗ Create scoring framework\n✗ Define scoring criteria\n✗ Establish consistency"
            },
            validationProcess: {
                high: "✓ Robust validation methods\n✓ Multiple data sources\n✓ Iterative refinement",
                medium: "✓ Some validation planned\n✗ Add data sources\n✗ Plan iteration",
                low: "✗ Define validation process\n✗ Identify data sources\n✗ Plan refinement"
            },
            actionThresholds: {
                high: "✓ Clear action thresholds\n✓ Decisions mapped\n✓ Implementation ready",
                medium: "✓ Basic thresholds defined\n✗ Map to actions\n✗ Plan implementation",
                low: "✗ Define thresholds\n✗ Map to decisions\n✗ Create action plan"
            }
        };
        
        if (percentage >= 70) return feedback[dimension].high;
        if (percentage >= 40) return feedback[dimension].medium;
        return feedback[dimension].low;
    }

    generateRecommendations(scores, parsedData) {
        const recommendations = [];
        
        const dimensions = Object.entries(scores)
            .sort((a, b) => a[1].percentage - b[1].percentage)
            .slice(0, 3);
        
        for (const [dimension, data] of dimensions) {
            const improvement = Math.round((data.maxScore - data.score) * 0.7);
            
            if (dimension === 'signalIdentification' && data.percentage < 70) {
                recommendations.push({
                    area: 'Signal Discovery',
                    priority: data.percentage < 40 ? 'CRITICAL' : 'HIGH',
                    impact: `+${improvement} points`,
                    actionPlan: [
                        'Identify leading indicators of success',
                        'Map behavioral and engagement signals',
                        'Define quantitative metrics',
                        'Categorize signal types and sources'
                    ]
                });
            }
            
            if (dimension === 'scoringFramework' && data.percentage < 70) {
                recommendations.push({
                    area: 'Scoring System',
                    priority: 'HIGH',
                    impact: `+${improvement} points`,
                    actionPlan: [
                        'Create weighted scoring model',
                        'Define clear scoring criteria',
                        'Establish scoring scales',
                        'Ensure scoring consistency'
                    ]
                });
            }
            
            if (dimension === 'actionThresholds' && data.percentage < 70) {
                recommendations.push({
                    area: 'Action Triggers',
                    priority: 'MEDIUM',
                    impact: `+${improvement} points`,
                    actionPlan: [
                        'Define clear action thresholds',
                        'Map thresholds to decisions',
                        'Create response playbooks',
                        'Implement monitoring system'
                    ]
                });
            }
        }
        
        return recommendations;
    }

    generateExecutiveSummary(score, dimensions, parsedData) {
        if (score >= 80) {
            return "Excellent signal grading system with sophisticated ability to separate valuable insights from noise. Your scoring framework and action thresholds enable data-driven decision making. Focus on continuous calibration and validation.";
        } else if (score >= 60) {
            return "Solid signal identification with good understanding of key indicators. Your grading system shows thoughtful consideration of what matters. To strengthen further, improve noise filtering, formalize scoring methodology, and set clearer action thresholds.";
        } else if (score >= 40) {
            return "You're developing signal awareness with important elements in place. To enhance your grading system, focus on comprehensive signal mapping, establishing noise filtering criteria, and building a consistent scoring framework. These improvements will significantly boost insight quality.";
        } else if (score >= 20) {
            return "Initial signal grading work shows you're thinking about data quality. Continue building by identifying leading indicators, creating filtering criteria, and establishing a scoring framework. This foundation is crucial for separating valuable insights from noise.";
        } else {
            return "Signal grading system needs development. Start with the basics: identify 3-5 key signals to track, understand common noise patterns, create a simple scoring model, and define action thresholds. This will enable more effective decision-making.";
        }
    }
}

// Export for use in server
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SignalGradingAgentEnhanced;
}
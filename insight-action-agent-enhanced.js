// Insight-to-Action Loop Analysis Agent
// Evaluates process for converting insights to decisions

const { RecommendationsLibraryDynamic } = require('./recommendations-library-dynamic');

class InsightActionAgentEnhanced {
    constructor() {
        this.dimensions = {
            insightCapture: {
                weight: 20,
                maxScore: 20,
                evaluate: (data) => this.evaluateInsightCapture(data)
            },
            synthesisProcess: {
                weight: 20,
                maxScore: 20,
                evaluate: (data) => this.evaluateSynthesisProcess(data)
            },
            decisionMapping: {
                weight: 20,
                maxScore: 20,
                evaluate: (data) => this.evaluateDecisionMapping(data)
            },
            executionSpeed: {
                weight: 20,
                maxScore: 20,
                evaluate: (data) => this.evaluateExecutionSpeed(data)
            },
            feedbackLoop: {
                weight: 20,
                maxScore: 20,
                evaluate: (data) => this.evaluateFeedbackLoop(data)
            }
        };
    }

    analyzeWorksheet(worksheetData) {
        console.log('📊 Insight-to-Action Agent: Starting analysis...');
        
        const parsedData = this.parseWorksheetData(worksheetData);
        console.log('📋 Parsed insight-to-action data');
        
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
        console.log(`✅ Insight-to-Action Analysis complete: ${overallScore}%`);
        
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
            capture: getValue(1),         // How insights are captured
            synthesis: getValue(2),        // Synthesis and analysis process
            decisions: getValue(3),        // Decision mapping process
            execution: getValue(4),        // Speed to implementation
            feedback: getValue(5),         // Feedback and iteration
            measurement: getValue(6)       // Impact measurement
        };
    }

    evaluateInsightCapture(data) {
        let score = 0;
        const capture = data.capture.toLowerCase();
        
        // Base score for any substantive answer
        if (capture.length > 20) {
            score = 8; // Start with 40% base score
        }
        
        // Check for systematic capture
        if (capture.includes('system') || capture.includes('process') ||
            capture.includes('structured') || capture.includes('framework') ||
            capture.includes('method') || capture.includes('approach') ||
            capture.includes('organized') || capture.includes('formal')) {
            score += 3;
        }
        
        // Check for tools/platforms
        if (capture.includes('tool') || capture.includes('platform') ||
            capture.includes('software') || capture.includes('database') ||
            capture.includes('app') || capture.includes('spreadsheet') ||
            capture.includes('doc') || capture.includes('crm')) {
            score += 3;
        }
        
        // Check for real-time capture
        if (capture.includes('real-time') || capture.includes('immediate') ||
            capture.includes('instant') || capture.includes('live') ||
            capture.includes('quick') || capture.includes('fast') ||
            capture.includes('during') || capture.includes('as')) {
            score += 3;
        }
        
        // Check for categorization
        if (capture.includes('categorize') || capture.includes('tag') ||
            capture.includes('organize') || capture.includes('classify') ||
            capture.includes('group') || capture.includes('sort') ||
            capture.includes('label') || capture.includes('type')) {
            score += 3;
        }
        
        // Bonus for comprehensive answers
        if (capture.length > 100) {
            score += 2;
        }
        
        return Math.min(score, 20);
    }

    evaluateSynthesisProcess(data) {
        let score = 0;
        const synthesis = data.synthesis.toLowerCase();
        
        // Base score for any substantive answer
        if (synthesis.length > 20) {
            score = 8; // Start with 40% base score
        }
        
        // Check for analysis methods
        if (synthesis.includes('analyze') || synthesis.includes('synthesis') ||
            synthesis.includes('pattern') || synthesis.includes('trend') ||
            synthesis.includes('theme') || synthesis.includes('insight') ||
            synthesis.includes('finding') || synthesis.includes('discover')) {
            score += 3;
        }
        
        // Check for regular cadence
        if (synthesis.includes('weekly') || synthesis.includes('monthly') ||
            synthesis.includes('regular') || synthesis.includes('scheduled') ||
            synthesis.includes('daily') || synthesis.includes('routine') ||
            synthesis.includes('periodic') || synthesis.includes('consistent')) {
            score += 3;
        }
        
        // Check for team involvement
        if (synthesis.includes('team') || synthesis.includes('collaborative') ||
            synthesis.includes('cross-functional') || synthesis.includes('stakeholder') ||
            synthesis.includes('together') || synthesis.includes('group') ||
            synthesis.includes('share') || synthesis.includes('discuss')) {
            score += 3;
        }
        
        // Check for prioritization
        if (synthesis.includes('prioritize') || synthesis.includes('rank') ||
            synthesis.includes('importance') || synthesis.includes('critical') ||
            synthesis.includes('key') || synthesis.includes('focus') ||
            synthesis.includes('top') || synthesis.includes('urgent')) {
            score += 3;
        }
        
        // Bonus for comprehensive answers
        if (synthesis.length > 100) {
            score += 2;
        }
        
        return Math.min(score, 20);
    }

    evaluateDecisionMapping(data) {
        let score = 0;
        const decisions = data.decisions.toLowerCase();
        
        // Base score for any substantive answer
        if (decisions.length > 20) {
            score = 8; // Start with 40% base score
        }
        
        // Check for decision criteria
        if (decisions.includes('criteria') || decisions.includes('threshold') ||
            decisions.includes('framework') || decisions.includes('model') ||
            decisions.includes('rule') || decisions.includes('guideline') ||
            decisions.includes('standard') || decisions.includes('principle')) {
            score += 3;
        }
        
        // Check for stakeholder alignment
        if (decisions.includes('stakeholder') || decisions.includes('alignment') ||
            decisions.includes('consensus') || decisions.includes('approval') ||
            decisions.includes('agree') || decisions.includes('buy-in') ||
            decisions.includes('support') || decisions.includes('endorse')) {
            score += 3;
        }
        
        // Check for action planning
        if (decisions.includes('action') || decisions.includes('plan') ||
            decisions.includes('roadmap') || decisions.includes('implementation') ||
            decisions.includes('execute') || decisions.includes('step') ||
            decisions.includes('task') || decisions.includes('initiative')) {
            score += 3;
        }
        
        // Check for resource allocation
        if (decisions.includes('resource') || decisions.includes('budget') ||
            decisions.includes('team') || decisions.includes('allocation') ||
            decisions.includes('assign') || decisions.includes('dedicate') ||
            decisions.includes('invest') || decisions.includes('fund')) {
            score += 3;
        }
        
        // Bonus for comprehensive answers
        if (decisions.length > 100) {
            score += 2;
        }
        
        return Math.min(score, 20);
    }

    evaluateExecutionSpeed(data) {
        let score = 0;
        const execution = data.execution.toLowerCase();
        
        // Base score for any substantive answer
        if (execution.length > 20) {
            score = 8; // Start with 40% base score
        }
        
        // Check for speed metrics
        if (execution.includes('fast') || execution.includes('quick') ||
            execution.includes('rapid') || execution.includes('immediate') ||
            execution.includes('swift') || execution.includes('prompt') ||
            execution.includes('agile') || execution.includes('speed')) {
            score += 3;
        }
        
        // Check for time frames
        if (execution.includes('day') || execution.includes('week') ||
            execution.includes('hour') || /\d+/.test(execution) ||
            execution.includes('month') || execution.includes('time') ||
            execution.includes('deadline') || execution.includes('schedule')) {
            score += 3;
        }
        
        // Check for automation
        if (execution.includes('automate') || execution.includes('automatic') ||
            execution.includes('trigger') || execution.includes('workflow') ||
            execution.includes('system') || execution.includes('process') ||
            execution.includes('tool') || execution.includes('software')) {
            score += 3;
        }
        
        // Check for barriers removal
        if (execution.includes('remove') || execution.includes('eliminate') ||
            execution.includes('streamline') || execution.includes('simplify') ||
            execution.includes('reduce') || execution.includes('optimize') ||
            execution.includes('improve') || execution.includes('accelerate')) {
            score += 3;
        }
        
        // Bonus for comprehensive answers
        if (execution.length > 100) {
            score += 2;
        }
        
        return Math.min(score, 20);
    }

    evaluateFeedbackLoop(data) {
        let score = 0;
        const feedback = data.feedback.toLowerCase();
        const measurement = data.measurement.toLowerCase();
        const combined = feedback + ' ' + measurement;
        
        // Base score for any substantive answer
        if (combined.length > 40) {
            score = 8; // Start with 40% base score
        }
        
        // Check for feedback mechanisms
        if (feedback.includes('feedback') || feedback.includes('loop') ||
            feedback.includes('iterate') || feedback.includes('learn') ||
            feedback.includes('adjust') || feedback.includes('adapt') ||
            feedback.includes('respond') || feedback.includes('react')) {
            score += 3;
        }
        
        // Check for measurement
        if (measurement.includes('measure') || measurement.includes('metric') ||
            measurement.includes('kpi') || measurement.includes('track') ||
            measurement.includes('monitor') || measurement.includes('assess') ||
            measurement.includes('evaluate') || measurement.includes('analyze')) {
            score += 3;
        }
        
        // Check for impact assessment
        if (measurement.includes('impact') || measurement.includes('result') ||
            measurement.includes('outcome') || measurement.includes('effect') ||
            measurement.includes('change') || measurement.includes('difference') ||
            measurement.includes('improvement') || measurement.includes('success')) {
            score += 3;
        }
        
        // Check for continuous improvement
        if (feedback.includes('improve') || feedback.includes('optimize') ||
            feedback.includes('refine') || feedback.includes('enhance') ||
            feedback.includes('better') || feedback.includes('evolve') ||
            feedback.includes('develop') || feedback.includes('grow')) {
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
            insightCapture: {
                high: "✓ Systematic capture process\n✓ Tools and platforms in place\n✓ Real-time documentation",
                medium: "✓ Some capture process\n✗ Need better tools\n✗ Improve documentation speed",
                low: "✗ Create capture system\n✗ Implement tools\n✗ Enable real-time capture"
            },
            synthesisProcess: {
                high: "✓ Regular synthesis cadence\n✓ Team collaboration\n✓ Clear prioritization",
                medium: "✓ Basic synthesis process\n✗ Need regular cadence\n✗ Improve prioritization",
                low: "✗ Establish synthesis process\n✗ Set regular cadence\n✗ Create prioritization framework"
            },
            decisionMapping: {
                high: "✓ Clear decision criteria\n✓ Stakeholder alignment\n✓ Action plans ready",
                medium: "✓ Some decision process\n✗ Improve criteria\n✗ Better stakeholder alignment",
                low: "✗ Define decision criteria\n✗ Align stakeholders\n✗ Create action plans"
            },
            executionSpeed: {
                high: "✓ Fast execution process\n✓ Clear timeframes\n✓ Barriers removed",
                medium: "✓ Moderate execution speed\n✗ Define timeframes\n✗ Remove barriers",
                low: "✗ Accelerate execution\n✗ Set time targets\n✗ Eliminate barriers"
            },
            feedbackLoop: {
                high: "✓ Strong feedback loops\n✓ Impact measured\n✓ Continuous improvement",
                medium: "✓ Some feedback process\n✗ Better measurement\n✗ Systematic improvement",
                low: "✗ Create feedback loops\n✗ Implement measurement\n✗ Enable iteration"
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
            
            if (dimension === 'insightCapture' && data.percentage < 70) {
                recommendations.push({
                    area: 'Insight Capture System',
                    priority: data.percentage < 40 ? 'CRITICAL' : 'HIGH',
                    impact: `+${improvement} points`,
                    actionPlan: [
                        'Implement centralized insight repository',
                        'Create real-time capture workflows',
                        'Deploy collaboration tools',
                        'Establish tagging and categorization'
                    ]
                });
            }
            
            if (dimension === 'executionSpeed' && data.percentage < 70) {
                recommendations.push({
                    area: 'Execution Velocity',
                    priority: 'HIGH',
                    impact: `+${improvement} points`,
                    actionPlan: [
                        'Set execution time targets',
                        'Remove decision bottlenecks',
                        'Automate routine actions',
                        'Create rapid response playbooks'
                    ]
                });
            }
            
            if (dimension === 'feedbackLoop' && data.percentage < 70) {
                recommendations.push({
                    area: 'Learning System',
                    priority: 'MEDIUM',
                    impact: `+${improvement} points`,
                    actionPlan: [
                        'Implement impact measurement',
                        'Create feedback collection process',
                        'Establish iteration cycles',
                        'Build learning documentation'
                    ]
                });
            }
        }
        
        return recommendations;
    }

    generateExecutiveSummary(score, dimensions, parsedData) {
        if (score >= 80) {
            return "Excellent insight-to-action loop with rapid conversion of customer learning into business decisions. Your systematic approach to capture, synthesis, and execution drives continuous improvement. Focus on maintaining velocity and expanding automation.";
        } else if (score >= 60) {
            return "Solid insight processing with good foundation for action. Your loop shows thoughtful consideration of how to turn learning into decisions. To strengthen further, improve capture systems, accelerate execution speed, and enhance feedback mechanisms.";
        } else if (score >= 40) {
            return "You're developing an insight-to-action process with key elements in place. To enhance your loop, focus on systematic capture, faster decision mapping, and stronger feedback mechanisms. These improvements will significantly boost your agility and responsiveness.";
        } else if (score >= 20) {
            return "Initial insight-to-action work shows you're thinking about learning loops. Continue building by creating capture systems, establishing synthesis cadence, and defining decision criteria. This foundation is crucial for converting insights into competitive advantage.";
        } else {
            return "Insight-to-action loop needs development. Start with the basics: set up a simple capture system, schedule regular synthesis sessions, define decision criteria, and track implementation. Quick conversion of insights to action is essential for market success.";
        }
    }
}

// Export for use in server
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InsightActionAgentEnhanced;
}
// JTBD Capture Analysis Agent
// Evaluates Jobs-to-be-done breakdown for user goals

const { RecommendationsLibraryDynamic } = require('./recommendations-library-dynamic');

class JTBDCaptureAgentEnhanced {
    constructor() {
        this.dimensions = {
            jobIdentification: {
                weight: 20,
                maxScore: 20,
                evaluate: (data) => this.evaluateJobIdentification(data)
            },
            outcomeDefinition: {
                weight: 20,
                maxScore: 20,
                evaluate: (data) => this.evaluateOutcomeDefinition(data)
            },
            contextMapping: {
                weight: 20,
                maxScore: 20,
                evaluate: (data) => this.evaluateContextMapping(data)
            },
            alternativeAnalysis: {
                weight: 20,
                maxScore: 20,
                evaluate: (data) => this.evaluateAlternativeAnalysis(data)
            },
            successCriteria: {
                weight: 20,
                maxScore: 20,
                evaluate: (data) => this.evaluateSuccessCriteria(data)
            }
        };
    }

    analyzeWorksheet(worksheetData) {
        console.log('📊 JTBD Capture Agent: Starting analysis...');
        
        const parsedData = this.parseWorksheetData(worksheetData);
        console.log('📋 Parsed JTBD capture data');
        
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
        console.log(`✅ JTBD Capture Analysis complete: ${overallScore}%`);
        
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
            jobs: getValue(1),           // Core jobs to be done
            outcomes: getValue(2),        // Desired outcomes
            context: getValue(3),         // When/where jobs arise
            alternatives: getValue(4),    // Current alternatives/workarounds
            success: getValue(5),         // Success criteria
            barriers: getValue(6)         // Barriers to job completion
        };
    }

    evaluateJobIdentification(data) {
        let score = 0;
        const jobs = data.jobs.toLowerCase();
        
        // Base score for any substantive answer
        if (jobs.length > 20) {
            score = 8; // Start with 40% base score
        }
        
        // Check for functional jobs
        if (jobs.includes('accomplish') || jobs.includes('achieve') ||
            jobs.includes('complete') || jobs.includes('perform') ||
            jobs.includes('do') || jobs.includes('execute') ||
            jobs.includes('manage') || jobs.includes('handle')) {
            score += 3;
        }
        
        // Check for emotional jobs
        if (jobs.includes('feel') || jobs.includes('emotion') ||
            jobs.includes('confidence') || jobs.includes('peace') ||
            jobs.includes('comfort') || jobs.includes('secure') ||
            jobs.includes('happy') || jobs.includes('satisfied')) {
            score += 3;
        }
        
        // Check for social jobs
        if (jobs.includes('appear') || jobs.includes('status') ||
            jobs.includes('perception') || jobs.includes('social') ||
            jobs.includes('impress') || jobs.includes('reputation') ||
            jobs.includes('image') || jobs.includes('professional')) {
            score += 3;
        }
        
        // Check for specificity
        if (jobs.includes('when') || jobs.includes('specific') ||
            /\d+/.test(jobs) || jobs.includes('particular') ||
            jobs.includes('certain') || jobs.includes('exact')) {
            score += 3;
        }
        
        // Bonus for comprehensive answers
        if (jobs.length > 100) {
            score += 2;
        }
        
        return Math.min(score, 20);
    }

    evaluateOutcomeDefinition(data) {
        let score = 0;
        const outcomes = data.outcomes.toLowerCase();
        
        // Base score for any substantive answer
        if (outcomes.length > 20) {
            score = 8; // Start with 40% base score
        }
        
        // Check for measurable outcomes
        if (/\d+/.test(outcomes) || outcomes.includes('measure') ||
            outcomes.includes('metric') || outcomes.includes('quantif') ||
            outcomes.includes('number') || outcomes.includes('percent')) {
            score += 3;
        }
        
        // Check for time-based outcomes
        if (outcomes.includes('faster') || outcomes.includes('quicker') ||
            outcomes.includes('time') || outcomes.includes('speed') ||
            outcomes.includes('duration') || outcomes.includes('quick') ||
            outcomes.includes('rapid') || outcomes.includes('efficient')) {
            score += 3;
        }
        
        // Check for quality outcomes
        if (outcomes.includes('better') || outcomes.includes('quality') ||
            outcomes.includes('accurate') || outcomes.includes('reliable') ||
            outcomes.includes('improve') || outcomes.includes('enhance') ||
            outcomes.includes('superior') || outcomes.includes('excellent')) {
            score += 3;
        }
        
        // Check for value outcomes
        if (outcomes.includes('value') || outcomes.includes('worth') ||
            outcomes.includes('roi') || outcomes.includes('benefit') ||
            outcomes.includes('return') || outcomes.includes('gain') ||
            outcomes.includes('save') || outcomes.includes('reduce')) {
            score += 3;
        }
        
        // Bonus for comprehensive answers
        if (outcomes.length > 100) {
            score += 2;
        }
        
        return Math.min(score, 20);
    }

    evaluateContextMapping(data) {
        let score = 0;
        const context = data.context.toLowerCase();
        
        // Base score for any substantive answer
        if (context.length > 20) {
            score = 8; // Start with 40% base score
        }
        
        // Check for situational triggers
        if (context.includes('when') || context.includes('during') ||
            context.includes('while') || context.includes('before') ||
            context.includes('after') || context.includes('as') ||
            context.includes('whenever') || context.includes('once')) {
            score += 3;
        }
        
        // Check for location context
        if (context.includes('where') || context.includes('location') ||
            context.includes('place') || context.includes('environment') ||
            context.includes('office') || context.includes('home') ||
            context.includes('remote') || context.includes('site')) {
            score += 3;
        }
        
        // Check for frequency
        if (context.includes('daily') || context.includes('weekly') ||
            context.includes('often') || context.includes('frequency') ||
            context.includes('regular') || context.includes('always') ||
            context.includes('sometimes') || context.includes('monthly')) {
            score += 3;
        }
        
        // Check for constraints
        if (context.includes('constraint') || context.includes('limitation') ||
            context.includes('restriction') || context.includes('challenge') ||
            context.includes('pressure') || context.includes('deadline') ||
            context.includes('budget') || context.includes('resource')) {
            score += 3;
        }
        
        // Bonus for comprehensive answers
        if (context.length > 100) {
            score += 2;
        }
        
        return Math.min(score, 20);
    }

    evaluateAlternativeAnalysis(data) {
        let score = 0;
        const alternatives = data.alternatives.toLowerCase();
        
        // Base score for any substantive answer
        if (alternatives.length > 20) {
            score = 8; // Start with 40% base score
        }
        
        // Check for current solutions
        if (alternatives.includes('current') || alternatives.includes('existing') ||
            alternatives.includes('today') || alternatives.includes('now') ||
            alternatives.includes('present') || alternatives.includes('already') ||
            alternatives.includes('using') || alternatives.includes('have')) {
            score += 3;
        }
        
        // Check for workarounds
        if (alternatives.includes('workaround') || alternatives.includes('manual') ||
            alternatives.includes('hack') || alternatives.includes('makeshift') ||
            alternatives.includes('temporary') || alternatives.includes('bandaid') ||
            alternatives.includes('patch') || alternatives.includes('duct tape')) {
            score += 3;
        }
        
        // Check for competitor solutions
        if (alternatives.includes('competitor') || alternatives.includes('alternative') ||
            alternatives.includes('other') || alternatives.includes('different') ||
            alternatives.includes('instead') || alternatives.includes('option') ||
            alternatives.includes('choice') || alternatives.includes('substitute')) {
            score += 3;
        }
        
        // Check for non-consumption
        if (alternatives.includes('nothing') || alternatives.includes('avoid') ||
            alternatives.includes('skip') || alternatives.includes('without') ||
            alternatives.includes('ignore') || alternatives.includes('delay') ||
            alternatives.includes('postpone') || alternatives.includes('wait')) {
            score += 3;
        }
        
        // Bonus for comprehensive answers
        if (alternatives.length > 100) {
            score += 2;
        }
        
        return Math.min(score, 20);
    }

    evaluateSuccessCriteria(data) {
        let score = 0;
        const success = data.success.toLowerCase();
        const barriers = data.barriers.toLowerCase();
        const combined = success + ' ' + barriers;
        
        // Base score for any substantive answer
        if (combined.length > 40) {
            score = 8; // Start with 40% base score
        }
        
        // Check for clear criteria
        if (success.includes('success') || success.includes('complete') ||
            success.includes('achieve') || success.includes('accomplish') ||
            success.includes('done') || success.includes('finish') ||
            success.includes('goal') || success.includes('objective')) {
            score += 3;
        }
        
        // Check for metrics
        if (/\d+/.test(success) || success.includes('measure') ||
            success.includes('kpi') || success.includes('metric') ||
            success.includes('indicator') || success.includes('benchmark') ||
            success.includes('target') || success.includes('threshold')) {
            score += 3;
        }
        
        // Check for barrier identification
        if (barriers.includes('barrier') || barriers.includes('obstacle') ||
            barriers.includes('challenge') || barriers.includes('prevent') ||
            barriers.includes('block') || barriers.includes('stop') ||
            barriers.includes('difficult') || barriers.includes('hard')) {
            score += 3;
        }
        
        // Check for solution mapping
        if (barriers.includes('overcome') || barriers.includes('solve') ||
            barriers.includes('address') || barriers.includes('remove') ||
            barriers.includes('eliminate') || barriers.includes('reduce') ||
            barriers.includes('mitigate') || barriers.includes('handle')) {
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
            jobIdentification: {
                high: "✓ Multiple job types identified\n✓ Functional and emotional jobs\n✓ Specific and actionable",
                medium: "✓ Some jobs identified\n✗ Include emotional/social jobs\n✗ Add more specificity",
                low: "✗ Identify core jobs\n✗ Consider all job types\n✗ Be more specific"
            },
            outcomeDefinition: {
                high: "✓ Clear desired outcomes\n✓ Measurable results\n✓ Value clearly defined",
                medium: "✓ Basic outcomes defined\n✗ Make more measurable\n✗ Clarify value proposition",
                low: "✗ Define desired outcomes\n✗ Add measurable criteria\n✗ Specify value creation"
            },
            contextMapping: {
                high: "✓ Clear situational triggers\n✓ Context well mapped\n✓ Constraints identified",
                medium: "✓ Some context provided\n✗ Add more detail\n✗ Identify constraints",
                low: "✗ Map job context\n✗ Identify triggers\n✗ Document constraints"
            },
            alternativeAnalysis: {
                high: "✓ Current solutions analyzed\n✓ Workarounds documented\n✓ Gaps identified",
                medium: "✓ Some alternatives noted\n✗ Analyze workarounds\n✗ Identify gaps",
                low: "✗ Analyze current solutions\n✗ Document workarounds\n✗ Identify non-consumption"
            },
            successCriteria: {
                high: "✓ Clear success criteria\n✓ Barriers identified\n✓ Solutions mapped",
                medium: "✓ Basic criteria defined\n✗ Identify barriers\n✗ Map solutions",
                low: "✗ Define success criteria\n✗ Identify barriers\n✗ Plan solutions"
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
            
            if (dimension === 'jobIdentification' && data.percentage < 70) {
                recommendations.push({
                    area: 'Job Discovery',
                    priority: data.percentage < 40 ? 'CRITICAL' : 'HIGH',
                    impact: `+${improvement} points`,
                    actionPlan: [
                        'Interview customers about their goals',
                        'Identify functional, emotional, and social jobs',
                        'Map job hierarchy and relationships',
                        'Validate job importance with customers'
                    ]
                });
            }
            
            if (dimension === 'outcomeDefinition' && data.percentage < 70) {
                recommendations.push({
                    area: 'Outcome Clarity',
                    priority: 'HIGH',
                    impact: `+${improvement} points`,
                    actionPlan: [
                        'Define measurable success outcomes',
                        'Quantify time and quality improvements',
                        'Specify value creation metrics',
                        'Test outcome importance with users'
                    ]
                });
            }
            
            if (dimension === 'contextMapping' && data.percentage < 70) {
                recommendations.push({
                    area: 'Context Understanding',
                    priority: 'MEDIUM',
                    impact: `+${improvement} points`,
                    actionPlan: [
                        'Map when and where jobs arise',
                        'Identify triggering situations',
                        'Document environmental constraints',
                        'Understand job frequency patterns'
                    ]
                });
            }
        }
        
        return recommendations;
    }

    generateExecutiveSummary(score, dimensions, parsedData) {
        if (score >= 80) {
            return "Excellent JTBD framework with comprehensive understanding of customer goals and desired outcomes. Your detailed mapping of jobs, contexts, and success criteria provides strong foundation for solution design. Focus on continuous validation as you build.";
        } else if (score >= 60) {
            return "Solid job identification with good understanding of core customer goals. Your framework shows thoughtful consideration of what customers are trying to accomplish. To strengthen further, add more outcome metrics, deeper context mapping, and clearer success criteria.";
        } else if (score >= 40) {
            return "You're developing a JTBD understanding with key elements in place. To enhance your framework, focus on comprehensive job discovery, measurable outcome definition, and thorough alternative analysis. These improvements will significantly strengthen your product positioning.";
        } else if (score >= 20) {
            return "Initial JTBD exploration shows you're thinking about customer goals. Continue building by conducting job interviews, mapping desired outcomes in detail, and analyzing how customers currently solve these problems. This deeper understanding is crucial for solution-job fit.";
        } else {
            return "JTBD framework needs development. Start with the basics: identify what customers are trying to accomplish, understand their desired outcomes, document current alternatives, and define success criteria. This foundation is essential for product-market fit.";
        }
    }
}

// Export for use in server
if (typeof module !== 'undefined' && module.exports) {
    module.exports = JTBDCaptureAgentEnhanced;
}
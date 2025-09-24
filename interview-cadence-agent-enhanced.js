// Interview Cadence Plan Analysis Agent
// Evaluates structured plans for recurring customer discovery

const { RecommendationsLibraryDynamic } = require('./recommendations-library-dynamic');

class InterviewCadenceAgentEnhanced {
    constructor() {
        this.dimensions = {
            frequencyPlanning: {
                weight: 20,
                maxScore: 20,
                evaluate: (data) => this.evaluateFrequencyPlanning(data)
            },
            segmentCoverage: {
                weight: 20,
                maxScore: 20,
                evaluate: (data) => this.evaluateSegmentCoverage(data)
            },
            methodologyMix: {
                weight: 20,
                maxScore: 20,
                evaluate: (data) => this.evaluateMethodologyMix(data)
            },
            questionFramework: {
                weight: 20,
                maxScore: 20,
                evaluate: (data) => this.evaluateQuestionFramework(data)
            },
            insightCapture: {
                weight: 20,
                maxScore: 20,
                evaluate: (data) => this.evaluateInsightCapture(data)
            }
        };
    }

    analyzeWorksheet(worksheetData) {
        console.log('📊 Interview Cadence Agent: Starting analysis...');
        
        // Parse worksheet data
        const parsedData = this.parseWorksheetData(worksheetData);
        console.log('📋 Parsed interview cadence data');
        
        // Evaluate each dimension
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
        console.log(`✅ Interview Cadence Analysis complete: ${overallScore}%`);
        
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
        // Handle both field-N and fieldN formats
        const getValue = (num) => {
            return worksheetData[`field-${num}`] || 
                   worksheetData[`field${num}`] || 
                   worksheetData[`field_${num}`] || 
                   '';
        };
        
        return {
            frequency: getValue(1),      // How often interviews are conducted
            segments: getValue(2),        // Target customer segments
            methods: getValue(3),         // Interview methods (1:1, group, surveys)
            questions: getValue(4),       // Core questions framework
            documentation: getValue(5),   // How insights are captured
            actionPlan: getValue(6)       // How insights drive decisions
        };
    }

    evaluateFrequencyPlanning(data) {
        let score = 0;
        const frequency = data.frequency.toLowerCase();
        
        // Base score for any substantive answer (minimum 40%)
        if (frequency.length > 20) {
            score = 8; // Start with 40% base score
        }
        
        // Enhanced frequency detection with context awareness
        if (frequency.includes('daily') || frequency.includes('every day')) {
            score += 6; // Daily is better than weekly
        } else if (frequency.includes('weekly') || frequency.includes('bi-weekly') || frequency.includes('twice')) {
            score += 5;
        } else if (frequency.includes('monthly')) {
            score += 4;
        } else if (frequency.includes('quarterly')) {
            score += 3;
        }
        
        // Reward specific numbers and metrics
        const numberMatch = frequency.match(/\d+/g);
        if (numberMatch) {
            score += Math.min(numberMatch.length * 2, 4); // Up to 4 points for specificity
        }
        
        // Check for interview volume indicators
        if (frequency.includes('interview') || frequency.includes('customer') ||
            frequency.includes('user') || frequency.includes('conversation') ||
            frequency.includes('session') || frequency.includes('meeting')) {
            score += 2;
        }
        
        // Reward consistency and planning
        if (frequency.includes('regular') || frequency.includes('consistent') ||
            frequency.includes('ongoing') || frequency.includes('continuous') ||
            frequency.includes('systematic')) {
            score += 2;
        }
        
        // Reward scheduling and structure
        if (frequency.includes('calendar') || frequency.includes('schedule') ||
            frequency.includes('plan') || frequency.includes('structured') ||
            frequency.includes('organized')) {
            score += 2;
        }
        
        // Bonus for comprehensive answers
        if (frequency.length > 100) {
            score += 2; // Reward detailed responses
        }
        
        return Math.min(score, 20);
    }

    evaluateSegmentCoverage(data) {
        let score = 0;
        const segments = data.segments.toLowerCase();
        
        // Base score for any substantive answer
        if (segments.length > 20) {
            score = 8; // Start with 40% base score
        }
        
        // Enhanced segment detection
        const segmentIndicators = ['enterprise', 'smb', 'startup', 'consumer', 'b2b', 'b2c',
                                   'segment', 'cohort', 'tier', 'small', 'medium', 'large',
                                   'company', 'business', 'organization', 'team', 'group'];
        const foundSegments = segmentIndicators.filter(indicator => segments.includes(indicator));
        score += Math.min(foundSegments.length * 2, 6);
        
        // Check for personas and roles
        if (segments.includes('buyer') || segments.includes('user') ||
            segments.includes('decision') || segments.includes('stakeholder') ||
            segments.includes('champion') || segments.includes('influencer') ||
            segments.includes('admin') || segments.includes('manager')) {
            score += 3;
        }
        
        // Check for prioritization and strategy
        if (segments.includes('priority') || segments.includes('focus') ||
            segments.includes('primary') || segments.includes('key') ||
            segments.includes('target') || segments.includes('main')) {
            score += 2;
        }
        
        // Check for diversity and coverage
        if (segments.includes('diverse') || segments.includes('variety') ||
            segments.includes('range') || segments.includes('multiple') ||
            segments.includes('different') || segments.includes('various')) {
            score += 1;
        }
        
        // Bonus for comprehensive answers
        if (segments.length > 100) {
            score += 2;
        }
        
        return Math.min(score, 20);
    }

    evaluateMethodologyMix(data) {
        let score = 0;
        const methods = data.methods.toLowerCase();
        
        // Base score for any substantive answer
        if (methods.length > 20) {
            score = 8; // Start with 40% base score
        }
        
        // Enhanced method detection
        const methodTypes = ['1:1', 'one-on-one', 'group', 'focus', 'survey', 'observation',
                            'contextual', 'remote', 'in-person', 'interview', 'call',
                            'meeting', 'session', 'discussion', 'conversation', 'chat',
                            'video', 'phone', 'email', 'form', 'questionnaire'];
        const foundMethods = methodTypes.filter(method => methods.includes(method));
        score += Math.min(foundMethods.length * 1.5, 6);
        
        // Check for structured approach
        if (methods.includes('structured') || methods.includes('semi-structured') ||
            methods.includes('framework') || methods.includes('systematic') ||
            methods.includes('organized') || methods.includes('planned')) {
            score += 3;
        }
        
        // Check for tools and platforms
        if (methods.includes('zoom') || methods.includes('calendly') ||
            methods.includes('typeform') || methods.includes('tool') ||
            methods.includes('platform') || methods.includes('software') ||
            methods.includes('system') || methods.includes('app')) {
            score += 3;
        }
        
        // Bonus for comprehensive answers
        if (methods.length > 100) {
            score += 2;
        }
        
        return Math.min(score, 20);
    }

    evaluateQuestionFramework(data) {
        let score = 0;
        const questions = data.questions.toLowerCase();
        
        // Base score for any substantive answer
        if (questions.length > 20) {
            score = 8; // Start with 40% base score
        }
        
        // Enhanced question category detection
        const categories = ['problem', 'solution', 'workflow', 'pain', 'gain', 'job',
                          'outcome', 'value', 'challenge', 'need', 'goal', 'objective',
                          'process', 'task', 'activity', 'benefit', 'impact', 'result'];
        const foundCategories = categories.filter(cat => questions.includes(cat));
        score += Math.min(foundCategories.length * 1, 4);
        
        // Check for question types
        if (questions.includes('why') || questions.includes('how') ||
            questions.includes('what') || questions.includes('when') ||
            questions.includes('where') || questions.includes('who')) {
            score += 3;
        }
        
        // Check for validation and testing
        if (questions.includes('validate') || questions.includes('confirm') ||
            questions.includes('test') || questions.includes('verify') ||
            questions.includes('check') || questions.includes('assess')) {
            score += 3;
        }
        
        // Check for evolution and improvement
        if (questions.includes('iterate') || questions.includes('evolve') ||
            questions.includes('refine') || questions.includes('improve') ||
            questions.includes('update') || questions.includes('adapt')) {
            score += 2;
        }
        
        // Bonus for comprehensive answers
        if (questions.length > 100) {
            score += 2;
        }
        
        return Math.min(score, 20);
    }

    evaluateInsightCapture(data) {
        let score = 0;
        const documentation = data.documentation.toLowerCase();
        const actionPlan = data.actionPlan.toLowerCase();
        const combined = documentation + ' ' + actionPlan;
        
        // Base score for any substantive answer
        if (combined.length > 40) {
            score = 8; // Start with 40% base score
        }
        
        // Enhanced documentation tool detection
        if (documentation.includes('crm') || documentation.includes('notion') ||
            documentation.includes('database') || documentation.includes('system') ||
            documentation.includes('tool') || documentation.includes('platform') ||
            documentation.includes('spreadsheet') || documentation.includes('doc') ||
            documentation.includes('record') || documentation.includes('capture')) {
            score += 3;
        }
        
        // Check for synthesis and analysis
        if (documentation.includes('synthesis') || documentation.includes('analyze') ||
            documentation.includes('pattern') || documentation.includes('insight') ||
            documentation.includes('theme') || documentation.includes('trend') ||
            documentation.includes('finding') || documentation.includes('discover')) {
            score += 3;
        }
        
        // Check for collaboration and sharing
        if (documentation.includes('share') || documentation.includes('distribute') ||
            documentation.includes('team') || documentation.includes('collaborate') ||
            documentation.includes('communicate') || documentation.includes('present')) {
            score += 3;
        }
        
        // Check for action orientation
        if (actionPlan.includes('action') || actionPlan.includes('implement') ||
            actionPlan.includes('decision') || actionPlan.includes('next') ||
            actionPlan.includes('step') || actionPlan.includes('plan') ||
            actionPlan.includes('execute') || actionPlan.includes('apply')) {
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
            frequencyPlanning: {
                high: "✓ Regular interview cadence established\n✓ Specific targets defined\n✓ Consistent scheduling process",
                medium: "✓ Some cadence planning\n✗ Need more specific frequency\n✗ Establish consistent schedule",
                low: "✗ Define interview frequency\n✗ Set specific targets\n✗ Create scheduling system"
            },
            segmentCoverage: {
                high: "✓ Multiple segments identified\n✓ Clear prioritization\n✓ Diverse perspectives covered",
                medium: "✓ Some segments identified\n✗ Need clearer prioritization\n✗ Expand segment diversity",
                low: "✗ Identify target segments\n✗ Define segment priorities\n✗ Plan coverage strategy"
            },
            methodologyMix: {
                high: "✓ Multiple methods employed\n✓ Structured approach\n✓ Appropriate tools selected",
                medium: "✓ Some methods defined\n✗ Need more variety\n✗ Formalize approach",
                low: "✗ Define interview methods\n✗ Mix different approaches\n✗ Select appropriate tools"
            },
            questionFramework: {
                high: "✓ Comprehensive questions\n✓ Open-ended approach\n✓ Validation built in",
                medium: "✓ Basic questions defined\n✗ Need more depth\n✗ Add validation questions",
                low: "✗ Develop question framework\n✗ Include open-ended questions\n✗ Plan for validation"
            },
            insightCapture: {
                high: "✓ Clear documentation process\n✓ Synthesis methodology\n✓ Action-oriented approach",
                medium: "✓ Some documentation planned\n✗ Need synthesis process\n✗ Connect to actions",
                low: "✗ Define capture process\n✗ Plan synthesis approach\n✗ Link insights to decisions"
            }
        };
        
        if (percentage >= 70) return feedback[dimension].high;
        if (percentage >= 40) return feedback[dimension].medium;
        return feedback[dimension].low;
    }

    generateRecommendations(scores, parsedData) {
        const recommendations = [];
        
        // Find weakest dimensions
        const dimensions = Object.entries(scores)
            .sort((a, b) => a[1].percentage - b[1].percentage)
            .slice(0, 3);
        
        for (const [dimension, data] of dimensions) {
            const improvement = Math.round((data.maxScore - data.score) * 0.7);
            
            if (dimension === 'frequencyPlanning' && data.percentage < 70) {
                recommendations.push({
                    area: 'Interview Frequency',
                    priority: data.percentage < 40 ? 'CRITICAL' : 'HIGH',
                    impact: `+${improvement} points`,
                    actionPlan: [
                        'Set weekly or bi-weekly interview targets',
                        'Block calendar time for customer conversations',
                        'Create interview scheduling automation',
                        'Track interview completion metrics'
                    ]
                });
            }
            
            if (dimension === 'segmentCoverage' && data.percentage < 70) {
                recommendations.push({
                    area: 'Segment Strategy',
                    priority: data.percentage < 40 ? 'HIGH' : 'MEDIUM',
                    impact: `+${improvement} points`,
                    actionPlan: [
                        'Map all customer segments and personas',
                        'Prioritize high-value segments',
                        'Set coverage targets per segment',
                        'Track segment representation'
                    ]
                });
            }
            
            if (dimension === 'methodologyMix' && data.percentage < 70) {
                recommendations.push({
                    area: 'Interview Methods',
                    priority: 'MEDIUM',
                    impact: `+${improvement} points`,
                    actionPlan: [
                        'Implement multiple interview formats',
                        'Use contextual inquiry for deeper insights',
                        'Add quantitative validation methods',
                        'Select appropriate tools for each method'
                    ]
                });
            }
        }
        
        return recommendations;
    }

    generateExecutiveSummary(score, dimensions, parsedData) {
        if (score >= 80) {
            return "Excellent interview cadence plan with regular customer touchpoints and comprehensive coverage. Your systematic approach to customer discovery will drive continuous learning and validation. Focus on maintaining consistency and expanding insights capture.";
        } else if (score >= 60) {
            return "Solid foundation for customer interviews with regular cadence being established. Your approach shows good understanding of the importance of continuous customer feedback. Consider increasing frequency, expanding segment coverage, and implementing more structured capture processes to accelerate learning velocity.";
        } else if (score >= 40) {
            return "You're developing a customer interview practice with some good elements in place. To strengthen your approach, focus on establishing more regular cadence, defining specific target segments, and creating systematic documentation processes. These improvements will significantly enhance customer understanding.";
        } else if (score >= 20) {
            return "Initial interview planning shows promise but needs more development. Start by setting specific interview targets (weekly is ideal), identifying key customer segments, and implementing basic capture tools. Regular customer contact is essential for validating product-market fit.";
        } else {
            return "Interview cadence needs significant development. Begin with the basics: schedule at least 2-3 customer conversations per week, identify your primary customer segments, and set up a simple system to capture insights. Consistent customer feedback is crucial for success.";
        }
    }
}

// Export for use in server
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InterviewCadenceAgentEnhanced;
}
// Pain Point Mapping Analysis Agent
// Evaluates visual mapping of customer pain points

const { RecommendationsLibraryDynamic } = require('./recommendations-library-dynamic');

class PainPointMappingAgentEnhanced {
    constructor() {
        this.dimensions = {
            painIdentification: {
                weight: 20,
                maxScore: 20,
                evaluate: (data) => this.evaluatePainIdentification(data)
            },
            severityAssessment: {
                weight: 20,
                maxScore: 20,
                evaluate: (data) => this.evaluateSeverityAssessment(data)
            },
            rootCauseAnalysis: {
                weight: 20,
                maxScore: 20,
                evaluate: (data) => this.evaluateRootCauseAnalysis(data)
            },
            impactMapping: {
                weight: 20,
                maxScore: 20,
                evaluate: (data) => this.evaluateImpactMapping(data)
            },
            solutionAlignment: {
                weight: 20,
                maxScore: 20,
                evaluate: (data) => this.evaluateSolutionAlignment(data)
            }
        };
    }

    analyzeWorksheet(worksheetData) {
        console.log('📊 Pain Point Mapping Agent: Starting analysis...');
        
        const parsedData = this.parseWorksheetData(worksheetData);
        console.log('📋 Parsed pain point mapping data');
        
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
        console.log(`✅ Pain Point Mapping Analysis complete: ${overallScore}%`);
        
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
            painPoints: getValue(1),      // List of identified pain points
            severity: getValue(2),         // Severity levels and prioritization
            rootCauses: getValue(3),       // Root cause analysis
            impact: getValue(4),           // Business/user impact
            currentSolutions: getValue(5), // How they solve today
            proposedSolution: getValue(6)  // Your solution mapping
        };
    }

    evaluatePainIdentification(data) {
        let score = 0;
        const painPoints = data.painPoints.toLowerCase();
        
        // Base score for any substantive answer
        if (painPoints.length > 20) {
            score = 8; // Start with 40% base score
        }
        
        // Enhanced pain point detection
        const painIndicators = ['pain', 'problem', 'challenge', 'issue', 'frustration',
                               'difficulty', 'struggle', 'obstacle', 'barrier', 'block',
                               'bottleneck', 'friction', 'gap', 'need', 'lack', 'missing'];
        const foundPains = painIndicators.filter(indicator => painPoints.includes(indicator));
        score += Math.min(foundPains.length * 1.5, 6);
        
        // Check for specificity and detail
        if (/\d+/.test(painPoints) || painPoints.includes('specific') ||
            painPoints.includes('exact') || painPoints.includes('particular') ||
            painPoints.includes('detail')) {
            score += 2;
        }
        
        // Check for categorization
        if (painPoints.includes('category') || painPoints.includes('type') ||
            painPoints.includes('group') || painPoints.includes('class') ||
            painPoints.includes('area')) {
            score += 2;
        }
        
        // Check for customer voice
        if (painPoints.includes('customer') || painPoints.includes('user') ||
            painPoints.includes('quote') || painPoints.includes('said') ||
            painPoints.includes('feedback') || painPoints.includes('complaint')) {
            score += 2;
        }
        
        // Bonus for comprehensive answers
        if (painPoints.length > 100) {
            score += 2;
        }
        
        return Math.min(score, 20);
    }

    evaluateSeverityAssessment(data) {
        let score = 0;
        const severity = data.severity.toLowerCase();
        
        // Base score for any substantive answer
        if (severity.length > 20) {
            score = 8; // Start with 40% base score
        }
        
        // Enhanced severity level detection
        const levels = ['critical', 'high', 'medium', 'low', 'severe', 'major', 'minor',
                       'urgent', 'important', 'significant', 'moderate', 'slight'];
        const foundLevels = levels.filter(level => severity.includes(level));
        score += Math.min(foundLevels.length * 2, 6);
        
        // Check for prioritization
        if (severity.includes('priority') || severity.includes('rank') ||
            severity.includes('order') || severity.includes('first') ||
            severity.includes('top') || severity.includes('most')) {
            score += 3;
        }
        
        // Check for scoring/metrics
        if (/\d+/.test(severity) || severity.includes('score') ||
            severity.includes('metric') || severity.includes('measure') ||
            severity.includes('scale') || severity.includes('rating')) {
            score += 2;
        }
        
        // Check for impact consideration
        if (severity.includes('impact') || severity.includes('cost') ||
            severity.includes('time') || severity.includes('effect') ||
            severity.includes('consequence') || severity.includes('result')) {
            score += 1;
        }
        
        // Bonus for comprehensive answers
        if (severity.length > 100) {
            score += 2;
        }
        
        return Math.min(score, 20);
    }

    evaluateRootCauseAnalysis(data) {
        let score = 0;
        const rootCauses = data.rootCauses.toLowerCase();
        
        // Base score for any substantive answer
        if (rootCauses.length > 20) {
            score = 8; // Start with 40% base score
        }
        
        // Check for analysis depth
        if (rootCauses.includes('why') || rootCauses.includes('because') ||
            rootCauses.includes('cause') || rootCauses.includes('reason') ||
            rootCauses.includes('due to') || rootCauses.includes('result')) {
            score += 3;
        }
        
        // Check for systematic approach
        if (rootCauses.includes('5 why') || rootCauses.includes('fishbone') ||
            rootCauses.includes('analysis') || rootCauses.includes('systematic') ||
            rootCauses.includes('method') || rootCauses.includes('framework')) {
            score += 3;
        }
        
        // Check for multiple causes
        if (rootCauses.includes('multiple') || rootCauses.includes('various') ||
            rootCauses.includes('several') || rootCauses.includes('different') ||
            rootCauses.includes('many') || /\d+/.test(rootCauses)) {
            score += 3;
        }
        
        // Check for validation
        if (rootCauses.includes('validate') || rootCauses.includes('confirm') ||
            rootCauses.includes('verify') || rootCauses.includes('test') ||
            rootCauses.includes('check') || rootCauses.includes('prove')) {
            score += 3;
        }
        
        // Bonus for comprehensive answers
        if (rootCauses.length > 100) {
            score += 2;
        }
        
        return Math.min(score, 20);
    }

    evaluateImpactMapping(data) {
        let score = 0;
        const impact = data.impact.toLowerCase();
        
        // Base score for any substantive answer
        if (impact.length > 20) {
            score = 8; // Start with 40% base score
        }
        
        // Check for business impact
        if (impact.includes('revenue') || impact.includes('cost') ||
            impact.includes('profit') || impact.includes('money') ||
            impact.includes('financial') || impact.includes('budget') ||
            impact.includes('expense') || impact.includes('investment')) {
            score += 3;
        }
        
        // Check for user/operational impact
        if (impact.includes('productivity') || impact.includes('efficiency') ||
            impact.includes('satisfaction') || impact.includes('performance') ||
            impact.includes('speed') || impact.includes('quality') ||
            impact.includes('output') || impact.includes('time')) {
            score += 3;
        }
        
        // Check for quantification
        if (/\d+/.test(impact) || impact.includes('hour') ||
            impact.includes('dollar') || impact.includes('%') ||
            impact.includes('percent') || impact.includes('metric')) {
            score += 3;
        }
        
        // Check for scope
        if (impact.includes('team') || impact.includes('department') ||
            impact.includes('company') || impact.includes('organization') ||
            impact.includes('business') || impact.includes('customer') ||
            impact.includes('user') || impact.includes('scale')) {
            score += 3;
        }
        
        // Bonus for comprehensive answers
        if (impact.length > 100) {
            score += 2;
        }
        
        return Math.min(score, 20);
    }

    evaluateSolutionAlignment(data) {
        let score = 0;
        const currentSolutions = data.currentSolutions.toLowerCase();
        const proposedSolution = data.proposedSolution.toLowerCase();
        const combined = currentSolutions + ' ' + proposedSolution;
        
        // Base score for any substantive answer
        if (combined.length > 40) {
            score = 8; // Start with 40% base score
        }
        
        // Check current solution understanding
        if (currentSolutions.includes('manual') || currentSolutions.includes('workaround') ||
            currentSolutions.includes('alternative') || currentSolutions.includes('current') ||
            currentSolutions.includes('existing') || currentSolutions.includes('today') ||
            currentSolutions.includes('now') || currentSolutions.includes('present')) {
            score += 3;
        }
        
        // Check for gap analysis
        if (currentSolutions.includes('gap') || currentSolutions.includes('missing') ||
            currentSolutions.includes('lack') || currentSolutions.includes('need') ||
            currentSolutions.includes('without') || currentSolutions.includes('absence')) {
            score += 3;
        }
        
        // Check proposed solution mapping
        if (proposedSolution.includes('solve') || proposedSolution.includes('address') ||
            proposedSolution.includes('fix') || proposedSolution.includes('resolve') ||
            proposedSolution.includes('eliminate') || proposedSolution.includes('reduce') ||
            proposedSolution.includes('improve') || proposedSolution.includes('help')) {
            score += 3;
        }
        
        // Check for differentiation
        if (proposedSolution.includes('better') || proposedSolution.includes('unique') ||
            proposedSolution.includes('different') || proposedSolution.includes('advantage') ||
            proposedSolution.includes('superior') || proposedSolution.includes('innovative')) {
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
            painIdentification: {
                high: "✓ Multiple pain points identified\n✓ Specific and detailed\n✓ Customer voice included",
                medium: "✓ Some pain points identified\n✗ Need more specificity\n✗ Add customer quotes",
                low: "✗ Identify specific pain points\n✗ Categorize by type\n✗ Include customer voice"
            },
            severityAssessment: {
                high: "✓ Clear severity levels\n✓ Prioritization framework\n✓ Impact quantified",
                medium: "✓ Basic severity assessment\n✗ Need clearer prioritization\n✗ Quantify impact",
                low: "✗ Define severity levels\n✗ Create prioritization framework\n✗ Assess impact"
            },
            rootCauseAnalysis: {
                high: "✓ Deep root cause analysis\n✓ Systematic approach\n✓ Causes validated",
                medium: "✓ Some root causes identified\n✗ Need deeper analysis\n✗ Validate findings",
                low: "✗ Conduct root cause analysis\n✗ Use systematic approach\n✗ Validate with customers"
            },
            impactMapping: {
                high: "✓ Business impact clear\n✓ User impact documented\n✓ Metrics quantified",
                medium: "✓ Some impact identified\n✗ Need quantification\n✗ Expand scope",
                low: "✗ Map business impact\n✗ Document user impact\n✗ Quantify with metrics"
            },
            solutionAlignment: {
                high: "✓ Current solutions understood\n✓ Gaps clearly identified\n✓ Strong differentiation",
                medium: "✓ Basic solution mapping\n✗ Clarify gaps\n✗ Strengthen differentiation",
                low: "✗ Analyze current solutions\n✗ Identify gaps\n✗ Map your solution"
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
            
            if (dimension === 'painIdentification' && data.percentage < 70) {
                recommendations.push({
                    area: 'Pain Point Discovery',
                    priority: data.percentage < 40 ? 'CRITICAL' : 'HIGH',
                    impact: `+${improvement} points`,
                    actionPlan: [
                        'Conduct deeper customer interviews',
                        'Create pain point taxonomy',
                        'Document with customer quotes',
                        'Map pain frequency and occurrence'
                    ]
                });
            }
            
            if (dimension === 'severityAssessment' && data.percentage < 70) {
                recommendations.push({
                    area: 'Severity Framework',
                    priority: 'HIGH',
                    impact: `+${improvement} points`,
                    actionPlan: [
                        'Create severity scoring matrix',
                        'Prioritize by business impact',
                        'Quantify cost of pain points',
                        'Validate severity with customers'
                    ]
                });
            }
            
            if (dimension === 'rootCauseAnalysis' && data.percentage < 70) {
                recommendations.push({
                    area: 'Root Cause Analysis',
                    priority: 'MEDIUM',
                    impact: `+${improvement} points`,
                    actionPlan: [
                        'Apply 5 Whys methodology',
                        'Create cause-effect diagrams',
                        'Validate root causes with data',
                        'Test assumptions with customers'
                    ]
                });
            }
        }
        
        return recommendations;
    }

    generateExecutiveSummary(score, dimensions, parsedData) {
        if (score >= 80) {
            return "Excellent pain point mapping with comprehensive understanding of customer challenges. Your detailed analysis of severity, root causes, and impact provides strong foundation for solution development. Focus on continuous validation and updating as you learn more.";
        } else if (score >= 60) {
            return "Solid pain point identification with good understanding of key customer challenges. Your mapping shows thoughtful analysis of what's causing friction for customers. To strengthen further, add more severity assessment detail, deeper root cause analysis, and clearer impact quantification.";
        } else if (score >= 40) {
            return "You're developing a pain point understanding with important elements identified. To enhance your mapping, focus on systematic pain discovery, creating a severity framework, and conducting deeper root cause analysis. These improvements will significantly strengthen your product positioning.";
        } else if (score >= 20) {
            return "Initial pain point exploration shows you're identifying customer challenges. Continue building by conducting more interviews, creating a pain point taxonomy, and establishing severity assessments. This deeper understanding is crucial for solution-problem fit.";
        } else {
            return "Pain point mapping needs development. Start with the basics: identify 3-5 key customer pains, understand their severity and impact, analyze root causes, and document how customers currently cope. This foundation is essential for product-market fit.";
        }
    }
}

// Export for use in server
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PainPointMappingAgentEnhanced;
}
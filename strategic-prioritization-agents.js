const { generateDynamicRecommendations } = require('./recommendations-library-dynamic-wrapper');
// Tradeoff Tracker Agent - Strategic Prioritization (3-4)
class TradeoffTrackerAgentEnhanced {
    constructor() {
        this.name = 'Tradeoff Tracker Agent';
        this.version = '2.0.0';
    }

    analyzeWorksheet(worksheetData) {
        console.log('📊 Tradeoff Tracker Agent: Starting analysis...');
        const data = this.parseWorksheetData(worksheetData);
        
        const scores = {
            tradeoffIdentification: this.evaluateTradeoffIdentification(data),
            impactAssessment: this.evaluateImpactAssessment(data),
            stakeholderAlignment: this.evaluateStakeholderAlignment(data),
            documentationQuality: this.evaluateDocumentationQuality(data),
            reviewProcess: this.evaluateReviewProcess(data)
        };
        
        Object.entries(scores).forEach(([key, score]) => {
            console.log(`📊 ${key}: ${score.percentage}%`);
        });
        
        const overallScore = this.calculateOverallScore(scores);
        console.log(`✅ Tradeoff Tracker Analysis complete: ${overallScore}%`);
        
        return {
            score: overallScore,
            analysis: {
                executiveSummary: this.generateSummary(overallScore, scores)
            },
            detailedScores: scores,
            recommendations: this.generateRecommendations(scores),
            timestamp: new Date().toISOString()
        };
    }

    parseWorksheetData(data) {
        const parsed = {};
        const fieldMappings = {
            'tradeoffs': ['field-1', 'field1', 'tradeoffs'],
            'impact': ['field-2', 'field2', 'impact'],
            'stakeholders': ['field-3', 'field3', 'stakeholders'],
            'documentation': ['field-4', 'field4', 'documentation'],
            'review': ['field-5', 'field5', 'review'],
            'decisions': ['field-6', 'field6', 'decisions']
        };
        
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

    evaluateTradeoffIdentification(data) {
        const content = data['tradeoffs'] || '';
        const length = content.length;
        let score = 0;
        const maxScore = 20;
        
        if (length > 50) score = 8;
        
        const indicators = [
            { pattern: /opportunity cost|sacrifice|give up|instead of/gi, points: 3, label: 'opportunity cost' },
            { pattern: /prioritize|deprioritize|defer|postpone/gi, points: 2, label: 'prioritization' },
            { pattern: /resource|time|budget|capacity/gi, points: 2, label: 'resource tradeoffs' },
            { pattern: /risk|benefit|pros?.*cons?/gi, points: 2, label: 'risk-benefit analysis' },
            { pattern: /alternative|option|choice|decision/gi, points: 2, label: 'alternatives' }
        ];
        
        const foundIndicators = [];
        indicators.forEach(indicator => {
            if (indicator.pattern.test(content)) {
                score = Math.min(score + indicator.points, maxScore);
                foundIndicators.push(indicator.label);
            }
        });
        
        if (length > 200) score = Math.min(score + 2, maxScore);
        if (length > 400) score = Math.min(score + 2, maxScore);
        
        const percentage = Math.round((score / maxScore) * 100);
        
        return {
            score: score,
            maxScore: maxScore,
            percentage: percentage,
            weight: 20,
            feedback: this.generateFeedback(percentage, foundIndicators, 'tradeoff')
        };
    }

    evaluateImpactAssessment(data) {
        const content = data['impact'] || '';
        const length = content.length;
        let score = 0;
        const maxScore = 20;
        
        if (length > 50) score = 8;
        
        const indicators = [
            { pattern: /short.?term|long.?term|immediate|future/gi, points: 3, label: 'time horizons' },
            { pattern: /customer|user|stakeholder|team/gi, points: 2, label: 'stakeholder impact' },
            { pattern: /revenue|cost|profit|financial/gi, points: 2, label: 'financial impact' },
            { pattern: /strategic|competitive|market|position/gi, points: 2, label: 'strategic impact' },
            { pattern: /quantif|measur|metric|kpi/gi, points: 2, label: 'quantification' }
        ];
        
        const foundIndicators = [];
        indicators.forEach(indicator => {
            if (indicator.pattern.test(content)) {
                score = Math.min(score + indicator.points, maxScore);
                foundIndicators.push(indicator.label);
            }
        });
        
        if (length > 200) score = Math.min(score + 2, maxScore);
        if (length > 400) score = Math.min(score + 2, maxScore);
        
        const percentage = Math.round((score / maxScore) * 100);
        
        return {
            score: score,
            maxScore: maxScore,
            percentage: percentage,
            weight: 20,
            feedback: this.generateFeedback(percentage, foundIndicators, 'impact')
        };
    }

    evaluateStakeholderAlignment(data) {
        const content = data['stakeholders'] || '';
        const length = content.length;
        let score = 0;
        const maxScore = 20;
        
        if (length > 50) score = 8;
        
        const indicators = [
            { pattern: /communicate|inform|align|consensus/gi, points: 3, label: 'communication' },
            { pattern: /buy.?in|support|agreement|approval/gi, points: 2, label: 'buy-in' },
            { pattern: /concern|objection|resistance|feedback/gi, points: 2, label: 'concerns addressed' },
            { pattern: /transparent|clear|explicit|documented/gi, points: 2, label: 'transparency' },
            { pattern: /rationale|reasoning|justif|explain/gi, points: 2, label: 'justification' }
        ];
        
        const foundIndicators = [];
        indicators.forEach(indicator => {
            if (indicator.pattern.test(content)) {
                score = Math.min(score + indicator.points, maxScore);
                foundIndicators.push(indicator.label);
            }
        });
        
        if (length > 200) score = Math.min(score + 2, maxScore);
        if (length > 400) score = Math.min(score + 2, maxScore);
        
        const percentage = Math.round((score / maxScore) * 100);
        
        return {
            score: score,
            maxScore: maxScore,
            percentage: percentage,
            weight: 20,
            feedback: this.generateFeedback(percentage, foundIndicators, 'stakeholder')
        };
    }

    evaluateDocumentationQuality(data) {
        const content = data['documentation'] || '';
        const length = content.length;
        let score = 0;
        const maxScore = 20;
        
        if (length > 50) score = 8;
        
        const indicators = [
            { pattern: /record|document|capture|log/gi, points: 2, label: 'documentation practice' },
            { pattern: /template|format|structure|framework/gi, points: 2, label: 'structured approach' },
            { pattern: /date|time|version|history/gi, points: 2, label: 'versioning' },
            { pattern: /accessible|searchable|organized|categorized/gi, points: 2, label: 'accessibility' },
            { pattern: /complete|comprehensive|detailed|thorough/gi, points: 2, label: 'completeness' }
        ];
        
        const foundIndicators = [];
        indicators.forEach(indicator => {
            if (indicator.pattern.test(content)) {
                score = Math.min(score + indicator.points, maxScore);
                foundIndicators.push(indicator.label);
            }
        });
        
        if (length > 200) score = Math.min(score + 2, maxScore);
        if (length > 400) score = Math.min(score + 2, maxScore);
        
        const percentage = Math.round((score / maxScore) * 100);
        
        return {
            score: score,
            maxScore: maxScore,
            percentage: percentage,
            weight: 20,
            feedback: this.generateFeedback(percentage, foundIndicators, 'documentation')
        };
    }

    evaluateReviewProcess(data) {
        const reviewContent = data['review'] || '';
        const decisionsContent = data['decisions'] || '';
        const combinedContent = reviewContent + ' ' + decisionsContent;
        const length = combinedContent.length;
        let score = 0;
        const maxScore = 20;
        
        if (length > 50) score = 8;
        
        const indicators = [
            { pattern: /periodic|regular|quarterly|monthly/gi, points: 2, label: 'regular review' },
            { pattern: /retrospective|lessons learned|post.?mortem/gi, points: 3, label: 'retrospectives' },
            { pattern: /adjust|update|revise|iterate/gi, points: 2, label: 'iteration' },
            { pattern: /validate|confirm|verify|assess/gi, points: 2, label: 'validation' },
            { pattern: /improve|optimize|enhance|refine/gi, points: 2, label: 'continuous improvement' }
        ];
        
        const foundIndicators = [];
        indicators.forEach(indicator => {
            if (indicator.pattern.test(combinedContent)) {
                score = Math.min(score + indicator.points, maxScore);
                foundIndicators.push(indicator.label);
            }
        });
        
        if (length > 200) score = Math.min(score + 2, maxScore);
        if (length > 400) score = Math.min(score + 2, maxScore);
        
        const percentage = Math.round((score / maxScore) * 100);
        
        return {
            score: score,
            maxScore: maxScore,
            percentage: percentage,
            weight: 20,
            feedback: this.generateFeedback(percentage, foundIndicators, 'review')
        };
    }

    generateFeedback(percentage, indicators, type) {
        const strengths = [];
        const improvements = [];
        
        if (percentage >= 40) strengths.push(`✓ ${type} documented`);
        indicators.forEach(ind => strengths.push(`✓ ${ind}`));
        
        if (percentage < 60) improvements.push(`✗ Strengthen ${type} analysis`);
        if (percentage < 80) improvements.push(`✗ Add more detail`);
        
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
        const sortedDimensions = Object.entries(scores)
            .sort((a, b) => a[1].percentage - b[1].percentage);
        
        sortedDimensions.slice(0, 3).forEach(([dimension, score]) => {
            if (score.percentage < 80) {
                // Calculate realistic improvement within maxScore limit
                const targetPercentage = 80;
                const targetScore = Math.round((targetPercentage / 100) * score.maxScore);
                const possibleImprovement = targetScore - score.score;
                const improvementPercentage = Math.round((possibleImprovement / score.maxScore) * 100);
                
                recommendations.push({
                    priority: score.percentage < 50 ? 'HIGH' : 'MEDIUM',
                    area: dimension,
                    suggestion: `Improve ${dimension} documentation and analysis`,
                    impact: `+${possibleImprovement} points`
                });
            }
        });
        
        return recommendations;
    }

    generateSummary(overallScore, scores) {
        const strongDimensions = Object.entries(scores).filter(([_, s]) => s.percentage >= 70).length;
        const weakDimensions = Object.entries(scores).filter(([_, s]) => s.percentage < 50).length;
        
        if (overallScore >= 80) {
            return `Excellent tradeoff tracking system (${overallScore}%). Your comprehensive approach to documenting opportunity costs and decision rationale with ${strongDimensions}/5 dimensions at excellence demonstrates strategic maturity. The clear impact assessment and stakeholder alignment processes ensure decisions are well-understood and defensible. Your systematic documentation creates valuable organizational learning. To achieve world-class status (95+), focus on implementing regular retrospectives and decision outcome tracking.`;
        } else if (overallScore >= 60) {
            return `Solid tradeoff management foundation (${overallScore}%). You recognize the importance of tracking what you're giving up for what you're gaining. With ${strongDimensions} strong dimensions, you're building decision transparency. Priority improvements: quantify opportunity costs more precisely, strengthen stakeholder communication processes, implement structured review cycles. These enhancements will transform tradeoff tracking from documentation to strategic advantage.`;
        } else if (overallScore >= 40) {
            return `Developing tradeoff tracking approach (${overallScore}%). While you understand that every decision has tradeoffs, systematic tracking needs improvement. ${weakDimensions} dimensions require attention, particularly impact assessment and documentation quality. Critical actions: document top 5 recent tradeoffs with clear rationale, identify stakeholder impacts, establish simple tracking template. These improvements will increase decision quality and organizational learning.`;
        } else {
            return `Tradeoff tracking requires fundamental development (${overallScore}%). Without systematic tradeoff documentation, your organization risks repeating mistakes and missing patterns. With ${weakDimensions}/5 dimensions below threshold, decision rationale is lost over time. Immediate priorities: create simple tradeoff log, document "what we're NOT doing and why", capture key stakeholder concerns. Start by documenting your next major decision's alternatives and rationale.`;
        }
    }
}

// Hypothesis Board Agent - Strategic Prioritization (3-5)
class HypothesisBoardAgentEnhanced {
    constructor() {
        this.name = 'Hypothesis Board Agent';
        this.version = '2.0.0';
    }

    analyzeWorksheet(worksheetData) {
        console.log('📊 Hypothesis Board Agent: Starting analysis...');
        const data = this.parseWorksheetData(worksheetData);
        
        const scores = {
            hypothesisFormulation: this.evaluateHypothesisFormulation(data),
            testingStrategy: this.evaluateTestingStrategy(data),
            evidenceCollection: this.evaluateEvidenceCollection(data),
            validationCriteria: this.evaluateValidationCriteria(data),
            iterationProcess: this.evaluateIterationProcess(data)
        };
        
        Object.entries(scores).forEach(([key, score]) => {
            console.log(`📊 ${key}: ${score.percentage}%`);
        });
        
        const overallScore = this.calculateOverallScore(scores);
        console.log(`✅ Hypothesis Board Analysis complete: ${overallScore}%`);
        
        return {
            score: overallScore,
            analysis: {
                executiveSummary: this.generateSummary(overallScore, scores)
            },
            detailedScores: scores,
            recommendations: this.generateRecommendations(scores),
            timestamp: new Date().toISOString()
        };
    }

    parseWorksheetData(data) {
        const parsed = {};
        const fieldMappings = {
            'hypotheses': ['field-1', 'field1', 'hypotheses'],
            'testing': ['field-2', 'field2', 'testing'],
            'evidence': ['field-3', 'field3', 'evidence'],
            'validation': ['field-4', 'field4', 'validation'],
            'iteration': ['field-5', 'field5', 'iteration'],
            'learnings': ['field-6', 'field6', 'learnings']
        };
        
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

    evaluateHypothesisFormulation(data) {
        const content = data['hypotheses'] || '';
        const length = content.length;
        let score = 0;
        const maxScore = 20;
        
        if (length > 50) score = 8;
        
        const indicators = [
            { pattern: /if.*then|hypothesis|assumption|believe/gi, points: 3, label: 'hypothesis structure' },
            { pattern: /testable|measurable|specific|clear/gi, points: 2, label: 'testability' },
            { pattern: /customer|user|market|business/gi, points: 2, label: 'focus areas' },
            { pattern: /risk|uncertainty|unknown|assumption/gi, points: 2, label: 'risk identification' },
            { pattern: /priorit|critical|important|key/gi, points: 2, label: 'prioritization' }
        ];
        
        const foundIndicators = [];
        indicators.forEach(indicator => {
            if (indicator.pattern.test(content)) {
                score = Math.min(score + indicator.points, maxScore);
                foundIndicators.push(indicator.label);
            }
        });
        
        if (length > 200) score = Math.min(score + 2, maxScore);
        if (length > 400) score = Math.min(score + 2, maxScore);
        
        const percentage = Math.round((score / maxScore) * 100);
        
        return {
            score: score,
            maxScore: maxScore,
            percentage: percentage,
            weight: 20,
            feedback: this.generateFeedback(percentage, foundIndicators, 'hypothesis')
        };
    }

    evaluateTestingStrategy(data) {
        const content = data['testing'] || '';
        const length = content.length;
        let score = 0;
        const maxScore = 20;
        
        if (length > 50) score = 8;
        
        const indicators = [
            { pattern: /experiment|test|pilot|trial/gi, points: 3, label: 'testing methods' },
            { pattern: /mvp|prototype|proof.of.concept/gi, points: 2, label: 'validation approach' },
            { pattern: /timeline|duration|schedule|deadline/gi, points: 2, label: 'timeline' },
            { pattern: /resource|budget|cost|investment/gi, points: 2, label: 'resource planning' },
            { pattern: /metric|measure|indicator|data/gi, points: 2, label: 'metrics' }
        ];
        
        const foundIndicators = [];
        indicators.forEach(indicator => {
            if (indicator.pattern.test(content)) {
                score = Math.min(score + indicator.points, maxScore);
                foundIndicators.push(indicator.label);
            }
        });
        
        if (length > 200) score = Math.min(score + 2, maxScore);
        if (length > 400) score = Math.min(score + 2, maxScore);
        
        const percentage = Math.round((score / maxScore) * 100);
        
        return {
            score: score,
            maxScore: maxScore,
            percentage: percentage,
            weight: 20,
            feedback: this.generateFeedback(percentage, foundIndicators, 'testing')
        };
    }

    evaluateEvidenceCollection(data) {
        const content = data['evidence'] || '';
        const length = content.length;
        let score = 0;
        const maxScore = 20;
        
        if (length > 50) score = 8;
        
        const indicators = [
            { pattern: /data|evidence|proof|result/gi, points: 2, label: 'evidence focus' },
            { pattern: /quantitative|qualitative|mixed.method/gi, points: 3, label: 'methodology' },
            { pattern: /sample|cohort|group|participant/gi, points: 2, label: 'sampling' },
            { pattern: /analyze|interpret|insight|finding/gi, points: 2, label: 'analysis' },
            { pattern: /document|record|track|log/gi, points: 2, label: 'documentation' }
        ];
        
        const foundIndicators = [];
        indicators.forEach(indicator => {
            if (indicator.pattern.test(content)) {
                score = Math.min(score + indicator.points, maxScore);
                foundIndicators.push(indicator.label);
            }
        });
        
        if (length > 200) score = Math.min(score + 2, maxScore);
        if (length > 400) score = Math.min(score + 2, maxScore);
        
        const percentage = Math.round((score / maxScore) * 100);
        
        return {
            score: score,
            maxScore: maxScore,
            percentage: percentage,
            weight: 20,
            feedback: this.generateFeedback(percentage, foundIndicators, 'evidence')
        };
    }

    evaluateValidationCriteria(data) {
        const content = data['validation'] || '';
        const length = content.length;
        let score = 0;
        const maxScore = 20;
        
        if (length > 50) score = 8;
        
        const indicators = [
            { pattern: /success|failure|threshold|criteria/gi, points: 3, label: 'success criteria' },
            { pattern: /validate|confirm|prove|disprove/gi, points: 2, label: 'validation approach' },
            { pattern: /confidence|certainty|probability/gi, points: 2, label: 'confidence levels' },
            { pattern: /decision|go.no.go|proceed|pivot/gi, points: 2, label: 'decision points' },
            { pattern: /benchmark|baseline|target|goal/gi, points: 2, label: 'benchmarks' }
        ];
        
        const foundIndicators = [];
        indicators.forEach(indicator => {
            if (indicator.pattern.test(content)) {
                score = Math.min(score + indicator.points, maxScore);
                foundIndicators.push(indicator.label);
            }
        });
        
        if (length > 200) score = Math.min(score + 2, maxScore);
        if (length > 400) score = Math.min(score + 2, maxScore);
        
        const percentage = Math.round((score / maxScore) * 100);
        
        return {
            score: score,
            maxScore: maxScore,
            percentage: percentage,
            weight: 20,
            feedback: this.generateFeedback(percentage, foundIndicators, 'validation')
        };
    }

    evaluateIterationProcess(data) {
        const iterationContent = data['iteration'] || '';
        const learningsContent = data['learnings'] || '';
        const combinedContent = iterationContent + ' ' + learningsContent;
        const length = combinedContent.length;
        let score = 0;
        const maxScore = 20;
        
        if (length > 50) score = 8;
        
        const indicators = [
            { pattern: /iterate|refine|adjust|improve/gi, points: 2, label: 'iteration focus' },
            { pattern: /learn|insight|discover|realize/gi, points: 3, label: 'learning capture' },
            { pattern: /pivot|change|adapt|evolve/gi, points: 2, label: 'adaptation' },
            { pattern: /feedback|input|response|reaction/gi, points: 2, label: 'feedback integration' },
            { pattern: /next.step|action|plan|implement/gi, points: 2, label: 'action planning' }
        ];
        
        const foundIndicators = [];
        indicators.forEach(indicator => {
            if (indicator.pattern.test(combinedContent)) {
                score = Math.min(score + indicator.points, maxScore);
                foundIndicators.push(indicator.label);
            }
        });
        
        if (length > 200) score = Math.min(score + 2, maxScore);
        if (length > 400) score = Math.min(score + 2, maxScore);
        
        const percentage = Math.round((score / maxScore) * 100);
        
        return {
            score: score,
            maxScore: maxScore,
            percentage: percentage,
            weight: 20,
            feedback: this.generateFeedback(percentage, foundIndicators, 'iteration')
        };
    }

    generateFeedback(percentage, indicators, type) {
        const strengths = [];
        const improvements = [];
        
        if (percentage >= 40) strengths.push(`✓ ${type} documented`);
        indicators.forEach(ind => strengths.push(`✓ ${ind}`));
        
        if (percentage < 60) improvements.push(`✗ Strengthen ${type} approach`);
        if (percentage < 80) improvements.push(`✗ Add more detail`);
        
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
        const sortedDimensions = Object.entries(scores)
            .sort((a, b) => a[1].percentage - b[1].percentage);
        
        sortedDimensions.slice(0, 3).forEach(([dimension, score]) => {
            if (score.percentage < 80) {
                // Calculate realistic improvement within maxScore limit
                const targetPercentage = 80;
                const targetScore = Math.round((targetPercentage / 100) * score.maxScore);
                const possibleImprovement = targetScore - score.score;
                const improvementPercentage = Math.round((possibleImprovement / score.maxScore) * 100);
                
                recommendations.push({
                    priority: score.percentage < 50 ? 'HIGH' : 'MEDIUM',
                    area: dimension,
                    suggestion: `Improve ${dimension} methodology`,
                    impact: `+${possibleImprovement} points`
                });
            }
        });
        
        return recommendations;
    }

    generateSummary(overallScore, scores) {
        const strongDimensions = Object.entries(scores).filter(([_, s]) => s.percentage >= 70).length;
        const weakDimensions = Object.entries(scores).filter(([_, s]) => s.percentage < 50).length;
        
        if (overallScore >= 80) {
            return `Outstanding hypothesis-driven approach (${overallScore}%). Your systematic testing framework with ${strongDimensions}/5 dimensions at excellence demonstrates true experimental mindset. The combination of clear hypothesis formulation, rigorous testing methodology, and evidence-based validation creates a powerful learning engine. Your iteration process ensures continuous improvement. To reach world-class status (95+), focus on reducing time-to-evidence and implementing statistical significance testing.`;
        } else if (overallScore >= 60) {
            return `Strong hypothesis testing foundation (${overallScore}%). You've embraced the importance of validating assumptions before major investments. With ${strongDimensions} strong dimensions, you're positioned to de-risk decisions effectively. Key improvements: strengthen testing methodology with clear success criteria, implement faster validation cycles, enhance evidence documentation. These refinements will accelerate learning velocity and reduce wasted effort.`;
        } else if (overallScore >= 40) {
            return `Developing hypothesis-driven culture (${overallScore}%). While you recognize the value of testing assumptions, execution needs strengthening. ${weakDimensions} dimensions need attention, particularly testing strategy and validation criteria. Essential actions: formulate testable hypotheses (if-then statements), define clear success/failure criteria, implement rapid testing cycles. These improvements will transform guesswork into systematic learning.`;
        } else {
            return `Hypothesis testing needs fundamental development (${overallScore}%). Operating on untested assumptions creates high risk of building the wrong thing. With ${weakDimensions}/5 dimensions below threshold, you're likely investing resources based on opinions rather than evidence. Immediate priorities: identify top 3 risky assumptions, create simple test plans, define measurable validation criteria. Start with one critical hypothesis and test it within 2 weeks.`;
        }
    }
}

// Decision Archive Agent - Strategic Prioritization (3-6)
class DecisionArchiveAgentEnhanced {
    constructor() {
        this.name = 'Decision Archive Agent';
        this.version = '2.0.0';
    }

    analyzeWorksheet(worksheetData) {
        console.log('📊 Decision Archive Agent: Starting analysis...');
        const data = this.parseWorksheetData(worksheetData);
        
        const scores = {
            decisionCapture: this.evaluateDecisionCapture(data),
            contextDocumentation: this.evaluateContextDocumentation(data),
            rationaleClarity: this.evaluateRationaleClarity(data),
            accessibilityStructure: this.evaluateAccessibilityStructure(data),
            learningIntegration: this.evaluateLearningIntegration(data)
        };
        
        Object.entries(scores).forEach(([key, score]) => {
            console.log(`📊 ${key}: ${score.percentage}%`);
        });
        
        const overallScore = this.calculateOverallScore(scores);
        console.log(`✅ Decision Archive Analysis complete: ${overallScore}%`);
        
        return {
            score: overallScore,
            analysis: {
                executiveSummary: this.generateSummary(overallScore, scores)
            },
            detailedScores: scores,
            recommendations: this.generateRecommendations(scores),
            timestamp: new Date().toISOString()
        };
    }

    parseWorksheetData(data) {
        const parsed = {};
        const fieldMappings = {
            'decisions': ['field-1', 'field1', 'decisions'],
            'context': ['field-2', 'field2', 'context'],
            'rationale': ['field-3', 'field3', 'rationale'],
            'structure': ['field-4', 'field4', 'structure'],
            'learning': ['field-5', 'field5', 'learning'],
            'usage': ['field-6', 'field6', 'usage']
        };
        
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

    evaluateDecisionCapture(data) {
        const content = data['decisions'] || '';
        const length = content.length;
        let score = 0;
        const maxScore = 20;
        
        if (length > 50) score = 8;
        
        const indicators = [
            { pattern: /decision|choice|selection|determination/gi, points: 2, label: 'decision focus' },
            { pattern: /date|time|when|timeline/gi, points: 2, label: 'temporal tracking' },
            { pattern: /who|owner|responsible|accountable/gi, points: 2, label: 'ownership' },
            { pattern: /category|type|classification|tag/gi, points: 2, label: 'categorization' },
            { pattern: /complete|comprehensive|detailed/gi, points: 2, label: 'completeness' }
        ];
        
        const foundIndicators = [];
        indicators.forEach(indicator => {
            if (indicator.pattern.test(content)) {
                score = Math.min(score + indicator.points, maxScore);
                foundIndicators.push(indicator.label);
            }
        });
        
        if (length > 200) score = Math.min(score + 2, maxScore);
        if (length > 400) score = Math.min(score + 2, maxScore);
        
        const percentage = Math.round((score / maxScore) * 100);
        
        return {
            score: score,
            maxScore: maxScore,
            percentage: percentage,
            weight: 20,
            feedback: this.generateFeedback(percentage, foundIndicators, 'decision capture')
        };
    }

    evaluateContextDocumentation(data) {
        const content = data['context'] || '';
        const length = content.length;
        let score = 0;
        const maxScore = 20;
        
        if (length > 50) score = 8;
        
        const indicators = [
            { pattern: /background|situation|circumstance|context/gi, points: 3, label: 'context clarity' },
            { pattern: /constraint|limitation|requirement|condition/gi, points: 2, label: 'constraints' },
            { pattern: /stakeholder|participant|involved|affected/gi, points: 2, label: 'stakeholders' },
            { pattern: /data|information|evidence|input/gi, points: 2, label: 'data sources' },
            { pattern: /timeline|deadline|urgency|pressure/gi, points: 2, label: 'time factors' }
        ];
        
        const foundIndicators = [];
        indicators.forEach(indicator => {
            if (indicator.pattern.test(content)) {
                score = Math.min(score + indicator.points, maxScore);
                foundIndicators.push(indicator.label);
            }
        });
        
        if (length > 200) score = Math.min(score + 2, maxScore);
        if (length > 400) score = Math.min(score + 2, maxScore);
        
        const percentage = Math.round((score / maxScore) * 100);
        
        return {
            score: score,
            maxScore: maxScore,
            percentage: percentage,
            weight: 20,
            feedback: this.generateFeedback(percentage, foundIndicators, 'context')
        };
    }

    evaluateRationaleClarity(data) {
        const content = data['rationale'] || '';
        const length = content.length;
        let score = 0;
        const maxScore = 20;
        
        if (length > 50) score = 8;
        
        const indicators = [
            { pattern: /because|reason|why|rationale/gi, points: 3, label: 'reasoning' },
            { pattern: /alternative|option|consider|evaluate/gi, points: 2, label: 'alternatives' },
            { pattern: /pros?.*cons?|benefit|drawback|tradeoff/gi, points: 2, label: 'tradeoff analysis' },
            { pattern: /criteria|factor|consideration|priority/gi, points: 2, label: 'decision criteria' },
            { pattern: /risk|opportunity|impact|consequence/gi, points: 2, label: 'impact assessment' }
        ];
        
        const foundIndicators = [];
        indicators.forEach(indicator => {
            if (indicator.pattern.test(content)) {
                score = Math.min(score + indicator.points, maxScore);
                foundIndicators.push(indicator.label);
            }
        });
        
        if (length > 200) score = Math.min(score + 2, maxScore);
        if (length > 400) score = Math.min(score + 2, maxScore);
        
        const percentage = Math.round((score / maxScore) * 100);
        
        return {
            score: score,
            maxScore: maxScore,
            percentage: percentage,
            weight: 20,
            feedback: this.generateFeedback(percentage, foundIndicators, 'rationale')
        };
    }

    evaluateAccessibilityStructure(data) {
        const content = data['structure'] || '';
        const length = content.length;
        let score = 0;
        const maxScore = 20;
        
        if (length > 50) score = 8;
        
        const indicators = [
            { pattern: /searchable|findable|accessible|available/gi, points: 3, label: 'accessibility' },
            { pattern: /organize|structure|categorize|index/gi, points: 2, label: 'organization' },
            { pattern: /template|format|standard|consistent/gi, points: 2, label: 'standardization' },
            { pattern: /tag|label|metadata|keyword/gi, points: 2, label: 'metadata' },
            { pattern: /version|revision|update|current/gi, points: 2, label: 'versioning' }
        ];
        
        const foundIndicators = [];
        indicators.forEach(indicator => {
            if (indicator.pattern.test(content)) {
                score = Math.min(score + indicator.points, maxScore);
                foundIndicators.push(indicator.label);
            }
        });
        
        if (length > 200) score = Math.min(score + 2, maxScore);
        if (length > 400) score = Math.min(score + 2, maxScore);
        
        const percentage = Math.round((score / maxScore) * 100);
        
        return {
            score: score,
            maxScore: maxScore,
            percentage: percentage,
            weight: 20,
            feedback: this.generateFeedback(percentage, foundIndicators, 'structure')
        };
    }

    evaluateLearningIntegration(data) {
        const learningContent = data['learning'] || '';
        const usageContent = data['usage'] || '';
        const combinedContent = learningContent + ' ' + usageContent;
        const length = combinedContent.length;
        let score = 0;
        const maxScore = 20;
        
        if (length > 50) score = 8;
        
        const indicators = [
            { pattern: /lesson|learning|insight|takeaway/gi, points: 3, label: 'learning capture' },
            { pattern: /pattern|trend|recurring|common/gi, points: 2, label: 'pattern recognition' },
            { pattern: /improve|better|optimize|enhance/gi, points: 2, label: 'improvement focus' },
            { pattern: /reference|consult|review|revisit/gi, points: 2, label: 'reference usage' },
            { pattern: /share|communicate|disseminate|educate/gi, points: 2, label: 'knowledge sharing' }
        ];
        
        const foundIndicators = [];
        indicators.forEach(indicator => {
            if (indicator.pattern.test(combinedContent)) {
                score = Math.min(score + indicator.points, maxScore);
                foundIndicators.push(indicator.label);
            }
        });
        
        if (length > 200) score = Math.min(score + 2, maxScore);
        if (length > 400) score = Math.min(score + 2, maxScore);
        
        const percentage = Math.round((score / maxScore) * 100);
        
        return {
            score: score,
            maxScore: maxScore,
            percentage: percentage,
            weight: 20,
            feedback: this.generateFeedback(percentage, foundIndicators, 'learning')
        };
    }

    generateFeedback(percentage, indicators, type) {
        const strengths = [];
        const improvements = [];
        
        if (percentage >= 40) strengths.push(`✓ ${type} established`);
        indicators.forEach(ind => strengths.push(`✓ ${ind}`));
        
        if (percentage < 60) improvements.push(`✗ Enhance ${type}`);
        if (percentage < 80) improvements.push(`✗ Add more detail`);
        
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
        const sortedDimensions = Object.entries(scores)
            .sort((a, b) => a[1].percentage - b[1].percentage);
        
        sortedDimensions.slice(0, 3).forEach(([dimension, score]) => {
            if (score.percentage < 80) {
                // Calculate realistic improvement within maxScore limit
                const targetPercentage = 80;
                const targetScore = Math.round((targetPercentage / 100) * score.maxScore);
                const possibleImprovement = targetScore - score.score;
                const improvementPercentage = Math.round((possibleImprovement / score.maxScore) * 100);
                
                recommendations.push({
                    priority: score.percentage < 50 ? 'HIGH' : 'MEDIUM',
                    area: dimension,
                    suggestion: `Strengthen ${dimension} practices`,
                    impact: `+${possibleImprovement} points`
                });
            }
        });
        
        return recommendations;
    }

    generateSummary(overallScore, scores) {
        const strongDimensions = Object.entries(scores).filter(([_, s]) => s.percentage >= 70).length;
        const weakDimensions = Object.entries(scores).filter(([_, s]) => s.percentage < 50).length;
        
        if (overallScore >= 80) {
            return `Exceptional decision archiving system (${overallScore}%). Your comprehensive documentation approach with ${strongDimensions}/5 dimensions at excellence creates a valuable knowledge repository. The combination of context capture, rationale clarity, and learning integration ensures decisions become organizational assets. Your searchable structure enables rapid reference and pattern recognition. To achieve world-class status (95+), focus on implementing AI-assisted pattern analysis and decision outcome tracking.`;
        } else if (overallScore >= 60) {
            return `Solid decision documentation foundation (${overallScore}%). You understand that decisions are valuable organizational knowledge. With ${strongDimensions} strong dimensions, you're building institutional memory. Priority improvements: enhance context documentation with constraints and alternatives, improve searchability with better tagging, strengthen learning extraction processes. These enhancements will transform your archive from storage to strategic intelligence.`;
        } else if (overallScore >= 40) {
            return `Developing decision archive (${overallScore}%). While some documentation exists, critical gaps limit organizational learning. ${weakDimensions} dimensions need attention, particularly rationale clarity and accessibility structure. Critical actions: create standard decision template, document context and constraints, establish tagging system for searchability. These improvements will prevent repeated mistakes and accelerate onboarding.`;
        } else {
            return `Decision archive requires fundamental development (${overallScore}%). Without proper documentation, your organization loses valuable knowledge with every personnel change. With ${weakDimensions}/5 dimensions below threshold, you're condemned to repeat past mistakes. Immediate priorities: create simple decision log, capture "why" not just "what", make archive searchable. Start by documenting your last 5 major decisions with context and rationale.`;
        }
    }
}

module.exports = {
    TradeoffTrackerAgentEnhanced,
    HypothesisBoardAgentEnhanced,
    DecisionArchiveAgentEnhanced
};
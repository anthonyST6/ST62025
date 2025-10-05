/**
 * Enhanced Agent Class - Core of the Unified Architecture
 * Replaces generic field system with dimension-based intelligence
 * Provides all 6 core functionalities for each of the 96 agents
 */

class EnhancedAgent {
    constructor(agentId, agentConfig) {
        this.id = agentId;
        this.name = agentConfig.name;
        this.description = agentConfig.description;
        this.dimensions = agentConfig.scoringDimensions;
        this.evaluationCriteria = agentConfig.evaluationCriteria;
        
        // Initialize sub-components
        this.educationGenerator = new EducationContentGenerator(this);
        this.worksheetGenerator = new WorksheetQuestionGenerator(this);
        this.responseAnalyzer = new ResponseAnalyzer(this);
        this.feedbackGenerator = new FeedbackGenerator(this);
        this.recommendationEngine = new RecommendationEngine(this);
        this.dataPersistence = new AgentDataPersistence(this);
    }

    // ========================================
    // CORE FUNCTIONALITY 1: Education Content
    // ========================================
    generateEducationContent() {
        return this.educationGenerator.generate();
    }

    // ========================================
    // CORE FUNCTIONALITY 2: Worksheet Questions
    // ========================================
    generateWorksheetQuestions() {
        return this.worksheetGenerator.generate();
    }

    // ========================================
    // CORE FUNCTIONALITY 3: Response Analysis
    // ========================================
    analyzeWorksheet(responses) {
        return this.responseAnalyzer.analyze(responses);
    }

    // ========================================
    // CORE FUNCTIONALITY 4: Detailed Feedback
    // ========================================
    generateDimensionFeedback(dimension, score, responseAnalysis) {
        return this.feedbackGenerator.generate(dimension, score, responseAnalysis);
    }

    // ========================================
    // CORE FUNCTIONALITY 5: Recommendations
    // ========================================
    generateRecommendations(analysis) {
        return this.recommendationEngine.generate(analysis);
    }

    // ========================================
    // CORE FUNCTIONALITY 6: Data Persistence
    // ========================================
    async persistAnalysis(analysis, userId) {
        return await this.dataPersistence.persist(analysis, userId);
    }

    // Helper methods
    getBlockId() {
        return parseInt(this.id.match(/\d+/)[0]);
    }

    getSubcomponentId() {
        const mapping = { 'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6 };
        const letter = this.id.match(/[a-f]/)[0];
        return `${this.getBlockId()}-${mapping[letter]}`;
    }
}

// ========================================
// Education Content Generator
// ========================================
class EducationContentGenerator {
    constructor(agent) {
        this.agent = agent;
    }

    generate() {
        return {
            overview: this.generateOverview(),
            keyPrinciples: this.generateKeyPrinciples(),
            useCases: this.generateUseCases(),
            bestPractices: this.generateBestPractices(),
            commonMistakes: this.generateCommonMistakes(),
            resources: this.generateResources()
        };
    }

    generateOverview() {
        return {
            title: `Understanding ${this.agent.name}`,
            description: this.agent.description,
            importance: `${this.agent.name} is crucial for GTM success because it directly impacts your ability to scale and grow efficiently.`,
            objectives: [
                `Master the ${this.agent.dimensions.length} key dimensions of ${this.agent.name}`,
                `Learn to evaluate your current performance objectively`,
                `Identify specific areas for improvement`,
                `Create actionable plans based on assessment results`
            ]
        };
    }

    generateKeyPrinciples() {
        return this.agent.dimensions.map(dimension => ({
            principle: dimension.name,
            explanation: dimension.description,
            weight: `${dimension.weight}% of total score`,
            whyItMatters: `Strong performance in ${dimension.name} directly correlates with successful GTM outcomes and sustainable growth.`,
            indicators: this.generateIndicators(dimension)
        }));
    }

    generateIndicators(dimension) {
        return {
            strong: `Clear evidence of ${dimension.name.toLowerCase()} with measurable results`,
            developing: `Some understanding of ${dimension.name.toLowerCase()} but lacks consistency`,
            weak: `Limited or no focus on ${dimension.name.toLowerCase()}`
        };
    }

    generateUseCases() {
        const scenarios = [
            { type: 'Startup', stage: 'Pre-seed to Seed', focus: 'Foundation building' },
            { type: 'Scale-up', stage: 'Series A-B', focus: 'Growth acceleration' },
            { type: 'Enterprise', stage: 'Series C+', focus: 'Market domination' }
        ];

        return scenarios.map(scenario => ({
            title: `${scenario.type} Example`,
            scenario: `A ${scenario.stage} company focusing on ${scenario.focus}`,
            application: `How ${this.agent.name} applies at this stage`,
            challenges: this.generateChallenges(scenario.type),
            solutions: this.generateSolutions(scenario.type),
            outcome: `Improved ${this.agent.name.toLowerCase()} leading to better GTM execution`
        }));
    }

    generateChallenges(type) {
        const challenges = {
            'Startup': ['Limited resources', 'Unclear market fit', 'Small team'],
            'Scale-up': ['Rapid growth challenges', 'Process standardization', 'Team scaling'],
            'Enterprise': ['Market saturation', 'Innovation vs. stability', 'Complex operations']
        };
        return challenges[type] || ['General GTM challenges'];
    }

    generateSolutions(type) {
        const solutions = {
            'Startup': ['Focus on core dimensions', 'Rapid iteration', 'Lean approach'],
            'Scale-up': ['Systematic improvement', 'Data-driven decisions', 'Team alignment'],
            'Enterprise': ['Optimization at scale', 'Advanced analytics', 'Strategic initiatives']
        };
        return solutions[type] || ['Tailored GTM solutions'];
    }

    generateBestPractices() {
        return this.agent.dimensions.map(dimension => ({
            dimension: dimension.name,
            practices: [
                `Regularly assess your ${dimension.name.toLowerCase()} performance`,
                `Set measurable goals for ${dimension.name.toLowerCase()} improvement`,
                `Document your ${dimension.name.toLowerCase()} processes and learnings`,
                `Benchmark against industry standards for ${dimension.name.toLowerCase()}`
            ],
            metrics: this.generateMetrics(dimension)
        }));
    }

    generateMetrics(dimension) {
        return [
            `${dimension.name} Score (0-100)`,
            `Improvement rate over time`,
            `Benchmark comparison`,
            `Impact on overall GTM performance`
        ];
    }

    generateCommonMistakes() {
        return [
            {
                mistake: `Ignoring ${this.agent.dimensions[0].name}`,
                impact: 'Foundation weakness affecting all other areas',
                solution: `Prioritize ${this.agent.dimensions[0].name} as a critical foundation`
            },
            {
                mistake: 'Focusing on single dimensions',
                impact: 'Imbalanced GTM strategy',
                solution: 'Maintain holistic view across all dimensions'
            },
            {
                mistake: 'Lack of regular assessment',
                impact: 'Blind spots and missed opportunities',
                solution: 'Implement quarterly assessment cycles'
            },
            {
                mistake: 'Not acting on insights',
                impact: 'Wasted analysis effort',
                solution: 'Create action plans for every assessment'
            }
        ];
    }

    generateResources() {
        return {
            templates: [
                `${this.agent.name} Assessment Template`,
                `Action Planning Worksheet`,
                `Progress Tracking Dashboard`
            ],
            guides: [
                `Complete Guide to ${this.agent.name}`,
                `Quick Start Checklist`,
                `Advanced Optimization Strategies`
            ],
            tools: [
                'Self-assessment worksheet',
                'Scoring calculator',
                'Benchmark comparison tool'
            ],
            examples: [
                'Success story case studies',
                'Before/after comparisons',
                'Industry best practices'
            ]
        };
    }
}

// ========================================
// Worksheet Question Generator
// ========================================
class WorksheetQuestionGenerator {
    constructor(agent) {
        this.agent = agent;
    }

    generate() {
        return this.agent.dimensions.map((dimension, index) => 
            this.generateDimensionQuestion(dimension, index)
        );
    }

    generateDimensionQuestion(dimension, index) {
        return {
            id: `dimension-${index + 1}`,
            dimensionName: dimension.name,
            dimensionWeight: dimension.weight,
            question: this.createQuestion(dimension),
            hint: dimension.description,
            guidanceText: this.createGuidance(dimension),
            exampleAnswer: this.createExample(dimension),
            scoringRubric: this.createRubric(dimension),
            metadata: {
                type: 'strategic',
                required: true,
                minLength: 100,
                maxLength: 1000,
                expectedFormat: 'detailed_response'
            }
        };
    }

    createQuestion(dimension) {
        // Generate contextual question based on dimension
        const questionStems = {
            'Clarity': `How clearly have you defined ${dimension.name.toLowerCase()}? Provide specific details.`,
            'Validation': `What evidence validates your approach to ${dimension.name.toLowerCase()}?`,
            'Strategy': `Describe your strategy for ${dimension.name.toLowerCase()}.`,
            'Implementation': `How are you implementing ${dimension.name.toLowerCase()}?`,
            'Measurement': `How do you measure success in ${dimension.name.toLowerCase()}?`
        };

        // Select appropriate question based on dimension name
        for (const [key, question] of Object.entries(questionStems)) {
            if (dimension.name.includes(key)) {
                return question;
            }
        }

        // Default question format
        return `Describe your current approach to ${dimension.name.toLowerCase()}, including specific examples, metrics, and evidence of success.`;
    }

    createGuidance(dimension) {
        return `When answering about ${dimension.name}:
• Provide specific examples from your experience
• Include quantifiable metrics where possible
• Explain the rationale behind your approach
• Identify any challenges or gaps
• Be honest about areas needing improvement`;
    }

    createExample(dimension) {
        return {
            good: `Strong example for ${dimension.name}: "We have implemented a systematic approach to ${dimension.name.toLowerCase()} that includes weekly reviews, documented processes, and clear metrics. For instance, we track [specific metric] which has improved by 40% over the last quarter. Our team uses [specific tool/method] to ensure consistency, and we've seen direct impact on [business outcome]."`,
            poor: `Weak example for ${dimension.name}: "We do some work on ${dimension.name.toLowerCase()} when we have time. It seems to be going okay but we haven't really measured it. We should probably do more."`
        };
    }

    createRubric(dimension) {
        return {
            excellent: {
                score: 90,
                criteria: [
                    `Comprehensive understanding of ${dimension.name}`,
                    'Clear evidence with specific examples',
                    'Quantifiable metrics and KPIs provided',
                    'Strategic approach well-documented',
                    'Continuous improvement process in place'
                ]
            },
            good: {
                score: 70,
                criteria: [
                    `Good grasp of ${dimension.name} fundamentals`,
                    'Some evidence and examples provided',
                    'Basic metrics mentioned',
                    'Logical approach described',
                    'Awareness of improvement areas'
                ]
            },
            adequate: {
                score: 50,
                criteria: [
                    `Basic understanding of ${dimension.name}`,
                    'Limited evidence or examples',
                    'Few specific details',
                    'Approach needs more structure',
                    'Significant room for improvement'
                ]
            },
            poor: {
                score: 30,
                criteria: [
                    `Unclear understanding of ${dimension.name}`,
                    'No concrete evidence provided',
                    'Vague or generic responses',
                    'No clear approach or strategy',
                    'Major gaps requiring immediate attention'
                ]
            }
        };
    }
}

// ========================================
// Response Analyzer
// ========================================
class ResponseAnalyzer {
    constructor(agent) {
        this.agent = agent;
    }

    analyze(responses) {
        const dimensionAnalyses = this.agent.dimensions.map((dimension, index) => {
            const response = responses[`dimension-${index + 1}`];
            return this.analyzeDimension(dimension, response);
        });

        return {
            overallScore: this.calculateOverallScore(dimensionAnalyses),
            dimensionBreakdown: dimensionAnalyses,
            patterns: this.detectPatterns(dimensionAnalyses),
            strengths: this.identifyStrengths(dimensionAnalyses),
            weaknesses: this.identifyWeaknesses(dimensionAnalyses),
            maturityLevel: this.assessMaturityLevel(dimensionAnalyses)
        };
    }

    analyzeDimension(dimension, response) {
        const responseText = response?.value || response || '';
        const qualityMetrics = this.assessResponseQuality(responseText);
        const score = this.scoreResponse(responseText, dimension, qualityMetrics);

        return {
            dimensionName: dimension.name,
            weight: dimension.weight,
            responseLength: responseText.length,
            score: score,
            qualityMetrics: qualityMetrics,
            feedback: this.generateFeedback(dimension, score, qualityMetrics),
            strengths: score >= 70 ? this.extractStrengths(responseText, dimension, qualityMetrics) : [],
            improvements: score < 90 ? this.suggestImprovements(dimension, score, qualityMetrics) : []
        };
    }

    assessResponseQuality(responseText) {
        return {
            hasSpecifics: /\d+|\bspecific\b|\bexample\b|\binstance\b/i.test(responseText),
            hasMetrics: /\d+%|\bincrease\b|\bdecrease\b|\bmeasure\b|\bKPI\b|\bmetric\b/i.test(responseText),
            hasEvidence: /\bdata\b|\bresearch\b|\bfeedback\b|\bsurvey\b|\binterview\b|\bvalidat/i.test(responseText),
            hasStrategy: /\bplan\b|\bapproach\b|\bstrategy\b|\bframework\b|\bprocess\b|\bmethod/i.test(responseText),
            hasTimeframe: /\bweek\b|\bmonth\b|\bquarter\b|\byear\b|\btimeline\b|\bschedule\b/i.test(responseText),
            clarity: this.assessClarity(responseText),
            depth: this.assessDepth(responseText),
            completeness: responseText.length >= 100 ? 1 : responseText.length / 100
        };
    }

    assessClarity(text) {
        // Simple clarity assessment based on structure
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const avgSentenceLength = sentences.reduce((sum, s) => sum + s.split(' ').length, 0) / (sentences.length || 1);
        
        // Good clarity: sentences between 10-25 words
        if (avgSentenceLength >= 10 && avgSentenceLength <= 25) return 1;
        if (avgSentenceLength < 10) return 0.7; // Too short
        if (avgSentenceLength > 25) return 0.5; // Too long
        return 0.3;
    }

    assessDepth(text) {
        const wordCount = text.split(/\s+/).length;
        if (wordCount >= 150) return 1;
        if (wordCount >= 100) return 0.7;
        if (wordCount >= 50) return 0.5;
        return 0.3;
    }

    scoreResponse(responseText, dimension, qualityMetrics) {
        let score = 40; // Base score for attempting

        // Add points for quality indicators
        if (qualityMetrics.hasSpecifics) score += 12;
        if (qualityMetrics.hasMetrics) score += 12;
        if (qualityMetrics.hasEvidence) score += 12;
        if (qualityMetrics.hasStrategy) score += 12;
        if (qualityMetrics.hasTimeframe) score += 8;
        
        // Adjust for clarity and depth
        score += qualityMetrics.clarity * 10;
        score += qualityMetrics.depth * 10;
        
        // Adjust for completeness
        score *= qualityMetrics.completeness;

        // Cap at 100
        return Math.min(100, Math.round(score));
    }

    generateFeedback(dimension, score, qualityMetrics) {
        const level = score >= 90 ? 'excellent' :
                     score >= 70 ? 'good' :
                     score >= 50 ? 'adequate' : 'needs improvement';

        let feedback = `Your response for ${dimension.name} is ${level} (${score}/100). `;

        // Add specific feedback based on quality metrics
        const strengths = [];
        const improvements = [];

        if (qualityMetrics.hasSpecifics) strengths.push('specific examples');
        else improvements.push('add specific examples');

        if (qualityMetrics.hasMetrics) strengths.push('quantifiable metrics');
        else improvements.push('include measurable metrics');

        if (qualityMetrics.hasEvidence) strengths.push('supporting evidence');
        else improvements.push('provide supporting evidence');

        if (qualityMetrics.hasStrategy) strengths.push('clear strategy');
        else improvements.push('clarify your strategic approach');

        if (strengths.length > 0) {
            feedback += `Strengths: ${strengths.join(', ')}. `;
        }

        if (improvements.length > 0) {
            feedback += `Areas to improve: ${improvements.join(', ')}.`;
        }

        return feedback;
    }

    extractStrengths(responseText, dimension, qualityMetrics) {
        const strengths = [];
        
        if (qualityMetrics.hasSpecifics) {
            strengths.push(`Provided specific examples for ${dimension.name}`);
        }
        if (qualityMetrics.hasMetrics) {
            strengths.push('Included measurable metrics and KPIs');
        }
        if (qualityMetrics.hasEvidence) {
            strengths.push('Backed claims with concrete evidence');
        }
        if (qualityMetrics.hasStrategy) {
            strengths.push('Demonstrated clear strategic thinking');
        }
        if (qualityMetrics.clarity >= 0.7) {
            strengths.push('Clear and well-structured response');
        }

        return strengths;
    }

    suggestImprovements(dimension, score, qualityMetrics) {
        const improvements = [];

        if (!qualityMetrics.hasSpecifics) {
            improvements.push(`Add specific examples of your ${dimension.name.toLowerCase()} implementation`);
        }
        if (!qualityMetrics.hasMetrics) {
            improvements.push('Include quantifiable metrics to measure success');
        }
        if (!qualityMetrics.hasEvidence) {
            improvements.push('Provide data or research to support your approach');
        }
        if (!qualityMetrics.hasStrategy) {
            improvements.push('Outline a clear strategic framework');
        }
        if (!qualityMetrics.hasTimeframe) {
            improvements.push('Add timeline and milestones for implementation');
        }
        if (qualityMetrics.depth < 0.7) {
            improvements.push('Provide more detailed explanation and context');
        }

        return improvements;
    }

    calculateOverallScore(dimensionAnalyses) {
        const weightedSum = dimensionAnalyses.reduce((sum, analysis) => {
            return sum + (analysis.score * analysis.weight / 100);
        }, 0);
        
        return Math.round(weightedSum);
    }

    detectPatterns(analyses) {
        const patterns = [];
        
        // Check for consistent strengths
        const highScoreDimensions = analyses.filter(a => a.score >= 80);
        if (highScoreDimensions.length >= 3) {
            patterns.push({
                type: 'strength_pattern',
                description: 'Consistent high performance across multiple dimensions',
                dimensions: highScoreDimensions.map(d => d.dimensionName),
                implication: 'Strong foundation for scaling GTM efforts'
            });
        }
        
        // Check for consistent weaknesses
        const lowScoreDimensions = analyses.filter(a => a.score < 60);
        if (lowScoreDimensions.length >= 2) {
            patterns.push({
                type: 'weakness_pattern',
                description: 'Multiple dimensions need improvement',
                dimensions: lowScoreDimensions.map(d => d.dimensionName),
                implication: 'Focus on foundational improvements before scaling'
            });
        }

        // Check for imbalance
        const scoreRange = Math.max(...analyses.map(a => a.score)) - Math.min(...analyses.map(a => a.score));
        if (scoreRange > 40) {
            patterns.push({
                type: 'imbalance_pattern',
                description: 'Significant variation in dimension scores',
                range: scoreRange,
                implication: 'Need for more balanced approach across all dimensions'
            });
        }
        
        return patterns;
    }

    identifyStrengths(analyses) {
        return analyses
            .filter(a => a.score >= 70)
            .map(a => ({
                dimension: a.dimensionName,
                score: a.score,
                highlights: a.strengths
            }));
    }

    identifyWeaknesses(analyses) {
        return analyses
            .filter(a => a.score < 70)
            .map(a => ({
                dimension: a.dimensionName,
                score: a.score,
                gaps: a.improvements
            }));
    }

    assessMaturityLevel(analyses) {
        const avgScore = analyses.reduce((sum, a) => sum + a.score, 0) / analyses.length;
        
        if (avgScore >= 85) return { level: 'Advanced', description: 'Ready for aggressive scaling' };
        if (avgScore >= 70) return { level: 'Proficient', description: 'Solid foundation with room to grow' };
        if (avgScore >= 55) return { level: 'Developing', description: 'Building capabilities, focus on fundamentals' };
        if (avgScore >= 40) return { level: 'Emerging', description: 'Early stage, significant development needed' };
        return { level: 'Initial', description: 'Just starting, requires comprehensive development' };
    }
}

// ========================================
// Feedback Generator
// ========================================
class FeedbackGenerator {
    constructor(agent) {
        this.agent = agent;
    }

    generate(dimension, score, responseAnalysis) {
        const scoreRange = this.getScoreRange(score);
        
        return {
            dimension: dimension.name,
            score: score,
            level: scoreRange.level,
            levelDescription: scoreRange.description,
            feedback: this.generateDetailedFeedback(dimension, scoreRange, responseAnalysis),
            strengths: responseAnalysis.strengths || [],
            improvements: responseAnalysis.improvements || [],
            nextSteps: this.generateNextSteps(dimension, score),
            resources: this.suggestResources(dimension, score)
        };
    }

    getScoreRange(score) {
        if (score >= 91) return { 
            level: 'Excellent', 
            description: this.agent.evaluationCriteria['91-100'] || 'Outstanding performance'
        };
        if (score >= 76) return { 
            level: 'Strong', 
            description: this.agent.evaluationCriteria['76-90'] || 'Strong performance'
        };
        if (score >= 51) return { 
            level: 'Good', 
            description: this.agent.evaluationCriteria['51-75'] || 'Good foundation'
        };
        if (score >= 26) return { 
            level: 'Developing', 
            description: this.agent.evaluationCriteria['26-50'] || 'Developing capabilities'
        };
        return { 
            level: 'Needs Work', 
            description: this.agent.evaluationCriteria['0-25'] || 'Requires significant improvement'
        };
    }

    generateDetailedFeedback(dimension, scoreRange, responseAnalysis) {
        const templates = {
            'Excellent': `Outstanding work on ${dimension.name}! Your response demonstrates comprehensive understanding with clear evidence, specific metrics, and strategic thinking. You're operating at a level that can serve as a benchmark for others.`,
            'Strong': `Strong performance on ${dimension.name}. You show good understanding with solid evidence and clear thinking. To reach the next level, focus on adding more quantifiable metrics and expanding your strategic approach.`,
            'Good': `Good foundation in ${dimension.name}. You grasp the core concepts and show practical understanding. To improve, work on providing more specific examples, measurable outcomes, and deeper strategic analysis.`,
            'Developing': `${dimension.name} shows developing understanding. While you grasp the basics, your response needs more depth, specificity, and evidence. Focus on documenting your current state and creating a clear improvement plan.`,
            'Needs Work': `${dimension.name} requires significant attention. Start by understanding the fundamental concepts, then work on implementing basic practices. Consider seeking mentorship or additional resources in this area.`
        };
        
        return templates[scoreRange.level];
    }

    generateNextSteps(dimension, score) {
        const steps = [];
        
        if (score >= 90) {
            steps.push(`Maintain excellence in ${dimension.name} through continuous refinement`);
            steps.push('Document and share best practices with your team');
            steps.push('Explore advanced optimization opportunities');
        } else if (score >= 70) {
            steps.push(`Refine your ${dimension.name} approach with more specific metrics`);
            steps.push('Implement systematic tracking and measurement');
            steps.push('Benchmark against industry leaders');
        } else if (score >= 50) {
            steps.push(`Develop a structured approach to ${dimension.name}`);
            steps.push('Create documentation and standard processes');
            steps.push('Set clear goals and milestones for improvement');
        } else {
            steps.push(`Focus immediate attention on understanding ${dimension.name}`);
            steps.push('Research best practices and case studies');
            steps.push('Create a 30-day improvement plan');
            steps.push('Consider training or mentorship opportunities');
        }
        
        return steps;
    }

    suggestResources(dimension, score) {
        const resources = [];
        
        if (score < 70) {
            resources.push({
                type: 'template',
                name: `${dimension.name} Planning Template`,
                description: 'Structured template to develop your approach'
            });
            resources.push({
                type: 'guide',
                name: `Beginner's Guide to ${dimension.name}`,
                description: 'Comprehensive introduction to key concepts'
            });
        }
        
        resources.push({
            type: 'checklist',
            name: `${dimension.name} Assessment Checklist`,
            description: 'Self-assessment tool for continuous improvement'
        });
        
        if (score >= 70) {
            resources.push({
                type: 'advanced',
                name: `Advanced ${dimension.name} Strategies`,
                description: 'Optimization techniques for high performers'
            });
        }
        
        return resources;
    }
}

// ========================================
// Recommendation Engine
// ========================================
class RecommendationEngine {
    constructor(agent) {
        this.agent = agent;
    }

    generate(analysis) {
        const recommendations = [];
        
        // Generate recommendations for low-scoring dimensions
        analysis.dimensionBreakdown.forEach(dimAnalysis => {
            if (dimAnalysis.score < 80) {
                recommendations.push(this.createDimensionRecommendation(dimAnalysis));
            }
        });
        
        // Add pattern-based recommendations
        analysis.patterns.forEach(pattern => {
            recommendations.push(this.createPatternRecommendation(pattern));
        });
        
        // Add maturity-based recommendations
        recommendations.push(this.createMaturityRecommendation(analysis.maturityLevel));
        
        // Prioritize and return top 5
        return this.prioritizeRecommendations(recommendations).slice(0, 5);
    }

    createDimensionRecommendation(dimensionAnalysis) {
        const priority = this.calculatePriority(dimensionAnalysis);
        const impact = this.calculateImpact(dimensionAnalysis);
        
        return {
            area: dimensionAnalysis.dimensionName,
            priority: priority,
            currentScore: dimensionAnalysis.score,
            targetScore: Math.min(dimensionAnalysis.score + 20, 100),
            action: this.generateActionStatement(dimensionAnalysis, priority),
            impact: `+${impact} points`,
            effort: this.estimateEffort(dimensionAnalysis),
            timeline: this.estimateTimeline(priority),
            specificSteps: this.generateActionSteps(dimensionAnalysis),
            successMetrics: this.defineSuccessMetrics(dimensionAnalysis),
            resources: this.identifyResources(dimensionAnalysis)
        };
    }

    createPatternRecommendation(pattern) {
        return {
            area: 'Strategic Pattern',
            priority: pattern.type === 'weakness_pattern' ? 'HIGH' : 'MEDIUM',
            action: `Address ${pattern.description}`,
            impact: 'Systemic improvement',
            effort: 'Medium',
            timeline: '2-3 months',
            specificSteps: [
                `Analyze root causes of ${pattern.type}`,
                'Create integrated improvement plan',
                'Implement coordinated changes across dimensions',
                'Monitor pattern evolution'
            ],
            successMetrics: [
                'Pattern no longer detected in next assessment',
                'Balanced scores across all dimensions',
                'Improved overall maturity level'
            ]
        };
    }

    createMaturityRecommendation(maturityLevel) {
        const maturityActions = {
            'Initial': 'Build foundational capabilities across all dimensions',
            'Emerging': 'Strengthen core dimensions and establish processes',
            'Developing': 'Standardize practices and improve consistency',
            'Proficient': 'Optimize performance and scale successful practices',
            'Advanced': 'Innovate and lead industry best practices'
        };

        return {
            area: 'Overall Maturity',
            priority: maturityLevel.level === 'Initial' || maturityLevel.level === 'Emerging' ? 'HIGH' : 'MEDIUM',
            action: maturityActions[maturityLevel.level],
            impact: 'Comprehensive improvement',
            effort: 'High',
            timeline: '3-6 months',
            specificSteps: this.generateMaturitySteps(maturityLevel),
            successMetrics: [
                `Advance to ${this.getNextMaturityLevel(maturityLevel.level)} level`,
                'Improve average score by 15+ points',
                'Achieve 70+ score in all dimensions'
            ]
        };
    }

    calculatePriority(dimensionAnalysis) {
        const score = dimensionAnalysis.score;
        const weight = dimensionAnalysis.weight;
        
        if (score < 40 || (score < 60 && weight >= 20)) return 'CRITICAL';
        if (score < 60 || (score < 70 && weight >= 20)) return 'HIGH';
        if (score < 70) return 'MEDIUM';
        return 'LOW';
    }

    calculateImpact(dimensionAnalysis) {
        const currentScore = dimensionAnalysis.score;
        const weight = dimensionAnalysis.weight;
        const potentialImprovement = Math.min(100 - currentScore, 20);
        
        // Weight the impact by dimension importance
        return Math.round(potentialImprovement * weight / 20);
    }

    generateActionStatement(dimensionAnalysis, priority) {
        const actionTemplates = {
            'CRITICAL': `Immediately address critical gaps in ${dimensionAnalysis.dimensionName} to prevent GTM failure`,
            'HIGH': `Prioritize rapid improvement of ${dimensionAnalysis.dimensionName} to unlock growth`,
            'MEDIUM': `Systematically enhance ${dimensionAnalysis.dimensionName} capabilities`,
            'LOW': `Optimize ${dimensionAnalysis.dimensionName} for competitive advantage`
        };
        
        return actionTemplates[priority];
    }

    generateActionSteps(dimensionAnalysis) {
        const steps = [];
        
        // Add improvement-specific steps
        dimensionAnalysis.improvements.forEach(improvement => {
            steps.push(improvement);
        });
        
        // Add general improvement steps
        steps.push(`Conduct detailed assessment of current ${dimensionAnalysis.dimensionName} state`);
        steps.push(`Define clear success metrics and targets`);
        steps.push(`Create 30-60-90 day improvement plan`);
        steps.push(`Implement quick wins within first 2 weeks`);
        steps.push(`Establish regular review and adjustment cycle`);
        
        return steps.slice(0, 5);
    }

    defineSuccessMetrics(dimensionAnalysis) {
        return [
            `${dimensionAnalysis.dimensionName} score increases to ${Math.min(dimensionAnalysis.score + 20, 100)}+`,
            `All quality metrics (specifics, evidence, strategy) present in responses`,
            `Documented processes and procedures for ${dimensionAnalysis.dimensionName}`,
            `Team alignment and understanding of ${dimensionAnalysis.dimensionName}`,
            `Measurable business impact from ${dimensionAnalysis.dimensionName} improvements`
        ];
    }

    estimateEffort(dimensionAnalysis) {
        const gap = 100 - dimensionAnalysis.score;
        if (gap > 60) return 'High';
        if (gap > 30) return 'Medium';
        return 'Low';
    }

    estimateTimeline(priority) {
        const timelines = {
            'CRITICAL': '1-2 weeks',
            'HIGH': '2-4 weeks',
            'MEDIUM': '1-2 months',
            'LOW': '2-3 months'
        };
        return timelines[priority];
    }

    identifyResources(dimensionAnalysis) {
        return [
            `${dimensionAnalysis.dimensionName} improvement template`,
            'Best practices guide',
            'Benchmark data and examples',
            'Training materials',
            'Expert consultation options'
        ];
    }

    generateMaturitySteps(maturityLevel) {
        const steps = {
            'Initial': [
                'Establish basic understanding of all dimensions',
                'Create initial documentation',
                'Set foundational processes',
                'Build team awareness'
            ],
            'Emerging': [
                'Standardize core processes',
                'Implement measurement systems',
                'Develop team capabilities',
                'Create improvement roadmap'
            ],
            'Developing': [
                'Optimize existing processes',
                'Expand measurement and tracking',
                'Implement best practices',
                'Build consistency across team'
            ],
            'Proficient': [
                'Scale successful practices',
                'Implement advanced analytics',
                'Drive continuous improvement',
                'Share knowledge across organization'
            ],
            'Advanced': [
                'Innovate new approaches',
                'Lead industry standards',
                'Mentor other organizations',
                'Drive thought leadership'
            ]
        };
        
        return steps[maturityLevel.level] || steps['Developing'];
    }

    getNextMaturityLevel(currentLevel) {
        const progression = {
            'Initial': 'Emerging',
            'Emerging': 'Developing',
            'Developing': 'Proficient',
            'Proficient': 'Advanced',
            'Advanced': 'Industry Leader'
        };
        return progression[currentLevel] || 'Next';
    }

    prioritizeRecommendations(recommendations) {
        const priorityOrder = { 'CRITICAL': 0, 'HIGH': 1, 'MEDIUM': 2, 'LOW': 3 };
        
        return recommendations
            .filter(r => r && r.priority) // Filter out any null recommendations
            .sort((a, b) => {
                // First sort by priority
                const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
                if (priorityDiff !== 0) return priorityDiff;
                
                // Then by potential impact
                const impactA = parseInt(a.impact?.replace(/[^0-9]/g, '') || '0');
                const impactB = parseInt(b.impact?.replace(/[^0-9]/g, '') || '0');
                return impactB - impactA;
            });
    }
}

// ========================================
// Data Persistence Manager
// ========================================
class AgentDataPersistence {
    constructor(agent) {
        this.agent = agent;
    }

    async persist(analysis, userId) {
        const timestamp = new Date().toISOString();
        const analysisId = this.generateAnalysisId();
        
        // Prepare complete persistence data
        const persistenceData = {
            // Core identification
            analysisId: analysisId,
            agentId: this.agent.id,
            agentName: this.agent.name,
            userId: userId || 'default',
            timestamp: timestamp,
            
            // Scores
            overallScore: analysis.overallScore,
            dimensionScores: this.formatDimensionScores(analysis.dimensionBreakdown),
            
            // Analysis details
            patterns: analysis.patterns,
            strengths: analysis.strengths,
            weaknesses: analysis.weaknesses,
            maturityLevel: analysis.maturityLevel,
            
            // Recommendations
            recommendations: analysis.recommendations,
            
            // Metadata
            metadata: {
                blockId: this.agent.getBlockId(),
                subcomponentId: this.agent.getSubcomponentId(),
                version: '2.0',
                analysisEngine: 'enhanced-agent',
                dimensionBased: true
            }
        };
        
        // Save to localStorage for now (replace with actual database calls)
        this.saveToLocalStorage(persistenceData);
        
        // Log activity
        this.logActivity(persistenceData);
        
        return persistenceData;
    }

    formatDimensionScores(dimensionBreakdown) {
        return dimensionBreakdown.map(dim => ({
            name: dim.dimensionName,
            score: dim.score,
            weight: dim.weight,
            feedback: dim.feedback,
            strengths: dim.strengths,
            improvements: dim.improvements,
            qualityMetrics: dim.qualityMetrics
        }));
    }

    saveToLocalStorage(data) {
        // Save to score history
        const scoreHistory = JSON.parse(localStorage.getItem('scoreHistory') || '[]');
        scoreHistory.push({
            id: data.analysisId,
            agentId: data.agentId,
            agentName: data.agentName,
            score: data.overallScore,
            timestamp: data.timestamp,
            dimensionScores: data.dimensionScores
        });
        localStorage.setItem('scoreHistory', JSON.stringify(scoreHistory));
        
        // Save full analysis
        localStorage.setItem(`analysis_${data.analysisId}`, JSON.stringify(data));
        
        // Save latest for agent
        localStorage.setItem(`latest_analysis_${data.agentId}`, JSON.stringify(data));
    }

    logActivity(data) {
        const activityLog = JSON.parse(localStorage.getItem('activityLog') || '[]');
        activityLog.push({
            type: 'AGENT_ANALYSIS_COMPLETED',
            agentId: data.agentId,
            agentName: data.agentName,
            userId: data.userId,
            score: data.overallScore,
            timestamp: data.timestamp,
            analysisId: data.analysisId
        });
        localStorage.setItem('activityLog', JSON.stringify(activityLog));
        
        console.log(`✅ Analysis persisted: Agent ${data.agentId}, Score ${data.overallScore}, ID ${data.analysisId}`);
    }

    generateAnalysisId() {
        return 'analysis_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
}

// ========================================
// Export for use in other modules
// ========================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        EnhancedAgent,
        EducationContentGenerator,
        WorksheetQuestionGenerator,
        ResponseAnalyzer,
        FeedbackGenerator,
        RecommendationEngine,
        AgentDataPersistence
    };
}

// Make available globally for browser use
if (typeof window !== 'undefined') {
    window.EnhancedAgent = EnhancedAgent;
    window.EducationContentGenerator = EducationContentGenerator;
    window.WorksheetQuestionGenerator = WorksheetQuestionGenerator;
    window.ResponseAnalyzer = ResponseAnalyzer;
    window.FeedbackGenerator = FeedbackGenerator;
    window.RecommendationEngine = RecommendationEngine;
    window.AgentDataPersistence = AgentDataPersistence;
}
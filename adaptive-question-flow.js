// Adaptive Question Flow Engine
// Dynamically adjusts question difficulty, type, and sequence based on real-time response analysis

class AdaptiveQuestionFlow {
    constructor() {
        this.name = "Adaptive Question Flow Engine";
        this.version = "1.0.0";
        
        // Flow state
        this.currentFlow = null;
        this.flowHistory = [];
        this.adaptationRules = this.initializeAdaptationRules();
        
        // Response analysis
        this.responseAnalyzer = new ResponseAnalyzer();
        
        // Question pool management
        this.questionPool = new Map();
        this.usedQuestions = new Set();
        this.skippedQuestions = new Set();
        
        // Performance tracking
        this.performanceMetrics = {
            averageResponseQuality: 0,
            adaptationCount: 0,
            flowCompletionRate: 0,
            userEngagementScore: 0
        };
        
        console.log('🔄 Adaptive Question Flow Engine initialized');
    }
    
    /**
     * Initialize adaptation rules
     */
    initializeAdaptationRules() {
        return {
            // Quality-based rules
            lowQuality: {
                threshold: 40,
                actions: [
                    { type: 'simplify', priority: 1 },
                    { type: 'addGuidance', priority: 2 },
                    { type: 'breakDown', priority: 3 }
                ]
            },
            mediumQuality: {
                threshold: 70,
                actions: [
                    { type: 'maintain', priority: 1 },
                    { type: 'addDepth', priority: 2 }
                ]
            },
            highQuality: {
                threshold: 85,
                actions: [
                    { type: 'advance', priority: 1 },
                    { type: 'addComplexity', priority: 2 },
                    { type: 'exploreEdgeCases', priority: 3 }
                ]
            },
            
            // Pattern-based rules
            patterns: {
                struggling: {
                    indicators: ['shortResponses', 'vagueLanguage', 'noMetrics'],
                    actions: ['provideExamples', 'simplifyLanguage', 'offerTemplates']
                },
                confident: {
                    indicators: ['detailedResponses', 'specificMetrics', 'technicalLanguage'],
                    actions: ['deepDive', 'challengeAssumptions', 'requestValidation']
                },
                uncertain: {
                    indicators: ['questions', 'maybeLanguage', 'contradictions'],
                    actions: ['clarify', 'provideFramework', 'breakIntoSteps']
                }
            },
            
            // Context-based rules
            contextual: {
                earlyStage: {
                    focus: ['exploration', 'validation', 'hypothesis'],
                    avoid: ['scaling', 'optimization', 'advanced metrics']
                },
                growthStage: {
                    focus: ['metrics', 'optimization', 'competitive'],
                    avoid: ['basic definitions', 'initial validation']
                },
                enterprise: {
                    focus: ['compliance', 'integration', 'tco'],
                    avoid: ['mvp', 'bootstrapping']
                }
            }
        };
    }
    
    /**
     * Start an adaptive flow for a user
     */
    async startAdaptiveFlow(subcomponentId, userContext, initialQuestions) {
        console.log(`🚀 Starting adaptive flow for ${subcomponentId}`);
        
        this.currentFlow = {
            id: `flow_${Date.now()}`,
            subcomponentId: subcomponentId,
            userContext: userContext,
            startTime: new Date().toISOString(),
            questions: [],
            responses: {},
            adaptations: [],
            currentQuestionIndex: 0,
            status: 'active'
        };
        
        // Initialize question pool
        this.initializeQuestionPool(initialQuestions, userContext);
        
        // Select initial questions based on context
        const startingQuestions = this.selectInitialQuestions(userContext);
        this.currentFlow.questions = startingQuestions;
        
        // Record flow start
        this.flowHistory.push({
            flowId: this.currentFlow.id,
            startTime: this.currentFlow.startTime,
            context: userContext
        });
        
        return {
            flowId: this.currentFlow.id,
            questions: startingQuestions.slice(0, 3), // Start with first 3 questions
            adaptiveMode: true
        };
    }
    
    /**
     * Initialize question pool with categorization
     */
    initializeQuestionPool(questions, userContext) {
        this.questionPool.clear();
        
        questions.forEach(question => {
            // Categorize by difficulty
            const difficulty = this.assessQuestionDifficulty(question, userContext);
            
            // Categorize by type
            const category = `${question.type}_${difficulty}`;
            
            if (!this.questionPool.has(category)) {
                this.questionPool.set(category, []);
            }
            
            this.questionPool.get(category).push({
                ...question,
                difficulty: difficulty,
                relevanceScore: this.calculateRelevance(question, userContext),
                adaptivePriority: this.calculateAdaptivePriority(question, userContext)
            });
        });
        
        // Sort questions in each category by priority
        this.questionPool.forEach((questions, category) => {
            questions.sort((a, b) => b.adaptivePriority - a.adaptivePriority);
        });
    }
    
    /**
     * Select initial questions based on context
     */
    selectInitialQuestions(userContext) {
        const selectedQuestions = [];
        const targetCount = 10; // Total questions for the flow
        
        // Determine starting difficulty
        const startingDifficulty = this.determineStartingDifficulty(userContext);
        
        // Select a balanced mix of question types
        const questionTypes = ['diagnostic', 'exploratory', 'validation', 'quantification', 'strategic'];
        const distribution = this.getQuestionDistribution(userContext);
        
        questionTypes.forEach(type => {
            const count = Math.floor(targetCount * distribution[type]);
            const category = `${type}_${startingDifficulty}`;
            
            if (this.questionPool.has(category)) {
                const available = this.questionPool.get(category);
                const selected = available.slice(0, count);
                selectedQuestions.push(...selected);
                
                // Mark as used
                selected.forEach(q => this.usedQuestions.add(q.id));
            }
        });
        
        // Fill remaining slots with high-priority questions
        while (selectedQuestions.length < targetCount) {
            const nextQuestion = this.getNextHighPriorityQuestion();
            if (nextQuestion) {
                selectedQuestions.push(nextQuestion);
                this.usedQuestions.add(nextQuestion.id);
            } else {
                break;
            }
        }
        
        return selectedQuestions;
    }
    
    /**
     * Process a response and adapt the flow
     */
    async processResponseAndAdapt(questionId, response) {
        console.log(`📝 Processing response for question ${questionId}`);
        
        if (!this.currentFlow || this.currentFlow.status !== 'active') {
            throw new Error('No active flow to process');
        }
        
        // Store response
        this.currentFlow.responses[questionId] = response;
        
        // Analyze response quality
        const analysis = await this.responseAnalyzer.analyze(response, questionId);
        
        // Determine if adaptation is needed
        const adaptationDecision = this.shouldAdapt(analysis, this.currentFlow);
        
        if (adaptationDecision.adapt) {
            const adaptation = await this.performAdaptation(
                adaptationDecision.type,
                analysis,
                this.currentFlow
            );
            
            this.currentFlow.adaptations.push({
                timestamp: new Date().toISOString(),
                questionId: questionId,
                type: adaptationDecision.type,
                reason: adaptationDecision.reason,
                changes: adaptation
            });
            
            this.performanceMetrics.adaptationCount++;
        }
        
        // Update performance metrics
        this.updatePerformanceMetrics(analysis);
        
        // Get next questions
        const nextQuestions = this.getAdaptedNextQuestions(analysis, this.currentFlow);
        
        return {
            analysis: analysis,
            adapted: adaptationDecision.adapt,
            adaptationType: adaptationDecision.type,
            nextQuestions: nextQuestions,
            flowProgress: this.calculateFlowProgress(),
            performanceMetrics: this.performanceMetrics
        };
    }
    
    /**
     * Determine if adaptation is needed
     */
    shouldAdapt(analysis, flow) {
        const decision = {
            adapt: false,
            type: null,
            reason: null
        };
        
        // Check response quality
        if (analysis.quality < this.adaptationRules.lowQuality.threshold) {
            decision.adapt = true;
            decision.type = 'simplify';
            decision.reason = 'Low response quality detected';
        } else if (analysis.quality > this.adaptationRules.highQuality.threshold) {
            decision.adapt = true;
            decision.type = 'advance';
            decision.reason = 'High response quality - advancing difficulty';
        }
        
        // Check for patterns
        const pattern = this.detectResponsePattern(flow.responses);
        if (pattern && this.adaptationRules.patterns[pattern]) {
            decision.adapt = true;
            decision.type = pattern;
            decision.reason = `${pattern} pattern detected`;
        }
        
        // Check engagement
        if (this.isDisengaging(flow)) {
            decision.adapt = true;
            decision.type = 'reengage';
            decision.reason = 'Declining engagement detected';
        }
        
        return decision;
    }
    
    /**
     * Perform adaptation based on type
     */
    async performAdaptation(type, analysis, flow) {
        console.log(`🔧 Performing ${type} adaptation`);
        
        const adaptations = {
            simplify: () => this.simplifyQuestions(flow),
            advance: () => this.advanceQuestions(flow),
            struggling: () => this.provideSupport(flow),
            confident: () => this.challengeUser(flow),
            uncertain: () => this.clarifyPath(flow),
            reengage: () => this.reengageUser(flow)
        };
        
        const adaptationFunction = adaptations[type] || (() => null);
        return await adaptationFunction();
    }
    
    /**
     * Simplify upcoming questions
     */
    simplifyQuestions(flow) {
        const changes = [];
        const upcomingQuestions = flow.questions.slice(flow.currentQuestionIndex + 1);
        
        upcomingQuestions.forEach((question, index) => {
            // Replace with simpler version if available
            const simplerQuestion = this.findSimplerAlternative(question);
            if (simplerQuestion) {
                flow.questions[flow.currentQuestionIndex + 1 + index] = simplerQuestion;
                changes.push({
                    original: question.id,
                    replacement: simplerQuestion.id,
                    reason: 'Simplified for better understanding'
                });
            }
            
            // Add guidance hints
            if (!question.hint) {
                question.hint = this.generateHint(question);
                changes.push({
                    questionId: question.id,
                    added: 'hint',
                    content: question.hint
                });
            }
            
            // Add examples
            if (!question.examples) {
                question.examples = this.generateExamples(question);
                changes.push({
                    questionId: question.id,
                    added: 'examples',
                    content: question.examples
                });
            }
        });
        
        return changes;
    }
    
    /**
     * Advance question difficulty
     */
    advanceQuestions(flow) {
        const changes = [];
        const upcomingQuestions = flow.questions.slice(flow.currentQuestionIndex + 1);
        
        // Add advanced questions
        const advancedQuestions = this.selectAdvancedQuestions(flow.userContext, 2);
        
        advancedQuestions.forEach(question => {
            // Insert after next question
            flow.questions.splice(flow.currentQuestionIndex + 2, 0, question);
            changes.push({
                action: 'inserted',
                question: question.id,
                reason: 'Added advanced question for deeper exploration'
            });
        });
        
        // Skip basic questions
        upcomingQuestions.forEach(question => {
            if (question.difficulty === 'beginner') {
                this.skippedQuestions.add(question.id);
                changes.push({
                    action: 'skipped',
                    question: question.id,
                    reason: 'Too basic for current performance level'
                });
            }
        });
        
        return changes;
    }
    
    /**
     * Provide additional support for struggling users
     */
    provideSupport(flow) {
        const changes = [];
        
        // Add scaffolding questions
        const scaffoldingQuestions = this.generateScaffoldingQuestions(
            flow.questions[flow.currentQuestionIndex]
        );
        
        scaffoldingQuestions.forEach((question, index) => {
            flow.questions.splice(flow.currentQuestionIndex + index + 1, 0, question);
            changes.push({
                action: 'inserted',
                question: question.id,
                type: 'scaffolding',
                reason: 'Breaking down complex concepts'
            });
        });
        
        // Add templates
        flow.questions.forEach(question => {
            if (!question.template && question.type === 'quantification') {
                question.template = this.generateTemplate(question);
                changes.push({
                    questionId: question.id,
                    added: 'template',
                    content: question.template
                });
            }
        });
        
        return changes;
    }
    
    /**
     * Challenge confident users
     */
    challengeUser(flow) {
        const changes = [];
        
        // Add challenge questions
        const challengeQuestions = this.generateChallengeQuestions(flow.userContext);
        
        challengeQuestions.forEach(question => {
            flow.questions.push(question);
            changes.push({
                action: 'added',
                question: question.id,
                type: 'challenge',
                reason: 'Testing deeper understanding'
            });
        });
        
        // Add validation requirements
        flow.questions.forEach(question => {
            if (question.type === 'validation' && !question.validationRequirement) {
                question.validationRequirement = 'Provide specific evidence or data';
                changes.push({
                    questionId: question.id,
                    added: 'validationRequirement',
                    content: question.validationRequirement
                });
            }
        });
        
        return changes;
    }
    
    /**
     * Clarify path for uncertain users
     */
    clarifyPath(flow) {
        const changes = [];
        
        // Add clarification questions
        const clarificationQuestions = this.generateClarificationQuestions(
            flow.responses,
            flow.userContext
        );
        
        clarificationQuestions.forEach((question, index) => {
            flow.questions.splice(flow.currentQuestionIndex + index + 1, 0, question);
            changes.push({
                action: 'inserted',
                question: question.id,
                type: 'clarification',
                reason: 'Resolving uncertainties'
            });
        });
        
        // Add framework guidance
        const framework = this.selectFramework(flow.userContext);
        changes.push({
            action: 'provided',
            type: 'framework',
            content: framework,
            reason: 'Providing structured approach'
        });
        
        return changes;
    }
    
    /**
     * Re-engage disengaging users
     */
    reengageUser(flow) {
        const changes = [];
        
        // Switch to interactive questions
        const interactiveQuestions = this.generateInteractiveQuestions(flow.userContext);
        
        // Replace next few questions with interactive ones
        interactiveQuestions.forEach((question, index) => {
            if (flow.currentQuestionIndex + index + 1 < flow.questions.length) {
                flow.questions[flow.currentQuestionIndex + index + 1] = question;
                changes.push({
                    action: 'replaced',
                    question: question.id,
                    type: 'interactive',
                    reason: 'Increasing engagement'
                });
            }
        });
        
        // Add motivation
        changes.push({
            action: 'added',
            type: 'motivation',
            content: this.generateMotivationalMessage(flow),
            reason: 'Encouraging continued participation'
        });
        
        // Reduce remaining questions
        const toRemove = Math.floor(flow.questions.length * 0.2);
        flow.questions.splice(-toRemove, toRemove);
        changes.push({
            action: 'reduced',
            count: toRemove,
            reason: 'Preventing fatigue'
        });
        
        return changes;
    }
    
    /**
     * Get adapted next questions
     */
    getAdaptedNextQuestions(analysis, flow) {
        const remainingQuestions = flow.questions.slice(flow.currentQuestionIndex + 1);
        
        // Filter out skipped questions
        const activeQuestions = remainingQuestions.filter(
            q => !this.skippedQuestions.has(q.id)
        );
        
        // Determine how many to show
        let count = 3; // Default
        
        if (analysis.quality < 50) {
            count = 1; // One at a time for struggling users
        } else if (analysis.quality > 80) {
            count = 5; // More for engaged users
        }
        
        return activeQuestions.slice(0, count);
    }
    
    /**
     * Helper methods
     */
    
    assessQuestionDifficulty(question, userContext) {
        // Base difficulty from question
        let difficulty = question.difficulty || 'intermediate';
        
        // Adjust based on user context
        if (userContext.companyStage === 'pre-seed' || userContext.companyStage === 'idea') {
            if (difficulty === 'expert') difficulty = 'advanced';
            if (difficulty === 'advanced') difficulty = 'intermediate';
        } else if (userContext.companyStage === 'growth' || userContext.companyStage === 'scale') {
            if (difficulty === 'beginner') difficulty = 'intermediate';
            if (difficulty === 'intermediate') difficulty = 'advanced';
        }
        
        return difficulty;
    }
    
    calculateRelevance(question, userContext) {
        let relevance = 50; // Base relevance
        
        // Industry relevance
        if (question.industries && question.industries.includes(userContext.industry)) {
            relevance += 20;
        }
        
        // Stage relevance
        if (question.stages && question.stages.includes(userContext.companyStage)) {
            relevance += 20;
        }
        
        // Problem area relevance
        if (userContext.problemAreas && question.tags) {
            const overlap = question.tags.filter(tag => 
                userContext.problemAreas.includes(tag)
            ).length;
            relevance += overlap * 10;
        }
        
        return Math.min(100, relevance);
    }
    
    calculateAdaptivePriority(question, userContext) {
        const relevance = this.calculateRelevance(question, userContext);
        const importance = question.importance || 50;
        const required = question.required ? 20 : 0;
        
        return (relevance * 0.4) + (importance * 0.4) + required;
    }
    
    determineStartingDifficulty(userContext) {
        if (userContext.previousScores && userContext.previousScores.average > 70) {
            return 'advanced';
        } else if (userContext.companyStage === 'pre-seed' || userContext.companyStage === 'idea') {
            return 'beginner';
        } else if (userContext.companyStage === 'growth' || userContext.companyStage === 'scale') {
            return 'advanced';
        }
        return 'intermediate';
    }
    
    getQuestionDistribution(userContext) {
        // Default balanced distribution
        let distribution = {
            diagnostic: 0.3,
            exploratory: 0.2,
            validation: 0.2,
            quantification: 0.2,
            strategic: 0.1
        };
        
        // Adjust based on stage
        if (userContext.companyStage === 'pre-seed') {
            distribution.diagnostic = 0.4;
            distribution.exploratory = 0.3;
            distribution.validation = 0.2;
            distribution.quantification = 0.1;
            distribution.strategic = 0.0;
        } else if (userContext.companyStage === 'growth') {
            distribution.diagnostic = 0.1;
            distribution.exploratory = 0.1;
            distribution.validation = 0.2;
            distribution.quantification = 0.3;
            distribution.strategic = 0.3;
        }
        
        return distribution;
    }
    
    getNextHighPriorityQuestion() {
        let highestPriority = null;
        let highestScore = 0;
        
        this.questionPool.forEach((questions, category) => {
            questions.forEach(question => {
                if (!this.usedQuestions.has(question.id) && 
                    question.adaptivePriority > highestScore) {
                    highestPriority = question;
                    highestScore = question.adaptivePriority;
                }
            });
        });
        
        return highestPriority;
    }
    
    detectResponsePattern(responses) {
        const responseValues = Object.values(responses);
        if (responseValues.length < 2) return null;
        
        // Check for struggling pattern
        const avgLength = responseValues.reduce((sum, r) => sum + r.length, 0) / responseValues.length;
        if (avgLength < 50) return 'struggling';
        
        // Check for confident pattern
        const hasMetrics = responseValues.filter(r => /\d+/.test(r)).length;
        if (hasMetrics > responseValues.length * 0.7) return 'confident';
        
        // Check for uncertain pattern
        const uncertainWords = ['maybe', 'possibly', 'might', 'could', 'unsure'];
        const uncertainCount = responseValues.filter(r => 
            uncertainWords.some(word => r.toLowerCase().includes(word))
        ).length;
        if (uncertainCount > responseValues.length * 0.5) return 'uncertain';
        
        return null;
    }
    
    isDisengaging(flow) {
        const responses = Object.values(flow.responses);
        if (responses.length < 3) return false;
        
        // Check if response length is decreasing
        const lastThree = responses.slice(-3);
        const lengthTrend = lastThree.map(r => r.length);
        const declining = lengthTrend[0] > lengthTrend[1] && lengthTrend[1] > lengthTrend[2];
        
        // Check if time between responses is increasing (would need timestamps)
        // For now, just use length trend
        
        return declining;
    }
    
    calculateFlowProgress() {
        if (!this.currentFlow) return 0;
        
        const totalQuestions = this.currentFlow.questions.length;
        const answeredQuestions = Object.keys(this.currentFlow.responses).length;
        const skippedCount = this.skippedQuestions.size;
        
        return {
            percentage: Math.round((answeredQuestions / (totalQuestions - skippedCount)) * 100),
            answered: answeredQuestions,
            remaining: totalQuestions - answeredQuestions - skippedCount,
            skipped: skippedCount,
            adaptations: this.currentFlow.adaptations.length
        };
    }
    
    updatePerformanceMetrics(analysis) {
        const currentCount = Object.keys(this.currentFlow.responses).length;
        
        // Update average quality
        this.performanceMetrics.averageResponseQuality = 
            (this.performanceMetrics.averageResponseQuality * (currentCount - 1) + analysis.quality) / currentCount;
        
        // Update engagement score
        this.performanceMetrics.userEngagementScore = this.calculateEngagementScore();
        
        // Update completion rate
        const progress = this.calculateFlowProgress();
        this.performanceMetrics.flowCompletionRate = progress.percentage;
    }
    
    calculateEngagementScore() {
        if (!this.currentFlow) return 0;
        
        const responses = Object.values(this.currentFlow.responses);
        if (responses.length === 0) return 0;
        
        let score = 50; // Base score
        
        // Length factor
        const avgLength = responses.reduce((sum, r) => sum + r.length, 0) / responses.length;
        score += Math.min(30, avgLength / 10);
        
        // Consistency factor
        const lengthVariance = this.calculateVariance(responses.map(r => r.length));
        if (lengthVariance < 1000) score += 10; // Consistent response lengths
        
        // Adaptation response
        if (this.currentFlow.adaptations.length > 0) {
            const positiveAdaptations = this.currentFlow.adaptations.filter(
                a => a.type === 'advance' || a.type === 'confident'
            ).length;
            score += positiveAdaptations * 5;
        }
        
        return Math.min(100, score);
    }
    
    calculateVariance(numbers) {
        const mean = numbers.reduce((sum, n) => sum + n, 0) / numbers.length;
        const squaredDiffs = numbers.map(n => Math.pow(n - mean, 2));
        return squaredDiffs.reduce((sum, d) => sum + d, 0) / numbers.length;
    }
    
    // Question generation methods
    
    findSimplerAlternative(question) {
        const simplerCategory = `${question.type}_beginner`;
        if (this.questionPool.has(simplerCategory)) {
            const alternatives = this.questionPool.get(simplerCategory);
            return alternatives.find(q => !this.usedQuestions.has(q.id));
        }
        return null;
    }
    
    generateHint(question) {
        const hints = {
            diagnostic: "Think about the specific pain points your customers experience daily.",
            exploratory: "Consider different perspectives and potential scenarios.",
            validation: "Focus on concrete evidence and real customer feedback.",
            quantification: "Use specific numbers, percentages, or measurable impacts.",
            strategic: "Think about long-term implications and competitive positioning."
        };
        return hints[question.type] || "Take your time to provide a thoughtful response.";
    }
    
    generateExamples(question) {
        const examples = {
            diagnostic: [
                "Example: 'Sales teams waste 3 hours daily on manual data entry'",
                "Example: 'CTOs struggle to find qualified developers, extending hiring time by 2 months'"
            ],
            quantification: [
                "Example: 'This problem costs companies $50K-$200K annually'",
                "Example: 'Affects 70% of B2B SaaS companies with 50+ employees'"
            ],
            validation: [
                "Example: 'Interviewed 50 potential customers, 85% confirmed this problem'",
                "Example: 'Pilot program with 10 companies showed 3x productivity improvement'"
            ]
        };
        return examples[question.type] || [];
    }
    
    selectAdvancedQuestions(userContext, count) {
        const advancedQuestions = [];
        const advancedCategories = ['strategic_advanced', 'strategic_expert', 
                                   'quantification_advanced', 'quantification_expert'];
        
        advancedCategories.forEach(category => {
            if (this.questionPool.has(category)) {
                const available = this.questionPool.get(category).filter(
                    q => !this.usedQuestions.has(q.id)
                );
                advancedQuestions.push(...available.slice(0, count));
            }
        });
        
        return advancedQuestions.slice(0, count);
    }
    
    generateScaffoldingQuestions(mainQuestion) {
        return [
            {
                id: `scaffold_${mainQuestion.id}_1`,
                text: `Before answering "${mainQuestion.text}", let's start with: Who specifically is affected by this?`,
                type: 'diagnostic',
                difficulty: 'beginner',
                isScaffolding: true
            },
            {
                id: `scaffold_${mainQuestion.id}_2`,
                text: `Now, what happens to them when they experience this problem?`,
                type: 'exploratory',
                difficulty: 'beginner',
                isScaffolding: true
            }
        ];
    }
    
    generateTemplate(question) {
        return {
            structure: "[Problem Impact]: [Specific Metric] [Timeframe]\n" +
                      "[Affected Group]: [Number/Percentage] of [Target Segment]\n" +
                      "[Current Cost]: [Dollar Amount or Time Lost]\n" +
                      "[Opportunity Size]: [Potential Savings or Gains]",
            example: "Problem Impact: 40% productivity loss weekly\n" +
                    "Affected Group: 75% of mid-market SaaS companies\n" +
                    "Current Cost: $125K annually in lost efficiency\n" +
                    "Opportunity Size: $500K potential revenue increase"
        };
    }
    
    generateChallengeQuestions(userContext) {
        return [
            {
                id: `challenge_${Date.now()}_1`,
                text: "What evidence contradicts your problem hypothesis, and how do you explain it?",
                type: 'strategic',
                difficulty: 'expert',
                isChallenge: true
            },
            {
                id: `challenge_${Date.now()}_2`,
                text: "If a well-funded competitor solved this problem tomorrow, why would customers still choose you?",
                type: 'strategic',
                difficulty: 'expert',
                isChallenge: true
            }
        ];
    }
    
    generateClarificationQuestions(responses, userContext) {
        const questions = [];
        
        // Analyze responses for contradictions or gaps
        const responseTexts = Object.values(responses).join(' ');
        
        if (!responseTexts.includes('customer') && !responseTexts.includes('user')) {
            questions.push({
                id: `clarify_customer_${Date.now()}`,
                text: "You haven't mentioned specific customers. Who exactly experiences this problem?",
                type: 'diagnostic',
                difficulty: 'intermediate',
                isClarification: true
            });
        }
        
        if (!(/\d+/.test(responseTexts))) {
            questions.push({
                id: `clarify_metrics_${Date.now()}`,
                text: "Let's add specificity. Can you quantify any aspect of this problem?",
                type: 'quantification',
                difficulty: 'intermediate',
                isClarification: true
            });
        }
        
        return questions;
    }
    
    generateInteractiveQuestions(userContext) {
        return [
            {
                id: `interactive_${Date.now()}_1`,
                text: "Quick exercise: List 3 real customers who have this problem (first names are fine)",
                type: 'validation',
                difficulty: 'beginner',
                inputType: 'list',
                isInteractive: true
            },
            {
                id: `interactive_${Date.now()}_2`,
                text: "Rate the urgency of this problem for your customers from 1-10",
                type: 'quantification',
                difficulty: 'beginner',
                inputType: 'scale',
                isInteractive: true
            }
        ];
    }
    
    selectFramework(userContext) {
        const frameworks = {
            'pre-seed': {
                name: 'Problem-Solution Fit Framework',
                steps: [
                    '1. Define the problem clearly',
                    '2. Identify who has this problem',
                    '3. Understand current alternatives',
                    '4. Quantify the pain',
                    '5. Validate with 20+ customers'
                ]
            },
            'growth': {
                name: 'Market Expansion Framework',
                steps: [
                    '1. Analyze current market penetration',
                    '2. Identify adjacent markets',
                    '3. Assess competitive landscape',
                    '4. Calculate TAM/SAM/SOM',
                    '5. Define go-to-market strategy'
                ]
            }
        };
        
        return frameworks[userContext.companyStage] || frameworks['pre-seed'];
    }
    
    generateMotivationalMessage(flow) {
        const progress = this.calculateFlowProgress();
        
        if (progress.percentage < 30) {
            return "Great start! Your insights are valuable. Let's keep building.";
        } else if (progress.percentage < 70) {
            return "You're making excellent progress! These details will really help clarify your strategy.";
        } else {
            return "Almost there! Your thoroughness will pay off in a stronger go-to-market strategy.";
        }
    }
}

/**
 * Response Analyzer for quality assessment
 */
class ResponseAnalyzer {
    async analyze(response, questionId) {
        const analysis = {
            quality: 0,
            completeness: 0,
            specificity: 0,
            evidence: 0,
            clarity: 0,
            insights: []
        };
        
        // Length analysis
        if (response.length > 200) analysis.quality += 20;
        else if (response.length > 100) analysis.quality += 10;
        else if (response.length > 50) analysis.quality += 5;
        
        // Specificity analysis
        if (/\d+/.test(response)) {
            analysis.specificity += 30;
            analysis.quality += 15;
            analysis.insights.push('Contains quantitative data');
        }
        
        if (/%/.test(response)) {
            analysis.specificity += 20;
            analysis.quality += 10;
            analysis.insights.push('Includes percentages');
        }
        
        // Evidence analysis
        const evidenceKeywords = ['customer', 'user', 'survey', 'interview', 'data', 'research'];
        evidenceKeywords.forEach(keyword => {
            if (response.toLowerCase().includes(keyword)) {
                analysis.evidence += 15;
                analysis.quality += 5;
            }
        });
        
        // Clarity analysis
        const sentences = response.split(/[.!?]+/).filter(s => s.trim().length > 0);
        if (sentences.length > 1) {
            analysis.clarity += 30;
            analysis.quality += 10;
        }
        
        // Completeness
        if (response.length > 100 && sentences.length > 2 && analysis.specificity > 20) {
            analysis.completeness = 80;
            analysis.quality += 20;
        } else if (response.length > 50 && sentences.length > 1) {
            analysis.completeness = 50;
            analysis.quality += 10;
        } else {
            analysis.completeness = 20;
        }
        
        // Cap at 100
        analysis.quality = Math.min(100, analysis.quality);
        
        return analysis;
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AdaptiveQuestionFlow, ResponseAnalyzer };
}

if (typeof window !== 'undefined') {
    window.AdaptiveQuestionFlow = AdaptiveQuestionFlow;
    window.ResponseAnalyzer = ResponseAnalyzer;
}

console.log('✅ Adaptive Question Flow Engine loaded - ready for dynamic adaptation!');
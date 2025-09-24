// ScaleOps6 Dynamic Worksheet Generator
// This system creates personalized, adaptive worksheets for each subcomponent
// using agent intelligence and scoring engine feedback

class DynamicWorksheetGenerator {
    constructor(subcomponentId, agent, scoringEngine) {
        this.subcomponentId = subcomponentId;
        this.agent = agent;
        this.scoringEngine = scoringEngine || new ScoringEngine();
        this.analysisEngine = typeof ScoreAnalysisEngine !== 'undefined' ? 
            new ScoreAnalysisEngine() : null;
        
        // Track worksheet state
        this.currentWorksheet = null;
        this.responseHistory = [];
        this.adaptationLog = [];
        
        // Question generation settings
        this.settings = {
            minQuestions: 4,
            maxQuestions: 8,
            adaptiveDepth: 3, // How many follow-ups per topic
            difficultyLevels: ['beginner', 'intermediate', 'advanced', 'expert'],
            questionTypes: ['diagnostic', 'exploratory', 'validation', 'quantification', 'strategic']
        };
        
        console.log(`🎯 Dynamic Worksheet Generator initialized for ${subcomponentId}`);
    }
    
    /**
     * Generate a completely dynamic worksheet based on user context
     */
    async generateDynamicWorksheet(userContext = {}, previousResponses = {}) {
        console.log('🔮 Generating dynamic worksheet...');
        
        // 1. Analyze user context and determine strategy
        const strategy = await this.determineStrategy(userContext, previousResponses);
        
        // 2. Generate base questions using agent intelligence
        const baseQuestions = await this.generateBaseQuestions(strategy);
        
        // 3. Enrich questions with contextual information
        const enrichedQuestions = await this.enrichQuestions(baseQuestions, userContext);
        
        // 4. Create adaptive worksheet structure
        const worksheet = this.createAdaptiveWorksheet(enrichedQuestions, strategy);
        
        // 5. Store for future adaptation
        this.currentWorksheet = worksheet;
        
        console.log(`✅ Generated dynamic worksheet with ${worksheet.questions.length} questions`);
        return worksheet;
    }
    
    /**
     * Determine the questioning strategy based on context
     */
    async determineStrategy(userContext, previousResponses) {
        const strategy = {
            difficulty: 'intermediate',
            questionMix: {},
            focusAreas: [],
            adaptiveMode: 'balanced',
            followUpDepth: 2
        };
        
        // Calculate user maturity level
        const maturityLevel = this.assessMaturity(userContext, previousResponses);
        
        // Adjust difficulty based on maturity
        if (maturityLevel < 30) {
            strategy.difficulty = 'beginner';
            strategy.questionMix = {
                diagnostic: 0.4,    // Focus on understanding
                exploratory: 0.3,   // Discovery questions
                validation: 0.2,    // Some validation
                quantification: 0.1 // Light metrics
            };
            strategy.adaptiveMode = 'supportive';
        } else if (maturityLevel < 60) {
            strategy.difficulty = 'intermediate';
            strategy.questionMix = {
                diagnostic: 0.2,
                exploratory: 0.2,
                validation: 0.3,
                quantification: 0.2,
                strategic: 0.1
            };
            strategy.adaptiveMode = 'balanced';
        } else if (maturityLevel < 85) {
            strategy.difficulty = 'advanced';
            strategy.questionMix = {
                diagnostic: 0.1,
                validation: 0.3,
                quantification: 0.3,
                strategic: 0.3
            };
            strategy.adaptiveMode = 'challenging';
        } else {
            strategy.difficulty = 'expert';
            strategy.questionMix = {
                validation: 0.2,
                quantification: 0.3,
                strategic: 0.5
            };
            strategy.adaptiveMode = 'expert';
        }
        
        // Identify focus areas from previous responses
        if (previousResponses && Object.keys(previousResponses).length > 0) {
            strategy.focusAreas = this.identifyWeakAreas(previousResponses);
            strategy.followUpDepth = strategy.focusAreas.length > 0 ? 3 : 2;
        }
        
        // Add industry-specific adjustments
        if (userContext.industry) {
            strategy.industryContext = userContext.industry;
            this.adjustStrategyForIndustry(strategy, userContext.industry);
        }
        
        console.log('📊 Strategy determined:', strategy);
        return strategy;
    }
    
    /**
     * Assess user maturity level (0-100)
     */
    assessMaturity(userContext, previousResponses) {
        let maturityScore = 0;
        let factors = 0;
        
        // Check user profile indicators
        if (userContext.companyStage) {
            const stageScores = {
                'idea': 10,
                'pre-seed': 20,
                'seed': 35,
                'series-a': 50,
                'series-b': 70,
                'growth': 85,
                'mature': 95
            };
            maturityScore += stageScores[userContext.companyStage.toLowerCase()] || 30;
            factors++;
        }
        
        // Check previous response quality
        if (previousResponses && Object.keys(previousResponses).length > 0) {
            const responseQuality = this.assessResponseQuality(previousResponses);
            maturityScore += responseQuality;
            factors++;
        }
        
        // Check domain expertise indicators
        if (userContext.yearsExperience) {
            const expScore = Math.min(userContext.yearsExperience * 10, 100);
            maturityScore += expScore;
            factors++;
        }
        
        // Check previous scores if available
        if (userContext.previousScores && userContext.previousScores.length > 0) {
            const avgScore = userContext.previousScores.reduce((a, b) => a + b, 0) / userContext.previousScores.length;
            maturityScore += avgScore;
            factors++;
        }
        
        return factors > 0 ? Math.round(maturityScore / factors) : 50; // Default to intermediate
    }
    
    /**
     * Generate base questions using agent intelligence
     */
    async generateBaseQuestions(strategy) {
        const questions = [];
        const totalQuestions = Math.min(
            this.settings.maxQuestions,
            Math.max(this.settings.minQuestions, Math.round(Math.random() * 3 + 5))
        );
        
        // Generate questions for each type based on mix
        for (const [type, ratio] of Object.entries(strategy.questionMix)) {
            const count = Math.round(totalQuestions * ratio);
            for (let i = 0; i < count; i++) {
                const question = await this.generateQuestionByType(
                    type,
                    strategy.difficulty,
                    strategy.focusAreas
                );
                if (question) {
                    questions.push(question);
                }
            }
        }
        
        // Ensure we have enough questions
        while (questions.length < this.settings.minQuestions) {
            const fallbackQuestion = await this.generateQuestionByType(
                'diagnostic',
                strategy.difficulty,
                []
            );
            questions.push(fallbackQuestion);
        }
        
        return questions;
    }
    
    /**
     * Generate a specific type of question
     */
    async generateQuestionByType(type, difficulty, focusAreas) {
        const questionTemplates = this.getQuestionTemplates(type, difficulty);
        const template = questionTemplates[Math.floor(Math.random() * questionTemplates.length)];
        
        // Create question from template
        const question = {
            id: `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            type: type,
            difficulty: difficulty,
            template: template.text,
            text: this.fillTemplate(template.text, this.getContextVariables()),
            required: template.required !== false,
            validation: template.validation || {},
            scoringCriteria: template.scoringCriteria || [],
            weight: template.weight || 1,
            helpText: template.helpText || '',
            examples: template.examples || [],
            followUpConditions: template.followUpConditions || {},
            metadata: {
                generatedAt: new Date().toISOString(),
                focusArea: focusAreas[0] || 'general',
                adaptiveDepth: 0
            }
        };
        
        // Add input configuration
        question.inputType = this.determineInputType(template);
        if (template.options) {
            question.options = template.options;
        }
        
        return question;
    }
    
    /**
     * Get question templates based on type and difficulty
     */
    getQuestionTemplates(type, difficulty) {
        const templates = {
            diagnostic: {
                beginner: [
                    {
                        text: "What is the main problem you're trying to solve?",
                        validation: { minLength: 50 },
                        scoringCriteria: ['clarity', 'specificity'],
                        helpText: "Describe the problem in simple terms",
                        weight: 1.5
                    },
                    {
                        text: "Who experiences this problem most often?",
                        validation: { minLength: 30 },
                        scoringCriteria: ['persona_clarity', 'segmentation'],
                        helpText: "Be specific about your target audience"
                    },
                    {
                        text: "When does this problem typically occur?",
                        validation: { minLength: 40 },
                        scoringCriteria: ['context', 'triggers'],
                        helpText: "Describe the situations or events that trigger the problem"
                    }
                ],
                intermediate: [
                    {
                        text: "Describe the specific problem your {target_segment} faces when {context}",
                        validation: { minLength: 100 },
                        scoringCriteria: ['clarity', 'specificity', 'relevance'],
                        helpText: "Include details about frequency and severity",
                        weight: 2
                    },
                    {
                        text: "What are the top 3 pain points your customers experience?",
                        validation: { minLength: 150 },
                        scoringCriteria: ['comprehensiveness', 'prioritization'],
                        helpText: "List them in order of importance"
                    }
                ],
                advanced: [
                    {
                        text: "Analyze the root cause of the problem using the 5 Whys framework",
                        validation: { minLength: 200 },
                        scoringCriteria: ['depth', 'causality', 'insight'],
                        helpText: "Keep asking 'why' to get to the root cause",
                        weight: 2.5
                    },
                    {
                        text: "Map the problem to specific jobs-to-be-done for your customer",
                        validation: { minLength: 150 },
                        scoringCriteria: ['jtbd_clarity', 'outcome_focus'],
                        helpText: "Focus on what customers are trying to achieve"
                    }
                ],
                expert: [
                    {
                        text: "Provide a systems-level analysis of how this problem impacts the broader ecosystem",
                        validation: { minLength: 250 },
                        scoringCriteria: ['systems_thinking', 'interconnections', 'ripple_effects'],
                        weight: 3
                    }
                ]
            },
            exploratory: {
                beginner: [
                    {
                        text: "What have you tried so far to understand this problem?",
                        validation: { minLength: 50 },
                        scoringCriteria: ['research_effort', 'methodology'],
                        helpText: "Describe any research or discovery activities"
                    },
                    {
                        text: "What questions do you still have about this problem?",
                        validation: { minLength: 40 },
                        scoringCriteria: ['curiosity', 'gaps_awareness'],
                        helpText: "List your key unknowns"
                    }
                ],
                intermediate: [
                    {
                        text: "What assumptions are you making about this problem that need validation?",
                        validation: { minLength: 100 },
                        scoringCriteria: ['self_awareness', 'hypothesis_quality'],
                        helpText: "Be honest about what you don't know for certain"
                    },
                    {
                        text: "Describe your customer discovery process and key findings",
                        validation: { minLength: 150 },
                        scoringCriteria: ['methodology', 'insights', 'evidence'],
                        helpText: "Include number of interviews and main insights"
                    }
                ],
                advanced: [
                    {
                        text: "What adjacent problems or opportunities have you discovered?",
                        validation: { minLength: 150 },
                        scoringCriteria: ['vision', 'opportunity_recognition'],
                        helpText: "Think beyond the immediate problem"
                    }
                ],
                expert: [
                    {
                        text: "How might this problem evolve over the next 3-5 years given current trends?",
                        validation: { minLength: 200 },
                        scoringCriteria: ['foresight', 'trend_analysis', 'strategic_thinking'],
                        weight: 2.5
                    }
                ]
            },
            validation: {
                beginner: [
                    {
                        text: "How many people have told you they have this problem?",
                        validation: { pattern: 'number' },
                        scoringCriteria: ['validation_quantity'],
                        inputType: 'number',
                        helpText: "Enter a specific number"
                    },
                    {
                        text: "Share one direct quote from a customer about this problem",
                        validation: { minLength: 30 },
                        scoringCriteria: ['evidence', 'authenticity'],
                        helpText: "Use their exact words"
                    }
                ],
                intermediate: [
                    {
                        text: "Describe your validation methodology and sample size",
                        validation: { minLength: 100 },
                        scoringCriteria: ['methodology', 'statistical_validity'],
                        helpText: "Include how you selected and interviewed customers"
                    },
                    {
                        text: "What percentage of interviewed customers confirmed this as a top-3 problem?",
                        validation: { pattern: 'percentage' },
                        scoringCriteria: ['validation_strength'],
                        inputType: 'percentage',
                        helpText: "Enter a percentage (0-100)"
                    }
                ],
                advanced: [
                    {
                        text: "Provide statistical evidence of problem prevalence in your target market",
                        validation: { minLength: 150 },
                        scoringCriteria: ['data_quality', 'statistical_rigor'],
                        helpText: "Include sources and confidence intervals"
                    }
                ],
                expert: [
                    {
                        text: "Present a cohort analysis showing problem evolution across customer segments",
                        validation: { minLength: 200 },
                        scoringCriteria: ['analytical_depth', 'segmentation', 'insights'],
                        weight: 3
                    }
                ]
            },
            quantification: {
                beginner: [
                    {
                        text: "How much time does this problem cost your customers?",
                        validation: { minLength: 30 },
                        scoringCriteria: ['time_impact'],
                        helpText: "Estimate hours per week or month"
                    },
                    {
                        text: "How much money does this problem cost?",
                        validation: { minLength: 30 },
                        scoringCriteria: ['financial_impact'],
                        helpText: "Provide a rough estimate"
                    }
                ],
                intermediate: [
                    {
                        text: "Calculate the total addressable problem (TAP) in dollar terms",
                        validation: { minLength: 100 },
                        scoringCriteria: ['market_sizing', 'calculation_logic'],
                        helpText: "Show your calculation: # customers × frequency × cost per incident"
                    },
                    {
                        text: "What is the opportunity cost of not solving this problem?",
                        validation: { minLength: 100 },
                        scoringCriteria: ['opportunity_cost', 'strategic_impact'],
                        helpText: "Consider both direct and indirect costs"
                    }
                ],
                advanced: [
                    {
                        text: "Provide a detailed ROI model for solving this problem",
                        validation: { minLength: 200 },
                        scoringCriteria: ['financial_modeling', 'assumptions', 'sensitivity'],
                        helpText: "Include key assumptions and sensitivity analysis"
                    }
                ],
                expert: [
                    {
                        text: "Build a Monte Carlo simulation of problem impact across scenarios",
                        validation: { minLength: 250 },
                        scoringCriteria: ['probabilistic_thinking', 'scenario_planning'],
                        weight: 3
                    }
                ]
            },
            strategic: {
                intermediate: [
                    {
                        text: "How does solving this problem create competitive advantage?",
                        validation: { minLength: 100 },
                        scoringCriteria: ['strategic_thinking', 'differentiation'],
                        helpText: "Think about moats and barriers to entry"
                    }
                ],
                advanced: [
                    {
                        text: "Describe your go-to-market strategy for this solution",
                        validation: { minLength: 150 },
                        scoringCriteria: ['gtm_clarity', 'channel_strategy', 'positioning'],
                        helpText: "Include channels, messaging, and pricing approach"
                    },
                    {
                        text: "What is your hypothesis for achieving product-market fit?",
                        validation: { minLength: 150 },
                        scoringCriteria: ['pmf_understanding', 'metrics', 'milestones'],
                        helpText: "Include specific metrics and milestones"
                    }
                ],
                expert: [
                    {
                        text: "Design a platform strategy that leverages network effects",
                        validation: { minLength: 250 },
                        scoringCriteria: ['platform_thinking', 'network_effects', 'ecosystem'],
                        weight: 3
                    },
                    {
                        text: "How will you defend against disruption over a 10-year horizon?",
                        validation: { minLength: 200 },
                        scoringCriteria: ['long_term_thinking', 'disruption_awareness'],
                        weight: 2.5
                    }
                ]
            }
        };
        
        // Return templates for the requested type and difficulty
        const typeTemplates = templates[type] || templates.diagnostic;
        const difficultyTemplates = typeTemplates[difficulty] || typeTemplates.beginner;
        
        // If no templates for exact difficulty, fall back to closest
        if (difficultyTemplates.length === 0) {
            const difficulties = ['beginner', 'intermediate', 'advanced', 'expert'];
            const currentIndex = difficulties.indexOf(difficulty);
            
            // Try lower difficulty first
            for (let i = currentIndex - 1; i >= 0; i--) {
                if (typeTemplates[difficulties[i]] && typeTemplates[difficulties[i]].length > 0) {
                    return typeTemplates[difficulties[i]];
                }
            }
            
            // Then try higher difficulty
            for (let i = currentIndex + 1; i < difficulties.length; i++) {
                if (typeTemplates[difficulties[i]] && typeTemplates[difficulties[i]].length > 0) {
                    return typeTemplates[difficulties[i]];
                }
            }
        }
        
        return difficultyTemplates;
    }
    
    /**
     * Fill template with context variables
     */
    fillTemplate(template, variables) {
        let filled = template;
        
        // Replace variables in {variable} format
        Object.entries(variables).forEach(([key, value]) => {
            const regex = new RegExp(`\\{${key}\\}`, 'g');
            filled = filled.replace(regex, value);
        });
        
        return filled;
    }
    
    /**
     * Get context variables for template filling
     */
    getContextVariables() {
        return {
            target_segment: 'target customers',
            context: 'trying to achieve their goals',
            timeframe: 'daily operations',
            metric_type: 'time or money',
            solution_type: 'product or service',
            industry: 'your industry',
            company_stage: 'current stage'
        };
    }
    
    /**
     * Determine input type based on template
     */
    determineInputType(template) {
        if (template.inputType) {
            return template.inputType;
        }
        
        if (template.validation) {
            if (template.validation.pattern === 'number') {
                return 'number';
            }
            if (template.validation.pattern === 'percentage') {
                return 'percentage';
            }
            if (template.validation.pattern === 'currency') {
                return 'currency';
            }
            if (template.validation.pattern === 'email') {
                return 'email';
            }
            if (template.validation.pattern === 'url') {
                return 'url';
            }
        }
        
        if (template.options) {
            return template.options.length > 5 ? 'select' : 'radio';
        }
        
        if (template.validation && template.validation.minLength > 200) {
            return 'textarea-large';
        }
        
        if (template.validation && template.validation.minLength > 100) {
            return 'textarea';
        }
        
        return 'text';
    }
    
    /**
     * Enrich questions with contextual information
     */
    async enrichQuestions(baseQuestions, userContext) {
        const enrichedQuestions = [];
        
        for (const question of baseQuestions) {
            const enriched = { ...question };
            
            // Add industry-specific context
            if (userContext.industry) {
                enriched.industryContext = this.getIndustryContext(userContext.industry, question.type);
            }
            
            // Add stage-specific guidance
            if (userContext.companyStage) {
                enriched.stageGuidance = this.getStageGuidance(userContext.companyStage, question.type);
            }
            
            // Add personalized examples
            enriched.examples = this.generatePersonalizedExamples(
                question.type,
                userContext.industry,
                question.difficulty
            );
            
            // Add smart defaults based on context
            if (userContext.previousResponses) {
                enriched.smartDefault = this.generateSmartDefault(
                    question,
                    userContext.previousResponses
                );
            }
            
            // Add follow-up questions
            enriched.followUps = this.generateFollowUpQuestions(
                question,
                userContext
            );
            
            enrichedQuestions.push(enriched);
        }
        
        return enrichedQuestions;
    }
    
    /**
     * Create adaptive worksheet structure
     */
    createAdaptiveWorksheet(questions, strategy) {
        const worksheet = {
            id: `worksheet_${this.subcomponentId}_${Date.now()}`,
            subcomponentId: this.subcomponentId,
            version: '2.0',
            generatedAt: new Date().toISOString(),
            strategy: strategy,
            questions: questions,
            adaptiveFeatures: {
                enabled: true,
                mode: strategy.adaptiveMode,
                maxFollowUps: strategy.followUpDepth,
                branchingLogic: this.generateBranchingLogic(questions),
                scoringThresholds: this.generateScoringThresholds(strategy.difficulty)
            },
            metadata: {
                estimatedTime: this.estimateCompletionTime(questions),
                requiredFields: questions.filter(q => q.required).map(q => q.id),
                optionalFields: questions.filter(q => !q.required).map(q => q.id),
                totalWeight: questions.reduce((sum, q) => sum + (q.weight || 1), 0)
            }
        };
        
        return worksheet;
    }
    
    /**
     * Generate branching logic for adaptive flow
     */
    generateBranchingLogic(questions) {
        const logic = {};
        
        questions.forEach((question, index) => {
            logic[question.id] = {
                next: index < questions.length - 1 ? questions[index + 1].id : null,
                conditions: []
            };
            
            // Add conditions for follow-ups
            if (question.followUpConditions) {
                Object.entries(question.followUpConditions).forEach(([condition, action]) => {
                    logic[question.id].conditions.push({
                        if: condition,
                        then: action
                    });
                });
            }
        });
        
        return logic;
    }
    
    /**
     * Generate scoring thresholds based on difficulty
     */
    generateScoringThresholds(difficulty) {
        const thresholds = {
            beginner: {
                excellent: 70,
                good: 50,
                acceptable: 30,
                needsWork: 0
            },
            intermediate: {
                excellent: 80,
                good: 60,
                acceptable: 40,
                needsWork: 0
            },
            advanced: {
                excellent: 85,
                good: 70,
                acceptable: 50,
                needsWork: 0
            },
            expert: {
                excellent: 90,
                good: 75,
                acceptable: 60,
                needsWork: 0
            }
        };
        
        return thresholds[difficulty] || thresholds.intermediate;
    }
    
    /**
     * Estimate completion time based on questions
     */
    estimateCompletionTime(questions) {
        let totalMinutes = 0;
        
        questions.forEach(question => {
            // Base time per question type
            const baseTime = {
                diagnostic: 3,
                exploratory: 4,
                validation: 2,
                quantification: 5,
                strategic: 6
            };
            
            let questionTime = baseTime[question.type] || 3;
            
            // Adjust for input type
            if (question.inputType === 'textarea-large') {
                questionTime += 3;
            } else if (question.inputType === 'textarea') {
                questionTime += 2;
            }
            
            // Adjust for difficulty
            const difficultyMultiplier = {
                beginner: 0.8,
                intermediate: 1,
                advanced: 1.3,
                expert: 1.5
            };
            
            questionTime *= difficultyMultiplier[question.difficulty] || 1;
            
            totalMinutes += questionTime;
        });
        
        return Math.round(totalMinutes);
    }
    
    /**
     * Process a response and adapt the worksheet
     */
    async processResponse(questionId, response) {
        console.log(`📝 Processing response for question ${questionId}`);
        
        // Store response
        this.responseHistory.push({
            questionId: questionId,
            response: response,
            timestamp: new Date().toISOString()
        });
        
        // Score the response
        const score = await this.scoreResponse(questionId, response);
        
        // Determine if adaptation is needed
        const adaptation = await this.determineAdaptation(questionId, response, score);
        
        if (adaptation.needed) {
            console.log(`🔄 Adapting worksheet: ${adaptation.reason}`);
            await this.adaptWorksheet(adaptation);
        }
        
        return {
            score: score,
            adaptation: adaptation,
            nextQuestion: this.getNextQuestion(questionId)
        };
    }
    
    /**
     * Score a response
     */
    async scoreResponse(questionId, response) {
        const question = this.findQuestion(questionId);
        if (!question) {
            return { score: 0, feedback: 'Question not found' };
        }
        
        const scoring = {
            score: 0,
            maxScore: 100,
            breakdown: {},
            feedback: []
        };
        
        // Check each scoring criterion
        question.scoringCriteria.forEach(criterion => {
            const criterionScore = this.evaluateCriterion(criterion, response, question);
            scoring.breakdown[criterion] = criterionScore;
            scoring.score += criterionScore.score;
        });
        
        // Normalize score
        if (question.scoringCriteria.length > 0) {
            scoring.score = Math.round(scoring.score / question.scoringCriteria.length);
        }
        
        // Generate feedback
        scoring.feedback = this.generateResponseFeedback(scoring, question);
        
        return scoring;
    }
    
    /**
     * Evaluate a specific scoring criterion
     */
    evaluateCriterion(criterion, response, question) {
        const evaluation = {
            criterion: criterion,
            score: 0,
            maxScore: 100,
            feedback: ''
        };
        
        // Length-based scoring
        if (criterion === 'clarity' || criterion === 'specificity') {
            const minLength = question.validation?.minLength || 50;
            const responseLength = response.length;
            
            if (responseLength >= minLength * 2) {
                evaluation.score = 90;
                evaluation.feedback = 'Excellent detail and clarity';
            } else if (responseLength >= minLength * 1.5) {
                evaluation.score = 75;
                evaluation.feedback = 'Good level of detail';
            } else if (responseLength >= minLength) {
                evaluation.score = 60;
                evaluation.feedback = 'Adequate detail';
            } else {
                evaluation.score = 30;
                evaluation.feedback = 'Needs more detail';
            }
        }
        
        // Keyword-based scoring
        const keywordScoring = {
            'persona_clarity': ['customer', 'user', 'segment', 'demographic', 'role', 'company size'],
            'segmentation': ['segment', 'cohort', 'group', 'category', 'tier'],
            'context': ['when', 'during', 'while', 'situation', 'scenario'],
            'triggers': ['causes', 'leads to', 'results in', 'because', 'trigger'],
            'validation_quantity': [/\d+/, /many/, /several/, /few/],
            'evidence': ['said', 'told', 'mentioned', 'quote', 'feedback'],
            'time_impact': ['hours', 'days', 'weeks', 'minutes', 'time'],
            'financial_impact': ['$', 'dollar', 'cost', 'expense', 'revenue', 'loss']
        };
        
        if (keywordScoring[criterion]) {
            const keywords = keywordScoring[criterion];
            let matches = 0;
            
            keywords.forEach(keyword => {
                if (keyword instanceof RegExp) {
                    if (keyword.test(response)) matches++;
                } else {
                    if (response.toLowerCase().includes(keyword)) matches++;
                }
            });
            
            evaluation.score = Math.min(100, matches * 25);
            evaluation.feedback = matches > 0 ? 
                `Found ${matches} relevant indicators` : 
                'Missing key indicators';
        }
        
        // Default scoring for unknown criteria
        if (evaluation.score === 0 && evaluation.feedback === '') {
            evaluation.score = 50;
            evaluation.feedback = 'Standard evaluation';
        }
        
        return evaluation;
    }
    
    /**
     * Generate feedback for a response
     */
    generateResponseFeedback(scoring, question) {
        const feedback = [];
        
        if (scoring.score >= 80) {
            feedback.push('Excellent response with strong detail and clarity');
        } else if (scoring.score >= 60) {
            feedback.push('Good response, consider adding more specific examples');
        } else if (scoring.score >= 40) {
            feedback.push('Adequate response, but needs more depth and specificity');
        } else {
            feedback.push('Response needs significant improvement in detail and clarity');
        }
        
        // Add criterion-specific feedback
        Object.entries(scoring.breakdown).forEach(([criterion, evaluation]) => {
            if (evaluation.score < 50) {
                feedback.push(`Improvement needed in ${criterion}: ${evaluation.feedback}`);
            }
        });
        
        return feedback;
    }
    
    /**
     * Determine if worksheet adaptation is needed
     */
    async determineAdaptation(questionId, response, score) {
        const adaptation = {
            needed: false,
            reason: '',
            actions: []
        };
        
        // Check if response indicates confusion
        if (response.toLowerCase().includes("i don't understand") || 
            response.toLowerCase().includes("not sure") ||
            response.length < 20) {
            adaptation.needed = true;
            adaptation.reason = 'User appears confused';
            adaptation.actions.push({
                type: 'add_clarification',
                questionId: questionId
            });
        }
        
        // Check if score is very low
        if (score.score < 30) {
            adaptation.needed = true;
            adaptation.reason = 'Low score indicates need for simpler questions';
            adaptation.actions.push({
                type: 'reduce_difficulty',
                currentDifficulty: this.findQuestion(questionId).difficulty
            });
        }
        
        // Check if score is very high
        if (score.score > 90) {
            adaptation.needed = true;
            adaptation.reason = 'High score indicates readiness for advanced questions';
            adaptation.actions.push({
                type: 'increase_difficulty',
                currentDifficulty: this.findQuestion(questionId).difficulty
            });
        }
        
        // Check if follow-up is warranted
        if (score.score >= 60 && score.score <= 80) {
            const question = this.findQuestion(questionId);
            if (question.followUps && question.followUps.length > 0) {
                adaptation.needed = true;
                adaptation.reason = 'Good response warrants follow-up';
                adaptation.actions.push({
                    type: 'add_followup',
                    parentQuestionId: questionId
                });
            }
        }
        
        return adaptation;
    }
    
    /**
     * Adapt the worksheet based on analysis
     */
    async adaptWorksheet(adaptation) {
        this.adaptationLog.push({
            timestamp: new Date().toISOString(),
            adaptation: adaptation
        });
        
        for (const action of adaptation.actions) {
            switch (action.type) {
                case 'add_clarification':
                    await this.addClarificationQuestion(action.questionId);
                    break;
                    
                case 'reduce_difficulty':
                    await this.reduceDifficulty();
                    break;
                    
                case 'increase_difficulty':
                    await this.increaseDifficulty();
                    break;
                    
                case 'add_followup':
                    await this.addFollowUpQuestion(action.parentQuestionId);
                    break;
                    
                default:
                    console.log(`Unknown adaptation action: ${action.type}`);
            }
        }
    }
    
    /**
     * Add a clarification question
     */
    async addClarificationQuestion(parentQuestionId) {
        const parentQuestion = this.findQuestion(parentQuestionId);
        if (!parentQuestion) return;
        
        const clarification = {
            id: `q_clarify_${Date.now()}`,
            type: 'diagnostic',
            difficulty: 'beginner',
            text: `Let me help you with that. ${parentQuestion.helpText || 'Can you provide an example or describe a specific situation?'}`,
            required: false,
            validation: { minLength: 30 },
            scoringCriteria: ['clarity'],
            weight: 0.5,
            metadata: {
                generatedAt: new Date().toISOString(),
                parentQuestion: parentQuestionId,
                adaptiveDepth: 1
            }
        };
        
        // Insert after parent question
        const parentIndex = this.currentWorksheet.questions.findIndex(q => q.id === parentQuestionId);
        this.currentWorksheet.questions.splice(parentIndex + 1, 0, clarification);
        
        console.log(`➕ Added clarification question after ${parentQuestionId}`);
    }
    
    /**
     * Add a follow-up question
     */
    async addFollowUpQuestion(parentQuestionId) {
        const parentQuestion = this.findQuestion(parentQuestionId);
        if (!parentQuestion || !parentQuestion.followUps || parentQuestion.followUps.length === 0) return;
        
        // Select appropriate follow-up
        const followUp = parentQuestion.followUps[0]; // Could be smarter about selection
        
        const followUpQuestion = {
            id: `q_followup_${Date.now()}`,
            type: parentQuestion.type,
            difficulty: parentQuestion.difficulty,
            text: followUp.text || followUp,
            required: false,
            validation: followUp.validation || { minLength: 50 },
            scoringCriteria: followUp.scoringCriteria || ['depth'],
            weight: followUp.weight || 0.8,
            metadata: {
                generatedAt: new Date().toISOString(),
                parentQuestion: parentQuestionId,
                adaptiveDepth: (parentQuestion.metadata?.adaptiveDepth || 0) + 1
            }
        };
        
        // Insert after parent question
        const parentIndex = this.currentWorksheet.questions.findIndex(q => q.id === parentQuestionId);
        this.currentWorksheet.questions.splice(parentIndex + 1, 0, followUpQuestion);
        
        console.log(`➕ Added follow-up question after ${parentQuestionId}`);
    }
    
    /**
     * Helper methods
     */
    
    findQuestion(questionId) {
        if (!this.currentWorksheet) return null;
        return this.currentWorksheet.questions.find(q => q.id === questionId);
    }
    
    getNextQuestion(currentQuestionId) {
        if (!this.currentWorksheet) return null;
        
        const currentIndex = this.currentWorksheet.questions.findIndex(q => q.id === currentQuestionId);
        if (currentIndex === -1 || currentIndex === this.currentWorksheet.questions.length - 1) {
            return null;
        }
        
        return this.currentWorksheet.questions[currentIndex + 1];
    }
    
    assessResponseQuality(responses) {
        let totalScore = 0;
        let count = 0;
        
        Object.values(responses).forEach(response => {
            if (typeof response === 'string' && response.length > 0) {
                // Basic quality assessment
                let score = 50; // Base score
                
                // Length bonus
                if (response.length > 200) score += 20;
                else if (response.length > 100) score += 10;
                
                // Specificity bonus (has numbers, percentages, etc.)
                if (/\d+/.test(response)) score += 10;
                if (/%/.test(response)) score += 5;
                if (/\$/.test(response)) score += 5;
                
                // Structure bonus (has multiple sentences)
                const sentences = response.split(/[.!?]+/).filter(s => s.trim().length > 0);
                if (sentences.length > 3) score += 10;
                
                totalScore += Math.min(100, score);
                count++;
            }
        });
        
        return count > 0 ? Math.round(totalScore / count) : 50;
    }
    
    identifyWeakAreas(responses) {
        const weakAreas = [];
        
        // Analyze response patterns
        const responseAnalysis = {};
        
        Object.entries(responses).forEach(([field, response]) => {
            if (typeof response === 'string') {
                responseAnalysis[field] = {
                    length: response.length,
                    hasNumbers: /\d+/.test(response),
                    hasSpecifics: /specifically|exactly|precisely/.test(response.toLowerCase()),
                    quality: this.assessResponseQuality({ [field]: response })
                };
            }
        });
        
        // Identify weak areas
        Object.entries(responseAnalysis).forEach(([field, analysis]) => {
            if (analysis.quality < 60) {
                weakAreas.push(field);
            }
        });
        
        return weakAreas;
    }
    
    adjustStrategyForIndustry(strategy, industry) {
        const industryAdjustments = {
            'b2b-saas': {
                focusAreas: ['metrics', 'scalability', 'integration'],
                questionMix: { ...strategy.questionMix, quantification: 0.3 }
            },
            'enterprise': {
                focusAreas: ['compliance', 'security', 'roi'],
                questionMix: { ...strategy.questionMix, validation: 0.3 }
            },
            'consumer': {
                focusAreas: ['user-experience', 'virality', 'retention'],
                questionMix: { ...strategy.questionMix, exploratory: 0.3 }
            },
            'marketplace': {
                focusAreas: ['liquidity', 'network-effects', 'two-sided'],
                questionMix: { ...strategy.questionMix, strategic: 0.3 }
            }
        };
        
        const adjustment = industryAdjustments[industry.toLowerCase()];
        if (adjustment) {
            strategy.focusAreas = [...strategy.focusAreas, ...adjustment.focusAreas];
            strategy.questionMix = adjustment.questionMix;
        }
    }
    
    getIndustryContext(industry, questionType) {
        const contexts = {
            'b2b-saas': {
                diagnostic: 'Consider subscription model implications',
                quantification: 'Focus on MRR, CAC, and LTV metrics',
                strategic: 'Think about integration and platform strategy'
            },
            'enterprise': {
                diagnostic: 'Consider long sales cycles and multiple stakeholders',
                validation: 'Focus on pilot programs and POCs',
                strategic: 'Think about compliance and security requirements'
            }
        };
        
        return contexts[industry.toLowerCase()]?.[questionType] || '';
    }
    
    getStageGuidance(stage, questionType) {
        const guidance = {
            'pre-seed': {
                diagnostic: 'Focus on problem validation',
                exploratory: 'Explore multiple problem angles',
                validation: 'Aim for 20+ customer interviews'
            },
            'seed': {
                diagnostic: 'Refine problem-solution fit',
                quantification: 'Start measuring key metrics',
                strategic: 'Define go-to-market strategy'
            },
            'series-a': {
                quantification: 'Focus on unit economics',
                strategic: 'Plan for scaling',
                validation: 'Validate product-market fit signals'
            }
        };
        
        return guidance[stage.toLowerCase()]?.[questionType] || '';
    }
    
    generatePersonalizedExamples(questionType, industry, difficulty) {
        const examples = [];
        
        // Add industry-specific examples
        if (industry === 'b2b-saas') {
            if (questionType === 'diagnostic') {
                examples.push('Example: "Sales teams waste 6 hours per week on manual data entry across 3 different CRM systems"');
            } else if (questionType === 'quantification') {
                examples.push('Example: "Each rep loses $50K in annual quota attainment, affecting 10,000 reps in our TAM"');
            }
        }
        
        // Add difficulty-appropriate examples
        if (difficulty === 'beginner') {
            examples.push('Keep it simple and specific to your experience');
        } else if (difficulty === 'advanced') {
            examples.push('Include data, metrics, and systemic analysis');
        }
        
        return examples;
    }
    
    generateSmartDefault(question, previousResponses) {
        // Look for patterns in previous responses that might inform this question
        // This is a simplified version - could be much more sophisticated
        
        if (question.type === 'diagnostic' && previousResponses.who) {
            return `Building on your target audience of "${previousResponses.who.substring(0, 50)}..."`;
        }
        
        return '';
    }
    
    generateFollowUpQuestions(question, context) {
        const followUps = [];
        
        if (question.type === 'diagnostic') {
            followUps.push({
                text: 'What evidence do you have that this is a real problem?',
                scoringCriteria: ['evidence', 'validation']
            });
        } else if (question.type === 'quantification') {
            followUps.push({
                text: 'How did you calculate or estimate these numbers?',
                scoringCriteria: ['methodology', 'credibility']
            });
        }
        
        return followUps;
    }
    
    reduceDifficulty() {
        console.log('📉 Reducing worksheet difficulty');
        // Simplify remaining questions
        if (this.currentWorksheet) {
            this.currentWorksheet.questions.forEach(q => {
                if (!this.responseHistory.find(r => r.questionId === q.id)) {
                    // Only modify unanswered questions
                    if (q.difficulty === 'expert') q.difficulty = 'advanced';
                    else if (q.difficulty === 'advanced') q.difficulty = 'intermediate';
                    else if (q.difficulty === 'intermediate') q.difficulty = 'beginner';
                    
                    // Reduce validation requirements
                    if (q.validation && q.validation.minLength) {
                        q.validation.minLength = Math.round(q.validation.minLength * 0.7);
                    }
                }
            });
        }
    }
    
    increaseDifficulty() {
        console.log('📈 Increasing worksheet difficulty');
        // Add more challenging questions
        if (this.currentWorksheet) {
            // Could add expert-level questions or increase requirements
            // For now, just log the intent
            this.currentWorksheet.adaptiveFeatures.difficultyIncreased = true;
        }
    }
}

// Export for use in the platform
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DynamicWorksheetGenerator;
}

// Make available globally in browser
if (typeof window !== 'undefined') {
    window.DynamicWorksheetGenerator = DynamicWorksheetGenerator;
}

console.log('✅ Dynamic Worksheet Generator loaded - ready to create adaptive worksheets!');
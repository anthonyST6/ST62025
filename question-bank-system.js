// ScaleOps6 Question Bank System
// Centralized repository for all questions with learning capabilities

class QuestionBankSystem {
    constructor() {
        this.questionBank = new Map();
        this.responsePatterns = new Map();
        this.successfulPaths = [];
        this.questionEffectiveness = new Map();
        this.industryTemplates = new Map();
        this.initialized = false;
        
        this.initialize();
    }
    
    /**
     * Initialize the question bank with base questions
     */
    async initialize() {
        console.log('🏦 Initializing Question Bank System...');
        
        // Initialize base question categories
        this.initializeBaseQuestions();
        
        // Initialize industry-specific templates
        this.initializeIndustryTemplates();
        
        // Load any saved patterns
        await this.loadSavedPatterns();
        
        this.initialized = true;
        console.log('✅ Question Bank System ready');
    }
    
    /**
     * Initialize base questions for all subcomponents
     */
    initializeBaseQuestions() {
        // Problem Statement Questions (1a)
        this.addQuestionSet('1a', 'problem-statement', {
            core: [
                {
                    id: 'ps-core-1',
                    text: 'What specific problem are you solving?',
                    type: 'diagnostic',
                    weight: 2,
                    scoringDimensions: ['clarity', 'specificity', 'relevance'],
                    variations: [
                        'Describe the primary problem your solution addresses',
                        'What is the #1 pain point for your customers?',
                        'Define the core problem in one sentence'
                    ]
                },
                {
                    id: 'ps-core-2',
                    text: 'Who experiences this problem most acutely?',
                    type: 'diagnostic',
                    weight: 1.5,
                    scoringDimensions: ['persona_clarity', 'segmentation'],
                    variations: [
                        'Describe your ideal customer profile',
                        'Which segment feels this pain the most?',
                        'Who is desperately seeking a solution?'
                    ]
                }
            ],
            validation: [
                {
                    id: 'ps-val-1',
                    text: 'How many customers have validated this problem?',
                    type: 'validation',
                    inputType: 'number',
                    scoringDimensions: ['evidence', 'validation_strength']
                },
                {
                    id: 'ps-val-2',
                    text: 'Share direct customer quotes about this problem',
                    type: 'validation',
                    scoringDimensions: ['authenticity', 'evidence']
                }
            ],
            quantification: [
                {
                    id: 'ps-quant-1',
                    text: 'What is the financial impact of this problem?',
                    type: 'quantification',
                    scoringDimensions: ['roi', 'market_size']
                },
                {
                    id: 'ps-quant-2',
                    text: 'How much time does this problem waste?',
                    type: 'quantification',
                    scoringDimensions: ['efficiency', 'urgency']
                }
            ]
        });
        
        // Mission Statement Questions (1b)
        this.addQuestionSet('1b', 'mission-statement', {
            core: [
                {
                    id: 'ms-core-1',
                    text: 'What is your company\'s mission?',
                    type: 'diagnostic',
                    weight: 2,
                    scoringDimensions: ['clarity', 'inspiration', 'alignment']
                },
                {
                    id: 'ms-core-2',
                    text: 'What future are you creating?',
                    type: 'exploratory',
                    weight: 1.5,
                    scoringDimensions: ['vision', 'ambition', 'feasibility']
                }
            ],
            strategic: [
                {
                    id: 'ms-strat-1',
                    text: 'How does your mission create competitive advantage?',
                    type: 'strategic',
                    scoringDimensions: ['differentiation', 'moat']
                }
            ]
        });
        
        // Customer Voice Questions (1c)
        this.addQuestionSet('1c', 'customer-voice', {
            core: [
                {
                    id: 'cv-core-1',
                    text: 'What exact words do customers use to describe their problem?',
                    type: 'validation',
                    weight: 2,
                    scoringDimensions: ['authenticity', 'customer_language']
                },
                {
                    id: 'cv-core-2',
                    text: 'What outcomes are customers trying to achieve?',
                    type: 'exploratory',
                    scoringDimensions: ['jobs_to_be_done', 'outcome_focus']
                }
            ]
        });
        
        // Add questions for other subcomponents following the same pattern
        // This is a subset - you would add all 96 subcomponents
        
        // Strategic Prioritization (3a-3f)
        this.addQuestionSet('3a', 'opportunity-assessment', {
            core: [
                {
                    id: 'oa-core-1',
                    text: 'What is the size of this opportunity?',
                    type: 'quantification',
                    scoringDimensions: ['tam', 'sam', 'som']
                }
            ]
        });
        
        // Early Adopter Wins (5a-5f)
        this.addQuestionSet('5a', 'champion-identification', {
            core: [
                {
                    id: 'ci-core-1',
                    text: 'Who are your product champions?',
                    type: 'diagnostic',
                    scoringDimensions: ['advocate_identification', 'influence']
                }
            ]
        });
        
        // Sales Enablement (10a-10f)
        this.addQuestionSet('10a', 'sales-assets', {
            core: [
                {
                    id: 'sa-core-1',
                    text: 'What sales materials have the highest conversion rate?',
                    type: 'validation',
                    scoringDimensions: ['effectiveness', 'roi']
                }
            ]
        });
    }
    
    /**
     * Initialize industry-specific question templates
     */
    initializeIndustryTemplates() {
        // B2B SaaS Templates
        this.industryTemplates.set('b2b-saas', {
            problemStatement: {
                additional: [
                    {
                        text: 'How does this problem affect your customer\'s tech stack?',
                        type: 'diagnostic',
                        scoringDimensions: ['integration', 'technical_depth']
                    },
                    {
                        text: 'What is the impact on MRR/ARR?',
                        type: 'quantification',
                        scoringDimensions: ['revenue_impact', 'growth']
                    }
                ]
            },
            metrics: {
                focus: ['MRR', 'CAC', 'LTV', 'Churn', 'NPS', 'Usage']
            }
        });
        
        // Enterprise Templates
        this.industryTemplates.set('enterprise', {
            problemStatement: {
                additional: [
                    {
                        text: 'How does this align with enterprise compliance requirements?',
                        type: 'strategic',
                        scoringDimensions: ['compliance', 'security']
                    },
                    {
                        text: 'What is the TCO impact?',
                        type: 'quantification',
                        scoringDimensions: ['tco', 'roi']
                    }
                ]
            },
            metrics: {
                focus: ['TCO', 'ROI', 'Implementation Time', 'Security Score']
            }
        });
        
        // Consumer Templates
        this.industryTemplates.set('consumer', {
            problemStatement: {
                additional: [
                    {
                        text: 'How does this improve the user experience?',
                        type: 'exploratory',
                        scoringDimensions: ['ux', 'delight']
                    },
                    {
                        text: 'What drives viral growth?',
                        type: 'strategic',
                        scoringDimensions: ['virality', 'network_effects']
                    }
                ]
            },
            metrics: {
                focus: ['DAU', 'Retention', 'Viral Coefficient', 'LTV']
            }
        });
        
        // Marketplace Templates
        this.industryTemplates.set('marketplace', {
            problemStatement: {
                additional: [
                    {
                        text: 'How do you solve the chicken-and-egg problem?',
                        type: 'strategic',
                        scoringDimensions: ['liquidity', 'two_sided']
                    },
                    {
                        text: 'What creates supply/demand balance?',
                        type: 'diagnostic',
                        scoringDimensions: ['marketplace_dynamics']
                    }
                ]
            },
            metrics: {
                focus: ['GMV', 'Take Rate', 'Liquidity', 'Match Rate']
            }
        });
    }
    
    /**
     * Add a question set to the bank
     */
    addQuestionSet(subcomponentId, name, questions) {
        if (!this.questionBank.has(subcomponentId)) {
            this.questionBank.set(subcomponentId, {
                name: name,
                questions: new Map(),
                usage: 0,
                effectiveness: 0
            });
        }
        
        const bank = this.questionBank.get(subcomponentId);
        
        // Add questions by category
        Object.entries(questions).forEach(([category, questionList]) => {
            if (!bank.questions.has(category)) {
                bank.questions.set(category, []);
            }
            bank.questions.get(category).push(...questionList);
        });
    }
    
    /**
     * Get questions for a specific subcomponent
     */
    async getQuestions(subcomponentId, options = {}) {
        const {
            category = 'all',
            difficulty = 'intermediate',
            industry = null,
            count = 6,
            excludeIds = [],
            userContext = {}
        } = options;
        
        console.log(`📚 Fetching questions for ${subcomponentId}...`);
        
        // Get base questions
        const baseQuestions = this.getBaseQuestions(subcomponentId, category);
        
        // Add industry-specific questions if applicable
        const industryQuestions = industry ? 
            this.getIndustryQuestions(subcomponentId, industry) : [];
        
        // Get learned/effective questions
        const learnedQuestions = await this.getLearnedQuestions(subcomponentId);
        
        // Combine all questions
        let allQuestions = [
            ...baseQuestions,
            ...industryQuestions,
            ...learnedQuestions
        ];
        
        // Filter out excluded questions
        allQuestions = allQuestions.filter(q => !excludeIds.includes(q.id));
        
        // Rank and select questions
        const rankedQuestions = this.rankQuestions(allQuestions, userContext);
        
        // Adjust for difficulty
        const adjustedQuestions = this.adjustForDifficulty(rankedQuestions, difficulty);
        
        // Return requested count
        return adjustedQuestions.slice(0, count);
    }
    
    /**
     * Get base questions for a subcomponent
     */
    getBaseQuestions(subcomponentId, category) {
        const bank = this.questionBank.get(subcomponentId);
        if (!bank) return [];
        
        if (category === 'all') {
            const allQuestions = [];
            bank.questions.forEach(categoryQuestions => {
                allQuestions.push(...categoryQuestions);
            });
            return allQuestions;
        }
        
        return bank.questions.get(category) || [];
    }
    
    /**
     * Get industry-specific questions
     */
    getIndustryQuestions(subcomponentId, industry) {
        const template = this.industryTemplates.get(industry.toLowerCase());
        if (!template) return [];
        
        // Map subcomponent to template category
        const categoryMap = {
            '1a': 'problemStatement',
            '1b': 'mission',
            '1c': 'customerVoice',
            // Add more mappings
        };
        
        const category = categoryMap[subcomponentId];
        if (!category || !template[category]) return [];
        
        return template[category].additional || [];
    }
    
    /**
     * Get learned questions based on effectiveness
     */
    async getLearnedQuestions(subcomponentId) {
        const learned = [];
        
        // Get successful question patterns for this subcomponent
        const patterns = this.successfulPaths.filter(
            path => path.subcomponentId === subcomponentId && path.score > 80
        );
        
        // Extract effective questions
        patterns.forEach(path => {
            path.sequence.forEach(questionId => {
                const effectiveness = this.questionEffectiveness.get(questionId);
                if (effectiveness && effectiveness.score > 75) {
                    // Create variation of effective question
                    const variation = this.createQuestionVariation(questionId);
                    if (variation) {
                        learned.push(variation);
                    }
                }
            });
        });
        
        return learned;
    }
    
    /**
     * Rank questions based on various factors
     */
    rankQuestions(questions, userContext) {
        return questions.map(question => {
            let rank = 0;
            
            // Base weight
            rank += (question.weight || 1) * 10;
            
            // Effectiveness score
            const effectiveness = this.questionEffectiveness.get(question.id);
            if (effectiveness) {
                rank += effectiveness.score * 0.5;
            }
            
            // Relevance to user context
            if (userContext.focusAreas) {
                const relevance = this.calculateRelevance(question, userContext.focusAreas);
                rank += relevance * 20;
            }
            
            // Novelty (hasn't been asked recently)
            if (userContext.previousQuestions && 
                !userContext.previousQuestions.includes(question.id)) {
                rank += 10;
            }
            
            // Coverage of scoring dimensions
            if (question.scoringDimensions) {
                rank += question.scoringDimensions.length * 5;
            }
            
            return {
                ...question,
                rank: rank
            };
        }).sort((a, b) => b.rank - a.rank);
    }
    
    /**
     * Calculate question relevance to focus areas
     */
    calculateRelevance(question, focusAreas) {
        if (!question.scoringDimensions) return 0;
        
        let relevance = 0;
        question.scoringDimensions.forEach(dimension => {
            if (focusAreas.includes(dimension)) {
                relevance += 1;
            }
        });
        
        return relevance / question.scoringDimensions.length;
    }
    
    /**
     * Adjust questions for difficulty level
     */
    adjustForDifficulty(questions, difficulty) {
        const difficultyModifiers = {
            beginner: {
                minLength: 0.7,
                complexity: 0.6,
                helpText: true,
                examples: true
            },
            intermediate: {
                minLength: 1.0,
                complexity: 1.0,
                helpText: true,
                examples: false
            },
            advanced: {
                minLength: 1.3,
                complexity: 1.3,
                helpText: false,
                examples: false
            },
            expert: {
                minLength: 1.5,
                complexity: 1.5,
                helpText: false,
                examples: false
            }
        };
        
        const modifier = difficultyModifiers[difficulty] || difficultyModifiers.intermediate;
        
        return questions.map(question => {
            const adjusted = { ...question };
            
            // Adjust validation requirements
            if (adjusted.validation && adjusted.validation.minLength) {
                adjusted.validation.minLength = Math.round(
                    adjusted.validation.minLength * modifier.minLength
                );
            }
            
            // Add or remove help text
            if (modifier.helpText && !adjusted.helpText) {
                adjusted.helpText = this.generateHelpText(question);
            } else if (!modifier.helpText) {
                delete adjusted.helpText;
            }
            
            // Add or remove examples
            if (modifier.examples && !adjusted.examples) {
                adjusted.examples = this.generateExamples(question);
            } else if (!modifier.examples) {
                delete adjusted.examples;
            }
            
            // Adjust question complexity
            if (modifier.complexity < 1) {
                adjusted.text = this.simplifyQuestion(question.text);
            } else if (modifier.complexity > 1) {
                adjusted.text = this.complexifyQuestion(question.text);
            }
            
            adjusted.difficulty = difficulty;
            
            return adjusted;
        });
    }
    
    /**
     * Record a successful question path
     */
    recordSuccessfulPath(subcomponentId, questionSequence, responses, finalScore) {
        if (finalScore > 75) {
            const path = {
                id: `path_${Date.now()}`,
                subcomponentId: subcomponentId,
                sequence: questionSequence,
                responses: responses,
                score: finalScore,
                timestamp: new Date().toISOString()
            };
            
            this.successfulPaths.push(path);
            
            // Update question effectiveness
            questionSequence.forEach((questionId, index) => {
                this.updateQuestionEffectiveness(
                    questionId,
                    responses[index],
                    finalScore
                );
            });
            
            // Learn patterns
            this.learnResponsePatterns(path);
            
            console.log(`✅ Recorded successful path with score ${finalScore}`);
        }
    }
    
    /**
     * Update question effectiveness based on outcomes
     */
    updateQuestionEffectiveness(questionId, response, finalScore) {
        if (!this.questionEffectiveness.has(questionId)) {
            this.questionEffectiveness.set(questionId, {
                totalUses: 0,
                totalScore: 0,
                averageScore: 0,
                successRate: 0,
                responseQuality: []
            });
        }
        
        const effectiveness = this.questionEffectiveness.get(questionId);
        
        effectiveness.totalUses++;
        effectiveness.totalScore += finalScore;
        effectiveness.averageScore = effectiveness.totalScore / effectiveness.totalUses;
        
        // Calculate response quality
        const quality = this.assessResponseQuality(response);
        effectiveness.responseQuality.push(quality);
        
        // Calculate success rate (scores > 75)
        const successfulUses = effectiveness.responseQuality.filter(q => q > 75).length;
        effectiveness.successRate = (successfulUses / effectiveness.totalUses) * 100;
        
        // Overall effectiveness score
        effectiveness.score = (effectiveness.averageScore * 0.6) + 
                            (effectiveness.successRate * 0.4);
    }
    
    /**
     * Learn from response patterns
     */
    learnResponsePatterns(path) {
        const pattern = {
            subcomponentId: path.subcomponentId,
            score: path.score,
            patterns: []
        };
        
        // Analyze each response for patterns
        path.responses.forEach((response, index) => {
            const questionId = path.sequence[index];
            
            // Extract patterns
            const responsePatterns = {
                length: response.length,
                hasMetrics: /\d+/.test(response),
                hasSpecifics: /specifically|exactly|precisely/.test(response.toLowerCase()),
                hasCurrency: /\$|€|£/.test(response),
                hasPercentage: /%/.test(response),
                sentenceCount: response.split(/[.!?]+/).filter(s => s.trim().length > 0).length
            };
            
            pattern.patterns.push({
                questionId: questionId,
                patterns: responsePatterns
            });
        });
        
        // Store pattern
        const key = `${path.subcomponentId}_${Math.floor(path.score / 10) * 10}`;
        if (!this.responsePatterns.has(key)) {
            this.responsePatterns.set(key, []);
        }
        this.responsePatterns.get(key).push(pattern);
    }
    
    /**
     * Create a variation of an effective question
     */
    createQuestionVariation(questionId) {
        // Find the original question
        let originalQuestion = null;
        
        this.questionBank.forEach(bank => {
            bank.questions.forEach(categoryQuestions => {
                const found = categoryQuestions.find(q => q.id === questionId);
                if (found) {
                    originalQuestion = found;
                }
            });
        });
        
        if (!originalQuestion) return null;
        
        // Create variation
        const variation = { ...originalQuestion };
        variation.id = `${questionId}_var_${Date.now()}`;
        
        // Use a variation if available
        if (originalQuestion.variations && originalQuestion.variations.length > 0) {
            const varIndex = Math.floor(Math.random() * originalQuestion.variations.length);
            variation.text = originalQuestion.variations[varIndex];
        } else {
            // Create a slight variation
            variation.text = this.createTextVariation(originalQuestion.text);
        }
        
        variation.isVariation = true;
        variation.originalId = questionId;
        
        return variation;
    }
    
    /**
     * Create a text variation of a question
     */
    createTextVariation(text) {
        const variations = [
            text,
            `Can you ${text.toLowerCase()}`,
            `Please ${text.toLowerCase()}`,
            `Help us understand: ${text}`,
            text.replace('What', 'Describe what'),
            text.replace('How', 'Explain how'),
            text.replace('?', ' in detail?')
        ];
        
        return variations[Math.floor(Math.random() * variations.length)];
    }
    
    /**
     * Assess the quality of a response
     */
    assessResponseQuality(response) {
        let quality = 50; // Base score
        
        // Length factor
        if (response.length > 500) quality += 20;
        else if (response.length > 200) quality += 10;
        else if (response.length < 50) quality -= 10;
        
        // Specificity factors
        if (/\d+/.test(response)) quality += 10; // Has numbers
        if (/%/.test(response)) quality += 5; // Has percentages
        if (/\$|€|£/.test(response)) quality += 5; // Has currency
        
        // Structure factors
        const sentences = response.split(/[.!?]+/).filter(s => s.trim().length > 0);
        if (sentences.length > 5) quality += 10;
        else if (sentences.length > 3) quality += 5;
        
        // Keywords indicating depth
        const depthKeywords = ['because', 'therefore', 'specifically', 'for example', 'such as'];
        depthKeywords.forEach(keyword => {
            if (response.toLowerCase().includes(keyword)) {
                quality += 3;
            }
        });
        
        return Math.min(100, Math.max(0, quality));
    }
    
    /**
     * Generate help text for a question
     */
    generateHelpText(question) {
        const helpTemplates = {
            diagnostic: 'Be specific and provide concrete examples',
            exploratory: 'Think broadly and consider multiple angles',
            validation: 'Use real data and customer feedback',
            quantification: 'Include numbers, metrics, and calculations',
            strategic: 'Consider long-term implications and competitive dynamics'
        };
        
        return helpTemplates[question.type] || 'Provide as much detail as possible';
    }
    
    /**
     * Generate examples for a question
     */
    generateExamples(question) {
        const exampleTemplates = {
            diagnostic: ['Example: "Our customers struggle with X when trying to Y"'],
            validation: ['Example: "We interviewed 50 customers and 80% confirmed..."'],
            quantification: ['Example: "This costs $10K per month across 100 customers"'],
            strategic: ['Example: "This positions us uniquely because..."']
        };
        
        return exampleTemplates[question.type] || ['Provide specific, relevant examples'];
    }
    
    /**
     * Simplify a question for lower difficulty
     */
    simplifyQuestion(text) {
        // Simple replacements to make questions easier
        return text
            .replace('analyze', 'describe')
            .replace('evaluate', 'explain')
            .replace('synthesize', 'summarize')
            .replace('comprehensive', 'basic')
            .replace('in detail', 'briefly');
    }
    
    /**
     * Make a question more complex for higher difficulty
     */
    complexifyQuestion(text) {
        // Add complexity to questions
        if (!text.includes('analyze') && !text.includes('evaluate')) {
            return `Analyze and ${text.toLowerCase()}`;
        }
        if (!text.includes('implications')) {
            return text.replace('?', ' and what are the implications?');
        }
        return text;
    }
    
    /**
     * Load saved patterns from storage
     */
    async loadSavedPatterns() {
        // In a real implementation, this would load from a database
        // For now, we'll just initialize with some default patterns
        console.log('📂 Loading saved patterns...');
        
        // Simulate loading successful patterns
        this.successfulPaths = [];
        this.questionEffectiveness = new Map();
        
        return true;
    }
    
    /**
     * Save current patterns to storage
     */
    async savePatterns() {
        // In a real implementation, this would save to a database
        console.log('💾 Saving patterns...');
        
        const data = {
            successfulPaths: this.successfulPaths,
            questionEffectiveness: Array.from(this.questionEffectiveness.entries()),
            responsePatterns: Array.from(this.responsePatterns.entries()),
            timestamp: new Date().toISOString()
        };
        
        // Would save to database here
        console.log(`✅ Saved ${this.successfulPaths.length} paths and ${this.questionEffectiveness.size} effectiveness scores`);
        
        return true;
    }
    
    /**
     * Get question statistics
     */
    getStatistics() {
        const stats = {
            totalQuestions: 0,
            totalSubcomponents: this.questionBank.size,
            effectiveQuestions: 0,
            successfulPaths: this.successfulPaths.length,
            averageEffectiveness: 0
        };
        
        // Count total questions
        this.questionBank.forEach(bank => {
            bank.questions.forEach(categoryQuestions => {
                stats.totalQuestions += categoryQuestions.length;
            });
        });
        
        // Calculate effectiveness stats
        let totalEffectiveness = 0;
        this.questionEffectiveness.forEach(effectiveness => {
            if (effectiveness.score > 75) {
                stats.effectiveQuestions++;
            }
            totalEffectiveness += effectiveness.score || 0;
        });
        
        if (this.questionEffectiveness.size > 0) {
            stats.averageEffectiveness = totalEffectiveness / this.questionEffectiveness.size;
        }
        
        return stats;
    }
}

// Export for use in the platform
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuestionBankSystem;
}

// Make available globally in browser
if (typeof window !== 'undefined') {
    window.QuestionBankSystem = QuestionBankSystem;
}

console.log('✅ Question Bank System loaded - ready to manage dynamic questions!');
// Enhanced Problem Statement Agent with Dynamic Question Generation
// This integrates the existing agent with the new dynamic worksheet system

class EnhancedProblemStatementAgent {
    constructor() {
        // Initialize base agent capabilities
        this.name = "Enhanced Problem Statement Expert with Dynamic Questions";
        this.version = "3.0.0";
        this.subcomponentId = "1a";
        
        // Initialize dynamic components
        this.worksheetGenerator = null;
        this.questionBank = null;
        this.scoringEngine = null;
        this.baseAgent = null;
        
        // Learning state
        this.sessionHistory = [];
        this.adaptationLog = [];
        
        this.initialize();
    }
    
    async initialize() {
        console.log('🚀 Initializing Enhanced Problem Statement Agent...');
        
        // Load the base agent if available
        if (typeof ProblemStatementAgentEnhanced !== 'undefined') {
            this.baseAgent = new ProblemStatementAgentEnhanced();
        }
        
        // Initialize question bank
        if (typeof QuestionBankSystem !== 'undefined') {
            this.questionBank = new QuestionBankSystem();
        }
        
        // Initialize worksheet generator
        if (typeof DynamicWorksheetGenerator !== 'undefined') {
            this.worksheetGenerator = new DynamicWorksheetGenerator(
                this.subcomponentId,
                this,
                this.scoringEngine
            );
        }
        
        // Initialize scoring engine
        if (typeof ScoringEngine !== 'undefined') {
            this.scoringEngine = new ScoringEngine();
        }
        
        console.log('✅ Enhanced Problem Statement Agent ready');
    }
    
    /**
     * Generate a dynamic worksheet for problem statement
     */
    async generateDynamicWorksheet(userContext = {}) {
        console.log('📝 Generating dynamic problem statement worksheet...');
        
        // Enhance user context with problem statement specific info
        const enhancedContext = {
            ...userContext,
            subcomponent: 'problem-statement',
            focusAreas: this.identifyFocusAreas(userContext),
            industry: userContext.industry || this.detectIndustry(userContext),
            companyStage: userContext.companyStage || this.detectStage(userContext)
        };
        
        // Get previous responses if any
        const previousResponses = await this.getPreviousResponses(userContext.userId);
        
        // Generate the worksheet
        if (this.worksheetGenerator) {
            return await this.worksheetGenerator.generateDynamicWorksheet(
                enhancedContext,
                previousResponses
            );
        }
        
        // Fallback to static questions if generator not available
        return this.generateStaticWorksheet();
    }
    
    /**
     * Identify focus areas based on user context
     */
    identifyFocusAreas(userContext) {
        const focusAreas = [];
        
        // Analyze previous scores to identify weak areas
        if (userContext.previousScores) {
            const scores = userContext.previousScores;
            if (scores.problemClarity < 60) focusAreas.push('clarity');
            if (scores.marketUnderstanding < 60) focusAreas.push('market');
            if (scores.customerEmpathy < 60) focusAreas.push('customer');
            if (scores.valueQuantification < 60) focusAreas.push('quantification');
            if (scores.solutionDifferentiation < 60) focusAreas.push('differentiation');
        }
        
        // Add stage-specific focus areas
        if (userContext.companyStage === 'pre-seed' || userContext.companyStage === 'idea') {
            focusAreas.push('validation', 'exploration');
        } else if (userContext.companyStage === 'seed') {
            focusAreas.push('quantification', 'evidence');
        } else if (userContext.companyStage === 'series-a' || userContext.companyStage === 'growth') {
            focusAreas.push('scalability', 'metrics', 'competitive');
        }
        
        // Add industry-specific focus areas
        if (userContext.industry === 'b2b-saas') {
            focusAreas.push('integration', 'roi', 'churn');
        } else if (userContext.industry === 'enterprise') {
            focusAreas.push('compliance', 'security', 'tco');
        } else if (userContext.industry === 'consumer') {
            focusAreas.push('ux', 'virality', 'retention');
        }
        
        return [...new Set(focusAreas)]; // Remove duplicates
    }
    
    /**
     * Detect industry from context clues
     */
    detectIndustry(userContext) {
        if (!userContext.description && !userContext.previousResponses) {
            return 'general';
        }
        
        const text = (userContext.description || '') + 
                    JSON.stringify(userContext.previousResponses || '');
        const lowerText = text.toLowerCase();
        
        if (lowerText.includes('saas') || lowerText.includes('subscription') || 
            lowerText.includes('mrr') || lowerText.includes('arr')) {
            return 'b2b-saas';
        }
        
        if (lowerText.includes('enterprise') || lowerText.includes('fortune 500') ||
            lowerText.includes('compliance') || lowerText.includes('security')) {
            return 'enterprise';
        }
        
        if (lowerText.includes('consumer') || lowerText.includes('b2c') ||
            lowerText.includes('users') || lowerText.includes('app')) {
            return 'consumer';
        }
        
        if (lowerText.includes('marketplace') || lowerText.includes('two-sided') ||
            lowerText.includes('buyers and sellers')) {
            return 'marketplace';
        }
        
        return 'general';
    }
    
    /**
     * Detect company stage from context
     */
    detectStage(userContext) {
        if (!userContext.description && !userContext.metrics) {
            return 'unknown';
        }
        
        // Check for stage indicators
        if (userContext.metrics) {
            if (userContext.metrics.revenue === 0 || userContext.metrics.customers === 0) {
                return 'pre-seed';
            }
            if (userContext.metrics.revenue < 1000000) {
                return 'seed';
            }
            if (userContext.metrics.revenue < 10000000) {
                return 'series-a';
            }
            return 'growth';
        }
        
        // Text-based detection
        const text = (userContext.description || '').toLowerCase();
        
        if (text.includes('idea') || text.includes('concept') || text.includes('pre-revenue')) {
            return 'idea';
        }
        if (text.includes('mvp') || text.includes('prototype') || text.includes('beta')) {
            return 'pre-seed';
        }
        if (text.includes('seed') || text.includes('early customers')) {
            return 'seed';
        }
        if (text.includes('series a') || text.includes('scaling')) {
            return 'series-a';
        }
        
        return 'unknown';
    }
    
    /**
     * Get previous responses for a user
     */
    async getPreviousResponses(userId) {
        // In a real implementation, this would fetch from database
        // For now, return from session history
        const userSessions = this.sessionHistory.filter(s => s.userId === userId);
        if (userSessions.length > 0) {
            return userSessions[userSessions.length - 1].responses;
        }
        return {};
    }
    
    /**
     * Process a worksheet response with dynamic adaptation
     */
    async processWorksheetResponse(worksheetId, responses, userContext = {}) {
        console.log('🔍 Processing worksheet responses...');
        
        // Store session
        this.sessionHistory.push({
            worksheetId: worksheetId,
            userId: userContext.userId,
            responses: responses,
            timestamp: new Date().toISOString()
        });
        
        // Analyze with base agent if available
        let analysis;
        if (this.baseAgent) {
            analysis = await this.baseAgent.analyzeWorksheet(responses);
        } else {
            analysis = await this.analyzeWorksheet(responses);
        }
        
        // Process each response for learning
        if (this.worksheetGenerator) {
            for (const [questionId, response] of Object.entries(responses)) {
                await this.worksheetGenerator.processResponse(questionId, response);
            }
        }
        
        // Record successful paths for learning
        if (this.questionBank && analysis.score > 75) {
            const questionSequence = Object.keys(responses);
            await this.questionBank.recordSuccessfulPath(
                this.subcomponentId,
                questionSequence,
                Object.values(responses),
                analysis.score
            );
        }
        
        // Generate enhanced recommendations
        const recommendations = await this.generateEnhancedRecommendations(
            analysis,
            responses,
            userContext
        );
        
        // Create comprehensive result
        const result = {
            ...analysis,
            recommendations: recommendations,
            adaptiveInsights: this.generateAdaptiveInsights(analysis, responses),
            nextSteps: this.generateNextSteps(analysis, userContext),
            learningNotes: this.getLearningNotes()
        };
        
        return result;
    }
    
    /**
     * Analyze worksheet responses (fallback if base agent not available)
     */
    async analyzeWorksheet(responses) {
        const analysis = {
            score: 0,
            confidence: 0.5,
            timestamp: new Date().toISOString(),
            analysis: {
                executiveSummary: '',
                strengthsAndWeaknesses: {},
                criticalGaps: [],
                opportunities: []
            },
            detailedScores: {}
        };
        
        // Basic scoring based on response quality
        let totalScore = 0;
        let dimensions = 0;
        
        Object.entries(responses).forEach(([field, response]) => {
            if (typeof response === 'string' && response.length > 0) {
                let fieldScore = 50; // Base score
                
                // Length bonus
                if (response.length > 200) fieldScore += 20;
                else if (response.length > 100) fieldScore += 10;
                
                // Specificity bonus
                if (/\d+/.test(response)) fieldScore += 10; // Has numbers
                if (/%/.test(response)) fieldScore += 5; // Has percentages
                if (/\$/.test(response)) fieldScore += 5; // Has currency
                
                // Structure bonus
                const sentences = response.split(/[.!?]+/).filter(s => s.trim().length > 0);
                if (sentences.length > 3) fieldScore += 10;
                
                totalScore += Math.min(100, fieldScore);
                dimensions++;
            }
        });
        
        analysis.score = dimensions > 0 ? Math.round(totalScore / dimensions) : 0;
        
        // Generate executive summary
        if (analysis.score >= 80) {
            analysis.analysis.executiveSummary = 'Strong problem statement with clear articulation and evidence.';
        } else if (analysis.score >= 60) {
            analysis.analysis.executiveSummary = 'Good foundation but needs more specificity and validation.';
        } else if (analysis.score >= 40) {
            analysis.analysis.executiveSummary = 'Basic understanding present but significant gaps in clarity and evidence.';
        } else {
            analysis.analysis.executiveSummary = 'Problem statement needs fundamental work across all dimensions.';
        }
        
        return analysis;
    }
    
    /**
     * Generate enhanced recommendations using dynamic insights
     */
    async generateEnhancedRecommendations(analysis, responses, userContext) {
        const recommendations = [];
        
        // Get question-specific recommendations
        if (this.worksheetGenerator && this.worksheetGenerator.currentWorksheet) {
            const worksheet = this.worksheetGenerator.currentWorksheet;
            
            worksheet.questions.forEach(question => {
                const response = responses[question.id];
                if (response) {
                    const quality = this.assessResponseQuality(response, question);
                    
                    if (quality < 60) {
                        recommendations.push({
                            priority: quality < 40 ? 'HIGH' : 'MEDIUM',
                            area: question.text,
                            issue: this.identifyResponseIssue(response, question),
                            action: this.generateImprovement(question, quality),
                            resources: this.getResourcesForQuestion(question)
                        });
                    }
                }
            });
        }
        
        // Add strategic recommendations based on patterns
        if (analysis.score < 70) {
            recommendations.push({
                priority: 'HIGH',
                area: 'Overall Problem Clarity',
                issue: 'Problem statement lacks the depth needed for effective GTM',
                action: 'Conduct structured customer discovery using the "5 Whys" framework',
                resources: ['Customer Interview Guide', 'Problem Validation Template']
            });
        }
        
        // Industry-specific recommendations
        if (userContext.industry === 'b2b-saas' && !this.hasMetrics(responses)) {
            recommendations.push({
                priority: 'HIGH',
                area: 'SaaS Metrics',
                issue: 'Missing critical SaaS metrics (MRR, CAC, LTV)',
                action: 'Quantify problem impact using SaaS-specific metrics',
                resources: ['SaaS Metrics Calculator', 'Unit Economics Template']
            });
        }
        
        return recommendations.slice(0, 5); // Top 5 recommendations
    }
    
    /**
     * Generate adaptive insights based on response patterns
     */
    generateAdaptiveInsights(analysis, responses) {
        const insights = {
            responsePatterns: [],
            strengthAreas: [],
            improvementAreas: [],
            adaptationSuggestions: []
        };
        
        // Analyze response patterns
        Object.entries(responses).forEach(([field, response]) => {
            if (typeof response === 'string') {
                const pattern = {
                    field: field,
                    length: response.length,
                    hasMetrics: /\d+/.test(response),
                    hasEvidence: response.includes('customer') || response.includes('user'),
                    quality: this.assessResponseQuality(response)
                };
                
                insights.responsePatterns.push(pattern);
                
                if (pattern.quality > 70) {
                    insights.strengthAreas.push(field);
                } else if (pattern.quality < 50) {
                    insights.improvementAreas.push(field);
                }
            }
        });
        
        // Generate adaptation suggestions
        if (insights.improvementAreas.length > insights.strengthAreas.length) {
            insights.adaptationSuggestions.push(
                'Consider starting with simpler, more focused questions',
                'Break down complex problems into smaller components'
            );
        }
        
        if (!insights.responsePatterns.some(p => p.hasMetrics)) {
            insights.adaptationSuggestions.push(
                'Focus next session on quantification and metrics',
                'Gather specific data points before proceeding'
            );
        }
        
        return insights;
    }
    
    /**
     * Generate next steps based on analysis
     */
    generateNextSteps(analysis, userContext) {
        const nextSteps = {
            immediate: [],
            shortTerm: [],
            longTerm: []
        };
        
        // Score-based next steps
        if (analysis.score < 50) {
            nextSteps.immediate.push(
                'Schedule customer discovery interviews',
                'Review successful problem statement examples',
                'Workshop with team to clarify problem'
            );
        } else if (analysis.score < 70) {
            nextSteps.immediate.push(
                'Validate problem with 10 more customers',
                'Quantify financial impact',
                'Document evidence and quotes'
            );
        } else {
            nextSteps.immediate.push(
                'Test problem statement with investors',
                'Create one-page problem summary',
                'Begin solution ideation'
            );
        }
        
        // Stage-specific next steps
        if (userContext.companyStage === 'pre-seed') {
            nextSteps.shortTerm.push(
                'Build MVP to test problem hypothesis',
                'Identify early adopters',
                'Create problem-solution fit metrics'
            );
        } else if (userContext.companyStage === 'seed') {
            nextSteps.shortTerm.push(
                'Scale customer discovery',
                'Segment problem by customer type',
                'Build ROI model'
            );
        }
        
        // Long-term steps
        nextSteps.longTerm.push(
            'Establish continuous problem validation process',
            'Build problem evolution tracking',
            'Create competitive problem analysis'
        );
        
        return nextSteps;
    }
    
    /**
     * Get learning notes from the session
     */
    getLearningNotes() {
        const notes = [];
        
        if (this.worksheetGenerator && this.worksheetGenerator.adaptationLog.length > 0) {
            this.worksheetGenerator.adaptationLog.forEach(adaptation => {
                notes.push({
                    type: 'adaptation',
                    reason: adaptation.adaptation.reason,
                    timestamp: adaptation.timestamp
                });
            });
        }
        
        if (this.questionBank) {
            const stats = this.questionBank.getStatistics();
            notes.push({
                type: 'statistics',
                totalQuestions: stats.totalQuestions,
                effectiveQuestions: stats.effectiveQuestions,
                successfulPaths: stats.successfulPaths
            });
        }
        
        return notes;
    }
    
    /**
     * Helper methods
     */
    
    assessResponseQuality(response, question = null) {
        let quality = 50; // Base score
        
        // Length assessment
        const minLength = question?.validation?.minLength || 50;
        if (response.length >= minLength * 2) quality += 20;
        else if (response.length >= minLength) quality += 10;
        else quality -= 10;
        
        // Content assessment
        if (/\d+/.test(response)) quality += 10; // Has numbers
        if (/%/.test(response)) quality += 5; // Has percentages
        if (/\$|€|£/.test(response)) quality += 5; // Has currency
        
        // Structure assessment
        const sentences = response.split(/[.!?]+/).filter(s => s.trim().length > 0);
        if (sentences.length > 5) quality += 10;
        else if (sentences.length > 3) quality += 5;
        
        // Specificity assessment
        const specificityKeywords = ['specifically', 'exactly', 'precisely', 'particular'];
        specificityKeywords.forEach(keyword => {
            if (response.toLowerCase().includes(keyword)) quality += 3;
        });
        
        return Math.min(100, Math.max(0, quality));
    }
    
    identifyResponseIssue(response, question) {
        const issues = [];
        
        if (response.length < (question.validation?.minLength || 50)) {
            issues.push('Response too brief');
        }
        
        if (!/\d+/.test(response) && question.type === 'quantification') {
            issues.push('Missing quantification');
        }
        
        if (!response.includes('customer') && !response.includes('user')) {
            issues.push('Lacks customer perspective');
        }
        
        const sentences = response.split(/[.!?]+/).filter(s => s.trim().length > 0);
        if (sentences.length < 2) {
            issues.push('Needs more detail');
        }
        
        return issues.join('; ') || 'General improvement needed';
    }
    
    generateImprovement(question, quality) {
        if (quality < 30) {
            return `Completely rework response to "${question.text}" with specific examples and data`;
        } else if (quality < 50) {
            return `Expand response with more detail, focusing on ${question.scoringDimensions?.join(', ') || 'clarity'}`;
        } else {
            return `Refine response by adding validation evidence or metrics`;
        }
    }
    
    getResourcesForQuestion(question) {
        const resourceMap = {
            'diagnostic': ['Problem Definition Template', '5 Whys Framework'],
            'validation': ['Customer Interview Guide', 'Survey Templates'],
            'quantification': ['ROI Calculator', 'Market Sizing Guide'],
            'exploratory': ['Discovery Question Bank', 'Hypothesis Testing Framework'],
            'strategic': ['Competitive Analysis Template', 'Strategy Canvas']
        };
        
        return resourceMap[question.type] || ['Best Practices Guide'];
    }
    
    hasMetrics(responses) {
        return Object.values(responses).some(response => 
            typeof response === 'string' && /\d+/.test(response)
        );
    }
    
    /**
     * Generate a static worksheet as fallback
     */
    generateStaticWorksheet() {
        return {
            id: `static_worksheet_${Date.now()}`,
            subcomponentId: this.subcomponentId,
            questions: [
                {
                    id: 'q1',
                    text: 'What specific problem are you solving?',
                    type: 'diagnostic',
                    required: true,
                    validation: { minLength: 100 }
                },
                {
                    id: 'q2',
                    text: 'Who experiences this problem most acutely?',
                    type: 'diagnostic',
                    required: true,
                    validation: { minLength: 50 }
                },
                {
                    id: 'q3',
                    text: 'How many customers have validated this problem?',
                    type: 'validation',
                    required: true,
                    inputType: 'number'
                },
                {
                    id: 'q4',
                    text: 'What is the financial impact of this problem?',
                    type: 'quantification',
                    required: true,
                    validation: { minLength: 50 }
                },
                {
                    id: 'q5',
                    text: 'How are customers currently solving this problem?',
                    type: 'exploratory',
                    required: true,
                    validation: { minLength: 100 }
                },
                {
                    id: 'q6',
                    text: 'What evidence do you have that this problem is worth solving?',
                    type: 'validation',
                    required: true,
                    validation: { minLength: 100 }
                }
            ]
        };
    }
}

// Export for use in the platform
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EnhancedProblemStatementAgent;
}

// Make available globally in browser
if (typeof window !== 'undefined') {
    window.EnhancedProblemStatementAgent = EnhancedProblemStatementAgent;
}

console.log('✅ Enhanced Problem Statement Agent loaded - ready for dynamic worksheets!');
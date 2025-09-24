// Learning System for Dynamic Worksheet Generation
// Tracks patterns, learns from interactions, and improves over time

class LearningSystem {
    constructor() {
        this.name = "Adaptive Learning System";
        this.version = "1.0.0";
        
        // Learning data structures
        this.patternDatabase = new Map();
        this.successfulPaths = [];
        this.questionEffectiveness = new Map();
        this.userProfiles = new Map();
        this.industryPatterns = new Map();
        
        // Learning parameters
        this.learningRate = 0.1;
        this.decayRate = 0.05;
        this.confidenceThreshold = 0.7;
        this.minSampleSize = 5;
        
        // Pattern recognition
        this.patternRecognizer = new PatternRecognizer();
        
        // Effectiveness tracker
        this.effectivenessTracker = new EffectivenessTracker();
        
        // Recommendation engine
        this.recommendationEngine = new RecommendationEngine();
        
        // Analytics
        this.analytics = {
            totalSessions: 0,
            successfulSessions: 0,
            patternsIdentified: 0,
            improvementRate: 0,
            averageScoreIncrease: 0
        };
        
        this.initialize();
    }
    
    async initialize() {
        console.log('🧠 Initializing Learning System...');
        
        // Load historical data if available
        await this.loadHistoricalData();
        
        // Initialize pattern templates
        this.initializePatternTemplates();
        
        // Start learning cycle
        this.startLearningCycle();
        
        console.log('✅ Learning System ready');
    }
    
    /**
     * Record a learning event from a worksheet session
     */
    async recordLearningEvent(event) {
        console.log('📝 Recording learning event...');
        
        const learningData = {
            sessionId: event.sessionId,
            timestamp: new Date().toISOString(),
            subcomponentId: event.subcomponentId,
            userContext: event.userContext,
            questions: event.questions,
            responses: event.responses,
            scores: event.scores,
            adaptations: event.adaptations || [],
            outcome: event.outcome
        };
        
        // Update pattern database
        await this.updatePatterns(learningData);
        
        // Track question effectiveness
        await this.trackQuestionEffectiveness(learningData);
        
        // Update user profile
        await this.updateUserProfile(learningData);
        
        // Identify industry patterns
        await this.identifyIndustryPatterns(learningData);
        
        // Update analytics
        this.updateAnalytics(learningData);
        
        // Generate insights
        const insights = await this.generateInsights(learningData);
        
        return {
            recorded: true,
            insights: insights,
            recommendations: await this.generateRecommendations(learningData)
        };
    }
    
    /**
     * Update pattern database with new learning data
     */
    async updatePatterns(learningData) {
        const pattern = this.patternRecognizer.extractPattern(learningData);
        
        if (pattern) {
            const patternKey = this.generatePatternKey(pattern);
            
            if (!this.patternDatabase.has(patternKey)) {
                this.patternDatabase.set(patternKey, {
                    pattern: pattern,
                    occurrences: 0,
                    successRate: 0,
                    averageScore: 0,
                    contexts: [],
                    insights: []
                });
            }
            
            const patternData = this.patternDatabase.get(patternKey);
            
            // Update pattern statistics
            patternData.occurrences++;
            patternData.successRate = this.updateSuccessRate(
                patternData.successRate,
                learningData.outcome.success,
                patternData.occurrences
            );
            patternData.averageScore = this.updateAverageScore(
                patternData.averageScore,
                learningData.scores.final,
                patternData.occurrences
            );
            
            // Store context for pattern analysis
            patternData.contexts.push({
                industry: learningData.userContext.industry,
                stage: learningData.userContext.companyStage,
                timestamp: learningData.timestamp
            });
            
            // Generate pattern insights
            if (patternData.occurrences >= this.minSampleSize) {
                patternData.insights = this.generatePatternInsights(patternData);
            }
            
            this.analytics.patternsIdentified++;
        }
    }
    
    /**
     * Track effectiveness of individual questions
     */
    async trackQuestionEffectiveness(learningData) {
        for (const question of learningData.questions) {
            const questionId = question.id;
            const response = learningData.responses[questionId];
            
            if (!response) continue;
            
            if (!this.questionEffectiveness.has(questionId)) {
                this.questionEffectiveness.set(questionId, {
                    totalUses: 0,
                    successfulUses: 0,
                    averageResponseQuality: 0,
                    averageTimeToRespond: 0,
                    abandonmentRate: 0,
                    contexts: new Map(),
                    improvements: []
                });
            }
            
            const effectiveness = this.questionEffectiveness.get(questionId);
            
            // Update usage statistics
            effectiveness.totalUses++;
            
            // Calculate response quality
            const responseQuality = this.assessResponseQuality(response, question);
            effectiveness.averageResponseQuality = this.updateAverage(
                effectiveness.averageResponseQuality,
                responseQuality,
                effectiveness.totalUses
            );
            
            // Track success
            if (responseQuality > 70) {
                effectiveness.successfulUses++;
            }
            
            // Track context-specific effectiveness
            const contextKey = `${learningData.userContext.industry}_${learningData.userContext.companyStage}`;
            if (!effectiveness.contexts.has(contextKey)) {
                effectiveness.contexts.set(contextKey, {
                    uses: 0,
                    successRate: 0,
                    averageQuality: 0
                });
            }
            
            const contextData = effectiveness.contexts.get(contextKey);
            contextData.uses++;
            contextData.averageQuality = this.updateAverage(
                contextData.averageQuality,
                responseQuality,
                contextData.uses
            );
            
            // Generate improvement suggestions
            if (effectiveness.totalUses >= this.minSampleSize && 
                effectiveness.averageResponseQuality < 60) {
                effectiveness.improvements = this.generateQuestionImprovements(
                    question,
                    effectiveness
                );
            }
        }
    }
    
    /**
     * Update user profile with learning data
     */
    async updateUserProfile(learningData) {
        const userId = learningData.userContext.userId || 'anonymous';
        
        if (!this.userProfiles.has(userId)) {
            this.userProfiles.set(userId, {
                userId: userId,
                sessions: 0,
                averageScore: 0,
                strongAreas: [],
                weakAreas: [],
                preferredQuestionTypes: [],
                learningStyle: 'unknown',
                progressionRate: 0,
                lastSession: null
            });
        }
        
        const profile = this.userProfiles.get(userId);
        
        // Update session data
        profile.sessions++;
        profile.lastSession = learningData.timestamp;
        
        // Update average score
        profile.averageScore = this.updateAverage(
            profile.averageScore,
            learningData.scores.final,
            profile.sessions
        );
        
        // Identify strong and weak areas
        const areaScores = this.calculateAreaScores(learningData);
        profile.strongAreas = areaScores.filter(a => a.score > 75).map(a => a.area);
        profile.weakAreas = areaScores.filter(a => a.score < 50).map(a => a.area);
        
        // Detect learning style
        profile.learningStyle = this.detectLearningStyle(learningData);
        
        // Calculate progression rate
        if (profile.sessions > 1) {
            profile.progressionRate = this.calculateProgressionRate(userId);
        }
        
        // Identify preferred question types
        profile.preferredQuestionTypes = this.identifyPreferredQuestionTypes(learningData);
    }
    
    /**
     * Identify patterns specific to industries
     */
    async identifyIndustryPatterns(learningData) {
        const industry = learningData.userContext.industry || 'general';
        
        if (!this.industryPatterns.has(industry)) {
            this.industryPatterns.set(industry, {
                industry: industry,
                sessions: 0,
                averageScore: 0,
                commonChallenges: [],
                successFactors: [],
                effectiveQuestions: [],
                ineffectiveQuestions: [],
                typicalProgressionPath: []
            });
        }
        
        const industryData = this.industryPatterns.get(industry);
        
        // Update session count
        industryData.sessions++;
        
        // Update average score
        industryData.averageScore = this.updateAverage(
            industryData.averageScore,
            learningData.scores.final,
            industryData.sessions
        );
        
        // Identify common challenges
        if (learningData.scores.final < 60) {
            const challenges = this.extractChallenges(learningData);
            challenges.forEach(challenge => {
                const existing = industryData.commonChallenges.find(c => c.type === challenge.type);
                if (existing) {
                    existing.frequency++;
                } else {
                    industryData.commonChallenges.push({
                        type: challenge.type,
                        description: challenge.description,
                        frequency: 1
                    });
                }
            });
        }
        
        // Identify success factors
        if (learningData.scores.final > 80) {
            const factors = this.extractSuccessFactors(learningData);
            factors.forEach(factor => {
                const existing = industryData.successFactors.find(f => f.type === factor.type);
                if (existing) {
                    existing.frequency++;
                } else {
                    industryData.successFactors.push({
                        type: factor.type,
                        description: factor.description,
                        frequency: 1
                    });
                }
            });
        }
        
        // Track question effectiveness by industry
        learningData.questions.forEach(question => {
            const response = learningData.responses[question.id];
            if (response) {
                const quality = this.assessResponseQuality(response, question);
                
                if (quality > 75) {
                    if (!industryData.effectiveQuestions.includes(question.id)) {
                        industryData.effectiveQuestions.push(question.id);
                    }
                } else if (quality < 40) {
                    if (!industryData.ineffectiveQuestions.includes(question.id)) {
                        industryData.ineffectiveQuestions.push(question.id);
                    }
                }
            }
        });
        
        // Build typical progression path
        if (industryData.sessions >= this.minSampleSize) {
            industryData.typicalProgressionPath = this.buildProgressionPath(industry);
        }
    }
    
    /**
     * Generate insights from learning data
     */
    async generateInsights(learningData) {
        const insights = {
            immediate: [],
            patterns: [],
            recommendations: [],
            predictions: []
        };
        
        // Immediate insights from current session
        if (learningData.scores.final > 85) {
            insights.immediate.push({
                type: 'success',
                message: 'Excellent performance indicates strong understanding',
                confidence: 0.9
            });
        } else if (learningData.scores.final < 50) {
            insights.immediate.push({
                type: 'challenge',
                message: 'Additional support and simplified questions recommended',
                confidence: 0.85
            });
        }
        
        // Pattern-based insights
        const patterns = this.patternRecognizer.findSimilarPatterns(learningData);
        patterns.forEach(pattern => {
            if (pattern.confidence > this.confidenceThreshold) {
                insights.patterns.push({
                    type: pattern.type,
                    message: pattern.insight,
                    confidence: pattern.confidence,
                    basedOn: `${pattern.occurrences} similar sessions`
                });
            }
        });
        
        // Predictive insights
        const predictions = await this.generatePredictions(learningData);
        insights.predictions = predictions;
        
        // Recommendations based on learning
        const recommendations = await this.recommendationEngine.generate(
            learningData,
            this.patternDatabase,
            this.industryPatterns
        );
        insights.recommendations = recommendations;
        
        return insights;
    }
    
    /**
     * Generate recommendations based on learning
     */
    async generateRecommendations(learningData) {
        const recommendations = {
            questionSequence: [],
            adaptationStrategy: null,
            focusAreas: [],
            avoidAreas: [],
            timing: {}
        };
        
        // Recommend optimal question sequence
        const userProfile = this.userProfiles.get(
            learningData.userContext.userId || 'anonymous'
        );
        
        if (userProfile && userProfile.sessions > 1) {
            recommendations.questionSequence = this.recommendQuestionSequence(
                userProfile,
                learningData.userContext
            );
        }
        
        // Recommend adaptation strategy
        recommendations.adaptationStrategy = this.recommendAdaptationStrategy(
            learningData,
            userProfile
        );
        
        // Identify focus areas
        const areaScores = this.calculateAreaScores(learningData);
        recommendations.focusAreas = areaScores
            .filter(a => a.score < 60)
            .map(a => ({
                area: a.area,
                currentScore: a.score,
                targetScore: 75,
                suggestedQuestions: this.getQuestionsForArea(a.area)
            }));
        
        // Identify areas to avoid (too advanced)
        recommendations.avoidAreas = areaScores
            .filter(a => a.score < 30)
            .map(a => a.area);
        
        // Timing recommendations
        recommendations.timing = {
            optimalSessionLength: this.calculateOptimalSessionLength(userProfile),
            breakPoints: this.identifyBreakPoints(learningData),
            bestTimeOfDay: this.predictBestTimeOfDay(userProfile)
        };
        
        return recommendations;
    }
    
    /**
     * Generate predictions based on patterns
     */
    async generatePredictions(learningData) {
        const predictions = [];
        
        // Predict likely score improvement
        const scoreImprovement = this.predictScoreImprovement(learningData);
        if (scoreImprovement.confidence > 0.7) {
            predictions.push({
                type: 'score_improvement',
                prediction: `Expected ${scoreImprovement.improvement}% improvement in next session`,
                confidence: scoreImprovement.confidence,
                timeframe: 'next_session'
            });
        }
        
        // Predict areas of difficulty
        const difficultyPrediction = this.predictDifficultyAreas(learningData);
        if (difficultyPrediction.confidence > 0.75) {
            predictions.push({
                type: 'difficulty_areas',
                prediction: `Likely to struggle with ${difficultyPrediction.areas.join(', ')}`,
                confidence: difficultyPrediction.confidence,
                recommendation: difficultyPrediction.recommendation
            });
        }
        
        // Predict engagement level
        const engagementPrediction = this.predictEngagement(learningData);
        predictions.push({
            type: 'engagement',
            prediction: engagementPrediction.level,
            confidence: engagementPrediction.confidence,
            factors: engagementPrediction.factors
        });
        
        return predictions;
    }
    
    /**
     * Helper methods for learning calculations
     */
    
    updateSuccessRate(currentRate, success, count) {
        const weight = 1 / count;
        return currentRate * (1 - weight) + (success ? 1 : 0) * weight;
    }
    
    updateAverageScore(currentAvg, newScore, count) {
        return ((currentAvg * (count - 1)) + newScore) / count;
    }
    
    updateAverage(currentAvg, newValue, count) {
        return ((currentAvg * (count - 1)) + newValue) / count;
    }
    
    assessResponseQuality(response, question) {
        let quality = 50; // Base score
        
        // Length assessment
        if (response.length > 200) quality += 20;
        else if (response.length > 100) quality += 10;
        
        // Specificity assessment
        if (/\d+/.test(response)) quality += 15;
        if (/%/.test(response)) quality += 10;
        if (/\$|€|£/.test(response)) quality += 10;
        
        // Completeness assessment
        const sentences = response.split(/[.!?]+/).filter(s => s.trim().length > 0);
        if (sentences.length > 3) quality += 15;
        
        // Question-specific assessment
        if (question.type === 'quantification' && /\d+/.test(response)) {
            quality += 10;
        }
        if (question.type === 'validation' && 
            (response.includes('customer') || response.includes('user'))) {
            quality += 10;
        }
        
        return Math.min(100, quality);
    }
    
    generatePatternKey(pattern) {
        return `${pattern.type}_${pattern.context.industry}_${pattern.context.stage}`;
    }
    
    generatePatternInsights(patternData) {
        const insights = [];
        
        if (patternData.successRate > 0.8) {
            insights.push({
                type: 'high_success',
                message: 'This pattern consistently leads to successful outcomes',
                actionable: 'Replicate this pattern for similar contexts'
            });
        }
        
        if (patternData.averageScore > 80) {
            insights.push({
                type: 'high_performance',
                message: 'Users following this pattern achieve high scores',
                actionable: 'Recommend this approach to similar users'
            });
        }
        
        // Context-specific insights
        const industryFrequency = {};
        patternData.contexts.forEach(context => {
            industryFrequency[context.industry] = (industryFrequency[context.industry] || 0) + 1;
        });
        
        const dominantIndustry = Object.entries(industryFrequency)
            .sort((a, b) => b[1] - a[1])[0];
        
        if (dominantIndustry && dominantIndustry[1] > patternData.occurrences * 0.6) {
            insights.push({
                type: 'industry_specific',
                message: `Particularly effective for ${dominantIndustry[0]} companies`,
                actionable: `Prioritize for ${dominantIndustry[0]} users`
            });
        }
        
        return insights;
    }
    
    generateQuestionImprovements(question, effectiveness) {
        const improvements = [];
        
        if (effectiveness.averageResponseQuality < 40) {
            improvements.push({
                type: 'simplify',
                suggestion: 'Break this question into smaller, more specific parts',
                priority: 'high'
            });
        }
        
        if (effectiveness.abandonmentRate > 0.3) {
            improvements.push({
                type: 'clarify',
                suggestion: 'Add examples or clarify the question wording',
                priority: 'high'
            });
        }
        
        // Context-specific improvements
        effectiveness.contexts.forEach((contextData, contextKey) => {
            if (contextData.averageQuality < 50) {
                const [industry, stage] = contextKey.split('_');
                improvements.push({
                    type: 'contextualize',
                    suggestion: `Create industry-specific version for ${industry} at ${stage} stage`,
                    priority: 'medium'
                });
            }
        });
        
        return improvements;
    }
    
    calculateAreaScores(learningData) {
        const areas = ['clarity', 'specificity', 'validation', 'quantification', 'strategy'];
        const scores = [];
        
        areas.forEach(area => {
            const relevantQuestions = learningData.questions.filter(q => 
                q.scoringDimensions && q.scoringDimensions.includes(area)
            );
            
            let areaScore = 0;
            let count = 0;
            
            relevantQuestions.forEach(question => {
                const response = learningData.responses[question.id];
                if (response) {
                    areaScore += this.assessResponseQuality(response, question);
                    count++;
                }
            });
            
            if (count > 0) {
                scores.push({
                    area: area,
                    score: Math.round(areaScore / count)
                });
            }
        });
        
        return scores;
    }
    
    detectLearningStyle(learningData) {
        const responsePatterns = Object.values(learningData.responses);
        
        // Analyze response characteristics
        const avgLength = responsePatterns.reduce((sum, r) => sum + r.length, 0) / responsePatterns.length;
        const hasNumbers = responsePatterns.filter(r => /\d+/.test(r)).length;
        const hasExamples = responsePatterns.filter(r => 
            r.includes('example') || r.includes('for instance')
        ).length;
        
        if (avgLength > 200 && hasExamples > responsePatterns.length * 0.5) {
            return 'narrative';
        } else if (hasNumbers > responsePatterns.length * 0.7) {
            return 'analytical';
        } else if (avgLength < 100) {
            return 'concise';
        } else {
            return 'balanced';
        }
    }
    
    calculateProgressionRate(userId) {
        const profile = this.userProfiles.get(userId);
        if (!profile || profile.sessions < 2) return 0;
        
        // Simple progression rate based on score improvement
        // In real implementation, would track score history
        return 0.1; // Placeholder
    }
    
    identifyPreferredQuestionTypes(learningData) {
        const typeScores = {};
        
        learningData.questions.forEach(question => {
            const response = learningData.responses[question.id];
            if (response) {
                const quality = this.assessResponseQuality(response, question);
                if (!typeScores[question.type]) {
                    typeScores[question.type] = { total: 0, count: 0 };
                }
                typeScores[question.type].total += quality;
                typeScores[question.type].count++;
            }
        });
        
        // Return types with above-average performance
        const preferred = [];
        Object.entries(typeScores).forEach(([type, scores]) => {
            const avg = scores.total / scores.count;
            if (avg > 70) {
                preferred.push(type);
            }
        });
        
        return preferred;
    }
    
    extractChallenges(learningData) {
        const challenges = [];
        
        // Analyze low-scoring responses
        learningData.questions.forEach(question => {
            const response = learningData.responses[question.id];
            if (response) {
                const quality = this.assessResponseQuality(response, question);
                if (quality < 50) {
                    challenges.push({
                        type: question.type,
                        description: `Difficulty with ${question.type} questions`
                    });
                }
            }
        });
        
        return challenges;
    }
    
    extractSuccessFactors(learningData) {
        const factors = [];
        
        // Analyze high-scoring responses
        learningData.questions.forEach(question => {
            const response = learningData.responses[question.id];
            if (response) {
                const quality = this.assessResponseQuality(response, question);
                if (quality > 80) {
                    factors.push({
                        type: question.type,
                        description: `Strong performance in ${question.type} questions`
                    });
                }
            }
        });
        
        return factors;
    }
    
    buildProgressionPath(industry) {
        const industryData = this.industryPatterns.get(industry);
        if (!industryData) return [];
        
        // Build typical progression based on successful sessions
        return [
            { stage: 'foundation', focus: 'diagnostic', duration: '1-2 sessions' },
            { stage: 'exploration', focus: 'exploratory', duration: '2-3 sessions' },
            { stage: 'validation', focus: 'validation', duration: '2-3 sessions' },
            { stage: 'quantification', focus: 'quantification', duration: '1-2 sessions' },
            { stage: 'strategy', focus: 'strategic', duration: '1-2 sessions' }
        ];
    }
    
    recommendQuestionSequence(userProfile, userContext) {
        const sequence = [];
        
        // Start with preferred question types
        userProfile.preferredQuestionTypes.forEach(type => {
            sequence.push({ type: type, priority: 'high' });
        });
        
        // Add questions for weak areas
        userProfile.weakAreas.forEach(area => {
            sequence.push({ 
                type: 'targeted',
                area: area,
                priority: 'medium'
            });
        });
        
        // Fill with balanced questions
        const standardTypes = ['diagnostic', 'exploratory', 'validation'];
        standardTypes.forEach(type => {
            if (!sequence.find(s => s.type === type)) {
                sequence.push({ type: type, priority: 'low' });
            }
        });
        
        return sequence;
    }
    
    recommendAdaptationStrategy(learningData, userProfile) {
        if (!userProfile) {
            return {
                strategy: 'standard',
                reason: 'New user - using standard approach'
            };
        }
        
        if (userProfile.learningStyle === 'narrative') {
            return {
                strategy: 'story-based',
                reason: 'User prefers narrative responses',
                adaptations: ['add examples', 'use scenarios', 'allow longer responses']
            };
        } else if (userProfile.learningStyle === 'analytical') {
            return {
                strategy: 'data-driven',
                reason: 'User prefers quantitative analysis',
                adaptations: ['emphasize metrics', 'request specific numbers', 'add calculations']
            };
        } else if (userProfile.learningStyle === 'concise') {
            return {
                strategy: 'focused',
                reason: 'User prefers brief interactions',
                adaptations: ['shorter questions', 'bullet points', 'quick validations']
            };
        }
        
        return {
            strategy: 'balanced',
            reason: 'Balanced learning style detected'
        };
    }
    
    getQuestionsForArea(area) {
        // Return question IDs that target specific area
        // In real implementation, would query question bank
        const areaQuestions = {
            clarity: ['q_clarity_1', 'q_clarity_2', 'q_clarity_3'],
            specificity: ['q_specific_1', 'q_specific_2'],
            validation: ['q_valid_1', 'q_valid_2', 'q_valid_3'],
            quantification: ['q_quant_1', 'q_quant_2'],
            strategy: ['q_strat_1', 'q_strat_2']
        };
        
        return areaQuestions[area] || [];
    }
    
    calculateOptimalSessionLength(userProfile) {
        if (!userProfile) return 15; // Default 15 minutes
        
        if (userProfile.learningStyle === 'concise') {
            return 10;
        } else if (userProfile.learningStyle === 'narrative') {
            return 25;
        }
        
        return 15;
    }
    
    identifyBreakPoints(learningData) {
        // Identify natural break points in the session
        return [
            { after: 5, reason: 'Initial assessment complete' },
            { after: 10, reason: 'Core questions complete' },
            { after: 15, reason: 'Deep dive complete' }
        ];
    }
    
    predictBestTimeOfDay(userProfile) {
        // Placeholder - would analyze session timestamps
        return {
            time: 'morning',
            confidence: 0.6
        };
    }
    
    predictScoreImprovement(learningData) {
        const userProfile = this.userProfiles.get(
            learningData.userContext.userId || 'anonymous'
        );
        
        if (!userProfile || userProfile.sessions < 2) {
            return { improvement: 10, confidence: 0.5 };
        }
        
        // Calculate based on progression rate
        const improvement = Math.round(userProfile.progressionRate * 100);
        const confidence = Math.min(0.9, 0.5 + (userProfile.sessions * 0.05));
        
        return { improvement, confidence };
    }
    
    predictDifficultyAreas(learningData) {
        const areas = [];
        const confidence = 0.8;
        
        // Predict based on current weak areas
        const areaScores = this.calculateAreaScores(learningData);
        areaScores.forEach(area => {
            if (area.score < 40) {
                areas.push(area.area);
            }
        });
        
        return {
            areas: areas,
            confidence: confidence,
            recommendation: areas.length > 0 ? 
                'Provide additional support in these areas' : 
                'Continue with standard progression'
        };
    }
    
    predictEngagement(learningData) {
        const responses = Object.values(learningData.responses);
        const avgLength = responses.reduce((sum, r) => sum + r.length, 0) / responses.length;
        
        let level = 'moderate';
        let confidence = 0.7;
        const factors = [];
        
        if (avgLength > 150) {
            level = 'high';
            factors.push('detailed responses');
        } else if (avgLength < 50) {
            level = 'low';
            factors.push('brief responses');
        }
        
        if (learningData.adaptations && learningData.adaptations.length > 0) {
            factors.push('responsive to adaptations');
            confidence += 0.1;
        }
        
        return { level, confidence, factors };
    }
    
    updateAnalytics(learningData) {
        this.analytics.totalSessions++;
        
        if (learningData.outcome && learningData.outcome.success) {
            this.analytics.successfulSessions++;
        }
        
        // Calculate improvement rate
        const improvementRate = this.analytics.successfulSessions / this.analytics.totalSessions;
        this.analytics.improvementRate = Math.round(improvementRate * 100);
        
        // Update average score increase
        // In real implementation, would track score changes over time
        this.analytics.averageScoreIncrease = 15; // Placeholder
    }
    
    /**
     * Load historical data for learning
     */
    async loadHistoricalData() {
        // In real implementation, would load from database
        console.log('📚 Loading historical learning data...');
        
        // Initialize with some baseline patterns
        this.initializeBaselinePatterns();
    }
    
    /**
     * Initialize pattern templates
     */
    initializePatternTemplates() {
        // Define common pattern templates
        this.patternTemplates = {
            struggling_startup: {
                indicators: ['low scores', 'brief responses', 'no metrics'],
                recommendations: ['simplify', 'provide examples', 'break down concepts']
            },
            confident_growth: {
                indicators: ['high scores', 'detailed responses', 'strong metrics'],
                recommendations: ['advance difficulty', 'explore edge cases', 'challenge assumptions']
            },
            technical_founder: {
                indicators: ['technical language', 'product focus', 'weak on business'],
                recommendations: ['emphasize business metrics', 'customer perspective', 'market analysis']
            },
            business_founder: {
                indicators: ['business language', 'market focus', 'weak on product'],
                recommendations: ['technical feasibility', 'product details', 'implementation planning']
            }
        };
    }
    
    /**
     * Initialize baseline patterns
     */
    initializeBaselinePatterns() {
        // Add some baseline patterns for cold start
        const baselinePatterns = [
            {
                type: 'early_stage_exploration',
                context: { industry: 'b2b-saas', stage: 'pre-seed' },
                successRate: 0.65,
                insights: ['Focus on problem validation', 'Emphasize customer discovery']
            },
            {
                type: 'growth_optimization',
                context: { industry: 'b2b-saas', stage: 'growth' },
                successRate: 0.8,
                insights: ['Focus on metrics', 'Emphasize scalability']
            }
        ];
        
        baselinePatterns.forEach(pattern => {
            const key = this.generatePatternKey(pattern);
            this.patternDatabase.set(key, {
                pattern: pattern,
                occurrences: 10, // Simulated historical data
                successRate: pattern.successRate,
                averageScore: 70,
                contexts: [],
                insights: pattern.insights
            });
        });
    }
    
    /**
     * Start the learning cycle
     */
    startLearningCycle() {
        // Periodic learning optimization
        setInterval(() => {
            this.optimizeLearning();
        }, 3600000); // Every hour
    }
    
    /**
     * Optimize learning based on accumulated data
     */
    optimizeLearning() {
        console.log('🔄 Running learning optimization cycle...');
        
        // Decay old patterns
        this.decayOldPatterns();
        
        // Consolidate similar patterns
        this.consolidatePatterns();
        
        // Update effectiveness scores
        this.updateEffectivenessScores();
        
        // Generate new insights
        this.generateSystemInsights();
        
        console.log('✅ Learning optimization complete');
    }
    
    decayOldPatterns() {
        // Reduce confidence in old patterns
        this.patternDatabase.forEach((pattern, key) => {
            if (pattern.occurrences > 0) {
                pattern.successRate *= (1 - this.decayRate);
            }
        });
    }
    
    consolidatePatterns() {
        // Merge similar patterns
        // Implementation would involve pattern similarity calculation
    }
    
    updateEffectivenessScores() {
        // Recalculate question effectiveness
        this.questionEffectiveness.forEach((effectiveness, questionId) => {
            if (effectiveness.totalUses > this.minSampleSize) {
                effectiveness.effectivenessScore = 
                    (effectiveness.successfulUses / effectiveness.totalUses) * 100;
            }
        });
    }
    
    generateSystemInsights() {
        // Generate high-level insights about the learning system
        const insights = {
            topPatterns: this.getTopPatterns(),
            mostEffectiveQuestions: this.getMostEffectiveQuestions(),
            industryTrends: this.getIndustryTrends(),
            improvementAreas: this.getImprovementAreas()
        };
        
        console.log('📊 System Insights:', insights);
        return insights;
    }
    
    getTopPatterns() {
        const patterns = Array.from(this.patternDatabase.values())
            .sort((a, b) => b.successRate - a.successRate)
            .slice(0, 5)
            .map(p => ({
                pattern: p.pattern.type,
                successRate: p.successRate,
                occurrences: p.occurrences
            }));
        return patterns;
    }
    
    getMostEffectiveQuestions() {
        const questions = Array.from(this.questionEffectiveness.entries())
            .filter(([id, data]) => data.totalUses >= this.minSampleSize)
            .sort((a, b) => b[1].averageResponseQuality - a[1].averageResponseQuality)
            .slice(0, 10)
            .map(([id, data]) => ({
                questionId: id,
                effectiveness: data.averageResponseQuality,
                uses: data.totalUses
            }));
        return questions;
    }
    
    getIndustryTrends() {
        const trends = [];
        this.industryPatterns.forEach((data, industry) => {
            trends.push({
                industry: industry,
                averageScore: data.averageScore,
                sessions: data.sessions,
                topChallenge: data.commonChallenges[0] || null,
                topSuccess: data.successFactors[0] || null
            });
        });
        return trends;
    }
    
    getImprovementAreas() {
        const areas = [];
        
        // Identify questions needing improvement
        this.questionEffectiveness.forEach((data, questionId) => {
            if (data.averageResponseQuality < 50 && data.totalUses >= this.minSampleSize) {
                areas.push({
                    type: 'question',
                    id: questionId,
                    issue: 'Low response quality',
                    suggestion: data.improvements[0] || 'Needs revision'
                });
            }
        });
        
        return areas;
    }
}

/**
 * Pattern Recognizer for identifying learning patterns
 */
class PatternRecognizer {
    extractPattern(learningData) {
        const pattern = {
            type: this.identifyPatternType(learningData),
            context: {
                industry: learningData.userContext.industry,
                stage: learningData.userContext.companyStage
            },
            characteristics: this.extractCharacteristics(learningData),
            outcome: learningData.outcome
        };
        
        return pattern;
    }
    
    identifyPatternType(learningData) {
        const avgScore = learningData.scores.final;
        const responseQuality = this.assessOverallQuality(learningData.responses);
        
        if (avgScore < 40 && responseQuality < 40) {
            return 'struggling_beginner';
        } else if (avgScore > 80 && responseQuality > 80) {
            return 'advanced_performer';
        } else if (avgScore > 60 && responseQuality < 60) {
            return 'knowledgeable_poor_articulation';
        } else if (avgScore < 60 && responseQuality > 60) {
            return 'good_articulation_weak_substance';
        }
        
        return 'standard_progression';
    }
    
    extractCharacteristics(learningData) {
        return {
            responseLength: this.calculateAverageLength(learningData.responses),
            hasMetrics: this.checkForMetrics(learningData.responses),
            completionRate: this.calculateCompletionRate(learningData),
            adaptationResponse: learningData.adaptations ? 'responsive' : 'standard'
        };
    }
    
    assessOverallQuality(responses) {
        let totalQuality = 0;
        let count = 0;
        
        Object.values(responses).forEach(response => {
            if (typeof response === 'string') {
                let quality = 50;
                if (response.length > 100) quality += 20;
                if (/\d+/.test(response)) quality += 15;
                if (response.split(/[.!?]+/).length > 2) quality += 15;
                
                totalQuality += Math.min(100, quality);
                count++;
            }
        });
        
        return count > 0 ? totalQuality / count : 0;
    }
    
    calculateAverageLength(responses) {
        const lengths = Object.values(responses).map(r => r.length);
        return lengths.reduce((sum, l) => sum + l, 0) / lengths.length;
    }
    
    checkForMetrics(responses) {
        return Object.values(responses).some(r => /\d+/.test(r));
    }
    
    calculateCompletionRate(learningData) {
        const totalQuestions = learningData.questions.length;
        const answeredQuestions = Object.keys(learningData.responses).length;
        return answeredQuestions / totalQuestions;
    }
    
    findSimilarPatterns(learningData) {
        // Find patterns similar to current session
        // In real implementation, would use more sophisticated matching
        return [];
    }
}

/**
 * Effectiveness Tracker for monitoring question and strategy effectiveness
 */
class EffectivenessTracker {
    constructor() {
        this.metrics = new Map();
    }
    
    track(id, type, data) {
        if (!this.metrics.has(id)) {
            this.metrics.set(id, {
                type: type,
                uses: 0,
                successes: 0,
                averageScore: 0,
                trend: 'stable'
            });
        }
        
        const metric = this.metrics.get(id);
        metric.uses++;
        
        if (data.success) {
            metric.successes++;
        }
        
        metric.averageScore = this.updateAverage(
            metric.averageScore,
            data.score,
            metric.uses
        );
        
        metric.trend = this.calculateTrend(metric);
    }
    
    updateAverage(current, newValue, count) {
        return ((current * (count - 1)) + newValue) / count;
    }
    
    calculateTrend(metric) {
        // Simple trend calculation
        const successRate = metric.successes / metric.uses;
        if (successRate > 0.7) return 'improving';
        if (successRate < 0.3) return 'declining';
        return 'stable';
    }
}

/**
 * Recommendation Engine for generating learning-based recommendations
 */
class RecommendationEngine {
    async generate(learningData, patternDatabase, industryPatterns) {
        const recommendations = [];
        
        // Pattern-based recommendations
        patternDatabase.forEach((pattern, key) => {
            if (pattern.successRate > 0.8 && pattern.occurrences > 10) {
                recommendations.push({
                    type: 'pattern',
                    recommendation: `Use ${pattern.pattern.type} approach`,
                    confidence: pattern.successRate,
                    basedOn: `${pattern.occurrences} successful sessions`
                });
            }
        });
        
        // Industry-based recommendations
        const industry = learningData.userContext.industry;
        if (industryPatterns.has(industry)) {
            const industryData = industryPatterns.get(industry);
            if (industryData.effectiveQuestions.length > 0) {
                recommendations.push({
                    type: 'industry',
                    recommendation: `Focus on questions effective for ${industry}`,
                    questions: industryData.effectiveQuestions.slice(0, 5),
                    confidence: 0.75
                });
            }
        }
        
        return recommendations.slice(0, 5); // Top 5 recommendations
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LearningSystem;
}

if (typeof window !== 'undefined') {
    window.LearningSystem = LearningSystem;
}

console.log('✅ Learning System loaded - ready for adaptive learning!');
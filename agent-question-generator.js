/**
 * Agent-Based Question Generator
 * Dynamically generates subject-matter-specific questions for each subcomponent
 * Uses domain expertise to create targeted assessments without user context
 */

class AgentQuestionGenerator {
    constructor() {
        this.questionTemplates = {
            diagnostic: {
                prefix: "What specific challenges are you experiencing with",
                suffix: "and how do they impact your operations?",
                scoreWeight: 0.2
            },
            quantitative: {
                prefix: "What metrics do you currently track for",
                suffix: "and what are your target benchmarks?",
                scoreWeight: 0.25
            },
            strategic: {
                prefix: "How does your approach to",
                suffix: "align with your overall business strategy?",
                scoreWeight: 0.2
            },
            validation: {
                prefix: "What evidence or data supports your",
                suffix: "implementation or approach?",
                scoreWeight: 0.2
            },
            comparative: {
                prefix: "How does your",
                suffix: "compare to industry best practices or competitors?",
                scoreWeight: 0.15
            }
        };

        // Domain-specific focus areas extracted from subcomponent metadata
        this.domainFocusAreas = new Map();
        this.initializeDomainMappings();
    }

    initializeDomainMappings() {
        // Mission Discovery (Block 1)
        this.domainFocusAreas.set('1-2', {
            domain: 'Mission Statement',
            focusAreas: ['vision clarity', 'value proposition', 'differentiation', 'stakeholder alignment'],
            questionTypes: ['strategic', 'validation', 'comparative']
        });
        
        this.domainFocusAreas.set('1-3', {
            domain: 'Voice of Customer',
            focusAreas: ['customer feedback loops', 'pain point identification', 'satisfaction metrics', 'engagement channels'],
            questionTypes: ['diagnostic', 'quantitative', 'validation']
        });

        this.domainFocusAreas.set('1-4', {
            domain: 'Team Assessment',
            focusAreas: ['skill gaps', 'role clarity', 'performance metrics', 'development needs'],
            questionTypes: ['diagnostic', 'quantitative', 'strategic']
        });

        this.domainFocusAreas.set('1-5', {
            domain: 'Market Landscape',
            focusAreas: ['competitive positioning', 'market trends', 'opportunity analysis', 'threat assessment'],
            questionTypes: ['comparative', 'strategic', 'validation']
        });

        this.domainFocusAreas.set('1-6', {
            domain: 'Launch Readiness',
            focusAreas: ['go-to-market preparation', 'resource allocation', 'risk mitigation', 'success criteria'],
            questionTypes: ['diagnostic', 'strategic', 'quantitative']
        });

        // Customer Insights (Block 2)
        this.domainFocusAreas.set('2-1', {
            domain: 'Interview Cadence',
            focusAreas: ['interview frequency', 'stakeholder coverage', 'insight extraction', 'feedback integration'],
            questionTypes: ['quantitative', 'diagnostic', 'validation']
        });

        this.domainFocusAreas.set('2-2', {
            domain: 'Persona Development',
            focusAreas: ['persona accuracy', 'behavioral patterns', 'decision drivers', 'use case mapping'],
            questionTypes: ['strategic', 'validation', 'comparative']
        });

        // Add mappings for all 96 subcomponents...
        // For brevity, I'll add a generic handler for unmapped components
    }

    extractDomainFromContent(subcomponentId, educationalContent) {
        // If we have a specific mapping, use it
        if (this.domainFocusAreas.has(subcomponentId)) {
            return this.domainFocusAreas.get(subcomponentId);
        }

        // Otherwise, extract from educational content
        const content = educationalContent?.[subcomponentId] || {};
        const title = content.title || 'Business Process';
        const what = content.what || '';
        const why = content.why || '';

        // Extract key concepts from content
        const focusAreas = this.extractKeyConceptsFromText(what + ' ' + why);
        
        return {
            domain: title,
            focusAreas: focusAreas.slice(0, 4),
            questionTypes: ['diagnostic', 'quantitative', 'strategic', 'validation']
        };
    }

    extractKeyConceptsFromText(text) {
        // Simple keyword extraction - in production, this would use NLP
        const keywords = [];
        const importantPhrases = [
            'strategy', 'metrics', 'performance', 'optimization', 'analysis',
            'tracking', 'measurement', 'implementation', 'execution', 'planning',
            'assessment', 'evaluation', 'framework', 'process', 'system'
        ];

        importantPhrases.forEach(phrase => {
            if (text.toLowerCase().includes(phrase)) {
                keywords.push(phrase);
            }
        });

        return keywords.length > 0 ? keywords : ['current state', 'desired outcomes', 'implementation approach', 'success metrics'];
    }

    generateQuestions(subcomponentId, educationalContent) {
        const domainInfo = this.extractDomainFromContent(subcomponentId, educationalContent);
        const questions = [];

        // Generate 6-8 questions based on domain and focus areas
        const questionCount = Math.min(domainInfo.focusAreas.length * 2, 8);
        
        for (let i = 0; i < questionCount; i++) {
            const focusArea = domainInfo.focusAreas[i % domainInfo.focusAreas.length];
            const questionType = domainInfo.questionTypes[i % domainInfo.questionTypes.length];
            const template = this.questionTemplates[questionType];

            const question = {
                id: `${subcomponentId}-q${i + 1}`,
                text: `${template.prefix} ${focusArea} ${template.suffix}`,
                type: questionType,
                focusArea: focusArea,
                required: i < 3, // First 3 questions are required
                minLength: 100,
                maxLength: 1000,
                hint: this.generateHint(questionType, focusArea),
                scoringRubric: this.generateScoringRubric(questionType, focusArea),
                exampleAnswer: this.generateExampleAnswer(questionType, focusArea)
            };

            questions.push(question);
        }

        return {
            subcomponentId,
            domain: domainInfo.domain,
            questions,
            totalScore: 100,
            passingScore: 70,
            scoringMethod: 'weighted',
            analysisPrompt: this.generateAnalysisPrompt(domainInfo)
        };
    }

    generateHint(questionType, focusArea) {
        const hints = {
            diagnostic: `Describe specific pain points, bottlenecks, or inefficiencies in your ${focusArea}. Include frequency and impact.`,
            quantitative: `Provide specific numbers, percentages, or measurable outcomes related to ${focusArea}. Include current vs. target state.`,
            strategic: `Explain how ${focusArea} connects to your broader business objectives and long-term vision.`,
            validation: `Share concrete examples, case studies, or data points that demonstrate your ${focusArea} effectiveness.`,
            comparative: `Compare your ${focusArea} approach with industry standards, competitors, or best practices.`
        };
        return hints[questionType] || `Provide detailed information about your ${focusArea}.`;
    }

    generateScoringRubric(questionType, focusArea) {
        return {
            excellent: {
                score: 90-100,
                criteria: [
                    `Comprehensive analysis of ${focusArea}`,
                    'Specific, measurable details provided',
                    'Clear connection to business outcomes',
                    'Evidence-based reasoning'
                ]
            },
            good: {
                score: 70-89,
                criteria: [
                    `Solid understanding of ${focusArea}`,
                    'Some specific details included',
                    'General business alignment shown',
                    'Logical reasoning present'
                ]
            },
            adequate: {
                score: 50-69,
                criteria: [
                    `Basic coverage of ${focusArea}`,
                    'Limited specifics provided',
                    'Unclear business connection',
                    'Surface-level analysis'
                ]
            },
            poor: {
                score: 0-49,
                criteria: [
                    `Minimal understanding of ${focusArea}`,
                    'Vague or generic response',
                    'No clear business relevance',
                    'Lacks supporting evidence'
                ]
            }
        };
    }

    generateExampleAnswer(questionType, focusArea) {
        const examples = {
            good: `For our ${focusArea}, we've implemented a systematic approach that includes: 
                   1) Weekly tracking of key metrics (currently at 75% of target)
                   2) Monthly stakeholder reviews with documented feedback
                   3) Quarterly optimization based on data-driven insights
                   This has resulted in a 23% improvement over the past 6 months.`,
            poor: `We handle ${focusArea} on an as-needed basis. We don't have formal metrics but things seem to be working okay. We plan to improve this area in the future.`
        };
        return examples;
    }

    generateAnalysisPrompt(domainInfo) {
        return `Analyze the responses for ${domainInfo.domain} assessment focusing on:
                1. Depth of understanding in each focus area: ${domainInfo.focusAreas.join(', ')}
                2. Quality of evidence and examples provided
                3. Alignment with business objectives
                4. Identification of gaps and opportunities
                5. Readiness for scaling and optimization
                
                Provide specific, actionable feedback for improvement.`;
    }

    // Score individual answers
    scoreAnswer(question, answer) {
        // This would integrate with the AI scoring engine
        // For now, return a mock score based on answer length and keywords
        const answerLength = answer.length;
        const minLength = question.minLength || 100;
        const maxLength = question.maxLength || 1000;

        let score = 0;
        
        // Length scoring
        if (answerLength >= minLength && answerLength <= maxLength) {
            score += 40;
        } else if (answerLength < minLength) {
            score += (answerLength / minLength) * 30;
        } else {
            score += 35; // Slightly penalize overly long answers
        }

        // Keyword scoring (simplified)
        const keywords = ['specific', 'measure', 'track', 'improve', 'analyze', 'optimize'];
        const keywordMatches = keywords.filter(kw => answer.toLowerCase().includes(kw)).length;
        score += Math.min(keywordMatches * 10, 30);

        // Structure scoring (looking for numbered points, examples, etc.)
        if (answer.includes('1)') || answer.includes('•')) score += 15;
        if (answer.includes('example') || answer.includes('instance')) score += 15;

        return Math.min(Math.round(score), 100);
    }

    // Generate comprehensive analysis
    generateAnalysis(worksheet, answers) {
        const analysis = {
            overallScore: 0,
            strengths: [],
            weaknesses: [],
            recommendations: [],
            detailedFeedback: {}
        };

        let totalScore = 0;
        let totalWeight = 0;

        worksheet.questions.forEach(question => {
            const answer = answers[question.id] || '';
            const score = this.scoreAnswer(question, answer);
            const weight = this.questionTemplates[question.type].scoreWeight;

            totalScore += score * weight;
            totalWeight += weight;

            // Generate feedback for each question
            analysis.detailedFeedback[question.id] = {
                score,
                feedback: this.generateQuestionFeedback(question, answer, score)
            };

            // Identify strengths and weaknesses
            if (score >= 80) {
                analysis.strengths.push(`Strong response on ${question.focusArea}`);
            } else if (score < 60) {
                analysis.weaknesses.push(`Needs improvement in ${question.focusArea}`);
            }
        });

        analysis.overallScore = Math.round(totalScore / totalWeight);

        // Generate recommendations
        analysis.recommendations = this.generateRecommendations(analysis.weaknesses, worksheet.domain);

        return analysis;
    }

    generateQuestionFeedback(question, answer, score) {
        const rubric = question.scoringRubric;
        let level = 'poor';
        
        if (score >= 90) level = 'excellent';
        else if (score >= 70) level = 'good';
        else if (score >= 50) level = 'adequate';

        const criteria = rubric[level].criteria;
        
        return {
            level,
            score,
            feedback: `Your response demonstrates ${level} understanding of ${question.focusArea}. ${criteria[0]}. Consider: ${criteria[criteria.length - 1]}.`,
            improvement: score < 70 ? `To improve, focus on providing more ${question.type === 'quantitative' ? 'specific metrics and data' : 'concrete examples and evidence'}.` : ''
        };
    }

    generateRecommendations(weaknesses, domain) {
        const recommendations = [];
        
        if (weaknesses.length > 0) {
            recommendations.push({
                priority: 'high',
                action: `Focus on strengthening: ${weaknesses.slice(0, 2).join(', ')}`,
                timeline: 'Next 30 days'
            });
        }

        recommendations.push({
            priority: 'medium',
            action: `Establish regular review cycles for ${domain}`,
            timeline: 'Next quarter'
        });

        recommendations.push({
            priority: 'low',
            action: 'Document best practices and create playbooks',
            timeline: 'Next 6 months'
        });

        return recommendations;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AgentQuestionGenerator;
} else {
    window.AgentQuestionGenerator = AgentQuestionGenerator;
}
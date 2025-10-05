// ScaleOps6 Agent Integration System
// Complete workflow for agent-driven content generation and analysis

class AgentIntegrationSystem {
    constructor() {
        this.agents = {};
        this.loadAgents();
    }

    // Load all agents from the library
    loadAgents() {
        const AgentLibrary = require('./agent-library.js');
        
        // Map agents to their subcomponents
        Object.keys(AgentLibrary).forEach(key => {
            // Convert key format (e.g., "1a" to "1-1")
            const blockNum = key.match(/\d+/)[0];
            const subNum = key.charCodeAt(key.length - 1) - 96; // Convert a=1, b=2, etc.
            const subcomponentId = `${blockNum}-${subNum}`;
            
            this.agents[subcomponentId] = {
                ...AgentLibrary[key],
                id: subcomponentId,
                agentKey: key
            };
        });
    }

    // Main function called when a subcomponent is loaded
    async processSubcomponent(subcomponentId) {
        console.log(`🤖 Processing subcomponent ${subcomponentId} with agent integration`);
        
        const agent = this.agents[subcomponentId];
        if (!agent) {
            console.error(`No agent found for ${subcomponentId}`);
            return null;
        }

        // Step 1: Generate educational content using agent
        const educationalContent = await this.generateEducationalContent(agent, subcomponentId);
        
        // Step 2: Generate executive summary
        const executiveSummary = await this.generateExecutiveSummary(agent, subcomponentId);
        
        // Step 3: Generate workspace questions
        const workspaceQuestions = await this.generateWorkspaceQuestions(agent, subcomponentId);
        
        // Step 4: Generate resource templates
        const resourceTemplates = await this.generateResourceTemplates(agent, subcomponentId);
        
        // Step 5: Save to database
        await this.saveToDatabase(subcomponentId, {
            educationalContent,
            executiveSummary,
            workspaceQuestions,
            resourceTemplates,
            agent: agent.name,
            timestamp: new Date().toISOString()
        });
        
        // Step 6: Log audit trail
        await this.logAuditTrail(agent, subcomponentId, 'content_generated');
        
        return {
            education: educationalContent,
            executiveSummary,
            workspace: workspaceQuestions,
            resources: resourceTemplates,
            agent: agent.name
        };
    }

    // Generate educational content based on agent expertise
    async generateEducationalContent(agent, subcomponentId) {
        console.log(`📚 Generating educational content with ${agent.name}`);
        
        // For Problem Statement (1-1) example
        if (subcomponentId === '1-1') {
            return {
                title: "Problem Statement Framework",
                executiveSummary: this.generateProblemStatementSummary(agent),
                what: `A Problem Statement is a clear, concise description of the issue that needs to be addressed. ${agent.name} evaluates problem clarity across ${agent.scoringDimensions.length} key dimensions: ${agent.scoringDimensions.map(d => d.name).join(', ')}.`,
                why: `Problem statements are critical because they validate market need and guide product development. ${agent.description} to ensure your problem is well-defined, validated, and has strong market potential.`,
                how: this.generateImplementationSteps(agent),
                examples: this.generateExamples(agent),
                metrics: this.generateMetrics(agent),
                bestPractices: this.generateBestPractices(agent)
            };
        }
        
        // Generate for other subcomponents based on their agents
        return this.generateGenericEducationalContent(agent);
    }

    // Generate executive summary
    generateExecutiveSummary(agent, subcomponentId) {
        return {
            overview: `This module focuses on ${agent.description}. It evaluates performance across ${agent.scoringDimensions.length} critical dimensions.`,
            keyObjectives: agent.scoringDimensions.map(dim => ({
                dimension: dim.name,
                weight: dim.weight,
                description: dim.description
            })),
            successCriteria: Object.entries(agent.evaluationCriteria).map(([range, description]) => ({
                scoreRange: range,
                level: this.getPerformanceLevel(range),
                description
            })),
            expectedOutcomes: [
                `Clear understanding of ${agent.scoringDimensions[0].name}`,
                `Ability to assess and improve ${agent.scoringDimensions[1].name}`,
                `Framework for evaluating ${agent.scoringDimensions[2].name}`
            ]
        };
    }

    // Generate Problem Statement specific summary
    generateProblemStatementSummary(agent) {
        return `The Problem Statement Framework is your foundation for GTM success. ${agent.name} helps you articulate a clear, validated problem that resonates with your target market. This framework evaluates ${agent.scoringDimensions.map(d => d.name).join(', ')} to ensure your problem statement drives product-market fit.`;
    }

    // Generate implementation steps
    generateImplementationSteps(agent) {
        const steps = [];
        
        // Generate steps based on scoring dimensions
        agent.scoringDimensions.forEach((dimension, index) => {
            steps.push({
                step: index + 1,
                title: `Assess ${dimension.name}`,
                description: dimension.description,
                actions: [
                    `Evaluate current state of ${dimension.name}`,
                    `Identify gaps and improvement areas`,
                    `Implement improvements based on best practices`,
                    `Measure impact and iterate`
                ]
            });
        });
        
        return steps;
    }

    // Generate examples based on agent expertise
    generateExamples(agent) {
        const examples = [];
        
        // Generate examples for each evaluation level
        Object.entries(agent.evaluationCriteria).forEach(([range, description]) => {
            if (range === "76-90" || range === "91-100") {
                examples.push({
                    level: this.getPerformanceLevel(range),
                    example: `A company achieving ${range}% demonstrates: ${description}`,
                    characteristics: this.getCharacteristics(agent, range)
                });
            }
        });
        
        return examples;
    }

    // Generate metrics
    generateMetrics(agent) {
        return agent.scoringDimensions.map(dimension => ({
            metric: dimension.name,
            weight: `${dimension.weight}%`,
            description: dimension.description,
            measurement: `Score 0-100 based on ${dimension.name.toLowerCase()} quality`
        }));
    }

    // Generate best practices
    generateBestPractices(agent) {
        return agent.scoringDimensions.map(dimension => ({
            dimension: dimension.name,
            practice: `To excel in ${dimension.name}: ${dimension.description}`,
            tips: [
                `Focus on clarity and specificity`,
                `Validate with real customer data`,
                `Iterate based on feedback`,
                `Document learnings and insights`
            ]
        }));
    }

    // Generate workspace questions based on agent dimensions
    async generateWorkspaceQuestions(agent, subcomponentId) {
        console.log(`📝 Generating workspace questions for ${agent.name}`);
        
        const questions = [];
        
        // Generate questions for each scoring dimension
        agent.scoringDimensions.forEach((dimension, index) => {
            questions.push({
                id: `q${index + 1}`,
                dimension: dimension.name,
                question: `How would you rate your ${dimension.name.toLowerCase()}?`,
                description: dimension.description,
                type: 'scale',
                scale: [0, 25, 50, 75, 100],
                weight: dimension.weight
            });
            
            // Add a text question for details
            questions.push({
                id: `q${index + 1}_detail`,
                dimension: dimension.name,
                question: `Describe your approach to ${dimension.name.toLowerCase()}:`,
                type: 'textarea',
                placeholder: `Provide specific examples of how you address ${dimension.name}...`,
                required: true
            });
        });
        
        return questions;
    }

    // Generate resource templates
    async generateResourceTemplates(agent, subcomponentId) {
        console.log(`📄 Generating resource templates for ${agent.name}`);
        
        const templates = [];
        
        // Generate templates based on agent expertise
        templates.push({
            name: `${agent.name} Assessment Template`,
            description: `Complete assessment framework for ${agent.description}`,
            type: 'assessment',
            sections: agent.scoringDimensions.map(dim => ({
                title: dim.name,
                weight: dim.weight,
                questions: this.generateDimensionQuestions(dim)
            }))
        });
        
        templates.push({
            name: `${agent.name} Action Plan`,
            description: `Step-by-step improvement plan based on assessment results`,
            type: 'action_plan',
            sections: [
                'Current State Analysis',
                'Gap Identification',
                'Improvement Roadmap',
                'Success Metrics',
                'Timeline and Milestones'
            ]
        });
        
        templates.push({
            name: `${agent.name} Best Practices Guide`,
            description: `Comprehensive guide to achieving excellence in ${agent.description}`,
            type: 'guide',
            sections: Object.entries(agent.evaluationCriteria).map(([range, description]) => ({
                level: this.getPerformanceLevel(range),
                description,
                practices: this.getLevelPractices(range)
            }))
        });
        
        return templates;
    }

    // Analyze workspace answers
    async analyzeWorkspaceAnswers(subcomponentId, answers) {
        console.log(`🔍 Analyzing workspace answers for ${subcomponentId}`);
        
        const agent = this.agents[subcomponentId];
        if (!agent) return null;
        
        let totalScore = 0;
        const dimensionScores = [];
        
        // Calculate scores for each dimension
        agent.scoringDimensions.forEach((dimension, index) => {
            const scaleAnswer = answers[`q${index + 1}`];
            const detailAnswer = answers[`q${index + 1}_detail`];
            
            // Calculate dimension score
            const score = this.calculateDimensionScore(scaleAnswer, detailAnswer, dimension);
            dimensionScores.push({
                dimension: dimension.name,
                score,
                weight: dimension.weight,
                feedback: this.generateDimensionFeedback(score, dimension)
            });
            
            // Add to total weighted score
            totalScore += (score * dimension.weight) / 100;
        });
        
        // Generate overall analysis
        const analysis = {
            totalScore,
            level: this.getScoreLevel(totalScore),
            dimensionScores,
            strengths: this.identifyStrengths(dimensionScores),
            improvements: this.identifyImprovements(dimensionScores),
            recommendations: this.generateRecommendations(totalScore, dimensionScores, agent),
            nextSteps: this.generateNextSteps(totalScore, agent)
        };
        
        // Save analysis to database
        await this.saveAnalysis(subcomponentId, analysis);
        
        // Log audit trail
        await this.logAuditTrail(agent, subcomponentId, 'workspace_analyzed', analysis);
        
        return analysis;
    }

    // Process templates with workspace data
    async processTemplatesWithData(subcomponentId, workspaceData, templates) {
        console.log(`⚙️ Processing templates with workspace data for ${subcomponentId}`);
        
        const outputs = [];
        
        for (const template of templates) {
            const output = await this.generateTemplateOutput(template, workspaceData);
            outputs.push(output);
        }
        
        // Save outputs to database
        await this.saveOutputs(subcomponentId, outputs);
        
        return outputs;
    }

    // Generate template output
    async generateTemplateOutput(template, workspaceData) {
        const output = {
            templateName: template.name,
            generatedAt: new Date().toISOString(),
            sections: []
        };
        
        // Process each template section with workspace data
        template.sections.forEach(section => {
            output.sections.push({
                title: typeof section === 'string' ? section : section.title,
                content: this.generateSectionContent(section, workspaceData)
            });
        });
        
        return output;
    }

    // Database operations
    async saveToDatabase(subcomponentId, data) {
        console.log(`💾 Saving to database for ${subcomponentId}`);
        
        // This would connect to your actual database
        // For now, we'll simulate with localStorage or API call
        try {
            const response = await fetch('/api/agent-content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    subcomponentId,
                    ...data
                })
            });
            
            return response.json();
        } catch (error) {
            console.error('Database save error:', error);
            // Fallback to localStorage
            localStorage.setItem(`agent_content_${subcomponentId}`, JSON.stringify(data));
        }
    }

    // Save analysis results
    async saveAnalysis(subcomponentId, analysis) {
        try {
            const response = await fetch('/api/analysis', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    subcomponentId,
                    analysis,
                    timestamp: new Date().toISOString()
                })
            });
            
            return response.json();
        } catch (error) {
            console.error('Analysis save error:', error);
            localStorage.setItem(`analysis_${subcomponentId}`, JSON.stringify(analysis));
        }
    }

    // Save generated outputs
    async saveOutputs(subcomponentId, outputs) {
        try {
            const response = await fetch('/api/outputs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    subcomponentId,
                    outputs,
                    timestamp: new Date().toISOString()
                })
            });
            
            return response.json();
        } catch (error) {
            console.error('Output save error:', error);
            localStorage.setItem(`outputs_${subcomponentId}`, JSON.stringify(outputs));
        }
    }

    // Audit trail logging
    async logAuditTrail(agent, subcomponentId, action, data = {}) {
        const auditEntry = {
            timestamp: new Date().toISOString(),
            agent: agent.name,
            agentId: agent.id,
            subcomponentId,
            action,
            blockNumber: parseInt(subcomponentId.split('-')[0]),
            data: JSON.stringify(data)
        };
        
        console.log(`📋 Audit Trail: ${agent.name} - ${action} for ${subcomponentId}`);
        
        try {
            await fetch('/api/audit-trail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(auditEntry)
            });
        } catch (error) {
            console.error('Audit logging error:', error);
            // Store locally as backup
            const auditLog = JSON.parse(localStorage.getItem('audit_trail') || '[]');
            auditLog.push(auditEntry);
            localStorage.setItem('audit_trail', JSON.stringify(auditLog));
        }
    }

    // Helper functions
    getPerformanceLevel(range) {
        const levels = {
            "0-25": "Poor",
            "26-50": "Basic",
            "51-75": "Good",
            "76-90": "Strong",
            "91-100": "Exceptional"
        };
        return levels[range] || "Unknown";
    }

    getScoreLevel(score) {
        if (score >= 91) return "Exceptional";
        if (score >= 76) return "Strong";
        if (score >= 51) return "Good";
        if (score >= 26) return "Basic";
        return "Poor";
    }

    calculateDimensionScore(scaleAnswer, detailAnswer, dimension) {
        // Base score from scale answer
        let score = parseInt(scaleAnswer) || 0;
        
        // Adjust based on detail quality
        if (detailAnswer && detailAnswer.length > 100) {
            score += 5; // Bonus for detailed answer
        }
        
        // Cap at 100
        return Math.min(score, 100);
    }

    generateDimensionFeedback(score, dimension) {
        if (score >= 76) {
            return `Excellent performance in ${dimension.name}. Continue refining and sharing best practices.`;
        } else if (score >= 51) {
            return `Good foundation in ${dimension.name}. Focus on consistency and depth.`;
        } else if (score >= 26) {
            return `Basic understanding of ${dimension.name}. Prioritize improvement in this area.`;
        } else {
            return `Critical gap in ${dimension.name}. Immediate attention required.`;
        }
    }

    identifyStrengths(dimensionScores) {
        return dimensionScores
            .filter(d => d.score >= 76)
            .map(d => d.dimension);
    }

    identifyImprovements(dimensionScores) {
        return dimensionScores
            .filter(d => d.score < 51)
            .map(d => ({
                dimension: d.dimension,
                currentScore: d.score,
                targetScore: 75,
                priority: d.score < 26 ? 'Critical' : 'Important'
            }));
    }

    generateRecommendations(totalScore, dimensionScores, agent) {
        const recommendations = [];
        
        // Add specific recommendations based on low-scoring dimensions
        dimensionScores
            .filter(d => d.score < 51)
            .forEach(d => {
                recommendations.push({
                    dimension: d.dimension,
                    action: `Improve ${d.dimension} from ${d.score}% to at least 75%`,
                    impact: 'High',
                    timeframe: d.score < 26 ? 'Immediate' : '30 days'
                });
            });
        
        // Add general recommendations based on total score
        if (totalScore < 51) {
            recommendations.push({
                dimension: 'Overall',
                action: 'Schedule intensive workshop to address fundamental gaps',
                impact: 'Critical',
                timeframe: 'This week'
            });
        }
        
        return recommendations;
    }

    generateNextSteps(totalScore, agent) {
        const steps = [];
        
        if (totalScore >= 76) {
            steps.push('Document and share your best practices');
            steps.push('Mentor others in your areas of strength');
            steps.push('Focus on optimization and scaling');
        } else if (totalScore >= 51) {
            steps.push('Identify top 2-3 improvement areas');
            steps.push('Create 30-day improvement plan');
            steps.push('Schedule weekly progress reviews');
        } else {
            steps.push('Conduct gap analysis immediately');
            steps.push('Engage expert consultation');
            steps.push('Implement daily improvement actions');
        }
        
        return steps;
    }

    generateDimensionQuestions(dimension) {
        return [
            `How do you currently address ${dimension.name}?`,
            `What challenges do you face with ${dimension.name}?`,
            `What resources do you need to improve ${dimension.name}?`,
            `How do you measure success in ${dimension.name}?`
        ];
    }

    getLevelPractices(range) {
        const practices = {
            "91-100": [
                'Industry-leading practices',
                'Continuous innovation',
                'Mentoring others',
                'Publishing thought leadership'
            ],
            "76-90": [
                'Consistent execution',
                'Regular optimization',
                'Proactive improvement',
                'Knowledge sharing'
            ],
            "51-75": [
                'Structured approach',
                'Regular reviews',
                'Documented processes',
                'Team alignment'
            ],
            "26-50": [
                'Basic processes in place',
                'Occasional reviews',
                'Some documentation',
                'Awareness of gaps'
            ],
            "0-25": [
                'Establish foundations',
                'Create basic processes',
                'Start documentation',
                'Identify quick wins'
            ]
        };
        
        return practices[range] || [];
    }

    getCharacteristics(agent, range) {
        // Generate characteristics based on agent and performance level
        const level = this.getPerformanceLevel(range);
        return [
            `${level} level of ${agent.scoringDimensions[0].name}`,
            `${level} approach to ${agent.scoringDimensions[1].name}`,
            `${level} execution of ${agent.scoringDimensions[2].name}`
        ];
    }

    generateSectionContent(section, workspaceData) {
        // Generate content based on section type and workspace data
        const content = [];
        
        if (typeof section === 'string') {
            // Simple section - generate based on workspace data
            content.push(`Based on your responses:`);
            content.push(`- Total Score: ${workspaceData.totalScore}%`);
            content.push(`- Performance Level: ${workspaceData.level}`);
        } else {
            // Complex section with structure
            content.push(`${section.title}:`);
            if (section.weight) {
                content.push(`Weight: ${section.weight}%`);
            }
            if (section.questions) {
                section.questions.forEach(q => {
                    content.push(`• ${q}`);
                });
            }
        }
        
        return content.join('\n');
    }

    // Generate generic educational content for any agent
    generateGenericEducationalContent(agent) {
        return {
            title: agent.name,
            what: `${agent.description}. This component evaluates ${agent.scoringDimensions.map(d => d.name).join(', ')}.`,
            why: `Excellence in ${agent.name} is critical for GTM success. ${agent.description}.`,
            how: this.generateImplementationSteps(agent),
            examples: this.generateExamples(agent),
            metrics: this.generateMetrics(agent),
            bestPractices: this.generateBestPractices(agent)
        };
    }
}

// Initialize the system
const agentSystem = new AgentIntegrationSystem();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AgentIntegrationSystem;
}

// Make available globally for browser use
if (typeof window !== 'undefined') {
    window.AgentIntegrationSystem = AgentIntegrationSystem;
    window.agentSystem = agentSystem;
}
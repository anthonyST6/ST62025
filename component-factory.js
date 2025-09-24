// ScaleOps6 Platform - Component Factory
// This factory ensures all components follow the locked template structure
// It prevents structural deviations while allowing content customization

class ComponentFactory {
    constructor() {
        // Load the locked template configuration
        this.template = window.TEMPLATE_CONFIG || require('./template-config.js');
        this.validateTemplateLoaded();
    }
    
    validateTemplateLoaded() {
        if (!this.template) {
            throw new Error('CRITICAL: Template configuration not loaded. Cannot create components without locked structure.');
        }
        console.log('✅ Component Factory initialized with locked template v' + this.template.version);
    }
    
    // Create a new subcomponent with locked structure
    createSubcomponent(customContent) {
        // Validate required custom content
        if (!customContent.title || !customContent.description) {
            throw new Error('Title and description are required for new subcomponent');
        }
        
        // Build subcomponent with locked structure
        const subcomponent = {
            // Metadata (customizable)
            title: customContent.title,
            description: customContent.description,
            id: customContent.id || this.generateId(customContent.title),
            
            // Page structure (LOCKED)
            pageLayout: { ...this.template.subcomponentStructure.pageLayout },
            
            // Tabs (LOCKED structure, customizable content)
            tabs: this.template.subcomponentStructure.tabs.map(tab => ({
                ...tab,
                // Only content within tabs can be customized
                content: customContent.tabContent?.[tab.id] || this.getDefaultTabContent(tab.id, customContent)
            })),
            
            // Worksheet (LOCKED structure, customizable labels/placeholders)
            worksheetFields: this.template.subcomponentStructure.worksheetFields.map(field => ({
                ...field,
                // Only labels and placeholders can be customized
                label: customContent.worksheetLabels?.[field.id] || field.label,
                placeholder: customContent.worksheetPlaceholders?.[field.id] || field.placeholder
            })),
            
            // Analysis display (LOCKED)
            analysisDisplay: { ...this.template.subcomponentStructure.analysisDisplay },
            
            // Score history display (LOCKED)
            scoreHistoryDisplay: { ...this.template.subcomponentStructure.scoreHistoryDisplay },
            
            // Agent (customizable logic, locked I/O format)
            agent: this.wrapAgent(customContent.agent),
            
            // Resources (customizable)
            resources: customContent.resources || this.getDefaultResources(),
            
            // Visual theme (LOCKED)
            theme: { ...this.template.visualTheme }
        };
        
        // Validate the created component
        this.validateSubcomponent(subcomponent);
        
        return subcomponent;
    }
    
    // Create a new block with locked structure
    createBlock(customContent) {
        if (!customContent.title || !customContent.description) {
            throw new Error('Title and description are required for new block');
        }
        
        const block = {
            // Metadata (customizable)
            title: customContent.title,
            description: customContent.description,
            id: customContent.id || this.generateId(customContent.title),
            number: customContent.number || 1,
            
            // Structure (LOCKED)
            structure: { ...this.template.blockStructure },
            
            // Subcomponents (customizable list, locked structure)
            subcomponents: (customContent.subcomponents || []).map(sub => 
                this.createSubcomponent(sub)
            ),
            
            // Score aggregation (LOCKED)
            scoreCalculation: 'average', // Always average of subcomponents
            
            // Visual theme (LOCKED)
            theme: { ...this.template.visualTheme }
        };
        
        this.validateBlock(block);
        return block;
    }
    
    // Wrap custom agent to ensure output format compliance
    wrapAgent(customAgent) {
        if (!customAgent) {
            return this.getDefaultAgent();
        }
        
        return {
            // Original agent logic
            analyze: async (worksheetData) => {
                // Call custom agent
                const result = await customAgent.analyze(worksheetData);
                
                // Validate and normalize output format
                return this.normalizeAgentOutput(result);
            },
            
            // Metadata
            name: customAgent.name || 'Custom Agent',
            version: customAgent.version || '1.0.0'
        };
    }
    
    // Ensure agent output matches locked format
    normalizeAgentOutput(output) {
        const normalized = {
            // Required fields
            score: this.validateScore(output.score),
            confidence: this.validateConfidence(output.confidence),
            timestamp: output.timestamp || new Date().toISOString(),
            
            // Analysis structure
            analysis: {
                executiveSummary: output.analysis?.executiveSummary || output.executiveSummary || '',
                strengthsAndWeaknesses: output.analysis?.strengthsAndWeaknesses || {},
                criticalGaps: output.analysis?.criticalGaps || [],
                opportunities: output.analysis?.opportunities || []
            },
            
            // Detailed scores (must be 5 dimensions)
            detailedScores: this.normalizeDetailedScores(output.detailedScores),
            
            // Recommendations
            recommendations: this.normalizeRecommendations(output.recommendations)
        };
        
        return normalized;
    }
    
    // Validate and normalize score
    validateScore(score) {
        const s = Number(score);
        if (isNaN(s) || s < 0 || s > 100) {
            console.warn('Invalid score:', score, '- defaulting to 50');
            return 50;
        }
        return Math.round(s);
    }
    
    // Validate and normalize confidence
    validateConfidence(confidence) {
        const c = Number(confidence);
        if (isNaN(c) || c < 0 || c > 1) {
            console.warn('Invalid confidence:', confidence, '- defaulting to 0.5');
            return 0.5;
        }
        return c;
    }
    
    // Normalize detailed scores to 5 dimensions
    normalizeDetailedScores(scores) {
        const normalized = {};
        const dimensions = Object.keys(scores || {});
        
        // Ensure exactly 5 dimensions
        if (dimensions.length !== 5) {
            console.warn('Expected 5 dimensions, got', dimensions.length, '- using defaults');
            return this.getDefaultDetailedScores();
        }
        
        dimensions.forEach(dim => {
            const dimScore = scores[dim];
            normalized[dim] = {
                score: Math.min(20, Math.max(0, dimScore.score || dimScore || 0)),
                maxScore: 20, // Always 20
                percentage: Math.round(((dimScore.score || dimScore || 0) / 20) * 100),
                weight: 20, // Always 20% weight
                feedback: dimScore.feedback || ''
            };
        });
        
        return normalized;
    }
    
    // Normalize recommendations format
    normalizeRecommendations(recommendations) {
        if (!Array.isArray(recommendations)) {
            return [];
        }
        
        return recommendations.slice(0, 5).map(rec => ({
            priority: rec.priority || 'MEDIUM',
            area: rec.area || rec.title || 'Improvement Area',
            actionPlan: Array.isArray(rec.actionPlan) ? rec.actionPlan : [],
            impact: rec.impact || '+5 points',
            expectedImprovement: rec.expectedImprovement || 5,
            resources: Array.isArray(rec.resources) ? rec.resources : [],
            successMetrics: Array.isArray(rec.successMetrics) ? rec.successMetrics : [],
            detailedAnalysis: rec.detailedAnalysis || {}
        }));
    }
    
    // Get default tab content based on tab ID
    getDefaultTabContent(tabId, customContent) {
        const defaults = {
            education: {
                sections: [
                    {
                        title: `What Makes a Great ${customContent.title}?`,
                        content: `Understanding the key elements of ${customContent.title.toLowerCase()}...`
                    },
                    {
                        title: 'Key Components',
                        content: 'The essential components to address...'
                    },
                    {
                        title: 'Common Pitfalls',
                        content: 'Avoid these common mistakes...'
                    },
                    {
                        title: 'Success Metrics',
                        content: 'How to measure success...'
                    },
                    {
                        title: 'Best Practices',
                        content: 'Industry best practices...'
                    }
                ]
            },
            workspace: {
                instructions: `Complete this worksheet to define your ${customContent.title.toLowerCase()}.`
            },
            analysis: {
                placeholder: 'Complete the worksheet and click "Analyze Results" to see AI-powered insights.'
            },
            resources: {
                templates: [
                    `${customContent.title} Template`,
                    `${customContent.title} Checklist`,
                    `${customContent.title} Examples`
                ],
                caseStudies: []
            },
            history: {
                enabled: true
            }
        };
        
        return defaults[tabId] || {};
    }
    
    // Get default resources
    getDefaultResources() {
        return {
            templates: [
                { name: 'Template 1', description: 'Ready-to-use template' },
                { name: 'Template 2', description: 'Advanced template' }
            ],
            links: [],
            documents: []
        };
    }
    
    // Get default agent
    getDefaultAgent() {
        return {
            analyze: async (worksheetData) => {
                // Simple default scoring
                const filledFields = Object.values(worksheetData).filter(v => v && v.length > 10).length;
                const score = Math.round((filledFields / 6) * 100);
                
                return {
                    score: score,
                    confidence: 0.5,
                    timestamp: new Date().toISOString(),
                    analysis: {
                        executiveSummary: 'Default analysis - please configure a custom agent for detailed insights.'
                    },
                    detailedScores: this.getDefaultDetailedScores(),
                    recommendations: []
                };
            },
            name: 'Default Agent',
            version: '1.0.0'
        };
    }
    
    // Get default detailed scores
    getDefaultDetailedScores() {
        return {
            dimension1: { score: 10, maxScore: 20, percentage: 50, weight: 20, feedback: '' },
            dimension2: { score: 10, maxScore: 20, percentage: 50, weight: 20, feedback: '' },
            dimension3: { score: 10, maxScore: 20, percentage: 50, weight: 20, feedback: '' },
            dimension4: { score: 10, maxScore: 20, percentage: 50, weight: 20, feedback: '' },
            dimension5: { score: 10, maxScore: 20, percentage: 50, weight: 20, feedback: '' }
        };
    }
    
    // Validate subcomponent structure
    validateSubcomponent(subcomponent) {
        const errors = [];
        
        // Check tabs
        if (!subcomponent.tabs || subcomponent.tabs.length !== 5) {
            errors.push('Subcomponent must have exactly 5 tabs');
        }
        
        // Check worksheet fields
        if (!subcomponent.worksheetFields || subcomponent.worksheetFields.length !== 6) {
            errors.push('Subcomponent must have exactly 6 worksheet fields');
        }
        
        // Check required properties
        if (!subcomponent.title || !subcomponent.description) {
            errors.push('Subcomponent must have title and description');
        }
        
        if (errors.length > 0) {
            throw new Error('Subcomponent validation failed:\n' + errors.join('\n'));
        }
        
        return true;
    }
    
    // Validate block structure
    validateBlock(block) {
        const errors = [];
        
        // Check required properties
        if (!block.title || !block.description) {
            errors.push('Block must have title and description');
        }
        
        // Check structure
        if (!block.structure || !block.structure.header || !block.structure.scoreDisplay) {
            errors.push('Block must have complete structure from template');
        }
        
        if (errors.length > 0) {
            throw new Error('Block validation failed:\n' + errors.join('\n'));
        }
        
        return true;
    }
    
    // Generate ID from title
    generateId(title) {
        return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
    
    // Clone a component with new content
    cloneWithContent(original, newContent) {
        if (original.tabs) {
            // It's a subcomponent
            return this.createSubcomponent({
                ...original,
                ...newContent
            });
        } else if (original.subcomponents) {
            // It's a block
            return this.createBlock({
                ...original,
                ...newContent
            });
        }
        
        throw new Error('Unknown component type');
    }
}

// Singleton instance
const componentFactory = new ComponentFactory();

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = componentFactory;
}

// Make available globally
window.componentFactory = componentFactory;

console.log('✅ Component Factory ready - all new components will follow locked structure');
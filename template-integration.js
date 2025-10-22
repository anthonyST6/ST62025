/**
 * Template Integration Module
 * Integrates the template system with the analysis engine and data flow
 * Ensures templates are populated with analysis results and user data
 */

const TemplateRegistry = require('./template-registry');
const TemplateSchema = require('./template-schema');
const TemplateGenerator = require('./template-generator');

class TemplateIntegration {
    constructor() {
        this.registry = new TemplateRegistry();
        this.schema = new TemplateSchema();
        this.generator = new TemplateGenerator();
        this.analysisCache = new Map();
    }

    /**
     * Integrate analysis results with template
     * Called after analysis is complete to populate template with findings
     */
    integrateAnalysisResults(subcomponentId, analysisData, userData = {}) {
        console.log(`📊 Integrating analysis results for ${subcomponentId}`);

        try {
            // Get the template definition
            const templateDef = this.registry.getTemplate(subcomponentId);
            if (!templateDef) {
                console.error(`❌ No template found for ${subcomponentId}`);
                return null;
            }

            // Get the schema for this template type
            const schema = this.schema.getSchema(templateDef.type);
            if (!schema) {
                console.error(`❌ No schema found for template type ${templateDef.type}`);
                return null;
            }

            // Create populated template
            const populatedTemplate = {
                id: subcomponentId,
                templateId: templateDef.id,
                templateName: templateDef.name,
                templateType: templateDef.type,
                blockId: templateDef.blockId,
                blockName: templateDef.blockName,
                createdAt: new Date().toISOString(),
                version: '1.0',
                status: 'draft',
                
                // Permanent fields from schema
                permanentFields: this._populatePermanentFields(schema, analysisData, userData),
                
                // Analysis-driven sections
                analysisResults: this._extractAnalysisResults(analysisData),
                
                // Customizable sections
                customizableFields: this._initializeCustomizableFields(schema),
                
                // Metadata
                metadata: {
                    analysisScore: analysisData.score || 0,
                    analysisDate: new Date().toISOString(),
                    userId: userData.userId || 'unknown',
                    companyName: userData.companyName || 'Your Company',
                    industry: userData.industry || 'Technology',
                    stage: userData.stage || 'Early Stage'
                }
            };

            // Cache the populated template
            this.analysisCache.set(subcomponentId, populatedTemplate);

            console.log(`✅ Template populated for ${subcomponentId}`);
            return populatedTemplate;
        } catch (error) {
            console.error(`❌ Error integrating analysis results: ${error.message}`);
            return null;
        }
    }

    /**
     * Populate permanent fields from schema with analysis data
     */
    _populatePermanentFields(schema, analysisData, userData) {
        const populated = {};

        // Executive Summary
        if (schema.sections.executiveSummary) {
            populated.executiveSummary = {
                overview: this._generateExecutiveSummary(analysisData),
                keyFindings: analysisData.recommendations ? analysisData.recommendations.slice(0, 3) : [],
                score: analysisData.score || 0,
                scorePercentage: `${Math.round((analysisData.score / 100) * 100)}%`
            };
        }

        // Current State Assessment
        if (schema.sections.currentState) {
            populated.currentState = {
                strengths: this._extractStrengths(analysisData),
                weaknesses: this._extractWeaknesses(analysisData),
                opportunities: this._extractOpportunities(analysisData),
                threats: this._extractThreats(analysisData)
            };
        }

        // Detailed Scoring
        if (schema.sections.detailedScoring) {
            populated.detailedScoring = analysisData.detailedScores || {};
        }

        // Recommendations
        if (schema.sections.recommendations) {
            populated.recommendations = this._formatRecommendations(analysisData.recommendations || []);
        }

        // Implementation Roadmap
        if (schema.sections.implementationRoadmap) {
            populated.implementationRoadmap = this._generateImplementationRoadmap(analysisData);
        }

        return populated;
    }

    /**
     * Extract analysis results for template
     */
    _extractAnalysisResults(analysisData) {
        return {
            overallScore: analysisData.score || 0,
            dimensionScores: analysisData.detailedScores || {},
            recommendations: analysisData.recommendations || [],
            keyInsights: analysisData.keyInsights || [],
            nextSteps: analysisData.nextSteps || [],
            analysisDate: new Date().toISOString()
        };
    }

    /**
     * Initialize customizable fields for user input
     */
    _initializeCustomizableFields(schema) {
        const customizable = {};

        if (schema.customizableFields) {
            schema.customizableFields.forEach(field => {
                customizable[field.name] = {
                    label: field.label,
                    type: field.type,
                    value: field.defaultValue || '',
                    placeholder: field.placeholder || '',
                    required: field.required || false,
                    helpText: field.helpText || ''
                };
            });
        }

        return customizable;
    }

    /**
     * Generate executive summary from analysis
     */
    _generateExecutiveSummary(analysisData) {
        const score = analysisData.score || 0;
        let assessment = '';

        if (score >= 80) {
            assessment = 'Excellent - Strong execution and comprehensive coverage';
        } else if (score >= 60) {
            assessment = 'Good - Solid foundation with opportunities for improvement';
        } else if (score >= 40) {
            assessment = 'Fair - Foundational elements in place, significant development needed';
        } else {
            assessment = 'Needs Development - Early stage, requires focused attention';
        }

        return `Based on comprehensive analysis, your organization scores ${score}% on this dimension. ${assessment}. This template provides a roadmap for improvement and best practices for implementation.`;
    }

    /**
     * Extract strengths from analysis
     */
    _extractStrengths(analysisData) {
        if (analysisData.detailedScores) {
            return Object.entries(analysisData.detailedScores)
                .filter(([_, data]) => data.score >= 15)
                .map(([dimension, data]) => ({
                    area: dimension,
                    score: data.score,
                    description: data.feedback || ''
                }));
        }
        return [];
    }

    /**
     * Extract weaknesses from analysis
     */
    _extractWeaknesses(analysisData) {
        if (analysisData.detailedScores) {
            return Object.entries(analysisData.detailedScores)
                .filter(([_, data]) => data.score < 10)
                .map(([dimension, data]) => ({
                    area: dimension,
                    score: data.score,
                    description: data.feedback || ''
                }));
        }
        return [];
    }

    /**
     * Extract opportunities from recommendations
     */
    _extractOpportunities(analysisData) {
        if (analysisData.recommendations) {
            return analysisData.recommendations
                .filter(rec => rec.priority === 'high')
                .slice(0, 3)
                .map(rec => ({
                    opportunity: rec.area,
                    impact: rec.impact,
                    effort: rec.effort || 'Medium'
                }));
        }
        return [];
    }

    /**
     * Extract threats from analysis
     */
    _extractThreats(analysisData) {
        if (analysisData.recommendations) {
            return analysisData.recommendations
                .filter(rec => rec.priority === 'critical')
                .slice(0, 2)
                .map(rec => ({
                    threat: rec.area,
                    impact: rec.impact,
                    mitigation: `Address ${rec.area} to improve overall readiness`
                }));
        }
        return [];
    }

    /**
     * Format recommendations for template
     */
    _formatRecommendations(recommendations) {
        return recommendations.map((rec, index) => ({
            id: index + 1,
            area: rec.area,
            priority: rec.priority || 'medium',
            impact: rec.impact || 'Moderate',
            description: rec.description || '',
            actionItems: rec.actionItems || [],
            estimatedEffort: rec.effort || 'Medium',
            expectedOutcome: rec.expectedOutcome || ''
        }));
    }

    /**
     * Generate implementation roadmap
     */
    _generateImplementationRoadmap(analysisData) {
        const recommendations = analysisData.recommendations || [];
        const phases = [];

        // Phase 1: Critical items (next 30 days)
        const critical = recommendations.filter(r => r.priority === 'critical');
        if (critical.length > 0) {
            phases.push({
                phase: 1,
                name: 'Immediate Actions (0-30 days)',
                duration: '30 days',
                items: critical.slice(0, 3),
                successMetrics: ['Address critical gaps', 'Establish baseline processes']
            });
        }

        // Phase 2: High priority items (30-90 days)
        const high = recommendations.filter(r => r.priority === 'high');
        if (high.length > 0) {
            phases.push({
                phase: 2,
                name: 'Foundation Building (30-90 days)',
                duration: '60 days',
                items: high.slice(0, 3),
                successMetrics: ['Implement core processes', 'Build team capability']
            });
        }

        // Phase 3: Medium priority items (90-180 days)
        const medium = recommendations.filter(r => r.priority === 'medium');
        if (medium.length > 0) {
            phases.push({
                phase: 3,
                name: 'Optimization (90-180 days)',
                duration: '90 days',
                items: medium.slice(0, 3),
                successMetrics: ['Optimize processes', 'Measure impact']
            });
        }

        return phases;
    }

    /**
     * Get populated template for display/download
     */
    getPopulatedTemplate(subcomponentId) {
        return this.analysisCache.get(subcomponentId) || null;
    }

    /**
     * Update customizable fields in template
     */
    updateCustomizableFields(subcomponentId, updates) {
        const template = this.analysisCache.get(subcomponentId);
        if (!template) {
            console.error(`❌ Template not found for ${subcomponentId}`);
            return null;
        }

        // Update customizable fields
        Object.keys(updates).forEach(fieldName => {
            if (template.customizableFields[fieldName]) {
                template.customizableFields[fieldName].value = updates[fieldName];
            }
        });

        template.lastModified = new Date().toISOString();
        this.analysisCache.set(subcomponentId, template);

        console.log(`✅ Updated customizable fields for ${subcomponentId}`);
        return template;
    }

    /**
     * Generate template in specified format
     */
    generateTemplateOutput(subcomponentId, format = 'json') {
        const template = this.analysisCache.get(subcomponentId);
        if (!template) {
            console.error(`❌ Template not found for ${subcomponentId}`);
            return null;
        }

        return this.generator.generate(template, format);
    }

    /**
     * Get all templates for a block
     */
    getBlockTemplates(blockId) {
        const templates = [];
        this.analysisCache.forEach((template, key) => {
            if (template.blockId === blockId) {
                templates.push(template);
            }
        });
        return templates;
    }

    /**
     * Clear template cache
     */
    clearCache() {
        this.analysisCache.clear();
        console.log('✅ Template cache cleared');
    }
}

module.exports = TemplateIntegration;

/**
 * Template Generator
 * Converts registry + analysis data into downloadable template outputs
 * Supports PDF, DOCX, and JSON formats
 */

const fs = require('fs');
const path = require('path');

class TemplateGenerator {
    constructor() {
        this.registry = require('./template-registry');
        this.schema = require('./template-schema');
    }

    /**
     * Generate a template for a specific subcomponent
     * @param {string} subcomponentId - Format: "1-1", "2-3", etc.
     * @param {object} analysisData - Data from analysis engine
     * @param {string} format - Output format: 'json', 'pdf', 'docx'
     * @returns {object} Generated template with metadata
     */
    generateTemplate(subcomponentId, analysisData = {}, format = 'json') {
        console.log(`📋 Generating ${format.toUpperCase()} template for ${subcomponentId}`);

        // Get template definition from registry
        const templateDef = this.registry.getTemplate(subcomponentId);
        if (!templateDef) {
            throw new Error(`Template not found for subcomponent ${subcomponentId}`);
        }

        // Get schema for this template type
        const templateSchema = this.schema.getSchema(templateDef.type);
        if (!templateSchema) {
            throw new Error(`Schema not found for template type ${templateDef.type}`);
        }

        // Build template content
        const templateContent = this._buildTemplateContent(
            templateDef,
            templateSchema,
            analysisData
        );

        // Format output based on requested format
        let output;
        switch (format.toLowerCase()) {
            case 'json':
                output = this._formatJSON(templateContent);
                break;
            case 'pdf':
                output = this._formatPDF(templateContent);
                break;
            case 'docx':
                output = this._formatDOCX(templateContent);
                break;
            default:
                output = this._formatJSON(templateContent);
        }

        return {
            success: true,
            subcomponentId,
            templateName: templateDef.name,
            format,
            content: output,
            metadata: {
                generatedAt: new Date().toISOString(),
                version: templateDef.version,
                type: templateDef.type,
                block: templateDef.block,
                customizable: templateDef.customizable
            }
        };
    }

    /**
     * Build complete template content with all sections
     */
    _buildTemplateContent(templateDef, templateSchema, analysisData) {
        const content = {
            header: this._buildHeader(templateDef),
            sections: {},
            footer: this._buildFooter(templateDef)
        };

        // Build each section from schema
        templateSchema.sections.forEach(section => {
            content.sections[section.id] = this._buildSection(
                section,
                templateDef,
                analysisData
            );
        });

        return content;
    }

    /**
     * Build header section
     */
    _buildHeader(templateDef) {
        return {
            title: templateDef.name,
            subtitle: templateDef.description,
            block: `Block ${templateDef.block}`,
            blockName: this._getBlockName(templateDef.block),
            generatedDate: new Date().toLocaleDateString(),
            version: templateDef.version,
            instructions: `This template is designed to help you implement ${templateDef.name}. Fill in each section with your specific information, examples, and metrics.`
        };
    }

    /**
     * Build individual section
     */
    _buildSection(section, templateDef, analysisData) {
        const sectionContent = {
            id: section.id,
            title: section.title,
            description: section.description,
            fields: {},
            guidance: section.guidance || '',
            examples: section.examples || []
        };

        // Add customizable fields
        if (section.fields) {
            section.fields.forEach(field => {
                sectionContent.fields[field.id] = {
                    label: field.label,
                    type: field.type,
                    required: field.required,
                    placeholder: field.placeholder || '',
                    value: analysisData[field.id] || '',
                    validation: field.validation || null,
                    help: field.help || ''
                };
            });
        }

        return sectionContent;
    }

    /**
     * Build footer section
     */
    _buildFooter(templateDef) {
        return {
            nextSteps: [
                'Review all sections for completeness',
                'Validate metrics and data accuracy',
                'Share with team for feedback',
                'Implement recommendations',
                'Track progress and update regularly'
            ],
            resources: [
                { title: 'Implementation Guide', type: 'pdf' },
                { title: 'Best Practices', type: 'doc' },
                { title: 'Case Studies', type: 'pdf' },
                { title: 'Metrics Dashboard', type: 'link' }
            ],
            support: {
                documentation: 'https://docs.scaleops6.com',
                community: 'https://community.scaleops6.com',
                support: 'support@scaleops6.com'
            }
        };
    }

    /**
     * Format template as JSON
     */
    _formatJSON(templateContent) {
        return JSON.stringify(templateContent, null, 2);
    }

    /**
     * Format template as PDF (placeholder - would use library like pdfkit)
     */
    _formatPDF(templateContent) {
        // In production, use pdfkit or similar library
        return {
            type: 'pdf',
            content: templateContent,
            note: 'PDF generation requires pdfkit library'
        };
    }

    /**
     * Format template as DOCX (placeholder - would use library like docx)
     */
    _formatDOCX(templateContent) {
        // In production, use docx or similar library
        return {
            type: 'docx',
            content: templateContent,
            note: 'DOCX generation requires docx library'
        };
    }

    /**
     * Get block name from block ID
     */
    _getBlockName(blockId) {
        const blockNames = {
            1: 'Mission Discovery',
            2: 'Customer Insights',
            3: 'Strategic Prioritization',
            4: 'Prototype Launch',
            5: 'Early Adopter Wins',
            6: 'Customer Engagement Flywheel',
            7: 'Quantifiable Impact',
            8: 'Customer Success Expansion',
            9: 'Proof Execution',
            10: 'Sales Team Empowerment',
            11: 'High Performance Teams',
            12: 'Retention Systems',
            13: 'Market Domination Strategies',
            14: 'Operational Infrastructure',
            15: 'Leadership Expansion',
            16: 'Global & Expansion Opportunities'
        };
        return blockNames[blockId] || 'Unknown Block';
    }

    /**
     * Generate preview of template (lightweight version for UI)
     */
    generatePreview(subcomponentId, analysisData = {}) {
        console.log(`👁️ Generating preview for ${subcomponentId}`);

        const templateDef = this.registry.getTemplate(subcomponentId);
        if (!templateDef) {
            throw new Error(`Template not found for subcomponent ${subcomponentId}`);
        }

        return {
            subcomponentId,
            templateName: templateDef.name,
            description: templateDef.description,
            preview: {
                title: templateDef.name,
                sections: templateDef.sections.slice(0, 3), // Show first 3 sections
                totalSections: templateDef.sections.length,
                estimatedTime: `${templateDef.sections.length * 5}-${templateDef.sections.length * 10} minutes`
            },
            actions: [
                { label: 'Download as JSON', format: 'json' },
                { label: 'Download as PDF', format: 'pdf' },
                { label: 'Download as DOCX', format: 'docx' },
                { label: 'Edit Online', action: 'edit' }
            ]
        };
    }

    /**
     * Batch generate templates for multiple subcomponents
     */
    generateBatch(subcomponentIds, analysisDataMap = {}, format = 'json') {
        console.log(`📦 Batch generating ${subcomponentIds.length} templates`);

        const results = [];
        const errors = [];

        subcomponentIds.forEach(subcomponentId => {
            try {
                const analysisData = analysisDataMap[subcomponentId] || {};
                const template = this.generateTemplate(subcomponentId, analysisData, format);
                results.push(template);
            } catch (error) {
                errors.push({
                    subcomponentId,
                    error: error.message
                });
            }
        });

        return {
            success: errors.length === 0,
            generated: results.length,
            failed: errors.length,
            results,
            errors: errors.length > 0 ? errors : undefined
        };
    }

    /**
     * Get all available templates for a block
     */
    getBlockTemplates(blockId) {
        console.log(`📚 Retrieving all templates for Block ${blockId}`);

        const templates = this.registry.getTemplatesByBlock(blockId);
        return {
            blockId,
            blockName: this._getBlockName(blockId),
            templates: templates.map(t => ({
                id: t.id,
                name: t.name,
                description: t.description,
                type: t.type,
                customizable: t.customizable,
                sections: t.sections.length
            }))
        };
    }

    /**
     * Validate template data against schema
     */
    validateTemplate(subcomponentId, templateData) {
        console.log(`✓ Validating template for ${subcomponentId}`);

        const templateDef = this.registry.getTemplate(subcomponentId);
        const templateSchema = this.schema.getSchema(templateDef.type);

        const validation = {
            valid: true,
            errors: [],
            warnings: []
        };

        // Validate each section
        templateSchema.sections.forEach(section => {
            if (!templateData.sections || !templateData.sections[section.id]) {
                validation.warnings.push(`Section ${section.id} is missing`);
                return;
            }

            const sectionData = templateData.sections[section.id];

            // Validate required fields
            if (section.fields) {
                section.fields.forEach(field => {
                    if (field.required && !sectionData.fields[field.id]?.value) {
                        validation.valid = false;
                        validation.errors.push(
                            `Required field ${field.label} in section ${section.title} is missing`
                        );
                    }
                });
            }
        });

        return validation;
    }
}

module.exports = TemplateGenerator;

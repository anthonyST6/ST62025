/**
 * Template API Routes
 * Endpoints for retrieving, generating, and downloading templates
 * Integrates with Template Registry, Schema, and Generator
 */

const express = require('express');
const router = express.Router();
const TemplateRegistry = require('./template-registry');
const TemplateSchema = require('./template-schema');
const TemplateGenerator = require('./template-generator');
const fs = require('fs');
const path = require('path');

// Initialize template system
const registry = new TemplateRegistry();
const schema = new TemplateSchema();
const generator = new TemplateGenerator();

/**
 * GET /api/templates
 * List all available templates with metadata
 */
router.get('/templates', (req, res) => {
    try {
        const templates = registry.getAllTemplates();
        res.json({
            success: true,
            count: templates.length,
            templates: templates.map(t => ({
                id: t.id,
                subcomponentId: t.subcomponentId,
                name: t.name,
                description: t.description,
                category: t.category,
                version: t.version,
                formats: t.formats,
                lastUpdated: t.lastUpdated
            }))
        });
    } catch (error) {
        console.error('Error fetching templates:', error);
        res.status(500).json({ error: 'Failed to fetch templates' });
    }
});

/**
 * GET /api/templates/:subcomponentId
 * Get template metadata for a specific subcomponent
 */
router.get('/templates/:subcomponentId', (req, res) => {
    try {
        const { subcomponentId } = req.params;
        const template = registry.getTemplate(subcomponentId);
        
        if (!template) {
            return res.status(404).json({ error: 'Template not found' });
        }
        
        res.json({
            success: true,
            template: {
                id: template.id,
                subcomponentId: template.subcomponentId,
                name: template.name,
                description: template.description,
                category: template.category,
                version: template.version,
                formats: template.formats,
                fields: schema.getSchemaForTemplate(template.id),
                lastUpdated: template.lastUpdated
            }
        });
    } catch (error) {
        console.error('Error fetching template:', error);
        res.status(500).json({ error: 'Failed to fetch template' });
    }
});

/**
 * POST /api/templates/:subcomponentId/preview
 * Generate a preview of the template with provided data
 */
router.post('/templates/:subcomponentId/preview', (req, res) => {
    try {
        const { subcomponentId } = req.params;
        const { data, format = 'html' } = req.body;
        
        const template = registry.getTemplate(subcomponentId);
        if (!template) {
            return res.status(404).json({ error: 'Template not found' });
        }
        
        // Generate preview
        const preview = generator.generatePreview(template, data, format);
        
        res.json({
            success: true,
            preview: preview,
            format: format,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error generating preview:', error);
        res.status(500).json({ error: 'Failed to generate preview' });
    }
});

/**
 * POST /api/templates/:subcomponentId/generate
 * Generate a complete template with analysis data
 */
router.post('/templates/:subcomponentId/generate', (req, res) => {
    try {
        const { subcomponentId } = req.params;
        const { analysisData, format = 'pdf', customFields = {} } = req.body;
        const userId = req.headers['x-user-id'] || 1;
        
        const template = registry.getTemplate(subcomponentId);
        if (!template) {
            return res.status(404).json({ error: 'Template not found' });
        }
        
        // Merge analysis data with custom fields
        const mergedData = {
            ...analysisData,
            ...customFields,
            generatedAt: new Date().toISOString(),
            userId: userId
        };
        
        // Generate template
        const generated = generator.generateTemplate(template, mergedData, format);
        
        res.json({
            success: true,
            templateId: template.id,
            subcomponentId: subcomponentId,
            format: format,
            content: generated.content,
            metadata: {
                version: template.version,
                generatedAt: new Date().toISOString(),
                userId: userId,
                size: generated.content.length
            }
        });
    } catch (error) {
        console.error('Error generating template:', error);
        res.status(500).json({ error: 'Failed to generate template' });
    }
});

/**
 * POST /api/templates/:subcomponentId/download
 * Download template in specified format
 */
router.post('/templates/:subcomponentId/download', (req, res) => {
    try {
        const { subcomponentId } = req.params;
        const { analysisData, format = 'pdf', filename } = req.body;
        const userId = req.headers['x-user-id'] || 1;
        
        const template = registry.getTemplate(subcomponentId);
        if (!template) {
            return res.status(404).json({ error: 'Template not found' });
        }
        
        // Merge data
        const mergedData = {
            ...analysisData,
            generatedAt: new Date().toISOString(),
            userId: userId
        };
        
        // Generate template
        const generated = generator.generateTemplate(template, mergedData, format);
        
        // Set response headers
        const downloadFilename = filename || `${subcomponentId}-template.${getFileExtension(format)}`;
        res.setHeader('Content-Type', getMimeType(format));
        res.setHeader('Content-Disposition', `attachment; filename="${downloadFilename}"`);
        res.setHeader('Content-Length', generated.content.length);
        
        // Send file
        res.send(generated.content);
        
        // Log download
        console.log(`📥 Template downloaded: ${subcomponentId} (${format}) by user ${userId}`);
    } catch (error) {
        console.error('Error downloading template:', error);
        res.status(500).json({ error: 'Failed to download template' });
    }
});

/**
 * GET /api/templates/:subcomponentId/schema
 * Get the schema/structure for a template
 */
router.get('/templates/:subcomponentId/schema', (req, res) => {
    try {
        const { subcomponentId } = req.params;
        const template = registry.getTemplate(subcomponentId);
        
        if (!template) {
            return res.status(404).json({ error: 'Template not found' });
        }
        
        const templateSchema = schema.getSchemaForTemplate(template.id);
        
        res.json({
            success: true,
            templateId: template.id,
            subcomponentId: subcomponentId,
            schema: templateSchema,
            requiredFields: templateSchema.filter(f => f.required).map(f => f.name),
            optionalFields: templateSchema.filter(f => !f.required).map(f => f.name)
        });
    } catch (error) {
        console.error('Error fetching schema:', error);
        res.status(500).json({ error: 'Failed to fetch schema' });
    }
});

/**
 * GET /api/templates/versions/:subcomponentId
 * Get version history for a template
 */
router.get('/templates/versions/:subcomponentId', (req, res) => {
    try {
        const { subcomponentId } = req.params;
        const template = registry.getTemplate(subcomponentId);
        
        if (!template) {
            return res.status(404).json({ error: 'Template not found' });
        }
        
        const versions = registry.getTemplateVersions(subcomponentId);
        
        res.json({
            success: true,
            subcomponentId: subcomponentId,
            currentVersion: template.version,
            versions: versions
        });
    } catch (error) {
        console.error('Error fetching versions:', error);
        res.status(500).json({ error: 'Failed to fetch versions' });
    }
});

/**
 * POST /api/templates/:subcomponentId/validate
 * Validate data against template schema
 */
router.post('/templates/:subcomponentId/validate', (req, res) => {
    try {
        const { subcomponentId } = req.params;
        const { data } = req.body;
        
        const template = registry.getTemplate(subcomponentId);
        if (!template) {
            return res.status(404).json({ error: 'Template not found' });
        }
        
        const templateSchema = schema.getSchemaForTemplate(template.id);
        const validation = schema.validateData(data, templateSchema);
        
        res.json({
            success: validation.isValid,
            valid: validation.isValid,
            errors: validation.errors || [],
            warnings: validation.warnings || [],
            missingFields: validation.missingFields || []
        });
    } catch (error) {
        console.error('Error validating data:', error);
        res.status(500).json({ error: 'Failed to validate data' });
    }
});

/**
 * GET /api/templates/categories
 * Get all template categories
 */
router.get('/templates/categories', (req, res) => {
    try {
        const categories = registry.getCategories();
        
        res.json({
            success: true,
            categories: categories
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

/**
 * GET /api/templates/by-category/:category
 * Get all templates in a specific category
 */
router.get('/templates/by-category/:category', (req, res) => {
    try {
        const { category } = req.params;
        const templates = registry.getTemplatesByCategory(category);
        
        res.json({
            success: true,
            category: category,
            count: templates.length,
            templates: templates
        });
    } catch (error) {
        console.error('Error fetching templates by category:', error);
        res.status(500).json({ error: 'Failed to fetch templates' });
    }
});

/**
 * Helper function to get file extension based on format
 */
function getFileExtension(format) {
    const extensions = {
        'pdf': 'pdf',
        'docx': 'docx',
        'json': 'json',
        'html': 'html',
        'markdown': 'md'
    };
    return extensions[format] || 'txt';
}

/**
 * Helper function to get MIME type based on format
 */
function getMimeType(format) {
    const mimeTypes = {
        'pdf': 'application/pdf',
        'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'json': 'application/json',
        'html': 'text/html',
        'markdown': 'text/markdown'
    };
    return mimeTypes[format] || 'text/plain';
}

module.exports = router;

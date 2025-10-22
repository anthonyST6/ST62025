/**
 * Template Preview & Download System
 * Enables real-time preview before download and supports multiple output formats
 */

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const PDFDocument = require('pdfkit');

class TemplatePreviewDownloadSystem {
    constructor() {
        this.previewCache = new Map();
        this.downloadQueue = [];
    }

    /**
     * Generate real-time preview of template with analysis data
     */
    generatePreview(subcomponentId, analysisData, templateData) {
        const cacheKey = `${subcomponentId}_${Date.now()}`;
        
        try {
            const preview = {
                id: cacheKey,
                subcomponentId: subcomponentId,
                templateName: templateData.name,
                templateDescription: templateData.description,
                generatedAt: new Date().toISOString(),
                sections: this.buildPreviewSections(templateData, analysisData),
                metadata: {
                    format: 'html',
                    pages: Math.ceil(Object.keys(templateData.sections || {}).length / 3),
                    estimatedDownloadSize: '2-5 MB'
                }
            };

            // Cache preview for 30 minutes
            this.previewCache.set(cacheKey, preview);
            setTimeout(() => this.previewCache.delete(cacheKey), 30 * 60 * 1000);

            return preview;
        } catch (error) {
            console.error('Error generating preview:', error);
            throw error;
        }
    }

    /**
     * Build preview sections with analysis data populated
     */
    buildPreviewSections(templateData, analysisData) {
        const sections = {};

        // Executive Summary
        sections.executiveSummary = {
            title: 'Executive Summary',
            content: this.generateExecutiveSummary(templateData, analysisData),
            editable: true
        };

        // Current State Assessment
        sections.currentState = {
            title: 'Current State Assessment',
            content: this.generateCurrentState(analysisData),
            editable: false
        };

        // Recommendations
        sections.recommendations = {
            title: 'Recommendations',
            content: this.generateRecommendations(analysisData),
            editable: true
        };

        // Implementation Roadmap
        sections.roadmap = {
            title: 'Implementation Roadmap',
            content: this.generateRoadmap(templateData),
            editable: true
        };

        // Success Metrics
        sections.metrics = {
            title: 'Success Metrics',
            content: this.generateMetrics(templateData, analysisData),
            editable: true
        };

        // Resources & Templates
        sections.resources = {
            title: 'Resources & Templates',
            content: this.generateResources(templateData),
            editable: false
        };

        return sections;
    }

    /**
     * Generate executive summary from analysis
     */
    generateExecutiveSummary(templateData, analysisData) {
        return {
            overview: `This template provides a comprehensive framework for ${templateData.name}. Based on your analysis score of ${analysisData.score}%, this document outlines current state, recommendations, and implementation roadmap.`,
            keyFindings: analysisData.recommendations ? analysisData.recommendations.slice(0, 3).map(r => r.area) : [],
            nextSteps: [
                'Review current state assessment',
                'Prioritize recommendations by impact',
                'Develop implementation timeline',
                'Assign ownership and accountability'
            ]
        };
    }

    /**
     * Generate current state from analysis
     */
    generateCurrentState(analysisData) {
        return {
            score: analysisData.score,
            scorePercentage: `${analysisData.score}%`,
            strengths: analysisData.detailedScores ? 
                Object.entries(analysisData.detailedScores)
                    .filter(([_, data]) => data.score >= 15)
                    .map(([key, data]) => `${key}: ${data.score}/20`)
                : [],
            areasForImprovement: analysisData.detailedScores ?
                Object.entries(analysisData.detailedScores)
                    .filter(([_, data]) => data.score < 15)
                    .map(([key, data]) => `${key}: ${data.score}/20`)
                : [],
            trend: analysisData.trend || 'stable'
        };
    }

    /**
     * Generate recommendations section
     */
    generateRecommendations(analysisData) {
        if (!analysisData.recommendations) {
            return {
                items: [],
                note: 'No recommendations available'
            };
        }

        return {
            items: analysisData.recommendations.map((rec, index) => ({
                priority: index + 1,
                area: rec.area,
                impact: rec.impact,
                priority_level: rec.priority,
                actionItems: [
                    `Assess current ${rec.area.toLowerCase()} capabilities`,
                    `Identify gaps and opportunities`,
                    `Develop implementation plan`,
                    `Execute and measure results`
                ]
            })),
            totalRecommendations: analysisData.recommendations.length
        };
    }

    /**
     * Generate implementation roadmap
     */
    generateRoadmap(templateData) {
        return {
            phases: [
                {
                    phase: 1,
                    name: 'Assessment & Planning',
                    duration: '2-4 weeks',
                    activities: [
                        'Conduct stakeholder interviews',
                        'Document current processes',
                        'Identify quick wins',
                        'Create detailed roadmap'
                    ]
                },
                {
                    phase: 2,
                    name: 'Quick Wins Implementation',
                    duration: '4-8 weeks',
                    activities: [
                        'Implement high-impact, low-effort items',
                        'Build team momentum',
                        'Measure early results',
                        'Adjust approach based on learnings'
                    ]
                },
                {
                    phase: 3,
                    name: 'Core Implementation',
                    duration: '8-16 weeks',
                    activities: [
                        'Execute primary initiatives',
                        'Build supporting infrastructure',
                        'Train teams',
                        'Monitor progress'
                    ]
                },
                {
                    phase: 4,
                    name: 'Optimization & Scale',
                    duration: 'Ongoing',
                    activities: [
                        'Refine processes',
                        'Scale successful initiatives',
                        'Continuous improvement',
                        'Measure ROI'
                    ]
                }
            ]
        };
    }

    /**
     * Generate success metrics
     */
    generateMetrics(templateData, analysisData) {
        return {
            primaryMetrics: [
                {
                    metric: 'Assessment Score',
                    baseline: analysisData.score || 0,
                    target: 80,
                    unit: '%'
                },
                {
                    metric: 'Implementation Completion',
                    baseline: 0,
                    target: 100,
                    unit: '%'
                },
                {
                    metric: 'Team Adoption',
                    baseline: 0,
                    target: 90,
                    unit: '%'
                }
            ],
            measurementFrequency: 'Monthly',
            reviewCadence: 'Quarterly'
        };
    }

    /**
     * Generate resources section
     */
    generateResources(templateData) {
        return {
            templates: templateData.templates || [],
            tools: templateData.tools || [],
            references: templateData.references || [],
            externalResources: [
                {
                    title: 'Industry Best Practices Guide',
                    type: 'PDF',
                    url: '#'
                },
                {
                    title: 'Implementation Checklist',
                    type: 'Excel',
                    url: '#'
                },
                {
                    title: 'Team Training Materials',
                    type: 'PowerPoint',
                    url: '#'
                }
            ]
        };
    }

    /**
     * Download template in specified format
     */
    async downloadTemplate(subcomponentId, format, analysisData, templateData) {
        try {
            let downloadPath;

            switch (format.toLowerCase()) {
                case 'pdf':
                    downloadPath = await this.generatePDF(subcomponentId, analysisData, templateData);
                    break;
                case 'docx':
                    downloadPath = await this.generateDOCX(subcomponentId, analysisData, templateData);
                    break;
                case 'json':
                    downloadPath = await this.generateJSON(subcomponentId, analysisData, templateData);
                    break;
                case 'html':
                    downloadPath = await this.generateHTML(subcomponentId, analysisData, templateData);
                    break;
                default:
                    throw new Error(`Unsupported format: ${format}`);
            }

            return {
                success: true,
                format: format,
                filePath: downloadPath,
                fileName: `${subcomponentId}_template.${this.getFileExtension(format)}`,
                downloadUrl: `/api/templates/download/${path.basename(downloadPath)}`,
                generatedAt: new Date().toISOString()
            };
        } catch (error) {
            console.error('Error downloading template:', error);
            throw error;
        }
    }

    /**
     * Generate PDF format
     */
    async generatePDF(subcomponentId, analysisData, templateData) {
        return new Promise((resolve, reject) => {
            try {
                const fileName = `${subcomponentId}_template_${Date.now()}.pdf`;
                const filePath = path.join(__dirname, 'downloads', fileName);

                // Ensure downloads directory exists
                if (!fs.existsSync(path.join(__dirname, 'downloads'))) {
                    fs.mkdirSync(path.join(__dirname, 'downloads'), { recursive: true });
                }

                const doc = new PDFDocument();
                const stream = fs.createWriteStream(filePath);

                doc.pipe(stream);

                // Title
                doc.fontSize(24).font('Helvetica-Bold').text(templateData.name, { align: 'center' });
                doc.moveDown();

                // Metadata
                doc.fontSize(10).font('Helvetica').text(`Generated: ${new Date().toISOString()}`, { align: 'right' });
                doc.text(`Assessment Score: ${analysisData.score}%`, { align: 'right' });
                doc.moveDown();

                // Executive Summary
                doc.fontSize(16).font('Helvetica-Bold').text('Executive Summary');
                doc.fontSize(11).font('Helvetica').text(templateData.description);
                doc.moveDown();

                // Current State
                doc.fontSize(16).font('Helvetica-Bold').text('Current State Assessment');
                doc.fontSize(11).font('Helvetica').text(`Overall Score: ${analysisData.score}%`);
                doc.moveDown();

                // Recommendations
                if (analysisData.recommendations && analysisData.recommendations.length > 0) {
                    doc.fontSize(16).font('Helvetica-Bold').text('Key Recommendations');
                    analysisData.recommendations.slice(0, 5).forEach((rec, index) => {
                        doc.fontSize(11).font('Helvetica-Bold').text(`${index + 1}. ${rec.area}`);
                        doc.fontSize(10).font('Helvetica').text(`Impact: ${rec.impact}`);
                        doc.moveDown(0.5);
                    });
                }

                doc.end();

                stream.on('finish', () => resolve(filePath));
                stream.on('error', reject);
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Generate DOCX format (simplified - returns JSON for now)
     */
    async generateDOCX(subcomponentId, analysisData, templateData) {
        const fileName = `${subcomponentId}_template_${Date.now()}.docx`;
        const filePath = path.join(__dirname, 'downloads', fileName);

        // Ensure downloads directory exists
        if (!fs.existsSync(path.join(__dirname, 'downloads'))) {
            fs.mkdirSync(path.join(__dirname, 'downloads'), { recursive: true });
        }

        // For now, create a JSON representation that can be converted to DOCX
        const docContent = {
            title: templateData.name,
            sections: [
                {
                    heading: 'Executive Summary',
                    content: templateData.description
                },
                {
                    heading: 'Current State Assessment',
                    content: `Overall Score: ${analysisData.score}%`
                },
                {
                    heading: 'Recommendations',
                    items: analysisData.recommendations || []
                }
            ]
        };

        fs.writeFileSync(filePath.replace('.docx', '.json'), JSON.stringify(docContent, null, 2));
        return filePath;
    }

    /**
     * Generate JSON format
     */
    async generateJSON(subcomponentId, analysisData, templateData) {
        const fileName = `${subcomponentId}_template_${Date.now()}.json`;
        const filePath = path.join(__dirname, 'downloads', fileName);

        // Ensure downloads directory exists
        if (!fs.existsSync(path.join(__dirname, 'downloads'))) {
            fs.mkdirSync(path.join(__dirname, 'downloads'), { recursive: true });
        }

        const jsonContent = {
            metadata: {
                subcomponentId: subcomponentId,
                templateName: templateData.name,
                generatedAt: new Date().toISOString(),
                version: '1.0'
            },
            analysis: analysisData,
            template: templateData,
            sections: this.buildPreviewSections(templateData, analysisData)
        };

        fs.writeFileSync(filePath, JSON.stringify(jsonContent, null, 2));
        return filePath;
    }

    /**
     * Generate HTML format
     */
    async generateHTML(subcomponentId, analysisData, templateData) {
        const fileName = `${subcomponentId}_template_${Date.now()}.html`;
        const filePath = path.join(__dirname, 'downloads', fileName);

        // Ensure downloads directory exists
        if (!fs.existsSync(path.join(__dirname, 'downloads'))) {
            fs.mkdirSync(path.join(__dirname, 'downloads'), { recursive: true });
        }

        const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${templateData.name}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 8px;
            margin-bottom: 30px;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
        }
        .metadata {
            font-size: 12px;
            opacity: 0.9;
            margin-top: 10px;
        }
        .section {
            background: white;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .section h2 {
            color: #667eea;
            border-bottom: 2px solid #667eea;
            padding-bottom: 10px;
            margin-top: 0;
        }
        .score-display {
            font-size: 36px;
            font-weight: bold;
            color: #667eea;
            margin: 20px 0;
        }
        .recommendation {
            background: #f9f9f9;
            padding: 15px;
            margin: 10px 0;
            border-left: 4px solid #667eea;
            border-radius: 4px;
        }
        .recommendation-title {
            font-weight: bold;
            color: #333;
        }
        .recommendation-impact {
            color: #666;
            font-size: 14px;
            margin-top: 5px;
        }
        .footer {
            text-align: center;
            color: #999;
            font-size: 12px;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>${templateData.name}</h1>
        <div class="metadata">
            <p>Generated: ${new Date().toISOString()}</p>
            <p>Assessment Score: ${analysisData.score}%</p>
        </div>
    </div>

    <div class="section">
        <h2>Executive Summary</h2>
        <p>${templateData.description}</p>
    </div>

    <div class="section">
        <h2>Current State Assessment</h2>
        <div class="score-display">${analysisData.score}%</div>
        <p>Your organization's current maturity level in this area.</p>
    </div>

    ${analysisData.recommendations && analysisData.recommendations.length > 0 ? `
    <div class="section">
        <h2>Key Recommendations</h2>
        ${analysisData.recommendations.slice(0, 5).map((rec, index) => `
        <div class="recommendation">
            <div class="recommendation-title">${index + 1}. ${rec.area}</div>
            <div class="recommendation-impact">Impact: ${rec.impact}</div>
        </div>
        `).join('')}
    </div>
    ` : ''}

    <div class="section">
        <h2>Implementation Roadmap</h2>
        <p>Follow these phases to implement the recommendations:</p>
        <ol>
            <li><strong>Assessment & Planning (2-4 weeks)</strong> - Understand current state and plan approach</li>
            <li><strong>Quick Wins (4-8 weeks)</strong> - Implement high-impact, low-effort items</li>
            <li><strong>Core Implementation (8-16 weeks)</strong> - Execute primary initiatives</li>
            <li><strong>Optimization & Scale (Ongoing)</strong> - Refine and scale successful initiatives</li>
        </ol>
    </div>

    <div class="footer">
        <p>This template was generated by ScaleOps6 Growth Execution Framework</p>
        <p>For more information, visit www.scaleteam6.com</p>
    </div>
</body>
</html>
        `;

        fs.writeFileSync(filePath, htmlContent);
        return filePath;
    }

    /**
     * Get file extension for format
     */
    getFileExtension(format) {
        const extensions = {
            'pdf': 'pdf',
            'docx': 'docx',
            'json': 'json',
            'html': 'html'
        };
        return extensions[format.toLowerCase()] || format.toLowerCase();
    }

    /**
     * Get preview by cache key
     */
    getPreview(cacheKey) {
        return this.previewCache.get(cacheKey);
    }

    /**
     * List all available formats
     */
    getAvailableFormats() {
        return [
            {
                format: 'PDF',
                description: 'Professional PDF document with formatting',
                extension: '.pdf',
                recommended: true
            },
            {
                format: 'DOCX',
                description: 'Microsoft Word document for editing',
                extension: '.docx',
                recommended: false
            },
            {
                format: 'JSON',
                description: 'Structured JSON data for integration',
                extension: '.json',
                recommended: false
            },
            {
                format: 'HTML',
                description: 'Web-ready HTML document',
                extension: '.html',
                recommended: false
            }
        ];
    }
}

module.exports = TemplatePreviewDownloadSystem;

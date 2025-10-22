const PDFDocument = require('pdfkit');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle } = require('docx');
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Database connection
const dbPath = path.join(__dirname, 'scaleops6.db');
const db = new sqlite3.Database(dbPath);

// Ensure directories exist
const ensureDirectoryExists = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

// Initialize directories
ensureDirectoryExists(path.join(__dirname, 'generated', 'pdf'));
ensureDirectoryExists(path.join(__dirname, 'generated', 'docx'));
ensureDirectoryExists(path.join(__dirname, 'templates'));

class FileGenerationService {
    constructor() {
        this.outputDir = path.join(__dirname, 'generated');
        this.templatesDir = path.join(__dirname, 'templates');
    }

    // Generate PDF Analysis Report
    async generateAnalysisPDF(analysisData, subcomponentId) {
        return new Promise((resolve, reject) => {
            try {
                const fileName = `analysis_${subcomponentId}_${Date.now()}.pdf`;
                const filePath = path.join(this.outputDir, 'pdf', fileName);
                
                // Create PDF document
                const doc = new PDFDocument({
                    size: 'A4',
                    margins: { top: 50, bottom: 50, left: 50, right: 50 }
                });

                // Pipe to file
                const stream = fs.createWriteStream(filePath);
                doc.pipe(stream);

                // Add header with logo placeholder
                doc.fontSize(24)
                   .fillColor('#1a73e8')
                   .text('ScaleOps6 Analysis Report', { align: 'center' });
                
                doc.moveDown();
                doc.fontSize(18)
                   .fillColor('#333')
                   .text(analysisData.subcomponentName || 'Subcomponent Analysis', { align: 'center' });
                
                doc.fontSize(12)
                   .fillColor('#666')
                   .text(`Agent: ${analysisData.agentName || 'AI Agent'}`, { align: 'center' });
                
                doc.moveDown(2);

                // Overall Score Section
                doc.fontSize(16)
                   .fillColor('#1a73e8')
                   .text('Overall Score', { underline: true });
                
                doc.fontSize(36)
                   .fillColor(this.getScoreColor(analysisData.overallScore))
                   .text(`${analysisData.overallScore}/100`, { align: 'center' });
                
                doc.moveDown(2);

                // Dimension Scores
                doc.fontSize(16)
                   .fillColor('#1a73e8')
                   .text('Dimension Scores', { underline: true });
                
                doc.moveDown();
                
                if (analysisData.dimensionScores) {
                    Object.entries(analysisData.dimensionScores).forEach(([dimension, score]) => {
                        doc.fontSize(12)
                           .fillColor('#333')
                           .text(`${dimension}: `, { continued: true })
                           .fillColor(this.getScoreColor(score))
                           .text(`${score}/100`);
                    });
                }
                
                doc.moveDown(2);

                // Strengths Section
                doc.fontSize(16)
                   .fillColor('#28a745')
                   .text('Key Strengths', { underline: true });
                
                doc.moveDown();
                
                if (analysisData.strengths && Array.isArray(analysisData.strengths)) {
                    analysisData.strengths.forEach(strength => {
                        doc.fontSize(11)
                           .fillColor('#333')
                           .text(`• ${strength}`, { indent: 20 });
                    });
                } else if (analysisData.strengths) {
                    doc.fontSize(11)
                       .fillColor('#333')
                       .text(analysisData.strengths, { indent: 20 });
                }
                
                doc.moveDown(2);

                // Weaknesses Section
                doc.fontSize(16)
                   .fillColor('#dc3545')
                   .text('Areas for Improvement', { underline: true });
                
                doc.moveDown();
                
                if (analysisData.weaknesses && Array.isArray(analysisData.weaknesses)) {
                    analysisData.weaknesses.forEach(weakness => {
                        doc.fontSize(11)
                           .fillColor('#333')
                           .text(`• ${weakness}`, { indent: 20 });
                    });
                } else if (analysisData.weaknesses) {
                    doc.fontSize(11)
                       .fillColor('#333')
                       .text(analysisData.weaknesses, { indent: 20 });
                }
                
                doc.moveDown(2);

                // Recommendations Section
                doc.fontSize(16)
                   .fillColor('#1a73e8')
                   .text('Expert Recommendations', { underline: true });
                
                doc.moveDown();
                
                if (analysisData.recommendations && Array.isArray(analysisData.recommendations)) {
                    analysisData.recommendations.forEach((rec, index) => {
                        doc.fontSize(12)
                           .fillColor('#1a73e8')
                           .text(`${index + 1}. ${rec.title || rec}`, { indent: 20 });
                        
                        if (rec.description) {
                            doc.fontSize(11)
                               .fillColor('#666')
                               .text(rec.description, { indent: 40 });
                        }
                        doc.moveDown(0.5);
                    });
                } else if (analysisData.recommendations) {
                    doc.fontSize(11)
                       .fillColor('#333')
                       .text(analysisData.recommendations, { indent: 20 });
                }

                // Add footer
                doc.moveDown(3);
                doc.fontSize(10)
                   .fillColor('#999')
                   .text(`Generated on ${new Date().toLocaleString()}`, { align: 'center' });
                
                doc.fontSize(10)
                   .fillColor('#999')
                   .text('© 2025 ScaleOps6 - ST6Co', { align: 'center' });

                // Finalize PDF
                doc.end();

                stream.on('finish', () => {
                    // Save to database
                    this.saveDocumentRecord(subcomponentId, 'pdf', fileName, filePath, 'analysis_report');
                    
                    resolve({
                        success: true,
                        fileName,
                        filePath,
                        url: `/generated/pdf/${fileName}`
                    });
                });

                stream.on('error', reject);
            } catch (error) {
                reject(error);
            }
        });
    }

    // Generate DOCX Analysis Report
    async generateAnalysisDOCX(analysisData, subcomponentId) {
        return new Promise(async (resolve, reject) => {
            try {
                const fileName = `analysis_${subcomponentId}_${Date.now()}.docx`;
                const filePath = path.join(this.outputDir, 'docx', fileName);

                // Create document sections
                const sections = [];

                // Title section
                sections.push(
                    new Paragraph({
                        text: 'ScaleOps6 Analysis Report',
                        heading: HeadingLevel.TITLE,
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 400 }
                    })
                );

                sections.push(
                    new Paragraph({
                        text: analysisData.subcomponentName || 'Subcomponent Analysis',
                        heading: HeadingLevel.HEADING_1,
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 200 }
                    })
                );

                sections.push(
                    new Paragraph({
                        text: `Agent: ${analysisData.agentName || 'AI Agent'}`,
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 400 }
                    })
                );

                // Overall Score
                sections.push(
                    new Paragraph({
                        text: 'Overall Score',
                        heading: HeadingLevel.HEADING_2,
                        spacing: { before: 200, after: 200 }
                    })
                );

                sections.push(
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `${analysisData.overallScore}/100`,
                                size: 48,
                                bold: true,
                                color: this.getScoreColorHex(analysisData.overallScore)
                            })
                        ],
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 400 }
                    })
                );

                // Dimension Scores Table
                if (analysisData.dimensionScores) {
                    sections.push(
                        new Paragraph({
                            text: 'Dimension Scores',
                            heading: HeadingLevel.HEADING_2,
                            spacing: { before: 200, after: 200 }
                        })
                    );

                    const tableRows = [
                        new TableRow({
                            children: [
                                new TableCell({
                                    children: [new Paragraph({ text: 'Dimension', bold: true })],
                                    width: { size: 50, type: WidthType.PERCENTAGE }
                                }),
                                new TableCell({
                                    children: [new Paragraph({ text: 'Score', bold: true })],
                                    width: { size: 50, type: WidthType.PERCENTAGE }
                                })
                            ]
                        })
                    ];

                    Object.entries(analysisData.dimensionScores).forEach(([dimension, score]) => {
                        tableRows.push(
                            new TableRow({
                                children: [
                                    new TableCell({
                                        children: [new Paragraph({ text: dimension })]
                                    }),
                                    new TableCell({
                                        children: [new Paragraph({ 
                                            text: `${score}/100`,
                                            alignment: AlignmentType.CENTER
                                        })]
                                    })
                                ]
                            })
                        );
                    });

                    sections.push(
                        new Table({
                            rows: tableRows,
                            width: { size: 100, type: WidthType.PERCENTAGE }
                        })
                    );
                }

                // Strengths
                sections.push(
                    new Paragraph({
                        text: 'Key Strengths',
                        heading: HeadingLevel.HEADING_2,
                        spacing: { before: 400, after: 200 }
                    })
                );

                if (analysisData.strengths && Array.isArray(analysisData.strengths)) {
                    analysisData.strengths.forEach(strength => {
                        sections.push(
                            new Paragraph({
                                text: `• ${strength}`,
                                spacing: { after: 100 }
                            })
                        );
                    });
                } else if (analysisData.strengths) {
                    sections.push(
                        new Paragraph({
                            text: analysisData.strengths,
                            spacing: { after: 200 }
                        })
                    );
                }

                // Weaknesses
                sections.push(
                    new Paragraph({
                        text: 'Areas for Improvement',
                        heading: HeadingLevel.HEADING_2,
                        spacing: { before: 400, after: 200 }
                    })
                );

                if (analysisData.weaknesses && Array.isArray(analysisData.weaknesses)) {
                    analysisData.weaknesses.forEach(weakness => {
                        sections.push(
                            new Paragraph({
                                text: `• ${weakness}`,
                                spacing: { after: 100 }
                            })
                        );
                    });
                } else if (analysisData.weaknesses) {
                    sections.push(
                        new Paragraph({
                            text: analysisData.weaknesses,
                            spacing: { after: 200 }
                        })
                    );
                }

                // Recommendations
                sections.push(
                    new Paragraph({
                        text: 'Expert Recommendations',
                        heading: HeadingLevel.HEADING_2,
                        spacing: { before: 400, after: 200 }
                    })
                );

                if (analysisData.recommendations && Array.isArray(analysisData.recommendations)) {
                    analysisData.recommendations.forEach((rec, index) => {
                        sections.push(
                            new Paragraph({
                                text: `${index + 1}. ${rec.title || rec}`,
                                heading: HeadingLevel.HEADING_3,
                                spacing: { before: 200, after: 100 }
                            })
                        );
                        
                        if (rec.description) {
                            sections.push(
                                new Paragraph({
                                    text: rec.description,
                                    spacing: { after: 200 }
                                })
                            );
                        }
                    });
                } else if (analysisData.recommendations) {
                    sections.push(
                        new Paragraph({
                            text: analysisData.recommendations,
                            spacing: { after: 200 }
                        })
                    );
                }

                // Footer
                sections.push(
                    new Paragraph({
                        text: `Generated on ${new Date().toLocaleString()}`,
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 600 }
                    })
                );

                sections.push(
                    new Paragraph({
                        text: '© 2025 ScaleOps6 - ST6Co',
                        alignment: AlignmentType.CENTER
                    })
                );

                // Create document
                const doc = new Document({
                    sections: [{
                        properties: {},
                        children: sections
                    }]
                });

                // Generate and save
                const buffer = await Packer.toBuffer(doc);
                fs.writeFileSync(filePath, buffer);

                // Save to database
                this.saveDocumentRecord(subcomponentId, 'docx', fileName, filePath, 'analysis_report');

                resolve({
                    success: true,
                    fileName,
                    filePath,
                    url: `/generated/docx/${fileName}`
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    // Generate Template PDF
    async generateTemplatePDF(templateData, subcomponentId) {
        return new Promise((resolve, reject) => {
            try {
                const fileName = `template_${subcomponentId}_${Date.now()}.pdf`;
                const filePath = path.join(this.outputDir, 'pdf', fileName);
                
                const doc = new PDFDocument({
                    size: 'A4',
                    margins: { top: 50, bottom: 50, left: 50, right: 50 }
                });

                const stream = fs.createWriteStream(filePath);
                doc.pipe(stream);

                // Template header
                doc.fontSize(24)
                   .fillColor('#1a73e8')
                   .text(templateData.templateName || 'Business Template', { align: 'center' });
                
                doc.moveDown();
                doc.fontSize(14)
                   .fillColor('#666')
                   .text(`Category: ${templateData.category || 'General'}`, { align: 'center' });
                
                doc.moveDown(2);

                // Template sections
                const sections = templateData.sections || [
                    { title: 'Overview', content: 'Provide a high-level overview of your initiative.' },
                    { title: 'Objectives', content: 'List your key objectives and goals.' },
                    { title: 'Strategy', content: 'Outline your strategic approach.' },
                    { title: 'Implementation', content: 'Detail your implementation plan.' },
                    { title: 'Metrics', content: 'Define success metrics and KPIs.' }
                ];

                sections.forEach(section => {
                    doc.fontSize(16)
                       .fillColor('#1a73e8')
                       .text(section.title, { underline: true });
                    
                    doc.moveDown();
                    doc.fontSize(11)
                       .fillColor('#333')
                       .text(section.content || '[Add your content here]');
                    
                    // Add lines for writing
                    doc.moveDown();
                    for (let i = 0; i < 5; i++) {
                        doc.strokeColor('#ddd')
                           .moveTo(50, doc.y)
                           .lineTo(545, doc.y)
                           .stroke();
                        doc.moveDown(0.8);
                    }
                    
                    doc.moveDown();
                });

                doc.end();

                stream.on('finish', () => {
                    this.saveDocumentRecord(subcomponentId, 'pdf', fileName, filePath, 'template');
                    
                    resolve({
                        success: true,
                        fileName,
                        filePath,
                        url: `/generated/pdf/${fileName}`
                    });
                });

                stream.on('error', reject);
            } catch (error) {
                reject(error);
            }
        });
    }

    // Helper function to get score color
    getScoreColor(score) {
        if (score >= 80) return '#28a745';
        if (score >= 60) return '#ffc107';
        if (score >= 40) return '#fd7e14';
        return '#dc3545';
    }

    // Helper function to get score color in hex
    getScoreColorHex(score) {
        if (score >= 80) return '28a745';
        if (score >= 60) return 'ffc107';
        if (score >= 40) return 'fd7e14';
        return 'dc3545';
    }

    // Save document record to database
    saveDocumentRecord(subcomponentId, docType, fileName, filePath, category) {
        const fileSize = fs.statSync(filePath).size;
        const mimeType = docType === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        
        db.run(`
            INSERT INTO generated_documents 
            (subcomponent_id, document_type, document_name, file_path, file_size, mime_type, metadata)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [subcomponentId, docType, fileName, filePath, fileSize, mimeType, JSON.stringify({ category })],
        (err) => {
            if (err) {
                console.error('Error saving document record:', err);
            }
        });
    }

    // Get expert recommendations from database
    async getExpertRecommendations(subcomponentId) {
        return new Promise((resolve, reject) => {
            db.all(`
                SELECT * FROM expert_recommendations 
                WHERE subcomponent_id = ? 
                ORDER BY priority DESC, impact_score DESC
            `, [subcomponentId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows || []);
                }
            });
        });
    }

    // Get template data from database
    async getTemplateData(subcomponentId) {
        return new Promise((resolve, reject) => {
            db.get(`
                SELECT * FROM templates 
                WHERE subcomponent_id = ?
            `, [subcomponentId], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row || {});
                }
            });
        });
    }
}

module.exports = FileGenerationService;
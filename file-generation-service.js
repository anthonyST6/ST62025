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

    // Generate Populated Template DOCX (with workspace answers)
    async generatePopulatedTemplateDOCX(templateData, subcomponentId) {
        return new Promise(async (resolve, reject) => {
            try {
                const templateName = templateData.templateName || 'Template';
                const fileName = `${templateName.toLowerCase().replace(/\s+/g, '-')}_${subcomponentId}_${Date.now()}.docx`;
                const filePath = path.join(this.outputDir, 'docx', fileName);

                // Create document sections
                const sections = [];

                // Title section
                sections.push(
                    new Paragraph({
                        text: templateName,
                        heading: HeadingLevel.TITLE,
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 200 }
                    })
                );

                sections.push(
                    new Paragraph({
                        text: `For ${templateData.subcomponentName || subcomponentId}`,
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 400 }
                    })
                );

                // Workspace Responses Section
                sections.push(
                    new Paragraph({
                        text: 'Workspace Responses',
                        heading: HeadingLevel.HEADING_1,
                        spacing: { before: 400, after: 200 }
                    })
                );

                const workspaceData = templateData.workspaceData || {};
                if (Object.keys(workspaceData).length > 0) {
                    Object.entries(workspaceData).forEach(([key, data]) => {
                        const question = data.question || data.text || key;
                        const answer = data.answer || data.value || data;

                        // Question
                        sections.push(
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: question,
                                        bold: true,
                                        size: 24
                                    })
                                ],
                                spacing: { before: 300, after: 100 }
                            })
                        );

                        // Answer
                        sections.push(
                            new Paragraph({
                                text: String(answer),
                                spacing: { after: 200 }
                            })
                        );
                    });
                } else {
                    sections.push(
                        new Paragraph({
                            text: 'No workspace data available. Complete the workspace tab to populate this template.',
                            italics: true,
                            spacing: { after: 400 }
                        })
                    );
                }

                // Strategic Recommendations Section
                sections.push(
                    new Paragraph({
                        text: 'Strategic Recommendations',
                        heading: HeadingLevel.HEADING_1,
                        spacing: { before: 400, after: 200 }
                    })
                );

                const score = templateData.score || 0;
                const recommendations = this.generateTemplateRecommendations(score);
                
                recommendations.forEach((rec, index) => {
                    sections.push(
                        new Paragraph({
                            text: `${index + 1}. ${rec}`,
                            spacing: { after: 150 }
                        })
                    );
                });

                // Next Steps Section
                sections.push(
                    new Paragraph({
                        text: 'Strategic Next Steps',
                        heading: HeadingLevel.HEADING_1,
                        spacing: { before: 400, after: 200 }
                    })
                );

                const nextSteps = [
                    'Immediate (Week 1-2): Validate assumptions with customer interviews',
                    'Short-term (Month 1): Quantify problem impact with specific metrics',
                    'Medium-term (Month 2-3): Develop and test MVP solution',
                    'Long-term (Month 4-6): Scale based on validated learnings',
                    'Ongoing: Maintain continuous feedback and iteration cycles'
                ];

                nextSteps.forEach((step, index) => {
                    sections.push(
                        new Paragraph({
                            text: `${index + 1}. ${step}`,
                            spacing: { after: 150 }
                        })
                    );
                });

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
                this.saveDocumentRecord(subcomponentId, 'docx', fileName, filePath, 'populated_template');

                resolve({
                    success: true,
                    fileName,
                    filePath,
                    url: `/generated/docx/${fileName}`,
                    filename: fileName
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    // Generate BLANK Template DOCX (for Resources tab - no workspace data)
    async generateBlankTemplateDOCX(templateData, subcomponentId) {
        return new Promise(async (resolve, reject) => {
            try {
                const templateName = templateData.templateName || 'Template';
                const fileName = `${templateName.toLowerCase().replace(/\s+/g, '-')}_blank_${subcomponentId}_${Date.now()}.docx`;
                const filePath = path.join(this.outputDir, 'docx', fileName);

                // Create document sections
                const sections = [];

                // Title section
                sections.push(
                    new Paragraph({
                        text: templateName,
                        heading: HeadingLevel.TITLE,
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 200 }
                    })
                );

                sections.push(
                    new Paragraph({
                        text: `For ${templateData.subcomponentName || subcomponentId}`,
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 400 }
                    })
                );

                // Instructions Section
                sections.push(
                    new Paragraph({
                        text: 'Instructions',
                        heading: HeadingLevel.HEADING_1,
                        spacing: { before: 400, after: 200 }
                    })
                );

                sections.push(
                    new Paragraph({
                        text: 'This is a blank template for you to fill out. Complete each section with your specific information and strategic insights. Use this template to document your analysis, planning, and implementation details.',
                        spacing: { after: 400 }
                    })
                );

                // Template Sections (blank for user to fill)
                const templateSections = [
                    { title: 'Overview', prompt: 'Provide a comprehensive overview of your initiative, including background, context, and key objectives.' },
                    { title: 'Current State Analysis', prompt: 'Describe the current situation, challenges, and opportunities you have identified.' },
                    { title: 'Strategic Objectives', prompt: 'List your key objectives and goals. What are you trying to achieve?' },
                    { title: 'Approach & Methodology', prompt: 'Outline your strategic approach and the methodology you will use.' },
                    { title: 'Implementation Plan', prompt: 'Detail your implementation plan, including timeline, resources, and key milestones.' },
                    { title: 'Success Metrics & KPIs', prompt: 'Define how you will measure success. What are your key performance indicators?' },
                    { title: 'Risk Assessment', prompt: 'Identify potential risks and your mitigation strategies.' },
                    { title: 'Next Steps', prompt: 'Outline immediate next steps and action items.' }
                ];

                templateSections.forEach(section => {
                    sections.push(
                        new Paragraph({
                            text: section.title,
                            heading: HeadingLevel.HEADING_2,
                            spacing: { before: 400, after: 200 }
                        })
                    );

                    sections.push(
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: section.prompt,
                                    italics: true,
                                    color: '666666'
                                })
                            ],
                            spacing: { after: 200 }
                        })
                    );

                    // Add blank lines for user to fill in
                    sections.push(
                        new Paragraph({
                            text: '[Your response here]',
                            spacing: { after: 100 }
                        })
                    );

                    sections.push(
                        new Paragraph({
                            text: '',
                            spacing: { after: 100 }
                        })
                    );

                    sections.push(
                        new Paragraph({
                            text: '',
                            spacing: { after: 100 }
                        })
                    );

                    sections.push(
                        new Paragraph({
                            text: '',
                            spacing: { after: 300 }
                        })
                    );
                });

                // Footer
                sections.push(
                    new Paragraph({
                        text: `Template generated on ${new Date().toLocaleString()}`,
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
                this.saveDocumentRecord(subcomponentId, 'docx', fileName, filePath, 'blank_template');

                resolve({
                    success: true,
                    fileName,
                    filePath,
                    url: `/generated/docx/${fileName}`,
                    filename: fileName
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    // Generate Score History Report DOCX
    async generateScoreHistoryDOCX(historyEntry, subcomponentId) {
        return new Promise(async (resolve, reject) => {
            try {
                const date = new Date(historyEntry.timestamp);
                const entryId = historyEntry.id || historyEntry.timestamp;
                const fileName = `score-history-report_${subcomponentId}_${entryId}_${Date.now()}.docx`;
                const filePath = path.join(this.outputDir, 'docx', fileName);

                // Create document sections
                const sections = [];

                // Title section
                sections.push(
                    new Paragraph({
                        text: 'ScaleOps6 Score History Report',
                        heading: HeadingLevel.TITLE,
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 200 }
                    })
                );

                sections.push(
                    new Paragraph({
                        text: 'Powered by ST6Co',
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 400 }
                    })
                );

                // Report Details
                sections.push(
                    new Paragraph({
                        text: 'Report Details',
                        heading: HeadingLevel.HEADING_1,
                        spacing: { before: 400, after: 200 }
                    })
                );

                sections.push(
                    new Paragraph({
                        children: [
                            new TextRun({ text: 'Entry ID: ', bold: true }),
                            new TextRun({ text: String(entryId) })
                        ],
                        spacing: { after: 100 }
                    })
                );

                sections.push(
                    new Paragraph({
                        children: [
                            new TextRun({ text: 'Subcomponent: ', bold: true }),
                            new TextRun({ text: subcomponentId })
                        ],
                        spacing: { after: 100 }
                    })
                );

                sections.push(
                    new Paragraph({
                        children: [
                            new TextRun({ text: 'Analysis Date: ', bold: true }),
                            new TextRun({ text: date.toLocaleDateString() })
                        ],
                        spacing: { after: 100 }
                    })
                );

                sections.push(
                    new Paragraph({
                        children: [
                            new TextRun({ text: 'Analysis Time: ', bold: true }),
                            new TextRun({ text: date.toLocaleTimeString() })
                        ],
                        spacing: { after: 100 }
                    })
                );

                sections.push(
                    new Paragraph({
                        children: [
                            new TextRun({ text: 'User: ', bold: true }),
                            new TextRun({ text: historyEntry.user || 'ST6C0' })
                        ],
                        spacing: { after: 100 }
                    })
                );

                sections.push(
                    new Paragraph({
                        children: [
                            new TextRun({ text: 'Generated: ', bold: true }),
                            new TextRun({ text: new Date().toLocaleString() })
                        ],
                        spacing: { after: 400 }
                    })
                );

                // Performance Score
                sections.push(
                    new Paragraph({
                        text: 'Performance Score',
                        heading: HeadingLevel.HEADING_1,
                        spacing: { before: 400, after: 200 }
                    })
                );

                const scoreLevel = historyEntry.score >= 80 ? 'EXCELLENT ⭐⭐⭐⭐⭐' :
                                  historyEntry.score >= 60 ? 'GOOD ⭐⭐⭐⭐' :
                                  historyEntry.score >= 40 ? 'FAIR ⭐⭐⭐' : 'NEEDS IMPROVEMENT ⭐⭐';

                sections.push(
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `${historyEntry.score}%`,
                                size: 48,
                                bold: true,
                                color: this.getScoreColorHex(historyEntry.score)
                            })
                        ],
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 200 }
                    })
                );

                sections.push(
                    new Paragraph({
                        children: [
                            new TextRun({ text: 'Performance Level: ', bold: true }),
                            new TextRun({ text: scoreLevel })
                        ],
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 400 }
                    })
                );

                // Score Interpretation
                sections.push(
                    new Paragraph({
                        text: 'Score Interpretation',
                        heading: HeadingLevel.HEADING_1,
                        spacing: { before: 400, after: 200 }
                    })
                );

                const interpretation = historyEntry.score >= 80 ?
                    'EXCELLENT PERFORMANCE - Your subcomponent demonstrates outstanding performance across all key metrics. Continue maintaining these high standards while exploring optimization opportunities.' :
                    historyEntry.score >= 60 ?
                    'GOOD PERFORMANCE - Your subcomponent shows solid performance with room for targeted improvements. Focus on addressing specific weaknesses to reach excellence.' :
                    historyEntry.score >= 40 ?
                    'FAIR PERFORMANCE - Your subcomponent has a foundation but requires significant improvements. Prioritize addressing critical gaps and strengthening core capabilities.' :
                    'NEEDS IMPROVEMENT - Your subcomponent requires immediate attention and strategic intervention. Focus on fundamental improvements and establishing strong foundations.';

                sections.push(
                    new Paragraph({
                        text: interpretation,
                        spacing: { after: 400 }
                    })
                );

                // Key Recommendations
                sections.push(
                    new Paragraph({
                        text: 'Key Recommendations',
                        heading: HeadingLevel.HEADING_1,
                        spacing: { before: 400, after: 200 }
                    })
                );

                const recommendations = this.generateTemplateRecommendations(historyEntry.score);
                recommendations.forEach((rec, index) => {
                    sections.push(
                        new Paragraph({
                            text: `${index + 1}. ${rec}`,
                            spacing: { after: 150 }
                        })
                    );
                });

                // Next Steps
                sections.push(
                    new Paragraph({
                        text: 'Next Steps',
                        heading: HeadingLevel.HEADING_1,
                        spacing: { before: 400, after: 200 }
                    })
                );

                const nextSteps = [
                    'Review this analysis with your team',
                    'Prioritize recommended actions based on impact and effort',
                    'Set specific, measurable goals for improvement',
                    'Schedule follow-up assessment in 30-60 days',
                    'Track progress against established benchmarks',
                    'Document lessons learned and best practices'
                ];

                nextSteps.forEach((step, index) => {
                    sections.push(
                        new Paragraph({
                            text: `• ${step}`,
                            spacing: { after: 100 }
                        })
                    );
                });

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
                        text: '© 2025 ScaleOps6 - ST6Co | Professional Business Analysis Platform',
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
                this.saveDocumentRecord(subcomponentId, 'docx', fileName, filePath, 'score_history_report');

                resolve({
                    success: true,
                    fileName,
                    filePath,
                    url: `/generated/docx/${fileName}`,
                    filename: fileName
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    // Generate recommendations based on score
    generateTemplateRecommendations(score) {
        if (score >= 80) {
            return [
                'Scale your validated solution across new market segments',
                'Document and systematize your successful processes',
                'Explore strategic partnerships for accelerated growth',
                'Invest in advanced analytics and automation',
                'Consider international expansion opportunities'
            ];
        } else if (score >= 60) {
            return [
                'Focus on optimizing core operational processes',
                'Implement comprehensive customer feedback systems',
                'Strengthen product-market fit validation',
                'Build scalable infrastructure for growth',
                'Develop clear KPIs and tracking mechanisms'
            ];
        } else {
            return [
                'Prioritize problem validation with target customers',
                'Establish clear value proposition',
                'Focus on achieving initial product-market fit',
                'Build minimum viable solution for testing',
                'Implement agile development processes'
            ];
        }
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
        try {
            // Safely check if file exists before getting size
            let fileSize = 0;
            try {
                if (fs.existsSync(filePath)) {
                    fileSize = fs.statSync(filePath).size;
                }
            } catch (statError) {
                console.warn('⚠️ Could not get file size:', statError.message);
            }
            
            // Determine mime type based on document type
            const mimeType = docType === 'pdf' ? 'application/pdf' :
                           docType === 'docx' ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' :
                           'application/octet-stream';
            
            // Safe insert with all required columns including document_name
            db.run(`
                INSERT INTO generated_documents
                (subcomponent_id, document_type, document_name, file_path, file_size, mime_type, metadata)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `, [
                subcomponentId,
                docType,
                fileName,
                filePath,
                fileSize,
                mimeType,
                JSON.stringify({ category, fileName, generated: new Date().toISOString() })
            ],
            (err) => {
                if (err) {
                    console.error('❌ Error saving document record:', err.message);
                    // Don't throw - just log the error so document generation still succeeds
                } else {
                    console.log('✅ Document record saved successfully');
                }
            });
        } catch (error) {
            console.error('❌ Error in saveDocumentRecord:', error.message);
            // Don't throw - just log so the document generation can still complete
        }
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
/**
 * PDF Generator Service for ScaleOps6 Platform
 * 
 * Provides server-side PDF generation for templates
 * Uses puppeteer for HTML to PDF conversion
 * 
 * Installation: npm install puppeteer
 * Usage: const pdfGenerator = require('./pdf-generator-service');
 */

const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

class PDFGeneratorService {
    constructor() {
        this.browser = null;
    }

    async initialize() {
        if (!this.browser) {
            this.browser = await puppeteer.launch({
                headless: 'new',
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });
        }
        return this.browser;
    }

    async generatePDF(htmlContent, options = {}) {
        try {
            await this.initialize();
            const page = await this.browser.newPage();

            await page.setContent(htmlContent, {
                waitUntil: 'networkidle0'
            });

            const pdfBuffer = await page.pdf({
                format: options.format || 'A4',
                printBackground: true,
                margin: {
                    top: '20mm',
                    right: '15mm',
                    bottom: '20mm',
                    left: '15mm'
                },
                ...options
            });

            await page.close();
            return pdfBuffer;
        } catch (error) {
            console.error('PDF generation error:', error);
            throw error;
        }
    }

    async generateTemplatePDF(templateName, subcomponentId, workspaceData, score) {
        const templateHTML = this.getTemplateHTML(templateName, subcomponentId, workspaceData, score);
        return await this.generatePDF(templateHTML);
    }

    getTemplateHTML(templateName, subcomponentId, workspaceData, score) {
        const workspaceEntries = Object.entries(workspaceData || {});
        
        return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${templateName}</title>
    <style>
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            background: #0a0a0a;
            color: #e0e0e0;
            margin: 0;
            padding: 0;
        }
        .header {
            background: linear-gradient(135deg, #FF5500, #FF8800);
            color: white;
            padding: 40px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 36px;
            font-weight: 700;
        }
        .content {
            background: #1a1a1a;
            padding: 40px;
        }
        .section {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 25px;
            margin-bottom: 25px;
            page-break-inside: avoid;
        }
        .section h2 {
            color: #FF5500;
            border-bottom: 3px solid #FF5500;
            padding-bottom: 10px;
            margin-top: 0;
        }
        .answer-box {
            background: #0a0a0a;
            padding: 15px;
            border-left: 4px solid #FF5500;
            border-radius: 5px;
            margin: 10px 0;
        }
        @media print {
            body { background: white; color: black; }
            .header { background: #FF5500; }
            .section { border: 1px solid #ddd; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>${templateName.toUpperCase()}</h1>
        <p>Subcomponent: ${subcomponentId}</p>
        ${score > 0 ? `<p>Performance Score: ${score}%</p>` : ''}
        <p>Generated: ${new Date().toLocaleString()}</p>
    </div>
    <div class="content">
        <div class="section">
            <h2>Company Information</h2>
            <p><strong>Company:</strong> ST6Co</p>
            <p><strong>Product:</strong> ScaleOps6Product</p>
            <p><strong>Template:</strong> ${templateName}</p>
        </div>
        ${workspaceEntries.length > 0 ? `
        <div class="section">
            <h2>Workspace Responses</h2>
            ${workspaceEntries.map(([key, value]) => `
                <div style="margin-bottom: 20px;">
                    <h3 style="color: #fff;">${value.question || key}</h3>
                    <div class="answer-box">
                        ${value.answer || value}
                    </div>
                </div>
            `).join('')}
        </div>
        ` : ''}
        ${score > 0 ? `
        <div class="section">
            <h2>Performance Insights</h2>
            <p>Based on your ${score}% performance score:</p>
            <div class="answer-box">
                ${score >= 80 ? 'Excellent performance! Focus on scaling and optimization.' :
                  score >= 60 ? 'Good foundation. Implement recommended improvements.' :
                  'Building phase. Follow structured approach to strengthen fundamentals.'}
            </div>
        </div>
        ` : ''}
    </div>
</body>
</html>`;
    }

    async close() {
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
        }
    }
}

const pdfGenerator = new PDFGeneratorService();

module.exports = pdfGenerator;
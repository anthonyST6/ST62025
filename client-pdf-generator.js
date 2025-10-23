/**
 * Client-Side PDF Generator for ScaleOps6 Platform
 * 
 * Uses jsPDF library for browser-based PDF generation
 * No server-side dependencies required
 * 
 * CDN: https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js
 */

(function() {
    'use strict';
    
    console.log('📄 Client-side PDF Generator loading...');

    /**
     * Wait for jsPDF library to load
     */
    function waitForJsPDF() {
        return new Promise((resolve) => {
            if (window.jspdf) {
                resolve(window.jspdf);
                return;
            }
            
            const checkInterval = setInterval(() => {
                if (window.jspdf) {
                    clearInterval(checkInterval);
                    resolve(window.jspdf);
                }
            }, 100);
            
            // Timeout after 10 seconds
            setTimeout(() => {
                clearInterval(checkInterval);
                console.error('jsPDF library failed to load');
                resolve(null);
            }, 10000);
        });
    }

    /**
     * Generate PDF using jsPDF
     */
    window.generateClientPDF = async function(templateName, subcomponentId, workspaceData = {}, score = 0) {
        try {
            // Wait for jsPDF to be available
            const jsPDFLib = await waitForJsPDF();
            if (!jsPDFLib) {
                throw new Error('jsPDF library not loaded');
            }

            const { jsPDF } = jsPDFLib;
            
            // Create new PDF document
            const doc = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            // Set document properties
            doc.setProperties({
                title: templateName,
                subject: `ScaleOps6 - ${subcomponentId}`,
                author: 'ST6Co',
                keywords: 'scaleops6, template, gtm',
                creator: 'ScaleOps6 Platform'
            });

            // Page dimensions
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 20;
            const contentWidth = pageWidth - (2 * margin);
            let yPosition = margin;

            // Helper function to add new page if needed
            function checkPageBreak(requiredSpace = 20) {
                if (yPosition + requiredSpace > pageHeight - margin) {
                    doc.addPage();
                    yPosition = margin;
                    return true;
                }
                return false;
            }

            // Helper function to wrap text
            function addWrappedText(text, x, y, maxWidth, fontSize = 10, color = [0, 0, 0]) {
                doc.setFontSize(fontSize);
                doc.setTextColor(...color);
                const lines = doc.splitTextToSize(text, maxWidth);
                doc.text(lines, x, y);
                return lines.length * (fontSize * 0.35); // Return height used
            }

            // HEADER - Orange gradient effect with white text
            doc.setFillColor(255, 85, 0); // #FF5500
            doc.rect(0, 0, pageWidth, 50, 'F');
            
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(24);
            doc.setFont(undefined, 'bold');
            doc.text(templateName.toUpperCase(), pageWidth / 2, 20, { align: 'center' });
            
            doc.setFontSize(12);
            doc.setFont(undefined, 'normal');
            doc.text(`Subcomponent: ${subcomponentId}`, pageWidth / 2, 30, { align: 'center' });
            
            if (score > 0) {
                doc.text(`Performance Score: ${score}%`, pageWidth / 2, 38, { align: 'center' });
            }
            
            doc.setFontSize(10);
            doc.text(`Generated: ${new Date().toLocaleString()}`, pageWidth / 2, 45, { align: 'center' });

            yPosition = 60;

            // COMPANY INFORMATION SECTION
            checkPageBreak(40);
            
            // Section header with orange background
            doc.setFillColor(255, 85, 0);
            doc.rect(margin, yPosition, contentWidth, 10, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(14);
            doc.setFont(undefined, 'bold');
            doc.text('Company Information', margin + 5, yPosition + 7);
            
            yPosition += 15;
            
            // Section content
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(11);
            doc.setFont(undefined, 'normal');
            doc.text('Company: ST6Co', margin + 5, yPosition);
            yPosition += 7;
            doc.text('Product: ScaleOps6Product', margin + 5, yPosition);
            yPosition += 7;
            doc.text(`Template: ${templateName}`, margin + 5, yPosition);
            yPosition += 15;

            // WORKSPACE RESPONSES SECTION
            const workspaceEntries = Object.entries(workspaceData);
            
            if (workspaceEntries.length > 0) {
                checkPageBreak(40);
                
                // Section header
                doc.setFillColor(255, 85, 0);
                doc.rect(margin, yPosition, contentWidth, 10, 'F');
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(14);
                doc.setFont(undefined, 'bold');
                doc.text('Workspace Responses', margin + 5, yPosition + 7);
                
                yPosition += 15;

                // Add each question and answer
                workspaceEntries.forEach(([key, value], index) => {
                    const question = value.question || key;
                    const answer = value.answer || value;

                    checkPageBreak(30);

                    // Question
                    doc.setTextColor(255, 85, 0);
                    doc.setFontSize(11);
                    doc.setFont(undefined, 'bold');
                    const questionHeight = addWrappedText(
                        `Q${index + 1}: ${question}`,
                        margin + 5,
                        yPosition,
                        contentWidth - 10,
                        11,
                        [255, 85, 0]
                    );
                    yPosition += questionHeight + 3;

                    // Answer box background
                    checkPageBreak(20);
                    doc.setFillColor(245, 245, 245);
                    const answerBoxHeight = Math.min(40, answer.length / 5);
                    doc.rect(margin + 5, yPosition - 3, contentWidth - 10, answerBoxHeight, 'F');
                    
                    // Orange left border
                    doc.setFillColor(255, 85, 0);
                    doc.rect(margin + 5, yPosition - 3, 2, answerBoxHeight, 'F');

                    // Answer text
                    doc.setTextColor(0, 0, 0);
                    doc.setFontSize(10);
                    doc.setFont(undefined, 'normal');
                    const answerHeight = addWrappedText(
                        answer,
                        margin + 10,
                        yPosition + 3,
                        contentWidth - 20,
                        10,
                        [0, 0, 0]
                    );
                    
                    yPosition += Math.max(answerBoxHeight, answerHeight + 6) + 10;
                });
            } else {
                checkPageBreak(40);
                
                // Section header
                doc.setFillColor(255, 85, 0);
                doc.rect(margin, yPosition, contentWidth, 10, 'F');
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(14);
                doc.setFont(undefined, 'bold');
                doc.text('Template Content', margin + 5, yPosition + 7);
                
                yPosition += 15;
                
                doc.setTextColor(0, 0, 0);
                doc.setFontSize(11);
                doc.setFont(undefined, 'normal');
                doc.text('This template is ready for customization.', margin + 5, yPosition);
                yPosition += 7;
                doc.text('Complete the workspace tab to populate with your data.', margin + 5, yPosition);
                yPosition += 15;
            }

            // PERFORMANCE INSIGHTS SECTION (if score available)
            if (score > 0) {
                checkPageBreak(40);
                
                // Section header
                doc.setFillColor(255, 85, 0);
                doc.rect(margin, yPosition, contentWidth, 10, 'F');
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(14);
                doc.setFont(undefined, 'bold');
                doc.text('Performance Insights', margin + 5, yPosition + 7);
                
                yPosition += 15;
                
                doc.setTextColor(0, 0, 0);
                doc.setFontSize(11);
                doc.setFont(undefined, 'normal');
                doc.text(`Based on your ${score}% performance score:`, margin + 5, yPosition);
                yPosition += 10;
                
                // Insight box
                doc.setFillColor(245, 245, 245);
                doc.rect(margin + 5, yPosition - 3, contentWidth - 10, 20, 'F');
                doc.setFillColor(255, 85, 0);
                doc.rect(margin + 5, yPosition - 3, 2, 20, 'F');
                
                const insight = score >= 80 ? 'Excellent performance! Focus on scaling and optimization.' :
                               score >= 60 ? 'Good foundation. Implement recommended improvements.' :
                               'Building phase. Follow structured approach to strengthen fundamentals.';
                
                addWrappedText(insight, margin + 10, yPosition + 3, contentWidth - 20, 10, [0, 0, 0]);
                yPosition += 25;
            }

            // FOOTER
            const footerY = pageHeight - 15;
            doc.setFontSize(8);
            doc.setTextColor(128, 128, 128);
            doc.text('© 2025 ScaleOps6 Platform - ST6Co', pageWidth / 2, footerY, { align: 'center' });
            doc.text(`Page ${doc.internal.getNumberOfPages()}`, pageWidth - margin, footerY, { align: 'right' });

            // Save PDF
            const filename = `${templateName.toLowerCase().replace(/\s+/g, '-')}-${subcomponentId}.pdf`;
            doc.save(filename);

            return true;
        } catch (error) {
            console.error('Client PDF generation error:', error);
            throw error;
        }
    };

    /**
     * Download template as PDF (main function)
     */
    window.downloadTemplatePDF = async function(templateName, subcomponentId, workspaceData = {}, score = 0) {
        try {
            showPDFNotification('Generating PDF...', false);
            
            // Generate PDF using client-side jsPDF
            await window.generateClientPDF(templateName, subcomponentId, workspaceData, score);
            
            showPDFNotification(`✅ ${templateName} downloaded as PDF!`, true);
        } catch (error) {
            console.error('PDF download error:', error);
            showPDFNotification('❌ PDF generation failed. Downloading as HTML instead...', true);
            
            // Fallback to HTML download
            downloadTemplateHTML(templateName, subcomponentId, workspaceData, score);
        }
    };

    /**
     * Fallback HTML download
     */
    function downloadTemplateHTML(templateName, subcomponentId, workspaceData, score) {
        const content = generateTemplateHTML(templateName, subcomponentId, workspaceData, score);
        const blob = new Blob([content], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${templateName.toLowerCase().replace(/\s+/g, '-')}-${subcomponentId}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    /**
     * Generate HTML content for fallback
     */
    function generateTemplateHTML(templateName, subcomponentId, workspaceData, score) {
        const answersArray = Object.entries(workspaceData).map(([id, data]) => ({
            question: data.question || id,
            answer: data.answer || data
        }));

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${templateName} - ScaleOps6</title>
    <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #0a0a0a; color: #e0e0e0; margin: 0; padding: 20px; }
        .container { max-width: 900px; margin: 0 auto; background: #1a1a1a; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5); }
        .header { background: linear-gradient(135deg, #FF5500, #FF8800); color: white; padding: 40px; text-align: center; }
        .header h1 { margin: 0; font-size: 36px; font-weight: 700; }
        .content { padding: 40px; }
        .section { background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px; padding: 25px; margin-bottom: 25px; }
        .section h2 { color: #FF5500; border-bottom: 3px solid #FF5500; padding-bottom: 10px; margin-top: 0; }
        .answer-box { background: #0a0a0a; padding: 15px; border-left: 4px solid #FF5500; border-radius: 5px; margin: 10px 0; }
        @media print { body { background: white; color: black; } .container { box-shadow: none; } }
    </style>
</head>
<body>
    <div class="container">
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
            ${answersArray.length > 0 ? `
            <div class="section">
                <h2>Workspace Responses</h2>
                ${answersArray.map(item => `
                    <div style="margin-bottom: 20px;">
                        <h3>${item.question}</h3>
                        <div class="answer-box">${item.answer}</div>
                    </div>
                `).join('')}
            </div>
            ` : `
            <div class="section">
                <h2>Template Content</h2>
                <p>This template is ready for customization.</p>
                <p>Complete the workspace tab to populate with your data.</p>
            </div>
            `}
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
    </div>
</body>
</html>`;
    }

    /**
     * Show PDF notification
     */
    function showPDFNotification(message, isComplete) {
        let notification = document.getElementById('pdf-notification');
        
        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'pdf-notification';
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #FF5500, #FF8800);
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                box-shadow: 0 5px 20px rgba(255, 85, 0, 0.3);
                z-index: 10000;
                font-weight: 600;
                font-size: 14px;
                transition: all 0.3s ease;
            `;
            document.body.appendChild(notification);
        }

        notification.textContent = message;

        if (isComplete) {
            if (message.includes('✅')) {
                notification.style.background = 'linear-gradient(135deg, #4CAF50, #66BB6A)';
            } else if (message.includes('❌')) {
                notification.style.background = 'linear-gradient(135deg, #EF4444, #F87171)';
            }
            
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 3000);
        }
    }

    /**
     * Load jsPDF library if not already loaded
     */
    function loadJsPDFLibrary() {
        if (window.jspdf) {
            console.log('✅ jsPDF already loaded');
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            script.onload = () => {
                console.log('✅ jsPDF library loaded from CDN');
                resolve();
            };
            script.onerror = () => {
                console.error('❌ Failed to load jsPDF library');
                reject(new Error('Failed to load jsPDF'));
            };
            document.head.appendChild(script);
        });
    }

    // Load jsPDF library on initialization
    loadJsPDFLibrary().then(() => {
        console.log('✅ Client-side PDF Generator ready');
    }).catch(error => {
        console.error('⚠️ PDF generation will fall back to HTML:', error);
    });

})();
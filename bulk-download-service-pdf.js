
/**
 * Bulk Download Service with Client-Side PDF Generation
 * 
 * Downloads all templates as PDFs in a ZIP file
 * Uses jsPDF for PDF generation and JSZip for packaging
 * No server-side dependencies required
 */

(function() {
    'use strict';
    
    console.log('📦 Bulk PDF Download Service loading...');

    /**
     * Wait for required libraries
     */
    async function waitForLibraries() {
        // Wait for jsPDF
        const jsPDFLib = await new Promise((resolve) => {
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
            setTimeout(() => {
                clearInterval(checkInterval);
                resolve(null);
            }, 5000);
        });

        // Wait for JSZip
        const JSZip = await new Promise((resolve) => {
            if (window.JSZip) {
                resolve(window.JSZip);
                return;
            }
            const checkInterval = setInterval(() => {
                if (window.JSZip) {
                    clearInterval(checkInterval);
                    resolve(window.JSZip);
                }
            }, 100);
            setTimeout(() => {
                clearInterval(checkInterval);
                resolve(null);
            }, 5000);
        });

        return { jsPDFLib, JSZip };
    }

    /**
     * Download all templates as PDFs in a ZIP file
     */
    window.downloadAllTemplatesAsPDFZIP = async function() {
        try {
            // Get subcomponent data
            const urlParams = new URLSearchParams(window.location.search);
            const subcomponentId = urlParams.get('id') || '1-1';
            const subcomponentData = window.subcomponentData;
            
            if (!subcomponentData) {
                alert('Please wait for subcomponent data to load');
                return;
            }

            // Get templates
            const templates = subcomponentData.resources?.templates || [];
            if (templates.length === 0) {
                alert('No templates available for this subcomponent');
                return;
            }

            // Show progress
            showBulkPDFProgress(`Preparing ${templates.length} PDFs...`);

            // Wait for libraries
            const { jsPDFLib, JSZip } = await waitForLibraries();
            
            if (!jsPDFLib || !JSZip) {
                throw new Error('Required libraries not loaded');
            }

            const { jsPDF } = jsPDFLib;

            // Get workspace answers
            const workspaceAnswers = {};
            const inputs = document.querySelectorAll('#workspace-tab input, #workspace-tab textarea, #dynamic-worksheet-container input, #dynamic-worksheet-container textarea');
            inputs.forEach(input => {
                if (input.id && input.value) {
                    workspaceAnswers[input.id] = {
                        question: input.previousElementSibling?.textContent || input.placeholder || input.id,
                        answer: input.value
                    };
                }
            });

            // Get score history
            const historyKey = `score_history_${subcomponentId}`;
            const scoreHistory = JSON.parse(localStorage.getItem(historyKey) || '[]');
            const latestScore = scoreHistory[0]?.score || 0;

            // Create ZIP
            const zip = new JSZip();

            // Generate PDFs for each template
            for (let i = 0; i < templates.length; i++) {
                const templateName = templates[i];
                showBulkPDFProgress(`Generating PDF ${i + 1}/${templates.length}: ${templateName}...`);
                
                try {
                    const pdfBlob = await generateTemplatePDFBlob(jsPDF, templateName, subcomponentId, workspaceAnswers, latestScore);
                    const filename = `${i + 1}-${templateName.toLowerCase().replace(/\s+/g, '-')}.pdf`;
                    zip.file(filename, pdfBlob);
                } catch (error) {
                    console.error(`Error generating PDF for ${templateName}:`, error);
                }
            }

            // Add README
            const readmeContent = `ScaleOps6 Platform - Template Package

Subcomponent: ${subcomponentId}
Templates Included: ${templates.length} PDFs
Generated: ${new Date().toLocaleString()}
Performance Score: ${latestScore}%

Company: ST6Co
Product: ScaleOps6Product

Templates:
${templates.map((t, i) => `${i + 1}. ${t}`).join('\n')}

Instructions:
1. Open any PDF file to view the template
2. All templates include your workspace data
3. Templates are formatted with ST6 branding
4. Print or share as needed

© 2025 ScaleOps6. All rights reserved.`;

            zip.file('README.txt', readmeContent);

            // Generate ZIP file
            showBulkPDFProgress('Creating ZIP package...');
            const zipBlob = await zip.generateAsync({ type: 'blob' });

            // Download ZIP
            const url = window.URL.createObjectURL(zipBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${subcomponentId}-templates-${new Date().toISOString().split('T')[0]}.zip`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            showBulkPDFProgress(`✅ Downloaded ${templates.length} PDFs successfully!`, true);
            
        } catch (error) {
            console.error('Bulk PDF download error:', error);
            showBulkPDFProgress('❌ Error creating PDF package', true);
            alert('Error creating PDF package. Please try downloading templates individually.');
        }
    };

    /**
     * Generate PDF blob for a template
     */
    async function generateTemplatePDFBlob(jsPDF, templateName, subcomponentId, workspaceData, score) {
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
            return lines.length * (fontSize * 0.35);
        }

        // HEADER
        doc.setFillColor(255, 85, 0);
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

        // COMPANY INFORMATION
        checkPageBreak(40);
        doc.setFillColor(255, 85, 0);
        doc.rect(margin, yPosition, contentWidth, 10, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('Company Information', margin + 5, yPosition + 7);
        
        yPosition += 15;
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(11);
        doc.setFont(undefined, 'normal');
        doc.text('Company: ST6Co', margin + 5, yPosition);
        yPosition += 7;
        doc.text('Product: ScaleOps6Product', margin + 5, yPosition);
        yPosition += 7;
        doc.text(`Template: ${templateName}`, margin + 5, yPosition);
        yPosition += 15;

        // WORKSPACE RESPONSES
        const workspaceEntries = Object.entries(workspaceData);
        
        if (workspaceEntries.length > 0) {
            checkPageBreak(40);
            doc.setFillColor(255, 85, 0);
            doc.rect(margin, yPosition, contentWidth, 10, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(14);
            doc.setFont(undefined, 'bold');
            doc.text('Workspace Responses', margin + 5, yPosition + 7);
            yPosition += 15;

            workspaceEntries.forEach(([key, value], index) => {
                const question = value.question || key;
                const answer = value.answer || value;

                checkPageBreak(30);

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

                checkPageBreak(20);
                doc.setFillColor(245, 245, 245);
                const answerBoxHeight = Math.min(40, answer.length / 5);
                doc.rect(margin + 5, yPosition - 3, contentWidth - 10, answerBoxHeight, 'F');
                doc.setFillColor(255, 85, 0);
                doc.rect(margin + 5, yPosition - 3, 2, answerBoxHeight, 'F');

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
        }

        // PERFORMANCE INSIGHTS
        if (score > 0) {
            checkPageBreak(40);
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
            
            doc.setFillColor(245, 245, 245);
            doc.rect(margin + 5, yPosition - 3, contentWidth - 10, 20, 'F');
            doc.setFillColor(255, 85, 0);
            doc.rect(margin + 5, yPosition - 3, 2, 20, 'F');
            
            const insight = score >= 80 ? 'Excellent performance! Focus on scaling and optimization.' :
                           score >= 60 ? 'Good foundation. Implement recommended improvements.' :
                           'Building phase. Follow structured approach to strengthen fundamentals.';
            
            addWrappedText(insight, margin + 10, yPosition + 3, contentWidth - 20, 10, [0, 0, 0]);
        }

        // FOOTER
        const footerY = pageHeight - 15;
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text('© 2025 ScaleOps6 Platform - ST6Co', pageWidth / 2, footerY, { align: 'center' });

        // Return as blob
        return doc.output('blob');
    }

    /**
     * Show bulk PDF progress notification
     */
    function showBulkPDFProgress(message, isComplete = false) {
        let notification = document.getElementById('bulk-pdf-notification');
        
        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'bulk-pdf-notification';
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #FF5500, #FF8800);
                color: white;
                padding: 20px 30px;
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(255, 85, 0, 0.4);
                z-index: 10000;
                font-weight: 600;
                font-size: 16px;
                min-width: 300px;
                text-align: center;
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
     * Add bulk download button to Resources tab
     */
    function addBulkPDFDownloadButton() {
        const resourcesTab = document.getElementById('resources-tab');
        if (!resourcesTab) return;

        // Check if button already exists
        if (document.getElementById('bulk-pdf-download-btn')) return;

        // Find the templates section
        const templatesSection = resourcesTab.querySelector('.workspace-section');
        if (!templatesSection) return;

        // Create button container
        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = `
            margin-top: 30px;
            text-align: center;
            padding: 20px;
            background: rgba(255, 85, 0, 0.05);
            border: 2px dashed rgba(255, 85, 0, 0.3);
            border-radius: 15px;
        `;

        buttonContainer.innerHTML = `
            <button id="bulk-pdf-download-btn" onclick="window.downloadAllTemplatesAsPDFZIP()" style="
                background: linear-gradient(135deg, #FF5500, #FF8800);
                color: white;
                border: none;
                padding: 15px 40px;
                border-radius: 25px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 5px 20px rgba(255, 85, 0, 0.3);
            "
            onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(255, 85, 0, 0.4)';"
            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 5px 20px rgba(255, 85, 0, 0.3)';">
                📦 Download All Templates as PDF Package
            </button>
            <p style="margin: 15px 0 0 0; color: #999; font-size: 14px;">
                Downloads all ${window.subcomponentData?.resources?.templates?.length || 0} templates as PDFs in a ZIP file
            </p>
        `;

        templatesSection.appendChild(buttonContainer);
    }

    // Auto-add button when Resources tab is loaded
    const originalSwitchTab = window.switchTab;
    if (originalSwitchTab) {
        window.switchTab = function(tabName, event) {
            originalSwitchTab(tabName, event);
            
            if (tabName === 'resources') {
                setTimeout(() => {
                    addBulkPDFDownloadButton();
                }, 100);
            }
        };
    }

    // Add button on page load if Resources tab is active
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            if (document.getElementById('resources-tab')?.classList.contains('active')) {
                addBulkPDFDownloadButton();
            }
        }, 1000);
    });

    // Load JSZip library
    function loadJSZipLibrary() {
        if (window.JSZip) {
            console.log('✅ JSZip already loaded');
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
            script.onload = () => {
                console.log('✅ JSZip library loaded from CDN');
                resolve();
            };
            script.onerror = () => {
                console.error('❌ Failed to load JSZip library');
                reject(new Error('Failed to load JSZip'));
            };
            document.head.appendChild(script);
        });
    }

    // Load JSZip on initialization
    loadJSZipLibrary().then(() => {
        console.log('✅ Bulk PDF Download Service ready');
    }).catch(error => {
        console.error('⚠️ Bulk PDF downloads unavailable:', error);
    });

})();
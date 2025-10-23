/**
 * Enable Native PDF Downloads for ScaleOps6 Platform
 * 
 * Replaces HTML downloads with server-generated PDF downloads
 * Works for both Resources and Output tabs
 */

(function() {
    'use strict';
    
    console.log('📄 Enabling native PDF downloads...');

    /**
     * Download template as PDF from server
     */
    window.downloadTemplatePDF = async function(templateName, subcomponentId, workspaceData = {}, score = 0) {
        try {
            // Show loading notification
            showDownloadNotification('Generating PDF...', false);

            // Call server endpoint
            const response = await fetch('/api/download-template-pdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    templateName,
                    subcomponentId,
                    workspaceData,
                    score
                })
            });

            if (!response.ok) {
                throw new Error(`Server returned ${response.status}`);
            }

            // Get PDF blob
            const blob = await response.blob();
            
            // Download PDF
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${templateName.toLowerCase().replace(/\s+/g, '-')}-${subcomponentId}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            showDownloadNotification(`✅ ${templateName} downloaded as PDF!`, true);
        } catch (error) {
            console.error('PDF download error:', error);
            showDownloadNotification('❌ PDF generation failed. Downloading as HTML instead...', true);
            
            // Fallback to HTML download
            downloadTemplateHTML(templateName, subcomponentId, workspaceData, score);
        }
    };

    /**
     * Fallback HTML download (original functionality)
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
    <title>${templateName} - ScaleOps6</title>
    <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #0a0a0a; color: #e0e0e0; margin: 0; padding: 20px; }
        .container { max-width: 900px; margin: 0 auto; background: #1a1a1a; border-radius: 15px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #FF5500, #FF8800); color: white; padding: 40px; text-align: center; }
        .content { padding: 40px; }
        .section { background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px; padding: 25px; margin-bottom: 25px; }
        .section h2 { color: #FF5500; border-bottom: 3px solid #FF5500; padding-bottom: 10px; }
        .answer-box { background: #0a0a0a; padding: 15px; border-left: 4px solid #FF5500; border-radius: 5px; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${templateName.toUpperCase()}</h1>
            <p>Subcomponent: ${subcomponentId}</p>
            ${score > 0 ? `<p>Performance Score: ${score}%</p>` : ''}
        </div>
        <div class="content">
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
                <p>Company: ST6Co</p>
                <p>Product: ScaleOps6Product</p>
                <p>Generated: ${new Date().toLocaleString()}</p>
            </div>
            `}
        </div>
    </div>
</body>
</html>`;
    }

    /**
     * Show download notification
     */
    function showDownloadNotification(message, isComplete) {
        let notification = document.getElementById('pdf-download-notification');
        
        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'pdf-download-notification';
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
     * Override existing download functions to use PDF
     */
    
    // Override downloadTemplateFile (Resources tab)
    const originalDownloadTemplateFile = window.downloadTemplateFile;
    window.downloadTemplateFile = function(templateName, subcomponentId) {
        const urlParams = new URLSearchParams(window.location.search);
        const currentSubId = urlParams.get('id') || subcomponentId;
        
        // Get workspace data
        const workspaceData = {};
        const inputs = document.querySelectorAll('#workspace-tab input, #workspace-tab textarea, #dynamic-worksheet-container input, #dynamic-worksheet-container textarea');
        inputs.forEach(input => {
            if (input.id && input.value) {
                workspaceData[input.id] = {
                    question: input.previousElementSibling?.textContent || input.placeholder || input.id,
                    answer: input.value
                };
            }
        });

        // Get score
        const historyKey = `score_history_${currentSubId}`;
        const scoreHistory = JSON.parse(localStorage.getItem(historyKey) || '[]');
        const latestScore = scoreHistory[0]?.score || 0;

        // Download as PDF
        window.downloadTemplatePDF(templateName, currentSubId, workspaceData, latestScore);
    };

    // Override downloadPopulatedTemplate (Output tab)
    const originalDownloadPopulatedTemplate = window.downloadPopulatedTemplate;
    window.downloadPopulatedTemplate = function(index, templateName, answersJSON, score) {
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        
        let workspaceAnswers = {};
        try {
            workspaceAnswers = JSON.parse(answersJSON.replace(/&quot;/g, '"'));
        } catch (e) {
            console.error('Error parsing workspace answers:', e);
        }

        // Download as PDF
        window.downloadTemplatePDF(templateName, subcomponentId, workspaceAnswers, score);
    };

    // Override downloadEnhancedTemplate (if exists)
    if (window.downloadEnhancedTemplate) {
        const originalDownloadEnhanced = window.downloadEnhancedTemplate;
        window.downloadEnhancedTemplate = function(index, subcomponentId) {
            const urlParams = new URLSearchParams(window.location.search);
            const currentSubId = subcomponentId || urlParams.get('id') || '1-1';
            
            // Get workspace data
            const workspaceData = {};
            const inputs = document.querySelectorAll('#workspace-tab input, #workspace-tab textarea, #dynamic-worksheet-container input, #dynamic-worksheet-container textarea');
            inputs.forEach(input => {
                if (input.id && input.value) {
                    workspaceData[input.id] = {
                        question: input.previousElementSibling?.textContent || input.placeholder || input.id,
                        answer: input.value
                    };
                }
            });

            // Get score
            const historyKey = `score_history_${currentSubId}`;
            const scoreHistory = JSON.parse(localStorage.getItem(historyKey) || '[]');
            const latestScore = scoreHistory[0]?.score || 0;

            // Get template name from SSOT
            const templates = window.subcomponentData?.resources?.templates || [];
            const templateName = templates[index] || 'Template';

            // Download as PDF
            window.downloadTemplatePDF(templateName, currentSubId, workspaceData, latestScore);
        };
    }

    console.log('✅ Native PDF downloads enabled for all templates');

})();
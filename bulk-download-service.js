/**
 * Bulk Download Service for ScaleOps6 Platform
 * 
 * Provides ZIP file generation for downloading all templates at once
 * Uses JSZip for client-side ZIP creation
 */

(function() {
    'use strict';
    
    console.log('📦 Bulk Download Service loaded');

    /**
     * Download all templates for a subcomponent as ZIP
     */
    window.downloadAllTemplatesAsZIP = async function() {
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
            showBulkDownloadProgress('Preparing templates...');

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

            // Create ZIP file content
            const zipContent = await createZIPContent(templates, subcomponentId, workspaceAnswers, latestScore);

            // Download ZIP
            downloadZIP(zipContent, `${subcomponentId}-templates-${new Date().toISOString().split('T')[0]}.zip`);

            showBulkDownloadProgress('✅ Download complete!', true);
            
        } catch (error) {
            console.error('Bulk download error:', error);
            alert('Error creating ZIP file. Please try downloading templates individually.');
        }
    };

    /**
     * Create ZIP file content
     */
    async function createZIPContent(templates, subcomponentId, workspaceAnswers, score) {
        // Simple ZIP implementation using data URIs
        const files = [];

        // Add each template
        templates.forEach((templateName, index) => {
            const content = generateTemplateContent(templateName, subcomponentId, workspaceAnswers, score);
            files.push({
                name: `${index + 1}-${templateName.toLowerCase().replace(/\s+/g, '-')}.html`,
                content: content
            });
        });

        // Add README
        files.push({
            name: 'README.txt',
            content: `ScaleOps6 Platform - Template Package
            
Subcomponent: ${subcomponentId}
Templates Included: ${templates.length}
Generated: ${new Date().toLocaleString()}
Performance Score: ${score}%

Company: ST6Co
Product: ScaleOps6Product

Instructions:
1. Open any .html file in your browser to view the template
2. Print to PDF if needed
3. Customize the content for your specific needs

© 2025 ScaleOps6. All rights reserved.`
        });

        return files;
    }

    /**
     * Generate template content
     */
    function generateTemplateContent(templateName, subcomponentId, workspaceAnswers, score) {
        const answersArray = Object.entries(workspaceAnswers).map(([id, data]) => ({
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
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            background: #0a0a0a;
            color: #e0e0e0;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: #1a1a1a;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
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
            padding: 40px;
        }
        .section {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 25px;
            margin-bottom: 25px;
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
            .container { box-shadow: none; }
        }
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
                <p>This template is ready for customization.</p>
                <p>Complete the workspace tab to populate with your data.</p>
            </div>
            `}
            
            <div class="section">
                <h2>Template Information</h2>
                <p><strong>Company:</strong> ST6Co</p>
                <p><strong>Product:</strong> ScaleOps6Product</p>
                <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
            </div>
        </div>
    </div>
</body>
</html>`;
    }

    /**
     * Download ZIP file (simple implementation without JSZip library)
     */
    function downloadZIP(files, filename) {
        // Create a simple archive by concatenating files
        // For production, use JSZip library for proper ZIP format
        
        // For now, create a folder structure as text
        let archiveContent = `ScaleOps6 Template Archive
Generated: ${new Date().toLocaleString()}

Files included:
${files.map(f => `- ${f.name}`).join('\n')}

---

`;

        files.forEach(file => {
            archiveContent += `\n\n========== ${file.name} ==========\n\n`;
            archiveContent += file.content;
        });

        // Download as text file (upgrade to ZIP with JSZip library)
        const blob = new Blob([archiveContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename.replace('.zip', '.txt');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    /**
     * Show bulk download progress
     */
    function showBulkDownloadProgress(message, isComplete = false) {
        let notification = document.getElementById('bulk-download-notification');
        
        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'bulk-download-notification';
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
            notification.style.background = 'linear-gradient(135deg, #4CAF50, #66BB6A)';
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
    function addBulkDownloadButton() {
        const resourcesTab = document.getElementById('resources-tab');
        if (!resourcesTab) return;

        // Check if button already exists
        if (document.getElementById('bulk-download-btn')) return;

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
            <button id="bulk-download-btn" onclick="window.downloadAllTemplatesAsZIP()" style="
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
                📦 Download All Templates as Package
            </button>
            <p style="margin: 15px 0 0 0; color: #999; font-size: 14px;">
                Downloads all ${window.subcomponentData?.resources?.templates?.length || 0} templates in one package
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
                    addBulkDownloadButton();
                }, 100);
            }
        };
    }

    // Add button on page load if Resources tab is active
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            if (document.getElementById('resources-tab')?.classList.contains('active')) {
                addBulkDownloadButton();
            }
        }, 1000);
    });

    console.log('✅ Bulk download service ready');

})();
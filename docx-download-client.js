/**
 * DOCX Download Client
 * Simple client-side script that calls server DOCX endpoint
 * Replaces PDF downloads with actual downloadable Word documents
 * Works for both Resources and Output tabs
 */

(function() {
    'use strict';
    
    console.log('📄 DOCX Download Client loaded');
    
    /**
     * Show progress notification
     */
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'linear-gradient(135deg, #4CAF50, #66BB6A)' : 
                         type === 'error' ? 'linear-gradient(135deg, #f44336, #e57373)' :
                         'linear-gradient(135deg, #2196F3, #64B5F6)'};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            font-weight: 600;
            font-size: 14px;
            max-width: 400px;
            animation: slideIn 0.3s ease-out;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    /**
     * Download DOCX from server
     * @param {string} templateName - Name of the template
     * @param {string} subcomponentId - Subcomponent ID
     * @param {object} workspaceData - Workspace answers
     * @param {number} score - Score (if available)
     * @param {boolean} isTemplate - True for template documents, false for analysis reports
     */
    async function downloadDOCX(templateName, subcomponentId, workspaceData = {}, score = 0, isTemplate = false, isBlank = false) {
        try {
            // Removed notification - silent download
            
            // Prepare data for server
            const requestData = {
                templateName: templateName,
                subcomponentId: subcomponentId,
                workspaceData: isBlank ? {} : workspaceData,  // Empty for blank templates
                score: score,
                timestamp: new Date().toISOString(),
                company: 'ST6Co',
                product: 'ScaleOps6'
            };
            
            // Choose endpoint based on document type
            const endpoint = isBlank
                ? `/api/generate-template-docx/${subcomponentId}`           // BLANK templates (Resources tab)
                : isTemplate
                ? `/api/generate-populated-template-docx/${subcomponentId}` // POPULATED templates (Output tab)
                : `/api/generate-docx/${subcomponentId}`;                   // Analysis reports with scores
            
            // Call server DOCX generation endpoint
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });
            
            if (!response.ok) {
                throw new Error(`Server returned ${response.status}`);
            }
            
            const result = await response.json();
            
            if (result.success && result.url) {
                // Use the server URL instead of file path
                const serverUrl = `http://localhost:3001${result.url}`;
                
                // Download the generated file
                const downloadLink = document.createElement('a');
                downloadLink.href = serverUrl;
                downloadLink.download = result.filename || `${templateName.toLowerCase().replace(/\s+/g, '-')}-${subcomponentId}.docx`;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
                
                // Removed success notification - silent download
                return true;
            } else {
                throw new Error(result.error || 'Failed to generate DOCX');
            }
            
        } catch (error) {
            console.error('Error downloading DOCX:', error);
            // Removed error notification - silent failure (logged to console)
            return false;
        }
    }
    
    /**
     * Main DOCX download function - used by all download buttons
     * This is called from Output tab - generates TEMPLATE documents
     */
    window.downloadDOCXTemplate = function(templateName, subcomponentId, workspaceData = {}, score = 0) {
        console.log(`📄 Downloading template document: ${templateName} for ${subcomponentId}`);
        downloadDOCX(templateName, subcomponentId, workspaceData, score, true); // isTemplate = true
    };
    
    /**
     * Override downloadTemplateFile for Resources tab
     * This generates BLANK templates WITHOUT workspace data
     */
    window.downloadTemplateFile = function(templateName, subcomponentId) {
        console.log(`📄 Downloading BLANK template: ${templateName} for ${subcomponentId}`);
        
        // Resources tab = BLANK templates (no workspace data)
        downloadDOCX(templateName, subcomponentId, {}, 0, true, true); // isTemplate = true, isBlank = true
    };
    
    /**
     * Override downloadPopulatedTemplate for Output tab
     * This generates POPULATED templates WITH workspace data
     */
    window.downloadPopulatedTemplate = function(index, templateName, answersJSON, score) {
        console.log(`📄 Downloading POPULATED template: ${templateName}`);
        
        try {
            // Parse workspace answers
            const workspaceAnswers = JSON.parse(answersJSON.replace(/&quot;/g, '"'));
            
            // Get subcomponent ID from URL
            const urlParams = new URLSearchParams(window.location.search);
            const subcomponentId = urlParams.get('id') || '1-1';
            
            downloadDOCX(templateName, subcomponentId, workspaceAnswers, score, true, false); // isTemplate = true, isBlank = false
            
        } catch (error) {
            console.error('Error parsing workspace data:', error);
            showNotification('❌ Error preparing download', 'error');
        }
    };
    
    /**
     * Download Analysis Report (from Analysis tab)
     * This generates ANALYSIS REPORT documents with scores/recommendations
     */
    window.downloadAnalysisReport = function(subcomponentId, analysisData) {
        console.log(`📄 Downloading analysis report for ${subcomponentId}`);
        downloadDOCX('Analysis Report', subcomponentId, {}, analysisData.score || 0, false); // isTemplate = false
    };
    
    /**
     * Add CSS animations
     */
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    console.log('✅ DOCX Download Client ready - Resources and Output tabs will download .docx files');
    
})();
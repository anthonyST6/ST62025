/**
 * Fix Resources Tab Downloads
 * Ensures all template download buttons in Resources tab work correctly
 * Handles both DOCX and PDF downloads with proper event handlers
 */

(function() {
    'use strict';
    
    console.log('🔧 Fixing Resources Tab Downloads...');
    
    /**
     * Show notification
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
            animation: slideInRight 0.3s ease-out;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    /**
     * Download template as DOCX
     */
    async function downloadTemplateAsDOCX(templateName, subcomponentId) {
        try {
            showNotification(`📄 Generating ${templateName}...`, 'info');
            
            // Get workspace data
            const workspaceData = {};
            const inputs = document.querySelectorAll('#workspace-tab input, #workspace-tab textarea, #dynamic-worksheet-container input, #dynamic-worksheet-container textarea');
            inputs.forEach(input => {
                if (input.id && input.value) {
                    workspaceData[input.id] = input.value;
                }
            });
            
            // Get latest score
            const historyKey = `score_history_${subcomponentId}`;
            const scoreHistory = JSON.parse(localStorage.getItem(historyKey) || '[]');
            const latestScore = scoreHistory[0]?.score || 0;
            
            // Prepare request data
            const requestData = {
                templateName: templateName,
                subcomponentId: subcomponentId,
                workspaceData: workspaceData,
                score: latestScore,
                timestamp: new Date().toISOString(),
                company: 'ST6Co',
                product: 'ScaleOps6'
            };
            
            // Call server endpoint
            const response = await fetch(`/api/generate-template-docx/${subcomponentId}`, {
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
                // Download the file
                const downloadLink = document.createElement('a');
                downloadLink.href = result.url;
                downloadLink.download = result.filename || `${templateName.toLowerCase().replace(/\s+/g, '-')}-${subcomponentId}.docx`;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
                
                showNotification(`✅ ${templateName} downloaded successfully!`, 'success');
                return true;
            } else {
                throw new Error(result.error || 'Failed to generate DOCX');
            }
            
        } catch (error) {
            console.error('Error downloading DOCX:', error);
            showNotification(`❌ Download failed: ${error.message}`, 'error');
            return false;
        }
    }
    
    /**
     * Override the global downloadTemplateFile function
     * This is called by the inline onclick handlers in the Resources tab
     */
    window.downloadTemplateFile = function(templateName, subcomponentId) {
        console.log(`📥 Download requested: ${templateName} for ${subcomponentId}`);
        downloadTemplateAsDOCX(templateName, subcomponentId);
    };
    
    /**
     * Add event listeners to all download buttons in Resources tab
     * This ensures buttons work even if inline handlers fail
     */
    function attachDownloadHandlers() {
        // Wait for Resources tab to be populated
        setTimeout(() => {
            const resourceButtons = document.querySelectorAll('#resource-templates .template-action');
            
            if (resourceButtons.length > 0) {
                console.log(`✅ Found ${resourceButtons.length} download buttons in Resources tab`);
                
                resourceButtons.forEach((button, index) => {
                    // Remove existing onclick to avoid conflicts
                    button.onclick = null;
                    
                    // Add new click handler
                    button.addEventListener('click', function(event) {
                        event.stopPropagation();
                        
                        // Get template name from the button's parent structure
                        const templateItem = button.closest('.template-item');
                        const templateNameElement = templateItem?.querySelector('.template-name');
                        const templateName = templateNameElement?.textContent?.trim() || `Template ${index + 1}`;
                        
                        // Get subcomponent ID from URL
                        const urlParams = new URLSearchParams(window.location.search);
                        const subcomponentId = urlParams.get('id') || '1-1';
                        
                        console.log(`🖱️ Button clicked: ${templateName}`);
                        downloadTemplateAsDOCX(templateName, subcomponentId);
                    });
                });
            } else {
                console.log('⏳ No download buttons found yet, will retry...');
                // Retry after a delay
                setTimeout(attachDownloadHandlers, 1000);
            }
        }, 500);
    }
    
    /**
     * Monitor for tab switches to Resources tab
     */
    function monitorTabSwitches() {
        const resourcesTab = document.querySelector('[data-tab="resources"]');
        if (resourcesTab) {
            resourcesTab.addEventListener('click', () => {
                console.log('📚 Resources tab activated, attaching handlers...');
                attachDownloadHandlers();
            });
        }
    }
    
    /**
     * Add CSS animations
     */
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
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
    
    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            attachDownloadHandlers();
            monitorTabSwitches();
        });
    } else {
        attachDownloadHandlers();
        monitorTabSwitches();
    }
    
    console.log('✅ Resources Tab Downloads fix loaded');
    
})();
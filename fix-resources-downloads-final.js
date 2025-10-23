/**
 * Fix Resources Tab Downloads - FINAL VERSION
 * This MUST load AFTER pdf-download-authority.js to override its non-writable functions
 * Uses direct DOM manipulation to ensure buttons work
 */

(function() {
    'use strict';
    
    console.log('🔧 [FINAL] Fixing Resources Tab Downloads...');
    
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
            console.log(`📥 [FINAL] Downloading: ${templateName} for ${subcomponentId}`);
            // Removed notification - silent download
            
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
            
            console.log('📤 Sending request to server...', requestData);
            
            // Call server endpoint
            const response = await fetch(`/api/generate-template-docx/${subcomponentId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });
            
            console.log('📨 Server response status:', response.status);
            
            if (!response.ok) {
                throw new Error(`Server returned ${response.status}`);
            }
            
            const result = await response.json();
            console.log('📦 Server result:', result);
            
            if (result.success && result.url) {
                // Download the file
                const downloadLink = document.createElement('a');
                downloadLink.href = result.url;
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
            console.error('❌ Download error:', error);
            // Removed error notification - silent failure (logged to console)
            return false;
        }
    }
    
    /**
     * Attach handlers to all download buttons
     */
    function attachDownloadHandlers() {
        console.log('🔍 [FINAL] Looking for download buttons...');
        
        // Wait for Resources tab content to load
        setTimeout(() => {
            const resourceButtons = document.querySelectorAll('#resource-templates .template-action');
            
            console.log(`📊 [FINAL] Found ${resourceButtons.length} download buttons`);
            
            if (resourceButtons.length > 0) {
                resourceButtons.forEach((button, index) => {
                    console.log(`🔧 [FINAL] Attaching handler to button ${index + 1}`);
                    
                    // Remove ALL existing event listeners by cloning
                    const newButton = button.cloneNode(true);
                    button.parentNode.replaceChild(newButton, button);
                    
                    // Add new click handler
                    newButton.addEventListener('click', function(event) {
                        event.preventDefault();
                        event.stopPropagation();
                        
                        console.log(`🖱️ [FINAL] Button ${index + 1} clicked!`);
                        
                        // Get template name from the button's parent structure
                        const templateItem = newButton.closest('.template-item');
                        const templateNameElement = templateItem?.querySelector('.template-name');
                        const templateName = templateNameElement?.textContent?.trim() || `Template ${index + 1}`;
                        
                        // Get subcomponent ID from URL
                        const urlParams = new URLSearchParams(window.location.search);
                        const subcomponentId = urlParams.get('id') || '1-1';
                        
                        console.log(`📥 [FINAL] Initiating download: ${templateName} for ${subcomponentId}`);
                        downloadTemplateAsDOCX(templateName, subcomponentId);
                    });
                });
                
                console.log('✅ [FINAL] All download handlers attached successfully!');
            } else {
                console.log('ℹ️ [FINAL] No buttons found - Resources tab may not be active yet');
            }
        }, 500);
    }
    
    /**
     * Monitor for Resources tab activation
     */
    function monitorResourcesTab() {
        console.log('👀 [FINAL] Monitoring for Resources tab activation...');
        
        const resourcesTabButton = document.querySelector('[data-tab="resources"]');
        if (resourcesTabButton) {
            resourcesTabButton.addEventListener('click', () => {
                console.log('📚 [FINAL] Resources tab clicked, attaching handlers...');
                setTimeout(attachDownloadHandlers, 500);
            });
        }
        
        // Also check if we're already on the Resources tab
        const resourcesTab = document.getElementById('resources-tab');
        if (resourcesTab && resourcesTab.classList.contains('active')) {
            console.log('📚 [FINAL] Already on Resources tab, attaching handlers...');
            attachDownloadHandlers();
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
            console.log('📄 [FINAL] DOM loaded, initializing...');
            attachDownloadHandlers();
            monitorResourcesTab();
        });
    } else {
        console.log('📄 [FINAL] DOM already loaded, initializing...');
        attachDownloadHandlers();
        monitorResourcesTab();
    }
    
    console.log('✅ [FINAL] Resources Tab Downloads fix loaded and ready!');
    
})();
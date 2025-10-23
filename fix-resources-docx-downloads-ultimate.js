/**
 * Ultimate Resources Tab DOCX Downloads Fix
 * Runs LAST to ensure DOCX downloads work after all other scripts
 * Waits for enhanced-tabs-st6-branding.js to finish, then applies handlers
 */

(function() {
    'use strict';
    
    console.log('🎯 [ULTIMATE] Resources DOCX Downloads Fix Loading...');
    
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
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 3000);
    }
    
    /**
     * Download BLANK template as DOCX (Resources tab)
     */
    async function downloadTemplateAsDOCX(templateName, subcomponentId) {
        try {
            console.log(`📥 [ULTIMATE] Downloading BLANK template: ${templateName} for ${subcomponentId}`);
            // Removed notification - silent download
            
            // NO workspace data - this is a BLANK template for Resources tab
            // Users will download it empty and fill it out themselves
            
            // Prepare request data (NO workspaceData or score)
            const requestData = {
                templateName: templateName,
                subcomponentId: subcomponentId,
                timestamp: new Date().toISOString(),
                company: 'ST6Co',
                product: 'ScaleOps6'
            };
            
            console.log('📤 [ULTIMATE] Sending request to server...', requestData);
            
            // Call server endpoint
            const response = await fetch(`/api/generate-template-docx/${subcomponentId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });
            
            console.log('📨 [ULTIMATE] Server response status:', response.status);
            
            if (!response.ok) {
                throw new Error(`Server returned ${response.status}`);
            }
            
            const result = await response.json();
            console.log('📦 [ULTIMATE] Server result:', result);
            
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
            console.error('❌ [ULTIMATE] Download error:', error);
            // Removed error notification - silent failure (logged to console)
            return false;
        }
    }
    
    /**
     * Apply DOCX download handlers to all buttons
     */
    function applyDOCXHandlers() {
        console.log('🔍 [ULTIMATE] Applying DOCX handlers to Resources tab buttons...');
        
        // Wait a bit for enhanced-tabs to finish
        setTimeout(() => {
            // Find all download buttons using the onclick attribute
            const allButtons = document.querySelectorAll('#resource-templates button');
            console.log(`📊 [ULTIMATE] Found ${allButtons.length} total buttons in Resources tab`);
            
            let downloadButtonCount = 0;
            allButtons.forEach((button, index) => {
                // Check if this is a download button
                if (button.textContent.includes('Download') || button.textContent.includes('⬇️')) {
                    downloadButtonCount++;
                    console.log(`🔧 [ULTIMATE] Processing download button ${downloadButtonCount}: "${button.textContent.trim()}"`);
                    
                    // Get template name from data attribute or DOM
                    let templateName = button.getAttribute('data-template-name');
                    let subId = button.getAttribute('data-subcomponent-id');
                    
                    if (!templateName) {
                        // Fallback: extract from DOM structure
                        const templateItem = button.closest('.template-item') || button.closest('[style*="template-item"]') || button.parentElement.parentElement;
                        if (templateItem) {
                            const nameElement = templateItem.querySelector('.template-name') ||
                                              templateItem.querySelector('h4') ||
                                              templateItem.querySelector('[class*="template-name"]');
                            if (nameElement) {
                                templateName = nameElement.textContent.trim();
                            }
                        }
                    }
                    
                    if (!templateName) {
                        templateName = `Template ${downloadButtonCount}`;
                    }
                    
                    console.log(`   📝 [ULTIMATE] Template name: "${templateName}"`);
                    
                    // Remove ALL event listeners by cloning
                    const newButton = button.cloneNode(true);
                    button.parentNode.replaceChild(newButton, button);
                    
                    // Add DOCX download handler
                    newButton.addEventListener('click', function(event) {
                        event.preventDefault();
                        event.stopPropagation();
                        
                        console.log(`🖱️ [ULTIMATE] Button clicked for: "${templateName}"`);
                        
                        // Get subcomponent ID from URL
                        const urlParams = new URLSearchParams(window.location.search);
                        const subcomponentId = urlParams.get('id') || '1-1';
                        
                        downloadTemplateAsDOCX(templateName, subcomponentId);
                    });
                    
                    console.log(`   ✅ [ULTIMATE] Handler attached to button ${downloadButtonCount}`);
                }
            });
            
            console.log(`✅ [ULTIMATE] Applied DOCX handlers to ${downloadButtonCount} download buttons`);
        }, 1000); // Wait 1 second for enhanced-tabs to finish
    }
    
    /**
     * Monitor for Resources tab activation
     */
    function monitorResourcesTab() {
        console.log('👀 [ULTIMATE] Monitoring for Resources tab activation...');
        
        // Use MutationObserver to watch for Resources tab content changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.target.id === 'resource-templates' || 
                    mutation.target.closest('#resource-templates')) {
                    console.log('🔄 [ULTIMATE] Resources tab content changed, reapplying handlers...');
                    applyDOCXHandlers();
                }
            });
        });
        
        // Start observing the resources tab
        const resourcesTab = document.getElementById('resources-tab');
        if (resourcesTab) {
            observer.observe(resourcesTab, {
                childList: true,
                subtree: true
            });
            console.log('✅ [ULTIMATE] MutationObserver active on Resources tab');
        }
        
        // Also listen for tab clicks
        const resourcesTabButton = document.querySelector('[data-tab="resources"]');
        if (resourcesTabButton) {
            resourcesTabButton.addEventListener('click', () => {
                console.log('📚 [ULTIMATE] Resources tab clicked, applying handlers...');
                applyDOCXHandlers();
            });
        }
    }
    
    // Initialize after a delay to ensure all other scripts have loaded
    setTimeout(() => {
        console.log('🚀 [ULTIMATE] Initializing...');
        applyDOCXHandlers();
        monitorResourcesTab();
        console.log('✅ [ULTIMATE] Resources DOCX Downloads Fix Ready!');
    }, 2000); // Wait 2 seconds for all other scripts
    
})();
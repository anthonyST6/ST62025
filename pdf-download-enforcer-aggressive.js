/**
 * AGGRESSIVE PDF Download Enforcer
 * 
 * This script uses a more aggressive approach to ensure PDF downloads:
 * 1. Intercepts ALL download function calls
 * 2. Replaces them with PDF generation BEFORE they execute
 * 3. Uses Proxy objects to catch any override attempts
 * 4. Monitors and blocks HTML blob creation
 */

(function() {
    'use strict';
    
    console.log('🔥 AGGRESSIVE PDF Download Enforcer loading...');

    // Wait for dependencies
    function waitForDependencies() {
        return new Promise((resolve) => {
            let attempts = 0;
            const maxAttempts = 100;
            
            const checkInterval = setInterval(() => {
                attempts++;
                
                if (window.jspdf && typeof window.generateClientPDF === 'function') {
                    clearInterval(checkInterval);
                    console.log('✅ Dependencies ready for aggressive enforcer');
                    resolve(true);
                } else if (attempts >= maxAttempts) {
                    clearInterval(checkInterval);
                    console.error('❌ Dependencies failed - enforcer cannot activate');
                    resolve(false);
                }
            }, 100);
        });
    }

    // Main PDF download function
    async function forcePDFDownload(templateName, subcomponentId, workspaceData = {}, score = 0) {
        console.log('🔥 FORCING PDF DOWNLOAD:', templateName);
        
        try {
            // Ensure we have workspace data
            if (Object.keys(workspaceData).length === 0) {
                const inputs = document.querySelectorAll(
                    '#workspace-tab input, #workspace-tab textarea, ' +
                    '#dynamic-worksheet-container input, #dynamic-worksheet-container textarea'
                );
                
                inputs.forEach(input => {
                    if (input.id && input.value) {
                        workspaceData[input.id] = {
                            question: input.previousElementSibling?.textContent || input.placeholder || input.id,
                            answer: input.value
                        };
                    }
                });
            }

            // Ensure we have score
            if (score === 0) {
                const historyKey = `score_history_${subcomponentId}`;
                const scoreHistory = JSON.parse(localStorage.getItem(historyKey) || '[]');
                score = scoreHistory[0]?.score || 0;
            }

            // Call PDF generator
            await window.generateClientPDF(templateName, subcomponentId, workspaceData, score);
            
            console.log('✅ PDF generated successfully');
            return true;
        } catch (error) {
            console.error('❌ PDF generation failed:', error);
            alert('PDF generation failed: ' + error.message);
            return false;
        }
    }

    // Initialize after dependencies ready
    waitForDependencies().then((ready) => {
        if (!ready) return;

        console.log('🔥 Activating aggressive PDF enforcement...');

        // Store original Blob constructor
        const OriginalBlob = window.Blob;
        
        // Intercept Blob creation to block HTML downloads
        window.Blob = function(parts, options) {
            // Check if this is an HTML blob for download
            if (options && options.type === 'text/html') {
                const content = parts[0];
                if (typeof content === 'string' && content.includes('<!DOCTYPE html>')) {
                    console.warn('🚫 BLOCKED HTML blob creation - use PDF instead!');
                    // Return empty blob to prevent download
                    return new OriginalBlob([''], { type: 'text/plain' });
                }
            }
            // Allow other blobs
            return new OriginalBlob(parts, options);
        };

        // AGGRESSIVE OVERRIDE: Replace ALL possible download functions
        const downloadFunctions = [
            'downloadTemplateFile',
            'downloadTemplate',
            'downloadEnhancedTemplate',
            'downloadPopulatedTemplate',
            'downloadResourceTemplate'
        ];

        downloadFunctions.forEach(funcName => {
            // Delete any existing function
            delete window[funcName];
            
            // Define with getter that always returns our function
            Object.defineProperty(window, funcName, {
                get: function() {
                    return async function(...args) {
                        console.log(`🔥 [ENFORCER] ${funcName} intercepted with args:`, args);
                        
                        // Extract parameters based on function
                        let templateName, subcomponentId, workspaceData = {}, score = 0;
                        
                        if (funcName === 'downloadTemplateFile') {
                            [templateName, subcomponentId] = args;
                        } else if (funcName === 'downloadTemplate') {
                            const [index] = args;
                            const urlParams = new URLSearchParams(window.location.search);
                            subcomponentId = urlParams.get('id') || '1-1';
                            const templates = window.subcomponentData?.outputs?.templates ||
                                            window.subcomponentData?.resources?.templates || [];
                            templateName = templates[index] || `Template ${index + 1}`;
                        } else if (funcName === 'downloadEnhancedTemplate') {
                            const [index, subId] = args;
                            const urlParams = new URLSearchParams(window.location.search);
                            subcomponentId = subId || urlParams.get('id') || '1-1';
                            const templates = window.subcomponentData?.resources?.templates || [];
                            templateName = templates[index] || `Template ${index + 1}`;
                        } else if (funcName === 'downloadPopulatedTemplate') {
                            [, templateName, , score] = args;
                            const urlParams = new URLSearchParams(window.location.search);
                            subcomponentId = urlParams.get('id') || '1-1';
                        } else if (funcName === 'downloadResourceTemplate') {
                            const [index] = args;
                            const urlParams = new URLSearchParams(window.location.search);
                            subcomponentId = urlParams.get('id') || '1-1';
                            const templates = window.subcomponentData?.resources?.templates || [];
                            templateName = templates[index] || `Template ${index + 1}`;
                        }
                        
                        return await forcePDFDownload(templateName, subcomponentId, workspaceData, score);
                    };
                },
                set: function(value) {
                    console.warn(`🚫 BLOCKED attempt to override ${funcName}`);
                    // Ignore the set attempt
                },
                configurable: false
            });
        });

        // Monitor for any script trying to create download links
        const originalCreateElement = document.createElement;
        document.createElement = function(tagName) {
            const element = originalCreateElement.call(document, tagName);
            
            if (tagName.toLowerCase() === 'a') {
                // Intercept download attribute
                const originalSetAttribute = element.setAttribute;
                element.setAttribute = function(name, value) {
                    if (name === 'download' && typeof value === 'string') {
                        // Check if it's trying to download HTML
                        if (value.endsWith('.html')) {
                            console.warn('🚫 BLOCKED HTML download attempt:', value);
                            // Change to PDF
                            value = value.replace('.html', '.pdf');
                        }
                    }
                    return originalSetAttribute.call(this, name, value);
                };
            }
            
            return element;
        };

        console.log('✅ AGGRESSIVE PDF ENFORCEMENT ACTIVE');
        console.log('🔥 All download functions intercepted');
        console.log('🚫 HTML blob creation blocked');
        console.log('🚫 HTML download links blocked');
    });

})();
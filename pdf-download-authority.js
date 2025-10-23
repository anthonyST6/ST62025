/**
 * PDF Download Authority - Single Source of Truth
 * 
 * This script establishes authoritative PDF download functions that cannot be overridden.
 * Uses Object.defineProperty with writable: false to prevent other scripts from replacing these functions.
 * 
 * MUST LOAD AFTER:
 * - client-pdf-generator.js (provides generateClientPDF)
 * - jsPDF library
 * 
 * LOAD ORDER IN HTML:
 * 1. jsPDF CDN
 * 2. client-pdf-generator.js
 * 3. pdf-download-authority.js (THIS FILE)
 * 4. All other scripts
 */

(function() {
    'use strict';
    
    console.log('🔒 PDF Download Authority - Establishing non-writable download functions...');

    // Wait for dependencies
    function waitForDependencies() {
        return new Promise((resolve) => {
            let attempts = 0;
            const maxAttempts = 100; // 10 seconds
            
            const checkInterval = setInterval(() => {
                attempts++;
                
                // Check if jsPDF and generateClientPDF are available
                if (window.jspdf && typeof window.generateClientPDF === 'function') {
                    clearInterval(checkInterval);
                    console.log('✅ Dependencies ready (jsPDF + generateClientPDF)');
                    resolve(true);
                } else if (attempts >= maxAttempts) {
                    clearInterval(checkInterval);
                    console.error('❌ Dependencies failed to load');
                    resolve(false);
                }
            }, 100);
        });
    }

    // Initialize after dependencies are ready
    waitForDependencies().then((ready) => {
        if (!ready) {
            console.error('⚠️ PDF Download Authority cannot initialize - dependencies missing');
            return;
        }

        // ============================================
        // AUTHORITATIVE DOWNLOAD FUNCTIONS
        // ============================================

        /**
         * Main PDF download function - used by all download buttons
         */
        async function authoritativeDownloadPDF(templateName, subcomponentId, workspaceData = {}, score = 0) {
            console.log('📥 Authoritative Download (DOCX):', templateName);
            
            try {
                // Show loading notification
                showPDFNotification('Generating DOCX...', false);
                
                // Call the DOCX download function from docx-download-client.js
                const endpoint = `/api/generate-template-docx/${subcomponentId}`;
                
                const requestData = {
                    templateName: templateName,
                    subcomponentId: subcomponentId,
                    workspaceData: workspaceData,
                    score: score,
                    timestamp: new Date().toISOString(),
                    company: 'ST6Co',
                    product: 'ScaleOps6'
                };
                
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
                    // Download the generated file
                    const downloadLink = document.createElement('a');
                    downloadLink.href = result.url;
                    downloadLink.download = result.filename || `${templateName.toLowerCase().replace(/\s+/g, '-')}-${subcomponentId}.docx`;
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                    
                    showPDFNotification(`✅ ${templateName} downloaded as DOCX!`, true);
                    return true;
                } else {
                    throw new Error(result.error || 'Failed to generate DOCX');
                }
                
            } catch (error) {
                console.error('❌ DOCX generation failed:', error);
                showPDFNotification('❌ DOCX generation failed', true);
                return false;
            }
        }

        /**
         * Helper: Get workspace data from form
         */
        function getWorkspaceData() {
            const data = {};
            const inputs = document.querySelectorAll(
                '#workspace-tab input, #workspace-tab textarea, ' +
                '#dynamic-worksheet-container input, #dynamic-worksheet-container textarea'
            );
            
            inputs.forEach(input => {
                if (input.id && input.value) {
                    data[input.id] = {
                        question: input.previousElementSibling?.textContent || input.placeholder || input.id,
                        answer: input.value
                    };
                }
            });
            
            return data;
        }

        /**
         * Helper: Get latest score from history
         */
        function getLatestScore(subcomponentId) {
            const historyKey = `score_history_${subcomponentId}`;
            const scoreHistory = JSON.parse(localStorage.getItem(historyKey) || '[]');
            return scoreHistory[0]?.score || 0;
        }

        /**
         * Helper: Show notification
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

        // ============================================
        // DEFINE NON-WRITABLE FUNCTIONS
        // ============================================

        /**
         * Resources Tab Download Function
         */
        Object.defineProperty(window, 'downloadTemplateFile', {
            value: async function(templateName, subId) {
                console.log('🔒 [AUTHORITY] downloadTemplateFile called');
                const workspaceData = getWorkspaceData();
                const score = getLatestScore(subId);
                return await authoritativeDownloadPDF(templateName, subId, workspaceData, score);
            },
            writable: false,
            configurable: false
        });

        /**
         * Output Tab Download Function
         */
        Object.defineProperty(window, 'downloadTemplate', {
            value: async function(index) {
                console.log('🔒 [AUTHORITY] downloadTemplate called');
                
                const urlParams = new URLSearchParams(window.location.search);
                const subcomponentId = urlParams.get('id') || '1-1';
                
                // Get template name from SSOT
                const templates = window.subcomponentData?.outputs?.templates ||
                                window.subcomponentData?.resources?.templates || [];
                const templateName = templates[index] || `Template ${index + 1}`;
                
                const workspaceData = getWorkspaceData();
                const score = getLatestScore(subcomponentId);
                
                return await authoritativeDownloadPDF(templateName, subcomponentId, workspaceData, score);
            },
            writable: false,
            configurable: false
        });

        /**
         * Enhanced Template Download Function
         */
        Object.defineProperty(window, 'downloadEnhancedTemplate', {
            value: async function(index, subcomponentId) {
                console.log('🔒 [AUTHORITY] downloadEnhancedTemplate called');
                
                const urlParams = new URLSearchParams(window.location.search);
                const currentSubId = subcomponentId || urlParams.get('id') || '1-1';
                
                // Get template name from SSOT
                const templates = window.subcomponentData?.resources?.templates || [];
                const templateName = templates[index] || `Template ${index + 1}`;
                
                const workspaceData = getWorkspaceData();
                const score = getLatestScore(currentSubId);
                
                return await authoritativeDownloadPDF(templateName, currentSubId, workspaceData, score);
            },
            writable: false,
            configurable: false
        });

        /**
         * Populated Template Download Function
         */
        Object.defineProperty(window, 'downloadPopulatedTemplate', {
            value: async function(index, templateName, answersJSON, score) {
                console.log('🔒 [AUTHORITY] downloadPopulatedTemplate called');
                
                const urlParams = new URLSearchParams(window.location.search);
                const subcomponentId = urlParams.get('id') || '1-1';
                
                let workspaceData = {};
                try {
                    workspaceData = JSON.parse(answersJSON.replace(/&quot;/g, '"'));
                } catch (e) {
                    console.warn('Could not parse workspace answers, using current form data');
                    workspaceData = getWorkspaceData();
                }
                
                return await authoritativeDownloadPDF(templateName, subcomponentId, workspaceData, score);
            },
            writable: false,
            configurable: false
        });

        /**
         * Resource Template Download Function
         */
        Object.defineProperty(window, 'downloadResourceTemplate', {
            value: async function(index) {
                console.log('🔒 [AUTHORITY] downloadResourceTemplate called');
                
                const urlParams = new URLSearchParams(window.location.search);
                const subcomponentId = urlParams.get('id') || '1-1';
                
                // Get template name from SSOT
                const templates = window.subcomponentData?.resources?.templates || [];
                const templateName = templates[index] || `Template ${index + 1}`;
                
                const workspaceData = getWorkspaceData();
                const score = getLatestScore(subcomponentId);
                
                return await authoritativeDownloadPDF(templateName, subcomponentId, workspaceData, score);
            },
            writable: false,
            configurable: false
        });

        // ============================================
        // VERIFY NON-WRITABLE STATUS
        // ============================================

        console.log('✅ PDF Download Authority established!');
        console.log('🔒 All download functions are now non-writable');
        
        // Test that functions cannot be overwritten
        const testOverride = () => {
            try {
                window.downloadTemplateFile = function() { console.log('OVERRIDE ATTEMPT'); };
                console.error('❌ SECURITY BREACH: Function was overwritten!');
                return false;
            } catch (e) {
                console.log('✅ Security verified: Functions cannot be overwritten');
                return true;
            }
        };
        
        testOverride();

        // Log available functions
        console.log('📥 Available PDF download functions:');
        console.log('   • downloadTemplateFile(templateName, subId)');
        console.log('   • downloadTemplate(index)');
        console.log('   • downloadEnhancedTemplate(index, subcomponentId)');
        console.log('   • downloadPopulatedTemplate(index, templateName, answersJSON, score)');
        console.log('   • downloadResourceTemplate(index)');
    });

})();
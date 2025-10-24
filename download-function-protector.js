/**
 * Download Function Protector
 * Locks critical download functions to prevent overrides
 * SAFE: Only adds protection, doesn't modify existing code
 */

(function() {
    'use strict';
    
    console.log('🔒 Download Function Protector Loading...');
    
    // Wait for docx-download-client.js to load and define functions
    function waitForFunctions() {
        return new Promise((resolve) => {
            const checkInterval = setInterval(() => {
                if (typeof window.downloadAnalysisReport === 'function' &&
                    typeof window.downloadTemplateFile === 'function' &&
                    typeof window.downloadDOCXTemplate === 'function') {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 100);
            
            // Timeout after 5 seconds
            setTimeout(() => {
                clearInterval(checkInterval);
                resolve();
            }, 5000);
        });
    }
    
    // Lock functions after they're defined
    waitForFunctions().then(() => {
        console.log('🔒 Locking download functions to prevent overrides...');
        
        // Store original functions
        const originalDownloadAnalysis = window.downloadAnalysisReport;
        const originalDownloadTemplate = window.downloadTemplateFile;
        const originalDownloadDOCXTemplate = window.downloadDOCXTemplate;
        
        // Lock downloadAnalysisReport
        if (originalDownloadAnalysis) {
            try {
                Object.defineProperty(window, 'downloadAnalysisReport', {
                    value: originalDownloadAnalysis,
                    writable: false,
                    configurable: false
                });
                console.log('✅ downloadAnalysisReport locked and protected');
            } catch (e) {
                console.warn('⚠️ Could not lock downloadAnalysisReport:', e.message);
            }
        }
        
        // Lock downloadTemplateFile
        if (originalDownloadTemplate) {
            try {
                Object.defineProperty(window, 'downloadTemplateFile', {
                    value: originalDownloadTemplate,
                    writable: false,
                    configurable: false
                });
                console.log('✅ downloadTemplateFile locked and protected');
            } catch (e) {
                console.warn('⚠️ Could not lock downloadTemplateFile:', e.message);
            }
        }
        
        // Lock downloadDOCXTemplate
        if (originalDownloadDOCXTemplate) {
            try {
                Object.defineProperty(window, 'downloadDOCXTemplate', {
                    value: originalDownloadDOCXTemplate,
                    writable: false,
                    configurable: false
                });
                console.log('✅ downloadDOCXTemplate locked and protected');
            } catch (e) {
                console.warn('⚠️ Could not lock downloadDOCXTemplate:', e.message);
            }
        }
        
        console.log('🔒 Download Function Protector Active - Functions cannot be overridden!');
    });
    
})();
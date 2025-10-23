/**
 * Download Diagnostic Tool
 * 
 * Logs every step of the download process to help debug
 * Shows what function is called, what file type is created, and what actually downloads
 */

(function() {
    'use strict';
    
    console.log('🔍 DOWNLOAD DIAGNOSTIC TOOL ACTIVE');
    console.log('📊 This will log every download attempt with full details');
    
    // Intercept Blob creation to see what's being downloaded
    const originalBlob = window.Blob;
    window.Blob = function(parts, options) {
        const blob = new originalBlob(parts, options);
        
        // Log blob creation
        console.log('🔍 [DIAGNOSTIC] Blob created:', {
            type: options?.type || 'unknown',
            size: blob.size,
            isHTML: options?.type?.includes('html'),
            isPDF: options?.type?.includes('pdf'),
            isDOCX: options?.type?.includes('wordprocessing'),
            content: parts[0]?.substring(0, 200) + '...'
        });
        
        return blob;
    };
    
    // Intercept createElement to see download links
    const originalCreateElement = document.createElement;
    document.createElement = function(tagName) {
        const element = originalCreateElement.call(document, tagName);
        
        if (tagName.toLowerCase() === 'a') {
            // Intercept when download attribute is set
            Object.defineProperty(element, 'download', {
                set: function(value) {
                    console.log('🔍 [DIAGNOSTIC] Download link created:', {
                        filename: value,
                        fileType: value.split('.').pop(),
                        isHTML: value.endsWith('.html'),
                        isPDF: value.endsWith('.pdf'),
                        isDOCX: value.endsWith('.docx')
                    });
                    this.setAttribute('download', value);
                },
                get: function() {
                    return this.getAttribute('download');
                }
            });
        }
        
        return element;
    };
    
    // Monitor all download function calls
    const monitorFunction = (funcName) => {
        const original = window[funcName];
        if (original) {
            window[funcName] = function(...args) {
                console.log(`🔍 [DIAGNOSTIC] ${funcName} called with:`, args);
                console.log(`🔍 [DIAGNOSTIC] Expected outcome: Should generate document file`);
                const result = original.apply(this, args);
                console.log(`🔍 [DIAGNOSTIC] ${funcName} completed`);
                return result;
            };
            console.log(`✅ Monitoring: ${funcName}`);
        }
    };
    
    // Wait for page load then monitor functions
    window.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            console.log('🔍 [DIAGNOSTIC] Monitoring download functions...');
            
            const functionsToMonitor = [
                'downloadTemplateFile',
                'downloadPopulatedTemplate',
                'downloadEnhancedTemplate',
                'downloadTemplate',
                'downloadResourceTemplate',
                'downloadTemplatePDF',
                'downloadTemplateDOCX',
                'generateClientPDF'
            ];
            
            functionsToMonitor.forEach(monitorFunction);
            
            console.log('🔍 [DIAGNOSTIC] Setup complete. Click any download button to see detailed logs.');
        }, 2000);
    });
    
    console.log('✅ Download Diagnostic Tool Ready');
    
})();
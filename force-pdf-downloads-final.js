/**
 * FINAL PDF Download Override - Loads Last
 * 
 * This script MUST load after all other scripts to ensure PDF downloads work
 * Forcefully overrides all download functions to use PDF generation
 */

(function() {
    'use strict';
    
    console.log('🔧 FINAL PDF Download Override - Forcing PDF generation...');

    // Wait for jsPDF to be ready
    function ensureJsPDFReady() {
        return new Promise((resolve) => {
            if (window.jspdf && window.jspdf.jsPDF) {
                console.log('✅ jsPDF confirmed ready');
                resolve(true);
                return;
            }
            
            let attempts = 0;
            const checkInterval = setInterval(() => {
                attempts++;
                if (window.jspdf && window.jspdf.jsPDF) {
                    clearInterval(checkInterval);
                    console.log('✅ jsPDF ready after', attempts, 'attempts');
                    resolve(true);
                } else if (attempts > 50) {
                    clearInterval(checkInterval);
                    console.error('❌ jsPDF failed to load after 5 seconds');
                    resolve(false);
                }
            }, 100);
        });
    }

    // Initialize after page loads
    window.addEventListener('DOMContentLoaded', async () => {
        // Wait for jsPDF
        const jsPDFReady = await ensureJsPDFReady();
        
        if (!jsPDFReady) {
            console.error('⚠️ jsPDF not available - PDF downloads will not work');
            return;
        }

        // FORCE OVERRIDE: downloadTemplateFile (Resources tab)
        window.downloadTemplateFile = async function(templateName, subId) {
            console.log('🔥 FORCED PDF DOWNLOAD (Resources):', templateName);
            
            try {
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
                const historyKey = `score_history_${subId}`;
                const scoreHistory = JSON.parse(localStorage.getItem(historyKey) || '[]');
                const latestScore = scoreHistory[0]?.score || 0;

                // Call PDF generator
                if (typeof window.generateClientPDF === 'function') {
                    await window.generateClientPDF(templateName, subId, workspaceData, latestScore);
                    console.log('✅ PDF generated successfully');
                } else {
                    throw new Error('generateClientPDF not available');
                }
            } catch (error) {
                console.error('❌ PDF generation failed:', error);
                alert('PDF generation failed. Please check console for details.');
            }
        };

        // FORCE OVERRIDE: downloadPopulatedTemplate (Output tab)
        window.downloadPopulatedTemplate = async function(index, templateName, answersJSON, score) {
            console.log('🔥 FORCED PDF DOWNLOAD (Output):', templateName);
            
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const subcomponentId = urlParams.get('id') || '1-1';
                
                let workspaceAnswers = {};
                try {
                    workspaceAnswers = JSON.parse(answersJSON.replace(/&quot;/g, '"'));
                } catch (e) {
                    console.error('Error parsing workspace answers:', e);
                }

                // Call PDF generator
                if (typeof window.generateClientPDF === 'function') {
                    await window.generateClientPDF(templateName, subcomponentId, workspaceAnswers, score);
                    console.log('✅ PDF generated successfully');
                } else {
                    throw new Error('generateClientPDF not available');
                }
            } catch (error) {
                console.error('❌ PDF generation failed:', error);
                alert('PDF generation failed. Please check console for details.');
            }
        };

        // FORCE OVERRIDE: downloadEnhancedTemplate (if exists)
        window.downloadEnhancedTemplate = async function(index, subcomponentId) {
            console.log('🔥 FORCED PDF DOWNLOAD (Enhanced):', index);
            
            try {
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

                // Get template name
                const templates = window.subcomponentData?.resources?.templates || [];
                const templateName = templates[index] || 'Template';

                // Call PDF generator
                if (typeof window.generateClientPDF === 'function') {
                    await window.generateClientPDF(templateName, currentSubId, workspaceData, latestScore);
                    console.log('✅ PDF generated successfully');
                } else {
                    throw new Error('generateClientPDF not available');
                }
            } catch (error) {
                console.error('❌ PDF generation failed:', error);
                alert('PDF generation failed. Please check console for details.');
            }
        };

        console.log('✅ FINAL PDF Download Override Complete!');
        console.log('📥 All download functions now use PDF generation');
    });

})();
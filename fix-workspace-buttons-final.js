/**
 * Fix Workspace Buttons - Final Version
 * 
 * 1. Save Progress - Saves workspace answers to localStorage for review
 * 2. Export to Word - Downloads actual .docx file (not HTML)
 * 3. Analyze Results - Keeps existing functionality
 */

(function() {
    'use strict';
    
    console.log('🔧 [WORKSPACE BUTTONS FIX] Loading final version...');
    
    // ============================================
    // FIX 1: Save Progress - Save Workspace Answers
    // ============================================
    
    window.saveWorksheet = async function() {
        console.log('💾 [SAVE PROGRESS] Saving workspace answers...');
        
        try {
            // Get subcomponent ID
            const urlParams = new URLSearchParams(window.location.search);
            const subcomponentId = urlParams.get('id') || '1-1';
            
            // Get session and user info
            const sessionId = localStorage.getItem('sessionId') || 'default-session';
            const userId = localStorage.getItem('userId') || 'ST6C0';
            
            // Collect all workspace data with questions and answers
            const workspaceData = {};
            const inputs = document.querySelectorAll('#workspace-tab input, #workspace-tab textarea, #dynamic-worksheet-container input, #dynamic-worksheet-container textarea');
            
            let answerCount = 0;
            inputs.forEach(input => {
                if (input.id && input.value.trim()) {
                    // Get the question text from the label
                    const label = input.previousElementSibling;
                    const questionText = label?.textContent || input.placeholder || input.id;
                    
                    workspaceData[input.id] = {
                        question: questionText,
                        answer: input.value.trim()
                    };
                    answerCount++;
                }
            });
            
            // Save to localStorage with timestamp
            const storageKey = `workspace_${subcomponentId}`;
            const savedData = {
                subcomponentId: subcomponentId,
                data: workspaceData,
                answerCount: answerCount,
                timestamp: new Date().toISOString(),
                lastModified: new Date().toLocaleString()
            };
            
            localStorage.setItem(storageKey, JSON.stringify(savedData));
            console.log(`✅ [SAVE PROGRESS] Saved ${answerCount} answers to localStorage`);
            
            // Display saved progress summary on the page
            displaySavedProgressSummary(savedData);
            
            // ALSO save to server database for persistence across devices
            try {
                const response = await fetch('/api/save-workspace-answers', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        subcomponentId: subcomponentId,
                        answers: workspaceData,
                        sessionId: sessionId,
                        userId: userId
                    })
                });
                
                if (response.ok) {
                    const result = await response.json();
                    console.log('✅ [SAVE PROGRESS] Saved to server database:', result);
                    console.log(`✅ Progress saved! ${answerCount} answer${answerCount !== 1 ? 's' : ''} saved to cloud.`);
                } else {
                    throw new Error(`Server returned ${response.status}`);
                }
            } catch (serverError) {
                console.warn('⚠️ [SAVE PROGRESS] Server save failed, using localStorage only:', serverError);
                console.log(`✅ Progress saved locally! ${answerCount} answer${answerCount !== 1 ? 's' : ''} saved.`);
            }
            
            return true;
        } catch (error) {
            console.error('❌ [SAVE PROGRESS] Error:', error);
            console.error('❌ Error saving progress');
            return false;
        }
    };
    
    // ============================================
    // FIX 2: Export to Word - Download .docx File
    // ============================================
    
    window.exportWorksheet = async function() {
        console.log('📄 [EXPORT TO WORD] Starting export...');
        
        try {
            // Get subcomponent ID
            const urlParams = new URLSearchParams(window.location.search);
            const subcomponentId = urlParams.get('id') || '1-1';
            
            // Collect workspace data
            const workspaceData = {};
            const inputs = document.querySelectorAll('#workspace-tab input, #workspace-tab textarea, #dynamic-worksheet-container input, #dynamic-worksheet-container textarea');
            
            inputs.forEach(input => {
                if (input.id && input.value.trim()) {
                    const label = input.previousElementSibling;
                    const questionText = label?.textContent || input.placeholder || input.id;
                    
                    workspaceData[input.id] = {
                        question: questionText,
                        answer: input.value.trim()
                    };
                }
            });
            
            // Get subcomponent title
            const title = document.getElementById('subcomponent-title')?.textContent || 'Worksheet';
            
            // Get latest score if available
            const historyKey = `score_history_${subcomponentId}`;
            const scoreHistory = JSON.parse(localStorage.getItem(historyKey) || '[]');
            const latestScore = scoreHistory[0]?.score || 0;
            
            console.log(`📄 [EXPORT TO WORD] Exporting "${title}" for ${subcomponentId}`);
            console.log(`📄 [EXPORT TO WORD] Workspace data:`, workspaceData);
            
            // Removed progress notification - silent generation
            
            // Call server to generate DOCX
            const response = await fetch(`/api/generate-template-docx/${subcomponentId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    templateName: `${title} - Worksheet`,
                    subcomponentId: subcomponentId,
                    workspaceData: workspaceData,
                    score: latestScore,
                    timestamp: new Date().toISOString(),
                    company: 'ST6Co',
                    product: 'ScaleOps6'
                })
            });
            
            if (!response.ok) {
                throw new Error(`Server returned ${response.status}`);
            }
            
            const result = await response.json();
            
            if (result.success && result.url) {
                // Download the generated DOCX file
                const downloadLink = document.createElement('a');
                downloadLink.href = result.url;
                downloadLink.download = result.filename || `${title.replace(/\s+/g, '_')}_Worksheet.docx`;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
                
                console.log('✅ [EXPORT TO WORD] Download successful:', result.filename);
                // Removed success notification - silent download
                return true;
            } else {
                throw new Error(result.error || 'Failed to generate Word document');
            }
            
        } catch (error) {
            console.error('❌ [EXPORT TO WORD] Error:', error);
            // Removed error notification - silent failure (logged to console)
            return false;
        }
    };
    
    // ============================================
    // UTILITY: Load Saved Progress on Page Load
    // ============================================
    
    function loadSavedProgress() {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const subcomponentId = urlParams.get('id') || '1-1';
            const storageKey = `workspace_${subcomponentId}`;
            
            const savedDataStr = localStorage.getItem(storageKey);
            if (!savedDataStr) {
                console.log('ℹ️ [LOAD PROGRESS] No saved progress found');
                return;
            }
            
            const savedData = JSON.parse(savedDataStr);
            console.log('📦 [LOAD PROGRESS] Found saved progress:', savedData);
            
            // Wait for workspace to be loaded
            const loadInterval = setInterval(() => {
                const inputs = document.querySelectorAll('#workspace-tab input, #workspace-tab textarea, #dynamic-worksheet-container input, #dynamic-worksheet-container textarea');
                
                if (inputs.length > 0) {
                    clearInterval(loadInterval);
                    
                    // Restore saved answers
                    let restoredCount = 0;
                    inputs.forEach(input => {
                        if (input.id && savedData.data[input.id]) {
                            input.value = savedData.data[input.id].answer || savedData.data[input.id];
                            restoredCount++;
                        }
                    });
                    
                    if (restoredCount > 0) {
                        console.log(`✅ [LOAD PROGRESS] Restored ${restoredCount} answers`);
                        console.log(`📝 Restored ${restoredCount} saved answer${restoredCount !== 1 ? 's' : ''} from ${savedData.lastModified}`);
                    }
                }
            }, 500);
            
            // Timeout after 10 seconds
            setTimeout(() => clearInterval(loadInterval), 10000);
            
        } catch (error) {
            console.error('❌ [LOAD PROGRESS] Error:', error);
        }
    }
    
    // ============================================
    // UTILITY: Display Saved Progress Summary
    // ============================================
    
    function displaySavedProgressSummary(savedData) {
        // Remove any existing summary
        const existingSummary = document.getElementById('saved-progress-summary');
        if (existingSummary) {
            existingSummary.remove();
        }
        
        // Create summary container
        const summary = document.createElement('div');
        summary.id = 'saved-progress-summary';
        summary.style.cssText = `
            margin-top: 20px;
            padding: 20px;
            background: rgba(76, 175, 80, 0.1);
            border: 2px solid #4CAF50;
            border-radius: 10px;
            animation: fadeIn 0.5s ease-in;
        `;
        
        // Create header
        const header = document.createElement('div');
        header.style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 15px;
            color: #4CAF50;
            font-weight: 700;
            font-size: 18px;
        `;
        header.innerHTML = `<span>✅</span> Saved Progress`;
        summary.appendChild(header);
        
        // Create info section
        const info = document.createElement('div');
        info.style.cssText = `
            color: #ccc;
            font-size: 14px;
            line-height: 1.6;
        `;
        info.innerHTML = `
            <div style="margin-bottom: 8px;">
                <strong style="color: #fff;">Answers Saved:</strong> ${savedData.answerCount}
            </div>
            <div style="margin-bottom: 8px;">
                <strong style="color: #fff;">Last Saved:</strong> ${savedData.lastModified}
            </div>
            <div style="margin-bottom: 15px;">
                <strong style="color: #fff;">Subcomponent:</strong> ${savedData.subcomponentId}
            </div>
        `;
        summary.appendChild(info);
        
        // Create answers preview section
        if (savedData.data && Object.keys(savedData.data).length > 0) {
            const previewHeader = document.createElement('div');
            previewHeader.style.cssText = `
                color: #fff;
                font-weight: 600;
                margin-bottom: 10px;
                font-size: 15px;
            `;
            previewHeader.textContent = 'Saved Answers:';
            summary.appendChild(previewHeader);
            
            const answersList = document.createElement('div');
            answersList.style.cssText = `
                max-height: 300px;
                overflow-y: auto;
                padding: 10px;
                background: rgba(0, 0, 0, 0.3);
                border-radius: 8px;
            `;
            
            // Display each saved answer
            Object.entries(savedData.data).forEach(([id, data], index) => {
                const answerItem = document.createElement('div');
                answerItem.style.cssText = `
                    padding: 10px;
                    margin-bottom: 10px;
                    background: rgba(255, 255, 255, 0.05);
                    border-left: 3px solid #4CAF50;
                    border-radius: 5px;
                `;
                
                const question = document.createElement('div');
                question.style.cssText = `
                    color: #4CAF50;
                    font-weight: 600;
                    margin-bottom: 5px;
                    font-size: 13px;
                `;
                question.textContent = `Q${index + 1}: ${data.question}`;
                answerItem.appendChild(question);
                
                const answer = document.createElement('div');
                answer.style.cssText = `
                    color: #ccc;
                    font-size: 13px;
                    line-height: 1.5;
                `;
                // Truncate long answers
                const answerText = data.answer.length > 150
                    ? data.answer.substring(0, 150) + '...'
                    : data.answer;
                answer.textContent = answerText;
                answerItem.appendChild(answer);
                
                answersList.appendChild(answerItem);
            });
            
            summary.appendChild(answersList);
        }
        
        // Find the action buttons container and insert summary after it
        const actionButtons = document.querySelector('.action-buttons');
        if (actionButtons && actionButtons.parentNode) {
            actionButtons.parentNode.insertBefore(summary, actionButtons.nextSibling);
        }
    }
    
    // ============================================
    // UTILITY: Show Notification
    // ============================================
    
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'linear-gradient(135deg, #4CAF50, #66BB6A)' : 
                         type === 'error' ? 'linear-gradient(135deg, #F44336, #E57373)' : 
                         'linear-gradient(135deg, #2196F3, #64B5F6)'};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            font-weight: 600;
            font-size: 14px;
            animation: slideIn 0.3s ease-out;
            max-width: 400px;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Add animation styles
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(400px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(400px); opacity: 0; }
            }
        `;
        style.textContent += `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ============================================
    // FIX 3: Analysis Tab - Download Report & Remove Share
    // ============================================
    
    function fixAnalysisButtons() {
        // Wait for analysis content to be rendered
        setTimeout(() => {
            const analysisContent = document.getElementById('analysis-content');
            if (!analysisContent) return;
            
            // Find all buttons in analysis tab
            const buttons = analysisContent.querySelectorAll('button');
            
            buttons.forEach(button => {
                const buttonText = button.textContent;
                
                // Remove "Share Results" button
                if (buttonText.includes('Share Results') || buttonText.includes('🔗')) {
                    console.log('✅ [ANALYSIS] Removing Share Results button');
                    button.remove();
                    return;
                }
                
                // Fix "Download Report" button to use DOCX download
                if (buttonText.includes('Download Report') || buttonText.includes('📄')) {
                    console.log('✅ [ANALYSIS] Fixing Download Report button');
                    
                    // Remove existing click handlers
                    const newButton = button.cloneNode(true);
                    button.parentNode.replaceChild(newButton, button);
                    
                    // Add new click handler for DOCX download
                    newButton.addEventListener('click', async function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        try {
                            const urlParams = new URLSearchParams(window.location.search);
                            const subcomponentId = urlParams.get('id') || '1-1';
                            
                            // Get the analysis data from the page or localStorage
                            const historyKey = `score_history_${subcomponentId}`;
                            const scoreHistory = JSON.parse(localStorage.getItem(historyKey) || '[]');
                            const latestAnalysis = scoreHistory[0] || {};
                            
                            // Get workspace data
                            const workspaceKey = `workspace_${subcomponentId}`;
                            const workspaceData = JSON.parse(localStorage.getItem(workspaceKey) || '{}').data || {};
                            
                            // Removed progress notification - silent generation
                            
                            // Call server to generate DOCX
                            const response = await fetch(`/api/generate-template-docx/${subcomponentId}`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    templateName: 'Analysis Report',
                                    subcomponentId: subcomponentId,
                                    workspaceData: workspaceData,
                                    score: latestAnalysis.score || 0,
                                    timestamp: new Date().toISOString(),
                                    company: 'ST6Co',
                                    product: 'ScaleOps6'
                                })
                            });
                            
                            if (!response.ok) {
                                throw new Error(`Server returned ${response.status}`);
                            }
                            
                            const result = await response.json();
                            
                            if (result.success && result.url) {
                                // Download the generated DOCX file
                                const downloadLink = document.createElement('a');
                                downloadLink.href = result.url;
                                downloadLink.download = result.filename || `Analysis_Report_${subcomponentId}.docx`;
                                document.body.appendChild(downloadLink);
                                downloadLink.click();
                                document.body.removeChild(downloadLink);
                                
                                // Removed success notification - silent download
                            } else {
                                throw new Error(result.error || 'Failed to generate report');
                            }
                        } catch (error) {
                            console.error('❌ [ANALYSIS] Download error:', error);
                            // Removed error notification - silent failure (logged to console)
                        }
                    });
                }
            });
        }, 500);
    }
    
    // ============================================
    // INITIALIZE: Update Button Text and Load Progress
    // ============================================
    
    function initializeWorkspaceButtons() {
        // Wait for page to load
        setTimeout(() => {
            // Update "Export as PDF" button text to "Export to Word"
            const buttons = document.querySelectorAll('.btn-secondary');
            buttons.forEach(button => {
                if (button.textContent.includes('Export as PDF')) {
                    button.textContent = '📄 Export to Word';
                    console.log('✅ [INIT] Updated button text to "Export to Word"');
                }
            });
            
            // Load saved progress
            loadSavedProgress();
            
            // Fix analysis buttons
            fixAnalysisButtons();
        }, 1000);
    }
    
    // Monitor for analysis tab changes
    const originalSwitchTab = window.switchTab;
    if (originalSwitchTab) {
        window.switchTab = function(tabName, event) {
            originalSwitchTab(tabName, event);
            if (tabName === 'analysis') {
                setTimeout(() => fixAnalysisButtons(), 500);
            }
        };
    }
    
    // Also monitor for analysis display updates
    const originalDisplayEnhancedAnalysisResults = window.displayEnhancedAnalysisResults;
    if (originalDisplayEnhancedAnalysisResults) {
        window.displayEnhancedAnalysisResults = function(...args) {
            const result = originalDisplayEnhancedAnalysisResults.apply(this, args);
            setTimeout(() => fixAnalysisButtons(), 500);
            return result;
        };
    }
    
    // Initialize on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeWorkspaceButtons);
    } else {
        initializeWorkspaceButtons();
    }
    
    console.log('✅ [WORKSPACE BUTTONS FIX] Loaded successfully');
    console.log('   - Save Progress: Saves workspace answers to localStorage and server');
    console.log('   - Export to Word: Downloads .docx file via server');
    console.log('   - Auto-load: Restores saved progress on page load');
    console.log('   - Analysis: Download Report uses .docx, Share Results removed');
    
})();
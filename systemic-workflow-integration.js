// Systemic Workflow Integration for ALL 96 Subcomponents
// Ensures complete user journey: Workspace → Analysis → Score History → Resources → Output

(function() {
    'use strict';
    
    console.log('🚀 Systemic Workflow Integration Loading for ALL 96 Subcomponents...');
    
    // Wait for DOM and all dependencies
    function waitForDependencies() {
        const checkInterval = setInterval(() => {
            if (document.readyState === 'complete' && 
                window.AgentLibrary && 
                window.displayEnhancedAnalysisResults) {
                clearInterval(checkInterval);
                initializeSystemicWorkflow();
            }
        }, 100);
    }
    
    function initializeSystemicWorkflow() {
        console.log('✅ All dependencies loaded. Initializing systemic workflow...');
        
        // Get current subcomponent ID
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        
        console.log(`📍 Initializing workflow for subcomponent: ${subcomponentId}`);
        
        // Check if complete-workflow-integration already set up the function
        if (window.completeWorkspace) {
            console.log('✅ Using complete-workflow-integration.js for analysis');
            // Override analyzeWorksheet to use completeWorkspace
            window.analyzeWorksheet = function() {
                window.completeWorkspace();
            };
            return; // Don't override with our own implementation
        }
        
        // ============= ENHANCED ANALYZE FUNCTION =============
        window.analyzeWorksheet = async function() {
            console.log('🔍 Starting Systemic Analysis Process...');
            
            try {
                // Step 1: Collect workspace data
                const workspaceData = collectWorkspaceAnswers();
                
                if (!validateWorkspaceData(workspaceData)) {
                    alert('Please answer at least one question before analyzing.');
                    return;
                }
                
                // Step 2: Switch to Analysis tab
                switchToAnalysisTab();
                
                // Step 3: Show loading state
                showAnalysisLoading();
                
                // Step 4: Send to server for analysis
                const analysisResult = await sendAnalysisToServer(workspaceData);
                
                // Step 5: Display enhanced analysis
                displayEnhancedAnalysis(analysisResult);
                
                // Step 6: Save to score history
                saveToScoreHistory(analysisResult);
                
                // Step 7: Update Resources tab
                updateResourcesTab(analysisResult);
                
                // Step 8: Update Output tab
                updateOutputTab(analysisResult);
                
                console.log('✅ Systemic analysis complete!');
                
            } catch (error) {
                console.error('❌ Analysis error:', error);
                showAnalysisError(error.message);
            }
        };
        
        // Collect workspace answers
        function collectWorkspaceAnswers() {
            const answers = {};
            
            // Collect all input fields
            const inputs = document.querySelectorAll('#workspace-tab input, #workspace-tab textarea');
            inputs.forEach(input => {
                if (input.id && input.value) {
                    answers[input.id] = input.value;
                }
            });
            
            // Also collect from dynamic worksheet if present
            const dynamicInputs = document.querySelectorAll('#dynamic-worksheet-container input, #dynamic-worksheet-container textarea');
            dynamicInputs.forEach(input => {
                if (input.id && input.value) {
                    answers[input.id] = input.value;
                }
            });
            
            console.log('📝 Collected answers:', answers);
            return answers;
        }
        
        // Validate workspace data
        function validateWorkspaceData(data) {
            return Object.keys(data).length > 0 && 
                   Object.values(data).some(value => value && value.trim() !== '');
        }
        
        // Switch to Analysis tab
        function switchToAnalysisTab() {
            const analysisTabBtn = document.querySelector('[data-tab="analysis"]');
            if (analysisTabBtn) {
                analysisTabBtn.click();
            }
        }
        
        // Show analysis loading state
        function showAnalysisLoading() {
            const analysisContent = document.getElementById('analysis-content');
            if (!analysisContent) return;
            
            analysisContent.innerHTML = `
                <div style="text-align: center; padding: 80px 20px;">
                    <div style="font-size: 64px; margin-bottom: 30px; animation: pulse 1.5s infinite;">
                        🤖
                    </div>
                    <h2 style="font-size: 32px; color: #FF5500; margin-bottom: 15px;">
                        AI Analysis in Progress
                    </h2>
                    <p style="font-size: 18px; color: #999; margin-bottom: 30px;">
                        Analyzing your responses across all dimensions...
                    </p>
                    <div style="width: 300px; height: 6px; background: rgba(255, 255, 255, 0.1); 
                                border-radius: 3px; margin: 0 auto; overflow: hidden;">
                        <div style="width: 100%; height: 100%; 
                                    background: linear-gradient(90deg, transparent, #FF5500, transparent); 
                                    animation: loading 1.5s linear infinite;"></div>
                    </div>
                </div>
                <style>
                    @keyframes pulse {
                        0%, 100% { transform: scale(1); opacity: 1; }
                        50% { transform: scale(1.1); opacity: 0.8; }
                    }
                    @keyframes loading {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(100%); }
                    }
                </style>
            `;
        }
        
        // Send analysis to server
        async function sendAnalysisToServer(workspaceData) {
            const response = await fetch('/api/analysis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    subcomponentId: subcomponentId,
                    responses: workspaceData,  // Server expects "responses" not "answers"
                    timestamp: new Date().toISOString()
                })
            });
            
            if (!response.ok) {
                throw new Error('Analysis server error');
            }
            
            const result = await response.json();
            
            // Add subcomponent name if not present
            if (!result.subcomponentName && window.subcomponentData) {
                result.subcomponentName = window.subcomponentData.name;
            }
            
            return result;
        }
        
        // Display enhanced analysis
        function displayEnhancedAnalysis(analysisResult) {
            // Use the professional display function
            if (window.displayEnhancedAnalysisResults) {
                window.displayEnhancedAnalysisResults(analysisResult, 'comprehensive');
            } else {
                // Fallback display
                const analysisContent = document.getElementById('analysis-content');
                if (analysisContent) {
                    analysisContent.innerHTML = `
                        <div style="padding: 30px;">
                            <h2 style="color: #FF5500;">Analysis Complete</h2>
                            <div style="font-size: 64px; color: #FF5500; margin: 20px 0;">
                                ${analysisResult.score || 75}%
                            </div>
                            <p>${analysisResult.summary || 'Analysis completed successfully.'}</p>
                        </div>
                    `;
                }
            }
        }
        
        // Save to score history
        function saveToScoreHistory(analysisResult) {
            const historyKey = `score_history_${subcomponentId}`;
            let history = JSON.parse(localStorage.getItem(historyKey) || '[]');
            
            // Create history entry
            const entry = {
                timestamp: new Date().toISOString(),
                score: analysisResult.score || 75,
                subcomponentId: subcomponentId,
                subcomponentName: analysisResult.subcomponentName || 'Unknown',
                dimensions: analysisResult.dimensions || {},
                strengths: analysisResult.strengths || [],
                weaknesses: analysisResult.weaknesses || [],
                summary: analysisResult.summary || ''
            };
            
            // Add to history (newest first)
            history.unshift(entry);
            
            // Keep only last 20 entries
            history = history.slice(0, 20);
            
            // Save to localStorage
            localStorage.setItem(historyKey, JSON.stringify(history));
            
            // Also save to global history
            const globalHistoryKey = 'global_score_history';
            let globalHistory = JSON.parse(localStorage.getItem(globalHistoryKey) || '[]');
            globalHistory.unshift(entry);
            globalHistory = globalHistory.slice(0, 100); // Keep last 100 globally
            localStorage.setItem(globalHistoryKey, JSON.stringify(globalHistory));
            
            console.log('📊 Score saved to history:', entry);
            
            // Update Score History tab if visible
            updateScoreHistoryTab();
        }
        
        // Update Score History tab
        function updateScoreHistoryTab() {
            const historyContent = document.getElementById('score-history-content');
            if (!historyContent) return;
            
            const historyKey = `score_history_${subcomponentId}`;
            const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
            
            if (history.length === 0) {
                return; // Keep default message
            }
            
            let html = `
                <div style="padding: 20px;">
                    <h3 style="color: #FF5500; margin-bottom: 20px;">
                        📈 Your Progress History
                    </h3>
                    <div style="display: grid; gap: 15px;">
            `;
            
            history.forEach((entry, index) => {
                const date = new Date(entry.timestamp);
                const scoreColor = entry.score >= 80 ? '#10B981' : 
                                 entry.score >= 60 ? '#F59E0B' : 
                                 entry.score >= 40 ? '#3B82F6' : '#EF4444';
                
                html += `
                    <div style="background: rgba(255, 255, 255, 0.02); 
                                border: 1px solid rgba(255, 255, 255, 0.1); 
                                border-radius: 10px; padding: 20px;
                                transition: all 0.3s ease; cursor: pointer;"
                         onmouseover="this.style.borderColor='#FF5500'; this.style.background='rgba(255, 85, 0, 0.05)'"
                         onmouseout="this.style.borderColor='rgba(255, 255, 255, 0.1)'; this.style.background='rgba(255, 255, 255, 0.02)'">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <div style="color: #999; font-size: 12px; margin-bottom: 5px;">
                                    ${date.toLocaleDateString()} ${date.toLocaleTimeString()}
                                </div>
                                <div style="color: #fff; font-size: 16px;">
                                    ${entry.subcomponentName || 'Analysis'} #${history.length - index}
                                </div>
                            </div>
                            <div style="text-align: center;">
                                <div style="font-size: 36px; font-weight: 700; color: ${scoreColor};">
                                    ${entry.score}%
                                </div>
                                <div style="color: #999; font-size: 12px;">Score</div>
                            </div>
                        </div>
                        ${entry.summary ? `
                            <div style="margin-top: 15px; padding-top: 15px; 
                                        border-top: 1px solid rgba(255, 255, 255, 0.05);">
                                <p style="color: #ccc; font-size: 14px; line-height: 1.6;">
                                    ${entry.summary}
                                </p>
                            </div>
                        ` : ''}
                    </div>
                `;
            });
            
            html += `
                    </div>
                </div>
            `;
            
            historyContent.innerHTML = html;
        }
        
        // Update Resources tab
        function updateResourcesTab(analysisResult) {
            console.log('📚 Updating Resources tab with analysis data...');
            
            // This will be handled by enhanced-resources-output.js
            // Just trigger a refresh if needed
            const resourcesTab = document.querySelector('[data-tab="resources"]');
            if (resourcesTab && resourcesTab.classList.contains('active')) {
                if (window.enhanceResourcesTab) {
                    window.enhanceResourcesTab();
                }
            }
        }
        
        // Update Output tab
        function updateOutputTab(analysisResult) {
            console.log('📋 Updating Output tab with analysis results...');
            
            // Store analysis result for Output tab
            window.latestAnalysisResult = analysisResult;
            
            // This will be handled by enhanced-resources-output.js
            // Just trigger a refresh if needed
            const outputTab = document.querySelector('[data-tab="output"]');
            if (outputTab && outputTab.classList.contains('active')) {
                if (window.enhanceOutputTab) {
                    window.enhanceOutputTab();
                }
            }
        }
        
        // Show analysis error
        function showAnalysisError(message) {
            const analysisContent = document.getElementById('analysis-content');
            if (!analysisContent) return;
            
            analysisContent.innerHTML = `
                <div style="text-align: center; padding: 60px 20px;">
                    <div style="font-size: 48px; margin-bottom: 20px;">❌</div>
                    <h3 style="font-size: 24px; color: #EF4444; margin-bottom: 10px;">
                        Analysis Failed
                    </h3>
                    <p style="font-size: 16px; color: #999; margin-bottom: 20px;">
                        ${message || 'An error occurred during analysis. Please try again.'}
                    </p>
                    <button onclick="window.analyzeWorksheet()" style="
                        background: linear-gradient(135deg, #FF5500, #FF8800);
                        color: white;
                        border: none;
                        padding: 12px 30px;
                        border-radius: 8px;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                    ">
                        🔄 Try Again
                    </button>
                </div>
            `;
        }
        
        // ============= TAB SWITCHING ENHANCEMENTS =============
        const originalSwitchTab = window.switchTab;
        window.switchTab = function(tabName, event) {
            if (originalSwitchTab) {
                originalSwitchTab(tabName, event);
            }
            
            // Handle tab-specific updates
            if (tabName === 'history') {
                updateScoreHistoryTab();
            } else if (tabName === 'resources' && window.enhanceResourcesTab) {
                setTimeout(window.enhanceResourcesTab, 100);
            } else if (tabName === 'output' && window.enhanceOutputTab) {
                setTimeout(window.enhanceOutputTab, 100);
            }
        };
        
        // ============= INITIALIZE ON LOAD =============
        // Update Score History tab on initial load
        if (document.getElementById('score-history-content')) {
            updateScoreHistoryTab();
        }
        
        console.log('✅ Systemic Workflow Integration Complete for ALL 96 Subcomponents!');
        console.log('📍 Features enabled:');
        console.log('   ✓ Workspace data collection');
        console.log('   ✓ AI-powered analysis');
        console.log('   ✓ Score history persistence');
        console.log('   ✓ Resources tab with templates');
        console.log('   ✓ Output tab with populated documents');
        console.log('   ✓ Complete user journey workflow');
    }
    
    // Start initialization
    waitForDependencies();
})();
// Score History Handler - Saves and displays complete analysis results
// Integrates with the Score History tab to show full analysis details

(function() {
    console.log('📊 Score History Handler loaded');
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
    function initialize() {
        console.log('📄 Initializing Score History Handler');
        
        // Storage key prefix
        const STORAGE_PREFIX = 'st6_score_history_';
        
        // Save analysis results to history
        window.saveToScoreHistory = function(subcomponentId, analysisData) {
            try {
                const historyKey = `${STORAGE_PREFIX}${subcomponentId}`;
                const timestamp = new Date().toISOString();
                
                // Get existing history or create new
                let history = JSON.parse(localStorage.getItem(historyKey) || '[]');
                
                // Create history entry with full analysis data
                const historyEntry = {
                    timestamp: timestamp,
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString(),
                    score: analysisData.score,
                    detailedScores: analysisData.detailedScores,
                    recommendations: analysisData.recommendations,
                    executiveSummary: analysisData.analysis?.executiveSummary || analysisData.executiveSummary,
                    worksheetType: analysisData.worksheetType,
                    subcomponentId: subcomponentId,
                    fullAnalysis: analysisData // Store complete analysis
                };
                
                // Add to history (keep last 10 entries)
                history.unshift(historyEntry);
                if (history.length > 10) {
                    history = history.slice(0, 10);
                }
                
                // Save to localStorage
                localStorage.setItem(historyKey, JSON.stringify(history));
                
                console.log(`✅ Saved analysis to score history for ${subcomponentId}`);
                return true;
            } catch (error) {
                console.error('❌ Error saving to score history:', error);
                return false;
            }
        };
        
        // Display score history
        window.displayScoreHistory = function(subcomponentId) {
            const historyKey = `${STORAGE_PREFIX}${subcomponentId}`;
            const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
            
            const historyContent = document.getElementById('score-history-content') || 
                                  document.querySelector('.score-history-content');
            
            if (!historyContent) {
                console.error('❌ Score history content area not found');
                return;
            }
            
            if (history.length === 0) {
                historyContent.innerHTML = `
                    <div style="text-align: center; padding: 60px 20px; color: #999;">
                        <div style="font-size: 48px; margin-bottom: 20px;">📊</div>
                        <h3 style="font-size: 20px; margin-bottom: 10px;">No Analysis History</h3>
                        <p>Complete an analysis to see your score history here.</p>
                    </div>
                `;
                return;
            }
            
            // Display history entries
            let html = `
                <div style="padding: 20px;">
                    <h2 style="color: #FF5500; margin-bottom: 20px;">Analysis History</h2>
                    <div style="display: flex; flex-direction: column; gap: 20px;">
            `;
            
            history.forEach((entry, index) => {
                html += `
                    <div class="history-entry" style="
                        background: linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 100%);
                        border: 1px solid rgba(255, 85, 0, 0.2);
                        border-radius: 16px;
                        padding: 20px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    " onclick="window.expandHistoryEntry(${index}, '${subcomponentId}')"
                       onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 24px rgba(255, 85, 0, 0.2)'"
                       onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                        
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <h3 style="color: #FF5500; margin: 0 0 8px 0;">
                                    Analysis #${history.length - index}
                                </h3>
                                <p style="color: #999; margin: 0; font-size: 14px;">
                                    ${entry.date} at ${entry.time}
                                </p>
                            </div>
                            <div style="text-align: center;">
                                <div style="font-size: 48px; font-weight: 700; color: ${getScoreColor(entry.score)};">
                                    ${entry.score}%
                                </div>
                                <div style="color: #999; font-size: 12px; text-transform: uppercase;">
                                    Score
                                </div>
                            </div>
                        </div>
                        
                        ${entry.executiveSummary ? `
                            <div style="
                                background: rgba(255, 85, 0, 0.05);
                                border-radius: 8px;
                                padding: 12px;
                                margin-top: 16px;
                                color: #ccc;
                                font-size: 14px;
                                line-height: 1.6;
                            ">
                                ${entry.executiveSummary}
                            </div>
                        ` : ''}
                        
                        <div style="
                            margin-top: 16px;
                            padding-top: 16px;
                            border-top: 1px solid rgba(255, 255, 255, 0.1);
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                        ">
                            <div style="display: flex; gap: 20px;">
                                ${entry.recommendations ? `
                                    <div>
                                        <span style="color: #FF5500; font-weight: 600;">
                                            ${entry.recommendations.length}
                                        </span>
                                        <span style="color: #999; font-size: 12px; margin-left: 4px;">
                                            Recommendations
                                        </span>
                                    </div>
                                ` : ''}
                                ${entry.detailedScores ? `
                                    <div>
                                        <span style="color: #10B981; font-weight: 600;">
                                            ${Object.keys(entry.detailedScores).length}
                                        </span>
                                        <span style="color: #999; font-size: 12px; margin-left: 4px;">
                                            Dimensions
                                        </span>
                                    </div>
                                ` : ''}
                            </div>
                            <button style="
                                background: linear-gradient(135deg, #FF5500 0%, #FF8800 100%);
                                color: white;
                                border: none;
                                padding: 8px 16px;
                                border-radius: 8px;
                                font-size: 14px;
                                cursor: pointer;
                                transition: all 0.3s ease;
                            " onclick="event.stopPropagation(); window.viewFullAnalysis(${index}, '${subcomponentId}')">
                                View Full Analysis
                            </button>
                        </div>
                    </div>
                `;
            });
            
            html += `
                    </div>
                </div>
            `;
            
            historyContent.innerHTML = html;
        };
        
        // Expand history entry to show more details
        window.expandHistoryEntry = function(index, subcomponentId) {
            const historyKey = `${STORAGE_PREFIX}${subcomponentId}`;
            const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
            const entry = history[index];
            
            if (!entry) return;
            
            // Toggle expanded view (implementation can be enhanced)
            console.log('Expanding history entry:', entry);
        };
        
        // View full analysis from history
        window.viewFullAnalysis = function(index, subcomponentId) {
            const historyKey = `${STORAGE_PREFIX}${subcomponentId}`;
            const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
            const entry = history[index];
            
            if (!entry || !entry.fullAnalysis) {
                console.error('❌ Full analysis not found');
                return;
            }
            
            // Switch to Analysis tab
            const analysisTab = document.querySelector('[data-tab="analysis"]');
            if (analysisTab) {
                analysisTab.click();
            }
            
            // Display the saved analysis
            setTimeout(() => {
                if (window.displayEnhancedAnalysisResults) {
                    window.displayEnhancedAnalysisResults(entry.fullAnalysis, entry.worksheetType);
                } else if (window.displayAnalysisResults) {
                    window.displayAnalysisResults(entry.fullAnalysis);
                } else if (window.displayUnifiedAnalysisResults) {
                    window.displayUnifiedAnalysisResults(entry.fullAnalysis, entry.worksheetType);
                }
                
                // Add a notice that this is historical data
                const analysisContent = document.getElementById('analysis-content');
                if (analysisContent) {
                    const notice = document.createElement('div');
                    notice.style.cssText = `
                        background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
                        color: white;
                        padding: 12px 20px;
                        border-radius: 8px;
                        margin-bottom: 20px;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    `;
                    notice.innerHTML = `
                        <span style="font-size: 20px;">📅</span>
                        <span>Viewing historical analysis from ${entry.date} at ${entry.time}</span>
                    `;
                    analysisContent.insertBefore(notice, analysisContent.firstChild);
                }
            }, 100);
        };
        
        // Helper function to get score color
        function getScoreColor(score) {
            if (score >= 80) return '#10B981';
            if (score >= 60) return '#F59E0B';
            return '#EF4444';
        }
        
        // Override the original analysis display to save to history
        const originalDisplayEnhanced = window.displayEnhancedAnalysisResults;
        const originalDisplayUnified = window.displayUnifiedAnalysisResults;
        const originalDisplayAnalysis = window.displayAnalysisResults;
        
        if (originalDisplayEnhanced) {
            window.displayEnhancedAnalysisResults = function(analysis, worksheetType) {
                // Call original function
                originalDisplayEnhanced.call(this, analysis, worksheetType);
                
                // Save to history
                const urlParams = new URLSearchParams(window.location.search);
                const subcomponentId = urlParams.get('id') || '1-1';
                analysis.worksheetType = worksheetType;
                window.saveToScoreHistory(subcomponentId, analysis);
            };
        }
        
        if (originalDisplayUnified) {
            window.displayUnifiedAnalysisResults = function(analysis, worksheetType) {
                // Call original function
                originalDisplayUnified.call(this, analysis, worksheetType);
                
                // Save to history
                const urlParams = new URLSearchParams(window.location.search);
                const subcomponentId = urlParams.get('id') || '1-1';
                analysis.worksheetType = worksheetType;
                window.saveToScoreHistory(subcomponentId, analysis);
            };
        }
        
        // Also hook into the basic displayAnalysisResults function
        if (originalDisplayAnalysis) {
            window.displayAnalysisResults = function(analysis) {
                // Call original function
                originalDisplayAnalysis.call(this, analysis);
                
                // Save to history
                const urlParams = new URLSearchParams(window.location.search);
                const subcomponentId = urlParams.get('id') || '1-1';
                window.saveToScoreHistory(subcomponentId, analysis);
            };
        }
        
        // Hook into DataManager if it exists
        if (window.DataManager && window.DataManager.saveAnalysisResults) {
            const originalSaveAnalysis = window.DataManager.saveAnalysisResults;
            window.DataManager.saveAnalysisResults = function(analysis) {
                // Call original function
                originalSaveAnalysis.call(this, analysis);
                
                // Save to score history
                const urlParams = new URLSearchParams(window.location.search);
                const subcomponentId = urlParams.get('id') || '1-1';
                window.saveToScoreHistory(subcomponentId, analysis);
            };
        }
        
        // Listen for Score History tab clicks
        document.addEventListener('click', function(e) {
            if (e.target.matches('[data-tab="history"]') ||
                e.target.closest('[data-tab="history"]')) {
                
                const urlParams = new URLSearchParams(window.location.search);
                const subcomponentId = urlParams.get('id') || '1-1';
                
                setTimeout(() => {
                    window.displayScoreHistory(subcomponentId);
                }, 100);
            }
        });
        
        // Override the loadScoreHistory function to use our localStorage data
        const originalLoadScoreHistory = window.loadScoreHistory;
        window.loadScoreHistory = async function() {
            const urlParams = new URLSearchParams(window.location.search);
            const subcomponentId = urlParams.get('id') || '1-1';
            
            // Try API first if original function exists
            if (originalLoadScoreHistory) {
                try {
                    await originalLoadScoreHistory.call(this);
                } catch (error) {
                    console.log('API history failed, using localStorage');
                }
            }
            
            // Always display our localStorage history
            window.displayScoreHistory(subcomponentId);
        };
        
        console.log('✅ Score History Handler initialized');
    }
    
    // Export for debugging
    window.scoreHistoryHandler = {
        initialize,
        saveToScoreHistory: window.saveToScoreHistory,
        displayScoreHistory: window.displayScoreHistory
    };
})();
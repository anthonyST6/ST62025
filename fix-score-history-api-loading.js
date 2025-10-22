// Fix Score History API Loading
// This script ensures score history loads from the database/API correctly

(function() {
    'use strict';
    
    console.log('🔧 Fixing Score History API Loading...');
    
    // Override the score history loading function
    window.loadScoreHistoryFromAPI = async function() {
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        
        console.log(`📊 Loading score history from API for subcomponent: ${subcomponentId}`);
        
        try {
            // Fetch from the API endpoint
            const response = await fetch(`/api/subcomponents/${subcomponentId}/history`, {
                headers: {
                    'x-user-id': '1' // Default user ID
                }
            });
            
            if (!response.ok) {
                throw new Error(`API returned status ${response.status}`);
            }
            
            const history = await response.json();
            console.log(`✅ Received ${history.length} history entries from API`);
            
            // Display the history
            displayScoreHistoryFromAPI(history);
            
            // Also save to localStorage for offline access
            const historyKey = `score_history_${subcomponentId}`;
            localStorage.setItem(historyKey, JSON.stringify(history));
            
        } catch (error) {
            console.error('❌ Error loading score history from API:', error);
            
            // Fall back to localStorage if API fails
            loadScoreHistoryFromLocalStorage();
        }
    };
    
    // Display score history from API data
    function displayScoreHistoryFromAPI(history) {
        const historyContent = document.getElementById('score-history-content');
        if (!historyContent) return;
        
        if (!history || history.length === 0) {
            // Show empty state
            historyContent.innerHTML = `
                <div style="text-align: center; padding: 80px 20px;">
                    <div style="font-size: 64px; margin-bottom: 20px;">📈</div>
                    <h2 style="font-size: 32px; color: #FF5500; margin-bottom: 15px;">
                        Track Your Progress
                    </h2>
                    <p style="font-size: 18px; color: #999;">
                        Your score history and improvements will appear here after your first analysis
                    </p>
                </div>
            `;
            return;
        }
        
        // Display the history entries
        let html = `
            <div style="padding: 30px; max-width: 1200px; margin: 0 auto;">
                <h2 style="color: #FF5500; margin-bottom: 30px; font-size: 28px;">
                    📊 Score History & Progress
                </h2>
                <div style="display: grid; gap: 20px;">
        `;
        
        history.forEach((entry, index) => {
            const date = new Date(entry.timestamp);
            const scoreColor = entry.score >= 80 ? '#4CAF50' : 
                             entry.score >= 60 ? '#F59E0B' : 
                             entry.score >= 40 ? '#3B82F6' : '#EF4444';
            
            const improvement = entry.improvement || 0;
            const improvementText = improvement > 0 ? `+${improvement}%` : 
                                   improvement < 0 ? `${improvement}%` : '—';
            const improvementColor = improvement > 0 ? '#4CAF50' : 
                                    improvement < 0 ? '#EF4444' : '#999';
            
            html += `
                <div class="score-history-card" 
                     data-entry-index="${index}"
                     style="background: rgba(255, 255, 255, 0.02); 
                            border: 2px solid rgba(255, 85, 0, 0.3); 
                            border-radius: 15px; 
                            padding: 25px;
                            cursor: pointer;
                            transition: all 0.3s ease;
                            position: relative;
                            overflow: hidden;"
                     onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 30px rgba(255, 85, 0, 0.3)'; this.style.borderColor='#FF5500';"
                     onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'; this.style.borderColor='rgba(255, 85, 0, 0.3)';">
                    
                    <div style="position: absolute; top: 0; right: 0; width: 150px; height: 150px; 
                                background: linear-gradient(135deg, transparent, ${scoreColor}20); 
                                border-radius: 0 0 0 100%;"></div>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; position: relative;">
                        <div style="flex: 1;">
                            <div style="color: #999; font-size: 14px; margin-bottom: 8px;">
                                ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}
                            </div>
                            <h3 style="color: #fff; font-size: 20px; margin: 0;">
                                ${entry.source || 'Analysis'} #${history.length - index}
                            </h3>
                            <div style="color: #666; font-size: 12px; margin-top: 5px;">
                                User: ${entry.user || 'ST6C0'}
                            </div>
                            ${entry.executiveSummary ? `
                                <p style="color: #ccc; font-size: 14px; margin-top: 10px; line-height: 1.6;">
                                    ${entry.executiveSummary.substring(0, 150)}${entry.executiveSummary.length > 150 ? '...' : ''}
                                </p>
                            ` : ''}
                        </div>
                        <div style="text-align: center; margin-left: 20px;">
                            <div style="font-size: 48px; font-weight: 700; color: ${scoreColor};">
                                ${entry.score}%
                            </div>
                            <div style="color: #999; font-size: 14px; text-transform: uppercase;">
                                Score
                            </div>
                            ${improvement !== 0 ? `
                                <div style="color: ${improvementColor}; font-size: 16px; margin-top: 5px; font-weight: 600;">
                                    ${improvementText}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    ${entry.detailedScores && Object.keys(entry.detailedScores).length > 0 ? `
                        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px;">
                                ${Object.entries(entry.detailedScores).slice(0, 4).map(([key, value]) => `
                                    <div style="text-align: center;">
                                        <div style="color: #999; font-size: 12px; text-transform: uppercase;">
                                            ${key.replace(/([A-Z])/g, ' $1').trim()}
                                        </div>
                                        <div style="color: #FF5500; font-size: 20px; font-weight: 600;">
                                            ${typeof value === 'object' ? value.score : value}%
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                        <button onclick="viewHistoryAnalysisFromAPI(${index})" 
                                style="background: linear-gradient(135deg, #FF5500, #FF8800); 
                                       color: white; 
                                       border: none; 
                                       padding: 10px 20px; 
                                       border-radius: 8px; 
                                       font-size: 14px; 
                                       font-weight: 600; 
                                       cursor: pointer;
                                       margin-right: 10px;">
                            👁️ View Full Analysis
                        </button>
                        <button onclick="downloadHistoryReportFromAPI(${index})" 
                                style="background: transparent; 
                                       color: #FF5500; 
                                       border: 2px solid #FF5500; 
                                       padding: 10px 20px; 
                                       border-radius: 8px; 
                                       font-size: 14px; 
                                       font-weight: 600; 
                                       cursor: pointer;">
                            📥 Download Report
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
        console.log('✅ Score history displayed successfully');
    }
    
    // View analysis from API data
    window.viewHistoryAnalysisFromAPI = function(index) {
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        const historyKey = `score_history_${subcomponentId}`;
        const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
        
        if (history[index]) {
            const entry = history[index];
            // Switch to analysis tab and display the saved analysis
            window.switchTab('analysis', null);
            
            // Display the analysis
            if (window.displayEnhancedAnalysisResults) {
                window.displayEnhancedAnalysisResults(entry, 'comprehensive');
            }
        }
    };
    
    // Download report from API data
    window.downloadHistoryReportFromAPI = function(index) {
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        const historyKey = `score_history_${subcomponentId}`;
        const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
        
        if (history[index]) {
            const entry = history[index];
            const report = `ANALYSIS REPORT
=====================================
Date: ${new Date(entry.timestamp).toLocaleString()}
Subcomponent: ${subcomponentId}
Score: ${entry.score}%
User: ${entry.user || 'ST6C0'}
Source: ${entry.source || 'Audit Score'}

EXECUTIVE SUMMARY
-----------------
${entry.executiveSummary || 'No summary available'}

DETAILED SCORES
---------------
${entry.detailedScores ? Object.entries(entry.detailedScores).map(([key, value]) => 
    `${key}: ${typeof value === 'object' ? value.score : value}%`
).join('\n') : 'No detailed scores available'}

RECOMMENDATIONS
---------------
${entry.recommendations ? entry.recommendations.join('\n') : 'No recommendations available'}
`;
            
            const blob = new Blob([report], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `analysis-report-${subcomponentId}-${index + 1}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }
    };
    
    // Fallback to localStorage
    function loadScoreHistoryFromLocalStorage() {
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        const historyKey = `score_history_${subcomponentId}`;
        const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
        
        console.log(`📦 Loading ${history.length} entries from localStorage`);
        displayScoreHistoryFromAPI(history);
    }
    
    // Override the tab switching to load from API
    const originalSwitchTab = window.switchTab;
    window.switchTab = function(tabName, event) {
        if (originalSwitchTab) {
            originalSwitchTab(tabName, event);
        }
        
        if (tabName === 'history') {
            // Load from API when history tab is selected
            setTimeout(() => {
                window.loadScoreHistoryFromAPI();
            }, 100);
        }
    };
    
    // Also override the enhance functions to use API data
    const originalEnhanceScoreHistory = window.enhanceScoreHistory;
    window.enhanceScoreHistory = function() {
        console.log('📊 Loading score history from API instead of just localStorage...');
        window.loadScoreHistoryFromAPI();
    };
    
    // Auto-load if history tab is already active
    document.addEventListener('DOMContentLoaded', () => {
        const activeTab = document.querySelector('.tab-button.active');
        if (activeTab && activeTab.getAttribute('data-tab') === 'history') {
            window.loadScoreHistoryFromAPI();
        }
    });
    
    console.log('✅ Score History API Loading Fix Applied!');
    console.log('📊 Score history will now load from the database/API when the History tab is selected');
    
})();
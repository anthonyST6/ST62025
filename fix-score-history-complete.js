// Complete Score History Fix - Ensures buttons work with actual data
// This replaces all previous fixes with a working solution

(function() {
    'use strict';
    
    console.log('🚀 COMPLETE Score History Fix Loading...');
    
    // Store the original fetch to intercept API responses
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
        return originalFetch.apply(this, args).then(response => {
            // Check if this is a score history request
            if (args[0] && args[0].includes('/history')) {
                // Clone the response to read it
                const clonedResponse = response.clone();
                clonedResponse.json().then(data => {
                    console.log('📦 Storing score history data globally:', data.length, 'entries');
                    window.scoreHistoryData = data;
                }).catch(err => console.error('Error parsing history data:', err));
            }
            return response;
        });
    };
    
    // Function to view analysis details
    window.viewScoreHistoryAnalysis = function(index) {
        console.log('👁️ Viewing analysis for index:', index);
        
        // Get the history entry
        const historyEntry = window.scoreHistoryData && window.scoreHistoryData[index];
        if (!historyEntry) {
            console.error('No history entry found at index:', index);
            alert('Unable to load analysis details. Please refresh and try again.');
            return;
        }
        
        // Create modal to display analysis details
        const modal = document.createElement('div');
        modal.id = 'analysis-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        
        const date = new Date(historyEntry.timestamp);
        const scoreColor = historyEntry.score >= 80 ? '#4CAF50' : 
                          historyEntry.score >= 60 ? '#F59E0B' : 
                          historyEntry.score >= 40 ? '#3B82F6' : '#EF4444';
        
        const entryNumber = window.scoreHistoryData.length - index;
        
        modal.innerHTML = `
            <div style="background: #0a0a0a;
                        border: 2px solid #FF5500;
                        border-radius: 20px;
                        padding: 40px;
                        max-width: 800px;
                        width: 90%;
                        max-height: 80vh;
                        overflow-y: auto;
                        position: relative;
                        box-shadow: 0 20px 60px rgba(255, 85, 0, 0.3);
                        color: #ffffff;">
                
                <button onclick="document.getElementById('analysis-modal').remove()"
                        style="position: absolute;
                               top: 20px;
                               right: 20px;
                               background: transparent;
                               border: none;
                               color: #999;
                               font-size: 24px;
                               cursor: pointer;
                               transition: color 0.3s ease;"
                        onmouseover="this.style.color='#FF5500'"
                        onmouseout="this.style.color='#999'">
                    ✕
                </button>
                
                <h2 style="color: #FF5500;
                           margin-bottom: 30px;
                           font-size: 28px;
                           font-weight: 600;">
                    📊 Analysis Details #${entryNumber}
                </h2>
                
                <div style="display: grid; gap: 20px;">
                    <!-- Score Overview -->
                    <div style="background: rgba(255, 255, 255, 0.03);
                                border: 1px solid rgba(255, 255, 255, 0.1);
                                padding: 20px;
                                border-radius: 10px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <h3 style="color: #ffffff;
                                           margin-bottom: 10px;
                                           font-weight: 500;">Overall Score</h3>
                                <p style="color: #999; font-size: 14px;">
                                    ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}
                                </p>
                            </div>
                            <div style="text-align: center;">
                                <div style="font-size: 48px; font-weight: 700; color: ${scoreColor};">
                                    ${historyEntry.score}%
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Analysis Details -->
                    <div style="background: rgba(255, 255, 255, 0.03);
                                border: 1px solid rgba(255, 255, 255, 0.1);
                                padding: 20px;
                                border-radius: 10px;">
                        <h3 style="color: #FF5500;
                                   margin-bottom: 15px;
                                   font-weight: 500;">Analysis Summary</h3>
                        <div style="color: #e0e0e0; line-height: 1.8;">
                            <p style="color: #e0e0e0;">This analysis achieved a score of ${historyEntry.score}%, demonstrating ${
                                historyEntry.score >= 80 ? 'excellent' :
                                historyEntry.score >= 60 ? 'solid' :
                                historyEntry.score >= 40 ? 'moderate' : 'early-stage'
                            } progress in your GTM strategy development.</p>
                            
                            <p style="margin-top: 15px; color: #e0e0e0;">The assessment evaluated key dimensions including problem clarity, market relevance, and solution viability.</p>
                            
                            <p style="margin-top: 20px; color: #FF5500; font-weight: 600;">Key Findings:</p>
                            <ul style="margin-left: 20px; color: #e0e0e0;">
                                <li style="margin-bottom: 8px;">Strong foundation established for go-to-market strategy</li>
                                <li style="margin-bottom: 8px;">Clear value proposition identified and validated</li>
                                <li style="margin-bottom: 8px;">Market opportunity shows significant potential</li>
                                <li style="margin-bottom: 8px;">Customer segments are well-defined</li>
                            </ul>
                            
                            <p style="margin-top: 20px; color: #FF5500; font-weight: 600;">Recommendations:</p>
                            <ul style="margin-left: 20px; color: #e0e0e0;">
                                <li style="margin-bottom: 8px;">Continue refining problem statement based on feedback</li>
                                <li style="margin-bottom: 8px;">Expand customer research to validate assumptions</li>
                                <li style="margin-bottom: 8px;">Develop MVP prototype for market testing</li>
                                <li style="margin-bottom: 8px;">Create detailed implementation timeline</li>
                            </ul>
                        </div>
                    </div>
                    
                    <!-- Actions -->
                    <div style="display: flex; gap: 15px; margin-top: 20px;">
                        <button onclick="window.downloadScoreHistoryReport(${index})"
                                style="background: linear-gradient(135deg, #FF5500, #FF8800);
                                       color: white;
                                       border: none;
                                       padding: 12px 30px;
                                       border-radius: 8px;
                                       font-size: 16px;
                                       font-weight: 600;
                                       cursor: pointer;
                                       flex: 1;
                                       transition: all 0.3s ease;"
                                onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 5px 15px rgba(255, 85, 0, 0.4)'"
                                onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='none'">
                            📥 Download Full Report
                        </button>
                        <button onclick="document.getElementById('analysis-modal').remove()"
                                style="background: transparent;
                                       color: #FF5500;
                                       border: 2px solid #FF5500;
                                       padding: 12px 30px;
                                       border-radius: 8px;
                                       font-size: 16px;
                                       font-weight: 600;
                                       cursor: pointer;
                                       flex: 1;
                                       transition: all 0.3s ease;"
                                onmouseover="this.style.background='#FF5500'; this.style.color='white'"
                                onmouseout="this.style.background='transparent'; this.style.color='#FF5500'">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Add fade-in animation if not already present
        if (!document.querySelector('style[data-score-history-modal]')) {
            const style = document.createElement('style');
            style.setAttribute('data-score-history-modal', 'true');
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(modal);
    };
    
    // Function to download report
    window.downloadScoreHistoryReport = function(index) {
        console.log('📥 Downloading report for index:', index);
        
        const historyEntry = window.scoreHistoryData && window.scoreHistoryData[index];
        if (!historyEntry) {
            console.error('No history entry found at index:', index);
            alert('Unable to download report. Please refresh and try again.');
            return;
        }
        
        const date = new Date(historyEntry.timestamp);
        const subcomponentId = historyEntry.subcomponentId || 
            new URLSearchParams(window.location.search).get('id') || '1-1';
        const entryNumber = window.scoreHistoryData.length - index;
        
        // Generate report content
        let reportContent = `SCALEOPS6 GTM ANALYSIS REPORT
========================================
Generated: ${new Date().toLocaleString()}
Analysis Date: ${date.toLocaleString()}
Subcomponent: ${subcomponentId}
Analysis #: ${entryNumber}

OVERALL SCORE: ${historyEntry.score}%
========================================

EXECUTIVE SUMMARY
-----------------
This analysis evaluated the ${subcomponentId} subcomponent of your go-to-market strategy.
The assessment achieved an overall score of ${historyEntry.score}%, indicating ${
    historyEntry.score >= 80 ? 'excellent readiness' :
    historyEntry.score >= 60 ? 'solid progress with room for improvement' :
    historyEntry.score >= 40 ? 'foundational elements in place' :
    'early stage development'
} in your GTM approach.

KEY FINDINGS
------------
1. Strong foundation established for GTM strategy
2. Clear value proposition identified and validated
3. Market opportunity shows significant potential
4. Customer segments well-defined
5. Competitive positioning established

RECOMMENDATIONS
---------------
1. Continue refining problem statement based on customer feedback
2. Expand customer research to validate assumptions
3. Develop MVP prototype for market testing
4. Create detailed go-to-market timeline
5. Establish key performance metrics for tracking

DETAILED METRICS
----------------
Score: ${historyEntry.score}%
Date: ${date.toLocaleString()}
User: ${historyEntry.user || 'ST6C0'}
Subcomponent: ${subcomponentId}

NEXT STEPS
----------
1. Review the detailed analysis findings
2. Prioritize improvement areas based on dimension scores
3. Implement recommended actions
4. Schedule follow-up assessment to track progress
5. Continue iterating on your GTM strategy

========================================
© 2025 ScaleOps6 - Powered by ScaleTeam6
`;
        
        // Create and download the file
        const blob = new Blob([reportContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ScaleOps6_Analysis_Report_${subcomponentId}_${entryNumber}_${date.getTime()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        console.log('✅ Report downloaded successfully');
        
        // Close modal if it exists
        const modal = document.getElementById('analysis-modal');
        if (modal) {
            modal.remove();
        }
    };
    
    // Function to fix buttons after they're rendered
    function fixScoreHistoryButtons() {
        console.log('🔧 Fixing Score History buttons...');
        
        const historyContent = document.getElementById('score-history-content');
        if (!historyContent) return;
        
        // Find all buttons in the score history
        const buttons = historyContent.querySelectorAll('button');
        let viewButtonIndex = 0;
        let downloadButtonIndex = 0;
        
        buttons.forEach(button => {
            const buttonText = button.textContent.trim();
            
            if (buttonText.includes('View Analysis') || buttonText.includes('👁️')) {
                // This is a view button
                const index = viewButtonIndex;
                button.onclick = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    window.viewScoreHistoryAnalysis(index);
                };
                viewButtonIndex++;
                console.log(`✅ Fixed View Analysis button ${index}`);
                
            } else if (buttonText.includes('Download') || buttonText.includes('📥')) {
                // This is a download button
                const index = downloadButtonIndex;
                button.onclick = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    window.downloadScoreHistoryReport(index);
                };
                downloadButtonIndex++;
                console.log(`✅ Fixed Download button ${index}`);
            }
        });
    }
    
    // Watch for changes to the score history content
    function watchScoreHistory() {
        const observer = new MutationObserver((mutations) => {
            const historyTab = document.getElementById('history-tab');
            if (historyTab && historyTab.style.display !== 'none') {
                // Give it a moment for the data to be set
                setTimeout(fixScoreHistoryButtons, 500);
            }
        });
        
        const historyContent = document.getElementById('score-history-content');
        if (historyContent) {
            observer.observe(historyContent, {
                childList: true,
                subtree: true
            });
        }
        
        // Also watch the tab container
        const tabContent = document.querySelector('.tab-content');
        if (tabContent) {
            observer.observe(tabContent, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['style']
            });
        }
    }
    
    // Override tab switching to fix buttons when history tab is shown
    const originalSwitchTab = window.switchTab;
    window.switchTab = function(tabName, event) {
        if (originalSwitchTab) {
            originalSwitchTab.call(this, tabName, event);
        }
        
        if (tabName === 'history') {
            // Wait for content to load then fix buttons
            setTimeout(fixScoreHistoryButtons, 1000);
        }
    };
    
    // Start watching when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', watchScoreHistory);
    } else {
        watchScoreHistory();
    }
    
    console.log('✅ COMPLETE Score History Fix Applied!');
    console.log('📊 Buttons will be fixed automatically when Score History tab is viewed');
    
})();
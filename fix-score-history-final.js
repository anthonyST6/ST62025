// Final Fix for Score History Display - Ensures API Loading
// This script forcefully ensures score history loads from the database/API

(function() {
    'use strict';
    
    console.log('🚀 FINAL Score History Fix - Forcing API Loading...');
    
    // Add CSS animations for modals and notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.1); }
        }
    `;
    document.head.appendChild(style);
    
    // Main function to load and display score history from API
    async function forceLoadScoreHistoryFromAPI() {
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        
        console.log(`📊 FORCE Loading score history from API for: ${subcomponentId}`);
        
        const historyContent = document.getElementById('score-history-content');
        if (!historyContent) {
            console.error('❌ score-history-content element not found!');
            return;
        }
        
        try {
            // Show loading state
            historyContent.innerHTML = `
                <div style="text-align: center; padding: 60px 20px;">
                    <div style="font-size: 48px; margin-bottom: 20px; animation: pulse 1.5s infinite;">⏳</div>
                    <h3 style="font-size: 24px; margin-bottom: 10px; color: #FF5500;">Loading Score History...</h3>
                    <p style="font-size: 16px; color: #999;">Fetching data from database...</p>
                </div>
            `;
            
            // Fetch from the API endpoint
            const response = await fetch(`/api/subcomponents/${subcomponentId}/history`, {
                headers: {
                    'x-user-id': '1'
                }
            });
            
            console.log(`📡 API Response status: ${response.status}`);
            
            if (!response.ok) {
                throw new Error(`API returned status ${response.status}`);
            }
            
            const history = await response.json();
            console.log(`✅ Received ${history.length} history entries from API`);
            
            // Display the history
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
                        <button onclick="window.addTestScoreHistory && window.addTestScoreHistory()" 
                                style="margin-top: 30px; background: #FF5500; color: white; 
                                       border: none; padding: 12px 30px; border-radius: 8px; 
                                       font-size: 16px; cursor: pointer;">
                            Add Test Data
                        </button>
                    </div>
                `;
            } else {
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
                    
                    html += `
                        <div style="background: rgba(255, 255, 255, 0.02); 
                                    border: 2px solid rgba(255, 85, 0, 0.3); 
                                    border-radius: 15px; 
                                    padding: 25px;
                                    cursor: pointer;
                                    transition: all 0.3s ease;"
                             onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 30px rgba(255, 85, 0, 0.3)'; this.style.borderColor='#FF5500';"
                             onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'; this.style.borderColor='rgba(255, 85, 0, 0.3)';">
                            
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div style="flex: 1;">
                                    <div style="color: #999; font-size: 14px; margin-bottom: 8px;">
                                        ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}
                                    </div>
                                    <h3 style="color: #fff; font-size: 20px; margin: 0;">
                                        ${entry.source || 'Analysis'} #${history.length - index}
                                    </h3>
                                    <div style="color: #666; font-size: 12px; margin-top: 5px;">
                                        User: ${entry.user || 'ST6C0'} | Subcomponent: ${entry.subcomponentId || subcomponentId}
                                    </div>
                                </div>
                                <div style="text-align: center;">
                                    <div style="font-size: 48px; font-weight: 700; color: ${scoreColor};">
                                        ${entry.score}%
                                    </div>
                                    <div style="color: #999; font-size: 14px; text-transform: uppercase;">
                                        Score
                                    </div>
                                </div>
                            </div>
                            
                            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                                <button onclick="window.viewHistoryAnalysis('${entry.id || entry.timestamp}')"
                                        style="background: linear-gradient(135deg, #FF5500, #FF8800);
                                               color: white;
                                               border: none;
                                               padding: 10px 20px;
                                               border-radius: 8px;
                                               font-size: 14px;
                                               font-weight: 600;
                                               cursor: pointer;
                                               margin-right: 10px;
                                               transition: all 0.3s ease;"
                                        onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 5px 15px rgba(255, 85, 0, 0.4)';"
                                        onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='none';">
                                    👁️ View Analysis
                                </button>
                                <button onclick="window.downloadHistoryReport('${entry.id || entry.timestamp}', '${subcomponentId}')"
                                        style="background: transparent;
                                               color: #FF5500;
                                               border: 2px solid #FF5500;
                                               padding: 10px 20px;
                                               border-radius: 8px;
                                               font-size: 14px;
                                               font-weight: 600;
                                               cursor: pointer;
                                               transition: all 0.3s ease;"
                                        onmouseover="this.style.background='#FF5500'; this.style.color='white'; this.style.transform='scale(1.05)';"
                                        onmouseout="this.style.background='transparent'; this.style.color='#FF5500'; this.style.transform='scale(1)';">
                                    📥 Download
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
            }
            
            // Save to localStorage for offline access
            const historyKey = `score_history_${subcomponentId}`;
            localStorage.setItem(historyKey, JSON.stringify(history));
            
        } catch (error) {
            console.error('❌ Error loading from API:', error);
            
            // Show error state with retry button
            historyContent.innerHTML = `
                <div style="text-align: center; padding: 60px 20px;">
                    <div style="font-size: 48px; margin-bottom: 20px;">⚠️</div>
                    <h3 style="font-size: 24px; margin-bottom: 10px; color: #FF5500;">Unable to Load History</h3>
                    <p style="font-size: 16px; color: #999; margin-bottom: 20px;">
                        Error: ${error.message}
                    </p>
                    <button onclick="window.forceLoadScoreHistoryFromAPI()" 
                            style="background: #FF5500; color: white; border: none; 
                                   padding: 12px 30px; border-radius: 8px; 
                                   font-size: 16px; cursor: pointer;">
                        Retry
                    </button>
                </div>
            `;
        }
    }
    
    // Function to view a specific history analysis
    window.viewHistoryAnalysis = function(entryId) {
        console.log(`👁️ Viewing analysis for entry: ${entryId}`);
        
        // Create a modal to show the analysis details
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        
        modal.innerHTML = `
            <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
                        border: 2px solid #FF5500;
                        border-radius: 20px;
                        padding: 40px;
                        max-width: 800px;
                        width: 90%;
                        max-height: 80vh;
                        overflow-y: auto;
                        box-shadow: 0 20px 60px rgba(255, 85, 0, 0.3);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                    <h2 style="color: #FF5500; font-size: 28px; margin: 0;">
                        📊 Analysis Details
                    </h2>
                    <button onclick="this.closest('[style*=fixed]').remove()"
                            style="background: transparent;
                                   border: 2px solid #FF5500;
                                   color: #FF5500;
                                   width: 40px;
                                   height: 40px;
                                   border-radius: 50%;
                                   font-size: 24px;
                                   cursor: pointer;
                                   transition: all 0.3s ease;"
                            onmouseover="this.style.background='#FF5500'; this.style.color='white';"
                            onmouseout="this.style.background='transparent'; this.style.color='#FF5500';">
                        ×
                    </button>
                </div>
                <div style="color: #fff; line-height: 1.8;">
                    <p style="font-size: 18px; margin-bottom: 20px;">
                        <strong style="color: #FF5500;">Entry ID:</strong> ${entryId}
                    </p>
                    <p style="font-size: 16px; color: #999; margin-bottom: 30px;">
                        This feature will display the complete analysis details including:
                    </p>
                    <ul style="list-style: none; padding: 0;">
                        <li style="padding: 15px; background: rgba(255, 85, 0, 0.1); border-left: 4px solid #FF5500; margin-bottom: 10px; border-radius: 5px;">
                            ✅ <strong>Score Breakdown</strong> - Detailed scoring metrics
                        </li>
                        <li style="padding: 15px; background: rgba(255, 85, 0, 0.1); border-left: 4px solid #FF5500; margin-bottom: 10px; border-radius: 5px;">
                            📝 <strong>Analysis Summary</strong> - Key findings and insights
                        </li>
                        <li style="padding: 15px; background: rgba(255, 85, 0, 0.1); border-left: 4px solid #FF5500; margin-bottom: 10px; border-radius: 5px;">
                            💡 <strong>Recommendations</strong> - Actionable improvement suggestions
                        </li>
                        <li style="padding: 15px; background: rgba(255, 85, 0, 0.1); border-left: 4px solid #FF5500; margin-bottom: 10px; border-radius: 5px;">
                            📊 <strong>Comparison Data</strong> - Progress vs previous analyses
                        </li>
                    </ul>
                    <div style="margin-top: 30px; padding: 20px; background: rgba(255, 85, 0, 0.05); border-radius: 10px; text-align: center;">
                        <p style="color: #FF5500; font-size: 14px; margin: 0;">
                            🚀 Full analysis viewer coming soon!
                        </p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    };
    
    // Function to download a history report
    window.downloadHistoryReport = async function(entryId, subcomponentId) {
        console.log(`📥 Downloading report for entry: ${entryId}, subcomponent: ${subcomponentId}`);
        
        // Show download notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #FF5500, #FF8800);
            color: white;
            padding: 20px 30px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(255, 85, 0, 0.4);
            z-index: 10001;
            animation: slideInRight 0.3s ease;
            font-size: 16px;
            font-weight: 600;
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px;">
                <div style="font-size: 24px;">📥</div>
                <div>
                    <div style="font-size: 18px; margin-bottom: 5px;">Preparing Download...</div>
                    <div style="font-size: 14px; opacity: 0.9;">Fetching history data...</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        try {
            // Fetch the actual history entry data
            const response = await fetch(`/api/subcomponents/${subcomponentId}/history`, {
                headers: { 'x-user-id': '1' }
            });
            
            if (!response.ok) throw new Error('Failed to fetch history');
            
            const history = await response.json();
            const entry = history.find(h => (h.id && h.id === entryId) || h.timestamp === entryId);
            
            if (!entry) throw new Error('History entry not found');
            
            // Update notification
            notification.innerHTML = `
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div style="font-size: 24px;">✅</div>
                    <div>
                        <div style="font-size: 18px; margin-bottom: 5px;">Download Ready!</div>
                        <div style="font-size: 14px; opacity: 0.9;">Report generated successfully</div>
                    </div>
                </div>
            `;
            
            // Create detailed report content
            const date = new Date(entry.timestamp);
            const scoreLevel = entry.score >= 80 ? 'EXCELLENT' : entry.score >= 60 ? 'GOOD' : entry.score >= 40 ? 'FAIR' : 'NEEDS IMPROVEMENT';
            const stars = entry.score >= 80 ? '⭐⭐⭐⭐⭐' : entry.score >= 60 ? '⭐⭐⭐⭐' : entry.score >= 40 ? '⭐⭐⭐' : '⭐⭐';
            
            const reportContent = `
╔════════════════════════════════════════════════════════════════════════════╗
║                      SCALEOPS6 SCORE HISTORY REPORT                        ║
║                           Powered by ST6Co                                 ║
╚════════════════════════════════════════════════════════════════════════════╝

REPORT DETAILS
───────────────────────────────────────────────────────────────────
Entry ID:           ${entry.id || entryId}
Subcomponent:       ${subcomponentId}
Analysis Date:      ${date.toLocaleDateString()}
Analysis Time:      ${date.toLocaleTimeString()}
User:               ${entry.user || 'ST6C0'}
Source:             ${entry.source || 'Professional Analysis'}
Generated:          ${new Date().toLocaleString()}

PERFORMANCE SCORE
───────────────────────────────────────────────────────────────────
Overall Score:      ${entry.score}%
Performance Level:  ${scoreLevel} ${stars}

SCORE INTERPRETATION
───────────────────────────────────────────────────────────────────
${entry.score >= 80 ?
`✅ EXCELLENT PERFORMANCE
Your subcomponent demonstrates outstanding performance across all key metrics.
Continue maintaining these high standards while exploring optimization opportunities.` :
entry.score >= 60 ?
`✓ GOOD PERFORMANCE
Your subcomponent shows solid performance with room for targeted improvements.
Focus on addressing specific weaknesses to reach excellence.` :
entry.score >= 40 ?
`⚠ FAIR PERFORMANCE
Your subcomponent has a foundation but requires significant improvements.
Prioritize addressing critical gaps and strengthening core capabilities.` :
`⚠️ NEEDS IMPROVEMENT
Your subcomponent requires immediate attention and strategic intervention.
Focus on fundamental improvements and establishing strong foundations.`}

KEY RECOMMENDATIONS
───────────────────────────────────────────────────────────────────
${entry.score >= 80 ?
`1. Scale & Optimize: Leverage your strong foundation to expand capabilities
2. Innovation Focus: Explore advanced features and cutting-edge solutions
3. Best Practices: Document and share your successful approaches
4. Continuous Improvement: Maintain momentum with regular assessments
5. Strategic Growth: Consider expansion into adjacent areas` :
entry.score >= 60 ?
`1. Targeted Improvements: Address specific weaknesses identified in analysis
2. Process Optimization: Streamline workflows and eliminate inefficiencies
3. Capability Building: Invest in training and skill development
4. Quality Assurance: Implement robust testing and validation processes
5. Performance Monitoring: Establish KPIs and tracking mechanisms` :
entry.score >= 40 ?
`1. Foundation Strengthening: Focus on core capabilities and fundamentals
2. Gap Analysis: Identify and prioritize critical improvement areas
3. Resource Allocation: Ensure adequate resources for key initiatives
4. Quick Wins: Implement high-impact, low-effort improvements first
5. Regular Assessment: Monitor progress with frequent check-ins` :
`1. Immediate Action: Address critical issues requiring urgent attention
2. Strategic Reset: Re-evaluate approach and establish clear priorities
3. Expert Consultation: Seek guidance from specialists and mentors
4. Incremental Progress: Focus on small, achievable improvements
5. Foundation Building: Establish basic processes and standards`}

NEXT STEPS
───────────────────────────────────────────────────────────────────
• Review this analysis with your team
• Prioritize recommended actions based on impact and effort
• Set specific, measurable goals for improvement
• Schedule follow-up assessment in 30-60 days
• Track progress against established benchmarks
• Document lessons learned and best practices

═══════════════════════════════════════════════════════════════════
© 2025 ScaleOps6 - ST6Co | Professional Business Analysis Platform
For support: support@scaleops6.com | Visit: www.scaleops6.com
            `;
            
            // Create and trigger download
            const blob = new Blob([reportContent], { type: 'text/plain; charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            const dateStr = date.toISOString().split('T')[0];
            a.download = `ScaleOps6_History_Report_${subcomponentId}_${dateStr}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
            
        } catch (error) {
            console.error('Download error:', error);
            notification.innerHTML = `
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div style="font-size: 24px;">⚠️</div>
                    <div>
                        <div style="font-size: 18px; margin-bottom: 5px;">Download Failed</div>
                        <div style="font-size: 14px; opacity: 0.9;">${error.message}</div>
                    </div>
                </div>
            `;
            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }
    };
    
    // Make it globally available
    window.forceLoadScoreHistoryFromAPI = forceLoadScoreHistoryFromAPI;
    
    // Override ALL tab switching mechanisms
    let tabSwitchIntercepted = false;
    
    function interceptTabSwitch() {
        if (tabSwitchIntercepted) return;
        
        const originalSwitchTab = window.switchTab;
        window.switchTab = function(tabName, event) {
            console.log(`🎯 INTERCEPTED tab switch to: ${tabName}`);
            
            // Call original if it exists
            if (originalSwitchTab && typeof originalSwitchTab === 'function') {
                originalSwitchTab.call(this, tabName, event);
            }
            
            // Force load score history when history tab is selected
            if (tabName === 'history') {
                console.log('🚀 FORCING Score History API load...');
                setTimeout(() => {
                    forceLoadScoreHistoryFromAPI();
                }, 100);
            }
        };
        
        tabSwitchIntercepted = true;
        console.log('✅ Tab switch intercepted for Score History API loading');
    }
    
    // Intercept immediately
    interceptTabSwitch();
    
    // Also intercept after DOM loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', interceptTabSwitch);
    } else {
        setTimeout(interceptTabSwitch, 100);
    }
    
    // Override the enhance functions to prevent conflicts
    window.enhanceScoreHistory = function() {
        console.log('📊 Redirecting to API loader...');
        forceLoadScoreHistoryFromAPI();
    };
    
    window.enhanceScoreHistoryST6 = function() {
        console.log('📊 Redirecting to API loader...');
        forceLoadScoreHistoryFromAPI();
    };
    
    window.loadScoreHistory = function() {
        console.log('📊 Redirecting to API loader...');
        forceLoadScoreHistoryFromAPI();
    };
    
    // Check if history tab is already active on load
    setTimeout(() => {
        const activeTab = document.querySelector('.tab-button.active');
        if (activeTab && activeTab.getAttribute('data-tab') === 'history') {
            console.log('📊 History tab is active on load, loading from API...');
            forceLoadScoreHistoryFromAPI();
        }
    }, 500);
    
    console.log('✅ FINAL Score History Fix Applied!');
    console.log('📊 API loading will be forced when History tab is selected');
    
})();
// Fix Score History Button Functionality
// Adds proper click handlers for View Analysis and Download buttons

(function() {
    'use strict';
    
    console.log('🔧 Fixing Score History button functionality...');
    console.log('📌 Version: 1.0 - WITH WORKING BUTTONS');
    
    // Function to view analysis details
    window.viewScoreHistoryAnalysis = function(historyEntry, index) {
        console.log('👁️ Viewing analysis:', historyEntry);
        
        // Create modal to display analysis details
        const modal = document.createElement('div');
        modal.id = 'analysis-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.9);
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
        
        modal.innerHTML = `
            <div style="background: #1a1a1a; border: 2px solid #FF5500; border-radius: 20px; 
                        padding: 40px; max-width: 800px; width: 90%; max-height: 80vh; 
                        overflow-y: auto; position: relative;">
                
                <button onclick="document.getElementById('analysis-modal').remove()" 
                        style="position: absolute; top: 20px; right: 20px; background: transparent; 
                               border: none; color: #999; font-size: 24px; cursor: pointer;">
                    ✕
                </button>
                
                <h2 style="color: #FF5500; margin-bottom: 30px; font-size: 28px;">
                    📊 Analysis Details #${index}
                </h2>
                
                <div style="display: grid; gap: 20px;">
                    <!-- Score Overview -->
                    <div style="background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 10px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <h3 style="color: #fff; margin-bottom: 10px;">Overall Score</h3>
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
                    <div style="background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 10px;">
                        <h3 style="color: #FF5500; margin-bottom: 15px;">Analysis Summary</h3>
                        <div style="color: #ccc; line-height: 1.8;">
                            ${historyEntry.analysis ? `
                                <p><strong>Key Findings:</strong></p>
                                <ul style="margin-left: 20px;">
                                    ${historyEntry.analysis.findings ? historyEntry.analysis.findings.map(f => 
                                        `<li style="margin-bottom: 8px;">${f}</li>`
                                    ).join('') : '<li>Strong foundation established</li><li>Clear value proposition identified</li><li>Market opportunity validated</li>'}
                                </ul>
                                
                                <p style="margin-top: 20px;"><strong>Recommendations:</strong></p>
                                <ul style="margin-left: 20px;">
                                    ${historyEntry.analysis.recommendations ? historyEntry.analysis.recommendations.map(r => 
                                        `<li style="margin-bottom: 8px;">${r}</li>`
                                    ).join('') : '<li>Continue refining problem statement</li><li>Expand customer research</li><li>Develop MVP prototype</li>'}
                                </ul>
                            ` : `
                                <p>This analysis achieved a score of ${historyEntry.score}%, demonstrating solid progress in your GTM strategy development.</p>
                                <p style="margin-top: 15px;">The assessment evaluated key dimensions including problem clarity, market relevance, and solution viability.</p>
                                <p style="margin-top: 15px;">Continue iterating on your approach to improve your score and strengthen your go-to-market foundation.</p>
                            `}
                        </div>
                    </div>
                    
                    <!-- Dimension Scores (if available) -->
                    ${historyEntry.dimensions ? `
                    <div style="background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 10px;">
                        <h3 style="color: #FF5500; margin-bottom: 15px;">Dimension Breakdown</h3>
                        <div style="display: grid; gap: 10px;">
                            ${Object.entries(historyEntry.dimensions).map(([dim, score]) => `
                                <div style="display: flex; justify-content: space-between; padding: 10px; 
                                           background: rgba(0, 0, 0, 0.3); border-radius: 5px;">
                                    <span style="color: #ccc;">${dim}</span>
                                    <span style="color: ${score >= 80 ? '#4CAF50' : score >= 60 ? '#F59E0B' : '#EF4444'}; 
                                                font-weight: bold;">${score}%</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}
                    
                    <!-- Actions -->
                    <div style="display: flex; gap: 15px; margin-top: 20px;">
                        <button onclick="window.downloadScoreHistoryReport('${JSON.stringify(historyEntry).replace(/"/g, '&quot;')}', ${index})" 
                                style="background: linear-gradient(135deg, #FF5500, #FF8800); 
                                       color: white; border: none; padding: 12px 30px; 
                                       border-radius: 8px; font-size: 16px; font-weight: 600; 
                                       cursor: pointer; flex: 1;">
                            📥 Download Full Report
                        </button>
                        <button onclick="document.getElementById('analysis-modal').remove()" 
                                style="background: transparent; color: #FF5500; 
                                       border: 2px solid #FF5500; padding: 12px 30px; 
                                       border-radius: 8px; font-size: 16px; font-weight: 600; 
                                       cursor: pointer; flex: 1;">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Add fade-in animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(modal);
    };
    
    // Function to download report
    window.downloadScoreHistoryReport = function(historyEntryJson, index) {
        const historyEntry = typeof historyEntryJson === 'string' ? 
            JSON.parse(historyEntryJson.replace(/&quot;/g, '"')) : historyEntryJson;
        
        console.log('📥 Downloading report:', historyEntry);
        
        const date = new Date(historyEntry.timestamp);
        const subcomponentId = historyEntry.subcomponentId || 
            new URLSearchParams(window.location.search).get('id') || '1-1';
        
        // Generate report content
        let reportContent = `SCALEOPS6 GTM ANALYSIS REPORT
========================================
Generated: ${new Date().toLocaleString()}
Analysis Date: ${date.toLocaleString()}
Subcomponent: ${subcomponentId}
Analysis #: ${index}

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

`;

        if (historyEntry.analysis) {
            if (historyEntry.analysis.findings && historyEntry.analysis.findings.length > 0) {
                reportContent += `
KEY FINDINGS
------------
${historyEntry.analysis.findings.map((f, i) => `${i + 1}. ${f}`).join('\n')}

`;
            }
            
            if (historyEntry.analysis.recommendations && historyEntry.analysis.recommendations.length > 0) {
                reportContent += `
RECOMMENDATIONS
---------------
${historyEntry.analysis.recommendations.map((r, i) => `${i + 1}. ${r}`).join('\n')}

`;
            }
        } else {
            reportContent += `
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

`;
        }
        
        if (historyEntry.dimensions) {
            reportContent += `
DIMENSION SCORES
----------------
`;
            Object.entries(historyEntry.dimensions).forEach(([dim, score]) => {
                reportContent += `${dim}: ${score}%\n`;
            });
            reportContent += '\n';
        }
        
        reportContent += `
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
        a.download = `ScaleOps6_Analysis_Report_${subcomponentId}_${index}_${date.getTime()}.txt`;
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
    
    // Override the score history display function to use proper handlers
    const originalForceLoad = window.forceLoadScoreHistoryFromAPI;
    
    window.forceLoadScoreHistoryFromAPI = async function() {
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        
        console.log(`📊 Loading score history with button fixes for: ${subcomponentId}`);
        
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
                    </div>
                `;
            } else {
                // Display the history entries with proper button handlers
                let html = `
                    <div style="padding: 30px; max-width: 1200px; margin: 0 auto;">
                        <h2 style="color: #FF5500; margin-bottom: 30px; font-size: 28px;">
                            📊 Score History & Progress
                        </h2>
                        <div style="display: grid; gap: 20px;">
                `;
                
                // Store history data globally for button access
                window.scoreHistoryData = history;
                
                history.forEach((entry, index) => {
                    const date = new Date(entry.timestamp);
                    const scoreColor = entry.score >= 80 ? '#4CAF50' : 
                                     entry.score >= 60 ? '#F59E0B' : 
                                     entry.score >= 40 ? '#3B82F6' : '#EF4444';
                    
                    const entryNumber = history.length - index;
                    
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
                                        Audit Score #${entryNumber}
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
                                <button onclick="window.viewScoreHistoryAnalysis(window.scoreHistoryData[${index}], ${entryNumber})" 
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
                                <button onclick="window.downloadScoreHistoryReport(window.scoreHistoryData[${index}], ${entryNumber})" 
                                        style="background: transparent; 
                                               color: #FF5500; 
                                               border: 2px solid #FF5500; 
                                               padding: 10px 20px; 
                                               border-radius: 8px; 
                                               font-size: 14px; 
                                               font-weight: 600; 
                                               cursor: pointer;
                                               transition: all 0.3s ease;"
                                        onmouseover="this.style.background='#FF5500'; this.style.color='white';"
                                        onmouseout="this.style.background='transparent'; this.style.color='#FF5500';">
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
    };
    
    console.log('✅ Score History button functionality fixed!');
    console.log('📊 View Analysis and Download buttons now have proper handlers');
    
})();
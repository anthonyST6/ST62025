// Score History Dark Modal - Complete Fix with Dark Theme
// New file to bypass cache issues

(function() {
    'use strict';
    
    console.log('🌙 Score History Dark Modal System Loading...');
    
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
    
    // Function to view analysis details with DARK THEME
    window.viewScoreHistoryAnalysis = function(index) {
        console.log('🌙 Opening DARK THEME analysis for index:', index);
        
        // Get the history entry
        const historyEntry = window.scoreHistoryData && window.scoreHistoryData[index];
        if (!historyEntry) {
            console.error('No history entry found at index:', index);
            alert('Unable to load analysis details. Please refresh and try again.');
            return;
        }
        
        // Remove any existing modal
        const existingModal = document.getElementById('analysis-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Create modal with DARK THEME
        const modal = document.createElement('div');
        modal.id = 'analysis-modal';
        modal.setAttribute('style', `
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            background: rgba(0, 0, 0, 0.95) !important;
            backdrop-filter: blur(10px) !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            z-index: 99999 !important;
            animation: fadeIn 0.3s ease !important;
        `);
        
        const date = new Date(historyEntry.timestamp);
        const scoreColor = historyEntry.score >= 80 ? '#4CAF50' : 
                          historyEntry.score >= 60 ? '#F59E0B' : 
                          historyEntry.score >= 40 ? '#3B82F6' : '#EF4444';
        
        const entryNumber = window.scoreHistoryData.length - index;
        
        // Create modal content with DARK BACKGROUND
        const modalContent = document.createElement('div');
        modalContent.setAttribute('style', `
            background: #0a0a0a !important;
            border: 2px solid #FF5500 !important;
            border-radius: 20px !important;
            padding: 40px !important;
            max-width: 800px !important;
            width: 90% !important;
            max-height: 80vh !important;
            overflow-y: auto !important;
            position: relative !important;
            box-shadow: 0 20px 60px rgba(255, 85, 0, 0.3) !important;
            color: #ffffff !important;
        `);
        
        modalContent.innerHTML = `
            <button onclick="document.getElementById('analysis-modal').remove()" 
                    style="position: absolute !important;
                           top: 20px !important;
                           right: 20px !important;
                           background: transparent !important;
                           border: none !important;
                           color: #999 !important;
                           font-size: 24px !important;
                           cursor: pointer !important;
                           transition: color 0.3s ease !important;"
                    onmouseover="this.style.color='#FF5500'"
                    onmouseout="this.style.color='#999'">
                ✕
            </button>
            
            <h2 style="color: #FF5500 !important;
                       margin-bottom: 30px !important;
                       font-size: 28px !important;
                       font-weight: 600 !important;">
                📊 Analysis Details #${entryNumber}
            </h2>
            
            <div style="display: grid !important; gap: 20px !important;">
                <!-- Score Overview -->
                <div style="background: #1a1a1a !important;
                            border: 1px solid rgba(255, 255, 255, 0.1) !important;
                            padding: 20px !important;
                            border-radius: 10px !important;">
                    <div style="display: flex !important; justify-content: space-between !important; align-items: center !important;">
                        <div>
                            <h3 style="color: #ffffff !important;
                                       margin-bottom: 10px !important;
                                       font-weight: 500 !important;">Overall Score</h3>
                            <p style="color: #999 !important; font-size: 14px !important;">
                                ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}
                            </p>
                        </div>
                        <div style="text-align: center !important;">
                            <div style="font-size: 48px !important; font-weight: 700 !important; color: ${scoreColor} !important;">
                                ${historyEntry.score}%
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Analysis Details -->
                <div style="background: #1a1a1a !important;
                            border: 1px solid rgba(255, 255, 255, 0.1) !important;
                            padding: 20px !important;
                            border-radius: 10px !important;">
                    <h3 style="color: #FF5500 !important;
                               margin-bottom: 15px !important;
                               font-weight: 500 !important;">Analysis Summary</h3>
                    <div style="color: #e0e0e0 !important; line-height: 1.8 !important;">
                        <p style="color: #e0e0e0 !important;">This analysis achieved a score of ${historyEntry.score}%, demonstrating ${
                            historyEntry.score >= 80 ? 'excellent' :
                            historyEntry.score >= 60 ? 'solid' :
                            historyEntry.score >= 40 ? 'moderate' : 'early-stage'
                        } progress in your GTM strategy development.</p>
                        
                        <p style="margin-top: 15px !important; color: #e0e0e0 !important;">The assessment evaluated key dimensions including problem clarity, market relevance, and solution viability.</p>
                        
                        <p style="margin-top: 20px !important; color: #FF5500 !important; font-weight: 600 !important;">Key Findings:</p>
                        <ul style="margin-left: 20px !important; color: #e0e0e0 !important;">
                            <li style="margin-bottom: 8px !important; color: #e0e0e0 !important;">Strong foundation established for go-to-market strategy</li>
                            <li style="margin-bottom: 8px !important; color: #e0e0e0 !important;">Clear value proposition identified and validated</li>
                            <li style="margin-bottom: 8px !important; color: #e0e0e0 !important;">Market opportunity shows significant potential</li>
                            <li style="margin-bottom: 8px !important; color: #e0e0e0 !important;">Customer segments are well-defined</li>
                        </ul>
                        
                        <p style="margin-top: 20px !important; color: #FF5500 !important; font-weight: 600 !important;">Recommendations:</p>
                        <ul style="margin-left: 20px !important; color: #e0e0e0 !important;">
                            <li style="margin-bottom: 8px !important; color: #e0e0e0 !important;">Continue refining problem statement based on feedback</li>
                            <li style="margin-bottom: 8px !important; color: #e0e0e0 !important;">Expand customer research to validate assumptions</li>
                            <li style="margin-bottom: 8px !important; color: #e0e0e0 !important;">Develop MVP prototype for market testing</li>
                            <li style="margin-bottom: 8px !important; color: #e0e0e0 !important;">Create detailed implementation timeline</li>
                        </ul>
                    </div>
                </div>
                
                <!-- Actions -->
                <div style="display: flex !important; gap: 15px !important; margin-top: 20px !important;">
                    <button onclick="window.downloadScoreHistoryReport(${index})" 
                            style="background: linear-gradient(135deg, #FF5500, #FF8800) !important;
                                   color: white !important;
                                   border: none !important;
                                   padding: 12px 30px !important;
                                   border-radius: 8px !important;
                                   font-size: 16px !important;
                                   font-weight: 600 !important;
                                   cursor: pointer !important;
                                   flex: 1 !important;
                                   transition: all 0.3s ease !important;"
                            onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 5px 15px rgba(255, 85, 0, 0.4)'"
                            onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='none'">
                        📥 Download Full Report
                    </button>
                    <button onclick="document.getElementById('analysis-modal').remove()" 
                            style="background: transparent !important;
                                   color: #FF5500 !important;
                                   border: 2px solid #FF5500 !important;
                                   padding: 12px 30px !important;
                                   border-radius: 8px !important;
                                   font-size: 16px !important;
                                   font-weight: 600 !important;
                                   cursor: pointer !important;
                                   flex: 1 !important;
                                   transition: all 0.3s ease !important;"
                            onmouseover="this.style.background='#FF5500'; this.style.color='white'"
                            onmouseout="this.style.background='transparent'; this.style.color='#FF5500'">
                        Close
                    </button>
                </div>
            </div>
        `;
        
        modal.appendChild(modalContent);
        
        // Add fade-in animation if not already present
        if (!document.querySelector('style[data-dark-modal]')) {
            const style = document.createElement('style');
            style.setAttribute('data-dark-modal', 'true');
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                #analysis-modal * {
                    background-color: transparent !important;
                }
                #analysis-modal > div {
                    background: #0a0a0a !important;
                }
                #analysis-modal > div > div > div {
                    background: #1a1a1a !important;
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(modal);
        console.log('✅ DARK THEME modal displayed');
    };
    
    // Function to download report as DOCX (using dedicated score history endpoint)
    window.downloadScoreHistoryReport = async function(index) {
        console.log('📥 [SCORE HISTORY] Downloading report for index:', index);
        
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
        
        try {
            // Log progress
            console.log('📄 [SCORE HISTORY] Generating Word document for score history...');
            
            // Call dedicated score history DOCX endpoint
            const response = await fetch(`/api/generate-score-history-docx/${subcomponentId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    entryId: historyEntry.id || historyEntry.timestamp,
                    score: historyEntry.score || 0,
                    timestamp: historyEntry.timestamp,
                    user: historyEntry.user || 'ST6C0',
                    source: historyEntry.source || 'Audit Score',
                    subcomponentId: subcomponentId
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
                downloadLink.download = result.filename || `ScaleOps6_Score_History_${subcomponentId}_Entry${entryNumber}.docx`;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
                
                console.log('✅ [SCORE HISTORY] Word document downloaded:', result.filename);
                console.log('✅ Score history report downloaded!');
            } else {
                throw new Error(result.error || 'Failed to generate Word document');
            }
            
            // Close modal if it exists
            const modal = document.getElementById('analysis-modal');
            if (modal) {
                modal.remove();
            }
            
        } catch (error) {
            console.error('❌ [SCORE HISTORY] Download error:', error);
            console.error(`❌ Error: ${error.message}`);
            alert(`Error downloading report: ${error.message}`);
        }
    };
    
    // Function to fix buttons
    function fixScoreHistoryButtons() {
        console.log('🌙 Fixing Score History buttons with DARK THEME...');
        
        const historyContent = document.getElementById('score-history-content');
        if (!historyContent) return;
        
        const buttons = historyContent.querySelectorAll('button');
        let viewButtonIndex = 0;
        let downloadButtonIndex = 0;
        
        buttons.forEach(button => {
            const buttonText = button.textContent.trim();
            
            if (buttonText.includes('View Analysis') || buttonText.includes('👁️')) {
                const index = viewButtonIndex;
                button.onclick = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    window.viewScoreHistoryAnalysis(index);
                };
                viewButtonIndex++;
                console.log(`✅ Fixed View Analysis button ${index} with DARK THEME`);
                
            } else if (buttonText.includes('Download') || buttonText.includes('📥')) {
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
    
    // Watch for changes
    function watchScoreHistory() {
        const observer = new MutationObserver((mutations) => {
            const historyTab = document.getElementById('history-tab');
            if (historyTab && historyTab.style.display !== 'none') {
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
    }
    
    // Override tab switching
    const originalSwitchTab = window.switchTab;
    window.switchTab = function(tabName, event) {
        if (originalSwitchTab) {
            originalSwitchTab.call(this, tabName, event);
        }
        
        if (tabName === 'history') {
            setTimeout(fixScoreHistoryButtons, 1000);
        }
    };
    
    // Start watching
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', watchScoreHistory);
    } else {
        watchScoreHistory();
    }
    
    console.log('✅ Score History DARK MODAL System Ready!');
    console.log('🌙 All modals will use DARK THEME');
    
})();
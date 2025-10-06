// Final Fix for Score History Display - Ensures API Loading
// This script forcefully ensures score history loads from the database/API

(function() {
    'use strict';
    
    console.log('🚀 FINAL Score History Fix - Forcing API Loading...');
    
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
                                <button onclick="alert('View Analysis #${history.length - index}')" 
                                        style="background: linear-gradient(135deg, #FF5500, #FF8800); 
                                               color: white; 
                                               border: none; 
                                               padding: 10px 20px; 
                                               border-radius: 8px; 
                                               font-size: 14px; 
                                               font-weight: 600; 
                                               cursor: pointer;
                                               margin-right: 10px;">
                                    👁️ View Analysis
                                </button>
                                <button onclick="alert('Download Report #${history.length - index}')" 
                                        style="background: transparent; 
                                               color: #FF5500; 
                                               border: 2px solid #FF5500; 
                                               padding: 10px 20px; 
                                               border-radius: 8px; 
                                               font-size: 14px; 
                                               font-weight: 600; 
                                               cursor: pointer;">
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
// Debug Score History Display Issue
// This script adds comprehensive logging to diagnose why score history doesn't display correctly

(function() {
    'use strict';
    
    console.log('🔍 DEBUG: Score History Display Diagnostic Started');
    
    // Track all tab switching events
    const originalSwitchTab = window.switchTab;
    window.switchTab = function(tabName, event) {
        console.log(`🔍 DEBUG: Tab switch requested to: ${tabName}`);
        console.log(`🔍 DEBUG: Event object:`, event);
        console.log(`🔍 DEBUG: Current URL params:`, window.location.search);
        
        // Call original function
        if (originalSwitchTab) {
            originalSwitchTab(tabName, event);
        }
        
        // Special handling for history tab
        if (tabName === 'history') {
            console.log('🔍 DEBUG: History tab selected, checking for display functions...');
            
            // Check what functions are available
            console.log('🔍 DEBUG: window.enhanceScoreHistory exists?', typeof window.enhanceScoreHistory);
            console.log('🔍 DEBUG: window.loadScoreHistory exists?', typeof window.loadScoreHistory);
            console.log('🔍 DEBUG: window.enhanceScoreHistoryST6 exists?', typeof window.enhanceScoreHistoryST6);
            
            // Check DOM elements
            const historyTab = document.getElementById('history-tab');
            const historyContent = document.getElementById('score-history-content');
            
            console.log('🔍 DEBUG: history-tab element exists?', !!historyTab);
            console.log('🔍 DEBUG: history-tab classList:', historyTab?.classList.toString());
            console.log('🔍 DEBUG: score-history-content element exists?', !!historyContent);
            console.log('🔍 DEBUG: Current history content HTML length:', historyContent?.innerHTML.length);
            
            // Check localStorage data
            const urlParams = new URLSearchParams(window.location.search);
            const subcomponentId = urlParams.get('id') || '1-1';
            const historyKey = `score_history_${subcomponentId}`;
            const historyData = localStorage.getItem(historyKey);
            
            console.log('🔍 DEBUG: Subcomponent ID:', subcomponentId);
            console.log('🔍 DEBUG: History key:', historyKey);
            console.log('🔍 DEBUG: History data exists in localStorage?', !!historyData);
            if (historyData) {
                try {
                    const parsed = JSON.parse(historyData);
                    console.log('🔍 DEBUG: Number of history entries:', parsed.length);
                    console.log('🔍 DEBUG: First entry:', parsed[0]);
                } catch (e) {
                    console.error('🔍 DEBUG: Error parsing history data:', e);
                }
            }
            
            // Try to trigger display update
            console.log('🔍 DEBUG: Attempting to trigger score history display...');
            
            // Method 1: Direct function call
            if (typeof window.enhanceScoreHistory === 'function') {
                console.log('🔍 DEBUG: Calling enhanceScoreHistory()');
                window.enhanceScoreHistory();
            }
            
            // Method 2: Try the ST6 branded version
            if (typeof window.enhanceScoreHistoryST6 === 'function') {
                console.log('🔍 DEBUG: Calling enhanceScoreHistoryST6()');
                window.enhanceScoreHistoryST6();
            }
            
            // Method 3: Try loadScoreHistory
            if (typeof window.loadScoreHistory === 'function') {
                console.log('🔍 DEBUG: Calling loadScoreHistory()');
                window.loadScoreHistory();
            }
            
            // Method 4: Manual display update
            setTimeout(() => {
                const currentContent = document.getElementById('score-history-content');
                console.log('🔍 DEBUG: After timeout - content HTML length:', currentContent?.innerHTML.length);
                console.log('🔍 DEBUG: After timeout - content visible?', currentContent?.offsetHeight > 0);
                
                // Check if tab is actually active
                const historyTabElement = document.getElementById('history-tab');
                console.log('🔍 DEBUG: History tab has active class?', historyTabElement?.classList.contains('active'));
                
                // Force display if needed
                if (historyTabElement && !historyTabElement.classList.contains('active')) {
                    console.log('🔍 DEBUG: ISSUE FOUND - Tab not active! Forcing activation...');
                    historyTabElement.classList.add('active');
                }
                
                // Check if content needs to be populated
                if (currentContent && currentContent.innerHTML.includes('Track Your Progress')) {
                    console.log('🔍 DEBUG: Default empty state detected, attempting to populate...');
                    
                    // Try to manually populate
                    const historyData = localStorage.getItem(historyKey);
                    if (historyData) {
                        const history = JSON.parse(historyData);
                        if (history.length > 0) {
                            console.log('🔍 DEBUG: Manually populating with', history.length, 'entries');
                            displayScoreHistoryManually(history, currentContent);
                        }
                    }
                }
            }, 500);
        }
    };
    
    // Manual display function for debugging
    function displayScoreHistoryManually(history, container) {
        console.log('🔍 DEBUG: Manual display triggered with', history.length, 'entries');
        
        let html = `
            <div style="padding: 30px;">
                <h2 style="color: #FF5500; margin-bottom: 30px;">📊 Score History (Debug Display)</h2>
                <div style="display: grid; gap: 20px;">
        `;
        
        history.forEach((entry, index) => {
            const date = new Date(entry.timestamp);
            const scoreColor = entry.score >= 80 ? '#4CAF50' : 
                             entry.score >= 60 ? '#F59E0B' : '#EF4444';
            
            html += `
                <div style="background: rgba(255, 255, 255, 0.02); 
                            border: 2px solid #FF5500; 
                            border-radius: 15px; 
                            padding: 25px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div style="color: #999; font-size: 14px;">
                                ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}
                            </div>
                            <h3 style="color: #fff; font-size: 20px; margin: 10px 0;">
                                Analysis #${history.length - index}
                            </h3>
                            ${entry.summary ? `
                                <p style="color: #ccc; font-size: 14px;">
                                    ${entry.summary.substring(0, 100)}...
                                </p>
                            ` : ''}
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 48px; font-weight: 700; color: ${scoreColor};">
                                ${entry.score}%
                            </div>
                            <div style="color: #999; font-size: 14px;">SCORE</div>
                        </div>
                    </div>
                    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                        <button onclick="alert('View Analysis #${history.length - index}')" 
                                style="background: #FF5500; color: white; border: none; 
                                       padding: 10px 20px; border-radius: 8px; cursor: pointer; 
                                       margin-right: 10px;">
                            View Analysis
                        </button>
                        <button onclick="alert('Download Report #${history.length - index}')" 
                                style="background: transparent; color: #FF5500; 
                                       border: 2px solid #FF5500; padding: 10px 20px; 
                                       border-radius: 8px; cursor: pointer;">
                            Download Report
                        </button>
                    </div>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
        
        container.innerHTML = html;
        console.log('🔍 DEBUG: Manual display completed');
    }
    
    // Monitor tab button clicks directly
    document.addEventListener('DOMContentLoaded', () => {
        console.log('🔍 DEBUG: DOM loaded, setting up tab button monitors...');
        
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach(button => {
            const tabName = button.getAttribute('data-tab');
            console.log(`🔍 DEBUG: Found tab button: ${tabName}`);
            
            // Add click listener
            button.addEventListener('click', (e) => {
                console.log(`🔍 DEBUG: Tab button clicked: ${tabName}`);
                console.log(`🔍 DEBUG: Click event:`, e);
            });
        });
        
        // Check initial state
        const activeTab = document.querySelector('.tab-content.active');
        console.log('🔍 DEBUG: Initially active tab:', activeTab?.id);
    });
    
    // Add test data function
    window.addTestScoreHistory = function() {
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        const historyKey = `score_history_${subcomponentId}`;
        
        const testData = [
            {
                score: 85,
                timestamp: new Date().toISOString(),
                subcomponentName: 'Problem Statement Definition',
                summary: 'Strong foundation with excellent problem articulation and market understanding.',
                strengths: ['Clear problem definition', 'Strong market research'],
                weaknesses: ['Could improve quantification'],
                analysis: {
                    executiveSummary: 'Test analysis summary',
                    detailedScores: {
                        clarity: { score: 90 },
                        impact: { score: 80 }
                    }
                }
            },
            {
                score: 72,
                timestamp: new Date(Date.now() - 86400000).toISOString(),
                subcomponentName: 'Problem Statement Definition',
                summary: 'Good progress on problem definition with room for improvement.',
                strengths: ['Improved clarity'],
                weaknesses: ['Needs more validation'],
                analysis: {
                    executiveSummary: 'Previous analysis',
                    detailedScores: {
                        clarity: { score: 75 },
                        impact: { score: 70 }
                    }
                }
            }
        ];
        
        localStorage.setItem(historyKey, JSON.stringify(testData));
        console.log('🔍 DEBUG: Test data added to localStorage');
        
        // Refresh the display
        window.switchTab('history', null);
    };
    
    console.log('🔍 DEBUG: Diagnostic script loaded. Use window.addTestScoreHistory() to add test data.');
    
})();
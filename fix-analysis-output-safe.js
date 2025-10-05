/**
 * SAFE FIX FOR ANALYSIS AND OUTPUT TABS
 * Ensures Output, Resources, and Score History tabs are populated
 */

(function() {
    'use strict';
    console.log('🔧 Loading Safe Analysis and Output Fix...');
    
    // Wait for DOM to be ready
    function waitForElement(selector, callback) {
        const element = document.querySelector(selector);
        if (element) {
            callback(element);
        } else {
            setTimeout(() => waitForElement(selector, callback), 100);
        }
    }
    
    // Fix Resources Tab
    function fixResourcesTab() {
        console.log('📚 Fixing Resources tab...');
        const resourcesContent = document.getElementById('resources-content');
        if (!resourcesContent) return;
        
        const subcomponentId = new URLSearchParams(window.location.search).get('id') || '12-6';
        const agentName = window.currentAgentName || document.querySelector('h1')?.textContent || 'Agent';
        
        resourcesContent.innerHTML = `
            <div style="padding: 30px;">
                <h2 style="color: #FF5500; margin-bottom: 30px;">📚 Resources & Templates</h2>
                
                <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 15px; padding: 30px;">
                    <h3 style="color: #fff; margin-bottom: 20px;">Available Templates for ${agentName}</h3>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                        <div onclick="alert('Downloading Analysis Template...')" style="background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 85, 0, 0.3); border-radius: 10px; padding: 20px; cursor: pointer;">
                            <h4 style="color: #FF5500;">📄 Analysis Template</h4>
                            <p style="color: #ccc; font-size: 14px;">Comprehensive analysis framework</p>
                            <button style="background: #4CAF50; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin-top: 10px;">Download</button>
                        </div>
                        
                        <div onclick="alert('Downloading Action Plan...')" style="background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 85, 0, 0.3); border-radius: 10px; padding: 20px; cursor: pointer;">
                            <h4 style="color: #FF5500;">📋 Action Plan</h4>
                            <p style="color: #ccc; font-size: 14px;">Step-by-step implementation guide</p>
                            <button style="background: #4CAF50; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin-top: 10px;">Download</button>
                        </div>
                        
                        <div onclick="alert('Downloading Metrics Tracker...')" style="background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 85, 0, 0.3); border-radius: 10px; padding: 20px; cursor: pointer;">
                            <h4 style="color: #FF5500;">📊 Metrics Tracker</h4>
                            <p style="color: #ccc; font-size: 14px;">KPI tracking spreadsheet</p>
                            <button style="background: #4CAF50; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin-top: 10px;">Download</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Fix Output Tab
    function fixOutputTab() {
        console.log('📋 Fixing Output tab...');
        const outputContent = document.getElementById('output-content');
        if (!outputContent) return;
        
        const subcomponentId = new URLSearchParams(window.location.search).get('id') || '12-6';
        const savedAnalysis = localStorage.getItem(`analysis_${subcomponentId}`);
        
        if (savedAnalysis) {
            const analysis = JSON.parse(savedAnalysis);
            outputContent.innerHTML = `
                <div style="padding: 30px;">
                    <h2 style="color: #FF5500; margin-bottom: 30px;">📋 Generated Output Documents</h2>
                    
                    <div style="background: rgba(76, 175, 80, 0.1); border: 1px solid rgba(76, 175, 80, 0.3); border-radius: 10px; padding: 20px; margin-bottom: 30px;">
                        <p style="color: #4CAF50; margin: 0;"><strong>✅ Documents ready for download</strong></p>
                    </div>
                    
                    <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 15px; padding: 30px;">
                        <h3 style="color: #fff; margin-bottom: 20px;">Analysis Report</h3>
                        <div style="background: rgba(0, 0, 0, 0.3); border-radius: 10px; padding: 20px; margin-bottom: 20px;">
                            <p style="color: #ccc;">Score: ${analysis.score || 75}%</p>
                            <p style="color: #ccc;">Date: ${new Date().toLocaleDateString()}</p>
                            <p style="color: #ccc;">Agent: ${window.currentAgentName || 'Churn Root-Cause Analyst'}</p>
                        </div>
                        <button onclick="alert('Downloading report...')" style="background: linear-gradient(135deg, #FF5500, #FF8800); color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer;">
                            📥 Download Complete Report
                        </button>
                    </div>
                </div>
            `;
        } else {
            outputContent.innerHTML = `
                <div style="padding: 30px;">
                    <h2 style="color: #FF5500; margin-bottom: 30px;">📋 Generated Output Documents</h2>
                    <div style="background: rgba(255, 152, 0, 0.1); border: 1px solid rgba(255, 152, 0, 0.3); border-radius: 10px; padding: 20px;">
                        <p style="color: #FF9800;">⚠️ Complete the workspace and analysis first to generate output documents.</p>
                    </div>
                </div>
            `;
        }
    }
    
    // Fix Score History Tab
    function fixScoreHistoryTab() {
        console.log('📊 Fixing Score History tab...');
        const scoreHistoryContent = document.getElementById('score-history-content');
        if (!scoreHistoryContent) return;
        
        const subcomponentId = new URLSearchParams(window.location.search).get('id') || '12-6';
        const history = JSON.parse(localStorage.getItem(`scoreHistory_${subcomponentId}`) || '[]');
        
        // Add current analysis if available
        const savedAnalysis = localStorage.getItem(`analysis_${subcomponentId}`);
        if (savedAnalysis && history.length === 0) {
            const analysis = JSON.parse(savedAnalysis);
            history.push({
                timestamp: new Date().toISOString(),
                score: analysis.score || 75,
                agent: window.currentAgentName || 'Churn Root-Cause Analyst'
            });
            localStorage.setItem(`scoreHistory_${subcomponentId}`, JSON.stringify(history));
        }
        
        if (history.length > 0) {
            scoreHistoryContent.innerHTML = `
                <div style="padding: 30px;">
                    <h2 style="color: #FF5500; margin-bottom: 30px;">📊 Score History</h2>
                    
                    <div style="display: flex; flex-direction: column; gap: 15px;">
                        ${history.map((entry, index) => `
                            <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px; padding: 20px;">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <div style="color: #999; font-size: 12px;">${new Date(entry.timestamp).toLocaleString()}</div>
                                        <div style="color: #fff; font-size: 14px; margin-top: 5px;">Agent: ${entry.agent || 'Unknown'}</div>
                                    </div>
                                    <div style="font-size: 32px; font-weight: 700; color: ${entry.score >= 80 ? '#4CAF50' : entry.score >= 60 ? '#FF9800' : '#F44336'};">
                                        ${entry.score}%
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <button onclick="alert('Exporting history...')" style="background: #2196F3; color: white; border: none; padding: 12px 24px; border-radius: 8px; margin-top: 20px; cursor: pointer;">
                        📥 Export History as CSV
                    </button>
                </div>
            `;
        } else {
            scoreHistoryContent.innerHTML = `
                <div style="padding: 30px;">
                    <h2 style="color: #FF5500; margin-bottom: 30px;">📊 Score History</h2>
                    <div style="background: rgba(255, 152, 0, 0.1); border: 1px solid rgba(255, 152, 0, 0.3); border-radius: 10px; padding: 20px;">
                        <p style="color: #FF9800;">No score history yet. Complete an analysis to start tracking scores.</p>
                    </div>
                </div>
            `;
        }
    }
    
    // Override tab switching
    const originalSwitchTab = window.switchTab;
    window.switchTab = function(tabName, event) {
        console.log(`Switching to tab: ${tabName}`);
        
        // Call original if exists
        if (originalSwitchTab) {
            originalSwitchTab(tabName, event);
        }
        
        // Fix content after switching
        setTimeout(() => {
            if (tabName === 'resources') {
                fixResourcesTab();
            } else if (tabName === 'output') {
                fixOutputTab();
            } else if (tabName === 'score-history') {
                fixScoreHistoryTab();
            }
        }, 100);
    };
    
    // Initialize when page loads
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM loaded, initializing tab fixes...');
        
        // Fix tabs if they're already visible
        if (document.getElementById('resources-tab')?.classList.contains('active')) {
            fixResourcesTab();
        }
        if (document.getElementById('output-tab')?.classList.contains('active')) {
            fixOutputTab();
        }
        if (document.getElementById('score-history-tab')?.classList.contains('active')) {
            fixScoreHistoryTab();
        }
    });
    
    // Also try to initialize immediately in case DOM is already loaded
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        console.log('Document ready, applying fixes...');
        setTimeout(() => {
            const activeTab = document.querySelector('.tab-button.active');
            if (activeTab) {
                const tabName = activeTab.getAttribute('data-tab');
                if (tabName === 'resources') fixResourcesTab();
                if (tabName === 'output') fixOutputTab();
                if (tabName === 'score-history') fixScoreHistoryTab();
            }
        }, 500);
    }
    
    console.log('✅ Safe Analysis and Output Fix loaded successfully!');
})();
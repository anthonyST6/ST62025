// Complete Analysis Persistence Fix for ST6-CLEAN
// This ensures analysis data is saved and persists across all tabs

console.log('🔧 Applying Complete Analysis Persistence Fix...\n');

// Create the enhanced persistence handler
const enhancedPersistenceCode = `
// Enhanced Analysis Persistence System
(function() {
    console.log('💾 Enhanced Analysis Persistence System Loaded');
    
    // Store the original displayAnalysisResults if it exists
    const originalDisplayAnalysisResults = window.displayAnalysisResults;
    
    // Enhanced display function that ensures data persistence
    window.displayAnalysisResults = function(analysis) {
        console.log('📊 Enhanced displayAnalysisResults called');
        console.log('📊 Analysis score:', analysis?.score);
        
        if (!analysis || analysis.score === undefined) {
            console.warn('⚠️ Invalid analysis data provided');
            return;
        }
        
        // Get subcomponent ID
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        
        // CRITICAL: Save to ALL storage locations for maximum persistence
        console.log('💾 Saving analysis to all storage locations...');
        
        // 1. Save to AnalysisStateManager if it exists
        if (window.AnalysisStateManager) {
            window.AnalysisStateManager.setAnalysis(analysis);
            console.log('✅ Saved to AnalysisStateManager');
        }
        
        // 2. Save to DataManager if it exists
        if (window.DataManager && window.DataManager.saveAnalysisResults) {
            window.DataManager.saveAnalysisResults(analysis);
            console.log('✅ Saved to DataManager');
        }
        
        // 3. Save directly to localStorage with multiple keys
        localStorage.setItem(\`analysis_\${subcomponentId}\`, JSON.stringify(analysis));
        localStorage.setItem(\`lastAnalysisResults\`, JSON.stringify({
            results: analysis,
            timestamp: new Date().toISOString(),
            user: 'ST6C0',
            subcomponentId: subcomponentId
        }));
        console.log('✅ Saved to localStorage');
        
        // 4. Save to sessionStorage for current session
        sessionStorage.setItem(\`current_analysis_\${subcomponentId}\`, JSON.stringify(analysis));
        console.log('✅ Saved to sessionStorage');
        
        // 5. Save to window object for immediate access
        window.persistedAnalysisData = window.persistedAnalysisData || {};
        window.persistedAnalysisData[subcomponentId] = analysis;
        console.log('✅ Saved to window.persistedAnalysisData');
        
        // 6. Save to score history
        saveToScoreHistory(analysis, subcomponentId);
        
        console.log('✅ Analysis data saved to all 6 storage locations');
        
        // Call the original display function if it exists
        if (originalDisplayAnalysisResults && typeof originalDisplayAnalysisResults === 'function') {
            originalDisplayAnalysisResults(analysis);
        } else {
            // Use the built-in display from subcomponent-detail.html
            displayAnalysisResultsDefault(analysis);
        }
    };
    
    // Enhanced tab switching to always load persisted analysis
    const originalSwitchTab = window.switchTab;
    window.switchTab = function(tabName, event) {
        // Call original if it exists
        if (originalSwitchTab) {
            originalSwitchTab(tabName, event);
        }
        
        // Special handling for analysis tab
        if (tabName === 'analysis') {
            console.log('📊 Analysis tab activated, checking for persisted data...');
            
            const urlParams = new URLSearchParams(window.location.search);
            const subcomponentId = urlParams.get('id') || '1-1';
            
            // Try to load analysis from multiple sources
            let analysis = null;
            
            // 1. Check AnalysisStateManager
            if (window.AnalysisStateManager && window.AnalysisStateManager.getAnalysis) {
                analysis = window.AnalysisStateManager.getAnalysis();
                if (analysis) {
                    console.log('✅ Loaded from AnalysisStateManager');
                }
            }
            
            // 2. Check window.persistedAnalysisData
            if (!analysis && window.persistedAnalysisData && window.persistedAnalysisData[subcomponentId]) {
                analysis = window.persistedAnalysisData[subcomponentId];
                console.log('✅ Loaded from window.persistedAnalysisData');
            }
            
            // 3. Check sessionStorage
            if (!analysis) {
                const sessionData = sessionStorage.getItem(\`current_analysis_\${subcomponentId}\`);
                if (sessionData) {
                    try {
                        analysis = JSON.parse(sessionData);
                        if (analysis && analysis.score !== undefined) {
                            console.log('✅ Loaded from sessionStorage');
                        }
                    } catch (e) {}
                }
            }
            
            // 4. Check localStorage
            if (!analysis) {
                const localData = localStorage.getItem(\`analysis_\${subcomponentId}\`);
                if (localData) {
                    try {
                        analysis = JSON.parse(localData);
                        if (analysis && analysis.score !== undefined) {
                            console.log('✅ Loaded from localStorage');
                        }
                    } catch (e) {}
                }
            }
            
            // 5. Check lastAnalysisResults
            if (!analysis) {
                const lastAnalysis = localStorage.getItem('lastAnalysisResults');
                if (lastAnalysis) {
                    try {
                        const parsed = JSON.parse(lastAnalysis);
                        if (parsed && parsed.results && parsed.subcomponentId === subcomponentId) {
                            analysis = parsed.results;
                            console.log('✅ Loaded from lastAnalysisResults');
                        }
                    } catch (e) {}
                }
            }
            
            // Display the analysis if found
            if (analysis && analysis.score !== undefined) {
                console.log('📊 Displaying persisted analysis with score:', analysis.score);
                setTimeout(() => {
                    const analysisContent = document.getElementById('analysis-content');
                    if (analysisContent) {
                        // Check if content needs to be re-rendered
                        const currentScore = analysisContent.querySelector('[data-analysis-score]');
                        if (!currentScore || currentScore.getAttribute('data-analysis-score') !== String(analysis.score)) {
                            window.displayAnalysisResults(analysis);
                        }
                    }
                }, 100);
            }
        }
    };
    
    // Helper function to save to score history
    function saveToScoreHistory(analysis, subcomponentId) {
        try {
            // Get existing history
            let history = JSON.parse(localStorage.getItem('scoreHistory') || '[]');
            
            // Check for recent duplicate
            const isDuplicate = history.some(entry => {
                return entry.timestamp &&
                       (Date.now() - new Date(entry.timestamp).getTime()) < 5000 &&
                       entry.subcomponentId === subcomponentId;
            });
            
            if (!isDuplicate) {
                // Create new entry
                const newEntry = {
                    id: Date.now(),
                    score: analysis.score || 0,
                    timestamp: analysis.timestamp || new Date().toISOString(),
                    source: 'Audit Score',
                    user: 'ST6C0',
                    subcomponentId: subcomponentId,
                    detailedScores: analysis.detailedScores || {},
                    recommendations: analysis.recommendations || [],
                    executiveSummary: analysis.analysis?.executiveSummary || analysis.executiveSummary || '',
                    analysis: analysis,
                    rawAnalysis: JSON.parse(JSON.stringify(analysis))
                };
                
                // Add to beginning of array
                history.unshift(newEntry);
                
                // Keep only last 50 entries
                if (history.length > 50) {
                    history = history.slice(0, 50);
                }
                
                // Save back
                localStorage.setItem('scoreHistory', JSON.stringify(history));
                console.log('✅ Saved to score history');
            }
        } catch (error) {
            console.error('Error saving to score history:', error);
        }
    }
    
    // Default display function if original doesn't exist
    function displayAnalysisResultsDefault(analysis) {
        const analysisContent = document.getElementById('analysis-content');
        if (!analysisContent) return;
        
        const scoreColor = analysis.score >= 80 ? '#4CAF50' :
                          analysis.score >= 60 ? '#FF9800' : '#F44336';
        
        let html = \`
            <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 15px; padding: 30px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                    <h3 style="color: #FF5500; font-size: 24px;">Analysis Complete</h3>
                    <div style="text-align: right;">
                        <div style="font-size: 48px; font-weight: 800; color: \${scoreColor};" data-analysis-score="\${analysis.score}">
                            \${analysis.score}%
                        </div>
                        <div style="font-size: 14px; color: #999;">Overall Score</div>
                    </div>
                </div>
                
                \${analysis.executiveSummary || analysis.analysis?.executiveSummary ? \`
                <div style="background: rgba(0, 0, 0, 0.5); border-radius: 10px; padding: 20px;">
                    <h4 style="color: #FF5500; margin-bottom: 15px;">Executive Summary</h4>
                    <p style="color: #ccc; line-height: 1.8;">
                        \${analysis.executiveSummary || analysis.analysis?.executiveSummary}
                    </p>
                </div>
                \` : ''}
            </div>
        \`;
        
        analysisContent.innerHTML = html;
    }
    
    // Check for existing analysis on page load
    document.addEventListener('DOMContentLoaded', function() {
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        
        // Try to load any existing analysis
        let hasAnalysis = false;
        
        // Check all storage locations
        if (window.AnalysisStateManager && window.AnalysisStateManager.hasAnalysis && window.AnalysisStateManager.hasAnalysis()) {
            hasAnalysis = true;
            console.log('✅ Found analysis in AnalysisStateManager');
        } else if (window.persistedAnalysisData && window.persistedAnalysisData[subcomponentId]) {
            hasAnalysis = true;
            console.log('✅ Found analysis in window.persistedAnalysisData');
        } else if (localStorage.getItem(\`analysis_\${subcomponentId}\`)) {
            hasAnalysis = true;
            console.log('✅ Found analysis in localStorage');
        }
        
        if (hasAnalysis) {
            console.log('📊 Existing analysis found, will persist across tabs');
        }
    });
    
    console.log('✅ Enhanced Analysis Persistence System initialized');
})();
`;

// Write the enhanced persistence handler
const fs = require('fs');
const path = require('path');

const persistencePath = path.join(__dirname, 'ST6-CLEAN', 'enhanced-persistence-handler.js');
fs.writeFileSync(persistencePath, enhancedPersistenceCode);
console.log('✅ Created ST6-CLEAN/enhanced-persistence-handler.js');

// Now update the subcomponent-detail.html to include this handler
const subcomponentPath = path.join(__dirname, 'ST6-CLEAN', 'subcomponent-detail.html');
let htmlContent = fs.readFileSync(subcomponentPath, 'utf8');

// Check if the persistence handler is already included
if (!htmlContent.includes('enhanced-persistence-handler.js')) {
    // Find where scripts are loaded (around line 4922)
    const scriptLoadSection = htmlContent.indexOf("scripts.forEach(src => {");
    
    if (scriptLoadSection !== -1) {
        // Find the scripts array definition
        const scriptsArrayMatch = htmlContent.match(/const scripts = \[([\s\S]*?)\];/);
        
        if (scriptsArrayMatch) {
            // Add our persistence handler to the scripts array
            const updatedScripts = scriptsArrayMatch[0].replace(
                "const scripts = [",
                `const scripts = [
            'enhanced-persistence-handler.js',  // Enhanced persistence for analysis data`
            );
            
            htmlContent = htmlContent.replace(scriptsArrayMatch[0], updatedScripts);
            
            fs.writeFileSync(subcomponentPath, htmlContent);
            console.log('✅ Updated ST6-CLEAN/subcomponent-detail.html to include persistence handler');
        }
    }
} else {
    console.log('ℹ️ Persistence handler already included in subcomponent-detail.html');
}

// Also copy the latest problem-statement-handler.js to ST6-CLEAN
const latestHandlerPath = path.join(__dirname, 'ST62025-latest', 'problem-statement-handler.js');
const targetHandlerPath = path.join(__dirname, 'ST6-CLEAN', 'problem-statement-handler.js');

if (fs.existsSync(latestHandlerPath)) {
    const handlerContent = fs.readFileSync(latestHandlerPath, 'utf8');
    fs.writeFileSync(targetHandlerPath, handlerContent);
    console.log('✅ Updated ST6-CLEAN/problem-statement-handler.js with latest version');
}

console.log('\n✨ Complete Analysis Persistence Fix Applied!');
console.log('\n📝 What this fix does:');
console.log('1. Saves analysis data to 6 different storage locations for maximum persistence');
console.log('2. Automatically loads saved analysis when switching to Analysis tab');
console.log('3. Preserves analysis across page refreshes and tab switches');
console.log('4. Saves to score history for tracking progress over time');
console.log('5. Works with both Problem Statement and all other subcomponents');
console.log('\n🚀 Next steps:');
console.log('1. Refresh the page at http://localhost:3000/subcomponent-detail.html?id=1-1');
console.log('2. Fill in the worksheet and click "Analyze Results"');
console.log('3. Switch between tabs - the analysis will persist');
console.log('4. Check Score History tab to see saved analyses');
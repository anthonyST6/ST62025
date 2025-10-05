# ScaleOps6 Critical Code Implementations
**Purpose: Actual code for critical fixes and enhancements**

## Table of Contents
1. [Enhanced Persistence Handler](#enhanced-persistence-handler)
2. [Fix Analysis Display](#fix-analysis-display)
3. [Database Score Manager](#database-score-manager)
4. [API Score History](#api-score-history)
5. [Problem Statement Agent Enhanced](#problem-statement-agent-enhanced)
6. [Server Configuration](#server-configuration)
7. [Subcomponent Detail HTML Integration](#subcomponent-detail-html-integration)

---

## Enhanced Persistence Handler
**File: ST6-CLEAN/enhanced-persistence-handler.js**

```javascript
// Enhanced Persistence Handler for ScaleOps6
// This file provides comprehensive persistence for analysis data across multiple storage layers

(function() {
    console.log('🔄 Enhanced Persistence Handler Loading...');
    
    // Store original functions
    const originalDisplayAnalysisResults = window.displayAnalysisResults;
    const originalSwitchTab = window.switchTab;
    
    // Enhanced display function with persistence
    window.displayAnalysisResults = function(analysis, subcomponentId) {
        console.log('💾 Enhanced displayAnalysisResults called', { analysis, subcomponentId });
        
        if (!analysis || !subcomponentId) {
            console.error('Missing analysis data or subcomponent ID');
            return;
        }
        
        // Save to multiple storage locations for redundancy
        const analysisData = {
            ...analysis,
            timestamp: new Date().toISOString(),
            subcomponentId: subcomponentId
        };
        
        // 1. Save to AnalysisStateManager if available
        if (window.AnalysisStateManager && typeof window.AnalysisStateManager.saveAnalysis === 'function') {
            window.AnalysisStateManager.saveAnalysis(subcomponentId, analysisData);
            console.log('✅ Saved to AnalysisStateManager');
        }
        
        // 2. Save to DataManager if available
        if (window.DataManager && typeof window.DataManager.saveAnalysisResults === 'function') {
            window.DataManager.saveAnalysisResults(subcomponentId, analysisData);
            console.log('✅ Saved to DataManager');
        }
        
        // 3. Save to localStorage
        try {
            localStorage.setItem(`analysis_${subcomponentId}`, JSON.stringify(analysisData));
            localStorage.setItem(`analysis_timestamp_${subcomponentId}`, new Date().toISOString());
            console.log('✅ Saved to localStorage');
        } catch (e) {
            console.error('Failed to save to localStorage:', e);
        }
        
        // 4. Save to sessionStorage
        try {
            sessionStorage.setItem(`current_analysis_${subcomponentId}`, JSON.stringify(analysisData));
            console.log('✅ Saved to sessionStorage');
        } catch (e) {
            console.error('Failed to save to sessionStorage:', e);
        }
        
        // 5. Save to window object for immediate access
        window.persistedAnalysisData = analysisData;
        
        // 6. Save score to score history
        if (analysis.score !== undefined) {
            const scoreHistory = JSON.parse(localStorage.getItem(`score_history_${subcomponentId}`) || '[]');
            scoreHistory.push({
                score: analysis.score,
                timestamp: new Date().toISOString(),
                summary: analysis.executiveSummary || ''
            });
            // Keep only last 10 scores
            if (scoreHistory.length > 10) {
                scoreHistory.shift();
            }
            localStorage.setItem(`score_history_${subcomponentId}`, JSON.stringify(scoreHistory));
            console.log('✅ Added to score history');
        }
        
        // Now display the results
        const resultsContainer = document.getElementById('analysis-results');
        if (!resultsContainer) {
            console.error('Analysis results container not found');
            return;
        }
        
        // Format and display the analysis
        let html = '<div class="analysis-content">';
        
        // Overall Score
        if (analysis.score !== undefined) {
            const scoreClass = analysis.score >= 70 ? 'high' : analysis.score >= 50 ? 'medium' : 'low';
            html += `
                <div class="score-display ${scoreClass}">
                    <h2>Overall Score: ${analysis.score}%</h2>
                </div>
            `;
        }
        
        // Executive Summary
        if (analysis.executiveSummary) {
            html += `
                <div class="executive-summary">
                    <h3>Executive Summary</h3>
                    <p>${analysis.executiveSummary}</p>
                </div>
            `;
        }
        
        // Detailed Scores
        if (analysis.detailedScores) {
            html += '<div class="detailed-scores"><h3>Evaluation Dimensions</h3>';
            
            const dimensions = [
                { key: 'problemClarity', label: 'Problem Clarity' },
                { key: 'marketUnderstanding', label: 'Market Understanding' },
                { key: 'customerEmpathy', label: 'Customer Empathy' },
                { key: 'valueQuantification', label: 'Value Quantification' },
                { key: 'solutionDifferentiation', label: 'Solution Differentiation' }
            ];
            
            dimensions.forEach(dim => {
                const dimData = analysis.detailedScores[dim.key];
                if (dimData) {
                    const percentage = dimData.percentage || Math.round((dimData.score / dimData.maxScore) * 100);
                    const barClass = percentage >= 70 ? 'high' : percentage >= 50 ? 'medium' : 'low';
                    
                    html += `
                        <div class="dimension-score">
                            <h4>${dim.label} (${dimData.weight}% weight)</h4>
                            <div class="score-bar-container">
                                <div class="score-bar ${barClass}" style="width: ${percentage}%"></div>
                                <span class="score-text">${dimData.score}/${dimData.maxScore} (${percentage}%)</span>
                            </div>
                            <div class="feedback">${formatFeedback(dimData.feedback)}</div>
                        </div>
                    `;
                }
            });
            
            html += '</div>';
        }
        
        // Recommendations
        if (analysis.recommendations && analysis.recommendations.length > 0) {
            html += '<div class="recommendations"><h3>Strategic Recommendations</h3>';
            analysis.recommendations.forEach(rec => {
                const priorityClass = rec.priority === 'CRITICAL' ? 'critical' : 
                                     rec.priority === 'HIGH' ? 'high' : 'medium';
                html += `
                    <div class="recommendation ${priorityClass}">
                        <span class="priority-badge">${rec.priority}</span>
                        <strong>${rec.action}</strong>
                        ${rec.impact ? `<p>Impact: ${rec.impact}</p>` : ''}
                        ${rec.implementation ? `<p>How: ${rec.implementation}</p>` : ''}
                    </div>
                `;
            });
            html += '</div>';
        }
        
        // Implementation Plan
        if (analysis.implementationPlan) {
            html += '<div class="implementation-plan"><h3>Implementation Roadmap</h3>';
            
            if (analysis.implementationPlan.immediate) {
                html += '<div class="plan-phase"><h4>Immediate Actions (This Week)</h4><ul>';
                analysis.implementationPlan.immediate.forEach(action => {
                    html += `<li>${action}</li>`;
                });
                html += '</ul></div>';
            }
            
            if (analysis.implementationPlan.shortTerm) {
                html += '<div class="plan-phase"><h4>Short Term (Next 30 Days)</h4><ul>';
                analysis.implementationPlan.shortTerm.forEach(action => {
                    html += `<li>${action}</li>`;
                });
                html += '</ul></div>';
            }
            
            if (analysis.implementationPlan.longTerm) {
                html += '<div class="plan-phase"><h4>Long Term (3-6 Months)</h4><ul>';
                analysis.implementationPlan.longTerm.forEach(action => {
                    html += `<li>${action}</li>`;
                });
                html += '</ul></div>';
            }
            
            html += '</div>';
        }
        
        html += '</div>';
        
        resultsContainer.innerHTML = html;
        console.log('✅ Analysis displayed successfully');
    };
    
    // Helper function to format feedback
    function formatFeedback(feedback) {
        if (!feedback) return '';
        
        return feedback
            .split('\n')
            .map(line => {
                if (line.includes('✓')) {
                    return `<span class="feedback-positive">${line}</span>`;
                } else if (line.includes('✗')) {
                    return `<span class="feedback-negative">${line}</span>`;
                } else {
                    return line;
                }
            })
            .join('<br>');
    }
    
    // Enhanced tab switching with persistence loading
    window.switchTab = function(tabName) {
        console.log('🔄 Enhanced switchTab called:', tabName);
        
        // Call original if it exists
        if (originalSwitchTab && typeof originalSwitchTab === 'function') {
            originalSwitchTab(tabName);
        } else {
            // Basic tab switching if original doesn't exist
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            const targetContent = document.getElementById(`${tabName}-content`);
            const targetBtn = document.querySelector(`[data-tab="${tabName}"]`);
            
            if (targetContent) targetContent.classList.add('active');
            if (targetBtn) targetBtn.classList.add('active');
        }
        
        // Load persisted analysis when switching to analysis tab
        if (tabName === 'analysis') {
            const urlParams = new URLSearchParams(window.location.search);
            const subcomponentId = urlParams.get('id');
            
            if (subcomponentId) {
                loadPersistedAnalysis(subcomponentId);
            }
        }
    };
    
    // Function to load persisted analysis
    function loadPersistedAnalysis(subcomponentId) {
        console.log('📂 Loading persisted analysis for:', subcomponentId);
        
        let analysisData = null;
        
        // Try to load from various sources in order of preference
        
        // 1. Check window.persistedAnalysisData
        if (window.persistedAnalysisData && window.persistedAnalysisData.subcomponentId === subcomponentId) {
            analysisData = window.persistedAnalysisData;
            console.log('✅ Loaded from window.persistedAnalysisData');
        }
        
        // 2. Check AnalysisStateManager
        if (!analysisData && window.AnalysisStateManager && typeof window.AnalysisStateManager.getAnalysis === 'function') {
            analysisData = window.AnalysisStateManager.getAnalysis(subcomponentId);
            if (analysisData) console.log('✅ Loaded from AnalysisStateManager');
        }
        
        // 3. Check DataManager
        if (!analysisData && window.DataManager && typeof window.DataManager.getAnalysisResults === 'function') {
            analysisData = window.DataManager.getAnalysisResults(subcomponentId);
            if (analysisData) console.log('✅ Loaded from DataManager');
        }
        
        // 4. Check sessionStorage
        if (!analysisData) {
            const sessionData = sessionStorage.getItem(`current_analysis_${subcomponentId}`);
            if (sessionData) {
                try {
                    analysisData = JSON.parse(sessionData);
                    console.log('✅ Loaded from sessionStorage');
                } catch (e) {
                    console.error('Failed to parse sessionStorage data:', e);
                }
            }
        }
        
        // 5. Check localStorage
        if (!analysisData) {
            const localData = localStorage.getItem(`analysis_${subcomponentId}`);
            if (localData) {
                try {
                    analysisData = JSON.parse(localData);
                    console.log('✅ Loaded from localStorage');
                } catch (e) {
                    console.error('Failed to parse localStorage data:', e);
                }
            }
        }
        
        // Display the loaded analysis
        if (analysisData) {
            console.log('📊 Displaying persisted analysis');
            window.displayAnalysisResults(analysisData, subcomponentId);
        } else {
            console.log('ℹ️ No persisted analysis found for', subcomponentId);
            
            // Show empty state
            const resultsContainer = document.getElementById('analysis-results');
            if (resultsContainer && !resultsContainer.innerHTML.trim()) {
                resultsContainer.innerHTML = `
                    <div class="no-analysis">
                        <div class="empty-state-icon">📊</div>
                        <h3>No Analysis Yet</h3>
                        <p>Complete the worksheet and click "Analyze Results"</p>
                    </div>
                `;
            }
        }
    }
    
    // Make loadPersistedAnalysis globally available
    window.loadPersistedAnalysis = loadPersistedAnalysis;
    
    // Override analyzeWorksheet if it exists
    if (window.analyzeWorksheet) {
        const originalAnalyzeWorksheet = window.analyzeWorksheet;
        window.analyzeWorksheet = async function() {
            console.log('🔄 Enhanced analyzeWorksheet called');
            
            try {
                // Call original
                await originalAnalyzeWorksheet();
                
                // After analysis, ensure it's persisted
                const urlParams = new URLSearchParams(window.location.search);
                const subcomponentId = urlParams.get('id');
                
                if (subcomponentId && window.persistedAnalysisData) {
                    // Additional save to ensure persistence
                    localStorage.setItem(`last_analysis_${subcomponentId}`, JSON.stringify(window.persistedAnalysisData));
                    console.log('✅ Post-analysis persistence check complete');
                }
            } catch (error) {
                console.error('Error in enhanced analyzeWorksheet:', error);
                throw error;
            }
        };
    }
    
    // Auto-load analysis on page load if on analysis tab
    document.addEventListener('DOMContentLoaded', function() {
        const activeTab = document.querySelector('.tab-btn.active');
        if (activeTab && activeTab.dataset.tab === 'analysis') {
            const urlParams = new URLSearchParams(window.location.search);
            const subcomponentId = urlParams.get('id');
            if (subcomponentId) {
                setTimeout(() => loadPersistedAnalysis(subcomponentId), 500);
            }
        }
    });
    
    console.log('✅ Enhanced Persistence Handler Loaded Successfully');
})();
```

---

## Fix Analysis Display
**File: ST6-CLEAN/fix-analysis-display.js**

```javascript
// Fix for Analysis Display Issues
console.log('🔧 Loading Analysis Display Fix...');

// Override the displayAnalysisResults function with a working version
window.displayAnalysisResults = function(analysis, subcomponentId) {
    console.log('📊 Displaying analysis results:', analysis);
    
    const resultsContainer = document.getElementById('analysis-results');
    if (!resultsContainer) {
        console.error('Analysis results container not found');
        return;
    }
    
    if (!analysis) {
        resultsContainer.innerHTML = '<p>No analysis data available</p>';
        return;
    }
    
    let html = '<div class="analysis-content">';
    
    // Overall Score with color coding
    if (analysis.score !== undefined) {
        const scoreClass = analysis.score >= 70 ? 'high' : analysis.score >= 50 ? 'medium' : 'low';
        html += `
            <div class="score-display ${scoreClass}">
                <div class="score-circle">
                    <span class="score-number">${analysis.score}%</span>
                </div>
                <h2>Overall Score</h2>
            </div>
        `;
    }
    
    // Executive Summary
    if (analysis.executiveSummary) {
        html += `
            <div class="section executive-summary">
                <h3>📋 Executive Summary</h3>
                <p>${analysis.executiveSummary}</p>
            </div>
        `;
    }
    
    // Detailed Scores for 5 Evaluation Dimensions
    if (analysis.detailedScores) {
        html += '<div class="section detailed-scores">';
        html += '<h3>📊 Evaluation Dimensions</h3>';
        
        const dimensions = [
            { key: 'problemClarity', label: 'Problem Clarity', icon: '🎯' },
            { key: 'marketUnderstanding', label: 'Market Understanding', icon: '📈' },
            { key: 'customerEmpathy', label: 'Customer Empathy', icon: '👥' },
            { key: 'valueQuantification', label: 'Value Quantification', icon: '💰' },
            { key: 'solutionDifferentiation', label: 'Solution Differentiation', icon: '⭐' }
        ];
        
        dimensions.forEach(dim => {
            const dimData = analysis.detailedScores[dim.key];
            if (dimData) {
                const percentage = dimData.percentage || Math.round((dimData.score / dimData.maxScore) * 100);
                const barClass = percentage >= 70 ? 'high' : percentage >= 50 ? 'medium' : 'low';
                
                html += `
                    <div class="dimension-item">
                        <div class="dimension-header">
                            <span class="dimension-icon">${dim.icon}</span>
                            <span class="dimension-label">${dim.label}</span>
                            <span class="dimension-weight">(${dimData.weight}% weight)</span>
                        </div>
                        <div class="score-bar-container">
                            <div class="score-bar ${barClass}" style="width: ${percentage}%">
                                <span class="score-text">${dimData.score}/${dimData.maxScore}</span>
                            </div>
                            <span class="percentage">${percentage}%</span>
                        </div>
                        <div class="feedback-text">${formatFeedback(dimData.feedback)}</div>
                    </div>
                `;
            }
        });
        
        html += '</div>';
    }
    
    // Strategic Recommendations
    if (analysis.recommendations && analysis.recommendations.length > 0) {
        html += '<div class="section recommendations">';
        html += '<h3>🎯 Strategic Recommendations</h3>';
        
        analysis.recommendations.forEach((rec, index) => {
            const priorityClass = rec.priority === 'CRITICAL' ? 'critical' : 
                                 rec.priority === 'HIGH' ? 'high' : 'medium';
            const priorityIcon = rec.priority === 'CRITICAL' ? '🔴' : 
                                rec.priority === 'HIGH' ? '🟡' : '🟢';
            
            html += `
                <div class="recommendation-item ${priorityClass}">
                    <div class="rec-header">
                        <span class="priority-icon">${priorityIcon}</span>
                        <span class="priority-badge">${rec.priority} PRIORITY</span>
                    </div>
                    <div class="rec-content">
                        <strong>${index + 1}. ${rec.action}</strong>
                        ${rec.impact ? `<p class="impact">💡 Impact: ${rec.impact}</p>` : ''}
                        ${rec.implementation ? `<p class="implementation">🔧 How: ${rec.implementation}</p>` : ''}
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
    }
    
    // Implementation Plan
    if (analysis.implementationPlan) {
        html += '<div class="section implementation-plan">';
        html += '<h3>📅 Implementation Roadmap</h3>';
        
        if (analysis.implementationPlan.immediate && analysis.implementationPlan.immediate.length > 0) {
            html += '<div class="plan-phase immediate">';
            html += '<h4>🚀 Immediate Actions (This Week)</h4>';
            html += '<ul>';
            analysis.implementationPlan.immediate.forEach(action => {
                html += `<li>${action}</li>`;
            });
            html += '</ul></div>';
        }
        
        if (analysis.implementationPlan.shortTerm && analysis.implementationPlan.shortTerm.length > 0) {
            html += '<div class="plan-phase short-term">';
            html += '<h4>📆 Short Term (Next 30 Days)</h4>';
            html += '<ul>';
            analysis.implementationPlan.shortTerm.forEach(action => {
                html += `<li>${action}</li>`;
            });
            html += '</ul></div>';
        }
        
        if (analysis.implementationPlan.longTerm && analysis.implementationPlan.longTerm.length > 0) {
            html += '<div class="plan-phase long-term">';
            html += '<h4>🎯 Long Term (3-6 Months)</h4>';
            html += '<ul>';
            analysis.implementationPlan.longTerm.forEach(action => {
                html += `<li>${action}</li>`;
            });
            html += '</ul></div>';
        }
        
        html += '</div>';
    }
    
    html += '</div>';
    
    resultsContainer.innerHTML = html;
    
    // Save to localStorage for persistence
    localStorage.setItem(`analysis_${subcomponentId}`, JSON.stringify(analysis));
    
    console.log('✅ Analysis displayed successfully');
};

// Helper function to format feedback with colored checkmarks
function formatFeedback(feedback) {
    if (!feedback) return '';
    
    return feedback
        .split('\n')
        .filter(line => line.trim())
        .map(line => {
            if (line.includes('✓')) {
                return `<div class="feedback-line positive">
                    <span class="check">✓</span> ${line.replace('✓', '').trim()}
                </div>`;
            } else if (line.includes('✗')) {
                return `<div class="feedback-line negative">
                    <span class="cross">✗</span> ${line.replace('✗', '').trim()}
                </div>`;
            } else {
                return `<div class="feedback-line">${line}</div>`;
            }
        })
        .join('');
}

// Fix the analyzeWorksheet function to properly handle the response
if (window.analyzeWorksheet) {
    const originalAnalyze = window.analyzeWorksheet;
    window.analyzeWorksheet = async function() {
        console.log('🔄 Enhanced analyzeWorksheet triggered');
        
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const subcomponentId = urlParams.get('id');
            
            if (!subcomponentId) {
                alert('No subcomponent ID found');
                return;
            }
            
            // Collect worksheet data
            const worksheetData = {};
            document.querySelectorAll('#worksheet-form input, #worksheet-form textarea').forEach(field => {
                if (field.name) {
                    worksheetData[field.name] = field.value;
                }
            });
            
            console.log('📤 Sending analysis request for:', subcomponentId);
            
            // Call the API
            const response = await fetch('/api/analyze/problem-statement', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    worksheetData: worksheetData,
                    subcomponentId: subcomponentId
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            console.log('📥 Received analysis result:', result);
            
            // Display the results
            if (result.analysis) {
                window.displayAnalysisResults(result.analysis, subcomponentId);
                
                // Switch to analysis tab
                window.switchTab('analysis');
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'success-message';
                successMsg.textContent = '✅ Analysis completed successfully!';
                successMsg.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #4caf50; color: white; padding: 15px; border-radius: 5px; z-index: 10000;';
                document.body.appendChild(successMsg);
                setTimeout(() => successMsg.remove(), 3000);
            }
            
        } catch (error) {
            console.error('❌ Error during analysis:', error);
            alert('Error analyzing worksheet: ' + error.message);
        }
    };
}

console.log('✅ Analysis Display Fix Loaded');
```

---

## Integration in subcomponent-detail.html
**Location: Around line 4925 in the scripts array**

```javascript
// In the loadScripts function, these files should be in the array:
const scripts = [
    'database.js',
    'educational-content.js',
    'missing-content-additions.js',
    'database-score-manager.js',
    'api-score-history.js',
    'enhanced-persistence-handler.js',  // Add this
    'fix-analysis-display.js',          // Add this
    'problem-statement-handler.js',
    // ... other agent files
];
```

---

## CSS Styles for Analysis Display
**Add to subcomponent-detail.html or separate CSS file**

```css
/* Analysis Display Styles */
.analysis-content {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.score-display {
    text-align: center;
    padding: 30px;
    margin-bottom: 30px;
    border-radius: 10px;
    background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
}

.score-display.high {
    border: 2px solid #4caf50;
}

.score-display.medium {
    border: 2px solid #ff9800;
}

.score-display.low {
    border: 2px solid #f44336;
}

.score-circle {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 15px;
    background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%);
}

.section {
    background: #1a1a1a;
    border-radius: 10px;
    padding: 25px;
    margin-bottom: 25px;
    border: 1px solid #333;
}

.section h3 {
    color: #ff6b35;
    margin-bottom: 20px;
    font-size: 1.4em;
}

.dimension-item {
    margin-bottom: 25px;
    padding: 15px;
    background: #0a0a0a;
    border-radius: 8px;
}

.dimension-header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.dimension-icon {
    font-size: 1.5em;
    margin-right: 10px;
}

.dimension-label {
    flex: 1;
    font-weight: bold;
    color: #e0e0e0;
}

.dimension-weight {
    color: #888;
    font-size: 0.9em;
}

.score-bar-container {
    position: relative;
    height: 30px;
    background: #2a2a2a;
    border-radius: 15px;
    overflow: hidden;
    margin-bottom: 10px;
}

.score-bar {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: width 0.5s ease;
    border-radius: 15px;
}

.score-bar.high {
    background: linear-gradient(90deg, #4caf50, #66bb6a);
}

.score-bar.medium {
    background: linear-gradient(90deg, #ff9800, #ffb74d);
}

.score-bar.low {
    background: linear-gradient(90deg, #f44336, #ef5350);
}

.score-text {
    color: white;
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

.percentage {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #e0e0e0;
    font-weight: bold;
}

.feedback-line {
    padding: 5px 0;
    color: #b0b0b0;
}

.feedback-line.positive {
    color: #4caf50;
}

.feedback-line.negative {
    color: #ff9800;
}

.feedback-line .check {
    color: #4caf50;
    font-weight: bold;
    margin-right: 5px;
}

.feedback-line .cross {
    color: #ff9800;
    font-weight: bold;
    margin-right: 5px;
}

.recommendation-item {
    background: #0a0a0a;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 15px;
    border-left: 4px solid;
}

.recommendation-item.critical {
    border-left-color: #f44336;
}

.recommendation-item.high {
    border-left-color: #ff9800;
}

.recommendation-item.medium {
    border-left-color: #4caf50;
}

.rec-header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.priority-icon {
    font-size: 1.2em;
    margin-right: 10px;
}

.priority-badge {
    background: #2a2a2a;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 0.85em;
    font-weight: bold;
}

.rec-content strong {
    display: block;
    margin-bottom: 10px;
    color: #e0e0e0;
    font-size: 1.1em;
}

.impact, .implementation {
    margin: 8px 0;
    padding-left: 20px;
    color: #b0b0b0;
}

.plan-phase {
    background: #0a0a0a;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
}

.plan-phase h4 {
    color: #ff6b35;
    margin-bottom: 15px;
}

.plan-phase ul {
    list-style: none;
    padding: 0;
}

.plan-phase li {
    padding: 8px 0;
    padding-left: 25px;
    position: relative;
    color: #e0e0e0;
}

.plan-phase li:before {
    content: "▸";
    position: absolute;
    left: 0;
    color: #ff6b35;
}

.no-analysis {
    text-align: center;
    padding: 60px 20px;
    color: #888;
}

.empty-state-icon {
    font-size: 4em;
    margin-bottom: 20px;
    opacity: 0.5;
}

.success-message {
    animation: slideIn 0.3s ease;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
```

---

## Testing Commands

### Start the Application
```bash
cd ST6-CLEAN
npm start
```

### Browser Console Tests
```javascript
// Test persistence layers
console.log('LocalStorage Analysis:', localStorage.getItem('analysis_1-1'));
console.log('SessionStorage Analysis:', sessionStorage.getItem('current_analysis_1-1'));
console.log('Window Persisted Data:', window.persistedAnalysisData);

// Test score history
console.log('Score History:', JSON.parse(localStorage.getItem('score_history_1-1') || '[]'));

// Force reload analysis
if (window.loadPersistedAnalysis) {
    window.loadPersistedAnalysis('1-1');
}

// Check all storage for a subcomponent
function checkAllStorage(subcomponentId) {
    console.log(`=== Storage Check for ${subcomponentId} ===`);
    console.log('LocalStorage:', {
        analysis: localStorage.getItem(`analysis_${subcomponentId}`),
        worksheet: localStorage.getItem(`worksheet_${subcomponentId}`),
        scoreHistory: localStorage.getItem(`score_history_${subcomponentId}`)
    });
    console.log('SessionStorage:', {
        currentAnalysis: sessionStorage.getItem(`current_analysis_${subcomponentId}`),
        currentWorksheet: sessionStorage.getItem(`current_worksheet_${subcomponentId}`)
    });
    console.log('Window Objects:', {
        persistedAnalysis: window.persistedAnalysisData,
        AnalysisStateManager: window.AnalysisStateManager,
        DataManager: window.DataManager
    });
}

// Run check
checkAllStorage('1-1');
```

---

## Recovery Script
If you need to quickly restore functionality:

```javascript
// recovery-script.js
// Run this in the browser console if things break

(function recoverAnalysisSystem() {
    console.log('🔧 Running recovery script...');
    
    // Restore display function
    if (!window.displayAnalysisResults || typeof window.displayAnalysisResults !== 'function') {
        window.displayAnalysisResults = function(analysis, subcomponentId) {
            const container = document.getElementById('analysis-results');
            if (!container) return;
            
            container.innerHTML = `
                <div class="analysis-content">
                    <h2>Score: ${analysis.score || 0}%</h2>
                    <p>${analysis.executiveSummary || 'No summary available'}</p>
                    <pre>${JSON.stringify(analysis, null, 2)}</pre>
                </div>
            `;
            
            // Save to localStorage
            localStorage.setItem(`analysis_${subcomponentId}`, JSON.stringify(analysis));
        };
    }
    
    // Restore analyze function
    if (!window.analyzeWorksheet || typeof window.analyzeWorksheet !== 'function') {
        window.analyzeWorksheet = async function() {
            const urlParams = new URLSearchParams(window.location.search);
            const subcomponentId = urlParams.get('id');
            
            const worksheetData = {};
            document.querySelectorAll('#worksheet-form input, #worksheet-form textarea').forEach(field => {
                if (field.name) worksheetData[field.name] = field.value;
            });
            
            try {
                const response = await fetch('/api/analyze/problem-statement', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ worksheetData, subcomponentId })
                });
                
                const result = await response.json();
                if (result.analysis) {
                    window.displayAnalysisResults(result.analysis, subcomponentId);
                    window.switchTab('analysis');
                }
            } catch (error) {
                console.error('Analysis error:', error);
                alert('Analysis failed: ' + error.message);
            }
        };
    }
    
    console.log('✅ Recovery complete');
})();
```

---

**END OF CRITICAL CODE IMPLEMENTATIONS**
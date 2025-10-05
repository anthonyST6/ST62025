
/**
 * Dimension Display Handler
 * Manages the display of dimension-based content across all tabs
 */

(function() {
    console.log('📊 Dimension Display Handler loaded');
    
    // Handle dimension-specific display updates
    window.updateDimensionDisplay = function(agentId, dimensionData) {
        console.log('Updating display for agent:', agentId);
        
        // Update workspace tab
        updateWorkspaceDimensions(dimensionData);
        
        // Update analysis tab
        updateAnalysisDimensions(dimensionData);
        
        // Update score history
        updateScoreHistoryDimensions(dimensionData);
    };
    
    function updateWorkspaceDimensions(dimensionData) {
        // Update workspace fields with dimension names
        dimensionData.forEach((dimension, index) => {
            const label = document.querySelector(`label[for="dimension-${index + 1}"]`);
            if (label) {
                label.innerHTML = `
                    <span class="dimension-number">${index + 1}</span>
                    <span class="dimension-name">${dimension.name}</span>
                    <span class="dimension-weight">(${dimension.weight}% weight)</span>
                `;
            }
        });
    }
    
    function updateAnalysisDimensions(dimensionData) {
        // Update analysis display with dimension scores
        const analysisContainer = document.getElementById('analysis-content');
        if (analysisContainer && window.lastAnalysis) {
            // Re-render with dimension names
            window.displayEnhancedAnalysisResults(window.lastAnalysis);
        }
    }
    
    function updateScoreHistoryDimensions(dimensionData) {
        // Update score history with dimension breakdowns
        const historyContainer = document.getElementById('score-history-content');
        if (historyContainer) {
            const history = JSON.parse(localStorage.getItem('scoreHistory') || '[]');
            // Filter and display with dimension names
            renderScoreHistory(history, dimensionData);
        }
    }
    
    function renderScoreHistory(history, dimensionData) {
        // Render score history with dimension breakdowns
        const html = history.map(entry => `
            <div class="history-item">
                <div class="history-header">
                    <span class="history-date">${new Date(entry.timestamp).toLocaleDateString()}</span>
                    <span class="history-score">${entry.score}%</span>
                </div>
                <div class="dimension-breakdown">
                    ${entry.dimensionScores ? entry.dimensionScores.map(d => `
                        <div class="dimension-score-item">
                            <span>${d.name}</span>
                            <span>${d.score}%</span>
                        </div>
                    `).join('') : ''}
                </div>
            </div>
        `).join('');
        
        const container = document.getElementById('score-history-content');
        if (container) {
            container.innerHTML = html;
        }
    }
    
    console.log('✅ Dimension Display Handler ready');
})();

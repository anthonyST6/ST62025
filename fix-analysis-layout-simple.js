// Simple fix for analysis layout with side-by-side strengths/weaknesses
(function() {
    console.log('🔧 Applying simple analysis layout fix');
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
    function initialize() {
        // Override the displayUnifiedAnalysisResults function
        if (window.displayUnifiedAnalysisResults) {
            const originalDisplay = window.displayUnifiedAnalysisResults;
            
            window.displayUnifiedAnalysisResults = function(analysis, worksheetType) {
                console.log('📊 Intercepting displayUnifiedAnalysisResults');
                
                // Call original first
                originalDisplay(analysis, worksheetType);
                
                // Then fix the layout
                setTimeout(() => {
                    fixAnalysisLayout();
                }, 100);
            };
        }
        
        // Also override displayAnalysisResults
        if (window.displayAnalysisResults) {
            const originalDisplayResults = window.displayAnalysisResults;
            
            window.displayAnalysisResults = function(analysis) {
                console.log('📊 Intercepting displayAnalysisResults');
                
                // Call original first
                originalDisplayResults(analysis);
                
                // Then fix the layout
                setTimeout(() => {
                    fixAnalysisLayout();
                }, 100);
            };
        }
    }
    
    function fixAnalysisLayout() {
        console.log('🔧 Fixing analysis layout to side-by-side');
        
        const analysisContent = document.getElementById('analysis-content');
        if (!analysisContent) return;
        
        // Find all feedback divs that contain strengths and improvements
        const feedbackDivs = analysisContent.querySelectorAll('div');
        
        feedbackDivs.forEach(div => {
            const text = div.innerText || '';
            
            // Check if this div contains both strengths and improvements
            if (text.includes('✓') && text.includes('✗')) {
                // Extract strengths and weaknesses
                const lines = div.innerHTML.split('<br>').length > 1 ? 
                              div.innerHTML.split('<br>') : 
                              div.innerHTML.split('\n');
                
                const strengths = [];
                const weaknesses = [];
                
                lines.forEach(line => {
                    if (line.includes('✓')) {
                        strengths.push(line);
                    } else if (line.includes('✗')) {
                        weaknesses.push(line);
                    }
                });
                
                // If we found both, create side-by-side layout
                if (strengths.length > 0 || weaknesses.length > 0) {
                    div.innerHTML = `
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div>
                                ${strengths.join('<br>')}
                            </div>
                            <div>
                                ${weaknesses.join('<br>')}
                            </div>
                        </div>
                    `;
                }
            }
        });
        
        console.log('✅ Layout fix applied');
    }
    
    // Also listen for tab switches
    document.addEventListener('click', function(e) {
        if (e.target && e.target.getAttribute('data-tab') === 'analysis') {
            setTimeout(() => {
                fixAnalysisLayout();
            }, 500);
        }
    });
    
    console.log('✅ Simple analysis layout fix loaded');
})();
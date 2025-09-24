const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing Analysis Tab Display Issue...\n');

// Fix the enhanced display handler to ensure it's properly integrated
const enhancedDisplayHandler = `
// Enhanced Display Handler for Analysis Tab
(function() {
    console.log('🎨 Enhanced Display Handler Loaded');
    
    // Store original displayAnalysisResults function if it exists
    const originalDisplayAnalysisResults = window.displayAnalysisResults;
    
    // Enhanced display function that ensures recommendations are shown properly
    window.displayAnalysisResults = function(analysis) {
        console.log('📊 Enhanced displayAnalysisResults called with:', analysis);
        
        const analysisContent = document.getElementById('analysis-content');
        if (!analysisContent) {
            console.error('❌ Analysis content div not found!');
            return;
        }
        
        // If no analysis provided, show no analysis message
        if (!analysis) {
            analysisContent.innerHTML = \`
                <div style="text-align: center; padding: 60px 20px; color: #999;">
                    <div style="font-size: 48px; margin-bottom: 20px;">📊</div>
                    <h3 style="font-size: 24px; margin-bottom: 10px; color: #fff;">No Analysis Yet</h3>
                    <p style="font-size: 16px; margin-bottom: 30px;">Complete the interactive worksheet and click "Analyze Results" to get AI-powered feedback</p>
                    <button class="btn-primary" onclick="switchTab('workspace', null); document.querySelector('[data-tab=workspace]').click();">
                        Go to Workspace
                    </button>
                </div>
            \`;
            return;
        }
        
        // Ensure we have recommendations in the proper format
        if (analysis.recommendations && Array.isArray(analysis.recommendations)) {
            // Process each recommendation to ensure it has the "+X points" format
            analysis.recommendations = analysis.recommendations.map(rec => {
                // Ensure expectedImprovement is in "+X points" format
                if (!rec.expectedImprovement || !rec.expectedImprovement.includes('points')) {
                    const points = rec.impact ? parseInt(rec.impact.toString().match(/\\d+/)?.[0] || '5') : 5;
                    rec.expectedImprovement = \`+\${points} points\`;
                }
                
                // Ensure priority is set
                if (!rec.priority) {
                    rec.priority = 'MEDIUM';
                }
                
                // Ensure action/area is set
                if (!rec.action && !rec.area) {
                    rec.action = 'Improvement Opportunity';
                }
                
                return rec;
            });
        }
        
        // Call the original display function if it exists, otherwise use our enhanced version
        if (originalDisplayAnalysisResults && typeof originalDisplayAnalysisResults === 'function') {
            originalDisplayAnalysisResults(analysis);
        } else {
            // Use our enhanced display
            displayEnhancedAnalysis(analysis);
        }
    };
    
    // Enhanced analysis display function
    function displayEnhancedAnalysis(analysis) {
        const analysisContent = document.getElementById('analysis-content');
        if (!analysisContent) return;
        
        const scoreColor = analysis.score >= 80 ? '#4CAF50' :
                          analysis.score >= 60 ? '#FF9800' : '#F44336';
        
        let html = \`
            <div style="background: rgba(255, 255, 255, 0.02); border-radius: 15px; padding: 30px; margin-bottom: 30px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                    <div>
                        <h3 style="font-size: 28px; margin-bottom: 10px;">Overall Score</h3>
                        <p style="color: #999;">Based on GTM best practices</p>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 72px; font-weight: 800; color: \${scoreColor};">\${analysis.score}%</div>
                    </div>
                </div>
            </div>
        \`;
        
        // Add recommendations section
        if (analysis.recommendations && analysis.recommendations.length > 0) {
            html += \`
                <div style="margin-top: 40px; padding: 30px; background: rgba(255, 255, 255, 0.02); border-radius: 15px; border: 1px solid rgba(255, 255, 255, 0.1);">
                    <h2 style="color: #FF5500; font-size: 28px; margin-bottom: 30px;">
                        📊 Strategic Recommendations
                    </h2>
                    <div style="display: flex; flex-direction: column; gap: 20px;">
            \`;
            
            analysis.recommendations.forEach((rec, index) => {
                const priorityColor = rec.priority === 'CRITICAL' ? '#8B0000' :
                                    rec.priority === 'HIGH' ? '#F44336' : '#FF9800';
                
                html += \`
                    <div class="recommendation-card" style="
                        background: rgba(0, 0, 0, 0.5);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: 12px;
                        padding: 20px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    " onmouseover="this.style.borderColor='#FF5500'; this.style.transform='translateX(5px)'"
                       onmouseout="this.style.borderColor='rgba(255, 255, 255, 0.1)'; this.style.transform='translateX(0)'">
                        
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                            <h3 style="color: #fff; font-size: 18px; font-weight: 600; margin: 0;">
                                \${rec.action || rec.area || 'Improvement Opportunity'}
                            </h3>
                            <span style="
                                background: \${priorityColor};
                                color: #fff;
                                padding: 4px 12px;
                                border-radius: 20px;
                                font-size: 11px;
                                font-weight: 700;
                                text-transform: uppercase;
                            ">\${rec.priority || 'MEDIUM'}</span>
                        </div>
                        
                        <div style="display: flex; gap: 20px; align-items: center;">
                            <div style="color: #4CAF50; font-size: 18px; font-weight: 600;">
                                \${rec.expectedImprovement || '+5 points'}
                            </div>
                        </div>
                    </div>
                \`;
            });
            
            html += \`
                    </div>
                </div>
            \`;
        }
        
        analysisContent.innerHTML = html;
    }
    
    // Fix tab switching to properly load and display analysis
    const originalSwitchTab = window.switchTab;
    window.switchTab = function(tabName, event) {
        // Call original switch tab
        if (originalSwitchTab) {
            originalSwitchTab(tabName, event);
        }
        
        // Special handling for analysis tab
        if (tabName === 'analysis') {
            console.log('📊 Analysis tab clicked, checking for saved analysis...');
            
            // Get subcomponent ID
            const urlParams = new URLSearchParams(window.location.search);
            const subcomponentId = urlParams.get('id') || '1-1';
            
            // Try to load saved analysis
            const savedAnalysis = localStorage.getItem(\`analysis_\${subcomponentId}\`);
            
            if (savedAnalysis) {
                try {
                    const analysis = JSON.parse(savedAnalysis);
                    console.log('✅ Found saved analysis:', analysis);
                    
                    // Display the analysis
                    setTimeout(() => {
                        window.displayAnalysisResults(analysis);
                    }, 100);
                } catch (error) {
                    console.error('Error parsing saved analysis:', error);
                }
            } else {
                console.log('No saved analysis found for subcomponent:', subcomponentId);
                
                // Show no analysis message
                const analysisContent = document.getElementById('analysis-content');
                if (analysisContent) {
                    analysisContent.innerHTML = \`
                        <div style="text-align: center; padding: 60px 20px; color: #999;">
                            <div style="font-size: 48px; margin-bottom: 20px;">📊</div>
                            <h3 style="font-size: 24px; margin-bottom: 10px; color: #fff;">No Analysis Yet</h3>
                            <p style="font-size: 16px; margin-bottom: 30px;">Complete the interactive worksheet and click "Analyze Results" to get AI-powered feedback</p>
                            <button class="btn-primary" onclick="switchTab('workspace', null); document.querySelector('[data-tab=workspace]').click();">
                                Go to Workspace
                            </button>
                        </div>
                    \`;
                }
            }
        }
    };
    
    console.log('✅ Enhanced Display Handler initialized');
})();
`;

// Write the enhanced display handler
const handlerPath = path.join(__dirname, 'enhanced-analysis-display.js');
fs.writeFileSync(handlerPath, enhancedDisplayHandler);
console.log('✅ Created enhanced-analysis-display.js');

// Update subcomponent-detail.html to include the enhanced handler
const subcomponentPath = path.join(__dirname, 'subcomponent-detail.html');
let subcomponentContent = fs.readFileSync(subcomponentPath, 'utf8');

// Check if the enhanced handler is already included
if (!subcomponentContent.includes('enhanced-analysis-display.js')) {
    // Find the script section where other scripts are loaded
    const scriptSection = subcomponentContent.indexOf('scripts.forEach(src => {');
    if (scriptSection !== -1) {
        // Add our enhanced handler to the scripts array
        subcomponentContent = subcomponentContent.replace(
            "const scripts = [",
            "const scripts = [\n            'enhanced-analysis-display.js',  // Enhanced analysis display handler"
        );
        
        fs.writeFileSync(subcomponentPath, subcomponentContent);
        console.log('✅ Updated subcomponent-detail.html to include enhanced handler');
    }
} else {
    console.log('ℹ️ Enhanced handler already included in subcomponent-detail.html');
}

console.log('\n✨ Analysis display fix complete!');
console.log('\n📝 Next steps:');
console.log('1. The server should auto-reload with the changes');
console.log('2. Test any subcomponent by filling the worksheet and clicking "Analyze Results"');
console.log('3. Click on the Analysis tab to see the recommendations with "+X points" format');
console.log('4. All recommendations should show with priority badges (CRITICAL/HIGH/MEDIUM)');
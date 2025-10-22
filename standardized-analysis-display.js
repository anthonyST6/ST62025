// Standardized Analysis Display for ALL Modules
// Ensures consistent look across all blocks and proper data storage

(function() {
    console.log('📊 Standardized Analysis Display loaded');
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        setTimeout(initialize, 100);
    }
    
    function initialize() {
        console.log('🎨 Initializing Standardized Analysis Display');
        
        // Override ALL display functions to use our standardized template
        window.displayStandardizedAnalysis = function(analysis, worksheetType) {
            console.log('🎨 Displaying standardized analysis for:', worksheetType);
            console.log('📊 Analysis data:', analysis);
            
            // First, save to history with retry logic
            saveToHistoryWithRetry(analysis, worksheetType);
            
            const analysisContent = document.getElementById('analysis-content');
            if (!analysisContent) {
                console.error('❌ Analysis content area not found');
                return;
            }
            
            // Get score color based on value
            const scoreColor = analysis.score >= 80 ? '#4CAF50' : 
                              analysis.score >= 60 ? '#FF9800' : '#F44336';
            
            // Build the standardized HTML
            let html = `
                <div class="analysis-results-container" style="
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                    color: #ffffff;
                    padding: 20px;
                    background: #1a1a1a;
                    min-height: 100vh;
                ">
                    <!-- Header with Score -->
                    <div style="
                        background: rgba(0, 0, 0, 0.5);
                        border-radius: 12px;
                        padding: 30px;
                        margin-bottom: 30px;
                        border: 1px solid rgba(255, 85, 0, 0.2);
                    ">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <h2 style="
                                    color: #ffffff;
                                    font-size: 24px;
                                    font-weight: 600;
                                    margin: 0 0 10px 0;
                                    display: flex;
                                    align-items: center;
                                    gap: 10px;
                                ">
                                    <span style="font-size: 28px;">📊</span>
                                    Analysis Results
                                </h2>
                                <p style="color: #999; margin: 0; font-size: 14px;">
                                    Based on GTM best practices
                                </p>
                            </div>
                            <div style="text-align: center;">
                                <div style="
                                    font-size: 64px;
                                    font-weight: 700;
                                    color: ${scoreColor};
                                    line-height: 1;
                                ">
                                    ${analysis.score}%
                                </div>
                                <div style="
                                    color: #666;
                                    font-size: 12px;
                                    text-transform: uppercase;
                                    margin-top: 8px;
                                    letter-spacing: 1px;
                                ">
                                    Overall Score
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Executive Summary if available -->
                    ${analysis.analysis?.executiveSummary || analysis.executiveSummary ? `
                        <div style="
                            background: rgba(0, 0, 0, 0.5);
                            border-radius: 12px;
                            padding: 24px;
                            margin-bottom: 30px;
                            border: 1px solid rgba(255, 85, 0, 0.2);
                        ">
                            <h3 style="
                                color: #FF5500;
                                font-size: 16px;
                                font-weight: 600;
                                margin: 0 0 16px 0;
                                text-transform: uppercase;
                                letter-spacing: 1px;
                            ">
                                Executive Summary
                            </h3>
                            <p style="
                                color: #cccccc;
                                line-height: 1.8;
                                margin: 0;
                                font-size: 15px;
                            ">
                                ${analysis.analysis?.executiveSummary || analysis.executiveSummary}
                            </p>
                        </div>
                    ` : ''}
                    
                    <!-- Detailed Analysis Section -->
                    ${analysis.detailedScores ? `
                        <div style="margin-bottom: 30px;">
                            <h3 style="
                                color: #ffffff;
                                font-size: 18px;
                                font-weight: 600;
                                margin: 0 0 24px 0;
                            ">
                                Detailed Analysis
                            </h3>
                            
                            ${Object.entries(analysis.detailedScores).map(([key, value]) => {
                                const displayName = formatDimensionName(key);
                                const percentage = typeof value.percentage === 'number' ? value.percentage :
                                                  typeof value === 'number' ? Math.round((value / 20) * 100) : 0;
                                
                                // Parse feedback into strengths and improvements
                                const { strengths, improvements } = parseFeedback(value.feedback || '');
                                
                                return `
                                    <div style="
                                        background: rgba(0, 0, 0, 0.5);
                                        border-radius: 12px;
                                        padding: 24px;
                                        margin-bottom: 20px;
                                        border: 1px solid rgba(255, 255, 255, 0.1);
                                    ">
                                        <!-- Dimension Header -->
                                        <div style="
                                            display: flex;
                                            justify-content: space-between;
                                            align-items: center;
                                            margin-bottom: 16px;
                                        ">
                                            <h4 style="
                                                color: #ffffff;
                                                font-size: 16px;
                                                font-weight: 600;
                                                margin: 0;
                                            ">
                                                ${displayName}
                                            </h4>
                                            <div style="
                                                display: flex;
                                                align-items: center;
                                                gap: 16px;
                                            ">
                                                <span style="
                                                    color: #FF5500;
                                                    font-size: 24px;
                                                    font-weight: 700;
                                                ">
                                                    ${value.score || 0}/${value.maxScore || 20}
                                                </span>
                                                <span style="
                                                    color: ${getPercentageColor(percentage)};
                                                    font-size: 18px;
                                                    font-weight: 600;
                                                ">
                                                    ${percentage}%
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <!-- Progress Bar -->
                                        <div style="
                                            width: 100%;
                                            height: 8px;
                                            background: rgba(255, 255, 255, 0.1);
                                            border-radius: 4px;
                                            overflow: hidden;
                                            margin-bottom: 20px;
                                        ">
                                            <div style="
                                                width: ${percentage}%;
                                                height: 100%;
                                                background: linear-gradient(90deg, #FF5500, #FF8800);
                                                transition: width 0.5s ease;
                                            "></div>
                                        </div>
                                        
                                        <!-- Strengths and Improvements -->
                                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                                            <!-- Strengths -->
                                            <div style="
                                                background: rgba(0, 0, 0, 0.3);
                                                border-radius: 8px;
                                                padding: 16px;
                                                border-left: 3px solid #4CAF50;
                                            ">
                                                <h5 style="
                                                    color: #4CAF50;
                                                    font-size: 12px;
                                                    font-weight: 600;
                                                    text-transform: uppercase;
                                                    letter-spacing: 1px;
                                                    margin: 0 0 12px 0;
                                                ">
                                                    Strengths
                                                </h5>
                                                <ul style="
                                                    margin: 0;
                                                    padding-left: 20px;
                                                    color: #cccccc;
                                                    font-size: 14px;
                                                    line-height: 1.6;
                                                ">
                                                    ${strengths.length > 0 ? 
                                                        strengths.map(s => `<li style="margin-bottom: 4px;">${s}</li>`).join('') :
                                                        '<li style="color: #666;">No specific strengths identified</li>'
                                                    }
                                                </ul>
                                            </div>
                                            
                                            <!-- Areas for Improvement -->
                                            <div style="
                                                background: rgba(0, 0, 0, 0.3);
                                                border-radius: 8px;
                                                padding: 16px;
                                                border-left: 3px solid #FF5500;
                                            ">
                                                <h5 style="
                                                    color: #FF5500;
                                                    font-size: 12px;
                                                    font-weight: 600;
                                                    text-transform: uppercase;
                                                    letter-spacing: 1px;
                                                    margin: 0 0 12px 0;
                                                ">
                                                    Areas for Improvement
                                                </h5>
                                                <ul style="
                                                    margin: 0;
                                                    padding-left: 20px;
                                                    color: #cccccc;
                                                    font-size: 14px;
                                                    line-height: 1.6;
                                                ">
                                                    ${improvements.length > 0 ?
                                                        improvements.map(i => `<li style="margin-bottom: 4px;">${i}</li>`).join('') :
                                                        '<li style="color: #666;">No improvements needed</li>'
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    ` : ''}
                    
                    <!-- Strategic Recommendations -->
                    ${analysis.recommendations && analysis.recommendations.length > 0 ? `
                        <div style="margin-bottom: 30px;">
                            <h3 style="
                                color: #ffffff;
                                font-size: 18px;
                                font-weight: 600;
                                margin: 0 0 24px 0;
                            ">
                                Strategic Recommendations to Improve Your Score
                            </h3>
                            
                            <div style="display: flex; flex-direction: column; gap: 16px;">
                                ${analysis.recommendations.map((rec, index) => {
                                    const priorityColor = getPriorityColor(rec.priority);
                                    const expectedImprovement = formatImprovement(rec.expectedImprovement);
                                    
                                    return `
                                        <div style="
                                            background: rgba(0, 0, 0, 0.5);
                                            border: 1px solid rgba(255, 255, 255, 0.1);
                                            border-radius: 12px;
                                            padding: 20px;
                                            display: flex;
                                            align-items: center;
                                            gap: 20px;
                                            transition: all 0.3s ease;
                                            cursor: pointer;
                                        " onmouseover="this.style.borderColor='rgba(255, 85, 0, 0.5)'"
                                           onmouseout="this.style.borderColor='rgba(255, 255, 255, 0.1)'">
                                            
                                            <!-- Arrow Icon -->
                                            <div style="
                                                font-size: 24px;
                                                color: #FF5500;
                                            ">
                                                ▶
                                            </div>
                                            
                                            <!-- Content -->
                                            <div style="flex: 1;">
                                                <div style="
                                                    color: #ffffff;
                                                    font-size: 16px;
                                                    font-weight: 600;
                                                    margin-bottom: 8px;
                                                ">
                                                    ${rec.area || `Improve ${formatDimensionName(rec.dimension || 'Area')}`}
                                                </div>
                                                <div style="
                                                    color: #999999;
                                                    font-size: 14px;
                                                    line-height: 1.5;
                                                ">
                                                    Expected Score Impact: <span style="color: #4CAF50; font-weight: 600;">${expectedImprovement}</span>
                                                </div>
                                            </div>
                                            
                                            <!-- Priority Badge -->
                                            <div style="
                                                background: ${priorityColor};
                                                color: #ffffff;
                                                padding: 6px 12px;
                                                border-radius: 20px;
                                                font-size: 11px;
                                                font-weight: 700;
                                                text-transform: uppercase;
                                                letter-spacing: 0.5px;
                                                white-space: nowrap;
                                            ">
                                                ${rec.priority || 'MEDIUM'}
                                            </div>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    <!-- Action Buttons -->
                    <div style="
                        display: flex;
                        gap: 16px;
                        margin-top: 30px;
                        padding-top: 20px;
                        border-top: 1px solid rgba(255, 255, 255, 0.1);
                    ">
                        <button style="
                            background: rgba(255, 255, 255, 0.1);
                            color: #ffffff;
                            border: 1px solid rgba(255, 255, 255, 0.2);
                            padding: 12px 24px;
                            border-radius: 8px;
                            font-size: 14px;
                            font-weight: 600;
                            cursor: pointer;
                            transition: all 0.3s ease;
                        " onclick="document.querySelector('[data-tab=workspace]').click()"
                           onmouseover="this.style.background='rgba(255, 255, 255, 0.2)'"
                           onmouseout="this.style.background='rgba(255, 255, 255, 0.1)'">
                            Refine Worksheet
                        </button>
                        <button style="
                            background: linear-gradient(135deg, #FF5500, #FF8800);
                            color: #ffffff;
                            border: none;
                            padding: 12px 24px;
                            border-radius: 8px;
                            font-size: 14px;
                            font-weight: 600;
                            cursor: pointer;
                            transition: all 0.3s ease;
                        " onclick="window.analyzeWorksheet()"
                           onmouseover="this.style.transform='translateY(-2px)'"
                           onmouseout="this.style.transform='translateY(0)'">
                            Re-analyze
                        </button>
                    </div>
                </div>
            `;
            
            analysisContent.innerHTML = html;
            console.log('✅ Standardized analysis displayed successfully');
        };
        
        // Helper function to format dimension names
        function formatDimensionName(key) {
            return key.replace(/([A-Z])/g, ' $1')
                     .trim()
                     .split(' ')
                     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                     .join(' ');
        }
        
        // Helper function to get percentage color
        function getPercentageColor(percentage) {
            if (percentage >= 80) return '#4CAF50';
            if (percentage >= 60) return '#FFA726';
            if (percentage >= 40) return '#FF7043';
            return '#EF5350';
        }
        
        // Helper function to get priority color
        function getPriorityColor(priority) {
            switch(priority) {
                case 'CRITICAL': return '#DC2626';
                case 'HIGH': return '#EF4444';
                case 'MEDIUM': return '#F59E0B';
                case 'LOW': return '#10B981';
                default: return '#6B7280';
            }
        }
        
        // Helper function to format improvement
        function formatImprovement(improvement) {
            if (!improvement) return '+5 points';
            if (typeof improvement === 'string' && improvement.includes('+')) {
                return improvement;
            }
            return `+${improvement} points`;
        }
        
        // Helper function to parse feedback
        function parseFeedback(feedback) {
            const strengths = [];
            const improvements = [];
            
            if (!feedback) return { strengths, improvements };
            
            const lines = feedback.split('\n').filter(line => line.trim());
            
            lines.forEach(line => {
                const cleanLine = line.replace(/^[•\-✓✗]\s*/, '').trim();
                if (line.includes('✓') || line.toLowerCase().includes('good') || 
                    line.toLowerCase().includes('strong') || line.toLowerCase().includes('excellent')) {
                    if (cleanLine) strengths.push(cleanLine);
                } else if (line.includes('✗') || line.toLowerCase().includes('need') || 
                          line.toLowerCase().includes('improve') || line.toLowerCase().includes('missing')) {
                    if (cleanLine) improvements.push(cleanLine);
                }
            });
            
            return { strengths, improvements };
        }
        
        // Save to history with retry logic
        function saveToHistoryWithRetry(analysis, worksheetType, retries = 3) {
            const urlParams = new URLSearchParams(window.location.search);
            const subcomponentId = urlParams.get('id') || '1-1';
            
            // Add worksheet type to analysis
            analysis.worksheetType = worksheetType;
            
            // Try to save to history
            if (typeof window.saveToScoreHistory === 'function') {
                try {
                    console.log('💾 Saving to score history for:', subcomponentId);
                    window.saveToScoreHistory(subcomponentId, analysis);
                } catch (error) {
                    console.error('❌ Error saving to history:', error);
                    if (retries > 0) {
                        console.log(`🔄 Retrying save (${retries} attempts left)...`);
                        setTimeout(() => saveToHistoryWithRetry(analysis, worksheetType, retries - 1), 500);
                    }
                }
            } else if (retries > 0) {
                console.log('⏳ Score history function not ready, retrying...');
                setTimeout(() => saveToHistoryWithRetry(analysis, worksheetType, retries - 1), 500);
            }
        }
        
        // Override ALL display functions to use standardized display
        const overrideDisplayFunctions = () => {
            // List of all possible display functions
            const displayFunctions = [
                'displayEnhancedAnalysisResults',
                'displayAnalysisResults',
                'displayUnifiedAnalysisResults',
                'displayProblemStatementAnalysis',
                'displayMissionStatementAnalysis',
                'displayCustomerInsightAnalysis',
                'displayTeamCapabilityAnalysis',
                'displayMarketInsightAnalysis',
                'displayPrototypeLaunchAnalysis'
            ];
            
            displayFunctions.forEach(funcName => {
                if (!window[funcName] || !window[funcName]._standardized) {
                    const original = window[funcName];
                    window[funcName] = function(analysis, worksheetType) {
                        console.log(`🎨 Redirecting ${funcName} to standardized display`);
                        return window.displayStandardizedAnalysis(analysis, worksheetType || 'generic');
                    };
                    window[funcName]._standardized = true;
                    if (original) {
                        window[funcName]._original = original;
                    }
                }
            });
        };
        
        // Override functions immediately and periodically
        overrideDisplayFunctions();
        setTimeout(overrideDisplayFunctions, 500);
        setTimeout(overrideDisplayFunctions, 1000);
        setTimeout(overrideDisplayFunctions, 2000);
        
        console.log('✅ Standardized Analysis Display initialized');
    }
    
    // Export for debugging
    window.standardizedAnalysisDisplay = {
        initialize,
        displayStandardizedAnalysis: window.displayStandardizedAnalysis
    };
})();
// ScaleOps6 Polished Analysis Display - Exact Match to Requirements
// This creates the exact analysis layout with proper strengths/weaknesses display

(function() {
    'use strict';
    
    // Override the analysis display with ScaleOps6 branded version
    window.displayAnalysisResults = function(analysis) {
        console.log('📊 Displaying ScaleOps6 polished analysis:', analysis);
        const analysisContent = document.getElementById('analysis-content');
        if (!analysisContent) {
            console.error('Analysis content div not found');
            return;
        }
        
        // Ensure we have valid analysis data
        if (!analysis || typeof analysis.score === 'undefined') {
            console.error('Invalid analysis data');
            return;
        }
        
        // Build the ScaleOps6 branded analysis display
        let html = `
            <!-- ScaleOps6 Analysis Header -->
            <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 15px; padding: 30px; margin-bottom: 30px;">
                <!-- Score Display -->
                <div style="text-align: center; margin-bottom: 30px;">
                    <h3 style="color: #999; font-size: 16px; margin-bottom: 10px; font-weight: 400;">Overall Score</h3>
                    <p style="color: #666; font-size: 14px; margin-bottom: 20px;">Based on GTM best practices and industry standards</p>
                    ${analysis.confidence ? `
                    <div style="color: #4CAF50; font-size: 14px; margin-bottom: 15px;">
                        Confidence: ${analysis.confidence}%
                    </div>
                    ` : ''}
                    <div style="font-size: 72px; font-weight: 800; color: ${analysis.score >= 80 ? '#4CAF50' : analysis.score >= 60 ? '#FF9800' : '#F44336'};">
                        ${analysis.score}%
                    </div>
                </div>
                
                <!-- Executive Summary -->
                ${(analysis.executiveSummary || analysis.analysis?.executiveSummary) ? `
                <div style="background: rgba(0, 0, 0, 0.5); border-radius: 10px; padding: 25px; margin-bottom: 30px;">
                    <h4 style="color: #FF5500; margin-bottom: 15px; font-size: 16px; font-weight: 600;">Executive Summary</h4>
                    <p style="color: #ccc; line-height: 1.8; font-size: 15px;">
                        ${analysis.executiveSummary || analysis.analysis?.executiveSummary || 'Analysis complete.'}
                    </p>
                </div>
                ` : ''}
                
                <!-- Dimension Scores with Visual Bars -->
                ${analysis.detailedScores ? `
                <div style="margin-bottom: 30px;">
                    ${Object.entries(analysis.detailedScores).map(([key, value]) => {
                        const displayName = formatDimensionName(key);
                        const percentage = value.percentage || (value.maxScore > 0 ? Math.round((value.score / value.maxScore) * 100) : 0);
                        
                        return `
                        <div style="margin-bottom: 20px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                                <span style="color: #fff; font-size: 15px; font-weight: 500;">${displayName}</span>
                                <span style="color: #999; font-size: 14px;">
                                    ${value.score}/${value.maxScore}
                                    <span style="color: ${percentage >= 80 ? '#4CAF50' : percentage >= 60 ? '#FF9800' : '#F44336'}; font-weight: 600; margin-left: 10px;">
                                        ${percentage}%
                                    </span>
                                </span>
                            </div>
                            <div style="background: rgba(255, 255, 255, 0.1); height: 8px; border-radius: 4px; overflow: hidden;">
                                <div style="background: ${percentage >= 80 ? '#4CAF50' : percentage >= 60 ? '#FF9800' : '#F44336'}; height: 100%; width: ${percentage}%; transition: width 0.5s ease;"></div>
                            </div>
                        </div>
                        `;
                    }).join('')}
                </div>
                ` : ''}
            </div>
            
            <!-- Strategic Recommendations Section -->
            ${analysis.recommendations && analysis.recommendations.length > 0 ? `
            <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 15px; padding: 30px;">
                <h3 style="color: #FF5500; font-size: 20px; margin-bottom: 25px; font-weight: 600;">
                    🎯 Strategic Recommendations
                </h3>
                
                ${analysis.recommendations.map((rec, index) => {
                    const priorityColor = rec.priority === 'CRITICAL' ? '#8B0000' :
                                        rec.priority === 'HIGH' ? '#F44336' : 
                                        rec.priority === 'MEDIUM' ? '#FF9800' : '#2196F3';
                    const priorityBg = rec.priority === 'CRITICAL' ? 'rgba(139, 0, 0, 0.2)' :
                                      rec.priority === 'HIGH' ? 'rgba(244, 67, 54, 0.2)' : 
                                      rec.priority === 'MEDIUM' ? 'rgba(255, 152, 0, 0.2)' : 'rgba(33, 150, 243, 0.2)';
                    
                    // Parse expected improvement
                    let improvementValue = 0;
                    if (rec.expectedImprovement) {
                        const match = rec.expectedImprovement.match(/\+?(\d+)/);
                        if (match) improvementValue = parseInt(match[1]);
                    }
                    
                    return `
                    <div style="background: rgba(0, 0, 0, 0.3); border-radius: 12px; padding: 20px; margin-bottom: 15px; border: 1px solid rgba(255, 255, 255, 0.05); cursor: pointer; transition: all 0.3s ease;"
                         onmouseover="this.style.background='rgba(255, 85, 0, 0.05)'; this.style.borderColor='rgba(255, 85, 0, 0.3)';"
                         onmouseout="this.style.background='rgba(0, 0, 0, 0.3)'; this.style.borderColor='rgba(255, 255, 255, 0.05)';"
                         onclick="toggleRecommendationDetails('rec-${index}')">
                        
                        <div style="display: flex; align-items: center; gap: 15px;">
                            <!-- Expand Arrow -->
                            <div id="rec-arrow-${index}" style="color: #666; font-size: 20px; transition: transform 0.3s ease;">
                                ▶
                            </div>
                            
                            <!-- Main Content -->
                            <div style="flex: 1;">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <h4 style="color: #fff; font-size: 16px; margin: 0; font-weight: 500;">
                                            ${rec.action || rec.area || 'Improvement Opportunity'}
                                        </h4>
                                        <p style="color: #999; font-size: 13px; margin: 5px 0 0 0;">
                                            Improve this aspect of your strategy
                                        </p>
                                    </div>
                                    
                                    <div style="display: flex; align-items: center; gap: 20px;">
                                        <!-- Priority Badge -->
                                        <span style="background: ${priorityBg}; color: ${priorityColor}; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase; border: 1px solid ${priorityColor};">
                                            ${rec.priority || 'MEDIUM'}
                                        </span>
                                        
                                        <!-- Expected Impact -->
                                        <div style="text-align: center;">
                                            <div style="color: #666; font-size: 11px; text-transform: uppercase; margin-bottom: 4px;">Expected Impact</div>
                                            <div style="color: #4CAF50; font-size: 20px; font-weight: 700;">
                                                +${improvementValue}
                                            </div>
                                            <div style="color: #666; font-size: 11px;">points</div>
                                        </div>
                                        
                                        <!-- Effort Indicator -->
                                        <div style="text-align: center;">
                                            <div style="color: #666; font-size: 11px; margin-bottom: 4px;">Low effort</div>
                                            <div style="background: rgba(255, 255, 255, 0.1); height: 4px; width: 60px; border-radius: 2px; overflow: hidden;">
                                                <div style="background: #FF5500; height: 100%; width: 50%;"></div>
                                            </div>
                                            <div style="color: #666; font-size: 11px; margin-top: 4px;">50% complete</div>
                                        </div>
                                        
                                        <!-- Click for Details -->
                                        <div style="color: #FF5500; font-size: 14px; font-weight: 500;">
                                            Click for details →
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Hidden Details Section -->
                        <div id="rec-${index}" style="display: none; margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                            ${rec.implementationPlan && rec.implementationPlan.length > 0 ? `
                            <h5 style="color: #FF5500; font-size: 14px; margin-bottom: 15px; font-weight: 600;">Implementation Steps:</h5>
                            <ol style="margin: 0; padding-left: 25px; color: #ccc;">
                                ${rec.implementationPlan.map(step => `
                                <li style="margin-bottom: 10px; line-height: 1.6; font-size: 14px;">${step}</li>
                                `).join('')}
                            </ol>
                            ` : ''}
                            
                            ${rec.currentState ? `
                            <div style="margin-top: 15px;">
                                <strong style="color: #F44336;">Current State:</strong>
                                <p style="color: #ccc; margin: 5px 0; font-size: 14px;">${rec.currentState}</p>
                            </div>
                            ` : ''}
                            
                            ${rec.targetState ? `
                            <div style="margin-top: 15px;">
                                <strong style="color: #4CAF50;">Target State:</strong>
                                <p style="color: #ccc; margin: 5px 0; font-size: 14px;">${rec.targetState}</p>
                            </div>
                            ` : ''}
                        </div>
                    </div>
                    `;
                }).join('')}
                
                <!-- Implementation Summary -->
                <div style="background: rgba(255, 85, 0, 0.1); border: 1px solid rgba(255, 85, 0, 0.3); border-radius: 10px; padding: 20px; margin-top: 25px;">
                    <h4 style="color: #FF5500; margin: 0 0 15px 0; font-size: 16px;">Implementation Summary</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                        <div>
                            <div style="color: #666; font-size: 12px; text-transform: uppercase; margin-bottom: 8px;">Total Improvement Potential</div>
                            <div style="color: #4CAF50; font-size: 28px; font-weight: 700;">
                                +${analysis.recommendations.reduce((sum, rec) => {
                                    const match = (rec.expectedImprovement || '').match(/\+?(\d+)/);
                                    return sum + (match ? parseInt(match[1]) : 0);
                                }, 0)} points
                            </div>
                        </div>
                        <div>
                            <div style="color: #666; font-size: 12px; text-transform: uppercase; margin-bottom: 8px;">Priority Actions</div>
                            <div style="font-size: 16px; color: #ccc;">
                                ${analysis.recommendations.filter(r => r.priority === 'CRITICAL').length} critical
                                • ${analysis.recommendations.filter(r => r.priority === 'HIGH').length} high
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Action Buttons -->
                <div style="display: flex; gap: 15px; margin-top: 25px;">
                    <button class="btn-primary" onclick="switchTab('workspace', null)" style="background: #FF5500;">
                        Refine Worksheet
                    </button>
                    <button class="btn-secondary" onclick="switchTab('history', null)">
                        View Score History
                    </button>
                </div>
                
                <!-- Auto-save notification -->
                <div style="margin-top: 20px; padding: 15px; background: rgba(76, 175, 80, 0.1); border: 1px solid rgba(76, 175, 80, 0.3); border-radius: 8px;">
                    <p style="color: #4CAF50; font-size: 14px; margin: 0;">
                        ✓ Score automatically saved to Score History
                    </p>
                </div>
            </div>
            ` : ''}
        `;
        
        // Set the HTML content
        analysisContent.innerHTML = html;
        
        // Save to all storage locations
        if (window.AnalysisStateManager) {
            window.AnalysisStateManager.setAnalysis(analysis);
        }
        if (window.DataManager) {
            window.DataManager.saveAnalysisResults(analysis);
        }
    };
    
    // Helper function to format dimension names
    function formatDimensionName(key) {
        const nameMap = {
            'problemClarity': 'Problem Clarity',
            'marketUnderstanding': 'Market Understanding',
            'customerEmpathy': 'Customer Empathy',
            'valueQuantification': 'Value Quantification',
            'solutionDifferentiation': 'Solution Differentiation'
        };
        return nameMap[key] || key.replace(/([A-Z])/g, ' $1').trim();
    }
    
    // Toggle recommendation details
    window.toggleRecommendationDetails = function(id) {
        const details = document.getElementById(id);
        const arrow = document.getElementById(id.replace('rec-', 'rec-arrow-'));
        
        if (details) {
            if (details.style.display === 'none') {
                details.style.display = 'block';
                if (arrow) arrow.style.transform = 'rotate(90deg)';
            } else {
                details.style.display = 'none';
                if (arrow) arrow.style.transform = 'rotate(0deg)';
            }
        }
    };
    
    console.log('✅ ScaleOps6 Polished Analysis Display loaded');
})();
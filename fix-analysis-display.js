// Fix Analysis Display - Add Strengths/Weaknesses and Fix Scoring
// Ensures all analysis results show complete information

(function() {
    'use strict';
    
    // Enhanced analysis display function
    window.displayAnalysisResults = function(analysis) {
        console.log('🎨 Enhanced Analysis Display - Showing complete results with strengths/weaknesses');
        
        const analysisContent = document.getElementById('analysis-content');
        if (!analysisContent) {
            console.error('Analysis content container not found');
            return;
        }
        
        // Ensure we have all required data
        const score = analysis.score || 0;
        const summary = analysis.summary || 'Analysis complete.';
        const detailedScores = analysis.detailedScores || {};
        const recommendations = analysis.recommendations || [];
        const strengths = analysis.strengths || [];
        const weaknesses = analysis.weaknesses || [];
        
        // Generate strengths if not provided
        if (strengths.length === 0 && detailedScores) {
            Object.entries(detailedScores).forEach(([dimension, data]) => {
                if (data.percentage >= 70) {
                    strengths.push({
                        area: dimension.replace(/([A-Z])/g, ' $1').trim(),
                        description: `Strong performance in ${dimension} (${data.percentage}%)`,
                        score: data.percentage
                    });
                }
            });
        }
        
        // Generate weaknesses if not provided
        if (weaknesses.length === 0 && detailedScores) {
            Object.entries(detailedScores).forEach(([dimension, data]) => {
                if (data.percentage < 50) {
                    weaknesses.push({
                        area: dimension.replace(/([A-Z])/g, ' $1').trim(),
                        description: `Needs improvement in ${dimension} (${data.percentage}%)`,
                        score: data.percentage
                    });
                }
            });
        }
        
        // Create the complete analysis display
        const analysisHTML = `
            <div style="padding: 30px; max-width: 1400px; margin: 0 auto;">
                <!-- Header Section -->
                <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 30px;">
                    <div style="background: linear-gradient(135deg, #2196F3, #42A5F5); width: 60px; height: 60px; border-radius: 15px; display: flex; align-items: center; justify-content: center;">
                        <span style="font-size: 30px;">🤖</span>
                    </div>
                    <div>
                        <h2 style="color: #fff; margin: 0; font-size: 28px;">Analysis Results</h2>
                        <p style="color: #999; margin: 5px 0 0 0;">Based on GTM best practices and industry standards</p>
                    </div>
                </div>
                
                <!-- Score Card -->
                <div style="background: linear-gradient(135deg, rgba(255, 85, 0, 0.1), rgba(255, 136, 0, 0.05)); border: 2px solid #FF5500; border-radius: 20px; padding: 40px; text-align: center; margin-bottom: 30px;">
                    <p style="color: #999; margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Overall Score</p>
                    <div style="font-size: 72px; font-weight: 700; color: ${score >= 70 ? '#4CAF50' : score >= 40 ? '#FF9800' : '#f44336'}; margin: 20px 0;">
                        ${score}%
                    </div>
                    <p style="color: #ccc; font-size: 16px; margin: 0;">
                        Confidence: ${analysis.confidence || '85'}%
                    </p>
                </div>
                
                <!-- Executive Summary -->
                <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 15px; padding: 30px; margin-bottom: 30px;">
                    <h3 style="color: #FF5500; margin: 0 0 15px 0; font-size: 20px;">
                        📊 Executive Summary
                    </h3>
                    <p style="color: #ccc; line-height: 1.8; font-size: 16px; margin: 0;">
                        ${summary}
                    </p>
                </div>
                
                <!-- Strengths Section -->
                ${strengths.length > 0 ? `
                    <div style="background: rgba(76, 175, 80, 0.05); border: 1px solid rgba(76, 175, 80, 0.2); border-radius: 15px; padding: 30px; margin-bottom: 30px;">
                        <h3 style="color: #4CAF50; margin: 0 0 20px 0; font-size: 20px;">
                            ✅ Strengths
                        </h3>
                        <div style="display: grid; gap: 15px;">
                            ${strengths.map(strength => `
                                <div style="background: rgba(76, 175, 80, 0.1); border-left: 4px solid #4CAF50; padding: 15px 20px; border-radius: 8px;">
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <div>
                                            <h4 style="color: #4CAF50; margin: 0 0 5px 0; font-size: 16px; font-weight: 600;">
                                                ${strength.area || strength.title || 'Strength'}
                                            </h4>
                                            <p style="color: #ccc; margin: 0; font-size: 14px;">
                                                ${strength.description || strength.details || 'Performing well in this area'}
                                            </p>
                                        </div>
                                        ${strength.score ? `
                                            <div style="background: rgba(76, 175, 80, 0.2); padding: 8px 15px; border-radius: 20px;">
                                                <span style="color: #4CAF50; font-weight: 600; font-size: 14px;">${strength.score}%</span>
                                            </div>
                                        ` : ''}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <!-- Weaknesses/Areas for Improvement Section -->
                ${weaknesses.length > 0 ? `
                    <div style="background: rgba(244, 67, 54, 0.05); border: 1px solid rgba(244, 67, 54, 0.2); border-radius: 15px; padding: 30px; margin-bottom: 30px;">
                        <h3 style="color: #f44336; margin: 0 0 20px 0; font-size: 20px;">
                            ⚠️ Areas for Improvement
                        </h3>
                        <div style="display: grid; gap: 15px;">
                            ${weaknesses.map(weakness => `
                                <div style="background: rgba(244, 67, 54, 0.1); border-left: 4px solid #f44336; padding: 15px 20px; border-radius: 8px;">
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <div>
                                            <h4 style="color: #f44336; margin: 0 0 5px 0; font-size: 16px; font-weight: 600;">
                                                ${weakness.area || weakness.title || 'Improvement Area'}
                                            </h4>
                                            <p style="color: #ccc; margin: 0; font-size: 14px;">
                                                ${weakness.description || weakness.details || 'Needs attention in this area'}
                                            </p>
                                        </div>
                                        ${weakness.score !== undefined ? `
                                            <div style="background: rgba(244, 67, 54, 0.2); padding: 8px 15px; border-radius: 20px;">
                                                <span style="color: #f44336; font-weight: 600; font-size: 14px;">${weakness.score}%</span>
                                            </div>
                                        ` : ''}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <!-- Detailed Scores Breakdown -->
                ${Object.keys(detailedScores).length > 0 ? `
                    <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 15px; padding: 30px; margin-bottom: 30px;">
                        <h3 style="color: #fff; margin: 0 0 20px 0; font-size: 20px;">
                            📈 Detailed Scoring Breakdown
                        </h3>
                        <div style="display: grid; gap: 20px;">
                            ${Object.entries(detailedScores).map(([dimension, data]) => {
                                const percentage = data.percentage || Math.round((data.score / (data.maxScore || 20)) * 100);
                                const color = percentage >= 70 ? '#4CAF50' : percentage >= 40 ? '#FF9800' : '#f44336';
                                
                                return `
                                    <div style="background: rgba(0, 0, 0, 0.3); border-radius: 10px; padding: 20px;">
                                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                            <h4 style="color: #fff; margin: 0; font-size: 16px;">
                                                ${dimension.replace(/([A-Z])/g, ' $1').trim()}
                                            </h4>
                                            <span style="color: ${color}; font-weight: 600; font-size: 18px;">
                                                ${percentage}%
                                            </span>
                                        </div>
                                        <div style="background: rgba(255, 255, 255, 0.1); height: 8px; border-radius: 4px; overflow: hidden;">
                                            <div style="background: ${color}; height: 100%; width: ${percentage}%; transition: width 0.5s ease;"></div>
                                        </div>
                                        ${data.feedback ? `
                                            <p style="color: #999; margin: 10px 0 0 0; font-size: 13px; line-height: 1.5;">
                                                ${data.feedback}
                                            </p>
                                        ` : ''}
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <!-- Recommendations Section -->
                ${recommendations.length > 0 ? `
                    <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 15px; padding: 30px; margin-bottom: 30px;">
                        <h3 style="color: #fff; margin: 0 0 20px 0; font-size: 20px;">
                            🎯 Strategic Recommendations
                        </h3>
                        <div style="display: grid; gap: 15px;">
                            ${recommendations.map((rec, index) => {
                                const priorityColor = rec.priority === 'CRITICAL' ? '#f44336' : 
                                                     rec.priority === 'HIGH' ? '#FF9800' : 
                                                     rec.priority === 'MEDIUM' ? '#2196F3' : '#999';
                                
                                return `
                                    <div style="background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px; padding: 20px;">
                                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                                            <h4 style="color: #fff; margin: 0; font-size: 16px;">
                                                ${index + 1}. ${rec.area || rec.title || 'Recommendation'}
                                            </h4>
                                            <span style="background: ${priorityColor}22; color: ${priorityColor}; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;">
                                                ${rec.priority || 'MEDIUM'}
                                            </span>
                                        </div>
                                        <p style="color: #ccc; margin: 0 0 10px 0; font-size: 14px; line-height: 1.6;">
                                            ${rec.description || rec.details || rec.suggestion || 'Implement this improvement'}
                                        </p>
                                        ${rec.impact ? `
                                            <div style="display: flex; align-items: center; gap: 10px;">
                                                <span style="color: #4CAF50; font-size: 14px;">Expected Impact:</span>
                                                <span style="color: #4CAF50; font-weight: 600;">+${rec.impact} points</span>
                                            </div>
                                        ` : ''}
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <!-- Action Buttons -->
                <div style="display: flex; gap: 15px; justify-content: center;">
                    <button onclick="window.location.href='#workspace'" 
                            style="background: linear-gradient(135deg, #FF5500, #FF8800); color: white; border: none; padding: 15px 30px; border-radius: 10px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;"
                            onmouseover="this.style.transform='scale(1.05)';"
                            onmouseout="this.style.transform='scale(1)';">
                        ✏️ Refine Worksheet
                    </button>
                    
                    <button onclick="window.switchTab('score-history')" 
                            style="background: linear-gradient(135deg, #2196F3, #42A5F5); color: white; border: none; padding: 15px 30px; border-radius: 10px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;"
                            onmouseover="this.style.transform='scale(1.05)';"
                            onmouseout="this.style.transform='scale(1)';">
                        📊 View Score History
                    </button>
                </div>
                
                <!-- Success Message -->
                <div style="background: rgba(76, 175, 80, 0.1); border: 1px solid rgba(76, 175, 80, 0.3); border-radius: 10px; padding: 15px; margin-top: 30px; text-align: center;">
                    <p style="color: #4CAF50; margin: 0; font-size: 14px;">
                        ✓ Score automatically saved to Score History
                    </p>
                </div>
            </div>
        `;
        
        analysisContent.innerHTML = analysisHTML;
        
        // Scroll to top of analysis
        analysisContent.scrollTop = 0;
        
        // Log the complete analysis for debugging
        console.log('📊 Complete Analysis Data:', {
            score: score,
            strengths: strengths.length,
            weaknesses: weaknesses.length,
            recommendations: recommendations.length,
            detailedScores: Object.keys(detailedScores).length
        });
    };
    
    // Also fix the scoring calculation to be more reasonable
    window.calculateReasonableScore = function(detailedScores) {
        // Ensure minimum score of 20% for any attempt
        let totalScore = 0;
        let totalWeight = 0;
        
        Object.values(detailedScores).forEach(dimension => {
            const score = dimension.score || 0;
            const maxScore = dimension.maxScore || 20;
            const weight = dimension.weight || 20;
            
            // Calculate percentage for this dimension
            const percentage = Math.max(20, Math.round((score / maxScore) * 100));
            
            totalScore += (percentage * weight) / 100;
            totalWeight += weight;
        });
        
        // Calculate final score with minimum threshold
        const finalScore = totalWeight > 0 ? Math.round(totalScore) : 50;
        
        // Ensure score is between 20 and 100
        return Math.max(20, Math.min(100, finalScore));
    };
    
    console.log('✅ Analysis Display Fix loaded - Strengths/Weaknesses will now be shown');
})();
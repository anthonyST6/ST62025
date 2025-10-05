// Complete fix for analysis layout with side-by-side strengths/weaknesses and dropdowns
(function() {
    console.log('🔧 Applying complete analysis layout fix with side-by-side display');
    
    // Override the displayUnifiedAnalysisResults function from unified-analysis-handler.js
    window.displayUnifiedAnalysisResults = function(analysis, worksheetType) {
        console.log('📊 Fixed displayUnifiedAnalysisResults called');
        
        const analysisContent = document.getElementById('analysis-content');
        if (!analysisContent) {
            console.error('❌ Analysis content div not found!');
            return;
        }
        
        // Extract data from analysis
        const overallScore = analysis.score || 75;
        const scoreColor = overallScore >= 80 ? '#4CAF50' : 
                          overallScore >= 60 ? '#FF9800' : '#F44336';
        
        // Build the complete analysis display with side-by-side layout
        let html = `
            <div style="padding: 20px; background: #000; color: #fff;">
                <!-- Header with icon -->
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 30px;">
                    <span style="font-size: 24px;">🤖</span>
                    <h2 style="color: #FF5500; font-size: 24px; margin: 0;">Analysis Results</h2>
                </div>
                
                <!-- Analysis Complete Badge -->
                <div style="text-align: center; margin-bottom: 20px;">
                    <span style="background: rgba(255, 85, 0, 0.2); color: #FF5500; padding: 8px 20px; border-radius: 20px; font-size: 14px; font-weight: 600;">
                        Analysis Complete
                    </span>
                </div>
                
                <!-- Overall Score Section -->
                <div style="text-align: center; margin-bottom: 30px;">
                    <div style="font-size: 72px; font-weight: 800; color: ${scoreColor}; margin-bottom: 10px;">
                        ${overallScore}%
                    </div>
                    <p style="color: #999; font-size: 14px;">Overall Score</p>
                </div>
                
                <!-- Executive Summary -->
                <div style="background: rgba(20, 20, 20, 0.8); border: 1px solid #333; border-radius: 10px; padding: 20px; margin-bottom: 30px;">
                    <h3 style="color: #FF5500; margin-bottom: 15px; font-size: 16px;">Executive Summary</h3>
                    <p style="color: #ccc; line-height: 1.6; font-size: 14px;">
                        ${analysis.executiveSummary || analysis.analysis?.executiveSummary || `Current performance at ${overallScore}%. Key strengths identified with opportunities for strategic improvement across multiple dimensions.`}
                    </p>
                </div>
                
                <!-- Detailed Scoring Section -->
                <div style="margin-bottom: 30px;">
                    <h3 style="color: #FF5500; margin-bottom: 20px; font-size: 18px;">Detailed Scoring</h3>
        `;
        
        // Add detailed scores if available
        if (analysis.detailedScores) {
            const sections = [
                { key: 'problemClarity', name: 'Problem Clarity' },
                { key: 'marketUnderstanding', name: 'Market Understanding' },
                { key: 'customerEmpathy', name: 'Customer Empathy' },
                { key: 'valueQuantification', name: 'Value Quantification' },
                { key: 'solutionDifferentiation', name: 'Solution Differentiation' }
            ];
            
            sections.forEach(section => {
                const detail = analysis.detailedScores[section.key];
                if (detail) {
                    const sectionScore = detail.score || 0;
                    const maxScore = detail.maxScore || 20;
                    const percentage = detail.percentage || Math.round((sectionScore / maxScore) * 100);
                    const sectionColor = percentage >= 80 ? '#4CAF50' : 
                                        percentage >= 60 ? '#FF9800' : '#F44336';
                    
                    // Parse feedback to extract strengths and weaknesses
                    const feedback = detail.feedback || '';
                    const lines = feedback.split('\n').filter(line => line.trim());
                    
                    // Extract the main feedback line
                    const mainFeedback = lines[0] || '';
                    
                    // Extract strengths and weaknesses
                    const strengths = [];
                    const weaknesses = [];
                    
                    lines.forEach(line => {
                        if (line.includes('✓')) {
                            strengths.push(line.replace('✓', '').trim());
                        } else if (line.includes('✗')) {
                            weaknesses.push(line.replace('✗', '').trim());
                        }
                    });
                    
                    html += `
                        <!-- ${section.name} Section -->
                        <div style="background: rgba(20, 20, 20, 0.8); border: 1px solid #333; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
                            <div style="margin-bottom: 15px;">
                                <h4 style="color: #fff; font-size: 16px; margin: 0 0 5px 0;">${section.name}</h4>
                                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                                    <span style="color: ${sectionColor}; font-size: 18px; font-weight: bold;">${percentage}%</span>
                                    <span style="color: #999; font-size: 14px;">(${sectionScore}/${maxScore})</span>
                                </div>
                                ${mainFeedback ? `<p style="color: #999; font-size: 13px; margin-bottom: 15px;">${mainFeedback}</p>` : ''}
                            </div>
                            
                            <!-- CRITICAL: Side-by-side grid layout for strengths and weaknesses -->
                            ${(strengths.length > 0 || weaknesses.length > 0) ? `
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                                <!-- Strengths Column (Left) -->
                                <div>
                                    ${strengths.map(s => `
                                        <div style="display: flex; align-items: start; gap: 8px; margin-bottom: 8px;">
                                            <span style="color: #4CAF50; font-size: 14px; margin-top: 2px;">✓</span>
                                            <span style="color: #ccc; font-size: 13px; line-height: 1.5;">${s}</span>
                                        </div>
                                    `).join('')}
                                </div>
                                
                                <!-- Weaknesses/Improvements Column (Right) -->
                                <div>
                                    ${weaknesses.map(w => `
                                        <div style="display: flex; align-items: start; gap: 8px; margin-bottom: 8px;">
                                            <span style="color: #FF9800; font-size: 14px; margin-top: 2px;">✗</span>
                                            <span style="color: #ccc; font-size: 13px; line-height: 1.5;">${w}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                            ` : ''}
                        </div>
                    `;
                }
            });
        }
        
        html += `</div>`; // Close detailed scoring section
        
        // Add Strategic Recommendations with dropdowns
        if (analysis.recommendations && analysis.recommendations.length > 0) {
            html += `
                <!-- Strategic Recommendations Section -->
                <div style="margin-bottom: 30px;">
                    <h3 style="color: #FF5500; margin-bottom: 20px; font-size: 18px;">Strategic Recommendations</h3>
            `;
            
            analysis.recommendations.forEach((rec, index) => {
                const priorityColor = rec.priority === 'CRITICAL' ? '#F44336' :
                                    rec.priority === 'HIGH' ? '#FF9800' : '#4CAF50';
                
                const impact = rec.expectedImprovement || rec.impact || '5';
                const area = rec.area || rec.action || `Area ${index + 1}`;
                
                // Extract action plan from specificSteps or create default
                const actionPlan = rec.specificSteps || [
                    'Analyze current state and identify gaps',
                    'Define clear objectives and success metrics',
                    'Create implementation roadmap',
                    'Execute with regular checkpoints',
                    'Measure impact and iterate'
                ];
                
                html += `
                    <!-- Recommendation ${index + 1} -->
                    <div style="background: rgba(0, 0, 0, 0.5); border: 1px solid #333; border-radius: 8px; padding: 15px; margin-bottom: 15px;">
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
                            <div style="flex: 1;">
                                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 5px;">
                                    <span style="color: #fff; font-size: 16px; font-weight: 600;">${index + 1}. ${area}</span>
                                    <span style="background: ${priorityColor}; color: white; padding: 3px 10px; border-radius: 12px; font-size: 11px; font-weight: bold;">
                                        ${rec.priority || 'MEDIUM'}
                                    </span>
                                </div>
                            </div>
                            <div style="text-align: right;">
                                <div style="color: #4CAF50; font-size: 20px; font-weight: bold;">
                                    ${typeof impact === 'string' && !impact.includes('+') ? '+' : ''}${impact}
                                </div>
                            </div>
                        </div>
                        
                        <div style="background: rgba(255, 255, 255, 0.05); border-radius: 6px; padding: 12px; margin-top: 10px;">
                            <p style="color: #FF5500; font-size: 12px; font-weight: 600; margin-bottom: 8px;">Action Plan:</p>
                            <ul style="margin: 0; padding-left: 20px; color: #ccc; font-size: 12px; line-height: 1.8;">
                                ${actionPlan.map(step => `<li>${step}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                `;
            });
            
            html += `</div>`;
        }
        
        // Add Action Buttons
        html += `
            <!-- Action Buttons -->
            <div style="display: flex; gap: 15px; justify-content: center; margin-top: 30px;">
                <button onclick="downloadReport()" style="background: #FF5500; color: white; padding: 12px 24px; border: none; border-radius: 25px; font-weight: bold; cursor: pointer; font-size: 14px;">
                    📥 Download Report
                </button>
                <button onclick="switchTab('workspace', null)" style="background: transparent; border: 2px solid #666; color: #999; padding: 12px 24px; border-radius: 25px; font-weight: bold; cursor: pointer; font-size: 14px;">
                    ✏️ Back to Worksheet
                </button>
            </div>
        </div>
        `;
        
        analysisContent.innerHTML = html;
        console.log('✅ Analysis displayed with side-by-side layout');
    };
    
    // Also override displayAnalysisResults for consistency
    window.displayAnalysisResults = function(analysis) {
        console.log('📊 Fixed displayAnalysisResults called');
        window.displayUnifiedAnalysisResults(analysis, 'generic');
    };
    
    // Function to download report (placeholder)
    window.downloadReport = function() {
        console.log('📥 Download report clicked');
        alert('Report download feature coming soon!');
    };
    
    console.log('✅ Complete analysis layout fix applied - side-by-side layout ready');
})();
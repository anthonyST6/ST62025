// Complete fix for analysis display with all enhanced formatting
(function() {
    console.log('🔧 Fixing analysis display with complete enhanced formatting');
    
    // Override the displayAnalysisResults function with the complete enhanced version
    window.displayAnalysisResults = function(analysis) {
        console.log('📊 Displaying enhanced analysis results');
        console.log('Analysis data:', analysis);
        
        const analysisContent = document.getElementById('analysis-content');
        if (!analysisContent) {
            console.error('❌ Analysis content div not found!');
            return;
        }
        
        // Extract score and dimensions
        const score = analysis.score || analysis.overallScore || 0;
        const dimensions = analysis.dimensions || analysis.dimensionScores || [];
        const recommendations = analysis.recommendations || [];
        
        // Generate executive summary based on score
        const executiveSummary = analysis.executiveSummary || analysis.analysis?.executiveSummary || generateExecutiveSummary(score);
        
        // Build the complete HTML with ST6-CLEAN styling
        let html = `
            <div class="workspace-section" style="background: transparent; border: none; padding: 0;">
                <!-- Header with Score -->
                <div style="text-align: center; margin-bottom: 40px;">
                    <h3 style="font-size: 24px; color: #FF5500; margin-bottom: 20px;">Analysis Complete</h3>
                    <div style="display: inline-block; padding: 30px; background: linear-gradient(135deg, rgba(255, 85, 0, 0.1), rgba(255, 85, 0, 0.02)); border-radius: 15px; border: 2px solid #FF5500;">
                        <div style="font-size: 72px; font-weight: 800; color: ${getScoreColor(score)}; margin-bottom: 10px;">
                            ${Math.round(score)}%
                        </div>
                        <div style="font-size: 18px; color: #fff;">Overall Score</div>
                    </div>
                </div>
                
                <!-- Executive Summary -->
                <div style="background: rgba(255, 255, 255, 0.02); padding: 25px; border-radius: 12px; margin-bottom: 30px; border: 1px solid rgba(255, 255, 255, 0.1);">
                    <h3 style="color: #FF5500; margin-bottom: 15px; font-size: 20px;">Executive Summary</h3>
                    <p style="color: #ccc; line-height: 1.8; font-size: 16px;">${executiveSummary}</p>
                </div>
                
                <!-- Detailed Scoring -->
                ${analysis.detailedScores ? `
                <div style="margin-bottom: 40px;">
                    <h3 style="color: #FF5500; margin-bottom: 20px; font-size: 20px;">Detailed Scoring</h3>
                    <div style="display: flex; flex-direction: column; gap: 20px;">
                        ${generateDetailedScores(analysis.detailedScores)}
                    </div>
                </div>
                ` : ''}
                
                <!-- Strategic Recommendations -->
                ${recommendations.length > 0 ? `
                    <div style="margin-bottom: 40px;">
                        <h3 style="color: #FF5500; margin-bottom: 20px; font-size: 20px;">Strategic Recommendations</h3>
                        <div style="display: flex; flex-direction: column; gap: 20px;">
                            ${generateRecommendationCards(recommendations)}
                        </div>
                    </div>
                ` : ''}
                
                <!-- Action Buttons -->
                <div style="display: flex; gap: 15px; margin-top: 30px;">
                    <button class="btn-primary" onclick="downloadCurrentAnalysis()" style="background: #FF5500; color: #fff; border: none; padding: 12px 30px; border-radius: 25px; font-size: 16px; font-weight: 600; cursor: pointer;">
                        📥 Download Report
                    </button>
                    <button class="btn-secondary" onclick="switchTab('workspace', null)" style="background: transparent; color: #FF5500; border: 2px solid #FF5500; padding: 12px 30px; border-radius: 25px; font-size: 16px; font-weight: 600; cursor: pointer;">
                        ✏️ Back to Worksheet
                    </button>
                </div>
            </div>
        `;
        
        analysisContent.innerHTML = html;
        
        // Animate the display
        animateAnalysisDisplay();
    };
    
    // Generate executive summary based on score
    function generateExecutiveSummary(score) {
        if (score >= 90) {
            return "Exceptional GTM readiness (90%+). You demonstrate mastery across all dimensions with only minor refinements needed. Your strong foundation positions you for rapid scaling. Focus on maintaining excellence while pushing for market leadership.";
        } else if (score >= 76) {
            return `Strong GTM foundation (${score}%). You have solid capabilities with room for optimization. Key strengths are evident, with specific areas for enhancement. Strategic improvements will elevate you to exceptional performance.`;
        } else if (score >= 51) {
            return `Developing problem statement (${score}%). While you grasp the general problem space, significant gaps limit your GTM effectiveness. Critical gaps: Fundamental understanding. Immediate focus needed on customer validation and quantification. You can build a strong foundation with dedicated effort.`;
        } else if (score >= 26) {
            return `Basic GTM understanding (${score}%). Foundation needs significant strengthening across multiple dimensions. Priority focus areas require immediate attention. Structured approach needed to build core capabilities.`;
        } else {
            return `Critical gaps identified (${score}%). Fundamental GTM elements need development. Immediate intervention required across all dimensions. Consider seeking mentorship or advisory support to establish basics.`;
        }
    }
    
    // Generate detailed scores HTML
    function generateDetailedScores(detailedScores) {
        if (!detailedScores) return '';
        
        return Object.entries(detailedScores).map(([key, dim]) => {
            const score = dim.percentage || (dim.score && dim.maxScore ? Math.round((dim.score / dim.maxScore) * 100) : 0);
            const actualScore = dim.score || Math.round(score * 20 / 100);
            const maxScore = dim.maxScore || 20;
            
            // Format the dimension name
            const dimensionName = key.replace(/([A-Z])/g, ' $1').trim()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            
            // Parse feedback
            const feedback = dim.feedback || '';
            const feedbackLines = feedback.split('\n').filter(line => line.trim());
            const strengths = feedbackLines.filter(line => line.includes('✓'));
            const improvements = feedbackLines.filter(line => line.includes('✗'));
            
            return `
                <div style="background: rgba(0, 0, 0, 0.5); padding: 20px; border-radius: 10px; border-left: 4px solid ${getScoreColor(score)};">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <h4 style="color: #fff; font-size: 18px; margin: 0;">${dimensionName}</h4>
                        <div style="display: flex; align-items: center; gap: 15px;">
                            <span style="font-size: 24px; font-weight: 700; color: ${getScoreColor(score)};">
                                ${Math.round(score)}%
                            </span>
                            <span style="color: #666; font-size: 14px;">(${actualScore}/${maxScore})</span>
                        </div>
                    </div>
                    
                    <p style="color: #ccc; margin-bottom: 15px; font-size: 14px; line-height: 1.6;">
                        ${feedbackLines[0] || 'Assessment in progress'}
                    </p>
                    
                    ${strengths.length > 0 ? `
                        <div style="margin-bottom: 10px;">
                            ${strengths.map(detail => `
                                <div style="color: #4CAF50; font-size: 13px; padding: 3px 0;">
                                    ${detail}
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                    
                    ${improvements.length > 0 ? `
                        <div>
                            ${improvements.map(improvement => `
                                <div style="color: #FF9800; font-size: 13px; padding: 3px 0;">
                                    ${improvement}
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');
    }
    
    // Generate recommendation cards HTML
    function generateRecommendationCards(recommendations) {
        return recommendations.map((rec, index) => {
            const priority = rec.priority || 'MEDIUM';
            const priorityColor = priority === 'CRITICAL' ? '#F44336' : 
                                priority === 'HIGH' ? '#FF9800' : '#FFC107';
            const points = rec.expectedImprovement || rec.points || rec.impact || '';
            
            return `
                <div style="background: rgba(0, 0, 0, 0.5); padding: 25px; border-radius: 10px; border: 1px solid rgba(255, 255, 255, 0.1);">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
                        <div style="flex: 1;">
                            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
                                <span style="font-size: 20px; font-weight: 700; color: #FF5500;">${index + 1}.</span>
                                <h4 style="color: #fff; font-size: 18px; margin: 0;">
                                    ${rec.action || rec.area || rec.dimension || 'Improvement Area'}
                                </h4>
                            </div>
                        </div>
                        <div style="display: flex; gap: 10px; align-items: center;">
                            <span style="background: ${priorityColor}; color: #000; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700;">
                                ${priority}
                            </span>
                            ${points ? `
                            <span style="background: rgba(76, 175, 80, 0.2); color: #4CAF50; padding: 4px 12px; border-radius: 20px; font-size: 14px; font-weight: 600;">
                                ${points}
                            </span>
                            ` : ''}
                        </div>
                    </div>
                    
                    ${rec.implementationPlan && rec.implementationPlan.length > 0 ? `
                        <div style="background: rgba(255, 255, 255, 0.02); padding: 15px; border-radius: 8px; border-left: 3px solid #FF5500;">
                            <h5 style="color: #FF5500; margin-bottom: 10px; font-size: 14px;">Action Plan:</h5>
                            <ul style="list-style: none; padding: 0; margin: 0;">
                                ${rec.implementationPlan.map(item => `
                                    <li style="color: #ccc; font-size: 13px; padding: 5px 0; padding-left: 20px; position: relative;">
                                        <span style="position: absolute; left: 0; color: #FF5500;">▸</span>
                                        ${item}
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    ` : rec.actionPlan ? `
                        <div style="background: rgba(255, 255, 255, 0.02); padding: 15px; border-radius: 8px; border-left: 3px solid #FF5500;">
                            <h5 style="color: #FF5500; margin-bottom: 10px; font-size: 14px;">Action Plan:</h5>
                            <p style="color: #ccc; font-size: 13px; line-height: 1.6; margin: 0;">
                                ${rec.actionPlan}
                            </p>
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');
    }
    
    // Get color based on score
    function getScoreColor(score) {
        if (score >= 90) return '#4CAF50';
        if (score >= 76) return '#8BC34A';
        if (score >= 51) return '#FFC107';
        if (score >= 26) return '#FF9800';
        return '#F44336';
    }
    
    // Animate the analysis display
    function animateAnalysisDisplay() {
        const elements = document.querySelectorAll('.workspace-section > div');
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'all 0.5s ease';
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    console.log('✅ Analysis display fix applied - enhanced formatting enabled');
})();
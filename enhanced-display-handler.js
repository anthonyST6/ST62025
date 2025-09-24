// Enhanced Display Handler for ALL Mission Discovery Subcomponents
// This provides the same rich display format as Problem Statement for all subcomponents

(function() {
    console.log('🎨 Enhanced Display Handler loaded - Universal Version');
    
    // Define the enhanced display function that all subcomponents will use
    window.displayEnhancedAnalysisResults = function(analysis, worksheetType) {
        console.log('🎨 Displaying enhanced analysis results for:', worksheetType || 'unknown');
        
        const analysisContent = document.getElementById('analysis-content');
        if (!analysisContent) {
            console.error('❌ Analysis content area not found!');
            return;
        }
        
        // Check if analysis data exists and has a score
        if (!analysis || typeof analysis.score === 'undefined') {
            console.log('⚠️ No analysis data available for enhanced display');
            analysisContent.innerHTML = `
                <div style="text-align: center; padding: 60px 20px; color: #999;">
                    <div style="font-size: 48px; margin-bottom: 20px;">📊</div>
                    <h3 style="font-size: 24px; margin-bottom: 10px; color: #fff;">No Analysis Yet</h3>
                    <p style="font-size: 16px; margin-bottom: 30px;">Complete the interactive worksheet and click "Analyze Results" to get AI-powered feedback</p>
                    <button class="btn-primary" onclick="switchTab('workspace', null); document.querySelector('[data-tab=workspace]').click();">
                        Go to Workspace
                    </button>
                </div>
            `;
            return;
        }
        
        const scoreColor = analysis.score >= 80 ? '#4CAF50' :
                          analysis.score >= 60 ? '#FF9800' : '#F44336';
        
        // Customize title based on worksheet type - covers ALL phases
        const analysisTitle = getAnalysisTitle(worksheetType);
        
        function getAnalysisTitle(type) {
            const titles = {
                // Phase 1: Mission Discovery
                'problem-statement': 'Problem Statement Analysis',
                'mission-statement': 'Mission Statement Analysis',
                'customer-insight': 'Customer Insight Analysis',
                'team-capability': 'Team Capability Analysis',
                'market-insight': 'Market Insight Analysis',
                'prototype-launch': 'Prototype Launch Analysis',
                
                // Phase 2: Customer Insights
                'interview-cadence': 'Interview Cadence Analysis',
                'personas-framework': 'Personas Framework Analysis',
                'pain-point-mapping': 'Pain Point Mapping Analysis',
                'jtbd-capture': 'Jobs-to-be-Done Analysis',
                'signal-grading': 'Signal Grading Analysis',
                'insight-action': 'Insight-to-Action Analysis',
                
                // Phase 3: Strategic Prioritization
                'use-case-scoring': 'Use Case Scoring Analysis',
                'segment-tiering': 'Segment Tiering Analysis',
                'prioritization-rubric': 'Prioritization Rubric Analysis',
                'tradeoff-tracker': 'Tradeoff Tracker Analysis',
                'hypothesis-board': 'Hypothesis Board Analysis',
                'decision-archive': 'Decision Archive Analysis',
                
                // Phase 4: GTM Execution
                'early-adopter-wins': 'Early Adopter Wins Analysis',
                'customer-flywheel': 'Customer Flywheel Analysis',
                'quantifiable-impact': 'Quantifiable Impact Analysis',
                'customer-expansion': 'Customer Expansion Analysis',
                'proof-execution': 'Proof of Execution Analysis',
                
                // Phase 5: Scale
                'sales-empowerment': 'Sales Empowerment Analysis',
                'high-performance-teams': 'High Performance Teams Analysis',
                'retention-systems': 'Retention Systems Analysis',
                'market-domination': 'Market Domination Analysis',
                'operational-infrastructure': 'Operational Infrastructure Analysis',
                'leadership-expansion': 'Leadership Expansion Analysis',
                'global-expansion': 'Global Expansion Analysis'
            };
            
            return titles[type] || 'Worksheet Analysis';
        }
        
        let html = `
            <div class="analysis-results-container">
                <!-- Overall Score Section -->
                <div style="background: rgba(255, 255, 255, 0.02); border-radius: 15px; padding: 30px; margin-bottom: 30px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h3 style="font-size: 28px; margin-bottom: 10px;">Overall Score</h3>
                            <p style="color: #999;">Based on GTM best practices and industry standards</p>
                            <p style="color: #666; font-size: 14px;">Confidence: ${Math.round((analysis.confidence || 0.9) * 100)}%</p>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 72px; font-weight: 800; color: ${scoreColor};">
                                ${analysis.score}%
                            </div>
                        </div>
                    </div>
                    
                    ${analysis.analysis?.executiveSummary ? `
                        <div style="background: rgba(0, 0, 0, 0.3); border-radius: 10px; padding: 20px; margin-top: 20px;">
                            <h4 style="color: #FF5500; margin-bottom: 15px;">Executive Summary</h4>
                            <p style="line-height: 1.8; color: #ccc;">${analysis.analysis.executiveSummary}</p>
                        </div>
                    ` : ''}
                </div>
                
                <!-- Detailed Scores with Strengths/Improvements -->
                ${analysis.detailedScores ? `
                    <div style="margin-bottom: 30px;">
                        ${Object.entries(analysis.detailedScores).map(([key, value]) => {
                            const displayName = key.replace(/([A-Z])/g, ' $1').trim()
                                .split(' ')
                                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(' ');
                            
                            const score = typeof value.score === 'number' ? value.score :
                                         typeof value === 'number' ? value : 0;
                            const maxScore = typeof value.maxScore === 'number' ? value.maxScore : 20;
                            const percentage = typeof value.percentage === 'number' ? value.percentage :
                                              (maxScore > 0 ? Math.round((score / maxScore) * 100) : 0);
                            
                            // Parse feedback to extract strengths and areas for improvement
                            let strengths = [];
                            let improvements = [];
                            
                            if (value.feedback) {
                                const feedbackLines = value.feedback.split('\\n');
                                feedbackLines.forEach(line => {
                                    const trimmedLine = line.trim();
                                    if (trimmedLine.startsWith('✓')) {
                                        strengths.push(trimmedLine.substring(1).trim());
                                    } else if (trimmedLine.startsWith('✗')) {
                                        improvements.push(trimmedLine.substring(1).trim());
                                    }
                                });
                            }
                            
                            return `
                                <div style="background: rgba(255, 255, 255, 0.02); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                                        <span style="color: #FF5500; font-weight: 600; font-size: 18px;">${displayName}</span>
                                        <span style="color: #fff; font-size: 18px; font-weight: 600;">${score}/${maxScore} <span style="color: #FF5500;">${percentage}%</span></span>
                                    </div>
                                    <div style="height: 8px; background: rgba(255, 255, 255, 0.1); border-radius: 4px; overflow: hidden; margin-bottom: 20px;">
                                        <div style="width: ${percentage}%; height: 100%; background: linear-gradient(90deg, #FF5500, #FF8800);"></div>
                                    </div>
                                    
                                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                                        ${strengths.length > 0 ? `
                                            <div style="background: rgba(76, 175, 80, 0.1); border: 1px solid rgba(76, 175, 80, 0.3); border-radius: 8px; padding: 15px;">
                                                <h5 style="color: #4CAF50; margin: 0 0 10px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">STRENGTHS</h5>
                                                <ul style="margin: 0; padding-left: 20px; color: #ccc;">
                                                    ${strengths.map(s => `<li style="margin-bottom: 5px;">${s}</li>`).join('')}
                                                </ul>
                                            </div>
                                        ` : '<div></div>'}
                                        
                                        ${improvements.length > 0 ? `
                                            <div style="background: rgba(244, 67, 54, 0.1); border: 1px solid rgba(244, 67, 54, 0.3); border-radius: 8px; padding: 15px;">
                                                <h5 style="color: #F44336; margin: 0 0 10px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">AREAS FOR IMPROVEMENT</h5>
                                                <ul style="margin: 0; padding-left: 20px; color: #ccc;">
                                                    ${improvements.map(i => `<li style="margin-bottom: 5px;">${i}</li>`).join('')}
                                                </ul>
                                            </div>
                                        ` : '<div></div>'}
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                ` : ''}
                
                <!-- Strategic Recommendations Section -->
                ${analysis.recommendations && analysis.recommendations.length > 0 ? `
                    <h3 style="color: #FF5500; margin-bottom: 20px; font-size: 24px;">
                        🎯 Strategic Recommendations
                    </h3>
                    ${analysis.recommendations.map((rec, index) => {
                        const priorityColor = rec.priority === 'CRITICAL' ? '#DC2626' :
                                            rec.priority === 'HIGH' ? '#EF4444' : 
                                            rec.priority === 'MEDIUM' ? '#F59E0B' : '#10B981';
                        
                        const priorityBg = rec.priority === 'CRITICAL' ? 'rgba(220, 38, 38, 0.1)' :
                                         rec.priority === 'HIGH' ? 'rgba(239, 68, 68, 0.1)' :
                                         rec.priority === 'MEDIUM' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(16, 185, 129, 0.1)';
                        
                        // Format expected improvement with + sign
                        // Handle both 'impact' (new format) and 'expectedImprovement' (old format)
                        let expectedImprovement = rec.impact || rec.expectedImprovement || '+5';
                        
                        // If it's just a number, add the + sign
                        if (!expectedImprovement.toString().startsWith('+')) {
                            expectedImprovement = '+' + expectedImprovement;
                        }
                        // Remove "points" if it's already there to avoid duplication
                        expectedImprovement = expectedImprovement.toString().replace(/\s*points?/i, '');
                        
                        const recommendationId = 'rec-' + index;
                        
                        return `
                            <div style="
                                background: rgba(0, 0, 0, 0.5);
                                border: 1px solid rgba(255, 255, 255, 0.1);
                                border-radius: 12px;
                                margin-bottom: 15px;
                                overflow: hidden;
                                transition: all 0.3s ease;
                            " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 24px rgba(255, 85, 0, 0.2)'" 
                               onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                                
                                <div style="padding: 20px; cursor: pointer;" onclick="toggleRecommendation('${recommendationId}')">
                                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                                        <div style="flex: 1;">
                                            <h4 style="color: #FF5500; margin: 0 0 8px 0; font-size: 18px; font-weight: 600; display: flex; align-items: center;">
                                                <span id="${recommendationId}-arrow" style="display: inline-block; margin-right: 10px; transition: transform 0.3s ease;">▶</span>
                                                ${rec.area || 'Recommendation ' + (index + 1)}
                                            </h4>
                                            <p style="color: #ccc; margin: 0 0 10px 0; font-size: 15px;">
                                                ${rec.action || 'Improve this aspect of your strategy'}
                                            </p>
                                            <div style="display: flex; align-items: center; gap: 15px;">
                                                <span style="
                                                    background: ${priorityBg};
                                                    border: 1px solid ${priorityColor};
                                                    color: ${priorityColor};
                                                    padding: 4px 10px;
                                                    border-radius: 20px;
                                                    font-size: 11px;
                                                    font-weight: 700;
                                                    text-transform: uppercase;
                                                ">
                                                    ${rec.priority || 'MEDIUM'}
                                                </span>
                                                <div style="
                                                    color: #10B981;
                                                    font-size: 14px;
                                                    font-weight: 600;
                                                    display: flex;
                                                    align-items: center;
                                                    gap: 6px;
                                                ">
                                                    <span>EXPECTED IMPACT</span>
                                                    <span style="font-size: 18px; font-weight: 700;">${expectedImprovement}</span>
                                                    <span>points</span>
                                                </div>
                                                <div style="
                                                    color: #999;
                                                    font-size: 12px;
                                                    display: flex;
                                                    align-items: center;
                                                    gap: 6px;
                                                ">
                                                    <span style="width: 8px; height: 8px; background: #666; border-radius: 50%;"></span>
                                                    <span>${rec.effort || 'Low'} effort</span>
                                                    <span style="width: 8px; height: 8px; background: #666; border-radius: 50%; margin-left: 10px;"></span>
                                                    <span>${rec.completion || '50%'} complete</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div style="text-align: right; color: #666; font-size: 12px;">
                                            Click for details →
                                        </div>
                                    </div>
                                </div>
                                
                                <div id="${recommendationId}-content" style="max-height: 0; overflow: hidden; transition: max-height 0.3s ease;">
                                    <div style="padding: 0 20px 20px 20px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                                        ${((rec.actionPlan && Array.isArray(rec.actionPlan) && rec.actionPlan.length > 0) ||
                                           (rec.specificSteps && Array.isArray(rec.specificSteps) && rec.specificSteps.length > 0)) ? `
                                            <div style="margin-top: 20px;">
                                                <h5 style="color: #FF5500; margin-bottom: 15px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                                                    📋 Action Plan:
                                                </h5>
                                                <ol style="margin: 0; padding-left: 20px; color: #ccc; line-height: 1.8;">
                                                    ${(rec.actionPlan || rec.specificSteps || []).map(step => `
                                                        <li style="margin-bottom: 10px;">
                                                            <span style="color: #fff; font-weight: 500;">${step}</span>
                                                        </li>
                                                    `).join('')}
                                                </ol>
                                            </div>
                                        ` : ''}
                                        
                                        ${(rec.recommendations && Array.isArray(rec.recommendations) && rec.recommendations.length > 0) ? `
                                            <div style="margin-top: 20px;">
                                                <h5 style="color: #FF5500; margin-bottom: 10px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                                                    💡 Actionable Recommendations:
                                                </h5>
                                                <ul style="margin: 0; padding-left: 20px; color: #ccc; line-height: 1.8;">
                                                    ${rec.recommendations.map(recommendation => `
                                                        <li style="margin-bottom: 8px;">
                                                            <span style="color: #fff; font-weight: 500;">${recommendation}</span>
                                                        </li>
                                                    `).join('')}
                                                </ul>
                                            </div>
                                        ` : ''}
                                        
                                        ${rec.successMetrics && Array.isArray(rec.successMetrics) && rec.successMetrics.length > 0 ? `
                                            <div style="margin-top: 20px;">
                                                <h5 style="color: #FF5500; margin-bottom: 10px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                                                    ✅ Success Metrics:
                                                </h5>
                                                <ul style="margin: 0; padding-left: 20px; color: #10B981; line-height: 1.8;">
                                                    ${rec.successMetrics.map(metric => `
                                                        <li style="margin-bottom: 5px;">${metric}</li>
                                                    `).join('')}
                                                </ul>
                                            </div>
                                        ` : ''}
                                        
                                        ${rec.resources && Array.isArray(rec.resources) && rec.resources.length > 0 ? `
                                            <div style="margin-top: 20px;">
                                                <h5 style="color: #FF5500; margin-bottom: 10px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                                                    📚 Resources:
                                                </h5>
                                                <ul style="margin: 0; padding-left: 20px; color: #999;">
                                                    ${rec.resources.map(resource => `<li style="margin-bottom: 5px;">${resource}</li>`).join('')}
                                                </ul>
                                            </div>
                                        ` : ''}
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                    
                    <!-- Implementation Summary -->
                    <div style="
                        background: rgba(255, 85, 0, 0.05);
                        border: 1px solid rgba(255, 85, 0, 0.2);
                        border-radius: 12px;
                        padding: 20px;
                        margin-top: 30px;
                    ">
                        <h4 style="color: #FF5500; margin: 0 0 20px 0;">Implementation Summary</h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                            <div>
                                <div style="color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                                    TOTAL IMPROVEMENT POTENTIAL
                                </div>
                                <div style="color: #10B981; font-size: 28px; font-weight: 700;">
                                    +${analysis.recommendations.reduce((sum, r) => {
                                        const improvement = parseInt(r.expectedImprovement?.toString().replace(/[^0-9]/g, '') || '5');
                                        return sum + improvement;
                                    }, 0)} points
                                </div>
                            </div>
                            <div>
                                <div style="color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                                    PRIORITY ACTIONS
                                </div>
                                <div style="display: flex; gap: 15px;">
                                    <div style="color: #DC2626; font-size: 24px; font-weight: 700;">
                                        ${analysis.recommendations.filter(r => r.priority === 'CRITICAL').length} critical
                                    </div>
                                    ${analysis.recommendations.filter(r => r.priority === 'HIGH').length > 0 ? `
                                        <div style="color: #EF4444; font-size: 24px; font-weight: 700;">
                                            ${analysis.recommendations.filter(r => r.priority === 'HIGH').length} high
                                        </div>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                ` : ''}
                
                <!-- Action Buttons -->
                <div style="display: flex; gap: 15px; margin-top: 30px;">
                    <button class="btn-secondary" onclick="switchTab('workspace', null); document.querySelector('[data-tab=workspace]').click();">
                        Refine Worksheet
                    </button>
                    <button class="btn-secondary" onclick="if(window.showScoreHistory) window.showScoreHistory();">
                        View Score History
                    </button>
                </div>
                
                <!-- Success Message -->
                <div style="
                    background: rgba(76, 175, 80, 0.1);
                    border: 1px solid rgba(76, 175, 80, 0.3);
                    border-radius: 8px;
                    padding: 15px;
                    margin-top: 20px;
                    color: #4CAF50;
                    font-size: 14px;
                ">
                    ✓ Score automatically saved to Score History
                </div>
            </div>
        `;
        
        analysisContent.innerHTML = html;
        
        // Set up recommendation click handlers
        console.log('[DEBUG] Setting up recommendation click handlers');
        const cards = document.querySelectorAll('.recommendation-card');
        console.log('[DEBUG] Found recommendation cards:', cards.length);
        
        console.log('✅ Enhanced analysis results displayed successfully');
    };
    
    // Define toggleRecommendation function globally
    window.toggleRecommendation = function(id) {
        const content = document.getElementById(id + '-content');
        const arrow = document.getElementById(id + '-arrow');
        
        if (content && arrow) {
            if (content.style.maxHeight && content.style.maxHeight !== '0px') {
                content.style.maxHeight = '0';
                arrow.style.transform = 'rotate(0deg)';
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                arrow.style.transform = 'rotate(90deg)';
            }
        }
    };
    
    // Override the unified handler's display function to use our enhanced version
    if (window.unifiedAnalysisHandler) {
        const originalDisplay = window.unifiedAnalysisHandler.displayUnifiedAnalysisResults;
        window.unifiedAnalysisHandler.displayUnifiedAnalysisResults = function(analysis, worksheetType) {
            console.log('🔄 Redirecting to enhanced display handler');
            window.displayEnhancedAnalysisResults(analysis, worksheetType);
        };
    }
    
    // Also set as the default displayAnalysisResults
    window.displayAnalysisResults = function(analysis) {
        // Check if analysis data exists and has a score
        if (!analysis || typeof analysis.score === 'undefined') {
            console.log('⚠️ No analysis data available yet');
            const analysisContent = document.getElementById('analysis-content');
            if (analysisContent) {
                analysisContent.innerHTML = `
                    <div style="text-align: center; padding: 60px 20px; color: #999;">
                        <div style="font-size: 48px; margin-bottom: 20px;">📊</div>
                        <h3 style="font-size: 24px; margin-bottom: 10px; color: #fff;">No Analysis Yet</h3>
                        <p style="font-size: 16px; margin-bottom: 30px;">Complete the interactive worksheet and click "Analyze Results" to get AI-powered feedback</p>
                        <button class="btn-primary" onclick="switchTab('workspace', null); document.querySelector('[data-tab=workspace]').click();">
                            Go to Workspace
                        </button>
                    </div>
                `;
            }
            return;
        }
        
        // Try to detect worksheet type from the page
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '';
        
        let worksheetType = 'generic';
        
        // Phase 1: Mission Discovery (Idea-Market Fit)
        if (subcomponentId === '1-1') worksheetType = 'problem-statement';
        else if (subcomponentId === '1-2') worksheetType = 'mission-statement';
        else if (subcomponentId === '1-3') worksheetType = 'customer-insight';
        else if (subcomponentId === '1-4') worksheetType = 'team-capability';
        else if (subcomponentId === '1-5') worksheetType = 'market-insight';
        else if (subcomponentId === '1-6') worksheetType = 'prototype-launch';
        
        // Phase 2: Customer Insights (Product-Market Fit)
        else if (subcomponentId === '2-1') worksheetType = 'interview-cadence';
        else if (subcomponentId === '2-2') worksheetType = 'personas-framework';
        else if (subcomponentId === '2-3') worksheetType = 'pain-point-mapping';
        else if (subcomponentId === '2-4') worksheetType = 'jtbd-capture';
        else if (subcomponentId === '2-5') worksheetType = 'signal-grading';
        else if (subcomponentId === '2-6') worksheetType = 'insight-action';
        
        // Phase 3: Strategic Prioritization (Value Prop Proof)
        else if (subcomponentId === '3-1') worksheetType = 'use-case-scoring';
        else if (subcomponentId === '3-2') worksheetType = 'segment-tiering';
        else if (subcomponentId === '3-3') worksheetType = 'prioritization-rubric';
        else if (subcomponentId === '3-4') worksheetType = 'tradeoff-tracker';
        else if (subcomponentId === '3-5') worksheetType = 'hypothesis-board';
        else if (subcomponentId === '3-6') worksheetType = 'decision-archive';
        
        // Phase 4: GTM Execution
        else if (subcomponentId === '4-1') worksheetType = 'prototype-launch';
        else if (subcomponentId === '4-2') worksheetType = 'early-adopter-wins';
        else if (subcomponentId === '4-3') worksheetType = 'customer-flywheel';
        else if (subcomponentId === '4-4') worksheetType = 'quantifiable-impact';
        else if (subcomponentId === '4-5') worksheetType = 'customer-expansion';
        else if (subcomponentId === '4-6') worksheetType = 'proof-execution';
        
        // Phase 5: Scale
        else if (subcomponentId === '5-1') worksheetType = 'sales-empowerment';
        else if (subcomponentId === '5-2') worksheetType = 'high-performance-teams';
        else if (subcomponentId === '5-3') worksheetType = 'retention-systems';
        else if (subcomponentId === '5-4') worksheetType = 'market-domination';
        else if (subcomponentId === '5-5') worksheetType = 'operational-infrastructure';
        else if (subcomponentId === '5-6') worksheetType = 'leadership-expansion';
        else if (subcomponentId === '5-7') worksheetType = 'global-expansion';
        
        window.displayEnhancedAnalysisResults(analysis, worksheetType);
    };
    
    console.log('✅ Enhanced Display Handler ready - All subcomponents will use rich display format');
})();
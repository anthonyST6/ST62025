/**
 * SAFE Executive Summary Layout Fix - Frontend Display Only
 * 
 * This script ONLY modifies the visual presentation of analysis results.
 * It does NOT touch:
 * - API endpoints
 * - Server files
 * - Data generation logic
 * - Score calculation
 * - Database operations
 * 
 * It can be safely disabled by removing the script tag from subcomponent-detail.html
 */

(function() {
    'use strict';
    
    console.log('🎨 Applying Executive Summary Layout Fix (Frontend Only)...');
    
    // Wait for the analysis display function to be available
    const originalDisplayFunction = window.displayEnhancedAnalysisResults || window.showAnalysisResults || window.displayAnalysisResults;
    
    if (!originalDisplayFunction) {
        console.warn('⚠️ No analysis display function found yet, will override when available');
    }
    
    /**
     * Enhanced display function that matches the screenshot layout
     * Takes existing analysis data and reformats the display only
     */
    window.displayEnhancedAnalysisResults = function(analysisData, displayMode = 'comprehensive') {
        console.log('🎨 Rendering Executive Summary with new layout...');
        
        const analysisContent = document.getElementById('analysis-content');
        if (!analysisContent) {
            console.error('❌ Analysis content container not found');
            return;
        }
        
        // Extract data from analysis result
        const score = Math.round(analysisData.score || analysisData.overallScore || 0);
        const executiveSummary = analysisData.executiveSummary || '';
        const dimensions = analysisData.dimensions || [];
        const strengths = analysisData.strengths || [];
        const weaknesses = analysisData.weaknesses || [];
        
        // Build the new layout matching the screenshot
        let html = `
            <div style="padding: 40px; max-width: 1400px; margin: 0 auto;">
                
                <!-- TOP: Large Centered Score (like screenshot) -->
                <div style="text-align: center; margin-bottom: 50px;">
                    <div style="
                        display: inline-block;
                        background: rgba(255, 255, 255, 0.02);
                        border: 3px solid ${getScoreColor(score)};
                        border-radius: 20px;
                        padding: 40px 60px;
                        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                    ">
                        <div style="
                            font-size: 96px;
                            font-weight: 800;
                            color: ${getScoreColor(score)};
                            line-height: 1;
                            margin-bottom: 10px;
                            text-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
                        ">${score}%</div>
                        <div style="
                            font-size: 14px;
                            color: #999;
                            text-transform: uppercase;
                            letter-spacing: 2px;
                            font-weight: 600;
                        ">OVERALL SCORE</div>
                    </div>
                </div>
                
                <!-- EXECUTIVE SUMMARY SECTION (like screenshot) -->
                <div style="
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 15px;
                    padding: 40px;
                    margin-bottom: 40px;
                ">
                    <h2 style="
                        color: #FF5500;
                        font-size: 24px;
                        font-weight: 700;
                        margin: 0 0 30px 0;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    ">
                        <span>📋</span> EXECUTIVE SUMMARY
                    </h2>
                    
                    ${executiveSummary || generateDefaultSummary(score, dimensions, strengths, weaknesses)}
                </div>
                
                <!-- DIMENSION ANALYSIS (Detailed breakdown with original colors) -->
                <div style="margin-bottom: 40px;">
                    <h2 style="
                        color: #FF5500;
                        font-size: 24px;
                        font-weight: 700;
                        margin: 0 0 30px 0;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    ">
                        <span>📊</span> Dimension Analysis
                    </h2>
                    
                    <div style="display: grid; gap: 25px;">
                        ${dimensions.map((dim, index) => renderDimensionCard(dim, index)).join('')}
                    </div>
                </div>
                
                <!-- PERFORMANCE ANALYSIS (Strengths & Improvements side-by-side) -->
                <div style="margin-bottom: 40px;">
                    <h2 style="
                        color: #FF5500;
                        font-size: 24px;
                        font-weight: 700;
                        margin: 0 0 30px 0;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    ">
                        <span>💪</span> Performance Analysis
                    </h2>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                        <!-- Strengths Column -->
                        <div style="
                            background: rgba(76, 175, 80, 0.05);
                            border: 2px solid rgba(76, 175, 80, 0.3);
                            border-radius: 12px;
                            padding: 30px;
                        ">
                            <h3 style="
                                color: #4CAF50;
                                font-size: 20px;
                                font-weight: 700;
                                margin: 0 0 20px 0;
                                display: flex;
                                align-items: center;
                                gap: 8px;
                            ">
                                <span>✅</span> STRENGTHS
                            </h3>
                            <div style="display: flex; flex-direction: column; gap: 15px;">
                                ${strengths.slice(0, 10).map(strength => `
                                    <div style="
                                        display: flex;
                                        align-items: start;
                                        gap: 10px;
                                        padding: 12px;
                                        background: rgba(76, 175, 80, 0.08);
                                        border-radius: 8px;
                                        border-left: 3px solid #4CAF50;
                                    ">
                                        <span style="color: #4CAF50; font-size: 18px; flex-shrink: 0;">✓</span>
                                        <span style="color: #e0e0e0; line-height: 1.6; font-size: 15px;">${strength}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <!-- Improvements Column -->
                        <div style="
                            background: rgba(255, 152, 0, 0.05);
                            border: 2px solid rgba(255, 152, 0, 0.3);
                            border-radius: 12px;
                            padding: 30px;
                        ">
                            <h3 style="
                                color: #FF9800;
                                font-size: 20px;
                                font-weight: 700;
                                margin: 0 0 20px 0;
                                display: flex;
                                align-items: center;
                                gap: 8px;
                            ">
                                <span>🎯</span> AREAS FOR IMPROVEMENT
                            </h3>
                            <div style="display: flex; flex-direction: column; gap: 15px;">
                                ${weaknesses.slice(0, 10).map(weakness => `
                                    <div style="
                                        display: flex;
                                        align-items: start;
                                        gap: 10px;
                                        padding: 12px;
                                        background: rgba(255, 152, 0, 0.08);
                                        border-radius: 8px;
                                        border-left: 3px solid #FF9800;
                                    ">
                                        <span style="color: #FF9800; font-size: 18px; flex-shrink: 0;">!</span>
                                        <span style="color: #e0e0e0; line-height: 1.6; font-size: 15px;">${weakness}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Action Buttons -->
                <div style="display: flex; gap: 15px; justify-content: center; margin-top: 40px;">
                    <button onclick="window.downloadAnalysisReport && window.downloadAnalysisReport('${subcomponentId}', window.currentAnalysis || {})" style="
                        background: linear-gradient(135deg, #FF5500, #FF8800);
                        color: white;
                        border: none;
                        padding: 15px 30px;
                        border-radius: 10px;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    ">
                        <span>📄</span> Download Report
                    </button>
                    <button onclick="window.switchTab && window.switchTab('workspace', null)" style="
                        background: transparent;
                        color: #FF5500;
                        border: 2px solid #FF5500;
                        padding: 15px 30px;
                        border-radius: 10px;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    ">
                        <span>🔧</span> Back to Worksheet
                    </button>
                    <button onclick="navigator.share && navigator.share({title: 'Analysis Results', text: 'Check out my analysis results!', url: window.location.href})" style="
                        background: transparent;
                        color: #4CAF50;
                        border: 2px solid #4CAF50;
                        padding: 15px 30px;
                        border-radius: 10px;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    ">
                        <span>🔗</span> Share Results
                    </button>
                </div>
            </div>
        `;
        
        analysisContent.innerHTML = html;
        
        // Scroll to top of analysis
        analysisContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        console.log('✅ Executive Summary layout applied successfully');
    };
    
    /**
     * Render individual dimension card with all details
     */
    function renderDimensionCard(dimension) {
        const dimScore = Math.round(dimension.score || 0);
        const dimName = dimension.name || dimension.dimension || 'Dimension';
        const dimWeight = dimension.weight || 20;
        const dimPercentage = Math.round((dimScore / 20) * 100);
        const dimFeedback = dimension.feedback || '';
        const dimStrengths = dimension.strengths || [];
        const dimImprovements = dimension.improvements || [];
        
        const scoreLabel = dimPercentage >= 85 ? 'Excellent' :
                          dimPercentage >= 70 ? 'Good' :
                          dimPercentage >= 55 ? 'Developing' : 'Needs Work';
        
        return `
            <div style="
                background: rgba(255, 255, 255, 0.02);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                padding: 25px;
            ">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 20px;">
                    <div style="flex: 1;">
                        <h3 style="color: #fff; font-size: 18px; font-weight: 600; margin: 0 0 5px 0;">
                            ${dimName}
                        </h3>
                        <div style="color: #999; font-size: 14px;">
                            ${dimWeight}% weight
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 32px; font-weight: 700; color: ${getScoreColor(dimPercentage)}; line-height: 1;">
                            ${dimPercentage}%
                        </div>
                        <div style="color: ${getScoreColor(dimPercentage)}; font-size: 12px; font-weight: 600; margin-top: 4px;">
                            ${scoreLabel}
                        </div>
                    </div>
                </div>
                
                ${dimFeedback ? `
                    <p style="color: #ccc; line-height: 1.7; margin-bottom: 20px; font-size: 15px;">
                        ${dimFeedback}
                    </p>
                ` : ''}
                
                ${dimStrengths.length > 0 ? `
                    <div style="margin-bottom: 15px;">
                        <h4 style="color: #4CAF50; font-size: 14px; font-weight: 600; margin: 0 0 10px 0; display: flex; align-items: center; gap: 6px;">
                            <span>✅</span> Strengths
                        </h4>
                        ${dimStrengths.map(s => `
                            <div style="
                                color: #e0e0e0;
                                font-size: 14px;
                                line-height: 1.6;
                                padding: 8px 0 8px 20px;
                                border-left: 2px solid rgba(76, 175, 80, 0.3);
                                margin-bottom: 8px;
                            ">•${s}</div>
                        `).join('')}
                    </div>
                ` : ''}
                
                ${dimImprovements.length > 0 ? `
                    <div>
                        <h4 style="color: #FF9800; font-size: 14px; font-weight: 600; margin: 0 0 10px 0; display: flex; align-items: center; gap: 6px;">
                            <span>⚡</span> Improvements
                        </h4>
                        ${dimImprovements.map(i => `
                            <div style="
                                color: #e0e0e0;
                                font-size: 14px;
                                line-height: 1.6;
                                padding: 8px 0 8px 20px;
                                border-left: 2px solid rgba(255, 152, 0, 0.3);
                                margin-bottom: 8px;
                            ">•${i}</div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    }
    
    /**
     * Generate default summary if none provided
     */
    function generateDefaultSummary(score, dimensions, strengths, weaknesses) {
        const performanceLevel = score >= 85 ? 'exceptional' :
                                score >= 70 ? 'strong' :
                                score >= 55 ? 'solid' : 'developing';
        
        let summary = `
            <div style="margin-bottom: 32px;">
                <h3 style="color: #FF5500; font-size: 20px; font-weight: 700; margin: 0 0 16px 0; display: flex; align-items: center; gap: 8px;">
                    <span>🎯</span> Overall Assessment
                </h3>
                <p style="margin: 0; line-height: 1.8; font-size: 17px; color: #e0e0e0;">
                    Overall, you demonstrate ${performanceLevel} performance with a ${score}% score. 
                    ${dimensions.length > 0 ? `Your strongest areas include ${dimensions.filter(d => (d.score || 0) >= 17).map(d => d.name || d.dimension).slice(0, 2).join(' and ')}.` : ''}
                    ${score < 85 ? 'Focus on the priority areas below to elevate your performance to exceptional levels.' : 'Maintain your current excellence while exploring optimization opportunities.'}
                </p>
            </div>
        `;
        
        // What's Working section
        if (strengths.length > 0) {
            summary += `
                <div style="margin-bottom: 32px; padding: 20px; background: rgba(76, 175, 80, 0.08); border-left: 4px solid #4CAF50; border-radius: 8px;">
                    <h3 style="color: #4CAF50; font-size: 20px; font-weight: 700; margin: 0 0 16px 0; display: flex; align-items: center; gap: 8px;">
                        <span>✅</span> What's Working
                    </h3>
                    <p style="margin: 0; line-height: 1.8; font-size: 17px; color: #e0e0e0;">
                        ${strengths.slice(0, 4).map(s => `<strong style="color: #4CAF50;">•</strong> ${s}`).join('<br><br>')}
                    </p>
                </div>
            `;
        }
        
        // Priority Focus section
        if (weaknesses.length > 0) {
            summary += `
                <div style="padding: 20px; background: rgba(33, 150, 243, 0.08); border-left: 4px solid #2196F3; border-radius: 8px;">
                    <h3 style="color: #2196F3; font-size: 20px; font-weight: 700; margin: 0 0 16px 0; display: flex; align-items: center; gap: 8px;">
                        <span>🚀</span> Strategic Path Forward
                    </h3>
                    <p style="margin: 0; line-height: 1.8; font-size: 17px; color: #e0e0e0;">
                        <strong>Next 30-90 days:</strong><br><br>
                        ${weaknesses.slice(0, 3).map((w, idx) => `<strong style="color: #2196F3;">${idx + 1}.</strong> ${w}`).join('<br><br>')}
                    </p>
                </div>
            `;
        }
        
        return summary;
    }
    
    /**
     * Get color based on score
     */
    function getScoreColor(score) {
        if (score >= 85) return '#4CAF50';
        if (score >= 70) return '#8BC34A';
        if (score >= 55) return '#FFC107';
        return '#FF9800';
    }
    
    console.log('✅ Executive Summary Layout Fix loaded successfully');
    console.log('📋 This script only modifies display, not data generation');
    console.log('🔒 API and server files remain untouched');
    
})();
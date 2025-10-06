/**
 * ENHANCED ANALYSIS DISPLAY - FINAL VERSION
 * This is the definitive analysis display for ALL 96 subcomponents
 * Features:
 * - Large centered score display (72px)
 * - Executive Summary with dynamic content
 * - Detailed Scoring breakdowns
 * - Side-by-side Strengths/Weaknesses grid
 * - NO Strategic Recommendations (removed per request)
 * - Animated display elements
 */

(function() {
    'use strict';
    console.log('🚀 Loading Enhanced Analysis Display - Final Version');
    
    // ============================================================================
    // MAIN DISPLAY FUNCTION
    // ============================================================================
    
    function createEnhancedAnalysisDisplay() {
        return function(analysis) {
            console.log('📊 Enhanced Analysis Display - Rendering final layout');
            console.log('Analysis data received:', analysis);
            
            const analysisContent = document.getElementById('analysis-content') || 
                                   document.getElementById('analysisContent');
            
            if (!analysisContent) {
                console.error('❌ Analysis content container not found!');
                const analysisTab = document.getElementById('analysis-tab');
                if (analysisTab) {
                    const contentDiv = document.createElement('div');
                    contentDiv.id = 'analysis-content';
                    contentDiv.style.minHeight = '400px';
                    analysisTab.appendChild(contentDiv);
                    return window.displayAnalysisResults(analysis);
                }
                return;
            }
            
            // Validate analysis data
            if (!analysis || typeof analysis !== 'object') {
                console.error('❌ Invalid analysis data provided');
                analysisContent.innerHTML = `
                    <div style="text-align: center; padding: 60px 20px; color: #999;">
                        <div style="font-size: 48px; margin-bottom: 20px;">⚠️</div>
                        <h3 style="font-size: 24px; margin-bottom: 10px; color: #FF5500;">Invalid Analysis Data</h3>
                        <p style="font-size: 16px;">The analysis data could not be processed. Please try again.</p>
                    </div>
                `;
                return;
            }
            
            // Extract data
            const score = analysis.score || analysis.overallScore || analysis.finalScore || 
                         (analysis.analysis && analysis.analysis.score) || 75;
            const agentName = analysis.agentName || 'AI Agent';
            const timestamp = analysis.timestamp || new Date().toISOString();
            
            // Generate executive summary
            const executiveSummary = analysis.executiveSummary || 
                                   analysis.summary || 
                                   (analysis.analysis && analysis.analysis.executiveSummary) ||
                                   generateExecutiveSummary(score);
            
            // Build the enhanced HTML
            let html = `
                <div class="workspace-section" style="background: transparent; border: none; padding: 0;">
                    <!-- Header with Large Centered Score -->
                    <div style="text-align: center; margin-bottom: 40px;">
                        <h3 style="font-size: 28px; color: #FF5500; margin-bottom: 10px; font-weight: 700;">
                            🤖 AI Analysis Complete
                        </h3>
                        <p style="color: #999; font-size: 14px; margin-bottom: 30px;">
                            Analyzed by: ${agentName} • ${new Date(timestamp).toLocaleString()}
                        </p>
                        <div style="display: inline-block; padding: 40px; background: linear-gradient(135deg, rgba(255, 85, 0, 0.15), rgba(255, 85, 0, 0.05)); border-radius: 20px; border: 3px solid #FF5500; box-shadow: 0 10px 40px rgba(255, 85, 0, 0.2);">
                            <div style="font-size: 72px; font-weight: 800; color: ${getScoreColor(score)}; margin-bottom: 10px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                                ${Math.round(score)}%
                            </div>
                            <div style="font-size: 18px; color: #fff; text-transform: uppercase; letter-spacing: 2px;">Overall Score</div>
                        </div>
                    </div>
                    
                    <!-- Executive Summary -->
                    <div style="background: rgba(255, 255, 255, 0.02); padding: 30px; border-radius: 15px; margin-bottom: 40px; border: 1px solid rgba(255, 255, 255, 0.1);">
                        <h3 style="color: #FF5500; margin-bottom: 20px; font-size: 22px; display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 24px;">📋</span> Executive Summary
                        </h3>
                        <p style="color: #ccc; line-height: 1.8; font-size: 16px;">
                            ${executiveSummary}
                        </p>
                    </div>
            `;
            
            // Add Detailed Scoring if available
            if (analysis.detailedScores && Object.keys(analysis.detailedScores).length > 0) {
                html += `
                    <div style="margin-bottom: 40px;">
                        <h3 style="color: #FF5500; margin-bottom: 25px; font-size: 22px; display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 24px;">📊</span> Detailed Scoring Breakdown
                        </h3>
                        <div style="display: flex; flex-direction: column; gap: 20px;">
                            ${generateDetailedScores(analysis.detailedScores)}
                        </div>
                    </div>
                `;
            }
            
            // Add Strengths and Weaknesses Grid
            const strengths = analysis.strengths || 
                            (analysis.analysis && analysis.analysis.strengths) || [];
            const weaknesses = analysis.weaknesses || 
                             analysis.areasForImprovement || 
                             (analysis.analysis && analysis.analysis.weaknesses) || [];
            
            const strengthsList = Array.isArray(strengths) ? strengths : [strengths].filter(Boolean);
            const weaknessesList = Array.isArray(weaknesses) ? weaknesses : [weaknesses].filter(Boolean);
            
            if (strengthsList.length > 0 || weaknessesList.length > 0) {
                html += `
                    <div style="margin-bottom: 40px;">
                        <h3 style="color: #FF5500; margin-bottom: 25px; font-size: 22px; display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 24px;">💪</span> Performance Analysis
                        </h3>
                        
                        <!-- ENHANCED SIDE-BY-SIDE GRID -->
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px;">
                            
                            <!-- Strengths Column -->
                            <div style="background: linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(76, 175, 80, 0.02)); border: 2px solid rgba(76, 175, 80, 0.4); border-radius: 15px; padding: 25px;">
                                <h4 style="color: #4CAF50; margin: 0 0 20px 0; font-size: 18px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; display: flex; align-items: center; gap: 10px;">
                                    <span style="font-size: 22px;">✅</span> Strengths
                                </h4>
                                <div style="font-size: 14px; line-height: 1.8;">
                                    ${strengthsList.length > 0 ? 
                                        strengthsList.map(item => {
                                            const text = typeof item === 'string' ? item : (item.text || item.description || JSON.stringify(item));
                                            return `
                                                <div style="margin: 12px 0; padding: 12px; background: rgba(76, 175, 80, 0.15); border-radius: 8px; border-left: 4px solid #4CAF50; position: relative; padding-left: 35px;">
                                                    <span style="position: absolute; left: 12px; top: 12px; color: #4CAF50; font-size: 16px;">✓</span>
                                                    <span style="color: #e0e0e0; font-size: 14px;">${text.replace(/^[✓✅]/, '').trim()}</span>
                                                </div>
                                            `;
                                        }).join('') : 
                                        '<div style="color: #666; font-style: italic; padding: 15px; text-align: center;">No specific strengths identified yet. Complete more assessments to build your profile.</div>'
                                    }
                                </div>
                            </div>
                            
                            <!-- Areas for Improvement Column -->
                            <div style="background: linear-gradient(135deg, rgba(255, 152, 0, 0.1), rgba(255, 152, 0, 0.02)); border: 2px solid rgba(255, 152, 0, 0.4); border-radius: 15px; padding: 25px;">
                                <h4 style="color: #FF9800; margin: 0 0 20px 0; font-size: 18px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; display: flex; align-items: center; gap: 10px;">
                                    <span style="font-size: 22px;">🎯</span> Areas for Improvement
                                </h4>
                                <div style="font-size: 14px; line-height: 1.8;">
                                    ${weaknessesList.length > 0 ? 
                                        weaknessesList.map(item => {
                                            const text = typeof item === 'string' ? item : (item.text || item.description || JSON.stringify(item));
                                            return `
                                                <div style="margin: 12px 0; padding: 12px; background: rgba(255, 152, 0, 0.15); border-radius: 8px; border-left: 4px solid #FF9800; position: relative; padding-left: 35px;">
                                                    <span style="position: absolute; left: 12px; top: 12px; color: #FF9800; font-size: 16px;">!</span>
                                                    <span style="color: #e0e0e0; font-size: 14px;">${text.replace(/^[✗!⚠️]/, '').trim()}</span>
                                                </div>
                                            `;
                                        }).join('') : 
                                        '<div style="color: #666; font-style: italic; padding: 15px; text-align: center;">Great work! No critical improvements needed at this time.</div>'
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
            
            // Add Dimension Scores if available
            if (analysis.dimensionScores && analysis.dimensionScores.length > 0) {
                html += `
                    <div style="margin-bottom: 40px;">
                        <h3 style="color: #FF5500; margin-bottom: 25px; font-size: 22px; display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 24px;">📈</span> Dimension Performance
                        </h3>
                        <div style="display: flex; flex-direction: column; gap: 15px;">
                `;
                
                analysis.dimensionScores.forEach(dim => {
                    const dimScore = dim.score || 0;
                    const dimColor = getScoreColor(dimScore);
                    
                    html += `
                        <div style="background: rgba(0, 0, 0, 0.5); border-radius: 12px; padding: 20px; border-left: 5px solid ${dimColor};">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                <span style="color: #fff; font-size: 16px; font-weight: 500;">
                                    ${dim.dimension || dim.name}
                                </span>
                                <div style="display: flex; align-items: center; gap: 20px;">
                                    <div style="width: 250px; height: 10px; background: rgba(255, 255, 255, 0.1); border-radius: 5px; overflow: hidden;">
                                        <div style="width: ${dimScore}%; height: 100%; background: linear-gradient(90deg, ${dimColor}, ${dimColor}dd); transition: width 0.5s ease; box-shadow: 0 0 10px ${dimColor}66;"></div>
                                    </div>
                                    <span style="font-size: 18px; font-weight: 700; color: ${dimColor}; min-width: 50px; text-align: right;">
                                        ${Math.round(dimScore)}%
                                    </span>
                                </div>
                            </div>
                            ${dim.weight ? `
                                <div style="color: #888; font-size: 12px;">
                                    Weight: ${dim.weight}% • ${dimScore >= 80 ? 'Excellent' : dimScore >= 60 ? 'Good' : dimScore >= 40 ? 'Needs Improvement' : 'Critical'}
                                </div>
                            ` : ''}
                        </div>
                    `;
                });
                
                html += '</div></div>';
            }
            
            // Add Action Buttons
            html += `
                <div style="display: flex; gap: 15px; margin-top: 40px; flex-wrap: wrap;">
                    <button class="btn-primary" onclick="downloadAnalysisReport()" style="background: linear-gradient(135deg, #FF5500, #FF8800); color: white; border: none; padding: 14px 32px; border-radius: 30px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(255, 85, 0, 0.3);">
                        📥 Download Report
                    </button>
                    <button class="btn-secondary" onclick="switchTab('workspace', null)" style="background: transparent; color: #FF5500; border: 2px solid #FF5500; padding: 14px 32px; border-radius: 30px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
                        ✏️ Back to Worksheet
                    </button>
                    <button class="btn-secondary" onclick="shareAnalysis()" style="background: transparent; color: #2196F3; border: 2px solid #2196F3; padding: 14px 32px; border-radius: 30px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
                        🔗 Share Results
                    </button>
                </div>
            </div>
            `;
            
            // Set the content
            analysisContent.innerHTML = html;
            
            // Animate the display
            animateAnalysisDisplay();
            
            // Auto-switch to analysis tab if not already visible
            const analysisTab = document.getElementById('analysis-tab');
            if (analysisTab && !analysisTab.classList.contains('active')) {
                console.log('📍 Auto-switching to analysis tab');
                if (typeof switchTab === 'function') {
                    switchTab('analysis', null);
                }
            }
            
            // Save to localStorage
            try {
                const subcomponentId = new URLSearchParams(window.location.search).get('id') || 'unknown';
                localStorage.setItem(`analysis_${subcomponentId}`, JSON.stringify(analysis));
                console.log(`💾 Analysis saved for subcomponent: ${subcomponentId}`);
                
                // Update score history
                const history = JSON.parse(localStorage.getItem(`scoreHistory_${subcomponentId}`) || '[]');
                history.unshift({
                    timestamp: new Date().toISOString(),
                    score: Math.round(score),
                    agent: agentName
                });
                if (history.length > 10) history.pop();
                localStorage.setItem(`scoreHistory_${subcomponentId}`, JSON.stringify(history));
            } catch (e) {
                console.warn('Could not save analysis to localStorage:', e);
            }
            
            console.log('✅ Enhanced analysis displayed successfully');
        };
    }
    
    // ============================================================================
    // HELPER FUNCTIONS
    // ============================================================================
    
    // Generate executive summary based on score
    function generateExecutiveSummary(score) {
        if (score >= 90) {
            return "Exceptional GTM readiness (90%+). You demonstrate mastery across all dimensions with only minor refinements needed. Your strong foundation positions you for rapid scaling. Focus on maintaining excellence while pushing for market leadership.";
        } else if (score >= 76) {
            return `Strong GTM foundation (${Math.round(score)}%). You have solid capabilities with room for optimization. Key strengths are evident, with specific areas for enhancement. Strategic improvements will elevate you to exceptional performance.`;
        } else if (score >= 51) {
            return `Developing capabilities (${Math.round(score)}%). While you grasp the general problem space, significant gaps limit your GTM effectiveness. Immediate focus needed on customer validation and quantification. You can build a strong foundation with dedicated effort.`;
        } else if (score >= 26) {
            return `Basic GTM understanding (${Math.round(score)}%). Foundation needs significant strengthening across multiple dimensions. Priority focus areas require immediate attention. Structured approach needed to build core capabilities.`;
        } else {
            return `Critical gaps identified (${Math.round(score)}%). Fundamental GTM elements need development. Immediate intervention required across all dimensions. Consider seeking mentorship or advisory support to establish basics.`;
        }
    }
    
    // Generate detailed scores HTML
    function generateDetailedScores(detailedScores) {
        if (!detailedScores) return '';
        
        return Object.entries(detailedScores).map(([key, dim]) => {
            const score = dim.percentage || (dim.score && dim.maxScore ? Math.round((dim.score / dim.maxScore) * 100) : 0);
            const actualScore = dim.score || Math.round(score * 20 / 100);
            const maxScore = dim.maxScore || 20;
            
            // Format dimension name
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
                <div style="background: linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)); padding: 25px; border-radius: 12px; border-left: 5px solid ${getScoreColor(score)};">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <h4 style="color: #fff; font-size: 18px; margin: 0;">${dimensionName}</h4>
                        <div style="display: flex; align-items: center; gap: 20px;">
                            <span style="font-size: 28px; font-weight: 700; color: ${getScoreColor(score)};">
                                ${Math.round(score)}%
                            </span>
                            <span style="color: #888; font-size: 14px;">(${actualScore}/${maxScore})</span>
                        </div>
                    </div>
                    
                    ${feedbackLines[0] ? `
                        <p style="color: #ccc; margin-bottom: 15px; font-size: 14px; line-height: 1.6;">
                            ${feedbackLines[0]}
                        </p>
                    ` : ''}
                    
                    ${strengths.length > 0 ? `
                        <div style="margin-bottom: 10px;">
                            ${strengths.map(detail => `
                                <div style="color: #4CAF50; font-size: 13px; padding: 4px 0; display: flex; align-items: center; gap: 8px;">
                                    <span style="font-size: 14px;">✓</span> ${detail.replace('✓', '').trim()}
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                    
                    ${improvements.length > 0 ? `
                        <div>
                            ${improvements.map(improvement => `
                                <div style="color: #FF9800; font-size: 13px; padding: 4px 0; display: flex; align-items: center; gap: 8px;">
                                    <span style="font-size: 14px;">!</span> ${improvement.replace('✗', '').trim()}
                                </div>
                            `).join('')}
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
    
    // ============================================================================
    // ANALYZE WORKSHEET FUNCTION
    // ============================================================================
    
    function createEnhancedAnalyzeWorksheet() {
        return async function() {
            console.log('🔄 Enhanced Analyze Worksheet - Starting analysis...');
            
            // Gather worksheet data
            const worksheetData = {};
            const inputs = document.querySelectorAll('#dynamic-worksheet-container input, #dynamic-worksheet-container textarea, #dynamic-worksheet-container select');
            
            inputs.forEach(input => {
                const id = input.id || input.name;
                if (id) {
                    worksheetData[id] = input.value;
                }
            });
            
            console.log('📝 Collected worksheet data:', Object.keys(worksheetData).length, 'fields');
            
            const subcomponentId = new URLSearchParams(window.location.search).get('id') || '1-1';
            
            try {
                // Show loading state
                const analysisContent = document.getElementById('analysis-content') || document.getElementById('analysisContent');
                if (analysisContent) {
                    analysisContent.innerHTML = `
                        <div style="text-align: center; padding: 80px 20px;">
                            <div style="font-size: 64px; margin-bottom: 30px; animation: pulse 1.5s infinite;">🤖</div>
                            <h3 style="font-size: 28px; margin-bottom: 15px; color: #FF5500;">Analyzing Your Responses...</h3>
                            <p style="font-size: 18px; color: #999; margin-bottom: 30px;">Our AI agent is processing your worksheet</p>
                            <div style="margin: 0 auto; width: 300px;">
                                <div style="width: 100%; height: 6px; background: rgba(255, 255, 255, 0.1); border-radius: 3px; overflow: hidden;">
                                    <div style="width: 100%; height: 100%; background: linear-gradient(90deg, transparent, #FF5500, transparent); animation: loading 1.5s linear infinite;"></div>
                                </div>
                            </div>
                        </div>
                        <style>
                            @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
                            @keyframes loading { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
                        </style>
                    `;
                }
                
                // Auto-switch to analysis tab
                if (typeof switchTab === 'function') {
                    switchTab('analysis', null);
                }
                
                // Call API
                const response = await fetch('/api/analysis', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        subcomponentId: subcomponentId,
                        responses: worksheetData
                    })
                });
                
                if (!response.ok) {
                    throw new Error(`Analysis failed: ${response.status}`);
                }
                
                const analysis = await response.json();
                console.log('✅ Analysis received from server:', analysis);
                
                // Display results
                if (typeof window.displayAnalysisResults === 'function') {
                    window.displayAnalysisResults(analysis);
                }
                
            } catch (error) {
                console.error('❌ Analysis error:', error);
                
                const analysisContent = document.getElementById('analysis-content') || document.getElementById('analysisContent');
                if (analysisContent) {
                    analysisContent.innerHTML = `
                        <div style="text-align: center; padding: 80px 20px;">
                            <div style="font-size: 64px; margin-bottom: 30px;">❌</div>
                            <h3 style="font-size: 28px; margin-bottom: 15px; color: #F44336;">Analysis Failed</h3>
                            <p style="font-size: 18px; color: #999; margin-bottom: 30px;">${error.message}</p>
                            <button onclick="window.analyzeWorksheet()" style="background: #FF5500; color: white; border: none; padding: 14px 32px; border-radius: 30px; font-size: 16px; font-weight: 600; cursor: pointer;">
                                🔄 Try Again
                            </button>
                        </div>
                    `;
                }
            }
        };
    }
    
    // ============================================================================
    // UTILITY FUNCTIONS
    // ============================================================================
    
    window.downloadAnalysisReport = function() {
        console.log('📥 Downloading analysis report...');
        const subcomponentId = new URLSearchParams(window.location.search).get('id') || 'unknown';
        const savedAnalysis = localStorage.getItem(`analysis_${subcomponentId}`);
        
        if (savedAnalysis) {
            const analysis = JSON.parse(savedAnalysis);
            const reportContent = `
SCALEOPS6 ENHANCED ANALYSIS REPORT
===================================
Date: ${new Date().toLocaleString()}
Subcomponent: ${subcomponentId}
Agent: ${analysis.agentName || 'Unknown'}
Overall Score: ${analysis.score || 0}%

EXECUTIVE SUMMARY:
${analysis.executiveSummary || generateExecutiveSummary(analysis.score)}

STRENGTHS:
${(analysis.strengths || []).map(s => `• ${s}`).join('\n')}

AREAS FOR IMPROVEMENT:
${(analysis.weaknesses || analysis.areasForImprovement || []).map(w => `• ${w}`).join('\n')}

Generated by ScaleOps6 Enhanced Analysis System
            `;
            
            const blob = new Blob([reportContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `enhanced-analysis-${subcomponentId}-${Date.now()}.txt`;
            a.click();
            URL.revokeObjectURL(url);
        } else {
            alert('No analysis data available to download');
        }
    };
    
    window.shareAnalysis = function() {
        console.log('🔗 Sharing analysis...');
        const url = window.location.href;
        if (navigator.share) {
            navigator.share({
                title: 'ScaleOps6 Enhanced Analysis Results',
                text: 'Check out my ScaleOps6 analysis results!',
                url: url
            }).catch(err => console.log('Share cancelled:', err));
        } else {
            navigator.clipboard.writeText(url).then(() => {
                alert('Link copied to clipboard!');
            });
        }
    };
    
    // ============================================================================
    // INSTALLATION
    // ============================================================================
    
    function installEnhancedDisplay() {
        console.log('🔧 Installing Enhanced Analysis Display - Final Version');
        
        // Set the display function
        window.displayAnalysisResults = createEnhancedAnalysisDisplay();
        console.log('✅ displayAnalysisResults set to enhanced version');
        
        // Set the analyze function
        window.analyzeWorksheet = createEnhancedAnalyzeWorksheet();
        console.log('✅ analyzeWorksheet set to enhanced version');
        
        // Make them non-writable to prevent overrides
        try {
            Object.defineProperty(window, 'displayAnalysisResults', {
                value: window.displayAnalysisResults,
                writable: false,
                configurable: false
            });
        } catch (e) {
            // Property might already be non-configurable
            console.log('Note: Could not make displayAnalysisResults non-writable');
        }
        
        // Check for saved analysis
        setTimeout(() => {
            const subcomponentId = new URLSearchParams(window.location.search).get('id');
            if (subcomponentId) {
                const savedAnalysis = localStorage.getItem(`analysis_${subcomponentId}`);
                if (savedAnalysis) {
                    try {
                        const analysis = JSON.parse(savedAnalysis);
                        const analysisTab = document.getElementById('analysis-tab');
                        if (analysisTab && analysisTab.classList.contains('active')) {
                            console.log('📊 Auto-displaying saved analysis');
                            window.displayAnalysisResults(analysis);
                        }
                    } catch (e) {
                        console.warn('Could not parse saved analysis:', e);
                    }
                }
            }
        }, 1000);
        
        console.log('🎉 Enhanced Analysis Display installed successfully!');
        console.log('📋 Features enabled:');
        console.log('   • Large centered score (72px)');
        console.log('   • Executive Summary');
        console.log('   • Detailed Scoring breakdowns');
        console.log('   • Enhanced Strengths/Weaknesses grid');
        console.log('   • Dimension performance bars');
        console.log('   • NO Strategic Recommendations (removed)');
        console.log('   • Animated elements');
    }
    
    // Install immediately
    installEnhancedDisplay();
    
    // Re-install when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', installEnhancedDisplay);
    }
    
    // Re-install after delay to override late-loading scripts
    setTimeout(installEnhancedDisplay, 2000);
    
})();
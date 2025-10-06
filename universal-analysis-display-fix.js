/**
 * UNIVERSAL ANALYSIS DISPLAY FIX
 * This comprehensive fix ensures that ALL 96 subcomponents properly display
 * analysis results with the enhanced strengths/weaknesses grid layout.
 * 
 * This solves the systemic issue where displayAnalysisResults was not defined
 * but was expected by various scripts throughout the application.
 */

(function() {
    'use strict';
    console.log('🚀 Loading Universal Analysis Display Fix...');
    
    // ============================================================================
    // CORE DISPLAY FUNCTION - Creates the enhanced analysis display with grid
    // ============================================================================
    
    function createUniversalDisplayAnalysisResults() {
        return function(analysis) {
            console.log('📊 Universal Display Analysis Results - Rendering enhanced grid layout');
            console.log('Analysis data received:', analysis);
            
            const analysisContent = document.getElementById('analysis-content') || 
                                   document.getElementById('analysisContent');
            
            if (!analysisContent) {
                console.error('❌ Analysis content container not found!');
                // Try to find the analysis tab and create the content div
                const analysisTab = document.getElementById('analysis-tab');
                if (analysisTab) {
                    const contentDiv = document.createElement('div');
                    contentDiv.id = 'analysis-content';
                    contentDiv.style.minHeight = '400px';
                    analysisTab.appendChild(contentDiv);
                    return window.displayAnalysisResults(analysis); // Retry with new container
                }
                return;
            }
            
            // Ensure we have valid analysis data
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
            
            // Extract score (handle various data structures)
            const score = analysis.score || 
                         analysis.overallScore || 
                         analysis.finalScore || 
                         (analysis.analysis && analysis.analysis.score) || 
                         75; // Default fallback
            
            // Build the comprehensive HTML with enhanced grid layout
            let html = `
                <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 15px; padding: 30px; margin-bottom: 30px;">
                    <!-- Header with Score -->
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; flex-wrap: wrap;">
                        <div>
                            <h3 style="color: #FF5500; font-size: 24px; font-weight: 700; margin: 0;">
                                🤖 AI Analysis Complete
                            </h3>
                            ${analysis.agentName ? `
                                <p style="color: #999; font-size: 14px; margin-top: 5px;">
                                    Analyzed by: ${analysis.agentName}
                                </p>
                            ` : ''}
                        </div>
                        <div style="text-align: right;">
                            <div style="font-size: 48px; font-weight: 800; color: ${score >= 80 ? '#4CAF50' : score >= 60 ? '#FF9800' : '#F44336'};">
                                ${Math.round(score)}%
                            </div>
                            <div style="font-size: 14px; color: #999;">Overall Score</div>
                        </div>
                    </div>
            `;
            
            // Add timestamp if available
            if (analysis.timestamp) {
                const date = new Date(analysis.timestamp);
                html += `
                    <div style="background: rgba(0, 0, 0, 0.3); border-radius: 8px; padding: 10px 15px; margin-bottom: 20px;">
                        <span style="color: #999; font-size: 12px;">
                            📅 Analysis performed: ${date.toLocaleString()}
                        </span>
                    </div>
                `;
            }
            
            // Add executive summary if present
            const summary = analysis.executiveSummary || 
                          analysis.summary || 
                          (analysis.analysis && analysis.analysis.executiveSummary);
            
            if (summary) {
                html += `
                    <div style="background: rgba(0, 0, 0, 0.5); border-radius: 10px; padding: 20px; margin-bottom: 30px;">
                        <h4 style="color: #FF5500; margin-bottom: 15px; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px;">
                            📋 Executive Summary
                        </h4>
                        <p style="color: #ccc; line-height: 1.8; font-size: 14px;">
                            ${summary}
                        </p>
                    </div>
                `;
            }
            
            // ============================================================================
            // CRITICAL: STRENGTHS AND WEAKNESSES GRID LAYOUT
            // ============================================================================
            
            const strengths = analysis.strengths || 
                            (analysis.analysis && analysis.analysis.strengths) || 
                            [];
            const weaknesses = analysis.weaknesses || 
                             analysis.areasForImprovement || 
                             (analysis.analysis && analysis.analysis.weaknesses) || 
                             [];
            
            // Ensure arrays
            const strengthsList = Array.isArray(strengths) ? strengths : [strengths].filter(Boolean);
            const weaknessesList = Array.isArray(weaknesses) ? weaknesses : [weaknesses].filter(Boolean);
            
            if (strengthsList.length > 0 || weaknessesList.length > 0) {
                html += `
                    <div style="margin-bottom: 30px;">
                        <h4 style="color: #FF5500; margin-bottom: 20px; font-size: 18px;">
                            📊 Detailed Analysis
                        </h4>
                        
                        <!-- SIDE-BY-SIDE GRID FOR STRENGTHS AND WEAKNESSES -->
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
                            
                            <!-- Strengths Column -->
                            <div style="background: rgba(76, 175, 80, 0.05); border: 2px solid rgba(76, 175, 80, 0.3); border-radius: 12px; padding: 20px;">
                                <h5 style="color: #4CAF50; margin: 0 0 15px 0; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; display: flex; align-items: center; gap: 8px;">
                                    <span style="font-size: 20px;">✅</span> Strengths
                                </h5>
                                <div style="font-size: 14px; line-height: 1.8;">
                                    ${strengthsList.length > 0 ? 
                                        strengthsList.map(item => {
                                            const text = typeof item === 'string' ? item : (item.text || item.description || JSON.stringify(item));
                                            return `
                                                <div style="color: #4CAF50; margin: 10px 0; padding: 10px; background: rgba(76, 175, 80, 0.1); border-radius: 6px; border-left: 3px solid #4CAF50; position: relative; padding-left: 30px;">
                                                    <span style="position: absolute; left: 10px; top: 10px;">✓</span>
                                                    <span style="color: #ccc;">${text.replace(/^[✓✅]/, '').trim()}</span>
                                                </div>
                                            `;
                                        }).join('') : 
                                        '<div style="color: #666; font-style: italic; padding: 10px;">No specific strengths identified yet. Complete more assessments to build your profile.</div>'
                                    }
                                </div>
                            </div>
                            
                            <!-- Weaknesses/Areas for Improvement Column -->
                            <div style="background: rgba(255, 152, 0, 0.05); border: 2px solid rgba(255, 152, 0, 0.3); border-radius: 12px; padding: 20px;">
                                <h5 style="color: #FF9800; margin: 0 0 15px 0; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; display: flex; align-items: center; gap: 8px;">
                                    <span style="font-size: 20px;">🎯</span> Areas for Improvement
                                </h5>
                                <div style="font-size: 14px; line-height: 1.8;">
                                    ${weaknessesList.length > 0 ? 
                                        weaknessesList.map(item => {
                                            const text = typeof item === 'string' ? item : (item.text || item.description || JSON.stringify(item));
                                            return `
                                                <div style="color: #FF9800; margin: 10px 0; padding: 10px; background: rgba(255, 152, 0, 0.1); border-radius: 6px; border-left: 3px solid #FF9800; position: relative; padding-left: 30px;">
                                                    <span style="position: absolute; left: 10px; top: 10px;">!</span>
                                                    <span style="color: #ccc;">${text.replace(/^[✗!⚠️]/, '').trim()}</span>
                                                </div>
                                            `;
                                        }).join('') : 
                                        '<div style="color: #666; font-style: italic; padding: 10px;">Great work! No critical improvements needed at this time.</div>'
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
            
            // Add dimension scores if available
            if (analysis.dimensionScores && analysis.dimensionScores.length > 0) {
                html += `
                    <div style="margin-bottom: 30px;">
                        <h4 style="color: #FF5500; margin-bottom: 20px; font-size: 18px;">
                            📈 Dimension Scores
                        </h4>
                        <div style="display: flex; flex-direction: column; gap: 15px;">
                `;
                
                analysis.dimensionScores.forEach(dim => {
                    const dimScore = dim.score || 0;
                    const dimColor = dimScore >= 80 ? '#4CAF50' : dimScore >= 60 ? '#FF9800' : '#F44336';
                    
                    html += `
                        <div style="background: rgba(0, 0, 0, 0.5); border-radius: 10px; padding: 15px; border-left: 4px solid ${dimColor};">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span style="color: #fff; font-size: 14px; font-weight: 500;">
                                    ${dim.dimension || dim.name}
                                </span>
                                <div style="display: flex; align-items: center; gap: 15px;">
                                    <div style="width: 200px; height: 8px; background: rgba(255, 255, 255, 0.1); border-radius: 4px; overflow: hidden;">
                                        <div style="width: ${dimScore}%; height: 100%; background: ${dimColor}; transition: width 0.5s ease;"></div>
                                    </div>
                                    <span style="font-size: 16px; font-weight: 600; color: ${dimColor}; min-width: 45px; text-align: right;">
                                        ${Math.round(dimScore)}%
                                    </span>
                                </div>
                            </div>
                            ${dim.weight ? `
                                <div style="color: #666; font-size: 12px; margin-top: 5px;">
                                    Weight: ${dim.weight}%
                                </div>
                            ` : ''}
                        </div>
                    `;
                });
                
                html += '</div></div>';
            }
            
            // Add recommendations if available
            const recommendations = analysis.recommendations || 
                                  analysis.nextSteps || 
                                  (analysis.analysis && analysis.analysis.recommendations);
            
            if (recommendations && (Array.isArray(recommendations) ? recommendations.length > 0 : recommendations)) {
                const recList = Array.isArray(recommendations) ? recommendations : [recommendations];
                
                html += `
                    <div style="background: rgba(33, 150, 243, 0.05); border: 1px solid rgba(33, 150, 243, 0.2); border-radius: 12px; padding: 20px; margin-bottom: 30px;">
                        <h4 style="color: #2196F3; margin-bottom: 15px; font-size: 16px; display: flex; align-items: center; gap: 8px;">
                            <span style="font-size: 20px;">💡</span> Strategic Recommendations
                        </h4>
                        <ol style="margin: 0; padding-left: 20px; color: #ccc;">
                            ${recList.map(rec => {
                                const text = typeof rec === 'string' ? rec : (rec.text || rec.description || JSON.stringify(rec));
                                return `<li style="margin: 8px 0; line-height: 1.6;">${text}</li>`;
                            }).join('')}
                        </ol>
                    </div>
                `;
            }
            
            // Add action buttons
            html += `
                <div style="display: flex; gap: 15px; margin-top: 30px; flex-wrap: wrap;">
                    <button class="btn-primary" onclick="downloadAnalysisReport()" style="background: linear-gradient(135deg, #FF5500, #FF8800); color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
                        📥 Download Report
                    </button>
                    <button class="btn-secondary" onclick="switchTab('workspace', null)" style="background: transparent; color: #FF5500; border: 2px solid #FF5500; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
                        ✏️ Back to Worksheet
                    </button>
                    <button class="btn-secondary" onclick="shareAnalysis()" style="background: transparent; color: #2196F3; border: 2px solid #2196F3; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
                        🔗 Share Results
                    </button>
                </div>
            </div>
            `;
            
            // Set the content
            analysisContent.innerHTML = html;
            
            // Auto-switch to analysis tab if not already visible
            const analysisTab = document.getElementById('analysis-tab');
            if (analysisTab && !analysisTab.classList.contains('active')) {
                console.log('📍 Auto-switching to analysis tab');
                if (typeof switchTab === 'function') {
                    switchTab('analysis', null);
                }
            }
            
            // Save to localStorage for persistence
            try {
                const subcomponentId = new URLSearchParams(window.location.search).get('id') || 'unknown';
                localStorage.setItem(`analysis_${subcomponentId}`, JSON.stringify(analysis));
                console.log(`💾 Analysis saved for subcomponent: ${subcomponentId}`);
                
                // Also update score history
                const history = JSON.parse(localStorage.getItem(`scoreHistory_${subcomponentId}`) || '[]');
                history.unshift({
                    timestamp: new Date().toISOString(),
                    score: Math.round(score),
                    agent: analysis.agentName || 'Unknown Agent'
                });
                // Keep only last 10 entries
                if (history.length > 10) history.pop();
                localStorage.setItem(`scoreHistory_${subcomponentId}`, JSON.stringify(history));
            } catch (e) {
                console.warn('Could not save analysis to localStorage:', e);
            }
            
            console.log('✅ Analysis displayed successfully with enhanced grid layout');
        };
    }
    
    // ============================================================================
    // ANALYZE WORKSHEET FUNCTION - Properly connects to display
    // ============================================================================
    
    function createUniversalAnalyzeWorksheet() {
        return async function() {
            console.log('🔄 Universal Analyze Worksheet - Starting analysis...');
            
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
            
            // Get subcomponent ID
            const subcomponentId = new URLSearchParams(window.location.search).get('id') || '1-1';
            
            try {
                // Show loading state
                const analysisContent = document.getElementById('analysis-content') || document.getElementById('analysisContent');
                if (analysisContent) {
                    analysisContent.innerHTML = `
                        <div style="text-align: center; padding: 60px 20px;">
                            <div style="font-size: 48px; margin-bottom: 20px; animation: pulse 1.5s infinite;">🤖</div>
                            <h3 style="font-size: 24px; margin-bottom: 10px; color: #FF5500;">Analyzing Your Responses...</h3>
                            <p style="font-size: 16px; color: #999;">Our AI agent is processing your worksheet</p>
                            <div style="margin-top: 20px;">
                                <div style="width: 200px; height: 4px; background: rgba(255, 255, 255, 0.1); border-radius: 2px; margin: 0 auto; overflow: hidden;">
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
                
                // Display the results using our universal display function
                if (typeof window.displayAnalysisResults === 'function') {
                    window.displayAnalysisResults(analysis);
                } else {
                    console.error('❌ displayAnalysisResults not found! This should not happen with universal fix.');
                }
                
            } catch (error) {
                console.error('❌ Analysis error:', error);
                
                // Show error state
                const analysisContent = document.getElementById('analysis-content') || document.getElementById('analysisContent');
                if (analysisContent) {
                    analysisContent.innerHTML = `
                        <div style="text-align: center; padding: 60px 20px;">
                            <div style="font-size: 48px; margin-bottom: 20px;">❌</div>
                            <h3 style="font-size: 24px; margin-bottom: 10px; color: #F44336;">Analysis Failed</h3>
                            <p style="font-size: 16px; color: #999; margin-bottom: 20px;">${error.message}</p>
                            <button onclick="window.analyzeWorksheet()" style="background: #FF5500; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer;">
                                🔄 Try Again
                            </button>
                        </div>
                    `;
                }
            }
        };
    }
    
    // ============================================================================
    // HELPER FUNCTIONS
    // ============================================================================
    
    window.downloadAnalysisReport = function() {
        console.log('📥 Downloading analysis report...');
        // Get the current analysis from localStorage
        const subcomponentId = new URLSearchParams(window.location.search).get('id') || 'unknown';
        const savedAnalysis = localStorage.getItem(`analysis_${subcomponentId}`);
        
        if (savedAnalysis) {
            const analysis = JSON.parse(savedAnalysis);
            const reportContent = `
SCALEOPS6 ANALYSIS REPORT
========================
Date: ${new Date().toLocaleString()}
Subcomponent: ${subcomponentId}
Agent: ${analysis.agentName || 'Unknown'}
Score: ${analysis.score || 0}%

STRENGTHS:
${(analysis.strengths || []).map(s => `• ${s}`).join('\n')}

AREAS FOR IMPROVEMENT:
${(analysis.weaknesses || analysis.areasForImprovement || []).map(w => `• ${w}`).join('\n')}

RECOMMENDATIONS:
${(analysis.recommendations || analysis.nextSteps || []).map((r, i) => `${i + 1}. ${r}`).join('\n')}
            `;
            
            const blob = new Blob([reportContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `analysis-report-${subcomponentId}-${Date.now()}.txt`;
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
                title: 'ScaleOps6 Analysis Results',
                text: 'Check out my ScaleOps6 analysis results!',
                url: url
            }).catch(err => console.log('Share cancelled:', err));
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(url).then(() => {
                alert('Link copied to clipboard!');
            });
        }
    };
    
    // ============================================================================
    // INSTALLATION - Apply the fix universally
    // ============================================================================
    
    function installUniversalFix() {
        console.log('🔧 Installing Universal Analysis Display Fix...');
        
        // 1. Create and set the display function
        window.displayAnalysisResults = createUniversalDisplayAnalysisResults();
        console.log('✅ displayAnalysisResults function created and set globally');
        
        // 2. Create and set the analyze function if it doesn't exist or override it
        const originalAnalyze = window.analyzeWorksheet;
        window.analyzeWorksheet = createUniversalAnalyzeWorksheet();
        console.log('✅ analyzeWorksheet function created/overridden');
        
        // 3. Ensure the functions persist even if other scripts try to override
        Object.defineProperty(window, 'displayAnalysisResults', {
            value: window.displayAnalysisResults,
            writable: false,
            configurable: false
        });
        
        // 4. Check if there's already saved analysis to display
        setTimeout(() => {
            const subcomponentId = new URLSearchParams(window.location.search).get('id');
            if (subcomponentId) {
                const savedAnalysis = localStorage.getItem(`analysis_${subcomponentId}`);
                if (savedAnalysis) {
                    try {
                        const analysis = JSON.parse(savedAnalysis);
                        console.log('📂 Found saved analysis, checking if should display...');
                        
                        // Only auto-display if we're on the analysis tab
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
        
        // 5. Fix any buttons that call these functions
        setTimeout(() => {
            const analyzeButtons = document.querySelectorAll('button[onclick*="analyze"]');
            analyzeButtons.forEach(button => {
                const onclick = button.getAttribute('onclick');
                if (onclick && !onclick.includes('window.')) {
                    button.setAttribute('onclick', onclick.replace('analyzeWorksheet()', 'window.analyzeWorksheet()'));
                }
            });
            console.log(`✅ Fixed ${analyzeButtons.length} analyze buttons`);
        }, 500);
        
        console.log('🎉 Universal Analysis Display Fix installed successfully!');
        console.log('📋 This fix ensures:');
        console.log('   • displayAnalysisResults is always available');
        console.log('   • Enhanced grid layout for strengths/weaknesses');
        console.log('   • Proper connection between worksheet and analysis');
        console.log('   • Works for all 96 subcomponents');
    }
    
    // ============================================================================
    // EXECUTE INSTALLATION
    // ============================================================================
    
    // Install immediately
    installUniversalFix();
    
    // Also install when DOM is ready (in case we're loaded early)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', installUniversalFix);
    }
    
    // Re-install after a delay to override any late-loading scripts
    setTimeout(installUniversalFix, 2000);
    
})();
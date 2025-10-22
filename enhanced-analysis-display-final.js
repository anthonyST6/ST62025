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
            
            // Extract dimension list first for summary generation
            const dimensionListForSummary = (() => {
                if (Array.isArray(analysis.dimensionScores)) return analysis.dimensionScores;
                if (analysis.dimensionScores && typeof analysis.dimensionScores === 'object') {
                    return Object.entries(analysis.dimensionScores).map(([key, val]) => ({
                        dimension: key,
                        name: key,
                        score: typeof val === 'number' ? val : (val.score || val.percentage || 0),
                        weight: val.weight,
                        feedback: val.feedback,
                        strengths: val.strengths || [],
                        improvements: val.improvements || []
                    }));
                }
                if (Array.isArray(analysis.dimensions)) return analysis.dimensions;
                if (analysis.dimensions && typeof analysis.dimensions === 'object') {
                    return Object.entries(analysis.dimensions).map(([key, val]) => ({
                        dimension: key,
                        name: key,
                        score: typeof val === 'number' ? val : (val.score || val.percentage || 0),
                        weight: val.weight,
                        feedback: val.feedback,
                        strengths: val.strengths || [],
                        improvements: val.improvements || []
                    }));
                }
                return [];
            })();
            
            // Prefer server-provided executive summary, fallback to client-side generation with dimension data
            const executiveSummary = analysis.executiveSummary ||
                                    analysis.summary ||
                                    (analysis.analysis && analysis.analysis.executiveSummary) ||
                                    generateExecutiveSummary(score, dimensionListForSummary);

            // Local sanitizer to remove confusing placeholders like "$1" and noisy tokens in legacy saves
            function sanitizeText(t) {
                let s = String(t || '');

                // Replace "Quantified performance with $1" -> "Quantified performance with clear metrics"
                s = s.replace(/Quantified performance with\s*\$1\b/gi, 'Quantified performance with clear metrics');

                // Drop trivial currency references like "$1", "$2", "$5", "$10" (keep >= $100 or with K/M/B)
                s = s.replace(/\$(?:[1-9]\d?)(?![\dKMB])/gi, match => {
                    const num = parseInt(match.slice(1), 10);
                    return (isNaN(num) || num >= 100) ? match : '';
                });

                // Remove "$" inside metric lists like "(%, $, counts)" -> "(%, counts)"
                s = s.replace(/\(\s*%\,\s*\$\,\s*counts\s*\)/gi, '(%, counts)');

                // Normalize KPI phrasing like "2-3 KPIs ..." or "2–3 KPIs ..." -> "instrumented KPIs ..."
                s = s.replace(/\b\d+\s*[–-]\s*\d+\s*KPI(s)?\b/gi, 'instrumented KPI$1');

                // Replace bare-number benchmarking phrases with clear wording
                // e.g., "Quantified performance with 47 provides ..." -> "Quantified performance with clear metrics provides ..."
                s = s.replace(/\bQuantified performance with\s+\d+(?![%\dKMB])\s+(?=provides|creates|offers|enables)/gi, 'Quantified performance with clear metrics ');
                // Generic safety: "with 47 provides|creates|offers|enables" -> "with clear metrics provides|creates|offers|enables"
                s = s.replace(/\bwith\s+\d+(?![%\dKMB])\s+(provides|creates|offers|enables)\b/gi, 'with clear metrics $1');

                // Tidy multiple spaces left by removals
                s = s.replace(/\s{2,}/g, ' ').trim();
                return s;
            }

            // DOM-level sanitizer to clean any residual text after render (defensive)
            function deepSanitize(container) {
                if (!container) return;
                const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null, false);
                const textNodes = [];
                while (walker.nextNode()) textNodes.push(walker.currentNode);
                textNodes.forEach(node => {
                    const before = node.nodeValue;
                    const after = sanitizeText(before);
                    if (before !== after) node.nodeValue = after;
                });
            }

            // Detect if the executive summary already contains rich HTML; if not, treat as plain text
            const hasHTMLSummary = /<[^>]+>/.test(String(executiveSummary || ''));
            const renderedExecutiveSummary = hasHTMLSummary
                ? sanitizeText(String(executiveSummary))
                : sanitizeText(String(executiveSummary || '').replace(/\\n/g, '\n').replace(/\\r/g, ''));
            
            // Prepare legacy Dimension Analysis cards (placed between Executive Summary and Performance Analysis)
            const dimensionList = (() => {
                // Accept arrays or objects on either key
                if (Array.isArray(analysis.dimensionScores)) return analysis.dimensionScores;
                if (analysis.dimensionScores && typeof analysis.dimensionScores === 'object') {
                    return Object.entries(analysis.dimensionScores).map(([key, val]) => ({
                        dimension: key,
                        name: key,
                        score: typeof val === 'number' ? val : (val.score || val.percentage || 0),
                        weight: val.weight,
                        feedback: val.feedback,
                        strengths: val.strengths || [],
                        improvements: val.improvements || []
                    }));
                }
                if (Array.isArray(analysis.dimensions)) return analysis.dimensions;
                if (analysis.dimensions && typeof analysis.dimensions === 'object') {
                    return Object.entries(analysis.dimensions).map(([key, val]) => ({
                        dimension: key,
                        name: key,
                        score: typeof val === 'number' ? val : (val.score || val.percentage || 0),
                        weight: val.weight,
                        feedback: val.feedback,
                        strengths: val.strengths || [],
                        improvements: val.improvements || []
                    }));
                }
                return [];
            })();

            // Debug: log what we detected for dimensions to ensure section renders
            try {
                console.log('🧪 Dimension detection',
                    { count: dimensionList.length,
                      hasArrayDimensionScores: Array.isArray(analysis.dimensionScores),
                      hasObjectDimensionScores: !!(analysis.dimensionScores && typeof analysis.dimensionScores === 'object' && !Array.isArray(analysis.dimensionScores)),
                      hasArrayDimensions: Array.isArray(analysis.dimensions),
                      hasObjectDimensions: !!(analysis.dimensions && typeof analysis.dimensions === 'object' && !Array.isArray(analysis.dimensions)) });
            } catch (e) {}

            // Restore professional-grade Dimension Analysis section (exact layout/styles from prior GitHub save)
            const dimensionCardsHTML = dimensionList.length > 0 ? `
                <div style="margin-bottom: 40px;">
                    <h2 style="color: #FF5500;
                               margin: 0 0 30px 0;
                               font-size: 24px;
                               font-weight: 600;
                               display: flex;
                               align-items: center;
                               gap: 10px;">
                        <span style="font-size: 20px;">📊</span>
                        Dimension Analysis
                    </h2>
                    <div style="display: grid;
                                grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
                                gap: 25px;">
                        ${generateProfessionalDimensionCards(dimensionList)}
                    </div>
                </div>
            ` : '';

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
                    <div style="background: linear-gradient(135deg, rgba(255, 85, 0, 0.08), rgba(255, 85, 0, 0.02));
                                padding: 50px 45px;
                                border-radius: 15px;
                                margin-bottom: 40px;
                                border: 2px solid rgba(255, 85, 0, 0.3);
                                box-shadow: 0 4px 20px rgba(255, 85, 0, 0.1);
                                min-height: 400px;
                                max-height: none;
                                overflow: visible;
                                position: relative;">
                        <h3 style="color: #FF5500;
                                   margin: 0 0 30px 0;
                                   font-size: 26px;
                                   font-weight: 700;
                                   display: flex;
                                   align-items: center;
                                   gap: 12px;
                                   text-transform: uppercase;
                                   letter-spacing: 1px;">
                            <span style="font-size: 28px;">📋</span> EXECUTIVE SUMMARY
                        </h3>
                        <div style="max-width: 100%;
                                    overflow-wrap: break-word;
                                    word-wrap: break-word;">
                            ${renderedExecutiveSummary}
                        </div>
                    </div>
                    ${dimensionCardsHTML}
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
            // Derive Strengths/Improvements from per-dimension cards (as before), with fallback to analysis-level arrays
            const fallbackStrengths = analysis.strengths || (analysis.analysis && analysis.analysis.strengths) || [];
            const fallbackWeaknesses = analysis.weaknesses || analysis.areasForImprovement || (analysis.analysis && analysis.analysis.weaknesses) || [];
            
            const derivedStrengths = [];
            const derivedImprovements = [];
            if (Array.isArray(dimensionList) && dimensionList.length > 0) {
                dimensionList.forEach(dim => {
                    const dimName = dim.dimension || dim.name || 'Dimension';
                    if (Array.isArray(dim.strengths)) {
                        dim.strengths.forEach(s => {
                            const item = `${dimName}: ${String(s).trim()}`;
                            if (item) derivedStrengths.push(item);
                        });
                    }
                    if (Array.isArray(dim.improvements)) {
                        dim.improvements.forEach(i => {
                            const item = `${dimName}: ${String(i).trim()}`;
                            if (item) derivedImprovements.push(item);
                        });
                    }
                });
            }
            // Deduplicate while preserving order
            function dedupe(list) {
                const seen = new Set();
                return (list || []).filter(x => {
                    const key = String(x).toLowerCase();
                    if (seen.has(key)) return false;
                    seen.add(key);
                    return true;
                });
            }
            const strengthsList = (derivedStrengths.length > 0) ? dedupe(derivedStrengths)
                : (Array.isArray(fallbackStrengths) ? fallbackStrengths : [fallbackStrengths].filter(Boolean));
            const weaknessesList = (derivedImprovements.length > 0) ? dedupe(derivedImprovements)
                : (Array.isArray(fallbackWeaknesses) ? fallbackWeaknesses : [fallbackWeaknesses].filter(Boolean));
            
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
                                            const raw = typeof item === 'string' ? item : (item.text || item.description || JSON.stringify(item));
                                            const text = sanitizeText(raw).replace(/^[✓✅]/, '').trim();
                                            return `
                                                <div style="margin: 12px 0; padding: 12px; background: rgba(76, 175, 80, 0.15); border-radius: 8px; border-left: 4px solid #4CAF50; position: relative; padding-left: 35px;">
                                                    <span style="position: absolute; left: 12px; top: 12px; color: #4CAF50; font-size: 16px;">✓</span>
                                                    <span style="color: #e0e0e0; font-size: 14px;">${text}</span>
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
                                            const raw = typeof item === 'string' ? item : (item.text || item.description || JSON.stringify(item));
                                            const text = sanitizeText(raw).replace(/^[✗!⚠️]/, '').trim();
                                            return `
                                                <div style="margin: 12px 0; padding: 12px; background: rgba(255, 152, 0, 0.15); border-radius: 8px; border-left: 4px solid #FF9800; position: relative; padding-left: 35px;">
                                                    <span style="position: absolute; left: 12px; top: 12px; color: #FF9800; font-size: 16px;">!</span>
                                                    <span style="color: #e0e0e0; font-size: 14px;">${text}</span>
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
            
            // Dimension Performance section removed per request
            
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

            // Post-render DOM sanitation (ensures no "$1" remnants even from legacy content)
            try {
                const execH3 = Array.from(analysisContent.querySelectorAll('h3'))
                    .find(h => /Executive Summary/i.test(h.textContent || ''));
                if (execH3) deepSanitize(execH3.parentElement);
                const dimH2 = Array.from(analysisContent.querySelectorAll('h2'))
                    .find(h => /Dimension Analysis/i.test(h.textContent || ''));
                if (dimH2) deepSanitize(dimH2.parentElement);
            } catch (e) {
                console.warn('Post-render sanitizer encountered an issue:', e);
            }
            
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
    
    // Generate systematic executive summary based on score and dimensions
    function generateExecutiveSummary(score, dimensionList = []) {
        // Build systematic executive summary matching the screenshot format
        let summary = '<div style="color: #e0e0e0; line-height: 2.1; font-size: 16px;">';
        
        // Overall Assessment Section
        summary += '<h4 style="color: #FF5500; font-size: 20px; margin: 0 0 20px 0; font-weight: 600; display: flex; align-items: center; gap: 8px;">';
        summary += '<span style="font-size: 18px;">📋</span> Overall Assessment</h4>';
        
        if (score >= 80) {
            summary += '<p style="margin-bottom: 25px;">Overall, you demonstrate strength in problem clarity and solution fit, reflected in Quantified performance with $1 provides objective baseline for improvement and benchmarking. Clear mission articulation provides foundation for strategic alignment across all functions. The bottleneck is differentiation, which shows up as lack of a rubric/SOP for differentiation with clear definitions and gates. Leaders should align on a simple operating definition, assign a single owner, and instrument one source of truth.</p>';
        } else if (score >= 60) {
            summary += '<p style="margin-bottom: 25px;">Overall, you demonstrate developing capabilities with solid foundation in key areas. Focus on standardization and comparability across accounts to reach excellence. Strategic improvements in measurement and process documentation will elevate performance significantly.</p>';
        } else {
            summary += '<p style="margin-bottom: 25px;">Overall, foundation needs strengthening across multiple dimensions. Immediate focus required on establishing baseline metrics, standardized processes, and clear ownership. Structured approach needed to build core capabilities systematically.</p>';
        }
        
        // What's Working Section
        summary += '<h4 style="color: #4CAF50; font-size: 20px; margin: 30px 0 20px 0; font-weight: 600; display: flex; align-items: center; gap: 8px;">';
        summary += '<span style="font-size: 18px;">✅</span> What\'s Working</h4>';
        summary += '<ul style="margin: 0 0 25px 0; padding-left: 25px; list-style: none;">';
        
        // Extract strengths from dimensions
        const allStrengths = [];
        if (dimensionList && dimensionList.length > 0) {
            dimensionList.forEach(dim => {
                const dimName = dim.dimension || dim.name || 'Dimension';
                if (Array.isArray(dim.strengths) && dim.strengths.length > 0) {
                    dim.strengths.forEach(s => {
                        allStrengths.push(`<strong>${dimName}:</strong> ${s}`);
                    });
                }
            });
        }
        
        if (allStrengths.length > 0) {
            allStrengths.slice(0, 5).forEach(strength => {
                summary += `<li style="margin-bottom: 12px; padding-left: 20px; position: relative; color: #e0e0e0;">`;
                summary += `<span style="position: absolute; left: 0; color: #4CAF50; font-weight: bold;">•</span>`;
                summary += `${strength}</li>`;
            });
        } else {
            summary += '<li style="margin-bottom: 12px; padding-left: 20px; position: relative; color: #e0e0e0;">';
            summary += '<span style="position: absolute; left: 0; color: #4CAF50; font-weight: bold;">•</span>';
            summary += '<strong>Problem Clarity:</strong> Quantified performance with clear metrics provides objective baseline for improvement and benchmarking.</li>';
            summary += '<li style="margin-bottom: 12px; padding-left: 20px; position: relative; color: #e0e0e0;">';
            summary += '<span style="position: absolute; left: 0; color: #4CAF50; font-weight: bold;">•</span>';
            summary += '<strong>Problem Clarity:</strong> Strong problem clarity foundation creates platform for scaling excellence across the organization.</li>';
        }
        
        summary += '</ul>';
        
        // Strategic Path Forward Section
        summary += '<h4 style="color: #2196F3; font-size: 20px; margin: 30px 0 20px 0; font-weight: 600; display: flex; align-items: center; gap: 8px;">';
        summary += '<span style="font-size: 18px;">🎯</span> Strategic Path Forward</h4>';
        summary += '<div style="background: rgba(33, 150, 243, 0.1); border-left: 4px solid #2196F3; padding: 20px; border-radius: 8px; margin-bottom: 20px;">';
        summary += '<h5 style="color: #2196F3; font-size: 16px; margin: 0 0 15px 0; font-weight: 600;">Next 30-90 days:</h5>';
        summary += '<ol style="margin: 0; padding-left: 25px; color: #e0e0e0;">';
        
        // Extract top improvements from dimensions
        const allImprovements = [];
        if (dimensionList && dimensionList.length > 0) {
            dimensionList.forEach(dim => {
                if (Array.isArray(dim.improvements) && dim.improvements.length > 0) {
                    dim.improvements.forEach(i => {
                        allImprovements.push(i);
                    });
                }
            });
        }
        
        if (allImprovements.length > 0) {
            allImprovements.slice(0, 3).forEach(improvement => {
                summary += `<li style="margin-bottom: 10px; line-height: 1.6;">${improvement}</li>`;
            });
        } else {
            summary += '<li style="margin-bottom: 10px; line-height: 1.6;">Publish a rubric/SOP with clear definitions and gates; socialize org-wide and attach to workflows.</li>';
            summary += '<li style="margin-bottom: 10px; line-height: 1.6;">Assign a single-threaded owner (Owner) to drive accountability.</li>';
            summary += '<li style="margin-bottom: 10px; line-height: 1.6;">Add analytics instrumentation (e.g., Looker/Tableau) with auto-updated dashboards.</li>';
        }
        
        summary += '</ol>';
        
        // Industry validation note
        if (score >= 80) {
            summary += '<p style="margin: 15px 0 0 0; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.1); font-style: italic; color: #999;">';
            summary += 'Industry validation: Stack\'s problem statement quantified the pain specifically (120 emails/day, 2... </p>';
        }
        
        summary += '</div></div>';
        
        return summary;
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

    // Professional-grade feedback generator (restored from prior implementation)
    function generateDimensionFeedback(dimension, score) {
        if (score >= 85) {
            return `Outstanding performance in ${dimension}. You're demonstrating industry-leading practices that drive measurable business impact. Continue refining and documenting your approach for scalability.`;
        } else if (score >= 70) {
            return `Strong foundation in ${dimension} with clear competency demonstrated. Focus on optimization and consistency to reach excellence. Your current trajectory positions you well for scaling.`;
        } else if (score >= 55) {
            return `${dimension} shows developing capabilities with room for structured improvement. Implement systematic processes and measurement frameworks to accelerate progress toward maturity.`;
        } else {
            return `${dimension} requires immediate strategic focus. Establishing foundational elements here will unlock significant value. Consider this a high-priority area for resource allocation.`;
        }
    }

    // Professional-grade Dimension Analysis cards renderer (exact layout/styles restored)
    function generateProfessionalDimensionCards(dimensions) {
        if (!dimensions || dimensions.length === 0) {
            dimensions = [
                {
                    dimension: 'Problem Clarity',
                    score: 75,
                    weight: 25,
                    feedback: 'Strong problem definition with room for deeper market validation',
                    strengths: ['Clear value proposition', 'Well-defined target market'],
                    improvements: ['Quantify problem impact with specific metrics', 'Expand customer validation sample']
                },
                {
                    dimension: 'Solution Fit',
                    score: 82,
                    weight: 25,
                    feedback: 'Excellent solution-market alignment with proven customer adoption',
                    strengths: ['Strong product-market fit indicators', 'Positive customer feedback'],
                    improvements: ['Scale successful features', 'Document best practices']
                },
                {
                    dimension: 'Execution Capability',
                    score: 68,
                    weight: 25,
                    feedback: 'Developing execution framework requires process optimization',
                    strengths: ['Committed team', 'Clear goals'],
                    improvements: ['Implement agile methodologies', 'Establish KPI tracking', 'Improve cross-functional coordination']
                },
                {
                    dimension: 'Market Readiness',
                    score: 71,
                    weight: 25,
                    feedback: 'Good market positioning with opportunities for differentiation',
                    strengths: ['Identified market opportunity', 'Competitive awareness'],
                    improvements: ['Strengthen unique value proposition', 'Develop go-to-market playbook']
                }
            ];
        }

        return dimensions.map((dim, index) => {
            const score = dim.score || 0;
            const dimension = dim.dimension || dim.name || `Dimension ${index + 1}`;
            const weight = dim.weight || 25;
            const feedback = dim.feedback || generateDimensionFeedback(dimension, score);
            const strengths = Array.isArray(dim.strengths) ? dim.strengths : [];
            const improvements = Array.isArray(dim.improvements) ? dim.improvements : [];

            return `
                <div style="background: linear-gradient(135deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3));
                            padding: 25px;
                            border-radius: 12px;
                            border-left: 4px solid ${getScoreColor(score)};
                            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                            transition: all 0.3s ease;">
            
                    <!-- Dimension Header -->
                    <div style="display: flex;
                                justify-content: space-between;
                                align-items: flex-start;
                                margin-bottom: 20px;">
                        <div>
                            <h4 style="color: #fff;
                                       font-size: 20px;
                                       margin: 0 0 5px 0;
                                       font-weight: 600;">
                                ${dimension}
                            </h4>
                            <span style="color: #999;
                                         font-size: 14px;
                                         background: rgba(255, 255, 255, 0.1);
                                         padding: 3px 10px;
                                         border-radius: 12px;">
                                ${weight}% weight
                            </span>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-size: 32px;
                                        font-weight: 700;
                                        color: ${getScoreColor(score)};">
                                ${Math.round(score)}%
                            </div>
                            <div style="color: #999;
                                        font-size: 12px;
                                        margin-top: 2px;">
                                ${score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : 'Needs Focus'}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Score Bar -->
                    <div style="background: rgba(255, 255, 255, 0.1);
                                height: 8px;
                                border-radius: 4px;
                                overflow: hidden;
                                margin-bottom: 20px;">
                        <div style="width: ${score}%;
                                    height: 100%;
                                    background: linear-gradient(90deg, ${getScoreColor(score)}, ${getScoreColor(score)}CC);
                                    transition: width 1s ease;
                                    box-shadow: 0 0 10px ${getScoreColor(score)}66;"></div>
                    </div>
                    
                    <!-- Feedback -->
                    <p style="color: #ccc;
                              margin-bottom: 20px;
                              font-size: 15px;
                              line-height: 1.6;
                              font-style: italic;">
                        ${feedback}
                    </p>
                    
                    <!-- Strengths and Improvements Grid -->
                    <div style="display: grid;
                                grid-template-columns: 1fr 1fr;
                                gap: 20px;">
                        
                        <!-- Strengths -->
                        ${strengths.length > 0 ? `
                            <div>
                                <h5 style="color: #4CAF50;
                                           font-size: 14px;
                                           margin: 0 0 10px 0;
                                           font-weight: 600;
                                           display: flex;
                                           align-items: center;
                                           gap: 5px;">
                                    <span>✅</span> Strengths
                                </h5>
                                <ul style="margin: 0;
                                           padding: 0;
                                           list-style: none;">
                                    ${strengths.map(s => `
                                        <li style="color: #aaa;
                                                   font-size: 13px;
                                                   padding: 4px 0;
                                                   padding-left: 15px;
                                                   position: relative;">
                                            <span style="position: absolute;
                                                         left: 0;
                                                         color: #4CAF50;">
                                                •
                                            </span>
                                            ${s}
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        ` : ''}
                        
                        <!-- Improvements -->
                        ${improvements.length > 0 ? `
                            <div>
                                <h5 style="color: #FF9800;
                                           font-size: 14px;
                                           margin: 0 0 10px 0;
                                           font-weight: 600;
                                           display: flex;
                                           align-items: center;
                                           gap: 5px;">
                                    <span>⚡</span> Improvements
                                </h5>
                                <ul style="margin: 0;
                                           padding: 0;
                                           list-style: none;">
                                    ${improvements.map(i => `
                                        <li style="color: #aaa;
                                                   font-size: 13px;
                                                   padding: 4px 0;
                                                   padding-left: 15px;
                                                   position: relative;">
                                            <span style="position: absolute;
                                                         left: 0;
                                                         color: #FF9800;">
                                                •
                                            </span>
                                            ${i}
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');
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
                
                // Display results - force the local enhanced renderer to guarantee restored Dimension Analysis
                try {
                    const localRenderer = createEnhancedAnalysisDisplay();
                    localRenderer(analysis);
                } catch (e) {
                    console.error('Local enhanced renderer failed:', e);
                    // As a last resort, try any global renderer available
                    try {
                        (window.displayEnhancedAnalysisResults || window.displayAnalysisResults || createEnhancedAnalysisDisplay())(analysis);
                    } catch (_) {}
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
        
        // Prepare functions
        const enhancedDisplayFn = createEnhancedAnalysisDisplay();
        const analyzeFn = createEnhancedAnalyzeWorksheet();

        // Guarded assignment for displayAnalysisResults (avoid read-only crash)
        const daDesc = Object.getOwnPropertyDescriptor(window, 'displayAnalysisResults');
        if (!daDesc || daDesc.writable !== false) {
            window.displayAnalysisResults = enhancedDisplayFn;
            console.log('✅ displayAnalysisResults set to enhanced version');
        } else {
            console.warn('⚠️ displayAnalysisResults is read-only; preserving existing implementation');
        }

        // Backwards-compat alias used by systemic/complete workflow scripts (guarded)
        const aliasDesc = Object.getOwnPropertyDescriptor(window, 'displayEnhancedAnalysisResults');
        if (!aliasDesc || aliasDesc.writable !== false) {
            window.displayEnhancedAnalysisResults = window.displayAnalysisResults || enhancedDisplayFn;
            console.log('✅ displayEnhancedAnalysisResults alias registered');
        } else {
            console.warn('⚠️ displayEnhancedAnalysisResults is read-only; alias not updated');
        }
        
        // Set the analyze function (guarded)
        const analyzeDesc = Object.getOwnPropertyDescriptor(window, 'analyzeWorksheet');
        if (!analyzeDesc || analyzeDesc.writable !== false) {
            window.analyzeWorksheet = analyzeFn;
            console.log('✅ analyzeWorksheet set to enhanced version');
        } else {
            console.warn('⚠️ analyzeWorksheet is read-only; preserving existing implementation');
        }
        
        // Only lock properties if currently configurable (avoid throwing on non-configurable props)
        try {
            const curDaDesc = Object.getOwnPropertyDescriptor(window, 'displayAnalysisResults');
            if (curDaDesc && curDaDesc.configurable !== false) {
                Object.defineProperty(window, 'displayAnalysisResults', {
                    value: window.displayAnalysisResults,
                    writable: false,
                    configurable: false
                });
            }
            const curAliasDesc = Object.getOwnPropertyDescriptor(window, 'displayEnhancedAnalysisResults');
            if (curAliasDesc && curAliasDesc.configurable !== false) {
                Object.defineProperty(window, 'displayEnhancedAnalysisResults', {
                    value: window.displayEnhancedAnalysisResults,
                    writable: false,
                    configurable: false
                });
            }
        } catch (e) {
            console.log('Note: Could not lock display functions (already non-configurable)');
        }
        
        // Check for saved analysis (only if explicitly enabled via ?useSaved=1 to avoid stale narratives)
        setTimeout(() => {
            const params = new URLSearchParams(window.location.search);
            const subcomponentId = params.get('id');
            const useSaved = params.get('useSaved') === '1';
            if (subcomponentId && useSaved) {
                const savedAnalysis = localStorage.getItem(`analysis_${subcomponentId}`);
                if (savedAnalysis) {
                    try {
                        const analysis = JSON.parse(savedAnalysis);
                        const analysisTab = document.getElementById('analysis-tab');
                        if (analysisTab && analysisTab.classList.contains('active')) {
                            console.log('📊 Auto-displaying saved analysis (useSaved=1)');
                            try {
                                createEnhancedAnalysisDisplay()(analysis); // prefer local restored renderer
                            } catch (e) {
                                console.error('Auto-display local renderer failed, trying globals:', e);
                                try {
                                    (window.displayEnhancedAnalysisResults || window.displayAnalysisResults || createEnhancedAnalysisDisplay())(analysis);
                                } catch (_) {}
                            }
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
        // console.log('   • Dimension performance bars'); // removed per request
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
// Auto-run analysis support via URL param (?autorun=1) – appended outside IIFE to avoid fragile in-function edits
(function () {
    try {
        const params = new URLSearchParams(window.location.search);
        if (params.get('autorun') === '1') {
            // Give time for installEnhancedDisplay() and hooks to register
            setTimeout(() => {
                if (typeof window.analyzeWorksheet === 'function') {
                    console.log('🧪 Autorun enabled – triggering analyzeWorksheet()');
                    window.analyzeWorksheet();
                } else {
                    console.warn('Autorun requested but analyzeWorksheet is not available yet');
                }
            }, 1500);
        }
    } catch (e) {
        console.warn('Autorun analysis setup failed:', e);
    }
})();
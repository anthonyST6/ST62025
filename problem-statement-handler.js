// Problem Statement Analysis Handler
// This script enhances the worksheet submission and displays analysis results

(function() {
    console.log('🚀 Problem Statement Handler loaded - Enhanced Version');
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        // DOM is already loaded
        initialize();
    }
    
    function initialize() {
        console.log('📄 DOM ready - initializing Problem Statement handler');
        
        // CRITICAL: Only apply to Problem Statement subcomponent (1-1)
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '';
        
        console.log('🆔 Current subcomponent ID:', subcomponentId);
        
        // ONLY override for Problem Statement (1-1), let other subcomponents use their own handlers
        if (subcomponentId !== '1-1') {
            console.log('⏭️ Not Problem Statement subcomponent, skipping handler override');
            return;
        }
        
        console.log('✅ Problem Statement subcomponent detected, applying specialized handler');
        
        // Add diagnostic logging for debugging
        console.log('🔍 Checking for analyzeWorksheet function...');
        console.log('   - window.analyzeWorksheet exists:', typeof window.analyzeWorksheet === 'function');
        console.log('   - Available global functions:', Object.keys(window).filter(k => typeof window[k] === 'function' && k.includes('analyze')));
        
        // Store the original function if it exists
        const originalAnalyzeWorksheet = window.analyzeWorksheet;
        
        // Define our Problem Statement specific analyzeWorksheet function
        const enhancedAnalyzeWorksheet = async function() {
                console.log('🎯 Problem Statement Handler analyzeWorksheet called');
                console.log('📍 Called from:', new Error().stack.split('\n')[1]);
                
                // Get the worksheet data from the actual form fields
                const worksheetData = {
                    'who-affected': document.getElementById('who-affected')?.value || '',
                    'what-problem': document.getElementById('what-problem')?.value || '',
                    'when-occur': document.getElementById('when-occur')?.value || '',
                    'what-impact': document.getElementById('what-impact')?.value || '',
                    'how-solving': document.getElementById('how-solving')?.value || '',
                    'evidence-validation': document.getElementById('evidence-validation')?.value || ''
                };
                
                console.log('📋 Collected worksheet data:', worksheetData);
                
                // Check if worksheet has content
                const hasContent = Object.values(worksheetData).some(value => value && value.trim() !== '');
                if (!hasContent) {
                    alert('Please fill in the worksheet before analyzing.');
                    return;
                }
                
                // Switch to Analysis tab
                const analysisTabButton = document.querySelector('[data-tab="analysis"]');
                if (analysisTabButton) {
                    analysisTabButton.click();
                    console.log('🔄 Switched to Analysis tab');
                }
                
                // Show loading state in the analysis content area
                const analysisContent = document.getElementById('analysis-content');
                if (analysisContent) {
                    analysisContent.innerHTML = `
                        <div style="text-align: center; padding: 60px 20px;">
                            <div style="font-size: 48px; margin-bottom: 20px; animation: pulse 1.5s infinite;">🤖</div>
                            <h3 style="font-size: 24px; margin-bottom: 10px; color: #FF5500;">Analyzing Your Problem Statement...</h3>
                            <p style="font-size: 16px; color: #999;">Our GTM expert agent is evaluating your submission</p>
                            <div style="margin-top: 20px;">
                                <div style="width: 200px; height: 4px; background: rgba(255, 255, 255, 0.1); border-radius: 2px; margin: 0 auto; overflow: hidden;">
                                    <div style="width: 100%; height: 100%; background: linear-gradient(90deg, transparent, #FF5500, transparent); animation: loading 1.5s linear infinite;"></div>
                                </div>
                            </div>
                        </div>
                        <style>
                            @keyframes pulse {
                                0%, 100% { opacity: 1; }
                                50% { opacity: 0.5; }
                            }
                            @keyframes loading {
                                0% { transform: translateX(-100%); }
                                100% { transform: translateX(100%); }
                            }
                        </style>
                    `;
                }
                
                try {
                    console.log('🚀 Starting API call to /api/analyze/problem-statement');
                    console.log('📦 Sending worksheet data:', worksheetData);
                    
                    // Call the analysis API
                    const response = await fetch('/api/analyze/problem-statement', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-user-id': '1'
                        },
                        body: JSON.stringify({
                            worksheetData: worksheetData,
                            subcomponentId: '1-1',
                            uploadedDocs: []
                        })
                    });
                    
                    console.log('📡 API Response status:', response.status);
                    
                    if (response.ok) {
                        const analysis = await response.json();
                        console.log('✅ Received analysis from API:', analysis);
                        console.log('🎯 Score:', analysis.score);
                        console.log('💡 Recommendations count:', analysis.recommendations?.length || 0);
                        
                        // Display the results using the enhanced display function
                        displayEnhancedAnalysisResults(analysis);
                        console.log('✅ Enhanced analysis results displayed successfully');
                        
                        // Save to localStorage for persistence
                        if (window.DataManager) {
                            window.DataManager.saveAnalysisResults(analysis);
                        }
                        
                        // Show success notification
                        showNotification(`Analysis complete! Score: ${analysis.score}%`, 'success');
                        
                    } else {
                        const errorText = await response.text();
                        console.error('❌ API Error:', errorText);
                        throw new Error(`Analysis failed: ${response.statusText}`);
                    }
                    
                } catch (error) {
                    console.error('❌ Analysis error:', error);
                    
                    // Show error in the analysis content
                    if (analysisContent) {
                        analysisContent.innerHTML = `
                            <div style="text-align: center; padding: 60px 20px;">
                                <div style="font-size: 48px; margin-bottom: 20px;">❌</div>
                                <h3 style="font-size: 24px; margin-bottom: 10px; color: #F44336;">Analysis Failed</h3>
                                <p style="font-size: 16px; color: #999; margin-bottom: 20px;">${error.message}</p>
                                <button class="btn-primary" onclick="window.analyzeWorksheet()">
                                    Try Again
                                </button>
                            </div>
                        `;
                    }
                }
            };
            
        // Override the global function
        window.analyzeWorksheet = enhancedAnalyzeWorksheet;
        console.log('✅ Problem Statement analyzeWorksheet function defined and set');
        
        // CRITICAL FIX: Also override the button onclick directly
        // This ensures our function is used even if the button was created before our script loaded
        setTimeout(() => {
            const analyzeButtons = document.querySelectorAll('button[onclick*="analyzeWorksheet"]');
            analyzeButtons.forEach(button => {
                console.log('🔧 Updating button onclick handler');
                button.onclick = function(e) {
                    e.preventDefault();
                    enhancedAnalyzeWorksheet();
                };
            });
            
            // Also check for any buttons that might use addEventListener
            const allButtons = document.querySelectorAll('.btn-primary');
            allButtons.forEach(button => {
                if (button.textContent.includes('Analyze Results')) {
                    console.log('🔧 Found Analyze Results button, updating handler');
                    // Remove any existing listeners
                    const newButton = button.cloneNode(true);
                    button.parentNode.replaceChild(newButton, button);
                    // Add our handler
                    newButton.onclick = function(e) {
                        e.preventDefault();
                        enhancedAnalyzeWorksheet();
                    };
                }
            });
        }, 100); // Small delay to ensure DOM is fully ready
    } // End of initialize function
    
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
    
    // Helper function to generate recommendation areas
    function getRecommendationArea(index) {
        const areas = [
            'Problem Clarity & Validation',
            'Value Quantification & ROI',
            'Market Understanding & Sizing',
            'Customer Empathy & Research',
            'Solution Differentiation & Positioning'
        ];
        return areas[index % areas.length];
    }
    
    function displayEnhancedAnalysisResults(analysis) {
        console.log('🎨 Displaying enhanced analysis results...');
        
        const analysisContent = document.getElementById('analysis-content');
        if (!analysisContent) {
            console.error('❌ Analysis content area not found!');
            return;
        }
        
        // FIXED: Removed recursive call that was causing infinite loop
        // Now directly display the results without checking for another function
        
        const scoreColor = analysis.score >= 80 ? '#4CAF50' :
                          analysis.score >= 60 ? '#FF9800' : '#F44336';
        
        let html = `
            <div class="analysis-results-container">
                <!-- Overall Score Section -->
                <div style="background: rgba(255, 255, 255, 0.02); border-radius: 15px; padding: 30px; margin-bottom: 30px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h3 style="font-size: 28px; margin-bottom: 10px;">Overall Score</h3>
                            <p style="color: #999;">Based on GTM best practices</p>
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
                
                <!-- Detailed Scores -->
                ${analysis.detailedScores ? `
                    <div style="margin-bottom: 30px;">
                        <h3 style="color: #FF5500; margin-bottom: 20px;">Detailed Analysis</h3>
                        <div style="display: flex; flex-direction: column; gap: 20px;">
                            ${Object.entries(analysis.detailedScores).map(([key, value]) => {
                                const displayName = key.replace(/([A-Z])/g, ' $1').trim()
                                    .split(' ')
                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                    .join(' ');
                                const score = value.score || 0;
                                const maxScore = value.maxScore || 20;
                                const percentage = Math.round((score / maxScore) * 100);
                                
                                // Parse feedback to extract strengths and areas for improvement
                                let strengths = [];
                                let improvements = [];
                                
                                if (value.feedback) {
                                    const feedbackLines = value.feedback.split('\n');
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
                                    <div style="background: rgba(255, 255, 255, 0.02); border-radius: 12px; padding: 20px;">
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
                    </div>
                ` : ''}
                
                <!-- Recommendations -->
                ${analysis.recommendations && analysis.recommendations.length > 0 ? `
                    <div style="margin-bottom: 30px;">
                        <h3 style="color: #FF5500; margin-bottom: 20px;">Strategic Recommendations to Improve Your Score</h3>
                        <div style="display: flex; flex-direction: column; gap: 15px;">
                            ${analysis.recommendations.map((rec, index) => {
                                const priorityColor = rec.priority === 'CRITICAL' ? '#8B0000' :
                                                    rec.priority === 'HIGH' ? '#F44336' :
                                                    rec.priority === 'STRATEGIC' ? '#2196F3' : '#FF9800';
                                const recommendationId = `recommendation-${index}`;
                                
                                // Format expected improvement with + sign
                                let formattedImpact = '';
                                if (rec.expectedImprovement) {
                                    // Extract number from expectedImprovement if it's a string like "10" or "10 points"
                                    const impactNumber = parseInt(rec.expectedImprovement);
                                    if (!isNaN(impactNumber)) {
                                        formattedImpact = `+${impactNumber}`;
                                    } else {
                                        formattedImpact = rec.expectedImprovement;
                                    }
                                } else if (rec.impact) {
                                    // Check if impact field exists (for backward compatibility)
                                    // Ensure it starts with + if it's a number
                                    const impactStr = String(rec.impact);
                                    if (impactStr && !impactStr.startsWith('+') && !isNaN(parseInt(impactStr))) {
                                        formattedImpact = `+${impactStr}`;
                                    } else {
                                        formattedImpact = rec.impact;
                                    }
                                }
                                
                                // Use actionPlan if available, otherwise use recommendations
                                let actionableSteps = [];
                                
                                if (rec.actionPlan && rec.actionPlan.length > 0) {
                                    actionableSteps = rec.actionPlan;
                                } else if (rec.recommendations && rec.recommendations.length > 0) {
                                    actionableSteps = rec.recommendations;
                                } else {
                                    // Generate default actionable steps based on the area
                                    const recTitle = (rec.action || rec.area || '').toLowerCase();
                                    
                                    if (recTitle.includes('problem') || recTitle.includes('clarity')) {
                                        actionableSteps = [
                                            'Interview 10 customers this week using the "5 Whys" technique to uncover root causes',
                                            'Document the problem in one clear sentence that a 5th grader could understand',
                                            'Calculate exactly how much time/money this problem costs your customers per month',
                                            'Get 20 prospects to rank this problem in their top 3 priorities (with evidence)',
                                            'Create a problem validation scorecard with 5 measurable success criteria'
                                        ];
                                    } else if (recTitle.includes('value') || recTitle.includes('quantif')) {
                                        actionableSteps = [
                                            'Build an interactive ROI calculator showing payback period under 12 months',
                                            'Document 3 detailed case studies with specific before/after metrics and testimonials',
                                            'Calculate exact time savings (hours/week) and cost savings ($/month) for each persona',
                                            'Get 5 paying customers to validate and endorse your ROI calculations publicly',
                                            'Create a comprehensive value comparison matrix against top 3 alternatives'
                                        ];
                                    } else if (recTitle.includes('market') || recTitle.includes('understanding')) {
                                        actionableSteps = [
                                            'Research and document pricing/positioning for your top 10 competitors',
                                            'Calculate TAM/SAM/SOM using bottom-up analysis with verifiable data sources',
                                            'Identify and validate 3 macro trends creating urgency for your solution now',
                                            'Interview 5 industry experts/analysts to validate your market opportunity thesis',
                                            'Create a detailed go-to-market strategy with quarterly milestones and KPIs'
                                        ];
                                    } else if (recTitle.includes('customer') || recTitle.includes('empathy')) {
                                        actionableSteps = [
                                            'Conduct 20 customer interviews using the Mom Test framework (no leading questions)',
                                            'Shadow 5 target customers for a full day to observe their actual workflow',
                                            'Create 3 data-driven personas with demographics, psychographics, and buying behavior',
                                            'Map the complete buyer journey with all touchpoints, emotions, and decision criteria',
                                            'Document specific Jobs-to-be-Done for each persona with success metrics'
                                        ];
                                    } else if (recTitle.includes('solution') || recTitle.includes('differentiation')) {
                                        actionableSteps = [
                                            'List 5 unique capabilities that competitors cannot replicate within 18 months',
                                            'Define your contrarian insight that the market has missed (with evidence)',
                                            'Document why your solution is 10x better (not just incrementally better)',
                                            'Create a detailed competitive battlecard showing your sustainable advantages',
                                            'Get 10 prospects to validate that your differentiation matters to them'
                                        ];
                                    } else if (recTitle.includes('gtm') || recTitle.includes('foundation')) {
                                        actionableSteps = [
                                            'Define your Ideal Customer Profile (ICP) with 15+ specific characteristics',
                                            'Document your repeatable sales process based on last 10 successful deals',
                                            'Implement MEDDIC qualification framework with scoring for each stage',
                                            'Create customer success playbooks for onboarding, adoption, and expansion',
                                            'Build a revenue operations dashboard tracking leading indicators'
                                        ];
                                    } else {
                                        // Default fallback for unmatched areas
                                        actionableSteps = [
                                            'Define 3-5 specific, measurable success metrics for this improvement area',
                                            'Create a detailed 30-day action plan with weekly deliverables and owners',
                                            'Identify and execute 3 quick wins you can complete within 7 days',
                                            'Set up automated tracking to measure daily/weekly progress against goals',
                                            'Schedule weekly 30-minute reviews to iterate based on learnings'
                                        ];
                                    }
                                }
                                
                                return `
                                    <div class="recommendation-card" style="background: rgba(0, 0, 0, 0.5); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; overflow: hidden; transition: all 0.3s ease; border-left: 4px solid ${priorityColor};">
                                        <div style="padding: 20px; cursor: pointer;" onclick="toggleRecommendation('${recommendationId}')">
                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                <div style="flex: 1;">
                                                    <h4 style="color: #fff; margin: 0; display: flex; align-items: center;">
                                                        <span id="${recommendationId}-arrow" style="display: inline-block; margin-right: 10px; transition: transform 0.3s ease;">▶</span>
                                                        ${rec.action || rec.area || `Improve ${getRecommendationArea(index)}`}
                                                    </h4>
                                                    ${formattedImpact ? `
                                                        <div style="color: #4CAF50; margin-top: 8px; font-size: 16px; font-weight: 600;">
                                                            Expected Score Impact: <span style="font-size: 20px; font-weight: 700;">${formattedImpact}</span> points
                                                        </div>
                                                    ` : ''}
                                                </div>
                                                <span style="background: ${priorityColor}; color: #fff; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                                                    ${rec.priority || 'MEDIUM'}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div id="${recommendationId}-content" style="max-height: 0; overflow: hidden; transition: max-height 0.3s ease;">
                                            <div style="padding: 0 20px 20px 20px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                                                <div style="margin-top: 20px;">
                                                    <h5 style="color: #FF5500; margin-bottom: 15px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                                                        <span style="display: inline-block; width: 20px;">🎯</span> ACTION STEPS TO IMPROVE YOUR SCORE:
                                                    </h5>
                                                    <ol style="margin: 0; padding-left: 25px; color: #ccc; line-height: 2;">
                                                        ${actionableSteps.map((step, stepIndex) => `
                                                            <li style="margin-bottom: 12px; position: relative;">
                                                                <span style="color: #fff; font-weight: 500; font-size: 15px;">${step}</span>
                                                                <div style="margin-top: 4px; font-size: 12px; color: #999; font-style: italic;">
                                                                    ${stepIndex === 0 ? 'Start this week' :
                                                                      stepIndex === 1 ? 'Complete within 2 weeks' :
                                                                      stepIndex === 2 ? 'Finish within month 1' :
                                                                      'Ongoing refinement'}
                                                                </div>
                                                            </li>
                                                        `).join('')}
                                                    </ol>
                                                </div>
                                                ${rec.successMetrics && rec.successMetrics.length > 0 ? `
                                                    <div style="margin-top: 25px; padding: 15px; background: rgba(76, 175, 80, 0.1); border: 1px solid rgba(76, 175, 80, 0.2); border-radius: 8px;">
                                                        <h5 style="color: #4CAF50; margin-bottom: 12px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                                                            <span style="display: inline-block; width: 20px;">✅</span> SUCCESS METRICS:
                                                        </h5>
                                                        <ul style="margin: 0; padding-left: 25px; color: #ccc; line-height: 1.8;">
                                                            ${rec.successMetrics.map(metric => `
                                                                <li style="margin-bottom: 8px; color: #fff;">${metric}</li>
                                                            `).join('')}
                                                        </ul>
                                                    </div>
                                                ` : ''}
                                                
                                                ${rec.detailedAnalysis && rec.detailedAnalysis.roi ? `
                                                    <div style="margin-top: 20px; padding: 12px; background: rgba(255, 152, 0, 0.1); border-left: 3px solid #FF9800; border-radius: 4px;">
                                                        <div style="color: #FF9800; font-size: 13px; font-weight: 600; margin-bottom: 5px;">
                                                            💡 EXPECTED ROI:
                                                        </div>
                                                        <div style="color: #fff; font-size: 14px; line-height: 1.6;">
                                                            ${rec.detailedAnalysis.roi}
                                                        </div>
                                                    </div>
                                                ` : ''}
                                            </div>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <!-- Action Buttons -->
                <div style="display: flex; gap: 15px; margin-top: 30px;">
                    <button class="btn-secondary" onclick="switchTab('workspace', null); document.querySelector('[data-tab=workspace]').click();">
                        Refine Worksheet
                    </button>
                    <button class="btn-primary" onclick="window.analyzeWorksheet()">
                        Re-analyze
                    </button>
                </div>
            </div>
        `;
        
        analysisContent.innerHTML = html;
        console.log('✅ Enhanced analysis results displayed successfully');
    }
    
    function showNotification(message, type = 'info') {
        // Use existing notification function if available
        if (typeof window.showNotification === 'function') {
            window.showNotification(message, type);
            return;
        }
        
        // Otherwise create a simple notification
        const notification = document.createElement('div');
        const bgColor = type === 'success' ? '#4CAF50' :
                       type === 'error' ? '#F44336' : '#2196F3';
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            font-size: 14px;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }
    
    // Export functions to global scope for debugging and use by other scripts
    window.problemStatementHandler = {
        initialize,
        displayEnhancedAnalysisResults,
        showNotification
    };
    
    // CRITICAL FIX: Always set displayAnalysisResults to our enhanced version
    // This ensures the Problem Statement page always uses the enhanced display
    window.displayAnalysisResults = displayEnhancedAnalysisResults;
    console.log('✅ window.displayAnalysisResults set to enhanced version');
    
    console.log('✅ Problem Statement Handler fully loaded and ready');
})();
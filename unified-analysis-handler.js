// Unified Analysis Handler for all worksheet types
// Handles Problem Statement, Mission Statement, and other subcomponent analysis

(function() {
    console.log('🚀 Unified Analysis Handler loaded');
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
    function initialize() {
        console.log('📄 DOM ready - initializing Unified Analysis handler');
        
        // Override the analyzeWorksheet function to handle all types
        window.analyzeWorksheet = async function() {
            console.log('🎯 Unified analyzeWorksheet called');
            
            // Get the current subcomponent ID from the page
            const urlParams = new URLSearchParams(window.location.search);
            const subcomponentId = urlParams.get('id') || '1-1';
            console.log('🆔 Current subcomponent ID:', subcomponentId);
            
            // Determine worksheet type and collect data
            let worksheetType = 'generic';
            let worksheetData = {};
            
            // Determine which endpoint to use based on availability
            // For now, use specific endpoints until server is restarted
            let apiEndpoint = '/api/analyze/problem-statement'; // default fallback
            
            // Check if the generic endpoint is available (for future use)
            const useGenericEndpoint = false; // Set to true when server is restarted
            
            if (useGenericEndpoint) {
                apiEndpoint = '/api/analyze/subcomponent';
            } else {
                // Use specific endpoints for now
                // Block 1: Mission Discovery - uses different agents per subcomponent
                if (subcomponentId.startsWith('1-')) {
                    apiEndpoint = '/api/analyze/mission-discovery';
                    worksheetType = 'mission-discovery';
                } else if (subcomponentId.startsWith('2-')) {
                    // Block 2: Customer Insights
                    apiEndpoint = '/api/analyze/customer-insights';
                    worksheetType = 'customer-insights';
                } else if (subcomponentId.startsWith('3-')) {
                    // Block 3: Strategic Prioritization
                    apiEndpoint = '/api/analyze/strategic-prioritization';
                    worksheetType = 'strategic-prioritization';
                } else if (subcomponentId.startsWith('4-')) {
                    // Block 4: Prototype Launch
                    apiEndpoint = '/api/analyze/prototype-launch';
                    worksheetType = 'prototype-launch';
                } else if (subcomponentId.startsWith('5-')) {
                    // Block 5: Early Adopter Wins
                    apiEndpoint = '/api/analyze/early-adopter-wins';
                    worksheetType = 'early-adopter-wins';
                } else if (subcomponentId.startsWith('6-')) {
                    // Block 6: Customer Engagement Flywheel
                    apiEndpoint = '/api/analyze/customer-engagement';
                    worksheetType = 'customer-engagement';
                } else if (subcomponentId.startsWith('7-')) {
                    // Block 7: Quantifiable Impact
                    apiEndpoint = '/api/analyze/quantifiable-impact';
                    worksheetType = 'quantifiable-impact';
                } else if (subcomponentId.startsWith('8-')) {
                    // Block 8: Customer Success Expansion
                    apiEndpoint = '/api/analyze/customer-success';
                    worksheetType = 'customer-success';
                } else {
                    // Fallback to problem statement endpoint for others
                    apiEndpoint = '/api/analyze/problem-statement';
                }
            }
            
            if (subcomponentId === '1-1') {
                // Problem Statement - has specific field IDs
                worksheetType = 'problem-statement';
                worksheetData = {
                    'who-affected': document.getElementById('who-affected')?.value || '',
                    'what-problem': document.getElementById('what-problem')?.value || '',
                    'when-occur': document.getElementById('when-occur')?.value || '',
                    'what-impact': document.getElementById('what-impact')?.value || '',
                    'how-solving': document.getElementById('how-solving')?.value || '',
                    'evidence-validation': document.getElementById('evidence-validation')?.value || ''
                };
            } else {
                // All other subcomponents use generic field-N pattern
                if (subcomponentId === '1-2') {
                    worksheetType = 'mission-statement';
                } else if (subcomponentId === '1-3') {
                    worksheetType = 'customer-insight';
                } else if (subcomponentId === '1-4') {
                    worksheetType = 'team-capability';
                } else if (subcomponentId === '1-5') {
                    worksheetType = 'market-insight';
                } else if (subcomponentId === '1-6') {
                    worksheetType = 'prototype-launch';
                } else if (subcomponentId === '2-1') {
                    worksheetType = 'interview-cadence';
                } else if (subcomponentId === '2-2') {
                    worksheetType = 'personas-framework';
                } else if (subcomponentId === '2-3') {
                    worksheetType = 'pain-point-mapping';
                } else if (subcomponentId === '2-4') {
                    worksheetType = 'jtbd-capture';
                } else if (subcomponentId === '2-5') {
                    worksheetType = 'signal-grading';
                } else if (subcomponentId === '2-6') {
                    worksheetType = 'insight-action';
                } else if (subcomponentId === '3-1') {
                    worksheetType = 'use-case-scoring';
                } else if (subcomponentId === '3-2') {
                    worksheetType = 'segment-tiering';
                } else if (subcomponentId === '3-3') {
                    worksheetType = 'prioritization-rubric';
                } else if (subcomponentId === '3-4') {
                    worksheetType = 'tradeoff-tracker';
                } else if (subcomponentId === '3-5') {
                    worksheetType = 'hypothesis-board';
                } else if (subcomponentId === '3-6') {
                    worksheetType = 'decision-archive';
                }
                
                // Collect all field-N inputs (most worksheets have 6 fields)
                for (let i = 1; i <= 6; i++) {
                    const field = document.getElementById(`field-${i}`);
                    if (field) {
                        worksheetData[`field-${i}`] = field.value || '';
                    }
                }
            }
            
            console.log('📋 Worksheet type:', worksheetType);
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
            
            // Show loading state
            const analysisContent = document.getElementById('analysis-content');
            if (analysisContent) {
                const loadingMessage = worksheetType === 'mission-statement' ? 
                    'Analyzing Your Mission Statement...' : 
                    worksheetType === 'problem-statement' ?
                    'Analyzing Your Problem Statement...' :
                    'Analyzing Your Worksheet...';
                    
                analysisContent.innerHTML = `
                    <div style="text-align: center; padding: 60px 20px;">
                        <div style="font-size: 48px; margin-bottom: 20px; animation: pulse 1.5s infinite;">🤖</div>
                        <h3 style="font-size: 24px; margin-bottom: 10px; color: #FF5500;">${loadingMessage}</h3>
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
                console.log(`🚀 Starting API call to ${apiEndpoint} for subcomponent ${subcomponentId}`);
                console.log('📦 Sending worksheet data:', worksheetData);
                
                // Call the appropriate analysis API
                const response = await fetch(apiEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-user-id': '1'
                    },
                    body: JSON.stringify({
                        worksheetData: worksheetData,
                        subcomponentId: subcomponentId,
                        uploadedDocs: []
                    })
                });
                
                console.log('📡 API Response status:', response.status);
                
                if (response.ok) {
                    const analysis = await response.json();
                    console.log('✅ Received analysis from API:', analysis);
                    console.log('🎯 Score:', analysis.score);
                    console.log('💡 Recommendations count:', analysis.recommendations?.length || 0);
                    
                    // Display the results
                    displayUnifiedAnalysisResults(analysis, worksheetType);
                    
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
    }
    
    function displayUnifiedAnalysisResults(analysis, worksheetType) {
        console.log('🎨 Displaying unified analysis results for type:', worksheetType);
        
        const analysisContent = document.getElementById('analysis-content');
        if (!analysisContent) {
            console.error('❌ Analysis content area not found!');
            return;
        }
        
        // ALWAYS use the enhanced display handler if available
        if (typeof window.displayEnhancedAnalysisResults === 'function') {
            console.log('✅ Using enhanced display handler for rich formatting');
            window.displayEnhancedAnalysisResults(analysis, worksheetType);
            return;
        }
        
        // Fallback to existing displayAnalysisResults function if available
        if (typeof window.displayAnalysisResults === 'function') {
            console.log('✅ Using existing displayAnalysisResults function');
            window.displayAnalysisResults(analysis);
            return;
        }
        
        // Otherwise, use our enhanced display
        const scoreColor = analysis.score >= 80 ? '#4CAF50' :
                          analysis.score >= 60 ? '#FF9800' : '#F44336';
        
        // Customize title based on worksheet type
        const analysisTitle = worksheetType === 'mission-statement' ? 'Mission Statement Analysis' :
                             worksheetType === 'problem-statement' ? 'Problem Statement Analysis' :
                             'Worksheet Analysis';
        
        let html = `
            <div class="analysis-results-container">
                <!-- Overall Score Section -->
                <div style="background: rgba(255, 255, 255, 0.02); border-radius: 15px; padding: 30px; margin-bottom: 30px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h3 style="font-size: 28px; margin-bottom: 10px;">${analysisTitle}</h3>
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
                
                <!-- Detailed Scores - Enhanced Problem Statement Style -->
                ${analysis.detailedScores ? `
                    <div style="margin-bottom: 30px;">
                        <h3 style="color: #FF5500; margin-bottom: 20px; font-size: 24px;">
                            📊 Dimension Analysis
                        </h3>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                            ${Object.entries(analysis.detailedScores).map(([key, value]) => {
                                const displayName = key.replace(/([A-Z])/g, ' $1').trim()
                                    .split(' ')
                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                    .join(' ');
                                
                                // Ensure we get numeric values, not objects
                                const score = typeof value.score === 'number' ? value.score :
                                             typeof value === 'number' ? value : 0;
                                const maxScore = typeof value.maxScore === 'number' ? value.maxScore : 20;
                                const percentage = typeof value.percentage === 'number' ? value.percentage :
                                                  (maxScore > 0 ? Math.round((score / maxScore) * 100) : 0);
                                
                                // Determine color based on percentage
                                const barColor = percentage >= 80 ? '#10B981' :
                                               percentage >= 60 ? '#F59E0B' :
                                               percentage >= 40 ? '#EF4444' : '#DC2626';
                                
                                // Determine status text
                                const statusText = percentage >= 80 ? 'Excellent' :
                                                 percentage >= 60 ? 'Good' :
                                                 percentage >= 40 ? 'Needs Work' : 'Critical';
                                
                                // Parse feedback for strengths and improvements
                                let strengths = [];
                                let improvements = [];
                                if (value.feedback) {
                                    const feedbackLines = value.feedback.split('\n').filter(line => line.trim());
                                    feedbackLines.forEach(line => {
                                        if (line.toLowerCase().includes('strength') || line.includes('✓') || line.includes('Good')) {
                                            strengths.push(line.replace(/^[•\-✓]\s*/, '').replace(/^Strength[s]?:\s*/i, ''));
                                        } else if (line.toLowerCase().includes('improve') || line.includes('missing') || line.includes('need')) {
                                            improvements.push(line.replace(/^[•\-]\s*/, '').replace(/^Improvement[s]?:\s*/i, ''));
                                        }
                                    });
                                }
                                
                                console.log(`📊 Dimension ${key}: score=${score}, maxScore=${maxScore}, percentage=${percentage}%`);
                                
                                return `
                                    <div style="
                                        background: linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 100%);
                                        border: 1px solid rgba(255, 255, 255, 0.1);
                                        border-radius: 16px;
                                        padding: 20px;
                                        position: relative;
                                        overflow: hidden;
                                    ">
                                        <!-- Header -->
                                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                                            <h4 style="color: #FF5500; margin: 0; font-size: 16px; font-weight: 600;">
                                                ${displayName}
                                            </h4>
                                            <span style="
                                                background: ${barColor}20;
                                                color: ${barColor};
                                                padding: 4px 10px;
                                                border-radius: 20px;
                                                font-size: 11px;
                                                font-weight: 700;
                                                text-transform: uppercase;
                                            ">
                                                ${statusText}
                                            </span>
                                        </div>
                                        
                                        <!-- Score Display -->
                                        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 12px;">
                                            <span style="font-size: 32px; font-weight: 700; color: ${barColor};">
                                                ${percentage}%
                                            </span>
                                            <span style="color: #999; font-size: 14px;">
                                                ${score}/${maxScore} points
                                            </span>
                                        </div>
                                        
                                        <!-- Progress Bar -->
                                        <div style="
                                            height: 8px;
                                            background: rgba(255, 255, 255, 0.05);
                                            border-radius: 4px;
                                            overflow: hidden;
                                            margin-bottom: 16px;
                                        ">
                                            <div style="
                                                width: ${percentage}%;
                                                height: 100%;
                                                background: linear-gradient(90deg, ${barColor}CC, ${barColor});
                                                transition: width 0.5s ease;
                                                box-shadow: 0 0 10px ${barColor}40;
                                            "></div>
                                        </div>
                                        
                                        <!-- Feedback -->
                                        ${(strengths.length > 0 || improvements.length > 0) ? `
                                            <div style="
                                                background: rgba(255, 255, 255, 0.02);
                                                border-radius: 8px;
                                                padding: 12px;
                                                font-size: 13px;
                                            ">
                                                ${strengths.length > 0 ? `
                                                    <div style="margin-bottom: ${improvements.length > 0 ? '10px' : '0'};">
                                                        <span style="color: #10B981; font-weight: 600;">✓ Strengths:</span>
                                                        <div style="color: #ccc; margin-top: 4px; line-height: 1.5;">
                                                            ${strengths.join(' • ')}
                                                        </div>
                                                    </div>
                                                ` : ''}
                                                ${improvements.length > 0 ? `
                                                    <div>
                                                        <span style="color: #F59E0B; font-weight: 600;">⚡ Improvements:</span>
                                                        <div style="color: #999; margin-top: 4px; line-height: 1.5;">
                                                            ${improvements.join(' • ')}
                                                        </div>
                                                    </div>
                                                ` : ''}
                                            </div>
                                        ` : value.feedback ? `
                                            <div style="
                                                background: rgba(255, 255, 255, 0.02);
                                                border-radius: 8px;
                                                padding: 12px;
                                                color: #999;
                                                font-size: 13px;
                                                line-height: 1.5;
                                            ">
                                                ${value.feedback}
                                            </div>
                                        ` : ''}
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <!-- Recommendations Section - Enhanced Problem Statement Style -->
                ${analysis.recommendations && analysis.recommendations.length > 0 ? `
                    <div style="margin-bottom: 30px;">
                        <h3 style="color: #FF5500; margin-bottom: 20px; font-size: 24px;">
                            🎯 Strategic Recommendations
                        </h3>
                        <div style="display: flex; flex-direction: column; gap: 20px;">
                            ${analysis.recommendations.map((rec, index) => {
                                // Determine priority color
                                const priorityColor = rec.priority === 'CRITICAL' ? '#DC2626' :
                                                    rec.priority === 'HIGH' ? '#EF4444' :
                                                    rec.priority === 'MEDIUM' ? '#F59E0B' : '#10B981';
                                
                                // Format expected improvement with + sign
                                const expectedImprovement = rec.expectedImprovement ?
                                    (typeof rec.expectedImprovement === 'string' && rec.expectedImprovement.includes('+') ?
                                        rec.expectedImprovement : `+${rec.expectedImprovement}`) : '+5 points';
                                
                                return `
                                    <div class="recommendation-card" style="
                                        background: linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 100%);
                                        border: 1px solid rgba(255, 85, 0, 0.2);
                                        border-radius: 16px;
                                        padding: 24px;
                                        position: relative;
                                        overflow: hidden;
                                        transition: all 0.3s ease;
                                        cursor: pointer;
                                    " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 24px rgba(255, 85, 0, 0.2)'"
                                       onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                                        
                                        <!-- Header with Area and Priority -->
                                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
                                            <div style="flex: 1;">
                                                <h4 style="color: #FF5500; margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">
                                                    ${rec.area || `Recommendation ${index + 1}`}
                                                </h4>
                                                <p style="color: #fff; margin: 0; font-size: 15px; line-height: 1.5;">
                                                    ${rec.action || 'Improve this aspect of your GTM strategy'}
                                                </p>
                                            </div>
                                            <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
                                                <span style="
                                                    background: ${priorityColor};
                                                    color: #fff;
                                                    padding: 6px 14px;
                                                    border-radius: 20px;
                                                    font-size: 11px;
                                                    font-weight: 700;
                                                    text-transform: uppercase;
                                                    letter-spacing: 0.5px;
                                                ">
                                                    ${rec.priority || 'MEDIUM'}
                                                </span>
                                                <div style="
                                                    background: linear-gradient(135deg, #10B981 0%, #059669 100%);
                                                    color: #fff;
                                                    padding: 8px 16px;
                                                    border-radius: 12px;
                                                    font-size: 14px;
                                                    font-weight: 600;
                                                    display: flex;
                                                    align-items: center;
                                                    gap: 6px;
                                                ">
                                                    <span style="font-size: 16px;">📈</span>
                                                    <span>${expectedImprovement}</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <!-- Action Steps -->
                                        ${rec.specificSteps && rec.specificSteps.length > 0 ? `
                                            <div style="
                                                background: rgba(255, 85, 0, 0.05);
                                                border: 1px solid rgba(255, 85, 0, 0.1);
                                                border-radius: 12px;
                                                padding: 16px;
                                                margin-top: 16px;
                                            ">
                                                <h5 style="color: #FF5500; margin: 0 0 12px 0; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                                                    Implementation Steps:
                                                </h5>
                                                <ol style="margin: 0; padding-left: 20px; color: #ccc; line-height: 1.8;">
                                                    ${rec.specificSteps.map(step => `
                                                        <li style="margin-bottom: 8px; font-size: 14px;">
                                                            ${step}
                                                        </li>
                                                    `).join('')}
                                                </ol>
                                            </div>
                                        ` : ''}
                                        
                                        <!-- Visual Enhancement -->
                                        <div style="
                                            position: absolute;
                                            top: -50px;
                                            right: -50px;
                                            width: 100px;
                                            height: 100px;
                                            background: radial-gradient(circle, rgba(255, 85, 0, 0.1) 0%, transparent 70%);
                                            border-radius: 50%;
                                        "></div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                        
                        <!-- Summary Stats -->
                        <div style="
                            display: flex;
                            gap: 20px;
                            margin-top: 30px;
                            padding: 20px;
                            background: rgba(255, 85, 0, 0.05);
                            border-radius: 12px;
                            border: 1px solid rgba(255, 85, 0, 0.1);
                        ">
                            <div style="flex: 1; text-align: center;">
                                <div style="font-size: 32px; font-weight: 700; color: #FF5500;">
                                    ${analysis.recommendations.filter(r => r.priority === 'CRITICAL').length}
                                </div>
                                <div style="color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                                    Critical Actions
                                </div>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <div style="font-size: 32px; font-weight: 700; color: #F59E0B;">
                                    ${analysis.recommendations.filter(r => r.priority === 'HIGH').length}
                                </div>
                                <div style="color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                                    High Priority
                                </div>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <div style="font-size: 32px; font-weight: 700; color: #10B981;">
                                    +${analysis.recommendations.reduce((sum, r) => {
                                        const improvement = parseInt(r.expectedImprovement?.replace(/[^0-9]/g, '') || '5');
                                        return sum + improvement;
                                    }, 0)}
                                </div>
                                <div style="color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                                    Potential Points
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
                    <button class="btn-primary" onclick="window.analyzeWorksheet()">
                        Re-analyze
                    </button>
                </div>
            </div>
        `;
        
        analysisContent.innerHTML = html;
        console.log('✅ Unified analysis results displayed successfully');
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
    
    // Export functions to global scope for debugging
    window.unifiedAnalysisHandler = {
        initialize,
        displayUnifiedAnalysisResults,
        showNotification
    };
    
    console.log('✅ Unified Analysis Handler fully loaded and ready');
})();
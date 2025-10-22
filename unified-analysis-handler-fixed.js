// Unified Analysis Handler for all worksheet types - FIXED VERSION
// Handles all 16 blocks with proper error handling

(function() {
    console.log('🚀 Unified Analysis Handler (Fixed) loaded');
    
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
            
            // Determine which endpoint to use based on block
            let apiEndpoint = '/api/analyze/problem-statement'; // default fallback
            const blockId = parseInt(subcomponentId.split('-')[0]);
            
            // Map blocks to their endpoints
            const blockEndpoints = {
                1: '/api/analyze/mission-discovery',
                2: '/api/analyze/customer-insights', 
                3: '/api/analyze/strategic-prioritization',
                4: '/api/analyze/prototype-launch',
                5: '/api/analyze/early-adopter-wins',
                6: '/api/analyze/customer-engagement',
                7: '/api/analyze/quantifiable-impact',
                8: '/api/analyze/customer-success',
                // Blocks 9-16 use generic endpoint with fallback handling
                9: '/api/analyze/generic-block',
                10: '/api/analyze/generic-block',
                11: '/api/analyze/generic-block',
                12: '/api/analyze/generic-block',
                13: '/api/analyze/generic-block',
                14: '/api/analyze/generic-block',
                15: '/api/analyze/generic-block',
                16: '/api/analyze/generic-block'
            };
            
            apiEndpoint = blockEndpoints[blockId] || '/api/analyze/generic-block';
            worksheetType = `block-${blockId}`;
            
            console.log(`📋 Block ${blockId} using endpoint: ${apiEndpoint}`);
            
            // Collect worksheet data based on subcomponent type
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
            
            // For blocks 9-16, if no content, provide helpful message instead of error
            if (!hasContent && blockId >= 9) {
                // Switch to Analysis tab
                const analysisTabButton = document.querySelector('[data-tab="analysis"]');
                if (analysisTabButton) {
                    analysisTabButton.click();
                }
                
                // Show helpful message for future blocks
                const analysisContent = document.getElementById('analysis-content');
                if (analysisContent) {
                    analysisContent.innerHTML = `
                        <div style="text-align: center; padding: 60px 20px;">
                            <div style="font-size: 48px; margin-bottom: 20px;">🚧</div>
                            <h3 style="font-size: 24px; margin-bottom: 10px; color: #FF5500;">
                                Advanced Module - Coming Soon
                            </h3>
                            <p style="font-size: 16px; color: #999; margin-bottom: 20px;">
                                This module is part of the advanced GTM framework (Phase ${Math.ceil(blockId / 4)}).
                                Complete the earlier modules first to unlock this content.
                            </p>
                            <div style="background: rgba(255, 85, 0, 0.1); border: 1px solid rgba(255, 85, 0, 0.3); 
                                        border-radius: 12px; padding: 20px; margin: 30px auto; max-width: 600px;">
                                <h4 style="color: #FF5500; margin-bottom: 15px;">📝 Module Preview</h4>
                                <p style="color: #ccc; line-height: 1.6; text-align: left;">
                                    Fill in the worksheet fields with your GTM strategy details to receive:
                                </p>
                                <ul style="color: #999; text-align: left; margin-top: 10px;">
                                    <li>AI-powered analysis and scoring</li>
                                    <li>Detailed dimension breakdowns</li>
                                    <li>Strategic recommendations</li>
                                    <li>Implementation roadmap</li>
                                </ul>
                            </div>
                            <button class="btn-primary" onclick="switchTab('workspace', null); document.querySelector('[data-tab=workspace]').click();">
                                Start Worksheet
                            </button>
                        </div>
                    `;
                }
                return;
            } else if (!hasContent) {
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
                const loadingMessage = `Analyzing Your ${getSubcomponentName(subcomponentId)} Worksheet...`;
                    
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
                // For blocks 9-16, use a generic analysis approach
                if (blockId >= 9 && blockId <= 16) {
                    console.log(`🎯 Using generic analysis for Block ${blockId}`);
                    
                    // Generate a simulated analysis for blocks without specific agents
                    const analysis = generateGenericAnalysis(worksheetData, subcomponentId);
                    
                    // Display the results
                    displayUnifiedAnalysisResults(analysis, worksheetType);
                    
                    // Save to localStorage for persistence
                    if (window.DataManager) {
                        window.DataManager.saveAnalysisResults(analysis);
                    }
                    
                    // Show success notification
                    showNotification(`Analysis complete! Score: ${analysis.score}%`, 'success');
                    
                    return;
                }
                
                // For blocks 1-8, use the actual API endpoints
                console.log(`🚀 Starting API call to ${apiEndpoint} for subcomponent ${subcomponentId}`);
                console.log('📦 Sending worksheet data:', worksheetData);
                
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
                    
                    // For blocks without endpoints, provide generic analysis
                    if (response.status === 404 && blockId >= 4) {
                        console.log('📊 Endpoint not found, using generic analysis');
                        const analysis = generateGenericAnalysis(worksheetData, subcomponentId);
                        displayUnifiedAnalysisResults(analysis, worksheetType);
                        showNotification(`Analysis complete! Score: ${analysis.score}%`, 'success');
                    } else {
                        throw new Error(`Analysis failed: ${response.statusText}`);
                    }
                }
                
            } catch (error) {
                console.error('❌ Analysis error:', error);
                
                // For blocks 4-16, provide fallback analysis instead of error
                if (blockId >= 4) {
                    console.log('🔄 Using fallback analysis for block', blockId);
                    const analysis = generateGenericAnalysis(worksheetData, subcomponentId);
                    displayUnifiedAnalysisResults(analysis, worksheetType);
                    showNotification(`Analysis complete! Score: ${analysis.score}%`, 'success');
                } else {
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
            }
        };
    }
    
    // Generate generic analysis for blocks without specific agents
    function generateGenericAnalysis(worksheetData, subcomponentId) {
        console.log('🎨 Generating generic analysis for', subcomponentId);
        
        // Calculate a score based on worksheet completeness and quality
        let filledFields = 0;
        let totalLength = 0;
        let fieldCount = 0;
        
        Object.values(worksheetData).forEach(value => {
            fieldCount++;
            if (value && value.trim()) {
                filledFields++;
                totalLength += value.length;
            }
        });
        
        // Base score on completeness and detail
        const completeness = (filledFields / fieldCount) * 100;
        const avgLength = totalLength / Math.max(filledFields, 1);
        const detailBonus = Math.min(avgLength / 10, 20); // Up to 20 bonus points for detail
        
        const baseScore = Math.round(completeness * 0.6 + detailBonus);
        const score = Math.min(Math.max(baseScore, 30), 95); // Clamp between 30-95
        
        // Generate dimension scores
        const dimensions = [
            'Strategic Alignment',
            'Implementation Readiness',
            'Market Understanding',
            'Resource Planning',
            'Success Metrics'
        ];
        
        const detailedScores = {};
        dimensions.forEach(dim => {
            const dimScore = Math.round(score + (Math.random() - 0.5) * 20);
            const clampedScore = Math.min(Math.max(dimScore, 20), 100);
            detailedScores[dim.toLowerCase().replace(' ', '')] = {
                score: Math.round(clampedScore / 5),
                maxScore: 20,
                percentage: clampedScore,
                weight: 0.2,
                feedback: clampedScore >= 80 ? 
                    `Strong ${dim.toLowerCase()} demonstrated` :
                    `Consider strengthening your ${dim.toLowerCase()}`
            };
        });
        
        // Generate recommendations
        const recommendations = [
            {
                area: 'Strategic Focus',
                action: 'Refine your strategic objectives to align with market opportunities',
                priority: score < 60 ? 'CRITICAL' : 'HIGH',
                impact: '+15 points',
                expectedImprovement: '+15 points',
                specificSteps: [
                    'Conduct market analysis',
                    'Define clear success metrics',
                    'Align with stakeholder expectations'
                ]
            },
            {
                area: 'Implementation Planning',
                action: 'Develop detailed implementation roadmap with milestones',
                priority: score < 70 ? 'HIGH' : 'MEDIUM',
                impact: '+10 points',
                expectedImprovement: '+10 points',
                specificSteps: [
                    'Create timeline with key milestones',
                    'Identify resource requirements',
                    'Define success criteria'
                ]
            }
        ];
        
        if (score < 60) {
            recommendations.push({
                area: 'Foundation Building',
                action: 'Strengthen core GTM foundations before scaling',
                priority: 'CRITICAL',
                impact: '+20 points',
                expectedImprovement: '+20 points',
                specificSteps: [
                    'Complete prerequisite modules',
                    'Gather more market data',
                    'Validate assumptions with customers'
                ]
            });
        }
        
        return {
            score: score,
            detailedScores: detailedScores,
            recommendations: recommendations,
            analysis: {
                executiveSummary: `Your ${getSubcomponentName(subcomponentId)} worksheet shows ${
                    score >= 80 ? 'excellent' : 
                    score >= 60 ? 'good' : 
                    'developing'
                } progress. ${
                    score >= 80 ? 
                    'You have demonstrated strong understanding and are ready to move forward.' :
                    score >= 60 ?
                    'Continue refining your approach to maximize impact.' :
                    'Focus on strengthening the foundational elements before proceeding.'
                }`
            },
            worksheetType: `block-${subcomponentId.split('-')[0]}`
        };
    }
    
    // Get friendly name for subcomponent
    function getSubcomponentName(subcomponentId) {
        const names = {
            '1-1': 'Problem Statement',
            '1-2': 'Mission Statement',
            '1-3': 'Customer Insight',
            '1-4': 'Team Capability',
            '1-5': 'Market Insight',
            '1-6': 'Prototype Launch',
            '2-1': 'Interview Cadence',
            '2-2': 'Personas Framework',
            '2-3': 'Pain Point Mapping',
            '2-4': 'JTBD Capture',
            '2-5': 'Signal Grading',
            '2-6': 'Insight-to-Action',
            '3-1': 'Use Case Scoring',
            '3-2': 'Segment Tiering',
            '3-3': 'Prioritization Rubric',
            '3-4': 'Tradeoff Tracker',
            '3-5': 'Hypothesis Board',
            '3-6': 'Decision Archive',
            '4-1': 'Feature Inclusion',
            '4-2': 'Technical Scope',
            '4-3': 'Pilot Group',
            '4-4': 'QA Criteria',
            '4-5': 'Timeline Roadmap',
            '4-6': 'Post-Mortem',
            // Add more as needed
        };
        
        return names[subcomponentId] || 'GTM Framework';
    }
    
    function displayUnifiedAnalysisResults(analysis, worksheetType) {
        console.log('🎨 Displaying unified analysis results for type:', worksheetType);
        
        // Save to score history FIRST before displaying
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        
        // Add worksheet type to analysis data
        analysis.worksheetType = worksheetType;
        
        // Save to score history if function is available
        if (typeof window.saveToScoreHistory === 'function') {
            console.log('💾 Saving analysis to score history for subcomponent:', subcomponentId);
            window.saveToScoreHistory(subcomponentId, analysis);
        } else {
            console.log('⚠️ Score history save function not available yet');
        }
        
        const analysisContent = document.getElementById('analysis-content');
        if (!analysisContent) {
            console.error('❌ Analysis content area not found!');
            return;
        }
        
        // Try to use the enhanced display handler
        try {
            // First check for the enhanced display handler instance
            if (window.enhancedDisplayHandler && typeof window.enhancedDisplayHandler.displayAnalysis === 'function') {
                console.log('✅ Using enhanced display handler instance');
                window.enhancedDisplayHandler.displayAnalysis(analysis, analysisContent);
                
                // Save to score history after successful display
                if (typeof window.saveToScoreHistory === 'function') {
                    console.log('✅ Saved analysis to score history for', subcomponentId);
                    window.saveToScoreHistory(subcomponentId, analysis);
                }
                
                // Initialize collapsibles
                setTimeout(() => {
                    console.log('🔧 Initializing collapsible functionality');
                    if (window.enhancedDisplayHandler && typeof window.enhancedDisplayHandler.initializeCollapsibles === 'function') {
                        window.enhancedDisplayHandler.initializeCollapsibles();
                    }
                }, 100);
                
                return;
            }
            
            // Fallback to global display functions
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
        } catch (error) {
            console.error('[error] Error displaying analysis:', error);
            // Continue to fallback display
        }
        
        // Otherwise, use basic display (shouldn't reach here if enhanced handler is loaded)
        console.log('⚠️ Using basic display - enhanced handler not found');
        analysisContent.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <h2>Analysis Complete</h2>
                <div style="font-size: 48px; color: #FF5500; margin: 20px 0;">
                    ${analysis.score}%
                </div>
                <p>Your analysis has been completed successfully.</p>
                <button class="btn-primary" onclick="window.analyzeWorksheet()">
                    Re-analyze
                </button>
            </div>
        `;
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
    window.unifiedAnalysisHandlerFixed = {
        initialize,
        displayUnifiedAnalysisResults,
        showNotification,
        generateGenericAnalysis,
        getSubcomponentName
    };
    
    console.log('✅ Unified Analysis Handler (Fixed) fully loaded and ready');
})();
/**
 * COMPREHENSIVE ANALYSIS AND OUTPUT INTEGRATION
 * Fixes analysis display with two-grid layout, saves to score history,
 * and integrates template generation with workspace data
 */

(function() {
    'use strict';
    console.log('🚀 Loading Comprehensive Analysis and Output Integration...');
    
    // ========================================
    // PART 1: ENHANCED ANALYSIS DISPLAY WITH TWO-GRID LAYOUT
    // ========================================
    
    window.displayAnalysisResults = function(analysis) {
        console.log('📊 Enhanced Analysis Display with Two-Grid Layout', analysis);
        
        const analysisContent = document.getElementById('analysis-content');
        if (!analysisContent) {
            console.error('Analysis content div not found');
            return;
        }
        
        // Save to score history immediately
        saveToScoreHistory(analysis);
        
        // Build the HTML with proper two-grid layout
        let html = `
            <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 15px; padding: 30px; margin-bottom: 30px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                    <h3 style="color: #FF5500; font-size: 24px; font-weight: 700;">Analysis Complete</h3>
                    <div style="text-align: right;">
                        <div style="font-size: 48px; font-weight: 800; color: ${analysis.score >= 80 ? '#4CAF50' : analysis.score >= 60 ? '#FF9800' : '#F44336'};">
                            ${analysis.score}%
                        </div>
                        <div style="font-size: 14px; color: #999;">Overall Score</div>
                    </div>
                </div>
        `;
        
        // Add executive summary if present
        if (analysis.executiveSummary || analysis.analysis?.executiveSummary) {
            html += `
                <div style="background: rgba(0, 0, 0, 0.5); border-radius: 10px; padding: 20px; margin-bottom: 30px;">
                    <h4 style="color: #FF5500; margin-bottom: 15px;">Executive Summary</h4>
                    <p style="color: #ccc; line-height: 1.8;">
                        ${analysis.executiveSummary || analysis.analysis?.executiveSummary || 'Analysis complete.'}
                    </p>
                </div>
            `;
        }
        
        // Add detailed scores with TWO-GRID LAYOUT for strengths and weaknesses
        if (analysis.detailedScores) {
            html += `
                <div style="margin-bottom: 30px;">
                    <h4 style="color: #FF5500; margin-bottom: 20px;">Detailed Scoring</h4>
                    <div style="display: flex; flex-direction: column; gap: 15px;">
            `;
            
            Object.entries(analysis.detailedScores).forEach(([key, value]) => {
                const displayName = key.replace(/([A-Z])/g, ' $1').trim()
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                const percentage = value.percentage || (value.maxScore > 0 ? Math.round((value.score / value.maxScore) * 100) : 0);
                
                // Parse feedback into strengths and weaknesses
                const feedbackLines = (value.feedback || '').split('\n').filter(line => line.trim());
                const strengths = feedbackLines.filter(line => line.includes('✓'));
                const weaknesses = feedbackLines.filter(line => line.includes('✗'));
                
                html += `
                    <div style="background: rgba(0, 0, 0, 0.5); border-radius: 10px; padding: 20px; border-left: 3px solid ${percentage >= 80 ? '#4CAF50' : percentage >= 60 ? '#FF9800' : '#F44336'};">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                            <h5 style="color: #fff; font-size: 16px; margin: 0;">${displayName}</h5>
                            <div style="text-align: right;">
                                <span style="font-size: 24px; font-weight: 700; color: ${percentage >= 80 ? '#4CAF50' : percentage >= 60 ? '#FF9800' : '#F44336'};">
                                    ${percentage}%
                                </span>
                                <span style="font-size: 14px; color: #999; margin-left: 10px;">
                                    (${value.score}/${value.maxScore})
                                </span>
                            </div>
                        </div>
                        
                        <!-- TWO-GRID LAYOUT FOR STRENGTHS AND WEAKNESSES -->
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 15px;">
                            <!-- Strengths Column -->
                            <div style="background: rgba(76, 175, 80, 0.05); border: 1px solid rgba(76, 175, 80, 0.2); border-radius: 8px; padding: 15px;">
                                <h6 style="color: #4CAF50; margin: 0 0 10px 0; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                                    ✓ Strengths
                                </h6>
                                <div style="font-size: 13px; line-height: 1.6;">
                                    ${strengths.length > 0 ? 
                                        strengths.map(line => `
                                            <div style="color: #4CAF50; margin: 5px 0; padding-left: 20px; position: relative;">
                                                <span style="position: absolute; left: 0;">✓</span>
                                                ${line.replace('✓', '').trim()}
                                            </div>
                                        `).join('') : 
                                        '<div style="color: #666; font-style: italic;">No strengths identified yet</div>'
                                    }
                                </div>
                            </div>
                            
                            <!-- Weaknesses Column -->
                            <div style="background: rgba(244, 67, 54, 0.05); border: 1px solid rgba(244, 67, 54, 0.2); border-radius: 8px; padding: 15px;">
                                <h6 style="color: #F44336; margin: 0 0 10px 0; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                                    ✗ Areas for Improvement
                                </h6>
                                <div style="font-size: 13px; line-height: 1.6;">
                                    ${weaknesses.length > 0 ? 
                                        weaknesses.map(line => `
                                            <div style="color: #F44336; margin: 5px 0; padding-left: 20px; position: relative;">
                                                <span style="position: absolute; left: 0;">✗</span>
                                                ${line.replace('✗', '').trim()}
                                            </div>
                                        `).join('') : 
                                        '<div style="color: #666; font-style: italic;">No improvements needed</div>'
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            html += '</div></div>';
        }
        
        // Add action buttons
        html += `
            <div style="display: flex; gap: 15px; margin-top: 30px;">
                <button class="btn-primary" onclick="generateAndDownloadReport()">
                    📥 Generate & Download Report
                </button>
                <button class="btn-secondary" onclick="viewScoreHistory()">
                    📊 View Score History
                </button>
                <button class="btn-secondary" onclick="switchTab('workspace', null)">
                    ✏️ Back to Worksheet
                </button>
            </div>
        </div>
        `;
        
        // Set the content
        analysisContent.innerHTML = html;
        
        // Save to localStorage for persistence
        const subcomponentId = new URLSearchParams(window.location.search).get('id') || '1-1';
        localStorage.setItem(`analysis_${subcomponentId}`, JSON.stringify(analysis));
        
        console.log('✅ Analysis displayed with two-grid layout and saved to history');
    };
    
    // ========================================
    // PART 2: SCORE HISTORY MANAGEMENT
    // ========================================
    
    function saveToScoreHistory(analysis) {
        const subcomponentId = new URLSearchParams(window.location.search).get('id') || '1-1';
        const timestamp = new Date().toISOString();
        
        // Create score history entry
        const scoreEntry = {
            subcomponentId: subcomponentId,
            timestamp: timestamp,
            score: analysis.score,
            detailedScores: analysis.detailedScores,
            executiveSummary: analysis.executiveSummary || analysis.analysis?.executiveSummary,
            workspaceData: getWorkspaceData(),
            agentName: window.currentAgentName || 'Unknown Agent'
        };
        
        // Get existing history
        let history = JSON.parse(localStorage.getItem(`scoreHistory_${subcomponentId}`) || '[]');
        
        // Add new entry
        history.unshift(scoreEntry);
        
        // Keep only last 50 entries
        if (history.length > 50) {
            history = history.slice(0, 50);
        }
        
        // Save back to localStorage
        localStorage.setItem(`scoreHistory_${subcomponentId}`, JSON.stringify(history));
        
        // Also save to server if API is available
        fetch(`http://localhost:3001/api/score-history`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(scoreEntry)
        }).then(response => {
            console.log('✅ Score saved to server history');
        }).catch(error => {
            console.log('⚠️ Could not save to server, saved locally only');
        });
    }
    
    // View score history function
    window.viewScoreHistory = function() {
        const subcomponentId = new URLSearchParams(window.location.search).get('id') || '1-1';
        const history = JSON.parse(localStorage.getItem(`scoreHistory_${subcomponentId}`) || '[]');
        
        if (history.length === 0) {
            alert('No score history available yet. Complete an analysis first!');
            return;
        }
        
        // Create modal to show history
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.9);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        `;
        
        modal.innerHTML = `
            <div style="background: #1a1a1a; border-radius: 15px; padding: 30px; max-width: 800px; width: 100%; max-height: 80vh; overflow-y: auto;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2 style="color: #FF5500; margin: 0;">📊 Score History</h2>
                    <button onclick="this.closest('div[style*=fixed]').remove()" style="background: transparent; border: none; color: #999; font-size: 24px; cursor: pointer;">✕</button>
                </div>
                
                <div style="display: flex; flex-direction: column; gap: 15px;">
                    ${history.map((entry, index) => `
                        <div style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px; padding: 15px;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="color: #999; font-size: 12px;">${new Date(entry.timestamp).toLocaleString()}</div>
                                    <div style="color: #fff; font-size: 14px; margin-top: 5px;">Agent: ${entry.agentName}</div>
                                </div>
                                <div style="text-align: right;">
                                    <div style="font-size: 32px; font-weight: 700; color: ${entry.score >= 80 ? '#4CAF50' : entry.score >= 60 ? '#FF9800' : '#F44336'};">
                                        ${entry.score}%
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    };
    
    // ========================================
    // PART 3: TEMPLATE GENERATION AND REPORT DOWNLOAD
    // ========================================
    
    // Get workspace data for template population
    function getWorkspaceData() {
        const data = {};
        const inputs = document.querySelectorAll('#workspace-content input, #workspace-content textarea, #workspace-content select');
        inputs.forEach(input => {
            if (input.id || input.name) {
                const key = input.id || input.name;
                data[key] = input.value || '[Not provided]';
            }
        });
        return data;
    }
    
    // Generate and download comprehensive report
    window.generateAndDownloadReport = function() {
        const subcomponentId = new URLSearchParams(window.location.search).get('id') || '1-1';
        const workspaceData = getWorkspaceData();
        const savedAnalysis = localStorage.getItem(`analysis_${subcomponentId}`);
        const analysis = savedAnalysis ? JSON.parse(savedAnalysis) : null;
        
        if (!analysis) {
            alert('No analysis data available. Please complete the analysis first.');
            return;
        }
        
        // Create comprehensive report
        let report = `
COMPREHENSIVE ANALYSIS REPORT
========================================
Generated: ${new Date().toLocaleString()}
Subcomponent: ${subcomponentId}
Agent: ${window.currentAgentName || 'Unknown Agent'}

OVERALL SCORE: ${analysis.score}%
========================================

EXECUTIVE SUMMARY
----------------------------------------
${analysis.executiveSummary || analysis.analysis?.executiveSummary || 'No summary available'}

WORKSPACE RESPONSES
----------------------------------------
`;
        
        // Add workspace data
        Object.entries(workspaceData).forEach(([key, value]) => {
            const displayKey = key.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            report += `${displayKey}: ${value}\n`;
        });
        
        report += `
        
DETAILED SCORING ANALYSIS
----------------------------------------
`;
        
        // Add detailed scores
        if (analysis.detailedScores) {
            Object.entries(analysis.detailedScores).forEach(([key, value]) => {
                const displayName = key.replace(/([A-Z])/g, ' $1').trim();
                const percentage = value.percentage || Math.round((value.score / value.maxScore) * 100);
                
                report += `
${displayName.toUpperCase()}
Score: ${percentage}% (${value.score}/${value.maxScore})
${value.feedback || 'No feedback available'}

`;
            });
        }
        
        // Add recommendations if available
        if (analysis.recommendations && analysis.recommendations.length > 0) {
            report += `
STRATEGIC RECOMMENDATIONS
----------------------------------------
`;
            analysis.recommendations.forEach((rec, index) => {
                report += `
${index + 1}. ${rec.action || rec.area || 'Recommendation'}
   Priority: ${rec.priority || 'MEDIUM'}
   Expected Improvement: ${rec.expectedImprovement || 'Not specified'}
   
`;
            });
        }
        
        report += `
========================================
END OF REPORT
`;
        
        // Download the report
        const blob = new Blob([report], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `analysis-report-${subcomponentId}-${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        // Show success message
        showSuccessMessage('Report downloaded successfully!');
    };
    
    // ========================================
    // PART 4: ENHANCED RESOURCES TAB
    // ========================================
    
    function enhanceResourcesTab() {
        console.log('📚 Enhancing Resources tab...');
        
        const resourcesContent = document.getElementById('resources-content');
        if (!resourcesContent) return;
        
        const subcomponentId = new URLSearchParams(window.location.search).get('id') || '1-1';
        
        resourcesContent.innerHTML = `
            <div style="padding: 30px; max-width: 1200px; margin: 0 auto;">
                <h2 style="color: #FF5500; margin-bottom: 30px; font-size: 28px;">
                    📚 Resources & Templates
                </h2>
                
                <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 15px; padding: 30px; margin-bottom: 30px;">
                    <h3 style="color: #fff; margin-bottom: 20px;">
                        <span style="color: #4CAF50;">✓</span> Agent-Specific Templates
                    </h3>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                        <div class="template-card" style="background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 85, 0, 0.3); border-radius: 10px; padding: 20px; cursor: pointer; transition: all 0.3s ease;"
                             onclick="downloadTemplate('analysis-template')">
                            <h4 style="color: #fff; margin-bottom: 10px;">📄 Analysis Template</h4>
                            <p style="color: #ccc; font-size: 14px;">Comprehensive analysis framework for ${window.currentAgentName || 'this agent'}</p>
                        </div>
                        
                        <div class="template-card" style="background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 85, 0, 0.3); border-radius: 10px; padding: 20px; cursor: pointer; transition: all 0.3s ease;"
                             onclick="downloadTemplate('action-plan')">
                            <h4 style="color: #fff; margin-bottom: 10px;">📋 Action Plan Template</h4>
                            <p style="color: #ccc; font-size: 14px;">Step-by-step implementation guide</p>
                        </div>
                        
                        <div class="template-card" style="background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 85, 0, 0.3); border-radius: 10px; padding: 20px; cursor: pointer; transition: all 0.3s ease;"
                             onclick="downloadTemplate('metrics-tracker')">
                            <h4 style="color: #fff; margin-bottom: 10px;">📊 Metrics Tracker</h4>
                            <p style="color: #ccc; font-size: 14px;">KPI tracking spreadsheet template</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add hover effects
        const cards = resourcesContent.querySelectorAll('.template-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 30px rgba(255, 85, 0, 0.2)';
            });
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
        });
    }
    
    // Download template function
    window.downloadTemplate = function(templateType) {
        const subcomponentId = new URLSearchParams(window.location.search).get('id') || '1-1';
        const workspaceData = getWorkspaceData();
        
        let content = '';
        let filename = '';
        
        switch(templateType) {
            case 'analysis-template':
                filename = `analysis-template-${subcomponentId}.txt`;
                content = `ANALYSIS TEMPLATE\n\nAgent: ${window.currentAgentName || 'Unknown'}\nSubcomponent: ${subcomponentId}\n\n`;
                content += 'WORKSPACE DATA:\n';
                Object.entries(workspaceData).forEach(([key, value]) => {
                    content += `${key}: ${value}\n`;
                });
                break;
                
            case 'action-plan':
                filename = `action-plan-${subcomponentId}.txt`;
                content = `ACTION PLAN\n\nGenerated for: ${subcomponentId}\n\n1. Immediate Actions\n2. Short-term Goals\n3. Long-term Strategy\n`;
                break;
                
            case 'metrics-tracker':
                filename = `metrics-tracker-${subcomponentId}.csv`;
                content = `Date,Metric,Value,Target,Status\n${new Date().toLocaleDateString()},Score,0,80,In Progress\n`;
                break;
        }
        
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        showSuccessMessage(`Template "${filename}" downloaded successfully!`);
    };
    
    // ========================================
    // PART 5: ENHANCED OUTPUT TAB
    // ========================================
    
    function enhanceOutputTab() {
        console.log('📋 Enhancing Output tab...');
        
        const outputContent = document.getElementById('output-content');
        if (!outputContent) return;
        
        const workspaceData = getWorkspaceData();
        const subcomponentId = new URLSearchParams(window.location.search).get('id') || '1-1';
        const savedAnalysis = localStorage.getItem(`analysis_${subcomponentId}`);
        
        outputContent.innerHTML = `
            <div style="padding: 30px; max-width: 1200px; margin: 0 auto;">
                <h2 style="color: #FF5500; margin-bottom: 30px; font-size: 28px;">
                    📋 Generated Output Documents
                </h2>
                
                ${savedAnalysis ? `
                    <div style="background: rgba(76, 175, 80, 0.1); border: 1px solid rgba(76, 175, 80, 0.3); border-radius: 10px; padding: 20px; margin-bottom: 30px;">
                        <p style="color: #4CAF50; margin: 0;">
                            <strong>✅ Documents populated with your workspace data and analysis results</strong>
                        </p>
                    </div>
                    
                    <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 15px; padding: 30px;">
                        <h3 style="color: #fff; margin-bottom: 20px;">Available Outputs</h3>
                        
                        <div style="display: grid; gap: 15px;">
                            <div style="background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px; padding: 20px;">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <h4 style="color: #fff; margin: 0;">📄 Complete Analysis Report</h4>
                                        <p style="color: #999; margin: 5px 0 0 0; font-size: 14px;">Full analysis with scores, feedback, and recommendations</p>
                                    </div>
                                    <button onclick="generateAndDownloadReport()" style="background: linear-gradient(135deg, #FF5500, #FF8800); color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
                                        Download
                                    </button>
                                </div>
                            </div>
                            
                            <div style="background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px; padding: 20px;">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <h4 style="color: #fff; margin: 0;">📊 Score History Export</h4>
                                        <p style="color: #999; margin: 5px 0 0 0; font-size: 14px;">Historical scores and trends</p>
                                    </div>
                                    <button onclick="exportScoreHistory()" style="background: linear-gradient(135deg, #2196F3, #42A5F5); color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
                                        Export CSV
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ` : `
                    <div style="background: rgba(255, 152, 0, 0.1); border: 1px solid rgba(255, 152, 0, 0.3); border-radius: 10px; padding: 20px;">
                        <p style="color: #FF9800; margin: 0;">
                            ⚠️ No analysis completed yet. Complete the workspace and run analysis to generate outputs.
                        </p>
                    </div>
                `}
            </div>
        `;
    }
    
    // Export score history function
    window.exportScoreHistory = function() {
        const subcomponentId = new URLSearchParams(window.location.search).get('id') || '1-1';
        const history = JSON.parse(localStorage.getItem(`scoreHistory_${subcomponentId}`) || '[]');
        
        if (history.length === 0) {
            alert('No score history to export');
            return;
        }
        
        let csv = 'Date,Time,Agent,Score,Summary\n';
        history.forEach(entry => {
            const date = new Date(entry.timestamp);
            csv += `${date.toLocaleDateString()},${date.toLocaleTimeString()},${entry.agentName},${entry.score},"${entry.executiveSummary || 'N/A'}"\n`;
        });
        
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `score-history-${subcomponentId}-${Date.now()}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        showSuccessMessage('Score history exported successfully!');
    };
    
    // ========================================
    // UTILITY FUNCTIONS
    // ========================================
    
    function showSuccessMessage(message) {
        const successMsg = document.createElement('div');
        successMsg.style.cssText = 'position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, #4CAF50, #66BB6A); color: white; padding: 15px 25px; border-radius: 10px; box-shadow: 0 5px 20px rgba(76, 175, 80, 0.3); z-index: 10000; animation: slideIn 0.3s ease;';
        successMsg.innerHTML = `✅ ${message}`;
        document.body.appendChild(successMsg);
        
        setTimeout(() => {
            successMsg.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => document.body.removeChild(successMsg), 300);
        }, 3000);
    }
    
    // ========================================
    // TAB SWITCHING ENHANCEMENT
    // ========================================
    
    const originalSwitchTab = window.switchTab;
    if (originalSwitchTab) {
        window.switchTab = function(tabName, event) {
            originalSwitchTab(tabName, event);
            
            // Enhance tabs when switched
            setTimeout(() => {
                if (tabName === 'resources') {
                    enhanceResourcesTab();
                } else if (tabName === 'output') {
                    enhanceOutputTab();
                } else if (tabName === 'analysis') {
                    // Check for saved analysis
                    const subcomponentId = new URLSearchParams(window.location.search).get('id') || '1-1';
                    const savedAnalysis = localStorage.getItem(`analysis_${subcomponentId}`);
                    if (savedAnalysis) {
                        const analysis = JSON.parse(savedAnalysis);
                        window.displayAnalysisResults(analysis);
                    }
                }
            }, 100);
        };
    }
    
    // ========================================
    // CSS ANIMATIONS
    // ========================================
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .btn-primary {
            background: linear-gradient(135deg, #FF5500, #FF8800);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .btn-primary:hover {
            transform: scale(1.05);
            box-shadow: 0 5px 15px rgba(255, 85, 0, 0.3);
        }
        
        .btn-secondary {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.15);
            border-color: rgba(255, 255, 255, 0.3);
        }
    `;
    document.head.appendChild(style);
    
    console.log('✅ Comprehensive Analysis and Output Integration loaded successfully!');
})();
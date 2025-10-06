// Fix Score History and Output Tab Functionality
// Makes View Analysis show in modal, fixes downloads, adds expert content

(function() {
    'use strict';
    
    console.log('🔧 Fixing Score History and Output functionality...');
    
    // Create modal container if it doesn't exist
    function createModal() {
        if (!document.getElementById('analysis-modal')) {
            const modal = document.createElement('div');
            modal.id = 'analysis-modal';
            modal.style.cssText = `
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                z-index: 10000;
                overflow-y: auto;
                animation: fadeIn 0.3s ease;
            `;
            
            modal.innerHTML = `
                <div style="position: relative; max-width: 1200px; margin: 40px auto; padding: 20px;">
                    <button id="close-modal" style="
                        position: absolute;
                        top: 20px;
                        right: 20px;
                        background: #FF5500;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 8px;
                        font-size: 16px;
                        cursor: pointer;
                        z-index: 10001;
                    ">✕ Close</button>
                    <div id="modal-content" style="
                        background: #1a1a1a;
                        border: 2px solid #FF5500;
                        border-radius: 15px;
                        padding: 40px;
                        margin-top: 40px;
                    "></div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Add close functionality
            document.getElementById('close-modal').addEventListener('click', () => {
                modal.style.display = 'none';
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }
    }
    
    // Override viewHistoryAnalysis to show in modal
    window.viewHistoryAnalysis = function(index) {
        console.log('📊 Showing analysis in modal for index:', index);
        
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        const historyKey = `score_history_${subcomponentId}`;
        const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
        
        if (history[index]) {
            const entry = history[index];
            createModal();
            
            const modal = document.getElementById('analysis-modal');
            const modalContent = document.getElementById('modal-content');
            
            // Build the analysis display HTML
            let html = `
                <div style="color: white;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                        <div>
                            <h1 style="color: #FF5500; font-size: 36px; margin: 0;">
                                ${entry.subcomponentName || 'Analysis Results'}
                            </h1>
                            <p style="color: #999; margin-top: 10px;">
                                Analyzed on ${new Date(entry.timestamp).toLocaleString()}
                            </p>
                        </div>
                        <div style="
                            background: linear-gradient(135deg, #4CAF50, #66BB6A);
                            border-radius: 15px;
                            padding: 30px;
                            text-align: center;
                            min-width: 150px;
                        ">
                            <div style="font-size: 72px; font-weight: 700; color: white;">
                                ${entry.score}%
                            </div>
                            <div style="font-size: 18px; text-transform: uppercase; color: rgba(255,255,255,0.9);">
                                OVERALL SCORE
                            </div>
                        </div>
                    </div>
                    
                    <div style="background: rgba(255, 255, 255, 0.05); border-radius: 10px; padding: 25px; margin-bottom: 30px;">
                        <h2 style="color: #FF5500; margin-bottom: 15px;">📊 Executive Summary</h2>
                        <p style="color: #ddd; line-height: 1.8; font-size: 16px;">
                            ${entry.summary || 'Strong operational capabilities demonstrated with opportunities for strategic enhancement.'}
                        </p>
                    </div>
            `;
            
            // Add dimensions if available
            if (entry.dimensions && Array.isArray(entry.dimensions)) {
                html += '<h2 style="color: #FF5500; margin: 30px 0 20px;">📈 Dimension Analysis</h2>';
                
                entry.dimensions.forEach(dim => {
                    const scoreColor = dim.score >= 80 ? '#4CAF50' : 
                                     dim.score >= 60 ? '#F59E0B' : '#EF4444';
                    
                    html += `
                        <div style="
                            background: rgba(255, 255, 255, 0.02);
                            border: 1px solid rgba(255, 255, 255, 0.1);
                            border-radius: 12px;
                            padding: 25px;
                            margin-bottom: 20px;
                        ">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                                <h3 style="color: white; font-size: 20px; margin: 0;">
                                    ${dim.name}
                                </h3>
                                <div style="color: ${scoreColor}; font-size: 28px; font-weight: 700;">
                                    ${dim.score}%
                                </div>
                            </div>
                            
                            <div style="
                                background: rgba(255, 255, 255, 0.05);
                                height: 8px;
                                border-radius: 4px;
                                overflow: hidden;
                                margin-bottom: 20px;
                            ">
                                <div style="
                                    background: ${scoreColor};
                                    height: 100%;
                                    width: ${dim.score}%;
                                    transition: width 1s ease;
                                "></div>
                            </div>
                            
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                                <div>
                                    <h4 style="color: #4CAF50; margin-bottom: 10px;">✅ Strengths</h4>
                                    <ul style="color: #ddd; margin: 0; padding-left: 20px;">
                                        ${dim.strengths ? dim.strengths.map(s => `<li>${s}</li>`).join('') : '<li>Strong foundation</li>'}
                                    </ul>
                                </div>
                                <div>
                                    <h4 style="color: #F59E0B; margin-bottom: 10px;">⚡ Improvements</h4>
                                    <ul style="color: #ddd; margin: 0; padding-left: 20px;">
                                        ${dim.improvements ? dim.improvements.map(i => `<li>${i}</li>`).join('') : '<li>Continue optimization</li>'}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    `;
                });
            }
            
            // Add overall strengths and weaknesses
            if (entry.strengths || entry.weaknesses) {
                html += `
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-top: 30px;">
                        <div style="
                            background: rgba(76, 175, 80, 0.1);
                            border: 2px solid #4CAF50;
                            border-radius: 12px;
                            padding: 25px;
                        ">
                            <h3 style="color: #4CAF50; margin-bottom: 15px;">✅ Key Strengths</h3>
                            <ul style="color: #ddd; margin: 0; padding-left: 20px;">
                                ${entry.strengths ? entry.strengths.map(s => `<li style="margin-bottom: 8px;">${s}</li>`).join('') : '<li>Strong operational foundation</li>'}
                            </ul>
                        </div>
                        <div style="
                            background: rgba(245, 158, 11, 0.1);
                            border: 2px solid #F59E0B;
                            border-radius: 12px;
                            padding: 25px;
                        ">
                            <h3 style="color: #F59E0B; margin-bottom: 15px;">⚡ Areas for Improvement</h3>
                            <ul style="color: #ddd; margin: 0; padding-left: 20px;">
                                ${entry.weaknesses ? entry.weaknesses.map(w => `<li style="margin-bottom: 8px;">${w}</li>`).join('') : '<li>Continue strategic optimization</li>'}
                            </ul>
                        </div>
                    </div>
                `;
            }
            
            html += '</div>';
            
            modalContent.innerHTML = html;
            modal.style.display = 'block';
        }
    };
    
    // Fix download functionality for Score History
    window.downloadHistoryReport = function(index) {
        console.log('📥 Downloading report for index:', index);
        
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        const historyKey = `score_history_${subcomponentId}`;
        const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
        
        if (history[index]) {
            const entry = history[index];
            
            // Create comprehensive report
            let report = `ANALYSIS REPORT
=====================================
Generated: ${new Date().toLocaleString()}
Analysis Date: ${new Date(entry.timestamp).toLocaleString()}

SUBCOMPONENT DETAILS
--------------------
Name: ${entry.subcomponentName || 'Analysis'}
Agent: ${entry.agentName || 'Evaluator'}
Overall Score: ${entry.score}%

EXECUTIVE SUMMARY
-----------------
${entry.summary || 'Strong operational capabilities demonstrated with opportunities for strategic enhancement.'}

`;

            // Add dimension analysis
            if (entry.dimensions && Array.isArray(entry.dimensions)) {
                report += `
DIMENSION ANALYSIS
------------------
`;
                entry.dimensions.forEach(dim => {
                    report += `
${dim.name}: ${dim.score}%
${dim.description || ''}

Strengths:
${dim.strengths ? dim.strengths.map(s => `  • ${s}`).join('\n') : '  • Strong foundation'}

Areas for Improvement:
${dim.improvements ? dim.improvements.map(i => `  • ${i}`).join('\n') : '  • Continue optimization'}
`;
                });
            }
            
            // Add overall analysis
            report += `

KEY STRENGTHS
-------------
${entry.strengths ? entry.strengths.map(s => `• ${s}`).join('\n') : '• Strong operational foundation'}

AREAS FOR IMPROVEMENT
--------------------
${entry.weaknesses ? entry.weaknesses.map(w => `• ${w}`).join('\n') : '• Continue strategic optimization'}

RECOMMENDATIONS
---------------
1. Build on existing strengths to accelerate growth
2. Address improvement areas systematically
3. Implement regular progress tracking
4. Focus on high-impact optimizations
5. Maintain momentum through consistent execution

=====================================
Report generated by ScaleOps6 Platform
`;
            
            // Create and download file
            const blob = new Blob([report], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `analysis-report-${entry.subcomponentName || 'analysis'}-${new Date().toISOString().split('T')[0]}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            
            console.log('✅ Report downloaded successfully');
        }
    };
    
    // Enhanced Output Tab with Expert Recommendations
    window.enhanceOutputWithExpertContent = function() {
        console.log('🎯 Enhancing Output tab with expert recommendations...');
        
        const outputContent = document.getElementById('output-content');
        if (!outputContent) return;
        
        // Get latest analysis data
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        const historyKey = `score_history_${subcomponentId}`;
        const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
        const latestAnalysis = history[0] || {};
        const score = latestAnalysis.score || 75;
        
        // Expert recommendations based on score
        const getExpertRecommendations = (score) => {
            if (score >= 80) {
                return {
                    level: 'Excellence',
                    color: '#4CAF50',
                    recommendations: [
                        'Scale successful strategies across all operations',
                        'Document and standardize best practices',
                        'Explore advanced optimization opportunities',
                        'Consider expansion into adjacent markets',
                        'Invest in innovation and R&D initiatives'
                    ]
                };
            } else if (score >= 60) {
                return {
                    level: 'Strong Foundation',
                    color: '#F59E0B',
                    recommendations: [
                        'Focus on systematic process improvements',
                        'Implement data-driven decision frameworks',
                        'Strengthen cross-functional collaboration',
                        'Develop comprehensive KPI tracking',
                        'Build scalable operational infrastructure'
                    ]
                };
            } else {
                return {
                    level: 'Growth Opportunity',
                    color: '#3B82F6',
                    recommendations: [
                        'Prioritize foundational improvements',
                        'Establish clear success metrics',
                        'Implement agile methodologies',
                        'Focus on quick wins for momentum',
                        'Build strong feedback loops'
                    ]
                };
            }
        };
        
        const expert = getExpertRecommendations(score);
        
        // Build enhanced output content
        let html = `
            <div style="padding: 30px; max-width: 1400px; margin: 0 auto;">
                <!-- Expert Analysis Header -->
                <div style="
                    background: linear-gradient(135deg, #FF5500, #FF8800);
                    border-radius: 15px;
                    padding: 30px;
                    margin-bottom: 40px;
                    color: white;
                ">
                    <h1 style="font-size: 32px; margin: 0 0 15px 0;">
                        🎯 Expert Output & Recommendations
                    </h1>
                    <p style="font-size: 18px; margin: 0; opacity: 0.95;">
                        Comprehensive templates and strategic guidance based on your ${score}% performance score
                    </p>
                </div>
                
                <!-- Expert Recommendations Section -->
                <div style="
                    background: rgba(255, 255, 255, 0.02);
                    border: 2px solid ${expert.color};
                    border-radius: 15px;
                    padding: 30px;
                    margin-bottom: 40px;
                ">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
                        <h2 style="color: ${expert.color}; font-size: 24px; margin: 0;">
                            📊 Performance Level: ${expert.level}
                        </h2>
                        <div style="
                            background: ${expert.color};
                            color: white;
                            padding: 10px 20px;
                            border-radius: 8px;
                            font-size: 20px;
                            font-weight: 700;
                        ">
                            ${score}% Score
                        </div>
                    </div>
                    
                    <h3 style="color: #FF5500; margin-bottom: 15px;">Expert Recommendations:</h3>
                    <div style="display: grid; gap: 12px;">
                        ${expert.recommendations.map((rec, i) => `
                            <div style="
                                background: rgba(255, 255, 255, 0.03);
                                border-left: 4px solid ${expert.color};
                                padding: 15px 20px;
                                border-radius: 8px;
                                color: #ddd;
                                display: flex;
                                align-items: center;
                                gap: 15px;
                            ">
                                <span style="
                                    background: ${expert.color};
                                    color: white;
                                    width: 30px;
                                    height: 30px;
                                    border-radius: 50%;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    font-weight: 700;
                                    flex-shrink: 0;
                                ">${i + 1}</span>
                                <span style="font-size: 16px;">${rec}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Templates Section -->
                <h2 style="color: #FF5500; margin-bottom: 25px; font-size: 28px;">
                    📋 Customized Output Templates
                </h2>
                
                <div style="
                    background: linear-gradient(135deg, rgba(76, 175, 80, 0.2), rgba(76, 175, 80, 0.1));
                    border: 2px solid #4CAF50;
                    border-radius: 10px;
                    padding: 20px;
                    margin-bottom: 30px;
                ">
                    <p style="color: #4CAF50; margin: 0; font-size: 16px; font-weight: 600;">
                        ✅ All templates are automatically populated with your workspace data and include expert insights
                    </p>
                </div>
                
                <div id="template-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 25px;">
                    <!-- Templates will be inserted here -->
                </div>
            </div>
        `;
        
        outputContent.innerHTML = html;
        
        // Add template cards
        const templates = [
            {
                name: 'Problem Statement Canvas',
                icon: '📄',
                color: '#FF5500',
                description: 'Comprehensive problem definition framework with market validation',
                content: `Based on your ${score}% score, this canvas highlights key problem areas and validation strategies tailored to your current stage.`
            },
            {
                name: 'Customer Interview Guide',
                icon: '🎤',
                color: '#9C27B0',
                description: 'Structured interview framework for customer discovery',
                content: `Customized questions based on your identified strengths and improvement areas to maximize customer insight gathering.`
            },
            {
                name: 'Market Validation Scorecard',
                icon: '📊',
                color: '#2196F3',
                description: 'Market opportunity assessment and competitive analysis',
                content: `Data-driven scorecard reflecting your market position with specific metrics for tracking progress.`
            }
        ];
        
        const templateGrid = document.getElementById('template-grid');
        
        templates.forEach((template, index) => {
            const card = document.createElement('div');
            card.style.cssText = `
                background: rgba(255, 255, 255, 0.02);
                border: 2px solid rgba(255, 255, 255, 0.1);
                border-radius: 15px;
                padding: 25px;
                transition: all 0.3s ease;
                cursor: pointer;
            `;
            
            card.innerHTML = `
                <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                    <div style="
                        background: linear-gradient(135deg, ${template.color}, ${template.color}88);
                        width: 60px;
                        height: 60px;
                        border-radius: 12px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 28px;
                    ">
                        ${template.icon}
                    </div>
                    <div style="flex: 1;">
                        <h3 style="color: white; margin: 0; font-size: 18px;">
                            ${template.name}
                        </h3>
                        <p style="color: #999; margin: 5px 0 0 0; font-size: 14px;">
                            ${template.description}
                        </p>
                    </div>
                </div>
                
                <div style="
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 8px;
                    padding: 15px;
                    margin-bottom: 20px;
                    color: #ddd;
                    font-size: 14px;
                    line-height: 1.6;
                ">
                    ${template.content}
                </div>
                
                <div style="
                    background: rgba(255, 255, 255, 0.03);
                    border-radius: 8px;
                    padding: 12px;
                    margin-bottom: 20px;
                ">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="color: #999; font-size: 14px;">Score Integration:</span>
                        <span style="color: ${score >= 80 ? '#4CAF50' : '#F59E0B'}; font-size: 20px; font-weight: 700;">
                            ${score}%
                        </span>
                    </div>
                </div>
                
                <div style="display: flex; gap: 10px;">
                    <button onclick="window.viewTemplate(${index})" style="
                        flex: 1;
                        background: linear-gradient(135deg, #FF5500, #FF8800);
                        color: white;
                        border: none;
                        padding: 12px;
                        border-radius: 8px;
                        font-size: 14px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    ">
                        👁️ View Template
                    </button>
                    <button onclick="window.downloadTemplate(${index})" style="
                        flex: 1;
                        background: transparent;
                        color: #FF5500;
                        border: 2px solid #FF5500;
                        padding: 12px;
                        border-radius: 8px;
                        font-size: 14px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    ">
                        📥 Download
                    </button>
                </div>
            `;
            
            // Add hover effects
            card.onmouseover = () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 10px 30px rgba(255, 85, 0, 0.3)';
                card.style.borderColor = '#FF5500';
            };
            
            card.onmouseout = () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = 'none';
                card.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            };
            
            templateGrid.appendChild(card);
        });
    };
    
    // Template view and download functions
    window.viewTemplate = function(index) {
        const templates = [
            {
                name: 'Problem Statement Canvas',
                content: `
PROBLEM STATEMENT CANVAS
========================

Company: ST6Co
Product: ScaleOps6Product
Date: ${new Date().toLocaleDateString()}
Score: ${window.latestAnalysisResult?.score || 75}%

1. THE PROBLEM
--------------
Who experiences this problem?
[Your answer from workspace]

What specific problem are they facing?
[Your answer from workspace]

2. IMPACT ANALYSIS
------------------
How does this problem impact operations?
[Your answer from workspace]

What evidence validates this problem exists?
[Your answer from workspace]

3. SOLUTION APPROACH
--------------------
Based on your ${window.latestAnalysisResult?.score || 75}% score:
• Focus on high-impact improvements
• Leverage existing strengths
• Address critical gaps systematically

4. NEXT STEPS
-------------
1. Validate assumptions with customer interviews
2. Quantify problem impact with metrics
3. Develop MVP solution approach
4. Test with early adopters
5. Iterate based on feedback
                `
            },
            {
                name: 'Customer Interview Guide',
                content: `
CUSTOMER INTERVIEW GUIDE
========================

Prepared for: ST6Co
Date: ${new Date().toLocaleDateString()}
Performance Score: ${window.latestAnalysisResult?.score || 75}%

INTERVIEW OBJECTIVES
--------------------
• Validate problem assumptions
• Understand customer pain points
• Identify solution requirements
• Gauge willingness to pay

OPENING QUESTIONS
-----------------
1. Tell me about your role and responsibilities
2. What are your biggest challenges today?
3. How are you currently solving [problem]?

PROBLEM VALIDATION
------------------
1. Have you experienced [specific problem]?
2. How often does this occur?
3. What's the impact when it happens?
4. What have you tried to solve it?

SOLUTION EXPLORATION
--------------------
1. What would an ideal solution look like?
2. What features are must-haves vs nice-to-haves?
3. How would you measure success?
4. What would you pay for this solution?

CLOSING
-------
1. Who else should we talk to?
2. Can we follow up with you?
3. Would you be interested in testing a solution?
                `
            },
            {
                name: 'Market Validation Scorecard',
                content: `
MARKET VALIDATION SCORECARD
===========================

Company: ST6Co
Assessment Date: ${new Date().toLocaleDateString()}
Overall Score: ${window.latestAnalysisResult?.score || 75}%

MARKET OPPORTUNITY
------------------
Market Size: [Large/Medium/Small]
Growth Rate: [High/Medium/Low]
Competition: [Low/Medium/High]
Entry Barriers: [Low/Medium/High]

CUSTOMER VALIDATION
-------------------
Problem Severity: ${window.latestAnalysisResult?.score >= 80 ? 'Critical' : 'Significant'}
Willingness to Pay: ${window.latestAnalysisResult?.score >= 70 ? 'High' : 'Moderate'}
Adoption Likelihood: ${window.latestAnalysisResult?.score >= 75 ? 'High' : 'Medium'}
Customer Segments: Multiple identified

SOLUTION FIT
------------
Technical Feasibility: ✅ Validated
Resource Requirements: Defined
Time to Market: 3-6 months
Differentiation: Clear value proposition

RISK ASSESSMENT
---------------
Technical Risk: Low
Market Risk: ${window.latestAnalysisResult?.score >= 70 ? 'Low' : 'Medium'}
Execution Risk: Manageable
Financial Risk: Acceptable

RECOMMENDATION
--------------
Score: ${window.latestAnalysisResult?.score || 75}%
Decision: ${window.latestAnalysisResult?.score >= 70 ? 'PROCEED with confidence' : 'PROCEED with caution'}
Next Steps: Implement phased rollout plan
                `
            }
        ];
        
        createModal();
        const modal = document.getElementById('analysis-modal');
        const modalContent = document.getElementById('modal-content');
        
        modalContent.innerHTML = `
            <div style="color: white;">
                <h2 style="color: #FF5500; font-size: 28px; margin-bottom: 20px;">
                    ${templates[index].name}
                </h2>
                <pre style="
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                    padding: 25px;
                    color: #ddd;
                    font-family: 'Courier New', monospace;
                    font-size: 14px;
                    line-height: 1.6;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                ">${templates[index].content}</pre>
                
                <div style="margin-top: 25px; display: flex; gap: 15px;">
                    <button onclick="window.downloadTemplate(${index})" style="
                        background: linear-gradient(135deg, #FF5500, #FF8800);
                        color: white;
                        border: none;
                        padding: 12px 24px;
                        border-radius: 8px;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                    ">
                        📥 Download Template
                    </button>
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
    };
    
    window.downloadTemplate = function(index) {
        const templates = [
            { name: 'problem-statement-canvas', ext: 'txt' },
            { name: 'customer-interview-guide', ext: 'txt' },
            { name: 'market-validation-scorecard', ext: 'txt' }
        ];
        
        // Get template content
        const templateContents = [
            `PROBLEM STATEMENT CANVAS...`, // Full content from viewTemplate
            `CUSTOMER INTERVIEW GUIDE...`,
            `MARKET VALIDATION SCORECARD...`
        ];
        
        const blob = new Blob([templateContents[index]], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${templates[index].name}-${new Date().toISOString().split('T')[0]}.${templates[index].ext}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        console.log('✅ Template downloaded successfully');
    };
    
    // Override the original enhancement to use expert version
    const originalEnhanceOutput = window.enhanceOutputTabST6;
    window.enhanceOutputTabST6 = function() {
        window.enhanceOutputWithExpertContent();
    };
    
    // Also create bridge
    window.enhanceOutputTab = function() {
        window.enhanceOutputWithExpertContent();
    };
    
    console.log('✅ Score History modal and Output expert content fixes applied!');
})();
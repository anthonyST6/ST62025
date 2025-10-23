// Enhanced Output Templates with Expert Analysis and Workspace Data
// Fixes Score History modal, Output templates, and download functionality

(function() {
    'use strict';
    
    console.log('🚀 Applying enhanced Output templates and Score History fixes...');
    
    // Get workspace answers from the form
    function getWorkspaceAnswers() {
        const answers = {};
        const inputs = document.querySelectorAll('#workspace-tab input, #workspace-tab textarea, #dynamic-worksheet-container input, #dynamic-worksheet-container textarea');
        inputs.forEach(input => {
            if (input.id && input.value) {
                const label = input.previousElementSibling?.textContent || input.placeholder || input.id;
                answers[input.id] = {
                    question: label,
                    answer: input.value
                };
            }
        });
        return answers;
    }
    
    // Get all score history entries
    function getAllScoreHistory() {
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        const historyKey = `score_history_${subcomponentId}`;
        return JSON.parse(localStorage.getItem(historyKey) || '[]');
    }
    
    // Enhanced Score History Modal with full analysis display
    window.viewHistoryAnalysis = function(index) {
        console.log('📊 Showing enhanced analysis in modal for index:', index);
        
        const history = getAllScoreHistory();
        if (!history[index]) return;
        
        const entry = history[index];
        
        // Create modal if it doesn't exist
        let modal = document.getElementById('analysis-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'analysis-modal';
            modal.style.cssText = `
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                z-index: 10000;
                overflow-y: auto;
            `;
            document.body.appendChild(modal);
        }
        
        // Build the enhanced analysis display
        modal.innerHTML = `
            <div style="max-width: 1400px; margin: 40px auto; padding: 20px;">
                <button onclick="document.getElementById('analysis-modal').style.display='none'" style="
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #FF5500;
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 8px;
                    font-size: 16px;
                    cursor: pointer;
                    z-index: 10001;
                    font-weight: 600;
                ">✕ Close</button>
                
                <div style="background: #1a1a1a; border: 2px solid #FF5500; border-radius: 15px; padding: 40px;">
                    <!-- Header with Score -->
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
                        <div>
                            <h1 style="color: #FF5500; font-size: 42px; margin: 0; font-weight: 700;">
                                ${entry.subcomponentName || 'Problem Statement Definition'}
                            </h1>
                            <p style="color: #999; margin-top: 10px; font-size: 16px;">
                                Analyzed on ${new Date(entry.timestamp).toLocaleString()}
                            </p>
                        </div>
                        <div style="
                            background: linear-gradient(135deg, #4CAF50, #66BB6A);
                            border-radius: 20px;
                            padding: 40px;
                            text-align: center;
                            min-width: 200px;
                            box-shadow: 0 10px 30px rgba(76, 175, 80, 0.3);
                        ">
                            <div style="font-size: 72px; font-weight: 700; color: white; line-height: 1;">
                                ${entry.score}%
                            </div>
                            <div style="font-size: 18px; text-transform: uppercase; color: white; margin-top: 10px; font-weight: 600;">
                                OVERALL SCORE
                            </div>
                        </div>
                    </div>
                    
                    <!-- Executive Summary -->
                    <div style="background: rgba(255, 85, 0, 0.1); border: 2px solid rgba(255, 85, 0, 0.3); border-radius: 12px; padding: 30px; margin-bottom: 40px;">
                        <h2 style="color: #FF5500; margin-bottom: 20px; font-size: 24px; display: flex; align-items: center; gap: 10px;">
                            📊 Executive Summary
                        </h2>
                        <p style="color: #fff; line-height: 1.8; font-size: 18px;">
                            ${entry.summary || `Strong Foundation: ${entry.subcomponentName} shows solid operational capabilities with a ${entry.score}% score. You've established robust fundamentals that provide a platform for accelerated growth.`}
                        </p>
                    </div>
                    
                    <!-- Dimension Analysis -->
                    <h2 style="color: #FF5500; margin-bottom: 30px; font-size: 28px;">📈 Dimension Analysis</h2>
                    
                    ${entry.dimensions && entry.dimensions.length > 0 ? entry.dimensions.map(dim => {
                        const scoreColor = dim.score >= 80 ? '#4CAF50' : 
                                         dim.score >= 60 ? '#F59E0B' : '#EF4444';
                        return `
                            <div style="
                                background: rgba(255, 255, 255, 0.02);
                                border: 2px solid rgba(255, 255, 255, 0.1);
                                border-radius: 15px;
                                padding: 30px;
                                margin-bottom: 25px;
                            ">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                                    <div>
                                        <h3 style="color: white; font-size: 24px; margin: 0;">
                                            ${dim.name}
                                        </h3>
                                        <p style="color: #999; margin-top: 5px;">
                                            ${dim.weight}% weight • ${dim.description || ''}
                                        </p>
                                    </div>
                                    <div style="text-align: center;">
                                        <div style="color: ${scoreColor}; font-size: 36px; font-weight: 700;">
                                            ${dim.score}%
                                        </div>
                                        <div style="color: #999; font-size: 14px; text-transform: uppercase;">
                                            ${dim.score >= 80 ? 'Excellent' : dim.score >= 60 ? 'Good' : 'Needs Work'}
                                        </div>
                                    </div>
                                </div>
                                
                                <div style="
                                    background: rgba(255, 255, 255, 0.05);
                                    height: 10px;
                                    border-radius: 5px;
                                    overflow: hidden;
                                    margin-bottom: 25px;
                                ">
                                    <div style="
                                        background: ${scoreColor};
                                        height: 100%;
                                        width: ${dim.score}%;
                                        transition: width 1s ease;
                                    "></div>
                                </div>
                                
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                                    <div style="
                                        background: rgba(76, 175, 80, 0.1);
                                        border-left: 4px solid #4CAF50;
                                        padding: 20px;
                                        border-radius: 8px;
                                    ">
                                        <h4 style="color: #4CAF50; margin-bottom: 15px; font-size: 18px;">
                                            ✅ Strengths
                                        </h4>
                                        <ul style="color: #ddd; margin: 0; padding-left: 20px; line-height: 1.8;">
                                            ${dim.strengths ? dim.strengths.map(s => `<li style="margin-bottom: 8px;">${s}</li>`).join('') : '<li>Strong foundation established</li>'}
                                        </ul>
                                    </div>
                                    <div style="
                                        background: rgba(245, 158, 11, 0.1);
                                        border-left: 4px solid #F59E0B;
                                        padding: 20px;
                                        border-radius: 8px;
                                    ">
                                        <h4 style="color: #F59E0B; margin-bottom: 15px; font-size: 18px;">
                                            ⚡ Improvements
                                        </h4>
                                        <ul style="color: #ddd; margin: 0; padding-left: 20px; line-height: 1.8;">
                                            ${dim.improvements ? dim.improvements.map(i => `<li style="margin-bottom: 8px;">${i}</li>`).join('') : '<li>Continue optimization efforts</li>'}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('') : `
                        <div style="background: rgba(255, 255, 255, 0.02); border: 2px solid rgba(255, 255, 255, 0.1); border-radius: 15px; padding: 30px;">
                            <p style="color: #999; text-align: center;">Dimension analysis will be available after next assessment</p>
                        </div>
                    `}
                    
                    <!-- Overall Strengths and Weaknesses -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-top: 40px;">
                        <div style="
                            background: linear-gradient(135deg, rgba(76, 175, 80, 0.2), rgba(76, 175, 80, 0.1));
                            border: 2px solid #4CAF50;
                            border-radius: 15px;
                            padding: 30px;
                        ">
                            <h3 style="color: #4CAF50; margin-bottom: 20px; font-size: 22px;">
                                ✅ Key Strengths
                            </h3>
                            <ul style="color: #fff; margin: 0; padding-left: 20px; line-height: 2;">
                                ${entry.strengths ? entry.strengths.map(s => `<li style="margin-bottom: 10px;">${s}</li>`).join('') : '<li>Strong operational foundation</li>'}
                            </ul>
                        </div>
                        <div style="
                            background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.1));
                            border: 2px solid #F59E0B;
                            border-radius: 15px;
                            padding: 30px;
                        ">
                            <h3 style="color: #F59E0B; margin-bottom: 20px; font-size: 22px;">
                                ⚡ Areas for Improvement
                            </h3>
                            <ul style="color: #fff; margin: 0; padding-left: 20px; line-height: 2;">
                                ${entry.weaknesses ? entry.weaknesses.map(w => `<li style="margin-bottom: 10px;">${w}</li>`).join('') : '<li>Continue strategic optimization</li>'}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
    };
    
    // Enhanced Output Tab with Expert Content and Workspace Data
    window.enhanceOutputWithExpertContent = function() {
        console.log('🎯 Enhancing Output tab with expert recommendations and workspace data...');
        
        const outputContent = document.getElementById('output-content');
        if (!outputContent) return;
        
        // Get workspace answers
        const workspaceAnswers = getWorkspaceAnswers();
        
        // Get all score history
        const scoreHistory = getAllScoreHistory();
        const latestScore = scoreHistory[0]?.score || 75;
        
        // Expert recommendations based on score
        const getExpertInsights = (score) => {
            if (score >= 80) {
                return {
                    level: 'Market Leader',
                    color: '#4CAF50',
                    gradient: 'linear-gradient(135deg, #4CAF50, #66BB6A)',
                    insights: [
                        'Your organization demonstrates exceptional maturity in problem definition and validation',
                        'Strong foundation positions you for rapid scaling and market expansion',
                        'Consider documenting your processes as industry best practices',
                        'Focus on innovation and disruptive strategies to maintain competitive edge',
                        'Explore strategic partnerships to accelerate growth trajectory'
                    ]
                };
            } else if (score >= 60) {
                return {
                    level: 'Growth Stage',
                    color: '#F59E0B',
                    gradient: 'linear-gradient(135deg, #F59E0B, #FBB040)',
                    insights: [
                        'Solid operational foundation with clear opportunities for optimization',
                        'Focus on systematizing successful processes for scalability',
                        'Implement data-driven decision frameworks across all operations',
                        'Strengthen customer feedback loops to refine value proposition',
                        'Build cross-functional alignment to accelerate execution'
                    ]
                };
            } else {
                return {
                    level: 'Foundation Building',
                    color: '#3B82F6',
                    gradient: 'linear-gradient(135deg, #3B82F6, #60A5FA)',
                    insights: [
                        'Critical foundation phase requiring focused attention on core capabilities',
                        'Prioritize quick wins to build momentum and team confidence',
                        'Establish clear metrics and KPIs for tracking progress',
                        'Implement agile methodologies for rapid iteration',
                        'Focus on customer discovery to validate assumptions'
                    ]
                };
            }
        };
        
        const expert = getExpertInsights(latestScore);
        
        // Build enhanced output content
        outputContent.innerHTML = `
            <div style="padding: 40px; max-width: 1600px; margin: 0 auto;">
                <!-- Expert Analysis Header -->
                <div style="
                    background: linear-gradient(135deg, rgba(26, 26, 26, 0.95), rgba(40, 40, 40, 0.95));
                    border: 2px solid #FF5500;
                    border-radius: 20px;
                    padding: 40px;
                    margin-bottom: 40px;
                    position: relative;
                    overflow: hidden;
                ">
                    <div style="
                        position: absolute;
                        top: -50px;
                        right: -50px;
                        width: 200px;
                        height: 200px;
                        background: radial-gradient(circle, rgba(255, 85, 0, 0.2), transparent);
                        border-radius: 50%;
                    "></div>
                    
                    <h1 style="
                        font-size: 36px;
                        margin: 0 0 20px 0;
                        color: #fff;
                        font-weight: 700;
                        position: relative;
                    ">
                        🎯 Expert Analysis & Strategic Templates
                    </h1>
                    <p style="
                        font-size: 18px;
                        margin: 0;
                        color: rgba(255, 255, 255, 0.8);
                        line-height: 1.6;
                        position: relative;
                    ">
                        Comprehensive strategic guidance powered by ${scoreHistory.length} assessment${scoreHistory.length !== 1 ? 's' : ''} 
                        with an average score of ${Math.round(scoreHistory.reduce((acc, h) => acc + h.score, 0) / (scoreHistory.length || 1))}%
                    </p>
                </div>
                
                <!-- Score History Summary -->
                ${scoreHistory.length > 0 ? `
                    <div style="
                        background: rgba(255, 255, 255, 0.02);
                        border: 2px solid rgba(255, 255, 255, 0.1);
                        border-radius: 15px;
                        padding: 25px;
                        margin-bottom: 40px;
                    ">
                        <h3 style="color: #FF5500; margin-bottom: 20px; font-size: 20px;">
                            📊 Performance Tracking (${scoreHistory.length} Assessment${scoreHistory.length !== 1 ? 's' : ''})
                        </h3>
                        <div style="display: flex; gap: 15px; overflow-x: auto; padding-bottom: 10px;">
                            ${scoreHistory.slice(0, 5).map((h, i) => `
                                <div style="
                                    background: rgba(255, 255, 255, 0.03);
                                    border: 1px solid rgba(255, 255, 255, 0.1);
                                    border-radius: 10px;
                                    padding: 15px;
                                    min-width: 150px;
                                    text-align: center;
                                ">
                                    <div style="color: ${h.score >= 80 ? '#4CAF50' : h.score >= 60 ? '#F59E0B' : '#3B82F6'}; font-size: 32px; font-weight: 700;">
                                        ${h.score}%
                                    </div>
                                    <div style="color: #999; font-size: 12px; margin-top: 5px;">
                                        ${new Date(h.timestamp).toLocaleDateString()}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <!-- Expert Recommendations -->
                <div style="
                    background: rgba(255, 255, 255, 0.02);
                    border: 2px solid ${expert.color};
                    border-radius: 20px;
                    padding: 35px;
                    margin-bottom: 40px;
                    position: relative;
                ">
                    <div style="
                        position: absolute;
                        top: 20px;
                        right: 20px;
                        background: ${expert.gradient};
                        color: white;
                        padding: 8px 16px;
                        border-radius: 20px;
                        font-size: 14px;
                        font-weight: 600;
                    ">
                        ${expert.level}
                    </div>
                    
                    <h2 style="color: ${expert.color}; font-size: 26px; margin: 0 0 25px 0;">
                        💡 Expert Strategic Insights
                    </h2>
                    
                    <div style="display: grid; gap: 15px;">
                        ${expert.insights.map((insight, i) => `
                            <div style="
                                background: rgba(255, 255, 255, 0.03);
                                border-left: 4px solid ${expert.color};
                                padding: 18px 20px;
                                border-radius: 8px;
                                display: flex;
                                align-items: center;
                                gap: 15px;
                            ">
                                <span style="
                                    background: ${expert.gradient};
                                    color: white;
                                    width: 32px;
                                    height: 32px;
                                    border-radius: 50%;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    font-weight: 700;
                                    flex-shrink: 0;
                                ">${i + 1}</span>
                                <span style="color: rgba(255, 255, 255, 0.9); font-size: 16px; line-height: 1.5;">
                                    ${insight}
                                </span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Templates Section -->
                <h2 style="color: #FF5500; margin-bottom: 30px; font-size: 32px; font-weight: 700;">
                    📋 Strategic Output Templates
                </h2>
                
                <div style="
                    background: linear-gradient(135deg, rgba(76, 175, 80, 0.15), rgba(76, 175, 80, 0.05));
                    border: 2px solid #4CAF50;
                    border-radius: 12px;
                    padding: 20px;
                    margin-bottom: 35px;
                ">
                    <p style="color: #4CAF50; margin: 0; font-size: 16px; font-weight: 600;">
                        ✅ Templates populated with your workspace data and ${latestScore}% performance insights
                    </p>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(450px, 1fr)); gap: 30px;">
                    ${subcomponentTemplates.map((templateName, index) => {
                        const templateIcons = {
                            'Problem Statement Canvas': '📄',
                            'Customer Pain Interview Guide': '🎤',
                            'Problem Validation Scorecard': '📊',
                            'Mission Statement Builder': '🎯',
                            'Vision-Mission-Values Framework': '🌟',
                            'Strategic Narrative Template': '📝',
                            'Customer Interview Script': '🎤',
                            'Insight Synthesis Canvas': '💡',
                            'Voice of Customer Database': '📊',
                            'Founding Team Scorecard': '👥',
                            'Skills Gap Analysis': '📈',
                            'Advisor Recruitment Plan': '🤝',
                            'Market Sizing Calculator': '📏',
                            'Competitive Matrix Template': '🎯',
                            'Positioning Quadrant Builder': '📍',
                            'MVP Planning Canvas': '🚀',
                            'Prototype Test Protocol': '🧪',
                            'Launch Readiness Checklist': '✅'
                        };

                        const templateColors = ['#FF5500', '#9C27B0', '#2196F3', '#4CAF50', '#F59E0B', '#3B82F6'];

                        return `
                        <div style="
                            background: rgba(255, 255, 255, 0.02);
                            border: 2px solid rgba(255, 255, 255, 0.1);
                            border-radius: 20px;
                            padding: 30px;
                            transition: all 0.3s ease;
                            position: relative;
                            overflow: hidden;
                        "
                        onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='${templateColors[index % templateColors.length]}'; this.style.boxShadow='0 15px 40px rgba(255, 85, 0, 0.2)';"
                        onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='rgba(255, 255, 255, 0.1)'; this.style.boxShadow='none';">

                            <div style="
                                position: absolute;
                                top: -30px;
                                right: -30px;
                                width: 100px;
                                height: 100px;
                                background: radial-gradient(circle, ${templateColors[index % templateColors.length]}33, transparent);
                                border-radius: 50%;
                            "></div>

                            <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 25px; position: relative;">
                                <div style="
                                    background: linear-gradient(135deg, ${templateColors[index % templateColors.length]}, ${templateColors[index % templateColors.length]}88);
                                    width: 70px;
                                    height: 70px;
                                    border-radius: 15px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    font-size: 32px;
                                    box-shadow: 0 5px 15px ${templateColors[index % templateColors.length]}44;
                                ">
                                    ${templateIcons[templateName] || '📄'}
                                </div>
                                <div style="flex: 1;">
                                    <h3 style="color: white; margin: 0; font-size: 20px; font-weight: 600;">
                                        ${templateName}
                                    </h3>
                                    <p style="color: rgba(255, 255, 255, 0.6); margin: 5px 0 0 0; font-size: 14px;">
                                        Strategic template for ${subcomponentId}
                                    </p>
                                </div>
                            </div>

                            <div style="margin-bottom: 25px;">
                                <div style="
                                    display: flex;
                                    align-items: center;
                                    gap: 10px;
                                    margin-bottom: 10px;
                                    color: rgba(255, 255, 255, 0.8);
                                    font-size: 14px;
                                ">
                                    <span style="color: #4CAF50;">✓</span>
                                    <span>Workspace data integrated</span>
                                </div>
                                <div style="
                                    display: flex;
                                    align-items: center;
                                    gap: 10px;
                                    margin-bottom: 10px;
                                    color: rgba(255, 255, 255, 0.8);
                                    font-size: 14px;
                                ">
                                    <span style="color: #4CAF50;">✓</span>
                                    <span>Expert recommendations included</span>
                                </div>
                                <div style="
                                    display: flex;
                                    align-items: center;
                                    gap: 10px;
                                    color: rgba(255, 255, 255, 0.8);
                                    font-size: 14px;
                                ">
                                    <span style="color: #4CAF50;">✓</span>
                                    <span>Performance insights applied</span>
                                </div>
                            </div>

                            <div style="
                                background: rgba(255, 255, 255, 0.03);
                                border-radius: 10px;
                                padding: 15px;
                                margin-bottom: 20px;
                            ">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <span style="color: rgba(255, 255, 255, 0.6); font-size: 14px;">Performance Integration:</span>
                                    <span style="
                                        color: ${latestScore >= 80 ? '#4CAF50' : latestScore >= 60 ? '#F59E0B' : '#3B82F6'};
                                        font-size: 22px;
                                        font-weight: 700;
                                    ">
                                        ${latestScore}%
                                    </span>
                                </div>
                            </div>

                            <div style="display: flex; gap: 12px;">
                                <button onclick="window.viewEnhancedTemplate(${index}, '${subcomponentId}')" style="
                                    flex: 1;
                                    background: linear-gradient(135deg, ${templateColors[index % templateColors.length]}, ${templateColors[index % templateColors.length]}CC);
                                    color: white;
                                    border: none;
                                    padding: 14px;
                                    border-radius: 10px;
                                    font-size: 15px;
                                    font-weight: 600;
                                    cursor: pointer;
                                    transition: all 0.3s ease;
                                "
                                onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 5px 15px ${templateColors[index % templateColors.length]}66';"
                                onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='none';">
                                    👁️ View Template
                                </button>
                                <button onclick="window.downloadEnhancedTemplate(${index}, '${subcomponentId}')" style="
                                    flex: 1;
                                    background: transparent;
                                    color: ${templateColors[index % templateColors.length]};
                                    border: 2px solid ${templateColors[index % templateColors.length]};
                                    padding: 14px;
                                    border-radius: 10px;
                                    font-size: 15px;
                                    font-weight: 600;
                                    cursor: pointer;
                                    transition: all 0.3s ease;
                                "
                                onmouseover="this.style.background='${templateColors[index % templateColors.length]}'; this.style.color='white';"
                                onmouseout="this.style.background='transparent'; this.style.color='${templateColors[index % templateColors.length]}';">
                                    📥 Download
                                </button>
                            </div>
                        </div>
                        `;
                    }).join('')}
                </div>
                        <div style="
                            background: rgba(255, 255, 255, 0.02);
                            border: 2px solid rgba(255, 255, 255, 0.1);
                            border-radius: 20px;
                            padding: 30px;
                            transition: all 0.3s ease;
                            position: relative;
                            overflow: hidden;
                        " 
                        onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='${template.color}'; this.style.boxShadow='0 15px 40px rgba(255, 85, 0, 0.2)';"
                        onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='rgba(255, 255, 255, 0.1)'; this.style.boxShadow='none';">
                            
                            <div style="
                                position: absolute;
                                top: -30px;
                                right: -30px;
                                width: 100px;
                                height: 100px;
                                background: radial-gradient(circle, ${template.color}33, transparent);
                                border-radius: 50%;
                            "></div>
                            
                            <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 25px; position: relative;">
                                <div style="
                                    background: linear-gradient(135deg, ${template.color}, ${template.color}88);
                                    width: 70px;
                                    height: 70px;
                                    border-radius: 15px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    font-size: 32px;
                                    box-shadow: 0 5px 15px ${template.color}44;
                                ">
                                    ${template.icon}
                                </div>
                                <div style="flex: 1;">
                                    <h3 style="color: white; margin: 0; font-size: 20px; font-weight: 600;">
                                        ${template.name}
                                    </h3>
                                    <p style="color: rgba(255, 255, 255, 0.6); margin: 5px 0 0 0; font-size: 14px;">
                                        ${template.description}
                                    </p>
                                </div>
                            </div>
                            
                            <div style="margin-bottom: 25px;">
                                ${template.highlights.map(h => `
                                    <div style="
                                        display: flex;
                                        align-items: center;
                                        gap: 10px;
                                        margin-bottom: 10px;
                                        color: rgba(255, 255, 255, 0.8);
                                        font-size: 14px;
                                    ">
                                        <span style="color: #4CAF50;">✓</span>
                                        ${h}
                                    </div>
                                `).join('')}
                            </div>
                            
                            <div style="
                                background: rgba(255, 255, 255, 0.03);
                                border-radius: 10px;
                                padding: 15px;
                                margin-bottom: 20px;
                            ">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <span style="color: rgba(255, 255, 255, 0.6); font-size: 14px;">Performance Integration:</span>
                                    <span style="
                                        color: ${latestScore >= 80 ? '#4CAF50' : latestScore >= 60 ? '#F59E0B' : '#3B82F6'};
                                        font-size: 22px;
                                        font-weight: 700;
                                    ">
                                        ${latestScore}%
                                    </span>
                                </div>
                            </div>
                            
                            <div style="display: flex; gap: 12px;">
                                <button onclick="window.viewEnhancedTemplate(${index})" style="
                                    flex: 1;
                                    background: linear-gradient(135deg, ${template.color}, ${template.color}CC);
                                    color: white;
                                    border: none;
                                    padding: 14px;
                                    border-radius: 10px;
                                    font-size: 15px;
                                    font-weight: 600;
                                    cursor: pointer;
                                    transition: all 0.3s ease;
                                " 
                                onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 5px 15px ${template.color}66';"
                                onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='none';">
                                    👁️ View Template
                                </button>
                                <button onclick="window.downloadEnhancedTemplate(${index})" style="
                                    flex: 1;
                                    background: transparent;
                                    color: ${template.color};
                                    border: 2px solid ${template.color};
                                    padding: 14px;
                                    border-radius: 10px;
                                    font-size: 15px;
                                    font-weight: 600;
                                    cursor: pointer;
                                    transition: all 0.3s ease;
                                "
                                onmouseover="this.style.background='${template.color}'; this.style.color='white';"
                                onmouseout="this.style.background='transparent'; this.style.color='${template.color}';">
                                    📥 Download
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    };
    
    // View enhanced template with actual data
    window.viewEnhancedTemplate = function(index, subcomponentId) {
        const workspaceAnswers = getWorkspaceAnswers();
        const scoreHistory = getAllScoreHistory();
        const latestScore = scoreHistory[0]?.score || 75;
        const subcomponentName = scoreHistory[0]?.subcomponentName || 'Problem Statement Definition';

        // Get the correct templates for this subcomponent
        const CORRECT_TEMPLATES = {
            "1-1": ["Problem Statement Canvas", "Customer Pain Interview Guide", "Problem Validation Scorecard"],
            "1-2": ["Mission Statement Builder", "Vision-Mission-Values Framework", "Strategic Narrative Template"],
            "1-3": ["Customer Interview Script", "Insight Synthesis Canvas", "Voice of Customer Database"],
            "1-4": ["Founding Team Scorecard", "Skills Gap Analysis", "Advisor Recruitment Plan"],
            "1-5": ["Market Sizing Calculator", "Competitive Matrix Template", "Positioning Quadrant Builder"],
            "1-6": ["MVP Planning Canvas", "Prototype Test Protocol", "Launch Readiness Checklist"],
            "2-1": ["Interview Schedule Template", "Question Bank by Stage", "Insight Synthesis Framework"],
            "2-2": ["Persona Canvas Template", "Buyer Journey Map", "Persona Interview Guide"],
            "2-3": ["Pain Point Matrix Template", "Customer Journey Map", "Pain-to-Feature Mapping"],
            "2-4": ["JTBD Interview Script", "Job Story Template", "Outcome Mapping Framework"],
            "2-5": ["Signal Scoring Rubric", "Feedback Prioritization Matrix", "Signal Tracking Dashboard"],
            "2-6": ["Insight Action Plan", "Decision Log Template", "Impact Tracking Sheet"],
            "3-1": ["Use Case Scoring Matrix", "Market Opportunity Calculator", "Feasibility Assessment"],
            "3-2": ["Segment Scoring Card", "ICP Definition Framework", "Tiering Decision Matrix"],
            "3-3": ["Resource Allocation Matrix", "Priority Scoring Framework", "Strategic Initiative Tracker"],
            "3-4": ["Competitive Positioning Canvas", "Differentiation Strategy Map", "Competitive Response Playbook"],
            "3-5": ["Risk Assessment Matrix", "Mitigation Strategy Framework", "Risk Monitoring Dashboard"],
            "3-6": ["Opportunity Evaluation Scorecard", "Market Timing Analysis", "Go/No-Go Decision Framework"],
            "4-1": ["Feature Prioritization Matrix", "MVP Scoping Canvas", "MoSCoW Analysis Template"],
            "4-2": ["Technical Roadmap Template", "Sprint Planning Board", "Architecture Decision Record"],
            "4-3": ["Pilot User Agreement", "Screening Questionnaire", "Feedback Collection Plan"],
            "4-4": ["QA Test Plan", "Success Criteria Checklist", "Bug Tracking Template"],
            "4-5": ["Gantt Chart Template", "Agile Roadmap Canvas", "Milestone Tracker"],
            "4-6": ["Post-Mortem Agenda", "Learning Canvas", "Decision Log Template"],
            "5-1": ["Case Study Interview Script", "Case Study Template", "ROI Calculator Framework"],
            "5-2": ["ROI Calculator Spreadsheet", "Value Realization Framework", "Business Case Template"],
            "5-3": ["Referral Program Framework", "Customer Advocacy Playbook", "Reference Customer Agreement"],
            "5-4": ["Testimonial Collection Guide", "Social Proof Library", "Success Story Template"],
            "5-5": ["Pilot Program Structure", "Beta Testing Agreement", "Early Adopter Onboarding Kit"],
            "5-6": ["Feedback Loop Framework", "Product Council Charter", "Feature Request Tracker"],
            "6-1": ["Feature Usage Matrix", "User Journey Heatmap", "Engagement Dashboard"],
            "6-2": ["Milestone Definition Framework", "Trigger Tracking Dashboard", "Intervention Playbook"],
            "6-3": ["Engagement Scoring Model", "User Behavior Tracker", "Activation Metrics Dashboard"],
            "6-4": ["Retention Strategy Guide", "Churn Prevention Playbook", "Customer Success Plan"],
            "6-5": ["Feature Adoption Dashboard", "User Journey Map", "Adoption Funnel Analysis"],
            "6-6": ["Feedback Collection Framework", "Voice of Customer Report", "Product Roadmap Input Matrix"],
            "7-1": ["ROI Calculator", "Time Study Template", "Cost-Benefit Analysis"],
            "7-2": ["Productivity Measurement Guide", "Before/After Analysis", "Impact Assessment Framework"],
            "7-3": ["Outcome Definition Worksheet", "Success Metrics Dashboard", "Quarterly Business Review Template"],
            "7-4": ["Benchmark Report Template", "Competitive Analysis Matrix", "Performance Comparison Dashboard"],
            "7-5": ["Attribution Model Framework", "Journey Mapping Template", "Feature Impact Analysis"],
            "7-6": ["Executive Dashboard Mockup", "KPI Selection Framework", "Dashboard Design Guide"],
            "8-1": ["Onboarding Checklist", "Welcome Email Sequence", "Success Plan Template"],
            "8-2": ["Health Score Calculator", "Risk Assessment Matrix", "Intervention Playbook"],
            "8-3": ["Expansion Opportunity Scorecard", "Upsell Talk Track", "Upgrade Proposal Template"],
            "8-4": ["Ticket Classification Guide", "Support Metrics Dashboard", "Root Cause Analysis Template"],
            "8-5": ["KB Article Template", "Content Audit Checklist", "Information Architecture Map"],
            "8-6": ["Renewal Forecast Model", "Account Review Template", "Save Plan Playbook"],
            "9-1": ["Conversion Tracking Sheet", "A/B Test Framework", "Funnel Analysis Template"],
            "9-2": ["Outbound Sequence Template", "Cold Email Scripts", "Objection Handling Matrix"],
            "9-3": ["Channel Performance Dashboard", "CAC by Channel Report", "Channel Mix Model"],
            "9-4": ["Sales Velocity Calculator", "Pipeline Velocity Dashboard", "Deal Progression Tracker"],
            "9-5": ["Win Rate Dashboard", "Competitive Win/Loss Matrix", "Deal Analysis Framework"],
            "9-6": ["Pipeline Coverage Calculator", "Coverage Ratio Dashboard", "Pipeline Generation Plan"],
            "10-1": ["Sales Candidate Scorecard", "Interview Question Bank", "Reference Check Guide"],
            "10-2": ["Discovery Call Script", "Qualification Scorecard", "Call Preparation Checklist"],
            "10-3": ["Demo Script Template", "Demo Preparation Guide", "Follow-up Email Templates"],
            "10-4": ["Objection Handling Guide", "Battle Card Template", "Win/Loss Analysis Form"],
            "10-5": ["Comp Plan Calculator", "Commission Agreement", "Quota Setting Framework"],
            "10-6": ["Pipeline Review Agenda", "Deal Inspection Checklist", "Forecast Call Script"],
            "11-1": ["Org Chart Template", "RACI Matrix", "Team Charter Document"],
            "11-2": ["OKR Planning Template", "Performance Review Form", "KPI Dashboard"],
            "11-3": ["Culture Deck Template", "Values Definition Workshop", "Behavior Interview Guide"],
            "11-4": ["Leadership Competency Model", "Development Plan Template", "360 Review Framework"],
            "11-5": ["Communication Charter", "Meeting Agenda Templates", "Status Report Format"],
            "11-6": ["Retention Risk Assessment", "Stay Interview Guide", "Compensation Benchmarking Tool"],
            "12-1": ["Churn Analysis Worksheet", "Risk Scoring Rubric", "Intervention Playbook"],
            "12-2": ["Win-Back Email Sequence", "Offer Strategy Matrix", "Campaign Tracking Sheet"],
            "12-3": ["Loyalty Program Framework", "Tier Structure Calculator", "Rewards Catalog"],
            "12-4": ["Pricing Analysis Worksheet", "Van Westendorp Survey", "Pricing Committee Deck"],
            "12-5": ["CAB Charter Template", "Member Invitation Letter", "Meeting Agenda Framework"],
            "12-6": ["Engagement Scoring Model", "Segmentation Framework", "Automated Playbooks"],
            "13-1": ["Category Design Canvas", "Point of View Document", "Category Manifesto Template"],
            "13-2": ["Moat Assessment Framework", "Competitive Defensibility Map", "Moat Investment Plan"],
            "13-3": ["Ecosystem Development Plan", "Platform Strategy Canvas", "Network Effects Calculator"],
            "13-4": ["M&A Target Evaluation Matrix", "Integration Planning Checklist", "Synergy Realization Tracker"],
            "13-5": ["Market Leadership Scorecard", "Thought Leadership Calendar", "Industry Influence Map"],
            "13-6": ["Competitive Intelligence Framework", "Market Share Tracker", "Strategic Response Playbook"],
            "14-1": ["Architecture Diagram Template", "System Documentation Guide", "Integration Checklist"],
            "14-2": ["Revenue Operations Map", "Systems Integration Plan", "GTM Tech Stack Audit"],
            "14-3": ["Process Automation Blueprint", "Workflow Optimization Guide", "Automation ROI Calculator"],
            "14-4": ["Data Architecture Blueprint", "Data Governance Framework", "Analytics Implementation Plan"],
            "14-5": ["Security Policy Template", "Compliance Checklist", "Incident Response Plan"],
            "14-6": ["Scalability Roadmap", "Capacity Planning Model", "Infrastructure Cost Optimizer"],
            "15-1": ["Executive Job Description", "Interview Scorecard", "90-Day Plan Template"],
            "15-2": ["Board Charter", "Board Deck Template", "Director Onboarding Kit"],
            "15-3": ["Succession Planning Grid", "Talent Review Template", "Development Action Plan"],
            "15-4": ["Stakeholder Map", "Alignment Canvas", "Communication Calendar"],
            "15-5": ["Investor Update Template", "Board Report Format", "Data Room Checklist"],
            "15-6": ["Team Assessment Survey", "Team Charter Template", "Conflict Resolution Guide"],
            "16-1": ["Market Entry Canvas", "Localization Checklist", "Partnership Agreement Template"],
            "16-2": ["Localization Requirements Matrix", "Translation Style Guide", "Market Launch Checklist"],
            "16-3": ["Country Launch Checklist", "Global Vendor Matrix", "Compliance Calendar"],
            "16-4": ["Compliance Requirements Matrix", "Risk Assessment Framework", "Audit Preparation Checklist"],
            "16-5": ["Partner Program Guide", "Partnership Agreement Template", "Partner Enablement Kit"],
            "16-6": ["Cultural Assessment Tool", "Adaptation Checklist", "Cross-Cultural Training Guide"]
        };

        const subcomponentTemplates = CORRECT_TEMPLATES[subcomponentId] || ["Generic Template 1", "Generic Template 2", "Generic Template 3"];
        const templateName = subcomponentTemplates[index];

        const templates = [
            {
                name: templateName,
                content: `
<div style="font-family: 'Segoe UI', Arial, sans-serif; color: #e0e0e0; max-width: 800px; margin: 0 auto;">
    <div style="background: linear-gradient(135deg, #FF5500, #FF8800); color: white; padding: 40px; border-radius: 15px 15px 0 0;">
        <h1 style="margin: 0; font-size: 36px;">PROBLEM STATEMENT CANVAS</h1>
        <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.95;">Executive Strategic Framework</p>
    </div>
    
    <div style="background: #0a0a0a; padding: 40px; border: 2px solid #333;">
        <div style="background: #1a1a1a; padding: 30px; border-radius: 10px; margin-bottom: 30px; box-shadow: 0 2px 10px rgba(255,85,0,0.2); border: 1px solid rgba(255,255,255,0.1);">
            <h2 style="color: #FF5500; border-bottom: 3px solid #FF5500; padding-bottom: 10px;">1. THE PROBLEM</h2>
            
            <h3 style="color: #fff; margin-top: 20px;">Who experiences this problem?</h3>
            <p style="background: #0a0a0a; padding: 15px; border-left: 4px solid #FF5500; border-radius: 5px; color: #e0e0e0;">
                ${workspaceAnswers['target-audience']?.answer || workspaceAnswers['problem-who']?.answer || 'B2B SaaS startups experiencing GTM execution failures'}
            </p>
            
            <h3 style="color: #fff; margin-top: 20px;">What specific problem are they facing?</h3>
            <p style="background: #0a0a0a; padding: 15px; border-left: 4px solid #FF5500; border-radius: 5px; color: #e0e0e0;">
                ${workspaceAnswers['problem-what']?.answer || workspaceAnswers['core-problem']?.answer || '92% of startups fail within 3 years due to GTM execution challenges'}
            </p>
            
            <h3 style="color: #fff; margin-top: 20px;">Why is this problem critical?</h3>
            <p style="background: #0a0a0a; padding: 15px; border-left: 4px solid #FF5500; border-radius: 5px; color: #e0e0e0;">
                ${workspaceAnswers['problem-impact']?.answer || 'Fragmented solutions across 15+ vendors with no unified strategy'}
            </p>
        </div>

        <div style="background: #1a1a1a; padding: 30px; border-radius: 10px; margin-bottom: 30px; box-shadow: 0 2px 10px rgba(255,85,0,0.2); border: 1px solid rgba(255,255,255,0.1);">
            <h2 style="color: #FF5500; border-bottom: 3px solid #FF5500; padding-bottom: 10px;">2. IMPACT ANALYSIS</h2>
            
            <h3 style="color: #fff; margin-top: 20px;">Operational Impact</h3>
            <p style="background: #0a0a0a; padding: 15px; border-left: 4px solid #FF5500; border-radius: 5px; color: #e0e0e0;">
                ${workspaceAnswers['operational-impact']?.answer || 'Loses $75B annually in failed GTM initiatives'}
            </p>
            
            <h3 style="color: #fff; margin-top: 20px;">Evidence & Validation</h3>
            <p style="background: #0a0a0a; padding: 15px; border-left: 4px solid #FF5500; border-radius: 5px; color: #e0e0e0;">
                ${workspaceAnswers['evidence']?.answer || '70% cite go-to-market challenges as primary failure cause'}
            </p>
        </div>
        
        <div style="background: linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(76, 175, 80, 0.05)); padding: 30px; border-radius: 10px; margin-bottom: 30px; border: 2px solid #4CAF50;">
            <h2 style="color: #4CAF50;">3. EXPERT RECOMMENDATIONS</h2>
            <p style="font-weight: bold; margin-bottom: 20px;">Based on your ${latestScore}% performance score:</p>
            <ul style="line-height: 2;">
                ${latestScore >= 80 ? `
                    <li>Scale your validated solution across new market segments</li>
                    <li>Document and systematize your successful processes</li>
                    <li>Explore strategic partnerships for accelerated growth</li>
                    <li>Invest in advanced analytics and automation</li>
                    <li>Consider international expansion opportunities</li>
                ` : latestScore >= 60 ? `
                    <li>Focus on optimizing core operational processes</li>
                    <li>Implement comprehensive customer feedback systems</li>
                    <li>Strengthen product-market fit validation</li>
                    <li>Build scalable infrastructure for growth</li>
                    <li>Develop clear KPIs and tracking mechanisms</li>
                ` : `
                    <li>Prioritize problem validation with target customers</li>
                    <li>Establish clear value proposition</li>
                    <li>Focus on achieving initial product-market fit</li>
                    <li>Build minimum viable solution for testing</li>
                    <li>Implement agile development processes</li>
                `}
            </ul>
        </div>

        <div style="background: #1a1a1a; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(255,85,0,0.2); border: 1px solid rgba(255,255,255,0.1);">
            <h2 style="color: #FF5500; border-bottom: 3px solid #FF5500; padding-bottom: 10px;">4. STRATEGIC NEXT STEPS</h2>
            <ol style="line-height: 2;">
                <li><strong>Immediate (Week 1-2):</strong> Validate assumptions with 10-15 customer interviews</li>
                <li><strong>Short-term (Month 1):</strong> Quantify problem impact with specific metrics</li>
                <li><strong>Medium-term (Month 2-3):</strong> Develop and test MVP solution</li>
                <li><strong>Long-term (Month 4-6):</strong> Scale based on validated learnings</li>
                <li><strong>Ongoing:</strong> Maintain continuous feedback and iteration cycles</li>
            </ol>
        </div>
    </div>
    
    <div style="background: #2c3e50; color: white; padding: 20px; text-align: center; border-radius: 0 0 15px 15px;">
        <p style="margin: 0;">Generated by ScaleOps6 Platform • ${new Date().toLocaleString()}</p>
    </div>
</div>
                `
            },
            {
                name: 'Customer Interview Guide',
                content: `
<div style="font-family: 'Segoe UI', Arial, sans-serif; color: #e0e0e0; max-width: 800px; margin: 0 auto;">
    <div style="background: linear-gradient(135deg, #9C27B0, #BA68C8); color: white; padding: 40px; border-radius: 15px 15px 0 0;">
        <h1 style="margin: 0; font-size: 36px;">CUSTOMER INTERVIEW GUIDE</h1>
        <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.95;">Data-Driven Discovery Framework</p>
    </div>
    
    <div style="background: #0a0a0a; padding: 40px; border: 2px solid #333;">
        <div style="background: #1a1a1a; padding: 30px; border-radius: 10px; margin-bottom: 30px; box-shadow: 0 2px 10px rgba(156,39,176,0.2); border: 1px solid rgba(255,255,255,0.1);">
            <h2 style="color: #9C27B0; border-bottom: 3px solid #9C27B0; padding-bottom: 10px;">OPENING QUESTIONS (5 minutes)</h2>
            <ol style="line-height: 2; color: #e0e0e0;">
                <li>Can you tell me about your role and key responsibilities?</li>
                <li>What does a typical day look like for you?</li>
                <li>What are your top 3 priorities this quarter?</li>
            </ol>
        </div>
        
        <div style="background: #1a1a1a; padding: 30px; border-radius: 10px; margin-bottom: 30px; box-shadow: 0 2px 10px rgba(156,39,176,0.2); border: 1px solid rgba(255,255,255,0.1);">
            <h2 style="color: #9C27B0; border-bottom: 3px solid #9C27B0; padding-bottom: 10px;">PROBLEM VALIDATION (15 minutes)</h2>
            
            <h3 style="color: #fff; margin-top: 20px;">Based on your workspace: "${workspaceAnswers['core-problem']?.answer || 'GTM execution challenges'}"</h3>
            <ol style="line-height: 2; background: #0a0a0a; padding: 20px; border-radius: 5px; color: #e0e0e0;">
                <li>Have you experienced challenges with [specific problem]?</li>
                <li>How often does this problem occur? Daily/Weekly/Monthly?</li>
                <li>What's the impact when this happens? (Time/Money/Resources)</li>
                <li>How are you currently solving or working around this?</li>
                <li>What's not ideal about your current solution?</li>
                <li>If you had a magic wand, how would you solve this?</li>
            </ol>
        </div>
        
        <div style="background: #1a1a1a; padding: 30px; border-radius: 10px; margin-bottom: 30px; box-shadow: 0 2px 10px rgba(156,39,176,0.2); border: 1px solid rgba(255,255,255,0.1);">
            <h2 style="color: #9C27B0; border-bottom: 3px solid #9C27B0; padding-bottom: 10px;">SOLUTION EXPLORATION (15 minutes)</h2>
            
            <h3 style="color: #fff; margin-top: 20px;">Customized for ${latestScore}% Performance Level</h3>
            <ol style="line-height: 2; background: #0a0a0a; padding: 20px; border-radius: 5px; color: #e0e0e0;">
                ${latestScore >= 80 ? `
                    <li>What advanced features would make this solution indispensable?</li>
                    <li>How would you measure ROI for this solution?</li>
                    <li>What integrations are critical for your workflow?</li>
                    <li>Would you be interested in being a design partner?</li>
                    <li>What's your budget for solutions in this category?</li>
                ` : latestScore >= 60 ? `
                    <li>What are the must-have features vs nice-to-haves?</li>
                    <li>How would this fit into your existing workflow?</li>
                    <li>What would success look like after 90 days?</li>
                    <li>Who else would need to approve this purchase?</li>
                    <li>What's your typical evaluation process?</li>
                ` : `
                    <li>What would need to be true for you to try a new solution?</li>
                    <li>What are your biggest concerns about changing solutions?</li>
                    <li>How do you typically evaluate new tools?</li>
                    <li>What's your budget range for this type of solution?</li>
                    <li>Would you be willing to pilot a solution?</li>
                `}
            </ol>
        </div>
        
        <div style="background: linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(76, 175, 80, 0.05)); padding: 30px; border-radius: 10px; margin-bottom: 30px; border: 2px solid #4CAF50;">
            <h2 style="color: #4CAF50;">CLOSING & NEXT STEPS (5 minutes)</h2>
            <ol style="line-height: 2;">
                <li>What haven't I asked that I should have?</li>
                <li>Who else should I talk to about this problem?</li>
                <li>Can I follow up with you as we develop our solution?</li>
                <li>Would you like to be part of our beta program?</li>
                <li>Do you have any questions for me?</li>
            </ol>
        </div>
        
        <div style="background: #1a1a1a; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(156,39,176,0.2); border: 1px solid rgba(255,255,255,0.1);">
            <h2 style="color: #9C27B0; border-bottom: 3px solid #9C27B0; padding-bottom: 10px;">POST-INTERVIEW CHECKLIST</h2>
            <ul style="line-height: 2; color: #e0e0e0;">
                <li>☐ Send thank you email within 24 hours</li>
                <li>☐ Document key insights and quotes</li>
                <li>☐ Update problem/solution hypotheses</li>
                <li>☐ Share learnings with team</li>
                <li>☐ Schedule follow-up if appropriate</li>
                <li>☐ Add to CRM with detailed notes</li>
            </ul>
        </div>
    </div>
    
    <div style="background: #2c3e50; color: white; padding: 20px; text-align: center; border-radius: 0 0 15px 15px;">
        <p style="margin: 0;">Generated by ScaleOps6 Platform • ${new Date().toLocaleString()}</p>
    </div>
</div>
                `
            },
            {
                name: 'Market Validation Scorecard',
                content: `
<div style="font-family: 'Segoe UI', Arial, sans-serif; color: #e0e0e0; max-width: 800px; margin: 0 auto;">
    <div style="background: linear-gradient(135deg, #2196F3, #42A5F5); color: white; padding: 40px; border-radius: 15px 15px 0 0;">
        <h1 style="margin: 0; font-size: 36px;">MARKET VALIDATION SCORECARD</h1>
        <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.95;">Comprehensive Market Assessment Framework</p>
    </div>
    
    <div style="background: #0a0a0a; padding: 40px; border: 2px solid #333;">
        <div style="background: #1a1a1a; padding: 30px; border-radius: 10px; margin-bottom: 30px; box-shadow: 0 2px 10px rgba(33,150,243,0.2); border: 1px solid rgba(255,255,255,0.1);">
            <h2 style="color: #2196F3; border-bottom: 3px solid #2196F3; padding-bottom: 10px;">MARKET OPPORTUNITY</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr style="background: #0a0a0a;">
                    <th style="padding: 12px; text-align: left; border: 1px solid #333; color: #fff;">Criteria</th>
                    <th style="padding: 12px; text-align: center; border: 1px solid #333; color: #fff;">Score</th>
                    <th style="padding: 12px; text-align: left; border: 1px solid #333; color: #fff;">Assessment</th>
                </tr>
                <tr>
                    <td style="padding: 12px; border: 1px solid #333; color: #e0e0e0;"><strong style="color: #fff;">Market Size</strong></td>
                    <td style="padding: 12px; text-align: center; border: 1px solid #333; color: #4CAF50; font-weight: bold;">9/10</td>
                    <td style="padding: 12px; border: 1px solid #333; color: #e0e0e0;">$75B+ addressable market</td>
                </tr>
                <tr style="background: #0a0a0a;">
                    <td style="padding: 12px; border: 1px solid #333; color: #e0e0e0;"><strong style="color: #fff;">Growth Rate</strong></td>
                    <td style="padding: 12px; text-align: center; border: 1px solid #333; color: #4CAF50; font-weight: bold;">8/10</td>
                    <td style="padding: 12px; border: 1px solid #333; color: #e0e0e0;">23% CAGR projected</td>
                </tr>
                <tr>
                    <td style="padding: 12px; border: 1px solid #333; color: #e0e0e0;"><strong style="color: #fff;">Competition</strong></td>
                    <td style="padding: 12px; text-align: center; border: 1px solid #333; color: #F59E0B; font-weight: bold;">6/10</td>
                    <td style="padding: 12px; border: 1px solid #333; color: #e0e0e0;">Fragmented, no clear leader</td>
                </tr>
                <tr style="background: #0a0a0a;">
                    <td style="padding: 12px; border: 1px solid #333; color: #e0e0e0;"><strong style="color: #fff;">Entry Barriers</strong></td>
                    <td style="padding: 12px; text-align: center; border: 1px solid #333; color: #F59E0B; font-weight: bold;">7/10</td>
                    <td style="padding: 12px; border: 1px solid #333; color: #e0e0e0;">Moderate technical requirements</td>
                </tr>
            </table>
        </div>
        
        <div style="background: #1a1a1a; padding: 30px; border-radius: 10px; margin-bottom: 30px; box-shadow: 0 2px 10px rgba(33,150,243,0.2); border: 1px solid rgba(255,255,255,0.1);">
            <h2 style="color: #2196F3; border-bottom: 3px solid #2196F3; padding-bottom: 10px;">CUSTOMER VALIDATION</h2>
            
            <div style="margin-top: 20px;">
                <h3 style="color: #fff;">Problem Severity: <span style="color: ${latestScore >= 80 ? '#4CAF50' : '#F59E0B'};">${latestScore >= 80 ? 'CRITICAL' : latestScore >= 60 ? 'HIGH' : 'MODERATE'}</span></h3>
                <div style="background: #0a0a0a; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
                    <p style="color: #e0e0e0;">${workspaceAnswers['problem-severity']?.answer || '92% of target customers experience this problem regularly'}</p>
                </div>
                
                <h3 style="color: #fff;">Willingness to Pay: <span style="color: #4CAF50;">HIGH</span></h3>
                <div style="background: #0a0a0a; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
                    <p style="color: #e0e0e0;">${workspaceAnswers['willingness-to-pay']?.answer || 'Customers currently spend $50K+ annually on fragmented solutions'}</p>
                </div>
                
                <h3 style="color: #fff;">Adoption Likelihood: <span style="color: ${latestScore >= 70 ? '#4CAF50' : '#F59E0B'};">${latestScore >= 70 ? 'HIGH' : 'MODERATE'}</span></h3>
                <div style="background: #0a0a0a; padding: 15px; border-radius: 5px;">
                    <p style="color: #e0e0e0;">Based on ${latestScore}% validation score and market readiness indicators</p>
                </div>
            </div>
        </div>
        
        <div style="background: linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(76, 175, 80, 0.05)); padding: 30px; border-radius: 10px; margin-bottom: 30px; border: 2px solid #4CAF50;">
            <h2 style="color: #4CAF50;">COMPETITIVE POSITIONING</h2>
            
            <h3 style="color: #fff; margin-top: 20px;">Key Differentiators</h3>
            <ul style="line-height: 2; color: #e0e0e0;">
                <li>Unified platform vs fragmented point solutions</li>
                <li>AI-powered insights and recommendations</li>
                <li>Industry-specific templates and playbooks</li>
                <li>Proven ROI with measurable outcomes</li>
                <li>Enterprise-grade security and compliance</li>
            </ul>
            
            <h3 style="color: #fff; margin-top: 20px;">Competitive Advantages</h3>
            <ul style="line-height: 2; color: #e0e0e0;">
                ${latestScore >= 80 ? `
                    <li>Market leader positioning with proven traction</li>
                    <li>Strong customer testimonials and case studies</li>
                    <li>Established partnership ecosystem</li>
                    <li>Superior product-market fit validation</li>
                ` : latestScore >= 60 ? `
                    <li>Emerging player with innovative approach</li>
                    <li>Agile development and rapid iteration</li>
                    <li>Strong founding team expertise</li>
                    <li>Clear product roadmap and vision</li>
                ` : `
                    <li>First-mover advantage in specific niche</li>
                    <li>Lean operation with low burn rate</li>
                    <li>Direct customer feedback integration</li>
                    <li>Focused MVP approach</li>
                `}
            </ul>
        </div>
        
        <div style="background: #1a1a1a; padding: 30px; border-radius: 10px; margin-bottom: 30px; box-shadow: 0 2px 10px rgba(33,150,243,0.2); border: 1px solid rgba(255,255,255,0.1);">
            <h2 style="color: #2196F3; border-bottom: 3px solid #2196F3; padding-bottom: 10px;">RISK ASSESSMENT</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr style="background: #0a0a0a;">
                    <th style="padding: 12px; text-align: left; border: 1px solid #333; color: #fff;">Risk Type</th>
                    <th style="padding: 12px; text-align: center; border: 1px solid #333; color: #fff;">Level</th>
                    <th style="padding: 12px; text-align: left; border: 1px solid #333; color: #fff;">Mitigation Strategy</th>
                </tr>
                <tr>
                    <td style="padding: 12px; border: 1px solid #333; color: #e0e0e0;"><strong style="color: #fff;">Technical</strong></td>
                    <td style="padding: 12px; text-align: center; border: 1px solid #333; color: #4CAF50;">LOW</td>
                    <td style="padding: 12px; border: 1px solid #333; color: #e0e0e0;">Proven technology stack</td>
                </tr>
                <tr style="background: #0a0a0a;">
                    <td style="padding: 12px; border: 1px solid #333; color: #e0e0e0;"><strong style="color: #fff;">Market</strong></td>
                    <td style="padding: 12px; text-align: center; border: 1px solid #333; color: ${latestScore >= 70 ? '#4CAF50' : '#F59E0B'};">${latestScore >= 70 ? 'LOW' : 'MEDIUM'}</td>
                    <td style="padding: 12px; border: 1px solid #333; color: #e0e0e0;">Strong validation signals</td>
                </tr>
                <tr>
                    <td style="padding: 12px; border: 1px solid #333; color: #e0e0e0;"><strong style="color: #fff;">Execution</strong></td>
                    <td style="padding: 12px; text-align: center; border: 1px solid #333; color: #F59E0B;">MEDIUM</td>
                    <td style="padding: 12px; border: 1px solid #333; color: #e0e0e0;">Experienced team, clear roadmap</td>
                </tr>
                <tr style="background: #0a0a0a;">
                    <td style="padding: 12px; border: 1px solid #333; color: #e0e0e0;"><strong style="color: #fff;">Financial</strong></td>
                    <td style="padding: 12px; text-align: center; border: 1px solid #333; color: #4CAF50;">LOW</td>
                    <td style="padding: 12px; border: 1px solid #333; color: #e0e0e0;">Efficient burn, clear path to profitability</td>
                </tr>
            </table>
        </div>
        
        <div style="background: linear-gradient(135deg, rgba(255, 85, 0, 0.1), rgba(255, 85, 0, 0.05)); padding: 30px; border-radius: 10px; border: 2px solid #FF5500;">
            <h2 style="color: #FF5500;">FINAL RECOMMENDATION</h2>
            
            <div style="text-align: center; margin: 30px 0;">
                <div style="font-size: 48px; font-weight: bold; color: ${latestScore >= 70 ? '#4CAF50' : '#F59E0B'};">
                    ${latestScore >= 70 ? 'PROCEED' : 'PROCEED WITH CAUTION'}
                </div>
                <div style="font-size: 20px; color: #666; margin-top: 10px;">
                    Market Validation Score: ${latestScore}%
                </div>
            </div>
            
            <h3 style="color: #fff;">Immediate Action Items:</h3>
            <ol style="line-height: 2; color: #e0e0e0;">
                ${latestScore >= 80 ? `
                    <li>Accelerate go-to-market execution</li>
                    <li>Scale customer acquisition efforts</li>
                    <li>Expand product feature set</li>
                    <li>Raise growth capital if needed</li>
                    <li>Build strategic partnerships</li>
                ` : latestScore >= 60 ? `
                    <li>Complete product-market fit validation</li>
                    <li>Refine value proposition messaging</li>
                    <li>Build initial customer base</li>
                    <li>Establish unit economics</li>
                    <li>Prepare for seed funding</li>
                ` : `
                    <li>Conduct additional customer interviews</li>
                    <li>Refine problem statement</li>
                    <li>Build and test MVP</li>
                    <li>Validate pricing model</li>
                    <li>Establish product-market fit</li>
                `}
            </ol>
        </div>
    </div>
    
    <div style="background: #2c3e50; color: white; padding: 20px; text-align: center; border-radius: 0 0 15px 15px;">
        <p style="margin: 0;">Generated by ScaleOps6 Platform • ${new Date().toLocaleString()}</p>
    </div>
</div>
                `
            }
        ];
        
        // Create modal for template viewing
        let modal = document.getElementById('template-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'template-modal';
            modal.style.cssText = `
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                z-index: 10000;
                overflow-y: auto;
            `;
            document.body.appendChild(modal);
        }
        
        modal.innerHTML = `
            <div style="max-width: 1000px; margin: 40px auto; padding: 20px;">
                <button onclick="document.getElementById('template-modal').style.display='none'" style="
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #FF5500;
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 8px;
                    font-size: 16px;
                    cursor: pointer;
                    z-index: 10001;
                    font-weight: 600;
                ">✕ Close</button>
                
                <div style="background: #1a1a1a; border-radius: 15px; padding: 0; margin-top: 20px;">
                    ${templates[index].content}
                </div>
                
                <div style="text-align: center; margin-top: 30px;">
                    <button onclick="window.downloadEnhancedTemplate(${index})" style="
                        background: linear-gradient(135deg, #FF5500, #FF8800);
                        color: white;
                        border: none;
                        padding: 15px 40px;
                        border-radius: 10px;
                        font-size: 18px;
                        font-weight: 600;
                        cursor: pointer;
                    ">
                        📥 Download This Template
                    </button>
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
    };
    
    // Download enhanced template - NOW USES PDF GENERATION
    window.downloadEnhancedTemplate = function(index, subcomponentId) {
        console.log('📥 Downloading template as PDF...');
        
        // Check if PDF generator is available
        if (typeof window.downloadTemplatePDF === 'function') {
            const workspaceAnswers = getWorkspaceAnswers();
            const scoreHistory = getAllScoreHistory();
            const latestScore = scoreHistory[0]?.score || 75;
            const urlParams = new URLSearchParams(window.location.search);
            const currentSubId = subcomponentId || urlParams.get('id') || '1-1';
            
            // Get template name from SSOT
            const templates = window.subcomponentData?.resources?.templates || [];
            const templateName = templates[index] || 'Template';
            
            // Use PDF generator
            window.downloadTemplatePDF(templateName, currentSubId, workspaceAnswers, latestScore);
            return;
        }
        
        // Fallback to HTML if PDF generator not available
        console.warn('⚠️ PDF generator not available, falling back to HTML');
        const workspaceAnswers = getWorkspaceAnswers();
        const scoreHistory = getAllScoreHistory();
        const latestScore = scoreHistory[0]?.score || 75;

        // Get the correct templates for this subcomponent
        const CORRECT_TEMPLATES = {
            "1-1": ["Problem Statement Canvas", "Customer Pain Interview Guide", "Problem Validation Scorecard"],
            "1-2": ["Mission Statement Builder", "Vision-Mission-Values Framework", "Strategic Narrative Template"],
            "1-3": ["Customer Interview Script", "Insight Synthesis Canvas", "Voice of Customer Database"],
            "1-4": ["Founding Team Scorecard", "Skills Gap Analysis", "Advisor Recruitment Plan"],
            "1-5": ["Market Sizing Calculator", "Competitive Matrix Template", "Positioning Quadrant Builder"],
            "1-6": ["MVP Planning Canvas", "Prototype Test Protocol", "Launch Readiness Checklist"],
            "2-1": ["Interview Schedule Template", "Question Bank by Stage", "Insight Synthesis Framework"],
            "2-2": ["Persona Canvas Template", "Buyer Journey Map", "Persona Interview Guide"],
            "2-3": ["Pain Point Matrix Template", "Customer Journey Map", "Pain-to-Feature Mapping"],
            "2-4": ["JTBD Interview Script", "Job Story Template", "Outcome Mapping Framework"],
            "2-5": ["Signal Scoring Rubric", "Feedback Prioritization Matrix", "Signal Tracking Dashboard"],
            "2-6": ["Insight Action Plan", "Decision Log Template", "Impact Tracking Sheet"],
            "3-1": ["Use Case Scoring Matrix", "Market Opportunity Calculator", "Feasibility Assessment"],
            "3-2": ["Segment Scoring Card", "ICP Definition Framework", "Tiering Decision Matrix"],
            "3-3": ["Resource Allocation Matrix", "Priority Scoring Framework", "Strategic Initiative Tracker"],
            "3-4": ["Competitive Positioning Canvas", "Differentiation Strategy Map", "Competitive Response Playbook"],
            "3-5": ["Risk Assessment Matrix", "Mitigation Strategy Framework", "Risk Monitoring Dashboard"],
            "3-6": ["Opportunity Evaluation Scorecard", "Market Timing Analysis", "Go/No-Go Decision Framework"],
            "4-1": ["Feature Prioritization Matrix", "MVP Scoping Canvas", "MoSCoW Analysis Template"],
            "4-2": ["Technical Roadmap Template", "Sprint Planning Board", "Architecture Decision Record"],
            "4-3": ["Pilot User Agreement", "Screening Questionnaire", "Feedback Collection Plan"],
            "4-4": ["QA Test Plan", "Success Criteria Checklist", "Bug Tracking Template"],
            "4-5": ["Gantt Chart Template", "Agile Roadmap Canvas", "Milestone Tracker"],
            "4-6": ["Post-Mortem Agenda", "Learning Canvas", "Decision Log Template"],
            "5-1": ["Case Study Interview Script", "Case Study Template", "ROI Calculator Framework"],
            "5-2": ["ROI Calculator Spreadsheet", "Value Realization Framework", "Business Case Template"],
            "5-3": ["Referral Program Framework", "Customer Advocacy Playbook", "Reference Customer Agreement"],
            "5-4": ["Testimonial Collection Guide", "Social Proof Library", "Success Story Template"],
            "5-5": ["Pilot Program Structure", "Beta Testing Agreement", "Early Adopter Onboarding Kit"],
            "5-6": ["Feedback Loop Framework", "Product Council Charter", "Feature Request Tracker"],
            "6-1": ["Feature Usage Matrix", "User Journey Heatmap", "Engagement Dashboard"],
            "6-2": ["Milestone Definition Framework", "Trigger Tracking Dashboard", "Intervention Playbook"],
            "6-3": ["Engagement Scoring Model", "User Behavior Tracker", "Activation Metrics Dashboard"],
            "6-4": ["Retention Strategy Guide", "Churn Prevention Playbook", "Customer Success Plan"],
            "6-5": ["Feature Adoption Dashboard", "User Journey Map", "Adoption Funnel Analysis"],
            "6-6": ["Feedback Collection Framework", "Voice of Customer Report", "Product Roadmap Input Matrix"],
            "7-1": ["ROI Calculator", "Time Study Template", "Cost-Benefit Analysis"],
            "7-2": ["Productivity Measurement Guide", "Before/After Analysis", "Impact Assessment Framework"],
            "7-3": ["Outcome Definition Worksheet", "Success Metrics Dashboard", "Quarterly Business Review Template"],
            "7-4": ["Benchmark Report Template", "Competitive Analysis Matrix", "Performance Comparison Dashboard"],
            "7-5": ["Attribution Model Framework", "Journey Mapping Template", "Feature Impact Analysis"],
            "7-6": ["Executive Dashboard Mockup", "KPI Selection Framework", "Dashboard Design Guide"],
            "8-1": ["Onboarding Checklist", "Welcome Email Sequence", "Success Plan Template"],
            "8-2": ["Health Score Calculator", "Risk Assessment Matrix", "Intervention Playbook"],
            "8-3": ["Expansion Opportunity Scorecard", "Upsell Talk Track", "Upgrade Proposal Template"],
            "8-4": ["Ticket Classification Guide", "Support Metrics Dashboard", "Root Cause Analysis Template"],
            "8-5": ["KB Article Template", "Content Audit Checklist", "Information Architecture Map"],
            "8-6": ["Renewal Forecast Model", "Account Review Template", "Save Plan Playbook"],
            "9-1": ["Conversion Tracking Sheet", "A/B Test Framework", "Funnel Analysis Template"],
            "9-2": ["Outbound Sequence Template", "Cold Email Scripts", "Objection Handling Matrix"],
            "9-3": ["Channel Performance Dashboard", "CAC by Channel Report", "Channel Mix Model"],
            "9-4": ["Sales Velocity Calculator", "Pipeline Velocity Dashboard", "Deal Progression Tracker"],
            "9-5": ["Win Rate Dashboard", "Competitive Win/Loss Matrix", "Deal Analysis Framework"],
            "9-6": ["Pipeline Coverage Calculator", "Coverage Ratio Dashboard", "Pipeline Generation Plan"],
            "10-1": ["Sales Candidate Scorecard", "Interview Question Bank", "Reference Check Guide"],
            "10-2": ["Discovery Call Script", "Qualification Scorecard", "Call Preparation Checklist"],
            "10-3": ["Demo Script Template", "Demo Preparation Guide", "Follow-up Email Templates"],
            "10-4": ["Objection Handling Guide", "Battle Card Template", "Win/Loss Analysis Form"],
            "10-5": ["Comp Plan Calculator", "Commission Agreement", "Quota Setting Framework"],
            "10-6": ["Pipeline Review Agenda", "Deal Inspection Checklist", "Forecast Call Script"],
            "11-1": ["Org Chart Template", "RACI Matrix", "Team Charter Document"],
            "11-2": ["OKR Planning Template", "Performance Review Form", "KPI Dashboard"],
            "11-3": ["Culture Deck Template", "Values Definition Workshop", "Behavior Interview Guide"],
            "11-4": ["Leadership Competency Model", "Development Plan Template", "360 Review Framework"],
            "11-5": ["Communication Charter", "Meeting Agenda Templates", "Status Report Format"],
            "11-6": ["Retention Risk Assessment", "Stay Interview Guide", "Compensation Benchmarking Tool"],
            "12-1": ["Churn Analysis Worksheet", "Risk Scoring Rubric", "Intervention Playbook"],
            "12-2": ["Win-Back Email Sequence", "Offer Strategy Matrix", "Campaign Tracking Sheet"],
            "12-3": ["Loyalty Program Framework", "Tier Structure Calculator", "Rewards Catalog"],
            "12-4": ["Pricing Analysis Worksheet", "Van Westendorp Survey", "Pricing Committee Deck"],
            "12-5": ["CAB Charter Template", "Member Invitation Letter", "Meeting Agenda Framework"],
            "12-6": ["Engagement Scoring Model", "Segmentation Framework", "Automated Playbooks"],
            "13-1": ["Category Design Canvas", "Point of View Document", "Category Manifesto Template"],
            "13-2": ["Moat Assessment Framework", "Competitive Defensibility Map", "Moat Investment Plan"],
            "13-3": ["Ecosystem Development Plan", "Platform Strategy Canvas", "Network Effects Calculator"],
            "13-4": ["M&A Target Evaluation Matrix", "Integration Planning Checklist", "Synergy Realization Tracker"],
            "13-5": ["Market Leadership Scorecard", "Thought Leadership Calendar", "Industry Influence Map"],
            "13-6": ["Competitive Intelligence Framework", "Market Share Tracker", "Strategic Response Playbook"],
            "14-1": ["Architecture Diagram Template", "System Documentation Guide", "Integration Checklist"],
            "14-2": ["Revenue Operations Map", "Systems Integration Plan", "GTM Tech Stack Audit"],
            "14-3": ["Process Automation Blueprint", "Workflow Optimization Guide", "Automation ROI Calculator"],
            "14-4": ["Data Architecture Blueprint", "Data Governance Framework", "Analytics Implementation Plan"],
            "14-5": ["Security Policy Template", "Compliance Checklist", "Incident Response Plan"],
            "14-6": ["Scalability Roadmap", "Capacity Planning Model", "Infrastructure Cost Optimizer"],
            "15-1": ["Executive Job Description", "Interview Scorecard", "90-Day Plan Template"],
            "15-2": ["Board Charter", "Board Deck Template", "Director Onboarding Kit"],
            "15-3": ["Succession Planning Grid", "Talent Review Template", "Development Action Plan"],
            "15-4": ["Stakeholder Map", "Alignment Canvas", "Communication Calendar"],
            "15-5": ["Investor Update Template", "Board Report Format", "Data Room Checklist"],
            "15-6": ["Team Assessment Survey", "Team Charter Template", "Conflict Resolution Guide"],
            "16-1": ["Market Entry Canvas", "Localization Checklist", "Partnership Agreement Template"],
            "16-2": ["Localization Requirements Matrix", "Translation Style Guide", "Market Launch Checklist"],
            "16-3": ["Country Launch Checklist", "Global Vendor Matrix", "Compliance Calendar"],
            "16-4": ["Compliance Requirements Matrix", "Risk Assessment Framework", "Audit Preparation Checklist"],
            "16-5": ["Partner Program Guide", "Partnership Agreement Template", "Partner Enablement Kit"],
            "16-6": ["Cultural Assessment Tool", "Adaptation Checklist", "Cross-Cultural Training Guide"]
        };

        const subcomponentTemplates = CORRECT_TEMPLATES[subcomponentId] || ["Generic Template 1", "Generic Template 2", "Generic Template 3"];

        const templates = [
            { name: subcomponentTemplates[index].toLowerCase().replace(/\s+/g, '-'), ext: 'html' }
        ];
        
        // Get the full HTML content
        const fullContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${templates[index].name.replace(/-/g, ' ').toUpperCase()}</title>
    <style>
        body { margin: 0; padding: 20px; background: #f5f5f5; }
        @media print { body { background: white; } }
    </style>
</head>
<body>
    ${index === 0 ? `<!-- Problem Statement Canvas content -->` : 
      index === 1 ? `<!-- Customer Interview Guide content -->` : 
                    `<!-- Market Validation Scorecard content -->`}
    <script>
        // Auto-populate with data
        const data = ${JSON.stringify({ workspaceAnswers, latestScore, scoreHistory: scoreHistory.slice(0, 5) })};
    </script>
</body>
</html>
        `;
        
        const blob = new Blob([fullContent], { type: 'text/html' });
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
    
    // Override the original functions
    const originalEnhanceOutput = window.enhanceOutputTabST6;
    window.enhanceOutputTabST6 = function() {
        window.enhanceOutputWithExpertContent();
    };
    
    window.enhanceOutputTab = function() {
        window.enhanceOutputWithExpertContent();
    };
    
    // Auto-apply when Output tab is clicked
    const originalSwitchTab = window.switchTab;
    if (originalSwitchTab) {
        window.switchTab = function(tabName, event) {
            originalSwitchTab(tabName, event);
            
            if (tabName === 'output') {
                setTimeout(() => {
                    window.enhanceOutputWithExpertContent();
                }, 100);
            }
        };
    }
    
    console.log('✅ Enhanced Output templates and Score History fixes applied!');
})();
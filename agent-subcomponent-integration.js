// Agent-Subcomponent Integration
// Automatically loads agent-generated content when subcomponent pages are accessed

(function() {
    'use strict';
    
    console.log('🤖 Agent-Subcomponent Integration Loading...');
    
    // Load the agent integration system
    const loadAgentSystem = async () => {
        if (typeof AgentIntegrationSystem === 'undefined') {
            // Load the agent system if not already loaded
            const script = document.createElement('script');
            script.src = 'agent-integration-system.js';
            document.head.appendChild(script);
            
            // Wait for it to load
            await new Promise(resolve => {
                script.onload = resolve;
            });
        }
        
        return window.agentSystem || new window.AgentIntegrationSystem();
    };
    
    // Override the updateEducationTab function to use agent-generated content
    const enhanceEducationTab = async (subcomponentId) => {
        console.log(`🎓 Enhancing education tab with agent content for ${subcomponentId}`);
        
        const agentSystem = await loadAgentSystem();
        const agentContent = await agentSystem.processSubcomponent(subcomponentId);
        
        if (!agentContent) {
            console.error('No agent content generated');
            return;
        }
        
        // Update the education tab with agent-generated content
        const educationTab = document.getElementById('education-tab');
        if (!educationTab) return;
        
        let html = '';
        
        // Executive Summary Section
        if (agentContent.executiveSummary) {
            html += `
                <div class="education-section" style="background: linear-gradient(135deg, rgba(255, 85, 0, 0.1), rgba(255, 85, 0, 0.02)); border: 2px solid #FF5500;">
                    <h2 class="section-title">
                        <span class="section-icon">📊</span>
                        Executive Summary
                    </h2>
                    <div class="section-content">
                        <p style="font-size: 18px; line-height: 1.8; color: #fff;">${agentContent.executiveSummary.overview}</p>
                        
                        <h3 style="margin-top: 25px; color: #FF5500;">Key Objectives</h3>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin-top: 15px;">
                            ${agentContent.executiveSummary.keyObjectives.map(obj => `
                                <div style="background: rgba(0, 0, 0, 0.5); padding: 15px; border-radius: 8px; border-left: 3px solid #FF5500;">
                                    <h4 style="color: #FF5500; margin-bottom: 8px;">${obj.dimension}</h4>
                                    <p style="font-size: 14px; color: #ccc; margin-bottom: 5px;">${obj.description}</p>
                                    <span style="font-size: 12px; color: #FF5500;">Weight: ${obj.weight}%</span>
                                </div>
                            `).join('')}
                        </div>
                        
                        <h3 style="margin-top: 25px; color: #FF5500;">Success Criteria</h3>
                        <div style="margin-top: 15px;">
                            ${agentContent.executiveSummary.successCriteria.map(criteria => `
                                <div style="display: flex; align-items: center; padding: 10px; margin-bottom: 10px; background: rgba(255, 85, 0, 0.05); border-radius: 6px;">
                                    <span style="background: ${getScoreColor(criteria.scoreRange)}; color: #000; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-right: 15px;">
                                        ${criteria.level}
                                    </span>
                                    <span style="color: #888; margin-right: 15px; font-size: 14px;">${criteria.scoreRange}%</span>
                                    <span style="color: #ccc; font-size: 14px;">${criteria.description}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        }
        
        // What Section
        if (agentContent.education.what) {
            html += `
                <div class="education-section">
                    <h2 class="section-title">
                        <span class="section-icon">🎯</span>
                        What is ${agentContent.education.title}?
                    </h2>
                    <div class="section-content">
                        <p>${agentContent.education.what}</p>
                        
                        ${agentContent.education.metrics ? `
                            <h3 style="margin-top: 25px; color: #FF5500;">Key Metrics</h3>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 15px;">
                                ${agentContent.education.metrics.map(metric => `
                                    <div style="background: rgba(255, 85, 0, 0.05); padding: 15px; border-radius: 8px; border: 1px solid rgba(255, 85, 0, 0.2);">
                                        <h4 style="color: #FF5500; margin-bottom: 5px; font-size: 14px;">${metric.metric}</h4>
                                        <p style="font-size: 12px; color: #999; margin-bottom: 8px;">${metric.description}</p>
                                        <span style="background: rgba(255, 85, 0, 0.2); color: #FF5500; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 600;">
                                            ${metric.weight}
                                        </span>
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        }
        
        // Why Section
        if (agentContent.education.why) {
            html += `
                <div class="education-section">
                    <h2 class="section-title">
                        <span class="section-icon">💡</span>
                        Why It Matters
                    </h2>
                    <div class="section-content">
                        <p>${agentContent.education.why}</p>
                        
                        ${agentContent.executiveSummary.expectedOutcomes ? `
                            <h3 style="margin-top: 25px; color: #FF5500;">Expected Outcomes</h3>
                            <ul class="bullet-list">
                                ${agentContent.executiveSummary.expectedOutcomes.map(outcome => `
                                    <li>${outcome}</li>
                                `).join('')}
                            </ul>
                        ` : ''}
                    </div>
                </div>
            `;
        }
        
        // How Section
        if (agentContent.education.how) {
            html += `
                <div class="education-section">
                    <h2 class="section-title">
                        <span class="section-icon">🚀</span>
                        How to Implement
                    </h2>
                    <div class="section-content">
                        ${Array.isArray(agentContent.education.how) ? `
                            <div style="margin-top: 20px;">
                                ${agentContent.education.how.map((step, index) => `
                                    <div style="margin-bottom: 30px; padding: 20px; background: rgba(0, 0, 0, 0.3); border-radius: 10px; border-left: 4px solid #FF5500;">
                                        <div style="display: flex; align-items: center; margin-bottom: 15px;">
                                            <span style="background: #FF5500; color: #000; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px;">
                                                ${step.step || index + 1}
                                            </span>
                                            <h3 style="color: #fff; margin: 0;">${step.title}</h3>
                                        </div>
                                        <p style="color: #ccc; margin-bottom: 15px;">${step.description}</p>
                                        ${step.actions ? `
                                            <ul style="list-style: none; padding-left: 0;">
                                                ${step.actions.map(action => `
                                                    <li style="padding: 8px 0; color: #999; padding-left: 20px; position: relative;">
                                                        <span style="position: absolute; left: 0; color: #FF5500;">▸</span>
                                                        ${action}
                                                    </li>
                                                `).join('')}
                                            </ul>
                                        ` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        ` : `<div>${agentContent.education.how}</div>`}
                    </div>
                </div>
            `;
        }
        
        // Examples Section
        if (agentContent.education.examples && agentContent.education.examples.length > 0) {
            html += `
                <div class="education-section">
                    <h2 class="section-title">
                        <span class="section-icon">💼</span>
                        Real-World Examples
                    </h2>
                    <div class="section-content">
                        ${agentContent.education.examples.map(example => `
                            <div style="margin-bottom: 25px; padding: 20px; background: rgba(255, 85, 0, 0.03); border-radius: 10px; border: 1px solid rgba(255, 85, 0, 0.2);">
                                ${example.level ? `
                                    <span style="background: ${getScoreColor(example.level)}; color: #000; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; display: inline-block; margin-bottom: 10px;">
                                        ${example.level} Performance
                                    </span>
                                ` : ''}
                                <p style="color: #fff; margin-bottom: 10px;">${example.example || example}</p>
                                ${example.characteristics ? `
                                    <ul style="list-style: none; padding-left: 0; margin-top: 10px;">
                                        ${example.characteristics.map(char => `
                                            <li style="padding: 5px 0; color: #999; font-size: 14px;">
                                                <span style="color: #FF5500; margin-right: 8px;">✓</span>
                                                ${char}
                                            </li>
                                        `).join('')}
                                    </ul>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        // Best Practices Section
        if (agentContent.education.bestPractices && agentContent.education.bestPractices.length > 0) {
            html += `
                <div class="education-section">
                    <h2 class="section-title">
                        <span class="section-icon">⭐</span>
                        Best Practices
                    </h2>
                    <div class="section-content">
                        <div style="display: grid; gap: 20px;">
                            ${agentContent.education.bestPractices.map(practice => `
                                <div style="background: rgba(0, 0, 0, 0.4); padding: 20px; border-radius: 10px; border: 1px solid rgba(255, 85, 0, 0.2);">
                                    <h3 style="color: #FF5500; margin-bottom: 10px; font-size: 16px;">
                                        ${practice.dimension}
                                    </h3>
                                    <p style="color: #ccc; margin-bottom: 15px; font-size: 14px;">${practice.practice}</p>
                                    ${practice.tips ? `
                                        <ul style="list-style: none; padding-left: 0;">
                                            ${practice.tips.map(tip => `
                                                <li style="padding: 5px 0; color: #999; font-size: 13px; padding-left: 20px; position: relative;">
                                                    <span style="position: absolute; left: 0; color: #FF5500;">•</span>
                                                    ${tip}
                                                </li>
                                            `).join('')}
                                        </ul>
                                    ` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Agent Attribution
        html += `
            <div style="margin-top: 40px; padding: 20px; background: rgba(255, 85, 0, 0.05); border-radius: 10px; border: 1px solid rgba(255, 85, 0, 0.2); text-align: center;">
                <p style="color: #999; font-size: 14px;">
                    Content generated by <strong style="color: #FF5500;">${agentContent.agent}</strong>
                </p>
                <p style="color: #666; font-size: 12px; margin-top: 5px;">
                    ScaleOps6 AI Agent System • Block ${parseInt(subcomponentId.split('-')[0])} • Subcomponent ${subcomponentId}
                </p>
            </div>
        `;
        
        educationTab.innerHTML = html;
        
        // Trigger animation
        animateEducationContent();
    };
    
    // Helper function to get color based on score range
    function getScoreColor(range) {
        if (typeof range === 'string') {
            if (range.includes('91-100') || range === 'Exceptional') return '#4CAF50';
            if (range.includes('76-90') || range === 'Strong') return '#8BC34A';
            if (range.includes('51-75') || range === 'Good') return '#FFC107';
            if (range.includes('26-50') || range === 'Basic') return '#FF9800';
            return '#F44336';
        }
        return '#999';
    }
    
    // Animate education content
    function animateEducationContent() {
        const sections = document.querySelectorAll('.education-section');
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            setTimeout(() => {
                section.style.transition = 'all 0.5s ease';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    // Override workspace loading to use agent-generated questions
    const enhanceWorkspace = async (subcomponentId) => {
        console.log(`📝 Enhancing workspace with agent questions for ${subcomponentId}`);
        
        const agentSystem = await loadAgentSystem();
        const agent = agentSystem.agents[subcomponentId];
        
        if (!agent) {
            console.error('No agent found for workspace enhancement');
            return;
        }
        
        const questions = await agentSystem.generateWorkspaceQuestions(agent, subcomponentId);
        
        // Update the workspace container
        const container = document.getElementById('dynamic-worksheet-container');
        if (!container) return;
        
        let html = `
            <div class="worksheet-builder">
                <h3 style="color: #FF5500; margin-bottom: 20px;">
                    ${agent.name} Assessment
                </h3>
                <p style="color: #999; margin-bottom: 30px;">
                    ${agent.description}
                </p>
                
                <form id="agent-worksheet-form">
        `;
        
        questions.forEach(question => {
            html += `
                <div class="worksheet-field">
                    <label class="worksheet-label">
                        ${question.question}
                        ${question.required ? '<span style="color: #FF5500;">*</span>' : ''}
                    </label>
            `;
            
            if (question.type === 'scale') {
                html += `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        ${question.scale.map(value => `
                            <label style="display: flex; flex-direction: column; align-items: center; cursor: pointer;">
                                <input type="radio" name="${question.id}" value="${value}" style="margin-bottom: 5px;">
                                <span style="font-size: 12px; color: #999;">${value}%</span>
                            </label>
                        `).join('')}
                    </div>
                    <p style="font-size: 12px; color: #666; margin-top: 5px;">${question.description}</p>
                `;
            } else if (question.type === 'textarea') {
                html += `
                    <textarea 
                        class="worksheet-textarea" 
                        name="${question.id}" 
                        placeholder="${question.placeholder || ''}"
                        ${question.required ? 'required' : ''}
                    ></textarea>
                `;
            }
            
            html += `</div>`;
        });
        
        html += `
                    <div class="action-buttons" style="margin-top: 30px;">
                        <button type="submit" class="btn-primary">
                            Submit for Analysis
                        </button>
                        <button type="button" class="btn-secondary" onclick="saveWorksheetDraft()">
                            Save Draft
                        </button>
                    </div>
                </form>
            </div>
        `;
        
        container.innerHTML = html;
        
        // Add form submission handler
        const form = document.getElementById('agent-worksheet-form');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                await submitAgentWorksheet(subcomponentId, form);
            });
        }
    };
    
    // Submit worksheet for agent analysis
    async function submitAgentWorksheet(subcomponentId, form) {
        console.log(`🔍 Submitting worksheet for agent analysis: ${subcomponentId}`);
        
        const formData = new FormData(form);
        const answers = {};
        
        for (let [key, value] of formData.entries()) {
            answers[key] = value;
        }
        
        // Show loading state
        const analysisTab = document.getElementById('analysis-tab');
        if (analysisTab) {
            analysisTab.innerHTML = `
                <div style="text-align: center; padding: 60px 20px;">
                    <div style="font-size: 48px; margin-bottom: 20px; animation: pulse 1.5s infinite;">🤖</div>
                    <h3 style="font-size: 24px; margin-bottom: 10px; color: #FF5500;">Analyzing Your Responses...</h3>
                    <p style="font-size: 16px; color: #999;">Our AI agent is evaluating your submission</p>
                </div>
            `;
        }
        
        // Get agent system and analyze
        const agentSystem = await loadAgentSystem();
        const analysis = await agentSystem.analyzeWorkspaceAnswers(subcomponentId, answers);
        
        // Display analysis results
        displayAnalysisResults(analysis, subcomponentId);
        
        // Switch to analysis tab
        switchTab('analysis');
        
        // Process templates with the data
        const templates = agentSystem.agents[subcomponentId] ? 
            await agentSystem.generateResourceTemplates(agentSystem.agents[subcomponentId], subcomponentId) : [];
        
        if (templates.length > 0) {
            const outputs = await agentSystem.processTemplatesWithData(subcomponentId, analysis, templates);
            displayOutputResults(outputs);
        }
    }
    
    // Display analysis results
    function displayAnalysisResults(analysis, subcomponentId) {
        const analysisTab = document.getElementById('analysis-tab');
        if (!analysisTab) return;
        
        let html = `
            <div class="workspace-section">
                <h2 class="section-title">
                    <span class="section-icon">🤖</span>
                    AI Agent Analysis Results
                </h2>
                
                <div style="background: linear-gradient(135deg, rgba(255, 85, 0, 0.1), rgba(255, 85, 0, 0.02)); padding: 30px; border-radius: 15px; border: 2px solid #FF5500; margin-bottom: 30px;">
                    <div style="text-align: center;">
                        <div style="font-size: 72px; font-weight: bold; color: ${getScoreColor(`${analysis.totalScore}-${analysis.totalScore}`)}; margin-bottom: 10px;">
                            ${Math.round(analysis.totalScore)}%
                        </div>
                        <div style="font-size: 24px; color: #fff; margin-bottom: 5px;">
                            ${analysis.level} Performance
                        </div>
                        <div style="font-size: 14px; color: #999;">
                            Subcomponent ${subcomponentId} Assessment
                        </div>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 30px;">
                    ${analysis.dimensionScores.map(dim => `
                        <div style="background: rgba(0, 0, 0, 0.5); padding: 20px; border-radius: 10px; border-left: 4px solid ${getScoreColor(`${dim.score}-${dim.score}`)};">
                            <h3 style="color: #fff; margin-bottom: 10px; font-size: 16px;">${dim.dimension}</h3>
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                <span style="font-size: 32px; font-weight: bold; color: ${getScoreColor(`${dim.score}-${dim.score}`)};">
                                    ${Math.round(dim.score)}%
                                </span>
                                <span style="background: rgba(255, 85, 0, 0.2); color: #FF5500; padding: 4px 12px; border-radius: 20px; font-size: 12px;">
                                    Weight: ${dim.weight}%
                                </span>
                            </div>
                            <p style="font-size: 13px; color: #999; line-height: 1.5;">${dim.feedback}</p>
                        </div>
                    `).join('')}
                </div>
                
                ${analysis.strengths && analysis.strengths.length > 0 ? `
                    <div style="background: rgba(76, 175, 80, 0.1); padding: 20px; border-radius: 10px; border: 1px solid rgba(76, 175, 80, 0.3); margin-bottom: 20px;">
                        <h3 style="color: #4CAF50; margin-bottom: 15px;">
                            <span style="margin-right: 10px;">💪</span>
                            Key Strengths
                        </h3>
                        <ul style="list-style: none; padding-left: 0;">
                            ${analysis.strengths.map(strength => `
                                <li style="padding: 8px 0; color: #ccc;">
                                    <span style="color: #4CAF50; margin-right: 10px;">✓</span>
                                    ${strength}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                ${analysis.improvements && analysis.improvements.length > 0 ? `
                    <div style="background: rgba(255, 152, 0, 0.1); padding: 20px; border-radius: 10px; border: 1px solid rgba(255, 152, 0, 0.3); margin-bottom: 20px;">
                        <h3 style="color: #FF9800; margin-bottom: 15px;">
                            <span style="margin-right: 10px;">📈</span>
                            Areas for Improvement
                        </h3>
                        <div style="display: grid; gap: 15px;">
                            ${analysis.improvements.map(imp => `
                                <div style="background: rgba(0, 0, 0, 0.3); padding: 15px; border-radius: 8px;">
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                                        <h4 style="color: #fff; font-size: 14px;">${imp.dimension}</h4>
                                        <span style="background: ${imp.priority === 'Critical' ? '#F44336' : '#FF9800'}; color: #fff; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 600;">
                                            ${imp.priority}
                                        </span>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 10px;">
                                        <span style="color: #999; font-size: 13px;">Current: ${imp.currentScore}%</span>
                                        <span style="color: #666;">→</span>
                                        <span style="color: #4CAF50; font-size: 13px;">Target: ${imp.targetScore}%</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                
                ${analysis.recommendations && analysis.recommendations.length > 0 ? `
                    <div style="background: rgba(255, 85, 0, 0.05); padding: 20px; border-radius: 10px; border: 1px solid rgba(255, 85, 0, 0.2); margin-bottom: 20px;">
                        <h3 style="color: #FF5500; margin-bottom: 15px;">
                            <span style="margin-right: 10px;">💡</span>
                            Recommendations
                        </h3>
                        <div style="display: grid; gap: 15px;">
                            ${analysis.recommendations.map(rec => `
                                <div style="background: rgba(0, 0, 0, 0.4); padding: 15px; border-radius: 8px; border-left: 3px solid #FF5500;">
                                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                                        <h4 style="color: #fff; font-size: 14px; flex: 1;">${rec.action}</h4>
                                        <div style="display: flex; gap: 8px;">
                                            <span style="background: rgba(255, 85, 0, 0.2); color: #FF5500; padding: 2px 8px; border-radius: 12px; font-size: 11px;">
                                                ${rec.impact}
                                            </span>
                                            <span style="background: rgba(255, 85, 0, 0.2); color: #FF5500; padding: 2px 8px; border-radius: 12px; font-size: 11px;">
                                                ${rec.timeframe}
                                            </span>
                                        </div>
                                    </div>
                                    <p style="color: #999; font-size: 13px;">Focus: ${rec.dimension}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                
                ${analysis.nextSteps && analysis.nextSteps.length > 0 ? `
                    <div style="background: rgba(0, 0, 0, 0.5); padding: 20px; border-radius: 10px; border: 1px solid rgba(255, 255, 255, 0.1);">
                        <h3 style="color: #fff; margin-bottom: 15px;">
                            <span style="margin-right: 10px;">🎯</span>
                            Next Steps
                        </h3>
                        <ol style="padding-left: 20px;">
                            ${analysis.nextSteps.map(step => `
                                <li style="padding: 8px 0; color: #ccc;">${step}</li>
                            `).join('')}
                        </ol>
                    </div>
                ` : ''}
            </div>
        `;
        
        analysisTab.innerHTML = html;
    }
    
    // Display output results
    function displayOutputResults(outputs) {
        const outputTab = document.getElementById('output-tab');
        if (!outputTab || !outputs) return;
        
        let html = `
            <div class="workspace-section">
                <h2 class="section-title">
                    <span class="section-icon">📋</span>
                    Generated Outputs
                </h2>
                
                <div style="display: grid; gap: 20px;">
                    ${outputs.map(output => `
                        <div style="background: rgba(0, 0, 0, 0.5); padding: 25px; border-radius: 10px; border: 1px solid rgba(255, 255, 255, 0.1);">
                            <h3 style="color: #FF5500; margin-bottom: 20px;">${output.templateName}</h3>
                            <div style="font-size: 12px; color: #666; margin-bottom: 20px;">
                                Generated: ${new Date(output.generatedAt).toLocaleString()}
                            </div>
                            
                            ${output.sections.map(section => `
                                <div style="margin-bottom: 20px;">
                                    <h4 style="color: #fff; margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid rgba(255, 85, 0, 0.2);">
                                        ${section.title}
                                    </h4>
                                    <div style="color: #ccc; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
                                        ${section.content}
                                    </div>
                                </div>
                            `).join('')}
                            
                            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                                <button class="btn-primary" style="margin-right: 10px;" onclick="downloadOutput('${output.templateName}')">
                                    Download PDF
                                </button>
                                <button class="btn-secondary" onclick="shareOutput('${output.templateName}')">
                                    Share
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        outputTab.innerHTML = html;
    }
    
    // Initialize on page load
    document.addEventListener('DOMContentLoaded', async () => {
        // Get subcomponent ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id');
        
        if (subcomponentId) {
            console.log(`🚀 Initializing agent integration for subcomponent ${subcomponentId}`);
            
            // Enhance education tab with agent content
            await enhanceEducationTab(subcomponentId);
            
            // Enhance workspace with agent questions
            await enhanceWorkspace(subcomponentId);
            
            // Update resources tab with agent templates
            const agentSystem = await loadAgentSystem();
            const agent = agentSystem.agents[subcomponentId];
            if (agent) {
                const templates = await agentSystem.generateResourceTemplates(agent, subcomponentId);
                updateResourcesTab(templates);
            }
        }
    });
    
    // Update resources tab with templates
    function updateResourcesTab(templates) {
        const templatesContainer = document.getElementById('resource-templates');
        if (!templatesContainer || !templates) return;
        
        templatesContainer.innerHTML = templates.map(template => `
            <div class="template-item">
                <div class="template-content">
                    <div class="template-icon">📄</div>
                    <div style="flex: 1;">
                        <h4 class="template-name">${template.name}</h4>
                        <p style="font-size: 13px; color: #999; margin-top: 4px;">${template.description}</p>
                        <span style="background: rgba(255, 85, 0, 0.1); color: #FF5500; padding: 2px 8px; border-radius: 12px; font-size: 11px; margin-top: 8px; display: inline-block;">
                            ${template.type}
                        </span>
                    </div>
                </div>
                <button class="template-action" onclick="useTemplate('${template.name}')">
                    Use Template
                </button>
            </div>
        `).join('');
    }
    
    // Global functions for buttons
    window.downloadOutput = function(templateName) {
        console.log(`Downloading output: ${templateName}`);
        alert(`Downloading ${templateName} as PDF...`);
    };
    
    window.shareOutput = function(templateName) {
        console.log(`Sharing output: ${templateName}`);
        alert(`Sharing ${templateName}...`);
    };
    
    window.useTemplate = function(templateName) {
        console.log(`Using template: ${templateName}`);
        alert(`Loading ${templateName} template...`);
    };
    
    window.saveWorksheetDraft = function() {
        console.log('Saving worksheet draft...');
        alert('Draft saved successfully!');
    };
    
    // Make tab switching available globally
    window.switchTab = function(tabName) {
        const event = new Event('click');
        const button = document.querySelector(`.tab-button[data-tab="${tabName}"]`);
        if (button) {
            button.click();
        }
    };
    
    console.log('✅ Agent-Subcomponent Integration Loaded Successfully');
})();
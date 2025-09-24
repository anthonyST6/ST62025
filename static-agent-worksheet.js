/**
 * Static Agent Worksheet System
 * Uses pre-generated agent questions for instant loading
 * No dynamic generation - questions are hardcoded but agent-created
 */

class StaticAgentWorksheet {
    constructor() {
        this.currentSubcomponentId = null;
        this.responses = {};
        this.autoSaveInterval = null;
    }

    displayWorksheet(subcomponentId) {
        console.log(`📋 Loading agent-generated worksheet for ${subcomponentId}`);
        
        // Skip Problem Statement (1-1) as it has its own implementation
        if (subcomponentId === '1-1') {
            console.log('📌 Problem Statement uses original implementation');
            return false;
        }

        // Get pre-generated questions from the library
        const worksheetData = window.agentGeneratedQuestions?.[subcomponentId];
        
        if (!worksheetData) {
            console.log(`⚠️ No agent questions found for ${subcomponentId}, using fallback`);
            this.displayFallbackWorksheet(subcomponentId);
            return false;
        }

        this.currentSubcomponentId = subcomponentId;
        
        // Display the worksheet immediately
        const workspaceContent = document.getElementById('workspace-content');
        if (!workspaceContent) {
            console.error('❌ Workspace content element not found');
            return false;
        }

        const worksheetHTML = `
            <div class="agent-static-worksheet">
                <div class="worksheet-header">
                    <h3>📋 ${worksheetData.domain} Assessment</h3>
                    <p class="worksheet-instructions">
                        Complete the following questions to assess your ${worksheetData.domain.toLowerCase()} readiness.
                        <span class="required-note">* Required questions</span>
                    </p>
                </div>
                
                <div class="questions-container">
                    ${worksheetData.questions.map(q => this.renderQuestion(q)).join('')}
                </div>
                
                <div class="worksheet-actions">
                    <button class="save-btn" onclick="staticAgentWorksheet.saveProgress()">
                        💾 Save Progress
                    </button>
                    <button class="analyze-btn" onclick="staticAgentWorksheet.analyzeResponses()">
                        🔍 Analyze Responses
                    </button>
                </div>
                
                <div class="auto-save-status" id="auto-save-status">
                    Auto-save: <span class="status">Active</span>
                </div>
            </div>
        `;

        workspaceContent.innerHTML = worksheetHTML;
        
        // Load any saved responses
        this.loadSavedResponses();
        
        // Attach event listeners
        this.attachEventListeners();
        
        // Start auto-save
        this.startAutoSave();
        
        console.log(`✅ Loaded ${worksheetData.questions.length} agent-generated questions`);
        return true;
    }

    renderQuestion(question) {
        const requiredMark = question.required ? '<span class="required">*</span>' : '';
        
        return `
            <div class="question-block" data-question-id="${question.id}">
                <div class="question-header">
                    <label for="${question.id}" class="question-label">
                        ${requiredMark} ${question.text}
                    </label>
                    <span class="question-type ${question.type}">${question.type}</span>
                </div>
                
                <div class="question-hint">
                    💡 <em>${question.hint}</em>
                </div>
                
                <textarea 
                    class="answer-input"
                    id="${question.id}"
                    placeholder="Enter your response here..."
                    data-min="${question.minLength}"
                    data-max="${question.maxLength}"
                    ${question.required ? 'data-required="true"' : ''}
                >${this.responses[question.id] || ''}</textarea>
                
                <div class="answer-meta">
                    <span class="char-count" data-for="${question.id}">
                        0 / ${question.maxLength} characters
                    </span>
                    <span class="min-requirement">
                        (Minimum: ${question.minLength})
                    </span>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        document.querySelectorAll('.answer-input').forEach(textarea => {
            // Update character count on input
            textarea.addEventListener('input', (e) => {
                this.updateCharCount(e.target);
                this.responses[e.target.id] = e.target.value;
            });
            
            // Initialize character count
            this.updateCharCount(textarea);
        });
    }

    updateCharCount(textarea) {
        const charCount = document.querySelector(`[data-for="${textarea.id}"]`);
        if (!charCount) return;
        
        const current = textarea.value.length;
        const min = parseInt(textarea.dataset.min) || 100;
        const max = parseInt(textarea.dataset.max) || 1000;
        
        charCount.textContent = `${current} / ${max} characters`;
        
        // Update color based on length
        if (current < min) {
            charCount.style.color = '#ff6b6b';
            textarea.style.borderColor = '#ff6b6b';
        } else if (current > max * 0.9) {
            charCount.style.color = '#ffa500';
            textarea.style.borderColor = '#ffa500';
        } else {
            charCount.style.color = '#4caf50';
            textarea.style.borderColor = '#4caf50';
        }
    }

    startAutoSave() {
        // Clear any existing interval
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
        }
        
        // Auto-save every 30 seconds
        this.autoSaveInterval = setInterval(() => {
            this.saveProgress(true);
        }, 30000);
    }

    saveProgress(isAutoSave = false) {
        if (!this.currentSubcomponentId) return;
        
        const saveData = {
            subcomponentId: this.currentSubcomponentId,
            responses: this.responses,
            timestamp: new Date().toISOString()
        };
        
        // Save to localStorage
        localStorage.setItem(`agent_worksheet_${this.currentSubcomponentId}`, JSON.stringify(saveData));
        
        // Update status indicator
        const statusEl = document.querySelector('#auto-save-status .status');
        if (statusEl) {
            statusEl.textContent = isAutoSave ? 'Auto-saved' : 'Saved';
            statusEl.style.color = '#4caf50';
            
            setTimeout(() => {
                statusEl.textContent = 'Active';
                statusEl.style.color = '';
            }, 2000);
        }
        
        console.log(`✅ ${isAutoSave ? 'Auto-saved' : 'Saved'} worksheet progress`);
    }

    loadSavedResponses() {
        if (!this.currentSubcomponentId) return;
        
        const saved = localStorage.getItem(`agent_worksheet_${this.currentSubcomponentId}`);
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.responses = data.responses || {};
                
                // Populate textareas with saved responses
                Object.entries(this.responses).forEach(([questionId, answer]) => {
                    const textarea = document.getElementById(questionId);
                    if (textarea) {
                        textarea.value = answer;
                        this.updateCharCount(textarea);
                    }
                });
                
                console.log('✅ Loaded saved responses');
            } catch (e) {
                console.error('Error loading saved responses:', e);
            }
        }
    }

    analyzeResponses() {
        if (!this.currentSubcomponentId) return;
        
        const worksheetData = window.agentGeneratedQuestions?.[this.currentSubcomponentId];
        if (!worksheetData) return;
        
        // Validate required fields
        const missingRequired = [];
        worksheetData.questions.forEach(q => {
            if (q.required) {
                const answer = this.responses[q.id] || '';
                if (answer.length < q.minLength) {
                    missingRequired.push(q.text.substring(0, 50) + '...');
                }
            }
        });
        
        if (missingRequired.length > 0) {
            alert(`Please complete required questions:\n\n${missingRequired.join('\n')}`);
            return;
        }
        
        // Calculate basic score
        let totalScore = 0;
        let questionCount = 0;
        
        worksheetData.questions.forEach(q => {
            const answer = this.responses[q.id] || '';
            if (answer.length > 0) {
                // Simple scoring based on completeness
                const minLength = q.minLength || 100;
                const completeness = Math.min(answer.length / minLength, 1);
                const questionScore = completeness * 100;
                
                totalScore += questionScore * (q.required ? 1.5 : 1);
                questionCount += (q.required ? 1.5 : 1);
            }
        });
        
        const finalScore = questionCount > 0 ? Math.round(totalScore / questionCount) : 0;
        
        // Display analysis in the Analysis tab
        this.displayAnalysis(finalScore, worksheetData);
        
        // Switch to Analysis tab
        const analysisTab = document.querySelector('[data-tab="analysis"]');
        if (analysisTab) {
            analysisTab.click();
        }
    }

    displayAnalysis(score, worksheetData) {
        const analysisContent = document.getElementById('analysis-content');
        if (!analysisContent) return;
        
        const getScoreClass = (score) => {
            if (score >= 90) return 'excellent';
            if (score >= 70) return 'good';
            if (score >= 50) return 'adequate';
            return 'needs-improvement';
        };
        
        const analysisHTML = `
            <div class="agent-analysis-results">
                <div class="analysis-header">
                    <h3>📊 ${worksheetData.domain} Assessment Results</h3>
                    <div class="score-display ${getScoreClass(score)}">
                        <span class="score-value">${score}%</span>
                        <span class="score-label">Overall Score</span>
                    </div>
                </div>
                
                <div class="analysis-summary">
                    <h4>Summary</h4>
                    <p>Based on your responses to ${worksheetData.questions.length} assessment questions, 
                    your ${worksheetData.domain} readiness score is ${score}%.</p>
                </div>
                
                <div class="question-scores">
                    <h4>Question-by-Question Analysis</h4>
                    ${worksheetData.questions.map(q => {
                        const answer = this.responses[q.id] || '';
                        const answerLength = answer.length;
                        const minLength = q.minLength || 100;
                        const completeness = answerLength > 0 ? Math.min(answerLength / minLength * 100, 100) : 0;
                        
                        return `
                            <div class="question-score-item">
                                <div class="question-text">${q.text}</div>
                                <div class="completeness-bar">
                                    <div class="completeness-fill ${getScoreClass(completeness)}" 
                                         style="width: ${completeness}%"></div>
                                </div>
                                <span class="completeness-label">${Math.round(completeness)}% complete</span>
                            </div>
                        `;
                    }).join('')}
                </div>
                
                <div class="recommendations">
                    <h4>Recommendations</h4>
                    <ul>
                        ${score < 50 ? '<li>Focus on completing all required questions with detailed responses</li>' : ''}
                        ${score < 70 ? '<li>Provide more specific examples and metrics in your answers</li>' : ''}
                        ${score < 90 ? '<li>Consider adding validation evidence to strengthen your responses</li>' : ''}
                        ${score >= 90 ? '<li>Excellent work! Consider documenting these insights for your team</li>' : ''}
                        <li>Review questions marked as "diagnostic" to identify improvement areas</li>
                        <li>Use "quantitative" questions to establish measurable goals</li>
                    </ul>
                </div>
                
                <div class="analysis-actions">
                    <button onclick="staticAgentWorksheet.exportAnalysis()">
                        📄 Export Report
                    </button>
                    <button onclick="window.print()">
                        🖨️ Print Analysis
                    </button>
                </div>
            </div>
        `;
        
        analysisContent.innerHTML = analysisHTML;
    }

    displayFallbackWorksheet(subcomponentId) {
        // Fallback for subcomponents without pre-generated questions
        const workspaceContent = document.getElementById('workspace-content');
        if (!workspaceContent) return;
        
        workspaceContent.innerHTML = `
            <div class="fallback-worksheet">
                <h3>📋 Assessment Worksheet</h3>
                <p>Agent-generated questions are being prepared for this subcomponent.</p>
                <p>Please check back soon or contact support for assistance.</p>
            </div>
        `;
    }

    exportAnalysis() {
        // Simple export to JSON
        const exportData = {
            subcomponentId: this.currentSubcomponentId,
            responses: this.responses,
            timestamp: new Date().toISOString(),
            domain: window.agentGeneratedQuestions?.[this.currentSubcomponentId]?.domain
        };
        
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `assessment_${this.currentSubcomponentId}_${Date.now()}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }

    cleanup() {
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
            this.autoSaveInterval = null;
        }
    }
}

// Initialize global instance
window.staticAgentWorksheet = new StaticAgentWorksheet();

// Add styles
if (!document.getElementById('static-agent-worksheet-styles')) {
    const styles = `
        <style id="static-agent-worksheet-styles">
            .agent-static-worksheet {
                padding: 20px;
                max-width: 900px;
                margin: 0 auto;
            }
            
            .worksheet-header {
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 2px solid #333;
            }
            
            .worksheet-header h3 {
                color: #ff6b35;
                font-size: 24px;
                margin-bottom: 10px;
            }
            
            .worksheet-instructions {
                color: #999;
                font-size: 14px;
            }
            
            .required-note {
                color: #ff6b35;
                font-weight: 500;
            }
            
            .question-block {
                background: #1a1a1a;
                border: 1px solid #333;
                border-radius: 8px;
                padding: 20px;
                margin-bottom: 20px;
                transition: all 0.3s ease;
            }
            
            .question-block:hover {
                border-color: #444;
            }
            
            .question-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 10px;
            }
            
            .question-label {
                color: #fff;
                font-size: 16px;
                font-weight: 500;
                flex: 1;
                padding-right: 20px;
            }
            
            .required {
                color: #ff6b35;
                font-weight: bold;
            }
            
            .question-type {
                padding: 4px 12px;
                border-radius: 4px;
                font-size: 11px;
                text-transform: uppercase;
                font-weight: 600;
                white-space: nowrap;
            }
            
            .question-type.diagnostic {
                background: #2a3f5f;
                color: #5090d3;
            }
            
            .question-type.quantitative {
                background: #2f4b2f;
                color: #6fbf73;
            }
            
            .question-type.strategic {
                background: #4a3c28;
                color: #ffa726;
            }
            
            .question-type.validation {
                background: #3e2f47;
                color: #ba68c8;
            }
            
            .question-type.comparative {
                background: #47382f;
                color: #ff7043;
            }
            
            .question-hint {
                color: #888;
                font-size: 13px;
                margin-bottom: 15px;
                padding: 10px;
                background: #0a0a0a;
                border-radius: 4px;
                border-left: 3px solid #ff6b35;
            }
            
            .answer-input {
                width: 100%;
                min-height: 120px;
                background: #0a0a0a;
                border: 2px solid #333;
                color: #fff;
                padding: 12px;
                border-radius: 4px;
                font-size: 14px;
                resize: vertical;
                transition: border-color 0.3s ease;
            }
            
            .answer-input:focus {
                outline: none;
                border-color: #ff6b35;
                background: #0f0f0f;
            }
            
            .answer-meta {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 10px;
                font-size: 12px;
            }
            
            .char-count {
                font-weight: 600;
                transition: color 0.3s ease;
            }
            
            .min-requirement {
                color: #666;
            }
            
            .worksheet-actions {
                display: flex;
                gap: 15px;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #333;
            }
            
            .worksheet-actions button {
                padding: 12px 24px;
                border-radius: 4px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                border: none;
            }
            
            .save-btn {
                background: #333;
                color: #fff;
            }
            
            .save-btn:hover {
                background: #444;
            }
            
            .analyze-btn {
                background: #ff6b35;
                color: #000;
            }
            
            .analyze-btn:hover {
                background: #ff8c42;
                transform: translateY(-2px);
            }
            
            .auto-save-status {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: #1a1a1a;
                border: 1px solid #333;
                padding: 10px 15px;
                border-radius: 4px;
                font-size: 12px;
                color: #999;
            }
            
            .auto-save-status .status {
                color: #4caf50;
                font-weight: 600;
            }
            
            /* Analysis Styles */
            .agent-analysis-results {
                padding: 20px;
                max-width: 900px;
                margin: 0 auto;
            }
            
            .analysis-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 2px solid #333;
            }
            
            .score-display {
                text-align: center;
                padding: 20px 30px;
                border-radius: 8px;
                min-width: 150px;
            }
            
            .score-display.excellent {
                background: linear-gradient(135deg, #4caf50, #45a049);
            }
            
            .score-display.good {
                background: linear-gradient(135deg, #2196f3, #1976d2);
            }
            
            .score-display.adequate {
                background: linear-gradient(135deg, #ffa500, #ff8c00);
            }
            
            .score-display.needs-improvement {
                background: linear-gradient(135deg, #ff6b6b, #ff5252);
            }
            
            .score-value {
                display: block;
                font-size: 36px;
                font-weight: bold;
                color: #fff;
            }
            
            .score-label {
                display: block;
                font-size: 12px;
                color: rgba(255,255,255,0.9);
                margin-top: 5px;
            }
            
            .analysis-summary {
                background: #1a1a1a;
                border: 1px solid #333;
                border-radius: 8px;
                padding: 20px;
                margin-bottom: 20px;
            }
            
            .question-scores {
                background: #1a1a1a;
                border: 1px solid #333;
                border-radius: 8px;
                padding: 20px;
                margin-bottom: 20px;
            }
            
            .question-score-item {
                margin-bottom: 15px;
                padding-bottom: 15px;
                border-bottom: 1px solid #2a2a2a;
            }
            
            .question-score-item:last-child {
                border-bottom: none;
            }
            
            .question-text {
                color: #999;
                font-size: 14px;
                margin-bottom: 8px;
            }
            
            .completeness-bar {
                height: 20px;
                background: #0a0a0a;
                border-radius: 10px;
                overflow: hidden;
                margin-bottom: 5px;
            }
            
            .completeness-fill {
                height: 100%;
                transition: width 0.5s ease;
            }
            
            .completeness-fill.excellent {
                background: #4caf50;
            }
            
            .completeness-fill.good {
                background: #2196f3;
            }
            
            .completeness-fill.adequate {
                background: #ffa500;
            }
            
            .completeness-fill.needs-improvement {
                background: #ff6b6b;
            }
            
            .completeness-label {
                font-size: 12px;
                color: #666;
            }
            
            .recommendations {
                background: #1a1a1a;
                border: 1px solid #333;
                border-radius: 8px;
                padding: 20px;
                margin-bottom: 20px;
            }
            
            .recommendations ul {
                margin: 10px 0;
                padding-left: 20px;
            }
            
            .recommendations li {
                color: #ccc;
                margin-bottom: 8px;
            }
            
            .analysis-actions {
                display: flex;
                gap: 15px;
                margin-top: 20px;
            }
            
            .analysis-actions button {
                padding: 10px 20px;
                border-radius: 4px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                border: 1px solid #333;
                background: #1a1a1a;
                color: #fff;
            }
            
            .analysis-actions button:hover {
                background: #2a2a2a;
                border-color: #ff6b35;
            }
        </style>
    `;
    document.head.insertAdjacentHTML('beforeend', styles);
}
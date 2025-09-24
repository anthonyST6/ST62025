/**
 * Agent Worksheet Integration
 * Connects the agent-based question generator to the worksheet UI
 * Handles display, response collection, and analysis
 */

class AgentWorksheetIntegration {
    constructor() {
        this.generator = new AgentQuestionGenerator();
        this.currentWorksheet = null;
        this.responses = {};
        this.autoSaveInterval = null;
    }

    async initializeWorksheet(subcomponentId) {
        console.log(`🤖 Initializing agent-based worksheet for ${subcomponentId}`);
        
        // Skip Problem Statement (1-1) as it has its own implementation
        if (subcomponentId === '1-1') {
            console.log('📌 Skipping Problem Statement - using existing implementation');
            return;
        }

        try {
            // Load educational content for context
            const educationalContent = await this.loadEducationalContent();
            
            // Generate questions using the agent
            this.currentWorksheet = this.generator.generateQuestions(subcomponentId, educationalContent);
            
            // Display the worksheet
            this.displayWorksheet();
            
            // Load any saved responses
            this.loadSavedResponses();
            
            // Start auto-save
            this.startAutoSave();
            
            console.log(`✅ Agent worksheet initialized with ${this.currentWorksheet.questions.length} questions`);
        } catch (error) {
            console.error('❌ Error initializing agent worksheet:', error);
            this.displayError('Failed to generate worksheet questions. Please try again.');
        }
    }

    async loadEducationalContent() {
        // This would load from the educational content system
        // For now, return mock data
        return window.educationalContent || {};
    }

    displayWorksheet() {
        const workspaceContent = document.getElementById('workspace-content');
        if (!workspaceContent) {
            console.error('❌ Workspace content element not found');
            return;
        }

        const worksheetHTML = `
            <div class="agent-worksheet">
                <div class="worksheet-header">
                    <h3>📋 ${this.currentWorksheet.domain} Assessment</h3>
                    <p class="worksheet-instructions">
                        Complete the following questions to assess your ${this.currentWorksheet.domain.toLowerCase()} readiness.
                        Required questions are marked with an asterisk (*).
                    </p>
                </div>
                
                <div class="questions-container">
                    ${this.currentWorksheet.questions.map(q => this.renderQuestion(q)).join('')}
                </div>
                
                <div class="worksheet-actions">
                    <button class="save-progress-btn" onclick="window.agentWorksheet.saveProgress()">
                        💾 Save Progress
                    </button>
                    <button class="analyze-btn" onclick="window.agentWorksheet.analyzeResponses()">
                        🔍 Analyze Responses
                    </button>
                    <button class="export-btn" onclick="window.agentWorksheet.exportResponses()">
                        📄 Export as PDF
                    </button>
                </div>
                
                <div class="auto-save-indicator" id="auto-save-indicator">
                    <span class="save-status">Auto-save enabled</span>
                </div>
            </div>
        `;

        workspaceContent.innerHTML = worksheetHTML;
        this.attachEventListeners();
        this.applyStyles();
    }

    renderQuestion(question) {
        const requiredMark = question.required ? '<span class="required">*</span>' : '';
        
        return `
            <div class="question-block" data-question-id="${question.id}">
                <div class="question-header">
                    <label class="question-label">
                        ${requiredMark} ${question.text}
                    </label>
                    <span class="question-type">${question.type}</span>
                </div>
                
                <div class="question-hint">
                    💡 ${question.hint}
                </div>
                
                <div class="answer-section">
                    <textarea 
                        class="answer-input"
                        id="${question.id}"
                        placeholder="Enter your response here..."
                        minlength="${question.minLength}"
                        maxlength="${question.maxLength}"
                        ${question.required ? 'required' : ''}
                    ></textarea>
                    
                    <div class="answer-meta">
                        <span class="char-count">0 / ${question.maxLength}</span>
                        <button class="show-example-btn" onclick="window.agentWorksheet.toggleExample('${question.id}')">
                            📖 Show Example
                        </button>
                    </div>
                </div>
                
                <div class="example-section" id="example-${question.id}" style="display: none;">
                    <div class="example-good">
                        <strong>✅ Good Example:</strong>
                        <p>${question.exampleAnswer.good}</p>
                    </div>
                    <div class="example-poor">
                        <strong>❌ Poor Example:</strong>
                        <p>${question.exampleAnswer.poor}</p>
                    </div>
                </div>
                
                <div class="scoring-rubric" id="rubric-${question.id}" style="display: none;">
                    ${this.renderScoringRubric(question.scoringRubric)}
                </div>
            </div>
        `;
    }

    renderScoringRubric(rubric) {
        return `
            <div class="rubric-container">
                <h4>Scoring Criteria</h4>
                ${Object.entries(rubric).map(([level, details]) => `
                    <div class="rubric-level ${level}">
                        <strong>${level.charAt(0).toUpperCase() + level.slice(1)} (${details.score}%):</strong>
                        <ul>
                            ${details.criteria.map(c => `<li>${c}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
        `;
    }

    attachEventListeners() {
        // Attach character counting
        document.querySelectorAll('.answer-input').forEach(textarea => {
            textarea.addEventListener('input', (e) => {
                this.updateCharCount(e.target);
                this.responses[e.target.id] = e.target.value;
            });
        });
    }

    updateCharCount(textarea) {
        const charCount = textarea.parentElement.querySelector('.char-count');
        if (charCount) {
            const current = textarea.value.length;
            const max = textarea.maxLength;
            charCount.textContent = `${current} / ${max}`;
            
            // Color coding
            if (current < textarea.minLength) {
                charCount.style.color = '#ff6b6b';
            } else if (current > max * 0.9) {
                charCount.style.color = '#ffa500';
            } else {
                charCount.style.color = '#4caf50';
            }
        }
    }

    toggleExample(questionId) {
        const exampleSection = document.getElementById(`example-${questionId}`);
        if (exampleSection) {
            exampleSection.style.display = exampleSection.style.display === 'none' ? 'block' : 'none';
        }
    }

    startAutoSave() {
        // Auto-save every 30 seconds
        this.autoSaveInterval = setInterval(() => {
            this.saveProgress(true);
        }, 30000);
    }

    stopAutoSave() {
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
            this.autoSaveInterval = null;
        }
    }

    async saveProgress(isAutoSave = false) {
        try {
            // Save to localStorage
            const saveData = {
                subcomponentId: this.currentWorksheet.subcomponentId,
                responses: this.responses,
                timestamp: new Date().toISOString()
            };
            
            localStorage.setItem(`worksheet_${this.currentWorksheet.subcomponentId}`, JSON.stringify(saveData));
            
            // Save to database
            await this.saveToDatabase(saveData);
            
            // Update indicator
            this.updateSaveIndicator(isAutoSave ? 'Auto-saved' : 'Saved successfully');
            
            console.log(`✅ ${isAutoSave ? 'Auto-saved' : 'Saved'} worksheet progress`);
        } catch (error) {
            console.error('❌ Error saving progress:', error);
            this.updateSaveIndicator('Save failed', true);
        }
    }

    async saveToDatabase(data) {
        // This would integrate with your backend
        // For now, we'll use the existing API structure
        try {
            const response = await fetch('/api/worksheet/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error('Failed to save to database');
            }
        } catch (error) {
            console.warn('Database save failed, using local storage only');
        }
    }

    loadSavedResponses() {
        try {
            const saved = localStorage.getItem(`worksheet_${this.currentWorksheet.subcomponentId}`);
            if (saved) {
                const data = JSON.parse(saved);
                this.responses = data.responses || {};
                
                // Populate textareas
                Object.entries(this.responses).forEach(([questionId, answer]) => {
                    const textarea = document.getElementById(questionId);
                    if (textarea) {
                        textarea.value = answer;
                        this.updateCharCount(textarea);
                    }
                });
                
                console.log('✅ Loaded saved responses');
            }
        } catch (error) {
            console.error('❌ Error loading saved responses:', error);
        }
    }

    async analyzeResponses() {
        // Validate required fields
        const missingRequired = this.validateRequiredFields();
        if (missingRequired.length > 0) {
            alert(`Please complete required fields: ${missingRequired.join(', ')}`);
            return;
        }

        try {
            // Show loading state
            this.showAnalysisLoading();
            
            // Generate analysis using the agent
            const analysis = this.generator.generateAnalysis(this.currentWorksheet, this.responses);
            
            // Display analysis in the Analysis tab
            this.displayAnalysis(analysis);
            
            // Save the analysis
            await this.saveAnalysis(analysis);
            
            // Switch to Analysis tab
            this.switchToAnalysisTab();
            
            console.log('✅ Analysis complete');
        } catch (error) {
            console.error('❌ Error analyzing responses:', error);
            this.displayError('Failed to analyze responses. Please try again.');
        }
    }

    validateRequiredFields() {
        const missing = [];
        this.currentWorksheet.questions.forEach(q => {
            if (q.required && (!this.responses[q.id] || this.responses[q.id].trim().length < q.minLength)) {
                missing.push(q.focusArea);
            }
        });
        return missing;
    }

    showAnalysisLoading() {
        const analysisContent = document.getElementById('analysis-content');
        if (analysisContent) {
            analysisContent.innerHTML = `
                <div class="analysis-loading">
                    <div class="spinner"></div>
                    <p>Analyzing your responses...</p>
                </div>
            `;
        }
    }

    displayAnalysis(analysis) {
        const analysisContent = document.getElementById('analysis-content');
        if (!analysisContent) return;

        const analysisHTML = `
            <div class="agent-analysis">
                <div class="analysis-header">
                    <h3>📊 Assessment Analysis</h3>
                    <div class="overall-score ${this.getScoreClass(analysis.overallScore)}">
                        <span class="score-value">${analysis.overallScore}</span>
                        <span class="score-label">Overall Score</span>
                    </div>
                </div>
                
                <div class="analysis-sections">
                    <div class="strengths-section">
                        <h4>💪 Strengths</h4>
                        <ul>
                            ${analysis.strengths.map(s => `<li>${s}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="weaknesses-section">
                        <h4>⚠️ Areas for Improvement</h4>
                        <ul>
                            ${analysis.weaknesses.map(w => `<li>${w}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="recommendations-section">
                        <h4>🎯 Recommendations</h4>
                        ${analysis.recommendations.map(r => `
                            <div class="recommendation ${r.priority}-priority">
                                <span class="priority-badge">${r.priority}</span>
                                <p>${r.action}</p>
                                <span class="timeline">Timeline: ${r.timeline}</span>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="detailed-feedback-section">
                        <h4>📝 Question-by-Question Feedback</h4>
                        ${this.renderDetailedFeedback(analysis.detailedFeedback)}
                    </div>
                </div>
                
                <div class="analysis-actions">
                    <button onclick="window.agentWorksheet.exportAnalysis()">
                        📄 Export Analysis
                    </button>
                    <button onclick="window.agentWorksheet.scheduleFollowUp()">
                        📅 Schedule Follow-up
                    </button>
                </div>
            </div>
        `;

        analysisContent.innerHTML = analysisHTML;
    }

    renderDetailedFeedback(feedback) {
        return Object.entries(feedback).map(([questionId, details]) => {
            const question = this.currentWorksheet.questions.find(q => q.id === questionId);
            return `
                <div class="feedback-item">
                    <div class="feedback-question">${question.text}</div>
                    <div class="feedback-score ${this.getScoreClass(details.score)}">
                        Score: ${details.score}%
                    </div>
                    <div class="feedback-text">${details.feedback.feedback}</div>
                    ${details.feedback.improvement ? `
                        <div class="feedback-improvement">
                            💡 ${details.feedback.improvement}
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');
    }

    getScoreClass(score) {
        if (score >= 90) return 'excellent';
        if (score >= 70) return 'good';
        if (score >= 50) return 'adequate';
        return 'poor';
    }

    async saveAnalysis(analysis) {
        try {
            const saveData = {
                subcomponentId: this.currentWorksheet.subcomponentId,
                analysis,
                timestamp: new Date().toISOString()
            };
            
            localStorage.setItem(`analysis_${this.currentWorksheet.subcomponentId}`, JSON.stringify(saveData));
            
            // Also save to database
            await fetch('/api/analysis/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(saveData)
            });
        } catch (error) {
            console.error('Error saving analysis:', error);
        }
    }

    switchToAnalysisTab() {
        const analysisTab = document.querySelector('[data-tab="analysis"]');
        if (analysisTab) {
            analysisTab.click();
        }
    }

    updateSaveIndicator(message, isError = false) {
        const indicator = document.getElementById('auto-save-indicator');
        if (indicator) {
            const statusSpan = indicator.querySelector('.save-status');
            statusSpan.textContent = message;
            statusSpan.style.color = isError ? '#ff6b6b' : '#4caf50';
            
            // Reset after 3 seconds
            setTimeout(() => {
                statusSpan.textContent = 'Auto-save enabled';
                statusSpan.style.color = '';
            }, 3000);
        }
    }

    displayError(message) {
        const workspaceContent = document.getElementById('workspace-content');
        if (workspaceContent) {
            workspaceContent.innerHTML = `
                <div class="error-message">
                    <h3>❌ Error</h3>
                    <p>${message}</p>
                    <button onclick="location.reload()">Reload Page</button>
                </div>
            `;
        }
    }

    async exportResponses() {
        // Generate PDF export
        console.log('Exporting responses as PDF...');
        // This would integrate with a PDF generation library
    }

    async exportAnalysis() {
        // Generate PDF export of analysis
        console.log('Exporting analysis as PDF...');
        // This would integrate with a PDF generation library
    }

    async scheduleFollowUp() {
        // Schedule a follow-up assessment
        console.log('Scheduling follow-up assessment...');
        // This would integrate with calendar/scheduling system
    }

    applyStyles() {
        // Add styles if not already present
        if (!document.getElementById('agent-worksheet-styles')) {
            const styles = `
                <style id="agent-worksheet-styles">
                    .agent-worksheet {
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
                    
                    .question-block {
                        background: #1a1a1a;
                        border: 1px solid #333;
                        border-radius: 8px;
                        padding: 20px;
                        margin-bottom: 20px;
                    }
                    
                    .question-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 10px;
                    }
                    
                    .question-label {
                        color: #fff;
                        font-size: 16px;
                        font-weight: 500;
                    }
                    
                    .required {
                        color: #ff6b35;
                        font-weight: bold;
                    }
                    
                    .question-type {
                        background: #333;
                        color: #999;
                        padding: 4px 8px;
                        border-radius: 4px;
                        font-size: 12px;
                        text-transform: uppercase;
                    }
                    
                    .question-hint {
                        color: #666;
                        font-size: 14px;
                        margin-bottom: 15px;
                        padding: 10px;
                        background: #0a0a0a;
                        border-radius: 4px;
                    }
                    
                    .answer-input {
                        width: 100%;
                        min-height: 120px;
                        background: #0a0a0a;
                        border: 1px solid #333;
                        color: #fff;
                        padding: 12px;
                        border-radius: 4px;
                        font-size: 14px;
                        resize: vertical;
                    }
                    
                    .answer-input:focus {
                        outline: none;
                        border-color: #ff6b35;
                    }
                    
                    .answer-meta {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-top: 10px;
                    }
                    
                    .char-count {
                        font-size: 12px;
                        color: #666;
                    }
                    
                    .show-example-btn {
                        background: transparent;
                        border: 1px solid #333;
                        color: #999;
                        padding: 4px 12px;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 12px;
                    }
                    
                    .show-example-btn:hover {
                        border-color: #ff6b35;
                        color: #ff6b35;
                    }
                    
                    .example-section {
                        margin-top: 15px;
                        padding: 15px;
                        background: #0a0a0a;
                        border-radius: 4px;
                    }
                    
                    .example-good, .example-poor {
                        margin-bottom: 10px;
                    }
                    
                    .example-good strong {
                        color: #4caf50;
                    }
                    
                    .example-poor strong {
                        color: #ff6b6b;
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
                        font-weight: 500;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }
                    
                    .save-progress-btn {
                        background: #333;
                        border: 1px solid #444;
                        color: #fff;
                    }
                    
                    .analyze-btn {
                        background: #ff6b35;
                        border: none;
                        color: #000;
                    }
                    
                    .export-btn {
                        background: transparent;
                        border: 1px solid #333;
                        color: #999;
                    }
                    
                    .auto-save-indicator {
                        position: fixed;
                        bottom: 20px;
                        right: 20px;
                        background: #1a1a1a;
                        border: 1px solid #333;
                        padding: 10px 15px;
                        border-radius: 4px;
                        font-size: 12px;
                    }
                    
                    .analysis-loading {
                        text-align: center;
                        padding: 60px;
                    }
                    
                    .spinner {
                        width: 40px;
                        height: 40px;
                        border: 4px solid #333;
                        border-top-color: #ff6b35;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                        margin: 0 auto 20px;
                    }
                    
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                    
                    .agent-analysis {
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
                    
                    .overall-score {
                        text-align: center;
                        padding: 20px;
                        border-radius: 8px;
                        min-width: 120px;
                    }
                    
                    .overall-score.excellent {
                        background: linear-gradient(135deg, #4caf50, #45a049);
                    }
                    
                    .overall-score.good {
                        background: linear-gradient(135deg, #2196f3, #1976d2);
                    }
                    
                    .overall-score.adequate {
                        background: linear-gradient(135deg, #ffa500, #ff8c00);
                    }
                    
                    .overall-score.poor {
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
                        color: rgba(255,255,255,0.8);
                        margin-top: 5px;
                    }
                    
                    .analysis-sections > div {
                        background: #1a1a1a;
                        border: 1px solid #333;
                        border-radius: 8px;
                        padding: 20px;
                        margin-bottom: 20px;
                    }
                    
                    .analysis-sections h4 {
                        color: #ff6b35;
                        margin-bottom: 15px;
                    }
                    
                    .recommendation {
                        display: flex;
                        align-items: center;
                        gap: 15px;
                        padding: 15px;
                        background: #0a0a0a;
                        border-radius: 4px;
                        margin-bottom: 10px;
                    }
                    
                    .priority-badge {
                        padding: 4px 8px;
                        border-radius: 4px;
                        font-size: 11px;
                        text-transform: uppercase;
                        font-weight: bold;
                    }
                    
                    .high-priority .priority-badge {
                        background: #ff6b6b;
                        color: #fff;
                    }
                    
                    .medium-priority .priority-badge {
                        background: #ffa500;
                        color: #000;
                    }
                    
                    .low-priority .priority-badge {
                        background: #4caf50;
                        color: #fff;
                    }
                    
                    .timeline {
                        margin-left: auto;
                        font-size: 12px;
                        color: #666;
                    }
                    
                    .feedback-item {
                        padding: 15px;
                        background: #0a0a0a;
                        border-radius: 4px;
                        margin-bottom: 10px;
                    }
                    
                    .feedback-question {
                        color: #999;
                        font-size: 14px;
                        margin-bottom: 8px;
                    }
                    
                    .feedback-score {
                        display: inline-block;
                        padding: 4px 8px;
                        border-radius: 4px;
                        font-size: 12px;
                        margin-bottom: 8px;
                    }
                    
                    .feedback-text {
                        color: #fff;
                        font-size: 14px;
                        line-height: 1.5;
                    }
                    
                    .feedback-improvement {
                        margin-top: 10px;
                        padding: 10px;
                        background: #1a1a1a;
                        border-left: 3px solid #ff6b35;
                        color: #999;
                        font-size: 13px;
                    }
                </style>
            `;
            document.head.insertAdjacentHTML('beforeend', styles);
        }
    }
}

// Initialize and expose globally
window.agentWorksheet = new AgentWorksheetIntegration();
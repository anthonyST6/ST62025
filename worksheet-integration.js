// Worksheet Integration Module
// Integrates dynamic worksheets into existing subcomponent pages

class WorksheetIntegration {
    constructor() {
        this.name = "Worksheet Integration Module";
        this.version = "1.0.0";
        
        // Factory for creating agents
        this.agentFactory = null;
        
        // Current active agent
        this.currentAgent = null;
        
        // Current worksheet session
        this.currentSession = null;
        
        // Initialize on load
        this.initialize();
    }
    
    async initialize() {
        console.log('🔌 Initializing Worksheet Integration...');
        
        // Initialize agent factory
        if (typeof SubcomponentAgentFactory !== 'undefined') {
            this.agentFactory = new SubcomponentAgentFactory();
        }
        
        // Detect current subcomponent from page
        this.detectCurrentSubcomponent();
        
        // Set up event listeners
        this.setupEventListeners();
        
        console.log('✅ Worksheet Integration ready');
    }
    
    /**
     * Detect current subcomponent from page URL or data attributes
     */
    detectCurrentSubcomponent() {
        // Check URL for subcomponent ID
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id');
        
        if (subcomponentId) {
            this.loadSubcomponentAgent(subcomponentId);
            return;
        }
        
        // Check page for data attribute
        const pageElement = document.querySelector('[data-subcomponent-id]');
        if (pageElement) {
            const id = pageElement.getAttribute('data-subcomponent-id');
            this.loadSubcomponentAgent(id);
            return;
        }
        
        // Try to parse from filename
        const path = window.location.pathname;
        const match = path.match(/subcomponent-(\d+[a-f])/);
        if (match) {
            this.loadSubcomponentAgent(match[1]);
        }
    }
    
    /**
     * Convert URL ID format (1-2) to agent factory format (1b)
     */
    convertIdFormat(urlId) {
        if (!urlId) return null;
        
        // Parse the URL format (e.g., "1-2")
        const match = urlId.match(/^(\d+)-(\d+)$/);
        if (!match) return urlId; // Return as-is if not in expected format
        
        const blockNum = parseInt(match[1]);
        const subNum = parseInt(match[2]);
        
        // Convert to letter format (1-1 -> 1a, 1-2 -> 1b, etc.)
        const letter = String.fromCharCode(96 + subNum); // 97 is 'a', so 96 + 1 = 'a'
        const agentId = `${blockNum}${letter}`;
        
        console.log(`🔄 Converted ID: ${urlId} -> ${agentId}`);
        return agentId;
    }
    
    /**
     * Load agent for specific subcomponent
     */
    loadSubcomponentAgent(subcomponentId) {
        console.log(`📦 Loading agent for subcomponent ${subcomponentId}`);
        
        if (!this.agentFactory) {
            console.error('Agent factory not initialized');
            return;
        }
        
        // Convert ID format if needed
        const agentId = this.convertIdFormat(subcomponentId);
        console.log(`🔍 Looking for agent with ID: ${agentId}`);
        
        this.currentAgent = this.agentFactory.getAgent(agentId);
        
        if (this.currentAgent) {
            console.log(`✅ Agent loaded for ${this.currentAgent.name}`);
            this.enhanceWorkspaceTab();
        } else {
            console.error(`❌ No agent found for ID: ${agentId}`);
        }
    }
    
    /**
     * Enhance the Workspace tab with dynamic worksheet
     */
    enhanceWorkspaceTab() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.enhanceWorkspaceTab());
            return;
        }
        
        // First check for the new dynamic-worksheet-container (subcomponent-detail.html)
        let workspaceContent = document.getElementById('dynamic-worksheet-container');
        
        // If not found, try other selectors
        if (!workspaceContent) {
            workspaceContent = document.querySelector('#workspace-content, .workspace-content, [data-tab="workspace"]');
        }
        
        if (!workspaceContent) {
            console.log('Workspace content area not found, trying alternative method...');
            this.injectWorksheetButton();
            return;
        }
        
        // Replace static content with dynamic worksheet interface
        this.renderDynamicWorksheet(workspaceContent);
    }
    
    /**
     * Inject worksheet button if workspace not found
     */
    injectWorksheetButton() {
        // Find tab navigation
        const tabNav = document.querySelector('.tab-navigation, .nav-tabs, [role="tablist"]');
        
        if (tabNav) {
            // Check if workspace tab exists
            const workspaceTab = Array.from(tabNav.querySelectorAll('button, a')).find(
                el => el.textContent.includes('WORKSPACE') || el.textContent.includes('Workspace')
            );
            
            if (workspaceTab) {
                // Add click handler to workspace tab
                workspaceTab.addEventListener('click', (e) => {
                    setTimeout(() => {
                        const content = document.querySelector('#workspace-content, .workspace-content');
                        if (content) {
                            this.renderDynamicWorksheet(content);
                        }
                    }, 100);
                });
            }
        }
    }
    
    /**
     * Render dynamic worksheet interface
     */
    renderDynamicWorksheet(container) {
        console.log('🎨 Rendering dynamic worksheet interface...');
        
        // Create worksheet UI
        container.innerHTML = `
            <div class="dynamic-worksheet-container">
                <!-- Header -->
                <div class="worksheet-header">
                    <h3 class="worksheet-title">
                        <span class="icon">📝</span>
                        Dynamic Interactive Worksheet
                    </h3>
                    <div class="worksheet-subtitle">
                        Personalized questions powered by AI and adaptive learning
                    </div>
                </div>
                
                <!-- Context Setup (if not already set) -->
                <div id="contextSetup" class="context-setup">
                    <h4>Let's personalize your experience</h4>
                    <div class="context-grid">
                        <div class="context-field">
                            <label>Industry</label>
                            <select id="userIndustry">
                                <option value="">Select...</option>
                                <option value="b2b-saas">B2B SaaS</option>
                                <option value="enterprise">Enterprise</option>
                                <option value="consumer">Consumer</option>
                                <option value="marketplace">Marketplace</option>
                                <option value="general">Other</option>
                            </select>
                        </div>
                        <div class="context-field">
                            <label>Company Stage</label>
                            <select id="userStage">
                                <option value="">Select...</option>
                                <option value="idea">Idea</option>
                                <option value="pre-seed">Pre-Seed</option>
                                <option value="seed">Seed</option>
                                <option value="series-a">Series A</option>
                                <option value="growth">Growth</option>
                            </select>
                        </div>
                        <div class="context-field">
                            <label>Team Size</label>
                            <input type="number" id="userTeamSize" placeholder="e.g., 10" min="1">
                        </div>
                        <div class="context-field">
                            <label>Experience Level</label>
                            <select id="userExperience">
                                <option value="">Select...</option>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                                <option value="expert">Expert</option>
                            </select>
                        </div>
                    </div>
                    <button class="btn-generate" onclick="worksheetIntegration.generateWorksheet()">
                        Generate Personalized Worksheet
                    </button>
                </div>
                
                <!-- Loading State -->
                <div id="worksheetLoading" class="loading-state" style="display: none;">
                    <div class="spinner"></div>
                    <p>Creating your personalized worksheet...</p>
                </div>
                
                <!-- Worksheet Content -->
                <div id="worksheetContent" class="worksheet-content" style="display: none;">
                    <!-- Questions will be inserted here -->
                </div>
                
                <!-- Progress Bar -->
                <div id="progressBar" class="progress-bar-container" style="display: none;">
                    <div class="progress-bar">
                        <div class="progress-fill" id="progressFill" style="width: 0%"></div>
                    </div>
                    <div class="progress-text">
                        <span id="progressText">0% Complete</span>
                        <span id="adaptationCount">0 Adaptations</span>
                    </div>
                </div>
                
                <!-- Action Buttons -->
                <div id="worksheetActions" class="worksheet-actions" style="display: none;">
                    <button class="btn-secondary" onclick="worksheetIntegration.saveProgress()">
                        Save Progress
                    </button>
                    <button class="btn-primary" onclick="worksheetIntegration.submitWorksheet()">
                        Submit & Analyze
                    </button>
                </div>
                
                <!-- Results Section -->
                <div id="worksheetResults" class="worksheet-results" style="display: none;">
                    <!-- Results will be inserted here -->
                </div>
            </div>
        `;
        
        // Add styles if not already present
        this.injectStyles();
        
        // Load saved context if available
        this.loadSavedContext();
    }
    
    /**
     * Inject styles for dynamic worksheet
     */
    injectStyles() {
        if (document.getElementById('dynamic-worksheet-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'dynamic-worksheet-styles';
        styles.innerHTML = `
            .dynamic-worksheet-container {
                padding: 20px;
                max-width: 900px;
                margin: 0 auto;
            }
            
            .worksheet-header {
                margin-bottom: 30px;
                text-align: center;
            }
            
            .worksheet-title {
                font-size: 1.8em;
                color: #ff6b35;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
            }
            
            .worksheet-subtitle {
                color: #999;
                font-size: 1.1em;
            }
            
            .context-setup {
                background: #2a2a2a;
                border-radius: 12px;
                padding: 25px;
                margin-bottom: 30px;
            }
            
            .context-setup h4 {
                color: #ff6b35;
                margin-bottom: 20px;
            }
            
            .context-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                margin-bottom: 25px;
            }
            
            .context-field label {
                display: block;
                color: #999;
                font-size: 0.9em;
                margin-bottom: 8px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .context-field input,
            .context-field select {
                width: 100%;
                padding: 10px;
                background: #1e1e1e;
                border: 1px solid #444;
                border-radius: 6px;
                color: #e0e0e0;
                font-size: 1em;
            }
            
            .btn-generate,
            .btn-primary,
            .btn-secondary {
                padding: 12px 24px;
                border: none;
                border-radius: 6px;
                font-size: 1em;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .btn-generate,
            .btn-primary {
                background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%);
                color: white;
            }
            
            .btn-generate:hover,
            .btn-primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(255, 107, 53, 0.3);
            }
            
            .btn-secondary {
                background: #2a2a2a;
                color: #e0e0e0;
                border: 1px solid #444;
                margin-right: 10px;
            }
            
            .loading-state {
                text-align: center;
                padding: 60px 20px;
            }
            
            .spinner {
                width: 50px;
                height: 50px;
                border: 3px solid #333;
                border-top-color: #ff6b35;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
            
            .question-card {
                background: #2a2a2a;
                border: 1px solid #444;
                border-radius: 8px;
                padding: 20px;
                margin-bottom: 20px;
                transition: all 0.3s ease;
            }
            
            .question-card:hover {
                border-color: #ff6b35;
                box-shadow: 0 2px 10px rgba(255, 107, 53, 0.2);
            }
            
            .question-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
            }
            
            .question-number {
                background: #ff6b35;
                color: white;
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 0.9em;
                font-weight: 600;
            }
            
            .question-badges {
                display: flex;
                gap: 8px;
            }
            
            .badge {
                padding: 4px 10px;
                border-radius: 20px;
                font-size: 0.85em;
                font-weight: 500;
                text-transform: uppercase;
            }
            
            .badge-type {
                background: rgba(255, 107, 53, 0.2);
                color: #ff8c42;
            }
            
            .badge-difficulty {
                background: rgba(100, 200, 100, 0.2);
                color: #64c864;
            }
            
            .question-text {
                font-size: 1.1em;
                line-height: 1.6;
                margin-bottom: 15px;
                color: #e0e0e0;
            }
            
            .question-hint {
                background: rgba(255, 107, 53, 0.1);
                border-left: 3px solid #ff6b35;
                padding: 10px 15px;
                margin-bottom: 15px;
                font-size: 0.95em;
                color: #ccc;
                border-radius: 4px;
            }
            
            .question-input {
                width: 100%;
                min-height: 100px;
                padding: 12px;
                background: #1e1e1e;
                border: 1px solid #444;
                border-radius: 6px;
                color: #e0e0e0;
                font-size: 1em;
                resize: vertical;
            }
            
            .question-input:focus {
                outline: none;
                border-color: #ff6b35;
                box-shadow: 0 0 0 2px rgba(255, 107, 53, 0.2);
            }
            
            .quality-indicator {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-top: 10px;
                font-size: 0.9em;
                color: #999;
            }
            
            .quality-bar {
                flex: 1;
                height: 6px;
                background: #333;
                border-radius: 3px;
                overflow: hidden;
            }
            
            .quality-fill {
                height: 100%;
                background: linear-gradient(90deg, #ff6464 0%, #ffaa00 50%, #64c864 100%);
                transition: width 0.3s ease;
            }
            
            .progress-bar-container {
                margin: 30px 0;
            }
            
            .progress-bar {
                height: 8px;
                background: #333;
                border-radius: 4px;
                overflow: hidden;
            }
            
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #ff6b35 0%, #ff8c42 100%);
                transition: width 0.3s ease;
            }
            
            .progress-text {
                display: flex;
                justify-content: space-between;
                margin-top: 10px;
                color: #999;
                font-size: 0.9em;
            }
            
            .worksheet-actions {
                display: flex;
                justify-content: center;
                gap: 15px;
                margin-top: 30px;
            }
            
            .worksheet-results {
                background: #2a2a2a;
                border-radius: 12px;
                padding: 30px;
                margin-top: 30px;
            }
            
            .result-score {
                font-size: 3em;
                font-weight: 700;
                color: #ff6b35;
                text-align: center;
                margin-bottom: 20px;
            }
            
            .result-summary {
                font-size: 1.2em;
                line-height: 1.6;
                color: #e0e0e0;
                text-align: center;
                margin-bottom: 30px;
            }
            
            .recommendations {
                border-top: 1px solid #444;
                padding-top: 20px;
            }
            
            .recommendation-item {
                background: #1e1e1e;
                border-left: 3px solid #ff6b35;
                padding: 15px;
                margin-bottom: 15px;
                border-radius: 4px;
            }
            
            .recommendation-priority {
                display: inline-block;
                padding: 2px 8px;
                background: rgba(255, 107, 53, 0.2);
                color: #ff8c42;
                border-radius: 4px;
                font-size: 0.85em;
                font-weight: 600;
                text-transform: uppercase;
                margin-bottom: 8px;
            }
            
            .recommendation-text {
                color: #e0e0e0;
                line-height: 1.5;
            }
            
            .adaptation-notice {
                background: rgba(100, 200, 255, 0.1);
                border: 1px solid rgba(100, 200, 255, 0.3);
                border-radius: 8px;
                padding: 15px;
                margin: 20px 0;
                animation: slideIn 0.3s ease;
            }
            
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        
        document.head.appendChild(styles);
    }
    
    /**
     * Load saved user context
     */
    loadSavedContext() {
        const savedContext = localStorage.getItem('userContext');
        if (savedContext) {
            try {
                const context = JSON.parse(savedContext);
                
                if (context.industry) {
                    document.getElementById('userIndustry').value = context.industry;
                }
                if (context.companyStage) {
                    document.getElementById('userStage').value = context.companyStage;
                }
                if (context.teamSize) {
                    document.getElementById('userTeamSize').value = context.teamSize;
                }
                if (context.experienceLevel) {
                    document.getElementById('userExperience').value = context.experienceLevel;
                }
            } catch (e) {
                console.error('Error loading saved context:', e);
            }
        }
    }
    
    /**
     * Generate worksheet based on user context
     */
    async generateWorksheet() {
        console.log('📝 Generating personalized worksheet...');
        
        if (!this.currentAgent) {
            alert('Agent not loaded. Please refresh the page.');
            return;
        }
        
        // Get user context
        const context = this.getUserContext();
        
        // Save context
        localStorage.setItem('userContext', JSON.stringify(context));
        
        // Show loading
        document.getElementById('contextSetup').style.display = 'none';
        document.getElementById('worksheetLoading').style.display = 'block';
        
        try {
            // Generate worksheet
            const worksheet = await this.currentAgent.generateDynamicWorksheet(context);
            
            // Store current session
            this.currentSession = {
                worksheet: worksheet,
                responses: {},
                startTime: new Date().toISOString(),
                adaptations: 0
            };
            
            // Display worksheet
            this.displayWorksheet(worksheet);
            
        } catch (error) {
            console.error('Error generating worksheet:', error);
            alert('Error generating worksheet. Please try again.');
            
            // Reset UI
            document.getElementById('contextSetup').style.display = 'block';
            document.getElementById('worksheetLoading').style.display = 'none';
        }
    }
    
    /**
     * Get user context from form
     */
    getUserContext() {
        return {
            userId: localStorage.getItem('userId') || `user_${Date.now()}`,
            industry: document.getElementById('userIndustry').value || 'general',
            companyStage: document.getElementById('userStage').value || 'pre-seed',
            teamSize: parseInt(document.getElementById('userTeamSize').value) || 1,
            experienceLevel: document.getElementById('userExperience').value || 'beginner',
            subcomponentId: this.currentAgent.id,
            subcomponentName: this.currentAgent.name,
            timestamp: new Date().toISOString()
        };
    }
    
    /**
     * Display generated worksheet
     */
    displayWorksheet(worksheet) {
        console.log('🎨 Displaying worksheet...');
        
        // Hide loading
        document.getElementById('worksheetLoading').style.display = 'none';
        
        // Show worksheet content
        const contentDiv = document.getElementById('worksheetContent');
        contentDiv.style.display = 'block';
        
        // Clear previous content
        contentDiv.innerHTML = '';
        
        // Add questions
        worksheet.questions.forEach((question, index) => {
            const questionCard = this.createQuestionCard(question, index + 1);
            contentDiv.appendChild(questionCard);
        });
        
        // Show progress bar and actions
        document.getElementById('progressBar').style.display = 'block';
        document.getElementById('worksheetActions').style.display = 'flex';
        
        // Update progress
        this.updateProgress();
    }
    
    /**
     * Create question card element
     */
    createQuestionCard(question, number) {
        const card = document.createElement('div');
        card.className = 'question-card';
        card.id = `question_${question.id}`;
        
        // Create badges HTML
        const badges = [];
        if (question.type) {
            badges.push(`<span class="badge badge-type">${question.type}</span>`);
        }
        if (question.difficulty) {
            badges.push(`<span class="badge badge-difficulty">${question.difficulty}</span>`);
        }
        
        card.innerHTML = `
            <div class="question-header">
                <span class="question-number">Question ${number}</span>
                <div class="question-badges">
                    ${badges.join('')}
                </div>
            </div>
            
            <div class="question-text">${question.text}</div>
            
            ${question.hint ? `<div class="question-hint">💡 ${question.hint}</div>` : ''}
            
            <textarea 
                class="question-input" 
                id="response_${question.id}"
                placeholder="Enter your response here..."
                onchange="worksheetIntegration.handleResponseChange('${question.id}')"
                onkeyup="worksheetIntegration.updateResponseQuality('${question.id}')"
            ></textarea>
            
            <div class="quality-indicator">
                <span>Response Quality:</span>
                <div class="quality-bar">
                    <div class="quality-fill" id="quality_${question.id}" style="width: 0%"></div>
                </div>
                <span id="quality_text_${question.id}">0%</span>
            </div>
        `;
        
        return card;
    }
    
    /**
     * Handle response change
     */
    async handleResponseChange(questionId) {
        const response = document.getElementById(`response_${questionId}`).value;
        
        // Store response
        this.currentSession.responses[questionId] = response;
        
        // Update progress
        this.updateProgress();
        
        // Check for adaptation if agent has adaptive flow
        if (this.currentAgent && this.currentAgent.adaptiveFlow) {
            try {
                const result = await this.currentAgent.adaptiveFlow.processResponseAndAdapt(
                    questionId,
                    response
                );
                
                if (result.adapted) {
                    this.showAdaptation(result.adaptationType);
                    this.currentSession.adaptations++;
                    document.getElementById('adaptationCount').textContent = 
                        `${this.currentSession.adaptations} Adaptations`;
                }
            } catch (error) {
                console.error('Error processing adaptation:', error);
            }
        }
    }
    
    /**
     * Update response quality indicator
     */
    updateResponseQuality(questionId) {
        const response = document.getElementById(`response_${questionId}`).value;
        
        // Calculate quality
        let quality = 0;
        if (response.length > 0) quality += 20;
        if (response.length > 50) quality += 20;
        if (response.length > 100) quality += 20;
        if (/\d+/.test(response)) quality += 20;
        if (response.split(/[.!?]+/).length > 2) quality += 20;
        
        quality = Math.min(100, quality);
        
        // Update UI
        document.getElementById(`quality_${questionId}`).style.width = `${quality}%`;
        document.getElementById(`quality_text_${questionId}`).textContent = `${quality}%`;
    }
    
    /**
     * Update progress bar
     */
    updateProgress() {
        if (!this.currentSession || !this.currentSession.worksheet) return;
        
        const total = this.currentSession.worksheet.questions.length;
        const answered = Object.keys(this.currentSession.responses).length;
        const percentage = Math.round((answered / total) * 100);
        
        document.getElementById('progressFill').style.width = `${percentage}%`;
        document.getElementById('progressText').textContent = `${percentage}% Complete`;
    }
    
    /**
     * Show adaptation notice
     */
    showAdaptation(type) {
        const notice = document.createElement('div');
        notice.className = 'adaptation-notice';
        
        const messages = {
            'simplify': '🔄 Questions simplified based on your responses',
            'advance': '⬆️ Advanced questions added based on strong performance',
            'struggling': '🤝 Additional support added to help you',
            'confident': '🎯 Challenge questions added to test understanding',
            'uncertain': '❓ Clarification questions added',
            'reengage': '✨ Worksheet adjusted to maintain engagement'
        };
        
        notice.innerHTML = `
            <strong>Adaptive Learning Active</strong><br>
            ${messages[type] || '🔄 Worksheet adapted based on your responses'}
        `;
        
        // Insert after current question
        const contentDiv = document.getElementById('worksheetContent');
        contentDiv.insertBefore(notice, contentDiv.firstChild);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notice.remove();
        }, 5000);
    }
    
    /**
     * Save progress
     */
    saveProgress() {
        if (!this.currentSession) {
            alert('No active worksheet session');
            return;
        }
        
        const saveData = {
            session: this.currentSession,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem(`worksheet_${this.currentAgent.id}`, JSON.stringify(saveData));
        
        alert('Progress saved successfully!');
    }
    
    /**
     * Submit worksheet for analysis
     */
    async submitWorksheet() {
        if (!this.currentSession || !this.currentAgent) {
            alert('No active worksheet session');
            return;
        }
        
        // Check if all required questions are answered
        const requiredQuestions = this.currentSession.worksheet.questions.filter(q => q.required);
        const missingRequired = requiredQuestions.filter(q => !this.currentSession.responses[q.id]);
        
        if (missingRequired.length > 0) {
            alert(`Please answer all required questions (${missingRequired.length} remaining)`);
            return;
        }
        
        // Show loading
        document.getElementById('worksheetActions').style.display = 'none';
        
        try {
            // Process responses
            const result = await this.currentAgent.processWorksheetResponse(
                this.currentSession.worksheet.id,
                this.currentSession.responses,
                this.getUserContext()
            );
            
            // Display results
            this.displayResults(result);
            
            // Update score in main UI if available
            this.updateMainScore(result.scores.overall);
            
        } catch (error) {
            console.error('Error submitting worksheet:', error);
            alert('Error analyzing worksheet. Please try again.');
            
            // Reset UI
            document.getElementById('worksheetActions').style.display = 'flex';
        }
    }
    
    /**
     * Display analysis results
     */
    displayResults(result) {
        const resultsDiv = document.getElementById('worksheetResults');
        resultsDiv.style.display = 'block';
        
        // Hide worksheet content
        document.getElementById('worksheetContent').style.display = 'none';
        document.getElementById('progressBar').style.display = 'none';
        
        // Create results HTML
        resultsDiv.innerHTML = `
            <div class="result-score">${result.scores.overall}%</div>
            <div class="result-summary">${result.analysis.summary}</div>
            
            <div class="recommendations">
                <h4 style="color: #ff6b35; margin-bottom: 20px;">Recommendations</h4>
                ${result.recommendations.map(rec => `
                    <div class="recommendation-item">
                        <div class="recommendation-priority">${rec.priority}</div>
                        <div class="recommendation-text">${rec.action}</div>
                    </div>
                `).join('')}
            </div>
            
            <div class="worksheet-actions" style="margin-top: 30px;">
                <button class="btn-secondary" onclick="worksheetIntegration.resetWorksheet()">
                    Try Again
                </button>
                <button class="btn-primary" onclick="worksheetIntegration.viewAnalysis()">
                    View Full Analysis
                </button>
            </div>
        `;
    }
    
    /**
     * Update main score in UI
     */
    updateMainScore(score) {
        // Try to find score element in main UI
        const scoreElement = document.querySelector('.score-value, .current-score, [data-score]');
        if (scoreElement) {
            scoreElement.textContent = score;
            
            // Trigger score update event if scoring engine exists
            if (typeof window.updateScore === 'function') {
                window.updateScore(this.currentAgent.id, score);
            }
        }
    }
    
    /**
     * Reset worksheet
     */
    resetWorksheet() {
        // Clear session
        this.currentSession = null;
        
        // Reset UI
        document.getElementById('worksheetResults').style.display = 'none';
        document.getElementById('contextSetup').style.display = 'block';
        document.getElementById('worksheetContent').innerHTML = '';
    }
    
    /**
     * View full analysis (switch to Analysis tab)
     */
    viewAnalysis() {
        // Try to click on Analysis tab
        const analysisTab = document.querySelector('[data-tab="analysis"], button:contains("ANALYSIS")');
        if (analysisTab) {
            analysisTab.click();
        }
    }
    
    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Listen for tab changes
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-tab="workspace"]') || 
                (e.target.textContent && e.target.textContent.includes('WORKSPACE'))) {
                setTimeout(() => {
                    this.enhanceWorkspaceTab();
                }, 100);
            }
        });
    }
}

// Initialize on page load
if (typeof window !== 'undefined') {
    // Create a static method for manual initialization
    WorksheetIntegration.initialize = function() {
        if (!window.worksheetIntegration) {
            window.worksheetIntegration = new WorksheetIntegration();
        } else {
            // Re-run initialization if already exists
            window.worksheetIntegration.initialize();
        }
    };
    
    // Auto-initialize only if not on subcomponent-detail.html
    if (!window.location.pathname.includes('subcomponent-detail.html')) {
        window.worksheetIntegration = new WorksheetIntegration();
    }
    
    // Make available globally
    window.WorksheetIntegration = WorksheetIntegration;
}

console.log('✅ Worksheet Integration Module loaded - dynamic worksheets ready!');
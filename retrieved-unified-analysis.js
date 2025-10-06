/**
 * Unified Analysis Handler - Enhanced Version
 * Completely replaces generic field system with dimension-based analysis
 * Handles all 96 agents with their specific dimensions
 */

(function() {
    console.log('🚀 Enhanced Unified Analysis Handler loaded - Dimension-Based System Active');
    
    // Load required dependencies
    let AgentLibrary = window.AgentLibrary || {};
    let EnhancedAgent = window.EnhancedAgent;
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
    function initialize() {
        console.log('📄 Initializing Enhanced Unified Analysis Handler');
        
        // Load agent library if not already loaded
        if (!window.AgentLibrary || Object.keys(window.AgentLibrary).length === 0) {
            loadAgentLibrary();
        }
        
        // Override the analyzeWorksheet function with enhanced version
        window.analyzeWorksheet = async function() {
            console.log('🎯 Enhanced analyzeWorksheet called - Using Dimension-Based System');
            
            // Get the current subcomponent ID
            const urlParams = new URLSearchParams(window.location.search);
            const subcomponentId = urlParams.get('id') || detectSubcomponentFromPage();
            console.log('🆔 Current subcomponent ID:', subcomponentId);
            
            // Get the appropriate agent
            const agent = getAgentForSubcomponent(subcomponentId);
            if (!agent) {
                console.error('❌ No agent found for subcomponent:', subcomponentId);
                showError('Unable to find agent for this component');
                return;
            }
            
            console.log('🤖 Using agent:', agent.name, '(', agent.id, ')');
            
            // Collect dimension-based responses (NOT generic fields!)
            const worksheetData = collectDimensionResponses(agent);
            console.log('📋 Collected dimension data:', worksheetData);
            
            // Validate responses
            if (!validateResponses(worksheetData)) {
                showNotification('Please complete all required dimension fields before analyzing.', 'warning');
                return;
            }
            
            // Switch to Analysis tab
            switchToAnalysisTab();
            
            // Show loading state
            showAnalysisLoading(agent);
            
            try {
                // Perform agent-based analysis
                const analysis = await performAgentAnalysis(agent, worksheetData);
                console.log('✅ Analysis complete:', analysis);
                
                // Display enhanced results
                displayEnhancedAnalysisResults(analysis, agent);
                
                // Persist the analysis
                await agent.persistAnalysis(analysis, getUserId());
                
                // Show success notification
                showNotification(`Analysis complete! Score: ${analysis.overallScore}%`, 'success');
                
            } catch (error) {
                console.error('❌ Analysis error:', error);
                showAnalysisError(error);
            }
        };
        
        // Initialize workspace with dimension-based fields
        window.loadWorkspaceFields = function() {
            console.log('📝 Loading dimension-based workspace fields');
            
            const urlParams = new URLSearchParams(window.location.search);
            const subcomponentId = urlParams.get('id') || detectSubcomponentFromPage();
            const agent = getAgentForSubcomponent(subcomponentId);
            
            if (!agent) {
                console.error('❌ No agent found for workspace initialization');
                return;
            }
            
            displayDimensionWorksheet(agent);
        };
        
        // Initialize education content with agent-specific data
        window.loadEducationContent = function() {
            console.log('📚 Loading agent-specific education content');
            
            const urlParams = new URLSearchParams(window.location.search);
            const subcomponentId = urlParams.get('id') || detectSubcomponentFromPage();
            const agent = getAgentForSubcomponent(subcomponentId);
            
            if (!agent) {
                console.error('❌ No agent found for education content');
                return;
            }
            
            displayEducationContent(agent);
        };
    }
    
    // ========================================
    // Agent Management
    // ========================================
    
    function getAgentForSubcomponent(subcomponentId) {
        // Complete mapping of all 96 subcomponents to agents
        const agentMapping = {
            // Block 1: Mission Discovery
            '1-1': '1a', '1-2': '1b', '1-3': '1c', '1-4': '1d', '1-5': '1e', '1-6': '1f',
            // Block 2: Customer Insights
            '2-1': '2a', '2-2': '2b', '2-3': '2c', '2-4': '2d', '2-5': '2e', '2-6': '2f',
            // Block 3: Strategic Prioritization
            '3-1': '3a', '3-2': '3b', '3-3': '3c', '3-4': '3d', '3-5': '3e', '3-6': '3f',
            // Block 4: Prototype Launch
            '4-1': '4a', '4-2': '4b', '4-3': '4c', '4-4': '4d', '4-5': '4e', '4-6': '4f',
            // Block 5: Early Adopter Wins
            '5-1': '5a', '5-2': '5b', '5-3': '5c', '5-4': '5d', '5-5': '5e', '5-6': '5f',
            // Block 6: Customer Engagement Flywheel
            '6-1': '6a', '6-2': '6b', '6-3': '6c', '6-4': '6d', '6-5': '6e', '6-6': '6f',
            // Block 7: Quantifiable Impact
            '7-1': '7a', '7-2': '7b', '7-3': '7c', '7-4': '7d', '7-5': '7e', '7-6': '7f',
            // Block 8: Customer Success Expansion
            '8-1': '8a', '8-2': '8b', '8-3': '8c', '8-4': '8d', '8-5': '8e', '8-6': '8f',
            // Block 9: Proof Execution
            '9-1': '9a', '9-2': '9b', '9-3': '9c', '9-4': '9d', '9-5': '9e', '9-6': '9f',
            // Block 10: Sales Team Empowerment
            '10-1': '10a', '10-2': '10b', '10-3': '10c', '10-4': '10d', '10-5': '10e', '10-6': '10f',
            // Block 11: High Performance Teams
            '11-1': '11a', '11-2': '11b', '11-3': '11c', '11-4': '11d', '11-5': '11e', '11-6': '11f',
            // Block 12: Retention Systems
            '12-1': '12a', '12-2': '12b', '12-3': '12c', '12-4': '12d', '12-5': '12e', '12-6': '12f',
            // Block 13: Market Domination Strategies
            '13-1': '13a', '13-2': '13b', '13-3': '13c', '13-4': '13d', '13-5': '13e', '13-6': '13f',
            // Block 14: Operational Infrastructure
            '14-1': '14a', '14-2': '14b', '14-3': '14c', '14-4': '14d', '14-5': '14e', '14-6': '14f',
            // Block 15: Leadership Expansion
            '15-1': '15a', '15-2': '15b', '15-3': '15c', '15-4': '15d', '15-5': '15e', '15-6': '15f',
            // Block 16: Global Expansion Opportunities
            '16-1': '16a', '16-2': '16b', '16-3': '16c', '16-4': '16d', '16-5': '16e', '16-6': '16f'
        };
        
        const agentId = agentMapping[subcomponentId];
        if (!agentId) {
            console.error('❌ No agent mapping found for subcomponent:', subcomponentId);
            return null;
        }
        
        const agentConfig = AgentLibrary[agentId];
        if (!agentConfig) {
            console.error('❌ No agent configuration found for agent ID:', agentId);
            return null;
        }
        
        // Create enhanced agent instance
        if (window.EnhancedAgent) {
            return new window.EnhancedAgent(agentId, agentConfig);
        } else {
            // Fallback to basic agent structure
            return {
                id: agentId,
                name: agentConfig.name,
                description: agentConfig.description,
                dimensions: agentConfig.scoringDimensions,
                evaluationCriteria: agentConfig.evaluationCriteria,
                generateWorksheetQuestions: () => generateDimensionQuestions(agentConfig),
                analyzeWorksheet: (responses) => analyzeDimensionResponses(agentConfig, responses),
                generateEducationContent: () => generateEducationContent(agentConfig),
                persistAnalysis: async (analysis, userId) => persistAnalysis(agentId, agentConfig, analysis, userId)
            };
        }
    }
    
    // ========================================
    // Dimension-Based Data Collection
    // ========================================
    
    function collectDimensionResponses(agent) {
        const responses = {};
        
        // Collect responses for each dimension (NOT generic fields!)
        agent.dimensions.forEach((dimension, index) => {
            const fieldId = `dimension-${index + 1}`;
            const field = document.getElementById(fieldId);
            
            if (field) {
                responses[fieldId] = {
                    dimensionName: dimension.name,
                    value: field.value || '',
                    weight: dimension.weight
                };
                console.log(`📊 Collected ${dimension.name}: ${field.value.length} chars`);
            } else {
                console.warn(`⚠️ Dimension field not found: ${fieldId} (${dimension.name})`);
            }
        });
        
        return responses;
    }
    
    // ========================================
    // Dimension-Based Worksheet Display
    // ========================================
    
    function displayDimensionWorksheet(agent) {
        const workspaceFields = document.getElementById('workspace-fields');
        if (!workspaceFields) {
            console.error('❌ Workspace fields container not found');
            return;
        }
        
        // Generate dimension-based questions
        const questions = agent.generateWorksheetQuestions ? 
            agent.generateWorksheetQuestions() : 
            generateDimensionQuestions(agent);
        
        // Create HTML for dimension fields
        let html = `
            <div class="dimension-worksheet">
                <div class="worksheet-header">
                    <h3>📋 ${agent.name} Assessment</h3>
                    <p class="worksheet-description">${agent.description}</p>
                    <div class="dimension-overview">
                        <p>This assessment evaluates ${agent.dimensions.length} key dimensions:</p>
                        <ul class="dimension-list">
                            ${agent.dimensions.map(d => `
                                <li>
                                    <strong>${d.name}</strong> (${d.weight}% weight) - ${d.description}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
                
                <div class="dimension-fields">
                    ${questions.map((q, index) => `
                        <div class="dimension-field-container" data-dimension="${q.dimensionName}">
                            <div class="dimension-header">
                                <label for="dimension-${index + 1}" class="dimension-label">
                                    <span class="dimension-number">${index + 1}</span>
                                    <span class="dimension-name">${q.dimensionName}</span>
                                    <span class="dimension-weight">(${q.dimensionWeight}% weight)</span>
                                </label>
                                ${q.metadata.required ? '<span class="required-indicator">*Required</span>' : ''}
                            </div>
                            
                            <p class="dimension-question">${q.question}</p>
                            <p class="dimension-hint">💡 ${q.hint}</p>
                            
                            <textarea
                                id="dimension-${index + 1}"
                                class="dimension-input"
                                placeholder="Describe your approach to ${q.dimensionName.toLowerCase()}..."
                                minlength="${q.metadata.minLength}"
                                maxlength="${q.metadata.maxLength}"
                                data-dimension-name="${q.dimensionName}"
                                data-weight="${q.dimensionWeight}"
                                ${q.metadata.required ? 'required' : ''}
                            ></textarea>
                            
                            <div class="dimension-helpers">
                                <span class="char-counter" id="counter-${index + 1}">
                                    0 / ${q.metadata.maxLength}
                                </span>
                                <button class="guidance-btn" onclick="showDimensionGuidance('${q.dimensionName}', ${index})">
                                    💡 Show Guidance
                                </button>
                                <button class="example-btn" onclick="showDimensionExample('${q.dimensionName}', ${index})">
                                    📖 Show Example
                                </button>
                            </div>
                            
                            <div id="guidance-${index + 1}" class="dimension-guidance" style="display: none;">
                                <h4>Guidance for ${q.dimensionName}</h4>
                                <p>${q.guidanceText}</p>
                            </div>
                            
                            <div id="example-${index + 1}" class="dimension-example" style="display: none;">
                                <h4>Example Responses</h4>
                                <div class="example-good">
                                    <strong>✅ Strong Response:</strong>
                                    <p>${q.exampleAnswer.good}</p>
                                </div>
                                <div class="example-poor">
                                    <strong>❌ Weak Response:</strong>
                                    <p>${q.exampleAnswer.poor}</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        workspaceFields.innerHTML = html;
        
        // Add event listeners for character counting
        questions.forEach((q, index) => {
            const textarea = document.getElementById(`dimension-${index + 1}`);
            const counter = document.getElementById(`counter-${index + 1}`);
            
            if (textarea && counter) {
                textarea.addEventListener('input', function() {
                    const length = this.value.length;
                    const max = parseInt(this.maxLength);
                    counter.textContent = `${length} / ${max}`;
                    
                    // Color coding
                    if (length < parseInt(this.minLength)) {
                        counter.style.color = '#ff6b6b';
                    } else if (length > max * 0.9) {
                        counter.style.color = '#ffa500';
                    } else {
                        counter.style.color = '#4caf50';
                    }
                });
            }
        });
        
        // Load any saved responses
        loadSavedDimensionResponses(agent);
        
        console.log(`✅ Displayed dimension-based worksheet for ${agent.name}`);
    }
    
    // ========================================
    // Education Content Display
    // ========================================
    
    function displayEducationContent(agent) {
        const educationContent = document.getElementById('education-content');
        if (!educationContent) {
            console.error('❌ Education content container not found');
            return;
        }
        
        const content = agent.generateEducationContent ? 
            agent.generateEducationContent() : 
            generateEducationContent(agent);
        
        let html = `
            <div class="agent-education-content">
                <!-- Overview Section -->
                <div class="education-section">
                    <h3>${content.overview.title}</h3>
                    <p class="description">${content.overview.description}</p>
                    <div class="importance-box">
                        <h4>Why This Matters</h4>
                        <p>${content.overview.importance}</p>
                    </div>
                    <div class="objectives-box">
                        <h4>Learning Objectives</h4>
                        <ul>
                            ${content.overview.objectives.map(obj => `<li>${obj}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                
                <!-- Key Principles Section -->
                <div class="education-section">
                    <h3>Key Evaluation Dimensions</h3>
                    <div class="principles-grid">
                        ${content.keyPrinciples.map((principle, index) => `
                            <div class="principle-card">
                                <div class="principle-header">
                                    <span class="principle-number">${index + 1}</span>
                                    <h4>${principle.principle}</h4>
                                    <span class="principle-weight">${principle.weight}</span>
                                </div>
                                <p class="principle-explanation">${principle.explanation}</p>
                                <div class="principle-importance">
                                    <strong>Why It Matters:</strong> ${principle.whyItMatters}
                                </div>
                                <div class="principle-indicators">
                                    <div class="indicator strong">
                                        <span class="indicator-label">Strong:</span>
                                        <span>${principle.indicators.strong}</span>
                                    </div>
                                    <div class="indicator developing">
                                        <span class="indicator-label">Developing:</span>
                                        <span>${principle.indicators.developing}</span>
                                    </div>
                                    <div class="indicator weak">
                                        <span class="indicator-label">Weak:</span>
                                        <span>${principle.indicators.weak}</span>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Use Cases Section -->
                <div class="education-section">
                    <h3>Real-World Applications</h3>
                    <div class="use-cases">
                        ${content.useCases.map(useCase => `
                            <div class="use-case-card">
                                <h4>${useCase.title}</h4>
                                <p><strong>Scenario:</strong> ${useCase.scenario}</p>
                                <p><strong>Application:</strong> ${useCase.application}</p>
                                <div class="challenges">
                                    <strong>Challenges:</strong>
                                    <ul>
                                        ${useCase.challenges.map(c => `<li>${c}</li>`).join('')}
                                    </ul>
                                </div>
                                <div class="solutions">
                                    <strong>Solutions:</strong>
                                    <ul>
                                        ${useCase.solutions.map(s => `<li>${s}</li>`).join('')}
                                    </ul>
                                </div>
                                <p class="outcome"><strong>Expected Outcome:</strong> ${useCase.outcome}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Best Practices Section -->
                <div class="education-section">
                    <h3>Best Practices</h3>
                    <div class="best-practices">
                        ${content.bestPractices.map(practice => `
                            <div class="practice-item">
                                <h4>${practice.dimension}</h4>
                                <ul>
                                    ${practice.practices.map(p => `<li>${p}</li>`).join('')}
                                </ul>
                                <div class="metrics">
                                    <strong>Key Metrics:</strong>
                                    <ul>
                                        ${practice.metrics.map(m => `<li>${m}</li>`).join('')}
                                    </ul>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Common Mistakes Section -->
                <div class="education-section">
                    <h3>Common Mistakes to Avoid</h3>
                    <div class="mistakes-list">
                        ${content.commonMistakes.map(mistake => `
                            <div class="mistake-item">
                                <div class="mistake-header">
                                    <span class="mistake-icon">⚠️</span>
                                    <strong>${mistake.mistake}</strong>
                                </div>
                                <p class="mistake-impact"><strong>Impact:</strong> ${mistake.impact}</p>
                                <p class="mistake-solution"><strong>Solution:</strong> ${mistake.solution}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Resources Section -->
                <div class="education-section">
                    <h3>Resources & Tools</h3>
                    <div class="resources-grid">
                        <div class="resource-category">
                            <h4>📄 Templates</h4>
                            <ul>
                                ${content.resources.templates.map(t => `<li>${t}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="resource-category">
                            <h4>📚 Guides</h4>
                            <ul>
                                ${content.resources.guides.map(g => `<li>${g}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="resource-category">
                            <h4>🔧 Tools</h4>
                            <ul>
                                ${content.resources.tools.map(t => `<li>${t}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="resource-category">
                            <h4>💡 Examples</h4>
                            <ul>
                                ${content.resources.examples.map(e => `<li>${e}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        educationContent.innerHTML = html;
        console.log(`✅ Displayed education content for ${agent.name}`);
    }
    
    // ========================================
    // Agent-Based Analysis
    // ========================================
    
    async function performAgentAnalysis(agent, worksheetData) {
        // Use agent's analysis method if available
        if (agent.analyzeWorksheet) {
            const analysis = agent.analyzeWorksheet(worksheetData);
            
            // Generate recommendations if not already included
            if (!analysis.recommendations && agent.generateRecommendations) {
                analysis.recommendations = agent.generateRecommendations(analysis);
            }
            
            return analysis;
        }
        
        // Fallback analysis
        return analyzeDimensionResponses(agent, worksheetData);
    }
    
    // ========================================
    // Enhanced Results Display
    // ========================================
    
    function displayEnhancedAnalysisResults(analysis, agent) {
        const analysisContent = document.getElementById('analysis-content');
        if (!analysisContent) {
            console.error('❌ Analysis content container not found');
            return;
        }
        
        const scoreColor = analysis.overallScore >= 80 ? '#4CAF50' :
                          analysis.overallScore >= 60 ? '#FF9800' : '#F44336';
        
        let html = `
            <div class="enhanced-analysis-results">
                <!-- Agent Information -->
                <div class="agent-info">
                    <h3>Analysis by: ${agent.name}</h3>
                    <p>${agent.description}</p>
                </div>
                
                <!-- Overall Score -->
                <div class="overall-score-section">
                    <div class="score-display">
                        <div class="score-value" style="color: ${scoreColor};">
                            ${analysis.overallScore}%
                        </div>
                        <div class="score-label">Overall Score</div>
                        <div class="maturity-level">
                            ${analysis.maturityLevel ? `
                                <span class="maturity-badge">${analysis.maturityLevel.level}</span>
                                <p>${analysis.maturityLevel.description}</p>
                            ` : ''}
                        </div>
                    </div>
                </div>
                
                <!-- Dimension Scores -->
                <div class="dimension-scores-section">
                    <h3>Dimension Analysis</h3>
                    <div class="dimension-cards">
                        ${analysis.dimensionBreakdown.map(dim => {
                            const dimColor = dim.score >= 80 ? '#4CAF50' :
                                           dim.score >= 60 ? '#FF9800' : '#F44336';
                            
                            return `
                                <div class="dimension-score-card">
                                    <div class="dimension-header">
                                        <h4>${dim.dimensionName}</h4>
                                        <span class="dimension-weight">${dim.weight}% weight</span>
                                    </div>
                                    <div class="dimension-score">
                                        <div class="score-bar-container">
                                            <div class="score-bar" style="width: ${dim.score}%; background: ${dimColor};"></div>
                                        </div>
                                        <span class="score-text">${dim.score}/100</span>
                                    </div>
                                    <div class="dimension-feedback">
                                        <p>${dim.feedback}</p>
                                    </div>
                                    ${dim.strengths.length > 0 ? `
                                        <div class="dimension-strengths">
                                            <strong>✅ Strengths:</strong>
                                            <ul>
                                                ${dim.strengths.map(s => `<li>${s}</li>`).join('')}
                                            </ul>
                                        </div>
                                    ` : ''}
                                    ${dim.improvements.length > 0 ? `
                                        <div class="dimension-improvements">
                                            <strong>⚡ Improvements:</strong>
                                            <ul>
                                                ${dim.improvements.map(i => `<li>${i}</li>`).join('')}
                                            </ul>
                                        </div>
                                    ` : ''}
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                
                <!-- Patterns -->
                ${analysis.patterns && analysis.patterns.length > 0 ? `
                    <div class="patterns-section">
                        <h3>Identified Patterns</h3>
                        <div class="patterns-list">
                            ${analysis.patterns.map(pattern => `
                                <div class="pattern-item ${pattern.type}">
                                    <h4>${pattern.description}</h4>
                                    ${pattern.dimensions ? `
                                        <p>Affected dimensions: ${pattern.dimensions.join(', ')}</p>
                                    ` : ''}
                                    <p class="pattern-implication">${pattern.implication}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <!-- Recommendations -->
                ${analysis.recommendations && analysis.recommendations.length > 0 ? `
                    <div class="recommendations-section">
                        <h3>Strategic Recommendations</h3>
                        <div class="recommendations-list">
                            ${analysis.recommendations.map((rec, index) => {
                                const priorityColor = rec.priority === 'CRITICAL' ? '#DC2626' :
                                                    rec.priority === 'HIGH' ? '#EF4444' :
                                                    rec.priority === 'MEDIUM' ? '#F59E0B' : '#10B981';
                                
                                return `
                                    <div class="recommendation-card">
                                        <div class="rec-header">
                                            <span class="rec-number">${index + 1}</span>
                                            <h4>${rec.area}</h4>
                                            <span class="rec-priority" style="background: ${priorityColor};">
                                                ${rec.priority}
                                            </span>
                                            <span class="rec-impact">
                                                ${rec.impact}
                                            </span>
                                        </div>
                                        <p class="rec-action">${rec.action}</p>
                                        <div class="rec-details">
                                            <span class="rec-effort">Effort: ${rec.effort}</span>
                                            <span class="rec-timeline">Timeline: ${rec.timeline}</span>
                                        </div>
                                        ${rec.specificSteps && rec.specificSteps.length > 0 ? `
                                            <div class="rec-steps">
                                                <strong>Action Steps:</strong>
                                                <ol>
                                                    ${rec.specificSteps.map(step => `<li>${step}</li>`).join('')}
                                                </ol>
                                            </div>
                                        ` : ''}
                                        ${rec.successMetrics && rec.successMetrics.length > 0 ? `
                                            <div class="rec-metrics">
                                                <strong>Success Metrics:</strong>
                                                <ul>
                                                    ${rec.successMetrics.map(metric => `<li>${metric}</li>`).join('')}
                                                </ul>
                                            </div>
                                        ` : ''}
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <!-- Action Buttons -->
                <div class="analysis-actions">
                    <button class="btn btn-secondary" onclick="switchTab('workspace', null); document.querySelector('[data-tab=workspace]').click();">
                        ← Refine Responses
                    </button>
                    <button class="btn btn-primary" onclick="exportAnalysis()">
                        📄 Export Analysis
                    </button>
                    <button class="btn btn-success" onclick="showScoreHistory()">
                        📈 View History
                    </button>
                </div>
            </div>
        `;
        
        analysisContent.innerHTML = html;
        console.log(`✅ Displayed enhanced analysis results for ${agent.name}`);
    }
    
    // ========================================
    // Helper Functions
    // ========================================
    
    function detectSubcomponentFromPage() {
        // Try to detect from page URL or title
        const path = window.location.pathname;
        const match = path.match(/block-(\d+)-(\d+)/);
        if (match) {
            return `${match[1]}-${match[2]}`;
        }
        
        // Fallback to checking module config if available
        if (window.moduleConfig && window.moduleConfig.moduleId) {
            return window.moduleConfig.moduleId;
        }
        
        return '1-1'; // Default fallback
    }
    
    function validateResponses(worksheetData) {
        let hasContent = false;
        for (const key in worksheetData) {
            if (worksheetData[key].value && worksheetData[key].value.trim().length > 0) {
                hasContent = true;
                break;
            }
        }
        return hasContent;
    }
    
    function switchToAnalysisTab() {
        const analysisTabButton = document.querySelector('[data-tab="analysis"]');
        if (analysisTabButton) {
            analysisTabButton.click();
            console.log('🔄 Switched to Analysis tab');
        }
    }
    
    function showAnalysisLoading(agent) {
        const analysisContent = document.getElementById('analysis-content');
        if (analysisContent) {
            analysisContent.innerHTML = `
                <div style="text-align: center; padding: 60px 20px;">
                    <div style="font-size: 48px; margin-bottom: 20px; animation: pulse 1.5s infinite;">🤖</div>
                    <h3 style="font-size: 24px; margin-bottom: 10px; color: #FF5500;">
                        Analyzing with ${agent.name}...
                    </h3>
                    <p style="font-size: 16px; color: #999;">
                        Evaluating ${agent.dimensions.length} dimensions for comprehensive insights
                    </p>
                    <div style="margin-top: 20px;">
                        <div style="width: 200px; height: 4px; background: rgba(255, 255, 255, 0.1); border-radius: 2px; margin: 0 auto; overflow: hidden;">
                            <div style="width: 100%; height: 100%; background: linear-gradient(90deg, transparent, #FF5500, transparent); animation: loading 1.5s linear infinite;"></div>
                        </div>
                    </div>
                </div>
            `;
        }
    }
    
    function showAnalysisError(error) {
        const analysisContent = document.getElementById('analysis-content');
        if (analysisContent) {
            analysisContent.innerHTML = `
                <div style="text-align: center; padding: 60px 20px;">
                    <div style="font-size: 48px; margin-bottom: 20px;">❌</div>
                    <h3 style="font-size: 24px; margin-bottom: 10px; color: #F44336;">Analysis Failed</h3>
                    <p style="font-size: 16px; color: #999; margin-bottom: 20px;">${error.message || 'An error occurred during analysis'}</p>
                    <button class="btn btn-primary" onclick="window.analyzeWorksheet()">
                        Try Again
                    </button>
                </div>
            `;
        }
    }
    
    function showError(message) {
        showNotification(message, 'error');
    }
    
    function showNotification(message, type = 'info') {
        if (typeof window.showNotification === 'function') {
            window.showNotification(message, type);
            return;
        }
        
        const notification = document.createElement('div');
        const bgColor = type === 'success' ? '#4CAF50' :
                       type === 'error' ? '#F44336' :
                       type === 'warning' ? '#FF9800' : '#2196F3';
        
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
    
    function getUserId() {
        return localStorage.getItem('userId') || 'default';
    }
    
    function loadSavedDimensionResponses(agent) {
        try {
            const saved = localStorage.getItem(`worksheet_${agent.id}`);
            if (saved) {
                const data = JSON.parse(saved);
                Object.keys(data.responses || {}).forEach(fieldId => {
                    const field = document.getElementById(fieldId);
                    if (field) {
                        field.value = data.responses[fieldId].value || '';
                        // Trigger input event to update character counter
                        field.dispatchEvent(new Event('input'));
                    }
                });
                console.log('✅ Loaded saved dimension responses');
            }
        } catch (error) {
            console.error('Error loading saved responses:', error);
        }
    }
    
    // ========================================
    // Fallback Functions
    // ========================================
    
    function generateDimensionQuestions(agentConfig) {
        return agentConfig.scoringDimensions.map((dimension, index) => ({
            id: `dimension-${index + 1}`,
            dimensionName: dimension.name,
            dimensionWeight: dimension.weight,
            question: `How would you rate your current performance in ${dimension.name}? ${dimension.description}`,
            hint: dimension.description,
            guidanceText: `Consider specific examples, metrics, and evidence when describing your ${dimension.name.toLowerCase()} approach.`,
            exampleAnswer: {
                good: `We have a systematic approach to ${dimension.name.toLowerCase()} with clear metrics and regular reviews...`,
                poor: `We haven't really focused on ${dimension.name.toLowerCase()} yet...`
            },
            metadata: {
                type: 'strategic',
                required: true,
                minLength: 100,
                maxLength: 1000
            }
        }));
    }
    
    function analyzeDimensionResponses(agentConfig, responses) {
        const dimensionScores = agentConfig.scoringDimensions.map((dimension, index) => {
            const response = responses[`dimension-${index + 1}`];
            const score = calculateDimensionScore(response);
            
            return {
                dimensionName: dimension.name,
                weight: dimension.weight,
                score: score,
                feedback: generateDimensionFeedback(dimension, score),
                strengths: score >= 70 ? [`Good understanding of ${dimension.name}`] : [],
                improvements: score < 90 ? [`Enhance ${dimension.name} with more specific examples`] : []
            };
        });
        
        const overallScore = Math.round(
            dimensionScores.reduce((sum, dim) => sum + (dim.score * dim.weight / 100), 0)
        );
        
        return {
            overallScore: overallScore,
            dimensionBreakdown: dimensionScores,
            patterns: detectPatterns(dimensionScores),
            strengths: dimensionScores.filter(d => d.score >= 70).map(d => d.dimensionName),
            weaknesses: dimensionScores.filter(d => d.score < 70).map(d => d.dimensionName),
            maturityLevel: getMaturityLevel(overallScore),
            recommendations: generateRecommendations(dimensionScores)
        };
    }
    
    function calculateDimensionScore(response) {
        if (!response || !response.value) return 30;
        
        const text = response.value;
        let score = 40; // Base score
        
        // Check for quality indicators
        if (text.length >= 100) score += 10;
        if (text.length >= 200) score += 10;
        if (/\d+/.test(text)) score += 10; // Has numbers
        if (/specific|example|instance/i.test(text)) score += 10;
        if (/measure|metric|KPI/i.test(text)) score += 10;
        if (/plan|strategy|approach/i.test(text)) score += 10;
        
        return Math.min(100, score);
    }
    
    function generateDimensionFeedback(dimension, score) {
        if (score >= 80) return `Excellent understanding of ${dimension.name}. Keep refining your approach.`;
        if (score >= 60) return `Good foundation in ${dimension.name}. Add more specific examples and metrics.`;
        if (score >= 40) return `Developing understanding of ${dimension.name}. Focus on concrete implementation details.`;
        return `${dimension.name} needs significant attention. Start with basic concepts and build from there.`;
    }
    
    function detectPatterns(dimensionScores) {
        const patterns = [];
        const avgScore = dimensionScores.reduce((sum, d) => sum + d.score, 0) / dimensionScores.length;
        
        if (avgScore >= 80) {
            patterns.push({
                type: 'strength_pattern',
                description: 'Consistent high performance across dimensions',
                implication: 'Ready for advanced optimization'
            });
        } else if (avgScore < 60) {
            patterns.push({
                type: 'weakness_pattern',
                description: 'Multiple dimensions need improvement',
                implication: 'Focus on foundational development'
            });
        }
        
        return patterns;
    }
    
    function getMaturityLevel(score) {
        if (score >= 85) return { level: 'Advanced', description: 'Ready for scaling' };
        if (score >= 70) return { level: 'Proficient', description: 'Solid foundation' };
        if (score >= 55) return { level: 'Developing', description: 'Building capabilities' };
        if (score >= 40) return { level: 'Emerging', description: 'Early stage' };
        return { level: 'Initial', description: 'Just starting' };
    }
    
    function generateRecommendations(dimensionScores) {
        return dimensionScores
            .filter(d => d.score < 80)
            .map(d => ({
                area: d.dimensionName,
                priority: d.score < 60 ? 'HIGH' : 'MEDIUM',
                action: `Improve ${d.dimensionName} performance`,
                impact: `+${Math.min(20, 100 - d.score)} points`,
                effort: d.score < 50 ? 'High' : 'Medium',
                timeline: d.score < 50 ? '2-4 weeks' : '1-2 months',
                specificSteps: [
                    `Assess current ${d.dimensionName} practices`,
                    `Define improvement metrics`,
                    `Implement quick wins`,
                    `Monitor progress weekly`
                ]
            }))
            .slice(0, 5);
    }
    
    function generateEducationContent(agentConfig) {
        return {
            overview: {
                title: `Understanding ${agentConfig.name}`,
                description: agentConfig.description,
                importance: 'Critical for GTM success',
                objectives: ['Master key dimensions', 'Identify improvements', 'Create action plans']
            },
            keyPrinciples: agentConfig.scoringDimensions.map(d => ({
                principle: d.name,
                explanation: d.description,
                weight: `${d.weight}% of total score`,
                whyItMatters: `Essential for effective ${agentConfig.name.toLowerCase()}`,
                indicators: {
                    strong: 'Clear evidence and metrics',
                    developing: 'Some understanding present',
                    weak: 'Limited or no focus'
                }
            })),
            useCases: [
                {
                    title: 'Startup Example',
                    scenario: 'Early-stage company',
                    application: 'Foundation building',
                    challenges: ['Limited resources', 'Unclear direction'],
                    solutions: ['Focus on core dimensions', 'Rapid iteration'],
                    outcome: 'Clear GTM foundation'
                }
            ],
            bestPractices: agentConfig.scoringDimensions.map(d => ({
                dimension: d.name,
                practices: [`Regular ${d.name.toLowerCase()} assessment`, 'Clear metrics', 'Documentation'],
                metrics: ['Score improvement', 'Implementation progress']
            })),
            commonMistakes: [
                {
                    mistake: 'Ignoring weak dimensions',
                    impact: 'Imbalanced GTM strategy',
                    solution: 'Address all dimensions systematically'
                }
            ],
            resources: {
                templates: ['Assessment template', 'Action plan'],
                guides: ['Quick start guide', 'Best practices'],
                tools: ['Self-assessment', 'Score calculator'],
                examples: ['Success stories', 'Case studies']
            }
        };
    }
    
    async function persistAnalysis(agentId, agentConfig, analysis, userId) {
        const persistenceData = {
            analysisId: 'analysis_' + Date.now(),
            agentId: agentId,
            agentName: agentConfig.name,
            userId: userId || 'default',
            timestamp: new Date().toISOString(),
            overallScore: analysis.overallScore,
            dimensionScores: analysis.dimensionBreakdown,
            recommendations: analysis.recommendations
        };
        
        // Save to localStorage
        const history = JSON.parse(localStorage.getItem('scoreHistory') || '[]');
        history.push(persistenceData);
        localStorage.setItem('scoreHistory', JSON.stringify(history));
        
        console.log('✅ Analysis persisted:', persistenceData.analysisId);
        return persistenceData;
    }
    
    function loadAgentLibrary() {
        // This would normally load from agent-library.js
        // For now, we'll use a minimal structure
        console.log('⚠️ Agent library not loaded, using minimal fallback');
    }
    
    // ========================================
    // Global Functions
    // ========================================
    
    window.showDimensionGuidance = function(dimensionName, index) {
        const guidanceDiv = document.getElementById(`guidance-${index + 1}`);
        if (guidanceDiv) {
            guidanceDiv.style.display = guidanceDiv.style.display === 'none' ? 'block' : 'none';
        }
    };
    
    window.showDimensionExample = function(dimensionName, index) {
        const exampleDiv = document.getElementById(`example-${index + 1}`);
        if (exampleDiv) {
            exampleDiv.style.display = exampleDiv.style.display === 'none' ? 'block' : 'none';
        }
    };
    
    window.exportAnalysis = function() {
        showNotification('Export feature coming soon!', 'info');
    };
    
    window.showScoreHistory = function() {
        const history = JSON.parse(localStorage.getItem('scoreHistory') || '[]');
        console.log('Score History:', history);
        showNotification(`You have ${history.length} analyses in history`, 'info');
    };
    
    // Export for debugging
    window.enhancedUnifiedAnalysisHandler = {
        getAgentForSubcomponent,
        collectDimensionResponses,
        displayDimensionWorksheet,
        displayEducationContent,
        performAgentAnalysis,
        displayEnhancedAnalysisResults
    };
    
    console.log('✅ Enhanced Unified Analysis Handler ready - Dimension-based system active!');
})();
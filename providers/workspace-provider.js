/**
 * Workspace Content Provider
 * Manages fetching and rendering of workspace/questionnaire content
 */

class WorkspaceContentProvider {
    constructor() {
        this.cache = new Map();
        this.DEBUG_MODE = window.location.hostname === 'localhost';
    }

    /**
     * Fetch workspace content for a subcomponent
     */
    async fetch(subcomponentId) {
        try {
            // Check cache first
            const cacheKey = `workspace:${subcomponentId}`;
            if (this.cache.has(cacheKey)) {
                if (this.DEBUG_MODE) {
                    console.log(`⚡ Cache hit for Workspace Content: ${subcomponentId}`);
                }
                return this.cache.get(cacheKey);
            }

            // Fetch from SSOT API
            const response = await fetch(`/api/subcomponents/${subcomponentId}`);
            if (!response.ok) {
                throw new Error(`API returned ${response.status}`);
            }

            const data = await response.json();
            
            // Extract workspace content
            const workspaceContent = data.workspace || data.questions || {};
            
            // Cache the result
            this.cache.set(cacheKey, workspaceContent);
            
            if (this.DEBUG_MODE) {
                console.log(`✅ Fetched workspace content for ${subcomponentId}`);
            }

            return workspaceContent;
            
        } catch (error) {
            console.error(`Error fetching Workspace Content for ${subcomponentId}:`, error);
            return null;
        }
    }

    /**
     * Render workspace content into HTML
     */
    async render(content) {
        if (!content || Object.keys(content).length === 0) {
            return this.renderEmpty();
        }

        // Handle different workspace content structures
        let questions = [];
        
        if (Array.isArray(content)) {
            questions = content;
        } else if (content.questions && Array.isArray(content.questions)) {
            questions = content.questions;
        } else if (content.items && Array.isArray(content.items)) {
            questions = content.items;
        } else {
            // Try to extract questions from object properties
            questions = this.extractQuestionsFromObject(content);
        }

        if (questions.length === 0) {
            return this.renderEmpty();
        }

        const html = `
            <div class="workspace-content-container">
                <div class="workspace-header">
                    <h3 class="workspace-title">
                        <span class="icon">📝</span>
                        Workspace Assessment
                    </h3>
                    <p class="workspace-description">
                        Answer these questions to evaluate your current state and identify improvement opportunities:
                    </p>
                </div>
                <form class="workspace-form" id="workspace-form">
                    <div class="questions-container">
                        ${questions.map((q, index) => this.renderQuestion(q, index)).join('')}
                    </div>
                    <div class="workspace-actions">
                        <button type="button" class="btn-save-draft" onclick="window.saveWorkspaceDraft && window.saveWorkspaceDraft()">
                            <span class="icon">💾</span> Save Draft
                        </button>
                        <button type="submit" class="btn-analyze">
                            <span class="icon">📊</span> Analyze Results
                        </button>
                    </div>
                </form>
            </div>
        `;

        return html;
    }

    /**
     * Extract questions from object structure
     */
    extractQuestionsFromObject(obj) {
        const questions = [];
        
        // Look for numbered properties (q1, q2, etc.)
        for (const key of Object.keys(obj).sort()) {
            if (key.match(/^q\d+$/i) || key.match(/^question\d+$/i)) {
                questions.push(obj[key]);
            }
        }
        
        // If no numbered properties, treat each property as a question
        if (questions.length === 0) {
            for (const [key, value] of Object.entries(obj)) {
                if (typeof value === 'string') {
                    questions.push({
                        id: key,
                        text: value,
                        type: 'text'
                    });
                } else if (typeof value === 'object' && value.text) {
                    questions.push({
                        id: key,
                        ...value
                    });
                }
            }
        }
        
        return questions;
    }

    /**
     * Render a single question
     */
    renderQuestion(question, index) {
        // Handle different question structures
        const id = question.id || `q${index + 1}`;
        const text = question.text || question.question || question.label || question;
        const type = question.type || 'text';
        const required = question.required !== false;
        const placeholder = question.placeholder || 'Enter your answer...';
        const help = question.help || question.description || '';
        const options = question.options || question.choices || [];
        const validation = question.validation || {};

        let inputHtml = '';
        
        switch (type) {
            case 'text':
            case 'short':
                inputHtml = `
                    <input 
                        type="text" 
                        id="${id}" 
                        name="${id}" 
                        class="form-input"
                        placeholder="${this.escapeHtml(placeholder)}"
                        ${required ? 'required' : ''}
                        ${validation.maxLength ? `maxlength="${validation.maxLength}"` : ''}
                    />
                `;
                break;
                
            case 'textarea':
            case 'long':
                inputHtml = `
                    <textarea 
                        id="${id}" 
                        name="${id}" 
                        class="form-textarea"
                        placeholder="${this.escapeHtml(placeholder)}"
                        rows="4"
                        ${required ? 'required' : ''}
                        ${validation.maxLength ? `maxlength="${validation.maxLength}"` : ''}
                    ></textarea>
                `;
                break;
                
            case 'select':
            case 'dropdown':
                inputHtml = `
                    <select 
                        id="${id}" 
                        name="${id}" 
                        class="form-select"
                        ${required ? 'required' : ''}
                    >
                        <option value="">Select an option...</option>
                        ${options.map(opt => {
                            const value = opt.value || opt;
                            const label = opt.label || opt.text || opt;
                            return `<option value="${this.escapeHtml(value)}">${this.escapeHtml(label)}</option>`;
                        }).join('')}
                    </select>
                `;
                break;
                
            case 'radio':
                inputHtml = `
                    <div class="radio-group">
                        ${options.map((opt, i) => {
                            const value = opt.value || opt;
                            const label = opt.label || opt.text || opt;
                            const optId = `${id}_${i}`;
                            return `
                                <label class="radio-label" for="${optId}">
                                    <input 
                                        type="radio" 
                                        id="${optId}" 
                                        name="${id}" 
                                        value="${this.escapeHtml(value)}"
                                        ${required && i === 0 ? 'required' : ''}
                                    />
                                    <span>${this.escapeHtml(label)}</span>
                                </label>
                            `;
                        }).join('')}
                    </div>
                `;
                break;
                
            case 'checkbox':
                inputHtml = `
                    <div class="checkbox-group">
                        ${options.map((opt, i) => {
                            const value = opt.value || opt;
                            const label = opt.label || opt.text || opt;
                            const optId = `${id}_${i}`;
                            return `
                                <label class="checkbox-label" for="${optId}">
                                    <input 
                                        type="checkbox" 
                                        id="${optId}" 
                                        name="${id}" 
                                        value="${this.escapeHtml(value)}"
                                    />
                                    <span>${this.escapeHtml(label)}</span>
                                </label>
                            `;
                        }).join('')}
                    </div>
                `;
                break;
                
            case 'scale':
            case 'rating':
                const min = question.min || 1;
                const max = question.max || 10;
                inputHtml = `
                    <div class="scale-container">
                        <input 
                            type="range" 
                            id="${id}" 
                            name="${id}" 
                            class="form-range"
                            min="${min}" 
                            max="${max}" 
                            value="${Math.floor((min + max) / 2)}"
                            ${required ? 'required' : ''}
                        />
                        <div class="scale-labels">
                            <span>${min}</span>
                            <span class="scale-value" id="${id}_value">${Math.floor((min + max) / 2)}</span>
                            <span>${max}</span>
                        </div>
                    </div>
                    <script>
                        document.getElementById('${id}').addEventListener('input', function(e) {
                            document.getElementById('${id}_value').textContent = e.target.value;
                        });
                    </script>
                `;
                break;
                
            case 'number':
                inputHtml = `
                    <input 
                        type="number" 
                        id="${id}" 
                        name="${id}" 
                        class="form-input"
                        placeholder="${this.escapeHtml(placeholder)}"
                        ${required ? 'required' : ''}
                        ${validation.min !== undefined ? `min="${validation.min}"` : ''}
                        ${validation.max !== undefined ? `max="${validation.max}"` : ''}
                        ${validation.step !== undefined ? `step="${validation.step}"` : ''}
                    />
                `;
                break;
                
            default:
                inputHtml = `
                    <input 
                        type="text" 
                        id="${id}" 
                        name="${id}" 
                        class="form-input"
                        placeholder="${this.escapeHtml(placeholder)}"
                        ${required ? 'required' : ''}
                    />
                `;
        }

        return `
            <div class="question-container" data-question-id="${id}">
                <label class="question-label" for="${id}">
                    <span class="question-number">${index + 1}.</span>
                    <span class="question-text">${this.escapeHtml(text)}</span>
                    ${required ? '<span class="required-indicator">*</span>' : ''}
                </label>
                ${help ? `<p class="question-help">${this.escapeHtml(help)}</p>` : ''}
                <div class="question-input">
                    ${inputHtml}
                </div>
            </div>
        `;
    }

    /**
     * Render empty state
     */
    renderEmpty() {
        return `
            <div class="workspace-content-empty">
                <p>No workspace questions available for this component.</p>
            </div>
        `;
    }

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        if (typeof text !== 'string') {
            text = String(text);
        }
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Save workspace answers
     */
    async saveAnswers(subcomponentId, answers) {
        try {
            const response = await fetch('/api/save-workspace-answers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    subcomponentId,
                    answers,
                    timestamp: new Date().toISOString()
                })
            });

            if (!response.ok) {
                throw new Error(`Failed to save: ${response.status}`);
            }

            const result = await response.json();
            console.log('✅ Workspace answers saved successfully');
            return result;
            
        } catch (error) {
            console.error('Error saving workspace answers:', error);
            throw error;
        }
    }

    /**
     * Load saved answers
     */
    async loadAnswers(subcomponentId) {
        try {
            const response = await fetch(`/api/workspace-answers/${subcomponentId}`);
            if (!response.ok) {
                if (response.status === 404) {
                    return null; // No saved answers
                }
                throw new Error(`Failed to load: ${response.status}`);
            }

            const answers = await response.json();
            console.log('✅ Loaded saved workspace answers');
            return answers;
            
        } catch (error) {
            console.error('Error loading workspace answers:', error);
            return null;
        }
    }

    /**
     * Clear cache
     */
    clearCache() {
        this.cache.clear();
        console.log('🗑️ Cleared Workspace Content cache');
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WorkspaceContentProvider;
} else {
    window.WorkspaceContentProvider = WorkspaceContentProvider;
}
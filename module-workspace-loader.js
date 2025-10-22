// Module Workspace Loader
// This script provides workspace field generation for all modules

window.ModuleWorkspaceLoader = {
    // Get field configurations for each module
    getFieldConfigurations: function(blockId, subcomponentId) {
        // Default configuration for all modules
        const defaultFields = [
            {
                label: "Current Situation",
                placeholder: "Describe your current state or challenge...",
                hint: "Be specific about where you are now"
            },
            {
                label: "Desired Outcome",
                placeholder: "What does success look like?",
                hint: "Define clear, measurable goals"
            },
            {
                label: "Key Stakeholders",
                placeholder: "Who is involved or affected?",
                hint: "List all relevant parties"
            },
            {
                label: "Resources Available",
                placeholder: "What resources do you have?",
                hint: "Include time, budget, team, tools"
            },
            {
                label: "Constraints & Risks",
                placeholder: "What limitations or risks exist?",
                hint: "Be honest about challenges"
            },
            {
                label: "Success Metrics",
                placeholder: "How will you measure success?",
                hint: "Define specific KPIs"
            }
        ];

        // Module-specific overrides
        const moduleSpecificFields = {
            '4-1': [ // Prototype Launch - Feature Inclusion
                {
                    label: "Core Features",
                    placeholder: "List the must-have features for your MVP...",
                    hint: "Focus on solving the core problem"
                },
                {
                    label: "Nice-to-Have Features",
                    placeholder: "Features that can wait for v2...",
                    hint: "Be ruthless about scope"
                },
                {
                    label: "User Stories",
                    placeholder: "As a [user], I want to [action] so that [benefit]...",
                    hint: "Write from the user's perspective"
                },
                {
                    label: "Technical Requirements",
                    placeholder: "What technical capabilities are needed?",
                    hint: "Consider infrastructure, APIs, data"
                },
                {
                    label: "Timeline",
                    placeholder: "When does each feature need to be ready?",
                    hint: "Be realistic about development time"
                },
                {
                    label: "Success Criteria",
                    placeholder: "How will you know the feature works?",
                    hint: "Define acceptance criteria"
                }
            ],
            '5-1': [ // Early Adopter Acquisition - Target Identification
                {
                    label: "Ideal Customer Profile",
                    placeholder: "Describe your perfect early adopter...",
                    hint: "Be specific about demographics and psychographics"
                },
                {
                    label: "Pain Points",
                    placeholder: "What problems do they face?",
                    hint: "Focus on urgent and important problems"
                },
                {
                    label: "Current Solutions",
                    placeholder: "How do they solve this problem today?",
                    hint: "Understand their current alternatives"
                },
                {
                    label: "Decision Criteria",
                    placeholder: "What factors influence their decisions?",
                    hint: "Price, features, support, etc."
                },
                {
                    label: "Channels",
                    placeholder: "Where can you reach them?",
                    hint: "Online communities, events, publications"
                },
                {
                    label: "Value Proposition",
                    placeholder: "Why should they choose you?",
                    hint: "Clear, compelling reason to switch"
                }
            ],
            '7-1': [ // Sales Process - Pipeline Development
                {
                    label: "Pipeline Stages",
                    placeholder: "Define your sales pipeline stages...",
                    hint: "Lead → Qualified → Demo → Proposal → Close"
                },
                {
                    label: "Stage Criteria",
                    placeholder: "What qualifies a lead for each stage?",
                    hint: "Clear entry and exit criteria"
                },
                {
                    label: "Conversion Rates",
                    placeholder: "Target conversion rates between stages...",
                    hint: "Be realistic based on industry benchmarks"
                },
                {
                    label: "Sales Activities",
                    placeholder: "Key activities at each stage...",
                    hint: "Calls, emails, demos, proposals"
                },
                {
                    label: "Tools & Resources",
                    placeholder: "What tools support each stage?",
                    hint: "CRM, email templates, demo scripts"
                },
                {
                    label: "Timeline",
                    placeholder: "Average time in each stage...",
                    hint: "Track velocity through pipeline"
                }
            ]
        };

        const moduleKey = `${blockId}-${subcomponentId}`;
        return moduleSpecificFields[moduleKey] || defaultFields;
    },

    // Generate workspace fields HTML
    generateWorkspaceFields: function(blockId, subcomponentId) {
        const fieldConfigs = this.getFieldConfigurations(blockId, subcomponentId);
        
        let html = '';
        fieldConfigs.forEach((field, index) => {
            html += `
                <div class="workspace-field">
                    <label class="field-label" for="field-${index + 1}">
                        ${field.label}
                    </label>
                    <textarea 
                        id="field-${index + 1}"
                        class="field-input"
                        placeholder="${field.placeholder}"
                        rows="4"
                    ></textarea>
                    ${field.hint ? `<p class="field-hint" style="color: #999; font-size: 12px; margin-top: 5px;">${field.hint}</p>` : ''}
                </div>
            `;
        });
        
        return html;
    },

    // Load workspace fields into container
    loadWorkspaceFields: function(blockId, subcomponentId) {
        console.log(`Loading workspace fields for module ${blockId}-${subcomponentId}`);
        const container = document.getElementById('workspace-fields');
        if (container) {
            // Clear existing content and reload
            container.innerHTML = this.generateWorkspaceFields(blockId, subcomponentId);
            console.log(`Loaded workspace fields for module ${blockId}-${subcomponentId}`);
            
            // Load saved progress if exists
            this.loadSavedProgress(blockId, subcomponentId);
        } else {
            console.error('Workspace fields container not found');
        }
    },

    // Save progress to localStorage
    saveProgress: function(blockId, subcomponentId) {
        const data = {};
        
        // Collect all field values
        for (let i = 1; i <= 6; i++) {
            const field = document.getElementById('field-' + i);
            if (field) {
                data['field-' + i] = field.value || '';
            }
        }
        
        const key = `worksheet_${blockId}-${subcomponentId}`;
        try {
            localStorage.setItem(key, JSON.stringify({
                data: data,
                timestamp: new Date().toISOString(),
                moduleId: `${blockId}-${subcomponentId}`
            }));
            
            this.showNotification('Progress saved successfully!', 'success');
            return true;
        } catch (error) {
            console.error('Error saving progress:', error);
            this.showNotification('Failed to save progress', 'error');
            return false;
        }
    },

    // Load saved progress
    loadSavedProgress: function(blockId, subcomponentId) {
        try {
            const key = `worksheet_${blockId}-${subcomponentId}`;
            const saved = localStorage.getItem(key);
            
            if (saved) {
                const { data } = JSON.parse(saved);
                
                // Restore field values
                Object.keys(data).forEach(fieldId => {
                    const field = document.getElementById(fieldId);
                    if (field) {
                        field.value = data[fieldId];
                    }
                });
                
                console.log('Loaded saved progress for module', blockId + '-' + subcomponentId);
            }
        } catch (error) {
            console.error('Error loading saved progress:', error);
        }
    },

    // Show notification
    showNotification: function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = 'notification ' + type;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            background: ${type === 'success' ? '#10B981' : 
                       type === 'error' ? '#EF4444' : '#2196F3'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    },

    // Collect worksheet data for analysis
    collectWorksheetData: function() {
        const data = {};
        
        // Collect all field values
        for (let i = 1; i <= 6; i++) {
            const field = document.getElementById('field-' + i);
            if (field) {
                data['field-' + i] = field.value || '';
            }
        }
        
        return data;
    }
};

// Make functions globally available for backward compatibility
window.loadWorkspaceFields = function() {
    if (typeof moduleConfig !== 'undefined') {
        ModuleWorkspaceLoader.loadWorkspaceFields(moduleConfig.blockId, moduleConfig.subcomponentId);
    }
};

window.saveProgress = function() {
    if (typeof moduleConfig !== 'undefined') {
        ModuleWorkspaceLoader.saveProgress(moduleConfig.blockId, moduleConfig.subcomponentId);
    }
};

window.collectWorksheetData = function() {
    return ModuleWorkspaceLoader.collectWorksheetData();
};

console.log('📝 Module Workspace Loader initialized');
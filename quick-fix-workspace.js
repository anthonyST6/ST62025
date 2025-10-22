// Quick Fix for Workspace Fields
// This ensures workspace fields load properly for all modules

(function() {
    // Store original loadWorkspaceFields if it exists
    const originalLoadWorkspaceFields = window.loadWorkspaceFields;
    
    // Override loadWorkspaceFields to ensure it works
    window.loadWorkspaceFields = function() {
        console.log('Quick fix loadWorkspaceFields called');
        
        // Get module config
        const blockId = window.moduleConfig ? window.moduleConfig.blockId : 4;
        const subcomponentId = window.moduleConfig ? window.moduleConfig.subcomponentId : 1;
        
        // Check if ModuleWorkspaceLoader exists
        if (typeof window.ModuleWorkspaceLoader !== 'undefined') {
            console.log('Using ModuleWorkspaceLoader');
            window.ModuleWorkspaceLoader.loadWorkspaceFields(blockId, subcomponentId);
        } else {
            console.log('ModuleWorkspaceLoader not found, using fallback');
            
            // Fallback: Generate fields directly
            const container = document.getElementById('workspace-fields');
            if (container) {
                // Module 4-1 specific fields
                const fields = [
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
                ];
                
                let html = '';
                fields.forEach((field, index) => {
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
                
                container.innerHTML = html;
                console.log('Workspace fields loaded via fallback');
            }
        }
    };
    
    // Also ensure it runs when DOM is ready if not already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            // Check if workspace tab is active
            const workspaceTab = document.getElementById('workspace-tab');
            if (workspaceTab && workspaceTab.classList.contains('active')) {
                window.loadWorkspaceFields();
            }
        });
    }
    
    console.log('Quick fix workspace loader initialized');
})();
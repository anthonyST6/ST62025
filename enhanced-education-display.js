
// Enhanced Education Display with Agent Integration
(function() {
    console.log('Loading Enhanced Education Display with Agent Integration');
    
    // Load agent library
    let AgentLibrary = {};
    if (typeof window.AgentLibrary !== 'undefined') {
        AgentLibrary = window.AgentLibrary;
    }
    
    // Function to get agent for current module
    function getModuleAgent(blockId, subId) {
        const agentKey = blockId + String.fromCharCode(96 + subId); // 1a, 1b, etc.
        return AgentLibrary[agentKey] || null;
    }
    
    // Enhanced education content loader
    window.loadEducationContent = async function() {
        try {
            // Get module config
            const blockId = window.moduleConfig?.blockId || 1;
            const subId = window.moduleConfig?.subcomponentId || 1;
            const moduleId = blockId + '-' + subId;
            
            // Get agent for this module
            const agent = getModuleAgent(blockId, subId);
            
            // Try to load from API first
            const response = await fetch('/api/subcomponents/' + moduleId);
            let educationData = {};
            
            if (response.ok) {
                const data = await response.json();
                educationData = data.education || {};
            }
            
            // Display education content with agent enhancement
            const container = document.getElementById('education-content');
            if (container) {
                container.innerHTML = formatEducationContent(educationData, agent);
            }
            
        } catch (error) {
            console.error('Error loading education content:', error);
            // Fallback to agent-generated content
            displayAgentGeneratedContent();
        }
    };
    
    // Format education content with proper rendering
    function formatEducationContent(content, agent) {
        let html = '<div class="education-wrapper">';
        
        // Add agent information if available
        if (agent) {
            html += `
                <div class="agent-info" style="background: rgba(255, 85, 0, 0.1); padding: 20px; border-radius: 12px; margin-bottom: 30px;">
                    <h3 style="color: #FF5500; margin-bottom: 10px;">🤖 Expert Agent: ${agent.name}</h3>
                    <p style="color: #999; line-height: 1.6;">${agent.description}</p>
                </div>
            `;
        }
        
        // Process each education field
        const fields = ['what', 'why', 'how', 'whatIf'];
        
        fields.forEach(field => {
            if (content[field]) {
                const title = field === 'whatIf' ? 'What If' : field.charAt(0).toUpperCase() + field.slice(1);
                html += `<div class="education-section" style="margin-bottom: 30px;">`;
                html += `<h3 style="color: #FF5500; font-size: 20px; margin-bottom: 15px;">${title}</h3>`;
                
                // Handle different content formats
                if (typeof content[field] === 'string') {
                    html += `<p style="color: #ccc; line-height: 1.8;">${content[field]}</p>`;
                } else if (typeof content[field] === 'object') {
                    html += formatComplexContent(content[field]);
                }
                
                html += '</div>';
            }
        });
        
        // Add examples if present
        if (content.examples && Array.isArray(content.examples)) {
            html += `
                <div class="examples-section" style="margin-top: 30px;">
                    <h3 style="color: #FF5500; font-size: 20px; margin-bottom: 15px;">📌 Examples</h3>
                    <ul style="color: #ccc; line-height: 1.8;">
            `;
            content.examples.forEach(example => {
                html += `<li style="margin-bottom: 10px;">${example}</li>`;
            });
            html += '</ul></div>';
        }
        
        // Add how to implement section
        if (content.howToImplement) {
            html += `
                <div class="implementation-section" style="margin-top: 30px; background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 12px;">
                    <h3 style="color: #FF5500; font-size: 20px; margin-bottom: 15px;">🚀 How to Implement</h3>
            `;
            
            if (typeof content.howToImplement === 'object' && content.howToImplement.steps) {
                html += '<ol style="color: #ccc; line-height: 1.8;">';
                content.howToImplement.steps.forEach(step => {
                    html += `<li style="margin-bottom: 15px;">${step}</li>`;
                });
                html += '</ol>';
            } else {
                html += `<p style="color: #ccc; line-height: 1.8;">${content.howToImplement}</p>`;
            }
            
            html += '</div>';
        }
        
        // Add agent scoring dimensions
        if (agent && agent.scoringDimensions) {
            html += `
                <div class="scoring-dimensions" style="margin-top: 30px; background: rgba(0, 0, 0, 0.3); padding: 20px; border-radius: 12px;">
                    <h3 style="color: #FF5500; font-size: 20px; margin-bottom: 15px;">📊 Scoring Dimensions</h3>
                    <div class="dimensions-grid" style="display: grid; gap: 15px;">
            `;
            
            agent.scoringDimensions.forEach(dim => {
                html += `
                    <div style="background: rgba(255, 255, 255, 0.05); padding: 15px; border-radius: 8px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <strong style="color: #FF8800;">${dim.name}</strong>
                            <span style="color: #666;">Weight: ${dim.weight}%</span>
                        </div>
                        <p style="color: #999; font-size: 14px; margin: 0;">${dim.description}</p>
                    </div>
                `;
            });
            
            html += '</div></div>';
        }
        
        html += '</div>';
        return html;
    }
    
    // Format complex nested content
    function formatComplexContent(obj) {
        let html = '<div class="complex-content">';
        
        if (Array.isArray(obj)) {
            html += '<ul style="color: #ccc; line-height: 1.8;">';
            obj.forEach(item => {
                html += `<li style="margin-bottom: 10px;">${item}</li>`;
            });
            html += '</ul>';
        } else if (typeof obj === 'object') {
            Object.keys(obj).forEach(key => {
                const value = obj[key];
                const formattedKey = key.replace(/([A-Z])/g, ' $1').trim();
                
                html += `<div style="margin-bottom: 20px;">`;
                html += `<h4 style="color: #FF8800; margin-bottom: 10px;">${formattedKey}</h4>`;
                
                if (typeof value === 'string') {
                    html += `<p style="color: #ccc; line-height: 1.8;">${value}</p>`;
                } else if (Array.isArray(value)) {
                    html += '<ul style="color: #ccc; line-height: 1.8;">';
                    value.forEach(item => {
                        html += `<li style="margin-bottom: 8px;">${item}</li>`;
                    });
                    html += '</ul>';
                } else if (typeof value === 'object') {
                    html += formatComplexContent(value);
                }
                
                html += '</div>';
            });
        }
        
        html += '</div>';
        return html;
    }
    
    // Display agent-generated fallback content
    function displayAgentGeneratedContent() {
        const blockId = window.moduleConfig?.blockId || 1;
        const subId = window.moduleConfig?.subcomponentId || 1;
        const agent = getModuleAgent(blockId, subId);
        
        if (agent) {
            const container = document.getElementById('education-content');
            if (container) {
                container.innerHTML = `
                    <div class="agent-fallback" style="background: rgba(255, 85, 0, 0.05); padding: 30px; border-radius: 12px;">
                        <h3 style="color: #FF5500; margin-bottom: 20px;">🤖 Agent-Generated Content</h3>
                        <div class="agent-details">
                            <h4 style="color: #FF8800; margin-bottom: 10px;">${agent.name}</h4>
                            <p style="color: #ccc; line-height: 1.8; margin-bottom: 20px;">${agent.description}</p>
                            
                            <div class="evaluation-criteria" style="background: rgba(0, 0, 0, 0.5); padding: 20px; border-radius: 8px;">
                                <h5 style="color: #FF5500; margin-bottom: 15px;">Evaluation Criteria</h5>
                                ${Object.entries(agent.evaluationCriteria || {}).map(([range, desc]) => `
                                    <div style="margin-bottom: 10px;">
                                        <span style="color: #FF8800; font-weight: bold;">${range}%:</span>
                                        <span style="color: #999; margin-left: 10px;">${desc}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;
            }
        }
    }
    
    // Auto-initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            if (typeof window.loadEducationContent === 'function') {
                window.loadEducationContent();
            }
        });
    } else {
        if (typeof window.loadEducationContent === 'function') {
            window.loadEducationContent();
        }
    }
    
    console.log('Enhanced Education Display with Agent Integration loaded');
})();

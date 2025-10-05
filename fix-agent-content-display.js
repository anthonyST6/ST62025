
// Dynamic Agent Content Loader Fix
// This ensures each subcomponent loads its specific agent content

(function() {
    console.log('🚀 Initializing Dynamic Agent Content System');
    
    // Mapping from subcomponent IDs (1-3) to agent keys (1c)
    const subcomponentToAgentMap = {
        '1-1': '1a', '1-2': '1b', '1-3': '1c', '1-4': '1d', '1-5': '1e', '1-6': '1f',
        '2-1': '2a', '2-2': '2b', '2-3': '2c', '2-4': '2d', '2-5': '2e', '2-6': '2f',
        '3-1': '3a', '3-2': '3b', '3-3': '3c', '3-4': '3d', '3-5': '3e', '3-6': '3f',
        '4-1': '4a', '4-2': '4b', '4-3': '4c', '4-4': '4d', '4-5': '4e', '4-6': '4f',
        '5-1': '5a', '5-2': '5b', '5-3': '5c', '5-4': '5d', '5-5': '5e', '5-6': '5f',
        '6-1': '6a', '6-2': '6b', '6-3': '6c', '6-4': '6d', '6-5': '6e', '6-6': '6f',
        '7-1': '7a', '7-2': '7b', '7-3': '7c', '7-4': '7d', '7-5': '7e', '7-6': '7f',
        '8-1': '8a', '8-2': '8b', '8-3': '8c', '8-4': '8d', '8-5': '8e', '8-6': '8f',
        '9-1': '9a', '9-2': '9b', '9-3': '9c', '9-4': '9d', '9-5': '9e', '9-6': '9f',
        '10-1': '10a', '10-2': '10b', '10-3': '10c', '10-4': '10d', '10-5': '10e', '10-6': '10f',
        '11-1': '11a', '11-2': '11b', '11-3': '11c', '11-4': '11d', '11-5': '11e', '11-6': '11f',
        '12-1': '12a', '12-2': '12b', '12-3': '12c', '12-4': '12d', '12-5': '12e', '12-6': '12f',
        '13-1': '13a', '13-2': '13b', '13-3': '13c', '13-4': '13d', '13-5': '13e', '13-6': '13f',
        '14-1': '14a', '14-2': '14b', '14-3': '14c', '14-4': '14d', '14-5': '14e', '14-6': '14f',
        '15-1': '15a', '15-2': '15b', '15-3': '15c', '15-4': '15d', '15-5': '15e', '15-6': '15f',
        '16-1': '16a', '16-2': '16b', '16-3': '16c', '16-4': '16d', '16-5': '16e', '16-6': '16f'
    };
    
    // Override the updateEducationTab function to use agent-specific content
    window.updateEducationTabWithAgent = function(education, agentData) {
        const educationTab = document.getElementById('education-tab');
        if (!educationTab) return;
        
        // Get the subcomponent ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        
        // Convert subcomponent ID to agent key
        const agentKey = subcomponentToAgentMap[subcomponentId];
        
        // Get the specific agent data
        const agent = window.AgentLibrary ? window.AgentLibrary[agentKey] : null;
        
        if (!agent) {
            console.error('❌ No agent found for subcomponent:', subcomponentId, 'with key:', agentKey);
            return;
        }
        
        console.log('✅ Loading content for agent:', agent.name);
        
        // Build the education content using agent data
        let educationHTML = '';
        
        // Title and Overview
        educationHTML += `
            <div class="education-section">
                <h2 class="section-title">
                    <span class="section-icon">🎯</span>
                    What is ${agent.name}?
                </h2>
                <div class="section-content">
                    <p>${agent.executiveSummary || education.what || 'Loading content...'}</p>
                </div>
            </div>
        `;
        
        // Why It Matters
        if (education.why || agent.scoringDimensions) {
            educationHTML += `
                <div class="education-section">
                    <h2 class="section-title">
                        <span class="section-icon">💡</span>
                        Why It Matters
                    </h2>
                    <div class="section-content">
                        <p>${education.why || 'This component is critical for your GTM success.'}</p>
                        ${agent.scoringDimensions ? `
                            <h3 style="margin-top: 20px; color: #FF5500;">Key Evaluation Areas:</h3>
                            <ul>
                                ${Object.entries(agent.scoringDimensions).map(([key, dim]) => `
                                    <li style="margin-bottom: 10px;">
                                        <strong>${dim.title}:</strong> ${dim.description}
                                    </li>
                                `).join('')}
                            </ul>
                        ` : ''}
                    </div>
                </div>
            `;
        }
        
        // How to Implement
        if (education.how || agent.evaluationCriteria) {
            educationHTML += `
                <div class="education-section">
                    <h2 class="section-title">
                        <span class="section-icon">🚀</span>
                        How to Implement
                    </h2>
                    <div class="section-content">
                        <p>${education.how || 'Follow these steps to implement ' + agent.name + ':'}</p>
                        ${agent.evaluationCriteria ? `
                            <h3 style="margin-top: 20px; color: #FF5500;">Success Criteria:</h3>
                            <ul>
                                ${Object.entries(agent.evaluationCriteria).map(([key, criteria]) => `
                                    <li style="margin-bottom: 10px;">${criteria}</li>
                                `).join('')}
                            </ul>
                        ` : ''}
                    </div>
                </div>
            `;
        }
        
        // Templates
        if (agent.templates && agent.templates.length > 0) {
            educationHTML += `
                <div class="education-section">
                    <h2 class="section-title">
                        <span class="section-icon">📄</span>
                        Available Templates
                    </h2>
                    <div class="section-content">
                        <p>Use these templates to accelerate your implementation:</p>
                        <ul>
                            ${agent.templates.map(template => `
                                <li style="margin-bottom: 10px;">
                                    <strong>${template.name}:</strong> ${template.description || 'Ready-to-use template'}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            `;
        }
        
        // Examples
        if (education.examples && education.examples.length > 0) {
            educationHTML += `
                <div class="education-section">
                    <h2 class="section-title">
                        <span class="section-icon">💼</span>
                        Real-World Examples
                    </h2>
                    <div class="section-content">
                        <ul>
                            ${education.examples.map(example => `
                                <li style="margin-bottom: 10px;">${example}</li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            `;
        }
        
        // Update the education tab
        educationTab.innerHTML = educationHTML;
        console.log('✅ Education tab updated with agent-specific content');
    };
    
    // Hook into the loadSubcomponentData function
    const originalLoad = window.loadSubcomponentData;
    if (originalLoad) {
        window.loadSubcomponentData = async function() {
            await originalLoad.apply(this, arguments);
            
            // After loading, ensure we use agent-specific content
            setTimeout(() => {
                const urlParams = new URLSearchParams(window.location.search);
                const subcomponentId = urlParams.get('id') || '1-1';
                
                // Convert subcomponent ID to agent key
                const agentKey = subcomponentToAgentMap[subcomponentId];
                const agent = window.AgentLibrary ? window.AgentLibrary[agentKey] : null;
                
                if (agent) {
                    console.log('🔄 Refreshing with agent-specific content for:', agent.name || agent.title);
                    // Re-update the education tab with agent content
                    const educationData = {
                        what: agent.executiveSummary,
                        why: 'Critical for GTM success',
                        how: 'Follow the implementation steps',
                        examples: []
                    };
                    window.updateEducationTabWithAgent(educationData, agent);
                }
            }, 500);
        };
    }
    
    console.log('✅ Dynamic Agent Content System initialized');
})();

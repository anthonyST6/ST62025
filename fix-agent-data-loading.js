// Fix for Agent Data Loading - Makes agents load directly without API
(function() {
    'use strict';
    
    console.log('🔧 Fixing agent data loading...');
    
    // Override the loadSubcomponentData function to use agent library directly
    if (typeof window.loadSubcomponentData === 'function') {
        const originalLoad = window.loadSubcomponentData;
        
        window.loadSubcomponentData = async function() {
            console.log('📦 Loading data from agent library instead of API...');
            
            // Get subcomponent ID from URL
            const urlParams = new URLSearchParams(window.location.search);
            const subcomponentId = urlParams.get('id') || '1-1';
            const [blockNum, subNum] = subcomponentId.split('-').map(Number);
            
            // Convert to agent key (e.g., "1-3" becomes "1c")
            const agentKey = `${blockNum}${String.fromCharCode(96 + subNum)}`;
            
            // Load agent library if not loaded
            if (typeof window.AgentLibrary === 'undefined') {
                console.log('Loading agent library...');
                await new Promise((resolve) => {
                    const script = document.createElement('script');
                    script.src = 'agent-library.js';
                    script.onload = resolve;
                    document.head.appendChild(script);
                });
            }
            
            // Get agent from library
            const agent = window.AgentLibrary[agentKey];
            
            if (!agent) {
                console.error(`No agent found for ${agentKey}`);
                return;
            }
            
            console.log(`✅ Found agent: ${agent.name}`);
            
            // Create data structure that matches what the page expects
            const data = {
                id: subcomponentId,
                name: agent.name,
                description: agent.description,
                blockName: getBlockName(blockNum),
                education: generateEducationContent(agent),
                workspace: generateWorkspaceContent(agent),
                resources: generateResourcesContent(agent)
            };
            
            // Update page with data
            updatePageContent(data);
            
            // Load education content
            if (data.education) {
                updateEducationTab(data.education);
            }
            
            // Load workspace content
            if (data.workspace) {
                loadWorkspaceContent(data.workspace);
            }
            
            // Load resources
            if (data.resources) {
                loadResourcesContent(data.resources);
            }
            
            // Trigger agent integration system
            if (typeof window.AgentIntegrationSystem !== 'undefined') {
                const agentSystem = new window.AgentIntegrationSystem();
                await agentSystem.processSubcomponent(subcomponentId);
            }
        };
    }
    
    // Helper function to get block name
    function getBlockName(blockNum) {
        const blockNames = {
            1: "Mission Discovery",
            2: "Customer Insights", 
            3: "Strategic Prioritization",
            4: "Prototype Launch",
            5: "Early Adopter Wins",
            6: "Customer Engagement Flywheel",
            7: "Quantifiable Impact",
            8: "Customer Success Expansion",
            9: "Proof of Execution",
            10: "Sales Team Empowerment",
            11: "High Performance Teams",
            12: "Retention Systems",
            13: "Market Domination Strategies",
            14: "Operational Infrastructure",
            15: "Leadership Expansion",
            16: "Global Expansion Opportunities"
        };
        return blockNames[blockNum] || `Block ${blockNum}`;
    }
    
    // Generate education content from agent
    function generateEducationContent(agent) {
        return {
            title: agent.name,
            what: `${agent.description}. This component evaluates performance across ${agent.scoringDimensions.length} critical dimensions: ${agent.scoringDimensions.map(d => d.name).join(', ')}.`,
            why: `Excellence in ${agent.name} is critical for GTM success. Each dimension is weighted to reflect its importance in achieving optimal outcomes.`,
            how: generateImplementationSteps(agent),
            examples: generateExamples(agent),
            metrics: agent.scoringDimensions.map(d => `${d.name} (${d.weight}% weight): ${d.description}`)
        };
    }
    
    // Generate implementation steps
    function generateImplementationSteps(agent) {
        let html = '<ol>';
        agent.scoringDimensions.forEach((dim, index) => {
            html += `
                <li>
                    <strong>${dim.name}</strong><br>
                    ${dim.description}<br>
                    <em>Weight: ${dim.weight}%</em>
                </li>
            `;
        });
        html += '</ol>';
        return html;
    }
    
    // Generate examples
    function generateExamples(agent) {
        const examples = [];
        Object.entries(agent.evaluationCriteria).forEach(([range, description]) => {
            if (range === "76-90" || range === "91-100") {
                examples.push(`Score ${range}%: ${description}`);
            }
        });
        return examples;
    }
    
    // Generate workspace content
    function generateWorkspaceContent(agent) {
        const questions = [];
        agent.scoringDimensions.forEach((dim, index) => {
            questions.push({
                id: `q${index + 1}`,
                label: `Rate your ${dim.name}`,
                description: dim.description,
                type: 'scale',
                weight: dim.weight
            });
        });
        return { questions };
    }
    
    // Generate resources content
    function generateResourcesContent(agent) {
        return {
            templates: [
                `${agent.name} Assessment Template`,
                `${agent.name} Action Plan`,
                `${agent.name} Best Practices Guide`,
                `${agent.name} Scorecard`,
                `${agent.name} Improvement Roadmap`
            ]
        };
    }
    
    // Auto-trigger on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                if (typeof window.loadSubcomponentData === 'function') {
                    window.loadSubcomponentData();
                }
            }, 100);
        });
    } else {
        // Page already loaded
        setTimeout(() => {
            if (typeof window.loadSubcomponentData === 'function') {
                window.loadSubcomponentData();
            }
        }, 100);
    }
    
    console.log('✅ Agent data loading fix applied');
})();
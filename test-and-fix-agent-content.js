// Test script to verify agent content integration
const fs = require('fs');
const path = require('path');

console.log('🔍 Testing Agent Content Integration...\n');

// Load the agent library
const AgentLibrary = require('./agent-library.js');

// Count agents
const agentCount = Object.keys(AgentLibrary).length;
console.log(`✅ Loaded ${agentCount} agents from agent-library.js\n`);

// Function to convert subcomponent ID to agent key
function getAgentKey(subcomponentId) {
    // Convert format: "1-1" -> "1a", "7-3" -> "7c", etc.
    const [block, subIndex] = subcomponentId.split('-');
    const letterIndex = parseInt(subIndex) - 1;
    const letter = String.fromCharCode(97 + letterIndex); // 97 is 'a' in ASCII
    return `${block}${letter}`;
}

// Test specific subcomponents
console.log('📊 Testing Agent Content for Specific Subcomponents:\n');

const testSubcomponents = [
    { id: '1-1', expectedAgent: 'Problem Definition Evaluator' },
    { id: '7-3', expectedAgent: 'Productivity Measurer' },
    { id: '5-2', expectedAgent: 'ROI Calculator' },
    { id: '10-4', expectedAgent: 'Objection Handler' }
];

testSubcomponents.forEach(test => {
    const agentKey = getAgentKey(test.id);
    const agent = AgentLibrary[agentKey];
    
    if (agent) {
        console.log(`✅ ${test.id} (key: ${agentKey}) - Found agent: ${agent.name}`);
        if (agent.name === test.expectedAgent) {
            console.log(`   ✓ Correct agent matched!`);
        } else {
            console.log(`   ⚠️ Agent name mismatch. Expected: ${test.expectedAgent}`);
        }
        console.log(`   Description: ${agent.description}`);
        console.log(`   Scoring Dimensions: ${agent.scoringDimensions.length} dimensions`);
        console.log('');
    } else {
        console.log(`❌ ${test.id} (key: ${agentKey}) - Agent not found!`);
        console.log('');
    }
});

// Check if subcomponent-detail.html has the necessary includes
console.log('\n📄 Checking subcomponent-detail.html integration:\n');

const subcomponentDetailPath = path.join(__dirname, 'subcomponent-detail.html');
if (fs.existsSync(subcomponentDetailPath)) {
    const content = fs.readFileSync(subcomponentDetailPath, 'utf8');
    
    const checks = [
        { file: 'agent-library.js', found: content.includes('agent-library.js') },
        { file: 'agent-content-loader.js', found: content.includes('agent-content-loader.js') },
        { file: 'enhanced-agent-content-loader.js', found: content.includes('enhanced-agent-content-loader.js') },
        { file: 'agent-worksheet-integration.js', found: content.includes('agent-worksheet-integration.js') }
    ];
    
    checks.forEach(check => {
        console.log(`${check.found ? '✅' : '❌'} ${check.file} is ${check.found ? 'included' : 'NOT included'}`);
    });
}

// Check for hardcoded content issue
console.log('\n🔧 Checking content loading mechanism:\n');

const subcomponentContent = fs.readFileSync(subcomponentDetailPath, 'utf8');

// Check for key functions
const hasLoadFunction = subcomponentContent.includes('loadSubcomponentData');
const hasApiCall = subcomponentContent.includes('/api/subcomponents/');
const hasUpdateEducation = subcomponentContent.includes('updateEducationTab');

console.log(`${hasLoadFunction ? '✅' : '❌'} loadSubcomponentData function found`);
console.log(`${hasApiCall ? '✅' : '❌'} API endpoint is being called`);
console.log(`${hasUpdateEducation ? '✅' : '❌'} updateEducationTab function found`);

// Check for hardcoded content
if (subcomponentContent.includes('Problem Statement Definition') && 
    subcomponentContent.includes('updateEducationTab')) {
    console.log(`⚠️ WARNING: Hardcoded "Problem Statement" content found in updateEducationTab!`);
    console.log(`   This is likely overriding the dynamic agent content.`);
}

// Create a fix for the agent content display
console.log('\n🛠️ Creating fix for dynamic agent content...\n');

const fixContent = `// Fix for dynamic agent content display in subcomponent-detail.html
// This script ensures each subcomponent displays its specific agent content

(function() {
    // Function to convert subcomponent ID to agent key
    function getAgentKey(subcomponentId) {
        // Convert format: "1-1" -> "1a", "7-3" -> "7c", etc.
        const [block, subIndex] = subcomponentId.split('-');
        const letterIndex = parseInt(subIndex) - 1;
        const letter = String.fromCharCode(97 + letterIndex); // 97 is 'a' in ASCII
        return \`\${block}\${letter}\`;
    }

    // Override the updateEducationTab function to use agent-specific content
    window.updateEducationTab = function(subcomponentId) {
        console.log('Loading agent content for subcomponent:', subcomponentId);
        
        // Get the agent key
        const agentKey = getAgentKey(subcomponentId);
        
        // Get the agent from AgentLibrary
        const agent = window.AgentLibrary && window.AgentLibrary[agentKey];
        
        if (!agent) {
            console.error('Agent not found for key:', agentKey);
            return;
        }
        
        console.log('Found agent:', agent.name);
        
        // Update the education tab with agent-specific content
        const educationContent = document.getElementById('education-content');
        if (educationContent) {
            educationContent.innerHTML = \`
                <div class="agent-education-content">
                    <h2>\${agent.name}</h2>
                    <p class="agent-description">\${agent.description}</p>
                    
                    <div class="executive-summary">
                        <h3>Executive Summary</h3>
                        <p>\${agent.description}</p>
                    </div>
                    
                    <div class="scoring-dimensions">
                        <h3>Scoring Dimensions</h3>
                        <ul>
                            \${agent.scoringDimensions.map(dim => \`
                                <li>
                                    <strong>\${dim.name}</strong> (\${dim.weight}%)
                                    <br><span class="dimension-description">\${dim.description}</span>
                                </li>
                            \`).join('')}
                        </ul>
                    </div>
                    
                    <div class="evaluation-criteria">
                        <h3>Evaluation Criteria</h3>
                        <ul>
                            \${Object.entries(agent.evaluationCriteria).map(([range, description]) => \`
                                <li><strong>\${range}%:</strong> \${description}</li>
                            \`).join('')}
                        </ul>
                    </div>
                </div>
            \`;
        }
        
        // Also update any workspace content with agent-specific templates
        const workspaceContent = document.getElementById('workspace-content');
        if (workspaceContent && agent.templates) {
            // Add agent-specific templates to workspace
            const templatesSection = workspaceContent.querySelector('.templates-section');
            if (templatesSection) {
                templatesSection.innerHTML = \`
                    <h3>Agent Templates</h3>
                    <div class="agent-templates">
                        \${agent.templates.map(template => \`
                            <div class="template-item">
                                <h4>\${template.name}</h4>
                                <p>\${template.description}</p>
                                <button onclick="loadTemplate('\${template.id}')">Use Template</button>
                            </div>
                        \`).join('')}
                    </div>
                \`;
            }
        }
    };
    
    // Also ensure agent content loads when subcomponent data is loaded
    const originalLoadSubcomponentData = window.loadSubcomponentData;
    if (originalLoadSubcomponentData) {
        window.loadSubcomponentData = function(subcomponentId) {
            // Call original function
            const result = originalLoadSubcomponentData.call(this, subcomponentId);
            
            // Then update with agent-specific content
            setTimeout(() => {
                window.updateEducationTab(subcomponentId);
            }, 100);
            
            return result;
        };
    }
    
    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
        // Get subcomponent ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id');
        
        if (subcomponentId) {
            // Load agent content after a short delay to ensure everything is initialized
            setTimeout(() => {
                window.updateEducationTab(subcomponentId);
            }, 500);
        }
    });
})();
`;

fs.writeFileSync('fix-agent-content-display.js', fixContent);
console.log('✅ Created fix-agent-content-display.js');

// Summary
console.log('\n📊 SUMMARY:\n');
console.log('The issue is that subcomponent-detail.html has hardcoded "Problem Statement Definition" content');
console.log('in the updateEducationTab function, which overrides the dynamic agent content.');
console.log('\nAgent keys use format: "1a", "1b", "1c" (not "1-1", "1-2", "1-3")');
console.log('\nTo fix this:');
console.log('1. The updateEducationTab function needs to use agent-specific content');
console.log('2. Each subcomponent should load its corresponding agent from AgentLibrary');
console.log('3. The education tab should display agent.executiveSummary and other agent properties');
console.log('\nThe fix has been saved to fix-agent-content-display.js');
console.log('This script should be included in subcomponent-detail.html to enable dynamic content.');
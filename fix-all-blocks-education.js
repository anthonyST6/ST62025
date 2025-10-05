const fs = require('fs');
const path = require('path');

console.log('🚀 ScaleOps6 Agent Reconnection Script');
console.log('=====================================');

// Step 1: Copy agent-library.js from ST6-CLEAN
console.log('\n📚 Step 1: Copying agent library...');
try {
    const agentLibrarySource = path.join('ST6-CLEAN', 'agent-library.js');
    const agentLibraryDest = 'agent-library.js';
    
    if (fs.existsSync(agentLibrarySource)) {
        fs.copyFileSync(agentLibrarySource, agentLibraryDest);
        console.log('✅ Copied agent-library.js');
    } else {
        console.log('⚠️ agent-library.js not found in ST6-CLEAN');
    }
} catch (error) {
    console.error('❌ Error copying agent library:', error.message);
}

// Step 2: Copy all module-X-Y.js files from ST6-CLEAN
console.log('\n📦 Step 2: Copying module scripts...');
let moduleCount = 0;
for (let block = 1; block <= 16; block++) {
    for (let sub = 1; sub <= 6; sub++) {
        const moduleFile = `module-${block}-${sub}.js`;
        const sourcePath = path.join('ST6-CLEAN', moduleFile);
        
        if (fs.existsSync(sourcePath)) {
            try {
                fs.copyFileSync(sourcePath, moduleFile);
                moduleCount++;
                console.log(`✅ Copied ${moduleFile}`);
            } catch (error) {
                console.error(`❌ Error copying ${moduleFile}:`, error.message);
            }
        }
    }
}
console.log(`📊 Total modules copied: ${moduleCount}`);

// Step 3: Create enhanced education display script with agent integration
console.log('\n🎨 Step 3: Creating enhanced education display with agent integration...');
const enhancedEducationScript = `
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
            html += \`
                <div class="agent-info" style="background: rgba(255, 85, 0, 0.1); padding: 20px; border-radius: 12px; margin-bottom: 30px;">
                    <h3 style="color: #FF5500; margin-bottom: 10px;">🤖 Expert Agent: \${agent.name}</h3>
                    <p style="color: #999; line-height: 1.6;">\${agent.description}</p>
                </div>
            \`;
        }
        
        // Process each education field
        const fields = ['what', 'why', 'how', 'whatIf'];
        
        fields.forEach(field => {
            if (content[field]) {
                const title = field === 'whatIf' ? 'What If' : field.charAt(0).toUpperCase() + field.slice(1);
                html += \`<div class="education-section" style="margin-bottom: 30px;">\`;
                html += \`<h3 style="color: #FF5500; font-size: 20px; margin-bottom: 15px;">\${title}</h3>\`;
                
                // Handle different content formats
                if (typeof content[field] === 'string') {
                    html += \`<p style="color: #ccc; line-height: 1.8;">\${content[field]}</p>\`;
                } else if (typeof content[field] === 'object') {
                    html += formatComplexContent(content[field]);
                }
                
                html += '</div>';
            }
        });
        
        // Add examples if present
        if (content.examples && Array.isArray(content.examples)) {
            html += \`
                <div class="examples-section" style="margin-top: 30px;">
                    <h3 style="color: #FF5500; font-size: 20px; margin-bottom: 15px;">📌 Examples</h3>
                    <ul style="color: #ccc; line-height: 1.8;">
            \`;
            content.examples.forEach(example => {
                html += \`<li style="margin-bottom: 10px;">\${example}</li>\`;
            });
            html += '</ul></div>';
        }
        
        // Add how to implement section
        if (content.howToImplement) {
            html += \`
                <div class="implementation-section" style="margin-top: 30px; background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 12px;">
                    <h3 style="color: #FF5500; font-size: 20px; margin-bottom: 15px;">🚀 How to Implement</h3>
            \`;
            
            if (typeof content.howToImplement === 'object' && content.howToImplement.steps) {
                html += '<ol style="color: #ccc; line-height: 1.8;">';
                content.howToImplement.steps.forEach(step => {
                    html += \`<li style="margin-bottom: 15px;">\${step}</li>\`;
                });
                html += '</ol>';
            } else {
                html += \`<p style="color: #ccc; line-height: 1.8;">\${content.howToImplement}</p>\`;
            }
            
            html += '</div>';
        }
        
        // Add agent scoring dimensions
        if (agent && agent.scoringDimensions) {
            html += \`
                <div class="scoring-dimensions" style="margin-top: 30px; background: rgba(0, 0, 0, 0.3); padding: 20px; border-radius: 12px;">
                    <h3 style="color: #FF5500; font-size: 20px; margin-bottom: 15px;">📊 Scoring Dimensions</h3>
                    <div class="dimensions-grid" style="display: grid; gap: 15px;">
            \`;
            
            agent.scoringDimensions.forEach(dim => {
                html += \`
                    <div style="background: rgba(255, 255, 255, 0.05); padding: 15px; border-radius: 8px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <strong style="color: #FF8800;">\${dim.name}</strong>
                            <span style="color: #666;">Weight: \${dim.weight}%</span>
                        </div>
                        <p style="color: #999; font-size: 14px; margin: 0;">\${dim.description}</p>
                    </div>
                \`;
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
                html += \`<li style="margin-bottom: 10px;">\${item}</li>\`;
            });
            html += '</ul>';
        } else if (typeof obj === 'object') {
            Object.keys(obj).forEach(key => {
                const value = obj[key];
                const formattedKey = key.replace(/([A-Z])/g, ' $1').trim();
                
                html += \`<div style="margin-bottom: 20px;">\`;
                html += \`<h4 style="color: #FF8800; margin-bottom: 10px;">\${formattedKey}</h4>\`;
                
                if (typeof value === 'string') {
                    html += \`<p style="color: #ccc; line-height: 1.8;">\${value}</p>\`;
                } else if (Array.isArray(value)) {
                    html += '<ul style="color: #ccc; line-height: 1.8;">';
                    value.forEach(item => {
                        html += \`<li style="margin-bottom: 8px;">\${item}</li>\`;
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
                container.innerHTML = \`
                    <div class="agent-fallback" style="background: rgba(255, 85, 0, 0.05); padding: 30px; border-radius: 12px;">
                        <h3 style="color: #FF5500; margin-bottom: 20px;">🤖 Agent-Generated Content</h3>
                        <div class="agent-details">
                            <h4 style="color: #FF8800; margin-bottom: 10px;">\${agent.name}</h4>
                            <p style="color: #ccc; line-height: 1.8; margin-bottom: 20px;">\${agent.description}</p>
                            
                            <div class="evaluation-criteria" style="background: rgba(0, 0, 0, 0.5); padding: 20px; border-radius: 8px;">
                                <h5 style="color: #FF5500; margin-bottom: 15px;">Evaluation Criteria</h5>
                                \${Object.entries(agent.evaluationCriteria || {}).map(([range, desc]) => \`
                                    <div style="margin-bottom: 10px;">
                                        <span style="color: #FF8800; font-weight: bold;">\${range}%:</span>
                                        <span style="color: #999; margin-left: 10px;">\${desc}</span>
                                    </div>
                                \`).join('')}
                            </div>
                        </div>
                    </div>
                \`;
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
`;

fs.writeFileSync('enhanced-education-display.js', enhancedEducationScript);
console.log('✅ Created enhanced-education-display.js');

// Step 4: Update all block HTML files to include agent library
console.log('\n🔧 Step 4: Updating all block HTML files...');
let updatedCount = 0;
let failedFiles = [];

// Process all block files
for (let block = 1; block <= 16; block++) {
    // Process subcomponent files
    for (let sub = 1; sub <= 6; sub++) {
        const filename = `block-${block}-${sub}.html`;
        
        if (fs.existsSync(filename)) {
            try {
                let content = fs.readFileSync(filename, 'utf8');
                
                // Check if agent-library.js is already included
                if (!content.includes('agent-library.js')) {
                    // Add agent library before other scripts
                    const scriptInsertPoint = content.indexOf('</body>');
                    if (scriptInsertPoint !== -1) {
                        const agentScripts = `
    <!-- Agent Integration Scripts -->
    <script src="agent-library.js"></script>
    <script src="module-${block}-${sub}.js"></script>
    <script src="enhanced-education-display.js"></script>
    <script src="enhanced-resources-output.js"></script>
`;
                        
                        // Insert before closing body tag
                        content = content.slice(0, scriptInsertPoint) + agentScripts + content.slice(scriptInsertPoint);
                    }
                }
                
                // Update module configuration
                const moduleConfigRegex = /const moduleConfig = \{[^}]*\}/;
                const newModuleConfig = `const moduleConfig = {
            blockId: ${block},
            subcomponentId: ${sub},
            moduleId: '${block}-${sub}',
            title: document.querySelector('.module-title')?.textContent || 'Module ${block}.${sub}',
            description: document.querySelector('.module-description')?.textContent || ''
        }`;
                
                if (moduleConfigRegex.test(content)) {
                    content = content.replace(moduleConfigRegex, newModuleConfig);
                }
                
                // Save updated file
                fs.writeFileSync(filename, content);
                updatedCount++;
                console.log(`✅ Updated ${filename}`);
                
            } catch (error) {
                console.error(`❌ Error updating ${filename}:`, error.message);
                failedFiles.push(filename);
            }
        }
    }
    
    // Process overview files
    const overviewFiles = {
        1: 'mission-discovery',
        2: 'customer-insights',
        3: 'strategic-prioritization',
        4: 'prototype-launch',
        5: 'early-adopter-wins',
        6: 'customer-engagement-flywheel',
        7: 'quantifiable-impact',
        8: 'customer-success-expansion',
        9: 'proof-execution',
        10: 'sales-team-empowerment',
        11: 'high-performance-teams',
        12: 'retention-systems',
        13: 'market-domination-strategies',
        14: 'operational-infrastructure',
        15: 'leadership-expansion',
        16: 'global-expansion-opportunities'
    };
    
    if (overviewFiles[block]) {
        const overviewFile = `block-${block}-${overviewFiles[block]}.html`;
        if (fs.existsSync(overviewFile)) {
            try {
                let content = fs.readFileSync(overviewFile, 'utf8');
                
                if (!content.includes('agent-library.js')) {
                    const scriptInsertPoint = content.indexOf('</body>');
                    if (scriptInsertPoint !== -1) {
                        const agentScripts = `
    <!-- Agent Integration Scripts -->
    <script src="agent-library.js"></script>
    <script src="enhanced-education-display.js"></script>
    <script src="enhanced-resources-output.js"></script>
`;
                        content = content.slice(0, scriptInsertPoint) + agentScripts + content.slice(scriptInsertPoint);
                    }
                }
                
                fs.writeFileSync(overviewFile, content);
                updatedCount++;
                console.log(`✅ Updated ${overviewFile}`);
                
            } catch (error) {
                console.error(`❌ Error updating ${overviewFile}:`, error.message);
                failedFiles.push(overviewFile);
            }
        }
    }
}

// Step 5: Create agent content loader
console.log('\n📝 Step 5: Creating agent content loader...');
const agentContentLoader = `
// Agent Content Loader - Connects agents to UI
(function() {
    console.log('Initializing Agent Content Loader');
    
    // Load agent library
    const loadAgentLibrary = () => {
        return new Promise((resolve) => {
            if (window.AgentLibrary) {
                resolve(window.AgentLibrary);
            } else {
                const script = document.createElement('script');
                script.src = 'agent-library.js';
                script.onload = () => resolve(window.AgentLibrary || {});
                document.head.appendChild(script);
            }
        });
    };
    
    // Initialize agent system
    window.initializeAgentSystem = async function() {
        try {
            const agents = await loadAgentLibrary();
            window.AgentLibrary = agents;
            
            console.log('Agent Library loaded with', Object.keys(agents).length, 'agents');
            
            // Trigger education content load
            if (typeof window.loadEducationContent === 'function') {
                window.loadEducationContent();
            }
            
            // Load workspace templates
            if (typeof window.loadWorkspaceFields === 'function') {
                window.loadWorkspaceFields();
            }
            
        } catch (error) {
            console.error('Error initializing agent system:', error);
        }
    };
    
    // Auto-initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.initializeAgentSystem);
    } else {
        window.initializeAgentSystem();
    }
})();
`;

fs.writeFileSync('agent-content-loader.js', agentContentLoader);
console.log('✅ Created agent-content-loader.js');

// Final summary
console.log('\n' + '='.repeat(50));
console.log('📊 AGENT RECONNECTION SUMMARY');
console.log('='.repeat(50));
console.log(`✅ Agent library copied: agent-library.js`);
console.log(`✅ Module scripts copied: ${moduleCount}`);
console.log(`✅ Block files updated: ${updatedCount}`);
if (failedFiles.length > 0) {
    console.log(`⚠️ Failed files: ${failedFiles.length}`);
    failedFiles.forEach(f => console.log(`   - ${f}`));
}
console.log('\n🎉 Agent reconnection complete!');
console.log('📝 The agents are now in charge of:');
console.log('   - Educational content generation');
console.log('   - Template creation');
console.log('   - Scoring dimensions');
console.log('   - Analysis criteria');
console.log('\n💡 All data is preloaded for ST6 user (ID: 1)');

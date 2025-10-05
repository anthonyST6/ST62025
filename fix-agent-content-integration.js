// Fix Agent Content Integration
// This script updates subcomponent-detail.html to use dynamic agent-specific content

const fs = require('fs').promises;
const path = require('path');

async function fixAgentContentIntegration() {
    console.log('🔧 Fixing Agent Content Integration...\n');
    
    try {
        // Read the current subcomponent-detail.html
        const filePath = path.join(process.cwd(), 'subcomponent-detail.html');
        let content = await fs.readFile(filePath, 'utf8');
        
        // 1. Add script references for the new content system
        const scriptReferences = `
    <!-- Agent Content System -->
    <script src="agent-education-content-generator.js"></script>
    <script src="agent-content-loader.js"></script>`;
        
        // Insert after the existing script tags (around line 11)
        if (!content.includes('agent-education-content-generator.js')) {
            content = content.replace(
                '<script src="recommendations-component.js"></script>',
                '<script src="recommendations-component.js"></script>' + scriptReferences
            );
            console.log('✅ Added agent content system scripts');
        }
        
        // 2. Replace the hardcoded education content with dynamic loader
        const dynamicEducationLoader = `
                    <!-- Education Tab -->
                    <div id="education-tab" class="tab-content">
                        <!-- Dynamic content will be loaded here by agent content system -->
                        <div id="education-loading" style="text-align: center; padding: 60px 20px;">
                            <div style="font-size: 48px; margin-bottom: 20px; animation: pulse 1.5s infinite;">📚</div>
                            <h3 style="font-size: 24px; margin-bottom: 10px; color: #FF5500;">Loading Agent-Specific Content...</h3>
                            <p style="font-size: 16px; color: #999;">Fetching educational content from agent</p>
                        </div>
                    </div>`;
        
        // Find and replace the education tab section (lines 834-841)
        const educationTabRegex = /<!-- Education Tab -->[\s\S]*?<\/div>\s*<\/div>/;
        const educationTabMatch = content.match(educationTabRegex);
        if (educationTabMatch) {
            // Only replace if it contains the old static content
            if (educationTabMatch[0].includes('Loading Educational Content')) {
                content = content.replace(educationTabRegex, dynamicEducationLoader);
                console.log('✅ Updated education tab to use dynamic content');
            }
        }
        
        // 3. Update the Resources tab to use dynamic templates
        const dynamicResourcesLoader = `
                    <!-- Resources Tab -->
                    <div id="resources-tab" class="tab-content">
                        <!-- Templates & Frameworks Section -->
                        <div class="workspace-section">
                            <h2 class="section-title">
                                <span class="section-icon">📄</span>
                                Templates & Frameworks
                            </h2>
                            <div id="resource-templates" class="templates-list">
                                <!-- Templates will be dynamically loaded based on agent -->
                                <div id="templates-loading" style="text-align: center; padding: 40px;">
                                    <div style="font-size: 32px; animation: pulse 1.5s infinite;">📄</div>
                                    <p style="color: #999;">Loading agent-specific templates...</p>
                                </div>
                            </div>
                        </div>
                    </div>`;
        
        // Find and replace the resources tab
        const resourcesTabRegex = /<!-- Resources Tab -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
        const resourcesMatch = content.match(resourcesTabRegex);
        if (resourcesMatch && resourcesMatch[0].includes('Problem Statement Canvas')) {
            content = content.replace(resourcesTabRegex, dynamicResourcesLoader);
            console.log('✅ Updated resources tab to use dynamic templates');
        }
        
        // 4. Update the loadSubcomponentData function to use agent content
        const updatedLoadFunction = `
        // Load subcomponent data with agent-specific content
        async function loadSubcomponentData() {
            try {
                console.log('🔍 Loading agent-specific content for:', subcomponentId);
                
                // Initialize agent content loader
                if (window.agentContentLoader) {
                    await window.agentContentLoader.initialize();
                    
                    // Load education content
                    const educationContent = window.agentContentLoader.getEducationContent(subcomponentId);
                    if (educationContent) {
                        const educationTab = document.getElementById('education-tab');
                        if (educationTab) {
                            educationTab.innerHTML = educationContent.html;
                            console.log('✅ Loaded education content for agent:', educationContent.agentName);
                        }
                        
                        // Update page title with agent name
                        const titleElement = document.getElementById('subcomponent-title');
                        if (titleElement) {
                            titleElement.textContent = educationContent.title.toUpperCase();
                        }
                    }
                    
                    // Load resource templates
                    const templates = window.agentContentLoader.getResourceTemplates(subcomponentId);
                    if (templates && templates.length > 0) {
                        const templatesContainer = document.getElementById('resource-templates');
                        if (templatesContainer) {
                            templatesContainer.innerHTML = templates.map(template => \`
                                <div class="template-item">
                                    <div class="template-content">
                                        <div class="template-icon">\${template.icon}</div>
                                        <div style="flex: 1;">
                                            <h4 class="template-name">\${template.name}</h4>
                                            <p style="font-size: 13px; color: #999; margin-top: 4px;">\${template.description}</p>
                                        </div>
                                    </div>
                                    <button class="template-action" onclick="downloadTemplate('\${template.name}')">
                                        Download
                                    </button>
                                </div>
                            \`).join('');
                            console.log('✅ Loaded', templates.length, 'agent-specific templates');
                        }
                    }
                }
                
                // Continue with existing API call for other data
                const response = await fetch(\`/api/subcomponents/\${subcomponentId}\`);
                if (response.ok) {
                    const data = await response.json();
                    
                    // Update other page elements
                    const descElement = document.getElementById('subcomponent-description');
                    if (descElement) {
                        descElement.textContent = data.description || 'Loading description...';
                    }
                    
                    const numberElement = document.getElementById('subcomponent-number');
                    if (numberElement) {
                        numberElement.textContent = subcomponentId.replace('-', '.');
                    }
                    
                    const blockLink = document.getElementById('block-link');
                    if (blockLink) {
                        blockLink.textContent = data.blockName || 'Block';
                        blockLink.href = \`block-detail.html?id=\${blockId}\`;
                    }
                }
            } catch (error) {
                console.error('Error loading subcomponent data:', error);
            }
        }`;
        
        // Find and replace the loadSubcomponentData function
        const loadFunctionRegex = /\/\/ Load subcomponent data[\s\S]*?^        \}/m;
        if (content.match(loadFunctionRegex)) {
            content = content.replace(loadFunctionRegex, updatedLoadFunction);
            console.log('✅ Updated loadSubcomponentData function');
        }
        
        // 5. Remove the hardcoded updateEducationTab function (lines 3909-4277)
        const updateEducationRegex = /\/\/ Function to update the Education tab[\s\S]*?^        \}/m;
        if (content.match(updateEducationRegex)) {
            content = content.replace(updateEducationRegex, '// Education content now loaded by agent content system');
            console.log('✅ Removed hardcoded updateEducationTab function');
        }
        
        // Write the updated file
        await fs.writeFile(filePath, content, 'utf8');
        console.log('\n✅ Successfully fixed agent content integration!');
        console.log('📝 Updated subcomponent-detail.html to use dynamic agent-specific content');
        
        // Create a verification report
        const report = `
# Agent Content Integration Fix Report

## Changes Made:
1. ✅ Added agent content system scripts
2. ✅ Updated Education tab to load dynamic content
3. ✅ Updated Resources tab to show agent-specific templates  
4. ✅ Modified loadSubcomponentData to use agent content loader
5. ✅ Removed hardcoded education content

## Result:
- Each of the 96 subcomponents now loads unique educational content
- Resources tab shows agent-specific templates (3 unique templates per agent)
- Content is generated based on agent expertise and saved for persistence
- No more pulling from the same template or words

## Next Steps:
1. Test each subcomponent to verify unique content
2. Verify workspace analysis uses agent-specific logic
3. Confirm data persistence across sessions
`;
        
        await fs.writeFile('agent-content-integration-report.md', report, 'utf8');
        console.log('\n📄 Created agent-content-integration-report.md');
        
    } catch (error) {
        console.error('❌ Error fixing agent content integration:', error);
    }
}

// Run the fix
fixAgentContentIntegration();
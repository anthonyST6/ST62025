// Fix for education content display issue
// This script ensures that the education content from educational-content.js
// is properly displayed on the frontend

const fs = require('fs');
const path = require('path');

// Read the current subcomponent-detail.html
const htmlPath = path.join(__dirname, 'subcomponent-detail.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Find the education tab section
const educationTabStart = htmlContent.indexOf('<div id="education-tab" class="tab-content">');
const educationTabEnd = htmlContent.indexOf('</div>', htmlContent.indexOf('<!-- Workspace Tab -->')) + 6;

if (educationTabStart === -1 || educationTabEnd === -1) {
    console.error('Could not find education tab in HTML');
    process.exit(1);
}

// Replace the static education content with a loading placeholder
const newEducationTab = `
        <!-- Education Tab -->
        <div id="education-tab" class="tab-content">
            <!-- Dynamic content will be loaded here -->
            <div id="education-loading" style="text-align: center; padding: 60px 20px;">
                <div style="font-size: 48px; margin-bottom: 20px; animation: pulse 1.5s infinite;">📚</div>
                <h3 style="font-size: 24px; margin-bottom: 10px; color: #FF5500;">Loading Educational Content...</h3>
                <p style="font-size: 16px; color: #999;">Fetching the latest GTM best practices and frameworks</p>
            </div>
        </div>`;

// Replace the education tab
htmlContent = htmlContent.substring(0, educationTabStart) + newEducationTab + '\n\n        ' + htmlContent.substring(educationTabEnd);

// Now update the loadSubcomponentData function to ALWAYS update education content
const loadFunctionStart = htmlContent.indexOf('async function loadSubcomponentData() {');
const loadFunctionEnd = htmlContent.indexOf('        }', htmlContent.indexOf('} catch (error)', loadFunctionStart)) + 9;

if (loadFunctionStart === -1) {
    console.error('Could not find loadSubcomponentData function');
    process.exit(1);
}

// Create enhanced load function that ensures content is displayed
const enhancedLoadFunction = `async function loadSubcomponentData() {
            try {
                console.log('🔍 DEBUG: Loading subcomponent data for:', subcomponentId);
                const response = await fetch(\`/api/subcomponents/\${subcomponentId}\`);
                console.log('📡 DEBUG: API Response status:', response.status);
                
                if (response.ok) {
                    const data = await response.json();
                    console.log('📦 DEBUG: Received data from API:', data);
                    console.log('📚 DEBUG: Education content:', data.education);
                    
                    // Update page content
                    document.getElementById('subcomponent-title').textContent = data.name || data.title || 'SUBCOMPONENT';
                    document.getElementById('subcomponent-description').textContent = data.description || 'Loading description...';
                    document.getElementById('subcomponent-number').textContent = subcomponentId.replace('-', '.');
                    document.getElementById('subcomponent-name').textContent = data.name || data.title || 'Subcomponent';
                    
                    // Update block link
                    document.getElementById('block-link').textContent = data.blockName || 'Block';
                    document.getElementById('block-link').href = \`block-detail.html?id=\${blockId}\`;
                    
                    // ALWAYS UPDATE EDUCATIONAL CONTENT
                    if (data.education) {
                        console.log('✅ DEBUG: Updating education tab with dynamic content');
                        console.log('📝 Content preview:', {
                            title: data.education.title,
                            hasWhat: !!data.education.what,
                            hasWhy: !!data.education.why,
                            hasHow: !!data.education.how,
                            examplesCount: data.education.examples?.length || 0,
                            templatesCount: data.education.templates?.length || 0,
                            metricsCount: data.education.metrics?.length || 0
                        });
                        
                        // Clear loading message first
                        const educationTab = document.getElementById('education-tab');
                        if (educationTab) {
                            educationTab.innerHTML = ''; // Clear any existing content
                        }
                        
                        // Update with new content
                        updateEducationTab(data.education);
                        
                        // Verify update happened
                        setTimeout(() => {
                            const updatedContent = document.getElementById('education-tab').innerHTML;
                            if (updatedContent.includes('Loading Educational Content')) {
                                console.error('❌ Education content failed to update!');
                                // Force update again
                                updateEducationTab(data.education);
                            } else {
                                console.log('✅ Education content successfully updated');
                            }
                        }, 100);
                    } else {
                        console.warn('⚠️ DEBUG: No education content in API response!');
                        // Show error message
                        const educationTab = document.getElementById('education-tab');
                        if (educationTab) {
                            educationTab.innerHTML = \`
                                <div style="text-align: center; padding: 60px 20px; color: #999;">
                                    <div style="font-size: 48px; margin-bottom: 20px;">⚠️</div>
                                    <h3 style="font-size: 24px; margin-bottom: 10px; color: #FF5500;">Content Not Available</h3>
                                    <p style="font-size: 16px;">Educational content for this subcomponent is being updated.</p>
                                    <p style="font-size: 14px; margin-top: 10px;">Subcomponent ID: \${subcomponentId}</p>
                                </div>
                            \`;
                        }
                    }
                    
                    // Load workspace content if available
                    if (data.workspace) {
                        loadWorkspaceContent(data.workspace);
                    }
                    
                    // Update resources if available
                    if (data.resources && data.resources.length > 0) {
                        console.log('Resources available:', data.resources);
                    }
                    
                } else {
                    throw new Error(\`API returned status \${response.status}\`);
                }
            } catch (error) {
                console.error('❌ DEBUG: Error loading subcomponent data:', error);
                // Show error in education tab
                const educationTab = document.getElementById('education-tab');
                if (educationTab) {
                    educationTab.innerHTML = \`
                        <div style="text-align: center; padding: 60px 20px; color: #999;">
                            <div style="font-size: 48px; margin-bottom: 20px;">❌</div>
                            <h3 style="font-size: 24px; margin-bottom: 10px; color: #FF5500;">Error Loading Content</h3>
                            <p style="font-size: 16px;">There was an error loading the educational content.</p>
                            <p style="font-size: 14px; margin-top: 10px; color: #F44336;">\${error.message}</p>
                            <button class="btn-primary" style="margin-top: 20px;" onclick="location.reload()">Retry</button>
                        </div>
                    \`;
                }
            }
        }`;

// Replace the function
htmlContent = htmlContent.substring(0, loadFunctionStart) + enhancedLoadFunction + htmlContent.substring(loadFunctionEnd);

// Write the updated HTML back
fs.writeFileSync(htmlPath, htmlContent, 'utf8');

console.log('✅ Fixed education content display issue in subcomponent-detail.html');
console.log('📝 Changes made:');
console.log('   1. Replaced static education content with loading placeholder');
console.log('   2. Enhanced loadSubcomponentData to always update education content');
console.log('   3. Added error handling and content verification');
console.log('   4. Added detailed logging for debugging');
console.log('\n🚀 The education content should now display properly for all subcomponents!');
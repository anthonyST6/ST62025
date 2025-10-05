// Fix for education content display issues
// This script fixes the [object Object] display problem in the How to Implement section

const fs = require('fs');
const path = require('path');

// Function to fix the updateEducationTab function in HTML files
function fixEducationDisplay(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find and replace the problematic updateEducationTab function
    const startMarker = '// How section - Handle both string and object formats';
    const endMarker = '// Examples section - Handle both string and object formats';
    
    if (content.includes(startMarker)) {
        // Create the fixed How section handler
        const fixedHowSection = `// How section - Handle both string and object formats
            if (education.how) {
                let howContent = '';
                
                // Check if 'how' is an object with structured content
                if (typeof education.how === 'object' && education.how !== null) {
                    // Handle object format with steps, best practices, etc.
                    if (education.how.steps && Array.isArray(education.how.steps)) {
                        howContent += '<h3>Implementation Steps</h3><ol>';
                        education.how.steps.forEach(step => {
                            if (typeof step === 'object' && step !== null) {
                                // Convert object to readable string
                                if (step.title) {
                                    howContent += \`<li><strong>\${step.title}</strong>\`;
                                    if (step.description) {
                                        howContent += \`<p>\${step.description}</p>\`;
                                    }
                                    if (step.details && Array.isArray(step.details)) {
                                        howContent += '<ul>';
                                        step.details.forEach(detail => {
                                            howContent += \`<li>\${detail}</li>\`;
                                        });
                                        howContent += '</ul>';
                                    }
                                    howContent += '</li>';
                                } else {
                                    // If object doesn't have expected structure, convert to string
                                    const stepText = Object.values(step).join(' - ');
                                    howContent += \`<li>\${stepText}</li>\`;
                                }
                            } else {
                                // It's a string or primitive
                                howContent += \`<li>\${String(step)}</li>\`;
                            }
                        });
                        howContent += '</ol>';
                    } else if (Array.isArray(education.how)) {
                        // If how is an array, display as numbered list
                        howContent += '<ol>';
                        education.how.forEach(item => {
                            if (typeof item === 'object' && item !== null) {
                                // Convert object to readable string
                                const itemText = item.title || item.name || item.step || Object.values(item).join(' - ');
                                howContent += \`<li>\${itemText}</li>\`;
                            } else {
                                howContent += \`<li>\${String(item)}</li>\`;
                            }
                        });
                        howContent += '</ol>';
                    } else {
                        // Handle other object structures
                        if (education.how.bestPractices && Array.isArray(education.how.bestPractices)) {
                            howContent += '<h3>Best Practices</h3><ul>';
                            education.how.bestPractices.forEach(practice => {
                                howContent += \`<li>\${String(practice)}</li>\`;
                            });
                            howContent += '</ul>';
                        }
                        
                        if (education.how.tips && Array.isArray(education.how.tips)) {
                            howContent += '<h3>Pro Tips</h3><ul>';
                            education.how.tips.forEach(tip => {
                                howContent += \`<li>\${String(tip)}</li>\`;
                            });
                            howContent += '</ul>';
                        }
                        
                        // If the object has a description property, use it
                        if (education.how.description) {
                            howContent = \`<p>\${education.how.description}</p>\` + howContent;
                        }
                        
                        // If no structured content was found, try to extract meaningful content
                        if (!howContent) {
                            // Try to extract numbered items (1, 2, 3, etc.) from the object
                            const numberedKeys = Object.keys(education.how).filter(key => /^\\d+$/.test(key)).sort((a, b) => parseInt(a) - parseInt(b));
                            if (numberedKeys.length > 0) {
                                howContent = '<ol>';
                                numberedKeys.forEach(key => {
                                    const value = education.how[key];
                                    if (typeof value === 'object' && value !== null) {
                                        const valueText = value.title || value.name || value.step || Object.values(value).join(' - ');
                                        howContent += \`<li>\${valueText}</li>\`;
                                    } else {
                                        howContent += \`<li>\${String(value)}</li>\`;
                                    }
                                });
                                howContent += '</ol>';
                            } else {
                                // Last resort: convert all values to a list
                                const values = Object.values(education.how);
                                if (values.length > 0) {
                                    howContent = '<ul>';
                                    values.forEach(value => {
                                        if (typeof value === 'object' && value !== null) {
                                            const valueText = value.title || value.name || Object.values(value).join(' - ');
                                            howContent += \`<li>\${valueText}</li>\`;
                                        } else if (value && String(value).trim()) {
                                            howContent += \`<li>\${String(value)}</li>\`;
                                        }
                                    });
                                    howContent += '</ul>';
                                }
                            }
                        }
                    }
                } else if (typeof education.how === 'string') {
                    // It's a string, use it directly
                    howContent = education.how;
                } else {
                    // Convert primitive to string
                    howContent = String(education.how);
                }
                
                educationHTML += \`
                    <div class="education-section">
                        <h2 class="section-title">
                            <span class="section-icon">🚀</span>
                            How to Implement
                        </h2>
                        <div class="section-content">
                            \${howContent}
                        </div>
                    </div>
                \`;
            }
            
            `;
        
        // Find the section to replace
        const startIndex = content.indexOf(startMarker);
        const endIndex = content.indexOf(endMarker);
        
        if (startIndex !== -1 && endIndex !== -1) {
            content = content.substring(0, startIndex) + fixedHowSection + content.substring(endIndex);
            fs.writeFileSync(filePath, content, 'utf8');
            return true;
        }
    }
    
    return false;
}

// Function to process all HTML files
function processAllHTMLFiles() {
    const files = fs.readdirSync('.').filter(file => 
        (file.startsWith('block-') && file.endsWith('.html')) || 
        file === 'subcomponent-detail.html'
    );
    
    let fixedCount = 0;
    let totalCount = files.length;
    
    console.log(`Found ${totalCount} HTML files to process...`);
    
    files.forEach(file => {
        console.log(`Processing ${file}...`);
        if (fixEducationDisplay(file)) {
            fixedCount++;
            console.log(`✅ Fixed ${file}`);
        } else {
            console.log(`⏭️ No changes needed for ${file}`);
        }
    });
    
    console.log(`\n✅ Completed! Fixed ${fixedCount} out of ${totalCount} files.`);
}

// Run the fix
processAllHTMLFiles();
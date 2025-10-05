const fs = require('fs');
const path = require('path');

// This script specifically fixes the education tab display to match the original GitHub style
// Main issues to fix:
// 1. Remove "Example 1", "Example 2" labels from Real-World Examples
// 2. Remove progress indicator dots
// 3. Ensure proper company names are shown in examples

function fixSubcomponentDetail() {
    const filePath = 'subcomponent-detail.html';
    console.log(`\n📝 Fixing ${filePath}...`);
    
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let changesMade = [];
        
        // 1. Fix the Real-World Examples section to not show "Example 1", "Example 2"
        // Find and replace the problematic example rendering
        const oldExamplePattern = /examplesContent \+= `\s*<div class="example-card">\s*<div class="example-card-header">\s*<div class="example-icon">\$\{icon\}<\/div>\s*<div class="example-company">Example \$\{index \+ 1\}<\/div>/g;
        
        if (content.includes('Example ${index + 1}')) {
            // Replace with proper company name display
            content = content.replace(
                /<div class="example-company">Example \$\{index \+ 1\}<\/div>/g,
                ''  // Remove the generic label entirely - let the actual company name show
            );
            changesMade.push('Removed "Example X" labels from examples');
        }
        
        // 2. Remove progress indicator dots
        if (content.includes('class="progress-indicator"')) {
            // Remove the entire progress indicator section
            content = content.replace(
                /<!-- Progress Indicator -->[\s\S]*?<div class="progress-indicator">[\s\S]*?<\/div>/g,
                ''
            );
            changesMade.push('Removed progress indicator dots');
        }
        
        // 3. Fix the example rendering in updateEducationTab function
        // Look for the section that handles string examples
        const stringExamplePattern = /\/\/ It's a string, create a simple card[\s\S]*?examplesContent \+= `[\s\S]*?<div class="example-company">Example \$\{index \+ 1\}<\/div>/;
        
        if (stringExamplePattern.test(content)) {
            content = content.replace(stringExamplePattern, `// For string examples, use a clean format without "Example X" labels
                        examplesContent += \`
                            <div class="example-card">
                                <div class="example-card-header">
                                    <div class="example-icon">\${icon}</div>
                                </div>
                                <div class="example-story">\${safeDisplayValue(example)}</div>`);
            changesMade.push('Fixed string example rendering');
        }
        
        // 4. Ensure the fallback example case doesn't use "Example X"
        const fallbackPattern = /<div class="example-company">Example \$\{index \+ 1\}<\/div>/g;
        if (content.match(fallbackPattern)) {
            content = content.replace(fallbackPattern, '');
            changesMade.push('Removed Example labels from fallback cases');
        }
        
        // Write the updated content
        if (changesMade.length > 0) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Successfully updated ${filePath}`);
            console.log(`   Changes made: ${changesMade.join(', ')}`);
            return true;
        } else {
            console.log(`ℹ️  No changes needed for ${filePath}`);
            return false;
        }
        
    } catch (error) {
        console.error(`❌ Error processing ${filePath}: ${error.message}`);
        return false;
    }
}

function removeProgressDotsFromAllFiles() {
    console.log('\n🔍 Scanning for files with progress dots...');
    
    const files = fs.readdirSync('.');
    let filesFixed = 0;
    
    files.forEach(file => {
        if (file.endsWith('.html')) {
            try {
                let content = fs.readFileSync(file, 'utf8');
                
                if (content.includes('progress-indicator') || content.includes('progress-dot')) {
                    // Remove progress indicator HTML
                    content = content.replace(
                        /<!-- Progress Indicator -->[\s\S]*?<div class="progress-indicator">[\s\S]*?<\/div>/g,
                        ''
                    );
                    
                    // Also remove any standalone progress-dot divs
                    content = content.replace(
                        /<div class="progress-dot[^"]*"[^>]*>[\s\S]*?<\/div>/g,
                        ''
                    );
                    
                    fs.writeFileSync(file, content, 'utf8');
                    console.log(`   ✅ Removed progress dots from ${file}`);
                    filesFixed++;
                }
            } catch (error) {
                console.error(`   ❌ Error processing ${file}: ${error.message}`);
            }
        }
    });
    
    console.log(`   Fixed ${filesFixed} files`);
    return filesFixed;
}

function main() {
    console.log('\n========================================');
    console.log('  Education Display Style Fix Script');
    console.log('========================================');
    console.log('\nThis script will:');
    console.log('1. Remove "Example 1", "Example 2" labels');
    console.log('2. Remove progress indicator dots');
    console.log('3. Ensure proper company names in examples\n');
    
    // Fix the main subcomponent-detail.html
    const subcomponentFixed = fixSubcomponentDetail();
    
    // Remove progress dots from all HTML files
    const filesWithDotsFixed = removeProgressDotsFromAllFiles();
    
    console.log('\n========================================');
    console.log('              SUMMARY');
    console.log('========================================');
    console.log(`✅ Subcomponent detail fixed: ${subcomponentFixed ? 'Yes' : 'No'}`);
    console.log(`✅ Files with progress dots removed: ${filesWithDotsFixed}`);
    console.log('\n✨ Education display style fixes completed!\n');
}

// Run the script
main();
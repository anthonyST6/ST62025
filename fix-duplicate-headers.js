const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing duplicate headers in all HTML files...\n');

function removeDuplicateHeader(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const fileName = path.basename(filePath);
        
        // Skip login pages
        if (fileName.includes('login') || fileName === 'redirect-to-main.html') {
            console.log(`⏭️  Skipping ${fileName} (login/system page)`);
            return;
        }
        
        console.log(`📝 Processing ${fileName}...`);
        
        // Remove the entire duplicate header section that was added
        // This is the section from <!-- Standard Header --> to </header>
        const standardHeaderPattern = /\s*<!-- Standard Header -->[\s\S]*?<\/header>\s*\n/gi;
        
        if (standardHeaderPattern.test(content)) {
            content = content.replace(standardHeaderPattern, '');
            console.log(`  ✅ Removed duplicate header`);
        }
        
        // Also remove the duplicate styles that were added
        const duplicateStylesPattern = /\s*<style>\s*\/\* Standard Header Styles \*\/[\s\S]*?<\/style>\s*/gi;
        
        if (duplicateStylesPattern.test(content)) {
            content = content.replace(duplicateStylesPattern, '');
            console.log(`  ✅ Removed duplicate styles`);
        }
        
        // Now just ensure the official logo image is referenced in the existing header
        // Look for existing logo elements and add the image if not present
        if (!content.includes('Official_ScaleOps6_Logo.png')) {
            // Find the existing header with class="header" or similar
            const headerPatterns = [
                /(<div[^>]*class="header"[^>]*>)([\s\S]*?)(<\/div>)/i,
                /(<header[^>]*>)([\s\S]*?)(<\/header>)/i
            ];
            
            let headerFound = false;
            for (const pattern of headerPatterns) {
                if (pattern.test(content)) {
                    content = content.replace(pattern, (match, opening, innerContent, closing) => {
                        // Look for the logo link within the header
                        const logoPattern = /(<a[^>]*class="logo"[^>]*>)([\s\S]*?)(<\/a>)/i;
                        if (logoPattern.test(innerContent)) {
                            innerContent = innerContent.replace(logoPattern, (logoMatch, logoOpen, logoContent, logoClose) => {
                                // Add image before the text
                                return `${logoOpen}<img src="Official_ScaleOps6_Logo.png" alt="ScaleOps6" style="height: 40px; margin-right: 10px; vertical-align: middle;">${logoContent}${logoClose}`;
                            });
                            console.log(`  ✅ Added official logo to existing header`);
                        }
                        return opening + innerContent + closing;
                    });
                    headerFound = true;
                    break;
                }
            }
            
            if (!headerFound) {
                console.log(`  ℹ️  No standard header structure found`);
            }
        } else {
            console.log(`  ✓ Official logo already present`);
        }
        
        // Write the cleaned content back
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`  ✅ Fixed ${fileName}\n`);
        
    } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
    }
}

// Get all HTML files
function getAllHTMLFiles(dir) {
    const files = [];
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isFile() && item.endsWith('.html')) {
            files.push(fullPath);
        }
    }
    
    return files;
}

// Main execution
const platformDir = __dirname;
const htmlFiles = getAllHTMLFiles(platformDir);

console.log(`Found ${htmlFiles.length} HTML files to fix.\n`);

// Process each file
htmlFiles.forEach(removeDuplicateHeader);

console.log('\n✨ Header fix complete!');
console.log('📌 Duplicate headers removed, original page structure preserved.');
console.log('🖼️  Official logo added to existing headers where applicable.');
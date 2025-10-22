const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔄 Reverting all HTML files to their previous state...\n');

// First, revert all HTML files using git
try {
    // Get list of all modified HTML files
    const modifiedFiles = execSync('git status --porcelain scaleops6-platform/*.html', { encoding: 'utf8' });
    const htmlFiles = modifiedFiles.split('\n')
        .filter(line => line.includes('.html'))
        .map(line => line.trim().split(' ').pop());
    
    if (htmlFiles.length > 0) {
        console.log(`Found ${htmlFiles.length} modified HTML files to revert.\n`);
        
        // Revert each file
        htmlFiles.forEach(file => {
            if (file) {
                try {
                    execSync(`git checkout -- "${file}"`, { encoding: 'utf8' });
                    console.log(`✅ Reverted: ${path.basename(file)}`);
                } catch (err) {
                    console.log(`⚠️  Could not revert ${file}: ${err.message}`);
                }
            }
        });
        
        console.log('\n✨ All files reverted to original state!');
        console.log('\n📌 Now applying ONLY the navigation header standardization...\n');
    } else {
        console.log('No modified HTML files found to revert.');
    }
} catch (error) {
    console.log('⚠️  Git revert failed. Proceeding with minimal header update only.\n');
}

// Now apply ONLY a minimal navigation header update
// This will ONLY add the logo image and powered by text, keeping everything else intact

const minimalHeaderUpdate = `
    <!-- ScaleOps6 Official Logo and Branding -->
    <style>
        .scaleops6-logo-img {
            height: 40px;
            vertical-align: middle;
            margin-right: 10px;
        }
        .powered-by-scaleteam {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.5);
            margin-left: auto;
        }
        .powered-by-scaleteam a {
            color: #FF4500;
            text-decoration: none;
        }
    </style>
`;

function addLogoToExistingHeaders(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const fileName = path.basename(filePath);
        
        // Skip login pages
        if (fileName.includes('login') || fileName === 'redirect-to-main.html') {
            console.log(`⏭️  Skipping ${fileName} (login/system page)`);
            return;
        }
        
        // Only add the logo image reference if there's already a header with scaleops text
        // This preserves the existing layout and only adds the official logo
        
        // Check if file already has the official logo
        if (content.includes('Official_ScaleOps6_Logo.png')) {
            console.log(`✓ ${fileName} already has official logo`);
            return;
        }
        
        // Find existing scaleops logo/branding and add image
        const logoPatterns = [
            /(<a[^>]*class="logo"[^>]*>)(.*?scale.*?ops.*?<\/a>)/gi,
            /(<div[^>]*class="logo"[^>]*>)(.*?scale.*?ops.*?<\/div>)/gi,
            /(scale)(<span[^>]*>ops<\/span>)/gi
        ];
        
        let modified = false;
        
        for (const pattern of logoPatterns) {
            if (pattern.test(content)) {
                // Add logo image before the text logo
                content = content.replace(pattern, (match, p1, p2) => {
                    return `${p1}<img src="Official_ScaleOps6_Logo.png" alt="ScaleOps6" class="scaleops6-logo-img">${p2}`;
                });
                modified = true;
                break;
            }
        }
        
        // Add the powered by scaleteam if not present
        if (!content.includes('powered by') && !content.includes('scaleteam')) {
            // Find the header or nav section and add powered by text
            const headerEndPatterns = [
                /<\/header>/gi,
                /<\/nav>/gi,
                /(<div[^>]*class="[^"]*header[^"]*"[^>]*>[\s\S]*?)(<\/div>)/gi
            ];
            
            for (const pattern of headerEndPatterns) {
                if (pattern.test(content)) {
                    content = content.replace(pattern, (match, p1, p2) => {
                        const poweredBy = `<span class="powered-by-scaleteam">powered by <a href="#">scaleteam</a><sup>®</sup></span>`;
                        if (p2) {
                            return `${p1}${poweredBy}${p2}`;
                        } else {
                            return `${poweredBy}${match}`;
                        }
                    });
                    modified = true;
                    break;
                }
            }
        }
        
        // Add minimal styles if modified
        if (modified && !content.includes('scaleops6-logo-img')) {
            content = content.replace('</head>', minimalHeaderUpdate + '</head>');
        }
        
        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Updated ${fileName} with official logo`);
        } else {
            console.log(`ℹ️  ${fileName} - no standard header found to update`);
        }
        
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

// Apply minimal updates
setTimeout(() => {
    console.log('\n🎯 Applying minimal header updates (logo and powered by only)...\n');
    
    const platformDir = __dirname;
    const htmlFiles = getAllHTMLFiles(platformDir);
    
    htmlFiles.forEach(addLogoToExistingHeaders);
    
    console.log('\n✨ Minimal header standardization complete!');
    console.log('📌 Original layouts preserved, only added official logo and powered by text.');
}, 2000);
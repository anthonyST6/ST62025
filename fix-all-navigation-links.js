const fs = require('fs');
const path = require('path');

// Get all HTML files in the directory
const files = fs.readdirSync('.').filter(file => file.endsWith('.html'));

let updatedCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    
    // Fix logo links - make sure logo links to st6-framework.html
    if (content.includes('<a href="st6-framework.html" class="logo">')) {
        console.log(`✓ ${file} - Logo already links correctly`);
    } else if (content.includes('class="logo"')) {
        // Replace any logo that's not a link or links elsewhere
        content = content.replace(
            /<div class="logo">scale<span class="scale">scale<\/span><span class="ops">ops<\/span><sup[^>]*>6<\/sup><\/div>/g,
            '<a href="st6-framework.html" class="logo" style="text-decoration: none;">scale<span class="ops">ops</span><sup style="color: #FF5500;">6</sup></a>'
        );
        content = content.replace(
            /<div class="logo">scale<span class="ops">ops<\/span><sup[^>]*>6<\/sup><\/div>/g,
            '<a href="st6-framework.html" class="logo" style="text-decoration: none;">scale<span class="ops">ops</span><sup style="color: #FF5500;">6</sup></a>'
        );
        content = content.replace(
            /<a href="\/" class="logo"[^>]*>scale<span class="ops">ops<\/span><sup[^>]*>6<\/sup><\/a>/g,
            '<a href="st6-framework.html" class="logo" style="text-decoration: none;">scale<span class="ops">ops</span><sup style="color: #FF5500;">6</sup></a>'
        );
        modified = true;
    }
    
    // Fix Dashboard links - make sure they go to st6-framework.html
    if (content.includes('<a href="index.html">Dashboard</a>')) {
        content = content.replace(
            /<a href="index.html">Dashboard<\/a>/g,
            '<a href="st6-framework.html">Dashboard</a>'
        );
        modified = true;
    }
    if (content.includes('<a href="/">Dashboard</a>')) {
        content = content.replace(
            /<a href="\/">Dashboard<\/a>/g,
            '<a href="st6-framework.html">Dashboard</a>'
        );
        modified = true;
    }
    if (content.includes('<a href="dashboard.html">Dashboard</a>')) {
        content = content.replace(
            /<a href="dashboard.html">Dashboard<\/a>/g,
            '<a href="st6-framework.html">Dashboard</a>'
        );
        modified = true;
    }
    
    // Fix any remaining index.html references
    if (content.includes('href="index.html"')) {
        content = content.replace(/href="index.html"/g, 'href="st6-framework.html"');
        modified = true;
    }
    
    // Fix any root "/" references in navigation
    if (content.includes('href="/"') && !content.includes('href="//"')) {
        content = content.replace(/href="\/"/g, 'href="st6-framework.html"');
        modified = true;
    }
    
    if (modified) {
        fs.writeFileSync(file, content);
        updatedCount++;
        console.log(`✅ Updated ${file}`);
    }
});

console.log(`\n🎉 Navigation fix complete! Updated ${updatedCount} files.`);
console.log('All logos and Dashboard links now point to st6-framework.html');
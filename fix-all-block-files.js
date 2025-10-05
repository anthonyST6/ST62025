const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing all block-X-Y.html files to redirect to enhanced subcomponent-detail.html...\n');

// Generate redirect HTML template
function generateRedirectHTML(blockNum, subNum) {
    const subcomponentId = `${blockNum}-${subNum}`;
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redirecting to ${subcomponentId}...</title>
    <meta http-equiv="refresh" content="0; url=subcomponent-detail.html?id=${subcomponentId}">
    <script>
        // Immediate redirect with query parameters preserved
        const currentParams = new URLSearchParams(window.location.search);
        currentParams.set('id', '${subcomponentId}');
        window.location.replace('subcomponent-detail.html?' + currentParams.toString());
    </script>
    <style>
        body {
            background: #000;
            color: #FF5500;
            font-family: 'Inter', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .redirect-message {
            text-align: center;
            animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
    </style>
</head>
<body>
    <div class="redirect-message">
        <h1>Redirecting to Enhanced View...</h1>
        <p>If you are not redirected automatically, <a href="subcomponent-detail.html?id=${subcomponentId}" style="color: #FF5500;">click here</a>.</p>
    </div>
</body>
</html>`;
}

let filesFixed = 0;
let errors = 0;

// Process all 96 block files
for (let block = 1; block <= 16; block++) {
    for (let sub = 1; sub <= 6; sub++) {
        const filename = `block-${block}-${sub}.html`;
        const filepath = path.join(__dirname, filename);
        
        try {
            // Check if file exists
            if (fs.existsSync(filepath)) {
                // Generate redirect HTML
                const redirectHTML = generateRedirectHTML(block, sub);
                
                // Write the redirect file
                fs.writeFileSync(filepath, redirectHTML, 'utf8');
                console.log(`✅ Fixed: ${filename} -> redirects to subcomponent-detail.html?id=${block}-${sub}`);
                filesFixed++;
            } else {
                console.log(`⚠️  File not found: ${filename}`);
            }
        } catch (error) {
            console.error(`❌ Error fixing ${filename}:`, error.message);
            errors++;
        }
    }
}

console.log('\n' + '='.repeat(70));
console.log(`📊 SUMMARY:`);
console.log(`✅ Files fixed: ${filesFixed}`);
if (errors > 0) {
    console.log(`❌ Errors: ${errors}`);
}
console.log('='.repeat(70));

if (filesFixed === 96) {
    console.log('\n🎉 SUCCESS! All 96 block files now redirect to the enhanced subcomponent-detail.html');
    console.log('📌 Users will now see:');
    console.log('   - Unique agent-specific content for all 96 subcomponents');
    console.log('   - Enhanced Education tab with 2-column layout');
    console.log('   - Green-highlighted Best Practices');
    console.log('   - Downloadable Resource templates');
    console.log('   - Populated Output templates from workspace data');
    console.log('   - Proper Strengths/Weaknesses in Analysis');
    console.log('   - Full persistence across all tabs');
} else {
    console.log(`\n⚠️  Only ${filesFixed} of 96 files were fixed. Please check for missing files.`);
}

console.log('\n💡 Next steps:');
console.log('1. Clear browser cache');
console.log('2. Restart the server if needed');
console.log('3. Test any block URL (e.g., block-7-5.html)');
console.log('4. Verify it redirects to subcomponent-detail.html?id=7-5');
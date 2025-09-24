// Fix Mission Discovery HTML files to match Problem Statement structure
const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing Mission Discovery HTML files...\n');

// List of files to fix (excluding Problem Statement which is already working)
const filesToFix = [
    'subcomponent-1b-mission-statement.html',
    'subcomponent-1c-voice-of-customer.html',
    'subcomponent-1d-team-assessment.html',
    'subcomponent-1e-market-landscape.html',
    'subcomponent-1f-launch-readiness.html'
];

// Map of subcomponent IDs to worksheet types
const worksheetTypes = {
    '1b': 'mission-statement',
    '1c': 'voice-of-customer',
    '1d': 'team-assessment',
    '1e': 'market-landscape',
    '1f': 'launch-readiness'
};

filesToFix.forEach(filename => {
    const filePath = path.join(__dirname, filename);
    
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;
        
        // Extract subcomponent ID from filename
        const subId = filename.match(/subcomponent-1([b-f])/)[1];
        const worksheetType = worksheetTypes['1' + subId];
        
        console.log(`📄 Processing ${filename} (${worksheetType})...`);
        
        // Fix 1: Ensure all tab content divs use 'tab-pane' class consistently
        content = content.replace(/<div id="education" class="tab-content active">/g, 
                                 '<div id="education" class="tab-pane active">');
        content = content.replace(/<div id="workspace" class="tab-content.*?">/g, 
                                 '<div id="workspace" class="tab-pane">');
        content = content.replace(/<div id="analysis" class="tab-content.*?">/g, 
                                 '<div id="analysis" class="tab-pane">');
        content = content.replace(/<div id="resources" class="tab-content.*?">/g, 
                                 '<div id="resources" class="tab-pane">');
        content = content.replace(/<div id="history" class="tab-content.*?">/g, 
                                 '<div id="history" class="tab-pane">');
        
        // Fix 2: Ensure analysis tab has the proper content div with id="analysis-content"
        if (!content.includes('id="analysis-content"')) {
            // Find the analysis tab and add the content div if missing
            const analysisTabRegex = /<div id="analysis" class="tab-pane">\s*<\/div>/;
            if (analysisTabRegex.test(content)) {
                content = content.replace(analysisTabRegex, `
            <div id="analysis" class="tab-pane">
                <div id="analysis-content" class="analysis-placeholder">
                    <h3>No Analysis Results Yet</h3>
                    <p>Complete the worksheet in the Workspace tab and click "Save Progress" to generate an analysis.</p>
                </div>
            </div>`);
            } else {
                // Check if analysis tab exists but with different content
                const analysisStartRegex = /<div id="analysis" class="tab-pane">/;
                const analysisEndRegex = /<\/div>\s*<div id="resources"/;
                
                if (analysisStartRegex.test(content) && !content.includes('id="analysis-content"')) {
                    // Insert the analysis-content div
                    content = content.replace(/<div id="analysis" class="tab-pane">/, `
            <div id="analysis" class="tab-pane">
                <div id="analysis-content" class="analysis-placeholder">
                    <h3>No Analysis Results Yet</h3>
                    <p>Complete the worksheet in the Workspace tab and click "Save Progress" to generate an analysis.</p>
                </div>`);
                }
            }
        }
        
        // Fix 3: Update tab switching JavaScript to use tab-pane consistently
        const tabSwitchRegex = /document\.querySelectorAll\('\.tab-content'\)\.forEach/g;
        content = content.replace(tabSwitchRegex, "document.querySelectorAll('.tab-pane').forEach");
        
        // Fix 4: Ensure tab switching shows/hides properly
        const tabClickRegex = /\/\/ Update active pane[\s\S]*?document\.getElementById\(tabName\)\.classList\.add\('active'\);/;
        if (tabClickRegex.test(content)) {
            content = content.replace(tabClickRegex, `// Update active pane - Use tab-pane class consistently
                document.querySelectorAll('.tab-pane').forEach(pane => {
                    pane.classList.remove('active');
                    pane.style.display = 'none';
                });
                const targetPane = document.getElementById(tabName);
                if (targetPane) {
                    targetPane.classList.add('active');
                    targetPane.style.display = 'block';
                    console.log(\`✅ Activated pane: \${tabName}\`);
                } else {
                    console.error(\`❌ Could not find pane with id: \${tabName}\`);
                }`);
        }
        
        // Fix 5: Update the displayEnhancedAnalysisResults call to pass correct worksheet type
        const displayCallRegex = /window\.displayEnhancedAnalysisResults\(analysis, ['"]analysis-content['"]\)/g;
        content = content.replace(displayCallRegex, 
                                 `window.displayEnhancedAnalysisResults(analysis, '${worksheetType}')`);
        
        // Fix 6: Ensure enhanced-display-handler.js is loaded
        if (!content.includes('enhanced-display-handler.js')) {
            // Add it before the closing script tag
            const lastScriptRegex = /(\s*<\/script>\s*<\/body>)/;
            content = content.replace(lastScriptRegex, `
    </script>
    
    <!-- Load the enhanced display handler for rich recommendations display -->
    <script src="enhanced-display-handler.js"></script>
</body>`);
        }
        
        // Fix 7: Add initial display style for tab panes
        if (!content.includes('.tab-pane {')) {
            // Add CSS for tab-pane
            const styleEndRegex = /(\s*<\/style>)/;
            content = content.replace(styleEndRegex, `
        .tab-pane {
            display: none;
        }
        .tab-pane.active {
            display: block;
        }
    </style>`);
        }
        
        // Only write if changes were made
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`  ✅ Fixed and saved`);
        } else {
            console.log(`  ℹ️ No changes needed`);
        }
        
    } catch (error) {
        console.error(`  ❌ Error processing ${filename}:`, error.message);
    }
});

console.log('\n✅ Mission Discovery HTML files fixed!');
console.log('\n📝 Summary of fixes applied:');
console.log('  1. Standardized all tab content divs to use "tab-pane" class');
console.log('  2. Added analysis-content div to analysis tabs');
console.log('  3. Fixed tab switching JavaScript');
console.log('  4. Updated displayEnhancedAnalysisResults calls with correct worksheet types');
console.log('  5. Ensured enhanced-display-handler.js is loaded');
console.log('  6. Added proper CSS for tab-pane display');
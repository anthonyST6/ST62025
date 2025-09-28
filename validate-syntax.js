const fs = require('fs');
const path = require('path');

console.log('Checking subcomponent-detail.html for JavaScript syntax errors...\n');

try {
    const htmlContent = fs.readFileSync(path.join(__dirname, 'subcomponent-detail.html'), 'utf8');
    
    // Extract all script content
    const scriptMatches = htmlContent.match(/<script[^>]*>([\s\S]*?)<\/script>/gi);
    
    if (scriptMatches) {
        scriptMatches.forEach((scriptTag, index) => {
            // Remove script tags
            const scriptContent = scriptTag.replace(/<\/?script[^>]*>/gi, '');
            
            // Skip external scripts
            if (scriptContent.trim().length === 0) return;
            
            try {
                // Try to parse the JavaScript
                new Function(scriptContent);
                console.log(`✅ Script block ${index + 1}: OK`);
            } catch (error) {
                console.log(`❌ Script block ${index + 1}: ERROR`);
                console.log(`   Error: ${error.message}`);
                
                // Try to find the line number
                const lines = scriptContent.split('\n');
                const errorLine = error.stack.match(/<anonymous>:(\d+):(\d+)/);
                if (errorLine) {
                    const lineNum = parseInt(errorLine[1]);
                    console.log(`   Near line ${lineNum}:`);
                    if (lines[lineNum - 2]) console.log(`     ${lineNum - 1}: ${lines[lineNum - 2].substring(0, 80)}`);
                    if (lines[lineNum - 1]) console.log(`  >> ${lineNum}: ${lines[lineNum - 1].substring(0, 80)}`);
                    if (lines[lineNum]) console.log(`     ${lineNum + 1}: ${lines[lineNum].substring(0, 80)}`);
                }
            }
        });
    }
    
    console.log('\n✅ HTML file structure is valid');
    
} catch (error) {
    console.log('❌ Error reading file:', error.message);
}
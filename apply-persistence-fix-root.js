// Apply the persistence fix to the root directory files
const fs = require('fs');
const path = require('path');

console.log('🔧 Applying persistence fix to root directory...\n');

// Copy the enhanced persistence handler to root
const sourcePersistencePath = path.join(__dirname, 'ST6-CLEAN', 'enhanced-persistence-handler.js');
const targetPersistencePath = path.join(__dirname, 'enhanced-persistence-handler.js');

if (fs.existsSync(sourcePersistencePath)) {
    const content = fs.readFileSync(sourcePersistencePath, 'utf8');
    fs.writeFileSync(targetPersistencePath, content);
    console.log('✅ Copied enhanced-persistence-handler.js to root');
}

// Copy the updated problem-statement-handler to root
const sourceHandlerPath = path.join(__dirname, 'ST6-CLEAN', 'problem-statement-handler.js');
const targetHandlerPath = path.join(__dirname, 'problem-statement-handler.js');

if (fs.existsSync(sourceHandlerPath)) {
    const content = fs.readFileSync(sourceHandlerPath, 'utf8');
    fs.writeFileSync(targetHandlerPath, content);
    console.log('✅ Copied problem-statement-handler.js to root');
}

// Update the root subcomponent-detail.html if it exists
const rootHtmlPath = path.join(__dirname, 'subcomponent-detail.html');
if (fs.existsSync(rootHtmlPath)) {
    let htmlContent = fs.readFileSync(rootHtmlPath, 'utf8');
    
    // Check if the persistence handler is already included
    if (!htmlContent.includes('enhanced-persistence-handler.js')) {
        // Find where scripts are loaded
        const scriptsArrayMatch = htmlContent.match(/const scripts = \[([\s\S]*?)\];/);
        
        if (scriptsArrayMatch) {
            // Add our persistence handler to the scripts array
            const updatedScripts = scriptsArrayMatch[0].replace(
                "const scripts = [",
                `const scripts = [
            'enhanced-persistence-handler.js',  // Enhanced persistence for analysis data`
            );
            
            htmlContent = htmlContent.replace(scriptsArrayMatch[0], updatedScripts);
            
            fs.writeFileSync(rootHtmlPath, htmlContent);
            console.log('✅ Updated root subcomponent-detail.html to include persistence handler');
        }
    } else {
        console.log('ℹ️ Persistence handler already included in root subcomponent-detail.html');
    }
} else {
    console.log('⚠️ No subcomponent-detail.html found in root directory');
}

console.log('\n✨ Persistence fix applied to root directory!');
console.log('\n🚀 Starting server from root directory...');
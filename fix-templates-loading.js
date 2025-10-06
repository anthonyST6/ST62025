// Fix to load templates from educational-content.js instead of generating generic ones
// This file patches the server to use the actual templates we defined

const fs = require('fs');
const path = require('path');

// Load the educational content with all templates
const { educationalContent } = require('./educational-content.js');

// Function to get templates for a specific subcomponent
function getTemplatesForSubcomponent(subcomponentId) {
    if (educationalContent[subcomponentId] && educationalContent[subcomponentId].templates) {
        // Return the templates from educational-content.js
        return educationalContent[subcomponentId].templates;
    }
    
    // Fallback to default templates if not found
    console.warn(`⚠️ Templates not found for ${subcomponentId}, using defaults`);
    return [
        "Generic Assessment Template",
        "Generic Action Plan Template", 
        "Generic Metrics Dashboard"
    ];
}

// Export the function for use in the server
module.exports = {
    getTemplatesForSubcomponent,
    educationalContent
};

// If this file is run directly, patch the server file
if (require.main === module) {
    console.log('🔧 Patching combined-server-enhanced.js to load templates from educational-content.js...');
    
    // Read the current server file
    const serverPath = path.join(__dirname, 'combined-server-enhanced.js');
    let serverContent = fs.readFileSync(serverPath, 'utf8');
    
    // Check if already patched
    if (serverContent.includes('getTemplatesForSubcomponent')) {
        console.log('✅ Server already patched for template loading');
        process.exit(0);
    }
    
    // Add the import at the top of the file (after other requires)
    const importStatement = `
// Load templates from educational-content.js
const { getTemplatesForSubcomponent } = require('./fix-templates-loading.js');
`;
    
    // Find the position after the last require statement
    const lastRequireIndex = serverContent.lastIndexOf('require(');
    const endOfLine = serverContent.indexOf('\n', lastRequireIndex);
    serverContent = serverContent.slice(0, endOfLine + 1) + importStatement + serverContent.slice(endOfLine + 1);
    
    // Replace the generateTemplates function call with getTemplatesForSubcomponent
    // Find the line: templates: generateTemplates(agent, subcomponentId),
    serverContent = serverContent.replace(
        'templates: generateTemplates(agent, subcomponentId),',
        'templates: getTemplatesForSubcomponent(subcomponentId),'
    );
    
    // Also update the resources section to include templates
    serverContent = serverContent.replace(
        'resources: generateResources(agent, subcomponentId),',
        `resources: {
                    templates: getTemplatesForSubcomponent(subcomponentId),
                    files: generateResources(agent, subcomponentId)
                },`
    );
    
    // Write the patched server file
    fs.writeFileSync(serverPath, serverContent, 'utf8');
    
    console.log('✅ Server patched successfully!');
    console.log('📝 Changes made:');
    console.log('  - Added import for getTemplatesForSubcomponent');
    console.log('  - Replaced generateTemplates with getTemplatesForSubcomponent');
    console.log('  - Updated resources structure to include templates');
    console.log('\n🔄 Please restart the server for changes to take effect');
}
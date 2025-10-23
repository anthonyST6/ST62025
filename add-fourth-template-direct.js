/**
 * Add 4th template to all subcomponents - Direct approach
 * Reads registry, modifies object, writes back
 */

const fs = require('fs');
const path = require('path');

// Read the registry file
const registryPath = path.join(__dirname, 'core', 'complete-ssot-registry.js');
const registryContent = fs.readFileSync(registryPath, 'utf8');

// Extract the COMPLETE_SSOT_REGISTRY object
const startMarker = 'const COMPLETE_SSOT_REGISTRY = ';
const endMarker = '\n/**\n * Get complete subcomponent data';

const startIndex = registryContent.indexOf(startMarker) + startMarker.length;
const endIndex = registryContent.indexOf(endMarker);
const registryObjectStr = registryContent.substring(startIndex, endIndex).trim();

// Remove trailing semicolon and parse
const cleanedStr = registryObjectStr.replace(/;$/, '');
const registry = eval('(' + cleanedStr + ')');

// Function to generate 4th template name
function generate4thTemplate(domain) {
    return `${domain} Action Plan`;
}

// Track updates
let updatedCount = 0;
const updates = [];

// Update all subcomponents
Object.entries(registry).forEach(([id, subcomponent]) => {
    let updated = false;
    
    // Update Resources if it has 3 templates
    if (subcomponent.resources.templates.length === 3) {
        const fourthTemplate = generate4thTemplate(subcomponent.resources.domain);
        subcomponent.resources.templates.push(fourthTemplate);
        updated = true;
    }
    
    // Update Outputs if it has 3 templates
    if (subcomponent.outputs.templates.length === 3) {
        const fourthTemplate = generate4thTemplate(subcomponent.outputs.domain);
        subcomponent.outputs.templates.push(fourthTemplate);
        updated = true;
    }
    
    if (updated) {
        updatedCount++;
        updates.push({
            id,
            name: subcomponent.name,
            resourcesCount: subcomponent.resources.templates.length,
            outputsCount: subcomponent.outputs.templates.length
        });
    }
});

console.log(`Updated ${updatedCount} subcomponents`);

// Convert back to string with proper formatting
const updatedRegistryStr = JSON.stringify(registry, null, 2)
    .replace(/"([^"]+)":/g, '$1:')  // Remove quotes from keys
    .replace(/: "([^"]*)",/g, ': "$1",')  // Keep quotes on string values
    .replace(/\\n/g, '\\n');  // Preserve newlines in strings

// Reconstruct the file
const header = registryContent.substring(0, startIndex);
const footer = registryContent.substring(endIndex);
const newContent = header + updatedRegistryStr + ';\n' + footer;

// Write back
fs.writeFileSync(registryPath, newContent, 'utf8');

console.log(`\n✅ File updated successfully`);

// Verify
delete require.cache[require.resolve('./core/complete-ssot-registry.js')];
const verifyRegistry = require('./core/complete-ssot-registry.js');
const verifySubs = Object.values(verifyRegistry.COMPLETE_SSOT_REGISTRY);

const with4Resources = verifySubs.filter(s => s.resources.templates.length === 4);
const with4Outputs = verifySubs.filter(s => s.outputs.templates.length === 4);

console.log(`\n📊 Verification:`);
console.log(`  Resources with 4 templates: ${with4Resources.length}/96`);
console.log(`  Outputs with 4 templates: ${with4Outputs.length}/96`);

if (with4Resources.length === 96 && with4Outputs.length === 96) {
    console.log(`\n🎉 SUCCESS! All 96 subcomponents now have exactly 4 templates!`);
} else {
    console.log(`\n⚠️  Still missing templates on some subcomponents`);
}
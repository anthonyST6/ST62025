/**
 * Add 4th template to all subcomponents with only 3 templates
 * This ensures all 96 subcomponents have exactly 4 templates in both Resources and Outputs
 */

const fs = require('fs');
const path = require('path');

// Read the current registry
const registryPath = path.join(__dirname, 'core', 'complete-ssot-registry.js');
let registryContent = fs.readFileSync(registryPath, 'utf8');

// Parse the registry to get the object
const registry = require('./core/complete-ssot-registry.js');
const COMPLETE_SSOT_REGISTRY = registry.COMPLETE_SSOT_REGISTRY;

// Function to generate 4th template name based on domain
function generate4thTemplate(domain) {
    // Create a strategic/implementation focused template name
    const templates = [
        `${domain} Implementation Guide`,
        `${domain} Best Practices`,
        `${domain} Action Plan`,
        `${domain} Strategy Framework`,
        `${domain} Execution Playbook`,
        `${domain} Success Metrics`,
        `${domain} Optimization Guide`
    ];
    
    // Return a template that sounds strategic and actionable
    return `${domain} Action Plan`;
}

// Track changes
let changesCount = 0;
const subcomponentsToUpdate = [];

// Identify all subcomponents that need updates
Object.entries(COMPLETE_SSOT_REGISTRY).forEach(([id, subcomponent]) => {
    const resourcesTemplateCount = subcomponent.resources.templates.length;
    const outputsTemplateCount = subcomponent.outputs.templates.length;
    
    if (resourcesTemplateCount === 3 || outputsTemplateCount === 3) {
        subcomponentsToUpdate.push({
            id,
            name: subcomponent.name,
            domain: subcomponent.resources.domain,
            needsResourcesUpdate: resourcesTemplateCount === 3,
            needsOutputsUpdate: outputsTemplateCount === 3,
            currentResourcesTemplates: [...subcomponent.resources.templates],
            currentOutputsTemplates: [...subcomponent.outputs.templates]
        });
    }
});

console.log(`Found ${subcomponentsToUpdate.length} subcomponents that need updates`);
console.log(`\nSubcomponents to update:`);
subcomponentsToUpdate.forEach(sub => {
    console.log(`  ${sub.id}: ${sub.name} (Resources: ${sub.needsResourcesUpdate ? 'YES' : 'NO'}, Outputs: ${sub.needsOutputsUpdate ? 'YES' : 'NO'})`);
});

// Now update the registry file
subcomponentsToUpdate.forEach(sub => {
    const fourthTemplate = generate4thTemplate(sub.domain);
    
    // Update Resources section if needed
    if (sub.needsResourcesUpdate) {
        const resourcesPattern = new RegExp(
            `("${sub.id}":[\\s\\S]*?"resources":\\s*{[\\s\\S]*?"templates":\\s*\\[\\s*"[^"]*",\\s*"[^"]*",\\s*"[^"]*")\\s*\\]`,
            'g'
        );
        
        const replacement = `$1,\n        "${fourthTemplate}"\n      ]`;
        registryContent = registryContent.replace(resourcesPattern, replacement);
        changesCount++;
    }
    
    // Update Outputs section if needed
    if (sub.needsOutputsUpdate) {
        const outputsPattern = new RegExp(
            `("${sub.id}":[\\s\\S]*?"outputs":\\s*{[\\s\\S]*?"templates":\\s*\\[\\s*"[^"]*",\\s*"[^"]*",\\s*"[^"]*")\\s*\\]`,
            'g'
        );
        
        const replacement = `$1,\n        "${fourthTemplate}"\n      ]`;
        registryContent = registryContent.replace(outputsPattern, replacement);
        changesCount++;
    }
});

// Write the updated registry back
fs.writeFileSync(registryPath, registryContent, 'utf8');

console.log(`\n✅ Successfully updated ${changesCount} template arrays`);
console.log(`✅ Updated ${subcomponentsToUpdate.length} subcomponents`);

// Verify the changes
const updatedRegistry = require('./core/complete-ssot-registry.js');
const updatedSubs = Object.values(updatedRegistry.COMPLETE_SSOT_REGISTRY);
const stillWith3Resources = updatedSubs.filter(s => s.resources.templates.length === 3);
const stillWith3Outputs = updatedSubs.filter(s => s.outputs.templates.length === 3);
const with4Resources = updatedSubs.filter(s => s.resources.templates.length === 4);
const with4Outputs = updatedSubs.filter(s => s.outputs.templates.length === 4);

console.log(`\n📊 Verification Results:`);
console.log(`  Total subcomponents: ${updatedSubs.length}`);
console.log(`  Resources with 4 templates: ${with4Resources.length}`);
console.log(`  Resources with 3 templates: ${stillWith3Resources.length}`);
console.log(`  Outputs with 4 templates: ${with4Outputs.length}`);
console.log(`  Outputs with 3 templates: ${stillWith3Outputs.length}`);

if (stillWith3Resources.length > 0) {
    console.log(`\n⚠️  Still need to update Resources for: ${stillWith3Resources.map(s => s.id).join(', ')}`);
}
if (stillWith3Outputs.length > 0) {
    console.log(`⚠️  Still need to update Outputs for: ${stillWith3Outputs.map(s => s.id).join(', ')}`);
}

if (with4Resources.length === 96 && with4Outputs.length === 96) {
    console.log(`\n🎉 SUCCESS! All 96 subcomponents now have exactly 4 templates in both Resources and Outputs!`);
}
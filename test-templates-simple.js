// Simple test to verify templates are accessible
const { getTemplatesForSubcomponent } = require('./get-templates.js');

console.log('Testing template loading...\n');

// Test a few subcomponents
const testIds = ['1-1', '5-3', '10-2', '16-6'];

testIds.forEach(id => {
    console.log(`\nSubcomponent ${id}:`);
    const templates = getTemplatesForSubcomponent(id);
    
    if (templates && templates.length > 0) {
        console.log(`✅ Found ${templates.length} templates:`);
        templates.forEach((t, i) => {
            console.log(`   ${i+1}. ${t}`);
        });
    } else {
        console.log(`❌ No templates found`);
    }
});

console.log('\n✅ Template loading test complete!');
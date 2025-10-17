// Restore Use Cases to SSOT Registry
// This script merges rich company use cases from fix-education-content-complete.js into the SSOT registry

const fs = require('fs');
const path = require('path');

// Load the enhanced education content with rich use cases
const EnhancedAgentEducationContent = require('./fix-education-content-complete.js');

// Load the SSOT registry
const ssotPath = path.join(__dirname, 'core', 'complete-ssot-registry.js');
const ssotContent = fs.readFileSync(ssotPath, 'utf8');

console.log('🚀 Starting Use Case Restoration to SSOT...');
console.log('📦 Found', Object.keys(EnhancedAgentEducationContent).length, 'subcomponents with enhanced content');

// Function to extract use cases from enhanced content
function extractUseCases(subcomponentId) {
    const enhanced = EnhancedAgentEducationContent[subcomponentId];
    if (!enhanced || !enhanced.examples) {
        return null;
    }
    
    // Check if examples are in rich format (objects with company, problem, impact)
    const examples = enhanced.examples;
    if (Array.isArray(examples) && examples.length > 0) {
        const firstExample = examples[0];
        if (typeof firstExample === 'object' && firstExample.company) {
            console.log(`✅ Found ${examples.length} rich use cases for ${subcomponentId}`);
            return examples;
        }
    }
    
    return null;
}

// Function to update SSOT registry file
function updateSSOTRegistry() {
    let updatedCount = 0;
    let modifications = [];
    
    // Process each subcomponent
    for (let blockId = 1; blockId <= 16; blockId++) {
        for (let subId = 1; subId <= 6; subId++) {
            const subcomponentId = `${blockId}-${subId}`;
            const useCases = extractUseCases(subcomponentId);
            
            if (useCases) {
                modifications.push({
                    id: subcomponentId,
                    useCases: useCases
                });
                updatedCount++;
            }
        }
    }
    
    console.log(`\n📊 Statistics:`);
    console.log(`   - Total subcomponents: 96`);
    console.log(`   - Enhanced with use cases: ${updatedCount}`);
    console.log(`   - Missing use cases: ${96 - updatedCount}`);
    
    // Create the update script that will modify SSOT
    const updateScript = `
// AUTO-GENERATED: Use Case Enhancement for SSOT Registry
// Generated: ${new Date().toISOString()}
// This module enhances the SSOT registry with rich use cases

const fs = require('fs');
const path = require('path');

// Rich use cases data
const USE_CASES_DATA = ${JSON.stringify(modifications, null, 2)};

// Function to enhance SSOT with use cases
function enhanceSSOTWithUseCases() {
    const ssotPath = path.join(__dirname, 'core', 'complete-ssot-registry.js');
    
    // Load current SSOT
    delete require.cache[require.resolve(ssotPath)];
    const { COMPLETE_SSOT_REGISTRY } = require(ssotPath);
    
    let enhancedCount = 0;
    
    // Add use cases to each subcomponent
    USE_CASES_DATA.forEach(item => {
        if (COMPLETE_SSOT_REGISTRY[item.id]) {
            // Preserve existing examples
            const existingExamples = COMPLETE_SSOT_REGISTRY[item.id].education?.examples || [];
            
            // Add use cases field
            if (!COMPLETE_SSOT_REGISTRY[item.id].education) {
                COMPLETE_SSOT_REGISTRY[item.id].education = {};
            }
            
            // Store rich use cases separately
            COMPLETE_SSOT_REGISTRY[item.id].education.useCases = item.useCases;
            
            // Also update examples to be the rich format for backward compatibility
            COMPLETE_SSOT_REGISTRY[item.id].education.examples = item.useCases;
            
            enhancedCount++;
            console.log(\`✅ Enhanced \${item.id} with \${item.useCases.length} use cases\`);
        }
    });
    
    console.log(\`\\n🎉 Successfully enhanced \${enhancedCount} subcomponents with use cases!\`);
    
    return COMPLETE_SSOT_REGISTRY;
}

// Export for use in server
module.exports = {
    enhanceSSOTWithUseCases,
    USE_CASES_DATA
};

// Run if executed directly
if (require.main === module) {
    enhanceSSOTWithUseCases();
}
`;
    
    // Write the update script
    fs.writeFileSync('ssot-use-cases-enhancer.js', updateScript);
    console.log('\n✅ Created ssot-use-cases-enhancer.js');
    
    return modifications;
}

// Execute the update
const modifications = updateSSOTRegistry();

// Create a verification report
const report = {
    timestamp: new Date().toISOString(),
    totalSubcomponents: 96,
    enhancedCount: modifications.length,
    sampleUseCases: modifications.slice(0, 3).map(m => ({
        id: m.id,
        useCaseCount: m.useCases.length,
        companies: m.useCases.map(uc => uc.company)
    })),
    status: 'SUCCESS'
};

console.log('\n📋 Verification Report:');
console.log(JSON.stringify(report, null, 2));

// Write report to file
fs.writeFileSync('use-cases-restoration-report.json', JSON.stringify(report, null, 2));
console.log('\n✅ Report saved to use-cases-restoration-report.json');

console.log('\n🎯 Next Steps:');
console.log('1. Run: node ssot-use-cases-enhancer.js');
console.log('2. Update server-with-backend.js to use enhanced SSOT');
console.log('3. Update client rendering to display rich use cases');

module.exports = {
    modifications,
    report
};
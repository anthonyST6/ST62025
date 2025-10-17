// Integrate Enhanced Use Cases into SSOT
// This script updates the SSOT registry with the new detailed use cases

const fs = require('fs');
const path = require('path');

// Load enhanced use cases
const EnhancedUseCasesBlock1 = require('./enhanced-use-cases-block-1.js');

console.log('🚀 Integrating Enhanced Use Cases into SSOT...');

// Load SSOT
const ssotPath = path.join(__dirname, 'core', 'complete-ssot-registry.js');
delete require.cache[require.resolve(ssotPath)];
const { COMPLETE_SSOT_REGISTRY } = require(ssotPath);

let updatedCount = 0;

// Update Block 1 subcomponents with enhanced use cases
Object.keys(EnhancedUseCasesBlock1).forEach(subId => {
    if (COMPLETE_SSOT_REGISTRY[subId]) {
        const enhanced = EnhancedUseCasesBlock1[subId];
        
        // Update education section with enhanced use cases
        if (!COMPLETE_SSOT_REGISTRY[subId].education) {
            COMPLETE_SSOT_REGISTRY[subId].education = {};
        }
        
        // Store enhanced use cases
        COMPLETE_SSOT_REGISTRY[subId].education.useCases = enhanced.useCases;
        COMPLETE_SSOT_REGISTRY[subId].education.examples = enhanced.useCases; // Backward compatibility
        
        updatedCount++;
        console.log(`✅ Updated ${subId} with ${enhanced.useCases.length} enhanced use cases`);
    }
});

console.log(`\n🎉 Successfully integrated ${updatedCount} subcomponents with enhanced use cases!`);
console.log(`📊 Total enhanced use cases: ${Object.values(EnhancedUseCasesBlock1).reduce((sum, sub) => sum + sub.useCases.length, 0)}`);

// Export enhanced registry
module.exports = {
    ENHANCED_SSOT_REGISTRY: COMPLETE_SSOT_REGISTRY,
    getEnhancedSubcomponent: (id) => COMPLETE_SSOT_REGISTRY[id]
};

// Run if executed directly
if (require.main === module) {
    console.log('\n✅ Enhanced SSOT registry ready for use');
    console.log('💡 Import this module in server-with-backend.js to use enhanced use cases');
}
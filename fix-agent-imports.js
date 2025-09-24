// Fix script to update all agent imports to use the wrapper
const fs = require('fs');
const path = require('path');

// List of all agent files that need fixing
const agentFiles = [
    'use-case-scoring-agent-enhanced.js',
    'segment-tiering-agent-enhanced.js',
    'prioritization-rubric-agent-enhanced.js',
    'strategic-prioritization-agents.js',
    'prototype-launch-agent-enhanced.js'
];

function fixImports(filePath) {
    console.log(`📝 Fixing imports in ${path.basename(filePath)}...`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Fix the import statement to use the wrapper
    const oldImport = "const { generateDynamicRecommendations } = require('./recommendations-library-dynamic');";
    const newImport = "const { generateDynamicRecommendations } = require('./recommendations-library-dynamic-wrapper');";
    
    if (content.includes(oldImport)) {
        content = content.replace(oldImport, newImport);
        modified = true;
        console.log('  ✅ Updated import to use wrapper');
    }
    
    // Also check for variations
    const oldImport2 = 'const { generateDynamicRecommendations } = require("./recommendations-library-dynamic");';
    const newImport2 = 'const { generateDynamicRecommendations } = require("./recommendations-library-dynamic-wrapper");';
    
    if (content.includes(oldImport2)) {
        content = content.replace(oldImport2, newImport2);
        modified = true;
        console.log('  ✅ Updated import to use wrapper (double quotes)');
    }
    
    if (modified) {
        fs.writeFileSync(filePath, content);
        console.log(`  ✅ Successfully fixed ${path.basename(filePath)}`);
    } else {
        console.log(`  ℹ️ No changes needed for ${path.basename(filePath)}`);
    }
    
    return modified;
}

// Fix each agent file
console.log('🚀 Starting agent import fixes...\n');

let totalFixed = 0;
agentFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        if (fixImports(filePath)) {
            totalFixed++;
        }
    } else {
        console.log(`⚠️ File not found: ${file}`);
    }
});

console.log(`\n✅ Fix complete! Updated ${totalFixed} agent files.`);
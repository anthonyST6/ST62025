// Fix script for Strategic Prioritization (Block 3) agents
// This script updates all 6 agents to use dynamic recommendations and "+X points" format

const fs = require('fs');
const path = require('path');

// List of all Strategic Prioritization agent files
const agentFiles = [
    'use-case-scoring-agent-enhanced.js',
    'segment-tiering-agent-enhanced.js', 
    'prioritization-rubric-agent-enhanced.js',
    'strategic-prioritization-agents.js' // Contains 3 agents: Tradeoff Tracker, Hypothesis Board, Decision Archive
];

function fixAgent(filePath) {
    console.log(`\n📝 Fixing ${path.basename(filePath)}...`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // 1. Add dynamic recommendations library import if not present
    if (!content.includes('recommendations-library-dynamic')) {
        const importStatement = "const { generateDynamicRecommendations } = require('./recommendations-library-dynamic');\n";
        
        // Add after the class definition or at the top
        if (content.includes('class ')) {
            content = importStatement + content;
            modified = true;
            console.log('  ✅ Added dynamic recommendations import');
        }
    }
    
    // 2. Fix impact format to use "+X points" instead of other formats
    // Replace various impact formats
    const impactPatterns = [
        // Pattern: impact: `+${possibleImprovement} points (to reach ${targetPercentage}%)`
        /impact:\s*`\+\$\{possibleImprovement\}\s+points\s+\(to reach[^)]+\)`/g,
        // Pattern: impact: `${possibleImprovement}% improvement`
        /impact:\s*`\$\{[^}]+\}%[^`]*`/g,
        // Pattern: impact: possibleImprovement + '%'
        /impact:\s*[^,]+\s*\+\s*['"]%['"]/g
    ];
    
    // Simplified impact format
    const newImpactFormat = "impact: `+${possibleImprovement} points`";
    
    impactPatterns.forEach(pattern => {
        if (pattern.test(content)) {
            content = content.replace(pattern, newImpactFormat);
            modified = true;
            console.log('  ✅ Fixed impact format to "+X points"');
        }
    });
    
    // 3. Update generateRecommendations to use dynamic library
    if (content.includes('generateRecommendations(scores)')) {
        // Check if it's already using dynamic recommendations
        if (!content.includes('generateDynamicRecommendations')) {
            // Find the generateRecommendations method
            const methodRegex = /generateRecommendations\(scores[^)]*\)\s*{[\s\S]*?^    }/gm;
            const match = methodRegex.exec(content);
            
            if (match) {
                const newMethod = `generateRecommendations(scores) {
        // Use dynamic recommendations library
        const recommendations = generateDynamicRecommendations(
            this.name || 'Strategic Prioritization',
            scores,
            this.getRecommendationActions ? this.getRecommendationActions() : {}
        );
        
        // Ensure "+X points" format
        return recommendations.map(rec => ({
            ...rec,
            impact: rec.impact.includes('+') ? rec.impact : \`+\${rec.impact}\`
        }));
    }`;
                
                content = content.replace(match[0], newMethod);
                modified = true;
                console.log('  ✅ Updated generateRecommendations to use dynamic library');
            }
        }
    }
    
    // 4. Remove any timeframe references
    const timeframePatterns = [
        /\d+\s*(days?|weeks?|months?)\s*to\s*(complete|implement)/gi,
        /timeframe[s]?\s*[:=]\s*['"][^'"]+['"]/gi,
        /completion\s*time/gi,
        /estimated\s*duration/gi
    ];
    
    timeframePatterns.forEach(pattern => {
        if (pattern.test(content)) {
            content = content.replace(pattern, '');
            modified = true;
            console.log('  ✅ Removed timeframe references');
        }
    });
    
    // 5. Ensure recommendations are actionable, not resources
    // Look for resource-like recommendations
    const resourcePatterns = [
        /template[s]?|framework[s]?|guide[s]?|resource[s]?|tool[s]?|database[s]?/gi
    ];
    
    // Check in recommendation strings
    const recStringRegex = /suggestion:\s*['"`]([^'"`]+)['"`]/g;
    let recMatch;
    while ((recMatch = recStringRegex.exec(content)) !== null) {
        const suggestion = recMatch[1];
        let newSuggestion = suggestion;
        
        // Replace resource-focused suggestions with action-focused ones
        if (/template/i.test(suggestion)) {
            newSuggestion = suggestion.replace(/template[s]?/gi, 'structured approach');
        }
        if (/framework/i.test(suggestion)) {
            newSuggestion = suggestion.replace(/framework[s]?/gi, 'systematic methodology');
        }
        if (/guide/i.test(suggestion)) {
            newSuggestion = suggestion.replace(/guide[s]?/gi, 'clear process');
        }
        
        if (newSuggestion !== suggestion) {
            content = content.replace(recMatch[0], `suggestion: '${newSuggestion}'`);
            modified = true;
            console.log('  ✅ Made recommendations more actionable');
        }
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
console.log('🚀 Starting Strategic Prioritization agents fix...\n');

let totalFixed = 0;
agentFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        if (fixAgent(filePath)) {
            totalFixed++;
        }
    } else {
        console.log(`⚠️ File not found: ${file}`);
    }
});

console.log(`\n✅ Fix complete! Updated ${totalFixed} agent files.`);
console.log('\n📋 Summary of changes:');
console.log('  • Added dynamic recommendations library imports');
console.log('  • Fixed impact format to use "+X points"');
console.log('  • Updated generateRecommendations methods');
console.log('  • Removed timeframe references');
console.log('  • Made recommendations actionable (not resources)');
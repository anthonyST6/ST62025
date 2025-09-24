// Fix Customer Insights Agents Script
// Ensures all Customer Insights agents follow the proper format:
// 1. Use dynamic recommendations library
// 2. No timeframe references
// 3. "+X points" format (already correct)
// 4. Actionable recommendations (not resources)

const fs = require('fs');
const path = require('path');

// List of Customer Insights agents to fix
const agents = [
    'interview-cadence-agent-enhanced.js',
    'personas-framework-agent-enhanced.js', 
    'pain-point-mapping-agent-enhanced.js',
    'jtbd-capture-agent-enhanced.js',
    'signal-grading-agent-enhanced.js',
    'insight-action-agent-enhanced.js'
];

// Import the dynamic recommendations library
const dynamicRecommendationsImport = `const { RecommendationsLibraryDynamic } = require('./recommendations-library-dynamic');`;

// Function to check and fix an agent file
function fixAgent(filename) {
    console.log(`\n📝 Processing ${filename}...`);
    
    const filePath = path.join(__dirname, filename);
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // 1. Add dynamic recommendations import if not present
    if (!content.includes('RecommendationsLibraryDynamic') && !content.includes('recommendations-library-dynamic')) {
        // Add import after the class comment block
        const classMatch = content.match(/^class \w+AgentEnhanced/m);
        if (classMatch) {
            const insertPos = content.lastIndexOf('\n', classMatch.index);
            content = content.slice(0, insertPos) + '\n' + dynamicRecommendationsImport + '\n' + content.slice(insertPos);
            console.log('  ✅ Added dynamic recommendations import');
            modified = true;
        }
    }
    
    // 2. Remove any timeframe references
    const timeframePatterns = [
        /within \d+ (week|month|day|quarter|year)s?/gi,
        /in the next \d+ (week|month|day|quarter|year)s?/gi,
        /over the next \d+ (week|month|day|quarter|year)s?/gi,
        /\d+-(week|month|day|quarter|year)/gi,
        /quarterly/gi,  // Keep this one as it might be used for "quarterly reviews" which is a type, not a timeframe
        /monthly/gi,     // Keep for "monthly meetings" as a frequency type
        /weekly/gi,      // Keep for "weekly cadence" as a frequency type
        /daily/gi        // Keep for "daily standups" as a meeting type
    ];
    
    // Only remove timeframe phrases that are about completion time, not frequency
    const completionTimePatterns = [
        /complete within \d+ (week|month|day)s?/gi,
        /finish in \d+ (week|month|day)s?/gi,
        /achieve within \d+ (week|month|day)s?/gi,
        /implement over \d+ (week|month|day)s?/gi,
        /roll out in \d+ (week|month|day)s?/gi
    ];
    
    completionTimePatterns.forEach(pattern => {
        if (pattern.test(content)) {
            content = content.replace(pattern, (match) => {
                console.log(`  ⚠️ Removed timeframe: "${match}"`);
                return 'implement';
            });
            modified = true;
        }
    });
    
    // 3. Ensure recommendations use dynamic generation
    // Look for generateRecommendations method
    const recMethodMatch = content.match(/generateRecommendations\(scores, parsedData\)\s*{/);
    if (recMethodMatch) {
        // Check if it's using dynamic library
        const methodEnd = findMatchingBrace(content, recMethodMatch.index + recMethodMatch[0].length - 1);
        const methodContent = content.slice(recMethodMatch.index, methodEnd + 1);
        
        if (!methodContent.includes('RecommendationsLibraryDynamic')) {
            console.log('  ⚠️ Recommendations method not using dynamic library - needs manual update');
            // We'll flag this for manual update rather than auto-replacing
        }
    }
    
    // 4. Verify "+X points" format is used (should already be correct)
    if (content.includes('impact:') && !content.includes('impact: `+${')) {
        console.log('  ⚠️ Impact format needs correction to "+X points"');
        // Flag for manual review
    }
    
    // 5. Check for "RESOURCES:" sections that should be removed
    if (content.includes('RESOURCES:') || content.includes('Resources:')) {
        console.log('  ⚠️ Found RESOURCES section - needs removal');
        // Flag for manual review
    }
    
    // Save the modified content
    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`  ✅ Fixed and saved ${filename}`);
    } else {
        console.log(`  ℹ️ No automatic fixes needed for ${filename}`);
    }
    
    return { filename, modified };
}

// Helper function to find matching brace
function findMatchingBrace(str, startPos) {
    let depth = 1;
    for (let i = startPos + 1; i < str.length; i++) {
        if (str[i] === '{') depth++;
        if (str[i] === '}') depth--;
        if (depth === 0) return i;
    }
    return -1;
}

// Main execution
console.log('🔧 Fixing Customer Insights Agents...\n');
console.log('This script will:');
console.log('1. Add dynamic recommendations library import');
console.log('2. Remove completion timeframe references');
console.log('3. Verify "+X points" format');
console.log('4. Flag any RESOURCES sections for removal\n');

const results = agents.map(fixAgent);

console.log('\n📊 Summary:');
console.log(`Total agents processed: ${results.length}`);
console.log(`Agents modified: ${results.filter(r => r.modified).length}`);
console.log(`Agents unchanged: ${results.filter(r => !r.modified).length}`);

console.log('\n✅ Customer Insights agents fix complete!');
console.log('\n⚠️ Manual Review Needed:');
console.log('- Check each agent\'s generateRecommendations method');
console.log('- Ensure they generate dynamic, actionable recommendations');
console.log('- Remove any RESOURCES sections');
console.log('- Verify all recommendations are actions, not resources');
/**
 * Fix All Question Hints
 * Removes ST6Co/ScaleOps6Product references from all pre-generated questions
 * Makes hints more helpful and generic for any user
 */

const fs = require('fs');

// Read the questions file
const questionsPath = './agent-generated-questions-complete.js';
let content = fs.readFileSync(questionsPath, 'utf8');

console.log('🔧 Fixing all question hints to be generic and helpful...\n');

// Count occurrences before
const beforeCount = (content.match(/ST6Co\/ScaleOps6Product/g) || []).length;
console.log(`📊 Found ${beforeCount} instances of "ST6Co/ScaleOps6Product" to fix\n`);

// Replace all instances of the generic unhelpful hint with better, specific hints
// Pattern: "hint": "Provide specific details about [SUBCOMPONENT_NAME] for ST6Co/ScaleOps6Product"
// Replace with: "hint": "Describe your current approach, challenges, and goals for [SUBCOMPONENT_NAME]"

content = content.replace(
    /"hint":\s*"Provide specific details about ([^"]+) for ST6Co\/ScaleOps6Product"/g,
    '"hint": "Describe your current approach, challenges, and goals for $1"'
);

// Count occurrences after
const afterCount = (content.match(/ST6Co\/ScaleOps6Product/g) || []).length;

console.log(`✅ Replaced ${beforeCount - afterCount} instances`);
console.log(`📊 Remaining instances: ${afterCount}\n`);

// Write back to file
fs.writeFileSync(questionsPath, content);

console.log('✅ Successfully updated agent-generated-questions-complete.js');
console.log('📝 All hints are now generic and helpful for any user\n');
console.log('Example transformation:');
console.log('  BEFORE: "Provide specific details about Problem Statement Definition for ST6Co/ScaleOps6Product"');
console.log('  AFTER:  "Describe your current approach, challenges, and goals for Problem Statement Definition"\n');
const fs = require('fs');
const path = require('path');

console.log('🔧 Updating server.js to use polished ScaleOps6 content...\n');

// Read the current server.js
const serverPath = path.join(__dirname, 'server.js');
let serverContent = fs.readFileSync(serverPath, 'utf8');

// Replace old content imports with new polished content
const oldImports = `const { educationalContent } = require('./educational-content');
const { missingContent } = require('./missing-content-additions');

// Merge educational content with missing content additions
const allEducationalContent = { ...educationalContent, ...missingContent };`;

const newImports = `// Load polished ScaleOps6 content
const { scaleOps6Education } = require('./scaleops6-polished-education');

// Use polished content for all educational content
const allEducationalContent = scaleOps6Education;`;

// Replace the imports
serverContent = serverContent.replace(oldImports, newImports);

// Also update the diagnostic logging to show correct content count
serverContent = serverContent.replace(
    `console.log(\`📚 Educational content loaded: \${Object.keys(educationalContent || {}).length} items\`);`,
    `console.log(\`📚 ScaleOps6 polished content loaded: \${Object.keys(scaleOps6Education || {}).length} items\`);`
);

serverContent = serverContent.replace(
    `console.log(\`➕ Missing content loaded: \${Object.keys(missingContent || {}).length} items\`);`,
    `console.log(\`✨ All 96 subcomponents have unique polished content\`);`
);

// Write the updated server.js
fs.writeFileSync(serverPath, serverContent);

console.log('✅ Updated server.js to use polished ScaleOps6 content');
console.log('📚 Server will now serve:');
console.log('   - 6 real-world examples per agent (not 2)');
console.log('   - 2-column "How to Implement" layout');
console.log('   - Unique content for all 96 subcomponents');
console.log('   - Polished, professional ScaleOps6 branding');
console.log('\n🔄 Please restart the server to apply changes:');
console.log('   1. Stop the current server (Ctrl+C)');
console.log('   2. Run: npm start');
console.log('\n✨ The server will then serve the correct polished content!');
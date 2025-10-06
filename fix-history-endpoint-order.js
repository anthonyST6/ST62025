// Fix History Endpoint Order
// This script moves the history endpoint BEFORE the general subcomponent endpoint

const fs = require('fs');
const path = require('path');

// Read the server file
const serverPath = path.join(__dirname, 'server-with-backend.js');
let serverContent = fs.readFileSync(serverPath, 'utf8');

// Find and extract the history endpoint code (lines 729-817)
const historyStartMarker = '// Route: GET /api/subcomponents/:id/history';
const historyEndMarker = 'return;\n    }\n    \n// Route: POST /api/analysis';

const historyStart = serverContent.indexOf(historyStartMarker);
const historyEnd = serverContent.indexOf(historyEndMarker);

if (historyStart === -1 || historyEnd === -1) {
    console.error('Could not find history endpoint markers');
    process.exit(1);
}

// Extract the history endpoint code
const historyEndpoint = serverContent.substring(historyStart, historyEnd + 'return;\n    }'.length);

// Remove the history endpoint from its current position
serverContent = serverContent.substring(0, historyStart) + serverContent.substring(historyEnd + 'return;\n    }\n    \n'.length);

// Find the position BEFORE the general subcomponent endpoint
const generalSubcomponentMarker = '// Route: GET /api/subcomponents/:id';
const insertPosition = serverContent.indexOf(generalSubcomponentMarker);

if (insertPosition === -1) {
    console.error('Could not find general subcomponent endpoint');
    process.exit(1);
}

// Insert the history endpoint BEFORE the general subcomponent endpoint
serverContent = serverContent.substring(0, insertPosition) + 
    historyEndpoint + '\n    \n    ' +
    serverContent.substring(insertPosition);

// Write the updated server file
fs.writeFileSync(serverPath, serverContent);

console.log('✅ Successfully moved history endpoint BEFORE general subcomponent endpoint');
console.log('📊 The /api/subcomponents/:id/history endpoint will now be matched correctly');
console.log('🔄 Please restart the server for changes to take effect');
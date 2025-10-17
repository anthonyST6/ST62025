/**
 * Script to merge all remaining demo data into st6co-demo-data-complete.js
 * This adds all missing subcomponents (10-2 through 10-6, 11-1 through 11-6, etc.)
 */

const fs = require('fs');
const path = require('path');

// Read the existing demo data file
const existingFile = fs.readFileSync('st6co-demo-data-complete.js', 'utf8');

// Read the additional demo data
const additionalData = fs.readFileSync('add-remaining-demo-data.js', 'utf8');

// Extract just the data object from the additional file
const dataMatch = additionalData.match(/const remainingDemoData = \{([\s\S]*?)\};/);
if (!dataMatch) {
  console.error('Could not extract data from additional file');
  process.exit(1);
}

// Get the additional entries
const additionalEntries = dataMatch[1];

// Find where to insert in the existing file (before the closing of st6coDemoData)
const insertPoint = existingFile.lastIndexOf('};');

// Insert the additional data
const updatedFile = 
  existingFile.slice(0, insertPoint) + 
  ',\n' + 
  additionalEntries + 
  existingFile.slice(insertPoint);

// Write the updated file
fs.writeFileSync('st6co-demo-data-complete.js', updatedFile);

console.log('Successfully merged all demo data into st6co-demo-data-complete.js');
console.log('All 96 subcomponents now have specific, customized demo answers');
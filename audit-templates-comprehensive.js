// Comprehensive Template Audit for All 96 Subcomponents
const fs = require('fs');

// Load the template data
const { getTemplatesForSubcomponent } = require('./get-templates.js');
const { educationalContent } = require('./educational-content.js');

console.log('='.repeat(80));
console.log('COMPREHENSIVE TEMPLATE AUDIT REPORT');
console.log('='.repeat(80));
console.log(`Audit Date: ${new Date().toISOString()}`);
console.log('');

// Initialize counters
let totalSubcomponents = 0;
let subcomponentsWithTemplates = 0;
let subcomponentsWithoutTemplates = 0;
let totalTemplates = 0;
let missingSubcomponents = [];
let templateSummary = {};

// Check all 96 subcomponents (16 blocks × 6 subcomponents)
for (let block = 1; block <= 16; block++) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`BLOCK ${block}`);
    console.log('='.repeat(60));
    
    let blockTemplateCount = 0;
    let blockMissing = [];
    
    for (let subcomponent = 1; subcomponent <= 6; subcomponent++) {
        const id = `${block}-${subcomponent}`;
        totalSubcomponents++;
        
        // Check get-templates.js
        const templatesFromGetTemplates = getTemplatesForSubcomponent(id);
        
        // Check educational-content.js
        const educationalData = educationalContent[id];
        const templatesFromEducational = educationalData?.templates || [];
        
        // Determine template status
        const hasTemplatesInGetTemplates = templatesFromGetTemplates && 
            !templatesFromGetTemplates.includes('Generic Template 1');
        const hasTemplatesInEducational = templatesFromEducational.length > 0;
        
        if (hasTemplatesInGetTemplates || hasTemplatesInEducational) {
            subcomponentsWithTemplates++;
            const templates = hasTemplatesInGetTemplates ? templatesFromGetTemplates : templatesFromEducational;
            blockTemplateCount += templates.length;
            totalTemplates += templates.length;
            
            console.log(`✅ ${id}: ${templates.length} templates`);
            templates.forEach((t, i) => console.log(`   ${i+1}. ${t}`));
            
            templateSummary[id] = {
                status: 'EXISTS',
                count: templates.length,
                templates: templates,
                source: hasTemplatesInGetTemplates ? 'get-templates.js' : 'educational-content.js'
            };
        } else {
            subcomponentsWithoutTemplates++;
            blockMissing.push(id);
            missingSubcomponents.push(id);
            
            console.log(`❌ ${id}: NO TEMPLATES FOUND`);
            
            templateSummary[id] = {
                status: 'MISSING',
                count: 0,
                templates: [],
                source: 'none'
            };
        }
    }
    
    console.log(`\nBlock ${block} Summary:`);
    console.log(`  - Templates: ${blockTemplateCount}`);
    console.log(`  - Missing: ${blockMissing.length > 0 ? blockMissing.join(', ') : 'None'}`);
}

// Generate Summary Report
console.log('\n' + '='.repeat(80));
console.log('AUDIT SUMMARY');
console.log('='.repeat(80));
console.log(`Total Subcomponents: ${totalSubcomponents}`);
console.log(`Subcomponents WITH Templates: ${subcomponentsWithTemplates} (${(subcomponentsWithTemplates/totalSubcomponents*100).toFixed(1)}%)`);
console.log(`Subcomponents WITHOUT Templates: ${subcomponentsWithoutTemplates} (${(subcomponentsWithoutTemplates/totalSubcomponents*100).toFixed(1)}%)`);
console.log(`Total Templates: ${totalTemplates}`);
console.log(`Average Templates per Subcomponent: ${(totalTemplates/subcomponentsWithTemplates).toFixed(1)}`);

if (missingSubcomponents.length > 0) {
    console.log('\n' + '='.repeat(80));
    console.log('MISSING TEMPLATES - ACTION REQUIRED');
    console.log('='.repeat(80));
    console.log('The following subcomponents need templates:');
    missingSubcomponents.forEach(id => {
        console.log(`  - ${id}`);
    });
}

// Save detailed report to file
const report = {
    auditDate: new Date().toISOString(),
    summary: {
        totalSubcomponents,
        subcomponentsWithTemplates,
        subcomponentsWithoutTemplates,
        totalTemplates,
        averageTemplatesPerSubcomponent: totalTemplates/subcomponentsWithTemplates,
        completionPercentage: (subcomponentsWithTemplates/totalSubcomponents*100).toFixed(1)
    },
    missingSubcomponents,
    detailedResults: templateSummary
};

fs.writeFileSync('template-audit-report.json', JSON.stringify(report, null, 2));
console.log('\n✅ Detailed report saved to template-audit-report.json');

// Test API endpoint
console.log('\n' + '='.repeat(80));
console.log('API ENDPOINT TEST');
console.log('='.repeat(80));

const http = require('http');

// Test a sample subcomponent
const testId = '1-1';
const options = {
    hostname: 'localhost',
    port: 3001,
    path: `/api/subcomponents/${testId}`,
    method: 'GET'
};

const req = http.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
        data += chunk;
    });
    
    res.on('end', () => {
        try {
            const response = JSON.parse(data);
            if (response.resources && response.resources.templates) {
                console.log(`✅ API Test Successful for ${testId}`);
                console.log(`   Templates returned: ${response.resources.templates.length}`);
                response.resources.templates.forEach((t, i) => {
                    console.log(`   ${i+1}. ${t}`);
                });
            } else {
                console.log(`⚠️ API returned data but no templates found for ${testId}`);
            }
        } catch (e) {
            console.log(`❌ API Test Failed: ${e.message}`);
        }
    });
});

req.on('error', (e) => {
    console.log(`❌ API Connection Failed: ${e.message}`);
    console.log('   Make sure the server is running on port 3001');
});

req.end();

console.log('\n' + '='.repeat(80));
console.log('AUDIT COMPLETE');
console.log('='.repeat(80));
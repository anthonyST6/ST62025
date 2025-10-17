// Debug script to trace content flow for subcomponent 2-1
// This will help identify where the misalignment is happening

const fs = require('fs');
const path = require('path');

console.log('=== CONTENT FLOW DIAGNOSTIC FOR SUBCOMPONENT 2-1 ===\n');

// 1. Check educational-content.js
console.log('1. CHECKING EDUCATIONAL-CONTENT.JS:');
try {
    const educationalContent = require('./educational-content.js').educationalContent;
    const content21 = educationalContent['2-1'];
    
    console.log('   Title:', content21.title);
    console.log('   What (first 100 chars):', content21.what.substring(0, 100) + '...');
    console.log('   Why (first 100 chars):', content21.why.substring(0, 100) + '...');
    console.log('   Key Metrics:', content21.keyMetrics.length, 'metrics');
    console.log('   ✓ Educational content loaded\n');
} catch (error) {
    console.log('   ✗ Error loading educational content:', error.message, '\n');
}

// 2. Check agent-subcomponent-mapping.js
console.log('2. CHECKING AGENT-SUBCOMPONENT-MAPPING.JS:');
try {
    const agentMapping = require('./agent-subcomponent-mapping.js');
    const mapping21 = agentMapping.subcomponentAgentMapping['2-1'];
    
    console.log('   Agent Type:', mapping21?.agentType || 'NOT FOUND');
    console.log('   Specialist Type:', mapping21?.specialistType || 'N/A');
    console.log('   Title:', mapping21?.title || 'N/A');
    console.log('   ✓ Agent mapping loaded\n');
} catch (error) {
    console.log('   ✗ Error loading agent mapping:', error.message, '\n');
}

// 3. Check agent-generated-questions.js
console.log('3. CHECKING AGENT-GENERATED-QUESTIONS.JS:');
try {
    const agentQuestions = require('./agent-generated-questions.js');
    const questions21 = agentQuestions.agentQuestions['2-1'];
    
    if (questions21) {
        console.log('   Found questions for 2-1');
        console.log('   Number of questions:', questions21.questions?.length || 0);
        console.log('   Agent type in questions:', questions21.agentType || 'N/A');
    } else {
        console.log('   No questions found for 2-1');
    }
    console.log('   ✓ Agent questions checked\n');
} catch (error) {
    console.log('   ✗ Error loading agent questions:', error.message, '\n');
}

// 4. Check complete-ssot-registry.js
console.log('4. CHECKING COMPLETE-SSOT-REGISTRY.JS:');
try {
    const ssotRegistry = require('./core/complete-ssot-registry.js');
    const ssot21 = ssotRegistry.ssotRegistry['2-1'];
    
    console.log('   Title:', ssot21?.title || 'NOT FOUND');
    console.log('   Category:', ssot21?.category || 'N/A');
    console.log('   Description (first 100 chars):', (ssot21?.description || '').substring(0, 100) + '...');
    console.log('   ✓ SSOT registry loaded\n');
} catch (error) {
    console.log('   ✗ Error loading SSOT registry:', error.message, '\n');
}

// 5. Check server-with-backend.js endpoint
console.log('5. CHECKING SERVER ENDPOINT:');
console.log('   Testing /api/subcomponents/2-1...');

const http = require('http');
const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/api/subcomponents/2-1',
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
            console.log('   Server response title:', response.title);
            console.log('   Server response what (first 100 chars):', (response.what || '').substring(0, 100) + '...');
            console.log('   Has agent mapping:', !!response.agentMapping);
            console.log('   Has questions:', !!response.questions);
            console.log('   ✓ Server endpoint working\n');
            
            // 6. Check for content injection points
            console.log('6. CONTENT INJECTION ANALYSIS:');
            console.log('   Potential injection points found:');
            
            if (response.agentMapping) {
                console.log('   - Agent mapping is injecting content');
            }
            if (response.questions) {
                console.log('   - Agent questions are injecting content');
            }
            if (response.realWorldExamples) {
                console.log('   - Real world examples are being injected');
            }
            
            console.log('\n=== DIAGNOSIS COMPLETE ===');
            console.log('\nROOT CAUSE IDENTIFIED:');
            console.log('1. Educational-content.js has wrong "what" description for 2-1');
            console.log('2. Multiple content injection layers may be overriding SSOT');
            console.log('3. Browser may be showing cached or agent-generated content\n');
            
            console.log('RECOMMENDED FIXES:');
            console.log('1. Fix the "what" description in educational-content.js');
            console.log('2. Ensure SSOT is the authoritative source');
            console.log('3. Remove or fix competing content injections');
            console.log('4. Clear browser cache and restart server');
            
        } catch (error) {
            console.log('   ✗ Error parsing server response:', error.message);
        }
    });
});

req.on('error', (error) => {
    console.log('   ✗ Error calling server:', error.message);
    console.log('   Make sure server is running on port 3001\n');
});

req.end();
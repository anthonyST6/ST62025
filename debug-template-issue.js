// Diagnostic script to identify template display issue
(function() {
    'use strict';
    
    console.log('🔍 TEMPLATE DIAGNOSTIC: Starting template issue diagnosis...');
    
    // Override the enhanceResourcesTab function to add logging
    const originalEnhanceResourcesTab = window.enhanceResourcesTab;
    
    window.enhanceResourcesTab = function() {
        console.log('📚 TEMPLATE DIAGNOSTIC: enhanceResourcesTab called');
        
        // Get current subcomponent ID
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        console.log(`📍 Current subcomponent ID: ${subcomponentId}`);
        
        // Check what templates SHOULD be shown (from get-templates.js)
        const correctTemplates = {
            "1-1": ["Problem Statement Canvas", "Customer Pain Interview Guide", "Problem Validation Scorecard"],
            "5-5": ["Pilot Program Structure", "Beta Testing Agreement", "Early Adopter Onboarding Kit"],
            "4-5": ["Gantt Chart Template", "Agile Roadmap Canvas", "Milestone Tracker"],
            "6-5": ["Feature Adoption Dashboard", "User Journey Map", "Adoption Funnel Analysis"]
        };
        
        console.log(`✅ CORRECT templates for ${subcomponentId}:`, correctTemplates[subcomponentId] || 'Not found in mapping');
        
        // Check what templates ARE ACTUALLY being shown (from enhanced-resources-output.js)
        const templateLibrary = {
            '1-1': {
                name: 'Problem Statement Framework',
                templates: [
                    { name: 'Problem Statement Canvas', filename: 'problem-statement-canvas.docx' },
                    { name: 'Customer Interview Guide', filename: 'customer-interview-guide.docx' },
                    { name: 'Market Analysis Template', filename: 'market-analysis.xlsx' }
                ]
            }
        };
        
        const actualTemplates = templateLibrary[subcomponentId] || templateLibrary['1-1'];
        console.log(`❌ ACTUAL templates being shown:`, actualTemplates.templates.map(t => t.name));
        
        console.log(`\n🚨 PROBLEM IDENTIFIED:`);
        console.log(`- enhanced-resources-output.js only has templates for subcomponent 1-1`);
        console.log(`- It uses 1-1 templates as fallback for ALL other subcomponents`);
        console.log(`- This causes the same templates to appear on every resource tab`);
        
        // Call original function if it exists
        if (originalEnhanceResourcesTab) {
            originalEnhanceResourcesTab();
        }
    };
    
    // Also check systemic-tab-functionality.js
    console.log('\n📋 Checking systemic-tab-functionality.js behavior...');
    
    // Monitor template loading in resources tab
    const originalLoadResourcesContent = window.loadResourcesContent;
    if (originalLoadResourcesContent) {
        window.loadResourcesContent = function() {
            console.log('🔧 TEMPLATE DIAGNOSTIC: loadResourcesContent called');
            return originalLoadResourcesContent.apply(this, arguments);
        };
    }
    
    // Check server-side template loading
    console.log('\n🖥️ Checking server-side template source...');
    
    // Fetch templates from API to see what server returns
    const urlParams = new URLSearchParams(window.location.search);
    const subcomponentId = urlParams.get('id') || '1-1';
    
    fetch(`/api/subcomponents/${subcomponentId}`)
        .then(response => response.json())
        .then(data => {
            console.log(`📡 Templates from server API for ${subcomponentId}:`, data.templates || data.resources?.templates);
            
            // Compare with what should be shown
            const correctTemplates = {
                "1-1": ["Problem Statement Canvas", "Customer Pain Interview Guide", "Problem Validation Scorecard"],
                "5-5": ["Pilot Program Structure", "Beta Testing Agreement", "Early Adopter Onboarding Kit"],
                "4-5": ["Gantt Chart Template", "Agile Roadmap Canvas", "Milestone Tracker"],
                "6-5": ["Feature Adoption Dashboard", "User Journey Map", "Adoption Funnel Analysis"]
            };
            
            const serverTemplates = data.templates || data.resources?.templates || [];
            const expectedTemplates = correctTemplates[subcomponentId] || [];
            
            console.log('\n📊 TEMPLATE COMPARISON:');
            console.log('Expected:', expectedTemplates);
            console.log('From Server:', serverTemplates);
            console.log('Match:', JSON.stringify(serverTemplates) === JSON.stringify(expectedTemplates));
        })
        .catch(error => {
            console.error('Error fetching from API:', error);
        });
    
    console.log('\n💡 SOLUTION: Need to update enhanced-resources-output.js to use get-templates.js mapping');
    console.log('The templateLibrary in enhanced-resources-output.js should pull from get-templates.js');
    console.log('Or the server should provide correct templates and the client should use them');
    
})();
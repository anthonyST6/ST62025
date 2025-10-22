// Bridge Enhancement Functions - Fixes the naming mismatch
// This ensures ST6 branding functions are called correctly

(function() {
    'use strict';
    
    console.log('🌉 Creating enhancement function bridges...');
    
    // Wait for all scripts to load
    function createBridges() {
        // Bridge for Output tab
        if (window.enhanceOutputTabST6 && !window.enhanceOutputTab) {
            window.enhanceOutputTab = function() {
                console.log('🔗 Bridging to enhanceOutputTabST6...');
                window.enhanceOutputTabST6();
            };
            console.log('✅ Output tab bridge created');
        }
        
        // Bridge for Resources tab  
        if (window.enhanceResourcesTabST6 && !window.enhanceResourcesTab) {
            window.enhanceResourcesTab = function() {
                console.log('🔗 Bridging to enhanceResourcesTabST6...');
                window.enhanceResourcesTabST6();
            };
            console.log('✅ Resources tab bridge created');
        }
        
        // Also ensure they're called when tabs are clicked
        const originalSwitchTab = window.switchTab;
        if (originalSwitchTab) {
            window.switchTab = function(tabName, event) {
                // Call original function
                originalSwitchTab(tabName, event);
                
                // Apply enhancements after tab switch
                setTimeout(() => {
                    if (tabName === 'output' && window.enhanceOutputTabST6) {
                        console.log('📋 Applying Output tab ST6 branding...');
                        window.enhanceOutputTabST6();
                    } else if (tabName === 'resources' && window.enhanceResourcesTabST6) {
                        console.log('📚 Applying Resources tab ST6 branding...');
                        window.enhanceResourcesTabST6();
                    } else if (tabName === 'history' && window.enhanceScoreHistory) {
                        console.log('📊 Applying Score History enhancements...');
                        window.enhanceScoreHistory();
                    }
                }, 100);
            };
            console.log('✅ Tab switch enhancement hook installed');
        }
    }
    
    // Try to create bridges immediately
    createBridges();
    
    // Also try after DOM loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createBridges);
    } else {
        setTimeout(createBridges, 100);
    }
    
    // And try again after a delay to catch late-loading scripts
    setTimeout(createBridges, 500);
    setTimeout(createBridges, 1000);
    
    console.log('✅ Enhancement bridges initialized');
})();
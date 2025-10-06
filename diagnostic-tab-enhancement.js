// Diagnostic Tab Enhancement - Debug why ST6 branding isn't applying
// This file adds extensive logging to identify the issue

(function() {
    'use strict';
    
    console.log('🔍 DIAGNOSTIC: Starting tab enhancement diagnostics...');
    
    // Log all available enhancement functions
    console.log('📋 Available enhancement functions:');
    console.log('  - enhanceOutputTab:', typeof window.enhanceOutputTab);
    console.log('  - enhanceOutputTabST6:', typeof window.enhanceOutputTabST6);
    console.log('  - enhanceResourcesTab:', typeof window.enhanceResourcesTab);
    console.log('  - enhanceResourcesTabST6:', typeof window.enhanceResourcesTabST6);
    console.log('  - enhanceScoreHistory:', typeof window.enhanceScoreHistory);
    
    // Create wrapper functions to bridge the naming mismatch
    if (window.enhanceOutputTabST6 && !window.enhanceOutputTab) {
        console.log('🔗 Bridging enhanceOutputTab -> enhanceOutputTabST6');
        window.enhanceOutputTab = function() {
            console.log('📋 Calling enhanceOutputTabST6 through bridge...');
            window.enhanceOutputTabST6();
        };
    }
    
    if (window.enhanceResourcesTabST6 && !window.enhanceResourcesTab) {
        console.log('🔗 Bridging enhanceResourcesTab -> enhanceResourcesTabST6');
        window.enhanceResourcesTab = function() {
            console.log('🔧 Calling enhanceResourcesTabST6 through bridge...');
            window.enhanceResourcesTabST6();
        };
    }
    
    // Override the handleTabSpecificContent to add logging
    const originalSwitchTab = window.switchTab;
    if (originalSwitchTab) {
        window.switchTab = function(tabName, event) {
            console.log(`🔍 DIAGNOSTIC: Switching to tab: ${tabName}`);
            
            // Call original switch function
            originalSwitchTab(tabName, event);
            
            // Add specific enhancements with logging
            console.log(`🔍 DIAGNOSTIC: Checking for tab-specific enhancements for: ${tabName}`);
            
            switch(tabName) {
                case 'history':
                    console.log('📊 DIAGNOSTIC: Attempting to enhance Score History...');
                    if (window.enhanceScoreHistory) {
                        setTimeout(() => {
                            console.log('📊 DIAGNOSTIC: Calling enhanceScoreHistory...');
                            window.enhanceScoreHistory();
                        }, 100);
                    } else {
                        console.error('❌ DIAGNOSTIC: enhanceScoreHistory not found!');
                    }
                    break;
                    
                case 'output':
                    console.log('📋 DIAGNOSTIC: Attempting to enhance Output tab...');
                    if (window.enhanceOutputTabST6) {
                        setTimeout(() => {
                            console.log('📋 DIAGNOSTIC: Calling enhanceOutputTabST6...');
                            window.enhanceOutputTabST6();
                        }, 100);
                    } else if (window.enhanceOutputTab) {
                        setTimeout(() => {
                            console.log('📋 DIAGNOSTIC: Calling enhanceOutputTab...');
                            window.enhanceOutputTab();
                        }, 100);
                    } else {
                        console.error('❌ DIAGNOSTIC: No output enhancement function found!');
                    }
                    break;
                    
                case 'resources':
                    console.log('🔧 DIAGNOSTIC: Attempting to enhance Resources tab...');
                    if (window.enhanceResourcesTabST6) {
                        setTimeout(() => {
                            console.log('🔧 DIAGNOSTIC: Calling enhanceResourcesTabST6...');
                            window.enhanceResourcesTabST6();
                        }, 100);
                    } else if (window.enhanceResourcesTab) {
                        setTimeout(() => {
                            console.log('🔧 DIAGNOSTIC: Calling enhanceResourcesTab...');
                            window.enhanceResourcesTab();
                        }, 100);
                    } else {
                        console.error('❌ DIAGNOSTIC: No resources enhancement function found!');
                    }
                    break;
            }
        };
    }
    
    // Check DOM elements
    console.log('🔍 DIAGNOSTIC: Checking DOM elements:');
    console.log('  - output-content:', document.getElementById('output-content'));
    console.log('  - resources-content:', document.getElementById('resources-content'));
    console.log('  - resource-templates:', document.getElementById('resource-templates'));
    console.log('  - score-history-content:', document.getElementById('score-history-content'));
    
    // Log when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        console.log('🔍 DIAGNOSTIC: DOM fully loaded');
        console.log('🔍 DIAGNOSTIC: Re-checking enhancement functions:');
        console.log('  - enhanceOutputTabST6:', typeof window.enhanceOutputTabST6);
        console.log('  - enhanceResourcesTabST6:', typeof window.enhanceResourcesTabST6);
        console.log('  - enhanceScoreHistory:', typeof window.enhanceScoreHistory);
        
        // Try to enhance the currently active tab
        const activeTab = document.querySelector('.tab-button.active');
        if (activeTab) {
            const tabName = activeTab.getAttribute('data-tab');
            console.log(`🔍 DIAGNOSTIC: Active tab on load: ${tabName}`);
            
            // Trigger enhancement for active tab
            if (tabName === 'resources' && window.enhanceResourcesTabST6) {
                console.log('🔧 DIAGNOSTIC: Enhancing Resources tab on load...');
                window.enhanceResourcesTabST6();
            } else if (tabName === 'output' && window.enhanceOutputTabST6) {
                console.log('📋 DIAGNOSTIC: Enhancing Output tab on load...');
                window.enhanceOutputTabST6();
            } else if (tabName === 'history' && window.enhanceScoreHistory) {
                console.log('📊 DIAGNOSTIC: Enhancing Score History on load...');
                window.enhanceScoreHistory();
            }
        }
    });
    
    console.log('✅ DIAGNOSTIC: Tab enhancement diagnostics loaded');
})();
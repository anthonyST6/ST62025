/**
 * Tab Switch Protector
 * Prevents double-loading when tabs are selected
 * SAFE: Wraps existing switchTab function without modifying it
 */

(function() {
    'use strict';
    
    console.log('🔄 Tab Switch Protector Loading...');
    
    let isTabSwitching = false;
    let switchTimeout = null;
    
    // Wait for original switchTab to be defined
    function waitForSwitchTab() {
        return new Promise((resolve) => {
            const checkInterval = setInterval(() => {
                if (typeof window.switchTab === 'function') {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 100);
            
            setTimeout(() => {
                clearInterval(checkInterval);
                resolve();
            }, 5000);
        });
    }
    
    waitForSwitchTab().then(() => {
        // Store original function
        const originalSwitchTab = window.switchTab;
        
        // Create protected wrapper
        window.switchTab = function(tabName, event) {
            // Debounce - ignore rapid clicks
            if (switchTimeout) {
                console.log('⚠️ Tab switch debounced - ignoring rapid click');
                return;
            }
            
            // Prevent concurrent switches
            if (isTabSwitching) {
                console.log('⚠️ Tab switch already in progress - ignoring');
                return;
            }
            
            console.log(`🔄 Switching to tab: ${tabName}`);
            isTabSwitching = true;
            
            try {
                // Call original function
                originalSwitchTab(tabName, event);
            } finally {
                // Reset flags after delay
                switchTimeout = setTimeout(() => {
                    switchTimeout = null;
                }, 300);
                
                setTimeout(() => {
                    isTabSwitching = false;
                }, 500);
            }
        };
        
        console.log('✅ Tab Switch Protector Active - Double-loading prevented!');
    });
    
})();
/**
 * Disable All Success Notifications
 * Overrides notification functions to prevent green banners from appearing
 * This script should load EARLY to catch all notification calls
 */

(function() {
    'use strict';
    
    console.log('🔇 Disabling all success notifications...');
    
    // Override showSuccessNotification globally
    window.showSuccessNotification = function(message) {
        // Silent - just log to console
        console.log('[NOTIFICATION DISABLED]', message);
    };
    
    // Override showNotification for success type
    const originalShowNotification = window.showNotification;
    window.showNotification = function(message, type) {
        // Only log, don't show UI
        console.log('[NOTIFICATION DISABLED]', type, message);
        
        // Don't create any DOM elements
        return;
    };
    
    // Also override any notification functions that might be defined later
    Object.defineProperty(window, 'showSuccessNotification', {
        value: function(message) {
            console.log('[NOTIFICATION DISABLED]', message);
        },
        writable: false,
        configurable: false
    });
    
    console.log('✅ All notifications disabled - downloads will be silent');
    
})();
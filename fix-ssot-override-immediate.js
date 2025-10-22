/**
 * IMMEDIATE SSOT OVERRIDE FIX
 * This script disables the Content Registry system and ensures SSOT data is never overridden
 * Deploy this immediately to fix the misalignment issue
 * 
 * Created: 2025-10-07
 * Purpose: Stop Content Registry from overriding SSOT data with incomplete/null data
 * 
 * UPDATED: 2025-10-16
 * - Disabled duplicate Real-World Examples injection
 * - Now delegates to fix-education-use-cases-display.js for rendering
 */

(function() {
    'use strict';
    
    console.log('🛡️ SSOT Override Prevention Active - v2.0 (Injection Disabled)');
    
    // Track prevention actions
    let preventionCount = 0;
    let protectionActive = true;
    
    // ============================================
    // PART 1: DISABLE CONTENT REGISTRY COMPLETELY
    // ============================================
    
    // Disable Content Registry injection
    if (window.contentRegistry) {
        console.log('⚠️ Disabling Content Registry system');
        
        // Store original for potential debugging
        window.contentRegistry._originalInject = window.contentRegistry.inject;
        
        // Override inject method to do nothing
        window.contentRegistry.inject = function(contentType, subcomponentId, targetElement) {
            preventionCount++;
            console.log(`🚫 Blocked Content Registry injection #${preventionCount} for ${contentType} on ${subcomponentId}`);
            
            // Return resolved promise to prevent errors
            return Promise.resolve();
        };
        
        // Clear any cached data
        if (window.contentRegistry.cache) {
            window.contentRegistry.cache.clear();
            console.log('🗑️ Cleared Content Registry cache');
        }
        
        // Disable all providers
        if (window.contentRegistry.providers) {
            window.contentRegistry.providers.clear();
            console.log('🚫 Disabled all Content Registry providers');
        }
    }
    
    // Disable Real World Examples Provider specifically
    if (window.RealWorldExamplesProvider) {
        console.log('⚠️ Disabling RealWorldExamplesProvider');
        window.RealWorldExamplesProvider.prototype.fetch = function() {
            console.log('🚫 Blocked RealWorldExamplesProvider fetch');
            return Promise.resolve(null);
        };
    }
    
    // ============================================
    // PART 2: PROTECT SSOT DATA FROM OVERRIDES
    // ============================================
    
    // Function to protect critical elements
    function protectSSOTElements() {
        const criticalElements = [
            'education-tab',
            'workspace-tab',
            'resources-tab',
            'output-tab',
            'resource-templates',
            'output-content'
        ];
        
        criticalElements.forEach(id => {
            const element = document.getElementById(id);
            if (element && !element.hasAttribute('data-ssot-protected')) {
                // Mark as protected
                element.setAttribute('data-ssot-protected', 'true');
                
                // Store original innerHTML descriptor
                const originalDescriptor = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
                
                // Create protected setter
                Object.defineProperty(element, 'innerHTML', {
                    set: function(value) {
                        // Only allow changes if they come from SSOT
                        if (window.SSOT_AUTHORITY && protectionActive) {
                            // Check if this is a legitimate SSOT update
                            const stack = new Error().stack;
                            const isFromSSoT = stack.includes('ssot') || 
                                              stack.includes('loadSubcomponentData') ||
                                              stack.includes('updateEducationTab');
                            
                            if (isFromSSoT) {
                                console.log(`✅ Allowed SSOT update for ${id}`);
                                originalDescriptor.set.call(this, value);
                            } else {
                                preventionCount++;
                                console.warn(`🚫 Blocked non-SSOT innerHTML change #${preventionCount} for ${id}`);
                                // Don't apply the change
                            }
                        } else {
                            // SSOT not loaded yet, allow initial setup
                            originalDescriptor.set.call(this, value);
                        }
                    },
                    get: function() {
                        return originalDescriptor.get.call(this);
                    }
                });
                
                console.log(`🔒 Protected element: ${id}`);
            }
        });
    }
    
    // ============================================
    // PART 3: ENSURE REAL WORLD EXAMPLES FROM SSOT
    // ============================================
    
    // DISABLED: No longer inject examples here
    // The fix-education-use-cases-display.js script handles all rendering
    function ensureRealWorldExamples() {
        console.log('⏭️ Skipping ensureRealWorldExamples - handled by fix-education-use-cases-display.js');
        return;
    }
    
    // ============================================
    // PART 4: MONITOR AND AUTO-FIX VIOLATIONS
    // ============================================
    
    function monitorForViolations() {
        // Check if SSOT data exists
        if (!window.SSOT_AUTHORITY) {
            return; // Wait for SSOT to load
        }
        
        // Check for empty sections that should have content
        const sections = document.querySelectorAll('.education-section');
        sections.forEach(section => {
            const content = section.querySelector('.section-content');
            if (content && content.textContent.trim() === '' && window.SSOT_AUTHORITY?.education) {
                console.warn('⚠️ Detected empty section, may need fixing');
            }
        });
    }
    
    // ============================================
    // PART 5: INITIALIZATION AND CONTINUOUS MONITORING
    // ============================================
    
    function initialize() {
        console.log('🚀 Initializing SSOT Override Prevention (No Injection Mode)');
        
        // Protect elements immediately
        protectSSOTElements();
        
        // DON'T inject examples - let the dedicated script handle it
        // ensureRealWorldExamples(); // DISABLED
        
        // Start monitoring (but don't inject)
        startContinuousMonitoring();
        
        // Hook into the original loadSubcomponentData if it exists
        if (window.loadSubcomponentData) {
            const originalLoad = window.loadSubcomponentData;
            window.loadSubcomponentData = async function() {
                const result = await originalLoad.apply(this, arguments);
                
                // After SSOT loads, just protect elements (don't inject)
                setTimeout(() => {
                    protectSSOTElements();
                }, 100);
                
                return result;
            };
        }
    }
    
    function startContinuousMonitoring() {
        // Monitor every 500ms for the first 10 seconds
        let checks = 0;
        const earlyInterval = setInterval(() => {
            monitorForViolations();
            // DON'T call ensureRealWorldExamples() here
            checks++;
            
            if (checks > 20) { // 10 seconds
                clearInterval(earlyInterval);
                
                // Then monitor every 2 seconds
                setInterval(() => {
                    monitorForViolations();
                }, 2000);
            }
        }, 500);
        
        console.log('👁️ Continuous monitoring active (injection disabled)');
    }
    
    // ============================================
    // PART 6: INTERCEPT PROBLEMATIC FUNCTION CALLS
    // ============================================
    
    // Intercept any function that might clear content
    const originalQuerySelector = document.querySelector;
    document.querySelector = function(selector) {
        const element = originalQuerySelector.call(this, selector);
        
        // If querying for education content, log it
        if (selector && selector.includes('education')) {
            console.log(`📍 querySelector called for: ${selector}`);
        }
        
        return element;
    };
    
    // ============================================
    // PART 7: PUBLIC API FOR DEBUGGING
    // ============================================
    
    window.SSOT_OVERRIDE_FIX = {
        version: '2.0',
        preventionCount: () => preventionCount,
        
        // Manually trigger fixes
        fixNow: () => {
            console.log('🔧 Manual fix triggered (protection only, no injection)');
            protectSSOTElements();
            monitorForViolations();
        },
        
        // Temporarily disable protection (for debugging)
        disable: () => {
            protectionActive = false;
            console.warn('⚠️ SSOT protection DISABLED');
        },
        
        // Re-enable protection
        enable: () => {
            protectionActive = true;
            console.log('✅ SSOT protection ENABLED');
        },
        
        // Get current status
        status: () => ({
            active: protectionActive,
            preventionCount: preventionCount,
            hasSSoT: !!window.SSOT_AUTHORITY,
            hasContentRegistry: !!window.contentRegistry,
            timestamp: new Date().toISOString()
        })
    };
    
    // ============================================
    // PART 8: START EVERYTHING
    // ============================================
    
    // Initialize based on document state
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        // DOM already loaded
        initialize();
    }
    
    // Also reinitialize when SSOT loads (but don't inject)
    window.addEventListener('ssot-loaded', () => {
        console.log('📡 SSOT loaded event detected');
        protectSSOTElements();
    });
    
    console.log('✅ SSOT Override Prevention loaded successfully (v2.0 - No Injection)');
    console.log('📝 Use window.SSOT_OVERRIDE_FIX for debugging:');
    console.log('   - SSOT_OVERRIDE_FIX.status() - Check current status');
    console.log('   - SSOT_OVERRIDE_FIX.fixNow() - Manually trigger fixes');
    console.log('   - SSOT_OVERRIDE_FIX.preventionCount() - See how many overrides blocked');
    
})();
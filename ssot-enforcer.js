/**
 * SSOT Enforcer - Ensures Single Source of Truth is never overridden
 * This script prevents content misalignment by enforcing SSOT data
 * Priority: HIGHEST - Must load before all other content scripts
 */

(function() {
    'use strict';
    
    console.log('🛡️ SSOT Enforcer initializing...');
    
    let SSOT_DATA = null;
    let PROTECTION_ACTIVE = true;
    let ENFORCEMENT_COUNT = 0;
    
    // Get subcomponent ID from URL
    function getSubcomponentId() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id') || '1-1';
    }
    
    // Fetch and store SSOT data from server
    async function loadSSoTData() {
        const subcomponentId = getSubcomponentId();
        
        try {
            console.log(`📡 Fetching SSOT data for subcomponent: ${subcomponentId}`);
            const response = await fetch(`/api/subcomponents/${subcomponentId}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            SSOT_DATA = data;
            
            console.log('✅ SSOT Data Loaded:', {
                id: subcomponentId,
                name: data.name,
                agent: data.agent,
                blockName: data.blockName,
                hasEducation: !!data.education,
                hasTemplates: !!(data.templates && data.templates.length > 0)
            });
            
            // Immediately enforce SSOT
            enforceSSoT();
            
            // Start continuous monitoring
            startMonitoring();
            
        } catch (error) {
            console.error('❌ Failed to load SSOT data:', error);
            // Retry after 2 seconds
            setTimeout(loadSSoTData, 2000);
        }
    }
    
    // Enforce SSOT values on the page
    function enforceSSoT() {
        if (!SSOT_DATA || !PROTECTION_ACTIVE) return;
        
        let corrections = 0;
        
        // Fix subcomponent title (main heading) - should show the subcomponent NAME, not agent
        const titleElement = document.getElementById('subcomponent-title');
        if (titleElement && SSOT_DATA.name) {
            const currentTitle = titleElement.textContent.trim();
            const correctTitle = SSOT_DATA.name.toUpperCase();
            
            if (currentTitle !== correctTitle) {
                console.warn(`🔧 Correcting title from "${currentTitle}" to "${correctTitle}"`);
                titleElement.textContent = correctTitle;
                corrections++;
            }
        }
        
        // Fix subcomponent name (breadcrumb)
        const nameElement = document.getElementById('subcomponent-name');
        if (nameElement && SSOT_DATA.name) {
            const currentName = nameElement.textContent.trim();
            if (currentName !== SSOT_DATA.name) {
                console.warn(`🔧 Correcting name from "${currentName}" to "${SSOT_DATA.name}"`);
                nameElement.textContent = SSOT_DATA.name;
                corrections++;
            }
        }
        
        // Fix description
        const descElement = document.getElementById('subcomponent-description');
        if (descElement && SSOT_DATA.description) {
            const currentDesc = descElement.textContent.trim();
            if (currentDesc !== SSOT_DATA.description) {
                console.warn(`🔧 Correcting description`);
                descElement.textContent = SSOT_DATA.description;
                corrections++;
            }
        }
        
        // Fix block link
        const blockLink = document.getElementById('block-link');
        if (blockLink && SSOT_DATA.blockName) {
            const currentBlock = blockLink.textContent.trim();
            if (currentBlock !== SSOT_DATA.blockName && currentBlock !== 'Loading...') {
                console.warn(`🔧 Correcting block name from "${currentBlock}" to "${SSOT_DATA.blockName}"`);
                blockLink.textContent = SSOT_DATA.blockName;
                corrections++;
            }
        }
        
        // Fix subcomponent number display
        const numberElement = document.getElementById('subcomponent-number');
        if (numberElement) {
            const subcomponentId = getSubcomponentId();
            const correctNumber = subcomponentId.replace('-', '.');
            const currentNumber = numberElement.textContent.trim();
            if (currentNumber !== correctNumber) {
                console.warn(`🔧 Correcting number from "${currentNumber}" to "${correctNumber}"`);
                numberElement.textContent = correctNumber;
                corrections++;
            }
        }
        
        if (corrections > 0) {
            ENFORCEMENT_COUNT += corrections;
            console.log(`✅ SSOT Enforcer made ${corrections} corrections (Total: ${ENFORCEMENT_COUNT})`);
        }
        
        // Store SSOT data globally for other scripts to reference
        window.SSOT_AUTHORITY = SSOT_DATA;
    }
    
    // Monitor DOM for changes and enforce SSOT
    function startMonitoring() {
        console.log('👁️ Starting DOM monitoring for SSOT violations...');
        
        // Create mutation observer
        const observer = new MutationObserver((mutations) => {
            let needsEnforcement = false;
            
            mutations.forEach(mutation => {
                // Check if critical elements were modified
                if (mutation.type === 'characterData' || mutation.type === 'childList') {
                    const target = mutation.target;
                    const parent = target.parentElement;
                    
                    if (parent && (
                        parent.id === 'subcomponent-title' ||
                        parent.id === 'subcomponent-name' ||
                        parent.id === 'subcomponent-description' ||
                        parent.id === 'block-link' ||
                        parent.id === 'subcomponent-number'
                    )) {
                        needsEnforcement = true;
                    }
                }
            });
            
            if (needsEnforcement) {
                // Debounce enforcement to avoid infinite loops
                clearTimeout(window.ssotEnforcementTimeout);
                window.ssotEnforcementTimeout = setTimeout(() => {
                    enforceSSoT();
                }, 100);
            }
        });
        
        // Start observing
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true,
            characterDataOldValue: true
        });
        
        // Also enforce periodically as a safety net
        setInterval(() => {
            if (PROTECTION_ACTIVE) {
                enforceSSoT();
            }
        }, 1000);
        
        console.log('✅ DOM monitoring active');
    }
    
    // Override functions that might change content
    function interceptContentModifiers() {
        // Store original functions
        const originalInnerHTML = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
        const originalTextContent = Object.getOwnPropertyDescriptor(Node.prototype, 'textContent');
        
        // Intercept innerHTML changes
        Object.defineProperty(Element.prototype, 'innerHTML', {
            set: function(value) {
                const id = this.id;
                
                // Check if this is a protected element
                if (id === 'subcomponent-title' || id === 'subcomponent-name' || 
                    id === 'subcomponent-description' || id === 'block-link') {
                    console.warn(`⚠️ Blocked innerHTML change attempt on protected element: ${id}`);
                    // Allow the change but immediately enforce SSOT
                    originalInnerHTML.set.call(this, value);
                    setTimeout(enforceSSoT, 0);
                } else {
                    originalInnerHTML.set.call(this, value);
                }
            },
            get: originalInnerHTML.get
        });
        
        // Intercept textContent changes
        Object.defineProperty(Node.prototype, 'textContent', {
            set: function(value) {
                const parent = this.parentElement;
                const id = parent ? parent.id : null;
                
                // Check if this is a protected element
                if (id === 'subcomponent-title' || id === 'subcomponent-name' || 
                    id === 'subcomponent-description' || id === 'block-link') {
                    console.warn(`⚠️ Detected textContent change attempt on protected element: ${id}`);
                    // Allow the change but immediately enforce SSOT
                    originalTextContent.set.call(this, value);
                    setTimeout(enforceSSoT, 0);
                } else {
                    originalTextContent.set.call(this, value);
                }
            },
            get: originalTextContent.get
        });
    }
    
    // Initialize SSOT Enforcer
    function initialize() {
        console.log('🚀 SSOT Enforcer starting initialization...');
        
        // Load SSOT data
        loadSSoTData();
        
        // Intercept content modifiers
        interceptContentModifiers();
        
        // Also enforce when tab switches occur
        if (window.switchTab) {
            const originalSwitchTab = window.switchTab;
            window.switchTab = function(tabName, event) {
                const result = originalSwitchTab.call(this, tabName, event);
                setTimeout(enforceSSoT, 100);
                return result;
            };
        }
    }
    
    // Start initialization based on document state
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        // DOM is already loaded
        initialize();
    }
    
    // Expose API for debugging and control
    window.SSOT_ENFORCER = {
        // Get current SSOT data
        getData: () => SSOT_DATA,
        
        // Reload SSOT data from server
        reload: () => {
            console.log('🔄 Reloading SSOT data...');
            loadSSoTData();
        },
        
        // Manually enforce SSOT
        enforce: () => {
            console.log('⚡ Manual SSOT enforcement triggered');
            enforceSSoT();
        },
        
        // Disable protection (for debugging)
        disable: () => {
            PROTECTION_ACTIVE = false;
            console.warn('⚠️ SSOT protection DISABLED');
        },
        
        // Enable protection
        enable: () => {
            PROTECTION_ACTIVE = true;
            console.log('✅ SSOT protection ENABLED');
            enforceSSoT();
        },
        
        // Get enforcement statistics
        getStats: () => ({
            active: PROTECTION_ACTIVE,
            enforcementCount: ENFORCEMENT_COUNT,
            subcomponentId: getSubcomponentId(),
            hasData: !!SSOT_DATA
        }),
        
        // Check specific element
        checkElement: (elementId) => {
            const element = document.getElementById(elementId);
            if (!element) {
                console.log(`Element ${elementId} not found`);
                return;
            }
            
            const current = element.textContent.trim();
            let expected = 'N/A';
            
            switch(elementId) {
                case 'subcomponent-title':
                    expected = SSOT_DATA?.name?.toUpperCase() || 'N/A';
                    break;
                case 'subcomponent-name':
                    expected = SSOT_DATA?.name || 'N/A';
                    break;
                case 'subcomponent-description':
                    expected = SSOT_DATA?.description || 'N/A';
                    break;
                case 'block-link':
                    expected = SSOT_DATA?.blockName || 'N/A';
                    break;
            }
            
            const isCorrect = current === expected;
            console.log(`Element: ${elementId}`, {
                current,
                expected,
                isCorrect,
                status: isCorrect ? '✅ Correct' : '❌ Mismatch'
            });
            
            return { current, expected, isCorrect };
        }
    };
    
    console.log('✅ SSOT Enforcer loaded and ready');
    console.log('📝 Use window.SSOT_ENFORCER for debugging:');
    console.log('   - SSOT_ENFORCER.getData() - View current SSOT data');
    console.log('   - SSOT_ENFORCER.enforce() - Manually enforce SSOT');
    console.log('   - SSOT_ENFORCER.getStats() - View enforcement statistics');
    console.log('   - SSOT_ENFORCER.checkElement(id) - Check specific element');
    
})();
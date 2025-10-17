/**
 * Real World Examples Monitor
 * Monitors and validates Real World Examples display
 */

(function() {
    'use strict';
    
    console.log('🔍 Real World Examples Monitor Active');
    
    // Monitor configuration
    const MONITOR_CONFIG = {
        checkInterval: 2000,
        maxChecks: 10,
        targetSubcomponent: null
    };
    
    let checkCount = 0;
    
    /**
     * Check if Real World Examples are displayed
     */
    function checkRealWorldExamples() {
        console.log(`📊 Check #${++checkCount}: Monitoring Real World Examples...`);
        
        // Get current subcomponent ID
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        MONITOR_CONFIG.targetSubcomponent = subcomponentId;
        
        // Check education tab for Real World Examples section
        const educationTab = document.getElementById('education-tab');
        if (!educationTab) {
            console.warn('⚠️ Education tab not found');
            return false;
        }
        
        // Look for Real World Examples section
        const sections = educationTab.querySelectorAll('.education-section');
        let realWorldSection = null;
        
        sections.forEach(section => {
            const title = section.querySelector('.section-title');
            if (title && title.textContent.includes('Real-World Examples')) {
                realWorldSection = section;
            }
        });
        
        // Check API data
        const apiData = window.subcomponentData;
        const hasApiExamples = apiData?.education?.examples?.length > 0 || 
                               apiData?.realWorldExamples?.length > 0;
        
        // Report findings
        const report = {
            timestamp: new Date().toISOString(),
            subcomponentId: subcomponentId,
            checkNumber: checkCount,
            findings: {
                educationTabExists: !!educationTab,
                realWorldSectionExists: !!realWorldSection,
                apiHasExamples: hasApiExamples,
                apiExamplesData: apiData?.education?.examples || apiData?.realWorldExamples || null,
                domExamplesCount: realWorldSection ? 
                    realWorldSection.querySelectorAll('.bullet-list li').length : 0
            }
        };
        
        // Log report
        console.log('📋 Real World Examples Monitor Report:', report);
        
        // Check for misalignment
        if (hasApiExamples && !realWorldSection) {
            console.error('❌ MISALIGNMENT: API has examples but DOM does not show them!');
            console.error('API Examples:', apiData?.education?.examples || apiData?.realWorldExamples);
            
            // Try to fix by triggering content registry
            if (window.ContentRegistry && window.ContentRegistry.instance) {
                console.log('🔧 Attempting to fix via Content Registry...');
                window.ContentRegistry.instance.injectAll('education-tab').then(() => {
                    console.log('✅ Content Registry injection complete');
                });
            }
        } else if (hasApiExamples && realWorldSection) {
            console.log('✅ Real World Examples are displayed correctly');
            return true;
        } else if (!hasApiExamples) {
            console.log('ℹ️ No Real World Examples in API data for this subcomponent');
        }
        
        return false;
    }
    
    /**
     * Monitor API calls for Real World Examples
     */
    function monitorAPICalls() {
        const originalFetch = window.fetch;
        window.fetch = function(...args) {
            const url = args[0];
            
            return originalFetch.apply(this, args).then(response => {
                // Clone response to read it without consuming
                const clonedResponse = response.clone();
                
                // Check if this is a subcomponent API call
                if (url.includes('/api/subcomponents/') || 
                    url.includes('/api/real-world-examples/')) {
                    
                    clonedResponse.json().then(data => {
                        console.log('🌐 API Response intercepted:', url);
                        console.log('📦 Real World Examples in response:', 
                            data.realWorldExamples || data.education?.examples || 'None');
                        
                        // Store for monitoring
                        window.lastAPIResponse = data;
                        
                        // Check after a delay to allow DOM updates
                        setTimeout(checkRealWorldExamples, 1000);
                    }).catch(err => {
                        console.error('Error parsing API response:', err);
                    });
                }
                
                return response;
            });
        };
    }
    
    /**
     * Create visual monitor panel
     */
    function createMonitorPanel() {
        const panel = document.createElement('div');
        panel.id = 'real-world-monitor-panel';
        panel.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.9);
            border: 2px solid #FF5500;
            border-radius: 10px;
            padding: 15px;
            color: white;
            font-family: monospace;
            font-size: 12px;
            z-index: 10000;
            max-width: 300px;
            display: none;
        `;
        
        panel.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <strong style="color: #FF5500;">RWE Monitor</strong>
                <button onclick="this.parentElement.parentElement.style.display='none'" 
                        style="background: none; border: none; color: #FF5500; cursor: pointer; font-size: 16px;">×</button>
            </div>
            <div id="monitor-status">Initializing...</div>
        `;
        
        document.body.appendChild(panel);
        return panel;
    }
    
    /**
     * Update monitor panel
     */
    function updateMonitorPanel(status) {
        const statusDiv = document.getElementById('monitor-status');
        if (statusDiv) {
            const urlParams = new URLSearchParams(window.location.search);
            const subcomponentId = urlParams.get('id') || '1-1';
            
            const apiData = window.subcomponentData;
            const hasExamples = apiData?.education?.examples?.length > 0 || 
                               apiData?.realWorldExamples?.length > 0;
            
            statusDiv.innerHTML = `
                <div style="margin: 5px 0;">📍 Subcomponent: ${subcomponentId}</div>
                <div style="margin: 5px 0;">📊 API Has Examples: ${hasExamples ? '✅ Yes' : '❌ No'}</div>
                <div style="margin: 5px 0;">🖥️ DOM Display: ${status ? '✅ Shown' : '⚠️ Missing'}</div>
                <div style="margin: 5px 0;">🔄 Checks: ${checkCount}/${MONITOR_CONFIG.maxChecks}</div>
            `;
        }
    }
    
    /**
     * Initialize monitor
     */
    function initializeMonitor() {
        console.log('🚀 Initializing Real World Examples Monitor...');
        
        // Create monitor panel
        const panel = createMonitorPanel();
        
        // Monitor API calls
        monitorAPICalls();
        
        // Start periodic checks
        const intervalId = setInterval(() => {
            const isDisplayed = checkRealWorldExamples();
            updateMonitorPanel(isDisplayed);
            
            // Show panel if there's an issue
            if (!isDisplayed && window.subcomponentData) {
                panel.style.display = 'block';
            }
            
            // Stop after max checks
            if (checkCount >= MONITOR_CONFIG.maxChecks) {
                clearInterval(intervalId);
                console.log('🛑 Monitor stopped after maximum checks');
            }
        }, MONITOR_CONFIG.checkInterval);
        
        // Initial check after page load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(checkRealWorldExamples, 1000);
            });
        } else {
            setTimeout(checkRealWorldExamples, 1000);
        }
        
        // Add keyboard shortcut to toggle panel (Ctrl+Shift+M)
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'M') {
                const panel = document.getElementById('real-world-monitor-panel');
                if (panel) {
                    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
                }
            }
        });
        
        console.log('✅ Monitor initialized. Press Ctrl+Shift+M to toggle monitor panel.');
    }
    
    // Initialize when ready
    initializeMonitor();
    
    // Export for debugging
    window.RealWorldMonitor = {
        check: checkRealWorldExamples,
        getStatus: () => ({
            subcomponent: MONITOR_CONFIG.targetSubcomponent,
            checksPerformed: checkCount,
            lastAPIResponse: window.lastAPIResponse,
            currentData: window.subcomponentData
        }),
        forceInject: () => {
            if (window.ContentRegistry && window.ContentRegistry.instance) {
                return window.ContentRegistry.instance.injectAll('education-tab');
            }
            return Promise.reject('Content Registry not available');
        }
    };
    
})();
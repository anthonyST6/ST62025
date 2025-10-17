// AGGRESSIVE FIX: Remove the 3 templates from all subcomponents EXCEPT 7-4
(function() {
    'use strict';
    
    console.log('🔨 Aggressive template removal script loaded');
    
    // The 3 templates that should ONLY appear on subcomponent 7-4
    const OUTLIER_TEMPLATES = [
        "Competitive Analysis Matrix",
        "GTM Strategy Template", 
        "Product Roadmap Canvas"
    ];
    
    // Function to remove outlier templates from Resources tab (except on 7-4)
    function removeOutlierTemplates() {
        // Get current subcomponent ID
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        
        // If we're on subcomponent 7-4, don't remove these templates
        if (subcomponentId === '7-4') {
            console.log('✅ On subcomponent 7-4 - keeping all templates');
            return;
        }
        
        console.log(`🔍 Removing outlier templates from subcomponent ${subcomponentId}`);
        
        // Find all possible containers where templates might be
        const containers = [
            document.getElementById('resources-tab'),
            document.getElementById('resources-content'),
            document.getElementById('resource-templates'),
            document.querySelector('.templates-list'),
            document.querySelector('.workspace-section')
        ];
        
        containers.forEach(container => {
            if (!container) return;
            
            // Find all template items in this container
            const templateItems = container.querySelectorAll('.template-item, [style*="background"]');
            
            templateItems.forEach(item => {
                // Check if this item contains any of the outlier templates
                const itemText = item.textContent || item.innerHTML || '';
                
                OUTLIER_TEMPLATES.forEach(template => {
                    if (itemText.includes(template)) {
                        console.log(`❌ Removing template: ${template}`);
                        item.remove();
                    }
                });
            });
            
            // Also check for any divs that might contain the templates
            const allDivs = container.querySelectorAll('div');
            allDivs.forEach(div => {
                const h4 = div.querySelector('h4');
                if (h4 && OUTLIER_TEMPLATES.includes(h4.textContent.trim())) {
                    console.log(`❌ Removing div containing: ${h4.textContent.trim()}`);
                    // Find the parent card/container and remove it
                    let parent = div;
                    while (parent && !parent.style.background && parent.parentElement) {
                        parent = parent.parentElement;
                    }
                    if (parent && parent.parentElement) {
                        parent.remove();
                    }
                }
            });
        });
    }
    
    // Override the enhanceResourcesTabST6 function to filter templates
    const originalEnhanceResourcesTabST6 = window.enhanceResourcesTabST6;
    window.enhanceResourcesTabST6 = function() {
        console.log('🎯 Intercepting enhanceResourcesTabST6');
        
        // Call the original function first
        if (originalEnhanceResourcesTabST6) {
            originalEnhanceResourcesTabST6.call(this);
        }
        
        // Then remove the outlier templates
        setTimeout(removeOutlierTemplates, 100);
    };
    
    // Monitor for resources tab activation
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            // Check if resources tab became active
            if (mutation.target.id === 'resources-tab' && 
                mutation.target.classList.contains('active')) {
                setTimeout(removeOutlierTemplates, 100);
                setTimeout(removeOutlierTemplates, 500);
                setTimeout(removeOutlierTemplates, 1000);
            }
            
            // Also check for any new content added
            if (mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1 && node.textContent) {
                        OUTLIER_TEMPLATES.forEach(template => {
                            if (node.textContent.includes(template)) {
                                const urlParams = new URLSearchParams(window.location.search);
                                const subcomponentId = urlParams.get('id') || '1-1';
                                if (subcomponentId !== '7-4') {
                                    console.log(`🚫 Blocking addition of: ${template}`);
                                    setTimeout(() => removeOutlierTemplates(), 50);
                                }
                            }
                        });
                    }
                });
            }
        });
    });
    
    // Start observing the entire document for changes
    observer.observe(document.body, { 
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class']
    });
    
    // Override the switchTab function
    const originalSwitchTab = window.switchTab;
    window.switchTab = function(tabName, event) {
        if (originalSwitchTab) {
            originalSwitchTab(tabName, event);
        }
        if (tabName === 'resources') {
            setTimeout(removeOutlierTemplates, 100);
            setTimeout(removeOutlierTemplates, 500);
            setTimeout(removeOutlierTemplates, 1000);
            setTimeout(removeOutlierTemplates, 2000);
        }
    };
    
    // Check on page load
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(removeOutlierTemplates, 1000);
        setTimeout(removeOutlierTemplates, 2000);
        setTimeout(removeOutlierTemplates, 3000);
    });
    
    // Also run immediately
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(removeOutlierTemplates, 100);
        setTimeout(removeOutlierTemplates, 1000);
    }
    
    // Periodically check and remove outliers
    setInterval(() => {
        const resourcesTab = document.getElementById('resources-tab');
        if (resourcesTab && resourcesTab.classList.contains('active')) {
            removeOutlierTemplates();
        }
    }, 3000);
    
    console.log('✅ Aggressive template removal active');
})();
// Debug script to find where the 3 outlier templates are coming from
(function() {
    'use strict';
    
    console.log('🔍 DEBUG: Template source tracker loaded');
    
    // The 3 templates we're tracking
    const OUTLIER_TEMPLATES = [
        "Competitive Analysis Matrix",
        "GTM Strategy Template", 
        "Product Roadmap Canvas"
    ];
    
    // Override appendChild to track when templates are added
    const originalAppendChild = Element.prototype.appendChild;
    Element.prototype.appendChild = function(child) {
        if (child && child.innerHTML) {
            OUTLIER_TEMPLATES.forEach(template => {
                if (child.innerHTML.includes(template)) {
                    console.log(`🚨 TEMPLATE ADDED: "${template}"`);
                    console.log('   Added to:', this);
                    console.log('   Stack trace:', new Error().stack);
                }
            });
        }
        return originalAppendChild.call(this, child);
    };
    
    // Override innerHTML to track when templates are set
    const originalInnerHTMLSetter = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML').set;
    Object.defineProperty(Element.prototype, 'innerHTML', {
        set: function(value) {
            if (value && typeof value === 'string') {
                OUTLIER_TEMPLATES.forEach(template => {
                    if (value.includes(template)) {
                        console.log(`🚨 TEMPLATE SET via innerHTML: "${template}"`);
                        console.log('   Set on:', this);
                        console.log('   Stack trace:', new Error().stack);
                    }
                });
            }
            originalInnerHTMLSetter.call(this, value);
        },
        get: Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML').get
    });
    
    // Monitor the resources tab
    setInterval(() => {
        const resourcesTab = document.getElementById('resources-tab');
        if (resourcesTab && resourcesTab.classList.contains('active')) {
            const templateItems = resourcesTab.querySelectorAll('.template-name');
            templateItems.forEach(item => {
                if (OUTLIER_TEMPLATES.includes(item.textContent.trim())) {
                    console.log(`⚠️ FOUND OUTLIER: "${item.textContent.trim()}" in Resources tab`);
                }
            });
        }
    }, 2000);
    
    console.log('✅ DEBUG: Template tracking active');
})();
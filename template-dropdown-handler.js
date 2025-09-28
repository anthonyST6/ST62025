// Template Dropdown Handler - Global functionality for template report dropdowns
// This handles the dropdown functionality in template reports displayed in modals

(function() {
    'use strict';
    
    // Function to toggle recommendation dropdown
    function toggleRecommendation(index) {
        console.log('[Template Dropdown] Toggling recommendation:', index);
        
        const content = document.querySelector(`.recommendation-content[data-index="${index}"]`);
        const arrow = document.querySelector(`.arrow-icon[data-index="${index}"]`);
        
        if (content) {
            if (content.style.maxHeight === '0px' || !content.style.maxHeight || content.style.maxHeight === '') {
                // Expand
                content.style.maxHeight = content.scrollHeight + 'px';
                if (arrow) {
                    arrow.style.transform = 'rotate(90deg)';
                    arrow.textContent = '▼';
                }
                console.log('[Template Dropdown] Expanded recommendation:', index);
            } else {
                // Collapse
                content.style.maxHeight = '0px';
                if (arrow) {
                    arrow.style.transform = 'rotate(0deg)';
                    arrow.textContent = '▶';
                }
                console.log('[Template Dropdown] Collapsed recommendation:', index);
            }
        } else {
            console.warn('[Template Dropdown] Content not found for index:', index);
        }
    }
    
    // Add global event listener using event delegation
    document.addEventListener('click', function(e) {
        // Check if clicked element or its parent is a recommendation header
        const header = e.target.closest('.recommendation-header');
        if (header && header.dataset.index !== undefined) {
            e.preventDefault();
            e.stopPropagation();
            toggleRecommendation(header.dataset.index);
        }
    });
    
    // Also make the function globally available
    window.toggleRecommendation = toggleRecommendation;
    
    // Function to initialize dropdowns in a specific container
    window.initializeTemplateDropdowns = function(container) {
        console.log('[Template Dropdown] Initializing dropdowns in container');
        
        // Find all recommendation headers in the container
        const headers = container.querySelectorAll('.recommendation-header');
        
        headers.forEach(header => {
            // Remove any existing onclick attributes
            header.removeAttribute('onclick');
            
            // Ensure the header has the proper data-index
            if (!header.dataset.index && header.querySelector('[data-index]')) {
                header.dataset.index = header.querySelector('[data-index]').dataset.index;
            }
        });
        
        console.log('[Template Dropdown] Initialized', headers.length, 'dropdown headers');
    };
    
    // Auto-initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            console.log('[Template Dropdown] Handler ready');
        });
    } else {
        console.log('[Template Dropdown] Handler ready');
    }
})();

console.log('✅ Template Dropdown Handler loaded - Global dropdown functionality ready');
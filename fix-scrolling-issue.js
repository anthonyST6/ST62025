// Fix scrolling issue for subcomponent-detail.html
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Applying scrolling fix...');
    
    // Apply scrolling fix after a short delay to ensure page is loaded
    setTimeout(() => {
        // Remove any height restrictions
        document.documentElement.style.height = '';
        document.documentElement.style.overflow = '';
        document.documentElement.style.overflowY = 'scroll';
        
        document.body.style.height = '';
        document.body.style.minHeight = '100vh';
        document.body.style.overflow = '';
        document.body.style.overflowY = 'auto';
        document.body.style.position = 'relative';
        
        // Ensure container can expand
        const container = document.querySelector('.container');
        if (container) {
            container.style.minHeight = '';
            container.style.height = '';
            container.style.overflow = 'visible';
        }
        
        // Ensure all tab content can expand properly
        const tabContents = document.querySelectorAll('.tab-content');
        tabContents.forEach(tab => {
            tab.style.minHeight = '';
            tab.style.height = '';
            tab.style.overflow = 'visible';
        });
        
        // Remove any problematic fixed elements
        const navbar = document.querySelector('nav');
        if (navbar && navbar.style) {
            navbar.style.position = 'fixed';
            navbar.style.top = '0';
            navbar.style.left = '0';
            navbar.style.right = '0';
            navbar.style.zIndex = '9999';
        }
        
        console.log('✅ Scrolling fix applied successfully');
        
        // Test scroll
        console.log('📏 Page height:', document.body.scrollHeight);
        console.log('📏 Viewport height:', window.innerHeight);
        console.log('📏 Scrollable:', document.body.scrollHeight > window.innerHeight);
    }, 500);
});
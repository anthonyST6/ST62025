// Diagnostic script to compare format differences
(function() {
    console.log('🔍 FORMAT DIAGNOSIS: Analyzing Real World Use Cases section format');
    
    // Check current format structure
    const educationTab = document.getElementById('education-tab');
    const realWorldSection = educationTab?.querySelector('.real-world-use-cases-section');
    
    if (realWorldSection) {
        console.log('📊 Current Format Analysis:');
        
        // Check container structure
        const container = realWorldSection.querySelector('.examples-container');
        console.log('  - Container type:', container ? container.className : 'Not found');
        
        // Check card structure
        const cards = realWorldSection.querySelectorAll('.example-card');
        console.log('  - Number of cards:', cards.length);
        
        if (cards.length > 0) {
            console.log('  - Card structure:');
            const firstCard = cards[0];
            console.log('    • Classes:', firstCard.className);
            console.log('    • Display style:', window.getComputedStyle(firstCard).display);
            console.log('    • Grid/Flex:', window.getComputedStyle(container).display);
            
            // Check content structure
            const hasCompanyName = firstCard.querySelector('.company-name');
            const hasValuation = firstCard.querySelector('.valuation');
            const hasUseCase = firstCard.querySelector('.use-case');
            
            console.log('  - Content elements:');
            console.log('    • Company name element:', hasCompanyName ? 'Present' : 'Missing');
            console.log('    • Valuation element:', hasValuation ? 'Present' : 'Missing');
            console.log('    • Use case element:', hasUseCase ? 'Present' : 'Missing');
        }
        
        // Check styling
        const computedStyle = window.getComputedStyle(realWorldSection);
        console.log('  - Section styling:');
        console.log('    • Background:', computedStyle.backgroundColor);
        console.log('    • Padding:', computedStyle.padding);
        console.log('    • Margin:', computedStyle.margin);
        
        // Check for old format remnants
        const oldFormatElements = realWorldSection.querySelectorAll('.real-world-example, .example-item, .use-case-item');
        if (oldFormatElements.length > 0) {
            console.log('⚠️ Found old format elements:', oldFormatElements.length);
            oldFormatElements.forEach(el => {
                console.log('  - Old element:', el.className, el.tagName);
            });
        }
        
        // Log current HTML structure for comparison
        console.log('\n📝 Current HTML Structure (first 500 chars):');
        console.log(realWorldSection.innerHTML.substring(0, 500) + '...');
        
    } else {
        console.log('❌ Real World Use Cases section not found in Education tab');
    }
    
    // Check if there are any backup or original format files
    console.log('\n📁 Checking for format-related files:');
    const scripts = Array.from(document.scripts);
    const formatScripts = scripts.filter(s => 
        s.src.includes('real-world') || 
        s.src.includes('use-case') || 
        s.src.includes('example')
    );
    
    formatScripts.forEach(script => {
        console.log('  - Script:', script.src.split('/').pop());
    });
    
    // Add listener to detect format changes
    if (realWorldSection) {
        const observer = new MutationObserver((mutations) => {
            console.log('🔄 Format change detected in Real World Use Cases section');
            mutations.forEach(mutation => {
                if (mutation.type === 'childList') {
                    console.log('  - Children changed:', mutation.addedNodes.length, 'added,', mutation.removedNodes.length, 'removed');
                } else if (mutation.type === 'attributes') {
                    console.log('  - Attribute changed:', mutation.attributeName);
                }
            });
        });
        
        observer.observe(realWorldSection, {
            childList: true,
            attributes: true,
            subtree: true
        });
        
        console.log('👁️ Format observer installed for Real World Use Cases section');
    }
    
    // Store diagnosis in window for access
    window.FORMAT_DIAGNOSIS = {
        hasSection: !!realWorldSection,
        cardCount: cards ? cards.length : 0,
        containerType: container ? container.className : 'none',
        timestamp: new Date().toISOString()
    };
    
    console.log('\n✅ Format diagnosis complete. Access window.FORMAT_DIAGNOSIS for summary.');
})();
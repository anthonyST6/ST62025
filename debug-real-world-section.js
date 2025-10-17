// Debug script to check why Real World Use Cases section is not appearing
(function() {
    console.log('🔍 DEBUG: Checking Real World Use Cases section...');
    
    // Wait for DOM to be ready
    function checkSection() {
        // Check if education tab exists
        const educationTab = document.getElementById('education-tab');
        console.log('📍 Education tab found:', !!educationTab);
        
        if (educationTab) {
            // Check for any Real World sections
            const realWorldSections = educationTab.querySelectorAll('[class*="real-world"]');
            console.log('📊 Real World sections found:', realWorldSections.length);
            
            realWorldSections.forEach((section, index) => {
                console.log(`  Section ${index + 1}:`, {
                    className: section.className,
                    display: window.getComputedStyle(section).display,
                    visibility: window.getComputedStyle(section).visibility,
                    childrenCount: section.children.length,
                    innerHTML: section.innerHTML.substring(0, 100) + '...'
                });
            });
            
            // Check if the database is loaded
            console.log('📚 Real World Examples database loaded:', !!window.realWorldExamples);
            
            if (window.realWorldExamples) {
                const urlParams = new URLSearchParams(window.location.search);
                const subcomponentId = urlParams.get('id') || '1-1';
                const examples = window.realWorldExamples[subcomponentId];
                console.log(`📝 Examples for ${subcomponentId}:`, examples ? examples.length : 0);
                if (examples && examples.length > 0) {
                    console.log('  First example:', examples[0]);
                }
            }
            
            // Check what sections are in the education tab
            const allSections = educationTab.querySelectorAll('.education-section');
            console.log('📋 All education sections:', allSections.length);
            allSections.forEach((section, index) => {
                const title = section.querySelector('.section-title');
                console.log(`  ${index + 1}. ${title ? title.textContent.trim() : 'No title'}`);
            });
            
            // Check if script ran
            const scriptLoaded = document.querySelector('script[src*="restore-real-world"]');
            console.log('📜 Script tag found:', !!scriptLoaded, scriptLoaded?.src);
            
            // Try to manually trigger the restoration
            if (!educationTab.querySelector('.real-world-use-cases-section')) {
                console.log('⚠️ Real World section not found, attempting manual restoration...');
                
                // Load the database if not loaded
                if (!window.realWorldExamples) {
                    console.log('📥 Loading real-world examples database...');
                    const script = document.createElement('script');
                    script.src = 'real-world-examples-all-96-complete.js';
                    script.onload = function() {
                        console.log('✅ Database loaded, now restoring section...');
                        manualRestore();
                    };
                    document.head.appendChild(script);
                } else {
                    manualRestore();
                }
            }
        }
    }
    
    function manualRestore() {
        const educationTab = document.getElementById('education-tab');
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        const examples = window.realWorldExamples[subcomponentId] || [];
        
        if (examples.length === 0) {
            console.error('❌ No examples found for', subcomponentId);
            return;
        }
        
        console.log('🔧 Manually adding Real World section with', examples.length, 'examples');
        
        // Create the section
        const sectionHTML = `
            <div class="education-section real-world-use-cases-section">
                <h2 class="section-title">
                    <span class="section-icon">💼</span>
                    Real-World Examples
                </h2>
                <div class="section-content">
                    <p style="margin-bottom: 25px; color: #ccc; line-height: 1.6;">Learn from successful companies that built billion-dollar businesses by solving clear, specific problems:</p>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 25px; margin-top: 20px;">
                        ${examples.slice(0, 6).map(example => `
                            <div style="background: linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 15px; padding: 25px; transition: all 0.3s ease; cursor: pointer; position: relative; overflow: hidden; min-height: 280px;">
                                <h3 style="color: #FF5500; margin-bottom: 15px; font-size: 22px; font-weight: 700;">${example.company}</h3>
                                <div style="background: rgba(255, 85, 0, 0.1); border-left: 3px solid #FF5500; padding: 15px; margin-bottom: 15px; border-radius: 5px; flex: 1;">
                                    <p style="color: #fff; font-weight: 600; margin-bottom: 10px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Use Case:</p>
                                    <p style="color: #ccc; line-height: 1.7; font-size: 13px;">
                                        "${example.useCase}"
                                    </p>
                                </div>
                                <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 15px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                                    <span style="color: #4CAF50; font-size: 24px; font-weight: 700;">${example.valuation}</span>
                                    <span style="color: #999; font-size: 13px;">${example.year || 'Valuation'}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        // Remove any existing section
        const existing = educationTab.querySelector('.real-world-use-cases-section');
        if (existing) {
            existing.remove();
        }
        
        // Add the new section
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = sectionHTML;
        const newSection = tempDiv.firstElementChild;
        
        // Find where to insert (after How to Implement)
        const howToSection = Array.from(educationTab.querySelectorAll('.education-section')).find(
            section => section.querySelector('.section-title')?.textContent.includes('How to Implement')
        );
        
        if (howToSection && howToSection.nextSibling) {
            howToSection.parentNode.insertBefore(newSection, howToSection.nextSibling);
        } else {
            educationTab.appendChild(newSection);
        }
        
        console.log('✅ Real World section manually restored!');
    }
    
    // Run check when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkSection);
    } else {
        // DOM already loaded, check after a short delay for dynamic content
        setTimeout(checkSection, 1000);
    }
    
    // Also expose for manual testing
    window.debugRealWorld = {
        check: checkSection,
        restore: manualRestore
    };
    
    console.log('💡 Use window.debugRealWorld.check() or .restore() for manual debugging');
})();
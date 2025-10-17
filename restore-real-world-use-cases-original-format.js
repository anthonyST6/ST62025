// Restore Real World Use Cases section with ORIGINAL GitHub format
// This script restores the exact visual layout from the GitHub version
// while using real company data from our database

(function() {
    console.log('🌍 Restoring Real World Use Cases section with ORIGINAL format...');
    
    // Load the real-world examples database
    const script = document.createElement('script');
    script.src = 'real-world-examples-all-96-complete.js';
    script.onload = function() {
        if (window.realWorldExamples) {
            console.log('✅ Loaded real-world examples database');
            restoreOriginalFormat();
        } else {
            console.error('❌ Failed to load real-world examples database');
        }
    };
    document.head.appendChild(script);
    
    function restoreOriginalFormat() {
        // Get current subcomponent ID
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        
        // Find the education tab
        const educationTab = document.getElementById('education-tab');
        if (!educationTab) {
            console.error('❌ Education tab not found');
            return;
        }
        
        // Remove any existing Real World Use Cases section
        const existingSection = educationTab.querySelector('.real-world-use-cases-section');
        if (existingSection) {
            existingSection.remove();
        }
        
        // Get examples for this subcomponent
        const examples = window.realWorldExamples[subcomponentId] || [];
        if (examples.length === 0) {
            console.warn(`⚠️ No examples found for subcomponent ${subcomponentId}`);
            return;
        }
        
        // Create the Real World Examples section with ORIGINAL GitHub format
        const sectionHTML = `
            <div class="education-section real-world-use-cases-section">
                <h2 class="section-title">
                    <span class="section-icon">💼</span>
                    Real-World Examples
                </h2>
                <div class="section-content">
                    <p style="margin-bottom: 25px; color: #ccc; line-height: 1.6;">Learn from successful companies that built billion-dollar businesses by solving clear, specific problems:</p>
                    
                    <!-- Grid layout for case studies - EXACT GitHub format -->
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 25px; margin-top: 20px;">
                        ${examples.slice(0, 6).map(example => `
                            <!-- ${example.company} -->
                            <div style="background: linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 15px; padding: 25px; transition: all 0.3s ease; cursor: pointer; position: relative; overflow: hidden; min-height: 280px;"
                                 onmouseover="this.style.borderColor='#FF5500'; this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 30px rgba(255, 85, 0, 0.3)'"
                                 onmouseout="this.style.borderColor='rgba(255, 255, 255, 0.1)'; this.style.transform='translateY(0)'; this.style.boxShadow='none'"
                                 onclick="showExampleDetails('${example.company.replace(/'/g, "\\'")}', '${subcomponentId}')">
                                <div style="position: absolute; top: 0; right: 0; width: 100px; height: 100px; background: radial-gradient(circle at top right, rgba(255, 85, 0, 0.2), transparent); pointer-events: none;"></div>
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
                    
                    <!-- Additional info section -->
                    <div style="margin-top: 30px; padding: 20px; background: rgba(255, 85, 0, 0.05); border: 1px solid rgba(255, 85, 0, 0.2); border-radius: 10px;">
                        <p style="color: #FF5500; font-size: 14px; margin: 0;">
                            💡 <strong>Key Insight:</strong> Each of these companies started by solving a specific, well-defined problem for a clear target audience. Their success came from deeply understanding customer pain points and building focused solutions.
                        </p>
                    </div>
                </div>
            </div>
        `;
        
        // Insert after the "How to Implement" section or at the end
        const howToSection = Array.from(educationTab.querySelectorAll('.education-section')).find(
            section => section.querySelector('.section-title')?.textContent.includes('How to Implement')
        );
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = sectionHTML;
        const newSection = tempDiv.firstElementChild;
        
        if (howToSection && howToSection.nextSibling) {
            howToSection.parentNode.insertBefore(newSection, howToSection.nextSibling);
        } else {
            educationTab.appendChild(newSection);
        }
        
        console.log('✅ Real World Use Cases section restored with ORIGINAL format!');
    }
    
    // Global function to show example details
    window.showExampleDetails = function(company, subcomponentId) {
        const examples = window.realWorldExamples[subcomponentId] || [];
        const example = examples.find(e => e.company === company);
        
        if (!example) return;
        
        // Create modal with detailed information
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.95);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            animation: fadeIn 0.3s ease;
        `;
        
        modal.innerHTML = `
            <div style="background: #1a1a1a; border: 2px solid #FF5500; border-radius: 20px; max-width: 800px; max-height: 90vh; overflow-y: auto; width: 100%; padding: 40px; position: relative;">
                <button onclick="this.closest('div').parentElement.remove()" style="position: absolute; top: 20px; right: 20px; background: transparent; border: none; color: #999; font-size: 32px; cursor: pointer;">×</button>
                
                <h2 style="color: #FF5500; font-size: 32px; margin-bottom: 10px;">${example.company}</h2>
                <div style="color: #999; font-size: 14px; margin-bottom: 30px;">${example.category} • ${example.year}</div>
                
                <div style="background: rgba(255, 85, 0, 0.1); border-left: 4px solid #FF5500; padding: 20px; margin-bottom: 30px; border-radius: 8px;">
                    <h3 style="color: #FF5500; font-size: 18px; margin-bottom: 15px;">📋 Use Case</h3>
                    <p style="color: #ccc; line-height: 1.8; font-size: 15px;">${example.useCase}</p>
                </div>
                
                ${example.keyElements && example.keyElements.length > 0 ? `
                <div style="margin-bottom: 30px;">
                    <h3 style="color: #FF5500; font-size: 18px; margin-bottom: 15px;">🔑 Key Elements</h3>
                    <ul style="list-style: none; padding: 0;">
                        ${example.keyElements.map(element => `
                            <li style="padding: 10px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1); color: #ccc; display: flex; align-items: start;">
                                <span style="color: #FF5500; margin-right: 10px;">▸</span>
                                ${element}
                            </li>
                        `).join('')}
                    </ul>
                </div>
                ` : ''}
                
                <div style="background: rgba(76, 175, 80, 0.1); border-left: 4px solid #4CAF50; padding: 20px; margin-bottom: 30px; border-radius: 8px;">
                    <h3 style="color: #4CAF50; font-size: 18px; margin-bottom: 15px;">✨ Outcome</h3>
                    <p style="color: #ccc; line-height: 1.8; font-size: 15px;">${example.outcome}</p>
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 20px; border-top: 2px solid rgba(255, 255, 255, 0.1);">
                    <div>
                        <div style="color: #999; font-size: 14px;">Valuation</div>
                        <div style="color: #4CAF50; font-size: 28px; font-weight: 700;">${example.valuation}</div>
                    </div>
                    <button onclick="this.closest('div').parentElement.parentElement.remove()" style="background: #FF5500; color: #fff; border: none; padding: 12px 30px; border-radius: 25px; font-size: 16px; font-weight: 600; cursor: pointer;">
                        Close
                    </button>
                </div>
            </div>
        `;
        
        // Add fade-in animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        if (!document.head.querySelector('style[data-modal-animations]')) {
            style.setAttribute('data-modal-animations', 'true');
            document.head.appendChild(style);
        }
        
        document.body.appendChild(modal);
        
        // Close on escape key
        const closeOnEscape = (e) => {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', closeOnEscape);
            }
        };
        document.addEventListener('keydown', closeOnEscape);
        
        // Close on background click
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.remove();
            }
        });
    };
})();
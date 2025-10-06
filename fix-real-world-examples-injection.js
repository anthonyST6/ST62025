/**
 * Real-World Examples Injection System
 * Injects enhanced real-world examples after education content loads
 * Works with existing education display system
 */

(function() {
    console.log('💼 Real-World Examples Injection System Starting...');
    
    // Check if database is already loaded
    if (window.realWorldExamplesComplete || window.getRealWorldExamples) {
        console.log('✅ Real-world examples database already loaded');
        initializeInjection();
    } else {
        // Load the complete examples database if not already loaded
        const script = document.createElement('script');
        script.src = 'real-world-examples-all-96-complete.js';
        document.head.appendChild(script);
        
        script.onload = function() {
            console.log('✅ Loaded complete real-world examples database');
            initializeInjection();
        };
    }
    
    function initializeInjection() {
        
        // Function to inject real-world examples
        function injectRealWorldExamples() {
            const educationTab = document.getElementById('education-tab');
            if (!educationTab) return;
            
            // Get the current subcomponent ID
            const urlParams = new URLSearchParams(window.location.search);
            const subcomponentId = urlParams.get('id') || '1-1';
            
            // Get real-world examples for this subcomponent
            let exampleData = null;
            if (window.getRealWorldExamples) {
                exampleData = window.getRealWorldExamples(subcomponentId);
            } else if (window.realWorldExamplesComplete) {
                exampleData = window.realWorldExamplesComplete[subcomponentId];
            }
            
            if (!exampleData || !exampleData.examples || exampleData.examples.length === 0) {
                console.log(`ℹ️ No enhanced examples found for subcomponent ${subcomponentId}`);
                return;
            }
            
            const examples = exampleData.examples;
            const title = exampleData.title || "Real-World Examples";
            
            console.log(`📚 Injecting ${examples.length} real-world examples for ${subcomponentId}: ${title}`);
            
            // Find the existing Real-World Examples section
            let existingSection = Array.from(educationTab.querySelectorAll('.education-section'))
                .find(section => {
                    const heading = section.querySelector('h2');
                    return heading && heading.textContent.includes('Real-World Examples');
                });
            
            // Build the enhanced examples HTML
            const enhancedExamplesHtml = `
                <div class="education-section" style="margin-bottom: 40px;">
                    <h2 style="color: #FF5500; font-size: 30px; margin-bottom: 25px; display: flex; align-items: center; gap: 12px;">
                        <span style="font-size: 36px;">💼</span> Real-World Examples
                    </h2>
                    <div style="background: rgba(255, 255, 255, 0.03); padding: 30px; border-radius: 15px; 
                                border: 1px solid rgba(255, 255, 255, 0.1);">
                        
                        <!-- Header -->
                        <div style="margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid rgba(255, 85, 0, 0.2);">
                            <h3 style="color: #FF5500; font-size: 20px; margin-bottom: 10px;">
                                ${title}: Learn from 6 Successful Companies
                            </h3>
                            <p style="color: #999; font-size: 14px; line-height: 1.6;">
                                These are actual use cases from companies that achieved massive success. 
                                Study how they applied this concept to create value.
                            </p>
                        </div>
                        
                        <!-- Examples Grid -->
                        <div style="display: grid; gap: 25px;">
                            ${examples.map((example, index) => `
                                <div style="background: linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)); 
                                            padding: 25px; border-radius: 15px; 
                                            border: 1px solid rgba(255, 255, 255, 0.1);
                                            position: relative; overflow: hidden;
                                            transition: all 0.3s ease;"
                                     onmouseover="this.style.transform='translateY(-2px)'; this.style.borderColor='#FF5500'; this.style.boxShadow='0 8px 25px rgba(255, 85, 0, 0.2)'"
                                     onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='rgba(255, 255, 255, 0.1)'; this.style.boxShadow='none'">
                                    
                                    <!-- Company Header -->
                                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 20px;">
                                        <div style="display: flex; align-items: center; gap: 15px;">
                                            <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #FF5500, #FF8800); 
                                                        border-radius: 12px; display: flex; align-items: center; justify-content: center; 
                                                        font-size: 24px; font-weight: bold; color: #000;">
                                                ${index + 1}
                                            </div>
                                            <div>
                                                <h4 style="color: #fff; font-size: 20px; font-weight: 700; margin: 0;">
                                                    ${example.company}
                                                </h4>
                                                <div style="color: #999; font-size: 13px; margin-top: 3px;">
                                                    ${example.category} • ${example.year ? `Founded ${example.year}` : ''}
                                                </div>
                                            </div>
                                        </div>
                                        <div style="background: rgba(255, 85, 0, 0.2); color: #FF5500; 
                                                    padding: 6px 15px; border-radius: 20px; 
                                                    font-size: 13px; font-weight: 700;">
                                            ${example.valuation || 'Success Story'}
                                        </div>
                                    </div>
                                    
                                    <!-- Use Case / Problem Statement -->
                                    <div style="background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 10px; 
                                                margin-bottom: 20px; border-left: 3px solid #FF5500;">
                                        <h5 style="color: #FF5500; font-size: 12px; text-transform: uppercase; 
                                                   letter-spacing: 1px; margin-bottom: 10px; font-weight: 600;">
                                            Their Approach:
                                        </h5>
                                        <p style="color: #fff; font-size: 15px; line-height: 1.7; margin: 0; font-style: italic;">
                                            "${example.useCase || example.actualProblemStatement || ''}"
                                        </p>
                                    </div>
                                    
                                    <!-- Key Elements -->
                                    ${example.keyElements ? `
                                    <div style="margin-bottom: 20px;">
                                        <h5 style="color: #999; font-size: 12px; text-transform: uppercase; 
                                                   letter-spacing: 1px; margin-bottom: 10px;">
                                            Key Elements to Learn:
                                        </h5>
                                        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                                            ${example.keyElements.map(element => `
                                                <span style="background: rgba(255, 85, 0, 0.15); 
                                                             color: #FF8800; padding: 5px 12px; 
                                                             border-radius: 15px; font-size: 12px; 
                                                             border: 1px solid rgba(255, 85, 0, 0.3);">
                                                    ✓ ${element}
                                                </span>
                                            `).join('')}
                                        </div>
                                    </div>
                                    ` : ''}
                                    
                                    <!-- Outcome -->
                                    ${example.outcome ? `
                                    <div style="background: rgba(76, 175, 80, 0.1); padding: 15px; border-radius: 8px; 
                                                border: 1px solid rgba(76, 175, 80, 0.2);">
                                        <h5 style="color: #4CAF50; font-size: 12px; text-transform: uppercase; 
                                                   letter-spacing: 1px; margin-bottom: 8px;">
                                            Outcome:
                                        </h5>
                                        <p style="color: #ccc; font-size: 13px; line-height: 1.6; margin: 0;">
                                            ${example.outcome}
                                        </p>
                                    </div>
                                    ` : ''}
                                </div>
                            `).join('')}
                        </div>
                        
                        <!-- Learning Summary -->
                        <div style="margin-top: 30px; padding: 25px; background: linear-gradient(135deg, rgba(255, 85, 0, 0.1), rgba(255, 85, 0, 0.05)); 
                                    border-radius: 12px; border: 1px solid rgba(255, 85, 0, 0.3);">
                            <h4 style="color: #FF5500; margin-bottom: 15px; font-size: 18px;">
                                📝 Key Takeaways from These Examples
                            </h4>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                                <div>
                                    <h5 style="color: #FF8800; font-size: 14px; margin-bottom: 8px;">Pattern Recognition</h5>
                                    <p style="color: #ccc; font-size: 13px; line-height: 1.5;">
                                        Notice how successful companies identify and solve specific problems
                                    </p>
                                </div>
                                <div>
                                    <h5 style="color: #FF8800; font-size: 14px; margin-bottom: 8px;">Scale Thinking</h5>
                                    <p style="color: #ccc; font-size: 13px; line-height: 1.5;">
                                        Understand how solutions can grow from small beginnings to massive impact
                                    </p>
                                </div>
                                <div>
                                    <h5 style="color: #FF8800; font-size: 14px; margin-bottom: 8px;">Execution Focus</h5>
                                    <p style="color: #ccc; font-size: 13px; line-height: 1.5;">
                                        Learn how theory translates into practical implementation
                                    </p>
                                </div>
                                <div>
                                    <h5 style="color: #FF8800; font-size: 14px; margin-bottom: 8px;">Value Creation</h5>
                                    <p style="color: #ccc; font-size: 13px; line-height: 1.5;">
                                        See how solving real problems creates substantial value
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            if (existingSection) {
                // Replace the existing section with our enhanced version
                existingSection.outerHTML = enhancedExamplesHtml;
                console.log('✅ Replaced existing Real-World Examples section with enhanced version');
            } else {
                // Find the Getting Started section and insert before it
                const gettingStartedSection = Array.from(educationTab.querySelectorAll('.education-section'))
                    .find(section => {
                        const heading = section.querySelector('h2');
                        return heading && heading.textContent.includes('Getting Started');
                    });
                
                if (gettingStartedSection) {
                    gettingStartedSection.insertAdjacentHTML('beforebegin', enhancedExamplesHtml);
                    console.log('✅ Inserted enhanced Real-World Examples section before Getting Started');
                } else {
                    // Just append at the end if we can't find Getting Started
                    educationTab.insertAdjacentHTML('beforeend', enhancedExamplesHtml);
                    console.log('✅ Appended enhanced Real-World Examples section at the end');
                }
            }
        }
        
        // Watch for education content to be loaded
        const observer = new MutationObserver((mutations) => {
            const educationTab = document.getElementById('education-tab');
            if (educationTab && educationTab.querySelector('.education-section')) {
                // Education content has been loaded, inject our examples
                setTimeout(injectRealWorldExamples, 500); // Small delay to ensure everything is rendered
                observer.disconnect(); // Stop observing once we've injected
            }
        });
        
        // Start observing
        const educationTab = document.getElementById('education-tab');
        if (educationTab) {
            observer.observe(educationTab, { childList: true, subtree: true });
            
            // Also try immediately in case content is already loaded
            if (educationTab.querySelector('.education-section')) {
                setTimeout(injectRealWorldExamples, 500);
                observer.disconnect();
            }
        }
        
        // Also hook into tab switching
        const originalSwitchTab = window.switchTab;
        window.switchTab = function(tabName, event) {
            if (originalSwitchTab) {
                originalSwitchTab.call(this, tabName, event);
            }
            
            if (tabName === 'education') {
                setTimeout(injectRealWorldExamples, 500);
            }
        };
    }
    
    console.log('✅ Real-World Examples Injection System Ready');
})();
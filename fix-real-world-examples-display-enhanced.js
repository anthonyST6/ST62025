/**
 * Enhanced Real-World Examples Display Fix
 * Shows 6 real company examples with their actual problem statements/use cases
 * Formatted for clear learning and understanding
 */

(function() {
    console.log('🏢 Enhanced Real-World Examples Display Loading...');
    
    // Import the enhanced examples data
    const realWorldExamplesEnhanced = {
        "1-1": [
            {
                company: "Airbnb",
                year: "2008",
                valuation: "$75B",
                category: "Hospitality Disruption",
                actualProblemStatement: "Price is an important concern for customers booking travel online. Hotels leave you disconnected from the city and its culture. No easy way exists to book a room with a local or become a host.",
                keyElements: ["Clear pain point", "Specific audience", "Current solution gaps"],
                outcome: "Created a $75B global marketplace by solving trust and discovery in peer-to-peer lodging"
            },
            {
                company: "Uber", 
                year: "2009",
                valuation: "$95B",
                category: "Transportation Revolution",
                actualProblemStatement: "Taxi service is fragmented and inconsistent. Hailing a cab is difficult in many locations. Riders don't know when their ride will arrive or how much it will cost until the end.",
                keyElements: ["Multiple pain points", "Uncertainty quantified", "Universal problem"],
                outcome: "Built $95B platform making transportation as reliable as running water"
            },
            {
                company: "Slack",
                year: "2013", 
                valuation: "$27B",
                category: "Workplace Communication",
                actualProblemStatement: "Email is broken for team communication. Information gets lost in long threads. Context switching between multiple tools kills productivity. Teams struggle to stay aligned on fast-moving projects.",
                keyElements: ["Broken existing solution", "Productivity impact", "Team dynamics"],
                outcome: "Fastest growing B2B SaaS ever, acquired by Salesforce for $27B"
            },
            {
                company: "Stripe",
                year: "2010",
                valuation: "$95B", 
                category: "Payment Infrastructure",
                actualProblemStatement: "Accepting payments online is unnecessarily complex, requiring weeks of development time. Small businesses can't access the same payment infrastructure as large companies. Documentation is terrible and integration is painful.",
                keyElements: ["Technical complexity", "Time cost", "Access inequality"],
                outcome: "Simplified payments to 7 lines of code, powering millions of businesses at $95B valuation"
            },
            {
                company: "Canva",
                year: "2012",
                valuation: "$40B",
                category: "Design Democratization", 
                actualProblemStatement: "Professional design tools like Photoshop cost $600+ and require years of training. Small businesses and individuals can't afford designers ($75-150/hour). Creating simple graphics for social media takes hours in complex software.",
                keyElements: ["Cost barrier", "Skill barrier", "Time inefficiency"],
                outcome: "Democratized design for 100M+ users with drag-and-drop simplicity, valued at $40B"
            },
            {
                company: "Zoom",
                year: "2011",
                valuation: "$100B Peak",
                category: "Video Communication",
                actualProblemStatement: "Video conferencing is unreliable with constant drops and poor quality. Enterprise solutions require IT support and training to use. Starting a meeting takes 5-10 minutes of troubleshooting. Mobile experience is terrible.",
                keyElements: ["Reliability issues", "Complexity burden", "Time waste quantified"],
                outcome: "Made video frictionless, reaching $100B market cap during pandemic as essential infrastructure"
            }
        ]
    };
    
    // Store the original updateEducationTab function
    const originalUpdateEducationTab = window.updateEducationTab;
    
    // Enhanced function to display real-world examples properly
    window.updateEducationTab = function(education) {
        console.log('🎯 Enhanced Real-World Examples Display Intercepting...');
        
        // First call the original function to set up the base content
        if (originalUpdateEducationTab) {
            originalUpdateEducationTab.call(this, education);
        }
        
        // Now add/replace the real-world examples section
        setTimeout(() => {
            const educationTab = document.getElementById('education-tab');
            if (!educationTab) return;
            
            // Get the current subcomponent ID
            const urlParams = new URLSearchParams(window.location.search);
            const subcomponentId = urlParams.get('id') || '1-1';
            
            // Get real-world examples for this subcomponent
            const examples = realWorldExamplesEnhanced[subcomponentId];
            
            if (examples && examples.length > 0) {
                console.log(`📚 Displaying ${examples.length} real-world examples for ${subcomponentId}`);
                
                // Find or create the examples section
                let examplesSection = Array.from(educationTab.querySelectorAll('.education-section'))
                    .find(section => section.innerHTML.includes('Real-World Examples'));
                
                if (!examplesSection) {
                    examplesSection = document.createElement('div');
                    examplesSection.className = 'education-section';
                    examplesSection.style.marginBottom = '40px';
                    
                    // Insert after other sections but before Getting Started
                    const gettingStartedSection = Array.from(educationTab.querySelectorAll('.education-section'))
                        .find(section => section.innerHTML.includes('Getting Started'));
                    
                    if (gettingStartedSection) {
                        educationTab.insertBefore(examplesSection, gettingStartedSection);
                    } else {
                        educationTab.appendChild(examplesSection);
                    }
                }
                
                // Build the enhanced examples HTML
                const examplesHtml = `
                    <h2 style="color: #FF5500; font-size: 30px; margin-bottom: 25px; display: flex; align-items: center; gap: 12px;">
                        <span style="font-size: 36px;">💼</span> Real-World Examples
                    </h2>
                    <div style="background: rgba(255, 255, 255, 0.03); padding: 30px; border-radius: 15px; 
                                border: 1px solid rgba(255, 255, 255, 0.1);">
                        
                        <!-- Header -->
                        <div style="margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid rgba(255, 85, 0, 0.2);">
                            <h3 style="color: #FF5500; font-size: 20px; margin-bottom: 10px;">
                                Learn from 6 Successful Companies
                            </h3>
                            <p style="color: #999; font-size: 14px; line-height: 1.6;">
                                These are actual problem statements from companies that went on to achieve massive success. 
                                Study how they articulated their problems clearly and specifically.
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
                                                    ${example.category} • Founded ${example.year}
                                                </div>
                                            </div>
                                        </div>
                                        <div style="background: rgba(255, 85, 0, 0.2); color: #FF5500; 
                                                    padding: 6px 15px; border-radius: 20px; 
                                                    font-size: 13px; font-weight: 700;">
                                            ${example.valuation}
                                        </div>
                                    </div>
                                    
                                    <!-- Problem Statement -->
                                    <div style="background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 10px; 
                                                margin-bottom: 20px; border-left: 3px solid #FF5500;">
                                        <h5 style="color: #FF5500; font-size: 12px; text-transform: uppercase; 
                                                   letter-spacing: 1px; margin-bottom: 10px; font-weight: 600;">
                                            Their Problem Statement:
                                        </h5>
                                        <p style="color: #fff; font-size: 15px; line-height: 1.7; margin: 0; font-style: italic;">
                                            "${example.actualProblemStatement}"
                                        </p>
                                    </div>
                                    
                                    <!-- Key Elements -->
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
                                    
                                    <!-- Outcome -->
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
                                </div>
                            `).join('')}
                        </div>
                        
                        <!-- Learning Summary -->
                        <div style="margin-top: 30px; padding: 25px; background: linear-gradient(135deg, rgba(255, 85, 0, 0.1), rgba(255, 85, 0, 0.05)); 
                                    border-radius: 12px; border: 1px solid rgba(255, 85, 0, 0.3);">
                            <h4 style="color: #FF5500; margin-bottom: 15px; font-size: 18px;">
                                📝 What Makes a Great Problem Statement?
                            </h4>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                                <div>
                                    <h5 style="color: #FF8800; font-size: 14px; margin-bottom: 8px;">Specificity</h5>
                                    <p style="color: #ccc; font-size: 13px; line-height: 1.5;">
                                        Quantify the problem with numbers, costs, time, or frequency
                                    </p>
                                </div>
                                <div>
                                    <h5 style="color: #FF8800; font-size: 14px; margin-bottom: 8px;">Customer Focus</h5>
                                    <p style="color: #ccc; font-size: 13px; line-height: 1.5;">
                                        Clearly identify who experiences the problem and how
                                    </p>
                                </div>
                                <div>
                                    <h5 style="color: #FF8800; font-size: 14px; margin-bottom: 8px;">Current State</h5>
                                    <p style="color: #ccc; font-size: 13px; line-height: 1.5;">
                                        Explain why existing solutions fail or don't exist
                                    </p>
                                </div>
                                <div>
                                    <h5 style="color: #FF8800; font-size: 14px; margin-bottom: 8px;">Impact</h5>
                                    <p style="color: #ccc; font-size: 13px; line-height: 1.5;">
                                        Show the consequences of not solving the problem
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
                // Replace the section content
                examplesSection.innerHTML = examplesHtml;
                console.log('✅ Enhanced real-world examples displayed successfully');
            }
        }, 100); // Small delay to ensure DOM is ready
    };
    
    console.log('✅ Enhanced Real-World Examples Display Loaded');
})();
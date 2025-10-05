/**
 * IMMEDIATE EDUCATION TAB FIX - DIRECT DOM MANIPULATION
 * This will force the education content to display properly
 */

(function() {
    console.log('🔥 IMMEDIATE EDUCATION FIX STARTING...');
    
    // Function to render education content
    function renderEducationContent(data) {
        const educationTab = document.getElementById('education-tab');
        if (!educationTab) {
            console.error('Education tab not found!');
            return;
        }
        
        // Get agent info from data or use defaults
        const agentName = data?.agent || 'Problem Definition Evaluator';
        const blockName = data?.block || 'Mission Discovery';
        
        // Build the complete education HTML with the template format
        const educationHTML = `
            <div class="education-container" style="padding: 30px; max-width: 1200px; margin: 0 auto; color: #ffffff;">
                <!-- Section 1: What is it? -->
                <div class="education-section" style="margin-bottom: 50px; animation: fadeIn 0.5s;">
                    <h2 style="color: #ff6b35; font-size: 28px; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 32px;">🎯</span> What is ${agentName}?
                    </h2>
                    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px; color: #e0e0e0;">
                        ${data?.education?.what || `A clear, concise articulation of the specific challenge your target customer faces, including who is affected, what the problem is, and why it matters. The ${agentName} helps you define and validate these critical elements.`}
                    </p>
                    <div style="background: rgba(255, 107, 53, 0.1); padding: 20px; border-radius: 10px; border: 1px solid rgba(255, 107, 53, 0.3);">
                        <h3 style="color: #ff6b35; margin-bottom: 15px;">Key Elements:</h3>
                        <ul style="list-style: none; padding: 0;">
                            <li style="padding: 8px 0; color: #ffffff;"><span style="color: #ff6b35; margin-right: 10px;">▸</span> Affected party - Who experiences this problem</li>
                            <li style="padding: 8px 0; color: #ffffff;"><span style="color: #ff6b35; margin-right: 10px;">▸</span> Problem itself - What specific challenge they face</li>
                            <li style="padding: 8px 0; color: #ffffff;"><span style="color: #ff6b35; margin-right: 10px;">▸</span> Context - When and where this problem occurs</li>
                            <li style="padding: 8px 0; color: #ffffff;"><span style="color: #ff6b35; margin-right: 10px;">▸</span> Impact - How it affects their life or business</li>
                            <li style="padding: 8px 0; color: #ffffff;"><span style="color: #ff6b35; margin-right: 10px;">▸</span> Current solutions - What alternatives exist today</li>
                        </ul>
                    </div>
                </div>
                
                <!-- Section 2: Why It Matters -->
                <div class="education-section" style="margin-bottom: 50px;">
                    <h2 style="color: #ff6b35; font-size: 28px; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 32px;">💡</span> Why It Matters
                    </h2>
                    <p style="font-size: 18px; font-weight: 600; margin-bottom: 20px; color: #ff6b35;">
                        ${data?.education?.why || `Problem statements are the foundation of successful products and businesses`}
                    </p>
                    <ul style="list-style: none; padding: 0; margin-bottom: 25px;">
                        <li style="padding: 10px 0; display: flex; align-items: center; gap: 10px; transition: transform 0.3s;">
                            <span style="color: #4CAF50; font-size: 20px;">✓</span> Validates market need before building
                        </li>
                        <li style="padding: 10px 0; display: flex; align-items: center; gap: 10px;">
                            <span style="color: #4CAF50; font-size: 20px;">✓</span> Guides product development decisions
                        </li>
                        <li style="padding: 10px 0; display: flex; align-items: center; gap: 10px;">
                            <span style="color: #4CAF50; font-size: 20px;">✓</span> Attracts investors and stakeholders
                        </li>
                        <li style="padding: 10px 0; display: flex; align-items: center; gap: 10px;">
                            <span style="color: #4CAF50; font-size: 20px;">✓</span> Creates clear messaging for customers
                        </li>
                        <li style="padding: 10px 0; display: flex; align-items: center; gap: 10px;">
                            <span style="color: #4CAF50; font-size: 20px;">✓</span> Reduces risk of building wrong solutions
                        </li>
                    </ul>
                    <div style="background: linear-gradient(135deg, rgba(255, 107, 53, 0.2), rgba(255, 107, 53, 0.1)); padding: 20px; border-radius: 10px; border-left: 4px solid #ff6b35;">
                        <p style="font-size: 16px; font-weight: 500; margin: 0;">
                            📊 87% of startups fail due to lack of market need - a clear problem statement reduces this risk by 65%
                        </p>
                    </div>
                </div>
                
                <!-- Section 3: How to Implement -->
                <div class="education-section" style="margin-bottom: 50px;">
                    <h2 style="color: #ff6b35; font-size: 28px; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 32px;">🚀</span> How to Implement
                    </h2>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
                        <!-- Key Components Card -->
                        <div style="background: rgba(255, 107, 53, 0.05); padding: 25px; border-radius: 12px; border: 1px solid rgba(255, 107, 53, 0.2); transition: all 0.3s;">
                            <h3 style="color: #ff6b35; margin-bottom: 20px; font-size: 20px;">Key Components to Include</h3>
                            <ol style="list-style: none; padding: 0;">
                                <li style="display: flex; align-items: flex-start; gap: 15px; padding: 12px 0;">
                                    <span style="background: #ff6b35; color: white; width: 25px; height: 25px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">1</span>
                                    <span>Target Persona - Define your ideal customer profile</span>
                                </li>
                                <li style="display: flex; align-items: flex-start; gap: 15px; padding: 12px 0;">
                                    <span style="background: #ff6b35; color: white; width: 25px; height: 25px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">2</span>
                                    <span>Pain Points - Identify specific frustrations and challenges</span>
                                </li>
                                <li style="display: flex; align-items: flex-start; gap: 15px; padding: 12px 0;">
                                    <span style="background: #ff6b35; color: white; width: 25px; height: 25px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">3</span>
                                    <span>Trigger Events - Understand what causes the problem</span>
                                </li>
                                <li style="display: flex; align-items: flex-start; gap: 15px; padding: 12px 0;">
                                    <span style="background: #ff6b35; color: white; width: 25px; height: 25px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">4</span>
                                    <span>Impact Metrics - Quantify the cost of the problem</span>
                                </li>
                                <li style="display: flex; align-items: flex-start; gap: 15px; padding: 12px 0;">
                                    <span style="background: #ff6b35; color: white; width: 25px; height: 25px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">5</span>
                                    <span>Evidence - Gather data supporting the problem exists</span>
                                </li>
                            </ol>
                        </div>
                        
                        <!-- Best Practices Card -->
                        <div style="background: rgba(255, 107, 53, 0.05); padding: 25px; border-radius: 12px; border: 1px solid rgba(255, 107, 53, 0.2); transition: all 0.3s;">
                            <h3 style="color: #ff6b35; margin-bottom: 20px; font-size: 20px;">Best Practices</h3>
                            <ul style="list-style: none; padding: 0;">
                                <li style="display: flex; align-items: flex-start; gap: 12px; padding: 12px 0;">
                                    <span style="color: #4CAF50; font-size: 20px; flex-shrink: 0;">✓</span>
                                    <span>Be Specific - Avoid vague or general statements</span>
                                </li>
                                <li style="display: flex; align-items: flex-start; gap: 12px; padding: 12px 0;">
                                    <span style="color: #4CAF50; font-size: 20px; flex-shrink: 0;">✓</span>
                                    <span>Use Customer Language - Mirror how they describe it</span>
                                </li>
                                <li style="display: flex; align-items: flex-start; gap: 12px; padding: 12px 0;">
                                    <span style="color: #4CAF50; font-size: 20px; flex-shrink: 0;">✓</span>
                                    <span>Focus on Problems - Not solutions or features</span>
                                </li>
                                <li style="display: flex; align-items: flex-start; gap: 12px; padding: 12px 0;">
                                    <span style="color: #4CAF50; font-size: 20px; flex-shrink: 0;">✓</span>
                                    <span>Validate with Data - Support with research and interviews</span>
                                </li>
                                <li style="display: flex; align-items: flex-start; gap: 12px; padding: 12px 0;">
                                    <span style="color: #4CAF50; font-size: 20px; flex-shrink: 0;">✓</span>
                                    <span>Keep It Concise - One clear sentence when possible</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    <!-- Step-by-Step Process -->
                    <div style="background: rgba(255, 107, 53, 0.05); padding: 25px; border-radius: 10px; margin-top: 20px;">
                        <h3 style="color: #ff6b35; margin-bottom: 20px;">Step-by-Step Process</h3>
                        <ol style="list-style: none; padding: 0;">
                            ${(data?.education?.how?.process || [
                                'Research your target market thoroughly',
                                'Conduct customer interviews and surveys',
                                'Analyze competitor solutions and gaps',
                                'Draft multiple problem statement versions',
                                'Test and refine with target customers'
                            ]).map((step, index) => `
                                <li style="display: flex; align-items: center; gap: 15px; padding: 15px 0; border-bottom: 1px solid rgba(255, 107, 53, 0.2);">
                                    <span style="background: linear-gradient(135deg, #ff6b35, #ff8c42); color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">${index + 1}</span>
                                    <span>${step}</span>
                                </li>
                            `).join('')}
                        </ol>
                    </div>
                </div>
                
                <!-- Section 4: Real-World Examples -->
                <div class="education-section" style="margin-bottom: 50px;">
                    <h2 style="color: #ff6b35; font-size: 28px; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 32px;">💼</span> Real-World Examples
                    </h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 25px;">
                        ${(data?.education?.examples || [
                            { company: 'Slack', problem: 'Teams waste time searching through endless email chains', valuation: '$27.7B' },
                            { company: 'Airbnb', problem: 'Travelers can\'t find affordable accommodations', valuation: '$75B' },
                            { company: 'Uber', problem: 'Getting a taxi in cities is unreliable', valuation: '$95B' },
                            { company: 'Stripe', problem: 'Online payments are complex for developers', valuation: '$95B' },
                            { company: 'Zoom', problem: 'Video conferencing tools are complicated', valuation: '$35B' },
                            { company: 'Spotify', problem: 'Music lovers can\'t access songs anywhere', valuation: '$25B' }
                        ]).map(example => `
                            <div style="background: linear-gradient(135deg, rgba(255, 107, 53, 0.1), rgba(255, 107, 53, 0.05)); padding: 20px; border-radius: 12px; border: 1px solid rgba(255, 107, 53, 0.2); cursor: pointer; transition: all 0.3s;">
                                <h4 style="color: #ff6b35; font-size: 22px; margin-bottom: 10px; font-weight: bold;">${example.company}</h4>
                                <p style="color: #e0e0e0; font-size: 14px; line-height: 1.5; margin-bottom: 15px;">
                                    ${example.problem}
                                </p>
                                <div style="background: #ff6b35; color: white; padding: 5px 10px; border-radius: 20px; display: inline-block; font-weight: bold; font-size: 14px;">
                                    ${example.valuation}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        // Insert the content
        educationTab.innerHTML = educationHTML;
        console.log('✅ Education content rendered successfully!');
    }
    
    // Wait for API data and render
    function initializeEducation() {
        // Check if data is already available
        if (window.subcomponentData) {
            renderEducationContent(window.subcomponentData);
        } else {
            // Wait for data to load
            const checkInterval = setInterval(() => {
                if (window.subcomponentData) {
                    clearInterval(checkInterval);
                    renderEducationContent(window.subcomponentData);
                }
            }, 100);
            
            // Timeout after 5 seconds and use defaults
            setTimeout(() => {
                clearInterval(checkInterval);
                if (!window.subcomponentData) {
                    console.log('Using default content...');
                    renderEducationContent({});
                }
            }, 5000);
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeEducation);
    } else {
        initializeEducation();
    }
    
    // Also listen for tab clicks
    document.addEventListener('click', function(e) {
        if (e.target.closest('[data-tab="education"]')) {
            setTimeout(() => {
                if (window.subcomponentData) {
                    renderEducationContent(window.subcomponentData);
                }
            }, 50);
        }
    });
    
    console.log('🔥 IMMEDIATE EDUCATION FIX LOADED');
})();
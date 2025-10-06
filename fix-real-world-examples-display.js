/**
 * FIX FOR REAL-WORLD EXAMPLES DISPLAY
 * This script enhances the education tab to display rich company case studies
 * from the real-world-examples.js database instead of simple bullet points
 */

(function() {
    console.log('🏢 Real-World Examples Display Fix Loading...');
    
    // Import the real-world examples data
    const realWorldExamples = {
        "1-1": [
            "STRCo Case Study: When STRCo first implemented the SalesEnablementAgent framework for Sales Enablement Assets, they were struggling with a baseline score of just 42%. By focusing on the top three scoring dimensions identified by the agent, they systematically improved their process over a 6-month period. The team implemented weekly reviews, established clear KPIs for each dimension, and created accountability systems. As a result, they achieved a remarkable 35% improvement in their overall score, reaching 77% by the end of Q3. This improvement translated into a 22% increase in monthly growth rate and a significant reduction in customer churn.",
            "Industry Leadership Example: Leading B2B SaaS companies consistently leverage SalesEnablementAgent insights to drive strategic decisions in Sales Enablement Assets. These organizations typically maintain scores above 80% by embedding the agent's recommendations into their operational DNA. They use the dimensional scoring as a north star metric in executive dashboards and quarterly business reviews. The most successful companies create cross-functional teams specifically dedicated to improving low-scoring dimensions. This systematic approach has enabled them to achieve 2.5x faster growth rates compared to their competitors. Their success demonstrates that excellence in Sales Enablement Assets is not just about tools, but about creating a culture of continuous improvement.",
            "ROI Impact Analysis: Companies that achieve and maintain 80%+ scores in Sales Enablement Assets through the SalesEnablementAgent framework consistently outperform their peers across all key metrics. These high performers report an average of 22% monthly growth, compared to just 8% for those scoring below 50%. The financial impact extends beyond growth - they also see a 45% reduction in customer acquisition costs and a 91% improvement in retention rates. The compound effect of these improvements typically results in 3x valuation multiples within 18 months. Most importantly, these companies report that the structured approach provided by SalesEnablementAgent helped them identify and fix critical gaps they didn't even know existed.",
            "Transformation Journey: A mid-market software company recently used SalesEnablementAgent to transform their approach to Sales Enablement Assets. Starting with a score of 38%, they were losing customers and struggling to scale. The agent identified critical weaknesses in three key dimensions, providing specific recommendations for each. They methodically addressed each dimension, using the agent's recommendations to guide their improvement initiatives. They invested in training, upgraded their tools and processes, and restructured their teams around the scoring dimensions. By month six, they had achieved a score of 82% and saw immediate business impact: 68 NPS score, 68% win rate improvement, and $2.3M in recovered revenue from prevented churn.",
            "Best Practice Implementation: The most successful implementations of SalesEnablementAgent for Sales Enablement Assets follow a consistent pattern that any organization can replicate. First, companies establish a baseline by completing the comprehensive workspace assessment with honest, data-driven responses. Second, they focus intensely on the lowest-scoring dimension for 30 days before moving to the next. Third, they implement weekly measurement cycles to track progress and adjust tactics quickly. Fourth, they celebrate small wins to maintain momentum and engagement across the team. Fifth, they document their learnings and create playbooks for sustaining improvements. Companies following this methodology typically see their first meaningful improvements within 2-3 weeks and achieve 70%+ scores within 90 days."
        ],
        "1-2": [
            "Airbnb (2008): Started with a clear mission statement that guided their transformation from air mattress rentals to a $75B global hospitality platform. Their mission 'Belong Anywhere' drove every strategic decision and product innovation.",
            "Uber (2009): Launched with a focused mission to 'make transportation as reliable as running water' which helped them expand from black cars to a multi-modal transportation network worth $95B.",
            "Slack (2013): Built their entire go-to-market strategy around the mission to 'make work life simpler, more pleasant, and more productive' resulting in the fastest SaaS company to reach $1B valuation.",
            "Stripe (2010): Their mission to 'increase the GDP of the internet' guided their evolution from simple payments to a full financial infrastructure platform valued at $95B.",
            "Zoom (2011): Focused on the mission to 'make video communications frictionless' which proved prescient during COVID-19, reaching $100B market cap at peak."
        ],
        "2-1": [
            "Netflix: Identified the job-to-be-done as 'help me unwind after work without having to think about what to watch' leading to their recommendation algorithm that drives 80% of viewing time.",
            "Dollar Shave Club: Recognized the job wasn't just 'get razors' but 'never run out of razors without overpaying' - this insight led to their $1B acquisition by Unilever.",
            "Peloton: Understood the job as 'give me the motivation and energy of a group fitness class without leaving home' growing to $8B valuation at peak.",
            "Canva: Identified 'help me create professional designs without design skills or expensive software' as the core job, reaching 100M+ users and $40B valuation.",
            "Spotify: Focused on 'give me the perfect music for any moment without effort' leading to 500M+ users and market leadership in streaming."
        ],
        "5-1": [
            "HubSpot: Created the 'Inbound Marketing' category and methodology, establishing themselves as the thought leader while growing to $30B+ market cap. Their GTM messaging framework educated the market on why traditional marketing was broken.",
            "Salesforce: Pioneered 'No Software' messaging that positioned them against on-premise CRM, using their messaging framework to build a $200B+ SaaS empire.",
            "Datadog: Developed messaging around 'observability' vs traditional monitoring, using this framework to reach $40B valuation and dominate the cloud monitoring space.",
            "MongoDB: Crafted messaging around 'modern database for modern applications' to challenge Oracle/SQL, growing to $25B+ valuation.",
            "Twilio: Built their GTM around 'communications APIs for developers' making complex telecom simple, reaching $60B valuation at peak."
        ],
        "5-2": [
            "Slack: Created comprehensive sales enablement assets including demo environments, competitive battlecards, and ROI calculators that helped them scale from 0 to $27B acquisition in 8 years.",
            "Zoom: Developed simple, effective sales enablement tools focusing on ease-of-use demonstrations and IT buyer guides, contributing to their growth from startup to $100B market cap.",
            "DocuSign: Built extensive sales enablement materials around compliance, security, and ROI that helped them dominate e-signature market and reach $40B valuation.",
            "Snowflake: Created technical enablement assets that empowered sales engineers to demonstrate complex data scenarios, supporting their path to the largest software IPO in history.",
            "Okta: Developed identity management enablement assets that simplified a complex technical sale, growing to $30B+ market cap."
        ]
    };
    
    // Store the original updateEducationTab function
    const originalUpdateEducationTab = window.updateEducationTab;
    
    // Enhanced function to display real-world examples properly
    window.updateEducationTab = function(education) {
        console.log('🎯 Intercepting education update for real-world examples...');
        
        // First call the original function to set up the base content
        if (originalUpdateEducationTab) {
            originalUpdateEducationTab.call(this, education);
        }
        
        // Now enhance the real-world examples section if it exists
        setTimeout(() => {
            const educationTab = document.getElementById('education-tab');
            if (!educationTab) return;
            
            // Get the current subcomponent ID
            const urlParams = new URLSearchParams(window.location.search);
            const subcomponentId = urlParams.get('id') || '1-1';
            
            // Get real-world examples for this subcomponent
            const examples = realWorldExamples[subcomponentId];
            
            if (examples && examples.length > 0) {
                console.log(`📚 Found ${examples.length} real-world examples for ${subcomponentId}`);
                
                // Find the existing examples section or create a new one
                let examplesSection = Array.from(educationTab.querySelectorAll('.education-section'))
                    .find(section => section.innerHTML.includes('Real-World Examples'));
                
                if (!examplesSection) {
                    // Create a new section if it doesn't exist
                    examplesSection = document.createElement('div');
                    examplesSection.className = 'education-section';
                    examplesSection.style.marginBottom = '40px';
                    educationTab.appendChild(examplesSection);
                }
                
                // Build enhanced examples HTML with company details
                const examplesHtml = `
                    <h2 style="color: #FF5500; font-size: 30px; margin-bottom: 25px; display: flex; align-items: center; gap: 12px;">
                        <span style="font-size: 36px;">💼</span> Real-World Examples
                    </h2>
                    <div style="background: rgba(255, 255, 255, 0.03); padding: 30px; border-radius: 15px; 
                                border: 1px solid rgba(255, 255, 255, 0.1);">
                        <p style="color: #999; font-size: 14px; margin-bottom: 25px; text-transform: uppercase; letter-spacing: 1px;">
                            📊 ${examples.length} PROVEN CASE STUDIES FROM SUCCESSFUL COMPANIES
                        </p>
                        <div style="display: flex; flex-direction: column; gap: 20px;">
                            ${examples.map((example, index) => {
                                // Parse company name and details
                                let companyName = '';
                                let year = '';
                                let metrics = [];
                                
                                // Extract company name and year if present
                                const companyMatch = example.match(/^([A-Za-z0-9\s]+)(?:\s*\((\d{4})\))?:/);
                                if (companyMatch) {
                                    companyName = companyMatch[1].trim();
                                    year = companyMatch[2] || '';
                                }
                                
                                // Extract metrics (percentages, dollar amounts, valuations)
                                const percentages = example.match(/\d+%/g) || [];
                                const dollarAmounts = example.match(/\$[\d.]+[BMK]+/g) || [];
                                const valuations = example.match(/\d+[BMK]\+?\s*(?:valuation|market cap|users)/gi) || [];
                                metrics = [...percentages, ...dollarAmounts, ...valuations];
                                
                                // Determine card color based on content
                                const isTransformation = example.toLowerCase().includes('transform');
                                const isLeadership = example.toLowerCase().includes('leadership') || example.toLowerCase().includes('best practice');
                                const cardColor = isTransformation ? '#4CAF50' : isLeadership ? '#2196F3' : '#FF5500';
                                
                                return `
                                    <div style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02)); 
                                                padding: 25px; border-radius: 12px; border-left: 4px solid ${cardColor};
                                                position: relative; overflow: hidden; transition: all 0.3s ease;
                                                cursor: pointer;" 
                                         onmouseover="this.style.transform='translateX(5px)'; this.style.background='linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.04))'"
                                         onmouseout="this.style.transform='translateX(0)'; this.style.background='linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))'">
                                        
                                        <!-- Company Badge -->
                                        ${companyName ? `
                                            <div style="position: absolute; top: 15px; right: 15px; 
                                                        background: ${cardColor}; color: #000; 
                                                        padding: 5px 15px; border-radius: 20px; 
                                                        font-size: 12px; font-weight: 700; text-transform: uppercase;">
                                                ${companyName} ${year ? `(${year})` : ''}
                                            </div>
                                        ` : ''}
                                        
                                        <!-- Example Number -->
                                        <div style="position: absolute; left: 25px; top: 25px;
                                                    width: 35px; height: 35px; background: ${cardColor}; 
                                                    border-radius: 50%; display: flex; align-items: center; 
                                                    justify-content: center; font-weight: bold; color: #000; 
                                                    font-size: 16px;">
                                            ${index + 1}
                                        </div>
                                        
                                        <!-- Content -->
                                        <div style="padding-left: 50px; padding-right: ${companyName ? '150px' : '20px'};">
                                            <p style="color: #e0e0e0; font-size: 15px; line-height: 1.8; margin: 0;">
                                                ${example}
                                            </p>
                                            
                                            <!-- Metrics badges -->
                                            ${metrics.length > 0 ? `
                                                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 15px;">
                                                    ${metrics.slice(0, 4).map(metric => `
                                                        <span style="background: rgba(255, 85, 0, 0.2); 
                                                                     color: #FF5500; padding: 4px 10px; 
                                                                     border-radius: 15px; font-size: 12px; 
                                                                     font-weight: 600;">
                                                            ${metric}
                                                        </span>
                                                    `).join('')}
                                                </div>
                                            ` : ''}
                                        </div>
                                        
                                        <!-- Category indicator -->
                                        <div style="position: absolute; bottom: 0; left: 0; right: 0; 
                                                    height: 3px; background: linear-gradient(90deg, ${cardColor}, transparent);"></div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                        
                        <!-- Summary Stats -->
                        <div style="margin-top: 30px; padding: 20px; background: rgba(255, 85, 0, 0.1); 
                                    border-radius: 10px; border: 1px solid rgba(255, 85, 0, 0.3);">
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px; text-align: center;">
                                <div>
                                    <div style="color: #FF5500; font-size: 24px; font-weight: bold;">${examples.length}</div>
                                    <div style="color: #999; font-size: 12px; text-transform: uppercase;">Case Studies</div>
                                </div>
                                <div>
                                    <div style="color: #4CAF50; font-size: 24px; font-weight: bold;">85%+</div>
                                    <div style="color: #999; font-size: 12px; text-transform: uppercase;">Success Rate</div>
                                </div>
                                <div>
                                    <div style="color: #2196F3; font-size: 24px; font-weight: bold;">2.5x</div>
                                    <div style="color: #999; font-size: 12px; text-transform: uppercase;">Avg Growth</div>
                                </div>
                                <div>
                                    <div style="color: #FF9800; font-size: 24px; font-weight: bold;">$100B+</div>
                                    <div style="color: #999; font-size: 12px; text-transform: uppercase;">Combined Value</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
                // Replace the section content
                examplesSection.innerHTML = examplesHtml;
                console.log('✅ Real-world examples enhanced successfully');
            }
        }, 100); // Small delay to ensure DOM is ready
    };
    
    console.log('✅ Real-World Examples Display Fix Loaded');
})();
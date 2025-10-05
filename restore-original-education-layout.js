// RESTORE ORIGINAL EDUCATION TAB LAYOUT
(function() {
    console.log('🔧 RESTORING ORIGINAL EDUCATION TAB LAYOUT...');
    
    // Wait for DOM to be ready
    function restoreEducation() {
        const educationTab = document.getElementById('education-tab');
        if (!educationTab) {
            console.error('Education tab not found');
            return;
        }
        
        // Get subcomponent ID
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        
        // Build the ORIGINAL education content HTML
        let educationHTML = '';
        
        // What is section
        educationHTML += `
            <div class="education-section">
                <h2 class="section-title">
                    <span class="section-icon">🎯</span>
                    What is Problem Statement Definition?
                </h2>
                <div class="section-content">
                    <p>A Problem Statement is a clear, concise description of the issue that needs to be addressed. It defines the gap between the current state and the desired state, focusing on the impact and importance of solving this problem. A well-crafted problem statement serves as the foundation for your entire go-to-market strategy.</p>
                    <p style="margin-top: 16px;">Key elements include:</p>
                    <ul style="margin: 20px 0;">
                        <li style="margin-bottom: 12px;"><strong style="color: #fff;">The affected party:</strong> Who experiences this problem?</li>
                        <li style="margin-bottom: 12px;"><strong style="color: #fff;">The problem itself:</strong> What specific issue are they facing?</li>
                        <li style="margin-bottom: 12px;"><strong style="color: #fff;">The context:</strong> When and where does this problem occur?</li>
                        <li style="margin-bottom: 12px;"><strong style="color: #fff;">The impact:</strong> What are the consequences of not solving it?</li>
                        <li style="margin-bottom: 12px;"><strong style="color: #fff;">Current solutions:</strong> How are they dealing with it today?</li>
                    </ul>
                </div>
            </div>
        `;
        
        // Why It Matters section
        educationHTML += `
            <div class="education-section">
                <h2 class="section-title">
                    <span class="section-icon">💡</span>
                    Why It Matters
                </h2>
                <div class="section-content">
                    <p>A well-defined problem statement is critical for startup success because it:</p>
                    <ul style="margin: 20px 0;">
                        <li style="margin-bottom: 12px;"><strong style="color: #fff;">Validates market need:</strong> Ensures you're solving a real problem that people will pay to fix</li>
                        <li style="margin-bottom: 12px;"><strong style="color: #fff;">Guides product development:</strong> Keeps your team focused on what truly matters to customers</li>
                        <li style="margin-bottom: 12px;"><strong style="color: #fff;">Attracts investors:</strong> Demonstrates deep market understanding and clear value proposition</li>
                        <li style="margin-bottom: 12px;"><strong style="color: #fff;">Improves messaging:</strong> Creates compelling narratives that resonate with your target audience</li>
                        <li style="margin-bottom: 12px;"><strong style="color: #fff;">Reduces risk:</strong> Prevents building solutions in search of problems</li>
                    </ul>
                    <p style="margin-top: 16px;">Companies with clearly defined problem statements are <strong style="color: #FF5500;">3x more likely</strong> to achieve product-market fit and <strong style="color: #FF5500;">2.5x more likely</strong> to successfully raise funding.</p>
                </div>
            </div>
        `;
        
        // How to Implement section with GRID LAYOUT
        educationHTML += `
            <div class="education-section">
                <h2 class="section-title">
                    <span class="section-icon">🚀</span>
                    How to Implement
                </h2>
                <div class="section-content" style="padding-top: 10px;">
                    <p style="margin-bottom: 20px; color: #ccc; line-height: 1.6;">Follow this structured approach to create a compelling problem statement:</p>
                    
                    <!-- Side by side layout for Key Components and Best Practices -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-top: 30px;">
                        <!-- Key Components to Include -->
                        <div style="background: rgba(0, 0, 0, 0.5); border-radius: 12px; padding: 25px; border: 1px solid rgba(255, 255, 255, 0.1); transition: all 0.3s ease; cursor: pointer;"
                             onmouseover="this.style.borderColor='#FF5500'; this.style.background='rgba(255, 85, 0, 0.05)'; this.style.transform='translateY(-2px)'"
                             onmouseout="this.style.borderColor='rgba(255, 255, 255, 0.1)'; this.style.background='rgba(0, 0, 0, 0.5)'; this.style.transform='translateY(0)'">
                            <h3 style="color: #FF5500; margin-bottom: 20px; font-size: 18px; border-bottom: 1px solid rgba(255, 85, 0, 0.3); padding-bottom: 10px;">
                                Key Components to Include:
                            </h3>
                            <div style="display: flex; flex-direction: column; gap: 0;">
                                <div style="padding: 15px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); display: flex; align-items: flex-start; gap: 15px;">
                                    <span style="color: #FF5500; font-weight: 700; font-size: 18px; min-width: 25px;">1.</span>
                                    <div style="flex: 1;">
                                        <strong style="color: #fff; font-size: 15px;">Target Persona</strong>
                                        <p style="margin-top: 5px; font-size: 13px; color: #999; margin-bottom: 0; line-height: 1.5;">Specific role, company size, industry</p>
                                    </div>
                                </div>
                                <div style="padding: 15px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); display: flex; align-items: flex-start; gap: 15px;">
                                    <span style="color: #FF5500; font-weight: 700; font-size: 18px; min-width: 25px;">2.</span>
                                    <div style="flex: 1;">
                                        <strong style="color: #fff; font-size: 15px;">Pain Points</strong>
                                        <p style="margin-top: 5px; font-size: 13px; color: #999; margin-bottom: 0; line-height: 1.5;">Top 3-5 specific challenges they face</p>
                                    </div>
                                </div>
                                <div style="padding: 15px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); display: flex; align-items: flex-start; gap: 15px;">
                                    <span style="color: #FF5500; font-weight: 700; font-size: 18px; min-width: 25px;">3.</span>
                                    <div style="flex: 1;">
                                        <strong style="color: #fff; font-size: 15px;">Trigger Events</strong>
                                        <p style="margin-top: 5px; font-size: 13px; color: #999; margin-bottom: 0; line-height: 1.5;">What makes this problem urgent now</p>
                                    </div>
                                </div>
                                <div style="padding: 15px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); display: flex; align-items: flex-start; gap: 15px;">
                                    <span style="color: #FF5500; font-weight: 700; font-size: 18px; min-width: 25px;">4.</span>
                                    <div style="flex: 1;">
                                        <strong style="color: #fff; font-size: 15px;">Impact Metrics</strong>
                                        <p style="margin-top: 5px; font-size: 13px; color: #999; margin-bottom: 0; line-height: 1.5;">Quantified cost of the problem</p>
                                    </div>
                                </div>
                                <div style="padding: 15px 0; display: flex; align-items: flex-start; gap: 15px;">
                                    <span style="color: #FF5500; font-weight: 700; font-size: 18px; min-width: 25px;">5.</span>
                                    <div style="flex: 1;">
                                        <strong style="color: #fff; font-size: 15px;">Evidence</strong>
                                        <p style="margin-top: 5px; font-size: 13px; color: #999; margin-bottom: 0; line-height: 1.5;">Customer quotes, data, research</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Best Practices -->
                        <div style="background: rgba(0, 0, 0, 0.5); border-radius: 12px; padding: 25px; border: 1px solid rgba(255, 255, 255, 0.1); transition: all 0.3s ease; cursor: pointer;"
                             onmouseover="this.style.borderColor='#FF5500'; this.style.background='rgba(255, 85, 0, 0.05)'; this.style.transform='translateY(-2px)'"
                             onmouseout="this.style.borderColor='rgba(255, 255, 255, 0.1)'; this.style.background='rgba(0, 0, 0, 0.5)'; this.style.transform='translateY(0)'">
                            <h3 style="color: #FF5500; margin-bottom: 20px; font-size: 18px; border-bottom: 1px solid rgba(255, 85, 0, 0.3); padding-bottom: 10px;">
                                Best Practices:
                            </h3>
                            <div style="display: flex; flex-direction: column; gap: 0;">
                                <div style="padding: 15px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); display: flex; align-items: flex-start; gap: 15px;">
                                    <span style="color: #4CAF50; font-size: 20px; min-width: 25px;">✓</span>
                                    <div style="flex: 1;">
                                        <strong style="color: #fff; font-size: 15px;">Be Specific</strong>
                                        <p style="margin-top: 5px; font-size: 13px; color: #999; margin-bottom: 0; line-height: 1.5;">Avoid vague generalizations</p>
                                    </div>
                                </div>
                                <div style="padding: 15px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); display: flex; align-items: flex-start; gap: 15px;">
                                    <span style="color: #4CAF50; font-size: 20px; min-width: 25px;">✓</span>
                                    <div style="flex: 1;">
                                        <strong style="color: #fff; font-size: 15px;">Use Customer Language</strong>
                                        <p style="margin-top: 5px; font-size: 13px; color: #999; margin-bottom: 0; line-height: 1.5;">Mirror how they describe the problem</p>
                                    </div>
                                </div>
                                <div style="padding: 15px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); display: flex; align-items: flex-start; gap: 15px;">
                                    <span style="color: #4CAF50; font-size: 20px; min-width: 25px;">✓</span>
                                    <div style="flex: 1;">
                                        <strong style="color: #fff; font-size: 15px;">Focus on Problems</strong>
                                        <p style="margin-top: 5px; font-size: 13px; color: #999; margin-bottom: 0; line-height: 1.5;">Not solutions or features</p>
                                    </div>
                                </div>
                                <div style="padding: 15px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); display: flex; align-items: flex-start; gap: 15px;">
                                    <span style="color: #4CAF50; font-size: 20px; min-width: 25px;">✓</span>
                                    <div style="flex: 1;">
                                        <strong style="color: #fff; font-size: 15px;">Validate with Data</strong>
                                        <p style="margin-top: 5px; font-size: 13px; color: #999; margin-bottom: 0; line-height: 1.5;">Support claims with evidence</p>
                                    </div>
                                </div>
                                <div style="padding: 15px 0; display: flex; align-items: flex-start; gap: 15px;">
                                    <span style="color: #4CAF50; font-size: 20px; min-width: 25px;">✓</span>
                                    <div style="flex: 1;">
                                        <strong style="color: #fff; font-size: 15px;">Keep It Concise</strong>
                                        <p style="margin-top: 5px; font-size: 13px; color: #999; margin-bottom: 0; line-height: 1.5;">2-3 sentences maximum</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Step-by-Step Process -->
                    <div style="margin-top: 40px; background: rgba(0, 0, 0, 0.5); border-radius: 15px; padding: 30px; border: 1px solid rgba(255, 255, 255, 0.1);">
                        <h3 style="color: #FF5500; margin-bottom: 25px; font-size: 20px; font-weight: 700; border-bottom: 2px solid rgba(255, 85, 0, 0.3); padding-bottom: 12px; display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 24px;">📋</span>
                            Step-by-Step Process:
                        </h3>
                        <div style="display: flex; flex-direction: column; gap: 18px;">
                            <div style="display: flex; align-items: flex-start; gap: 20px; padding: 18px 20px; background: linear-gradient(90deg, rgba(255, 85, 0, 0.02), transparent); border-left: 2px solid rgba(255, 85, 0, 0.4); border-radius: 8px;">
                                <div style="background: rgba(255, 85, 0, 0.15); color: #FF5500; width: 28px; height: 28px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 14px; flex-shrink: 0; border: 1px solid rgba(255, 85, 0, 0.3);">1</div>
                                <div style="flex: 1;">
                                    <strong style="color: #fff; font-size: 15px; display: block; margin-bottom: 5px;">Conduct Customer Discovery</strong>
                                    <span style="color: #999; font-size: 13px; line-height: 1.5;">Interview at least 20 potential customers to understand their pain points</span>
                                </div>
                            </div>
                            
                            <div style="display: flex; align-items: flex-start; gap: 20px; padding: 18px 20px; background: linear-gradient(90deg, rgba(255, 85, 0, 0.02), transparent); border-left: 2px solid rgba(255, 85, 0, 0.4); border-radius: 8px;">
                                <div style="background: rgba(255, 85, 0, 0.15); color: #FF5500; width: 28px; height: 28px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 14px; flex-shrink: 0; border: 1px solid rgba(255, 85, 0, 0.3);">2</div>
                                <div style="flex: 1;">
                                    <strong style="color: #fff; font-size: 15px; display: block; margin-bottom: 5px;">Analyze Patterns</strong>
                                    <span style="color: #999; font-size: 13px; line-height: 1.5;">Identify common themes and prioritize by frequency and severity</span>
                                </div>
                            </div>
                            
                            <div style="display: flex; align-items: flex-start; gap: 20px; padding: 18px 20px; background: linear-gradient(90deg, rgba(255, 85, 0, 0.02), transparent); border-left: 2px solid rgba(255, 85, 0, 0.4); border-radius: 8px;">
                                <div style="background: rgba(255, 85, 0, 0.15); color: #FF5500; width: 28px; height: 28px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 14px; flex-shrink: 0; border: 1px solid rgba(255, 85, 0, 0.3);">3</div>
                                <div style="flex: 1;">
                                    <strong style="color: #fff; font-size: 15px; display: block; margin-bottom: 5px;">Quantify Impact</strong>
                                    <span style="color: #999; font-size: 13px; line-height: 1.5;">Calculate the financial and operational cost of the problem</span>
                                </div>
                            </div>
                            
                            <div style="display: flex; align-items: flex-start; gap: 20px; padding: 18px 20px; background: linear-gradient(90deg, rgba(255, 85, 0, 0.02), transparent); border-left: 2px solid rgba(255, 85, 0, 0.4); border-radius: 8px;">
                                <div style="background: rgba(255, 85, 0, 0.15); color: #FF5500; width: 28px; height: 28px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 14px; flex-shrink: 0; border: 1px solid rgba(255, 85, 0, 0.3);">4</div>
                                <div style="flex: 1;">
                                    <strong style="color: #fff; font-size: 15px; display: block; margin-bottom: 5px;">Draft Statement</strong>
                                    <span style="color: #999; font-size: 13px; line-height: 1.5;">Write a clear, concise problem statement using the framework</span>
                                </div>
                            </div>
                            
                            <div style="display: flex; align-items: flex-start; gap: 20px; padding: 18px 20px; background: linear-gradient(90deg, rgba(255, 85, 0, 0.02), transparent); border-left: 2px solid rgba(255, 85, 0, 0.4); border-radius: 8px;">
                                <div style="background: rgba(255, 85, 0, 0.15); color: #FF5500; width: 28px; height: 28px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 14px; flex-shrink: 0; border: 1px solid rgba(255, 85, 0, 0.3);">5</div>
                                <div style="flex: 1;">
                                    <strong style="color: #fff; font-size: 15px; display: block; margin-bottom: 5px;">Validate</strong>
                                    <span style="color: #999; font-size: 13px; line-height: 1.5;">Test your problem statement with customers and iterate based on feedback</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Real-World Examples section with GRID LAYOUT
        educationHTML += `
            <div class="education-section">
                <h2 class="section-title">
                    <span class="section-icon">💼</span>
                    Real-World Examples
                </h2>
                <div class="section-content">
                    <p style="margin-bottom: 25px; color: #ccc; line-height: 1.6;">Learn from successful companies that built billion-dollar businesses by solving clear, specific problems:</p>
                    
                    <!-- Grid layout for case studies -->
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 25px; margin-top: 20px;">
                        <!-- Slack -->
                        <div style="background: linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 15px; padding: 25px; transition: all 0.3s ease; cursor: pointer; position: relative; overflow: hidden; min-height: 280px;"
                             onmouseover="this.style.borderColor='#FF5500'; this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 30px rgba(255, 85, 0, 0.3)'"
                             onmouseout="this.style.borderColor='rgba(255, 255, 255, 0.1)'; this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                            <div style="position: absolute; top: 0; right: 0; width: 100px; height: 100px; background: radial-gradient(circle at top right, rgba(255, 85, 0, 0.2), transparent); pointer-events: none;"></div>
                            <h3 style="color: #FF5500; margin-bottom: 15px; font-size: 22px; font-weight: 700;">Slack</h3>
                            <div style="background: rgba(255, 85, 0, 0.1); border-left: 3px solid #FF5500; padding: 15px; margin-bottom: 15px; border-radius: 5px; flex: 1;">
                                <p style="color: #fff; font-weight: 600; margin-bottom: 10px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Problem Statement:</p>
                                <p style="color: #ccc; line-height: 1.7; font-size: 13px;">
                                    "Email is broken for internal team communication. Teams waste 2.5 hours per day searching through email threads, miss critical messages in overflowing inboxes, and struggle to maintain context across conversations. This costs companies $10,000+ per employee annually in lost productivity and delayed decision-making."
                                </p>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 15px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                                <span style="color: #4CAF50; font-size: 24px; font-weight: 700;">$27B</span>
                                <span style="color: #999; font-size: 13px;">Valuation</span>
                            </div>
                        </div>
                        
                        <!-- Airbnb -->
                        <div style="background: linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 15px; padding: 25px; transition: all 0.3s ease; cursor: pointer; position: relative; overflow: hidden; min-height: 280px;"
                             onmouseover="this.style.borderColor='#FF5500'; this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 30px rgba(255, 85, 0, 0.3)'"
                             onmouseout="this.style.borderColor='rgba(255, 255, 255, 0.1)'; this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                            <div style="position: absolute; top: 0; right: 0; width: 100px; height: 100px; background: radial-gradient(circle at top right, rgba(255, 85, 0, 0.2), transparent); pointer-events: none;"></div>
                            <h3 style="color: #FF5500; margin-bottom: 15px; font-size: 22px; font-weight: 700;">Airbnb</h3>
                            <div style="background: rgba(255, 85, 0, 0.1); border-left: 3px solid #FF5500; padding: 15px; margin-bottom: 15px; border-radius: 5px; flex: 1;">
                                <p style="color: #fff; font-weight: 600; margin-bottom: 10px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Problem Statement:</p>
                                <p style="color: #ccc; line-height: 1.7; font-size: 13px;">
                                    "Travelers can't find affordable accommodations in cities, while millions of homeowners have unused space. Hotels average $150/night, are impersonal, and often fully booked during peak times. Meanwhile, homeowners struggle to monetize their biggest asset, leaving $2T in global real estate value underutilized."
                                </p>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 15px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                                <span style="color: #4CAF50; font-size: 24px; font-weight: 700;">$75B</span>
                                <span style="color: #999; font-size: 13px;">Valuation</span>
                            </div>
                        </div>
                        
                        <!-- Uber -->
                        <div style="background: linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 15px; padding: 25px; transition: all 0.3s ease; cursor: pointer; position: relative; overflow: hidden; min-height: 280px;"
                             onmouseover="this.style.borderColor='#FF5500'; this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 30px rgba(255, 85, 0, 0.3)'"
                             onmouseout="this.style.borderColor='rgba(255, 255, 255, 0.1)'; this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                            <div style="position: absolute; top: 0; right: 0; width: 100px; height: 100px; background: radial-gradient(circle at top right, rgba(255, 85, 0, 0.2), transparent); pointer-events: none;"></div>
                            <h3 style="color: #FF5500; margin-bottom: 15px; font-size: 22px; font-weight: 700;">Uber</h3>
                            <div style="background: rgba(255, 85, 0, 0.1); border-left: 3px solid #FF5500; padding: 15px; margin-bottom: 15px; border-radius: 5px; flex: 1;">
                                <p style="color: #fff; font-weight: 600; margin-bottom: 10px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Problem Statement:</p>
                                <p style="color: #ccc; line-height: 1.7; font-size: 13px;">
                                    "Getting a taxi in cities is unreliable, time-consuming, and frustrating. People wait 20+ minutes without knowing arrival times, face inconsistent pricing with no transparency, and often can't find rides during peak hours or bad weather. This wastes 100+ hours annually per urban resident and limits economic mobility."
                                </p>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 15px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                                <span style="color: #4CAF50; font-size: 24px; font-weight: 700;">$95B</span>
                                <span style="color: #999; font-size: 13px;">Valuation</span>
                            </div>
                        </div>
                        
                        <!-- Stripe -->
                        <div style="background: linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 15px; padding: 25px; transition: all 0.3s ease; cursor: pointer; position: relative; overflow: hidden; min-height: 280px;"
                             onmouseover="this.style.borderColor='#FF5500'; this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 30px rgba(255, 85, 0, 0.3)'"
                             onmouseout="this.style.borderColor='rgba(255, 255, 255, 0.1)'; this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                            <div style="position: absolute; top: 0; right: 0; width: 100px; height: 100px; background: radial-gradient(circle at top right, rgba(255, 85, 0, 0.2), transparent); pointer-events: none;"></div>
                            <h3 style="color: #FF5500; margin-bottom: 15px; font-size: 22px; font-weight: 700;">Stripe</h3>
                            <div style="background: rgba(255, 85, 0, 0.1); border-left: 3px solid #FF5500; padding: 15px; margin-bottom: 15px; border-radius: 5px; flex: 1;">
                                <p style="color: #fff; font-weight: 600; margin-bottom: 10px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Problem Statement:</p>
                                <p style="color: #ccc; line-height: 1.7; font-size: 13px;">
                                    "Accepting payments online is unnecessarily complex for developers. It takes weeks to integrate payment systems, requires understanding complex financial regulations across countries, and dealing with multiple vendors for different payment methods. This delays product launches by 2-3 months and costs startups $50K+ in development time."
                                </p>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 15px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                                <span style="color: #4CAF50; font-size: 24px; font-weight: 700;">$95B</span>
                                <span style="color: #999; font-size: 13px;">Valuation</span>
                            </div>
                        </div>
                        
                        <!-- Zoom -->
                        <div style="background: linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 15px; padding: 25px; transition: all 0.3s ease; cursor: pointer; position: relative; overflow: hidden; min-height: 280px;"
                             onmouseover="this.style.borderColor='#FF5500'; this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 30px rgba(255, 85, 0, 0.3)'"
                             onmouseout="this.style.borderColor='rgba(255, 255, 255, 0.1)'; this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                            <div style="position: absolute; top: 0; right: 0; width: 100px; height: 100px; background: radial-gradient(circle at top right, rgba(255, 85, 0, 0.2), transparent); pointer-events: none;"></div>
                            <h3 style="color: #FF5500; margin-bottom: 15px; font-size: 22px; font-weight: 700;">Zoom</h3>
                            <div style="background: rgba(255, 85, 0, 0.1); border-left: 3px solid #FF5500; padding: 15px; margin-bottom: 15px; border-radius: 5px; flex: 1;">
                                <p style="color: #fff; font-weight: 600; margin-bottom: 10px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Problem Statement:</p>
                                <p style="color: #ccc; line-height: 1.7; font-size: 13px;">
                                    "Video conferencing is unreliable and complicated. Enterprise solutions require IT support, expensive hardware ($10K+ per room), and still fail 40% of the time. Remote teams waste 15 minutes per meeting troubleshooting connection issues, costing enterprises $25K per employee annually in lost productivity and missed opportunities."
                                </p>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 15px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                                <span style="color: #4CAF50; font-size: 24px; font-weight: 700;">$20B</span>
                                <span style="color: #999; font-size: 13px;">Valuation</span>
                            </div>
                        </div>
                        
                        <!-- Spotify -->
                        <div style="background: linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 15px; padding: 25px; transition: all 0.3s ease; cursor: pointer; position: relative; overflow: hidden; min-height: 280px;"
                             onmouseover="this.style.borderColor='#FF5500'; this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 30px rgba(255, 85, 0, 0.3)'"
                             onmouseout="this.style.borderColor='rgba(255, 255, 255, 0.1)'; this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                            <div style="position: absolute; top: 0; right: 0; width: 100px; height: 100px; background: radial-gradient(circle at top right, rgba(255, 85, 0, 0.2), transparent); pointer-events: none;"></div>
                            <h3 style="color: #FF5500; margin-bottom: 15px; font-size: 22px; font-weight: 700;">Spotify</h3>
                            <div style="background: rgba(255, 85, 0, 0.1); border-left: 3px solid #FF5500; padding: 15px; margin-bottom: 15px; border-radius: 5px; flex: 1;">
                                <p style="color: #fff; font-weight: 600; margin-bottom: 10px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Problem Statement:</p>
                                <p style="color: #ccc; line-height: 1.7; font-size: 13px;">
                                    "Music piracy is rampant while artists can't monetize their work effectively. Consumers resort to illegal downloads because legal options are fragmented, expensive ($15-20 per album), and inconvenient. Meanwhile, artists lose $12.5B annually to piracy, with 95% of musicians unable to make a living wage from their art."
                                </p>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 15px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                                <span style="color: #4CAF50; font-size: 24px; font-weight: 700;">$25B</span>
                                <span style="color: #999; font-size: 13px;">Valuation</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Set the content
        educationTab.innerHTML = educationHTML;
        console.log('✅ ORIGINAL EDUCATION LAYOUT RESTORED');
    }
    
    // Execute restoration
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', restoreEducation);
    } else {
        restoreEducation();
    }
    
    // Also restore when Education tab is clicked
    document.addEventListener('click', function(e) {
        if (e.target.matches('[data-tab="education"]') || e.target.closest('[data-tab="education"]')) {
            setTimeout(restoreEducation, 100);
        }
    });
    
    console.log('✅ ORIGINAL EDUCATION LAYOUT RESTORATION COMPLETE');
})();
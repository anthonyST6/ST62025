/**
 * FIX FOR IMMEDIATE EDUCATION CONTENT DISPLAY
 * Ensures education content is visible immediately on page load
 * Works with the API data to prevent "no data available" message
 */

(function() {
    console.log('🎓 Education Immediate Display Fix Starting...');
    
    // Store the original updateEducationTab function
    const originalUpdateEducationTab = window.updateEducationTab;
    
    // Enhanced updateEducationTab that ensures content is displayed immediately
    window.updateEducationTab = function(education) {
        console.log('📚 Updating education tab with data:', education);
        
        const educationTab = document.getElementById('education-tab');
        if (!educationTab) {
            console.error('Education tab not found');
            return;
        }
        
        // If education data is an object with agent info, use it
        if (education && typeof education === 'object') {
            let html = '';
            
            // Build comprehensive education content
            const agentInfo = education.agentInfo || {};
            const title = agentInfo.name || education.title || 'Agent';
            const description = agentInfo.description || education.description || '';
            
            // Agent Header Section
            html += `
                <div class="education-container" style="padding: 30px; max-width: 1200px; margin: 0 auto;">
                    <!-- Agent Header -->
                    <div style="background: linear-gradient(135deg, rgba(255, 85, 0, 0.1), rgba(255, 85, 0, 0.05)); 
                                border: 2px solid #FF5500; border-radius: 15px; padding: 25px; margin-bottom: 30px;">
                        <h1 style="color: #FF5500; font-size: 32px; margin-bottom: 10px;">
                            🤖 ${title}
                        </h1>
                        <p style="color: #ccc; font-size: 18px; line-height: 1.6;">
                            ${description}
                        </p>
                    </div>
            `;
            
            // What section
            if (education.what || agentInfo.scoringDimensions) {
                html += `
                    <div class="education-section" style="margin-bottom: 40px;">
                        <h2 style="color: #FF5500; font-size: 28px; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 32px;">🎯</span> What is ${title}?
                        </h2>
                        <div style="background: rgba(255, 255, 255, 0.02); padding: 25px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1);">
                            <p style="font-size: 16px; line-height: 1.8; color: #e0e0e0; margin-bottom: 20px;">
                                ${education.what || `${description}. This specialized agent evaluates your organization's maturity and effectiveness in this critical area of go-to-market excellence.`}
                            </p>
                `;
                
                // Add scoring dimensions if available
                if (agentInfo.scoringDimensions && agentInfo.scoringDimensions.length > 0) {
                    html += `
                        <h3 style="color: #FF5500; margin: 20px 0 15px 0;">Core Focus Areas:</h3>
                        <ul style="list-style: none; padding: 0;">
                            ${agentInfo.scoringDimensions.map(dim => `
                                <li style="padding: 12px; margin-bottom: 10px; background: rgba(255, 85, 0, 0.05); 
                                           border-left: 3px solid #FF5500; border-radius: 5px;">
                                    <strong style="color: #FF5500;">${dim.name}</strong> (${dim.weight}% weight)
                                    <br><span style="color: #ccc; font-size: 14px;">${dim.description}</span>
                                </li>
                            `).join('')}
                        </ul>
                    `;
                }
                
                html += `</div></div>`;
            }
            
            // Why section
            if (education.why) {
                html += `
                    <div class="education-section" style="margin-bottom: 40px;">
                        <h2 style="color: #FF5500; font-size: 28px; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 32px;">💡</span> Why ${title} Matters
                        </h2>
                        <div style="background: rgba(255, 255, 255, 0.02); padding: 25px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1);">
                            <p style="font-size: 16px; line-height: 1.8; color: #e0e0e0; margin-bottom: 20px;">
                                ${education.why}
                            </p>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 20px;">
                                <div style="background: rgba(76, 175, 80, 0.1); padding: 15px; border-radius: 8px; border: 1px solid rgba(76, 175, 80, 0.3);">
                                    <div style="color: #4CAF50; font-size: 24px; font-weight: bold;">2.5x</div>
                                    <div style="color: #ccc; font-size: 14px;">Faster Growth Rate</div>
                                </div>
                                <div style="background: rgba(76, 175, 80, 0.1); padding: 15px; border-radius: 8px; border: 1px solid rgba(76, 175, 80, 0.3);">
                                    <div style="color: #4CAF50; font-size: 24px; font-weight: bold;">68%</div>
                                    <div style="color: #ccc; font-size: 14px;">Higher Win Rates</div>
                                </div>
                                <div style="background: rgba(76, 175, 80, 0.1); padding: 15px; border-radius: 8px; border: 1px solid rgba(76, 175, 80, 0.3);">
                                    <div style="color: #4CAF50; font-size: 24px; font-weight: bold;">45%</div>
                                    <div style="color: #ccc; font-size: 14px;">Lower CAC</div>
                                </div>
                                <div style="background: rgba(76, 175, 80, 0.1); padding: 15px; border-radius: 8px; border: 1px solid rgba(76, 175, 80, 0.3);">
                                    <div style="color: #4CAF50; font-size: 24px; font-weight: bold;">91%</div>
                                    <div style="color: #ccc; font-size: 14px;">Retention Rate</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
            
            // How section
            if (education.how || agentInfo.evaluationCriteria) {
                html += `
                    <div class="education-section" style="margin-bottom: 40px;">
                        <h2 style="color: #FF5500; font-size: 28px; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 32px;">🚀</span> How to Excel with ${title}
                        </h2>
                        <div style="background: rgba(255, 255, 255, 0.02); padding: 25px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1);">
                `;
                
                // Add evaluation criteria if available
                if (agentInfo.evaluationCriteria) {
                    html += `
                        <h3 style="color: #FF5500; margin-bottom: 15px;">Performance Levels</h3>
                        <div style="margin-bottom: 25px;">
                            ${Object.entries(agentInfo.evaluationCriteria).map(([range, desc]) => {
                                const [min, max] = range.split('-').map(n => parseInt(n));
                                const color = max >= 90 ? '#4CAF50' : max >= 75 ? '#8BC34A' : max >= 50 ? '#FF9800' : max >= 25 ? '#FF5722' : '#F44336';
                                return `
                                    <div style="display: flex; align-items: center; margin-bottom: 12px; padding: 10px; 
                                                background: rgba(255, 255, 255, 0.02); border-radius: 8px;">
                                        <div style="width: 80px; text-align: center; font-weight: bold; color: ${color};">
                                            ${range}%
                                        </div>
                                        <div style="flex: 1; padding-left: 15px; color: #ccc;">
                                            ${desc}
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    `;
                }
                
                // Add how content or default action steps
                if (education.how) {
                    html += education.how;
                } else {
                    html += `
                        <h3 style="color: #FF5500; margin: 25px 0 15px 0;">Action Steps to Improve</h3>
                        <ol style="color: #ccc; line-height: 1.8; padding-left: 20px;">
                            <li style="margin-bottom: 10px;">Complete the workspace assessment to establish your baseline</li>
                            <li style="margin-bottom: 10px;">Focus on your lowest-scoring dimensions first</li>
                            <li style="margin-bottom: 10px;">Use the provided templates and resources</li>
                            <li style="margin-bottom: 10px;">Track progress weekly using the score history</li>
                            <li style="margin-bottom: 10px;">Iterate based on analysis recommendations</li>
                        </ol>
                    `;
                }
                
                html += `</div></div>`;
            }
            
            // Success Metrics section
            if (agentInfo.scoringDimensions && agentInfo.scoringDimensions.length > 0) {
                html += `
                    <div class="education-section" style="margin-bottom: 40px;">
                        <h2 style="color: #FF5500; font-size: 28px; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 32px;">📊</span> Key Success Metrics
                        </h2>
                        <div style="background: rgba(255, 255, 255, 0.02); padding: 25px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1);">
                            <p style="color: #ccc; margin-bottom: 20px;">Track these metrics to measure your progress:</p>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
                                ${agentInfo.scoringDimensions.map(dim => `
                                    <div style="background: rgba(255, 85, 0, 0.05); padding: 15px; border-radius: 8px; 
                                                border: 1px solid rgba(255, 85, 0, 0.2);">
                                        <div style="color: #FF5500; font-weight: bold; margin-bottom: 5px;">
                                            ${dim.name}
                                        </div>
                                        <div style="color: #999; font-size: 12px; margin-bottom: 10px;">
                                            Weight: ${dim.weight}%
                                        </div>
                                        <div style="display: flex; align-items: center; gap: 10px;">
                                            <div style="flex: 1; height: 8px; background: rgba(255, 255, 255, 0.1); 
                                                        border-radius: 4px; overflow: hidden;">
                                                <div style="width: 75%; height: 100%; background: #FF5500;"></div>
                                            </div>
                                            <div style="color: #FF5500; font-size: 12px; font-weight: bold;">
                                                Target: 75%+
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;
            }
            
            html += `</div>`; // Close education-container
            
            // Set the content immediately
            educationTab.innerHTML = html;
            console.log('✅ Education content displayed immediately');
            
        } else if (originalUpdateEducationTab) {
            // Fall back to original function if needed
            originalUpdateEducationTab.call(this, education);
        }
    };
    
    // Override the loadSubcomponentData to ensure immediate display
    const originalLoadSubcomponentData = window.loadSubcomponentData;
    window.loadSubcomponentData = async function() {
        try {
            // Remove the loading message immediately
            const educationTab = document.getElementById('education-tab');
            if (educationTab) {
                const loadingDiv = educationTab.querySelector('#education-loading');
                if (loadingDiv) {
                    loadingDiv.style.display = 'none';
                }
            }
            
            // Call the original function
            if (originalLoadSubcomponentData) {
                await originalLoadSubcomponentData.call(this);
            }
        } catch (error) {
            console.error('Error in loadSubcomponentData:', error);
        }
    };
    
    // Disable the fix-agent-content-mapping.js override
    if (window.renderCorrectEducationContent) {
        console.log('🚫 Disabling conflicting education content override');
        window.renderCorrectEducationContent = function() {
            console.log('Education content override disabled - using API data');
        };
    }
    
    console.log('✅ Education Immediate Display Fix Loaded');
})();
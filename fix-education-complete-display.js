/**
 * COMPLETE FIX FOR EDUCATION CONTENT DISPLAY
 * Ensures ALL education sections are displayed with full content
 * Follows the proper layout structure with all required sections
 */

(function() {
    console.log('🎓 Complete Education Display Fix Starting...');
    
    // Store the original updateEducationTab function
    const originalUpdateEducationTab = window.updateEducationTab;
    
    // Enhanced updateEducationTab that ensures ALL content is displayed
    window.updateEducationTab = function(education) {
        console.log('📚 Updating education tab with complete content:', education);
        
        const educationTab = document.getElementById('education-tab');
        if (!educationTab) {
            console.error('Education tab not found');
            return;
        }
        
        // Build COMPLETE education content with ALL sections
        if (education && typeof education === 'object') {
            const agentInfo = education.agentInfo || {};
            const title = agentInfo.name || education.title || 'Agent';
            const description = agentInfo.role || agentInfo.description || education.what || '';
            const scoringDimensions = agentInfo.dimensions || agentInfo.scoringDimensions || [];
            const evaluationCriteria = agentInfo.criteria || agentInfo.evaluationCriteria || {};
            
            // Build comprehensive HTML with ALL sections
            let html = `
                <div class="education-container" style="padding: 30px; max-width: 1200px; margin: 0 auto;">
                    
                    <!-- Agent Header Section -->
                    <div class="education-section" style="background: linear-gradient(135deg, rgba(255, 85, 0, 0.1), rgba(255, 85, 0, 0.05)); 
                                border: 2px solid #FF5500; border-radius: 15px; padding: 30px; margin-bottom: 40px;">
                        <h1 style="color: #FF5500; font-size: 36px; margin-bottom: 15px; display: flex; align-items: center; gap: 15px;">
                            <span style="font-size: 42px;">🤖</span> ${title}
                        </h1>
                        <p style="color: #e0e0e0; font-size: 18px; line-height: 1.8;">
                            ${description}
                        </p>
                    </div>
                    
                    <!-- What Section with Core Focus Areas -->
                    <div class="education-section" style="margin-bottom: 40px;">
                        <h2 style="color: #FF5500; font-size: 30px; margin-bottom: 25px; display: flex; align-items: center; gap: 12px;">
                            <span style="font-size: 36px;">🎯</span> What is ${title}?
                        </h2>
                        <div style="background: rgba(255, 255, 255, 0.03); padding: 30px; border-radius: 15px; 
                                    border: 1px solid rgba(255, 255, 255, 0.1);">
                            <p style="font-size: 17px; line-height: 1.9; color: #e0e0e0; margin-bottom: 25px;">
                                ${education.what || `${title} is a specialized agent that ${description}. This agent evaluates your organization's maturity and effectiveness in this critical area of go-to-market excellence.`}
                            </p>
                            
                            ${scoringDimensions.length > 0 ? `
                                <h3 style="color: #FF5500; font-size: 20px; margin: 30px 0 20px 0; 
                                           border-bottom: 1px solid rgba(255, 85, 0, 0.3); padding-bottom: 10px;">
                                    Core Focus Areas:
                                </h3>
                                <div style="display: grid; gap: 15px;">
                                    ${scoringDimensions.map(dim => `
                                        <div style="padding: 18px; background: rgba(255, 85, 0, 0.08); 
                                                    border-left: 4px solid #FF5500; border-radius: 8px;
                                                    transition: all 0.3s ease;">
                                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                                                <strong style="color: #FF5500; font-size: 16px;">${dim.name}</strong>
                                                <span style="background: rgba(255, 85, 0, 0.2); color: #FF5500; 
                                                             padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 600;">
                                                    ${dim.weight}% weight
                                                </span>
                                            </div>
                                            <p style="color: #ccc; font-size: 14px; line-height: 1.6; margin: 0;">
                                                ${dim.description}
                                            </p>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <!-- Why It Matters Section with Impact Metrics -->
                    <div class="education-section" style="margin-bottom: 40px;">
                        <h2 style="color: #FF5500; font-size: 30px; margin-bottom: 25px; display: flex; align-items: center; gap: 12px;">
                            <span style="font-size: 36px;">💡</span> Why ${title} Matters
                        </h2>
                        <div style="background: rgba(255, 255, 255, 0.03); padding: 30px; border-radius: 15px;
                                    border: 1px solid rgba(255, 255, 255, 0.1);">
                            <p style="font-size: 17px; line-height: 1.9; color: #e0e0e0; margin-bottom: 30px;">
                                ${education.why || `Excellence in this area directly impacts your ability to scale efficiently and win in the market. Organizations that master these capabilities see significant improvements across all key metrics.`}
                            </p>
                            
                            ${education.keyMetrics && education.keyMetrics.length > 0 ? `
                                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px;">
                                    ${education.keyMetrics.map(metric => `
                                        <div style="background: linear-gradient(135deg, rgba(76, 175, 80, 0.15), rgba(76, 175, 80, 0.05));
                                                    padding: 20px; border-radius: 12px; border: 1px solid rgba(76, 175, 80, 0.3);
                                                    text-align: center; transition: transform 0.3s ease;"
                                             onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 30px rgba(76, 175, 80, 0.3)';"
                                             onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
                                            <div style="color: #4CAF50; font-size: 32px; font-weight: bold; margin-bottom: 8px;">${metric.value}</div>
                                            <div style="color: #e0e0e0; font-size: 14px; font-weight: 500; margin-bottom: 5px;">${metric.label}</div>
                                            ${metric.description ? `<div style="color: #999; font-size: 12px;">${metric.description}</div>` : ''}
                                        </div>
                                    `).join('')}
                                </div>
                            ` : `
                                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px;">
                                    <div style="background: linear-gradient(135deg, rgba(76, 175, 80, 0.15), rgba(76, 175, 80, 0.05));
                                                padding: 20px; border-radius: 12px; border: 1px solid rgba(76, 175, 80, 0.3);
                                                text-align: center; transition: transform 0.3s ease;">
                                        <div style="color: #4CAF50; font-size: 32px; font-weight: bold; margin-bottom: 8px;">2.5x</div>
                                        <div style="color: #e0e0e0; font-size: 14px; font-weight: 500;">Faster Growth Rate</div>
                                    </div>
                                    <div style="background: linear-gradient(135deg, rgba(76, 175, 80, 0.15), rgba(76, 175, 80, 0.05));
                                                padding: 20px; border-radius: 12px; border: 1px solid rgba(76, 175, 80, 0.3);
                                                text-align: center; transition: transform 0.3s ease;">
                                        <div style="color: #4CAF50; font-size: 32px; font-weight: bold; margin-bottom: 8px;">68%</div>
                                        <div style="color: #e0e0e0; font-size: 14px; font-weight: 500;">Higher Win Rates</div>
                                    </div>
                                    <div style="background: linear-gradient(135deg, rgba(76, 175, 80, 0.15), rgba(76, 175, 80, 0.05));
                                                padding: 20px; border-radius: 12px; border: 1px solid rgba(76, 175, 80, 0.3);
                                                text-align: center; transition: transform 0.3s ease;">
                                        <div style="color: #4CAF50; font-size: 32px; font-weight: bold; margin-bottom: 8px;">45%</div>
                                        <div style="color: #e0e0e0; font-size: 14px; font-weight: 500;">Lower CAC</div>
                                    </div>
                                    <div style="background: linear-gradient(135deg, rgba(76, 175, 80, 0.15), rgba(76, 175, 80, 0.05));
                                                padding: 20px; border-radius: 12px; border: 1px solid rgba(76, 175, 80, 0.3);
                                                text-align: center; transition: transform 0.3s ease;">
                                        <div style="color: #4CAF50; font-size: 32px; font-weight: bold; margin-bottom: 8px;">91%</div>
                                        <div style="color: #e0e0e0; font-size: 14px; font-weight: 500;">Retention Rate</div>
                                    </div>
                                </div>
                            `}
                        </div>
                    </div>
                    
                    <!-- How to Excel Section with Performance Levels -->
                    <div class="education-section" style="margin-bottom: 40px;">
                        <h2 style="color: #FF5500; font-size: 30px; margin-bottom: 25px; display: flex; align-items: center; gap: 12px;">
                            <span style="font-size: 36px;">🚀</span> How to Excel with ${title}
                        </h2>
                        <div style="background: rgba(255, 255, 255, 0.03); padding: 30px; border-radius: 15px; 
                                    border: 1px solid rgba(255, 255, 255, 0.1);">
                            
                            ${Object.keys(evaluationCriteria).length > 0 ? `
                                <h3 style="color: #FF5500; font-size: 20px; margin-bottom: 20px;">Performance Levels</h3>
                                <div style="margin-bottom: 30px;">
                                    ${Object.entries(evaluationCriteria).map(([range, desc]) => {
                                        const [min, max] = range.split('-').map(n => parseInt(n));
                                        const color = max >= 90 ? '#4CAF50' : max >= 75 ? '#8BC34A' : max >= 50 ? '#FF9800' : max >= 25 ? '#FF5722' : '#F44336';
                                        const bgColor = max >= 90 ? 'rgba(76, 175, 80, 0.1)' : max >= 75 ? 'rgba(139, 195, 74, 0.1)' : 
                                                       max >= 50 ? 'rgba(255, 152, 0, 0.1)' : max >= 25 ? 'rgba(255, 87, 34, 0.1)' : 'rgba(244, 67, 54, 0.1)';
                                        return `
                                            <div style="display: flex; align-items: center; margin-bottom: 15px; padding: 15px; 
                                                        background: ${bgColor}; border-radius: 10px; border-left: 4px solid ${color};">
                                                <div style="width: 100px; text-align: center; font-weight: bold; color: ${color}; font-size: 18px;">
                                                    ${range}%
                                                </div>
                                                <div style="flex: 1; padding-left: 20px; color: #e0e0e0; font-size: 15px;">
                                                    ${desc}
                                                </div>
                                            </div>
                                        `;
                                    }).join('')}
                                </div>
                            ` : ''}
                            
                            <h3 style="color: #FF5500; font-size: 20px; margin: 30px 0 20px 0;">Action Steps to Improve</h3>
                            <ol style="color: #e0e0e0; line-height: 2; padding-left: 25px; font-size: 15px;">
                                <li style="margin-bottom: 12px;">Complete the workspace assessment to establish your baseline</li>
                                <li style="margin-bottom: 12px;">Focus on your lowest-scoring dimensions first</li>
                                <li style="margin-bottom: 12px;">Use the provided templates and resources</li>
                                <li style="margin-bottom: 12px;">Track progress weekly using the score history</li>
                                <li style="margin-bottom: 12px;">Iterate based on analysis recommendations</li>
                            </ol>
                            
                            ${education.how ? `
                                <div style="margin-top: 30px; padding: 20px; background: rgba(255, 85, 0, 0.05); 
                                            border-radius: 10px; border: 1px solid rgba(255, 85, 0, 0.2);">
                                    <h4 style="color: #FF5500; margin-bottom: 15px;">Implementation Guide</h4>
                                    <div style="color: #e0e0e0; line-height: 1.8;">
                                        ${education.how}
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <!-- Key Success Metrics Section -->
                    ${scoringDimensions.length > 0 ? `
                        <div class="education-section" style="margin-bottom: 40px;">
                            <h2 style="color: #FF5500; font-size: 30px; margin-bottom: 25px; display: flex; align-items: center; gap: 12px;">
                                <span style="font-size: 36px;">📊</span> Key Success Metrics
                            </h2>
                            <div style="background: rgba(255, 255, 255, 0.03); padding: 30px; border-radius: 15px; 
                                        border: 1px solid rgba(255, 255, 255, 0.1);">
                                <p style="color: #e0e0e0; margin-bottom: 25px; font-size: 16px; line-height: 1.8;">
                                    Track these metrics to measure your progress and ensure continuous improvement:
                                </p>
                                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                                    ${scoringDimensions.map(dim => `
                                        <div style="background: rgba(255, 85, 0, 0.08); padding: 20px; border-radius: 12px; 
                                                    border: 1px solid rgba(255, 85, 0, 0.3); position: relative; overflow: hidden;">
                                            <div style="position: absolute; top: 0; right: 0; background: #FF5500; 
                                                        padding: 5px 15px; border-radius: 0 0 0 12px; font-size: 12px; 
                                                        font-weight: bold; color: #000;">
                                                ${dim.weight}%
                                            </div>
                                            <div style="color: #FF5500; font-weight: bold; margin-bottom: 10px; font-size: 17px;">
                                                ${dim.name}
                                            </div>
                                            <div style="color: #ccc; font-size: 13px; margin-bottom: 15px; line-height: 1.5;">
                                                ${dim.description}
                                            </div>
                                            <div style="display: flex; align-items: center; gap: 12px;">
                                                <div style="flex: 1; height: 10px; background: rgba(255, 255, 255, 0.1); 
                                                            border-radius: 5px; overflow: hidden;">
                                                    <div style="width: 75%; height: 100%; background: linear-gradient(90deg, #FF5500, #FF8800);
                                                                border-radius: 5px;"></div>
                                                </div>
                                                <div style="color: #FF5500; font-size: 13px; font-weight: bold;">
                                                    Target: 75%+
                                                </div>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    ` : ''}
                    
                    <!-- Real-World Examples Section -->
                    ${education.examples && education.examples.length > 0 ? `
                        <div class="education-section" style="margin-bottom: 40px;">
                            <h2 style="color: #FF5500; font-size: 30px; margin-bottom: 25px; display: flex; align-items: center; gap: 12px;">
                                <span style="font-size: 36px;">💼</span> Real-World Examples
                            </h2>
                            <div style="background: rgba(255, 255, 255, 0.03); padding: 30px; border-radius: 15px; 
                                        border: 1px solid rgba(255, 255, 255, 0.1);">
                                <ul style="list-style: none; padding: 0;">
                                    ${education.examples.map((example, index) => `
                                        <li style="padding: 18px; margin-bottom: 15px; background: rgba(255, 85, 0, 0.05); 
                                                   border-left: 4px solid #FF5500; border-radius: 8px; position: relative;
                                                   padding-left: 50px;">
                                            <span style="position: absolute; left: 15px; top: 50%; transform: translateY(-50%);
                                                         width: 24px; height: 24px; background: #FF5500; border-radius: 50%;
                                                         display: flex; align-items: center; justify-content: center;
                                                         font-weight: bold; color: #000; font-size: 12px;">
                                                ${index + 1}
                                            </span>
                                            <span style="color: #e0e0e0; font-size: 15px; line-height: 1.7;">
                                                ${example}
                                            </span>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        </div>
                    ` : ''}
                    
                    <!-- Getting Started Section -->
                    <div class="education-section" style="margin-bottom: 40px;">
                        <h2 style="color: #FF5500; font-size: 30px; margin-bottom: 25px; display: flex; align-items: center; gap: 12px;">
                            <span style="font-size: 36px;">🎯</span> Getting Started
                        </h2>
                        <div style="background: linear-gradient(135deg, rgba(255, 85, 0, 0.1), rgba(255, 85, 0, 0.05)); 
                                    padding: 30px; border-radius: 15px; border: 2px solid #FF5500;">
                            <p style="color: #e0e0e0; font-size: 16px; line-height: 1.8; margin-bottom: 20px;">
                                Ready to improve your ${title} capabilities? Follow these steps:
                            </p>
                            <div style="display: grid; gap: 15px;">
                                <div style="display: flex; align-items: center; gap: 15px;">
                                    <div style="width: 40px; height: 40px; background: #FF5500; border-radius: 50%;
                                                display: flex; align-items: center; justify-content: center;
                                                font-weight: bold; color: #000; font-size: 18px;">
                                        1
                                    </div>
                                    <div style="flex: 1; color: #e0e0e0; font-size: 15px;">
                                        Click on the <strong style="color: #FF5500;">Workspace</strong> tab to begin your assessment
                                    </div>
                                </div>
                                <div style="display: flex; align-items: center; gap: 15px;">
                                    <div style="width: 40px; height: 40px; background: #FF5500; border-radius: 50%;
                                                display: flex; align-items: center; justify-content: center;
                                                font-weight: bold; color: #000; font-size: 18px;">
                                        2
                                    </div>
                                    <div style="flex: 1; color: #e0e0e0; font-size: 15px;">
                                        Complete the assessment questions with your current state
                                    </div>
                                </div>
                                <div style="display: flex; align-items: center; gap: 15px;">
                                    <div style="width: 40px; height: 40px; background: #FF5500; border-radius: 50%;
                                                display: flex; align-items: center; justify-content: center;
                                                font-weight: bold; color: #000; font-size: 18px;">
                                        3
                                    </div>
                                    <div style="flex: 1; color: #e0e0e0; font-size: 15px;">
                                        Review your <strong style="color: #FF5500;">Analysis</strong> results and recommendations
                                    </div>
                                </div>
                                <div style="display: flex; align-items: center; gap: 15px;">
                                    <div style="width: 40px; height: 40px; background: #FF5500; border-radius: 50%;
                                                display: flex; align-items: center; justify-content: center;
                                                font-weight: bold; color: #000; font-size: 18px;">
                                        4
                                    </div>
                                    <div style="flex: 1; color: #e0e0e0; font-size: 15px;">
                                        Download templates from the <strong style="color: #FF5500;">Resources</strong> tab
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            `;
            
            // Set the complete content
            educationTab.innerHTML = html;
            console.log('✅ Complete education content displayed successfully');
            
        } else if (originalUpdateEducationTab) {
            // Fall back to original function if needed
            originalUpdateEducationTab.call(this, education);
        }
    };
    
    // Override the loadSubcomponentData to ensure immediate display
    const originalLoadSubcomponentData = window.loadSubcomponentData;
    window.loadSubcomponentData = async function() {
        try {
            // Remove any loading messages immediately
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
    
    console.log('✅ Complete Education Display Fix Loaded');
})();
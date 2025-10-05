/**
 * FIX FOR AGENT CONTENT MAPPING ISSUES
 * Ensures correct agent content is displayed for each subcomponent
 * Fixes the issue where all agents show "Problem Definition Evaluator"
 */

(function() {
    console.log('🔧 AGENT CONTENT MAPPING FIX STARTING...');
    
    // Correct mapping of subcomponent IDs to agent IDs
    const SUBCOMPONENT_TO_AGENT_MAP = {
        // Block 1: Mission Discovery
        '1-1': '1a', '1-2': '1b', '1-3': '1c', '1-4': '1d', '1-5': '1e', '1-6': '1f',
        // Block 2: Customer Insights
        '2-1': '2a', '2-2': '2b', '2-3': '2c', '2-4': '2d', '2-5': '2e', '2-6': '2f',
        // Block 3: Strategic Prioritization
        '3-1': '3a', '3-2': '3b', '3-3': '3c', '3-4': '3d', '3-5': '3e', '3-6': '3f',
        // Block 4: Prototype Launch
        '4-1': '4a', '4-2': '4b', '4-3': '4c', '4-4': '4d', '4-5': '4e', '4-6': '4f',
        // Block 5: Early Adopter Wins
        '5-1': '5a', '5-2': '5b', '5-3': '5c', '5-4': '5d', '5-5': '5e', '5-6': '5f',
        // Block 6: Customer Engagement Flywheel
        '6-1': '6a', '6-2': '6b', '6-3': '6c', '6-4': '6d', '6-5': '6e', '6-6': '6f',
        // Block 7: Quantifiable Impact
        '7-1': '7a', '7-2': '7b', '7-3': '7c', '7-4': '7d', '7-5': '7e', '7-6': '7f',
        // Block 8: Customer Success Expansion
        '8-1': '8a', '8-2': '8b', '8-3': '8c', '8-4': '8d', '8-5': '8e', '8-6': '8f',
        // Block 9: Proof Execution
        '9-1': '9a', '9-2': '9b', '9-3': '9c', '9-4': '9d', '9-5': '9e', '9-6': '9f',
        // Block 10: Sales Team Empowerment
        '10-1': '10a', '10-2': '10b', '10-3': '10c', '10-4': '10d', '10-5': '10e', '10-6': '10f',
        // Block 11: High Performance Teams
        '11-1': '11a', '11-2': '11b', '11-3': '11c', '11-4': '11d', '11-5': '11e', '11-6': '11f',
        // Block 12: Retention Systems
        '12-1': '12a', '12-2': '12b', '12-3': '12c', '12-4': '12d', '12-5': '12e', '12-6': '12f',
        // Block 13: Market Domination Strategies
        '13-1': '13a', '13-2': '13b', '13-3': '13c', '13-4': '13d', '13-5': '13e', '13-6': '13f',
        // Block 14: Operational Infrastructure
        '14-1': '14a', '14-2': '14b', '14-3': '14c', '14-4': '14d', '14-5': '14e', '14-6': '14f',
        // Block 15: Leadership Expansion
        '15-1': '15a', '15-2': '15b', '15-3': '15c', '15-4': '15d', '15-5': '15e', '15-6': '15f',
        // Block 16: Global & Expansion Opportunities
        '16-1': '16a', '16-2': '16b', '16-3': '16c', '16-4': '16d', '16-5': '16e', '16-6': '16f'
    };
    
    // Get the correct agent for the current subcomponent
    function getCorrectAgent() {
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        const agentId = SUBCOMPONENT_TO_AGENT_MAP[subcomponentId];
        
        if (!agentId) {
            console.error(`No agent mapping found for subcomponent: ${subcomponentId}`);
            return null;
        }
        
        // Get agent from AgentLibrary
        if (typeof AgentLibrary !== 'undefined' && AgentLibrary[agentId]) {
            const agent = AgentLibrary[agentId];
            console.log(`✅ Found correct agent for ${subcomponentId}: ${agent.name} (${agentId})`);
            return agent;
        }
        
        console.error(`Agent not found in library: ${agentId}`);
        return null;
    }
    
    // Render education content with the CORRECT agent
    function renderCorrectEducationContent() {
        const agent = getCorrectAgent();
        if (!agent) {
            console.error('Could not determine correct agent');
            return;
        }
        
        const educationTab = document.getElementById('education-tab');
        if (!educationTab) {
            console.error('Education tab not found');
            return;
        }
        
        // Build education content specific to THIS agent
        const educationHTML = `
            <div class="education-container" style="padding: 30px; max-width: 1200px; margin: 0 auto;">
                <!-- Agent-Specific Header -->
                <div style="background: linear-gradient(135deg, rgba(255, 85, 0, 0.1), rgba(255, 85, 0, 0.05)); 
                            border: 2px solid #FF5500; border-radius: 15px; padding: 25px; margin-bottom: 30px;">
                    <h1 style="color: #FF5500; font-size: 32px; margin-bottom: 10px;">
                        🤖 ${agent.name}
                    </h1>
                    <p style="color: #ccc; font-size: 18px; line-height: 1.6;">
                        ${agent.description}
                    </p>
                </div>
                
                <!-- What Section -->
                <div class="education-section" style="margin-bottom: 40px;">
                    <h2 style="color: #FF5500; font-size: 28px; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 32px;">🎯</span> What is ${agent.name}?
                    </h2>
                    <div style="background: rgba(255, 255, 255, 0.02); padding: 25px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1);">
                        <p style="font-size: 16px; line-height: 1.8; color: #e0e0e0; margin-bottom: 20px;">
                            ${agent.description}. This specialized agent evaluates your organization's maturity and effectiveness 
                            in this critical area of go-to-market excellence.
                        </p>
                        <h3 style="color: #FF5500; margin: 20px 0 15px 0;">Core Focus Areas:</h3>
                        <ul style="list-style: none; padding: 0;">
                            ${agent.scoringDimensions.map(dim => `
                                <li style="padding: 12px; margin-bottom: 10px; background: rgba(255, 85, 0, 0.05); 
                                           border-left: 3px solid #FF5500; border-radius: 5px;">
                                    <strong style="color: #FF5500;">${dim.name}</strong> (${dim.weight}% weight)
                                    <br><span style="color: #ccc; font-size: 14px;">${dim.description}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
                
                <!-- Why It Matters -->
                <div class="education-section" style="margin-bottom: 40px;">
                    <h2 style="color: #FF5500; font-size: 28px; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 32px;">💡</span> Why ${agent.name} Matters
                    </h2>
                    <div style="background: rgba(255, 255, 255, 0.02); padding: 25px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1);">
                        <p style="font-size: 16px; line-height: 1.8; color: #e0e0e0; margin-bottom: 20px;">
                            Excellence in this area directly impacts your ability to scale efficiently and win in the market. 
                            Organizations that master these capabilities see:
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
                
                <!-- How to Excel -->
                <div class="education-section" style="margin-bottom: 40px;">
                    <h2 style="color: #FF5500; font-size: 28px; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 32px;">🚀</span> How to Excel with ${agent.name}
                    </h2>
                    <div style="background: rgba(255, 255, 255, 0.02); padding: 25px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1);">
                        <h3 style="color: #FF5500; margin-bottom: 15px;">Performance Levels</h3>
                        <div style="margin-bottom: 25px;">
                            ${Object.entries(agent.evaluationCriteria).map(([range, description]) => {
                                const [min, max] = range.split('-').map(n => parseInt(n));
                                const color = max >= 90 ? '#4CAF50' : max >= 75 ? '#8BC34A' : max >= 50 ? '#FF9800' : max >= 25 ? '#FF5722' : '#F44336';
                                return `
                                    <div style="display: flex; align-items: center; margin-bottom: 12px; padding: 10px; 
                                                background: rgba(255, 255, 255, 0.02); border-radius: 8px;">
                                        <div style="width: 80px; text-align: center; font-weight: bold; color: ${color};">
                                            ${range}%
                                        </div>
                                        <div style="flex: 1; padding-left: 15px; color: #ccc;">
                                            ${description}
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                        
                        <h3 style="color: #FF5500; margin: 25px 0 15px 0;">Action Steps to Improve</h3>
                        <ol style="color: #ccc; line-height: 1.8; padding-left: 20px;">
                            <li style="margin-bottom: 10px;">Complete the workspace assessment to establish your baseline</li>
                            <li style="margin-bottom: 10px;">Focus on your lowest-scoring dimensions first</li>
                            <li style="margin-bottom: 10px;">Use the provided templates and resources</li>
                            <li style="margin-bottom: 10px;">Track progress weekly using the score history</li>
                            <li style="margin-bottom: 10px;">Iterate based on analysis recommendations</li>
                        </ol>
                    </div>
                </div>
                
                <!-- Success Metrics -->
                <div class="education-section" style="margin-bottom: 40px;">
                    <h2 style="color: #FF5500; font-size: 28px; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 32px;">📊</span> Key Success Metrics
                    </h2>
                    <div style="background: rgba(255, 255, 255, 0.02); padding: 25px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1);">
                        <p style="color: #ccc; margin-bottom: 20px;">Track these metrics to measure your progress:</p>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
                            ${agent.scoringDimensions.map(dim => `
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
            </div>
        `;
        
        // Replace the education tab content
        educationTab.innerHTML = educationHTML;
        console.log(`✅ Education content updated for agent: ${agent.name}`);
    }
    
    // Wait for DOM and AgentLibrary to be ready
    function initializeAgentFix() {
        if (typeof AgentLibrary === 'undefined') {
            console.log('Waiting for AgentLibrary...');
            setTimeout(initializeAgentFix, 100);
            return;
        }
        
        // Apply the fix
        renderCorrectEducationContent();
        
        // Also fix when tab is clicked
        document.addEventListener('click', function(e) {
            if (e.target.closest('[data-tab="education"]')) {
                setTimeout(renderCorrectEducationContent, 50);
            }
        });
        
        // Store the correct agent globally for other scripts
        const agent = getCorrectAgent();
        if (agent) {
            window.currentAgent = agent;
            window.currentAgentId = SUBCOMPONENT_TO_AGENT_MAP[new URLSearchParams(window.location.search).get('id') || '1-1'];
            console.log(`✅ Agent stored globally: ${agent.name}`);
        }
    }
    
    // Start the fix
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeAgentFix);
    } else {
        initializeAgentFix();
    }
    
    console.log('🔧 AGENT CONTENT MAPPING FIX LOADED');
})();
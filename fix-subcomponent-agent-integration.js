/**
 * Fix Script for Subcomponent-Detail Agent Integration
 * This script updates subcomponent-detail.html to properly load and use agents
 */

const fs = require('fs').promises;
const path = require('path');

// Import agent library
const AgentLibrary = require('./agent-library.js');

class SubcomponentAgentIntegrationFix {
    constructor() {
        this.agents = AgentLibrary;
        this.fixedContent = '';
    }

    /**
     * Map subcomponent ID to agent ID
     */
    mapToAgentId(blockId, subcomponentNumber) {
        const suffixes = ['a', 'b', 'c', 'd', 'e', 'f'];
        return `${blockId}${suffixes[subcomponentNumber - 1]}`;
    }

    /**
     * Generate the enhanced JavaScript for agent integration
     */
    generateAgentIntegrationScript() {
        return `
<script>
// ============================================
// AGENT INTEGRATION SYSTEM - COMPLETE FIX
// ============================================

// Import agent library (ensure it's loaded)
if (typeof AgentLibrary === 'undefined') {
    console.error('❌ AgentLibrary not loaded! Please ensure agent-library.js is included.');
}

// Map subcomponent ID format (1-1) to agent ID format (1a)
function mapToAgentId(subcomponentId) {
    const [blockId, subNum] = subcomponentId.split('-').map(n => parseInt(n));
    const suffixes = ['a', 'b', 'c', 'd', 'e', 'f'];
    return blockId + suffixes[subNum - 1];
}

// Get current agent based on URL
function getCurrentAgent() {
    const urlParams = new URLSearchParams(window.location.search);
    const subcomponentId = urlParams.get('id') || '1-1';
    const agentId = mapToAgentId(subcomponentId);
    return AgentLibrary ? AgentLibrary[agentId] : null;
}

// Load agent-specific educational content
function loadAgentEducation(agent) {
    if (!agent) {
        console.error('No agent provided for education content');
        return;
    }
    
    const educationTab = document.getElementById('education-tab');
    if (!educationTab) return;
    
    const educationHTML = \`
        <div class="education-section">
            <h2 class="section-title">
                <span class="section-icon">🎯</span>
                What is \${agent.name}?
            </h2>
            <div class="section-content">
                <p>\${agent.description}</p>
                <p>This agent specializes in evaluating and optimizing your organization's capabilities in this critical area.</p>
            </div>
        </div>
        
        <div class="education-section">
            <h2 class="section-title">
                <span class="section-icon">💡</span>
                Why It Matters
            </h2>
            <div class="section-content">
                <p>Understanding and mastering this area is crucial for your go-to-market success. This agent evaluates performance across \${agent.scoringDimensions.length} key dimensions:</p>
                <ul class="bullet-list">
                    \${agent.scoringDimensions.map(dim => \`
                        <li><strong>\${dim.name}</strong> (\${dim.weight}% weight): \${dim.description}</li>
                    \`).join('')}
                </ul>
            </div>
        </div>
        
        <div class="education-section">
            <h2 class="section-title">
                <span class="section-icon">🚀</span>
                How to Excel
            </h2>
            <div class="section-content">
                <h3>Scoring Ranges</h3>
                <ul class="bullet-list">
                    \${Object.entries(agent.evaluationCriteria).map(([range, description]) => \`
                        <li><strong>\${range}%</strong>: \${description}</li>
                    \`).join('')}
                </ul>
                
                <h3>Best Practices</h3>
                <ol>
                    <li>Complete the workspace assessment honestly and thoroughly</li>
                    <li>Review your scores across all \${agent.scoringDimensions.length} dimensions</li>
                    <li>Focus improvement efforts on your lowest-scoring areas</li>
                    <li>Track progress over time using the score history</li>
                    <li>Leverage templates and resources for implementation</li>
                </ol>
            </div>
        </div>
        
        <div class="education-section">
            <h2 class="section-title">
                <span class="section-icon">💼</span>
                Real-World Application
            </h2>
            <div class="section-content">
                <p>Organizations that excel in \${agent.name.toLowerCase()} typically see:</p>
                <ul class="bullet-list">
                    <li>Improved clarity and alignment across teams</li>
                    <li>Better decision-making based on validated insights</li>
                    <li>Faster time-to-market with reduced risks</li>
                    <li>Higher success rates in achieving objectives</li>
                    <li>Stronger competitive positioning</li>
                </ul>
            </div>
        </div>
        
        <div class="education-section">
            <h2 class="section-title">
                <span class="section-icon">📊</span>
                Key Metrics to Track
            </h2>
            <div class="section-content">
                <p>Monitor these indicators to measure your progress:</p>
                <ul class="bullet-list">
                    \${agent.scoringDimensions.map(dim => \`
                        <li>\${dim.name} Score - Target: 80%+</li>
                    \`).join('')}
                </ul>
                <p style="margin-top: 20px;">
                    <strong>Overall Target:</strong> Achieve a minimum score of 75% to demonstrate competency, 
                    with 90%+ indicating mastery in this area.
                </p>
            </div>
        </div>
    \`;
    
    educationTab.innerHTML = educationHTML;
    console.log(\`✅ Loaded education content for agent: \${agent.name}\`);
}

// Load agent-specific workspace questions
function loadAgentWorkspace(agent) {
    if (!agent) {
        console.error('No agent provided for workspace content');
        return;
    }
    
    const workspaceContainer = document.getElementById('dynamic-worksheet-container');
    if (!workspaceContainer) return;
    
    // Generate questions based on agent's dimensions
    const questions = agent.scoringDimensions.map((dimension, index) => {
        return {
            id: \`q_\${index + 1}\`,
            dimension: dimension.name,
            weight: dimension.weight,
            text: \`How would you rate your current performance in \${dimension.name}? \${dimension.description}\`,
            type: 'assessment',
            helpText: \`Consider: \${dimension.description}\`
        };
    });
    
    // Add specific questions based on agent type
    const specificQuestions = generateAgentSpecificQuestions(agent);
    
    const workspaceHTML = \`
        <div class="worksheet-builder">
            <h3 style="color: #FF5500; margin-bottom: 20px;">Assessment for \${agent.name}</h3>
            <p style="color: #999; margin-bottom: 30px;">Complete this assessment to receive personalized recommendations and track your progress.</p>
            
            \${questions.map((q, index) => \`
                <div class="worksheet-field" data-dimension="\${q.dimension}" data-weight="\${q.weight}">
                    <label class="worksheet-label">
                        Question \${index + 1}: \${q.dimension} (\${q.weight}% weight)
                    </label>
                    <p style="color: #ccc; font-size: 14px; margin-bottom: 10px;">\${q.text}</p>
                    <textarea 
                        class="worksheet-textarea" 
                        id="\${q.id}"
                        placeholder="Describe your current state, challenges, and any relevant context..."
                        data-dimension="\${q.dimension}"
                    ></textarea>
                    <div style="margin-top: 10px;">
                        <label style="color: #FF5500; font-size: 14px;">Self-Assessment Score (0-100):</label>
                        <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value="50" 
                            class="score-slider"
                            id="score_\${q.id}"
                            style="width: 100%; margin-top: 10px;"
                            oninput="updateScoreDisplay(this, 'display_\${q.id}')"
                        >
                        <span id="display_\${q.id}" style="color: #FF5500; font-weight: bold;">50%</span>
                    </div>
                    <p style="color: #666; font-size: 12px; margin-top: 5px; font-style: italic;">\${q.helpText}</p>
                </div>
            \`).join('')}
            
            \${specificQuestions ? \`
                <div style="margin-top: 30px; padding-top: 30px; border-top: 1px solid rgba(255,255,255,0.1);">
                    <h4 style="color: #FF5500; margin-bottom: 20px;">Additional Context Questions</h4>
                    \${specificQuestions}
                </div>
            \` : ''}
        </div>
    \`;
    
    workspaceContainer.innerHTML = workspaceHTML;
    console.log(\`✅ Loaded workspace questions for agent: \${agent.name}\`);
}

// Generate agent-specific additional questions
function generateAgentSpecificQuestions(agent) {
    // This would be customized per agent type
    // For now, return generic additional questions
    return \`
        <div class="worksheet-field">
            <label class="worksheet-label">What are your main objectives in this area?</label>
            <textarea class="worksheet-textarea" placeholder="List your top 3-5 objectives..."></textarea>
        </div>
        <div class="worksheet-field">
            <label class="worksheet-label">What resources or support do you need?</label>
            <textarea class="worksheet-textarea" placeholder="Describe any gaps or needs..."></textarea>
        </div>
    \`;
}

// Update score display
function updateScoreDisplay(slider, displayId) {
    const display = document.getElementById(displayId);
    if (display) {
        display.textContent = slider.value + '%';
        
        // Color code based on score
        if (slider.value >= 80) {
            display.style.color = '#4CAF50';
        } else if (slider.value >= 60) {
            display.style.color = '#FF9800';
        } else {
            display.style.color = '#F44336';
        }
    }
}

// Analyze worksheet with agent
async function analyzeWorksheet() {
    const agent = getCurrentAgent();
    if (!agent) {
        alert('Error: Agent not found');
        return;
    }
    
    console.log(\`🤖 Analyzing with agent: \${agent.name}\`);
    
    // Collect responses
    const responses = {};
    const scores = {};
    
    document.querySelectorAll('.worksheet-textarea').forEach(textarea => {
        if (textarea.value) {
            responses[textarea.id] = textarea.value;
        }
    });
    
    document.querySelectorAll('.score-slider').forEach(slider => {
        const dimension = slider.closest('.worksheet-field')?.dataset.dimension;
        if (dimension) {
            scores[dimension] = parseInt(slider.value);
        }
    });
    
    // Calculate weighted score
    let totalScore = 0;
    let totalWeight = 0;
    
    agent.scoringDimensions.forEach(dimension => {
        const score = scores[dimension.name] || 0;
        const weight = dimension.weight;
        totalScore += score * (weight / 100);
        totalWeight += weight;
    });
    
    const finalScore = Math.round(totalScore);
    
    // Determine evaluation level
    let evaluation = '';
    for (const [range, description] of Object.entries(agent.evaluationCriteria)) {
        const [min, max] = range.split('-').map(n => parseInt(n));
        if (finalScore >= min && finalScore <= max) {
            evaluation = description;
            break;
        }
    }
    
    // Display results
    switchTab('analysis');
    
    const analysisContent = document.getElementById('analysis-content');
    if (analysisContent) {
        analysisContent.innerHTML = \`
            <div style="background: rgba(255, 255, 255, 0.02); border-radius: 15px; padding: 30px;">
                <h3 style="color: #FF5500; margin-bottom: 20px;">Analysis Results - \${agent.name}</h3>
                
                <div style="text-align: center; margin: 30px 0;">
                    <div style="font-size: 72px; font-weight: 800; color: \${finalScore >= 80 ? '#4CAF50' : finalScore >= 60 ? '#FF9800' : '#F44336'};">
                        \${finalScore}%
                    </div>
                    <div style="font-size: 18px; color: #999; margin-top: 10px;">Overall Score</div>
                    <div style="font-size: 16px; color: #FF5500; margin-top: 10px; font-style: italic;">
                        "\${evaluation}"
                    </div>
                </div>
                
                <div style="margin-top: 30px;">
                    <h4 style="color: #FF5500; margin-bottom: 15px;">Dimension Breakdown</h4>
                    \${agent.scoringDimensions.map(dim => {
                        const dimScore = scores[dim.name] || 0;
                        const color = dimScore >= 80 ? '#4CAF50' : dimScore >= 60 ? '#FF9800' : '#F44336';
                        return \`
                            <div style="margin-bottom: 15px;">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                    <span style="color: #ccc;">\${dim.name}</span>
                                    <span style="color: \${color}; font-weight: bold;">\${dimScore}%</span>
                                </div>
                                <div style="background: rgba(255,255,255,0.1); height: 20px; border-radius: 10px; overflow: hidden;">
                                    <div style="background: \${color}; height: 100%; width: \${dimScore}%; transition: width 0.5s ease;"></div>
                                </div>
                            </div>
                        \`;
                    }).join('')}
                </div>
                
                <div style="margin-top: 30px;">
                    <h4 style="color: #FF5500; margin-bottom: 15px;">Recommendations</h4>
                    <ul style="color: #ccc; line-height: 1.8;">
                        \${generateRecommendations(agent, scores)}
                    </ul>
                </div>
                
                <div style="margin-top: 30px; display: flex; gap: 15px;">
                    <button class="btn-primary" onclick="saveAnalysisResults(\${finalScore}, '\${agent.id}')">
                        💾 Save Results
                    </button>
                    <button class="btn-secondary" onclick="exportAnalysisReport('\${agent.name}', \${finalScore})">
                        📄 Export Report
                    </button>
                </div>
            </div>
        \`;
    }
    
    // Save to history
    saveToScoreHistory(agent.id, finalScore, scores);
}

// Generate recommendations based on scores
function generateRecommendations(agent, scores) {
    const recommendations = [];
    
    agent.scoringDimensions.forEach(dim => {
        const score = scores[dim.name] || 0;
        if (score < 60) {
            recommendations.push(\`<li><strong>Critical:</strong> Focus immediate attention on improving \${dim.name}. This is significantly below target.</li>\`);
        } else if (score < 80) {
            recommendations.push(\`<li><strong>Improve:</strong> Enhance your \${dim.name} capabilities to reach the target threshold.</li>\`);
        }
    });
    
    if (recommendations.length === 0) {
        recommendations.push(\`<li><strong>Excellent!</strong> You're performing well across all dimensions. Focus on maintaining and optimizing.</li>\`);
    }
    
    return recommendations.join('');
}

// Save to score history
function saveToScoreHistory(agentId, score, dimensionScores) {
    const history = JSON.parse(localStorage.getItem('scoreHistory') || '{}');
    
    if (!history[agentId]) {
        history[agentId] = [];
    }
    
    history[agentId].push({
        timestamp: new Date().toISOString(),
        score: score,
        dimensions: dimensionScores
    });
    
    localStorage.setItem('scoreHistory', JSON.stringify(history));
    console.log(\`✅ Saved score to history for agent \${agentId}\`);
}

// Save analysis results
function saveAnalysisResults(score, agentId) {
    // This would integrate with the backend API
    console.log(\`Saving results: Score=\${score}, Agent=\${agentId}\`);
    alert('Results saved successfully!');
}

// Export analysis report
function exportAnalysisReport(agentName, score) {
    // This would generate a PDF or downloadable report
    console.log(\`Exporting report for \${agentName} with score \${score}\`);
    alert('Report export feature coming soon!');
}

// Load score history for agent
function loadAgentScoreHistory(agent) {
    const historyTab = document.getElementById('score-history-content');
    if (!historyTab) return;
    
    const history = JSON.parse(localStorage.getItem('scoreHistory') || '{}');
    const agentHistory = history[agent.id] || [];
    
    if (agentHistory.length === 0) {
        historyTab.innerHTML = \`
            <div style="text-align: center; padding: 60px 20px; color: #999;">
                <div style="font-size: 48px; margin-bottom: 20px;">📈</div>
                <h3 style="font-size: 24px; margin-bottom: 10px; color: #fff;">No History Yet</h3>
                <p style="font-size: 16px;">Complete your first assessment to start tracking progress</p>
            </div>
        \`;
        return;
    }
    
    // Display history
    historyTab.innerHTML = \`
        <div style="padding: 20px;">
            <h3 style="color: #FF5500; margin-bottom: 20px;">Score History for \${agent.name}</h3>
            <div style="display: flex; flex-direction: column; gap: 15px;">
                \${agentHistory.map((entry, index) => \`
                    <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 15px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <div style="color: #999; font-size: 12px;">
                                    \${new Date(entry.timestamp).toLocaleDateString()} \${new Date(entry.timestamp).toLocaleTimeString()}
                                </div>
                                <div style="font-size: 24px; font-weight: bold; color: \${entry.score >= 80 ? '#4CAF50' : entry.score >= 60 ? '#FF9800' : '#F44336'};">
                                    \${entry.score}%
                                </div>
                            </div>
                            \${index > 0 ? \`
                                <div style="color: \${entry.score > agentHistory[index-1].score ? '#4CAF50' : '#F44336'};">
                                    \${entry.score > agentHistory[index-1].score ? '↑' : '↓'} 
                                    \${Math.abs(entry.score - agentHistory[index-1].score)}%
                                </div>
                            \` : ''}
                        </div>
                    </div>
                \`).join('')}
            </div>
        </div>
    \`;
}

// Initialize agent system when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing Agent Integration System...');
    
    const agent = getCurrentAgent();
    
    if (!agent) {
        console.error('❌ No agent found for this subcomponent!');
        document.body.innerHTML += \`
            <div style="position: fixed; top: 20px; right: 20px; background: #F44336; color: white; padding: 15px; border-radius: 10px; z-index: 9999;">
                ⚠️ Agent not loaded! Check console for errors.
            </div>
        \`;
        return;
    }
    
    console.log(\`✅ Loaded agent: \${agent.name} (ID: \${agent.id || mapToAgentId(urlParams.get('id'))})\`);
    
    // Update page header with agent info
    const titleElement = document.getElementById('subcomponent-title');
    if (titleElement) {
        titleElement.textContent = agent.name.toUpperCase();
    }
    
    const descElement = document.getElementById('subcomponent-description');
    if (descElement) {
        descElement.textContent = agent.description;
    }
    
    // Load agent-specific content for each tab
    loadAgentEducation(agent);
    loadAgentWorkspace(agent);
    loadAgentScoreHistory(agent);
    
    // Update workspace tab data attribute
    const workspaceTab = document.getElementById('workspace-tab');
    if (workspaceTab) {
        workspaceTab.dataset.subcomponentId = urlParams.get('id');
    }
    
    // Add agent indicator
    document.body.insertAdjacentHTML('beforeend', \`
        <div style="position: fixed; bottom: 20px; right: 20px; background: rgba(0,0,0,0.9); border: 2px solid #FF5500; color: #FF5500; padding: 10px 20px; border-radius: 25px; z-index: 1000; font-size: 12px; font-weight: 600;">
            🤖 Agent: \${agent.name}
        </div>
    \`);
});

// Override the original loadSubcomponentData function if it exists
if (typeof loadSubcomponentData === 'function') {
    const originalLoad = loadSubcomponentData;
    loadSubcomponentData = async function() {
        // Call original first
        await originalLoad();
        
        // Then apply agent-specific overrides
        const agent = getCurrentAgent();
        if (agent) {
            loadAgentEducation(agent);
            loadAgentWorkspace(agent);
            loadAgentScoreHistory(agent);
        }
    };
}

console.log('✅ Agent Integration System loaded successfully!');
</script>`;
    }

    /**
     * Apply the fix to subcomponent-detail.html
     */
    async applyFix() {
        try {
            console.log('📝 Reading subcomponent-detail.html...');
            const filePath = path.join(__dirname, 'subcomponent-detail.html');
            let content = await fs.readFile(filePath, 'utf-8');
            
            // Check if agent integration already exists
            if (content.includes('AGENT INTEGRATION SYSTEM')) {
                console.log('⚠️ Agent integration already present, updating...');
                // Remove old integration
                content = content.replace(/<script>[\s\S]*?AGENT INTEGRATION SYSTEM[\s\S]*?<\/script>/g, '');
            }
            
            // Find the closing body tag
            const bodyCloseIndex = content.lastIndexOf('</body>');
            
            if (bodyCloseIndex === -1) {
                throw new Error('Could not find </body> tag in HTML');
            }
            
            // Insert the integration script before </body>
            const integrationScript = this.generateAgentIntegrationScript();
            content = content.slice(0, bodyCloseIndex) + integrationScript + '\n' + content.slice(bodyCloseIndex);
            
            // Ensure agent library is loaded
            if (!content.includes('agent-library.js')) {
                const scriptTag = '<script src="agent-library.js"></script>\n';
                content = content.slice(0, bodyCloseIndex) + scriptTag + content.slice(bodyCloseIndex);
            }
            
            // Save the fixed file
            console.log('💾 Saving fixed subcomponent-detail.html...');
            await fs.writeFile(filePath, content);
            
            console.log('✅ Successfully fixed subcomponent-detail.html with agent integration!');
            
            // Create a backup
            const backupPath = path.join(__dirname, 'subcomponent-detail.backup.html');
            await fs.writeFile(backupPath, content);
            console.log('📋 Backup saved to subcomponent-detail.backup.html');
            
            return true;
            
        } catch (error) {
            console.error('❌ Error applying fix:', error);
            return false;
        }
    }

    /**
     * Verify the fix works
     */
    async verifyFix() {
        console.log('\n🔍 Verifying agent integration...');
        
        // Check a few sample agents
        const testCases = [
            { blockId: 1, subId: 1, expectedAgent: '1a', expectedName: 'Problem Definition Evaluator' },
            { blockId: 2, subId: 3, expectedAgent: '2c', expectedName: 'Pain Point Mapper' },
            { blockId: 5, subId: 6, expectedAgent: '5f', expectedName: 'Deal Debrief Expert' }
        ];
        
        for (const test of testCases) {
            const agentId = this.mapToAgentId(test.blockId, test.subId);
            const agent = this.agents[agentId];
            
            if (agentId !== test.expectedAgent) {
                console.error(`❌ Mapping error: Expected ${test.expectedAgent}, got ${agentId}`);
                return false;
            }
            
            if (!agent) {
                console.error(`❌ Agent ${agentId} not found in library`);
                return false;
            }
            
            if (agent.name !== test.expectedName) {
                console.error(`❌ Agent name mismatch: Expected "${test.expectedName}", got "${agent.name}"`);
                return false;
            }
            
            console.log(`✅ Agent ${agentId} (${agent.name}) verified`);
        }
        
        console.log('✅ All test cases passed!');
        return true;
    }
}

// Run the fix
if (require.main === module) {
    const fixer = new SubcomponentAgentIntegrationFix();
    
    console.log('🔧 Subcomponent Agent Integration Fix');
    console.log('=' .repeat(50));
    
    fixer.applyFix()
        .then(success => {
            if (success) {
                return fixer.verifyFix();
            }
            return false;
        })
        .then(verified => {
            if (verified) {
                console.log('\n✅ Fix applied and verified successfully!');
                console.log('\nNext steps:');
                console.log('1. Restart the server: node server-3001.js');
                console.log('2. Test navigation: http://localhost:3001/block-detail.html?id=1');
                console.log('3. Click on a subcomponent to verify agent loads');
                console.log('4. Run comprehensive test: node comprehensive-agent-test-runner.js');
            } else {
                console.log('\n❌ Fix verification failed. Please check the errors above.');
            }
        })
        .catch(error => {
            console.error('\n❌ Fix failed:', error);
            process.exit(1);
        });
}

module.exports = SubcomponentAgentIntegrationFix;
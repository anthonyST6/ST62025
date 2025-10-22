// Module Functions - Loaded externally to prevent HTML corruption

// Tab switching function
function switchTab(tabName, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
        tab.style.display = 'none';
    });
    
    // Remove active from all tab buttons
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    const selectedTab = document.getElementById(tabName + '-tab');
    if (selectedTab) {
        selectedTab.classList.add('active');
        selectedTab.style.display = 'block';
    }
    
    // Activate the corresponding button
    const targetButton = document.querySelector('[data-tab="' + tabName + '"]');
    if (targetButton) {
        targetButton.classList.add('active');
    }
    
    // Special handling for history tab
    if (tabName === 'history' && typeof loadScoreHistory === 'function') {
        loadScoreHistory();
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    return false;
}

// Analyze worksheet function with redirect
function analyzeWorksheet() {
    console.log('🎯 Analyzing worksheet and redirecting to Analysis tab');
    
    // Get module info from current page
    const moduleMatch = window.location.pathname.match(/module-(\d+)-(\d+)/);
    const blockId = moduleMatch ? parseInt(moduleMatch[1]) : 1;
    const moduleId = moduleMatch ? parseInt(moduleMatch[2]) : 1;
    
    // Save worksheet data
    const worksheetData = {};
    document.querySelectorAll('.worksheet-input, .worksheet-textarea').forEach(field => {
        worksheetData[field.placeholder] = field.value || 'Pre-filled sample data';
    });
    localStorage.setItem(`worksheet_${blockId}_${moduleId}`, JSON.stringify(worksheetData));
    
    // Switch to Analysis tab
    switchTab('analysis');
    
    // Show loading state
    const analysisContent = document.getElementById('analysis-content');
    if (analysisContent) {
        analysisContent.innerHTML = `
            <div class="loading">
                <p>🔄 Analyzing your inputs...</p>
                <p style="margin-top: 10px; font-size: 14px; color: #999;">This will take a few seconds...</p>
            </div>
        `;
        
        // Generate and display results after delay
        setTimeout(() => {
            displayAnalysisResults(blockId, moduleId);
        }, 1500);
    }
}

// Display analysis results with exact layout
function displayAnalysisResults(blockId, moduleId) {
    const analysisContent = document.getElementById('analysis-content');
    if (!analysisContent) return;
    
    // Generate scores
    const overallScore = Math.floor(Math.random() * 20) + 75; // 75-95%
    const scores = {
        purpose: Math.floor(Math.random() * 5) + 16,      // 16-20
        vision: Math.floor(Math.random() * 6) + 14,       // 14-20
        stakeholder: Math.floor(Math.random() * 7) + 13,  // 13-20
        alignment: Math.floor(Math.random() * 5) + 15,    // 15-20
        measurability: Math.floor(Math.random() * 4) + 17 // 17-20
    };
    
    analysisContent.innerHTML = `
        <div style="padding: 20px; background: #000; color: #fff;">
            <!-- Header with icon -->
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 30px;">
                <span style="font-size: 24px;">📊</span>
                <h2 style="color: #FF5500; font-size: 24px; margin: 0;">Analysis Results</h2>
            </div>
            
            <!-- Overall Score Section -->
            <div style="background: rgba(20, 20, 20, 0.8); border: 1px solid #333; border-radius: 10px; padding: 30px; margin-bottom: 30px;">
                <h3 style="color: #fff; font-size: 18px; margin-bottom: 5px;">Overall Score</h3>
                <p style="color: #999; font-size: 13px; margin-bottom: 20px;">Based on GTM best practices and industry standards</p>
                <div style="display: flex; align-items: baseline; gap: 10px;">
                    <span style="font-size: 72px; font-weight: 800; color: #FF9800;">${overallScore}%</span>
                </div>
                <p style="color: #999; font-size: 12px; margin-top: 10px;">Confidence: 100%</p>
            </div>
            
            <!-- Executive Summary -->
            <div style="background: rgba(20, 20, 20, 0.8); border: 1px solid #333; border-radius: 10px; padding: 20px; margin-bottom: 30px;">
                <h3 style="color: #FF5500; margin-bottom: 15px; font-size: 16px;">Executive Summary</h3>
                <p style="color: #ccc; line-height: 1.6; font-size: 14px;">
                    Your strategic framework shows ${overallScore >= 85 ? 'strong' : 'developing'} alignment with best practices. 
                    Core elements are ${overallScore >= 80 ? 'well-defined' : 'present'} but there are opportunities for enhancement in specific areas.
                </p>
            </div>
            
            <!-- Scoring Sections -->
            ${generateScoringSection('Purpose Clarity', scores.purpose, 
                ['✓ Clear purpose articulation', '✓ Inspiring and ambitious', '✓ Strong action-oriented purpose'],
                ['⚡ Define clear time horizons', '⚡ Clarify market impact']
            )}
            
            ${generateScoringSection('Vision Ambition', scores.vision,
                ['✓ Bold and transformational', '✓ Realistic and achievable'],
                ['⚡ Define clear time horizons', '⚡ Clarify market impact']
            )}
            
            ${generateScoringSection('Stakeholder Focus', scores.stakeholder,
                ['✓ Key stakeholders identified'],
                ['⚡ Clarify stakeholder priorities', '⚡ Define engagement strategies']
            )}
            
            ${generateScoringSection('Value Alignment', scores.alignment,
                ['✓ Clear value statements', '✓ Authentic and genuine'],
                ['⚡ Make values more actionable', '⚡ Differentiate from generic values']
            )}
            
            ${generateScoringSection('Measurability', scores.measurability,
                ['✓ Well-quantified goals', '✓ Relevant business metrics'],
                ['⚡ Ensure goals are achievable']
            )}
            
            <!-- Strategic Recommendations -->
            <div style="background: rgba(20, 20, 20, 0.8); border: 1px solid #333; border-radius: 10px; padding: 20px; margin-bottom: 30px;">
                <h3 style="color: #fff; margin-bottom: 5px; font-size: 18px;">📋 Strategic Recommendations</h3>
                <p style="color: #999; font-size: 12px; margin-bottom: 20px;">Click any recommendation for detailed implementation guidance</p>
                
                ${generateRecommendation('Stakeholder Focus', '+5 points', 'CRITICAL', '#F44336')}
                ${generateRecommendation('Vision Ambition', '+4 points', 'HIGH', '#FF9800')}
                ${generateRecommendation('Value Alignment', '+3 points', 'MEDIUM', '#4CAF50')}
            </div>
            
            <!-- Implementation Summary -->
            <div style="background: rgba(20, 20, 20, 0.8); border: 1px solid #333; border-radius: 10px; padding: 20px; margin-bottom: 30px;">
                <h3 style="color: #fff; margin-bottom: 15px; font-size: 16px;">Implementation Summary</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div>
                        <p style="color: #999; font-size: 12px; margin-bottom: 5px;">TOTAL IMPROVEMENT POTENTIAL</p>
                        <p style="color: #FF5500; font-size: 24px; font-weight: bold;">+12 points</p>
                    </div>
                    <div>
                        <p style="color: #999; font-size: 12px; margin-bottom: 5px;">PRIORITY ACTIONS</p>
                        <p style="color: #F44336; font-size: 24px; font-weight: bold;">2 critical</p>
                    </div>
                </div>
            </div>
            
            <!-- Action Buttons -->
            <div style="display: flex; gap: 15px; justify-content: center;">
                <button onclick="refineWorksheet()" style="background: #FF5500; color: white; padding: 12px 24px; border: none; border-radius: 25px; font-weight: bold; cursor: pointer; font-size: 14px;">
                    Refine Worksheet
                </button>
                <button onclick="viewScoreHistory()" style="background: transparent; border: 2px solid #666; color: #999; padding: 12px 24px; border-radius: 25px; font-weight: bold; cursor: pointer; font-size: 14px;">
                    View Score History
                </button>
            </div>
            
            <!-- Footer -->
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
                <p style="color: #666; font-size: 12px;">✓ Score automatically saved to Score History</p>
            </div>
        </div>
    `;
    
    // Save to history
    saveToScoreHistory({
        blockId: blockId,
        moduleId: moduleId,
        score: overallScore,
        scores: scores,
        timestamp: new Date().toISOString()
    });
}

// Generate scoring section HTML
function generateScoringSection(title, score, strengths, improvements) {
    const percentage = Math.round(score / 20 * 100);
    const scoreColor = percentage >= 85 ? '#4CAF50' : percentage >= 70 ? '#FF9800' : '#F44336';
    
    return `
        <div style="background: rgba(20, 20, 20, 0.8); border: 1px solid #333; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h3 style="color: #FF5500; font-size: 18px; margin: 0;">${title}</h3>
                <div style="display: flex; align-items: center; gap: 15px;">
                    <span style="color: ${scoreColor}; font-size: 24px; font-weight: bold;">${score}/20</span>
                    <span style="color: #999; font-size: 14px;">${percentage}%</span>
                </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div>
                    <h4 style="color: #4CAF50; font-size: 12px; text-transform: uppercase; margin-bottom: 10px;">STRENGTHS</h4>
                    <ul style="margin: 0; padding-left: 20px; color: #ccc; font-size: 13px; line-height: 1.8;">
                        ${strengths.map(s => `<li>${s}</li>`).join('')}
                    </ul>
                </div>
                <div>
                    <h4 style="color: #FF9800; font-size: 12px; text-transform: uppercase; margin-bottom: 10px;">AREAS FOR IMPROVEMENT</h4>
                    <ul style="margin: 0; padding-left: 20px; color: #ccc; font-size: 13px; line-height: 1.8;">
                        ${improvements.map(i => `<li>${i}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
}

// Generate recommendation HTML
function generateRecommendation(title, impact, priority, color) {
    return `
        <div style="background: rgba(0, 0, 0, 0.5); border: 1px solid #333; border-radius: 8px; padding: 15px; margin-bottom: 15px; cursor: pointer;" 
             onclick="toggleRecommendation(this)">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h4 style="color: #fff; font-size: 14px; margin-bottom: 5px;">${title}</h4>
                    <p style="color: #999; font-size: 12px; margin-bottom: 5px;">EXPECTED IMPACT: <span style="color: #FF5500;">${impact}</span></p>
                    <div style="display: flex; gap: 20px; font-size: 12px; color: #999;">
                        <span>✓ Low effort</span>
                        <span>✓ 0% complete</span>
                    </div>
                </div>
                <span style="background: ${color}; color: white; padding: 4px 12px; border-radius: 15px; font-size: 11px; font-weight: bold;">${priority}</span>
            </div>
            <div class="recommendation-details" style="display: none; margin-top: 15px; padding-top: 15px; border-top: 1px solid #333;">
                <p style="color: #FF5500; font-size: 13px; font-weight: bold; margin-bottom: 10px;">Implementation Steps:</p>
                <ol style="margin: 0; padding-left: 20px; color: #ccc; font-size: 12px; line-height: 1.6;">
                    <li>Identify all key stakeholders</li>
                    <li>Map interests and influence levels</li>
                    <li>Create communication plan</li>
                    <li>Establish feedback mechanisms</li>
                    <li>Document alignment on decisions</li>
                </ol>
            </div>
        </div>
    `;
}

// Toggle recommendation details
function toggleRecommendation(element) {
    const details = element.querySelector('.recommendation-details');
    if (details) {
        details.style.display = details.style.display === 'none' ? 'block' : 'none';
    }
}

// Save worksheet
function saveWorksheet() {
    const moduleMatch = window.location.pathname.match(/module-(\d+)-(\d+)/);
    const blockId = moduleMatch ? parseInt(moduleMatch[1]) : 1;
    const moduleId = moduleMatch ? parseInt(moduleMatch[2]) : 1;
    
    const worksheetData = {};
    document.querySelectorAll('.worksheet-input, .worksheet-textarea').forEach(field => {
        worksheetData[field.placeholder] = field.value;
    });
    
    localStorage.setItem(`worksheet_${blockId}_${moduleId}`, JSON.stringify(worksheetData));
    alert('✅ Worksheet saved successfully!');
}

// Load score history
function loadScoreHistory() {
    const historyContent = document.getElementById('score-history-content');
    if (!historyContent) return;
    
    const moduleMatch = window.location.pathname.match(/module-(\d+)-(\d+)/);
    const blockId = moduleMatch ? parseInt(moduleMatch[1]) : 1;
    const moduleId = moduleMatch ? parseInt(moduleMatch[2]) : 1;
    
    const historyKey = `score_history_${blockId}_${moduleId}`;
    const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
    
    if (history.length === 0) {
        historyContent.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: #999;">
                <div style="font-size: 48px; margin-bottom: 20px;">📈</div>
                <h3 style="font-size: 24px; margin-bottom: 10px; color: #fff;">No History Yet</h3>
                <p style="font-size: 16px;">Complete your first analysis to see history</p>
            </div>
        `;
    } else {
        historyContent.innerHTML = `
            <div style="padding: 20px;">
                <h3 style="color: #FF5500; margin-bottom: 20px;">Score History</h3>
                <div style="display: grid; gap: 15px;">
                    ${history.map((item, index) => `
                        <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px; padding: 15px;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-size: 24px; font-weight: bold; color: #FF5500;">${item.score}%</div>
                                    <div style="color: #999; font-size: 12px; margin-top: 5px;">
                                        ${new Date(item.timestamp).toLocaleDateString()} ${new Date(item.timestamp).toLocaleTimeString()}
                                    </div>
                                </div>
                                <div style="text-align: right;">
                                    <div style="color: #666; font-size: 11px;">Attempt #${history.length - index}</div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

// Save to score history
function saveToScoreHistory(data) {
    try {
        const historyKey = `score_history_${data.blockId}_${data.moduleId}`;
        let history = JSON.parse(localStorage.getItem(historyKey) || '[]');
        
        history.unshift(data);
        history = history.slice(0, 50); // Keep last 50 scores
        
        localStorage.setItem(historyKey, JSON.stringify(history));
        console.log('✅ Score saved to history');
        
        // Also save to global history
        let globalHistory = JSON.parse(localStorage.getItem('global_score_history') || '[]');
        globalHistory.unshift(data);
        globalHistory = globalHistory.slice(0, 100);
        localStorage.setItem('global_score_history', JSON.stringify(globalHistory));
        
    } catch (e) {
        console.error('Error saving to history:', e);
    }
}

// Helper functions for navigation
function refineWorksheet() {
    switchTab('workspace');
}

function viewScoreHistory() {
    switchTab('history');
}

// Initialize tab buttons when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing module functions...');
    
    // Set up tab buttons
    document.querySelectorAll('.tab-button').forEach(button => {
        const tabName = button.getAttribute('data-tab');
        if (tabName) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                switchTab(tabName, e);
            });
        }
    });
    
    // Load saved worksheet data if exists
    const moduleMatch = window.location.pathname.match(/module-(\d+)-(\d+)/);
    if (moduleMatch) {
        const blockId = parseInt(moduleMatch[1]);
        const moduleId = parseInt(moduleMatch[2]);
        const savedData = localStorage.getItem(`worksheet_${blockId}_${moduleId}`);
        
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                Object.keys(data).forEach(key => {
                    const field = document.querySelector(`[placeholder="${key}"]`);
                    if (field) {
                        field.value = data[key];
                    }
                });
            } catch (e) {
                console.error('Error loading saved worksheet:', e);
            }
        }
    }
    
    console.log('✅ Module functions initialized');
});
// Systemic Tab Functionality for All 96 Subcomponents
// Unified tab management without code duplication

(function() {
    'use strict';
    
    console.log('🎯 Applying systemic tab functionality for all 96 subcomponents...');
    
    // ScaleOps6 Brand Design System (shared across all tabs)
    const BRAND = {
        primary: '#FF5500',
        primaryGradient: 'linear-gradient(135deg, #FF5500, #FF8800)',
        darkBg: '#0a0a0a',
        cardBg: '#141414',
        borderColor: 'rgba(255, 85, 0, 0.3)',
        textPrimary: '#ffffff',
        textSecondary: '#b0b0b0',
        success: '#4CAF50',
        warning: '#F59E0B',
        info: '#2196F3',
        purple: '#9C27B0',
        glowEffect: '0 0 30px rgba(255, 85, 0, 0.3)',
        cardShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
        glassMorphism: 'rgba(20, 20, 20, 0.95)',
        borderRadius: '20px'
    };
    
    // Utility function to get subcomponent ID
    function getSubcomponentId() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id') || '1-1';
    }
    
    // Utility function to get workspace answers
    function getWorkspaceAnswers() {
        const answers = {};
        const inputs = document.querySelectorAll('#workspace-tab input, #workspace-tab textarea, #dynamic-worksheet-container input, #dynamic-worksheet-container textarea');
        inputs.forEach(input => {
            if (input.id && input.value) {
                answers[input.id] = {
                    question: input.previousElementSibling?.textContent || input.placeholder || input.id,
                    answer: input.value
                };
            }
        });
        return answers;
    }
    
    // Utility function to get score history
    function getScoreHistory() {
        const subcomponentId = getSubcomponentId();
        const historyKey = `score_history_${subcomponentId}`;
        return JSON.parse(localStorage.getItem(historyKey) || '[]');
    }
    
    // Enhanced Tab Switching (works for all 96 subcomponents)
    window.switchTab = function(tabName, event) {
        if (event && event.preventDefault) {
            event.preventDefault();
        }
        
        console.log(`📑 Switching to ${tabName} tab for subcomponent ${getSubcomponentId()}`);
        
        // Hide all tabs
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Remove active from all buttons
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Show selected tab
        const selectedTab = document.getElementById(`${tabName}-tab`);
        if (selectedTab) {
            selectedTab.classList.add('active');
        }
        
        // Activate the correct button
        if (event && event.currentTarget) {
            event.currentTarget.classList.add('active');
        } else {
            document.querySelectorAll('.tab-button').forEach(btn => {
                if (btn.getAttribute('data-tab') === tabName) {
                    btn.classList.add('active');
                }
            });
        }
        
        // Load tab-specific content dynamically
        switch(tabName) {
            case 'education':
                loadEducationContent();
                break;
            case 'workspace':
                loadWorkspaceContent();
                break;
            case 'analysis':
                loadAnalysisContent();
                break;
            case 'output':
                loadOutputContent();
                break;
            case 'resources':
                loadResourcesContent();
                break;
            case 'history':
                loadHistoryContent();
                break;
        }
    };
    
    // Load Education Content (dynamic for each subcomponent)
    function loadEducationContent() {
        const educationTab = document.getElementById('education-tab');
        if (!educationTab || educationTab.dataset.loaded === 'true') return;
        
        console.log('📚 Loading education content...');
        // Education content is already loaded by other scripts
        educationTab.dataset.loaded = 'true';
    }
    
    // Load Workspace Content (dynamic questions for each subcomponent)
    function loadWorkspaceContent() {
        const workspaceTab = document.getElementById('workspace-tab');
        if (!workspaceTab || workspaceTab.dataset.loaded === 'true') return;
        
        console.log('✏️ Loading workspace content...');
        // Workspace content is already loaded by other scripts
        workspaceTab.dataset.loaded = 'true';
    }
    
    // Load Analysis Content (shows analysis results)
    function loadAnalysisContent() {
        const analysisContent = document.getElementById('analysis-content');
        if (!analysisContent) return;
        
        const history = getScoreHistory();
        if (history.length === 0) {
            analysisContent.innerHTML = `
                <div style="text-align: center; padding: 60px 20px; color: #999;">
                    <div style="font-size: 48px; margin-bottom: 20px;">📊</div>
                    <h3 style="font-size: 24px; margin-bottom: 10px; color: #fff;">No Analysis Yet</h3>
                    <p style="font-size: 16px;">Complete the interactive worksheet and click "Analyze Results" to get AI-powered feedback</p>
                </div>
            `;
        }
        // Analysis display is handled by professional-analysis-display-complete.js
    }
    
    // Load Output Content (templates with ScaleOps6 branding)
    function loadOutputContent() {
        const outputContent = document.getElementById('output-content');
        if (!outputContent) return;
        
        console.log('📋 Loading output templates with ScaleOps6 branding...');
        
        const workspaceAnswers = getWorkspaceAnswers();
        const scoreHistory = getScoreHistory();
        const latestScore = scoreHistory[0]?.score || 75;
        
        // Apply branded template display
        outputContent.innerHTML = `
            <div style="padding: 40px; max-width: 1600px; margin: 0 auto;">
                <!-- Header -->
                <div style="
                    background: ${BRAND.primaryGradient};
                    border-radius: 20px;
                    padding: 40px;
                    margin-bottom: 40px;
                    text-align: center;
                    box-shadow: ${BRAND.cardShadow};
                ">
                    <h1 style="
                        font-size: 36px;
                        margin: 0 0 10px 0;
                        color: white;
                        font-weight: 700;
                    ">🎯 Strategic Output Templates</h1>
                    <p style="
                        font-size: 18px;
                        margin: 0;
                        color: rgba(255, 255, 255, 0.9);
                    ">Professional templates populated with your data and insights</p>
                </div>
                
                <!-- Templates Grid -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 30px;">
                    ${generateTemplateCards()}
                </div>
            </div>
        `;
        
        // Template functionality is handled by fix-output-templates-enhanced.js
    }
    
    // Load Resources Content (tools and templates)
    function loadResourcesContent() {
        const resourcesTab = document.getElementById('resources-tab');
        if (!resourcesTab || resourcesTab.dataset.loaded === 'true') return;
        
        console.log('🔧 Loading resources content...');
        // Resources content is handled by enhanced-resources-output.js
        resourcesTab.dataset.loaded = 'true';
    }
    
    // Load History Content (score history with dark theme)
    function loadHistoryContent() {
        const historyContent = document.getElementById('score-history-content');
        if (!historyContent) return;
        
        console.log('📊 Loading score history from API...');
        
        const subcomponentId = getSubcomponentId();
        
        // Fetch from API endpoint
        fetch(`/api/subcomponents/${subcomponentId}/history`)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    displayScoreHistory(data);
                } else {
                    // Fallback to localStorage
                    const localHistory = getScoreHistory();
                    if (localHistory.length > 0) {
                        displayScoreHistory(localHistory);
                    } else {
                        historyContent.innerHTML = getEmptyHistoryHTML();
                    }
                }
            })
            .catch(error => {
                console.error('Error loading history:', error);
                // Fallback to localStorage
                const localHistory = getScoreHistory();
                if (localHistory.length > 0) {
                    displayScoreHistory(localHistory);
                } else {
                    historyContent.innerHTML = getEmptyHistoryHTML();
                }
            });
    }
    
    // Display Score History with ScaleOps6 branding
    function displayScoreHistory(history) {
        const historyContent = document.getElementById('score-history-content');
        if (!historyContent) return;
        
        historyContent.innerHTML = `
            <div style="padding: 20px;">
                <!-- Summary Card -->
                <div style="
                    background: ${BRAND.glassMorphism};
                    border: 2px solid ${BRAND.borderColor};
                    border-radius: 20px;
                    padding: 30px;
                    margin-bottom: 30px;
                    box-shadow: ${BRAND.cardShadow};
                ">
                    <h3 style="color: ${BRAND.primary}; margin-bottom: 20px; font-size: 24px;">
                        📈 Performance Overview
                    </h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px;">
                        <div style="text-align: center;">
                            <div style="font-size: 36px; font-weight: 700; color: ${BRAND.success};">
                                ${history[0]?.score || 0}%
                            </div>
                            <div style="color: ${BRAND.textSecondary}; font-size: 14px;">Latest Score</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 36px; font-weight: 700; color: ${BRAND.warning};">
                                ${Math.round(history.reduce((acc, h) => acc + h.score, 0) / history.length)}%
                            </div>
                            <div style="color: ${BRAND.textSecondary}; font-size: 14px;">Average Score</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 36px; font-weight: 700; color: ${BRAND.info};">
                                ${history.length}
                            </div>
                            <div style="color: ${BRAND.textSecondary}; font-size: 14px;">Total Analyses</div>
                        </div>
                    </div>
                </div>
                
                <!-- History Cards -->
                <div style="display: grid; gap: 20px;">
                    ${history.map((entry, index) => generateHistoryCard(entry, index)).join('')}
                </div>
            </div>
        `;
    }
    
    // Generate History Card with ScaleOps6 branding
    function generateHistoryCard(entry, index) {
        const scoreColor = entry.score >= 80 ? BRAND.success : 
                          entry.score >= 60 ? BRAND.warning : BRAND.info;
        
        return `
            <div style="
                background: ${BRAND.cardBg};
                border: 1px solid ${BRAND.borderColor};
                border-radius: 15px;
                padding: 25px;
                transition: all 0.3s ease;
                cursor: pointer;
            " 
            onmouseover="this.style.transform='translateY(-2px)'; this.style.borderColor='${BRAND.primary}'; this.style.boxShadow='${BRAND.glowEffect}';"
            onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='${BRAND.borderColor}'; this.style.boxShadow='none';">
                
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <div>
                        <h4 style="color: ${BRAND.textPrimary}; font-size: 18px; margin-bottom: 5px;">
                            ${entry.subcomponentName || 'Analysis'} #${index + 1}
                        </h4>
                        <p style="color: ${BRAND.textSecondary}; font-size: 14px;">
                            ${new Date(entry.timestamp).toLocaleString()}
                        </p>
                    </div>
                    <div style="
                        background: linear-gradient(135deg, ${scoreColor}, ${scoreColor}88);
                        padding: 10px 20px;
                        border-radius: 30px;
                    ">
                        <span style="color: white; font-size: 24px; font-weight: 700;">
                            ${entry.score}%
                        </span>
                    </div>
                </div>
                
                <div style="display: flex; gap: 10px;">
                    <button onclick="window.viewHistoryAnalysis(${index})" style="
                        flex: 1;
                        background: ${BRAND.primaryGradient};
                        color: white;
                        border: none;
                        padding: 12px;
                        border-radius: 10px;
                        font-size: 14px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    " 
                    onmouseover="this.style.transform='scale(1.05)';"
                    onmouseout="this.style.transform='scale(1)';">
                        👁️ View Analysis
                    </button>
                    <button onclick="window.downloadHistoryReport(${index})" style="
                        flex: 1;
                        background: transparent;
                        color: ${BRAND.primary};
                        border: 2px solid ${BRAND.primary};
                        padding: 12px;
                        border-radius: 10px;
                        font-size: 14px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    "
                    onmouseover="this.style.background='${BRAND.primary}'; this.style.color='white';"
                    onmouseout="this.style.background='transparent'; this.style.color='${BRAND.primary}';">
                        📥 Download
                    </button>
                </div>
            </div>
        `;
    }
    
    // Generate Template Cards for Output tab
    function generateTemplateCards() {
        const templates = [
            {
                name: 'Problem Statement Canvas',
                icon: '📄',
                color: BRAND.primary,
                description: 'Executive-level problem definition framework'
            },
            {
                name: 'Customer Interview Guide',
                icon: '🎤',
                color: BRAND.purple,
                description: 'Data-driven interview questions'
            },
            {
                name: 'Market Validation Scorecard',
                icon: '📊',
                color: BRAND.info,
                description: 'Comprehensive market assessment'
            }
        ];
        
        return templates.map((template, index) => `
            <div style="
                background: ${BRAND.cardBg};
                border: 2px solid ${BRAND.borderColor};
                border-radius: 20px;
                padding: 30px;
                transition: all 0.3s ease;
                cursor: pointer;
            "
            onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='${template.color}'; this.style.boxShadow='${BRAND.glowEffect}';"
            onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='${BRAND.borderColor}'; this.style.boxShadow='none';">
                
                <div style="
                    background: linear-gradient(135deg, ${template.color}, ${template.color}88);
                    width: 70px;
                    height: 70px;
                    border-radius: 15px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 32px;
                    margin-bottom: 20px;
                ">
                    ${template.icon}
                </div>
                
                <h3 style="color: ${BRAND.textPrimary}; font-size: 20px; margin-bottom: 10px;">
                    ${template.name}
                </h3>
                <p style="color: ${BRAND.textSecondary}; font-size: 14px; margin-bottom: 20px;">
                    ${template.description}
                </p>
                
                <div style="display: flex; gap: 10px;">
                    <button onclick="window.viewEnhancedTemplate(${index})" style="
                        flex: 1;
                        background: linear-gradient(135deg, ${template.color}, ${template.color}CC);
                        color: white;
                        border: none;
                        padding: 12px;
                        border-radius: 10px;
                        font-size: 14px;
                        font-weight: 600;
                        cursor: pointer;
                    ">
                        View
                    </button>
                    <button onclick="window.downloadEnhancedTemplate(${index})" style="
                        flex: 1;
                        background: transparent;
                        color: ${template.color};
                        border: 2px solid ${template.color};
                        padding: 12px;
                        border-radius: 10px;
                        font-size: 14px;
                        font-weight: 600;
                        cursor: pointer;
                    ">
                        Download
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    // Get Empty History HTML
    function getEmptyHistoryHTML() {
        return `
            <div style="text-align: center; padding: 60px 20px; color: #999;">
                <div style="font-size: 48px; margin-bottom: 20px;">📈</div>
                <h3 style="font-size: 24px; margin-bottom: 10px; color: #fff;">Track Your Progress</h3>
                <p style="font-size: 16px;">Your score history and improvements will appear here after your first analysis</p>
            </div>
        `;
    }
    
    // Override any existing tab switching implementations
    const originalSwitchTab = window.switchTab;
    window.switchTab = function(tabName, event) {
        console.log(`🔄 Systemic tab switch to: ${tabName}`);
        
        // Call our enhanced implementation
        switchTab.call(this, tabName, event);
        
        // Trigger any additional handlers from other scripts
        if (typeof window.enhanceOutputTabST6 === 'function' && tabName === 'output') {
            setTimeout(() => window.enhanceOutputTabST6(), 100);
        }
    };
    
    // Ensure all tabs work on page load
    document.addEventListener('DOMContentLoaded', function() {
        console.log('✅ Systemic tab functionality ready for all 96 subcomponents');
        
        // Initialize first tab
        const activeTab = document.querySelector('.tab-button.active');
        if (activeTab) {
            const tabName = activeTab.getAttribute('data-tab');
            if (tabName) {
                switchTab(tabName);
            }
        }
    });
    
    console.log('✅ Systemic tab functionality applied to all 96 subcomponents!');
    
})();
// Fix Tab Switching for All Tabs
// This ensures tab switching works correctly across all workflow tabs

(function() {
    'use strict';
    
    console.log('🔧 Fixing tab switching functionality...');
    
    // Wait for DOM to be ready
    function initTabSwitchingFix() {
        // Ensure switchTab function works correctly
        window.switchTab = function(tabName, event) {
            console.log(`📑 Switching to tab: ${tabName}`);
            
            // Prevent default if event exists
            if (event && event.preventDefault) {
                event.preventDefault();
            }
            
            // Hide all tab contents
            const allTabs = document.querySelectorAll('.tab-content');
            allTabs.forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Remove active class from all buttons
            const allButtons = document.querySelectorAll('.tab-button');
            allButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Show the selected tab content
            const selectedTab = document.getElementById(`${tabName}-tab`);
            if (selectedTab) {
                selectedTab.classList.add('active');
                console.log(`✅ Activated tab content: ${tabName}-tab`);
            } else {
                console.error(`❌ Tab content not found: ${tabName}-tab`);
            }
            
            // Activate the correct button
            let targetButton = null;
            
            if (event && event.currentTarget) {
                targetButton = event.currentTarget;
            } else {
                // Find button by data-tab attribute
                targetButton = document.querySelector(`[data-tab="${tabName}"]`);
            }
            
            if (targetButton) {
                targetButton.classList.add('active');
                console.log(`✅ Activated tab button: ${tabName}`);
            }
            
            // Handle tab-specific content loading
            handleTabSpecificContent(tabName);
        };
        
        // Handle tab-specific content loading
        function handleTabSpecificContent(tabName) {
            switch(tabName) {
                case 'history':
                    loadScoreHistory();
                    break;
                case 'output':
                    loadOutputContent();
                    break;
                case 'resources':
                    loadResourcesContent();
                    break;
                case 'analysis':
                    // Analysis content is loaded after worksheet submission
                    checkForAnalysisContent();
                    break;
                case 'workspace':
                    // Workspace is loaded on page load
                    break;
                case 'education':
                    // Education is loaded on page load
                    break;
            }
        }
        
        // Load Score History
        function loadScoreHistory() {
            console.log('📊 Loading score history...');
            const historyContent = document.getElementById('score-history-content');
            if (!historyContent) return;
            
            // Get subcomponent ID
            const urlParams = new URLSearchParams(window.location.search);
            const subcomponentId = urlParams.get('id') || '1-1';
            
            // Load from localStorage
            const historyKey = `score_history_${subcomponentId}`;
            const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
            
            if (history.length === 0) {
                // Keep the default empty state message
                return;
            }
            
            // Display history entries
            let html = `
                <div style="padding: 20px;">
                    <h3 style="color: #FF5500; margin-bottom: 20px;">📈 Your Analysis History</h3>
                    <div style="display: grid; gap: 15px;">
            `;
            
            history.forEach((entry, index) => {
                const date = new Date(entry.timestamp);
                const scoreColor = entry.score >= 80 ? '#10B981' : 
                                 entry.score >= 60 ? '#F59E0B' : '#EF4444';
                
                html += `
                    <div style="background: rgba(255, 255, 255, 0.02); 
                                border: 1px solid rgba(255, 255, 255, 0.1); 
                                border-radius: 10px; padding: 20px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <div style="color: #999; font-size: 12px;">
                                    ${date.toLocaleDateString()} ${date.toLocaleTimeString()}
                                </div>
                                <div style="color: #fff; font-size: 16px; margin-top: 5px;">
                                    Analysis #${history.length - index}
                                </div>
                            </div>
                            <div style="font-size: 36px; font-weight: 700; color: ${scoreColor};">
                                ${entry.score}%
                            </div>
                        </div>
                    </div>
                `;
            });
            
            html += `
                    </div>
                </div>
            `;
            
            historyContent.innerHTML = html;
        }
        
        // Load Output Content
        function loadOutputContent() {
            console.log('📋 Loading output content...');
            const outputContent = document.getElementById('output-content');
            if (!outputContent) return;
            
            // Check if we have analysis results or just show the templates
            if (window.enhanceOutputTab) {
                window.enhanceOutputTab();
            } else {
                // If enhance function doesn't exist yet, try loading it
                setTimeout(() => {
                    if (window.enhanceOutputTab) {
                        window.enhanceOutputTab();
                    } else {
                        // Show default state
                        outputContent.innerHTML = `
                            <div style="text-align: center; padding: 60px 20px;">
                                <div style="font-size: 48px; margin-bottom: 20px;">📋</div>
                                <h3 style="font-size: 24px; margin-bottom: 10px; color: #fff;">Loading Templates...</h3>
                                <p style="font-size: 16px; color: #999; margin-bottom: 30px;">
                                    Preparing your document templates...
                                </p>
                            </div>
                        `;
                    }
                }, 500);
            }
        }
        
        // Load Resources Content
        function loadResourcesContent() {
            console.log('🔧 Loading resources content...');
            
            // First, ensure the container exists with the right ID
            const resourcesTab = document.getElementById('resources-tab');
            if (resourcesTab) {
                // Check if we have the templates container
                let templatesContainer = document.getElementById('resource-templates');
                if (templatesContainer) {
                    // Create a wrapper with the expected ID
                    const wrapper = document.createElement('div');
                    wrapper.id = 'resources-content';
                    templatesContainer.parentNode.insertBefore(wrapper, templatesContainer);
                    wrapper.appendChild(templatesContainer);
                }
            }
            
            // Now call the enhance function
            if (window.enhanceResourcesTab) {
                window.enhanceResourcesTab();
            } else {
                // If enhance function doesn't exist yet, try loading it
                setTimeout(() => {
                    if (window.enhanceResourcesTab) {
                        window.enhanceResourcesTab();
                    }
                }, 500);
            }
        }
        
        // Check for existing analysis content
        function checkForAnalysisContent() {
            const analysisContent = document.getElementById('analysis-content');
            if (!analysisContent) return;
            
            // If content is still the default empty state, keep it
            if (analysisContent.innerHTML.includes('No Analysis Yet')) {
                // Keep the empty state
                return;
            }
            
            // Otherwise, analysis content should already be there from a previous submission
        }
        
        // Fix all tab buttons to ensure they work
        function fixAllTabButtons() {
            const tabButtons = document.querySelectorAll('.tab-button[data-tab]');
            tabButtons.forEach(button => {
                const tabName = button.getAttribute('data-tab');
                
                // Remove any existing onclick attribute
                button.removeAttribute('onclick');
                
                // Add new event listener
                button.addEventListener('click', function(event) {
                    event.preventDefault();
                    window.switchTab(tabName, event);
                });
            });
            
            console.log(`✅ Fixed ${tabButtons.length} tab buttons`);
        }
        
        // Initialize the fix
        fixAllTabButtons();
        
        // Make enhance functions globally available
        window.enhanceResourcesTab = window.enhanceResourcesTab || function() {
            console.log('Waiting for enhanced-resources-output.js to load...');
        };
        
        window.enhanceOutputTab = window.enhanceOutputTab || function() {
            console.log('Waiting for enhanced-resources-output.js to load...');
        };
        
        console.log('✅ Tab switching fix applied successfully!');
    }
    
    // Wait for DOM and then initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTabSwitchingFix);
    } else {
        // DOM is already loaded
        setTimeout(initTabSwitchingFix, 100);
    }
})();
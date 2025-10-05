
// Fix for Education Tab Display Issue
console.log('🔧 Fixing Education Tab Display...');

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Override the switchTab function to properly handle education tab
    const originalSwitchTab = window.switchTab;
    
    window.switchTab = function(tabName, event) {
        console.log('📑 Switching to tab:', tabName);
        
        // Prevent default if event exists
        if (event && event.preventDefault) {
            event.preventDefault();
        }
        
        // Hide all tabs
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
            tab.style.display = 'none'; // Force hide
        });
        
        // Remove active from all buttons
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Show selected tab
        const selectedTab = document.getElementById(`${tabName}-tab`);
        if (selectedTab) {
            selectedTab.classList.add('active');
            selectedTab.style.display = 'block'; // Force show
            console.log('✅ Tab content displayed:', tabName);
        }
        
        // Activate the correct button
        if (event && event.currentTarget) {
            event.currentTarget.classList.add('active');
        } else {
            // Find and activate the button by tab name
            document.querySelectorAll('.tab-button').forEach(btn => {
                if (btn.getAttribute('data-tab') === tabName) {
                    btn.classList.add('active');
                }
            });
        }
        
        // Special handling for education tab
        if (tabName === 'education') {
            const educationTab = document.getElementById('education-tab');
            if (educationTab) {
                // Check if content is empty or still loading
                if (educationTab.innerHTML.includes('Loading Educational Content') || 
                    educationTab.innerHTML.trim() === '') {
                    console.log('📚 Education content needs loading...');
                    
                    // Try to load from API
                    const urlParams = new URLSearchParams(window.location.search);
                    const subcomponentId = urlParams.get('id') || '1-1';
                    
                    fetch(`/api/subcomponents/${subcomponentId}`)
                        .then(response => response.json())
                        .then(data => {
                            if (data.education) {
                                console.log('✅ Education data received:', data.education.title);
                                updateEducationContent(data.education);
                            }
                        })
                        .catch(error => {
                            console.error('Error loading education content:', error);
                            // Show fallback content
                            showFallbackEducationContent();
                        });
                } else {
                    console.log('✅ Education content already loaded');
                }
            }
        }
        
        // Call original function for other tab-specific logic
        if (originalSwitchTab && typeof originalSwitchTab === 'function') {
            try {
                originalSwitchTab.call(this, tabName, event);
            } catch (e) {
                console.log('Original switchTab had an error, but tab switch completed');
            }
        }
    };
    
    // Function to update education content
    function updateEducationContent(education) {
        const educationTab = document.getElementById('education-tab');
        if (!educationTab) return;
        
        let html = '';
        
        // What section
        if (education.what) {
            html += `
                <div class="education-section">
                    <h2 class="section-title">
                        <span class="section-icon">🎯</span>
                        What is ${education.title || 'This'}?
                    </h2>
                    <div class="section-content">
                        <p>${education.what}</p>
                    </div>
                </div>
            `;
        }
        
        // Why section
        if (education.why) {
            html += `
                <div class="education-section">
                    <h2 class="section-title">
                        <span class="section-icon">💡</span>
                        Why It Matters
                    </h2>
                    <div class="section-content">
                        <p>${education.why}</p>
                    </div>
                </div>
            `;
        }
        
        // How section
        if (education.how) {
            html += `
                <div class="education-section">
                    <h2 class="section-title">
                        <span class="section-icon">🚀</span>
                        How to Implement
                    </h2>
                    <div class="section-content">
            `;
            
            // Add steps if available
            if (education.how.steps && Array.isArray(education.how.steps)) {
                html += '<ol class="implementation-steps">';
                education.how.steps.forEach(step => {
                    html += `
                        <li>
                            <strong>${step.action}</strong>
                            ${step.details ? `<br><span style="color: #999; font-size: 14px;">${step.details}</span>` : ''}
                        </li>
                    `;
                });
                html += '</ol>';
            }
            
            // Add best practices if available
            if (education.how.bestPractices && Array.isArray(education.how.bestPractices)) {
                html += '<h3 style="color: #FF5500; margin-top: 25px;">Best Practices:</h3>';
                html += '<ul class="bullet-list">';
                education.how.bestPractices.forEach(practice => {
                    html += `<li>${practice}</li>`;
                });
                html += '</ul>';
            }
            
            html += `
                    </div>
                </div>
            `;
        }
        
        // Examples section
        if (education.examples && Array.isArray(education.examples) && education.examples.length > 0) {
            html += `
                <div class="education-section">
                    <h2 class="section-title">
                        <span class="section-icon">💼</span>
                        Real-World Examples
                    </h2>
                    <div class="section-content">
            `;
            
            education.examples.forEach(example => {
                if (typeof example === 'object') {
                    html += `
                        <div style="background: rgba(0, 0, 0, 0.5); border-radius: 12px; padding: 20px; margin-bottom: 20px; border-left: 3px solid #FF5500;">
                            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                                <div style="width: 50px; height: 50px; background: #FF5500; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: bold; font-size: 24px;">
                                    ${example.logo || example.company?.charAt(0) || '?'}
                                </div>
                                <div>
                                    <h4 style="color: #fff; margin: 0; font-size: 18px;">${example.company || 'Example'}</h4>
                                    <p style="color: #999; margin: 5px 0 0 0; font-size: 14px;">${example.problem || ''}</p>
                                </div>
                            </div>
                            <p style="color: #ccc; line-height: 1.6; margin-bottom: 10px;">${example.story || ''}</p>
                            ${example.impact ? `<p style="color: #FF5500; font-weight: 600;">Impact: ${example.impact}</p>` : ''}
                            ${example.keyTakeaway ? `<p style="color: #999; font-style: italic; margin-top: 10px;">Key Takeaway: ${example.keyTakeaway}</p>` : ''}
                        </div>
                    `;
                } else {
                    html += `<div style="padding: 15px; background: rgba(0, 0, 0, 0.3); border-radius: 8px; margin-bottom: 10px;">${example}</div>`;
                }
            });
            
            html += `
                    </div>
                </div>
            `;
        }
        
        // Metrics section
        if (education.metrics && Array.isArray(education.metrics) && education.metrics.length > 0) {
            html += `
                <div class="education-section">
                    <h2 class="section-title">
                        <span class="section-icon">📊</span>
                        Key Metrics
                    </h2>
                    <div class="section-content">
                        <ul class="bullet-list">
            `;
            
            education.metrics.forEach(metric => {
                html += `<li>${metric}</li>`;
            });
            
            html += `
                        </ul>
                    </div>
                </div>
            `;
        }
        
        educationTab.innerHTML = html;
        console.log('✅ Education content updated successfully');
    }
    
    // Fallback education content
    function showFallbackEducationContent() {
        const educationTab = document.getElementById('education-tab');
        if (!educationTab) return;
        
        educationTab.innerHTML = `
            <div class="education-section">
                <h2 class="section-title">
                    <span class="section-icon">📚</span>
                    Educational Content
                </h2>
                <div class="section-content">
                    <p>Welcome to the ScaleOps6 educational content section. This area provides comprehensive guidance on GTM best practices and frameworks.</p>
                    <p style="margin-top: 20px;">Content is being loaded. Please check your connection or refresh the page if this message persists.</p>
                </div>
            </div>
        `;
    }
    
    console.log('✅ Education Tab Fix Applied');
});
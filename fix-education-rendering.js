// Fix for Education Tab Rendering Issues
(function() {
    console.log('🔧 Applying Education Tab Rendering Fix');
    
    // Wait for DOM to be ready
    function onReady(fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }
    
    onReady(function() {
        // Get subcomponent ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        
        // Override the updateEducationTab function with enhanced version
        window.updateEducationTab = function(education) {
            console.log('🎨 Enhanced Education Tab Renderer Active');
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
            
            // How to Implement section - FIXED RENDERING
            if (education.how) {
                html += `
                    <div class="education-section">
                        <h2 class="section-title">
                            <span class="section-icon">🚀</span>
                            How to Implement
                        </h2>
                        <div class="section-content">
                `;
                
                // Check if how is an object with steps
                if (typeof education.how === 'object' && education.how.steps) {
                    html += '<ol style="margin: 20px 0; padding-left: 0; list-style: none;">';
                    education.how.steps.forEach((step, index) => {
                        html += `
                            <li style="position: relative; padding: 15px 0 15px 40px; margin-bottom: 15px; border-left: 2px solid rgba(255, 85, 0, 0.2); transition: all 0.3s ease;">
                                <span style="position: absolute; left: 10px; color: #FF5500; font-weight: 700; font-size: 14px; background: rgba(255, 85, 0, 0.2); width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; line-height: 1;">
                                    ${index + 1}
                                </span>
                                ${step}
                            </li>
                        `;
                    });
                    html += '</ol>';
                } else if (typeof education.how === 'string') {
                    // If it's a string with HTML, use it directly
                    html += education.how;
                } else {
                    // If it's any other format, try to render it as text
                    html += `<p>${JSON.stringify(education.how)}</p>`;
                }
                
                html += `
                        </div>
                    </div>
                `;
            }
            
            // Real-World Examples section - FIXED RENDERING
            if (education.examples && Array.isArray(education.examples)) {
                html += `
                    <div class="education-section">
                        <h2 class="section-title">
                            <span class="section-icon">💼</span>
                            Real-World Examples
                        </h2>
                        <div class="section-content">
                `;
                
                // Check if examples are objects or strings
                if (education.examples.length > 0) {
                    if (typeof education.examples[0] === 'object') {
                        // Handle object format examples
                        html += '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 20px;">';
                        education.examples.forEach(example => {
                            if (example.company) {
                                html += `
                                    <div style="background: rgba(0, 0, 0, 0.5); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 20px; transition: all 0.3s ease;">
                                        <h3 style="color: #FF5500; margin-bottom: 10px;">${example.company}</h3>
                                        <p style="color: #ccc; line-height: 1.6; font-size: 14px;">${example.description || example.problem || ''}</p>
                                        ${example.outcome ? `<p style="color: #4CAF50; margin-top: 10px; font-size: 13px;"><strong>Outcome:</strong> ${example.outcome}</p>` : ''}
                                    </div>
                                `;
                            } else {
                                // Fallback for other object structures
                                html += `
                                    <div style="background: rgba(0, 0, 0, 0.5); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 20px;">
                                        <p style="color: #ccc; line-height: 1.6;">${JSON.stringify(example)}</p>
                                    </div>
                                `;
                            }
                        });
                        html += '</div>';
                    } else {
                        // Handle string format examples
                        html += '<ul class="bullet-list">';
                        education.examples.forEach(example => {
                            html += `<li>${example}</li>`;
                        });
                        html += '</ul>';
                    }
                }
                
                html += `
                        </div>
                    </div>
                `;
            }
            
            // Key Metrics section
            if (education.metrics && Array.isArray(education.metrics)) {
                html += `
                    <div class="education-section">
                        <h2 class="section-title">
                            <span class="section-icon">📊</span>
                            Key Metrics
                        </h2>
                        <div class="section-content">
                            <ul class="bullet-list">
                                ${education.metrics.map(metric => `<li>${metric}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                `;
            }
            
            // Templates section
            if (education.templates && Array.isArray(education.templates)) {
                html += `
                    <div class="education-section">
                        <h2 class="section-title">
                            <span class="section-icon">📄</span>
                            Available Templates
                        </h2>
                        <div class="section-content">
                            <div class="templates-list">
                                ${education.templates.map(template => `
                                    <div class="template-item" style="background: rgba(0, 0, 0, 0.5); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px; padding: 15px 20px; margin-bottom: 10px;">
                                        <div class="template-content">
                                            <div class="template-icon" style="display: inline-block; margin-right: 10px;">📄</div>
                                            <span class="template-name">${template}</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;
            }
            
            educationTab.innerHTML = html || '<div style="text-align: center; padding: 60px 20px; color: #999;">No educational content available.</div>';
        };
        
        // Remove progress dots
        const progressIndicator = document.querySelector('.progress-indicator');
        if (progressIndicator) {
            progressIndicator.style.display = 'none';
            console.log('✅ Progress dots removed');
        }
        
        // Ensure workspace analysis works for Problem Statement
        if (subcomponentId === '1-1') {
            // Override analyzeWorksheet for Problem Statement
            window.analyzeWorksheet = async function() {
                console.log('🤖 Analyzing Problem Statement Worksheet...');
                
                // Get worksheet data
                const worksheetData = {};
                const container = document.getElementById('dynamic-worksheet-container');
                if (container) {
                    const inputs = container.querySelectorAll('input, textarea');
                    inputs.forEach(input => {
                        if (input.id) {
                            worksheetData[input.id] = input.value;
                        }
                    });
                }
                
                // Check if worksheet has content
                const hasContent = Object.values(worksheetData).some(value => value && value.trim() !== '');
                if (!hasContent) {
                    alert('Please fill in the worksheet before analyzing.');
                    return;
                }
                
                // Switch to Analysis tab
                const analysisBtn = document.querySelector('[data-tab="analysis"]');
                if (analysisBtn) {
                    analysisBtn.click();
                }
                
                // Show loading state
                const analysisContent = document.getElementById('analysis-content');
                if (analysisContent) {
                    analysisContent.innerHTML = `
                        <div style="text-align: center; padding: 60px 20px;">
                            <div style="font-size: 48px; margin-bottom: 20px; animation: pulse 1.5s infinite;">🤖</div>
                            <h3 style="font-size: 24px; margin-bottom: 10px; color: #FF5500;">Analyzing Your Problem Statement...</h3>
                            <p style="font-size: 16px; color: #999;">Our GTM expert agent is evaluating your submission</p>
                        </div>
                    `;
                }
                
                try {
                    // Call the analysis API
                    const response = await fetch('/api/analyze/problem-statement', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            worksheetData,
                            subcomponentId,
                            uploadedDocs: []
                        })
                    });
                    
                    if (response.ok) {
                        const analysis = await response.json();
                        console.log('✅ Analysis complete:', analysis);
                        
                        // Display results
                        if (window.displayAnalysisResults) {
                            window.displayAnalysisResults(analysis);
                        }
                    } else {
                        throw new Error('Analysis failed');
                    }
                } catch (error) {
                    console.error('❌ Analysis error:', error);
                    if (analysisContent) {
                        analysisContent.innerHTML = `
                            <div style="text-align: center; padding: 60px 20px; color: #999;">
                                <div style="font-size: 48px; margin-bottom: 20px;">❌</div>
                                <h3 style="font-size: 24px; margin-bottom: 10px; color: #FF5500;">Analysis Error</h3>
                                <p style="font-size: 16px;">${error.message}</p>
                                <button class="btn-primary" style="margin-top: 20px;" onclick="window.analyzeWorksheet()">Retry</button>
                            </div>
                        `;
                    }
                }
            };
            
            console.log('✅ Problem Statement analysis handler configured');
        }
        
        // Re-trigger data loading to apply fixes
        if (window.loadSubcomponentData) {
            console.log('🔄 Re-loading subcomponent data with fixes...');
            window.loadSubcomponentData();
        }
    });
    
    console.log('✅ Education Tab Rendering Fix Applied');
})();
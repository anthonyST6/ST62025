// Fix for displaying ST6Co data in workspace
// This script ensures the workspace properly shows ST6Co-specific questions from the API

(function() {
    console.log('🔧 ST6Co Workspace Display Fix Loading...');
    
    // Store the original loadWorkspaceContent function if it exists
    const originalLoadWorkspace = window.loadWorkspaceContent || function() {};
    
    // Override the loadWorkspaceContent function to properly display ST6Co data
    window.loadWorkspaceContent = function(workspace) {
        console.log('📝 Loading ST6Co workspace content:', workspace);
        
        const workspaceContainer = document.getElementById('dynamic-worksheet-container');
        if (!workspaceContainer || !workspace || !workspace.questions) {
            console.error('Missing workspace container or data');
            return;
        }
        
        let html = '<div class="worksheet-builder">';
        
        // Group questions by category
        const categories = {};
        workspace.questions.forEach(q => {
            if (!categories[q.category]) {
                categories[q.category] = [];
            }
            categories[q.category].push(q);
        });
        
        // Render each category
        Object.keys(categories).forEach(category => {
            html += `
                <div class="worksheet-section" style="margin-bottom: 30px;">
                    <h3 style="color: #FF5500; margin-bottom: 20px; border-bottom: 2px solid #FF5500; padding-bottom: 10px;">
                        ${category}
                    </h3>
            `;
            
            categories[category].forEach(question => {
                if (question.type === 'info') {
                    // Display info blocks for ST6Co context
                    html += `
                        <div class="worksheet-field" style="background: rgba(255, 85, 0, 0.1); padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                            <div style="color: #FF5500; font-weight: bold; margin-bottom: 10px;">${question.question}</div>
                            <div style="color: #ccc;">
                                <div><strong>Company:</strong> ${question.content.company}</div>
                                <div><strong>Product:</strong> ${question.content.product}</div>
                                <div><strong>Description:</strong> ${question.content.description}</div>
                                <div><strong>Stage:</strong> ${question.content.stage}</div>
                            </div>
                        </div>
                    `;
                } else if (question.type === 'header') {
                    html += `
                        <h4 style="color: #FF5500; margin: 20px 0; font-size: 18px;">
                            ${question.question}
                        </h4>
                    `;
                } else if (question.type === 'text') {
                    // Text input questions with ST6Co defaults
                    html += `
                        <div class="worksheet-field" style="margin-bottom: 25px;">
                            <label class="worksheet-label" style="color: #FF5500; font-weight: 600; display: block; margin-bottom: 8px;">
                                ${question.question} ${question.required ? '<span style="color: #ff0000;">*</span>' : ''}
                            </label>
                            <textarea 
                                class="worksheet-textarea" 
                                id="${question.id}"
                                placeholder="${question.placeholder || ''}"
                                style="width: 100%; min-height: 120px; padding: 12px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 8px; color: #fff; font-size: 14px;"
                                ${question.required ? 'required' : ''}
                            >${question.defaultValue || ''}</textarea>
                        </div>
                    `;
                } else if (question.type === 'scale') {
                    // Scale questions for dimensions
                    html += `
                        <div class="worksheet-field" style="margin-bottom: 25px; padding: 15px; background: rgba(0, 0, 0, 0.3); border-radius: 8px;">
                            <label class="worksheet-label" style="color: #FF5500; font-weight: 600; display: block; margin-bottom: 8px;">
                                ${question.question}
                            </label>
                            <div style="color: #999; font-size: 13px; margin-bottom: 15px; font-style: italic;">
                                ${question.helpText || ''}
                            </div>
                            <div class="scale-options" style="display: flex; gap: 10px; flex-wrap: wrap;">
                    `;
                    
                    question.options.forEach(option => {
                        html += `
                            <label style="flex: 1; min-width: 100px; text-align: center; padding: 10px; background: rgba(255, 255, 255, 0.05); border: 2px solid transparent; border-radius: 8px; cursor: pointer; transition: all 0.3s;">
                                <input type="radio" name="${question.id}" value="${option.value}" style="display: none;">
                                <div style="font-size: 20px; margin-bottom: 5px;">${option.value}</div>
                                <div style="font-size: 12px; color: #999;">${option.label}</div>
                            </label>
                        `;
                    });
                    
                    html += `
                            </div>
                            <div style="margin-top: 10px; color: #666; font-size: 12px;">
                                Weight: ${question.weight}%
                            </div>
                        </div>
                    `;
                }
            });
            
            html += '</div>';
        });
        
        // Don't add buttons here - they already exist in the HTML
        html += '</div>';
        
        workspaceContainer.innerHTML = html;
        
        // Add interactivity to scale options
        document.querySelectorAll('.scale-options label').forEach(label => {
            label.addEventListener('click', function() {
                // Clear other selections in this group
                this.parentElement.querySelectorAll('label').forEach(l => {
                    l.style.borderColor = 'transparent';
                    l.style.background = 'rgba(255, 255, 255, 0.05)';
                });
                // Highlight selected
                this.style.borderColor = '#FF5500';
                this.style.background = 'rgba(255, 85, 0, 0.2)';
            });
        });
        
        console.log('✅ ST6Co workspace loaded successfully');
    };
    
    // Enhance the existing analyzeWorksheet function to include ST6Co context
    // Store original if it exists
    if (!window.originalAnalyzeWorksheet && window.analyzeWorksheet) {
        window.originalAnalyzeWorksheet = window.analyzeWorksheet;
    }
    
    window.analyzeWorksheet = async function() {
        console.log('🤖 Analyzing worksheet...');
        
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        
        // Collect all responses including ST6Co specific ones
        const responses = {};
        
        // Collect text responses
        document.querySelectorAll('.worksheet-textarea').forEach(textarea => {
            if (textarea.id && textarea.value) {
                responses[textarea.id] = textarea.value;
            }
        });
        
        // Collect scale responses
        document.querySelectorAll('input[type="radio"]:checked').forEach(radio => {
            responses[radio.name] = parseInt(radio.value);
        });
        
        console.log('Collected responses:', responses);
        
        try {
            const response = await fetch('/api/analysis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    subcomponentId: subcomponentId,
                    responses: responses  // Already correct - using "responses"
                })
            });
            
            if (response.ok) {
                const analysis = await response.json();
                displayST6Analysis(analysis, responses);
            } else {
                console.error('Analysis failed:', response.status);
                alert('Analysis failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during analysis:', error);
            alert('Error during analysis. Please check console.');
        }
    };
    
    // Ensure saveWorksheet function exists if not already defined
    if (!window.saveWorksheet) {
        window.saveWorksheet = function() {
            console.log('💾 Saving worksheet progress...');
            
            // Collect all responses
            const responses = {};
            
            // Collect text responses
            document.querySelectorAll('.worksheet-textarea').forEach(textarea => {
                if (textarea.id && textarea.value) {
                    responses[textarea.id] = textarea.value;
                }
            });
            
            // Collect scale responses
            document.querySelectorAll('input[type="radio"]:checked').forEach(radio => {
                responses[radio.name] = parseInt(radio.value);
            });
            
            // Save to localStorage
            const urlParams = new URLSearchParams(window.location.search);
            const subcomponentId = urlParams.get('id') || '1-1';
            localStorage.setItem(`worksheet_${subcomponentId}`, JSON.stringify(responses));
            
            alert('Progress saved successfully!');
        };
    }
    
    // Display analysis with ST6Co context
    window.displayST6Analysis = function(analysis, responses) {
        // Switch to analysis tab
        if (typeof switchTab === 'function') {
            switchTab('analysis');
        }
        
        const analysisContent = document.getElementById('analysis-content');
        if (!analysisContent) return;
        
        analysisContent.innerHTML = `
            <div style="background: rgba(255, 255, 255, 0.02); border-radius: 15px; padding: 30px;">
                <h3 style="color: #FF5500; margin-bottom: 20px;">
                    ST6Co/ScaleOps6Product Analysis Results
                </h3>
                
                <div style="background: rgba(255, 85, 0, 0.1); padding: 20px; border-radius: 10px; margin-bottom: 30px;">
                    <h4 style="color: #FF5500; margin-bottom: 15px;">Company Context</h4>
                    <div style="color: #ccc; line-height: 1.8;">
                        <div><strong>Company:</strong> ST6Co</div>
                        <div><strong>Product:</strong> ScaleOps6Product</div>
                        <div><strong>Problem Statement:</strong> ${responses.st6_problem || 'Not provided'}</div>
                        <div><strong>Solution:</strong> ${responses.st6_solution || 'Not provided'}</div>
                        <div><strong>Evidence:</strong> ${responses.st6_evidence || 'Not provided'}</div>
                    </div>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                    <div style="font-size: 72px; font-weight: 800; color: ${analysis.score >= 80 ? '#4CAF50' : analysis.score >= 60 ? '#FF9800' : '#F44336'};">
                        ${analysis.score}%
                    </div>
                    <div style="font-size: 18px; color: #999; margin-top: 10px;">
                        Overall Score for ${analysis.agentName}
                    </div>
                </div>
                
                <div style="margin-top: 30px;">
                    <h4 style="color: #FF5500; margin-bottom: 15px;">Strengths</h4>
                    <ul style="color: #ccc; line-height: 1.8;">
                        ${analysis.strengths.map(s => `<li>${s}</li>`).join('')}
                    </ul>
                </div>
                
                <div style="margin-top: 30px;">
                    <h4 style="color: #FF5500; margin-bottom: 15px;">Areas for Improvement</h4>
                    <ul style="color: #ccc; line-height: 1.8;">
                        ${analysis.weaknesses.map(w => `<li>${w}</li>`).join('')}
                    </ul>
                </div>
                
                <div style="margin-top: 30px;">
                    <h4 style="color: #FF5500; margin-bottom: 15px;">Recommendations for ScaleOps6Product</h4>
                    <ul style="color: #ccc; line-height: 1.8;">
                        ${analysis.recommendations.map(r => `<li>${r}</li>`).join('')}
                    </ul>
                </div>
                
                ${responses.st6_next_steps ? `
                <div style="margin-top: 30px;">
                    <h4 style="color: #FF5500; margin-bottom: 15px;">Your Identified Next Steps</h4>
                    <div style="color: #ccc; padding: 15px; background: rgba(0, 0, 0, 0.3); border-radius: 8px;">
                        ${responses.st6_next_steps}
                    </div>
                </div>
                ` : ''}
                
                ${responses.st6_blockers ? `
                <div style="margin-top: 30px;">
                    <h4 style="color: #FF5500; margin-bottom: 15px;">Identified Blockers</h4>
                    <div style="color: #ccc; padding: 15px; background: rgba(255, 0, 0, 0.1); border-radius: 8px;">
                        ${responses.st6_blockers}
                    </div>
                </div>
                ` : ''}
                
                <div style="margin-top: 30px; display: flex; gap: 15px;">
                    <button class="btn-primary" onclick="saveST6Results(${analysis.score}, '${analysis.agentName}')" style="background: #FF5500; color: #fff; border: none; padding: 12px 30px; border-radius: 25px; font-size: 16px; font-weight: 600; cursor: pointer;">
                        💾 Save ST6Co Results
                    </button>
                    <button class="btn-secondary" onclick="exportST6Report('${analysis.agentName}', ${analysis.score})" style="background: transparent; color: #FF5500; border: 2px solid #FF5500; padding: 12px 30px; border-radius: 25px; font-size: 16px; font-weight: 600; cursor: pointer;">
                        📄 Export ST6Co Report
                    </button>
                </div>
            </div>
        `;
    };
    
    // Save ST6Co results
    window.saveST6Results = async function(score, agentName) {
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        
        try {
            const response = await fetch('/api/score-history', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    subcomponentId: subcomponentId,
                    score: score,
                    agentName: agentName,
                    company: 'ST6Co',
                    product: 'ScaleOps6Product',
                    timestamp: new Date().toISOString()
                })
            });
            
            if (response.ok) {
                alert('ST6Co results saved successfully!');
            }
        } catch (error) {
            console.error('Error saving results:', error);
        }
    };
    
    // Export ST6Co report
    window.exportST6Report = function(agentName, score) {
        alert(`Exporting ST6Co/ScaleOps6Product report for ${agentName} with score ${score}%`);
        // In a real implementation, this would generate a PDF with ST6Co branding
    };
    
    // Wait for DOM and then check if we need to reload workspace
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(() => {
                // Check if workspace tab is active and reload with ST6Co data
                const workspaceTab = document.getElementById('workspace-tab');
                if (workspaceTab && workspaceTab.classList.contains('active')) {
                    console.log('Reloading workspace with ST6Co data...');
                    // Trigger reload of workspace data
                    const urlParams = new URLSearchParams(window.location.search);
                    const subcomponentId = urlParams.get('id') || '1-1';
                    fetch(`/api/subcomponents/${subcomponentId}`)
                        .then(res => res.json())
                        .then(data => {
                            if (data.workspace) {
                                loadWorkspaceContent(data.workspace);
                            }
                        });
                }
            }, 500);
        });
    }
    
    console.log('✅ ST6Co Workspace Display Fix Loaded');
})();
// Fix to ensure API data is displayed in education tab
(function() {
    'use strict';
    
    console.log('🔧 Fixing education API display...');
    
    // Wait for the original loadSubcomponentData to be defined
    const originalInterval = setInterval(() => {
        if (typeof window.loadSubcomponentData === 'function') {
            clearInterval(originalInterval);
            
            // Store the original function
            const originalLoadSubcomponentData = window.loadSubcomponentData;
            
            // Override with a version that ensures API data is displayed
            window.loadSubcomponentData = async function() {
                try {
                    // Get subcomponent ID from URL
                    const urlParams = new URLSearchParams(window.location.search);
                    const subcomponentId = urlParams.get('id') || '1-1';
                    
                    console.log('📡 Fetching from API for:', subcomponentId);
                    
                    // Fetch from API
                    const response = await fetch(`/api/subcomponents/${subcomponentId}`);
                    
                    if (response.ok) {
                        const data = await response.json();
                        console.log('✅ API data received:', data);
                        
                        // Update page title and description
                        const titleElement = document.getElementById('subcomponent-title');
                        if (titleElement && data.name) {
                            titleElement.textContent = data.name.toUpperCase();
                        }
                        
                        const descElement = document.getElementById('subcomponent-description');
                        if (descElement && data.description) {
                            descElement.textContent = data.description;
                        }
                        
                        // Update education tab with API data
                        if (data.education) {
                            const educationTab = document.getElementById('education-tab');
                            if (educationTab) {
                                let html = '';
                                
                                // Overview section
                                if (data.education.overview) {
                                    html += `
                                        <div class="education-section">
                                            <h2 class="section-title">
                                                <span class="section-icon">🎯</span>
                                                Overview
                                            </h2>
                                            <div class="section-content">
                                                <p>${data.education.overview}</p>
                                            </div>
                                        </div>
                                    `;
                                }
                                
                                // Key Principles
                                if (data.education.keyPrinciples && data.education.keyPrinciples.length > 0) {
                                    html += `
                                        <div class="education-section">
                                            <h2 class="section-title">
                                                <span class="section-icon">💡</span>
                                                Key Principles
                                            </h2>
                                            <div class="section-content">
                                                <ul class="bullet-list">
                                                    ${data.education.keyPrinciples.map(principle => 
                                                        `<li>${principle}</li>`
                                                    ).join('')}
                                                </ul>
                                            </div>
                                        </div>
                                    `;
                                }
                                
                                // Learning Objectives
                                if (data.education.learningObjectives && data.education.learningObjectives.length > 0) {
                                    html += `
                                        <div class="education-section">
                                            <h2 class="section-title">
                                                <span class="section-icon">🎓</span>
                                                Learning Objectives
                                            </h2>
                                            <div class="section-content">
                                                <ul class="bullet-list">
                                                    ${data.education.learningObjectives.map(objective => 
                                                        `<li>${objective}</li>`
                                                    ).join('')}
                                                </ul>
                                            </div>
                                        </div>
                                    `;
                                }
                                
                                // Resources
                                if (data.education.resources && data.education.resources.length > 0) {
                                    html += `
                                        <div class="education-section">
                                            <h2 class="section-title">
                                                <span class="section-icon">📚</span>
                                                Educational Resources
                                            </h2>
                                            <div class="section-content">
                                                <div class="resources-grid">
                                                    ${data.education.resources.map(resource => `
                                                        <div class="resource-card">
                                                            <div class="resource-icon">
                                                                ${resource.type === 'video' ? '🎥' : 
                                                                  resource.type === 'article' ? '📄' : 
                                                                  resource.type === 'template' ? '📋' : '📖'}
                                                            </div>
                                                            <div class="resource-title">${resource.title}</div>
                                                            <div class="resource-description">
                                                                ${resource.duration || resource.readTime || 'Available'}
                                                            </div>
                                                        </div>
                                                    `).join('')}
                                                </div>
                                            </div>
                                        </div>
                                    `;
                                }
                                
                                // Set the HTML content
                                educationTab.innerHTML = html;
                                console.log('✅ Education content updated');
                            }
                        }
                        
                        // Load workspace questions
                        if (data.workspace && data.workspace.questions) {
                            const worksheetContainer = document.getElementById('dynamic-worksheet-container');
                            if (worksheetContainer) {
                                let worksheetHtml = '<div class="worksheet-builder">';
                                
                                data.workspace.questions.forEach((question, index) => {
                                    if (question.type === 'scale') {
                                        worksheetHtml += `
                                            <div class="worksheet-field">
                                                <label class="worksheet-label">${question.question}</label>
                                                <div style="display: flex; gap: 10px; margin-top: 10px;">
                                                    ${question.options.map(opt => `
                                                        <button class="answer-btn" data-question="${question.id}" data-value="${opt.value}" 
                                                                style="flex: 1; padding: 10px; background: rgba(255,255,255,0.05); 
                                                                       border: 1px solid rgba(255,255,255,0.2); color: #fff; 
                                                                       border-radius: 8px; cursor: pointer;">
                                                            ${opt.label}
                                                        </button>
                                                    `).join('')}
                                                </div>
                                                <small style="color: #999; display: block; margin-top: 8px;">
                                                    ${question.helpText || ''}
                                                </small>
                                            </div>
                                        `;
                                    } else if (question.type === 'text') {
                                        worksheetHtml += `
                                            <div class="worksheet-field">
                                                <label class="worksheet-label">${question.question}</label>
                                                <textarea class="worksheet-textarea" 
                                                          placeholder="${question.placeholder || ''}"
                                                          data-question="${question.id}"></textarea>
                                            </div>
                                        `;
                                    }
                                });
                                
                                worksheetHtml += '</div>';
                                worksheetContainer.innerHTML = worksheetHtml;
                                console.log('✅ Workspace questions loaded');
                            }
                        }
                        
                        // Load templates
                        if (data.templates && data.templates.length > 0) {
                            const templatesContainer = document.getElementById('resource-templates');
                            if (templatesContainer) {
                                templatesContainer.innerHTML = data.templates.map(template => `
                                    <div class="template-item">
                                        <div class="template-content">
                                            <div class="template-icon">📄</div>
                                            <div style="flex: 1;">
                                                <h4 class="template-name">${template.name}</h4>
                                                <p style="font-size: 13px; color: #999; margin-top: 4px;">
                                                    ${template.description} • ${template.format} • ${template.pages} pages
                                                </p>
                                            </div>
                                        </div>
                                        <button class="template-action" onclick="alert('Template download: ${template.name}')">
                                            Download
                                        </button>
                                    </div>
                                `).join('');
                                console.log('✅ Templates loaded');
                            }
                        }
                        
                        // Load resources
                        if (data.resources && data.resources.length > 0) {
                            // Add resources section if not already in templates
                            const resourcesTab = document.getElementById('resources-tab');
                            if (resourcesTab && !document.getElementById('additional-resources')) {
                                const additionalHtml = `
                                    <div class="workspace-section" id="additional-resources">
                                        <h2 class="section-title">
                                            <span class="section-icon">📦</span>
                                            Additional Resources
                                        </h2>
                                        <div class="resources-grid">
                                            ${data.resources.map(resource => `
                                                <div class="resource-card">
                                                    <div class="resource-icon">
                                                        ${resource.type === 'PDF' ? '📄' : 
                                                          resource.type === 'DOCX' ? '📝' : 
                                                          resource.type === 'PPTX' ? '📊' : '📁'}
                                                    </div>
                                                    <div class="resource-title">${resource.title}</div>
                                                    <div class="resource-description">
                                                        ${resource.description} • ${resource.size}
                                                    </div>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>
                                `;
                                resourcesTab.insertAdjacentHTML('beforeend', additionalHtml);
                                console.log('✅ Resources loaded');
                            }
                        }
                        
                    } else {
                        console.error('API request failed:', response.status);
                    }
                } catch (error) {
                    console.error('Error loading data:', error);
                }
            };
            
            // Trigger the load
            window.loadSubcomponentData();
            console.log('✅ Education API display fix applied');
        }
    }, 100);
    
    // Also trigger on page load if needed
    if (document.readyState === 'complete') {
        setTimeout(() => {
            if (typeof window.loadSubcomponentData === 'function') {
                window.loadSubcomponentData();
            }
        }, 500);
    }
})();
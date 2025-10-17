/**
 * Unified Content Service - Single Source of Truth for All Content
 * This service manages all content injection to prevent race conditions
 * and ensure SSOT compliance
 */

(function() {
    'use strict';
    
    console.log('🎯 Unified Content Service initializing...');
    
    // Global Unified Content Service
    window.UnifiedContentService = {
        // Content registry
        registry: {
            ssot: {},           // From API
            realWorld: {},      // Real world examples
            templates: {},      // Templates
            workspace: {},      // Workspace content
            education: {}       // Education content
        },
        
        // Track initialization state
        initialized: false,
        pendingCallbacks: [],
        
        // Initialize the service
        async initialize(subcomponentId) {
            console.log(`📦 Initializing Unified Content Service for ${subcomponentId}`);
            
            try {
                // 1. Load SSOT data from API
                const ssotData = await this.loadSSOT(subcomponentId);
                this.registry.ssot = ssotData;
                
                // 2. Load Real World Examples
                await this.loadRealWorldExamples(subcomponentId);
                
                // 3. Mark as initialized
                this.initialized = true;
                
                // 4. Execute pending callbacks
                this.pendingCallbacks.forEach(cb => cb());
                this.pendingCallbacks = [];
                
                console.log('✅ Unified Content Service initialized');
                
                // 5. Render all content
                this.renderAllContent();
                
            } catch (error) {
                console.error('❌ Failed to initialize Unified Content Service:', error);
            }
        },
        
        // Load SSOT data from API
        async loadSSOT(subcomponentId) {
            try {
                const response = await fetch(`/api/subcomponents/${subcomponentId}`);
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return await response.json();
            } catch (error) {
                console.error('❌ Failed to load SSOT:', error);
                return {};
            }
        },
        
        // Load Real World Examples
        async loadRealWorldExamples(subcomponentId) {
            return new Promise((resolve) => {
                // Check if database is already loaded
                if (window.realWorldExamplesComplete) {
                    const exampleData = window.realWorldExamplesComplete[subcomponentId];
                    if (exampleData) {
                        this.registry.realWorld = exampleData;
                        console.log(`✅ Real World Examples loaded for ${subcomponentId}:`, exampleData.title);
                    } else {
                        console.warn(`⚠️ No Real World Examples found for ${subcomponentId}`);
                        this.registry.realWorld = {};
                    }
                    resolve();
                    return;
                }
                
                // Load the database - use the complete version with all 96 subcomponents
                const script = document.createElement('script');
                script.src = 'real-world-examples-complete-96-final.js';
                script.onload = () => {
                    if (window.realWorldExamplesComplete) {
                        const exampleData = window.realWorldExamplesComplete[subcomponentId];
                        if (exampleData) {
                            this.registry.realWorld = exampleData;
                            console.log(`✅ Real World Examples database loaded for ${subcomponentId}:`, exampleData.title);
                        } else {
                            console.warn(`⚠️ No Real World Examples found for ${subcomponentId} after loading database`);
                            this.registry.realWorld = {};
                        }
                    }
                    resolve();
                };
                script.onerror = () => {
                    console.error('❌ Failed to load Real World Examples database');
                    resolve();
                };
                document.head.appendChild(script);
            });
        },
        
        // Render all content in coordinated manner
        renderAllContent() {
            console.log('🎨 Rendering all content...');
            
            // 1. Render header content
            this.renderHeader();
            
            // 2. Render education tab
            this.renderEducationTab();
            
            // 3. Render Real World Examples
            this.renderRealWorldExamples();
            
            // 4. Render resources
            this.renderResources();
        },
        
        // Render header content
        renderHeader() {
            const data = this.registry.ssot;
            if (!data) return;
            
            // Update title - Use subcomponent name, not agent name
            const titleElement = document.getElementById('subcomponent-title');
            if (titleElement && data.name) {
                titleElement.textContent = data.name.toUpperCase();
            }
            
            // Update description
            const descElement = document.getElementById('subcomponent-description');
            if (descElement && data.description) {
                descElement.textContent = data.description;
            }
            
            // Update breadcrumb
            const nameElement = document.getElementById('subcomponent-name');
            if (nameElement && data.name) {
                nameElement.textContent = data.name;
            }
            
            // Update block link
            const blockLink = document.getElementById('block-link');
            if (blockLink && data.blockName) {
                blockLink.textContent = data.blockName;
                const blockId = data.id ? data.id.split('-')[0] : '1';
                blockLink.href = `block-detail.html?id=${blockId}`;
            }
        },
        
        // Render education tab
        renderEducationTab() {
            const education = this.registry.ssot.education;
            if (!education) return;
            
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
                            ${education.how}
                        </div>
                    </div>
                `;
            }
            
            educationTab.innerHTML = html;
        },
        
        // Render Real World Examples section
        renderRealWorldExamples() {
            console.log('🌍 Rendering Real World Examples...');
            
            const educationTab = document.getElementById('education-tab');
            if (!educationTab) {
                console.error('❌ Education tab not found');
                return;
            }
            
            // Get examples from registry - handle both structures
            let examples = [];
            if (this.registry.realWorld) {
                if (this.registry.realWorld.examples && Array.isArray(this.registry.realWorld.examples)) {
                    // Standard structure with title and examples
                    examples = this.registry.realWorld.examples;
                } else if (Array.isArray(this.registry.realWorld)) {
                    // Direct array of examples
                    examples = this.registry.realWorld;
                }
            }
            
            if (examples.length === 0) {
                console.warn('⚠️ No Real World Examples found in registry for this subcomponent');
                // Don't render the section if there are no examples
                return;
            }
            
            console.log(`✅ Found ${examples.length} Real World Examples`);
            
            // Remove any existing Real World section
            const existingSection = educationTab.querySelector('.real-world-use-cases-section');
            if (existingSection) {
                existingSection.remove();
            }
            
            // Create the Real World Examples section
            const sectionHTML = `
                <div class="education-section real-world-use-cases-section">
                    <h2 class="section-title">
                        <span class="section-icon">💼</span>
                        Real-World Examples
                    </h2>
                    <div class="section-content">
                        <p style="margin-bottom: 25px; color: #ccc; line-height: 1.6;">
                            Learn from successful companies that built billion-dollar businesses by solving clear, specific problems:
                        </p>
                        
                        <!-- Grid layout for case studies -->
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 25px; margin-top: 20px;">
                            ${examples.slice(0, 6).map(example => `
                                <div style="
                                    background: linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5));
                                    border: 1px solid rgba(255, 255, 255, 0.1);
                                    border-radius: 15px;
                                    padding: 25px;
                                    transition: all 0.3s ease;
                                    cursor: pointer;
                                    position: relative;
                                    overflow: hidden;
                                    min-height: 280px;
                                "
                                onmouseover="this.style.borderColor='#FF5500'; this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 30px rgba(255, 85, 0, 0.3)'"
                                onmouseout="this.style.borderColor='rgba(255, 255, 255, 0.1)'; this.style.transform='translateY(0)'; this.style.boxShadow='none'"
                                onclick="UnifiedContentService.showExampleDetails('${example.company.replace(/'/g, "\\'")}')">
                                    <div style="position: absolute; top: 0; right: 0; width: 100px; height: 100px; background: radial-gradient(circle at top right, rgba(255, 85, 0, 0.2), transparent); pointer-events: none;"></div>
                                    <h3 style="color: #FF5500; margin-bottom: 15px; font-size: 22px; font-weight: 700;">
                                        ${example.company}
                                    </h3>
                                    <div style="background: rgba(255, 85, 0, 0.1); border-left: 3px solid #FF5500; padding: 15px; margin-bottom: 15px; border-radius: 5px; flex: 1;">
                                        <p style="color: #fff; font-weight: 600; margin-bottom: 10px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">
                                            Use Case:
                                        </p>
                                        <p style="color: #ccc; line-height: 1.7; font-size: 13px;">
                                            "${example.useCase}"
                                        </p>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 15px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                                        <span style="color: #4CAF50; font-size: 24px; font-weight: 700;">
                                            ${example.valuation}
                                        </span>
                                        <span style="color: #999; font-size: 13px;">
                                            ${example.year || 'Valuation'}
                                        </span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <!-- Additional info section -->
                        <div style="margin-top: 30px; padding: 20px; background: rgba(255, 85, 0, 0.05); border: 1px solid rgba(255, 85, 0, 0.2); border-radius: 10px;">
                            <p style="color: #FF5500; font-size: 14px; margin: 0;">
                                💡 <strong>Key Insight:</strong> Each of these companies started by solving a specific, well-defined problem for a clear target audience. Their success came from deeply understanding customer pain points and building focused solutions.
                            </p>
                        </div>
                    </div>
                </div>
            `;
            
            // Insert after the How to Implement section or at the end
            const howToSection = Array.from(educationTab.querySelectorAll('.education-section')).find(
                section => section.querySelector('.section-title')?.textContent.includes('How to Implement')
            );
            
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = sectionHTML;
            const newSection = tempDiv.firstElementChild;
            
            if (howToSection && howToSection.nextSibling) {
                howToSection.parentNode.insertBefore(newSection, howToSection.nextSibling);
            } else {
                educationTab.appendChild(newSection);
            }
            
            console.log('✅ Real World Examples section rendered successfully!');
        },
        
        // Show example details modal
        showExampleDetails(company) {
            const examples = this.registry.realWorld?.examples || this.registry.realWorld || [];
            const example = examples.find(e => e.company === company);
            
            if (!example) return;
            
            // Create modal
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.95);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                animation: fadeIn 0.3s ease;
            `;
            
            modal.innerHTML = `
                <div style="background: #1a1a1a; border: 2px solid #FF5500; border-radius: 20px; max-width: 800px; max-height: 90vh; overflow-y: auto; width: 100%; padding: 40px; position: relative;">
                    <button onclick="this.closest('div').parentElement.remove()" style="position: absolute; top: 20px; right: 20px; background: transparent; border: none; color: #999; font-size: 32px; cursor: pointer;">×</button>
                    
                    <h2 style="color: #FF5500; font-size: 32px; margin-bottom: 10px;">${example.company}</h2>
                    <div style="color: #999; font-size: 14px; margin-bottom: 30px;">${example.category || ''} • ${example.year || ''}</div>
                    
                    <div style="background: rgba(255, 85, 0, 0.1); border-left: 4px solid #FF5500; padding: 20px; margin-bottom: 30px; border-radius: 8px;">
                        <h3 style="color: #FF5500; font-size: 18px; margin-bottom: 15px;">📋 Use Case</h3>
                        <p style="color: #ccc; line-height: 1.8; font-size: 15px;">${example.useCase}</p>
                    </div>
                    
                    ${example.keyElements && example.keyElements.length > 0 ? `
                    <div style="margin-bottom: 30px;">
                        <h3 style="color: #FF5500; font-size: 18px; margin-bottom: 15px;">🔑 Key Elements</h3>
                        <ul style="list-style: none; padding: 0;">
                            ${example.keyElements.map(element => `
                                <li style="padding: 10px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1); color: #ccc; display: flex; align-items: start;">
                                    <span style="color: #FF5500; margin-right: 10px;">▸</span>
                                    ${element}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    ` : ''}
                    
                    ${example.outcome ? `
                    <div style="background: rgba(76, 175, 80, 0.1); border-left: 4px solid #4CAF50; padding: 20px; margin-bottom: 30px; border-radius: 8px;">
                        <h3 style="color: #4CAF50; font-size: 18px; margin-bottom: 15px;">✨ Outcome</h3>
                        <p style="color: #ccc; line-height: 1.8; font-size: 15px;">${example.outcome}</p>
                    </div>
                    ` : ''}
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 20px; border-top: 2px solid rgba(255, 255, 255, 0.1);">
                        <div>
                            <div style="color: #999; font-size: 14px;">Valuation</div>
                            <div style="color: #4CAF50; font-size: 28px; font-weight: 700;">${example.valuation}</div>
                        </div>
                        <button onclick="this.closest('div').parentElement.parentElement.remove()" style="background: #FF5500; color: #fff; border: none; padding: 12px 30px; border-radius: 25px; font-size: 16px; font-weight: 600; cursor: pointer;">
                            Close
                        </button>
                    </div>
                </div>
            `;
            
            // Add fade-in animation if not already present
            if (!document.head.querySelector('style[data-modal-animations]')) {
                const style = document.createElement('style');
                style.setAttribute('data-modal-animations', 'true');
                style.textContent = `
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                `;
                document.head.appendChild(style);
            }
            
            document.body.appendChild(modal);
            
            // Close on escape key
            const closeOnEscape = (e) => {
                if (e.key === 'Escape') {
                    modal.remove();
                    document.removeEventListener('keydown', closeOnEscape);
                }
            };
            document.addEventListener('keydown', closeOnEscape);
            
            // Close on background click
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.remove();
                }
            });
        },
        
        // Render resources
        renderResources() {
            const resources = this.registry.ssot.resources;
            if (!resources || !resources.templates) return;
            
            const templatesContainer = document.getElementById('resource-templates');
            if (!templatesContainer) return;
            
            if (resources.templates.length > 0) {
                templatesContainer.innerHTML = resources.templates.map((template, index) => `
                    <div class="template-item" style="
                        background: rgba(0, 0, 0, 0.5);
                        border: 1px solid rgba(255, 85, 0, 0.3);
                        border-radius: 10px;
                        padding: 20px;
                        transition: all 0.3s ease;
                        margin-bottom: 15px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    ">
                        <div class="template-content" style="display: flex; align-items: center; gap: 15px; flex: 1;">
                            <div class="template-icon" style="
                                background: linear-gradient(135deg, #FF5500, #FF8800);
                                width: 50px;
                                height: 50px;
                                border-radius: 10px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-size: 24px;
                            ">📄</div>
                            <div style="flex: 1;">
                                <h4 class="template-name" style="color: #fff; font-size: 16px; margin: 0 0 5px 0;">
                                    ${template}
                                </h4>
                                <p style="font-size: 13px; color: #999; margin: 0;">
                                    Professional ScaleOps6 template ready for download
                                </p>
                            </div>
                        </div>
                        <button class="template-action"
                                onclick="UnifiedContentService.downloadTemplate('${template}')"
                                style="
                                    background: linear-gradient(135deg, #4CAF50, #66BB6A);
                                    color: white;
                                    border: none;
                                    padding: 10px 20px;
                                    border-radius: 8px;
                                    font-size: 14px;
                                    font-weight: 600;
                                    cursor: pointer;
                                    transition: all 0.3s ease;
                                ">
                            ⬇️ Download
                        </button>
                    </div>
                `).join('');
            }
        },
        
        // Download template
        downloadTemplate(templateName) {
            const urlParams = new URLSearchParams(window.location.search);
            const subcomponentId = urlParams.get('id') || '1-1';
            
            const content = `${templateName}

Company: ST6Co
Product: ScaleOps6Product
Date: ${new Date().toLocaleDateString()}
Subcomponent: ${subcomponentId}

[Template content - customize based on your needs]

This is a professional template from the ScaleOps6 Platform.
Use this framework to structure your ${templateName.toLowerCase()}.

Generated by ScaleOps6 Platform
${new Date().toLocaleString()}`;
            
            const blob = new Blob([content], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${templateName.toLowerCase().replace(/\s+/g, '-')}-${subcomponentId}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            
            this.showNotification(`✅ ${templateName} downloaded successfully!`);
        },
        
        // Show notification
        showNotification(message) {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #4CAF50, #66BB6A);
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                box-shadow: 0 5px 20px rgba(76, 175, 80, 0.3);
                z-index: 10000;
                font-weight: 600;
            `;
            notification.textContent = message;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 3000);
        },
        
        // Wait for initialization
        whenReady(callback) {
            if (this.initialized) {
                callback();
            } else {
                this.pendingCallbacks.push(callback);
            }
        }
    };
    
    // Auto-initialize when DOM is ready
    function autoInitialize() {
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        
        console.log(`🚀 Auto-initializing Unified Content Service for ${subcomponentId}`);
        window.UnifiedContentService.initialize(subcomponentId);
    }
    
    // Start initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', autoInitialize);
    } else {
        // DOM already loaded
        setTimeout(autoInitialize, 100);
    }
    
    console.log('✅ Unified Content Service loaded');
    
})();
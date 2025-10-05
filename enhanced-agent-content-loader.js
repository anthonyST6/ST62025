// Enhanced Agent Content Loader with Proper Education Tab Formatting
// This ensures the Education tab displays with proper 2-column layout and examples section

(function() {
    'use strict';
    
    // Load the enhanced content
    const script = document.createElement('script');
    script.src = 'fix-education-content-complete.js';
    document.head.appendChild(script);
    
    const AgentContentLoader = {
        initialized: false,
        contentCache: {},
        
        // Initialize the content system
        async initialize() {
            if (this.initialized) return;
            
            // Wait for enhanced content to load
            let attempts = 0;
            while (!window.EnhancedAgentEducationContent && attempts < 50) {
                await new Promise(resolve => setTimeout(resolve, 100));
                attempts++;
            }
            
            if (window.EnhancedAgentEducationContent) {
                this.contentCache = window.EnhancedAgentEducationContent;
                this.initialized = true;
                console.log('✅ Enhanced Agent Content Loader initialized with', Object.keys(this.contentCache).length, 'agents');
            } else {
                console.error('❌ Failed to load enhanced agent content');
            }
        },
        
        // Get properly formatted education content for a subcomponent
        getEducationContent(subcomponentId) {
            const content = this.contentCache[subcomponentId];
            if (!content) {
                console.warn(`No content found for ${subcomponentId}`);
                return null;
            }
            
            // Generate properly formatted HTML with 2-column layout
            const html = `
                <!-- Education Content for ${content.agentName} -->
                <div class="education-section">
                    <h2 class="section-title">
                        <span class="section-icon">🎯</span>
                        What is ${content.title}?
                    </h2>
                    <div class="section-content">
                        <p>${content.what}</p>
                        ${content.metrics ? `
                        <div style="margin-top: 20px;">
                            <strong style="color: #FF5500;">Key metrics to track:</strong>
                            <ul class="bullet-list" style="margin-top: 10px;">
                                ${content.metrics.map(metric => `<li>${metric}</li>`).join('')}
                            </ul>
                        </div>
                        ` : ''}
                    </div>
                </div>

                <div class="education-section">
                    <h2 class="section-title">
                        <span class="section-icon">💡</span>
                        Why It Matters
                    </h2>
                    <div class="section-content">
                        <p>${content.why}</p>
                    </div>
                </div>

                <!-- Two Column Layout for How to Implement -->
                <div class="education-section">
                    <h2 class="section-title">
                        <span class="section-icon">🚀</span>
                        ${content.how.title}
                    </h2>
                    <div class="section-content">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
                            <!-- Left Column: Steps -->
                            <div>
                                <h3 style="color: #FF5500; margin-bottom: 20px;">Follow our 5-step process:</h3>
                                <ol style="list-style: none; padding: 0; counter-reset: step-counter;">
                                    ${content.how.steps.map((step, index) => `
                                    <li style="margin-bottom: 20px; padding-left: 40px; position: relative; counter-increment: step-counter;">
                                        <span style="position: absolute; left: 0; top: 0; background: #FF5500; color: #000; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700;">
                                            ${index + 1}
                                        </span>
                                        <div style="line-height: 1.6;">${step}</div>
                                    </li>
                                    `).join('')}
                                </ol>
                            </div>
                            
                            <!-- Right Column: Best Practices -->
                            <div>
                                <h3 style="color: #FF5500; margin-bottom: 20px;">Best Practices:</h3>
                                <ul style="list-style: none; padding: 0;">
                                    ${content.how.bestPractices.map(practice => `
                                    <li style="margin-bottom: 15px; padding-left: 30px; position: relative;">
                                        <span style="position: absolute; left: 0; top: 2px; color: #4CAF50; font-size: 20px;">✓</span>
                                        <div style="line-height: 1.6;">${practice}</div>
                                    </li>
                                    `).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Real-World Examples Section (Full Width) -->
                <div class="education-section" style="margin-top: 40px;">
                    <h2 class="section-title">
                        <span class="section-icon">💼</span>
                        Real-World Examples
                    </h2>
                    <div class="section-content">
                        <p style="margin-bottom: 25px;">Learn from successful implementations:</p>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                            ${content.examples.map(example => `
                            <div style="background: rgba(0, 0, 0, 0.5); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 20px; transition: all 0.3s ease; cursor: pointer;"
                                 onmouseover="this.style.transform='translateY(-3px)'; this.style.borderColor='#FF5500'; this.style.boxShadow='0 5px 20px rgba(255, 85, 0, 0.2)';"
                                 onmouseout="this.style.transform=''; this.style.borderColor='rgba(255, 255, 255, 0.1)'; this.style.boxShadow='';">
                                <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 12px;">
                                    <div style="width: 48px; height: 48px; background: rgba(255, 85, 0, 0.1); border-radius: 10px; display: flex; align-items: center; justify-content: center;">
                                        <span style="font-size: 24px; font-weight: 700; color: #FF5500;">
                                            ${example.company.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <h4 style="color: #fff; margin: 0; font-size: 18px; font-weight: 600;">
                                            ${example.company}
                                        </h4>
                                    </div>
                                </div>
                                <p style="color: #ccc; font-size: 14px; line-height: 1.5; margin-bottom: 12px;">
                                    ${example.problem}
                                </p>
                                <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 12px; border-top: 1px solid rgba(255, 255, 255, 0.05);">
                                    <span style="color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Impact</span>
                                    <span style="color: #4CAF50; font-weight: 600; font-size: 16px;">
                                        ${example.impact}
                                    </span>
                                </div>
                            </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
            
            return {
                html: html,
                agentName: content.agentName,
                title: content.title
            };
        },
        
        // Get resource templates for a subcomponent
        getResourceTemplates(subcomponentId) {
            const content = this.contentCache[subcomponentId];
            if (!content || !content.templates) return [];
            
            return content.templates.map(template => ({
                name: template.name || template,
                icon: template.icon || '📄',
                description: template.description || 'Professional template for your GTM needs'
            }));
        },
        
        // Get analysis framework for scoring
        getAnalysisFramework(subcomponentId) {
            const content = this.contentCache[subcomponentId];
            if (!content || !content.analysisFramework) {
                // Return default framework
                return {
                    dimensions: [
                        { name: 'Completeness', weight: 20, description: 'How complete is the implementation?' },
                        { name: 'Quality', weight: 20, description: 'Quality of execution' },
                        { name: 'Impact', weight: 20, description: 'Measurable business impact' },
                        { name: 'Scalability', weight: 20, description: 'Ability to scale' },
                        { name: 'Sustainability', weight: 20, description: 'Long-term viability' }
                    ]
                };
            }
            return content.analysisFramework;
        },
        
        // Preload content for all subcomponents
        async preloadAllContent() {
            await this.initialize();
            console.log('📚 Preloading content for all', Object.keys(this.contentCache).length, 'subcomponents');
            
            // Store in localStorage for offline access
            try {
                localStorage.setItem('agentContentCache', JSON.stringify(this.contentCache));
                localStorage.setItem('agentContentCacheTimestamp', new Date().toISOString());
                console.log('✅ Content cached for offline access');
            } catch (e) {
                console.warn('Could not cache content in localStorage:', e);
            }
            
            return true;
        },
        
        // Load content from cache if available
        loadFromCache() {
            try {
                const cached = localStorage.getItem('agentContentCache');
                const timestamp = localStorage.getItem('agentContentCacheTimestamp');
                
                if (cached && timestamp) {
                    const age = Date.now() - new Date(timestamp).getTime();
                    const oneDay = 24 * 60 * 60 * 1000;
                    
                    if (age < oneDay) {
                        this.contentCache = JSON.parse(cached);
                        this.initialized = true;
                        console.log('✅ Loaded content from cache');
                        return true;
                    }
                }
            } catch (e) {
                console.warn('Could not load from cache:', e);
            }
            return false;
        }
    };
    
    // Auto-initialize on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            AgentContentLoader.initialize();
            AgentContentLoader.preloadAllContent();
        });
    } else {
        AgentContentLoader.initialize();
        AgentContentLoader.preloadAllContent();
    }
    
    // Export for use
    window.enhancedAgentContentLoader = AgentContentLoader;
    
    // Override the old loader if it exists
    if (window.agentContentLoader) {
        window.agentContentLoader = AgentContentLoader;
    }
    
})();
/**
 * Unified Content Service v2.0
 * Enhanced version using Content Registry pattern
 * Part of SSOT Architecture 2.0
 */

class UnifiedContentServiceV2 {
    constructor() {
        this.subcomponentId = null;
        this.registry = null;
        this.initialized = false;
        this.DEBUG_MODE = window.location.hostname === 'localhost';
        
        // Wait for registry to be ready
        this.waitForRegistry();
    }

    /**
     * Wait for Content Registry to be available
     */
    waitForRegistry() {
        if (window.contentRegistry) {
            this.registry = window.contentRegistry;
            this.onRegistryReady();
        } else {
            // Listen for registry ready event
            window.addEventListener('contentRegistryReady', (event) => {
                this.registry = event.detail.registry;
                this.onRegistryReady();
            });
            
            // Also try to initialize registry if not done
            if (typeof setupContentRegistry === 'function') {
                setupContentRegistry();
            }
        }
    }

    /**
     * Called when registry is ready
     */
    onRegistryReady() {
        console.log('✅ Unified Content Service v2 connected to Content Registry');
        this.initialized = true;
        
        // If init was called before registry was ready, initialize now
        if (this.pendingInit) {
            this.init(this.pendingInit.subcomponentId);
            this.pendingInit = null;
        }
    }

    /**
     * Initialize the service for a specific subcomponent
     */
    async init(subcomponentId) {
        if (!subcomponentId) {
            console.error('Subcomponent ID is required');
            return;
        }

        // If registry not ready yet, queue the init
        if (!this.initialized) {
            this.pendingInit = { subcomponentId };
            console.log('⏳ Waiting for Content Registry...');
            return;
        }

        this.subcomponentId = subcomponentId;
        
        console.log(`🚀 Initializing Unified Content Service v2 for ${subcomponentId}`);
        
        try {
            // Load all content types
            await this.loadAllContent();
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Monitor for changes
            this.startMonitoring();
            
            console.log(`✅ Unified Content Service v2 initialized for ${subcomponentId}`);
            
        } catch (error) {
            console.error('Error initializing Unified Content Service:', error);
        }
    }

    /**
     * Load all content types for the subcomponent
     */
    async loadAllContent() {
        const contentMappings = [
            { type: 'education', elementId: 'education-content', tabId: 'education-tab' },
            { type: 'realWorldExamples', elementId: 'real-world-examples-section', tabId: 'education-tab' },
            { type: 'workspace', elementId: 'workspace-content', tabId: 'workspace-tab' },
            { type: 'analysis', elementId: 'analysis-content', tabId: 'analysis-tab' },
            { type: 'templates', elementId: 'output-templates', tabId: 'output-tab' }
        ];

        // Load content in parallel
        const promises = contentMappings.map(async ({ type, elementId, tabId }) => {
            try {
                await this.loadContent(type, elementId, tabId);
            } catch (error) {
                console.error(`Failed to load ${type}:`, error);
            }
        });

        await Promise.all(promises);
    }

    /**
     * Load specific content type
     */
    async loadContent(contentType, elementId, tabId) {
        // Find the element
        let element = document.getElementById(elementId);
        
        // If not found in main document, check within tab
        if (!element && tabId) {
            const tab = document.getElementById(tabId);
            if (tab) {
                element = tab.querySelector(`#${elementId}`) || 
                         tab.querySelector(`.${elementId}`) ||
                         tab.querySelector(`[data-content="${contentType}"]`);
            }
        }

        if (!element) {
            if (this.DEBUG_MODE) {
                console.warn(`Element not found for ${contentType}: ${elementId}`);
            }
            return;
        }

        // Use registry to inject content
        await this.registry.inject(contentType, this.subcomponentId, element);
        
        if (this.DEBUG_MODE) {
            console.log(`✅ Loaded ${contentType} into ${elementId}`);
        }
    }

    /**
     * Setup event listeners for dynamic content loading
     */
    setupEventListeners() {
        // Listen for tab switches to lazy load content
        document.addEventListener('tabSwitched', (event) => {
            this.onTabSwitch(event.detail);
        });

        // Listen for workspace form submission
        const workspaceForm = document.getElementById('workspace-form');
        if (workspaceForm) {
            workspaceForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleWorkspaceSubmit(e);
            });
        }

        // Listen for template generation requests
        window.generateTemplate = (templateId) => {
            this.generateTemplate(templateId);
        };

        // Listen for content refresh requests
        window.refreshContent = (contentType) => {
            this.refreshContent(contentType);
        };
    }

    /**
     * Handle tab switch events
     */
    async onTabSwitch(detail) {
        const { tabId, tabName } = detail;
        
        if (this.DEBUG_MODE) {
            console.log(`Tab switched to: ${tabName}`);
        }

        // Lazy load content for the tab if needed
        switch (tabName) {
            case 'history':
                await this.loadScoreHistory();
                break;
            case 'resources':
                await this.loadResources();
                break;
        }
    }

    /**
     * Handle workspace form submission
     */
    async handleWorkspaceSubmit(event) {
        const form = event.target;
        const formData = new FormData(form);
        const answers = {};
        
        for (const [key, value] of formData.entries()) {
            answers[key] = value;
        }

        try {
            // Save answers
            const response = await fetch('/api/save-workspace-answers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    subcomponentId: this.subcomponentId,
                    answers,
                    timestamp: new Date().toISOString()
                })
            });

            if (response.ok) {
                console.log('✅ Workspace answers saved');
                
                // Trigger analysis
                await this.runAnalysis(answers);
                
                // Switch to analysis tab
                this.switchToTab('analysis');
            }
        } catch (error) {
            console.error('Error submitting workspace:', error);
        }
    }

    /**
     * Run analysis on workspace answers
     */
    async runAnalysis(answers) {
        try {
            const response = await fetch('/api/analysis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    subcomponentId: this.subcomponentId,
                    answers
                })
            });

            if (response.ok) {
                const results = await response.json();
                
                // Refresh analysis content
                await this.refreshContent('analysis');
                
                console.log('✅ Analysis completed');
            }
        } catch (error) {
            console.error('Error running analysis:', error);
        }
    }

    /**
     * Generate a template
     */
    async generateTemplate(templateId) {
        try {
            const response = await fetch(`/api/generate-template/${this.subcomponentId}/${templateId}`, {
                method: 'POST'
            });

            if (response.ok) {
                const result = await response.json();
                
                // Handle the generated template (download, display, etc.)
                if (result.downloadUrl) {
                    window.open(result.downloadUrl, '_blank');
                }
                
                console.log('✅ Template generated');
            }
        } catch (error) {
            console.error('Error generating template:', error);
        }
    }

    /**
     * Refresh specific content type
     */
    async refreshContent(contentType) {
        // Clear cache for this content type
        this.registry.clearCache(contentType);
        
        // Find the element and reload
        const mappings = {
            'education': 'education-content',
            'realWorldExamples': 'real-world-examples-section',
            'workspace': 'workspace-content',
            'analysis': 'analysis-content',
            'templates': 'output-templates'
        };
        
        const elementId = mappings[contentType];
        if (elementId) {
            const element = document.getElementById(elementId);
            if (element) {
                await this.registry.inject(contentType, this.subcomponentId, element);
                console.log(`✅ Refreshed ${contentType} content`);
            }
        }
    }

    /**
     * Load score history
     */
    async loadScoreHistory() {
        try {
            const response = await fetch(`/api/score-history-db/${this.subcomponentId}`);
            if (response.ok) {
                const history = await response.json();
                this.displayScoreHistory(history);
            }
        } catch (error) {
            console.error('Error loading score history:', error);
        }
    }

    /**
     * Display score history
     */
    displayScoreHistory(history) {
        const container = document.getElementById('score-history-container');
        if (!container) return;

        if (!history || history.length === 0) {
            container.innerHTML = '<p>No score history available yet.</p>';
            return;
        }

        const html = `
            <div class="score-history">
                <h3>Score History</h3>
                <div class="history-list">
                    ${history.map(entry => `
                        <div class="history-entry">
                            <span class="date">${new Date(entry.timestamp).toLocaleDateString()}</span>
                            <span class="score">${entry.score}%</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        container.innerHTML = html;
    }

    /**
     * Load resources
     */
    async loadResources() {
        const container = document.getElementById('resources-content');
        if (!container) return;

        // Resources could come from API or be static
        const html = `
            <div class="resources">
                <h3>Additional Resources</h3>
                <ul>
                    <li><a href="#" target="_blank">Best Practices Guide</a></li>
                    <li><a href="#" target="_blank">Case Studies</a></li>
                    <li><a href="#" target="_blank">Video Tutorials</a></li>
                    <li><a href="#" target="_blank">Community Forum</a></li>
                </ul>
            </div>
        `;
        
        container.innerHTML = html;
    }

    /**
     * Switch to a specific tab
     */
    switchToTab(tabName) {
        const tabButton = document.querySelector(`[data-tab="${tabName}"]`);
        if (tabButton) {
            tabButton.click();
        }
    }

    /**
     * Start monitoring for DOM changes
     */
    startMonitoring() {
        if (!this.DEBUG_MODE) return;

        // Monitor for unauthorized content changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' || mutation.type === 'characterData') {
                    // Check if content was changed outside of registry
                    const target = mutation.target;
                    if (target.hasAttribute && target.hasAttribute('data-content-injected')) {
                        console.warn('⚠️ Unauthorized content change detected:', target);
                    }
                }
            });
        });

        // Start observing
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true
        });

        console.log('👁️ Content monitoring active');
    }

    /**
     * Get service statistics
     */
    getStats() {
        return {
            subcomponentId: this.subcomponentId,
            initialized: this.initialized,
            registryStats: this.registry ? this.registry.getStats() : null
        };
    }

    /**
     * Generate completion report
     */
    async generateCompletionReport() {
        if (!this.registry) {
            console.error('Registry not initialized');
            return null;
        }

        return await this.registry.generateCompletionReport();
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UnifiedContentServiceV2;
} else {
    window.UnifiedContentServiceV2 = UnifiedContentServiceV2;
    
    // Auto-initialize if subcomponent ID is available
    if (typeof window !== 'undefined') {
        window.addEventListener('DOMContentLoaded', () => {
            // Extract subcomponent ID from URL
            const urlParams = new URLSearchParams(window.location.search);
            const subcomponentId = urlParams.get('id');
            
            if (subcomponentId) {
                window.unifiedContentService = new UnifiedContentServiceV2();
                window.unifiedContentService.init(subcomponentId);
            }
        });
    }
}
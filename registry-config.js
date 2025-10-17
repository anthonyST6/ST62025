/**
 * Registry Configuration
 * Sets up and configures the Content Registry with all providers, validators, and transformers
 */

// Load all required modules
function loadDependencies() {
    // Load scripts if not already loaded
    const scripts = [
        'content-registry.js',
        'providers/real-world-provider.js',
        'providers/education-provider.js',
        'providers/workspace-provider.js',
        'validators/content-validators.js',
        'transformers/content-transformers.js'
    ];

    scripts.forEach(script => {
        if (!document.querySelector(`script[src="${script}"]`)) {
            const scriptElement = document.createElement('script');
            scriptElement.src = script;
            scriptElement.async = false;
            document.head.appendChild(scriptElement);
        }
    });
}

/**
 * Setup Content Registry with all configurations
 */
function setupContentRegistry() {
    // Ensure dependencies are loaded
    if (typeof window !== 'undefined') {
        loadDependencies();
    }

    // Wait for dependencies to load
    const waitForDependencies = () => {
        if (typeof ContentRegistry === 'undefined' ||
            typeof RealWorldExamplesProvider === 'undefined' ||
            typeof EducationContentProvider === 'undefined' ||
            typeof WorkspaceContentProvider === 'undefined') {
            setTimeout(waitForDependencies, 100);
            return;
        }
        
        // Dependencies loaded, proceed with setup
        initializeRegistry();
    };

    if (typeof window !== 'undefined') {
        waitForDependencies();
    } else {
        // Node.js environment
        initializeRegistry();
    }
}

function initializeRegistry() {
    const registry = new ContentRegistry();
    
    // Configure Real World Examples
    configureRealWorldExamples(registry);
    
    // Configure Education Content
    configureEducationContent(registry);
    
    // Configure Workspace Content
    configureWorkspaceContent(registry);
    
    // Configure Analysis Content
    configureAnalysisContent(registry);
    
    // Configure Template Content
    configureTemplateContent(registry);
    
    // Set up global access
    if (typeof window !== 'undefined') {
        window.contentRegistry = registry;
        console.log('✅ Content Registry configured and ready');
        
        // Dispatch event to notify other scripts
        window.dispatchEvent(new CustomEvent('contentRegistryReady', {
            detail: { registry }
        }));
    }
    
    return registry;
}

/**
 * Configure Real World Examples
 */
function configureRealWorldExamples(registry) {
    const provider = new RealWorldExamplesProvider();
    const validator = new RealWorldExamplesValidator();
    const transformer = new RealWorldExamplesTransformer();
    
    // Fallback content for missing examples
    const fallback = `
        <div class="real-world-examples-fallback">
            <div class="section-header">
                <h3 class="section-title">
                    <span class="icon">🌍</span>
                    Real-World Examples
                </h3>
                <p class="section-description coming-soon">
                    Real-world examples for this component are being researched and will be added soon.
                </p>
            </div>
            <div class="fallback-content">
                <p>In the meantime, consider these general principles:</p>
                <ul class="principles-list">
                    <li>
                        <span class="icon">🎯</span>
                        Focus on solving specific, measurable customer problems
                    </li>
                    <li>
                        <span class="icon">✅</span>
                        Validate your solution with real market feedback
                    </li>
                    <li>
                        <span class="icon">🔄</span>
                        Iterate based on actual user behavior and data
                    </li>
                    <li>
                        <span class="icon">📊</span>
                        Measure impact quantitatively with clear metrics
                    </li>
                    <li>
                        <span class="icon">🚀</span>
                        Scale what works, pivot what doesn't
                    </li>
                </ul>
            </div>
        </div>
    `;
    
    registry.register('realWorldExamples', {
        provider: provider,
        validator: validator,
        transformer: transformer,
        fallback: fallback,
        availableFor: [
            // Customer Insights block (Block 2)
            '2-1', '2-2', '2-3', '2-4', '2-5', '2-6',
            // Quantifiable Impact block (Block 7)
            '7-1', '7-2', '7-3', '7-4', '7-5', '7-6',
            // TODO: Add more as examples are created
        ]
    });
    
    console.log('📚 Registered Real World Examples content type');
}

/**
 * Configure Education Content
 */
function configureEducationContent(registry) {
    const provider = new EducationContentProvider();
    const validator = new EducationContentValidator();
    const transformer = new EducationContentTransformer();
    
    const fallback = `
        <div class="education-content-fallback">
            <p>Educational content is being loaded...</p>
        </div>
    `;
    
    registry.register('education', {
        provider: provider,
        validator: validator,
        transformer: transformer,
        fallback: fallback,
        availableFor: 'all' // Available for all subcomponents
    });
    
    console.log('📚 Registered Education content type');
}

/**
 * Configure Workspace Content
 */
function configureWorkspaceContent(registry) {
    const provider = new WorkspaceContentProvider();
    const validator = new WorkspaceContentValidator();
    const transformer = new WorkspaceContentTransformer();
    
    // No fallback for workspace - hide if unavailable
    registry.register('workspace', {
        provider: provider,
        validator: validator,
        transformer: transformer,
        fallback: null,
        availableFor: 'all'
    });
    
    console.log('📚 Registered Workspace content type');
}

/**
 * Configure Analysis Content
 */
function configureAnalysisContent(registry) {
    // Simple provider for analysis content
    const provider = {
        async fetch(subcomponentId) {
            try {
                const response = await fetch(`/api/analysis/${subcomponentId}`);
                if (response.ok) {
                    return await response.json();
                }
            } catch (error) {
                console.error('Error fetching analysis:', error);
            }
            return null;
        },
        
        async render(data) {
            if (!data) {
                return '<p>No analysis results available. Complete the workspace assessment first.</p>';
            }
            
            return `
                <div class="analysis-results">
                    <h3>Analysis Results</h3>
                    ${data.score ? `<div class="score">Score: ${data.score}</div>` : ''}
                    ${data.summary ? `<div class="summary">${data.summary}</div>` : ''}
                    ${data.recommendations ? `
                        <div class="recommendations">
                            <h4>Recommendations</h4>
                            <ul>
                                ${data.recommendations.map(r => `<li>${r}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                </div>
            `;
        }
    };
    
    const fallback = `
        <div class="analysis-fallback">
            <p>Complete the workspace assessment to see analysis results.</p>
        </div>
    `;
    
    registry.register('analysis', {
        provider: provider,
        validator: new GenericContentValidator(),
        transformer: new GenericContentTransformer(),
        fallback: fallback,
        availableFor: 'all'
    });
    
    console.log('📚 Registered Analysis content type');
}

/**
 * Configure Template Content
 */
function configureTemplateContent(registry) {
    // Simple provider for templates
    const provider = {
        async fetch(subcomponentId) {
            try {
                const response = await fetch(`/api/templates/${subcomponentId}`);
                if (response.ok) {
                    return await response.json();
                }
            } catch (error) {
                console.error('Error fetching templates:', error);
            }
            return null;
        },
        
        async render(data) {
            if (!data || !data.templates) {
                return '<p>No templates available for this component.</p>';
            }
            
            return `
                <div class="templates-container">
                    <h3>Output Templates</h3>
                    <div class="templates-grid">
                        ${data.templates.map(template => `
                            <div class="template-card">
                                <h4>${template.name}</h4>
                                <p>${template.description || ''}</p>
                                <button onclick="window.generateTemplate && window.generateTemplate('${template.id}')">
                                    Generate ${template.name}
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
    };
    
    const fallback = `
        <div class="templates-fallback">
            <p>Templates are not available for this component.</p>
        </div>
    `;
    
    registry.register('templates', {
        provider: provider,
        validator: new GenericContentValidator(),
        transformer: new GenericContentTransformer(),
        fallback: fallback,
        availableFor: 'all'
    });
    
    console.log('📚 Registered Templates content type');
}

/**
 * Registry Helper Functions
 */
const RegistryHelpers = {
    /**
     * Inject all content for a subcomponent
     */
    async injectAllContent(subcomponentId) {
        const registry = window.contentRegistry;
        if (!registry) {
            console.error('Content Registry not initialized');
            return;
        }
        
        const contentTypes = [
            { type: 'education', elementId: 'education-content' },
            { type: 'realWorldExamples', elementId: 'real-world-examples-section' },
            { type: 'workspace', elementId: 'workspace-content' },
            { type: 'analysis', elementId: 'analysis-content' },
            { type: 'templates', elementId: 'templates-content' }
        ];
        
        const promises = contentTypes.map(({ type, elementId }) => {
            const element = document.getElementById(elementId);
            if (element) {
                return registry.inject(type, subcomponentId, element);
            }
            return Promise.resolve();
        });
        
        await Promise.all(promises);
        console.log(`✅ All content injected for ${subcomponentId}`);
    },
    
    /**
     * Generate completion report
     */
    async generateCompletionReport() {
        const registry = window.contentRegistry;
        if (!registry) {
            console.error('Content Registry not initialized');
            return;
        }
        
        const report = await registry.generateCompletionReport();
        console.log('📊 Content Completion Report:', report);
        return report;
    },
    
    /**
     * Clear all caches
     */
    clearAllCaches() {
        const registry = window.contentRegistry;
        if (!registry) {
            console.error('Content Registry not initialized');
            return;
        }
        
        registry.clearCache();
        console.log('🗑️ All caches cleared');
    },
    
    /**
     * Get registry statistics
     */
    getStats() {
        const registry = window.contentRegistry;
        if (!registry) {
            console.error('Content Registry not initialized');
            return;
        }
        
        const stats = registry.getStats();
        console.log('📈 Registry Statistics:', stats);
        return stats;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        setupContentRegistry,
        RegistryHelpers
    };
} else {
    window.setupContentRegistry = setupContentRegistry;
    window.RegistryHelpers = RegistryHelpers;
    
    // Auto-initialize if in browser
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupContentRegistry);
    } else {
        setupContentRegistry();
    }
}
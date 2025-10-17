/**
 * Real World Examples Provider
 * Manages fetching and rendering of real-world company examples
 * Handles incomplete data gracefully with fallbacks
 */

class RealWorldExamplesProvider {
    constructor() {
        this.cache = new Map();
        // Track which subcomponents have real world examples implemented
        // NOTE: This list is incomplete - only about 12-15% of subcomponents have examples
        this.implementedSubcomponents = new Set([
            // Customer Insights block (Block 2)
            '2-1', '2-2', '2-3', '2-4', '2-5', '2-6',
            // Quantifiable Impact block (Block 7) 
            '7-1', '7-2', '7-3', '7-4', '7-5', '7-6',
            // Add more as they are implemented
            // TODO: Complete examples for remaining 84 subcomponents
        ]);
        
        this.DEBUG_MODE = window.location.hostname === 'localhost';
    }

    /**
     * Check if examples exist for subcomponent
     */
    hasExamples(subcomponentId) {
        return this.implementedSubcomponents.has(subcomponentId);
    }

    /**
     * Fetch examples for a subcomponent
     */
    async fetch(subcomponentId) {
        try {
            // Check cache first
            if (this.cache.has(subcomponentId)) {
                if (this.DEBUG_MODE) {
                    console.log(`⚡ Cache hit for Real World Examples: ${subcomponentId}`);
                }
                return this.cache.get(subcomponentId);
            }

            // Check if implemented
            if (!this.hasExamples(subcomponentId)) {
                if (this.DEBUG_MODE) {
                    console.log(`📝 No Real World Examples implemented yet for ${subcomponentId}`);
                }
                return null;
            }

            // Try to get from the complete database (handles both variable names)
            let examples = null;
            
            // Check for the complete variable name first
            if (window.realWorldExamplesComplete && window.realWorldExamplesComplete[subcomponentId]) {
                examples = window.realWorldExamplesComplete[subcomponentId];
                if (this.DEBUG_MODE) {
                    console.log(`✅ Found examples in realWorldExamplesComplete for ${subcomponentId}`);
                }
            }
            // Fallback to original variable name
            else if (window.realWorldExamples && window.realWorldExamples[subcomponentId]) {
                examples = window.realWorldExamples[subcomponentId];
                if (this.DEBUG_MODE) {
                    console.log(`✅ Found examples in realWorldExamples for ${subcomponentId}`);
                }
            }

            // If still no data, try API as last resort
            if (!examples) {
                try {
                    const response = await fetch(`/api/real-world-examples/${subcomponentId}`);
                    if (response.ok) {
                        const data = await response.json();
                        examples = data.examples || data;
                        if (this.DEBUG_MODE) {
                            console.log(`✅ Fetched examples from API for ${subcomponentId}`);
                        }
                    }
                } catch (error) {
                    console.error('Failed to fetch from API:', error);
                }
            }

            // Cache the result (even if null)
            if (examples) {
                this.cache.set(subcomponentId, examples);
            }

            return examples;
            
        } catch (error) {
            console.error(`Error fetching Real World Examples for ${subcomponentId}:`, error);
            return null;
        }
    }

    /**
     * Render examples into HTML
     */
    async render(examples) {
        if (!examples || !Array.isArray(examples) || examples.length === 0) {
            return this.renderEmpty();
        }

        const html = `
            <div class="real-world-examples-container">
                <div class="section-header">
                    <h3 class="section-title">
                        <span class="icon">🌍</span>
                        Real-World Examples
                    </h3>
                    <p class="section-description">
                        Learn from successful companies that built billion-dollar businesses by solving clear, specific problems:
                    </p>
                </div>
                <div class="examples-grid">
                    ${examples.map(example => this.renderExample(example)).join('')}
                </div>
            </div>
        `;

        return html;
    }

    /**
     * Render a single example
     */
    renderExample(example) {
        // Handle different data structures
        const company = example.company || example.name || 'Unknown Company';
        const useCase = example.useCase || example.job || example.description || 'No description available';
        const valuation = example.valuation || example.value || example.metric || 'N/A';
        const year = example.year || example.founded || '';
        const category = example.category || '';

        return `
            <div class="example-card" data-company="${this.escapeHtml(company)}">
                <div class="example-header">
                    <h4 class="company-name">${this.escapeHtml(company)}</h4>
                    ${category ? `<span class="category-badge">${this.escapeHtml(category)}</span>` : ''}
                </div>
                <div class="use-case-container">
                    <div class="use-case-label">USE CASE:</div>
                    <div class="use-case-text">
                        "${this.escapeHtml(useCase)}"
                    </div>
                </div>
                <div class="example-metrics">
                    <span class="valuation">${this.escapeHtml(valuation)}</span>
                    ${year ? `<span class="year">${this.escapeHtml(year)}</span>` : ''}
                </div>
            </div>
        `;
    }

    /**
     * Render empty state
     */
    renderEmpty() {
        return `
            <div class="real-world-examples-empty">
                <p>No real-world examples available for this component.</p>
            </div>
        `;
    }

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Add new subcomponent to implemented list
     */
    addImplementedSubcomponent(subcomponentId) {
        this.implementedSubcomponents.add(subcomponentId);
        // Clear cache for this subcomponent to force refresh
        this.cache.delete(subcomponentId);
    }

    /**
     * Get implementation status report
     */
    getImplementationStatus() {
        const total = 96; // Total subcomponents
        const implemented = this.implementedSubcomponents.size;
        const percentage = ((implemented / total) * 100).toFixed(1);
        
        const missing = [];
        for (let block = 1; block <= 16; block++) {
            for (let sub = 1; sub <= 6; sub++) {
                const id = `${block}-${sub}`;
                if (!this.implementedSubcomponents.has(id)) {
                    missing.push(id);
                }
            }
        }

        return {
            total,
            implemented,
            percentage: `${percentage}%`,
            implementedList: Array.from(this.implementedSubcomponents),
            missingList: missing,
            missingCount: missing.length
        };
    }

    /**
     * Clear cache
     */
    clearCache() {
        this.cache.clear();
        console.log('🗑️ Cleared Real World Examples cache');
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RealWorldExamplesProvider;
} else {
    window.RealWorldExamplesProvider = RealWorldExamplesProvider;
}
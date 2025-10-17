/**
 * Education Content Provider
 * Manages fetching and rendering of educational content from SSOT API
 */

class EducationContentProvider {
    constructor() {
        this.cache = new Map();
        this.DEBUG_MODE = window.location.hostname === 'localhost';
    }

    /**
     * Fetch education content for a subcomponent
     */
    async fetch(subcomponentId) {
        try {
            // Check cache first
            const cacheKey = `education:${subcomponentId}`;
            if (this.cache.has(cacheKey)) {
                if (this.DEBUG_MODE) {
                    console.log(`⚡ Cache hit for Education Content: ${subcomponentId}`);
                }
                return this.cache.get(cacheKey);
            }

            // Fetch from SSOT API
            const response = await fetch(`/api/subcomponents/${subcomponentId}`);
            if (!response.ok) {
                throw new Error(`API returned ${response.status}`);
            }

            const data = await response.json();
            
            // Extract education content
            const educationContent = data.education || data.educationContent || {};
            
            // Cache the result
            this.cache.set(cacheKey, educationContent);
            
            if (this.DEBUG_MODE) {
                console.log(`✅ Fetched education content for ${subcomponentId}`);
            }

            return educationContent;
            
        } catch (error) {
            console.error(`Error fetching Education Content for ${subcomponentId}:`, error);
            return null;
        }
    }

    /**
     * Render education content into HTML
     */
    async render(content) {
        if (!content || Object.keys(content).length === 0) {
            return this.renderEmpty();
        }

        const sections = [];

        // Overview section
        if (content.overview || content.description) {
            sections.push(this.renderSection(
                'Overview',
                content.overview || content.description,
                '📚'
            ));
        }

        // Why It Matters section
        if (content.whyItMatters || content.importance) {
            sections.push(this.renderSection(
                'Why It Matters',
                content.whyItMatters || content.importance,
                '💡'
            ));
        }

        // How to Implement section
        if (content.howToImplement || content.implementation) {
            sections.push(this.renderSection(
                'How to Implement',
                content.howToImplement || content.implementation,
                '🚀'
            ));
        }

        // Key Concepts section
        if (content.keyConcepts) {
            sections.push(this.renderKeyConcepts(content.keyConcepts));
        }

        // Best Practices section
        if (content.bestPractices) {
            sections.push(this.renderBestPractices(content.bestPractices));
        }

        // Common Pitfalls section
        if (content.commonPitfalls) {
            sections.push(this.renderCommonPitfalls(content.commonPitfalls));
        }

        // Resources section
        if (content.resources) {
            sections.push(this.renderResources(content.resources));
        }

        const html = `
            <div class="education-content-container">
                ${sections.join('')}
            </div>
        `;

        return html;
    }

    /**
     * Render a content section
     */
    renderSection(title, content, icon = '') {
        if (!content) return '';

        // Handle different content types
        let renderedContent = '';
        
        if (typeof content === 'string') {
            renderedContent = `<p>${this.escapeHtml(content)}</p>`;
        } else if (Array.isArray(content)) {
            renderedContent = `
                <ul class="content-list">
                    ${content.map(item => `<li>${this.escapeHtml(item)}</li>`).join('')}
                </ul>
            `;
        } else if (typeof content === 'object') {
            renderedContent = this.renderObjectContent(content);
        }

        return `
            <div class="education-section">
                <h3 class="section-title">
                    ${icon ? `<span class="icon">${icon}</span>` : ''}
                    ${this.escapeHtml(title)}
                </h3>
                <div class="section-content">
                    ${renderedContent}
                </div>
            </div>
        `;
    }

    /**
     * Render object content
     */
    renderObjectContent(obj) {
        const items = [];
        
        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === 'string') {
                items.push(`
                    <div class="content-item">
                        <strong>${this.formatKey(key)}:</strong> ${this.escapeHtml(value)}
                    </div>
                `);
            } else if (Array.isArray(value)) {
                items.push(`
                    <div class="content-item">
                        <strong>${this.formatKey(key)}:</strong>
                        <ul>
                            ${value.map(item => `<li>${this.escapeHtml(item)}</li>`).join('')}
                        </ul>
                    </div>
                `);
            }
        }
        
        return items.join('');
    }

    /**
     * Render key concepts
     */
    renderKeyConcepts(concepts) {
        if (!concepts || concepts.length === 0) return '';

        const conceptsHtml = Array.isArray(concepts) 
            ? concepts.map(concept => `
                <div class="concept-card">
                    <h4>${this.escapeHtml(concept.title || concept.name || concept)}</h4>
                    ${concept.description ? `<p>${this.escapeHtml(concept.description)}</p>` : ''}
                </div>
            `).join('')
            : this.renderObjectContent(concepts);

        return `
            <div class="education-section">
                <h3 class="section-title">
                    <span class="icon">🔑</span>
                    Key Concepts
                </h3>
                <div class="concepts-grid">
                    ${conceptsHtml}
                </div>
            </div>
        `;
    }

    /**
     * Render best practices
     */
    renderBestPractices(practices) {
        if (!practices) return '';

        const practicesHtml = Array.isArray(practices)
            ? `<ul class="best-practices-list">
                ${practices.map(practice => `
                    <li class="practice-item">
                        <span class="checkmark">✅</span>
                        ${this.escapeHtml(practice)}
                    </li>
                `).join('')}
               </ul>`
            : this.renderObjectContent(practices);

        return `
            <div class="education-section">
                <h3 class="section-title">
                    <span class="icon">⭐</span>
                    Best Practices
                </h3>
                <div class="section-content">
                    ${practicesHtml}
                </div>
            </div>
        `;
    }

    /**
     * Render common pitfalls
     */
    renderCommonPitfalls(pitfalls) {
        if (!pitfalls) return '';

        const pitfallsHtml = Array.isArray(pitfalls)
            ? `<ul class="pitfalls-list">
                ${pitfalls.map(pitfall => `
                    <li class="pitfall-item">
                        <span class="warning">⚠️</span>
                        ${this.escapeHtml(pitfall)}
                    </li>
                `).join('')}
               </ul>`
            : this.renderObjectContent(pitfalls);

        return `
            <div class="education-section">
                <h3 class="section-title">
                    <span class="icon">⚠️</span>
                    Common Pitfalls
                </h3>
                <div class="section-content">
                    ${pitfallsHtml}
                </div>
            </div>
        `;
    }

    /**
     * Render resources
     */
    renderResources(resources) {
        if (!resources) return '';

        const resourcesHtml = Array.isArray(resources)
            ? `<ul class="resources-list">
                ${resources.map(resource => {
                    if (typeof resource === 'string') {
                        return `<li>${this.escapeHtml(resource)}</li>`;
                    } else if (resource.url && resource.title) {
                        return `<li><a href="${this.escapeHtml(resource.url)}" target="_blank" rel="noopener">
                            ${this.escapeHtml(resource.title)}
                        </a></li>`;
                    }
                    return '';
                }).join('')}
               </ul>`
            : this.renderObjectContent(resources);

        return `
            <div class="education-section">
                <h3 class="section-title">
                    <span class="icon">📖</span>
                    Resources
                </h3>
                <div class="section-content">
                    ${resourcesHtml}
                </div>
            </div>
        `;
    }

    /**
     * Render empty state
     */
    renderEmpty() {
        return `
            <div class="education-content-empty">
                <p>No educational content available for this component.</p>
            </div>
        `;
    }

    /**
     * Format object keys for display
     */
    formatKey(key) {
        // Convert camelCase to Title Case
        return key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .trim();
    }

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        if (typeof text !== 'string') {
            text = String(text);
        }
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Clear cache
     */
    clearCache() {
        this.cache.clear();
        console.log('🗑️ Cleared Education Content cache');
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EducationContentProvider;
} else {
    window.EducationContentProvider = EducationContentProvider;
}
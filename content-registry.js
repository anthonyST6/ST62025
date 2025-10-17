/**
 * Content Registry - Central management system for all content injection
 * Part of SSOT Architecture 2.0
 * 
 * This registry ensures:
 * - Single authority for content management
 * - Graceful fallbacks for missing content
 * - Validation before injection
 * - Audit trail of all operations
 */

class ContentRegistry {
    constructor() {
        this.providers = new Map();
        this.validators = new Map();
        this.transformers = new Map();
        this.fallbacks = new Map();
        this.completionTracker = new Map();
        this.auditLog = [];
        this.cache = new Map();
        this.DEBUG_MODE = window.location.hostname === 'localhost';
    }

    /**
     * Register a content type with its handlers
     * @param {string} contentType - Type of content (e.g., 'realWorldExamples')
     * @param {Object} config - Configuration object with provider, validator, transformer, fallback
     */
    register(contentType, config) {
        if (!contentType || !config) {
            throw new Error('Content type and config are required');
        }

        this.providers.set(contentType, config.provider);
        this.validators.set(contentType, config.validator || this.defaultValidator);
        this.transformers.set(contentType, config.transformer || this.defaultTransformer);
        this.fallbacks.set(contentType, config.fallback || null);
        
        // Track which subcomponents have this content type
        if (config.availableFor) {
            if (config.availableFor === 'all') {
                // Available for all 96 subcomponents
                const allSubcomponents = [];
                for (let block = 1; block <= 16; block++) {
                    for (let sub = 1; sub <= 6; sub++) {
                        allSubcomponents.push(`${block}-${sub}`);
                    }
                }
                this.completionTracker.set(contentType, new Set(allSubcomponents));
            } else if (Array.isArray(config.availableFor)) {
                this.completionTracker.set(contentType, new Set(config.availableFor));
            }
        }

        console.log(`✅ Registered content type: ${contentType}`);
    }

    /**
     * Check if content exists for a specific subcomponent
     */
    hasContent(contentType, subcomponentId) {
        const tracker = this.completionTracker.get(contentType);
        return tracker ? tracker.has(subcomponentId) : false;
    }

    /**
     * Get cache key for content
     */
    getCacheKey(contentType, subcomponentId) {
        return `${contentType}:${subcomponentId}`;
    }

    /**
     * Inject content with validation, transformation, and fallback handling
     */
    async inject(contentType, subcomponentId, targetElement) {
        const startTime = performance.now();
        
        try {
            // Check if element exists
            if (!targetElement) {
                throw new Error(`Target element not found for ${contentType}`);
            }

            // Prevent duplicate injection
            if (targetElement.getAttribute('data-content-injected') === 'true') {
                console.log(`⚠️ Content already injected for ${contentType}`);
                return;
            }

            // Check cache first
            const cacheKey = this.getCacheKey(contentType, subcomponentId);
            if (this.cache.has(cacheKey)) {
                const cachedContent = this.cache.get(cacheKey);
                targetElement.innerHTML = cachedContent;
                targetElement.setAttribute('data-content-injected', 'true');
                this.audit('cache-hit', contentType, subcomponentId);
                return;
            }

            // Check if content exists for this subcomponent
            if (!this.hasContent(contentType, subcomponentId)) {
                console.log(`📝 No ${contentType} for ${subcomponentId}, using fallback`);
                return this.injectFallback(contentType, targetElement);
            }

            // Get the provider
            const provider = this.providers.get(contentType);
            if (!provider) {
                throw new Error(`No provider registered for ${contentType}`);
            }

            // Fetch the data
            const data = await provider.fetch(subcomponentId);
            
            // Validate
            const validator = this.validators.get(contentType);
            if (!validator(data)) {
                console.warn(`❌ Validation failed for ${contentType} on ${subcomponentId}`);
                return this.injectFallback(contentType, targetElement);
            }

            // Transform
            const transformer = this.transformers.get(contentType);
            const transformed = transformer(data, subcomponentId);

            // Inject
            const html = await provider.render(transformed);
            targetElement.innerHTML = html;
            targetElement.setAttribute('data-content-injected', 'true');
            targetElement.setAttribute('data-injection-timestamp', new Date().toISOString());
            targetElement.setAttribute('data-content-type', contentType);
            targetElement.setAttribute('data-subcomponent-id', subcomponentId);

            // Cache the result
            this.cache.set(cacheKey, html);

            // Track performance
            const duration = performance.now() - startTime;
            if (duration > 100) {
                console.warn(`⚠️ Slow injection: ${contentType} took ${duration.toFixed(2)}ms`);
            }

            // Audit success
            this.audit('success', contentType, subcomponentId, null, duration);
            
        } catch (error) {
            console.error(`❌ Failed to inject ${contentType} for ${subcomponentId}:`, error);
            this.audit('failure', contentType, subcomponentId, error);
            return this.injectFallback(contentType, targetElement);
        }
    }

    /**
     * Inject fallback content when primary content unavailable
     */
    injectFallback(contentType, targetElement) {
        const fallback = this.fallbacks.get(contentType);
        if (fallback) {
            targetElement.innerHTML = fallback;
            targetElement.classList.add('content-fallback');
            targetElement.setAttribute('data-content-injected', 'true');
            targetElement.setAttribute('data-fallback', 'true');
            this.audit('fallback', contentType);
        } else {
            // No fallback defined, hide the element
            targetElement.style.display = 'none';
            this.audit('hidden', contentType);
        }
    }

    /**
     * Default validator - checks if data exists and is not empty
     */
    defaultValidator(data) {
        if (!data) return false;
        if (typeof data === 'object' && Object.keys(data).length === 0) return false;
        if (Array.isArray(data) && data.length === 0) return false;
        return true;
    }

    /**
     * Default transformer - returns data as-is
     */
    defaultTransformer(data, subcomponentId) {
        return data;
    }

    /**
     * Audit trail for content operations
     */
    audit(status, contentType, subcomponentId = null, error = null, duration = null) {
        const entry = {
            timestamp: new Date().toISOString(),
            status,
            contentType,
            subcomponentId,
            error: error ? error.message : null,
            duration: duration ? `${duration.toFixed(2)}ms` : null
        };
        
        this.auditLog.push(entry);
        
        // Log to console in debug mode
        if (this.DEBUG_MODE) {
            const emoji = {
                'success': '✅',
                'failure': '❌',
                'fallback': '🔄',
                'hidden': '👻',
                'cache-hit': '⚡'
            }[status] || '📝';
            
            console.log(`${emoji} Content Registry:`, entry);
        }
        
        // Send to analytics if available
        if (window.analytics) {
            window.analytics.track('content_injection', entry);
        }
    }

    /**
     * Clear cache for a specific content type or all
     */
    clearCache(contentType = null) {
        if (contentType) {
            // Clear specific content type
            for (const [key] of this.cache) {
                if (key.startsWith(`${contentType}:`)) {
                    this.cache.delete(key);
                }
            }
            console.log(`🗑️ Cleared cache for ${contentType}`);
        } else {
            // Clear all cache
            this.cache.clear();
            console.log('🗑️ Cleared all cache');
        }
    }

    /**
     * Get audit log
     */
    getAuditLog(contentType = null) {
        if (contentType) {
            return this.auditLog.filter(entry => entry.contentType === contentType);
        }
        return this.auditLog;
    }

    /**
     * Generate completion report
     */
    async generateCompletionReport() {
        const report = {
            timestamp: new Date().toISOString(),
            totalSubcomponents: 96,
            contentTypes: {}
        };

        for (const [contentType, tracker] of this.completionTracker) {
            const complete = [];
            const missing = [];
            
            for (let block = 1; block <= 16; block++) {
                for (let sub = 1; sub <= 6; sub++) {
                    const id = `${block}-${sub}`;
                    if (tracker.has(id)) {
                        complete.push(id);
                    } else {
                        missing.push(id);
                    }
                }
            }
            
            report.contentTypes[contentType] = {
                complete: complete.length,
                missing: missing.length,
                percentage: ((complete.length / 96) * 100).toFixed(1) + '%',
                completeList: complete,
                missingList: missing
            };
        }

        return report;
    }

    /**
     * Get registry statistics
     */
    getStats() {
        return {
            registeredTypes: this.providers.size,
            cacheSize: this.cache.size,
            auditLogSize: this.auditLog.length,
            contentTypes: Array.from(this.providers.keys()),
            completionTracking: Array.from(this.completionTracker.keys())
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContentRegistry;
} else {
    window.ContentRegistry = ContentRegistry;
}

// Auto-initialize if in browser
if (typeof window !== 'undefined' && !window.contentRegistry) {
    window.contentRegistry = new ContentRegistry();
    console.log('🎯 Content Registry initialized');
}
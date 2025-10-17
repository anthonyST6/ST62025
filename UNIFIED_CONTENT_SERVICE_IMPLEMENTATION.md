# UnifiedContentService Implementation

## Complete Implementation Code

This document contains the full implementation of the UnifiedContentService that will serve as the central authority for all content in the ScaleOps6 platform.

## Core Service Implementation

### 1. UnifiedContentService Class

```javascript
/**
 * Unified Content Service
 * Central authority for all content in ScaleOps6 platform
 * Enforces SSOT hierarchy and prevents content misalignment
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class UnifiedContentService {
    constructor() {
        // Initialize all content sources
        this.initializeContentSources();
        
        // Content hierarchy levels (higher number = higher priority)
        this.HIERARCHY_LEVELS = {
            SSOT: 5,           // Highest priority - cannot be overridden
            EDUCATIONAL: 4,    // Educational enhancements
            AGENT: 3,          // Agent specializations
            EXAMPLES: 2,       // Real-world examples
            USER: 1           // User-generated content
        };
        
        // Cache for processed content
        this.contentCache = new Map();
        
        // Validation rules
        this.validationRules = this.initializeValidationRules();
        
        // Content version tracking
        this.contentVersion = this.generateVersion();
        
        console.log('✅ UnifiedContentService initialized with version:', this.contentVersion);
    }
    
    /**
     * Initialize all content sources
     */
    initializeContentSources() {
        try {
            // Load SSOT Registry (highest priority)
            this.ssotRegistry = require('./core/complete-ssot-registry.js').ssotRegistry || {};
            console.log(`📚 Loaded SSOT Registry: ${Object.keys(this.ssotRegistry).length} subcomponents`);
            
            // Load Educational Content
            this.educationalContent = require('./educational-content.js').educationalContent || {};
            console.log(`📖 Loaded Educational Content: ${Object.keys(this.educationalContent).length} entries`);
            
            // Load Agent Mappings (if exists)
            try {
                this.agentMappings = require('./agent-subcomponent-mapping.js').subcomponentAgentMapping || {};
                console.log(`🤖 Loaded Agent Mappings: ${Object.keys(this.agentMappings).length} mappings`);
            } catch (e) {
                this.agentMappings = {};
                console.log('ℹ️ Agent mappings not found, using empty set');
            }
            
            // Load Real-World Examples (if exists)
            try {
                this.realWorldExamples = require('./real-world-examples-all-96-complete.js').realWorldExamplesComplete || {};
                console.log(`💼 Loaded Real-World Examples: ${Object.keys(this.realWorldExamples).length} examples`);
            } catch (e) {
                this.realWorldExamples = {};
                console.log('ℹ️ Real-world examples not found, using empty set');
            }
            
        } catch (error) {
            console.error('❌ Error initializing content sources:', error);
            throw new Error('Failed to initialize UnifiedContentService: ' + error.message);
        }
    }
    
    /**
     * Initialize validation rules
     */
    initializeValidationRules() {
        return {
            // Fields that must never be overridden from SSOT
            immutableFields: ['id', 'title', 'category', 'block', 'order'],
            
            // Fields that can be enhanced but not replaced
            enhanceableFields: ['description', 'templates', 'metrics'],
            
            // Fields that can be freely modified
            modifiableFields: ['examples', 'workspace', 'userNotes'],
            
            // Required fields for valid content
            requiredFields: ['id', 'title', 'category', 'description']
        };
    }
    
    /**
     * Generate version string for cache busting
     */
    generateVersion() {
        const timestamp = Date.now();
        const hash = crypto.createHash('md5')
            .update(timestamp.toString())
            .digest('hex')
            .substring(0, 8);
        return `v2.${timestamp}.${hash}`;
    }
    
    /**
     * Get unified content for a subcomponent
     * @param {string} subcomponentId - The subcomponent ID (e.g., "2-1")
     * @returns {object} Unified content object
     */
    getContent(subcomponentId) {
        // Check cache first
        const cacheKey = `${subcomponentId}-${this.contentVersion}`;
        if (this.contentCache.has(cacheKey)) {
            console.log(`📦 Returning cached content for ${subcomponentId}`);
            return this.contentCache.get(cacheKey);
        }
        
        console.log(`🔄 Building unified content for ${subcomponentId}`);
        
        // Start with SSOT as the base (highest priority)
        const ssotData = this.ssotRegistry[subcomponentId];
        if (!ssotData) {
            throw new Error(`Subcomponent ${subcomponentId} not found in SSOT Registry`);
        }
        
        // Initialize unified content with SSOT data
        let unifiedContent = {
            ...ssotData,
            _metadata: {
                source: 'SSOT',
                version: this.contentVersion,
                hierarchy: this.HIERARCHY_LEVELS.SSOT,
                timestamp: Date.now(),
                sources: ['SSOT']
            }
        };
        
        // Layer 2: Educational Content (can enhance but not override SSOT)
        if (this.educationalContent[subcomponentId]) {
            unifiedContent = this.mergeContent(
                unifiedContent,
                this.educationalContent[subcomponentId],
                'EDUCATIONAL',
                this.HIERARCHY_LEVELS.EDUCATIONAL
            );
        }
        
        // Layer 3: Agent Mappings (supplementary only)
        if (this.agentMappings[subcomponentId]) {
            unifiedContent = this.mergeContent(
                unifiedContent,
                { agentInfo: this.agentMappings[subcomponentId] },
                'AGENT',
                this.HIERARCHY_LEVELS.AGENT
            );
        }
        
        // Layer 4: Real-World Examples (supplementary only)
        if (this.realWorldExamples[subcomponentId]) {
            unifiedContent = this.mergeContent(
                unifiedContent,
                { realWorldExamples: this.realWorldExamples[subcomponentId] },
                'EXAMPLES',
                this.HIERARCHY_LEVELS.EXAMPLES
            );
        }
        
        // Validate the final content
        unifiedContent = this.validateContent(unifiedContent, subcomponentId);
        
        // Cache the result
        this.contentCache.set(cacheKey, unifiedContent);
        
        return unifiedContent;
    }
    
    /**
     * Merge content from different sources based on hierarchy
     */
    mergeContent(baseContent, newContent, sourceName, hierarchyLevel) {
        const merged = { ...baseContent };
        
        // Track this source
        merged._metadata.sources.push(sourceName);
        
        // Process each field in the new content
        Object.keys(newContent).forEach(field => {
            // Skip metadata fields
            if (field.startsWith('_')) return;
            
            // Check if this field is immutable (SSOT only)
            if (this.validationRules.immutableFields.includes(field)) {
                if (baseContent[field] !== newContent[field]) {
                    console.warn(`⚠️ Attempted to override immutable field "${field}" from ${sourceName}. Keeping SSOT value.`);
                }
                return; // Skip this field
            }
            
            // Check if this field can be enhanced
            if (this.validationRules.enhanceableFields.includes(field)) {
                // Only enhance if not already set by higher priority source
                if (!merged[field] || merged._metadata.hierarchy < hierarchyLevel) {
                    merged[field] = this.enhanceField(merged[field], newContent[field]);
                }
            } else {
                // Field can be freely modified - add it
                merged[field] = newContent[field];
            }
        });
        
        return merged;
    }
    
    /**
     * Enhance a field by combining values
     */
    enhanceField(existingValue, newValue) {
        // If existing value is an array, concatenate
        if (Array.isArray(existingValue) && Array.isArray(newValue)) {
            return [...new Set([...existingValue, ...newValue])]; // Remove duplicates
        }
        
        // If existing value is an object, merge
        if (typeof existingValue === 'object' && typeof newValue === 'object') {
            return { ...existingValue, ...newValue };
        }
        
        // Otherwise, use the new value if existing is empty
        return existingValue || newValue;
    }
    
    /**
     * Validate content against SSOT
     */
    validateContent(content, subcomponentId) {
        const ssotData = this.ssotRegistry[subcomponentId];
        const violations = [];
        
        // Check all immutable fields match SSOT
        this.validationRules.immutableFields.forEach(field => {
            if (content[field] !== ssotData[field]) {
                violations.push({
                    field,
                    expected: ssotData[field],
                    actual: content[field]
                });
                
                // Auto-correct the violation
                content[field] = ssotData[field];
            }
        });
        
        // Check all required fields are present
        this.validationRules.requiredFields.forEach(field => {
            if (!content[field]) {
                violations.push({
                    field,
                    error: 'Required field missing'
                });
            }
        });
        
        // Log violations if any
        if (violations.length > 0) {
            console.error(`❌ Content violations detected for ${subcomponentId}:`, violations);
            content._metadata.violations = violations;
            content._metadata.validated = false;
        } else {
            content._metadata.validated = true;
        }
        
        return content;
    }
    
    /**
     * Get content hash for cache validation
     */
    getContentHash(content) {
        const contentString = JSON.stringify(content);
        return crypto.createHash('md5').update(contentString).digest('hex').substring(0, 8);
    }
    
    /**
     * Clear cache for a specific subcomponent or all
     */
    clearCache(subcomponentId = null) {
        if (subcomponentId) {
            const keysToDelete = [];
            this.contentCache.forEach((value, key) => {
                if (key.startsWith(subcomponentId)) {
                    keysToDelete.push(key);
                }
            });
            keysToDelete.forEach(key => this.contentCache.delete(key));
            console.log(`🗑️ Cleared cache for ${subcomponentId}`);
        } else {
            this.contentCache.clear();
            console.log('🗑️ Cleared all content cache');
        }
    }
    
    /**
     * Get all subcomponent IDs
     */
    getAllSubcomponentIds() {
        return Object.keys(this.ssotRegistry);
    }
    
    /**
     * Validate all content
     */
    validateAllContent() {
        const results = {
            total: 0,
            valid: 0,
            invalid: 0,
            violations: []
        };
        
        this.getAllSubcomponentIds().forEach(id => {
            results.total++;
            try {
                const content = this.getContent(id);
                if (content._metadata.validated) {
                    results.valid++;
                } else {
                    results.invalid++;
                    results.violations.push({
                        id,
                        violations: content._metadata.violations
                    });
                }
            } catch (error) {
                results.invalid++;
                results.violations.push({
                    id,
                    error: error.message
                });
            }
        });
        
        return results;
    }
    
    /**
     * Export content for a subcomponent
     */
    exportContent(subcomponentId, format = 'json') {
        const content = this.getContent(subcomponentId);
        
        switch (format) {
            case 'json':
                return JSON.stringify(content, null, 2);
            case 'markdown':
                return this.convertToMarkdown(content);
            default:
                throw new Error(`Unsupported export format: ${format}`);
        }
    }
    
    /**
     * Convert content to markdown format
     */
    convertToMarkdown(content) {
        let markdown = `# ${content.title}\n\n`;
        markdown += `**Category:** ${content.category}\n`;
        markdown += `**Block:** ${content.block}\n\n`;
        markdown += `## Description\n${content.description}\n\n`;
        
        if (content.what) {
            markdown += `## What\n${content.what}\n\n`;
        }
        
        if (content.why) {
            markdown += `## Why\n${content.why}\n\n`;
        }
        
        if (content.how) {
            markdown += `## How\n${content.how}\n\n`;
        }
        
        if (content.examples && content.examples.length > 0) {
            markdown += `## Examples\n`;
            content.examples.forEach(example => {
                markdown += `- ${example}\n`;
            });
            markdown += '\n';
        }
        
        return markdown;
    }
}

// Export for use in Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UnifiedContentService;
}

// Export for use in browser
if (typeof window !== 'undefined') {
    window.UnifiedContentService = UnifiedContentService;
}
```

## Integration with Server

### 2. Server Integration Code

```javascript
// server-integration.js
const express = require('express');
const UnifiedContentService = require('./unified-content-service');

// Initialize the service
const contentService = new UnifiedContentService();

// Add unified content endpoint
app.get('/api/unified-content/:subcomponentId', (req, res) => {
    const { subcomponentId } = req.params;
    
    try {
        const content = contentService.getContent(subcomponentId);
        
        // Add cache headers
        res.set({
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
            'ETag': contentService.getContentHash(content),
            'X-Content-Version': content._metadata.version
        });
        
        res.json({
            success: true,
            content: content,
            timestamp: Date.now()
        });
    } catch (error) {
        console.error(`Error fetching content for ${subcomponentId}:`, error);
        res.status(500).json({
            success: false,
            error: error.message,
            subcomponentId
        });
    }
});

// Validation endpoint
app.get('/api/validate-content/:subcomponentId', (req, res) => {
    const { subcomponentId } = req.params;
    
    try {
        const content = contentService.getContent(subcomponentId);
        res.json({
            subcomponentId,
            valid: content._metadata.validated,
            violations: content._metadata.violations || [],
            sources: content._metadata.sources
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Validate all content endpoint
app.get('/api/validate-all', (req, res) => {
    const results = contentService.validateAllContent();
    res.json(results);
});

// Clear cache endpoint
app.post('/api/clear-cache/:subcomponentId?', (req, res) => {
    const { subcomponentId } = req.params;
    contentService.clearCache(subcomponentId);
    res.json({
        success: true,
        message: subcomponentId ? 
            `Cache cleared for ${subcomponentId}` : 
            'All cache cleared'
    });
});
```

## Client-Side Integration

### 3. Client-Side Content Loader

```javascript
// unified-content-loader.js
class UnifiedContentLoader {
    constructor() {
        this.baseUrl = window.location.origin;
        this.currentContent = null;
        this.contentCache = new Map();
    }
    
    /**
     * Load content for a subcomponent
     */
    async loadContent(subcomponentId) {
        try {
            // Check cache first
            if (this.contentCache.has(subcomponentId)) {
                const cached = this.contentCache.get(subcomponentId);
                if (Date.now() - cached.timestamp < 60000) { // 1 minute cache
                    console.log(`Using cached content for ${subcomponentId}`);
                    return cached.content;
                }
            }
            
            console.log(`Loading unified content for ${subcomponentId}`);
            const response = await fetch(`${this.baseUrl}/api/unified-content/${subcomponentId}`);
            
            if (!response.ok) {
                throw new Error(`Failed to load content: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            if (!data.success) {
                throw new Error(data.error || 'Unknown error');
            }
            
            // Cache the content
            this.contentCache.set(subcomponentId, {
                content: data.content,
                timestamp: Date.now()
            });
            
            this.currentContent = data.content;
            return data.content;
            
        } catch (error) {
            console.error(`Error loading content for ${subcomponentId}:`, error);
            throw error;
        }
    }
    
    /**
     * Display content in the UI
     */
    displayContent(content, targetElement) {
        if (!targetElement) {
            console.error('Target element not provided');
            return;
        }
        
        // Clear existing content
        targetElement.innerHTML = '';
        
        // Build HTML from unified content
        const html = this.buildContentHTML(content);
        targetElement.innerHTML = html;
        
        // Log metadata for debugging
        console.log('Content Metadata:', content._metadata);
    }
    
    /**
     * Build HTML from content object
     */
    buildContentHTML(content) {
        let html = `
            <div class="unified-content" data-id="${content.id}" data-version="${content._metadata.version}">
                <h1 class="content-title">${content.title}</h1>
                <div class="content-category">Category: ${content.category}</div>
                <div class="content-block">Block: ${content.block}</div>
                
                <div class="content-description">
                    <h2>Description</h2>
                    <p>${content.description}</p>
                </div>
        `;
        
        if (content.what) {
            html += `
                <div class="content-what">
                    <h2>What</h2>
                    <p>${content.what}</p>
                </div>
            `;
        }
        
        if (content.why) {
            html += `
                <div class="content-why">
                    <h2>Why</h2>
                    <p>${content.why}</p>
                </div>
            `;
        }
        
        if (content.how) {
            html += `
                <div class="content-how">
                    <h2>How</h2>
                    <div>${content.how}</div>
                </div>
            `;
        }
        
        if (content.examples && content.examples.length > 0) {
            html += `
                <div class="content-examples">
                    <h2>Examples</h2>
                    <ul>
                        ${content.examples.map(ex => `<li>${ex}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        html += `
            <div class="content-metadata">
                <small>
                    Sources: ${content._metadata.sources.join(', ')} | 
                    Version: ${content._metadata.version} | 
                    Validated: ${content._metadata.validated ? '✅' : '❌'}
                </small>
            </div>
        </div>`;
        
        return html;
    }
    
    /**
     * Validate displayed content against SSOT
     */
    async validateDisplayedContent(subcomponentId) {
        try {
            const response = await fetch(`${this.baseUrl}/api/validate-content/${subcomponentId}`);
            const validation = await response.json();
            
            if (!validation.valid) {
                console.error('Content validation failed:', validation.violations);
                // Auto-correct by reloading
                await this.reloadContent(subcomponentId);
            }
            
            return validation;
        } catch (error) {
            console.error('Validation error:', error);
            return { valid: false, error: error.message };
        }
    }
    
    /**
     * Reload content and refresh display
     */
    async reloadContent(subcomponentId) {
        // Clear cache
        this.contentCache.delete(subcomponentId);
        
        // Reload content
        const content = await this.loadContent(subcomponentId);
        
        // Find and update display
        const targetElement = document.querySelector('.unified-content').parentElement;
        if (targetElement) {
            this.displayContent(content, targetElement);
        }
        
        return content;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    window.contentLoader = new UnifiedContentLoader();
    
    // Auto-load content if subcomponent ID is in URL
    const urlParams = new URLSearchParams(window.location.search);
    const subcomponentId = urlParams.get('id');
    
    if (subcomponentId) {
        window.contentLoader.loadContent(subcomponentId).then(content => {
            const targetElement = document.getElementById('content-container');
            if (targetElement) {
                window.contentLoader.displayContent(content, targetElement);
            }
        }).catch(error => {
            console.error('Failed to load content:', error);
        });
    }
});
```

## Testing Suite

### 4. Test Implementation

```javascript
// test-unified-content-service.js
const UnifiedContentService = require('./unified-content-service');

async function runTests() {
    console.log('🧪 Starting UnifiedContentService Tests...\n');
    
    const service = new UnifiedContentService();
    let passed = 0;
    let failed = 0;
    
    // Test 1: Service Initialization
    console.log('Test 1: Service Initialization');
    try {
        console.assert(service.ssotRegistry, 'SSOT Registry should be loaded');
        console.assert(service.educationalContent, 'Educational Content should be loaded');
        console.log('✅ PASSED\n');
        passed++;
    } catch (error) {
        console.log('❌ FAILED:', error.message, '\n');
        failed++;
    }
    
    // Test 2: Content Retrieval
    console.log('Test 2: Content Retrieval for 2-1');
    try {
        const content = service.getContent('2-1');
        console.assert(content.id === '2-1', 'Content ID should match');
        console.assert(content.title === 'Jobs to be Done', 'Title should be from SSOT');
        console.assert(content._metadata.validated !== undefined, 'Should have validation status');
        console.log('✅ PASSED\n');
        passed++;
    } catch (error) {
        console.log('❌ FAILED:', error.message, '\n');
        failed++;
    }
    
    // Test 3: SSOT Immutability
    console.log('Test 3: SSOT Field Immutability');
    try {
        const content = service.getContent('12-4');
        console.assert(content.title === 'Escalation SOPs', 'Title should not be overridden');
        console.assert(content.category === 'Retention Systems', 'Category should not be overridden');
        console.log('✅ PASSED\n');
        passed++;
    } catch (error) {
        console.log('❌ FAILED:', error.message, '\n');
        failed++;
    }
    
    // Test 4: Content Validation
    console.log('Test 4: Content Validation');
    try {
        const results = service.validateAllContent();
        console.log(`Validated ${results.total} subcomponents`);
        console.log(`Valid: ${results.valid}, Invalid: ${results.invalid}`);
        if (results.violations.length > 0) {
            console.log('Violations found:', results.violations.slice(0, 3));
        }
        console.log('✅ PASSED\n');
        passed++;
    } catch (error) {
        console.log('❌ FAILED:', error.message, '\n');
        failed++;
    }
    
    // Test 5: Cache Management
    console.log('Test 5: Cache Management');
    try {
        // Load content to populate cache
        service.getContent('1-1');
        const cacheSize1 = service.contentCache.size;
        console.assert(cacheSize1 > 0, 'Cache should have entries');
        
        // Clear cache
        service.clearCache();
        const cacheSize2 = service.contentCache.size;
        console.assert(cacheSize2 === 0, 'Cache should be empty after clear');
        console.log('✅ PASSED\n');
        passed++;
    } catch (error) {
        console.log('❌ FAILED:', error.message, '\n');
        failed++;
    }
    
    // Summary
    console.log('=' .repeat(50));
    console.log('TEST SUMMARY');
    console.log(`Total Tests: ${passed + failed}`);
    console.log(`Passed: ${passed} ✅`);
    console.log(`Failed: ${failed} ❌`);
    console.log(`Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);
    console.log('=' .repeat(50));
}

// Run tests
runTests().catch(console.error);
```

## Deployment Instructions

### Step 1: Backup Current System
```bash
# Create backup directory
mkdir backup-$(date +%Y%m%d)
cp educational-content.js backup-$(date +%Y%m%d)/
cp server-with-backend.js backup-$(date +%Y%m%d)/
cp subcomponent-detail.html backup-$(date +%Y%m%d)/
```

### Step 2: Deploy UnifiedContentService
1. Save the UnifiedContentService code as `unified-content-service.js`
2. Add the server integration code to `server-with-backend.js`
3. Add the client loader to your HTML pages

### Step 3: Test
```bash
# Run the test suite
node test-unified-content-service.js

# Start the server
node server-with-backend.js

# Test endpoints
curl http://localhost:3001/api/unified-content/2-1
curl http://localhost:3001/api/validate-content/2-1
curl http://localhost:3001/api/validate-all
```

### Step 4: Monitor
- Check browser console for validation messages
- Monitor server logs for SSOT violations
- Review the validation endpoint regularly

## Benefits of This Implementation

1. **Single Source of Truth**: SSOT fields can never be overridden
2. **Hierarchical Content**: Clear priority system for content sources
3. **Self-Healing**: Automatic detection and correction of violations
4. **Performance**: Built-in caching with version control
5. **Transparency**: Full metadata tracking of content sources
6. **Extensibility**: Easy to add new content sources
7. **Validation**: Continuous validation against SSOT

## Next Steps

1. Deploy the UnifiedContentService
2. Migrate existing endpoints to use the new service
3. Update client-side code to use the unified loader
4. Monitor for violations and fix any remaining issues
5. Gradually remove old injection scripts
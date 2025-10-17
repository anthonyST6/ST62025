# ScaleOps6 Content Architecture Solution

## Executive Summary
The ScaleOps6 platform currently suffers from content misalignment due to multiple competing content injection systems. This architecture provides a systematic solution to ensure the Single Source of Truth (SSOT) remains authoritative across all 96 subcomponents.

## Problem Statement
- Multiple JavaScript files inject content without coordination
- No clear content hierarchy or authority
- Browser caching causes stale content display
- Real-world examples override core educational content
- No validation between displayed content and SSOT

## Solution Architecture

### 1. Unified Content Service
Create a centralized content service that aggregates all content sources while maintaining SSOT authority.

```javascript
// content-service.js
class UnifiedContentService {
    constructor() {
        this.ssot = require('./core/complete-ssot-registry.js');
        this.educational = require('./educational-content.js');
        this.agents = require('./agent-subcomponent-mapping.js');
        this.examples = require('./real-world-examples.js');
    }
    
    getContent(subcomponentId) {
        // Start with SSOT as base
        const content = {
            ...this.ssot[subcomponentId],
            source: 'SSOT',
            version: Date.now()
        };
        
        // Layer educational content (cannot override SSOT fields)
        if (this.educational[subcomponentId]) {
            content.education = this.educational[subcomponentId];
        }
        
        // Add agent mappings (supplementary only)
        if (this.agents[subcomponentId]) {
            content.agentInfo = this.agents[subcomponentId];
        }
        
        // Add examples (supplementary only)
        if (this.examples[subcomponentId]) {
            content.examples = this.examples[subcomponentId];
        }
        
        return this.validate(content);
    }
    
    validate(content) {
        // Ensure SSOT fields are never overridden
        const ssotFields = ['title', 'category', 'description', 'id'];
        ssotFields.forEach(field => {
            if (content[field] !== this.ssot[content.id][field]) {
                console.error(`SSOT violation: ${field} mismatch for ${content.id}`);
                content[field] = this.ssot[content.id][field];
            }
        });
        return content;
    }
}
```

### 2. Content Injection Controller
Replace multiple injection scripts with a single controlled injection system.

```javascript
// content-injection-controller.js
class ContentInjectionController {
    constructor() {
        this.contentService = new UnifiedContentService();
        this.injectionPoints = new Map();
    }
    
    registerInjectionPoint(elementId, contentType) {
        this.injectionPoints.set(elementId, {
            type: contentType,
            element: document.getElementById(elementId),
            lastUpdate: null
        });
    }
    
    inject(subcomponentId) {
        const content = this.contentService.getContent(subcomponentId);
        
        this.injectionPoints.forEach((point, elementId) => {
            if (point.element) {
                const relevantContent = this.extractRelevantContent(content, point.type);
                this.renderContent(point.element, relevantContent);
                point.lastUpdate = Date.now();
            }
        });
    }
    
    extractRelevantContent(content, type) {
        switch(type) {
            case 'education':
                return content.education;
            case 'examples':
                return content.examples;
            case 'workspace':
                return content.agentInfo;
            default:
                return content;
        }
    }
    
    renderContent(element, content) {
        // Controlled rendering with SSOT validation
        element.innerHTML = this.generateHTML(content);
    }
}
```

### 3. Cache Management System
Implement versioning and cache-busting to prevent stale content.

```javascript
// cache-manager.js
class CacheManager {
    constructor() {
        this.version = 'v2.0.0'; // Increment on content updates
        this.contentHash = new Map();
    }
    
    bustCache() {
        // Add version to all script URLs
        document.querySelectorAll('script').forEach(script => {
            if (script.src && !script.src.includes('?v=')) {
                script.src = `${script.src}?v=${this.version}`;
            }
        });
        
        // Clear localStorage
        localStorage.clear();
        
        // Force reload of content
        if ('caches' in window) {
            caches.keys().then(names => {
                names.forEach(name => caches.delete(name));
            });
        }
    }
    
    getContentHash(content) {
        return btoa(JSON.stringify(content)).substring(0, 8);
    }
    
    hasContentChanged(subcomponentId, newContent) {
        const newHash = this.getContentHash(newContent);
        const oldHash = this.contentHash.get(subcomponentId);
        
        if (oldHash !== newHash) {
            this.contentHash.set(subcomponentId, newHash);
            return true;
        }
        return false;
    }
}
```

### 4. Runtime Validation System
Continuous validation to ensure displayed content matches SSOT.

```javascript
// runtime-validator.js
class RuntimeValidator {
    constructor() {
        this.ssot = require('./core/complete-ssot-registry.js');
        this.validationInterval = 5000; // Check every 5 seconds
        this.violations = [];
    }
    
    startValidation() {
        setInterval(() => this.validateDisplayedContent(), this.validationInterval);
    }
    
    validateDisplayedContent() {
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id');
        
        if (!subcomponentId) return;
        
        const ssotContent = this.ssot[subcomponentId];
        const displayedTitle = document.querySelector('h1')?.textContent;
        const displayedDescription = document.querySelector('.description')?.textContent;
        
        const violations = [];
        
        if (displayedTitle !== ssotContent.title) {
            violations.push({
                field: 'title',
                expected: ssotContent.title,
                actual: displayedTitle
            });
        }
        
        if (violations.length > 0) {
            this.handleViolations(violations);
        }
    }
    
    handleViolations(violations) {
        console.error('SSOT Violations Detected:', violations);
        
        // Auto-correct violations
        violations.forEach(violation => {
            this.correctViolation(violation);
        });
        
        // Log for monitoring
        this.logViolations(violations);
    }
    
    correctViolation(violation) {
        // Automatically fix the displayed content
        switch(violation.field) {
            case 'title':
                const titleElement = document.querySelector('h1');
                if (titleElement) {
                    titleElement.textContent = violation.expected;
                }
                break;
            // Add more field corrections as needed
        }
    }
    
    logViolations(violations) {
        // Send to monitoring system
        fetch('/api/content-violations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                timestamp: Date.now(),
                violations: violations,
                url: window.location.href
            })
        });
    }
}
```

### 5. Consolidated Content API
Single endpoint for all content requests.

```javascript
// server-content-api.js
app.get('/api/unified-content/:subcomponentId', (req, res) => {
    const { subcomponentId } = req.params;
    const contentService = new UnifiedContentService();
    
    try {
        const content = contentService.getContent(subcomponentId);
        
        // Add cache headers
        res.set({
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
            'ETag': contentService.getContentHash(content)
        });
        
        res.json({
            success: true,
            content: content,
            version: '2.0.0',
            timestamp: Date.now()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});
```

## Implementation Plan

### Phase 1: Foundation (Week 1)
1. Create UnifiedContentService class
2. Implement content hierarchy rules
3. Build validation layer
4. Test with 5 sample subcomponents

### Phase 2: Migration (Week 2)
1. Replace existing injection scripts with ContentInjectionController
2. Update server endpoints to use unified API
3. Implement cache management
4. Migrate 50% of subcomponents

### Phase 3: Validation (Week 3)
1. Deploy RuntimeValidator
2. Set up monitoring and alerting
3. Complete migration of all 96 subcomponents
4. Performance testing

### Phase 4: Optimization (Week 4)
1. Fine-tune caching strategy
2. Optimize content delivery
3. Implement rollback mechanism
4. Documentation and training

## Success Metrics
- 100% content alignment with SSOT
- Zero content violations in production
- <100ms content load time
- 99.9% content accuracy
- Automated violation detection and correction

## Risk Mitigation
1. **Rollback Strategy**: Keep old system available with feature flag
2. **Gradual Rollout**: Deploy to 10% → 50% → 100% of users
3. **Monitoring**: Real-time alerts for content violations
4. **Backup**: Daily SSOT snapshots for recovery

## Maintenance Plan
1. Weekly content audits
2. Monthly SSOT validation
3. Quarterly architecture review
4. Automated testing for all content changes

## Conclusion
This architecture ensures that the SSOT remains the authoritative source for all content while allowing for controlled enhancement through lower-priority content layers. The system is self-healing, automatically detecting and correcting violations to maintain content integrity.
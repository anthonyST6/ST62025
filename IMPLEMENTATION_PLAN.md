# Implementation Plan: Fix Content Misalignment

## Overview
This plan provides step-by-step instructions to fix the content misalignment issue where the UI doesn't reflect the SSOT (Single Source of Truth) for subcomponent 2-1 and potentially all 96 subcomponents.

## Phase 1: Immediate Fix (15 minutes)

### Step 1: Create SSOT Enforcer Script
**File:** `ssot-enforcer.js`
```javascript
// This script ensures SSOT data is never overridden
(function() {
    let SSOT_DATA = null;
    let PROTECTION_ACTIVE = true;
    
    // Fetch and store SSOT data
    async function loadSSoTData() {
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        
        try {
            const response = await fetch(`/api/subcomponents/${subcomponentId}`);
            const data = await response.json();
            SSOT_DATA = data;
            console.log('✅ SSOT Data Loaded:', {
                id: subcomponentId,
                name: data.name,
                agent: data.agent,
                title: data.education?.title
            });
            enforceSSoT();
        } catch (error) {
            console.error('❌ Failed to load SSOT data:', error);
        }
    }
    
    // Enforce SSOT values
    function enforceSSoT() {
        if (!SSOT_DATA || !PROTECTION_ACTIVE) return;
        
        // Fix title
        const titleElement = document.getElementById('subcomponent-title');
        if (titleElement && SSOT_DATA.agent) {
            const currentTitle = titleElement.textContent.trim();
            const correctTitle = SSOT_DATA.agent.toUpperCase();
            if (currentTitle !== correctTitle) {
                console.warn(`🔧 Correcting title from "${currentTitle}" to "${correctTitle}"`);
                titleElement.textContent = correctTitle;
            }
        }
        
        // Fix subcomponent name
        const nameElement = document.getElementById('subcomponent-name');
        if (nameElement && SSOT_DATA.name) {
            const currentName = nameElement.textContent.trim();
            if (currentName !== SSOT_DATA.name) {
                console.warn(`🔧 Correcting name from "${currentName}" to "${SSOT_DATA.name}"`);
                nameElement.textContent = SSOT_DATA.name;
            }
        }
        
        // Fix description
        const descElement = document.getElementById('subcomponent-description');
        if (descElement && SSOT_DATA.description) {
            descElement.textContent = SSOT_DATA.description;
        }
    }
    
    // Monitor for changes
    function startMonitoring() {
        const observer = new MutationObserver((mutations) => {
            enforceSSoT();
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true
        });
        
        // Also enforce periodically
        setInterval(enforceSSoT, 1000);
    }
    
    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            loadSSoTData();
            startMonitoring();
        });
    } else {
        loadSSoTData();
        startMonitoring();
    }
    
    // Expose for debugging
    window.SSOT_ENFORCER = {
        getData: () => SSOT_DATA,
        reload: loadSSoTData,
        enforce: enforceSSoT,
        disable: () => { PROTECTION_ACTIVE = false; },
        enable: () => { PROTECTION_ACTIVE = true; enforceSSoT(); }
    };
})();
```

### Step 2: Update HTML File
**File:** `subcomponent-detail.html`

Add this script FIRST, before all other scripts (after line 1765):
```html
<!-- SSOT ENFORCER - MUST BE FIRST -->
<script src="ssot-enforcer.js"></script>
```

Comment out problematic scripts (lines 1791, 1767, 1916):
```html
<!-- TEMPORARILY DISABLED FOR SSOT FIX
<script src="fix-real-world-examples-injection.js"></script>
<script src="fix-education-complete-display.js"></script>
<script src="systemic-complete-fix-8i.js"></script>
-->
```

### Step 3: Test the Fix
1. Restart the server: `node server-with-backend.js`
2. Navigate to: http://localhost:3001/subcomponent-detail.html?id=2-1
3. Open browser console
4. Verify:
   - Title shows "JOBS TO BE DONE" (not "JTBD SPECIALIST")
   - Console shows "✅ SSOT Data Loaded"
   - No content flickering

## Phase 2: Unified Content Service (1 hour)

### Step 1: Create Unified Content Service
**File:** `unified-content-service.js`

Use the implementation from `UNIFIED_CONTENT_SERVICE_IMPLEMENTATION.md`

### Step 2: Update Server
**File:** `server-with-backend.js`

Add new endpoint:
```javascript
const UnifiedContentService = require('./unified-content-service');
const contentService = new UnifiedContentService();

// New unified content endpoint
app.get('/api/unified-content/:subcomponentId', (req, res) => {
    const { subcomponentId } = req.params;
    
    try {
        const content = contentService.getContent(subcomponentId);
        res.json({
            success: true,
            content: content,
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

### Step 3: Update Client
**File:** `unified-content-loader.js`

Create client-side loader (from implementation doc)

### Step 4: Update HTML
Replace the loadSubcomponentData function:
```javascript
async function loadSubcomponentData() {
    try {
        const response = await fetch(`/api/unified-content/${subcomponentId}`);
        const data = await response.json();
        
        if (data.success) {
            updatePageContent(data.content);
            updateEducationTab(data.content.education);
            // ... rest of updates
        }
    } catch (error) {
        console.error('Error loading unified content:', error);
    }
}
```

## Phase 3: Clean Up (30 minutes)

### Step 1: Remove Redundant Scripts
Delete or archive these files:
- `fix-real-world-examples-injection.js`
- `fix-education-complete-display.js`
- `systemic-complete-fix-8i.js`
- All other "fix-" prefixed files

### Step 2: Consolidate Content Sources
1. Move all content to SSOT registry
2. Update educational content to reference SSOT
3. Ensure agent mappings use SSOT

### Step 3: Add Monitoring
**File:** `content-monitor.js`
```javascript
class ContentMonitor {
    constructor() {
        this.violations = [];
        this.startTime = Date.now();
    }
    
    logViolation(type, details) {
        const violation = {
            type,
            details,
            timestamp: Date.now(),
            url: window.location.href
        };
        this.violations.push(violation);
        console.error('SSOT Violation:', violation);
        
        // Send to server for tracking
        fetch('/api/log-violation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(violation)
        });
    }
    
    getReport() {
        return {
            totalViolations: this.violations.length,
            uptime: Date.now() - this.startTime,
            violations: this.violations
        };
    }
}

window.contentMonitor = new ContentMonitor();
```

## Testing Checklist

### Subcomponent 2-1 Specific Tests
- [ ] Navigate to http://localhost:3001/subcomponent-detail.html?id=2-1
- [ ] Verify title shows "JOBS TO BE DONE"
- [ ] Verify description mentions JTBD framework
- [ ] Check education tab content is correct
- [ ] Verify no console errors
- [ ] Check network tab shows unified content API call

### All Subcomponents Test
- [ ] Test 5 random subcomponents (e.g., 1-1, 5-3, 10-2, 12-4, 16-6)
- [ ] Verify each shows correct agent name
- [ ] Verify each shows correct subcomponent name
- [ ] Check templates match SSOT
- [ ] Verify workspace questions load correctly

### Performance Tests
- [ ] Page load time < 2 seconds
- [ ] No content flickering
- [ ] No multiple API calls for same content
- [ ] Cache working correctly

## Rollback Plan

If issues occur:
1. **Immediate Rollback:**
   - Remove `ssot-enforcer.js` script tag
   - Uncomment disabled scripts
   - Restart server

2. **Partial Rollback:**
   - Keep SSOT enforcer
   - Re-enable specific scripts as needed
   - Monitor for conflicts

3. **Data Backup:**
   - Backup current SSOT registry
   - Export current educational content
   - Save agent mappings

## Success Criteria

### Must Have (P0)
- ✅ Subcomponent 2-1 shows correct content
- ✅ No SSOT violations in console
- ✅ All 96 subcomponents display correctly

### Should Have (P1)
- ✅ Unified content service operational
- ✅ Single API endpoint for content
- ✅ Content caching working

### Nice to Have (P2)
- ✅ Monitoring dashboard
- ✅ Automated violation alerts
- ✅ Performance metrics

## Timeline

### Day 1 (Today)
- **Hour 1:** Implement Phase 1 (Immediate Fix)
- **Hour 2:** Test and verify fix works
- **Hour 3:** Document findings

### Day 2
- **Morning:** Implement Phase 2 (Unified Service)
- **Afternoon:** Testing and validation

### Day 3
- **Morning:** Phase 3 (Clean up)
- **Afternoon:** Full system test
- **End of Day:** Deploy to production

## Commands for Implementation

```bash
# 1. Create enforcer script
echo "Creating SSOT enforcer..."
touch ssot-enforcer.js

# 2. Backup current HTML
cp subcomponent-detail.html subcomponent-detail.html.backup

# 3. Create unified service
touch unified-content-service.js

# 4. Test the fix
node server-with-backend.js

# 5. Open browser
open http://localhost:3001/subcomponent-detail.html?id=2-1
```

## Risk Mitigation

### Risk 1: Breaking existing functionality
**Mitigation:** Keep all changes additive initially, don't remove existing code

### Risk 2: Performance degradation
**Mitigation:** Implement caching, use debouncing for enforcement

### Risk 3: Incomplete SSOT data
**Mitigation:** Fallback to existing data sources when SSOT incomplete

## Conclusion

This implementation plan provides a systematic approach to fixing the content misalignment issue. The phased approach ensures:
1. **Immediate relief** through the SSOT enforcer
2. **Long-term solution** through unified content service
3. **Clean architecture** through consolidation

The plan is designed to be executed in code mode with clear, actionable steps and verification points.
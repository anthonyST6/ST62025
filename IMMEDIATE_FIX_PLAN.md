# Immediate Fix Plan for Content Misalignment

## Quick Wins (Can be done TODAY)

### 1. Disable Problematic Injection Scripts
Remove or comment out these script tags from `subcomponent-detail.html`:
```html
<!-- DISABLE THESE IMMEDIATELY -->
<!-- <script src="fix-real-world-examples-injection.js"></script> -->
<!-- <script src="real-world-examples-all-96-complete.js"></script> -->
<!-- <script src="complete-all-96-examples-final.js"></script> -->
<!-- <script src="complete-blocks-13-16-final.js"></script> -->
```

### 2. Fix Educational Content Misalignments
Run this script to fix all "what" descriptions:
```javascript
// fix-all-what-descriptions.js
const fs = require('fs');
const { ssotRegistry } = require('./core/complete-ssot-registry.js');
const { educationalContent } = require('./educational-content.js');

Object.keys(ssotRegistry).forEach(id => {
    const ssot = ssotRegistry[id];
    const edu = educationalContent[id];
    
    if (edu && edu.what !== ssot.description) {
        console.log(`Fixing ${id}: ${ssot.title}`);
        // Update educational content to match SSOT
        educationalContent[id].what = ssot.description;
    }
});

// Save the fixed content
fs.writeFileSync('educational-content-fixed.js', 
    `const educationalContent = ${JSON.stringify(educationalContent, null, 2)};\n\nmodule.exports = { educationalContent };`
);
```

### 3. Create Content Validation Endpoint
Add this to `server-with-backend.js`:
```javascript
app.get('/api/validate-content/:id', (req, res) => {
    const { id } = req.params;
    const ssot = ssotRegistry[id];
    const educational = educationalContent[id];
    
    const issues = [];
    
    if (educational.title !== ssot.title) {
        issues.push({ field: 'title', ssot: ssot.title, current: educational.title });
    }
    
    if (educational.what !== ssot.description) {
        issues.push({ field: 'what', ssot: ssot.description, current: educational.what });
    }
    
    res.json({
        subcomponent: id,
        valid: issues.length === 0,
        issues: issues
    });
});
```

### 4. Add Client-Side SSOT Enforcement
Create `ssot-enforcer.js`:
```javascript
// This script ensures SSOT content is always displayed correctly
(function() {
    // Fetch SSOT content from server
    async function enforceSSOT() {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        
        if (!id) return;
        
        try {
            const response = await fetch(`/api/subcomponents/${id}`);
            const data = await response.json();
            
            // Force correct title
            const titleElements = document.querySelectorAll('h1, .subcomponent-title');
            titleElements.forEach(el => {
                if (el.textContent !== data.title) {
                    console.log(`Correcting title from "${el.textContent}" to "${data.title}"`);
                    el.textContent = data.title;
                }
            });
            
            // Force correct description in "What" section
            const whatSection = document.querySelector('.education-section .what-content');
            if (whatSection && data.description) {
                whatSection.textContent = data.description;
            }
        } catch (error) {
            console.error('Failed to enforce SSOT:', error);
        }
    }
    
    // Run on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', enforceSSOT);
    } else {
        enforceSSOT();
    }
    
    // Re-run when tabs change
    if (window.switchTab) {
        const originalSwitchTab = window.switchTab;
        window.switchTab = function(tabName, event) {
            originalSwitchTab.call(this, tabName, event);
            if (tabName === 'education') {
                setTimeout(enforceSSOT, 100);
            }
        };
    }
})();
```

## Testing Checklist

### Before Fix
- [ ] Document current misalignments (screenshot)
- [ ] Note which subcomponents are affected
- [ ] Save current state for rollback

### Apply Fixes
1. [ ] Disable injection scripts in HTML
2. [ ] Run fix-all-what-descriptions.js
3. [ ] Add validation endpoint to server
4. [ ] Add ssot-enforcer.js to HTML
5. [ ] Clear browser cache (Ctrl+Shift+Delete)
6. [ ] Restart server

### After Fix Validation
- [ ] Check subcomponent 2-1 (Jobs to be Done)
- [ ] Check subcomponent 12-4 (Escalation SOPs)
- [ ] Verify all 96 subcomponents show correct titles
- [ ] Confirm "What" sections match SSOT descriptions
- [ ] Test that content persists after tab switches

## Rollback Plan
If issues occur:
1. Re-enable commented scripts
2. Restore original educational-content.js
3. Remove ssot-enforcer.js
4. Restart server

## Long-term Solution
See `CONTENT_ARCHITECTURE_SOLUTION.md` for the complete architectural overhaul that will permanently fix these issues.

## Contact for Issues
If you encounter problems during implementation:
1. Check browser console for errors
2. Verify server is running
3. Ensure all file paths are correct
4. Clear cache and hard refresh (Ctrl+F5)
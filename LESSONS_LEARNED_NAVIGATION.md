# ST6 Navigation Layout - Lessons Learned
## Date: 2025-09-28
## Purpose: Preserve working navigation design for future reference

## Critical Navigation Components

### 1. Navigation Bar Design (nav.js)
**File:** `DEVST6/nav.js`

**Key Design Elements:**
- **Background:** Linear gradient from #1a1a1a to #111111
- **Border:** 2px solid #FF5500 (orange accent)
- **Logo:** Uses image files instead of text
  - Main logo: `images/scaleops6-logo.png`
  - Mobile logo: `images/scaleops6-logo-small.png`
- **User Session Display:** Shows username and email when logged in
- **Guest Mode:** Shows "Guest User" with option to login

### 2. Required Files for Navigation
**Core Files:**
- `nav.js` - Main navigation component
- `block-detail.html` - Block detail viewer
- `dashboard.html` - Main dashboard
- `login.html` - Login page

**JavaScript Dependencies:**
- `score-analysis-engine.js` - Scoring logic
- `recommendations-component.js` - Recommendations display
- `enhanced-display-handler.js` - Enhanced UI handling
- `chart.min.js` - Chart.js library for visualizations

### 3. Navigation Flow
```
Dashboard → Block Selection → Block Detail → Subcomponent Detail
```

### 4. Tab Structure in Block Detail
Current tabs (in order):
1. **EDUCATION** - Educational content
2. **WORKSPACE** - Interactive workspace
3. **ANALYSIS** - Analysis tools
4. **RESOURCES** - Resource library
5. **SCORE HISTORY** - Historical scores

**NEW REQUIREMENT:** Add OUTPUT tab between ANALYSIS and RESOURCES

### 5. Session Management
- Uses localStorage for session data:
  - `sessionId`
  - `userName`
  - `userEmail`
  - `isGuest`

### 6. Server Configuration
- **Port:** 3001
- **Start Command:** `cd DEVST6 && npm start`
- **Static Files:** Served from DEVST6 directory

## Recovery Instructions

If navigation breaks again, follow these steps:

1. **Check nav.js styling:**
   ```javascript
   navElement.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #111111 100%)';
   navElement.style.border = '2px solid #FF5500';
   ```

2. **Verify logo images exist:**
   - `DEVST6/images/scaleops6-logo.png`
   - `DEVST6/images/scaleops6-logo-small.png`

3. **Ensure block-detail.html is present:**
   - Copy from ST62025 if missing: `ST62025/block-detail.html`

4. **Check JavaScript dependencies:**
   - All JS files should be in DEVST6 root directory
   - Copy from ST62025 if missing

5. **Verify server routes:**
   - Check that server.js properly serves static files
   - Ensure all HTML files are accessible

## File Comparison Reference

### Files to Compare with ST62025:
- `nav.js` - Navigation component
- `block-detail.html` - Block detail page
- `dashboard.html` - Dashboard layout
- `score-analysis-engine.js` - Scoring logic
- `recommendations-component.js` - Recommendations
- `enhanced-display-handler.js` - UI enhancements

## Notes
- Always test navigation after changes
- Keep ST62025 as reference implementation
- Don't modify gradient or border colors
- Maintain session management structure
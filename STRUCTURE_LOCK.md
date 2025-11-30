# 🔒 ScaleOps Platform Structure Lock

**Status:** LOCKED as of 2025-11-30  
**Purpose:** Define immutable platform structure vs. flexible content areas  
**Authority:** This document serves as the contract between structure and content work

---

## 📋 Executive Summary

The ScaleOps platform structure is now **FROZEN**. All future work focuses on:
- **Agents** (AI analysis and scoring logic)
- **Scoring** (evaluation algorithms and rubrics)
- **Content** (training materials, scenarios, and resources)

**NO structural changes** will be made without explicit override approval.

---

## 🔴 LOCKED STRUCTURE (Do Not Modify)

### 1. UI Components & Layout

**Files:** `dashboard.html`, `block-detail.html`, `subcomponent-detail.html`, phase pages

**Locked Elements:**
- ✗ Navigation structure and routing
- ✗ Page layouts and grid systems
- ✗ Modal structures and popups
- ✗ Button placements and UI controls
- ✗ Tab systems and navigation flows
- ✗ Score display components
- ✗ Chart and visualization layouts
- ✗ Header/footer structures
- ✗ Responsive breakpoints

**Why Locked:** UI stability ensures consistent user experience and prevents regression.

---

### 2. Database Schema

**Files:** `database-schema.sql`, `database-service.js`, migration scripts

**Locked Elements:**
- ✗ Table structures and relationships
- ✗ Column definitions and types
- ✗ Indexes and constraints
- ✗ Foreign key relationships
- ✗ Database service methods (CRUD operations)
- ✗ Query patterns and joins
- ✗ Transaction handling

**Why Locked:** Schema changes risk data integrity and require complex migrations.

**Exception:** New tables for content/scoring metadata MAY be added with approval.

---

### 3. Core Platform Logic

**Files:** `server.js`, `auth-*.js`, `payment-*.js`, routing files

**Locked Elements:**
- ✗ Authentication flows
- ✗ Authorization logic
- ✗ Payment processing
- ✗ Session management
- ✗ API endpoint structure
- ✗ Middleware chain
- ✗ Error handling patterns
- ✗ Security implementations

**Why Locked:** Core logic changes introduce security and stability risks.

---

### 4. File Organization

**Locked Elements:**
- ✗ Directory structure
- ✗ File naming conventions
- ✗ Module organization
- ✗ Import/export patterns
- ✗ Build configuration
- ✗ Deployment structure

**Why Locked:** Consistent organization enables team collaboration and maintenance.

---

## 🟢 UNLOCKED CONTENT (Freely Modifiable)

### 1. Agent Logic & Scoring

**Files:** `*-agent*.js`, `score-analysis-engine.js`, `recommendations-library.js`

**Modifiable Elements:**
- ✓ Evaluation dimensions and weights
- ✓ Scoring algorithms and calculations
- ✓ Rubric criteria and thresholds
- ✓ Feedback generation logic
- ✓ Recommendation algorithms
- ✓ Analysis depth and sophistication
- ✓ Pattern recognition logic
- ✓ Validation rules

**Examples:**
```javascript
// ✓ ALLOWED: Modify scoring weights
this.evaluationDimensions = {
    problemClarity: { weight: 0.25 },  // Changed from 0.20
    marketValidation: { weight: 0.25 }  // Changed from 0.20
};

// ✓ ALLOWED: Add new evaluation criteria
criteria: [
    'Existing criterion',
    'NEW: Additional validation check'  // Added
]

// ✓ ALLOWED: Improve recommendation logic
generateRecommendations(scores) {
    // Enhanced algorithm here
}
```

**Constraints:**
- Must maintain return value structure (score, recommendations, analysis)
- Must not break API contracts with UI
- Must preserve data types expected by database

---

### 2. Training Content & Resources

**Files:** `educational-content.js`, `st6co-demo-data-complete.js`, content libraries

**Modifiable Elements:**
- ✓ Question text and phrasing
- ✓ Educational materials and guides
- ✓ Example scenarios and case studies
- ✓ Demo data and sample answers
- ✓ Help text and tooltips
- ✓ Resource documents and templates
- ✓ Video scripts and transcripts
- ✓ Learning paths and curricula

**Examples:**
```javascript
// ✓ ALLOWED: Update question text
questions: [
    {
        id: 'q1',
        text: 'NEW: Improved question phrasing...',  // Changed
        type: 'textarea'  // Structure unchanged
    }
]

// ✓ ALLOWED: Add new educational content
resources: [
    {
        title: 'New Guide: Advanced Techniques',  // Added
        type: 'guide',
        content: '...'
    }
]

// ✓ ALLOWED: Enhance demo data
demoData: {
    '1-1': {
        'field1': 'More detailed and realistic answer...'  // Improved
    }
}
```

**Constraints:**
- Must maintain data structure (keys, types)
- Must not change field IDs or question IDs
- Must preserve backward compatibility

---

### 3. Scoring Configuration

**Files:** Configuration objects within agent files, scoring thresholds

**Modifiable Elements:**
- ✓ Score thresholds (excellent/good/needs improvement)
- ✓ Dimension weights and importance
- ✓ Evaluation criteria definitions
- ✓ Feedback templates and messages
- ✓ Recommendation priorities
- ✓ Success metrics definitions
- ✓ Benchmark values

**Examples:**
```javascript
// ✓ ALLOWED: Adjust score thresholds
function getScoreClass(score) {
    if (score >= 85) return 'excellent';  // Changed from 80
    if (score >= 65) return 'good';       // Changed from 60
    return 'needs-improvement';
}

// ✓ ALLOWED: Modify evaluation criteria
evaluateDimension(data) {
    let score = 0;
    
    // Enhanced evaluation logic
    if (data.field1.length > 200) {  // Changed from 100
        score += 30;  // Changed from 25
    }
    
    return score;
}
```

---

### 4. Recommendation Content

**Files:** `recommendations-library.js`, recommendation generation in agents

**Modifiable Elements:**
- ✓ Recommendation text and descriptions
- ✓ Action plans and implementation steps
- ✓ Success metrics and KPIs
- ✓ Priority levels and urgency
- ✓ Impact estimates
- ✓ Resource suggestions
- ✓ Best practices and tips

**Examples:**
```javascript
// ✓ ALLOWED: Enhance recommendations
{
    priority: 'HIGH',
    area: 'Problem Validation',
    actionPlan: [
        'NEW: More specific action step',  // Enhanced
        'Conduct 30 customer interviews',  // Changed from 20
        'Document quantifiable pain points'
    ],
    impact: '+12 points',  // Recalculated
    successMetrics: [
        'NEW: Additional success metric'  // Added
    ]
}
```

---

## 🎯 Content Modification Zones

### Zone 1: Agent Intelligence (HIGH PRIORITY)

**Location:** `*-agent-enhanced.js` files

**Focus Areas:**
1. **Evaluation Logic** - How agents assess quality
2. **Scoring Algorithms** - How scores are calculated
3. **Feedback Generation** - What feedback is provided
4. **Recommendation Engine** - What actions are suggested

**Modification Freedom:** FULL - Improve as needed

**Testing Required:** Verify scores remain in 0-100 range

---

### Zone 2: Educational Content (HIGH PRIORITY)

**Location:** `educational-content.js`, content libraries

**Focus Areas:**
1. **Question Quality** - Clarity, relevance, depth
2. **Learning Materials** - Guides, examples, templates
3. **Help Resources** - Tooltips, documentation, videos
4. **Demo Data** - Realistic, comprehensive examples

**Modification Freedom:** FULL - Enhance as needed

**Testing Required:** Verify data structure compatibility

---

### Zone 3: Scoring Rubrics (MEDIUM PRIORITY)

**Location:** Evaluation methods within agent files

**Focus Areas:**
1. **Criteria Definitions** - What makes a good answer
2. **Weight Distributions** - Importance of each dimension
3. **Threshold Values** - Score boundaries
4. **Validation Rules** - What constitutes completeness

**Modification Freedom:** FULL - Refine as needed

**Testing Required:** Verify score distribution is reasonable

---

### Zone 4: Recommendation Library (MEDIUM PRIORITY)

**Location:** `recommendations-library.js`

**Focus Areas:**
1. **Recommendation Content** - Actionable advice
2. **Priority Logic** - What's most important
3. **Impact Estimates** - Expected improvements
4. **Implementation Guidance** - How to execute

**Modification Freedom:** FULL - Expand as needed

**Testing Required:** Verify recommendations are actionable

---

## ⚠️ Modification Guidelines

### DO ✓

1. **Improve Agent Intelligence**
   - Enhance evaluation criteria
   - Refine scoring algorithms
   - Add new dimensions
   - Improve feedback quality

2. **Enhance Content Quality**
   - Write better questions
   - Create richer examples
   - Add more resources
   - Improve demo data

3. **Optimize Scoring**
   - Adjust weights
   - Refine thresholds
   - Add validation rules
   - Improve accuracy

4. **Expand Recommendations**
   - Add new recommendations
   - Improve action plans
   - Enhance success metrics
   - Provide better guidance

### DON'T ✗

1. **Modify UI Structure**
   - Change layouts
   - Move buttons
   - Alter navigation
   - Modify modals

2. **Change Database Schema**
   - Add/remove columns
   - Modify relationships
   - Change data types
   - Alter indexes

3. **Alter Core Logic**
   - Change authentication
   - Modify routing
   - Update API structure
   - Change security

4. **Reorganize Files**
   - Move files
   - Rename modules
   - Change imports
   - Restructure directories

---

## 🔍 How to Verify Compliance

### Before Making Changes

1. **Check File Location**
   - Is it in a content/agent file? → Probably OK
   - Is it in a UI/database file? → STOP

2. **Check Modification Type**
   - Changing text/logic/algorithms? → OK
   - Changing structure/schema/layout? → STOP

3. **Check Dependencies**
   - Does it affect UI rendering? → STOP
   - Does it affect database queries? → STOP
   - Does it only affect content/scoring? → OK

### After Making Changes

1. **Test Score Calculation**
   - Scores still 0-100? ✓
   - Recommendations still generated? ✓
   - Analysis still displays? ✓

2. **Test UI Compatibility**
   - No layout breaks? ✓
   - No console errors? ✓
   - Data displays correctly? ✓

3. **Test Database Compatibility**
   - Saves successfully? ✓
   - Retrieves correctly? ✓
   - No schema errors? ✓

---

## 📊 Structure Lock Enforcement

### Violation Detection

**Automatic Checks:**
- Git hooks prevent commits to locked files
- CI/CD pipeline validates structure integrity
- Code review checklist includes structure compliance

**Manual Review:**
- All PRs reviewed for structure violations
- Monthly structure audit
- Quarterly architecture review

### Override Process

**When Override Needed:**
1. Critical bug in locked structure
2. Security vulnerability
3. Performance issue requiring structural change
4. Regulatory compliance requirement

**Override Approval:**
1. Document reason and impact
2. Get technical lead approval
3. Get product owner approval
4. Update this document
5. Communicate to team

---

## 🎓 Examples: Allowed vs. Forbidden

### ✓ ALLOWED: Improve Agent Scoring

```javascript
// BEFORE
evaluateClarity(data) {
    let score = 0;
    if (data.length > 50) score += 50;
    return score;
}

// AFTER - Enhanced logic
evaluateClarity(data) {
    let score = 0;
    
    // More sophisticated evaluation
    if (data.length > 100) score += 30;
    if (data.includes('specific')) score += 20;
    if (data.match(/\d+/)) score += 20;
    if (data.split('.').length > 3) score += 30;
    
    return Math.min(score, 100);
}
```

### ✗ FORBIDDEN: Change UI Layout

```javascript
// ✗ DON'T DO THIS
// Changing grid structure
<div class="blocks-grid" style="grid-template-columns: repeat(3, 1fr)">
// Changed from repeat(auto-fit, minmax(250px, 1fr))
```

### ✓ ALLOWED: Enhance Recommendations

```javascript
// BEFORE
recommendations: [
    "Conduct customer interviews"
]

// AFTER - More detailed
recommendations: [
    "Conduct 20 structured customer interviews using open-ended questions",
    "Document exact quotes and pain points",
    "Create affinity diagram to identify patterns",
    "Validate findings with 10 additional customers"
]
```

### ✗ FORBIDDEN: Modify Database Schema

```sql
-- ✗ DON'T DO THIS
ALTER TABLE score_history 
ADD COLUMN new_field VARCHAR(255);
```

---

## 📝 Change Log Template

When making content changes, document them:

```markdown
## Change: [Brief Description]
**Date:** YYYY-MM-DD
**Author:** [Name]
**Type:** Agent Logic / Content / Scoring / Recommendations

### What Changed
- [Specific change 1]
- [Specific change 2]

### Why Changed
[Rationale for change]

### Impact
- Score changes: [Expected impact]
- User experience: [How users benefit]
- Testing: [What was tested]

### Verification
- [ ] Scores still 0-100
- [ ] UI displays correctly
- [ ] Database saves successfully
- [ ] No console errors
```

---

## 🚀 Future Content Roadmap

### Phase 1: Agent Intelligence (Weeks 1-4)
- Refine all 96 agent evaluation algorithms
- Enhance scoring sophistication
- Improve feedback quality
- Expand recommendation library

### Phase 2: Content Quality (Weeks 5-8)
- Rewrite all questions for clarity
- Create comprehensive examples
- Build resource library
- Enhance demo data

### Phase 3: Scoring Optimization (Weeks 9-12)
- Calibrate all scoring thresholds
- Balance dimension weights
- Validate score distributions
- Test with real users

### Phase 4: Recommendation Expansion (Weeks 13-16)
- Create 500+ recommendations
- Build implementation playbooks
- Add success metrics
- Develop best practices library

---

## 🤝 Team Responsibilities

### Content Team
- ✓ Modify agent logic
- ✓ Enhance educational content
- ✓ Optimize scoring
- ✓ Expand recommendations
- ✗ Touch UI files
- ✗ Modify database
- ✗ Change core logic

### Development Team (If Needed)
- ✓ Fix bugs in locked structure
- ✓ Performance optimization
- ✓ Security patches
- ✗ New features without approval
- ✗ Structural changes without override

### Product Team
- ✓ Define content requirements
- ✓ Prioritize improvements
- ✓ Approve overrides
- ✗ Request structural changes

---

## 📞 Questions & Support

**Structure Questions:** Check this document first  
**Override Requests:** Follow override process  
**Unclear Boundaries:** Ask before modifying  
**Bug Reports:** Document and escalate

---

## ✅ Compliance Checklist

Before committing changes:

- [ ] Changes are in content/agent/scoring files only
- [ ] No UI structure modifications
- [ ] No database schema changes
- [ ] No core logic alterations
- [ ] Scores still calculate correctly (0-100)
- [ ] UI displays without errors
- [ ] Database operations work
- [ ] Change documented in commit message
- [ ] Tests pass (if applicable)
- [ ] Code review requested

---

**Last Updated:** 2025-11-30  
**Version:** 1.0  
**Status:** ACTIVE  
**Next Review:** 2026-02-28

---

*This document is the authoritative source for structure vs. content boundaries. When in doubt, ask before modifying.*
# ScaleOps6 Agent System - Implementation Guide
## Critical Fixes Required for 96 Agent User Journey

### Overview
This guide provides step-by-step instructions to fix the identified issues preventing all 96 agents from functioning properly through their complete user journey.

---

## Critical Issues Identified

### 🔴 ISSUE #1: Education Tab Shows Hardcoded Content
**Current State**: All agents show "Problem Statement" content regardless of which agent is selected
**File**: `ST6-CLEAN/subcomponent-detail.html`
**Lines**: 3909-4277

**Root Cause**: The `updateEducationTab()` function ignores the API data and displays hardcoded content.

**Fix Required**:
```javascript
// Replace the entire updateEducationTab function with:
function updateEducationTab(data) {
    const educationContent = document.getElementById('education-content');
    if (!educationContent || !data.education) return;
    
    educationContent.innerHTML = `
        <div class="education-section">
            <h2>${data.name}</h2>
            <div class="overview-section">
                <h3>Overview</h3>
                <p>${data.education.overview}</p>
            </div>
            
            <div class="principles-section">
                <h3>Key Principles</h3>
                <ul>
                    ${data.education.keyPrinciples.map(principle => 
                        `<li>${principle}</li>`
                    ).join('')}
                </ul>
            </div>
            
            <div class="objectives-section">
                <h3>Learning Objectives</h3>
                <ul>
                    ${data.education.learningObjectives.map(objective => 
                        `<li>${objective}</li>`
                    ).join('')}
                </ul>
            </div>
            
            <div class="resources-section">
                <h3>Resources</h3>
                <div class="resource-grid">
                    ${data.education.resources.map(resource => `
                        <div class="resource-card">
                            <span class="resource-type">${resource.type}</span>
                            <h4>${resource.title}</h4>
                            ${resource.duration ? 
                                `<p>Duration: ${resource.duration}</p>` : 
                                `<p>Read Time: ${resource.readTime}</p>`
                            }
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}
```

---

### 🔴 ISSUE #2: Workspace Questions Not Loading
**Current State**: Workspace tab may not load agent-specific questions
**File**: `ST6-CLEAN/subcomponent-detail.html`
**Lines**: 844-975

**Fix Required**:
```javascript
// Add to loadSubcomponentData function after data fetch:
function loadWorkspaceQuestions(data) {
    const worksheetContainer = document.getElementById('worksheet-container');
    if (!worksheetContainer || !data.workspace) return;
    
    const questions = data.workspace.questions;
    let html = '<form id="workspace-form">';
    
    questions.forEach(q => {
        html += `
            <div class="question-block">
                <label>${q.question}</label>
                ${q.type === 'scale' ? 
                    `<select name="${q.id}">
                        ${q.options.map(opt => 
                            `<option value="${opt.value}">${opt.label}</option>`
                        ).join('')}
                    </select>` :
                    `<textarea name="${q.id}" placeholder="${q.placeholder}"></textarea>`
                }
                ${q.helpText ? `<small>${q.helpText}</small>` : ''}
            </div>
        `;
    });
    
    html += '<button type="submit">Submit Analysis</button></form>';
    worksheetContainer.innerHTML = html;
}
```

---

### 🔴 ISSUE #3: Analysis Not Assigned to Current Agent
**Current State**: Analysis results may not include agent identification
**File**: `ST6-CLEAN/subcomponent-detail.html`

**Fix Required**:
```javascript
// When submitting analysis, include agent info:
async function submitAnalysis(responses) {
    const subcomponentId = getSubcomponentIdFromURL();
    
    const analysisData = {
        subcomponentId: subcomponentId,
        agentKey: getAgentKey(subcomponentId),
        responses: responses,
        timestamp: new Date().toISOString()
    };
    
    const result = await fetch('/api/analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(analysisData)
    });
    
    const analysis = await result.json();
    
    // Save to score history with agent info
    await saveScoreHistory({
        ...analysis,
        subcomponentId: subcomponentId,
        agentName: analysis.agentName
    });
    
    displayAnalysisResults(analysis);
}
```

---

### 🔴 ISSUE #4: Score History Not Persisting with Agent ID
**Current State**: Scores may not be saved with proper agent identification

**Fix Required**:
```javascript
async function saveScoreHistory(analysisResult) {
    const scoreData = {
        subcomponentId: analysisResult.subcomponentId,
        agentName: analysisResult.agentName,
        score: analysisResult.score,
        timestamp: analysisResult.timestamp,
        strengths: analysisResult.strengths,
        weaknesses: analysisResult.weaknesses,
        recommendations: analysisResult.recommendations
    };
    
    await fetch('/api/score-history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scoreData)
    });
    
    // Update score history display
    loadScoreHistory(analysisResult.subcomponentId);
}
```

---

### 🔴 ISSUE #5: Templates Not Generated Based on Agent/Block
**Current State**: Templates may not reflect agent-specific content

**Fix Required**:
```javascript
function loadTemplates(data) {
    const templatesContainer = document.getElementById('templates-container');
    if (!templatesContainer || !data.templates) return;
    
    const html = data.templates.map(template => `
        <div class="template-card">
            <h3>${template.name}</h3>
            <p>${template.description}</p>
            <div class="template-meta">
                <span>Format: ${template.format}</span>
                <span>Pages: ${template.pages}</span>
            </div>
            <button onclick="downloadTemplate('${template.id}')">
                Download Template
            </button>
        </div>
    `).join('');
    
    templatesContainer.innerHTML = html;
}
```

---

### 🔴 ISSUE #6: Output Files Not Generated
**Current State**: Output files are not created after scoring

**Fix Required**:
```javascript
async function generateOutputFiles(analysisResult) {
    const subcomponentId = analysisResult.subcomponentId;
    const agentName = analysisResult.agentName;
    
    // Generate output files based on templates
    const outputs = [
        {
            name: `${agentName}_Assessment_Report.pdf`,
            content: generateAssessmentReport(analysisResult)
        },
        {
            name: `${agentName}_Action_Plan.docx`,
            content: generateActionPlan(analysisResult)
        },
        {
            name: `${agentName}_Metrics_Dashboard.xlsx`,
            content: generateMetricsDashboard(analysisResult)
        }
    ];
    
    // Display in Output tab
    const outputContainer = document.getElementById('output-container');
    outputContainer.innerHTML = outputs.map(output => `
        <div class="output-file">
            <span class="file-icon">📄</span>
            <span class="file-name">${output.name}</span>
            <button onclick="downloadOutput('${output.name}')">Download</button>
        </div>
    `).join('');
    
    return outputs;
}
```

---

## Implementation Sequence

### Step 1: Backup Current State
```bash
# Create backup
cp -r ST6-CLEAN ST6-CLEAN-backup-$(date +%Y%m%d)
```

### Step 2: Fix Education Tab (Priority 1)
1. Open `ST6-CLEAN/subcomponent-detail.html`
2. Find `updateEducationTab` function (line ~3909)
3. Replace entire function with dynamic version
4. Test with agent 1-1

### Step 3: Fix Workspace Loading (Priority 2)
1. Find workspace container code (line ~844)
2. Add `loadWorkspaceQuestions` function
3. Call it from `loadSubcomponentData`
4. Test question loading

### Step 4: Fix Analysis Assignment (Priority 3)
1. Update analysis submission
2. Include agent identification
3. Test scoring saves with agent name

### Step 5: Fix Score History (Priority 4)
1. Update score history save function
2. Include agent metadata
3. Verify persistence

### Step 6: Fix Templates (Priority 5)
1. Update template loading
2. Ensure agent-specific templates
3. Test template generation

### Step 7: Implement Output Generation (Priority 6)
1. Add output generation after scoring
2. Create files matching resource names
3. Test download functionality

---

## Testing Checklist

### Quick Test (One Agent)
```javascript
// Test URL: http://localhost:3001/ST6-CLEAN/subcomponent-detail.html?id=1-1

1. ✓ Education tab shows "Problem Definition Evaluator" content
2. ✓ Workspace shows 10 questions (5 dimensions × 2 questions each)
3. ✓ Analysis shows agent name in results
4. ✓ Score History shows "Problem Definition Evaluator"
5. ✓ Templates show agent-specific reports
6. ✓ Output files generated after scoring
7. ✓ Resources match agent expertise
```

### Full Test (All 96 Agents)
Run automated test suite after fixes are implemented.

---

## Validation Script

```javascript
// Quick validation script to test fixes
async function validateAgent(agentId) {
    const response = await fetch(`/api/subcomponents/${agentId}`);
    const data = await response.json();
    
    const tests = {
        hasEducation: !!data.education,
        hasQuestions: data.workspace?.questions?.length > 0,
        hasTemplates: data.templates?.length > 0,
        hasResources: data.resources?.length > 0,
        hasAgentName: !!data.name,
        hasScoringDimensions: !!data.scoringDimensions
    };
    
    const passed = Object.values(tests).every(t => t === true);
    
    console.log(`Agent ${agentId}: ${passed ? 'PASS' : 'FAIL'}`, tests);
    return passed;
}

// Test all agents
async function validateAllAgents() {
    let passed = 0;
    let failed = 0;
    
    for (let block = 1; block <= 16; block++) {
        for (let sub = 1; sub <= 6; sub++) {
            const agentId = `${block}-${sub}`;
            if (await validateAgent(agentId)) {
                passed++;
            } else {
                failed++;
            }
        }
    }
    
    console.log(`Results: ${passed} passed, ${failed} failed out of 96 agents`);
}
```

---

## Common Pitfalls to Avoid

1. **Don't forget to update all references** when changing function names
2. **Test incrementally** - fix one issue, test, then move to next
3. **Preserve existing CSS classes** to maintain styling
4. **Keep API response structure** consistent
5. **Handle missing data gracefully** with fallbacks
6. **Maintain backward compatibility** if possible

---

## Success Metrics

The implementation is successful when:
- ✅ All 96 agents display unique Education content
- ✅ Each agent shows relevant Workspace questions
- ✅ Analysis results include agent identification
- ✅ Score History persists with agent names
- ✅ Templates are agent-specific
- ✅ Output files match resource names
- ✅ CSS/Layout remains consistent
- ✅ No console errors during operation

---

## Next Steps After Implementation

1. **Run comprehensive test suite** on all 96 agents
2. **Generate test report** documenting results
3. **Deploy to staging** for user acceptance testing
4. **Monitor error logs** for edge cases
5. **Create user documentation** for new features
6. **Plan performance optimization** if needed

---

## Support Resources

- API Documentation: `/api/subcomponents/:id` endpoint
- Agent Library: `agent-library.js` (all 96 agents)
- Server Code: `combined-server.js` (API implementation)
- Test Plan: `AGENT_TESTING_PLAN.md`

---

## Conclusion

These fixes will ensure all 96 agents function properly through their complete user journey. The primary issue is the hardcoded Education content, which must be replaced with dynamic loading from the API. Once implemented, each agent will provide unique, relevant content and functionality as designed.

**Time Estimate**: 2-4 hours for implementation, 1-2 hours for testing
**Risk Level**: Low (changes are isolated to display logic)
**Impact**: High (enables full functionality for all 96 agents)
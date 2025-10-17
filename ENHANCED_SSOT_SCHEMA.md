
# Enhanced SSOT Schema Design
**Date:** 2025-10-06  
**Purpose:** Include analysis dimensions and resource templates in SSOT

---

## Current vs Enhanced Schema

### Current SSOT Registry (Basic)

```javascript
{
    "2-1": {
        id: "2-1",
        name: "Jobs to be Done",
        agent: {
            name: "JTBD Specialist",
            domain: "Jobs to be Done"
        },
        domains: {
            education: "Jobs to be Done",
            workspace: "Jobs to be Done",
            template: "Jobs to be Done"
        }
    }
}
```

### Enhanced SSOT Registry (Complete)

```javascript
{
    "2-1": {
        // Identity (existing)
        id: "2-1",
        name: "Jobs to be Done",
        blockId: 2,
        blockName: "Customer Insights",
        subId: 1,
        
        // Agent (existing)
        agent: {
            name: "JTBD Specialist",
            domain: "Jobs to be Done",
            key: "2d"
        },
        
        // Domains (existing)
        domains: {
            education: "Jobs to be Done",
            workspace: "Jobs to be Done",
            template: "Jobs to be Done",
            resource: "Jobs to be Done",
            analysis: "Jobs to be Done"
        },
        
        // NEW: Analysis Dimensions (from agent library)
        analysisDimensions: [
            {
                name: "Job Definition",
                weight: 20,
                description: "Clarity of jobs to be done"
            },
            {
                name: "Outcome Metrics",
                weight: 20,
                description: "Measurable desired outcomes"
            },
            {
                name: "Context Understanding",
                weight: 20,
                description: "Situational triggers and context"
            },
            {
                name: "Alternative Analysis",
                weight: 20,
                description: "Understanding of current alternatives"
            },
            {
                name: "Progress Metrics",
                weight: 20,
                description: "How customers measure progress"
            }
        ],
        
        // NEW: Resource Templates (from educational content)
        resourceTemplates: [
            "Interview Schedule Template",
            "Question Bank by Stage",
            "Insight Synthesis Framework"
        ],
        
        // NEW: Success Metrics (from educational content)
        successMetrics: [
            "Interviews completed per month",
            "Insight-to-feature ratio",
            "Time from insight to action",
            "Coverage across personas"
        ],
        
        // Validation (existing)
        validation: {
            requireDomainMatch: true,
            requireAgentAlignment: true,
            requireDimensionMatch: true,  // NEW
            requireTemplateMatch: true     // NEW
        }
    }
}
```

---

## Data Sources for Enhancement

### Source 1: Agent Library → Analysis Dimensions

**File:** [`agent-library.js`](agent-library.js:1-1769)

**Extract:** `scoringDimensions` array from each agent

**Example for 2d (JTBD Specialist):**
```javascript
scoringDimensions: [
    { name: "Job Definition", weight: 20, description: "..." },
    { name: "Outcome Metrics", weight: 20, description: "..." },
    // ... 5 dimensions total
]
```

### Source 2: Educational Content → Resource Templates

**File:** [`educational-content.js`](educational-content.js:1-3563)

**Extract:** `templates` array from each subcomponent

**Example for 2-1:**
```javascript
templates: [
    "Interview Schedule Template",
    "Question Bank by Stage",
    "Insight Synthesis Framework"
]
```

### Source 3: Educational Content → Success Metrics

**File:** [`educational-content.js`](educational-content.js:1-3563)

**Extract:** `metrics` array from each subcomponent

**Example for 2-1:**
```javascript
metrics: [
    "Interviews completed per month",
    "Insight-to-feature ratio",
    "Time from insight to action",
    "Coverage across personas"
]
```

---

## Enhanced Registry Generation Logic

```javascript
function generateEnhancedRegistry() {
    const registry = {};
    const AgentLibrary = require('../agent-library.js');
    const { educationalContent } = require('../educational-content.js');
    const { SUBCOMPONENT_NAMES } = require('../subcomponent-names-mapping.js');
    const { AGENT_CORRECT_MAPPING } = require('../agent-correct-mapping.js');
    
    for (const [id, name] of Object.entries(SUBCOMPONENT_NAMES)) {
        const [blockId, subId] = id.split('-').map(Number);
        const agentName = AGENT_CORRECT_MAPPING[id];
        
        // Get agent key (e.g., "2d" for JTBD Specialist)
        const agentKey = getAgentKey(id, agentName);
        const agentData = AgentLibrary[agentKey];
        
        // Get educational content
        const eduContent = educationalContent[id];
        
        registry[id] = {
            // Basic identity
            id,
            name,
            blockId,
            subId,
            
            // Agent info
            agent: {
                name: agentName,
                domain: name,
                key: agentKey
            },
            
            // Domains
            domains: {
                education: name,
                workspace: name,
                template: name,
                resource: name,
                analysis: name
            },
            
            // ✅ NEW: Analysis dimensions from agent
            analysisDimensions: agentData?.scoringDimensions || [],
            
            // ✅ NEW: Evaluation criteria from agent
            evaluationCriteria: agentData?.evaluationCriteria || {},
            
            // ✅ NEW: Resource templates from education
            resourceTemplates: eduContent?.templates || [],
            
            // ✅ NEW: Success metrics from education
            successMetrics: eduContent?.metrics || [],
            
            // ✅ NEW: Best practices from education
            bestPractices: eduContent?.workspace?.bestPractices || [],
            
            // Validation rules
            validation: {
                requireDomainMatch: true,
                requireAgentAlignment: true,
                requireDimensionMatch: true,
                requireTemplateMatch: true,
                strictMode: true
            }
        };
    }
    
    return registry;
}
```

---

## Validation Enhancements

### New Validator: Analysis Dimension Validator

```javascript
class AnalysisDimensionValidator extends BaseValidator {
    async validate(registry) {
        this.errors = [];
        
        for (const [id, subcomponent] of Object.entries(registry)) {
            // Check if analysis dimensions exist
            if (!subcomponent.analysisDimensions || 
                subcomponent.analysisDimensions.length === 0) {
                this.addError({
                    type: 'MISSING_ANALYSIS_DIMENSIONS',
                    subcomponentId: id,
                    severity: 'HIGH',
                    message: `No analysis dimensions defined for ${subcomponent.name}`
                });
                continue;
            }
            
            // Check if dimensions total 100% weight
            const totalWeight = subcomponent.analysisDimensions
                .reduce((sum, dim) => sum + dim.weight, 0);
            
            if (totalWeight !== 100) {
                this.addError({
                    type: 'DIMENSION_WEIGHT_MISMATCH',
                    subcomponentId: id,
                    expected: 100,
                    actual: totalWeight,
                    severity: 'MEDIUM',
                    message: `Dimension weights total ${totalWeight}%, should be 100%`
                });
            }
            
            // Check if dimension names are relevant to subcomponent
            const relevantDimensions = subcomponent.analysisDimensions.filter(dim => {
                const dimLower = dim.name.toLowerCase();
                const nameLower = subcomponent.name.toLowerCase();
                const keywords = nameLower.split(/[\s\-\/&]+/);
                return keywords.some(kw => dimLower.includes(kw));
            });
            
            if (relevantDimensions.length === 0) {
                this.addError({
                    type: 'DIMENSION_RELEVANCE_LOW',
                    subcomponentId: id,
                    severity: 'MEDIUM',
                    message: `Analysis dimensions may not be relevant to ${subcomponent.name}`
                });
            }
        }
        
        return this.getResults();
    }
}
```

### New Validator: Resource Template Validator

```javascript
class ResourceTemplateValidator extends BaseValidator {
    async validate(registry) {
        this.errors = [];
        
        for (const [id, subcomponent] of Object.entries(registry)) {
            // Check if templates exist
            if (!subcomponent.resourceTemplates || 
                subcomponent.resourceTemplates.length === 0) {
                this.addError({
                    type: 'MISSING_RESOURCE_TEMPLATES',
                    subcomponentId: id,
                    severity: 'MEDIUM',
                    message: `No resource templates defined for ${subcomponent.name}`
                });
                continue;
            }
            
            // Check if template names reference subcomponent
            const relevantTemplates = subcomponent.resourceTemplates.filter(template => {
                const templateLower = template.toLowerCase();
                const nameLower = subcomponent.name.toLowerCase();
                const keywords = nameLower.split(/[\s\-\/&]+/).filter(w => w.length > 3);
                return keywords.some(kw => templateLower.includes(kw));
            });
            
            if (relevantTemplates.length === 0) {
                this.addError({
                    type: 'TEMPLATE_RELEVANCE_LOW',
                    subcomponentId: id,
                    templateCount: subcomponent.resourceTemplates.length,
                    severity: 'LOW',
                    message: `Templates may not reference ${subcomponent.name}`
                });
            }
        }
        
        return this.getResults();
    }
}
```

---

## Benefits of Enhanced SSOT

### 1. Analysis Consistency

**Before:** Analysis dimensions could vary or be missing  
**After:** Every subcomponent has exactly 5 dimensions totaling 100% weight

**Impact:**
- Consistent analysis across all 96 subcomponents
- Predictable scoring methodology
- Comparable results between subcomponents

### 2. Template Standardization

**Before:** Templates could be missing or misaligned  
**After:** Every subcomponent has defined resource templates

**Impact:**
- Users always have templates available
- Templates match subcomponent focus
- Consistent user experience

### 3. Metrics Clarity

**Before:** Success metrics could be undefined  
**After:** Every subcomponent has clear success metrics

**Impact:**
- Users know what to measure
- Consistent tracking across platform
- Better outcome validation

---

## Implementation Plan

### Phase 1: Enhance Registry Generation

**File:** [`core/subcomponent-registry.js`](core/subcomponent-registry.js:1)

**Changes:**
1. Import `AgentLibrary` and `educationalContent`
2. Extract `scoringDimensions` from agent
3. Extract `templates` and `metrics` from education
4. Add to registry object

### Phase 2: Add New Validators

**File:** [`core/validation-engine.js`](core/validation-engine.js:1)

**Changes:**
1. Create `AnalysisDimensionValidator`
2. Create `ResourceTemplateValidator`
3. Add to validation engine
4. Update validation reports

### Phase 3: Update Consumers

**Files to Update:**
- Analysis display logic → use `registry.analysisDimensions`
- Resource tab logic → use `registry.resourceTemplates`
- Metrics tracking → use `registry.successMetrics`

---

## Validation Rules

### Analysis Dimensions

- ✅ Must have exactly 5 dimensions
- ✅ Weights must total 100%
- ✅ Each dimension must have name, weight, description
- ⚠️ Dimension names should relate to subcomponent (warning only)

### Resource Templates

- ✅ Must have at least 1 template
- ⚠️ Template names should reference subcomponent (warning only)
- ✅ Templates must be strings (not objects)

### Success Metrics

- ✅ Must have at least 1 metric
- ✅ Metrics must be measurable/quantifiable
- ⚠️ Metrics should relate to subcomponent (warning only)

---

## Example: Jobs to be Done (2-1)

### Complete Enhanced Registry Entry

```javascript
"2-1": {
    // Identity
    id: "2-1",
    name: "Jobs to be Done",
    blockId: 2,
    blockName: "Customer Insights",
    subId: 1,
    phase: 1,
    phaseName: "Idea Market Fit",
    
    // Agent
    agent: {
        name: "JTBD Specialist",
        domain: "Jobs to be Done",
        key: "2d",
        description: "Jobs-to-be-Done framework implementation expert"
    },
    
    // Domains
    domains: {
        education: "Jobs to be Done",
        workspace: "Jobs to be Done",
        template: "Jobs to be Done",
        resource: "Jobs to be Done",
        analysis: "Jobs to be Done"
    },
    
    // Analysis Dimensions (from agent library)
    analysisDimensions: [
        {
            name: "Job Definition",
            weight: 20,
            description: "Clarity of jobs to be done"
        },
        {
            name: "Outcome Metrics",
            weight: 20,
            description: "Measurable desired outcomes"
        },
        {
            name: "Context Understanding",
            weight: 20,
            description: "Situational triggers and context"
        },
        {
            name: "Alternative Analysis",
            weight: 20,
            description: "Understanding of current alternatives"
        },
        {
            name: "Progress Metrics",
            weight: 20,
            description: "How customers measure progress"
        }
    ],
    
    // Evaluation Criteria (from agent library)
    evaluationCriteria: {
        "0-25": "No JTBD framework in use",
        "26-50": "Basic understanding of jobs",
        "51-75": "Good JTBD implementation",
        "76-90": "Strong JTBD-driven development",
        "91-100": "JTBD excellence across organization"
    },
    
    // Resource Templates (from educational content)
    resourceTemplates: [
        "Interview Schedule Template",
        "Question Bank by Stage",
        "Insight Synthesis Framework"
    ],
    
    // Success Metrics (from educational content)
    successMetrics: [
        "Interviews completed per month",
        "Insight-to-feature ratio",
        "Time from insight to action",
        "Coverage across personas"
    ],
    
    // Best Practices (from educational content)
    bestPractices: [
        "Block dedicated time weekly for interviews",
        "Rotate inter
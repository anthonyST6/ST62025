# ScaleOps6 Platform - Content Fix Implementation Plan

## Problem Analysis

The platform is displaying generic, templated content instead of the rich, specific content that exists in `educational-content.js`. This is happening across all tabs:
- Education tab: Generic descriptions
- Workspace tab: Generic field labels
- Analysis tab: Generic findings
- Resources tab: Generic resource lists

## Root Cause

1. **Wrong Content Source**: Pages are using `content-library-simplified.js` (generic templates) instead of `educational-content.js` (4,693 lines of detailed content)
2. **Template Substitution**: Content is generated with simple string substitution rather than pulling from the detailed content
3. **Worksheet Fields**: All subcomponents have the same generic field labels instead of specific ones for each area

## Solution Architecture

### Phase 1: Content Mapping System
Create a comprehensive content updater that:
1. Reads from `educational-content.js` 
2. Maps content to each of the 96 subcomponents
3. Updates all content areas:
   - Education sections
   - Worksheet field labels and placeholders
   - Analysis dimensions and descriptions
   - Resource lists
   - Best practices

### Phase 2: Specific Content for Each Subcomponent

#### Example: Problem Statement (1A) Should Have:
**Education Tab:**
- What: "A focused, plain-language articulation of the specific problem..."
- Why: "Startups often fail not because they can't build..."
- Components: "Who experiences the problem, When/where it arises..."

**Workspace Tab Fields:**
1. "Who is affected? (Customer Persona)" → "e.g., B2B SaaS founders..."
2. "What is the problem?" → "Describe the specific problem..."
3. "When does it occur? (Context)" → "e.g., During quarterly planning..."
4. "What is the impact? (Metrics)" → "e.g., 20 hours/month wasted..."
5. "How are they solving it today?" → "Describe current alternatives..."
6. "Evidence & Validation" → "Customer quotes, data points..."

**Analysis Dimensions:**
1. Problem Clarity → "How well-defined and specific"
2. Market Validation → "Evidence of real market need"
3. Solution Fit → "Alignment between problem and solution"
4. Impact Potential → "Size and severity of problem"
5. Differentiation → "Uniqueness of approach"

### Phase 3: Implementation Steps

1. **Create Content Updater Script** (`comprehensive-content-updater.js`)
   - Load educational content
   - Parse subcomponent structure
   - Map content to appropriate sections
   - Generate updated HTML

2. **Content Mapping Structure**
```javascript
const contentMap = {
  "1a": {
    title: "Problem Statement Definition",
    agent: "Problem Definition Evaluator",
    education: {
      what: educationalContent["1-1"].what,
      why: educationalContent["1-1"].why,
      components: educationalContent["1-1"].how,
      metrics: educationalContent["1-1"].metrics,
      practices: educationalContent["1-1"].workspace.bestPractices
    },
    worksheet: {
      field1: {
        label: "Who is affected? (Customer Persona)",
        placeholder: "e.g., B2B SaaS founders with 10-50 employees"
      },
      field2: {
        label: "What is the problem?",
        placeholder: "Describe the specific problem in 2-3 sentences"
      },
      // ... etc
    },
    analysis: {
      dimensions: [
        {
          name: "Problem Clarity",
          description: "How well-defined and specific is the problem?"
        },
        // ... etc
      ]
    },
    resources: educationalContent["1-1"].workspace
  }
};
```

3. **Update All 96 Subcomponents**
   - Use the content map to generate proper HTML
   - Ensure each subcomponent has unique, relevant content
   - Maintain the locked structure while updating content

## Content Sources by Subcomponent

### Block 1: Mission Discovery (6 subcomponents)
- 1A: Problem Statement → educationalContent["1-1"]
- 1B: Mission Statement → educationalContent["1-2"]
- 1C: Customer Insight → educationalContent["1-3"]
- 1D: Team Capability → educationalContent["1-4"]
- 1E: Market Insight → educationalContent["1-5"]
- 1F: Prototype Launch → educationalContent["1-6"]

### Block 2: Customer Insights (6 subcomponents)
- 2A: Interview Cadence → educationalContent["2-1"]
- 2B: Personas Framework → educationalContent["2-2"]
- 2C: Pain Point Mapping → educationalContent["2-3"]
- 2D: JTBD Capture → educationalContent["2-4"]
- 2E: Signal Grading → educationalContent["2-5"]
- 2F: Insight-to-Action → educationalContent["2-6"]

### Block 3: Strategic Prioritization (6 subcomponents)
- 3A: Use Case Scoring → educationalContent["3-1"]
- 3B: Segment Tiering → educationalContent["3-2"]
- ... (continuing pattern)

## Worksheet Field Mapping

Each subcomponent needs specific worksheet fields that match what the agent will evaluate:

### Pattern for Worksheet Fields:
```
Field 1: Primary aspect being evaluated
Field 2: Evidence/validation 
Field 3: Context/implementation
Field 4: Impact/metrics
Field 5: Differentiation/uniqueness
Field 6: Additional context (optional)
```

### Examples:

**1A - Problem Statement:**
1. Who is affected? (Customer Persona)
2. What is the problem?
3. When does it occur? (Context)
4. What is the impact? (Metrics)
5. How are they solving it today?
6. Evidence & Validation

**1B - Mission Statement:**
1. Mission Statement (20 words max)
2. Target Audience
3. Transformation Enabled
4. Emotional Resonance
5. Decision Guidance
6. Long-term Vision

**2A - Interview Cadence:**
1. Current Interview Frequency
2. Target Personas
3. Learning Objectives
4. Synthesis Process
5. Action Implementation
6. Team Involvement

## Analysis Dimensions Mapping

Each subcomponent should have 5 dimensions that reflect what's being scored:

### Pattern:
1. Core Quality (main aspect)
2. Validation/Evidence
3. Implementation/Process
4. Impact/Results
5. Innovation/Differentiation

### Examples:

**1A - Problem Statement:**
1. Problem Clarity
2. Market Validation
3. Solution Fit
4. Impact Potential
5. Differentiation

**1B - Mission Statement:**
1. Mission Clarity
2. Team Alignment
3. Market Resonance
4. Measurability
5. Inspirational Value

## Implementation Priority

1. **High Priority**: Fix Block 1 (Mission Discovery) - Foundation
2. **Medium Priority**: Fix Blocks 2-4 (Customer & Product) - Core
3. **Lower Priority**: Fix remaining blocks - Advanced features

## Success Criteria

✅ Each subcomponent displays unique, relevant content
✅ Worksheet fields match what the agent evaluates
✅ Analysis dimensions are specific to each area
✅ Resources are relevant to the specific topic
✅ No generic placeholder text remains

## Next Steps

1. Switch to Code mode to implement the solution
2. Create the comprehensive content updater
3. Test on Block 1 subcomponents
4. Roll out to all 96 subcomponents
5. Verify content displays correctly
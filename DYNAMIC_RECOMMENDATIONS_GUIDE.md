# Dynamic Recommendations System Guide

## Overview
The ScaleOps6 platform uses a **dynamic recommendations system** where agents:
1. **Generate** custom recommendations based on actual analysis
2. **Store** successful recommendations for future reference
3. **Learn** from what works to improve over time

## Key Principle
**Agents CREATE recommendations, they don't just fetch them from a static library.**

## Architecture

### 1. Dynamic Recommendations Library (`recommendations-library-dynamic.js`)
- Generates custom recommendations based on analysis
- Stores recommendations for future reference
- Tracks success metrics
- Learns from past performance

### 2. Agent Implementation Pattern

```javascript
// Import the dynamic library
const DynamicRecommendationsLibrary = require('./recommendations-library-dynamic.js');
const recommendationsLib = new DynamicRecommendationsLibrary();

// In your agent's recommendation generation method:
generateRecommendations(analysis, context, scoring) {
    const recommendations = [];
    
    // Identify gaps or areas for improvement
    const gaps = this.identifyGaps(scoring);
    
    gaps.forEach(gap => {
        // Generate a NEW recommendation dynamically
        const recommendation = recommendationsLib.generateRecommendation({
            area: gap.area,
            score: gap.currentScore,
            dimension: gap.dimension,
            data: {
                analysis: analysis,
                context: context,
                customData: gap.specificData
            },
            priority: this.calculatePriority(gap),
            subcomponent: 'yourSubcomponentName'
        });
        
        // The library returns a recommendation with:
        // - area: Focus area
        // - priority: CRITICAL/HIGH/MEDIUM
        // - impact: "+X points"
        // - actionPlan: Array of specific actions
        // - recommendations: Array of tactical steps
        // - successMetrics: How to measure success
        
        recommendations.push(recommendation);
    });
    
    return recommendations;
}
```

## How It Works

### Step 1: Agent Analyzes Input
The agent performs its specialized analysis on the worksheet data:
```javascript
const analysis = this.performAnalysis(worksheetData);
const scoring = this.calculateScores(analysis);
```

### Step 2: Agent Identifies Gaps
Based on the analysis, identify areas needing improvement:
```javascript
const gaps = this.identifyGaps(scoring);
// Returns: [{dimension: 'problemClarity', score: 45, gap: 55}, ...]
```

### Step 3: Generate Dynamic Recommendations
For each gap, generate a custom recommendation:
```javascript
const recommendation = recommendationsLib.generateRecommendation({
    area: 'Problem Clarity',
    score: 45,
    dimension: 'problemClarity',
    data: analysisData,
    priority: 'CRITICAL',
    subcomponent: 'problemStatement'
});
```

### Step 4: Library Creates Custom Recommendation
The library:
1. Analyzes the severity (score < 40 = low, 40-70 = medium, 70+ = high)
2. Calculates realistic impact ("+X points")
3. Generates contextual action plans
4. Creates specific success metrics
5. Stores the recommendation for future learning

### Step 5: Recommendation Returned
The recommendation includes:
```javascript
{
    area: "Problem Clarity",
    priority: "CRITICAL",
    impact: "+12 points",
    expectedImprovement: 12,
    actionPlan: [
        "Interview 15-20 potential customers using structured discovery",
        "Document specific pain points with frequency and severity metrics",
        "Create problem validation scorecard with measurable criteria",
        "Validate problem-solution fit with 5 early adopters"
    ],
    recommendations: [
        "Schedule 5 customer interviews this week using calendly link",
        "Create interview script with 10 open-ended questions",
        "Use recording tool (Gong/Chorus) to capture all interviews",
        "Build problem validation scorecard in Airtable/Notion"
    ],
    successMetrics: [
        "20+ validated customer interviews completed",
        "Problem validated by 80%+ of target customers",
        "Pain point severity rated 7+/10"
    ],
    metadata: {
        generatedAt: "2024-01-15T10:30:00Z",
        subcomponent: "problemStatement",
        score: 45,
        dimension: "problemClarity"
    }
}
```

## Benefits of Dynamic Generation

### 1. Contextual Relevance
- Recommendations are tailored to the specific analysis
- Takes into account industry, stage, and sophistication level
- Adapts to the unique situation of each user

### 2. Continuous Learning
- Successful recommendations are stored for reference
- The system learns what works over time
- Can identify patterns in successful improvements

### 3. Realistic Impact Scores
- Impact points are calculated based on:
  - Current score (lower scores = more room for improvement)
  - Dimension difficulty (some areas are harder to improve)
  - Priority level (critical issues get more focus)
  - Overall constraints (can't improve everything at once)

### 4. Actionable Guidance
- Each recommendation includes:
  - Strategic action plan (what to do)
  - Tactical recommendations (how to do it)
  - Success metrics (how to measure)
  - No vague "resources" - only actionable steps

## Example: Market Insight Agent

```javascript
class MarketInsightAgent {
    generateRecommendations(scores, parsedData) {
        const recommendations = [];
        const avgScore = Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length;
        
        // Sort dimensions by score (lowest first = biggest gaps)
        const sortedDimensions = Object.entries(scores).sort((a, b) => a[1] - b[1]);
        
        for (const [dimension, score] of sortedDimensions.slice(0, 3)) {
            if (score < 70) {
                // Generate dynamic recommendation for this gap
                const recommendation = recommendationsLib.generateRecommendation({
                    area: this.getDimensionName(dimension),
                    score: score,
                    dimension: dimension,
                    data: {
                        parsedData: parsedData,
                        allScores: scores
                    },
                    priority: this.calculatePriority(score),
                    subcomponent: 'marketInsight'
                });
                
                // Enhance with agent-specific insights
                recommendation.actionPlan = this.enhanceActionPlan(
                    recommendation.actionPlan,
                    dimension,
                    parsedData
                );
                
                recommendations.push(recommendation);
            }
        }
        
        return recommendations;
    }
}
```

## Migration Path

### For Existing Agents Using Static Library
1. Replace static library import with dynamic library
2. Update recommendation generation to use `generateRecommendation()`
3. Remove hardcoded recommendations
4. Test that recommendations display with "+X points" format

### For New Agents
1. Import `DynamicRecommendationsLibrary`
2. Use `generateRecommendation()` for each identified gap
3. Enhance with agent-specific insights as needed
4. Return recommendations array with proper format

## Success Tracking

The library tracks recommendation success:
```javascript
// When a recommendation leads to improvement
recommendationsLib.markRecommendationSuccess(
    'problemStatement',
    recommendation,
    actualImprovement
);

// Get best performing recommendations
const bestRecommendations = recommendationsLib.getBestRecommendations('problemStatement');
```

## Summary

The dynamic recommendations system ensures:
- ✅ Custom recommendations for each analysis
- ✅ "+X points" impact format
- ✅ Actionable steps, not generic resources
- ✅ Learning and improvement over time
- ✅ Consistent display across all agents

This approach moves beyond static templates to provide intelligent, contextual guidance that actually helps users improve their GTM readiness scores.
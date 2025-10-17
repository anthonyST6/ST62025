# ST6Co Demo Data Strategy

## Overview
This document outlines the strategy for creating high-quality demo data for ST6Co/ScaleOps6Product across all 96 subcomponents.

## Current State Analysis

### Coverage
- **Explicit Demo Data**: 11/96 subcomponents (11.5%)
- **Generic Fallback**: 85/96 subcomponents (88.5%)
- **Question Types**: 6 distinct types requiring different response strategies

### Data Sources
1. `enhance-st6co-answers.js`: Contains detailed answers for 11 subcomponents
2. `test-company.js`: Contains company profile and block scores
3. `agent-generated-questions-complete.js`: Contains all questions for 96 subcomponents

## Quality Criteria

### 1. Length Requirements
- Minimum: 100 characters
- Maximum: 1000 characters
- Target: 300-500 characters for optimal scoring

### 2. Content Requirements by Question Type

#### Diagnostic (challenges, pain points)
- Identify 2-3 specific challenges
- Quantify impact (time/cost/efficiency)
- Show root cause awareness
- Demonstrate problem-solving approach

Example Template:
```
"We face three key challenges in [domain]: 
1) [Challenge 1] causing [X hours/week] inefficiency
2) [Challenge 2] resulting in [$Y] monthly cost
3) [Challenge 3] limiting our ability to [specific impact]
We're addressing these through [specific initiatives]."
```

#### Quantitative (metrics, measurements)
- Provide 3-5 specific KPIs
- Include current vs. target metrics
- Show trending data
- Reference industry benchmarks

Example Template:
```
"Key metrics tracked:
- [Metric 1]: Currently [X], target [Y] (industry avg: [Z])
- [Metric 2]: [A]% improvement over last quarter
- [Metric 3]: [B] achieved, [C] goal by [timeframe]
Monthly tracking shows [trend] with [specific insights]."
```

#### Strategic (alignment, planning)
- Connect to business objectives
- Show roadmap thinking
- Demonstrate cross-functional alignment
- Include timeline/milestones

Example Template:
```
"Our [domain] strategy directly supports our goal of [business objective].
Phase 1: [Initiative] to achieve [outcome] by [date]
Phase 2: [Initiative] enabling [benefit]
This aligns with Product ([connection]) and Sales ([connection])
creating [overall impact]."
```

#### Validation (evidence, proof)
- Provide concrete examples
- Include customer feedback
- Show measurable outcomes
- Reference specific implementations

Example Template:
```
"Evidence of effectiveness:
- Customer A achieved [X]% improvement using our [feature]
- Beta testing showed [Y] metric improvement
- [Z] customers report [specific benefit]
- Case study: [Specific example with quantified result]"
```

#### Comparative (benchmarking, alternatives)
- Compare to competitors/alternatives
- Show differentiation
- Include market positioning
- Reference industry standards

Example Template:
```
"Compared to alternatives:
- vs [Competitor A]: We provide [X] advantage
- vs Manual process: [Y]% time savings
- Industry benchmark: We're [Z]% above average
Our unique approach of [differentiator] sets us apart."
```

#### Execution (implementation, utilization)
- Describe specific processes
- Show team involvement
- Include tools/systems used
- Demonstrate operational maturity

Example Template:
```
"Implementation approach:
- Weekly [process] involving [teams]
- Using [tools/systems] for [purpose]
- [X] team members trained on [capability]
- Average [metric] per [timeframe]
Continuous improvement through [feedback mechanism]."
```

## Implementation Strategy

### Phase 1: Data Mapping (Blocks 1-6)
Focus on early-stage subcomponents where ST6Co has highest maturity:
- Use existing detailed answers from enhance-st6co-answers.js
- Ensure each answer matches its question type
- Validate length and content requirements

### Phase 2: Data Generation (Blocks 7-12)
Create contextually appropriate answers for mid-stage blocks:
- Reference ST6Co's growth metrics
- Include platform-specific features
- Show progression from early to growth stage

### Phase 3: Data Projection (Blocks 13-16)
Generate aspirational but realistic answers for advanced blocks:
- Project future state based on current trajectory
- Include planned initiatives
- Show strategic thinking

## Scoring Validation

### Target Scores by Block
- Blocks 1-4: 80-90% (strong foundation)
- Blocks 5-8: 70-85% (solid execution)
- Blocks 9-12: 60-75% (developing capabilities)
- Blocks 13-16: 40-60% (future planning)

### Agent Evaluation Criteria
Agents will score based on:
1. **Completeness**: All required elements present
2. **Specificity**: Concrete examples and metrics
3. **Relevance**: Direct answer to question
4. **Maturity**: Sophistication of approach
5. **Evidence**: Proof points and validation

## Quality Assurance Process

1. **Content Review**: Ensure each answer addresses the specific question
2. **Length Check**: Verify 100-1000 character range
3. **Relevance Test**: Confirm ST6Co/ScaleOps6Product context
4. **Scoring Preview**: Estimate agent scoring potential
5. **Consistency Check**: Ensure answers align across related subcomponents

## Success Metrics

- **Coverage**: 100% of 96 subcomponents with relevant demo data
- **Quality**: 70%+ average score from agent evaluation
- **Relevance**: 0 mismatched question-answer pairs
- **Consistency**: Coherent narrative across all blocks
- **Usability**: Demo data effectively showcases platform capabilities
const { generateDynamicRecommendations } = require('./recommendations-library-dynamic-wrapper');

// Enhanced Prototype Launch Plan Analysis Agent
// Evaluates prototype development strategy and launch readiness with deep GTM expertise

class PrototypeLaunchAgentEnhanced {
    constructor() {
        this.name = 'PrototypeLaunchAgent';
        this.version = '2.0.0';
        this.description = 'Analyzes prototype launch plans for MVP development and launch strategy';
        
        // Define evaluation dimensions with weights
        this.evaluationDimensions = {
            mvpDefinition: {
                weight: 0.25,
                criteria: [
                    'Core features clearly defined',
                    'Scope boundaries established',
                    'User value articulated',
                    'Technical feasibility assessed',
                    'Success criteria defined'
                ]
            },
            timelineRealism: {
                weight: 0.20,
                criteria: [
                    'Specific timeframes provided',
                    'Development milestones defined',
                    'Launch date specified',
                    'Buffer time included',
                    'Dependencies mapped'
                ]
            },
            resourcePlanning: {
                weight: 0.20,
                criteria: [
                    'Team composition defined',
                    'Budget allocated',
                    'Tools and infrastructure planned',
                    'Skill gaps identified',
                    'External resources considered'
                ]
            },
            testingStrategy: {
                weight: 0.20,
                criteria: [
                    'User testing planned',
                    'Success metrics defined',
                    'Feedback loops established',
                    'Iteration cycles planned',
                    'Quality assurance process'
                ]
            },
            launchReadiness: {
                weight: 0.15,
                criteria: [
                    'Go-to-market strategy defined',
                    'Risk mitigation planned',
                    'Scaling path considered',
                    'Marketing materials prepared',
                    'Support systems ready'
                ]
            }
        };
    }

    detectSubcomponent(worksheetData) {
        // Detect which subcomponent based on the questions asked
        const field1 = (worksheetData['field-1'] || worksheetData['field1'] || '').toLowerCase();
        
        // 4-1: Feature Matrix - "Feature Specifications"
        if (field1.includes('feature') && field1.includes('specification')) {
            return '4-1';
        }
        // 4-2: Technical Scope - "Scope Boundaries"
        if (field1.includes('scope') && field1.includes('boundaries')) {
            return '4-2';
        }
        // 4-3: Pilot Group - "Selection Criteria"
        if (field1.includes('selection') && field1.includes('criteria')) {
            return '4-3';
        }
        // 4-4: QA Standards - "Quality Standards"
        if (field1.includes('quality') && field1.includes('standard')) {
            return '4-4';
        }
        // 4-5: Timeline Planning - "Timeline Overview"
        if (field1.includes('timeline') && field1.includes('overview')) {
            return '4-5';
        }
        // 4-6: Post-Mortem - Success metrics questions
        if (field1.includes('success') || field1.includes('launch success')) {
            return '4-6';
        }
        
        // Default to 4-1 if can't detect
        return '4-1';
    }

    parseWorksheetData(worksheetData) {
        // Support both field-N and fieldN formats
        const fields = {};
        for (let i = 1; i <= 6; i++) {
            fields[`field${i}`] = worksheetData[`field${i}`] || worksheetData[`field-${i}`] || '';
        }
        
        // Detect which subcomponent we're analyzing
        const subcomponent = this.detectSubcomponent(worksheetData);
        console.log(`🔍 Detected subcomponent: ${subcomponent}`);
        
        // Map fields based on subcomponent
        switch(subcomponent) {
            case '4-1': // Feature Matrix
                return {
                    mvpScope: fields.field1,      // Feature Specifications
                    timeline: fields.field2,      // Value Scoring
                    resources: fields.field3,     // Effort Estimation
                    testing: fields.field4,       // Dependencies
                    metrics: fields.field5,       // Roadmap Alignment
                    risks: fields.field6          // MVP Features count
                };
                
            case '4-2': // Technical Scope
                return {
                    mvpScope: fields.field1,      // Scope Boundaries
                    timeline: fields.field2,      // Architecture Design
                    resources: fields.field3,     // Technical Risks
                    testing: fields.field4,       // Resource Requirements
                    metrics: fields.field5,       // Scalability Plan
                    risks: fields.field6          // Tech Stack
                };
                
            case '4-3': // Pilot Group Selection
                return {
                    mvpScope: fields.field1,      // Selection Criteria
                    timeline: fields.field2,      // Group Composition
                    resources: fields.field3,     // Engagement Plan
                    testing: fields.field4,       // Feedback Collection
                    metrics: fields.field5,       // Success Metrics
                    risks: fields.field6          // Pilot Size
                };
                
            case '4-4': // QA Standards
                return {
                    mvpScope: fields.field1,      // Quality Standards
                    timeline: fields.field2,      // Test Coverage
                    resources: fields.field3,     // Automation Strategy
                    testing: fields.field4,       // Bug Management
                    metrics: fields.field5,       // Release Criteria
                    risks: fields.field6          // Test Coverage %
                };
                
            case '4-5': // Timeline Planning
                return {
                    mvpScope: fields.field1,      // Timeline Overview
                    timeline: fields.field2,      // Milestone Definitions
                    resources: fields.field3,     // Buffer Strategy
                    testing: fields.field4,       // Progress Tracking
                    metrics: fields.field5,       // Adjustment Process
                    risks: fields.field6          // Launch Target
                };
                
            case '4-6': // Post-Mortem (Success Metrics)
            default:
                return {
                    mvpScope: fields.field1,      // Launch success definition
                    timeline: fields.field2,      // Usage metrics
                    resources: fields.field3,     // Quality metrics
                    testing: fields.field4,       // Business metrics
                    metrics: fields.field5,       // Tracking methods
                    risks: fields.field6          // Pivot triggers
                };
        }
    }

    evaluateDimension(dimension, parsedData, subcomponent) {
        // Adjust evaluation based on subcomponent
        const scores = {
            mvpDefinition: this.evaluateMVPDefinition(parsedData, subcomponent),
            timelineRealism: this.evaluateTimelineRealism(parsedData, subcomponent),
            resourcePlanning: this.evaluateResourcePlanning(parsedData, subcomponent),
            testingStrategy: this.evaluateTestingStrategy(parsedData, subcomponent),
            launchReadiness: this.evaluateLaunchReadiness(parsedData, subcomponent)
        };
        
        return scores[dimension] || 0;
    }

    evaluateMVPDefinition(data, subcomponent) {
        let score = 0;
        const text = data.mvpScope.toLowerCase();
        
        switch(subcomponent) {
            case '4-1': // Feature Matrix
                if (text.includes('feature') || text.includes('function')) score += 30;
                if (text.includes('user') || text.includes('customer')) score += 25;
                if (text.includes('core') || text.includes('essential')) score += 20;
                if (text.match(/\d+/) && text.includes('feature')) score += 15;
                if (text.length > 100) score += 10;
                break;
                
            case '4-2': // Technical Scope
                if (text.includes('api') || text.includes('database')) score += 30;
                if (text.includes('architecture') || text.includes('system')) score += 25;
                if (text.includes('boundary') || text.includes('scope')) score += 20;
                if (text.includes('integration') || text.includes('interface')) score += 15;
                if (text.length > 100) score += 10;
                break;
                
            case '4-3': // Pilot Group Selection
                if (text.includes('customer') || text.includes('user')) score += 30;
                if (text.includes('criteria') || text.includes('qualification')) score += 25;
                if (text.includes('segment') || text.includes('profile')) score += 20;
                if (text.match(/\d+/)) score += 15;
                if (text.length > 50) score += 10;
                break;
                
            case '4-4': // QA Standards
                if (text.includes('quality') || text.includes('standard')) score += 30;
                if (text.includes('acceptance') || text.includes('criteria')) score += 25;
                if (text.includes('test') || text.includes('validation')) score += 20;
                if (text.match(/\d+%/)) score += 15;
                if (text.length > 100) score += 10;
                break;
                
            case '4-5': // Timeline Planning
                if (text.includes('week') || text.includes('month')) score += 30;
                if (text.includes('milestone') || text.includes('phase')) score += 25;
                if (text.includes('sprint') || text.includes('iteration')) score += 20;
                if (text.match(/\d+/)) score += 15;
                if (text.includes('launch') || text.includes('release')) score += 10;
                break;
                
            case '4-6': // Post-Mortem (Success Metrics)
            default:
                if (text.match(/\d+\s*(signup|user|customer|conversion|activation)/i) ||
                    text.includes('target') || text.includes('%')) {
                    score += 40;
                }
                const criteriaCount = (text.match(/\d+/g) || []).length;
                if (criteriaCount >= 3) score += 30;
                else if (criteriaCount >= 2) score += 20;
                else if (criteriaCount >= 1) score += 10;
                if (text.includes('week') || text.includes('month') ||
                    text.includes('day') || text.includes('within')) {
                    score += 20;
                }
                if (text.length > 50 && text.includes('conversion')) score += 10;
                break;
        }
        
        return Math.min(score, 100);
    }

    evaluateTimelineRealism(data, subcomponent) {
        let score = 0;
        const text = data.timeline.toLowerCase();
        
        switch(subcomponent) {
            case '4-1': // Feature Matrix - Value Scoring
                if (text.includes('high') || text.includes('critical')) score += 30;
                if (text.includes('medium') || text.includes('important')) score += 25;
                if (text.includes('low') || text.includes('nice')) score += 20;
                if (text.includes('value') || text.includes('impact')) score += 15;
                if (text.match(/\d+/)) score += 10;
                break;
                
            case '4-2': // Technical Scope - Architecture Design
                if (text.includes('microservice') || text.includes('monolith')) score += 30;
                if (text.includes('cloud') || text.includes('aws') || text.includes('azure')) score += 25;
                if (text.includes('database') || text.includes('api')) score += 20;
                if (text.includes('frontend') || text.includes('backend')) score += 15;
                if (text.length > 100) score += 10;
                break;
                
            case '4-3': // Pilot Group - Group Composition
                if (text.includes('diverse') || text.includes('representative')) score += 30;
                if (text.includes('segment') || text.includes('cohort')) score += 25;
                if (text.match(/\d+/) && text.includes('customer')) score += 20;
                if (text.includes('early') || text.includes('beta')) score += 15;
                if (text.length > 50) score += 10;
                break;
                
            case '4-4': // QA Standards - Test Coverage
                if (text.match(/\d+%/)) score += 35;
                if (text.includes('unit') || text.includes('integration')) score += 25;
                if (text.includes('coverage') || text.includes('comprehensive')) score += 20;
                if (text.includes('automated') || text.includes('manual')) score += 15;
                if (text.length > 50) score += 5;
                break;
                
            case '4-5': // Timeline Planning - Milestone Definitions
                if (text.includes('alpha') || text.includes('beta')) score += 30;
                if (text.includes('mvp') || text.includes('launch')) score += 25;
                if (text.includes('complete') || text.includes('deliver')) score += 20;
                if (text.match(/\d+/)) score += 15;
                if (text.includes('criteria') || text.includes('definition')) score += 10;
                break;
                
            case '4-6': // Post-Mortem - Usage Metrics
            default:
                if (text.includes('daily') || text.includes('weekly') ||
                    text.includes('active user') || text.includes('dau') || text.includes('mau')) {
                    score += 40;
                }
                if (text.match(/\d+%/) || text.match(/\d+\s*(user|session|minute|hour)/)) {
                    score += 30;
                }
                const metricCount = (text.match(/[,;]/g) || []).length + 1;
                if (metricCount >= 3) score += 20;
                else if (metricCount >= 2) score += 10;
                if (text.length > 100) score += 10;
                break;
        }
        
        return Math.min(score, 100);
    }

    evaluateResourcePlanning(data, subcomponent) {
        let score = 0;
        const text = data.resources.toLowerCase();
        
        switch(subcomponent) {
            case '4-1': // Feature Matrix - Effort Estimation
                if (text.includes('hour') || text.includes('day') || text.includes('week')) score += 30;
                if (text.includes('story point') || text.includes('t-shirt')) score += 25;
                if (text.includes('complex') || text.includes('simple')) score += 20;
                if (text.match(/\d+/)) score += 15;
                if (text.includes('estimate') || text.includes('effort')) score += 10;
                break;
                
            case '4-2': // Technical Scope - Technical Risks
                if (text.includes('risk') || text.includes('challenge')) score += 30;
                if (text.includes('mitigation') || text.includes('solution')) score += 25;
                if (text.includes('technical') || text.includes('complexity')) score += 20;
                if (text.includes('dependency') || text.includes('integration')) score += 15;
                if (text.length > 100) score += 10;
                break;
                
            case '4-3': // Pilot Group - Engagement Plan
                if (text.includes('onboard') || text.includes('training')) score += 30;
                if (text.includes('support') || text.includes('communication')) score += 25;
                if (text.includes('feedback') || text.includes('survey')) score += 20;
                if (text.includes('weekly') || text.includes('regular')) score += 15;
                if (text.length > 100) score += 10;
                break;
                
            case '4-4': // QA Standards - Automation Strategy
                if (text.includes('automated') || text.includes('ci/cd')) score += 35;
                if (text.includes('manual') || text.includes('exploratory')) score += 25;
                if (text.includes('regression') || text.includes('smoke')) score += 20;
                if (text.match(/\d+%/)) score += 15;
                if (text.includes('tool') || text.includes('framework')) score += 5;
                break;
                
            case '4-5': // Timeline Planning - Buffer Strategy
                if (text.match(/\d+%/) && text.includes('buffer')) score += 35;
                if (text.includes('contingency') || text.includes('risk')) score += 25;
                if (text.includes('delay') || text.includes('unexpected')) score += 20;
                if (text.includes('sprint') || text.includes('iteration')) score += 15;
                if (text.length > 50) score += 5;
                break;
                
            case '4-6': // Post-Mortem - Quality Metrics
            default:
                if (text.includes('uptime') || text.includes('99') ||
                    text.includes('downtime') || text.includes('sla')) {
                    score += 40;
                }
                if (text.includes('load') || text.includes('speed') ||
                    text.includes('second') || text.includes('response')) {
                    score += 30;
                }
                if (text.includes('error') || text.includes('bug') ||
                    text.includes('ticket') || text.includes('support')) {
                    score += 20;
                }
                if (text.match(/\d+/) && text.match(/%/)) {
                    score += 10;
                }
                break;
        }
        
        return Math.min(score, 100);
    }

    evaluateTestingStrategy(data, subcomponent) {
        let score = 0;
        const text = data.testing.toLowerCase();
        
        switch(subcomponent) {
            case '4-1': // Feature Matrix - Dependencies
                if (text.includes('depend') || text.includes('require')) score += 30;
                if (text.includes('block') || text.includes('prerequisite')) score += 25;
                if (text.includes('integration') || text.includes('api')) score += 20;
                if (text.includes('sequence') || text.includes('order')) score += 15;
                if (text.length > 50) score += 10;
                break;
                
            case '4-2': // Technical Scope - Resource Requirements
                if (text.includes('developer') || text.includes('engineer')) score += 30;
                if (text.includes('infrastructure') || text.includes('server')) score += 25;
                if (text.includes('tool') || text.includes('license')) score += 20;
                if (text.match(/\$[\d,]+/) || text.includes('budget')) score += 15;
                if (text.match(/\d+/)) score += 10;
                break;
                
            case '4-3': // Pilot Group - Feedback Collection
                if (text.includes('survey') || text.includes('interview')) score += 30;
                if (text.includes('analytics') || text.includes('data')) score += 25;
                if (text.includes('weekly') || text.includes('regular')) score += 20;
                if (text.includes('nps') || text.includes('satisfaction')) score += 15;
                if (text.includes('iterate') || text.includes('improve')) score += 10;
                break;
                
            case '4-4': // QA Standards - Bug Management
                if (text.includes('jira') || text.includes('tracking')) score += 30;
                if (text.includes('priority') || text.includes('severity')) score += 25;
                if (text.includes('triage') || text.includes('review')) score += 20;
                if (text.includes('fix') || text.includes('resolve')) score += 15;
                if (text.match(/\d+/)) score += 10;
                break;
                
            case '4-5': // Timeline Planning - Progress Tracking
                if (text.includes('daily') || text.includes('standup')) score += 30;
                if (text.includes('sprint') || text.includes('review')) score += 25;
                if (text.includes('burndown') || text.includes('velocity')) score += 20;
                if (text.includes('report') || text.includes('update')) score += 15;
                if (text.includes('stakeholder') || text.includes('communicate')) score += 10;
                break;
                
            case '4-6': // Post-Mortem - Business Metrics
            default:
                if (text.includes('conversion') || text.includes('cac') ||
                    text.includes('ltv') || text.includes('mrr') || text.includes('$')) {
                    score += 40;
                }
                if (text.includes('growth') || text.includes('retention') ||
                    text.includes('churn') || text.includes('expansion')) {
                    score += 30;
                }
                if (text.match(/\d+%/) || text.match(/\$[\d,]+/)) {
                    score += 20;
                }
                if (text.includes('month') || text.includes('quarter') || text.includes('year')) {
                    score += 10;
                }
                break;
        }
        
        return Math.min(score, 100);
    }

    evaluateLaunchReadiness(data, subcomponent) {
        let score = 0;
        const metricsText = data.metrics.toLowerCase();
        const risksText = data.risks.toLowerCase();
        
        switch(subcomponent) {
            case '4-1': // Feature Matrix - Roadmap Alignment
                if (metricsText.includes('roadmap') || metricsText.includes('vision')) score += 30;
                if (metricsText.includes('phase') || metricsText.includes('release')) score += 25;
                if (metricsText.includes('align') || metricsText.includes('strategy')) score += 20;
                if (metricsText.includes('quarter') || metricsText.includes('milestone')) score += 15;
                if (risksText.match(/\d+/)) score += 10;
                break;
                
            case '4-2': // Technical Scope - Scalability Plan
                if (metricsText.includes('scale') || metricsText.includes('growth')) score += 30;
                if (metricsText.includes('load') || metricsText.includes('capacity')) score += 25;
                if (metricsText.includes('horizontal') || metricsText.includes('vertical')) score += 20;
                if (metricsText.includes('cloud') || metricsText.includes('elastic')) score += 15;
                if (risksText.length > 20) score += 10;
                break;
                
            case '4-3': // Pilot Group - Success Metrics
                if (metricsText.includes('adoption') || metricsText.includes('activation')) score += 30;
                if (metricsText.includes('satisfaction') || metricsText.includes('nps')) score += 25;
                if (metricsText.includes('retention') || metricsText.includes('churn')) score += 20;
                if (metricsText.match(/\d+%/)) score += 15;
                if (risksText.match(/\d+/)) score += 10;
                break;
                
            case '4-4': // QA Standards - Release Criteria
                if (metricsText.includes('go/no-go') || metricsText.includes('criteria')) score += 30;
                if (metricsText.includes('coverage') || metricsText.includes('pass')) score += 25;
                if (metricsText.includes('critical') || metricsText.includes('blocker')) score += 20;
                if (metricsText.match(/\d+%/)) score += 15;
                if (risksText.match(/\d+/)) score += 10;
                break;
                
            case '4-5': // Timeline Planning - Adjustment Process
                if (metricsText.includes('adjust') || metricsText.includes('change')) score += 30;
                if (metricsText.includes('communicate') || metricsText.includes('stakeholder')) score += 25;
                if (metricsText.includes('replan') || metricsText.includes('pivot')) score += 20;
                if (metricsText.includes('approve') || metricsText.includes('decision')) score += 15;
                if (risksText.includes('/')) score += 10;
                break;
                
            case '4-6': // Post-Mortem - Tracking & Pivot
            default:
                if (metricsText.includes('mixpanel') || metricsText.includes('analytics') ||
                    metricsText.includes('stripe') || metricsText.includes('datadog') ||
                    metricsText.includes('dashboard') || metricsText.includes('postgresql')) {
                    score += 35;
                }
                if (risksText.includes('activation') || risksText.includes('conversion') ||
                    risksText.includes('churn') || risksText.includes('problem')) {
                    score += 30;
                }
                if (risksText.match(/<\d+%/) || risksText.match(/>\d+%/)) {
                    score += 20;
                }
                if (metricsText.length > 50 && risksText.length > 50) {
                    score += 15;
                }
                break;
        }
        
        return Math.min(score, 100);
    }

    generateDimensionFeedback(dimension, score, parsedData, subcomponent) {
        const feedback = {
            mvpDefinition: this.generateMVPFeedback(score, parsedData, subcomponent),
            timelineRealism: this.generateTimelineFeedback(score, parsedData, subcomponent),
            resourcePlanning: this.generateResourceFeedback(score, parsedData, subcomponent),
            testingStrategy: this.generateTestingFeedback(score, parsedData, subcomponent),
            launchReadiness: this.generateLaunchFeedback(score, parsedData, subcomponent)
        };
        
        return feedback[dimension] || { strengths: [], improvements: [] };
    }

    generateMVPFeedback(score, data, subcomponent) {
        const strengths = [];
        const improvements = [];
        const text = data.mvpScope.toLowerCase();
        
        // Customize feedback based on subcomponent
        switch(subcomponent) {
            case '4-1': // Feature Matrix
                if (text.includes('feature') || text.includes('function')) {
                    strengths.push("Features documented");
                } else {
                    improvements.push("List specific features");
                }
                if (text.includes('core') || text.includes('essential')) {
                    strengths.push("Core features identified");
                } else {
                    improvements.push("Identify core vs nice-to-have features");
                }
                break;
                
            case '4-2': // Technical Scope
                if (text.includes('api') || text.includes('database')) {
                    strengths.push("Technical components defined");
                } else {
                    improvements.push("Define technical architecture");
                }
                if (text.includes('boundary') || text.includes('scope')) {
                    strengths.push("Scope boundaries clear");
                } else {
                    improvements.push("Clarify scope boundaries");
                }
                break;
                
            case '4-3': // Pilot Group
                if (text.includes('criteria') || text.includes('qualification')) {
                    strengths.push("Selection criteria defined");
                } else {
                    improvements.push("Define pilot selection criteria");
                }
                if (text.match(/\d+/)) {
                    strengths.push("Quantified pilot parameters");
                } else {
                    improvements.push("Add specific pilot group size");
                }
                break;
                
            case '4-4': // QA Standards
                if (text.includes('quality') || text.includes('standard')) {
                    strengths.push("Quality standards established");
                } else {
                    improvements.push("Define quality standards");
                }
                if (text.match(/\d+%/)) {
                    strengths.push("Quantified quality metrics");
                } else {
                    improvements.push("Add specific quality thresholds");
                }
                break;
                
            case '4-5': // Timeline Planning
                if (text.includes('milestone') || text.includes('phase')) {
                    strengths.push("Milestones defined");
                } else {
                    improvements.push("Define clear milestones");
                }
                if (text.includes('launch') || text.includes('release')) {
                    strengths.push("Launch timeline set");
                } else {
                    improvements.push("Set specific launch date");
                }
                break;
                
            case '4-6': // Post-Mortem
            default:
                if (text.match(/\d+/)) {
                    strengths.push("Quantified success metrics");
                } else {
                    improvements.push("Add specific numerical targets");
                }
                if (text.includes('conversion') || text.includes('activation')) {
                    strengths.push("Clear conversion goals");
                } else {
                    improvements.push("Define conversion and activation metrics");
                }
                break;
        }
        
        // Ensure we always have at least one item in each category
        if (strengths.length === 0) {
            strengths.push("Planning initiated");
        }
        if (improvements.length === 0) {
            improvements.push("Continue refining approach");
        }
        
        return { strengths, improvements };
    }

    generateTimelineFeedback(score, data, subcomponent) {
        const strengths = [];
        const improvements = [];
        const text = data.timeline.toLowerCase();
        
        // Customize feedback based on subcomponent
        switch(subcomponent) {
            case '4-1': // Value Scoring
                if (text.includes('high') || text.includes('critical')) {
                    strengths.push("Value prioritization clear");
                } else {
                    improvements.push("Prioritize features by value");
                }
                break;
                
            case '4-2': // Architecture Design
                if (text.includes('cloud') || text.includes('architecture')) {
                    strengths.push("Architecture approach defined");
                } else {
                    improvements.push("Define technical architecture");
                }
                break;
                
            case '4-3': // Group Composition
                if (text.includes('diverse') || text.includes('representative')) {
                    strengths.push("Diverse pilot group");
                } else {
                    improvements.push("Ensure pilot group diversity");
                }
                break;
                
            case '4-4': // Test Coverage
                if (text.match(/\d+%/)) {
                    strengths.push("Coverage targets set");
                } else {
                    improvements.push("Set test coverage targets");
                }
                break;
                
            case '4-5': // Milestone Definitions
                if (text.includes('alpha') || text.includes('beta')) {
                    strengths.push("Release phases defined");
                } else {
                    improvements.push("Define release phases");
                }
                break;
                
            case '4-6': // Usage Metrics
            default:
                if (text.includes('daily') || text.includes('weekly')) {
                    strengths.push("Usage frequency metrics defined");
                } else {
                    improvements.push("Define daily/weekly active user metrics");
                }
                break;
        }
        
        if (strengths.length === 0) strengths.push("Planning in progress");
        if (improvements.length === 0) improvements.push("Expand planning detail");
        
        return { strengths, improvements };
    }

    generateResourceFeedback(score, data, subcomponent) {
        const strengths = [];
        const improvements = [];
        const text = data.resources.toLowerCase();
        
        // Customize feedback based on subcomponent
        switch(subcomponent) {
            case '4-1': // Effort Estimation
                if (text.match(/\d+/) && (text.includes('hour') || text.includes('day'))) {
                    strengths.push("Effort estimates provided");
                } else {
                    improvements.push("Add time-based effort estimates");
                }
                break;
                
            case '4-2': // Technical Risks
                if (text.includes('risk') || text.includes('challenge')) {
                    strengths.push("Risks identified");
                } else {
                    improvements.push("Identify technical risks");
                }
                if (text.includes('mitigation')) {
                    strengths.push("Mitigation strategies defined");
                } else {
                    improvements.push("Add risk mitigation plans");
                }
                break;
                
            case '4-3': // Engagement Plan
                if (text.includes('onboard') || text.includes('training')) {
                    strengths.push("Onboarding planned");
                } else {
                    improvements.push("Define pilot onboarding process");
                }
                break;
                
            case '4-4': // Automation Strategy
                if (text.includes('automated') || text.includes('ci/cd')) {
                    strengths.push("Automation planned");
                } else {
                    improvements.push("Consider test automation");
                }
                break;
                
            case '4-5': // Buffer Strategy
                if (text.match(/\d+%/) && text.includes('buffer')) {
                    strengths.push("Buffer time allocated");
                } else {
                    improvements.push("Add 20-30% buffer time");
                }
                break;
                
            case '4-6': // Quality Metrics
            default:
                if (text.includes('uptime') || text.includes('99')) {
                    strengths.push("Uptime targets defined");
                } else {
                    improvements.push("Set specific uptime SLAs");
                }
                break;
        }
        
        if (strengths.length === 0) strengths.push("Resource planning started");
        if (improvements.length === 0) improvements.push("Expand resource planning");
        
        return { strengths, improvements };
    }

    generateTestingFeedback(score, data, subcomponent) {
        const strengths = [];
        const improvements = [];
        const text = data.testing.toLowerCase();
        
        // Customize feedback based on subcomponent
        switch(subcomponent) {
            case '4-1': // Dependencies
                if (text.includes('depend') || text.includes('require')) {
                    strengths.push("Dependencies mapped");
                } else {
                    improvements.push("Map feature dependencies");
                }
                break;
                
            case '4-2': // Resource Requirements
                if (text.includes('developer') || text.includes('engineer')) {
                    strengths.push("Team needs identified");
                } else {
                    improvements.push("Define team requirements");
                }
                break;
                
            case '4-3': // Feedback Collection
                if (text.includes('survey') || text.includes('interview')) {
                    strengths.push("Feedback methods defined");
                } else {
                    improvements.push("Plan feedback collection");
                }
                break;
                
            case '4-4': // Bug Management
                if (text.includes('tracking') || text.includes('jira')) {
                    strengths.push("Bug tracking planned");
                } else {
                    improvements.push("Define bug management process");
                }
                break;
                
            case '4-5': // Progress Tracking
                if (text.includes('daily') || text.includes('standup')) {
                    strengths.push("Progress tracking defined");
                } else {
                    improvements.push("Plan progress tracking");
                }
                break;
                
            case '4-6': // Business Metrics
            default:
                if (text.includes('conversion') || text.includes('cac')) {
                    strengths.push("Key business metrics defined");
                } else {
                    improvements.push("Add CAC, LTV, and conversion metrics");
                }
                break;
        }
        
        if (strengths.length === 0) strengths.push("Testing approach identified");
        if (improvements.length === 0) improvements.push("Expand testing strategy");
        
        return { strengths, improvements };
    }

    generateLaunchFeedback(score, data, subcomponent) {
        const strengths = [];
        const improvements = [];
        const metricsText = data.metrics.toLowerCase();
        const risksText = data.risks.toLowerCase();
        
        // Customize feedback based on subcomponent
        switch(subcomponent) {
            case '4-1': // Roadmap Alignment
                if (metricsText.includes('roadmap') || metricsText.includes('vision')) {
                    strengths.push("Roadmap alignment clear");
                } else {
                    improvements.push("Align with product roadmap");
                }
                break;
                
            case '4-2': // Scalability Plan
                if (metricsText.includes('scale') || metricsText.includes('growth')) {
                    strengths.push("Scalability planned");
                } else {
                    improvements.push("Define scalability approach");
                }
                break;
                
            case '4-3': // Success Metrics
                if (metricsText.includes('adoption') || metricsText.includes('activation')) {
                    strengths.push("Success metrics defined");
                } else {
                    improvements.push("Define pilot success metrics");
                }
                break;
                
            case '4-4': // Release Criteria
                if (metricsText.includes('go/no-go') || metricsText.includes('criteria')) {
                    strengths.push("Release criteria set");
                } else {
                    improvements.push("Define go/no-go criteria");
                }
                break;
                
            case '4-5': // Adjustment Process
                if (metricsText.includes('adjust') || metricsText.includes('change')) {
                    strengths.push("Change process defined");
                } else {
                    improvements.push("Define timeline adjustment process");
                }
                break;
                
            case '4-6': // Tracking & Pivot
            default:
                if (metricsText.includes('analytics') || metricsText.includes('dashboard')) {
                    strengths.push("Tracking tools identified");
                } else {
                    improvements.push("Select specific analytics tools");
                }
                if (risksText.includes('activation') || risksText.match(/<\d+%/)) {
                    strengths.push("Pivot triggers defined");
                } else {
                    improvements.push("Set clear pivot thresholds");
                }
                break;
        }
        
        if (strengths.length === 0) strengths.push("Launch planning initiated");
        if (improvements.length === 0) improvements.push("Expand launch readiness");
        
        return { strengths, improvements };
    }

    generateRecommendations(scores, parsedData, subcomponent) {
        // Use the dynamic recommendations library
        const { generateDynamicRecommendations } = require('./recommendations-library-dynamic-wrapper');
        
        // Sort dimensions by score (lowest first for improvement priority)
        const sortedDimensions = Object.keys(scores)
            .sort((a, b) => scores[a] - scores[b]);
        
        // Generate recommendations using the library
        const recommendations = generateDynamicRecommendations(
            Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length),
            {
                mvpDefinition: scores.mvpDefinition,
                timelineRealism: scores.timelineRealism,
                resourcePlanning: scores.resourcePlanning,
                testingStrategy: scores.testingStrategy,
                launchReadiness: scores.launchReadiness
            },
            'prototype-launch'
        );
        
        // If library returns recommendations, use them
        if (recommendations && recommendations.length > 0) {
            return recommendations;
        }
        
        // Fallback to manual generation if library fails
        const fallbackRecommendations = [];
        
        for (let i = 0; i < Math.min(3, sortedDimensions.length); i++) {
            const dimension = sortedDimensions[i];
            const currentScore = scores[dimension];
            
            // Calculate potential improvement
            const targetScore = currentScore < 40 ? 60 : currentScore < 70 ? 85 : 95;
            const improvement = targetScore - currentScore;
            
            fallbackRecommendations.push({
                area: this.getDimensionTitle(dimension, subcomponent),
                action: this.getActionForDimension(dimension, subcomponent),
                priority: i === 0 ? 'CRITICAL' : i === 1 ? 'HIGH' : 'MEDIUM',
                expectedImprovement: `+${Math.round(improvement * 0.3)}`,
                specificSteps: this.generateSpecificSteps(dimension, currentScore, parsedData, subcomponent)
            });
        }
        
        return fallbackRecommendations;
    }
    
    getDimensionTitle(dimension, subcomponent) {
        const titles = {
            '4-1': {
                'mvpDefinition': 'Feature Definition',
                'timelineRealism': 'Value Prioritization',
                'resourcePlanning': 'Effort Estimation',
                'testingStrategy': 'Dependency Mapping',
                'launchReadiness': 'Roadmap Alignment'
            },
            '4-2': {
                'mvpDefinition': 'Scope Definition',
                'timelineRealism': 'Architecture Design',
                'resourcePlanning': 'Risk Management',
                'testingStrategy': 'Resource Planning',
                'launchReadiness': 'Scalability Planning'
            },
            '4-3': {
                'mvpDefinition': 'Pilot Selection',
                'timelineRealism': 'Group Composition',
                'resourcePlanning': 'Engagement Strategy',
                'testingStrategy': 'Feedback Systems',
                'launchReadiness': 'Success Metrics'
            },
            '4-4': {
                'mvpDefinition': 'Quality Standards',
                'timelineRealism': 'Test Coverage',
                'resourcePlanning': 'Automation Strategy',
                'testingStrategy': 'Bug Management',
                'launchReadiness': 'Release Criteria'
            },
            '4-5': {
                'mvpDefinition': 'Timeline Overview',
                'timelineRealism': 'Milestone Planning',
                'resourcePlanning': 'Buffer Strategy',
                'testingStrategy': 'Progress Tracking',
                'launchReadiness': 'Change Management'
            },
            '4-6': {
                'mvpDefinition': 'Success Criteria Definition',
                'timelineRealism': 'Usage Metrics Planning',
                'resourcePlanning': 'Quality Standards',
                'testingStrategy': 'Business Metrics',
                'launchReadiness': 'Tracking & Pivot Strategy'
            }
        };
        
        const subTitles = titles[subcomponent] || titles['4-6'];
        return subTitles[dimension] || dimension;
    }
    
    getActionForDimension(dimension, subcomponent) {
        const actions = {
            '4-1': {
                'mvpDefinition': 'Define and prioritize core features',
                'timelineRealism': 'Score features by business value',
                'resourcePlanning': 'Estimate development effort',
                'testingStrategy': 'Map feature dependencies',
                'launchReadiness': 'Align features with roadmap'
            },
            '4-2': {
                'mvpDefinition': 'Define technical scope boundaries',
                'timelineRealism': 'Design system architecture',
                'resourcePlanning': 'Identify and mitigate risks',
                'testingStrategy': 'Plan resource allocation',
                'launchReadiness': 'Create scalability plan'
            },
            '4-3': {
                'mvpDefinition': 'Define pilot selection criteria',
                'timelineRealism': 'Build diverse pilot group',
                'resourcePlanning': 'Create engagement plan',
                'testingStrategy': 'Establish feedback loops',
                'launchReadiness': 'Set pilot success metrics'
            },
            '4-4': {
                'mvpDefinition': 'Establish quality standards',
                'timelineRealism': 'Set test coverage targets',
                'resourcePlanning': 'Plan test automation',
                'testingStrategy': 'Define bug management process',
                'launchReadiness': 'Set release criteria'
            },
            '4-5': {
                'mvpDefinition': 'Create detailed timeline',
                'timelineRealism': 'Define clear milestones',
                'resourcePlanning': 'Add appropriate buffers',
                'testingStrategy': 'Implement progress tracking',
                'launchReadiness': 'Define change process'
            },
            '4-6': {
                'mvpDefinition': 'Define specific, measurable success criteria',
                'timelineRealism': 'Establish comprehensive usage metrics',
                'resourcePlanning': 'Set quality and performance standards',
                'testingStrategy': 'Define business and financial metrics',
                'launchReadiness': 'Implement tracking and pivot triggers'
            }
        };
        
        const subActions = actions[subcomponent] || actions['4-6'];
        return subActions[dimension] || 'Improve this dimension';
    }
    
    generateSpecificSteps(dimension, currentScore, parsedData, subcomponent) {
        const steps = [];
        
        // Add subcomponent-specific steps
        switch(subcomponent) {
            case '4-1': // Feature Matrix
                steps.push("List all potential features");
                steps.push("Score each feature by value (high/medium/low)");
                steps.push("Estimate effort for each feature");
                steps.push("Identify feature dependencies");
                steps.push("Select MVP feature set");
                break;
                
            case '4-2': // Technical Scope
                steps.push("Define system architecture");
                steps.push("Identify technical risks");
                steps.push("Plan infrastructure needs");
                steps.push("Define integration points");
                steps.push("Create scalability roadmap");
                break;
                
            case '4-3': // Pilot Group
                steps.push("Define ideal pilot customer profile");
                steps.push("Recruit 10-20 pilot customers");
                steps.push("Create onboarding materials");
                steps.push("Set up feedback channels");
                steps.push("Define success criteria");
                break;
                
            case '4-4': // QA Standards
                steps.push("Define quality metrics");
                steps.push("Set test coverage goals (aim for 80%+)");
                steps.push("Choose testing tools");
                steps.push("Create bug triage process");
                steps.push("Define go/no-go criteria");
                break;
                
            case '4-5': // Timeline Planning
                steps.push("Break down into 2-week sprints");
                steps.push("Define milestone deliverables");
                steps.push("Add 20-30% buffer time");
                steps.push("Create progress tracking system");
                steps.push("Plan stakeholder updates");
                break;
                
            case '4-6': // Post-Mortem
            default:
                if (currentScore < 40) {
                    steps.push("Define 3-5 key success metrics");
                    steps.push("Set specific numerical targets");
                } else if (currentScore < 70) {
                    steps.push("Add usage and quality metrics");
                    steps.push("Define business impact metrics");
                } else {
                    steps.push("Implement tracking tools");
                    steps.push("Set pivot trigger thresholds");
                }
                steps.push("Create metrics dashboard");
                steps.push("Plan regular review cadence");
                break;
        }
        
        return steps.slice(0, 5); // Return top 5 most relevant steps
    }

    analyzeWorksheet(worksheetData, subcomponentId = null) {
        console.log('📊 Prototype Launch Agent: Starting analysis...');
        
        // Use provided subcomponentId or detect from worksheet
        const subcomponent = subcomponentId || this.detectSubcomponent(worksheetData);
        
        const parsedData = this.parseWorksheetData(worksheetData);
        console.log('📋 Parsed prototype launch data for subcomponent:', subcomponent);
        
        const scores = {};
        const feedback = {};
        
        // Evaluate each dimension
        for (const dimension in this.evaluationDimensions) {
            scores[dimension] = this.evaluateDimension(dimension, parsedData, subcomponent);
            feedback[dimension] = this.generateDimensionFeedback(dimension, scores[dimension], parsedData, subcomponent);
            console.log(`📊 ${dimension}: ${scores[dimension]}%`);
        }
        
        // Calculate overall score
        let overallScore = 0;
        for (const dimension in scores) {
            overallScore += scores[dimension] * this.evaluationDimensions[dimension].weight;
        }
        
        // Generate recommendations
        const recommendations = this.generateRecommendations(scores, parsedData, subcomponent);
        
        // Determine improvement from baseline
        const baselineScore = 20; // Assume starting from basic planning
        const improvement = Math.max(0, overallScore - baselineScore);
        
        console.log(`✅ Prototype Launch Analysis complete: ${Math.round(overallScore)}%`);
        
        // Format detailed scores for display
        const detailedScores = {};
        for (const dimension in scores) {
            detailedScores[dimension] = {
                score: Math.round(scores[dimension] * this.evaluationDimensions[dimension].weight),
                maxScore: Math.round(this.evaluationDimensions[dimension].weight * 100),
                percentage: Math.round(scores[dimension]),
                weight: this.evaluationDimensions[dimension].weight * 100,
                feedback: this.formatFeedbackForDisplay(feedback[dimension])
            };
        }
        
        return {
            score: Math.round(overallScore),
            detailedScores: detailedScores,
            recommendations: recommendations,
            analysis: {
                executiveSummary: this.generateSummary(overallScore, scores, parsedData, subcomponent),
                strengths: this.extractAllStrengths(feedback),
                weaknesses: this.extractAllWeaknesses(feedback),
                improvement: Math.round(improvement)
            }
        };
    }

    generateSummary(overallScore, scores, parsedData, subcomponent) {
        const summaries = {
            '4-1': `Feature Matrix analysis: ${overallScore >= 60 ? 'Features well-defined with clear value scoring.' : 'Feature definition and prioritization needs work.'}`,
            '4-2': `Technical Scope analysis: ${overallScore >= 60 ? 'Technical architecture and risks well-planned.' : 'Technical planning requires more detail.'}`,
            '4-3': `Pilot Group analysis: ${overallScore >= 60 ? 'Pilot selection and engagement strategy solid.' : 'Pilot group planning needs refinement.'}`,
            '4-4': `QA Standards analysis: ${overallScore >= 60 ? 'Quality standards and testing approach defined.' : 'Quality assurance planning needs improvement.'}`,
            '4-5': `Timeline Planning analysis: ${overallScore >= 60 ? 'Timeline realistic with clear milestones.' : 'Timeline planning requires more detail.'}`,
            '4-6': `Success Metrics analysis: ${overallScore >= 60 ? 'Success criteria and tracking well-defined.' : 'Success metrics need more specificity.'}`
        };
        
        const base = summaries[subcomponent] || summaries['4-6'];
        
        if (overallScore >= 80) {
            return `Excellent prototype planning! ${base} Ready to execute with confidence.`;
        } else if (overallScore >= 60) {
            return `Good foundation established. ${base} Some refinement needed before launch.`;
        } else if (overallScore >= 40) {
            return `Planning in progress. ${base} Critical gaps must be addressed.`;
        } else {
            return `Early planning stage. ${base} Fundamental work required across all dimensions.`;
        }
    }
    
    formatFeedbackForDisplay(feedback) {
        const strengths = feedback.strengths || [];
        const improvements = feedback.improvements || [];
        
        let display = '';
        if (strengths.length > 0) {
            display += '✓ ' + strengths.join('\n✓ ');
        }
        if (improvements.length > 0) {
            if (display) display += '\n';
            display += '✗ ' + improvements.join('\n✗ ');
        }
        
        return display;
    }
    
    extractAllStrengths(feedback) {
        const allStrengths = [];
        for (const dimension in feedback) {
            if (feedback[dimension].strengths) {
                allStrengths.push(...feedback[dimension].strengths);
            }
        }
        return allStrengths.length > 0 ? allStrengths : ['Prototype planning initiated'];
    }
    
    extractAllWeaknesses(feedback) {
        const allWeaknesses = [];
        for (const dimension in feedback) {
            if (feedback[dimension].improvements) {
                allWeaknesses.push(...feedback[dimension].improvements);
            }
        }
        return allWeaknesses.length > 0 ? allWeaknesses : ['Comprehensive planning needed'];
    }
}

module.exports = PrototypeLaunchAgentEnhanced;
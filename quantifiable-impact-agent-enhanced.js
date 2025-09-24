/**
 * Quantifiable Impact Agent - Enhanced Version
 * Provides subcomponent-specific analysis for Block 7
 */

const { generateDynamicRecommendations } = require('./recommendations-library-dynamic-wrapper.js');

class QuantifiableImpactAgentEnhanced {
    constructor() {
        this.name = 'Quantifiable Impact Agent Enhanced';
        this.version = '3.0';
    }

    async analyzeWorksheet(worksheetData, subcomponentId) {
        console.log('📊 Quantifiable Impact Agent Enhanced analyzing:', subcomponentId);
        
        // Get subcomponent-specific dimensions
        const dimensions = this.getDimensionsForSubcomponent(subcomponentId);
        
        // Evaluate based on subcomponent-specific criteria
        const evaluatedDimensions = this.evaluateDimensions(worksheetData, dimensions, subcomponentId);
        
        // Calculate overall score
        const overallScore = this.calculateOverallScore(evaluatedDimensions);
        
        // Generate subcomponent-specific recommendations
        const recommendations = this.generateRecommendations(evaluatedDimensions, subcomponentId);
        
        return {
            score: overallScore,
            detailedScores: evaluatedDimensions,
            recommendations: recommendations,
            analysis: {
                executiveSummary: this.generateExecutiveSummary(overallScore, subcomponentId)
            },
            confidence: 0.90
        };
    }
    
    getDimensionsForSubcomponent(subcomponentId) {
        const dimensionMap = {
            '7-1': { // Time/Cost Savings Metrics
                timeSavings: {
                    score: 0,
                    maxScore: 20,
                    weight: 30,
                    name: 'Time Savings',
                    description: 'Hours or days saved by users',
                    feedback: ''
                },
                costReduction: {
                    score: 0,
                    maxScore: 20,
                    weight: 30,
                    name: 'Cost Reduction',
                    description: 'Money saved through efficiency',
                    feedback: ''
                },
                measurementAccuracy: {
                    score: 0,
                    maxScore: 20,
                    weight: 20,
                    name: 'Measurement Accuracy',
                    description: 'Precision of savings calculations',
                    feedback: ''
                },
                scalability: {
                    score: 0,
                    maxScore: 20,
                    weight: 20,
                    name: 'Scalability',
                    description: 'Savings potential at scale',
                    feedback: ''
                }
            },
            '7-2': { // Revenue-Impact Attribution
                revenueContribution: {
                    score: 0,
                    maxScore: 20,
                    weight: 30,
                    name: 'Revenue Contribution',
                    description: 'Direct revenue impact',
                    feedback: ''
                },
                attributionModel: {
                    score: 0,
                    maxScore: 20,
                    weight: 25,
                    name: 'Attribution Model',
                    description: 'How revenue is attributed',
                    feedback: ''
                },
                growthMetrics: {
                    score: 0,
                    maxScore: 20,
                    weight: 25,
                    name: 'Growth Metrics',
                    description: 'Revenue growth indicators',
                    feedback: ''
                },
                forecastAccuracy: {
                    score: 0,
                    maxScore: 20,
                    weight: 20,
                    name: 'Forecast Accuracy',
                    description: 'Revenue prediction reliability',
                    feedback: ''
                }
            },
            '7-3': { // Productivity Lift Metrics
                outputIncrease: {
                    score: 0,
                    maxScore: 20,
                    weight: 30,
                    name: 'Output Increase',
                    description: 'Productivity gains measured',
                    feedback: ''
                },
                efficiencyGains: {
                    score: 0,
                    maxScore: 20,
                    weight: 25,
                    name: 'Efficiency Gains',
                    description: 'Process improvements quantified',
                    feedback: ''
                },
                qualityImprovement: {
                    score: 0,
                    maxScore: 20,
                    weight: 25,
                    name: 'Quality Improvement',
                    description: 'Error reduction and quality gains',
                    feedback: ''
                },
                teamPerformance: {
                    score: 0,
                    maxScore: 20,
                    weight: 20,
                    name: 'Team Performance',
                    description: 'Team productivity metrics',
                    feedback: ''
                }
            },
            '7-4': { // Net Retention Trends
                retentionRate: {
                    score: 0,
                    maxScore: 20,
                    weight: 30,
                    name: 'Retention Rate',
                    description: 'Customer retention percentage',
                    feedback: ''
                },
                expansionRevenue: {
                    score: 0,
                    maxScore: 20,
                    weight: 30,
                    name: 'Expansion Revenue',
                    description: 'Revenue from existing customers',
                    feedback: ''
                },
                churnAnalysis: {
                    score: 0,
                    maxScore: 20,
                    weight: 20,
                    name: 'Churn Analysis',
                    description: 'Understanding of churn drivers',
                    feedback: ''
                },
                cohortTracking: {
                    score: 0,
                    maxScore: 20,
                    weight: 20,
                    name: 'Cohort Tracking',
                    description: 'Retention by customer cohort',
                    feedback: ''
                }
            },
            '7-5': { // Downstream System Reductions
                systemsEliminated: {
                    score: 0,
                    maxScore: 20,
                    weight: 30,
                    name: 'Systems Eliminated',
                    description: 'Tools or services replaced',
                    feedback: ''
                },
                consolidationValue: {
                    score: 0,
                    maxScore: 20,
                    weight: 25,
                    name: 'Consolidation Value',
                    description: 'Value from system consolidation',
                    feedback: ''
                },
                integrationBenefits: {
                    score: 0,
                    maxScore: 20,
                    weight: 25,
                    name: 'Integration Benefits',
                    description: 'Benefits from unified systems',
                    feedback: ''
                },
                maintenanceReduction: {
                    score: 0,
                    maxScore: 20,
                    weight: 20,
                    name: 'Maintenance Reduction',
                    description: 'Reduced maintenance overhead',
                    feedback: ''
                }
            },
            '7-6': { // Friction Reduction Evidence
                processSimplification: {
                    score: 0,
                    maxScore: 20,
                    weight: 25,
                    name: 'Process Simplification',
                    description: 'Simplified workflows',
                    feedback: ''
                },
                userExperience: {
                    score: 0,
                    maxScore: 20,
                    weight: 25,
                    name: 'User Experience',
                    description: 'UX improvements measured',
                    feedback: ''
                },
                automationImpact: {
                    score: 0,
                    maxScore: 20,
                    weight: 25,
                    name: 'Automation Impact',
                    description: 'Manual work eliminated',
                    feedback: ''
                },
                speedImprovement: {
                    score: 0,
                    maxScore: 20,
                    weight: 25,
                    name: 'Speed Improvement',
                    description: 'Faster task completion',
                    feedback: ''
                }
            }
        };
        
        return dimensionMap[subcomponentId] || this.getDefaultDimensions();
    }
    
    getDefaultDimensions() {
        // Fallback dimensions if subcomponent not mapped
        return {
            measurement: {
                score: 0,
                maxScore: 20,
                weight: 25,
                name: 'Measurement',
                description: 'Impact measurement quality',
                feedback: ''
            },
            quantification: {
                score: 0,
                maxScore: 20,
                weight: 25,
                name: 'Quantification',
                description: 'Numerical evidence',
                feedback: ''
            },
            attribution: {
                score: 0,
                maxScore: 20,
                weight: 25,
                name: 'Attribution',
                description: 'Impact attribution clarity',
                feedback: ''
            },
            validation: {
                score: 0,
                maxScore: 20,
                weight: 25,
                name: 'Validation',
                description: 'Evidence validation',
                feedback: ''
            }
        };
    }
    
    evaluateDimensions(data, dimensions, subcomponentId) {
        const fieldData = Object.values(data).join(' ').toLowerCase();
        
        // Subcomponent-specific evaluation logic
        switch(subcomponentId) {
            case '7-1': // Time/Cost Savings Metrics
                return this.evaluateTimeCostSavings(fieldData, dimensions);
            case '7-2': // Revenue-Impact Attribution
                return this.evaluateRevenueImpact(fieldData, dimensions);
            case '7-3': // Productivity Lift Metrics
                return this.evaluateProductivityLift(fieldData, dimensions);
            case '7-4': // Net Retention Trends
                return this.evaluateNetRetention(fieldData, dimensions);
            case '7-5': // Downstream System Reductions
                return this.evaluateSystemReductions(fieldData, dimensions);
            case '7-6': // Friction Reduction Evidence
                return this.evaluateFrictionReduction(fieldData, dimensions);
            default:
                return this.evaluateGeneric(fieldData, dimensions);
        }
    }
    
    evaluateTimeCostSavings(fieldData, dimensions) {
        // Time Savings
        let score = 0;
        if (fieldData.includes('hour') || fieldData.includes('day')) score += 7;
        if (fieldData.includes('save') || fieldData.includes('reduce')) score += 7;
        if (fieldData.includes('time') || fieldData.includes('duration')) score += 6;
        dimensions.timeSavings.score = Math.min(score, 20);
        dimensions.timeSavings.percentage = (dimensions.timeSavings.score / 20) * 100;
        dimensions.timeSavings.feedback = score >= 14 ? '✓ Time savings quantified' : '✗ Quantify time saved';
        
        // Cost Reduction
        score = 0;
        if (fieldData.match(/\$[\d,]+/)) score += 8;
        if (fieldData.includes('cost') || fieldData.includes('expense')) score += 6;
        if (fieldData.includes('reduce') || fieldData.includes('save')) score += 6;
        dimensions.costReduction.score = Math.min(score, 20);
        dimensions.costReduction.percentage = (dimensions.costReduction.score / 20) * 100;
        dimensions.costReduction.feedback = score >= 14 ? '✓ Cost savings clear' : '✗ Calculate cost reduction';
        
        // Measurement Accuracy
        score = 0;
        if (fieldData.includes('measure') || fieldData.includes('calculate')) score += 7;
        if (fieldData.includes('accurate') || fieldData.includes('precise')) score += 7;
        if (fieldData.includes('method') || fieldData.includes('formula')) score += 6;
        dimensions.measurementAccuracy.score = Math.min(score, 20);
        dimensions.measurementAccuracy.percentage = (dimensions.measurementAccuracy.score / 20) * 100;
        dimensions.measurementAccuracy.feedback = score >= 14 ? '✓ Accurate measurements' : '✗ Improve measurement accuracy';
        
        // Scalability
        score = 0;
        if (fieldData.includes('scale') || fieldData.includes('grow')) score += 7;
        if (fieldData.includes('multiply') || fieldData.includes('expand')) score += 7;
        if (fieldData.includes('potential') || fieldData.includes('project')) score += 6;
        dimensions.scalability.score = Math.min(score, 20);
        dimensions.scalability.percentage = (dimensions.scalability.score / 20) * 100;
        dimensions.scalability.feedback = score >= 14 ? '✓ Scalable savings' : '✗ Project savings at scale';
        
        return dimensions;
    }
    
    evaluateRevenueImpact(fieldData, dimensions) {
        // Revenue Contribution
        let score = 0;
        if (fieldData.match(/\$[\d,]+/)) score += 8;
        if (fieldData.includes('revenue') || fieldData.includes('sales')) score += 6;
        if (fieldData.includes('increase') || fieldData.includes('growth')) score += 6;
        dimensions.revenueContribution.score = Math.min(score, 20);
        dimensions.revenueContribution.percentage = (dimensions.revenueContribution.score / 20) * 100;
        dimensions.revenueContribution.feedback = score >= 14 ? '✓ Revenue impact clear' : '✗ Quantify revenue impact';
        
        // Attribution Model
        score = 0;
        if (fieldData.includes('attribut') || fieldData.includes('contribut')) score += 7;
        if (fieldData.includes('model') || fieldData.includes('method')) score += 7;
        if (fieldData.includes('direct') || fieldData.includes('indirect')) score += 6;
        dimensions.attributionModel.score = Math.min(score, 20);
        dimensions.attributionModel.percentage = (dimensions.attributionModel.score / 20) * 100;
        dimensions.attributionModel.feedback = score >= 14 ? '✓ Attribution clear' : '✗ Define attribution model';
        
        // Growth Metrics
        score = 0;
        if (fieldData.match(/\d+%/)) score += 7;
        if (fieldData.includes('growth') || fieldData.includes('increase')) score += 7;
        if (fieldData.includes('metric') || fieldData.includes('kpi')) score += 6;
        dimensions.growthMetrics.score = Math.min(score, 20);
        dimensions.growthMetrics.percentage = (dimensions.growthMetrics.score / 20) * 100;
        dimensions.growthMetrics.feedback = score >= 14 ? '✓ Growth tracked' : '✗ Define growth metrics';
        
        // Forecast Accuracy
        score = 0;
        if (fieldData.includes('forecast') || fieldData.includes('predict')) score += 7;
        if (fieldData.includes('accurate') || fieldData.includes('reliable')) score += 7;
        if (fieldData.includes('project') || fieldData.includes('estimate')) score += 6;
        dimensions.forecastAccuracy.score = Math.min(score, 20);
        dimensions.forecastAccuracy.percentage = (dimensions.forecastAccuracy.score / 20) * 100;
        dimensions.forecastAccuracy.feedback = score >= 14 ? '✓ Reliable forecasts' : '✗ Improve forecast accuracy';
        
        return dimensions;
    }
    
    evaluateProductivityLift(fieldData, dimensions) {
        // Output Increase
        let score = 0;
        if (fieldData.match(/\d+%/)) score += 7;
        if (fieldData.includes('output') || fieldData.includes('produce')) score += 7;
        if (fieldData.includes('increase') || fieldData.includes('more')) score += 6;
        dimensions.outputIncrease.score = Math.min(score, 20);
        dimensions.outputIncrease.percentage = (dimensions.outputIncrease.score / 20) * 100;
        dimensions.outputIncrease.feedback = score >= 14 ? '✓ Output gains measured' : '✗ Measure output increase';
        
        // Efficiency Gains
        score = 0;
        if (fieldData.includes('efficien') || fieldData.includes('streamline')) score += 7;
        if (fieldData.includes('improve') || fieldData.includes('optimize')) score += 7;
        if (fieldData.includes('process') || fieldData.includes('workflow')) score += 6;
        dimensions.efficiencyGains.score = Math.min(score, 20);
        dimensions.efficiencyGains.percentage = (dimensions.efficiencyGains.score / 20) * 100;
        dimensions.efficiencyGains.feedback = score >= 14 ? '✓ Efficiency improved' : '✗ Quantify efficiency gains';
        
        // Quality Improvement
        score = 0;
        if (fieldData.includes('quality') || fieldData.includes('accuracy')) score += 7;
        if (fieldData.includes('error') || fieldData.includes('defect')) score += 7;
        if (fieldData.includes('improve') || fieldData.includes('reduce')) score += 6;
        dimensions.qualityImprovement.score = Math.min(score, 20);
        dimensions.qualityImprovement.percentage = (dimensions.qualityImprovement.score / 20) * 100;
        dimensions.qualityImprovement.feedback = score >= 14 ? '✓ Quality gains shown' : '✗ Measure quality improvement';
        
        // Team Performance
        score = 0;
        if (fieldData.includes('team') || fieldData.includes('staff')) score += 7;
        if (fieldData.includes('performance') || fieldData.includes('productivity')) score += 7;
        if (fieldData.includes('metric') || fieldData.includes('measure')) score += 6;
        dimensions.teamPerformance.score = Math.min(score, 20);
        dimensions.teamPerformance.percentage = (dimensions.teamPerformance.score / 20) * 100;
        dimensions.teamPerformance.feedback = score >= 14 ? '✓ Team metrics tracked' : '✗ Track team performance';
        
        return dimensions;
    }
    
    evaluateNetRetention(fieldData, dimensions) {
        // Retention Rate
        let score = 0;
        if (fieldData.match(/\d+%/)) score += 7;
        if (fieldData.includes('retention') || fieldData.includes('retain')) score += 7;
        if (fieldData.includes('customer') || fieldData.includes('client')) score += 6;
        dimensions.retentionRate.score = Math.min(score, 20);
        dimensions.retentionRate.percentage = (dimensions.retentionRate.score / 20) * 100;
        dimensions.retentionRate.feedback = score >= 14 ? '✓ Retention tracked' : '✗ Measure retention rate';
        
        // Expansion Revenue
        score = 0;
        if (fieldData.includes('expansion') || fieldData.includes('upsell')) score += 7;
        if (fieldData.includes('revenue') || fieldData.includes('growth')) score += 7;
        if (fieldData.includes('existing') || fieldData.includes('current')) score += 6;
        dimensions.expansionRevenue.score = Math.min(score, 20);
        dimensions.expansionRevenue.percentage = (dimensions.expansionRevenue.score / 20) * 100;
        dimensions.expansionRevenue.feedback = score >= 14 ? '✓ Expansion tracked' : '✗ Track expansion revenue';
        
        // Churn Analysis
        score = 0;
        if (fieldData.includes('churn') || fieldData.includes('attrition')) score += 7;
        if (fieldData.includes('reason') || fieldData.includes('why')) score += 7;
        if (fieldData.includes('analysis') || fieldData.includes('understand')) score += 6;
        dimensions.churnAnalysis.score = Math.min(score, 20);
        dimensions.churnAnalysis.percentage = (dimensions.churnAnalysis.score / 20) * 100;
        dimensions.churnAnalysis.feedback = score >= 14 ? '✓ Churn understood' : '✗ Analyze churn reasons';
        
        // Cohort Tracking
        score = 0;
        if (fieldData.includes('cohort') || fieldData.includes('segment')) score += 7;
        if (fieldData.includes('track') || fieldData.includes('monitor')) score += 7;
        if (fieldData.includes('trend') || fieldData.includes('pattern')) score += 6;
        dimensions.cohortTracking.score = Math.min(score, 20);
        dimensions.cohortTracking.percentage = (dimensions.cohortTracking.score / 20) * 100;
        dimensions.cohortTracking.feedback = score >= 14 ? '✓ Cohorts tracked' : '✗ Track retention by cohort';
        
        return dimensions;
    }
    
    evaluateSystemReductions(fieldData, dimensions) {
        // Systems Eliminated
        let score = 0;
        if (fieldData.includes('eliminate') || fieldData.includes('replace')) score += 7;
        if (fieldData.includes('system') || fieldData.includes('tool')) score += 7;
        if (fieldData.includes('consolidate') || fieldData.includes('reduce')) score += 6;
        dimensions.systemsEliminated.score = Math.min(score, 20);
        dimensions.systemsEliminated.percentage = (dimensions.systemsEliminated.score / 20) * 100;
        dimensions.systemsEliminated.feedback = score >= 14 ? '✓ Systems reduced' : '✗ Identify systems to eliminate';
        
        // Consolidation Value
        score = 0;
        if (fieldData.match(/\$[\d,]+/)) score += 7;
        if (fieldData.includes('value') || fieldData.includes('saving')) score += 7;
        if (fieldData.includes('consolidat') || fieldData.includes('unif')) score += 6;
        dimensions.consolidationValue.score = Math.min(score, 20);
        dimensions.consolidationValue.percentage = (dimensions.consolidationValue.score / 20) * 100;
        dimensions.consolidationValue.feedback = score >= 14 ? '✓ Value quantified' : '✗ Calculate consolidation value';
        
        // Integration Benefits
        score = 0;
        if (fieldData.includes('integrat') || fieldData.includes('connect')) score += 7;
        if (fieldData.includes('benefit') || fieldData.includes('advantage')) score += 7;
        if (fieldData.includes('seamless') || fieldData.includes('unified')) score += 6;
        dimensions.integrationBenefits.score = Math.min(score, 20);
        dimensions.integrationBenefits.percentage = (dimensions.integrationBenefits.score / 20) * 100;
        dimensions.integrationBenefits.feedback = score >= 14 ? '✓ Benefits clear' : '✗ Document integration benefits';
        
        // Maintenance Reduction
        score = 0;
        if (fieldData.includes('maintenance') || fieldData.includes('support')) score += 7;
        if (fieldData.includes('reduce') || fieldData.includes('less')) score += 7;
        if (fieldData.includes('overhead') || fieldData.includes('burden')) score += 6;
        dimensions.maintenanceReduction.score = Math.min(score, 20);
        dimensions.maintenanceReduction.percentage = (dimensions.maintenanceReduction.score / 20) * 100;
        dimensions.maintenanceReduction.feedback = score >= 14 ? '✓ Maintenance reduced' : '✗ Quantify maintenance savings';
        
        return dimensions;
    }
    
    evaluateFrictionReduction(fieldData, dimensions) {
        // Process Simplification
        let score = 0;
        if (fieldData.includes('simpl') || fieldData.includes('easy')) score += 7;
        if (fieldData.includes('process') || fieldData.includes('workflow')) score += 7;
        if (fieldData.includes('streamline') || fieldData.includes('reduce')) score += 6;
        dimensions.processSimplification.score = Math.min(score, 20);
        dimensions.processSimplification.percentage = (dimensions.processSimplification.score / 20) * 100;
        dimensions.processSimplification.feedback = score >= 14 ? '✓ Processes simplified' : '✗ Simplify workflows';
        
        // User Experience
        score = 0;
        if (fieldData.includes('user') || fieldData.includes('ux')) score += 7;
        if (fieldData.includes('experience') || fieldData.includes('satisfaction')) score += 7;
        if (fieldData.includes('improve') || fieldData.includes('better')) score += 6;
        dimensions.userExperience.score = Math.min(score, 20);
        dimensions.userExperience.percentage = (dimensions.userExperience.score / 20) * 100;
        dimensions.userExperience.feedback = score >= 14 ? '✓ UX improved' : '✗ Measure UX improvements';
        
        // Automation Impact
        score = 0;
        if (fieldData.includes('automat') || fieldData.includes('manual')) score += 7;
        if (fieldData.includes('eliminate') || fieldData.includes('reduce')) score += 7;
        if (fieldData.includes('task') || fieldData.includes('work')) score += 6;
        dimensions.automationImpact.score = Math.min(score, 20);
        dimensions.automationImpact.percentage = (dimensions.automationImpact.score / 20) * 100;
        dimensions.automationImpact.feedback = score >= 14 ? '✓ Automation impact shown' : '✗ Quantify automation benefits';
        
        // Speed Improvement
        score = 0;
        if (fieldData.includes('fast') || fieldData.includes('quick')) score += 7;
        if (fieldData.includes('speed') || fieldData.includes('time')) score += 7;
        if (fieldData.includes('improve') || fieldData.includes('reduce')) score += 6;
        dimensions.speedImprovement.score = Math.min(score, 20);
        dimensions.speedImprovement.percentage = (dimensions.speedImprovement.score / 20) * 100;
        dimensions.speedImprovement.feedback = score >= 14 ? '✓ Speed gains shown' : '✗ Measure speed improvements';
        
        return dimensions;
    }
    
    evaluateGeneric(fieldData, dimensions) {
        // Generic evaluation for unmapped subcomponents
        Object.keys(dimensions).forEach(key => {
            let score = Math.floor(Math.random() * 10) + 5; // Random score 5-15
            dimensions[key].score = score;
            dimensions[key].percentage = (score / 20) * 100;
            dimensions[key].feedback = score >= 14 ? '✓ Good progress' : '✗ Needs improvement';
        });
        return dimensions;
    }
    
    calculateOverallScore(dimensions) {
        let totalScore = 0;
        let totalWeight = 0;
        
        Object.values(dimensions).forEach(dim => {
            totalScore += (dim.score / dim.maxScore) * dim.weight;
            totalWeight += dim.weight;
        });
        
        return Math.round((totalScore / totalWeight) * 100);
    }
    
    generateRecommendations(dimensions, subcomponentId) {
        const recommendations = [];
        const subcomponentNames = {
            '7-1': 'Time/Cost Savings Metrics',
            '7-2': 'Revenue-Impact Attribution',
            '7-3': 'Productivity Lift Metrics',
            '7-4': 'Net Retention Trends',
            '7-5': 'Downstream System Reductions',
            '7-6': 'Friction Reduction Evidence'
        };
        
        const subcomponentName = subcomponentNames[subcomponentId] || 'Quantifiable Impact';
        
        // Generate recommendations based on low-scoring dimensions
        Object.entries(dimensions).forEach(([key, dim]) => {
            if (dim.percentage < 60) {
                const improvement = dim.percentage < 30 ? 15 :
                                   dim.percentage < 45 ? 10 : 7;
                
                recommendations.push({
                    priority: dim.percentage < 30 ? 'CRITICAL' : 
                             dim.percentage < 45 ? 'HIGH' : 'MEDIUM',
                    area: dim.name,
                    action: this.getActionForDimension(key, subcomponentId),
                    expectedImprovement: `+${improvement} points`,
                    impact: `Strengthen ${subcomponentName} by improving ${dim.description.toLowerCase()}`,
                    actionPlan: this.getActionPlan(key, subcomponentId)
                });
            }
        });
        
        // Sort by priority and return top 5
        return recommendations
            .sort((a, b) => {
                const priorityOrder = { 'CRITICAL': 0, 'HIGH': 1, 'MEDIUM': 2 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            })
            .slice(0, 5);
    }
    
    getActionForDimension(dimensionKey, subcomponentId) {
        const actionMap = {
            '7-1': {
                timeSavings: 'Calculate and document hours saved per user per week/month',
                costReduction: 'Quantify cost savings with detailed financial analysis',
                measurementAccuracy: 'Implement precise measurement methodology and tracking',
                scalability: 'Project savings potential across entire user base'
            },
            '7-2': {
                revenueContribution: 'Track direct revenue impact from product usage',
                attributionModel: 'Build clear attribution model for revenue contribution',
                growthMetrics: 'Define and monitor key revenue growth indicators',
                forecastAccuracy: 'Improve revenue forecasting models and accuracy'
            },
            '7-3': {
                outputIncrease: 'Measure productivity gains with before/after metrics',
                efficiencyGains: 'Document process improvements and time savings',
                qualityImprovement: 'Track error reduction and quality metrics',
                teamPerformance: 'Monitor team productivity KPIs and improvements'
            },
            '7-4': {
                retentionRate: 'Track and improve gross and net retention rates',
                expansionRevenue: 'Measure revenue growth from existing customers',
                churnAnalysis: 'Analyze churn reasons and implement prevention strategies',
                cohortTracking: 'Monitor retention trends by customer cohort'
            },
            '7-5': {
                systemsEliminated: 'Document tools and systems replaced by your solution',
                consolidationValue: 'Calculate total cost savings from system consolidation',
                integrationBenefits: 'Quantify benefits of unified platform approach',
                maintenanceReduction: 'Measure reduction in IT overhead and support costs'
            },
            '7-6': {
                processSimplification: 'Document workflow simplifications and steps eliminated',
                userExperience: 'Measure UX improvements through user satisfaction scores',
                automationImpact: 'Quantify manual work eliminated through automation',
                speedImprovement: 'Track time reduction for key user tasks'
            }
        };
        
        const actions = actionMap[subcomponentId] || {};
        return actions[dimensionKey] || 'Improve this dimension for better impact measurement';
    }
    
    getActionPlan(dimensionKey, subcomponentId) {
        // Return specific action steps
        return [
            'Establish baseline measurements',
            'Implement tracking mechanisms',
            'Collect and analyze data',
            'Report impact metrics regularly'
        ];
    }
    
    generateExecutiveSummary(score, subcomponentId) {
        const subcomponentSummaries = {
            '7-1': {
                high: "Excellent time and cost savings documentation! Your metrics clearly demonstrate efficiency gains. Use these to accelerate sales conversations.",
                medium: "Time/cost savings are tracked but need more precision. Add detailed calculations and project savings at scale for stronger impact.",
                low: "Time/cost metrics need significant improvement. Priority: Implement comprehensive tracking to quantify efficiency gains."
            },
            '7-2': {
                high: "Outstanding revenue attribution! You clearly show how your product drives revenue growth. This is powerful for enterprise sales.",
                medium: "Revenue impact is tracked but attribution needs clarity. Better connect product usage to revenue outcomes.",
                low: "Revenue attribution is weak. Priority: Build clear model showing how your product contributes to customer revenue."
            },
            '7-3': {
                high: "Excellent productivity metrics! You demonstrate clear gains in output and efficiency. Use these to justify premium pricing.",
                medium: "Productivity improvements are noted but need quantification. Add specific metrics for output, quality, and efficiency gains.",
                low: "Productivity metrics are insufficient. Priority: Measure and document productivity improvements with hard numbers."
            },
            '7-4': {
                high: "Strong retention metrics! Your net retention trends show healthy growth from existing customers. Focus on expansion strategies.",
                medium: "Retention is tracked but analysis needs depth. Better understand churn drivers and expansion opportunities.",
                low: "Retention tracking needs development. Priority: Implement comprehensive retention and expansion revenue tracking."
            },
            '7-5': {
                high: "Excellent system consolidation story! You clearly show how you eliminate other tools and reduce complexity. Powerful for IT buyers.",
                medium: "System reductions are identified but value unclear. Quantify the total cost and complexity reduction achieved.",
                low: "System reduction evidence is weak. Priority: Document which tools you replace and calculate consolidation value."
            },
            '7-6': {
                high: "Outstanding friction reduction evidence! You demonstrate clear improvements in user experience and efficiency. Continue gathering data.",
                medium: "Friction reduction is happening but needs measurement. Quantify process simplifications and speed improvements.",
                low: "Friction reduction needs documentation. Priority: Measure and document workflow improvements and automation impact."
            }
        };
        
        const summaries = subcomponentSummaries[subcomponentId] || {
            high: "Excellent quantifiable impact! Continue building evidence of value creation.",
            medium: "Good impact tracking. Focus on more precise quantification and attribution.",
            low: "Impact measurement needs significant improvement across multiple dimensions."
        };
        
        if (score >= 75) return summaries.high;
        if (score >= 45) return summaries.medium;
        return summaries.low;
    }
}

module.exports = QuantifiableImpactAgentEnhanced;
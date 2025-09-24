// Phase 2 Agents - Complete Implementation
// Blocks 5-8: Early Adopter Wins, Customer Engagement Flywheel, Quantifiable Impact, Customer Success Expansion

const fs = require('fs');
const path = require('path');

console.log('🚀 Creating ALL Phase 2 Agents with Enhanced Recommendations...\n');

// Import the recommendations library wrapper
const recommendationsLibraryPath = `
const getRecommendations = require('./recommendations-library-dynamic-wrapper.js');
`;

// Block 5: Early Adopter Wins Agent (handles all 6 subcomponents)
const earlyAdopterAgent = `
${recommendationsLibraryPath}

class EarlyAdopterWinsAgent {
    constructor() {
        this.name = 'Early Adopter Wins Agent';
        this.version = '2.0';
    }

    async analyzeWorksheet(worksheetData, subcomponentId) {
        console.log('🎯 Early Adopter Wins Agent analyzing:', subcomponentId);
        
        // Determine specific subcomponent
        const subcomponentMap = {
            '5-1': 'early-win-documentation',
            '5-2': 'roi-calculation',
            '5-3': 'use-case-success',
            '5-4': 'reference-architecture',
            '5-5': 'customer-testimonials',
            '5-6': 'case-study-development'
        };
        
        const analysisType = subcomponentMap[subcomponentId] || 'early-adopter';
        
        // Calculate scores based on worksheet completeness and quality
        const dimensions = this.evaluateDimensions(worksheetData, analysisType);
        const overallScore = this.calculateOverallScore(dimensions);
        
        // Generate recommendations with "+X points" format
        const recommendations = this.generateRecommendations(dimensions, analysisType);
        
        return {
            score: overallScore,
            detailedScores: dimensions,
            recommendations: recommendations,
            analysis: {
                executiveSummary: this.generateExecutiveSummary(overallScore, analysisType)
            },
            confidence: 0.85
        };
    }
    
    evaluateDimensions(data, type) {
        const dimensions = {
            winDocumentation: {
                score: 0,
                maxScore: 20,
                weight: 20,
                feedback: ''
            },
            roiQuantification: {
                score: 0,
                maxScore: 20,
                weight: 20,
                feedback: ''
            },
            customerEvidence: {
                score: 0,
                maxScore: 20,
                weight: 20,
                feedback: ''
            },
            repeatability: {
                score: 0,
                maxScore: 20,
                weight: 20,
                feedback: ''
            },
            marketValidation: {
                score: 0,
                maxScore: 20,
                weight: 20,
                feedback: ''
            }
        };
        
        // Evaluate each dimension
        Object.keys(dimensions).forEach(key => {
            const fieldData = Object.values(data).join(' ').toLowerCase();
            let score = 0;
            let feedback = [];
            
            switch(key) {
                case 'winDocumentation':
                    if (fieldData.includes('success') || fieldData.includes('win')) score += 5;
                    if (fieldData.includes('metric') || fieldData.includes('measure')) score += 5;
                    if (fieldData.includes('document') || fieldData.includes('record')) score += 5;
                    if (fieldData.includes('process') || fieldData.includes('system')) score += 5;
                    
                    if (score >= 15) feedback.push('✓ Strong win documentation process');
                    if (score < 10) feedback.push('✗ Need systematic win tracking');
                    break;
                    
                case 'roiQuantification':
                    if (fieldData.match(/\\d+%/) || fieldData.match(/\\$\\d+/)) score += 8;
                    if (fieldData.includes('roi') || fieldData.includes('return')) score += 6;
                    if (fieldData.includes('payback') || fieldData.includes('value')) score += 6;
                    
                    if (score >= 15) feedback.push('✓ Clear ROI metrics defined');
                    if (score < 10) feedback.push('✗ Quantify financial impact');
                    break;
                    
                case 'customerEvidence':
                    if (fieldData.includes('testimonial') || fieldData.includes('quote')) score += 7;
                    if (fieldData.includes('case study') || fieldData.includes('reference')) score += 7;
                    if (fieldData.includes('feedback') || fieldData.includes('review')) score += 6;
                    
                    if (score >= 15) feedback.push('✓ Strong customer evidence');
                    if (score < 10) feedback.push('✗ Gather more customer proof');
                    break;
                    
                case 'repeatability':
                    if (fieldData.includes('scale') || fieldData.includes('replicate')) score += 7;
                    if (fieldData.includes('playbook') || fieldData.includes('template')) score += 7;
                    if (fieldData.includes('standard') || fieldData.includes('process')) score += 6;
                    
                    if (score >= 15) feedback.push('✓ Scalable success model');
                    if (score < 10) feedback.push('✗ Build repeatable playbooks');
                    break;
                    
                case 'marketValidation':
                    if (fieldData.includes('market') || fieldData.includes('industry')) score += 7;
                    if (fieldData.includes('competitor') || fieldData.includes('alternative')) score += 7;
                    if (fieldData.includes('adoption') || fieldData.includes('growth')) score += 6;
                    
                    if (score >= 15) feedback.push('✓ Market validation confirmed');
                    if (score < 10) feedback.push('✗ Strengthen market proof');
                    break;
            }
            
            dimensions[key].score = Math.min(score, 20);
            dimensions[key].percentage = Math.round((dimensions[key].score / 20) * 100);
            dimensions[key].feedback = feedback.join('\\n');
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
    
    generateRecommendations(dimensions, type) {
        const recommendations = [];
        
        // Always use dynamic recommendations with "+X points" format
        const dynamicRecs = getRecommendations('early-adopter-wins', dimensions);
        
        // Ensure all recommendations have "+X points" format
        dynamicRecs.forEach(rec => {
            if (!rec.expectedImprovement || !rec.expectedImprovement.includes('points')) {
                const points = rec.priority === 'CRITICAL' ? 12 :
                              rec.priority === 'HIGH' ? 8 : 5;
                rec.expectedImprovement = \`+\${points} points\`;
            }
            recommendations.push(rec);
        });
        
        // Add specific recommendations based on low-scoring dimensions
        Object.entries(dimensions).forEach(([key, dim]) => {
            if (dim.percentage < 50) {
                const improvement = dim.percentage < 30 ? 15 : 10;
                recommendations.push({
                    priority: dim.percentage < 30 ? 'CRITICAL' : 'HIGH',
                    area: key.replace(/([A-Z])/g, ' $1').trim(),
                    action: \`Improve \${key.replace(/([A-Z])/g, ' $1').toLowerCase().trim()}\`,
                    expectedImprovement: \`+\${improvement} points\`,
                    impact: \`Strengthen this critical dimension from \${dim.percentage}% to \${dim.percentage + improvement}%\`
                });
            }
        });
        
        return recommendations.slice(0, 5); // Return top 5 recommendations
    }
    
    generateExecutiveSummary(score, type) {
        if (score >= 80) {
            return "Excellent early adopter validation! Your wins are well-documented with strong ROI evidence. Focus on scaling these successes to broader market segments.";
        } else if (score >= 60) {
            return "Good progress with early adopters. Strengthen ROI quantification and gather more customer testimonials to build compelling proof points for scaling.";
        } else {
            return "Early adopter strategy needs enhancement. Priority areas include systematic win documentation, ROI calculation, and building repeatable success playbooks.";
        }
    }
}

module.exports = EarlyAdopterWinsAgent;
`;

// Block 6: Customer Engagement Flywheel Agent
const customerEngagementAgent = `
${recommendationsLibraryPath}

class CustomerEngagementFlywheelAgent {
    constructor() {
        this.name = 'Customer Engagement Flywheel Agent';
        this.version = '2.0';
    }

    async analyzeWorksheet(worksheetData, subcomponentId) {
        console.log('🎯 Customer Engagement Flywheel Agent analyzing:', subcomponentId);
        
        const subcomponentMap = {
            '6-1': 'usage-analytics',
            '6-2': 'engagement-scoring',
            '6-3': 'milestone-tracking',
            '6-4': 'feedback-loops',
            '6-5': 'community-building',
            '6-6': 'advocacy-programs'
        };
        
        const analysisType = subcomponentMap[subcomponentId] || 'engagement-flywheel';
        
        const dimensions = this.evaluateDimensions(worksheetData, analysisType);
        const overallScore = this.calculateOverallScore(dimensions);
        const recommendations = this.generateRecommendations(dimensions, analysisType);
        
        return {
            score: overallScore,
            detailedScores: dimensions,
            recommendations: recommendations,
            analysis: {
                executiveSummary: this.generateExecutiveSummary(overallScore, analysisType)
            },
            confidence: 0.87
        };
    }
    
    evaluateDimensions(data, type) {
        const dimensions = {
            usageMetrics: {
                score: 0,
                maxScore: 20,
                weight: 20,
                feedback: ''
            },
            engagementDepth: {
                score: 0,
                maxScore: 20,
                weight: 20,
                feedback: ''
            },
            feedbackIntegration: {
                score: 0,
                maxScore: 20,
                weight: 20,
                feedback: ''
            },
            communityStrength: {
                score: 0,
                maxScore: 20,
                weight: 20,
                feedback: ''
            },
            advocacyPotential: {
                score: 0,
                maxScore: 20,
                weight: 20,
                feedback: ''
            }
        };
        
        Object.keys(dimensions).forEach(key => {
            const fieldData = Object.values(data).join(' ').toLowerCase();
            let score = 0;
            let feedback = [];
            
            switch(key) {
                case 'usageMetrics':
                    if (fieldData.includes('analytics') || fieldData.includes('metrics')) score += 7;
                    if (fieldData.includes('dashboard') || fieldData.includes('tracking')) score += 7;
                    if (fieldData.includes('daily') || fieldData.includes('weekly')) score += 6;
                    
                    if (score >= 15) feedback.push('✓ Comprehensive usage tracking');
                    if (score < 10) feedback.push('✗ Implement usage analytics');
                    break;
                    
                case 'engagementDepth':
                    if (fieldData.includes('engagement') || fieldData.includes('active')) score += 7;
                    if (fieldData.includes('retention') || fieldData.includes('sticky')) score += 7;
                    if (fieldData.includes('habit') || fieldData.includes('routine')) score += 6;
                    
                    if (score >= 15) feedback.push('✓ Deep engagement patterns');
                    if (score < 10) feedback.push('✗ Increase engagement depth');
                    break;
                    
                case 'feedbackIntegration':
                    if (fieldData.includes('feedback') || fieldData.includes('input')) score += 7;
                    if (fieldData.includes('iterate') || fieldData.includes('improve')) score += 7;
                    if (fieldData.includes('loop') || fieldData.includes('continuous')) score += 6;
                    
                    if (score >= 15) feedback.push('✓ Strong feedback loops');
                    if (score < 10) feedback.push('✗ Build feedback systems');
                    break;
                    
                case 'communityStrength':
                    if (fieldData.includes('community') || fieldData.includes('network')) score += 7;
                    if (fieldData.includes('peer') || fieldData.includes('collaborate')) score += 7;
                    if (fieldData.includes('forum') || fieldData.includes('group')) score += 6;
                    
                    if (score >= 15) feedback.push('✓ Vibrant community');
                    if (score < 10) feedback.push('✗ Foster community growth');
                    break;
                    
                case 'advocacyPotential':
                    if (fieldData.includes('advocate') || fieldData.includes('champion')) score += 7;
                    if (fieldData.includes('referral') || fieldData.includes('recommend')) score += 7;
                    if (fieldData.includes('testimonial') || fieldData.includes('case')) score += 6;
                    
                    if (score >= 15) feedback.push('✓ Strong advocacy program');
                    if (score < 10) feedback.push('✗ Develop advocacy initiatives');
                    break;
            }
            
            dimensions[key].score = Math.min(score, 20);
            dimensions[key].percentage = Math.round((dimensions[key].score / 20) * 100);
            dimensions[key].feedback = feedback.join('\\n');
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
    
    generateRecommendations(dimensions, type) {
        const recommendations = [];
        
        Object.entries(dimensions).forEach(([key, dim]) => {
            if (dim.percentage < 60) {
                const improvement = dim.percentage < 30 ? 14 :
                                   dim.percentage < 50 ? 10 : 7;
                
                recommendations.push({
                    priority: dim.percentage < 30 ? 'CRITICAL' : 
                             dim.percentage < 50 ? 'HIGH' : 'MEDIUM',
                    area: key.replace(/([A-Z])/g, ' $1').trim(),
                    action: this.getActionForDimension(key),
                    expectedImprovement: \`+\${improvement} points\`,
                    impact: \`Boost engagement flywheel momentum\`
                });
            }
        });
        
        return recommendations.slice(0, 5);
    }
    
    getActionForDimension(key) {
        const actions = {
            usageMetrics: 'Implement comprehensive usage analytics dashboard',
            engagementDepth: 'Create engagement scoring model and health metrics',
            feedbackIntegration: 'Build continuous feedback loops with customers',
            communityStrength: 'Launch community platform and peer networking',
            advocacyPotential: 'Develop customer advocacy and referral programs'
        };
        return actions[key] || 'Improve this engagement dimension';
    }
    
    generateExecutiveSummary(score, type) {
        if (score >= 80) {
            return "Outstanding customer engagement flywheel! Your usage metrics, feedback loops, and community are driving strong momentum. Focus on scaling advocacy programs.";
        } else if (score >= 60) {
            return "Good engagement foundation established. Strengthen usage analytics and community building to accelerate flywheel momentum and customer advocacy.";
        } else {
            return "Customer engagement needs significant improvement. Priority areas include implementing usage analytics, building feedback loops, and fostering community growth.";
        }
    }
}

module.exports = CustomerEngagementFlywheelAgent;
`;

// Block 7: Quantifiable Impact Agent
const quantifiableImpactAgent = `
${recommendationsLibraryPath}

class QuantifiableImpactAgent {
    constructor() {
        this.name = 'Quantifiable Impact Agent';
        this.version = '2.0';
    }

    async analyzeWorksheet(worksheetData, subcomponentId) {
        console.log('🎯 Quantifiable Impact Agent analyzing:', subcomponentId);
        
        const subcomponentMap = {
            '7-1': 'outcome-metrics',
            '7-2': 'roi-dashboard',
            '7-3': 'benchmark-analysis',
            '7-4': 'impact-reporting',
            '7-5': 'value-realization',
            '7-6': 'success-metrics'
        };
        
        const analysisType = subcomponentMap[subcomponentId] || 'quantifiable-impact';
        
        const dimensions = this.evaluateDimensions(worksheetData, analysisType);
        const overallScore = this.calculateOverallScore(dimensions);
        const recommendations = this.generateRecommendations(dimensions, analysisType);
        
        return {
            score: overallScore,
            detailedScores: dimensions,
            recommendations: recommendations,
            analysis: {
                executiveSummary: this.generateExecutiveSummary(overallScore, analysisType)
            },
            confidence: 0.89
        };
    }
    
    evaluateDimensions(data, type) {
        const dimensions = {
            metricDefinition: {
                score: 0,
                maxScore: 20,
                weight: 20,
                feedback: ''
            },
            dataAccuracy: {
                score: 0,
                maxScore: 20,
                weight: 20,
                feedback: ''
            },
            impactQuantification: {
                score: 0,
                maxScore: 20,
                weight: 20,
                feedback: ''
            },
            benchmarkComparison: {
                score: 0,
                maxScore: 20,
                weight: 20,
                feedback: ''
            },
            valueStoryTelling: {
                score: 0,
                maxScore: 20,
                weight: 20,
                feedback: ''
            }
        };
        
        Object.keys(dimensions).forEach(key => {
            const fieldData = Object.values(data).join(' ').toLowerCase();
            let score = 0;
            let feedback = [];
            
            switch(key) {
                case 'metricDefinition':
                    if (fieldData.includes('kpi') || fieldData.includes('metric')) score += 7;
                    if (fieldData.includes('measure') || fieldData.includes('track')) score += 7;
                    if (fieldData.includes('define') || fieldData.includes('standard')) score += 6;
                    
                    if (score >= 15) feedback.push('✓ Clear metrics defined');
                    if (score < 10) feedback.push('✗ Define specific KPIs');
                    break;
                    
                case 'dataAccuracy':
                    if (fieldData.includes('accurate') || fieldData.includes('precise')) score += 7;
                    if (fieldData.includes('validate') || fieldData.includes('verify')) score += 7;
                    if (fieldData.includes('audit') || fieldData.includes('quality')) score += 6;
                    
                    if (score >= 15) feedback.push('✓ High data accuracy');
                    if (score < 10) feedback.push('✗ Improve data quality');
                    break;
                    
                case 'impactQuantification':
                    if (fieldData.match(/\\d+%/) || fieldData.match(/\\$\\d+/)) score += 8;
                    if (fieldData.includes('impact') || fieldData.includes('outcome')) score += 6;
                    if (fieldData.includes('result') || fieldData.includes('achieve')) score += 6;
                    
                    if (score >= 15) feedback.push('✓ Impact well quantified');
                    if (score < 10) feedback.push('✗ Quantify specific impacts');
                    break;
                    
                case 'benchmarkComparison':
                    if (fieldData.includes('benchmark') || fieldData.includes('compare')) score += 7;
                    if (fieldData.includes('industry') || fieldData.includes('peer')) score += 7;
                    if (fieldData.includes('standard') || fieldData.includes('best')) score += 6;
                    
                    if (score >= 15) feedback.push('✓ Strong benchmarking');
                    if (score < 10) feedback.push('✗ Add benchmark comparisons');
                    break;
                    
                case 'valueStoryTelling':
                    if (fieldData.includes('story') || fieldData.includes('narrative')) score += 7;
                    if (fieldData.includes('communicate') || fieldData.includes('present')) score += 7;
                    if (fieldData.includes('visualize') || fieldData.includes('dashboard')) score += 6;
                    
                    if (score >= 15) feedback.push('✓ Compelling value story');
                    if (score < 10) feedback.push('✗ Improve value communication');
                    break;
            }
            
            dimensions[key].score = Math.min(score, 20);
            dimensions[key].percentage = Math.round((dimensions[key].score / 20) * 100);
            dimensions[key].feedback = feedback.join('\\n');
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
    
    generateRecommendations(dimensions, type) {
        const recommendations = [];
        
        Object.entries(dimensions).forEach(([key, dim]) => {
            if (dim.percentage < 60) {
                const improvement = dim.percentage < 30 ? 13 :
                                   dim.percentage < 50 ? 9 : 6;
                
                recommendations.push({
                    priority: dim.percentage < 30 ? 'CRITICAL' : 
                             dim.percentage < 50 ? 'HIGH' : 'MEDIUM',
                    area: key.replace(/([A-Z])/g, ' $1').trim(),
                    action: this.getActionForDimension(key),
                    expectedImprovement: \`+\${improvement} points\`,
                    impact: \`Strengthen quantifiable value demonstration\`
                });
            }
        });
        
        return recommendations.slice(0, 5);
    }
    
    getActionForDimension(key) {
        const actions = {
            metricDefinition: 'Define clear, measurable success KPIs',
            dataAccuracy: 'Implement data validation and quality controls',
            impactQuantification: 'Calculate specific ROI and impact metrics',
            benchmarkComparison: 'Conduct industry benchmark analysis',
            valueStoryTelling: 'Create compelling value realization dashboards'
        };
        return actions[key] || 'Improve impact measurement';
    }
    
    generateExecutiveSummary(score, type) {
        if (score >= 80) {
            return "Excellent quantifiable impact demonstration! Your metrics, benchmarks, and value storytelling are compelling. Focus on continuous improvement and expansion.";
        } else if (score >= 60) {
            return "Good progress on impact quantification. Strengthen ROI calculations and benchmark comparisons to build more compelling value demonstrations.";
        } else {
            return "Impact quantification needs significant work. Priority areas include defining clear metrics, improving data accuracy, and building value dashboards.";
        }
    }
}

module.exports = QuantifiableImpactAgent;
`;

// Block 8: Customer Success Expansion Agent
const customerSuccessAgent = `
${recommendationsLibraryPath}

class CustomerSuccessExpansionAgent {
    constructor() {
        this.name = 'Customer Success Expansion Agent';
        this.version = '2.0';
    }

    async analyzeWorksheet(worksheetData, subcomponentId) {
        console.log('🎯 Customer Success Expansion Agent analyzing:', subcomponentId);
        
        const subcomponentMap = {
            '8-1': 'expansion-playbook',
            '8-2': 'upsell-strategy',
            '8-3': 'renewal-management',
            '8-4': 'account-growth',
            '8-5': 'success-metrics',
            '8-6': 'retention-optimization'
        };
        
        const analysisType = subcomponentMap[subcomponentId] || 'customer-success';
        
        const dimensions = this.evaluateDimensions(worksheetData, analysisType);
        const overallScore = this.calculateOverallScore(dimensions);
        const recommendations = this.generateRecommendations(dimensions, analysisType);
        
        return {
            score: overallScore,
            detailedScores: dimensions,
            recommendations: recommendations,
            analysis: {
                executiveSummary: this.generateExecutiveSummary(overallScore, analysisType)
            },
            confidence: 0.88
        };
    }
    
    evaluateDimensions(data, type) {
        const dimensions = {
            expansionStrategy: {
                score: 0,
                maxScore: 20,
                weight: 20,
                feedback: ''
            },
            retentionMetrics: {
                score: 0,
                maxScore: 20,
                weight: 20,
                feedback: ''
            },
            upsellExecution: {
                score: 0,
                maxScore: 20,
                weight: 20,
                feedback: ''
            },
            customerHealth: {
                score: 0,
                maxScore: 20,
                weight: 20,
                feedback: ''
            },
            successPlaybooks: {
                score: 0,
                maxScore: 20,
                weight: 20,
                feedback: ''
            }
        };
        
        Object.keys(dimensions).forEach(key => {
            const fieldData = Object.values(data).join(' ').toLowerCase();
            let score = 0;
            let feedback = [];
            
            switch(key) {
                case 'expansionStrategy':
                    if (fieldData.includes('expansion') || fieldData.includes('grow')) score += 7;
                    if (fieldData.includes('strategy') || fieldData.includes('plan')) score += 7;
                    if (fieldData.includes('account') || fieldData.includes('customer')) score += 6;
                    
                    if (score >= 15) feedback.push('✓ Clear expansion strategy');
                    if (score < 10) feedback.push('✗ Develop expansion playbook');
                    break;
                    
                case 'retentionMetrics':
                    if (fieldData.includes('retention') || fieldData.includes('churn')) score += 7;
                    if (fieldData.includes('renewal') || fieldData.includes('retain')) score += 7;
                    if (fieldData.match(/\\d+%/)) score += 6;
                    
                    if (score >= 15) feedback.push('✓ Strong retention tracking');
                    if (score < 10) feedback.push('✗ Improve retention metrics');
                    break;
                    
                case 'upsellExecution':
                    if (fieldData.includes('upsell') || fieldData.includes('cross-sell')) score += 7;
                    if (fieldData.includes('revenue') || fieldData.includes('growth')) score += 7;
                    if (fieldData.includes('opportunity') || fieldData.includes('potential')) score += 6;
                    
                    if (score >= 15) feedback.push('✓ Effective upsell process');
                    if (score < 10) feedback.push('✗ Build upsell capabilities');
                    break;
                    
                case 'customerHealth':
                    if (fieldData.includes('health') || fieldData.includes('score')) score += 7;
                    if (fieldData.includes('risk') || fieldData.includes('monitor')) score += 7;
                    if (fieldData.includes('proactive') || fieldData.includes('prevent')) score += 6;
                    
                    if (score >= 15) feedback.push('✓ Proactive health monitoring');
                    if (score < 10) feedback.push('✗ Implement health scoring');
                    break;
                    
                case 'successPlaybooks':
                    if (fieldData.includes('playbook') || fieldData.includes('process')) score += 7;
                    if (fieldData.includes('onboard') || fieldData.includes('success')) score += 7;
                    if (fieldData.includes('milestone') || fieldData.includes('journey')) score += 6;
                    
                    if (score >= 15) feedback.push('✓ Comprehensive playbooks');
                    if (score < 10) feedback.push('✗ Create success playbooks');
                    break;
            }
            
            dimensions[key].score = Math.min(score, 20);
            dimensions[key].percentage = Math.round((dimensions[key].score / 20) * 100);
            dimensions[key].feedback = feedback.join('\\n');
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
    
    generateRecommendations(dimensions, type) {
        const recommendations = [];
        
        Object.entries(dimensions).forEach(([key, dim]) => {
            if (dim.percentage < 60) {
                const improvement = dim.percentage < 30 ? 12 :
                                   dim.percentage < 50 ? 8 : 5;
                
                recommendations.push({
                    priority: dim.percentage < 30 ? 'CRITICAL' : 
                             dim.percentage < 50 ? 'HIGH' : 'MEDIUM',
                    area: key.replace(/([A-Z])/g, ' $1').trim(),
                    action: this.getActionForDimension(key),
                    expectedImprovement: \`+\${improvement} points\`,
                    impact: \`Drive customer success and expansion revenue\`
                });
            }
        });
        
        return recommendations.slice(0, 5);
    }
    
    getActionForDimension(key) {
        const actions = {
            expansionStrategy: 'Build systematic account expansion playbook',
            retentionMetrics: 'Implement retention and churn analytics',
            upsellExecution: 'Create upsell/cross-sell opportunity framework',
            customerHealth: 'Deploy customer health scoring system',
            successPlaybooks: 'Develop comprehensive success playbooks'
        };
        return actions[key] || 'Improve customer success operations';
    }
    
    generateExecutiveSummary(score, type) {
        if (score >= 80) {
            return "Excellent customer success expansion engine! Your retention, upsell, and growth strategies are driving strong results. Focus on scaling best practices.";
        } else if (score >= 60) {
            return "Good customer success foundation. Strengthen expansion playbooks and health monitoring to drive higher retention and growth rates.";
        } else {
            return "Customer success expansion needs improvement. Priority areas include building expansion strategies, implementing health scoring, and creating success playbooks.";
        }
    }
}

module.exports = CustomerSuccessExpansionAgent;
`;

// Write all agent files
const agents = [
    { name: 'early-adopter-wins-agent.js', content: earlyAdopterAgent },
    { name: 'customer-engagement-flywheel-agent.js', content: customerEngagementAgent },
    { name: 'quantifiable-impact-agent.js', content: quantifiableImpactAgent },
    { name: 'customer-success-expansion-agent.js', content: customerSuccessAgent }
];

agents.forEach(agent => {
    fs.writeFileSync(path.join(__dirname, agent.name), agent.content);
    console.log(`✅ Created ${agent.name}`);
});

console.log('\n🎯 Now updating unified analysis handler to include Phase 2 agents...\n');

// Update unified analysis handler
const unifiedHandlerPath = path.join(__dirname, 'unified-analysis-handler.js');
let unifiedContent = fs.readFileSync(unifiedHandlerPath, 'utf8');

// Add Phase 2 endpoints
const phase2Endpoints = `
                } else if (subcomponentId.startsWith('5-')) {
                    // Block 5: Early Adopter Wins
                    apiEndpoint = '/api/analyze/early-adopter-wins';
                } else if (subcomponentId.startsWith('6-')) {
                    // Block 6: Customer Engagement Flywheel
                    apiEndpoint = '/api/analyze/customer-engagement';
                } else if (subcomponentId.startsWith('7-')) {
                    // Block 7: Quantifiable Impact
                    apiEndpoint = '/api/analyze/quantifiable-impact';
                } else if (subcomponentId.startsWith('8-')) {
                    // Block 8: Customer Success Expansion
                    apiEndpoint = '/api/analyze/customer-success';`;

// Insert before the final else statement
unifiedContent = unifiedContent.replace(
    '                } else {',
    phase2Endpoints + '\n                } else {'
);

// Add worksheet type mappings
const phase2Types = `
                } else if (subcomponentId.startsWith('5-')) {
                    worksheetType = 'early-adopter-wins';
                } else if (subcomponentId.startsWith('6-')) {
                    worksheetType = 'customer-engagement';
                } else if (subcomponentId.startsWith('7-')) {
                    worksheetType = 'quantifiable-impact';
                } else if (subcomponentId.startsWith('8-')) {
                    worksheetType = 'customer-success';`;

// Find the right place to insert
const insertPoint = unifiedContent.indexOf('                } else if (subcomponentId === \'3-6\') {');
if (insertPoint !== -1) {
    const endOfBlock = unifiedContent.indexOf('\n', unifiedContent.indexOf('decision-archive', insertPoint));
    unifiedContent = unifiedContent.slice(0, endOfBlock) + phase2Types + unifiedContent.slice(endOfBlock);
}

fs.writeFileSync(unifiedHandlerPath, unifiedContent);
console.log('✅ Updated unified-analysis-handler.js with Phase 2 endpoints');

console.log('\n✨ Phase 2 agents complete! All 4 blocks (5-8) now have:');
console.log('  - Enhanced agents with "+X points" format');
console.log('  - Priority badges (CRITICAL/HIGH/MEDIUM)');
console.log('  - Professional recommendations display');
console.log('  - No timeframes - companies work at their own pace');
console.log('\n🚀 Ready to test all Phase 2 blocks!');
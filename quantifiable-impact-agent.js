

const getRecommendations = require('./recommendations-library-dynamic-wrapper.js');


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
                    if (fieldData.match(/\d+%/) || fieldData.match(/\$\d+/)) score += 8;
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
            dimensions[key].feedback = feedback.join('\n');
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
                    expectedImprovement: `+${improvement} points`,
                    impact: `Strengthen quantifiable value demonstration`
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

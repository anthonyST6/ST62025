

const getRecommendations = require('./recommendations-library-dynamic-wrapper.js');


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
                    if (fieldData.match(/\d+%/)) score += 6;
                    
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
                const improvement = dim.percentage < 30 ? 12 :
                                   dim.percentage < 50 ? 8 : 5;
                
                recommendations.push({
                    priority: dim.percentage < 30 ? 'CRITICAL' : 
                             dim.percentage < 50 ? 'HIGH' : 'MEDIUM',
                    area: key.replace(/([A-Z])/g, ' $1').trim(),
                    action: this.getActionForDimension(key),
                    expectedImprovement: `+${improvement} points`,
                    impact: `Drive customer success and expansion revenue`
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

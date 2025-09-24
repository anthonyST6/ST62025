

const { generateDynamicRecommendations } = require('./recommendations-library-dynamic-wrapper.js');


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
                    if (fieldData.match(/\d+%/) || fieldData.match(/\$\d+/)) score += 8;
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
        
        // Always use dynamic recommendations with "+X points" format
        const dynamicRecs = generateDynamicRecommendations('early-adopter-wins', dimensions);
        
        // Ensure all recommendations have "+X points" format
        dynamicRecs.forEach(rec => {
            if (!rec.expectedImprovement || !rec.expectedImprovement.includes('points')) {
                const points = rec.priority === 'CRITICAL' ? 12 :
                              rec.priority === 'HIGH' ? 8 : 5;
                rec.expectedImprovement = `+${points} points`;
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
                    action: `Improve ${key.replace(/([A-Z])/g, ' $1').toLowerCase().trim()}`,
                    expectedImprovement: `+${improvement} points`,
                    impact: `Strengthen this critical dimension from ${dim.percentage}% to ${dim.percentage + improvement}%`
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

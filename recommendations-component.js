// Advanced Recommendations Component with Full Complexity
// Integrates with enhanced scoring engine for realistic, varied improvements

class RecommendationsComponent {
    constructor() {
        this.currentScore = 0;
        this.recommendations = [];
        this.detailedScores = {};
    }

    // Generate recommendations with realistic scoring based on enhanced agent
    generateRecommendations(analysisData) {
        this.currentScore = analysisData.score || 70;
        this.detailedScores = analysisData.detailedScores || {};
        
        const recommendations = [];
        
        // Analyze each dimension and create targeted recommendations
        const dimensions = this.analyzeDimensions();
        
        // Sort dimensions by improvement potential
        dimensions.sort((a, b) => b.improvementPotential - a.improvementPotential);
        
        // Generate recommendations for top opportunities
        dimensions.slice(0, 5).forEach((dim, index) => {
            const rec = this.createRecommendation(dim, index);
            recommendations.push(rec);
        });
        
        this.recommendations = recommendations;
        return recommendations;
    }
    
    analyzeDimensions() {
        const dimensionAnalysis = [];
        
        const dimensionConfig = {
            problemClarity: {
                name: 'Problem Clarity',
                maxScore: 20,
                description: 'How well the problem is defined and articulated',
                actions: {
                    low: 'Conduct deep customer discovery interviews',
                    medium: 'Refine problem statement with specific metrics',
                    high: 'Validate edge cases and expand scope'
                }
            },
            valueQuantification: {
                name: 'Value Quantification',
                maxScore: 20,
                description: 'ROI and business impact metrics',
                actions: {
                    low: 'Build ROI calculator and gather baseline metrics',
                    medium: 'Create detailed case studies with financial impact',
                    high: 'Develop predictive value models'
                }
            },
            marketUnderstanding: {
                name: 'Market Understanding',
                maxScore: 20,
                description: 'Competitive landscape and market dynamics',
                actions: {
                    low: 'Conduct comprehensive competitive analysis',
                    medium: 'Deep dive into market segments and TAM/SAM/SOM',
                    high: 'Identify blue ocean opportunities'
                }
            },
            customerEmpathy: {
                name: 'Customer Empathy',
                maxScore: 20,
                description: 'Understanding of customer needs and journey',
                actions: {
                    low: 'Create detailed personas and journey maps',
                    medium: 'Implement continuous feedback loops',
                    high: 'Build customer advisory board'
                }
            },
            solutionDifferentiation: {
                name: 'Solution Differentiation',
                maxScore: 20,
                description: 'Unique value proposition and competitive advantage',
                actions: {
                    low: 'Define core differentiators and moat',
                    medium: 'Develop unique positioning strategy',
                    high: 'Create category-defining narrative'
                }
            }
        };
        
        Object.keys(dimensionConfig).forEach(key => {
            const config = dimensionConfig[key];
            const currentScore = this.detailedScores[key]?.score || 
                               this.detailedScores[key] || 
                               Math.floor(Math.random() * 10 + 5);
            
            const scorePercentage = (currentScore / config.maxScore) * 100;
            const gap = config.maxScore - currentScore;
            
            // Calculate realistic improvement potential
            const improvementPotential = this.calculateImprovementPotential(
                currentScore, 
                config.maxScore, 
                scorePercentage
            );
            
            dimensionAnalysis.push({
                key,
                name: config.name,
                description: config.description,
                currentScore,
                maxScore: config.maxScore,
                scorePercentage,
                gap,
                improvementPotential,
                actions: config.actions
            });
        });
        
        return dimensionAnalysis;
    }
    
    calculateImprovementPotential(currentScore, maxScore, percentage) {
        const gap = maxScore - currentScore;
        
        // Diminishing returns formula
        if (percentage < 30) {
            // Low scores - high potential but requires significant effort
            return Math.min(gap * 0.7, 12);
        } else if (percentage < 50) {
            // Medium-low scores - good potential
            return Math.min(gap * 0.6, 10);
        } else if (percentage < 70) {
            // Medium-high scores - moderate potential
            return Math.min(gap * 0.5, 8);
        } else if (percentage < 85) {
            // High scores - limited potential
            return Math.min(gap * 0.4, 5);
        } else {
            // Very high scores - marginal gains only
            return Math.min(gap * 0.3, 3);
        }
    }
    
    createRecommendation(dimension, index) {
        const priorities = ['CRITICAL', 'HIGH', 'HIGH', 'MEDIUM', 'MEDIUM'];
        const priority = priorities[index] || 'MEDIUM';
        
        // Adjust improvement based on priority
        let improvement = dimension.improvementPotential;
        if (priority === 'CRITICAL') {
            improvement = Math.round(improvement * 1.2);
        } else if (priority === 'MEDIUM') {
            improvement = Math.round(improvement * 0.8);
        }
        
        // Ensure realistic bounds
        improvement = Math.max(2, Math.min(improvement, 15));
        
        // Determine action level based on current score
        const actionLevel = dimension.scorePercentage < 40 ? 'low' :
                           dimension.scorePercentage < 70 ? 'medium' : 'high';
        
        return {
            area: dimension.key,
            title: dimension.name,
            priority: priority,
            expectedImprovement: `+${improvement} points`,
            impact: `+${improvement} points`,
            currentScore: `${dimension.currentScore}/${dimension.maxScore}`,
            scorePercentage: Math.round(dimension.scorePercentage),
            effort: improvement > 8 ? 'High' : improvement > 5 ? 'Medium' : 'Low',
            action: dimension.actions[actionLevel],
            
            // Detailed implementation plan
            implementationPlan: this.generateImplementationPlan(dimension, improvement, actionLevel),
            
            // Success metrics
            successMetrics: this.generateSuccessMetrics(dimension, improvement),
            
            // Resources required
            resources: this.generateResourceRequirements(dimension, improvement),
            
            // Risk factors
            risks: this.generateRiskFactors(dimension, actionLevel),
            
            // Expected ROI
            roi: this.calculateROI(dimension, improvement)
        };
    }
    
    generateImplementationPlan(dimension, improvement, actionLevel) {
        const plans = {
            problemClarity: {
                low: [
                    'Schedule customer discovery interviews',
                    'Develop interview guide using Jobs-to-be-Done framework',
                    'Document pain points with specific quotes and context',
                    'Quantify problem frequency and severity metrics',
                    'Create problem statement canvas with validation data'
                ],
                medium: [
                    'Refine problem statement with quantified impact metrics',
                    'Segment problems by customer type and use case',
                    'Validate problem-solution fit with 10 customers',
                    'Document edge cases and boundary conditions',
                    'Create problem severity heat map'
                ],
                high: [
                    'Expand problem scope to adjacent use cases',
                    'Build predictive model for problem occurrence',
                    'Create problem taxonomy and classification system',
                    'Develop problem scoring methodology'
                ]
            },
            valueQuantification: {
                low: [
                    'Interview customers about current costs and inefficiencies',
                    'Build basic ROI calculator with key variables',
                    'Document time and money saved per use case',
                    'Create value proposition canvas',
                    'Gather competitive pricing benchmarks'
                ],
                medium: [
                    'Develop detailed case studies with financial metrics',
                    'Build interactive ROI calculator for sales team',
                    'Create value realization roadmap',
                    'Document indirect benefits and soft costs',
                    'Validate pricing model with customers'
                ],
                high: [
                    'Create predictive value models by segment',
                    'Build total economic impact framework',
                    'Develop value engineering methodology',
                    'Create executive business case templates'
                ]
            },
            marketUnderstanding: {
                low: [
                    'Analyze top 5 direct competitors in detail',
                    'Calculate TAM, SAM, and SOM with sources',
                    'Map competitive positioning and gaps',
                    'Identify market trends and drivers',
                    'Document barriers to entry and moats'
                ],
                medium: [
                    'Conduct win/loss analysis for 20 deals',
                    'Deep dive into customer segments and ICPs',
                    'Analyze indirect and alternative solutions',
                    'Map ecosystem and partnership opportunities',
                    'Create competitive battle cards'
                ],
                high: [
                    'Identify blue ocean opportunities',
                    'Develop market disruption strategy',
                    'Create category definition playbook',
                    'Build competitive intelligence system'
                ]
            },
            customerEmpathy: {
                low: [
                    'Create 3-5 detailed persona profiles',
                    'Map complete customer journey with touchpoints',
                    'Document jobs, pains, and gains for each persona',
                    'Identify key moments of truth',
                    'Build empathy maps for each segment'
                ],
                medium: [
                    'Implement customer feedback loops',
                    'Create voice of customer program',
                    'Develop customer health scoring',
                    'Build customer journey optimization plan',
                    'Create persona validation framework'
                ],
                high: [
                    'Establish customer advisory board',
                    'Implement continuous discovery process',
                    'Create customer co-creation program',
                    'Build predictive customer success models'
                ]
            },
            solutionDifferentiation: {
                low: [
                    'Define 3 core differentiators with evidence',
                    'Create unique value proposition statement',
                    'Document competitive advantages and moats',
                    'Develop positioning strategy',
                    'Create differentiation messaging framework'
                ],
                medium: [
                    'Build competitive feature matrix',
                    'Develop unique point of view and narrative',
                    'Create differentiation proof points',
                    'Build competitive displacement strategy',
                    'Develop category positioning'
                ],
                high: [
                    'Create category-defining narrative',
                    'Build thought leadership platform',
                    'Develop ecosystem strategy',
                    'Create network effects plan'
                ]
            }
        };
        
        return plans[dimension.key]?.[actionLevel] || [
            'Conduct initial assessment',
            'Gather baseline data',
            'Develop improvement plan',
            'Implement changes',
            'Measure and iterate'
        ];
    }
    
    generateSuccessMetrics(dimension, improvement) {
        const baseMetrics = [
            `Score improvement of ${improvement}+ points`,
            `${dimension.name} score reaches ${Math.min(dimension.currentScore + improvement, dimension.maxScore)}/${dimension.maxScore}`,
            `Completion of all implementation tasks`
        ];
        
        const dimensionMetrics = {
            problemClarity: [
                '20+ customer interviews completed',
                'Problem statement validated by 80% of customers',
                'Problem impact quantified in time and money'
            ],
            valueQuantification: [
                'ROI calculator validated by finance team',
                '3+ case studies with verified metrics',
                'Value proposition resonates with 75% of prospects'
            ],
            marketUnderstanding: [
                'Competitive analysis covers 5+ competitors',
                'TAM/SAM/SOM validated by 3 sources',
                'Win rate improves by 20%'
            ],
            customerEmpathy: [
                '3-5 validated persona profiles created',
                'Customer journey mapped end-to-end',
                'NPS score improves by 10 points'
            ],
            solutionDifferentiation: [
                '3 unique differentiators validated',
                'Positioning tested with 20+ customers',
                'Competitive win rate increases 25%'
            ]
        };
        
        return [...baseMetrics, ...(dimensionMetrics[dimension.key] || [])];
    }
    
    generateResourceRequirements(dimension, improvement) {
        const effortHours = improvement > 8 ? 60 : improvement > 5 ? 40 : 20;
        
        const resources = {
            problemClarity: [
                `Product Manager: ${effortHours} hours`,
                'UX Researcher: 20 hours',
                'Customer Success: 10 hours',
                'Interview incentives: $500'
            ],
            valueQuantification: [
                `Product Manager: ${effortHours} hours`,
                'Data Analyst: 30 hours',
                'Finance Partner: 10 hours',
                'Customer Success: 15 hours'
            ],
            marketUnderstanding: [
                `Product Marketing: ${effortHours} hours`,
                'Competitive Intelligence: 20 hours',
                'Sales Leadership: 10 hours',
                'Market research tools: $500/month'
            ],
            customerEmpathy: [
                `UX Researcher: ${effortHours} hours`,
                'Product Manager: 20 hours',
                'Customer Success: 15 hours',
                'Research incentives: $750'
            ],
            solutionDifferentiation: [
                `Product Marketing: ${effortHours} hours`,
                'Product Manager: 20 hours',
                'Sales Engineering: 15 hours',
                'Messaging testing: $500'
            ]
        };
        
        return resources[dimension.key] || [
            `Project Lead: ${effortHours} hours`,
            'Subject Matter Expert: 10 hours',
            'Budget: $500'
        ];
    }
    
    generateRiskFactors(dimension, actionLevel) {
        const commonRisks = [
            'Resource constraints may delay implementation',
            'Stakeholder alignment required for success',
            'Market conditions may change during execution'
        ];
        
        const specificRisks = {
            low: [
                'Lack of baseline data may affect measurements',
                'Initial learning curve may slow progress'
            ],
            medium: [
                'Dependencies on other initiatives',
                'Change management challenges'
            ],
            high: [
                'Diminishing returns at high maturity',
                'Complexity may increase execution risk'
            ]
        };
        
        return [...commonRisks, ...(specificRisks[actionLevel] || [])];
    }
    
    calculateROI(dimension, improvement) {
        // Simplified ROI calculation based on improvement size
        const baseValue = improvement * 10000; // $10K per point improvement
        const multipliers = {
            problemClarity: 1.5,      // High impact on everything else
            valueQuantification: 2.0,  // Direct revenue impact
            marketUnderstanding: 1.8,  // Win rate improvement
            customerEmpathy: 1.3,      // Retention and satisfaction
            solutionDifferentiation: 1.7  // Competitive advantage
        };
        
        const multiplier = multipliers[dimension.key] || 1.0;
        const estimatedValue = Math.round(baseValue * multiplier);
        
        return `Estimated value: $${estimatedValue.toLocaleString()} in improved efficiency, higher win rates, and accelerated growth`;
    }
    
    // Render recommendations in a clean, organized format
    renderRecommendations(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const html = `
            <div class="recommendations-container">
                <div class="recommendations-header">
                    <h2 style="color: #FF5500; font-size: 28px; margin-bottom: 10px;">
                        📊 Strategic Recommendations
                    </h2>
                    <p style="color: #999; font-size: 14px; margin-bottom: 20px;">
                        Click any recommendation for detailed implementation guidance
                    </p>
                </div>
                
                <div class="recommendations-grid">
                    ${this.recommendations.map((rec, index) => this.renderRecommendationCard(rec, index)).join('')}
                </div>
                
                <div class="recommendations-summary" style="margin-top: 30px; padding: 20px; background: rgba(255, 85, 0, 0.05); border-radius: 12px; border: 1px solid rgba(255, 85, 0, 0.2);">
                    <h3 style="color: #FF5500; margin-bottom: 15px;">Implementation Summary</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                        <div>
                            <div style="color: #999; font-size: 12px; text-transform: uppercase; margin-bottom: 5px;">Total Improvement Potential</div>
                            <div style="color: #4CAF50; font-size: 24px; font-weight: 700;">
                                +${this.recommendations.reduce((sum, rec) => {
                                    const match = rec.expectedImprovement ? rec.expectedImprovement.toString().match(/\d+/) : null;
                                    return sum + (match ? parseInt(match[0]) : 0);
                                }, 0)} points
                            </div>
                        </div>
                        <div>
                            <div style="color: #999; font-size: 12px; text-transform: uppercase; margin-bottom: 5px;">Priority Actions</div>
                            <div style="color: #FF5500; font-size: 24px; font-weight: 700;">
                                ${this.recommendations.filter(r => r.priority === 'CRITICAL' || r.priority === 'HIGH').length} critical
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
        
        // Add click handlers for detailed views
        this.attachEventHandlers();
    }
    
    renderRecommendationCard(rec, index) {
        const priorityColors = {
            CRITICAL: '#8B0000',
            HIGH: '#F44336',
            MEDIUM: '#FF9800'
        };
        
        return `
            <div class="recommendation-card" data-index="${index}" style="
                background: rgba(0, 0, 0, 0.5);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                padding: 20px;
                margin-bottom: 15px;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
            " onmouseover="this.style.borderColor='#FF5500'; this.style.transform='translateX(5px)'" 
               onmouseout="this.style.borderColor='rgba(255, 255, 255, 0.1)'; this.style.transform='translateX(0)'">
                
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                    <h3 style="color: #fff; font-size: 18px; font-weight: 600; margin: 0;">
                        ${rec.title}
                    </h3>
                    <span style="
                        background: ${priorityColors[rec.priority]};
                        color: #fff;
                        padding: 4px 12px;
                        border-radius: 20px;
                        font-size: 11px;
                        font-weight: 700;
                        text-transform: uppercase;
                    ">${rec.priority}</span>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 15px;">
                    <div>
                        <div style="color: #999; font-size: 11px; text-transform: uppercase; margin-bottom: 3px;">Expected Impact</div>
                        <div style="color: #4CAF50; font-size: 16px; font-weight: 600;">${rec.expectedImprovement}</div>
                    </div>
                    <div>
                        <div style="color: #999; font-size: 11px; text-transform: uppercase; margin-bottom: 3px;">Current Score</div>
                        <div style="color: #FF9800; font-size: 16px; font-weight: 600;">${rec.currentScore}</div>
                    </div>
                </div>
                
                <div style="color: #ccc; font-size: 14px; line-height: 1.6; margin-bottom: 10px;">
                    ${rec.action}
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; gap: 10px;">
                        <span style="
                            background: rgba(255, 255, 255, 0.1);
                            padding: 4px 10px;
                            border-radius: 15px;
                            font-size: 12px;
                            color: #999;
                        ">⏱️ ${rec.effort} effort</span>
                        <span style="
                            background: rgba(255, 255, 255, 0.1);
                            padding: 4px 10px;
                            border-radius: 15px;
                            font-size: 12px;
                            color: #999;
                        ">📈 ${rec.scorePercentage}% complete</span>
                    </div>
                    <span style="color: #666; font-size: 12px;">
                        Click for details →
                    </span>
                </div>
            </div>
        `;
    }
    
    attachEventHandlers() {
        document.querySelectorAll('.recommendation-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const index = parseInt(card.dataset.index);
                const rec = this.recommendations[index];
                if (rec) {
                    this.showDetailedRecommendation(rec);
                }
            });
        });
    }
    
    showDetailedRecommendation(rec) {
        // This would show a detailed popup with full implementation plan
        // For now, log the details
        console.log('Detailed Recommendation:', rec);
        
        // You can integrate this with your existing popup system
        if (window.showRecommendationPopup) {
            window.showRecommendationPopup(rec);
        } else {
            alert(`${rec.title}\n\nExpected Improvement: ${rec.expectedImprovement}\n\nImplementation Plan:\n${rec.implementationPlan.join('\n• ')}`);
        }
    }
}

// Make it globally available
window.RecommendationsComponent = RecommendationsComponent;

// Auto-initialize if on the right page
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.recommendationsComponent = new RecommendationsComponent();
    });
} else {
    window.recommendationsComponent = new RecommendationsComponent();
}
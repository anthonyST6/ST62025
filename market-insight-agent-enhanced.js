// Market Insight Analysis Agent - Evaluates market understanding, trends, and opportunities
class MarketInsightAgent {
    constructor() {
        this.evaluationDimensions = {
            marketSizing: {
                weight: 0.25,
                criteria: [
                    'TAM/SAM/SOM clearly defined',
                    'Market size quantified with data',
                    'Growth rates documented',
                    'Addressable segments identified',
                    'Market penetration strategy'
                ]
            },
            competitiveLandscape: {
                weight: 0.20,
                criteria: [
                    'Direct competitors identified',
                    'Indirect alternatives mapped',
                    'Competitive positioning clear',
                    'Differentiation articulated',
                    'Market gaps identified'
                ]
            },
            trendAnalysis: {
                weight: 0.20,
                criteria: [
                    'Macro trends identified',
                    'Technology shifts recognized',
                    'Regulatory changes tracked',
                    'Customer behavior evolution',
                    'Future market direction'
                ]
            },
            customerSegmentation: {
                weight: 0.20,
                criteria: [
                    'Target segments defined',
                    'Segment sizes quantified',
                    'Buying behaviors understood',
                    'Decision criteria mapped',
                    'Segment prioritization'
                ]
            },
            goToMarketStrategy: {
                weight: 0.15,
                criteria: [
                    'Distribution channels identified',
                    'Pricing strategy defined',
                    'Sales motion articulated',
                    'Partnership opportunities',
                    'Market entry approach'
                ]
            }
        };
    }

    parseWorksheetData(data) {
        // Support both field1 and field-1 formats
        const fields = {};
        for (let i = 1; i <= 6; i++) {
            fields[`field${i}`] = data[`field${i}`] || data[`field-${i}`] || '';
        }
        
        return {
            marketSize: fields.field1,
            competitors: fields.field2,
            trends: fields.field3,
            segments: fields.field4,
            gtmStrategy: fields.field5,
            opportunities: fields.field6
        };
    }

    evaluateDimension(dimension, parsedData) {
        const scores = {
            marketSizing: this.evaluateMarketSizing(parsedData),
            competitiveLandscape: this.evaluateCompetitiveLandscape(parsedData),
            trendAnalysis: this.evaluateTrendAnalysis(parsedData),
            customerSegmentation: this.evaluateCustomerSegmentation(parsedData),
            goToMarketStrategy: this.evaluateGoToMarketStrategy(parsedData)
        };
        
        return scores[dimension] || 0;
    }

    evaluateMarketSizing(data) {
        let score = 0;
        
        // Check for TAM/SAM/SOM mentions
        if (data.marketSize.includes('TAM') || data.marketSize.includes('SAM') || data.marketSize.includes('SOM')) {
            score += 30;
        }
        
        // Check for specific dollar amounts
        if (data.marketSize.includes('$') && data.marketSize.match(/\d+[BMK]/)) {
            score += 25;
        }
        
        // Growth rate mentioned
        if (data.marketSize.includes('%') || data.marketSize.includes('growth') || data.marketSize.includes('CAGR')) {
            score += 20;
        }
        
        // Multiple market segments
        if (data.segments.split(',').length >= 3) {
            score += 15;
        }
        
        // Sources cited
        if (data.marketSize.includes('Gartner') || data.marketSize.includes('Forrester') || data.marketSize.includes('IDC') || data.marketSize.includes('McKinsey')) {
            score += 10;
        }
        
        return Math.min(score, 100);
    }

    evaluateCompetitiveLandscape(data) {
        let score = 0;
        
        // Multiple competitors named
        const competitorCount = (data.competitors.match(/[A-Z][a-z]+/g) || []).length;
        if (competitorCount >= 3) {
            score += 25;
        }
        
        // Competitive analysis depth
        if (data.competitors.includes('strengths') || data.competitors.includes('weaknesses') || data.competitors.includes('positioning')) {
            score += 25;
        }
        
        // Market share or funding mentioned
        if (data.competitors.includes('$') || data.competitors.includes('%') || data.competitors.includes('Series')) {
            score += 20;
        }
        
        // Differentiation articulated
        if (data.competitors.includes('unlike') || data.competitors.includes('different') || data.competitors.includes('unique')) {
            score += 20;
        }
        
        // Indirect competition considered
        if (data.competitors.includes('alternative') || data.competitors.includes('substitute') || data.competitors.includes('indirect')) {
            score += 10;
        }
        
        return Math.min(score, 100);
    }

    evaluateTrendAnalysis(data) {
        let score = 0;
        
        // Multiple trends identified
        const trendKeywords = ['AI', 'automation', 'remote', 'digital', 'cloud', 'SaaS', 'mobile', 'data'];
        const foundTrends = trendKeywords.filter(keyword => 
            data.trends.toLowerCase().includes(keyword.toLowerCase())
        );
        if (foundTrends.length >= 2) {
            score += 30;
        }
        
        // Timing mentioned ("why now")
        if (data.trends.includes('now') || data.trends.includes('2024') || data.trends.includes('2025') || data.trends.includes('recent')) {
            score += 25;
        }
        
        // Market shifts identified
        if (data.trends.includes('shift') || data.trends.includes('change') || data.trends.includes('transformation') || data.trends.includes('disruption')) {
            score += 20;
        }
        
        // Data or statistics cited
        if (data.trends.includes('%') || data.trends.match(/\d+/)) {
            score += 15;
        }
        
        // Future outlook
        if (data.trends.includes('future') || data.trends.includes('next') || data.trends.includes('emerging')) {
            score += 10;
        }
        
        return Math.min(score, 100);
    }

    evaluateCustomerSegmentation(data) {
        let score = 0;
        
        // Multiple segments identified
        const segmentCount = data.segments.split(/[,;]/).filter(s => s.trim().length > 10).length;
        if (segmentCount >= 3) {
            score += 30;
        }
        
        // Segment size quantified
        if (data.segments.includes('$') || data.segments.includes('%') || data.segments.match(/\d+[KMB]/)) {
            score += 25;
        }
        
        // Specific industries or verticals
        const industries = ['healthcare', 'finance', 'retail', 'manufacturing', 'technology', 'education'];
        const hasIndustries = industries.some(ind => 
            data.segments.toLowerCase().includes(ind)
        );
        if (hasIndustries) {
            score += 20;
        }
        
        // Company size mentioned
        if (data.segments.includes('enterprise') || data.segments.includes('SMB') || data.segments.includes('mid-market') || data.segments.includes('startup')) {
            score += 15;
        }
        
        // Prioritization mentioned
        if (data.segments.includes('primary') || data.segments.includes('secondary') || data.segments.includes('focus') || data.segments.includes('priority')) {
            score += 10;
        }
        
        return Math.min(score, 100);
    }

    evaluateGoToMarketStrategy(data) {
        let score = 0;
        
        // Sales motion defined
        if (data.gtmStrategy.includes('direct') || data.gtmStrategy.includes('channel') || data.gtmStrategy.includes('PLG') || data.gtmStrategy.includes('enterprise')) {
            score += 25;
        }
        
        // Pricing strategy mentioned
        if (data.gtmStrategy.includes('pricing') || data.gtmStrategy.includes('$') || data.gtmStrategy.includes('per') || data.gtmStrategy.includes('subscription')) {
            score += 20;
        }
        
        // Distribution channels
        if (data.gtmStrategy.includes('partner') || data.gtmStrategy.includes('marketplace') || data.gtmStrategy.includes('reseller') || data.gtmStrategy.includes('direct')) {
            score += 20;
        }
        
        // Customer acquisition strategy
        if (data.gtmStrategy.includes('inbound') || data.gtmStrategy.includes('outbound') || data.gtmStrategy.includes('marketing') || data.gtmStrategy.includes('sales')) {
            score += 20;
        }
        
        // Timeline or phases
        if (data.gtmStrategy.includes('phase') || data.gtmStrategy.includes('month') || data.gtmStrategy.includes('quarter') || data.gtmStrategy.includes('year')) {
            score += 15;
        }
        
        return Math.min(score, 100);
    }

    generateDimensionFeedback(dimension, score, parsedData) {
        const feedback = {
            marketSizing: this.generateMarketSizingFeedback(score, parsedData),
            competitiveLandscape: this.generateCompetitiveLandscapeFeedback(score, parsedData),
            trendAnalysis: this.generateTrendAnalysisFeedback(score, parsedData),
            customerSegmentation: this.generateCustomerSegmentationFeedback(score, parsedData),
            goToMarketStrategy: this.generateGoToMarketStrategyFeedback(score, parsedData)
        };
        
        return feedback[dimension] || { strengths: [], improvements: [] };
    }

    generateMarketSizingFeedback(score, data) {
        const strengths = [];
        const improvements = [];
        
        if (data.marketSize.includes('TAM') || data.marketSize.includes('SAM')) {
            strengths.push("TAM/SAM/SOM framework applied");
        } else {
            improvements.push("Define TAM, SAM, and SOM clearly");
        }
        
        if (data.marketSize.includes('$')) {
            strengths.push("Market size quantified in dollars");
        } else {
            improvements.push("Add specific market size figures");
        }
        
        if (data.marketSize.includes('growth') || data.marketSize.includes('CAGR')) {
            strengths.push("Growth rates documented");
        } else {
            improvements.push("Include market growth rates and CAGR");
        }
        
        // Ensure we always have at least one item in each category
        if (strengths.length === 0) {
            strengths.push("Market analysis initiated");
        }
        if (improvements.length === 0) {
            improvements.push("Continue refining market sizing");
        }
        
        return { strengths, improvements };
    }

    generateCompetitiveLandscapeFeedback(score, data) {
        const strengths = [];
        const improvements = [];
        
        const competitorCount = (data.competitors.match(/[A-Z][a-z]+/g) || []).length;
        if (competitorCount >= 3) {
            strengths.push("Multiple competitors identified");
        } else {
            improvements.push("Identify at least 5 direct competitors");
        }
        
        if (data.competitors.includes('strengths') || data.competitors.includes('weaknesses')) {
            strengths.push("Competitive analysis includes strengths/weaknesses");
        } else {
            improvements.push("Analyze competitor strengths and weaknesses");
        }
        
        if (data.competitors.includes('different') || data.competitors.includes('unique')) {
            strengths.push("Differentiation articulated");
        } else {
            improvements.push("Clarify your unique differentiation");
        }
        
        // Ensure we always have at least one item in each category
        if (strengths.length === 0) {
            strengths.push("Competitive awareness demonstrated");
        }
        if (improvements.length === 0) {
            improvements.push("Deepen competitive analysis");
        }
        
        return { strengths, improvements };
    }

    generateTrendAnalysisFeedback(score, data) {
        const strengths = [];
        const improvements = [];
        
        if (data.trends.includes('AI') || data.trends.includes('automation') || data.trends.includes('digital')) {
            strengths.push("Key technology trends identified");
        } else {
            improvements.push("Identify relevant technology and market trends");
        }
        
        if (data.trends.includes('shift') || data.trends.includes('transformation')) {
            strengths.push("Market shifts recognized");
        } else {
            improvements.push("Analyze market shifts and disruptions");
        }
        
        if (data.trends.includes('2024') || data.trends.includes('2025') || data.trends.includes('now')) {
            strengths.push("'Why now' timing addressed");
        } else {
            improvements.push("Explain why this is the right time");
        }
        
        // Ensure we always have at least one item in each category
        if (strengths.length === 0) {
            strengths.push("Trend awareness shown");
        }
        if (improvements.length === 0) {
            improvements.push("Expand trend analysis");
        }
        
        return { strengths, improvements };
    }

    generateCustomerSegmentationFeedback(score, data) {
        const strengths = [];
        const improvements = [];
        
        const segmentCount = data.segments.split(/[,;]/).filter(s => s.trim().length > 10).length;
        if (segmentCount >= 3) {
            strengths.push("Multiple customer segments defined");
        } else {
            improvements.push("Define at least 3 distinct segments");
        }
        
        if (data.segments.includes('$') || data.segments.match(/\d+[KMB]/)) {
            strengths.push("Segment sizes quantified");
        } else {
            improvements.push("Quantify segment sizes and value");
        }
        
        if (data.segments.includes('enterprise') || data.segments.includes('SMB')) {
            strengths.push("Company size segments identified");
        } else {
            improvements.push("Specify target company sizes");
        }
        
        // Ensure we always have at least one item in each category
        if (strengths.length === 0) {
            strengths.push("Initial segmentation completed");
        }
        if (improvements.length === 0) {
            improvements.push("Refine segment definitions");
        }
        
        return { strengths, improvements };
    }

    generateGoToMarketStrategyFeedback(score, data) {
        const strengths = [];
        const improvements = [];
        
        if (data.gtmStrategy.includes('direct') || data.gtmStrategy.includes('PLG')) {
            strengths.push("Sales motion defined");
        } else {
            improvements.push("Define your primary sales motion");
        }
        
        if (data.gtmStrategy.includes('pricing') || data.gtmStrategy.includes('$')) {
            strengths.push("Pricing strategy mentioned");
        } else {
            improvements.push("Develop pricing strategy");
        }
        
        if (data.gtmStrategy.includes('partner') || data.gtmStrategy.includes('channel')) {
            strengths.push("Distribution channels identified");
        } else {
            improvements.push("Map distribution channels");
        }
        
        // Ensure we always have at least one item in each category
        if (strengths.length === 0) {
            strengths.push("GTM thinking initiated");
        }
        if (improvements.length === 0) {
            improvements.push("Develop comprehensive GTM plan");
        }
        
        return { strengths, improvements };
    }

    generateRecommendations(scores, parsedData) {
        const recommendations = [];
        const avgScore = Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length;
        
        // Priority recommendations based on lowest scores
        const sortedDimensions = Object.entries(scores).sort((a, b) => a[1] - b[1]);
        
        let priorityIndex = 0;
        for (const [dimension, score] of sortedDimensions.slice(0, 3)) {
            if (score < 70) {
                const priority = priorityIndex === 0 ? 'CRITICAL' : priorityIndex === 1 ? 'HIGH' : 'MEDIUM';
                priorityIndex++;
                
                switch(dimension) {
                    case 'marketSizing':
                        recommendations.push({
                            priority: priority,
                            area: 'Market Sizing',
                            action: 'Conduct thorough TAM/SAM/SOM analysis',
                            impact: '+15 points',
                            expectedImprovement: 15,
                            actionPlan: [
                                'Calculate Total Addressable Market (TAM) using top-down approach',
                                'Define Serviceable Addressable Market (SAM) based on your capabilities',
                                'Estimate Serviceable Obtainable Market (SOM) for next 3 years',
                                'Cite credible sources (Gartner, Forrester, IDC) for all figures'
                            ],
                            recommendations: [
                                'Use bottom-up TAM calculation: # of customers × average deal size',
                                'Interview 10 industry experts to validate market size',
                                'Research 3 analyst reports for market data',
                                'Calculate your realistic market share for years 1-3'
                            ],
                            successMetrics: [
                                'TAM/SAM/SOM documented with sources',
                                'Market size validated by 3+ sources',
                                'Growth projections for 3 years'
                            ]
                        });
                        break;
                    case 'competitiveLandscape':
                        recommendations.push({
                            priority: priority,
                            area: 'Competitive Analysis',
                            action: 'Create comprehensive competitive matrix',
                            impact: '+12 points',
                            expectedImprovement: 12,
                            actionPlan: [
                                'Identify 10+ direct and indirect competitors',
                                'Analyze their pricing, features, and market positioning',
                                'Document your unique differentiation points',
                                'Map competitive gaps you can exploit'
                            ],
                            recommendations: [
                                'Sign up for competitor products to understand their offering',
                                'Interview 5 customers who chose competitors',
                                'Create feature comparison matrix',
                                'Document your 10x advantage, not 10% improvement'
                            ],
                            successMetrics: [
                                '10+ competitors analyzed',
                                'Differentiation clearly defined',
                                'Competitive gaps identified'
                            ]
                        });
                        break;
                    case 'trendAnalysis':
                        recommendations.push({
                            priority: priority,
                            area: 'Trend Analysis',
                            action: 'Document market trends and timing',
                            impact: '+10 points',
                            expectedImprovement: 10,
                            actionPlan: [
                                'Research 5 macro trends supporting your thesis',
                                'Quantify the impact of each trend with data',
                                'Explain why now is the right time to enter',
                                'Project how trends will evolve over next 5 years'
                            ],
                            recommendations: [
                                'Read 5 industry reports from last 6 months',
                                'Interview 10 customers about changing needs',
                                'Document 3 technology shifts enabling your solution',
                                'Create "why now" slide with compelling evidence'
                            ],
                            successMetrics: [
                                '5+ trends documented with data',
                                'Why now clearly articulated',
                                'Future projections mapped'
                            ]
                        });
                        break;
                    case 'customerSegmentation':
                        recommendations.push({
                            priority: priority,
                            area: 'Customer Segmentation',
                            action: 'Define and prioritize target segments',
                            impact: '+11 points',
                            expectedImprovement: 11,
                            actionPlan: [
                                'Define your top 3 target customer segments',
                                'Quantify the size and value of each segment',
                                'Map buying behaviors and decision criteria',
                                'Create segment-specific value propositions'
                            ],
                            recommendations: [
                                'Interview 5 customers from each segment',
                                'Calculate LTV and CAC for each segment',
                                'Identify the segment with shortest sales cycle',
                                'Create ICP document for primary segment'
                            ],
                            successMetrics: [
                                '3 segments clearly defined',
                                'Segment sizes quantified',
                                'Value props for each segment'
                            ]
                        });
                        break;
                    case 'goToMarketStrategy':
                        recommendations.push({
                            priority: priority,
                            area: 'GTM Strategy',
                            action: 'Develop comprehensive go-to-market plan',
                            impact: '+13 points',
                            expectedImprovement: 13,
                            actionPlan: [
                                'Define primary sales motion (PLG, enterprise, hybrid)',
                                'Document pricing strategy and model',
                                'Map distribution channels and partnerships',
                                'Create customer acquisition cost model'
                            ],
                            recommendations: [
                                'Test pricing with 20 potential customers',
                                'Define sales process with clear stages',
                                'Calculate unit economics and payback period',
                                'Create GTM playbook for first 100 customers'
                            ],
                            successMetrics: [
                                'GTM motion defined',
                                'Pricing strategy set',
                                'CAC/LTV model created'
                            ]
                        });
                        break;
                }
            }
        }
        
        // Add strategic recommendation if score is good
        if (avgScore >= 70 && recommendations.length < 3) {
            const priority = recommendations.length === 0 ? 'CRITICAL' : recommendations.length === 1 ? 'HIGH' : 'MEDIUM';
            recommendations.push({
                priority: priority,
                area: 'Market Validation',
                action: 'Validate insights with industry experts',
                impact: '+8 points',
                expectedImprovement: 8,
                actionPlan: [
                    'Interview 10+ industry experts and potential customers',
                    'Test your market assumptions with primary research',
                    'Refine TAM/SAM/SOM based on feedback',
                    'Document key learnings and pivot points'
                ],
                recommendations: [
                    'Schedule 10 expert interviews this month',
                    'Create validation survey for 100 prospects',
                    'Test willingness to pay with pricing survey',
                    'Document all assumptions and validation results'
                ],
                successMetrics: [
                    '10+ expert interviews completed',
                    'Market assumptions validated',
                    'TAM/SAM/SOM refined'
                ]
            });
        }
        
        // Ensure we always have at least one recommendation
        if (recommendations.length === 0) {
            // If all scores are high, provide optimization recommendations
            const lowestDimension = sortedDimensions[0];
            recommendations.push({
                priority: 'MEDIUM',
                area: 'Market Excellence',
                action: 'Maintain and optimize market insights',
                impact: '+5 points',
                expectedImprovement: 5,
                actionPlan: [
                    'Update market sizing quarterly with latest data',
                    'Monitor competitive moves and new entrants',
                    'Track emerging trends and technology shifts',
                    'Refine customer segmentation based on learnings',
                    'Optimize GTM strategy based on market feedback'
                ],
                recommendations: [
                    'Set up Google Alerts for competitors',
                    'Subscribe to industry newsletters',
                    'Join relevant industry associations',
                    'Attend quarterly industry events'
                ],
                successMetrics: [
                    'Quarterly market updates',
                    'Competitive intelligence current',
                    'GTM strategy optimized'
                ]
            });
        }
        
        return recommendations.slice(0, 3);
    }

    analyzeWorksheet(worksheetData) {
        console.log('📊 Market Insight Agent: Starting analysis...');
        
        const parsedData = this.parseWorksheetData(worksheetData);
        console.log('📋 Parsed market insight data');
        
        const scores = {};
        const feedback = {};
        
        // Evaluate each dimension
        for (const dimension in this.evaluationDimensions) {
            scores[dimension] = this.evaluateDimension(dimension, parsedData);
            feedback[dimension] = this.generateDimensionFeedback(dimension, scores[dimension], parsedData);
            console.log(`📊 ${dimension}: ${scores[dimension]}%`);
        }
        
        // Calculate overall score
        let overallScore = 0;
        for (const dimension in scores) {
            overallScore += scores[dimension] * this.evaluationDimensions[dimension].weight;
        }
        
        // Generate recommendations
        const recommendations = this.generateRecommendations(scores, parsedData);
        
        // Determine improvement from baseline
        const baselineScore = 20; // Assume starting from basic market understanding
        const improvement = Math.max(0, overallScore - baselineScore);
        
        console.log(`✅ Market Insight Analysis complete: ${Math.round(overallScore)}%`);
        
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
        
        // Recommendations are already in the correct format
        const formattedRecommendations = recommendations;
        
        return {
            score: Math.round(overallScore),
            detailedScores: detailedScores,
            recommendations: formattedRecommendations,
            analysis: {
                executiveSummary: this.generateSummary(overallScore, scores, parsedData),
                strengths: this.extractAllStrengths(feedback),
                weaknesses: this.extractAllWeaknesses(feedback),
                improvement: Math.round(improvement)
            }
        };
    }

    generateSummary(overallScore, scores, parsedData) {
        const hasMarketSize = scores.marketSizing >= 60;
        const hasCompetitive = scores.competitiveLandscape >= 60;
        const hasTrends = scores.trendAnalysis >= 60;
        
        if (overallScore >= 80) {
            return `Excellent market insight with ${hasMarketSize ? 'clear TAM/SAM/SOM' : 'strong understanding'}. ${hasCompetitive ? 'Competitive landscape well-mapped.' : ''} Strong evidence of market opportunity and timing. Ready to execute GTM strategy.`;
        } else if (overallScore >= 60) {
            return `Good market understanding foundation. ${hasMarketSize ? 'Market sizing documented.' : 'Market sizing needs refinement.'} ${hasCompetitive ? 'Competitors identified.' : 'Competitive analysis needs depth.'} Continue validating assumptions with market data.`;
        } else if (overallScore >= 40) {
            return `Initial market research shows promise. ${hasTrends ? 'Trends identified well.' : 'Need deeper trend analysis.'} Priority should be quantifying market opportunity and mapping competitive landscape thoroughly.`;
        } else {
            return `Market insight needs significant development. Focus on TAM/SAM/SOM analysis, comprehensive competitive mapping, and identifying key market trends. This is critical for GTM success.`;
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
        return allStrengths;
    }
    
    extractAllWeaknesses(feedback) {
        const allWeaknesses = [];
        for (const dimension in feedback) {
            if (feedback[dimension].improvements) {
                allWeaknesses.push(...feedback[dimension].improvements);
            }
        }
        return allWeaknesses;
    }
}

module.exports = MarketInsightAgent;
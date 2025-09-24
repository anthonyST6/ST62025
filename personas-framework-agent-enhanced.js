// Personas Framework Analysis Agent
// Evaluates documented archetypes of key users and buyers

const { RecommendationsLibraryDynamic } = require('./recommendations-library-dynamic');

class PersonasFrameworkAgentEnhanced {
    constructor() {
        this.dimensions = {
            personaDefinition: {
                weight: 20,
                maxScore: 20,
                evaluate: (data) => this.evaluatePersonaDefinition(data)
            },
            demographicDetail: {
                weight: 20,
                maxScore: 20,
                evaluate: (data) => this.evaluateDemographicDetail(data)
            },
            psychographicInsight: {
                weight: 20,
                maxScore: 20,
                evaluate: (data) => this.evaluatePsychographicInsight(data)
            },
            behavioralPatterns: {
                weight: 20,
                maxScore: 20,
                evaluate: (data) => this.evaluateBehavioralPatterns(data)
            },
            journeyMapping: {
                weight: 20,
                maxScore: 20,
                evaluate: (data) => this.evaluateJourneyMapping(data)
            }
        };
    }

    analyzeWorksheet(worksheetData) {
        console.log('📊 Personas Framework Agent: Starting analysis...');
        
        const parsedData = this.parseWorksheetData(worksheetData);
        console.log('📋 Parsed personas framework data');
        
        const scores = {};
        let totalScore = 0;
        
        for (const [key, dimension] of Object.entries(this.dimensions)) {
            const dimensionScore = dimension.evaluate(parsedData);
            const percentage = Math.round((dimensionScore / dimension.maxScore) * 100);
            
            scores[key] = {
                score: dimensionScore,
                maxScore: dimension.maxScore,
                percentage: percentage,
                weight: dimension.weight,
                feedback: this.generateDimensionFeedback(key, dimensionScore, dimension.maxScore)
            };
            
            totalScore += dimensionScore;
            console.log(`📊 ${key}: ${percentage}%`);
        }
        
        const overallScore = Math.round(totalScore);
        console.log(`✅ Personas Framework Analysis complete: ${overallScore}%`);
        
        return {
            score: overallScore,
            detailedScores: scores,
            recommendations: this.generateRecommendations(scores, parsedData),
            analysis: {
                executiveSummary: this.generateExecutiveSummary(overallScore, scores, parsedData)
            }
        };
    }

    parseWorksheetData(worksheetData) {
        const getValue = (num) => {
            return worksheetData[`field-${num}`] || 
                   worksheetData[`field${num}`] || 
                   worksheetData[`field_${num}`] || 
                   '';
        };
        
        return {
            personas: getValue(1),        // Key personas identified
            demographics: getValue(2),    // Demographic details
            psychographics: getValue(3),  // Goals, motivations, fears
            behaviors: getValue(4),        // Behavioral patterns
            journey: getValue(5),          // Customer journey stages
            validation: getValue(6)        // How personas are validated
        };
    }

    evaluatePersonaDefinition(data) {
        let score = 0;
        const personas = data.personas.toLowerCase();
        
        // Base score for any substantive answer
        if (personas.length > 20) {
            score = 8; // Start with 40% base score
        }
        
        // Enhanced persona detection
        const personaTypes = ['buyer', 'user', 'champion', 'influencer', 'decision', 'admin',
                             'end user', 'stakeholder', 'manager', 'executive', 'developer',
                             'analyst', 'operator', 'customer', 'client', 'partner'];
        const foundTypes = personaTypes.filter(type => personas.includes(type));
        score += Math.min(foundTypes.length * 2, 6);
        
        // Check for naming and roles
        if (personas.includes('name') || personas.includes('title') ||
            personas.includes('role') || personas.includes('position') ||
            personas.includes('job') || personas.includes('responsibility')) {
            score += 3;
        }
        
        // Check for specificity and detail
        if (/\d+/.test(personas) || personas.includes('specific') ||
            personas.includes('primary') || personas.includes('key') ||
            personas.includes('main') || personas.includes('target')) {
            score += 2;
        }
        
        // Check for segmentation
        if (personas.includes('segment') || personas.includes('category') ||
            personas.includes('type') || personas.includes('group') ||
            personas.includes('profile')) {
            score += 1;
        }
        
        // Bonus for comprehensive answers
        if (personas.length > 100) {
            score += 2;
        }
        
        return Math.min(score, 20);
    }

    evaluateDemographicDetail(data) {
        let score = 0;
        const demographics = data.demographics.toLowerCase();
        
        // Base score for any substantive answer
        if (demographics.length > 20) {
            score = 8; // Start with 40% base score
        }
        
        // Check for job details
        if (demographics.includes('job') || demographics.includes('title') ||
            demographics.includes('role') || demographics.includes('position') ||
            demographics.includes('function') || demographics.includes('department')) {
            score += 3;
        }
        
        // Check for company details
        if (demographics.includes('company') || demographics.includes('industry') ||
            demographics.includes('size') || demographics.includes('revenue') ||
            demographics.includes('business') || demographics.includes('organization') ||
            demographics.includes('sector') || demographics.includes('market')) {
            score += 3;
        }
        
        // Check for experience level
        if (demographics.includes('experience') || demographics.includes('senior') ||
            demographics.includes('junior') || demographics.includes('years') ||
            demographics.includes('level') || demographics.includes('expertise')) {
            score += 3;
        }
        
        // Check for location/market
        if (demographics.includes('location') || demographics.includes('region') ||
            demographics.includes('geo') || demographics.includes('country') ||
            demographics.includes('city') || demographics.includes('area')) {
            score += 3;
        }
        
        // Bonus for comprehensive answers
        if (demographics.length > 100) {
            score += 2;
        }
        
        return Math.min(score, 20);
    }

    evaluatePsychographicInsight(data) {
        let score = 0;
        const psychographics = data.psychographics.toLowerCase();
        
        // Base score for any substantive answer
        if (psychographics.length > 20) {
            score = 8; // Start with 40% base score
        }
        
        // Check for goals and objectives
        if (psychographics.includes('goal') || psychographics.includes('objective') ||
            psychographics.includes('achieve') || psychographics.includes('success') ||
            psychographics.includes('outcome') || psychographics.includes('result') ||
            psychographics.includes('target') || psychographics.includes('aim')) {
            score += 3;
        }
        
        // Check for motivations and drivers
        if (psychographics.includes('motivat') || psychographics.includes('drive') ||
            psychographics.includes('inspire') || psychographics.includes('value') ||
            psychographics.includes('reason') || psychographics.includes('why') ||
            psychographics.includes('purpose') || psychographics.includes('intent')) {
            score += 3;
        }
        
        // Check for pain points/fears/concerns
        if (psychographics.includes('fear') || psychographics.includes('concern') ||
            psychographics.includes('worry') || psychographics.includes('challenge') ||
            psychographics.includes('pain') || psychographics.includes('problem') ||
            psychographics.includes('issue') || psychographics.includes('frustrat')) {
            score += 3;
        }
        
        // Check for preferences and needs
        if (psychographics.includes('prefer') || psychographics.includes('like') ||
            psychographics.includes('want') || psychographics.includes('need') ||
            psychographics.includes('require') || psychographics.includes('expect') ||
            psychographics.includes('desire') || psychographics.includes('wish')) {
            score += 3;
        }
        
        // Bonus for comprehensive answers
        if (psychographics.length > 100) {
            score += 2;
        }
        
        return Math.min(score, 20);
    }

    evaluateBehavioralPatterns(data) {
        let score = 0;
        const behaviors = data.behaviors.toLowerCase();
        
        // Base score for any substantive answer
        if (behaviors.length > 20) {
            score = 8; // Start with 40% base score
        }
        
        // Check for buying/decision behavior
        if (behaviors.includes('buy') || behaviors.includes('purchase') ||
            behaviors.includes('decision') || behaviors.includes('evaluate') ||
            behaviors.includes('choose') || behaviors.includes('select') ||
            behaviors.includes('consider') || behaviors.includes('assess')) {
            score += 3;
        }
        
        // Check for usage patterns
        if (behaviors.includes('use') || behaviors.includes('usage') ||
            behaviors.includes('interact') || behaviors.includes('engage') ||
            behaviors.includes('work') || behaviors.includes('operate') ||
            behaviors.includes('handle') || behaviors.includes('manage')) {
            score += 3;
        }
        
        // Check for research and discovery behavior
        if (behaviors.includes('research') || behaviors.includes('search') ||
            behaviors.includes('compare') || behaviors.includes('investigate') ||
            behaviors.includes('explore') || behaviors.includes('find') ||
            behaviors.includes('look') || behaviors.includes('discover')) {
            score += 3;
        }
        
        // Check for communication and interaction
        if (behaviors.includes('communicate') || behaviors.includes('channel') ||
            behaviors.includes('contact') || behaviors.includes('reach') ||
            behaviors.includes('connect') || behaviors.includes('talk') ||
            behaviors.includes('email') || behaviors.includes('call')) {
            score += 3;
        }
        
        // Bonus for comprehensive answers
        if (behaviors.length > 100) {
            score += 2;
        }
        
        return Math.min(score, 20);
    }

    evaluateJourneyMapping(data) {
        let score = 0;
        const journey = data.journey.toLowerCase();
        const validation = data.validation.toLowerCase();
        const combined = journey + ' ' + validation;
        
        // Base score for any substantive answer
        if (combined.length > 40) {
            score = 8; // Start with 40% base score
        }
        
        // Enhanced journey stage detection
        const stages = ['aware', 'consider', 'evaluate', 'purchase', 'onboard',
                       'adopt', 'expand', 'renew', 'discover', 'research',
                       'compare', 'decide', 'buy', 'implement', 'use',
                       'support', 'upgrade', 'refer'];
        const foundStages = stages.filter(stage => journey.includes(stage));
        score += Math.min(foundStages.length * 1, 4);
        
        // Check for touchpoints and interactions
        if (journey.includes('touchpoint') || journey.includes('interaction') ||
            journey.includes('contact') || journey.includes('channel') ||
            journey.includes('step') || journey.includes('stage') ||
            journey.includes('phase') || journey.includes('point')) {
            score += 3;
        }
        
        // Check for validation methods
        if (validation.includes('interview') || validation.includes('survey') ||
            validation.includes('data') || validation.includes('validate') ||
            validation.includes('test') || validation.includes('confirm') ||
            validation.includes('feedback') || validation.includes('research')) {
            score += 3;
        }
        
        // Check for continuous improvement
        if (validation.includes('update') || validation.includes('iterate') ||
            validation.includes('refine') || validation.includes('evolve') ||
            validation.includes('improve') || validation.includes('adjust') ||
            validation.includes('optimize') || validation.includes('enhance')) {
            score += 2;
        }
        
        // Bonus for comprehensive answers
        if (combined.length > 150) {
            score += 2;
        }
        
        return Math.min(score, 20);
    }

    generateDimensionFeedback(dimension, score, maxScore) {
        const percentage = (score / maxScore) * 100;
        const feedback = {
            personaDefinition: {
                high: "✓ Multiple personas defined\n✓ Clear naming and roles\n✓ Well-segmented",
                medium: "✓ Some personas identified\n✗ Need more specificity\n✗ Better segmentation needed",
                low: "✗ Define key personas\n✗ Name and describe roles\n✗ Segment by type"
            },
            demographicDetail: {
                high: "✓ Rich demographic data\n✓ Job and company details\n✓ Experience levels clear",
                medium: "✓ Basic demographics\n✗ Add more detail\n✗ Include company context",
                low: "✗ Add demographic details\n✗ Include job information\n✗ Specify company context"
            },
            psychographicInsight: {
                high: "✓ Clear goals and motivations\n✓ Fears and concerns mapped\n✓ Preferences understood",
                medium: "✓ Some psychographics\n✗ Deepen motivations\n✗ Clarify fears",
                low: "✗ Define goals\n✗ Understand motivations\n✗ Identify fears and concerns"
            },
            behavioralPatterns: {
                high: "✓ Buying behavior clear\n✓ Usage patterns mapped\n✓ Communication preferences known",
                medium: "✓ Some behaviors identified\n✗ Map buying process\n✗ Understand usage better",
                low: "✗ Map buying behavior\n✗ Understand usage patterns\n✗ Define communication preferences"
            },
            journeyMapping: {
                high: "✓ Journey stages mapped\n✓ Touchpoints identified\n✓ Personas validated",
                medium: "✓ Basic journey understanding\n✗ Map all stages\n✗ Validate with data",
                low: "✗ Map customer journey\n✗ Identify touchpoints\n✗ Validate personas"
            }
        };
        
        if (percentage >= 70) return feedback[dimension].high;
        if (percentage >= 40) return feedback[dimension].medium;
        return feedback[dimension].low;
    }

    generateRecommendations(scores, parsedData) {
        const recommendations = [];
        
        const dimensions = Object.entries(scores)
            .sort((a, b) => a[1].percentage - b[1].percentage)
            .slice(0, 3);
        
        for (const [dimension, data] of dimensions) {
            const improvement = Math.round((data.maxScore - data.score) * 0.7);
            
            if (dimension === 'personaDefinition' && data.percentage < 70) {
                recommendations.push({
                    area: 'Persona Development',
                    priority: data.percentage < 40 ? 'CRITICAL' : 'HIGH',
                    impact: `+${improvement} points`,
                    actionPlan: [
                        'Identify 3-5 key personas',
                        'Create detailed persona profiles',
                        'Name personas for memorability',
                        'Segment by buyer vs user roles'
                    ]
                });
            }
            
            if (dimension === 'psychographicInsight' && data.percentage < 70) {
                recommendations.push({
                    area: 'Psychological Understanding',
                    priority: 'HIGH',
                    impact: `+${improvement} points`,
                    actionPlan: [
                        'Document goals and objectives',
                        'Understand core motivations',
                        'Identify fears and concerns',
                        'Map decision criteria'
                    ]
                });
            }
            
            if (dimension === 'journeyMapping' && data.percentage < 70) {
                recommendations.push({
                    area: 'Journey Validation',
                    priority: 'MEDIUM',
                    impact: `+${improvement} points`,
                    actionPlan: [
                        'Map complete buyer journey',
                        'Identify all touchpoints',
                        'Validate with customer data',
                        'Update personas quarterly'
                    ]
                });
            }
        }
        
        return recommendations;
    }

    generateExecutiveSummary(score, dimensions, parsedData) {
        if (score >= 80) {
            return "Excellent personas framework with rich, validated profiles of your key customers. Your deep understanding of demographics, psychographics, and behaviors enables precise targeting and messaging. Focus on continuous validation and refinement.";
        } else if (score >= 60) {
            return "Solid persona foundation with good understanding of key customer types. Your framework shows thoughtful consideration of who your customers are and what drives them. To enhance further, add more psychographic depth, behavioral patterns, and journey mapping details.";
        } else if (score >= 40) {
            return "You're building a personas framework with some important elements in place. To strengthen it, focus on adding more detailed demographics, deeper psychological insights, and clearer behavioral patterns. These enhancements will significantly improve your customer understanding and targeting.";
        } else if (score >= 20) {
            return "Initial persona development shows you're thinking about your customers. Continue building by identifying specific customer segments, documenting their demographics and psychographics, and mapping their journeys. This deeper understanding is essential for effective go-to-market strategies.";
        } else {
            return "Personas framework needs development. Start with the basics: identify 2-3 key customer types, document their job roles and company details, understand their goals and challenges, and map how they make decisions. Building clear personas is crucial for product-market fit.";
        }
    }
}

// Export for use in server
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PersonasFrameworkAgentEnhanced;
}

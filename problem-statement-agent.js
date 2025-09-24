// Problem Statement Analysis Agent
// World-class GTM expert that evaluates problem statements with rigorous methodology

class ProblemStatementAgent {
    constructor() {
        this.name = "GTM Problem Statement Expert";
        this.version = "1.0.0";
        this.expertise = [
            "Jobs-to-be-Done Theory (Clayton Christensen)",
            "Customer Development (Steve Blank)",
            "Lean Startup Methodology",
            "Value Proposition Design",
            "Market Validation Techniques",
            "Behavioral Economics",
            "MEDDIC/MEDDPICC",
            "Crossing the Chasm (Geoffrey Moore)",
            "Blue Ocean Strategy",
            "Product-Led Growth",
            "Community-Led Growth"
        ];
        
        // Scoring rubric with weights
        this.rubric = {
            personaClarity: { weight: 20, name: "Persona & Segment Clarity" },
            contextualTriggers: { weight: 20, name: "Contextual Triggers & Timing" },
            impactQuantification: { weight: 20, name: "Impact Quantification" },
            evidenceValidation: { weight: 20, name: "Evidence & Validation" },
            solutionGap: { weight: 20, name: "Solution Gap Analysis" }
        };
    }

    // Main analysis function
    analyzeWorksheet(worksheetData, uploadedDocs = []) {
        console.log('🤖 Problem Statement Agent: Starting analysis...');
        
        // Parse worksheet data
        const parsedData = this.parseWorksheetData(worksheetData);
        
        // Analyze each dimension
        const scores = {
            personaClarity: this.evaluatePersona(parsedData.who),
            contextualTriggers: this.evaluateContext(parsedData.when),
            impactQuantification: this.evaluateImpact(parsedData.impact),
            evidenceValidation: this.evaluateEvidence(parsedData.evidence),
            solutionGap: this.evaluateSolutionGap(parsedData.currentSolutions)
        };
        
        // Calculate final score
        const finalScore = this.calculateScore(scores);
        
        // Generate comprehensive analysis
        const analysis = this.generateAnalysis(scores, parsedData);
        
        // Generate recommendations
        const recommendations = this.generateRecommendations(scores, parsedData);
        
        // Identify strengths and improvements
        const strengths = this.identifyStrengths(scores, parsedData);
        const improvements = this.identifyImprovements(scores, parsedData);
        
        // Generate benchmark comparison
        const benchmark = this.generateBenchmark(finalScore);
        
        return {
            score: finalScore,
            timestamp: new Date().toISOString(),
            analysis,
            recommendations,
            strengths,
            improvements,
            benchmark,
            detailedScores: scores
        };
    }

    // Parse worksheet data into structured format
    parseWorksheetData(data) {
        return {
            who: data['who-affected'] || '',
            problem: data['what-problem'] || '',
            when: data['when-occur'] || '',
            impact: data['what-impact'] || '',
            currentSolutions: data['how-solving'] || '',
            evidence: data['evidence-validation'] || ''
        };
    }

    // Evaluate persona clarity (20 points)
    evaluatePersona(personaText) {
        let score = 0;
        const feedback = [];
        
        // Check for specific demographics
        if (personaText.match(/\d+[-\s]*(to|-)[-\s]*\d+\s*(employees|people)/i)) {
            score += 4;
            feedback.push("✓ Company size specified");
        } else {
            feedback.push("✗ Missing specific company size");
        }
        
        // Check for industry/vertical
        if (personaText.match(/B2B|SaaS|enterprise|SMB|startup/i)) {
            score += 3;
            feedback.push("✓ Industry/market segment identified");
        } else {
            feedback.push("✗ Missing industry specification");
        }
        
        // Check for role/title
        if (personaText.match(/founder|CEO|VP|director|manager|head of/i)) {
            score += 4;
            feedback.push("✓ Decision maker role specified");
        } else {
            feedback.push("✗ Missing specific role/title");
        }
        
        // Check for psychographics/characteristics
        if (personaText.match(/experience|second-time|first-time|technical|non-technical/i)) {
            score += 3;
            feedback.push("✓ Persona characteristics included");
        } else {
            feedback.push("✗ Missing psychographic details");
        }
        
        // Check for pain point specificity
        if (personaText.match(/struggle|challenge|pain|problem|difficulty/i)) {
            score += 3;
            feedback.push("✓ Pain points mentioned");
        } else {
            feedback.push("✗ Pain points not clearly articulated");
        }
        
        // Check for stage/maturity
        if (personaText.match(/seed|series [A-Z]|growth|scale|early|mature/i)) {
            score += 3;
            feedback.push("✓ Company stage identified");
        } else {
            feedback.push("✗ Missing company maturity stage");
        }
        
        return {
            score: Math.min(20, score),
            feedback: feedback.join('\n'),
            details: personaText.substring(0, 200) + '...'
        };
    }

    // Evaluate contextual triggers (20 points)
    evaluateContext(contextText) {
        let score = 0;
        const feedback = [];
        
        // Check for specific timing
        if (contextText.match(/\d+\s*(months?|years?|weeks?|quarters?)/i)) {
            score += 5;
            feedback.push("✓ Specific timeframe identified");
        } else {
            feedback.push("✗ Missing specific timing");
        }
        
        // Check for trigger events
        if (contextText.match(/when|after|before|during|trigger|milestone/i)) {
            score += 4;
            feedback.push("✓ Trigger events described");
        } else {
            feedback.push("✗ No clear trigger events");
        }
        
        // Check for business context
        if (contextText.match(/ARR|revenue|funding|hire|launch|scale/i)) {
            score += 4;
            feedback.push("✓ Business context provided");
        } else {
            feedback.push("✗ Missing business context");
        }
        
        // Check for environmental factors
        if (contextText.match(/market|competition|regulation|economy|industry/i)) {
            score += 3;
            feedback.push("✓ Environmental factors considered");
        } else {
            feedback.push("✗ Environmental factors not addressed");
        }
        
        // Check for urgency indicators
        if (contextText.match(/critical|urgent|immediate|pressure|deadline/i)) {
            score += 4;
            feedback.push("✓ Urgency clearly communicated");
        } else {
            feedback.push("✗ Urgency not established");
        }
        
        return {
            score: Math.min(20, score),
            feedback: feedback.join('\n'),
            details: contextText.substring(0, 200) + '...'
        };
    }

    // Evaluate impact quantification (20 points)
    evaluateImpact(impactText) {
        let score = 0;
        const feedback = [];
        
        // Check for financial metrics
        const hasFinancialMetrics = impactText.match(/\$[\d,]+[KMB]?|\d+%|ROI|CAC|LTV|payback/i);
        if (hasFinancialMetrics) {
            score += 6;
            feedback.push("✓ Financial impact quantified");
        } else {
            feedback.push("✗ Missing financial quantification");
        }
        
        // Check for operational metrics
        if (impactText.match(/hours?|days?|weeks?|cycle|efficiency|productivity/i)) {
            score += 4;
            feedback.push("✓ Operational impact described");
        } else {
            feedback.push("✗ Operational impact not quantified");
        }
        
        // Check for emotional/team impact
        if (impactText.match(/burnout|stress|morale|satisfaction|frustration|turnover/i)) {
            score += 3;
            feedback.push("✓ Human impact acknowledged");
        } else {
            feedback.push("✗ Human/emotional impact missing");
        }
        
        // Check for growth impact
        if (impactText.match(/growth|scale|expansion|milestone|target|goal/i)) {
            score += 4;
            feedback.push("✓ Growth impact identified");
        } else {
            feedback.push("✗ Growth impact not addressed");
        }
        
        // Check for comparative metrics
        if (impactText.match(/benchmark|industry|average|competitor|vs\.|versus/i)) {
            score += 3;
            feedback.push("✓ Comparative context provided");
        } else {
            feedback.push("✗ Missing comparative benchmarks");
        }
        
        return {
            score: Math.min(20, score),
            feedback: feedback.join('\n'),
            details: impactText.substring(0, 200) + '...'
        };
    }

    // Evaluate evidence and validation (20 points)
    evaluateEvidence(evidenceText) {
        let score = 0;
        const feedback = [];
        
        // Check for customer research
        const hasCustomerCount = evidenceText.match(/\d+\s*(customers?|interviews?|founders?|companies)/i);
        if (hasCustomerCount) {
            score += 5;
            feedback.push("✓ Customer research quantified");
        } else {
            feedback.push("✗ No customer research numbers");
        }
        
        // Check for willingness to pay
        if (evidenceText.match(/pay|pricing|\$\d+|willing/i)) {
            score += 4;
            feedback.push("✓ Willingness to pay validated");
        } else {
            feedback.push("✗ Missing pricing validation");
        }
        
        // Check for quotes or testimonials
        if (evidenceText.match(/["']|said|told|expressed|quote/i)) {
            score += 3;
            feedback.push("✓ Customer quotes included");
        } else {
            feedback.push("✗ No direct customer quotes");
        }
        
        // Check for market size
        if (evidenceText.match(/TAM|SAM|SOM|market size|\d+[KMB]?\s*customers/i)) {
            score += 4;
            feedback.push("✓ Market size addressed");
        } else {
            feedback.push("✗ Market size not quantified");
        }
        
        // Check for validation methods
        if (evidenceText.match(/survey|interview|pilot|LOI|beta|test/i)) {
            score += 4;
            feedback.push("✓ Validation methodology described");
        } else {
            feedback.push("✗ Validation methods unclear");
        }
        
        return {
            score: Math.min(20, score),
            feedback: feedback.join('\n'),
            details: evidenceText.substring(0, 200) + '...'
        };
    }

    // Evaluate solution gap analysis (20 points)
    evaluateSolutionGap(solutionText) {
        let score = 0;
        const feedback = [];
        
        // Check for current solution identification
        if (solutionText.match(/consultant|tool|software|platform|service|solution/i)) {
            score += 4;
            feedback.push("✓ Current solutions identified");
        } else {
            feedback.push("✗ Current solutions not specified");
        }
        
        // Check for cost analysis
        if (solutionText.match(/\$[\d,]+|expensive|cost|price|budget/i)) {
            score += 4;
            feedback.push("✓ Cost implications analyzed");
        } else {
            feedback.push("✗ Cost analysis missing");
        }
        
        // Check for limitation analysis
        if (solutionText.match(/fail|lack|missing|without|problem|issue|gap/i)) {
            score += 4;
            feedback.push("✓ Limitations clearly stated");
        } else {
            feedback.push("✗ Limitations not articulated");
        }
        
        // Check for alternatives comparison
        if (solutionText.match(/alternative|option|versus|compare|instead/i)) {
            score += 4;
            feedback.push("✓ Alternatives compared");
        } else {
            feedback.push("✗ No alternative comparison");
        }
        
        // Check for differentiation
        if (solutionText.match(/unique|different|better|advantage|unlike/i)) {
            score += 4;
            feedback.push("✓ Differentiation suggested");
        } else {
            feedback.push("✗ Differentiation opportunity missed");
        }
        
        return {
            score: Math.min(20, score),
            feedback: feedback.join('\n'),
            details: solutionText.substring(0, 200) + '...'
        };
    }

    // Calculate final score
    calculateScore(scores) {
        let total = 0;
        for (const [key, value] of Object.entries(scores)) {
            total += value.score;
        }
        return Math.round(total);
    }


    // Generate comprehensive analysis
    generateAnalysis(scores, parsedData) {
        const executiveSummary = this.generateExecutiveSummary(scores);
        
        return {
            executiveSummary,
            personaAnalysis: {
                score: scores.personaClarity.score,
                maxScore: 20,
                percentage: Math.round((scores.personaClarity.score / 20) * 100),
                feedback: scores.personaClarity.feedback,
                insight: this.getPersonaInsight(scores.personaClarity.score)
            },
            contextAnalysis: {
                score: scores.contextualTriggers.score,
                maxScore: 20,
                percentage: Math.round((scores.contextualTriggers.score / 20) * 100),
                feedback: scores.contextualTriggers.feedback,
                insight: this.getContextInsight(scores.contextualTriggers.score)
            },
            impactAnalysis: {
                score: scores.impactQuantification.score,
                maxScore: 20,
                percentage: Math.round((scores.impactQuantification.score / 20) * 100),
                feedback: scores.impactQuantification.feedback,
                insight: this.getImpactInsight(scores.impactQuantification.score)
            },
            evidenceAnalysis: {
                score: scores.evidenceValidation.score,
                maxScore: 20,
                percentage: Math.round((scores.evidenceValidation.score / 20) * 100),
                feedback: scores.evidenceValidation.feedback,
                insight: this.getEvidenceInsight(scores.evidenceValidation.score)
            },
            solutionGapAnalysis: {
                score: scores.solutionGap.score,
                maxScore: 20,
                percentage: Math.round((scores.solutionGap.score / 20) * 100),
                feedback: scores.solutionGap.feedback,
                insight: this.getSolutionInsight(scores.solutionGap.score)
            }
        };
    }

    // Generate executive summary
    generateExecutiveSummary(scores) {
        const totalScore = this.calculateScore(scores);
        
        if (totalScore >= 85) {
            return `Excellent problem statement articulation (${totalScore}%). Your problem statement demonstrates strong market understanding and validation. Focus on continuous refinement and deeper competitive analysis to reach world-class status.`;
        } else if (totalScore >= 70) {
            return `Good problem statement foundation (${totalScore}%). You have the core elements in place but need to strengthen quantification and validation. Priority areas for improvement include more specific customer evidence and clearer impact metrics.`;
        } else if (totalScore >= 60) {
            return `Developing problem statement (${totalScore}%). While you understand the general problem space, significant gaps exist in validation and specificity. Focus on customer research and quantifying the problem's impact.`;
        } else {
            return `Problem statement needs significant work (${totalScore}%). Critical gaps in understanding and validation put your GTM strategy at risk. Immediate action needed on customer research and problem definition.`;
        }
    }

    // Generate specific insights
    getPersonaInsight(score) {
        if (score >= 18) return "Exceptional persona definition with clear segmentation";
        if (score >= 14) return "Good persona clarity but could be more specific";
        if (score >= 10) return "Basic persona identified but lacks detail";
        return "Persona definition is too vague for effective GTM";
    }

    getContextInsight(score) {
        if (score >= 18) return "Crystal clear triggers and timing identified";
        if (score >= 14) return "Good context but some triggers are unclear";
        if (score >= 10) return "Basic context provided but needs specificity";
        return "Context and triggers poorly defined";
    }

    getImpactInsight(score) {
        if (score >= 18) return "Impact thoroughly quantified across multiple dimensions";
        if (score >= 14) return "Good impact analysis but missing some metrics";
        if (score >= 10) return "Some impact described but lacks quantification";
        return "Impact not sufficiently quantified for decision making";
    }

    getEvidenceInsight(score) {
        if (score >= 18) return "Strong validation with multiple evidence sources";
        if (score >= 14) return "Good validation but needs more data points";
        if (score >= 10) return "Some evidence but validation is weak";
        return "Insufficient evidence to validate problem";
    }

    getSolutionInsight(score) {
        if (score >= 18) return "Excellent analysis of solution landscape and gaps";
        if (score >= 14) return "Good understanding of current solutions";
        if (score >= 10) return "Basic solution analysis but missing details";
        return "Solution landscape not well understood";
    }

    // Generate recommendations
    generateRecommendations(scores, parsedData) {
        const recommendations = [];
        
        // Persona recommendations
        if (scores.personaClarity.score < 18) {
            recommendations.push({
                priority: scores.personaClarity.score < 10 ? "HIGH" : "MEDIUM",
                category: "Persona Definition",
                action: "Conduct 10-15 structured interviews with target personas",
                expectedImprovement: `+${20 - scores.personaClarity.score} points`,
                timeframe: "2 weeks",
                resources: "Customer interview guide, recording tools",
                specificSteps: [
                    "Create interview script focusing on role, company size, and pain points",
                    "Identify and reach out to target personas via LinkedIn",
                    "Document findings in persona template"
                ]
            });
        }
        
        // Context recommendations
        if (scores.contextualTriggers.score < 18) {
            recommendations.push({
                priority: scores.contextualTriggers.score < 10 ? "HIGH" : "MEDIUM",
                category: "Contextual Triggers",
                action: "Map specific trigger events and timing patterns",
                expectedImprovement: `+${20 - scores.contextualTriggers.score} points`,
                timeframe: "1 week",
                resources: "Customer journey mapping tools",
                specificSteps: [
                    "Analyze when customers typically seek solutions",
                    "Identify business milestones that trigger need",
                    "Document environmental factors"
                ]
            });
        }
        
        // Impact recommendations
        if (scores.impactQuantification.score < 18) {
            recommendations.push({
                priority: "HIGH",
                category: "Impact Quantification",
                action: "Quantify financial and operational impact with metrics",
                expectedImprovement: `+${20 - scores.impactQuantification.score} points`,
                timeframe: "2 weeks",
                resources: "ROI calculator, customer surveys",
                specificSteps: [
                    "Survey customers on time/money lost to problem",
                    "Calculate average financial impact",
                    "Document productivity and efficiency losses"
                ]
            });
        }
        
        // Evidence recommendations
        if (scores.evidenceValidation.score < 18) {
            recommendations.push({
                priority: "HIGH",
                category: "Evidence & Validation",
                action: "Gather quantitative validation and customer quotes",
                expectedImprovement: `+${20 - scores.evidenceValidation.score} points`,
                timeframe: "3 weeks",
                resources: "Survey tools, interview recordings",
                specificSteps: [
                    "Conduct pricing validation survey",
                    "Collect 5-10 customer quotes",
                    "Calculate TAM/SAM/SOM"
                ]
            });
        }
        
        // Solution gap recommendations
        if (scores.solutionGap.score < 18) {
            recommendations.push({
                priority: scores.solutionGap.score < 10 ? "HIGH" : "MEDIUM",
                category: "Solution Analysis",
                action: "Deep dive into competitive landscape and alternatives",
                expectedImprovement: `+${20 - scores.solutionGap.score} points`,
                timeframe: "1 week",
                resources: "Competitive analysis framework",
                specificSteps: [
                    "Analyze top 5 alternative solutions",
                    "Document why each fails to solve problem",
                    "Identify unique value proposition"
                ]
            });
        }
        
        return recommendations.sort((a, b) => {
            const priorityOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
    }

    // Identify strengths
    identifyStrengths(scores, parsedData) {
        const strengths = [];
        
        if (scores.personaClarity.score >= 14) {
            strengths.push("Clear target audience identification");
        }
        if (scores.contextualTriggers.score >= 14) {
            strengths.push("Well-defined problem triggers and timing");
        }
        if (scores.impactQuantification.score >= 14) {
            strengths.push("Good understanding of problem impact");
        }
        if (scores.evidenceValidation.score >= 14) {
            strengths.push("Evidence-based problem validation");
        }
        if (scores.solutionGap.score >= 14) {
            strengths.push("Clear analysis of existing solutions");
        }
        
        // Add overall strengths
        const totalScore = this.calculateScore(scores);
        if (totalScore >= 70) {
            strengths.push("Strong foundation for GTM strategy");
        }
        
        return strengths;
    }

    // Identify improvements
    identifyImprovements(scores, parsedData) {
        const improvements = [];
        
        if (scores.personaClarity.score < 18) {
            improvements.push("Add more specific persona demographics and psychographics");
        }
        if (scores.contextualTriggers.score < 18) {
            improvements.push("Clarify specific timing and trigger events");
        }
        if (scores.impactQuantification.score < 18) {
            improvements.push("Quantify financial and operational impact with hard metrics");
        }
        if (scores.evidenceValidation.score < 18) {
            improvements.push("Add customer quotes and market size data");
        }
        if (scores.solutionGap.score < 18) {
            improvements.push("Provide deeper competitive analysis");
        }
        
        return improvements;
    }

    // Generate benchmark comparison
    generateBenchmark(score) {
        return {
            yourScore: score,
            industryAverage: 65,
            topPerformers: 85,
            bottomPerformers: 45,
            percentile: this.calculatePercentile(score),
            insight: this.getBenchmarkInsight(score),
            comparison: {
                vsAverage: score - 65,
                vsTop: score - 85,
                timeToTop: this.estimateImprovementTime(score, 85)
            }
        };
    }

    calculatePercentile(score) {
        // Simplified percentile calculation
        if (score >= 85) return 90;
        if (score >= 75) return 75;
        if (score >= 65) return 50;
        if (score >= 55) return 25;
        return 10;
    }

    getBenchmarkInsight(score) {
        if (score >= 85) {
            return "You're in the top 10% of problem statements. Focus on maintaining excellence and continuous refinement.";
        } else if (score >= 75) {
            return "Above average problem articulation. You're ahead of most startups but have room to reach top-tier.";
        } else if (score >= 65) {
            return "Average problem statement quality. Significant improvement needed to stand out to investors and customers.";
        } else {
            return "Below average problem articulation. This is a critical risk to your GTM success and needs immediate attention.";
        }
    }

    estimateImprovementTime(currentScore, targetScore) {
        const gap = targetScore - currentScore;
        if (gap <= 0) return "Already achieved";
        if (gap <= 10) return "2-3 weeks";
        if (gap <= 20) return "4-6 weeks";
        return "6-8 weeks";
    }
}

// Export for use in the platform
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProblemStatementAgent;
}
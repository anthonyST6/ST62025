// Template Evaluation Engine - Professional Grade Assessment
// ScaleTeam6 - GTM Excellence Standards

window.TemplateEvaluationEngine = {
    // Professional evaluation criteria for each template
    templates: {
        'Problem Statement Canvas': {
            questions: [
                {
                    id: 'target-customer',
                    question: 'Who specifically is experiencing this problem?',
                    criteria: [
                        'Specific industry/vertical identified',
                        'Company size/stage defined',
                        'Decision maker role specified',
                        'Geographic/market scope clear',
                        'Psychographic characteristics included'
                    ],
                    weight: 20,
                    grading: {
                        excellent: 'All 5 criteria met with specific details',
                        good: '3-4 criteria met with clarity',
                        fair: '2 criteria met with basic information',
                        poor: 'Only 1 criterion or vague description'
                    }
                },
                {
                    id: 'problem-definition',
                    question: 'What exactly is the problem they face?',
                    criteria: [
                        'Problem clearly articulated',
                        'Root cause identified',
                        'Symptoms vs problem distinguished',
                        'Scope and boundaries defined',
                        'Problem validated with evidence'
                    ],
                    weight: 25,
                    grading: {
                        excellent: 'Crystal clear problem with all aspects covered',
                        good: 'Well-defined problem with most aspects',
                        fair: 'Basic problem statement with some clarity',
                        poor: 'Vague or unclear problem definition'
                    }
                },
                {
                    id: 'context-triggers',
                    question: 'When and why does this problem occur?',
                    criteria: [
                        'Specific trigger events identified',
                        'Frequency/timing documented',
                        'Environmental factors considered',
                        'Urgency level established',
                        'Seasonal/cyclical patterns noted'
                    ],
                    weight: 15,
                    grading: {
                        excellent: 'Comprehensive context with all triggers mapped',
                        good: 'Good context with main triggers identified',
                        fair: 'Basic context with some triggers',
                        poor: 'Minimal or no context provided'
                    }
                },
                {
                    id: 'impact-metrics',
                    question: 'What is the measurable impact?',
                    criteria: [
                        'Financial impact quantified',
                        'Time/productivity loss measured',
                        'Opportunity cost calculated',
                        'Risk/compliance impact assessed',
                        'Competitive disadvantage quantified'
                    ],
                    weight: 25,
                    grading: {
                        excellent: 'All impacts quantified with specific metrics',
                        good: '3-4 impacts quantified clearly',
                        fair: '1-2 impacts with basic quantification',
                        poor: 'No quantification or vague impacts'
                    }
                },
                {
                    id: 'current-solutions',
                    question: 'How are they solving it today?',
                    criteria: [
                        'Current alternatives identified',
                        'Cost of current solutions documented',
                        'Limitations clearly stated',
                        'Switching costs considered',
                        'Satisfaction level assessed'
                    ],
                    weight: 15,
                    grading: {
                        excellent: 'Comprehensive competitive analysis',
                        good: 'Good understanding of alternatives',
                        fair: 'Basic knowledge of current solutions',
                        poor: 'Limited or no alternative analysis'
                    }
                }
            ]
        },
        'Problem Validation Scorecard': {
            questions: [
                {
                    id: 'evidence-quality',
                    question: 'What evidence validates this problem?',
                    criteria: [
                        'Customer interviews conducted (n>20)',
                        'Survey data collected (n>100)',
                        'Industry reports cited',
                        'Case studies documented',
                        'Expert opinions gathered'
                    ],
                    weight: 30,
                    grading: {
                        excellent: 'Multiple evidence types with strong sample sizes',
                        good: '3-4 evidence types with decent samples',
                        fair: '2 evidence types with basic validation',
                        poor: 'Minimal or anecdotal evidence only'
                    }
                },
                {
                    id: 'problem-severity',
                    question: 'How severe is the problem?',
                    criteria: [
                        'Pain level quantified (1-10 scale)',
                        'Frequency of occurrence documented',
                        'Business impact severity rated',
                        'Urgency to solve established',
                        'Consequences of inaction clear'
                    ],
                    weight: 20,
                    grading: {
                        excellent: 'All severity dimensions quantified',
                        good: 'Most severity aspects measured',
                        fair: 'Basic severity assessment',
                        poor: 'Vague or unmeasured severity'
                    }
                },
                {
                    id: 'market-size',
                    question: 'How big is the addressable market?',
                    criteria: [
                        'TAM calculated with methodology',
                        'SAM defined with criteria',
                        'SOM realistic and justified',
                        'Growth rate projected',
                        'Market segmentation clear'
                    ],
                    weight: 20,
                    grading: {
                        excellent: 'Complete TAM/SAM/SOM with clear methodology',
                        good: 'Good market sizing with some gaps',
                        fair: 'Basic market size estimation',
                        poor: 'No clear market sizing'
                    }
                },
                {
                    id: 'willingness-to-pay',
                    question: 'Will customers pay to solve this?',
                    criteria: [
                        'Price sensitivity tested',
                        'Budget availability confirmed',
                        'ROI for customer calculated',
                        'Purchasing process understood',
                        'Decision criteria documented'
                    ],
                    weight: 20,
                    grading: {
                        excellent: 'Strong evidence of willingness to pay',
                        good: 'Good indicators of payment intent',
                        fair: 'Some evidence of willingness',
                        poor: 'Unclear or no payment validation'
                    }
                },
                {
                    id: 'solution-feasibility',
                    question: 'Can we effectively solve this problem?',
                    criteria: [
                        'Technical feasibility validated',
                        'Resource requirements defined',
                        'Timeline realistic',
                        'Competitive advantage identified',
                        'Scalability potential assessed'
                    ],
                    weight: 10,
                    grading: {
                        excellent: 'Clear path to solution with advantages',
                        good: 'Feasible solution with some advantages',
                        fair: 'Basic feasibility established',
                        poor: 'Unclear feasibility or advantages'
                    }
                }
            ]
        },
        'Pain Point Prioritization Matrix': {
            questions: [
                {
                    id: 'impact-severity',
                    question: 'How severe is the impact when this occurs?',
                    criteria: [
                        'Revenue impact quantified',
                        'Cost impact measured',
                        'Time impact calculated',
                        'Quality impact assessed',
                        'Risk impact evaluated'
                    ],
                    weight: 35,
                    grading: {
                        excellent: 'All impact dimensions quantified precisely',
                        good: 'Most impacts well quantified',
                        fair: 'Some impacts quantified',
                        poor: 'Minimal quantification'
                    }
                },
                {
                    id: 'frequency',
                    question: 'How often does this problem occur?',
                    criteria: [
                        'Occurrence rate measured',
                        'Pattern identified (random/predictable)',
                        'Trend analysis completed',
                        'Seasonality considered',
                        'Escalation frequency tracked'
                    ],
                    weight: 20,
                    grading: {
                        excellent: 'Precise frequency data with patterns',
                        good: 'Good frequency understanding',
                        fair: 'Basic frequency knowledge',
                        poor: 'Unknown or vague frequency'
                    }
                },
                {
                    id: 'affected-scope',
                    question: 'How many people/processes are affected?',
                    criteria: [
                        'Number of users affected',
                        'Departments/teams impacted',
                        'Customer segments affected',
                        'Geographic spread',
                        'System dependencies mapped'
                    ],
                    weight: 20,
                    grading: {
                        excellent: 'Complete scope mapping with numbers',
                        good: 'Good scope understanding',
                        fair: 'Basic scope identified',
                        poor: 'Unclear scope'
                    }
                },
                {
                    id: 'solution-effort',
                    question: 'What effort is required to solve?',
                    criteria: [
                        'Development effort estimated',
                        'Resource requirements defined',
                        'Timeline established',
                        'Cost budgeted',
                        'Risk factors identified'
                    ],
                    weight: 15,
                    grading: {
                        excellent: 'Complete effort estimation',
                        good: 'Good effort understanding',
                        fair: 'Basic effort assessment',
                        poor: 'Unknown effort required'
                    }
                },
                {
                    id: 'strategic-value',
                    question: 'What is the strategic value of solving this?',
                    criteria: [
                        'Competitive advantage gained',
                        'Market position improved',
                        'Customer satisfaction impact',
                        'Brand value enhancement',
                        'Long-term growth enabled'
                    ],
                    weight: 10,
                    grading: {
                        excellent: 'Clear strategic value articulated',
                        good: 'Good strategic alignment',
                        fair: 'Some strategic value',
                        poor: 'Unclear strategic value'
                    }
                }
            ]
        }
    },

    // Map worksheet fields to evaluation questions
    fieldMapping: {
        'who-affected': ['target-customer', 'affected-scope'],
        'what-problem': ['problem-definition', 'problem-severity'],
        'when-occur': ['context-triggers', 'frequency'],
        'what-impact': ['impact-metrics', 'impact-severity', 'strategic-value'],
        'how-solving': ['current-solutions', 'solution-effort'],
        'evidence-validation': ['evidence-quality', 'willingness-to-pay', 'solution-feasibility', 'market-size']
    },

    // Check if answer addresses a criterion
    checkCriterion(text, criterion) {
        if (!text) return false;
        
        const lowerText = text.toLowerCase();
        const criterionLower = criterion.toLowerCase();
        
        // Keywords to look for based on criterion
        const keywordMap = {
            'industry': ['saas', 'b2b', 'software', 'tech', 'startup', 'enterprise', 'retail', 'healthcare'],
            'size': ['employees', 'revenue', 'series', 'seed', 'growth', 'enterprise', 'smb', 'mid-market'],
            'role': ['founder', 'ceo', 'cto', 'vp', 'director', 'manager', 'leader', 'head'],
            'geographic': ['global', 'us', 'europe', 'asia', 'regional', 'local', 'international'],
            'financial': ['$', 'dollar', 'revenue', 'cost', 'budget', 'million', 'thousand', 'roi'],
            'time': ['hours', 'days', 'weeks', 'months', 'annual', 'quarterly', 'daily', 'weekly'],
            'quantified': ['%', 'percent', 'number', 'rate', 'ratio', 'score', 'metric'],
            'evidence': ['interview', 'survey', 'study', 'research', 'data', 'validated', 'confirmed'],
            'alternatives': ['current', 'existing', 'alternative', 'competitor', 'solution', 'tool', 'platform']
        };
        
        // Check for relevant keywords
        for (const [category, keywords] of Object.entries(keywordMap)) {
            if (criterionLower.includes(category)) {
                return keywords.some(keyword => lowerText.includes(keyword));
            }
        }
        
        // Check for specific numbers or metrics
        if (criterionLower.includes('quantified') || criterionLower.includes('measured')) {
            return /\d+/.test(text) || text.includes('%') || text.includes('$');
        }
        
        // Default check - does the text mention the criterion concept?
        const criterionWords = criterionLower.split(/\s+/);
        return criterionWords.some(word => lowerText.includes(word));
    },

    // Evaluate worksheet answers against template questions
    evaluateTemplate(templateName, worksheetData) {
        const template = this.templates[templateName];
        if (!template) return null;

        const evaluation = {
            templateName: templateName,
            timestamp: new Date().toISOString(),
            questions: [],
            totalScore: 0,
            maxScore: 100,
            grade: '',
            overallFeedback: '',
            recommendations: []
        };

        let weightedScore = 0;
        let totalWeight = 0;

        // Evaluate each question
        template.questions.forEach(question => {
            let matchedCriteria = 0;
            let feedback = [];
            let relevantData = '';

            // Find relevant worksheet data for this question
            Object.entries(this.fieldMapping).forEach(([field, mappedQuestions]) => {
                if (mappedQuestions.includes(question.id)) {
                    relevantData += (worksheetData[field] || '') + ' ';
                }
            });

            // Evaluate against criteria
            question.criteria.forEach(criterion => {
                const addressed = this.checkCriterion(relevantData, criterion);
                if (addressed) {
                    matchedCriteria++;
                    feedback.push({ criterion, met: true });
                } else {
                    feedback.push({ criterion, met: false });
                }
            });

            // Calculate score for this question
            const matchPercentage = (matchedCriteria / question.criteria.length) * 100;
            let grade = '';
            let gradeScore = 0;
            
            if (matchPercentage >= 80) {
                grade = 'Excellent';
                gradeScore = 90 + (matchPercentage - 80) / 2; // 90-100
            } else if (matchPercentage >= 60) {
                grade = 'Good';
                gradeScore = 70 + (matchPercentage - 60); // 70-90
            } else if (matchPercentage >= 40) {
                grade = 'Fair';
                gradeScore = 50 + (matchPercentage - 40); // 50-70
            } else {
                grade = 'Needs Improvement';
                gradeScore = matchPercentage * 1.25; // 0-50
            }

            const questionScore = (gradeScore * question.weight) / 100;
            weightedScore += questionScore;
            totalWeight += question.weight;

            evaluation.questions.push({
                id: question.id,
                question: question.question,
                weight: question.weight,
                score: Math.round(gradeScore),
                maxScore: 100,
                grade: grade,
                matchedCriteria: matchedCriteria,
                totalCriteria: question.criteria.length,
                feedback: feedback,
                answer: relevantData.trim().substring(0, 200) + (relevantData.length > 200 ? '...' : '')
            });
        });

        // Calculate final score
        evaluation.totalScore = Math.round(weightedScore);
        
        // Determine overall grade
        if (evaluation.totalScore >= 85) {
            evaluation.grade = 'A';
            evaluation.overallFeedback = 'Excellent problem definition with comprehensive validation';
        } else if (evaluation.totalScore >= 75) {
            evaluation.grade = 'B';
            evaluation.overallFeedback = 'Good problem understanding with solid foundation';
        } else if (evaluation.totalScore >= 65) {
            evaluation.grade = 'C';
            evaluation.overallFeedback = 'Adequate problem definition but needs strengthening';
        } else if (evaluation.totalScore >= 55) {
            evaluation.grade = 'D';
            evaluation.overallFeedback = 'Basic problem understanding requiring significant improvement';
        } else {
            evaluation.grade = 'F';
            evaluation.overallFeedback = 'Insufficient problem definition - major gaps to address';
        }

        // Generate recommendations
        evaluation.questions.forEach(q => {
            if (q.score < 70) {
                const unmetCriteria = q.feedback.filter(f => !f.met).map(f => f.criterion);
                if (unmetCriteria.length > 0) {
                    evaluation.recommendations.push({
                        area: q.question,
                        priority: q.score < 50 ? 'HIGH' : 'MEDIUM',
                        suggestion: `Address: ${unmetCriteria.slice(0, 2).join(', ')}`,
                        impact: `Could improve score by ${Math.min(30, 100 - q.score)} points`
                    });
                }
            }
        });

        return evaluation;
    },

    // Generate polished HTML report with ST6 branding
    generateTemplateReport(evaluation) {
        const scoreColor = evaluation.totalScore >= 80 ? '#4CAF50' : 
                          evaluation.totalScore >= 60 ? '#FF9800' : '#F44336';
        
        return `
            <div class="template-report" style="font-family: 'Inter', sans-serif; color: #fff; background: #000; padding: 30px;">
                <!-- Header with ST6 Branding -->
                <div style="background: linear-gradient(135deg, #FF5500, #FF8844); padding: 30px; border-radius: 15px; margin-bottom: 30px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h1 style="margin: 0; font-size: 32px; font-weight: 800;">ScaleTeam6</h1>
                            <h2 style="margin: 10px 0 0 0; font-size: 24px; font-weight: 600;">${evaluation.templateName}</h2>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 48px; font-weight: 800; color: #fff;">${evaluation.totalScore}%</div>
                            <div style="font-size: 24px; font-weight: 600; background: rgba(0,0,0,0.3); padding: 5px 15px; border-radius: 20px; display: inline-block;">Grade: ${evaluation.grade}</div>
                        </div>
                    </div>
                </div>

                <!-- Overall Assessment -->
                <div style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                    <h3 style="color: #FF5500; margin-bottom: 15px; font-size: 20px;">Overall Assessment</h3>
                    <p style="font-size: 16px; line-height: 1.6; color: #ccc;">${evaluation.overallFeedback}</p>
                </div>

                <!-- Question-by-Question Breakdown -->
                <div style="margin-bottom: 30px;">
                    <h3 style="color: #FF5500; margin-bottom: 20px; font-size: 20px;">Detailed Evaluation</h3>
                    ${evaluation.questions.map(q => `
                        <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px; padding: 20px; margin-bottom: 20px;">
                            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                                <div style="flex: 1;">
                                    <h4 style="color: #fff; margin: 0 0 5px 0; font-size: 16px;">${q.question}</h4>
                                    <div style="color: #999; font-size: 14px;">Weight: ${q.weight}%</div>
                                </div>
                                <div style="text-align: right;">
                                    <div style="font-size: 28px; font-weight: 700; color: ${q.score >= 80 ? '#4CAF50' : q.score >= 60 ? '#FF9800' : '#F44336'};">
                                        ${q.score}%
                                    </div>
                                    <div style="font-size: 14px; color: #999;">${q.grade}</div>
                                </div>
                            </div>
                            
                            <!-- Criteria Checklist -->
                            <div style="background: rgba(0, 0, 0, 0.3); border-radius: 8px; padding: 15px; margin-bottom: 15px;">
                                <div style="font-size: 13px; color: #999; margin-bottom: 10px;">Criteria Met: ${q.matchedCriteria}/${q.totalCriteria}</div>
                                <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                                    ${q.feedback.map(f => `
                                        <div style="display: flex; align-items: center; gap: 5px; padding: 5px 10px; background: ${f.met ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)'}; border-radius: 15px; font-size: 12px;">
                                            <span style="color: ${f.met ? '#4CAF50' : '#F44336'};">${f.met ? '✓' : '✗'}</span>
                                            <span style="color: #ccc;">${f.criterion}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                            
                            <!-- Answer Preview -->
                            <div style="background: rgba(255, 85, 0, 0.05); border-left: 3px solid #FF5500; padding: 12px; border-radius: 5px;">
                                <div style="font-size: 12px; color: #FF5500; margin-bottom: 5px;">Your Answer:</div>
                                <div style="font-size: 13px; color: #ccc; line-height: 1.5;">${q.answer}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- Recommendations -->
                ${evaluation.recommendations.length > 0 ? `
                    <div style="background: rgba(255, 85, 0, 0.1); border: 2px solid #FF5500; border-radius: 12px; padding: 25px;">
                        <h3 style="color: #FF5500; margin-bottom: 20px; font-size: 20px;">Recommendations for Improvement</h3>
                        ${evaluation.recommendations.map(rec => `
                            <div style="background: rgba(0, 0, 0, 0.5); border-radius: 8px; padding: 15px; margin-bottom: 15px;">
                                <div style="display: flex; justify-content: space-between; align-items: start;">
                                    <div>
                                        <div style="color: #fff; font-weight: 600; margin-bottom: 5px;">${rec.area}</div>
                                        <div style="color: #ccc; font-size: 14px;">${rec.suggestion}</div>
                                    </div>
                                    <div style="text-align: right;">
                                        <span style="background: ${rec.priority === 'HIGH' ? '#F44336' : '#FF9800'}; color: #fff; padding: 4px 12px; border-radius: 15px; font-size: 11px; font-weight: 600;">
                                            ${rec.priority}
                                        </span>
                                        <div style="color: #4CAF50; font-size: 12px; margin-top: 5px;">${rec.impact}</div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}

                <!-- Footer -->
                <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1); text-align: center; color: #666; font-size: 12px;">
                    <p>Generated by ScaleTeam6 NexusOps Platform</p>
                    <p>${new Date().toLocaleString()}</p>
                </div>
            </div>
        `;
    }
};

console.log('✅ Template Evaluation Engine loaded - Professional grade assessment ready');
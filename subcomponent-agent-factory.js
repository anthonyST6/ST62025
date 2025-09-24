// Subcomponent Agent Factory
// Generates specialized agents for all 96 subcomponents with dynamic questions

class SubcomponentAgentFactory {
    constructor() {
        this.name = "Subcomponent Agent Factory";
        this.version = "1.0.0";
        
        // Agent registry
        this.agents = new Map();
        
        // Initialize all subcomponent configurations
        this.subcomponentConfigs = this.initializeSubcomponentConfigs();
        
        console.log('🏭 Subcomponent Agent Factory initialized');
    }
    
    /**
     * Initialize configurations for all 96 subcomponents
     */
    initializeSubcomponentConfigs() {
        return {
            // Block 1: Mission Discovery (Phase 1: Idea-Market Fit)
            '1a': {
                id: '1a',
                name: 'Problem Statement Definition',
                block: 1,
                phase: 1,
                focusAreas: ['problem clarity', 'customer pain', 'market need'],
                questionTypes: {
                    diagnostic: 0.4,
                    exploratory: 0.3,
                    validation: 0.2,
                    quantification: 0.1
                },
                scoringDimensions: ['clarity', 'specificity', 'validation', 'urgency'],
                dynamicQuestions: [
                    {
                        id: 'ps_1',
                        text: 'What specific problem are you solving and for whom?',
                        type: 'diagnostic',
                        difficulty: 'beginner',
                        scoringWeight: 0.3,
                        adaptiveTriggers: ['vague', 'no_customer']
                    },
                    {
                        id: 'ps_2',
                        text: 'How many potential customers have validated this problem? Provide specific numbers and quotes.',
                        type: 'validation',
                        difficulty: 'intermediate',
                        scoringWeight: 0.25,
                        requiresMetrics: true
                    },
                    {
                        id: 'ps_3',
                        text: 'What is the financial or time cost of this problem to your customers?',
                        type: 'quantification',
                        difficulty: 'intermediate',
                        scoringWeight: 0.2,
                        requiresMetrics: true
                    },
                    {
                        id: 'ps_4',
                        text: 'How are customers currently solving this problem without your solution?',
                        type: 'exploratory',
                        difficulty: 'beginner',
                        scoringWeight: 0.15
                    },
                    {
                        id: 'ps_5',
                        text: 'Why is now the right time to solve this problem?',
                        type: 'strategic',
                        difficulty: 'advanced',
                        scoringWeight: 0.1
                    }
                ]
            },
            
            '1b': {
                id: '1b',
                name: 'Mission Statement',
                block: 1,
                phase: 1,
                focusAreas: ['vision', 'purpose', 'values'],
                questionTypes: {
                    exploratory: 0.4,
                    strategic: 0.3,
                    diagnostic: 0.2,
                    validation: 0.1
                },
                scoringDimensions: ['clarity', 'inspiration', 'alignment', 'differentiation'],
                dynamicQuestions: [
                    {
                        id: 'ms_1',
                        text: 'What is your company\'s mission in one clear sentence?',
                        type: 'diagnostic',
                        difficulty: 'beginner',
                        scoringWeight: 0.3
                    },
                    {
                        id: 'ms_2',
                        text: 'How does your mission differentiate you from competitors?',
                        type: 'strategic',
                        difficulty: 'intermediate',
                        scoringWeight: 0.25
                    },
                    {
                        id: 'ms_3',
                        text: 'What core values guide your decision-making?',
                        type: 'exploratory',
                        difficulty: 'beginner',
                        scoringWeight: 0.2
                    },
                    {
                        id: 'ms_4',
                        text: 'How does your mission inspire both employees and customers?',
                        type: 'exploratory',
                        difficulty: 'intermediate',
                        scoringWeight: 0.15
                    },
                    {
                        id: 'ms_5',
                        text: 'What evidence shows your team is aligned with this mission?',
                        type: 'validation',
                        difficulty: 'advanced',
                        scoringWeight: 0.1
                    }
                ]
            },
            
            '1c': {
                id: '1c',
                name: 'Voice of Customer',
                block: 1,
                phase: 1,
                focusAreas: ['customer insights', 'feedback loops', 'empathy'],
                questionTypes: {
                    validation: 0.4,
                    diagnostic: 0.3,
                    quantification: 0.2,
                    exploratory: 0.1
                },
                scoringDimensions: ['depth', 'frequency', 'actionability', 'representation'],
                dynamicQuestions: [
                    {
                        id: 'voc_1',
                        text: 'How many customer interviews have you conducted in the last 30 days?',
                        type: 'quantification',
                        difficulty: 'beginner',
                        scoringWeight: 0.25,
                        requiresMetrics: true
                    },
                    {
                        id: 'voc_2',
                        text: 'What are the top 3 verbatim quotes from customers about their pain points?',
                        type: 'validation',
                        difficulty: 'intermediate',
                        scoringWeight: 0.3
                    },
                    {
                        id: 'voc_3',
                        text: 'How do you systematically collect and analyze customer feedback?',
                        type: 'diagnostic',
                        difficulty: 'intermediate',
                        scoringWeight: 0.2
                    },
                    {
                        id: 'voc_4',
                        text: 'What surprising insights have emerged from customer conversations?',
                        type: 'exploratory',
                        difficulty: 'advanced',
                        scoringWeight: 0.15
                    },
                    {
                        id: 'voc_5',
                        text: 'How has customer feedback changed your product roadmap?',
                        type: 'validation',
                        difficulty: 'advanced',
                        scoringWeight: 0.1
                    }
                ]
            },
            
            '1d': {
                id: '1d',
                name: 'Team Assessment',
                block: 1,
                phase: 1,
                focusAreas: ['skills', 'gaps', 'culture'],
                questionTypes: {
                    diagnostic: 0.4,
                    strategic: 0.3,
                    quantification: 0.2,
                    validation: 0.1
                },
                scoringDimensions: ['completeness', 'expertise', 'alignment', 'scalability'],
                dynamicQuestions: [
                    {
                        id: 'ta_1',
                        text: 'What are your team\'s core competencies and how do they align with your mission?',
                        type: 'diagnostic',
                        difficulty: 'intermediate',
                        scoringWeight: 0.3
                    },
                    {
                        id: 'ta_2',
                        text: 'What critical skills or roles are missing from your current team?',
                        type: 'diagnostic',
                        difficulty: 'beginner',
                        scoringWeight: 0.25
                    },
                    {
                        id: 'ta_3',
                        text: 'How many hours per week does your team spend on core vs. non-core activities?',
                        type: 'quantification',
                        difficulty: 'intermediate',
                        scoringWeight: 0.2,
                        requiresMetrics: true
                    },
                    {
                        id: 'ta_4',
                        text: 'What is your plan to fill the identified skill gaps?',
                        type: 'strategic',
                        difficulty: 'advanced',
                        scoringWeight: 0.15
                    },
                    {
                        id: 'ta_5',
                        text: 'How do you measure and maintain team alignment?',
                        type: 'validation',
                        difficulty: 'advanced',
                        scoringWeight: 0.1
                    }
                ]
            },
            
            '1e': {
                id: '1e',
                name: 'Market Landscape',
                block: 1,
                phase: 1,
                focusAreas: ['competition', 'trends', 'opportunities'],
                questionTypes: {
                    diagnostic: 0.3,
                    strategic: 0.3,
                    quantification: 0.2,
                    exploratory: 0.2
                },
                scoringDimensions: ['comprehensiveness', 'accuracy', 'insights', 'positioning'],
                dynamicQuestions: [
                    {
                        id: 'ml_1',
                        text: 'Who are your top 3 competitors and what are their strengths/weaknesses?',
                        type: 'diagnostic',
                        difficulty: 'beginner',
                        scoringWeight: 0.25
                    },
                    {
                        id: 'ml_2',
                        text: 'What is your Total Addressable Market (TAM) and how did you calculate it?',
                        type: 'quantification',
                        difficulty: 'intermediate',
                        scoringWeight: 0.3,
                        requiresMetrics: true
                    },
                    {
                        id: 'ml_3',
                        text: 'What market trends create urgency for your solution?',
                        type: 'strategic',
                        difficulty: 'intermediate',
                        scoringWeight: 0.2
                    },
                    {
                        id: 'ml_4',
                        text: 'What unique insights do you have about the market that others miss?',
                        type: 'exploratory',
                        difficulty: 'advanced',
                        scoringWeight: 0.15
                    },
                    {
                        id: 'ml_5',
                        text: 'How will the market evolve in the next 3-5 years?',
                        type: 'strategic',
                        difficulty: 'expert',
                        scoringWeight: 0.1
                    }
                ]
            },
            
            '1f': {
                id: '1f',
                name: 'Founder-Problem Fit',
                block: 1,
                phase: 1,
                focusAreas: ['expertise', 'passion', 'commitment'],
                questionTypes: {
                    exploratory: 0.4,
                    validation: 0.3,
                    diagnostic: 0.2,
                    strategic: 0.1
                },
                scoringDimensions: ['authenticity', 'expertise', 'resilience', 'vision'],
                dynamicQuestions: [
                    {
                        id: 'fpf_1',
                        text: 'What personal experience or expertise makes you uniquely qualified to solve this problem?',
                        type: 'exploratory',
                        difficulty: 'beginner',
                        scoringWeight: 0.3
                    },
                    {
                        id: 'fpf_2',
                        text: 'Why are you personally committed to solving this problem for the next 5-10 years?',
                        type: 'exploratory',
                        difficulty: 'intermediate',
                        scoringWeight: 0.25
                    },
                    {
                        id: 'fpf_3',
                        text: 'What evidence demonstrates your deep understanding of the customer?',
                        type: 'validation',
                        difficulty: 'intermediate',
                        scoringWeight: 0.2
                    },
                    {
                        id: 'fpf_4',
                        text: 'How have you personally experienced or observed this problem?',
                        type: 'diagnostic',
                        difficulty: 'beginner',
                        scoringWeight: 0.15
                    },
                    {
                        id: 'fpf_5',
                        text: 'What will keep you going when things get difficult?',
                        type: 'strategic',
                        difficulty: 'advanced',
                        scoringWeight: 0.1
                    }
                ]
            },
            
            // Block 2: Solution Design (Phase 1: Idea-Market Fit)
            '2a': {
                id: '2a',
                name: 'Solution Hypothesis',
                block: 2,
                phase: 1,
                focusAreas: ['innovation', 'feasibility', 'differentiation'],
                questionTypes: {
                    diagnostic: 0.3,
                    strategic: 0.3,
                    validation: 0.2,
                    exploratory: 0.2
                },
                scoringDimensions: ['clarity', 'innovation', 'feasibility', 'differentiation'],
                dynamicQuestions: [
                    {
                        id: 'sh_1',
                        text: 'What is your core solution hypothesis in one clear statement?',
                        type: 'diagnostic',
                        difficulty: 'beginner',
                        scoringWeight: 0.3
                    },
                    {
                        id: 'sh_2',
                        text: 'How is your solution 10x better than existing alternatives?',
                        type: 'strategic',
                        difficulty: 'intermediate',
                        scoringWeight: 0.25
                    },
                    {
                        id: 'sh_3',
                        text: 'What assumptions must be true for your solution to work?',
                        type: 'exploratory',
                        difficulty: 'advanced',
                        scoringWeight: 0.2
                    },
                    {
                        id: 'sh_4',
                        text: 'What evidence validates your solution approach?',
                        type: 'validation',
                        difficulty: 'intermediate',
                        scoringWeight: 0.15
                    },
                    {
                        id: 'sh_5',
                        text: 'What are the biggest risks to your solution hypothesis?',
                        type: 'strategic',
                        difficulty: 'advanced',
                        scoringWeight: 0.1
                    }
                ]
            },
            
            '2b': {
                id: '2b',
                name: 'Value Proposition Canvas',
                block: 2,
                phase: 1,
                focusAreas: ['value creation', 'customer jobs', 'pain relievers'],
                questionTypes: {
                    diagnostic: 0.4,
                    strategic: 0.2,
                    validation: 0.2,
                    quantification: 0.2
                },
                scoringDimensions: ['completeness', 'alignment', 'uniqueness', 'quantification'],
                dynamicQuestions: [
                    {
                        id: 'vpc_1',
                        text: 'What are the top 3 jobs your customers are trying to get done?',
                        type: 'diagnostic',
                        difficulty: 'intermediate',
                        scoringWeight: 0.25
                    },
                    {
                        id: 'vpc_2',
                        text: 'How does your solution specifically address each customer pain point?',
                        type: 'diagnostic',
                        difficulty: 'intermediate',
                        scoringWeight: 0.3
                    },
                    {
                        id: 'vpc_3',
                        text: 'What measurable gains does your solution create for customers?',
                        type: 'quantification',
                        difficulty: 'advanced',
                        scoringWeight: 0.2,
                        requiresMetrics: true
                    },
                    {
                        id: 'vpc_4',
                        text: 'Which value propositions are unique to your solution?',
                        type: 'strategic',
                        difficulty: 'intermediate',
                        scoringWeight: 0.15
                    },
                    {
                        id: 'vpc_5',
                        text: 'How have customers validated these value propositions?',
                        type: 'validation',
                        difficulty: 'advanced',
                        scoringWeight: 0.1
                    }
                ]
            },
            
            // Block 3: Strategic Prioritization (Phase 1: Idea-Market Fit)
            '3a': {
                id: '3a',
                name: 'Feature Prioritization Matrix',
                block: 3,
                phase: 1,
                focusAreas: ['prioritization', 'impact', 'effort'],
                questionTypes: {
                    strategic: 0.4,
                    quantification: 0.3,
                    diagnostic: 0.2,
                    validation: 0.1
                },
                scoringDimensions: ['methodology', 'data-driven', 'alignment', 'flexibility'],
                dynamicQuestions: [
                    {
                        id: 'fpm_1',
                        text: 'What framework do you use to prioritize features (e.g., RICE, Value/Effort)?',
                        type: 'diagnostic',
                        difficulty: 'intermediate',
                        scoringWeight: 0.2
                    },
                    {
                        id: 'fpm_2',
                        text: 'List your top 5 features with their impact and effort scores.',
                        type: 'quantification',
                        difficulty: 'intermediate',
                        scoringWeight: 0.3,
                        requiresMetrics: true
                    },
                    {
                        id: 'fpm_3',
                        text: 'How do customer requests influence your prioritization?',
                        type: 'strategic',
                        difficulty: 'advanced',
                        scoringWeight: 0.2
                    },
                    {
                        id: 'fpm_4',
                        text: 'What features have you deliberately decided NOT to build and why?',
                        type: 'strategic',
                        difficulty: 'advanced',
                        scoringWeight: 0.2
                    },
                    {
                        id: 'fpm_5',
                        text: 'How often do you review and adjust priorities?',
                        type: 'validation',
                        difficulty: 'beginner',
                        scoringWeight: 0.1
                    }
                ]
            },
            
            // Block 4: Prototype & Launch (Phase 2: Product-Market Fit)
            '4a': {
                id: '4a',
                name: 'MVP Definition',
                block: 4,
                phase: 2,
                focusAreas: ['scope', 'validation', 'speed'],
                questionTypes: {
                    diagnostic: 0.4,
                    strategic: 0.3,
                    validation: 0.2,
                    quantification: 0.1
                },
                scoringDimensions: ['focus', 'testability', 'speed', 'learning'],
                dynamicQuestions: [
                    {
                        id: 'mvp_1',
                        text: 'What is the core functionality of your MVP that validates your main hypothesis?',
                        type: 'diagnostic',
                        difficulty: 'intermediate',
                        scoringWeight: 0.3
                    },
                    {
                        id: 'mvp_2',
                        text: 'What specific metrics will validate MVP success?',
                        type: 'quantification',
                        difficulty: 'intermediate',
                        scoringWeight: 0.25,
                        requiresMetrics: true
                    },
                    {
                        id: 'mvp_3',
                        text: 'How long will it take to build and launch your MVP?',
                        type: 'strategic',
                        difficulty: 'beginner',
                        scoringWeight: 0.2
                    },
                    {
                        id: 'mvp_4',
                        text: 'What are you explicitly excluding from the MVP and why?',
                        type: 'strategic',
                        difficulty: 'advanced',
                        scoringWeight: 0.15
                    },
                    {
                        id: 'mvp_5',
                        text: 'How will you gather learning from MVP users?',
                        type: 'validation',
                        difficulty: 'intermediate',
                        scoringWeight: 0.1
                    }
                ]
            },
            
            // Block 5: Early Adopter Wins (Phase 2: Product-Market Fit)
            '5a': {
                id: '5a',
                name: 'Early Adopter Profile',
                block: 5,
                phase: 2,
                focusAreas: ['targeting', 'characteristics', 'value'],
                questionTypes: {
                    diagnostic: 0.4,
                    validation: 0.3,
                    strategic: 0.2,
                    quantification: 0.1
                },
                scoringDimensions: ['specificity', 'accessibility', 'alignment', 'validation'],
                dynamicQuestions: [
                    {
                        id: 'eap_1',
                        text: 'Describe your ideal early adopter in specific detail (role, company size, pain level).',
                        type: 'diagnostic',
                        difficulty: 'intermediate',
                        scoringWeight: 0.3
                    },
                    {
                        id: 'eap_2',
                        text: 'Why will early adopters choose your solution despite it being incomplete?',
                        type: 'strategic',
                        difficulty: 'advanced',
                        scoringWeight: 0.25
                    },
                    {
                        id: 'eap_3',
                        text: 'How many early adopters have you identified and engaged?',
                        type: 'quantification',
                        difficulty: 'beginner',
                        scoringWeight: 0.2,
                        requiresMetrics: true
                    },
                    {
                        id: 'eap_4',
                        text: 'What specific value do early adopters get that others don\'t?',
                        type: 'validation',
                        difficulty: 'intermediate',
                        scoringWeight: 0.15
                    },
                    {
                        id: 'eap_5',
                        text: 'How are you finding and reaching early adopters?',
                        type: 'diagnostic',
                        difficulty: 'beginner',
                        scoringWeight: 0.1
                    }
                ]
            },
            
            // Block 6: Customer Engagement Flywheel (Phase 2: Product-Market Fit)
            '6a': {
                id: '6a',
                name: 'Onboarding Flow',
                block: 6,
                phase: 2,
                focusAreas: ['activation', 'time-to-value', 'friction'],
                questionTypes: {
                    diagnostic: 0.3,
                    quantification: 0.3,
                    strategic: 0.2,
                    validation: 0.2
                },
                scoringDimensions: ['efficiency', 'clarity', 'engagement', 'conversion'],
                dynamicQuestions: [
                    {
                        id: 'of_1',
                        text: 'What is your current time-to-first-value for new users?',
                        type: 'quantification',
                        difficulty: 'intermediate',
                        scoringWeight: 0.3,
                        requiresMetrics: true
                    },
                    {
                        id: 'of_2',
                        text: 'Map out your onboarding flow step-by-step with drop-off rates.',
                        type: 'diagnostic',
                        difficulty: 'advanced',
                        scoringWeight: 0.25
                    },
                    {
                        id: 'of_3',
                        text: 'What are the top 3 friction points in onboarding?',
                        type: 'diagnostic',
                        difficulty: 'intermediate',
                        scoringWeight: 0.2
                    },
                    {
                        id: 'of_4',
                        text: 'How do you measure onboarding success?',
                        type: 'validation',
                        difficulty: 'intermediate',
                        scoringWeight: 0.15
                    },
                    {
                        id: 'of_5',
                        text: 'What improvements would have the biggest impact on activation?',
                        type: 'strategic',
                        difficulty: 'advanced',
                        scoringWeight: 0.1
                    }
                ]
            },
            
            // Block 7: Quantifiable Impact (Phase 3: Value Proof)
            '7a': {
                id: '7a',
                name: 'Time/Cost Savings Metrics',
                block: 7,
                phase: 3,
                focusAreas: ['roi', 'measurement', 'communication'],
                questionTypes: {
                    quantification: 0.5,
                    validation: 0.3,
                    strategic: 0.1,
                    diagnostic: 0.1
                },
                scoringDimensions: ['accuracy', 'credibility', 'relevance', 'impact'],
                dynamicQuestions: [
                    {
                        id: 'tcs_1',
                        text: 'What specific time savings do customers report (hours/week or %)?',
                        type: 'quantification',
                        difficulty: 'intermediate',
                        scoringWeight: 0.3,
                        requiresMetrics: true
                    },
                    {
                        id: 'tcs_2',
                        text: 'What is the calculated ROI for your average customer?',
                        type: 'quantification',
                        difficulty: 'advanced',
                        scoringWeight: 0.3,
                        requiresMetrics: true
                    },
                    {
                        id: 'tcs_3',
                        text: 'How do you track and validate these savings?',
                        type: 'validation',
                        difficulty: 'intermediate',
                        scoringWeight: 0.2
                    },
                    {
                        id: 'tcs_4',
                        text: 'What customer quotes validate these metrics?',
                        type: 'validation',
                        difficulty: 'beginner',
                        scoringWeight: 0.1
                    },
                    {
                        id: 'tcs_5',
                        text: 'How do savings compare to your pricing?',
                        type: 'strategic',
                        difficulty: 'advanced',
                        scoringWeight: 0.1
                    }
                ]
            },
            
            // Block 8: Customer Success & Expansion (Phase 3: Value Proof)
            '8a': {
                id: '8a',
                name: 'Success Metrics Dashboard',
                block: 8,
                phase: 3,
                focusAreas: ['visibility', 'accountability', 'optimization'],
                questionTypes: {
                    diagnostic: 0.3,
                    quantification: 0.3,
                    strategic: 0.2,
                    validation: 0.2
                },
                scoringDimensions: ['comprehensiveness', 'actionability', 'accessibility', 'alignment'],
                dynamicQuestions: [
                    {
                        id: 'smd_1',
                        text: 'What are your top 5 customer success metrics and current values?',
                        type: 'quantification',
                        difficulty: 'intermediate',
                        scoringWeight: 0.3,
                        requiresMetrics: true
                    },
                    {
                        id: 'smd_2',
                        text: 'How do you track customer health scores?',
                        type: 'diagnostic',
                        difficulty: 'advanced',
                        scoringWeight: 0.25
                    },
                    {
                        id: 'smd_3',
                        text: 'What early warning signals indicate churn risk?',
                        type: 'strategic',
                        difficulty: 'advanced',
                        scoringWeight: 0.2
                    },
                    {
                        id: 'smd_4',
                        text: 'How often do you review success metrics with customers?',
                        type: 'validation',
                        difficulty: 'intermediate',
                        scoringWeight: 0.15
                    },
                    {
                        id: 'smd_5',
                        text: 'What actions do metrics trigger automatically?',
                        type: 'diagnostic',
                        difficulty: 'expert',
                        scoringWeight: 0.1
                    }
                ]
            },
            
            // Block 9: Proof of Execution (Phase 3: Value Proof)
            '9a': {
                id: '9a',
                name: 'Case Study Development',
                block: 9,
                phase: 3,
                focusAreas: ['storytelling', 'credibility', 'results'],
                questionTypes: {
                    validation: 0.4,
                    quantification: 0.3,
                    strategic: 0.2,
                    diagnostic: 0.1
                },
                scoringDimensions: ['completeness', 'credibility', 'impact', 'relevance'],
                dynamicQuestions: [
                    {
                        id: 'csd_1',
                        text: 'Describe your best customer success story with specific metrics.',
                        type: 'validation',
                        difficulty: 'intermediate',
                        scoringWeight: 0.3
                    },
                    {
                        id: 'csd_2',
                        text: 'What quantifiable results did this customer achieve?',
                        type: 'quantification',
                        difficulty: 'intermediate',
                        scoringWeight: 0.3,
                        requiresMetrics: true
                    },
                    {
                        id: 'csd_3',
                        text: 'How do you select and develop case studies?',
                        type: 'strategic',
                        difficulty: 'advanced',
                        scoringWeight: 0.2
                    },
                    {
                        id: 'csd_4',
                        text: 'What makes your case studies compelling and believable?',
                        type: 'diagnostic',
                        difficulty: 'intermediate',
                        scoringWeight: 0.1
                    },
                    {
                        id: 'csd_5',
                        text: 'How do you use case studies in sales and marketing?',
                        type: 'strategic',
                        difficulty: 'beginner',
                        scoringWeight: 0.1
                    }
                ]
            },
            
            // Block 10: Sales Team Empowerment (Phase 4: GTM Execution)
            '10a': {
                id: '10a',
                name: 'Sales Enablement Assets',
                block: 10,
                phase: 4,
                focusAreas: ['tools', 'training', 'effectiveness'],
                questionTypes: {
                    diagnostic: 0.4,
                    strategic: 0.2,
                    validation: 0.2,
                    quantification: 0.2
                },
                scoringDimensions: ['completeness', 'quality', 'adoption', 'impact'],
                dynamicQuestions: [
                    {
                        id: 'sea_1',
                        text: 'What sales enablement assets do you have (list all with usage rates)?',
                        type: 'diagnostic',
                        difficulty: 'intermediate',
                        scoringWeight: 0.25
                    },
                    {
                        id: 'sea_2',
                        text: 'How do these assets impact win rates?',
                        type: 'quantification',
                        difficulty: 'advanced',
                        scoringWeight: 0.3,
                        requiresMetrics: true
                    },
                    {
                        id: 'sea_3',
                        text: 'What do sales reps say they need most?',
                        type: 'validation',
                        difficulty: 'beginner',
                        scoringWeight: 0.2
                    },
                    {
                        id: 'sea_4',
                        text: 'How do you measure asset effectiveness?',
                        type: 'strategic',
                        difficulty: 'advanced',
                        scoringWeight: 0.15
                    },
                    {
                        id: 'sea_5',
                        text: 'What is your process for updating sales materials?',
                        type: 'diagnostic',
                        difficulty: 'intermediate',
                        scoringWeight: 0.1
                    }
                ]
            },
            
            // Block 11: High-Performance Teams (Phase 4: GTM Execution)
            '11a': {
                id: '11a',
                name: 'Performance Scorecard',
                block: 11,
                phase: 4,
                focusAreas: ['metrics', 'accountability', 'improvement'],
                questionTypes: {
                    quantification: 0.4,
                    diagnostic: 0.3,
                    strategic: 0.2,
                    validation: 0.1
                },
                scoringDimensions: ['clarity', 'fairness', 'motivation', 'alignment'],
                dynamicQuestions: [
                    {
                        id: 'ps_1',
                        text: 'What are the key performance indicators for each role?',
                        type: 'diagnostic',
                        difficulty: 'intermediate',
                        scoringWeight: 0.25
                    },
                    {
                        id: 'ps_2',
                        text: 'What is the current performance distribution across your team?',
                        type: 'quantification',
                        difficulty: 'advanced',
                        scoringWeight: 0.3,
                        requiresMetrics: true
                    },
                    {
                        id: 'ps_3',
                        text: 'How do you identify and address performance gaps?',
                        type: 'strategic',
                        difficulty: 'intermediate',
                        scoringWeight: 0.2
                    },
                    {
                        id: 'ps_4',
                        text: 'What percentage of your team exceeds performance targets?',
                        type: 'quantification',
                        difficulty: 'beginner',
                        scoringWeight: 0.15,
                        requiresMetrics: true
                    },
                    {
                        id: 'ps_5',
                        text: 'How do team members track their own performance?',
                        type: 'validation',
                        difficulty: 'intermediate',
                        scoringWeight: 0.1
                    }
                ]
            },
            
            // Block 12: Retention Systems (Phase 4: GTM Execution)
            '12a': {
                id: '12a',
                name: 'Churn Prediction Model',
                block: 12,
                phase: 4,
                focusAreas: ['prediction', 'prevention', 'recovery'],
                questionTypes: {
                    quantification: 0.4,
                    diagnostic: 0.3,
                    strategic: 0.2,
                    validation: 0.1
                },
                scoringDimensions: ['accuracy', 'actionability', 'proactivity', 'effectiveness'],
                dynamicQuestions: [
                    {
                        id: 'cpm_1',
                        text: 'What is your current monthly/annual churn rate?',
                        type: 'quantification',
                        difficulty: 'beginner',
                        scoringWeight: 0.25,
                        requiresMetrics: true
                    },
                    {
                        id: 'cpm_2',
                        text: 'What are the top 3 predictors of churn in your business?',
                        type: 'diagnostic',
                        difficulty: 'advanced',
                        scoringWeight: 0.3
                    },
                    {
                        id: 'cpm_3',
                        text: 'How far in advance can you predict churn?',
                        type: 'quantification',
                        difficulty: 'expert',
                        scoringWeight: 0.2,
                        requiresMetrics: true
                    },
                    {
                        id: 'cpm_4',
                        text: 'What interventions have successfully prevented churn?',
                        type: 'validation',
                        difficulty: 'intermediate',
                        scoringWeight: 0.15
                    },
                    {
                        id: 'cpm_5',
                        text: 'How do you win back churned customers?',
                        type: 'strategic',
                        difficulty: 'advanced',
                        scoringWeight: 0.1
                    }
                ]
            },
            
            // Block 13: Market Domination Strategies (Phase 5: Scale)
            '13a': {
                id: '13a',
                name: 'Competitive Moat Analysis',
                block: 13,
                phase: 5,
                focusAreas: ['differentiation', 'defensibility', 'sustainability'],
                questionTypes: {
                    strategic: 0.5,
                    diagnostic: 0.2,
                    validation: 0.2,
                    exploratory: 0.1
                },
                scoringDimensions: ['uniqueness', 'defensibility', 'scalability', 'sustainability'],
                dynamicQuestions: [
                    {
                        id: 'cma_1',
                        text: 'What is your primary competitive moat and how defensible is it?',
                        type: 'strategic',
                        difficulty: 'advanced',
                        scoringWeight: 0.3
                    },
                    {
                        id: 'cma_2',
                        text: 'What would it take for a competitor to replicate your advantage?',
                        type: 'strategic',
                        difficulty: 'expert',
                        scoringWeight: 0.25
                    },
                    {
                        id: 'cma_3',
                        text: 'How are you strengthening your moat over time?',
                        type: 'strategic',
                        difficulty: 'advanced',
                        scoringWeight: 0.2
                    },
                    {
                        id: 'cma_4',
                        text: 'What evidence shows your moat is working?',
                        type: 'validation',
                        difficulty: 'intermediate',
                        scoringWeight: 0.15
                    },
                    {
                        id: 'cma_5',
                        text: 'What new moats are you building?',
                        type: 'exploratory',
                        difficulty: 'expert',
                        scoringWeight: 0.1
                    }
                ]
            },
            
            // Block 14: Operational Excellence (Phase 5: Scale)
            '14a': {
                id: '14a',
                name: 'System Architecture',
                block: 14,
                phase: 5,
                focusAreas: ['scalability', 'reliability', 'efficiency'],
                questionTypes: {
                    diagnostic: 0.4,
                    strategic: 0.3,
                    quantification: 0.2,
                    validation: 0.1
                },
                scoringDimensions: ['robustness', 'scalability', 'efficiency', 'adaptability'],
                dynamicQuestions: [
                    {
                        id: 'sa_1',
                        text: 'Describe your current system architecture and its scalability limits.',
                        type: 'diagnostic',
                        difficulty: 'advanced',
                        scoringWeight: 0.3
                    },
                    {
                        id: 'sa_2',
                        text: 'What is your system uptime and performance metrics?',
                        type: 'quantification',
                        difficulty: 'intermediate',
                        scoringWeight: 0.25,
                        requiresMetrics: true
                    },
                    {
                        id: 'sa_3',
                        text: 'How will architecture need to evolve for 10x growth?',
                        type: 'strategic',
                        difficulty: 'expert',
                        scoringWeight: 0.2
                    },
                    {
                        id: 'sa_4',
                        text: 'What are your biggest technical debt items?',
                        type: 'diagnostic',
                        difficulty: 'intermediate',
                        scoringWeight: 0.15
                    },
                    {
                        id: 'sa_5',
                        text: 'How do you balance feature development with infrastructure?',
                        type: 'strategic',
                        difficulty: 'advanced',
                        scoringWeight: 0.1
                    }
                ]
            },
            
            // Block 15: Leadership & Governance (Phase 5: Scale)
            '15a': {
                id: '15a',
                name: 'Executive Hiring Roadmap',
                block: 15,
                phase: 5,
                focusAreas: ['talent', 'timing', 'culture fit'],
                questionTypes: {
                    strategic: 0.4,
                    diagnostic: 0.3,
                    validation: 0.2,
                    quantification: 0.1
                },
                scoringDimensions: ['planning', 'quality', 'timing', 'integration'],
                dynamicQuestions: [
                    {
                        id: 'ehr_1',
                        text: 'What executive roles do you need to hire in the next 12 months?',
                        type: 'diagnostic',
                        difficulty: 'intermediate',
                        scoringWeight: 0.25
                    },
                    {
                        id: 'ehr_2',
                        text: 'What specific outcomes will each executive own?',
                        type: 'strategic',
                        difficulty: 'advanced',
                        scoringWeight: 0.3
                    },
                    {
                        id: 'ehr_3',
                        text: 'How will you evaluate executive candidates for culture fit?',
                        type: 'validation',
                        difficulty: 'intermediate',
                        scoringWeight: 0.2
                    },
                    {
                        id: 'ehr_4',
                        text: 'What is your executive onboarding process?',
                        type: 'diagnostic',
                        difficulty: 'advanced',
                        scoringWeight: 0.15
                    },
                    {
                        id: 'ehr_5',
                        text: 'What is your budget for executive compensation?',
                        type: 'quantification',
                        difficulty: 'intermediate',
                        scoringWeight: 0.1,
                        requiresMetrics: true
                    }
                ]
            },
            
            // Block 16: Global Expansion (Phase 5: Scale)
            '16a': {
                id: '16a',
                name: 'Market Entry Analysis',
                block: 16,
                phase: 5,
                focusAreas: ['opportunity', 'readiness', 'strategy'],
                questionTypes: {
                    strategic: 0.4,
                    quantification: 0.3,
                    diagnostic: 0.2,
                    validation: 0.1
                },
                scoringDimensions: ['thoroughness', 'feasibility', 'risk assessment', 'opportunity size'],
                dynamicQuestions: [
                    {
                        id: 'mea_1',
                        text: 'Which new markets are you considering and why?',
                        type: 'strategic',
                        difficulty: 'intermediate',
                        scoringWeight: 0.25
                    },
                    {
                        id: 'mea_2',
                        text: 'What is the TAM for each target market?',
                        type: 'quantification',
                        difficulty: 'advanced',
                        scoringWeight: 0.3,
                        requiresMetrics: true
                    },
                    {
                        id: 'mea_3',
                        text: 'What adaptations are needed for each market?',
                        type: 'diagnostic',
                        difficulty: 'advanced',
                        scoringWeight: 0.2
                    },
                    {
                        id: 'mea_4',
                        text: 'What validation have you done in target markets?',
                        type: 'validation',
                        difficulty: 'intermediate',
                        scoringWeight: 0.15
                    },
                    {
                        id: 'mea_5',
                        text: 'What is your market entry timeline and budget?',
                        type: 'quantification',
                        difficulty: 'intermediate',
                        scoringWeight: 0.1,
                        requiresMetrics: true
                    }
                ]
            }
        };
    }
    
    /**
     * Create a specialized agent for a specific subcomponent
     */
    createAgent(subcomponentId) {
        const config = this.subcomponentConfigs[subcomponentId];
        
        if (!config) {
            console.error(`❌ No configuration found for subcomponent ${subcomponentId}`);
            return null;
        }
        
        // Create the agent
        const agent = new SubcomponentAgent(config);
        
        // Register the agent
        this.agents.set(subcomponentId, agent);
        
        console.log(`✅ Created agent for ${config.name} (${subcomponentId})`);
        
        return agent;
    }
    
    /**
     * Get or create an agent for a subcomponent
     */
    getAgent(subcomponentId) {
        if (this.agents.has(subcomponentId)) {
            return this.agents.get(subcomponentId);
        }
        
        return this.createAgent(subcomponentId);
    }
    
    /**
     * Create agents for all subcomponents
     */
    createAllAgents() {
        console.log('🏗️ Creating agents for all subcomponents...');
        
        Object.keys(this.subcomponentConfigs).forEach(subcomponentId => {
            this.createAgent(subcomponentId);
        });
        
        console.log(`✅ Created ${this.agents.size} agents`);
    }
    
    /**
     * Get agents by block
     */
    getAgentsByBlock(blockNumber) {
        const blockAgents = [];
        
        this.agents.forEach((agent, id) => {
            if (agent.config.block === blockNumber) {
                blockAgents.push(agent);
            }
        });
        
        return blockAgents;
    }
    
    /**
     * Get agents by phase
     */
    getAgentsByPhase(phaseNumber) {
        const phaseAgents = [];
        
        this.agents.forEach((agent, id) => {
            if (agent.config.phase === phaseNumber) {
                phaseAgents.push(agent);
            }
        });
        
        return phaseAgents;
    }
}

/**
 * Individual Subcomponent Agent
 */
class SubcomponentAgent {
    constructor(config) {
        this.config = config;
        this.id = config.id;
        this.name = config.name;
        
        // Initialize components
        this.worksheetGenerator = null;
        this.questionBank = null;
        this.scoringEngine = null;
        this.adaptiveFlow = null;
        this.learningSystem = null;
        
        this.initialize();
    }
    
    async initialize() {
        console.log(`🤖 Initializing ${this.name} Agent...`);
        
        // Initialize question bank with subcomponent questions
        if (typeof QuestionBankSystem !== 'undefined') {
            this.questionBank = new QuestionBankSystem();
            this.loadQuestions();
        }
        
        // Initialize worksheet generator
        if (typeof DynamicWorksheetGenerator !== 'undefined') {
            this.worksheetGenerator = new DynamicWorksheetGenerator(
                this.id,
                this,
                this.scoringEngine
            );
        }
        
        // Initialize adaptive flow
        if (typeof AdaptiveQuestionFlow !== 'undefined') {
            this.adaptiveFlow = new AdaptiveQuestionFlow();
        }
        
        // Initialize learning system
        if (typeof LearningSystem !== 'undefined') {
            this.learningSystem = new LearningSystem();
        }
        
        // Initialize scoring engine
        if (typeof ScoringEngine !== 'undefined') {
            this.scoringEngine = new ScoringEngine();
        }
        
        console.log(`✅ ${this.name} Agent ready`);
    }
    
    /**
     * Load questions into the question bank
     */
    loadQuestions() {
        if (!this.questionBank || !this.config.dynamicQuestions) return;
        
        this.config.dynamicQuestions.forEach(question => {
            this.questionBank.addQuestion({
                ...question,
                subcomponentId: this.id,
                scoringDimensions: this.config.scoringDimensions
            });
        });
    }
    
    /**
     * Generate a dynamic worksheet
     */
    async generateDynamicWorksheet(userContext) {
        console.log(`📝 Generating worksheet for ${this.name}...`);
        
        // Enhance context with subcomponent-specific info
        const enhancedContext = {
            ...userContext,
            subcomponentId: this.id,
            subcomponentName: this.name,
            block: this.config.block,
            phase: this.config.phase,
            focusAreas: this.config.focusAreas,
            questionTypes: this.config.questionTypes
        };
        
        // Generate questions based on context
        const questions = await this.selectQuestions(enhancedContext);
        
        // Create worksheet
        const worksheet = {
            id: `worksheet_${this.id}_${Date.now()}`,
            subcomponentId: this.id,
            subcomponentName: this.name,
            questions: questions,
            context: enhancedContext,
            timestamp: new Date().toISOString()
        };
        
        // Start adaptive flow if available
        if (this.adaptiveFlow) {
            await this.adaptiveFlow.startAdaptiveFlow(
                this.id,
                enhancedContext,
                questions
            );
        }
        
        return worksheet;
    }
    
    /**
     * Select questions based on context
     */
    async selectQuestions(context) {
        const questions = [];
        
        // Get base questions
        const baseQuestions = this.config.dynamicQuestions || [];
        
        // Apply context-based filtering and adaptation
        baseQuestions.forEach(question => {
            // Adjust difficulty based on user experience
            let adjustedQuestion = { ...question };
            
            if (context.experienceLevel === 'beginner' && question.difficulty === 'expert') {
                // Skip expert questions for beginners
                return;
            }
            
            if (context.experienceLevel === 'expert' && question.difficulty === 'beginner') {
                // Enhance beginner questions for experts
                adjustedQuestion.text += ' Provide advanced analysis and industry benchmarks.';
                adjustedQuestion.difficulty = 'advanced';
            }
            
            // Add industry-specific context
            if (context.industry === 'b2b-saas' && question.requiresMetrics) {
                adjustedQuestion.hint = 'Include SaaS metrics like MRR, CAC, LTV if applicable.';
            } else if (context.industry === 'enterprise') {
                adjustedQuestion.hint = 'Consider enterprise sales cycles and compliance requirements.';
            }
            
            questions.push(adjustedQuestion);
        });
        
        // Add adaptive questions based on previous performance
        if (context.previousScores && context.previousScores[this.id]) {
            const score = context.previousScores[this.id];
            
            if (score < 50) {
                // Add scaffolding questions
                questions.unshift({
                    id: `${this.id}_scaffold_1`,
                    text: `Before we dive deep, let's clarify: What is your current understanding of ${this.name.toLowerCase()}?`,
                    type: 'diagnostic',
                    difficulty: 'beginner',
                    isScaffolding: true
                });
            } else if (score > 80) {
                // Add challenge questions
                questions.push({
                    id: `${this.id}_challenge_1`,
                    text: `Given your strong foundation in ${this.name.toLowerCase()}, what innovative approaches are you considering that go beyond standard practices?`,
                    type: 'strategic',
                    difficulty: 'expert',
                    isChallenge: true
                });
            }
        }
        
        return questions;
    }
    
    /**
     * Process worksheet responses
     */
    async processWorksheetResponse(worksheetId, responses, userContext) {
        console.log(`🔍 Processing responses for ${this.name}...`);
        
        // Calculate scores based on subcomponent-specific dimensions
        const scores = await this.calculateScores(responses);
        
        // Generate analysis
        const analysis = await this.generateAnalysis(responses, scores);
        
        // Generate recommendations
        const recommendations = await this.generateRecommendations(analysis, userContext);
        
        // Record learning event
        if (this.learningSystem) {
            await this.learningSystem.recordLearningEvent({
                sessionId: worksheetId,
                subcomponentId: this.id,
                userContext: userContext,
                responses: responses,
                scores: scores,
                outcome: {
                    success: scores.overall > 70,
                    score: scores.overall
                }
            });
        }
        
        return {
            scores: scores,
            analysis: analysis,
            recommendations: recommendations,
            nextSteps: this.generateNextSteps(scores, userContext)
        };
    }
    
    /**
     * Calculate scores based on responses
     */
    async calculateScores(responses) {
        const scores = {
            overall: 0,
            dimensions: {}
        };
        
        // Calculate dimension scores
        this.config.scoringDimensions.forEach(dimension => {
            scores.dimensions[dimension] = this.calculateDimensionScore(responses, dimension);
        });
        
        // Calculate overall score
        const dimensionScores = Object.values(scores.dimensions);
        scores.overall = dimensionScores.reduce((sum, score) => sum + score, 0) / dimensionScores.length;
        
        return scores;
    }
    
    /**
     * Calculate score for a specific dimension
     */
    calculateDimensionScore(responses, dimension) {
        let score = 0;
        let weight = 0;
        
        this.config.dynamicQuestions.forEach(question => {
            const response = responses[question.id];
            if (response) {
                const quality = this.assessResponseQuality(response, question, dimension);
                score += quality * (question.scoringWeight || 0.2);
                weight += question.scoringWeight || 0.2;
            }
        });
        
        return weight > 0 ? Math.round(score / weight) : 0;
    }
    
    /**
     * Assess response quality for a dimension
     */
    assessResponseQuality(response, question, dimension) {
        let quality = 50; // Base score
        
        // General quality factors
        if (response.length > 200) quality += 10;
        if (response.length > 100) quality += 5;
        
        // Dimension-specific assessment
        switch (dimension) {
            case 'clarity':
                if (response.split(/[.!?]+/).length > 3) quality += 15;
                if (response.includes('specifically') || response.includes('exactly')) quality += 10;
                break;
                
            case 'specificity':
                if (/\d+/.test(response)) quality += 20;
                if (/%/.test(response)) quality += 10;
                if (/\$|€|£/.test(response)) quality += 10;
                break;
                
            case 'validation':
                if (response.includes('customer') || response.includes('user')) quality += 15;
                if (response.includes('survey') || response.includes('interview')) quality += 15;
                break;
                
            case 'quantification':
                if (/\d+/.test(response)) quality += 25;
                if (response.includes('ROI') || response.includes('metric')) quality += 15;
                break;
                
            case 'strategic':
                if (response.includes('competitive') || response.includes('differentiat')) quality += 15;
                if (response.includes('long-term') || response.includes('vision')) quality += 10;
                break;
        }
        
        return Math.min(100, quality);
    }
    
    /**
     * Generate analysis based on responses and scores
     */
    async generateAnalysis(responses, scores) {
        const analysis = {
            summary: this.generateSummary(scores),
            strengths: this.identifyStrengths(scores),
            weaknesses: this.identifyWeaknesses(scores),
            insights: this.extractInsights(responses)
        };
        
        return analysis;
    }
    
    /**
     * Generate summary based on scores
     */
    generateSummary(scores) {
        if (scores.overall >= 80) {
            return `Excellent performance in ${this.name}. Strong foundation with clear understanding and execution.`;
        } else if (scores.overall >= 60) {
            return `Good progress in ${this.name}. Some areas need refinement for optimal performance.`;
        } else if (scores.overall >= 40) {
            return `${this.name} needs significant work. Focus on fundamentals and validation.`;
        } else {
            return `Critical gaps in ${this.name}. Immediate attention required to build foundation.`;
        }
    }
    
    /**
     * Identify strengths
     */
    identifyStrengths(scores) {
        const strengths = [];
        
        Object.entries(scores.dimensions).forEach(([dimension, score]) => {
            if (score >= 70) {
                strengths.push({
                    dimension: dimension,
                    score: score,
                    message: `Strong ${dimension} with score of ${score}%`
                });
            }
        });
        
        return strengths;
    }
    
    /**
     * Identify weaknesses
     */
    identifyWeaknesses(scores) {
        const weaknesses = [];
        
        Object.entries(scores.dimensions).forEach(([dimension, score]) => {
            if (score < 50) {
                weaknesses.push({
                    dimension: dimension,
                    score: score,
                    message: `${dimension} needs improvement (${score}%)`,
                    priority: score < 30 ? 'HIGH' : 'MEDIUM'
                });
            }
        });
        
        return weaknesses;
    }
    
    /**
     * Extract insights from responses
     */
    extractInsights(responses) {
        const insights = [];
        
        // Check for patterns in responses
        const responseTexts = Object.values(responses).join(' ');
        
        if (!responseTexts.includes('customer') && !responseTexts.includes('user')) {
            insights.push({
                type: 'missing_customer_focus',
                message: 'Responses lack customer perspective',
                recommendation: 'Center your approach around customer needs and feedback'
            });
        }
        
        if (!/\d+/.test(responseTexts)) {
            insights.push({
                type: 'missing_metrics',
                message: 'No quantitative data provided',
                recommendation: 'Add specific metrics and measurements to validate your approach'
            });
        }
        
        return insights;
    }
    
    /**
     * Generate recommendations
     */
    async generateRecommendations(analysis, userContext) {
        const recommendations = [];
        
        // Add recommendations based on weaknesses
        analysis.weaknesses.forEach(weakness => {
            recommendations.push({
                area: weakness.dimension,
                priority: weakness.priority,
                action: this.getActionForDimension(weakness.dimension),
                resources: this.getResourcesForDimension(weakness.dimension)
            });
        });
        
        // Add stage-specific recommendations
        if (userContext.companyStage === 'pre-seed') {
            recommendations.push({
                area: 'validation',
                priority: 'HIGH',
                action: 'Focus on customer discovery and problem validation',
                resources: ['Customer Interview Guide', 'Problem Validation Template']
            });
        }
        
        return recommendations.slice(0, 5); // Top 5 recommendations
    }
    
    /**
     * Get action for dimension improvement
     */
    getActionForDimension(dimension) {
        const actions = {
            clarity: 'Refine and simplify your messaging for better understanding',
            specificity: 'Add concrete details, numbers, and examples',
            validation: 'Gather more customer evidence and feedback',
            quantification: 'Measure and track key metrics',
            strategic: 'Develop long-term vision and competitive positioning'
        };
        
        return actions[dimension] || 'Improve this area with focused effort';
    }
    
    /**
     * Get resources for dimension
     */
    getResourcesForDimension(dimension) {
        const resources = {
            clarity: ['Messaging Framework', 'Value Proposition Canvas'],
            specificity: ['Metrics Dashboard', 'KPI Template'],
            validation: ['Customer Interview Guide', 'Survey Templates'],
            quantification: ['ROI Calculator', 'Analytics Setup Guide'],
            strategic: ['Strategy Canvas', 'Competitive Analysis Template']
        };
        
        return resources[dimension] || ['Best Practices Guide'];
    }
    
    /**
     * Generate next steps
     */
    generateNextSteps(scores, userContext) {
        const nextSteps = {
            immediate: [],
            shortTerm: [],
            longTerm: []
        };
        
        if (scores.overall < 50) {
            nextSteps.immediate.push(
                `Schedule workshop to address ${this.name} fundamentals`,
                'Review successful examples in your industry',
                'Get expert consultation on critical gaps'
            );
        } else if (scores.overall < 70) {
            nextSteps.immediate.push(
                'Validate current approach with 5 customers',
                'Document and measure key metrics',
                'Create improvement plan for weak areas'
            );
        } else {
            nextSteps.immediate.push(
                'Optimize high-performing areas',
                'Share learnings with team',
                'Set ambitious targets for next quarter'
            );
        }
        
        return nextSteps;
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SubcomponentAgentFactory, SubcomponentAgent };
}

if (typeof window !== 'undefined') {
    window.SubcomponentAgentFactory = SubcomponentAgentFactory;
    window.SubcomponentAgent = SubcomponentAgent;
}

console.log('✅ Subcomponent Agent Factory loaded - ready to create specialized agents!');
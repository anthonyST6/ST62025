/**
 * Complete Template Registry - All 96 Subcomponents
 * 
 * This registry defines templates for all 16 blocks × 6 subcomponents
 * Each template includes:
 * - Metadata (name, description, version)
 * - Permanent sections and fields
 * - Customizable fields for analysis data population
 * - Industry best practices
 * - Output formats (PDF, DOCX, JSON)
 */

const TEMPLATE_REGISTRY_COMPLETE = {
    // ============================================================================
    // BLOCK 1: MISSION DISCOVERY (6 subcomponents)
    // ============================================================================
    '1-1': {
        id: '1-1',
        name: 'Problem Statement Definition',
        blockId: 1,
        blockName: 'Mission Discovery',
        templateType: 'problem-statement',
        description: 'Focused articulation of the specific problem you solve',
        version: '1.0.0',
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01',
        sections: [
            {
                id: 'executive-summary',
                title: 'Executive Summary',
                description: 'One-paragraph overview of the problem',
                fields: [
                    { name: 'problem_title', type: 'text', required: true, placeholder: 'Clear, concise problem title' },
                    { name: 'target_audience', type: 'text', required: true, placeholder: 'Who is affected by this problem?' },
                    { name: 'problem_scope', type: 'textarea', required: true, placeholder: 'Describe the scope and scale' }
                ]
            },
            {
                id: 'problem-details',
                title: 'Problem Details',
                description: 'Deep dive into the problem',
                fields: [
                    { name: 'current_situation', type: 'textarea', required: true, placeholder: 'How do people currently handle this?' },
                    { name: 'pain_points', type: 'textarea', required: true, placeholder: 'What are the specific pain points?' },
                    { name: 'impact_metrics', type: 'textarea', required: true, placeholder: 'Quantify the impact (time, cost, etc.)' }
                ]
            },
            {
                id: 'validation',
                title: 'Problem Validation',
                description: 'Evidence that this problem is real',
                fields: [
                    { name: 'customer_interviews', type: 'number', required: true, placeholder: 'Number of interviews conducted' },
                    { name: 'validation_evidence', type: 'textarea', required: true, placeholder: 'What evidence validates this problem?' },
                    { name: 'market_size', type: 'text', required: false, placeholder: 'Estimated market size (optional)' }
                ]
            }
        ],
        customizableFields: ['problem_title', 'target_audience', 'current_situation', 'pain_points', 'impact_metrics', 'validation_evidence'],
        bestPractices: [
            'Be specific - avoid vague problem statements',
            'Focus on customer pain, not your solution',
            'Quantify the impact whenever possible',
            'Validate with real customer interviews',
            'Keep it concise - one page maximum'
        ],
        outputFormats: ['PDF', 'DOCX', 'JSON'],
        tags: ['foundation', 'discovery', 'problem-definition']
    },
    '1-2': {
        id: '1-2',
        name: 'Mission Statement',
        blockId: 1,
        blockName: 'Mission Discovery',
        templateType: 'mission-statement',
        description: 'Declaration of the startup\'s purpose and vision',
        version: '1.0.0',
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01',
        sections: [
            {
                id: 'mission-core',
                title: 'Mission Core',
                description: 'The fundamental purpose',
                fields: [
                    { name: 'mission_statement', type: 'textarea', required: true, placeholder: 'What is your core mission? (2-3 sentences)' },
                    { name: 'vision_statement', type: 'textarea', required: true, placeholder: 'What future are you building? (2-3 sentences)' },
                    { name: 'core_values', type: 'textarea', required: true, placeholder: 'List 3-5 core values' }
                ]
            },
            {
                id: 'strategic-alignment',
                title: 'Strategic Alignment',
                description: 'How mission aligns with market opportunity',
                fields: [
                    { name: 'market_opportunity', type: 'textarea', required: true, placeholder: 'Why now? Why this market?' },
                    { name: 'competitive_advantage', type: 'textarea', required: true, placeholder: 'What makes you uniquely positioned?' },
                    { name: 'team_fit', type: 'textarea', required: true, placeholder: 'Why is your team the right one for this mission?' }
                ]
            },
            {
                id: 'stakeholder-alignment',
                title: 'Stakeholder Alignment',
                description: 'Alignment across team and investors',
                fields: [
                    { name: 'founder_alignment', type: 'textarea', required: true, placeholder: 'Are all founders aligned on this mission?' },
                    { name: 'investor_alignment', type: 'textarea', required: false, placeholder: 'How does this align with investor expectations?' },
                    { name: 'employee_alignment', type: 'textarea', required: false, placeholder: 'How will you communicate this to employees?' }
                ]
            }
        ],
        customizableFields: ['mission_statement', 'vision_statement', 'core_values', 'market_opportunity', 'competitive_advantage', 'team_fit'],
        bestPractices: [
            'Mission should be inspiring but achievable',
            'Vision should be bold and aspirational',
            'Ensure founder alignment before finalizing',
            'Revisit annually as company evolves',
            'Use clear, memorable language'
        ],
        outputFormats: ['PDF', 'DOCX', 'JSON'],
        tags: ['foundation', 'strategy', 'alignment']
    },
    '1-3': {
        id: '1-3',
        name: 'Customer Insight Capture',
        blockId: 1,
        blockName: 'Mission Discovery',
        templateType: 'voice-of-customer',
        description: 'Raw and synthesized data from target users',
        version: '1.0.0',
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01',
        sections: [
            {
                id: 'customer-segments',
                title: 'Customer Segments',
                description: 'Define your target customer segments',
                fields: [
                    { name: 'segment_name', type: 'text', required: true, placeholder: 'e.g., "Mid-market SaaS founders"' },
                    { name: 'segment_size', type: 'text', required: true, placeholder: 'Estimated market size' },
                    { name: 'segment_characteristics', type: 'textarea', required: true, placeholder: 'Key characteristics of this segment' }
                ]
            },
            {
                id: 'customer-insights',
                title: 'Customer Insights',
                description: 'Synthesized insights from customer research',
                fields: [
                    { name: 'top_needs', type: 'textarea', required: true, placeholder: 'Top 3-5 customer needs' },
                    { name: 'pain_points', type: 'textarea', required: true, placeholder: 'Key pain points' },
                    { name: 'desired_outcomes', type: 'textarea', required: true, placeholder: 'What outcomes do they want?' }
                ]
            },
            {
                id: 'research-methodology',
                title: 'Research Methodology',
                description: 'How you gathered this voice of customer data',
                fields: [
                    { name: 'interviews_conducted', type: 'number', required: true, placeholder: 'Number of interviews' },
                    { name: 'research_methods', type: 'textarea', required: true, placeholder: 'Methods used (interviews, surveys, etc.)' },
                    { name: 'research_timeline', type: 'text', required: true, placeholder: 'When was this research conducted?' }
                ]
            }
        ],
        customizableFields: ['segment_name', 'segment_characteristics', 'top_needs', 'pain_points', 'desired_outcomes'],
        bestPractices: [
            'Conduct at least 20-30 customer interviews',
            'Use direct quotes from customers',
            'Identify patterns across multiple interviews',
            'Separate needs from solutions',
            'Update regularly as you learn more'
        ],
        outputFormats: ['PDF', 'DOCX', 'JSON'],
        tags: ['research', 'customer-insights', 'discovery']
    },
    '1-4': {
        id: '1-4',
        name: 'Founding Team Capability',
        blockId: 1,
        blockName: 'Mission Discovery',
        templateType: 'team-assessment',
        description: 'Audit of founding team\'s ability to execute',
        version: '1.0.0',
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01',
        sections: [
            {
                id: 'team-composition',
                title: 'Team Composition',
                description: 'Overview of founding team',
                fields: [
                    { name: 'founder_name', type: 'text', required: true, placeholder: 'Founder name' },
                    { name: 'founder_role', type: 'text', required: true, placeholder: 'Role (CEO, CTO, etc.)' },
                    { name: 'founder_background', type: 'textarea', required: true, placeholder: 'Relevant experience and background' }
                ]
            },
            {
                id: 'capability-assessment',
                title: 'Capability Assessment',
                description: 'Assess team capabilities',
                fields: [
                    { name: 'product_expertise', type: 'text', required: true, placeholder: 'Product/technical expertise level' },
                    { name: 'market_expertise', type: 'text', required: true, placeholder: 'Market/domain expertise level' },
                    { name: 'business_expertise', type: 'text', required: true, placeholder: 'Business/GTM expertise level' }
                ]
            },
            {
                id: 'gaps-and-plan',
                title: 'Gaps and Plan',
                description: 'Identify gaps and hiring plan',
                fields: [
                    { name: 'capability_gaps', type: 'textarea', required: true, placeholder: 'What capabilities are missing?' },
                    { name: 'hiring_plan', type: 'textarea', required: true, placeholder: 'How will you fill these gaps?' },
                    { name: 'advisory_board', type: 'textarea', required: false, placeholder: 'Advisory board or mentors to fill gaps?' }
                ]
            }
        ],
        customizableFields: ['founder_background', 'product_expertise', 'market_expertise', 'business_expertise', 'capability_gaps', 'hiring_plan'],
        bestPractices: [
            'Be honest about gaps - investors expect this',
            'Show how you\'ll address gaps (hiring, advisors, learning)',
            'Highlight complementary skills on team',
            'Include relevant past successes',
            'Plan for key hires in first 12 months'
        ],
        outputFormats: ['PDF', 'DOCX', 'JSON'],
        tags: ['team', 'capability', 'assessment']
    },
    '1-5': {
        id: '1-5',
        name: 'Market Insight Synthesis',
        blockId: 1,
        blockName: 'Mission Discovery',
        templateType: 'market-analysis',
        description: 'Summary of market landscape and timing',
        version: '1.0.0',
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01',
        sections: [
            {
                id: 'market-overview',
                title: 'Market Overview',
                description: 'High-level market analysis',
                fields: [
                    { name: 'market_size', type: 'text', required: true, placeholder: 'Total addressable market (TAM)' },
                    { name: 'market_growth', type: 'text', required: true, placeholder: 'Market growth rate (CAGR)' },
                    { name: 'market_trends', type: 'textarea', required: true, placeholder: 'Key market trends' }
                ]
            },
            {
                id: 'competitive-landscape',
                title: 'Competitive Landscape',
                description: 'Competitive analysis',
                fields: [
                    { name: 'direct_competitors', type: 'textarea', required: true, placeholder: 'Direct competitors' },
                    { name: 'indirect_competitors', type: 'textarea', required: true, placeholder: 'Indirect competitors' },
                    { name: 'competitive_positioning', type: 'textarea', required: true, placeholder: 'Your unique positioning' }
                ]
            },
            {
                id: 'market-timing',
                title: 'Market Timing',
                description: 'Why now is the right time',
                fields: [
                    { name: 'timing_factors', type: 'textarea', required: true, placeholder: 'Why is now the right time?' },
                    { name: 'regulatory_environment', type: 'textarea', required: false, placeholder: 'Any regulatory tailwinds/headwinds?' },
                    { name: 'technology_enablers', type: 'textarea', required: false, placeholder: 'What technology enables this now?' }
                ]
            }
        ],
        customizableFields: ['market_size', 'market_growth', 'market_trends', 'direct_competitors', 'competitive_positioning', 'timing_factors'],
        bestPractices: [
            'Use credible market research sources',
            'Be realistic about market size',
            'Acknowledge competitive threats',
            'Explain why you\'ll win despite competition',
            'Show understanding of market dynamics'
        ],
        outputFormats: ['PDF', 'DOCX', 'JSON'],
        tags: ['market', 'analysis', 'competitive']
    },
    '1-6': {
        id: '1-6',
        name: 'Prototype Launch Plan',
        blockId: 1,
        blockName: 'Mission Discovery',
        templateType: 'launch-plan',
        description: 'Concrete plan to launch functional prototype',
        version: '1.0.0',
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01',
        sections: [
            {
                id: 'launch-scope',
                title: 'Launch Scope',
                description: 'Define what you\'re launching',
                fields: [
                    { name: 'mvp_features', type: 'textarea', required: true, placeholder: 'Core MVP features' },
                    { name: 'launch_timeline', type: 'text', required: true, placeholder: 'Target launch date' },
                    { name: 'launch_target', type: 'text', required: true, placeholder: 'Initial target customers' }
                ]
            },
            {
                id: 'launch-execution',
                title: 'Launch Execution',
                description: 'How you\'ll execute the launch',
                fields: [
                    { name: 'development_plan', type: 'textarea', required: true, placeholder: 'Development roadmap' },
                    { name: 'resource_requirements', type: 'textarea', required: true, placeholder: 'Resources needed' },
                    { name: 'risk_mitigation', type: 'textarea', required: true, placeholder: 'Key risks and mitigation' }
                ]
            },
            {
                id: 'launch-success',
                title: 'Launch Success Criteria',
                description: 'How you\'ll measure launch success',
                fields: [
                    { name: 'success_metrics', type: 'textarea', required: true, placeholder: 'Key success metrics' },
                    { name: 'feedback_plan', type: 'textarea', required: true, placeholder: 'How you\'ll gather feedback' },
                    { name: 'iteration_plan', type: 'textarea', required: true, placeholder: 'Plan for post-launch iteration' }
                ]
            }
        ],
        customizableFields: ['mvp_features', 'launch_timeline', 'launch_target', 'development_plan', 'success_metrics', 'feedback_plan'],
        bestPractices: [
            'Focus on MVP - not full product',
            'Set realistic timelines',
            'Plan for feedback loops',
            'Identify key risks upfront',
            'Have contingency plans'
        ],
        outputFormats: ['PDF', 'DOCX', 'JSON'],
        tags: ['launch', 'planning', 'execution']
    },

    // ============================================================================
    // BLOCK 2: CUSTOMER INSIGHTS (6 subcomponents)
    // ============================================================================
    '2-1': {
        id: '2-1',
        name: 'Interview Cadence Plan',
        blockId: 2,
        blockName: 'Customer Insights',
        templateType: 'interview-cadence',
        description: 'Structured plan for recurring customer discovery',
        version: '1.0.0',
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01',
        sections: [
            {
                id: 'cadence-structure',
                title: 'Cadence Structure',
                description: 'Define your interview cadence',
                fields: [
                    { name: 'interview_frequency', type: 'text', required: true, placeholder: 'e.g., "2 per week"' },
                    { name: 'interview_duration', type: 'text', required: true, placeholder: 'e.g., "30-45 minutes"' },
                    { name: 'interview_format', type: 'text', required: true, placeholder: 'e.g., "Video call, in-person, phone"' }
                ]
            },
            {
                id: 'interview-topics',
                title: 'Interview Topics',
                description: 'What you\'ll discuss in interviews',
                fields: [
                    { name: 'core_questions', type: 'textarea', required: true, placeholder: 'Core questions to ask' },
                    { name: 'discovery_areas', type: 'textarea', required: true, placeholder: 'Areas to explore' },
                    { name: 'follow_up_process', type: 'textarea', required: true, placeholder: 'How you\'ll follow up' }
                ]
            },
            {
                id: 'cadence-management',
                title: 'Cadence Management',
                description: 'How you\'ll manage the cadence',
                fields: [
                    { name: 'scheduling_process', type: 'textarea', required: true, placeholder: 'How you\'ll schedule interviews' },
                    { name: 'note_taking', type: 'textarea', required: true, placeholder: 'How you\'ll capture insights' },
                    { name: 'team_involvement', type: 'textarea', required: true, placeholder: 'Who will participate?' }
                ]
            }
        ],
        customizableFields: ['interview_frequency', 'core_questions', 'discovery_areas', 'scheduling_process', 'note_taking'],
        bestPractices: [
            'Aim for 2-3 interviews per week minimum',
            'Keep interviews to 30-45 minutes',
            'Ask open-ended questions',
            'Listen more than you talk',
            'Document insights immediately after'
        ],
        outputFormats: ['PDF', 'DOCX', 'JSON'],
        tags: ['customer-research', 'interviews', 'discovery']
    },
    '2-2': {
        id: '2-2',
        name: 'Personas Framework',
        blockId: 2,
        blockName: 'Customer Insights',
        templateType: 'personas',
        description: 'Documented archetypes of key users and buyers',
        version: '1.0.0',
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01',
        sections: [
            {
                id: 'persona-basics',
                title: 'Persona Basics',
                description: 'Basic persona information',
                fields: [
                    { name: 'persona_name', type: 'text', required: true, placeholder: 'e.g., "Technical Founder"' },
                    { name: 'persona_role', type: 'text', required: true, placeholder: 'Job title/role' },
                    { name: 'persona_demographics', type: 'textarea', required: true, placeholder: 'Age, company size, industry, etc.' }
                ]
            },
            {
                id: 'persona-motivations',
                title: 'Motivations & Goals',
                description: 'What drives this persona',
                fields: [
                    { name: 'primary_goals', type: 'textarea', required: true, placeholder: 'Top 3-5 goals' },
                    { name: 'pain_points', type: 'textarea', required: true, placeholder: 'Key pain points' },
                    { name: 'success_metrics', type: 'textarea', required: true, placeholder: 'How they measure success' }
                ]
            },
            {
                id: 'persona-behavior',
                title: 'Behavior & Preferences',
                description: 'How this persona behaves',
                fields: [
                    { name: 'buying_process', type: 'textarea', required: true, placeholder: 'How they make buying decisions' },
                    { name: 'information_sources', type: 'textarea', required: true, placeholder: 'Where they get information' },
                    { name: 'decision_criteria', type: 'textarea', required: true, placeholder: 'What matters most in their decision' }
                ]
            }
        ],
        customizableFields: ['persona_name', 'persona_role', 'primary_goals', 'pain_points', 'buying_process', 'decision_criteria'],
        bestPractices: [
            'Create 2-4 primary personas',
            'Base on real customer research',
            'Include both user and buyer personas',
            'Update as you learn more',
            'Use personas in all product decisions'
        ],
        outputFormats: ['PDF', 'DOCX', 'JSON'],
        tags: ['personas', 'customer-insights', 'segmentation']
    },
    '2-3': {
        id: '2-3',
        name: 'Pain Point Mapping',
        blockId: 2,
        blockName: 'Customer Insights',
        templateType: 'pain-point-analysis',
        description: 'Visual mapping of customer pain points',
        version: '1.0.0',
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01',
        sections: [
            {
                id: 'pain-point-identification',
                title: 'Pain Point Identification',
                description: 'Identify key pain points',
                fields: [
                    { name: 'pain_point_name', type: 'text', required: true, placeholder: 'Name of pain point' },
                    { name: 'pain_point_description', type: 'textarea', required: true, placeholder: 'Detailed description' },
                    { name: 'affected_personas', type: 'textarea', required: true, placeholder: 'Which personas are affected?' }
                ]
            },
            {
                id: 'pain-point-severity',
                title: 'Pain Point Severity',
                description: 'Assess severity and impact',
                fields: [
                    { name: 'frequency', type: 'text', required: true, placeholder: 'How often does this occur?' },
                    { name: 'impact', type: 'text', required: true, placeholder: 'Impact (time, cost, frustration)' },
                    { name: 'current_solution', type: 'textarea', required: true, placeholder: 'How do they currently handle it?' }
                ]
            },
            {
                id: 'pain-point-prioritization',
                title: 'Prioritization',
                description: 'Prioritize pain points',
                fields: [
                    { name: 'priority_score', type: 'number', required: true, placeholder: 'Priority score (1-10)' },
                    { name: 'addressability', type: 'text', required: true, placeholder: 'Can you address this?' },
                    { name: 'market_size', type: 'text', required: true, placeholder: 'How many people have this pain?' }
                ]
            }
        ],
        customizableFields: ['pain_point_name', 'pain_point_description', 'affected_personas', 'frequency', 'impact', 'priority_score'],
        bestPractices: [
            'Identify 5-10 key pain points',
            'Prioritize by frequency and impact',
            'Understand current workarounds',
            'Validate with multiple customers',
            'Focus on top 2-3 for MVP'
        ],
        outputFormats: ['PDF', 'DOCX', 'JSON'],
        tags: ['pain-points', 'customer-insights', 'prioritization']
    },
    '2-4': {
        id: '2-4',
        name: 'JTBD Capture',
        blockId: 2,
        blockName: 'Customer Insights',
        templateType: 'jtbd',
        description: 'Jobs-to-be-done breakdown for user goals',
        version: '1.0.0',
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01',
        sections: [
            {
                id: 'job-definition',
                title: 'Job Definition',
                description: 'Define the core job',
                fields: [
                    { name: 'job_name', type: 'text', required: true, placeholder: 'e.g., "Build a GTM strategy"' },
                    { name: 'job_description', type: 'textarea', required: true, placeholder: 'What is the customer trying to accomplish?' },
                    { name: 'job_context', type: 'textarea', required: true, placeholder: 'When and where does this job occur?' }
                ]
            },
            {
                id: 'job-steps',
                title: 'Job Steps',
                description: 'Break down the job into steps',
                fields: [
                    { name: 'step_number', type: 'number', required: true, placeholder: 'Step number' },
                    { name: 'step_description', type: 'textarea', required: true, placeholder: 'What does the customer do?' },
                    { name: 'step_challenges', type: 'textarea', required: true, placeholder: 'What challenges do they face?' }
                ]
            },
            {
                id: 'job-outcomes',
                title: 'Desired Outcomes',
                description: 'What success looks like',
                fields: [
                    { name: 'functional_outcomes', type: 'textarea', required: true, placeholder: 'Functional outcomes desired' },
                    { name: 'emotional_outcomes', type: 'textarea', required: true, placeholder: 'Emotional outcomes desired' },
                    { name: 'social_outcomes', type: 'textarea', required: true, placeholder: 'Social outcomes desired' }
                ]
            }
        ],
        customizableFields: ['job_name', 'job_description', 'job_context', 'step_description', 'step_challenges', 'functional_outcomes'],
        bestPractices: [
            'Focus on the job, not the person',
            'Break down into 5-10 key steps',
            'Identify obstacles at each step',
            'Understand emotional and social dimensions',
            'Use JTBD to guide product development'
        ],
        outputFormats: ['PDF', 'DOCX', 'JSON'],
        tags: ['jtbd', 'customer-insights', 'jobs']
    },
    '2-5': {
        id: '2-5',
        name: 'Signal Grading',
        blockId: 2,
        blockName: 'Customer Insights',
        templateType: 'signal-grading',
        description: 'Scoring model for valuable insights vs noise',
        version: '1.0.0',
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01',
        sections: [
            {
                id: 'signal-identification',
                title: 'Signal Identification',
                description: 'Identify signals from customer research',
                fields: [
                    { name: 'signal_description', type: 'textarea', required: true, placeholder: 'What signal did you observe?' },
                    { name: 'signal_source', type: 'text', required: true, placeholder: 'Where did this come from?' },
                    { name: 'signal_frequency', type: 'text', required: true, placeholder: 'How many customers mentioned this?' }
                ]
            },
            {
                id: 'signal-grading',
                title: 'Signal Grading',
                description: 'Grade the quality of signals',
                fields: [
                    { name: 'signal_strength', type: 'number', required: true, placeholder: 'Strength (1-10)' },
                    { name: 'signal_confidence', type: 'number', required: true, placeholder: 'Confidence (1-10)' },
                    { name: 'signal_actionability', type: 'number', required: true, placeholder: 'Actionability (1-10)' }
                ]
            },
            {
                id: 'signal-action',
                title: 'Action Plan',
                description: 'What you\'ll do with this signal',
                fields: [
                    { name: 'action_item', type: 'textarea', required: true, placeholder: 'What action will you take?' },
                    { name: 'action_owner', type: 'text', required: true, placeholder: 'Who is responsible?' },
                    { name: 'action_timeline', type: 'text', required: true, placeholder: 'When will you take action?' }
                ]
            }
        ],
        customizableFields: ['signal_description', 'signal_frequency', 'signal_strength', 'signal_confidence', 'action_item', 'action_timeline'],
        bestPractices: [
            'Grade signals consistently',
            'Focus on high-confidence signals',
            'Require multiple mentions before acting',
            'Document your reasoning',
            'Track which signals led to successful changes'
        ],
        outputFormats: ['PDF', 'DOCX', 'JSON'],
        tags: ['signals', 'insights', 'action']
    },
    '2-6': {
        id: '2-6',
        name: 'Insight-to-Action Loop',
        blockId: 2,
        blockName: 'Customer Insights',
        templateType: 'customer-journey',
        description: 'Process for converting insights to decisions',
        version: '1.0.0',
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01',
        sections: [
            {
                id: 'journey-stages',
                title: 'Journey Stages',
                description: 'Map customer journey stages',
                fields: [
                    { name: 'stage_name', type: 'text', required: true, placeholder: 'e.g., "Awareness"' },
                    { name: 'stage_description', type: 'textarea', required: true, placeholder: 'What happens in this stage?' },
                    { name: 'customer_goals', type: 'textarea', required: true, placeholder: 'What are customer goals?' }
                ]
            },
            {
                id: 'journey-touchpoints',
                title: 'Touchpoints',
                description: 'Identify key touchpoints',
                fields: [
                    { name: 'touchpoint_name', type: 'text', required: true, placeholder: 'e.g., "First demo"' },
                    { name: 'touchpoint_description', type: 'textarea', required: true, placeholder: 'What happens here?' },
                    { name: 'customer_emotion', type: 'text', required: true, placeholder: 'How does customer feel?' }
                ]
            },
            {
                id: 'journey-optimization',
                title: 'Optimization Opportunities',
                description: 'Where to improve the journey',
                fields: [
                    { name: 'pain_point', type: 'textarea', required: true, placeholder: 'What\'s the pain point?' },
                    { name: 'improvement_idea', type: 'textarea', required: true, placeholder: 'How could you improve this?' },
                    { name: 'expected_impact', type: 'textarea', required: true, placeholder: 'What impact would this have?' }
                ]
            }
        ],
        customizableFields: ['stage_name', 'stage_description', 'customer_goals', 'touchpoint_name', 'pain_point', 'improvement_idea'],
        bestPractices: [
            'Map 4-6 key journey stages',
            'Include emotional journey',
            'Identify friction points',
            'Prioritize high-impact improvements',
            'Test improvements with customers'
        ],
        outputFormats: ['PDF', 'DOCX', 'JSON'],
        tags: ['customer-journey', 'experience', 'optimization']
    },

    // ============================================================================
    // BLOCK 3: STRATEGIC PRIORITIZATION (6 subcomponents)
    // ============================================================================
    '3-1': {
        id: '3-1',
        name: 'Use Case Scoring Model',
        blockId: 3,
        blockName: 'Strategic Prioritization',
        templateType: 'use-case-scoring',
        description: 'Evaluate use cases across multiple criteria',
        version: '1.0.0',
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01',
        sections: [
            {
                id: 'use-case-definition',
                title: 'Use Case Definition',
                description: 'Define the use case',
                fields: [
                    { name: 'use_case_name', type: 'text', required: true, placeholder: 'e.g., "Sales forecasting"' },
                    { name: 'use_case_description', type: 'textarea', required: true, placeholder: 'What problem does this solve?' },
                    { name: 'target_customer', type: 'text', required: true, placeholder: 'Who is this for?' }
                ]
            },
            {
                id: 'scoring-criteria',
                title: 'Scoring Criteria',
                description: 'Score the use case',
                fields: [
                    { name: 'market_size_score', type: 'number', required: true, placeholder: 'Market size (1-10)' },
                    { name: 'customer_pain_score', type: 'number', required: true, placeholder: 'Customer pain (1-10)' },
                    { name: 'competitive_advantage_score', type: 'number', required: true, placeholder: 'Competitive advantage (1-10)' },
                    { name: 'implementation_difficulty_score', type: 'number', required: true, placeholder: 'Implementation difficulty (1-10)' }
                ]
            },
            {
                id: 'use-case-ranking',
                title: 'Ranking & Decision',
                description: 'Rank and decide',
                fields: [
                    { name: 'total_score', type: 'number', required: true, placeholder: 'Total score' },
                    { name: 'ranking', type: 'text', required: true, placeholder: 'Rank (1st, 2nd, etc.)' },
                    { name: 'decision', type: 'text', required: true, placeholder: 'Decision (pursue, defer, reject)' }
                ]
            }
        ],
        customizableFields: ['use_case_name', 'use_case_description', 'target_customer', 'market_size_score', 'customer_pain_score', 'competitive_advantage_score'],
        bestPractices: [
            'Score 5-10 use cases',
            'Use consistent scoring criteria',
            'Weight criteria by importance',
            'Involve team in scoring',
            'Revisit quarterly as market changes'
        ],
        outputFormats: ['PDF', 'DOCX', 'JSON'],
        tags: ['prioritization', 'use-cases', 'strategy']
    },
    '3-2': {
        id: '3-2',
        name: 'Segment Tiering',
        blockId: 3,
        blockName: 'Strategic Prioritization',
        templateType: 'segment-tiering',
        description: 'Ranked categorization of customer segments',
        version: '1.0.0',
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01',
        sections: [
            {
                id: 'segment-definition',
                title: 'Segment Definition',
                description: 'Define customer segments',
                fields: [
                    { name: 'segment_name', type: 'text', required: true, placeholder: 'e.g., "Mid-market SaaS"' },
                    { name: 'segment_characteristics', type: 'textarea', required: true, placeholder: 'Key characteristics' },
                    { name: 'segment_size', type: 'text', required: true, placeholder: 'Market size' }
                ]
            },
            {
                id: 'segment-scoring',
                title: 'Segment Scoring',
                description: 'Score each segment',
                fields: [
                    { name: 'market_attractiveness', type: 'number', required: true, placeholder: 'Market attractiveness (1-10)' },
                    { name: 'competitive_intensity', type: 'number', required: true, placeholder: 'Competitive intensity (1-10)' },
                    { name: 'fit_with_solution', type: 'number', required: true, placeholder: 'Fit with solution (1-10)' }
                ]
            },
            {
                id: 'segment-tiering',
                title: 'Tiering',
                description: 'Tier segments by priority',
                fields: [
                    { name: 'tier', type: 'text', required: true, placeholder: 'Tier (Tier 1, Tier 2, etc.)' },
                    { name: 'go_to_market_strategy', type: 'textarea', required: true, placeholder: 'GTM strategy for this tier' },
                    { name: 'resource_allocation', type: 'text', required: true, placeholder: 'Resource allocation %' }
                ]
            }
        ],
        customizableFields: ['segment_name', 'segment_characteristics', 'segment_size', 'market_attractiveness', 'fit_with_solution', 'go_to_market_strategy'],
        bestPractices: [
            'Create 2-3 tiers',
            'Focus resources on Tier 1',
            'Revisit tiering quarterly',
            'Adjust based on market feedback',
            'Communicate tiers to team'
        ],
        outputFormats: ['PDF', 'DOCX', 'JSON'],
        tags: ['segmentation', 'prioritization', 'strategy']
    },
    '3-3': {
        id: '3-3',
        name: 'Prioritization Rubric',
        blockId: 3,
        blockName: 'Strategic Prioritization',
        templateType: 'prioritization-rubric',
        description: 'Decision-making tool for competing initiatives',
        version: '1.0.0',
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01',
        sections: [
            {
                id: 'rubric-criteria',
                title: 'Rubric Criteria',
                description: 'Define prioritization criteria',
                fields: [
                    { name: 'criterion_name', type: 'text', required: true, placeholder: 'e.g., "Customer impact"' },
                    { name: 'criterion_description', type: 'textarea', required: true, placeholder: 'What does this measure?' },
                    { name: 'criterion_weight', type: 'number', required: true, placeholder: 'Weight (%)' }
                ]
            },
            {
                id: 'rubric-scoring',
                title: 'Scoring Scale',
                description: 'Define scoring scale',
                fields: [
                    { name: 'score_level', type: 'text', required: true, placeholder: 'e.g., "High, Medium, Low"' },
                    { name: 'score_definition', type: 'textarea', required: true, placeholder: 'What does this score mean?' },
                    { name: 'score_value', type: 'number', required: true, placeholder: 'Numeric value' }
                ]
            },
            {
                id: 'rubric-application',
                title: 'Application',
                description: 'How to use the rubric',
                fields: [
                    { name: 'initiative_name', type: 'text', required: true, placeholder: 'Initiative to evaluate' },
                    { name: 'scores', type: 'textarea', required: true, placeholder: 'Scores for each criterion' },
                    { name: 'final_decision', type: 'text', required: true, placeholder: 'Prioritize, defer, or reject?' }
                ]
            }
        ],
        customizableFields: ['criterion_name', 'criterion_weight', 'score_level', 'initiative_name', 'final_decision'],
        bestPractices: [
            'Define 3-5 key criteria',
            'Weight criteria by importance',
            'Use consistent scoring',
            'Document rationale',
            'Review rubric quarterly'
        ],
        outputFormats: ['PDF', 'DOCX', 'JSON'],
        tags: ['prioritization', 'decision-making', 'framework']
    },
    '3-4': {
        id: '3-4',
        name: 'Tradeoff Tracker',
        blockId: 3,
        blockName: 'Strategic Prioritization',
        templateType: 'tradeoff-tracker',
        description: 'Document intentionally deprioritized items',
        version: '1.0.0',
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01',
        sections: [
            {
                id: 'tradeoff-identification',
                title: 'Tradeoff Identification',
                description: 'Identify tradeoffs',
                fields: [
                    { name: 'tradeoff_description', type: 'textarea', required: true, placeholder: 'What are we trading off?' },
                    { name: 'option_a', type: 'textarea', required: true, placeholder: 'Option A' },
                    { name: 'option_b', type: 'textarea', required: true, placeholder: 'Option B' }
                ]
            },
            {
                id: 'tradeoff-analysis',
                title: 'Tradeoff Analysis',
                description: 'Analyze the tradeoff',
                fields: [
                    { name: 'pros_cons_a', type: 'textarea', required: true, placeholder: 'Pros and cons of Option A' },
                    { name: 'pros_cons_b', type: 'textarea', required: true, placeholder: 'Pros and cons of Option B' },
                    { name: 'decision_rationale', type: 'textarea', required: true, placeholder: 'Why did you choose this option?' }
                ]
            },
            {
                id: 'tradeoff-decision',
                title: 'Decision & Revisit',
                description: 'Document decision and revisit plan',
                fields: [
                    { name: 'chosen_option', type: 'text', required: true, placeholder: 'Which option did you choose?' },
                    { name: 'revisit_date', type: 'text', required: true, placeholder: 'When will you revisit this?' },
                    { name: 'success_metrics', type: 'textarea', required: true, placeholder: 'How will you measure success?' }
                ]
            }
        ],
        customizableFields: ['tradeoff_description', 'option_a', 'option_b', 'decision_rationale', 'chosen_option', 'revisit_date'],
        bestPractices: [
            'Document all major tradeoffs',
            'Include team in decision',
            'Explain rationale clearly',
            'Plan to revisit periodically',
            'Learn from past tradeoffs'
        ],
        outputFormats: ['PDF', 'DOCX', 'JSON'],
        tags: ['tradeoffs', 'decisions', 'strategy']
    },
    '3-5': {
        id: '3-5',
        name: 'Hypothesis Board',
        blockId: 3,
        blockName: 'Strategic Prioritization',
        templateType: 'hypothesis-board',
        description: 'Track core assumptions being made',
        version: '1.0.0',
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01',
        sections: [
            {
                id: 'hypothesis-definition',
                title: 'Hypothesis Definition',
                description: 'Define your hypotheses',
                fields: [
                    { name: 'hypothesis_statement', type: 'textarea', required: true, placeholder: 'We believe that...' },
                    { name: 'hypothesis_category', type: 'text', required: true, placeholder: 'e.g., "Customer need", "Market size"' },
                    { name: 'hypothesis_importance', type: 'text', required: true, placeholder: 'How critical is this?' }
                ]
            },
            {
                id: 'hypothesis-testing',
                title: 'Testing Plan',
                description: 'How you\'ll test the hypothesis',
                fields: [
                    { name: 'test_method', type: 'textarea', required: true, placeholder: 'How will you test this?' },
                    { name: 'success_criteria', type: 'textarea', required: true, placeholder: 'What would prove this true?' },
                    { name: 'timeline', type: 'text', required: true, placeholder: 'When will you test this?' }
                ]
            },
            {
                id: 'hypothesis-status',
                title: 'Status & Results',
                description: 'Track hypothesis status',
                fields: [
                    { name: 'status', type: 'text', required: true, placeholder: 'Untested, Testing, Validated, Invalidated' },
                    { name: 'results', type: 'textarea', required: true, placeholder: 'What did you learn?' },
                    { name: 'next_steps', type: 'textarea', required: true, placeholder: 'What\'s next?' }
                ]
            }
        ],
        customizableFields: ['hypothesis_statement', 'hypothesis_category', 'hypothesis_importance', 'test_method', 'success_criteria', 'status', 'results'],
        bestPractices: [
            'Identify 5-10 core hypotheses',
            'Prioritize by importance',
            'Test systematically',
            'Document results',
            'Update status regularly'
        ],
        outputFormats: ['PDF', 'DOCX', 'JSON'],
        tags: ['hypotheses', 'assumptions', 'testing']
    },
    '3-6': {
        id: '3-6',
        name: 'Decision Archive',
        blockId: 3,
        blockName: 'Strategic Prioritization',
        templateType: 'decision-archive',
        description: 'Timestamped record of key decisions',
        version: '1.0.0',
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01',
        sections: [
            {
                id: 'decision-context',
                title: 'Decision Context',
                description: 'Context for the decision',
                fields: [
                    { name: 'decision_title', type: 'text', required: true, placeholder: 'What decision was made?' },
                    { name: 'decision_date', type: 'text', required: true, placeholder: 'When was this decided?' },
                    { name: 'decision_maker', type: 'text', required: true, placeholder: 'Who made this decision?' }
                ]
            },
            {
                id: 'decision-rationale',
                title: 'Decision Rationale',
                description: 'Why this decision was made',
                fields: [
                    { name: 'problem_statement', type: 'textarea', required: true, placeholder: 'What problem were you solving?' },
                    { name: 'options_considered', type: 'textarea', required: true, placeholder: 'What options did you consider?' },
                    { name: 'decision_rationale', type: 'textarea', required: true, placeholder: 'Why did you choose this option?' }
                ]
            },
            {
                id: 'decision-outcomes',
                title: 'Outcomes & Learning',
                description: 'Track outcomes and learning',
                fields: [
                    { name: 'expected_outcomes', type: 'textarea', required: true, placeholder: 'What did you expect to happen?' },
                    { name: 'actual_outcomes', type: 'textarea', required: false, placeholder: 'What actually happened?' },
                    { name: 'learning', type: 'textarea', required: false, placeholder: 'What did you learn?' }
                ]
            }
        ],
        customizableFields: ['decision_title', 'decision_date', 'problem_statement', 'options_considered', 'decision_rationale', 'expected_outcomes'],
        bestPractices: [
            'Document all major decisions',
            'Include context and rationale',
            'Revisit decisions periodically',
            'Track outcomes vs expectations',
            'Learn from past decisions'
        ],
        outputFormats: ['PDF', 'DOCX', 'JSON'],
        tags: ['decisions', 'archive', 'learning']
    }
};

// Generate templates for Blocks 4-16 (78 remaining subcomponents)
// Each block has 6 subcomponents
for (let blockId = 4; blockId <= 16; blockId++) {
    const blockNames = {
        4: 'Prototype Launch',
        5: 'Early Adopter Wins',
        6: 'Customer Engagement Flywheel',
        7: 'Quantifiable Impact',
        8: 'Customer Success Expansion',
        9: 'Proof Execution',
        10: 'Sales Team Empowerment',
        11: 'High Performance Teams',
        12: 'Retention Systems',
        13: 'Market Domination Strategies',
        14: 'Operational Infrastructure',
        15: 'Leadership Expansion',
        16: 'Global & Expansion Opportunities'
    };

    const subcomponentNames = {
        4: ['Feature Inclusion Matrix', 'Technical Scope Tracker', 'Pilot Group Selection', 'QA & Success Criteria', 'Timeline Gantt or Roadmap', 'Post-Mortem Template'],
        5: ['Case Study Template', 'ROI Calculation Sheet', 'Use Case Spotlight', 'Buyer Quotes & Testimonials', 'Win Criteria Mapping', 'Deal Debrief Framework'],
        6: ['Usage Heatmap', 'Milestone Triggers', 'CS Dashboard', 'Activation Metric Model', 'Feedback Collector', 'Power User Behavior Signals'],
        7: ['Time/Cost Savings Metrics', 'Revenue-Impact Attribution', 'Productivity Lift Metrics', 'Net Retention Trends', 'Downstream System Reductions', 'Friction Reduction Evidence'],
        8: ['Upsell Funnel Model', 'Team Expansion Signals', 'Organic Adoption Pattern', 'Champion Mapping', 'CSAT/NPS Tracking', 'Renewal Readiness Tracker'],
        9: ['Inbound Conversion Rates', 'Outbound Play Performance', 'Channel Economics Clarity', 'Discovery Call Effectiveness', 'Demo-to-Close Flow', 'Founders Selling Model'],
        10: ['Enablement Asset Pack', 'Rep Ramp Plan', 'Win/Loss Tracker', 'Objection Handling Guide', 'ICP Filter Checklist', 'Sales Call Library'],
        11: ['Scorecard Model', 'Quota Structure', 'Weekly Deal Reviews', 'Forecasting Framework', 'Manager Coaching Loop', 'Talent Gap Identification'],
        12: ['Onboarding Checklist', 'Activation Tracker', 'Success Playbooks', 'Escalation SOPs', 'Renewals Pipeline', 'Churn Root-Cause Engine'],
        13: ['Category Narrative Canvas', 'Strategic Moat Design', 'Ecosystem Leverage Map', 'Competitor GTM Monitoring', 'Brand Architecture Plan', 'Defensive GTM Tactics'],
        14: ['System Architecture Diagram', 'Revenue Engine Map', 'Internal Dashboards', 'Tool Consolidation Tracker', 'RevOps Playbook', 'Internal SLA Policy'],
        15: ['VP Hiring Scorecards', 'Succession Plan Model', 'Executive Reporting Cadence', 'Culture Health Tracker', 'Leadership Org Chart', 'DEI Integration Plan'],
        16: ['Market Entry Checklist', 'Localization Infrastructure', 'International Pricing Matrix', 'Regional Compliance Tracker', 'Geo-Specific GTM Playbooks', 'Expansion Risk Assessment']
    };

    for (let subIdx = 1; subIdx <= 6; subIdx++) {
        const subcomponentId = `${blockId}-${subIdx}`;
        const subcomponentName = subcomponentNames[blockId][subIdx - 1];
        const blockName = blockNames[blockId];

        TEMPLATE_REGISTRY_COMPLETE[subcomponentId] = {
            id: subcomponentId,
            name: subcomponentName,
            blockId: blockId,
            blockName: blockName,
            templateType: subcomponentName.toLowerCase().replace(/\s+/g, '-'),
            description: `Template for ${subcomponentName} in ${blockName}`,
            version: '1.0.0',
            createdAt: '2025-01-01',
            updatedAt: '2025-01-01',
            sections: [
                {
                    id: 'overview',
                    title: 'Overview',
                    description: 'Overview and context',
                    fields: [
                        { name: 'title', type: 'text', required: true, placeholder: `${subcomponentName} Title` },
                        { name: 'description', type: 'textarea', required: true, placeholder: 'Detailed description' },
                        { name: 'context', type: 'textarea', required: true, placeholder: 'Business context' }
                    ]
                },
                {
                    id: 'details',
                    title: 'Details',
                    description: 'Key details and specifications',
                    fields: [
                        { name: 'key_elements', type: 'textarea', required: true, placeholder: 'Key elements' },
                        { name: 'success_criteria', type: 'textarea', required: true, placeholder: 'Success criteria' },
                        { name: 'metrics', type: 'textarea', required: true, placeholder: 'Key metrics' }
                    ]
                },
                {
                    id: 'action-plan',
                    title: 'Action Plan',
                    description: 'Implementation and next steps',
                    fields: [
                        { name: 'next_steps', type: 'textarea', required: true, placeholder: 'Next steps' },
                        { name: 'timeline', type: 'text', required: true, placeholder: 'Timeline' },
                        { name: 'owners', type: 'text', required: true, placeholder: 'Responsible parties' }
                    ]
                }
            ],
            customizableFields: ['title', 'description', 'context', 'key_elements', 'success_criteria', 'metrics', 'next_steps'],
            bestPractices: [
                'Be specific and actionable',
                'Include measurable outcomes',
                'Assign clear ownership',
                'Set realistic timelines',
                'Review and update regularly'
            ],
            outputFormats: ['PDF', 'DOCX', 'JSON'],
            tags: ['template', 'framework', 'execution']
        };
    }
}

module.exports = {
    TEMPLATE_REGISTRY_COMPLETE,
    getTemplate: (templateId) => TEMPLATE_REGISTRY_COMPLETE[templateId] || null,
    getTemplatesByBlock: (blockId) => Object.values(TEMPLATE_REGISTRY_COMPLETE).filter(t => t.blockId === blockId),
    getAllTemplates: () => Object.values(TEMPLATE_REGISTRY_COMPLETE),
    getTemplateCount: () => Object.keys(TEMPLATE_REGISTRY_COMPLETE).length
};

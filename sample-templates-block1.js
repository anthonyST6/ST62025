/**
 * Sample Templates for Block 1: Mission Discovery
 * Proof-of-concept templates for the first 3 subcomponents
 * These demonstrate the template structure and can be used as reference for other blocks
 */

const sampleTemplates = {
    // Block 1-1: Problem Statement Definition Template
    '1-1': {
        id: '1-1',
        name: 'Problem Statement Definition',
        blockId: 1,
        blockName: 'Mission Discovery',
        version: '1.0.0',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'active',
        
        // Template structure with customizable fields
        structure: {
            title: 'Problem Statement Definition Template',
            description: 'A comprehensive framework for articulating the specific problem your startup solves',
            sections: [
                {
                    id: 'executive-summary',
                    title: 'Executive Summary',
                    description: 'One-paragraph overview of the problem',
                    fields: [
                        {
                            id: 'problem-title',
                            label: 'Problem Title',
                            type: 'text',
                            placeholder: 'e.g., "GTM Execution Complexity for Early-Stage SaaS"',
                            required: true,
                            maxLength: 100
                        },
                        {
                            id: 'problem-summary',
                            label: 'Problem Summary',
                            type: 'textarea',
                            placeholder: 'Concise description of the core problem',
                            required: true,
                            maxLength: 500
                        }
                    ]
                },
                {
                    id: 'affected-audience',
                    title: 'Affected Audience',
                    description: 'Who experiences this problem most acutely?',
                    fields: [
                        {
                            id: 'primary-persona',
                            label: 'Primary Persona',
                            type: 'text',
                            placeholder: 'e.g., "VP of Sales at Series A SaaS startups"',
                            required: true
                        },
                        {
                            id: 'audience-size',
                            label: 'Estimated Audience Size',
                            type: 'number',
                            placeholder: 'Number of people affected',
                            required: false
                        },
                        {
                            id: 'pain-intensity',
                            label: 'Pain Intensity (1-10)',
                            type: 'number',
                            min: 1,
                            max: 10,
                            required: true
                        }
                    ]
                },
                {
                    id: 'problem-context',
                    title: 'Problem Context',
                    description: 'When and where does this problem occur?',
                    fields: [
                        {
                            id: 'when-occurs',
                            label: 'When Does This Problem Occur?',
                            type: 'textarea',
                            placeholder: 'Describe the timing and triggers',
                            required: true,
                            maxLength: 500
                        },
                        {
                            id: 'current-solutions',
                            label: 'Current Solutions/Workarounds',
                            type: 'textarea',
                            placeholder: 'How are people currently solving this?',
                            required: true,
                            maxLength: 500
                        },
                        {
                            id: 'solution-gaps',
                            label: 'Gaps in Current Solutions',
                            type: 'textarea',
                            placeholder: 'What is missing or broken?',
                            required: true,
                            maxLength: 500
                        }
                    ]
                },
                {
                    id: 'business-impact',
                    title: 'Business Impact',
                    description: 'What is the financial or operational impact?',
                    fields: [
                        {
                            id: 'financial-impact',
                            label: 'Financial Impact',
                            type: 'textarea',
                            placeholder: 'Cost of the problem (time, money, opportunity)',
                            required: true,
                            maxLength: 500
                        },
                        {
                            id: 'operational-impact',
                            label: 'Operational Impact',
                            type: 'textarea',
                            placeholder: 'How does this affect operations?',
                            required: false,
                            maxLength: 500
                        }
                    ]
                },
                {
                    id: 'validation',
                    title: 'Problem Validation',
                    description: 'Evidence that this problem is real and significant',
                    fields: [
                        {
                            id: 'validation-evidence',
                            label: 'Validation Evidence',
                            type: 'textarea',
                            placeholder: 'Customer interviews, surveys, data, etc.',
                            required: true,
                            maxLength: 1000
                        },
                        {
                            id: 'validation-sources',
                            label: 'Number of Validation Sources',
                            type: 'number',
                            placeholder: 'How many customers/sources validated this?',
                            required: true
                        }
                    ]
                }
            ]
        },
        
        // Best practices and guidelines
        guidelines: {
            tone: 'Professional, data-driven, specific',
            length: '2-3 pages',
            keyPrinciples: [
                'Be specific - avoid vague generalizations',
                'Use data - back claims with evidence',
                'Focus on the customer - not your solution',
                'Quantify impact - use numbers when possible',
                'Show validation - prove the problem exists'
            ],
            commonMistakes: [
                'Describing your solution instead of the problem',
                'Being too broad or generic',
                'Lacking customer validation',
                'Underestimating the problem\'s scope',
                'Mixing multiple problems together'
            ]
        },
        
        // Example content
        example: {
            'problem-title': 'GTM Execution Complexity for Early-Stage SaaS',
            'problem-summary': 'Early-stage B2B SaaS startups (Seed to Series B) struggle to build and execute effective go-to-market strategies due to lack of structured frameworks, expert guidance, and proven playbooks. They waste time and resources on trial-and-error approaches.',
            'primary-persona': 'VP of Sales / GTM Leader at Series A SaaS startups (10-50 employees)',
            'audience-size': 15000,
            'pain-intensity': 9,
            'when-occurs': 'During critical growth phases - when transitioning from founder-led sales to building a sales team, when trying to achieve product-market fit, and when preparing for fundraising rounds.',
            'current-solutions': 'Expensive consultants ($20-50K/month), generic online courses, scattered blog posts, trial-and-error approaches',
            'solution-gaps': 'Lack personalization, comprehensive frameworks, ongoing support, and measurable outcomes',
            'financial-impact': 'Startups lose 6-12 months of runway due to inefficient GTM execution, with 70% failing to hit growth targets. This translates to $500K-$2M in wasted resources.',
            'operational-impact': '40% longer sales cycles, 50% lower conversion rates compared to startups with structured GTM approaches',
            'validation-evidence': 'Interviewed 50+ founders who consistently reported GTM as their #1 challenge. Survey of 200 startups showed 85% lack structured GTM processes.',
            'validation-sources': 50
        },
        
        // Output formats supported
        outputFormats: ['PDF', 'DOCX', 'JSON', 'HTML'],
        
        // Metadata
        metadata: {
            category: 'Foundation',
            difficulty: 'Intermediate',
            estimatedCompletionTime: '2-3 hours',
            requiredInputs: ['who-affected', 'what-problem', 'when-occur', 'what-impact', 'how-solving', 'evidence-validation'],
            tags: ['problem-definition', 'market-validation', 'gtm-foundation']
        }
    },

    // Block 1-2: Mission Statement Template
    '1-2': {
        id: '1-2',
        name: 'Mission Statement',
        blockId: 1,
        blockName: 'Mission Discovery',
        version: '1.0.0',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'active',
        
        structure: {
            title: 'Mission Statement Template',
            description: 'Define your startup\'s purpose, vision, and core values',
            sections: [
                {
                    id: 'mission-core',
                    title: 'Core Mission',
                    description: 'Your fundamental purpose',
                    fields: [
                        {
                            id: 'mission-statement',
                            label: 'Mission Statement',
                            type: 'textarea',
                            placeholder: 'What is your startup\'s core purpose? (1-2 sentences)',
                            required: true,
                            maxLength: 300
                        },
                        {
                            id: 'vision-statement',
                            label: 'Vision Statement',
                            type: 'textarea',
                            placeholder: 'What world are you trying to create? (1-2 sentences)',
                            required: true,
                            maxLength: 300
                        }
                    ]
                },
                {
                    id: 'core-values',
                    title: 'Core Values',
                    description: 'What principles guide your decisions?',
                    fields: [
                        {
                            id: 'value-1',
                            label: 'Core Value #1',
                            type: 'text',
                            placeholder: 'e.g., "Customer-Obsessed"',
                            required: true
                        },
                        {
                            id: 'value-1-description',
                            label: 'Value #1 Description',
                            type: 'textarea',
                            placeholder: 'What does this value mean to us?',
                            required: true,
                            maxLength: 200
                        },
                        {
                            id: 'value-2',
                            label: 'Core Value #2',
                            type: 'text',
                            placeholder: 'e.g., "Execution Excellence"',
                            required: true
                        },
                        {
                            id: 'value-2-description',
                            label: 'Value #2 Description',
                            type: 'textarea',
                            placeholder: 'What does this value mean to us?',
                            required: true,
                            maxLength: 200
                        },
                        {
                            id: 'value-3',
                            label: 'Core Value #3',
                            type: 'text',
                            placeholder: 'e.g., "Continuous Learning"',
                            required: true
                        },
                        {
                            id: 'value-3-description',
                            label: 'Value #3 Description',
                            type: 'textarea',
                            placeholder: 'What does this value mean to us?',
                            required: true,
                            maxLength: 200
                        }
                    ]
                },
                {
                    id: 'strategic-goals',
                    title: 'Strategic Goals (3-Year)',
                    description: 'What do you want to achieve?',
                    fields: [
                        {
                            id: 'goal-1',
                            label: 'Strategic Goal #1',
                            type: 'textarea',
                            placeholder: 'What is your primary goal?',
                            required: true,
                            maxLength: 300
                        },
                        {
                            id: 'goal-2',
                            label: 'Strategic Goal #2',
                            type: 'textarea',
                            placeholder: 'What is your secondary goal?',
                            required: true,
                            maxLength: 300
                        },
                        {
                            id: 'goal-3',
                            label: 'Strategic Goal #3',
                            type: 'textarea',
                            placeholder: 'What is your tertiary goal?',
                            required: false,
                            maxLength: 300
                        }
                    ]
                },
                {
                    id: 'success-metrics',
                    title: 'Success Metrics',
                    description: 'How will you measure success?',
                    fields: [
                        {
                            id: 'metric-1',
                            label: 'Primary Metric',
                            type: 'text',
                            placeholder: 'e.g., "ARR Growth"',
                            required: true
                        },
                        {
                            id: 'metric-1-target',
                            label: 'Target Value',
                            type: 'text',
                            placeholder: 'e.g., "$10M ARR by Year 3"',
                            required: true
                        },
                        {
                            id: 'metric-2',
                            label: 'Secondary Metric',
                            type: 'text',
                            placeholder: 'e.g., "Customer Retention"',
                            required: true
                        },
                        {
                            id: 'metric-2-target',
                            label: 'Target Value',
                            type: 'text',
                            placeholder: 'e.g., "95% NRR"',
                            required: true
                        }
                    ]
                }
            ]
        },
        
        guidelines: {
            tone: 'Inspirational yet grounded, authentic, forward-looking',
            length: '1-2 pages',
            keyPrinciples: [
                'Be authentic - reflect your true purpose',
                'Be specific - avoid corporate jargon',
                'Be inspiring - motivate your team',
                'Be measurable - include concrete goals',
                'Be aligned - ensure team agreement'
            ],
            commonMistakes: [
                'Using generic corporate language',
                'Making it too long or complicated',
                'Lacking team alignment',
                'Setting unrealistic goals',
                'Forgetting to revisit and update'
            ]
        },
        
        example: {
            'mission-statement': 'To empower early-stage B2B SaaS startups with the frameworks, tools, and guidance they need to build scalable go-to-market operations.',
            'vision-statement': 'A world where every startup, regardless of size or resources, has access to world-class GTM expertise and can compete effectively in their markets.',
            'value-1': 'Customer-Obsessed',
            'value-1-description': 'We deeply understand our customers\' challenges and design solutions that solve real problems, not imagined ones.',
            'value-2': 'Execution Excellence',
            'value-2-description': 'We deliver high-quality work on time, every time. We take ownership and drive results.',
            'value-3': 'Continuous Learning',
            'value-3-description': 'We stay current with market trends, learn from failures, and continuously improve our frameworks and tools.',
            'goal-1': 'Achieve $5M ARR with 100+ enterprise customers',
            'goal-2': 'Build a team of 50+ experts across GTM disciplines',
            'goal-3': 'Establish ScaleOps6 as the industry standard for GTM frameworks',
            'metric-1': 'ARR Growth',
            'metric-1-target': '$5M ARR by Year 3',
            'metric-2': 'Customer Retention',
            'metric-2-target': '95% NRR'
        },
        
        outputFormats: ['PDF', 'DOCX', 'JSON', 'HTML'],
        
        metadata: {
            category: 'Foundation',
            difficulty: 'Intermediate',
            estimatedCompletionTime: '3-4 hours',
            requiredInputs: ['mission-statement', 'vision-statement', 'core-values', 'strategic-goals'],
            tags: ['mission', 'vision', 'values', 'strategy']
        }
    },

    // Block 1-3: Voice of Customer Template
    '1-3': {
        id: '1-3',
        name: 'Voice of Customer',
        blockId: 1,
        blockName: 'Mission Discovery',
        version: '1.0.0',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'active',
        
        structure: {
            title: 'Voice of Customer Template',
            description: 'Capture and synthesize customer insights from interviews and research',
            sections: [
                {
                    id: 'research-overview',
                    title: 'Research Overview',
                    description: 'Summary of your customer research',
                    fields: [
                        {
                            id: 'research-period',
                            label: 'Research Period',
                            type: 'text',
                            placeholder: 'e.g., "Q3 2024"',
                            required: true
                        },
                        {
                            id: 'interviews-conducted',
                            label: 'Number of Interviews',
                            type: 'number',
                            placeholder: 'How many customers did you interview?',
                            required: true
                        },
                        {
                            id: 'research-methods',
                            label: 'Research Methods Used',
                            type: 'textarea',
                            placeholder: 'e.g., "In-depth interviews, surveys, user testing"',
                            required: true,
                            maxLength: 300
                        }
                    ]
                },
                {
                    id: 'key-insights',
                    title: 'Key Customer Insights',
                    description: 'Top insights from your research',
                    fields: [
                        {
                            id: 'insight-1',
                            label: 'Insight #1',
                            type: 'textarea',
                            placeholder: 'What did you learn?',
                            required: true,
                            maxLength: 300
                        },
                        {
                            id: 'insight-1-evidence',
                            label: 'Supporting Evidence',
                            type: 'textarea',
                            placeholder: 'Customer quotes or data',
                            required: true,
                            maxLength: 300
                        },
                        {
                            id: 'insight-2',
                            label: 'Insight #2',
                            type: 'textarea',
                            placeholder: 'What did you learn?',
                            required: true,
                            maxLength: 300
                        },
                        {
                            id: 'insight-2-evidence',
                            label: 'Supporting Evidence',
                            type: 'textarea',
                            placeholder: 'Customer quotes or data',
                            required: true,
                            maxLength: 300
                        },
                        {
                            id: 'insight-3',
                            label: 'Insight #3',
                            type: 'textarea',
                            placeholder: 'What did you learn?',
                            required: false,
                            maxLength: 300
                        },
                        {
                            id: 'insight-3-evidence',
                            label: 'Supporting Evidence',
                            type: 'textarea',
                            placeholder: 'Customer quotes or data',
                            required: false,
                            maxLength: 300
                        }
                    ]
                },
                {
                    id: 'customer-needs',
                    title: 'Customer Needs & Desires',
                    description: 'What do customers really need?',
                    fields: [
                        {
                            id: 'functional-needs',
                            label: 'Functional Needs',
                            type: 'textarea',
                            placeholder: 'What tasks do they need to accomplish?',
                            required: true,
                            maxLength: 500
                        },
                        {
                            id: 'emotional-needs',
                            label: 'Emotional Needs',
                            type: 'textarea',
                            placeholder: 'How do they want to feel?',
                            required: true,
                            maxLength: 500
                        },
                        {
                            id: 'business-needs',
                            label: 'Business Needs',
                            type: 'textarea',
                            placeholder: 'What business outcomes do they want?',
                            required: true,
                            maxLength: 500
                        }
                    ]
                },
                {
                    id: 'pain-points',
                    title: 'Customer Pain Points',
                    description: 'What frustrates your customers?',
                    fields: [
                        {
                            id: 'pain-point-1',
                            label: 'Pain Point #1',
                            type: 'text',
                            placeholder: 'e.g., "Time-consuming manual processes"',
                            required: true
                        },
                        {
                            id: 'pain-point-1-severity',
                            label: 'Severity (1-10)',
                            type: 'number',
                            min: 1,
                            max: 10,
                            required: true
                        },
                        {
                            id: 'pain-point-2',
                            label: 'Pain Point #2',
                            type: 'text',
                            placeholder: 'e.g., "Lack of visibility"',
                            required: true
                        },
                        {
                            id: 'pain-point-2-severity',
                            label: 'Severity (1-10)',
                            type: 'number',
                            min: 1,
                            max: 10,
                            required: true
                        }
                    ]
                },
                {
                    id: 'recommendations',
                    title: 'Recommendations',
                    description: 'What should we do based on this research?',
                    fields: [
                        {
                            id: 'recommendation-1',
                            label: 'Recommendation #1',
                            type: 'textarea',
                            placeholder: 'What action should we take?',
                            required: true,
                            maxLength: 300
                        },
                        {
                            id: 'recommendation-2',
                            label: 'Recommendation #2',
                            type: 'textarea',
                            placeholder: 'What action should we take?',
                            required: true,
                            maxLength: 300
                        }
                    ]
                }
            ]
        },
        
        guidelines: {
            tone: 'Objective, evidence-based, customer-centric',
            length: '2-3 pages',
            keyPrinciples: [
                'Use direct customer quotes',
                'Back insights with data',
                'Focus on customer perspective',
                'Identify patterns across interviews',
                'Translate insights into actions'
            ],
            commonMistakes: [
                'Interpreting instead of reporting',
                'Lacking supporting evidence',
                'Interviewing too few customers',
                'Confirmation bias',
                'Not acting on insights'
            ]
        },
        
        example: {
            'research-period': 'Q3 2024',
            'interviews-conducted': 25,
            'research-methods': 'In-depth interviews (15), surveys (200 responses), user testing sessions (5)',
            'insight-1': 'GTM leaders spend 60% of their time on manual, repetitive tasks instead of strategic work',
            'insight-1-evidence': '"I spend more time in spreadsheets than talking to customers" - VP Sales, Series A SaaS',
            'insight-2': 'Lack of structured frameworks leads to inconsistent execution across teams',
            'insight-2-evidence': '"Every rep does things differently. We have no playbook" - Sales Manager, Series B SaaS',
            'functional-needs': 'Automated workflows, centralized playbooks, real-time dashboards, integration with existing tools',
            'emotional-needs': 'Confidence in their GTM strategy, peace of mind, sense of control',
            'business-needs': 'Faster sales cycles, higher conversion rates, improved retention, predictable revenue',
            'pain-point-1': 'Manual, time-consuming processes',
            'pain-point-1-severity': 9,
            'pain-point-2': 'Lack of structured frameworks',
            'pain-point-2-severity': 8,
            'recommendation-1': 'Build automated workflow templates for common GTM processes',
            'recommendation-2': 'Create industry-specific playbooks based on best practices'
        },
        
        outputFormats: ['PDF', 'DOCX', 'JSON', 'HTML'],
        
        metadata: {
            category: 'Research',
            difficulty: 'Intermediate',
            estimatedCompletionTime: '4-6 hours',
            requiredInputs: ['research-overview', 'key-insights', 'customer-needs', 'pain-points'],
            tags: ['customer-research', 'voice-of-customer', 'insights', 'validation']
        }
    }
};

module.exports = { sampleTemplates };

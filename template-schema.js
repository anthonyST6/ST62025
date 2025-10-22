/**
 * Template Schema Definition
 * Defines the permanent structure and fields for all 96 subcomponent templates
 * 
 * Each template has:
 * - Core sections (What, Why, How)
 * - Customizable fields (populated by analysis)
 * - Industry best practices
 * - Validation criteria
 * - Output format specifications
 */

const TEMPLATE_SCHEMA = {
    // ============================================
    // BLOCK 1: MISSION DISCOVERY
    // ============================================
    
    '1-1': {
        id: '1-1',
        name: 'Problem Statement Definition',
        blockId: 1,
        blockName: 'Mission Discovery',
        description: 'Focused articulation of the specific problem you solve',
        templateType: 'problem-statement',
        
        // Permanent sections (always present)
        sections: {
            executive_summary: {
                title: 'Executive Summary',
                description: 'One-paragraph overview of the problem',
                type: 'text',
                required: true,
                maxLength: 500,
                placeholder: 'Describe the core problem in 2-3 sentences'
            },
            problem_definition: {
                title: 'Problem Definition',
                description: 'Detailed articulation of the problem',
                type: 'rich-text',
                required: true,
                subsections: {
                    who_affected: {
                        title: 'Who is affected?',
                        type: 'text',
                        required: true
                    },
                    what_problem: {
                        title: 'What is the problem?',
                        type: 'text',
                        required: true
                    },
                    when_occurs: {
                        title: 'When does it occur?',
                        type: 'text',
                        required: true
                    },
                    impact: {
                        title: 'What is the impact?',
                        type: 'text',
                        required: true
                    }
                }
            },
            current_solutions: {
                title: 'Current Solutions & Gaps',
                description: 'How the problem is currently being addressed',
                type: 'rich-text',
                required: true,
                subsections: {
                    existing_approaches: {
                        title: 'Existing approaches',
                        type: 'text'
                    },
                    limitations: {
                        title: 'Limitations of current solutions',
                        type: 'text'
                    }
                }
            },
            validation: {
                title: 'Problem Validation',
                description: 'Evidence that this problem is real and significant',
                type: 'rich-text',
                required: true,
                subsections: {
                    customer_interviews: {
                        title: 'Customer interviews',
                        type: 'text'
                    },
                    market_research: {
                        title: 'Market research',
                        type: 'text'
                    },
                    quantified_impact: {
                        title: 'Quantified impact',
                        type: 'text'
                    }
                }
            },
            recommendations: {
                title: 'Recommendations',
                description: 'Next steps to strengthen problem definition',
                type: 'array',
                itemType: 'recommendation',
                required: false
            }
        },
        
        // Customizable fields (populated by analysis)
        customizableFields: [
            'executive_summary',
            'problem_definition.who_affected',
            'problem_definition.what_problem',
            'problem_definition.when_occurs',
            'problem_definition.impact',
            'current_solutions.existing_approaches',
            'current_solutions.limitations',
            'validation.customer_interviews',
            'validation.market_research',
            'validation.quantified_impact'
        ],
        
        // Output formats supported
        outputFormats: ['pdf', 'docx', 'json', 'html'],
        
        // Validation criteria
        validationCriteria: {
            completeness: {
                required_sections: ['problem_definition', 'validation'],
                min_word_count: 500
            },
            quality: {
                specificity: 'Problem must be specific to target customer',
                measurability: 'Impact must be quantifiable',
                clarity: 'Language must be clear and professional'
            }
        },
        
        // Industry best practices
        bestPractices: [
            'Focus on customer pain, not your solution',
            'Use specific metrics and data',
            'Include direct customer quotes',
            'Validate with at least 10 customer interviews',
            'Quantify the financial impact'
        ],
        
        // Template version
        version: '1.0.0',
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01'
    },
    
    '1-2': {
        id: '1-2',
        name: 'Mission Statement',
        blockId: 1,
        blockName: 'Mission Discovery',
        description: 'Declaration of the startup\'s purpose and vision',
        templateType: 'mission-statement',
        
        sections: {
            mission_statement: {
                title: 'Mission Statement',
                description: 'Core purpose of the organization',
                type: 'text',
                required: true,
                maxLength: 200,
                placeholder: 'What is your company\'s core purpose?'
            },
            vision_statement: {
                title: 'Vision Statement',
                description: 'Long-term aspiration',
                type: 'text',
                required: true,
                maxLength: 200,
                placeholder: 'What world do you want to create?'
            },
            core_values: {
                title: 'Core Values',
                description: 'Principles that guide decision-making',
                type: 'array',
                itemType: 'value',
                required: true,
                minItems: 3,
                maxItems: 5
            },
            strategic_pillars: {
                title: 'Strategic Pillars',
                description: 'Key areas of focus',
                type: 'array',
                itemType: 'pillar',
                required: true,
                minItems: 3,
                maxItems: 5
            },
            success_metrics: {
                title: 'Success Metrics',
                description: 'How you measure mission achievement',
                type: 'array',
                itemType: 'metric',
                required: true
            }
        },
        
        customizableFields: [
            'mission_statement',
            'vision_statement',
            'core_values',
            'strategic_pillars',
            'success_metrics'
        ],
        
        outputFormats: ['pdf', 'docx', 'json', 'html'],
        
        validationCriteria: {
            completeness: {
                required_sections: ['mission_statement', 'vision_statement', 'core_values'],
                min_word_count: 300
            },
            quality: {
                inspiration: 'Mission should inspire team',
                clarity: 'Vision should be clear and aspirational',
                alignment: 'Values should align with mission'
            }
        },
        
        bestPractices: [
            'Keep mission statement to 1-2 sentences',
            'Make vision bold but achievable',
            'Limit core values to 3-5',
            'Ensure values are lived, not just stated',
            'Review and refine annually'
        ],
        
        version: '1.0.0',
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01'
    },
    
    '1-3': {
        id: '1-3',
        name: 'Voice of Customer',
        blockId: 1,
        blockName: 'Mission Discovery',
        description: 'Raw and synthesized data from target users',
        templateType: 'voice-of-customer',
        
        sections: {
            customer_segments: {
                title: 'Customer Segments',
                description: 'Identified customer groups',
                type: 'array',
                itemType: 'segment',
                required: true
            },
            customer_interviews: {
                title: 'Customer Interview Insights',
                description: 'Key findings from customer conversations',
                type: 'rich-text',
                required: true,
                subsections: {
                    interview_summary: {
                        title: 'Interview Summary',
                        type: 'text'
                    },
                    key_quotes: {
                        title: 'Key Customer Quotes',
                        type: 'array',
                        itemType: 'quote'
                    },
                    patterns: {
                        title: 'Recurring Patterns',
                        type: 'array',
                        itemType: 'pattern'
                    }
                }
            },
            pain_points: {
                title: 'Pain Points',
                description: 'Customer challenges and frustrations',
                type: 'array',
                itemType: 'pain-point',
                required: true
            },
            desired_outcomes: {
                title: 'Desired Outcomes',
                description: 'What customers want to achieve',
                type: 'array',
                itemType: 'outcome',
                required: true
            },
            recommendations: {
                title: 'Recommendations',
                description: 'Actions based on customer feedback',
                type: 'array',
                itemType: 'recommendation',
                required: false
            }
        },
        
        customizableFields: [
            'customer_segments',
            'customer_interviews.key_quotes',
            'customer_interviews.patterns',
            'pain_points',
            'desired_outcomes'
        ],
        
        outputFormats: ['pdf', 'docx', 'json', 'html'],
        
        validationCriteria: {
            completeness: {
                required_sections: ['customer_interviews', 'pain_points', 'desired_outcomes'],
                min_interviews: 10
            },
            quality: {
                specificity: 'Insights must be specific and actionable',
                diversity: 'Include perspectives from multiple customer types',
                evidence: 'Support insights with direct quotes'
            }
        },
        
        bestPractices: [
            'Conduct at least 10 customer interviews',
            'Use open-ended questions',
            'Record and transcribe interviews',
            'Look for patterns across interviews',
            'Include direct customer quotes',
            'Validate findings with additional research'
        ],
        
        version: '1.0.0',
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01'
    },
    
    '1-4': {
        id: '1-4',
        name: 'Founding Team Capability',
        blockId: 1,
        blockName: 'Mission Discovery',
        description: 'Audit of founding team\'s ability to execute',
        templateType: 'team-capability',
        
        sections: {
            team_composition: {
                title: 'Team Composition',
                description: 'Founding team members and roles',
                type: 'array',
                itemType: 'team-member',
                required: true,
                subsections: {
                    name: { type: 'text' },
                    role: { type: 'text' },
                    background: { type: 'text' },
                    relevant_experience: { type: 'text' }
                }
            },
            core_competencies: {
                title: 'Core Competencies',
                description: 'Key skills and expertise',
                type: 'array',
                itemType: 'competency',
                required: true
            },
            capability_gaps: {
                title: 'Capability Gaps',
                description: 'Areas where team needs to develop or hire',
                type: 'array',
                itemType: 'gap',
                required: true
            },
            hiring_plan: {
                title: 'Hiring Plan',
                description: 'Strategy for filling gaps',
                type: 'rich-text',
                required: false
            },
            team_dynamics: {
                title: 'Team Dynamics',
                description: 'How the team works together',
                type: 'text',
                required: false
            }
        },
        
        customizableFields: [
            'team_composition',
            'core_competencies',
            'capability_gaps',
            'hiring_plan'
        ],
        
        outputFormats: ['pdf', 'docx', 'json', 'html'],
        
        validationCriteria: {
            completeness: {
                required_sections: ['team_composition', 'core_competencies', 'capability_gaps'],
                min_team_members: 2
            },
            quality: {
                experience: 'Team should have relevant industry experience',
                complementarity: 'Skills should be complementary',
                commitment: 'Team should be fully committed'
            }
        },
        
        bestPractices: [
            'Ensure complementary skill sets',
            'Look for relevant industry experience',
            'Assess team dynamics and communication',
            'Identify gaps early',
            'Plan for key hires',
            'Document decision-making process'
        ],
        
        version: '1.0.0',
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01'
    },
    
    '1-5': {
        id: '1-5',
        name: 'Market Landscape',
        blockId: 1,
        blockName: 'Mission Discovery',
        description: 'Summary of market landscape and timing',
        templateType: 'market-landscape',
        
        sections: {
            market_overview: {
                title: 'Market Overview',
                description: 'Size, growth, and trends',
                type: 'rich-text',
                required: true,
                subsections: {
                    market_size: { type: 'text' },
                    growth_rate: { type: 'text' },
                    market_trends: { type: 'array', itemType: 'trend' }
                }
            },
            competitive_landscape: {
                title: 'Competitive Landscape',
                description: 'Key competitors and positioning',
                type: 'array',
                itemType: 'competitor',
                required: true
            },
            market_timing: {
                title: 'Market Timing',
                description: 'Why now is the right time',
                type: 'text',
                required: true
            },
            regulatory_environment: {
                title: 'Regulatory Environment',
                description: 'Relevant regulations and compliance',
                type: 'text',
                required: false
            },
            market_opportunities: {
                title: 'Market Opportunities',
                description: 'Gaps and opportunities',
                type: 'array',
                itemType: 'opportunity',
                required: true
            }
        },
        
        customizableFields: [
            'market_overview',
            'competitive_landscape',
            'market_timing',
            'market_opportunities'
        ],
        
        outputFormats: ['pdf', 'docx', 'json', 'html'],
        
        validationCriteria: {
            completeness: {
                required_sections: ['market_overview', 'competitive_landscape', 'market_timing'],
                min_word_count: 500
            },
            quality: {
                data_backed: 'Use credible market research',
                specificity: 'Include specific market data',
                timing_clarity: 'Clearly articulate why now'
            }
        },
        
        bestPractices: [
            'Use credible market research sources',
            'Include specific market size data',
            'Analyze at least 3-5 competitors',
            'Identify market trends',
            'Articulate clear market timing rationale',
            'Update quarterly'
        ],
        
        version: '1.0.0',
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01'
    },
    
    '1-6': {
        id: '1-6',
        name: 'Launch Readiness',
        blockId: 1,
        blockName: 'Mission Discovery',
        description: 'Concrete plan to launch functional prototype',
        templateType: 'launch-readiness',
        
        sections: {
            launch_objectives: {
                title: 'Launch Objectives',
                description: 'What you want to achieve with launch',
                type: 'array',
                itemType: 'objective',
                required: true
            },
            launch_timeline: {
                title: 'Launch Timeline',
                description: 'Key milestones and dates',
                type: 'array',
                itemType: 'milestone',
                required: true
            },
            go_to_market_strategy: {
                title: 'Go-to-Market Strategy',
                description: 'How you\'ll reach initial customers',
                type: 'rich-text',
                required: true
            },
            resource_requirements: {
                title: 'Resource Requirements',
                description: 'Budget, team, and tools needed',
                type: 'rich-text',
                required: true
            },
            success_metrics: {
                title: 'Success Metrics',
                description: 'How you\'ll measure launch success',
                type: 'array',
                itemType: 'metric',
                required: true
            },
            risk_mitigation: {
                title: 'Risk Mitigation',
                description: 'Potential risks and mitigation strategies',
                type: 'array',
                itemType: 'risk',
                required: false
            }
        },
        
        customizableFields: [
            'launch_objectives',
            'launch_timeline',
            'go_to_market_strategy',
            'resource_requirements',
            'success_metrics'
        ],
        
        outputFormats: ['pdf', 'docx', 'json', 'html'],
        
        validationCriteria: {
            completeness: {
                required_sections: ['launch_objectives', 'launch_timeline', 'go_to_market_strategy'],
                min_milestones: 5
            },
            quality: {
                specificity: 'Milestones should be specific and measurable',
                realism: 'Timeline should be realistic',
                clarity: 'Strategy should be clear and actionable'
            }
        },
        
        bestPractices: [
            'Set clear, measurable launch objectives',
            'Create detailed timeline with milestones',
            'Define success metrics upfront',
            'Identify and mitigate key risks',
            'Allocate sufficient resources',
            'Plan for post-launch iteration'
        ],
        
        version: '1.0.0',
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01'
    },
    
    // ============================================
    // BLOCK 2: CUSTOMER INSIGHTS (2-1 through 2-6)
    // ============================================
    
    '2-1': {
        id: '2-1',
        name: 'Interview Cadence Plan',
        blockId: 2,
        blockName: 'Customer Insights',
        description: 'Structured plan for recurring customer discovery',
        templateType: 'interview-cadence',
        
        sections: {
            interview_objectives: {
                title: 'Interview Objectives',
                description: 'What you want to learn',
                type: 'array',
                itemType: 'objective',
                required: true
            },
            interview_frequency: {
                title: 'Interview Frequency',
                description: 'How often and with whom',
                type: 'text',
                required: true
            },
            interview_guide: {
                title: 'Interview Guide',
                description: 'Key questions and topics',
                type: 'array',
                itemType: 'question',
                required: true
            },
            participant_selection: {
                title: 'Participant Selection',
                description: 'Who to interview and why',
                type: 'text',
                required: true
            },
            documentation_process: {
                title: 'Documentation Process',
                description: 'How to record and analyze interviews',
                type: 'text',
                required: true
            },
            action_items: {
                title: 'Action Items',
                description: 'How insights drive decisions',
                type: 'array',
                itemType: 'action-item',
                required: false
            }
        },
        
        customizableFields: [
            'interview_objectives',
            'interview_frequency',
            'interview_guide',
            'participant_selection'
        ],
        
        outputFormats: ['pdf', 'docx', 'json', 'html'],
        
        validationCriteria: {
            completeness: {
                required_sections: ['interview_objectives', 'interview_guide', 'participant_selection'],
                min_questions: 5
            },
            quality: {
                clarity: 'Questions should be clear and open-ended',
                diversity: 'Include diverse participant types',
                actionability: 'Insights should drive decisions'
            }
        },
        
        bestPractices: [
            'Conduct interviews at least monthly',
            'Use open-ended questions',
            'Interview at least 5-10 customers per cycle',
            'Document all interviews',
            'Look for patterns across interviews',
            'Share insights with team regularly'
        ],
        
        version: '1.0.0',
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01'
    },
    
    // Additional Block 2 templates (2-2 through 2-6) follow similar structure
    // For brevity, showing the pattern - full implementation would include all
    
    '2-2': {
        id: '2-2',
        name: 'Personas Framework',
        blockId: 2,
        blockName: 'Customer Insights',
        description: 'Documented archetypes of key users and buyers',
        templateType: 'personas-framework',
        
        sections: {
            persona_overview: {
                title: 'Persona Overview',
                description: 'Summary of each persona',
                type: 'array',
                itemType: 'persona',
                required: true,
                subsections: {
                    name: { type: 'text' },
                    role: { type: 'text' },
                    demographics: { type: 'text' },
                    goals: { type: 'array', itemType: 'goal' },
                    pain_points: { type: 'array', itemType: 'pain-point' },
                    buying_criteria: { type: 'array', itemType: 'criteria' }
                }
            },
            persona_journey: {
                title: 'Persona Journey',
                description: 'How each persona interacts with your solution',
                type: 'array',
                itemType: 'journey-stage',
                required: true
            },
            messaging_by_persona: {
                title: 'Messaging by Persona',
                description: 'How to message to each persona',
                type: 'array',
                itemType: 'messaging',
                required: false
            }
        },
        
        customizableFields: [
            'persona_overview',
            'persona_journey',
            'messaging_by_persona'
        ],
        
        outputFormats: ['pdf', 'docx', 'json', 'html'],
        
        validationCriteria: {
            completeness: {
                required_sections: ['persona_overview'],
                min_personas: 2,
                max_personas: 5
            },
            quality: {
                specificity: 'Personas should be specific and detailed',
                research_backed: 'Based on actual customer research',
                actionability: 'Should guide product and marketing decisions'
            }
        },
        
        bestPractices: [
            'Create 2-5 personas maximum',
            'Base on actual customer research',
            'Include specific details and quotes',
            'Update annually',
            'Share with entire team',
            'Use in product and marketing decisions'
        ],
        
        version: '1.0.0',
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01'
    }
    
    // ... Additional templates for 2-3 through 2-6, Block 3, etc.
    // Full implementation would include all 96 subcomponents
};

/**
 * Template Field Types
 * Defines the structure of different field types used in templates
 */
const FIELD_TYPES = {
    text: {
        type: 'string',
        validation: 'text',
        maxLength: 1000
    },
    'rich-text': {
        type: 'string',
        validation: 'html',
        maxLength: 5000
    },
    number: {
        type: 'number',
        validation: 'numeric'
    },
    date: {
        type: 'string',
        validation: 'date',
        format: 'YYYY-MM-DD'
    },
    array: {
        type: 'array',
        validation: 'array'
    },
    object: {
        type: 'object',
        validation: 'object'
    }
};

/**
 * Template Recommendation Item
 * Standard structure for recommendations across all templates
 */
const RECOMMENDATION_ITEM = {
    area: 'string',           // Area for improvement
    current_state: 'string',  // Current situation
    recommended_action: 'string', // What to do
    expected_impact: 'string', // What will improve
    priority: 'high|medium|low', // Priority level
    timeline: 'string'        // When to implement
};

/**
 * Get template schema for a specific subcomponent
 */
function getTemplateSchema(subcomponentId) {
    return TEMPLATE_SCHEMA[subcomponentId] || null;
}

/**
 * Get all customizable fields for a template
 */
function getCustomizableFields(subcomponentId) {
    const schema = TEMPLATE_SCHEMA[subcomponentId];
    return schema ? schema.customizableFields : [];
}

/**
 * Validate template data against schema
 */
function validateTemplateData(subcomponentId, data) {
    const schema = TEMPLATE_SCHEMA[subcomponentId];
    if (!schema) {
        return { valid: false, errors: ['Template schema not found'] };
    }
    
    const errors = [];
    
    // Check required sections
    if (schema.validationCriteria && schema.validationCriteria.completeness) {
        const required = schema.validationCriteria.completeness.required_sections || [];
        required.forEach(section => {
            if (!data[section] || (typeof data[section] === 'string' && data[section].trim() === '')) {
                errors.push(`Required section missing: ${section}`);
            }
        });
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}

module.exports = {
    TEMPLATE_SCHEMA,
    FIELD_TYPES,
    RECOMMENDATION_ITEM,
    getTemplateSchema,
    getCustomizableFields,
    validateTemplateData
};

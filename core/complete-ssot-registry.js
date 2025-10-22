/**
 * Complete SSOT Registry - Single Source of Truth
 * 
 * This registry contains ALL data for all 96 subcomponents:
 * - Identity and metadata
 * - Agent information and scoring dimensions
 * - Educational content (what/why/how)
 * - Workspace questions and tools
 * - Analysis dimensions and criteria
 * - Resource templates and metrics
 * - Output templates
 * 
 * Generated: 2025-10-06T20:49:42.944Z
 * Version: 2.0.0
 * 
 * ALL systems should consume from this registry.
 * DO NOT edit manually - regenerate using core/generate-complete-ssot.js
 */

const COMPLETE_SSOT_REGISTRY = {
  "1-1": {
    "id": "1-1",
    "name": "Problem Statement Definition",
    "blockId": 1,
    "blockName": "Mission Discovery",
    "subId": 1,
    "phase": 1,
    "phaseName": "Idea Market Fit",
    "category": "foundation",
    "agent": {
      "name": "Problem Definition Evaluator",
      "key": "1a",
      "description": "Expert in assessing problem clarity and market relevance",
      "domain": "Problem Statement Definition"
    },
    "education": {
      "title": "Problem Statement Definition",
      "what": "A focused, plain-language articulation of the specific problem you solve for a clearly defined customer. This is not just a description of the industry or trend — it's a user-centered, situationally grounded pain point.",
      "why": "Startups often fail not because they can't build, but because they build something nobody truly needs. A strong problem statement helps align GTM, product, and messaging from the start.",
      "how": "\n      <h4>Key Components to Include:</h4>\n      <ul>\n        <li><strong>Who experiences the problem</strong> - Define your persona/segment clearly</li>\n        <li><strong>When/where it arises</strong> - Identify contextual triggers</li>\n        <li><strong>The negative impact</strong> - Quantify emotional, operational, or financial costs</li>\n        <li><strong>Validation evidence</strong> - Include quotes or metrics that prove existence</li>\n        <li><strong>Gap analysis</strong> - Explain why existing solutions aren't enough</li>\n      </ul>\n      \n      <h4>Best Practices:</h4>\n      <ul>\n        <li>Keep it under 100 words for clarity</li>\n        <li>Use customer language, not technical jargon</li>\n        <li>Focus on one primary problem initially</li>\n        <li>Test with 5+ potential customers for validation</li>\n      </ul>\n      \n      <h4>Common Pitfalls:</h4>\n      <ul>\n        <li>Being too broad or vague</li>\n        <li>Focusing on features instead of problems</li>\n        <li>Assuming without validating</li>\n        <li>Mixing multiple problems together</li>\n      </ul>\n    ",
      "examples": [
        "HR leaders in mid-market SaaS companies waste 12+ hours per week on manual onboarding tasks, leading to delayed productivity and 30% higher first-year turnover.",
        "Product managers at enterprise software companies struggle to prioritize features effectively, resulting in 40% of development effort going to features that see <10% adoption."
      ],
      "keyMetrics": [
        {
          "value": "3x",
          "label": "Faster Validation",
          "description": "Problem-solution fit speed"
        },
        {
          "value": "67%",
          "label": "Higher Success Rate",
          "description": "Validated vs unvalidated startups"
        },
        {
          "value": "45%",
          "label": "Lower Risk",
          "description": "Failure rate reduction"
        },
        {
          "value": "2.5x",
          "label": "Better Alignment",
          "description": "Team and market fit"
        }
      ]
    },
    "workspace": {
      "domain": "Problem Statement Definition",
      "questions": [
        {
          "id": "1-1-q1",
          "text": "What is the core problem you're addressing in problem statement definition?",
          "type": "diagnostic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Problem Statement Definition for ST6Co/ScaleOps6Product"
        },
        {
          "id": "1-1-q2",
          "text": "How does this problem impact your operations?",
          "type": "diagnostic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Problem Statement Definition for ST6Co/ScaleOps6Product"
        },
        {
          "id": "1-1-q3",
          "text": "What evidence validates this problem exists?",
          "type": "validation",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Problem Statement Definition for ST6Co/ScaleOps6Product"
        },
        {
          "id": "1-1-q4",
          "text": "How does this align with your mission and vision?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "1-1-q5",
          "text": "What specific evidence demonstrates your Problem Statement Definition effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "1-1-q6",
          "text": "What are your next steps to improve Problem Statement Definition?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Customer Interview Recording Tools (Gong, Chorus)",
        "Survey Platforms (Typeform, SurveyMonkey)",
        "Analytics Tools (Mixpanel, Amplitude)",
        "User Research Platforms (UserVoice, Canny)"
      ],
      "templates": [
        "Problem Statement Canvas",
        "Customer Pain Interview Guide",
        "Problem Validation Scorecard",
        "Pain Point Prioritization Matrix"
      ],
      "bestPractices": [
        "Interview at least 20 potential customers before finalizing",
        "Use the '5 Whys' technique to get to root causes",
        "Document all assumptions and validate each one",
        "Focus on problems, not solutions during discovery"
      ]
    },
    "analysis": {
      "domain": "Problem Statement Definition",
      "dimensions": [
        {
          "name": "Problem Clarity",
          "weight": 20,
          "description": "How well-defined and specific is the problem?"
        },
        {
          "name": "Market Validation",
          "weight": 20,
          "description": "Evidence of real market need"
        },
        {
          "name": "Solution Fit",
          "weight": 20,
          "description": "Alignment between problem and proposed solution"
        },
        {
          "name": "Impact Potential",
          "weight": 20,
          "description": "Size and severity of the problem"
        },
        {
          "name": "Differentiation",
          "weight": 20,
          "description": "Uniqueness of approach to solving"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Problem is vague, unvalidated, or trivial",
        "26-50": "Problem exists but lacks clarity or validation",
        "51-75": "Clear problem with some validation and impact",
        "76-90": "Well-defined problem with strong validation",
        "91-100": "Crystal clear, validated, high-impact problem"
      }
    },
    "resources": {
      "domain": "Problem Statement Definition",
      "templates": [
        "Problem Statement Canvas",
        "Customer Pain Interview Guide",
        "Problem Validation Scorecard",
        "Pain Point Prioritization Matrix"
      ],
      "metrics": [
        "Problem severity score (1-10)",
        "Frequency of occurrence",
        "Number of customers validated",
        "Economic impact quantified"
      ]
    },
    "outputs": {
      "domain": "Problem Statement Definition",
      "templates": [
        "Problem Statement Canvas",
        "Customer Pain Interview Guide",
        "Problem Validation Scorecard",
        "Pain Point Prioritization Matrix"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.931Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "1-2": {
    "id": "1-2",
    "name": "Mission Statement",
    "blockId": 1,
    "blockName": "Mission Discovery",
    "subId": 2,
    "phase": 1,
    "phaseName": "Idea Market Fit",
    "category": "foundation",
    "agent": {
      "name": "Mission Alignment Advisor",
      "key": "1b",
      "description": "Evaluates mission clarity and team alignment",
      "domain": "Mission Statement"
    },
    "education": {
      "title": "Mission Statement",
      "what": "A systematic approach to mission statement that evaluates mission clarity and team alignment. Evaluates mission clarity, team alignment, market resonance, measurability, inspirational value to ensure excellence and continuous improvement in this critical capability.",
      "why": "It unifies internal teams, attracts external believers, and anchors decision-making. Every product feature, hire, and campaign should align with this.",
      "how": "\n      <h4>Essential Elements:</h4>\n      <ul>\n        <li><strong>Target user group</strong> - Be specific about who you serve</li>\n        <li><strong>Transformation or outcome</strong> - What change you enable</li>\n        <li><strong>Emotional language</strong> - Make it inspiring and memorable</li>\n        <li><strong>Brevity</strong> - Keep it under 20 words ideally</li>\n        <li><strong>Long-term vision</strong> - Focus on enduring purpose, not tactics</li>\n      </ul>\n      \n      <h4>Crafting Process:</h4>\n      <ol>\n        <li>Start with your problem statement</li>\n        <li>Define the ideal end state for your customers</li>\n        <li>Identify your unique approach or belief</li>\n        <li>Test multiple versions with team and advisors</li>\n        <li>Refine until it feels authentic and ambitious</li>\n      </ol>\n      \n      <h4>Quality Checklist:</h4>\n      <ul>\n        <li>Would employees feel proud to share this?</li>\n        <li>Does it differentiate from competitors?</li>\n        <li>Can a customer understand it immediately?</li>\n        <li>Does it guide difficult decisions?</li>\n      </ul>\n    ",
      "examples": [
        "Empowering HR teams to create exceptional employee experiences through intelligent automation.",
        "Making data-driven product decisions accessible to every product manager.",
        "Democratizing financial planning for small business owners worldwide."
      ],
      "keyMetrics": [
        {
          "value": "3x",
          "label": "Faster Validation",
          "description": "Problem-solution fit speed"
        },
        {
          "value": "67%",
          "label": "Higher Success Rate",
          "description": "Validated vs unvalidated startups"
        },
        {
          "value": "45%",
          "label": "Lower Risk",
          "description": "Failure rate reduction"
        },
        {
          "value": "2.5x",
          "label": "Better Alignment",
          "description": "Team and market fit"
        }
      ]
    },
    "workspace": {
      "domain": "Mission Statement",
      "questions": [
        {
          "id": "1-2-q1",
          "text": "What specific challenges are you experiencing with vision clarity and how do they impact your operations?",
          "type": "diagnostic",
          "required": true,
          "hint": "Describe specific pain points, bottlenecks, or inefficiencies in your vision clarity. Include frequency and impact.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "1-2-q2",
          "text": "What metrics do you currently track for value proposition effectiveness and what are your target benchmarks?",
          "type": "quantitative",
          "required": true,
          "hint": "Provide specific numbers, percentages, or measurable outcomes related to value proposition. Include current vs. target state.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "1-2-q3",
          "text": "How does your approach to differentiation align with your overall business strategy?",
          "type": "strategic",
          "required": true,
          "hint": "Explain how differentiation connects to your broader business objectives and long-term vision.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "1-2-q4",
          "text": "What evidence or data supports your stakeholder alignment implementation or approach?",
          "type": "validation",
          "required": false,
          "hint": "Share concrete examples, case studies, or data points that demonstrate your stakeholder alignment effectiveness.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "1-2-q5",
          "text": "How does your mission statement compare to industry best practices or competitors?",
          "type": "comparative",
          "required": false,
          "hint": "Compare your mission statement approach with industry standards, competitors, or best practices.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "1-2-q6",
          "text": "What processes do you have in place to ensure mission alignment across all teams?",
          "type": "diagnostic",
          "required": false,
          "hint": "Describe your communication, training, and reinforcement mechanisms for mission alignment.",
          "minLength": 100,
          "maxLength": 1000
        }
      ],
      "tools": [
        "Mission Statement Generators (Canva, Wordsmith)",
        "Team Collaboration Tools (Miro, Figma)",
        "Survey Tools for Validation (Google Forms, Typeform)",
        "Brand Identity Platforms (Brandfolder, Frontify)"
      ],
      "templates": [
        "Mission Statement Builder",
        "Vision-Mission-Values Framework",
        "Strategic Narrative Template",
        "Stakeholder Alignment Canvas"
      ],
      "bestPractices": [
        "Involve entire founding team in creation process",
        "Test with at least 10 potential customers",
        "Keep it under 20 words for memorability",
        "Ensure it guides actual decision-making"
      ]
    },
    "analysis": {
      "domain": "Mission Statement",
      "dimensions": [
        {
          "name": "Mission Clarity",
          "weight": 20,
          "description": "How clear and compelling is the mission?"
        },
        {
          "name": "Team Alignment",
          "weight": 20,
          "description": "Level of team buy-in and understanding"
        },
        {
          "name": "Market Resonance",
          "weight": 20,
          "description": "How well does mission resonate with market"
        },
        {
          "name": "Measurability",
          "weight": 20,
          "description": "Clarity of success metrics"
        },
        {
          "name": "Inspirational Value",
          "weight": 20,
          "description": "Ability to inspire stakeholders"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Mission is unclear or misaligned",
        "26-50": "Basic mission exists but lacks clarity",
        "51-75": "Clear mission with moderate alignment",
        "76-90": "Strong mission with good alignment",
        "91-100": "Exceptional mission with full alignment"
      }
    },
    "resources": {
      "domain": "Mission Statement",
      "templates": [
        "Mission Statement Builder",
        "Vision-Mission-Values Framework",
        "Strategic Narrative Template"
      ],
      "metrics": [
        "Team alignment score",
        "Customer resonance rating",
        "Decision-making clarity",
        "Memorability index"
      ]
    },
    "outputs": {
      "domain": "Mission Statement",
      "templates": [
        "Mission Statement Builder",
        "Vision-Mission-Values Framework",
        "Strategic Narrative Template"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "1-1"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.939Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "1-3": {
    "id": "1-3",
    "name": "Voice of Customer",
    "blockId": 1,
    "blockName": "Mission Discovery",
    "subId": 3,
    "phase": 1,
    "phaseName": "Idea Market Fit",
    "category": "foundation",
    "agent": {
      "name": "VoC Synthesizer",
      "key": "1c",
      "description": "Voice of Customer analysis and synthesis expert",
      "domain": "Voice of Customer"
    },
    "education": {
      "title": "Voice of Customer",
      "what": "A systematic approach to voice of customer that voice of customer analysis and synthesis expert. Evaluates data collection, pattern recognition, insight depth, actionability, coverage to ensure excellence and continuous improvement in this critical capability.",
      "why": "You cannot build, sell, or scale effectively without truly understanding your customers' language, emotions, and workflows. This is the source of all strategy.",
      "how": "\n      <h4>Data Collection Methods:</h4>\n      <ul>\n        <li><strong>Customer interviews</strong> - 30-45 minute structured conversations</li>\n        <li><strong>Field studies</strong> - Observe users in their natural environment</li>\n        <li><strong>Support analysis</strong> - Mine tickets for patterns</li>\n        <li><strong>Usage analytics</strong> - Track actual behavior vs. stated preferences</li>\n        <li><strong>Surveys</strong> - Quantify qualitative insights at scale</li>\n      </ul>\n      \n      <h4>Synthesis Framework:</h4>\n      <ol>\n        <li>Conduct at least 5 interviews per persona</li>\n        <li>Identify pain themes and trigger events</li>\n        <li>Map language patterns and emotional drivers</li>\n        <li>Extract behavioral insights, not just opinions</li>\n        <li>Document \"day in the life\" workflows</li>\n        <li>Identify gaps between expectations and reality</li>\n      </ol>\n      \n      <h4>Organization System:</h4>\n      <ul>\n        <li>Create a tagged insight database (Notion/Airtable)</li>\n        <li>Categorize by persona, pain point, and frequency</li>\n        <li>Link insights to product decisions</li>\n        <li>Update quarterly with fresh research</li>\n      </ul>\n    ",
      "examples": [
        "Discovery: 73% of HR managers mentioned 'compliance anxiety' unprompted",
        "Pattern: Users attempt workarounds 3-4 times before contacting support",
        "Quote: 'I'd pay $500/month just to never think about this again'"
      ],
      "keyMetrics": [
        {
          "value": "3x",
          "label": "Faster Validation",
          "description": "Problem-solution fit speed"
        },
        {
          "value": "67%",
          "label": "Higher Success Rate",
          "description": "Validated vs unvalidated startups"
        },
        {
          "value": "45%",
          "label": "Lower Risk",
          "description": "Failure rate reduction"
        },
        {
          "value": "2.5x",
          "label": "Better Alignment",
          "description": "Team and market fit"
        }
      ]
    },
    "workspace": {
      "domain": "Voice of Customer",
      "questions": [
        {
          "id": "1-3-q1",
          "text": "What specific challenges are you experiencing with customer Voice of Customer and how do they impact your operations?",
          "type": "diagnostic",
          "required": true,
          "hint": "Describe specific pain points in collecting, analyzing, and acting on customer feedback. Include frequency and impact.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "1-3-q2",
          "text": "What metrics do you currently track for customer satisfaction and engagement, and what are your target benchmarks?",
          "type": "quantitative",
          "required": true,
          "hint": "Provide specific numbers like NPS scores, CSAT ratings, response rates. Include current vs. target state.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "1-3-q3",
          "text": "How does your approach to pain point identification align with your product development strategy?",
          "type": "strategic",
          "required": true,
          "hint": "Explain how customer pain points drive your product roadmap and feature prioritization.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "1-3-q4",
          "text": "What evidence validates that you are capturing the right customer insights?",
          "type": "validation",
          "required": false,
          "hint": "Share examples of insights that led to successful product changes or business decisions.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "1-3-q5",
          "text": "How frequently do you engage with customers and through which channels?",
          "type": "quantitative",
          "required": false,
          "hint": "Detail your interview cadence, survey frequency, and engagement channel mix.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "1-3-q6",
          "text": "What systems do you have to translate customer feedback into actionable insights?",
          "type": "diagnostic",
          "required": false,
          "hint": "Describe your process for analyzing, prioritizing, and implementing customer feedback.",
          "minLength": 100,
          "maxLength": 1000
        }
      ],
      "tools": [
        "Transcription Tools (Otter.ai, Rev)",
        "Insight Management (Dovetail, Aurelius)",
        "Analytics Platforms (Fullstory, Hotjar)",
        "CRM Systems (HubSpot, Salesforce)"
      ],
      "templates": [
        "Customer Interview Script",
        "Insight Synthesis Canvas",
        "Voice of Customer Database",
        "Insight Tagging Framework"
      ],
      "bestPractices": [
        "Record and transcribe all customer conversations",
        "Tag insights immediately after collection",
        "Share insights weekly with entire team",
        "Link insights directly to product decisions"
      ]
    },
    "analysis": {
      "domain": "Voice of Customer",
      "dimensions": [
        {
          "name": "Data Collection",
          "weight": 20,
          "description": "Quality and quantity of customer input"
        },
        {
          "name": "Pattern Recognition",
          "weight": 20,
          "description": "Ability to identify key themes"
        },
        {
          "name": "Insight Depth",
          "weight": 20,
          "description": "Quality of insights extracted"
        },
        {
          "name": "Actionability",
          "weight": 20,
          "description": "Clarity of next steps from insights"
        },
        {
          "name": "Coverage",
          "weight": 20,
          "description": "Breadth of customer segments covered"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Minimal or anecdotal customer input",
        "26-50": "Some customer data but limited insights",
        "51-75": "Good data collection with useful insights",
        "76-90": "Strong VoC program with actionable insights",
        "91-100": "Comprehensive VoC with transformative insights"
      }
    },
    "resources": {
      "domain": "Voice of Customer",
      "templates": [
        "Customer Interview Script",
        "Insight Synthesis Canvas",
        "Voice of Customer Database",
        "Insight Tagging Framework"
      ],
      "metrics": [
        "Number of insights collected",
        "Insight-to-action conversion rate",
        "Customer validation percentage",
        "Time to insight discovery"
      ]
    },
    "outputs": {
      "domain": "Voice of Customer",
      "templates": [
        "Customer Interview Script",
        "Insight Synthesis Canvas",
        "Voice of Customer Database",
        "Insight Tagging Framework"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "1-2"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.939Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "1-4": {
    "id": "1-4",
    "name": "Founding Team Capability",
    "blockId": 1,
    "blockName": "Mission Discovery",
    "subId": 4,
    "phase": 1,
    "phaseName": "Idea Market Fit",
    "category": "foundation",
    "agent": {
      "name": "Team Gap Identifier",
      "key": "1d",
      "description": "Analyzes team composition and capability gaps",
      "domain": "Founding Team Capability"
    },
    "education": {
      "title": "Founding Team Capability",
      "what": "An honest capability audit of your founding team's ability to ship product, close deals, raise funds, and execute a go-to-market strategy — with a focus on experience, chemistry, and accountability.",
      "why": "Even in GTM-heavy companies, investors and partners are betting on teams. Misalignment, skill gaps, or unclear ownership can derail traction.",
      "how": "\n      <h4>Assessment Areas:</h4>\n      <ul>\n        <li><strong>Technical capability</strong> - Can we build what we envision?</li>\n        <li><strong>Domain expertise</strong> - Do we understand the market deeply?</li>\n        <li><strong>Sales ability</strong> - Can founders close initial deals?</li>\n        <li><strong>Leadership experience</strong> - Have we scaled teams before?</li>\n        <li><strong>Network strength</strong> - Can we access customers and capital?</li>\n      </ul>\n      \n      <h4>Team Composition Analysis:</h4>\n      <ol>\n        <li>Map current skills across Product, Engineering, Sales, Operations</li>\n        <li>Identify critical gaps that could block growth</li>\n        <li>Define ownership for key decisions</li>\n        <li>Assess team chemistry and communication patterns</li>\n        <li>Plan for filling gaps (hiring, advisors, consultants)</li>\n      </ol>\n      \n      <h4>Documentation Requirements:</h4>\n      <ul>\n        <li>Founder bios with relevant achievements</li>\n        <li>Org chart showing clear responsibilities</li>\n        <li>Decision-making framework</li>\n        <li>Gap mitigation plan with timeline</li>\n        <li>Evidence of prior collaboration success</li>\n      </ul>\n    ",
      "examples": [
        "CTO: 10 years ML infrastructure at Google, 2 successful exits",
        "CEO: Former VP Sales at $50M ARR SaaS, closed 20+ enterprise deals",
        "Gap identified: Need growth marketing expertise by Series A"
      ],
      "keyMetrics": [
        {
          "value": "3x",
          "label": "Faster Validation",
          "description": "Problem-solution fit speed"
        },
        {
          "value": "67%",
          "label": "Higher Success Rate",
          "description": "Validated vs unvalidated startups"
        },
        {
          "value": "45%",
          "label": "Lower Risk",
          "description": "Failure rate reduction"
        },
        {
          "value": "2.5x",
          "label": "Better Alignment",
          "description": "Team and market fit"
        }
      ]
    },
    "workspace": {
      "domain": "Founding Team Capability",
      "questions": [
        {
          "id": "1-4-q1",
          "text": "What specific skill gaps have you identified in your team and how do they impact execution?",
          "type": "diagnostic",
          "required": true,
          "hint": "List specific technical, operational, or leadership gaps and their business impact.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "1-4-q2",
          "text": "What performance metrics do you track for team productivity and what are your benchmarks?",
          "type": "quantitative",
          "required": true,
          "hint": "Provide specific KPIs like velocity, output quality, or efficiency metrics with targets.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "1-4-q3",
          "text": "How does your Founding Team Capability and capability align with your go-to-market strategy?",
          "type": "strategic",
          "required": true,
          "hint": "Explain how team composition supports your GTM objectives and growth plans.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "1-4-q4",
          "text": "What evidence shows your team is capable of executing your vision?",
          "type": "validation",
          "required": false,
          "hint": "Share past achievements, credentials, or performance data demonstrating capability.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "1-4-q5",
          "text": "How do you assess and develop role clarity within your team?",
          "type": "diagnostic",
          "required": false,
          "hint": "Describe your process for defining responsibilities and ensuring alignment.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "1-4-q6",
          "text": "What Founding Team Capability or initiatives address identified skill gaps?",
          "type": "strategic",
          "required": false,
          "hint": "Detail training, mentoring, or hiring plans to close capability gaps.",
          "minLength": 100,
          "maxLength": 1000
        }
      ],
      "tools": [
        "Skills Assessment Tools (Culture Amp, Lattice)",
        "Team Analytics (Humanyze, Worklytics)",
        "Recruiting Platforms (Greenhouse, Lever)",
        "Org Chart Tools (Pingboard, ChartHop)"
      ],
      "templates": [
        "Founding Team Scorecard",
        "Skills Gap Analysis",
        "Advisor Recruitment Plan",
        "Team Chemistry Assessment"
      ],
      "bestPractices": [
        "Be brutally honest about team gaps",
        "Prioritize complementary skills over similar backgrounds",
        "Define decision rights early to avoid conflicts",
        "Plan for advisor/consultant support where needed"
      ]
    },
    "analysis": {
      "domain": "Founding Team Capability",
      "dimensions": [
        {
          "name": "Skills Coverage",
          "weight": 20,
          "description": "Coverage of required skill sets"
        },
        {
          "name": "Experience Level",
          "weight": 20,
          "description": "Relevant experience in team"
        },
        {
          "name": "Role Clarity",
          "weight": 20,
          "description": "Clear definition of roles and responsibilities"
        },
        {
          "name": "Gap Awareness",
          "weight": 20,
          "description": "Understanding of what's missing"
        },
        {
          "name": "Hiring Plan",
          "weight": 20,
          "description": "Clear plan to address gaps"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Major gaps with no clear plan",
        "26-50": "Significant gaps partially addressed",
        "51-75": "Some gaps with plans in place",
        "76-90": "Minor gaps with strong plans",
        "91-100": "Optimal team or clear path to it"
      }
    },
    "resources": {
      "domain": "Founding Team Capability",
      "templates": [
        "Founding Team Scorecard",
        "Skills Gap Analysis",
        "Advisor Recruitment Plan"
      ],
      "metrics": [
        "Skill coverage percentage",
        "Time to key hire",
        "Team velocity score",
        "Decision-making speed"
      ]
    },
    "outputs": {
      "domain": "Founding Team Capability",
      "templates": [
        "Founding Team Scorecard",
        "Skills Gap Analysis",
        "Advisor Recruitment Plan"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "1-3"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.939Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "1-5": {
    "id": "1-5",
    "name": "Market Landscape",
    "blockId": 1,
    "blockName": "Mission Discovery",
    "subId": 5,
    "phase": 1,
    "phaseName": "Idea Market Fit",
    "category": "foundation",
    "agent": {
      "name": "Market Mapper",
      "key": "1e",
      "description": "Market landscape and opportunity assessment expert",
      "domain": "Market Landscape"
    },
    "education": {
      "title": "Market Landscape",
      "what": "A clear, defensible summary of your market landscape, including TAM/SAM/SOM, competitor dynamics, whitespace, and timing signals.",
      "why": "Great products in poor markets fail. You need to demonstrate that your timing is right, your wedge is real, and your knowledge of the terrain is sharp.",
      "how": "\n      <h4>Market Sizing Methodology:</h4>\n      <ul>\n        <li><strong>TAM (Total Addressable Market)</strong> - Total revenue opportunity</li>\n        <li><strong>SAM (Serviceable Addressable Market)</strong> - Reachable with your model</li>\n        <li><strong>SOM (Serviceable Obtainable Market)</strong> - Realistic 5-year capture</li>\n        <li>Document all assumptions and data sources</li>\n        <li>Validate with industry analysts or experts</li>\n      </ul>\n      \n      <h4>Competitive Analysis Framework:</h4>\n      <ol>\n        <li>Map direct, adjacent, and emerging competitors</li>\n        <li>Analyze features, pricing, and positioning</li>\n        <li>Identify strategic whitespace opportunities</li>\n        <li>Assess barriers to entry and defensibility</li>\n        <li>Track competitor funding and momentum</li>\n      </ol>\n      \n      <h4>Timing Signals (\"Why Now\"):</h4>\n      <ul>\n        <li>Technology enablers (AI, cloud, mobile)</li>\n        <li>Regulatory changes creating opportunity</li>\n        <li>Behavioral shifts in buying patterns</li>\n        <li>Economic factors driving urgency</li>\n        <li>Competitive gaps or disruption windows</li>\n      </ul>\n    ",
      "examples": [
        "TAM: $12B global HR automation market growing 23% CAGR",
        "Whitespace: No solution addresses mid-market compliance specifically",
        "Why now: New regulations require automated reporting by 2025"
      ],
      "keyMetrics": [
        {
          "value": "3x",
          "label": "Faster Validation",
          "description": "Problem-solution fit speed"
        },
        {
          "value": "67%",
          "label": "Higher Success Rate",
          "description": "Validated vs unvalidated startups"
        },
        {
          "value": "45%",
          "label": "Lower Risk",
          "description": "Failure rate reduction"
        },
        {
          "value": "2.5x",
          "label": "Better Alignment",
          "description": "Team and market fit"
        }
      ]
    },
    "workspace": {
      "domain": "Market Landscape",
      "questions": [
        {
          "id": "1-5-q1",
          "text": "What specific challenges do you face in competitive positioning and market differentiation?",
          "type": "diagnostic",
          "required": true,
          "hint": "Describe how you struggle to stand out, compete for customers, or defend your position.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "1-5-q2",
          "text": "What market share or growth metrics do you track and what are your targets?",
          "type": "quantitative",
          "required": true,
          "hint": "Provide TAM, SAM, SOM figures, growth rates, or market penetration percentages.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "1-5-q3",
          "text": "How does your market analysis inform your strategic priorities and Market Landscape?",
          "type": "strategic",
          "required": true,
          "hint": "Explain how market insights drive product, sales, and marketing decisions.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "1-5-q4",
          "text": "What evidence validates your market opportunity and timing?",
          "type": "validation",
          "required": false,
          "hint": "Share market research, analyst reports, or customer data supporting your thesis.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "1-5-q5",
          "text": "How do you monitor and respond to competitive threats?",
          "type": "comparative",
          "required": false,
          "hint": "Describe your competitive intelligence gathering and response strategies.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "1-5-q6",
          "text": "What market trends or shifts represent your biggest opportunities or risks?",
          "type": "strategic",
          "required": false,
          "hint": "Identify key market dynamics and how you plan to capitalize or mitigate.",
          "minLength": 100,
          "maxLength": 1000
        }
      ],
      "tools": [
        "Market Research Platforms (CB Insights, PitchBook)",
        "Competitive Intelligence (Crayon, Klue)",
        "Industry Reports (Gartner, Forrester)",
        "Web Scraping Tools (Octoparse, ParseHub)"
      ],
      "templates": [
        "Market Sizing Calculator",
        "Competitive Matrix Template",
        "Positioning Quadrant Builder",
        "TAM-SAM-SOM Worksheet"
      ],
      "bestPractices": [
        "Validate TAM with multiple data sources",
        "Track competitor funding and product releases weekly",
        "Interview industry experts for insider perspectives",
        "Document all assumptions for investor scrutiny"
      ]
    },
    "analysis": {
      "domain": "Market Landscape",
      "dimensions": [
        {
          "name": "Market Size",
          "weight": 20,
          "description": "TAM/SAM/SOM analysis quality"
        },
        {
          "name": "Competitive Analysis",
          "weight": 20,
          "description": "Understanding of competitive landscape"
        },
        {
          "name": "Market Dynamics",
          "weight": 20,
          "description": "Understanding of market trends"
        },
        {
          "name": "Entry Strategy",
          "weight": 20,
          "description": "Clarity of market entry approach"
        },
        {
          "name": "Positioning",
          "weight": 20,
          "description": "Differentiation and positioning strategy"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Poor market understanding",
        "26-50": "Basic market knowledge",
        "51-75": "Good market analysis",
        "76-90": "Strong market intelligence",
        "91-100": "Expert market mastery"
      }
    },
    "resources": {
      "domain": "Market Landscape",
      "templates": [
        "Market Sizing Calculator",
        "Competitive Matrix Template",
        "Positioning Quadrant Builder"
      ],
      "metrics": [
        "Market growth rate",
        "Competitive differentiation score",
        "Time to market advantage",
        "Addressable market percentage"
      ]
    },
    "outputs": {
      "domain": "Market Landscape",
      "templates": [
        "Market Sizing Calculator",
        "Competitive Matrix Template",
        "Positioning Quadrant Builder"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "1-4"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.939Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "1-6": {
    "id": "1-6",
    "name": "Launch Readiness",
    "blockId": 1,
    "blockName": "Mission Discovery",
    "subId": 6,
    "phase": 1,
    "phaseName": "Idea Market Fit",
    "category": "foundation",
    "agent": {
      "name": "Launch Plan Assessor",
      "key": "1f",
      "description": "Evaluates go-to-market launch readiness and planning",
      "domain": "Launch Readiness"
    },
    "education": {
      "title": "Launch Readiness",
      "what": "A concrete, documented plan to launch a functional prototype (MVP/MLP) in a focused test environment. It defines what you're testing, how fast you'll test it, and how you'll judge success.",
      "why": "Startups burn time and cash when they wait too long to test. This plan forces a build-measure-learn cycle with accountability and speed.",
      "how": "\n      <h4>MVP Scoping Process:</h4>\n      <ol>\n        <li>Define core value proposition to test</li>\n        <li>List must-have vs nice-to-have features</li>\n        <li>Choose build approach (no-code, manual, coded)</li>\n        <li>Set timeline with weekly milestones</li>\n        <li>Define success/failure criteria upfront</li>\n      </ol>\n      \n      <h4>Test Cohort Selection:</h4>\n      <ul>\n        <li>Identify 5-10 ideal early adopters</li>\n        <li>Ensure they match target ICP</li>\n        <li>Get commitment for feedback</li>\n        <li>Set expectations about prototype limitations</li>\n        <li>Define incentive structure if needed</li>\n      </ul>\n      \n      <h4>Launch Execution Checklist:</h4>\n      <ul>\n        <li>Technical environment ready</li>\n        <li>Onboarding flow documented</li>\n        <li>Feedback collection system in place</li>\n        <li>Success metrics tracking enabled</li>\n        <li>Team roles and responsibilities clear</li>\n        <li>Iteration plan for post-launch</li>\n      </ul>\n    ",
      "examples": [
        "MVP: Manual workflow automation for 5 HR teams over 30 days",
        "Success criteria: 3 of 5 users complete full workflow, 2 express willingness to pay",
        "Timeline: 2-week build, 2-week test, 1-week synthesis"
      ],
      "keyMetrics": [
        {
          "value": "3x",
          "label": "Faster Validation",
          "description": "Problem-solution fit speed"
        },
        {
          "value": "67%",
          "label": "Higher Success Rate",
          "description": "Validated vs unvalidated startups"
        },
        {
          "value": "45%",
          "label": "Lower Risk",
          "description": "Failure rate reduction"
        },
        {
          "value": "2.5x",
          "label": "Better Alignment",
          "description": "Team and market fit"
        }
      ]
    },
    "workspace": {
      "domain": "Launch Readiness",
      "questions": [
        {
          "id": "1-6-q1",
          "text": "What specific gaps exist in your go-to-market preparation and Launch Readiness?",
          "type": "diagnostic",
          "required": true,
          "hint": "Identify missing elements in product readiness, sales enablement, or marketing preparation.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "1-6-q2",
          "text": "What Launch Readiness and milestones have you defined for your launch?",
          "type": "quantitative",
          "required": true,
          "hint": "Provide specific targets for adoption, revenue, or engagement within defined timeframes.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "1-6-q3",
          "text": "How does your Launch Readiness align with your overall business objectives?",
          "type": "strategic",
          "required": true,
          "hint": "Explain how launch goals support funding, growth, or market positioning objectives.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "1-6-q4",
          "text": "What evidence from beta testing or pilots validates your launch readiness?",
          "type": "validation",
          "required": false,
          "hint": "Share feedback, metrics, or learnings from pre-launch testing.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "1-6-q5",
          "text": "How have you allocated resources across different launch activities?",
          "type": "strategic",
          "required": false,
          "hint": "Detail budget, team, and time allocation across product, sales, and marketing.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "1-6-q6",
          "text": "What risk mitigation plans do you have for potential launch challenges?",
          "type": "diagnostic",
          "required": false,
          "hint": "Describe contingency plans for technical issues, market response, or competitive reactions.",
          "minLength": 100,
          "maxLength": 1000
        }
      ],
      "tools": [
        "Prototyping Tools (Figma, Sketch, InVision)",
        "No-Code Builders (Bubble, Webflow, Retool)",
        "User Testing Platforms (UserTesting, Maze)",
        "Project Management (Linear, Notion, Asana)"
      ],
      "templates": [
        "MVP Planning Canvas",
        "Prototype Test Protocol",
        "Launch Readiness Checklist",
        "User Feedback Collection Form"
      ],
      "bestPractices": [
        "Launch in 6 weeks or less for initial validation",
        "Focus on one core workflow, not multiple features",
        "Get 5 committed test users before building",
        "Plan for 50% of features to be manual initially"
      ]
    },
    "analysis": {
      "domain": "Launch Readiness",
      "dimensions": [
        {
          "name": "Timeline Realism",
          "weight": 20,
          "description": "Feasibility of launch timeline"
        },
        {
          "name": "Resource Planning",
          "weight": 20,
          "description": "Adequacy of resource allocation"
        },
        {
          "name": "Risk Management",
          "weight": 20,
          "description": "Identification and mitigation of risks"
        },
        {
          "name": "Success Metrics",
          "weight": 20,
          "description": "Clear KPIs and success criteria"
        },
        {
          "name": "Contingency Planning",
          "weight": 20,
          "description": "Backup plans and flexibility"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No clear launch plan",
        "26-50": "Basic plan with major gaps",
        "51-75": "Solid plan with some gaps",
        "76-90": "Comprehensive launch plan",
        "91-100": "Exceptional launch readiness"
      }
    },
    "resources": {
      "domain": "Launch Readiness",
      "templates": [
        "MVP Planning Canvas",
        "Prototype Test Protocol",
        "Launch Readiness Checklist"
      ],
      "metrics": [
        "Time to first user test",
        "Feature completion rate",
        "User activation percentage",
        "Feedback quality score"
      ]
    },
    "outputs": {
      "domain": "Launch Readiness",
      "templates": [
        "MVP Planning Canvas",
        "Prototype Test Protocol",
        "Launch Readiness Checklist"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "1-5"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.939Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "2-1": {
    "id": "2-1",
    "name": "Jobs to be Done",
    "blockId": 2,
    "blockName": "Customer Insights",
    "subId": 1,
    "phase": 1,
    "phaseName": "Idea Market Fit",
    "category": "research",
    "agent": {
      "name": "JTBD Specialist",
      "key": "2a",
      "description": "Evaluates customer interview frequency and quality",
      "domain": "Jobs to be Done"
    },
    "education": {
      "title": "Jobs to be Done",
      "what": "A systematic approach to jobs to be done that evaluates customer interview frequency and quality. Evaluates interview frequency, interview quality, segment coverage, documentation, action items to ensure excellence and continuous improvement in this critical capability.",
      "why": "Customers don't buy products, they hire them to make progress in their lives. Understanding the job helps you compete not just with direct competitors, but with all alternative solutions including non-consumption. JTBD-driven companies see 2x higher product-market fit scores.",
      "how": "\n      <h4>JTBD Framework Components:</h4>\n      <ul>\n        <li><strong>Functional Job:</strong> The practical task to accomplish</li>\n        <li><strong>Emotional Job:</strong> How they want to feel</li>\n        <li><strong>Social Job:</strong> How they want to be perceived</li>\n        <li><strong>Context:</strong> When and where the job arises</li>\n        <li><strong>Success Criteria:</strong> How they measure completion</li>\n      </ul>\n      \n      <h4>Discovery Process:</h4>\n      <ol>\n        <li>Conduct JTBD interviews with 10+ customers</li>\n        <li>Ask: \"What are you trying to accomplish?\"</li>\n        <li>Explore: \"What would success look like?\"</li>\n        <li>Understand: \"What have you tried before?\"</li>\n        <li>Identify: \"What's the consequence of not doing this?\"</li>\n        <li>Map competing solutions and non-consumption</li>\n      </ol>\n      \n      <h4>Job Story Format:</h4>\n      <p>When [situation], I want to [motivation], so I can [expected outcome]</p>\n      \n      <h4>Forces of Progress:</h4>\n      <ul>\n        <li><strong>Push:</strong> Problems with current solution</li>\n        <li><strong>Pull:</strong> Attraction to new solution</li>\n        <li><strong>Anxiety:</strong> Fears about new solution</li>\n        <li><strong>Habit:</strong> Comfort with current state</li>\n      </ul>\n    ",
      "examples": [
        "Job: Help me look prepared and data-driven in board meetings (Functional + Social)",
        "Job: Reduce the anxiety of compliance audits (Emotional + Functional)",
        "Job: Ensure our team ships features customers actually use (Functional + Outcome-focused)"
      ],
      "keyMetrics": [
        {
          "value": "5x",
          "label": "More Insights",
          "description": "Per customer conversation"
        },
        {
          "value": "73%",
          "label": "Better Product Fit",
          "description": "Customer-driven development"
        },
        {
          "value": "60%",
          "label": "Faster Learning",
          "description": "Time to key insights"
        },
        {
          "value": "4.2x",
          "label": "Higher Retention",
          "description": "Research-driven companies"
        }
      ]
    },
    "workspace": {
      "domain": "Jobs to be Done",
      "questions": [
        {
          "id": "2-1-q1",
          "text": "What primary jobs are customers hiring your product to accomplish?",
          "type": "diagnostic",
          "required": true,
          "hint": "Describe functional, emotional, and social jobs customers need done.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "2-1-q2",
          "text": "What metrics demonstrate how well you help customers complete these jobs?",
          "type": "quantitative",
          "required": true,
          "hint": "Provide success rates, time savings, or outcome improvements.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "2-1-q3",
          "text": "How do jobs-to-be-done insights influence your product strategy?",
          "type": "strategic",
          "required": true,
          "hint": "Explain how JTBD framework drives feature decisions and positioning.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "2-1-q4",
          "text": "What evidence shows customers successfully complete their jobs with your solution?",
          "type": "validation",
          "required": false,
          "hint": "Share case studies, testimonials, or usage data demonstrating job completion.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "2-1-q5",
          "text": "How do the jobs differ across customer segments or use cases?",
          "type": "comparative",
          "required": false,
          "hint": "Describe variations in jobs by industry, company size, or user role.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "2-1-q6",
          "text": "What alternative solutions do customers consider for these jobs?",
          "type": "comparative",
          "required": false,
          "hint": "Identify competitive alternatives including manual processes or other tools.",
          "minLength": 100,
          "maxLength": 1000
        }
      ],
      "tools": [
        "Scheduling Tools (Calendly, Acuity)",
        "Video Recording (Zoom, Loom, Google Meet)",
        "Transcription Services (Otter.ai, Fireflies)",
        "Research Repositories (Dovetail, Condens)"
      ],
      "templates": [
        "Interview Schedule Template",
        "Question Bank by Stage",
        "Insight Synthesis Framework",
        "Interview Consent Form"
      ],
      "bestPractices": [
        "Block dedicated time weekly for interviews",
        "Rotate interviewers to avoid bias",
        "Share raw recordings with product team",
        "Create highlight reels for key insights"
      ]
    },
    "analysis": {
      "domain": "Jobs to be Done",
      "dimensions": [
        {
          "name": "Interview Frequency",
          "weight": 20,
          "description": "Regular cadence of customer interviews"
        },
        {
          "name": "Interview Quality",
          "weight": 20,
          "description": "Depth and structure of interviews"
        },
        {
          "name": "Segment Coverage",
          "weight": 20,
          "description": "Diversity of customers interviewed"
        },
        {
          "name": "Documentation",
          "weight": 20,
          "description": "Quality of interview documentation"
        },
        {
          "name": "Action Items",
          "weight": 20,
          "description": "Clear next steps from interviews"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Rare or ad-hoc interviews",
        "26-50": "Occasional interviews with limited structure",
        "51-75": "Regular interviews with good process",
        "76-90": "Systematic interview program",
        "91-100": "World-class interview practice"
      }
    },
    "resources": {
      "domain": "Jobs to be Done",
      "templates": [
        "JTBD Interview Script",
        "Job Story Template",
        "Outcome Mapping Framework"
      ],
      "metrics": [
        "Jobs identified per persona",
        "Job importance rating (1-10)",
        "Current satisfaction score",
        "Opportunity score (importance - satisfaction)"
      ]
    },
    "outputs": {
      "domain": "Jobs to be Done",
      "templates": [
        "JTBD Interview Script",
        "Job Story Template",
        "Outcome Mapping Framework"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.939Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "2-2": {
    "id": "2-2",
    "name": "Personas Framework",
    "blockId": 2,
    "blockName": "Customer Insights",
    "subId": 2,
    "phase": 1,
    "phaseName": "Idea Market Fit",
    "category": "research",
    "agent": {
      "name": "Persona Framework Builder",
      "key": "2b",
      "description": "Assesses buyer and user persona development",
      "domain": "Personas Framework"
    },
    "education": {
      "title": "Personas Framework",
      "what": "A structured personas framework that provides clear guidelines and methodologies for assesses buyer and user persona development. Focuses on persona detail, research basis, behavioral insights, journey mapping, team adoption to ensure comprehensive coverage and measurable outcomes.",
      "why": "You're not building for 'users' — you're building for real people with priorities, politics, and patterns. Personas ensure you stop designing for yourself and start building for them.",
      "how": "\n      <h4>Persona Development Process:</h4>\n      <ol>\n        <li>Identify 3-5 key personas from interviews</li>\n        <li>Give each a memorable name and photo</li>\n        <li>Document demographics and firmographics</li>\n        <li>Map their workflow and daily challenges</li>\n        <li>Identify emotional and rational drivers</li>\n        <li>Define their success metrics</li>\n      </ol>\n      \n      <h4>Essential Persona Attributes:</h4>\n      <ul>\n        <li><strong>Role & Responsibilities:</strong> What they own and care about</li>\n        <li><strong>Goals & KPIs:</strong> How they measure success</li>\n        <li><strong>Pain Points:</strong> Daily frustrations and blockers</li>\n        <li><strong>Tools & Workflows:</strong> Current solution landscape</li>\n        <li><strong>Buying Process:</strong> How they evaluate and purchase</li>\n        <li><strong>Objections:</strong> Common concerns and fears</li>\n      </ul>\n      \n      <h4>Persona Validation:</h4>\n      <ul>\n        <li>Test personas with 5+ real customers</li>\n        <li>Refine based on actual behavior data</li>\n        <li>Update quarterly as you learn</li>\n        <li>Use in all GTM and product decisions</li>\n      </ul>\n    ",
      "examples": [
        "Sarah the Stressed HR Manager: 5-10 years experience, overwhelmed by compliance, values automation",
        "Mike the Methodical CFO: Risk-averse, ROI-focused, needs board-ready reports",
        "Emma the Eager Analyst: Tech-savvy, wants career growth, champions new tools"
      ],
      "keyMetrics": [
        {
          "value": "5x",
          "label": "More Insights",
          "description": "Per customer conversation"
        },
        {
          "value": "73%",
          "label": "Better Product Fit",
          "description": "Customer-driven development"
        },
        {
          "value": "60%",
          "label": "Faster Learning",
          "description": "Time to key insights"
        },
        {
          "value": "4.2x",
          "label": "Higher Retention",
          "description": "Research-driven companies"
        }
      ]
    },
    "workspace": {
      "domain": "Personas Framework",
      "questions": [
        {
          "id": "2-2-q1",
          "text": "What gaps exist in your current persona definitions and behavioral understanding?",
          "type": "diagnostic",
          "required": true,
          "hint": "Identify missing demographic, psychographic, or behavioral data in personas.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "2-2-q2",
          "text": "How many distinct personas have you validated and what percentage of revenue do they represent?",
          "type": "quantitative",
          "required": true,
          "hint": "Provide number of personas, validation methods, and revenue attribution.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "2-2-q3",
          "text": "How do your personas inform product, marketing, and sales strategies?",
          "type": "strategic",
          "required": true,
          "hint": "Explain how personas drive messaging, feature prioritization, and go-to-market.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "2-2-q4",
          "text": "What behavioral data validates your persona assumptions?",
          "type": "validation",
          "required": false,
          "hint": "Share usage patterns, conversion data, or research supporting personas.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "2-2-q5",
          "text": "How do you map decision drivers and buying criteria for each persona?",
          "type": "comparative",
          "required": false,
          "hint": "Detail how different personas evaluate and purchase your solution.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "2-2-q6",
          "text": "What use cases are most relevant to each persona?",
          "type": "strategic",
          "required": false,
          "hint": "Map specific problems and solutions to each persona type.",
          "minLength": 100,
          "maxLength": 1000
        }
      ],
      "tools": [
        "Persona Creation Tools (Xtensio, Make My Persona)",
        "User Research Platforms (User Interviews, Respondent)",
        "Journey Mapping Tools (Smaply, UXPressia)",
        "Analytics Segmentation (Segment, Amplitude)"
      ],
      "templates": [
        "Persona Canvas Template",
        "Buyer Journey Map",
        "Persona Interview Guide",
        "Jobs-to-be-Done Framework"
      ],
      "bestPractices": [
        "Base personas on real data, not assumptions",
        "Limit to 3-5 primary personas initially",
        "Update personas quarterly based on new data",
        "Include negative personas (who NOT to target)"
      ]
    },
    "analysis": {
      "domain": "Personas Framework",
      "dimensions": [
        {
          "name": "Persona Detail",
          "weight": 20,
          "description": "Depth and accuracy of personas"
        },
        {
          "name": "Research Basis",
          "weight": 20,
          "description": "Data supporting persona development"
        },
        {
          "name": "Behavioral Insights",
          "weight": 20,
          "description": "Understanding of persona behaviors"
        },
        {
          "name": "Journey Mapping",
          "weight": 20,
          "description": "Customer journey understanding"
        },
        {
          "name": "Team Adoption",
          "weight": 20,
          "description": "Team understanding and use of personas"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No clear personas defined",
        "26-50": "Basic personas with limited detail",
        "51-75": "Good personas with solid research",
        "76-90": "Detailed, validated personas",
        "91-100": "Living personas driving all decisions"
      }
    },
    "resources": {
      "domain": "Personas Framework",
      "templates": [
        "Persona Canvas Template",
        "Buyer Journey Map",
        "Persona Interview Guide"
      ],
      "metrics": [
        "Persona coverage in features",
        "Message resonance by persona",
        "Conversion rate by persona",
        "Persona validation score"
      ]
    },
    "outputs": {
      "domain": "Personas Framework",
      "templates": [
        "Persona Canvas Template",
        "Buyer Journey Map",
        "Persona Interview Guide"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "2-1"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.939Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "2-3": {
    "id": "2-3",
    "name": "Interview Cadence",
    "blockId": 2,
    "blockName": "Customer Insights",
    "subId": 3,
    "phase": 1,
    "phaseName": "Idea Market Fit",
    "category": "research",
    "agent": {
      "name": "Interview Cadence Analyzer",
      "key": "2c",
      "description": "Maps and prioritizes customer pain points",
      "domain": "Interview Cadence"
    },
    "education": {
      "title": "Interview Cadence",
      "what": "A structured and documented plan for conducting recurring customer discovery interviews on a regular schedule, defining how often, with whom, and what you intend to learn at each stage of your company's evolution.",
      "why": "Customer insights decay rapidly as markets evolve. A disciplined interview cadence ensures you stay in sync with customer reality, catch emerging needs early, and validate assumptions continuously. Companies with consistent interview rhythms achieve product-market fit 2x faster.",
      "how": "\n      <h4>Cadence Structure by Stage:</h4>\n      <ul>\n        <li><strong>Pre-PMF:</strong> Weekly interviews (minimum 5/week)</li>\n        <li><strong>Post-PMF:</strong> Bi-weekly interviews (minimum 5/month)</li>\n        <li><strong>Scale Phase:</strong> Monthly interviews (minimum 10/quarter)</li>\n        <li><strong>Mature:</strong> Quarterly deep-dives with ongoing feedback loops</li>\n      </ul>\n      \n      <h4>Interview Planning Framework:</h4>\n      <ol>\n        <li>Define learning objectives for each interview cycle</li>\n        <li>Target specific customer segments or roles</li>\n        <li>Prepare themed question sets aligned to objectives</li>\n        <li>Schedule using automated booking tools</li>\n        <li>Assign clear ownership (founder, PM, researcher)</li>\n        <li>Set up recording and transcription systems</li>\n        <li>Create synthesis and sharing process</li>\n      </ol>\n      \n      <h4>Synthesis and Action:</h4>\n      <ul>\n        <li>Transcribe interviews within 24 hours</li>\n        <li>Tag key insights and customer quotes</li>\n        <li>Share highlights with team weekly</li>\n        <li>Update product backlog based on learnings</li>\n        <li>Track insight patterns over time</li>\n        <li>Close the loop with customers on changes made</li>\n      </ul>\n    ",
      "examples": [
        "Pre-PMF startup: 5 interviews/week rotating between prospects and early users, focused on problem validation",
        "Growth-stage company: 10 interviews/month themed by persona (Week 1-2: power users, Week 3-4: decision makers)",
        "Enterprise SaaS: Quarterly executive interviews + monthly user feedback sessions + continuous in-app surveys"
      ],
      "keyMetrics": [
        {
          "value": "5x",
          "label": "More Insights",
          "description": "Per customer conversation"
        },
        {
          "value": "73%",
          "label": "Better Product Fit",
          "description": "Customer-driven development"
        },
        {
          "value": "60%",
          "label": "Faster Learning",
          "description": "Time to key insights"
        },
        {
          "value": "4.2x",
          "label": "Higher Retention",
          "description": "Research-driven companies"
        }
      ]
    },
    "workspace": {
      "domain": "Interview Cadence",
      "questions": [
        {
          "id": "2-3-q1",
          "text": "What challenges do you face in maintaining consistent customer interview schedules?",
          "type": "diagnostic",
          "required": true,
          "hint": "Describe scheduling conflicts, resource constraints, or engagement difficulties with interview cadence.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "2-3-q2",
          "text": "How many customer interviews do you conduct monthly and what is your target frequency?",
          "type": "quantitative",
          "required": true,
          "hint": "Provide specific numbers of interviews, coverage across segments, and interview cadence goals.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "2-3-q3",
          "text": "How does your interview cadence support your product development cycle?",
          "type": "strategic",
          "required": true,
          "hint": "Explain how interview timing and cadence align with sprint planning and feature releases.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "2-3-q4",
          "text": "What evidence shows your interview frequency yields actionable insights?",
          "type": "validation",
          "required": false,
          "hint": "Share examples of insights gained from your interview cadence and decisions influenced.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "2-3-q5",
          "text": "How do you ensure stakeholder coverage across different user personas in your interview cadence?",
          "type": "comparative",
          "required": false,
          "hint": "Describe your approach to interviewing diverse user types and decision makers regularly.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "2-3-q6",
          "text": "What systems do you use to track and synthesize interview insights from your cadence?",
          "type": "diagnostic",
          "required": false,
          "hint": "Detail tools and processes for recording, analyzing, and sharing learnings from interviews.",
          "minLength": 100,
          "maxLength": 1000
        }
      ],
      "tools": [
        "Journey Mapping Software (Miro, Mural)",
        "Survey Tools (Qualtrics, SurveyMonkey)",
        "Session Recording (FullStory, LogRocket)",
        "Heatmap Tools (Crazy Egg, Mouseflow)"
      ],
      "templates": [
        "Pain Point Matrix Template",
        "Customer Journey Map",
        "Pain-to-Feature Mapping",
        "Pain Point Scoring Rubric"
      ],
      "bestPractices": [
        "Observe actual behavior, don't just ask",
        "Quantify pain in time or money lost",
        "Prioritize pains by frequency × severity",
        "Validate pains with at least 10 customers"
      ]
    },
    "analysis": {
      "domain": "Interview Cadence",
      "dimensions": [
        {
          "name": "Pain Identification",
          "weight": 20,
          "description": "Completeness of pain point discovery"
        },
        {
          "name": "Pain Validation",
          "weight": 20,
          "description": "Evidence supporting pain points"
        },
        {
          "name": "Prioritization",
          "weight": 20,
          "description": "Clear ranking of pain severity"
        },
        {
          "name": "Root Cause Analysis",
          "weight": 20,
          "description": "Understanding of underlying causes"
        },
        {
          "name": "Solution Mapping",
          "weight": 20,
          "description": "Connection to solution capabilities"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Vague or assumed pain points",
        "26-50": "Some validated pain points",
        "51-75": "Well-mapped pain points",
        "76-90": "Comprehensive pain point analysis",
        "91-100": "Expert pain point mastery"
      }
    },
    "resources": {
      "domain": "Interview Cadence",
      "templates": [
        "Interview Schedule Template",
        "Question Bank by Stage",
        "Insight Synthesis Framework"
      ],
      "metrics": [
        "Interviews completed per month",
        "Insight-to-feature conversion ratio",
        "Time from insight to product action",
        "Customer segment coverage %"
      ]
    },
    "outputs": {
      "domain": "Interview Cadence",
      "templates": [
        "Interview Schedule Template",
        "Question Bank by Stage",
        "Insight Synthesis Framework"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "2-2"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.939Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "2-4": {
    "id": "2-4",
    "name": "Pain Point Mapping",
    "blockId": 2,
    "blockName": "Customer Insights",
    "subId": 4,
    "phase": 1,
    "phaseName": "Idea Market Fit",
    "category": "research",
    "agent": {
      "name": "Pain Point Mapper",
      "key": "2d",
      "description": "Jobs-to-be-Done framework implementation expert",
      "domain": "Pain Point Mapping"
    },
    "education": {
      "title": "Pain Point Mapping",
      "what": "A systematic approach to pain point mapping that jobs-to-be-done framework implementation expert. Evaluates job definition, outcome metrics, context understanding, alternative analysis, progress metrics to ensure excellence and continuous improvement in this critical capability.",
      "why": "JTBD reveals the underlying motivations that drive purchase decisions. It helps you compete not just with direct competitors, but with all alternative solutions.",
      "how": "\n      <h4>JTBD Components:</h4>\n      <ul>\n        <li><strong>Functional Job:</strong> The practical task to accomplish</li>\n        <li><strong>Emotional Job:</strong> How they want to feel</li>\n        <li><strong>Social Job:</strong> How they want to be perceived</li>\n        <li><strong>Context:</strong> When and where the job arises</li>\n        <li><strong>Success Criteria:</strong> How they measure completion</li>\n      </ul>\n      \n      <h4>Discovery Questions:</h4>\n      <ul>\n        <li>What are you trying to accomplish?</li>\n        <li>What would success look like?</li>\n        <li>What have you tried before?</li>\n        <li>What's the consequence of not doing this?</li>\n        <li>Who else is involved in this process?</li>\n      </ul>\n    ",
      "examples": [
        "Help me look prepared and knowledgeable in board meetings",
        "Ensure our team ships features that customers actually use",
        "Reduce the anxiety of compliance audits"
      ],
      "keyMetrics": [
        {
          "value": "5x",
          "label": "More Insights",
          "description": "Per customer conversation"
        },
        {
          "value": "73%",
          "label": "Better Product Fit",
          "description": "Customer-driven development"
        },
        {
          "value": "60%",
          "label": "Faster Learning",
          "description": "Time to key insights"
        },
        {
          "value": "4.2x",
          "label": "Higher Retention",
          "description": "Research-driven companies"
        }
      ]
    },
    "workspace": {
      "domain": "Pain Point Mapping",
      "questions": [
        {
          "id": "2-4-q1",
          "text": "What are the top 3-5 customer pain points you have identified and their business impact?",
          "type": "diagnostic",
          "required": true,
          "hint": "List specific pain points customers face with quantified time, cost, or efficiency impact.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "2-4-q2",
          "text": "What percentage of customers experience each pain point and how severe is the impact?",
          "type": "quantitative",
          "required": true,
          "hint": "Provide prevalence rates and severity scores for each identified pain point.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "2-4-q3",
          "text": "How do identified pain points align with your product roadmap priorities?",
          "type": "strategic",
          "required": true,
          "hint": "Explain how pain point severity drives feature development and resource allocation.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "2-4-q4",
          "text": "What evidence validates these are the most critical pain points to address?",
          "type": "validation",
          "required": false,
          "hint": "Share customer feedback, support tickets, or churn data supporting pain point prioritization.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "2-4-q5",
          "text": "How do customer pain points vary across different segments or personas?",
          "type": "comparative",
          "required": false,
          "hint": "Describe differences in pain point priority or severity by customer type.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "2-4-q6",
          "text": "What is your process for continuously discovering and validating new pain points?",
          "type": "diagnostic",
          "required": false,
          "hint": "Detail ongoing research, feedback loops, and pain point validation methods.",
          "minLength": 100,
          "maxLength": 1000
        }
      ],
      "tools": [
        "JTBD Research Tools (Thrv, JTBD Toolkit)",
        "Survey Platforms (Typeform, Google Forms)",
        "Interview Recording (Grain, Chorus)",
        "Affinity Mapping Tools (Miro, FigJam)"
      ],
      "templates": [
        "JTBD Interview Script",
        "Job Story Template",
        "Outcome Mapping Framework",
        "Forces of Progress Diagram"
      ],
      "bestPractices": [
        "Focus on outcomes, not features or solutions",
        "Explore emotional and social jobs, not just functional",
        "Use 'When... I want to... So I can...' format",
        "Map competing solutions including non-consumption"
      ]
    },
    "analysis": {
      "domain": "Pain Point Mapping",
      "dimensions": [
        {
          "name": "Job Definition",
          "weight": 20,
          "description": "Clarity of jobs to be done"
        },
        {
          "name": "Outcome Metrics",
          "weight": 20,
          "description": "Measurable desired outcomes"
        },
        {
          "name": "Context Understanding",
          "weight": 20,
          "description": "Situational triggers and context"
        },
        {
          "name": "Alternative Analysis",
          "weight": 20,
          "description": "Understanding of current alternatives"
        },
        {
          "name": "Progress Metrics",
          "weight": 20,
          "description": "How customers measure progress"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No JTBD framework in use",
        "26-50": "Basic understanding of jobs",
        "51-75": "Good JTBD implementation",
        "76-90": "Strong JTBD-driven development",
        "91-100": "JTBD excellence across organization"
      }
    },
    "resources": {
      "domain": "Pain Point Mapping",
      "templates": [
        "Pain Point Matrix Template",
        "Customer Journey Map",
        "Pain-to-Feature Mapping"
      ],
      "metrics": [
        "Jobs identified per persona",
        "Job importance rating",
        "Current satisfaction score",
        "Opportunity score (importance - satisfaction)"
      ]
    },
    "outputs": {
      "domain": "Pain Point Mapping",
      "templates": [
        "Pain Point Matrix Template",
        "Customer Journey Map",
        "Pain-to-Feature Mapping"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "2-3"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.939Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "2-5": {
    "id": "2-5",
    "name": "Insight Action",
    "blockId": 2,
    "blockName": "Customer Insights",
    "subId": 5,
    "phase": 1,
    "phaseName": "Idea Market Fit",
    "category": "research",
    "agent": {
      "name": "Signal Grader",
      "key": "2e",
      "description": "Evaluates strength of customer demand signals",
      "domain": "Insight Action"
    },
    "education": {
      "title": "Insight Action",
      "what": "A scoring model to separate valuable customer insights from noise, helping you identify which feedback represents real opportunities versus edge cases.",
      "why": "Not all customer feedback is equal. Without a grading system, you risk chasing every request and building a bloated, unfocused product.",
      "how": "\n      <h4>Signal Strength Factors:</h4>\n      <ul>\n        <li><strong>Frequency:</strong> How often you hear this feedback</li>\n        <li><strong>Intensity:</strong> How strongly customers feel about it</li>\n        <li><strong>Breadth:</strong> How many segments are affected</li>\n        <li><strong>Business Impact:</strong> Revenue/retention implications</li>\n        <li><strong>Strategic Fit:</strong> Alignment with your vision</li>\n      </ul>\n      \n      <h4>Grading Framework:</h4>\n      <ol>\n        <li>Score each signal on all factors (1-5)</li>\n        <li>Weight factors based on strategy</li>\n        <li>Calculate composite score</li>\n        <li>Set thresholds for action</li>\n        <li>Track signal evolution over time</li>\n      </ol>\n    ",
      "examples": [
        "A-Grade Signal: 15 of 20 enterprise prospects mentioned integration needs",
        "B-Grade Signal: Power users want advanced analytics, others don't care",
        "C-Grade Signal: One customer wants a very specific workflow"
      ],
      "keyMetrics": [
        {
          "value": "5x",
          "label": "More Insights",
          "description": "Per customer conversation"
        },
        {
          "value": "73%",
          "label": "Better Product Fit",
          "description": "Customer-driven development"
        },
        {
          "value": "60%",
          "label": "Faster Learning",
          "description": "Time to key insights"
        },
        {
          "value": "4.2x",
          "label": "Higher Retention",
          "description": "Research-driven companies"
        }
      ]
    },
    "workspace": {
      "domain": "Insight Action",
      "questions": [
        {
          "id": "2-5-q1",
          "text": "What gaps exist in your process for converting customer insights into action?",
          "type": "diagnostic",
          "required": true,
          "hint": "Identify breakdowns in insight capture, prioritization, or implementation of actions.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "2-5-q2",
          "text": "What is your average time from insight discovery to action implementation?",
          "type": "quantitative",
          "required": true,
          "hint": "Provide cycle times and implementation rates for different insight types and actions.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "2-5-q3",
          "text": "How does your insight-to-action loop support continuous improvement?",
          "type": "strategic",
          "required": true,
          "hint": "Explain how insights drive iterative product and GTM improvements through action.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "2-5-q4",
          "text": "What evidence shows your insight action loop drives meaningful outcomes?",
          "type": "validation",
          "required": false,
          "hint": "Share examples of insights that led to measurable improvements through action.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "2-5-q5",
          "text": "How do you prioritize which insights to act upon?",
          "type": "strategic",
          "required": false,
          "hint": "Describe your framework for evaluating impact and effort of insight-driven actions.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "2-5-q6",
          "text": "What feedback mechanisms validate the actions taken from insights?",
          "type": "diagnostic",
          "required": false,
          "hint": "Detail how you measure success of insight-driven changes and actions.",
          "minLength": 100,
          "maxLength": 1000
        }
      ],
      "tools": [
        "Feedback Management (Canny, ProductBoard)",
        "Analytics Platforms (Mixpanel, Heap)",
        "Support Ticket Analysis (Zendesk, Intercom)",
        "Social Listening (Mention, Brand24)"
      ],
      "templates": [
        "Signal Scoring Rubric",
        "Feedback Prioritization Matrix",
        "Signal Tracking Dashboard",
        "Validation Checklist"
      ],
      "bestPractices": [
        "Weight signals by customer segment value",
        "Look for patterns across multiple channels",
        "Set clear thresholds for action (e.g., 5+ requests)",
        "Track signal evolution over time"
      ]
    },
    "analysis": {
      "domain": "Insight Action",
      "dimensions": [
        {
          "name": "Signal Strength",
          "weight": 20,
          "description": "Intensity of customer interest"
        },
        {
          "name": "Signal Consistency",
          "weight": 20,
          "description": "Consistency across customers"
        },
        {
          "name": "Willingness to Pay",
          "weight": 20,
          "description": "Evidence of payment intent"
        },
        {
          "name": "Urgency Indicators",
          "weight": 20,
          "description": "Time pressure to solve"
        },
        {
          "name": "Champion Behavior",
          "weight": 20,
          "description": "Customer advocacy signals"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Weak or mixed signals",
        "26-50": "Some positive signals",
        "51-75": "Good demand signals",
        "76-90": "Strong demand signals",
        "91-100": "Overwhelming demand signals"
      }
    },
    "resources": {
      "domain": "Insight Action",
      "templates": [
        "Signal Scoring Rubric",
        "Feedback Prioritization Matrix",
        "Signal Tracking Dashboard"
      ],
      "metrics": [
        "Signal strength score",
        "Signal-to-action conversion rate",
        "False positive rate",
        "Time to signal validation"
      ]
    },
    "outputs": {
      "domain": "Insight Action",
      "templates": [
        "Signal Scoring Rubric",
        "Feedback Prioritization Matrix",
        "Signal Tracking Dashboard"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "2-4"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.939Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "2-6": {
    "id": "2-6",
    "name": "Customer Journey",
    "blockId": 2,
    "blockName": "Customer Insights",
    "subId": 6,
    "phase": 1,
    "phaseName": "Idea Market Fit",
    "category": "research",
    "agent": {
      "name": "Insight Loop Manager",
      "key": "2f",
      "description": "Manages continuous customer insight gathering",
      "domain": "Customer Journey"
    },
    "education": {
      "title": "Customer Journey",
      "what": "A documented process for converting customer insights into concrete product, marketing, or sales actions with clear ownership and timelines.",
      "why": "Insights without action are worthless. This loop ensures that valuable customer feedback doesn't die in spreadsheets but drives real change.",
      "how": "\n      <h4>Loop Stages:</h4>\n      <ol>\n        <li><strong>Capture:</strong> Collect insights from all sources</li>\n        <li><strong>Synthesize:</strong> Identify patterns and themes</li>\n        <li><strong>Prioritize:</strong> Score and rank opportunities</li>\n        <li><strong>Assign:</strong> Give clear ownership</li>\n        <li><strong>Execute:</strong> Implement changes</li>\n        <li><strong>Measure:</strong> Track impact</li>\n        <li><strong>Communicate:</strong> Close the loop with customers</li>\n      </ol>\n      \n      <h4>Implementation Requirements:</h4>\n      <ul>\n        <li>Central insight repository</li>\n        <li>Regular review cadence</li>\n        <li>Clear decision criteria</li>\n        <li>Cross-functional participation</li>\n        <li>Impact tracking system</li>\n      </ul>\n    ",
      "examples": [
        "Weekly insight review meeting → 3 product changes per sprint",
        "Customer advisory board feedback → Quarterly roadmap updates",
        "Support ticket analysis → Monthly feature prioritization"
      ],
      "keyMetrics": [
        {
          "value": "5x",
          "label": "More Insights",
          "description": "Per customer conversation"
        },
        {
          "value": "73%",
          "label": "Better Product Fit",
          "description": "Customer-driven development"
        },
        {
          "value": "60%",
          "label": "Faster Learning",
          "description": "Time to key insights"
        },
        {
          "value": "4.2x",
          "label": "Higher Retention",
          "description": "Research-driven companies"
        }
      ]
    },
    "workspace": {
      "domain": "Customer Journey",
      "questions": [
        {
          "id": "2-6-q1",
          "text": "What are the key stages in your customer journey and where do friction points occur?",
          "type": "diagnostic",
          "required": true,
          "hint": "Map the complete customer journey from awareness to advocacy, identifying pain points at each stage.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "2-6-q2",
          "text": "What metrics do you track at each stage of the customer journey?",
          "type": "quantitative",
          "required": true,
          "hint": "Provide conversion rates, time in stage, and drop-off rates for each customer journey phase.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "2-6-q3",
          "text": "How does your customer journey mapping inform product and GTM strategy?",
          "type": "strategic",
          "required": true,
          "hint": "Explain how journey insights drive feature development, messaging, and customer success initiatives.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "2-6-q4",
          "text": "What evidence validates your understanding of the customer journey?",
          "type": "validation",
          "required": false,
          "hint": "Share customer feedback, behavioral data, or research supporting your journey map.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "2-6-q5",
          "text": "How does the customer journey differ across segments or personas?",
          "type": "comparative",
          "required": false,
          "hint": "Describe variations in journey paths, touchpoints, or timelines by customer type.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "2-6-q6",
          "text": "What processes ensure continuous customer journey optimization?",
          "type": "diagnostic",
          "required": false,
          "hint": "Detail how you regularly update journey maps based on new data and customer feedback.",
          "minLength": 100,
          "maxLength": 1000
        }
      ],
      "tools": [
        "Product Management Tools (ProductBoard, Aha!)",
        "Workflow Automation (Zapier, Make)",
        "Project Tracking (Jira, Linear)",
        "Customer Communication (Intercom, Customer.io)"
      ],
      "templates": [
        "Insight Action Plan",
        "Decision Log Template",
        "Impact Tracking Sheet",
        "Customer Feedback Loop"
      ],
      "bestPractices": [
        "Set SLA for insight review (e.g., within 48 hours)",
        "Assign clear owners for each insight category",
        "Close the loop with customers who provided feedback",
        "Measure impact 30-60 days post-implementation"
      ]
    },
    "analysis": {
      "domain": "Customer Journey",
      "dimensions": [
        {
          "name": "Feedback Channels",
          "weight": 20,
          "description": "Variety of insight sources"
        },
        {
          "name": "Processing Speed",
          "weight": 20,
          "description": "Time from insight to action"
        },
        {
          "name": "Cross-functional Sharing",
          "weight": 20,
          "description": "Distribution of insights"
        },
        {
          "name": "Insight Quality",
          "weight": 20,
          "description": "Actionability of insights"
        },
        {
          "name": "Continuous Improvement",
          "weight": 20,
          "description": "Evolution of insight process"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Ad-hoc insight gathering",
        "26-50": "Basic feedback loops",
        "51-75": "Good insight management",
        "76-90": "Strong insight system",
        "91-100": "World-class insight engine"
      }
    },
    "resources": {
      "domain": "Customer Journey",
      "templates": [
        "Insight Action Plan",
        "Decision Log Template",
        "Impact Tracking Sheet"
      ],
      "metrics": [
        "Insight to action time",
        "Action completion rate",
        "Customer satisfaction lift",
        "Revenue impact of changes"
      ]
    },
    "outputs": {
      "domain": "Customer Journey",
      "templates": [
        "Insight Action Plan",
        "Decision Log Template",
        "Impact Tracking Sheet"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "2-5"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.939Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "3-1": {
    "id": "3-1",
    "name": "Use Case Scoring Model",
    "blockId": 3,
    "blockName": "Strategic Prioritization",
    "subId": 1,
    "phase": 2,
    "phaseName": "Product Market Fit",
    "category": "strategy",
    "agent": {
      "name": "Use Case Scorer",
      "key": "3a",
      "description": "Evaluates and prioritizes use cases",
      "domain": "Use Case Scoring Model"
    },
    "education": {
      "title": "Use Case Scoring Model",
      "what": "A quantitative framework for evaluating and ranking different use cases based on factors like market size, urgency, feasibility, and strategic fit.",
      "why": "You can't be everything to everyone. A scoring model forces discipline in choosing which use cases to pursue first, maximizing impact with limited resources.",
      "how": "\n      <h4>Scoring Dimensions:</h4>\n      <ul>\n        <li><strong>Market Size:</strong> Number of potential customers</li>\n        <li><strong>Urgency:</strong> How badly they need it now</li>\n        <li><strong>Willingness to Pay:</strong> Budget availability</li>\n        <li><strong>Technical Feasibility:</strong> Build complexity</li>\n        <li><strong>Competitive Advantage:</strong> Your unique position</li>\n        <li><strong>Strategic Alignment:</strong> Fit with vision</li>\n      </ul>\n      \n      <h4>Scoring Process:</h4>\n      <ol>\n        <li>Define scoring criteria and weights</li>\n        <li>Gather data for each use case</li>\n        <li>Score each dimension (1-10)</li>\n        <li>Calculate weighted total</li>\n        <li>Rank and set cutoff threshold</li>\n        <li>Validate with stakeholders</li>\n      </ol>\n    ",
      "examples": [
        "Enterprise compliance automation: Score 8.5/10 (high urgency, high WTP)",
        "SMB basic reporting: Score 6.2/10 (large market, low differentiation)",
        "Startup free tools: Score 3.1/10 (no revenue, high support cost)"
      ],
      "keyMetrics": [
        {
          "value": "2.8x",
          "label": "Better Prioritization",
          "description": "Resource allocation efficiency"
        },
        {
          "value": "55%",
          "label": "Faster Decisions",
          "description": "Strategic clarity impact"
        },
        {
          "value": "40%",
          "label": "Higher ROI",
          "description": "Focused vs scattered efforts"
        },
        {
          "value": "3.5x",
          "label": "Market Impact",
          "description": "Strategic positioning advantage"
        }
      ]
    },
    "workspace": {
      "domain": "Use Case Scoring Model",
      "questions": [
        {
          "id": "3-1-q1",
          "text": "What challenges do you face in prioritizing use cases across different customer segments?",
          "type": "diagnostic",
          "required": true,
          "hint": "Describe conflicts between customer requests, market opportunities, and resource constraints.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "3-1-q2",
          "text": "What scoring model or metrics do you use to evaluate use case priority?",
          "type": "quantitative",
          "required": true,
          "hint": "Provide your scoring framework with weights for impact, effort, and strategic fit.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "3-1-q3",
          "text": "How does use case prioritization align with your business objectives?",
          "type": "strategic",
          "required": true,
          "hint": "Explain how prioritization supports revenue, retention, or market expansion goals.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "3-1-q4",
          "text": "What validates your current use case priorities are correct?",
          "type": "validation",
          "required": false,
          "hint": "Share customer feedback, usage data, or revenue impact of prioritized use cases.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "3-1-q5",
          "text": "How do you handle use cases that are important but not urgent?",
          "type": "strategic",
          "required": false,
          "hint": "Describe your approach to balancing quick wins with strategic initiatives.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "3-1-q6",
          "text": "What process ensures stakeholder alignment on use case priorities?",
          "type": "diagnostic",
          "required": false,
          "hint": "Detail review cycles, communication, and decision-making processes.",
          "minLength": 100,
          "maxLength": 1000
        }
      ],
      "tools": [
        "Prioritization Frameworks (RICE, ICE, WSJF)",
        "Roadmap Tools (ProductPlan, Aha!)",
        "Analytics Platforms (Mixpanel, Amplitude)",
        "Market Research Tools (CB Insights, Crunchbase)"
      ],
      "templates": [
        "Use Case Scoring Matrix",
        "Market Opportunity Calculator",
        "Feasibility Assessment",
        "ROI Projection Model"
      ],
      "bestPractices": [
        "Score all use cases using same criteria",
        "Weight factors based on strategy",
        "Validate scores with customers and team",
        "Revisit scoring quarterly as you learn"
      ]
    },
    "analysis": {
      "domain": "Use Case Scoring Model",
      "dimensions": [
        {
          "name": "Value Potential",
          "weight": 20,
          "description": "Business value of use case"
        },
        {
          "name": "Feasibility",
          "weight": 20,
          "description": "Technical and resource feasibility"
        },
        {
          "name": "Market Demand",
          "weight": 20,
          "description": "Customer demand for use case"
        },
        {
          "name": "Competitive Advantage",
          "weight": 20,
          "description": "Differentiation potential"
        },
        {
          "name": "Strategic Fit",
          "weight": 20,
          "description": "Alignment with strategy"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Poor use case definition",
        "26-50": "Basic use cases identified",
        "51-75": "Well-defined use cases",
        "76-90": "Excellent use case portfolio",
        "91-100": "Optimal use case strategy"
      }
    },
    "resources": {
      "domain": "Use Case Scoring Model",
      "templates": [
        "Use Case Scoring Matrix",
        "Market Opportunity Calculator",
        "Feasibility Assessment"
      ],
      "metrics": [
        "Use case score",
        "Addressable market size",
        "Implementation effort (story points)",
        "Projected revenue per use case"
      ]
    },
    "outputs": {
      "domain": "Use Case Scoring Model",
      "templates": [
        "Use Case Scoring Matrix",
        "Market Opportunity Calculator",
        "Feasibility Assessment"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.939Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "3-2": {
    "id": "3-2",
    "name": "Segment Tiering",
    "blockId": 3,
    "blockName": "Strategic Prioritization",
    "subId": 2,
    "phase": 2,
    "phaseName": "Product Market Fit",
    "category": "strategy",
    "agent": {
      "name": "Segment Tier Analyst",
      "key": "3b",
      "description": "Analyzes and tiers customer segments",
      "domain": "Segment Tiering"
    },
    "education": {
      "title": "Segment Tiering",
      "what": "A ranked categorization of customer segments based on their value potential, fit, and strategic importance to your business.",
      "why": "Different segments require different levels of investment. Tiering helps you allocate resources proportionally to opportunity and avoid spreading too thin.",
      "how": "\n      <h4>Tiering Criteria:</h4>\n      <ul>\n        <li><strong>Revenue Potential:</strong> LTV and market size</li>\n        <li><strong>Product Fit:</strong> How well you solve their problem</li>\n        <li><strong>Sales Efficiency:</strong> CAC and sales cycle</li>\n        <li><strong>Strategic Value:</strong> Reference-ability, market position</li>\n        <li><strong>Support Requirements:</strong> Complexity and cost to serve</li>\n      </ul>\n      \n      <h4>Tier Definitions:</h4>\n      <ul>\n        <li><strong>Tier 1:</strong> Primary focus, full resources</li>\n        <li><strong>Tier 2:</strong> Secondary focus, selective investment</li>\n        <li><strong>Tier 3:</strong> Opportunistic, self-serve model</li>\n        <li><strong>Not a Fit:</strong> Actively discourage</li>\n      </ul>\n    ",
      "examples": [
        "Tier 1: Mid-market SaaS companies (50-500 employees)",
        "Tier 2: Enterprise divisions acting autonomously",
        "Tier 3: Small agencies and consultants"
      ],
      "keyMetrics": [
        {
          "value": "2.8x",
          "label": "Better Prioritization",
          "description": "Resource allocation efficiency"
        },
        {
          "value": "55%",
          "label": "Faster Decisions",
          "description": "Strategic clarity impact"
        },
        {
          "value": "40%",
          "label": "Higher ROI",
          "description": "Focused vs scattered efforts"
        },
        {
          "value": "3.5x",
          "label": "Market Impact",
          "description": "Strategic positioning advantage"
        }
      ]
    },
    "workspace": {
      "domain": "Segment Tiering",
      "questions": [
        {
          "id": "3-2-q1",
          "text": "What is your current strategy for Segment Tiering?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Segment Tiering for ST6Co/ScaleOps6Product"
        },
        {
          "id": "3-2-q2",
          "text": "How do you measure success in Segment Tiering?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Segment Tiering for ST6Co/ScaleOps6Product"
        },
        {
          "id": "3-2-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Segment Tiering for ST6Co/ScaleOps6Product"
        },
        {
          "id": "3-2-q4",
          "text": "What specific evidence demonstrates your Segment Tiering effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "3-2-q5",
          "text": "What are your next steps to improve Segment Tiering?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "CRM Systems (Salesforce, HubSpot)",
        "Analytics Tools (Looker, Tableau)",
        "Segmentation Platforms (Segment, Clearbit)",
        "Customer Data Platforms (Twilio Segment, mParticle)"
      ],
      "templates": [
        "Segment Scoring Card",
        "ICP Definition Framework",
        "Tiering Decision Matrix",
        "Segment Profitability Analysis"
      ],
      "bestPractices": [
        "Define clear tier criteria upfront",
        "Align resources to tier value",
        "Review tiering quarterly",
        "Track metrics by tier separately"
      ]
    },
    "analysis": {
      "domain": "Segment Tiering",
      "dimensions": [
        {
          "name": "Segmentation Clarity",
          "weight": 20,
          "description": "Clear segment definitions"
        },
        {
          "name": "Tier Criteria",
          "weight": 20,
          "description": "Logical tiering methodology"
        },
        {
          "name": "Revenue Potential",
          "weight": 20,
          "description": "Revenue by segment analysis"
        },
        {
          "name": "Fit Assessment",
          "weight": 20,
          "description": "Product-segment fit"
        },
        {
          "name": "Growth Potential",
          "weight": 20,
          "description": "Segment growth trajectories"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No clear segmentation",
        "26-50": "Basic segmentation exists",
        "51-75": "Good segment analysis",
        "76-90": "Strong segment strategy",
        "91-100": "Expert segment optimization"
      }
    },
    "resources": {
      "domain": "Segment Tiering",
      "templates": [
        "Segment Scoring Card",
        "ICP Definition Framework",
        "Tiering Decision Matrix"
      ],
      "metrics": [
        "Revenue by tier",
        "CAC by tier",
        "Retention rate by tier",
        "Support ticket volume by tier"
      ]
    },
    "outputs": {
      "domain": "Segment Tiering",
      "templates": [
        "Segment Scoring Card",
        "ICP Definition Framework",
        "Tiering Decision Matrix"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "3-1"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "3-3": {
    "id": "3-3",
    "name": "Prioritization Rubric",
    "blockId": 3,
    "blockName": "Strategic Prioritization",
    "subId": 3,
    "phase": 2,
    "phaseName": "Product Market Fit",
    "category": "strategy",
    "agent": {
      "name": "Prioritization Expert",
      "key": "3c",
      "description": "Masters prioritization frameworks and decisions",
      "domain": "Prioritization Rubric"
    },
    "education": {
      "title": "Prioritization Rubric",
      "what": "A systematic approach to prioritization rubric that masters prioritization frameworks and decisions. Evaluates framework quality, stakeholder alignment, resource allocation, decision speed, outcome tracking to ensure excellence and continuous improvement in this critical capability.",
      "why": "Resources are always finite. Without clear allocation frameworks, teams waste effort on low-impact work while critical initiatives starve.",
      "how": "\n      <h4>Allocation Criteria:</h4>\n      <ul>\n        <li><strong>Strategic Alignment:</strong> How well does it support key objectives?</li>\n        <li><strong>ROI Potential:</strong> Expected return vs. investment required</li>\n        <li><strong>Risk Level:</strong> Probability of success and downside</li>\n        <li><strong>Resource Requirements:</strong> People, time, and capital needed</li>\n        <li><strong>Opportunity Cost:</strong> What else could we do instead?</li>\n      </ul>\n    ",
      "examples": [
        "70% resources to core product, 20% to new initiatives, 10% to experiments",
        "Engineering: 40% features, 30% tech debt, 20% bugs, 10% innovation",
        "Marketing: 50% demand gen, 30% brand, 20% product marketing"
      ],
      "keyMetrics": [
        {
          "value": "2.8x",
          "label": "Better Prioritization",
          "description": "Resource allocation efficiency"
        },
        {
          "value": "55%",
          "label": "Faster Decisions",
          "description": "Strategic clarity impact"
        },
        {
          "value": "40%",
          "label": "Higher ROI",
          "description": "Focused vs scattered efforts"
        },
        {
          "value": "3.5x",
          "label": "Market Impact",
          "description": "Strategic positioning advantage"
        }
      ]
    },
    "workspace": {
      "domain": "Prioritization Rubric",
      "questions": [
        {
          "id": "3-3-q1",
          "text": "What is your current strategy for Prioritization Rubric?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Prioritization Rubric for ST6Co/ScaleOps6Product"
        },
        {
          "id": "3-3-q2",
          "text": "How do you measure success in Prioritization Rubric?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Prioritization Rubric for ST6Co/ScaleOps6Product"
        },
        {
          "id": "3-3-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Prioritization Rubric for ST6Co/ScaleOps6Product"
        },
        {
          "id": "3-3-q4",
          "text": "What specific evidence demonstrates your Prioritization Rubric effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "3-3-q5",
          "text": "What are your next steps to improve Prioritization Rubric?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [],
      "templates": [
        "Resource Allocation Matrix",
        "Priority Scoring Framework",
        "Strategic Initiative Tracker"
      ],
      "bestPractices": []
    },
    "analysis": {
      "domain": "Prioritization Rubric",
      "dimensions": [
        {
          "name": "Framework Quality",
          "weight": 20,
          "description": "Robustness of prioritization method"
        },
        {
          "name": "Stakeholder Alignment",
          "weight": 20,
          "description": "Buy-in on priorities"
        },
        {
          "name": "Resource Allocation",
          "weight": 20,
          "description": "Resources match priorities"
        },
        {
          "name": "Decision Speed",
          "weight": 20,
          "description": "Speed of prioritization decisions"
        },
        {
          "name": "Outcome Tracking",
          "weight": 20,
          "description": "Validation of prioritization"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Ad-hoc prioritization",
        "26-50": "Basic prioritization process",
        "51-75": "Good prioritization discipline",
        "76-90": "Strong prioritization culture",
        "91-100": "World-class prioritization"
      }
    },
    "resources": {
      "domain": "Prioritization Rubric",
      "templates": [
        "Resource Allocation Matrix",
        "Priority Scoring Framework",
        "Strategic Initiative Tracker"
      ],
      "metrics": [
        "Resource utilization rate",
        "ROI by initiative",
        "Strategic goal achievement",
        "Resource allocation efficiency"
      ]
    },
    "outputs": {
      "domain": "Prioritization Rubric",
      "templates": [
        "Resource Allocation Matrix",
        "Priority Scoring Framework",
        "Strategic Initiative Tracker"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "3-2"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "3-4": {
    "id": "3-4",
    "name": "Tradeoff Tracker",
    "blockId": 3,
    "blockName": "Strategic Prioritization",
    "subId": 4,
    "phase": 2,
    "phaseName": "Product Market Fit",
    "category": "strategy",
    "agent": {
      "name": "Tradeoff Tracker",
      "key": "3d",
      "description": "Documents and analyzes strategic tradeoffs",
      "domain": "Tradeoff Tracker"
    },
    "education": {
      "title": "Tradeoff Tracker",
      "what": "A systematic framework for monitoring and measuring tradeoff tracker through data collection, analysis, and actionable insights. Tracks key metrics including tradeoff recognition, impact analysis, documentation quality, stakeholder communication, learning integration to enable proactive decision-making and continuous improvement.",
      "why": "Clear positioning helps you win the right customers, command premium pricing, and defend against competition.",
      "how": "\n      <h4>Positioning Framework:</h4>\n      <ul>\n        <li><strong>Target Segment:</strong> Who is your ideal customer?</li>\n        <li><strong>Problem Category:</strong> What problem do you solve?</li>\n        <li><strong>Unique Value:</strong> How are you different and better?</li>\n        <li><strong>Proof Points:</strong> What evidence supports your claims?</li>\n        <li><strong>Competitive Alternatives:</strong> What would they use instead?</li>\n      </ul>\n    ",
      "examples": [
        "Only solution designed specifically for mid-market SaaS companies",
        "Fastest implementation in the industry (2 weeks vs 3 months)",
        "Built by practitioners, not consultants"
      ],
      "keyMetrics": [
        {
          "value": "2.8x",
          "label": "Better Prioritization",
          "description": "Resource allocation efficiency"
        },
        {
          "value": "55%",
          "label": "Faster Decisions",
          "description": "Strategic clarity impact"
        },
        {
          "value": "40%",
          "label": "Higher ROI",
          "description": "Focused vs scattered efforts"
        },
        {
          "value": "3.5x",
          "label": "Market Impact",
          "description": "Strategic positioning advantage"
        }
      ]
    },
    "workspace": {
      "domain": "Tradeoff Tracker",
      "questions": [
        {
          "id": "3-4-q1",
          "text": "What is your current strategy for Tradeoff Tracker?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Tradeoff Tracker for ST6Co/ScaleOps6Product"
        },
        {
          "id": "3-4-q2",
          "text": "How do you measure success in Tradeoff Tracker?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Tradeoff Tracker for ST6Co/ScaleOps6Product"
        },
        {
          "id": "3-4-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Tradeoff Tracker for ST6Co/ScaleOps6Product"
        },
        {
          "id": "3-4-q4",
          "text": "What specific evidence demonstrates your Tradeoff Tracker effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "3-4-q5",
          "text": "What are your next steps to improve Tradeoff Tracker?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [],
      "templates": [
        "Competitive Positioning Canvas",
        "Differentiation Strategy Map",
        "Competitive Response Playbook"
      ],
      "bestPractices": []
    },
    "analysis": {
      "domain": "Tradeoff Tracker",
      "dimensions": [
        {
          "name": "Tradeoff Recognition",
          "weight": 20,
          "description": "Awareness of tradeoffs"
        },
        {
          "name": "Impact Analysis",
          "weight": 20,
          "description": "Understanding of consequences"
        },
        {
          "name": "Documentation Quality",
          "weight": 20,
          "description": "Clear tradeoff records"
        },
        {
          "name": "Stakeholder Communication",
          "weight": 20,
          "description": "Tradeoff transparency"
        },
        {
          "name": "Learning Integration",
          "weight": 20,
          "description": "Learning from tradeoffs"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Tradeoffs ignored or hidden",
        "26-50": "Some tradeoff awareness",
        "51-75": "Good tradeoff management",
        "76-90": "Strong tradeoff discipline",
        "91-100": "Expert tradeoff optimization"
      }
    },
    "resources": {
      "domain": "Tradeoff Tracker",
      "templates": [
        "Tradeoff Analysis Template",
        "Decision Matrix",
        "Impact Assessment Framework"
      ],
      "metrics": [
        "Win rate vs competitors",
        "Price premium achieved",
        "Market share growth",
        "Positioning clarity score"
      ]
    },
    "outputs": {
      "domain": "Tradeoff Tracker",
      "templates": [
        "Tradeoff Analysis Template",
        "Decision Matrix",
        "Impact Assessment Framework"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "3-3"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "3-5": {
    "id": "3-5",
    "name": "Hypothesis Board",
    "blockId": 3,
    "blockName": "Strategic Prioritization",
    "subId": 5,
    "phase": 2,
    "phaseName": "Product Market Fit",
    "category": "strategy",
    "agent": {
      "name": "Hypothesis Validator",
      "key": "3e",
      "description": "Tests and validates strategic hypotheses",
      "domain": "Hypothesis Board"
    },
    "education": {
      "title": "Hypothesis Board",
      "what": "A systematic approach to hypothesis board that tests and validates strategic hypotheses. Evaluates hypothesis clarity, test design, data collection, analysis quality, decision making to ensure excellence and continuous improvement in this critical capability.",
      "why": "Proactive risk management prevents catastrophic failures and enables faster, more confident decision-making.",
      "how": "\n      <h4>Risk Categories:</h4>\n      <ul>\n        <li><strong>Market Risk:</strong> Demand changes, competition</li>\n        <li><strong>Technical Risk:</strong> Product failures, tech debt</li>\n        <li><strong>Financial Risk:</strong> Cash flow, funding gaps</li>\n        <li><strong>Operational Risk:</strong> Team, processes, vendors</li>\n        <li><strong>Regulatory Risk:</strong> Compliance, legal issues</li>\n      </ul>\n    ",
      "examples": [
        "Key person dependency: CTO holds critical knowledge",
        "Platform risk: 60% revenue from one integration partner",
        "Regulatory change could require major product redesign"
      ],
      "keyMetrics": [
        {
          "value": "2.8x",
          "label": "Better Prioritization",
          "description": "Resource allocation efficiency"
        },
        {
          "value": "55%",
          "label": "Faster Decisions",
          "description": "Strategic clarity impact"
        },
        {
          "value": "40%",
          "label": "Higher ROI",
          "description": "Focused vs scattered efforts"
        },
        {
          "value": "3.5x",
          "label": "Market Impact",
          "description": "Strategic positioning advantage"
        }
      ]
    },
    "workspace": {
      "domain": "Hypothesis Board",
      "questions": [
        {
          "id": "3-5-q1",
          "text": "What is your current strategy for Hypothesis Board?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Hypothesis Board for ST6Co/ScaleOps6Product"
        },
        {
          "id": "3-5-q2",
          "text": "How do you measure success in Hypothesis Board?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Hypothesis Board for ST6Co/ScaleOps6Product"
        },
        {
          "id": "3-5-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Hypothesis Board for ST6Co/ScaleOps6Product"
        },
        {
          "id": "3-5-q4",
          "text": "What specific evidence demonstrates your Hypothesis Board effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "3-5-q5",
          "text": "What are your next steps to improve Hypothesis Board?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [],
      "templates": [
        "Risk Assessment Matrix",
        "Mitigation Strategy Framework",
        "Risk Monitoring Dashboard"
      ],
      "bestPractices": []
    },
    "analysis": {
      "domain": "Hypothesis Board",
      "dimensions": [
        {
          "name": "Hypothesis Clarity",
          "weight": 20,
          "description": "Well-formed hypotheses"
        },
        {
          "name": "Test Design",
          "weight": 20,
          "description": "Quality of validation tests"
        },
        {
          "name": "Data Collection",
          "weight": 20,
          "description": "Rigor of data gathering"
        },
        {
          "name": "Analysis Quality",
          "weight": 20,
          "description": "Statistical and logical rigor"
        },
        {
          "name": "Decision Making",
          "weight": 20,
          "description": "Acting on validation results"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No hypothesis testing",
        "26-50": "Occasional validation",
        "51-75": "Regular hypothesis testing",
        "76-90": "Strong validation culture",
        "91-100": "Scientific validation excellence"
      }
    },
    "resources": {
      "domain": "Hypothesis Board",
      "templates": [
        "Hypothesis Testing Canvas",
        "Experiment Design Template",
        "Learning Tracker"
      ],
      "metrics": [
        "Risk exposure score",
        "Mitigation effectiveness",
        "Time to risk identification",
        "Risk-adjusted returns"
      ]
    },
    "outputs": {
      "domain": "Hypothesis Board",
      "templates": [
        "Hypothesis Testing Canvas",
        "Experiment Design Template",
        "Learning Tracker"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "3-4"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "3-6": {
    "id": "3-6",
    "name": "Decision Archive",
    "blockId": 3,
    "blockName": "Strategic Prioritization",
    "subId": 6,
    "phase": 2,
    "phaseName": "Product Market Fit",
    "category": "strategy",
    "agent": {
      "name": "Decision Archivist",
      "key": "3f",
      "description": "Documents and learns from strategic decisions",
      "domain": "Decision Archive"
    },
    "education": {
      "title": "Decision Archive",
      "what": "A systematic approach to decision archive that documents and learns from strategic decisions. Evaluates documentation completeness, decision rationale, outcome tracking, pattern recognition, knowledge sharing to ensure excellence and continuous improvement in this critical capability.",
      "why": "Not all opportunities are created equal. Systematic evaluation prevents resource waste on attractive but unprofitable ventures.",
      "how": "\n      <h4>Evaluation Dimensions:</h4>\n      <ul>\n        <li><strong>Market Size:</strong> TAM and growth potential</li>\n        <li><strong>Strategic Fit:</strong> Alignment with vision and capabilities</li>\n        <li><strong>Competitive Advantage:</strong> Can we win?</li>\n        <li><strong>Resource Requirements:</strong> Investment needed</li>\n        <li><strong>Time to Value:</strong> How quickly can we capture it?</li>\n      </ul>\n    ",
      "examples": [
        "International expansion: $50M opportunity, 18-month payback",
        "Enterprise tier: 3x ACV but 2x longer sales cycle",
        "Platform play: High risk but 10x potential"
      ],
      "keyMetrics": [
        {
          "value": "2.8x",
          "label": "Better Prioritization",
          "description": "Resource allocation efficiency"
        },
        {
          "value": "55%",
          "label": "Faster Decisions",
          "description": "Strategic clarity impact"
        },
        {
          "value": "40%",
          "label": "Higher ROI",
          "description": "Focused vs scattered efforts"
        },
        {
          "value": "3.5x",
          "label": "Market Impact",
          "description": "Strategic positioning advantage"
        }
      ]
    },
    "workspace": {
      "domain": "Decision Archive",
      "questions": [
        {
          "id": "3-6-q1",
          "text": "What is your current strategy for decision framework?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Decision Framework for ST6Co/ScaleOps6Product"
        },
        {
          "id": "3-6-q2",
          "text": "How do you measure success in decision framework?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Decision Framework for ST6Co/ScaleOps6Product"
        },
        {
          "id": "3-6-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Decision Framework for ST6Co/ScaleOps6Product"
        },
        {
          "id": "3-6-q4",
          "text": "What specific evidence demonstrates your Decision Framework effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "3-6-q5",
          "text": "What are your next steps to improve Decision Framework?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [],
      "templates": [
        "Opportunity Evaluation Scorecard",
        "Market Timing Analysis",
        "Go/No-Go Decision Framework"
      ],
      "bestPractices": []
    },
    "analysis": {
      "domain": "Decision Archive",
      "dimensions": [
        {
          "name": "Documentation Completeness",
          "weight": 20,
          "description": "Thoroughness of records"
        },
        {
          "name": "Decision Rationale",
          "weight": 20,
          "description": "Clear reasoning captured"
        },
        {
          "name": "Outcome Tracking",
          "weight": 20,
          "description": "Results vs. expectations"
        },
        {
          "name": "Pattern Recognition",
          "weight": 20,
          "description": "Learning from patterns"
        },
        {
          "name": "Knowledge Sharing",
          "weight": 20,
          "description": "Organizational learning"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No decision documentation",
        "26-50": "Basic decision records",
        "51-75": "Good decision archiving",
        "76-90": "Strong decision learning",
        "91-100": "Learning organization excellence"
      }
    },
    "resources": {
      "domain": "Decision Archive",
      "templates": [
        "Decision Log Template",
        "ADR Template",
        "Retrospective Framework"
      ],
      "metrics": [
        "Opportunity pipeline value",
        "Success rate of pursued opportunities",
        "Time to opportunity capture",
        "ROI on new initiatives"
      ]
    },
    "outputs": {
      "domain": "Decision Archive",
      "templates": [
        "Decision Log Template",
        "ADR Template",
        "Retrospective Framework"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "3-5"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "4-1": {
    "id": "4-1",
    "name": "Feature Inclusion Matrix",
    "blockId": 4,
    "blockName": "Prototype Launch",
    "subId": 1,
    "phase": 2,
    "phaseName": "Product Market Fit",
    "category": "execution",
    "agent": {
      "name": "Feature Matrix Builder",
      "key": "4a",
      "description": "Creates and manages feature prioritization matrices",
      "domain": "Feature Inclusion Matrix"
    },
    "education": {
      "title": "Feature Inclusion Matrix",
      "what": "A decision framework for determining which features make it into your MVP versus what gets deferred to later releases.",
      "why": "The biggest MVP mistake is including too much. This matrix forces brutal prioritization to ship faster and learn sooner.",
      "how": "\n      <h4>Inclusion Criteria:</h4>\n      <ul>\n        <li><strong>Core Value:</strong> Essential to primary use case</li>\n        <li><strong>Technical Dependency:</strong> Required for other features</li>\n        <li><strong>Learning Value:</strong> Tests key assumptions</li>\n        <li><strong>Competitive Parity:</strong> Table stakes in market</li>\n        <li><strong>Implementation Cost:</strong> Effort versus impact</li>\n      </ul>\n      \n      <h4>Matrix Quadrants:</h4>\n      <ul>\n        <li><strong>Must Have:</strong> MVP fails without it</li>\n        <li><strong>Should Have:</strong> Significantly improves experience</li>\n        <li><strong>Could Have:</strong> Nice but not essential</li>\n        <li><strong>Won't Have:</strong> Explicitly excluded from v1</li>\n      </ul>\n    ",
      "examples": [
        "Must Have: User authentication, core workflow, basic reporting",
        "Should Have: Team collaboration, advanced filters",
        "Won't Have: Mobile app, API, white-labeling"
      ],
      "keyMetrics": [
        {
          "value": "50%",
          "label": "Faster Time-to-Market",
          "description": "MVP launch speed"
        },
        {
          "value": "70%",
          "label": "Higher Quality",
          "description": "Structured vs ad-hoc approach"
        },
        {
          "value": "3x",
          "label": "Better Outcomes",
          "description": "Planned vs unplanned execution"
        },
        {
          "value": "45%",
          "label": "Lower Costs",
          "description": "Efficient execution"
        }
      ]
    },
    "workspace": {
      "domain": "Feature Inclusion Matrix",
      "questions": [
        {
          "id": "4-1-q1",
          "text": "What is your current strategy for Feature Inclusion Matrix?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Feature Inclusion Matrix for ST6Co/ScaleOps6Product"
        },
        {
          "id": "4-1-q2",
          "text": "How do you measure success in Feature Inclusion Matrix?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Feature Inclusion Matrix for ST6Co/ScaleOps6Product"
        },
        {
          "id": "4-1-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Feature Inclusion Matrix for ST6Co/ScaleOps6Product"
        },
        {
          "id": "4-1-q4",
          "text": "What specific evidence demonstrates your Feature Inclusion Matrix effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "4-1-q5",
          "text": "What are your next steps to improve Feature Inclusion Matrix?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Feature Management (LaunchDarkly, Split)",
        "Roadmap Tools (ProductPlan, Roadmunk)",
        "Prioritization Tools (Productboard, Aha!)",
        "Project Management (Jira, Linear)"
      ],
      "templates": [
        "Feature Prioritization Matrix",
        "MVP Scoping Canvas",
        "MoSCoW Analysis Template",
        "Feature Cost-Benefit Analysis"
      ],
      "bestPractices": [
        "Ruthlessly cut features for MVP",
        "Focus on core value proposition",
        "Document what's explicitly excluded",
        "Plan iterations from the start"
      ]
    },
    "analysis": {
      "domain": "Feature Inclusion Matrix",
      "dimensions": [
        {
          "name": "Feature Definition",
          "weight": 20,
          "description": "Clarity of feature specifications"
        },
        {
          "name": "Value Scoring",
          "weight": 20,
          "description": "Business value assessment"
        },
        {
          "name": "Effort Estimation",
          "weight": 20,
          "description": "Development effort accuracy"
        },
        {
          "name": "Dependency Mapping",
          "weight": 20,
          "description": "Understanding of dependencies"
        },
        {
          "name": "Roadmap Alignment",
          "weight": 20,
          "description": "Fit with product roadmap"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No clear feature prioritization",
        "26-50": "Basic feature list exists",
        "51-75": "Good feature matrix in use",
        "76-90": "Strong feature management",
        "91-100": "Expert feature optimization"
      }
    },
    "resources": {
      "domain": "Feature Inclusion Matrix",
      "templates": [
        "Feature Prioritization Matrix",
        "MVP Scoping Canvas",
        "MoSCoW Analysis Template"
      ],
      "metrics": [
        "Features in MVP vs backlog",
        "Development time saved",
        "Time to first customer",
        "Feature usage post-launch"
      ]
    },
    "outputs": {
      "domain": "Feature Inclusion Matrix",
      "templates": [
        "Feature Prioritization Matrix",
        "MVP Scoping Canvas",
        "MoSCoW Analysis Template"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "4-2": {
    "id": "4-2",
    "name": "Technical Scope Tracker",
    "blockId": 4,
    "blockName": "Prototype Launch",
    "subId": 2,
    "phase": 2,
    "phaseName": "Product Market Fit",
    "category": "execution",
    "agent": {
      "name": "Technical Scope Expert",
      "key": "4b",
      "description": "Defines and manages technical scope boundaries",
      "domain": "Technical Scope Tracker"
    },
    "education": {
      "title": "Technical Scope Tracker",
      "what": "A detailed documentation of the technical implementation approach, architecture decisions, and development milestones for your prototype.",
      "why": "Technical debt starts with the prototype. Clear scope tracking prevents feature creep, ensures realistic timelines, and maintains development velocity.",
      "how": "\n      <h4>Scope Components:</h4>\n      <ul>\n        <li><strong>Architecture Decisions:</strong> Tech stack, infrastructure</li>\n        <li><strong>Development Phases:</strong> Sprint planning, milestones</li>\n        <li><strong>Technical Constraints:</strong> Performance, security requirements</li>\n        <li><strong>Integration Points:</strong> Third-party services, APIs</li>\n        <li><strong>Testing Strategy:</strong> Unit, integration, user acceptance</li>\n      </ul>\n      \n      <h4>Tracking Process:</h4>\n      <ol>\n        <li>Define technical requirements</li>\n        <li>Break down into epics and stories</li>\n        <li>Estimate effort (story points)</li>\n        <li>Set sprint goals</li>\n        <li>Track velocity and burndown</li>\n        <li>Document technical decisions</li>\n      </ol>\n    ",
      "examples": [
        "Week 1-2: Authentication and core data model",
        "Week 3-4: Primary workflow implementation",
        "Week 5: Testing and bug fixes"
      ],
      "keyMetrics": [
        {
          "value": "50%",
          "label": "Faster Time-to-Market",
          "description": "MVP launch speed"
        },
        {
          "value": "70%",
          "label": "Higher Quality",
          "description": "Structured vs ad-hoc approach"
        },
        {
          "value": "3x",
          "label": "Better Outcomes",
          "description": "Planned vs unplanned execution"
        },
        {
          "value": "45%",
          "label": "Lower Costs",
          "description": "Efficient execution"
        }
      ]
    },
    "workspace": {
      "domain": "Technical Scope Tracker",
      "questions": [
        {
          "id": "4-2-q1",
          "text": "What is your current strategy for Technical Scope Tracker?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Technical Scope Tracker for ST6Co/ScaleOps6Product"
        },
        {
          "id": "4-2-q2",
          "text": "How do you measure success in Technical Scope Tracker?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Technical Scope Tracker for ST6Co/ScaleOps6Product"
        },
        {
          "id": "4-2-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Technical Scope Tracker for ST6Co/ScaleOps6Product"
        },
        {
          "id": "4-2-q4",
          "text": "What specific evidence demonstrates your Technical Scope Tracker effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "4-2-q5",
          "text": "What are your next steps to improve Technical Scope Tracker?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Development Tools (GitHub, GitLab)",
        "Architecture Tools (Draw.io, Lucidchart)",
        "Project Tracking (Jira, Linear)",
        "Documentation (Confluence, Notion)"
      ],
      "templates": [
        "Technical Roadmap Template",
        "Sprint Planning Board",
        "Architecture Decision Record",
        "Technical Debt Register"
      ],
      "bestPractices": [
        "Keep scope documents updated",
        "Track velocity from day one",
        "Document all technical decisions",
        "Plan for 20% buffer time"
      ]
    },
    "analysis": {
      "domain": "Technical Scope Tracker",
      "dimensions": [
        {
          "name": "Scope Definition",
          "weight": 20,
          "description": "Clarity of technical boundaries"
        },
        {
          "name": "Architecture Planning",
          "weight": 20,
          "description": "Technical design quality"
        },
        {
          "name": "Risk Assessment",
          "weight": 20,
          "description": "Technical risk identification"
        },
        {
          "name": "Resource Planning",
          "weight": 20,
          "description": "Technical resource needs"
        },
        {
          "name": "Scalability Design",
          "weight": 20,
          "description": "Future-proofing considerations"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Unclear technical scope",
        "26-50": "Basic scope definition",
        "51-75": "Well-defined technical scope",
        "76-90": "Excellent scope management",
        "91-100": "Perfect scope optimization"
      }
    },
    "resources": {
      "domain": "Technical Scope Tracker",
      "templates": [
        "Technical Roadmap Template",
        "Sprint Planning Board",
        "Architecture Decision Record"
      ],
      "metrics": [
        "Story points completed",
        "Velocity trend",
        "Technical debt ratio",
        "Bug discovery rate"
      ]
    },
    "outputs": {
      "domain": "Technical Scope Tracker",
      "templates": [
        "Technical Roadmap Template",
        "Sprint Planning Board",
        "Architecture Decision Record"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "4-1"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "4-3": {
    "id": "4-3",
    "name": "Pilot Group Selection",
    "blockId": 4,
    "blockName": "Prototype Launch",
    "subId": 3,
    "phase": 2,
    "phaseName": "Product Market Fit",
    "category": "execution",
    "agent": {
      "name": "Pilot Group Selector",
      "key": "4c",
      "description": "Identifies and manages pilot customer groups",
      "domain": "Pilot Group Selection"
    },
    "education": {
      "title": "Pilot Group Selection",
      "what": "A systematic approach to pilot group selection that identifies and manages pilot customer groups. Evaluates selection criteria, group diversity, engagement level, feedback quality, success metrics to ensure excellence and continuous improvement in this critical capability.",
      "why": "The right pilot users can make or break your prototype. They need to be engaged enough to provide feedback but patient enough to work through issues.",
      "how": "\n      <h4>Selection Criteria:</h4>\n      <ul>\n        <li><strong>Problem Severity:</strong> Feel the pain acutely</li>\n        <li><strong>Innovation Appetite:</strong> Comfortable with new tools</li>\n        <li><strong>Feedback Quality:</strong> Articulate and constructive</li>\n        <li><strong>Availability:</strong> Time to test and communicate</li>\n        <li><strong>Influence:</strong> Can become references</li>\n      </ul>\n      \n      <h4>Recruitment Process:</h4>\n      <ol>\n        <li>Identify 20-30 candidates</li>\n        <li>Screen for fit and commitment</li>\n        <li>Select 5-10 pilot users</li>\n        <li>Set clear expectations</li>\n        <li>Define feedback channels</li>\n        <li>Offer incentives if needed</li>\n      </ol>\n    ",
      "examples": [
        "5 mid-market companies with dedicated champion",
        "3 power users from existing waitlist",
        "2 strategic partners willing to co-innovate"
      ],
      "keyMetrics": [
        {
          "value": "50%",
          "label": "Faster Time-to-Market",
          "description": "MVP launch speed"
        },
        {
          "value": "70%",
          "label": "Higher Quality",
          "description": "Structured vs ad-hoc approach"
        },
        {
          "value": "3x",
          "label": "Better Outcomes",
          "description": "Planned vs unplanned execution"
        },
        {
          "value": "45%",
          "label": "Lower Costs",
          "description": "Efficient execution"
        }
      ]
    },
    "workspace": {
      "domain": "Pilot Group Selection",
      "questions": [
        {
          "id": "4-3-q1",
          "text": "What is your current strategy for Pilot Group Selection?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Pilot Group Selection for ST6Co/ScaleOps6Product"
        },
        {
          "id": "4-3-q2",
          "text": "How do you measure success in Pilot Group Selection?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Pilot Group Selection for ST6Co/ScaleOps6Product"
        },
        {
          "id": "4-3-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Pilot Group Selection for ST6Co/ScaleOps6Product"
        },
        {
          "id": "4-3-q4",
          "text": "What specific evidence demonstrates your Pilot Group Selection effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "4-3-q5",
          "text": "What are your next steps to improve Pilot Group Selection?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "User Research Platforms (User Interviews, Respondent)",
        "Feedback Tools (Canny, UserVoice)",
        "Communication Tools (Slack, Discord)",
        "Survey Platforms (Typeform, Google Forms)"
      ],
      "templates": [
        "Pilot User Agreement",
        "Screening Questionnaire",
        "Feedback Collection Plan",
        "Pilot Success Criteria"
      ],
      "bestPractices": [
        "Screen for problem severity, not just interest",
        "Set clear expectations about prototype stage",
        "Create dedicated communication channel",
        "Offer meaningful incentives for participation"
      ]
    },
    "analysis": {
      "domain": "Pilot Group Selection",
      "dimensions": [
        {
          "name": "Selection Criteria",
          "weight": 20,
          "description": "Quality of pilot selection"
        },
        {
          "name": "Group Diversity",
          "weight": 20,
          "description": "Representative sample"
        },
        {
          "name": "Engagement Level",
          "weight": 20,
          "description": "Pilot group commitment"
        },
        {
          "name": "Feedback Quality",
          "weight": 20,
          "description": "Value of pilot feedback"
        },
        {
          "name": "Success Metrics",
          "weight": 20,
          "description": "Clear pilot success criteria"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No pilot group strategy",
        "26-50": "Basic pilot group identified",
        "51-75": "Good pilot program design",
        "76-90": "Strong pilot execution",
        "91-100": "World-class pilot program"
      }
    },
    "resources": {
      "domain": "Pilot Group Selection",
      "templates": [
        "Pilot User Agreement",
        "Screening Questionnaire",
        "Feedback Collection Plan"
      ],
      "metrics": [
        "Pilot user engagement rate",
        "Feedback volume and quality",
        "Feature request alignment",
        "Pilot-to-customer conversion"
      ]
    },
    "outputs": {
      "domain": "Pilot Group Selection",
      "templates": [
        "Pilot User Agreement",
        "Screening Questionnaire",
        "Feedback Collection Plan"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "4-2"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "4-4": {
    "id": "4-4",
    "name": "QA & Success Criteria",
    "blockId": 4,
    "blockName": "Prototype Launch",
    "subId": 4,
    "phase": 2,
    "phaseName": "Product Market Fit",
    "category": "execution",
    "agent": {
      "name": "QA Criteria Setter",
      "key": "4d",
      "description": "Establishes quality assurance standards and processes",
      "domain": "QA & Success Criteria"
    },
    "education": {
      "title": "QA & Success Criteria",
      "what": "A systematic approach to qa & success criteria that establishes quality assurance standards and processes. Evaluates quality standards, test coverage, automation level, bug management, release criteria to ensure excellence and continuous improvement in this critical capability.",
      "why": "Without clear success criteria, you'll never know when to ship or whether you're learning the right things. This prevents endless iteration without progress.",
      "how": "\n      <h4>Success Metrics:</h4>\n      <ul>\n        <li><strong>Functional:</strong> Core features work as intended</li>\n        <li><strong>Performance:</strong> Speed and reliability targets</li>\n        <li><strong>Usability:</strong> Users complete key tasks</li>\n        <li><strong>Business:</strong> Validation of core assumptions</li>\n        <li><strong>Technical:</strong> Code quality and stability</li>\n      </ul>\n      \n      <h4>QA Process:</h4>\n      <ol>\n        <li>Define test scenarios</li>\n        <li>Create acceptance criteria</li>\n        <li>Conduct internal testing</li>\n        <li>Run pilot user sessions</li>\n        <li>Track and fix critical bugs</li>\n        <li>Measure against success criteria</li>\n      </ol>\n    ",
      "examples": [
        "3 of 5 pilot users complete onboarding unassisted",
        "Core workflow completion rate >80%",
        "Zero critical bugs, <5 major bugs"
      ],
      "keyMetrics": [
        {
          "value": "50%",
          "label": "Faster Time-to-Market",
          "description": "MVP launch speed"
        },
        {
          "value": "70%",
          "label": "Higher Quality",
          "description": "Structured vs ad-hoc approach"
        },
        {
          "value": "3x",
          "label": "Better Outcomes",
          "description": "Planned vs unplanned execution"
        },
        {
          "value": "45%",
          "label": "Lower Costs",
          "description": "Efficient execution"
        }
      ]
    },
    "workspace": {
      "domain": "QA & Success Criteria",
      "questions": [
        {
          "id": "4-4-q1",
          "text": "What is your current strategy for QA & Success Criteria?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about QA & Success Criteria for ST6Co/ScaleOps6Product"
        },
        {
          "id": "4-4-q2",
          "text": "How do you measure success in QA & Success Criteria?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about QA & Success Criteria for ST6Co/ScaleOps6Product"
        },
        {
          "id": "4-4-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about QA & Success Criteria for ST6Co/ScaleOps6Product"
        },
        {
          "id": "4-4-q4",
          "text": "What specific evidence demonstrates your QA & Success Criteria effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "4-4-q5",
          "text": "What are your next steps to improve QA & Success Criteria?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Testing Tools (Selenium, Cypress)",
        "Bug Tracking (Jira, Linear)",
        "Analytics (Mixpanel, PostHog)",
        "User Testing (Maze, UserTesting)"
      ],
      "templates": [
        "QA Test Plan",
        "Success Criteria Checklist",
        "Bug Tracking Template",
        "Test Case Library"
      ],
      "bestPractices": [
        "Define success criteria before building",
        "Test with real users, not just internally",
        "Prioritize critical path testing",
        "Document all test results"
      ]
    },
    "analysis": {
      "domain": "QA & Success Criteria",
      "dimensions": [
        {
          "name": "Quality Standards",
          "weight": 20,
          "description": "Clear QA criteria defined"
        },
        {
          "name": "Test Coverage",
          "weight": 20,
          "description": "Comprehensiveness of testing"
        },
        {
          "name": "Automation Level",
          "weight": 20,
          "description": "Test automation implementation"
        },
        {
          "name": "Bug Management",
          "weight": 20,
          "description": "Issue tracking and resolution"
        },
        {
          "name": "Release Criteria",
          "weight": 20,
          "description": "Go/no-go decision framework"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No QA process",
        "26-50": "Basic testing in place",
        "51-75": "Good QA practices",
        "76-90": "Strong quality culture",
        "91-100": "World-class quality assurance"
      }
    },
    "resources": {
      "domain": "QA & Success Criteria",
      "templates": [
        "QA Test Plan",
        "Success Criteria Checklist",
        "Bug Tracking Template"
      ],
      "metrics": [
        "Test coverage percentage",
        "Bug discovery rate",
        "User task completion rate",
        "Time to value for users"
      ]
    },
    "outputs": {
      "domain": "QA & Success Criteria",
      "templates": [
        "QA Test Plan",
        "Success Criteria Checklist",
        "Bug Tracking Template"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "4-3"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "4-5": {
    "id": "4-5",
    "name": "Timeline GANTT or Roadmap",
    "blockId": 4,
    "blockName": "Prototype Launch",
    "subId": 5,
    "phase": 2,
    "phaseName": "Product Market Fit",
    "category": "execution",
    "agent": {
      "name": "Timeline Planner",
      "key": "4e",
      "description": "Creates and manages project timelines",
      "domain": "Timeline GANTT or Roadmap"
    },
    "education": {
      "title": "Timeline GANTT or Roadmap",
      "what": "A visual timeline showing the build and launch phases of your prototype, including dependencies, milestones, and resource allocation.",
      "why": "Prototypes often drift without clear timelines. A visual roadmap keeps the team aligned, stakeholders informed, and momentum maintained.",
      "how": "\n      <h4>Roadmap Elements:</h4>\n      <ul>\n        <li><strong>Phases:</strong> Design, Build, Test, Launch</li>\n        <li><strong>Milestones:</strong> Key deliverables and decisions</li>\n        <li><strong>Dependencies:</strong> Blocking relationships</li>\n        <li><strong>Resources:</strong> Team allocation</li>\n        <li><strong>Buffer Time:</strong> Risk mitigation</li>\n      </ul>\n      \n      <h4>Creation Process:</h4>\n      <ol>\n        <li>List all major tasks</li>\n        <li>Estimate durations</li>\n        <li>Identify dependencies</li>\n        <li>Assign resources</li>\n        <li>Add buffer for unknowns</li>\n        <li>Review with stakeholders</li>\n      </ol>\n    ",
      "examples": [
        "6-week prototype: 2 weeks design, 3 weeks build, 1 week test",
        "Key milestone: Week 4 - First user test",
        "Launch date: March 15 with 5 pilot customers"
      ],
      "keyMetrics": [
        {
          "value": "50%",
          "label": "Faster Time-to-Market",
          "description": "MVP launch speed"
        },
        {
          "value": "70%",
          "label": "Higher Quality",
          "description": "Structured vs ad-hoc approach"
        },
        {
          "value": "3x",
          "label": "Better Outcomes",
          "description": "Planned vs unplanned execution"
        },
        {
          "value": "45%",
          "label": "Lower Costs",
          "description": "Efficient execution"
        }
      ]
    },
    "workspace": {
      "domain": "Timeline GANTT or Roadmap",
      "questions": [
        {
          "id": "4-5-q1",
          "text": "What is your current strategy for Timeline GANTT or Roadmap?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Timeline GANTT or Roadmap for ST6Co/ScaleOps6Product"
        },
        {
          "id": "4-5-q2",
          "text": "How do you measure success in Timeline GANTT or Roadmap?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Timeline GANTT or Roadmap for ST6Co/ScaleOps6Product"
        },
        {
          "id": "4-5-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Timeline GANTT or Roadmap for ST6Co/ScaleOps6Product"
        },
        {
          "id": "4-5-q4",
          "text": "What specific evidence demonstrates your Timeline GANTT or Roadmap effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "4-5-q5",
          "text": "What are your next steps to improve Timeline GANTT or Roadmap?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Project Management (Asana, Monday.com)",
        "Gantt Tools (TeamGantt, MS Project)",
        "Roadmap Software (ProductPlan, Roadmunk)",
        "Time Tracking (Toggl, Harvest)"
      ],
      "templates": [
        "Gantt Chart Template",
        "Agile Roadmap Canvas",
        "Milestone Tracker",
        "Resource Allocation Matrix"
      ],
      "bestPractices": [
        "Build in buffer time for unknowns",
        "Identify critical path early",
        "Update timeline weekly",
        "Communicate delays immediately"
      ]
    },
    "analysis": {
      "domain": "Timeline GANTT or Roadmap",
      "dimensions": [
        {
          "name": "Timeline Realism",
          "weight": 20,
          "description": "Achievability of timelines"
        },
        {
          "name": "Milestone Definition",
          "weight": 20,
          "description": "Clear milestone criteria"
        },
        {
          "name": "Buffer Management",
          "weight": 20,
          "description": "Risk buffer allocation"
        },
        {
          "name": "Progress Tracking",
          "weight": 20,
          "description": "Timeline monitoring"
        },
        {
          "name": "Adjustment Agility",
          "weight": 20,
          "description": "Timeline flexibility"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Unrealistic or no timeline",
        "26-50": "Basic timeline exists",
        "51-75": "Good timeline management",
        "76-90": "Excellent project planning",
        "91-100": "Perfect timeline execution"
      }
    },
    "resources": {
      "domain": "Timeline GANTT or Roadmap",
      "templates": [
        "Gantt Chart Template",
        "Agile Roadmap Canvas",
        "Milestone Tracker"
      ],
      "metrics": [
        "On-time delivery rate",
        "Milestone completion",
        "Schedule variance",
        "Resource utilization"
      ]
    },
    "outputs": {
      "domain": "Timeline GANTT or Roadmap",
      "templates": [
        "Gantt Chart Template",
        "Agile Roadmap Canvas",
        "Milestone Tracker"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "4-4"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "4-6": {
    "id": "4-6",
    "name": "Post-Mortem Template",
    "blockId": 4,
    "blockName": "Prototype Launch",
    "subId": 6,
    "phase": 2,
    "phaseName": "Product Market Fit",
    "category": "execution",
    "agent": {
      "name": "Post-Mortem Analyst",
      "key": "4f",
      "description": "Conducts thorough post-launch analysis",
      "domain": "Post-Mortem Template"
    },
    "education": {
      "title": "Post-Mortem Template",
      "what": "A systematic approach to post-mortem template that conducts thorough post-launch analysis. Evaluates data collection, root cause analysis, success measurement, lesson documentation, action planning to ensure excellence and continuous improvement in this critical capability.",
      "why": "The prototype's value isn't the code—it's the learning. A good post-mortem extracts maximum insight from the experiment to guide future decisions.",
      "how": "\n      <h4>Post-Mortem Sections:</h4>\n      <ul>\n        <li><strong>Objectives Review:</strong> What we set out to learn</li>\n        <li><strong>Results Summary:</strong> What actually happened</li>\n        <li><strong>Validated Learning:</strong> Confirmed assumptions</li>\n        <li><strong>Invalidated Assumptions:</strong> What we got wrong</li>\n        <li><strong>Surprises:</strong> Unexpected discoveries</li>\n        <li><strong>Next Steps:</strong> Decisions and actions</li>\n      </ul>\n      \n      <h4>Facilitation Process:</h4>\n      <ol>\n        <li>Schedule within 1 week of completion</li>\n        <li>Include all stakeholders</li>\n        <li>Review data objectively</li>\n        <li>Encourage honest discussion</li>\n        <li>Document all insights</li>\n        <li>Define clear next actions</li>\n      </ol>\n    ",
      "examples": [
        "Validated: Users will pay for automation (3 of 5 committed)",
        "Invalidated: Self-serve onboarding too complex",
        "Surprise: Integration needs more important than expected"
      ],
      "keyMetrics": [
        {
          "value": "50%",
          "label": "Faster Time-to-Market",
          "description": "MVP launch speed"
        },
        {
          "value": "70%",
          "label": "Higher Quality",
          "description": "Structured vs ad-hoc approach"
        },
        {
          "value": "3x",
          "label": "Better Outcomes",
          "description": "Planned vs unplanned execution"
        },
        {
          "value": "45%",
          "label": "Lower Costs",
          "description": "Efficient execution"
        }
      ]
    },
    "workspace": {
      "domain": "Post-Mortem Template",
      "questions": [
        {
          "id": "4-6-q1",
          "text": "What is your current strategy for Post-Mortem Template?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Post-Mortem Template for ST6Co/ScaleOps6Product"
        },
        {
          "id": "4-6-q2",
          "text": "How do you measure success in Post-Mortem Template?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Post-Mortem Template for ST6Co/ScaleOps6Product"
        },
        {
          "id": "4-6-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Post-Mortem Template for ST6Co/ScaleOps6Product"
        },
        {
          "id": "4-6-q4",
          "text": "What specific evidence demonstrates your Post-Mortem Template effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "4-6-q5",
          "text": "What are your next steps to improve Post-Mortem Template?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Documentation (Notion, Confluence)",
        "Survey Tools (Typeform, Google Forms)",
        "Analytics (Mixpanel, Amplitude)",
        "Collaboration (Miro, FigJam)"
      ],
      "templates": [
        "Post-Mortem Agenda",
        "Learning Canvas",
        "Decision Log Template",
        "Assumption Tracker"
      ],
      "bestPractices": [
        "Schedule post-mortem before launch completes",
        "Include all stakeholders, even skeptics",
        "Focus on learning, not blame",
        "Share findings publicly with team"
      ]
    },
    "analysis": {
      "domain": "Post-Mortem Template",
      "dimensions": [
        {
          "name": "Data Collection",
          "weight": 20,
          "description": "Comprehensiveness of data"
        },
        {
          "name": "Root Cause Analysis",
          "weight": 20,
          "description": "Depth of problem analysis"
        },
        {
          "name": "Success Measurement",
          "weight": 20,
          "description": "Achievement vs. goals"
        },
        {
          "name": "Lesson Documentation",
          "weight": 20,
          "description": "Quality of learnings"
        },
        {
          "name": "Action Planning",
          "weight": 20,
          "description": "Clear improvement actions"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No post-mortem process",
        "26-50": "Basic review conducted",
        "51-75": "Good analysis practice",
        "76-90": "Strong learning culture",
        "91-100": "Continuous improvement excellence"
      }
    },
    "resources": {
      "domain": "Post-Mortem Template",
      "templates": [
        "Post-Mortem Agenda",
        "Learning Canvas",
        "Decision Log Template"
      ],
      "metrics": [
        "Assumptions validated/invalidated",
        "Learning velocity",
        "Decision confidence increase",
        "Time to next iteration"
      ]
    },
    "outputs": {
      "domain": "Post-Mortem Template",
      "templates": [
        "Post-Mortem Agenda",
        "Learning Canvas",
        "Decision Log Template"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "4-5"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "5-1": {
    "id": "5-1",
    "name": "GTM Messaging Framework",
    "blockId": 5,
    "blockName": "Go-To-Market Strategy",
    "subId": 1,
    "phase": 3,
    "phaseName": "Go-To Market",
    "category": "gtm",
    "agent": {
      "name": "GTMMessagingAgent",
      "key": "5a",
      "description": "Validates and documents early customer wins",
      "domain": "GTM Messaging Framework"
    },
    "education": {
      "title": "GTM Messaging Framework",
      "what": "A structured gtm messaging framework that provides clear guidelines and methodologies for validates and documents early customer wins. Focuses on win definition, value quantification, repeatability, customer satisfaction, reference potential to ensure comprehensive coverage and measurable outcomes.",
      "why": "Investors and future customers want proof that others like them are already winning with your solution. A well-crafted case study builds trust, closes deals, and reinforces your GTM narrative.",
      "how": "\n      <h4>Case Study Structure:</h4>\n      <ol>\n        <li><strong>Customer Profile:</strong> Company, industry, size, role</li>\n        <li><strong>Challenge:</strong> Specific problem they faced</li>\n        <li><strong>Solution:</strong> How your product addressed it</li>\n        <li><strong>Implementation:</strong> Timeline and process</li>\n        <li><strong>Results:</strong> Quantified outcomes and benefits</li>\n        <li><strong>Future:</strong> Expansion plans or next steps</li>\n      </ol>\n      \n      <h4>Data Collection Process:</h4>\n      <ul>\n        <li>Interview customer 60-90 days post-implementation</li>\n        <li>Gather specific metrics and KPIs</li>\n        <li>Document workflow changes</li>\n        <li>Collect powerful quotes</li>\n        <li>Get approval for public use</li>\n      </ul>\n      \n      <h4>Distribution Strategy:</h4>\n      <ul>\n        <li>Create PDF and web versions</li>\n        <li>Extract quotes for sales decks</li>\n        <li>Share in sales conversations</li>\n        <li>Feature on website and social</li>\n        <li>Include in investor updates</li>\n      </ul>\n    ",
      "examples": [
        "TechCorp reduced onboarding time by 67% in 30 days",
        "StartupXYZ achieved 3.2x ROI within first quarter",
        "Enterprise ABC scaled from 10 to 100 users seamlessly"
      ],
      "keyMetrics": [
        {
          "value": "2.5x",
          "label": "Higher Conversion",
          "description": "GTM-optimized messaging"
        },
        {
          "value": "60%",
          "label": "Faster Sales Cycles",
          "description": "Clear positioning impact"
        },
        {
          "value": "40%",
          "label": "Lower CAC",
          "description": "Efficient go-to-market"
        },
        {
          "value": "3.2x",
          "label": "Better Win Rates",
          "description": "Strategic GTM execution"
        }
      ]
    },
    "workspace": {
      "domain": "GTM Messaging Framework",
      "questions": [
        {
          "id": "5-1-q1",
          "text": "What challenges do you face in documenting customer GTM Messaging Framework effectively?",
          "type": "diagnostic",
          "required": true,
          "hint": "Describe difficulties in getting customer participation, quantifying results, or creating compelling narratives.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "5-1-q2",
          "text": "How many GTM Messaging Framework have you completed and what is their average impact on sales?",
          "type": "quantitative",
          "required": true,
          "hint": "Provide number of case studies, usage in sales cycles, and influence on close rates.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "5-1-q3",
          "text": "How do GTM Messaging Framework support your overall go-to-market strategy?",
          "type": "strategic",
          "required": true,
          "hint": "Explain how case studies enable sales, marketing, and customer success efforts.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "5-1-q4",
          "text": "What evidence shows your GTM Messaging Framework resonate with prospects?",
          "type": "validation",
          "required": false,
          "hint": "Share engagement metrics, sales feedback, or prospect responses to case studies.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "5-1-q5",
          "text": "How do you select which customers to feature in GTM Messaging Framework?",
          "type": "strategic",
          "required": false,
          "hint": "Describe criteria for customer selection based on impact, industry, or use case.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "5-1-q6",
          "text": "What formats and channels maximize case study effectiveness?",
          "type": "comparative",
          "required": false,
          "hint": "Compare written, video, and interactive formats across different channels.",
          "minLength": 100,
          "maxLength": 1000
        }
      ],
      "tools": [
        "Content Management (WordPress, Webflow)",
        "Design Tools (Canva, Figma)",
        "Video Recording (Loom, Vidyard)",
        "Analytics (Google Analytics, Hotjar)"
      ],
      "templates": [
        "Case Study Interview Script",
        "Case Study Template",
        "ROI Calculator Framework",
        "Customer Success Story Format"
      ],
      "bestPractices": [
        "Interview customers at their peak happiness",
        "Get specific numbers and percentages",
        "Include screenshots and visuals",
        "Always get written permission to publish"
      ]
    },
    "analysis": {
      "domain": "GTM Messaging Framework",
      "dimensions": [
        {
          "name": "Win Definition",
          "weight": 20,
          "description": "Clear success criteria"
        },
        {
          "name": "Value Quantification",
          "weight": 20,
          "description": "Measurable customer value"
        },
        {
          "name": "Repeatability",
          "weight": 20,
          "description": "Ability to replicate wins"
        },
        {
          "name": "Customer Satisfaction",
          "weight": 20,
          "description": "Customer happiness metrics"
        },
        {
          "name": "Reference Potential",
          "weight": 20,
          "description": "Willingness to advocate"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No clear wins documented",
        "26-50": "Some wins but poorly defined",
        "51-75": "Good win documentation",
        "76-90": "Strong win validation",
        "91-100": "Exceptional win portfolio"
      }
    },
    "resources": {
      "domain": "GTM Messaging Framework",
      "templates": [
        "Messaging Framework Canvas",
        "Value Proposition Template",
        "Positioning Statement Builder"
      ],
      "metrics": [
        "Time to value achieved",
        "ROI percentage",
        "Usage growth rate",
        "Customer satisfaction score"
      ]
    },
    "outputs": {
      "domain": "GTM Messaging Framework",
      "templates": [
        "Messaging Framework Canvas",
        "Value Proposition Template",
        "Positioning Statement Builder"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "5-2": {
    "id": "5-2",
    "name": "Sales Enablement Assets",
    "blockId": 5,
    "blockName": "Go-To-Market Strategy",
    "subId": 2,
    "phase": 3,
    "phaseName": "Go-To Market",
    "category": "gtm",
    "agent": {
      "name": "SalesEnablementAgent",
      "key": "5b",
      "description": "Calculates and validates customer ROI",
      "domain": "Sales Enablement Assets"
    },
    "education": {
      "title": "Sales Enablement Assets",
      "what": "A systematic approach to sales enablement assets that calculates and validates customer roi. Evaluates calculation methodology, data accuracy, time to value, cost completeness, benefit validation to ensure excellence and continuous improvement in this critical capability.",
      "why": "Many buyers, especially in B2B, require a financial justification to get budget approval. An ROI calculator translates value from conceptual to measurable.",
      "how": "\n      <h4>ROI Components:</h4>\n      <ul>\n        <li><strong>Time Savings:</strong> Hours saved × hourly rate</li>\n        <li><strong>Cost Reduction:</strong> Eliminated tools, reduced errors</li>\n        <li><strong>Revenue Impact:</strong> Increased conversion, faster sales</li>\n        <li><strong>Risk Mitigation:</strong> Compliance, security, downtime</li>\n        <li><strong>Productivity Gains:</strong> More output, better quality</li>\n      </ul>\n      \n      <h4>Calculator Design:</h4>\n      <ol>\n        <li>Create input fields for customer-specific data</li>\n        <li>Use conservative assumptions</li>\n        <li>Show monthly and annual impact</li>\n        <li>Calculate payback period</li>\n        <li>Compare to alternative solutions</li>\n        <li>Visualize results clearly</li>\n      </ol>\n      \n      <h4>Customization Strategy:</h4>\n      <ul>\n        <li>Build versions for each persona</li>\n        <li>Adjust for company size</li>\n        <li>Include industry benchmarks</li>\n        <li>Allow sensitivity analysis</li>\n        <li>Export as PDF for sharing</li>\n      </ul>\n    ",
      "examples": [
        "HR Manager: Save 15 hours/week = $45,000/year",
        "Sales Team: 20% faster close rate = $2M additional revenue",
        "IT Department: 50% fewer tickets = 2 FTEs redeployed"
      ],
      "keyMetrics": [
        {
          "value": "2.5x",
          "label": "Higher Conversion",
          "description": "GTM-optimized messaging"
        },
        {
          "value": "60%",
          "label": "Faster Sales Cycles",
          "description": "Clear positioning impact"
        },
        {
          "value": "40%",
          "label": "Lower CAC",
          "description": "Efficient go-to-market"
        },
        {
          "value": "3.2x",
          "label": "Better Win Rates",
          "description": "Strategic GTM execution"
        }
      ]
    },
    "workspace": {
      "domain": "Sales Enablement Assets",
      "questions": [
        {
          "id": "5-2-q1",
          "text": "What is your current strategy for Sales Enablement Assets Assets?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Sales Enablement Assets Assets for ST6Co/ScaleOps6Product"
        },
        {
          "id": "5-2-q2",
          "text": "How do you measure success in Sales Enablement Assets Assets?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Sales Enablement Assets Assets for ST6Co/ScaleOps6Product"
        },
        {
          "id": "5-2-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Sales Enablement Assets Assets for ST6Co/ScaleOps6Product"
        },
        {
          "id": "5-2-q4",
          "text": "How does this support your go-to-market approach?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "5-2-q5",
          "text": "What specific evidence demonstrates your Sales Enablement Assets Assets effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "5-2-q6",
          "text": "What are your next steps to improve Sales Enablement Assets Assets?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Spreadsheet Tools (Excel, Google Sheets)",
        "Calculator Builders (Outgrow, Calculoid)",
        "Data Visualization (Tableau, PowerBI)",
        "Interactive Tools (Typeform, Jotform)"
      ],
      "templates": [
        "ROI Calculator Spreadsheet",
        "Value Realization Framework",
        "Business Case Template",
        "TCO Comparison Model"
      ],
      "bestPractices": [
        "Use conservative estimates to build trust",
        "Allow prospects to input their own data",
        "Show calculations transparently",
        "Include industry benchmarks for context"
      ]
    },
    "analysis": {
      "domain": "Sales Enablement Assets",
      "dimensions": [
        {
          "name": "Calculation Methodology",
          "weight": 20,
          "description": "ROI calculation rigor"
        },
        {
          "name": "Data Accuracy",
          "weight": 20,
          "description": "Quality of input data"
        },
        {
          "name": "Time to Value",
          "weight": 20,
          "description": "Speed of value realization"
        },
        {
          "name": "Cost Completeness",
          "weight": 20,
          "description": "Total cost consideration"
        },
        {
          "name": "Benefit Validation",
          "weight": 20,
          "description": "Verified benefit achievement"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No ROI calculation",
        "26-50": "Basic ROI estimates",
        "51-75": "Good ROI analysis",
        "76-90": "Strong ROI validation",
        "91-100": "Bulletproof ROI proof"
      }
    },
    "resources": {
      "domain": "Sales Enablement Assets",
      "templates": [
        "Sales Deck Template",
        "Battle Cards",
        "Objection Handling Guide"
      ],
      "metrics": [
        "Payback period (months)",
        "Annual ROI percentage",
        "Total cost savings",
        "Revenue impact"
      ]
    },
    "outputs": {
      "domain": "Sales Enablement Assets",
      "templates": [
        "Sales Deck Template",
        "Battle Cards",
        "Objection Handling Guide"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "5-1"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "5-3": {
    "id": "5-3",
    "name": "Pricing & Packaging Strategy",
    "blockId": 5,
    "blockName": "Go-To-Market Strategy",
    "subId": 3,
    "phase": 3,
    "phaseName": "Go-To Market",
    "category": "gtm",
    "agent": {
      "name": "PricingPackagingAgent",
      "key": "5c",
      "description": "Analyzes successful use case implementations",
      "domain": "Pricing & Packaging Strategy"
    },
    "education": {
      "title": "Pricing & Packaging Strategy",
      "what": "A strategic approach to pricing & packaging strategy that aligns organizational efforts with business objectives. Encompasses use case documentation, success metrics, implementation process, lessons learned, scalability assessment to drive systematic execution and measurable results.",
      "why": "References close deals 2x faster and at 30% higher win rates. They're your most credible sales asset.",
      "how": "\n      <h4>Program Components:</h4>\n      <ul>\n        <li><strong>Identification:</strong> Find your happiest, most successful customers</li>\n        <li><strong>Cultivation:</strong> Build deeper relationships with champions</li>\n        <li><strong>Activation:</strong> Make it easy for them to refer</li>\n        <li><strong>Recognition:</strong> Reward and celebrate advocates</li>\n        <li><strong>Management:</strong> Track and optimize program performance</li>\n      </ul>\n    ",
      "examples": [
        "Quarterly customer spotlight with $500 donation to charity of choice",
        "VIP access to product roadmap and executive team",
        "Co-marketing opportunities and speaking slots"
      ],
      "keyMetrics": [
        {
          "value": "2.5x",
          "label": "Higher Conversion",
          "description": "GTM-optimized messaging"
        },
        {
          "value": "60%",
          "label": "Faster Sales Cycles",
          "description": "Clear positioning impact"
        },
        {
          "value": "40%",
          "label": "Lower CAC",
          "description": "Efficient go-to-market"
        },
        {
          "value": "3.2x",
          "label": "Better Win Rates",
          "description": "Strategic GTM execution"
        }
      ]
    },
    "workspace": {
      "domain": "Pricing & Packaging Strategy",
      "questions": [
        {
          "id": "5-3-q1",
          "text": "What is your current strategy for Pricing & Packaging Strategy?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Pricing & Packaging Strategy for ST6Co/ScaleOps6Product"
        },
        {
          "id": "5-3-q2",
          "text": "How do you measure success in Pricing & Packaging Strategy?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Pricing & Packaging Strategy for ST6Co/ScaleOps6Product"
        },
        {
          "id": "5-3-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Pricing & Packaging Strategy for ST6Co/ScaleOps6Product"
        },
        {
          "id": "5-3-q4",
          "text": "How does this support your go-to-market approach?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "5-3-q5",
          "text": "What specific evidence demonstrates your Pricing & Packaging Strategy effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "5-3-q6",
          "text": "What are your next steps to improve Pricing & Packaging Strategy?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [],
      "templates": [
        "Referral Program Framework",
        "Customer Advocacy Playbook",
        "Reference Customer Agreement"
      ],
      "bestPractices": []
    },
    "analysis": {
      "domain": "Pricing & Packaging Strategy",
      "dimensions": [
        {
          "name": "Use Case Documentation",
          "weight": 20,
          "description": "Quality of documentation"
        },
        {
          "name": "Success Metrics",
          "weight": 20,
          "description": "Clear success indicators"
        },
        {
          "name": "Implementation Process",
          "weight": 20,
          "description": "Reproducible process"
        },
        {
          "name": "Lessons Learned",
          "weight": 20,
          "description": "Insights from implementation"
        },
        {
          "name": "Scalability Assessment",
          "weight": 20,
          "description": "Ability to scale use case"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Poor use case analysis",
        "26-50": "Basic use case review",
        "51-75": "Good use case studies",
        "76-90": "Strong use case portfolio",
        "91-100": "Best-in-class use cases"
      }
    },
    "resources": {
      "domain": "Pricing & Packaging Strategy",
      "templates": [
        "Pricing Model Calculator",
        "Packaging Matrix",
        "Competitive Pricing Analysis"
      ],
      "metrics": [
        "Number of active references",
        "Reference utilization rate",
        "Deals influenced by references",
        "Reference-to-close rate"
      ]
    },
    "outputs": {
      "domain": "Pricing & Packaging Strategy",
      "templates": [
        "Pricing Model Calculator",
        "Packaging Matrix",
        "Competitive Pricing Analysis"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "5-2"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "5-4": {
    "id": "5-4",
    "name": "Channel Partner Strategy",
    "blockId": 5,
    "blockName": "Go-To-Market Strategy",
    "subId": 4,
    "phase": 3,
    "phaseName": "Go-To Market",
    "category": "gtm",
    "agent": {
      "name": "ChannelPartnerAgent",
      "key": "5d",
      "description": "Collects and optimizes customer testimonials",
      "domain": "Channel Partner Strategy"
    },
    "education": {
      "title": "Channel Partner Strategy",
      "what": "A strategic approach to channel partner strategy that aligns organizational efforts with business objectives. Encompasses testimonial quality, customer diversity, specificity, media variety, usage rights to drive systematic execution and measurable results.",
      "why": "92% of buyers read reviews before purchasing. Social proof reduces perceived risk and accelerates decision-making.",
      "how": "\n      <h4>Collection Methods:</h4>\n      <ul>\n        <li><strong>Testimonials:</strong> Written or video endorsements</li>\n        <li><strong>Case Studies:</strong> Detailed success stories</li>\n        <li><strong>Reviews:</strong> Third-party platform ratings</li>\n        <li><strong>Logos:</strong> Customer brand recognition</li>\n        <li><strong>Metrics:</strong> Aggregate success statistics</li>\n      </ul>\n    ",
      "examples": [
        "Wall of Love with 50+ customer quotes on homepage",
        "4.8/5 star rating on G2 with 200+ reviews",
        "Customer success metrics: 10,000+ users, 99.9% uptime"
      ],
      "keyMetrics": [
        {
          "value": "2.5x",
          "label": "Higher Conversion",
          "description": "GTM-optimized messaging"
        },
        {
          "value": "60%",
          "label": "Faster Sales Cycles",
          "description": "Clear positioning impact"
        },
        {
          "value": "40%",
          "label": "Lower CAC",
          "description": "Efficient go-to-market"
        },
        {
          "value": "3.2x",
          "label": "Better Win Rates",
          "description": "Strategic GTM execution"
        }
      ]
    },
    "workspace": {
      "domain": "Channel Partner Strategy",
      "questions": [
        {
          "id": "5-4-q1",
          "text": "What is your current strategy for Channel Partner Strategy?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Channel Partner Strategy for ST6Co/ScaleOps6Product"
        },
        {
          "id": "5-4-q2",
          "text": "How do you measure success in Channel Partner Strategy?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Channel Partner Strategy for ST6Co/ScaleOps6Product"
        },
        {
          "id": "5-4-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Channel Partner Strategy for ST6Co/ScaleOps6Product"
        },
        {
          "id": "5-4-q4",
          "text": "How does this support your go-to-market approach?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "5-4-q5",
          "text": "What specific evidence demonstrates your Channel Partner Strategy effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "5-4-q6",
          "text": "What are your next steps to improve Channel Partner Strategy?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [],
      "templates": [
        "Testimonial Collection Guide",
        "Social Proof Library",
        "Success Story Template"
      ],
      "bestPractices": []
    },
    "analysis": {
      "domain": "Channel Partner Strategy",
      "dimensions": [
        {
          "name": "Testimonial Quality",
          "weight": 20,
          "description": "Impact and authenticity"
        },
        {
          "name": "Customer Diversity",
          "weight": 20,
          "description": "Range of customer types"
        },
        {
          "name": "Specificity",
          "weight": 20,
          "description": "Concrete results mentioned"
        },
        {
          "name": "Media Variety",
          "weight": 20,
          "description": "Written, video, case studies"
        },
        {
          "name": "Usage Rights",
          "weight": 20,
          "description": "Permission for marketing use"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No testimonials collected",
        "26-50": "Few generic testimonials",
        "51-75": "Good testimonial collection",
        "76-90": "Strong testimonial portfolio",
        "91-100": "Powerful advocacy library"
      }
    },
    "resources": {
      "domain": "Channel Partner Strategy",
      "templates": [
        "Partner Program Framework",
        "Channel Economics Model",
        "Partner Enablement Kit"
      ],
      "metrics": [
        "Number of testimonials collected",
        "Review platform ratings",
        "Social proof conversion impact",
        "Content freshness score"
      ]
    },
    "outputs": {
      "domain": "Channel Partner Strategy",
      "templates": [
        "Partner Program Framework",
        "Channel Economics Model",
        "Partner Enablement Kit"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "5-3"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "5-5": {
    "id": "5-5",
    "name": "Competitive Positioning",
    "blockId": 5,
    "blockName": "Go-To-Market Strategy",
    "subId": 5,
    "phase": 3,
    "phaseName": "Go-To Market",
    "category": "gtm",
    "agent": {
      "name": "CompetitivePositioningAgent",
      "key": "5e",
      "description": "Maps and tracks win criteria across customers",
      "domain": "Competitive Positioning"
    },
    "education": {
      "title": "Competitive Positioning",
      "what": "A systematic approach to competitive positioning that maps and tracks win criteria across customers. Evaluates criteria definition, pattern recognition, predictive ability, criteria evolution, team alignment to ensure excellence and continuous improvement in this critical capability.",
      "why": "Pilots de-risk product launches, generate early proof points, and create invested champions before general availability.",
      "how": "\n      <h4>Pilot Structure:</h4>\n      <ul>\n        <li><strong>Selection:</strong> Choose ideal early adopters</li>\n        <li><strong>Onboarding:</strong> High-touch setup and training</li>\n        <li><strong>Support:</strong> Dedicated success resources</li>\n        <li><strong>Feedback:</strong> Regular check-ins and surveys</li>\n        <li><strong>Graduation:</strong> Convert to paying customers</li>\n      </ul>\n    ",
      "examples": [
        "30-day pilot with 5 enterprise customers, 80% conversion",
        "Beta program with 100 users, weekly feedback sessions",
        "Design partner program with 3 strategic accounts"
      ],
      "keyMetrics": [
        {
          "value": "2.5x",
          "label": "Higher Conversion",
          "description": "GTM-optimized messaging"
        },
        {
          "value": "60%",
          "label": "Faster Sales Cycles",
          "description": "Clear positioning impact"
        },
        {
          "value": "40%",
          "label": "Lower CAC",
          "description": "Efficient go-to-market"
        },
        {
          "value": "3.2x",
          "label": "Better Win Rates",
          "description": "Strategic GTM execution"
        }
      ]
    },
    "workspace": {
      "domain": "Competitive Positioning",
      "questions": [
        {
          "id": "5-5-q1",
          "text": "What is your current strategy for Competitive Positioning?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Competitive Positioning for ST6Co/ScaleOps6Product"
        },
        {
          "id": "5-5-q2",
          "text": "How do you measure success in Competitive Positioning?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Competitive Positioning for ST6Co/ScaleOps6Product"
        },
        {
          "id": "5-5-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Competitive Positioning for ST6Co/ScaleOps6Product"
        },
        {
          "id": "5-5-q4",
          "text": "How does this support your go-to-market approach?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "5-5-q5",
          "text": "What specific evidence demonstrates your Competitive Positioning effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "5-5-q6",
          "text": "What are your next steps to improve Competitive Positioning?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [],
      "templates": [
        "Pilot Program Structure",
        "Beta Testing Agreement",
        "Early Adopter Onboarding Kit"
      ],
      "bestPractices": []
    },
    "analysis": {
      "domain": "Competitive Positioning",
      "dimensions": [
        {
          "name": "Criteria Definition",
          "weight": 20,
          "description": "Clear win criteria"
        },
        {
          "name": "Pattern Recognition",
          "weight": 20,
          "description": "Common success patterns"
        },
        {
          "name": "Predictive Ability",
          "weight": 20,
          "description": "Ability to predict wins"
        },
        {
          "name": "Criteria Evolution",
          "weight": 20,
          "description": "Refinement over time"
        },
        {
          "name": "Team Alignment",
          "weight": 20,
          "description": "Shared understanding of wins"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No win criteria defined",
        "26-50": "Basic win understanding",
        "51-75": "Good win criteria mapping",
        "76-90": "Strong win prediction",
        "91-100": "Win science mastery"
      }
    },
    "resources": {
      "domain": "Competitive Positioning",
      "templates": [
        "Competitive Matrix",
        "Differentiation Canvas",
        "Win/Loss Analysis Template"
      ],
      "metrics": [
        "Pilot-to-customer conversion rate",
        "Time to value in pilot",
        "Feature requests per pilot",
        "NPS of pilot participants"
      ]
    },
    "outputs": {
      "domain": "Competitive Positioning",
      "templates": [
        "Competitive Matrix",
        "Differentiation Canvas",
        "Win/Loss Analysis Template"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "5-4"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "5-6": {
    "id": "5-6",
    "name": "Launch Planning & Execution",
    "blockId": 5,
    "blockName": "Go-To-Market Strategy",
    "subId": 6,
    "phase": 3,
    "phaseName": "Go-To Market",
    "category": "gtm",
    "agent": {
      "name": "LaunchPlanningAgent",
      "key": "5f",
      "description": "Conducts thorough deal debriefs and analysis",
      "domain": "Launch Planning & Execution"
    },
    "education": {
      "title": "Launch Planning & Execution",
      "what": "A strategic approach to launch planning & execution that aligns organizational efforts with business objectives. Encompasses debrief process, stakeholder input, success factors, improvement areas, knowledge transfer to drive systematic execution and measurable results.",
      "why": "Customer-driven development reduces feature failure rates by 60% and increases retention by 25%.",
      "how": "\n      <h4>Integration Process:</h4>\n      <ul>\n        <li><strong>Collection:</strong> Multiple feedback channels</li>\n        <li><strong>Categorization:</strong> Theme and priority tagging</li>\n        <li><strong>Prioritization:</strong> Impact vs effort scoring</li>\n        <li><strong>Communication:</strong> Close the loop with customers</li>\n        <li><strong>Measurement:</strong> Track implementation impact</li>\n      </ul>\n    ",
      "examples": [
        "Monthly feature voting with top 3 added to roadmap",
        "Customer advisory board quarterly input sessions",
        "Public roadmap with customer request tracking"
      ],
      "keyMetrics": [
        {
          "value": "2.5x",
          "label": "Higher Conversion",
          "description": "GTM-optimized messaging"
        },
        {
          "value": "60%",
          "label": "Faster Sales Cycles",
          "description": "Clear positioning impact"
        },
        {
          "value": "40%",
          "label": "Lower CAC",
          "description": "Efficient go-to-market"
        },
        {
          "value": "3.2x",
          "label": "Better Win Rates",
          "description": "Strategic GTM execution"
        }
      ]
    },
    "workspace": {
      "domain": "Launch Planning & Execution",
      "questions": [
        {
          "id": "5-6-q1",
          "text": "What is your current strategy for Launch Planning & Execution?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Launch Planning & Execution for ST6Co/ScaleOps6Product"
        },
        {
          "id": "5-6-q2",
          "text": "How do you measure success in Launch Planning & Execution?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Launch Planning & Execution for ST6Co/ScaleOps6Product"
        },
        {
          "id": "5-6-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Launch Planning & Execution for ST6Co/ScaleOps6Product"
        },
        {
          "id": "5-6-q4",
          "text": "How does this support your go-to-market approach?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "5-6-q5",
          "text": "What specific evidence demonstrates your Launch Planning & Execution effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "5-6-q6",
          "text": "What are your next steps to improve Launch Planning & Execution?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [],
      "templates": [
        "Feedback Loop Framework",
        "Product Council Charter",
        "Feature Request Tracker"
      ],
      "bestPractices": []
    },
    "analysis": {
      "domain": "Launch Planning & Execution",
      "dimensions": [
        {
          "name": "Debrief Process",
          "weight": 20,
          "description": "Systematic debrief approach"
        },
        {
          "name": "Stakeholder Input",
          "weight": 20,
          "description": "Comprehensive perspectives"
        },
        {
          "name": "Success Factors",
          "weight": 20,
          "description": "Key win factors identified"
        },
        {
          "name": "Improvement Areas",
          "weight": 20,
          "description": "Clear action items"
        },
        {
          "name": "Knowledge Transfer",
          "weight": 20,
          "description": "Learning dissemination"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No deal debriefs",
        "26-50": "Occasional debriefs",
        "51-75": "Regular debrief practice",
        "76-90": "Strong debrief culture",
        "91-100": "World-class deal learning"
      }
    },
    "resources": {
      "domain": "Launch Planning & Execution",
      "templates": [
        "Launch Checklist",
        "Go-to-Market Plan",
        "Launch Metrics Dashboard"
      ],
      "metrics": [
        "Feedback volume by channel",
        "Feature request implementation rate",
        "Time from feedback to release",
        "Customer satisfaction with responsiveness"
      ]
    },
    "outputs": {
      "domain": "Launch Planning & Execution",
      "templates": [
        "Launch Checklist",
        "Go-to-Market Plan",
        "Launch Metrics Dashboard"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "5-5"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "6-1": {
    "id": "6-1",
    "name": "Usage Heatmap",
    "blockId": 6,
    "blockName": "Customer Engagement Flywheel",
    "subId": 1,
    "phase": 3,
    "phaseName": "Go-To Market",
    "category": "engagement",
    "agent": {
      "name": "Usage Heatmap Analyst",
      "key": "6a",
      "description": "Analyzes product usage patterns and engagement",
      "domain": "Usage Heatmap"
    },
    "education": {
      "title": "Usage Heatmap",
      "what": "A systematic approach to usage heatmap that analyzes product usage patterns and engagement. Evaluates data collection, pattern analysis, feature adoption, user segmentation, action planning to ensure excellence and continuous improvement in this critical capability.",
      "why": "You can't improve what you don't measure. Usage heatmaps reveal the true value drivers in your product and expose features that need improvement or removal.",
      "how": "\n      <h4>Heatmap Dimensions:</h4>\n      <ul>\n        <li><strong>Feature Usage:</strong> Frequency of feature access</li>\n        <li><strong>User Paths:</strong> Common navigation patterns</li>\n        <li><strong>Time Spent:</strong> Duration in different areas</li>\n        <li><strong>Click Patterns:</strong> Where users click most</li>\n        <li><strong>Drop-off Points:</strong> Where users abandon</li>\n      </ul>\n      \n      <h4>Implementation Steps:</h4>\n      <ol>\n        <li>Instrument key events and features</li>\n        <li>Collect usage data for 30+ days</li>\n        <li>Segment by user type</li>\n        <li>Create visual heatmaps</li>\n        <li>Identify patterns and anomalies</li>\n        <li>Share insights with product team</li>\n      </ol>\n    ",
      "examples": [
        "Dashboard viewed 10x more than reports",
        "Advanced features used by only 5% of users",
        "Mobile usage 3x higher on weekends"
      ],
      "keyMetrics": [
        {
          "value": "4x",
          "label": "Higher Engagement",
          "description": "Active vs passive users"
        },
        {
          "value": "65%",
          "label": "Better Retention",
          "description": "Engagement-driven approach"
        },
        {
          "value": "3.5x",
          "label": "More Expansion",
          "description": "Engaged customer growth"
        },
        {
          "value": "50%",
          "label": "Faster Adoption",
          "description": "Feature utilization speed"
        }
      ]
    },
    "workspace": {
      "domain": "Usage Heatmap",
      "questions": [
        {
          "id": "6-1-q1",
          "text": "What is your current strategy for Usage Heatmap?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Usage Heatmap for ST6Co/ScaleOps6Product"
        },
        {
          "id": "6-1-q2",
          "text": "How do you measure success in Usage Heatmap?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Usage Heatmap for ST6Co/ScaleOps6Product"
        },
        {
          "id": "6-1-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Usage Heatmap for ST6Co/ScaleOps6Product"
        },
        {
          "id": "6-1-q4",
          "text": "What specific evidence demonstrates your Usage Heatmap effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "6-1-q5",
          "text": "What are your next steps to improve Usage Heatmap?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Analytics Platforms (Mixpanel, Amplitude)",
        "Heatmap Tools (Hotjar, FullStory)",
        "Session Recording (LogRocket, Smartlook)",
        "Product Analytics (Pendo, Heap)"
      ],
      "templates": [
        "Feature Usage Matrix",
        "User Journey Heatmap",
        "Engagement Dashboard",
        "Feature Adoption Tracker"
      ],
      "bestPractices": [
        "Track every meaningful user action",
        "Segment by user type and cohort",
        "Look for patterns in power users",
        "Remove or improve unused features"
      ]
    },
    "analysis": {
      "domain": "Usage Heatmap",
      "dimensions": [
        {
          "name": "Data Collection",
          "weight": 20,
          "description": "Comprehensiveness of usage data"
        },
        {
          "name": "Pattern Analysis",
          "weight": 20,
          "description": "Insight quality from patterns"
        },
        {
          "name": "Feature Adoption",
          "weight": 20,
          "description": "Understanding feature usage"
        },
        {
          "name": "User Segmentation",
          "weight": 20,
          "description": "Usage by user type"
        },
        {
          "name": "Action Planning",
          "weight": 20,
          "description": "Improvements from insights"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No usage tracking",
        "26-50": "Basic usage metrics",
        "51-75": "Good usage analysis",
        "76-90": "Strong usage insights",
        "91-100": "Usage optimization mastery"
      }
    },
    "resources": {
      "domain": "Usage Heatmap",
      "templates": [
        "Feature Usage Matrix",
        "User Journey Heatmap",
        "Engagement Dashboard"
      ],
      "metrics": [
        "Feature adoption rate",
        "Daily/Monthly active features",
        "Feature stickiness",
        "Usage depth and breadth"
      ]
    },
    "outputs": {
      "domain": "Usage Heatmap",
      "templates": [
        "Feature Usage Matrix",
        "User Journey Heatmap",
        "Engagement Dashboard"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "6-2": {
    "id": "6-2",
    "name": "Milestone Triggers",
    "blockId": 6,
    "blockName": "Customer Engagement Flywheel",
    "subId": 2,
    "phase": 3,
    "phaseName": "Go-To Market",
    "category": "engagement",
    "agent": {
      "name": "Milestone Tracker",
      "key": "6b",
      "description": "Tracks customer success milestones",
      "domain": "Milestone Triggers"
    },
    "education": {
      "title": "Milestone Triggers",
      "what": "A systematic approach to milestone triggers that tracks customer success milestones. Evaluates milestone definition, tracking systems, progress visibility, intervention triggers, celebration practices to ensure excellence and continuous improvement in this critical capability.",
      "why": "Not all user actions are equal. Milestone triggers help you identify the moments that matter most for long-term retention and growth.",
      "how": "\n      <h4>Key Milestone Types:</h4>\n      <ul>\n        <li><strong>Activation:</strong> First value realization</li>\n        <li><strong>Habit Formation:</strong> Regular usage pattern</li>\n        <li><strong>Power User:</strong> Advanced feature adoption</li>\n        <li><strong>Expansion Ready:</strong> Hitting usage limits</li>\n        <li><strong>Advocate:</strong> Sharing or referring others</li>\n      </ul>\n      \n      <h4>Identification Process:</h4>\n      <ol>\n        <li>Analyze successful user cohorts</li>\n        <li>Identify common behavior patterns</li>\n        <li>Define measurable triggers</li>\n        <li>Set up tracking and alerts</li>\n        <li>Create interventions for each milestone</li>\n        <li>Test and refine triggers</li>\n      </ol>\n    ",
      "examples": [
        "Activation: User completes first workflow within 7 days",
        "Habit: User logs in 3+ times per week for 3 weeks",
        "Expansion: Team adds 5+ users"
      ],
      "keyMetrics": [
        {
          "value": "4x",
          "label": "Higher Engagement",
          "description": "Active vs passive users"
        },
        {
          "value": "65%",
          "label": "Better Retention",
          "description": "Engagement-driven approach"
        },
        {
          "value": "3.5x",
          "label": "More Expansion",
          "description": "Engaged customer growth"
        },
        {
          "value": "50%",
          "label": "Faster Adoption",
          "description": "Feature utilization speed"
        }
      ]
    },
    "workspace": {
      "domain": "Milestone Triggers",
      "questions": [
        {
          "id": "6-2-q1",
          "text": "What is your current strategy for Milestone Triggers?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Milestone Triggers for ST6Co/ScaleOps6Product"
        },
        {
          "id": "6-2-q2",
          "text": "How do you measure success in Milestone Triggers?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Milestone Triggers for ST6Co/ScaleOps6Product"
        },
        {
          "id": "6-2-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Milestone Triggers for ST6Co/ScaleOps6Product"
        },
        {
          "id": "6-2-q4",
          "text": "What specific evidence demonstrates your Milestone Triggers effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "6-2-q5",
          "text": "What are your next steps to improve Milestone Triggers?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Event Tracking (Segment, Mixpanel)",
        "Automation Platforms (Braze, Customer.io)",
        "Analytics Tools (Amplitude, Heap)",
        "Workflow Automation (Zapier, n8n)"
      ],
      "templates": [
        "Milestone Definition Framework",
        "Trigger Tracking Dashboard",
        "Intervention Playbook",
        "Cohort Analysis Template"
      ],
      "bestPractices": [
        "Define milestones based on successful users",
        "Create automated nudges for each milestone",
        "Celebrate milestone achievements with users",
        "Test different intervention strategies"
      ]
    },
    "analysis": {
      "domain": "Milestone Triggers",
      "dimensions": [
        {
          "name": "Milestone Definition",
          "weight": 20,
          "description": "Clear success milestones"
        },
        {
          "name": "Tracking Systems",
          "weight": 20,
          "description": "Milestone monitoring tools"
        },
        {
          "name": "Progress Visibility",
          "weight": 20,
          "description": "Customer progress clarity"
        },
        {
          "name": "Intervention Triggers",
          "weight": 20,
          "description": "Proactive support triggers"
        },
        {
          "name": "Celebration Practices",
          "weight": 20,
          "description": "Success recognition"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No milestone tracking",
        "26-50": "Basic milestone awareness",
        "51-75": "Good milestone management",
        "76-90": "Strong milestone program",
        "91-100": "Perfect milestone orchestration"
      }
    },
    "resources": {
      "domain": "Milestone Triggers",
      "templates": [
        "Milestone Definition Framework",
        "Trigger Tracking Dashboard",
        "Intervention Playbook"
      ],
      "metrics": [
        "Milestone achievement rate",
        "Time to milestone",
        "Milestone to retention correlation",
        "Intervention success rate"
      ]
    },
    "outputs": {
      "domain": "Milestone Triggers",
      "templates": [
        "Milestone Definition Framework",
        "Trigger Tracking Dashboard",
        "Intervention Playbook"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "6-1"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "6-3": {
    "id": "6-3",
    "name": "CS Dashboard",
    "blockId": 6,
    "blockName": "Customer Engagement Flywheel",
    "subId": 3,
    "phase": 3,
    "phaseName": "Go-To Market",
    "category": "engagement",
    "agent": {
      "name": "CS Dashboard Builder",
      "key": "6c",
      "description": "Creates customer success dashboards and metrics",
      "domain": "CS Dashboard"
    },
    "education": {
      "title": "CS Dashboard",
      "what": "A systematic framework for monitoring and measuring cs dashboard through data collection, analysis, and actionable insights. Tracks key metrics including metric selection, data accuracy, visualization quality, actionability, stakeholder adoption to enable proactive decision-making and continuous improvement.",
      "why": "Engagement is the leading indicator of retention. Scoring helps prioritize support efforts and identify expansion opportunities.",
      "how": "Define engagement metrics, weight by importance, track user behaviors, calculate scores, segment users by engagement level, trigger automated interventions.",
      "examples": [
        "Power users: 90+ score, daily active, using all features",
        "At-risk: <40 score, declining usage, no recent activity",
        "Growth opportunity: 70 score, approaching usage limits"
      ],
      "keyMetrics": [
        {
          "value": "4x",
          "label": "Higher Engagement",
          "description": "Active vs passive users"
        },
        {
          "value": "65%",
          "label": "Better Retention",
          "description": "Engagement-driven approach"
        },
        {
          "value": "3.5x",
          "label": "More Expansion",
          "description": "Engaged customer growth"
        },
        {
          "value": "50%",
          "label": "Faster Adoption",
          "description": "Feature utilization speed"
        }
      ]
    },
    "workspace": {
      "domain": "CS Dashboard",
      "questions": [
        {
          "id": "6-3-q1",
          "text": "What is your current strategy for CS Dashboard?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about CS Dashboard for ST6Co/ScaleOps6Product"
        },
        {
          "id": "6-3-q2",
          "text": "How do you measure success in CS Dashboard?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about CS Dashboard for ST6Co/ScaleOps6Product"
        },
        {
          "id": "6-3-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about CS Dashboard for ST6Co/ScaleOps6Product"
        },
        {
          "id": "6-3-q4",
          "text": "What specific evidence demonstrates your CS Dashboard effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "6-3-q5",
          "text": "What are your next steps to improve CS Dashboard?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [],
      "templates": [
        "Engagement Scoring Model",
        "User Behavior Tracker",
        "Activation Metrics Dashboard"
      ],
      "bestPractices": []
    },
    "analysis": {
      "domain": "CS Dashboard",
      "dimensions": [
        {
          "name": "Metric Selection",
          "weight": 20,
          "description": "Relevance of CS metrics"
        },
        {
          "name": "Data Accuracy",
          "weight": 20,
          "description": "Quality of data sources"
        },
        {
          "name": "Visualization Quality",
          "weight": 20,
          "description": "Dashboard clarity and UX"
        },
        {
          "name": "Actionability",
          "weight": 20,
          "description": "Insights drive actions"
        },
        {
          "name": "Stakeholder Adoption",
          "weight": 20,
          "description": "Dashboard usage levels"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No CS dashboards",
        "26-50": "Basic metrics tracked",
        "51-75": "Good dashboard system",
        "76-90": "Excellent CS visibility",
        "91-100": "World-class CS analytics"
      }
    },
    "resources": {
      "domain": "CS Dashboard",
      "templates": [
        "Customer Success Dashboard",
        "Health Score Calculator",
        "Account Review Template"
      ],
      "metrics": [
        "Average engagement score",
        "Score distribution",
        "Engagement trend",
        "Score-to-retention correlation"
      ]
    },
    "outputs": {
      "domain": "CS Dashboard",
      "templates": [
        "Customer Success Dashboard",
        "Health Score Calculator",
        "Account Review Template"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "6-2"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "6-4": {
    "id": "6-4",
    "name": "Activation Metric Model",
    "blockId": 6,
    "blockName": "Customer Engagement Flywheel",
    "subId": 4,
    "phase": 3,
    "phaseName": "Go-To Market",
    "category": "engagement",
    "agent": {
      "name": "Activation Expert",
      "key": "6d",
      "description": "Optimizes customer activation and onboarding",
      "domain": "Activation Metric Model"
    },
    "education": {
      "title": "Activation Metric Model",
      "what": "A structured activation metric model that provides clear guidelines and methodologies for optimizes customer activation and onboarding. Focuses on activation definition, time to activation, activation rate, onboarding quality, early value delivery to ensure comprehensive coverage and measurable outcomes.",
      "why": "It costs 5-25x more to acquire a new customer than retain an existing one. Systematic retention drives sustainable growth.",
      "how": "Identify churn triggers, create intervention strategies, build success programs, implement early warning systems, measure retention impact.",
      "examples": [
        "30-60-90 day check-in cadence for new customers",
        "Automated alerts when usage drops 50%",
        "Quarterly business reviews with key accounts"
      ],
      "keyMetrics": [
        {
          "value": "4x",
          "label": "Higher Engagement",
          "description": "Active vs passive users"
        },
        {
          "value": "65%",
          "label": "Better Retention",
          "description": "Engagement-driven approach"
        },
        {
          "value": "3.5x",
          "label": "More Expansion",
          "description": "Engaged customer growth"
        },
        {
          "value": "50%",
          "label": "Faster Adoption",
          "description": "Feature utilization speed"
        }
      ]
    },
    "workspace": {
      "domain": "Activation Metric Model",
      "questions": [
        {
          "id": "6-4-q1",
          "text": "What is your current strategy for Activation Metric Model?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Activation Metric Model for ST6Co/ScaleOps6Product"
        },
        {
          "id": "6-4-q2",
          "text": "How do you measure success in Activation Metric Model?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Activation Metric Model for ST6Co/ScaleOps6Product"
        },
        {
          "id": "6-4-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Activation Metric Model for ST6Co/ScaleOps6Product"
        },
        {
          "id": "6-4-q4",
          "text": "What specific evidence demonstrates your Activation Metric Model effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "6-4-q5",
          "text": "What are your next steps to improve Activation Metric Model?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [],
      "templates": [
        "Retention Strategy Guide",
        "Churn Prevention Playbook",
        "Customer Success Plan"
      ],
      "bestPractices": []
    },
    "analysis": {
      "domain": "Activation Metric Model",
      "dimensions": [
        {
          "name": "Activation Definition",
          "weight": 20,
          "description": "Clear activation criteria"
        },
        {
          "name": "Time to Activation",
          "weight": 20,
          "description": "Speed of activation"
        },
        {
          "name": "Activation Rate",
          "weight": 20,
          "description": "Percentage achieving activation"
        },
        {
          "name": "Onboarding Quality",
          "weight": 20,
          "description": "Onboarding experience"
        },
        {
          "name": "Early Value Delivery",
          "weight": 20,
          "description": "Quick wins achieved"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Poor activation rates",
        "26-50": "Basic activation process",
        "51-75": "Good activation program",
        "76-90": "Strong activation success",
        "91-100": "Activation excellence"
      }
    },
    "resources": {
      "domain": "Activation Metric Model",
      "templates": [
        "Activation Metrics Framework",
        "Onboarding Checklist",
        "Time-to-Value Tracker"
      ],
      "metrics": [
        "Gross retention rate",
        "Net retention rate",
        "Customer lifetime value",
        "Churn rate by cohort"
      ]
    },
    "outputs": {
      "domain": "Activation Metric Model",
      "templates": [
        "Activation Metrics Framework",
        "Onboarding Checklist",
        "Time-to-Value Tracker"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "6-3"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "6-5": {
    "id": "6-5",
    "name": "Feedback Collector",
    "blockId": 6,
    "blockName": "Customer Engagement Flywheel",
    "subId": 5,
    "phase": 3,
    "phaseName": "Go-To Market",
    "category": "engagement",
    "agent": {
      "name": "Feedback Collector",
      "key": "6e",
      "description": "Systematically collects and processes feedback",
      "domain": "Feedback Collector"
    },
    "education": {
      "title": "Feedback Collector",
      "what": "A systematic approach to feedback collector that systematically collects and processes feedback. Evaluates collection methods, response rates, processing speed, categorization, action conversion to ensure excellence and continuous improvement in this critical capability.",
      "why": "Feature adoption drives value realization. Understanding adoption patterns helps improve onboarding and increase product stickiness.",
      "how": "Track feature discovery, measure first use, monitor repeat usage, identify adoption barriers, optimize user flows, celebrate milestones.",
      "examples": [
        "70% of users discover key feature within 7 days",
        "Feature adoption increases retention by 40%",
        "Guided tours improve adoption by 25%"
      ],
      "keyMetrics": [
        {
          "value": "4x",
          "label": "Higher Engagement",
          "description": "Active vs passive users"
        },
        {
          "value": "65%",
          "label": "Better Retention",
          "description": "Engagement-driven approach"
        },
        {
          "value": "3.5x",
          "label": "More Expansion",
          "description": "Engaged customer growth"
        },
        {
          "value": "50%",
          "label": "Faster Adoption",
          "description": "Feature utilization speed"
        }
      ]
    },
    "workspace": {
      "domain": "Feedback Collector",
      "questions": [
        {
          "id": "6-5-q1",
          "text": "What is your current strategy for Feedback Collector?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Feedback Collector for ST6Co/ScaleOps6Product"
        },
        {
          "id": "6-5-q2",
          "text": "How do you measure success in Feedback Collector?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Feedback Collector for ST6Co/ScaleOps6Product"
        },
        {
          "id": "6-5-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Feedback Collector for ST6Co/ScaleOps6Product"
        },
        {
          "id": "6-5-q4",
          "text": "What specific evidence demonstrates your Feedback Collector effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "6-5-q5",
          "text": "What are your next steps to improve Feedback Collector?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [],
      "templates": [
        "Feature Adoption Dashboard",
        "User Journey Map",
        "Adoption Funnel Analysis"
      ],
      "bestPractices": []
    },
    "analysis": {
      "domain": "Feedback Collector",
      "dimensions": [
        {
          "name": "Collection Methods",
          "weight": 20,
          "description": "Variety of feedback channels"
        },
        {
          "name": "Response Rates",
          "weight": 20,
          "description": "Feedback participation levels"
        },
        {
          "name": "Processing Speed",
          "weight": 20,
          "description": "Time to process feedback"
        },
        {
          "name": "Categorization",
          "weight": 20,
          "description": "Feedback organization"
        },
        {
          "name": "Action Conversion",
          "weight": 20,
          "description": "Feedback to action rate"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Minimal feedback collection",
        "26-50": "Basic feedback process",
        "51-75": "Good feedback system",
        "76-90": "Strong feedback culture",
        "91-100": "Feedback-driven excellence"
      }
    },
    "resources": {
      "domain": "Feedback Collector",
      "templates": [
        "Feedback Collection Framework",
        "Survey Templates",
        "Voice of Customer Report"
      ],
      "metrics": [
        "Feature discovery rate",
        "Time to first use",
        "Feature adoption rate",
        "Feature stickiness"
      ]
    },
    "outputs": {
      "domain": "Feedback Collector",
      "templates": [
        "Feedback Collection Framework",
        "Survey Templates",
        "Voice of Customer Report"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "6-4"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "6-6": {
    "id": "6-6",
    "name": "Power User Behavior Signals",
    "blockId": 6,
    "blockName": "Customer Engagement Flywheel",
    "subId": 6,
    "phase": 3,
    "phaseName": "Go-To Market",
    "category": "engagement",
    "agent": {
      "name": "Power User Analyst",
      "key": "6f",
      "description": "Identifies and nurtures power users",
      "domain": "Power User Behavior Signals"
    },
    "education": {
      "title": "Power User Behavior Signals",
      "what": "A systematic approach to power user behavior signals that identifies and nurtures power users. Evaluates identification criteria, engagement programs, advocacy development, feedback quality, community building to ensure excellence and continuous improvement in this critical capability.",
      "why": "Customer feedback is the compass for product development. A strong feedback loop ensures you build what customers actually need.",
      "how": "Collect feedback from multiple channels, categorize and prioritize input, share insights with teams, implement changes, close the loop with customers.",
      "examples": [
        "Monthly NPS surveys with follow-up questions",
        "In-app feedback widget with 15% response rate",
        "Customer advisory board quarterly sessions"
      ],
      "keyMetrics": [
        {
          "value": "4x",
          "label": "Higher Engagement",
          "description": "Active vs passive users"
        },
        {
          "value": "65%",
          "label": "Better Retention",
          "description": "Engagement-driven approach"
        },
        {
          "value": "3.5x",
          "label": "More Expansion",
          "description": "Engaged customer growth"
        },
        {
          "value": "50%",
          "label": "Faster Adoption",
          "description": "Feature utilization speed"
        }
      ]
    },
    "workspace": {
      "domain": "Power User Behavior Signals",
      "questions": [
        {
          "id": "6-6-q1",
          "text": "What is your current strategy for Power User Behavior Signals?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Power User Behavior Signals for ST6Co/ScaleOps6Product"
        },
        {
          "id": "6-6-q2",
          "text": "How do you measure success in Power User Behavior Signals?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Power User Behavior Signals for ST6Co/ScaleOps6Product"
        },
        {
          "id": "6-6-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Power User Behavior Signals for ST6Co/ScaleOps6Product"
        },
        {
          "id": "6-6-q4",
          "text": "What specific evidence demonstrates your Power User Behavior Signals effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "6-6-q5",
          "text": "What are your next steps to improve Power User Behavior Signals?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [],
      "templates": [
        "Feedback Collection Framework",
        "Voice of Customer Report",
        "Product Roadmap Input Matrix"
      ],
      "bestPractices": []
    },
    "analysis": {
      "domain": "Power User Behavior Signals",
      "dimensions": [
        {
          "name": "Identification Criteria",
          "weight": 20,
          "description": "Power user definition"
        },
        {
          "name": "Engagement Programs",
          "weight": 20,
          "description": "Power user nurturing"
        },
        {
          "name": "Advocacy Development",
          "weight": 20,
          "description": "Converting to advocates"
        },
        {
          "name": "Feedback Quality",
          "weight": 20,
          "description": "Power user insights"
        },
        {
          "name": "Community Building",
          "weight": 20,
          "description": "Power user community"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No power user focus",
        "26-50": "Basic power user awareness",
        "51-75": "Good power user program",
        "76-90": "Strong power user engagement",
        "91-100": "Power user excellence"
      }
    },
    "resources": {
      "domain": "Power User Behavior Signals",
      "templates": [
        "Power User Profile",
        "Behavior Analytics Dashboard",
        "Advocacy Program Framework"
      ],
      "metrics": [
        "Feedback volume",
        "Response rate",
        "Feature request implementation rate",
        "Customer satisfaction score"
      ]
    },
    "outputs": {
      "domain": "Power User Behavior Signals",
      "templates": [
        "Power User Profile",
        "Behavior Analytics Dashboard",
        "Advocacy Program Framework"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "6-5"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "7-1": {
    "id": "7-1",
    "name": "Time/Cost Savings Metrics",
    "blockId": 7,
    "blockName": "Quantifiable Impact",
    "subId": 1,
    "phase": 4,
    "phaseName": "Scaling Impact",
    "category": "impact",
    "agent": {
      "name": "Time/Cost Analyst",
      "key": "7a",
      "description": "Quantifies time and cost savings delivered",
      "domain": "Time/Cost Savings Metrics"
    },
    "education": {
      "title": "Time/Cost Savings Metrics",
      "what": "A systematic approach to time/cost savings metrics that quantifies time and cost savings delivered. Evaluates measurement methodology, baseline establishment, data collection, validation process, communication clarity to ensure excellence and continuous improvement in this critical capability.",
      "why": "ROI is the universal language of business. Clear time/cost savings metrics make budget approval easier and justify premium pricing.",
      "how": "\n      <h4>Measurement Categories:</h4>\n      <ul>\n        <li><strong>Time Saved:</strong> Hours reduced per task/week/month</li>\n        <li><strong>Labor Cost:</strong> FTE reduction or reallocation</li>\n        <li><strong>Tool Consolidation:</strong> Eliminated subscriptions</li>\n        <li><strong>Error Reduction:</strong> Cost of mistakes avoided</li>\n        <li><strong>Opportunity Cost:</strong> Revenue from freed resources</li>\n      </ul>\n      \n      <h4>Calculation Process:</h4>\n      <ol>\n        <li>Baseline current state metrics</li>\n        <li>Measure post-implementation state</li>\n        <li>Calculate delta</li>\n        <li>Monetize time savings</li>\n        <li>Project annual impact</li>\n        <li>Validate with customers</li>\n      </ol>\n    ",
      "examples": [
        "Reduces reporting time from 8 hours to 30 minutes weekly",
        "Eliminates need for 2 FTEs in data entry ($120K/year)",
        "Replaces 3 tools costing $500/month combined"
      ],
      "keyMetrics": [
        {
          "value": "3.8x",
          "label": "Measurable ROI",
          "description": "Quantified customer value"
        },
        {
          "value": "70%",
          "label": "Higher Renewals",
          "description": "Proven impact correlation"
        },
        {
          "value": "2.5x",
          "label": "Better References",
          "description": "Success story generation"
        },
        {
          "value": "55%",
          "label": "Faster Expansion",
          "description": "Value-driven growth"
        }
      ]
    },
    "workspace": {
      "domain": "Time/Cost Savings Metrics",
      "questions": [
        {
          "id": "7-1-q1",
          "text": "What is your current strategy for Time/Cost Savings Metrics?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Time/Cost Savings Metrics for ST6Co/ScaleOps6Product"
        },
        {
          "id": "7-1-q2",
          "text": "How do you measure success in Time/Cost Savings Metrics?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Time/Cost Savings Metrics for ST6Co/ScaleOps6Product"
        },
        {
          "id": "7-1-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Time/Cost Savings Metrics for ST6Co/ScaleOps6Product"
        },
        {
          "id": "7-1-q4",
          "text": "What specific evidence demonstrates your Time/Cost Savings Metrics effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "7-1-q5",
          "text": "What are your next steps to improve Time/Cost Savings Metrics?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Time Tracking (Toggl, RescueTime)",
        "Process Mining (Celonis, UiPath)",
        "Financial Modeling (Excel, Google Sheets)",
        "Survey Tools (SurveyMonkey, Typeform)"
      ],
      "templates": [
        "ROI Calculator",
        "Time Study Template",
        "Cost-Benefit Analysis",
        "Savings Projection Model"
      ],
      "bestPractices": [
        "Measure baseline before implementation",
        "Track actual vs. projected savings",
        "Include both hard and soft costs",
        "Get customer validation of savings"
      ]
    },
    "analysis": {
      "domain": "Time/Cost Savings Metrics",
      "dimensions": [
        {
          "name": "Measurement Methodology",
          "weight": 20,
          "description": "Rigor of measurement"
        },
        {
          "name": "Baseline Establishment",
          "weight": 20,
          "description": "Clear before state"
        },
        {
          "name": "Data Collection",
          "weight": 20,
          "description": "Quality of savings data"
        },
        {
          "name": "Validation Process",
          "weight": 20,
          "description": "Third-party validation"
        },
        {
          "name": "Communication Clarity",
          "weight": 20,
          "description": "Clear value messaging"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No quantified savings",
        "26-50": "Estimated savings only",
        "51-75": "Good savings documentation",
        "76-90": "Strong value proof",
        "91-100": "Irrefutable value delivery"
      }
    },
    "resources": {
      "domain": "Time/Cost Savings Metrics",
      "templates": [
        "ROI Calculator",
        "Time Study Template",
        "Cost-Benefit Analysis"
      ],
      "metrics": [
        "Hours saved per user",
        "Cost reduction percentage",
        "Payback period",
        "Total cost of ownership"
      ]
    },
    "outputs": {
      "domain": "Time/Cost Savings Metrics",
      "templates": [
        "ROI Calculator",
        "Time Study Template",
        "Cost-Benefit Analysis"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "7-2": {
    "id": "7-2",
    "name": "Revenue-Impact Attribution",
    "blockId": 7,
    "blockName": "Quantifiable Impact",
    "subId": 2,
    "phase": 4,
    "phaseName": "Scaling Impact",
    "category": "impact",
    "agent": {
      "name": "Revenue Impact Tracker",
      "key": "7b",
      "description": "Tracks revenue impact and growth metrics",
      "domain": "Revenue-Impact Attribution"
    },
    "education": {
      "title": "Revenue-Impact Attribution",
      "what": "A systematic approach to revenue-impact attribution that tracks revenue impact and growth metrics. Evaluates revenue attribution, growth metrics, expansion tracking, retention impact, forecast accuracy to ensure excellence and continuous improvement in this critical capability.",
      "why": "Beyond cost savings, productivity gains show how your product makes teams more effective, not just more efficient. This justifies expansion and premium tiers.",
      "how": "\n      <h4>Productivity Dimensions:</h4>\n      <ul>\n        <li><strong>Output Volume:</strong> More work completed</li>\n        <li><strong>Quality Improvement:</strong> Fewer errors, better results</li>\n        <li><strong>Cycle Time:</strong> Faster completion</li>\n        <li><strong>Capacity Unlock:</strong> Ability to do new things</li>\n        <li><strong>Decision Speed:</strong> Faster, better choices</li>\n      </ul>\n      \n      <h4>Measurement Framework:</h4>\n      <ol>\n        <li>Define productivity KPIs</li>\n        <li>Establish baseline metrics</li>\n        <li>Track improvements over time</li>\n        <li>Isolate product impact</li>\n        <li>Gather qualitative feedback</li>\n        <li>Create case studies</li>\n      </ol>\n    ",
      "examples": [
        "Sales team closes 30% more deals in same time",
        "Marketing produces 2x content with same team",
        "Support resolves tickets 50% faster"
      ],
      "keyMetrics": [
        {
          "value": "3.8x",
          "label": "Measurable ROI",
          "description": "Quantified customer value"
        },
        {
          "value": "70%",
          "label": "Higher Renewals",
          "description": "Proven impact correlation"
        },
        {
          "value": "2.5x",
          "label": "Better References",
          "description": "Success story generation"
        },
        {
          "value": "55%",
          "label": "Faster Expansion",
          "description": "Value-driven growth"
        }
      ]
    },
    "workspace": {
      "domain": "Revenue-Impact Attribution",
      "questions": [
        {
          "id": "7-2-q1",
          "text": "What is your current strategy for Revenue-Impact Attribution?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Revenue-Impact Attribution for ST6Co/ScaleOps6Product"
        },
        {
          "id": "7-2-q2",
          "text": "How do you measure success in Revenue-Impact Attribution?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Revenue-Impact Attribution for ST6Co/ScaleOps6Product"
        },
        {
          "id": "7-2-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Revenue-Impact Attribution for ST6Co/ScaleOps6Product"
        },
        {
          "id": "7-2-q4",
          "text": "What specific evidence demonstrates your Revenue-Impact Attribution effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "7-2-q5",
          "text": "What are your next steps to improve Revenue-Impact Attribution?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Performance Analytics (Datadog, New Relic)",
        "Workflow Tools (Monday.com, Asana)",
        "Quality Tracking (Jira, Linear)",
        "Business Intelligence (Looker, Tableau)"
      ],
      "templates": [
        "Productivity Measurement Guide",
        "Before/After Analysis",
        "Impact Assessment Framework",
        "Performance Baseline Template"
      ],
      "bestPractices": [
        "Define clear productivity metrics upfront",
        "Isolate tool impact from other factors",
        "Track leading and lagging indicators",
        "Share wins with the entire team"
      ]
    },
    "analysis": {
      "domain": "Revenue-Impact Attribution",
      "dimensions": [
        {
          "name": "Revenue Attribution",
          "weight": 20,
          "description": "Clear revenue connection"
        },
        {
          "name": "Growth Metrics",
          "weight": 20,
          "description": "Revenue growth tracking"
        },
        {
          "name": "Expansion Tracking",
          "weight": 20,
          "description": "Upsell/cross-sell impact"
        },
        {
          "name": "Retention Impact",
          "weight": 20,
          "description": "Revenue retention effect"
        },
        {
          "name": "Forecast Accuracy",
          "weight": 20,
          "description": "Revenue prediction quality"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No revenue tracking",
        "26-50": "Basic revenue metrics",
        "51-75": "Good revenue analysis",
        "76-90": "Strong revenue impact",
        "91-100": "Revenue maximization mastery"
      }
    },
    "resources": {
      "domain": "Revenue-Impact Attribution",
      "templates": [
        "Revenue Attribution Model",
        "Impact Tracking Dashboard",
        "Business Case Template"
      ],
      "metrics": [
        "Output per person",
        "Quality score improvement",
        "Cycle time reduction",
        "Capacity utilization"
      ]
    },
    "outputs": {
      "domain": "Revenue-Impact Attribution",
      "templates": [
        "Revenue Attribution Model",
        "Impact Tracking Dashboard",
        "Business Case Template"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "7-1"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "7-3": {
    "id": "7-3",
    "name": "Productivity Lift Metrics",
    "blockId": 7,
    "blockName": "Quantifiable Impact",
    "subId": 3,
    "phase": 4,
    "phaseName": "Scaling Impact",
    "category": "impact",
    "agent": {
      "name": "Productivity Measurer",
      "key": "7c",
      "description": "Measures productivity improvements",
      "domain": "Productivity Lift Metrics"
    },
    "education": {
      "title": "Productivity Lift Metrics",
      "what": "A systematic approach to productivity lift metrics that measures productivity improvements. Evaluates productivity metrics, baseline comparison, user efficiency, team performance, scale effects to ensure excellence and continuous improvement in this critical capability.",
      "why": "Features don't retain customers, outcomes do. Tracking real business impact proves value, reduces churn, and identifies expansion opportunities.",
      "how": "\n      <h4>Outcome Categories:</h4>\n      <ul>\n        <li><strong>Revenue Impact:</strong> Growth, new opportunities</li>\n        <li><strong>Cost Reduction:</strong> Savings, efficiency</li>\n        <li><strong>Risk Mitigation:</strong> Compliance, security</li>\n        <li><strong>Customer Satisfaction:</strong> NPS, CSAT improvements</li>\n        <li><strong>Competitive Advantage:</strong> Market position gains</li>\n      </ul>\n      \n      <h4>Tracking Process:</h4>\n      <ol>\n        <li>Define success outcomes with customer</li>\n        <li>Establish measurement methods</li>\n        <li>Set up regular check-ins</li>\n        <li>Collect outcome data</li>\n        <li>Analyze trends and patterns</li>\n        <li>Share success stories</li>\n      </ol>\n    ",
      "examples": [
        "Customer A: 25% revenue increase after 6 months",
        "Customer B: Passed compliance audit due to our reporting",
        "Customer C: Reduced customer churn by 40%"
      ],
      "keyMetrics": [
        {
          "value": "3.8x",
          "label": "Measurable ROI",
          "description": "Quantified customer value"
        },
        {
          "value": "70%",
          "label": "Higher Renewals",
          "description": "Proven impact correlation"
        },
        {
          "value": "2.5x",
          "label": "Better References",
          "description": "Success story generation"
        },
        {
          "value": "55%",
          "label": "Faster Expansion",
          "description": "Value-driven growth"
        }
      ]
    },
    "workspace": {
      "domain": "Productivity Lift Metrics",
      "questions": [
        {
          "id": "7-3-q1",
          "text": "What is your current strategy for Productivity Lift Metrics?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Productivity Lift Metrics for ST6Co/ScaleOps6Product"
        },
        {
          "id": "7-3-q2",
          "text": "How do you measure success in Productivity Lift Metrics?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Productivity Lift Metrics for ST6Co/ScaleOps6Product"
        },
        {
          "id": "7-3-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Productivity Lift Metrics for ST6Co/ScaleOps6Product"
        },
        {
          "id": "7-3-q4",
          "text": "What specific evidence demonstrates your Productivity Lift Metrics effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "7-3-q5",
          "text": "What are your next steps to improve Productivity Lift Metrics?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Customer Success Platforms (Gainsight, ChurnZero)",
        "Survey Tools (Delighted, AskNicely)",
        "Analytics (Looker, Sisense)",
        "Communication (Intercom, Drift)"
      ],
      "templates": [
        "Outcome Definition Worksheet",
        "Success Metrics Dashboard",
        "Quarterly Business Review Template",
        "Success Plan Framework"
      ],
      "bestPractices": [
        "Define success metrics during onboarding",
        "Track progress monthly at minimum",
        "Celebrate outcome achievements publicly",
        "Use outcomes in renewal conversations"
      ]
    },
    "analysis": {
      "domain": "Productivity Lift Metrics",
      "dimensions": [
        {
          "name": "Productivity Metrics",
          "weight": 20,
          "description": "Clear productivity KPIs"
        },
        {
          "name": "Baseline Comparison",
          "weight": 20,
          "description": "Before/after analysis"
        },
        {
          "name": "User Efficiency",
          "weight": 20,
          "description": "Individual productivity gains"
        },
        {
          "name": "Team Performance",
          "weight": 20,
          "description": "Team productivity impact"
        },
        {
          "name": "Scale Effects",
          "weight": 20,
          "description": "Productivity at scale"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No productivity measurement",
        "26-50": "Basic efficiency tracking",
        "51-75": "Good productivity metrics",
        "76-90": "Strong productivity gains",
        "91-100": "Productivity transformation"
      }
    },
    "resources": {
      "domain": "Productivity Lift Metrics",
      "templates": [
        "Productivity Measurement Guide",
        "Before/After Analysis",
        "Impact Assessment Framework"
      ],
      "metrics": [
        "Outcome achievement rate",
        "Time to outcome",
        "Outcome to renewal correlation",
        "Customer lifetime value"
      ]
    },
    "outputs": {
      "domain": "Productivity Lift Metrics",
      "templates": [
        "Productivity Measurement Guide",
        "Before/After Analysis",
        "Impact Assessment Framework"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "7-2"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "7-4": {
    "id": "7-4",
    "name": "Net Retention Trends",
    "blockId": 7,
    "blockName": "Quantifiable Impact",
    "subId": 4,
    "phase": 4,
    "phaseName": "Scaling Impact",
    "category": "impact",
    "agent": {
      "name": "Retention Analyst",
      "key": "7d",
      "description": "Analyzes customer retention and churn",
      "domain": "Net Retention Trends"
    },
    "education": {
      "title": "Net Retention Trends",
      "what": "A systematic approach to net retention trends that analyzes customer retention and churn. Evaluates retention metrics, churn analysis, cohort analysis, predictive modeling, intervention success to ensure excellence and continuous improvement in this critical capability.",
      "why": "Buyers need context to evaluate value. Benchmarks provide objective proof points that justify decisions and build confidence in your solution.",
      "how": "\n      <h4>Benchmark Types:</h4>\n      <ul>\n        <li><strong>Industry Standards:</strong> Compare to accepted norms</li>\n        <li><strong>Competitor Performance:</strong> Head-to-head comparisons</li>\n        <li><strong>Historical Baseline:</strong> Before vs. after</li>\n        <li><strong>Best-in-Class:</strong> Aspirational targets</li>\n        <li><strong>Peer Group:</strong> Similar company comparisons</li>\n      </ul>\n      \n      <h4>Benchmarking Process:</h4>\n      <ol>\n        <li>Identify key metrics to benchmark</li>\n        <li>Gather industry data</li>\n        <li>Collect your performance data</li>\n        <li>Normalize for fair comparison</li>\n        <li>Create visual comparisons</li>\n        <li>Update regularly</li>\n      </ol>\n    ",
      "examples": [
        "Our customers see 3x industry average ROI",
        "50% faster implementation than competitors",
        "Top quartile performance in security audits"
      ],
      "keyMetrics": [
        {
          "value": "3.8x",
          "label": "Measurable ROI",
          "description": "Quantified customer value"
        },
        {
          "value": "70%",
          "label": "Higher Renewals",
          "description": "Proven impact correlation"
        },
        {
          "value": "2.5x",
          "label": "Better References",
          "description": "Success story generation"
        },
        {
          "value": "55%",
          "label": "Faster Expansion",
          "description": "Value-driven growth"
        }
      ]
    },
    "workspace": {
      "domain": "Net Retention Trends",
      "questions": [
        {
          "id": "7-4-q1",
          "text": "What is your current strategy for Net Retention Trends?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Net Retention Trends for ST6Co/ScaleOps6Product"
        },
        {
          "id": "7-4-q2",
          "text": "How do you measure success in Net Retention Trends?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Net Retention Trends for ST6Co/ScaleOps6Product"
        },
        {
          "id": "7-4-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Net Retention Trends for ST6Co/ScaleOps6Product"
        },
        {
          "id": "7-4-q4",
          "text": "What specific evidence demonstrates your Net Retention Trends effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "7-4-q5",
          "text": "What are your next steps to improve Net Retention Trends?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Onboarding Software (Userpilot, Appcues)",
        "LMS Platforms (Lessonly, Docebo)",
        "Communication Tools (Intercom, Drift)",
        "Project Management (Asana, Monday.com)"
      ],
      "templates": [
        "Onboarding Checklist",
        "Welcome Email Sequence",
        "Success Plan Template",
        "30-60-90 Day Plan"
      ],
      "bestPractices": [
        "Personalize onboarding by persona",
        "Celebrate quick wins early",
        "Assign dedicated CSM for high-value accounts",
        "Measure and optimize time to value"
      ]
    },
    "analysis": {
      "domain": "Net Retention Trends",
      "dimensions": [
        {
          "name": "Retention Metrics",
          "weight": 20,
          "description": "Comprehensive retention KPIs"
        },
        {
          "name": "Churn Analysis",
          "weight": 20,
          "description": "Understanding churn reasons"
        },
        {
          "name": "Cohort Analysis",
          "weight": 20,
          "description": "Retention by cohort"
        },
        {
          "name": "Predictive Modeling",
          "weight": 20,
          "description": "Churn prediction accuracy"
        },
        {
          "name": "Intervention Success",
          "weight": 20,
          "description": "Save rate effectiveness"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Poor retention tracking",
        "26-50": "Basic retention metrics",
        "51-75": "Good retention analysis",
        "76-90": "Strong retention program",
        "91-100": "Best-in-class retention"
      }
    },
    "resources": {
      "domain": "Net Retention Trends",
      "templates": [
        "Retention Analysis Dashboard",
        "Cohort Analysis Template",
        "Churn Prevention Playbook"
      ],
      "metrics": [
        "Performance vs. industry average",
        "Percentile ranking",
        "Improvement rate",
        "Competitive win rate"
      ]
    },
    "outputs": {
      "domain": "Net Retention Trends",
      "templates": [
        "Retention Analysis Dashboard",
        "Cohort Analysis Template",
        "Churn Prevention Playbook"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "7-3"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "7-5": {
    "id": "7-5",
    "name": "Downstream System Reductions",
    "blockId": 7,
    "blockName": "Quantifiable Impact",
    "subId": 5,
    "phase": 4,
    "phaseName": "Scaling Impact",
    "category": "impact",
    "agent": {
      "name": "System Reduction Expert",
      "key": "7e",
      "description": "Tracks system consolidation and simplification",
      "domain": "Downstream System Reductions"
    },
    "education": {
      "title": "Downstream System Reductions",
      "what": "A systematic approach to downstream system reductions that tracks system consolidation and simplification. Evaluates system inventory, complexity reduction, cost savings, integration benefits, user experience to ensure excellence and continuous improvement in this critical capability.",
      "why": "Without attribution, you can't optimize what matters. Understanding what drives value helps prioritize development and justify pricing.",
      "how": "\n      <h4>Attribution Approaches:</h4>\n      <ul>\n        <li><strong>First Touch:</strong> Initial feature that hooked user</li>\n        <li><strong>Last Touch:</strong> Final action before outcome</li>\n        <li><strong>Multi-Touch:</strong> Weighted contribution model</li>\n        <li><strong>Time Decay:</strong> Recent actions weighted more</li>\n        <li><strong>Data-Driven:</strong> Statistical attribution</li>\n      </ul>\n      \n      <h4>Implementation Steps:</h4>\n      <ol>\n        <li>Define outcomes to track</li>\n        <li>Map user journey touchpoints</li>\n        <li>Choose attribution model</li>\n        <li>Implement tracking</li>\n        <li>Analyze patterns</li>\n        <li>Refine model based on data</li>\n      </ol>\n    ",
      "examples": [
        "Automation feature drives 60% of time savings",
        "Reporting dashboard key to 40% of renewals",
        "Onboarding quality predicts 70% of success"
      ],
      "keyMetrics": [
        {
          "value": "3.8x",
          "label": "Measurable ROI",
          "description": "Quantified customer value"
        },
        {
          "value": "70%",
          "label": "Higher Renewals",
          "description": "Proven impact correlation"
        },
        {
          "value": "2.5x",
          "label": "Better References",
          "description": "Success story generation"
        },
        {
          "value": "55%",
          "label": "Faster Expansion",
          "description": "Value-driven growth"
        }
      ]
    },
    "workspace": {
      "domain": "Downstream System Reductions",
      "questions": [
        {
          "id": "7-5-q1",
          "text": "What is your current strategy for Downstream System Reductions?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Downstream System Reductions for ST6Co/ScaleOps6Product"
        },
        {
          "id": "7-5-q2",
          "text": "How do you measure success in Downstream System Reductions?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Downstream System Reductions for ST6Co/ScaleOps6Product"
        },
        {
          "id": "7-5-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Downstream System Reductions for ST6Co/ScaleOps6Product"
        },
        {
          "id": "7-5-q4",
          "text": "What specific evidence demonstrates your Downstream System Reductions effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "7-5-q5",
          "text": "What are your next steps to improve Downstream System Reductions?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Customer Success Platforms (Gainsight, ChurnZero)",
        "Predictive Analytics (Totango, ClientSuccess)",
        "Data Science Tools (Python, R)",
        "BI Platforms (Looker, Tableau)"
      ],
      "templates": [
        "Health Score Calculator",
        "Risk Assessment Matrix",
        "Intervention Playbook",
        "Health Score Dashboard"
      ],
      "bestPractices": [
        "Weight factors based on actual churn data",
        "Update algorithm quarterly",
        "Automate alerts for score changes",
        "Track intervention effectiveness"
      ]
    },
    "analysis": {
      "domain": "Downstream System Reductions",
      "dimensions": [
        {
          "name": "System Inventory",
          "weight": 20,
          "description": "Systems replaced/consolidated"
        },
        {
          "name": "Complexity Reduction",
          "weight": 20,
          "description": "Simplification achieved"
        },
        {
          "name": "Cost Savings",
          "weight": 20,
          "description": "System cost reduction"
        },
        {
          "name": "Integration Benefits",
          "weight": 20,
          "description": "Integration value"
        },
        {
          "name": "User Experience",
          "weight": 20,
          "description": "UX improvement"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No system reduction",
        "26-50": "Minor consolidation",
        "51-75": "Good system reduction",
        "76-90": "Major simplification",
        "91-100": "Radical simplification"
      }
    },
    "resources": {
      "domain": "Downstream System Reductions",
      "templates": [
        "System Consolidation Tracker",
        "Integration Map",
        "Cost Savings Calculator"
      ],
      "metrics": [
        "Feature attribution score",
        "Touchpoint influence",
        "Model accuracy",
        "Predictive power"
      ]
    },
    "outputs": {
      "domain": "Downstream System Reductions",
      "templates": [
        "System Consolidation Tracker",
        "Integration Map",
        "Cost Savings Calculator"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "7-4"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "7-6": {
    "id": "7-6",
    "name": "Friction Reduction Evidence",
    "blockId": 7,
    "blockName": "Quantifiable Impact",
    "subId": 6,
    "phase": 4,
    "phaseName": "Scaling Impact",
    "category": "impact",
    "agent": {
      "name": "Friction Analyzer",
      "key": "7f",
      "description": "Identifies and eliminates customer friction",
      "domain": "Friction Reduction Evidence"
    },
    "education": {
      "title": "Friction Reduction Evidence",
      "what": "A systematic approach to friction reduction evidence that identifies and eliminates customer friction. Evaluates friction identification, impact assessment, elimination planning, implementation success, continuous monitoring to ensure excellence and continuous improvement in this critical capability.",
      "why": "Executives buy and renew based on business impact. A well-designed executive dashboard keeps your solution top-of-mind and demonstrates ongoing value.",
      "how": "\n      <h4>Dashboard Components:</h4>\n      <ul>\n        <li><strong>Business KPIs:</strong> Revenue, cost, efficiency metrics</li>\n        <li><strong>Trend Analysis:</strong> Progress over time</li>\n        <li><strong>ROI Metrics:</strong> Value delivered vs. cost</li>\n        <li><strong>Comparative Data:</strong> Benchmarks and goals</li>\n        <li><strong>Action Items:</strong> Opportunities and recommendations</li>\n      </ul>\n      \n      <h4>Design Principles:</h4>\n      <ol>\n        <li>Focus on outcomes, not features</li>\n        <li>Use clear visualizations</li>\n        <li>Show trends and context</li>\n        <li>Make it shareable</li>\n        <li>Update automatically</li>\n        <li>Mobile-optimize</li>\n      </ol>\n    ",
      "examples": [
        "Monthly executive summary with 3 key metrics",
        "Quarterly business review dashboard",
        "Real-time ROI tracker"
      ],
      "keyMetrics": [
        {
          "value": "3.8x",
          "label": "Measurable ROI",
          "description": "Quantified customer value"
        },
        {
          "value": "70%",
          "label": "Higher Renewals",
          "description": "Proven impact correlation"
        },
        {
          "value": "2.5x",
          "label": "Better References",
          "description": "Success story generation"
        },
        {
          "value": "55%",
          "label": "Faster Expansion",
          "description": "Value-driven growth"
        }
      ]
    },
    "workspace": {
      "domain": "Friction Reduction Evidence",
      "questions": [
        {
          "id": "7-6-q1",
          "text": "What is your current strategy for Friction Reduction Evidence?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Friction Reduction Evidence for ST6Co/ScaleOps6Product"
        },
        {
          "id": "7-6-q2",
          "text": "How do you measure success in Friction Reduction Evidence?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Friction Reduction Evidence for ST6Co/ScaleOps6Product"
        },
        {
          "id": "7-6-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Friction Reduction Evidence for ST6Co/ScaleOps6Product"
        },
        {
          "id": "7-6-q4",
          "text": "What specific evidence demonstrates your Friction Reduction Evidence effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "7-6-q5",
          "text": "What are your next steps to improve Friction Reduction Evidence?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "CS Platforms (Gainsight, ChurnZero)",
        "Usage Analytics (Pendo, Amplitude)",
        "Sales Tools (Gong, Chorus)",
        "Automation (Zapier, Workato)"
      ],
      "templates": [
        "Expansion Opportunity Scorecard",
        "Upsell Talk Track",
        "Upgrade Proposal Template",
        "Expansion Playbook"
      ],
      "bestPractices": [
        "Monitor usage trends weekly",
        "Time expansion offers with success milestones",
        "Lead with value, not features",
        "Create urgency with limited-time offers"
      ]
    },
    "analysis": {
      "domain": "Friction Reduction Evidence",
      "dimensions": [
        {
          "name": "Friction Identification",
          "weight": 20,
          "description": "Finding friction points"
        },
        {
          "name": "Impact Assessment",
          "weight": 20,
          "description": "Friction cost analysis"
        },
        {
          "name": "Elimination Planning",
          "weight": 20,
          "description": "Friction removal strategy"
        },
        {
          "name": "Implementation Success",
          "weight": 20,
          "description": "Friction reduction achieved"
        },
        {
          "name": "Continuous Monitoring",
          "weight": 20,
          "description": "Ongoing friction detection"
        }
      ],
      "evaluationCriteria": {
        "0-25": "High friction ignored",
        "26-50": "Some friction addressed",
        "51-75": "Good friction reduction",
        "76-90": "Low friction experience",
        "91-100": "Frictionless excellence"
      }
    },
    "resources": {
      "domain": "Friction Reduction Evidence",
      "templates": [
        "Friction Analysis Framework",
        "User Journey Optimization",
        "Process Improvement Tracker"
      ],
      "metrics": [
        "Dashboard engagement rate",
        "Metrics accuracy",
        "Time to insight",
        "Executive satisfaction"
      ]
    },
    "outputs": {
      "domain": "Friction Reduction Evidence",
      "templates": [
        "Friction Analysis Framework",
        "User Journey Optimization",
        "Process Improvement Tracker"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "7-5"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "8-1": {
    "id": "8-1",
    "name": "Upsell Funnel Model",
    "blockId": 8,
    "blockName": "Customer Success Expansion",
    "subId": 1,
    "phase": 4,
    "phaseName": "Scaling Impact",
    "category": "expansion",
    "agent": {
      "name": "Upsell Funnel Designer",
      "key": "8a",
      "description": "Designs and optimizes upsell funnels",
      "domain": "Upsell Funnel Model"
    },
    "education": {
      "title": "Upsell Funnel Model",
      "what": "A structured upsell funnel model that provides clear guidelines and methodologies for designs and optimizes upsell funnels. Focuses on funnel design, trigger identification, conversion rates, value positioning, process automation to ensure comprehensive coverage and measurable outcomes.",
      "why": "The first 30 days determine the next 30 months. A great onboarding experience drives activation, reduces churn, and sets the foundation for expansion.",
      "how": "\n      <h4>Onboarding Phases:</h4>\n      <ol>\n        <li><strong>Welcome:</strong> First impression and expectation setting</li>\n        <li><strong>Setup:</strong> Technical configuration and integration</li>\n        <li><strong>Training:</strong> User education and enablement</li>\n        <li><strong>Activation:</strong> First value achievement</li>\n        <li><strong>Expansion:</strong> Introduction to advanced features</li>\n      </ol>\n      \n      <h4>Playbook Components:</h4>\n      <ul>\n        <li>Day-by-day timeline</li>\n        <li>Role-specific tasks</li>\n        <li>Success milestones</li>\n        <li>Communication templates</li>\n        <li>Escalation procedures</li>\n        <li>Handoff criteria</li>\n      </ul>\n    ",
      "examples": [
        "Day 1: Welcome call and account setup",
        "Day 7: First workflow completed",
        "Day 30: Full team adoption achieved"
      ],
      "keyMetrics": [
        {
          "value": "40%",
          "label": "Lower Churn",
          "description": "Retention system impact"
        },
        {
          "value": "3.2x",
          "label": "Higher LTV",
          "description": "Customer lifetime value"
        },
        {
          "value": "65%",
          "label": "Better NPS",
          "description": "Customer satisfaction"
        },
        {
          "value": "2.5x",
          "label": "More Advocacy",
          "description": "Customer referrals"
        }
      ]
    },
    "workspace": {
      "domain": "Upsell Funnel Model",
      "questions": [
        {
          "id": "8-1-q1",
          "text": "What is your current strategy for Upsell Funnel Model?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Upsell Funnel Model for ST6Co/ScaleOps6Product"
        },
        {
          "id": "8-1-q2",
          "text": "How do you measure success in Upsell Funnel Model?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Upsell Funnel Model for ST6Co/ScaleOps6Product"
        },
        {
          "id": "8-1-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Upsell Funnel Model for ST6Co/ScaleOps6Product"
        },
        {
          "id": "8-1-q4",
          "text": "What specific evidence demonstrates your Upsell Funnel Model effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "8-1-q5",
          "text": "What are your next steps to improve Upsell Funnel Model?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Ticketing Systems (Zendesk, Freshdesk)",
        "Analytics Tools (Looker, Tableau)",
        "AI Support (Intercom, Drift)",
        "Knowledge Base (Confluence, Helpjuice)"
      ],
      "templates": [
        "Ticket Classification Guide",
        "Support Metrics Dashboard",
        "Root Cause Analysis Template",
        "Escalation Matrix"
      ],
      "bestPractices": [
        "Standardize ticket categorization",
        "Analyze patterns weekly",
        "Route tickets automatically by type",
        "Share insights with product team"
      ]
    },
    "analysis": {
      "domain": "Upsell Funnel Model",
      "dimensions": [
        {
          "name": "Funnel Design",
          "weight": 20,
          "description": "Upsell funnel structure"
        },
        {
          "name": "Trigger Identification",
          "weight": 20,
          "description": "Upsell opportunity signals"
        },
        {
          "name": "Conversion Rates",
          "weight": 20,
          "description": "Upsell success rates"
        },
        {
          "name": "Value Positioning",
          "weight": 20,
          "description": "Upsell value communication"
        },
        {
          "name": "Process Automation",
          "weight": 20,
          "description": "Automated upsell processes"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No upsell process",
        "26-50": "Ad-hoc upselling",
        "51-75": "Good upsell program",
        "76-90": "Strong upsell engine",
        "91-100": "Upsell mastery"
      }
    },
    "resources": {
      "domain": "Upsell Funnel Model",
      "templates": [
        "Upsell Opportunity Scorecard",
        "Expansion Playbook",
        "Upgrade Proposal Template"
      ],
      "metrics": [
        "Time to first value",
        "Onboarding completion rate",
        "Activation rate",
        "Early churn rate"
      ]
    },
    "outputs": {
      "domain": "Upsell Funnel Model",
      "templates": [
        "Upsell Opportunity Scorecard",
        "Expansion Playbook",
        "Upgrade Proposal Template"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "8-2": {
    "id": "8-2",
    "name": "Team Expansion Signals",
    "blockId": 8,
    "blockName": "Customer Success Expansion",
    "subId": 2,
    "phase": 4,
    "phaseName": "Scaling Impact",
    "category": "expansion",
    "agent": {
      "name": "Team Expansion Tracker",
      "key": "8b",
      "description": "Tracks account team expansion",
      "domain": "Team Expansion Signals"
    },
    "education": {
      "title": "Team Expansion Signals",
      "what": "A predictive model that combines usage, engagement, and outcome data to assess the likelihood of customer retention, churn, or expansion.",
      "why": "You can't manage what you don't measure. Health scores enable proactive intervention, reduce churn, and identify growth opportunities before it's too late.",
      "how": "\n      <h4>Health Score Factors:</h4>\n      <ul>\n        <li><strong>Usage Metrics:</strong> Login frequency, feature adoption</li>\n        <li><strong>Engagement:</strong> Support tickets, training attendance</li>\n        <li><strong>Business Outcomes:</strong> ROI achieved, goals met</li>\n        <li><strong>Relationship:</strong> Stakeholder engagement, NPS</li>\n        <li><strong>Technical:</strong> Integration depth, data quality</li>\n      </ul>\n      \n      <h4>Algorithm Development:</h4>\n      <ol>\n        <li>Identify churn/retention indicators</li>\n        <li>Weight factors based on correlation</li>\n        <li>Create scoring formula</li>\n        <li>Define health categories (red/yellow/green)</li>\n        <li>Set up automated alerts</li>\n        <li>Validate and refine model</li>\n      </ol>\n    ",
      "examples": [
        "Green: >80 score, <5% churn risk",
        "Yellow: 60-80 score, needs attention",
        "Red: <60 score, high churn risk, immediate action"
      ],
      "keyMetrics": [
        {
          "value": "40%",
          "label": "Lower Churn",
          "description": "Retention system impact"
        },
        {
          "value": "3.2x",
          "label": "Higher LTV",
          "description": "Customer lifetime value"
        },
        {
          "value": "65%",
          "label": "Better NPS",
          "description": "Customer satisfaction"
        },
        {
          "value": "2.5x",
          "label": "More Advocacy",
          "description": "Customer referrals"
        }
      ]
    },
    "workspace": {
      "domain": "Team Expansion Signals",
      "questions": [
        {
          "id": "8-2-q1",
          "text": "What is your current strategy for Team Expansion Signals?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Team Expansion Signals for ST6Co/ScaleOps6Product"
        },
        {
          "id": "8-2-q2",
          "text": "How do you measure success in Team Expansion Signals?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Team Expansion Signals for ST6Co/ScaleOps6Product"
        },
        {
          "id": "8-2-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Team Expansion Signals for ST6Co/ScaleOps6Product"
        },
        {
          "id": "8-2-q4",
          "text": "What specific evidence demonstrates your Team Expansion Signals effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "8-2-q5",
          "text": "What are your next steps to improve Team Expansion Signals?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Knowledge Base Platforms (Zendesk, Helpjuice)",
        "Documentation Tools (Confluence, GitBook)",
        "Video Tools (Loom, Vidyard)",
        "Search Tools (Algolia, Elasticsearch)"
      ],
      "templates": [
        "KB Article Template",
        "Content Audit Checklist",
        "Information Architecture Map",
        "Style Guide"
      ],
      "bestPractices": [
        "Write at 8th grade reading level",
        "Include screenshots and videos",
        "Update content quarterly minimum",
        "Track article effectiveness"
      ]
    },
    "analysis": {
      "domain": "Team Expansion Signals",
      "dimensions": [
        {
          "name": "Expansion Metrics",
          "weight": 20,
          "description": "Team growth tracking"
        },
        {
          "name": "Department Penetration",
          "weight": 20,
          "description": "Cross-department adoption"
        },
        {
          "name": "User Growth Rate",
          "weight": 20,
          "description": "User addition velocity"
        },
        {
          "name": "License Utilization",
          "weight": 20,
          "description": "License usage rates"
        },
        {
          "name": "Expansion Patterns",
          "weight": 20,
          "description": "Growth pattern analysis"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No expansion tracking",
        "26-50": "Basic growth metrics",
        "51-75": "Good expansion monitoring",
        "76-90": "Strong expansion program",
        "91-100": "Expansion excellence"
      }
    },
    "resources": {
      "domain": "Team Expansion Signals",
      "templates": [
        "Expansion Signal Tracker",
        "Account Growth Dashboard",
        "Multi-User Adoption Plan"
      ],
      "metrics": [
        "Score accuracy (predicted vs. actual churn)",
        "False positive/negative rate",
        "Intervention success rate",
        "Score distribution"
      ]
    },
    "outputs": {
      "domain": "Team Expansion Signals",
      "templates": [
        "Expansion Signal Tracker",
        "Account Growth Dashboard",
        "Multi-User Adoption Plan"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "8-1"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "8-3": {
    "id": "8-3",
    "name": "Organic Adoption Pattern",
    "blockId": 8,
    "blockName": "Customer Success Expansion",
    "subId": 3,
    "phase": 4,
    "phaseName": "Scaling Impact",
    "category": "expansion",
    "agent": {
      "name": "Organic Growth Analyst",
      "key": "8c",
      "description": "Analyzes organic growth drivers",
      "domain": "Organic Adoption Pattern"
    },
    "education": {
      "title": "Organic Adoption Pattern",
      "what": "A systematic approach to organic adoption pattern that analyzes organic growth drivers. Evaluates viral coefficients, referral programs, word of mouth, network effects, growth attribution to ensure excellence and continuous improvement in this critical capability.",
      "why": "The best time to expand is when customers are seeing value. Triggers help you identify and act on expansion opportunities at the perfect moment.",
      "how": "\n      <h4>Trigger Types:</h4>\n      <ul>\n        <li><strong>Usage Limits:</strong> Approaching plan thresholds</li>\n        <li><strong>Feature Requests:</strong> Asking for premium capabilities</li>\n        <li><strong>Team Growth:</strong> Adding more users</li>\n        <li><strong>Success Metrics:</strong> Achieving strong ROI</li>\n        <li><strong>Engagement Depth:</strong> Using advanced features</li>\n      </ul>\n      \n      <h4>Trigger Implementation:</h4>\n      <ol>\n        <li>Analyze successful expansions</li>\n        <li>Identify common patterns</li>\n        <li>Define trigger thresholds</li>\n        <li>Set up monitoring</li>\n        <li>Create expansion playbooks</li>\n        <li>Track conversion rates</li>\n      </ol>\n    ",
      "examples": [
        "Using 80% of plan limits → Upgrade conversation",
        "3+ departments using product → Enterprise pitch",
        "High NPS score → Reference and case study ask"
      ],
      "keyMetrics": [
        {
          "value": "40%",
          "label": "Lower Churn",
          "description": "Retention system impact"
        },
        {
          "value": "3.2x",
          "label": "Higher LTV",
          "description": "Customer lifetime value"
        },
        {
          "value": "65%",
          "label": "Better NPS",
          "description": "Customer satisfaction"
        },
        {
          "value": "2.5x",
          "label": "More Advocacy",
          "description": "Customer referrals"
        }
      ]
    },
    "workspace": {
      "domain": "Organic Adoption Pattern",
      "questions": [
        {
          "id": "8-3-q1",
          "text": "What is your current strategy for Organic Adoption Pattern?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Organic Adoption Pattern for ST6Co/ScaleOps6Product"
        },
        {
          "id": "8-3-q2",
          "text": "How do you measure success in Organic Adoption Pattern?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Organic Adoption Pattern for ST6Co/ScaleOps6Product"
        },
        {
          "id": "8-3-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Organic Adoption Pattern for ST6Co/ScaleOps6Product"
        },
        {
          "id": "8-3-q4",
          "text": "What specific evidence demonstrates your Organic Adoption Pattern effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "8-3-q5",
          "text": "What are your next steps to improve Organic Adoption Pattern?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "CS Platforms (Gainsight, ChurnZero)",
        "Forecasting Tools (Clari, BoostUp)",
        "Analytics (Looker, Sisense)",
        "CRM Systems (Salesforce, HubSpot)"
      ],
      "templates": [
        "Renewal Forecast Model",
        "Account Review Template",
        "Save Plan Playbook",
        "Renewal Checklist"
      ],
      "bestPractices": [
        "Start renewal conversations 90 days out",
        "Track leading indicators of churn",
        "Segment forecasts by risk level",
        "Review forecast accuracy monthly"
      ]
    },
    "analysis": {
      "domain": "Organic Adoption Pattern",
      "dimensions": [
        {
          "name": "Viral Coefficients",
          "weight": 20,
          "description": "Viral growth metrics"
        },
        {
          "name": "Referral Programs",
          "weight": 20,
          "description": "Referral effectiveness"
        },
        {
          "name": "Word of Mouth",
          "weight": 20,
          "description": "WOM measurement"
        },
        {
          "name": "Network Effects",
          "weight": 20,
          "description": "Network value creation"
        },
        {
          "name": "Growth Attribution",
          "weight": 20,
          "description": "Growth source analysis"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No organic growth",
        "26-50": "Some organic growth",
        "51-75": "Good organic growth",
        "76-90": "Strong organic engine",
        "91-100": "Viral growth mastery"
      }
    },
    "resources": {
      "domain": "Organic Adoption Pattern",
      "templates": [
        "Viral Adoption Tracker",
        "Network Effects Dashboard",
        "Referral Program Framework"
      ],
      "metrics": [
        "Trigger to opportunity rate",
        "Expansion conversion rate",
        "Average expansion value",
        "Time to expansion"
      ]
    },
    "outputs": {
      "domain": "Organic Adoption Pattern",
      "templates": [
        "Viral Adoption Tracker",
        "Network Effects Dashboard",
        "Referral Program Framework"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "8-2"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "8-4": {
    "id": "8-4",
    "name": "Champion Mapping",
    "blockId": 8,
    "blockName": "Customer Success Expansion",
    "subId": 4,
    "phase": 4,
    "phaseName": "Scaling Impact",
    "category": "expansion",
    "agent": {
      "name": "Champion Mapper",
      "key": "8d",
      "description": "Identifies and nurtures customer champions",
      "domain": "Champion Mapping"
    },
    "education": {
      "title": "Champion Mapping",
      "what": "A systematic approach to champion mapping that identifies and nurtures customer champions. Evaluates champion identification, relationship depth, advocacy actions, internal influence, risk mitigation to ensure excellence and continuous improvement in this critical capability.",
      "why": "Support tickets are a goldmine of product and customer insights. Proper taxonomy enables faster resolution, better resource allocation, and product improvements.",
      "how": "\n      <h4>Taxonomy Structure:</h4>\n      <ul>\n        <li><strong>Category:</strong> Bug, feature request, how-to, account</li>\n        <li><strong>Priority:</strong> Critical, high, medium, low</li>\n        <li><strong>Product Area:</strong> Specific feature or module</li>\n        <li><strong>Customer Segment:</strong> Tier, industry, size</li>\n        <li><strong>Resolution Type:</strong> Fix, workaround, education, escalation</li>\n      </ul>\n      \n      <h4>Implementation Process:</h4>\n      <ol>\n        <li>Audit existing tickets</li>\n        <li>Define categories and tags</li>\n        <li>Train support team</li>\n        <li>Implement in ticketing system</li>\n        <li>Create routing rules</li>\n        <li>Generate insights reports</li>\n      </ol>\n    ",
      "examples": [
        "30% of tickets are password resets → Add self-service",
        "Integration issues spike after updates → Improve testing",
        "Enterprise customers need phone support → Add channel"
      ],
      "keyMetrics": [
        {
          "value": "40%",
          "label": "Lower Churn",
          "description": "Retention system impact"
        },
        {
          "value": "3.2x",
          "label": "Higher LTV",
          "description": "Customer lifetime value"
        },
        {
          "value": "65%",
          "label": "Better NPS",
          "description": "Customer satisfaction"
        },
        {
          "value": "2.5x",
          "label": "More Advocacy",
          "description": "Customer referrals"
        }
      ]
    },
    "workspace": {
      "domain": "Champion Mapping",
      "questions": [
        {
          "id": "8-4-q1",
          "text": "What is your current strategy for Champion Mapping?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Champion Mapping for ST6Co/ScaleOps6Product"
        },
        {
          "id": "8-4-q2",
          "text": "How do you measure success in Champion Mapping?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Champion Mapping for ST6Co/ScaleOps6Product"
        },
        {
          "id": "8-4-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Champion Mapping for ST6Co/ScaleOps6Product"
        },
        {
          "id": "8-4-q4",
          "text": "What specific evidence demonstrates your Champion Mapping effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "8-4-q5",
          "text": "What are your next steps to improve Champion Mapping?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Sales Training (Gong, MindTickle)",
        "Battle Cards (Klue, Crayon)",
        "Role Play Tools (Second Nature)",
        "Knowledge Base (Guru, Showpad)"
      ],
      "templates": [
        "Objection Handling Guide",
        "Battle Card Template",
        "Win/Loss Analysis Form",
        "Competitive Positioning Matrix"
      ],
      "bestPractices": [
        "Practice objection handling regularly",
        "Document all objections heard",
        "Use feel-felt-found framework",
        "Turn objections into discovery"
      ]
    },
    "analysis": {
      "domain": "Champion Mapping",
      "dimensions": [
        {
          "name": "Champion Identification",
          "weight": 20,
          "description": "Finding champions"
        },
        {
          "name": "Relationship Depth",
          "weight": 20,
          "description": "Champion engagement level"
        },
        {
          "name": "Advocacy Actions",
          "weight": 20,
          "description": "Champion activities"
        },
        {
          "name": "Internal Influence",
          "weight": 20,
          "description": "Champion's internal impact"
        },
        {
          "name": "Risk Mitigation",
          "weight": 20,
          "description": "Champion retention"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No champion strategy",
        "26-50": "Few champions identified",
        "51-75": "Good champion program",
        "76-90": "Strong champion network",
        "91-100": "Champion excellence"
      }
    },
    "resources": {
      "domain": "Champion Mapping",
      "templates": [
        "Champion Identification Guide",
        "Stakeholder Map",
        "Executive Sponsor Playbook"
      ],
      "metrics": [
        "Ticket volume by category",
        "Resolution time by type",
        "Deflection rate",
        "First contact resolution"
      ]
    },
    "outputs": {
      "domain": "Champion Mapping",
      "templates": [
        "Champion Identification Guide",
        "Stakeholder Map",
        "Executive Sponsor Playbook"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "8-3"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "8-5": {
    "id": "8-5",
    "name": "CSAT/NPS Tracking",
    "blockId": 8,
    "blockName": "Customer Success Expansion",
    "subId": 5,
    "phase": 4,
    "phaseName": "Scaling Impact",
    "category": "expansion",
    "agent": {
      "name": "Sentiment Tracker",
      "key": "8e",
      "description": "Tracks and analyzes customer sentiment",
      "domain": "CSAT/NPS Tracking"
    },
    "education": {
      "title": "CSAT/NPS Tracking",
      "what": "A systematic approach to csat/nps tracking that tracks and analyzes customer sentiment. Evaluates sentiment measurement, trend analysis, driver identification, alert systems, response actions to ensure excellence and continuous improvement in this critical capability.",
      "why": "Customers prefer self-service for simple issues. A good knowledge base reduces support costs, improves satisfaction, and enables 24/7 support.",
      "how": "\n      <h4>Content Categories:</h4>\n      <ul>\n        <li><strong>Getting Started:</strong> Onboarding and setup</li>\n        <li><strong>How-To Guides:</strong> Step-by-step instructions</li>\n        <li><strong>Troubleshooting:</strong> Common problems and solutions</li>\n        <li><strong>Best Practices:</strong> Tips and recommendations</li>\n        <li><strong>API/Technical:</strong> Developer documentation</li>\n      </ul>\n      \n      <h4>Structure Best Practices:</h4>\n      <ol>\n        <li>Organize by user journey</li>\n        <li>Use clear naming conventions</li>\n        <li>Include search functionality</li>\n        <li>Add multimedia content</li>\n        <li>Enable user feedback</li>\n        <li>Track usage analytics</li>\n      </ol>\n    ",
      "examples": [
        "70% ticket deflection rate with self-service",
        "Average article rating: 4.5/5 stars",
        "Most viewed: 'Getting Started in 5 Minutes'"
      ],
      "keyMetrics": [
        {
          "value": "40%",
          "label": "Lower Churn",
          "description": "Retention system impact"
        },
        {
          "value": "3.2x",
          "label": "Higher LTV",
          "description": "Customer lifetime value"
        },
        {
          "value": "65%",
          "label": "Better NPS",
          "description": "Customer satisfaction"
        },
        {
          "value": "2.5x",
          "label": "More Advocacy",
          "description": "Customer referrals"
        }
      ]
    },
    "workspace": {
      "domain": "CSAT/NPS Tracking",
      "questions": [
        {
          "id": "8-5-q1",
          "text": "What is your current strategy for CSAT/NPS Tracking?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about CSAT/NPS Tracking for ST6Co/ScaleOps6Product"
        },
        {
          "id": "8-5-q2",
          "text": "How do you measure success in CSAT/NPS Tracking?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about CSAT/NPS Tracking for ST6Co/ScaleOps6Product"
        },
        {
          "id": "8-5-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about CSAT/NPS Tracking for ST6Co/ScaleOps6Product"
        },
        {
          "id": "8-5-q4",
          "text": "What specific evidence demonstrates your CSAT/NPS Tracking effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "8-5-q5",
          "text": "What are your next steps to improve CSAT/NPS Tracking?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Commission Calculators (CaptivateIQ, Spiff)",
        "Compensation Benchmarking (Pave, Radford)",
        "Territory Planning (Fullcast, Openprise)",
        "SPM Platforms (Xactly, Varicent)"
      ],
      "templates": [
        "Comp Plan Calculator",
        "Commission Agreement",
        "Quota Setting Framework",
        "Territory Assignment Model"
      ],
      "bestPractices": [
        "Keep plans simple and transparent",
        "Align incentives with company goals",
        "Pay commissions promptly",
        "Review and adjust quarterly"
      ]
    },
    "analysis": {
      "domain": "CSAT/NPS Tracking",
      "dimensions": [
        {
          "name": "Sentiment Measurement",
          "weight": 20,
          "description": "Sentiment tracking methods"
        },
        {
          "name": "Trend Analysis",
          "weight": 20,
          "description": "Sentiment trend monitoring"
        },
        {
          "name": "Driver Identification",
          "weight": 20,
          "description": "Sentiment driver analysis"
        },
        {
          "name": "Alert Systems",
          "weight": 20,
          "description": "Sentiment alert triggers"
        },
        {
          "name": "Response Actions",
          "weight": 20,
          "description": "Sentiment-based actions"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No sentiment tracking",
        "26-50": "Basic sentiment awareness",
        "51-75": "Good sentiment monitoring",
        "76-90": "Strong sentiment program",
        "91-100": "Sentiment mastery"
      }
    },
    "resources": {
      "domain": "CSAT/NPS Tracking",
      "templates": [
        "CSAT Survey Template",
        "NPS Dashboard",
        "Feedback Action Plan"
      ],
      "metrics": [
        "Article views",
        "Search success rate",
        "Deflection rate",
        "Content freshness"
      ]
    },
    "outputs": {
      "domain": "CSAT/NPS Tracking",
      "templates": [
        "CSAT Survey Template",
        "NPS Dashboard",
        "Feedback Action Plan"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "8-4"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "8-6": {
    "id": "8-6",
    "name": "Renewal Readiness Tracker",
    "blockId": 8,
    "blockName": "Customer Success Expansion",
    "subId": 6,
    "phase": 4,
    "phaseName": "Scaling Impact",
    "category": "expansion",
    "agent": {
      "name": "Renewal Readiness Expert",
      "key": "8f",
      "description": "Ensures renewal readiness and success",
      "domain": "Renewal Readiness Tracker"
    },
    "education": {
      "title": "Renewal Readiness Tracker",
      "what": "A predictive model and process for estimating customer renewal probability and revenue retention rates.",
      "why": "Renewals are the lifeblood of SaaS. Accurate forecasting enables proactive intervention, better resource planning, and investor confidence.",
      "how": "\n      <h4>Forecasting Factors:</h4>\n      <ul>\n        <li><strong>Health Score:</strong> Current customer health</li>\n        <li><strong>Usage Trends:</strong> Increasing or decreasing</li>\n        <li><strong>Engagement:</strong> Stakeholder involvement</li>\n        <li><strong>Value Delivery:</strong> ROI achievement</li>\n        <li><strong>Competitive Threats:</strong> Alternative evaluations</li>\n      </ul>\n      \n      <h4>Forecasting Process:</h4>\n      <ol>\n        <li>Segment customers by renewal date</li>\n        <li>Assess renewal probability</li>\n        <li>Identify at-risk accounts</li>\n        <li>Create intervention plans</li>\n        <li>Track forecast accuracy</li>\n        <li>Refine model quarterly</li>\n      </ol>\n    ",
      "examples": [
        "Q4 forecast: 92% gross retention, 105% net retention",
        "30 days out: 95% forecast accuracy",
        "Intervention success: 60% of at-risk saved"
      ],
      "keyMetrics": [
        {
          "value": "40%",
          "label": "Lower Churn",
          "description": "Retention system impact"
        },
        {
          "value": "3.2x",
          "label": "Higher LTV",
          "description": "Customer lifetime value"
        },
        {
          "value": "65%",
          "label": "Better NPS",
          "description": "Customer satisfaction"
        },
        {
          "value": "2.5x",
          "label": "More Advocacy",
          "description": "Customer referrals"
        }
      ]
    },
    "workspace": {
      "domain": "Renewal Readiness Tracker",
      "questions": [
        {
          "id": "8-6-q1",
          "text": "What is your current strategy for Renewal Readiness Tracker?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Renewal Readiness Tracker for ST6Co/ScaleOps6Product"
        },
        {
          "id": "8-6-q2",
          "text": "How do you measure success in Renewal Readiness Tracker?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Renewal Readiness Tracker for ST6Co/ScaleOps6Product"
        },
        {
          "id": "8-6-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Renewal Readiness Tracker for ST6Co/ScaleOps6Product"
        },
        {
          "id": "8-6-q4",
          "text": "What specific evidence demonstrates your Renewal Readiness Tracker effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "8-6-q5",
          "text": "What are your next steps to improve Renewal Readiness Tracker?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "CRM Systems (Salesforce, HubSpot)",
        "Forecasting Tools (Clari, BoostUp)",
        "Pipeline Analytics (Gong, Chorus)",
        "Deal Desk Tools (DealHub, Conga)"
      ],
      "templates": [
        "Pipeline Review Agenda",
        "Deal Inspection Checklist",
        "Forecast Call Script",
        "MEDDICC Scorecard"
      ],
      "bestPractices": [
        "Review pipeline weekly minimum",
        "Inspect deals not just metrics",
        "Focus on next steps and blockers",
        "Track conversion rates by stage"
      ]
    },
    "analysis": {
      "domain": "Renewal Readiness Tracker",
      "dimensions": [
        {
          "name": "Renewal Process",
          "weight": 20,
          "description": "Renewal process maturity"
        },
        {
          "name": "Early Engagement",
          "weight": 20,
          "description": "Renewal conversation timing"
        },
        {
          "name": "Value Documentation",
          "weight": 20,
          "description": "Value proof for renewal"
        },
        {
          "name": "Risk Identification",
          "weight": 20,
          "description": "Renewal risk detection"
        },
        {
          "name": "Renewal Rates",
          "weight": 20,
          "description": "Renewal success metrics"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Poor renewal rates",
        "26-50": "Basic renewal process",
        "51-75": "Good renewal program",
        "76-90": "Strong renewal success",
        "91-100": "Renewal excellence"
      }
    },
    "resources": {
      "domain": "Renewal Readiness Tracker",
      "templates": [
        "Renewal Forecast Model",
        "Account Review Template",
        "Save Plan Playbook"
      ],
      "metrics": [
        "Gross retention rate",
        "Net retention rate",
        "Forecast accuracy",
        "Save rate"
      ]
    },
    "outputs": {
      "domain": "Renewal Readiness Tracker",
      "templates": [
        "Renewal Forecast Model",
        "Account Review Template",
        "Save Plan Playbook"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "8-5"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "9-1": {
    "id": "9-1",
    "name": "Inbound Conversion Rates",
    "blockId": 9,
    "blockName": "Proof Execution",
    "subId": 1,
    "phase": 4,
    "phaseName": "Scaling Impact",
    "category": "sales",
    "agent": {
      "name": "Inbound Conversion Analyst",
      "key": "9a",
      "description": "Optimizes inbound lead conversion",
      "domain": "Inbound Conversion Rates"
    },
    "education": {
      "title": "Inbound Conversion Rates",
      "what": "The percentage of inbound leads (from website visits, content, referrals, etc.) that convert to signups, demos, or deals — measured across key funnel stages.",
      "why": "Inbound is your early test of product-led growth, marketing effectiveness, and messaging clarity. It also serves as a source of cheap, scalable pipeline.",
      "how": "\n      <h4>Conversion Funnel Stages:</h4>\n      <ol>\n        <li><strong>Traffic → Visitor:</strong> Site visits from all sources</li>\n        <li><strong>Visitor → Lead:</strong> Email capture or signup</li>\n        <li><strong>Lead → MQL:</strong> Marketing qualified lead</li>\n        <li><strong>MQL → SQL:</strong> Sales qualified lead</li>\n        <li><strong>SQL → Opportunity:</strong> Active deal</li>\n        <li><strong>Opportunity → Customer:</strong> Closed won</li>\n      </ol>\n      \n      <h4>Optimization Tactics:</h4>\n      <ul>\n        <li>A/B test landing pages and CTAs</li>\n        <li>Improve page load speed</li>\n        <li>Clarify value proposition</li>\n        <li>Add social proof and urgency</li>\n        <li>Reduce form fields</li>\n        <li>Implement exit intent popups</li>\n      </ul>\n      \n      <h4>Tracking Setup:</h4>\n      <ul>\n        <li>Implement Google Analytics 4</li>\n        <li>Set up conversion goals</li>\n        <li>Use UTM parameters consistently</li>\n        <li>Connect to CRM for full funnel view</li>\n        <li>Create attribution reports</li>\n      </ul>\n    ",
      "examples": [
        "Homepage → Signup: 3.5% (industry avg: 2.35%)",
        "Blog → Lead: 2.1% conversion rate",
        "Demo Request → Customer: 22% close rate"
      ],
      "keyMetrics": [
        {
          "value": "45%",
          "label": "Higher Win Rates",
          "description": "Sales excellence impact"
        },
        {
          "value": "30%",
          "label": "Faster Cycles",
          "description": "Optimized sales process"
        },
        {
          "value": "2.2x",
          "label": "Larger Deals",
          "description": "Strategic selling approach"
        },
        {
          "value": "60%",
          "label": "Better Forecasting",
          "description": "Pipeline accuracy"
        }
      ]
    },
    "workspace": {
      "domain": "Inbound Conversion Rates",
      "questions": [
        {
          "id": "9-1-q1",
          "text": "What is your current strategy for Inbound Conversion Rates?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Inbound Conversion Rates for ST6Co/ScaleOps6Product"
        },
        {
          "id": "9-1-q2",
          "text": "How do you measure success in Inbound Conversion Rates?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Inbound Conversion Rates for ST6Co/ScaleOps6Product"
        },
        {
          "id": "9-1-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Inbound Conversion Rates for ST6Co/ScaleOps6Product"
        },
        {
          "id": "9-1-q4",
          "text": "What specific evidence demonstrates your Inbound Conversion Rates effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "9-1-q5",
          "text": "What are your next steps to improve Inbound Conversion Rates?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Analytics Tools (Google Analytics, Mixpanel)",
        "A/B Testing (Optimizely, VWO)",
        "Landing Page Builders (Unbounce, Leadpages)",
        "Marketing Automation (HubSpot, Marketo)"
      ],
      "templates": [
        "Conversion Tracking Sheet",
        "A/B Test Framework",
        "Funnel Analysis Template",
        "Landing Page Checklist"
      ],
      "bestPractices": [
        "Test one variable at a time",
        "Run tests for statistical significance",
        "Focus on micro-conversions too",
        "Document all test results"
      ]
    },
    "analysis": {
      "domain": "Inbound Conversion Rates",
      "dimensions": [
        {
          "name": "Lead Quality",
          "weight": 20,
          "description": "Inbound lead quality scores"
        },
        {
          "name": "Response Time",
          "weight": 20,
          "description": "Speed of lead response"
        },
        {
          "name": "Conversion Rates",
          "weight": 20,
          "description": "Lead to opportunity conversion"
        },
        {
          "name": "Nurture Programs",
          "weight": 20,
          "description": "Lead nurturing effectiveness"
        },
        {
          "name": "Attribution Analysis",
          "weight": 20,
          "description": "Source attribution accuracy"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Poor inbound conversion",
        "26-50": "Basic lead handling",
        "51-75": "Good conversion process",
        "76-90": "Strong inbound engine",
        "91-100": "Inbound excellence"
      }
    },
    "resources": {
      "domain": "Inbound Conversion Rates",
      "templates": [
        "Conversion Tracking Sheet",
        "A/B Test Framework",
        "Funnel Analysis Template"
      ],
      "metrics": [
        "Conversion rate by stage",
        "Cost per acquisition",
        "Time to conversion",
        "Channel performance"
      ]
    },
    "outputs": {
      "domain": "Inbound Conversion Rates",
      "templates": [
        "Conversion Tracking Sheet",
        "A/B Test Framework",
        "Funnel Analysis Template"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "9-2": {
    "id": "9-2",
    "name": "Outbound Play Performance",
    "blockId": 9,
    "blockName": "Proof Execution",
    "subId": 2,
    "phase": 4,
    "phaseName": "Scaling Impact",
    "category": "sales",
    "agent": {
      "name": "Outbound Performance Tracker",
      "key": "9b",
      "description": "Tracks outbound sales performance",
      "domain": "Outbound Play Performance"
    },
    "education": {
      "title": "Outbound Play Performance",
      "what": "The performance of cold outbound sales efforts — such as SDR/BDR email campaigns, cold calling, LinkedIn outreach, or targeted gifting.",
      "why": "Outbound tests your narrative, your ICP fit, and your ability to generate demand without waiting for it. Done right, it's the fastest way to learn how to sell.",
      "how": "\n      <h4>Outbound Sequence Design:</h4>\n      <ol>\n        <li><strong>Research:</strong> Build targeted prospect lists</li>\n        <li><strong>Personalization:</strong> Customize first 2 lines</li>\n        <li><strong>Multi-touch:</strong> 7-12 touches over 3 weeks</li>\n        <li><strong>Multi-channel:</strong> Email + LinkedIn + Phone</li>\n        <li><strong>Value-first:</strong> Lead with insight, not pitch</li>\n        <li><strong>Clear CTA:</strong> One specific next step</li>\n      </ol>\n      \n      <h4>Performance Optimization:</h4>\n      <ul>\n        <li>Test subject lines (aim for 30%+ open rate)</li>\n        <li>Refine targeting (quality over quantity)</li>\n        <li>A/B test messaging angles</li>\n        <li>Optimize send times and days</li>\n        <li>Track reply sentiment</li>\n        <li>Iterate based on objections</li>\n      </ul>\n      \n      <h4>Tech Stack Setup:</h4>\n      <ul>\n        <li>Sales engagement platform (Outreach, Salesloft)</li>\n        <li>Data enrichment (ZoomInfo, Apollo)</li>\n        <li>Email warming and deliverability</li>\n        <li>Call recording and analysis</li>\n        <li>CRM integration for tracking</li>\n      </ul>\n    ",
      "examples": [
        "Cold email: 8% reply rate, 2% meeting booked",
        "LinkedIn: 15% acceptance, 5% response rate",
        "Cold call: 3% connect rate, 25% meeting conversion"
      ],
      "keyMetrics": [
        {
          "value": "45%",
          "label": "Higher Win Rates",
          "description": "Sales excellence impact"
        },
        {
          "value": "30%",
          "label": "Faster Cycles",
          "description": "Optimized sales process"
        },
        {
          "value": "2.2x",
          "label": "Larger Deals",
          "description": "Strategic selling approach"
        },
        {
          "value": "60%",
          "label": "Better Forecasting",
          "description": "Pipeline accuracy"
        }
      ]
    },
    "workspace": {
      "domain": "Outbound Play Performance",
      "questions": [
        {
          "id": "9-2-q1",
          "text": "What is your current strategy for Outbound Play Performance?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Outbound Play Performance for ST6Co/ScaleOps6Product"
        },
        {
          "id": "9-2-q2",
          "text": "How do you measure success in Outbound Play Performance?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Outbound Play Performance for ST6Co/ScaleOps6Product"
        },
        {
          "id": "9-2-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Outbound Play Performance for ST6Co/ScaleOps6Product"
        },
        {
          "id": "9-2-q4",
          "text": "What specific evidence demonstrates your Outbound Play Performance effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "9-2-q5",
          "text": "What are your next steps to improve Outbound Play Performance?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Sales Engagement (Outreach, Salesloft)",
        "Data Providers (ZoomInfo, Apollo.io)",
        "Email Tools (Mailshake, Lemlist)",
        "CRM Systems (Salesforce, HubSpot)"
      ],
      "templates": [
        "Outbound Sequence Template",
        "Cold Email Scripts",
        "Objection Handling Matrix",
        "Prospect Research Checklist"
      ],
      "bestPractices": [
        "Personalize first 2 lines always",
        "Follow up 7-12 times minimum",
        "Test subject lines rigorously",
        "Track reply sentiment, not just rate"
      ]
    },
    "analysis": {
      "domain": "Outbound Play Performance",
      "dimensions": [
        {
          "name": "Activity Metrics",
          "weight": 20,
          "description": "Outbound activity levels"
        },
        {
          "name": "Response Rates",
          "weight": 20,
          "description": "Outbound response rates"
        },
        {
          "name": "Meeting Conversion",
          "weight": 20,
          "description": "Activity to meeting rate"
        },
        {
          "name": "Personalization",
          "weight": 20,
          "description": "Outreach personalization"
        },
        {
          "name": "Sequence Optimization",
          "weight": 20,
          "description": "Outbound sequence performance"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Ineffective outbound",
        "26-50": "Basic outbound efforts",
        "51-75": "Good outbound program",
        "76-90": "Strong outbound results",
        "91-100": "Outbound mastery"
      }
    },
    "resources": {
      "domain": "Outbound Play Performance",
      "templates": [
        "Outbound Sequence Template",
        "Cold Email Scripts",
        "Objection Handling Matrix"
      ],
      "metrics": [
        "Open and reply rates",
        "Meeting booked rate",
        "Pipeline generated",
        "Cost per meeting"
      ]
    },
    "outputs": {
      "domain": "Outbound Play Performance",
      "templates": [
        "Outbound Sequence Template",
        "Cold Email Scripts",
        "Objection Handling Matrix"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "9-1"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "9-3": {
    "id": "9-3",
    "name": "Channel Economics Clarity",
    "blockId": 9,
    "blockName": "Proof Execution",
    "subId": 3,
    "phase": 4,
    "phaseName": "Scaling Impact",
    "category": "sales",
    "agent": {
      "name": "Channel Economics Expert",
      "key": "9c",
      "description": "Analyzes channel economics and efficiency",
      "domain": "Channel Economics Clarity"
    },
    "education": {
      "title": "Channel Economics Clarity",
      "what": "Comprehensive tracking and analysis of marketing and sales channel effectiveness, measuring contribution to pipeline and revenue across all GTM channels.",
      "why": "Understanding channel performance enables optimal resource allocation, budget optimization, and strategic focus on highest-ROI activities.",
      "how": "Implement multi-touch attribution, track full-funnel metrics by channel, calculate true CAC including overhead, and continuously optimize channel mix based on performance data.",
      "examples": [
        "B2B SaaS tracking paid search delivers 3x ROI vs display ads",
        "Enterprise software finding partner channel drives 40% of revenue",
        "Tech startup discovering content marketing has lowest CAC"
      ],
      "keyMetrics": [
        {
          "value": "45%",
          "label": "Higher Win Rates",
          "description": "Sales excellence impact"
        },
        {
          "value": "30%",
          "label": "Faster Cycles",
          "description": "Optimized sales process"
        },
        {
          "value": "2.2x",
          "label": "Larger Deals",
          "description": "Strategic selling approach"
        },
        {
          "value": "60%",
          "label": "Better Forecasting",
          "description": "Pipeline accuracy"
        }
      ]
    },
    "workspace": {
      "domain": "Channel Economics Clarity",
      "questions": [
        {
          "id": "9-3-q1",
          "text": "What is your current strategy for Channel Economics Clarity?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Channel Economics Clarity for ST6Co/ScaleOps6Product"
        },
        {
          "id": "9-3-q2",
          "text": "How do you measure success in Channel Economics Clarity?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Channel Economics Clarity for ST6Co/ScaleOps6Product"
        },
        {
          "id": "9-3-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Channel Economics Clarity for ST6Co/ScaleOps6Product"
        },
        {
          "id": "9-3-q4",
          "text": "What specific evidence demonstrates your Channel Economics Clarity effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "9-3-q5",
          "text": "What are your next steps to improve Channel Economics Clarity?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Attribution (Bizible, Dreamdata)",
        "Channel Analytics (Google Analytics, Mixpanel)",
        "Marketing Automation (HubSpot, Marketo)",
        "Social Analytics (Sprout Social, Hootsuite)"
      ],
      "templates": [
        "Channel Performance Dashboard",
        "CAC by Channel Report",
        "Channel Mix Model",
        "Attribution Report Template"
      ],
      "bestPractices": [
        "Track full funnel by channel",
        "Calculate true CAC including overhead",
        "Test new channels with small budgets",
        "Double down on what works"
      ]
    },
    "analysis": {
      "domain": "Channel Economics Clarity",
      "dimensions": [
        {
          "name": "CAC by Channel",
          "weight": 20,
          "description": "Customer acquisition costs"
        },
        {
          "name": "Channel ROI",
          "weight": 20,
          "description": "Return on channel investment"
        },
        {
          "name": "Channel Mix",
          "weight": 20,
          "description": "Optimal channel balance"
        },
        {
          "name": "Efficiency Metrics",
          "weight": 20,
          "description": "Channel efficiency KPIs"
        },
        {
          "name": "Scale Potential",
          "weight": 20,
          "description": "Channel scalability"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Poor channel economics",
        "26-50": "Basic channel tracking",
        "51-75": "Good channel analysis",
        "76-90": "Strong channel optimization",
        "91-100": "Channel excellence"
      }
    },
    "resources": {
      "domain": "Channel Economics Clarity",
      "templates": [
        "Channel Performance Dashboard",
        "CAC by Channel Report",
        "Channel Mix Model"
      ],
      "metrics": [
        "Channel ROI",
        "CAC by Channel",
        "Conversion Rate by Channel",
        "Revenue Attribution"
      ]
    },
    "outputs": {
      "domain": "Channel Economics Clarity",
      "templates": [
        "Channel Performance Dashboard",
        "CAC by Channel Report",
        "Channel Mix Model"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "9-2"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "9-4": {
    "id": "9-4",
    "name": "Discovery Call Effectiveness",
    "blockId": 9,
    "blockName": "Proof Execution",
    "subId": 4,
    "phase": 4,
    "phaseName": "Scaling Impact",
    "category": "sales",
    "agent": {
      "name": "Discovery Call Evaluator",
      "key": "9d",
      "description": "Evaluates discovery call effectiveness",
      "domain": "Discovery Call Effectiveness"
    },
    "education": {
      "title": "Discovery Call Effectiveness",
      "what": "A systematic approach to discovery call effectiveness that evaluates discovery call effectiveness. Evaluates call structure, question quality, pain uncovering, next step rate, rep consistency to ensure excellence and continuous improvement in this critical capability.",
      "why": "Faster sales velocity means more efficient revenue generation, better cash flow, and improved sales productivity.",
      "how": "Track four key components: number of opportunities, average deal size, win rate, and sales cycle length. Monitor by segment and rep to identify improvement opportunities.",
      "examples": [
        "SaaS company reducing sales cycle from 90 to 60 days",
        "Enterprise vendor identifying technical review as primary bottleneck",
        "Startup improving velocity 2x through better qualification"
      ],
      "keyMetrics": [
        {
          "value": "45%",
          "label": "Higher Win Rates",
          "description": "Sales excellence impact"
        },
        {
          "value": "30%",
          "label": "Faster Cycles",
          "description": "Optimized sales process"
        },
        {
          "value": "2.2x",
          "label": "Larger Deals",
          "description": "Strategic selling approach"
        },
        {
          "value": "60%",
          "label": "Better Forecasting",
          "description": "Pipeline accuracy"
        }
      ]
    },
    "workspace": {
      "domain": "Discovery Call Effectiveness",
      "questions": [
        {
          "id": "9-4-q1",
          "text": "What is your current strategy for Discovery Call Effectiveness?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Discovery Call Effectiveness for ST6Co/ScaleOps6Product"
        },
        {
          "id": "9-4-q2",
          "text": "How do you measure success in Discovery Call Effectiveness?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Discovery Call Effectiveness for ST6Co/ScaleOps6Product"
        },
        {
          "id": "9-4-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Discovery Call Effectiveness for ST6Co/ScaleOps6Product"
        },
        {
          "id": "9-4-q4",
          "text": "What specific evidence demonstrates your Discovery Call Effectiveness effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "9-4-q5",
          "text": "What are your next steps to improve Discovery Call Effectiveness?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "CRM Analytics (Salesforce, HubSpot)",
        "Sales Intelligence (Gong, Clari)",
        "Pipeline Management (Pipedrive, Close)",
        "Forecasting (InsightSquared, Aviso)"
      ],
      "templates": [
        "Sales Velocity Calculator",
        "Pipeline Velocity Dashboard",
        "Deal Progression Tracker",
        "Velocity Improvement Plan"
      ],
      "bestPractices": [
        "Track velocity by segment and rep",
        "Identify and remove bottlenecks",
        "Focus on quality over quantity",
        "Set velocity improvement goals"
      ]
    },
    "analysis": {
      "domain": "Discovery Call Effectiveness",
      "dimensions": [
        {
          "name": "Call Structure",
          "weight": 20,
          "description": "Discovery call framework"
        },
        {
          "name": "Question Quality",
          "weight": 20,
          "description": "Discovery question effectiveness"
        },
        {
          "name": "Pain Uncovering",
          "weight": 20,
          "description": "Pain point identification"
        },
        {
          "name": "Next Step Rate",
          "weight": 20,
          "description": "Progression to next stage"
        },
        {
          "name": "Rep Consistency",
          "weight": 20,
          "description": "Consistent discovery quality"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Poor discovery process",
        "26-50": "Basic discovery calls",
        "51-75": "Good discovery practice",
        "76-90": "Strong discovery excellence",
        "91-100": "Discovery mastery"
      }
    },
    "resources": {
      "domain": "Discovery Call Effectiveness",
      "templates": [
        "Discovery Call Script",
        "Qualification Framework",
        "Call Analysis Template"
      ],
      "metrics": [
        "Sales Velocity",
        "Stage Duration",
        "Cycle Time",
        "Deal Velocity by Rep"
      ]
    },
    "outputs": {
      "domain": "Discovery Call Effectiveness",
      "templates": [
        "Discovery Call Script",
        "Qualification Framework",
        "Call Analysis Template"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "9-3"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "9-5": {
    "id": "9-5",
    "name": "Demo-to-Close Flow",
    "blockId": 9,
    "blockName": "Proof Execution",
    "subId": 5,
    "phase": 4,
    "phaseName": "Scaling Impact",
    "category": "sales",
    "agent": {
      "name": "Demo-to-Close Optimizer",
      "key": "9e",
      "description": "Optimizes demo to close conversion",
      "domain": "Demo-to-Close Flow"
    },
    "education": {
      "title": "Demo-to-Close Flow",
      "what": "A systematic approach to demo-to-close flow that optimizes demo to close conversion. Evaluates demo quality, customization level, follow-up process, objection handling, close rates to ensure excellence and continuous improvement in this critical capability.",
      "why": "Understanding why you win and lose deals enables sales process improvement, better positioning, and more accurate forecasting.",
      "how": "Conduct structured win/loss interviews, analyze patterns across deals, track win rates by competitor, segment, and source.",
      "examples": [
        "Enterprise software achieving 45% win rate against main competitor",
        "SaaS startup improving win rate from 20% to 35% through better discovery",
        "Tech company identifying pricing as primary loss reason"
      ],
      "keyMetrics": [
        {
          "value": "45%",
          "label": "Higher Win Rates",
          "description": "Sales excellence impact"
        },
        {
          "value": "30%",
          "label": "Faster Cycles",
          "description": "Optimized sales process"
        },
        {
          "value": "2.2x",
          "label": "Larger Deals",
          "description": "Strategic selling approach"
        },
        {
          "value": "60%",
          "label": "Better Forecasting",
          "description": "Pipeline accuracy"
        }
      ]
    },
    "workspace": {
      "domain": "Demo-to-Close Flow",
      "questions": [
        {
          "id": "9-5-q1",
          "text": "What is your current strategy for Demo-to-Close Flow?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Demo-to-Close Flow for ST6Co/ScaleOps6Product"
        },
        {
          "id": "9-5-q2",
          "text": "How do you measure success in Demo-to-Close Flow?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Demo-to-Close Flow for ST6Co/ScaleOps6Product"
        },
        {
          "id": "9-5-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Demo-to-Close Flow for ST6Co/ScaleOps6Product"
        },
        {
          "id": "9-5-q4",
          "text": "What specific evidence demonstrates your Demo-to-Close Flow effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "9-5-q5",
          "text": "What are your next steps to improve Demo-to-Close Flow?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Win/Loss Platforms (Clozd, DoubleCheck)",
        "CRM Reporting (Salesforce, HubSpot)",
        "Conversation Intelligence (Gong, Chorus)",
        "Analytics (Tableau, Looker)"
      ],
      "templates": [
        "Win Rate Dashboard",
        "Competitive Win/Loss Matrix",
        "Deal Analysis Framework",
        "Win Rate Improvement Plan"
      ],
      "bestPractices": [
        "Track win rate by source, segment, competitor",
        "Analyze wins and losses equally",
        "Share insights across team",
        "Set win rate targets by segment"
      ]
    },
    "analysis": {
      "domain": "Demo-to-Close Flow",
      "dimensions": [
        {
          "name": "Demo Quality",
          "weight": 20,
          "description": "Demo effectiveness"
        },
        {
          "name": "Customization Level",
          "weight": 20,
          "description": "Demo personalization"
        },
        {
          "name": "Follow-up Process",
          "weight": 20,
          "description": "Post-demo engagement"
        },
        {
          "name": "Objection Handling",
          "weight": 20,
          "description": "Objection resolution"
        },
        {
          "name": "Close Rates",
          "weight": 20,
          "description": "Demo to close conversion"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Poor demo conversion",
        "26-50": "Basic demo process",
        "51-75": "Good demo performance",
        "76-90": "Strong demo results",
        "91-100": "Demo excellence"
      }
    },
    "resources": {
      "domain": "Demo-to-Close Flow",
      "templates": [
        "Demo Script Template",
        "Demo Preparation Guide",
        "Follow-up Sequence"
      ],
      "metrics": [
        "Overall Win Rate",
        "Competitive Win Rate",
        "Win Rate by Source",
        "Win Rate Trend"
      ]
    },
    "outputs": {
      "domain": "Demo-to-Close Flow",
      "templates": [
        "Demo Script Template",
        "Demo Preparation Guide",
        "Follow-up Sequence"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "9-4"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "9-6": {
    "id": "9-6",
    "name": "Founders Selling Model",
    "blockId": 9,
    "blockName": "Proof Execution",
    "subId": 6,
    "phase": 4,
    "phaseName": "Scaling Impact",
    "category": "sales",
    "agent": {
      "name": "Founder Sales Analyst",
      "key": "9f",
      "description": "Analyzes founder-led sales effectiveness",
      "domain": "Founders Selling Model"
    },
    "education": {
      "title": "Founders Selling Model",
      "what": "A structured founders selling model that provides clear guidelines and methodologies for analyzes founder-led sales effectiveness. Focuses on founder involvement, deal impact, knowledge transfer, scalability planning, time allocation to ensure comprehensive coverage and measurable outcomes.",
      "why": "Proper pipeline coverage reduces revenue risk, enables accurate forecasting, and drives proactive pipeline generation.",
      "how": "Maintain 3-4x pipeline coverage, track by stage and time period, build pipeline 2 quarters ahead, adjust targets by segment.",
      "examples": [
        "B2B company maintaining 3.5x quarterly pipeline coverage",
        "SaaS startup building pipeline 6 months ahead of need",
        "Enterprise vendor tracking coverage by product line"
      ],
      "keyMetrics": [
        {
          "value": "45%",
          "label": "Higher Win Rates",
          "description": "Sales excellence impact"
        },
        {
          "value": "30%",
          "label": "Faster Cycles",
          "description": "Optimized sales process"
        },
        {
          "value": "2.2x",
          "label": "Larger Deals",
          "description": "Strategic selling approach"
        },
        {
          "value": "60%",
          "label": "Better Forecasting",
          "description": "Pipeline accuracy"
        }
      ]
    },
    "workspace": {
      "domain": "Founders Selling Model",
      "questions": [
        {
          "id": "9-6-q1",
          "text": "What is your current strategy for Founders Selling Model?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Founders Selling Model for ST6Co/ScaleOps6Product"
        },
        {
          "id": "9-6-q2",
          "text": "How do you measure success in Founders Selling Model?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Founders Selling Model for ST6Co/ScaleOps6Product"
        },
        {
          "id": "9-6-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Founders Selling Model for ST6Co/ScaleOps6Product"
        },
        {
          "id": "9-6-q4",
          "text": "What specific evidence demonstrates your Founders Selling Model effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "9-6-q5",
          "text": "What are your next steps to improve Founders Selling Model?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Pipeline Analytics (Clari, InsightSquared)",
        "CRM Systems (Salesforce, HubSpot)",
        "Forecasting Tools (Anaplan, Xactly)",
        "BI Platforms (Tableau, Domo)"
      ],
      "templates": [
        "Pipeline Coverage Calculator",
        "Coverage Ratio Dashboard",
        "Pipeline Generation Plan",
        "Coverage Gap Analysis"
      ],
      "bestPractices": [
        "Maintain 3-4x pipeline coverage",
        "Track coverage by stage and month",
        "Build pipeline 2 quarters ahead",
        "Adjust coverage targets by segment"
      ]
    },
    "analysis": {
      "domain": "Founders Selling Model",
      "dimensions": [
        {
          "name": "Founder Involvement",
          "weight": 20,
          "description": "Optimal founder engagement"
        },
        {
          "name": "Deal Impact",
          "weight": 20,
          "description": "Founder influence on deals"
        },
        {
          "name": "Knowledge Transfer",
          "weight": 20,
          "description": "Founder sales insights"
        },
        {
          "name": "Scalability Planning",
          "weight": 20,
          "description": "Transition from founder sales"
        },
        {
          "name": "Time Allocation",
          "weight": 20,
          "description": "Founder time efficiency"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Ineffective founder sales",
        "26-50": "Basic founder involvement",
        "51-75": "Good founder sales",
        "76-90": "Strong founder impact",
        "91-100": "Founder sales mastery"
      }
    },
    "resources": {
      "domain": "Founders Selling Model",
      "templates": [
        "Founder-Led Sales Playbook",
        "Early Sales Process",
        "Customer Development Guide"
      ],
      "metrics": [
        "Pipeline Coverage Ratio",
        "Coverage by Stage",
        "Coverage by Quarter",
        "Pipeline Velocity"
      ]
    },
    "outputs": {
      "domain": "Founders Selling Model",
      "templates": [
        "Founder-Led Sales Playbook",
        "Early Sales Process",
        "Customer Development Guide"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "9-5"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "10-1": {
    "id": "10-1",
    "name": "Enablement Asset Pack",
    "blockId": 10,
    "blockName": "Sales Team Empowerment",
    "subId": 1,
    "phase": 4,
    "phaseName": "Scaling Impact",
    "category": "enablement",
    "agent": {
      "name": "Enablement Asset Manager",
      "key": "10a",
      "description": "Manages sales enablement assets and content",
      "domain": "Enablement Asset Pack"
    },
    "education": {
      "title": "Enablement Asset Pack",
      "what": "A systematic approach to enablement asset pack that manages sales enablement assets and content. Evaluates asset completeness, asset quality, asset accessibility, usage tracking, update frequency to ensure excellence and continuous improvement in this critical capability.",
      "why": "Hiring the wrong salespeople is expensive and slow. A clear profile improves hiring success rate and reduces ramp time.",
      "how": "\n      <h4>Profile Components:</h4>\n      <ul>\n        <li><strong>Experience:</strong> Industry, deal size, sales cycle</li>\n        <li><strong>Skills:</strong> Technical, consultative, presentation</li>\n        <li><strong>Traits:</strong> Curiosity, resilience, coachability</li>\n        <li><strong>Cultural Fit:</strong> Values alignment, work style</li>\n        <li><strong>Performance History:</strong> Quota attainment, references</li>\n      </ul>\n      \n      <h4>Development Process:</h4>\n      <ol>\n        <li>Analyze top performer characteristics</li>\n        <li>Define must-have vs. nice-to-have</li>\n        <li>Create interview scorecard</li>\n        <li>Design assessment exercises</li>\n        <li>Build reference check questions</li>\n        <li>Test and refine profile</li>\n      </ol>\n    ",
      "examples": [
        "Must have: 3+ years B2B SaaS, $50K+ ACV deals",
        "Key trait: Comfortable with ambiguity in early stage",
        "Red flag: Only worked with heavy inbound leads"
      ],
      "keyMetrics": [
        {
          "value": "45%",
          "label": "Higher Win Rates",
          "description": "Sales excellence impact"
        },
        {
          "value": "30%",
          "label": "Faster Cycles",
          "description": "Optimized sales process"
        },
        {
          "value": "2.2x",
          "label": "Larger Deals",
          "description": "Strategic selling approach"
        },
        {
          "value": "60%",
          "label": "Better Forecasting",
          "description": "Pipeline accuracy"
        }
      ]
    },
    "workspace": {
      "domain": "Enablement Asset Pack",
      "questions": [
        {
          "id": "10-1-q1",
          "text": "What gaps exist in your current Enablement Asset Pack materials and tools?",
          "type": "diagnostic",
          "required": true,
          "hint": "Identify missing collateral, outdated content, or ineffective sales tools.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "10-1-q2",
          "text": "What percentage of deals use enablement assets and how does this impact win rates?",
          "type": "quantitative",
          "required": true,
          "hint": "Provide usage statistics and correlation with deal velocity and close rates.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "10-1-q3",
          "text": "How does your enablement strategy support different stages of the sales cycle?",
          "type": "strategic",
          "required": true,
          "hint": "Map specific assets to discovery, demo, evaluation, and closing stages.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "10-1-q4",
          "text": "What feedback validates the effectiveness of your sales materials?",
          "type": "validation",
          "required": false,
          "hint": "Share rep feedback, prospect engagement data, or A/B test results.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "10-1-q5",
          "text": "How do you ensure sales materials stay current and relevant?",
          "type": "diagnostic",
          "required": false,
          "hint": "Describe update cycles, feedback loops, and content governance processes.",
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "10-1-q6",
          "text": "What is your process for creating new enablement assets based on field needs?",
          "type": "strategic",
          "required": false,
          "hint": "Detail how you identify gaps, prioritize creation, and measure impact.",
          "minLength": 100,
          "maxLength": 1000
        }
      ],
      "tools": [],
      "templates": [
        "Sales Candidate Scorecard",
        "Interview Question Bank",
        "Reference Check Guide"
      ],
      "bestPractices": []
    },
    "analysis": {
      "domain": "Enablement Asset Pack",
      "dimensions": [
        {
          "name": "Asset Completeness",
          "weight": 20,
          "description": "Coverage of sales needs"
        },
        {
          "name": "Asset Quality",
          "weight": 20,
          "description": "Effectiveness of materials"
        },
        {
          "name": "Asset Accessibility",
          "weight": 20,
          "description": "Ease of finding/using"
        },
        {
          "name": "Usage Tracking",
          "weight": 20,
          "description": "Asset utilization metrics"
        },
        {
          "name": "Update Frequency",
          "weight": 20,
          "description": "Content freshness"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No enablement assets",
        "26-50": "Basic sales materials",
        "51-75": "Good asset library",
        "76-90": "Strong enablement program",
        "91-100": "World-class enablement"
      }
    },
    "resources": {
      "domain": "Enablement Asset Pack",
      "templates": [
        "Sales Enablement Library",
        "Training Curriculum",
        "Certification Program"
      ],
      "metrics": [
        "Hire success rate",
        "Ramp time to quota",
        "First year attainment",
        "Retention rate"
      ]
    },
    "outputs": {
      "domain": "Enablement Asset Pack",
      "templates": [
        "Sales Enablement Library",
        "Training Curriculum",
        "Certification Program"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "10-2": {
    "id": "10-2",
    "name": "Rep Ramp Plan",
    "blockId": 10,
    "blockName": "Sales Team Empowerment",
    "subId": 2,
    "phase": 4,
    "phaseName": "Scaling Impact",
    "category": "enablement",
    "agent": {
      "name": "Rep Ramp Planner",
      "key": "10b",
      "description": "Optimizes sales rep onboarding and ramp",
      "domain": "Rep Ramp Plan"
    },
    "education": {
      "title": "Rep Ramp Plan",
      "what": "A strategic approach to rep ramp plan that aligns organizational efforts with business objectives. Encompasses onboarding program, ramp time, certification process, mentorship system, early performance to drive systematic execution and measurable results.",
      "why": "Discovery is where deals are won or lost. A strong framework ensures consistent qualification and higher close rates across the team.",
      "how": "\n      <h4>Framework Elements:</h4>\n      <ul>\n        <li><strong>Rapport Building:</strong> Personal connection</li>\n        <li><strong>Situation Questions:</strong> Current state understanding</li>\n        <li><strong>Problem Questions:</strong> Pain identification</li>\n        <li><strong>Implication Questions:</strong> Cost of inaction</li>\n        <li><strong>Need-Payoff Questions:</strong> Value of solving</li>\n      </ul>\n      \n      <h4>Call Structure:</h4>\n      <ol>\n        <li>Set agenda and get permission</li>\n        <li>Understand current state</li>\n        <li>Identify problems and impact</li>\n        <li>Explore desired future state</li>\n        <li>Assess fit and timeline</li>\n        <li>Define clear next steps</li>\n      </ol>\n    ",
      "examples": [
        "Tell me about your current process for X",
        "What happens if this problem isn't solved?",
        "How would solving this impact your team?"
      ],
      "keyMetrics": [
        {
          "value": "45%",
          "label": "Higher Win Rates",
          "description": "Sales excellence impact"
        },
        {
          "value": "30%",
          "label": "Faster Cycles",
          "description": "Optimized sales process"
        },
        {
          "value": "2.2x",
          "label": "Larger Deals",
          "description": "Strategic selling approach"
        },
        {
          "value": "60%",
          "label": "Better Forecasting",
          "description": "Pipeline accuracy"
        }
      ]
    },
    "workspace": {
      "domain": "Rep Ramp Plan",
      "questions": [
        {
          "id": "10-2-q1",
          "text": "What is your current strategy for Rep Ramp Plan?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Rep Ramp Plan for ST6Co/ScaleOps6Product"
        },
        {
          "id": "10-2-q2",
          "text": "How do you measure success in Rep Ramp Plan?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Rep Ramp Plan for ST6Co/ScaleOps6Product"
        },
        {
          "id": "10-2-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Rep Ramp Plan for ST6Co/ScaleOps6Product"
        },
        {
          "id": "10-2-q4",
          "text": "How does your sales team utilize this?",
          "type": "execution",
          "required": false,
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "10-2-q5",
          "text": "What specific evidence demonstrates your Rep Ramp Plan effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "10-2-q6",
          "text": "What are your next steps to improve Rep Ramp Plan?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [],
      "templates": [
        "Discovery Call Script",
        "Qualification Scorecard",
        "Call Preparation Checklist"
      ],
      "bestPractices": []
    },
    "analysis": {
      "domain": "Rep Ramp Plan",
      "dimensions": [
        {
          "name": "Onboarding Program",
          "weight": 20,
          "description": "Structured onboarding"
        },
        {
          "name": "Ramp Time",
          "weight": 20,
          "description": "Time to productivity"
        },
        {
          "name": "Certification Process",
          "weight": 20,
          "description": "Rep certification program"
        },
        {
          "name": "Mentorship System",
          "weight": 20,
          "description": "Coaching and mentoring"
        },
        {
          "name": "Early Performance",
          "weight": 20,
          "description": "Initial rep success"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No ramp program",
        "26-50": "Basic onboarding exists",
        "51-75": "Good ramp process",
        "76-90": "Strong ramp program",
        "91-100": "Ramp excellence"
      }
    },
    "resources": {
      "domain": "Rep Ramp Plan",
      "templates": [
        "Onboarding Checklist",
        "30-60-90 Day Plan",
        "Ramp Metrics Dashboard"
      ],
      "metrics": [
        "Discovery to demo conversion",
        "Average discovery score",
        "Qualification accuracy",
        "Deal velocity"
      ]
    },
    "outputs": {
      "domain": "Rep Ramp Plan",
      "templates": [
        "Onboarding Checklist",
        "30-60-90 Day Plan",
        "Ramp Metrics Dashboard"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "10-1"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "10-3": {
    "id": "10-3",
    "name": "Win/Loss Tracker",
    "blockId": 10,
    "blockName": "Sales Team Empowerment",
    "subId": 3,
    "phase": 4,
    "phaseName": "Scaling Impact",
    "category": "enablement",
    "agent": {
      "name": "Win/Loss Analyst",
      "key": "10c",
      "description": "Conducts win/loss analysis",
      "domain": "Win/Loss Tracker"
    },
    "education": {
      "title": "Win/Loss Tracker",
      "what": "A systematic framework for monitoring and measuring win/loss tracker through data collection, analysis, and actionable insights. Tracks key metrics including analysis process, data collection, pattern recognition, competitive insights, action implementation to enable proactive decision-making and continuous improvement.",
      "why": "Generic demos don't sell. Personalized, value-focused demos that speak to specific pain points close deals faster.",
      "how": "\n      <h4>Script Components:</h4>\n      <ul>\n        <li><strong>Opening:</strong> Agenda and goal setting</li>\n        <li><strong>Problem Recap:</strong> Confirm understanding</li>\n        <li><strong>Solution Story:</strong> Narrative flow</li>\n        <li><strong>Proof Points:</strong> ROI and social proof</li>\n        <li><strong>Objection Handling:</strong> Common concerns</li>\n        <li><strong>Close:</strong> Next steps and commitment</li>\n      </ul>\n      \n      <h4>Library Organization:</h4>\n      <ol>\n        <li>Create base demo template</li>\n        <li>Develop persona variations</li>\n        <li>Add industry customizations</li>\n        <li>Include competitive positioning</li>\n        <li>Build objection responses</li>\n        <li>Update based on wins/losses</li>\n      </ol>\n    ",
      "examples": [
        "HR Manager demo: Focus on compliance and time savings",
        "CFO demo: Emphasize ROI and cost reduction",
        "IT demo: Highlight security and integration"
      ],
      "keyMetrics": [
        {
          "value": "45%",
          "label": "Higher Win Rates",
          "description": "Sales excellence impact"
        },
        {
          "value": "30%",
          "label": "Faster Cycles",
          "description": "Optimized sales process"
        },
        {
          "value": "2.2x",
          "label": "Larger Deals",
          "description": "Strategic selling approach"
        },
        {
          "value": "60%",
          "label": "Better Forecasting",
          "description": "Pipeline accuracy"
        }
      ]
    },
    "workspace": {
      "domain": "Win/Loss Tracker",
      "questions": [
        {
          "id": "10-3-q1",
          "text": "What is your current strategy for Win/Loss Tracker?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Win/Loss Tracker for ST6Co/ScaleOps6Product"
        },
        {
          "id": "10-3-q2",
          "text": "How do you measure success in Win/Loss Tracker?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Win/Loss Tracker for ST6Co/ScaleOps6Product"
        },
        {
          "id": "10-3-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Win/Loss Tracker for ST6Co/ScaleOps6Product"
        },
        {
          "id": "10-3-q4",
          "text": "How does your sales team utilize this?",
          "type": "execution",
          "required": false,
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "10-3-q5",
          "text": "What specific evidence demonstrates your Win/Loss Tracker effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "10-3-q6",
          "text": "What are your next steps to improve Win/Loss Tracker?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Demo Platforms (Demostack, Reprise)",
        "Screen Recording (Loom, Vidyard)",
        "Sales Enablement (Highspot, Showpad)",
        "Presentation Tools (Pitch, Beautiful.ai)"
      ],
      "templates": [
        "Demo Script Template",
        "Demo Preparation Guide",
        "Follow-up Email Templates",
        "Demo Scorecard"
      ],
      "bestPractices": [
        "Customize demos to discovered pain",
        "Show value in first 5 minutes",
        "Use customer's data when possible",
        "Always have a backup plan"
      ]
    },
    "analysis": {
      "domain": "Win/Loss Tracker",
      "dimensions": [
        {
          "name": "Analysis Process",
          "weight": 20,
          "description": "Win/loss review process"
        },
        {
          "name": "Data Collection",
          "weight": 20,
          "description": "Comprehensive data gathering"
        },
        {
          "name": "Pattern Recognition",
          "weight": 20,
          "description": "Win/loss patterns"
        },
        {
          "name": "Competitive Insights",
          "weight": 20,
          "description": "Competitive intelligence"
        },
        {
          "name": "Action Implementation",
          "weight": 20,
          "description": "Acting on insights"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No win/loss analysis",
        "26-50": "Occasional reviews",
        "51-75": "Regular analysis",
        "76-90": "Strong win/loss program",
        "91-100": "Win/loss mastery"
      }
    },
    "resources": {
      "domain": "Win/Loss Tracker",
      "templates": [
        "Win/Loss Analysis Form",
        "Competitive Intelligence Report",
        "Deal Review Template"
      ],
      "metrics": [
        "Demo to close rate",
        "Demo completion rate",
        "Feature resonance score",
        "Time to decision"
      ]
    },
    "outputs": {
      "domain": "Win/Loss Tracker",
      "templates": [
        "Win/Loss Analysis Form",
        "Competitive Intelligence Report",
        "Deal Review Template"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "10-2"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "10-4": {
    "id": "10-4",
    "name": "Objection Handling Guide",
    "blockId": 10,
    "blockName": "Sales Team Empowerment",
    "subId": 4,
    "phase": 4,
    "phaseName": "Scaling Impact",
    "category": "enablement",
    "agent": {
      "name": "Objection Handler",
      "key": "10d",
      "description": "Masters objection handling strategies",
      "domain": "Objection Handling Guide"
    },
    "education": {
      "title": "Objection Handling Guide",
      "what": "A comprehensive guide mapping common sales objections to effective responses, proof points, and redirection strategies.",
      "why": "Objections are buying signals in disguise. Prepared responses build confidence, maintain momentum, and increase close rates.",
      "how": "\n      <h4>Objection Categories:</h4>\n      <ul>\n        <li><strong>Price:</strong> Too expensive, budget concerns</li>\n        <li><strong>Authority:</strong> Need approval, not decision maker</li>\n        <li><strong>Need:</strong> Not a priority, status quo works</li>\n        <li><strong>Trust:</strong> Unproven, too risky</li>\n        <li><strong>Timing:</strong> Not now, maybe later</li>\n      </ul>\n      \n      <h4>Response Framework:</h4>\n      <ol>\n        <li>Acknowledge and empathize</li>\n        <li>Clarify the real concern</li>\n        <li>Reframe the perspective</li>\n        <li>Provide proof or evidence</li>\n        <li>Confirm resolution</li>\n        <li>Advance the conversation</li>\n      </ol>\n    ",
      "examples": [
        "Price: 'I understand budget is tight. Let's look at the ROI...'",
        "Trust: 'That's fair. Here's how Customer X felt the same...'",
        "Timing: 'What would need to change for this to be a priority?'"
      ],
      "keyMetrics": [
        {
          "value": "45%",
          "label": "Higher Win Rates",
          "description": "Sales excellence impact"
        },
        {
          "value": "30%",
          "label": "Faster Cycles",
          "description": "Optimized sales process"
        },
        {
          "value": "2.2x",
          "label": "Larger Deals",
          "description": "Strategic selling approach"
        },
        {
          "value": "60%",
          "label": "Better Forecasting",
          "description": "Pipeline accuracy"
        }
      ]
    },
    "workspace": {
      "domain": "Objection Handling Guide",
      "questions": [
        {
          "id": "10-4-q1",
          "text": "What is your current strategy for Objection Handling Guide?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Objection Handling Guide for ST6Co/ScaleOps6Product"
        },
        {
          "id": "10-4-q2",
          "text": "How do you measure success in Objection Handling Guide?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Objection Handling Guide for ST6Co/ScaleOps6Product"
        },
        {
          "id": "10-4-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Objection Handling Guide for ST6Co/ScaleOps6Product"
        },
        {
          "id": "10-4-q4",
          "text": "How does your sales team utilize this?",
          "type": "execution",
          "required": false,
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "10-4-q5",
          "text": "What specific evidence demonstrates your Objection Handling Guide effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "10-4-q6",
          "text": "What are your next steps to improve Objection Handling Guide?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Sales Enablement (Seismic, Showpad)",
        "Knowledge Base (Guru, Confluence)",
        "Training Platforms (Lessonly, Brainshark)",
        "Role-play Tools (Second Nature, Pitch Avatar)"
      ],
      "templates": [
        "Objection Handling Guide",
        "Battle Card Template",
        "Win/Loss Analysis Form",
        "Objection Practice Scripts"
      ],
      "bestPractices": [
        "Acknowledge objections empathetically",
        "Reframe objections as opportunities",
        "Use social proof in responses",
        "Practice objection handling weekly"
      ]
    },
    "analysis": {
      "domain": "Objection Handling Guide",
      "dimensions": [
        {
          "name": "Objection Catalog",
          "weight": 20,
          "description": "Common objections documented"
        },
        {
          "name": "Response Quality",
          "weight": 20,
          "description": "Effectiveness of responses"
        },
        {
          "name": "Training Programs",
          "weight": 20,
          "description": "Objection handling training"
        },
        {
          "name": "Success Rates",
          "weight": 20,
          "description": "Objection overcome rates"
        },
        {
          "name": "Continuous Learning",
          "weight": 20,
          "description": "Response refinement"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Poor objection handling",
        "26-50": "Basic responses exist",
        "51-75": "Good objection process",
        "76-90": "Strong objection mastery",
        "91-100": "Objection excellence"
      }
    },
    "resources": {
      "domain": "Objection Handling Guide",
      "templates": [
        "Objection Response Library",
        "Battle Cards",
        "Competitive Positioning Guide"
      ],
      "metrics": [
        "Objection frequency",
        "Objection overcome rate",
        "Deal velocity impact",
        "Close rate by objection type"
      ]
    },
    "outputs": {
      "domain": "Objection Handling Guide",
      "templates": [
        "Objection Response Library",
        "Battle Cards",
        "Competitive Positioning Guide"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "10-3"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "10-5": {
    "id": "10-5",
    "name": "ICP Filter Checklist",
    "blockId": 10,
    "blockName": "Sales Team Empowerment",
    "subId": 5,
    "phase": 4,
    "phaseName": "Scaling Impact",
    "category": "enablement",
    "agent": {
      "name": "ICP Filter Expert",
      "key": "10e",
      "description": "Defines and enforces ideal customer profile",
      "domain": "ICP Filter Checklist"
    },
    "education": {
      "title": "ICP Filter Checklist",
      "what": "A systematic approach to icp filter checklist that defines and enforces ideal customer profile. Evaluates icp definition, qualification rigor, scoring models, disqualification rate, win rate impact to ensure excellence and continuous improvement in this critical capability.",
      "why": "Compensation drives behavior. The right structure attracts top talent, motivates performance, and aligns sales efforts with company objectives.",
      "how": "\n      <h4>Structure Components:</h4>\n      <ul>\n        <li><strong>Base/Variable Split:</strong> Risk vs. reward balance</li>\n        <li><strong>Commission Rates:</strong> Percentage of revenue/booking</li>\n        <li><strong>Accelerators:</strong> Over-achievement rewards</li>\n        <li><strong>SPIFFs:</strong> Special incentives for strategic goals</li>\n        <li><strong>Clawbacks:</strong> Churn protection mechanisms</li>\n      </ul>\n      \n      <h4>Design Principles:</h4>\n      <ol>\n        <li>Align with business objectives</li>\n        <li>Keep it simple to understand</li>\n        <li>Reward the right behaviors</li>\n        <li>Be competitive with market</li>\n        <li>Include quality metrics</li>\n        <li>Review quarterly</li>\n      </ol>\n    ",
      "examples": [
        "50/50 base/variable split for enterprise reps",
        "10% commission, 15% over 100% of quota",
        "2x rate for annual prepaid deals"
      ],
      "keyMetrics": [
        {
          "value": "45%",
          "label": "Higher Win Rates",
          "description": "Sales excellence impact"
        },
        {
          "value": "30%",
          "label": "Faster Cycles",
          "description": "Optimized sales process"
        },
        {
          "value": "2.2x",
          "label": "Larger Deals",
          "description": "Strategic selling approach"
        },
        {
          "value": "60%",
          "label": "Better Forecasting",
          "description": "Pipeline accuracy"
        }
      ]
    },
    "workspace": {
      "domain": "ICP Filter Checklist",
      "questions": [
        {
          "id": "10-5-q1",
          "text": "What is your current strategy for ICP Filter Checklist?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about ICP Filter Checklist for ST6Co/ScaleOps6Product"
        },
        {
          "id": "10-5-q2",
          "text": "How do you measure success in ICP Filter Checklist?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about ICP Filter Checklist for ST6Co/ScaleOps6Product"
        },
        {
          "id": "10-5-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about ICP Filter Checklist for ST6Co/ScaleOps6Product"
        },
        {
          "id": "10-5-q4",
          "text": "How does your sales team utilize this?",
          "type": "execution",
          "required": false,
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "10-5-q5",
          "text": "What specific evidence demonstrates your ICP Filter Checklist effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "10-5-q6",
          "text": "What are your next steps to improve ICP Filter Checklist?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Commission Software (Xactly, Spiff)",
        "Compensation Planning (Compright, Pave)",
        "Performance Management (Ambition, LevelEleven)",
        "Analytics (QuotaPath, Varicent)"
      ],
      "templates": [
        "Comp Plan Calculator",
        "Commission Agreement",
        "Quota Setting Framework",
        "SPIFFs and Accelerators"
      ],
      "bestPractices": [
        "Keep plans simple to understand",
        "Align comp with company goals",
        "Pay commissions promptly",
        "Review and adjust quarterly"
      ]
    },
    "analysis": {
      "domain": "ICP Filter Checklist",
      "dimensions": [
        {
          "name": "ICP Definition",
          "weight": 20,
          "description": "Clarity of ideal customer"
        },
        {
          "name": "Qualification Rigor",
          "weight": 20,
          "description": "ICP adherence in pipeline"
        },
        {
          "name": "Scoring Models",
          "weight": 20,
          "description": "Lead/account scoring"
        },
        {
          "name": "Disqualification Rate",
          "weight": 20,
          "description": "Saying no to bad fits"
        },
        {
          "name": "Win Rate Impact",
          "weight": 20,
          "description": "ICP correlation to wins"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No ICP definition",
        "26-50": "Basic ICP exists",
        "51-75": "Good ICP discipline",
        "76-90": "Strong ICP focus",
        "91-100": "ICP excellence"
      }
    },
    "resources": {
      "domain": "ICP Filter Checklist",
      "templates": [
        "ICP Definition Framework",
        "Lead Qualification Scorecard",
        "Target Account List"
      ],
      "metrics": [
        "OTE attainment rate",
        "Cost of sales ratio",
        "Rep retention rate",
        "Quota achievement distribution"
      ]
    },
    "outputs": {
      "domain": "ICP Filter Checklist",
      "templates": [
        "ICP Definition Framework",
        "Lead Qualification Scorecard",
        "Target Account List"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "10-4"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.940Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "10-6": {
    "id": "10-6",
    "name": "Sales Call Library",
    "blockId": 10,
    "blockName": "Sales Team Empowerment",
    "subId": 6,
    "phase": 4,
    "phaseName": "Scaling Impact",
    "category": "enablement",
    "agent": {
      "name": "Sales Call Librarian",
      "key": "10f",
      "description": "Manages sales call recordings and insights",
      "domain": "Sales Call Library"
    },
    "education": {
      "title": "Sales Call Library",
      "what": "A structured rhythm for reviewing, coaching, and managing sales pipeline health including deal inspection and forecast calls.",
      "why": "Pipeline is truth. Regular reviews improve forecast accuracy, identify risks early, and provide coaching opportunities.",
      "how": "\n      <h4>Review Types:</h4>\n      <ul>\n        <li><strong>Daily Standup:</strong> Quick blockers and priorities</li>\n        <li><strong>Weekly 1:1s:</strong> Individual deal coaching</li>\n        <li><strong>Monthly Pipeline:</strong> Full pipeline health check</li>\n        <li><strong>Quarterly Business Review:</strong> Strategic planning</li>\n      </ul>\n      \n      <h4>Review Components:</h4>\n      <ol>\n        <li>Pipeline coverage analysis</li>\n        <li>Deal-by-deal inspection</li>\n        <li>Risk identification</li>\n        <li>Action planning</li>\n        <li>Skill coaching</li>\n        <li>Resource allocation</li>\n      </ol>\n    ",
      "examples": [
        "Weekly: Review all deals >$50K or closing in 30 days",
        "Monthly: 3x pipeline coverage minimum",
        "Red flag: No activity in 14+ days"
      ],
      "keyMetrics": [
        {
          "value": "45%",
          "label": "Higher Win Rates",
          "description": "Sales excellence impact"
        },
        {
          "value": "30%",
          "label": "Faster Cycles",
          "description": "Optimized sales process"
        },
        {
          "value": "2.2x",
          "label": "Larger Deals",
          "description": "Strategic selling approach"
        },
        {
          "value": "60%",
          "label": "Better Forecasting",
          "description": "Pipeline accuracy"
        }
      ]
    },
    "workspace": {
      "domain": "Sales Call Library",
      "questions": [
        {
          "id": "10-6-q1",
          "text": "What is your current strategy for Sales Call Library?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Sales Call Library for ST6Co/ScaleOps6Product"
        },
        {
          "id": "10-6-q2",
          "text": "How do you measure success in Sales Call Library?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Sales Call Library for ST6Co/ScaleOps6Product"
        },
        {
          "id": "10-6-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Sales Call Library for ST6Co/ScaleOps6Product"
        },
        {
          "id": "10-6-q4",
          "text": "How does your sales team utilize this?",
          "type": "execution",
          "required": false,
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "10-6-q5",
          "text": "What specific evidence demonstrates your Sales Call Library effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "10-6-q6",
          "text": "What are your next steps to improve Sales Call Library?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Pipeline Management (Clari, Gong)",
        "CRM Platforms (Salesforce, HubSpot)",
        "Forecasting (InsightSquared, BoostUp)",
        "Meeting Tools (Zoom, Google Meet)"
      ],
      "templates": [
        "Pipeline Review Agenda",
        "Deal Inspection Checklist",
        "Forecast Call Script",
        "Pipeline Health Metrics"
      ],
      "bestPractices": [
        "Review pipeline weekly",
        "Focus on next steps, not status",
        "Use data to drive discussions",
        "Document action items and follow up"
      ]
    },
    "analysis": {
      "domain": "Sales Call Library",
      "dimensions": [
        {
          "name": "Recording Coverage",
          "weight": 20,
          "description": "Percentage of calls recorded"
        },
        {
          "name": "Categorization",
          "weight": 20,
          "description": "Call organization system"
        },
        {
          "name": "Best Practice Extraction",
          "weight": 20,
          "description": "Learning from top calls"
        },
        {
          "name": "Coaching Integration",
          "weight": 20,
          "description": "Use in coaching"
        },
        {
          "name": "Knowledge Sharing",
          "weight": 20,
          "description": "Team learning from calls"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No call recording",
        "26-50": "Some calls recorded",
        "51-75": "Good call library",
        "76-90": "Strong call program",
        "91-100": "Call library excellence"
      }
    },
    "resources": {
      "domain": "Sales Call Library",
      "templates": [
        "Call Recording Library",
        "Best Practices Guide",
        "Call Analysis Framework"
      ],
      "metrics": [
        "Pipeline coverage ratio",
        "Forecast accuracy",
        "Deal slippage rate",
        "Average deal velocity"
      ]
    },
    "outputs": {
      "domain": "Sales Call Library",
      "templates": [
        "Call Recording Library",
        "Best Practices Guide",
        "Call Analysis Framework"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "10-5"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.942Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "11-1": {
    "id": "11-1",
    "name": "Scorecard Model",
    "blockId": 11,
    "blockName": "High Performance Teams",
    "subId": 1,
    "phase": 5,
    "phaseName": "Scale",
    "category": "performance",
    "agent": {
      "name": "Scorecard Designer",
      "key": "11a",
      "description": "Designs performance scorecards and metrics",
      "domain": "Scorecard Model"
    },
    "education": {
      "title": "Scorecard Model",
      "what": "The organizational blueprint defining roles, reporting lines, decision rights, and collaboration models optimized for your stage and strategy.",
      "why": "Structure drives behavior. The right org design enables speed, accountability, and scalability while the wrong one creates politics and paralysis.",
      "how": "\n      <h4>Design Principles:</h4>\n      <ul>\n        <li><strong>Clear Ownership:</strong> Single-threaded leaders</li>\n        <li><strong>Flat Hierarchy:</strong> Minimize layers</li>\n        <li><strong>Cross-functional:</strong> Break down silos</li>\n        <li><strong>Customer-centric:</strong> Organize around value</li>\n        <li><strong>Scalable:</strong> Room to grow without reorganization</li>\n      </ul>\n      \n      <h4>Structure Components:</h4>\n      <ol>\n        <li>Define core functions needed</li>\n        <li>Map reporting relationships</li>\n        <li>Clarify decision authority</li>\n        <li>Design communication flows</li>\n        <li>Plan for scale (2x, 5x, 10x)</li>\n        <li>Document and communicate</li>\n      </ol>\n    ",
      "examples": [
        "Pod structure: Cross-functional teams by customer segment",
        "Hub and spoke: Centralized platform, distributed GTM",
        "Two-pizza teams: Small, autonomous units"
      ],
      "keyMetrics": [
        {
          "value": "3.5x",
          "label": "Team Productivity",
          "description": "High-performance culture"
        },
        {
          "value": "50%",
          "label": "Better Execution",
          "description": "Performance management impact"
        },
        {
          "value": "40%",
          "label": "Higher Attainment",
          "description": "Goal achievement rate"
        },
        {
          "value": "2.8x",
          "label": "Faster Growth",
          "description": "Performance-driven scaling"
        }
      ]
    },
    "workspace": {
      "domain": "Scorecard Model",
      "questions": [
        {
          "id": "11-1-q1",
          "text": "What is your current strategy for Scorecard Model?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Scorecard Model for ST6Co/ScaleOps6Product"
        },
        {
          "id": "11-1-q2",
          "text": "How do you measure success in Scorecard Model?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Scorecard Model for ST6Co/ScaleOps6Product"
        },
        {
          "id": "11-1-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Scorecard Model for ST6Co/ScaleOps6Product"
        },
        {
          "id": "11-1-q4",
          "text": "What specific evidence demonstrates your Scorecard Model effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "11-1-q5",
          "text": "What are your next steps to improve Scorecard Model?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Org Design Tools (Pingboard, ChartHop)",
        "Collaboration Platforms (Slack, Microsoft Teams)",
        "Documentation (Notion, Confluence)",
        "HR Systems (BambooHR, Rippling)"
      ],
      "templates": [
        "Org Chart Template",
        "RACI Matrix",
        "Team Charter Document",
        "Role Definition Framework"
      ],
      "bestPractices": [
        "Keep spans of control under 7 people",
        "Define clear decision rights",
        "Minimize layers between CEO and IC",
        "Review structure quarterly as you scale"
      ]
    },
    "analysis": {
      "domain": "Scorecard Model",
      "dimensions": [
        {
          "name": "Metric Selection",
          "weight": 20,
          "description": "Relevant KPI selection"
        },
        {
          "name": "Balance",
          "weight": 20,
          "description": "Activity vs. outcome balance"
        },
        {
          "name": "Visibility",
          "weight": 20,
          "description": "Scorecard transparency"
        },
        {
          "name": "Actionability",
          "weight": 20,
          "description": "Metrics drive behavior"
        },
        {
          "name": "Fairness",
          "weight": 20,
          "description": "Perceived scorecard fairness"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No performance scorecards",
        "26-50": "Basic metrics tracked",
        "51-75": "Good scorecard system",
        "76-90": "Strong performance management",
        "91-100": "Scorecard excellence"
      }
    },
    "resources": {
      "domain": "Scorecard Model",
      "templates": [
        "Performance Scorecard",
        "KPI Dashboard",
        "Metrics Definition Guide"
      ],
      "metrics": [
        "Span of control",
        "Decision velocity",
        "Cross-team dependencies",
        "Employee satisfaction"
      ]
    },
    "outputs": {
      "domain": "Scorecard Model",
      "templates": [
        "Performance Scorecard",
        "KPI Dashboard",
        "Metrics Definition Guide"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.942Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "11-2": {
    "id": "11-2",
    "name": "Quota Structure",
    "blockId": 11,
    "blockName": "High Performance Teams",
    "subId": 2,
    "phase": 5,
    "phaseName": "Scale",
    "category": "performance",
    "agent": {
      "name": "Quota Structure Expert",
      "key": "11b",
      "description": "Designs and manages quota systems",
      "domain": "Quota Structure"
    },
    "education": {
      "title": "Quota Structure",
      "what": "A systematic approach to quota structure that designs and manages quota systems. Evaluates quota methodology, attainment rates, fairness perception, motivation impact, adjustment process to ensure excellence and continuous improvement in this critical capability.",
      "why": "What gets measured gets managed. Clear metrics drive accountability, enable coaching, and ensure everyone rows in the same direction.",
      "how": "\n      <h4>Metric Categories:</h4>\n      <ul>\n        <li><strong>Business Metrics:</strong> Revenue, growth, efficiency</li>\n        <li><strong>Operational Metrics:</strong> Quality, speed, output</li>\n        <li><strong>Team Metrics:</strong> Collaboration, innovation</li>\n        <li><strong>Individual Metrics:</strong> Goals, competencies</li>\n        <li><strong>Cultural Metrics:</strong> Values, behaviors</li>\n      </ul>\n      \n      <h4>Framework Implementation:</h4>\n      <ol>\n        <li>Cascade company OKRs to teams</li>\n        <li>Define role-specific KPIs</li>\n        <li>Set measurement cadence</li>\n        <li>Build tracking dashboards</li>\n        <li>Create review processes</li>\n        <li>Link to compensation</li>\n      </ol>\n    ",
      "examples": [
        "Engineering: Velocity, quality, on-time delivery",
        "Sales: Pipeline, conversion, quota attainment",
        "Customer Success: NPS, retention, expansion"
      ],
      "keyMetrics": [
        {
          "value": "3.5x",
          "label": "Team Productivity",
          "description": "High-performance culture"
        },
        {
          "value": "50%",
          "label": "Better Execution",
          "description": "Performance management impact"
        },
        {
          "value": "40%",
          "label": "Higher Attainment",
          "description": "Goal achievement rate"
        },
        {
          "value": "2.8x",
          "label": "Faster Growth",
          "description": "Performance-driven scaling"
        }
      ]
    },
    "workspace": {
      "domain": "Quota Structure",
      "questions": [
        {
          "id": "11-2-q1",
          "text": "What is your current strategy for Quota Structure?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Quota Structure for ST6Co/ScaleOps6Product"
        },
        {
          "id": "11-2-q2",
          "text": "How do you measure success in Quota Structure?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Quota Structure for ST6Co/ScaleOps6Product"
        },
        {
          "id": "11-2-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Quota Structure for ST6Co/ScaleOps6Product"
        },
        {
          "id": "11-2-q4",
          "text": "What specific evidence demonstrates your Quota Structure effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "11-2-q5",
          "text": "What are your next steps to improve Quota Structure?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "OKR Platforms (Weekdone, Perdoo)",
        "Performance Management (Lattice, Culture Amp)",
        "Analytics Dashboards (Tableau, Looker)",
        "360 Feedback Tools (15Five, Officevibe)"
      ],
      "templates": [
        "OKR Planning Template",
        "Performance Review Form",
        "KPI Dashboard",
        "Goal Setting Worksheet"
      ],
      "bestPractices": [
        "Cascade OKRs from company to individual",
        "Review metrics weekly, not just quarterly",
        "Balance leading and lagging indicators",
        "Link performance to compensation clearly"
      ]
    },
    "analysis": {
      "domain": "Quota Structure",
      "dimensions": [
        {
          "name": "Quota Methodology",
          "weight": 20,
          "description": "Quota setting process"
        },
        {
          "name": "Attainment Rates",
          "weight": 20,
          "description": "Team quota achievement"
        },
        {
          "name": "Fairness Perception",
          "weight": 20,
          "description": "Quota fairness"
        },
        {
          "name": "Motivation Impact",
          "weight": 20,
          "description": "Quota motivational effect"
        },
        {
          "name": "Adjustment Process",
          "weight": 20,
          "description": "Quota revision process"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Dysfunctional quotas",
        "26-50": "Basic quota system",
        "51-75": "Good quota structure",
        "76-90": "Strong quota program",
        "91-100": "Quota excellence"
      }
    },
    "resources": {
      "domain": "Quota Structure",
      "templates": [
        "Quota Setting Framework",
        "Territory Planning Model",
        "Compensation Plan Calculator"
      ],
      "metrics": [
        "Goal achievement rate",
        "Performance distribution",
        "Metric alignment score",
        "Review completion rate"
      ]
    },
    "outputs": {
      "domain": "Quota Structure",
      "templates": [
        "Quota Setting Framework",
        "Territory Planning Model",
        "Compensation Plan Calculator"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "11-1"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.942Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "11-3": {
    "id": "11-3",
    "name": "Weekly Deal Reviews",
    "blockId": 11,
    "blockName": "High Performance Teams",
    "subId": 3,
    "phase": 5,
    "phaseName": "Scale",
    "category": "performance",
    "agent": {
      "name": "Deal Review Manager",
      "key": "11c",
      "description": "Manages deal review processes",
      "domain": "Weekly Deal Reviews"
    },
    "education": {
      "title": "Weekly Deal Reviews",
      "what": "A systematic approach to weekly deal reviews that manages deal review processes. Evaluates review cadence, review quality, action items, cross-functional input, deal velocity impact to ensure excellence and continuous improvement in this critical capability.",
      "why": "Culture eats strategy for breakfast. Codifying culture ensures consistency as you scale and helps attract/retain the right people.",
      "how": "\n      <h4>Culture Components:</h4>\n      <ul>\n        <li><strong>Core Values:</strong> Fundamental beliefs</li>\n        <li><strong>Behaviors:</strong> How values show up daily</li>\n        <li><strong>Operating Principles:</strong> Decision guidelines</li>\n        <li><strong>Rituals:</strong> Recurring practices</li>\n        <li><strong>Stories:</strong> Examples and anti-examples</li>\n      </ul>\n      \n      <h4>Codification Process:</h4>\n      <ol>\n        <li>Identify existing cultural strengths</li>\n        <li>Define aspirational elements</li>\n        <li>Translate to specific behaviors</li>\n        <li>Create memorable language</li>\n        <li>Build into operations</li>\n        <li>Reinforce consistently</li>\n      </ol>\n    ",
      "examples": [
        "Amazon: Customer obsession, ownership, invent and simplify",
        "Netflix: Freedom and responsibility, context not control",
        "Stripe: Move with urgency, be user-centric"
      ],
      "keyMetrics": [
        {
          "value": "3.5x",
          "label": "Team Productivity",
          "description": "High-performance culture"
        },
        {
          "value": "50%",
          "label": "Better Execution",
          "description": "Performance management impact"
        },
        {
          "value": "40%",
          "label": "Higher Attainment",
          "description": "Goal achievement rate"
        },
        {
          "value": "2.8x",
          "label": "Faster Growth",
          "description": "Performance-driven scaling"
        }
      ]
    },
    "workspace": {
      "domain": "Weekly Deal Reviews",
      "questions": [
        {
          "id": "11-3-q1",
          "text": "What is your current strategy for Weekly Deal Reviews?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Weekly Deal Reviews for ST6Co/ScaleOps6Product"
        },
        {
          "id": "11-3-q2",
          "text": "How do you measure success in Weekly Deal Reviews?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Weekly Deal Reviews for ST6Co/ScaleOps6Product"
        },
        {
          "id": "11-3-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Weekly Deal Reviews for ST6Co/ScaleOps6Product"
        },
        {
          "id": "11-3-q4",
          "text": "What specific evidence demonstrates your Weekly Deal Reviews effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "11-3-q5",
          "text": "What are your next steps to improve Weekly Deal Reviews?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Culture Survey Tools (Culture Amp, Officevibe)",
        "Values Workshop Tools (Miro, Mural)",
        "Internal Comms (Slack, Workplace)",
        "Recognition Platforms (Bonusly, Kudos)"
      ],
      "templates": [
        "Culture Deck Template",
        "Values Definition Workshop",
        "Behavior Interview Guide",
        "Culture Onboarding Checklist"
      ],
      "bestPractices": [
        "Live values daily, don't just post them",
        "Hire and fire based on cultural fit",
        "Celebrate culture wins publicly",
        "Measure culture health quarterly"
      ]
    },
    "analysis": {
      "domain": "Weekly Deal Reviews",
      "dimensions": [
        {
          "name": "Review Cadence",
          "weight": 20,
          "description": "Regular deal reviews"
        },
        {
          "name": "Review Quality",
          "weight": 20,
          "description": "Depth of deal analysis"
        },
        {
          "name": "Action Items",
          "weight": 20,
          "description": "Clear next steps"
        },
        {
          "name": "Cross-functional Input",
          "weight": 20,
          "description": "Stakeholder involvement"
        },
        {
          "name": "Deal Velocity Impact",
          "weight": 20,
          "description": "Review impact on velocity"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No deal reviews",
        "26-50": "Ad-hoc reviews",
        "51-75": "Regular deal reviews",
        "76-90": "Strong review process",
        "91-100": "Deal review excellence"
      }
    },
    "resources": {
      "domain": "Weekly Deal Reviews",
      "templates": [
        "Deal Review Agenda",
        "Pipeline Inspection Checklist",
        "Forecast Call Script"
      ],
      "metrics": [
        "Values alignment score",
        "Culture survey results",
        "Behavior observation frequency",
        "New hire culture fit"
      ]
    },
    "outputs": {
      "domain": "Weekly Deal Reviews",
      "templates": [
        "Deal Review Agenda",
        "Pipeline Inspection Checklist",
        "Forecast Call Script"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "11-2"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.942Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "11-4": {
    "id": "11-4",
    "name": "Forecasting Framework",
    "blockId": 11,
    "blockName": "High Performance Teams",
    "subId": 4,
    "phase": 5,
    "phaseName": "Scale",
    "category": "performance",
    "agent": {
      "name": "Forecast Framework Builder",
      "key": "11d",
      "description": "Builds accurate forecasting systems",
      "domain": "Forecasting Framework"
    },
    "education": {
      "title": "Forecasting Framework",
      "what": "A structured forecasting framework that provides clear guidelines and methodologies for builds accurate forecasting systems. Focuses on forecast accuracy, methodology rigor, pipeline coverage, risk assessment, adjustment agility to ensure comprehensive coverage and measurable outcomes.",
      "why": "Great leaders aren't born, they're developed. Internal promotion maintains culture, reduces hiring risk, and motivates high performers.",
      "how": "\n      <h4>Development Components:</h4>\n      <ul>\n        <li><strong>Competency Model:</strong> Leadership skills framework</li>\n        <li><strong>Assessment:</strong> Current capability evaluation</li>\n        <li><strong>Training:</strong> Skill development programs</li>\n        <li><strong>Mentoring:</strong> Senior leader guidance</li>\n        <li><strong>Stretch Assignments:</strong> Growth opportunities</li>\n      </ul>\n      \n      <h4>Program Structure:</h4>\n      <ol>\n        <li>Define leadership competencies</li>\n        <li>Identify high-potential employees</li>\n        <li>Create individual development plans</li>\n        <li>Provide training and resources</li>\n        <li>Track progress and adjust</li>\n        <li>Promote when ready</li>\n      </ol>\n    ",
      "examples": [
        "Manager track: IC to team lead in 18 months",
        "Executive track: Director to VP development program",
        "Technical track: Senior IC to architect path"
      ],
      "keyMetrics": [
        {
          "value": "3.5x",
          "label": "Team Productivity",
          "description": "High-performance culture"
        },
        {
          "value": "50%",
          "label": "Better Execution",
          "description": "Performance management impact"
        },
        {
          "value": "40%",
          "label": "Higher Attainment",
          "description": "Goal achievement rate"
        },
        {
          "value": "2.8x",
          "label": "Faster Growth",
          "description": "Performance-driven scaling"
        }
      ]
    },
    "workspace": {
      "domain": "Forecasting Framework",
      "questions": [
        {
          "id": "11-4-q1",
          "text": "What is your current strategy for Forecasting Framework?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Forecasting Framework for ST6Co/ScaleOps6Product"
        },
        {
          "id": "11-4-q2",
          "text": "How do you measure success in Forecasting Framework?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Forecasting Framework for ST6Co/ScaleOps6Product"
        },
        {
          "id": "11-4-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Forecasting Framework for ST6Co/ScaleOps6Product"
        },
        {
          "id": "11-4-q4",
          "text": "What specific evidence demonstrates your Forecasting Framework effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "11-4-q5",
          "text": "What are your next steps to improve Forecasting Framework?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Learning Platforms (LinkedIn Learning, Udemy)",
        "Mentorship Tools (MentorcliQ, Together)",
        "Assessment Tools (Hogan, CliftonStrengths)",
        "Succession Planning (Saba, Cornerstone)"
      ],
      "templates": [
        "Leadership Competency Model",
        "Development Plan Template",
        "360 Review Framework",
        "Succession Planning Matrix"
      ],
      "bestPractices": [
        "Identify high-potentials early",
        "Provide stretch assignments regularly",
        "Pair emerging leaders with mentors",
        "Create safe spaces to fail and learn"
      ]
    },
    "analysis": {
      "domain": "Forecasting Framework",
      "dimensions": [
        {
          "name": "Forecast Accuracy",
          "weight": 20,
          "description": "Prediction accuracy"
        },
        {
          "name": "Methodology Rigor",
          "weight": 20,
          "description": "Forecasting process"
        },
        {
          "name": "Pipeline Coverage",
          "weight": 20,
          "description": "Pipeline to quota ratio"
        },
        {
          "name": "Risk Assessment",
          "weight": 20,
          "description": "Deal risk evaluation"
        },
        {
          "name": "Adjustment Agility",
          "weight": 20,
          "description": "Forecast flexibility"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Inaccurate forecasts",
        "26-50": "Basic forecasting",
        "51-75": "Good forecast process",
        "76-90": "Strong forecast accuracy",
        "91-100": "Forecast excellence"
      }
    },
    "resources": {
      "domain": "Forecasting Framework",
      "templates": [
        "Sales Forecast Model",
        "Pipeline Coverage Calculator",
        "Forecast Accuracy Tracker"
      ],
      "metrics": [
        "Internal promotion rate",
        "Leadership readiness score",
        "Program completion rate",
        "Post-promotion success rate"
      ]
    },
    "outputs": {
      "domain": "Forecasting Framework",
      "templates": [
        "Sales Forecast Model",
        "Pipeline Coverage Calculator",
        "Forecast Accuracy Tracker"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "11-3"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.942Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "11-5": {
    "id": "11-5",
    "name": "Manager Coaching Loop",
    "blockId": 11,
    "blockName": "High Performance Teams",
    "subId": 5,
    "phase": 5,
    "phaseName": "Scale",
    "category": "performance",
    "agent": {
      "name": "Coaching Loop Designer",
      "key": "11e",
      "description": "Designs sales coaching programs",
      "domain": "Manager Coaching Loop"
    },
    "education": {
      "title": "Manager Coaching Loop",
      "what": "A systematic approach to manager coaching loop that designs sales coaching programs. Evaluates coaching frequency, coaching quality, skill development, coaching tools, performance impact to ensure excellence and continuous improvement in this critical capability.",
      "why": "Poor communication kills productivity and morale. Clear protocols ensure information reaches the right people at the right time.",
      "how": "\n      <h4>Protocol Elements:</h4>\n      <ul>\n        <li><strong>Channel Guidelines:</strong> When to use email/Slack/meetings</li>\n        <li><strong>Meeting Rhythms:</strong> Standing meetings and agendas</li>\n        <li><strong>Update Cadence:</strong> Status reports and check-ins</li>\n        <li><strong>Escalation Paths:</strong> How to raise issues</li>\n        <li><strong>Documentation:</strong> What to write down and where</li>\n      </ul>\n      \n      <h4>Implementation Steps:</h4>\n      <ol>\n        <li>Audit current communication patterns</li>\n        <li>Define channel purposes</li>\n        <li>Set response time expectations</li>\n        <li>Create meeting templates</li>\n        <li>Document protocols</li>\n        <li>Train and reinforce</li>\n      </ol>\n    ",
      "examples": [
        "Slack for quick questions (<2 min response)",
        "Email for formal decisions (document trail)",
        "Weekly all-hands for company updates"
      ],
      "keyMetrics": [
        {
          "value": "3.5x",
          "label": "Team Productivity",
          "description": "High-performance culture"
        },
        {
          "value": "50%",
          "label": "Better Execution",
          "description": "Performance management impact"
        },
        {
          "value": "40%",
          "label": "Higher Attainment",
          "description": "Goal achievement rate"
        },
        {
          "value": "2.8x",
          "label": "Faster Growth",
          "description": "Performance-driven scaling"
        }
      ]
    },
    "workspace": {
      "domain": "Manager Coaching Loop",
      "questions": [
        {
          "id": "11-5-q1",
          "text": "What is your current strategy for Manager Coaching Loop?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Manager Coaching Loop for ST6Co/ScaleOps6Product"
        },
        {
          "id": "11-5-q2",
          "text": "How do you measure success in Manager Coaching Loop?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Manager Coaching Loop for ST6Co/ScaleOps6Product"
        },
        {
          "id": "11-5-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Manager Coaching Loop for ST6Co/ScaleOps6Product"
        },
        {
          "id": "11-5-q4",
          "text": "What specific evidence demonstrates your Manager Coaching Loop effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "11-5-q5",
          "text": "What are your next steps to improve Manager Coaching Loop?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Communication Platforms (Slack, Teams)",
        "Video Conferencing (Zoom, Google Meet)",
        "Documentation (Notion, Confluence)",
        "Project Management (Asana, Monday.com)"
      ],
      "templates": [
        "Communication Charter",
        "Meeting Agenda Templates",
        "Status Report Format",
        "Escalation Matrix"
      ],
      "bestPractices": [
        "Default to overcommunication",
        "Document decisions in writing",
        "Respect time zones for global teams",
        "Create communication norms and stick to them"
      ]
    },
    "analysis": {
      "domain": "Manager Coaching Loop",
      "dimensions": [
        {
          "name": "Coaching Frequency",
          "weight": 20,
          "description": "Regular coaching cadence"
        },
        {
          "name": "Coaching Quality",
          "weight": 20,
          "description": "Effectiveness of coaching"
        },
        {
          "name": "Skill Development",
          "weight": 20,
          "description": "Rep skill improvement"
        },
        {
          "name": "Coaching Tools",
          "weight": 20,
          "description": "Coaching infrastructure"
        },
        {
          "name": "Performance Impact",
          "weight": 20,
          "description": "Coaching ROI"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No coaching program",
        "26-50": "Occasional coaching",
        "51-75": "Regular coaching",
        "76-90": "Strong coaching culture",
        "91-100": "Coaching excellence"
      }
    },
    "resources": {
      "domain": "Manager Coaching Loop",
      "templates": [
        "Coaching Framework",
        "1-on-1 Template",
        "Performance Improvement Plan"
      ],
      "metrics": [
        "Response time average",
        "Meeting effectiveness score",
        "Information flow speed",
        "Communication satisfaction"
      ]
    },
    "outputs": {
      "domain": "Manager Coaching Loop",
      "templates": [
        "Coaching Framework",
        "1-on-1 Template",
        "Performance Improvement Plan"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "11-4"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.942Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "11-6": {
    "id": "11-6",
    "name": "Talent Gap Identification",
    "blockId": 11,
    "blockName": "High Performance Teams",
    "subId": 6,
    "phase": 5,
    "phaseName": "Scale",
    "category": "performance",
    "agent": {
      "name": "Talent Gap Analyst",
      "key": "11f",
      "description": "Identifies and addresses talent gaps",
      "domain": "Talent Gap Identification"
    },
    "education": {
      "title": "Talent Gap Identification",
      "what": "A systematic approach to talent gap identification that identifies and addresses talent gaps. Evaluates skills assessment, gap identification, development plans, hiring strategy, succession planning to ensure excellence and continuous improvement in this critical capability.",
      "why": "Replacing a key employee costs 1.5-2x their salary. Retention is cheaper than recruitment and maintains institutional knowledge.",
      "how": "\n      <h4>Retention Levers:</h4>\n      <ul>\n        <li><strong>Compensation:</strong> Competitive pay and equity</li>\n        <li><strong>Growth:</strong> Career development opportunities</li>\n        <li><strong>Culture:</strong> Positive work environment</li>\n        <li><strong>Recognition:</strong> Appreciation and rewards</li>\n        <li><strong>Flexibility:</strong> Work-life balance</li>\n        <li><strong>Purpose:</strong> Meaningful work and impact</li>\n      </ul>\n      \n      <h4>Strategy Development:</h4>\n      <ol>\n        <li>Analyze turnover patterns</li>\n        <li>Conduct stay interviews</li>\n        <li>Benchmark compensation</li>\n        <li>Design retention programs</li>\n        <li>Identify flight risks early</li>\n        <li>Create intervention playbooks</li>\n      </ol>\n    ",
      "examples": [
        "Quarterly retention bonuses for key roles",
        "Flexible PTO policy for work-life balance",
        "Learning stipend for skill development"
      ],
      "keyMetrics": [
        {
          "value": "3.5x",
          "label": "Team Productivity",
          "description": "High-performance culture"
        },
        {
          "value": "50%",
          "label": "Better Execution",
          "description": "Performance management impact"
        },
        {
          "value": "40%",
          "label": "Higher Attainment",
          "description": "Goal achievement rate"
        },
        {
          "value": "2.8x",
          "label": "Faster Growth",
          "description": "Performance-driven scaling"
        }
      ]
    },
    "workspace": {
      "domain": "Talent Gap Identification",
      "questions": [
        {
          "id": "11-6-q1",
          "text": "What is your current strategy for Talent Gap Identification?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Talent Gap Identification for ST6Co/ScaleOps6Product"
        },
        {
          "id": "11-6-q2",
          "text": "How do you measure success in Talent Gap Identification?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Talent Gap Identification for ST6Co/ScaleOps6Product"
        },
        {
          "id": "11-6-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Talent Gap Identification for ST6Co/ScaleOps6Product"
        },
        {
          "id": "11-6-q4",
          "text": "What specific evidence demonstrates your Talent Gap Identification effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "11-6-q5",
          "text": "What are your next steps to improve Talent Gap Identification?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Engagement Surveys (Culture Amp, Gallup)",
        "Compensation Analysis (Pave, Radford)",
        "Benefits Platforms (Gusto, Zenefits)",
        "Recognition Tools (Bonusly, Achievers)"
      ],
      "templates": [
        "Retention Risk Assessment",
        "Stay Interview Guide",
        "Compensation Benchmarking Tool",
        "Exit Interview Template"
      ],
      "bestPractices": [
        "Conduct stay interviews, not just exit interviews",
        "Address flight risks proactively",
        "Benchmark compensation bi-annually",
        "Create clear career progression paths"
      ]
    },
    "analysis": {
      "domain": "Talent Gap Identification",
      "dimensions": [
        {
          "name": "Skills Assessment",
          "weight": 20,
          "description": "Team skills evaluation"
        },
        {
          "name": "Gap Identification",
          "weight": 20,
          "description": "Clear gap analysis"
        },
        {
          "name": "Development Plans",
          "weight": 20,
          "description": "Training programs"
        },
        {
          "name": "Hiring Strategy",
          "weight": 20,
          "description": "Talent acquisition plan"
        },
        {
          "name": "Succession Planning",
          "weight": 20,
          "description": "Leadership pipeline"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Major talent gaps",
        "26-50": "Some gaps addressed",
        "51-75": "Good talent management",
        "76-90": "Strong talent program",
        "91-100": "Talent excellence"
      }
    },
    "resources": {
      "domain": "Talent Gap Identification",
      "templates": [
        "Skills Assessment Matrix",
        "Hiring Plan Template",
        "Talent Development Roadmap"
      ],
      "metrics": [
        "Voluntary turnover rate",
        "Regrettable attrition",
        "Employee NPS",
        "Retention cost vs. replacement cost"
      ]
    },
    "outputs": {
      "domain": "Talent Gap Identification",
      "templates": [
        "Skills Assessment Matrix",
        "Hiring Plan Template",
        "Talent Development Roadmap"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "11-5"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.942Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "12-1": {
    "id": "12-1",
    "name": "Onboarding Checklist",
    "blockId": 12,
    "blockName": "Retention Systems",
    "subId": 1,
    "phase": 5,
    "phaseName": "Scale",
    "category": "retention",
    "agent": {
      "name": "Onboarding Optimizer",
      "key": "12a",
      "description": "Optimizes customer onboarding experience",
      "domain": "Onboarding Checklist"
    },
    "education": {
      "title": "Onboarding Checklist",
      "what": "A systematic approach to onboarding checklist that optimizes customer onboarding experience. Evaluates onboarding process, time to value, completion rates, customer satisfaction, resource efficiency to ensure excellence and continuous improvement in this critical capability.",
      "why": "It's 5-25x more expensive to acquire a new customer than retain an existing one. Prediction enables proactive intervention.",
      "how": "\n      <h4>Model Inputs:</h4>\n      <ul>\n        <li><strong>Usage Data:</strong> Login frequency, feature adoption</li>\n        <li><strong>Engagement:</strong> Support tickets, training attendance</li>\n        <li><strong>Contract:</strong> Renewal date, payment history</li>\n        <li><strong>Satisfaction:</strong> NPS, survey responses</li>\n        <li><strong>Behavioral:</strong> Product changes, stakeholder changes</li>\n      </ul>\n      \n      <h4>Model Development:</h4>\n      <ol>\n        <li>Collect historical churn data</li>\n        <li>Identify predictive variables</li>\n        <li>Build statistical model</li>\n        <li>Test and validate accuracy</li>\n        <li>Create risk scoring system</li>\n        <li>Implement monitoring alerts</li>\n      </ol>\n    ",
      "examples": [
        "Red flag: 50% drop in usage over 30 days",
        "Warning: Key stakeholder hasn't logged in 2 weeks",
        "Risk score: 85/100 = immediate intervention needed"
      ],
      "keyMetrics": [
        {
          "value": "40%",
          "label": "Lower Churn",
          "description": "Retention system impact"
        },
        {
          "value": "3.2x",
          "label": "Higher LTV",
          "description": "Customer lifetime value"
        },
        {
          "value": "65%",
          "label": "Better NPS",
          "description": "Customer satisfaction"
        },
        {
          "value": "2.5x",
          "label": "More Advocacy",
          "description": "Customer referrals"
        }
      ]
    },
    "workspace": {
      "domain": "Onboarding Checklist",
      "questions": [
        {
          "id": "12-1-q1",
          "text": "What is your current strategy for Onboarding Checklist?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Onboarding Checklist for ST6Co/ScaleOps6Product"
        },
        {
          "id": "12-1-q2",
          "text": "How do you measure success in Onboarding Checklist?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Onboarding Checklist for ST6Co/ScaleOps6Product"
        },
        {
          "id": "12-1-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Onboarding Checklist for ST6Co/ScaleOps6Product"
        },
        {
          "id": "12-1-q4",
          "text": "What specific evidence demonstrates your Onboarding Checklist effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "12-1-q5",
          "text": "What are your next steps to improve Onboarding Checklist?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Loyalty Platforms (Smile.io, LoyaltyLion)",
        "Gamification (Bunchball, Badgeville)",
        "Rewards Management (Tremendous, Rybbon)",
        "Analytics (Segment, Amplitude)"
      ],
      "templates": [
        "Loyalty Program Framework",
        "Tier Structure Calculator",
        "Rewards Catalog",
        "Program ROI Calculator"
      ],
      "bestPractices": [
        "Make earning points simple and clear",
        "Offer meaningful rewards at each tier",
        "Create exclusive experiences for top tiers",
        "Measure program ROI quarterly"
      ]
    },
    "analysis": {
      "domain": "Onboarding Checklist",
      "dimensions": [
        {
          "name": "Onboarding Process",
          "weight": 20,
          "description": "Structured onboarding"
        },
        {
          "name": "Time to Value",
          "weight": 20,
          "description": "Speed to first value"
        },
        {
          "name": "Completion Rates",
          "weight": 20,
          "description": "Onboarding completion"
        },
        {
          "name": "Customer Satisfaction",
          "weight": 20,
          "description": "Onboarding CSAT"
        },
        {
          "name": "Resource Efficiency",
          "weight": 20,
          "description": "Onboarding scalability"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Poor onboarding",
        "26-50": "Basic onboarding",
        "51-75": "Good onboarding",
        "76-90": "Strong onboarding",
        "91-100": "Onboarding excellence"
      }
    },
    "resources": {
      "domain": "Onboarding Checklist",
      "templates": [
        "Customer Onboarding Plan",
        "Welcome Email Sequence",
        "Success Milestone Tracker"
      ],
      "metrics": [
        "Model accuracy (precision/recall)",
        "False positive rate",
        "Intervention success rate",
        "Churn rate reduction"
      ]
    },
    "outputs": {
      "domain": "Onboarding Checklist",
      "templates": [
        "Customer Onboarding Plan",
        "Welcome Email Sequence",
        "Success Milestone Tracker"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.942Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "12-2": {
    "id": "12-2",
    "name": "Activation Tracker",
    "blockId": 12,
    "blockName": "Retention Systems",
    "subId": 2,
    "phase": 5,
    "phaseName": "Scale",
    "category": "retention",
    "agent": {
      "name": "Activation Tracker",
      "key": "12b",
      "description": "Tracks customer activation metrics",
      "domain": "Activation Tracker"
    },
    "education": {
      "title": "Activation Tracker",
      "what": "A systematic framework for monitoring and measuring customer activation progress from signup to first value realization, tracking key milestones and identifying bottlenecks in the onboarding journey.",
      "why": "Activated customers are 3x more likely to renew and 5x more likely to expand. Tracking activation metrics enables proactive intervention, reduces time-to-value, and increases long-term retention. Companies with strong activation tracking see 40% higher retention rates.",
      "how": "\n      <h4>Activation Framework Components:</h4>\n      <ul>\n        <li><strong>Activation Definition:</strong> Clear criteria for \"activated\" state</li>\n        <li><strong>Milestone Tracking:</strong> Key steps in user journey</li>\n        <li><strong>Time-to-Value Metrics:</strong> Speed to first success</li>\n        <li><strong>Feature Adoption:</strong> Core feature usage patterns</li>\n        <li><strong>Engagement Signals:</strong> Login frequency and depth</li>\n      </ul>\n      \n      <h4>Implementation Process:</h4>\n      <ol>\n        <li>Define activation criteria based on successful users</li>\n        <li>Map critical onboarding milestones</li>\n        <li>Instrument tracking for each milestone</li>\n        <li>Set up automated alerts for stalled users</li>\n        <li>Create intervention playbooks</li>\n        <li>Monitor and optimize activation rates</li>\n      </ol>\n      \n      <h4>Tracking Metrics:</h4>\n      <ul>\n        <li>Activation rate (% of signups reaching activated state)</li>\n        <li>Time to activation (days from signup to first value)</li>\n        <li>Milestone completion rates</li>\n        <li>Drop-off points in onboarding flow</li>\n        <li>Correlation between activation and retention</li>\n      </ul>\n    ",
      "examples": [
        "SaaS company defines activation as: User completes first workflow + invites 2 team members + uses product 3 days in first week",
        "B2B platform tracks: 72% activation rate, 8-day average time-to-value, 85% of activated users renew",
        "Product-led growth company: Users who activate in 7 days have 92% retention vs 34% for those taking 30+ days"
      ],
      "keyMetrics": [
        {
          "value": "3x",
          "label": "Higher Renewal Rate",
          "description": "Activated vs non-activated customers"
        },
        {
          "value": "5x",
          "label": "More Expansion",
          "description": "Upsell likelihood for activated users"
        },
        {
          "value": "40%",
          "label": "Better Retention",
          "description": "Companies with activation tracking"
        },
        {
          "value": "8 days",
          "label": "Faster Time-to-Value",
          "description": "Average activation speed"
        }
      ]
    },
    "workspace": {
      "domain": "Activation Tracker",
      "questions": [
        {
          "id": "12-2-q1",
          "text": "What is your current strategy for Activation Tracker?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Activation Tracker for ST6Co/ScaleOps6Product"
        },
        {
          "id": "12-2-q2",
          "text": "How do you measure success in Activation Tracker?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Activation Tracker for ST6Co/ScaleOps6Product"
        },
        {
          "id": "12-2-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Activation Tracker for ST6Co/ScaleOps6Product"
        },
        {
          "id": "12-2-q4",
          "text": "What specific evidence demonstrates your Activation Tracker effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "12-2-q5",
          "text": "What are your next steps to improve Activation Tracker?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Pricing Tools (ProfitWell, Price Intelligently)",
        "A/B Testing (Optimizely, VWO)",
        "Survey Tools (Qualtrics, SurveyMonkey)",
        "Analytics (ChartMogul, Baremetrics)"
      ],
      "templates": [
        "Pricing Analysis Worksheet",
        "Van Westendorp Survey",
        "Pricing Committee Deck",
        "Price Elasticity Model"
      ],
      "bestPractices": [
        "Test pricing with small segments first",
        "Grandfather existing customers carefully",
        "Bundle features to increase perceived value",
        "Monitor competitor pricing monthly"
      ]
    },
    "analysis": {
      "domain": "Activation Tracker",
      "dimensions": [
        {
          "name": "Activation Definition",
          "weight": 20,
          "description": "Clear activation criteria"
        },
        {
          "name": "Tracking Systems",
          "weight": 20,
          "description": "Activation monitoring"
        },
        {
          "name": "Activation Rate",
          "weight": 20,
          "description": "Percentage activated"
        },
        {
          "name": "Time to Activation",
          "weight": 20,
          "description": "Activation velocity"
        },
        {
          "name": "Correlation Analysis",
          "weight": 20,
          "description": "Activation to retention"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No activation tracking",
        "26-50": "Basic activation metrics",
        "51-75": "Good activation program",
        "76-90": "Strong activation rates",
        "91-100": "Activation excellence"
      }
    },
    "resources": {
      "domain": "Activation Tracker",
      "templates": [
        "Activation Metrics Dashboard",
        "Time-to-Value Framework",
        "Adoption Playbook"
      ],
      "metrics": [
        "Activation rate (%)",
        "Time to activation (days)",
        "Milestone completion rate",
        "Activated user retention rate"
      ]
    },
    "outputs": {
      "domain": "Activation Tracker",
      "templates": [
        "Activation Metrics Dashboard",
        "Time-to-Value Framework",
        "Adoption Playbook"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "12-1"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.942Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "12-3": {
    "id": "12-3",
    "name": "Success Playbooks",
    "blockId": 12,
    "blockName": "Retention Systems",
    "subId": 3,
    "phase": 5,
    "phaseName": "Scale",
    "category": "retention",
    "agent": {
      "name": "Success Playbook Builder",
      "key": "12c",
      "description": "Creates customer success playbooks",
      "domain": "Success Playbooks"
    },
    "education": {
      "title": "Success Playbooks",
      "what": "A systematic approach to success playbooks that creates customer success playbooks. Evaluates playbook coverage, playbook quality, team adoption, outcome tracking, continuous improvement to ensure excellence and continuous improvement in this critical capability.",
      "why": "Loyal customers spend 67% more than new ones. A well-designed program increases retention, expansion, and referrals.",
      "how": "\n      <h4>Program Components:</h4>\n      <ul>\n        <li><strong>Tiers:</strong> Status levels with increasing benefits</li>\n        <li><strong>Points:</strong> Earned through usage and engagement</li>\n        <li><strong>Rewards:</strong> Tangible benefits and perks</li>\n        <li><strong>Recognition:</strong> Status and exclusivity</li>\n        <li><strong>Gamification:</strong> Challenges and achievements</li>\n      </ul>\n      \n      <h4>Design Process:</h4>\n      <ol>\n        <li>Define program objectives</li>\n        <li>Identify reward behaviors</li>\n        <li>Structure tiers and benefits</li>\n        <li>Calculate economics</li>\n        <li>Build tracking system</li>\n        <li>Launch and iterate</li>\n      </ol>\n    ",
      "examples": [
        "Bronze/Silver/Gold tiers based on annual spend",
        "Points for referrals, case studies, feedback",
        "Rewards: Priority support, exclusive features, swag"
      ],
      "keyMetrics": [
        {
          "value": "40%",
          "label": "Lower Churn",
          "description": "Retention system impact"
        },
        {
          "value": "3.2x",
          "label": "Higher LTV",
          "description": "Customer lifetime value"
        },
        {
          "value": "65%",
          "label": "Better NPS",
          "description": "Customer satisfaction"
        },
        {
          "value": "2.5x",
          "label": "More Advocacy",
          "description": "Customer referrals"
        }
      ]
    },
    "workspace": {
      "domain": "Success Playbooks",
      "questions": [
        {
          "id": "12-3-q1",
          "text": "What is your current strategy for Success Playbooks?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Success Playbooks for ST6Co/ScaleOps6Product"
        },
        {
          "id": "12-3-q2",
          "text": "How do you measure success in Success Playbooks?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Success Playbooks for ST6Co/ScaleOps6Product"
        },
        {
          "id": "12-3-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Success Playbooks for ST6Co/ScaleOps6Product"
        },
        {
          "id": "12-3-q4",
          "text": "What specific evidence demonstrates your Success Playbooks effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "12-3-q5",
          "text": "What are your next steps to improve Success Playbooks?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Meeting Tools (Zoom, Google Meet)",
        "Collaboration (Miro, Mural)",
        "Feedback Collection (Typeform, Airtable)",
        "Community Platforms (Slack, Circle)"
      ],
      "templates": [
        "CAB Charter Template",
        "Member Invitation Letter",
        "Meeting Agenda Framework",
        "Feedback Summary Report"
      ],
      "bestPractices": [
        "Keep CAB size between 8-12 members",
        "Rotate members every 1-2 years",
        "Act on feedback visibly",
        "Provide exclusive benefits to members"
      ]
    },
    "analysis": {
      "domain": "Success Playbooks",
      "dimensions": [
        {
          "name": "Playbook Coverage",
          "weight": 20,
          "description": "Scenario coverage"
        },
        {
          "name": "Playbook Quality",
          "weight": 20,
          "description": "Effectiveness of plays"
        },
        {
          "name": "Team Adoption",
          "weight": 20,
          "description": "Playbook usage"
        },
        {
          "name": "Outcome Tracking",
          "weight": 20,
          "description": "Playbook success rates"
        },
        {
          "name": "Continuous Improvement",
          "weight": 20,
          "description": "Playbook evolution"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No playbooks",
        "26-50": "Basic playbooks",
        "51-75": "Good playbook library",
        "76-90": "Strong playbook system",
        "91-100": "Playbook excellence"
      }
    },
    "resources": {
      "domain": "Success Playbooks",
      "templates": [
        "Customer Success Playbook",
        "Use Case Library",
        "Best Practices Guide"
      ],
      "metrics": [
        "Program participation rate",
        "Tier progression rate",
        "Loyalty program NPS",
        "Incremental revenue per member"
      ]
    },
    "outputs": {
      "domain": "Success Playbooks",
      "templates": [
        "Customer Success Playbook",
        "Use Case Library",
        "Best Practices Guide"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "12-2"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.942Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "12-4": {
    "id": "12-4",
    "name": "Escalation SOPs",
    "blockId": 12,
    "blockName": "Retention Systems",
    "subId": 4,
    "phase": 5,
    "phaseName": "Scale",
    "category": "retention",
    "agent": {
      "name": "Escalation Manager",
      "key": "12d",
      "description": "Manages customer escalations",
      "domain": "Escalation SOPs"
    },
    "education": {
      "title": "Escalation SOPs",
      "what": "A systematic approach to escalation sops that manages customer escalations. Evaluates escalation process, response time, resolution rate, root cause analysis, customer recovery to ensure excellence and continuous improvement in this critical capability.",
      "why": "Pricing is the most powerful profit lever. A 1% price increase can drive 11% profit improvement in SaaS.",
      "how": "\n      <h4>Optimization Dimensions:</h4>\n      <ul>\n        <li><strong>Price Points:</strong> Finding optimal levels</li>\n        <li><strong>Packaging:</strong> Feature bundling strategy</li>\n        <li><strong>Metrics:</strong> Seats vs. usage vs. value</li>\n        <li><strong>Discounting:</strong> Strategic concession framework</li>\n        <li><strong>Increases:</strong> Existing customer adjustments</li>\n      </ul>\n      \n      <h4>Testing Process:</h4>\n      <ol>\n        <li>Analyze current pricing performance</li>\n        <li>Research competitive landscape</li>\n        <li>Survey willingness to pay</li>\n        <li>Design pricing experiments</li>\n        <li>Test with segments</li>\n        <li>Roll out optimizations</li>\n      </ol>\n    ",
      "examples": [
        "A/B test: 20% higher price, 10% lower conversion, 8% more revenue",
        "Good-better-best packaging increased ACV 35%",
        "Usage-based pricing reduced churn 25%"
      ],
      "keyMetrics": [
        {
          "value": "40%",
          "label": "Lower Churn",
          "description": "Retention system impact"
        },
        {
          "value": "3.2x",
          "label": "Higher LTV",
          "description": "Customer lifetime value"
        },
        {
          "value": "65%",
          "label": "Better NPS",
          "description": "Customer satisfaction"
        },
        {
          "value": "2.5x",
          "label": "More Advocacy",
          "description": "Customer referrals"
        }
      ]
    },
    "workspace": {
      "domain": "Escalation SOPs",
      "questions": [
        {
          "id": "12-4-q1",
          "text": "What is your current strategy for Escalation SOPs?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Escalation SOPs for ST6Co/ScaleOps6Product"
        },
        {
          "id": "12-4-q2",
          "text": "How do you measure success in Escalation SOPs?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Escalation SOPs for ST6Co/ScaleOps6Product"
        },
        {
          "id": "12-4-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Escalation SOPs for ST6Co/ScaleOps6Product"
        },
        {
          "id": "12-4-q4",
          "text": "What specific evidence demonstrates your Escalation SOPs effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "12-4-q5",
          "text": "What are your next steps to improve Escalation SOPs?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Customer Success Platforms (Gainsight, Totango)",
        "Product Analytics (Pendo, Amplitude)",
        "Engagement Tools (Intercom, Drift)",
        "Scoring Platforms (MadKudu, Infer)"
      ],
      "templates": [
        "Engagement Scoring Model",
        "Segmentation Framework",
        "Automated Playbooks",
        "Health Score Dashboard"
      ],
      "bestPractices": [
        "Weight recent activity more heavily",
        "Combine product and relationship data",
        "Automate interventions based on scores",
        "Review scoring accuracy quarterly"
      ]
    },
    "analysis": {
      "domain": "Escalation SOPs",
      "dimensions": [
        {
          "name": "Escalation Process",
          "weight": 20,
          "description": "Clear escalation path"
        },
        {
          "name": "Response Time",
          "weight": 20,
          "description": "Escalation response speed"
        },
        {
          "name": "Resolution Rate",
          "weight": 20,
          "description": "Successful resolutions"
        },
        {
          "name": "Root Cause Analysis",
          "weight": 20,
          "description": "Preventing future escalations"
        },
        {
          "name": "Customer Recovery",
          "weight": 20,
          "description": "Post-escalation satisfaction"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Poor escalation handling",
        "26-50": "Basic escalation process",
        "51-75": "Good escalation management",
        "76-90": "Strong escalation program",
        "91-100": "Escalation excellence"
      }
    },
    "resources": {
      "domain": "Escalation SOPs",
      "templates": [
        "Escalation Process Guide",
        "Issue Resolution Template",
        "Crisis Management Plan"
      ],
      "metrics": [
        "Price elasticity",
        "Average contract value",
        "Discount rate",
        "Price realization"
      ]
    },
    "outputs": {
      "domain": "Escalation SOPs",
      "templates": [
        "Escalation Process Guide",
        "Issue Resolution Template",
        "Crisis Management Plan"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "12-3"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.942Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "12-5": {
    "id": "12-5",
    "name": "Renewals Pipelines",
    "blockId": 12,
    "blockName": "Retention Systems",
    "subId": 5,
    "phase": 5,
    "phaseName": "Scale",
    "category": "retention",
    "agent": {
      "name": "Renewal Pipeline Expert",
      "key": "12e",
      "description": "Manages renewal pipeline and forecasting",
      "domain": "Renewals Pipelines"
    },
    "education": {
      "title": "Renewals Pipelines",
      "what": "A systematic approach to renewals pipelines that manages renewal pipeline and forecasting. Evaluates pipeline visibility, early warning system, renewal forecasting, proactive engagement, renewal rates to ensure excellence and continuous improvement in this critical capability.",
      "why": "CABs create deep customer relationships, validate strategy, generate referrals, and reduce churn among your most valuable accounts.",
      "how": "\n      <h4>Board Structure:</h4>\n      <ul>\n        <li><strong>Composition:</strong> 8-12 strategic customers</li>\n        <li><strong>Meetings:</strong> Quarterly virtual, annual in-person</li>\n        <li><strong>Topics:</strong> Product roadmap, industry trends</li>\n        <li><strong>Benefits:</strong> Exclusive access, networking</li>\n        <li><strong>Commitment:</strong> 1-2 year terms</li>\n      </ul>\n      \n      <h4>Implementation Steps:</h4>\n      <ol>\n        <li>Define CAB objectives</li>\n        <li>Select and invite members</li>\n        <li>Create charter and agenda</li>\n        <li>Facilitate engaging sessions</li>\n        <li>Act on feedback</li>\n        <li>Maintain momentum</li>\n      </ol>\n    ",
      "examples": [
        "Quarterly virtual roadmap reviews",
        "Annual innovation summit",
        "Executive networking dinners"
      ],
      "keyMetrics": [
        {
          "value": "40%",
          "label": "Lower Churn",
          "description": "Retention system impact"
        },
        {
          "value": "3.2x",
          "label": "Higher LTV",
          "description": "Customer lifetime value"
        },
        {
          "value": "65%",
          "label": "Better NPS",
          "description": "Customer satisfaction"
        },
        {
          "value": "2.5x",
          "label": "More Advocacy",
          "description": "Customer referrals"
        }
      ]
    },
    "workspace": {
      "domain": "Renewals Pipelines",
      "questions": [
        {
          "id": "12-5-q1",
          "text": "What is your current strategy for Renewals Pipelines?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Renewals Pipelines for ST6Co/ScaleOps6Product"
        },
        {
          "id": "12-5-q2",
          "text": "How do you measure success in Renewals Pipelines?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Renewals Pipelines for ST6Co/ScaleOps6Product"
        },
        {
          "id": "12-5-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Renewals Pipelines for ST6Co/ScaleOps6Product"
        },
        {
          "id": "12-5-q4",
          "text": "What specific evidence demonstrates your Renewals Pipelines effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "12-5-q5",
          "text": "What are your next steps to improve Renewals Pipelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Customer Success (Gainsight, Totango)",
        "Product Analytics (Pendo, Amplitude)",
        "Behavioral Email (Customer.io, Braze)",
        "Data Warehouses (Snowflake, BigQuery)"
      ],
      "templates": [
        "Engagement Scoring Model",
        "Segmentation Framework",
        "Automated Playbooks",
        "Engagement Dashboard"
      ],
      "bestPractices": [
        "Score based on value realization",
        "Update scores in real-time",
        "Trigger automated actions",
        "Validate scoring accuracy quarterly"
      ]
    },
    "analysis": {
      "domain": "Renewals Pipelines",
      "dimensions": [
        {
          "name": "Pipeline Visibility",
          "weight": 20,
          "description": "Renewal pipeline clarity"
        },
        {
          "name": "Early Warning System",
          "weight": 20,
          "description": "Risk identification"
        },
        {
          "name": "Renewal Forecasting",
          "weight": 20,
          "description": "Forecast accuracy"
        },
        {
          "name": "Proactive Engagement",
          "weight": 20,
          "description": "Early renewal discussions"
        },
        {
          "name": "Renewal Rates",
          "weight": 20,
          "description": "Actual renewal performance"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Poor renewal visibility",
        "26-50": "Basic renewal tracking",
        "51-75": "Good renewal pipeline",
        "76-90": "Strong renewal management",
        "91-100": "Renewal excellence"
      }
    },
    "resources": {
      "domain": "Renewals Pipelines",
      "templates": [
        "Renewal Forecast Model",
        "Renewal Playbook",
        "Contract Negotiation Guide"
      ],
      "metrics": [
        "Member engagement rate",
        "Feedback implementation rate",
        "CAB member retention",
        "Reference generation"
      ]
    },
    "outputs": {
      "domain": "Renewals Pipelines",
      "templates": [
        "Renewal Forecast Model",
        "Renewal Playbook",
        "Contract Negotiation Guide"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "12-4"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.942Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "12-6": {
    "id": "12-6",
    "name": "Churn Root-Cause Engine",
    "blockId": 12,
    "blockName": "Retention Systems",
    "subId": 6,
    "phase": 5,
    "phaseName": "Scale",
    "category": "retention",
    "agent": {
      "name": "Churn Root-Cause Analyst",
      "key": "12f",
      "description": "Analyzes root causes of customer churn",
      "domain": "Churn Root-Cause Engine"
    },
    "education": {
      "title": "Churn Root-Cause Engine",
      "what": "A systematic approach to churn root-cause engine that analyzes root causes of customer churn. Evaluates data collection, analysis depth, pattern recognition, predictive modeling, prevention programs to ensure excellence and continuous improvement in this critical capability.",
      "why": "Engagement is the leading indicator of retention and growth. Scoring enables prioritization and personalization at scale.",
      "how": "\n      <h4>Scoring Dimensions:</h4>\n      <ul>\n        <li><strong>Breadth:</strong> Users and departments active</li>\n        <li><strong>Depth:</strong> Features and workflows used</li>\n        <li><strong>Frequency:</strong> Login and usage patterns</li>\n        <li><strong>Recency:</strong> Last activity timing</li>\n        <li><strong>Growth:</strong> Increasing or decreasing trends</li>\n      </ul>\n      \n      <h4>System Development:</h4>\n      <ol>\n        <li>Define engagement metrics</li>\n        <li>Weight by importance</li>\n        <li>Create scoring algorithm</li>\n        <li>Segment by score ranges</li>\n        <li>Build automated workflows</li>\n        <li>Monitor and refine</li>\n      </ol>\n    ",
      "examples": [
        "Power user: 90+ score, daily active, all features",
        "At risk: <40 score, declining usage, no champion",
        "Growth opportunity: 70 score, hitting limits"
      ],
      "keyMetrics": [
        {
          "value": "40%",
          "label": "Lower Churn",
          "description": "Retention system impact"
        },
        {
          "value": "3.2x",
          "label": "Higher LTV",
          "description": "Customer lifetime value"
        },
        {
          "value": "65%",
          "label": "Better NPS",
          "description": "Customer satisfaction"
        },
        {
          "value": "2.5x",
          "label": "More Advocacy",
          "description": "Customer referrals"
        }
      ]
    },
    "workspace": {
      "domain": "Churn Root-Cause Engine",
      "questions": [
        {
          "id": "12-6-q1",
          "text": "What is your current strategy for Churn Root-Cause Engine?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Churn Root-Cause Engine for ST6Co/ScaleOps6Product"
        },
        {
          "id": "12-6-q2",
          "text": "How do you measure success in Churn Root-Cause Engine?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Churn Root-Cause Engine for ST6Co/ScaleOps6Product"
        },
        {
          "id": "12-6-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Churn Root-Cause Engine for ST6Co/ScaleOps6Product"
        },
        {
          "id": "12-6-q4",
          "text": "What specific evidence demonstrates your Churn Root-Cause Engine effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "12-6-q5",
          "text": "What are your next steps to improve Churn Root-Cause Engine?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [],
      "templates": [
        "Engagement Scoring Model",
        "Segmentation Framework",
        "Automated Playbooks"
      ],
      "bestPractices": []
    },
    "analysis": {
      "domain": "Churn Root-Cause Engine",
      "dimensions": [
        {
          "name": "Data Collection",
          "weight": 20,
          "description": "Churn data completeness"
        },
        {
          "name": "Analysis Depth",
          "weight": 20,
          "description": "Root cause identification"
        },
        {
          "name": "Pattern Recognition",
          "weight": 20,
          "description": "Churn patterns"
        },
        {
          "name": "Predictive Modeling",
          "weight": 20,
          "description": "Churn prediction"
        },
        {
          "name": "Prevention Programs",
          "weight": 20,
          "description": "Churn prevention success"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No churn analysis",
        "26-50": "Basic churn tracking",
        "51-75": "Good churn analysis",
        "76-90": "Strong churn prevention",
        "91-100": "Churn prevention excellence"
      }
    },
    "resources": {
      "domain": "Churn Root-Cause Engine",
      "templates": [
        "Churn Analysis Framework",
        "Exit Interview Template",
        "Win-Back Strategy"
      ],
      "metrics": [
        "Average engagement score",
        "Score distribution",
        "Score to retention correlation",
        "Intervention impact"
      ]
    },
    "outputs": {
      "domain": "Churn Root-Cause Engine",
      "templates": [
        "Churn Analysis Framework",
        "Exit Interview Template",
        "Win-Back Strategy"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "12-5"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.942Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "13-1": {
    "id": "13-1",
    "name": "Category Narrative Canvas",
    "blockId": 13,
    "blockName": "Market Domination Strategies",
    "subId": 1,
    "phase": 5,
    "phaseName": "Scale",
    "category": "market",
    "agent": {
      "name": "Category Narrative Designer",
      "key": "13a",
      "description": "Creates compelling category narratives",
      "domain": "Category Narrative Canvas"
    },
    "education": {
      "title": "Category Narrative Canvas",
      "what": "A strategic storytelling framework that helps your company define (or redefine) the market category you are in — positioning you as the leader of a new movement, not just a better version of an old tool.",
      "why": "Category leaders get the highest multiples and inbound interest. Owning the narrative reframes buyer expectations and disarms competitors.",
      "how": "\n      <h4>Category Creation Process:</h4>\n      <ol>\n        <li><strong>Name the category:</strong> Create memorable terminology</li>\n        <li><strong>Define the problem:</strong> Why the old way is broken</li>\n        <li><strong>Paint the vision:</strong> What the new world looks like</li>\n        <li><strong>Establish criteria:</strong> What makes a solution legitimate</li>\n        <li><strong>Claim leadership:</strong> Why you're uniquely positioned</li>\n        <li><strong>Evangelize consistently:</strong> Repeat across all channels</li>\n      </ol>\n      \n      <h4>Narrative Components:</h4>\n      <ul>\n        <li>Problem narrative (status quo is failing)</li>\n        <li>Solution narrative (new approach required)</li>\n        <li>Urgency narrative (why change now)</li>\n        <li>Leadership narrative (why trust us)</li>\n        <li>Movement narrative (join the revolution)</li>\n      </ul>\n      \n      <h4>Distribution Strategy:</h4>\n      <ul>\n        <li>Publish category manifesto</li>\n        <li>Create educational content series</li>\n        <li>Host category-defining events</li>\n        <li>Brief analysts and press</li>\n        <li>Build community of believers</li>\n      </ul>\n    ",
      "examples": [
        "HubSpot created 'Inbound Marketing'",
        "Drift created 'Conversational Marketing'",
        "Gong created 'Revenue Intelligence'"
      ],
      "keyMetrics": [
        {
          "value": "2.8x",
          "label": "Market Share Growth",
          "description": "Category leadership"
        },
        {
          "value": "55%",
          "label": "Brand Recognition",
          "description": "Market presence"
        },
        {
          "value": "40%",
          "label": "Competitive Advantage",
          "description": "Defensibility strength"
        },
        {
          "value": "3.5x",
          "label": "Pricing Power",
          "description": "Premium positioning"
        }
      ]
    },
    "workspace": {
      "domain": "Category Narrative Canvas",
      "questions": [
        {
          "id": "13-1-q1",
          "text": "What is your current strategy for Category Narrative Canvas?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Category Narrative Canvas for ST6Co/ScaleOps6Product"
        },
        {
          "id": "13-1-q2",
          "text": "How do you measure success in Category Narrative Canvas?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Category Narrative Canvas for ST6Co/ScaleOps6Product"
        },
        {
          "id": "13-1-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Category Narrative Canvas for ST6Co/ScaleOps6Product"
        },
        {
          "id": "13-1-q4",
          "text": "What specific evidence demonstrates your Category Narrative Canvas effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "13-1-q5",
          "text": "What are your next steps to improve Category Narrative Canvas?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Category Design (Play Bigger methodology)",
        "Content Marketing (Contently, CoSchedule)",
        "PR Tools (Cision, Muck Rack)",
        "Community Platforms (Circle, Discord)"
      ],
      "templates": [
        "Category Design Canvas",
        "Point of View Document",
        "Category Manifesto Template",
        "Lightning Strike Plan"
      ],
      "bestPractices": [
        "Define category before competition does",
        "Be consistent with terminology",
        "Educate market relentlessly",
        "Build ecosystem around category"
      ]
    },
    "analysis": {
      "domain": "Category Narrative Canvas",
      "dimensions": [
        {
          "name": "Narrative Clarity",
          "weight": 20,
          "description": "Clear category story"
        },
        {
          "name": "Market Resonance",
          "weight": 20,
          "description": "Market acceptance"
        },
        {
          "name": "Differentiation",
          "weight": 20,
          "description": "Unique positioning"
        },
        {
          "name": "Thought Leadership",
          "weight": 20,
          "description": "Industry influence"
        },
        {
          "name": "Adoption Rate",
          "weight": 20,
          "description": "Narrative adoption"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No category narrative",
        "26-50": "Basic positioning",
        "51-75": "Good category story",
        "76-90": "Strong category leadership",
        "91-100": "Category creation mastery"
      }
    },
    "resources": {
      "domain": "Category Narrative Canvas",
      "templates": [
        "Category Design Framework",
        "Point of View Document",
        "Category Manifesto Template"
      ],
      "metrics": [
        "Category search volume",
        "Share of voice",
        "Analyst mentions",
        "Community growth"
      ]
    },
    "outputs": {
      "domain": "Category Narrative Canvas",
      "templates": [
        "Category Design Framework",
        "Point of View Document",
        "Category Manifesto Template"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.942Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "13-2": {
    "id": "13-2",
    "name": "Strategic MOAT Design",
    "blockId": 13,
    "blockName": "Market Domination Strategies",
    "subId": 2,
    "phase": 5,
    "phaseName": "Scale",
    "category": "market",
    "agent": {
      "name": "Strategic Moat Builder",
      "key": "13b",
      "description": "Builds competitive moats and barriers",
      "domain": "Strategic MOAT Design"
    },
    "education": {
      "title": "Strategic MOAT Design",
      "what": "A systematic approach to strategic moat design that builds competitive moats and barriers. Evaluates moat identification, moat depth, network effects, switching costs, moat expansion to ensure excellence and continuous improvement in this critical capability.",
      "why": "Moats win markets. They give investors confidence, raise valuation multiples, and create barriers to entry for fast-followers and copycats.",
      "how": "\n      <h4>Types of Moats:</h4>\n      <ul>\n        <li><strong>Network Effects:</strong> Value increases with users</li>\n        <li><strong>Data Advantage:</strong> Unique datasets improve product</li>\n        <li><strong>Switching Costs:</strong> Expensive/painful to leave</li>\n        <li><strong>Brand Power:</strong> Trust and recognition</li>\n        <li><strong>Economies of Scale:</strong> Unit economics improve</li>\n        <li><strong>Proprietary Tech:</strong> Patents or unique capabilities</li>\n      </ul>\n      \n      <h4>Moat Building Strategy:</h4>\n      <ol>\n        <li>Identify natural advantages in your model</li>\n        <li>Invest deliberately in 1-2 moat types</li>\n        <li>Create compounding mechanisms</li>\n        <li>Track moat strength metrics</li>\n        <li>Communicate moat to investors</li>\n        <li>Defend against erosion</li>\n      </ol>\n      \n      <h4>Moat Measurement:</h4>\n      <ul>\n        <li>Customer retention rates</li>\n        <li>Competitive win rates</li>\n        <li>Pricing power over time</li>\n        <li>Market share trajectory</li>\n        <li>Copycat failure rate</li>\n      </ul>\n    ",
      "examples": [
        "Salesforce: Ecosystem moat with 4000+ app partners",
        "Slack: Network effects within organizations",
        "Palantir: Proprietary data integration capabilities"
      ],
      "keyMetrics": [
        {
          "value": "2.8x",
          "label": "Market Share Growth",
          "description": "Category leadership"
        },
        {
          "value": "55%",
          "label": "Brand Recognition",
          "description": "Market presence"
        },
        {
          "value": "40%",
          "label": "Competitive Advantage",
          "description": "Defensibility strength"
        },
        {
          "value": "3.5x",
          "label": "Pricing Power",
          "description": "Premium positioning"
        }
      ]
    },
    "workspace": {
      "domain": "Strategic MOAT Design",
      "questions": [
        {
          "id": "13-2-q1",
          "text": "What is your current strategy for Strategic MOAT Design?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Strategic MOAT Design for ST6Co/ScaleOps6Product"
        },
        {
          "id": "13-2-q2",
          "text": "How do you measure success in Strategic MOAT Design?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Strategic MOAT Design for ST6Co/ScaleOps6Product"
        },
        {
          "id": "13-2-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Strategic MOAT Design for ST6Co/ScaleOps6Product"
        },
        {
          "id": "13-2-q4",
          "text": "What specific evidence demonstrates your Strategic MOAT Design effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "13-2-q5",
          "text": "What are your next steps to improve Strategic MOAT Design?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Patent Search (Google Patents, USPTO)",
        "Competitive Intelligence (Crayon, Klue)",
        "Market Analysis (CB Insights, PitchBook)",
        "Strategic Planning (Cascade, Perdoo)"
      ],
      "templates": [
        "Moat Assessment Framework",
        "Competitive Defensibility Map",
        "Moat Investment Plan",
        "7 Powers Analysis"
      ],
      "bestPractices": [
        "Focus on 1-2 moat types maximum",
        "Invest consistently in moat building",
        "Measure moat strength quarterly",
        "Communicate moat to investors clearly"
      ]
    },
    "analysis": {
      "domain": "Strategic MOAT Design",
      "dimensions": [
        {
          "name": "Moat Identification",
          "weight": 20,
          "description": "Clear competitive advantages"
        },
        {
          "name": "Moat Depth",
          "weight": 20,
          "description": "Difficulty to replicate"
        },
        {
          "name": "Network Effects",
          "weight": 20,
          "description": "Network value creation"
        },
        {
          "name": "Switching Costs",
          "weight": 20,
          "description": "Customer lock-in"
        },
        {
          "name": "Moat Expansion",
          "weight": 20,
          "description": "Growing advantages"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No competitive moat",
        "26-50": "Weak advantages",
        "51-75": "Good competitive position",
        "76-90": "Strong moats",
        "91-100": "Impregnable position"
      }
    },
    "resources": {
      "domain": "Strategic MOAT Design",
      "templates": [
        "Moat Assessment Framework",
        "Competitive Defensibility Map",
        "Moat Investment Plan"
      ],
      "metrics": [
        "Moat depth score",
        "Time to replicate",
        "Switching cost ($)",
        "Network density"
      ]
    },
    "outputs": {
      "domain": "Strategic MOAT Design",
      "templates": [
        "Moat Assessment Framework",
        "Competitive Defensibility Map",
        "Moat Investment Plan"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "13-1"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.942Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "13-3": {
    "id": "13-3",
    "name": "Ecosystem Leverage Map",
    "blockId": 13,
    "blockName": "Market Domination Strategies",
    "subId": 3,
    "phase": 5,
    "phaseName": "Scale",
    "category": "market",
    "agent": {
      "name": "Ecosystem Mapper",
      "key": "13c",
      "description": "Maps and leverages ecosystem partnerships",
      "domain": "Ecosystem Leverage Map"
    },
    "education": {
      "title": "Ecosystem Leverage Map",
      "what": "A systematic approach to ecosystem leverage map that maps and leverages ecosystem partnerships. Evaluates ecosystem understanding, partnership strategy, integration depth, value exchange, ecosystem growth to ensure excellence and continuous improvement in this critical capability.",
      "why": "Ecosystems create network effects, increase switching costs, and can contribute 30-50% of revenue through partnerships.",
      "how": "\n      <h4>Ecosystem Components:</h4>\n      <ul>\n        <li><strong>Technology Partners:</strong> Integrations and APIs</li>\n        <li><strong>Channel Partners:</strong> Resellers and distributors</li>\n        <li><strong>Service Partners:</strong> Consultants and implementers</li>\n        <li><strong>Platform Extensions:</strong> Apps and plugins</li>\n        <li><strong>Developer Community:</strong> API users and contributors</li>\n      </ul>\n    ",
      "examples": [
        "Salesforce AppExchange with 3,000+ apps",
        "Shopify partner ecosystem driving 40% of revenue",
        "Stripe's 300+ pre-built integrations"
      ],
      "keyMetrics": [
        {
          "value": "2.8x",
          "label": "Market Share Growth",
          "description": "Category leadership"
        },
        {
          "value": "55%",
          "label": "Brand Recognition",
          "description": "Market presence"
        },
        {
          "value": "40%",
          "label": "Competitive Advantage",
          "description": "Defensibility strength"
        },
        {
          "value": "3.5x",
          "label": "Pricing Power",
          "description": "Premium positioning"
        }
      ]
    },
    "workspace": {
      "domain": "Ecosystem Leverage Map",
      "questions": [
        {
          "id": "13-3-q1",
          "text": "What is your current strategy for Ecosystem Leverage Map?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Ecosystem Leverage Map for ST6Co/ScaleOps6Product"
        },
        {
          "id": "13-3-q2",
          "text": "How do you measure success in Ecosystem Leverage Map?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Ecosystem Leverage Map for ST6Co/ScaleOps6Product"
        },
        {
          "id": "13-3-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Ecosystem Leverage Map for ST6Co/ScaleOps6Product"
        },
        {
          "id": "13-3-q4",
          "text": "What specific evidence demonstrates your Ecosystem Leverage Map effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "13-3-q5",
          "text": "What are your next steps to improve Ecosystem Leverage Map?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [],
      "templates": [
        "Ecosystem Development Plan",
        "Platform Strategy Canvas",
        "Network Effects Calculator"
      ],
      "bestPractices": []
    },
    "analysis": {
      "domain": "Ecosystem Leverage Map",
      "dimensions": [
        {
          "name": "Ecosystem Understanding",
          "weight": 20,
          "description": "Market ecosystem clarity"
        },
        {
          "name": "Partnership Strategy",
          "weight": 20,
          "description": "Strategic partnerships"
        },
        {
          "name": "Integration Depth",
          "weight": 20,
          "description": "Technical integrations"
        },
        {
          "name": "Value Exchange",
          "weight": 20,
          "description": "Mutual value creation"
        },
        {
          "name": "Ecosystem Growth",
          "weight": 20,
          "description": "Expanding ecosystem"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Isolated position",
        "26-50": "Few partnerships",
        "51-75": "Good ecosystem presence",
        "76-90": "Strong ecosystem position",
        "91-100": "Ecosystem leadership"
      }
    },
    "resources": {
      "domain": "Ecosystem Leverage Map",
      "templates": [
        "Ecosystem Development Plan",
        "Platform Strategy Canvas",
        "Network Effects Calculator"
      ],
      "metrics": [
        "Number of ecosystem partners",
        "Partner-sourced revenue %",
        "Integration usage rate",
        "Developer community size"
      ]
    },
    "outputs": {
      "domain": "Ecosystem Leverage Map",
      "templates": [
        "Ecosystem Development Plan",
        "Platform Strategy Canvas",
        "Network Effects Calculator"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "13-2"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.942Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "13-4": {
    "id": "13-4",
    "name": "Competitor GTM Monitoring",
    "blockId": 13,
    "blockName": "Market Domination Strategies",
    "subId": 4,
    "phase": 5,
    "phaseName": "Scale",
    "category": "market",
    "agent": {
      "name": "Competitor Monitor",
      "key": "13d",
      "description": "Monitors and analyzes competitive landscape",
      "domain": "Competitor GTM Monitoring"
    },
    "education": {
      "title": "Competitor GTM Monitoring",
      "what": "A systematic approach to competitor gtm monitoring that monitors and analyzes competitive landscape. Evaluates intelligence gathering, analysis quality, response speed, win rate vs competition, differentiation clarity to ensure excellence and continuous improvement in this critical capability.",
      "why": "M&A can accelerate market entry by 2-3 years, acquire talent and technology, and eliminate competition.",
      "how": "\n      <h4>M&A Process:</h4>\n      <ul>\n        <li><strong>Strategy:</strong> Build vs buy vs partner analysis</li>\n        <li><strong>Targeting:</strong> Identify potential acquisitions</li>\n        <li><strong>Evaluation:</strong> Due diligence and valuation</li>\n        <li><strong>Negotiation:</strong> Terms and structure</li>\n        <li><strong>Integration:</strong> Post-merger execution</li>\n      </ul>\n    ",
      "examples": [
        "Acqui-hire of 10-person AI team for $20M",
        "Market expansion through $50M competitor acquisition",
        "Technology acquisition to accelerate roadmap by 18 months"
      ],
      "keyMetrics": [
        {
          "value": "2.8x",
          "label": "Market Share Growth",
          "description": "Category leadership"
        },
        {
          "value": "55%",
          "label": "Brand Recognition",
          "description": "Market presence"
        },
        {
          "value": "40%",
          "label": "Competitive Advantage",
          "description": "Defensibility strength"
        },
        {
          "value": "3.5x",
          "label": "Pricing Power",
          "description": "Premium positioning"
        }
      ]
    },
    "workspace": {
      "domain": "Competitor GTM Monitoring",
      "questions": [
        {
          "id": "13-4-q1",
          "text": "What is your current strategy for Competitor GTM Monitoring?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Competitor GTM Monitoring for ST6Co/ScaleOps6Product"
        },
        {
          "id": "13-4-q2",
          "text": "How do you measure success in Competitor GTM Monitoring?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Competitor GTM Monitoring for ST6Co/ScaleOps6Product"
        },
        {
          "id": "13-4-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Competitor GTM Monitoring for ST6Co/ScaleOps6Product"
        },
        {
          "id": "13-4-q4",
          "text": "What specific evidence demonstrates your Competitor GTM Monitoring effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "13-4-q5",
          "text": "What are your next steps to improve Competitor GTM Monitoring?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [],
      "templates": [
        "M&A Target Evaluation Matrix",
        "Integration Planning Checklist",
        "Synergy Realization Tracker"
      ],
      "bestPractices": []
    },
    "analysis": {
      "domain": "Competitor GTM Monitoring",
      "dimensions": [
        {
          "name": "Intelligence Gathering",
          "weight": 20,
          "description": "Competitive data collection"
        },
        {
          "name": "Analysis Quality",
          "weight": 20,
          "description": "Competitive insights"
        },
        {
          "name": "Response Speed",
          "weight": 20,
          "description": "Reaction to competition"
        },
        {
          "name": "Win Rate vs Competition",
          "weight": 20,
          "description": "Competitive win rates"
        },
        {
          "name": "Differentiation Clarity",
          "weight": 20,
          "description": "Clear differentiation"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Blind to competition",
        "26-50": "Basic awareness",
        "51-75": "Good competitive intel",
        "76-90": "Strong competitive advantage",
        "91-100": "Competitive dominance"
      }
    },
    "resources": {
      "domain": "Competitor GTM Monitoring",
      "templates": [
        "Competitive Intelligence Framework",
        "Market Share Tracker",
        "Strategic Response Playbook"
      ],
      "metrics": [
        "M&A pipeline value",
        "Integration success rate",
        "Synergy realization %",
        "Time to value from acquisition"
      ]
    },
    "outputs": {
      "domain": "Competitor GTM Monitoring",
      "templates": [
        "Competitive Intelligence Framework",
        "Market Share Tracker",
        "Strategic Response Playbook"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "13-3"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.942Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "13-5": {
    "id": "13-5",
    "name": "Brand Architecture Plan",
    "blockId": 13,
    "blockName": "Market Domination Strategies",
    "subId": 5,
    "phase": 5,
    "phaseName": "Scale",
    "category": "market",
    "agent": {
      "name": "Brand Architect",
      "key": "13e",
      "description": "Builds and manages brand strategy",
      "domain": "Brand Architecture Plan"
    },
    "education": {
      "title": "Brand Architecture Plan",
      "what": "A strategic approach to brand architecture plan that aligns organizational efforts with business objectives. Encompasses brand identity, brand consistency, brand recognition, brand equity, brand advocacy to drive systematic execution and measurable results.",
      "why": "Market leaders capture 70% of category profits, have 2x the valuation multiples, and set the rules competitors must follow.",
      "how": "\n      <h4>Leadership Strategies:</h4>\n      <ul>\n        <li><strong>Category Creation:</strong> Define the space</li>\n        <li><strong>Thought Leadership:</strong> Shape the conversation</li>\n        <li><strong>Market Share:</strong> Dominate key segments</li>\n        <li><strong>Innovation:</strong> Stay ahead of the curve</li>\n        <li><strong>Brand Power:</strong> Become the default choice</li>\n      </ul>\n    ",
      "examples": [
        "Owning 40% market share in core segment",
        "CEO keynoting at 5 major industry conferences",
        "Setting industry standards adopted by competitors"
      ],
      "keyMetrics": [
        {
          "value": "2.8x",
          "label": "Market Share Growth",
          "description": "Category leadership"
        },
        {
          "value": "55%",
          "label": "Brand Recognition",
          "description": "Market presence"
        },
        {
          "value": "40%",
          "label": "Competitive Advantage",
          "description": "Defensibility strength"
        },
        {
          "value": "3.5x",
          "label": "Pricing Power",
          "description": "Premium positioning"
        }
      ]
    },
    "workspace": {
      "domain": "Brand Architecture Plan",
      "questions": [
        {
          "id": "13-5-q1",
          "text": "What is your current strategy for Brand Architecture Plan?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Brand Architecture Plan for ST6Co/ScaleOps6Product"
        },
        {
          "id": "13-5-q2",
          "text": "How do you measure success in Brand Architecture Plan?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Brand Architecture Plan for ST6Co/ScaleOps6Product"
        },
        {
          "id": "13-5-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Brand Architecture Plan for ST6Co/ScaleOps6Product"
        },
        {
          "id": "13-5-q4",
          "text": "What specific evidence demonstrates your Brand Architecture Plan effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "13-5-q5",
          "text": "What are your next steps to improve Brand Architecture Plan?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [],
      "templates": [
        "Market Leadership Scorecard",
        "Thought Leadership Calendar",
        "Industry Influence Map"
      ],
      "bestPractices": []
    },
    "analysis": {
      "domain": "Brand Architecture Plan",
      "dimensions": [
        {
          "name": "Brand Identity",
          "weight": 20,
          "description": "Clear brand definition"
        },
        {
          "name": "Brand Consistency",
          "weight": 20,
          "description": "Consistent execution"
        },
        {
          "name": "Brand Recognition",
          "weight": 20,
          "description": "Market awareness"
        },
        {
          "name": "Brand Equity",
          "weight": 20,
          "description": "Brand value"
        },
        {
          "name": "Brand Advocacy",
          "weight": 20,
          "description": "Customer advocacy"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Weak brand presence",
        "26-50": "Basic brand exists",
        "51-75": "Good brand development",
        "76-90": "Strong brand position",
        "91-100": "Iconic brand status"
      }
    },
    "resources": {
      "domain": "Brand Architecture Plan",
      "templates": [
        "Brand Strategy Framework",
        "Brand Guidelines",
        "Messaging Hierarchy"
      ],
      "metrics": [
        "Market share %",
        "Share of voice in media",
        "Brand awareness score",
        "Competitive win rate"
      ]
    },
    "outputs": {
      "domain": "Brand Architecture Plan",
      "templates": [
        "Brand Strategy Framework",
        "Brand Guidelines",
        "Messaging Hierarchy"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "13-4"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.942Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "13-6": {
    "id": "13-6",
    "name": "Defensive GTM Tactics",
    "blockId": 13,
    "blockName": "Market Domination Strategies",
    "subId": 6,
    "phase": 5,
    "phaseName": "Scale",
    "category": "market",
    "agent": {
      "name": "Defensive GTM Strategist",
      "key": "13f",
      "description": "Develops defensive go-to-market strategies",
      "domain": "Defensive GTM Tactics"
    },
    "education": {
      "title": "Defensive GTM Tactics",
      "what": "A systematic approach to defensive gtm tactics that develops defensive go-to-market strategies. Evaluates threat assessment, defense strategies, customer retention, counter-positioning, market share defense to ensure excellence and continuous improvement in this critical capability.",
      "why": "Companies with strong competitive intelligence are 2x more likely to achieve above-average growth and 3x better at retention.",
      "how": "\n      <h4>Intelligence Gathering:</h4>\n      <ul>\n        <li><strong>Public Sources:</strong> Websites, reports, news</li>\n        <li><strong>Customer Intel:</strong> Win/loss interviews</li>\n        <li><strong>Product Analysis:</strong> Feature comparisons</li>\n        <li><strong>Talent Tracking:</strong> Hiring patterns</li>\n        <li><strong>Financial Analysis:</strong> Funding and metrics</li>\n      </ul>\n    ",
      "examples": [
        "Weekly competitive briefing for sales team",
        "Quarterly competitive positioning updates",
        "Real-time alerts on competitor moves"
      ],
      "keyMetrics": [
        {
          "value": "2.8x",
          "label": "Market Share Growth",
          "description": "Category leadership"
        },
        {
          "value": "55%",
          "label": "Brand Recognition",
          "description": "Market presence"
        },
        {
          "value": "40%",
          "label": "Competitive Advantage",
          "description": "Defensibility strength"
        },
        {
          "value": "3.5x",
          "label": "Pricing Power",
          "description": "Premium positioning"
        }
      ]
    },
    "workspace": {
      "domain": "Defensive GTM Tactics",
      "questions": [
        {
          "id": "13-6-q1",
          "text": "What is your current strategy for Defensive GTM Tactics?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Defensive GTM Tactics for ST6Co/ScaleOps6Product"
        },
        {
          "id": "13-6-q2",
          "text": "How do you measure success in Defensive GTM Tactics?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Defensive GTM Tactics for ST6Co/ScaleOps6Product"
        },
        {
          "id": "13-6-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Defensive GTM Tactics for ST6Co/ScaleOps6Product"
        },
        {
          "id": "13-6-q4",
          "text": "What specific evidence demonstrates your Defensive GTM Tactics effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "13-6-q5",
          "text": "What are your next steps to improve Defensive GTM Tactics?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [],
      "templates": [
        "Competitive Intelligence Framework",
        "Market Share Tracker",
        "Strategic Response Playbook"
      ],
      "bestPractices": []
    },
    "analysis": {
      "domain": "Defensive GTM Tactics",
      "dimensions": [
        {
          "name": "Threat Assessment",
          "weight": 20,
          "description": "Competitive threat analysis"
        },
        {
          "name": "Defense Strategies",
          "weight": 20,
          "description": "Defensive playbooks"
        },
        {
          "name": "Customer Retention",
          "weight": 20,
          "description": "Protecting base"
        },
        {
          "name": "Counter-positioning",
          "weight": 20,
          "description": "Competitive responses"
        },
        {
          "name": "Market Share Defense",
          "weight": 20,
          "description": "Share protection"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Vulnerable position",
        "26-50": "Basic defenses",
        "51-75": "Good defensive position",
        "76-90": "Strong market defense",
        "91-100": "Unassailable position"
      }
    },
    "resources": {
      "domain": "Defensive GTM Tactics",
      "templates": [
        "Competitive Defense Playbook",
        "Market Protection Strategy",
        "Counter-Positioning Guide"
      ],
      "metrics": [
        "Competitive win rate",
        "Time to competitive response",
        "Intelligence accuracy score",
        "Market share vs competitors"
      ]
    },
    "outputs": {
      "domain": "Defensive GTM Tactics",
      "templates": [
        "Competitive Defense Playbook",
        "Market Protection Strategy",
        "Counter-Positioning Guide"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "13-5"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.942Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "14-1": {
    "id": "14-1",
    "name": "System Architecture Diagram",
    "blockId": 14,
    "blockName": "Operational Infrastructure",
    "subId": 1,
    "phase": 5,
    "phaseName": "Scale",
    "category": "operations",
    "agent": {
      "name": "System Architecture Expert",
      "key": "14a",
      "description": "Designs scalable system architecture",
      "domain": "System Architecture Diagram"
    },
    "education": {
      "title": "System Architecture Diagram",
      "what": "A visual representation of your end-to-end operational and technical architecture — including how your internal systems, apps, and data flows are connected.",
      "why": "As complexity grows, the lack of system visibility leads to delays, failures, and inconsistent data. This diagram becomes the blueprint for new hires, audits, and integrations.",
      "how": "\n      <h4>Architecture Components:</h4>\n      <ul>\n        <li><strong>Frontend:</strong> Web app, mobile, APIs</li>\n        <li><strong>Backend:</strong> Servers, databases, microservices</li>\n        <li><strong>Data Layer:</strong> Warehouse, ETL, analytics</li>\n        <li><strong>Integrations:</strong> Third-party connections</li>\n        <li><strong>Security:</strong> Auth, encryption, compliance</li>\n        <li><strong>Infrastructure:</strong> Cloud, CDN, monitoring</li>\n      </ul>\n      \n      <h4>Documentation Standards:</h4>\n      <ol>\n        <li>Use standard notation (UML, C4)</li>\n        <li>Show data flow directions</li>\n        <li>Label all components clearly</li>\n        <li>Include version numbers</li>\n        <li>Note ownership and contacts</li>\n        <li>Update quarterly minimum</li>\n      </ol>\n      \n      <h4>Usage Guidelines:</h4>\n      <ul>\n        <li>Onboarding new engineers</li>\n        <li>Planning integrations</li>\n        <li>Security audits</li>\n        <li>Troubleshooting issues</li>\n        <li>Capacity planning</li>\n      </ul>\n    ",
      "examples": [
        "Microservices architecture with 12 services",
        "Event-driven architecture with Kafka",
        "Serverless architecture on AWS Lambda"
      ],
      "keyMetrics": [
        {
          "value": "50%",
          "label": "Operational Efficiency",
          "description": "Process optimization"
        },
        {
          "value": "3x",
          "label": "Scalability",
          "description": "Growth without complexity"
        },
        {
          "value": "45%",
          "label": "Cost Reduction",
          "description": "Infrastructure efficiency"
        },
        {
          "value": "2.5x",
          "label": "System Reliability",
          "description": "Uptime and performance"
        }
      ]
    },
    "workspace": {
      "domain": "System Architecture Diagram",
      "questions": [
        {
          "id": "14-1-q1",
          "text": "What is your current strategy for System Architecture Diagram?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about System Architecture Diagram for ST6Co/ScaleOps6Product"
        },
        {
          "id": "14-1-q2",
          "text": "How do you measure success in System Architecture Diagram?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about System Architecture Diagram for ST6Co/ScaleOps6Product"
        },
        {
          "id": "14-1-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about System Architecture Diagram for ST6Co/ScaleOps6Product"
        },
        {
          "id": "14-1-q4",
          "text": "What specific evidence demonstrates your System Architecture Diagram effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "14-1-q5",
          "text": "What are your next steps to improve System Architecture Diagram?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Diagramming Tools (Lucidchart, Draw.io)",
        "Documentation (Confluence, GitBook)",
        "Monitoring (Datadog, New Relic)",
        "Cloud Platforms (AWS, Azure, GCP)"
      ],
      "templates": [
        "Architecture Diagram Template",
        "System Documentation Guide",
        "Integration Checklist",
        "Disaster Recovery Plan"
      ],
      "bestPractices": [
        "Use standard notation (C4, UML)",
        "Version control architecture docs",
        "Update diagrams with each release",
        "Include data flow and security layers"
      ]
    },
    "analysis": {
      "domain": "System Architecture Diagram",
      "dimensions": [
        {
          "name": "Architecture Design",
          "weight": 20,
          "description": "System design quality"
        },
        {
          "name": "Scalability",
          "weight": 20,
          "description": "Ability to scale"
        },
        {
          "name": "Integration Capability",
          "weight": 20,
          "description": "System connectivity"
        },
        {
          "name": "Performance",
          "weight": 20,
          "description": "System performance"
        },
        {
          "name": "Maintenance",
          "weight": 20,
          "description": "System maintainability"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Poor architecture",
        "26-50": "Basic systems",
        "51-75": "Good architecture",
        "76-90": "Strong systems",
        "91-100": "World-class architecture"
      }
    },
    "resources": {
      "domain": "System Architecture Diagram",
      "templates": [
        "Architecture Diagram Template",
        "System Documentation Guide",
        "Integration Checklist"
      ],
      "metrics": [
        "System uptime %",
        "API response time",
        "Error rate",
        "Integration count"
      ]
    },
    "outputs": {
      "domain": "System Architecture Diagram",
      "templates": [
        "Architecture Diagram Template",
        "System Documentation Guide",
        "Integration Checklist"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.943Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "14-2": {
    "id": "14-2",
    "name": "Revenue Engine Map",
    "blockId": 14,
    "blockName": "Operational Infrastructure",
    "subId": 2,
    "phase": 5,
    "phaseName": "Scale",
    "category": "operations",
    "agent": {
      "name": "Revenue Engine Mapper",
      "key": "14b",
      "description": "Maps and optimizes revenue operations",
      "domain": "Revenue Engine Map"
    },
    "education": {
      "title": "Revenue Engine Map",
      "what": "A visual or document that connects marketing, sales, CS, and finance systems together — mapping how leads flow through the funnel to become revenue and renewals.",
      "why": "You need a single view of how revenue is generated — not just a sales pipeline, but the entire value delivery flow. This enables forecasting, system optimization, and GTM alignment.",
      "how": "\n      <h4>Revenue Flow Stages:</h4>\n      <ol>\n        <li><strong>Demand Generation:</strong> Creating awareness and interest</li>\n        <li><strong>Lead Capture:</strong> Converting visitors to contacts</li>\n        <li><strong>Qualification:</strong> Identifying sales-ready leads</li>\n        <li><strong>Sales Process:</strong> Discovery through close</li>\n        <li><strong>Onboarding:</strong> Activation and value delivery</li>\n        <li><strong>Expansion:</strong> Upsell and cross-sell</li>\n        <li><strong>Renewal:</strong> Retention and advocacy</li>\n      </ol>\n      \n      <h4>System Integration Points:</h4>\n      <ul>\n        <li>Marketing Automation → CRM</li>\n        <li>CRM → Customer Success Platform</li>\n        <li>CS Platform → Billing System</li>\n        <li>Billing → Financial Reporting</li>\n        <li>All Systems → Data Warehouse</li>\n      </ul>\n      \n      <h4>Optimization Opportunities:</h4>\n      <ul>\n        <li>Identify conversion bottlenecks</li>\n        <li>Automate manual handoffs</li>\n        <li>Improve data quality</li>\n        <li>Reduce cycle times</li>\n        <li>Increase visibility</li>\n      </ul>\n    ",
      "examples": [
        "HubSpot → Salesforce → Gainsight → Stripe flow",
        "PLG motion: Product → Billing → CRM → CS",
        "Enterprise: Outbound → CRM → CPQ → ERP"
      ],
      "keyMetrics": [
        {
          "value": "50%",
          "label": "Operational Efficiency",
          "description": "Process optimization"
        },
        {
          "value": "3x",
          "label": "Scalability",
          "description": "Growth without complexity"
        },
        {
          "value": "45%",
          "label": "Cost Reduction",
          "description": "Infrastructure efficiency"
        },
        {
          "value": "2.5x",
          "label": "System Reliability",
          "description": "Uptime and performance"
        }
      ]
    },
    "workspace": {
      "domain": "Revenue Engine Map",
      "questions": [
        {
          "id": "14-2-q1",
          "text": "What is your current strategy for Revenue Engine Map?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Revenue Engine Map for ST6Co/ScaleOps6Product"
        },
        {
          "id": "14-2-q2",
          "text": "How do you measure success in Revenue Engine Map?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Revenue Engine Map for ST6Co/ScaleOps6Product"
        },
        {
          "id": "14-2-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Revenue Engine Map for ST6Co/ScaleOps6Product"
        },
        {
          "id": "14-2-q4",
          "text": "What specific evidence demonstrates your Revenue Engine Map effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "14-2-q5",
          "text": "What are your next steps to improve Revenue Engine Map?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "RevOps Platforms (Funnel.io, Dreamdata)",
        "Integration Tools (Zapier, Workato)",
        "Data Warehouses (Snowflake, BigQuery)",
        "BI Tools (Looker, Tableau)"
      ],
      "templates": [
        "Revenue Operations Map",
        "Systems Integration Plan",
        "GTM Tech Stack Audit",
        "Data Flow Diagram"
      ],
      "bestPractices": [
        "Map entire customer journey end-to-end",
        "Identify and eliminate data silos",
        "Automate handoffs between teams",
        "Create single source of truth for metrics"
      ]
    },
    "analysis": {
      "domain": "Revenue Engine Map",
      "dimensions": [
        {
          "name": "Process Mapping",
          "weight": 20,
          "description": "Revenue process clarity"
        },
        {
          "name": "Efficiency Metrics",
          "weight": 20,
          "description": "Operational efficiency"
        },
        {
          "name": "Automation Level",
          "weight": 20,
          "description": "Process automation"
        },
        {
          "name": "Data Flow",
          "weight": 20,
          "description": "Data integration"
        },
        {
          "name": "Optimization Rate",
          "weight": 20,
          "description": "Continuous improvement"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Chaotic operations",
        "26-50": "Basic processes",
        "51-75": "Good RevOps",
        "76-90": "Strong revenue engine",
        "91-100": "RevOps excellence"
      }
    },
    "resources": {
      "domain": "Revenue Engine Map",
      "templates": [
        "Revenue Operations Map",
        "Systems Integration Plan",
        "GTM Tech Stack Audit"
      ],
      "metrics": [
        "Pipeline velocity",
        "Conversion rates by stage",
        "System sync accuracy",
        "Revenue per employee"
      ]
    },
    "outputs": {
      "domain": "Revenue Engine Map",
      "templates": [
        "Revenue Operations Map",
        "Systems Integration Plan",
        "GTM Tech Stack Audit"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "14-1"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.943Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "14-3": {
    "id": "14-3",
    "name": "Internal Dashboards",
    "blockId": 14,
    "blockName": "Operational Infrastructure",
    "subId": 3,
    "phase": 5,
    "phaseName": "Scale",
    "category": "operations",
    "agent": {
      "name": "Dashboard Designer",
      "key": "14c",
      "description": "Creates operational dashboards",
      "domain": "Internal Dashboards"
    },
    "education": {
      "title": "Internal Dashboards",
      "what": "A systematic framework for monitoring and measuring internal dashboards through data collection, analysis, and actionable insights. Tracks key metrics including metric selection, data quality, visualization, real-time updates, user adoption to enable proactive decision-making and continuous improvement.",
      "why": "Manual processes limit scalability and introduce errors. Automation enables growth without proportional headcount increases.",
      "how": "Document all processes, identify automation candidates, calculate ROI for each, prioritize by impact and feasibility, implement in phases.",
      "examples": [
        "Automated onboarding reducing setup time from 2 hours to 15 minutes",
        "Invoice processing automation saving 20 hours/week",
        "Customer support ticket routing reducing response time 50%"
      ],
      "keyMetrics": [
        {
          "value": "50%",
          "label": "Operational Efficiency",
          "description": "Process optimization"
        },
        {
          "value": "3x",
          "label": "Scalability",
          "description": "Growth without complexity"
        },
        {
          "value": "45%",
          "label": "Cost Reduction",
          "description": "Infrastructure efficiency"
        },
        {
          "value": "2.5x",
          "label": "System Reliability",
          "description": "Uptime and performance"
        }
      ]
    },
    "workspace": {
      "domain": "Internal Dashboards",
      "questions": [
        {
          "id": "14-3-q1",
          "text": "What is your current strategy for Internal Dashboards?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Internal Dashboards for ST6Co/ScaleOps6Product"
        },
        {
          "id": "14-3-q2",
          "text": "How do you measure success in Internal Dashboards?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Internal Dashboards for ST6Co/ScaleOps6Product"
        },
        {
          "id": "14-3-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Internal Dashboards for ST6Co/ScaleOps6Product"
        },
        {
          "id": "14-3-q4",
          "text": "What specific evidence demonstrates your Internal Dashboards effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "14-3-q5",
          "text": "What are your next steps to improve Internal Dashboards?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [],
      "templates": [
        "Process Automation Blueprint",
        "Workflow Optimization Guide",
        "Automation ROI Calculator"
      ],
      "bestPractices": []
    },
    "analysis": {
      "domain": "Internal Dashboards",
      "dimensions": [
        {
          "name": "Metric Selection",
          "weight": 20,
          "description": "Relevant KPIs"
        },
        {
          "name": "Data Quality",
          "weight": 20,
          "description": "Data accuracy"
        },
        {
          "name": "Visualization",
          "weight": 20,
          "description": "Dashboard clarity"
        },
        {
          "name": "Real-time Updates",
          "weight": 20,
          "description": "Data freshness"
        },
        {
          "name": "User Adoption",
          "weight": 20,
          "description": "Dashboard usage"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No dashboards",
        "26-50": "Basic reporting",
        "51-75": "Good dashboards",
        "76-90": "Strong analytics",
        "91-100": "Analytics excellence"
      }
    },
    "resources": {
      "domain": "Internal Dashboards",
      "templates": [
        "Executive Dashboard Template",
        "Operational Metrics Dashboard",
        "KPI Tracking System"
      ],
      "metrics": [
        "Process automation percentage",
        "Time saved through automation",
        "Error reduction rate",
        "Cost per transaction"
      ]
    },
    "outputs": {
      "domain": "Internal Dashboards",
      "templates": [
        "Executive Dashboard Template",
        "Operational Metrics Dashboard",
        "KPI Tracking System"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "14-2"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.943Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "14-4": {
    "id": "14-4",
    "name": "Tool Consolidation Tracker",
    "blockId": 14,
    "blockName": "Operational Infrastructure",
    "subId": 4,
    "phase": 5,
    "phaseName": "Scale",
    "category": "operations",
    "agent": {
      "name": "Tool Consolidator",
      "key": "14d",
      "description": "Optimizes and consolidates tool stack",
      "domain": "Tool Consolidation Tracker"
    },
    "education": {
      "title": "Tool Consolidation Tracker",
      "what": "A systematic framework for monitoring and measuring tool consolidation tracker through data collection, analysis, and actionable insights. Tracks key metrics including tool inventory, redundancy elimination, integration quality, cost optimization, user experience to enable proactive decision-making and continuous improvement.",
      "why": "Data is your competitive advantage. The right infrastructure enables real-time insights, predictive analytics, and data-driven growth.",
      "how": "Design data model, implement collection systems, build data warehouse, create analytics layer, establish governance, enable self-service analytics.",
      "examples": [
        "Real-time dashboard showing key metrics across all departments",
        "Predictive churn model with 85% accuracy",
        "Data warehouse consolidating 15 different data sources"
      ],
      "keyMetrics": [
        {
          "value": "50%",
          "label": "Operational Efficiency",
          "description": "Process optimization"
        },
        {
          "value": "3x",
          "label": "Scalability",
          "description": "Growth without complexity"
        },
        {
          "value": "45%",
          "label": "Cost Reduction",
          "description": "Infrastructure efficiency"
        },
        {
          "value": "2.5x",
          "label": "System Reliability",
          "description": "Uptime and performance"
        }
      ]
    },
    "workspace": {
      "domain": "Tool Consolidation Tracker",
      "questions": [
        {
          "id": "14-4-q1",
          "text": "What is your current strategy for Tool Consolidation Tracker?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Tool Consolidation Tracker for ST6Co/ScaleOps6Product"
        },
        {
          "id": "14-4-q2",
          "text": "How do you measure success in Tool Consolidation Tracker?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Tool Consolidation Tracker for ST6Co/ScaleOps6Product"
        },
        {
          "id": "14-4-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Tool Consolidation Tracker for ST6Co/ScaleOps6Product"
        },
        {
          "id": "14-4-q4",
          "text": "What specific evidence demonstrates your Tool Consolidation Tracker effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "14-4-q5",
          "text": "What are your next steps to improve Tool Consolidation Tracker?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [],
      "templates": [
        "Data Architecture Blueprint",
        "Data Governance Framework",
        "Analytics Implementation Plan"
      ],
      "bestPractices": []
    },
    "analysis": {
      "domain": "Tool Consolidation Tracker",
      "dimensions": [
        {
          "name": "Tool Inventory",
          "weight": 20,
          "description": "Complete tool mapping"
        },
        {
          "name": "Redundancy Elimination",
          "weight": 20,
          "description": "Removing duplicates"
        },
        {
          "name": "Integration Quality",
          "weight": 20,
          "description": "Tool connectivity"
        },
        {
          "name": "Cost Optimization",
          "weight": 20,
          "description": "Tool spend efficiency"
        },
        {
          "name": "User Experience",
          "weight": 20,
          "description": "Tool usability"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Tool chaos",
        "26-50": "Many redundant tools",
        "51-75": "Good tool management",
        "76-90": "Optimized tool stack",
        "91-100": "Perfect tool ecosystem"
      }
    },
    "resources": {
      "domain": "Tool Consolidation Tracker",
      "templates": [
        "Tool Audit Template",
        "Consolidation Roadmap",
        "ROI Analysis Framework"
      ],
      "metrics": [
        "Data quality score",
        "Query response time",
        "Data freshness (latency)",
        "Analytics adoption rate"
      ]
    },
    "outputs": {
      "domain": "Tool Consolidation Tracker",
      "templates": [
        "Tool Audit Template",
        "Consolidation Roadmap",
        "ROI Analysis Framework"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "14-3"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.943Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "14-5": {
    "id": "14-5",
    "name": "RevOps Playbook",
    "blockId": 14,
    "blockName": "Operational Infrastructure",
    "subId": 5,
    "phase": 5,
    "phaseName": "Scale",
    "category": "operations",
    "agent": {
      "name": "RevOps Playbook Builder",
      "key": "14e",
      "description": "Creates revenue operations playbooks",
      "domain": "RevOps Playbook"
    },
    "education": {
      "title": "RevOps Playbook",
      "what": "A systematic approach to revops playbook that creates revenue operations playbooks. Evaluates process documentation, best practices, training materials, compliance standards, update frequency to ensure excellence and continuous improvement in this critical capability.",
      "why": "Security breaches can destroy companies. Proactive security and compliance build trust and prevent catastrophic losses.",
      "how": "Assess risks, implement controls, document policies, train employees, monitor continuously, conduct audits, maintain certifications.",
      "examples": [
        "SOC 2 Type II certification achieved in 6 months",
        "Zero security incidents in past 12 months",
        "GDPR compliance across all systems"
      ],
      "keyMetrics": [
        {
          "value": "50%",
          "label": "Operational Efficiency",
          "description": "Process optimization"
        },
        {
          "value": "3x",
          "label": "Scalability",
          "description": "Growth without complexity"
        },
        {
          "value": "45%",
          "label": "Cost Reduction",
          "description": "Infrastructure efficiency"
        },
        {
          "value": "2.5x",
          "label": "System Reliability",
          "description": "Uptime and performance"
        }
      ]
    },
    "workspace": {
      "domain": "RevOps Playbook",
      "questions": [
        {
          "id": "14-5-q1",
          "text": "What is your current strategy for RevOps Playbook?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about RevOps Playbook for ST6Co/ScaleOps6Product"
        },
        {
          "id": "14-5-q2",
          "text": "How do you measure success in RevOps Playbook?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about RevOps Playbook for ST6Co/ScaleOps6Product"
        },
        {
          "id": "14-5-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about RevOps Playbook for ST6Co/ScaleOps6Product"
        },
        {
          "id": "14-5-q4",
          "text": "What specific evidence demonstrates your RevOps Playbook effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "14-5-q5",
          "text": "What are your next steps to improve RevOps Playbook?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [],
      "templates": [
        "Security Policy Template",
        "Compliance Checklist",
        "Incident Response Plan"
      ],
      "bestPractices": []
    },
    "analysis": {
      "domain": "RevOps Playbook",
      "dimensions": [
        {
          "name": "Process Documentation",
          "weight": 20,
          "description": "Complete process docs"
        },
        {
          "name": "Best Practices",
          "weight": 20,
          "description": "Proven methodologies"
        },
        {
          "name": "Training Materials",
          "weight": 20,
          "description": "Learning resources"
        },
        {
          "name": "Compliance Standards",
          "weight": 20,
          "description": "Process compliance"
        },
        {
          "name": "Update Frequency",
          "weight": 20,
          "description": "Playbook maintenance"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No documentation",
        "26-50": "Basic documentation",
        "51-75": "Good playbooks",
        "76-90": "Strong RevOps guides",
        "91-100": "RevOps mastery"
      }
    },
    "resources": {
      "domain": "RevOps Playbook",
      "templates": [
        "Revenue Operations Playbook",
        "Process Documentation",
        "SOP Library"
      ],
      "metrics": [
        "Security incident frequency",
        "Compliance audit score",
        "Mean time to detect/respond",
        "Security training completion rate"
      ]
    },
    "outputs": {
      "domain": "RevOps Playbook",
      "templates": [
        "Revenue Operations Playbook",
        "Process Documentation",
        "SOP Library"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "14-4"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.943Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "14-6": {
    "id": "14-6",
    "name": "Internal SLA Policy",
    "blockId": 14,
    "blockName": "Operational Infrastructure",
    "subId": 6,
    "phase": 5,
    "phaseName": "Scale",
    "category": "operations",
    "agent": {
      "name": "SLA Policy Manager",
      "key": "14f",
      "description": "Manages service level agreements",
      "domain": "Internal SLA Policy"
    },
    "education": {
      "title": "Internal SLA Policy",
      "what": "A systematic approach to internal sla policy that manages service level agreements. Evaluates sla definition, performance tracking, compliance rate, escalation process, customer satisfaction to ensure excellence and continuous improvement in this critical capability.",
      "why": "Most startups hit scalability walls that slow growth. Planning ahead prevents costly re-architecture and maintains velocity.",
      "how": "Model growth scenarios, identify bottlenecks, design scalable architecture, implement gradually, monitor performance, optimize continuously.",
      "examples": [
        "System handling 100x traffic with 3x infrastructure cost",
        "Customer support scaling to 10,000 tickets/day with same team",
        "Onboarding 1,000 customers/month vs 100 previously"
      ],
      "keyMetrics": [
        {
          "value": "50%",
          "label": "Operational Efficiency",
          "description": "Process optimization"
        },
        {
          "value": "3x",
          "label": "Scalability",
          "description": "Growth without complexity"
        },
        {
          "value": "45%",
          "label": "Cost Reduction",
          "description": "Infrastructure efficiency"
        },
        {
          "value": "2.5x",
          "label": "System Reliability",
          "description": "Uptime and performance"
        }
      ]
    },
    "workspace": {
      "domain": "Internal SLA Policy",
      "questions": [
        {
          "id": "14-6-q1",
          "text": "What is your current strategy for Internal SLA Policy?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Internal SLA Policy for ST6Co/ScaleOps6Product"
        },
        {
          "id": "14-6-q2",
          "text": "How do you measure success in Internal SLA Policy?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Internal SLA Policy for ST6Co/ScaleOps6Product"
        },
        {
          "id": "14-6-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Internal SLA Policy for ST6Co/ScaleOps6Product"
        },
        {
          "id": "14-6-q4",
          "text": "What specific evidence demonstrates your Internal SLA Policy effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "14-6-q5",
          "text": "What are your next steps to improve Internal SLA Policy?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [],
      "templates": [
        "Scalability Roadmap",
        "Capacity Planning Model",
        "Infrastructure Cost Optimizer"
      ],
      "bestPractices": []
    },
    "analysis": {
      "domain": "Internal SLA Policy",
      "dimensions": [
        {
          "name": "SLA Definition",
          "weight": 20,
          "description": "Clear SLA terms"
        },
        {
          "name": "Performance Tracking",
          "weight": 20,
          "description": "SLA monitoring"
        },
        {
          "name": "Compliance Rate",
          "weight": 20,
          "description": "SLA achievement"
        },
        {
          "name": "Escalation Process",
          "weight": 20,
          "description": "SLA breach handling"
        },
        {
          "name": "Customer Satisfaction",
          "weight": 20,
          "description": "SLA impact on CSAT"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No SLAs",
        "26-50": "Basic SLAs",
        "51-75": "Good SLA management",
        "76-90": "Strong SLA performance",
        "91-100": "SLA excellence"
      }
    },
    "resources": {
      "domain": "Internal SLA Policy",
      "templates": [
        "SLA Definition Template",
        "Service Level Agreement",
        "Performance Standards Guide"
      ],
      "metrics": [
        "System capacity utilization",
        "Cost per transaction",
        "Performance at scale",
        "Scalability debt ratio"
      ]
    },
    "outputs": {
      "domain": "Internal SLA Policy",
      "templates": [
        "SLA Definition Template",
        "Service Level Agreement",
        "Performance Standards Guide"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "14-5"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.943Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "15-1": {
    "id": "15-1",
    "name": "Executive Team",
    "blockId": 15,
    "blockName": "Leadership Expansion",
    "subId": 1,
    "phase": 5,
    "phaseName": "Scale",
    "category": "leadership",
    "agent": {
      "name": "ExecutiveHiringAgent",
      "key": "15a",
      "description": "Manages executive hiring process",
      "domain": "Executive Team"
    },
    "education": {
      "title": "Executive Team",
      "what": "A strategic plan for identifying, recruiting, and onboarding senior executives aligned with company growth stages and needs.",
      "why": "The right executive at the right time can accelerate growth 10x. The wrong hire can set you back years and millions.",
      "how": "\n      <h4>Roadmap Components:</h4>\n      <ul>\n        <li><strong>Role Definition:</strong> Clear mandate and expectations</li>\n        <li><strong>Timing:</strong> When to hire based on milestones</li>\n        <li><strong>Profile:</strong> Experience and competency requirements</li>\n        <li><strong>Process:</strong> Search and evaluation approach</li>\n        <li><strong>Integration:</strong> Onboarding and success plan</li>\n      </ul>\n      \n      <h4>Hiring Process:</h4>\n      <ol>\n        <li>Define role and success criteria</li>\n        <li>Engage search firm if needed</li>\n        <li>Build diverse candidate pipeline</li>\n        <li>Conduct thorough assessment</li>\n        <li>Check references deeply</li>\n        <li>Structure competitive offer</li>\n      </ol>\n    ",
      "examples": [
        "VP Sales at $2M ARR, VP Marketing at $5M",
        "CFO before Series B, CPO at 50 employees",
        "Industry veteran for enterprise push"
      ],
      "keyMetrics": [
        {
          "value": "3.2x",
          "label": "Leadership Effectiveness",
          "description": "Team performance impact"
        },
        {
          "value": "60%",
          "label": "Better Decisions",
          "description": "Strategic clarity"
        },
        {
          "value": "40%",
          "label": "Higher Retention",
          "description": "Leadership quality"
        },
        {
          "value": "2.8x",
          "label": "Faster Scaling",
          "description": "Leadership capacity"
        }
      ]
    },
    "workspace": {
      "domain": "Executive Team",
      "questions": [
        {
          "id": "15-1-q1",
          "text": "What is your current strategy for Executive Team?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Executive Team for ST6Co/ScaleOps6Product"
        },
        {
          "id": "15-1-q2",
          "text": "How do you measure success in Executive Team?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Executive Team for ST6Co/ScaleOps6Product"
        },
        {
          "id": "15-1-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Executive Team for ST6Co/ScaleOps6Product"
        },
        {
          "id": "15-1-q4",
          "text": "How does leadership drive this initiative?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "15-1-q5",
          "text": "What specific evidence demonstrates your Executive Team effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "15-1-q6",
          "text": "What are your next steps to improve Executive Team?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Executive Search Firms (Spencer Stuart, Heidrick)",
        "Assessment Tools (Predictive Index, Caliper)",
        "ATS Systems (Greenhouse, Lever)",
        "Background Check (Sterling, Checkr)"
      ],
      "templates": [
        "Executive Job Description",
        "Interview Scorecard",
        "90-Day Plan Template",
        "Executive Onboarding Checklist"
      ],
      "bestPractices": [
        "Start searches 6 months before need",
        "Check references thoroughly",
        "Involve board in key hires",
        "Create detailed onboarding plan"
      ]
    },
    "analysis": {
      "domain": "Executive Team",
      "dimensions": [
        {
          "name": "Role Definition",
          "weight": 20,
          "description": "Clear VP requirements"
        },
        {
          "name": "Candidate Pipeline",
          "weight": 20,
          "description": "Quality candidate flow"
        },
        {
          "name": "Assessment Process",
          "weight": 20,
          "description": "Evaluation rigor"
        },
        {
          "name": "Cultural Fit",
          "weight": 20,
          "description": "Culture alignment"
        },
        {
          "name": "Success Rate",
          "weight": 20,
          "description": "Hiring success"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Poor hiring process",
        "26-50": "Basic hiring exists",
        "51-75": "Good hiring practice",
        "76-90": "Strong executive hiring",
        "91-100": "World-class talent acquisition"
      }
    },
    "resources": {
      "domain": "Executive Team",
      "templates": [
        "Executive Job Description",
        "Interview Scorecard",
        "90-Day Plan Template"
      ],
      "metrics": [
        "Time to hire",
        "Quality of hire score",
        "Executive retention rate",
        "Impact on growth metrics"
      ]
    },
    "outputs": {
      "domain": "Executive Team",
      "templates": [
        "Executive Job Description",
        "Interview Scorecard",
        "90-Day Plan Template"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.943Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "15-2": {
    "id": "15-2",
    "name": "Board Development",
    "blockId": 15,
    "blockName": "Leadership Expansion",
    "subId": 2,
    "phase": 5,
    "phaseName": "Scale",
    "category": "leadership",
    "agent": {
      "name": "BoardGovernanceAgent",
      "key": "15b",
      "description": "Develops succession planning programs",
      "domain": "Board Development"
    },
    "education": {
      "title": "Board Development",
      "what": "The structure, processes, and practices for effective board oversight including composition, meetings, and decision-making.",
      "why": "Good governance accelerates growth through better decisions, valuable connections, and investor confidence. Poor governance creates dysfunction.",
      "how": "\n      <h4>Governance Elements:</h4>\n      <ul>\n        <li><strong>Composition:</strong> Independent, investor, founder seats</li>\n        <li><strong>Committees:</strong> Audit, compensation, governance</li>\n        <li><strong>Meetings:</strong> Frequency, agenda, materials</li>\n        <li><strong>Decisions:</strong> Authority matrix and voting</li>\n        <li><strong>Communication:</strong> Between meeting updates</li>\n      </ul>\n      \n      <h4>Framework Development:</h4>\n      <ol>\n        <li>Define board composition</li>\n        <li>Recruit independent directors</li>\n        <li>Create board charter</li>\n        <li>Establish meeting rhythm</li>\n        <li>Build reporting templates</li>\n        <li>Set annual calendar</li>\n      </ol>\n    ",
      "examples": [
        "5-person board: 2 founders, 2 investors, 1 independent",
        "Quarterly meetings with monthly updates",
        "Audit committee for Series B preparation"
      ],
      "keyMetrics": [
        {
          "value": "3.2x",
          "label": "Leadership Effectiveness",
          "description": "Team performance impact"
        },
        {
          "value": "60%",
          "label": "Better Decisions",
          "description": "Strategic clarity"
        },
        {
          "value": "40%",
          "label": "Higher Retention",
          "description": "Leadership quality"
        },
        {
          "value": "2.8x",
          "label": "Faster Scaling",
          "description": "Leadership capacity"
        }
      ]
    },
    "workspace": {
      "domain": "Board Development",
      "questions": [
        {
          "id": "15-2-q1",
          "text": "What is your current strategy for Board Development?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Board Development for ST6Co/ScaleOps6Product"
        },
        {
          "id": "15-2-q2",
          "text": "How do you measure success in Board Development?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Board Development for ST6Co/ScaleOps6Product"
        },
        {
          "id": "15-2-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Board Development for ST6Co/ScaleOps6Product"
        },
        {
          "id": "15-2-q4",
          "text": "How does leadership drive this initiative?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "15-2-q5",
          "text": "What specific evidence demonstrates your Board Development effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "15-2-q6",
          "text": "What are your next steps to improve Board Development?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Board Management (Diligent, BoardEffect)",
        "Virtual Meeting (Zoom, Teams)",
        "Document Sharing (DocSend, Box)",
        "Governance Tools (OnBoard, Aprio)"
      ],
      "templates": [
        "Board Charter",
        "Board Deck Template",
        "Director Onboarding Kit",
        "Committee Charter"
      ],
      "bestPractices": [
        "Send board materials 5 days in advance",
        "Keep meetings strategic, not operational",
        "Document all decisions clearly",
        "Conduct annual board evaluations"
      ]
    },
    "analysis": {
      "domain": "Board Development",
      "dimensions": [
        {
          "name": "Succession Mapping",
          "weight": 20,
          "description": "Clear succession plans"
        },
        {
          "name": "Talent Development",
          "weight": 20,
          "description": "Leadership development"
        },
        {
          "name": "Bench Strength",
          "weight": 20,
          "description": "Ready replacements"
        },
        {
          "name": "Risk Mitigation",
          "weight": 20,
          "description": "Key person risk"
        },
        {
          "name": "Transition Success",
          "weight": 20,
          "description": "Smooth transitions"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No succession planning",
        "26-50": "Basic planning exists",
        "51-75": "Good succession program",
        "76-90": "Strong leadership pipeline",
        "91-100": "Succession excellence"
      }
    },
    "resources": {
      "domain": "Board Development",
      "templates": [
        "Board Charter",
        "Board Deck Template",
        "Director Onboarding Kit"
      ],
      "metrics": [
        "Board meeting attendance",
        "Decision velocity",
        "Director engagement score",
        "Governance maturity assessment"
      ]
    },
    "outputs": {
      "domain": "Board Development",
      "templates": [
        "Board Charter",
        "Board Deck Template",
        "Director Onboarding Kit"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "15-1"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.943Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "15-3": {
    "id": "15-3",
    "name": "Succession Planning",
    "blockId": 15,
    "blockName": "Leadership Expansion",
    "subId": 3,
    "phase": 5,
    "phaseName": "Scale",
    "category": "leadership",
    "agent": {
      "name": "SuccessionPlanningAgent",
      "key": "15c",
      "description": "Manages executive meeting rhythms",
      "domain": "Succession Planning"
    },
    "education": {
      "title": "Succession Planning",
      "what": "A strategic approach to succession planning that aligns organizational efforts with business objectives. Encompasses meeting structure, agenda quality, decision making, action follow-through, communication flow to drive systematic execution and measurable results.",
      "why": "70% of senior roles filled internally perform better. Succession planning reduces risk, motivates talent, and maintains culture.",
      "how": "\n      <h4>Planning Components:</h4>\n      <ul>\n        <li><strong>Critical Roles:</strong> Positions vital to success</li>\n        <li><strong>Succession Pool:</strong> Ready now, ready later</li>\n        <li><strong>Development Plans:</strong> Closing readiness gaps</li>\n        <li><strong>Emergency Coverage:</strong> Immediate backup plans</li>\n        <li><strong>Transition Process:</strong> Knowledge transfer approach</li>\n      </ul>\n      \n      <h4>Matrix Development:</h4>\n      <ol>\n        <li>Identify critical positions</li>\n        <li>Assess internal talent</li>\n        <li>Map successors by readiness</li>\n        <li>Create development plans</li>\n        <li>Provide stretch assignments</li>\n        <li>Review and update quarterly</li>\n      </ol>\n    ",
      "examples": [
        "CEO: 2 internal candidates, 18-month development",
        "CTO: Ready-now successor identified",
        "Emergency: COO covers CEO for 90 days"
      ],
      "keyMetrics": [
        {
          "value": "3.2x",
          "label": "Leadership Effectiveness",
          "description": "Team performance impact"
        },
        {
          "value": "60%",
          "label": "Better Decisions",
          "description": "Strategic clarity"
        },
        {
          "value": "40%",
          "label": "Higher Retention",
          "description": "Leadership quality"
        },
        {
          "value": "2.8x",
          "label": "Faster Scaling",
          "description": "Leadership capacity"
        }
      ]
    },
    "workspace": {
      "domain": "Succession Planning",
      "questions": [
        {
          "id": "15-3-q1",
          "text": "What is your current strategy for succession planning?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Succession Planning for ST6Co/ScaleOps6Product"
        },
        {
          "id": "15-3-q2",
          "text": "How do you measure success in succession planning?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Succession Planning for ST6Co/ScaleOps6Product"
        },
        {
          "id": "15-3-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Succession Planning for ST6Co/ScaleOps6Product"
        },
        {
          "id": "15-3-q4",
          "text": "How does leadership drive this initiative?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "15-3-q5",
          "text": "What specific evidence demonstrates your Succession Planning effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "15-3-q6",
          "text": "What are your next steps to improve Succession Planning?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Talent Management (Workday, SuccessFactors)",
        "9-Box Grid Tools (Culture Amp, Lattice)",
        "Learning Platforms (LinkedIn Learning, Coursera)",
        "Assessment Tools (Hogan, DDI)"
      ],
      "templates": [
        "Succession Planning Grid",
        "Talent Review Template",
        "Development Action Plan",
        "Emergency Coverage Plan"
      ],
      "bestPractices": [
        "Identify 2-3 successors for critical roles",
        "Develop internal talent proactively",
        "Test successors with stretch assignments",
        "Update succession plans quarterly"
      ]
    },
    "analysis": {
      "domain": "Succession Planning",
      "dimensions": [
        {
          "name": "Meeting Structure",
          "weight": 20,
          "description": "Clear meeting cadence"
        },
        {
          "name": "Agenda Quality",
          "weight": 20,
          "description": "Effective agendas"
        },
        {
          "name": "Decision Making",
          "weight": 20,
          "description": "Decision velocity"
        },
        {
          "name": "Action Follow-through",
          "weight": 20,
          "description": "Action completion"
        },
        {
          "name": "Communication Flow",
          "weight": 20,
          "description": "Information cascade"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Chaotic meetings",
        "26-50": "Basic meeting structure",
        "51-75": "Good meeting rhythm",
        "76-90": "Strong executive cadence",
        "91-100": "Perfect execution rhythm"
      }
    },
    "resources": {
      "domain": "Succession Planning",
      "templates": [
        "Succession Planning Grid",
        "Talent Review Template",
        "Development Action Plan"
      ],
      "metrics": [
        "Succession coverage ratio",
        "Internal promotion rate",
        "Successor readiness score",
        "Transition success rate"
      ]
    },
    "outputs": {
      "domain": "Succession Planning",
      "templates": [
        "Succession Planning Grid",
        "Talent Review Template",
        "Development Action Plan"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "15-2"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.943Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "15-4": {
    "id": "15-4",
    "name": "Stakeholder Alignment",
    "blockId": 15,
    "blockName": "Leadership Expansion",
    "subId": 4,
    "phase": 5,
    "phaseName": "Scale",
    "category": "leadership",
    "agent": {
      "name": "StakeholderAlignmentAgent",
      "key": "15d",
      "description": "Monitors organizational culture health",
      "domain": "Stakeholder Alignment"
    },
    "education": {
      "title": "Stakeholder Alignment",
      "what": "A systematic approach to managing relationships and expectations with investors, board members, and other key stakeholders.",
      "why": "Misaligned stakeholders create friction, slow decisions, and can derail companies. Alignment enables speed and support when you need it most.",
      "how": "\n      <h4>Alignment Dimensions:</h4>\n      <ul>\n        <li><strong>Vision:</strong> Long-term direction agreement</li>\n        <li><strong>Strategy:</strong> Path to achieve vision</li>\n        <li><strong>Metrics:</strong> How success is measured</li>\n        <li><strong>Timeline:</strong> Milestone expectations</li>\n        <li><strong>Risk Tolerance:</strong> Appetite for bold moves</li>\n      </ul>\n      \n      <h4>Alignment Process:</h4>\n      <ol>\n        <li>Map stakeholder interests</li>\n        <li>Identify alignment gaps</li>\n        <li>Facilitate alignment sessions</li>\n        <li>Document agreements</li>\n        <li>Establish communication rhythm</li>\n        <li>Monitor and maintain alignment</li>\n      </ol>\n    ",
      "examples": [
        "Quarterly investor updates with consistent metrics",
        "Annual strategy session with board",
        "Monthly check-ins with lead investor"
      ],
      "keyMetrics": [
        {
          "value": "3.2x",
          "label": "Leadership Effectiveness",
          "description": "Team performance impact"
        },
        {
          "value": "60%",
          "label": "Better Decisions",
          "description": "Strategic clarity"
        },
        {
          "value": "40%",
          "label": "Higher Retention",
          "description": "Leadership quality"
        },
        {
          "value": "2.8x",
          "label": "Faster Scaling",
          "description": "Leadership capacity"
        }
      ]
    },
    "workspace": {
      "domain": "Stakeholder Alignment",
      "questions": [
        {
          "id": "15-4-q1",
          "text": "What is your current strategy for Stakeholder Alignment?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Stakeholder Alignment for ST6Co/ScaleOps6Product"
        },
        {
          "id": "15-4-q2",
          "text": "How do you measure success in Stakeholder Alignment?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Stakeholder Alignment for ST6Co/ScaleOps6Product"
        },
        {
          "id": "15-4-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Stakeholder Alignment for ST6Co/ScaleOps6Product"
        },
        {
          "id": "15-4-q4",
          "text": "How does leadership drive this initiative?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "15-4-q5",
          "text": "What specific evidence demonstrates your Stakeholder Alignment effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "15-4-q6",
          "text": "What are your next steps to improve Stakeholder Alignment?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Stakeholder Mapping (Miro, Mural)",
        "Communication Tools (Slack, Email)",
        "Survey Platforms (SurveyMonkey, Typeform)",
        "Project Management (Asana, Monday.com)"
      ],
      "templates": [
        "Stakeholder Map",
        "Alignment Canvas",
        "Communication Calendar",
        "Stakeholder Analysis Matrix"
      ],
      "bestPractices": [
        "Map all stakeholders and their interests",
        "Communicate proactively and consistently",
        "Address conflicts early and directly",
        "Build coalition of supporters"
      ]
    },
    "analysis": {
      "domain": "Stakeholder Alignment",
      "dimensions": [
        {
          "name": "Culture Metrics",
          "weight": 20,
          "description": "Culture measurement"
        },
        {
          "name": "Employee Engagement",
          "weight": 20,
          "description": "Engagement levels"
        },
        {
          "name": "Values Alignment",
          "weight": 20,
          "description": "Living the values"
        },
        {
          "name": "Feedback Systems",
          "weight": 20,
          "description": "Culture feedback loops"
        },
        {
          "name": "Culture Evolution",
          "weight": 20,
          "description": "Culture development"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Toxic culture",
        "26-50": "Culture issues exist",
        "51-75": "Good culture health",
        "76-90": "Strong culture",
        "91-100": "Exceptional culture"
      }
    },
    "resources": {
      "domain": "Stakeholder Alignment",
      "templates": [
        "Stakeholder Map",
        "Alignment Canvas",
        "Communication Calendar"
      ],
      "metrics": [
        "Stakeholder NPS",
        "Decision speed",
        "Conflict frequency",
        "Support level rating"
      ]
    },
    "outputs": {
      "domain": "Stakeholder Alignment",
      "templates": [
        "Stakeholder Map",
        "Alignment Canvas",
        "Communication Calendar"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "15-3"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.943Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "15-5": {
    "id": "15-5",
    "name": "Investor Relations",
    "blockId": 15,
    "blockName": "Leadership Expansion",
    "subId": 5,
    "phase": 5,
    "phaseName": "Scale",
    "category": "leadership",
    "agent": {
      "name": "InvestorRelationsAgent",
      "key": "15e",
      "description": "Designs organizational structures",
      "domain": "Investor Relations"
    },
    "education": {
      "title": "Investor Relations",
      "what": "Structured processes for managing investor communications, fundraising, and board reporting to maintain trust and support.",
      "why": "Investors can be your greatest asset or biggest distraction. Professional IR practices build confidence and unlock value-add support.",
      "how": "\n      <h4>Protocol Components:</h4>\n      <ul>\n        <li><strong>Regular Updates:</strong> Monthly/quarterly reports</li>\n        <li><strong>Metrics Reporting:</strong> Consistent KPI tracking</li>\n        <li><strong>Fundraising Process:</strong> Structured approach</li>\n        <li><strong>Crisis Communication:</strong> Bad news protocols</li>\n        <li><strong>Information Rights:</strong> Data room management</li>\n      </ul>\n      \n      <h4>Implementation Steps:</h4>\n      <ol>\n        <li>Define reporting requirements</li>\n        <li>Create update templates</li>\n        <li>Set communication calendar</li>\n        <li>Build metrics dashboard</li>\n        <li>Establish escalation process</li>\n        <li>Maintain data room</li>\n      </ol>\n    ",
      "examples": [
        "Monthly email: Metrics, wins, challenges, asks",
        "Quarterly call: Deep dive on strategy",
        "Annual meeting: In-person planning session"
      ],
      "keyMetrics": [
        {
          "value": "3.2x",
          "label": "Leadership Effectiveness",
          "description": "Team performance impact"
        },
        {
          "value": "60%",
          "label": "Better Decisions",
          "description": "Strategic clarity"
        },
        {
          "value": "40%",
          "label": "Higher Retention",
          "description": "Leadership quality"
        },
        {
          "value": "2.8x",
          "label": "Faster Scaling",
          "description": "Leadership capacity"
        }
      ]
    },
    "workspace": {
      "domain": "Investor Relations",
      "questions": [
        {
          "id": "15-5-q1",
          "text": "What is your current strategy for Investor Relations?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Investor Relations for ST6Co/ScaleOps6Product"
        },
        {
          "id": "15-5-q2",
          "text": "How do you measure success in Investor Relations?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Investor Relations for ST6Co/ScaleOps6Product"
        },
        {
          "id": "15-5-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Investor Relations for ST6Co/ScaleOps6Product"
        },
        {
          "id": "15-5-q4",
          "text": "How does leadership drive this initiative?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "15-5-q5",
          "text": "What specific evidence demonstrates your Investor Relations effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "15-5-q6",
          "text": "What are your next steps to improve Investor Relations?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Investor CRM (Visible, Foundersuite)",
        "Data Rooms (DocSend, Dropbox)",
        "Reporting Tools (Carta, AngelList)",
        "Communication (Mailchimp, Substack)"
      ],
      "templates": [
        "Investor Update Template",
        "Board Report Format",
        "Data Room Checklist",
        "Fundraising Deck Template"
      ],
      "bestPractices": [
        "Send updates monthly, even with bad news",
        "Be transparent about challenges",
        "Make specific asks for help",
        "Track investor engagement metrics"
      ]
    },
    "analysis": {
      "domain": "Investor Relations",
      "dimensions": [
        {
          "name": "Structure Clarity",
          "weight": 20,
          "description": "Clear org design"
        },
        {
          "name": "Span of Control",
          "weight": 20,
          "description": "Management ratios"
        },
        {
          "name": "Communication Lines",
          "weight": 20,
          "description": "Information flow"
        },
        {
          "name": "Scalability",
          "weight": 20,
          "description": "Growth accommodation"
        },
        {
          "name": "Agility",
          "weight": 20,
          "description": "Organizational flexibility"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Dysfunctional structure",
        "26-50": "Basic org structure",
        "51-75": "Good organization",
        "76-90": "Strong org design",
        "91-100": "Optimal organization"
      }
    },
    "resources": {
      "domain": "Investor Relations",
      "templates": [
        "Investor Update Template",
        "Board Report Format",
        "Data Room Checklist"
      ],
      "metrics": [
        "Update consistency",
        "Investor engagement rate",
        "Fundraising efficiency",
        "Investor NPS"
      ]
    },
    "outputs": {
      "domain": "Investor Relations",
      "templates": [
        "Investor Update Template",
        "Board Report Format",
        "Data Room Checklist"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "15-4"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.943Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "15-6": {
    "id": "15-6",
    "name": "Leadership Dynamics",
    "blockId": 15,
    "blockName": "Leadership Expansion",
    "subId": 6,
    "phase": 5,
    "phaseName": "Scale",
    "category": "leadership",
    "agent": {
      "name": "LeadershipDynamicsAgent",
      "key": "15f",
      "description": "Integrates diversity, equity, and inclusion",
      "domain": "Leadership Dynamics"
    },
    "education": {
      "title": "Leadership Dynamics",
      "what": "A systematic approach to leadership dynamics that integrates diversity, equity, and inclusion. Evaluates dei strategy, representation metrics, inclusion practices, equity systems, cultural integration to ensure excellence and continuous improvement in this critical capability.",
      "why": "The #1 reason startups fail is founder conflict. Healthy leadership dynamics drive 3x better performance than dysfunctional teams.",
      "how": "\n      <h4>Dynamic Elements:</h4>\n      <ul>\n        <li><strong>Trust:</strong> Psychological safety and vulnerability</li>\n        <li><strong>Conflict:</strong> Healthy debate and resolution</li>\n        <li><strong>Commitment:</strong> Buy-in and alignment</li>\n        <li><strong>Accountability:</strong> Peer-to-peer ownership</li>\n        <li><strong>Results:</strong> Collective over individual</li>\n      </ul>\n      \n      <h4>Development Process:</h4>\n      <ol>\n        <li>Assess current dynamics</li>\n        <li>Identify dysfunction areas</li>\n        <li>Facilitate team sessions</li>\n        <li>Establish team norms</li>\n        <li>Practice difficult conversations</li>\n        <li>Measure and improve</li>\n      </ol>\n    ",
      "examples": [
        "Weekly exec team standup for alignment",
        "Quarterly offsite for strategy and bonding",
        "360 feedback for continuous improvement"
      ],
      "keyMetrics": [
        {
          "value": "3.2x",
          "label": "Leadership Effectiveness",
          "description": "Team performance impact"
        },
        {
          "value": "60%",
          "label": "Better Decisions",
          "description": "Strategic clarity"
        },
        {
          "value": "40%",
          "label": "Higher Retention",
          "description": "Leadership quality"
        },
        {
          "value": "2.8x",
          "label": "Faster Scaling",
          "description": "Leadership capacity"
        }
      ]
    },
    "workspace": {
      "domain": "Leadership Dynamics",
      "questions": [
        {
          "id": "15-6-q1",
          "text": "What is your current strategy for Leadership Dynamics?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Leadership Dynamics for ST6Co/ScaleOps6Product"
        },
        {
          "id": "15-6-q2",
          "text": "How do you measure success in Leadership Dynamics?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Leadership Dynamics for ST6Co/ScaleOps6Product"
        },
        {
          "id": "15-6-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Leadership Dynamics for ST6Co/ScaleOps6Product"
        },
        {
          "id": "15-6-q4",
          "text": "How does leadership drive this initiative?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000
        },
        {
          "id": "15-6-q5",
          "text": "What specific evidence demonstrates your Leadership Dynamics effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "15-6-q6",
          "text": "What are your next steps to improve Leadership Dynamics?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Team Assessment (Five Behaviors, Lencioni)",
        "360 Feedback (Culture Amp, Lattice)",
        "Team Building (TeamBonding, Outback)",
        "Communication (Slack, Microsoft Teams)"
      ],
      "templates": [
        "Team Assessment Survey",
        "Team Charter Template",
        "Conflict Resolution Guide",
        "Team Norms Document"
      ],
      "bestPractices": [
        "Invest in team building regularly",
        "Address conflicts immediately",
        "Create psychological safety",
        "Celebrate wins together"
      ]
    },
    "analysis": {
      "domain": "Leadership Dynamics",
      "dimensions": [
        {
          "name": "DEI Strategy",
          "weight": 20,
          "description": "Clear DEI plan"
        },
        {
          "name": "Representation Metrics",
          "weight": 20,
          "description": "Diversity measures"
        },
        {
          "name": "Inclusion Practices",
          "weight": 20,
          "description": "Inclusive behaviors"
        },
        {
          "name": "Equity Systems",
          "weight": 20,
          "description": "Fair processes"
        },
        {
          "name": "Cultural Integration",
          "weight": 20,
          "description": "DEI in culture"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No DEI focus",
        "26-50": "Basic DEI efforts",
        "51-75": "Good DEI progress",
        "76-90": "Strong DEI culture",
        "91-100": "DEI excellence"
      }
    },
    "resources": {
      "domain": "Leadership Dynamics",
      "templates": [
        "Team Assessment Survey",
        "Team Charter Template",
        "Conflict Resolution Guide"
      ],
      "metrics": [
        "Team effectiveness score",
        "Decision quality rating",
        "Conflict resolution time",
        "Team satisfaction"
      ]
    },
    "outputs": {
      "domain": "Leadership Dynamics",
      "templates": [
        "Team Assessment Survey",
        "Team Charter Template",
        "Conflict Resolution Guide"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "15-5"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.943Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "16-1": {
    "id": "16-1",
    "name": "Market Selection",
    "blockId": 16,
    "blockName": "Global Expansion Opportunities",
    "subId": 1,
    "phase": 5,
    "phaseName": "Scale",
    "category": "global",
    "agent": {
      "name": "Market Entry Analyst",
      "key": "16a",
      "description": "Analyzes new market entry opportunities",
      "domain": "Market Selection"
    },
    "education": {
      "title": "Market Selection",
      "what": "A comprehensive plan for entering new geographic markets including market selection, entry mode, and go-to-market approach.",
      "why": "International expansion can double your TAM but has a 70% failure rate without proper strategy. The right approach de-risks entry.",
      "how": "\n      <h4>Strategy Components:</h4>\n      <ul>\n        <li><strong>Market Selection:</strong> Size, fit, competition analysis</li>\n        <li><strong>Entry Mode:</strong> Direct, partner, acquisition</li>\n        <li><strong>Localization:</strong> Product and marketing adaptation</li>\n        <li><strong>Operations:</strong> Legal, tax, employment setup</li>\n        <li><strong>Go-to-Market:</strong> Sales and marketing approach</li>\n      </ul>\n      \n      <h4>Planning Process:</h4>\n      <ol>\n        <li>Analyze market opportunities</li>\n        <li>Assess readiness and resources</li>\n        <li>Choose entry strategy</li>\n        <li>Build local team or partnerships</li>\n        <li>Adapt product and messaging</li>\n        <li>Launch and iterate</li>\n      </ol>\n    ",
      "examples": [
        "UK first: English-speaking, similar regulations",
        "Partnership entry: Local reseller for APAC",
        "Acquisition: Buy local competitor for quick entry"
      ],
      "keyMetrics": [
        {
          "value": "2.5x",
          "label": "Market Expansion",
          "description": "Geographic growth"
        },
        {
          "value": "50%",
          "label": "Faster Entry",
          "description": "Time to new markets"
        },
        {
          "value": "40%",
          "label": "Lower Risk",
          "description": "Systematic expansion"
        },
        {
          "value": "3x",
          "label": "Global Revenue",
          "description": "International contribution"
        }
      ]
    },
    "workspace": {
      "domain": "Market Selection",
      "questions": [
        {
          "id": "16-1-q1",
          "text": "What is your current strategy for market selection?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Market Selection for ST6Co/ScaleOps6Product"
        },
        {
          "id": "16-1-q2",
          "text": "How do you measure success in market selection?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Market Selection for ST6Co/ScaleOps6Product"
        },
        {
          "id": "16-1-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Market Selection for ST6Co/ScaleOps6Product"
        },
        {
          "id": "16-1-q4",
          "text": "What specific evidence demonstrates your Market Selection effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "16-1-q5",
          "text": "What are your next steps to improve Market Selection?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Market Research (Euromonitor, Statista)",
        "Competitive Intelligence (SimilarWeb, SEMrush)",
        "Legal Services (Local counsel networks)",
        "Localization (Smartling, Phrase)"
      ],
      "templates": [
        "Market Entry Canvas",
        "Localization Checklist",
        "Partnership Agreement Template",
        "Go-to-Market Plan"
      ],
      "bestPractices": [
        "Start with English-speaking markets",
        "Partner before going direct",
        "Validate demand before investing",
        "Hire local talent early"
      ]
    },
    "analysis": {
      "domain": "Market Selection",
      "dimensions": [
        {
          "name": "Market Analysis",
          "weight": 20,
          "description": "Market opportunity assessment"
        },
        {
          "name": "Entry Strategy",
          "weight": 20,
          "description": "Go-to-market approach"
        },
        {
          "name": "Risk Assessment",
          "weight": 20,
          "description": "Market entry risks"
        },
        {
          "name": "Resource Planning",
          "weight": 20,
          "description": "Required investments"
        },
        {
          "name": "Success Metrics",
          "weight": 20,
          "description": "Entry success criteria"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No expansion planning",
        "26-50": "Basic market research",
        "51-75": "Good entry analysis",
        "76-90": "Strong expansion strategy",
        "91-100": "Expansion excellence"
      }
    },
    "resources": {
      "domain": "Market Selection",
      "templates": [
        "Market Entry Canvas",
        "Market Sizing Model",
        "Entry Strategy Framework"
      ],
      "metrics": [
        "Market penetration rate",
        "Time to first customer",
        "Localization ROI",
        "Market share growth"
      ]
    },
    "outputs": {
      "domain": "Market Selection",
      "templates": [
        "Market Entry Canvas",
        "Market Sizing Model",
        "Entry Strategy Framework"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.943Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "16-2": {
    "id": "16-2",
    "name": "Localization Infrastructure",
    "blockId": 16,
    "blockName": "Global Expansion Opportunities",
    "subId": 2,
    "phase": 5,
    "phaseName": "Scale",
    "category": "global",
    "agent": {
      "name": "Localization Expert",
      "key": "16b",
      "description": "Manages product and content localization",
      "domain": "Localization Infrastructure"
    },
    "education": {
      "title": "Localization Infrastructure",
      "what": "A systematic approach to localization infrastructure that manages product and content localization. Evaluates localization strategy, language coverage, cultural adaptation, technical implementation, quality assurance to ensure excellence and continuous improvement in this critical capability.",
      "why": "75% of customers prefer to buy in their native language. Proper localization increases conversion rates by 70% in new markets.",
      "how": "\n      <h4>Localization Areas:</h4>\n      <ul>\n        <li><strong>Language:</strong> UI, documentation, support</li>\n        <li><strong>Currency:</strong> Pricing and payment methods</li>\n        <li><strong>Compliance:</strong> Local regulations and standards</li>\n        <li><strong>Culture:</strong> Messaging and imagery adaptation</li>\n        <li><strong>Features:</strong> Market-specific functionality</li>\n      </ul>\n      \n      <h4>Roadmap Development:</h4>\n      <ol>\n        <li>Prioritize markets by opportunity</li>\n        <li>Assess localization requirements</li>\n        <li>Define MVP localization</li>\n        <li>Build translation process</li>\n        <li>Implement and test</li>\n        <li>Gather feedback and iterate</li>\n      </ol>\n    ",
      "examples": [
        "Phase 1: UI translation for top 3 languages",
        "Phase 2: Local payment methods and currency",
        "Phase 3: Market-specific features and compliance"
      ],
      "keyMetrics": [
        {
          "value": "2.5x",
          "label": "Market Expansion",
          "description": "Geographic growth"
        },
        {
          "value": "50%",
          "label": "Faster Entry",
          "description": "Time to new markets"
        },
        {
          "value": "40%",
          "label": "Lower Risk",
          "description": "Systematic expansion"
        },
        {
          "value": "3x",
          "label": "Global Revenue",
          "description": "International contribution"
        }
      ]
    },
    "workspace": {
      "domain": "Localization Infrastructure",
      "questions": [
        {
          "id": "16-2-q1",
          "text": "What is your current strategy for Localization Infrastructure Infrastructure?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Localization Infrastructure Infrastructure for ST6Co/ScaleOps6Product"
        },
        {
          "id": "16-2-q2",
          "text": "How do you measure success in Localization Infrastructure Infrastructure?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Localization Infrastructure Infrastructure for ST6Co/ScaleOps6Product"
        },
        {
          "id": "16-2-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Localization Infrastructure Infrastructure for ST6Co/ScaleOps6Product"
        },
        {
          "id": "16-2-q4",
          "text": "What specific evidence demonstrates your Localization Infrastructure Infrastructure effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "16-2-q5",
          "text": "What are your next steps to improve Localization Infrastructure Infrastructure?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Translation Management (Smartling, Crowdin)",
        "Localization Testing (Applanga, LingoHub)",
        "Cultural Consulting (Hofstede Insights)",
        "Payment Providers (Stripe, Adyen)"
      ],
      "templates": [
        "Localization Requirements Matrix",
        "Translation Style Guide",
        "Market Launch Checklist",
        "Cultural Adaptation Guide"
      ],
      "bestPractices": [
        "Localize more than just language",
        "Test with native speakers",
        "Adapt pricing to local purchasing power",
        "Consider local regulations early"
      ]
    },
    "analysis": {
      "domain": "Localization Infrastructure",
      "dimensions": [
        {
          "name": "Localization Strategy",
          "weight": 20,
          "description": "Clear localization plan"
        },
        {
          "name": "Language Coverage",
          "weight": 20,
          "description": "Language support"
        },
        {
          "name": "Cultural Adaptation",
          "weight": 20,
          "description": "Cultural sensitivity"
        },
        {
          "name": "Technical Implementation",
          "weight": 20,
          "description": "Localization infrastructure"
        },
        {
          "name": "Quality Assurance",
          "weight": 20,
          "description": "Localization quality"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No localization",
        "26-50": "Basic translation",
        "51-75": "Good localization",
        "76-90": "Strong local adaptation",
        "91-100": "Localization excellence"
      }
    },
    "resources": {
      "domain": "Localization Infrastructure",
      "templates": [
        "Localization Requirements Matrix",
        "Translation Style Guide",
        "Market Launch Checklist"
      ],
      "metrics": [
        "Localization completeness",
        "Local market conversion rate",
        "Support ticket language distribution",
        "Revenue by geography"
      ]
    },
    "outputs": {
      "domain": "Localization Infrastructure",
      "templates": [
        "Localization Requirements Matrix",
        "Translation Style Guide",
        "Market Launch Checklist"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "16-1"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.943Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "16-3": {
    "id": "16-3",
    "name": "International Pricing Matrix",
    "blockId": 16,
    "blockName": "Global Expansion Opportunities",
    "subId": 3,
    "phase": 5,
    "phaseName": "Scale",
    "category": "global",
    "agent": {
      "name": "International Pricing Strategist",
      "key": "16c",
      "description": "Develops international pricing strategies",
      "domain": "International Pricing Matrix"
    },
    "education": {
      "title": "International Pricing Matrix",
      "what": "A systematic approach to international pricing matrix that develops international pricing strategies. Evaluates pricing research, currency strategy, local competition, value perception, margin management to ensure excellence and continuous improvement in this critical capability.",
      "why": "Global operations complexity grows exponentially. A playbook ensures consistency, compliance, and efficiency across markets.",
      "how": "\n      <h4>Operational Areas:</h4>\n      <ul>\n        <li><strong>Legal Entity:</strong> Subsidiary vs. branch setup</li>\n        <li><strong>Employment:</strong> Local hiring and compliance</li>\n        <li><strong>Finance:</strong> Banking, tax, and reporting</li>\n        <li><strong>Support:</strong> Follow-the-sun coverage</li>\n        <li><strong>Data:</strong> Privacy and residency requirements</li>\n      </ul>\n      \n      <h4>Playbook Creation:</h4>\n      <ol>\n        <li>Document current operations</li>\n        <li>Research local requirements</li>\n        <li>Design scalable processes</li>\n        <li>Select global vendors</li>\n        <li>Create compliance checklists</li>\n        <li>Train local teams</li>\n      </ol>\n    ",
      "examples": [
        "Entity setup: 60-day process with legal partner",
        "Employment: PEO for <10 employees per country",
        "Support: 24/7 coverage across 3 time zones"
      ],
      "keyMetrics": [
        {
          "value": "2.5x",
          "label": "Market Expansion",
          "description": "Geographic growth"
        },
        {
          "value": "50%",
          "label": "Faster Entry",
          "description": "Time to new markets"
        },
        {
          "value": "40%",
          "label": "Lower Risk",
          "description": "Systematic expansion"
        },
        {
          "value": "3x",
          "label": "Global Revenue",
          "description": "International contribution"
        }
      ]
    },
    "workspace": {
      "domain": "International Pricing Matrix",
      "questions": [
        {
          "id": "16-3-q1",
          "text": "What is your current strategy for International Pricing Matrix?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about International Pricing Matrix for ST6Co/ScaleOps6Product"
        },
        {
          "id": "16-3-q2",
          "text": "How do you measure success in International Pricing Matrix?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about International Pricing Matrix for ST6Co/ScaleOps6Product"
        },
        {
          "id": "16-3-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about International Pricing Matrix for ST6Co/ScaleOps6Product"
        },
        {
          "id": "16-3-q4",
          "text": "What specific evidence demonstrates your International Pricing Matrix effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "16-3-q5",
          "text": "What are your next steps to improve International Pricing Matrix?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Global Payroll (Deel, Remote)",
        "Entity Management (Vistra, TMF Group)",
        "Compliance Tools (Vanta, Drata)",
        "ERP Systems (NetSuite, SAP)"
      ],
      "templates": [
        "Country Launch Checklist",
        "Global Vendor Matrix",
        "Compliance Calendar",
        "Operations Playbook"
      ],
      "bestPractices": [
        "Use PEO/EOR for initial expansion",
        "Standardize processes globally",
        "Centralize vendor management",
        "Document everything for compliance"
      ]
    },
    "analysis": {
      "domain": "International Pricing Matrix",
      "dimensions": [
        {
          "name": "Pricing Research",
          "weight": 20,
          "description": "Market pricing analysis"
        },
        {
          "name": "Currency Strategy",
          "weight": 20,
          "description": "Multi-currency approach"
        },
        {
          "name": "Local Competition",
          "weight": 20,
          "description": "Competitive pricing"
        },
        {
          "name": "Value Perception",
          "weight": 20,
          "description": "Local value alignment"
        },
        {
          "name": "Margin Management",
          "weight": 20,
          "description": "Profitability maintenance"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No pricing strategy",
        "26-50": "Basic pricing exists",
        "51-75": "Good pricing approach",
        "76-90": "Strong pricing strategy",
        "91-100": "Pricing excellence"
      }
    },
    "resources": {
      "domain": "International Pricing Matrix",
      "templates": [
        "Global Pricing Model",
        "Currency Strategy",
        "Regional Pricing Analysis"
      ],
      "metrics": [
        "Setup time per country",
        "Operational cost per market",
        "Compliance score",
        "Support response time by region"
      ]
    },
    "outputs": {
      "domain": "International Pricing Matrix",
      "templates": [
        "Global Pricing Model",
        "Currency Strategy",
        "Regional Pricing Analysis"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "16-2"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.943Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "16-4": {
    "id": "16-4",
    "name": "Regional Compliance Tracker",
    "blockId": 16,
    "blockName": "Global Expansion Opportunities",
    "subId": 4,
    "phase": 5,
    "phaseName": "Scale",
    "category": "global",
    "agent": {
      "name": "Compliance Tracker",
      "key": "16d",
      "description": "Manages international compliance requirements",
      "domain": "Regional Compliance Tracker"
    },
    "education": {
      "title": "Regional Compliance Tracker",
      "what": "A systematic framework for monitoring and measuring regional compliance tracker through data collection, analysis, and actionable insights. Tracks key metrics including regulatory mapping, documentation, audit readiness, risk management, update management to enable proactive decision-making and continuous improvement.",
      "why": "Non-compliance can result in fines up to 4% of global revenue. A compliance map prevents costly mistakes and builds trust.",
      "how": "\n      <h4>Compliance Categories:</h4>\n      <ul>\n        <li><strong>Data Privacy:</strong> GDPR, CCPA, local laws</li>\n        <li><strong>Industry:</strong> Sector-specific regulations</li>\n        <li><strong>Financial:</strong> Tax, reporting, transfer pricing</li>\n        <li><strong>Employment:</strong> Labor laws and benefits</li>\n        <li><strong>Product:</strong> Safety and certification requirements</li>\n      </ul>\n      \n      <h4>Mapping Process:</h4>\n      <ol>\n        <li>Identify target markets</li>\n        <li>Research regulatory landscape</li>\n        <li>Assess compliance gaps</li>\n        <li>Prioritize requirements</li>\n        <li>Implement controls</li>\n        <li>Monitor changes</li>\n      </ol>\n    ",
      "examples": [
        "GDPR: Data processing agreements, consent flows",
        "SOC 2: Security controls for enterprise sales",
        "HIPAA: Healthcare data handling for US market"
      ],
      "keyMetrics": [
        {
          "value": "2.5x",
          "label": "Market Expansion",
          "description": "Geographic growth"
        },
        {
          "value": "50%",
          "label": "Faster Entry",
          "description": "Time to new markets"
        },
        {
          "value": "40%",
          "label": "Lower Risk",
          "description": "Systematic expansion"
        },
        {
          "value": "3x",
          "label": "Global Revenue",
          "description": "International contribution"
        }
      ]
    },
    "workspace": {
      "domain": "Regional Compliance Tracker",
      "questions": [
        {
          "id": "16-4-q1",
          "text": "What is your current strategy for Regional Compliance Tracker?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Regional Compliance Tracker for ST6Co/ScaleOps6Product"
        },
        {
          "id": "16-4-q2",
          "text": "How do you measure success in Regional Compliance Tracker?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Regional Compliance Tracker for ST6Co/ScaleOps6Product"
        },
        {
          "id": "16-4-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Regional Compliance Tracker for ST6Co/ScaleOps6Product"
        },
        {
          "id": "16-4-q4",
          "text": "What specific evidence demonstrates your Regional Compliance Tracker effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "16-4-q5",
          "text": "What are your next steps to improve Regional Compliance Tracker?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Compliance Platforms (OneTrust, TrustArc)",
        "Legal Research (LexisNexis, Westlaw)",
        "Risk Management (ServiceNow, MetricStream)",
        "Audit Tools (AuditBoard, Workiva)"
      ],
      "templates": [
        "Compliance Requirements Matrix",
        "Risk Assessment Framework",
        "Audit Preparation Checklist",
        "Privacy Policy Template"
      ],
      "bestPractices": [
        "Map regulations before market entry",
        "Build compliance into product design",
        "Conduct regular compliance audits",
        "Stay updated on regulatory changes"
      ]
    },
    "analysis": {
      "domain": "Regional Compliance Tracker",
      "dimensions": [
        {
          "name": "Regulatory Mapping",
          "weight": 20,
          "description": "Compliance requirements"
        },
        {
          "name": "Documentation",
          "weight": 20,
          "description": "Compliance records"
        },
        {
          "name": "Audit Readiness",
          "weight": 20,
          "description": "Audit preparation"
        },
        {
          "name": "Risk Management",
          "weight": 20,
          "description": "Compliance risks"
        },
        {
          "name": "Update Management",
          "weight": 20,
          "description": "Regulatory changes"
        }
      ],
      "evaluationCriteria": {
        "0-25": "Compliance gaps",
        "26-50": "Basic compliance",
        "51-75": "Good compliance",
        "76-90": "Strong compliance",
        "91-100": "Compliance excellence"
      }
    },
    "resources": {
      "domain": "Regional Compliance Tracker",
      "templates": [
        "Compliance Requirements Matrix",
        "Risk Assessment Framework",
        "Audit Preparation Checklist"
      ],
      "metrics": [
        "Compliance coverage %",
        "Audit findings count",
        "Time to compliance",
        "Compliance cost per market"
      ]
    },
    "outputs": {
      "domain": "Regional Compliance Tracker",
      "templates": [
        "Compliance Requirements Matrix",
        "Risk Assessment Framework",
        "Audit Preparation Checklist"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "16-3"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.943Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "16-5": {
    "id": "16-5",
    "name": "Geo-Specific GTM Playbooks",
    "blockId": 16,
    "blockName": "Global Expansion Opportunities",
    "subId": 5,
    "phase": 5,
    "phaseName": "Scale",
    "category": "global",
    "agent": {
      "name": "Geo-GTM Specialist",
      "key": "16e",
      "description": "Develops geography-specific GTM strategies",
      "domain": "Geo-Specific GTM Playbooks"
    },
    "education": {
      "title": "Geo-Specific GTM Playbooks",
      "what": "A systematic approach to geo-specific gtm playbooks that develops geography-specific gtm strategies. Evaluates local gtm strategy, channel strategy, partnership development, marketing adaptation, sales localization to ensure excellence and continuous improvement in this critical capability.",
      "why": "Partners can provide 40% of revenue in new markets. The right ecosystem strategy multiplies growth without multiplying costs.",
      "how": "\n      <h4>Partnership Types:</h4>\n      <ul>\n        <li><strong>Channel:</strong> Resellers and distributors</li>\n        <li><strong>Technology:</strong> Integrations and platforms</li>\n        <li><strong>Strategic:</strong> Joint ventures and alliances</li>\n        <li><strong>Service:</strong> Implementation and consulting</li>\n        <li><strong>Marketing:</strong> Co-marketing and referrals</li>\n      </ul>\n      \n      <h4>Strategy Development:</h4>\n      <ol>\n        <li>Define partnership objectives</li>\n        <li>Map ecosystem opportunities</li>\n        <li>Create partner profiles</li>\n        <li>Design partner programs</li>\n        <li>Recruit and onboard</li>\n        <li>Enable and manage</li>\n      </ol>\n    ",
      "examples": [
        "Channel: 20% revenue share for qualified partners",
        "Technology: API partnership with market leader",
        "Strategic: JV for Japan market entry"
      ],
      "keyMetrics": [
        {
          "value": "2.5x",
          "label": "Market Expansion",
          "description": "Geographic growth"
        },
        {
          "value": "50%",
          "label": "Faster Entry",
          "description": "Time to new markets"
        },
        {
          "value": "40%",
          "label": "Lower Risk",
          "description": "Systematic expansion"
        },
        {
          "value": "3x",
          "label": "Global Revenue",
          "description": "International contribution"
        }
      ]
    },
    "workspace": {
      "domain": "Geo-Specific GTM Playbooks",
      "questions": [
        {
          "id": "16-5-q1",
          "text": "What is your current strategy for Geo-Specific GTM Playbooks?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Geo-Specific GTM Playbooks for ST6Co/ScaleOps6Product"
        },
        {
          "id": "16-5-q2",
          "text": "How do you measure success in Geo-Specific GTM Playbooks?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Geo-Specific GTM Playbooks for ST6Co/ScaleOps6Product"
        },
        {
          "id": "16-5-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Geo-Specific GTM Playbooks for ST6Co/ScaleOps6Product"
        },
        {
          "id": "16-5-q4",
          "text": "What specific evidence demonstrates your Geo-Specific GTM Playbooks effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "16-5-q5",
          "text": "What are your next steps to improve Geo-Specific GTM Playbooks?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [
        "Partner Management (Crossbeam, Allbound)",
        "Channel Enablement (Showpad, Seismic)",
        "Partner Portals (Channeltivity, Zift)",
        "Co-selling Tools (Tackle, WorkSpan)"
      ],
      "templates": [
        "Partner Program Guide",
        "Partnership Agreement Template",
        "Partner Enablement Kit",
        "Joint Business Plan"
      ],
      "bestPractices": [
        "Start with technology partnerships",
        "Create clear partner tiers and benefits",
        "Invest in partner enablement",
        "Track partner-sourced revenue carefully"
      ]
    },
    "analysis": {
      "domain": "Geo-Specific GTM Playbooks",
      "dimensions": [
        {
          "name": "Local GTM Strategy",
          "weight": 20,
          "description": "Regional approach"
        },
        {
          "name": "Channel Strategy",
          "weight": 20,
          "description": "Local channels"
        },
        {
          "name": "Partnership Development",
          "weight": 20,
          "description": "Local partnerships"
        },
        {
          "name": "Marketing Adaptation",
          "weight": 20,
          "description": "Local marketing"
        },
        {
          "name": "Sales Localization",
          "weight": 20,
          "description": "Local sales approach"
        }
      ],
      "evaluationCriteria": {
        "0-25": "No local GTM",
        "26-50": "Basic local presence",
        "51-75": "Good local GTM",
        "76-90": "Strong regional strategy",
        "91-100": "Local market mastery"
      }
    },
    "resources": {
      "domain": "Geo-Specific GTM Playbooks",
      "templates": [
        "Regional GTM Playbook",
        "Market-Specific Strategy",
        "Local Partnership Guide"
      ],
      "metrics": [
        "Partner-sourced revenue %",
        "Partner satisfaction score",
        "Time to partner productivity",
        "Partner retention rate"
      ]
    },
    "outputs": {
      "domain": "Geo-Specific GTM Playbooks",
      "templates": [
        "Regional GTM Playbook",
        "Market-Specific Strategy",
        "Local Partnership Guide"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "16-4"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.943Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  },
  "16-6": {
    "id": "16-6",
    "name": "Expansion Risk Assessment",
    "blockId": 16,
    "blockName": "Global Expansion Opportunities",
    "subId": 6,
    "phase": 5,
    "phaseName": "Scale",
    "category": "global",
    "agent": {
      "name": "Expansion Risk Assessor",
      "key": "16f",
      "description": "Assesses and mitigates expansion risks",
      "domain": "Expansion Risk Assessment"
    },
    "education": {
      "title": "Expansion Risk Assessment",
      "what": "A comprehensive expansion risk assessment methodology that evaluates risk identification, impact analysis, mitigation planning, contingency plans, risk monitoring to identify opportunities, risks, and optimization potential. Provides data-driven insights for strategic decision-making.",
      "why": "Cultural misalignment causes 60% of international expansion failures. Adaptation builds trust and accelerates market acceptance.",
      "how": "\n      <h4>Adaptation Areas:</h4>\n      <ul>\n        <li><strong>Communication:</strong> Style, directness, formality</li>\n        <li><strong>Business Practices:</strong> Decision-making, relationships</li>\n        <li><strong>Customer Expectations:</strong> Service levels, features</li>\n        <li><strong>Team Management:</strong> Leadership and motivation</li>\n        <li><strong>Marketing:</strong> Messaging and channels</li>\n      </ul>\n      \n      <h4>Framework Implementation:</h4>\n      <ol>\n        <li>Research cultural dimensions</li>\n        <li>Assess current approach</li>\n        <li>Identify adaptation needs</li>\n        <li>Train teams on differences</li>\n        <li>Adapt practices and materials</li>\n        <li>Monitor and adjust</li>\n      </ol>\n    ",
      "examples": [
        "Japan: Formal communication, consensus decisions",
        "Germany: Direct feedback, detailed documentation",
        "Brazil: Relationship-first, flexible timing"
      ],
      "keyMetrics": [
        {
          "value": "2.5x",
          "label": "Market Expansion",
          "description": "Geographic growth"
        },
        {
          "value": "50%",
          "label": "Faster Entry",
          "description": "Time to new markets"
        },
        {
          "value": "40%",
          "label": "Lower Risk",
          "description": "Systematic expansion"
        },
        {
          "value": "3x",
          "label": "Global Revenue",
          "description": "International contribution"
        }
      ]
    },
    "workspace": {
      "domain": "Expansion Risk Assessment",
      "questions": [
        {
          "id": "16-6-q1",
          "text": "What is your current strategy for Expansion Risk Assessment?",
          "type": "strategic",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Expansion Risk Assessment for ST6Co/ScaleOps6Product"
        },
        {
          "id": "16-6-q2",
          "text": "How do you measure success in Expansion Risk Assessment?",
          "type": "quantitative",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Expansion Risk Assessment for ST6Co/ScaleOps6Product"
        },
        {
          "id": "16-6-q3",
          "text": "What are your key milestones and timelines?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Provide specific details about Expansion Risk Assessment for ST6Co/ScaleOps6Product"
        },
        {
          "id": "16-6-q4",
          "text": "What specific evidence demonstrates your Expansion Risk Assessment effectiveness?",
          "type": "validation",
          "required": true,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "Include metrics, examples, or case studies"
        },
        {
          "id": "16-6-q5",
          "text": "What are your next steps to improve Expansion Risk Assessment?",
          "type": "strategic",
          "required": false,
          "minLength": 100,
          "maxLength": 1000,
          "hint": "List 3-5 actionable improvements"
        }
      ],
      "tools": [],
      "templates": [
        "Cultural Assessment Tool",
        "Adaptation Checklist",
        "Cross-Cultural Training Guide"
      ],
      "bestPractices": []
    },
    "analysis": {
      "domain": "Expansion Risk Assessment",
      "dimensions": [
        {
          "name": "Risk Identification",
          "weight": 20,
          "description": "Complete risk mapping"
        },
        {
          "name": "Impact Analysis",
          "weight": 20,
          "description": "Risk impact assessment"
        },
        {
          "name": "Mitigation Planning",
          "weight": 20,
          "description": "Risk mitigation strategies"
        },
        {
          "name": "Contingency Plans",
          "weight": 20,
          "description": "Backup strategies"
        },
        {
          "name": "Risk Monitoring",
          "weight": 20,
          "description": "Ongoing risk tracking"
        }
      ],
      "evaluationCriteria": {
        "0-25": "High unmanaged risk",
        "26-50": "Basic risk awareness",
        "51-75": "Good risk management",
        "76-90": "Strong risk control",
        "91-100": "Risk mastery"
      }
    },
    "resources": {
      "domain": "Expansion Risk Assessment",
      "templates": [
        "Risk Assessment Matrix",
        "Market Entry Risk Analysis",
        "Mitigation Strategy Framework"
      ],
      "metrics": [
        "Local team satisfaction",
        "Customer satisfaction by market",
        "Cultural incident frequency",
        "Market acceptance rate"
      ]
    },
    "outputs": {
      "domain": "Expansion Risk Assessment",
      "templates": [
        "Risk Assessment Matrix",
        "Market Entry Risk Analysis",
        "Mitigation Strategy Framework"
      ]
    },
    "validation": {
      "requireDomainMatch": true,
      "requireAgentAlignment": true,
      "requireDimensionMatch": true,
      "requireTemplateMatch": true,
      "requireQuestionMatch": true,
      "strictMode": true
    },
    "meta": {
      "dependencies": [
        "16-5"
      ],
      "createdAt": "2025-10-06",
      "lastValidated": "2025-10-06T20:49:42.943Z",
      "version": "2.0.0",
      "dataSource": "complete-ssot-registry",
      "completeness": {
        "hasAgent": true,
        "hasEducation": true,
        "hasQuestions": true,
        "isComplete": true
      }
    }
  }
};

/**
 * Get complete subcomponent data
 */
function getSubcomponent(id) {
    const subcomponent = COMPLETE_SSOT_REGISTRY[id];
    if (!subcomponent) {
        throw new Error(`Subcomponent not found: ${id}`);
    }
    return subcomponent;
}

/**
 * Get all subcomponents for a block
 */
function getSubcomponentsForBlock(blockId) {
    return Object.values(COMPLETE_SSOT_REGISTRY)
        .filter(sub => sub.blockId === blockId)
        .sort((a, b) => a.subId - b.subId);
}

/**
 * Get all subcomponents for a phase
 */
function getSubcomponentsForPhase(phase) {
    return Object.values(COMPLETE_SSOT_REGISTRY)
        .filter(sub => sub.phase === phase)
        .sort((a, b) => {
            if (a.blockId !== b.blockId) return a.blockId - b.blockId;
            return a.subId - b.subId;
        });
}

/**
 * Validate domain consistency
 */
function validateDomainConsistency(subcomponentId) {
    const sub = getSubcomponent(subcomponentId);
    
    const domains = [
        sub.agent.domain,
        sub.education.title,
        sub.workspace.domain,
        sub.analysis.domain,
        sub.resources.domain,
        sub.outputs.domain
    ];
    
    const uniqueDomains = [...new Set(domains)];
    
    if (uniqueDomains.length > 1) {
        return {
            valid: false,
            error: `Domain mismatch: ${uniqueDomains.join(', ')}`
        };
    }
    
    if (uniqueDomains[0] !== sub.name) {
        return {
            valid: false,
            error: `Domains don't match subcomponent name: ${uniqueDomains[0]} !== ${sub.name}`
        };
    }
    
    return { valid: true };
}

/**
 * Get registry statistics
 */
function getRegistryStats() {
    const registry = Object.values(COMPLETE_SSOT_REGISTRY);
    
    return {
        total: registry.length,
        complete: registry.filter(s => s.meta.completeness.isComplete).length,
        byPhase: {
            1: registry.filter(s => s.phase === 1).length,
            2: registry.filter(s => s.phase === 2).length,
            3: registry.filter(s => s.phase === 3).length,
            4: registry.filter(s => s.phase === 4).length,
            5: registry.filter(s => s.phase === 5).length
        },
        sections: {
            withAgent: registry.filter(s => s.meta.completeness.hasAgent).length,
            withEducation: registry.filter(s => s.meta.completeness.hasEducation).length,
            withQuestions: registry.filter(s => s.meta.completeness.hasQuestions).length
        }
    };
}

// Export registry and utilities
module.exports = {
    COMPLETE_SSOT_REGISTRY,
    getSubcomponent,
    getSubcomponentsForBlock,
    getSubcomponentsForPhase,
    validateDomainConsistency,
    getRegistryStats
};

// Make available in browser
if (typeof window !== 'undefined') {
    window.COMPLETE_SSOT_REGISTRY = COMPLETE_SSOT_REGISTRY;
    window.getSubcomponent = getSubcomponent;
    window.validateDomainConsistency = validateDomainConsistency;
}


// Agent Configuration System
const agents = {
  "1a": {
    "name": "Problem Definition Evaluator",
    "expertise": "Problem statement clarity and validation",
    "analysisPrompt": "Evaluate the clarity, specificity, and market relevance of the problem statement",
    "dimensions": [
      {
        "name": "Problem Clarity",
        "weight": 25,
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
        "weight": 15,
        "description": "Uniqueness of approach to solving"
      }
    ],
    "questions": [
      "Who specifically is affected by this problem?",
      "What is the core problem you are solving?",
      "When does this problem occur?",
      "What is the negative impact if unsolved?",
      "How are you currently addressing this?",
      "What evidence validates this problem exists?"
    ]
  },
  "1b": {
    "name": "Mission Clarity Assessor",
    "expertise": "Mission statement evaluation and alignment",
    "analysisPrompt": "Assess the clarity, inspiration, and actionability of the mission statement",
    "dimensions": [
      {
        "name": "Clarity",
        "weight": 25,
        "description": "How clear and understandable is the mission?"
      },
      {
        "name": "Inspiration",
        "weight": 20,
        "description": "Does it inspire and motivate?"
      },
      {
        "name": "Alignment",
        "weight": 20,
        "description": "Alignment with company values"
      },
      {
        "name": "Actionability",
        "weight": 20,
        "description": "Can it guide daily decisions?"
      },
      {
        "name": "Differentiation",
        "weight": 15,
        "description": "Uniqueness from competitors"
      }
    ],
    "questions": [
      "What is your current mission statement?",
      "How does it guide daily decisions?",
      "How well do employees understand it?",
      "How does it differentiate you?",
      "How often is it referenced?",
      "What impact does it have on culture?"
    ]
  },
  "1c": {
    "name": "Customer Voice Analyzer",
    "expertise": "Customer feedback analysis and insights",
    "analysisPrompt": "Analyze the quality and actionability of customer voice data",
    "dimensions": [
      {
        "name": "Data Quality",
        "weight": 25,
        "description": "Quality of customer feedback data"
      },
      {
        "name": "Coverage",
        "weight": 20,
        "description": "Breadth of customer segments covered"
      },
      {
        "name": "Frequency",
        "weight": 20,
        "description": "Regular collection of feedback"
      },
      {
        "name": "Actionability",
        "weight": 20,
        "description": "Ability to act on insights"
      },
      {
        "name": "Integration",
        "weight": 15,
        "description": "Integration with product decisions"
      }
    ],
    "questions": [
      "How do you collect customer feedback?",
      "What channels do you use?",
      "How often do you gather feedback?",
      "How do you analyze and synthesize it?",
      "How does it influence decisions?",
      "What tools do you use?"
    ]
  },
  "1d": {
    "name": "Team Readiness Evaluator",
    "expertise": "Team capability and readiness assessment",
    "analysisPrompt": "Evaluate team skills, capacity, and readiness for execution",
    "dimensions": [
      {
        "name": "Skills Coverage",
        "weight": 25,
        "description": "Coverage of required skills"
      },
      {
        "name": "Experience Level",
        "weight": 20,
        "description": "Relevant experience in team"
      },
      {
        "name": "Capacity",
        "weight": 20,
        "description": "Available bandwidth"
      },
      {
        "name": "Alignment",
        "weight": 20,
        "description": "Team alignment on goals"
      },
      {
        "name": "Growth Potential",
        "weight": 15,
        "description": "Ability to scale and grow"
      }
    ],
    "questions": [
      "What key skills does your team have?",
      "What skill gaps exist?",
      "What is the team experience level?",
      "How aligned is the team on goals?",
      "What is current team capacity?",
      "What are growth plans?"
    ]
  },
  "1e": {
    "name": "Market Landscape Mapper",
    "expertise": "Market analysis and competitive positioning",
    "analysisPrompt": "Map the competitive landscape and market opportunities",
    "dimensions": [
      {
        "name": "Market Understanding",
        "weight": 25,
        "description": "Depth of market knowledge"
      },
      {
        "name": "Competitive Analysis",
        "weight": 20,
        "description": "Understanding of competition"
      },
      {
        "name": "Opportunity Size",
        "weight": 20,
        "description": "Size of market opportunity"
      },
      {
        "name": "Positioning",
        "weight": 20,
        "description": "Clarity of positioning"
      },
      {
        "name": "Trends Awareness",
        "weight": 15,
        "description": "Awareness of market trends"
      }
    ],
    "questions": [
      "Who are your main competitors?",
      "What is your market size?",
      "What are key market trends?",
      "How do you differentiate?",
      "What is your positioning?",
      "What are growth drivers?"
    ]
  },
  "1f": {
    "name": "Launch Readiness Auditor",
    "expertise": "Go-to-market readiness assessment",
    "analysisPrompt": "Audit readiness for product launch and go-to-market execution",
    "dimensions": [
      {
        "name": "Product Readiness",
        "weight": 25,
        "description": "Product completeness"
      },
      {
        "name": "GTM Strategy",
        "weight": 20,
        "description": "Go-to-market plan quality"
      },
      {
        "name": "Sales Readiness",
        "weight": 20,
        "description": "Sales team preparation"
      },
      {
        "name": "Marketing Readiness",
        "weight": 20,
        "description": "Marketing preparation"
      },
      {
        "name": "Operations Readiness",
        "weight": 15,
        "description": "Operational preparation"
      }
    ],
    "questions": [
      "What is your launch timeline?",
      "Is the product feature-complete?",
      "What is your GTM strategy?",
      "Is the sales team ready?",
      "Are marketing materials ready?",
      "Are operations prepared?"
    ]
  },
  "2a": {
    "name": "Interview Cadence Analyzer",
    "expertise": "Customer interview planning and execution",
    "analysisPrompt": "Analyze the effectiveness of customer interview cadence and quality",
    "dimensions": [
      {
        "name": "Interview Frequency",
        "weight": 25,
        "description": "Regular cadence of interviews"
      },
      {
        "name": "Interview Quality",
        "weight": 20,
        "description": "Depth and structure"
      },
      {
        "name": "Segment Coverage",
        "weight": 20,
        "description": "Diversity of interviewees"
      },
      {
        "name": "Documentation",
        "weight": 20,
        "description": "Quality of documentation"
      },
      {
        "name": "Action Items",
        "weight": 15,
        "description": "Clear next steps"
      }
    ],
    "questions": [
      "How often do you interview customers?",
      "What is your interview process?",
      "Which segments do you cover?",
      "How do you document insights?",
      "How do insights drive action?",
      "Who conducts interviews?"
    ]
  },
  "2b": {
    "name": "Persona Development Specialist",
    "expertise": "Customer persona creation and validation",
    "analysisPrompt": "Evaluate the quality and usefulness of customer personas",
    "dimensions": [
      {
        "name": "Persona Detail",
        "weight": 25,
        "description": "Depth of persona profiles"
      },
      {
        "name": "Research Basis",
        "weight": 20,
        "description": "Data-driven development"
      },
      {
        "name": "Actionability",
        "weight": 20,
        "description": "Usefulness for decisions"
      },
      {
        "name": "Coverage",
        "weight": 20,
        "description": "Key segments covered"
      },
      {
        "name": "Validation",
        "weight": 15,
        "description": "Validated with real data"
      }
    ],
    "questions": [
      "How many personas do you have?",
      "How were they developed?",
      "What data supports them?",
      "How are they used?",
      "How often are they updated?",
      "How validated are they?"
    ]
  },
  "2c": {
    "name": "Pain Point Analyst",
    "expertise": "Customer pain point identification and prioritization",
    "analysisPrompt": "Analyze the depth of understanding of customer pain points",
    "dimensions": [
      {
        "name": "Pain Identification",
        "weight": 25,
        "description": "Clarity of pain points"
      },
      {
        "name": "Severity Assessment",
        "weight": 20,
        "description": "Understanding of impact"
      },
      {
        "name": "Frequency Analysis",
        "weight": 20,
        "description": "How often pains occur"
      },
      {
        "name": "Solution Mapping",
        "weight": 20,
        "description": "Pain to solution alignment"
      },
      {
        "name": "Prioritization",
        "weight": 15,
        "description": "Clear prioritization"
      }
    ],
    "questions": [
      "What are top customer pain points?",
      "How severe are they?",
      "How frequently do they occur?",
      "How do you prioritize them?",
      "How do you address them?",
      "How do you validate them?"
    ]
  },
  "2d": {
    "name": "JTBD Framework Expert",
    "expertise": "Jobs-to-be-done analysis and application",
    "analysisPrompt": "Evaluate understanding and application of JTBD framework",
    "dimensions": [
      {
        "name": "Job Definition",
        "weight": 25,
        "description": "Clarity of jobs defined"
      },
      {
        "name": "Outcome Focus",
        "weight": 20,
        "description": "Focus on outcomes vs features"
      },
      {
        "name": "Context Understanding",
        "weight": 20,
        "description": "Situational awareness"
      },
      {
        "name": "Solution Alignment",
        "weight": 20,
        "description": "Product-job fit"
      },
      {
        "name": "Validation",
        "weight": 15,
        "description": "Evidence-based validation"
      }
    ],
    "questions": [
      "What jobs do customers hire you for?",
      "What outcomes do they seek?",
      "In what contexts do jobs arise?",
      "How well do you address them?",
      "How do you validate jobs?",
      "How do jobs guide product?"
    ]
  },
  "2e": {
    "name": "Demand Signal Tracker",
    "expertise": "Market demand signal identification and tracking",
    "analysisPrompt": "Assess ability to identify and track demand signals",
    "dimensions": [
      {
        "name": "Signal Identification",
        "weight": 25,
        "description": "Ability to spot signals"
      },
      {
        "name": "Tracking Systems",
        "weight": 20,
        "description": "Systems for tracking"
      },
      {
        "name": "Response Speed",
        "weight": 20,
        "description": "Speed of response"
      },
      {
        "name": "Signal Quality",
        "weight": 20,
        "description": "Quality of signals tracked"
      },
      {
        "name": "Predictive Value",
        "weight": 15,
        "description": "Predictive accuracy"
      }
    ],
    "questions": [
      "What demand signals do you track?",
      "How do you identify them?",
      "What tracking systems do you use?",
      "How quickly do you respond?",
      "How predictive are they?",
      "How do they guide decisions?"
    ]
  },
  "2f": {
    "name": "Insight Synthesis Manager",
    "expertise": "Customer insight synthesis and communication",
    "analysisPrompt": "Evaluate the synthesis and communication of customer insights",
    "dimensions": [
      {
        "name": "Synthesis Quality",
        "weight": 25,
        "description": "Quality of synthesis"
      },
      {
        "name": "Communication",
        "weight": 20,
        "description": "Clarity of communication"
      },
      {
        "name": "Actionability",
        "weight": 20,
        "description": "Actionable insights"
      },
      {
        "name": "Distribution",
        "weight": 20,
        "description": "Insight distribution"
      },
      {
        "name": "Impact Tracking",
        "weight": 15,
        "description": "Tracking insight impact"
      }
    ],
    "questions": [
      "How do you synthesize insights?",
      "How are insights communicated?",
      "Who receives insights?",
      "How actionable are they?",
      "How do you track impact?",
      "What tools do you use?"
    ]
  },
  "3a": {
    "name": "Use Case Scorer",
    "expertise": "Use case evaluation and prioritization",
    "analysisPrompt": "Score and prioritize use cases based on value and feasibility",
    "dimensions": [
      {
        "name": "Value Assessment",
        "weight": 25,
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
        "description": "Customer demand level"
      },
      {
        "name": "Competitive Advantage",
        "weight": 20,
        "description": "Differentiation potential"
      },
      {
        "name": "Strategic Fit",
        "weight": 15,
        "description": "Alignment with strategy"
      }
    ],
    "questions": [
      "What are your key use cases?",
      "How do you score them?",
      "What is the value of each?",
      "How feasible are they?",
      "What is market demand?",
      "How do they differentiate you?"
    ]
  },
  "3b": {
    "name": "Segment Prioritization Expert",
    "expertise": "Market segment analysis and prioritization",
    "analysisPrompt": "Evaluate segment prioritization strategy and execution",
    "dimensions": [
      {
        "name": "Segment Definition",
        "weight": 25,
        "description": "Clarity of segments"
      },
      {
        "name": "Size Assessment",
        "weight": 20,
        "description": "Market size evaluation"
      },
      {
        "name": "Fit Analysis",
        "weight": 20,
        "description": "Product-segment fit"
      },
      {
        "name": "Growth Potential",
        "weight": 20,
        "description": "Segment growth potential"
      },
      {
        "name": "Competition",
        "weight": 15,
        "description": "Competitive landscape"
      }
    ],
    "questions": [
      "What are your key segments?",
      "How do you prioritize them?",
      "What is the size of each?",
      "What is your fit with each?",
      "What is growth potential?",
      "What is competition like?"
    ]
  },
  "3c": {
    "name": "Strategic Prioritizer",
    "expertise": "Strategic prioritization frameworks and decision-making",
    "analysisPrompt": "Assess strategic prioritization processes and frameworks",
    "dimensions": [
      {
        "name": "Framework Quality",
        "weight": 25,
        "description": "Quality of framework"
      },
      {
        "name": "Consistency",
        "weight": 20,
        "description": "Consistent application"
      },
      {
        "name": "Stakeholder Buy-in",
        "weight": 20,
        "description": "Stakeholder alignment"
      },
      {
        "name": "Flexibility",
        "weight": 20,
        "description": "Ability to adapt"
      },
      {
        "name": "Results Tracking",
        "weight": 15,
        "description": "Tracking outcomes"
      }
    ],
    "questions": [
      "What prioritization framework do you use?",
      "How consistently is it applied?",
      "Who is involved in decisions?",
      "How do you handle conflicts?",
      "How do you track results?",
      "How often do you review?"
    ]
  },
  "3d": {
    "name": "Tradeoff Analysis Expert",
    "expertise": "Strategic tradeoff analysis and decision-making",
    "analysisPrompt": "Evaluate ability to analyze and make strategic tradeoffs",
    "dimensions": [
      {
        "name": "Tradeoff Recognition",
        "weight": 25,
        "description": "Identifying tradeoffs"
      },
      {
        "name": "Impact Analysis",
        "weight": 20,
        "description": "Understanding impacts"
      },
      {
        "name": "Decision Process",
        "weight": 20,
        "description": "Decision-making process"
      },
      {
        "name": "Communication",
        "weight": 20,
        "description": "Communicating decisions"
      },
      {
        "name": "Learning",
        "weight": 15,
        "description": "Learning from decisions"
      }
    ],
    "questions": [
      "What key tradeoffs do you face?",
      "How do you analyze them?",
      "What is your decision process?",
      "How do you communicate decisions?",
      "How do you track outcomes?",
      "What have you learned?"
    ]
  },
  "3e": {
    "name": "Hypothesis Validator",
    "expertise": "Hypothesis testing and validation",
    "analysisPrompt": "Assess hypothesis testing and validation processes",
    "dimensions": [
      {
        "name": "Hypothesis Quality",
        "weight": 25,
        "description": "Quality of hypotheses"
      },
      {
        "name": "Testing Rigor",
        "weight": 20,
        "description": "Rigor of testing"
      },
      {
        "name": "Speed",
        "weight": 20,
        "description": "Speed of validation"
      },
      {
        "name": "Learning Capture",
        "weight": 20,
        "description": "Capturing learnings"
      },
      {
        "name": "Iteration",
        "weight": 15,
        "description": "Iteration based on results"
      }
    ],
    "questions": [
      "What hypotheses are you testing?",
      "How do you test them?",
      "How quickly can you validate?",
      "How do you capture learnings?",
      "How do results guide iteration?",
      "What tools do you use?"
    ]
  },
  "3f": {
    "name": "Decision Documentation Manager",
    "expertise": "Decision documentation and knowledge management",
    "analysisPrompt": "Evaluate decision documentation and knowledge management practices",
    "dimensions": [
      {
        "name": "Documentation Quality",
        "weight": 25,
        "description": "Quality of documentation"
      },
      {
        "name": "Accessibility",
        "weight": 20,
        "description": "Easy access to decisions"
      },
      {
        "name": "Context Capture",
        "weight": 20,
        "description": "Context and rationale"
      },
      {
        "name": "Review Process",
        "weight": 20,
        "description": "Regular review process"
      },
      {
        "name": "Learning Integration",
        "weight": 15,
        "description": "Learning from past"
      }
    ],
    "questions": [
      "How do you document decisions?",
      "What context do you capture?",
      "How accessible are decisions?",
      "How often do you review?",
      "How do you learn from past?",
      "What tools do you use?"
    ]
  }
};

module.exports = {
    agents,
    generateAgentAnalysis,
    calculateDimensionScore,
    generateDimensionFeedback,
    generateStrengths,
    generateImprovements,
    generateRecommendations
};

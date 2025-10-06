// Missing Templates for 34 Subcomponents
// To be added to educational-content.js

const missingTemplates = {
  // Block 3: Strategic Prioritization - Missing 3-3, 3-4, 3-5, 3-6
  "3-3": {
    templates: [
      "Resource Allocation Matrix",
      "Priority Scoring Framework", 
      "Strategic Initiative Tracker"
    ]
  },
  
  "3-4": {
    templates: [
      "Competitive Positioning Canvas",
      "Differentiation Strategy Map",
      "Competitive Response Playbook"
    ]
  },
  
  "3-5": {
    templates: [
      "Risk Assessment Matrix",
      "Mitigation Strategy Framework",
      "Risk Monitoring Dashboard"
    ]
  },
  
  "3-6": {
    templates: [
      "Opportunity Evaluation Scorecard",
      "Market Timing Analysis",
      "Go/No-Go Decision Framework"
    ]
  },

  // Block 5: Go-to-Market Strategy - Missing 5-3, 5-4, 5-5, 5-6
  "5-3": {
    templates: [
      "Referral Program Framework",
      "Customer Advocacy Playbook",
      "Reference Customer Agreement"
    ]
  },
  
  "5-4": {
    templates: [
      "Testimonial Collection Guide",
      "Social Proof Library",
      "Success Story Template"
    ]
  },
  
  "5-5": {
    templates: [
      "Pilot Program Structure",
      "Beta Testing Agreement",
      "Early Adopter Onboarding Kit"
    ]
  },
  
  "5-6": {
    templates: [
      "Feedback Loop Framework",
      "Product Council Charter",
      "Feature Request Tracker"
    ]
  },

  // Block 6: Customer Engagement Flywheel - Missing 6-3, 6-4, 6-5, 6-6
  "6-3": {
    templates: [
      "Engagement Campaign Planner",
      "Lifecycle Marketing Calendar",
      "Touchpoint Optimization Map"
    ]
  },
  
  "6-4": {
    templates: [
      "Community Building Playbook",
      "User Group Charter Template",
      "Ambassador Program Framework"
    ]
  },
  
  "6-5": {
    templates: [
      "Product Adoption Roadmap",
      "Feature Release Communication Plan",
      "Training Program Structure"
    ]
  },
  
  "6-6": {
    templates: [
      "Customer Journey Optimizer",
      "Experience Measurement Framework",
      "Satisfaction Improvement Plan"
    ]
  },

  // Block 13: Market Domination Strategies - Missing 13-3, 13-4, 13-5, 13-6
  "13-3": {
    templates: [
      "Ecosystem Development Plan",
      "Platform Strategy Canvas",
      "Network Effects Calculator"
    ]
  },
  
  "13-4": {
    templates: [
      "M&A Target Evaluation Matrix",
      "Integration Planning Checklist",
      "Synergy Realization Tracker"
    ]
  },
  
  "13-5": {
    templates: [
      "Market Leadership Scorecard",
      "Thought Leadership Calendar",
      "Industry Influence Map"
    ]
  },
  
  "13-6": {
    templates: [
      "Competitive Intelligence Framework",
      "Market Share Tracker",
      "Strategic Response Playbook"
    ]
  },

  // Block 14: Operational Infrastructure - Missing 14-3, 14-4, 14-5, 14-6
  "14-3": {
    templates: [
      "Process Optimization Canvas",
      "Operational Excellence Scorecard",
      "Efficiency Metrics Dashboard"
    ]
  },
  
  "14-4": {
    templates: [
      "Automation Opportunity Matrix",
      "Digital Transformation Roadmap",
      "Technology Stack Evaluation"
    ]
  },
  
  "14-5": {
    templates: [
      "Data Governance Framework",
      "Analytics Maturity Model",
      "Insight Generation Process"
    ]
  },
  
  "14-6": {
    templates: [
      "Security Assessment Checklist",
      "Compliance Audit Template",
      "Risk Management Framework"
    ]
  }
};

// Function to add templates to educational content
function addMissingTemplates(educationalContent) {
  // Block 3 additions
  if (educationalContent["3-3"]) {
    educationalContent["3-3"].templates = missingTemplates["3-3"].templates;
  }
  if (educationalContent["3-4"]) {
    educationalContent["3-4"].templates = missingTemplates["3-4"].templates;
  }
  if (educationalContent["3-5"]) {
    educationalContent["3-5"].templates = missingTemplates["3-5"].templates;
  }
  if (educationalContent["3-6"]) {
    educationalContent["3-6"].templates = missingTemplates["3-6"].templates;
  }

  // Block 5 additions
  if (educationalContent["5-3"]) {
    educationalContent["5-3"].templates = missingTemplates["5-3"].templates;
  }
  if (educationalContent["5-4"]) {
    educationalContent["5-4"].templates = missingTemplates["5-4"].templates;
  }
  if (educationalContent["5-5"]) {
    educationalContent["5-5"].templates = missingTemplates["5-5"].templates;
  }
  if (educationalContent["5-6"]) {
    educationalContent["5-6"].templates = missingTemplates["5-6"].templates;
  }

  // Block 6 additions
  if (educationalContent["6-3"]) {
    educationalContent["6-3"].templates = missingTemplates["6-3"].templates;
  }
  if (educationalContent["6-4"]) {
    educationalContent["6-4"].templates = missingTemplates["6-4"].templates;
  }
  if (educationalContent["6-5"]) {
    educationalContent["6-5"].templates = missingTemplates["6-5"].templates;
  }
  if (educationalContent["6-6"]) {
    educationalContent["6-6"].templates = missingTemplates["6-6"].templates;
  }

  // Block 13 additions
  if (educationalContent["13-3"]) {
    educationalContent["13-3"].templates = missingTemplates["13-3"].templates;
  }
  if (educationalContent["13-4"]) {
    educationalContent["13-4"].templates = missingTemplates["13-4"].templates;
  }
  if (educationalContent["13-5"]) {
    educationalContent["13-5"].templates = missingTemplates["13-5"].templates;
  }
  if (educationalContent["13-6"]) {
    educationalContent["13-6"].templates = missingTemplates["13-6"].templates;
  }

  // Block 14 additions
  if (educationalContent["14-3"]) {
    educationalContent["14-3"].templates = missingTemplates["14-3"].templates;
  }
  if (educationalContent["14-4"]) {
    educationalContent["14-4"].templates = missingTemplates["14-4"].templates;
  }
  if (educationalContent["14-5"]) {
    educationalContent["14-5"].templates = missingTemplates["14-5"].templates;
  }
  if (educationalContent["14-6"]) {
    educationalContent["14-6"].templates = missingTemplates["14-6"].templates;
  }

  return educationalContent;
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { missingTemplates, addMissingTemplates };
}
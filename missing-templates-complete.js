// Complete Missing Templates for All Remaining Subcomponents
// This file contains templates for all subcomponents that don't have them in educational-content.js

const completeMissingTemplates = {
  // Block 3: Strategic Prioritization - Missing 3-3 through 3-6
  "3-3": {
    title: "Resource Allocation Framework",
    templates: [
      "Resource Allocation Matrix",
      "Priority Scoring Framework", 
      "Strategic Initiative Tracker"
    ]
  },
  
  "3-4": {
    title: "Competitive Positioning",
    templates: [
      "Competitive Positioning Canvas",
      "Differentiation Strategy Map",
      "Competitive Response Playbook"
    ]
  },
  
  "3-5": {
    title: "Risk Assessment",
    templates: [
      "Risk Assessment Matrix",
      "Mitigation Strategy Framework",
      "Risk Monitoring Dashboard"
    ]
  },
  
  "3-6": {
    title: "Opportunity Evaluation",
    templates: [
      "Opportunity Evaluation Scorecard",
      "Market Timing Analysis",
      "Go/No-Go Decision Framework"
    ]
  },

  // Block 5: Go-to-Market Strategy - Missing 5-3 through 5-6
  "5-3": {
    title: "Reference Program",
    templates: [
      "Referral Program Framework",
      "Customer Advocacy Playbook",
      "Reference Customer Agreement"
    ]
  },
  
  "5-4": {
    title: "Social Proof Collection",
    templates: [
      "Testimonial Collection Guide",
      "Social Proof Library",
      "Success Story Template"
    ]
  },
  
  "5-5": {
    title: "Pilot Program Management",
    templates: [
      "Pilot Program Structure",
      "Beta Testing Agreement",
      "Early Adopter Onboarding Kit"
    ]
  },
  
  "5-6": {
    title: "Feedback Integration",
    templates: [
      "Feedback Loop Framework",
      "Product Council Charter",
      "Feature Request Tracker"
    ]
  },

  // Block 6: Customer Engagement Flywheel - Missing 6-3 through 6-6
  "6-3": {
    title: "Engagement Campaigns",
    templates: [
      "Engagement Campaign Planner",
      "Lifecycle Marketing Calendar",
      "Touchpoint Optimization Map"
    ]
  },
  
  "6-4": {
    title: "Community Building",
    templates: [
      "Community Building Playbook",
      "User Group Charter Template",
      "Ambassador Program Framework"
    ]
  },
  
  "6-5": {
    title: "Product Adoption",
    templates: [
      "Product Adoption Roadmap",
      "Feature Release Communication Plan",
      "Training Program Structure"
    ]
  },
  
  "6-6": {
    title: "Customer Experience",
    templates: [
      "Customer Journey Optimizer",
      "Experience Measurement Framework",
      "Satisfaction Improvement Plan"
    ]
  },

  // Block 13: Market Domination Strategies - Missing 13-3 through 13-6
  "13-3": {
    title: "Ecosystem Development",
    templates: [
      "Ecosystem Development Plan",
      "Platform Strategy Canvas",
      "Network Effects Calculator"
    ]
  },
  
  "13-4": {
    title: "M&A Strategy",
    templates: [
      "M&A Target Evaluation Matrix",
      "Integration Planning Checklist",
      "Synergy Realization Tracker"
    ]
  },
  
  "13-5": {
    title: "Market Leadership",
    templates: [
      "Market Leadership Scorecard",
      "Thought Leadership Calendar",
      "Industry Influence Map"
    ]
  },
  
  "13-6": {
    title: "Competitive Intelligence",
    templates: [
      "Competitive Intelligence Framework",
      "Market Share Tracker",
      "Strategic Response Playbook"
    ]
  },

  // Block 14: Operational Infrastructure - Missing 14-3 through 14-6
  "14-3": {
    title: "Process Optimization",
    templates: [
      "Process Optimization Canvas",
      "Operational Excellence Scorecard",
      "Efficiency Metrics Dashboard"
    ]
  },
  
  "14-4": {
    title: "Automation Strategy",
    templates: [
      "Automation Opportunity Matrix",
      "Digital Transformation Roadmap",
      "Technology Stack Evaluation"
    ]
  },
  
  "14-5": {
    title: "Data Management",
    templates: [
      "Data Governance Framework",
      "Analytics Maturity Model",
      "Insight Generation Process"
    ]
  },
  
  "14-6": {
    title: "Security & Compliance",
    templates: [
      "Security Assessment Checklist",
      "Compliance Audit Template",
      "Risk Management Framework"
    ]
  }
};

// Additional templates for subcomponents that exist but are missing template definitions
const additionalMissingTemplates = {
  // These are subcomponents that exist in the file but don't have templates defined
  // Based on the audit, we need to check if any existing subcomponents are missing templates
  
  // After reviewing, all subcomponents in Blocks 1, 2, 4, 7-12, 15-16 have templates
  // Only Blocks 3, 5, 6, 13, 14 have missing templates which are covered above
};

// Function to integrate all missing templates into educational content
function integrateAllMissingTemplates(educationalContent) {
  // Add templates for Block 3
  Object.keys(completeMissingTemplates).forEach(key => {
    if (key.startsWith("3-")) {
      if (!educationalContent[key]) {
        educationalContent[key] = {
          title: completeMissingTemplates[key].title,
          templates: completeMissingTemplates[key].templates,
          what: `Strategic framework for ${completeMissingTemplates[key].title.toLowerCase()}.`,
          why: `Essential for making informed decisions and optimizing resource allocation.`,
          how: `Implement using the provided templates and customize for your specific needs.`,
          examples: [],
          metrics: [],
          workspace: {
            tools: [],
            templates: completeMissingTemplates[key].templates,
            bestPractices: []
          }
        };
      } else if (!educationalContent[key].templates || educationalContent[key].templates.length === 0) {
        educationalContent[key].templates = completeMissingTemplates[key].templates;
        if (educationalContent[key].workspace) {
          educationalContent[key].workspace.templates = completeMissingTemplates[key].templates;
        }
      }
    }
  });

  // Add templates for Block 5
  Object.keys(completeMissingTemplates).forEach(key => {
    if (key.startsWith("5-")) {
      if (!educationalContent[key]) {
        educationalContent[key] = {
          title: completeMissingTemplates[key].title,
          templates: completeMissingTemplates[key].templates,
          what: `Go-to-market framework for ${completeMissingTemplates[key].title.toLowerCase()}.`,
          why: `Critical for building market traction and customer validation.`,
          how: `Use these templates to structure your approach and track progress.`,
          examples: [],
          metrics: [],
          workspace: {
            tools: [],
            templates: completeMissingTemplates[key].templates,
            bestPractices: []
          }
        };
      } else if (!educationalContent[key].templates || educationalContent[key].templates.length === 0) {
        educationalContent[key].templates = completeMissingTemplates[key].templates;
        if (educationalContent[key].workspace) {
          educationalContent[key].workspace.templates = completeMissingTemplates[key].templates;
        }
      }
    }
  });

  // Add templates for Block 6
  Object.keys(completeMissingTemplates).forEach(key => {
    if (key.startsWith("6-")) {
      if (!educationalContent[key]) {
        educationalContent[key] = {
          title: completeMissingTemplates[key].title,
          templates: completeMissingTemplates[key].templates,
          what: `Customer engagement strategy for ${completeMissingTemplates[key].title.toLowerCase()}.`,
          why: `Drives retention, expansion, and customer lifetime value.`,
          how: `Implement systematically using these templates as your foundation.`,
          examples: [],
          metrics: [],
          workspace: {
            tools: [],
            templates: completeMissingTemplates[key].templates,
            bestPractices: []
          }
        };
      } else if (!educationalContent[key].templates || educationalContent[key].templates.length === 0) {
        educationalContent[key].templates = completeMissingTemplates[key].templates;
        if (educationalContent[key].workspace) {
          educationalContent[key].workspace.templates = completeMissingTemplates[key].templates;
        }
      }
    }
  });

  // Add templates for Block 13
  Object.keys(completeMissingTemplates).forEach(key => {
    if (key.startsWith("13-")) {
      if (!educationalContent[key]) {
        educationalContent[key] = {
          title: completeMissingTemplates[key].title,
          templates: completeMissingTemplates[key].templates,
          what: `Market domination strategy for ${completeMissingTemplates[key].title.toLowerCase()}.`,
          why: `Essential for achieving and maintaining market leadership position.`,
          how: `Execute using these strategic templates and frameworks.`,
          examples: [],
          metrics: [],
          workspace: {
            tools: [],
            templates: completeMissingTemplates[key].templates,
            bestPractices: []
          }
        };
      } else if (!educationalContent[key].templates || educationalContent[key].templates.length === 0) {
        educationalContent[key].templates = completeMissingTemplates[key].templates;
        if (educationalContent[key].workspace) {
          educationalContent[key].workspace.templates = completeMissingTemplates[key].templates;
        }
      }
    }
  });

  // Add templates for Block 14
  Object.keys(completeMissingTemplates).forEach(key => {
    if (key.startsWith("14-")) {
      if (!educationalContent[key]) {
        educationalContent[key] = {
          title: completeMissingTemplates[key].title,
          templates: completeMissingTemplates[key].templates,
          what: `Operational infrastructure for ${completeMissingTemplates[key].title.toLowerCase()}.`,
          why: `Required for scaling efficiently and maintaining operational excellence.`,
          how: `Build robust systems using these operational templates.`,
          examples: [],
          metrics: [],
          workspace: {
            tools: [],
            templates: completeMissingTemplates[key].templates,
            bestPractices: []
          }
        };
      } else if (!educationalContent[key].templates || educationalContent[key].templates.length === 0) {
        educationalContent[key].templates = completeMissingTemplates[key].templates;
        if (educationalContent[key].workspace) {
          educationalContent[key].workspace.templates = completeMissingTemplates[key].templates;
        }
      }
    }
  });

  return educationalContent;
}

// Validation function to ensure all 96 subcomponents have exactly 3 templates
function validateAllTemplates(educationalContent) {
  const results = {
    total: 0,
    complete: 0,
    missing: [],
    incomplete: []
  };

  for (let block = 1; block <= 16; block++) {
    for (let sub = 1; sub <= 6; sub++) {
      const key = `${block}-${sub}`;
      results.total++;
      
      if (!educationalContent[key]) {
        results.missing.push(key);
      } else if (!educationalContent[key].templates || educationalContent[key].templates.length !== 3) {
        results.incomplete.push({
          key: key,
          templateCount: educationalContent[key].templates ? educationalContent[key].templates.length : 0
        });
      } else {
        results.complete++;
      }
    }
  }

  results.completionRate = (results.complete / results.total * 100).toFixed(1) + '%';
  return results;
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { 
    completeMissingTemplates, 
    integrateAllMissingTemplates,
    validateAllTemplates
  };
}
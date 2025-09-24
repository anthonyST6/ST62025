// Script to add missing subcomponents to educational-content.js
const fs = require('fs');
const path = require('path');

// Read the current educational content file
const contentPath = path.join(__dirname, 'educational-content.js');
let contentFile = fs.readFileSync(contentPath, 'utf8');

// Define the missing content to add
const missingContent = `
  // Block 3: Strategic Prioritization (3-3 through 3-6)
  "3-3": {
    title: "Prioritization Framework",
    what: "A systematic approach to making trade-off decisions between competing opportunities, features, and initiatives based on strategic value.",
    why: "Resources are always limited. A clear prioritization framework ensures you focus on what moves the needle most, avoiding the 'everything is important' trap.",
    how: "Use scoring models like RICE (Reach, Impact, Confidence, Effort) or Value vs. Complexity matrices. Score each initiative on multiple dimensions, apply weighted scoring, and validate with stakeholders.",
    examples: [
      "RICE scoring: Reach × Impact × Confidence / Effort",
      "Value vs. Complexity matrix for feature prioritization",
      "Strategic themes: 60% core, 30% adjacent, 10% transformational"
    ],
    templates: ["RICE Scoring Framework", "Priority Matrix Template", "Trade-off Analysis Guide"],
    metrics: ["Value delivered per sprint", "Strategic alignment score", "Resource utilization efficiency", "Time to market for priorities"],
    workspace: {
      tools: ["Prioritization Tools (ProductBoard, Aha!)", "Roadmap Software (ProductPlan, Roadmunk)", "Analytics Platforms (Mixpanel, Amplitude)", "Project Management (Jira, Linear)"],
      templates: ["RICE Scoring Framework", "Priority Matrix Template", "Trade-off Analysis Guide", "Stakeholder Alignment Canvas"],
      bestPractices: ["Use consistent scoring criteria", "Involve cross-functional stakeholders", "Document prioritization rationale", "Review priorities monthly"]
    }
  },

  "3-4": {
    title: "Strategic Trade-offs",
    what: "Explicit decisions about what NOT to do, which markets NOT to serve, and which features NOT to build to maintain focus and differentiation.",
    why: "Strategy is as much about what you won't do as what you will. Clear trade-offs prevent dilution and ensure resources concentrate on winning plays.",
    how: "Define core strategic focus, identify tempting distractions, assess opportunity costs, document 'not doing' list, communicate boundaries clearly, and resist scope creep.",
    examples: [
      "No custom development for deals under $100K",
      "No freemium model despite competitor pressure",
      "No international expansion until $10M ARR"
    ],
    templates: ["Strategic Focus Canvas", "Not-Doing List Template", "Trade-off Decision Matrix"],
    metrics: ["Focus score (% resources on core)", "Scope creep incidents", "Strategic initiative success rate", "Resource allocation efficiency"],
    workspace: {
      tools: ["Strategy Tools (Cascade, Perdoo)", "Decision Tracking (Coda, Notion)", "Portfolio Management (Planview, Clarity)", "OKR Platforms (Weekdone, Ally.io)"],
      templates: ["Strategic Focus Canvas", "Not-Doing List Template", "Trade-off Decision Matrix", "Opportunity Cost Calculator"],
      bestPractices: ["Document what you're NOT doing", "Communicate trade-offs clearly", "Review quarterly for relevance", "Resist feature creep from big deals"]
    }
  },

  "3-5": {
    title: "Hypothesis Testing Framework",
    what: "A structured approach to validating critical assumptions about market, product, and business model through rapid, low-cost experiments.",
    why: "Most startup failures come from building something nobody wants. Hypothesis testing reduces risk by validating assumptions before major investment.",
    how: "Identify assumptions, form testable hypotheses, design minimal viable experiments, define success criteria, run time-boxed tests, and analyze results to learn and iterate.",
    examples: [
      "Hypothesis: SMBs will pay $99/month for automation",
      "Test: 100 cold emails, measure meeting interest",
      "Result: 2% meeting rate, hypothesis invalidated"
    ],
    templates: ["Hypothesis Canvas", "Experiment Design Template", "Learning Log Framework"],
    metrics: ["Hypotheses tested per quarter", "Validation success rate", "Time to validation", "Cost per experiment"],
    workspace: {
      tools: ["Experiment Tracking (Optimizely, LaunchDarkly)", "Survey Tools (Typeform, SurveyMonkey)", "Landing Page Builders (Unbounce, Instapage)", "Analytics (Google Analytics, Mixpanel)"],
      templates: ["Hypothesis Canvas", "Experiment Design Template", "Learning Log Framework", "Validation Scorecard"],
      bestPractices: ["Test riskiest assumptions first", "Keep experiments small and fast", "Define success criteria upfront", "Document and share learnings"]
    }
  },

  "3-6": {
    title: "Decision Archive",
    what: "A documented record of major strategic decisions including context, alternatives considered, rationale, and outcomes for organizational learning.",
    why: "Teams repeat mistakes when institutional memory is lost. A decision archive creates learning loops and helps new members understand the 'why' behind choices.",
    how: "Capture decisions in real-time, include dissenting opinions, link supporting data, set review timeline, update with outcomes, and extract patterns and lessons.",
    examples: [
      "Pivot from SMB to enterprise: Context, data, results",
      "Pricing model change: A/B test results, revenue impact",
      "Technology stack decision: Evaluation criteria, trade-offs"
    ],
    templates: ["Decision Document Template", "Options Analysis Matrix", "Retrospective Framework"],
    metrics: ["Decision velocity", "Decision reversal rate", "Outcome achievement rate", "Learning extraction frequency"],
    workspace: {
      tools: ["Documentation (Notion, Confluence)", "Decision Tools (Cloverpop, Loomio)", "Knowledge Management (Guru, Slab)", "Version Control (Git, Perforce)"],
      templates: ["Decision Document Template", "Options Analysis Matrix", "Retrospective Framework", "DACI Framework"],
      bestPractices: ["Document decisions within 48 hours", "Include dissenting views", "Review outcomes after 90 days", "Share learnings broadly"]
    }
  },`;

// Find where to insert the new content (after 3-2)
const insertPoint = contentFile.indexOf('"3-2":');
if (insertPoint === -1) {
  console.error('Could not find insertion point for Block 3 content');
  process.exit(1);
}

// Find the end of 3-2 definition
const searchFrom = contentFile.indexOf('},', insertPoint);
const insertAt = searchFrom + 2;

// Insert the new content
const updatedContent = 
  contentFile.slice(0, insertAt) + 
  '\n' + missingContent + 
  contentFile.slice(insertAt);

// Write the updated content back
fs.writeFileSync(contentPath, updatedContent, 'utf8');

console.log('✅ Successfully added missing subcomponents to educational-content.js');
console.log('Added:');
console.log('- 3-3: Prioritization Framework');
console.log('- 3-4: Strategic Trade-offs');
console.log('- 3-5: Hypothesis Testing Framework');
console.log('- 3-6: Decision Archive');
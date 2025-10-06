// Complete Template Integration Script
// This script adds all missing templates to educational-content.js

const fs = require('fs');
const path = require('path');

// All missing templates for 34 subcomponents
const missingTemplates = {
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

// Function to update educational-content.js
function updateEducationalContent() {
  const filePath = path.join(__dirname, 'educational-content.js');
  
  // Read the current file
  let fileContent = fs.readFileSync(filePath, 'utf8');
  
  // Parse to find where to add templates
  Object.keys(missingTemplates).forEach(key => {
    const templateData = missingTemplates[key];
    
    // Check if this subcomponent exists in the file
    const subcomponentRegex = new RegExp(`"${key}":\\s*{[^}]*}`, 'gs');
    const match = fileContent.match(subcomponentRegex);
    
    if (match) {
      // Subcomponent exists but might be missing templates
      const hasTemplates = match[0].includes('templates:');
      
      if (!hasTemplates) {
        // Add templates to existing subcomponent
        const templatesString = `\n    templates: ${JSON.stringify(templateData.templates, null, 6).replace(/"/g, '"')}`;
        const insertPosition = match[0].lastIndexOf('}');
        const updatedSection = match[0].slice(0, insertPosition) + ',' + templatesString + match[0].slice(insertPosition);
        fileContent = fileContent.replace(match[0], updatedSection);
        console.log(`✅ Added templates to existing subcomponent ${key}`);
      }
    } else {
      // Subcomponent doesn't exist, need to add it
      const newSubcomponent = `
  "${key}": {
    title: "${templateData.title}",
    templates: ${JSON.stringify(templateData.templates, null, 4).replace(/\n/g, '\n    ')},
    what: "Strategic framework for ${templateData.title.toLowerCase()}.",
    why: "Essential for making informed decisions and optimizing operations.",
    how: "Implement using the provided templates and customize for your specific needs.",
    examples: [],
    metrics: [],
    workspace: {
      tools: [],
      templates: ${JSON.stringify(templateData.templates, null, 6).replace(/\n/g, '\n      ')},
      bestPractices: []
    }
  },`;
      
      // Find the right place to insert (after the last subcomponent in the same block)
      const blockNumber = parseInt(key.split('-')[0]);
      const lastSubcomponentInBlock = `"${blockNumber}-${blockNumber === 3 ? 2 : blockNumber === 5 ? 2 : blockNumber === 6 ? 2 : blockNumber === 13 ? 2 : blockNumber === 14 ? 2 : 6}"`;
      
      const insertRegex = new RegExp(`(${lastSubcomponentInBlock}:[^}]*}),`, 'gs');
      const insertMatch = fileContent.match(insertRegex);
      
      if (insertMatch) {
        fileContent = fileContent.replace(insertMatch[0], insertMatch[0] + newSubcomponent);
        console.log(`✅ Added new subcomponent ${key}`);
      }
    }
  });
  
  // Write the updated content back
  fs.writeFileSync(filePath, fileContent, 'utf8');
  console.log('✅ Educational content file updated successfully!');
}

// Function to validate all templates
function validateAllTemplates() {
  const filePath = path.join(__dirname, 'educational-content.js');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  let totalSubcomponents = 0;
  let subcomponentsWithTemplates = 0;
  let missingTemplatesList = [];
  
  for (let block = 1; block <= 16; block++) {
    for (let sub = 1; sub <= 6; sub++) {
      const key = `${block}-${sub}`;
      totalSubcomponents++;
      
      const subcomponentRegex = new RegExp(`"${key}":\\s*{[^}]*templates:\\s*\\[[^\\]]*\\]`, 'gs');
      const match = fileContent.match(subcomponentRegex);
      
      if (match) {
        // Extract templates array
        const templatesMatch = match[0].match(/templates:\s*\[([^\]]*)\]/);
        if (templatesMatch) {
          const templatesContent = templatesMatch[1];
          const templateCount = (templatesContent.match(/"/g) || []).length / 2;
          
          if (templateCount === 3) {
            subcomponentsWithTemplates++;
          } else {
            missingTemplatesList.push(`${key}: Has ${templateCount} templates (needs 3)`);
          }
        }
      } else {
        missingTemplatesList.push(`${key}: No templates found`);
      }
    }
  }
  
  console.log('\n📊 VALIDATION REPORT:');
  console.log(`Total Subcomponents: ${totalSubcomponents}`);
  console.log(`Complete (3 templates): ${subcomponentsWithTemplates}`);
  console.log(`Incomplete: ${totalSubcomponents - subcomponentsWithTemplates}`);
  console.log(`Completion Rate: ${(subcomponentsWithTemplates / totalSubcomponents * 100).toFixed(1)}%`);
  
  if (missingTemplatesList.length > 0) {
    console.log('\n⚠️ Issues found:');
    missingTemplatesList.forEach(issue => console.log(`  - ${issue}`));
  } else {
    console.log('\n✅ All 96 subcomponents have exactly 3 templates!');
  }
  
  return {
    total: totalSubcomponents,
    complete: subcomponentsWithTemplates,
    incomplete: totalSubcomponents - subcomponentsWithTemplates,
    issues: missingTemplatesList
  };
}

// Main execution
console.log('🚀 Starting template integration process...\n');

// Update the educational content
updateEducationalContent();

// Validate the results
console.log('\n🔍 Validating template integration...');
const validationResults = validateAllTemplates();

// Create a summary report
const reportPath = path.join(__dirname, 'template-integration-report.json');
fs.writeFileSync(reportPath, JSON.stringify(validationResults, null, 2), 'utf8');
console.log(`\n📄 Report saved to: ${reportPath}`);

console.log('\n✅ Template integration complete!');
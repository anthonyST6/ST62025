/**
 * Restore the complete demo data file with all 96 subcomponents
 * This will create a clean version with all data properly structured
 */

const fs = require('fs');

// Read the original files to get all the data
const originalData = require('./st6co-demo-data-complete.js');
const additionalData = require('./add-remaining-demo-data.js');

// Merge all data together
const completeData = {
  ...originalData.st6coDemoData,
  ...additionalData.remainingDemoData
};

// Create the complete file content
const fileContent = `/**
 * ST6Co/ScaleOps6 Complete Demo Data
 * Comprehensive demo answers for all 96 subcomponents
 * Demonstrates ScaleOps6's own GTM maturity journey
 * Generated: 2025-01-17
 */

const st6coDemoData = ${JSON.stringify(completeData, null, 2)};

// Helper function to get demo data for a specific question
function getDemoAnswer(blockId, subId, questionId) {
  const subcomponentKey = \`\${blockId}-\${subId}\`;
  const subcomponentData = st6coDemoData[subcomponentKey];
  
  if (subcomponentData) {
    const fullQuestionId = \`\${blockId}-\${subId}-\${questionId}\`;
    if (subcomponentData[fullQuestionId]) {
      return subcomponentData[fullQuestionId];
    }
    
    // Try with just the question ID
    if (subcomponentData[questionId]) {
      return subcomponentData[questionId];
    }
  }
  
  // Return generic fallback for missing data
  return generateGenericAnswer(blockId, subId, questionId);
}

// Generate generic answers for any missing data
function generateGenericAnswer(blockId, subId, questionId) {
  const maturityByBlock = {
    1: 85, 2: 85, 3: 80, 4: 80,
    5: 75, 6: 75, 7: 70, 8: 70,
    9: 65, 10: 65, 11: 60, 12: 60,
    13: 55, 14: 55, 15: 50, 16: 45
  };
  
  const maturity = maturityByBlock[blockId] || 50;
  
  // Generate contextually appropriate generic answer based on question type
  // WITHOUT self-referential percentage evaluations
  if (questionId.includes('q1')) {
    // For diagnostic questions about current state and challenges
    if (maturity >= 80) {
      return "We've established comprehensive processes in this area with strong operational foundations. Key challenges include optimizing for scale, maintaining consistency across growing teams, and balancing standardization with flexibility. These challenges require dedicated resources and continuous refinement as we expand our operations and customer base.";
    } else if (maturity >= 60) {
      return "We're developing systematic approaches in this area with documented processes and regular reviews. Current challenges involve resource allocation, cross-functional coordination, and measuring effectiveness. We're addressing these through iterative improvements, stakeholder feedback, and pilot programs to validate our approach before full rollout.";
    } else {
      return "We're building foundational capabilities in this area through pilot programs and initial implementations. Key focus areas include establishing baseline processes, gathering initial data, and identifying best practices. Early challenges involve limited resources, competing priorities, and the need for stakeholder buy-in as we demonstrate value.";
    }
  } else if (questionId.includes('q2')) {
    // For quantitative questions about metrics and performance
    if (maturity >= 80) {
      return "We track comprehensive metrics including adoption rates, efficiency gains, quality scores, and customer satisfaction. Current performance shows strong adoption with most targets being met or exceeded. Key metrics include user engagement rates, process efficiency improvements, and quality benchmarks. We're seeing consistent month-over-month improvements with clear ROI demonstration.";
    } else if (maturity >= 60) {
      return "We monitor core metrics across adoption, efficiency, and quality dimensions. Performance data shows steady progress with room for optimization. We track user engagement, process improvements, and satisfaction scores. Monthly reviews show positive trends with specific areas identified for enhancement. Target achievement varies by metric with focus on continuous improvement.";
    } else {
      return "We're establishing measurement systems with initial metrics for adoption and basic performance. Early data shows promising indicators though baselines are still being established. Focus metrics include user activation, initial efficiency gains, and early feedback scores. We're building toward more comprehensive measurement as our processes mature.";
    }
  } else if (questionId.includes('q3')) {
    // For strategic questions about alignment and approach
    if (maturity >= 80) {
      return "This initiative directly supports our strategic objectives through clear alignment with company OKRs and mission. It drives measurable improvements in customer success, operational efficiency, and market positioning. Resource allocation and executive sponsorship demonstrate strategic importance. Integration with other initiatives creates synergies and accelerates overall progress.";
    } else if (maturity >= 60) {
      return "Our approach aligns with strategic goals by addressing key business priorities and customer needs. It contributes to quarterly objectives and supports our growth trajectory. We're seeing positive impact on customer satisfaction and operational metrics. Strategic importance is reflected in dedicated resources and regular leadership reviews.";
    } else {
      return "We're aligning this initiative with strategic priorities through careful planning and stakeholder engagement. Early focus on proving value and building foundation for scale. Connection to business objectives being strengthened through pilot results and customer feedback. Resource allocation increasing as we demonstrate impact and potential.";
    }
  } else if (questionId.includes('q4')) {
    // For validation questions about evidence and proof
    if (maturity >= 80) {
      return "Strong evidence of effectiveness through multiple validation sources: customer testimonials, usage analytics, performance metrics, and case studies. External validation from industry recognition, peer benchmarks, and partner feedback. Internal assessments show clear ROI with documented success stories. Regular audits confirm approach effectiveness and identify optimization opportunities.";
    } else if (maturity >= 60) {
      return "Evidence includes positive customer feedback, improving metrics, and successful pilot implementations. Internal reviews show progress against goals with clear value demonstration. External indicators include customer retention, referrals, and competitive wins. Validation through regular assessments, stakeholder feedback, and performance tracking against benchmarks.";
    } else {
      return "Early validation through pilot program results, initial customer feedback, and baseline metric improvements. Gathering evidence through structured experiments, customer interviews, and performance monitoring. Initial indicators are positive with more comprehensive validation planned as we scale. Focus on building proof points for broader rollout.";
    }
  } else if (questionId.includes('q5')) {
    // For comparative or next steps questions
    if (maturity >= 80) {
      return "Next steps focus on optimization and scale: expanding successful approaches to new segments, implementing advanced automation, enhancing measurement systems, and sharing best practices across teams. Planning includes quarterly reviews, continuous improvement cycles, and strategic investments in platform capabilities. Focus on maintaining excellence while driving innovation.";
    } else if (maturity >= 60) {
      return "Planned improvements include expanding coverage, implementing automation for efficiency, gathering more comprehensive feedback, and establishing better measurement systems. Quarterly planning cycles ensure continuous progress. Focus on scaling successful pilots, addressing identified gaps, and building toward more sophisticated capabilities.";
    } else {
      return "Next phases include solidifying foundations, expanding pilot programs, implementing basic automation, and establishing measurement baselines. Planning focuses on proving value, securing resources, and building team capabilities. Priorities include stakeholder alignment, process documentation, and creating feedback loops for continuous improvement.";
    }
  } else {
    // For execution or general questions
    if (maturity >= 80) {
      return "This area demonstrates strong execution with established processes, clear metrics, and proven results. We maintain excellence through continuous optimization, regular reviews, and proactive improvements. Our approach balances stability with innovation, ensuring sustainable growth while exploring new opportunities. Team expertise and systematic processes drive consistent outcomes.";
    } else if (maturity >= 60) {
      return "We're executing systematically with documented processes, regular monitoring, and iterative improvements. Progress is steady with clear milestones and success metrics. Our approach emphasizes learning and adaptation while building toward more sophisticated capabilities. Focus on consistency, quality, and sustainable growth.";
    } else {
      return "We're building execution capabilities through structured approaches, pilot programs, and continuous learning. Early progress shows promise with foundations being established for future scale. Focus on proving concepts, gathering feedback, and refining our approach. Emphasis on creating repeatable processes and building team expertise.";
    }
  }
}

// Export for use in server
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    st6coDemoData,
    getDemoAnswer,
    generateGenericAnswer
  };
} else {
  window.st6coDemoData = st6coDemoData;
  window.getDemoAnswer = getDemoAnswer;
  window.generateGenericAnswer = generateGenericAnswer;
}
`;

// Write the complete file
fs.writeFileSync('st6co-demo-data-complete-fixed.js', fileContent);

console.log('Created complete demo data file with all 96 subcomponents!');
console.log('File saved as: st6co-demo-data-complete-fixed.js');

// Count the subcomponents
const subcomponentCount = Object.keys(completeData).length;
console.log(`Total subcomponents: ${subcomponentCount}`);

// List any missing subcomponents
const expectedSubcomponents = [];
for (let block = 1; block <= 16; block++) {
  for (let sub = 1; sub <= 6; sub++) {
    expectedSubcomponents.push(`${block}-${sub}`);
  }
}

const missingSubcomponents = expectedSubcomponents.filter(key => !completeData[key]);
if (missingSubcomponents.length > 0) {
  console.log('Missing subcomponents:', missingSubcomponents.join(', '));
} else {
  console.log('All 96 subcomponents are present!');
}
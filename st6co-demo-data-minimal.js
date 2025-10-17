
const fs = require('fs');

// Since the current file is corrupted, let's create a minimal working version
// that can be expanded later

const minimalDemoData = {
  "1-1": {
    "1-1-q1": "The B2B SaaS startup ecosystem loses $75B annually due to GTM execution failures. 92% of startups fail within 3 years, with 70% citing go-to-market challenges as the primary cause.",
    "1-1-q2": "This problem impacts our operations by driving our entire product strategy and go-to-market approach.",
    "1-1-q3": "We validate this problem through multiple data sources including customer interviews and industry reports.",
    "1-1-q4": "This problem directly aligns with our mission to democratize startup success.",
    "1-1-q5": "Our effectiveness is demonstrated through customer outcomes and growth metrics.",
    "1-1-q6": "Next steps include expanding problem validation and building predictive models."
  }
};

// Helper functions
function getDemoAnswer(blockId, subId, questionId) {
  const subcomponentKey = `${blockId}-${subId}`;
  const subcomponentData = minimalDemoData[subcomponentKey];
  
  if (subcomponentData) {
    const fullQuestionId = `${blockId}-${subId}-${questionId}`;
    if (subcomponentData[fullQuestionId]) {
      return subcomponentData[fullQuestionId];
    }
  }
  
  // Return a generic answer for now
  return "We are actively developing capabilities in this area with focus on continuous improvement and measurable outcomes.";
}

function generateGenericAnswer(blockId, subId, questionId) {
  return "We are actively developing capabilities in this area with focus on continuous improvement and measurable outcomes.";
}

// Export
module.exports = {
  st6coDemoData: minimalDemoData,
  getDemoAnswer,
  generateGenericAnswer
};

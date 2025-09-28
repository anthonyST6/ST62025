// Test to verify Problem Statement Canvas structure matches requirements
const fs = require('fs');
const vm = require('vm');

// Load the evaluation engine
const engineCode = fs.readFileSync('./template-evaluation-engine.js', 'utf8');
const sandbox = { window: {}, console };
vm.createContext(sandbox);
vm.runInContext(engineCode, sandbox);

const engine = sandbox.window.TemplateEvaluationEngine;

console.log('=== PROBLEM STATEMENT CANVAS STRUCTURE TEST ===\n');

// Test with sample data matching the exact structure
const sampleWorksheetData = {
    'who-affected': `
        WHO: Target Customer
        Role/Title: VP of Sales, Product Manager
        Company Size: 50-200 employees
        Industry: B2B SaaS, Healthcare
        Demographics: Age 35-45, US-based, Tech-savvy
    `,
    'what-problem': `
        WHAT: The Problem
        Primary Pain Point: Manual lead qualification takes 3+ hours daily
        Secondary Issues: Inconsistent scoring, missed opportunities
        Current Frustrations: No automation, repetitive tasks, human error
    `,
    'when-occur': `
        WHEN: Context & Triggers
        Trigger Events: New lead submission, campaign launch, quarter end
        Frequency: Daily, 20-30 times per day
        Urgency Level: High - impacts revenue pipeline directly
    `,
    'what-impact': `
        WHY: Impact & Cost
        Financial Impact: $250K lost revenue per quarter
        Time Lost: 60 hours/month across sales team
        Opportunity Cost: Missing 30% of qualified leads
    `,
    'how-solving': `
        HOW: Current Solutions
        Current Approach: Manual spreadsheet tracking and scoring
        Limitations: Not scalable, prone to errors, no real-time updates
        Desired Outcome: Automated scoring with AI, instant qualification
    `
};

// Evaluate the template
const evaluation = engine.evaluateTemplate('Problem Statement Canvas', sampleWorksheetData);

console.log('Template: ' + evaluation.templateName);
console.log('Overall Score: ' + evaluation.totalScore + '%');
console.log('Grade: ' + evaluation.grade);
console.log('Feedback: ' + evaluation.overallFeedback);
console.log('\n=== QUESTION EVALUATION ===\n');

evaluation.questions.forEach((q, index) => {
    console.log(`Question ${index + 1}: ${q.question}`);
    console.log(`  Score: ${q.score}% (${q.grade})`);
    console.log(`  Criteria Met: ${q.matchedCriteria}/${q.totalCriteria}`);
    console.log(`  Sample Answer: ${q.answer.substring(0, 100)}...`);
    console.log('');
});

// Verify all 5 sections are covered
const expectedQuestions = [
    'Who specifically is experiencing this problem?',
    'What exactly is the problem they face?',
    'When and why does this problem occur?',
    'What is the measurable impact?',
    'How are they solving it today?'
];

console.log('=== STRUCTURE VERIFICATION ===\n');
console.log('Expected Questions (WHO, WHAT, WHEN, WHY, HOW):');
expectedQuestions.forEach((expected, i) => {
    const actual = evaluation.questions[i]?.question;
    const match = expected === actual ? '✅' : '❌';
    console.log(`${match} ${i+1}. ${expected}`);
    if (actual && actual !== expected) {
        console.log(`     Actual: ${actual}`);
    }
});

// Check criteria coverage
console.log('\n=== CRITERIA COVERAGE ===\n');
const template = engine.templates['Problem Statement Canvas'];
template.questions.forEach((q, i) => {
    console.log(`Question ${i+1} criteria (${q.criteria.length} total):`);
    q.criteria.forEach(c => console.log(`  - ${c}`));
    console.log('');
});

console.log('=== TEST COMPLETE ===');
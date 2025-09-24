// Check Phase 3 subcomponents specifically
const { educationalContent } = require('./educational-content');
const { missingContent } = require('./missing-content-additions');

// Merge all content
const allContent = { ...educationalContent, ...missingContent };

// Phase 3 blocks: 9, 10, 11, 12
const phase3Blocks = [
    { id: 9, name: "Proof Execution" },
    { id: 10, name: "Sales Team Empowerment" },
    { id: 11, name: "High Performance Teams" },
    { id: 12, name: "Retention Systems" }
];

// Expected titles for Phase 3 subcomponents
const expectedTitles = {
    // Block 9: Proof Execution
    '9-1': 'Inbound Conversion Rates',
    '9-2': 'Outbound Play Performance',
    '9-3': 'Channel Economics Clarity',
    '9-4': 'Discovery Call Effectiveness',
    '9-5': 'Demo-to-Close Flow',
    '9-6': 'Founders Selling Model',
    
    // Block 10: Sales Team Empowerment
    '10-1': 'Enablement Asset Pack',
    '10-2': 'Rep Ramp Plan',
    '10-3': 'Win/Loss Tracker',
    '10-4': 'Objection Handling Guide',
    '10-5': 'ICP Filter Checklist',
    '10-6': 'Sales Call Library',
    
    // Block 11: High Performance Teams
    '11-1': 'Scorecard Model',
    '11-2': 'Quota Structure',
    '11-3': 'Weekly Deal Reviews',
    '11-4': 'Forecasting Framework',
    '11-5': 'Manager Coaching Loop',
    '11-6': 'Talent Gap Identification',
    
    // Block 12: Retention Systems
    '12-1': 'Onboarding Checklist',
    '12-2': 'Activation Tracker',
    '12-3': 'Success Playbooks',
    '12-4': 'Escalation SOPs',
    '12-5': 'Renewals Pipeline',
    '12-6': 'Churn Root-Cause Engine'
};

console.log('=== CHECKING PHASE 3 SUBCOMPONENT TITLES ===\n');

phase3Blocks.forEach(block => {
    console.log(`\n📦 Block ${block.id}: ${block.name}`);
    console.log('─'.repeat(60));
    
    for (let i = 1; i <= 6; i++) {
        const id = `${block.id}-${i}`;
        const content = allContent[id];
        const expected = expectedTitles[id];
        
        if (!content) {
            console.log(`  ❌ ${id}: MISSING CONTENT`);
            console.log(`     Expected: "${expected}"`);
        } else if (!content.title) {
            console.log(`  ⚠️  ${id}: NO TITLE FIELD`);
            console.log(`     Expected: "${expected}"`);
        } else {
            const actual = content.title;
            const match = actual === expected;
            
            if (match) {
                console.log(`  ✅ ${id}: "${actual}"`);
            } else {
                console.log(`  ❌ ${id}: MISMATCH`);
                console.log(`     Actual: "${actual}"`);
                console.log(`     Expected: "${expected}"`);
            }
        }
    }
});

// Also check what the server.js subBlockDefinitions has
console.log('\n\n=== CHECKING SERVER.JS DEFINITIONS ===\n');

const serverDefinitions = {
    9: [ // Proof Execution
        { name: "Inbound Conversion Rates", description: "Percentage of leads converting" },
        { name: "Outbound Play Performance", description: "Cold outreach effectiveness" },
        { name: "Channel Economics Clarity", description: "CAC and ROI by channel" },
        { name: "Discovery Call Effectiveness", description: "Discovery to demo conversion" },
        { name: "Demo-to-Close Flow", description: "Demo process and conversion" },
        { name: "Founders Selling Model", description: "How founders successfully sell" }
    ],
    10: [ // Sales Team Empowerment
        { name: "Enablement Asset Pack", description: "Centralized sales materials" },
        { name: "Rep Ramp Plan", description: "Onboarding roadmap for new reps" },
        { name: "Win/Loss Tracker", description: "System for deal analysis" },
        { name: "Objection Handling Guide", description: "Common objections and rebuttals" },
        { name: "ICP Filter Checklist", description: "Qualification framework" },
        { name: "Sales Call Library", description: "Curated repository of calls" }
    ],
    11: [ // High Performance Teams
        { name: "Scorecard Model", description: "Performance metrics per role" },
        { name: "Quota Structure", description: "Revenue targets and alignment" },
        { name: "Weekly Deal Reviews", description: "Structured pipeline review" },
        { name: "Forecasting Framework", description: "Methodology for predicting revenue" },
        { name: "Manager Coaching Loop", description: "Structured coaching approach" },
        { name: "Talent Gap Identification", description: "Review of team performance" }
    ],
    12: [ // Retention Systems
        { name: "Onboarding Checklist", description: "Step-by-step new customer process" },
        { name: "Activation Tracker", description: "Monitor customer activation" },
        { name: "Success Playbooks", description: "Strategies for retention and growth" },
        { name: "Escalation SOPs", description: "Handle at-risk customers" },
        { name: "Renewals Pipeline", description: "Forecast upcoming renewals" },
        { name: "Churn Root-Cause Engine", description: "Analyze why customers leave" }
    ]
};

console.log('Comparing server definitions with educational content:\n');

[9, 10, 11, 12].forEach(blockId => {
    const blockDefs = serverDefinitions[blockId];
    console.log(`\nBlock ${blockId}:`);
    
    blockDefs.forEach((def, index) => {
        const id = `${blockId}-${index + 1}`;
        const content = allContent[id];
        
        if (content && content.title) {
            const match = content.title === def.name;
            console.log(`  ${id}: Server="${def.name}" | Content="${content.title}" | ${match ? '✅' : '❌'}`);
        } else {
            console.log(`  ${id}: Server="${def.name}" | Content=MISSING ❌`);
        }
    });
});
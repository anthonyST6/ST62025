const fs = require('fs');
const path = require('path');

// Load the complete content to verify uniqueness
const { scaleOps6Education } = require('./scaleops6-complete-content');

console.log('╔════════════════════════════════════════════════════════════════════╗');
console.log('║           SCALEOPS6 COMPREHENSIVE VERIFICATION REPORT              ║');
console.log('╚════════════════════════════════════════════════════════════════════╝\n');

// Define all 16 blocks and their 96 subcomponents
const blocks = [
    {
        id: 1,
        name: "Mission Discovery",
        subcomponents: [
            "Problem Statement Definition",
            "Mission Statement",
            "Customer Insight Capture",
            "Founding Team Capability",
            "Market Insight Synthesis",
            "Prototype Launch Plan"
        ]
    },
    {
        id: 2,
        name: "Customer Insights",
        subcomponents: [
            "Interview Cadence Plan",
            "Personas Framework",
            "Pain Point Mapping",
            "JTBD Capture",
            "Signal Grading",
            "Insight-to-Action Loop"
        ]
    },
    {
        id: 3,
        name: "Strategic Prioritization",
        subcomponents: [
            "Use Case Scoring Model",
            "Segment Tiering",
            "Prioritization Rubric",
            "Tradeoff Tracker",
            "Hypothesis Board",
            "Decision Archive"
        ]
    },
    {
        id: 4,
        name: "Prototype Launch",
        subcomponents: [
            "Feature Inclusion Matrix",
            "Technical Scope Tracker",
            "Pilot Group Selection",
            "QA & Success Criteria",
            "Timeline Gantt or Roadmap",
            "Post-Mortem Template"
        ]
    },
    {
        id: 5,
        name: "Early Adopter Wins",
        subcomponents: [
            "Case Study Template",
            "ROI Calculation Sheet",
            "Use Case Spotlight",
            "Buyer Quotes & Testimonials",
            "Win Criteria Mapping",
            "Deal Debrief Framework"
        ]
    },
    {
        id: 6,
        name: "Customer Engagement Flywheel",
        subcomponents: [
            "Usage Heatmap",
            "Milestone Triggers",
            "CS Dashboard",
            "Activation Metric Model",
            "Feedback Collector",
            "Power User Behavior Signals"
        ]
    },
    {
        id: 7,
        name: "Quantifiable Impact",
        subcomponents: [
            "Time/Cost Savings Metrics",
            "Revenue-Impact Attribution",
            "Productivity Lift Metrics",
            "Net Retention Trends",
            "Downstream System Reductions",
            "Friction Reduction Evidence"
        ]
    },
    {
        id: 8,
        name: "Customer Success Expansion",
        subcomponents: [
            "Upsell Funnel Model",
            "Team Expansion Signals",
            "Organic Adoption Pattern",
            "Champion Mapping",
            "CSAT/NPS Tracking",
            "Renewal Readiness Tracker"
        ]
    },
    {
        id: 9,
        name: "Proof Execution",
        subcomponents: [
            "Inbound Conversion Rates",
            "Outbound Play Performance",
            "Channel Economics Clarity",
            "Discovery Call Effectiveness",
            "Demo-to-Close Flow",
            "Founders Selling Model"
        ]
    },
    {
        id: 10,
        name: "Sales Team Empowerment",
        subcomponents: [
            "Enablement Asset Pack",
            "Rep Ramp Plan",
            "Win/Loss Tracker",
            "Objection Handling Guide",
            "ICP Filter Checklist",
            "Sales Call Library"
        ]
    },
    {
        id: 11,
        name: "High Performance Teams",
        subcomponents: [
            "Scorecard Model",
            "Quota Structure",
            "Weekly Deal Reviews",
            "Forecasting Framework",
            "Manager Coaching Loop",
            "Talent Gap Identification"
        ]
    },
    {
        id: 12,
        name: "Retention Systems",
        subcomponents: [
            "Onboarding Checklist",
            "Activation Tracker",
            "Success Playbooks",
            "Escalation SOPs",
            "Renewals Pipeline",
            "Churn Root-Cause Engine"
        ]
    },
    {
        id: 13,
        name: "Market Domination Strategies",
        subcomponents: [
            "Category Narrative Canvas",
            "Strategic Moat Design",
            "Ecosystem Leverage Map",
            "Competitor GTM Monitoring",
            "Brand Architecture Plan",
            "Defensive GTM Tactics"
        ]
    },
    {
        id: 14,
        name: "Operational Infrastructure",
        subcomponents: [
            "System Architecture Diagram",
            "Revenue Engine Map",
            "Internal Dashboards",
            "Tool Consolidation Tracker",
            "RevOps Playbook",
            "Internal SLA Policy"
        ]
    },
    {
        id: 15,
        name: "Leadership Expansion",
        subcomponents: [
            "VP Hiring Scorecards",
            "Succession Plan Model",
            "Executive Reporting Cadence",
            "Culture Health Tracker",
            "Leadership Org Chart",
            "DEI Integration Plan"
        ]
    },
    {
        id: 16,
        name: "Global & Expansion Opportunities",
        subcomponents: [
            "Market Entry Checklist",
            "Localization Infrastructure",
            "International Pricing Matrix",
            "Regional Compliance Tracker",
            "Geo-Specific GTM Playbooks",
            "Expansion Risk Assessment"
        ]
    }
];

// Verification results
let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;
const issues = [];

// Check if block HTML files exist
console.log('📁 CHECKING BLOCK HTML FILES...\n');
blocks.forEach(block => {
    // Check main block file
    const blockFile = `block-${block.id}-${block.name.toLowerCase().replace(/[&\s]+/g, '-')}.html`;
    totalChecks++;
    
    if (fs.existsSync(blockFile)) {
        console.log(`✅ ${blockFile} exists`);
        passedChecks++;
    } else {
        console.log(`❌ ${blockFile} missing`);
        failedChecks++;
        issues.push(`Missing block file: ${blockFile}`);
    }
    
    // Check subcomponent files
    block.subcomponents.forEach((sub, index) => {
        const subFile = `block-${block.id}-${index + 1}.html`;
        totalChecks++;
        
        if (fs.existsSync(subFile)) {
            passedChecks++;
        } else {
            console.log(`❌ ${subFile} missing`);
            failedChecks++;
            issues.push(`Missing subcomponent file: ${subFile}`);
        }
    });
});

// Check content uniqueness
console.log('\n📝 CHECKING CONTENT UNIQUENESS...\n');
const contentIds = new Set();
const duplicateContent = [];

blocks.forEach(block => {
    block.subcomponents.forEach((sub, index) => {
        const contentId = `${block.id}-${index + 1}`;
        totalChecks++;
        
        if (scaleOps6Education[contentId]) {
            const content = scaleOps6Education[contentId];
            const contentHash = JSON.stringify({
                title: content.title,
                what: content.what,
                why: content.why
            });
            
            if (contentIds.has(contentHash)) {
                console.log(`❌ Duplicate content found for ${contentId}: ${sub}`);
                duplicateContent.push(`${contentId}: ${sub}`);
                failedChecks++;
            } else {
                contentIds.add(contentHash);
                passedChecks++;
            }
        } else {
            console.log(`❌ No content found for ${contentId}: ${sub}`);
            failedChecks++;
            issues.push(`Missing content for ${contentId}: ${sub}`);
        }
    });
});

// Check subcomponent-detail.html for required features
console.log('\n🔧 CHECKING SUBCOMPONENT-DETAIL.HTML FEATURES...\n');
const subcomponentDetailPath = 'subcomponent-detail.html';
if (fs.existsSync(subcomponentDetailPath)) {
    const content = fs.readFileSync(subcomponentDetailPath, 'utf8');
    
    const requiredFeatures = [
        { name: 'Six Tabs', pattern: /Education.*Workspace.*Analysis.*Output.*Resources.*Score History/s },
        { name: 'Enhanced Education Script', pattern: /enhanced-education-display\.js/ },
        { name: 'Enhanced Resources Script', pattern: /enhanced-resources-output\.js/ },
        { name: 'Analysis Fix Script', pattern: /fix-analysis-display\.js/ },
        { name: 'Persistence Handler', pattern: /enhanced-persistence-handler\.js/ },
        { name: 'ScaleOps6 Content', pattern: /scaleops6-complete-content\.js/ },
        { name: 'Two-Column Layout', pattern: /education-two-column|grid-template-columns:\s*1fr\s*1fr/ },
        { name: 'Green Best Practices', pattern: /background:\s*rgba\(76,\s*175,\s*80|border-left:\s*3px\s*solid\s*#4CAF50/ },
        { name: 'Download Functionality', pattern: /downloadTemplate/ },
        { name: 'Strengths/Weaknesses', pattern: /strength-item|weakness-item|strengths-weaknesses-grid/ }
    ];
    
    requiredFeatures.forEach(feature => {
        totalChecks++;
        if (feature.pattern.test(content)) {
            console.log(`✅ ${feature.name} implemented`);
            passedChecks++;
        } else {
            console.log(`❌ ${feature.name} missing`);
            failedChecks++;
            issues.push(`Missing feature in subcomponent-detail.html: ${feature.name}`);
        }
    });
} else {
    console.log('❌ subcomponent-detail.html not found!');
    failedChecks++;
    issues.push('Critical: subcomponent-detail.html missing');
}

// Check for old block files that might be served instead
console.log('\n⚠️  CHECKING FOR ROUTING ISSUES...\n');
const oldBlockFiles = [];
blocks.forEach(block => {
    block.subcomponents.forEach((sub, index) => {
        const oldFile = `block-${block.id}-${index + 1}.html`;
        if (fs.existsSync(oldFile)) {
            const content = fs.readFileSync(oldFile, 'utf8');
            // Check if it's using old structure
            if (!content.includes('enhanced-education-display.js')) {
                oldBlockFiles.push(oldFile);
                console.log(`⚠️  ${oldFile} using old structure`);
            }
        }
    });
});

if (oldBlockFiles.length > 0) {
    issues.push(`${oldBlockFiles.length} block files using old structure - may cause routing issues`);
}

// Check server routing
console.log('\n🌐 CHECKING SERVER ROUTING...\n');
const serverPath = 'server.js';
if (fs.existsSync(serverPath)) {
    const serverContent = fs.readFileSync(serverPath, 'utf8');
    
    // Check if server properly routes to subcomponent-detail.html
    if (serverContent.includes('/subcomponent-detail.html')) {
        console.log('✅ Server has subcomponent-detail.html route');
        passedChecks++;
    } else {
        console.log('❌ Server missing subcomponent-detail.html route');
        failedChecks++;
        issues.push('Server may not properly route to subcomponent-detail.html');
    }
    totalChecks++;
}

// Generate summary report
console.log('\n╔════════════════════════════════════════════════════════════════════╗');
console.log('║                         VERIFICATION SUMMARY                       ║');
console.log('╚════════════════════════════════════════════════════════════════════╝\n');

console.log(`📊 Total Checks: ${totalChecks}`);
console.log(`✅ Passed: ${passedChecks} (${Math.round(passedChecks/totalChecks*100)}%)`);
console.log(`❌ Failed: ${failedChecks} (${Math.round(failedChecks/totalChecks*100)}%)`);

if (duplicateContent.length > 0) {
    console.log(`\n⚠️  DUPLICATE CONTENT DETECTED:`);
    duplicateContent.forEach(dup => console.log(`   - ${dup}`));
}

if (oldBlockFiles.length > 0) {
    console.log(`\n⚠️  OLD STRUCTURE FILES (${oldBlockFiles.length} files):`);
    console.log('   These files may override the enhanced subcomponent-detail.html');
    oldBlockFiles.slice(0, 5).forEach(file => console.log(`   - ${file}`));
    if (oldBlockFiles.length > 5) {
        console.log(`   ... and ${oldBlockFiles.length - 5} more`);
    }
}

if (issues.length > 0) {
    console.log('\n❌ CRITICAL ISSUES TO FIX:');
    issues.forEach((issue, index) => {
        console.log(`${index + 1}. ${issue}`);
    });
}

// Recommendations
console.log('\n📋 RECOMMENDATIONS:');
console.log('1. Ensure all URLs use format: subcomponent-detail.html?id=X-Y');
console.log('2. Remove or update old block-X-Y.html files to prevent routing conflicts');
console.log('3. Clear browser cache and restart server after fixes');
console.log('4. Test each block to verify enhanced features are working');

// Export results for further processing
const results = {
    totalChecks,
    passedChecks,
    failedChecks,
    issues,
    duplicateContent,
    oldBlockFiles,
    timestamp: new Date().toISOString()
};

fs.writeFileSync('verification-results.json', JSON.stringify(results, null, 2));
console.log('\n✅ Full results saved to verification-results.json');
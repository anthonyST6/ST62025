/**
 * DEEP FIX: Update question text and hints to match domains
 * The previous fix only changed domain names but left question text wrong
 */

const fs = require('fs');
const { SUBCOMPONENT_NAMES } = require('./subcomponent-names-mapping.js');
const agentQuestions = require('./agent-generated-questions-complete.js');

console.log('🔧 DEEP FIX: Updating question text and hints to match domains\n');

const deepFixedQuestions = {};
let questionsUpdated = 0;

for (const [id, questionSet] of Object.entries(agentQuestions)) {
    const subName = SUBCOMPONENT_NAMES[id];
    const domain = questionSet.domain;
    
    // Update each question's text and hint to reference the correct domain
    const updatedQuestions = questionSet.questions.map(q => {
        let updated = { ...q };
        let changed = false;
        
        // Update question text if it references wrong topic
        if (q.text && !q.text.toLowerCase().includes(domain.toLowerCase())) {
            // Replace references to old topics with correct domain
            updated.text = q.text
                .replace(/success metrics/gi, domain)
                .replace(/resource allocation/gi, domain)
                .replace(/risk assessment/gi, domain)
                .replace(/timeline planning/gi, domain)
                .replace(/mvp definition/gi, domain)
                .replace(/feature prioritization/gi, domain)
                .replace(/testing strategy/gi, domain)
                .replace(/feedback loops/gi, domain)
                .replace(/iteration planning/gi, domain)
                .replace(/launch strategy/gi, domain)
                .replace(/case study development/gi, domain)
                .replace(/messaging framework/gi, domain)
                .replace(/channel strategy/gi, domain)
                .replace(/pricing model/gi, domain)
                .replace(/sales enablement/gi, domain)
                .replace(/launch planning/gi, domain)
                .replace(/acquisition strategy/gi, domain)
                .replace(/activation process/gi, domain)
                .replace(/retention programs/gi, domain)
                .replace(/referral systems/gi, domain)
                .replace(/revenue optimization/gi, domain)
                .replace(/engagement metrics/gi, domain)
                .replace(/kpi framework/gi, domain)
                .replace(/data collection/gi, domain)
                .replace(/analytics setup/gi, domain)
                .replace(/impact metrics/gi, domain)
                .replace(/roi calculation/gi, domain)
                .replace(/reporting systems/gi, domain)
                .replace(/success planning/gi, domain)
                .replace(/onboarding process/gi, domain)
                .replace(/support systems/gi, domain)
                .replace(/upsell strategy/gi, domain)
                .replace(/renewal process/gi, domain)
                .replace(/advocacy programs/gi, domain)
                .replace(/pilot programs/gi, domain)
                .replace(/case studies/gi, domain)
                .replace(/reference customers/gi, domain)
                .replace(/success stories/gi, domain)
                .replace(/roi documentation/gi, domain)
                .replace(/market validation/gi, domain)
                .replace(/playbook development/gi, domain)
                .replace(/tool implementation/gi, domain)
                .replace(/performance tracking/gi, domain)
                .replace(/incentive design/gi, domain)
                .replace(/team scaling/gi, domain)
                .replace(/team structure/gi, domain)
                .replace(/hiring process/gi, domain)
                .replace(/culture building/gi, domain)
                .replace(/performance management/gi, domain)
                .replace(/development programs/gi, domain)
                .replace(/leadership pipeline/gi, domain)
                .replace(/churn analysis/gi, domain)
                .replace(/retention strategies/gi, domain)
                .replace(/customer health/gi, domain)
                .replace(/engagement programs/gi, domain)
                .replace(/win-back campaigns/gi, domain)
                .replace(/loyalty programs/gi, domain)
                .replace(/competitive analysis/gi, domain)
                .replace(/market positioning/gi, domain)
                .replace(/category creation/gi, domain)
                .replace(/thought leadership/gi, domain)
                .replace(/strategic partnerships/gi, domain)
                .replace(/market expansion/gi, domain)
                .replace(/process optimization/gi, domain)
                .replace(/technology stack/gi, domain)
                .replace(/automation systems/gi, domain)
                .replace(/quality control/gi, domain)
                .replace(/supply chain/gi, domain)
                .replace(/risk management/gi, domain)
                .replace(/executive development/gi, domain)
                .replace(/board relations/gi, domain)
                .replace(/leadership training/gi, domain)
                .replace(/vision alignment/gi, domain)
                .replace(/strategic planning/gi, domain)
                .replace(/entry strategy/gi, domain)
                .replace(/localization/gi, domain)
                .replace(/global partnerships/gi, domain)
                .replace(/regulatory compliance/gi, domain)
                .replace(/global operations/gi, domain);
            changed = true;
        }
        
        // Update hint if it references wrong topic
        if (q.hint && !q.hint.toLowerCase().includes(domain.toLowerCase())) {
            updated.hint = q.hint
                .replace(/Success Metrics/g, domain)
                .replace(/Resource Allocation/g, domain)
                .replace(/Risk Assessment/g, domain)
                .replace(/Timeline Planning/g, domain)
                .replace(/MVP Definition/g, domain)
                .replace(/Feature Prioritization/g, domain)
                .replace(/Testing Strategy/g, domain)
                .replace(/Feedback Loops/g, domain)
                .replace(/Iteration Planning/g, domain)
                .replace(/Launch Strategy/g, domain)
                .replace(/Case Study Development/g, domain)
                .replace(/Messaging Framework/g, domain)
                .replace(/Channel Strategy/g, domain)
                .replace(/Pricing Model/g, domain)
                .replace(/Sales Enablement/g, domain)
                .replace(/Launch Planning/g, domain)
                .replace(/Acquisition Strategy/g, domain)
                .replace(/Activation Process/g, domain)
                .replace(/Retention Programs/g, domain)
                .replace(/Referral Systems/g, domain)
                .replace(/Revenue Optimization/g, domain)
                .replace(/Engagement Metrics/g, domain)
                .replace(/KPI Framework/g, domain)
                .replace(/Data Collection/g, domain)
                .replace(/Analytics Setup/g, domain)
                .replace(/Impact Metrics/g, domain)
                .replace(/ROI Calculation/g, domain)
                .replace(/Reporting Systems/g, domain)
                .replace(/Success Planning/g, domain)
                .replace(/Onboarding Process/g, domain)
                .replace(/Support Systems/g, domain)
                .replace(/Upsell Strategy/g, domain)
                .replace(/Renewal Process/g, domain)
                .replace(/Advocacy Programs/g, domain)
                .replace(/Pilot Programs/g, domain)
                .replace(/Case Studies/g, domain)
                .replace(/Reference Customers/g, domain)
                .replace(/Success Stories/g, domain)
                .replace(/ROI Documentation/g, domain)
                .replace(/Market Validation/g, domain)
                .replace(/Playbook Development/g, domain)
                .replace(/Tool Implementation/g, domain)
                .replace(/Performance Tracking/g, domain)
                .replace(/Incentive Design/g, domain)
                .replace(/Team Scaling/g, domain)
                .replace(/Team Structure/g, domain)
                .replace(/Hiring Process/g, domain)
                .replace(/Culture Building/g, domain)
                .replace(/Performance Management/g, domain)
                .replace(/Development Programs/g, domain)
                .replace(/Leadership Pipeline/g, domain)
                .replace(/Churn Analysis/g, domain)
                .replace(/Retention Strategies/g, domain)
                .replace(/Customer Health/g, domain)
                .replace(/Engagement Programs/g, domain)
                .replace(/Win-back Campaigns/g, domain)
                .replace(/Loyalty Programs/g, domain)
                .replace(/Competitive Analysis/g, domain)
                .replace(/Market Positioning/g, domain)
                .replace(/Category Creation/g, domain)
                .replace(/Thought Leadership/g, domain)
                .replace(/Strategic Partnerships/g, domain)
                .replace(/Market Expansion/g, domain)
                .replace(/Process Optimization/g, domain)
                .replace(/Technology Stack/g, domain)
                .replace(/Automation Systems/g, domain)
                .replace(/Quality Control/g, domain)
                .replace(/Supply Chain/g, domain)
                .replace(/Risk Management/g, domain)
                .replace(/Executive Development/g, domain)
                .replace(/Board Relations/g, domain)
                .replace(/Leadership Training/g, domain)
                .replace(/Vision Alignment/g, domain)
                .replace(/Strategic Planning/g, domain)
                .replace(/Entry Strategy/g, domain)
                .replace(/Localization/g, domain)
                .replace(/Global Partnerships/g, domain)
                .replace(/Regulatory Compliance/g, domain)
                .replace(/Global Operations/g, domain);
            changed = true;
        }
        
        if (changed) {
            questionsUpdated++;
        }
        
        return updated;
    });
    
    deepFixedQuestions[id] = {
        domain: domain,
        questions: updatedQuestions
    };
}

console.log(`✅ Deep fix complete: ${questionsUpdated} questions updated\n`);

// Write the deeply fixed file
const fileContent = `/**
 * Complete Agent-Generated Questions Library
 * DEEP FIX VERSION - Domains AND question content aligned
 * Generated: ${new Date().toISOString()}
 * Fixed: Question text and hints to match correct domains
 */

const agentGeneratedQuestions = ${JSON.stringify(deepFixedQuestions, null, 2)};

// Export for use in the application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = agentGeneratedQuestions;
} else {
    window.agentGeneratedQuestions = agentGeneratedQuestions;
}
`;

fs.writeFileSync('./agent-generated-questions-complete.js', fileContent);
console.log('✅ File updated: agent-generated-questions-complete.js');
console.log('\n🎉 DEEP FIX COMPLETE!');
console.log('   Question text and hints now match domain names');
console.log('\n⚠️  IMPORTANT: Restart server to pick up changes');
console.log('   1. Stop server (Ctrl+C)');
console.log('   2. Run: node server-with-backend.js');
console.log('   3. Test: http://localhost:3001/subcomponent-detail.html?id=3-5\n');
// Fix for block-detail.html routing to use actual HTML files instead of dynamic routing

// Mapping of subBlock.id to actual HTML files
const subcomponentFileMap = {
    // Block 1 - Mission Discovery
    '1-1': 'subcomponent-1a-problem-statement.html',
    '1-2': 'subcomponent-1b-mission-statement.html',
    '1-3': 'subcomponent-1c-voice-of-customer.html',
    '1-4': 'subcomponent-1d-team-assessment.html',
    '1-5': 'subcomponent-1e-market-landscape.html',
    '1-6': 'subcomponent-1f-launch-readiness.html',
    
    // Block 2 - Customer Insights
    '2-1': 'subcomponent-2a-interview-cadence.html',
    '2-2': 'subcomponent-2b-persona-development.html',
    '2-3': 'subcomponent-2c-pain-point-analysis.html',
    '2-4': 'subcomponent-2d-jobs-to-be-done.html',
    '2-5': 'subcomponent-2e-demand-signals.html',
    '2-6': 'subcomponent-2f-insight-loop.html',
    
    // Block 3 - Strategic Prioritization
    '3-1': 'subcomponent-3a-use-case-prioritization.html',
    '3-2': 'subcomponent-3b-segment-tiering.html',
    '3-3': 'subcomponent-3c-prioritization-framework.html',
    '3-4': 'subcomponent-3d-strategic-tradeoffs.html',
    '3-5': 'subcomponent-3e-hypothesis-testing.html',
    '3-6': 'subcomponent-3f-decision-archive.html',
    
    // Block 4 - Prototype Launch
    '4-1': 'subcomponent-4a-feature-matrix.html',
    '4-2': 'subcomponent-4b-technical-scope.html',
    '4-3': 'subcomponent-4c-pilot-group-selection.html',
    '4-4': 'subcomponent-4d-qa-standards.html',
    '4-5': 'subcomponent-4e-timeline-planning.html',
    '4-6': 'subcomponent-4f-post-mortem-analysis.html',
    
    // Block 5 - Early Adopter Wins
    '5-1': 'subcomponent-5a-early-win-documentation.html',
    '5-2': 'subcomponent-5b-roi-calculation.html',
    '5-3': 'subcomponent-5c-use-case-success.html',
    '5-4': 'subcomponent-5d-testimonial-collection.html',
    '5-5': 'subcomponent-5e-win-criteria-mapping.html',
    '5-6': 'subcomponent-5f-deal-debrief.html',
    
    // Block 6 - Customer Engagement Flywheel
    '6-1': 'subcomponent-6a-usage-analytics.html',
    '6-2': 'subcomponent-6b-milestone-tracking.html',
    '6-3': 'subcomponent-6c-cs-dashboard-design.html',
    '6-4': 'subcomponent-6d-customer-activation.html',
    '6-5': 'subcomponent-6e-feedback-collection.html',
    '6-6': 'subcomponent-6f-power-user-development.html',
    
    // Block 7 - Quantifiable Impact
    '7-1': 'subcomponent-7a-time-cost-savings.html',
    '7-2': 'subcomponent-7b-revenue-impact.html',
    '7-3': 'subcomponent-7c-productivity-measurement.html',
    '7-4': 'subcomponent-7d-retention-analysis.html',
    '7-5': 'subcomponent-7e-system-consolidation.html',
    '7-6': 'subcomponent-7f-friction-analysis.html',
    
    // Block 8 - Customer Success Expansion
    '8-1': 'subcomponent-8a-upsell-strategy.html',
    '8-2': 'subcomponent-8b-team-expansion-tracking.html',
    '8-3': 'subcomponent-8c-organic-growth-analysis.html',
    '8-4': 'subcomponent-8d-champion-development.html',
    '8-5': 'subcomponent-8e-sentiment-tracking.html',
    '8-6': 'subcomponent-8f-renewal-readiness.html',
    
    // Block 9 - Proof of Execution
    '9-1': 'subcomponent-9a-inbound-conversion.html',
    '9-2': 'subcomponent-9b-outbound-performance.html',
    '9-3': 'subcomponent-9c-channel-economics.html',
    '9-4': 'subcomponent-9d-discovery-call-excellence.html',
    '9-5': 'subcomponent-9e-demo-optimization.html',
    '9-6': 'subcomponent-9f-founder-sales-analysis.html',
    
    // Block 10 - Sales Team Empowerment
    '10-1': 'subcomponent-10a-sales-enablement-assets.html',
    '10-2': 'subcomponent-10b-rep-onboarding-ramp.html',
    '10-3': 'subcomponent-10c-win-loss-analysis.html',
    '10-4': 'subcomponent-10d-objection-handling.html',
    '10-5': 'subcomponent-10e-icp-definition.html',
    '10-6': 'subcomponent-10f-sales-call-library.html',
    
    // Block 11 - High Performance Teams
    '11-1': 'subcomponent-11a-performance-scorecard.html',
    '11-2': 'subcomponent-11b-quota-structure.html',
    '11-3': 'subcomponent-11c-deal-review-process.html',
    '11-4': 'subcomponent-11d-forecast-accuracy.html',
    '11-5': 'subcomponent-11e-sales-coaching-program.html',
    '11-6': 'subcomponent-11f-talent-gap-analysis.html',
    
    // Block 12 - Retention Systems
    '12-1': 'subcomponent-12a-customer-onboarding.html',
    '12-2': 'subcomponent-12b-activation-tracking.html',
    '12-3': 'subcomponent-12c-success-playbook-development.html',
    '12-4': 'subcomponent-12d-escalation-management.html',
    '12-5': 'subcomponent-12e-renewal-pipeline-management.html',
    '12-6': 'subcomponent-12f-churn-analysis.html',
    
    // Block 13 - Market Domination Strategies
    '13-1': 'subcomponent-13a-category-creation.html',
    '13-2': 'subcomponent-13b-competitive-moat.html',
    '13-3': 'subcomponent-13c-ecosystem-strategy.html',
    '13-4': 'subcomponent-13d-competitive-intelligence.html',
    '13-5': 'subcomponent-13e-brand-strategy.html',
    '13-6': 'subcomponent-13f-defensive-strategy.html',
    
    // Block 14 - Operational Infrastructure
    '14-1': 'subcomponent-14a-system-architecture.html',
    '14-2': 'subcomponent-14b-revenue-operations.html',
    '14-3': 'subcomponent-14c-dashboard-design.html',
    '14-4': 'subcomponent-14d-tool-stack-optimization.html',
    '14-5': 'subcomponent-14e-revops-playbook.html',
    '14-6': 'subcomponent-14f-sla-management.html',
    
    // Block 15 - Leadership Expansion
    '15-1': 'subcomponent-15a-executive-hiring.html',
    '15-2': 'subcomponent-15b-succession-planning.html',
    '15-3': 'subcomponent-15c-executive-cadence.html',
    '15-4': 'subcomponent-15d-culture-health-assessment.html',
    '15-5': 'subcomponent-15e-organizational-design.html',
    '15-6': 'subcomponent-15f-dei-integration.html',
    
    // Block 16 - Global Expansion Opportunities
    '16-1': 'subcomponent-16a-market-entry-analysis.html',
    '16-2': 'subcomponent-16b-localization-strategy.html',
    '16-3': 'subcomponent-16c-international-pricing.html',
    '16-4': 'subcomponent-16d-compliance-management.html',
    '16-5': 'subcomponent-16e-geographic-gtm-strategy.html',
    '16-6': 'subcomponent-16f-expansion-risk-assessment.html'
};

// Function to get the correct HTML file for a subcomponent ID
function getSubcomponentFile(id) {
    return subcomponentFileMap[id] || `subcomponent-detail.html?id=${id}`;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { subcomponentFileMap, getSubcomponentFile };
}

console.log('Subcomponent routing fix loaded. Total mappings:', Object.keys(subcomponentFileMap).length);
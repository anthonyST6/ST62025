/**
 * Add missing subcomponents 10-1 and 15-1 with customized demo data
 */

const missingData = {
  // Block 10-1: Sales Enablement (65-75% maturity)
  "10-1": {
    "10-1-q1": "Sales enablement framework provides comprehensive support through training programs, content libraries, competitive intelligence, and tool optimization. We maintain 234 sales assets with 78% utilization rate. Current challenges include content freshness (34% outdated), inconsistent tool adoption, and limited role-specific enablement paths.",
    "10-1-q2": "Enablement metrics: 234 total sales assets, 78% asset utilization rate, 4.2/5 rep satisfaction score, 34% of content outdated. Training completion: 67% of reps certified. Tool adoption: CRM 89%, sales engagement 72%, competitive intel 56%. Time to productivity: 90 days for new reps. Quota attainment correlation: 0.67 with enablement engagement.",
    "10-1-q3": "Sales enablement aligns with go-to-market strategy through targeted content creation, skill development programs, and performance optimization. Marketing provides product messaging and competitive positioning. Product shares roadmap updates and feature training. Customer success contributes win stories and use cases. Leadership sets enablement priorities based on business objectives.",
    "10-1-q4": "Enablement effectiveness validation: Enabled reps achieve 127% of quota vs 94% for non-enabled, win rates 34% higher with proper enablement tools, and sales cycle 23% shorter when using recommended assets. Rep feedback confirms value of battle cards and case studies. Customer feedback shows improved sales conversations. ROI analysis shows 5.2:1 return on enablement investment.",
    "10-1-q5": "Enablement optimization initiatives: implementing just-in-time learning platform, creating AI-powered content recommendations, developing persona-based selling guides, and building competitive simulation training. Testing virtual reality product demos and planning gamified learning paths for continuous skill development.",
    "10-1-q6": "Future enablement roadmap: launching sales enablement platform consolidation, creating buyer enablement portal, developing account-based selling certification, and building predictive coaching system. Planning enablement analytics dashboard and automated content effectiveness tracking. Exploring peer learning networks and external expert coaching programs."
  },

  // Block 15-1: Leadership & Governance (50-60% maturity)
  "15-1": {
    "15-1-q1": "Leadership structure consists of founding team plus key hires across functions, but we lack experienced executives in critical areas like sales and customer success. Current leadership team: CEO, CTO, VP Product, Director of Marketing. Governance is informal with monthly leadership meetings and quarterly board updates. Challenge: balancing founder control with professional management needs.",
    "15-1-q2": "Leadership metrics: 5 senior leaders, 2.3 years average tenure, 60% with prior startup experience, 40% with enterprise background. Leadership effectiveness: 3.2/5 team rating. Succession planning: None formal. Leadership development: Ad hoc mentoring only. Board composition: 3 founders, 2 investors. Decision velocity: 4.5 days for strategic decisions.",
    "15-1-q3": "Leadership alignment happens through weekly leadership team meetings, monthly all-hands, and quarterly planning sessions. OKRs cascade from company to team level with 70% alignment score. Communication flows through Slack, email, and documented decisions. Cross-functional collaboration varies by relationship. Strategic initiatives tracked in shared dashboard.",
    "15-1-q4": "Leadership effectiveness indicators: 67% of strategic initiatives on track, employee confidence in leadership at 3.4/5, and 23% voluntary turnover (above 15% target). Board satisfaction with management: 3.8/5. Customer feedback on company direction positive. Investor confidence reflected in recent funding round. However, execution gaps visible in missed targets.",
    "15-1-q5": "Leadership development plans: recruiting experienced VP Sales and Chief Customer Officer, implementing formal leadership training program, establishing mentorship relationships with advisors, and creating succession planning framework. Testing executive coaching for founders and planning leadership 360 feedback process.",
    "15-1-q6": "Governance evolution roadmap: establishing formal board committees (audit, compensation), recruiting independent board members with domain expertise, implementing enterprise risk management framework, and developing formal decision rights matrix. Planning governance audit and potential advisory board creation for industry expertise."
  }
};

// Export the missing data
if (typeof module !== 'undefined' && module.exports) {
  module.exports = missingData;
}
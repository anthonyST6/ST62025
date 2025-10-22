/**
 * MOCK API WITH DIMENSION DATA
 * Intercepts API calls and returns mock data with all 5 dimensions
 * This enables testing the systematic Executive Summary without a backend
 */

(function() {
    'use strict';
    console.log('🔧 Mock API with Dimensions Loading...');
    
    // Mock data with all 5 dimensions
    const mockAnalysisData = {
        score: 84,
        overallScore: 84,
        agentName: "Problem Definition Evaluator",
        timestamp: new Date().toISOString(),
        dimensionScores: [
            {
                dimension: "Feature Definition",
                name: "Feature Definition",
                score: 87,
                weight: 20,
                feedback: "Feature Definition is performing at an exceptional level (87%). Workspace evidence references metrics like 89%. Maintain the operating definition and keep metrics current for repeatability. Evidence sample: \"Onboarding methodology follows 14-day sprint with defined milestones, success criteria, and stakeholder checkpoints. We achieve 89% activation rate within first month through guide...\"",
                strengths: [
                    "Quantified performance with 89% provides objective baseline for improvement and benchmarking.",
                    "Standardized approach with documented processes enables consistent execution and knowledge transfer.",
                    "Strong feature definition foundation creates platform for scaling excellence across the organization."
                ],
                improvements: [
                    "Establish a weekly review cadence with a one-page dashboard for feature definition progress.",
                    "Assign a single-threaded owner (Owner) for feature definition to drive accountability.",
                    "Operationalize best practices at scale: document, train, and audit quarterly."
                ]
            },
            {
                dimension: "Value Scoring",
                name: "Value Scoring",
                score: 80,
                weight: 20,
                feedback: "Solid foundation in value scoring (80%) with consistent qualitative detail. Focus on standardization and comparability across accounts to reach excellence. Reference: \"Onboarding sets foundation for long-term success. Success team owns process with support from sales handoff. Product provides in-app guidance and setup wizards. Marketing delivers ...\"",
                strengths: [
                    "Strong value scoring foundation creates platform for scaling excellence across the organization."
                ],
                improvements: [
                    "Instrument 2–3 KPIs for value scoring (%, counts). Establish baseline within 2 weeks and set +15% 90-day target.",
                    "Publish a rubric/SOP for value scoring with clear definitions and gates; socialize org-wide and attach to workflows.",
                    "Add analytics instrumentation (e.g., Looker/Tableau) with auto-updated dashboards.",
                    "Operationalize best practices at scale: document, train, and audit quarterly."
                ]
            },
            {
                dimension: "Effort Estimation",
                name: "Effort Estimation",
                score: 80,
                weight: 20,
                feedback: "Solid foundation in effort estimation (80%) with signals like 22%. Focus on standardization and comparability across accounts to reach excellence. Reference: \"Onboarding sophistication: personalized paths vs one-size-fits-all, milestone-based vs time-based, and success criteria tracked vs completion only. Competitors average 21-day onboa...\"",
                strengths: [
                    "Quantified performance with 22% provides objective baseline for improvement and benchmarking.",
                    "Standardized approach with documented processes enables consistent execution and knowledge transfer.",
                    "Strong effort estimation foundation creates platform for scaling excellence across the organization."
                ],
                improvements: [
                    "Establish a weekly review cadence with a one-page dashboard for effort estimation progress.",
                    "Assign a single-threaded owner (Owner) for effort estimation to drive accountability.",
                    "Add analytics instrumentation (e.g., Looker/Tableau) with auto-updated dashboards.",
                    "Operationalize best practices at scale: document, train, and audit quarterly."
                ]
            },
            {
                dimension: "Dependency Mapping",
                name: "Dependency Mapping",
                score: 83,
                weight: 20,
                feedback: "Solid foundation in dependency mapping (83%) with signals like 89%. Focus on standardization and comparability across accounts to reach excellence. Reference: \"Onboarding metrics: 89% activation rate within 30 days, 14-day average time-to-first-value, 4.6/5 onboarding satisfaction, 92% complete core setup. Touchpoints: 3 calls, 5 emails, ...\"",
                strengths: [
                    "Quantified performance with 89% provides objective baseline for improvement and benchmarking.",
                    "Strong dependency mapping foundation creates platform for scaling excellence across the organization."
                ],
                improvements: [
                    "Publish a rubric/SOP for dependency mapping with clear definitions and gates; socialize org-wide and attach to workflows.",
                    "Establish a weekly review cadence with a one-page dashboard for dependency mapping progress.",
                    "Assign a single-threaded owner (Owner) for dependency mapping to drive accountability.",
                    "Add analytics instrumentation (e.g., Looker/Tableau) with auto-updated dashboards."
                ]
            },
            {
                dimension: "Roadmap Alignment",
                name: "Roadmap Alignment",
                score: 81,
                weight: 20,
                feedback: "Solid foundation in roadmap alignment (81%) with signals like 89%. Focus on standardization and comparability across accounts to reach excellence. Reference: \"Onboarding effectiveness: 89% activation vs 67% industry average, customers completing onboarding show 94% 6-month retention, and time-to-value decreased 45% with current methodolo...\"",
                strengths: [
                    "Exceptional stakeholder alignment enables 2-3x faster execution through reduced friction and rework."
                ],
                improvements: [
                    "Publish a rubric/SOP for roadmap alignment with clear definitions and gates; socialize org-wide and attach to workflows.",
                    "Establish a weekly review cadence with a one-page dashboard for roadmap alignment progress.",
                    "Assign a single-threaded owner (Owner) for roadmap alignment to drive accountability.",
                    "Add analytics instrumentation (e.g., Looker/Tableau) with auto-updated dashboards."
                ]
            }
        ]
    };
    
    // Intercept fetch calls
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
        const url = args[0];
        
        // Intercept POST /api/analysis
        if (typeof url === 'string' && url.includes('/api/analysis')) {
            console.log('🎯 Mock API: Intercepting analysis request');
            return Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve(mockAnalysisData)
            });
        }
        
        // Pass through all other requests
        return originalFetch.apply(this, args);
    };
    
    console.log('✅ Mock API with Dimensions Ready!');
    console.log('📊 Will return 84% score with 5 dimensions when analysis is triggered');
})();
// SYSTEMIC FIX: Show correct templates for each subcomponent in Resources and Output tabs
(function() {
    'use strict';

    console.log('🎯 Loading correct templates for each subcomponent');

    // Complete template mapping for all 96 subcomponents
    const TEMPLATE_MAPPING = {
        "1-1": ["Problem Statement Canvas", "Customer Pain Interview Guide", "Problem Validation Scorecard"],
        "1-2": ["Mission Statement Builder", "Vision-Mission-Values Framework", "Strategic Narrative Template"],
        "1-3": ["Customer Interview Script", "Insight Synthesis Canvas", "Voice of Customer Database"],
        "1-4": ["Founding Team Scorecard", "Skills Gap Analysis", "Advisor Recruitment Plan"],
        "1-5": ["Market Sizing Calculator", "Competitive Matrix Template", "Positioning Quadrant Builder"],
        "1-6": ["MVP Planning Canvas", "Prototype Test Protocol", "Launch Readiness Checklist"],
        "2-1": ["Interview Schedule Template", "Question Bank by Stage", "Insight Synthesis Framework"],
        "2-2": ["Persona Canvas Template", "Buyer Journey Map", "Persona Interview Guide"],
        "2-3": ["Pain Point Matrix Template", "Customer Journey Map", "Pain-to-Feature Mapping"],
        "2-4": ["JTBD Interview Script", "Job Story Template", "Outcome Mapping Framework"],
        "2-5": ["Signal Scoring Rubric", "Feedback Prioritization Matrix", "Signal Tracking Dashboard"],
        "2-6": ["Insight Action Plan", "Decision Log Template", "Impact Tracking Sheet"],
        "3-1": ["Use Case Scoring Matrix", "Market Opportunity Calculator", "Feasibility Assessment"],
        "3-2": ["Segment Scoring Card", "ICP Definition Framework", "Tiering Decision Matrix"],
        "3-3": ["Resource Allocation Matrix", "Priority Scoring Framework", "Strategic Initiative Tracker"],
        "3-4": ["Competitive Positioning Canvas", "Differentiation Strategy Map", "Competitive Response Playbook"],
        "3-5": ["Risk Assessment Matrix", "Mitigation Strategy Framework", "Risk Monitoring Dashboard"],
        "3-6": ["Opportunity Evaluation Scorecard", "Market Timing Analysis", "Go/No-Go Decision Framework"],
        "4-1": ["Feature Prioritization Matrix", "MVP Scoping Canvas", "MoSCoW Analysis Template"],
        "4-2": ["Technical Roadmap Template", "Sprint Planning Board", "Architecture Decision Record"],
        "4-3": ["Pilot User Agreement", "Screening Questionnaire", "Feedback Collection Plan"],
        "4-4": ["QA Test Plan", "Success Criteria Checklist", "Bug Tracking Template"],
        "4-5": ["Gantt Chart Template", "Agile Roadmap Canvas", "Milestone Tracker"],
        "4-6": ["Post-Mortem Agenda", "Learning Canvas", "Decision Log Template"],
        "5-1": ["Case Study Interview Script", "Case Study Template", "ROI Calculator Framework"],
        "5-2": ["ROI Calculator Spreadsheet", "Value Realization Framework", "Business Case Template"],
        "5-3": ["Referral Program Framework", "Customer Advocacy Playbook", "Reference Customer Agreement"],
        "5-4": ["Testimonial Collection Guide", "Social Proof Library", "Success Story Template"],
        "5-5": ["Pilot Program Structure", "Beta Testing Agreement", "Early Adopter Onboarding Kit"],
        "5-6": ["Feedback Loop Framework", "Product Council Charter", "Feature Request Tracker"],
        "6-1": ["Feature Usage Matrix", "User Journey Heatmap", "Engagement Dashboard"],
        "6-2": ["Milestone Definition Framework", "Trigger Tracking Dashboard", "Intervention Playbook"],
        "6-3": ["Engagement Scoring Model", "User Behavior Tracker", "Activation Metrics Dashboard"],
        "6-4": ["Retention Strategy Guide", "Churn Prevention Playbook", "Customer Success Plan"],
        "6-5": ["Feature Adoption Dashboard", "User Journey Map", "Adoption Funnel Analysis"],
        "6-6": ["Feedback Collection Framework", "Voice of Customer Report", "Product Roadmap Input Matrix"],
        "7-1": ["ROI Calculator", "Time Study Template", "Cost-Benefit Analysis"],
        "7-2": ["Productivity Measurement Guide", "Before/After Analysis", "Impact Assessment Framework"],
        "7-3": ["Outcome Definition Worksheet", "Success Metrics Dashboard", "Quarterly Business Review Template"],
        "7-4": ["Benchmark Report Template", "Competitive Analysis Matrix", "Performance Comparison Dashboard"],
        "7-5": ["Attribution Model Framework", "Journey Mapping Template", "Feature Impact Analysis"],
        "7-6": ["Executive Dashboard Mockup", "KPI Selection Framework", "Dashboard Design Guide"],
        "8-1": ["Onboarding Checklist", "Welcome Email Sequence", "Success Plan Template"],
        "8-2": ["Health Score Calculator", "Risk Assessment Matrix", "Intervention Playbook"],
        "8-3": ["Expansion Opportunity Scorecard", "Upsell Talk Track", "Upgrade Proposal Template"],
        "8-4": ["Ticket Classification Guide", "Support Metrics Dashboard", "Root Cause Analysis Template"],
        "8-5": ["KB Article Template", "Content Audit Checklist", "Information Architecture Map"],
        "8-6": ["Renewal Forecast Model", "Account Review Template", "Save Plan Playbook"],
        "9-1": ["Conversion Tracking Sheet", "A/B Test Framework", "Funnel Analysis Template"],
        "9-2": ["Outbound Sequence Template", "Cold Email Scripts", "Objection Handling Matrix"],
        "9-3": ["Channel Performance Dashboard", "CAC by Channel Report", "Channel Mix Model"],
        "9-4": ["Sales Velocity Calculator", "Pipeline Velocity Dashboard", "Deal Progression Tracker"],
        "9-5": ["Win Rate Dashboard", "Competitive Win/Loss Matrix", "Deal Analysis Framework"],
        "9-6": ["Pipeline Coverage Calculator", "Coverage Ratio Dashboard", "Pipeline Generation Plan"],
        "10-1": ["Sales Candidate Scorecard", "Interview Question Bank", "Reference Check Guide"],
        "10-2": ["Discovery Call Script", "Qualification Scorecard", "Call Preparation Checklist"],
        "10-3": ["Demo Script Template", "Demo Preparation Guide", "Follow-up Email Templates"],
        "10-4": ["Objection Handling Guide", "Battle Card Template", "Win/Loss Analysis Form"],
        "10-5": ["Comp Plan Calculator", "Commission Agreement", "Quota Setting Framework"],
        "10-6": ["Pipeline Review Agenda", "Deal Inspection Checklist", "Forecast Call Script"],
        "11-1": ["Org Chart Template", "RACI Matrix", "Team Charter Document"],
        "11-2": ["OKR Planning Template", "Performance Review Form", "KPI Dashboard"],
        "11-3": ["Culture Deck Template", "Values Definition Workshop", "Behavior Interview Guide"],
        "11-4": ["Leadership Competency Model", "Development Plan Template", "360 Review Framework"],
        "11-5": ["Communication Charter", "Meeting Agenda Templates", "Status Report Format"],
        "11-6": ["Retention Risk Assessment", "Stay Interview Guide", "Compensation Benchmarking Tool"],
        "12-1": ["Churn Analysis Worksheet", "Risk Scoring Rubric", "Intervention Playbook"],
        "12-2": ["Win-Back Email Sequence", "Offer Strategy Matrix", "Campaign Tracking Sheet"],
        "12-3": ["Loyalty Program Framework", "Tier Structure Calculator", "Rewards Catalog"],
        "12-4": ["Pricing Analysis Worksheet", "Van Westendorp Survey", "Pricing Committee Deck"],
        "12-5": ["CAB Charter Template", "Member Invitation Letter", "Meeting Agenda Framework"],
        "12-6": ["Engagement Scoring Model", "Segmentation Framework", "Automated Playbooks"],
        "13-1": ["Category Design Canvas", "Point of View Document", "Category Manifesto Template"],
        "13-2": ["Moat Assessment Framework", "Competitive Defensibility Map", "Moat Investment Plan"],
        "13-3": ["Ecosystem Development Plan", "Platform Strategy Canvas", "Network Effects Calculator"],
        "13-4": ["M&A Target Evaluation Matrix", "Integration Planning Checklist", "Synergy Realization Tracker"],
        "13-5": ["Market Leadership Scorecard", "Thought Leadership Calendar", "Industry Influence Map"],
        "13-6": ["Competitive Intelligence Framework", "Market Share Tracker", "Strategic Response Playbook"],
        "14-1": ["Architecture Diagram Template", "System Documentation Guide", "Integration Checklist"],
        "14-2": ["Revenue Operations Map", "Systems Integration Plan", "GTM Tech Stack Audit"],
        "14-3": ["Process Automation Blueprint", "Workflow Optimization Guide", "Automation ROI Calculator"],
        "14-4": ["Data Architecture Blueprint", "Data Governance Framework", "Analytics Implementation Plan"],
        "14-5": ["Security Policy Template", "Compliance Checklist", "Incident Response Plan"],
        "14-6": ["Scalability Roadmap", "Capacity Planning Model", "Infrastructure Cost Optimizer"],
        "15-1": ["Executive Job Description", "Interview Scorecard", "90-Day Plan Template"],
        "15-2": ["Board Charter", "Board Deck Template", "Director Onboarding Kit"],
        "15-3": ["Succession Planning Grid", "Talent Review Template", "Development Action Plan"],
        "15-4": ["Stakeholder Map", "Alignment Canvas", "Communication Calendar"],
        "15-5": ["Investor Update Template", "Board Report Format", "Data Room Checklist"],
        "15-6": ["Team Assessment Survey", "Team Charter Template", "Conflict Resolution Guide"],
        "16-1": ["Market Entry Canvas", "Localization Checklist", "Partnership Agreement Template"],
        "16-2": ["Localization Requirements Matrix", "Translation Style Guide", "Market Launch Checklist"],
        "16-3": ["Country Launch Checklist", "Global Vendor Matrix", "Compliance Calendar"],
        "16-4": ["Compliance Requirements Matrix", "Risk Assessment Framework", "Audit Preparation Checklist"],
        "16-5": ["Partner Program Guide", "Partnership Agreement Template", "Partner Enablement Kit"],
        "16-6": ["Cultural Assessment Tool", "Adaptation Checklist", "Cross-Cultural Training Guide"]
    };
    
    // Get templates for current subcomponent
    function getTemplatesForCurrentSubcomponent() {
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        const templateNames = TEMPLATE_MAPPING[subcomponentId] || ["Generic Template 1", "Generic Template 2", "Generic Template 3"];
        
        const colors = ['#FF5500', '#9C27B0', '#2196F3'];
        const icons = ['📄', '🎤', '📊'];
        
        return templateNames.map((name, index) => ({
            name: name,
            icon: icons[index % icons.length],
            color: colors[index % colors.length],
            description: `Strategic template for ${subcomponentId}`
        }));
    }

    // Override the enhanceResourcesTabST6 function to use correct templates
    window.enhanceResourcesTabST6 = function() {
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        
        console.log(`🔧 Loading correct templates for Resources tab - Subcomponent ${subcomponentId}`);
        
        const OUTPUT_TEMPLATES = getTemplatesForCurrentSubcomponent();

        const ST6_STYLES = {
            primaryOrange: '#FF5500',
            secondaryOrange: '#FF8800',
            successGreen: '#4CAF50',
            bgDark: 'rgba(0, 0, 0, 0.5)',
            bgLight: 'rgba(255, 255, 255, 0.02)',
            borderLight: 'rgba(255, 255, 255, 0.1)',
            borderOrange: 'rgba(255, 85, 0, 0.3)',
            textLight: '#ffffff',
            textMuted: '#999999',
            textDark: '#cccccc'
        };

        let resourcesContent = document.getElementById('resources-content');
        if (!resourcesContent) {
            resourcesContent = document.getElementById('resource-templates');
        }
        if (!resourcesContent) {
            const resourcesTab = document.getElementById('resources-tab');
            if (resourcesTab) {
                resourcesContent = document.createElement('div');
                resourcesContent.id = 'resources-content';
                resourcesTab.innerHTML = '';
                resourcesTab.appendChild(resourcesContent);
            }
        }
        if (!resourcesContent) return;

        // Get current subcomponent ID
        console.log(`✅ Displaying ${OUTPUT_TEMPLATES.length} templates for subcomponent ${subcomponentId}`);

        let html = `
            <div style="padding: 30px; max-width: 1200px; margin: 0 auto;">
                <h2 style="color: ${ST6_STYLES.primaryOrange}; margin-bottom: 30px; font-size: 28px;">
                    📚 Strategic Output Templates
                </h2>

                <div style="background: ${ST6_STYLES.bgLight};
                            border: 2px solid ${ST6_STYLES.borderOrange};
                            border-radius: 15px;
                            padding: 30px;">

                    <h3 style="color: ${ST6_STYLES.textLight}; margin-bottom: 25px; font-size: 20px;">
                        <span style="color: ${ST6_STYLES.successGreen};">✓</span> Templates Available for Download
                    </h3>

                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px;">
        `;

        OUTPUT_TEMPLATES.forEach((template, index) => {
            html += `
                <div style="
                    background: ${ST6_STYLES.bgDark};
                    border: 1px solid ${ST6_STYLES.borderLight};
                    border-radius: 12px;
                    padding: 20px;
                    transition: all 0.3s ease;"
                 onmouseover="this.style.transform='translateY(-3px)'; this.style.borderColor='${template.color}'; this.style.boxShadow='0 5px 20px rgba(255, 85, 0, 0.2)';"
                 onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='${ST6_STYLES.borderLight}'; this.style.boxShadow='none';">

                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                        <div style="
                            background: linear-gradient(135deg, ${template.color}, ${template.color}88);
                            width: 50px;
                            height: 50px;
                            border-radius: 10px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 24px;
                            box-shadow: 0 5px 15px ${template.color}44;
                        ">
                            ${template.icon}
                        </div>
                        <div style="flex: 1;">
                            <h4 style="color: ${ST6_STYLES.textLight}; margin: 0; font-size: 16px;">
                                ${template.name}
                            </h4>
                            <p style="color: ${ST6_STYLES.textMuted}; margin: 3px 0 0 0; font-size: 12px;">
                                Strategic template
                            </p>
                        </div>
                    </div>

                    <p style="color: ${ST6_STYLES.textDark}; font-size: 14px; line-height: 1.5; margin-bottom: 15px;">
                        ${template.description}
                    </p>

                    <button onclick="window.downloadResourceTemplate('${template.name}')"
                            style="width: 100%;
                                   background: linear-gradient(135deg, ${template.color}, ${template.color}CC);
                                   color: white;
                                   border: none;
                                   padding: 12px;
                                   border-radius: 8px;
                                   font-size: 14px;
                                   font-weight: 600;
                                   cursor: pointer;
                                   transition: all 0.3s ease;"
                            onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 5px 15px ${template.color}66';"
                            onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='none';">
                        ⬇️ Download Template
                    </button>
                </div>
            `;
        });

        html += `
                    </div>

                    <div style="
                        background: rgba(76, 175, 80, 0.1);
                        border: 2px solid #4CAF50;
                        border-radius: 10px;
                        padding: 20px;
                        margin-top: 30px;
                        text-align: center;
                    ">
                        <p style="color: #4CAF50; margin: 0; font-size: 16px; font-weight: 600;">
                            💡 Complete the interactive worksheet and run analysis to get these templates populated with your data in the Output tab
                        </p>
                    </div>
                </div>
            </div>
        `;

        resourcesContent.innerHTML = html;
    };

    // Override download function
    window.downloadResourceTemplate = function(templateName) {
        const content = `${templateName}\n\n[Template content will be populated after analysis]\n\nComplete the interactive worksheet and run analysis to get this template filled with your data.`;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${templateName.toLowerCase().replace(/\s+/g, '-')}-template.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        // Show success message
        const successMsg = document.createElement('div');
        successMsg.style.cssText = 'position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, #4CAF50, #66BB6A); color: white; padding: 15px 25px; border-radius: 10px; box-shadow: 0 5px 20px rgba(76, 175, 80, 0.3); z-index: 10000; animation: slideIn 0.3s ease;';
        successMsg.innerHTML = `✅ Template downloaded successfully!`;
        document.body.appendChild(successMsg);

        setTimeout(() => {
            successMsg.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => document.body.removeChild(successMsg), 300);
        }, 3000);
    };

    console.log('✅ Resources tab now shows the same templates as Output tab');
})();

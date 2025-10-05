/**
 * Fix All Block Structure
 * Ensures all 96 blocks have consistent layout and proper agent integration
 */

const fs = require('fs');
const path = require('path');

// Agent mapping
const AGENT_MAPPING = {
    '1-1': 'problem-statement-agent',
    '1-2': 'solution-hypothesis-agent',
    '1-3': 'value-proposition-agent',
    '1-4': 'target-audience-agent',
    '1-5': 'competitive-analysis-agent',
    '1-6': 'unique-differentiator-agent',
    '2-1': 'customer-insight-agent',
    '2-2': 'pain-point-agent',
    '2-3': 'journey-mapping-agent',
    '2-4': 'feedback-loop-agent',
    '2-5': 'persona-development-agent',
    '2-6': 'needs-analysis-agent',
    '3-1': 'strategic-prioritization-agent',
    '3-2': 'resource-allocation-agent',
    '3-3': 'roadmap-planning-agent',
    '3-4': 'milestone-setting-agent',
    '3-5': 'risk-assessment-agent',
    '3-6': 'decision-framework-agent',
    '4-1': 'prototype-development-agent',
    '4-2': 'testing-validation-agent',
    '4-3': 'iteration-refinement-agent',
    '4-4': 'feature-prioritization-agent',
    '4-5': 'technical-feasibility-agent',
    '4-6': 'launch-readiness-agent',
    '5-1': 'market-strategy-agent',
    '5-2': 'channel-optimization-agent',
    '5-3': 'messaging-alignment-agent',
    '5-4': 'campaign-planning-agent',
    '5-5': 'launch-coordination-agent',
    '5-6': 'performance-tracking-agent',
    '6-1': 'engagement-strategy-agent',
    '6-2': 'retention-optimization-agent',
    '6-3': 'community-building-agent',
    '6-4': 'advocacy-development-agent',
    '6-5': 'loyalty-program-agent',
    '6-6': 'referral-system-agent',
    '7-1': 'metrics-definition-agent',
    '7-2': 'data-collection-agent',
    '7-3': 'impact-analysis-agent',
    '7-4': 'roi-calculation-agent',
    '7-5': 'reporting-dashboard-agent',
    '7-6': 'insights-generation-agent',
    '8-1': 'success-metrics-agent',
    '8-2': 'expansion-planning-agent',
    '8-3': 'upsell-strategy-agent',
    '8-4': 'account-management-agent',
    '8-5': 'satisfaction-monitoring-agent',
    '8-6': 'renewal-optimization-agent',
    '9-1': 'execution-planning-agent',
    '9-2': 'process-documentation-agent',
    '9-3': 'quality-assurance-agent',
    '9-4': 'delivery-tracking-agent',
    '9-5': 'stakeholder-communication-agent',
    '9-6': 'results-validation-agent',
    '10-1': 'sales-enablement-agent',
    '10-2': 'training-development-agent',
    '10-3': 'tool-optimization-agent',
    '10-4': 'performance-coaching-agent',
    '10-5': 'pipeline-management-agent',
    '10-6': 'conversion-optimization-agent',
    '11-1': 'team-structure-agent',
    '11-2': 'talent-acquisition-agent',
    '11-3': 'skill-development-agent',
    '11-4': 'performance-management-agent',
    '11-5': 'culture-building-agent',
    '11-6': 'leadership-development-agent',
    '12-1': 'retention-analysis-agent',
    '12-2': 'churn-prevention-agent',
    '12-3': 'lifecycle-optimization-agent',
    '12-4': 'engagement-tracking-agent',
    '12-5': 'satisfaction-improvement-agent',
    '12-6': 'loyalty-enhancement-agent',
    '13-1': 'market-analysis-agent',
    '13-2': 'competitive-positioning-agent',
    '13-3': 'growth-strategy-agent',
    '13-4': 'market-penetration-agent',
    '13-5': 'brand-dominance-agent',
    '13-6': 'ecosystem-development-agent',
    '14-1': 'infrastructure-planning-agent',
    '14-2': 'system-architecture-agent',
    '14-3': 'process-automation-agent',
    '14-4': 'efficiency-optimization-agent',
    '14-5': 'scalability-planning-agent',
    '14-6': 'operational-excellence-agent',
    '15-1': 'leadership-strategy-agent',
    '15-2': 'organizational-design-agent',
    '15-3': 'succession-planning-agent',
    '15-4': 'executive-development-agent',
    '15-5': 'board-management-agent',
    '15-6': 'stakeholder-relations-agent',
    '16-1': 'global-strategy-agent',
    '16-2': 'market-entry-agent',
    '16-3': 'localization-agent',
    '16-4': 'partnership-development-agent',
    '16-5': 'international-operations-agent',
    '16-6': 'cross-cultural-management-agent'
};

// Block titles
const BLOCK_TITLES = {
    1: 'Mission Discovery',
    2: 'Customer Insights',
    3: 'Strategic Prioritization',
    4: 'Prototype Launch',
    5: 'Go-to-Market Strategy',
    6: 'Customer Engagement Flywheel',
    7: 'Quantifiable Impact',
    8: 'Customer Success & Expansion',
    9: 'Proof of Execution',
    10: 'Sales Team Empowerment',
    11: 'High-Performance Teams',
    12: 'Retention Systems',
    13: 'Market Domination Strategies',
    14: 'Operational Infrastructure',
    15: 'Leadership & Expansion',
    16: 'Global Expansion Opportunities'
};

// Subcomponent titles
const SUBCOMPONENT_TITLES = {
    '1-1': 'Problem Statement Definition',
    '1-2': 'Solution Hypothesis',
    '1-3': 'Value Proposition',
    '1-4': 'Target Audience',
    '1-5': 'Competitive Analysis',
    '1-6': 'Unique Differentiator',
    '2-1': 'Customer Insight Discovery',
    '2-2': 'Pain Point Analysis',
    '2-3': 'Journey Mapping',
    '2-4': 'Feedback Loop Creation',
    '2-5': 'Persona Development',
    '2-6': 'Needs Analysis',
    '3-1': 'Strategic Prioritization',
    '3-2': 'Resource Allocation',
    '3-3': 'Roadmap Planning',
    '3-4': 'Milestone Setting',
    '3-5': 'Risk Assessment',
    '3-6': 'Decision Framework',
    '4-1': 'Prototype Development',
    '4-2': 'Testing & Validation',
    '4-3': 'Iteration & Refinement',
    '4-4': 'Feature Prioritization',
    '4-5': 'Technical Feasibility',
    '4-6': 'Launch Readiness',
    '5-1': 'Market Strategy',
    '5-2': 'Channel Optimization',
    '5-3': 'Messaging Alignment',
    '5-4': 'Campaign Planning',
    '5-5': 'Launch Coordination',
    '5-6': 'Performance Tracking',
    '6-1': 'Engagement Strategy',
    '6-2': 'Retention Optimization',
    '6-3': 'Community Building',
    '6-4': 'Advocacy Development',
    '6-5': 'Loyalty Program Design',
    '6-6': 'Referral System Creation',
    '7-1': 'Metrics Definition',
    '7-2': 'Data Collection',
    '7-3': 'Impact Analysis',
    '7-4': 'ROI Calculation',
    '7-5': 'Reporting Dashboard',
    '7-6': 'Insights Generation',
    '8-1': 'Success Metrics',
    '8-2': 'Expansion Planning',
    '8-3': 'Upsell Strategy',
    '8-4': 'Account Management',
    '8-5': 'Satisfaction Monitoring',
    '8-6': 'Renewal Optimization',
    '9-1': 'Execution Planning',
    '9-2': 'Process Documentation',
    '9-3': 'Quality Assurance',
    '9-4': 'Delivery Tracking',
    '9-5': 'Stakeholder Communication',
    '9-6': 'Results Validation',
    '10-1': 'Sales Enablement',
    '10-2': 'Training Development',
    '10-3': 'Tool Optimization',
    '10-4': 'Performance Coaching',
    '10-5': 'Pipeline Management',
    '10-6': 'Conversion Optimization',
    '11-1': 'Team Structure Design',
    '11-2': 'Talent Acquisition',
    '11-3': 'Skill Development',
    '11-4': 'Performance Management',
    '11-5': 'Culture Building',
    '11-6': 'Leadership Development',
    '12-1': 'Retention Analysis',
    '12-2': 'Churn Prevention',
    '12-3': 'Lifecycle Optimization',
    '12-4': 'Engagement Tracking',
    '12-5': 'Satisfaction Improvement',
    '12-6': 'Loyalty Enhancement',
    '13-1': 'Market Analysis',
    '13-2': 'Competitive Positioning',
    '13-3': 'Growth Strategy',
    '13-4': 'Market Penetration',
    '13-5': 'Brand Dominance',
    '13-6': 'Ecosystem Development',
    '14-1': 'Infrastructure Planning',
    '14-2': 'System Architecture',
    '14-3': 'Process Automation',
    '14-4': 'Efficiency Optimization',
    '14-5': 'Scalability Planning',
    '14-6': 'Operational Excellence',
    '15-1': 'Leadership Strategy',
    '15-2': 'Organizational Design',
    '15-3': 'Succession Planning',
    '15-4': 'Executive Development',
    '15-5': 'Board Management',
    '15-6': 'Stakeholder Relations',
    '16-1': 'Global Strategy',
    '16-2': 'Market Entry',
    '16-3': 'Localization',
    '16-4': 'Partnership Development',
    '16-5': 'International Operations',
    '16-6': 'Cross-Cultural Management'
};

function fixBlockFile(blockNum, subcomponent) {
    const fileName = `block-${blockNum}-${subcomponent}.html`;
    const filePath = path.join(__dirname, fileName);
    const moduleId = `${blockNum}-${subcomponent}`;
    const agentName = AGENT_MAPPING[moduleId];
    const blockTitle = BLOCK_TITLES[blockNum];
    const subcomponentTitle = SUBCOMPONENT_TITLES[moduleId];
    
    console.log(`Fixing ${fileName}...`);
    
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 1. Fix the workspace tab structure
        const workspaceTabContent = `
    <!-- Workspace Tab -->
    <div id="workspace-tab" class="tab-content">
        <h2>Complete Your Worksheet</h2>
        <div id="worksheet-container" class="dimension-worksheet">
            <!-- Dynamic dimension-based fields loaded here -->
        </div>
        
        <!-- Action Buttons -->
        <div class="action-buttons">
            <button class="btn btn-secondary" onclick="saveProgress()">
                💾 SAVE PROGRESS
            </button>
            <button class="btn btn-primary" onclick="analyzeWorksheet()">
                🤖 ANALYZE WITH AGENT
            </button>
            <button class="btn btn-secondary" onclick="exportToPDF()">
                📄 EXPORT AS PDF
            </button>
        </div>
    </div>`;
        
        // Replace workspace tab
        content = content.replace(
            /<div id="workspace-tab"[^>]*>[\s\S]*?<\/div>\s*(?=<!-- Analysis Tab -->|<div id="analysis-tab")/,
            workspaceTabContent + '\n'
        );
        
        // 2. Fix templates tab (ensure it exists)
        if (!content.includes('templates-tab')) {
            const templatesTabContent = `
    <!-- Templates Tab -->
    <div id="templates-tab" class="tab-content">
        <h2>Templates & Resources</h2>
        <div id="templates-content">
            <!-- Templates loaded here -->
        </div>
    </div>`;
            
            // Insert templates tab after resources tab
            const resourcesTabEnd = content.indexOf('</div>', content.indexOf('id="resources-tab"'));
            if (resourcesTabEnd > -1) {
                content = content.slice(0, resourcesTabEnd + 6) + '\n' + templatesTabContent + content.slice(resourcesTabEnd + 6);
            }
        }
        
        // 3. Update module configuration
        const moduleConfigScript = `
        // Enhanced Module Configuration
        const moduleConfig = {
            blockId: ${blockNum},
            subcomponentId: ${subcomponent},
            moduleId: '${moduleId}',
            agentId: '${agentName}',
            blockTitle: '${blockTitle}',
            subcomponentTitle: '${subcomponentTitle}',
            useDimensionSystem: true,
            title: document.querySelector('.module-title')?.textContent || '${subcomponentTitle}',
            description: document.querySelector('.module-description')?.textContent || ''
        };`;
        
        // Replace module configuration
        content = content.replace(
            /const moduleConfig = \{[\s\S]*?\};/,
            moduleConfigScript
        );
        
        // 4. Fix the collectWorksheetData function to use dimensions
        const collectWorksheetDataFunction = `
        // Collect worksheet data (dimension-based)
        function collectWorksheetData() {
            const data = {};
            
            // Collect dimension values
            document.querySelectorAll('.dimension-input').forEach(input => {
                const dimensionId = input.dataset.dimension;
                if (dimensionId) {
                    data[dimensionId] = input.value || '';
                }
            });
            
            // Add metadata
            data.moduleId = moduleConfig.moduleId;
            data.agentId = moduleConfig.agentId;
            data.timestamp = new Date().toISOString();
            
            return data;
        }`;
        
        // Replace collectWorksheetData function
        content = content.replace(
            /function collectWorksheetData\(\) \{[\s\S]*?\n\s*\}/,
            collectWorksheetDataFunction
        );
        
        // 5. Fix loadWorkspaceFields function
        const loadWorkspaceFieldsFunction = `
        // Load workspace fields (dimension-based)
        function loadWorkspaceFields() {
            if (typeof window.UnifiedAnalysisHandler !== 'undefined') {
                const handler = new window.UnifiedAnalysisHandler();
                handler.loadWorksheet(moduleConfig.moduleId);
            } else {
                console.log('Waiting for UnifiedAnalysisHandler...');
                setTimeout(loadWorkspaceFields, 100);
            }
        }`;
        
        // Replace or add loadWorkspaceFields function
        if (content.includes('function loadWorkspaceFields')) {
            content = content.replace(
                /function loadWorkspaceFields\(\)[^{]*\{[^}]*\}/,
                loadWorkspaceFieldsFunction
            );
        } else {
            // Add it before the loadTabContent function
            const loadTabContentIndex = content.indexOf('function loadTabContent');
            if (loadTabContentIndex > -1) {
                content = content.slice(0, loadTabContentIndex) + 
                         loadWorkspaceFieldsFunction + '\n\n        ' + 
                         content.slice(loadTabContentIndex);
            }
        }
        
        // 6. Fix analyzeWorksheet function
        const analyzeWorksheetFunction = `
        // Analyze worksheet with agent
        function analyzeWorksheet() {
            if (typeof window.UnifiedAnalysisHandler !== 'undefined') {
                const handler = new window.UnifiedAnalysisHandler();
                handler.analyzeWorksheet(moduleConfig.moduleId);
            } else {
                showNotification('Analysis system loading...', 'info');
            }
        }`;
        
        // Replace or add analyzeWorksheet function
        if (content.includes('function analyzeWorksheet')) {
            content = content.replace(
                /function analyzeWorksheet\(\)[^{]*\{[^}]*\}/,
                analyzeWorksheetFunction
            );
        } else {
            // Add it after collectWorksheetData
            const collectIndex = content.indexOf('function collectWorksheetData');
            if (collectIndex > -1) {
                const endIndex = content.indexOf('\n\n', collectIndex);
                content = content.slice(0, endIndex) + '\n\n' + 
                         analyzeWorksheetFunction + 
                         content.slice(endIndex);
            }
        }
        
        // 7. Ensure container class exists
        if (!content.includes('class="container"')) {
            // Wrap main content in container
            const bodyStart = content.indexOf('<body>') + 6;
            const bodyEnd = content.indexOf('</body>');
            const bodyContent = content.slice(bodyStart, bodyEnd);
            
            if (!bodyContent.includes('class="container"')) {
                content = content.slice(0, bodyStart) + 
                         '\n    <div class="container">\n' + 
                         bodyContent + 
                         '\n    </div>\n' + 
                         content.slice(bodyEnd);
            }
        }
        
        // 8. Ensure nav-tabs class exists
        if (!content.includes('nav-tabs')) {
            content = content.replace('class="tab-navigation"', 'class="tab-navigation nav-tabs"');
        }
        
        // 9. Ensure tab-content wrapper exists
        if (!content.includes('class="tab-content"')) {
            // Already handled by individual tab fixes
        }
        
        // Write the fixed content
        fs.writeFileSync(filePath, content);
        return true;
        
    } catch (error) {
        console.error(`Error fixing ${fileName}:`, error.message);
        return false;
    }
}

// Main execution
console.log('🔧 Fixing All Block Structure');
console.log('=====================================\n');

let successCount = 0;
let failCount = 0;

for (let block = 1; block <= 16; block++) {
    console.log(`\n📦 Processing Block ${block}:`);
    
    for (let sub = 1; sub <= 6; sub++) {
        if (fixBlockFile(block, sub)) {
            successCount++;
        } else {
            failCount++;
        }
    }
}

console.log('\n=====================================');
console.log('📊 Structure Fix Summary:');
console.log(`✅ Successfully fixed: ${successCount} files`);
console.log(`❌ Failed: ${failCount} files`);
console.log('=====================================\n');

if (failCount === 0) {
    console.log('✨ All blocks have been fixed with consistent structure!');
} else {
    console.log('⚠️  Some blocks could not be fixed. Please review errors above.');
}
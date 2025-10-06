/**
 * Comprehensive Test Script for All 96 Agents
 * Tests agent-subcomponent mapping for the entire ScaleOps6 platform
 */

const http = require('http');
const fs = require('fs');

// Import the correct mappings
const { agentMapping } = require('./agent-subcomponent-mapping.js');
const SUBCOMPONENT_NAMES = require('./subcomponent-names-mapping.js');
const { AGENT_CORRECT_MAPPING } = require('./agent-correct-mapping.js');

// Block names for reference
const BLOCK_NAMES = {
    1: 'Mission Discovery',
    2: 'Customer Insights', 
    3: 'Strategic Prioritization',
    4: 'Prototype Launch',
    5: 'Go-to-Market Strategy',
    6: 'Customer Engagement Flywheel',
    7: 'Quantifiable Impact',
    8: 'Customer Success Expansion',
    9: 'Proof of Execution',
    10: 'Sales Team Empowerment',
    11: 'High Performance Teams',
    12: 'Retention Systems',
    13: 'Market Domination Strategies',
    14: 'Operational Infrastructure',
    15: 'Leadership Expansion',
    16: 'Global Expansion Opportunities'
};

// Expected agent assignments (from corrected mapping)
const EXPECTED_AGENTS = {
    // Block 1: Mission Discovery
    '1-1': 'Problem Definition Evaluator',
    '1-2': 'Mission Alignment Advisor',
    '1-3': 'VoC Synthesizer',
    '1-4': 'Team Gap Identifier',
    '1-5': 'Market Mapper',
    '1-6': 'Launch Plan Assessor',
    
    // Block 2: Customer Insights - CORRECTED
    '2-1': 'JTBD Specialist',
    '2-2': 'Persona Framework Builder',
    '2-3': 'Interview Cadence Analyzer',
    '2-4': 'Pain Point Mapper',
    '2-5': 'Signal Grader',
    '2-6': 'Insight Loop Manager',
    
    // Block 3: Strategic Prioritization
    '3-1': 'Use Case Scorer',
    '3-2': 'Segment Tier Analyst',
    '3-3': 'Prioritization Expert',
    '3-4': 'Tradeoff Tracker',
    '3-5': 'Hypothesis Validator',
    '3-6': 'Decision Archivist',
    
    // Block 4: Prototype Launch
    '4-1': 'Feature Matrix Builder',
    '4-2': 'Technical Scope Expert',
    '4-3': 'Pilot Group Selector',
    '4-4': 'QA Criteria Setter',
    '4-5': 'Timeline Planner',
    '4-6': 'Post-Mortem Analyst',
    
    // Block 5: Go-To-Market Strategy
    '5-1': 'GTMMessagingAgent',
    '5-2': 'SalesEnablementAgent',
    '5-3': 'PricingPackagingAgent',
    '5-4': 'ChannelPartnerAgent',
    '5-5': 'CompetitivePositioningAgent',
    '5-6': 'LaunchPlanningAgent',
    
    // Block 6: Customer Engagement Flywheel
    '6-1': 'Usage Heatmap Analyst',
    '6-2': 'Milestone Tracker',
    '6-3': 'CS Dashboard Builder',
    '6-4': 'Activation Expert',
    '6-5': 'Feedback Collector',
    '6-6': 'Power User Analyst',
    
    // Block 7: Quantifiable Impact
    '7-1': 'Time/Cost Analyst',
    '7-2': 'Revenue Impact Tracker',
    '7-3': 'Productivity Measurer',
    '7-4': 'Retention Analyst',
    '7-5': 'System Reduction Expert',
    '7-6': 'Friction Analyzer',
    
    // Block 8: Customer Success Expansion
    '8-1': 'Upsell Funnel Designer',
    '8-2': 'Team Expansion Tracker',
    '8-3': 'Organic Growth Analyst',
    '8-4': 'Champion Mapper',
    '8-5': 'Sentiment Tracker',
    '8-6': 'Renewal Readiness Expert',
    
    // Block 9: Proof Execution
    '9-1': 'Inbound Conversion Analyst',
    '9-2': 'Outbound Performance Tracker',
    '9-3': 'Channel Economics Expert',
    '9-4': 'Discovery Call Evaluator',
    '9-5': 'Demo-to-Close Optimizer',
    '9-6': 'Founder Sales Analyst',
    
    // Block 10: Sales Team Empowerment
    '10-1': 'Enablement Asset Manager',
    '10-2': 'Rep Ramp Planner',
    '10-3': 'Win/Loss Analyst',
    '10-4': 'Objection Handler',
    '10-5': 'ICP Filter Expert',
    '10-6': 'Sales Call Librarian',
    
    // Block 11: High Performance Teams
    '11-1': 'Scorecard Designer',
    '11-2': 'Quota Structure Expert',
    '11-3': 'Deal Review Manager',
    '11-4': 'Forecast Framework Builder',
    '11-5': 'Coaching Loop Designer',
    '11-6': 'Talent Gap Analyst',
    
    // Block 12: Retention Systems
    '12-1': 'Onboarding Optimizer',
    '12-2': 'Activation Tracker',
    '12-3': 'Success Playbook Builder',
    '12-4': 'Escalation Manager',
    '12-5': 'Renewal Pipeline Expert',
    '12-6': 'Churn Root-Cause Analyst',
    
    // Block 13: Market Domination Strategies
    '13-1': 'Category Narrative Designer',
    '13-2': 'Strategic Moat Builder',
    '13-3': 'Ecosystem Mapper',
    '13-4': 'Competitor Monitor',
    '13-5': 'Brand Architect',
    '13-6': 'Defensive GTM Strategist',
    
    // Block 14: Operational Infrastructure
    '14-1': 'System Architecture Expert',
    '14-2': 'Revenue Engine Mapper',
    '14-3': 'Dashboard Designer',
    '14-4': 'Tool Consolidator',
    '14-5': 'RevOps Playbook Builder',
    '14-6': 'SLA Policy Manager',
    
    // Block 15: Leadership Expansion
    '15-1': 'ExecutiveHiringAgent',
    '15-2': 'BoardGovernanceAgent',
    '15-3': 'SuccessionPlanningAgent',
    '15-4': 'StakeholderAlignmentAgent',
    '15-5': 'InvestorRelationsAgent',
    '15-6': 'LeadershipDynamicsAgent',
    
    // Block 16: Global & Expansion Opportunities
    '16-1': 'Market Entry Analyst',
    '16-2': 'Localization Expert',
    '16-3': 'International Pricing Strategist',
    '16-4': 'Compliance Tracker',
    '16-5': 'Geo-GTM Specialist',
    '16-6': 'Expansion Risk Assessor'
};

// Test a single subcomponent via API
function testSubcomponentAPI(subcomponentId) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3001,
            path: `/api/subcomponents/${subcomponentId}`,
            method: 'GET'
        };

        const req = http.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const result = JSON.parse(data);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.setTimeout(5000, () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });

        req.end();
    });
}

// Test all agents
async function testAllAgents() {
    console.log('🧪 COMPREHENSIVE 96-AGENT TEST');
    console.log('=' .repeat(80));
    console.log(`Testing all ${Object.keys(EXPECTED_AGENTS).length} agent-subcomponent mappings...\n`);

    const results = {
        passed: [],
        failed: [],
        errors: []
    };

    // Test each block
    for (let blockId = 1; blockId <= 16; blockId++) {
        console.log(`\n📦 Block ${blockId}: ${BLOCK_NAMES[blockId]}`);
        console.log('-'.repeat(60));

        for (let subId = 1; subId <= 6; subId++) {
            const subcomponentId = `${blockId}-${subId}`;
            const expectedAgent = EXPECTED_AGENTS[subcomponentId];
            const subcomponentName = SUBCOMPONENT_NAMES[subcomponentId];
            
            // Test 1: Check local mapping files
            const localMappedAgent = agentMapping[subcomponentId]?.name;
            const correctMappingAgent = AGENT_CORRECT_MAPPING[subcomponentId];
            
            // Test 2: Check API response
            let apiAgent = null;
            let apiError = null;
            
            try {
                const apiResponse = await testSubcomponentAPI(subcomponentId);
                apiAgent = apiResponse.agent || apiResponse.agentName;
            } catch (error) {
                apiError = error.message;
            }
            
            // Evaluate results
            const localMatch = localMappedAgent === expectedAgent;
            const correctMapMatch = correctMappingAgent === expectedAgent;
            const apiMatch = apiAgent === expectedAgent;
            
            if (localMatch && correctMapMatch && apiMatch) {
                console.log(`  ✅ ${subcomponentId}: ${subcomponentName}`);
                console.log(`     Agent: ${expectedAgent} ✓`);
                results.passed.push({
                    subcomponentId,
                    subcomponentName,
                    agent: expectedAgent
                });
            } else {
                console.log(`  ❌ ${subcomponentId}: ${subcomponentName}`);
                console.log(`     Expected: ${expectedAgent}`);
                if (!localMatch) {
                    console.log(`     Local Mapping: ${localMappedAgent || 'Missing'} ❌`);
                }
                if (!correctMapMatch) {
                    console.log(`     Correct Mapping: ${correctMappingAgent || 'Missing'} ❌`);
                }
                if (!apiMatch) {
                    console.log(`     API Response: ${apiAgent || apiError || 'Missing'} ❌`);
                }
                
                results.failed.push({
                    subcomponentId,
                    subcomponentName,
                    expected: expectedAgent,
                    actual: {
                        local: localMappedAgent,
                        correctMap: correctMappingAgent,
                        api: apiAgent || apiError
                    }
                });
            }
            
            // Small delay to avoid overwhelming the server
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    // Generate summary report
    console.log('\n' + '='.repeat(80));
    console.log('📊 TEST SUMMARY');
    console.log('='.repeat(80));
    console.log(`✅ Passed: ${results.passed.length}/96 (${((results.passed.length/96)*100).toFixed(1)}%)`);
    console.log(`❌ Failed: ${results.failed.length}/96 (${((results.failed.length/96)*100).toFixed(1)}%)`);
    console.log(`⚠️  Errors: ${results.errors.length}/96`);
    
    // Show pass rate by block
    console.log('\n📈 PASS RATE BY BLOCK:');
    console.log('-'.repeat(40));
    for (let blockId = 1; blockId <= 16; blockId++) {
        const blockPassed = results.passed.filter(r => r.subcomponentId.startsWith(`${blockId}-`)).length;
        const blockFailed = results.failed.filter(r => r.subcomponentId.startsWith(`${blockId}-`)).length;
        const passRate = (blockPassed / 6 * 100).toFixed(0);
        const status = blockPassed === 6 ? '✅' : blockFailed === 6 ? '❌' : '⚠️';
        console.log(`${status} Block ${String(blockId).padStart(2)}: ${BLOCK_NAMES[blockId].padEnd(35)} ${passRate}% (${blockPassed}/6)`);
    }
    
    // Save detailed results
    const reportContent = {
        timestamp: new Date().toISOString(),
        summary: {
            total: 96,
            passed: results.passed.length,
            failed: results.failed.length,
            errors: results.errors.length,
            passRate: `${((results.passed.length/96)*100).toFixed(1)}%`
        },
        blockSummary: {},
        results: results
    };
    
    // Add block-level summary
    for (let blockId = 1; blockId <= 16; blockId++) {
        const blockPassed = results.passed.filter(r => r.subcomponentId.startsWith(`${blockId}-`));
        const blockFailed = results.failed.filter(r => r.subcomponentId.startsWith(`${blockId}-`));
        reportContent.blockSummary[blockId] = {
            name: BLOCK_NAMES[blockId],
            passed: blockPassed.length,
            failed: blockFailed.length,
            passRate: `${(blockPassed.length/6*100).toFixed(0)}%`,
            agents: blockPassed.map(r => r.agent)
        };
    }
    
    fs.writeFileSync('test-96-agents-report.json', JSON.stringify(reportContent, null, 2));
    console.log('\n📄 Detailed report saved to: test-96-agents-report.json');
    
    // Highlight any critical issues
    if (results.failed.length > 0) {
        console.log('\n🔴 FAILED MAPPINGS REQUIRING ATTENTION:');
        console.log('-'.repeat(60));
        results.failed.slice(0, 10).forEach(failure => {
            console.log(`${failure.subcomponentId}: ${failure.subcomponentName}`);
            console.log(`  Expected: ${failure.expected}`);
            console.log(`  Got: ${failure.actual.api || failure.actual.local}`);
        });
        if (results.failed.length > 10) {
            console.log(`  ... and ${results.failed.length - 10} more failures`);
        }
    }
    
    // Final status
    if (results.passed.length === 96) {
        console.log('\n🎉 SUCCESS! All 96 agents are correctly mapped!');
    } else if (results.passed.length >= 90) {
        console.log('\n✅ MOSTLY SUCCESSFUL: ${results.passed.length}/96 agents correctly mapped');
    } else {
        console.log('\n⚠️  ATTENTION NEEDED: Only ${results.passed.length}/96 agents correctly mapped');
    }
    
    return results;
}

// Main execution
async function main() {
    try {
        const results = await testAllAgents();
        process.exit(results.failed.length === 0 ? 0 : 1);
    } catch (error) {
        console.error('❌ Test execution failed:', error);
        process.exit(1);
    }
}

// Run the test
if (require.main === module) {
    main();
}

module.exports = { testAllAgents, EXPECTED_AGENTS };
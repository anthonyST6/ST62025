/**
 * Comprehensive Agent Routing Audit
 * Tests all 96 subcomponent pages to verify correct agent assignment
 */

const puppeteer = require('puppeteer');
const fs = require('fs');

// Import the corrected mappings
const { agentMapping } = require('./agent-subcomponent-mapping.js');
const SUBCOMPONENT_NAMES = require('./subcomponent-names-mapping.js');

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

async function auditAgentRouting() {
    console.log('🔍 COMPREHENSIVE AGENT ROUTING AUDIT');
    console.log('=' .repeat(80));
    console.log('Testing all 96 subcomponent pages...\n');
    
    const browser = await puppeteer.launch({ 
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const results = {
        passed: [],
        failed: [],
        errors: []
    };
    
    try {
        for (let blockId = 1; blockId <= 16; blockId++) {
            console.log(`\n📦 Block ${blockId}: ${BLOCK_NAMES[blockId]}`);
            console.log('-'.repeat(60));
            
            for (let subId = 1; subId <= 6; subId++) {
                const subcomponentId = `${blockId}-${subId}`;
                const expectedAgent = agentMapping[subcomponentId];
                const subcomponentName = SUBCOMPONENT_NAMES[subcomponentId];
                
                try {
                    const page = await browser.newPage();
                    const url = `http://localhost:3001/block-detail.html?id=${subcomponentId}`;
                    
                    // Navigate to the page
                    await page.goto(url, { waitUntil: 'networkidle2', timeout: 10000 });
                    
                    // Wait for content to load
                    await page.waitForSelector('.agent-info', { timeout: 5000 });
                    
                    // Extract agent information from the page
                    const pageData = await page.evaluate(() => {
                        const agentNameEl = document.querySelector('.agent-name');
                        const agentRoleEl = document.querySelector('.agent-role');
                        const subcomponentTitleEl = document.querySelector('#subcomponent-title');
                        const educationContentEl = document.querySelector('#education-content');
                        
                        return {
                            agentName: agentNameEl ? agentNameEl.textContent.trim() : null,
                            agentRole: agentRoleEl ? agentRoleEl.textContent.replace('Role: ', '').trim() : null,
                            subcomponentTitle: subcomponentTitleEl ? subcomponentTitleEl.textContent.trim() : null,
                            hasEducationContent: educationContentEl && educationContentEl.children.length > 0
                        };
                    });
                    
                    await page.close();
                    
                    // Validate the results
                    const isCorrectAgent = pageData.agentName === expectedAgent.name;
                    const isCorrectRole = pageData.agentRole === expectedAgent.role;
                    const isCorrectTitle = pageData.subcomponentTitle === subcomponentName;
                    const hasContent = pageData.hasEducationContent;
                    
                    if (isCorrectAgent && isCorrectRole && isCorrectTitle && hasContent) {
                        console.log(`  ✅ ${subcomponentId}: ${subcomponentName}`);
                        console.log(`     Agent: ${pageData.agentName} ✓`);
                        results.passed.push({
                            subcomponentId,
                            subcomponentName,
                            agentName: pageData.agentName
                        });
                    } else {
                        console.log(`  ❌ ${subcomponentId}: ${subcomponentName}`);
                        if (!isCorrectTitle) {
                            console.log(`     Title Mismatch: Expected "${subcomponentName}", Got "${pageData.subcomponentTitle}"`);
                        }
                        if (!isCorrectAgent) {
                            console.log(`     Agent Mismatch: Expected "${expectedAgent.name}", Got "${pageData.agentName}"`);
                        }
                        if (!isCorrectRole) {
                            console.log(`     Role Mismatch: Expected "${expectedAgent.role}", Got "${pageData.agentRole}"`);
                        }
                        if (!hasContent) {
                            console.log(`     Missing Education Content`);
                        }
                        
                        results.failed.push({
                            subcomponentId,
                            subcomponentName,
                            expected: {
                                agent: expectedAgent.name,
                                role: expectedAgent.role,
                                title: subcomponentName
                            },
                            actual: {
                                agent: pageData.agentName,
                                role: pageData.agentRole,
                                title: pageData.subcomponentTitle,
                                hasContent: hasContent
                            }
                        });
                    }
                    
                } catch (error) {
                    console.log(`  ⚠️  ${subcomponentId}: Error loading page`);
                    console.log(`     ${error.message}`);
                    results.errors.push({
                        subcomponentId,
                        error: error.message
                    });
                }
            }
        }
        
    } finally {
        await browser.close();
    }
    
    // Generate summary report
    console.log('\n' + '='.repeat(80));
    console.log('📊 AUDIT SUMMARY');
    console.log('='.repeat(80));
    console.log(`✅ Passed: ${results.passed.length}/96`);
    console.log(`❌ Failed: ${results.failed.length}/96`);
    console.log(`⚠️  Errors: ${results.errors.length}/96`);
    
    // Save detailed results to file
    const reportContent = {
        timestamp: new Date().toISOString(),
        summary: {
            total: 96,
            passed: results.passed.length,
            failed: results.failed.length,
            errors: results.errors.length,
            successRate: `${((results.passed.length / 96) * 100).toFixed(1)}%`
        },
        results: results
    };
    
    fs.writeFileSync('agent-routing-audit-report.json', JSON.stringify(reportContent, null, 2));
    console.log('\n📄 Detailed report saved to: agent-routing-audit-report.json');
    
    // Show specific problem areas if any
    if (results.failed.length > 0) {
        console.log('\n🔴 FAILED MAPPINGS REQUIRING ATTENTION:');
        console.log('-'.repeat(60));
        results.failed.forEach(failure => {
            console.log(`${failure.subcomponentId}: ${failure.subcomponentName}`);
            console.log(`  Expected Agent: ${failure.expected.agent}`);
            console.log(`  Actual Agent: ${failure.actual.agent}`);
        });
    }
    
    // Highlight Block 2 specifically since it was the problem area
    const block2Results = results.passed.filter(r => r.subcomponentId.startsWith('2-'));
    const block2Failed = results.failed.filter(r => r.subcomponentId.startsWith('2-'));
    
    console.log('\n🎯 BLOCK 2 (Customer Insights) SPECIFIC RESULTS:');
    console.log('-'.repeat(60));
    console.log(`Passed: ${block2Results.length}/6`);
    console.log(`Failed: ${block2Failed.length}/6`);
    
    if (block2Results.length === 6) {
        console.log('✅ All Block 2 agents are correctly mapped!');
        block2Results.forEach(r => {
            console.log(`  ${r.subcomponentId}: ${r.subcomponentName} → ${r.agentName} ✓`);
        });
    }
    
    return results;
}

// Check if puppeteer is installed
try {
    require.resolve('puppeteer');
    // Run the audit
    auditAgentRouting().catch(console.error);
} catch(e) {
    console.log('⚠️  Puppeteer not installed. Installing now...');
    console.log('Run: npm install puppeteer');
    console.log('Then run this script again: node audit-all-agent-routing.js');
}
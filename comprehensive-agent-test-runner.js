/**
 * ScaleOps6 Platform - Comprehensive Agent Test Runner
 * Tests all 96 agents across all functionality areas
 */

const fs = require('fs').promises;
const path = require('path');
const puppeteer = require('puppeteer');

// Import agent library
const AgentLibrary = require('./agent-library.js');

class ComprehensiveAgentTestRunner {
    constructor() {
        this.agents = AgentLibrary;
        this.results = {
            timestamp: new Date().toISOString(),
            totalAgents: 96,
            passed: 0,
            failed: 0,
            issues: [],
            agentResults: {}
        };
        this.browser = null;
        this.baseUrl = 'http://localhost:3001';
    }

    /**
     * Map subcomponent ID to agent ID
     */
    mapToAgentId(blockId, subcomponentNumber) {
        const suffixes = ['a', 'b', 'c', 'd', 'e', 'f'];
        return `${blockId}${suffixes[subcomponentNumber - 1]}`;
    }

    /**
     * Get subcomponent URL format
     */
    getSubcomponentUrl(blockId, subId) {
        return `${this.baseUrl}/subcomponent-detail.html?id=${blockId}-${subId}`;
    }

    /**
     * Initialize browser for testing
     */
    async initBrowser() {
        this.browser = await puppeteer.launch({
            headless: false, // Set to true for automated testing
            defaultViewport: { width: 1280, height: 800 }
        });
    }

    /**
     * Close browser
     */
    async closeBrowser() {
        if (this.browser) {
            await this.browser.close();
        }
    }

    /**
     * Test all 96 agents
     */
    async testAllAgents() {
        console.log('🚀 Starting Comprehensive Agent Testing...');
        console.log('=' .repeat(60));
        
        await this.initBrowser();
        
        try {
            // Test each block
            for (let blockId = 1; blockId <= 16; blockId++) {
                console.log(`\n📦 Testing Block ${blockId}...`);
                
                // Test each subcomponent in the block
                for (let subId = 1; subId <= 6; subId++) {
                    const agentId = this.mapToAgentId(blockId, subId);
                    const agent = this.agents[agentId];
                    
                    if (!agent) {
                        console.error(`❌ Agent ${agentId} not found in library!`);
                        this.results.issues.push({
                            agentId,
                            issue: 'Agent not found in library',
                            severity: 'critical'
                        });
                        continue;
                    }
                    
                    console.log(`  Testing Agent ${agentId}: ${agent.name}`);
                    const result = await this.testAgent(blockId, subId, agentId, agent);
                    
                    this.results.agentResults[agentId] = result;
                    
                    if (result.status === 'passed') {
                        this.results.passed++;
                        console.log(`    ✅ Passed`);
                    } else {
                        this.results.failed++;
                        console.log(`    ❌ Failed: ${result.issues.length} issues found`);
                    }
                }
            }
        } finally {
            await this.closeBrowser();
        }
        
        // Generate and save report
        await this.generateReport();
        
        console.log('\n' + '=' .repeat(60));
        console.log('📊 Test Summary:');
        console.log(`  Total Agents: ${this.results.totalAgents}`);
        console.log(`  ✅ Passed: ${this.results.passed}`);
        console.log(`  ❌ Failed: ${this.results.failed}`);
        console.log(`  Success Rate: ${((this.results.passed / this.results.totalAgents) * 100).toFixed(1)}%`);
        
        return this.results;
    }

    /**
     * Test individual agent
     */
    async testAgent(blockId, subId, agentId, agent) {
        const result = {
            agentId,
            agentName: agent.name,
            blockId,
            subId,
            status: 'pending',
            education: null,
            workspace: null,
            analysis: null,
            scoreHistory: null,
            templates: null,
            resources: null,
            visual: null,
            issues: []
        };

        const page = await this.browser.newPage();
        
        try {
            // Navigate to subcomponent page
            const url = this.getSubcomponentUrl(blockId, subId);
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 10000 });
            
            // Test each functionality area
            result.education = await this.testEducationTab(page, agent);
            result.workspace = await this.testWorkspaceTab(page, agent);
            result.analysis = await this.testAnalysisTab(page, agent);
            result.scoreHistory = await this.testScoreHistoryTab(page, agent);
            result.templates = await this.testTemplatesTab(page, agent);
            result.resources = await this.testResourcesTab(page, agent);
            result.visual = await this.testVisualConsistency(page);
            
            // Compile issues
            const allTests = [
                result.education,
                result.workspace,
                result.analysis,
                result.scoreHistory,
                result.templates,
                result.resources,
                result.visual
            ];
            
            allTests.forEach(test => {
                if (test && test.issues) {
                    result.issues.push(...test.issues);
                }
            });
            
            result.status = result.issues.length === 0 ? 'passed' : 'failed';
            
        } catch (error) {
            result.status = 'error';
            result.issues.push({
                category: 'navigation',
                issue: `Failed to load page: ${error.message}`,
                severity: 'critical'
            });
        } finally {
            await page.close();
        }
        
        return result;
    }

    /**
     * Test Education Tab
     */
    async testEducationTab(page, agent) {
        const test = {
            status: 'pending',
            checks: [],
            issues: []
        };
        
        try {
            // Click on Education tab
            await page.click('[data-tab="education"]');
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Check if education content is loaded
            const educationContent = await page.$('#education-tab');
            if (!educationContent) {
                test.issues.push({
                    category: 'education',
                    issue: 'Education tab content not found',
                    severity: 'high'
                });
                test.status = 'failed';
                return test;
            }
            
            // Check for agent-specific content
            const contentText = await page.evaluate(() => {
                const tab = document.getElementById('education-tab');
                return tab ? tab.innerText : '';
            });
            
            // Verify agent name appears
            if (!contentText.toLowerCase().includes(agent.name.toLowerCase())) {
                test.issues.push({
                    category: 'education',
                    issue: 'Agent name not found in education content',
                    severity: 'medium'
                });
            }
            test.checks.push('Agent name presence');
            
            // Check for generic placeholders
            const genericTerms = ['lorem ipsum', 'placeholder', 'coming soon', 'tbd', 'undefined'];
            genericTerms.forEach(term => {
                if (contentText.toLowerCase().includes(term)) {
                    test.issues.push({
                        category: 'education',
                        issue: `Generic placeholder found: "${term}"`,
                        severity: 'medium'
                    });
                }
            });
            test.checks.push('No generic placeholders');
            
            // Check for required sections
            const requiredSections = ['What', 'Why', 'How'];
            requiredSections.forEach(section => {
                if (!contentText.includes(section)) {
                    test.issues.push({
                        category: 'education',
                        issue: `Missing section: ${section}`,
                        severity: 'low'
                    });
                }
            });
            test.checks.push('Required sections present');
            
            test.status = test.issues.length === 0 ? 'passed' : 'failed';
            
        } catch (error) {
            test.status = 'error';
            test.issues.push({
                category: 'education',
                issue: `Error testing education tab: ${error.message}`,
                severity: 'high'
            });
        }
        
        return test;
    }

    /**
     * Test Workspace Tab
     */
    async testWorkspaceTab(page, agent) {
        const test = {
            status: 'pending',
            checks: [],
            issues: []
        };
        
        try {
            // Click on Workspace tab
            await page.click('[data-tab="workspace"]');
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Check if workspace content is loaded
            const workspaceContent = await page.$('#workspace-tab');
            if (!workspaceContent) {
                test.issues.push({
                    category: 'workspace',
                    issue: 'Workspace tab content not found',
                    severity: 'high'
                });
                test.status = 'failed';
                return test;
            }
            
            // Check for questions
            const questions = await page.$$eval('.worksheet-field, .question-field, [data-question]', 
                elements => elements.length
            );
            
            if (questions === 0) {
                test.issues.push({
                    category: 'workspace',
                    issue: 'No questions found in workspace',
                    severity: 'high'
                });
            } else if (questions < 3) {
                test.issues.push({
                    category: 'workspace',
                    issue: `Only ${questions} questions found (expected at least 3)`,
                    severity: 'medium'
                });
            }
            test.checks.push(`Question count: ${questions}`);
            
            // Check for agent-specific questions
            const workspaceText = await page.evaluate(() => {
                const tab = document.getElementById('workspace-tab');
                return tab ? tab.innerText : '';
            });
            
            // Verify questions relate to agent's dimensions
            if (agent.scoringDimensions) {
                let dimensionFound = false;
                agent.scoringDimensions.forEach(dimension => {
                    if (workspaceText.toLowerCase().includes(dimension.name.toLowerCase())) {
                        dimensionFound = true;
                    }
                });
                
                if (!dimensionFound) {
                    test.issues.push({
                        category: 'workspace',
                        issue: 'Questions do not relate to agent dimensions',
                        severity: 'medium'
                    });
                }
            }
            test.checks.push('Dimension relevance');
            
            test.status = test.issues.length === 0 ? 'passed' : 'failed';
            
        } catch (error) {
            test.status = 'error';
            test.issues.push({
                category: 'workspace',
                issue: `Error testing workspace tab: ${error.message}`,
                severity: 'high'
            });
        }
        
        return test;
    }

    /**
     * Test Analysis Tab
     */
    async testAnalysisTab(page, agent) {
        const test = {
            status: 'pending',
            checks: [],
            issues: []
        };
        
        try {
            // Click on Analysis tab
            await page.click('[data-tab="analysis"]');
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Check if analysis content is loaded
            const analysisContent = await page.$('#analysis-tab');
            if (!analysisContent) {
                test.issues.push({
                    category: 'analysis',
                    issue: 'Analysis tab content not found',
                    severity: 'high'
                });
                test.status = 'failed';
                return test;
            }
            
            // Check for agent assignment
            const analysisText = await page.evaluate(() => {
                const tab = document.getElementById('analysis-tab');
                return tab ? tab.innerText : '';
            });
            
            // Verify scoring dimensions
            if (agent.scoringDimensions && agent.scoringDimensions.length !== 5) {
                test.issues.push({
                    category: 'analysis',
                    issue: `Agent has ${agent.scoringDimensions.length} dimensions (expected 5)`,
                    severity: 'high'
                });
            }
            test.checks.push('Dimension count');
            
            // Check for scoring functionality
            const analyzeButton = await page.$('button[onclick*="analyzeWorksheet"]');
            if (!analyzeButton) {
                test.issues.push({
                    category: 'analysis',
                    issue: 'No analyze button found',
                    severity: 'medium'
                });
            }
            test.checks.push('Analyze button presence');
            
            test.status = test.issues.length === 0 ? 'passed' : 'failed';
            
        } catch (error) {
            test.status = 'error';
            test.issues.push({
                category: 'analysis',
                issue: `Error testing analysis tab: ${error.message}`,
                severity: 'high'
            });
        }
        
        return test;
    }

    /**
     * Test Score History Tab
     */
    async testScoreHistoryTab(page, agent) {
        const test = {
            status: 'pending',
            checks: [],
            issues: []
        };
        
        try {
            // Click on Score History tab
            await page.click('[data-tab="history"]');
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Check if history content is loaded
            const historyContent = await page.$('#history-tab');
            if (!historyContent) {
                test.issues.push({
                    category: 'scoreHistory',
                    issue: 'Score History tab content not found',
                    severity: 'high'
                });
                test.status = 'failed';
                return test;
            }
            
            test.checks.push('Score history tab loads');
            test.status = test.issues.length === 0 ? 'passed' : 'failed';
            
        } catch (error) {
            test.status = 'error';
            test.issues.push({
                category: 'scoreHistory',
                issue: `Error testing score history tab: ${error.message}`,
                severity: 'high'
            });
        }
        
        return test;
    }

    /**
     * Test Templates/Output Tab
     */
    async testTemplatesTab(page, agent) {
        const test = {
            status: 'pending',
            checks: [],
            issues: []
        };
        
        try {
            // Click on Output tab
            await page.click('[data-tab="output"]');
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Check if output content is loaded
            const outputContent = await page.$('#output-tab');
            if (!outputContent) {
                test.issues.push({
                    category: 'templates',
                    issue: 'Output tab content not found',
                    severity: 'medium'
                });
                test.status = 'failed';
                return test;
            }
            
            test.checks.push('Output tab loads');
            test.status = test.issues.length === 0 ? 'passed' : 'failed';
            
        } catch (error) {
            test.status = 'error';
            test.issues.push({
                category: 'templates',
                issue: `Error testing templates tab: ${error.message}`,
                severity: 'medium'
            });
        }
        
        return test;
    }

    /**
     * Test Resources Tab
     */
    async testResourcesTab(page, agent) {
        const test = {
            status: 'pending',
            checks: [],
            issues: []
        };
        
        try {
            // Click on Resources tab
            await page.click('[data-tab="resources"]');
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Check if resources content is loaded
            const resourcesContent = await page.$('#resources-tab');
            if (!resourcesContent) {
                test.issues.push({
                    category: 'resources',
                    issue: 'Resources tab content not found',
                    severity: 'low'
                });
                test.status = 'failed';
                return test;
            }
            
            test.checks.push('Resources tab loads');
            test.status = test.issues.length === 0 ? 'passed' : 'failed';
            
        } catch (error) {
            test.status = 'error';
            test.issues.push({
                category: 'resources',
                issue: `Error testing resources tab: ${error.message}`,
                severity: 'low'
            });
        }
        
        return test;
    }

    /**
     * Test Visual Consistency
     */
    async testVisualConsistency(page) {
        const test = {
            status: 'pending',
            checks: [],
            issues: []
        };
        
        try {
            // Check for dark theme
            const backgroundColor = await page.evaluate(() => {
                return window.getComputedStyle(document.body).backgroundColor;
            });
            
            if (!backgroundColor.includes('0, 0, 0') && !backgroundColor.includes('rgb(0')) {
                test.issues.push({
                    category: 'visual',
                    issue: 'Dark theme not applied',
                    severity: 'low'
                });
            }
            test.checks.push('Dark theme');
            
            // Check for orange branding
            const hasOrangeBranding = await page.evaluate(() => {
                const elements = document.querySelectorAll('*');
                for (let el of elements) {
                    const color = window.getComputedStyle(el).color;
                    const bgColor = window.getComputedStyle(el).backgroundColor;
                    const borderColor = window.getComputedStyle(el).borderColor;
                    
                    if (color.includes('255, 85, 0') || 
                        bgColor.includes('255, 85, 0') || 
                        borderColor.includes('255, 85, 0')) {
                        return true;
                    }
                }
                return false;
            });
            
            if (!hasOrangeBranding) {
                test.issues.push({
                    category: 'visual',
                    issue: 'Orange branding (#FF5500) not found',
                    severity: 'low'
                });
            }
            test.checks.push('Orange branding');
            
            test.status = test.issues.length === 0 ? 'passed' : 'failed';
            
        } catch (error) {
            test.status = 'error';
            test.issues.push({
                category: 'visual',
                issue: `Error testing visual consistency: ${error.message}`,
                severity: 'low'
            });
        }
        
        return test;
    }

    /**
     * Generate comprehensive report
     */
    async generateReport() {
        const reportPath = path.join(__dirname, 'agent-test-results.json');
        await fs.writeFile(reportPath, JSON.stringify(this.results, null, 2));
        console.log(`\n📄 Report saved to: ${reportPath}`);
        
        // Generate summary report
        const summaryPath = path.join(__dirname, 'agent-test-summary.txt');
        const summary = this.generateSummaryText();
        await fs.writeFile(summaryPath, summary);
        console.log(`📄 Summary saved to: ${summaryPath}`);
    }

    /**
     * Generate summary text
     */
    generateSummaryText() {
        let summary = `ScaleOps6 Agent System Test Report
Generated: ${this.results.timestamp}
${'='.repeat(60)}

OVERALL RESULTS
Total Agents Tested: ${this.results.totalAgents}
Passed: ${this.results.passed}
Failed: ${this.results.failed}
Success Rate: ${((this.results.passed / this.results.totalAgents) * 100).toFixed(1)}%

${'='.repeat(60)}
DETAILED RESULTS BY AGENT
${'='.repeat(60)}
`;

        // Add details for each agent
        Object.entries(this.results.agentResults).forEach(([agentId, result]) => {
            summary += `
Agent ${agentId}: ${result.agentName}
Status: ${result.status.toUpperCase()}
Issues Found: ${result.issues.length}
`;
            
            if (result.issues.length > 0) {
                summary += 'Issues:\n';
                result.issues.forEach(issue => {
                    summary += `  - [${issue.severity.toUpperCase()}] ${issue.category}: ${issue.issue}\n`;
                });
            }
            
            summary += '-'.repeat(40) + '\n';
        });

        // Add critical issues summary
        const criticalIssues = [];
        Object.values(this.results.agentResults).forEach(result => {
            result.issues.forEach(issue => {
                if (issue.severity === 'critical' || issue.severity === 'high') {
                    criticalIssues.push({
                        agentId: result.agentId,
                        ...issue
                    });
                }
            });
        });

        if (criticalIssues.length > 0) {
            summary += `
${'='.repeat(60)}
CRITICAL/HIGH SEVERITY ISSUES
${'='.repeat(60)}
`;
            criticalIssues.forEach(issue => {
                summary += `Agent ${issue.agentId}: [${issue.severity.toUpperCase()}] ${issue.category} - ${issue.issue}\n`;
            });
        }

        return summary;
    }
}

// Run tests if executed directly
if (require.main === module) {
    const tester = new ComprehensiveAgentTestRunner();
    
    console.log('🔧 ScaleOps6 Comprehensive Agent Test Runner');
    console.log('Testing all 96 agents across all functionality areas...\n');
    
    tester.testAllAgents()
        .then(results => {
            console.log('\n✅ Testing complete!');
            process.exit(results.failed > 0 ? 1 : 0);
        })
        .catch(error => {
            console.error('\n❌ Test runner failed:', error);
            process.exit(1);
        });
}

module.exports = ComprehensiveAgentTestRunner;
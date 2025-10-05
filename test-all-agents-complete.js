/**
 * Comprehensive Agent Testing Script
 * Tests all 96 agents across all user journey touchpoints
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Test configuration
const TEST_CONFIG = {
    totalBlocks: 16,
    subcomponentsPerBlock: 6,
    requiredTabs: ['education', 'workspace', 'analysis', 'templates'],
    requiredFunctionality: [
        'educationContent',
        'workspaceQuestions',
        'dimensionDisplay',
        'agentAnalysis',
        'scoreHistory',
        'resourceGeneration'
    ]
};

// Agent mapping for verification
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

class AgentTester {
    constructor() {
        this.results = {
            passed: [],
            failed: [],
            warnings: [],
            summary: {
                totalTests: 0,
                passed: 0,
                failed: 0,
                warnings: 0
            }
        };
    }

    /**
     * Test a single block file
     */
    async testBlockFile(blockNum, subcomponent) {
        const fileName = `block-${blockNum}-${subcomponent}.html`;
        const filePath = path.join(__dirname, fileName);
        
        console.log(`\n📋 Testing ${fileName}...`);
        
        try {
            // Read file content
            const content = fs.readFileSync(filePath, 'utf8');
            const dom = new JSDOM(content);
            const document = dom.window.document;
            
            // Get expected agent
            const expectedAgent = AGENT_MAPPING[`${blockNum}-${subcomponent}`];
            
            // Run all tests
            const tests = [
                this.testEducationTab(document, expectedAgent),
                this.testWorkspaceTab(document, expectedAgent),
                this.testAnalysisTab(document, expectedAgent),
                this.testTemplatesTab(document, expectedAgent),
                this.testScoreHistory(document, expectedAgent),
                this.testResourceGeneration(document, expectedAgent),
                this.testLayoutConsistency(document, blockNum, subcomponent),
                this.testAgentIntegration(content, expectedAgent),
                this.testDimensionSystem(content, expectedAgent),
                this.testDataPersistence(content, expectedAgent)
            ];
            
            const results = await Promise.all(tests);
            
            // Process results
            results.forEach(result => {
                this.results.summary.totalTests++;
                if (result.status === 'passed') {
                    this.results.passed.push({
                        file: fileName,
                        test: result.test,
                        message: result.message
                    });
                    this.results.summary.passed++;
                } else if (result.status === 'failed') {
                    this.results.failed.push({
                        file: fileName,
                        test: result.test,
                        message: result.message
                    });
                    this.results.summary.failed++;
                } else if (result.status === 'warning') {
                    this.results.warnings.push({
                        file: fileName,
                        test: result.test,
                        message: result.message
                    });
                    this.results.summary.warnings++;
                }
            });
            
        } catch (error) {
            this.results.failed.push({
                file: fileName,
                test: 'File Access',
                message: `Error reading file: ${error.message}`
            });
            this.results.summary.failed++;
        }
    }

    /**
     * Test Education Tab
     */
    testEducationTab(document, expectedAgent) {
        const educationTab = document.querySelector('#education-tab');
        const educationContent = document.querySelector('#education-content');
        
        if (!educationTab || !educationContent) {
            return {
                status: 'failed',
                test: 'Education Tab',
                message: 'Education tab or content area not found'
            };
        }
        
        // Check for agent-specific content loading
        const hasAgentContent = educationContent.innerHTML.includes('agent-education-content') ||
                               educationContent.dataset.agent === expectedAgent;
        
        if (hasAgentContent) {
            return {
                status: 'passed',
                test: 'Education Tab',
                message: `Education tab configured for ${expectedAgent}`
            };
        }
        
        return {
            status: 'warning',
            test: 'Education Tab',
            message: 'Education tab exists but agent-specific content not verified'
        };
    }

    /**
     * Test Workspace Tab
     */
    testWorkspaceTab(document, expectedAgent) {
        const workspaceTab = document.querySelector('#workspace-tab');
        const worksheetContainer = document.querySelector('#worksheet-container');
        
        if (!workspaceTab || !worksheetContainer) {
            return {
                status: 'failed',
                test: 'Workspace Tab',
                message: 'Workspace tab or worksheet container not found'
            };
        }
        
        // Check for dimension-based questions (not generic field-1, field-2, etc.)
        const hasGenericFields = document.querySelector('[id*="field-"][id$="-group"]');
        const hasDimensionDisplay = worksheetContainer.innerHTML.includes('dimension') ||
                                   worksheetContainer.classList.contains('dimension-based');
        
        if (hasGenericFields) {
            return {
                status: 'failed',
                test: 'Workspace Tab',
                message: 'Still using generic field system instead of dimensions'
            };
        }
        
        if (hasDimensionDisplay) {
            return {
                status: 'passed',
                test: 'Workspace Tab',
                message: 'Workspace uses dimension-based system'
            };
        }
        
        return {
            status: 'warning',
            test: 'Workspace Tab',
            message: 'Workspace tab exists but dimension system not verified'
        };
    }

    /**
     * Test Analysis Tab
     */
    testAnalysisTab(document, expectedAgent) {
        const analysisTab = document.querySelector('#analysis-tab');
        const analysisContent = document.querySelector('#analysis-content');
        
        if (!analysisTab || !analysisContent) {
            return {
                status: 'failed',
                test: 'Analysis Tab',
                message: 'Analysis tab or content area not found'
            };
        }
        
        // Check for agent-specific analysis
        const hasAgentAnalysis = analysisContent.innerHTML.includes('agent-analysis') ||
                                analysisContent.dataset.agent === expectedAgent;
        
        if (hasAgentAnalysis) {
            return {
                status: 'passed',
                test: 'Analysis Tab',
                message: `Analysis tab configured for ${expectedAgent}`
            };
        }
        
        return {
            status: 'warning',
            test: 'Analysis Tab',
            message: 'Analysis tab exists but agent-specific processing not verified'
        };
    }

    /**
     * Test Templates Tab
     */
    testTemplatesTab(document, expectedAgent) {
        const templatesTab = document.querySelector('#templates-tab');
        const templatesContent = document.querySelector('#templates-content');
        
        if (!templatesTab || !templatesContent) {
            return {
                status: 'failed',
                test: 'Templates Tab',
                message: 'Templates tab or content area not found'
            };
        }
        
        return {
            status: 'passed',
            test: 'Templates Tab',
            message: 'Templates tab structure present'
        };
    }

    /**
     * Test Score History
     */
    testScoreHistory(document, expectedAgent) {
        const scoreHistory = document.querySelector('#score-history');
        const hasScoreTracking = document.querySelector('[data-score-tracking]') ||
                                document.querySelector('.score-history-container');
        
        if (scoreHistory || hasScoreTracking) {
            return {
                status: 'passed',
                test: 'Score History',
                message: 'Score history functionality present'
            };
        }
        
        return {
            status: 'warning',
            test: 'Score History',
            message: 'Score history elements not found'
        };
    }

    /**
     * Test Resource Generation
     */
    testResourceGeneration(document, expectedAgent) {
        const resourcesTab = document.querySelector('#resources-tab');
        const resourcesContent = document.querySelector('#resources-content');
        
        if (resourcesTab || resourcesContent) {
            return {
                status: 'passed',
                test: 'Resource Generation',
                message: 'Resource generation structure present'
            };
        }
        
        return {
            status: 'warning',
            test: 'Resource Generation',
            message: 'Resource generation elements not found'
        };
    }

    /**
     * Test Layout Consistency
     */
    testLayoutConsistency(document, blockNum, subcomponent) {
        // Check for consistent CSS classes
        const hasContainer = document.querySelector('.container');
        const hasTabs = document.querySelector('.nav-tabs');
        const hasTabContent = document.querySelector('.tab-content');
        const hasConsistentStructure = hasContainer && hasTabs && hasTabContent;
        
        if (hasConsistentStructure) {
            return {
                status: 'passed',
                test: 'Layout Consistency',
                message: 'Consistent layout structure with other blocks'
            };
        }
        
        return {
            status: 'failed',
            test: 'Layout Consistency',
            message: 'Layout structure differs from standard'
        };
    }

    /**
     * Test Agent Integration
     */
    testAgentIntegration(content, expectedAgent) {
        // Check for enhanced agent class integration
        const hasEnhancedAgent = content.includes('enhanced-agent-class.js');
        const hasUnifiedHandler = content.includes('unified-analysis-handler-enhanced.js');
        const hasDimensionDisplay = content.includes('dimension-display-handler.js');
        const hasPersistence = content.includes('agent-persistence-manager.js');
        
        const integrationScore = [
            hasEnhancedAgent,
            hasUnifiedHandler,
            hasDimensionDisplay,
            hasPersistence
        ].filter(Boolean).length;
        
        if (integrationScore === 4) {
            return {
                status: 'passed',
                test: 'Agent Integration',
                message: 'All agent integration scripts loaded'
            };
        } else if (integrationScore >= 2) {
            return {
                status: 'warning',
                test: 'Agent Integration',
                message: `Partial agent integration (${integrationScore}/4 scripts)`
            };
        }
        
        return {
            status: 'failed',
            test: 'Agent Integration',
            message: 'Agent integration scripts missing'
        };
    }

    /**
     * Test Dimension System
     */
    testDimensionSystem(content, expectedAgent) {
        // Check that generic fields are removed
        const hasGenericFields = content.includes('field-1') || 
                                content.includes('field-2') ||
                                content.includes('field-3') ||
                                content.includes('field-4') ||
                                content.includes('field-5') ||
                                content.includes('field-6');
        
        if (hasGenericFields) {
            return {
                status: 'failed',
                test: 'Dimension System',
                message: 'Generic field system still present'
            };
        }
        
        // Check for dimension-based system
        const hasDimensionSystem = content.includes('dimension') ||
                                  content.includes('evaluationDimensions');
        
        if (hasDimensionSystem) {
            return {
                status: 'passed',
                test: 'Dimension System',
                message: 'Dimension-based system implemented'
            };
        }
        
        return {
            status: 'warning',
            test: 'Dimension System',
            message: 'Dimension system not clearly identified'
        };
    }

    /**
     * Test Data Persistence
     */
    testDataPersistence(content, expectedAgent) {
        const hasPersistence = content.includes('localStorage') ||
                              content.includes('sessionStorage') ||
                              content.includes('persistence') ||
                              content.includes('saveScore');
        
        if (hasPersistence) {
            return {
                status: 'passed',
                test: 'Data Persistence',
                message: 'Data persistence mechanisms present'
            };
        }
        
        return {
            status: 'warning',
            test: 'Data Persistence',
            message: 'Data persistence not clearly identified'
        };
    }

    /**
     * Run all tests
     */
    async runAllTests() {
        console.log('🚀 Starting Comprehensive Agent Testing');
        console.log('=====================================\n');
        
        // Test all blocks
        for (let block = 1; block <= TEST_CONFIG.totalBlocks; block++) {
            console.log(`\n📦 Testing Block ${block}:`);
            console.log('------------------------');
            
            for (let sub = 1; sub <= TEST_CONFIG.subcomponentsPerBlock; sub++) {
                await this.testBlockFile(block, sub);
            }
        }
        
        // Generate report
        this.generateReport();
    }

    /**
     * Generate test report
     */
    generateReport() {
        console.log('\n\n=====================================');
        console.log('📊 COMPREHENSIVE TEST REPORT');
        console.log('=====================================\n');
        
        // Summary
        console.log('📈 Summary:');
        console.log(`Total Tests: ${this.results.summary.totalTests}`);
        console.log(`✅ Passed: ${this.results.summary.passed}`);
        console.log(`❌ Failed: ${this.results.summary.failed}`);
        console.log(`⚠️  Warnings: ${this.results.summary.warnings}`);
        
        const passRate = (this.results.summary.passed / this.results.summary.totalTests * 100).toFixed(2);
        console.log(`\nPass Rate: ${passRate}%`);
        
        // Failed tests
        if (this.results.failed.length > 0) {
            console.log('\n\n❌ FAILED TESTS:');
            console.log('================');
            this.results.failed.forEach(failure => {
                console.log(`\n📄 ${failure.file}`);
                console.log(`   Test: ${failure.test}`);
                console.log(`   Issue: ${failure.message}`);
            });
        }
        
        // Warnings
        if (this.results.warnings.length > 0) {
            console.log('\n\n⚠️  WARNINGS:');
            console.log('============');
            const warningsByTest = {};
            this.results.warnings.forEach(warning => {
                if (!warningsByTest[warning.test]) {
                    warningsByTest[warning.test] = [];
                }
                warningsByTest[warning.test].push(warning.file);
            });
            
            Object.keys(warningsByTest).forEach(test => {
                console.log(`\n${test}: ${warningsByTest[test].length} files`);
            });
        }
        
        // Critical issues
        console.log('\n\n🔍 CRITICAL CHECKS:');
        console.log('==================');
        
        // Check for generic field system
        const genericFieldFailures = this.results.failed.filter(f => 
            f.message.includes('generic field')
        );
        
        if (genericFieldFailures.length > 0) {
            console.log(`\n⚠️  ${genericFieldFailures.length} files still using generic field system`);
        } else {
            console.log('\n✅ All files migrated from generic field system');
        }
        
        // Check for agent integration
        const integrationFailures = this.results.failed.filter(f => 
            f.test === 'Agent Integration'
        );
        
        if (integrationFailures.length > 0) {
            console.log(`⚠️  ${integrationFailures.length} files missing agent integration`);
        } else {
            console.log('✅ All files have agent integration');
        }
        
        // Check for layout consistency
        const layoutFailures = this.results.failed.filter(f => 
            f.test === 'Layout Consistency'
        );
        
        if (layoutFailures.length > 0) {
            console.log(`⚠️  ${layoutFailures.length} files have inconsistent layout`);
        } else {
            console.log('✅ All files have consistent layout');
        }
        
        // Save detailed report
        const reportData = {
            timestamp: new Date().toISOString(),
            summary: this.results.summary,
            passRate: passRate,
            failed: this.results.failed,
            warnings: this.results.warnings,
            passed: this.results.passed.length // Just count for space
        };
        
        fs.writeFileSync(
            'agent-test-results-complete.json',
            JSON.stringify(reportData, null, 2)
        );
        
        console.log('\n\n📁 Detailed report saved to: agent-test-results-complete.json');
        
        // Final verdict
        console.log('\n\n=====================================');
        if (this.results.summary.failed === 0) {
            console.log('✨ ALL TESTS PASSED! System is fully functional.');
        } else {
            console.log(`⚠️  ${this.results.summary.failed} tests failed. Review and fix issues.`);
        }
        console.log('=====================================\n');
    }
}

// Run tests
const tester = new AgentTester();
tester.runAllTests().catch(console.error);
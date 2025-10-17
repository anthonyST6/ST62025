/**
 * SSOT Validation Test Suite
 * Comprehensive testing for all 96 subcomponents
 * Ensures SSOT alignment across the entire system
 */

(function() {
    'use strict';

    console.log('🧪 SSOT Validation Test Suite v1.0.0');

    class SSOTValidationTestSuite {
        constructor() {
            this.results = {
                total: 96,
                tested: 0,
                passed: 0,
                failed: 0,
                errors: [],
                warnings: [],
                details: {},
                startTime: null,
                endTime: null
            };
            
            this.testCases = this.generateTestCases();
            this.currentTest = 0;
        }

        /**
         * Generate test cases for all 96 subcomponents
         */
        generateTestCases() {
            const testCases = [];
            
            for (let block = 1; block <= 16; block++) {
                for (let sub = 1; sub <= 6; sub++) {
                    testCases.push({
                        id: `${block}-${sub}`,
                        blockId: block,
                        subId: sub,
                        tests: [
                            'loadData',
                            'validateStructure',
                            'checkTitle',
                            'checkAgent',
                            'checkExamples',
                            'checkTemplates',
                            'checkEducation',
                            'checkWorkspace',
                            'checkResources',
                            'checkAPIConsistency'
                        ]
                    });
                }
            }
            
            return testCases;
        }

        /**
         * Run all tests
         */
        async runAllTests() {
            console.log('🚀 Starting comprehensive SSOT validation...');
            this.results.startTime = Date.now();
            
            for (const testCase of this.testCases) {
                await this.runTestCase(testCase);
                this.currentTest++;
                
                // Progress update
                if (this.currentTest % 10 === 0) {
                    console.log(`📊 Progress: ${this.currentTest}/96 subcomponents tested`);
                }
            }
            
            this.results.endTime = Date.now();
            this.generateReport();
            
            return this.results;
        }

        /**
         * Run a single test case
         */
        async runTestCase(testCase) {
            const testResult = {
                id: testCase.id,
                passed: true,
                tests: {},
                errors: [],
                warnings: []
            };
            
            try {
                // Load SSOT data
                const ssotData = await this.loadSSOTData(testCase.id);
                
                if (!ssotData) {
                    testResult.passed = false;
                    testResult.errors.push('Failed to load SSOT data');
                    this.results.failed++;
                } else {
                    // Run individual tests
                    for (const test of testCase.tests) {
                        const result = await this.runTest(test, ssotData, testCase.id);
                        testResult.tests[test] = result;
                        
                        if (!result.passed) {
                            testResult.passed = false;
                            testResult.errors.push(`${test}: ${result.error}`);
                        }
                        
                        if (result.warning) {
                            testResult.warnings.push(`${test}: ${result.warning}`);
                        }
                    }
                    
                    if (testResult.passed) {
                        this.results.passed++;
                    } else {
                        this.results.failed++;
                    }
                }
                
            } catch (error) {
                testResult.passed = false;
                testResult.errors.push(`Exception: ${error.message}`);
                this.results.failed++;
                this.results.errors.push({
                    subcomponent: testCase.id,
                    error: error.message
                });
            }
            
            this.results.tested++;
            this.results.details[testCase.id] = testResult;
            
            return testResult;
        }

        /**
         * Load SSOT data for a subcomponent
         */
        async loadSSOTData(subcomponentId) {
            try {
                const response = await fetch(`/api/subcomponents/${subcomponentId}`);
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                return await response.json();
            } catch (error) {
                console.error(`❌ Failed to load SSOT data for ${subcomponentId}:`, error);
                return null;
            }
        }

        /**
         * Run individual test
         */
        async runTest(testName, ssotData, subcomponentId) {
            const result = {
                passed: true,
                error: null,
                warning: null,
                details: {}
            };
            
            switch (testName) {
                case 'loadData':
                    result.passed = !!ssotData;
                    if (!result.passed) {
                        result.error = 'No SSOT data available';
                    }
                    break;
                    
                case 'validateStructure':
                    result.passed = this.validateStructure(ssotData);
                    if (!result.passed) {
                        result.error = 'Invalid SSOT structure';
                    }
                    break;
                    
                case 'checkTitle':
                    if (!ssotData.name) {
                        result.passed = false;
                        result.error = 'Missing title/name';
                    } else {
                        result.details.title = ssotData.name;
                    }
                    break;
                    
                case 'checkAgent':
                    if (!ssotData.agent) {
                        result.passed = false;
                        result.error = 'Missing agent';
                    } else {
                        result.details.agent = ssotData.agent;
                    }
                    break;
                    
                case 'checkExamples':
                    if (!ssotData.education || !ssotData.education.examples) {
                        result.warning = 'No examples found';
                        result.details.examplesCount = 0;
                    } else {
                        const count = ssotData.education.examples.length;
                        result.details.examplesCount = count;
                        if (count === 0) {
                            result.warning = 'Empty examples array';
                        } else if (count < 3) {
                            result.warning = `Only ${count} examples (recommend 3+)`;
                        }
                    }
                    break;
                    
                case 'checkTemplates':
                    if (!ssotData.resources || !ssotData.resources.templates) {
                        result.passed = false;
                        result.error = 'No templates found';
                        result.details.templatesCount = 0;
                    } else {
                        const count = ssotData.resources.templates.length;
                        result.details.templatesCount = count;
                        if (count === 0) {
                            result.passed = false;
                            result.error = 'Empty templates array';
                        } else if (count !== 3) {
                            result.warning = `${count} templates (expected 3)`;
                        }
                    }
                    break;
                    
                case 'checkEducation':
                    if (!ssotData.education) {
                        result.passed = false;
                        result.error = 'Missing education section';
                    } else {
                        const edu = ssotData.education;
                        if (!edu.what || !edu.why || !edu.how) {
                            result.warning = 'Incomplete education content';
                        }
                        result.details.hasEducation = true;
                    }
                    break;
                    
                case 'checkWorkspace':
                    if (!ssotData.workspace) {
                        result.warning = 'No workspace configuration';
                    } else {
                        result.details.hasWorkspace = true;
                    }
                    break;
                    
                case 'checkResources':
                    if (!ssotData.resources) {
                        result.passed = false;
                        result.error = 'Missing resources section';
                    } else {
                        result.details.hasResources = true;
                    }
                    break;
                    
                case 'checkAPIConsistency':
                    // Check if outputs match resources
                    if (ssotData.outputs && ssotData.resources) {
                        const outputTemplates = ssotData.outputs.templates || [];
                        const resourceTemplates = ssotData.resources.templates || [];
                        
                        if (JSON.stringify(outputTemplates) !== JSON.stringify(resourceTemplates)) {
                            result.warning = 'Output templates don\'t match resource templates';
                        }
                    }
                    break;
                    
                default:
                    result.warning = `Unknown test: ${testName}`;
            }
            
            return result;
        }

        /**
         * Validate SSOT structure
         */
        validateStructure(data) {
            const requiredFields = ['id', 'name', 'agent'];
            return requiredFields.every(field => data.hasOwnProperty(field));
        }

        /**
         * Generate test report
         */
        generateReport() {
            const duration = (this.results.endTime - this.results.startTime) / 1000;
            const passRate = (this.results.passed / this.results.tested * 100).toFixed(2);
            
            console.log('\n' + '='.repeat(60));
            console.log('📊 SSOT VALIDATION TEST REPORT');
            console.log('='.repeat(60));
            console.log(`Total Subcomponents: ${this.results.total}`);
            console.log(`Tested: ${this.results.tested}`);
            console.log(`Passed: ${this.results.passed} ✅`);
            console.log(`Failed: ${this.results.failed} ❌`);
            console.log(`Pass Rate: ${passRate}%`);
            console.log(`Duration: ${duration}s`);
            console.log('='.repeat(60));
            
            // Show failures
            if (this.results.failed > 0) {
                console.log('\n❌ FAILED SUBCOMPONENTS:');
                Object.entries(this.results.details).forEach(([id, result]) => {
                    if (!result.passed) {
                        console.log(`  ${id}: ${result.errors.join(', ')}`);
                    }
                });
            }
            
            // Show warnings
            const warningCount = Object.values(this.results.details)
                .reduce((sum, r) => sum + (r.warnings ? r.warnings.length : 0), 0);
            
            if (warningCount > 0) {
                console.log(`\n⚠️ WARNINGS (${warningCount} total):`);
                Object.entries(this.results.details).forEach(([id, result]) => {
                    if (result.warnings && result.warnings.length > 0) {
                        console.log(`  ${id}: ${result.warnings.join(', ')}`);
                    }
                });
            }
            
            // Summary statistics
            console.log('\n📈 STATISTICS:');
            
            // Count examples
            const exampleStats = this.calculateStats('examplesCount');
            console.log(`  Examples: avg=${exampleStats.avg}, min=${exampleStats.min}, max=${exampleStats.max}`);
            
            // Count templates
            const templateStats = this.calculateStats('templatesCount');
            console.log(`  Templates: avg=${templateStats.avg}, min=${templateStats.min}, max=${templateStats.max}`);
            
            console.log('\n' + '='.repeat(60));
            
            // Save report to window for access
            window.SSOTTestResults = this.results;
            console.log('💾 Full results saved to window.SSOTTestResults');
        }

        /**
         * Calculate statistics for a metric
         */
        calculateStats(metric) {
            const values = [];
            
            Object.values(this.results.details).forEach(result => {
                Object.values(result.tests).forEach(test => {
                    if (test.details && test.details[metric] !== undefined) {
                        values.push(test.details[metric]);
                    }
                });
            });
            
            if (values.length === 0) {
                return { avg: 0, min: 0, max: 0 };
            }
            
            return {
                avg: (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2),
                min: Math.min(...values),
                max: Math.max(...values)
            };
        }

        /**
         * Test a specific subcomponent
         */
        async testSubcomponent(id) {
            console.log(`🧪 Testing subcomponent ${id}...`);
            
            const testCase = {
                id: id,
                tests: [
                    'loadData',
                    'validateStructure',
                    'checkTitle',
                    'checkAgent',
                    'checkExamples',
                    'checkTemplates',
                    'checkEducation',
                    'checkWorkspace',
                    'checkResources',
                    'checkAPIConsistency'
                ]
            };
            
            const result = await this.runTestCase(testCase);
            
            console.log(result.passed ? '✅ PASSED' : '❌ FAILED');
            
            if (result.errors.length > 0) {
                console.log('Errors:', result.errors);
            }
            
            if (result.warnings.length > 0) {
                console.log('Warnings:', result.warnings);
            }
            
            return result;
        }

        /**
         * Quick validation check
         */
        async quickCheck() {
            console.log('⚡ Running quick validation check...');
            
            // Test a sample of subcomponents
            const sample = ['1-1', '2-1', '5-3', '8-4', '12-6', '16-1'];
            const results = [];
            
            for (const id of sample) {
                const result = await this.testSubcomponent(id);
                results.push({
                    id: id,
                    passed: result.passed
                });
            }
            
            const passed = results.filter(r => r.passed).length;
            console.log(`\n📊 Quick Check: ${passed}/${sample.length} passed`);
            
            return results;
        }
    }

    // Create global test interface
    window.SSOTTest = {
        suite: null,
        
        // Run all tests
        runAll: async function() {
            this.suite = new SSOTValidationTestSuite();
            return await this.suite.runAllTests();
        },
        
        // Test specific subcomponent
        test: async function(id) {
            if (!this.suite) {
                this.suite = new SSOTValidationTestSuite();
            }
            return await this.suite.testSubcomponent(id);
        },
        
        // Quick validation
        quick: async function() {
            if (!this.suite) {
                this.suite = new SSOTValidationTestSuite();
            }
            return await this.suite.quickCheck();
        },
        
        // Get results
        results: function() {
            return this.suite ? this.suite.results : null;
        },
        
        // Export results
        export: function() {
            if (!this.suite || !this.suite.results) {
                console.error('No test results available');
                return;
            }
            
            const blob = new Blob([JSON.stringify(this.suite.results, null, 2)], {
                type: 'application/json'
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `ssot-test-results-${Date.now()}.json`;
            a.click();
            URL.revokeObjectURL(url);
            
            console.log('✅ Results exported');
        }
    };

    console.log('📝 SSOT Test Suite Commands:');
    console.log('   SSOTTest.runAll() - Test all 96 subcomponents');
    console.log('   SSOTTest.test("2-1") - Test specific subcomponent');
    console.log('   SSOTTest.quick() - Quick validation check');
    console.log('   SSOTTest.results() - Get test results');
    console.log('   SSOTTest.export() - Export results to JSON');

})();
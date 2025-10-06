/**
 * Manual Agent Routing Test
 * Quick verification of agent assignments without puppeteer
 */

const http = require('http');
const { agentMapping } = require('./agent-subcomponent-mapping.js');
const SUBCOMPONENT_NAMES = require('./subcomponent-names-mapping.js');

// Test specific problematic subcomponents
const TEST_CASES = [
    { id: '2-1', expectedName: 'Jobs to be Done', expectedAgent: 'JTBD Specialist' },
    { id: '2-2', expectedName: 'Personas Framework', expectedAgent: 'Persona Framework Builder' },
    { id: '2-3', expectedName: 'Interview Cadence', expectedAgent: 'Interview Cadence Analyzer' },
    { id: '2-4', expectedName: 'Pain Point Mapping', expectedAgent: 'Pain Point Mapper' },
    { id: '2-5', expectedName: 'Insight Action', expectedAgent: 'Signal Grader' },
    { id: '2-6', expectedName: 'Customer Journey', expectedAgent: 'Insight Loop Manager' },
    // Add a few from other blocks to verify
    { id: '1-1', expectedName: 'Problem Statement Definition', expectedAgent: 'Problem Definition Evaluator' },
    { id: '3-1', expectedName: 'Use Case Prioritization', expectedAgent: 'Use Case Scorer' },
    { id: '4-1', expectedName: 'MVP Definition', expectedAgent: 'Feature Matrix Builder' }
];

function testSubcomponent(subcomponentId) {
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

        req.end();
    });
}

async function runTests() {
    console.log('🧪 AGENT ROUTING MANUAL TEST');
    console.log('=' .repeat(60));
    console.log('Testing key subcomponents for correct agent assignment...\n');

    let passed = 0;
    let failed = 0;

    for (const testCase of TEST_CASES) {
        try {
            const result = await testSubcomponent(testCase.id);
            
            const actualAgent = result.agent?.name || 'Unknown';
            const actualName = SUBCOMPONENT_NAMES[testCase.id];
            const mappedAgent = agentMapping[testCase.id];
            
            console.log(`\nTesting ${testCase.id}: ${testCase.expectedName}`);
            console.log('-'.repeat(40));
            console.log(`Expected Agent: ${testCase.expectedAgent}`);
            console.log(`Mapped Agent:   ${mappedAgent?.name || 'Not found'}`);
            console.log(`API Response:   ${actualAgent}`);
            
            if (mappedAgent?.name === testCase.expectedAgent && 
                actualAgent === testCase.expectedAgent &&
                actualName === testCase.expectedName) {
                console.log(`✅ PASSED - All components match correctly`);
                passed++;
            } else {
                console.log(`❌ FAILED - Mismatch detected`);
                if (mappedAgent?.name !== testCase.expectedAgent) {
                    console.log(`   Issue: Mapping file has wrong agent`);
                }
                if (actualAgent !== testCase.expectedAgent) {
                    console.log(`   Issue: API returning wrong agent`);
                }
                if (actualName !== testCase.expectedName) {
                    console.log(`   Issue: Subcomponent name mismatch`);
                }
                failed++;
            }
            
        } catch (error) {
            console.log(`\n❌ Error testing ${testCase.id}: ${error.message}`);
            failed++;
        }
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST SUMMARY');
    console.log(`✅ Passed: ${passed}/${TEST_CASES.length}`);
    console.log(`❌ Failed: ${failed}/${TEST_CASES.length}`);
    
    if (passed === TEST_CASES.length) {
        console.log('\n🎉 All tests passed! Agent routing is working correctly.');
    } else {
        console.log('\n⚠️  Some tests failed. Review the mapping configuration.');
    }
    
    // Also verify the mapping file directly
    console.log('\n📋 DIRECT MAPPING VERIFICATION:');
    console.log('-'.repeat(40));
    console.log('Block 2 mappings from agent-subcomponent-mapping.js:');
    for (let i = 1; i <= 6; i++) {
        const id = `2-${i}`;
        const agent = agentMapping[id];
        const subName = SUBCOMPONENT_NAMES[id];
        console.log(`  ${id}: ${subName} → ${agent?.name || 'Missing'}`);
    }
}

// Run the tests
runTests().catch(console.error);
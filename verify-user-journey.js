// Comprehensive User Journey Verification Script
// Tests: Workspace → Analysis → Score History → Resources → Output

const http = require('http');

// Test configuration
const BASE_URL = 'http://localhost:3001';
const SUBCOMPONENT_ID = '1-1';
const TEST_ANSWERS = {
    '1-1-q1': 'Test problem statement',
    '1-1-q2': 'Test solution approach',
    '1-1-q3': 'Test evidence',
    '1-1-q4': 'Test vision',
    '1-1-q5': 'Test goals',
    '1-1-q6': 'Test next steps'
};

// Helper function to make HTTP requests
function makeRequest(options, postData = null) {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const result = res.statusCode === 200 ? 
                        (data ? JSON.parse(data) : { success: true }) : 
                        { error: `Status ${res.statusCode}`, data };
                    resolve(result);
                } catch (e) {
                    resolve({ statusCode: res.statusCode, body: data });
                }
            });
        });
        
        req.on('error', reject);
        
        if (postData) {
            req.write(postData);
        }
        req.end();
    });
}

async function runTests() {
    console.log('🔍 COMPREHENSIVE USER JOURNEY VERIFICATION\n');
    console.log('=' .repeat(50));
    
    let allTestsPassed = true;
    const results = {
        workspace: false,
        analysis: false,
        scoreHistory: false,
        resources: false,
        output: false
    };
    
    try {
        // Test 1: Workspace - Get questions
        console.log('\n📝 TEST 1: WORKSPACE TAB');
        console.log('-'.repeat(30));
        
        const workspaceResponse = await makeRequest({
            hostname: 'localhost',
            port: 3001,
            path: `/api/subcomponents/${SUBCOMPONENT_ID}`,
            method: 'GET'
        });
        
        if (workspaceResponse.questions && workspaceResponse.questions.length > 0) {
            console.log('✅ Workspace questions loaded successfully');
            console.log(`   - ${workspaceResponse.questions.length} questions found`);
            console.log(`   - Agent: ${workspaceResponse.agentName}`);
            results.workspace = true;
        } else {
            console.log('❌ Failed to load workspace questions');
            allTestsPassed = false;
        }
        
        // Test 2: Analysis - Submit answers and get results
        console.log('\n📊 TEST 2: ANALYSIS TAB');
        console.log('-'.repeat(30));
        
        const analysisData = JSON.stringify({
            subcomponentId: SUBCOMPONENT_ID,
            responses: TEST_ANSWERS
        });
        
        const analysisResponse = await makeRequest({
            hostname: 'localhost',
            port: 3001,
            path: '/api/analysis',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': analysisData.length
            }
        }, analysisData);
        
        if (analysisResponse.overallScore !== undefined) {
            console.log('✅ Analysis completed successfully');
            console.log(`   - Overall Score: ${analysisResponse.overallScore}`);
            console.log(`   - Strengths: ${analysisResponse.strengths?.length || 0} items`);
            console.log(`   - Weaknesses: ${analysisResponse.weaknesses?.length || 0} items`);
            results.analysis = true;
        } else {
            console.log('❌ Analysis failed:', analysisResponse.error || 'Unknown error');
            allTestsPassed = false;
        }
        
        // Test 3: Score History - Check if saved
        console.log('\n📈 TEST 3: SCORE HISTORY TAB');
        console.log('-'.repeat(30));
        
        // Wait a moment for database write
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const historyResponse = await makeRequest({
            hostname: 'localhost',
            port: 3001,
            path: `/api/score-history-db/${SUBCOMPONENT_ID}`,
            method: 'GET'
        });
        
        if (Array.isArray(historyResponse) && historyResponse.length > 0) {
            console.log('✅ Score history saved and retrieved');
            console.log(`   - ${historyResponse.length} history entries found`);
            console.log(`   - Latest score: ${historyResponse[0].overall_score || historyResponse[0].score}`);
            results.scoreHistory = true;
        } else {
            console.log('❌ Score history not saved or retrieved');
            allTestsPassed = false;
        }
        
        // Test 4: Resources - Check templates
        console.log('\n📚 TEST 4: RESOURCES TAB');
        console.log('-'.repeat(30));
        
        const templatesResponse = await makeRequest({
            hostname: 'localhost',
            port: 3001,
            path: `/api/templates/${SUBCOMPONENT_ID}`,
            method: 'GET'
        });
        
        if (Array.isArray(templatesResponse)) {
            console.log('✅ Resources/Templates endpoint working');
            console.log(`   - ${templatesResponse.length} templates available`);
            
            // Test PDF generation
            const pdfResponse = await makeRequest({
                hostname: 'localhost',
                port: 3001,
                path: `/api/generate-pdf/${SUBCOMPONENT_ID}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }, JSON.stringify({ analysisData: analysisResponse }));
            
            if (pdfResponse.success || pdfResponse.filename) {
                console.log('✅ PDF generation working');
                results.resources = true;
            } else {
                console.log('⚠️  PDF generation issue');
            }
        } else {
            console.log('❌ Resources/Templates not accessible');
            allTestsPassed = false;
        }
        
        // Test 5: Output - Check recommendations
        console.log('\n🎯 TEST 5: OUTPUT TAB');
        console.log('-'.repeat(30));
        
        const recommendationsResponse = await makeRequest({
            hostname: 'localhost',
            port: 3001,
            path: `/api/expert-recommendations/${SUBCOMPONENT_ID}`,
            method: 'GET'
        });
        
        if (Array.isArray(recommendationsResponse)) {
            console.log('✅ Expert recommendations endpoint working');
            console.log(`   - ${recommendationsResponse.length} recommendations available`);
            
            // Test document generation
            const docxResponse = await makeRequest({
                hostname: 'localhost',
                port: 3001,
                path: `/api/generate-docx/${SUBCOMPONENT_ID}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }, JSON.stringify({ analysisData: analysisResponse }));
            
            if (docxResponse.success || docxResponse.filename) {
                console.log('✅ DOCX generation working');
                results.output = true;
            } else {
                console.log('⚠️  DOCX generation issue');
            }
        } else {
            console.log('❌ Expert recommendations not accessible');
            allTestsPassed = false;
        }
        
    } catch (error) {
        console.error('\n❌ Test error:', error.message);
        allTestsPassed = false;
    }
    
    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('📋 TEST SUMMARY');
    console.log('='.repeat(50));
    
    Object.entries(results).forEach(([tab, passed]) => {
        const icon = passed ? '✅' : '❌';
        const status = passed ? 'PASSED' : 'FAILED';
        console.log(`${icon} ${tab.toUpperCase().padEnd(15)} ${status}`);
    });
    
    const passedCount = Object.values(results).filter(v => v).length;
    const totalCount = Object.values(results).length;
    
    console.log('\n' + '='.repeat(50));
    if (allTestsPassed && passedCount === totalCount) {
        console.log('🎉 ALL TESTS PASSED! User journey is working correctly!');
    } else {
        console.log(`⚠️  ${passedCount}/${totalCount} tests passed. Some issues need attention.`);
    }
    console.log('='.repeat(50));
    
    return allTestsPassed;
}

// Run the tests
console.log('Starting user journey verification...\n');
runTests().then(success => {
    process.exit(success ? 0 : 1);
}).catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
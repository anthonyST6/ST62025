const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Education Content Display Issue...\n');

// 1. Check if subcomponent-detail.html has the proper functions
console.log('1. Checking subcomponent-detail.html...');
const htmlPath = path.join(__dirname, 'subcomponent-detail.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

const checks = {
    hasUpdateEducationTab: htmlContent.includes('function updateEducationTab'),
    hasSafeDisplayValue: htmlContent.includes('function safeDisplayValue'),
    hasEnhancedEducationScript: htmlContent.includes('enhanced-education-display.js'),
    hasEnhancedResourcesScript: htmlContent.includes('enhanced-resources-output.js'),
    hasProperExampleRendering: htmlContent.includes('Real-World Examples'),
    hasImplementationGrid: htmlContent.includes('implementation-grid')
};

console.log('HTML File Checks:');
Object.entries(checks).forEach(([key, value]) => {
    console.log(`  ${value ? '✅' : '❌'} ${key}`);
});

// 2. Check the API endpoint files
console.log('\n2. Checking API endpoint files...');
const apiFiles = [
    'api-subcomponents.js',
    'educational-content.js',
    'agent-library.js',
    'enhanced-agent-content-loader.js'
];

apiFiles.forEach(file => {
    if (fs.existsSync(file)) {
        const stats = fs.statSync(file);
        console.log(`  ✅ ${file} (${stats.size} bytes)`);
    } else {
        console.log(`  ❌ ${file} NOT FOUND`);
    }
});

// 3. Check if the updateEducationTab function is correct
console.log('\n3. Checking updateEducationTab function...');
const updateEducationTabMatch = htmlContent.match(/function updateEducationTab\(education\)\s*{[\s\S]*?^\s{8}\}/m);
if (updateEducationTabMatch) {
    const functionContent = updateEducationTabMatch[0];
    const functionChecks = {
        handlesWhat: functionContent.includes('education.what'),
        handlesWhy: functionContent.includes('education.why'),
        handlesHow: functionContent.includes('education.how'),
        handlesExamples: functionContent.includes('education.examples'),
        hasProperExampleLoop: functionContent.includes('education.examples.forEach'),
        hasCompanyCheck: functionContent.includes('example.company'),
        hasStoryCheck: functionContent.includes('example.story'),
        hasNoExampleLabels: !functionContent.includes('Example ${index + 1}')
    };
    
    console.log('Function Content Checks:');
    Object.entries(functionChecks).forEach(([key, value]) => {
        console.log(`  ${value ? '✅' : '❌'} ${key}`);
    });
    
    // If missing proper example rendering, show what needs to be fixed
    if (!functionChecks.hasNoExampleLabels || !functionChecks.hasCompanyCheck) {
        console.log('\n⚠️  ISSUE FOUND: Examples section needs updating');
        console.log('The function should render company names, not "Example 1, Example 2"');
    }
} else {
    console.log('  ❌ updateEducationTab function not found!');
}

// 4. Create a test to see what the API actually returns
console.log('\n4. Testing actual education content structure...');
const educationalContent = require('./educational-content.js');
const testSubcomponent = educationalContent.educationalContent['1-1'];

if (testSubcomponent) {
    console.log('  ✅ Found content for subcomponent 1-1');
    console.log('  Structure:');
    console.log(`    - Title: ${testSubcomponent.title}`);
    console.log(`    - What: ${typeof testSubcomponent.what} (${testSubcomponent.what ? 'present' : 'missing'})`);
    console.log(`    - Why: ${typeof testSubcomponent.why} (${testSubcomponent.why ? 'present' : 'missing'})`);
    console.log(`    - How: ${typeof testSubcomponent.how}`);
    if (testSubcomponent.how && typeof testSubcomponent.how === 'object') {
        console.log(`      - Steps: ${testSubcomponent.how.steps ? `Array(${testSubcomponent.how.steps.length})` : 'missing'}`);
        console.log(`      - Best Practices: ${testSubcomponent.how.bestPractices ? `Array(${testSubcomponent.how.bestPractices.length})` : 'missing'}`);
    }
    console.log(`    - Examples: ${Array.isArray(testSubcomponent.examples) ? `Array(${testSubcomponent.examples.length})` : typeof testSubcomponent.examples}`);
    
    if (testSubcomponent.examples && testSubcomponent.examples.length > 0) {
        const firstExample = testSubcomponent.examples[0];
        console.log('    First example structure:');
        if (typeof firstExample === 'object') {
            console.log(`      - Company: ${firstExample.company || 'MISSING'}`);
            console.log(`      - Story: ${firstExample.story ? 'present' : 'MISSING'}`);
            console.log(`      - Impact: ${firstExample.impact ? 'present' : 'optional'}`);
        } else {
            console.log(`      Type: ${typeof firstExample}`);
        }
    }
} else {
    console.log('  ❌ No content found for subcomponent 1-1');
}

// 5. Check if the API endpoint is properly configured
console.log('\n5. Checking API endpoint configuration...');
if (fs.existsSync('api-subcomponents.js')) {
    const apiContent = fs.readFileSync('api-subcomponents.js', 'utf8');
    const apiChecks = {
        importsEducationalContent: apiContent.includes("require('./educational-content')") || apiContent.includes('educational-content'),
        hasGetEndpoint: apiContent.includes('app.get') || apiContent.includes('router.get'),
        returnsEducation: apiContent.includes('education:') || apiContent.includes('education :'),
        mapsEducationalContent: apiContent.includes('educationalContent[')
    };
    
    console.log('API Configuration Checks:');
    Object.entries(apiChecks).forEach(([key, value]) => {
        console.log(`  ${value ? '✅' : '❌'} ${key}`);
    });
    
    if (!apiChecks.returnsEducation) {
        console.log('\n⚠️  CRITICAL ISSUE: API endpoint not returning education field!');
        console.log('The API needs to include: education: educationalContent[subcomponentId]');
    }
}

// 6. Provide fix recommendations
console.log('\n📋 RECOMMENDATIONS:');
console.log('=====================================');

let issuesFound = false;

if (!checks.hasNoExampleLabels) {
    issuesFound = true;
    console.log('\n1. Fix Example Labels Issue:');
    console.log('   The examples are showing "Example 1, Example 2" instead of company names.');
    console.log('   Run: node fix-all-blocks-education.js');
}

if (!apiChecks.returnsEducation) {
    issuesFound = true;
    console.log('\n2. Fix API Endpoint:');
    console.log('   The API needs to return the education field.');
    console.log('   Check api-subcomponents.js and ensure it includes:');
    console.log('   education: educationalContent[subcomponentId]');
}

if (!checks.hasEnhancedEducationScript) {
    issuesFound = true;
    console.log('\n3. Add Enhanced Education Script:');
    console.log('   Add <script src="enhanced-education-display.js"></script>');
    console.log('   before the closing </body> tag');
}

if (!issuesFound) {
    console.log('\n✅ All checks passed! The education content should be displaying correctly.');
    console.log('\nIf you\'re still not seeing content, check:');
    console.log('1. Browser console for JavaScript errors');
    console.log('2. Network tab to see if API calls are successful');
    console.log('3. Clear browser cache and hard refresh (Ctrl+Shift+R)');
} else {
    console.log('\n❌ Issues found that need to be fixed.');
}

console.log('\n=====================================');
console.log('Verification complete!');
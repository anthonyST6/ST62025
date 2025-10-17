// Verification script for Block 1 enhanced use cases
const EnhancedUseCasesBlock1 = require('./enhanced-use-cases-block-1.js');

function countWords(text) {
    return text.trim().split(/\s+/).length;
}

function verifyUseCase(useCase, subcomponent, company) {
    const issues = [];
    
    // Check required fields
    const requiredFields = ['company', 'industry', 'challenge', 'approach', 'definition', 'results', 'keyInsight'];
    requiredFields.forEach(field => {
        if (!useCase[field]) {
            issues.push(`Missing field: ${field}`);
        }
    });
    
    // Count total words (challenge + approach + definition + results + keyInsight)
    const totalText = [
        useCase.challenge || '',
        useCase.approach || '',
        useCase.definition || '',
        useCase.results || '',
        useCase.keyInsight || ''
    ].join(' ');
    
    const wordCount = countWords(totalText);
    
    if (wordCount < 200) {
        issues.push(`Word count too low: ${wordCount} words (minimum 200)`);
    } else if (wordCount > 300) {
        issues.push(`Word count too high: ${wordCount} words (maximum 300)`);
    }
    
    return {
        subcomponent,
        company,
        wordCount,
        issues,
        valid: issues.length === 0
    };
}

console.log('🔍 Verifying Block 1 Enhanced Use Cases\n');
console.log('=' .repeat(80));

let totalUseCases = 0;
let validUseCases = 0;
const allIssues = [];

Object.keys(EnhancedUseCasesBlock1).forEach(subKey => {
    const subData = EnhancedUseCasesBlock1[subKey];
    console.log(`\n📋 Subcomponent ${subKey}: ${subData.subcomponent}`);
    console.log('-'.repeat(80));
    
    subData.useCases.forEach(useCase => {
        totalUseCases++;
        const result = verifyUseCase(useCase, subKey, useCase.company);
        
        if (result.valid) {
            validUseCases++;
            console.log(`✅ ${result.company}: ${result.wordCount} words`);
        } else {
            console.log(`❌ ${result.company}: ${result.wordCount} words`);
            result.issues.forEach(issue => {
                console.log(`   - ${issue}`);
                allIssues.push(`${subKey} - ${result.company}: ${issue}`);
            });
        }
    });
});

console.log('\n' + '='.repeat(80));
console.log(`\n📊 SUMMARY:`);
console.log(`   Total Use Cases: ${totalUseCases}`);
console.log(`   Valid Use Cases: ${validUseCases}`);
console.log(`   Invalid Use Cases: ${totalUseCases - validUseCases}`);

if (allIssues.length > 0) {
    console.log(`\n❌ Issues Found (${allIssues.length}):`);
    allIssues.forEach(issue => console.log(`   - ${issue}`));
} else {
    console.log(`\n✅ All use cases are valid!`);
}

// Verify company list matches requirements
console.log('\n' + '='.repeat(80));
console.log('\n🏢 COMPANY VERIFICATION:');

const requiredCompanies = {
    '1-2': ['Patagonia'],
    '1-4': ['Google', 'Amazon', 'Netflix', 'Spotify', 'LinkedIn', 'Salesforce'],
    '1-5': ['Uber', 'Netflix', 'Tesla', 'Zoom', 'Peloton', 'Beyond Meat'],
    '1-6': ['Apple', 'Disney+', 'Spotify', 'Tesla', 'Epic Games', 'Airbnb']
};

let companyMatch = true;
Object.keys(requiredCompanies).forEach(subKey => {
    const required = requiredCompanies[subKey];
    const actual = EnhancedUseCasesBlock1[subKey]?.useCases.map(uc => uc.company) || [];
    
    console.log(`\n   ${subKey}:`);
    console.log(`   Required: ${required.join(', ')}`);
    console.log(`   Actual:   ${actual.join(', ')}`);
    
    const missing = required.filter(c => !actual.includes(c));
    const extra = actual.filter(c => !required.includes(c));
    
    if (missing.length > 0) {
        console.log(`   ❌ Missing: ${missing.join(', ')}`);
        companyMatch = false;
    }
    if (extra.length > 0) {
        console.log(`   ⚠️  Extra: ${extra.join(', ')}`);
    }
    if (missing.length === 0 && extra.length === 0) {
        console.log(`   ✅ Perfect match!`);
    }
});

console.log('\n' + '='.repeat(80));
if (validUseCases === totalUseCases && companyMatch) {
    console.log('\n🎉 SUCCESS! All use cases are complete and valid!\n');
} else {
    console.log('\n⚠️  Some issues need to be addressed.\n');
}
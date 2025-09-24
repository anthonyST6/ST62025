// Verify that all 96 subcomponents have correct title display
const { educationalContent } = require('./educational-content');
const { missingContent } = require('./missing-content-additions');

// Merge all content
const allContent = { ...educationalContent, ...missingContent };

// Define the expected structure
const blocks = [
    { id: 1, name: "Mission Discovery", count: 6 },
    { id: 2, name: "Customer Insights", count: 6 },
    { id: 3, name: "Strategic Prioritization", count: 6 },
    { id: 4, name: "Prototype Launch", count: 6 },
    { id: 5, name: "Early Adopter Wins", count: 6 },
    { id: 6, name: "Customer Engagement Flywheel", count: 6 },
    { id: 7, name: "Quantifiable Impact", count: 6 },
    { id: 8, name: "Customer Success Expansion", count: 6 },
    { id: 9, name: "Proof Execution", count: 6 },
    { id: 10, name: "Sales Team Empowerment", count: 6 },
    { id: 11, name: "High Performance Teams", count: 6 },
    { id: 12, name: "Retention Systems", count: 6 },
    { id: 13, name: "Market Domination Strategies", count: 6 },
    { id: 14, name: "Operational Infrastructure", count: 6 },
    { id: 15, name: "Leadership Expansion", count: 6 },
    { id: 16, name: "Global & Expansion Opportunities", count: 6 }
];

console.log('=== VERIFYING TITLE DISPLAY FOR ALL 96 SUBCOMPONENTS ===\n');

let totalIssues = 0;
let totalCorrect = 0;

blocks.forEach(block => {
    console.log(`\n📦 Block ${block.id}: ${block.name}`);
    console.log('─'.repeat(50));
    
    for (let i = 1; i <= block.count; i++) {
        const id = `${block.id}-${i}`;
        const content = allContent[id];
        
        if (!content) {
            console.log(`  ❌ ${id}: MISSING CONTENT`);
            totalIssues++;
        } else if (!content.title) {
            console.log(`  ⚠️  ${id}: NO TITLE FIELD`);
            totalIssues++;
        } else {
            // Check if title seems reasonable (not generic)
            const title = content.title;
            const isGeneric = title.toLowerCase().includes('subcomponent') || 
                             title.toLowerCase().includes('component') ||
                             title === '';
            
            if (isGeneric) {
                console.log(`  ⚠️  ${id}: GENERIC TITLE: "${title}"`);
                totalIssues++;
            } else {
                console.log(`  ✅ ${id}: "${title}"`);
                totalCorrect++;
            }
        }
    }
});

console.log('\n' + '='.repeat(60));
console.log('📊 SUMMARY:');
console.log(`  ✅ Correct titles: ${totalCorrect}/96`);
console.log(`  ❌ Issues found: ${totalIssues}/96`);
console.log(`  📈 Success rate: ${((totalCorrect/96)*100).toFixed(1)}%`);

if (totalIssues === 0) {
    console.log('\n🎉 SUCCESS! All 96 subcomponents have proper titles!');
} else {
    console.log('\n⚠️  Some issues remain. Please review the above list.');
}

// Also verify that titles match between education content and expected names
console.log('\n\n=== SAMPLE TITLE VERIFICATION ===');
const samples = [
    { id: '1-1', expected: 'Problem Statement Definition' },
    { id: '5-1', expected: 'Case Study Template' },
    { id: '5-2', expected: 'ROI Calculation Sheet' },
    { id: '10-4', expected: 'Objection Handling Guide' },
    { id: '13-1', expected: 'Category Narrative Canvas' }
];

samples.forEach(sample => {
    const content = allContent[sample.id];
    if (content && content.title) {
        const match = content.title === sample.expected;
        console.log(`${sample.id}: "${content.title}" ${match ? '✅ MATCHES' : `❌ EXPECTED: "${sample.expected}"`}`);
    }
});
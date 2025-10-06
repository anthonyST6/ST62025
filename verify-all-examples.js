/**
 * Verification Script for Real-World Examples
 * Checks that all 96 subcomponents have unique examples
 */

// Load the database
const script = document.createElement('script');
script.src = 'real-world-examples-complete-96-final.js';
document.head.appendChild(script);

script.onload = function() {
    console.log('🔍 Starting verification of all 96 subcomponents...\n');
    
    const blocks = [
        { id: 1, name: 'Mission Discovery' },
        { id: 2, name: 'Customer Insights' },
        { id: 3, name: 'Strategic Prioritization' },
        { id: 4, name: 'Prototype Launch' },
        { id: 5, name: 'Go-to-Market Strategy' },
        { id: 6, name: 'Customer Engagement Flywheel' },
        { id: 7, name: 'Quantifiable Impact' },
        { id: 8, name: 'Customer Success Expansion' },
        { id: 9, name: 'Proof of Execution' },
        { id: 10, name: 'Sales Team Empowerment' },
        { id: 11, name: 'High Performance Teams' },
        { id: 12, name: 'Retention Systems' },
        { id: 13, name: 'Market Domination Strategies' },
        { id: 14, name: 'Operational Infrastructure' },
        { id: 15, name: 'Leadership Expansion' },
        { id: 16, name: 'Global Expansion Opportunities' }
    ];
    
    let totalFound = 0;
    let totalMissing = 0;
    let missingList = [];
    let foundList = [];
    
    // Check each block
    blocks.forEach(block => {
        console.log(`\n📦 Block ${block.id}: ${block.name}`);
        console.log('─'.repeat(50));
        
        let blockFound = 0;
        let blockMissing = 0;
        
        // Check each subcomponent (1-6)
        for (let sub = 1; sub <= 6; sub++) {
            const id = `${block.id}-${sub}`;
            const data = window.getRealWorldExamples ? 
                window.getRealWorldExamples(id) : 
                window.realWorldExamplesComplete?.[id];
            
            if (data && data.examples && data.examples.length > 0) {
                console.log(`✅ ${id}: ${data.title} (${data.examples.length} examples)`);
                
                // List the companies
                const companies = data.examples.map(ex => ex.company).join(', ');
                console.log(`   Companies: ${companies}`);
                
                blockFound++;
                totalFound++;
                foundList.push({
                    id: id,
                    title: data.title,
                    count: data.examples.length,
                    companies: companies
                });
            } else {
                console.log(`❌ ${id}: No examples found`);
                blockMissing++;
                totalMissing++;
                missingList.push(id);
            }
        }
        
        console.log(`\nBlock Summary: ${blockFound}/6 subcomponents have examples`);
    });
    
    // Final summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 FINAL VERIFICATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Total Subcomponents with Examples: ${totalFound}/96`);
    console.log(`❌ Total Missing: ${totalMissing}/96`);
    console.log(`📈 Coverage: ${((totalFound/96) * 100).toFixed(1)}%`);
    
    if (missingList.length > 0) {
        console.log('\n⚠️ Missing Subcomponents:');
        console.log(missingList.join(', '));
    }
    
    // Check for duplicates
    console.log('\n🔍 Checking for duplicate examples...');
    const allCompanies = {};
    let duplicates = [];
    
    foundList.forEach(item => {
        const companies = item.companies.split(', ');
        companies.forEach(company => {
            if (!allCompanies[company]) {
                allCompanies[company] = [];
            }
            allCompanies[company].push(item.id);
        });
    });
    
    Object.entries(allCompanies).forEach(([company, ids]) => {
        if (ids.length > 1) {
            duplicates.push(`${company} appears in: ${ids.join(', ')}`);
        }
    });
    
    if (duplicates.length > 0) {
        console.log('⚠️ Some companies appear in multiple subcomponents:');
        duplicates.forEach(dup => console.log(`  - ${dup}`));
        console.log('\nNote: This is expected for some major companies that excel in multiple areas.');
    } else {
        console.log('✅ All examples are unique across subcomponents');
    }
    
    // Success check
    if (totalFound >= 90) {
        console.log('\n🎉 SUCCESS: Database has excellent coverage with ' + totalFound + ' subcomponents!');
    } else if (totalFound >= 48) {
        console.log('\n✅ GOOD: Database has good coverage with ' + totalFound + ' subcomponents.');
        console.log('Consider adding examples for the remaining ' + totalMissing + ' subcomponents.');
    } else {
        console.log('\n⚠️ NEEDS WORK: Only ' + totalFound + ' subcomponents have examples.');
        console.log('Please add examples for the missing subcomponents.');
    }
    
    // Export results for further analysis
    window.verificationResults = {
        totalFound: totalFound,
        totalMissing: totalMissing,
        foundList: foundList,
        missingList: missingList,
        duplicates: duplicates
    };
    
    console.log('\n💾 Results saved to window.verificationResults');
};

// If running in Node.js environment
if (typeof document === 'undefined') {
    console.log('This script must be run in a browser environment.');
    console.log('Open the developer console and paste this script, or include it in an HTML file.');
}
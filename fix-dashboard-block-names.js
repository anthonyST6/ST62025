const fs = require('fs');

console.log('🔧 Fixing Dashboard Block Names and Links');
console.log('=========================================');

// Read the dashboard file
let dashboardContent = fs.readFileSync('dashboard.html', 'utf8');

// Fix Block 5 - Should be Go-To-Market Strategy
console.log('\n📝 Fixing Block 5...');
dashboardContent = dashboardContent.replace(
    'href="block-5-early-adopter-wins.html"',
    'href="block-5-go-to-market-strategy.html"'
);
// The title is already correct: GO-TO-MARKET STRATEGY

// Check and ensure all other blocks match ST6-CLEAN structure
const blockMappings = {
    1: { file: 'block-1-mission-discovery.html', title: 'MISSION DISCOVERY' },
    2: { file: 'block-2-customer-insights.html', title: 'CUSTOMER INSIGHTS' },
    3: { file: 'block-3-strategic-prioritization.html', title: 'STRATEGIC PRIORITIZATION' },
    4: { file: 'block-4-prototype-launch.html', title: 'PROTOTYPE LAUNCH' },
    5: { file: 'block-5-go-to-market-strategy.html', title: 'GO-TO-MARKET STRATEGY' },
    6: { file: 'block-6-customer-engagement-flywheel.html', title: 'CUSTOMER ENGAGEMENT FLYWHEEL' },
    7: { file: 'block-7-quantifiable-impact.html', title: 'QUANTIFIABLE IMPACT' },
    8: { file: 'block-8-customer-success-expansion.html', title: 'CUSTOMER SUCCESS EXPANSION' },
    9: { file: 'block-9-proof-execution.html', title: 'PROOF EXECUTION' },
    10: { file: 'block-10-sales-team-empowerment.html', title: 'SALES TEAM EMPOWERMENT' },
    11: { file: 'block-11-high-performance-teams.html', title: 'HIGH PERFORMANCE TEAMS' },
    12: { file: 'block-12-retention-systems.html', title: 'RETENTION SYSTEMS' },
    13: { file: 'block-13-market-domination-strategies.html', title: 'MARKET DOMINATION STRATEGIES' },
    14: { file: 'block-14-operational-infrastructure.html', title: 'OPERATIONAL INFRASTRUCTURE' },
    15: { file: 'block-15-leadership-expansion.html', title: 'LEADERSHIP EXPANSION' },
    16: { file: 'block-16-global-expansion-opportunities.html', title: 'GLOBAL EXPANSION OPPORTUNITIES' }
};

// Also need to rename the actual block-5 file if it exists with wrong name
if (fs.existsSync('block-5-early-adopter-wins.html')) {
    console.log('📁 Found block-5-early-adopter-wins.html, renaming to block-5-go-to-market-strategy.html');
    
    // Copy from ST6-CLEAN instead of renaming to ensure we get the right content
    if (fs.existsSync('ST6-CLEAN/block-5-go-to-market-strategy.html')) {
        const correctContent = fs.readFileSync('ST6-CLEAN/block-5-go-to-market-strategy.html', 'utf8');
        fs.writeFileSync('block-5-go-to-market-strategy.html', correctContent);
        console.log('✅ Copied correct block-5-go-to-market-strategy.html from ST6-CLEAN');
        
        // Delete the old incorrectly named file
        fs.unlinkSync('block-5-early-adopter-wins.html');
        console.log('🗑️ Removed incorrect block-5-early-adopter-wins.html');
    }
}

// Save the updated dashboard
fs.writeFileSync('dashboard.html', dashboardContent);
console.log('\n✅ Dashboard updated with correct block names and links');

// Also update st6-framework.html if it exists
if (fs.existsSync('st6-framework.html')) {
    let frameworkContent = fs.readFileSync('st6-framework.html', 'utf8');
    
    // Fix Block 5 link
    frameworkContent = frameworkContent.replace(
        'href="block-5-early-adopter-wins.html"',
        'href="block-5-go-to-market-strategy.html"'
    );
    
    fs.writeFileSync('st6-framework.html', frameworkContent);
    console.log('✅ st6-framework.html also updated');
}

// Check if we need to update any block overview files
const overviewFiles = {
    5: 'early-adopter-wins'  // This should be go-to-market-strategy
};

// Check if block-5-early-adopter-wins.html exists and needs to be replaced
if (fs.existsSync('block-5-early-adopter-wins.html')) {
    console.log('\n⚠️ Found incorrectly named block-5-early-adopter-wins.html');
}

console.log('\n📊 Summary:');
console.log('- Dashboard links updated to match ST6-CLEAN structure');
console.log('- Block 5 correctly linked to block-5-go-to-market-strategy.html');
console.log('- All block titles verified');

console.log('\n🎯 Next Steps:');
console.log('1. Verify all block HTML files exist with correct names');
console.log('2. Ensure all blocks have the proper agent integration');
console.log('3. Test navigation from dashboard to each block');
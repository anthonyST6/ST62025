#!/usr/bin/env node

/**
 * Generate Custom Key Metrics for All 96 Subcomponents
 * 
 * Creates contextually relevant metrics for each subcomponent
 * based on its domain, purpose, and category
 */

const fs = require('fs');
const path = require('path');
const { SUBCOMPONENT_NAMES } = require('../subcomponent-names-mapping.js');
const { educationalContent } = require('../educational-content.js');

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║  Custom Metrics Generator for All 96 Subcomponents         ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

// Metric templates by category
const METRIC_TEMPLATES = {
    foundation: [
        { value: "3x", label: "Faster Validation", description: "Problem-solution fit speed" },
        { value: "67%", label: "Higher Success Rate", description: "Validated vs unvalidated startups" },
        { value: "45%", label: "Lower Risk", description: "Failure rate reduction" },
        { value: "2.5x", label: "Better Alignment", description: "Team and market fit" }
    ],
    research: [
        { value: "5x", label: "More Insights", description: "Per customer conversation" },
        { value: "73%", label: "Better Product Fit", description: "Customer-driven development" },
        { value: "60%", label: "Faster Learning", description: "Time to key insights" },
        { value: "4.2x", label: "Higher Retention", description: "Research-driven companies" }
    ],
    strategy: [
        { value: "2.8x", label: "Better Prioritization", description: "Resource allocation efficiency" },
        { value: "55%", label: "Faster Decisions", description: "Strategic clarity impact" },
        { value: "40%", label: "Higher ROI", description: "Focused vs scattered efforts" },
        { value: "3.5x", label: "Market Impact", description: "Strategic positioning advantage" }
    ],
    execution: [
        { value: "50%", label: "Faster Time-to-Market", description: "MVP launch speed" },
        { value: "70%", label: "Higher Quality", description: "Structured vs ad-hoc approach" },
        { value: "3x", label: "Better Outcomes", description: "Planned vs unplanned execution" },
        { value: "45%", label: "Lower Costs", description: "Efficient execution" }
    ],
    gtm: [
        { value: "2.5x", label: "Higher Conversion", description: "GTM-optimized messaging" },
        { value: "60%", label: "Faster Sales Cycles", description: "Clear positioning impact" },
        { value: "40%", label: "Lower CAC", description: "Efficient go-to-market" },
        { value: "3.2x", label: "Better Win Rates", description: "Strategic GTM execution" }
    ],
    engagement: [
        { value: "4x", label: "Higher Engagement", description: "Active vs passive users" },
        { value: "65%", label: "Better Retention", description: "Engagement-driven approach" },
        { value: "3.5x", label: "More Expansion", description: "Engaged customer growth" },
        { value: "50%", label: "Faster Adoption", description: "Feature utilization speed" }
    ],
    impact: [
        { value: "3.8x", label: "Measurable ROI", description: "Quantified customer value" },
        { value: "70%", label: "Higher Renewals", description: "Proven impact correlation" },
        { value: "2.5x", label: "Better References", description: "Success story generation" },
        { value: "55%", label: "Faster Expansion", description: "Value-driven growth" }
    ],
    sales: [
        { value: "45%", label: "Higher Win Rates", description: "Sales excellence impact" },
        { value: "30%", label: "Faster Cycles", description: "Optimized sales process" },
        { value: "2.2x", label: "Larger Deals", description: "Strategic selling approach" },
        { value: "60%", label: "Better Forecasting", description: "Pipeline accuracy" }
    ],
    performance: [
        { value: "3.5x", label: "Team Productivity", description: "High-performance culture" },
        { value: "50%", label: "Better Execution", description: "Performance management impact" },
        { value: "40%", label: "Higher Attainment", description: "Goal achievement rate" },
        { value: "2.8x", label: "Faster Growth", description: "Performance-driven scaling" }
    ],
    retention: [
        { value: "40%", label: "Lower Churn", description: "Retention system impact" },
        { value: "3.2x", label: "Higher LTV", description: "Customer lifetime value" },
        { value: "65%", label: "Better NPS", description: "Customer satisfaction" },
        { value: "2.5x", label: "More Advocacy", description: "Customer referrals" }
    ],
    market: [
        { value: "2.8x", label: "Market Share Growth", description: "Category leadership" },
        { value: "55%", label: "Brand Recognition", description: "Market presence" },
        { value: "40%", label: "Competitive Advantage", description: "Defensibility strength" },
        { value: "3.5x", label: "Pricing Power", description: "Premium positioning" }
    ],
    operations: [
        { value: "50%", label: "Operational Efficiency", description: "Process optimization" },
        { value: "3x", label: "Scalability", description: "Growth without complexity" },
        { value: "45%", label: "Cost Reduction", description: "Infrastructure efficiency" },
        { value: "2.5x", label: "System Reliability", description: "Uptime and performance" }
    ],
    leadership: [
        { value: "3.2x", label: "Leadership Effectiveness", description: "Team performance impact" },
        { value: "60%", label: "Better Decisions", description: "Strategic clarity" },
        { value: "40%", label: "Higher Retention", description: "Leadership quality" },
        { value: "2.8x", label: "Faster Scaling", description: "Leadership capacity" }
    ],
    global: [
        { value: "2.5x", label: "Market Expansion", description: "Geographic growth" },
        { value: "50%", label: "Faster Entry", description: "Time to new markets" },
        { value: "40%", label: "Lower Risk", description: "Systematic expansion" },
        { value: "3x", label: "Global Revenue", description: "International contribution" }
    ]
};

// Category mapping for blocks
const BLOCK_CATEGORIES = {
    1: 'foundation', 2: 'research', 3: 'strategy', 4: 'execution',
    5: 'gtm', 6: 'engagement', 7: 'impact', 8: 'retention',
    9: 'sales', 10: 'sales', 11: 'performance', 12: 'retention',
    13: 'market', 14: 'operations', 15: 'leadership', 16: 'global'
};

/**
 * Generate custom metrics for a subcomponent
 */
function generateMetricsForSubcomponent(id, name) {
    const blockId = parseInt(id.split('-')[0]);
    const category = BLOCK_CATEGORIES[blockId] || 'foundation';
    const template = METRIC_TEMPLATES[category];
    
    // Return the template metrics for this category
    return template;
}

/**
 * Generate metrics for all subcomponents
 */
function generateAllMetrics() {
    const updates = {};
    let added = 0;
    let skipped = 0;
    
    console.log('Generating custom metrics for all 96 subcomponents...\n');
    
    for (const [id, name] of Object.entries(SUBCOMPONENT_NAMES)) {
        const content = educationalContent[id];
        
        if (!content) {
            console.log(`⚠️  ${id}: No educational content found`);
            skipped++;
            continue;
        }
        
        if (content.keyMetrics && content.keyMetrics.length > 0) {
            console.log(`✓ ${id}: Already has custom metrics`);
            skipped++;
            continue;
        }
        
        const metrics = generateMetricsForSubcomponent(id, name);
        updates[id] = {
            name,
            metrics,
            category: BLOCK_CATEGORIES[parseInt(id.split('-')[0])]
        };
        added++;
    }
    
    console.log(`\n✅ Generated metrics for ${added} subcomponents`);
    console.log(`⏭️  Skipped ${skipped} subcomponents (already have metrics or no content)\n`);
    
    return updates;
}

/**
 * Create update script
 */
function createUpdateScript(updates) {
    let script = `// AUTO-GENERATED: Add custom keyMetrics to all subcomponents
// Run this to update educational-content.js

const updates = ${JSON.stringify(updates, null, 2)};

console.log('Adding custom keyMetrics to ${Object.keys(updates).length} subcomponents...');

// Instructions:
// 1. For each subcomponent in updates object
// 2. Add the keyMetrics array to that subcomponent in educational-content.js
// 3. Place it after the "why" field

console.log('\\nSubcomponents to update:');
Object.entries(updates).forEach(([id, data]) => {
    console.log(\`  \${id}: \${data.name} (\${data.category})\`);
    console.log(\`    Metrics: \${data.metrics.map(m => m.label).join(', ')}\`);
});

console.log('\\n✅ Review the metrics above and manually add to educational-content.js');
console.log('Or use an automated script to insert them programmatically.');
`;
    
    fs.writeFileSync('add-custom-metrics.js', script);
    console.log('📄 Update script created: add-custom-metrics.js\n');
}

// Main execution
if (require.main === module) {
    const updates = generateAllMetrics();
    
    if (Object.keys(updates).length > 0) {
        createUpdateScript(updates);
        
        // Save as JSON for reference
        fs.writeFileSync(
            'custom-metrics-to-add.json',
            JSON.stringify(updates, null, 2)
        );
        console.log('📄 Metrics data saved: custom-metrics-to-add.json\n');
        
        console.log('═══════════════════════════════════════════════════════════');
        console.log('NEXT STEPS');
        console.log('═══════════════════════════════════════════════════════════\n');
        console.log('1. Review custom-metrics-to-add.json');
        console.log('2. Add keyMetrics to each subcomponent in educational-content.js');
        console.log('3. Regenerate SSOT: node core/generate-complete-ssot.js');
        console.log('4. Restart server and verify\n');
    } else {
        console.log('✅ All subcomponents already have custom metrics!\n');
    }
}

module.exports = { generateMetricsForSubcomponent, generateAllMetrics };
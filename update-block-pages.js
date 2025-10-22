const fs = require('fs');
const path = require('path');

// Template for block pages with correct module links
const blockPageTemplate = (blockNum, blockTitle, modules) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Block ${blockNum}: ${blockTitle} - ScaleOps6 Platform</title>
    <link rel="icon" type="image/png" href="/Official_ScaleOps6_Logo.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #000;
            color: #fff;
            min-height: 100vh;
            padding: 20px;
            padding-top: 140px;
            position: relative;
        }
        
        /* Soft orange glow effect */
        body::before {
            content: '';
            position: fixed;
            bottom: -50%;
            left: 50%;
            transform: translateX(-50%);
            width: 150%;
            height: 100%;
            background: radial-gradient(ellipse at center, rgba(255, 85, 0, 0.15) 0%, transparent 70%);
            pointer-events: none;
            z-index: 0;
        }
        
        .container {
            position: relative;
            z-index: 1;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .back-button {
            position: fixed;
            top: 100px;
            left: 20px;
            background: transparent;
            border: 2px solid #FF5500;
            color: #FF5500;
            padding: 10px 20px;
            border-radius: 25px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 8px;
            text-decoration: none;
        }
        
        .back-button:hover {
            background: #FF5500;
            color: #000;
            transform: translateX(-5px);
        }
        
        .block-header {
            text-align: center;
            margin-bottom: 3rem;
            padding: 2rem;
            background: rgba(255, 85, 0, 0.05);
            border: 2px solid #FF5500;
            border-radius: 15px;
        }
        
        .block-number {
            display: inline-block;
            background: #FF5500;
            color: #000;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-weight: bold;
            margin-bottom: 1rem;
        }
        
        .block-title {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            color: #FF5500;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .block-description {
            color: #ccc;
            line-height: 1.6;
        }
        
        .modules-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        
        .module-card {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 1.5rem;
            transition: all 0.3s ease;
            cursor: pointer;
            text-decoration: none;
            color: inherit;
            display: block;
        }
        
        .module-card:hover {
            border-color: #FF5500;
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(255,85,0,0.2);
            background: rgba(255, 85, 0, 0.05);
        }
        
        .module-id {
            display: inline-block;
            background: #222;
            color: #FF5500;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.85rem;
            margin-bottom: 0.5rem;
            font-weight: 700;
        }
        
        .module-title {
            font-size: 1.25rem;
            margin-bottom: 0.5rem;
            color: #fff;
            font-weight: 600;
        }
        
        .module-desc {
            color: #999;
            font-size: 0.9rem;
            line-height: 1.5;
        }
    </style>
</head>
<body>
    <script src="nav.js"></script>
    
    <a href="index.html" class="back-button">
        ← Back to Dashboard
    </a>
    
    <div class="container">
        <div class="block-header">
            <span class="block-number">BLOCK ${blockNum}</span>
            <h1 class="block-title">${blockTitle}</h1>
            <p class="block-description">
                Select a module below to begin your assessment and receive AI-powered insights.
            </p>
        </div>
        
        <div class="modules-grid">
            ${modules.map(module => `
            <a href="module-${module.id}.html" class="module-card">
                <span class="module-id">${module.id.toUpperCase()}</span>
                <h3 class="module-title">${module.title}</h3>
                <p class="module-desc">${module.desc}</p>
            </a>
            `).join('')}
        </div>
    </div>
</body>
</html>`;

// Block data
const blocks = {
    '1': {
        title: 'Mission Discovery',
        modules: [
            { id: '1-1', title: 'Problem Statement', desc: 'Clear articulation of the problem you\'re solving' },
            { id: '1-2', title: 'Vision', desc: 'Long-term aspirational goal for your company' },
            { id: '1-3', title: 'Mission', desc: 'Your company\'s purpose and approach' },
            { id: '1-4', title: 'Values', desc: 'Core principles that guide decision-making' },
            { id: '1-5', title: 'Success Metrics', desc: 'Key indicators that measure progress' },
            { id: '1-6', title: 'Stakeholder Alignment', desc: 'Ensuring all parties share the same vision' }
        ]
    },
    '2': {
        title: 'Customer Insights',
        modules: [
            { id: '2-1', title: 'Customer Personas', desc: 'Detailed profiles of ideal customer segments' },
            { id: '2-2', title: 'Jobs to be Done', desc: 'Understanding what customers are trying to accomplish' },
            { id: '2-3', title: 'Pain Points', desc: 'Specific problems customers experience' },
            { id: '2-4', title: 'Customer Journey', desc: 'Mapping the end-to-end customer experience' },
            { id: '2-5', title: 'Voice of Customer', desc: 'Systematic capture of customer feedback' },
            { id: '2-6', title: 'Segmentation Strategy', desc: 'Dividing market into actionable groups' }
        ]
    },
    '3': {
        title: 'Strategic Prioritization',
        modules: [
            { id: '3-1', title: 'Use Case Prioritization', desc: 'Ranking opportunities by impact and effort' },
            { id: '3-2', title: 'Segment Tiering', desc: 'Prioritizing customer segments to target' },
            { id: '3-3', title: 'Prioritization Framework', desc: 'Systematic approach to decision-making' },
            { id: '3-4', title: 'Strategic Tradeoffs', desc: 'Balancing competing priorities' },
            { id: '3-5', title: 'Hypothesis Testing', desc: 'Validating assumptions with experiments' },
            { id: '3-6', title: 'Decision Archive', desc: 'Documenting strategic choices and rationale' }
        ]
    },
    '4': {
        title: 'Prototype Launch',
        modules: [
            { id: '4-1', title: 'Feature Matrix', desc: 'Mapping features to customer needs' },
            { id: '4-2', title: 'Technical Scope', desc: 'Defining technical requirements' },
            { id: '4-3', title: 'Pilot Group Selection', desc: 'Choosing initial test customers' },
            { id: '4-4', title: 'Launch Timeline', desc: 'Planning rollout phases' },
            { id: '4-5', title: 'Success Criteria', desc: 'Defining what success looks like' },
            { id: '4-6', title: 'Feedback Loops', desc: 'Systems for continuous improvement' }
        ]
    },
    '5': {
        title: 'Early Adopter Wins',
        modules: [
            { id: '5-1', title: 'Early Adopter Profile', desc: 'Characteristics of first customers' },
            { id: '5-2', title: 'Win Stories', desc: 'Documenting customer successes' },
            { id: '5-3', title: 'Reference Development', desc: 'Building customer advocates' },
            { id: '5-4', title: 'Case Study Creation', desc: 'Detailed success narratives' },
            { id: '5-5', title: 'Social Proof', desc: 'Leveraging customer validation' },
            { id: '5-6', title: 'Expansion Opportunities', desc: 'Growing within accounts' }
        ]
    },
    '6': {
        title: 'Customer Engagement Flywheel',
        modules: [
            { id: '6-1', title: 'Engagement Model', desc: 'How customers interact with your product' },
            { id: '6-2', title: 'Activation Metrics', desc: 'Measuring initial value delivery' },
            { id: '6-3', title: 'Retention Drivers', desc: 'What keeps customers coming back' },
            { id: '6-4', title: 'Viral Mechanics', desc: 'Built-in growth mechanisms' },
            { id: '6-5', title: 'Community Building', desc: 'Creating customer connections' },
            { id: '6-6', title: 'Flywheel Optimization', desc: 'Accelerating growth loops' }
        ]
    },
    '7': {
        title: 'Quantifiable Impact',
        modules: [
            { id: '7-1', title: 'Pricing Strategy', desc: 'Value-based pricing models' },
            { id: '7-2', title: 'ROI Calculator', desc: 'Demonstrating customer value' },
            { id: '7-3', title: 'Business Case', desc: 'Justifying the investment' },
            { id: '7-4', title: 'Impact Metrics', desc: 'Measuring business outcomes' },
            { id: '7-5', title: 'Competitive Advantage', desc: 'Unique value proposition' },
            { id: '7-6', title: 'Value Realization', desc: 'Time to value optimization' }
        ]
    },
    '8': {
        title: 'Customer Success Expansion',
        modules: [
            { id: '8-1', title: 'Success Playbook', desc: 'Repeatable customer success processes' },
            { id: '8-2', title: 'Health Scoring', desc: 'Predicting customer outcomes' },
            { id: '8-3', title: 'Expansion Strategy', desc: 'Growing customer accounts' },
            { id: '8-4', title: 'Renewal Process', desc: 'Maximizing retention' },
            { id: '8-5', title: 'Advocacy Program', desc: 'Building customer champions' },
            { id: '8-6', title: 'Success Metrics', desc: 'Measuring CS effectiveness' }
        ]
    },
    '9': {
        title: 'Proof Execution',
        modules: [
            { id: '9-1', title: 'Proof of Concept', desc: 'Demonstrating feasibility' },
            { id: '9-2', title: 'Pilot Programs', desc: 'Structured testing approach' },
            { id: '9-3', title: 'Success Criteria', desc: 'Defining winning outcomes' },
            { id: '9-4', title: 'Risk Mitigation', desc: 'Addressing concerns proactively' },
            { id: '9-5', title: 'Stakeholder Buy-in', desc: 'Building internal support' },
            { id: '9-6', title: 'Scale Planning', desc: 'From pilot to production' }
        ]
    },
    '10': {
        title: 'Sales Team Empowerment',
        modules: [
            { id: '10-1', title: 'Sales Process', desc: 'Structured selling methodology' },
            { id: '10-2', title: 'Sales Enablement', desc: 'Tools and training for success' },
            { id: '10-3', title: 'Objection Handling', desc: 'Addressing common concerns' },
            { id: '10-4', title: 'Demo Strategy', desc: 'Effective product demonstrations' },
            { id: '10-5', title: 'Pipeline Management', desc: 'Forecasting and tracking' },
            { id: '10-6', title: 'Sales Metrics', desc: 'Measuring sales effectiveness' }
        ]
    },
    '11': {
        title: 'High Performance Teams',
        modules: [
            { id: '11-1', title: 'Team Structure', desc: 'Optimal organization design' },
            { id: '11-2', title: 'Hiring Strategy', desc: 'Building the right team' },
            { id: '11-3', title: 'Performance Management', desc: 'Driving excellence' },
            { id: '11-4', title: 'Culture Development', desc: 'Creating winning environment' },
            { id: '11-5', title: 'Leadership Development', desc: 'Growing future leaders' },
            { id: '11-6', title: 'Team Metrics', desc: 'Measuring team effectiveness' }
        ]
    },
    '12': {
        title: 'Retention Systems',
        modules: [
            { id: '12-1', title: 'Churn Analysis', desc: 'Understanding why customers leave' },
            { id: '12-2', title: 'Retention Programs', desc: 'Keeping customers engaged' },
            { id: '12-3', title: 'Customer Health', desc: 'Proactive risk management' },
            { id: '12-4', title: 'Win-back Campaigns', desc: 'Re-engaging lost customers' },
            { id: '12-5', title: 'Loyalty Programs', desc: 'Rewarding customer commitment' },
            { id: '12-6', title: 'Retention Metrics', desc: 'Measuring retention success' }
        ]
    },
    '13': {
        title: 'Market Domination Strategies',
        modules: [
            { id: '13-1', title: 'Revenue Operations', desc: 'Aligning go-to-market functions' },
            { id: '13-2', title: 'Market Share Strategy', desc: 'Capturing dominant position' },
            { id: '13-3', title: 'Competitive Moats', desc: 'Building defensible advantages' },
            { id: '13-4', title: 'Category Creation', desc: 'Defining new markets' },
            { id: '13-5', title: 'Network Effects', desc: 'Leveraging scale advantages' },
            { id: '13-6', title: 'Platform Strategy', desc: 'Building ecosystem value' }
        ]
    },
    '14': {
        title: 'Operational Infrastructure',
        modules: [
            { id: '14-1', title: 'Systems Architecture', desc: 'Scalable technology foundation' },
            { id: '14-2', title: 'Process Optimization', desc: 'Streamlining operations' },
            { id: '14-3', title: 'Data Infrastructure', desc: 'Analytics and insights platform' },
            { id: '14-4', title: 'Security & Compliance', desc: 'Risk management framework' },
            { id: '14-5', title: 'Vendor Management', desc: 'Strategic partnerships' },
            { id: '14-6', title: 'Operational Metrics', desc: 'Measuring efficiency' }
        ]
    },
    '15': {
        title: 'Leadership Expansion',
        modules: [
            { id: '15-1', title: 'Executive Team', desc: 'Building leadership bench' },
            { id: '15-2', title: 'Board Development', desc: 'Strategic governance' },
            { id: '15-3', title: 'Advisory Network', desc: 'External expertise' },
            { id: '15-4', title: 'Succession Planning', desc: 'Leadership continuity' },
            { id: '15-5', title: 'Executive Coaching', desc: 'Leadership development' },
            { id: '15-6', title: 'Leadership Metrics', desc: 'Measuring leadership impact' }
        ]
    },
    '16': {
        title: 'Global Expansion Opportunities',
        modules: [
            { id: '16-1', title: 'Market Entry Strategy', desc: 'International expansion planning' },
            { id: '16-2', title: 'Localization', desc: 'Adapting for local markets' },
            { id: '16-3', title: 'Global Partnerships', desc: 'International alliances' },
            { id: '16-4', title: 'Regulatory Compliance', desc: 'Navigating global requirements' },
            { id: '16-5', title: 'Global Operations', desc: 'Managing across borders' },
            { id: '16-6', title: 'Expansion Metrics', desc: 'Measuring global success' }
        ]
    }
};

// Generate block pages
console.log('Updating block pages with correct module links...\n');

let successCount = 0;
let errorCount = 0;

Object.entries(blocks).forEach(([blockNum, blockData]) => {
    try {
        const filename = `block-${blockNum}-${blockData.title.toLowerCase().replace(/\s+/g, '-')}.html`;
        const filepath = path.join(__dirname, filename);
        const html = blockPageTemplate(blockNum, blockData.title, blockData.modules);
        
        fs.writeFileSync(filepath, html);
        console.log(`✓ Updated ${filename}`);
        successCount++;
    } catch (error) {
        console.error(`✗ Error updating block ${blockNum}:`, error.message);
        errorCount++;
    }
});

console.log('\n=== BLOCK PAGES UPDATE COMPLETE ===');
console.log(`✓ Successfully updated: ${successCount} block pages`);
if (errorCount > 0) {
    console.log(`✗ Errors: ${errorCount} pages`);
}
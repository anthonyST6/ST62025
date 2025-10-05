const fs = require('fs');
const path = require('path');

// Block configurations with proper titles, descriptions, and subcomponents
const blockConfigs = {
    '2': {
        title: 'Customer Insights',
        description: 'Deep dive into customer needs through systematic interviews, persona development, and pain point analysis. Build a comprehensive understanding of your target market.',
        subcomponents: [
            { id: '2A', title: 'Interview Cadence Plan', agent: 'Interview Cadence Analyzer' },
            { id: '2B', title: 'Persona Development', agent: 'Persona Development Specialist' },
            { id: '2C', title: 'Pain Point Analysis', agent: 'Pain Point Analyst' },
            { id: '2D', title: 'Jobs to Be Done', agent: 'JTBD Framework Expert' },
            { id: '2E', title: 'Demand Signals', agent: 'Demand Signal Tracker' },
            { id: '2F', title: 'Insight Loop', agent: 'Insight Synthesis Manager' }
        ]
    },
    '3': {
        title: 'Strategic Prioritization',
        description: 'Make data-driven decisions about what to build and for whom. Prioritize use cases, segments, and features based on impact and feasibility.',
        subcomponents: [
            { id: '3A', title: 'Use Case Scoring Model', agent: 'Use Case Scorer' },
            { id: '3B', title: 'Segment Tiering', agent: 'Segment Prioritization Expert' },
            { id: '3C', title: 'Prioritization Framework', agent: 'Strategic Prioritizer' },
            { id: '3D', title: 'Strategic Tradeoffs', agent: 'Tradeoff Analysis Expert' },
            { id: '3E', title: 'Hypothesis Testing', agent: 'Hypothesis Validator' },
            { id: '3F', title: 'Decision Archive', agent: 'Decision Documentation Manager' }
        ]
    },
    '4': {
        title: 'Prototype Launch',
        description: 'Build and launch your MVP with the right features for the right users. Focus on rapid iteration and learning from early feedback.',
        subcomponents: [
            { id: '4A', title: 'Feature Inclusion Matrix', agent: 'Feature Matrix Builder' },
            { id: '4B', title: 'Technical Scope', agent: 'Technical Scope Definer' },
            { id: '4C', title: 'Pilot Group Selection', agent: 'Pilot Group Curator' },
            { id: '4D', title: 'QA Standards', agent: 'QA Standards Manager' },
            { id: '4E', title: 'Timeline Planning', agent: 'Timeline Optimization Expert' },
            { id: '4F', title: 'Post-Mortem Analysis', agent: 'Launch Analysis Specialist' }
        ]
    },
    '5': {
        title: 'Early Adopter Wins',
        description: 'Capture and leverage early customer success stories. Build momentum through documented wins and measurable ROI.',
        subcomponents: [
            { id: '5A', title: 'Case Study Template', agent: 'Early Win Validator' },
            { id: '5B', title: 'ROI Calculation', agent: 'ROI Calculator' },
            { id: '5C', title: 'Use Case Success', agent: 'Success Story Curator' },
            { id: '5D', title: 'Reference Architecture', agent: 'Reference Architecture Designer' },
            { id: '5E', title: 'Win Criteria Mapping', agent: 'Win Criteria Analyst' },
            { id: '5F', title: 'Deal Debrief', agent: 'Deal Analysis Expert' }
        ]
    },
    '6': {
        title: 'Customer Engagement Flywheel',
        description: 'Build systematic engagement processes that create momentum. Track usage, milestones, and success metrics to drive continuous improvement.',
        subcomponents: [
            { id: '6A', title: 'Usage Heatmap', agent: 'Usage Heatmap Analyst' },
            { id: '6B', title: 'Milestone Tracking', agent: 'Milestone Achievement Tracker' },
            { id: '6C', title: 'CS Dashboard Design', agent: 'Dashboard Design Specialist' },
            { id: '6D', title: 'Engagement Scoring', agent: 'Engagement Score Calculator' },
            { id: '6E', title: 'Renewal Predictor', agent: 'Renewal Prediction Analyst' },
            { id: '6F', title: 'Expansion Playbook', agent: 'Expansion Strategy Designer' }
        ]
    },
    '7': {
        title: 'Quantifiable Impact',
        description: 'Measure and communicate your impact through data. Build dashboards, track KPIs, and demonstrate value to stakeholders.',
        subcomponents: [
            { id: '7A', title: 'KPI Dashboard', agent: 'KPI Dashboard Architect' },
            { id: '7B', title: 'Impact Metrics', agent: 'Impact Measurement Specialist' },
            { id: '7C', title: 'ROI Reporting', agent: 'ROI Reporting Analyst' },
            { id: '7D', title: 'Success Metrics', agent: 'Success Metrics Designer' },
            { id: '7E', title: 'Performance Benchmarks', agent: 'Benchmark Analysis Expert' },
            { id: '7F', title: 'Value Communication', agent: 'Value Story Narrator' }
        ]
    },
    '8': {
        title: 'Customer Success Expansion',
        description: 'Scale customer success operations for growth. Build playbooks, health scores, and expansion strategies.',
        subcomponents: [
            { id: '8A', title: 'Success Playbooks', agent: 'Success Playbook Creator' },
            { id: '8B', title: 'Health Score Model', agent: 'Health Score Architect' },
            { id: '8C', title: 'Churn Prevention', agent: 'Churn Prevention Strategist' },
            { id: '8D', title: 'Upsell Framework', agent: 'Upsell Strategy Designer' },
            { id: '8E', title: 'Customer Advocacy', agent: 'Advocacy Program Manager' },
            { id: '8F', title: 'Success Operations', agent: 'CS Operations Optimizer' }
        ]
    },
    '10': {
        title: 'Sales Team Empowerment',
        description: 'Enable your sales team with the right tools, training, and processes. Build a scalable sales engine.',
        subcomponents: [
            { id: '10A', title: 'Sales Enablement', agent: 'Sales Enablement Architect' },
            { id: '10B', title: 'Competitive Positioning', agent: 'Competitive Intelligence Analyst' },
            { id: '10C', title: 'Sales Training', agent: 'Sales Training Designer' },
            { id: '10D', title: 'Deal Strategy', agent: 'Deal Strategy Optimizer' },
            { id: '10E', title: 'Sales Tools', agent: 'Sales Tool Stack Manager' },
            { id: '10F', title: 'Territory Planning', agent: 'Territory Planning Strategist' }
        ]
    },
    '11': {
        title: 'High Performance Teams',
        description: 'Build and scale high-performing teams. Focus on hiring, culture, performance management, and team dynamics.',
        subcomponents: [
            { id: '11A', title: 'Hiring Framework', agent: 'Talent Acquisition Strategist' },
            { id: '11B', title: 'Onboarding Process', agent: 'Onboarding Experience Designer' },
            { id: '11C', title: 'Performance Management', agent: 'Performance Management Expert' },
            { id: '11D', title: 'Team Culture', agent: 'Culture Development Specialist' },
            { id: '11E', title: 'Skills Development', agent: 'Skills Development Coordinator' },
            { id: '11F', title: 'Team Scaling', agent: 'Team Scaling Strategist' }
        ]
    },
    '12': {
        title: 'Retention Systems',
        description: 'Build systematic approaches to customer retention. Focus on engagement, satisfaction, and long-term value creation.',
        subcomponents: [
            { id: '12A', title: 'Retention Analytics', agent: 'Retention Analytics Expert' },
            { id: '12B', title: 'Engagement Programs', agent: 'Engagement Program Designer' },
            { id: '12C', title: 'Loyalty Framework', agent: 'Loyalty Program Architect' },
            { id: '12D', title: 'Win-Back Campaigns', agent: 'Win-Back Strategy Specialist' },
            { id: '12E', title: 'Satisfaction Tracking', agent: 'Satisfaction Measurement Expert' },
            { id: '12F', title: 'Retention Playbooks', agent: 'Retention Playbook Creator' }
        ]
    },
    '13': {
        title: 'Market Domination Strategies',
        description: 'Develop strategies to dominate your market segment. Focus on competitive positioning, market expansion, and category creation.',
        subcomponents: [
            { id: '13A', title: 'Market Positioning', agent: 'Market Position Strategist' },
            { id: '13B', title: 'Category Creation', agent: 'Category Creation Expert' },
            { id: '13C', title: 'Competitive Moats', agent: 'Competitive Advantage Builder' },
            { id: '13D', title: 'Market Expansion', agent: 'Market Expansion Planner' },
            { id: '13E', title: 'Partnership Strategy', agent: 'Strategic Partnership Designer' },
            { id: '13F', title: 'Ecosystem Development', agent: 'Ecosystem Growth Manager' }
        ]
    },
    '14': {
        title: 'Operational Infrastructure',
        description: 'Build scalable operational systems and processes. Focus on efficiency, automation, and operational excellence.',
        subcomponents: [
            { id: '14A', title: 'Process Automation', agent: 'Process Automation Architect' },
            { id: '14B', title: 'System Integration', agent: 'Systems Integration Specialist' },
            { id: '14C', title: 'Data Infrastructure', agent: 'Data Infrastructure Designer' },
            { id: '14D', title: 'Security Framework', agent: 'Security Framework Expert' },
            { id: '14E', title: 'Compliance Systems', agent: 'Compliance Systems Manager' },
            { id: '14F', title: 'SLA Management', agent: 'SLA Performance Manager' }
        ]
    },
    '15': {
        title: 'Leadership Expansion',
        description: 'Scale leadership capabilities across the organization. Focus on executive development, succession planning, and organizational design.',
        subcomponents: [
            { id: '15A', title: 'Executive Hiring', agent: 'Executive Talent Scout' },
            { id: '15B', title: 'Succession Planning', agent: 'Succession Planning Strategist' },
            { id: '15C', title: 'Executive Cadence', agent: 'Executive Rhythm Designer' },
            { id: '15D', title: 'Culture Health Assessment', agent: 'Culture Health Analyst' },
            { id: '15E', title: 'Organizational Design', agent: 'Org Design Architect' },
            { id: '15F', title: 'DEI Integration', agent: 'DEI Strategy Leader' }
        ]
    },
    '16': {
        title: 'Global Expansion Opportunities',
        description: 'Plan and execute global expansion strategies. Focus on market entry, localization, and international operations.',
        subcomponents: [
            { id: '16A', title: 'Market Entry Analysis', agent: 'Market Entry Strategist' },
            { id: '16B', title: 'Localization Strategy', agent: 'Localization Expert' },
            { id: '16C', title: 'International Pricing', agent: 'Global Pricing Strategist' },
            { id: '16D', title: 'Compliance Management', agent: 'International Compliance Manager' },
            { id: '16E', title: 'Geographic GTM Strategy', agent: 'Geographic GTM Designer' },
            { id: '16F', title: 'Expansion Risk Assessment', agent: 'Expansion Risk Analyst' }
        ]
    }
};

// Template for block HTML
function generateBlockHTML(blockNum, config) {
    const subcomponentsHTML = config.subcomponents.map(sub => {
        const fileId = sub.id.toLowerCase();
        return `
            <a href="subcomponent-${fileId}-${sub.title.toLowerCase().replace(/\s+/g, '-')}.html" class="subcomponent-card">
                <span class="subcomponent-id">${sub.id}</span>
                <h3 class="subcomponent-title">${sub.title}</h3>
                <p class="subcomponent-agent">${sub.agent}</p>
                <div class="subcomponent-score">
                    <div>
                        <div class="score-value">--</div>
                        <div class="score-label">Score</div>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                </div>
            </a>`;
    }).join('\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Block ${blockNum}: ${config.title} - ScaleOps6 Platform</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #000;
            color: #fff;
            min-height: 100vh;
        }
        .header {
            background: linear-gradient(135deg, #FF5500 0%, #FF8800 100%);
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .logo { font-size: 1.5rem; font-weight: bold; }
        .nav { display: flex; gap: 2rem; }
        .nav a { color: white; text-decoration: none; }
        .breadcrumb {
            padding: 1rem 2rem;
            color: #888;
            font-size: 0.9rem;
        }
        .breadcrumb a { color: #FF5500; text-decoration: none; }
        .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        .block-header {
            text-align: center;
            margin-bottom: 3rem;
            padding: 2rem;
            background: linear-gradient(135deg, rgba(255,85,0,0.1) 0%, rgba(255,136,0,0.1) 100%);
            border-radius: 12px;
        }
        .block-number {
            display: inline-block;
            background: #FF5500;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-weight: bold;
            margin-bottom: 1rem;
        }
        .block-title { font-size: 2.5rem; margin-bottom: 1rem; }
        .block-description { color: #ccc; line-height: 1.6; }
        .subcomponents-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        .subcomponent-card {
            background: #111;
            border: 1px solid #333;
            border-radius: 12px;
            padding: 1.5rem;
            transition: all 0.3s ease;
            cursor: pointer;
            text-decoration: none;
            color: inherit;
            display: block;
        }
        .subcomponent-card:hover {
            border-color: #FF5500;
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(255,85,0,0.2);
        }
        .subcomponent-id {
            display: inline-block;
            background: #222;
            color: #FF5500;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.85rem;
            margin-bottom: 0.5rem;
        }
        .subcomponent-title { font-size: 1.25rem; margin-bottom: 0.5rem; }
        .subcomponent-agent {
            color: #888;
            font-size: 0.9rem;
            margin-bottom: 1rem;
        }
        .subcomponent-score {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid #333;
        }
        .score-value {
            font-size: 1.5rem;
            font-weight: bold;
            color: #FF5500;
        }
        .score-label { color: #666; font-size: 0.85rem; }
        .progress-bar {
            flex: 1;
            height: 8px;
            background: #222;
            border-radius: 4px;
            overflow: hidden;
        }
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #FF5500, #FF8800);
            border-radius: 4px;
            transition: width 0.3s ease;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">ScaleOps6 Platform</div>
        <nav class="nav">
            <a href="index.html">Dashboard</a>
            <a href="#">Analytics</a>
            <a href="#">Settings</a>
        </nav>
    </div>

    <div class="breadcrumb">
        <a href="index.html">Dashboard</a> / Block ${blockNum}: ${config.title}
    </div>

    <div class="container">
        <div class="block-header">
            <span class="block-number">BLOCK ${blockNum}</span>
            <h1 class="block-title">${config.title}</h1>
            <p class="block-description">
                ${config.description}
            </p>
        </div>

        <div class="subcomponents-grid">
            ${subcomponentsHTML}
        </div>
    </div>

    <script>
        // Load scores from localStorage if available
        document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.subcomponent-card');
            
            cards.forEach(card => {
                const href = card.getAttribute('href');
                const subcomponentId = href.match(/subcomponent-(\\d+[a-f])/i)?.[1];
                
                if (subcomponentId) {
                    const savedScore = localStorage.getItem(\`score_\${subcomponentId}\`);
                    if (savedScore && savedScore !== 'null') {
                        const scoreValue = card.querySelector('.score-value');
                        const progressFill = card.querySelector('.progress-fill');
                        
                        scoreValue.textContent = savedScore;
                        progressFill.style.width = savedScore + '%';
                    }
                }
            });
        });
    </script>
</body>
</html>`;
}

// Fix all blocks
console.log('🚀 Starting to fix all block layouts...\n');

Object.entries(blockConfigs).forEach(([blockNum, config]) => {
    const fileName = `block-${blockNum}-${config.title.toLowerCase().replace(/\s+/g, '-')}.html`;
    const html = generateBlockHTML(blockNum, config);
    
    try {
        fs.writeFileSync(fileName, html);
        console.log(`✅ Fixed ${fileName}`);
    } catch (error) {
        console.error(`❌ Error fixing ${fileName}:`, error.message);
    }
});

// Fix tab switching in subcomponents
console.log('\n🔧 Fixing tab switching in subcomponents...\n');

const fixTabSwitching = `
// Fix tab switching - use consistent class names
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.dataset.tab;
        
        // Update active tab
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Update active pane - use consistent class name
        document.querySelectorAll('.tab-content').forEach(pane => {
            pane.classList.remove('active');
            pane.style.display = 'none';
        });
        
        const targetPane = document.getElementById(tabName);
        if (targetPane) {
            targetPane.classList.add('active');
            targetPane.style.display = 'block';
        }
    });
});`;

// Get all subcomponent files
const files = fs.readdirSync('.').filter(f => f.startsWith('subcomponent-') && f.endsWith('.html'));

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        
        // Fix class name inconsistencies
        content = content.replace(/class="tab-pane"/g, 'class="tab-content"');
        content = content.replace(/\.tab-pane/g, '.tab-content');
        content = content.replace(/getElementById\(tabName\)\.classList\.add\('active'\)/g, 
                                 "getElementById(tabName); if (targetPane) { targetPane.classList.add('active'); targetPane.style.display = 'block'; }");
        
        fs.writeFileSync(file, content);
        console.log(`✅ Fixed tab switching in ${file}`);
    } catch (error) {
        console.error(`❌ Error fixing ${file}:`, error.message);
    }
});

console.log('\n✨ All fixes completed!');
console.log('\nNext steps:');
console.log('1. Implement unique agent logic for each subcomponent');
console.log('2. Add database persistence and API endpoints');
console.log('3. Generate unique content for each agent');
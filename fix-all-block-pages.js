// Script to apply consistent styling to all block pages
const fs = require('fs');
const path = require('path');

// Define the block data
const blocks = [
    {
        id: 1,
        file: 'block-1-mission-discovery.html',
        title: 'MISSION DISCOVERY',
        subtitle: 'Ensure clarity on the problem, target customer, solution thesis, and internal team alignment',
        description: 'Define your problem statement, mission, customer insights, founding team capability, market insights, and prototype launch plan',
        score: 54,
        subcomponents: [
            { id: '1-1', title: 'PROBLEM STATEMENT DEFINITION', desc: 'Focused articulation of the specific problem you solve', score: 64 },
            { id: '1-2', title: 'MISSION STATEMENT', desc: "Declaration of the startup's purpose and vision", score: 20 },
            { id: '1-3', title: 'CUSTOMER INSIGHT CAPTURE', desc: 'Raw and synthesized data from target users', score: 55 },
            { id: '1-4', title: 'FOUNDING TEAM CAPABILITY', desc: "Audit of founding team's ability to execute", score: 30 },
            { id: '1-5', title: 'MARKET INSIGHT SYNTHESIS', desc: 'Summary of market landscape and timing', score: 75 },
            { id: '1-6', title: 'PROTOTYPE LAUNCH PLAN', desc: 'Concrete plan to launch functional prototype', score: 78 }
        ]
    },
    {
        id: 2,
        file: 'block-2-customer-insights.html',
        title: 'CUSTOMER INSIGHTS',
        subtitle: 'Deep understanding of customer needs, behaviors, and pain points',
        description: 'Develop comprehensive customer profiles, journey maps, and validated insights',
        score: 68,
        subcomponents: [
            { id: '2-1', title: 'CUSTOMER SEGMENTATION', desc: 'Clear definition of target customer segments', score: 72 },
            { id: '2-2', title: 'PAIN POINT ANALYSIS', desc: 'Documented customer problems and frustrations', score: 65 },
            { id: '2-3', title: 'JOURNEY MAPPING', desc: 'Complete customer journey visualization', score: 60 },
            { id: '2-4', title: 'VOICE OF CUSTOMER', desc: 'Direct customer feedback and testimonials', score: 70 },
            { id: '2-5', title: 'BEHAVIORAL INSIGHTS', desc: 'Understanding of customer behaviors and patterns', score: 68 },
            { id: '2-6', title: 'NEEDS VALIDATION', desc: 'Validated customer needs and requirements', score: 73 }
        ]
    },
    {
        id: 3,
        file: 'block-3-strategic-prioritization.html',
        title: 'STRATEGIC PRIORITIZATION',
        subtitle: 'Focus resources on highest-impact initiatives',
        description: 'Prioritize features, markets, and initiatives based on strategic value',
        score: 72,
        subcomponents: [
            { id: '3-1', title: 'FEATURE PRIORITIZATION', desc: 'Ranked list of product features by impact', score: 75 },
            { id: '3-2', title: 'MARKET SELECTION', desc: 'Strategic choice of target markets', score: 70 },
            { id: '3-3', title: 'RESOURCE ALLOCATION', desc: 'Optimal distribution of resources', score: 68 },
            { id: '3-4', title: 'RISK ASSESSMENT', desc: 'Identified and mitigated key risks', score: 72 },
            { id: '3-5', title: 'OPPORTUNITY ANALYSIS', desc: 'Evaluated growth opportunities', score: 74 },
            { id: '3-6', title: 'STRATEGIC ROADMAP', desc: 'Clear path to strategic goals', score: 73 }
        ]
    }
    // Add more blocks as needed
];

// Template for the HTML structure
const generateBlockHTML = (block) => {
    const subcomponentsHTML = block.subcomponents.map(sub => `
                <!-- ${sub.title} -->
                <a href="block-${sub.id}.html" class="subcomponent-card">
                    <div class="subcomponent-header">
                        <h3 class="subcomponent-title">${sub.title}</h3>
                        <div class="subcomponent-score">${sub.score}%</div>
                    </div>
                    <p class="subcomponent-description">${sub.desc}</p>
                    <span class="status-badge in-progress">In Progress</span>
                </a>`).join('\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Block ${block.id}: ${block.title} - ScaleOps6</title>
    <link rel="icon" type="image/png" href="/Official_ScaleOps6_Logo.png">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #000000;
            color: #ffffff;
            min-height: 100vh;
        }

        /* Header with ScaleOps branding */
        .header {
            background: #000;
            padding: 20px 40px;
            border-bottom: 1px solid #333;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .logo img {
            height: 40px;
        }

        .logo-text {
            font-size: 24px;
            font-weight: 700;
            color: #fff;
        }

        .logo-text span {
            color: #FF5500;
        }

        .nav-links {
            display: flex;
            gap: 30px;
            align-items: center;
        }

        .nav-links a {
            color: #999;
            text-decoration: none;
            font-size: 14px;
            transition: color 0.3s;
        }

        .nav-links a:hover {
            color: #FF5500;
        }

        .logout-btn {
            background: transparent;
            border: 1px solid #FF5500;
            color: #FF5500;
            padding: 8px 20px;
            border-radius: 20px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.3s;
        }

        .logout-btn:hover {
            background: #FF5500;
            color: #000;
        }

        /* Main container */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px;
        }

        /* Block detail container - matching the screenshot */
        .block-detail-container {
            background: #1a1a1a;
            border: 2px solid #FF5500;
            border-radius: 20px;
            padding: 40px;
            margin-bottom: 30px;
        }

        .block-header {
            margin-bottom: 30px;
        }

        .block-title {
            font-size: 36px;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .block-subtitle {
            color: #999;
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 30px;
        }

        .score-display {
            font-size: 72px;
            font-weight: 800;
            color: #FF5500;
            margin-bottom: 5px;
        }

        .score-label {
            font-size: 14px;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        /* Progress bar */
        .progress-container {
            background: rgba(255, 85, 0, 0.2);
            height: 40px;
            border-radius: 20px;
            overflow: hidden;
            margin-bottom: 40px;
        }

        .progress-fill {
            background: #FF5500;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #000;
            font-weight: 700;
            font-size: 16px;
            transition: width 0.5s ease;
        }

        /* Sub-components section */
        .subcomponents-section {
            margin-top: 40px;
        }

        .section-title {
            font-size: 24px;
            font-weight: 600;
            color: #FF5500;
            margin-bottom: 30px;
        }

        .subcomponents-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
        }

        .subcomponent-card {
            background: rgba(255, 255, 255, 0.02);
            border: 2px solid #333;
            border-radius: 15px;
            padding: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            color: inherit;
            display: block;
            position: relative;
        }

        .subcomponent-card:hover {
            border-color: #FF5500;
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(255, 85, 0, 0.2);
            background: rgba(255, 85, 0, 0.05);
        }

        .subcomponent-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 15px;
        }

        .subcomponent-title {
            font-size: 18px;
            font-weight: 700;
            color: #ffffff;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .subcomponent-score {
            font-size: 28px;
            font-weight: 800;
            color: #FF5500;
        }

        .subcomponent-description {
            color: #999;
            font-size: 14px;
            line-height: 1.5;
            margin-bottom: 15px;
        }

        .status-badge {
            display: inline-block;
            padding: 5px 12px;
            border-radius: 15px;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            background: rgba(255, 152, 0, 0.2);
            color: #FF9800;
        }

        .status-badge.in-progress {
            background: rgba(255, 152, 0, 0.2);
            color: #FF9800;
        }

        /* Powered by section */
        .powered-by {
            position: fixed;
            bottom: 20px;
            right: 20px;
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 10px 20px;
            background: rgba(0, 0, 0, 0.8);
            border: 1px solid #333;
            border-radius: 25px;
            font-size: 12px;
            color: #666;
        }

        .powered-by img {
            height: 20px;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <div class="header">
        <div class="logo">
            <img src="/Official_ScaleOps6_Logo.png" alt="ScaleOps6">
            <div class="logo-text">scale<span>ops</span></div>
        </div>
        <div class="nav-links">
            <a href="dashboard.html">Dashboard</a>
            <a href="#">ST6CO</a>
            <button class="logout-btn">Logout</button>
        </div>
    </div>

    <div class="container">
        <!-- Main block container -->
        <div class="block-detail-container">
            <div class="block-header">
                <h1 class="block-title">${block.title}</h1>
                <p class="block-subtitle">
                    ${block.subtitle}
                </p>
                <p style="color: #666; font-size: 14px; margin-top: 10px;">
                    ${block.description}
                </p>
                <div class="score-display">${block.score}%</div>
                <div class="score-label">CURRENT SCORE</div>
            </div>

            <!-- Progress bar -->
            <div class="progress-container">
                <div class="progress-fill" style="width: ${block.score}%;">
                    ${block.score}% Complete
                </div>
            </div>
        </div>

        <!-- Sub-components section -->
        <div class="subcomponents-section">
            <h2 class="section-title">Sub-Components</h2>
            <div class="subcomponents-grid">
${subcomponentsHTML}
            </div>
        </div>
    </div>

    <!-- Powered by section -->
    <div class="powered-by">
        <span>powered by</span>
        <img src="/scaleteam-logo.png" alt="ScaleTeam">
        <span style="color: #FF5500; font-weight: 600;">scaleteam</span>
    </div>
</body>
</html>`;
};

// Process each block
blocks.forEach(block => {
    const html = generateBlockHTML(block);
    const filePath = path.join(__dirname, block.file);
    
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✅ Updated ${block.file}`);
});

console.log('\n✨ All block pages have been updated with consistent styling!');
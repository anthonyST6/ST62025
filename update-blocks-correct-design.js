const fs = require('fs');

// Block configurations with all modules and scores
const blocks = [
    {
        number: 1,
        title: "Mission Discovery",
        phase: "IDEA MARKET FIT",
        phaseNum: 1,
        description: "Define your core purpose, vision, and strategic direction",
        modules: [
            { num: "1-1", title: "PROBLEM STATEMENT", score: 27, status: "ACTIVE" },
            { num: "1-2", title: "SOLUTION FRAMEWORK", score: 35, status: "IN PROGRESS" },
            { num: "1-3", title: "TARGET MARKET", score: 42, status: "IN PROGRESS" },
            { num: "1-4", title: "VALUE PROPOSITION", score: 58, status: "ACTIVE" },
            { num: "1-5", title: "BUSINESS MODEL", score: 31, status: "PENDING" },
            { num: "1-6", title: "FOUNDING TEAM", score: 45, status: "PENDING" }
        ]
    },
    {
        number: 2,
        title: "Customer Insights",
        phase: "IDEA MARKET FIT",
        phaseNum: 1,
        modules: [
            { num: "2-1", title: "CUSTOMER RESEARCH", score: 65, status: "ACTIVE" },
            { num: "2-2", title: "PAIN POINT ANALYSIS", score: 72, status: "ACTIVE" },
            { num: "2-3", title: "USER PERSONAS", score: 58, status: "IN PROGRESS" },
            { num: "2-4", title: "JOURNEY MAPPING", score: 45, status: "PENDING" },
            { num: "2-5", title: "MARKET VALIDATION", score: 68, status: "ACTIVE" },
            { num: "2-6", title: "COMPETITIVE ANALYSIS", score: 75, status: "ACTIVE" }
        ]
    },
    {
        number: 3,
        title: "Strategic Prioritization",
        phase: "IDEA MARKET FIT",
        phaseNum: 1,
        modules: [
            { num: "3-1", title: "GOAL SETTING", score: 82, status: "ACTIVE" },
            { num: "3-2", title: "RESOURCE ALLOCATION", score: 67, status: "IN PROGRESS" },
            { num: "3-3", title: "RISK ASSESSMENT", score: 71, status: "ACTIVE" },
            { num: "3-4", title: "TIMELINE PLANNING", score: 78, status: "ACTIVE" },
            { num: "3-5", title: "SUCCESS METRICS", score: 85, status: "ACTIVE" },
            { num: "3-6", title: "DECISION FRAMEWORK", score: 73, status: "ACTIVE" }
        ]
    },
    {
        number: 4,
        title: "Prototype Launch",
        phase: "PRODUCT MARKET FIT",
        phaseNum: 2,
        modules: [
            { num: "4-1", title: "MVP DEVELOPMENT", score: 88, status: "ACTIVE" },
            { num: "4-2", title: "TESTING PROTOCOL", score: 76, status: "ACTIVE" },
            { num: "4-3", title: "USER FEEDBACK", score: 81, status: "ACTIVE" },
            { num: "4-4", title: "ITERATION PROCESS", score: 79, status: "ACTIVE" },
            { num: "4-5", title: "QUALITY ASSURANCE", score: 84, status: "ACTIVE" },
            { num: "4-6", title: "LAUNCH STRATEGY", score: 77, status: "IN PROGRESS" }
        ]
    },
    {
        number: 5,
        title: "Early Adopter Wins",
        phase: "PRODUCT MARKET FIT",
        phaseNum: 2,
        modules: [
            { num: "5-1", title: "ADOPTER IDENTIFICATION", score: 91, status: "ACTIVE" },
            { num: "5-2", title: "ONBOARDING EXCELLENCE", score: 87, status: "ACTIVE" },
            { num: "5-3", title: "SUCCESS STORIES", score: 93, status: "ACTIVE" },
            { num: "5-4", title: "REFERENCE PROGRAM", score: 89, status: "ACTIVE" },
            { num: "5-5", title: "COMMUNITY BUILDING", score: 85, status: "ACTIVE" },
            { num: "5-6", title: "ADVOCACY DEVELOPMENT", score: 92, status: "ACTIVE" }
        ]
    },
    {
        number: 6,
        title: "Customer Engagement Flywheel",
        phase: "PRODUCT MARKET FIT",
        phaseNum: 2,
        modules: [
            { num: "6-1", title: "ENGAGEMENT STRATEGY", score: 78, status: "ACTIVE" },
            { num: "6-2", title: "RETENTION PROGRAMS", score: 82, status: "ACTIVE" },
            { num: "6-3", title: "UPSELL FRAMEWORK", score: 74, status: "IN PROGRESS" },
            { num: "6-4", title: "REFERRAL SYSTEM", score: 69, status: "IN PROGRESS" },
            { num: "6-5", title: "LOYALTY PROGRAMS", score: 71, status: "ACTIVE" },
            { num: "6-6", title: "FEEDBACK LOOPS", score: 86, status: "ACTIVE" }
        ]
    },
    {
        number: 7,
        title: "Quantifiable Impact",
        phase: "PRODUCT MARKET FIT",
        phaseNum: 2,
        modules: [
            { num: "7-1", title: "IMPACT METRICS", score: 88, status: "ACTIVE" },
            { num: "7-2", title: "ROI ANALYSIS", score: 85, status: "ACTIVE" },
            { num: "7-3", title: "CASE STUDIES", score: 91, status: "ACTIVE" },
            { num: "7-4", title: "PERFORMANCE DASHBOARDS", score: 83, status: "ACTIVE" },
            { num: "7-5", title: "BENCHMARKING", score: 79, status: "IN PROGRESS" },
            { num: "7-6", title: "VALUE DOCUMENTATION", score: 87, status: "ACTIVE" }
        ]
    },
    {
        number: 8,
        title: "Customer Success Expansion",
        phase: "PRODUCT MARKET FIT",
        phaseNum: 2,
        modules: [
            { num: "8-1", title: "SUCCESS PLAYBOOKS", score: 76, status: "ACTIVE" },
            { num: "8-2", title: "SUPPORT INFRASTRUCTURE", score: 81, status: "ACTIVE" },
            { num: "8-3", title: "HEALTH SCORING", score: 73, status: "IN PROGRESS" },
            { num: "8-4", title: "EXPANSION PLANNING", score: 68, status: "IN PROGRESS" },
            { num: "8-5", title: "SUCCESS METRICS", score: 84, status: "ACTIVE" },
            { num: "8-6", title: "TEAM SCALING", score: 77, status: "ACTIVE" }
        ]
    },
    {
        number: 9,
        title: "Proof of Execution",
        phase: "GO-TO-MARKET",
        phaseNum: 3,
        modules: [
            { num: "9-1", title: "EXECUTION FRAMEWORK", score: 82, status: "ACTIVE" },
            { num: "9-2", title: "PERFORMANCE TRACKING", score: 88, status: "ACTIVE" },
            { num: "9-3", title: "PROCESS OPTIMIZATION", score: 79, status: "ACTIVE" },
            { num: "9-4", title: "QUALITY STANDARDS", score: 86, status: "ACTIVE" },
            { num: "9-5", title: "DELIVERY EXCELLENCE", score: 91, status: "ACTIVE" },
            { num: "9-6", title: "RESULTS COMMUNICATION", score: 84, status: "ACTIVE" }
        ]
    },
    {
        number: 10,
        title: "Sales Team Empowerment",
        phase: "GO-TO-MARKET",
        phaseNum: 3,
        modules: [
            { num: "10-1", title: "SALES TRAINING", score: 75, status: "IN PROGRESS" },
            { num: "10-2", title: "SALES TOOLS", score: 83, status: "ACTIVE" },
            { num: "10-3", title: "COMPENSATION DESIGN", score: 78, status: "ACTIVE" },
            { num: "10-4", title: "TERRITORY PLANNING", score: 71, status: "IN PROGRESS" },
            { num: "10-5", title: "PIPELINE MANAGEMENT", score: 87, status: "ACTIVE" },
            { num: "10-6", title: "SALES ANALYTICS", score: 80, status: "ACTIVE" }
        ]
    },
    {
        number: 11,
        title: "High Performance Teams",
        phase: "GO-TO-MARKET",
        phaseNum: 3,
        modules: [
            { num: "11-1", title: "TEAM STRUCTURE", score: 84, status: "ACTIVE" },
            { num: "11-2", title: "TALENT ACQUISITION", score: 89, status: "ACTIVE" },
            { num: "11-3", title: "PERFORMANCE MANAGEMENT", score: 77, status: "ACTIVE" },
            { num: "11-4", title: "CAREER DEVELOPMENT", score: 73, status: "IN PROGRESS" },
            { num: "11-5", title: "CULTURE BUILDING", score: 85, status: "ACTIVE" },
            { num: "11-6", title: "TEAM COLLABORATION", score: 90, status: "ACTIVE" }
        ]
    },
    {
        number: 12,
        title: "Retention Systems",
        phase: "GO-TO-MARKET",
        phaseNum: 3,
        modules: [
            { num: "12-1", title: "CHURN ANALYSIS", score: 72, status: "IN PROGRESS" },
            { num: "12-2", title: "RETENTION STRATEGIES", score: 81, status: "ACTIVE" },
            { num: "12-3", title: "EMPLOYEE RETENTION", score: 86, status: "ACTIVE" },
            { num: "12-4", title: "SATISFACTION MONITORING", score: 88, status: "ACTIVE" },
            { num: "12-5", title: "WIN-BACK PROGRAMS", score: 67, status: "PENDING" },
            { num: "12-6", title: "LOYALTY ANALYTICS", score: 79, status: "ACTIVE" }
        ]
    },
    {
        number: 13,
        title: "Market Domination Strategies",
        phase: "SCALING IMPACT",
        phaseNum: 4,
        modules: [
            { num: "13-1", title: "MARKET ANALYSIS", score: 91, status: "ACTIVE" },
            { num: "13-2", title: "COMPETITIVE STRATEGY", score: 87, status: "ACTIVE" },
            { num: "13-3", title: "MARKET POSITIONING", score: 93, status: "ACTIVE" },
            { num: "13-4", title: "BRAND BUILDING", score: 89, status: "ACTIVE" },
            { num: "13-5", title: "PARTNERSHIP STRATEGY", score: 82, status: "ACTIVE" },
            { num: "13-6", title: "MARKET EXPANSION", score: 85, status: "ACTIVE" }
        ]
    },
    {
        number: 14,
        title: "Operational Infrastructure",
        phase: "SCALING IMPACT",
        phaseNum: 4,
        modules: [
            { num: "14-1", title: "SYSTEM ARCHITECTURE", score: 78, status: "ACTIVE" },
            { num: "14-2", title: "PROCESS AUTOMATION", score: 84, status: "ACTIVE" },
            { num: "14-3", title: "DATA INFRASTRUCTURE", score: 81, status: "ACTIVE" },
            { num: "14-4", title: "SECURITY SYSTEMS", score: 88, status: "ACTIVE" },
            { num: "14-5", title: "COMPLIANCE FRAMEWORK", score: 92, status: "ACTIVE" },
            { num: "14-6", title: "DISASTER RECOVERY", score: 76, status: "IN PROGRESS" }
        ]
    },
    {
        number: 15,
        title: "Leadership Expansion",
        phase: "SCALE",
        phaseNum: 5,
        modules: [
            { num: "15-1", title: "LEADERSHIP DEVELOPMENT", score: 83, status: "ACTIVE" },
            { num: "15-2", title: "SUCCESSION PLANNING", score: 77, status: "IN PROGRESS" },
            { num: "15-3", title: "EXECUTIVE COACHING", score: 85, status: "ACTIVE" },
            { num: "15-4", title: "BOARD DEVELOPMENT", score: 79, status: "ACTIVE" },
            { num: "15-5", title: "LEADERSHIP PIPELINE", score: 81, status: "ACTIVE" },
            { num: "15-6", title: "CHANGE MANAGEMENT", score: 88, status: "ACTIVE" }
        ]
    },
    {
        number: 16,
        title: "Global Expansion Opportunities",
        phase: "SCALE",
        phaseNum: 5,
        modules: [
            { num: "16-1", title: "MARKET RESEARCH", score: 74, status: "IN PROGRESS" },
            { num: "16-2", title: "LOCALIZATION STRATEGY", score: 69, status: "PENDING" },
            { num: "16-3", title: "INTERNATIONAL OPERATIONS", score: 71, status: "IN PROGRESS" },
            { num: "16-4", title: "GLOBAL PARTNERSHIPS", score: 76, status: "ACTIVE" },
            { num: "16-5", title: "REGULATORY COMPLIANCE", score: 82, status: "ACTIVE" },
            { num: "16-6", title: "CULTURAL ADAPTATION", score: 78, status: "ACTIVE" }
        ]
    }
];

// Template for block pages matching the exact design
const createBlockPage = (block) => {
    const blockSlug = block.title.toLowerCase().replace(/\s+/g, '-');
    
    // Calculate average score
    const avgScore = Math.round(
        block.modules.reduce((sum, m) => sum + m.score, 0) / block.modules.length
    );
    
    // Generate modules HTML
    const modulesHtml = block.modules.map((module, index) => {
        const moduleNum = index + 1;
        let borderColor = '#333';
        let scoreColor = '#666';
        
        if (module.score >= 80) {
            borderColor = '#4CAF50';
            scoreColor = '#4CAF50';
        } else if (module.score >= 60) {
            borderColor = '#FF9800';
            scoreColor = '#FF9800';
        } else if (module.score >= 40) {
            borderColor = '#FF5722';
            scoreColor = '#FF5722';
        } else {
            borderColor = '#F44336';
            scoreColor = '#F44336';
        }
        
        let statusBg = 'rgba(255, 255, 255, 0.1)';
        let statusColor = '#666';
        
        if (module.status === 'ACTIVE') {
            statusBg = 'rgba(76, 175, 80, 0.3)';
            statusColor = '#4CAF50';
        } else if (module.status === 'IN PROGRESS') {
            statusBg = 'rgba(255, 87, 34, 0.3)';
            statusColor = '#FF5722';
        } else if (module.status === 'PENDING') {
            statusBg = 'rgba(255, 255, 255, 0.1)';
            statusColor = '#666';
        }
        
        return `
            <a href="block-${module.num}.html" class="module-card" style="border-color: ${borderColor};">
                <div class="module-number">${moduleNum}</div>
                <div class="module-score" style="color: ${scoreColor};">${module.score}%</div>
                <div class="module-title">${module.title}</div>
                <div class="module-status" style="background: ${statusBg}; color: ${statusColor};">${module.status}</div>
            </a>`;
    }).join('\n');
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${block.title} - ScaleOps6</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #000000;
            color: #ffffff;
            min-height: 100vh;
            padding: 20px;
        }

        /* Header */
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 1px solid #333;
        }

        .logo {
            font-size: 32px;
            font-weight: 800;
            color: #ffffff;
            text-decoration: none;
            display: flex;
            align-items: baseline;
        }

        .logo .scale {
            color: #ffffff;
        }

        .logo .ops {
            color: #FF5500;
        }

        .logo sup {
            font-size: 18px;
            color: #FF5500;
            margin-left: 2px;
        }

        .nav-links {
            display: flex;
            gap: 30px;
            align-items: center;
        }

        .nav-links a {
            color: rgba(255, 255, 255, 0.7);
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
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
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.3s;
            text-decoration: none;
        }

        .logout-btn:hover {
            background: #FF5500;
            color: #000000;
        }

        /* Main Title */
        .main-title {
            text-align: center;
            margin-bottom: 10px;
        }

        .main-title h1 {
            font-size: 48px;
            font-weight: 700;
            letter-spacing: -1px;
        }

        .subtitle {
            text-align: center;
            color: #666;
            font-size: 16px;
            margin-bottom: 40px;
        }

        /* Back Button */
        .back-button {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: #FF5500;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 30px;
            transition: opacity 0.3s;
        }

        .back-button:hover {
            opacity: 0.8;
        }

        /* Phase Header */
        .phase-header {
            background: #FF5500;
            color: #000000;
            padding: 15px 30px;
            border-radius: 50px;
            display: inline-flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            max-width: 1200px;
            margin: 0 auto 30px;
            font-weight: 700;
            font-size: 16px;
            letter-spacing: 1px;
        }

        .phase-score {
            background: rgba(0, 0, 0, 0.3);
            color: #ffffff;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 14px;
        }

        /* Block Info */
        .block-info {
            text-align: center;
            margin-bottom: 40px;
        }

        .block-title {
            font-size: 36px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 10px;
        }

        .block-description {
            color: #999;
            font-size: 16px;
            max-width: 600px;
            margin: 0 auto;
        }

        /* Modules Grid */
        .modules-container {
            max-width: 1200px;
            margin: 0 auto;
        }

        .modules-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 20px;
            margin-top: 40px;
        }

        .module-card {
            background: #0a0a0a;
            border: 2px solid #333;
            border-radius: 12px;
            padding: 30px;
            position: relative;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            color: #ffffff;
            display: block;
        }

        .module-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(255, 85, 0, 0.2);
        }

        .module-number {
            position: absolute;
            top: 15px;
            left: 20px;
            font-size: 14px;
            color: #666;
            font-weight: 600;
        }

        .module-score {
            font-size: 48px;
            font-weight: 700;
            text-align: center;
            margin: 20px 0;
            color: #666;
        }

        .module-title {
            font-size: 16px;
            font-weight: 600;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 20px;
            color: #ffffff;
        }

        .module-status {
            display: inline-block;
            width: 100%;
            text-align: center;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .modules-grid {
                grid-template-columns: 1fr;
            }
            
            .nav-links {
                display: none;
            }
            
            .main-title h1 {
                font-size: 32px;
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <div class="header">
        <a href="st6-framework.html" class="logo">
            <span class="scale">scale</span><span class="ops">ops</span><sup>6</sup>
        </a>
        <div class="nav-links">
            <a href="st6-framework.html">Dashboard</a>
            <a href="#">Analytics</a>
            <a href="#">Resources</a>
            <a href="#">Help</a>
            <a href="#" class="logout-btn">Logout</a>
        </div>
    </div>

    <!-- Back Button -->
    <a href="st6-framework.html" class="back-button">
        ← Back to Framework
    </a>

    <!-- Phase Header -->
    <div class="phase-header">
        <span>${block.phase}</span>
        <span class="phase-score">${avgScore}%</span>
    </div>

    <!-- Block Info -->
    <div class="block-info">
        <h1 class="block-title">${block.title.toUpperCase()}</h1>
        <p class="block-description">${block.description}</p>
    </div>

    <!-- Modules Grid -->
    <div class="modules-container">
        <div class="modules-grid">
            ${modulesHtml}
        </div>
    </div>
</body>
</html>`;
};

// Generate all block pages
blocks.forEach(block => {
    const filename = `block-${block.number}-${block.title.toLowerCase().replace(/\s+/g, '-')}.html`;
    const content = createBlockPage(block);
    fs.writeFileSync(filename, content);
    console.log(`Created ${filename}`);
});

console.log('\nAll 16 block pages updated with the CORRECT design!');
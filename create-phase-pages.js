const fs = require('fs');

// Phase configurations
const phases = [
    {
        number: 2,
        name: "Product Market Fit",
        description: "Validate product-market fit through early adopter wins, build customer engagement systems, measure quantifiable impact, and expand customer success.",
        blocks: [
            { number: 5, title: "Early Adopter Wins", score: 88, status: "Active" },
            { number: 6, title: "Customer Engagement Flywheel", score: 82, status: "Active" },
            { number: 7, title: "Quantifiable Impact", score: 79, status: "In Progress" },
            { number: 8, title: "Customer Success Expansion", score: 80, status: "Active" }
        ]
    },
    {
        number: 3,
        name: "Go-To-Market",
        description: "Execute your go-to-market strategy with proof points, empower your sales team, build high-performance teams, and implement retention systems.",
        blocks: [
            { number: 9, title: "Proof Execution", score: 75, status: "Active" },
            { number: 10, title: "Sales Team Empowerment", score: 70, status: "In Progress" },
            { number: 11, title: "High Performance Teams", score: 65, status: "Planning" },
            { number: 12, title: "Retention Systems", score: 62, status: "Planning" }
        ]
    },
    {
        number: 4,
        name: "Scaling Impact",
        description: "Develop and execute market domination strategies to establish your position as the category leader.",
        blocks: [
            { number: 13, title: "Market Domination Strategies", score: 45, status: "Planning" }
        ]
    },
    {
        number: 5,
        name: "Scale",
        description: "Build operational infrastructure, expand leadership capabilities, and explore global expansion opportunities for sustainable growth.",
        blocks: [
            { number: 14, title: "Operational Infrastructure", score: 35, status: "Future" },
            { number: 15, title: "Leadership Expansion", score: 28, status: "Future" },
            { number: 16, title: "Global Expansion Opportunities", score: 27, status: "Future" }
        ]
    }
];

// Module descriptions for each block
const moduleDescriptions = {
    5: [
        { num: 1, title: "Early Adopter Identification", desc: "Identify and target your ideal early adopters" },
        { num: 2, title: "Pilot Program Design", desc: "Design effective pilot programs" },
        { num: 3, title: "Success Metrics", desc: "Define and track success metrics" },
        { num: 4, title: "Case Study Development", desc: "Create compelling case studies" },
        { num: 5, title: "Reference Program", desc: "Build a customer reference program" },
        { num: 6, title: "Win Analysis", desc: "Analyze and replicate winning patterns" }
    ],
    6: [
        { num: 1, title: "Engagement Strategy", desc: "Design customer engagement strategy" },
        { num: 2, title: "Community Building", desc: "Build and nurture user community" },
        { num: 3, title: "Content Strategy", desc: "Develop engaging content programs" },
        { num: 4, title: "Feedback Loops", desc: "Create continuous feedback systems" },
        { num: 5, title: "User Activation", desc: "Optimize user activation process" },
        { num: 6, title: "Engagement Metrics", desc: "Track and improve engagement metrics" }
    ],
    7: [
        { num: 1, title: "ROI Framework", desc: "Build ROI measurement framework" },
        { num: 2, title: "Impact Metrics", desc: "Define key impact metrics" },
        { num: 3, title: "Value Documentation", desc: "Document customer value creation" },
        { num: 4, title: "Benchmarking", desc: "Benchmark against alternatives" },
        { num: 5, title: "Success Stories", desc: "Capture quantifiable success stories" },
        { num: 6, title: "Value Communication", desc: "Communicate value effectively" }
    ],
    8: [
        { num: 1, title: "Success Planning", desc: "Create customer success plans" },
        { num: 2, title: "Onboarding Optimization", desc: "Optimize customer onboarding" },
        { num: 3, title: "Health Scoring", desc: "Implement customer health scoring" },
        { num: 4, title: "Expansion Strategy", desc: "Drive account expansion" },
        { num: 5, title: "Renewal Process", desc: "Optimize renewal processes" },
        { num: 6, title: "Advocacy Programs", desc: "Build customer advocacy programs" }
    ],
    9: [
        { num: 1, title: "Proof Point Development", desc: "Develop compelling proof points" },
        { num: 2, title: "Demo Strategy", desc: "Create effective demo strategies" },
        { num: 3, title: "Trial Programs", desc: "Design trial and POC programs" },
        { num: 4, title: "Sales Collateral", desc: "Build sales enablement materials" },
        { num: 5, title: "Competitive Positioning", desc: "Define competitive positioning" },
        { num: 6, title: "Win/Loss Analysis", desc: "Conduct win/loss analysis" }
    ],
    10: [
        { num: 1, title: "Sales Training", desc: "Develop sales training programs" },
        { num: 2, title: "Sales Process", desc: "Optimize sales methodology" },
        { num: 3, title: "Sales Tools", desc: "Implement sales enablement tools" },
        { num: 4, title: "Territory Planning", desc: "Design territory strategies" },
        { num: 5, title: "Compensation Design", desc: "Create effective comp plans" },
        { num: 6, title: "Performance Management", desc: "Track sales performance" }
    ],
    11: [
        { num: 1, title: "Team Structure", desc: "Design optimal team structure" },
        { num: 2, title: "Hiring Process", desc: "Build effective hiring processes" },
        { num: 3, title: "Culture Development", desc: "Foster high-performance culture" },
        { num: 4, title: "Training Programs", desc: "Implement training programs" },
        { num: 5, title: "Performance Systems", desc: "Create performance management" },
        { num: 6, title: "Team Scaling", desc: "Scale teams effectively" }
    ],
    12: [
        { num: 1, title: "Churn Analysis", desc: "Analyze and reduce churn" },
        { num: 2, title: "Retention Programs", desc: "Build retention programs" },
        { num: 3, title: "Customer Lifecycle", desc: "Optimize customer lifecycle" },
        { num: 4, title: "Loyalty Programs", desc: "Create loyalty initiatives" },
        { num: 5, title: "Upsell/Cross-sell", desc: "Drive expansion revenue" },
        { num: 6, title: "NPS Optimization", desc: "Improve Net Promoter Score" }
    ],
    13: [
        { num: 1, title: "Market Analysis", desc: "Analyze market dynamics" },
        { num: 2, title: "Category Creation", desc: "Define and own your category" },
        { num: 3, title: "Strategic Partnerships", desc: "Build strategic alliances" },
        { num: 4, title: "Channel Strategy", desc: "Develop channel programs" },
        { num: 5, title: "Ecosystem Development", desc: "Build partner ecosystem" },
        { num: 6, title: "Market Leadership", desc: "Establish thought leadership" }
    ],
    14: [
        { num: 1, title: "Operations Design", desc: "Design scalable operations" },
        { num: 2, title: "Process Automation", desc: "Automate key processes" },
        { num: 3, title: "Systems Integration", desc: "Integrate technology stack" },
        { num: 4, title: "Data Infrastructure", desc: "Build data infrastructure" },
        { num: 5, title: "Quality Systems", desc: "Implement quality controls" },
        { num: 6, title: "Compliance Framework", desc: "Ensure compliance readiness" }
    ],
    15: [
        { num: 1, title: "Leadership Development", desc: "Develop leadership capabilities" },
        { num: 2, title: "Succession Planning", desc: "Plan leadership succession" },
        { num: 3, title: "Executive Team", desc: "Build executive team" },
        { num: 4, title: "Board Development", desc: "Optimize board composition" },
        { num: 5, title: "Governance Structure", desc: "Establish governance" },
        { num: 6, title: "Leadership Culture", desc: "Foster leadership culture" }
    ],
    16: [
        { num: 1, title: "Market Selection", desc: "Select target markets" },
        { num: 2, title: "Localization Strategy", desc: "Plan localization approach" },
        { num: 3, title: "International Operations", desc: "Build global operations" },
        { num: 4, title: "Partnership Networks", desc: "Develop global partnerships" },
        { num: 5, title: "Regulatory Compliance", desc: "Navigate regulations" },
        { num: 6, title: "Global Scaling", desc: "Scale internationally" }
    ]
};

// Generate phase pages
phases.forEach(phase => {
    const phaseSlug = phase.name.toLowerCase().replace(/\s+/g, '-');
    const filename = `phase-${phase.number}-${phaseSlug}.html`;
    
    // Calculate phase score
    const phaseScore = Math.round(
        phase.blocks.reduce((sum, block) => sum + block.score, 0) / phase.blocks.length
    );
    
    // Generate blocks HTML
    const blocksHtml = phase.blocks.map(block => {
        const modules = moduleDescriptions[block.number] || [];
        const modulesHtml = modules.map(module => `
                    <a href="module-${block.number}-${module.num}.html" class="module-card">
                        <div class="module-number">${module.num}</div>
                        <h3 class="module-title">${module.title}</h3>
                        <p class="module-description">${module.desc}</p>
                        <div class="module-progress">
                            <div class="module-progress-bar" style="width: ${Math.floor(Math.random() * 30) + 60}%"></div>
                        </div>
                    </a>`).join('');
        
        const scoreClass = block.score >= 80 ? 'high' : block.score >= 60 ? 'medium' : 'low';
        const statusClass = block.status === 'Active' ? 'active' : 
                           block.status === 'In Progress' ? 'in-progress' : 'pending';
        
        return `
            <!-- Block ${block.number}: ${block.title} -->
            <div class="block-card">
                <div class="block-header">
                    <div class="block-info">
                        <div class="block-number">Block ${block.number}</div>
                        <h2 class="block-title">${block.title}</h2>
                        <p class="block-description">
                            ${getBlockDescription(block.number)}
                        </p>
                    </div>
                    <div class="block-score">
                        <div class="score-circle" style="--score: ${block.score}">
                            <div class="score-value">${block.score}%</div>
                        </div>
                        <div class="block-status status-${statusClass}">${block.status}</div>
                    </div>
                </div>
                
                <div class="modules-grid">
                    ${modulesHtml}
                </div>
            </div>`;
    }).join('\n\n');
    
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Phase ${phase.number}: ${phase.name} - ScaleOps6</title>
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
        }

        /* Navigation Bar */
        .navbar {
            background: #000000;
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #FF5500;
        }

        .logo {
            font-size: 32px;
            font-weight: 800;
            color: #ffffff;
            text-decoration: none;
        }

        .logo .ops {
            color: #FF5500;
        }

        .logo sup {
            font-size: 18px;
            color: #FF5500;
        }

        .nav-links {
            display: flex;
            gap: 2rem;
            align-items: center;
        }

        .nav-links a {
            color: rgba(255, 255, 255, 0.7);
            text-decoration: none;
            font-size: 16px;
            font-weight: 500;
            transition: color 0.3s;
        }

        .nav-links a:hover {
            color: #FF5500;
        }

        /* Breadcrumb */
        .breadcrumb {
            padding: 20px 2rem;
            display: flex;
            align-items: center;
            gap: 10px;
            color: rgba(255, 255, 255, 0.6);
        }

        .breadcrumb a {
            color: #FF5500;
            text-decoration: none;
        }

        .breadcrumb a:hover {
            color: #ff7733;
        }

        /* Main Content */
        .main-content {
            padding: 2rem;
            max-width: 1600px;
            margin: 0 auto;
        }

        /* Phase Header */
        .phase-header {
            background: linear-gradient(135deg, #FF5500 0%, #FF8800 100%);
            padding: 30px;
            border-radius: 20px;
            margin-bottom: 40px;
            text-align: center;
        }

        .phase-title {
            font-size: 36px;
            font-weight: 700;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        .phase-description {
            font-size: 18px;
            opacity: 0.95;
            max-width: 800px;
            margin: 0 auto;
        }

        .phase-score {
            display: inline-block;
            background: #000;
            padding: 10px 20px;
            border-radius: 50px;
            margin-top: 20px;
            font-size: 24px;
            font-weight: 700;
        }

        /* Blocks Container */
        .blocks-container {
            display: grid;
            gap: 40px;
        }

        /* Block Card */
        .block-card {
            background: #1a1a1a;
            border: 2px solid #333;
            border-radius: 20px;
            padding: 30px;
            transition: all 0.3s ease;
        }

        .block-card:hover {
            border-color: #FF5500;
            box-shadow: 0 10px 30px rgba(255, 85, 0, 0.2);
        }

        .block-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
        }

        .block-info {
            flex: 1;
        }

        .block-number {
            color: #FF5500;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 10px;
        }

        .block-title {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 10px;
        }

        .block-description {
            color: rgba(255, 255, 255, 0.7);
            font-size: 16px;
            line-height: 1.6;
        }

        .block-score {
            text-align: center;
        }

        .score-circle {
            width: 100px;
            height: 100px;
            background: conic-gradient(#FF5500 0deg, #FF5500 calc(3.6deg * var(--score)), #333 calc(3.6deg * var(--score)));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }

        .score-circle::before {
            content: '';
            position: absolute;
            width: 80px;
            height: 80px;
            background: #1a1a1a;
            border-radius: 50%;
        }

        .score-value {
            position: relative;
            font-size: 24px;
            font-weight: 700;
            color: #FF5500;
        }

        .block-status {
            margin-top: 10px;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            display: inline-block;
        }

        .status-active {
            background: rgba(76, 175, 80, 0.2);
            color: #4CAF50;
        }

        .status-in-progress {
            background: rgba(255, 85, 0, 0.2);
            color: #FF5500;
        }

        .status-pending {
            background: rgba(255, 255, 255, 0.1);
            color: #666;
        }

        /* Modules Grid */
        .modules-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }

        .module-card {
            background: #0a0a0a;
            border: 2px solid #333;
            border-radius: 12px;
            padding: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            color: #ffffff;
            position: relative;
        }

        .module-card:hover {
            border-color: #FF5500;
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(255, 85, 0, 0.3);
        }

        .module-number {
            position: absolute;
            top: 15px;
            right: 15px;
            background: #FF5500;
            color: #000;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 14px;
        }

        .module-title {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 10px;
            padding-right: 40px;
        }

        .module-description {
            color: rgba(255, 255, 255, 0.6);
            font-size: 14px;
            line-height: 1.5;
        }

        .module-progress {
            margin-top: 15px;
            height: 4px;
            background: #333;
            border-radius: 2px;
            overflow: hidden;
        }

        .module-progress-bar {
            height: 100%;
            background: linear-gradient(90deg, #FF5500, #FF8800);
            border-radius: 2px;
            transition: width 0.3s ease;
        }

        /* Back Button */
        .back-button {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: transparent;
            border: 2px solid #FF5500;
            color: #FF5500;
            padding: 12px 24px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s;
            margin-bottom: 30px;
        }

        .back-button:hover {
            background: #FF5500;
            color: #000;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .modules-grid {
                grid-template-columns: 1fr;
            }
            
            .nav-links {
                display: none;
            }
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">
        <a href="st6-framework.html" class="logo">
            scale<span class="ops">ops</span><sup>6</sup>
        </a>
        <div class="nav-links">
            <a href="st6-framework.html">Framework</a>
            <a href="index.html">Dashboard</a>
            <a href="#">Analytics</a>
            <a href="#">Resources</a>
            <a href="#">Help</a>
        </div>
    </nav>

    <!-- Breadcrumb -->
    <div class="breadcrumb">
        <a href="st6-framework.html">Framework</a>
        <span>→</span>
        <span>Phase ${phase.number}: ${phase.name}</span>
    </div>

    <!-- Main Content -->
    <div class="main-content">
        <!-- Back Button -->
        <a href="st6-framework.html" class="back-button">
            <span>←</span>
            <span>Back to Framework</span>
        </a>

        <!-- Phase Header -->
        <div class="phase-header">
            <h1 class="phase-title">Phase ${phase.number}: ${phase.name}</h1>
            <p class="phase-description">
                ${phase.description}
            </p>
            <div class="phase-score">Overall Score: ${phaseScore}%</div>
        </div>

        <!-- Blocks Container -->
        <div class="blocks-container">
            ${blocksHtml}
        </div>
    </div>

    <script>
        // Calculate block scores from module progress
        function updateBlockScores() {
            document.querySelectorAll('.block-card').forEach(block => {
                const progressBars = block.querySelectorAll('.module-progress-bar');
                let totalProgress = 0;
                progressBars.forEach(bar => {
                    totalProgress += parseInt(bar.style.width);
                });
                const avgProgress = Math.round(totalProgress / progressBars.length);
                
                // Update score circle if needed
                const scoreCircle = block.querySelector('.score-circle');
                const scoreValue = block.querySelector('.score-value');
                if (scoreCircle && scoreValue) {
                    // Score is already set in HTML, but this could be dynamic
                }
            });
        }

        // Initialize on page load
        document.addEventListener('DOMContentLoaded', updateBlockScores);
    </script>
</body>
</html>`;
    
    fs.writeFileSync(filename, html);
    console.log(`Created ${filename}`);
});

function getBlockDescription(blockNumber) {
    const descriptions = {
        5: "Win your first customers, validate your solution, and build strong reference cases that prove your value proposition.",
        6: "Build systems that drive continuous engagement, create community, and turn customers into advocates.",
        7: "Measure and document the tangible impact you deliver, creating compelling ROI stories for prospects.",
        8: "Expand within existing accounts, optimize customer success processes, and drive sustainable growth.",
        9: "Develop proof points, create compelling demos, and build the foundation for scalable sales execution.",
        10: "Train, enable, and empower your sales team with the tools, processes, and knowledge to win consistently.",
        11: "Build and scale high-performing teams with the right structure, culture, and performance systems.",
        12: "Implement systems to maximize customer retention, reduce churn, and drive expansion revenue.",
        13: "Develop strategies to dominate your market category and establish sustainable competitive advantages.",
        14: "Build the operational foundation required to scale efficiently and maintain quality at volume.",
        15: "Develop leadership capabilities, succession planning, and governance structures for long-term success.",
        16: "Explore and execute international expansion strategies to capture global market opportunities."
    };
    return descriptions[blockNumber] || "Transform your business with strategic initiatives and best practices.";
}

console.log('Phase pages created successfully!');
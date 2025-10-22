const fs = require('fs');

// Block configurations with all modules and scores
const blocks = [
    {
        number: 1,
        title: "Mission Discovery",
        phase: "Phase 1: Idea Market Fit",
        description: "Define your core purpose, vision, and strategic direction. Establish the foundation for your organization's mission and identify key opportunities for growth.",
        modules: [
            { num: "1-1", title: "Problem Statement", desc: "Define the core problem your organization solves", score: 27, status: "In Progress" },
            { num: "1-2", title: "Solution Framework", desc: "Design comprehensive solutions that address market needs", score: 35, status: "In Progress" },
            { num: "1-3", title: "Target Market", desc: "Identify and understand your ideal customer segments", score: 42, status: "Complete" },
            { num: "1-4", title: "Value Proposition", desc: "Articulate your unique value and competitive advantages", score: 58, status: "Complete" },
            { num: "1-5", title: "Business Model", desc: "Define how you create, deliver, and capture value", score: 31, status: "In Progress" },
            { num: "1-6", title: "Founding Team", desc: "Build and align your core leadership team", score: 45, status: "Complete" }
        ]
    },
    {
        number: 2,
        title: "Customer Insights",
        phase: "Phase 1: Idea Market Fit",
        description: "Deep dive into customer needs, behaviors, and pain points. Build a comprehensive understanding of your target market through research and validation.",
        modules: [
            { num: "2-1", title: "Customer Research", desc: "Conduct systematic research to understand customer needs", score: 65, status: "Complete" },
            { num: "2-2", title: "Pain Point Analysis", desc: "Identify and prioritize critical customer pain points", score: 72, status: "Complete" },
            { num: "2-3", title: "User Personas", desc: "Create detailed profiles of your target users", score: 58, status: "In Progress" },
            { num: "2-4", title: "Journey Mapping", desc: "Map the complete customer experience journey", score: 45, status: "In Progress" },
            { num: "2-5", title: "Market Validation", desc: "Validate market demand and opportunity size", score: 68, status: "Complete" },
            { num: "2-6", title: "Competitive Analysis", desc: "Analyze competitors and market positioning", score: 75, status: "Complete" }
        ]
    },
    {
        number: 3,
        title: "Strategic Prioritization",
        phase: "Phase 1: Idea Market Fit",
        description: "Establish clear priorities and strategic focus areas. Align resources and efforts with your most impactful opportunities.",
        modules: [
            { num: "3-1", title: "Goal Setting", desc: "Define clear, measurable strategic goals", score: 82, status: "Complete" },
            { num: "3-2", title: "Resource Allocation", desc: "Optimize resource distribution across initiatives", score: 67, status: "In Progress" },
            { num: "3-3", title: "Risk Assessment", desc: "Identify and mitigate potential risks", score: 71, status: "Complete" },
            { num: "3-4", title: "Timeline Planning", desc: "Create realistic project timelines and milestones", score: 78, status: "Complete" },
            { num: "3-5", title: "Success Metrics", desc: "Define KPIs and success measurement frameworks", score: 85, status: "Complete" },
            { num: "3-6", title: "Decision Framework", desc: "Establish clear decision-making processes", score: 73, status: "Complete" }
        ]
    },
    {
        number: 4,
        title: "Prototype Launch",
        phase: "Phase 2: Product Market Fit",
        description: "Build and launch your minimum viable product. Test core assumptions and gather early user feedback.",
        modules: [
            { num: "4-1", title: "MVP Development", desc: "Build your minimum viable product", score: 88, status: "Complete" },
            { num: "4-2", title: "Testing Protocol", desc: "Establish systematic testing procedures", score: 76, status: "Complete" },
            { num: "4-3", title: "User Feedback", desc: "Collect and analyze user feedback", score: 81, status: "Complete" },
            { num: "4-4", title: "Iteration Process", desc: "Implement rapid iteration cycles", score: 79, status: "Complete" },
            { num: "4-5", title: "Quality Assurance", desc: "Ensure product quality and reliability", score: 84, status: "Complete" },
            { num: "4-6", title: "Launch Strategy", desc: "Plan and execute product launch", score: 77, status: "Complete" }
        ]
    },
    {
        number: 5,
        title: "Early Adopter Wins",
        phase: "Phase 2: Product Market Fit",
        description: "Secure and nurture your first customers. Build strong relationships with early adopters who will champion your solution.",
        modules: [
            { num: "5-1", title: "Adopter Identification", desc: "Identify and target early adopters", score: 91, status: "Complete" },
            { num: "5-2", title: "Onboarding Excellence", desc: "Create exceptional onboarding experiences", score: 87, status: "Complete" },
            { num: "5-3", title: "Success Stories", desc: "Document and share customer success stories", score: 93, status: "Complete" },
            { num: "5-4", title: "Reference Program", desc: "Build a strong reference customer program", score: 89, status: "Complete" },
            { num: "5-5", title: "Community Building", desc: "Foster an engaged user community", score: 85, status: "Complete" },
            { num: "5-6", title: "Advocacy Development", desc: "Turn customers into advocates", score: 92, status: "Complete" }
        ]
    },
    {
        number: 6,
        title: "Customer Engagement Flywheel",
        phase: "Phase 2: Product Market Fit",
        description: "Build systematic processes for customer acquisition, engagement, and retention. Create a self-reinforcing growth engine.",
        modules: [
            { num: "6-1", title: "Engagement Strategy", desc: "Design comprehensive engagement strategies", score: 78, status: "Complete" },
            { num: "6-2", title: "Retention Programs", desc: "Implement customer retention initiatives", score: 82, status: "Complete" },
            { num: "6-3", title: "Upsell Framework", desc: "Create systematic upselling processes", score: 74, status: "In Progress" },
            { num: "6-4", title: "Referral System", desc: "Build automated referral programs", score: 69, status: "In Progress" },
            { num: "6-5", title: "Loyalty Programs", desc: "Design customer loyalty initiatives", score: 71, status: "Complete" },
            { num: "6-6", title: "Feedback Loops", desc: "Establish continuous feedback mechanisms", score: 86, status: "Complete" }
        ]
    },
    {
        number: 7,
        title: "Quantifiable Impact",
        phase: "Phase 2: Product Market Fit",
        description: "Measure and demonstrate the tangible value you deliver. Build data-driven proof of your solution's impact.",
        modules: [
            { num: "7-1", title: "Impact Metrics", desc: "Define and track impact measurements", score: 88, status: "Complete" },
            { num: "7-2", title: "ROI Analysis", desc: "Calculate and demonstrate return on investment", score: 85, status: "Complete" },
            { num: "7-3", title: "Case Studies", desc: "Develop comprehensive case studies", score: 91, status: "Complete" },
            { num: "7-4", title: "Performance Dashboards", desc: "Create real-time performance visibility", score: 83, status: "Complete" },
            { num: "7-5", title: "Benchmarking", desc: "Establish industry benchmarks and comparisons", score: 79, status: "Complete" },
            { num: "7-6", title: "Value Documentation", desc: "Document and communicate value delivery", score: 87, status: "Complete" }
        ]
    },
    {
        number: 8,
        title: "Customer Success Expansion",
        phase: "Phase 2: Product Market Fit",
        description: "Scale your customer success operations. Build the infrastructure to support growing customer needs.",
        modules: [
            { num: "8-1", title: "Success Playbooks", desc: "Create scalable customer success playbooks", score: 76, status: "Complete" },
            { num: "8-2", title: "Support Infrastructure", desc: "Build robust support systems", score: 81, status: "Complete" },
            { num: "8-3", title: "Health Scoring", desc: "Implement customer health monitoring", score: 73, status: "In Progress" },
            { num: "8-4", title: "Expansion Planning", desc: "Plan systematic account expansion", score: 68, status: "In Progress" },
            { num: "8-5", title: "Success Metrics", desc: "Track customer success KPIs", score: 84, status: "Complete" },
            { num: "8-6", title: "Team Scaling", desc: "Scale customer success teams effectively", score: 77, status: "Complete" }
        ]
    },
    {
        number: 9,
        title: "Proof of Execution",
        phase: "Phase 3: Go-To Market",
        description: "Demonstrate consistent execution capability. Build credibility through proven results and operational excellence.",
        modules: [
            { num: "9-1", title: "Execution Framework", desc: "Establish systematic execution processes", score: 82, status: "Complete" },
            { num: "9-2", title: "Performance Tracking", desc: "Monitor execution performance metrics", score: 88, status: "Complete" },
            { num: "9-3", title: "Process Optimization", desc: "Continuously optimize operational processes", score: 79, status: "Complete" },
            { num: "9-4", title: "Quality Standards", desc: "Maintain high quality standards", score: 86, status: "Complete" },
            { num: "9-5", title: "Delivery Excellence", desc: "Ensure consistent delivery excellence", score: 91, status: "Complete" },
            { num: "9-6", title: "Results Communication", desc: "Effectively communicate results and wins", score: 84, status: "Complete" }
        ]
    },
    {
        number: 10,
        title: "Sales Team Empowerment",
        phase: "Phase 3: Go-To Market",
        description: "Build and enable a high-performing sales organization. Equip your team with the tools and training for success.",
        modules: [
            { num: "10-1", title: "Sales Training", desc: "Implement comprehensive sales training programs", score: 75, status: "In Progress" },
            { num: "10-2", title: "Sales Tools", desc: "Deploy effective sales enablement tools", score: 83, status: "Complete" },
            { num: "10-3", title: "Compensation Design", desc: "Design motivating compensation structures", score: 78, status: "Complete" },
            { num: "10-4", title: "Territory Planning", desc: "Optimize sales territory allocation", score: 71, status: "In Progress" },
            { num: "10-5", title: "Pipeline Management", desc: "Build robust pipeline management processes", score: 87, status: "Complete" },
            { num: "10-6", title: "Sales Analytics", desc: "Implement data-driven sales analytics", score: 80, status: "Complete" }
        ]
    },
    {
        number: 11,
        title: "High Performance Teams",
        phase: "Phase 3: Go-To Market",
        description: "Build and maintain high-performing teams across your organization. Foster a culture of excellence and continuous improvement.",
        modules: [
            { num: "11-1", title: "Team Structure", desc: "Design optimal team structures", score: 84, status: "Complete" },
            { num: "11-2", title: "Talent Acquisition", desc: "Attract and hire top talent", score: 89, status: "Complete" },
            { num: "11-3", title: "Performance Management", desc: "Implement effective performance systems", score: 77, status: "Complete" },
            { num: "11-4", title: "Career Development", desc: "Create clear career development paths", score: 73, status: "In Progress" },
            { num: "11-5", title: "Culture Building", desc: "Foster a strong organizational culture", score: 85, status: "Complete" },
            { num: "11-6", title: "Team Collaboration", desc: "Enable effective team collaboration", score: 90, status: "Complete" }
        ]
    },
    {
        number: 12,
        title: "Retention Systems",
        phase: "Phase 3: Go-To Market",
        description: "Build systematic approaches to customer and employee retention. Create sustainable competitive advantages through loyalty.",
        modules: [
            { num: "12-1", title: "Churn Analysis", desc: "Analyze and predict customer churn", score: 72, status: "In Progress" },
            { num: "12-2", title: "Retention Strategies", desc: "Implement targeted retention strategies", score: 81, status: "Complete" },
            { num: "12-3", title: "Employee Retention", desc: "Build strong employee retention programs", score: 86, status: "Complete" },
            { num: "12-4", title: "Satisfaction Monitoring", desc: "Monitor customer and employee satisfaction", score: 88, status: "Complete" },
            { num: "12-5", title: "Win-Back Programs", desc: "Create effective win-back initiatives", score: 67, status: "In Progress" },
            { num: "12-6", title: "Loyalty Analytics", desc: "Analyze loyalty drivers and trends", score: 79, status: "Complete" }
        ]
    },
    {
        number: 13,
        title: "Market Domination Strategies",
        phase: "Phase 4: Scaling Impact",
        description: "Develop strategies to become the market leader. Build sustainable competitive advantages and market positioning.",
        modules: [
            { num: "13-1", title: "Market Analysis", desc: "Conduct deep market analysis", score: 91, status: "Complete" },
            { num: "13-2", title: "Competitive Strategy", desc: "Develop winning competitive strategies", score: 87, status: "Complete" },
            { num: "13-3", title: "Market Positioning", desc: "Establish strong market positioning", score: 93, status: "Complete" },
            { num: "13-4", title: "Brand Building", desc: "Build a powerful market brand", score: 89, status: "Complete" },
            { num: "13-5", title: "Partnership Strategy", desc: "Create strategic partnerships", score: 82, status: "Complete" },
            { num: "13-6", title: "Market Expansion", desc: "Plan systematic market expansion", score: 85, status: "Complete" }
        ]
    },
    {
        number: 14,
        title: "Operational Infrastructure",
        phase: "Phase 4: Scaling Impact",
        description: "Build scalable operational infrastructure. Create systems and processes that support rapid growth.",
        modules: [
            { num: "14-1", title: "System Architecture", desc: "Design scalable system architecture", score: 78, status: "Complete" },
            { num: "14-2", title: "Process Automation", desc: "Automate key business processes", score: 84, status: "Complete" },
            { num: "14-3", title: "Data Infrastructure", desc: "Build robust data infrastructure", score: 81, status: "Complete" },
            { num: "14-4", title: "Security Systems", desc: "Implement comprehensive security", score: 88, status: "Complete" },
            { num: "14-5", title: "Compliance Framework", desc: "Ensure regulatory compliance", score: 92, status: "Complete" },
            { num: "14-6", title: "Disaster Recovery", desc: "Plan for business continuity", score: 76, status: "Complete" }
        ]
    },
    {
        number: 15,
        title: "Leadership Expansion",
        phase: "Phase 5: Scale",
        description: "Develop leadership capabilities across the organization. Build a strong leadership pipeline for sustainable growth.",
        modules: [
            { num: "15-1", title: "Leadership Development", desc: "Develop next-generation leaders", score: 83, status: "Complete" },
            { num: "15-2", title: "Succession Planning", desc: "Plan leadership succession", score: 77, status: "In Progress" },
            { num: "15-3", title: "Executive Coaching", desc: "Provide executive coaching programs", score: 85, status: "Complete" },
            { num: "15-4", title: "Board Development", desc: "Build effective board governance", score: 79, status: "Complete" },
            { num: "15-5", title: "Leadership Pipeline", desc: "Create leadership development pipeline", score: 81, status: "Complete" },
            { num: "15-6", title: "Change Management", desc: "Lead organizational change effectively", score: 88, status: "Complete" }
        ]
    },
    {
        number: 16,
        title: "Global Expansion Opportunities",
        phase: "Phase 5: Scale",
        description: "Explore and execute global expansion strategies. Build the capabilities to operate successfully in international markets.",
        modules: [
            { num: "16-1", title: "Market Research", desc: "Research international market opportunities", score: 74, status: "In Progress" },
            { num: "16-2", title: "Localization Strategy", desc: "Develop localization strategies", score: 69, status: "In Progress" },
            { num: "16-3", title: "International Operations", desc: "Build international operations", score: 71, status: "In Progress" },
            { num: "16-4", title: "Global Partnerships", desc: "Establish global partnerships", score: 76, status: "Complete" },
            { num: "16-5", title: "Regulatory Compliance", desc: "Navigate international regulations", score: 82, status: "Complete" },
            { num: "16-6", title: "Cultural Adaptation", desc: "Adapt to local cultures and markets", score: 78, status: "Complete" }
        ]
    }
];

// Template for block pages
const createBlockPage = (block) => {
    const blockSlug = block.title.toLowerCase().replace(/\s+/g, '-');
    
    // Generate modules HTML
    const modulesHtml = block.modules.map(module => {
        const score = module.score;
        let scoreClass = 'score-critical';
        if (score >= 90) scoreClass = 'score-excellent';
        else if (score >= 70) scoreClass = 'score-high';
        else if (score >= 50) scoreClass = 'score-medium';
        else if (score >= 30) scoreClass = 'score-low';
        
        let statusClass = 'status-not-started';
        if (module.status === 'Complete') statusClass = 'status-complete';
        else if (module.status === 'In Progress') statusClass = 'status-in-progress';
        
        return `
            <!-- Module ${module.num}: ${module.title} -->
            <a href="block-${module.num}.html" class="module-card ${scoreClass}">
                <div class="module-header">
                    <span class="module-number">MODULE ${module.num}</span>
                    <span class="module-score">${score}%</span>
                </div>
                <h3 class="module-title">${module.title}</h3>
                <p class="module-description">${module.desc}</p>
                <span class="module-status ${statusClass}">${module.status}</span>
            </a>`;
    }).join('\n');
    
    // Calculate average score
    const avgScore = Math.round(
        block.modules.reduce((sum, m) => sum + m.score, 0) / block.modules.length
    );
    
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
        }

        /* Navigation Bar */
        .navbar {
            background: #000000;
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(255, 85, 0, 0.2);
        }

        .navbar-left {
            display: flex;
            align-items: center;
            gap: 3rem;
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
            gap: 2rem;
            align-items: center;
        }

        .nav-links a {
            color: rgba(255, 255, 255, 0.8);
            text-decoration: none;
            font-size: 16px;
            font-weight: 500;
            transition: all 0.3s;
            padding: 8px 16px;
            border-radius: 6px;
        }

        .nav-links a:hover {
            color: #FF5500;
            background: rgba(255, 85, 0, 0.1);
        }

        .navbar-right {
            display: flex;
            align-items: center;
            gap: 2rem;
        }

        .user-info {
            color: rgba(255, 255, 255, 0.7);
            font-size: 14px;
            font-weight: 500;
        }

        .logout-btn {
            background: transparent;
            border: 2px solid #FF5500;
            color: #FF5500;
            padding: 8px 24px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.3s;
            text-decoration: none;
        }

        .logout-btn:hover {
            background: #FF5500;
            color: #000000;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(255, 85, 0, 0.3);
        }

        .powered-by {
            color: #666;
            font-size: 12px;
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .powered-by .scaleteam {
            color: #FF5500;
            font-weight: 600;
        }

        /* Main Content */
        .main-content {
            padding: 2rem;
            max-width: 1600px;
            margin: 0 auto;
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

        /* Phase Label */
        .phase-label {
            color: #FF5500;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 20px;
        }

        /* Block Header */
        .block-header {
            background: transparent;
            border: 2px solid #FF5500;
            border-radius: 20px;
            padding: 40px;
            margin-bottom: 40px;
            position: relative;
            overflow: hidden;
        }

        .block-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(255, 85, 0, 0.1) 0%, rgba(255, 85, 0, 0.05) 100%);
            z-index: -1;
        }

        .block-number-badge {
            display: inline-block;
            background: #FF5500;
            color: #000;
            padding: 8px 20px;
            border-radius: 50px;
            font-weight: 700;
            font-size: 14px;
            margin-bottom: 20px;
        }

        .block-title {
            font-size: 48px;
            font-weight: 800;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: #FF5500;
        }

        .block-description {
            font-size: 18px;
            color: rgba(255, 255, 255, 0.8);
            line-height: 1.6;
            max-width: 800px;
        }

        .block-score-info {
            position: absolute;
            top: 40px;
            right: 40px;
            text-align: center;
        }

        .block-score-label {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.6);
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 10px;
        }

        .block-score-value {
            font-size: 48px;
            font-weight: 800;
            color: #FF5500;
        }

        .block-progress {
            margin-top: 30px;
            height: 8px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            overflow: hidden;
        }

        .block-progress-bar {
            height: 100%;
            background: linear-gradient(90deg, #FF5500, #FF8800);
            border-radius: 4px;
            transition: width 0.5s ease;
        }

        /* Sub-Components Section */
        .subcomponents-title {
            font-size: 24px;
            font-weight: 700;
            color: #FF5500;
            margin-bottom: 30px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .modules-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 25px;
        }

        .module-card {
            background: #0a0a0a;
            border: 3px solid;
            border-radius: 16px;
            padding: 30px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            color: #ffffff;
            position: relative;
            overflow: hidden;
        }

        .module-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            transition: height 0.3s ease;
        }

        .module-card:hover::before {
            height: 100%;
            opacity: 0.1;
        }

        .module-card:hover {
            transform: translateY(-5px);
        }

        /* Dynamic Score-Based Colors */
        .score-excellent { border-color: #10B981 !important; }
        .score-excellent::before { background: #10B981; }
        .score-excellent:hover { box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3); }
        .score-excellent .module-score { color: #10B981; }

        .score-high { border-color: #4CAF50 !important; }
        .score-high::before { background: #4CAF50; }
        .score-high:hover { box-shadow: 0 10px 30px rgba(76, 175, 80, 0.3); }
        .score-high .module-score { color: #4CAF50; }

        .score-medium { border-color: #FF9800 !important; }
        .score-medium::before { background: #FF9800; }
        .score-medium:hover { box-shadow: 0 10px 30px rgba(255, 152, 0, 0.3); }
        .score-medium .module-score { color: #FF9800; }

        .score-low { border-color: #FF5500 !important; }
        .score-low::before { background: #FF5500; }
        .score-low:hover { box-shadow: 0 10px 30px rgba(255, 85, 0, 0.3); }
        .score-low .module-score { color: #FF5500; }

        .score-critical { border-color: #F44336 !important; }
        .score-critical::before { background: #F44336; }
        .score-critical:hover { box-shadow: 0 10px 30px rgba(244, 67, 54, 0.3); }
        .score-critical .module-score { color: #F44336; }

        .module-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 20px;
        }

        .module-number {
            font-size: 14px;
            color: #FF5500;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .module-score {
            font-size: 32px;
            font-weight: 800;
        }

        .module-title {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .module-description {
            color: rgba(255, 255, 255, 0.7);
            font-size: 14px;
            line-height: 1.6;
            margin-bottom: 20px;
        }

        .module-status {
            display: inline-block;
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            background: rgba(255, 255, 255, 0.1);
            color: rgba(255, 255, 255, 0.7);
        }

        .status-complete {
            background: rgba(76, 175, 80, 0.2);
            color: #4CAF50;
        }

        .status-in-progress {
            background: rgba(255, 152, 0, 0.2);
            color: #FF9800;
        }

        .status-not-started {
            background: rgba(255, 255, 255, 0.05);
            color: rgba(255, 255, 255, 0.5);
        }

        /* Responsive */
        @media (max-width: 768px) {
            .modules-grid {
                grid-template-columns: 1fr;
            }
            
            .nav-links {
                display: none;
            }
            
            .powered-by {
                display: none;
            }
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">
        <div class="navbar-left">
            <a href="st6-framework.html" class="logo">
                <span class="scale">scale</span><span class="ops">ops</span><sup>6</sup>
            </a>
            <div class="nav-links">
                <a href="st6-framework.html">Dashboard</a>
                <a href="#">Analytics</a>
                <a href="#">Help</a>
            </div>
        </div>
        <div class="navbar-right">
            <span class="user-info">Guest User</span>
            <a href="#" class="logout-btn">Logout</a>
            <div class="powered-by">
                powered by <span class="scaleteam">scaleteam</span><sup style="color: #FF5500;">6</sup>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <div class="main-content">
        <!-- Back Button -->
        <a href="st6-framework.html" class="back-button">
            <span>←</span>
            <span>Back to Dashboard</span>
        </a>

        <!-- Phase Label -->
        <div class="phase-label">${block.phase}</div>

        <!-- Block Header -->
        <div class="block-header">
            <div class="block-number-badge">BLOCK ${block.number}</div>
            <h1 class="block-title">${block.title}</h1>
            <p class="block-description">
                ${block.description}
            </p>
            
            <div class="block-score-info">
                <div class="block-score-label">Current Score</div>
                <div class="block-score-value">${avgScore}%</div>
            </div>
            
            <div class="block-progress">
                <div class="block-progress-bar" style="width: ${avgScore}%"></div>
            </div>
        </div>

        <!-- Sub-Components -->
        <h2 class="subcomponents-title">Sub-Components</h2>
        
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

console.log('\nAll 16 block pages updated successfully with beautiful design!');
console.log('Pages created:');
blocks.forEach(block => {
    console.log(`  - block-${block.number}-${block.title.toLowerCase().replace(/\s+/g, '-')}.html`);
});
// ScaleOps6 Platform - Page Generator
// Generates all block and subcomponent pages using locked structure

const fs = require('fs');
const path = require('path');

// Import libraries
const AgentLibrary = require('./agent-library.js');
const WorksheetLibrary = require('./worksheet-library.js');
const ContentLibrary = require('./content-library-simplified.js');

class PageGenerator {
    constructor() {
        this.blockData = {
            1: { name: "Mission Discovery", slug: "mission-discovery" },
            2: { name: "Customer Insights", slug: "customer-insights" },
            3: { name: "Strategic Prioritization", slug: "strategic-prioritization" },
            4: { name: "Prototype Launch", slug: "prototype-launch" },
            5: { name: "Early Adopter Wins", slug: "early-adopter-wins" },
            6: { name: "Customer Engagement Flywheel", slug: "customer-engagement-flywheel" },
            7: { name: "Quantifiable Impact", slug: "quantifiable-impact" },
            8: { name: "Customer Success Expansion", slug: "customer-success-expansion" },
            9: { name: "Proof Execution", slug: "proof-execution" },
            10: { name: "Sales Team Empowerment", slug: "sales-team-empowerment" },
            11: { name: "High Performance Teams", slug: "high-performance-teams" },
            12: { name: "Retention Systems", slug: "retention-systems" },
            13: { name: "Market Domination Strategies", slug: "market-domination-strategies" },
            14: { name: "Operational Infrastructure", slug: "operational-infrastructure" },
            15: { name: "Leadership Expansion", slug: "leadership-expansion" },
            16: { name: "Global & Expansion Opportunities", slug: "global-expansion-opportunities" }
        };

        this.subcomponentNames = {
            "1a": "Problem Statement", "1b": "Mission Statement", "1c": "Voice of Customer",
            "1d": "Team Assessment", "1e": "Market Landscape", "1f": "Launch Readiness",
            "2a": "Interview Cadence", "2b": "Persona Development", "2c": "Pain Point Analysis",
            "2d": "Jobs-to-be-Done", "2e": "Demand Signals", "2f": "Insight Loop",
            "3a": "Use Case Prioritization", "3b": "Segment Tiering", "3c": "Prioritization Framework",
            "3d": "Strategic Tradeoffs", "3e": "Hypothesis Testing", "3f": "Decision Archive",
            "4a": "Feature Matrix", "4b": "Technical Scope", "4c": "Pilot Group Selection",
            "4d": "QA Standards", "4e": "Timeline Planning", "4f": "Post-Mortem Analysis",
            "5a": "Early Win Documentation", "5b": "ROI Calculation", "5c": "Use Case Success",
            "5d": "Testimonial Collection", "5e": "Win Criteria Mapping", "5f": "Deal Debrief",
            "6a": "Usage Analytics", "6b": "Milestone Tracking", "6c": "CS Dashboard Design",
            "6d": "Customer Activation", "6e": "Feedback Collection", "6f": "Power User Development",
            "7a": "Time/Cost Savings", "7b": "Revenue Impact", "7c": "Productivity Measurement",
            "7d": "Retention Analysis", "7e": "System Consolidation", "7f": "Friction Analysis",
            "8a": "Upsell Strategy", "8b": "Team Expansion Tracking", "8c": "Organic Growth Analysis",
            "8d": "Champion Development", "8e": "Sentiment Tracking", "8f": "Renewal Readiness",
            "9a": "Inbound Conversion", "9b": "Outbound Performance", "9c": "Channel Economics",
            "9d": "Discovery Call Excellence", "9e": "Demo Optimization", "9f": "Founder Sales Analysis",
            "10a": "Sales Enablement Assets", "10b": "Rep Onboarding & Ramp", "10c": "Win/Loss Analysis",
            "10d": "Objection Handling", "10e": "ICP Definition", "10f": "Sales Call Library",
            "11a": "Performance Scorecard", "11b": "Quota Structure", "11c": "Deal Review Process",
            "11d": "Forecast Accuracy", "11e": "Sales Coaching Program", "11f": "Talent Gap Analysis",
            "12a": "Customer Onboarding", "12b": "Activation Tracking", "12c": "Success Playbook Development",
            "12d": "Escalation Management", "12e": "Renewal Pipeline Management", "12f": "Churn Analysis",
            "13a": "Category Creation", "13b": "Competitive Moat", "13c": "Ecosystem Strategy",
            "13d": "Competitive Intelligence", "13e": "Brand Strategy", "13f": "Defensive Strategy",
            "14a": "System Architecture", "14b": "Revenue Operations", "14c": "Dashboard Design",
            "14d": "Tool Stack Optimization", "14e": "RevOps Playbook", "14f": "SLA Management",
            "15a": "Executive Hiring", "15b": "Succession Planning", "15c": "Executive Cadence",
            "15d": "Culture Health Assessment", "15e": "Organizational Design", "15f": "DEI Integration",
            "16a": "Market Entry Analysis", "16b": "Localization Strategy", "16c": "International Pricing",
            "16d": "Compliance Management", "16e": "Geographic GTM Strategy", "16f": "Expansion Risk Assessment"
        };
    }

    generateAllPages() {
        console.log('Starting page generation...');
        
        // Generate block pages
        for (let i = 1; i <= 16; i++) {
            this.generateBlockPage(i);
        }
        
        // Generate subcomponent pages
        for (let blockNum = 1; blockNum <= 16; blockNum++) {
            const letters = ['a', 'b', 'c', 'd', 'e', 'f'];
            letters.forEach(letter => {
                const subId = `${blockNum}${letter}`;
                this.generateSubcomponentPage(blockNum, subId);
            });
        }
        
        console.log('Page generation complete!');
        return {
            blocksGenerated: 16,
            subcomponentsGenerated: 96
        };
    }

    generateBlockPage(blockNum) {
        const block = this.blockData[blockNum];
        const filename = `block-${blockNum}-${block.slug}.html`;
        
        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Block ${blockNum}: ${block.name} - ScaleOps6 Platform</title>
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
        <a href="index.html">Dashboard</a> / Block ${blockNum}: ${block.name}
    </div>

    <div class="container">
        <div class="block-header">
            <span class="block-number">BLOCK ${blockNum}</span>
            <h1 class="block-title">${block.name}</h1>
            <p class="block-description">
                ${this.getBlockDescription(blockNum)}
            </p>
        </div>

        <div class="subcomponents-grid">
            ${this.generateSubcomponentCards(blockNum)}
        </div>
    </div>

    <script>
        // Simulate random scores for demo
        document.querySelectorAll('.progress-fill').forEach(bar => {
            const score = 60 + Math.floor(Math.random() * 30);
            bar.style.width = score + '%';
            bar.closest('.subcomponent-card').querySelector('.score-value').textContent = score;
        });
    </script>
</body>
</html>`;

        // Write file
        fs.writeFileSync(path.join(__dirname, filename), html);
        console.log(`✅ Generated: ${filename}`);
    }

    generateSubcomponentPage(blockNum, subId) {
        const block = this.blockData[blockNum];
        const subName = this.subcomponentNames[subId];
        const agent = AgentLibrary[subId];
        const worksheet = WorksheetLibrary[subId];
        const filename = `subcomponent-${subId}-${this.slugify(subName)}.html`;

        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subName} - ${block.name} - ScaleOps6 Platform</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        ${this.getSubcomponentStyles()}
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">
            <img src="ScaleOps6_logo.png" alt="ScaleOps6" style="height: 40px;">
        </div>
        <nav class="nav">
            <a href="index.html">Dashboard</a>
            <a href="block-${blockNum}-${block.slug}.html">Block ${blockNum}</a>
            <a href="#">Settings</a>
        </nav>
    </div>

    <div class="breadcrumb">
        <a href="index.html">Dashboard</a> / 
        <a href="block-${blockNum}-${block.slug}.html">Block ${blockNum}: ${block.name}</a> / 
        ${subId.toUpperCase()}: ${subName}
    </div>

    <div class="container">
        <div class="subcomponent-header">
            <div class="header-content">
                <span class="subcomponent-badge">${subId.toUpperCase()}</span>
                <h1>${subName}</h1>
                <p class="agent-info">
                    <i class="fas fa-robot"></i> Expert Agent: ${agent.name}
                </p>
            </div>
            <div class="score-display">
                <div class="score-circle">
                    <svg width="120" height="120">
                        <circle cx="60" cy="60" r="54" stroke="#333" stroke-width="8" fill="none"/>
                        <circle cx="60" cy="60" r="54" stroke="#FF5500" stroke-width="8" fill="none"
                                stroke-dasharray="339.292" stroke-dashoffset="100"
                                transform="rotate(-90 60 60)"/>
                    </svg>
                    <div class="score-text">
                        <span class="score-value">72</span>
                        <span class="score-label">Score</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="tabs">
            <button class="tab active" data-tab="education">
                <i class="fas fa-graduation-cap"></i> Education
            </button>
            <button class="tab" data-tab="workspace">
                <i class="fas fa-edit"></i> Workspace
            </button>
            <button class="tab" data-tab="analysis">
                <i class="fas fa-chart-line"></i> Analysis
            </button>
            <button class="tab" data-tab="resources">
                <i class="fas fa-book"></i> Resources
            </button>
            <button class="tab" data-tab="history">
                <i class="fas fa-history"></i> Score History
            </button>
        </div>

        <div class="tab-content">
            <div id="education" class="tab-pane active">
                <div class="education-content">
                    <h2>Understanding ${subName}</h2>
                    <div class="content-section">
                        <h3>🎯 What Makes a Great ${subName}</h3>
                        <p>${this.getEducationalContent(subId, 'what')}</p>
                    </div>
                    <div class="content-section">
                        <h3>💡 Why ${subName} Matters</h3>
                        <p>${this.getEducationalContent(subId, 'why')}</p>
                    </div>
                    <div class="content-section">
                        <h3>📋 Key Components to Include</h3>
                        <p>${this.getEducationalContent(subId, 'include')}</p>
                    </div>
                    <div class="content-section">
                        <h3>📊 Success Metrics</h3>
                        ${this.generateMetricsSection(subId)}
                    </div>
                    <div class="content-section">
                        <h3>✨ Best Practices</h3>
                        ${this.generateTipsSection(subId)}
                    </div>
                </div>
            </div>

            <div id="workspace" class="tab-pane">
                <div class="workspace-content">
                    <h2>${worksheet.title}</h2>
                    <form id="worksheetForm">
                        ${this.generateWorksheetFields(worksheet)}
                        <button type="submit" class="submit-btn">
                            <i class="fas fa-paper-plane"></i> Submit for Analysis
                        </button>
                    </form>
                </div>
            </div>

            <div id="analysis" class="tab-pane">
                <div class="analysis-content">
                    <h2>AI Analysis Results</h2>
                    <div class="analysis-grid">
                        <div class="analysis-card">
                            <h3>Score Breakdown</h3>
                            <div class="dimensions">
                                ${this.generateDimensionScores(agent)}
                            </div>
                        </div>
                        <div class="analysis-card">
                            <h3>Key Findings</h3>
                            ${this.generateFindingsSection(subId)}
                        </div>
                        <div class="analysis-card">
                            <h3>Recommendations</h3>
                            ${this.generateRecommendationsSection(subId)}
                        </div>
                    </div>
                </div>
            </div>

            <div id="resources" class="tab-pane">
                <div class="resources-content">
                    <h2>Resources for ${subName}</h2>
                    ${this.generateResourcesSection(subId)}
                </div>
            </div>

            <div id="history" class="tab-pane">
                <div class="history-content">
                    <h2>Score History & Trends</h2>
                    <div class="chart-container">
                        <canvas id="scoreChart"></canvas>
                    </div>
                    <div class="history-stats">
                        <div class="stat">
                            <span class="stat-value">+15%</span>
                            <span class="stat-label">30-Day Change</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">72</span>
                            <span class="stat-label">Current Score</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">85</span>
                            <span class="stat-label">Target Score</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        ${this.getSubcomponentScript()}
    </script>
</body>
</html>`;

        // Write file
        fs.writeFileSync(path.join(__dirname, filename), html);
        console.log(`✅ Generated: ${filename}`);
    }

    getBlockDescription(blockNum) {
        const descriptions = {
            1: "Establish the foundation of your go-to-market strategy by clearly defining your mission, understanding your market, and preparing for launch.",
            2: "Deep dive into customer understanding through systematic research, persona development, and continuous insight gathering.",
            3: "Make strategic decisions about use cases, customer segments, and resource allocation to maximize impact.",
            4: "Launch your prototype with the right features, technical scope, and quality standards to validate your solution.",
            5: "Document and leverage early customer wins to build momentum and validate your value proposition.",
            6: "Build sustainable customer engagement through usage analytics, milestone tracking, and feedback loops.",
            7: "Measure and communicate the quantifiable impact of your solution on customer outcomes.",
            8: "Expand customer success through upselling, organic growth, and renewal strategies.",
            9: "Execute proof of concept with optimized sales processes across all channels.",
            10: "Empower your sales team with the tools, training, and insights they need to succeed.",
            11: "Build high-performance teams through effective scorecards, coaching, and talent management.",
            12: "Implement retention systems to maximize customer lifetime value and minimize churn.",
            13: "Develop strategies for market domination through category creation and competitive positioning.",
            14: "Build operational infrastructure to support scale through systems, processes, and tools.",
            15: "Expand leadership capabilities through hiring, succession planning, and organizational design.",
            16: "Explore global expansion opportunities through market entry, localization, and international strategies."
        };
        return descriptions[blockNum] || "";
    }

    generateSubcomponentCards(blockNum) {
        const letters = ['a', 'b', 'c', 'd', 'e', 'f'];
        return letters.map(letter => {
            const subId = `${blockNum}${letter}`;
            const subName = this.subcomponentNames[subId];
            const agent = AgentLibrary[subId];
            
            return `
            <a href="subcomponent-${subId}-${this.slugify(subName)}.html" class="subcomponent-card">
                <span class="subcomponent-id">${subId.toUpperCase()}</span>
                <h3 class="subcomponent-title">${subName}</h3>
                <p class="subcomponent-agent">${agent.name}</p>
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
        }).join('');
    }

    generateWorksheetFields(worksheet) {
        return worksheet.fields.map(field => `
            <div class="form-group">
                <label for="${field.id}">
                    ${field.label}
                    ${field.required ? '<span class="required">*</span>' : ''}
                </label>
                ${field.type === 'textarea' ? 
                    `<textarea id="${field.id}" name="${field.id}" 
                              placeholder="${field.placeholder}"
                              ${field.required ? 'required' : ''}></textarea>` :
                    `<input type="text" id="${field.id}" name="${field.id}"
                            placeholder="${field.placeholder}"
                            ${field.required ? 'required' : ''}>`
                }
            </div>
        `).join('');
    }

    generateDimensionScores(agent) {
        return agent.scoringDimensions.map(dim => `
            <div class="dimension">
                <div class="dimension-header">
                    <span class="dimension-name">${dim.name}</span>
                    <span class="dimension-score">${12 + Math.floor(Math.random() * 8)}/${dim.weight}</span>
                </div>
                <div class="dimension-bar">
                    <div class="dimension-fill" style="width: ${60 + Math.random() * 30}%"></div>
                </div>
                <p class="dimension-desc">${dim.description}</p>
            </div>
        `).join('');
    }

    getEducationalContent(subId, section) {
        const content = ContentLibrary.getEducation(subId);
        return content[section] || "";
    }

    generateMetricsSection(subId) {
        const metrics = ContentLibrary.getMetrics(subId);
        return `
            <p><strong>Primary Metric:</strong> ${metrics.primary}</p>
            <ul>
                ${metrics.secondary.map(m => `<li>${m}</li>`).join('')}
            </ul>
            <p><strong>Target Scores:</strong> Minimum: ${metrics.targets.minimum} | Good: ${metrics.targets.good} | Excellent: ${metrics.targets.excellent}</p>
        `;
    }

    generateTipsSection(subId) {
        const tips = ContentLibrary.getTips(subId);
        return `<ul>${tips.map(tip => `<li>${tip}</li>`).join('')}</ul>`;
    }

    generateResourcesSection(subId) {
        const resources = ContentLibrary.getResources(subId);
        return `
            <div class="resource-grid">
                <div class="resource-card">
                    <i class="fas fa-file-alt"></i>
                    <h3>Templates</h3>
                    <ul style="text-align: left; list-style: none; padding: 0; margin-top: 1rem;">
                        ${resources.templates.map(t => `<li style="margin: 0.5rem 0;">• ${t}</li>`).join('')}
                    </ul>
                </div>
                <div class="resource-card">
                    <i class="fas fa-video"></i>
                    <h3>Video Guides</h3>
                    <ul style="text-align: left; list-style: none; padding: 0; margin-top: 1rem;">
                        ${resources.videos.map(v => `<li style="margin: 0.5rem 0;">• ${v}</li>`).join('')}
                    </ul>
                </div>
                <div class="resource-card">
                    <i class="fas fa-users"></i>
                    <h3>Case Studies</h3>
                    <ul style="text-align: left; list-style: none; padding: 0; margin-top: 1rem;">
                        ${resources.caseStudies.map(c => `<li style="margin: 0.5rem 0;">• ${c}</li>`).join('')}
                    </ul>
                </div>
                <div class="resource-card">
                    <i class="fas fa-tools"></i>
                    <h3>Recommended Tools</h3>
                    <ul style="text-align: left; list-style: none; padding: 0; margin-top: 1rem;">
                        ${resources.tools.map(t => `<li style="margin: 0.5rem 0;">• ${t}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }

    generateFindingsSection(subId) {
        const analysis = ContentLibrary.getAnalysis(subId);
        return `
            <div class="findings">
                <h4 style="color: #4CAF50; margin-bottom: 1rem;">✅ Strengths</h4>
                ${analysis.strengths.map(s => `
                    <div class="finding positive" style="margin: 0.5rem 0;">
                        <i class="fas fa-check-circle"></i>
                        <span>${s}</span>
                    </div>
                `).join('')}
                
                <h4 style="color: #FF9800; margin: 1.5rem 0 1rem 0;">⚠️ Areas for Improvement</h4>
                ${analysis.weaknesses.map(w => `
                    <div class="finding warning" style="margin: 0.5rem 0;">
                        <i class="fas fa-exclamation-triangle"></i>
                        <span>${w}</span>
                    </div>
                `).join('')}
                
                <h4 style="color: #2196F3; margin: 1.5rem 0 1rem 0;">💡 Opportunities</h4>
                ${analysis.opportunities.map(o => `
                    <div class="finding info" style="margin: 0.5rem 0;">
                        <i class="fas fa-lightbulb"></i>
                        <span>${o}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    generateRecommendationsSection(subId) {
        const analysis = ContentLibrary.getAnalysis(subId);
        return `
            <div class="recommendations">
                ${analysis.recommendations.map((rec, idx) => `
                    <div class="recommendation" style="margin-bottom: 1rem;">
                        <span class="priority ${idx === 0 ? 'high' : idx === 1 ? 'medium' : 'low'}"
                              style="background: ${idx === 0 ? '#F44336' : idx === 1 ? '#FF9800' : '#4CAF50'};
                                     color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.85rem;">
                            ${idx === 0 ? 'HIGH PRIORITY' : idx === 1 ? 'MEDIUM PRIORITY' : 'LOW PRIORITY'}
                        </span>
                        <p style="margin-top: 0.5rem;">${rec}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }

    getSubcomponentStyles() {
        return `
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
        .subcomponent-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            padding: 2rem;
            background: linear-gradient(135deg, rgba(255,85,0,0.1) 0%, rgba(255,136,0,0.1) 100%);
            border-radius: 12px;
        }
        .subcomponent-badge {
            display: inline-block;
            background: #FF5500;
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 6px;
            font-size: 0.85rem;
            margin-bottom: 0.5rem;
        }
        .agent-info {
            color: #888;
            margin-top: 0.5rem;
        }
        .score-circle {
            position: relative;
            width: 120px;
            height: 120px;
        }
        .score-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
        }
        .score-value {
            display: block;
            font-size: 2rem;
            font-weight: bold;
            color: #FF5500;
        }
        .score-label {
            display: block;
            font-size: 0.75rem;
            color: #888;
        }
        .tabs {
            display: flex;
            gap: 1rem;
            margin-bottom: 2rem;
            border-bottom: 1px solid #333;
        }
        .tab {
            background: none;
            border: none;
            color: #888;
            padding: 1rem 1.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .tab.active {
            color: #FF5500;
            border-bottom: 2px solid #FF5500;
        }
        .tab-pane {
            display: none;
        }
        .tab-pane.active {
            display: block;
        }
        .content-section {
            background: #111;
            padding: 1.5rem;
            border-radius: 8px;
            margin-bottom: 1.5rem;
        }
        .content-section h3 {
            color: #FF5500;
            margin-bottom: 1rem;
        }
        .form-group {
            margin-bottom: 1.5rem;
        }
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            color: #ccc;
        }
        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 0.75rem;
            background: #111;
            border: 1px solid #333;
            border-radius: 6px;
            color: white;
        }
        .form-group textarea {
            min-height: 120px;
            resize: vertical;
        }
        .required {
            color: #FF5500;
        }
        .submit-btn {
            background: linear-gradient(135deg, #FF5500, #FF8800);
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: 6px;
            cursor: pointer;
            font-size: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .analysis-grid {
            display: grid;
            gap: 2rem;
        }
        .analysis-card {
            background: #111;
            padding: 1.5rem;
            border-radius: 8px;
        }
        .dimension {
            margin-bottom: 1.5rem;
        }
        .dimension-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5rem;
        }
        .dimension-bar {
            height: 8px;
            background: #222;
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 0.5rem;
        }
        .dimension-fill {
            height: 100%;
            background: linear-gradient(90deg, #FF5500, #FF8800);
        }
        .dimension-desc {
            font-size: 0.85rem;
            color: #888;
        }
        .resource-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
        }
        .resource-card {
            background: #111;
            padding: 1.5rem;
            border-radius: 8px;
            text-align: center;
        }
        .resource-card i {
            font-size: 2rem;
            color: #FF5500;
            margin-bottom: 1rem;
        }
        .history-stats {
            display: flex;
            justify-content: space-around;
            margin-top: 2rem;
        }
        .stat {
            text-align: center;
        }
        .stat-value {
            display: block;
            font-size: 2rem;
            font-weight: bold;
            color: #FF5500;
        }
        .stat-label {
            display: block;
            font-size: 0.85rem;
            color: #888;
            margin-top: 0.5rem;
        }`;
    }

    getSubcomponentScript() {
        return `
        // Tab switching
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                
                // Update active tab
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Update active pane
                document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
                document.getElementById(tabName).classList.add('active');
            });
        });

        // Form submission
        document.getElementById('worksheetForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Analysis submitted! Results will appear in the Analysis tab.');
            document.querySelector('[data-tab="analysis"]').click();
        });

        // Simulate score animation
        setTimeout(() => {
            const circle = document.querySelector('circle:last-child');
            if (circle) {
                circle.style.transition = 'stroke-dashoffset 1s ease';
                circle.style.strokeDashoffset = '95';
            }
        }, 500);`;
    }

    slugify(text) {
        return text.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
}

// Run generator if called directly
if (require.main === module) {
    const generator = new PageGenerator();
    const result = generator.generateAllPages();
    console.log('\n✅ Page Generation Complete!');
    console.log(`   - ${result.blocksGenerated} block pages generated`);
    console.log(`   - ${result.subcomponentsGenerated} subcomponent pages generated`);
    console.log(`   - Total: ${result.blocksGenerated + result.subcomponentsGenerated} pages created`);
}

module.exports = PageGenerator;
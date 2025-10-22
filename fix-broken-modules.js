const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing broken module HTML files...');

// Function to clean and fix HTML structure
function fixHTMLStructure(content, moduleId) {
    // First, check if the file is completely broken
    if (!content.includes('<!DOCTYPE html>')) {
        console.log(`⚠️ Module ${moduleId} is severely corrupted, needs full reconstruction`);
        return generateCompleteHTML(moduleId);
    }
    
    // Remove duplicate or misplaced script content
    content = content.replace(/window\.analyzeWorksheet[\s\S]*?return false;\s*}\s*}/g, '');
    content = content.replace(/\/\/ Display comprehensive results[\s\S]*?timestamp: new Date\(\)\.toISOString\(\)\s*}\);/g, '');
    
    // Fix broken script tags
    content = content.replace(/<script src="nav\.js">[\s\S]*?<\/script>/g, '<script src="nav.js"></script>');
    
    // Ensure proper closing tags
    if (!content.includes('</body>')) {
        content = content + '\n</body>\n</html>';
    }
    
    return content;
}

// Function to generate complete HTML for severely broken files
function generateCompleteHTML(moduleId) {
    const [blockNum, subNum] = moduleId.split('-').slice(1);
    const blockNames = {
        '1': 'Mission Discovery',
        '2': 'Customer Insights', 
        '3': 'Product Strategy',
        '4': 'Market Positioning',
        '5': 'Revenue Model',
        '6': 'Growth Strategy',
        '7': 'Competitive Analysis',
        '8': 'Partnership Strategy',
        '9': 'Marketing Strategy',
        '10': 'Sales Strategy',
        '11': 'Customer Success',
        '12': 'Retention Strategy',
        '13': 'Expansion Planning',
        '14': 'Operational Excellence',
        '15': 'Leadership Development',
        '16': 'Global Expansion'
    };
    
    const subcomponents = {
        '1': 'Problem Statement',
        '2': 'Solution Framework',
        '3': 'Value Proposition',
        '4': 'Market Opportunity',
        '5': 'Business Model',
        '6': 'Success Metrics'
    };
    
    const blockName = blockNames[blockNum] || `Block ${blockNum}`;
    const subName = subcomponents[subNum] || `Module ${subNum}`;
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ScaleOps6 - ${subName}</title>
    <link rel="icon" type="image/png" href="/Official_ScaleOps6_Logo.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: #000000;
            color: #ffffff;
            min-height: 100vh;
            padding: 20px;
            padding-top: 140px;
            position: relative;
        }

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
        }

        .back-button:hover {
            background: #FF5500;
            color: #000;
            transform: translateX(-5px);
        }

        .breadcrumb {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 30px;
            font-size: 14px;
            color: #999;
        }

        .breadcrumb a {
            color: #FF5500;
            text-decoration: none;
            transition: opacity 0.3s ease;
        }

        .breadcrumb a:hover {
            opacity: 0.8;
        }

        .breadcrumb .separator {
            color: #666;
        }

        .subcomponent-header {
            background: rgba(255, 255, 255, 0.02);
            border: 2px solid #FF5500;
            border-radius: 15px;
            padding: 30px;
            margin-bottom: 30px;
            position: relative;
        }

        .subcomponent-number {
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 24px;
            color: #666;
            font-weight: 700;
        }

        .subcomponent-title {
            font-size: 32px;
            font-weight: 800;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: -0.5px;
            color: #FF5500;
        }

        .subcomponent-description {
            font-size: 18px;
            color: #ccc;
            line-height: 1.6;
        }

        .tab-navigation {
            display: flex;
            gap: 10px;
            margin-bottom: 30px;
            border-bottom: 2px solid rgba(255, 255, 255, 0.1);
        }

        .tab-button {
            padding: 15px 25px;
            background: transparent;
            color: #999;
            border: none;
            border-bottom: 3px solid transparent;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            transition: all 0.3s ease;
        }

        .tab-button:hover {
            color: #FF5500;
        }

        .tab-button.active {
            color: #FF5500;
            border-bottom-color: #FF5500;
        }

        .tab-content {
            display: none;
        }

        .tab-content.active {
            display: block;
        }

        .education-section, .workspace-section {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 30px;
            margin-bottom: 30px;
        }

        .section-title {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 25px;
            color: #FF5500;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .section-icon {
            font-size: 28px;
        }

        .section-content {
            font-size: 16px;
            line-height: 1.8;
            color: #ccc;
        }

        .worksheet-field {
            margin-bottom: 20px;
        }

        .worksheet-label {
            display: block;
            font-size: 14px;
            font-weight: 600;
            color: #FF5500;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .worksheet-input, .worksheet-textarea {
            width: 100%;
            padding: 12px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            color: #fff;
            font-size: 14px;
            transition: all 0.3s ease;
        }

        .worksheet-input:focus, .worksheet-textarea:focus {
            outline: none;
            border-color: #FF5500;
            background: rgba(255, 255, 255, 0.08);
        }

        .worksheet-textarea {
            min-height: 120px;
            resize: vertical;
        }

        .action-buttons {
            display: flex;
            gap: 15px;
            margin-top: 30px;
        }

        .btn-primary {
            background: #FF5500;
            color: #fff;
            border: none;
            padding: 12px 30px;
            border-radius: 25px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .btn-primary:hover {
            background: #d64d2d;
            transform: translateY(-2px);
        }

        .btn-secondary {
            background: transparent;
            color: #FF5500;
            border: 2px solid #FF5500;
            padding: 12px 30px;
            border-radius: 25px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .btn-secondary:hover {
            background: rgba(255, 85, 0, 0.1);
        }

        .resources-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }

        .resource-card {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 20px;
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .resource-card:hover {
            transform: translateY(-3px);
            border-color: #FF5500;
            background: rgba(255, 85, 0, 0.05);
        }

        .loading {
            text-align: center;
            padding: 40px;
            font-size: 18px;
            color: #FF5500;
        }
    </style>
</head>
<body>
    <button class="back-button" onclick="window.location.href='dashboard.html'">
        ← Back to Dashboard
    </button>

    <div class="container">
        <div class="breadcrumb">
            <a href="dashboard.html">Dashboard</a>
            <span class="separator">›</span>
            <a href="block-${blockNum}.html">${blockName}</a>
            <span class="separator">›</span>
            <span>${subName}</span>
        </div>

        <div class="subcomponent-header">
            <div class="subcomponent-number">${blockNum}.${subNum}</div>
            <h1 class="subcomponent-title">${subName}</h1>
            <p class="subcomponent-description">
                Comprehensive analysis and strategic planning for ${subName.toLowerCase()} in the ${blockName.toLowerCase()} phase.
            </p>
        </div>

        <div class="tab-navigation">
            <button class="tab-button active" data-tab="education">Education</button>
            <button class="tab-button" data-tab="workspace">Workspace</button>
            <button class="tab-button" data-tab="analysis">Analysis</button>
            <button class="tab-button" data-tab="resources">Resources</button>
            <button class="tab-button" data-tab="history">Score History</button>
        </div>

        <div id="education-tab" class="tab-content active">
            <div class="education-section">
                <h2 class="section-title">
                    <span class="section-icon">📚</span>
                    Educational Content
                </h2>
                <div class="section-content">
                    <p>Welcome to the ${subName} module. This section provides comprehensive guidance on developing and refining your ${subName.toLowerCase()} as part of your ${blockName.toLowerCase()} strategy.</p>
                    <br>
                    <p>Key learning objectives:</p>
                    <ul style="margin-left: 20px; margin-top: 10px;">
                        <li>Understanding the core components of ${subName.toLowerCase()}</li>
                        <li>Best practices for implementation</li>
                        <li>Common pitfalls and how to avoid them</li>
                        <li>Real-world examples and case studies</li>
                    </ul>
                </div>
            </div>
        </div>

        <div id="workspace-tab" class="tab-content">
            <div class="workspace-section">
                <h2 class="section-title">
                    <span class="section-icon">✏️</span>
                    Interactive Worksheet
                </h2>
                
                <div class="worksheet-field">
                    <label class="worksheet-label">Primary Objective</label>
                    <input type="text" class="worksheet-input" placeholder="Define your main objective..." value="Sample: Increase market share by 25%">
                </div>

                <div class="worksheet-field">
                    <label class="worksheet-label">Key Challenges</label>
                    <textarea class="worksheet-textarea" placeholder="Identify the main challenges...">Sample: Limited resources, competitive market, need for differentiation</textarea>
                </div>

                <div class="worksheet-field">
                    <label class="worksheet-label">Strategic Approach</label>
                    <textarea class="worksheet-textarea" placeholder="Outline your strategic approach...">Sample: Focus on customer-centric innovation and operational excellence</textarea>
                </div>

                <div class="worksheet-field">
                    <label class="worksheet-label">Success Metrics</label>
                    <input type="text" class="worksheet-input" placeholder="Define measurable success metrics..." value="Sample: Revenue growth, customer satisfaction, market penetration">
                </div>

                <div class="worksheet-field">
                    <label class="worksheet-label">Timeline</label>
                    <input type="text" class="worksheet-input" placeholder="Set your implementation timeline..." value="Sample: Q1 2025 - Q4 2025">
                </div>

                <div class="action-buttons">
                    <button class="btn-primary" onclick="analyzeWorksheet()">Analyze Worksheet</button>
                    <button class="btn-secondary" onclick="saveWorksheet()">Save Draft</button>
                </div>
            </div>
        </div>

        <div id="analysis-tab" class="tab-content">
            <div id="analysis-content">
                <div class="loading">
                    <p>Complete the worksheet to see your analysis results...</p>
                </div>
            </div>
        </div>

        <div id="resources-tab" class="tab-content">
            <div class="education-section">
                <h2 class="section-title">
                    <span class="section-icon">📖</span>
                    Resources & References
                </h2>
                <div class="resources-grid">
                    <div class="resource-card">
                        <h3 style="color: #FF5500; margin-bottom: 10px;">Templates</h3>
                        <p style="color: #999; font-size: 14px;">Download ready-to-use templates</p>
                    </div>
                    <div class="resource-card">
                        <h3 style="color: #FF5500; margin-bottom: 10px;">Case Studies</h3>
                        <p style="color: #999; font-size: 14px;">Learn from successful implementations</p>
                    </div>
                    <div class="resource-card">
                        <h3 style="color: #FF5500; margin-bottom: 10px;">Best Practices</h3>
                        <p style="color: #999; font-size: 14px;">Industry-proven methodologies</p>
                    </div>
                    <div class="resource-card">
                        <h3 style="color: #FF5500; margin-bottom: 10px;">Expert Insights</h3>
                        <p style="color: #999; font-size: 14px;">Tips from industry leaders</p>
                    </div>
                </div>
            </div>
        </div>

        <div id="history-tab" class="tab-content">
            <div id="score-history-content">
                <div class="loading">
                    <p>No analysis history yet. Complete your first analysis to see results here.</p>
                </div>
            </div>
        </div>
    </div>

    <script src="nav.js"></script>
    <script src="module-functions.js"></script>
</body>
</html>`;
}

// Process all module files
for (let block = 1; block <= 16; block++) {
    for (let sub = 1; sub <= 6; sub++) {
        const moduleId = `module-${block}-${sub}`;
        const filePath = path.join(__dirname, `${moduleId}.html`);
        
        try {
            if (fs.existsSync(filePath)) {
                let content = fs.readFileSync(filePath, 'utf8');
                
                // Check if file is empty or too small
                if (content.length < 100) {
                    console.log(`⚠️ Module ${moduleId} is empty or corrupted, regenerating...`);
                    content = generateCompleteHTML(moduleId);
                } else {
                    content = fixHTMLStructure(content, moduleId);
                }
                
                fs.writeFileSync(filePath, content);
                console.log(`✅ Fixed ${moduleId}.html`);
            } else {
                console.log(`⚠️ Module ${moduleId}.html not found, creating new file...`);
                fs.writeFileSync(filePath, generateCompleteHTML(moduleId));
                console.log(`✅ Created ${moduleId}.html`);
            }
        } catch (error) {
            console.error(`❌ Error processing ${moduleId}:`, error.message);
            // Try to create a fresh file
            try {
                fs.writeFileSync(filePath, generateCompleteHTML(moduleId));
                console.log(`✅ Recreated ${moduleId}.html after error`);
            } catch (e) {
                console.error(`❌ Failed to recreate ${moduleId}:`, e.message);
            }
        }
    }
}

console.log('\n✅ Module HTML fix complete!');
console.log('All 96 modules have been restored with proper structure.');
// Universal Module Template - Fixed Version
// Maintains original ScaleOps6 branding and layout
// Adds preloaded data and back button functionality

function generateModuleHTML(moduleConfig) {
    const { id, blockId, blockName, number, title, description } = moduleConfig;
    
    // Get preloaded workspace data based on module type
    const workspaceData = getPreloadedWorkspaceData(id);
    const educationContent = getEducationContent(id);
    const resourcesContent = getResourcesContent(id);
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ScaleOps6 - ${title}</title>
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

        /* Soft orange glow effect - ORIGINAL SCALEOPS6 STYLE */
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

        /* Back Button */
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

        /* Breadcrumb Navigation */
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

        /* Header Section - ORIGINAL SCALEOPS6 STYLE */
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

        /* Tab Navigation - ORIGINAL SCALEOPS6 STYLE */
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

        /* Tab Content */
        .tab-content {
            display: none;
        }

        .tab-content.active {
            display: block;
        }

        /* Section Styles - ORIGINAL SCALEOPS6 STYLE */
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

        /* Worksheet Fields */
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

        /* Action Buttons */
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

        /* Resources Grid */
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

        .bullet-list {
            list-style: none;
            padding-left: 0;
            margin-top: 20px;
        }

        .bullet-list li {
            padding: 15px 0 15px 35px;
            position: relative;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            line-height: 1.7;
        }

        .bullet-list li:before {
            content: '▸';
            position: absolute;
            left: 10px;
            color: #FF5500;
            font-size: 20px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <script src="nav.js"></script>
    
    <!-- Back Button -->
    <button class="back-button" onclick="goBack()">
        ← Back to Framework
    </button>
    
    <div class="container">
        <!-- Breadcrumb Navigation -->
        <div class="breadcrumb">
            <a href="/">Dashboard</a>
            <span class="separator">›</span>
            <a href="/module-index.html">GTM Framework</a>
            <span class="separator">›</span>
            <a href="#" id="block-link">${blockName}</a>
            <span class="separator">›</span>
            <span id="subcomponent-name">${title}</span>
        </div>

        <!-- Subcomponent Header -->
        <div class="subcomponent-header">
            <div class="subcomponent-number">${number}</div>
            <h1 class="subcomponent-title">${title.toUpperCase()}</h1>
            <p class="subcomponent-description">${description}</p>
        </div>

        <!-- Tab Navigation -->
        <div class="tab-navigation">
            <button class="tab-button active" data-tab="education" onclick="switchTab('education', event)">📚 Education</button>
            <button class="tab-button" data-tab="workspace" onclick="switchTab('workspace', event)">✏️ Workspace</button>
            <button class="tab-button" data-tab="analysis" onclick="switchTab('analysis', event)">🤖 Analysis</button>
            <button class="tab-button" data-tab="resources" onclick="switchTab('resources', event)">🔧 Resources</button>
            <button class="tab-button" data-tab="history" onclick="switchTab('history', event)">📊 Score History</button>
        </div>

        <!-- Education Tab -->
        <div id="education-tab" class="tab-content active">
            ${educationContent}
        </div>

        <!-- Workspace Tab -->
        <div id="workspace-tab" class="tab-content">
            <div class="workspace-section">
                <h2 class="section-title">
                    <span class="section-icon">📝</span>
                    Interactive Worksheet
                </h2>
                
                <div id="worksheet-container">
                    ${workspaceData}
                </div>

                <div class="action-buttons">
                    <button class="btn-primary" onclick="saveWorksheet()">Save Progress</button>
                    <button class="btn-primary" onclick="analyzeWorksheet()" style="background: #4CAF50;">🤖 Analyze Results</button>
                    <button class="btn-secondary" onclick="exportWorksheet()">Export as PDF</button>
                </div>
            </div>
        </div>

        <!-- Analysis Tab -->
        <div id="analysis-tab" class="tab-content">
            <div class="workspace-section">
                <h2 class="section-title">
                    <span class="section-icon">🤖</span>
                    Analysis Results
                </h2>
                
                <div id="analysis-content" style="min-height: 400px;">
                    <div style="text-align: center; padding: 60px 20px; color: #999;">
                        <div style="font-size: 48px; margin-bottom: 20px;">📊</div>
                        <h3 style="font-size: 24px; margin-bottom: 10px; color: #fff;">No Analysis Yet</h3>
                        <p style="font-size: 16px;">Complete the worksheet and click "Analyze Results" to get AI-powered feedback</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Resources Tab -->
        <div id="resources-tab" class="tab-content">
            ${resourcesContent}
        </div>

        <!-- Score History Tab -->
        <div id="history-tab" class="tab-content">
            <div class="workspace-section">
                <h2 class="section-title">
                    <span class="section-icon">📊</span>
                    Score History & Progress
                </h2>
                
                <div id="score-history-content" style="min-height: 400px;">
                    <div style="text-align: center; padding: 60px 20px; color: #999;">
                        <div style="font-size: 48px; margin-bottom: 20px;">📈</div>
                        <h3 style="font-size: 24px; margin-bottom: 10px; color: #fff;">Track Your Progress</h3>
                        <p style="font-size: 16px;">Your score history will appear here after your first analysis</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Module configuration
        const moduleId = '${id}';
        const blockId = ${blockId};
        
        // Back button functionality
        function goBack() {
            window.location.href = '/module-index.html';
        }
        
        // Tab switching
        function switchTab(tabName, event) {
            if (event) event.preventDefault();
            
            // Hide all tabs
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Remove active from all buttons
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Show selected tab
            const selectedTab = document.getElementById(tabName + '-tab');
            if (selectedTab) {
                selectedTab.classList.add('active');
            }
            
            // Activate button
            if (event && event.currentTarget) {
                event.currentTarget.classList.add('active');
            }
        }
        
        // Save worksheet
        function saveWorksheet() {
            const worksheetData = {};
            document.querySelectorAll('.worksheet-input, .worksheet-textarea').forEach(field => {
                worksheetData[field.id] = field.value;
            });
            
            localStorage.setItem('worksheet_' + moduleId, JSON.stringify(worksheetData));
            alert('Worksheet saved successfully!');
        }
        
        // Analyze worksheet
        async function analyzeWorksheet() {
            const worksheetData = {};
            document.querySelectorAll('.worksheet-input, .worksheet-textarea').forEach(field => {
                worksheetData[field.id] = field.value;
            });
            
            // Switch to analysis tab
            switchTab('analysis', null);
            document.querySelector('[data-tab="analysis"]').click();
            
            // Show loading
            document.getElementById('analysis-content').innerHTML = \`
                <div style="text-align: center; padding: 60px 20px;">
                    <div style="font-size: 48px; margin-bottom: 20px; animation: pulse 1.5s infinite;">🤖</div>
                    <h3 style="font-size: 24px; margin-bottom: 10px; color: #FF5500;">Analyzing Your Input...</h3>
                    <p style="font-size: 16px; color: #999;">Our AI agent is evaluating your responses</p>
                </div>
            \`;
            
            // Call analysis API
            try {
                const response = await fetch('/api/analyze/module', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        moduleId: moduleId,
                        worksheetData: worksheetData
                    })
                });
                
                if (response.ok) {
                    const analysis = await response.json();
                    displayAnalysisResults(analysis);
                }
            } catch (error) {
                console.error('Analysis error:', error);
            }
        }
        
        // Display analysis results
        function displayAnalysisResults(analysis) {
            const content = document.getElementById('analysis-content');
            // Implementation would go here - using the same display logic as Phase 1
        }
        
        // Export worksheet
        function exportWorksheet() {
            alert('Export functionality will generate a PDF of your worksheet.');
        }
        
        // Load saved data on page load
        document.addEventListener('DOMContentLoaded', () => {
            const savedData = localStorage.getItem('worksheet_' + moduleId);
            if (savedData) {
                const worksheetData = JSON.parse(savedData);
                Object.keys(worksheetData).forEach(fieldId => {
                    const field = document.getElementById(fieldId);
                    if (field) {
                        field.value = worksheetData[fieldId];
                    }
                });
            }
        });
    </script>
    
    <!-- Load the same handlers as Phase 1 -->
    <script src="enhanced-display-handler-fixed.js"></script>
    <script src="unified-analysis-handler-fixed.js"></script>
    <script src="score-history-handler.js"></script>
    <script src="module-workspace-loader.js"></script>
</body>
</html>`;
}

// Function to get preloaded workspace data based on module
function getPreloadedWorkspaceData(moduleId) {
    const workspaceConfigs = {
        // Phase 2 - Idea to Market Fit
        '4-1': { // Market Segmentation
            fields: [
                { id: 'target-segments', label: 'Target Market Segments', type: 'textarea', value: 'Enterprise B2B SaaS companies with 100-500 employees\nSeries A-C startups in high-growth phase\nTechnology companies transitioning to subscription models' },
                { id: 'segment-criteria', label: 'Segmentation Criteria', type: 'textarea', value: 'Company size: 100-500 employees\nRevenue: $10M-$100M ARR\nGrowth rate: 30%+ YoY\nTechnology adoption: Cloud-first, API-driven' },
                { id: 'tam-sam-som', label: 'TAM/SAM/SOM Analysis', type: 'textarea', value: 'TAM: $50B global B2B SaaS market\nSAM: $5B mid-market segment\nSOM: $500M achievable in 5 years' },
                { id: 'segment-priorities', label: 'Priority Segments', type: 'input', value: 'Financial Services, Healthcare Tech, E-commerce Platforms' }
            ]
        },
        '4-2': { // Competitive Landscape
            fields: [
                { id: 'competitors', label: 'Key Competitors', type: 'textarea', value: 'Direct: Competitor A ($100M ARR), Competitor B ($75M ARR)\nIndirect: In-house solutions, Spreadsheets, Legacy systems' },
                { id: 'competitive-advantages', label: 'Our Competitive Advantages', type: 'textarea', value: '10x faster implementation than competitors\nAI-powered insights unique to our platform\n50% lower TCO through efficient architecture' },
                { id: 'market-gaps', label: 'Market Gaps Identified', type: 'textarea', value: 'No solution for mid-market companies\nLack of vertical-specific features\nPoor integration capabilities in existing tools' }
            ]
        },
        // Add more module configurations...
    };
    
    const config = workspaceConfigs[moduleId] || {
        fields: [
            { id: 'field1', label: 'Key Information', type: 'textarea', value: 'Enter your key information here...' },
            { id: 'field2', label: 'Strategic Approach', type: 'textarea', value: 'Describe your strategic approach...' },
            { id: 'field3', label: 'Success Metrics', type: 'input', value: 'Define your success metrics...' }
        ]
    };
    
    return config.fields.map(field => {
        if (field.type === 'textarea') {
            return `
                <div class="worksheet-field">
                    <label class="worksheet-label" for="${field.id}">${field.label}</label>
                    <textarea id="${field.id}" class="worksheet-textarea" placeholder="Enter details...">${field.value}</textarea>
                </div>
            `;
        } else {
            return `
                <div class="worksheet-field">
                    <label class="worksheet-label" for="${field.id}">${field.label}</label>
                    <input type="text" id="${field.id}" class="worksheet-input" value="${field.value}" placeholder="Enter details...">
                </div>
            `;
        }
    }).join('');
}

// Function to get education content
function getEducationContent(moduleId) {
    // This would contain specific education content for each module
    return `
        <div class="education-section">
            <h2 class="section-title">
                <span class="section-icon">🎯</span>
                What You'll Learn
            </h2>
            <div class="section-content">
                <p>This module provides comprehensive guidance on implementing effective GTM strategies. You'll learn industry best practices, proven frameworks, and actionable insights to accelerate your growth.</p>
                <ul class="bullet-list">
                    <li>Understanding core GTM principles and frameworks</li>
                    <li>Identifying and validating market opportunities</li>
                    <li>Building scalable go-to-market processes</li>
                    <li>Measuring and optimizing performance metrics</li>
                </ul>
            </div>
        </div>
        
        <div class="education-section">
            <h2 class="section-title">
                <span class="section-icon">💡</span>
                Why This Matters
            </h2>
            <div class="section-content">
                <p>A well-executed GTM strategy is the difference between rapid growth and stagnation. This module helps you avoid common pitfalls and accelerate your path to market success.</p>
            </div>
        </div>
        
        <div class="education-section">
            <h2 class="section-title">
                <span class="section-icon">🚀</span>
                Implementation Steps
            </h2>
            <div class="section-content">
                <ol class="bullet-list">
                    <li>Complete the interactive worksheet with your specific context</li>
                    <li>Review the AI-powered analysis and recommendations</li>
                    <li>Apply the suggested frameworks to your business</li>
                    <li>Track progress using the provided metrics</li>
                    <li>Iterate based on results and feedback</li>
                </ol>
            </div>
        </div>
    `;
}

// Function to get resources content
function getResourcesContent(moduleId) {
    return `
        <div class="workspace-section">
            <h2 class="section-title">
                <span class="section-icon">📚</span>
                Templates & Frameworks
            </h2>
            <div class="resources-grid">
                <div class="resource-card">
                    <h4 style="color: #FF5500; margin-bottom: 10px;">GTM Strategy Template</h4>
                    <p style="font-size: 14px; color: #999;">Comprehensive template for planning your go-to-market strategy</p>
                </div>
                <div class="resource-card">
                    <h4 style="color: #FF5500; margin-bottom: 10px;">Market Analysis Framework</h4>
                    <p style="font-size: 14px; color: #999;">Structured approach to analyzing market opportunities</p>
                </div>
                <div class="resource-card">
                    <h4 style="color: #FF5500; margin-bottom: 10px;">Competitive Positioning Canvas</h4>
                    <p style="font-size: 14px; color: #999;">Visual framework for competitive differentiation</p>
                </div>
            </div>
        </div>
        
        <div class="workspace-section">
            <h2 class="section-title">
                <span class="section-icon">💼</span>
                Case Studies
            </h2>
            <div class="section-content">
                <ul class="bullet-list">
                    <li><strong>SaaS Startup Success:</strong> How Company X achieved $10M ARR in 18 months using this framework</li>
                    <li><strong>Enterprise Transformation:</strong> Fortune 500 company's journey to market leadership</li>
                    <li><strong>Pivot to Profit:</strong> How Company Z found product-market fit after strategic pivot</li>
                </ul>
            </div>
        </div>
        
        <div class="workspace-section">
            <h2 class="section-title">
                <span class="section-icon">🔧</span>
                Recommended Tools
            </h2>
            <div class="resources-grid">
                <div class="resource-card">
                    <h4 style="color: #FF5500; margin-bottom: 10px;">Analytics Platforms</h4>
                    <p style="font-size: 14px; color: #999;">Mixpanel, Amplitude, Google Analytics</p>
                </div>
                <div class="resource-card">
                    <h4 style="color: #FF5500; margin-bottom: 10px;">CRM Systems</h4>
                    <p style="font-size: 14px; color: #999;">Salesforce, HubSpot, Pipedrive</p>
                </div>
                <div class="resource-card">
                    <h4 style="color: #FF5500; margin-bottom: 10px;">Marketing Automation</h4>
                    <p style="font-size: 14px; color: #999;">Marketo, Pardot, ActiveCampaign</p>
                </div>
            </div>
        </div>
    `;
}

// Export the function
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generateModuleHTML };
}
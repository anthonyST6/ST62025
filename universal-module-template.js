// Universal Module Template for ST6 Nexus Ops
// This template provides the complete structure for all GTM modules
// Includes: Workspace, Analysis, Score History, Display Handlers

class UniversalModuleTemplate {
    constructor() {
        this.version = '1.0.0';
        this.components = {
            workspace: true,
            analysis: true,
            scoreHistory: true,
            resources: true,
            education: true
        };
    }

    // Generate HTML structure for any module
    generateModuleHTML(blockId, subcomponentId, title, description) {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - ScaleOps6 GTM Framework</title>
    
    <!-- Core CSS -->
    <link rel="stylesheet" href="css/st6-nexusops.css">
    <link rel="stylesheet" href="css/scale-team-six.css">
    
    <!-- Module-specific styles -->
    <style>
        /* Universal ScaleOps6 Branding */
        :root {
            --primary-orange: #FF5500;
            --secondary-orange: #FF8800;
            --dark-bg: #1a1a1a;
            --darker-bg: #0d0d0d;
            --text-white: #ffffff;
            --text-gray: #999999;
            --success-green: #10B981;
            --warning-yellow: #F59E0B;
            --error-red: #EF4444;
            --critical-red: #DC2626;
        }

        body {
            background: var(--dark-bg);
            color: var(--text-white);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 0;
        }

        /* Header Styling */
        .module-header {
            background: linear-gradient(135deg, var(--darker-bg), var(--dark-bg));
            border: 2px solid var(--primary-orange);
            border-radius: 16px;
            padding: 30px;
            margin: 20px;
        }

        .module-title {
            font-size: 32px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: var(--primary-orange);
            margin: 0 0 10px 0;
        }

        .module-description {
            font-size: 16px;
            color: var(--text-gray);
            line-height: 1.6;
        }

        /* Tab Navigation */
        .tab-navigation {
            display: flex;
            gap: 0;
            margin: 20px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            padding: 5px;
        }

        .tab-button {
            flex: 1;
            padding: 15px 20px;
            background: transparent;
            border: none;
            color: var(--text-gray);
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            cursor: pointer;
            transition: all 0.3s ease;
            border-radius: 8px;
        }

        .tab-button.active {
            background: var(--primary-orange);
            color: var(--text-white);
        }

        .tab-button:hover:not(.active) {
            background: rgba(255, 85, 0, 0.1);
            color: var(--text-white);
        }

        /* Tab Content */
        .tab-content {
            display: none;
            padding: 30px;
            margin: 20px;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .tab-content.active {
            display: block;
            animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Workspace Fields */
        .workspace-field {
            margin-bottom: 25px;
        }

        .field-label {
            display: block;
            font-size: 13px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: var(--primary-orange);
            margin-bottom: 10px;
        }

        .field-input {
            width: 100%;
            padding: 15px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            color: var(--text-white);
            font-size: 15px;
            line-height: 1.6;
            resize: vertical;
            min-height: 100px;
            transition: all 0.3s ease;
        }

        .field-input:focus {
            outline: none;
            border-color: var(--primary-orange);
            background: rgba(255, 255, 255, 0.08);
            box-shadow: 0 0 0 3px rgba(255, 85, 0, 0.1);
        }

        /* Action Buttons */
        .action-buttons {
            display: flex;
            gap: 15px;
            margin-top: 30px;
            justify-content: center;
        }

        .btn {
            padding: 15px 30px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
        }

        .btn-primary {
            background: linear-gradient(135deg, var(--primary-orange), var(--secondary-orange));
            color: white;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(255, 85, 0, 0.3);
        }

        .btn-secondary {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.15);
        }

        .btn-success {
            background: var(--success-green);
            color: white;
        }

        /* Analysis Display */
        #analysis-content {
            min-height: 400px;
        }

        /* Score History */
        .score-history-container {
            padding: 20px;
        }

        .history-item {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 15px;
            border-left: 4px solid var(--primary-orange);
        }

        /* Resources */
        .resource-card {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 15px;
            transition: all 0.3s ease;
        }

        .resource-card:hover {
            background: rgba(255, 255, 255, 0.08);
            transform: translateX(5px);
        }

        /* File Upload Area */
        .file-upload-area {
            border: 2px dashed rgba(255, 85, 0, 0.3);
            border-radius: 12px;
            padding: 40px;
            text-align: center;
            margin: 20px 0;
            transition: all 0.3s ease;
        }

        .file-upload-area:hover {
            border-color: var(--primary-orange);
            background: rgba(255, 85, 0, 0.05);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .module-title {
                font-size: 24px;
            }
            
            .tab-navigation {
                flex-direction: column;
            }
            
            .action-buttons {
                flex-direction: column;
            }
            
            .btn {
                width: 100%;
            }
        }
    </style>
</head>
<body>
    <!-- Navigation Header -->
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-brand">
                <img src="/images/scaleops6-logo.png" alt="ScaleOps6" class="logo">
            </div>
            <div class="nav-links">
                <a href="/dashboard">Dashboard</a>
                <a href="/analytics">Analytics</a>
                <a href="/help">Help</a>
                <button class="btn-logout">Logout</button>
            </div>
        </div>
    </nav>

    <!-- Breadcrumb -->
    <div class="breadcrumb">
        <a href="/dashboard">Dashboard</a>
        <span>›</span>
        <a href="/block-${blockId}">Block ${blockId}</a>
        <span>›</span>
        <span id="breadcrumb-current">${title}</span>
    </div>

    <!-- Module Header -->
    <div class="module-header">
        <h1 class="module-title">${title}</h1>
        <p class="module-description">${description}</p>
        <div class="module-id">Module ${blockId}.${subcomponentId}</div>
    </div>

    <!-- Tab Navigation -->
    <div class="tab-navigation">
        <button class="tab-button active" data-tab="education" onclick="switchTab('education', this)">
            📚 EDUCATION
        </button>
        <button class="tab-button" data-tab="workspace" onclick="switchTab('workspace', this)">
            ✏️ WORKSPACE
        </button>
        <button class="tab-button" data-tab="analysis" onclick="switchTab('analysis', this)">
            📊 ANALYSIS
        </button>
        <button class="tab-button" data-tab="resources" onclick="switchTab('resources', this)">
            🔧 RESOURCES
        </button>
        <button class="tab-button" data-tab="score-history" onclick="switchTab('score-history', this)">
            📈 SCORE HISTORY
        </button>
    </div>

    <!-- Tab Contents -->
    
    <!-- Education Tab -->
    <div id="education-tab" class="tab-content active">
        <h2>Understanding ${title}</h2>
        <div id="education-content">
            <!-- Dynamic content loaded here -->
        </div>
    </div>

    <!-- Workspace Tab -->
    <div id="workspace-tab" class="tab-content">
        <h2>Complete Your Worksheet</h2>
        <div id="workspace-fields">
            <!-- Dynamic fields generated based on module -->
        </div>
        
        <!-- File Upload Area -->
        <div class="file-upload-area">
            <div class="upload-icon">📁</div>
            <p>Drop files here or click to upload</p>
            <p class="upload-hint">Support for PDF, DOCX, PPTX, XLSX (Max 10MB)</p>
        </div>
        
        <!-- Action Buttons -->
        <div class="action-buttons">
            <button class="btn btn-secondary" onclick="saveProgress()">
                💾 SAVE PROGRESS
            </button>
            <button class="btn btn-success" onclick="analyzeWorksheet()">
                🤖 ANALYZE RESULTS
            </button>
            <button class="btn btn-secondary" onclick="exportToPDF()">
                📄 EXPORT AS PDF
            </button>
        </div>
    </div>

    <!-- Analysis Tab -->
    <div id="analysis-tab" class="tab-content">
        <h2>Analysis Results</h2>
        <div id="analysis-content">
            <!-- Analysis results displayed here -->
        </div>
    </div>

    <!-- Resources Tab -->
    <div id="resources-tab" class="tab-content">
        <h2>Resources & Templates</h2>
        <div id="resources-content">
            <!-- Resources loaded here -->
        </div>
    </div>

    <!-- Score History Tab -->
    <div id="score-history-tab" class="tab-content">
        <h2>Your Progress History</h2>
        <div id="score-history-content">
            <!-- Score history displayed here -->
        </div>
    </div>

    <!-- Core JavaScript -->
    <script>
        // Module Configuration
        const moduleConfig = {
            blockId: ${blockId},
            subcomponentId: ${subcomponentId},
            moduleId: '${blockId}-${subcomponentId}',
            title: '${title}',
            description: '${description}'
        };

        // Tab Switching
        function switchTab(tabName, button) {
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
            
            // Mark button as active
            if (button) {
                button.classList.add('active');
            }
            
            // Load tab-specific content if needed
            loadTabContent(tabName);
        }

        // Load tab content dynamically
        function loadTabContent(tabName) {
            switch(tabName) {
                case 'education':
                    loadEducationContent();
                    break;
                case 'workspace':
                    loadWorkspaceFields();
                    break;
                case 'resources':
                    loadResources();
                    break;
                case 'score-history':
                    loadScoreHistory();
                    break;
            }
        }

        // Save Progress
        function saveProgress() {
            const worksheetData = collectWorksheetData();
            
            // Save to localStorage with retry logic
            const saveWithRetry = (data, attempts = 3) => {
                try {
                    const key = 'worksheet_' + moduleConfig.moduleId;
                    localStorage.setItem(key, JSON.stringify({
                        data: data,
                        timestamp: new Date().toISOString(),
                        moduleId: moduleConfig.moduleId
                    }));
                    
                    showNotification('Progress saved successfully!', 'success');
                    return true;
                } catch (error) {
                    if (attempts > 1) {
                        console.log('Retrying save...', attempts - 1, 'attempts left');
                        return saveWithRetry(data, attempts - 1);
                    }
                    showNotification('Failed to save progress', 'error');
                    return false;
                }
            };
            
            saveWithRetry(worksheetData);
        }

        // Collect worksheet data
        function collectWorksheetData() {
            const data = {};
            
            // Collect all field values
            for (let i = 1; i <= 6; i++) {
                const field = document.getElementById('field-' + i);
                if (field) {
                    data['field-' + i] = field.value || '';
                }
            }
            
            return data;
        }

        // Show notification
        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = 'notification ' + type;
            notification.textContent = message;
            
            notification.style.cssText = \`
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 25px;
                background: \${type === 'success' ? '#10B981' : 
                           type === 'error' ? '#EF4444' : '#2196F3'};
                color: white;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                z-index: 10000;
                animation: slideIn 0.3s ease;
            \`;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 5000);
        }

        // Initialize on load
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Module initialized:', moduleConfig);
            
            // Load saved progress if exists
            loadSavedProgress();
            
            // Load initial content
            loadEducationContent();
            loadWorkspaceFields();
        });

        // Load saved progress
        function loadSavedProgress() {
            try {
                const key = 'worksheet_' + moduleConfig.moduleId;
                const saved = localStorage.getItem(key);
                
                if (saved) {
                    const { data } = JSON.parse(saved);
                    
                    // Restore field values
                    Object.keys(data).forEach(fieldId => {
                        const field = document.getElementById(fieldId);
                        if (field) {
                            field.value = data[fieldId];
                        }
                    });
                    
                    console.log('Loaded saved progress');
                }
            } catch (error) {
                console.error('Error loading saved progress:', error);
            }
        }

        // Export to PDF
        function exportToPDF() {
            showNotification('PDF export feature coming soon!', 'info');
        }
    </script>

    <!-- Load Handler Scripts -->
    <script src="enhanced-display-handler-fixed.js"></script>
    <script src="unified-analysis-handler-fixed.js"></script>
    <script src="score-history-handler.js"></script>
    <script src="module-workspace-loader.js"></script>
    
    <!-- Module-specific script -->
    <script src="module-${blockId}-${subcomponentId}.js"></script>
</body>
</html>
        `;
    }

    // Generate workspace fields based on module type
    generateWorkspaceFields(blockId, subcomponentId) {
        const fieldConfigs = this.getFieldConfigurations(blockId, subcomponentId);
        
        return fieldConfigs.map((field, index) => `
            <div class="workspace-field">
                <label class="field-label" for="field-${index + 1}">
                    ${field.label}
                </label>
                <textarea 
                    id="field-${index + 1}"
                    class="field-input"
                    placeholder="${field.placeholder}"
                    rows="4"
                >${field.defaultValue || ''}</textarea>
                ${field.hint ? `<p class="field-hint">${field.hint}</p>` : ''}
            </div>
        `).join('');
    }

    // Get field configurations for each module
    getFieldConfigurations(blockId, subcomponentId) {
        // Default configuration for all modules
        const defaultFields = [
            {
                label: "Current Situation",
                placeholder: "Describe your current state or challenge...",
                hint: "Be specific about where you are now"
            },
            {
                label: "Desired Outcome",
                placeholder: "What does success look like?",
                hint: "Define clear, measurable goals"
            },
            {
                label: "Key Stakeholders",
                placeholder: "Who is involved or affected?",
                hint: "List all relevant parties"
            },
            {
                label: "Resources Available",
                placeholder: "What resources do you have?",
                hint: "Include time, budget, team, tools"
            },
            {
                label: "Constraints & Risks",
                placeholder: "What limitations or risks exist?",
                hint: "Be honest about challenges"
            },
            {
                label: "Success Metrics",
                placeholder: "How will you measure success?",
                hint: "Define specific KPIs"
            }
        ];

        // Module-specific overrides can be added here
        const moduleSpecificFields = {
            '4-1': [ // Prototype Launch - Feature Inclusion
                {
                    label: "Core Features",
                    placeholder: "List the must-have features for your MVP...",
                    hint: "Focus on solving the core problem"
                },
                {
                    label: "Nice-to-Have Features",
                    placeholder: "Features that can wait for v2...",
                    hint: "Be ruthless about scope"
                },
                {
                    label: "User Stories",
                    placeholder: "As a [user], I want to [action] so that [benefit]...",
                    hint: "Write from the user's perspective"
                },
                {
                    label: "Technical Requirements",
                    placeholder: "What technical capabilities are needed?",
                    hint: "Consider infrastructure, APIs, data"
                },
                {
                    label: "Timeline",
                    placeholder: "When does each feature need to be ready?",
                    hint: "Be realistic about development time"
                },
                {
                    label: "Success Criteria",
                    placeholder: "How will you know the feature works?",
                    hint: "Define acceptance criteria"
                }
            ],
            // Add more module-specific configurations as needed
        };

        const moduleKey = `${blockId}-${subcomponentId}`;
        return moduleSpecificFields[moduleKey] || defaultFields;
    }

    // Generate module-specific JavaScript
    generateModuleScript(blockId, subcomponentId) {
        return `
// Module-specific script for ${blockId}-${subcomponentId}
(function() {
    console.log('Loading module ${blockId}-${subcomponentId}');
    
    // Module-specific configurations
    const moduleSettings = {
        blockId: ${blockId},
        subcomponentId: ${subcomponentId},
        apiEndpoint: '/api/analyze/block-${blockId}',
        agentType: 'block${blockId}Agent'
    };
    
    // Load education content
    window.loadEducationContent = async function() {
        try {
            const response = await fetch('/api/content/education/${blockId}-${subcomponentId}');
            if (response.ok) {
                const content = await response.json();
                const container = document.getElementById('education-content');
                if (container) {
                    container.innerHTML = formatEducationContent(content);
                }
            }
        } catch (error) {
            console.error('Error loading education content:', error);
        }
    };
    
    // Load workspace fields
    window.loadWorkspaceFields = function() {
        const container = document.getElementById('workspace-fields');
        if (container && !container.hasChildNodes()) {
            // Use the ModuleWorkspaceLoader from module-workspace-loader.js
            if (typeof ModuleWorkspaceLoader !== 'undefined') {
                ModuleWorkspaceLoader.loadWorkspaceFields(${blockId}, ${subcomponentId});
            } else {
                console.error('ModuleWorkspaceLoader not found');
            }
        }
    };
    
    // Load resources
    window.loadResources = async function() {
        try {
            const response = await fetch('/api/content/resources/${blockId}-${subcomponentId}');
            if (response.ok) {
                const resources = await response.json();
                const container = document.getElementById('resources-content');
                if (container) {
                    container.innerHTML = formatResources(resources);
                }
            }
        } catch (error) {
            console.error('Error loading resources:', error);
        }
    };
    
    // Load score history
    window.loadScoreHistory = async function() {
        try {
            const response = await fetch('/api/score-history/${blockId}-${subcomponentId}');
            if (response.ok) {
                const history = await response.json();
                const container = document.getElementById('score-history-content');
                if (container) {
                    container.innerHTML = formatScoreHistory(history);
                }
            }
        } catch (error) {
            console.error('Error loading score history:', error);
        }
    };
    
    // Format education content
    function formatEducationContent(content) {
        return \`
            <div class="education-section">
                <h3>What</h3>
                <p>\${content.what || 'Loading...'}</p>
                
                <h3>Why</h3>
                <p>\${content.why || 'Loading...'}</p>
                
                <h3>How</h3>
                <p>\${content.how || 'Loading...'}</p>
                
                <h3>Examples</h3>
                <ul>
                    \${(content.examples || []).map(ex => \`<li>\${ex}</li>\`).join('')}
                </ul>
            </div>
        \`;
    }
    
    // Format resources
    function formatResources(resources) {
        return (resources || []).map(resource => \`
            <div class="resource-card">
                <h3>\${resource.title}</h3>
                <p>\${resource.description}</p>
                <a href="\${resource.link}" target="_blank" class="btn btn-secondary">
                    View Resource →
                </a>
            </div>
        \`).join('');
    }
    
    // Format score history
    function formatScoreHistory(history) {
        return (history || []).map(item => \`
            <div class="history-item">
                <div class="history-date">\${new Date(item.timestamp).toLocaleDateString()}</div>
                <div class="history-score">Score: \${item.score}%</div>
                <div class="history-summary">\${item.summary || 'Analysis completed'}</div>
            </div>
        \`).join('');
    }
    
    // Override analyze function to use unified handler
    window.analyzeWorksheet = function() {
        // This will be handled by unified-analysis-handler-fixed.js
        console.log('Analyzing worksheet for module ${blockId}-${subcomponentId}');
        
        // The unified handler will automatically detect the module and route appropriately
        if (typeof window.analyzeWorksheet === 'function') {
            // Call the unified handler
            window.analyzeWorksheet();
        }
    };
    
    console.log('Module ${blockId}-${subcomponentId} ready');
})();
        `;
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UniversalModuleTemplate;
}

// Make available globally
if (typeof window !== 'undefined') {
    window.UniversalModuleTemplate = UniversalModuleTemplate;
}
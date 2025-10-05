// ScaleOps6 Polished Content Integration Script
// This script integrates all polished content into existing subcomponent HTML files

const fs = require('fs');
const path = require('path');

// Map the letter-based naming to number-based IDs
const SUBCOMPONENT_MAPPING = {
    '1a': '1-1', '1b': '1-2', '1c': '1-3', '1d': '1-4', '1e': '1-5', '1f': '1-6',
    '2a': '2-1', '2b': '2-2', '2c': '2-3', '2d': '2-4', '2e': '2-5', '2f': '2-6',
    '3a': '3-1', '3b': '3-2', '3c': '3-3', '3d': '3-4', '3e': '3-5', '3f': '3-6',
    '4a': '4-1', '4b': '4-2', '4c': '4-3', '4d': '4-4', '4e': '4-5', '4f': '4-6',
    '5a': '5-1', '5b': '5-2', '5c': '5-3', '5d': '5-4', '5e': '5-5', '5f': '5-6',
    '6a': '6-1', '6b': '6-2', '6c': '6-3', '6d': '6-4', '6e': '6-5', '6f': '6-6',
    '7a': '7-1', '7b': '7-2', '7c': '7-3', '7d': '7-4', '7e': '7-5', '7f': '7-6',
    '8a': '8-1', '8b': '8-2', '8c': '8-3', '8d': '8-4', '8e': '8-5', '8f': '8-6',
    '9a': '9-1', '9b': '9-2', '9c': '9-3', '9d': '9-4', '9e': '9-5', '9f': '9-6',
    '10a': '10-1', '10b': '10-2', '10c': '10-3', '10d': '10-4', '10e': '10-5', '10f': '10-6',
    '11a': '11-1', '11b': '11-2', '11c': '11-3', '11d': '11-4', '11e': '11-5', '11f': '11-6',
    '12a': '12-1', '12b': '12-2', '12c': '12-3', '12d': '12-4', '12e': '12-5', '12f': '12-6',
    '13a': '13-1', '13b': '13-2', '13c': '13-3', '13d': '13-4', '13e': '13-5', '13f': '13-6',
    '14a': '14-1', '14b': '14-2', '14c': '14-3', '14d': '14-4', '14e': '14-5', '14f': '14-6',
    '15a': '15-1', '15b': '15-2', '15c': '15-3', '15d': '15-4', '15e': '15-5', '15f': '15-6',
    '16a': '16-1', '16b': '16-2', '16c': '16-3', '16d': '16-4', '16e': '16-5', '16f': '16-6'
};

// Function to update HTML file with polished content
function updateSubcomponentFile(filePath, subcomponentId) {
    try {
        let html = fs.readFileSync(filePath, 'utf8');
        const originalLength = html.length;
        
        // Add script references if not present
        if (!html.includes('scaleops6-polished-education.js')) {
            const scriptSection = `
    <!-- ScaleOps6 Polished Content Scripts -->
    <script src="scaleops6-polished-education.js"></script>
    <script src="scaleops6-polished-analysis-fix.js"></script>
    <script src="enhanced-agent-content-loader.js"></script>
    <script src="fix-education-content-complete.js"></script>
    <script>
        // Set the subcomponent ID for content loading
        window.currentSubcomponentId = '${subcomponentId}';
        
        // Initialize polished content on load
        document.addEventListener('DOMContentLoaded', function() {
            console.log('🚀 Initializing ScaleOps6 polished content for ${subcomponentId}');
            
            // Load education content
            if (window.getPolishedEducationContent) {
                const educationTab = document.getElementById('education');
                if (educationTab) {
                    educationTab.innerHTML = window.getPolishedEducationContent('${subcomponentId}');
                }
            }
            
            // Initialize enhanced content loader
            if (window.EnhancedAgentContentLoader) {
                window.agentLoader = new window.EnhancedAgentContentLoader();
                window.agentLoader.initialize();
            }
        });
    </script>
</body>`;
            html = html.replace('</body>', scriptSection);
        }
        
        // Update tab icons to match ScaleOps6 branding
        html = html.replace(
            '<i class="fas fa-graduation-cap"></i> Education',
            '📚 Education'
        );
        html = html.replace(
            '<i class="fas fa-edit"></i> Workspace',
            '✏️ Workspace'
        );
        html = html.replace(
            '<i class="fas fa-chart-line"></i> Analysis',
            '🤖 Analysis'
        );
        html = html.replace(
            '<i class="fas fa-book"></i> Resources',
            '🔧 Resources'
        );
        html = html.replace(
            '<i class="fas fa-history"></i> Score History',
            '📊 Score History'
        );
        
        // Add Output tab if missing
        if (!html.includes('data-tab="output"')) {
            const outputTabHTML = `
            <button class="tab" data-tab="output">
                📋 Output
            </button>`;
            
            const outputContentHTML = `
            <div id="output" class="tab-content">
                <div id="output-content">
                    <!-- Output content will be dynamically loaded -->
                    <div class="content-section">
                        <h3>Template Outputs</h3>
                        <p>Complete the workspace analysis to generate outputs.</p>
                    </div>
                </div>
            </div>`;
            
            // Insert Output tab after Analysis tab
            html = html.replace(
                '🤖 Analysis\n            </button>',
                `🤖 Analysis
            </button>
            ${outputTabHTML}`
            );
            
            // Insert Output content after Analysis content
            const analysisEndPattern = /<\/div>\s*<div id="resources"/;
            if (analysisEndPattern.test(html)) {
                html = html.replace(analysisEndPattern, `</div>
            ${outputContentHTML}
            <div id="resources"`);
            }
        }
        
        // Fix tab switching JavaScript
        const tabSwitchFix = `
        // Enhanced tab switching
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                console.log('Switching to tab:', tabName);
                
                // Update active tab
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Update active content
                document.querySelectorAll('.tab-content').forEach(pane => {
                    pane.classList.remove('active');
                    pane.style.display = 'none';
                });
                
                const targetPane = document.getElementById(tabName);
                if (targetPane) {
                    targetPane.classList.add('active');
                    targetPane.style.display = 'block';
                    
                    // Load dynamic content for specific tabs
                    if (tabName === 'education' && window.getPolishedEducationContent) {
                        targetPane.innerHTML = window.getPolishedEducationContent('${subcomponentId}');
                    }
                    if (tabName === 'analysis' && window.displayAnalysisResults) {
                        // Load saved analysis if available
                        const savedAnalysis = localStorage.getItem('analysis_${subcomponentId}');
                        if (savedAnalysis) {
                            window.displayAnalysisResults(JSON.parse(savedAnalysis));
                        }
                    }
                }
            });
        });`;
        
        // Replace existing tab switching code
        if (html.includes('// Tab switching')) {
            html = html.replace(
                /\/\/ Tab switching[\s\S]*?}\);[\s\S]*?}\);/,
                tabSwitchFix
            );
        }
        
        // Save the updated file
        if (html.length !== originalLength) {
            fs.writeFileSync(filePath, html);
            console.log(`✅ Updated ${filePath} (${subcomponentId})`);
            return true;
        } else {
            console.log(`⏭️ No changes needed for ${filePath}`);
            return false;
        }
        
    } catch (error) {
        console.error(`❌ Error updating ${filePath}:`, error.message);
        return false;
    }
}

// Main integration function
function integratePolishedContent() {
    console.log('🚀 Starting ScaleOps6 Polished Content Integration');
    console.log('=' .repeat(60));
    
    let updated = 0;
    let skipped = 0;
    let errors = 0;
    
    // Process all subcomponent files
    const files = fs.readdirSync('.');
    const subcomponentFiles = files.filter(f => f.startsWith('subcomponent-') && f.endsWith('.html'));
    
    console.log(`\nFound ${subcomponentFiles.length} subcomponent files to process\n`);
    
    subcomponentFiles.forEach(file => {
        // Extract the ID from filename (e.g., "1a" from "subcomponent-1a-problem-statement.html")
        const match = file.match(/subcomponent-(\d+[a-f])-/);
        if (match) {
            const letterCode = match[1];
            const numberId = SUBCOMPONENT_MAPPING[letterCode];
            
            if (numberId) {
                console.log(`Processing ${file} (${letterCode} -> ${numberId})`);
                const result = updateSubcomponentFile(file, numberId);
                
                if (result === true) updated++;
                else if (result === false) skipped++;
                else errors++;
            } else {
                console.warn(`⚠️ No mapping found for ${letterCode}`);
                errors++;
            }
        }
    });
    
    // Summary
    console.log('\n' + '=' .repeat(60));
    console.log('📊 INTEGRATION SUMMARY');
    console.log('=' .repeat(60));
    console.log(`✅ Updated: ${updated} files`);
    console.log(`⏭️ Skipped: ${skipped} files`);
    console.log(`❌ Errors: ${errors} files`);
    console.log(`📁 Total: ${subcomponentFiles.length} files`);
    
    if (updated > 0) {
        console.log('\n✨ Polished content successfully integrated!');
        console.log('🔄 Refresh your browser to see the changes.');
    }
    
    // Create verification report
    const report = {
        timestamp: new Date().toISOString(),
        filesProcessed: subcomponentFiles.length,
        updated,
        skipped,
        errors,
        files: subcomponentFiles.map(f => {
            const match = f.match(/subcomponent-(\d+[a-f])-/);
            return {
                file: f,
                letterCode: match ? match[1] : 'unknown',
                numberId: match ? SUBCOMPONENT_MAPPING[match[1]] : 'unknown'
            };
        })
    };
    
    fs.writeFileSync('integration-report.json', JSON.stringify(report, null, 2));
    console.log('\n📄 Integration report saved to: integration-report.json');
}

// Run the integration
integratePolishedContent();
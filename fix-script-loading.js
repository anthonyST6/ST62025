/**
 * Fix script loading issues in all block files
 */

const fs = require('fs');
const path = require('path');

function fixBlockFile(blockNum, subcomponent) {
    const fileName = `block-${blockNum}-${subcomponent}.html`;
    const filePath = path.join(__dirname, fileName);
    
    console.log(`Fixing script loading in ${fileName}...`);
    
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Remove duplicate script tags
        const scriptSection = `
    <!-- Core JavaScript Libraries -->
    <script>
        // Ensure agent library is loaded first
        window.agentLibrary = window.agentLibrary || {};
    </script>
    
    <!-- Agent System Scripts -->
    <script src="agent-library.js"></script>
    <script src="enhanced-agent-class.js"></script>
    <script src="unified-analysis-handler-enhanced.js"></script>
    <script src="dimension-display-handler.js"></script>
    <script src="agent-persistence-manager.js"></script>
    <script src="enhanced-education-display.js"></script>
    <script src="enhanced-resources-output.js"></script>`;
        
        // Remove all existing script tags for these files
        content = content.replace(/<script src="agent-library\.js"><\/script>/g, '');
        content = content.replace(/<script src="enhanced-agent-class\.js"><\/script>/g, '');
        content = content.replace(/<script src="unified-analysis-handler-enhanced\.js"><\/script>/g, '');
        content = content.replace(/<script src="dimension-display-handler\.js"><\/script>/g, '');
        content = content.replace(/<script src="agent-persistence-manager\.js"><\/script>/g, '');
        content = content.replace(/<script src="enhanced-education-display\.js"><\/script>/g, '');
        content = content.replace(/<script src="enhanced-resources-output\.js"><\/script>/g, '');
        content = content.replace(/<script src="module-\d+-\d+\.js"><\/script>/g, '');
        
        // Remove duplicate sections
        content = content.replace(/<!-- Agent Integration Scripts -->[\s\S]*?<script src="enhanced-resources-output\.js"><\/script>/g, '');
        content = content.replace(/<!-- Enhanced Agent System Scripts -->[\s\S]*?<script src="agent-persistence-manager\.js"><\/script>/g, '');
        
        // Add scripts before closing body tag
        const bodyCloseIndex = content.lastIndexOf('</body>');
        if (bodyCloseIndex > -1) {
            content = content.slice(0, bodyCloseIndex) + scriptSection + '\n' + content.slice(bodyCloseIndex);
        }
        
        // Fix the loadEducationContent function
        if (!content.includes('function loadEducationContent()')) {
            const loadEducationFunction = `
        // Load education content
        function loadEducationContent() {
            const educationContent = document.getElementById('education-content');
            if (educationContent) {
                educationContent.innerHTML = \`
                    <div class="education-section">
                        <h3>Agent: \${moduleConfig.agentId || 'Loading...'}</h3>
                        <p>This module uses dimension-based evaluation to provide intelligent analysis.</p>
                        <div class="principle-card">
                            <div class="principle-header">
                                <span class="principle-number">1</span>
                                <h4>Core Functionality</h4>
                            </div>
                            <p>The enhanced agent system provides specialized guidance through:</p>
                            <ul>
                                <li>Dynamic education content</li>
                                <li>Dimension-based worksheets</li>
                                <li>Intelligent analysis</li>
                                <li>Comprehensive feedback</li>
                                <li>Data persistence</li>
                            </ul>
                        </div>
                    </div>
                \`;
            }
        }`;
            
            // Add before the DOMContentLoaded event
            const domContentIndex = content.indexOf('document.addEventListener(\'DOMContentLoaded\'');
            if (domContentIndex > -1) {
                content = content.slice(0, domContentIndex) + loadEducationFunction + '\n\n        ' + content.slice(domContentIndex);
            }
        }
        
        // Fix the loadResources function
        if (!content.includes('function loadResources()')) {
            const loadResourcesFunction = `
        // Load resources
        function loadResources() {
            const resourcesContent = document.getElementById('resources-content');
            if (resourcesContent) {
                resourcesContent.innerHTML = \`
                    <div class="resource-card">
                        <h4>Templates & Resources</h4>
                        <p>Agent-specific resources for \${moduleConfig.subcomponentTitle || 'this module'}</p>
                        <ul>
                            <li>📄 Worksheet Template</li>
                            <li>📊 Analysis Framework</li>
                            <li>📈 Best Practices Guide</li>
                            <li>🎯 Success Metrics</li>
                        </ul>
                    </div>
                \`;
            }
        }`;
            
            // Add after loadEducationContent
            const educationFuncIndex = content.indexOf('function loadEducationContent()');
            if (educationFuncIndex > -1) {
                const nextFuncIndex = content.indexOf('\n        function', educationFuncIndex + 1);
                if (nextFuncIndex > -1) {
                    content = content.slice(0, nextFuncIndex) + '\n' + loadResourcesFunction + '\n' + content.slice(nextFuncIndex);
                }
            }
        }
        
        // Fix the loadScoreHistory function
        if (!content.includes('function loadScoreHistory()')) {
            const loadScoreHistoryFunction = `
        // Load score history
        function loadScoreHistory() {
            const scoreHistoryContent = document.getElementById('score-history-content');
            if (scoreHistoryContent) {
                const history = JSON.parse(localStorage.getItem('score_history_' + moduleConfig.moduleId) || '[]');
                if (history.length > 0) {
                    scoreHistoryContent.innerHTML = history.map(item => \`
                        <div class="history-item">
                            <div>Score: \${item.score}%</div>
                            <div>Date: \${new Date(item.timestamp).toLocaleDateString()}</div>
                            <div>Agent: \${item.agentId}</div>
                        </div>
                    \`).join('');
                } else {
                    scoreHistoryContent.innerHTML = '<p>No score history yet. Complete a worksheet to see your progress.</p>';
                }
            }
        }`;
            
            // Add after loadResources
            const resourcesFuncIndex = content.indexOf('function loadResources()');
            if (resourcesFuncIndex > -1) {
                const nextFuncIndex = content.indexOf('\n        function', resourcesFuncIndex + 1);
                if (nextFuncIndex > -1) {
                    content = content.slice(0, nextFuncIndex) + '\n' + loadScoreHistoryFunction + '\n' + content.slice(nextFuncIndex);
                }
            }
        }
        
        // Write the fixed content
        fs.writeFileSync(filePath, content);
        return true;
        
    } catch (error) {
        console.error(`Error fixing ${fileName}:`, error.message);
        return false;
    }
}

// Main execution
console.log('🔧 Fixing Script Loading Issues');
console.log('=====================================\n');

let successCount = 0;
let failCount = 0;

for (let block = 1; block <= 16; block++) {
    console.log(`\n📦 Processing Block ${block}:`);
    
    for (let sub = 1; sub <= 6; sub++) {
        if (fixBlockFile(block, sub)) {
            successCount++;
        } else {
            failCount++;
        }
    }
}

console.log('\n=====================================');
console.log('📊 Fix Summary:');
console.log(`✅ Successfully fixed: ${successCount} files`);
console.log(`❌ Failed: ${failCount} files`);
console.log('=====================================\n');

if (failCount === 0) {
    console.log('✨ All script loading issues have been fixed!');
} else {
    console.log('⚠️  Some files could not be fixed. Please review errors above.');
}
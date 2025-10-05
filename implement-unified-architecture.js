
/**
 * Implementation Script for Unified Architecture
 * This script updates all 96 block HTML files to use the enhanced dimension-based system
 * Completely replaces generic field system with agent-specific dimensions
 */

const fs = require('fs').promises;
const path = require('path');

// Configuration
const TOTAL_BLOCKS = 16;
const SUBCOMPONENTS_PER_BLOCK = 6;
const DRY_RUN = false; // Set to true to preview changes without writing

// Script references to add to each HTML file
const ENHANCED_SCRIPTS = `
    <!-- Enhanced Agent System Scripts -->
    <script src="agent-library.js"></script>
    <script src="enhanced-agent-class.js"></script>
    <script src="unified-analysis-handler-enhanced.js"></script>
    <script src="dimension-display-handler.js"></script>
    <script src="agent-persistence-manager.js"></script>
`;

// CSS for dimension-based display
const DIMENSION_STYLES = `
    <style>
        /* Dimension-Based Styles */
        .dimension-worksheet {
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .dimension-field-container {
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 85, 0, 0.2);
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 24px;
            transition: all 0.3s ease;
        }
        
        .dimension-field-container:hover {
            border-color: rgba(255, 85, 0, 0.4);
            background: rgba(0, 0, 0, 0.4);
        }
        
        .dimension-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 16px;
        }
        
        .dimension-label {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 18px;
            font-weight: 600;
            color: #FF5500;
        }
        
        .dimension-number {
            background: #FF5500;
            color: #000;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
        }
        
        .dimension-name {
            color: #fff;
        }
        
        .dimension-weight {
            color: #999;
            font-size: 14px;
            font-weight: 400;
        }
        
        .required-indicator {
            background: rgba(255, 85, 0, 0.2);
            color: #FF5500;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
        }
        
        .dimension-question {
            color: #fff;
            font-size: 16px;
            margin-bottom: 12px;
            line-height: 1.6;
        }
        
        .dimension-hint {
            color: #999;
            font-size: 14px;
            margin-bottom: 16px;
            padding: 12px;
            background: rgba(255, 85, 0, 0.05);
            border-left: 3px solid #FF5500;
            border-radius: 4px;
        }
        
        .dimension-input {
            width: 100%;
            min-height: 150px;
            background: rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            color: #fff;
            padding: 16px;
            font-size: 15px;
            line-height: 1.6;
            resize: vertical;
            transition: all 0.3s ease;
        }
        
        .dimension-input:focus {
            outline: none;
            border-color: #FF5500;
            background: rgba(0, 0, 0, 0.7);
            box-shadow: 0 0 0 3px rgba(255, 85, 0, 0.1);
        }
        
        .dimension-helpers {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 12px;
        }
        
        .char-counter {
            font-size: 13px;
            color: #666;
            transition: color 0.3s ease;
        }
        
        .guidance-btn, .example-btn {
            background: transparent;
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #999;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 13px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .guidance-btn:hover, .example-btn:hover {
            border-color: #FF5500;
            color: #FF5500;
            background: rgba(255, 85, 0, 0.05);
        }
        
        .dimension-guidance, .dimension-example {
            margin-top: 16px;
            padding: 16px;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 8px;
            border: 1px solid rgba(255, 85, 0, 0.2);
        }
        
        .example-good {
            padding: 12px;
            background: rgba(76, 175, 80, 0.1);
            border-left: 3px solid #4CAF50;
            border-radius: 4px;
            margin-bottom: 12px;
        }
        
        .example-poor {
            padding: 12px;
            background: rgba(244, 67, 54, 0.1);
            border-left: 3px solid #F44336;
            border-radius: 4px;
        }
        
        /* Enhanced Analysis Display */
        .enhanced-analysis-results {
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .agent-info {
            background: rgba(255, 85, 0, 0.05);
            border: 1px solid rgba(255, 85, 0, 0.2);
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 24px;
        }
        
        .dimension-score-card {
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 16px;
        }
        
        .score-bar-container {
            height: 8px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            overflow: hidden;
            margin: 12px 0;
        }
        
        .score-bar {
            height: 100%;
            transition: width 0.5s ease;
            border-radius: 4px;
        }
        
        .recommendation-card {
            background: rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(255, 85, 0, 0.2);
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 16px;
            transition: all 0.3s ease;
        }
        
        .recommendation-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(255, 85, 0, 0.2);
        }
        
        .rec-priority {
            padding: 4px 12px;
            border-radius: 20px;
            color: #fff;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
        }
        
        /* Education Content Styles */
        .agent-education-content {
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .education-section {
            background: rgba(0, 0, 0, 0.3);
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 24px;
        }
        
        .principle-card {
            background: rgba(255, 85, 0, 0.05);
            border: 1px solid rgba(255, 85, 0, 0.2);
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 16px;
        }
        
        .principle-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 16px;
        }
        
        .principle-number {
            background: #FF5500;
            color: #000;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 14px;
        }
        
        .principle-weight {
            background: rgba(255, 85, 0, 0.2);
            color: #FF5500;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            margin-left: auto;
        }
        
        /* Maturity Level Badge */
        .maturity-badge {
            display: inline-block;
            padding: 8px 16px;
            background: linear-gradient(135deg, #FF5500, #FF8800);
            color: #000;
            border-radius: 20px;
            font-weight: 700;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        /* Pattern Indicators */
        .pattern-item {
            padding: 16px;
            border-radius: 8px;
            margin-bottom: 12px;
        }
        
        .pattern-item.strength_pattern {
            background: rgba(76, 175, 80, 0.1);
            border: 1px solid rgba(76, 175, 80, 0.3);
        }
        
        .pattern-item.weakness_pattern {
            background: rgba(244, 67, 54, 0.1);
            border: 1px solid rgba(244, 67, 54, 0.3);
        }
        
        .pattern-item.imbalance_pattern {
            background: rgba(255, 152, 0, 0.1);
            border: 1px solid rgba(255, 152, 0, 0.3);
        }
    </style>
`;

async function updateBlockFile(blockNum, subcomponentNum) {
    const fileName = `block-${blockNum}-${subcomponentNum}.html`;
    const filePath = path.join(process.cwd(), fileName);
    
    try {
        // Read the current file
        let content = await fs.readFile(filePath, 'utf8');
        
        // Check if already updated
        if (content.includes('enhanced-agent-class.js')) {
            console.log(`✅ ${fileName} already updated`);
            return { file: fileName, status: 'already_updated' };
        }
        
        // Remove old generic field references
        content = removeGenericFieldReferences(content);
        
        // Add enhanced scripts before closing body tag
        content = content.replace('</body>', `${ENHANCED_SCRIPTS}\n</body>`);
        
        // Add dimension styles before closing head tag
        content = content.replace('</head>', `${DIMENSION_STYLES}\n</head>`);
        
        // Update the module configuration
        content = updateModuleConfiguration(content, blockNum, subcomponentNum);
        
        // Update workspace initialization
        content = updateWorkspaceInitialization(content);
        
        // Update analysis function calls
        content = updateAnalysisFunctions(content);
        
        if (!DRY_RUN) {
            await fs.writeFile(filePath, content, 'utf8');
            console.log(`✅ Updated ${fileName}`);
        } else {
            console.log(`🔍 DRY RUN: Would update ${fileName}`);
        }
        
        return { file: fileName, status: 'updated' };
        
    } catch (error) {
        console.error(`❌ Error updating ${fileName}:`, error.message);
        return { file: fileName, status: 'error', error: error.message };
    }
}

function removeGenericFieldReferences(content) {
    // Remove generic field-1 through field-6 references
    content = content.replace(/field-[1-6]/g, (match) => {
        const num = match.split('-')[1];
        return `dimension-${num}`;
    });
    
    // Remove generic field collection loops
    content = content.replace(
        /for \(let i = 1; i <= 6; i\+\+\) \{[\s\S]*?worksheetData\[`field-\$\{i\}`\][\s\S]*?\}/g,
        '// Dimension-based collection handled by enhanced handler'
    );
    
    return content;
}

function updateModuleConfiguration(content, blockNum, subcomponentNum) {
    // Update module configuration to include agent mapping
    const agentMapping = getAgentId(blockNum, subcomponentNum);
    
    const configUpdate = `
        // Enhanced Module Configuration
        const moduleConfig = {
            blockId: ${blockNum},
            subcomponentId: ${subcomponentNum},
            moduleId: '${blockNum}-${subcomponentNum}',
            agentId: '${agentMapping}',
            useDimensionSystem: true,
            title: document.querySelector('.module-title')?.textContent || 'Module ${blockNum}.${subcomponentNum}',
            description: document.querySelector('.module-description')?.textContent || ''
        };`;
    
    // Replace existing moduleConfig or add it
    if (content.includes('const moduleConfig')) {
        content = content.replace(/const moduleConfig = \{[\s\S]*?\};/g, configUpdate);
    } else {
        content = content.replace('<script>', '<script>\n' + configUpdate);
    }
    
    return content;
}

function updateWorkspaceInitialization(content) {
    // Update workspace field loading to use dimension-based system
    content = content.replace(
        /loadWorkspaceFields\(\)/g,
        'loadWorkspaceFields() // Enhanced dimension-based fields'
    );
    
    // Ensure the function uses the enhanced version
    if (content.includes('function loadWorkspaceFields()')) {
        content = content.replace(
            /function loadWorkspaceFields\(\) \{[\s\S]*?\n\}/g,
            `function loadWorkspaceFields() {
                // Use enhanced dimension-based worksheet
                if (window.enhancedUnifiedAnalysisHandler) {
                    window.loadWorkspaceFields();
                }
            }`
        );
    }
    
    return content;
}

function updateAnalysisFunctions(content) {
    // Update analyze worksheet calls
    content = content.replace(
        /window\.analyzeWorksheet\(\)/g,
        'window.analyzeWorksheet() // Enhanced agent-based analysis'
    );
    
    return content;
}

function getAgentId(blockNum, subcomponentNum) {
    // Map block and subcomponent to agent ID
    const letterMap = ['a', 'b', 'c', 'd', 'e', 'f'];
    return `${blockNum}${letterMap[subcomponentNum - 1]}`;
}

async function updateAllBlocks() {
    console.log('🚀 Starting Unified Architecture Implementation');
    console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE UPDATE'}`);
    console.log('=====================================\n');
    
    const results = [];
    
    for (let block = 1; block <= TOTAL_BLOCKS; block++) {
        console.log(`\n📦 Processing Block ${block}:`);
        
        for (let subcomponent = 1; subcomponent <= SUBCOMPONENTS_PER_BLOCK; subcomponent++) {
            const result = await updateBlockFile(block, subcomponent);
            results.push(result);
        }
    }
    
    // Summary
    console.log('\n=====================================');
    console.log('📊 Implementation Summary:');
    
    const updated = results.filter(r => r.status === 'updated').length;
    const alreadyUpdated = results.filter(r => r.status === 'already_updated').length;
    const errors = results.filter(r => r.status === 'error');
    
    console.log(`✅ Updated: ${updated} files`);
    console.log(`✓ Already updated: ${alreadyUpdated} files`);
    console.log(`❌ Errors: ${errors.length} files`);
    
    if (errors.length > 0) {
        console.log('\n⚠️ Files with errors:');
        errors.forEach(e => {
            console.log(`  - ${e.file}: ${e.error}`);
        });
    }
    
    console.log('\n✨ Implementation complete!');
    
    if (DRY_RUN) {
        console.log('\n📝 This was a DRY RUN. Set DRY_RUN = false to apply changes.');
    }
}

// Additional helper functions for complete implementation

async function createDimensionDisplayHandler() {
    const handlerContent = `
/**
 * Dimension Display Handler
 * Manages the display of dimension-based content across all tabs
 */

(function() {
    console.log('📊 Dimension Display Handler loaded');
    
    // Handle dimension-specific display updates
    window.updateDimensionDisplay = function(agentId, dimensionData) {
        console.log('Updating display for agent:', agentId);
        
        // Update workspace tab
        updateWorkspaceDimensions(dimensionData);
        
        // Update analysis tab
        updateAnalysisDimensions(dimensionData);
        
        // Update score history
        updateScoreHistoryDimensions(dimensionData);
    };
    
    function updateWorkspaceDimensions(dimensionData) {
        // Update workspace fields with dimension names
        dimensionData.forEach((dimension, index) => {
            const label = document.querySelector(\`label[for="dimension-\${index + 1}"]\`);
            if (label) {
                label.innerHTML = \`
                    <span class="dimension-number">\${index + 1}</span>
                    <span class="dimension-name">\${dimension.name}</span>
                    <span class="dimension-weight">(\${dimension.weight}% weight)</span>
                \`;
            }
        });
    }
    
    function updateAnalysisDimensions(dimensionData) {
        // Update analysis display with dimension scores
        const analysisContainer = document.getElementById('analysis-content');
        if (analysisContainer && window.lastAnalysis) {
            // Re-render with dimension names
            window.displayEnhancedAnalysisResults(window.lastAnalysis);
        }
    }
    
    function updateScoreHistoryDimensions(dimensionData) {
        // Update score history with dimension breakdowns
        const historyContainer = document.getElementById('score-history-content');
        if (historyContainer) {
            const history = JSON.parse(localStorage.getItem('scoreHistory') || '[]');
            // Filter and display with dimension names
            renderScoreHistory(history, dimensionData);
        }
    }
    
    function renderScoreHistory(history, dimensionData) {
        // Render score history with dimension breakdowns
        const html = history.map(entry => \`
            <div class="history-item">
                <div class="history-header">
                    <span class="history-date">\${new Date(entry.timestamp).toLocaleDateString()}</span>
                    <span class="history-score">\${entry.score}%</span>
                </div>
                <div class="dimension-breakdown">
                    \${entry.dimensionScores ? entry.dimensionScores.map(d => \`
                        <div class="dimension-score-item">
                            <span>\${d.name}</span>
                            <span>\${d.score}%</span>
                        </div>
                    \`).join('') : ''}
                </div>
            </div>
        \`).join('');
        
        const container = document.getElementById('score-history-content');
        if (container) {
            container.innerHTML = html;
        }
    }
    
    console.log('✅ Dimension Display Handler ready');
})();
`;
    
    await fs.writeFile('dimension-display-handler.js', handlerContent, 'utf8');
    console.log('✅ Created dimension-display-handler.js');
}

async function createAgentPersistenceManager() {
    const persistenceContent = `
/**
 * Agent Persistence Manager
 * Handles all data persistence for agent-based analysis
 */

class AgentPersistenceManager {
    constructor() {
        this.storageKey = 'agentAnalyses';
        this.historyKey = 'scoreHistory';
    }
    
    async saveAnalysis(agentId, analysis, userId) {
        const timestamp = new Date().toISOString();
        const analysisId = this.generateId();
        
        const record = {
            id: analysisId,
            agentId: agentId,
            userId: userId || 'default',
            timestamp: timestamp,
            score: analysis.overallScore,
            dimensionScores: analysis.dimensionBreakdown,
            patterns: analysis.patterns,
            recommendations: analysis.recommendations,
            maturityLevel: analysis.maturityLevel
        };
        
        // Save to localStorage
        this.saveToLocalStorage(record);
        
        // Save to history
        this.saveToHistory(record);
        
        // Attempt to save to server
        await this.saveToServer(record);
        
        return record;
    }
    
    saveToLocalStorage(record) {
        const analyses = this.getAnalyses();
        analyses.push(record);
        localStorage.setItem(this.storageKey, JSON.stringify(analyses));
    }
    
    saveToHistory(record) {
        const history = this.getHistory();
        history.push({
            id: record.id,
            agentId: record.agentId,
            score: record.score,
            timestamp: record.timestamp,
            dimensionScores: record.dimensionScores.map(d => ({
                name: d.dimensionName,
                score: d.score,
                weight: d.weight
            }))
        });
        localStorage.setItem(this.historyKey, JSON.stringify(history));
    }
    
    async saveToServer(record) {
        try {
            const response = await fetch('/api/analysis/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(record)
            });
            
            if (!response.ok) {
                console.warn('Failed to save to server, using local storage only');
            }
        } catch (error) {
            console.warn('Server save failed:', error);
        }
    }
    
    getAnalyses() {
        return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    }
    
    getHistory() {
        return JSON.parse(localStorage.getItem(this.historyKey) || '[]');
    }
    
    getAnalysisByAgent(agentId) {
        const analyses = this.getAnalyses();
        return analyses.filter(a => a.agentId === agentId);
    }
    
    getLatestAnalysis(agentId) {
        const agentAnalyses = this.getAnalysisByAgent(agentId);
        return agentAnalyses.sort((a, b) =>
            new Date(b.timestamp) - new Date(a.timestamp)
        )[0];
    }
    
    generateId() {
        return 'analysis_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
}

// Make globally available
window.AgentPersistenceManager = AgentPersistenceManager;
window.agentPersistence = new AgentPersistenceManager();

console.log('✅ Agent Persistence Manager loaded');
`;
    
    await fs.writeFile('agent-persistence-manager.js', persistenceContent, 'utf8');
    console.log('✅ Created agent-persistence-manager.js');
}

// Run the implementation
async function main() {
    try {
        // Create supporting files first
        await createDimensionDisplayHandler();
        await createAgentPersistenceManager();
        
        // Then update all block files
        await updateAllBlocks();
        
    } catch (error) {
        console.error('❌ Implementation failed:', error);
        process.exit(1);
    }
}

// Execute if run directly
if (require.main === module) {
    main();
}

module.exports = {
    updateBlockFile,
    updateAllBlocks,
    createDimensionDisplayHandler,
    createAgentPersistenceManager
};
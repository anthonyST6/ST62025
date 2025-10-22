
// Module-specific script for 12-1
(function() {
    console.log('Loading module 12-1');
    
    // Module-specific configurations
    const moduleSettings = {
        blockId: 12,
        subcomponentId: 1,
        apiEndpoint: '/api/analyze/block-12',
        agentType: 'block12Agent'
    };
    
    // Load education content
    window.loadEducationContent = async function() {
        try {
            const response = await fetch('/api/content/education/12-1');
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
            const template = new UniversalModuleTemplate();
            container.innerHTML = template.generateWorkspaceFields(12, 1);
        }
    };
    
    // Load resources
    window.loadResources = async function() {
        try {
            const response = await fetch('/api/content/resources/12-1');
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
            const response = await fetch('/api/score-history/12-1');
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
        return `
            <div class="education-section">
                <h3>What</h3>
                <p>${content.what || 'Loading...'}</p>
                
                <h3>Why</h3>
                <p>${content.why || 'Loading...'}</p>
                
                <h3>How</h3>
                <p>${content.how || 'Loading...'}</p>
                
                <h3>Examples</h3>
                <ul>
                    ${(content.examples || []).map(ex => `<li>${ex}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    // Format resources
    function formatResources(resources) {
        return (resources || []).map(resource => `
            <div class="resource-card">
                <h3>${resource.title}</h3>
                <p>${resource.description}</p>
                <a href="${resource.link}" target="_blank" class="btn btn-secondary">
                    View Resource →
                </a>
            </div>
        `).join('');
    }
    
    // Format score history
    function formatScoreHistory(history) {
        return (history || []).map(item => `
            <div class="history-item">
                <div class="history-date">${new Date(item.timestamp).toLocaleDateString()}</div>
                <div class="history-score">Score: ${item.score}%</div>
                <div class="history-summary">${item.summary || 'Analysis completed'}</div>
            </div>
        `).join('');
    }
    
    // Override analyze function to use unified handler
    window.analyzeWorksheet = function() {
        // This will be handled by unified-analysis-handler-fixed.js
        console.log('Analyzing worksheet for module 12-1');
        
        // The unified handler will automatically detect the module and route appropriately
        if (typeof window.analyzeWorksheet === 'function') {
            // Call the unified handler
            window.analyzeWorksheet();
        }
    };
    
    console.log('Module 12-1 ready');
})();
        
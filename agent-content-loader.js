
// Agent Content Loader - Connects agents to UI
(function() {
    console.log('Initializing Agent Content Loader');
    
    // Load agent library
    const loadAgentLibrary = () => {
        return new Promise((resolve) => {
            if (window.AgentLibrary) {
                resolve(window.AgentLibrary);
            } else {
                const script = document.createElement('script');
                script.src = 'agent-library.js';
                script.onload = () => resolve(window.AgentLibrary || {});
                document.head.appendChild(script);
            }
        });
    };
    
    // Initialize agent system
    window.initializeAgentSystem = async function() {
        try {
            const agents = await loadAgentLibrary();
            window.AgentLibrary = agents;
            
            console.log('Agent Library loaded with', Object.keys(agents).length, 'agents');
            
            // Trigger education content load
            if (typeof window.loadEducationContent === 'function') {
                window.loadEducationContent();
            }
            
            // Load workspace templates
            if (typeof window.loadWorkspaceFields === 'function') {
                window.loadWorkspaceFields();
            }
            
        } catch (error) {
            console.error('Error initializing agent system:', error);
        }
    };
    
    // Auto-initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.initializeAgentSystem);
    } else {
        window.initializeAgentSystem();
    }
})();

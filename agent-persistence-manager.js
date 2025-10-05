
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

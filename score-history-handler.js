// Score History Handler for ScaleOps6 Platform
// Manages score history tracking, storage, and retrieval

(function() {
    'use strict';
    
    console.log('📊 Score History Handler Initializing...');
    
    // Score History Manager Class
    class ScoreHistoryManager {
        constructor() {
            this.storageKey = 'scaleops6_score_history';
            this.maxHistoryItems = 100;
            this.init();
        }
        
        init() {
            // Initialize storage if not exists
            if (!localStorage.getItem(this.storageKey)) {
                localStorage.setItem(this.storageKey, JSON.stringify([]));
            }
        }
        
        // Save a new score entry
        saveScore(scoreData) {
            try {
                const history = this.getHistory();
                
                // Create score entry
                const entry = {
                    id: this.generateId(),
                    timestamp: new Date().toISOString(),
                    blockId: scoreData.blockId,
                    subcomponentId: scoreData.subcomponentId,
                    agentName: scoreData.agentName,
                    totalScore: scoreData.totalScore,
                    level: scoreData.level,
                    dimensionScores: scoreData.dimensionScores || [],
                    strengths: scoreData.strengths || [],
                    improvements: scoreData.improvements || [],
                    recommendations: scoreData.recommendations || [],
                    metadata: {
                        userAgent: navigator.userAgent,
                        sessionId: this.getSessionId(),
                        version: '1.0.0'
                    }
                };
                
                // Add to history
                history.unshift(entry);
                
                // Limit history size
                if (history.length > this.maxHistoryItems) {
                    history = history.slice(0, this.maxHistoryItems);
                }
                
                // Save to storage
                localStorage.setItem(this.storageKey, JSON.stringify(history));
                
                // Also save to database if available
                this.saveToDatabase(entry);
                
                console.log('✅ Score saved successfully:', entry.id);
                return entry;
                
            } catch (error) {
                console.error('Error saving score:', error);
                return null;
            }
        }
        
        // Get score history
        getHistory(filters = {}) {
            try {
                let history = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
                
                // Apply filters
                if (filters.blockId) {
                    history = history.filter(h => h.blockId === filters.blockId);
                }
                if (filters.subcomponentId) {
                    history = history.filter(h => h.subcomponentId === filters.subcomponentId);
                }
                if (filters.dateFrom) {
                    history = history.filter(h => new Date(h.timestamp) >= new Date(filters.dateFrom));
                }
                if (filters.dateTo) {
                    history = history.filter(h => new Date(h.timestamp) <= new Date(filters.dateTo));
                }
                if (filters.minScore !== undefined) {
                    history = history.filter(h => h.totalScore >= filters.minScore);
                }
                if (filters.maxScore !== undefined) {
                    history = history.filter(h => h.totalScore <= filters.maxScore);
                }
                
                return history;
                
            } catch (error) {
                console.error('Error getting history:', error);
                return [];
            }
        }
        
        // Get score by ID
        getScoreById(id) {
            const history = this.getHistory();
            return history.find(h => h.id === id) || null;
        }
        
        // Get latest score for a subcomponent
        getLatestScore(subcomponentId) {
            const history = this.getHistory({ subcomponentId });
            return history.length > 0 ? history[0] : null;
        }
        
        // Get score statistics
        getStatistics(subcomponentId = null) {
            const history = subcomponentId ? 
                this.getHistory({ subcomponentId }) : 
                this.getHistory();
            
            if (history.length === 0) {
                return null;
            }
            
            const scores = history.map(h => h.totalScore);
            const average = scores.reduce((a, b) => a + b, 0) / scores.length;
            const max = Math.max(...scores);
            const min = Math.min(...scores);
            
            // Calculate trend (last 5 scores)
            const recentScores = scores.slice(0, 5);
            let trend = 'stable';
            if (recentScores.length >= 2) {
                const diff = recentScores[0] - recentScores[recentScores.length - 1];
                if (diff > 5) trend = 'improving';
                else if (diff < -5) trend = 'declining';
            }
            
            return {
                count: history.length,
                average: Math.round(average * 10) / 10,
                max,
                min,
                latest: scores[0],
                trend,
                improvementRate: this.calculateImprovementRate(history)
            };
        }
        
        // Calculate improvement rate
        calculateImprovementRate(history) {
            if (history.length < 2) return 0;
            
            const firstScore = history[history.length - 1].totalScore;
            const lastScore = history[0].totalScore;
            const improvement = lastScore - firstScore;
            
            return Math.round((improvement / firstScore) * 100 * 10) / 10;
        }
        
        // Delete a score entry
        deleteScore(id) {
            try {
                let history = this.getHistory();
                history = history.filter(h => h.id !== id);
                localStorage.setItem(this.storageKey, JSON.stringify(history));
                console.log('✅ Score deleted:', id);
                return true;
            } catch (error) {
                console.error('Error deleting score:', error);
                return false;
            }
        }
        
        // Clear all history
        clearHistory() {
            try {
                localStorage.setItem(this.storageKey, JSON.stringify([]));
                console.log('✅ Score history cleared');
                return true;
            } catch (error) {
                console.error('Error clearing history:', error);
                return false;
            }
        }
        
        // Export history to JSON
        exportHistory() {
            const history = this.getHistory();
            const dataStr = JSON.stringify(history, null, 2);
            const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
            
            const exportFileDefaultName = `score-history-${new Date().toISOString().split('T')[0]}.json`;
            
            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
            
            console.log('✅ History exported');
        }
        
        // Import history from JSON
        importHistory(jsonData) {
            try {
                const importedHistory = JSON.parse(jsonData);
                if (!Array.isArray(importedHistory)) {
                    throw new Error('Invalid history format');
                }
                
                const currentHistory = this.getHistory();
                const mergedHistory = [...importedHistory, ...currentHistory];
                
                // Remove duplicates based on ID
                const uniqueHistory = mergedHistory.filter((item, index, self) =>
                    index === self.findIndex((h) => h.id === item.id)
                );
                
                // Limit size
                const limitedHistory = uniqueHistory.slice(0, this.maxHistoryItems);
                
                localStorage.setItem(this.storageKey, JSON.stringify(limitedHistory));
                console.log('✅ History imported successfully');
                return true;
                
            } catch (error) {
                console.error('Error importing history:', error);
                return false;
            }
        }
        
        // Save to database (API call)
        async saveToDatabase(entry) {
            try {
                const response = await fetch('/api/score-history', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(entry)
                });
                
                if (response.ok) {
                    console.log('✅ Score saved to database');
                }
            } catch (error) {
                console.log('Database save skipped (offline mode)');
            }
        }
        
        // Generate unique ID
        generateId() {
            return 'score_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        }
        
        // Get or create session ID
        getSessionId() {
            let sessionId = sessionStorage.getItem('scaleops6_session_id');
            if (!sessionId) {
                sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                sessionStorage.setItem('scaleops6_session_id', sessionId);
            }
            return sessionId;
        }
        
        // Render score history UI
        renderHistory(containerId) {
            const container = document.getElementById(containerId);
            if (!container) return;
            
            const history = this.getHistory();
            const stats = this.getStatistics();
            
            let html = '';
            
            // Statistics section
            if (stats) {
                html += `
                    <div class="score-statistics" style="background: linear-gradient(135deg, rgba(255, 85, 0, 0.1), rgba(255, 85, 0, 0.02)); padding: 25px; border-radius: 12px; margin-bottom: 30px; border: 2px solid #FF5500;">
                        <h3 style="color: #FF5500; margin-bottom: 20px;">📈 Performance Statistics</h3>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px;">
                            <div>
                                <div style="font-size: 32px; font-weight: bold; color: #fff;">${stats.average}</div>
                                <div style="font-size: 12px; color: #999; text-transform: uppercase;">Average Score</div>
                            </div>
                            <div>
                                <div style="font-size: 32px; font-weight: bold; color: #4CAF50;">${stats.max}</div>
                                <div style="font-size: 12px; color: #999; text-transform: uppercase;">Best Score</div>
                            </div>
                            <div>
                                <div style="font-size: 32px; font-weight: bold; color: ${stats.trend === 'improving' ? '#4CAF50' : stats.trend === 'declining' ? '#F44336' : '#FFC107'};">
                                    ${stats.trend === 'improving' ? '↑' : stats.trend === 'declining' ? '↓' : '→'}
                                </div>
                                <div style="font-size: 12px; color: #999; text-transform: uppercase;">Trend</div>
                            </div>
                            <div>
                                <div style="font-size: 32px; font-weight: bold; color: #fff;">${stats.improvementRate}%</div>
                                <div style="font-size: 12px; color: #999; text-transform: uppercase;">Improvement</div>
                            </div>
                        </div>
                    </div>
                `;
            }
            
            // History items
            html += '<div class="score-history-list">';
            
            if (history.length === 0) {
                html += `
                    <div style="text-align: center; padding: 60px 20px; color: #666;">
                        <div style="font-size: 48px; margin-bottom: 20px;">📊</div>
                        <h3>No Score History Yet</h3>
                        <p>Complete assessments to see your progress here</p>
                    </div>
                `;
            } else {
                history.forEach((item, index) => {
                    const date = new Date(item.timestamp);
                    const scoreColor = item.totalScore >= 76 ? '#4CAF50' : 
                                     item.totalScore >= 51 ? '#FFC107' : 
                                     item.totalScore >= 26 ? '#FF9800' : '#F44336';
                    
                    html += `
                        <div class="history-item" style="background: rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 20px; margin-bottom: 15px; border-left: 4px solid ${scoreColor}; cursor: pointer;" onclick="window.scoreHistoryManager.showScoreDetails('${item.id}')">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <h4 style="color: #fff; margin-bottom: 5px;">
                                        ${item.agentName || `Block ${item.blockId} - Subcomponent ${item.subcomponentId}`}
                                    </h4>
                                    <div style="font-size: 12px; color: #999;">
                                        ${date.toLocaleDateString()} ${date.toLocaleTimeString()}
                                    </div>
                                </div>
                                <div style="text-align: right;">
                                    <div style="font-size: 36px; font-weight: bold; color: ${scoreColor};">
                                        ${Math.round(item.totalScore)}%
                                    </div>
                                    <div style="font-size: 14px; color: #999;">
                                        ${item.level}
                                    </div>
                                </div>
                            </div>
                            
                            ${item.strengths && item.strengths.length > 0 ? `
                                <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                                    <span style="color: #4CAF50; font-size: 12px; font-weight: 600;">STRENGTHS:</span>
                                    <span style="color: #ccc; font-size: 12px; margin-left: 10px;">
                                        ${item.strengths.slice(0, 2).join(', ')}${item.strengths.length > 2 ? '...' : ''}
                                    </span>
                                </div>
                            ` : ''}
                        </div>
                    `;
                });
            }
            
            html += '</div>';
            
            // Action buttons
            html += `
                <div style="display: flex; gap: 15px; margin-top: 30px; justify-content: center;">
                    <button onclick="window.scoreHistoryManager.exportHistory()" style="padding: 12px 24px; background: #FF5500; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">
                        📥 Export History
                    </button>
                    <button onclick="window.scoreHistoryManager.clearHistory(); location.reload();" style="padding: 12px 24px; background: rgba(255, 255, 255, 0.1); color: white; border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 8px; cursor: pointer; font-weight: 600;">
                        🗑️ Clear History
                    </button>
                </div>
            `;
            
            container.innerHTML = html;
        }
        
        // Show detailed score view
        showScoreDetails(id) {
            const score = this.getScoreById(id);
            if (!score) return;
            
            // Create modal or navigate to detail view
            console.log('Score details:', score);
            
            // You can implement a modal or detail view here
            alert(`Score Details:\n\nTotal Score: ${score.totalScore}%\nLevel: ${score.level}\n\nView console for full details.`);
        }
    }
    
    // Initialize global instance
    window.scoreHistoryManager = new ScoreHistoryManager();
    
    // Auto-render on page load if container exists
    document.addEventListener('DOMContentLoaded', function() {
        if (document.getElementById('score-history-content')) {
            window.scoreHistoryManager.renderHistory('score-history-content');
        }
    });
    
    // Listen for score save events
    window.addEventListener('scoreAnalysisComplete', function(event) {
        if (event.detail) {
            window.scoreHistoryManager.saveScore(event.detail);
        }
    });
    
    console.log('✅ Score History Handler Loaded Successfully');
})();
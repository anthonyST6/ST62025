// Score History Popup Component
// This file provides clickable score history entries with detailed analysis popups

class ScoreHistoryPopup {
    constructor() {
        this.currentPopup = null;
        this.initStyles();
    }

    initStyles() {
        if (document.getElementById('score-history-popup-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'score-history-popup-styles';
        styles.textContent = `
            .score-history-entry {
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .score-history-entry:hover {
                transform: translateX(5px);
                box-shadow: 0 4px 20px rgba(255, 85, 0, 0.2);
            }
            
            .score-history-popup-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(5px);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                animation: fadeIn 0.3s ease;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideUp {
                from { 
                    transform: translateY(50px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            .score-history-popup {
                background: #1a1a1a;
                border: 2px solid #FF5500;
                border-radius: 20px;
                max-width: 900px;
                max-height: 90vh;
                overflow-y: auto;
                animation: slideUp 0.3s ease;
                box-shadow: 0 20px 60px rgba(255, 85, 0, 0.3);
            }
            
            .popup-header {
                background: linear-gradient(135deg, rgba(255, 85, 0, 0.2) 0%, rgba(255, 85, 0, 0.05) 100%);
                padding: 30px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                position: sticky;
                top: 0;
                z-index: 10;
            }
            
            .popup-close {
                position: absolute;
                top: 20px;
                right: 20px;
                width: 40px;
                height: 40px;
                background: rgba(255, 255, 255, 0.1);
                border: 2px solid rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 24px;
                color: #fff;
            }
            
            .popup-close:hover {
                background: #FF5500;
                border-color: #FF5500;
                transform: rotate(90deg);
            }
            
            .popup-title {
                font-size: 28px;
                font-weight: 700;
                color: #FF5500;
                margin-bottom: 10px;
            }
            
            .popup-subtitle {
                font-size: 16px;
                color: #999;
            }
            
            .popup-content {
                padding: 30px;
            }
            
            .popup-section {
                background: rgba(255, 255, 255, 0.02);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 15px;
                padding: 25px;
                margin-bottom: 25px;
            }
            
            .popup-section-title {
                font-size: 20px;
                font-weight: 600;
                color: #FF5500;
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .score-comparison {
                display: grid;
                grid-template-columns: 1fr auto 1fr;
                gap: 30px;
                align-items: center;
                padding: 20px;
                background: rgba(0, 0, 0, 0.3);
                border-radius: 12px;
            }
            
            .score-box {
                text-align: center;
            }
            
            .score-label {
                font-size: 14px;
                color: #999;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 10px;
            }
            
            .score-value {
                font-size: 48px;
                font-weight: 800;
            }
            
            .score-arrow {
                font-size: 32px;
                color: #FF5500;
            }
            
            .dimension-grid {
                display: grid;
                gap: 15px;
            }
            
            .dimension-item {
                display: grid;
                grid-template-columns: 200px 1fr auto;
                gap: 20px;
                align-items: center;
                padding: 15px;
                background: rgba(0, 0, 0, 0.3);
                border-radius: 10px;
            }
            
            .dimension-name {
                font-weight: 600;
                color: #fff;
            }
            
            .dimension-bar {
                height: 8px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 4px;
                overflow: hidden;
                position: relative;
            }
            
            .dimension-fill {
                height: 100%;
                border-radius: 4px;
                transition: width 0.5s ease;
            }
            
            .dimension-score {
                font-weight: 600;
                font-size: 18px;
            }
            
            .insights-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
            }
            
            .insight-card {
                background: rgba(0, 0, 0, 0.3);
                border-radius: 12px;
                padding: 20px;
                border-left: 4px solid #FF5500;
            }
            
            .insight-title {
                font-size: 14px;
                font-weight: 600;
                color: #FF5500;
                margin-bottom: 10px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .insight-value {
                font-size: 24px;
                font-weight: 700;
                color: #fff;
                margin-bottom: 5px;
            }
            
            .insight-description {
                font-size: 13px;
                color: #999;
                line-height: 1.5;
            }
            
            .action-items {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            
            .action-item {
                display: flex;
                align-items: flex-start;
                gap: 15px;
                padding: 15px;
                background: rgba(255, 85, 0, 0.05);
                border: 1px solid rgba(255, 85, 0, 0.2);
                border-radius: 10px;
            }
            
            .action-icon {
                width: 32px;
                height: 32px;
                background: #FF5500;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                font-size: 16px;
            }
            
            .action-content {
                flex: 1;
            }
            
            .action-title {
                font-weight: 600;
                color: #fff;
                margin-bottom: 5px;
            }
            
            .action-description {
                font-size: 14px;
                color: #ccc;
                line-height: 1.5;
            }
        `;
        document.head.appendChild(styles);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    getScoreColor(score) {
        if (score >= 80) return '#4CAF50';
        if (score >= 60) return '#FF9800';
        return '#F44336';
    }

    createPopup(entryData) {
        // Close any existing popup
        this.closePopup();

        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'score-history-popup-overlay';
        overlay.onclick = (e) => {
            if (e.target === overlay) {
                this.closePopup();
            }
        };

        // Create popup container
        const popup = document.createElement('div');
        popup.className = 'score-history-popup';
        popup.onclick = (e) => e.stopPropagation();

        // Generate popup content
        const previousScore = entryData.previousScore || (entryData.score - (entryData.improvement || 0));
        const currentScore = entryData.score || entryData.newScore || 0;
        const improvement = entryData.improvement || (currentScore - previousScore);
        
        popup.innerHTML = `
            <div class="popup-header">
                <button class="popup-close" onclick="scoreHistoryPopup.closePopup()">×</button>
                <div class="popup-title">Score Analysis Details</div>
                <div class="popup-subtitle">${this.formatDate(entryData.date || entryData.timestamp)}</div>
            </div>
            
            <div class="popup-content">
                <!-- Score Overview -->
                <div class="popup-section">
                    <h3 class="popup-section-title">
                        <span>📊</span>
                        Score Overview
                    </h3>
                    <div class="score-comparison">
                        <div class="score-box">
                            <div class="score-label">Previous Score</div>
                            <div class="score-value" style="color: ${this.getScoreColor(previousScore)}">
                                ${previousScore}%
                            </div>
                        </div>
                        <div class="score-arrow">→</div>
                        <div class="score-box">
                            <div class="score-label">New Score</div>
                            <div class="score-value" style="color: ${this.getScoreColor(currentScore)}">
                                ${currentScore}%
                            </div>
                        </div>
                    </div>
                    ${improvement !== 0 ? `
                    <div style="text-align: center; margin-top: 20px;">
                        <span style="font-size: 24px; font-weight: 700; color: ${improvement > 0 ? '#4CAF50' : '#F44336'};">
                            ${improvement > 0 ? '+' : ''}${improvement}% ${improvement > 0 ? 'Improvement' : 'Change'}
                        </span>
                    </div>
                    ` : ''}
                </div>

                <!-- Analysis Details -->
                ${entryData.analysis ? `
                <div class="popup-section">
                    <h3 class="popup-section-title">
                        <span>🔍</span>
                        Analysis Details
                    </h3>
                    <div style="padding: 20px; background: rgba(0, 0, 0, 0.3); border-radius: 10px;">
                        <p style="line-height: 1.8; color: #ccc;">
                            ${entryData.analysis.executiveSummary || entryData.analysis}
                        </p>
                    </div>
                </div>
                ` : ''}

                <!-- Dimension Scores -->
                ${entryData.detailedScores ? `
                <div class="popup-section">
                    <h3 class="popup-section-title">
                        <span>📈</span>
                        Dimension Breakdown
                    </h3>
                    <div class="dimension-grid">
                        ${Object.entries(entryData.detailedScores).map(([key, value]) => {
                            const score = value.score || value;
                            const maxScore = value.maxScore || value.weight || 20;
                            const percentage = (score / maxScore) * 100;
                            const displayName = key.replace(/([A-Z])/g, ' $1').trim()
                                .split(' ')
                                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(' ');
                            
                            return `
                            <div class="dimension-item">
                                <div class="dimension-name">${displayName}</div>
                                <div class="dimension-bar">
                                    <div class="dimension-fill" style="width: ${percentage}%; background: ${this.getScoreColor(percentage)};"></div>
                                </div>
                                <div class="dimension-score" style="color: ${this.getScoreColor(percentage)};">
                                    ${Math.round(percentage)}%
                                </div>
                            </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                ` : ''}

                <!-- Key Insights -->
                <div class="popup-section">
                    <h3 class="popup-section-title">
                        <span>💡</span>
                        Key Insights
                    </h3>
                    <div class="insights-grid">
                        ${entryData.weaknesses && entryData.weaknesses.length > 0 ? `
                        <div class="insight-card">
                            <div class="insight-title">Weaknesses Addressed</div>
                            <div class="insight-value">${entryData.weaknesses.length}</div>
                            <div class="insight-description">
                                ${entryData.weaknesses.slice(0, 2).join(', ')}${entryData.weaknesses.length > 2 ? '...' : ''}
                            </div>
                        </div>
                        ` : ''}
                        
                        ${entryData.actions && entryData.actions.length > 0 ? `
                        <div class="insight-card">
                            <div class="insight-title">Actions Taken</div>
                            <div class="insight-value">${entryData.actions.length}</div>
                            <div class="insight-description">
                                ${entryData.actions.slice(0, 2).join(', ')}${entryData.actions.length > 2 ? '...' : ''}
                            </div>
                        </div>
                        ` : ''}
                        
                        <div class="insight-card">
                            <div class="insight-title">Analysis Type</div>
                            <div class="insight-value">${entryData.source || 'AI Analysis'}</div>
                            <div class="insight-description">
                                ${entryData.eventType === 'baseline' ? 'Initial baseline assessment' :
                                  entryData.eventType === 'dependency' ? 'Dependency-based update' :
                                  'Standard analysis'}
                            </div>
                        </div>
                        
                        ${entryData.confidence ? `
                        <div class="insight-card">
                            <div class="insight-title">Confidence Level</div>
                            <div class="insight-value">${Math.round(entryData.confidence * 100)}%</div>
                            <div class="insight-description">
                                Analysis confidence score
                            </div>
                        </div>
                        ` : ''}
                    </div>
                </div>

                <!-- Recommendations -->
                ${entryData.recommendations && entryData.recommendations.length > 0 ? `
                <div class="popup-section">
                    <h3 class="popup-section-title">
                        <span>🎯</span>
                        Recommendations
                    </h3>
                    <div class="action-items">
                        ${entryData.recommendations.map((rec, index) => `
                        <div class="action-item">
                            <div class="action-icon">${index + 1}</div>
                            <div class="action-content">
                                <div class="action-title">${rec.action || rec.area || 'Improvement Area'}</div>
                                <div class="action-description">
                                    ${rec.specificSteps ? rec.specificSteps.join(' → ') : 
                                      rec.description || 'Focus on this area for improvement'}
                                </div>
                                ${rec.expectedImprovement ? `
                                <div style="margin-top: 8px; font-size: 13px; color: #FF5500;">
                                    Expected Impact: ${rec.expectedImprovement}
                                </div>
                                ` : ''}
                            </div>
                        </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                <!-- Raw Data (for debugging) -->
                ${entryData.worksheetData ? `
                <div class="popup-section">
                    <h3 class="popup-section-title">
                        <span>📝</span>
                        Input Data
                    </h3>
                    <div style="background: rgba(0, 0, 0, 0.3); border-radius: 10px; padding: 20px;">
                        ${Object.entries(entryData.worksheetData).map(([key, value]) => {
                            if (!value) return '';
                            const label = key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                            return `
                            <div style="margin-bottom: 15px;">
                                <div style="font-size: 12px; color: #FF5500; text-transform: uppercase; margin-bottom: 5px;">
                                    ${label}
                                </div>
                                <div style="font-size: 14px; color: #ccc; line-height: 1.5;">
                                    ${value}
                                </div>
                            </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                ` : ''}
            </div>
        `;

        overlay.appendChild(popup);
        document.body.appendChild(overlay);
        this.currentPopup = overlay;

        // Add escape key handler
        this.escapeHandler = (e) => {
            if (e.key === 'Escape') {
                this.closePopup();
            }
        };
        document.addEventListener('keydown', this.escapeHandler);
    }

    closePopup() {
        if (this.currentPopup) {
            this.currentPopup.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                if (this.currentPopup && this.currentPopup.parentNode) {
                    this.currentPopup.parentNode.removeChild(this.currentPopup);
                }
                this.currentPopup = null;
            }, 300);
        }
        
        if (this.escapeHandler) {
            document.removeEventListener('keydown', this.escapeHandler);
            this.escapeHandler = null;
        }
    }

    // Make score history entries clickable
    makeEntriesClickable(entries) {
        entries.forEach((entry, index) => {
            entry.classList.add('score-history-entry');
            entry.style.cursor = 'pointer';
            
            // Store the data on the element
            entry.dataset.historyIndex = index;
            
            entry.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Get the stored data
                const historyData = window.scoreHistoryData && window.scoreHistoryData[index];
                if (historyData) {
                    this.createPopup(historyData);
                } else {
                    // Try to reconstruct data from the DOM
                    const reconstructedData = this.reconstructDataFromDOM(entry);
                    if (reconstructedData) {
                        this.createPopup(reconstructedData);
                    }
                }
            });
        });
    }

    // Reconstruct data from DOM if not available
    reconstructDataFromDOM(element) {
        try {
            // Extract score from the element
            const scoreText = element.querySelector('.stat-value, .score-value, [class*="score"]')?.textContent;
            const score = parseInt(scoreText?.replace('%', '') || '0');
            
            // Extract date
            const dateText = element.querySelector('.change-date, [class*="date"]')?.textContent;
            
            // Extract other information
            const eventText = element.querySelector('.change-title, [class*="event"]')?.textContent;
            const improvementElement = element.querySelector('.improvement-badge, [class*="improvement"]');
            const improvementText = improvementElement?.textContent || '';
            const improvementMatch = improvementText.match(/([+-]?\d+)%/);
            const improvement = improvementMatch ? parseInt(improvementMatch[1]) : 0;
            
            return {
                score: score,
                date: dateText || new Date().toISOString(),
                event: eventText || 'Score Update',
                improvement: improvement,
                previousScore: score - improvement,
                newScore: score,
                source: 'Historical Data'
            };
        } catch (error) {
            console.error('Error reconstructing data:', error);
            return null;
        }
    }
}

// Initialize the popup handler
const scoreHistoryPopup = new ScoreHistoryPopup();

// Export for use in other files
window.ScoreHistoryPopup = ScoreHistoryPopup;
window.scoreHistoryPopup = scoreHistoryPopup;
// Advanced Score Analysis Engine for Deep Insights
// This engine provides comprehensive analysis of score movements with specific, actionable insights

class ScoreAnalysisEngine {
    constructor() {
        this.initStyles();
    }

    initStyles() {
        if (document.getElementById('score-analysis-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'score-analysis-styles';
        styles.textContent = `
            .analysis-popup-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.95);
                backdrop-filter: blur(20px);
                z-index: 10000;
                display: flex;
                align-items: flex-start;
                justify-content: center;
                padding: 40px 20px;
                overflow-y: auto;
                animation: fadeIn 0.3s ease;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            .analysis-popup {
                background: #0a0a0a;
                border: 2px solid #FF5500;
                border-radius: 20px;
                max-width: 1400px;
                width: 100%;
                animation: slideUp 0.3s ease;
                box-shadow: 0 30px 90px rgba(255, 85, 0, 0.4);
                margin: auto;
            }
            
            @keyframes slideUp {
                from { 
                    transform: translateY(100px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            .analysis-header {
                background: rgba(255, 85, 0, 0.05);
                border-bottom: 2px solid rgba(255, 85, 0, 0.3);
                padding: 40px;
                border-radius: 18px 18px 0 0;
                position: relative;
            }
            
            .analysis-close {
                position: absolute;
                top: 20px;
                right: 20px;
                width: 50px;
                height: 50px;
                background: rgba(0, 0, 0, 0.3);
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 28px;
                color: #fff;
            }
            
            .analysis-close:hover {
                background: rgba(0, 0, 0, 0.5);
                transform: rotate(90deg);
            }
            
            .analysis-title {
                font-size: 36px;
                font-weight: 800;
                color: #FF5500;
                margin-bottom: 10px;
            }
            
            .analysis-subtitle {
                font-size: 18px;
                color: #999;
                font-weight: 500;
            }
            
            .analysis-body {
                padding: 40px;
                background: #0a0a0a;
                border-radius: 0 0 18px 18px;
            }
            
            .score-movement-hero {
                background: linear-gradient(135deg, rgba(255, 85, 0, 0.1) 0%, rgba(0, 0, 0, 0.5) 100%);
                border: 2px solid rgba(255, 85, 0, 0.3);
                border-radius: 20px;
                padding: 40px;
                margin-bottom: 40px;
                text-align: center;
            }
            
            .score-comparison {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 40px;
                margin-bottom: 30px;
            }
            
            .score-block {
                text-align: center;
            }
            
            .score-label {
                font-size: 14px;
                color: #999;
                text-transform: uppercase;
                letter-spacing: 2px;
                margin-bottom: 10px;
            }
            
            .score-value {
                font-size: 72px;
                font-weight: 900;
                line-height: 1;
            }
            
            .score-arrow {
                font-size: 48px;
                color: #FF5500;
                animation: pulse 2s infinite;
            }
            
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            
            .movement-summary {
                font-size: 24px;
                font-weight: 600;
                margin-bottom: 20px;
            }
            
            .executive-insight {
                background: rgba(255, 85, 0, 0.05);
                border-left: 4px solid #FF5500;
                padding: 20px;
                margin: 20px 0;
                border-radius: 8px;
            }
            
            .executive-insight h3 {
                color: #FF5500;
                margin-bottom: 10px;
                font-size: 18px;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .executive-insight p {
                color: #ccc;
                line-height: 1.8;
                font-size: 16px;
            }
            
            .analysis-section {
                margin-bottom: 40px;
            }
            
            .section-header {
                display: flex;
                align-items: center;
                gap: 15px;
                margin-bottom: 25px;
                padding-bottom: 15px;
                border-bottom: 2px solid rgba(255, 85, 0, 0.2);
            }
            
            .section-icon {
                width: 50px;
                height: 50px;
                background: rgba(255, 85, 0, 0.1);
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
            }
            
            .section-title {
                font-size: 28px;
                font-weight: 700;
                color: #FF5500;
            }
            
            .dimension-grid {
                display: grid;
                gap: 25px;
            }
            
            .dimension-card {
                background: rgba(255, 255, 255, 0.02);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 16px;
                padding: 30px;
                transition: all 0.3s ease;
            }
            
            .dimension-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 40px rgba(255, 85, 0, 0.1);
                border-color: rgba(255, 85, 0, 0.3);
            }
            
            .dimension-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 20px;
            }
            
            .dimension-info {
                flex: 1;
            }
            
            .dimension-name {
                font-size: 22px;
                font-weight: 700;
                color: #fff;
                margin-bottom: 8px;
            }
            
            .dimension-context {
                font-size: 14px;
                color: #999;
                line-height: 1.5;
            }
            
            .dimension-scores {
                display: flex;
                align-items: center;
                gap: 20px;
            }
            
            .dimension-score-block {
                text-align: center;
            }
            
            .dimension-score-label {
                font-size: 11px;
                color: #666;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .dimension-score-value {
                font-size: 28px;
                font-weight: 800;
                margin-top: 5px;
            }
            
            .dimension-change {
                font-size: 32px;
                font-weight: 900;
                padding: 10px 20px;
                border-radius: 12px;
                background: rgba(0, 0, 0, 0.5);
            }
            
            .change-positive {
                color: #4CAF50;
                background: rgba(76, 175, 80, 0.1);
                border: 1px solid rgba(76, 175, 80, 0.3);
            }
            
            .change-negative {
                color: #F44336;
                background: rgba(244, 67, 54, 0.1);
                border: 1px solid rgba(244, 67, 54, 0.3);
            }
            
            .change-neutral {
                color: #FF9800;
                background: rgba(255, 152, 0, 0.1);
                border: 1px solid rgba(255, 152, 0, 0.3);
            }
            
            .dimension-analysis {
                background: rgba(0, 0, 0, 0.5);
                border-radius: 12px;
                padding: 20px;
                margin-top: 20px;
            }
            
            .analysis-point {
                display: flex;
                align-items: flex-start;
                gap: 15px;
                margin-bottom: 15px;
                padding-bottom: 15px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            }
            
            .analysis-point:last-child {
                border-bottom: none;
                margin-bottom: 0;
                padding-bottom: 0;
            }
            
            .analysis-icon {
                width: 32px;
                height: 32px;
                background: rgba(255, 85, 0, 0.1);
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                font-size: 16px;
            }
            
            .analysis-content {
                flex: 1;
            }
            
            .analysis-title {
                font-size: 16px;
                font-weight: 600;
                color: #FF5500;
                margin-bottom: 5px;
            }
            
            .analysis-detail {
                font-size: 14px;
                color: #ccc;
                line-height: 1.6;
            }
            
            .evidence-box {
                background: rgba(76, 175, 80, 0.05);
                border: 1px solid rgba(76, 175, 80, 0.2);
                border-radius: 8px;
                padding: 15px;
                margin-top: 10px;
            }
            
            .evidence-label {
                font-size: 12px;
                color: #4CAF50;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 8px;
            }
            
            .evidence-text {
                font-size: 14px;
                color: #ccc;
                font-style: italic;
            }
            
            .root-causes-section {
                background: linear-gradient(135deg, rgba(156, 39, 176, 0.05) 0%, rgba(0, 0, 0, 0.3) 100%);
                border: 2px solid rgba(156, 39, 176, 0.2);
                border-radius: 16px;
                padding: 30px;
                margin: 40px 0;
            }
            
            .root-cause-item {
                background: rgba(0, 0, 0, 0.5);
                border-radius: 12px;
                padding: 25px;
                margin-bottom: 20px;
                border-left: 4px solid #9C27B0;
            }
            
            .root-cause-header {
                display: flex;
                align-items: center;
                gap: 15px;
                margin-bottom: 15px;
            }
            
            .root-cause-number {
                width: 40px;
                height: 40px;
                background: #9C27B0;
                color: #fff;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 800;
                font-size: 18px;
            }
            
            .root-cause-title {
                font-size: 20px;
                font-weight: 700;
                color: #fff;
            }
            
            .root-cause-explanation {
                color: #ccc;
                line-height: 1.8;
                margin-bottom: 15px;
            }
            
            .root-cause-data {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
                margin-top: 15px;
            }
            
            .data-point {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 8px;
                padding: 15px;
                text-align: center;
            }
            
            .data-label {
                font-size: 12px;
                color: #999;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 5px;
            }
            
            .data-value {
                font-size: 24px;
                font-weight: 800;
                color: #FF5500;
            }
            
            .recommendations-grid {
                display: grid;
                gap: 20px;
            }
            
            .recommendation-card {
                background: linear-gradient(135deg, rgba(33, 150, 243, 0.05) 0%, rgba(0, 0, 0, 0.3) 100%);
                border: 1px solid rgba(33, 150, 243, 0.2);
                border-radius: 12px;
                padding: 25px;
                position: relative;
                overflow: hidden;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .recommendation-card:hover {
                transform: translateY(-3px);
                box-shadow: 0 15px 40px rgba(33, 150, 243, 0.2);
                border-color: rgba(33, 150, 243, 0.4);
                background: linear-gradient(135deg, rgba(33, 150, 243, 0.08) 0%, rgba(0, 0, 0, 0.4) 100%);
            }
            
            .recommendation-priority {
                position: absolute;
                top: 15px;
                right: 15px;
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .priority-critical {
                background: #8B0000;
                color: #fff;
            }
            
            .priority-high {
                background: #F44336;
                color: #fff;
            }
            
            .priority-medium {
                background: #FF9800;
                color: #fff;
            }
            
            .recommendation-title {
                font-size: 20px;
                font-weight: 700;
                color: #2196F3;
                margin-bottom: 10px;
                padding-right: 100px;
            }
            
            .recommendation-impact {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 15px;
            }
            
            .impact-label {
                font-size: 14px;
                color: #999;
            }
            
            .impact-value {
                font-size: 18px;
                font-weight: 700;
                color: #4CAF50;
            }
            
            .recommendation-steps {
                background: rgba(0, 0, 0, 0.3);
                border-radius: 8px;
                padding: 15px;
                margin-top: 15px;
            }
            
            .step-item {
                display: flex;
                align-items: flex-start;
                gap: 10px;
                margin-bottom: 10px;
            }
            
            .step-number {
                width: 24px;
                height: 24px;
                background: rgba(33, 150, 243, 0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: 700;
                color: #2196F3;
                flex-shrink: 0;
            }
            
            .step-text {
                font-size: 14px;
                color: #ccc;
                line-height: 1.5;
            }
            
            /* Recommendation Detail Popup Styles */
            .recommendation-detail-popup {
                background: #0a0a0a;
                border: 2px solid #2196F3;
                border-radius: 20px;
                max-width: 1200px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                animation: slideUp 0.3s ease;
                box-shadow: 0 30px 90px rgba(33, 150, 243, 0.4);
            }
            
            .recommendation-detail-header {
                background: linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(0, 0, 0, 0.5) 100%);
                border-bottom: 2px solid rgba(33, 150, 243, 0.3);
                padding: 40px;
                border-radius: 18px 18px 0 0;
                position: sticky;
                top: 0;
                z-index: 10;
            }
            
            .recommendation-detail-body {
                padding: 40px;
            }
            
            .implementation-phase {
                background: rgba(255, 255, 255, 0.02);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                padding: 25px;
                margin-bottom: 20px;
            }
            
            .implementation-phase-header {
                display: flex;
                align-items: center;
                gap: 15px;
                margin-bottom: 20px;
                padding-bottom: 15px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .phase-number {
                width: 40px;
                height: 40px;
                background: #2196F3;
                color: #fff;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 800;
                font-size: 18px;
            }
            
            .phase-title {
                font-size: 20px;
                font-weight: 700;
                color: #fff;
            }
            
            .task-list {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            
            .task-item {
                display: flex;
                align-items: flex-start;
                gap: 12px;
                margin-bottom: 12px;
                padding: 12px;
                background: rgba(0, 0, 0, 0.3);
                border-radius: 8px;
                transition: all 0.2s ease;
            }
            
            .task-item:hover {
                background: rgba(33, 150, 243, 0.05);
                transform: translateX(5px);
            }
            
            .task-checkbox {
                width: 20px;
                height: 20px;
                border: 2px solid #2196F3;
                border-radius: 4px;
                flex-shrink: 0;
                margin-top: 2px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
            }
            
            .task-checkbox.checked {
                background: #2196F3;
            }
            
            .task-checkbox.checked::after {
                content: '✓';
                color: #fff;
                font-weight: bold;
            }
            
            .task-text {
                flex: 1;
                color: #ccc;
                line-height: 1.5;
            }
            
            .metric-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
                margin-top: 20px;
            }
            
            .metric-card {
                background: rgba(76, 175, 80, 0.05);
                border: 1px solid rgba(76, 175, 80, 0.2);
                border-radius: 12px;
                padding: 20px;
                text-align: center;
            }
            
            .metric-icon {
                font-size: 32px;
                margin-bottom: 10px;
            }
            
            .metric-label {
                font-size: 12px;
                color: #999;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 8px;
            }
            
            .metric-value {
                font-size: 20px;
                font-weight: 700;
                color: #4CAF50;
            }
            
            .resource-list {
                background: rgba(255, 152, 0, 0.05);
                border: 1px solid rgba(255, 152, 0, 0.2);
                border-radius: 12px;
                padding: 20px;
                margin: 20px 0;
            }
            
            .resource-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            }
            
            .resource-item:last-child {
                border-bottom: none;
            }
            
            .resource-name {
                color: #fff;
                font-weight: 500;
            }
            
            .resource-amount {
                color: #FF9800;
                font-weight: 700;
            }
            
            .risk-list {
                background: rgba(244, 67, 54, 0.05);
                border: 1px solid rgba(244, 67, 54, 0.2);
                border-radius: 12px;
                padding: 20px;
                margin: 20px 0;
            }
            
            .risk-item {
                display: flex;
                align-items: flex-start;
                gap: 12px;
                margin-bottom: 15px;
            }
            
            .risk-icon {
                color: #F44336;
                font-size: 20px;
                flex-shrink: 0;
            }
            
            .risk-text {
                color: #ccc;
                line-height: 1.5;
            }
            
            .roi-highlight {
                background: linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%);
                border: 2px solid rgba(76, 175, 80, 0.3);
                border-radius: 12px;
                padding: 25px;
                margin: 30px 0;
                text-align: center;
            }
            
            .roi-title {
                font-size: 18px;
                color: #4CAF50;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 15px;
            }
            
            .roi-value {
                font-size: 24px;
                font-weight: 700;
                color: #fff;
                line-height: 1.5;
            }
            
            .timeline-section {
                background: rgba(255, 255, 255, 0.02);
                border-radius: 16px;
                padding: 30px;
                margin: 40px 0;
            }
            
            .timeline-graph {
                height: 200px;
                position: relative;
                margin: 30px 0;
                border-left: 2px solid rgba(255, 255, 255, 0.2);
                border-bottom: 2px solid rgba(255, 255, 255, 0.2);
                padding: 20px;
            }
            
            .action-buttons {
                display: flex;
                gap: 15px;
                margin-top: 40px;
                padding-top: 30px;
                border-top: 2px solid rgba(255, 255, 255, 0.1);
            }
            
            .btn-action {
                padding: 15px 30px;
                border-radius: 30px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                border: none;
            }
            
            .btn-primary {
                background: #FF5500;
                color: #fff;
            }
            
            .btn-primary:hover {
                background: #FF6600;
                transform: translateY(-2px);
                box-shadow: 0 10px 30px rgba(255, 85, 0, 0.3);
            }
            
            .btn-secondary {
                background: transparent;
                color: #FF5500;
                border: 2px solid #FF5500;
            }
            
            .btn-secondary:hover {
                background: rgba(255, 85, 0, 0.1);
            }
        `;
        document.head.appendChild(styles);
    }

    // Generate deep insights based on score movement
    generateDeepInsights(currentEntry, previousEntry, allEntries) {
        const insights = {
            executiveSummary: '',
            rootCauses: [],
            dimensionAnalysis: [],
            recommendations: [],
            timeline: [],
            dataPoints: {}
        };

        // Calculate key metrics
        const currentScore = currentEntry.score || currentEntry.newScore || 0;
        const previousScore = previousEntry?.score || previousEntry?.newScore || 
                            currentEntry.previousScore || (currentScore - (currentEntry.improvement || 0));
        const improvement = currentScore - previousScore;
        const improvementRate = previousScore > 0 ? ((improvement / previousScore) * 100).toFixed(1) : 0;

        // Generate executive summary with specific insights
        insights.executiveSummary = this.generateExecutiveSummary(currentEntry, previousEntry, improvement, improvementRate);

        // Analyze root causes with specific data
        insights.rootCauses = this.analyzeRootCauses(currentEntry, previousEntry, improvement);

        // Deep dimension analysis
        insights.dimensionAnalysis = this.analyzeDimensions(currentEntry, previousEntry);

        // Generate specific recommendations
        insights.recommendations = this.generateRecommendations(currentEntry, insights.dimensionAnalysis);

        // Build timeline of changes
        insights.timeline = this.buildTimeline(allEntries, currentEntry);

        // Extract key data points
        insights.dataPoints = this.extractDataPoints(currentEntry, previousEntry, allEntries);

        return insights;
    }

    generateExecutiveSummary(current, previous, improvement, rate) {
        let summary = '';
        
        if (improvement > 10) {
            summary = `<strong>Exceptional progress achieved with a ${improvement}% score increase (${rate}% improvement rate).</strong> `;
            summary += this.getImprovementReason(current, previous, improvement);
        } else if (improvement > 5) {
            summary = `<strong>Solid advancement with a ${improvement}% score increase.</strong> `;
            summary += this.getImprovementReason(current, previous, improvement);
        } else if (improvement > 0) {
            summary = `<strong>Incremental progress of ${improvement}%.</strong> `;
            summary += `While positive, the modest gain suggests that implemented changes had limited impact. `;
        } else if (improvement < 0) {
            summary = `<strong>Score declined by ${Math.abs(improvement)}%.</strong> `;
            summary += this.getDeclineReason(current, previous, improvement);
        } else {
            summary = `<strong>Score remained stable.</strong> No significant changes detected in problem statement quality. `;
        }

        // Add specific context from worksheet data
        if (current.worksheetData) {
            const fields = Object.keys(current.worksheetData).filter(k => current.worksheetData[k] && current.worksheetData[k].length > 10);
            const totalChars = Object.values(current.worksheetData).join('').length;
            if (fields.length > 0) {
                summary += `<br><br><strong>Worksheet Analysis:</strong> ${fields.length}/6 sections completed with ${totalChars.toLocaleString()} total characters of content. `;
                
                // List which fields are complete
                const fieldNames = {
                    'who-affected': 'Target Persona',
                    'what-problem': 'Problem Definition',
                    'when-occur': 'Context & Triggers',
                    'what-impact': 'Impact Metrics',
                    'how-solving': 'Current Solutions',
                    'evidence-validation': 'Evidence & Validation'
                };
                
                const completedFields = fields.map(f => fieldNames[f] || f).join(', ');
                summary += `Completed sections: ${completedFields}. `;
            }
        }

        // Add confidence and validation context
        if (current.confidence) {
            const confidencePercent = Math.round(current.confidence * 100);
            summary += `<br><strong>Analysis confidence:</strong> ${confidencePercent}%. `;
        }

        // Add specific data points
        if (current.detailedScores) {
            const topScores = Object.entries(current.detailedScores)
                .map(([key, value]) => ({
                    name: this.formatDimensionName(key),
                    score: value.score || value
                }))
                .sort((a, b) => b.score - a.score)
                .slice(0, 2);
            
            summary += `<br><strong>Strongest dimensions:</strong> ${topScores.map(s => `${s.name} (${s.score}/20)`).join(', ')}.`;
        }

        return summary;
    }

    getImprovementReason(current, previous, improvement) {
        let reason = '';
        
        // Check what specifically improved
        if (current.detailedScores && previous?.detailedScores) {
            const improvements = [];
            
            Object.keys(current.detailedScores).forEach(key => {
                const curr = current.detailedScores[key];
                const prev = previous.detailedScores[key];
                if (prev) {
                    const currScore = curr.score || curr;
                    const prevScore = prev.score || prev;
                    if (currScore > prevScore) {
                        improvements.push({
                            dimension: this.formatDimensionName(key),
                            increase: currScore - prevScore
                        });
                    }
                }
            });
            
            if (improvements.length > 0) {
                improvements.sort((a, b) => b.increase - a.increase);
                const top = improvements.slice(0, 2);
                reason = `Primary drivers: ${top.map(i => `${i.dimension} (+${i.increase} points)`).join(', ')}. `;
            }
        }
        
        // Check worksheet completion
        if (current.worksheetData && previous?.worksheetData) {
            const currentCompletion = Object.values(current.worksheetData).filter(v => v && v.length > 10).length;
            const previousCompletion = Object.values(previous.worksheetData || {}).filter(v => v && v.length > 10).length;
            
            if (currentCompletion > previousCompletion) {
                reason += `${currentCompletion - previousCompletion} additional worksheet sections completed with substantial content. `;
            }
        }
        
        // Check for specific improvements
        if (current.worksheetData) {
            if (current.worksheetData['what-impact'] && (!previous?.worksheetData || !previous.worksheetData['what-impact'])) {
                reason += `Impact metrics now quantified. `;
            }
            if (current.worksheetData['evidence-validation'] && (!previous?.worksheetData || !previous.worksheetData['evidence-validation'])) {
                reason += `Customer validation evidence added. `;
            }
        }
        
        return reason || `Multiple dimensions showed improvement through enhanced detail and specificity. `;
    }

    getDeclineReason(current, previous, decline) {
        let reason = '';
        
        if (current.eventType === 'dependency') {
            reason = `Score impacted by changes in related components. ${current.dependencyNote || ''} `;
        } else {
            reason = `Key dimensions lost specificity or critical information was removed. `;
        }
        
        // Check what specifically declined
        if (current.detailedScores && previous?.detailedScores) {
            const declines = [];
            
            Object.keys(current.detailedScores).forEach(key => {
                const curr = current.detailedScores[key];
                const prev = previous.detailedScores[key];
                if (prev) {
                    const currScore = curr.score || curr;
                    const prevScore = prev.score || prev;
                    if (currScore < prevScore) {
                        declines.push({
                            dimension: this.formatDimensionName(key),
                            decrease: prevScore - currScore
                        });
                    }
                }
            });
            
            if (declines.length > 0) {
                reason += `Affected areas: ${declines.map(d => `${d.dimension} (-${d.decrease})`).join(', ')}. `;
            }
        }
        
        return reason;
    }

    analyzeRootCauses(current, previous, improvement) {
        const rootCauses = [];
        
        if (improvement > 0) {
            // Positive root causes
            
            // 1. Content Depth Analysis - ALWAYS show this
            if (current.worksheetData) {
                const currentLength = Object.values(current.worksheetData).join('').length;
                const previousLength = previous?.worksheetData ? Object.values(previous.worksheetData).join('').length : 0;
                
                if (previousLength === 0 && currentLength > 0) {
                    rootCauses.push({
                        title: 'Initial Content Creation',
                        explanation: `First comprehensive problem statement created with ${currentLength.toLocaleString()} characters of detailed content. This establishes the foundation for all future improvements.`,
                        data: {
                            'Content Created': `${currentLength.toLocaleString()} characters`,
                            'Sections Completed': `${Object.keys(current.worksheetData).filter(k => current.worksheetData[k]).length}/6`,
                            'Status': 'Foundation Established'
                        }
                    });
                } else if (currentLength > previousLength * 1.1) {
                    const increase = currentLength - previousLength;
                    const percentIncrease = Math.round((currentLength/previousLength - 1) * 100);
                    rootCauses.push({
                        title: 'Significant Content Expansion',
                        explanation: `Problem statement detail increased by ${percentIncrease}% (${increase.toLocaleString()} characters added). More comprehensive coverage leads to better scoring as it demonstrates deeper understanding of the problem space.`,
                        data: {
                            'Previous Content': `${previousLength.toLocaleString()} characters`,
                            'Current Content': `${currentLength.toLocaleString()} characters`,
                            'Content Added': `${increase.toLocaleString()} characters`,
                            'Expansion Rate': `${percentIncrease}%`
                        }
                    });
                } else if (currentLength > 0) {
                    rootCauses.push({
                        title: 'Content Refinement',
                        explanation: `Problem statement refined with ${currentLength.toLocaleString()} total characters. Focus shifted from expansion to quality improvement and specificity.`,
                        data: {
                            'Total Content': `${currentLength.toLocaleString()} characters`,
                            'Change': previousLength > 0 ? `${currentLength > previousLength ? '+' : ''}${(currentLength - previousLength).toLocaleString()} characters` : 'New',
                            'Focus': 'Quality over Quantity'
                        }
                    });
                }
            }
            
            // 2. Quantification Analysis - ALWAYS analyze if impact field exists
            if (current.worksheetData?.['what-impact']) {
                const impactText = current.worksheetData['what-impact'];
                const hasNumbers = /\d+/.test(impactText);
                const hasCurrency = /\$|€|£/.test(impactText);
                const hasPercentage = /%/.test(impactText);
                const hasTimeMetrics = /hour|day|week|month|year/i.test(impactText);
                const hasQuantifiers = /thousand|million|billion|\dk|\dm|\db/i.test(impactText);
                
                const metricsFound = [
                    hasNumbers && 'Numeric Values',
                    hasCurrency && 'Financial Metrics',
                    hasPercentage && 'Percentage Data',
                    hasTimeMetrics && 'Time Metrics',
                    hasQuantifiers && 'Scale Indicators'
                ].filter(Boolean);
                
                if (metricsFound.length > 0) {
                    rootCauses.push({
                        title: 'Strong Impact Quantification',
                        explanation: `Problem impact quantified with ${metricsFound.length} types of metrics. Concrete metrics and financial impact data significantly strengthen the problem statement. Sample: "${impactText.substring(0, 100)}..."`,
                        data: {
                            'Metric Types Found': metricsFound.length,
                            'Financial Data': hasCurrency ? 'Yes' : 'No',
                            'Time Impact': hasTimeMetrics ? 'Yes' : 'No',
                            'Percentages': hasPercentage ? 'Yes' : 'No',
                            'Scale Indicators': hasQuantifiers ? 'Yes' : 'No'
                        }
                    });
                } else {
                    rootCauses.push({
                        title: 'Qualitative Impact Description',
                        explanation: `Impact described qualitatively without specific metrics. While the impact is articulated, adding quantified metrics would strengthen the business case significantly.`,
                        data: {
                            'Impact Length': `${impactText.length} characters`,
                            'Quantification': 'Qualitative Only',
                            'Recommendation': 'Add Metrics'
                        }
                    });
                }
            }
            
            // 3. Customer Evidence - ALWAYS analyze if evidence field exists
            if (current.worksheetData?.['evidence-validation']) {
                const evidenceText = current.worksheetData['evidence-validation'];
                const previousEvidence = previous?.worksheetData?.['evidence-validation'];
                const hasQuotes = /".*?"|'.*?'/g.test(evidenceText);
                const hasStats = /\d+\s*(customer|user|company|organization|survey|interview)/i.test(evidenceText);
                const hasResearch = /research|study|survey|analysis|report/i.test(evidenceText);
                
                const validationStrength = [
                    hasQuotes && 'Customer Quotes',
                    hasStats && 'Statistical Evidence',
                    hasResearch && 'Research Data'
                ].filter(Boolean);
                
                rootCauses.push({
                    title: previousEvidence ? 'Enhanced Customer Validation' : 'Customer Validation Added',
                    explanation: `${validationStrength.length > 0 ?
                        `Strong validation with ${validationStrength.join(', ')}. ` :
                        'Validation evidence provided. '}Real customer evidence demonstrates that the problem is validated, not assumed. Sample: "${evidenceText.substring(0, 100)}..."`,
                    data: {
                        'Evidence Length': `${evidenceText.length.toLocaleString()} characters`,
                        'Previous Evidence': previousEvidence ? `${previousEvidence.length.toLocaleString()} chars` : 'None',
                        'Validation Types': validationStrength.length || 'General',
                        'Improvement': previousEvidence ?
                            `${Math.round((evidenceText.length / previousEvidence.length - 1) * 100)}%` : 'New Addition'
                    }
                });
            }
            
        } else if (improvement < 0) {
            // Negative root causes
            
            // 1. Content Reduction
            if (current.worksheetData && previous?.worksheetData) {
                const currentLength = Object.values(current.worksheetData).join('').length;
                const previousLength = Object.values(previous.worksheetData).join('').length;
                
                if (currentLength < previousLength * 0.8) {
                    rootCauses.push({
                        title: 'Significant Content Reduction',
                        explanation: `Problem statement detail decreased by ${Math.round((1 - currentLength/previousLength) * 100)}%. Loss of detail typically indicates important context or evidence was removed.`,
                        data: {
                            'Content Lost': `${previousLength - currentLength} characters`,
                            'Reduction Rate': `${Math.round((1 - currentLength/previousLength) * 100)}%`
                        }
                    });
                }
            }
            
            // 2. Dependency Impact
            if (current.eventType === 'dependency') {
                rootCauses.push({
                    title: 'Cascading Dependency Effect',
                    explanation: 'Score affected by changes in related components. When foundational elements change, dependent scores automatically adjust to maintain consistency.',
                    data: {
                        'Event Type': 'Dependency Update',
                        'Impact': `${Math.abs(improvement)}% decrease`
                    }
                });
            }
        }
        
        // 4. Dimension-Specific Changes - ALWAYS show top changes
        if (current.detailedScores) {
            const significantChanges = [];
            
            Object.keys(current.detailedScores).forEach(key => {
                const curr = current.detailedScores[key];
                const prev = previous?.detailedScores?.[key];
                
                const currScore = curr.score || curr;
                const prevScore = prev ? (prev.score || prev) : 0;
                const change = currScore - prevScore;
                
                if (Math.abs(change) >= 2 || !previous) {
                    significantChanges.push({
                        dimension: this.formatDimensionName(key),
                        change: change,
                        current: currScore,
                        previous: prevScore,
                        percentage: prevScore > 0 ? Math.round((change / prevScore) * 100) : 100
                    });
                }
            });
            
            if (significantChanges.length > 0) {
                // Show top 2 changes
                significantChanges.sort((a, b) => Math.abs(b.change) - Math.abs(a.change));
                const topChanges = significantChanges.slice(0, 2);
                
                topChanges.forEach((change, index) => {
                    rootCauses.push({
                        title: `${change.dimension} ${change.change > 0 ? 'Breakthrough' : change.change < 0 ? 'Degradation' : 'Baseline'}`,
                        explanation: `The ${change.dimension} dimension ${
                            change.change > 0 ? `improved by ${Math.abs(change.change)} points (${change.percentage}% increase)` :
                            change.change < 0 ? `declined by ${Math.abs(change.change)} points (${Math.abs(change.percentage)}% decrease)` :
                            `scored ${change.current} points`
                        }. ${index === 0 ? 'This represents the most significant dimensional change. ' : 'This is the second most impactful change. '}${
                            change.change > 0 ? 'This improvement shows successful focus and refinement in this critical area.' :
                            change.change < 0 ? 'This decline indicates loss of clarity or missing critical details.' :
                            'This establishes the baseline for future improvements.'
                        }`,
                        data: {
                            'Previous Score': `${change.previous}/20`,
                            'Current Score': `${change.current}/20`,
                            'Point Change': `${change.change > 0 ? '+' : ''}${change.change}`,
                            'Percentage Change': `${change.change > 0 ? '+' : ''}${change.percentage}%`
                        }
                    });
                });
            }
        }
        
        // Always ensure we have at least 2 root causes for positive changes
        if (improvement > 0 && rootCauses.length < 2) {
            rootCauses.push({
                title: 'Overall Quality Enhancement',
                explanation: 'Multiple small improvements across dimensions combined to create meaningful progress. While no single area showed dramatic change, the cumulative effect of refinements resulted in a stronger problem statement.',
                data: {
                    'Score Improvement': `+${improvement}%`,
                    'Type': 'Incremental Progress',
                    'Recommendation': 'Continue iterative refinement'
                }
            });
        }
        
        return rootCauses;
    }

    analyzeDimensions(current, previous) {
        const analysis = [];
        
        if (!current.detailedScores) return analysis;
        
        Object.keys(current.detailedScores).forEach(key => {
            const curr = current.detailedScores[key];
            const prev = previous?.detailedScores?.[key];
            
            const currScore = curr.score || curr;
            const prevScore = prev?.score || prev || 0;
            const change = currScore - prevScore;
            
            const dimensionAnalysis = {
                name: this.formatDimensionName(key),
                currentScore: currScore,
                previousScore: prevScore,
                change: change,
                maxScore: curr.maxScore || 20,
                analysis: []
            };
            
            // Specific analysis based on dimension
            switch(key) {
                case 'personaClarity':
                    dimensionAnalysis.context = 'Defines WHO experiences the problem';
                    if (change > 0) {
                        dimensionAnalysis.analysis.push({
                            type: 'improvement',
                            title: 'Better Target Definition',
                            detail: `Persona specificity improved by ${change} points. ${current.worksheetData?.['who-affected'] ? 
                                `Now targeting: "${current.worksheetData['who-affected'].substring(0, 100)}..."` : 
                                'More detailed demographics and psychographics added.'}`
                        });
                    } else if (change < 0) {
                        dimensionAnalysis.analysis.push({
                            type: 'decline',
                            title: 'Lost Persona Focus',
                            detail: 'Target audience became less specific or key demographic details were removed.'
                        });
                    }
                    
                    // Add evidence if available
                    if (curr.feedback) {
                        const strengths = curr.feedback.split('\n').filter(line => line.includes('✓'));
                        const weaknesses = curr.feedback.split('\n').filter(line => line.includes('✗'));
                        
                        if (strengths.length > 0) {
                            dimensionAnalysis.analysis.push({
                                type: 'strength',
                                title: 'Current Strengths',
                                detail: strengths.map(s => s.replace('✓', '').trim()).join('; ')
                            });
                        }
                        
                        if (weaknesses.length > 0) {
                            dimensionAnalysis.analysis.push({
                                type: 'weakness',
                                title: 'Areas Needing Work',
                                detail: weaknesses.map(w => w.replace('✗', '').trim()).join('; ')
                            });
                        }
                    }
                    break;
                    
                case 'impactQuantification':
                    dimensionAnalysis.context = 'Measures the problem\'s business impact';
                    if (change > 0) {
                        dimensionAnalysis.analysis.push({
                            type: 'improvement',
                            title: 'Stronger Business Case',
                            detail: `Impact metrics improved by ${change} points. ${current.worksheetData?.['what-impact'] ? 
                                `Quantified as: "${current.worksheetData['what-impact'].substring(0, 150)}..."` : 
                                'Financial and operational impacts now measured.'}`
                        });
                    } else if (change < 0) {
                        dimensionAnalysis.analysis.push({
                            type: 'decline',
                            title: 'Weaker Quantification',
                            detail: 'Impact metrics became less specific or key measurements were removed.'
                        });
                    }
                    break;
                    
                case 'evidenceValidation':
                    dimensionAnalysis.context = 'Validates problem with real evidence';
                    if (change > 0) {
                        dimensionAnalysis.analysis.push({
                            type: 'improvement',
                            title: 'Enhanced Validation',
                            detail: `Evidence quality improved by ${change} points. ${current.worksheetData?.['evidence-validation'] ? 
                                'New customer quotes and research data strengthen credibility.' : 
                                'Additional validation sources added.'}`
                        });
                    }
                    break;
                    
                case 'contextualTriggers':
                    dimensionAnalysis.context = 'Identifies when and why the problem occurs';
                    if (current.worksheetData?.['when-occur']) {
                        dimensionAnalysis.analysis.push({
                            type: 'evidence',
                            title: 'Context Defined',
                            detail: `Problem occurs: "${current.worksheetData['when-occur'].substring(0, 100)}..."`
                        });
                    }
                    break;
                    
                case 'solutionGap':
                    dimensionAnalysis.context = 'Analyzes current solutions and their limitations';
                    if (current.worksheetData?.['how-solving']) {
                        dimensionAnalysis.analysis.push({
                            type: 'evidence',
                            title: 'Current Solutions Analyzed',
                            detail: `Existing approaches: "${current.worksheetData['how-solving'].substring(0, 100)}..."`
                        });
                    }
                    break;
            }
            
            analysis.push(dimensionAnalysis);
        });
        
        // Sort by change magnitude
        analysis.sort((a, b) => Math.abs(b.change) - Math.abs(a.change));
        
        return analysis;
    }

    generateRecommendations(current, dimensionAnalysis) {
        const recommendations = [];
        const currentScore = current.score || current.newScore || 0;
        
        // Calculate realistic improvement potential
        const calculateRealisticImprovement = (currentDimScore, maxDimScore, priority, currentTotalScore) => {
            const dimGap = maxDimScore - currentDimScore;
            const dimCompletionRate = currentDimScore / maxDimScore;
            
            // Base improvement calculation with diminishing returns
            let baseImprovement = 0;
            
            if (dimCompletionRate < 0.3) {
                // Very low scores - high improvement potential but requires significant effort
                baseImprovement = Math.min(dimGap * 0.6, 8); // Max 8 points for very weak dimensions
            } else if (dimCompletionRate < 0.5) {
                // Low scores - moderate improvement potential
                baseImprovement = Math.min(dimGap * 0.5, 6); // Max 6 points
            } else if (dimCompletionRate < 0.7) {
                // Medium scores - smaller gains as refinement gets harder
                baseImprovement = Math.min(dimGap * 0.4, 4); // Max 4 points
            } else {
                // High scores - marginal gains only
                baseImprovement = Math.min(dimGap * 0.3, 2); // Max 2 points
            }
            
            // Adjust based on priority
            const priorityMultiplier = priority === 'CRITICAL' ? 1.2 : priority === 'HIGH' ? 1.0 : 0.8;
            baseImprovement *= priorityMultiplier;
            
            // Apply overall score constraints (can't improve everything at once)
            if (currentTotalScore > 70) {
                baseImprovement *= 0.7; // Harder to improve when already good
            } else if (currentTotalScore < 40) {
                baseImprovement *= 1.1; // Slightly easier gains when starting low
            }
            
            // Convert dimension points to overall score percentage
            // Each dimension is worth up to 20 points, total of 100
            const scoreImprovement = Math.round((baseImprovement / 20) * 20);
            
            return Math.min(Math.max(scoreImprovement, 2), 15); // Between 2-15% improvement
        };
        
        // Analyze weakest dimensions
        const weakDimensions = dimensionAnalysis
            .filter(d => (d.currentScore / d.maxScore) < 0.8) // Include more dimensions
            .sort((a, b) => {
                // Sort by improvement potential, not just current score
                const aGap = (a.maxScore - a.currentScore) / a.maxScore;
                const bGap = (b.maxScore - b.currentScore) / b.maxScore;
                return bGap - aGap;
            });
        
        // Track total expected improvement to ensure it's realistic
        let totalExpectedImprovement = 0;
        const maxTotalImprovement = Math.min(100 - currentScore, 30); // Cap at 30% or reaching 100%
        
        weakDimensions.forEach((dim, index) => {
            if (totalExpectedImprovement >= maxTotalImprovement * 0.8) {
                return; // Stop if we're approaching unrealistic total improvement
            }
            
            const priority = index === 0 ? 'CRITICAL' : index === 1 ? 'HIGH' : 'MEDIUM';
            const potentialGain = calculateRealisticImprovement(
                dim.currentScore,
                dim.maxScore,
                priority,
                currentScore
            );
            
            // Adjust if total would be too high
            const adjustedGain = Math.min(
                potentialGain,
                maxTotalImprovement - totalExpectedImprovement
            );
            
            if (adjustedGain < 2) return; // Skip if improvement would be negligible
            
            totalExpectedImprovement += adjustedGain;
            
            // Generate detailed recommendation data
            let recommendationData = this.generateDetailedRecommendation(
                dim.name,
                dim.currentScore,
                dim.maxScore,
                adjustedGain,
                priority,
                current
            );
            
            recommendations.push(recommendationData);
        });
        
        // Add strategic recommendation if score is low and we have room
        if (currentScore < 60 && totalExpectedImprovement < maxTotalImprovement) {
            const strategicGain = Math.min(10, maxTotalImprovement - totalExpectedImprovement);
            recommendations.push({
                priority: 'CRITICAL',
                title: 'Conduct Comprehensive Problem Discovery',
                impact: `+${strategicGain}% expected improvement`,
                expectedImprovement: strategicGain,
                currentScore: `${currentScore}/100`,
                effort: 'High',
                steps: [
                    'Schedule 20 customer discovery interviews',
                    'Create problem validation survey',
                    'Analyze competitor problem statements',
                    'Workshop with internal stakeholders'
                ],
                detailedAnalysis: {
                    overview: 'A comprehensive problem discovery process is essential for establishing a strong foundation. This systematic approach will uncover hidden insights and validate assumptions.',
                    implementation: {
                        phase1: {
                            title: 'Customer Research',
                            tasks: [
                                'Identify and recruit 20 target customers',
                                'Develop interview guide with open-ended questions',
                                'Conduct 60-minute discovery interviews',
                                'Document pain points and jobs-to-be-done'
                            ]
                        },
                        phase2: {
                            title: 'Market Analysis',
                            tasks: [
                                'Analyze top 5 competitor problem statements',
                                'Research industry reports and trends',
                                'Create market sizing estimates',
                                'Identify underserved segments'
                            ]
                        },
                        phase3: {
                            title: 'Synthesis & Validation',
                            tasks: [
                                'Synthesize findings into key themes',
                                'Create validation survey for broader audience',
                                'Run survey with 100+ respondents',
                                'Refine problem statement based on data'
                            ]
                        }
                    },
                    resources: [
                        'Product Manager: 20 hours',
                        'UX Researcher: 15 hours',
                        'Data Analyst: 10 hours',
                        'Survey tool subscription: $200'
                    ],
                    risks: [
                        'Customer recruitment challenges',
                        'Biased interview questions',
                        'Analysis paralysis',
                        'Scope creep'
                    ],
                    successMetrics: [
                        '20+ customer interviews completed',
                        '100+ survey responses',
                        '5+ validated problem themes',
                        'Problem-solution fit score > 7/10'
                    ]
                }
            });
        }
        
        return recommendations.slice(0, 5); // Return top 5 recommendations
    }

    generateDetailedRecommendation(dimName, currentScore, maxScore, improvement, priority, current) {
        const recommendations = {
            'Persona Clarity': {
                title: 'Refine Target Persona Definition',
                effort: 'Medium',
                steps: [
                    'Interview 10 customers using Jobs-to-be-Done framework',
                    'Document specific demographics and firmographics',
                    'Map psychographic profiles (goals, fears, motivations)',
                    'Create detailed persona documentation with quotes'
                ],
                detailedAnalysis: {
                    overview: 'A well-defined persona is the cornerstone of product-market fit. This recommendation focuses on transforming vague audience descriptions into actionable, specific persona profiles that drive decision-making.',
                    implementation: {
                        phase1: {
                            title: 'Research Planning (Days 1-3)',
                            tasks: [
                                'Define research objectives and key questions',
                                'Identify and recruit 10-15 target customers',
                                'Prepare interview guide with JTBD framework',
                                'Set up recording and analysis tools'
                            ]
                        },
                        phase2: {
                            title: 'Customer Interviews (Days 4-10)',
                            tasks: [
                                'Conduct 45-60 minute interviews',
                                'Focus on jobs, pains, and gains',
                                'Capture direct quotes and stories',
                                'Document context and triggers'
                            ]
                        },
                        phase3: {
                            title: 'Synthesis & Documentation (Days 11-15)',
                            tasks: [
                                'Analyze interview transcripts for patterns',
                                'Create persona archetypes with key attributes',
                                'Validate findings with sales/support teams',
                                'Build persona one-pagers with actionable insights'
                            ]
                        }
                    },
                    resources: [
                        'Product Manager: 30 hours',
                        'UX Researcher: 25 hours',
                        'Designer: 10 hours for persona artifacts',
                        'Interview incentives: $50 x 10 = $500'
                    ],
                    risks: [
                        'Selection bias in customer recruitment',
                        'Leading questions influencing responses',
                        'Over-generalization from small sample',
                        'Personas becoming static vs. evolving'
                    ],
                    successMetrics: [
                        '10+ in-depth customer interviews completed',
                        '3-5 distinct persona profiles created',
                        'Each persona validated by 3+ customers',
                        'Sales team adoption rate > 80%'
                    ],
                    roi: 'Improved targeting can increase conversion rates by 20-30% and reduce customer acquisition costs by 15-25%.'
                }
            },
            'Impact Quantification': {
                title: 'Quantify Business Impact with Hard Metrics',
                effort: 'High',
                steps: [
                    'Calculate time/money lost per problem occurrence',
                    'Determine frequency across customer base',
                    'Project total addressable problem (TAP)',
                    'Benchmark against industry standards'
                ],
                detailedAnalysis: {
                    overview: 'Quantifying impact transforms your problem from an opinion to a business case. This process will establish concrete metrics that resonate with stakeholders and justify investment.',
                    implementation: {
                        phase1: {
                            title: 'Data Collection',
                            tasks: [
                                'Survey customers on frequency and severity',
                                'Analyze support tickets for impact data',
                                'Interview operations teams for cost data',
                                'Research industry benchmarks and reports'
                            ]
                        },
                        phase2: {
                            title: 'Financial Modeling',
                            tasks: [
                                'Build cost model for problem impact',
                                'Calculate direct costs (time, money, resources)',
                                'Estimate indirect costs (opportunity, reputation)',
                                'Create sensitivity analysis for key variables'
                            ]
                        },
                        phase3: {
                            title: 'Validation & Documentation',
                            tasks: [
                                'Validate model with finance team',
                                'Test assumptions with customer data',
                                'Create executive summary with key metrics',
                                'Build ROI calculator for sales team'
                            ]
                        }
                    },
                    resources: [
                        'Data Analyst: 40 hours',
                        'Product Manager: 20 hours',
                        'Finance Partner: 10 hours',
                        'Customer Success Manager: 15 hours'
                    ],
                    risks: [
                        'Incomplete or biased data',
                        'Overestimation of impact',
                        'Complex calculations reducing credibility',
                        'Market size assumptions proving wrong'
                    ],
                    successMetrics: [
                        'Problem cost quantified to ±20% accuracy',
                        'TAP (Total Addressable Problem) > $10M',
                        'Model validated by 5+ customers',
                        'CFO approval of business case'
                    ],
                    roi: 'Clear quantification typically increases funding approval rates by 40% and accelerates decision-making.'
                }
            },
            'Evidence Validation': {
                title: 'Build Compelling Validation Evidence',
                effort: 'High',
                steps: [
                    'Collect 20+ direct customer quotes',
                    'Run quantitative validation survey (n=100+)',
                    'Document case studies with metrics',
                    'Compile third-party research support'
                ],
                detailedAnalysis: {
                    overview: 'Strong evidence transforms assumptions into facts. This systematic validation approach will build an unassailable case for your problem statement through multiple data sources.',
                    implementation: {
                        phase1: {
                            title: 'Qualitative Evidence',
                            tasks: [
                                'Extract quotes from customer interviews',
                                'Collect testimonials from power users',
                                'Document specific problem stories',
                                'Create quote database with attribution'
                            ]
                        },
                        phase2: {
                            title: 'Quantitative Validation',
                            tasks: [
                                'Design statistically significant survey',
                                'Deploy to 200+ target customers',
                                'Analyze results for significance',
                                'Create data visualizations'
                            ]
                        },
                        phase3: {
                            title: 'External Validation',
                            tasks: [
                                'Research industry reports and studies',
                                'Analyze competitor messaging and data',
                                'Interview industry experts',
                                'Compile evidence portfolio'
                            ]
                        }
                    },
                    resources: [
                        'Research Lead: 50 hours',
                        'Data Scientist: 30 hours',
                        'Content Writer: 20 hours',
                        'Survey platform: $500/month'
                    ],
                    risks: [
                        'Response bias in surveys',
                        'Cherry-picking favorable data',
                        'Outdated third-party research',
                        'Legal issues with quotes'
                    ],
                    successMetrics: [
                        '20+ customer quotes collected',
                        '100+ survey responses (>30% response rate)',
                        '5+ external sources cited',
                        'Statistical significance p<0.05'
                    ],
                    roi: 'Strong validation evidence increases investor confidence by 50% and reduces sales cycle length by 20-30%.'
                }
            },
            'Contextual Triggers': {
                title: 'Map Problem Context and Triggers',
                effort: 'Medium',
                steps: [
                    'Document when/where problem occurs',
                    'Identify trigger events and patterns',
                    'Map to customer journey stages',
                    'Quantify frequency and urgency'
                ],
                detailedAnalysis: {
                    overview: 'Understanding problem triggers enables precise targeting and timely interventions. This analysis will reveal the specific conditions that activate customer pain points.',
                    implementation: {
                        phase1: {
                            title: 'Trigger Identification',
                            tasks: [
                                'Analyze customer support tickets for patterns',
                                'Interview customers about problem timing',
                                'Map triggers to business events',
                                'Document environmental factors'
                            ]
                        },
                        phase2: {
                            title: 'Pattern Analysis',
                            tasks: [
                                'Create trigger taxonomy',
                                'Quantify frequency of each trigger',
                                'Analyze seasonal/cyclical patterns',
                                'Build predictive trigger model'
                            ]
                        }
                    },
                    resources: [
                        'Product Manager: 20 hours',
                        'Data Analyst: 25 hours',
                        'Customer Success: 15 hours'
                    ],
                    risks: [
                        'Missing hidden triggers',
                        'Correlation vs causation errors',
                        'Over-simplification of complex triggers'
                    ],
                    successMetrics: [
                        '10+ triggers identified and documented',
                        'Trigger model accuracy >75%',
                        'Customer validation of trigger map'
                    ],
                    roi: 'Trigger mapping improves product adoption timing by 35% and increases intervention success rates by 40%.'
                }
            },
            'Solution Gap Analysis': {
                title: 'Analyze Competitive Solution Landscape',
                effort: 'Medium',
                steps: [
                    'Audit top 5 competing solutions',
                    'Document specific shortcomings',
                    'Identify differentiation opportunities',
                    'Validate gaps with customers'
                ],
                detailedAnalysis: {
                    overview: 'Understanding existing solution gaps reveals your unique value proposition opportunity. This analysis will pinpoint exactly where current solutions fail customers.',
                    implementation: {
                        phase1: {
                            title: 'Competitive Audit',
                            tasks: [
                                'Test top 5 competing solutions',
                                'Document features and capabilities',
                                'Analyze pricing and positioning',
                                'Review customer reviews and complaints'
                            ]
                        },
                        phase2: {
                            title: 'Gap Analysis',
                            tasks: [
                                'Map customer needs to solution capabilities',
                                'Identify unmet and underserved needs',
                                'Prioritize gaps by customer impact',
                                'Define differentiation strategy'
                            ]
                        },
                        phase3: {
                            title: 'Validation',
                            tasks: [
                                'Validate gaps with customer interviews',
                                'Test willingness to pay for gap solutions',
                                'Refine positioning based on feedback',
                                'Create competitive battle cards'
                            ]
                        }
                    },
                    resources: [
                        'Product Manager: 30 hours',
                        'Competitive Intelligence: 20 hours',
                        'Sales Engineer: 15 hours',
                        'Subscription to competitor tools: $500'
                    ],
                    risks: [
                        'Competitor feature parity race',
                        'Misunderstanding customer priorities',
                        'Overestimating differentiation value',
                        'Rapid competitor evolution'
                    ],
                    successMetrics: [
                        '5+ validated solution gaps identified',
                        'Customer willingness to pay validated',
                        'Win rate improvement of 20%',
                        'Clear differentiation message adopted'
                    ],
                    roi: 'Clear differentiation typically increases win rates by 25-35% and allows for 10-20% price premiums.'
                }
            }
        };
        
        const baseRecommendation = recommendations[dimName] || {
            title: `Improve ${dimName}`,
            effort: 'Medium',
            steps: [
                'Review best practices for this dimension',
                'Gather additional supporting data',
                'Refine and expand documentation',
                'Validate improvements with stakeholders'
            ],
            detailedAnalysis: {
                overview: `Improving ${dimName} will strengthen your overall problem statement and increase stakeholder confidence.`,
                implementation: {
                    phase1: {
                        title: 'Assessment',
                        tasks: ['Review current state', 'Identify gaps', 'Set improvement targets']
                    },
                    phase2: {
                        title: 'Enhancement',
                        tasks: ['Implement improvements', 'Gather supporting data', 'Document changes']
                    },
                    phase3: {
                        title: 'Validation',
                        tasks: ['Test with stakeholders', 'Refine based on feedback', 'Finalize documentation']
                    }
                },
                resources: ['Product Manager: 20 hours', 'Subject Matter Expert: 10 hours'],
                risks: ['Scope creep', 'Stakeholder alignment'],
                successMetrics: [`${dimName} score improvement of ${improvement}%`]
            }
        };
        
        return {
            ...baseRecommendation,
            priority: priority,
            impact: `+${improvement}% expected improvement`,
            expectedImprovement: improvement,
            currentScore: `${currentScore}/${maxScore}`,
            dimensionName: dimName
        };
    }

    buildTimeline(allEntries, currentEntry) {
        // Build a timeline of significant events
        const timeline = [];
        
        if (allEntries && allEntries.length > 0) {
            allEntries.forEach((entry, index) => {
                if (entry.timestamp || entry.date) {
                    const date = new Date(entry.timestamp || entry.date);
                    const score = entry.score || entry.newScore || 0;
                    
                    timeline.push({
                        date: date,
                        score: score,
                        event: entry.event || entry.source || 'Score Update',
                        isCurrent: entry === currentEntry
                    });
                }
            });
        }
        
        return timeline;
    }

    extractDataPoints(current, previous, allEntries) {
        const data = {};
        
        // Calculate key metrics
        data.totalAnalyses = allEntries ? allEntries.length : 1;
        data.averageScore = allEntries ? 
            Math.round(allEntries.reduce((sum, e) => sum + (e.score || e.newScore || 0), 0) / allEntries.length) : 
            current.score || 0;
        data.bestScore = allEntries ? 
            Math.max(...allEntries.map(e => e.score || e.newScore || 0)) : 
            current.score || 0;
        data.worksheetCompletion = current.worksheetData ? 
            Object.values(current.worksheetData).filter(v => v && v.length > 10).length : 0;
        data.totalWorksheetFields = 6;
        
        // Calculate improvement velocity
        if (allEntries && allEntries.length > 1) {
            const recentEntries = allEntries.slice(-3);
            const recentImprovement = recentEntries[recentEntries.length - 1].score - recentEntries[0].score;
            data.improvementVelocity = Math.round(recentImprovement / recentEntries.length);
        }
        
        return data;
    }

    formatDimensionName(key) {
        const nameMap = {
            'personaClarity': 'Persona Clarity',
            'contextualTriggers': 'Contextual Triggers',
            'impactQuantification': 'Impact Quantification',
            'evidenceValidation': 'Evidence & Validation',
            'solutionGap': 'Solution Gap Analysis',
            'problemClarity': 'Problem Clarity',
            'marketUnderstanding': 'Market Understanding',
            'customerEmpathy': 'Customer Empathy',
            'valueQuantification': 'Value Quantification',
            'solutionDifferentiation': 'Solution Differentiation'
        };
        
        return nameMap[key] || key.replace(/([A-Z])/g, ' $1').trim()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    createPopup(entryData, allEntries = []) {
        // Close any existing popup
        this.closePopup();
        
        // Find previous entry for comparison
        const currentIndex = allEntries.findIndex(e => 
            e.timestamp === entryData.timestamp || e.date === entryData.date
        );
        const previousEntry = currentIndex > 0 ? allEntries[currentIndex - 1] : null;
        
        // Generate deep insights
        const insights = this.generateDeepInsights(entryData, previousEntry, allEntries);
        
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'analysis-popup-overlay';
        overlay.onclick = (e) => {
            if (e.target === overlay) {
                this.closePopup();
            }
        };
        
        // Create popup
        const popup = document.createElement('div');
        popup.className = 'analysis-popup';
        popup.onclick = (e) => e.stopPropagation();
        
        // Build popup content
        const currentScore = entryData.score || entryData.newScore || 0;
        const previousScore = previousEntry?.score || previousEntry?.newScore || 
                            entryData.previousScore || (currentScore - (entryData.improvement || 0));
        const improvement = currentScore - previousScore;
        
        popup.innerHTML = `
            <div class="analysis-header">
                <button class="analysis-close" onclick="scoreAnalysisEngine.closePopup()">×</button>
                <h1 class="analysis-title">Deep Score Movement Analysis</h1>
                <div class="analysis-subtitle">
                    ${this.formatDate(entryData.date || entryData.timestamp)} | 
                    ${entryData.source || 'AI Analysis'}
                </div>
            </div>
            
            <div class="analysis-body">
                <!-- Score Movement Hero -->
                <div class="score-movement-hero">
                    <div class="score-comparison">
                        <div class="score-block">
                            <div class="score-label">Previous</div>
                            <div class="score-value" style="color: ${this.getScoreColor(previousScore)}">
                                ${previousScore}%
                            </div>
                        </div>
                        <div class="score-arrow">→</div>
                        <div class="score-block">
                            <div class="score-label">Current</div>
                            <div class="score-value" style="color: ${this.getScoreColor(currentScore)}">
                                ${currentScore}%
                            </div>
                        </div>
                    </div>
                    <div class="movement-summary" style="color: ${improvement > 0 ? '#4CAF50' : improvement < 0 ? '#F44336' : '#FF9800'}">
                        ${improvement > 0 ? '↑' : improvement < 0 ? '↓' : '→'} 
                        ${Math.abs(improvement)}% ${improvement > 0 ? 'Improvement' : improvement < 0 ? 'Decline' : 'No Change'}
                    </div>
                </div>
                
                <!-- Executive Insight -->
                <div class="executive-insight">
                    <h3>Executive Summary</h3>
                    <div style="line-height: 1.8; color: #ccc; font-size: 16px;">${insights.executiveSummary}</div>
                </div>
                
                <!-- Root Causes Section -->
                ${insights.rootCauses.length > 0 ? `
                <div class="root-causes-section">
                    <div class="section-header">
                        <div class="section-icon">🔍</div>
                        <h2 class="section-title">Root Cause Analysis</h2>
                    </div>
                    ${insights.rootCauses.map((cause, index) => `
                    <div class="root-cause-item">
                        <div class="root-cause-header">
                            <div class="root-cause-number">${index + 1}</div>
                            <h3 class="root-cause-title">${cause.title}</h3>
                        </div>
                        <p class="root-cause-explanation">${cause.explanation}</p>
                        ${cause.data ? `
                        <div class="root-cause-data">
                            ${Object.entries(cause.data).map(([key, value]) => `
                            <div class="data-point">
                                <div class="data-label">${key}</div>
                                <div class="data-value">${value}</div>
                            </div>
                            `).join('')}
                        </div>
                        ` : ''}
                    </div>
                    `).join('')}
                </div>
                ` : ''}
                
                <!-- Dimension Analysis -->
                ${insights.dimensionAnalysis.length > 0 ? `
                <div class="analysis-section">
                    <div class="section-header">
                        <div class="section-icon">📊</div>
                        <h2 class="section-title">Dimension-by-Dimension Breakdown</h2>
                    </div>
                    <div class="dimension-grid">
                        ${insights.dimensionAnalysis.map(dim => `
                        <div class="dimension-card">
                            <div class="dimension-header">
                                <div class="dimension-info">
                                    <h3 class="dimension-name">${dim.name}</h3>
                                    <p class="dimension-context">${dim.context || ''}</p>
                                </div>
                                <div class="dimension-scores">
                                    <div class="dimension-score-block">
                                        <div class="dimension-score-label">Was</div>
                                        <div class="dimension-score-value" style="color: ${this.getScoreColor(dim.previousScore * 5)}">
                                            ${dim.previousScore}
                                        </div>
                                    </div>
                                    <div class="dimension-score-block">
                                        <div class="dimension-score-label">Now</div>
                                        <div class="dimension-score-value" style="color: ${this.getScoreColor(dim.currentScore * 5)}">
                                            ${dim.currentScore}
                                        </div>
                                    </div>
                                    <div class="dimension-change ${dim.change > 0 ? 'change-positive' : dim.change < 0 ? 'change-negative' : 'change-neutral'}">
                                        ${dim.change > 0 ? '+' : ''}${dim.change}
                                    </div>
                                </div>
                            </div>
                            ${dim.analysis.length > 0 ? `
                            <div class="dimension-analysis">
                                ${dim.analysis.map(point => `
                                <div class="analysis-point">
                                    <div class="analysis-icon">
                                        ${point.type === 'improvement' ? '✅' :
                                          point.type === 'decline' ? '⚠️' :
                                          point.type === 'strength' ? '💪' :
                                          point.type === 'weakness' ? '🔧' :
                                          point.type === 'evidence' ? '📝' : '📌'}
                                    </div>
                                    <div class="analysis-content">
                                        <div class="analysis-title">${point.title}</div>
                                        <div class="analysis-detail">${point.detail}</div>
                                    </div>
                                </div>
                                `).join('')}
                            </div>
                            ` : ''}
                        </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
                
                <!-- Recommendations -->
                ${insights.recommendations.length > 0 ? `
                <div class="analysis-section">
                    <div class="section-header">
                        <div class="section-icon">🎯</div>
                        <h2 class="section-title">Strategic Recommendations</h2>
                    </div>
                    <div class="recommendations-grid">
                        ${insights.recommendations.map((rec, recIndex) => `
                        <div class="recommendation-card"
                             style="cursor: pointer; transition: all 0.3s ease;"
                             onclick="scoreAnalysisEngine.showRecommendationDetail(${JSON.stringify(rec).replace(/"/g, '&quot;')})">
                            <div class="recommendation-priority priority-${rec.priority.toLowerCase()}">
                                ${rec.priority}
                            </div>
                            <h3 class="recommendation-title">${rec.title}</h3>
                            <div class="recommendation-impact">
                                <span class="impact-label">Expected Impact:</span>
                                <span class="impact-value">${rec.impact}</span>
                            </div>
                            ${rec.currentScore ? `
                            <div style="margin: 10px 0; color: #999; font-size: 14px;">
                                Current: ${rec.currentScore}
                            </div>
                            ` : ''}
                            ${rec.timeframe ? `
                            <div style="display: flex; gap: 20px; margin: 10px 0; color: #999; font-size: 13px;">
                                <span>⏱️ ${rec.timeframe}</span>
                                <span>💪 ${rec.effort} effort</span>
                            </div>
                            ` : ''}
                            <div class="recommendation-steps">
                                ${rec.steps.slice(0, 2).map((step, i) => `
                                <div class="step-item">
                                    <div class="step-number">${i + 1}</div>
                                    <div class="step-text">${step}</div>
                                </div>
                                `).join('')}
                                ${rec.steps.length > 2 ? `
                                <div style="margin-top: 10px; color: #FF5500; font-size: 13px; text-align: center;">
                                    + ${rec.steps.length - 2} more steps • Click for full details →
                                </div>
                                ` : ''}
                            </div>
                        </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
                
                <!-- Key Metrics -->
                <div class="analysis-section">
                    <div class="section-header">
                        <div class="section-icon">📈</div>
                        <h2 class="section-title">Key Performance Metrics</h2>
                    </div>
                    <div class="root-cause-data">
                        <div class="data-point">
                            <div class="data-label">Total Analyses</div>
                            <div class="data-value">${insights.dataPoints.totalAnalyses || 1}</div>
                        </div>
                        <div class="data-point">
                            <div class="data-label">Average Score</div>
                            <div class="data-value">${insights.dataPoints.averageScore || 0}%</div>
                        </div>
                        <div class="data-point">
                            <div class="data-label">Best Score</div>
                            <div class="data-value">${insights.dataPoints.bestScore || 0}%</div>
                        </div>
                        <div class="data-point">
                            <div class="data-label">Worksheet Completion</div>
                            <div class="data-value">${insights.dataPoints.worksheetCompletion || 0}/${insights.dataPoints.totalWorksheetFields || 6}</div>
                        </div>
                        ${insights.dataPoints.improvementVelocity !== undefined ? `
                        <div class="data-point">
                            <div class="data-label">Improvement Rate</div>
                            <div class="data-value">${insights.dataPoints.improvementVelocity > 0 ? '+' : ''}${insights.dataPoints.improvementVelocity}%/analysis</div>
                        </div>
                        ` : ''}
                    </div>
                </div>
                
                <!-- Action Buttons -->
                <div class="action-buttons">
                    <button class="btn-action btn-secondary" onclick="scoreAnalysisEngine.exportAnalysis()">
                        Export Analysis
                    </button>
                    <button class="btn-action btn-primary" onclick="scoreAnalysisEngine.closePopup()">
                        Close
                    </button>
                </div>
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

    getScoreColor(score) {
        if (score >= 80) return '#4CAF50';
        if (score >= 60) return '#FF9800';
        return '#F44336';
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    exportAnalysis() {
        // Placeholder for export functionality
        alert('Analysis export feature coming soon. This will generate a detailed PDF report.');
    }

    showRecommendationDetail(recommendation) {
        // Close any existing popup
        this.closePopup();
        
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'analysis-popup-overlay';
        overlay.onclick = (e) => {
            if (e.target === overlay) {
                this.closePopup();
            }
        };
        
        // Create popup
        const popup = document.createElement('div');
        popup.className = 'recommendation-detail-popup';
        popup.onclick = (e) => e.stopPropagation();
        
        // Build detailed content
        const detailedAnalysis = recommendation.detailedAnalysis || {};
        const implementation = detailedAnalysis.implementation || {};
        const resources = detailedAnalysis.resources || [];
        const risks = detailedAnalysis.risks || [];
        const successMetrics = detailedAnalysis.successMetrics || [];
        const roi = detailedAnalysis.roi || '';
        
        popup.innerHTML = `
            <div class="recommendation-detail-header">
                <button class="analysis-close" onclick="scoreAnalysisEngine.closePopup()">×</button>
                <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 10px;">
                    <div class="recommendation-priority priority-${recommendation.priority.toLowerCase()}" style="position: static;">
                        ${recommendation.priority}
                    </div>
                    <h1 class="analysis-title" style="color: #2196F3; margin: 0;">
                        ${recommendation.title}
                    </h1>
                </div>
                <div style="display: flex; gap: 30px; margin-top: 20px;">
                    <div>
                        <span style="color: #999; font-size: 14px;">Expected Impact</span>
                        <div style="font-size: 24px; font-weight: 700; color: #4CAF50;">
                            ${recommendation.impact}
                        </div>
                    </div>
                    ${recommendation.currentScore ? `
                    <div>
                        <span style="color: #999; font-size: 14px;">Current Score</span>
                        <div style="font-size: 24px; font-weight: 700; color: #FF9800;">
                            ${recommendation.currentScore}
                        </div>
                    </div>
                    ` : ''}
                    ${recommendation.timeframe ? `
                    <div>
                        <span style="color: #999; font-size: 14px;">Timeframe</span>
                        <div style="font-size: 24px; font-weight: 700; color: #2196F3;">
                            ${recommendation.timeframe}
                        </div>
                    </div>
                    ` : ''}
                    ${recommendation.effort ? `
                    <div>
                        <span style="color: #999; font-size: 14px;">Effort Level</span>
                        <div style="font-size: 24px; font-weight: 700; color: ${
                            recommendation.effort === 'High' ? '#F44336' :
                            recommendation.effort === 'Medium' ? '#FF9800' : '#4CAF50'
                        };">
                            ${recommendation.effort}
                        </div>
                    </div>
                    ` : ''}
                </div>
            </div>
            
            <div class="recommendation-detail-body">
                <!-- Overview -->
                ${detailedAnalysis.overview ? `
                <div class="executive-insight" style="margin-bottom: 30px;">
                    <h3 style="color: #2196F3;">Overview</h3>
                    <p style="font-size: 16px; line-height: 1.8;">${detailedAnalysis.overview}</p>
                </div>
                ` : ''}
                
                <!-- Implementation Roadmap -->
                <div class="analysis-section">
                    <div class="section-header">
                        <div class="section-icon">📋</div>
                        <h2 class="section-title" style="color: #2196F3;">Implementation Roadmap</h2>
                    </div>
                    
                    ${Object.keys(implementation).length > 0 ?
                        Object.entries(implementation).map(([phaseKey, phase], index) => `
                        <div class="implementation-phase">
                            <div class="implementation-phase-header">
                                <div class="phase-number">${index + 1}</div>
                                <h3 class="phase-title">${phase.title}</h3>
                            </div>
                            <ul class="task-list">
                                ${phase.tasks.map(task => `
                                <li class="task-item">
                                    <div class="task-checkbox" onclick="this.classList.toggle('checked')"></div>
                                    <div class="task-text">${task}</div>
                                </li>
                                `).join('')}
                            </ul>
                        </div>
                        `).join('') :
                        `<div class="recommendation-steps" style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 20px;">
                            ${recommendation.steps.map((step, i) => `
                            <div class="step-item">
                                <div class="step-number">${i + 1}</div>
                                <div class="step-text">${step}</div>
                            </div>
                            `).join('')}
                        </div>`
                    }
                </div>
                
                <!-- Success Metrics -->
                ${successMetrics.length > 0 ? `
                <div class="analysis-section">
                    <div class="section-header">
                        <div class="section-icon">📊</div>
                        <h2 class="section-title" style="color: #4CAF50;">Success Metrics</h2>
                    </div>
                    <div class="metric-grid">
                        ${successMetrics.map((metric, index) => `
                        <div class="metric-card">
                            <div class="metric-icon">✅</div>
                            <div class="metric-value">${metric}</div>
                        </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
                
                <!-- Resources Required -->
                ${resources.length > 0 ? `
                <div class="analysis-section">
                    <div class="section-header">
                        <div class="section-icon">👥</div>
                        <h2 class="section-title" style="color: #FF9800;">Resources Required</h2>
                    </div>
                    <div class="resource-list">
                        ${resources.map(resource => {
                            const [name, amount] = resource.includes(':') ?
                                resource.split(':').map(s => s.trim()) :
                                [resource, ''];
                            return `
                            <div class="resource-item">
                                <div class="resource-name">${name}</div>
                                ${amount ? `<div class="resource-amount">${amount}</div>` : ''}
                            </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                ` : ''}
                
                <!-- Risks & Mitigation -->
                ${risks.length > 0 ? `
                <div class="analysis-section">
                    <div class="section-header">
                        <div class="section-icon">⚠️</div>
                        <h2 class="section-title" style="color: #F44336;">Risks & Considerations</h2>
                    </div>
                    <div class="risk-list">
                        ${risks.map(risk => `
                        <div class="risk-item">
                            <div class="risk-icon">⚠️</div>
                            <div class="risk-text">${risk}</div>
                        </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
                
                <!-- ROI Projection -->
                ${roi ? `
                <div class="roi-highlight">
                    <div class="roi-title">Expected Return on Investment</div>
                    <div class="roi-value">${roi}</div>
                </div>
                ` : ''}
                
                <!-- Action Buttons -->
                <div class="action-buttons">
                    <button class="btn-action btn-secondary" onclick="scoreAnalysisEngine.exportRecommendation(${JSON.stringify(recommendation).replace(/"/g, '&quot;')})">
                        Export Plan
                    </button>
                    <button class="btn-action btn-primary" onclick="scoreAnalysisEngine.startImplementation(${JSON.stringify(recommendation).replace(/"/g, '&quot;')})">
                        Start Implementation
                    </button>
                </div>
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
    
    exportRecommendation(recommendation) {
        // Create a text version of the recommendation
        let exportText = `RECOMMENDATION: ${recommendation.title}\n`;
        exportText += `Priority: ${recommendation.priority}\n`;
        exportText += `Expected Impact: ${recommendation.impact}\n`;
        exportText += `Timeframe: ${recommendation.timeframe || 'TBD'}\n`;
        exportText += `Effort: ${recommendation.effort || 'TBD'}\n\n`;
        
        if (recommendation.detailedAnalysis) {
            exportText += `OVERVIEW:\n${recommendation.detailedAnalysis.overview || 'N/A'}\n\n`;
            
            exportText += `IMPLEMENTATION STEPS:\n`;
            if (recommendation.detailedAnalysis.implementation) {
                Object.entries(recommendation.detailedAnalysis.implementation).forEach(([key, phase]) => {
                    exportText += `\n${phase.title}:\n`;
                    phase.tasks.forEach(task => {
                        exportText += `  - ${task}\n`;
                    });
                });
            } else {
                recommendation.steps.forEach((step, i) => {
                    exportText += `  ${i + 1}. ${step}\n`;
                });
            }
            
            if (recommendation.detailedAnalysis.successMetrics?.length > 0) {
                exportText += `\nSUCCESS METRICS:\n`;
                recommendation.detailedAnalysis.successMetrics.forEach(metric => {
                    exportText += `  • ${metric}\n`;
                });
            }
            
            if (recommendation.detailedAnalysis.resources?.length > 0) {
                exportText += `\nRESOURCES REQUIRED:\n`;
                recommendation.detailedAnalysis.resources.forEach(resource => {
                    exportText += `  • ${resource}\n`;
                });
            }
            
            if (recommendation.detailedAnalysis.risks?.length > 0) {
                exportText += `\nRISKS:\n`;
                recommendation.detailedAnalysis.risks.forEach(risk => {
                    exportText += `  • ${risk}\n`;
                });
            }
            
            if (recommendation.detailedAnalysis.roi) {
                exportText += `\nEXPECTED ROI:\n${recommendation.detailedAnalysis.roi}\n`;
            }
        }
        
        // Create and download file
        const blob = new Blob([exportText], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `recommendation-${recommendation.title.toLowerCase().replace(/\s+/g, '-')}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        // Show confirmation
        alert('Recommendation plan exported successfully!');
    }
    
    startImplementation(recommendation) {
        // This could integrate with project management tools
        alert(`Implementation plan for "${recommendation.title}" has been initiated. This feature will integrate with your project management tools in the next update.`);
        
        // Log the start
        console.log('Starting implementation:', recommendation);
        
        // Could trigger webhooks, create tasks, etc.
        // For now, just close the popup
        this.closePopup();
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
}

// Initialize the analysis engine
const scoreAnalysisEngine = new ScoreAnalysisEngine();

// Make it globally available
window.scoreAnalysisEngine = scoreAnalysisEngine;
window.scoreHistoryPopup = scoreAnalysisEngine; // Compatibility alias
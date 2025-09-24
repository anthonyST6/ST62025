// Enhanced Score History Popup Component with In-Depth Analysis
// This file provides detailed analysis of WHY scores changed between entries

class EnhancedScoreHistoryPopup {
    constructor() {
        this.currentPopup = null;
        this.previousEntry = null;
        this.initStyles();
    }

    initStyles() {
        if (document.getElementById('enhanced-score-popup-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'enhanced-score-popup-styles';
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
                background: rgba(0, 0, 0, 0.85);
                backdrop-filter: blur(10px);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                animation: fadeIn 0.3s ease;
                overflow-y: auto;
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
                max-width: 1100px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                animation: slideUp 0.3s ease;
                box-shadow: 0 20px 60px rgba(255, 85, 0, 0.3);
                margin: auto;
            }
            
            .popup-header {
                background: linear-gradient(135deg, rgba(255, 85, 0, 0.2) 0%, rgba(255, 85, 0, 0.05) 100%);
                padding: 30px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                position: sticky;
                top: 0;
                z-index: 10;
                backdrop-filter: blur(10px);
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
            
            .movement-analysis {
                background: linear-gradient(135deg, rgba(255, 85, 0, 0.05) 0%, rgba(0, 0, 0, 0.3) 100%);
                border: 2px solid rgba(255, 85, 0, 0.3);
                border-radius: 15px;
                padding: 25px;
                margin-bottom: 25px;
            }
            
            .movement-header {
                font-size: 22px;
                font-weight: 700;
                color: #FF5500;
                margin-bottom: 20px;
                text-align: center;
            }
            
            .factor-grid {
                display: grid;
                gap: 20px;
                margin-top: 20px;
            }
            
            .factor-item {
                background: rgba(0, 0, 0, 0.5);
                border-radius: 12px;
                padding: 20px;
                border-left: 4px solid #FF5500;
            }
            
            .factor-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
            }
            
            .factor-name {
                font-size: 16px;
                font-weight: 600;
                color: #fff;
            }
            
            .factor-impact {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .impact-value {
                font-size: 20px;
                font-weight: 700;
            }
            
            .impact-positive {
                color: #4CAF50;
            }
            
            .impact-negative {
                color: #F44336;
            }
            
            .impact-neutral {
                color: #FF9800;
            }
            
            .factor-details {
                color: #ccc;
                line-height: 1.6;
                font-size: 14px;
            }
            
            .comparison-grid {
                display: grid;
                grid-template-columns: 1fr auto 1fr;
                gap: 30px;
                align-items: start;
                margin: 20px 0;
            }
            
            .comparison-column {
                background: rgba(0, 0, 0, 0.3);
                border-radius: 12px;
                padding: 20px;
            }
            
            .comparison-label {
                font-size: 14px;
                color: #999;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 15px;
                text-align: center;
            }
            
            .comparison-content {
                font-size: 14px;
                line-height: 1.6;
                color: #ccc;
            }
            
            .comparison-arrow {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 32px;
                color: #FF5500;
                padding-top: 50px;
            }
            
            .root-cause-analysis {
                background: rgba(255, 85, 0, 0.03);
                border: 1px solid rgba(255, 85, 0, 0.2);
                border-radius: 12px;
                padding: 20px;
                margin-top: 20px;
            }
            
            .root-cause-title {
                font-size: 18px;
                font-weight: 600;
                color: #FF5500;
                margin-bottom: 15px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .root-cause-list {
                list-style: none;
                padding: 0;
            }
            
            .root-cause-item {
                padding: 12px 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                display: flex;
                align-items: flex-start;
                gap: 15px;
            }
            
            .root-cause-item:last-child {
                border-bottom: none;
            }
            
            .root-cause-icon {
                width: 24px;
                height: 24px;
                background: rgba(255, 85, 0, 0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                color: #FF5500;
                font-weight: bold;
            }
            
            .root-cause-text {
                flex: 1;
                color: #ccc;
                line-height: 1.5;
            }
            
            .dimension-comparison {
                display: grid;
                gap: 15px;
                margin-top: 20px;
            }
            
            .dimension-row {
                display: grid;
                grid-template-columns: 200px 1fr 100px 100px 100px;
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
            
            .dimension-bar-container {
                position: relative;
                height: 20px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                overflow: hidden;
            }
            
            .dimension-bar-previous {
                position: absolute;
                height: 100%;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 10px;
                transition: width 0.5s ease;
            }
            
            .dimension-bar-current {
                position: absolute;
                height: 100%;
                border-radius: 10px;
                transition: width 0.5s ease;
            }
            
            .dimension-values {
                text-align: center;
                font-weight: 600;
            }
            
            .dimension-change {
                text-align: center;
                font-weight: 700;
                font-size: 16px;
            }
            
            .timeline-visualization {
                background: rgba(0, 0, 0, 0.3);
                border-radius: 12px;
                padding: 20px;
                margin-top: 20px;
            }
            
            .timeline-title {
                font-size: 16px;
                font-weight: 600;
                color: #FF5500;
                margin-bottom: 15px;
            }
            
            .timeline-graph {
                height: 150px;
                position: relative;
                border-left: 2px solid rgba(255, 255, 255, 0.2);
                border-bottom: 2px solid rgba(255, 255, 255, 0.2);
                margin: 20px 0;
            }
            
            .action-effectiveness {
                background: rgba(76, 175, 80, 0.05);
                border: 1px solid rgba(76, 175, 80, 0.2);
                border-radius: 12px;
                padding: 20px;
                margin-top: 20px;
            }
            
            .effectiveness-title {
                font-size: 16px;
                font-weight: 600;
                color: #4CAF50;
                margin-bottom: 15px;
            }
            
            .effectiveness-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            }
            
            .effectiveness-action {
                flex: 1;
                color: #ccc;
            }
            
            .effectiveness-result {
                color: #4CAF50;
                font-weight: 600;
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

    // Analyze what changed between two entries
    analyzeScoreMovement(currentEntry, previousEntry) {
        const factors = [];
        
        // If we have detailed scores, analyze dimension changes
        if (currentEntry.detailedScores && previousEntry?.detailedScores) {
            Object.keys(currentEntry.detailedScores).forEach(key => {
                const current = currentEntry.detailedScores[key];
                const previous = previousEntry.detailedScores[key];
                
                if (previous) {
                    const currentScore = current.score || current;
                    const previousScore = previous.score || previous;
                    const change = currentScore - previousScore;
                    
                    if (Math.abs(change) > 0) {
                        factors.push({
                            name: this.formatDimensionName(key),
                            previousScore: previousScore,
                            currentScore: currentScore,
                            change: change,
                            impact: this.calculateImpact(change, current.weight || 20),
                            details: this.generateFactorAnalysis(key, current, previous, currentEntry)
                        });
                    }
                }
            });
        }
        
        // Sort factors by impact
        factors.sort((a, b) => Math.abs(b.change) - Math.abs(a.change));
        
        return factors;
    }

    formatDimensionName(key) {
        const dimensionMap = {
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
        
        return dimensionMap[key] || key.replace(/([A-Z])/g, ' $1').trim()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    calculateImpact(change, weight) {
        const impact = (change * weight) / 100;
        return {
            value: impact,
            percentage: change,
            level: Math.abs(change) >= 5 ? 'high' : Math.abs(change) >= 3 ? 'medium' : 'low'
        };
    }

    generateFactorAnalysis(dimension, current, previous, entry) {
        // Generate detailed analysis of why this dimension changed
        const currentScore = current.score || current;
        const previousScore = previous.score || previous;
        const improvement = currentScore - previousScore;
        
        let analysis = '';
        
        // Analyze based on the dimension type
        switch(dimension) {
            case 'personaClarity':
                if (improvement > 0) {
                    analysis = `The persona definition became more specific and targeted. ${entry.worksheetData?.['who-affected'] ? 
                        `The updated description now clearly identifies "${entry.worksheetData['who-affected']}" as the target audience, providing better focus.` : 
                        'More detailed demographics and psychographics were added.'}`;
                } else {
                    analysis = 'The persona definition lost specificity or became too broad, reducing targeting effectiveness.';
                }
                break;
                
            case 'impactQuantification':
                if (improvement > 0) {
                    analysis = `Impact metrics are now better quantified. ${entry.worksheetData?.['what-impact'] ? 
                        `The analysis shows clear metrics: "${entry.worksheetData['what-impact']}", providing concrete evidence of the problem's severity.` : 
                        'Financial and operational impacts are now measured with specific numbers.'}`;
                } else {
                    analysis = 'Impact quantification became less specific or metrics were removed, reducing the business case strength.';
                }
                break;
                
            case 'evidenceValidation':
                if (improvement > 0) {
                    analysis = `Stronger validation evidence was provided. ${entry.worksheetData?.['evidence-validation'] ? 
                        `New evidence includes: "${entry.worksheetData['evidence-validation'].substring(0, 100)}..."` : 
                        'Customer quotes, research data, and market validation were added.'}`;
                } else {
                    analysis = 'Evidence became weaker or less specific, reducing credibility of the problem statement.';
                }
                break;
                
            case 'contextualTriggers':
                if (improvement > 0) {
                    analysis = `Trigger events and context are now clearer. ${entry.worksheetData?.['when-occur'] ? 
                        `The specific context "${entry.worksheetData['when-occur']}" provides clear understanding of when the problem occurs.` : 
                        'Timing and urgency factors are better defined.'}`;
                } else {
                    analysis = 'Context and triggers became less clear, making it harder to identify when the problem occurs.';
                }
                break;
                
            case 'solutionGap':
                if (improvement > 0) {
                    analysis = `Current solution analysis improved. ${entry.worksheetData?.['how-solving'] ? 
                        `Analysis of existing solutions: "${entry.worksheetData['how-solving'].substring(0, 100)}..." shows clear gaps.` : 
                        'Better understanding of competitive landscape and differentiation opportunities.'}`;
                } else {
                    analysis = 'Solution gap analysis became weaker, missing opportunities for differentiation.';
                }
                break;
                
            default:
                if (improvement > 0) {
                    analysis = `This dimension improved through better definition, more specific details, and stronger evidence.`;
                } else {
                    analysis = `This dimension declined due to less specificity, weaker evidence, or missing details.`;
                }
        }
        
        // Add feedback if available
        if (current.feedback) {
            const strengths = current.feedback.split('\n').filter(line => line.includes('✓'));
            const weaknesses = current.feedback.split('\n').filter(line => line.includes('✗'));
            
            if (improvement > 0 && strengths.length > 0) {
                analysis += ` Strengths: ${strengths.map(s => s.replace('✓', '').trim()).join(', ')}.`;
            }
            if (improvement < 0 && weaknesses.length > 0) {
                analysis += ` Weaknesses: ${weaknesses.map(w => w.replace('✗', '').trim()).join(', ')}.`;
            }
        }
        
        return analysis;
    }

    identifyRootCauses(currentEntry, previousEntry, factors) {
        const rootCauses = [];
        const overallChange = (currentEntry.score || currentEntry.newScore) - 
                            (previousEntry?.score || previousEntry?.newScore || 0);
        
        // Analyze primary drivers
        if (overallChange > 0) {
            // Improvement root causes
            if (factors.some(f => f.name.includes('Persona') && f.change > 0)) {
                rootCauses.push({
                    type: 'improvement',
                    cause: 'Better Customer Understanding',
                    detail: 'More specific targeting and clearer identification of the ideal customer profile led to improved problem-solution fit.'
                });
            }
            
            if (factors.some(f => f.name.includes('Impact') && f.change > 0)) {
                rootCauses.push({
                    type: 'improvement',
                    cause: 'Stronger Business Case',
                    detail: 'Quantifying the financial and operational impact made the problem more compelling and urgent to solve.'
                });
            }
            
            if (factors.some(f => f.name.includes('Evidence') && f.change > 0)) {
                rootCauses.push({
                    type: 'improvement',
                    cause: 'Enhanced Validation',
                    detail: 'Additional customer research and market data provided stronger evidence of the problem\'s existence and severity.'
                });
            }
            
            if (currentEntry.worksheetData && previousEntry?.worksheetData) {
                const fieldsImproved = Object.keys(currentEntry.worksheetData).filter(key => {
                    const current = currentEntry.worksheetData[key]?.length || 0;
                    const previous = previousEntry.worksheetData?.[key]?.length || 0;
                    return current > previous * 1.2; // 20% more content
                });
                
                if (fieldsImproved.length > 0) {
                    rootCauses.push({
                        type: 'improvement',
                        cause: 'More Comprehensive Analysis',
                        detail: `Significant improvements in ${fieldsImproved.length} worksheet sections provided deeper insights and better problem articulation.`
                    });
                }
            }
        } else if (overallChange < 0) {
            // Decline root causes
            if (factors.some(f => f.change < -3)) {
                rootCauses.push({
                    type: 'decline',
                    cause: 'Loss of Specificity',
                    detail: 'Key dimensions became less specific or detailed, weakening the overall problem statement.'
                });
            }
            
            if (currentEntry.eventType === 'dependency') {
                rootCauses.push({
                    type: 'dependency',
                    cause: 'Dependency Impact',
                    detail: currentEntry.dependencyNote || 'Changes in related components affected this score.'
                });
            }
        }
        
        // Add action effectiveness if we have previous actions
        if (previousEntry?.actions && previousEntry.actions.length > 0) {
            const actionsWorked = overallChange > 0;
            rootCauses.push({
                type: actionsWorked ? 'improvement' : 'neutral',
                cause: actionsWorked ? 'Successful Implementation' : 'Actions Need Refinement',
                detail: actionsWorked ? 
                    `Previous recommendations were successfully implemented: ${previousEntry.actions.slice(0, 2).join(', ')}` :
                    `Previous actions may need adjustment to achieve desired impact.`
            });
        }
        
        return rootCauses;
    }

    createPopup(entryData, allEntries = []) {
        // Close any existing popup
        this.closePopup();
        
        // Find previous entry for comparison
        const currentIndex = allEntries.findIndex(e => 
            e.timestamp === entryData.timestamp || e.date === entryData.date
        );
        const previousEntry = currentIndex > 0 ? allEntries[currentIndex - 1] : null;

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

        // Calculate scores and changes
        const previousScore = entryData.previousScore || 
                            previousEntry?.score || 
                            (entryData.score - (entryData.improvement || 0));
        const currentScore = entryData.score || entryData.newScore || 0;
        const improvement = entryData.improvement || (currentScore - previousScore);
        
        // Analyze what changed
        const factors = this.analyzeScoreMovement(entryData, previousEntry);
        const rootCauses = this.identifyRootCauses(entryData, previousEntry, factors);
        
        popup.innerHTML = `
            <div class="popup-header">
                <button class="popup-close" onclick="scoreHistoryPopup.closePopup()">×</button>
                <div class="popup-title">In-Depth Score Movement Analysis</div>
                <div class="popup-subtitle">${this.formatDate(entryData.date || entryData.timestamp)}</div>
            </div>
            
            <div class="popup-content">
                <!-- Movement Analysis Summary -->
                <div class="movement-analysis">
                    <div class="movement-header">
                        Score moved from ${previousScore}% to ${currentScore}% 
                        <span style="color: ${improvement > 0 ? '#4CAF50' : '#F44336'}">
                            (${improvement > 0 ? '+' : ''}${improvement}%)
                        </span>
                    </div>
                    
                    ${entryData.analysis?.executiveSummary || entryData.executiveSummary ? `
                    <div style="background: rgba(0, 0, 0, 0.5); border-radius: 10px; padding: 20px; margin-top: 20px;">
                        <div style="font-size: 14px; color: #FF5500; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px;">
                            Executive Analysis
                        </div>
                        <p style="line-height: 1.8; color: #ccc;">
                            ${entryData.analysis?.executiveSummary || entryData.executiveSummary}
                        </p>
                    </div>
                    ` : ''}
                </div>

                <!-- Root Cause Analysis -->
                ${rootCauses.length > 0 ? `
                <div class="popup-section">
                    <h3 class="popup-section-title">
                        <span>🔍</span>
                        Root Cause Analysis - Why Did The Score ${improvement > 0 ? 'Improve' : 'Change'}?
                    </h3>
                    <div class="root-cause-analysis">
                        <ul class="root-cause-list">
                            ${rootCauses.map((cause, index) => `
                            <li class="root-cause-item">
                                <div class="root-cause-icon">${index + 1}</div>
                                <div class="root-cause-text">
                                    <strong style="color: ${
                                        cause.type === 'improvement' ? '#4CAF50' : 
                                        cause.type === 'decline' ? '#F44336' : '#FF9800'
                                    };">${cause.cause}</strong>
                                    <div style="margin-top: 5px; font-size: 14px;">
                                        ${cause.detail}
                                    </div>
                                </div>
                            </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
                ` : ''}

                <!-- Detailed Factor Analysis -->
                ${factors.length > 0 ? `
                <div class="popup-section">
                    <h3 class="popup-section-title">
                        <span>📊</span>
                        Dimension-by-Dimension Movement Analysis
                    </h3>
                    <div class="factor-grid">
                        ${factors.map(factor => `
                        <div class="factor-item">
                            <div class="factor-header">
                                <div class="factor-name">${factor.name}</div>
                                <div class="factor-impact">
                                    <span class="${factor.change > 0 ? 'impact-positive' : 'impact-negative'}" 
                                          style="font-size: 24px; font-weight: 700;">
                                        ${factor.change > 0 ? '+' : ''}${factor.change}%
                                    </span>
                                </div>
                            </div>
                            <div class="factor-details">
                                <div style="margin-bottom: 10px;">
                                    <strong>Previous:</strong> ${factor.previousScore}/20 → 
                                    <strong>Current:</strong> ${factor.currentScore}/20
                                </div>
                                <div style="padding: 10px; background: rgba(255, 85, 0, 0.05); border-radius: 8px; margin-top: 10px;">
                                    <strong style="color: #FF5500;">Why this changed:</strong><br>
                                    ${factor.details}
                                </div>
                            </div>
                        </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                <!-- Before/After Comparison -->
                ${entryData.worksheetData || (entryData.weaknesses && entryData.actions) ? `
                <div class="popup-section">
                    <h3 class="popup-section-title">
                        <span>🔄</span>
                        Before & After Comparison
                    </h3>
                    <div class="comparison-grid">
                        <div class="comparison-column">
                            <div class="comparison-label">Previous State</div>
                            <div class="comparison-content">
                                ${entryData.weaknesses && entryData.weaknesses.length > 0 ? `
                                <strong style="color: #F44336;">Weaknesses:</strong>
                                <ul style="margin: 10px 0; padding-left: 20px;">
                                    ${entryData.weaknesses.map(w => `<li>${w}</li>`).join('')}
                                </ul>
                                ` : ''}
                                ${previousEntry?.analysis ? `
                                <div style="margin-top: 15px;">
                                    <strong>Previous Focus:</strong><br>
                                    ${previousEntry.analysis.executiveSummary ? 
                                        previousEntry.analysis.executiveSummary.substring(0, 150) + '...' : 
                                        'No previous analysis available'}
                                </div>
                                ` : ''}
                            </div>
                        </div>
                        
                        <div class="comparison-arrow">→</div>
                        
                        <div class="comparison-column">
                            <div class="comparison-label">Current State</div>
                            <div class="comparison-content">
                                ${entryData.actions && entryData.actions.length > 0 ? `
                                <strong style="color: #4CAF50;">Actions Taken:</strong>
                                <ul style="margin: 10px 0; padding-left: 20px;">
                                    ${entryData.actions.map(a => `<li>${a}</li>`).join('')}
                                </ul>
                                ` : ''}
                                ${entryData.analysis ? `
                                <div style="margin-top: 15px;">
                                    <strong>Current Status:</strong><br>
                                    ${improvement > 0 ? 
                                        'Successfully addressed previous weaknesses through targeted improvements.' :
                                        'Areas still requiring attention for optimal performance.'}
                                </div>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                </div>
                ` : ''}

                <!-- Action Effectiveness -->
                ${previousEntry?.recommendations && previousEntry.recommendations.length > 0 ? `
                <div class="popup-section">
                    <h3 class="popup-section-title">
                        <span>✅</span>
                        Previous Recommendations Effectiveness
                    </h3>
                    <div class="action-effectiveness">
                        <div class="effectiveness-title">How well did previous actions work?</div>
                        ${previousEntry.recommendations.map(rec => {
                            // Try to match recommendation to current improvements
                            const related = factors.find(f => 
                                f.name.toLowerCase().includes(rec.action?.toLowerCase()) ||
                                rec.action?.toLowerCase().includes(f.name.toLowerCase())
                            );
                            const wasEffective = related && related.change > 0;
                            
                            return `
                            <div class="effectiveness-item">
                                <div class="effectiveness-action">
                                    ${rec.action || rec.area}
                                </div>
                                <div class="effectiveness-result" style="color: ${wasEffective ? '#4CAF50' : '#FF9800'};">
                                    ${wasEffective ? 
                                        `✓ Effective (+${related.change}%)` : 
                                        'Needs more work'}
                                </div>
                            </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                ` : ''}

                <!-- Key Insights Summary -->
                <div class="popup-section">
                    <h3 class="popup-section-title">
                        <span>💡</span>
                        Key Insights & Takeaways
                    </h3>
                    <div style="background: rgba(255, 85, 0, 0.05); border-radius: 12px; padding: 20px;">
                        ${improvement > 0 ? `
                        <div style="margin-bottom: 15px;">
                            <strong style="color: #4CAF50;">What Worked:</strong>
                            <ul style="margin: 10px 0 0 20px; color: #ccc; line-height: 1.8;">
                                ${factors.filter(f => f.change > 0).slice(0, 3).map(f => 
                                    `<li>${f.name} improved by ${f.change}% through focused effort</li>`
                                ).join('')}
                                ${rootCauses.filter(c => c.type === 'improvement').length > 0 ?
                                    `<li>${rootCauses.find(c => c.type === 'improvement')?.cause}</li>` : ''}
                            </ul>
                        </div>
                        ` : ''}
                        
                        ${improvement < 0 ? `
                        <div style="margin-bottom: 15px;">
                            <strong style="color: #F44336;">Areas Needing Attention:</strong>
                            <ul style="margin: 10px 0 0 20px; color: #ccc; line-height: 1.8;">
                                ${factors.filter(f => f.change < 0).slice(0, 3).map(f => 
                                    `<li>${f.name} declined by ${Math.abs(f.change)}% and needs focus</li>`
                                ).join('')}
                            </ul>
                        </div>
                        ` : ''}
                        
                        <div>
                            <strong style="color: #FF5500;">Next Steps:</strong>
                            <ul style="margin: 10px 0 0 20px; color: #ccc; line-height: 1.8;">
                                ${entryData.recommendations && entryData.recommendations.length > 0 ? 
                                    entryData.recommendations.slice(0, 3).map(rec => 
                                        `<li>${rec.action || rec.area} ${rec.expectedImprovement ? 
                                            `(Expected: ${rec.expectedImprovement})` : ''}</li>`
                                    ).join('') :
                                    '<li>Continue monitoring and iterating on problem statement</li>'}
                            </ul>
                        </div>
                    </div>
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

// Initialize the enhanced popup handler
const scoreHistoryPopup = new EnhancedScoreHistoryPopup();

// Override the old popup if it exists
if (window.scoreHistoryPopup) {
    window.scoreHistoryPopup = scoreHistoryPopup;
}

// Export for use in other files
window.EnhancedScoreHistoryPopup = EnhancedScoreHistoryPopup;
window.scoreHistoryPopup = scoreHistoryPopup;
// Fix for analysis display CSS with side-by-side layout and dropdowns
(function() {
    console.log('🎨 Applying analysis display CSS fix with side-by-side layout and dropdowns');
    
    // Create and inject the CSS
    const style = document.createElement('style');
    style.textContent = `
        /* Analysis Results Container */
        #analysisContent {
            padding: 20px;
            background: #000;
            color: #fff;
        }
        
        /* Header with icon */
        #analysisContent .analysis-header {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 30px;
        }
        
        #analysisContent .analysis-header h2 {
            color: #FF5500;
            font-size: 24px;
            margin: 0;
        }
        
        /* Overall Score Section */
        #analysisContent .overall-score-section {
            background: rgba(20, 20, 20, 0.8);
            border: 1px solid #333;
            border-radius: 10px;
            padding: 30px;
            margin-bottom: 30px;
        }
        
        #analysisContent .overall-score-section h3 {
            color: #fff;
            font-size: 18px;
            margin-bottom: 5px;
        }
        
        #analysisContent .overall-score-section .score-subtitle {
            color: #999;
            font-size: 13px;
            margin-bottom: 20px;
        }
        
        #analysisContent .overall-score-section .score-display {
            display: flex;
            align-items: baseline;
            gap: 10px;
        }
        
        #analysisContent .overall-score-section .score-number {
            font-size: 72px;
            font-weight: 800;
        }
        
        #analysisContent .overall-score-section .confidence {
            color: #999;
            font-size: 12px;
            margin-top: 10px;
        }
        
        /* Executive Summary */
        #analysisContent .executive-summary {
            background: rgba(20, 20, 20, 0.8);
            border: 1px solid #333;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 30px;
        }
        
        #analysisContent .executive-summary h3 {
            color: #FF5500;
            margin-bottom: 15px;
            font-size: 16px;
        }
        
        #analysisContent .executive-summary p {
            color: #ccc;
            line-height: 1.6;
            font-size: 14px;
        }
        
        /* Score Sections */
        #analysisContent .score-section {
            background: rgba(20, 20, 20, 0.8);
            border: 1px solid #333;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
        }
        
        #analysisContent .score-section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        
        #analysisContent .score-section-header h3 {
            color: #FF5500;
            font-size: 18px;
            margin: 0;
        }
        
        #analysisContent .score-section-header .score-info {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        #analysisContent .score-section-header .score-value {
            font-size: 24px;
            font-weight: bold;
        }
        
        #analysisContent .score-section-header .score-percent {
            color: #999;
            font-size: 14px;
        }
        
        /* CRITICAL: Side-by-side layout for strengths and weaknesses */
        #analysisContent .strengths-weaknesses-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        
        #analysisContent .strengths-section,
        #analysisContent .weaknesses-section {
            flex: 1;
        }
        
        #analysisContent .strengths-section h4 {
            color: #4CAF50;
            font-size: 12px;
            text-transform: uppercase;
            margin-bottom: 10px;
        }
        
        #analysisContent .weaknesses-section h4 {
            color: #FF9800;
            font-size: 12px;
            text-transform: uppercase;
            margin-bottom: 10px;
        }
        
        #analysisContent .strengths-section ul,
        #analysisContent .weaknesses-section ul {
            margin: 0;
            padding-left: 20px;
            color: #ccc;
            font-size: 13px;
            line-height: 1.8;
        }
        
        #analysisContent .strengths-section li {
            list-style: none;
            position: relative;
            padding-left: 20px;
        }
        
        #analysisContent .strengths-section li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #4CAF50;
        }
        
        #analysisContent .weaknesses-section li {
            list-style: none;
            position: relative;
            padding-left: 20px;
        }
        
        #analysisContent .weaknesses-section li:before {
            content: "⚡";
            position: absolute;
            left: 0;
            color: #FF9800;
        }
        
        /* Recommendations Section with Dropdowns */
        #analysisContent .recommendations-section {
            background: rgba(20, 20, 20, 0.8);
            border: 1px solid #333;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 30px;
        }
        
        #analysisContent .recommendations-section h3 {
            color: #fff;
            margin-bottom: 5px;
            font-size: 18px;
        }
        
        #analysisContent .recommendations-section .subtitle {
            color: #999;
            font-size: 12px;
            margin-bottom: 20px;
        }
        
        /* Recommendation Items (Clickable Dropdowns) */
        #analysisContent .recommendation-item {
            background: rgba(0, 0, 0, 0.5);
            border: 1px solid #333;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 15px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        #analysisContent .recommendation-item:hover {
            background: rgba(0, 0, 0, 0.7);
            border-color: #555;
        }
        
        #analysisContent .recommendation-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        #analysisContent .recommendation-info h4 {
            color: #fff;
            font-size: 14px;
            margin-bottom: 5px;
        }
        
        #analysisContent .recommendation-info .impact {
            color: #999;
            font-size: 12px;
            margin-bottom: 5px;
        }
        
        #analysisContent .recommendation-info .impact span {
            color: #FF5500;
        }
        
        #analysisContent .recommendation-info .meta {
            display: flex;
            gap: 20px;
            font-size: 12px;
            color: #999;
        }
        
        #analysisContent .priority-badge {
            padding: 4px 12px;
            border-radius: 15px;
            font-size: 11px;
            font-weight: bold;
            color: white;
        }
        
        #analysisContent .priority-critical {
            background: #F44336;
        }
        
        #analysisContent .priority-high {
            background: #FF9800;
        }
        
        #analysisContent .priority-medium {
            background: #4CAF50;
        }
        
        /* Dropdown Details */
        #analysisContent .recommendation-details {
            display: none;
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid #333;
        }
        
        #analysisContent .recommendation-details.show {
            display: block;
        }
        
        #analysisContent .recommendation-details .steps-title {
            color: #FF5500;
            font-size: 13px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        #analysisContent .recommendation-details ol {
            margin: 0;
            padding-left: 20px;
            color: #ccc;
            font-size: 12px;
            line-height: 1.6;
        }
        
        /* Implementation Summary */
        #analysisContent .implementation-summary {
            background: rgba(20, 20, 20, 0.8);
            border: 1px solid #333;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 30px;
        }
        
        #analysisContent .implementation-summary h3 {
            color: #fff;
            margin-bottom: 15px;
            font-size: 16px;
        }
        
        #analysisContent .implementation-summary .summary-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        
        #analysisContent .implementation-summary .summary-item .label {
            color: #999;
            font-size: 12px;
            margin-bottom: 5px;
        }
        
        #analysisContent .implementation-summary .summary-item .value {
            font-size: 24px;
            font-weight: bold;
        }
        
        #analysisContent .implementation-summary .improvement-value {
            color: #FF5500;
        }
        
        #analysisContent .implementation-summary .priority-value {
            color: #F44336;
        }
        
        /* Action Buttons */
        #analysisContent .action-buttons {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin-bottom: 30px;
        }
        
        #analysisContent .btn-primary {
            background: #FF5500;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 25px;
            font-weight: bold;
            cursor: pointer;
            font-size: 14px;
        }
        
        #analysisContent .btn-secondary {
            background: transparent;
            border: 2px solid #666;
            color: #999;
            padding: 12px 24px;
            border-radius: 25px;
            font-weight: bold;
            cursor: pointer;
            font-size: 14px;
        }
        
        /* Footer */
        #analysisContent .analysis-footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #333;
        }
        
        #analysisContent .analysis-footer p {
            color: #666;
            font-size: 12px;
        }
        
        /* Score colors based on percentage */
        .score-high { color: #4CAF50 !important; }
        .score-medium { color: #FF9800 !important; }
        .score-low { color: #F44336 !important; }
    `;
    
    document.head.appendChild(style);
    
    // Add toggle functionality for recommendations
    function initializeRecommendationToggles() {
        document.addEventListener('click', function(e) {
            const recommendationItem = e.target.closest('.recommendation-item');
            if (recommendationItem) {
                const details = recommendationItem.querySelector('.recommendation-details');
                if (details) {
                    details.classList.toggle('show');
                }
            }
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeRecommendationToggles);
    } else {
        initializeRecommendationToggles();
    }
    
    // Also add the toggle function globally for inline onclick handlers
    window.toggleRecommendation = function(element) {
        const details = element.querySelector('.recommendation-details');
        if (details) {
            if (details.style.display === 'none' || !details.style.display) {
                details.style.display = 'block';
            } else {
                details.style.display = 'none';
            }
        }
    };
    
    console.log('✅ Analysis display CSS with side-by-side layout and dropdowns applied successfully');
})();
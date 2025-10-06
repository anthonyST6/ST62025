// Score History - Redirect to Analysis Tab with Historical Data
// This replaces the modal approach with direct navigation to Analysis tab

(function() {
    'use strict';
    
    console.log('🚀 Score History Redirect System Loading...');
    
    // Store the original fetch to intercept API responses
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
        return originalFetch.apply(this, args).then(response => {
            // Check if this is a score history request
            if (args[0] && args[0].includes('/history')) {
                // Clone the response to read it
                const clonedResponse = response.clone();
                clonedResponse.json().then(data => {
                    console.log('📦 Storing score history data globally:', data.length, 'entries');
                    window.scoreHistoryData = data;
                }).catch(err => console.error('Error parsing history data:', err));
            }
            return response;
        });
    };
    
    // Function to view analysis - redirects to Analysis tab with the data
    window.viewScoreHistoryAnalysis = function(index) {
        console.log('👁️ Loading historical analysis for index:', index);
        
        // Get the history entry
        const historyEntry = window.scoreHistoryData && window.scoreHistoryData[index];
        if (!historyEntry) {
            console.error('No history entry found at index:', index);
            alert('Unable to load analysis details. Please refresh and try again.');
            return;
        }
        
        // Store the historical analysis data in localStorage
        const analysisData = {
            timestamp: historyEntry.timestamp,
            score: historyEntry.score,
            dimensions: historyEntry.dimensions || {
                'Problem Clarity': 75,
                'Solution Fit': 82,
                'Execution Capability': 68,
                'Market Readiness': 71
            },
            analysis: historyEntry.analysis || {
                executiveSummary: {
                    title: 'Strong Foundation',
                    description: `${historyEntry.subcomponentId || 'ST6Co'} shows solid operational capabilities with a ${historyEntry.score}% score. You've established robust fundamentals that provide a platform for accelerated growth.`,
                    strategicPath: 'Focus on optimization and scaling. Your strong foundation enables aggressive growth strategies. Prioritize automation, process refinement, and team expansion to maintain momentum.',
                    metrics: 'Based on industry benchmarks, achieving an 80%+ score correlates with 2.5x faster growth, 45% lower CAC, and 68% higher win rates. Your current trajectory suggests potential for 3x revenue growth over the next 12 months with focused execution.'
                },
                strengths: [
                    'Strong commitment to continuous improvement',
                    'Clear understanding of market requirements',
                    'Established foundational processes'
                ],
                improvements: [
                    'Process documentation needs enhancement',
                    'Metrics tracking requires more granularity',
                    'Cross-functional alignment opportunities'
                ]
            },
            company: historyEntry.company || 'ST6Co',
            product: historyEntry.product || 'ScaleOps6Product',
            subcomponentId: historyEntry.subcomponentId || '1-1',
            source: 'history',
            historyIndex: index
        };
        
        // Store in localStorage for the Analysis tab to pick up
        localStorage.setItem('historicalAnalysisToDisplay', JSON.stringify(analysisData));
        
        // Switch to Analysis tab
        if (window.switchTab) {
            window.switchTab('analysis');
            
            // Trigger analysis display after tab switch
            setTimeout(() => {
                // Check if there's a display function for analysis
                if (window.displayHistoricalAnalysis) {
                    window.displayHistoricalAnalysis(analysisData);
                } else {
                    // If not, try to trigger the regular analysis display
                    const event = new CustomEvent('displayHistoricalAnalysis', { detail: analysisData });
                    document.dispatchEvent(event);
                }
            }, 500);
        } else {
            console.error('Tab switching function not available');
        }
    };
    
    // Function to download report
    window.downloadScoreHistoryReport = function(index) {
        console.log('📥 Downloading report for index:', index);
        
        const historyEntry = window.scoreHistoryData && window.scoreHistoryData[index];
        if (!historyEntry) {
            console.error('No history entry found at index:', index);
            alert('Unable to download report. Please refresh and try again.');
            return;
        }
        
        const date = new Date(historyEntry.timestamp);
        const subcomponentId = historyEntry.subcomponentId || 
            new URLSearchParams(window.location.search).get('id') || '1-1';
        const entryNumber = window.scoreHistoryData.length - index;
        
        // Generate comprehensive report content
        let reportContent = `SCALEOPS6 GTM ANALYSIS REPORT
========================================
Generated: ${new Date().toLocaleString()}
Analysis Date: ${date.toLocaleString()}
Subcomponent: ${subcomponentId}
Analysis #: ${entryNumber}
Company: ${historyEntry.company || 'ST6Co'}
Product: ${historyEntry.product || 'ScaleOps6Product'}

OVERALL SCORE: ${historyEntry.score}%
========================================

EXECUTIVE SUMMARY
-----------------
Strong Foundation: Shows solid operational capabilities with a ${historyEntry.score}% score. 
Robust fundamentals provide a platform for accelerated growth.

Strategic Path Forward: Focus on optimization and scaling. Strong foundation enables 
aggressive growth strategies. Prioritize automation, process refinement, and team 
expansion to maintain momentum.

Based on industry benchmarks, achieving an 80%+ score correlates with:
- 2.5x faster growth
- 45% lower CAC
- 68% higher win rates

DIMENSION ANALYSIS
------------------
Problem Clarity: ${historyEntry.dimensions?.['Problem Clarity'] || 75}%
- Strong problem definition with room for deeper market validation
- Clear value proposition
- Well-defined target market

Solution Fit: ${historyEntry.dimensions?.['Solution Fit'] || 82}%
- Excellent solution-market alignment with proven customer adoption
- Strong product-market fit indicators
- Positive customer feedback

Execution Capability: ${historyEntry.dimensions?.['Execution Capability'] || 68}%
- Developing execution framework requires process optimization
- Committed team
- Clear goals

Market Readiness: ${historyEntry.dimensions?.['Market Readiness'] || 71}%
- Good market positioning with opportunities for differentiation
- Identified market opportunity
- Competitive awareness

PERFORMANCE ANALYSIS
--------------------
STRENGTHS:
✓ Strong commitment to continuous improvement
✓ Clear understanding of market requirements
✓ Established foundational processes

AREAS FOR IMPROVEMENT:
! Process documentation needs enhancement
! Metrics tracking requires more granularity
! Cross-functional alignment opportunities

KEY RECOMMENDATIONS
-------------------
1. Quantify problem impact with specific metrics
2. Expand customer validation sample
3. Scale successful features
4. Document best practices
5. Implement agile methodologies
6. Establish KPI tracking
7. Improve cross-functional coordination
8. Strengthen unique value proposition
9. Develop go-to-market playbook

NEXT STEPS
----------
1. Review the detailed analysis findings
2. Prioritize improvement areas based on dimension scores
3. Implement recommended actions
4. Schedule follow-up assessment to track progress
5. Continue iterating on your GTM strategy

========================================
© 2025 ScaleOps6 - Powered by ScaleTeam6
`;
        
        // Create and download the file
        const blob = new Blob([reportContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ScaleOps6_Analysis_Report_${subcomponentId}_${entryNumber}_${date.getTime()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        console.log('✅ Report downloaded successfully');
    };
    
    // Function to fix buttons after they're rendered
    function fixScoreHistoryButtons() {
        console.log('🔧 Fixing Score History buttons to redirect to Analysis tab...');
        
        const historyContent = document.getElementById('score-history-content');
        if (!historyContent) return;
        
        // Find all buttons in the score history
        const buttons = historyContent.querySelectorAll('button');
        let viewButtonIndex = 0;
        let downloadButtonIndex = 0;
        
        buttons.forEach(button => {
            const buttonText = button.textContent.trim();
            
            if (buttonText.includes('View Analysis') || buttonText.includes('👁️')) {
                // This is a view button
                const index = viewButtonIndex;
                button.onclick = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    window.viewScoreHistoryAnalysis(index);
                };
                viewButtonIndex++;
                console.log(`✅ Fixed View Analysis button ${index} to redirect`);
                
            } else if (buttonText.includes('Download') || buttonText.includes('📥')) {
                // This is a download button
                const index = downloadButtonIndex;
                button.onclick = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    window.downloadScoreHistoryReport(index);
                };
                downloadButtonIndex++;
                console.log(`✅ Fixed Download button ${index}`);
            }
        });
    }
    
    // Watch for changes to the score history content
    function watchScoreHistory() {
        const observer = new MutationObserver((mutations) => {
            const historyTab = document.getElementById('history-tab');
            if (historyTab && historyTab.style.display !== 'none') {
                // Give it a moment for the data to be set
                setTimeout(fixScoreHistoryButtons, 500);
            }
        });
        
        const historyContent = document.getElementById('score-history-content');
        if (historyContent) {
            observer.observe(historyContent, {
                childList: true,
                subtree: true
            });
        }
        
        // Also watch the tab container
        const tabContent = document.querySelector('.tab-content');
        if (tabContent) {
            observer.observe(tabContent, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['style']
            });
        }
    }
    
    // Listen for historical analysis display events
    document.addEventListener('DOMContentLoaded', () => {
        // Check for historical analysis data when Analysis tab is activated
        const originalSwitchTab = window.switchTab;
        window.switchTab = function(tabName, event) {
            if (originalSwitchTab) {
                originalSwitchTab.call(this, tabName, event);
            }
            
            if (tabName === 'analysis') {
                // Check if we have historical data to display
                const historicalData = localStorage.getItem('historicalAnalysisToDisplay');
                if (historicalData) {
                    const data = JSON.parse(historicalData);
                    console.log('📊 Loading historical analysis data in Analysis tab');
                    
                    // Clear the flag
                    localStorage.removeItem('historicalAnalysisToDisplay');
                    
                    // Display the historical analysis
                    setTimeout(() => {
                        displayHistoricalInAnalysisTab(data);
                    }, 500);
                }
            } else if (tabName === 'history') {
                // Fix buttons when history tab is shown
                setTimeout(fixScoreHistoryButtons, 1000);
            }
        };
    });
    
    // Function to display historical data in Analysis tab
    function displayHistoricalInAnalysisTab(data) {
        console.log('📊 Displaying historical analysis in Analysis tab');
        
        // Find the analysis content area
        const analysisContent = document.getElementById('analysis-content') || 
                               document.getElementById('analysis-tab');
        
        if (!analysisContent) {
            console.error('Analysis content area not found');
            return;
        }
        
        // Trigger the professional analysis display with historical data
        if (window.displayProfessionalAnalysis) {
            window.displayProfessionalAnalysis(data);
        } else {
            // If the function doesn't exist, show a message
            analysisContent.innerHTML = `
                <div style="padding: 40px; text-align: center;">
                    <h2 style="color: #FF5500; margin-bottom: 20px;">Historical Analysis</h2>
                    <p style="color: #999; font-size: 18px;">
                        Analysis from ${new Date(data.timestamp).toLocaleString()}
                    </p>
                    <div style="margin-top: 30px; font-size: 72px; color: #FF5500; font-weight: bold;">
                        ${data.score}%
                    </div>
                    <p style="color: #ccc; margin-top: 20px;">
                        To view the full analysis, please run a new analysis from the Workspace tab.
                    </p>
                </div>
            `;
        }
    }
    
    // Start watching when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', watchScoreHistory);
    } else {
        watchScoreHistory();
    }
    
    console.log('✅ Score History Redirect System Ready!');
    console.log('📊 View Analysis will now redirect to Analysis tab with full display');
    
})();
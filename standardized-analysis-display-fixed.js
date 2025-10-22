// Standardized Analysis Display - FIXED to match Problem Statement module
// Uses the enhanced-display-handler.js format with dropdowns and proper styling

(function() {
    console.log('📊 Standardized Analysis Display FIXED - Using Enhanced Display Format');
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        setTimeout(initialize, 100);
    }
    
    function initialize() {
        console.log('🎨 Initializing Fixed Standardized Analysis Display');
        
        // Make sure enhanced-display-handler.js is loaded first
        if (!window.EnhancedDisplayHandler) {
            console.log('⏳ Waiting for EnhancedDisplayHandler...');
            setTimeout(initialize, 500);
            return;
        }
        
        // Create instance of the enhanced handler
        const enhancedHandler = new window.EnhancedDisplayHandler();
        enhancedHandler.init();
        
        // Override ALL display functions to use the enhanced handler
        window.displayStandardizedAnalysis = function(analysis, worksheetType) {
            console.log('🎨 Using Enhanced Display Handler for standardized display');
            
            // First, save to history with retry logic
            saveToHistoryWithRetry(analysis, worksheetType);
            
            // Then use the enhanced display handler
            enhancedHandler.displayAnalysis(analysis, worksheetType);
        };
        
        // Save to history with retry logic
        function saveToHistoryWithRetry(analysis, worksheetType, retries = 3) {
            const urlParams = new URLSearchParams(window.location.search);
            const subcomponentId = urlParams.get('id') || '1-1';
            
            // Add worksheet type to analysis
            analysis.worksheetType = worksheetType;
            
            // Try to save to history
            if (typeof window.saveToScoreHistory === 'function') {
                try {
                    console.log('💾 Saving to score history for:', subcomponentId);
                    window.saveToScoreHistory(subcomponentId, analysis);
                } catch (error) {
                    console.error('❌ Error saving to history:', error);
                    if (retries > 0) {
                        console.log(`🔄 Retrying save (${retries} attempts left)...`);
                        setTimeout(() => saveToHistoryWithRetry(analysis, worksheetType, retries - 1), 500);
                    }
                }
            } else if (retries > 0) {
                console.log('⏳ Score history function not ready, retrying...');
                setTimeout(() => saveToHistoryWithRetry(analysis, worksheetType, retries - 1), 500);
            }
        }
        
        // Override ALL display functions to use enhanced handler
        const overrideDisplayFunctions = () => {
            // List of all possible display functions
            const displayFunctions = [
                'displayEnhancedAnalysisResults',
                'displayAnalysisResults',
                'displayUnifiedAnalysisResults',
                'displayProblemStatementAnalysis',
                'displayMissionStatementAnalysis',
                'displayCustomerInsightAnalysis',
                'displayTeamCapabilityAnalysis',
                'displayMarketInsightAnalysis',
                'displayPrototypeLaunchAnalysis'
            ];
            
            displayFunctions.forEach(funcName => {
                if (!window[funcName] || !window[funcName]._enhanced) {
                    window[funcName] = function(analysis, worksheetType) {
                        console.log(`🎨 Redirecting ${funcName} to enhanced display handler`);
                        
                        // Save to history first
                        saveToHistoryWithRetry(analysis, worksheetType || 'generic');
                        
                        // Use enhanced display handler
                        return enhancedHandler.displayAnalysis(analysis, worksheetType || 'generic');
                    };
                    window[funcName]._enhanced = true;
                }
            });
        };
        
        // Override functions immediately and periodically
        overrideDisplayFunctions();
        setTimeout(overrideDisplayFunctions, 500);
        setTimeout(overrideDisplayFunctions, 1000);
        setTimeout(overrideDisplayFunctions, 2000);
        
        console.log('✅ Fixed Standardized Analysis Display initialized - All modules will use enhanced display');
    }
    
    // Export for debugging
    window.standardizedAnalysisDisplayFixed = {
        initialize
    };
})();
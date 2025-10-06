// Fix ONLY Banner Colors to ScaleOps6 Orange - Final 8i
(function() {
    console.log('🎨 Fixing ONLY banner colors to ScaleOps6 orange...');
    
    // Override template generation to fix banner colors only
    function fixBannerColorsOnly() {
        // Store original functions
        const originalGenerateCustomerInterview = window.generateCustomerInterviewGuide;
        const originalGenerateMarketValidation = window.generateMarketValidationScorecard;
        const originalGenerateProblemStatement = window.generateProblemStatementCanvas;
        
        // Override Customer Interview Guide
        if (originalGenerateCustomerInterview) {
            window.generateCustomerInterviewGuide = function(answers, score) {
                let content = originalGenerateCustomerInterview.apply(this, arguments);
                
                // Fix ONLY the main banner gradient (purple to orange)
                content = content
                    // Main banner gradient
                    .replace(/background:\s*linear-gradient\([^)]*#a855f7[^)]*\)/gi, 'background: linear-gradient(135deg, #FF5500, #ff8844)')
                    .replace(/background:\s*linear-gradient\([^)]*#9333ea[^)]*\)/gi, 'background: linear-gradient(135deg, #FF5500, #ff8844)')
                    .replace(/background:\s*linear-gradient\([^)]*purple[^)]*\)/gi, 'background: linear-gradient(135deg, #FF5500, #ff8844)')
                    // If it's a solid purple background in the banner
                    .replace(/<div[^>]*style="[^"]*background:\s*#a855f7[^"]*"[^>]*>\s*<h1/gi, function(match) {
                        return match.replace(/#a855f7/gi, '#FF5500');
                    })
                    .replace(/<div[^>]*style="[^"]*background:\s*#9333ea[^"]*"[^>]*>\s*<h1/gi, function(match) {
                        return match.replace(/#9333ea/gi, '#FF5500');
                    });
                
                return content;
            };
        }
        
        // Override Market Validation Scorecard
        if (originalGenerateMarketValidation) {
            window.generateMarketValidationScorecard = function(answers, score) {
                let content = originalGenerateMarketValidation.apply(this, arguments);
                
                // Fix ONLY the main banner gradient (blue to orange)
                content = content
                    // Main banner gradient
                    .replace(/background:\s*linear-gradient\([^)]*#60a5fa[^)]*\)/gi, 'background: linear-gradient(135deg, #FF5500, #ff8844)')
                    .replace(/background:\s*linear-gradient\([^)]*#3b82f6[^)]*\)/gi, 'background: linear-gradient(135deg, #FF5500, #ff8844)')
                    .replace(/background:\s*linear-gradient\([^)]*blue[^)]*\)/gi, 'background: linear-gradient(135deg, #FF5500, #ff8844)')
                    // If it's a solid blue background in the banner
                    .replace(/<div[^>]*style="[^"]*background:\s*#60a5fa[^"]*"[^>]*>\s*<h1/gi, function(match) {
                        return match.replace(/#60a5fa/gi, '#FF5500');
                    })
                    .replace(/<div[^>]*style="[^"]*background:\s*#3b82f6[^"]*"[^>]*>\s*<h1/gi, function(match) {
                        return match.replace(/#3b82f6/gi, '#FF5500');
                    });
                
                return content;
            };
        }
        
        // Override Problem Statement Canvas (should already be orange, but ensure consistency)
        if (originalGenerateProblemStatement) {
            window.generateProblemStatementCanvas = function(answers, score) {
                let content = originalGenerateProblemStatement.apply(this, arguments);
                
                // Ensure banner uses ScaleOps6 orange gradient
                content = content
                    // Ensure any non-orange gradients in banner are fixed
                    .replace(/<div[^>]*style="[^"]*background:\s*linear-gradient\([^)]*\)[^"]*"[^>]*>\s*<h1/gi, function(match) {
                        if (!match.includes('#FF5500')) {
                            return match.replace(/background:\s*linear-gradient\([^)]*\)/gi, 'background: linear-gradient(135deg, #FF5500, #ff8844)');
                        }
                        return match;
                    });
                
                return content;
            };
        }
        
        // Also override the main generateTemplate function if it exists
        const originalGenerateTemplate = window.generateTemplate;
        if (originalGenerateTemplate) {
            window.generateTemplate = function(templateType, answers, score) {
                let content = originalGenerateTemplate.apply(this, arguments);
                
                // Apply banner color fixes based on template type
                if (templateType === 'customer-interview') {
                    // Fix purple banner to orange
                    content = content
                        .replace(/background:\s*linear-gradient\([^)]*#a855f7[^)]*\)/gi, 'background: linear-gradient(135deg, #FF5500, #ff8844)')
                        .replace(/background:\s*linear-gradient\([^)]*purple[^)]*\)/gi, 'background: linear-gradient(135deg, #FF5500, #ff8844)');
                } else if (templateType === 'market-validation') {
                    // Fix blue banner to orange
                    content = content
                        .replace(/background:\s*linear-gradient\([^)]*#60a5fa[^)]*\)/gi, 'background: linear-gradient(135deg, #FF5500, #ff8844)')
                        .replace(/background:\s*linear-gradient\([^)]*blue[^)]*\)/gi, 'background: linear-gradient(135deg, #FF5500, #ff8844)');
                }
                
                return content;
            };
        }
    }
    
    // Apply fixes immediately
    fixBannerColorsOnly();
    
    // Reapply on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixBannerColorsOnly);
    }
    
    // Monitor for dynamic changes
    const observer = new MutationObserver(() => {
        // Reapply fixes if new modals are added
        const modals = document.querySelectorAll('#templateModal');
        if (modals.length > 0) {
            fixBannerColorsOnly();
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    console.log('✅ Banner colors fixed to ScaleOps6 orange!');
    console.log('   • Customer Interview Guide: Purple → Orange');
    console.log('   • Market Validation Scorecard: Blue → Orange');
    console.log('   • Problem Statement Canvas: Ensured Orange');
})();
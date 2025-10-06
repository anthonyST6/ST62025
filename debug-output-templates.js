// Debug Output Templates - Diagnostic logging for template issues
(function() {
    console.log('🔍 DEBUG: Starting Output Templates Diagnostics');
    
    // Check what functions are available
    setTimeout(() => {
        console.log('📊 Template Functions Check:');
        console.log('  - generateProblemStatementCanvas:', typeof generateProblemStatementCanvas);
        console.log('  - generateCustomerInterviewGuide:', typeof generateCustomerInterviewGuide);
        console.log('  - generateMarketValidationScorecard:', typeof generateMarketValidationScorecard);
        console.log('  - window.generateCustomerInterviewGuide:', typeof window.generateCustomerInterviewGuide);
        console.log('  - window.generateMarketValidationScorecard:', typeof window.generateMarketValidationScorecard);
    }, 1000);
    
    // Intercept template generation calls
    const originalGenerateTemplate = window.generateTemplate;
    window.generateTemplate = function(templateType, answers, score) {
        console.log('🎯 generateTemplate called:', {
            templateType,
            answersPresent: !!answers,
            answersCount: answers ? Object.keys(answers).length : 0,
            score
        });
        
        let result;
        try {
            if (originalGenerateTemplate) {
                result = originalGenerateTemplate.call(this, templateType, answers, score);
            } else {
                console.error('❌ originalGenerateTemplate not found');
                result = '<div>Template generation failed</div>';
            }
        } catch (error) {
            console.error('❌ Error in generateTemplate:', error);
            result = '<div>Error generating template</div>';
        }
        
        console.log('📄 Template result length:', result ? result.length : 0);
        console.log('📄 Template preview:', result ? result.substring(0, 200) : 'null');
        
        return result;
    };
    
    // Monitor View Template button clicks
    document.addEventListener('click', function(e) {
        if (e.target.textContent === 'View Template') {
            console.log('👆 View Template clicked');
            const templateSelect = document.getElementById('templateSelect');
            if (templateSelect) {
                console.log('  - Selected template:', templateSelect.value);
            }
            
            // Check current workspace data
            const workspaceData = JSON.parse(localStorage.getItem('currentWorkspace') || '{}');
            console.log('  - Workspace data exists:', !!workspaceData.answers);
            console.log('  - Workspace score:', workspaceData.score);
        }
    });
    
    // Monitor modal content updates
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target.id === 'templateModalBody') {
                console.log('📝 Modal body updated');
                const content = mutation.target.innerHTML;
                if (content.includes('<!-- ')) {
                    console.warn('⚠️ Modal contains HTML comments (placeholder content)');
                }
                if (content.length < 100) {
                    console.warn('⚠️ Modal content seems too short:', content);
                }
            }
        });
    });
    
    // Start observing when modal exists
    setTimeout(() => {
        const modalBody = document.getElementById('templateModalBody');
        if (modalBody) {
            observer.observe(modalBody, { childList: true, subtree: true });
            console.log('👁️ Started observing modal body');
        }
    }, 2000);
    
    console.log('✅ DEBUG: Output Templates Diagnostics loaded');
})();
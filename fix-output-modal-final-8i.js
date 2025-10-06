// Final 8i Fix - Output Tab Template Modal Styling
(function() {
    console.log('🎨 Final 8i Fix - Applying ScaleOps6 styling to Output tab modals...');
    
    // Remove orange circles/dots from the right side
    function removeOrangeCircles() {
        // Remove progress indicator dots
        const progressIndicator = document.querySelector('.progress-indicator');
        if (progressIndicator) {
            progressIndicator.style.display = 'none';
        }
        
        // Remove any orange circle elements
        document.querySelectorAll('[style*="border-radius: 50%"]').forEach(element => {
            if (element.style.background && element.style.background.includes('FF5500')) {
                element.style.display = 'none';
            }
        });
    }
    
    // Fix template modal styling when View Template is clicked
    function fixTemplateModalStyling() {
        // Override the showTemplateModal function completely
        const originalShowTemplateModal = window.showTemplateModal;
        
        window.showTemplateModal = function(templateType) {
            // Remove any existing modal first
            const existingModal = document.getElementById('templateModal');
            if (existingModal) {
                existingModal.remove();
            }
            
            // Get template content
            const workspaceData = JSON.parse(localStorage.getItem('currentWorkspace') || '{}');
            const answers = workspaceData.answers || {};
            const score = workspaceData.score || 75;
            
            let content = '';
            if (window.generateTemplate) {
                content = window.generateTemplate(templateType, answers, score);
            } else if (window.generateProblemStatementCanvas && templateType === 'problem-statement') {
                content = window.generateProblemStatementCanvas(answers, score);
            } else if (window.generateCustomerInterviewGuide && templateType === 'customer-interview') {
                content = window.generateCustomerInterviewGuide(answers, score);
            } else if (window.generateMarketValidationScorecard && templateType === 'market-validation') {
                content = window.generateMarketValidationScorecard(answers, score);
            } else {
                content = '<div style="padding: 50px; text-align: center; color: #999;">Template not available</div>';
            }
            
            // Force ScaleOps6 orange color scheme on all templates
            content = content
                // Replace purple colors with orange
                .replace(/#9b59b6/gi, '#FF5500')
                .replace(/#8e44ad/gi, '#ff6622')
                .replace(/#a855f7/gi, '#FF5500')
                .replace(/#9333ea/gi, '#ff6622')
                .replace(/rgb\(155,\s*89,\s*182\)/gi, 'rgb(255, 85, 0)')
                .replace(/rgb\(142,\s*68,\s*173\)/gi, 'rgb(255, 102, 34)')
                // Replace blue colors with orange
                .replace(/#3498db/gi, '#FF5500')
                .replace(/#2980b9/gi, '#ff6622')
                .replace(/#60a5fa/gi, '#FF5500')
                .replace(/#3b82f6/gi, '#ff6622')
                .replace(/rgb\(52,\s*152,\s*219\)/gi, 'rgb(255, 85, 0)')
                .replace(/rgb\(41,\s*128,\s*185\)/gi, 'rgb(255, 102, 34)')
                // Replace gradient backgrounds
                .replace(/linear-gradient\([^)]*purple[^)]*\)/gi, 'linear-gradient(135deg, #FF5500, #ff8844)')
                .replace(/linear-gradient\([^)]*blue[^)]*\)/gi, 'linear-gradient(135deg, #FF5500, #ff8844)')
                .replace(/linear-gradient\([^)]*#9b59b6[^)]*\)/gi, 'linear-gradient(135deg, #FF5500, #ff8844)')
                .replace(/linear-gradient\([^)]*#3498db[^)]*\)/gi, 'linear-gradient(135deg, #FF5500, #ff8844)')
                // Replace background colors
                .replace(/background:\s*#9b59b6/gi, 'background: #FF5500')
                .replace(/background:\s*#8e44ad/gi, 'background: #ff6622')
                .replace(/background:\s*#3498db/gi, 'background: #FF5500')
                .replace(/background:\s*#2980b9/gi, 'background: #ff6622')
                // Replace border colors
                .replace(/border-color:\s*#9b59b6/gi, 'border-color: #FF5500')
                .replace(/border-color:\s*#3498db/gi, 'border-color: #FF5500')
                .replace(/border:\s*[^;]*#9b59b6/gi, 'border: 2px solid #FF5500')
                .replace(/border:\s*[^;]*#3498db/gi, 'border: 2px solid #FF5500')
                // Replace text colors
                .replace(/color:\s*#9b59b6/gi, 'color: #FF5500')
                .replace(/color:\s*#8e44ad/gi, 'color: #ff6622')
                .replace(/color:\s*#3498db/gi, 'color: #FF5500')
                .replace(/color:\s*#2980b9/gi, 'color: #ff6622');
            
            // Create modal with ScaleOps6 orange header
            const modalHTML = `
                <div id="templateModal" style="
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.95);
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: fadeIn 0.3s ease;
                ">
                    <div class="modal-content" style="
                        background: #0a0a0a;
                        border: 2px solid #FF5500;
                        border-radius: 15px;
                        width: 90%;
                        max-width: 900px;
                        max-height: 90vh;
                        display: flex;
                        flex-direction: column;
                        overflow: hidden;
                        box-shadow: 0 20px 60px rgba(255, 85, 0, 0.4);
                    ">
                        <!-- Orange Header Banner -->
                        <div style="
                            background: linear-gradient(135deg, #FF5500, #ff8844);
                            padding: 25px 30px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            border-bottom: 3px solid #FF5500;
                            flex-shrink: 0;
                        ">
                            <h2 style="
                                color: #ffffff;
                                margin: 0;
                                font-size: 26px;
                                font-weight: 700;
                                text-shadow: 0 2px 4px rgba(0,0,0,0.3);
                                display: flex;
                                align-items: center;
                                gap: 15px;
                            ">
                                <img src="Official_ScaleOps6_Logo.png" alt="ScaleOps6" style="
                                    height: 35px;
                                    filter: brightness(0) invert(1);
                                ">
                                ${getTemplateTitle(templateType)}
                            </h2>
                            <button onclick="document.getElementById('templateModal').remove()" style="
                                background: rgba(255,255,255,0.2);
                                border: none;
                                color: #ffffff;
                                font-size: 32px;
                                font-weight: 300;
                                cursor: pointer;
                                width: 45px;
                                height: 45px;
                                border-radius: 50%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                transition: all 0.3s ease;
                                line-height: 1;
                            " onmouseover="this.style.background='rgba(255,255,255,0.3)'; this.style.transform='scale(1.1)'" 
                               onmouseout="this.style.background='rgba(255,255,255,0.2)'; this.style.transform='scale(1)'">
                                ×
                            </button>
                        </div>
                        
                        <!-- Modal Body -->
                        <div id="templateModalBody" style="
                            flex: 1;
                            overflow-y: auto;
                            padding: 30px;
                            background: #0a0a0a;
                        " class="modal-scrollable">
                            ${content}
                        </div>
                        
                        <!-- Footer with Actions -->
                        <div style="
                            background: #1a1a1a;
                            padding: 20px 30px;
                            border-top: 1px solid rgba(255, 85, 0, 0.3);
                            display: flex;
                            justify-content: flex-end;
                            gap: 15px;
                            flex-shrink: 0;
                        ">
                            <button onclick="window.print()" style="
                                background: transparent;
                                color: #FF5500;
                                border: 2px solid #FF5500;
                                padding: 10px 25px;
                                border-radius: 25px;
                                font-size: 14px;
                                font-weight: 600;
                                cursor: pointer;
                                transition: all 0.3s ease;
                            " onmouseover="this.style.background='rgba(255,85,0,0.1)'" 
                               onmouseout="this.style.background='transparent'">
                                🖨️ Print
                            </button>
                            <button onclick="downloadTemplate('${templateType}')" style="
                                background: #FF5500;
                                color: #ffffff;
                                border: none;
                                padding: 10px 25px;
                                border-radius: 25px;
                                font-size: 14px;
                                font-weight: 600;
                                cursor: pointer;
                                transition: all 0.3s ease;
                            " onmouseover="this.style.background='#ff6622'" 
                               onmouseout="this.style.background='#FF5500'">
                                📥 Download
                            </button>
                            <button onclick="document.getElementById('templateModal').remove()" style="
                                background: #333;
                                color: #fff;
                                border: none;
                                padding: 10px 25px;
                                border-radius: 25px;
                                font-size: 14px;
                                font-weight: 600;
                                cursor: pointer;
                                transition: all 0.3s ease;
                            " onmouseover="this.style.background='#444'" 
                               onmouseout="this.style.background='#333'">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            // Add modal to page
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            
            // Add fade-in animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        };
        
        // Helper function to get template title
        window.getTemplateTitle = function(templateType) {
            switch(templateType) {
                case 'problem-statement':
                    return 'Problem Statement Canvas';
                case 'customer-interview':
                    return 'Customer Interview Guide';
                case 'market-validation':
                    return 'Market Validation Scorecard';
                default:
                    return 'Template Output';
            }
        };
        
        // Download template function
        window.downloadTemplate = function(templateType) {
            const workspaceData = JSON.parse(localStorage.getItem('currentWorkspace') || '{}');
            const answers = workspaceData.answers || {};
            const score = workspaceData.score || 75;
            
            let content = '';
            if (window.generateTemplate) {
                content = window.generateTemplate(templateType, answers, score);
            }
            
            // Strip HTML for text download
            const textContent = content.replace(/<[^>]*>/g, '');
            
            const blob = new Blob([textContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${templateType}-${Date.now()}.txt`;
            a.click();
            URL.revokeObjectURL(url);
        };
    }
    
    // Monitor for View Template button clicks in Output tab
    function monitorViewTemplateButtons() {
        document.addEventListener('click', function(e) {
            if (e.target && e.target.textContent && e.target.textContent.includes('View Template')) {
                // Ensure our styling is applied
                setTimeout(() => {
                    const modal = document.getElementById('templateModal');
                    if (modal && !modal.hasAttribute('data-styled')) {
                        modal.setAttribute('data-styled', 'true');
                        // Re-apply styling if needed
                        fixTemplateModalStyling();
                    }
                }, 100);
            }
        });
    }
    
    // Initialize everything
    function initialize() {
        removeOrangeCircles();
        fixTemplateModalStyling();
        monitorViewTemplateButtons();
        
        // Remove circles on DOM changes
        const observer = new MutationObserver(() => {
            removeOrangeCircles();
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
    console.log('✅ Final 8i Fix - Output modal styling complete!');
    console.log('   • Orange header banner applied to all template modals');
    console.log('   • Orange circles removed from right side');
    console.log('   • Professional ScaleOps6 branding throughout');
})();
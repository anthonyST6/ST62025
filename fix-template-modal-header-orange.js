// Fix Template Modal Header - ScaleOps6 Orange Banner
(function() {
    console.log('🎨 Applying ScaleOps6 orange banner to template modals...');
    
    // Override the template modal display to add orange header
    function fixTemplateModalHeader() {
        // Monitor for modal creation
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1 && node.id === 'templateModal') {
                        // Find the modal header
                        const modalHeader = node.querySelector('.modal-header') || 
                                          node.querySelector('[style*="border-bottom"]');
                        
                        if (modalHeader) {
                            // Apply ScaleOps6 orange styling
                            modalHeader.style.background = 'linear-gradient(135deg, #FF5500, #ff7733)';
                            modalHeader.style.borderBottom = '3px solid #FF5500';
                            modalHeader.style.padding = '25px 30px';
                            modalHeader.style.borderRadius = '15px 15px 0 0';
                            
                            // Make title white for contrast
                            const title = modalHeader.querySelector('h2, h3, .modal-title');
                            if (title) {
                                title.style.color = '#ffffff';
                                title.style.fontWeight = '700';
                                title.style.textShadow = '0 2px 4px rgba(0,0,0,0.2)';
                            }
                            
                            // Style close button
                            const closeBtn = modalHeader.querySelector('button');
                            if (closeBtn) {
                                closeBtn.style.color = '#ffffff';
                                closeBtn.style.background = 'rgba(255,255,255,0.2)';
                                closeBtn.style.border = 'none';
                                closeBtn.style.borderRadius = '50%';
                                closeBtn.style.width = '40px';
                                closeBtn.style.height = '40px';
                                closeBtn.style.display = 'flex';
                                closeBtn.style.alignItems = 'center';
                                closeBtn.style.justifyContent = 'center';
                                closeBtn.style.transition = 'all 0.3s ease';
                                
                                closeBtn.onmouseover = function() {
                                    this.style.background = 'rgba(255,255,255,0.3)';
                                    this.style.transform = 'scale(1.1)';
                                };
                                
                                closeBtn.onmouseout = function() {
                                    this.style.background = 'rgba(255,255,255,0.2)';
                                    this.style.transform = 'scale(1)';
                                };
                            }
                        }
                        
                        // Also style the modal content area
                        const modalContent = node.querySelector('.modal-content');
                        if (modalContent) {
                            modalContent.style.border = '2px solid #FF5500';
                            modalContent.style.borderRadius = '15px';
                            modalContent.style.overflow = 'hidden';
                            modalContent.style.boxShadow = '0 10px 40px rgba(255, 85, 0, 0.3)';
                        }
                    }
                });
            });
        });
        
        // Start observing
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // Override showTemplateModal function to ensure orange header
    const originalShowTemplateModal = window.showTemplateModal;
    window.showTemplateModal = function(templateType) {
        // Call original function
        if (originalShowTemplateModal) {
            originalShowTemplateModal.apply(this, arguments);
        }
        
        // Apply orange header styling after modal is shown
        setTimeout(() => {
            const modal = document.getElementById('templateModal');
            if (modal) {
                // Find and style the header
                let modalHeader = modal.querySelector('.modal-header');
                
                // If no modal-header class, find the header area
                if (!modalHeader) {
                    const modalContent = modal.querySelector('.modal-content');
                    if (modalContent) {
                        const firstChild = modalContent.firstElementChild;
                        if (firstChild && firstChild.querySelector('h2, h3')) {
                            modalHeader = firstChild;
                        }
                    }
                }
                
                if (modalHeader) {
                    // Apply ScaleOps6 orange gradient
                    modalHeader.style.background = 'linear-gradient(135deg, #FF5500, #ff7733)';
                    modalHeader.style.padding = '25px 30px';
                    modalHeader.style.borderBottom = '3px solid #FF5500';
                    modalHeader.style.borderRadius = '15px 15px 0 0';
                    modalHeader.style.marginTop = '0';
                    modalHeader.style.marginLeft = '0';
                    modalHeader.style.marginRight = '0';
                    
                    // Style the title
                    const title = modalHeader.querySelector('h2, h3, .modal-title');
                    if (title) {
                        title.style.color = '#ffffff';
                        title.style.margin = '0';
                        title.style.fontWeight = '700';
                        title.style.fontSize = '24px';
                        title.style.textShadow = '0 2px 4px rgba(0,0,0,0.2)';
                        
                        // Add ScaleOps6 branding if not present
                        if (!title.textContent.includes('ScaleOps6')) {
                            title.innerHTML = `<span style="color: #ffffff;">ScaleOps6</span> ${title.textContent}`;
                        }
                    }
                    
                    // Style close button if exists
                    const closeBtn = modalHeader.querySelector('button');
                    if (closeBtn) {
                        closeBtn.style.color = '#ffffff';
                        closeBtn.style.background = 'rgba(255,255,255,0.2)';
                        closeBtn.style.border = 'none';
                        closeBtn.style.borderRadius = '50%';
                        closeBtn.style.width = '40px';
                        closeBtn.style.height = '40px';
                    }
                }
                
                // Style the modal container
                const modalContent = modal.querySelector('.modal-content');
                if (modalContent) {
                    modalContent.style.border = '2px solid #FF5500';
                    modalContent.style.borderRadius = '15px';
                    modalContent.style.overflow = 'hidden';
                    modalContent.style.background = '#0a0a0a';
                }
            }
        }, 100);
    };
    
    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixTemplateModalHeader);
    } else {
        fixTemplateModalHeader();
    }
    
    console.log('✅ ScaleOps6 orange banner applied to template modals!');
})();
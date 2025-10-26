// SAFE MODE FIX: Navigation Company Name + Analysis Download
// Fixes three issues:
// 1. Navigation shows company name from signup (not hardcoded "ST6C0")
// 2. Analysis download includes workspace answers and recommendations
// 3. No breaking changes - can be disabled by removing script tag

(function() {
    'use strict';
    
    console.log('🔧 Navigation & Download Fixes Loading...');
    
    // ============================================
    // FIX 1: SHOW COMPANY NAME IN NAVIGATION
    // ============================================
    
    function updateNavigationWithCompanyName() {
        console.log('🏢 Updating navigation with company name...');
        
        const userEmail = localStorage.getItem('userEmail');
        const company = localStorage.getItem('company') || localStorage.getItem('companyName');
        
        if (!userEmail) {
            console.log('⚠️ No user email found');
            return;
        }
        
        // Extract company name from email domain if not stored
        let displayName = company;
        if (!displayName && userEmail) {
            const domain = userEmail.split('@')[1];
            if (domain) {
                // Convert domain to company name: demo.com → DEMO, scaleops6.com → SCALEOPS6
                displayName = domain.split('.')[0].toUpperCase();
            }
        }
        
        // Fallback to ST6C0 if still no name
        displayName = displayName || 'ST6C0';
        
        console.log('📝 Company display name:', displayName);
        
        // Update localStorage so nav.js picks it up
        localStorage.setItem('userName', displayName);
        
        // Force navigation refresh to show new name
        setTimeout(() => {
            const mainNav = document.getElementById('mainNav');
            if (mainNav && typeof createNavigation === 'function') {
                console.log('🔄 Refreshing navigation with company name...');
                mainNav.remove();
                const spacer = document.querySelector('div[style*="height: 100px"]');
                if (spacer) spacer.remove();
                createNavigation();
                console.log(`✅ Navigation updated: ${displayName}`);
            }
        }, 100);
    }
    
    // ============================================
    // FIX 2: ENHANCE ANALYSIS DOWNLOAD WITH WORKSPACE DATA
    // ============================================
    
    // Override the download function to include workspace answers
    function enhanceAnalysisDownload() {
        console.log('📥 Enhancing analysis download functionality...');
        
        // Wait for the download button to exist
        const checkInterval = setInterval(() => {
            const downloadBtn = document.querySelector('button[onclick*="downloadAnalysis"]');
            if (downloadBtn) {
                clearInterval(checkInterval);
                console.log('✅ Found download button, enhancing...');
                
                // Replace onclick handler
                downloadBtn.onclick = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    downloadEnhancedAnalysis();
                };
                
                console.log('✅ Download button enhanced with workspace data');
            }
        }, 500);
        
        // Stop checking after 5 seconds
        setTimeout(() => clearInterval(checkInterval), 5000);
    }
    
    async function downloadEnhancedAnalysis() {
        console.log('📥 Downloading enhanced analysis with workspace data...');
        
        try {
            // Get subcomponent ID from URL
            const urlParams = new URLSearchParams(window.location.search);
            const subcomponentId = urlParams.get('id') || '1-1';
            
            // Collect workspace answers
            const workspaceAnswers = {};
            const inputs = document.querySelectorAll('#workspace-tab input, #workspace-tab textarea, #dynamic-worksheet-container input, #dynamic-worksheet-container textarea');
            
            inputs.forEach(input => {
                if (input.id && input.value) {
                    // Get the question text from label or placeholder
                    const label = document.querySelector(`label[for="${input.id}"]`);
                    const questionText = label ? label.textContent : (input.placeholder || input.id);
                    
                    workspaceAnswers[input.id] = {
                        question: questionText,
                        answer: input.value
                    };
                }
            });
            
            console.log('📝 Collected workspace answers:', Object.keys(workspaceAnswers).length);
            
            // Get analysis data from the page
            const analysisData = window.currentAnalysis || {};
            
            // Prepare enhanced data for download
            const enhancedData = {
                ...analysisData,
                workspaceAnswers: workspaceAnswers,
                timestamp: new Date().toISOString(),
                userEmail: localStorage.getItem('userEmail'),
                company: localStorage.getItem('company') || localStorage.getItem('companyName')
            };
            
            // Call server to generate DOCX with workspace data
            const response = await fetch(`/api/generate-docx/${subcomponentId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(enhancedData)
            });
            
            if (response.ok) {
                const result = await response.json();
                if (result.downloadUrl) {
                    // Trigger download
                    const link = document.createElement('a');
                    link.href = result.downloadUrl;
                    link.download = result.filename || `analysis-${subcomponentId}.docx`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    console.log('✅ Enhanced analysis downloaded with workspace data');
                } else {
                    throw new Error('No download URL in response');
                }
            } else {
                throw new Error(`Server returned ${response.status}`);
            }
            
        } catch (error) {
            console.error('❌ Error downloading enhanced analysis:', error);
            alert('Error downloading analysis. Please try again.');
        }
    }
    
    // ============================================
    // INITIALIZATION
    // ============================================
    
    // Run on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            updateNavigationWithCompanyName();
            enhanceAnalysisDownload();
        });
    } else {
        updateNavigationWithCompanyName();
        enhanceAnalysisDownload();
    }
    
    console.log('✅ Navigation & Download Fixes Loaded');
    console.log('🔧 Features:');
    console.log('   - Company name in navigation (from signup or email domain)');
    console.log('   - Analysis download includes workspace answers');
    console.log('   - Safe mode - can be disabled by removing script tag');
    
})();
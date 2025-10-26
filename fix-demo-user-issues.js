// FINAL SAFE MODE FIXES - Navigation & Score History for Demo Users
// This file addresses two critical issues:
// 1. Navigation not showing logged-in user info
// 2. Demo users seeing ST6Co's historical score data instead of blank slate

(function() {
    'use strict';
    
    console.log('🔧 Demo User Fixes Loading...');
    
    // ============================================
    // FIX 1: NAVIGATION USER DISPLAY
    // ============================================
    
    // Force navigation refresh on page load
    function refreshNavigation() {
        console.log('🔄 Refreshing navigation display...');
        
        // Check localStorage
        const userId = localStorage.getItem('userId');
        const firebaseToken = localStorage.getItem('firebaseToken');
        const userName = localStorage.getItem('userName');
        const userEmail = localStorage.getItem('userEmail');
        
        console.log('📊 Navigation Check:', {
            userId: userId,
            hasToken: !!firebaseToken,
            userName: userName,
            userEmail: userEmail
        });
        
        // If user is logged in but nav doesn't show it, force recreation
        if (userId && firebaseToken) {
            console.log('✅ User is logged in, ensuring navigation shows user info');
            
            // Wait for nav to be created, then verify it shows user info
            setTimeout(() => {
                const mainNav = document.getElementById('mainNav');
                if (mainNav) {
                    const navHTML = mainNav.innerHTML;
                    
                    // Check if "Sign Up" button is showing (shouldn't be for logged-in users)
                    if (navHTML.includes('Sign Up') && navHTML.includes('signup.html')) {
                        console.warn('⚠️ Navigation showing Sign Up for logged-in user - forcing refresh');
                        
                        // Remove old nav
                        mainNav.remove();
                        const spacer = document.querySelector('div[style*="height: 100px"]');
                        if (spacer) spacer.remove();
                        
                        // Recreate navigation
                        if (typeof createNavigation === 'function') {
                            createNavigation();
                            console.log('✅ Navigation recreated with user info');
                        }
                    } else if (navHTML.includes('Logout')) {
                        console.log('✅ Navigation correctly showing user info');
                    }
                }
            }, 500);
        }
    }
    
    // ============================================
    // FIX 2: FILTER SCORE HISTORY BY USER
    // ============================================
    
    // Intercept the score history API endpoint
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
        const url = args[0];
        
        // Check if this is a score history request
        if (url && typeof url === 'string' && url.includes('/api/blocks/') && url.includes('/history')) {
            console.log('📊 Intercepting score history request:', url);
            
            return originalFetch.apply(this, args).then(async response => {
                const clonedResponse = response.clone();
                
                try {
                    const data = await clonedResponse.json();
                    
                    // Get current user info
                    const userEmail = localStorage.getItem('userEmail') || '';
                    const isDemoUser = userEmail.includes('@demo.com');
                    
                    console.log('👤 User check:', {
                        email: userEmail,
                        isDemoUser: isDemoUser
                    });
                    
                    // If demo user, filter out ST6Co's historical data
                    if (isDemoUser) {
                        console.log('🎯 Demo user detected - filtering score history');
                        
                        // Return empty history for demo users (fresh start)
                        const filteredData = {
                            history: [],
                            changeEvents: [],
                            currentScore: 0,
                            trend: 'stable',
                            completedCount: 0,
                            totalCount: 6
                        };
                        
                        console.log('✅ Returning blank slate for demo user');
                        
                        // Create a new response with filtered data
                        return new Response(JSON.stringify(filteredData), {
                            status: 200,
                            statusText: 'OK',
                            headers: response.headers
                        });
                    }
                    
                    // For non-demo users (like ST6Co), return original data
                    console.log('✅ Returning full history for ST6Co user');
                    return response;
                    
                } catch (error) {
                    console.error('❌ Error filtering score history:', error);
                    return response;
                }
            });
        }
        
        // For all other requests, pass through unchanged
        return originalFetch.apply(this, args);
    };
    
    // ============================================
    // FIX 3: ENSURE DEMO USERS START WITH N/A SCORES
    // ============================================
    
    // Override the updateChart function to handle demo users
    const originalUpdateChart = window.updateChart;
    if (originalUpdateChart) {
        window.updateChart = async function(period, buttonElement) {
            const userEmail = localStorage.getItem('userEmail') || '';
            const isDemoUser = userEmail.includes('@demo.com');
            
            if (isDemoUser) {
                console.log('🎯 Demo user - showing N/A state for chart');
                
                // Update active button
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                if (buttonElement) {
                    buttonElement.classList.add('active');
                } else {
                    const btn = document.querySelector(`.filter-btn[data-period="${period}"]`);
                    if (btn) btn.classList.add('active');
                }
                
                // Show empty state
                const labels = ['No Data'];
                const scores = [0];
                
                if (window.scoreChart) {
                    window.scoreChart.data.labels = labels;
                    window.scoreChart.data.datasets[0].data = scores;
                    window.scoreChart.update();
                } else {
                    window.initChart({ labels: labels, scores: scores, hasChanges: [], changeDetails: {} });
                }
                
                // Update statistics to show N/A
                document.getElementById('current-score').textContent = 'N/A';
                document.getElementById('avg-score').textContent = 'N/A';
                document.getElementById('best-score').textContent = 'N/A';
                document.getElementById('completion').textContent = '0/6';
                document.getElementById('completion-change').textContent = '0% complete';
                
                const currentChange = document.getElementById('current-change');
                if (currentChange) {
                    currentChange.textContent = 'No analyses yet';
                    currentChange.className = 'stat-change';
                }
                
                // Clear change log
                const changeLogBody = document.getElementById('change-log-body');
                if (changeLogBody) {
                    changeLogBody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #999; padding: 40px;">No score history yet. Complete your first analysis to see results here.</td></tr>';
                }
                
                return;
            }
            
            // For non-demo users, use original function
            return originalUpdateChart.call(this, period, buttonElement);
        };
    }
    
    // ============================================
    // FIX 4: REPLACE HARDCODED DASHBOARD SCORES WITH N/A FOR DEMO USERS
    // ============================================
    
    function updateDashboardScores() {
        const userEmail = localStorage.getItem('userEmail') || '';
        const isDemoUser = userEmail.includes('@demo.com');
        
        if (!isDemoUser) {
            console.log('✅ ST6Co user - keeping dashboard scores');
            return;
        }
        
        console.log('🎯 Demo user - replacing dashboard scores with N/A');
        
        // Replace all block scores with N/A
        document.querySelectorAll('.block-score').forEach(scoreEl => {
            scoreEl.textContent = 'N/A';
            scoreEl.style.color = '#666';
        });
        
        // Replace phase scores with N/A
        document.querySelectorAll('.phase-score').forEach(scoreEl => {
            scoreEl.textContent = 'N/A';
        });
        
        console.log('✅ Dashboard scores updated to N/A for demo user');
    }
    
    // Run dashboard score update on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateDashboardScores);
    } else {
        updateDashboardScores();
    }
    
    
    // ============================================
    // INITIALIZATION
    // ============================================
    
    // Run navigation refresh on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', refreshNavigation);
    } else {
        refreshNavigation();
    }
    
    // Also refresh on visibility change (tab switch)
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            refreshNavigation();
        }
    });
    
    console.log('✅ Demo User Fixes Loaded Successfully');
    console.log('🔧 Features:');
    console.log('   - Navigation refresh for logged-in users');
    console.log('   - Score history filtered by user');
    console.log('   - Demo users get blank slate (no ST6Co data)');
    console.log('   - Demo users see N/A until first analysis');
    
})();
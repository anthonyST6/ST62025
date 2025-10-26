// Diagnostic logging for authentication and authorization issues
// This script adds logging to help identify the root causes of:
// 1. Logout redirect issue
// 2. @demo.com admin access issue  
// 3. @st6co workspace preload issue

console.log('🔍 DEBUG: Auth Issues Diagnostic Script Loaded');

// Intercept logout function to log redirect behavior
(function() {
    const originalLogout = window.logout;
    if (originalLogout) {
        window.logout = function() {
            console.log('🔍 DEBUG: logout() called');
            console.log('  Current location:', window.location.href);
            console.log('  Will redirect to: /signup.html (ISSUE: should be /login.html)');
            originalLogout();
        };
    }
})();

// Log user email domain on page load
document.addEventListener('DOMContentLoaded', function() {
    const userEmail = localStorage.getItem('userEmail');
    const userId = localStorage.getItem('userId');
    const isGuest = localStorage.getItem('isGuest') === 'true';
    
    console.log('🔍 DEBUG: User Authentication State');
    console.log('  User ID:', userId);
    console.log('  User Email:', userEmail);
    console.log('  Is Guest:', isGuest);
    
    if (userEmail) {
        const domain = userEmail.split('@')[1];
        console.log('  Email Domain:', domain);
        
        // Check admin access eligibility
        if (domain === 'demo.com') {
            console.log('  ⚠️ ISSUE: @demo.com user should NOT have admin access');
            console.log('  Current behavior: Admin link shown if not guest');
        }
        
        if (domain === 'st6co') {
            console.log('  ✅ @st6co user should have preloaded workspace data');
            console.log('  Check: API should detect this domain and preload data');
        }
    }
    
    // Check if admin link is visible
    const adminLink = document.querySelector('a[href="/admin.html"]');
    if (adminLink) {
        console.log('  Admin Link Visible:', true);
        if (userEmail && userEmail.endsWith('@demo.com')) {
            console.log('  ❌ PROBLEM: @demo.com user can see admin link!');
        }
    } else {
        console.log('  Admin Link Visible:', false);
    }
});

// Intercept API calls to /api/subcomponents to log workspace data handling
(function() {
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
        const url = args[0];
        if (typeof url === 'string' && url.includes('/api/subcomponents/')) {
            console.log('🔍 DEBUG: Subcomponent API Call');
            console.log('  URL:', url);
            console.log('  User Email:', localStorage.getItem('userEmail'));
            
            const userEmail = localStorage.getItem('userEmail');
            if (userEmail) {
                const domain = userEmail.split('@')[1];
                console.log('  Domain:', domain);
                
                if (domain === 'demo.com') {
                    console.log('  Expected: BLANK workspace (no preloaded data)');
                } else if (domain === 'st6co') {
                    console.log('  Expected: PRELOADED workspace data');
                } else {
                    console.log('  Expected: BLANK workspace (default)');
                }
            }
        }
        
        return originalFetch.apply(this, args).then(response => {
            if (typeof url === 'string' && url.includes('/api/subcomponents/')) {
                response.clone().json().then(data => {
                    if (data.workspace && data.workspace.questions) {
                        const hasPreloadedData = data.workspace.questions.some(q => 
                            q.defaultValue && q.defaultValue.length > 50
                        );
                        console.log('  Workspace has preloaded data:', hasPreloadedData);
                        
                        const userEmail = localStorage.getItem('userEmail');
                        if (userEmail) {
                            const domain = userEmail.split('@')[1];
                            if (domain === 'st6co' && !hasPreloadedData) {
                                console.log('  ❌ PROBLEM: @st6co user should have preloaded data!');
                            }
                            if (domain === 'demo.com' && hasPreloadedData) {
                                console.log('  ❌ PROBLEM: @demo.com user should have BLANK workspace!');
                            }
                        }
                    }
                }).catch(() => {});
            }
            return response;
        });
    };
})();

console.log('🔍 DEBUG: Diagnostic logging active');
console.log('  - Logout redirect will be logged');
console.log('  - Admin access will be checked');
console.log('  - Workspace data preload will be monitored');
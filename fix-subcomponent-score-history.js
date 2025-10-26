// FIX: Subcomponent Score History for Demo Users
// Intercepts subcomponent score history API and returns empty for demo users

(function() {
    'use strict';
    
    console.log('🔧 FIX: Subcomponent score history for demo users loading...');
    
    // Intercept fetch to filter subcomponent score history
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
        const url = args[0];
        
        // Check if this is a subcomponent history API request
        if (url && typeof url === 'string' && url.match(/\/api\/subcomponents\/[\d-]+\/history/)) {
            console.log('📊 Intercepting subcomponent history request:', url);
            
            return originalFetch.apply(this, args).then(async response => {
                const clonedResponse = response.clone();
                
                try {
                    const data = await clonedResponse.json();
                    
                    // Get current user info
                    const userEmail = localStorage.getItem('userEmail') || '';
                    const isDemoUser = userEmail.includes('@demo.com');
                    
                    console.log('👤 User check for subcomponent history:', {
                        email: userEmail,
                        isDemoUser: isDemoUser,
                        historyEntries: Array.isArray(data) ? data.length : 0
                    });
                    
                    // If demo user, return empty history
                    if (isDemoUser) {
                        console.log('🎯 Demo user detected - returning empty subcomponent history');
                        
                        // Return empty array for demo users
                        const emptyHistory = [];
                        
                        console.log('✅ Returning blank subcomponent history for demo user');
                        
                        // Create a new response with empty data
                        return new Response(JSON.stringify(emptyHistory), {
                            status: 200,
                            statusText: 'OK',
                            headers: response.headers
                        });
                    }
                    
                    // For non-demo users (like ST6Co), return original data
                    console.log('✅ Returning original subcomponent history for ST6Co user');
                    return response;
                    
                } catch (error) {
                    console.error('❌ Error filtering subcomponent history:', error);
                    return response;
                }
            });
        }
        
        // For all other requests, pass through unchanged
        return originalFetch.apply(this, args);
    };
    
    console.log('✅ Subcomponent score history filter active for demo users');
    
})();
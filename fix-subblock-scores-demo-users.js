// FIX: Sub-block Scores for Demo Users
// Intercepts API responses and replaces ST6Co scores with N/A for demo users

(function() {
    'use strict';
    
    console.log('🔧 FIX: Sub-block scores for demo users loading...');
    
    // Intercept fetch to filter sub-block scores
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
        const url = args[0];
        
        // Check if this is a blocks API request
        if (url && typeof url === 'string' && url.match(/\/api\/blocks\/\d+$/)) {
            console.log('📊 Intercepting blocks API request:', url);
            
            return originalFetch.apply(this, args).then(async response => {
                const clonedResponse = response.clone();
                
                try {
                    const data = await clonedResponse.json();
                    
                    // Get current user info
                    const userEmail = localStorage.getItem('userEmail') || '';
                    const isDemoUser = userEmail.includes('@demo.com');
                    
                    console.log('👤 User check for blocks API:', {
                        email: userEmail,
                        isDemoUser: isDemoUser
                    });
                    
                    // If demo user, replace all sub-block scores with N/A
                    if (isDemoUser && data.subBlocks) {
                        console.log('🎯 Demo user detected - replacing sub-block scores with N/A');
                        
                        data.subBlocks = data.subBlocks.map(subBlock => ({
                            ...subBlock,
                            score: null,  // Set to null for N/A
                            scoreDisplay: 'N/A',
                            status: 'Pending',
                            analysisCount: 0,
                            lastAnalyzed: null
                        }));
                        
                        // Also set block score to N/A
                        data.score = null;
                        data.completedSubcomponents = 0;
                        data.completionPercentage = 0;
                        
                        console.log('✅ Replaced all sub-block scores with N/A for demo user');
                        
                        // Create a new response with filtered data
                        return new Response(JSON.stringify(data), {
                            status: 200,
                            statusText: 'OK',
                            headers: response.headers
                        });
                    }
                    
                    // For non-demo users (like ST6Co), return original data
                    console.log('✅ Returning original block data for ST6Co user');
                    return response;
                    
                } catch (error) {
                    console.error('❌ Error filtering block data:', error);
                    return response;
                }
            });
        }
        
        // For all other requests, pass through unchanged
        return originalFetch.apply(this, args);
    };
    
    console.log('✅ Sub-block score filter active for demo users');
    
})();
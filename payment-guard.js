/**
 * Payment Guard - Dashboard Access Control
 *
 * DISABLED: Payment check removed from dashboard
 * Payment is only required during signup flow
 * Existing users can login and access dashboard without payment check
 */

(async function() {
    'use strict';
    
    const userId = localStorage.getItem('userId');
    const firebaseToken = localStorage.getItem('firebaseToken');
    const currentPage = window.location.pathname;
    
    // Pages that don't require authentication
    const publicPages = [
        '/login.html',
        '/signup.html',
        '/payment.html',
        '/payment-success.html',
        '/forgot-password.html',
        '/terms.html',
        '/privacy.html'
    ];
    
    // Check if current page requires authentication
    const requiresAuth = !publicPages.some(page => currentPage.endsWith(page));
    
    if (!requiresAuth) {
        console.log('✅ Public page, no auth check required');
        return;
    }
    
    // Check if user is logged in
    if (!userId || !firebaseToken) {
        console.log('⚠️ User not logged in, redirecting to login');
        window.location.href = '/login.html';
        return;
    }
    
    // ✅ PAYMENT CHECK DISABLED
    // Users can access dashboard after login
    // Payment is only checked during signup flow
    console.log('✅ User authenticated, access granted');
})();
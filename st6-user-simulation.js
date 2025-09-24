/**
 * ST6 User Simulation Script
 * This script simulates ST6 as a real user account using the ScaleOps6 platform
 * It fills out the Problem Statement worksheet and generates analysis
 */

// ST6 User Account Details
const ST6_USER = {
    organization: 'ST6',
    email: 'team@scaleteam6.com',
    userId: 'st6-user-001',
    product: 'ScaleOps6Product'
};

// ST6's Problem Statement Worksheet Data
const ST6_WORKSHEET = {
    'who-affected': 'GTM leaders at early-stage B2B SaaS startups (Seed to Series B, 5-50 employees) struggling to build scalable go-to-market operations without enterprise resources',
    
    'what-problem': 'Early-stage startups lack a systematic approach to assess and improve their GTM readiness. They struggle with fragmented tools, unclear priorities, and no standardized framework to measure progress. This leads to wasted resources, missed opportunities, and inability to demonstrate GTM maturity to investors.',
    
    'when-occur': 'When founders need to assess GTM readiness for investor meetings, board reviews, or strategic planning. Critical moments include pre-fundraising, entering new markets, or scaling from founder-led sales',
    
    'what-impact': '60% of startups fail due to GTM issues. Average 6-month delay in revenue. $2M+ wasted on wrong GTM strategies. 40% lower valuation without clear GTM proof points. 3x longer sales cycles without proper GTM infrastructure.',
    
    'how-solving': 'Expensive consultants ($50K-200K engagements), generic frameworks that don\'t fit startup reality, DIY spreadsheets missing critical components, or flying blind with no systematic approach. Most solutions are built for enterprises, not resource-constrained startups.',
    
    'evidence-validation': 'Interviewed 47 startup founders and GTM leaders. 89% said they lack confidence in GTM readiness. 76% wished they had a systematic framework earlier. Average founder spends 30+ hours/month on GTM planning without clear outcomes. VCs report GTM maturity as top 3 investment criteria.'
};

/**
 * Simulate ST6 user filling out the worksheet
 * This function should be called from the subcomponent-detail.html page
 */
function simulateST6User() {
    console.log('🚀 Starting ST6 user simulation...');
    
    // Check if we're on the right page
    if (!window.location.pathname.includes('subcomponent-detail.html')) {
        console.error('This script should be run from the subcomponent-detail.html page');
        return;
    }
    
    // Set user context in localStorage (simulating logged-in user)
    localStorage.setItem('currentUser', JSON.stringify(ST6_USER));
    localStorage.setItem('isAuthenticated', 'true');
    
    // Fill out the worksheet fields
    console.log('📝 Filling out worksheet fields...');
    
    // Fill each field with ST6's data
    for (const [fieldId, value] of Object.entries(ST6_WORKSHEET)) {
        const field = document.getElementById(fieldId);
        if (field) {
            // Simulate typing by setting value and triggering input event
            field.value = value;
            field.dispatchEvent(new Event('input', { bubbles: true }));
            console.log(`✓ Filled field: ${fieldId}`);
        } else {
            console.warn(`Field not found: ${fieldId}`);
        }
    }
    
    // Trigger auto-save
    console.log('💾 Auto-saving worksheet data...');
    if (typeof DataManager !== 'undefined' && DataManager.autoSaveWorksheet) {
        DataManager.autoSaveWorksheet();
    }
    
    console.log('✅ ST6 user simulation complete!');
    console.log('📊 You can now click "Analyze Results" to generate the analysis');
    
    // Show success message
    showNotification('ST6 worksheet data has been filled. Click "Analyze Results" to proceed.');
}

/**
 * Generate analysis for ST6's worksheet
 * This simulates clicking the Analyze button
 */
function generateST6Analysis() {
    console.log('🤖 Generating analysis for ST6...');
    
    // Check if analyzeWorksheet function exists
    if (typeof analyzeWorksheet === 'function') {
        analyzeWorksheet();
    } else {
        console.error('analyzeWorksheet function not found');
    }
}

/**
 * Show notification to user
 */
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #FF5500;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(255, 85, 0, 0.3);
        z-index: 10000;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

/**
 * Initialize ST6 user session
 * This sets up the user context for all operations
 */
function initializeST6Session() {
    console.log('🔐 Initializing ST6 user session...');
    
    // Set authentication token (simulated)
    const token = btoa(JSON.stringify({
        user: ST6_USER,
        exp: Date.now() + 86400000, // 24 hours
        permissions: ['read', 'write', 'analyze']
    }));
    
    localStorage.setItem('authToken', token);
    localStorage.setItem('userOrganization', ST6_USER.organization);
    
    console.log('✓ ST6 session initialized');
    return true;
}

/**
 * Clear ST6 session
 */
function clearST6Session() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userOrganization');
    console.log('🔒 ST6 session cleared');
}

/**
 * Auto-execute if on the right page
 */
if (typeof window !== 'undefined') {
    // Add functions to window for easy access
    window.ST6 = {
        simulate: simulateST6User,
        analyze: generateST6Analysis,
        init: initializeST6Session,
        clear: clearST6Session,
        data: ST6_WORKSHEET
    };
    
    console.log('ST6 User Simulation loaded. Use ST6.simulate() to fill the worksheet.');
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        simulateST6User,
        generateST6Analysis,
        initializeST6Session,
        clearST6Session,
        ST6_USER,
        ST6_WORKSHEET
    };
}
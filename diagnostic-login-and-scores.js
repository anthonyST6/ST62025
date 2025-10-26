// DIAGNOSTIC: Login Status and Score Display Issues
// This script adds logging to identify the exact problems

console.log('🔍 DIAGNOSTIC: Checking login and score display issues...');

// Check 1: Login Status
setTimeout(() => {
    console.log('\n=== LOGIN STATUS DIAGNOSTIC ===');
    console.log('userId:', localStorage.getItem('userId'));
    console.log('firebaseToken:', localStorage.getItem('firebaseToken'));
    console.log('sessionId:', localStorage.getItem('sessionId'));
    console.log('userName:', localStorage.getItem('userName'));
    console.log('userEmail:', localStorage.getItem('userEmail'));
    
    const isLoggedIn = !!(localStorage.getItem('userId') && localStorage.getItem('firebaseToken'));
    console.log('isLoggedIn (nav.js logic):', isLoggedIn);
    console.log('Expected: Should be TRUE when user is logged in');
    console.log('Actual: Currently', isLoggedIn ? 'TRUE' : 'FALSE');
    
    if (!isLoggedIn) {
        console.error('❌ PROBLEM FOUND: userId or firebaseToken missing from localStorage');
        console.log('💡 FIX: Auto-login should set both userId and firebaseToken');
    }
}, 1000);

// Check 2: Sub-block Score Display
setTimeout(() => {
    console.log('\n=== SUB-BLOCK SCORE DISPLAY DIAGNOSTIC ===');
    
    const subblocks = document.querySelectorAll('.subblock');
    console.log('Total sub-blocks found:', subblocks.length);
    
    subblocks.forEach((block, index) => {
        const scoreElement = block.querySelector('.subblock-score');
        const scoreText = scoreElement?.textContent;
        console.log(`Sub-block ${index + 1}: Score = "${scoreText}"`);
        
        if (scoreText && scoreText !== 'N/A' && scoreText.includes('%')) {
            console.log(`  ⚠️ Showing percentage: ${scoreText}`);
            console.log('  Expected: Should show "N/A" if workspace not completed');
        }
    });
}, 3000);

// Check 3: Score History Display
setTimeout(() => {
    console.log('\n=== SCORE HISTORY DISPLAY DIAGNOSTIC ===');
    
    const chartCanvas = document.getElementById('scoreChart');
    const historySection = document.querySelector('.score-history-section');
    
    if (chartCanvas) {
        console.log('Score chart canvas found');
        console.log('Chart should be BLANK if no workspace completed');
    }
    
    if (historySection) {
        console.log('Score history section found');
        const isVisible = historySection.style.display !== 'none';
        console.log('Section visible:', isVisible);
        
        if (isVisible) {
            console.log('⚠️ Score history is visible');
            console.log('Expected: Should be hidden or show "No data" message if workspace not saved');
        }
    }
    
    // Check if there's actual score history data
    const urlParams = new URLSearchParams(window.location.search);
    const blockId = parseInt(urlParams.get('id')) || 1;
    
    fetch(`/api/blocks/${blockId}/history?days=7`)
        .then(res => res.json())
        .then(data => {
            console.log('Score history API response:', data);
            console.log('History points:', data.history?.length || 0);
            console.log('Change events:', data.changeEvents?.length || 0);
            console.log('Completed subcomponents:', data.completedCount || 0);
            
            if (data.completedCount === 0 && data.history?.length > 0) {
                console.error('❌ PROBLEM FOUND: Score history showing data when completedCount = 0');
                console.log('💡 FIX: Hide score history section when completedCount = 0');
            }
        })
        .catch(err => console.error('Error fetching history:', err));
}, 4000);

console.log('✅ Diagnostic logging active - check console in 5 seconds');
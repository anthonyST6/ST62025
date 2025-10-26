// Load Dashboard Scores from API
// Fetches actual scores from database and updates dashboard UI
// Only shows N/A for demo users, shows real scores for @scaleops6.com users

(function() {
    'use strict';
    
    console.log('📊 Dashboard Score Loader: Initializing...');
    
    async function loadDashboardScores() {
        const userEmail = localStorage.getItem('userEmail') || '';
        const isDemoUser = userEmail.endsWith('@demo.com');
        const isScaleOpsUser = userEmail.endsWith('@scaleops6.com') || userEmail.endsWith('@st6co');
        
        console.log('👤 User Type:', {
            email: userEmail,
            isDemoUser,
            isScaleOpsUser
        });
        
        // Demo users get N/A (already handled by fix-demo-user-issues.js)
        if (isDemoUser) {
            console.log('🎭 Demo user - scores will remain N/A');
            return;
        }
        
        // For ScaleOps users and others, fetch actual scores from API
        console.log('📡 Fetching actual scores from API for all 16 blocks...');
        
        try {
            // Fetch scores for all 16 blocks
            const blockPromises = [];
            for (let blockId = 1; blockId <= 16; blockId++) {
                blockPromises.push(
                    fetch(`/api/blocks/${blockId}`)
                        .then(res => res.json())
                        .catch(err => {
                            console.error(`Error fetching block ${blockId}:`, err);
                            return null;
                        })
                );
            }
            
            const blockData = await Promise.all(blockPromises);
            
            // Update dashboard with actual scores
            let updatedCount = 0;
            blockData.forEach((data, index) => {
                if (!data) return;
                
                const blockId = index + 1;
                const blockElement = document.querySelector(`.block[data-block="${blockId}"]`);
                
                if (blockElement) {
                    const scoreElement = blockElement.querySelector('.block-score');
                    if (scoreElement && data.score !== undefined && data.score !== null) {
                        // Update score display
                        scoreElement.textContent = `${Math.round(data.score)}%`;
                        
                        // Update score color based on value
                        if (data.score >= 80) {
                            scoreElement.style.color = '#4CAF50'; // Green
                        } else if (data.score >= 60) {
                            scoreElement.style.color = '#FF9800'; // Orange
                        } else {
                            scoreElement.style.color = '#F44336'; // Red
                        }
                        
                        updatedCount++;
                        console.log(`✅ Block ${blockId}: ${Math.round(data.score)}%`);
                    } else {
                        // No score available - keep as N/A
                        scoreElement.textContent = 'N/A';
                        scoreElement.style.color = '#666';
                        console.log(`⚠️ Block ${blockId}: No score data`);
                    }
                }
            });
            
            // Update phase scores (average of blocks in each phase)
            updatePhaseScores(blockData);
            
            console.log(`✅ Updated ${updatedCount}/16 block scores from API`);
            
        } catch (error) {
            console.error('❌ Error loading dashboard scores:', error);
        }
    }
    
    function updatePhaseScores(blockData) {
        // Phase 1: Blocks 1-4
        const phase1Scores = blockData.slice(0, 4).filter(b => b && b.score !== null).map(b => b.score);
        updatePhaseScore(1, phase1Scores);
        
        // Phase 2: Blocks 5-8
        const phase2Scores = blockData.slice(4, 8).filter(b => b && b.score !== null).map(b => b.score);
        updatePhaseScore(2, phase2Scores);
        
        // Phase 3: Blocks 9-12
        const phase3Scores = blockData.slice(8, 12).filter(b => b && b.score !== null).map(b => b.score);
        updatePhaseScore(3, phase3Scores);
        
        // Phase 4: Block 13
        const phase4Scores = blockData.slice(12, 13).filter(b => b && b.score !== null).map(b => b.score);
        updatePhaseScore(4, phase4Scores);
        
        // Phase 5: Blocks 14-16
        const phase5Scores = blockData.slice(13, 16).filter(b => b && b.score !== null).map(b => b.score);
        updatePhaseScore(5, phase5Scores);
    }
    
    function updatePhaseScore(phaseNum, scores) {
        const phaseScoreElements = document.querySelectorAll('.phase-score');
        
        if (scores.length === 0) {
            // No scores available for this phase
            if (phaseScoreElements[phaseNum - 1]) {
                phaseScoreElements[phaseNum - 1].textContent = 'N/A';
            }
            console.log(`Phase ${phaseNum}: N/A (no scores)`);
            return;
        }
        
        // Calculate average
        const average = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
        
        if (phaseScoreElements[phaseNum - 1]) {
            phaseScoreElements[phaseNum - 1].textContent = `${average}%`;
            console.log(`Phase ${phaseNum}: ${average}% (${scores.length} blocks)`);
        }
    }
    
    // Run on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            // Wait for other scripts to finish hiding scores, then load real ones
            setTimeout(loadDashboardScores, 1000);
        });
    } else {
        setTimeout(loadDashboardScores, 1000);
    }
    
    console.log('✅ Dashboard Score Loader: Ready');
    
})();
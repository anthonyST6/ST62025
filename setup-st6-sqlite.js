/**
 * Setup ST6 as a Real User Account in the SQLite System
 * This script creates ST6 as an actual user using the existing database
 */

const { Database } = require('./database');

// ST6 Account Information
const ST6_USER = {
    email: 'team@scaleteam6.com',
    name: 'Scale Team Six',
    company: 'ST6Co - ScaleOps6 Platform',
    role: 'Founder/CEO'
};

// ST6's Problem Statement Worksheet Data
const ST6_WORKSHEET_DATA = {
    problemDescription: `Many B2B SaaS startups struggle to achieve sustainable growth due to fragmented go-to-market strategies and lack of systematic operational frameworks. They face challenges in:
    - Aligning product development with market needs
    - Building repeatable sales processes
    - Scaling customer success operations
    - Measuring and optimizing GTM performance
    - Coordinating cross-functional teams effectively`,
    
    targetCustomer: `B2B SaaS startups in the $1M-$50M ARR range, particularly:
    - Series A to Series C companies
    - 20-200 employees
    - Selling to enterprise or mid-market segments
    - Complex sales cycles (3-12 months)
    - High ACVs ($25K-$500K)`,
    
    uniqueInsight: `Our unique insight comes from analyzing 500+ successful B2B SaaS scale-ups and identifying the common patterns that separate winners from strugglers. We discovered that success isn't about individual tactics but about having an integrated operational system that aligns all GTM functions around customer value delivery.`,
    
    whyNow: `The market timing is perfect because:
    - Post-2023 funding environment demands efficient growth
    - AI/automation enables sophisticated ops at lower cost
    - Buyers expect seamless, value-driven experiences
    - Competition is intensifying in every vertical
    - Traditional playbooks are becoming obsolete`,
    
    solution: `ScaleOps6 Platform - An AI-powered GTM operations platform that provides:
    - Comprehensive maturity assessment across 96 operational dimensions
    - Personalized playbooks based on company stage and vertical
    - Real-time performance tracking and optimization recommendations
    - Integrated workflow automation for sales, marketing, and CS teams
    - Continuous learning from successful peer companies`,
    
    competitiveAdvantage: `Our competitive advantages include:
    - Proprietary framework based on 500+ company analysis
    - AI agents trained on successful GTM patterns
    - Real-time benchmarking against industry leaders
    - Integrated approach vs point solutions
    - Community-driven continuous improvement`,
    
    evidenceOfTraction: `Early validation includes:
    - 50+ beta customers with average NPS of 72
    - 3.2x improvement in sales velocity for early adopters
    - $2M in ARR within first 6 months
    - Strategic partnerships with leading VCs
    - Industry recognition and thought leadership`
};

/**
 * Setup ST6 Account
 */
function setupST6Account(callback) {
    console.log('Setting up ST6 account...\n');
    
    // Check if ST6 already exists
    Database.getUserByEmail(ST6_USER.email, (err, existingUser) => {
        if (existingUser) {
            console.log('✓ ST6 account already exists');
            console.log('  User ID:', existingUser.id);
            console.log('  Email:', existingUser.email);
            console.log('  Company:', existingUser.company);
            
            // Update scores for existing user
            updateST6Scores(existingUser.id, () => {
                callback(null, existingUser);
            });
            return;
        }
        
        // Create new ST6 user
        Database.createUser(
            ST6_USER.email,
            ST6_USER.name,
            ST6_USER.company,
            ST6_USER.role,
            (err, user) => {
                if (err) {
                    console.error('Error creating ST6 user:', err);
                    callback(err);
                    return;
                }
                
                console.log('✓ ST6 account created successfully');
                console.log('  User ID:', user.id);
                console.log('  Email:', user.email);
                console.log('  Company:', user.company);
                
                // Save worksheet data
                saveWorksheetData(user.id, () => {
                    // Create initial scores
                    createInitialScores(user.id, () => {
                        callback(null, user);
                    });
                });
            }
        );
    });
}

/**
 * Save ST6's worksheet data to localStorage format
 */
function saveWorksheetData(userId, callback) {
    console.log('\nSaving ST6 worksheet data...');
    
    // Create a session for ST6
    const sessionId = `st6-session-${Date.now()}`;
    const sessionData = {
        userId: userId,
        worksheetData: {
            'problem-statement': ST6_WORKSHEET_DATA
        },
        analysisResults: {
            'problem-statement': {
                score: 85,
                strengths: [
                    'Clear problem definition with specific pain points',
                    'Well-defined target customer segment',
                    'Strong evidence of market timing',
                    'Comprehensive solution approach'
                ],
                improvements: [
                    'Quantify the market size opportunity',
                    'Add more specific competitive differentiation',
                    'Include customer testimonials or case studies'
                ],
                recommendations: [
                    'Develop detailed customer personas for each segment',
                    'Create ROI calculator for prospects',
                    'Build competitive battle cards'
                ],
                timestamp: new Date().toISOString()
            }
        }
    };
    
    Database.createSession(
        sessionId,
        userId,
        sessionData,
        null, // No expiry
        (err) => {
            if (err) {
                console.error('Error saving session data:', err);
            } else {
                console.log('✓ Worksheet data saved');
            }
            callback();
        }
    );
}

/**
 * Create initial scores for ST6
 */
function createInitialScores(userId, callback) {
    console.log('\nCreating initial scores for ST6...');
    
    const blocks = [
        { id: 1, score: 85, status: 'completed' },
        { id: 2, score: 78, status: 'in_progress' },
        { id: 3, score: 72, status: 'in_progress' },
        { id: 4, score: 65, status: 'pending' }
    ];
    
    let completed = 0;
    blocks.forEach(block => {
        Database.updateUserBlockScore(
            userId,
            block.id,
            block.score,
            block.status,
            (err) => {
                if (err) {
                    console.error(`Error updating block ${block.id}:`, err);
                } else {
                    console.log(`  ✓ Block ${block.id}: ${block.score}% (${block.status})`);
                }
                completed++;
                if (completed === blocks.length) {
                    
                    // Save score history
                    saveScoreHistory(userId, callback);
                }
            }
        );
    });
}

/**
 * Update scores for existing ST6 user
 */
function updateST6Scores(userId, callback) {
    console.log('\nUpdating ST6 scores...');
    
    // Update Problem Statement score to reflect recent work
    Database.updateUserBlockScore(
        userId,
        1, // Mission Discovery block
        85,
        'completed',
        (err) => {
            if (err) {
                console.error('Error updating scores:', err);
            } else {
                console.log('✓ Scores updated');
            }
            
            // Save updated worksheet data
            saveWorksheetData(userId, callback);
        }
    );
}

/**
 * Save score history
 */
function saveScoreHistory(userId, callback) {
    console.log('\nSaving score history...');
    
    const scoreData = {
        'Problem Statement': 85,
        'Mission': 82,
        'Customer Insights': 78,
        'Founding Team Capability': 90,
        'Market Insights': 75,
        'Prototype Launch Plan': 70
    };
    
    const evidenceLinks = [
        'https://scaleteam6.com/case-studies',
        'https://scaleteam6.com/product-demo'
    ];
    
    const aiAnalysis = `ST6's ScaleOps6 Platform demonstrates strong product-market fit with clear problem definition and solution approach. The team shows exceptional capability with deep domain expertise. Key strengths include the proprietary framework and AI-powered insights. Areas for improvement include quantifying market size and adding more customer testimonials.`;
    
    Database.saveScoreHistory(
        userId,
        1, // Mission Discovery block
        85,
        scoreData,
        evidenceLinks,
        aiAnalysis,
        (err) => {
            if (err) {
                console.error('Error saving score history:', err);
            } else {
                console.log('✓ Score history saved');
            }
            callback();
        }
    );
}

/**
 * Main execution
 */
function main() {
    console.log('========================================');
    console.log('ST6 Account Setup (SQLite)');
    console.log('========================================\n');
    
    setupST6Account((err, user) => {
        if (err) {
            console.error('\n❌ Setup failed:', err.message);
            process.exit(1);
        }
        
        console.log('\n========================================');
        console.log('ST6 Account Setup Complete!');
        console.log('========================================\n');
        
        console.log('ST6 is now set up as a real user in the system!');
        console.log('\nAccount Details:');
        console.log('  Email:', ST6_USER.email);
        console.log('  Name:', ST6_USER.name);
        console.log('  Company:', ST6_USER.company);
        console.log('  Role:', ST6_USER.role);
        
        console.log('\n✓ All worksheet data has been saved');
        console.log('✓ Initial scores have been created');
        console.log('✓ The account can be used like any other user\n');
        
        console.log('You can now:');
        console.log('1. Open the platform in your browser');
        console.log('2. ST6 data will persist across sessions');
        console.log('3. Use ST6 as a demo account for testing\n');
        
        process.exit(0);
    });
}

// Run if executed directly
if (require.main === module) {
    main();
}

module.exports = {
    setupST6Account,
    ST6_USER,
    ST6_WORKSHEET_DATA
};
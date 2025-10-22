// Fix for missing Customer Interview Guide and Market Validation Scorecard content
// This completes the template implementations that were left as placeholders

(function() {
    'use strict';
    
    console.log('🔧 Fixing missing template content for Customer Interview Guide and Market Validation Scorecard...');
    
    // ScaleOps6 Brand Colors (reuse from main file)
    const BRAND = {
        primary: '#FF5500',
        primaryGradient: 'linear-gradient(135deg, #FF5500, #FF8800)',
        darkBg: '#0a0a0a',
        cardBg: '#141414',
        borderColor: 'rgba(255, 85, 0, 0.3)',
        textPrimary: '#ffffff',
        textSecondary: '#b0b0b0',
        success: '#4CAF50',
        warning: '#F59E0B',
        info: '#2196F3',
        purple: '#9C27B0',
        purpleGradient: 'linear-gradient(135deg, #9C27B0, #BA68C8)',
        blueGradient: 'linear-gradient(135deg, #2196F3, #42A5F5)',
        cardShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
        borderRadius: '20px'
    };
    
    // Override the incomplete functions with full implementations
    window.generateCustomerInterviewGuide = function(answers, score) {
        return `
            <!-- Header with Orange Gradient -->
            <div style="
                background: linear-gradient(135deg, #FF5500, #ff8844);
                padding: 50px;
                text-align: center;
                position: relative;
                overflow: hidden;
            ">
                <h1 style="
                    margin: 0;
                    font-size: 48px;
                    font-weight: 800;
                    color: white;
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
                    letter-spacing: 2px;
                ">CUSTOMER INTERVIEW GUIDE</h1>
                <p style="
                    margin: 15px 0 0 0;
                    font-size: 20px;
                    color: rgba(255,255,255,0.9);
                    font-weight: 300;
                    letter-spacing: 1px;
                ">Data-Driven Discovery Framework</p>
            </div>
            
            <!-- Content Container -->
            <div style="background: ${BRAND.darkBg}; padding: 50px;">
                <!-- Interview Context Card -->
                <div style="
                    background: ${BRAND.cardBg};
                    border: 1px solid ${BRAND.borderColor};
                    border-radius: 15px;
                    padding: 35px;
                    margin-bottom: 35px;
                    box-shadow: ${BRAND.cardShadow};
                ">
                    <h2 style="
                        color: ${BRAND.purple};
                        font-size: 28px;
                        margin: 0 0 25px 0;
                        padding-bottom: 15px;
                        border-bottom: 3px solid ${BRAND.purple};
                        font-weight: 700;
                    ">Interview Context</h2>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div>
                            <p style="color: ${BRAND.textSecondary}; margin: 0; font-size: 14px; text-transform: uppercase;">Company</p>
                            <p style="color: ${BRAND.textPrimary}; margin: 5px 0 0 0; font-size: 20px; font-weight: 600;">
                                ${answers['company-name']?.answer || 'ST6Co'}
                            </p>
                        </div>
                        <div>
                            <p style="color: ${BRAND.textSecondary}; margin: 0; font-size: 14px; text-transform: uppercase;">Target Segment</p>
                            <p style="color: ${BRAND.textPrimary}; margin: 5px 0 0 0; font-size: 20px; font-weight: 600;">
                                ${answers['target-audience']?.answer || 'B2B SaaS Startups'}
                            </p>
                        </div>
                        <div>
                            <p style="color: ${BRAND.textSecondary}; margin: 0; font-size: 14px; text-transform: uppercase;">Performance Score</p>
                            <div style="
                                display: inline-block;
                                background: linear-gradient(135deg, ${score >= 80 ? '#4CAF50' : score >= 60 ? '#F59E0B' : '#3B82F6'}, ${score >= 80 ? '#66BB6A' : score >= 60 ? '#FBB040' : '#60A5FA'});
                                padding: 8px 20px;
                                border-radius: 30px;
                                margin-top: 5px;
                            ">
                                <span style="color: white; font-size: 24px; font-weight: 700;">${score}%</span>
                            </div>
                        </div>
                        <div>
                            <p style="color: ${BRAND.textSecondary}; margin: 0; font-size: 14px; text-transform: uppercase;">Objective</p>
                            <p style="color: ${BRAND.textPrimary}; margin: 5px 0 0 0; font-size: 20px; font-weight: 600;">
                                Problem Validation
                            </p>
                        </div>
                    </div>
                </div>
                
                <!-- Opening Questions Section -->
                <div style="
                    background: ${BRAND.cardBg};
                    border: 1px solid ${BRAND.borderColor};
                    border-radius: 15px;
                    padding: 35px;
                    margin-bottom: 35px;
                    box-shadow: ${BRAND.cardShadow};
                ">
                    <h2 style="
                        color: ${BRAND.purple};
                        font-size: 28px;
                        margin: 0 0 30px 0;
                        padding-bottom: 15px;
                        border-bottom: 3px solid ${BRAND.purple};
                        font-weight: 700;
                    ">OPENING QUESTIONS (5 minutes)</h2>
                    
                    <ol style="color: ${BRAND.textPrimary}; font-size: 16px; line-height: 2;">
                        <li style="margin-bottom: 15px;">Can you tell me about your role and key responsibilities?</li>
                        <li style="margin-bottom: 15px;">What does a typical day look like for you?</li>
                        <li style="margin-bottom: 15px;">What are your top 3 priorities this quarter?</li>
                    </ol>
                </div>
                
                <!-- Problem Validation Section -->
                <div style="
                    background: ${BRAND.cardBg};
                    border: 1px solid ${BRAND.borderColor};
                    border-radius: 15px;
                    padding: 35px;
                    margin-bottom: 35px;
                    box-shadow: ${BRAND.cardShadow};
                ">
                    <h2 style="
                        color: ${BRAND.purple};
                        font-size: 28px;
                        margin: 0 0 30px 0;
                        padding-bottom: 15px;
                        border-bottom: 3px solid ${BRAND.purple};
                        font-weight: 700;
                    ">PROBLEM VALIDATION (15 minutes)</h2>
                    
                    <h3 style="color: ${BRAND.textPrimary}; font-size: 18px; margin: 0 0 20px 0;">
                        Based on: "${answers['core-problem']?.answer || answers['problem-what']?.answer || 'GTM execution challenges'}"
                    </h3>
                    
                    <ol style="
                        background: linear-gradient(135deg, rgba(156, 39, 176, 0.1), rgba(156, 39, 176, 0.05));
                        padding: 30px;
                        border-radius: 10px;
                        color: ${BRAND.textPrimary};
                        font-size: 16px;
                        line-height: 2;
                    ">
                        <li style="margin-bottom: 15px;">Have you experienced challenges with [specific problem]?</li>
                        <li style="margin-bottom: 15px;">How often does this problem occur? Daily/Weekly/Monthly?</li>
                        <li style="margin-bottom: 15px;">What's the impact when this happens? (Time/Money/Resources)</li>
                        <li style="margin-bottom: 15px;">How are you currently solving or working around this?</li>
                        <li style="margin-bottom: 15px;">What's not ideal about your current solution?</li>
                        <li>If you had a magic wand, how would you solve this?</li>
                    </ol>
                </div>
                
                <!-- Solution Exploration Section -->
                <div style="
                    background: ${BRAND.cardBg};
                    border: 1px solid ${BRAND.borderColor};
                    border-radius: 15px;
                    padding: 35px;
                    margin-bottom: 35px;
                    box-shadow: ${BRAND.cardShadow};
                ">
                    <h2 style="
                        color: ${BRAND.purple};
                        font-size: 28px;
                        margin: 0 0 30px 0;
                        padding-bottom: 15px;
                        border-bottom: 3px solid ${BRAND.purple};
                        font-weight: 700;
                    ">SOLUTION EXPLORATION (15 minutes)</h2>
                    
                    <h3 style="color: ${BRAND.textPrimary}; font-size: 18px; margin: 0 0 20px 0;">
                        Customized for ${score}% Performance Level
                    </h3>
                    
                    <ol style="
                        background: linear-gradient(135deg, rgba(156, 39, 176, 0.1), rgba(156, 39, 176, 0.05));
                        padding: 30px;
                        border-radius: 10px;
                        color: ${BRAND.textPrimary};
                        font-size: 16px;
                        line-height: 2;
                    ">
                        ${score >= 80 ? `
                            <li style="margin-bottom: 15px;">What advanced features would make this solution indispensable?</li>
                            <li style="margin-bottom: 15px;">How would you measure ROI for this solution?</li>
                            <li style="margin-bottom: 15px;">What integrations are critical for your workflow?</li>
                            <li style="margin-bottom: 15px;">Would you be interested in being a design partner?</li>
                            <li>What's your budget for solutions in this category?</li>
                        ` : score >= 60 ? `
                            <li style="margin-bottom: 15px;">What are the must-have features vs nice-to-haves?</li>
                            <li style="margin-bottom: 15px;">How would this fit into your existing workflow?</li>
                            <li style="margin-bottom: 15px;">What would success look like after 90 days?</li>
                            <li style="margin-bottom: 15px;">Who else would need to approve this purchase?</li>
                            <li>What's your typical evaluation process?</li>
                        ` : `
                            <li style="margin-bottom: 15px;">What would need to be true for you to try a new solution?</li>
                            <li style="margin-bottom: 15px;">What are your biggest concerns about changing solutions?</li>
                            <li style="margin-bottom: 15px;">How do you typically evaluate new tools?</li>
                            <li style="margin-bottom: 15px;">What's your budget range for this type of solution?</li>
                            <li>Would you be willing to pilot a solution?</li>
                        `}
                    </ol>
                </div>
                
                <!-- Closing Section -->
                <div style="
                    background: linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(76, 175, 80, 0.05));
                    border: 2px solid rgba(76, 175, 80, 0.3);
                    border-radius: 15px;
                    padding: 35px;
                    margin-bottom: 35px;
                    box-shadow: ${BRAND.cardShadow};
                ">
                    <h2 style="color: #4CAF50; font-size: 28px; margin: 0 0 30px 0; font-weight: 700;">
                        CLOSING & NEXT STEPS (5 minutes)
                    </h2>
                    
                    <ol style="color: ${BRAND.textPrimary}; font-size: 16px; line-height: 2;">
                        <li style="margin-bottom: 15px;">What haven't I asked that I should have?</li>
                        <li style="margin-bottom: 15px;">Who else should I talk to about this problem?</li>
                        <li style="margin-bottom: 15px;">Can I follow up with you as we develop our solution?</li>
                        <li style="margin-bottom: 15px;">Would you like to be part of our beta program?</li>
                        <li>Do you have any questions for me?</li>
                    </ol>
                </div>
                
                <!-- Post-Interview Checklist -->
                <div style="
                    background: ${BRAND.cardBg};
                    border: 1px solid ${BRAND.borderColor};
                    border-radius: 15px;
                    padding: 35px;
                    box-shadow: ${BRAND.cardShadow};
                ">
                    <h2 style="
                        color: ${BRAND.purple};
                        font-size: 28px;
                        margin: 0 0 30px 0;
                        padding-bottom: 15px;
                        border-bottom: 3px solid ${BRAND.purple};
                        font-weight: 700;
                    ">POST-INTERVIEW CHECKLIST</h2>
                    
                    <ul style="color: ${BRAND.textPrimary}; font-size: 16px; line-height: 2.5; list-style: none; padding: 0;">
                        <li style="margin-bottom: 10px;">☐ Send thank you email within 24 hours</li>
                        <li style="margin-bottom: 10px;">☐ Document key insights and quotes</li>
                        <li style="margin-bottom: 10px;">☐ Update problem/solution hypotheses</li>
                        <li style="margin-bottom: 10px;">☐ Share learnings with team</li>
                        <li style="margin-bottom: 10px;">☐ Schedule follow-up if appropriate</li>
                        <li>☐ Add to CRM with detailed notes</li>
                    </ul>
                </div>
            </div>
            
            <!-- Footer -->
            <div style="
                background: linear-gradient(135deg, #1a1a1a, #0a0a0a);
                padding: 30px;
                text-align: center;
                border-top: 2px solid ${BRAND.borderColor};
            ">
                <img src="Official_ScaleOps6_Logo.png" alt="ScaleOps6" style="height: 40px; margin-bottom: 15px;">
                <p style="color: ${BRAND.textSecondary}; margin: 0; font-size: 14px;">
                    Generated by ScaleOps6 Platform • ${new Date().toLocaleString()}
                </p>
            </div>
        `;
    };
    
    // Market Validation Scorecard with full content
    window.generateMarketValidationScorecard = function(answers, score) {
        return `
            <!-- Header with Orange Gradient -->
            <div style="
                background: linear-gradient(135deg, #FF5500, #ff8844);
                padding: 50px;
                text-align: center;
                position: relative;
                overflow: hidden;
            ">
                <h1 style="
                    margin: 0;
                    font-size: 48px;
                    font-weight: 800;
                    color: white;
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
                    letter-spacing: 2px;
                ">MARKET VALIDATION SCORECARD</h1>
                <p style="
                    margin: 15px 0 0 0;
                    font-size: 20px;
                    color: rgba(255,255,255,0.9);
                    font-weight: 300;
                    letter-spacing: 1px;
                ">Comprehensive Market Assessment Framework</p>
            </div>
            
            <!-- Content Container -->
            <div style="background: ${BRAND.darkBg}; padding: 50px;">
                <!-- Assessment Overview Card -->
                <div style="
                    background: ${BRAND.cardBg};
                    border: 1px solid ${BRAND.borderColor};
                    border-radius: 15px;
                    padding: 35px;
                    margin-bottom: 35px;
                    box-shadow: ${BRAND.cardShadow};
                ">
                    <h2 style="
                        color: ${BRAND.info};
                        font-size: 28px;
                        margin: 0 0 25px 0;
                        padding-bottom: 15px;
                        border-bottom: 3px solid ${BRAND.info};
                        font-weight: 700;
                    ">Assessment Overview</h2>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div>
                            <p style="color: ${BRAND.textSecondary}; margin: 0; font-size: 14px; text-transform: uppercase;">Company</p>
                            <p style="color: ${BRAND.textPrimary}; margin: 5px 0 0 0; font-size: 20px; font-weight: 600;">
                                ${answers['company-name']?.answer || 'ST6Co'}
                            </p>
                        </div>
                        <div>
                            <p style="color: ${BRAND.textSecondary}; margin: 0; font-size: 14px; text-transform: uppercase;">Product</p>
                            <p style="color: ${BRAND.textPrimary}; margin: 5px 0 0 0; font-size: 20px; font-weight: 600;">
                                ${answers['product-name']?.answer || 'ScaleOps6Product'}
                            </p>
                        </div>
                        <div>
                            <p style="color: ${BRAND.textSecondary}; margin: 0; font-size: 14px; text-transform: uppercase;">Market</p>
                            <p style="color: ${BRAND.textPrimary}; margin: 5px 0 0 0; font-size: 20px; font-weight: 600;">
                                ${answers['target-market']?.answer || 'B2B SaaS GTM Solutions'}
                            </p>
                        </div>
                        <div>
                            <p style="color: ${BRAND.textSecondary}; margin: 0; font-size: 14px; text-transform: uppercase;">Overall Score</p>
                            <div style="
                                display: inline-block;
                                background: linear-gradient(135deg, ${score >= 80 ? '#4CAF50' : score >= 60 ? '#F59E0B' : '#3B82F6'}, ${score >= 80 ? '#66BB6A' : score >= 60 ? '#FBB040' : '#60A5FA'});
                                padding: 8px 20px;
                                border-radius: 30px;
                                margin-top: 5px;
                            ">
                                <span style="color: white; font-size: 24px; font-weight: 700;">${score}%</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Market Opportunity Section -->
                <div style="
                    background: ${BRAND.cardBg};
                    border: 1px solid ${BRAND.borderColor};
                    border-radius: 15px;
                    padding: 35px;
                    margin-bottom: 35px;
                    box-shadow: ${BRAND.cardShadow};
                ">
                    <h2 style="
                        color: ${BRAND.info};
                        font-size: 28px;
                        margin: 0 0 30px 0;
                        padding-bottom: 15px;
                        border-bottom: 3px solid ${BRAND.info};
                        font-weight: 700;
                    ">MARKET OPPORTUNITY</h2>
                    
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr style="background: ${BRAND.darkBg};">
                            <th style="padding: 15px; text-align: left; border: 1px solid ${BRAND.borderColor}; color: ${BRAND.textPrimary};">Criteria</th>
                            <th style="padding: 15px; text-align: center; border: 1px solid ${BRAND.borderColor}; color: ${BRAND.textPrimary};">Score</th>
                            <th style="padding: 15px; text-align: left; border: 1px solid ${BRAND.borderColor}; color: ${BRAND.textPrimary};">Assessment</th>
                        </tr>
                        <tr>
                            <td style="padding: 15px; border: 1px solid ${BRAND.borderColor}; color: ${BRAND.textPrimary};"><strong>Market Size</strong></td>
                            <td style="padding: 15px; text-align: center; border: 1px solid ${BRAND.borderColor}; color: #4CAF50; font-weight: bold;">9/10</td>
                            <td style="padding: 15px; border: 1px solid ${BRAND.borderColor}; color: ${BRAND.textSecondary};">$75B+ addressable market</td>
                        </tr>
                        <tr style="background: rgba(255,255,255,0.02);">
                            <td style="padding: 15px; border: 1px solid ${BRAND.borderColor}; color: ${BRAND.textPrimary};"><strong>Growth Rate</strong></td>
                            <td style="padding: 15px; text-align: center; border: 1px solid ${BRAND.borderColor}; color: #4CAF50; font-weight: bold;">8/10</td>
                            <td style="padding: 15px; border: 1px solid ${BRAND.borderColor}; color: ${BRAND.textSecondary};">23% CAGR projected</td>
                        </tr>
                        <tr>
                            <td style="padding: 15px; border: 1px solid ${BRAND.borderColor}; color: ${BRAND.textPrimary};"><strong>Competition</strong></td>
                            <td style="padding: 15px; text-align: center; border: 1px solid ${BRAND.borderColor}; color: #F59E0B; font-weight: bold;">6/10</td>
                            <td style="padding: 15px; border: 1px solid ${BRAND.borderColor}; color: ${BRAND.textSecondary};">Fragmented, no clear leader</td>
                        </tr>
                        <tr style="background: rgba(255,255,255,0.02);">
                            <td style="padding: 15px; border: 1px solid ${BRAND.borderColor}; color: ${BRAND.textPrimary};"><strong>Entry Barriers</strong></td>
                            <td style="padding: 15px; text-align: center; border: 1px solid ${BRAND.borderColor}; color: #F59E0B; font-weight: bold;">7/10</td>
                            <td style="padding: 15px; border: 1px solid ${BRAND.borderColor}; color: ${BRAND.textSecondary};">Moderate technical requirements</td>
                        </tr>
                    </table>
                </div>
                
                <!-- Customer Validation Section -->
                <div style="
                    background: ${BRAND.cardBg};
                    border: 1px solid ${BRAND.borderColor};
                    border-radius: 15px;
                    padding: 35px;
                    margin-bottom: 35px;
                    box-shadow: ${BRAND.cardShadow};
                ">
                    <h2 style="
                        color: ${BRAND.info};
                        font-size: 28px;
                        margin: 0 0 30px 0;
                        padding-bottom: 15px;
                        border-bottom: 3px solid ${BRAND.info};
                        font-weight: 700;
                    ">CUSTOMER VALIDATION</h2>
                    
                    <div style="margin-top: 20px;">
                        <h3 style="color: ${BRAND.textPrimary}; font-size: 18px;">
                            Problem Severity: <span style="color: ${score >= 80 ? '#4CAF50' : score >= 60 ? '#F59E0B' : '#3B82F6'};">
                                ${score >= 80 ? 'CRITICAL' : score >= 60 ? 'HIGH' : 'MODERATE'}
                            </span>
                        </h3>
                        <div style="background: linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(33, 150, 243, 0.05)); padding: 20px; border-radius: 10px; margin-bottom: 25px;">
                            <p style="color: ${BRAND.textPrimary}; margin: 0; font-size: 16px;">
                                ${answers['problem-severity']?.answer || '92% of target customers experience this problem regularly'}
                            </p>
                        </div>
                        
                        <h3 style="color: ${BRAND.textPrimary}; font-size: 18px;">
                            Willingness to Pay: <span style="color: #4CAF50;">HIGH</span>
                        </h3>
                        <div style="background: linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(33, 150, 243, 0.05)); padding: 20px; border-radius: 10px; margin-bottom: 25px;">
                            <p style="color: ${BRAND.textPrimary}; margin: 0; font-size: 16px;">
                                ${answers['willingness-to-pay']?.answer || 'Customers currently spend $50K+ annually on fragmented solutions'}
                            </p>
                        </div>
                        
                        <h3 style="color: ${BRAND.textPrimary}; font-size: 18px;">
                            Adoption Likelihood: <span style="color: ${score >= 70 ? '#4CAF50' : '#F59E0B'};">
                                ${score >= 70 ? 'HIGH' : 'MODERATE'}
                            </span>
                        </h3>
                        <div style="background: linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(33, 150, 243, 0.05)); padding: 20px; border-radius: 10px;">
                            <p style="color: ${BRAND.textPrimary}; margin: 0; font-size: 16px;">
                                Based on ${score}% validation score and market readiness indicators
                            </p>
                        </div>
                    </div>
                </div>
                
                <!-- Risk Assessment Section -->
                <div style="
                    background: ${BRAND.cardBg};
                    border: 1px solid ${BRAND.borderColor};
                    border-radius: 15px;
                    padding: 35px;
                    margin-bottom: 35px;
                    box-shadow: ${BRAND.cardShadow};
                ">
                    <h2 style="
                        color: ${BRAND.info};
                        font-size: 28px;
                        margin: 0 0 30px 0;
                        padding-bottom: 15px;
                        border-bottom: 3px solid ${BRAND.info};
                        font-weight: 700;
                    ">RISK ASSESSMENT</h2>
                    
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr style="background: ${BRAND.darkBg};">
                            <th style="padding: 15px; text-align: left; border: 1px solid ${BRAND.borderColor}; color: ${BRAND.textPrimary};">Risk Type</th>
                            <th style="padding: 15px; text-align: center; border: 1px solid ${BRAND.borderColor}; color: ${BRAND.textPrimary};">Level</th>
                            <th style="padding: 15px; text-align: left; border: 1px solid ${BRAND.borderColor}; color: ${BRAND.textPrimary};">Mitigation Strategy</th>
                        </tr>
                        <tr>
                            <td style="padding: 15px; border: 1px solid ${BRAND.borderColor}; color: ${BRAND.textPrimary};"><strong>Technical</strong></td>
                            <td style="padding: 15px; text-align: center; border: 1px solid ${BRAND.borderColor}; color: #4CAF50; font-weight: bold;">LOW</td>
                            <td style="padding: 15px; border: 1px solid ${BRAND.borderColor}; color: ${BRAND.textSecondary};">Proven technology stack</td>
                        </tr>
                        <tr style="background: rgba(255,255,255,0.02);">
                            <td style="padding: 15px; border: 1px solid ${BRAND.borderColor}; color: ${BRAND.textPrimary};"><strong>Market</strong></td>
                            <td style="padding: 15px; text-align: center; border: 1px solid ${BRAND.borderColor}; color: ${score >= 70 ? '#4CAF50' : '#F59E0B'}; font-weight: bold;">
                                ${score >= 70 ? 'LOW' : 'MEDIUM'}
                            </td>
                            <td style="padding: 15px; border: 1px solid ${BRAND.borderColor}; color: ${BRAND.textSecondary};">Strong validation signals</td>
                        </tr>
                        <tr>
                            <td style="padding: 15px; border: 1px solid ${BRAND.borderColor}; color: ${BRAND.textPrimary};"><strong>Execution</strong></td>
                            <td style="padding: 15px; text-align: center; border: 1px solid ${BRAND.borderColor}; color: #F59E0B; font-weight: bold;">MEDIUM</td>
                            <td style="padding: 15px; border: 1px solid ${BRAND.borderColor}; color: ${BRAND.textSecondary};">Experienced team, clear roadmap</td>
                        </tr>
                        <tr style="background: rgba(255,255,255,0.02);">
                            <td style="padding: 15px; border: 1px solid ${BRAND.borderColor}; color: ${BRAND.textPrimary};"><strong>Financial</strong></td>
                            <td style="padding: 15px; text-align: center; border: 1px solid ${BRAND.borderColor}; color: #4CAF50; font-weight: bold;">LOW</td>
                            <td style="padding: 15px; border: 1px solid ${BRAND.borderColor}; color: ${BRAND.textSecondary};">Efficient burn, clear path to profitability</td>
                        </tr>
                    </table>
                </div>
                
                <!-- Final Recommendation -->
                <div style="
                    background: linear-gradient(135deg, rgba(255, 85, 0, 0.1), rgba(255, 85, 0, 0.05));
                    border: 2px solid ${BRAND.primary};
                    border-radius: 15px;
                    padding: 35px;
                    box-shadow: ${BRAND.cardShadow};
                ">
                    <h2 style="color: ${BRAND.primary}; font-size: 28px; margin: 0 0 30px 0; font-weight: 700;">
                        FINAL RECOMMENDATION
                    </h2>
                    
                    <div style="text-align: center; margin: 40px 0;">
                        <div style="font-size: 48px; font-weight: bold; color: ${score >= 70 ? '#4CAF50' : '#F59E0B'};">
                            ${score >= 70 ? 'PROCEED' : 'PROCEED WITH CAUTION'}
                        </div>
                        <div style="font-size: 20px; color: ${BRAND.textSecondary}; margin-top: 10px;">
                            Market Validation Score: ${score}%
                        </div>
                    </div>
                    
                    <h3 style="color: ${BRAND.textPrimary}; font-size: 20px; margin: 30px 0 20px 0;">Immediate Action Items:</h3>
                    <ol style="color: ${BRAND.textPrimary}; font-size: 16px; line-height: 2;">
                        ${score >= 80 ? `
                            <li style="margin-bottom: 10px;">Accelerate go-to-market execution</li>
                            <li style="margin-bottom: 10px;">Scale customer acquisition efforts</li>
                            <li style="margin-bottom: 10px;">Expand product feature set</li>
                            <li style="margin-bottom: 10px;">Raise growth capital if needed</li>
                            <li>Build strategic partnerships</li>
                        ` : score >= 60 ? `
                            <li style="margin-bottom: 10px;">Complete product-market fit validation</li>
                            <li style="margin-bottom: 10px;">Refine value proposition messaging</li>
                            <li style="margin-bottom: 10px;">Build initial customer base</li>
                            <li style="margin-bottom: 10px;">Establish unit economics</li>
                            <li>Prepare for seed funding</li>
                        ` : `
                            <li style="margin-bottom: 10px;">Conduct additional customer interviews</li>
                            <li style="margin-bottom: 10px;">Refine problem statement</li>
                            <li style="margin-bottom: 10px;">Build and test MVP</li>
                            <li style="margin-bottom: 10px;">Validate pricing model</li>
                            <li>Establish product-market fit</li>
                        `}
                    </ol>
                </div>
            </div>
            
            <!-- Footer -->
            <div style="
                background: linear-gradient(135deg, #1a1a1a, #0a0a0a);
                padding: 30px;
                text-align: center;
                border-top: 2px solid ${BRAND.borderColor};
            ">
                <img src="Official_ScaleOps6_Logo.png" alt="ScaleOps6" style="height: 40px; margin-bottom: 15px;">
                <p style="color: ${BRAND.textSecondary}; margin: 0; font-size: 14px;">
                    Generated by ScaleOps6 Platform • ${new Date().toLocaleString()}
                </p>
            </div>
        `;
    };
    
    // Also update the viewEnhancedTemplate function to use these new implementations
    const originalViewEnhancedTemplate = window.viewEnhancedTemplate;
    window.viewEnhancedTemplate = function(index) {
        // Call the original function which will now use our updated template generators
        if (originalViewEnhancedTemplate) {
            originalViewEnhancedTemplate.call(this, index);
        }
    };
    
    console.log('✅ Customer Interview Guide and Market Validation Scorecard templates fixed!');
    
})();
// ScaleOps6 Brand-Compliant Template Styling
// Adds polished, glossy, professional appearance to all templates

(function() {
    'use strict';
    
    console.log('🎨 Applying ScaleOps6 brand styling to templates...');
    
    // ScaleOps6 Brand Colors and Design System
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
        glowEffect: '0 0 30px rgba(255, 85, 0, 0.3)',
        cardShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
        glassMorphism: 'rgba(20, 20, 20, 0.95)',
        borderRadius: '20px'
    };
    
    // Override viewEnhancedTemplate with polished ScaleOps6 branding
    window.viewEnhancedTemplate = function(index) {
        const workspaceAnswers = {};
        const inputs = document.querySelectorAll('#workspace-tab input, #workspace-tab textarea');
        inputs.forEach(input => {
            if (input.id && input.value) {
                workspaceAnswers[input.id] = { answer: input.value };
            }
        });
        
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        const historyKey = `score_history_${subcomponentId}`;
        const scoreHistory = JSON.parse(localStorage.getItem(historyKey) || '[]');
        const latestScore = scoreHistory[0]?.score || 75;
        
        const templates = [
            {
                name: 'PROBLEM STATEMENT CANVAS',
                icon: '📋',
                gradient: BRAND.primaryGradient,
                content: generateProblemStatementCanvas(workspaceAnswers, latestScore)
            },
            {
                name: 'CUSTOMER INTERVIEW GUIDE',
                icon: '🎤',
                gradient: 'linear-gradient(135deg, #9C27B0, #BA68C8)',
                content: generateCustomerInterviewGuide(workspaceAnswers, latestScore)
            },
            {
                name: 'MARKET VALIDATION SCORECARD',
                icon: '📊',
                gradient: 'linear-gradient(135deg, #2196F3, #42A5F5)',
                content: generateMarketValidationScorecard(workspaceAnswers, latestScore)
            }
        ];
        
        // Create or get modal
        let modal = document.getElementById('template-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'template-modal';
            document.body.appendChild(modal);
        }
        
        // Apply ScaleOps6 branded modal styling
        modal.style.cssText = `
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(10, 10, 10, 0.98), rgba(20, 20, 20, 0.98));
            backdrop-filter: blur(20px);
            z-index: 10000;
            overflow-y: auto;
            animation: fadeIn 0.3s ease;
        `;
        
        modal.innerHTML = `
            <style>
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { transform: translateY(30px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes glow {
                    0%, 100% { box-shadow: 0 0 20px rgba(255, 85, 0, 0.3); }
                    50% { box-shadow: 0 0 40px rgba(255, 85, 0, 0.5); }
                }
                .st6-modal-content {
                    animation: slideUp 0.5s ease;
                }
                .st6-close-btn:hover {
                    transform: scale(1.1);
                    box-shadow: 0 5px 20px rgba(255, 85, 0, 0.5);
                }
                .st6-download-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 30px rgba(255, 85, 0, 0.4);
                }
                .st6-section {
                    transition: all 0.3s ease;
                }
                .st6-section:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 15px 40px rgba(255, 85, 0, 0.2);
                }
            </style>
            
            <div class="st6-modal-content" style="max-width: 1200px; margin: 40px auto; padding: 20px;">
                <!-- Close Button -->
                <button onclick="document.getElementById('template-modal').style.display='none'" 
                    class="st6-close-btn"
                    style="
                        position: fixed;
                        top: 30px;
                        right: 30px;
                        background: ${BRAND.primaryGradient};
                        color: white;
                        border: none;
                        padding: 15px 30px;
                        border-radius: 50px;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                        z-index: 10001;
                        transition: all 0.3s ease;
                        box-shadow: ${BRAND.cardShadow};
                    ">
                    ✕ Close
                </button>
                
                <!-- Template Content Container -->
                <div style="
                    background: ${BRAND.glassMorphism};
                    border: 2px solid ${BRAND.borderColor};
                    border-radius: ${BRAND.borderRadius};
                    overflow: hidden;
                    box-shadow: ${BRAND.cardShadow};
                    animation: glow 3s ease infinite;
                ">
                    ${templates[index].content}
                </div>
                
                <!-- Download Button -->
                <div style="text-align: center; margin-top: 40px;">
                    <button onclick="window.downloadEnhancedTemplate(${index})" 
                        class="st6-download-btn"
                        style="
                            background: ${BRAND.primaryGradient};
                            color: white;
                            border: none;
                            padding: 18px 50px;
                            border-radius: 50px;
                            font-size: 18px;
                            font-weight: 600;
                            cursor: pointer;
                            transition: all 0.3s ease;
                            box-shadow: ${BRAND.cardShadow};
                        ">
                        📥 Download This Template
                    </button>
                </div>
            </div>
        `;
    };
    
    // Generate Problem Statement Canvas with ScaleOps6 branding
    function generateProblemStatementCanvas(answers, score) {
        return `
            <!-- Header with Gradient -->
            <div style="
                background: ${BRAND.primaryGradient};
                padding: 50px;
                text-align: center;
                position: relative;
                overflow: hidden;
            ">
                <div style="
                    position: absolute;
                    top: -50%;
                    left: -10%;
                    width: 120%;
                    height: 200%;
                    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
                    animation: rotate 20s linear infinite;
                "></div>
                <h1 style="
                    margin: 0;
                    font-size: 48px;
                    font-weight: 800;
                    color: white;
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
                    letter-spacing: 2px;
                    position: relative;
                ">PROBLEM STATEMENT CANVAS</h1>
                <p style="
                    margin: 15px 0 0 0;
                    font-size: 20px;
                    color: rgba(255,255,255,0.9);
                    font-weight: 300;
                    letter-spacing: 1px;
                    position: relative;
                ">Executive Strategic Framework</p>
            </div>
            
            <!-- Content Container -->
            <div style="
                background: ${BRAND.darkBg};
                padding: 50px;
            ">
                <!-- Problem Section -->
                <div class="st6-section" style="
                    background: ${BRAND.cardBg};
                    border: 1px solid ${BRAND.borderColor};
                    border-radius: 15px;
                    padding: 35px;
                    margin-bottom: 35px;
                    box-shadow: ${BRAND.cardShadow};
                ">
                    <h2 style="
                        color: ${BRAND.primary};
                        font-size: 28px;
                        margin: 0 0 30px 0;
                        padding-bottom: 15px;
                        border-bottom: 3px solid ${BRAND.primary};
                        font-weight: 700;
                    ">1. THE PROBLEM</h2>
                    
                    <div style="margin-bottom: 30px;">
                        <h3 style="color: ${BRAND.textPrimary}; font-size: 18px; margin: 0 0 15px 0; font-weight: 600;">
                            Who experiences this problem?
                        </h3>
                        <div style="
                            background: linear-gradient(135deg, rgba(255, 85, 0, 0.1), rgba(255, 85, 0, 0.05));
                            border-left: 4px solid ${BRAND.primary};
                            padding: 20px;
                            border-radius: 10px;
                        ">
                            <p style="color: ${BRAND.textPrimary}; margin: 0; font-size: 16px; line-height: 1.6;">
                                ${answers['target-audience']?.answer || 'B2B SaaS startups experiencing GTM execution failures'}
                            </p>
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 30px;">
                        <h3 style="color: ${BRAND.textPrimary}; font-size: 18px; margin: 0 0 15px 0; font-weight: 600;">
                            What specific problem are they facing?
                        </h3>
                        <div style="
                            background: linear-gradient(135deg, rgba(255, 85, 0, 0.1), rgba(255, 85, 0, 0.05));
                            border-left: 4px solid ${BRAND.primary};
                            padding: 20px;
                            border-radius: 10px;
                        ">
                            <p style="color: ${BRAND.textPrimary}; margin: 0; font-size: 16px; line-height: 1.6;">
                                ${answers['problem-what']?.answer || '92% of startups fail within 3 years due to GTM execution challenges'}
                            </p>
                        </div>
                    </div>
                    
                    <div>
                        <h3 style="color: ${BRAND.textPrimary}; font-size: 18px; margin: 0 0 15px 0; font-weight: 600;">
                            Why is this problem critical?
                        </h3>
                        <div style="
                            background: linear-gradient(135deg, rgba(255, 85, 0, 0.1), rgba(255, 85, 0, 0.05));
                            border-left: 4px solid ${BRAND.primary};
                            padding: 20px;
                            border-radius: 10px;
                        ">
                            <p style="color: ${BRAND.textPrimary}; margin: 0; font-size: 16px; line-height: 1.6;">
                                ${answers['problem-impact']?.answer || 'Fragmented solutions across 15+ vendors with no unified strategy'}
                            </p>
                        </div>
                    </div>
                </div>
                
                <!-- Impact Analysis Section -->
                <div class="st6-section" style="
                    background: ${BRAND.cardBg};
                    border: 1px solid ${BRAND.borderColor};
                    border-radius: 15px;
                    padding: 35px;
                    margin-bottom: 35px;
                    box-shadow: ${BRAND.cardShadow};
                ">
                    <h2 style="
                        color: ${BRAND.primary};
                        font-size: 28px;
                        margin: 0 0 30px 0;
                        padding-bottom: 15px;
                        border-bottom: 3px solid ${BRAND.primary};
                        font-weight: 700;
                    ">2. IMPACT ANALYSIS</h2>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px;">
                        <div style="
                            background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05));
                            border: 1px solid rgba(239, 68, 68, 0.3);
                            border-radius: 12px;
                            padding: 25px;
                        ">
                            <h4 style="color: #EF4444; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">
                                💰 Financial Impact
                            </h4>
                            <p style="color: ${BRAND.textPrimary}; margin: 0; font-size: 15px; line-height: 1.6;">
                                Average $750K wasted on failed GTM initiatives
                            </p>
                        </div>
                        
                        <div style="
                            background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05));
                            border: 1px solid rgba(245, 158, 11, 0.3);
                            border-radius: 12px;
                            padding: 25px;
                        ">
                            <h4 style="color: #F59E0B; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">
                                ⏱️ Time Impact
                            </h4>
                            <p style="color: ${BRAND.textPrimary}; margin: 0; font-size: 15px; line-height: 1.6;">
                                18-month delay in achieving product-market fit
                            </p>
                        </div>
                        
                        <div style="
                            background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05));
                            border: 1px solid rgba(59, 130, 246, 0.3);
                            border-radius: 12px;
                            padding: 25px;
                        ">
                            <h4 style="color: #3B82F6; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">
                                📈 Growth Impact
                            </h4>
                            <p style="color: ${BRAND.textPrimary}; margin: 0; font-size: 15px; line-height: 1.6;">
                                3x higher customer acquisition costs
                            </p>
                        </div>
                        
                        <div style="
                            background: linear-gradient(135deg, rgba(156, 39, 176, 0.1), rgba(156, 39, 176, 0.05));
                            border: 1px solid rgba(156, 39, 176, 0.3);
                            border-radius: 12px;
                            padding: 25px;
                        ">
                            <h4 style="color: #9C27B0; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">
                                🎯 Market Impact
                            </h4>
                            <p style="color: ${BRAND.textPrimary}; margin: 0; font-size: 15px; line-height: 1.6;">
                                70% cite go-to-market as primary failure cause
                            </p>
                        </div>
                    </div>
                </div>
                
                <!-- Recommendations Section -->
                <div class="st6-section" style="
                    background: linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(76, 175, 80, 0.05));
                    border: 2px solid rgba(76, 175, 80, 0.3);
                    border-radius: 15px;
                    padding: 35px;
                    margin-bottom: 35px;
                    box-shadow: ${BRAND.cardShadow};
                ">
                    <h2 style="
                        color: #4CAF50;
                        font-size: 28px;
                        margin: 0 0 25px 0;
                        font-weight: 700;
                    ">3. EXPERT RECOMMENDATIONS</h2>
                    
                    <p style="
                        color: ${BRAND.textPrimary};
                        font-size: 16px;
                        margin: 0 0 25px 0;
                        padding: 15px;
                        background: rgba(76, 175, 80, 0.1);
                        border-radius: 10px;
                    ">
                        Based on your <strong>${score}% performance score</strong>, here are your strategic priorities:
                    </p>
                    
                    <div style="display: grid; gap: 15px;">
                        ${score >= 80 ? `
                            <div style="display: flex; align-items: center; gap: 15px;">
                                <span style="background: #4CAF50; color: white; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700;">1</span>
                                <span style="color: ${BRAND.textPrimary}; font-size: 16px;">Scale your validated solution across new market segments</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 15px;">
                                <span style="background: #4CAF50; color: white; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700;">2</span>
                                <span style="color: ${BRAND.textPrimary}; font-size: 16px;">Document and systematize your successful processes</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 15px;">
                                <span style="background: #4CAF50; color: white; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700;">3</span>
                                <span style="color: ${BRAND.textPrimary}; font-size: 16px;">Explore strategic partnerships for accelerated growth</span>
                            </div>
                        ` : score >= 60 ? `
                            <div style="display: flex; align-items: center; gap: 15px;">
                                <span style="background: #F59E0B; color: white; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700;">1</span>
                                <span style="color: ${BRAND.textPrimary}; font-size: 16px;">Focus on optimizing core operational processes</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 15px;">
                                <span style="background: #F59E0B; color: white; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700;">2</span>
                                <span style="color: ${BRAND.textPrimary}; font-size: 16px;">Implement comprehensive customer feedback systems</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 15px;">
                                <span style="background: #F59E0B; color: white; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700;">3</span>
                                <span style="color: ${BRAND.textPrimary}; font-size: 16px;">Strengthen product-market fit validation</span>
                            </div>
                        ` : `
                            <div style="display: flex; align-items: center; gap: 15px;">
                                <span style="background: #3B82F6; color: white; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700;">1</span>
                                <span style="color: ${BRAND.textPrimary}; font-size: 16px;">Prioritize problem validation with target customers</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 15px;">
                                <span style="background: #3B82F6; color: white; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700;">2</span>
                                <span style="color: ${BRAND.textPrimary}; font-size: 16px;">Establish clear value proposition</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 15px;">
                                <span style="background: #3B82F6; color: white; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700;">3</span>
                                <span style="color: ${BRAND.textPrimary}; font-size: 16px;">Build minimum viable solution for testing</span>
                            </div>
                        `}
                    </div>
                </div>
                
                <!-- Next Steps Section -->
                <div class="st6-section" style="
                    background: ${BRAND.cardBg};
                    border: 1px solid ${BRAND.borderColor};
                    border-radius: 15px;
                    padding: 35px;
                    box-shadow: ${BRAND.cardShadow};
                ">
                    <h2 style="
                        color: ${BRAND.primary};
                        font-size: 28px;
                        margin: 0 0 30px 0;
                        padding-bottom: 15px;
                        border-bottom: 3px solid ${BRAND.primary};
                        font-weight: 700;
                    ">4. STRATEGIC NEXT STEPS</h2>
                    
                    <div style="display: grid; gap: 20px;">
                        <div style="
                            background: linear-gradient(135deg, rgba(255, 85, 0, 0.05), transparent);
                            border-left: 3px solid ${BRAND.primary};
                            padding: 20px;
                            border-radius: 8px;
                        ">
                            <h4 style="color: ${BRAND.primary}; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">
                                Week 1-2: Immediate Actions
                            </h4>
                            <p style="color: ${BRAND.textPrimary}; margin: 0; font-size: 15px; line-height: 1.6;">
                                Validate assumptions with 10-15 customer interviews
                            </p>
                        </div>
                        
                        <div style="
                            background: linear-gradient(135deg, rgba(245, 158, 11, 0.05), transparent);
                            border-left: 3px solid #F59E0B;
                            padding: 20px;
                            border-radius: 8px;
                        ">
                            <h4 style="color: #F59E0B; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">
                                Month 1: Short-term Goals
                            </h4>
                            <p style="color: ${BRAND.textPrimary}; margin: 0; font-size: 15px; line-height: 1.6;">
                                Quantify problem impact with specific metrics
                            </p>
                        </div>
                        
                        <div style="
                            background: linear-gradient(135deg, rgba(76, 175, 80, 0.05), transparent);
                            border-left: 3px solid #4CAF50;
                            padding: 20px;
                            border-radius: 8px;
                        ">
                            <h4 style="color: #4CAF50; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">
                                Month 2-3: Medium-term Objectives
                            </h4>
                            <p style="color: ${BRAND.textPrimary}; margin: 0; font-size: 15px; line-height: 1.6;">
                                Develop and test MVP solution with early adopters
                            </p>
                        </div>
                    </div>
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
                <p style="color: ${BRAND.textSecondary}; margin: 10px 0 0 0; font-size: 12px;">
                    © 2025 ScaleOps6. All rights reserved.
                </p>
            </div>
        `;
    }
    
    // Generate Customer Interview Guide - delegate to complete implementation
    function generateCustomerInterviewGuide(answers, score) {
        // Check if the complete implementation exists
        if (typeof window.generateCustomerInterviewGuide === 'function') {
            return window.generateCustomerInterviewGuide(answers, score);
        }
        // Fallback placeholder
        return `<div style="padding: 50px; text-align: center; color: #999;">Customer Interview Guide template loading...</div>`;
    }
    
    // Generate Market Validation Scorecard - delegate to complete implementation
    function generateMarketValidationScorecard(answers, score) {
        // Check if the complete implementation exists
        if (typeof window.generateMarketValidationScorecard === 'function') {
            return window.generateMarketValidationScorecard(answers, score);
        }
        // Fallback placeholder
        return `<div style="padding: 50px; text-align: center; color: #999;">Market Validation Scorecard template loading...</div>`;
    }
    
    // Expose the main generateTemplate function globally
    window.generateTemplate = function(templateType, answers, score) {
        switch(templateType) {
            case 'problem-statement':
                return generateProblemStatementCanvas(answers, score);
            case 'customer-interview':
                return generateCustomerInterviewGuide(answers, score);
            case 'market-validation':
                return generateMarketValidationScorecard(answers, score);
            default:
                return `<div style="padding: 50px; text-align: center; color: #999;">Unknown template type: ${templateType}</div>`;
        }
    };
    
    // Also expose individual functions globally for direct access
    window.generateProblemStatementCanvas = generateProblemStatementCanvas;
    window.generateCustomerInterviewGuide = generateCustomerInterviewGuide;
    window.generateMarketValidationScorecard = generateMarketValidationScorecard;
    
    console.log('✅ ScaleOps6 brand styling applied to templates!');
    
})();
/**
 * Restore Real World Use Cases Section with ACTUAL Company Examples
 * This script adds the 6-card visual layout for real-world examples in the Education tab
 * Content is pulled from the real-world-examples-all-96-complete.js database
 */

(function() {
    'use strict';
    
    console.log('🌍 Restoring Real World Use Cases section with actual company examples...');
    
    // Hook into the existing updateEducationTab function
    const originalUpdateEducationTab = window.updateEducationTab;
    
    window.updateEducationTab = function(education) {
        const educationTab = document.getElementById('education-tab');
        if (!educationTab) return;
        
        let html = '';
        
        // What section
        if (education.what) {
            html += `
                <div class="education-section">
                    <h2 class="section-title">
                        <span class="section-icon">🎯</span>
                        What is ${education.title || 'This'}?
                    </h2>
                    <div class="section-content">
                        <p>${education.what}</p>
                    </div>
                </div>
            `;
        }
        
        // Why section
        if (education.why) {
            html += `
                <div class="education-section">
                    <h2 class="section-title">
                        <span class="section-icon">💡</span>
                        Why It Matters
                    </h2>
                    <div class="section-content">
                        <p>${education.why}</p>
                    </div>
                </div>
            `;
        }
        
        // How section
        if (education.how) {
            html += `
                <div class="education-section">
                    <h2 class="section-title">
                        <span class="section-icon">🚀</span>
                        How to Implement
                    </h2>
                    <div class="section-content">
                        ${education.how}
                    </div>
                </div>
            `;
        }
        
        // NEW: Real World Use Cases Section with ACTUAL Company Examples
        html += generateRealWorldUseCasesSection();
        
        // Metrics section
        if (education.metrics && education.metrics.length > 0) {
            html += `
                <div class="education-section">
                    <h2 class="section-title">
                        <span class="section-icon">📊</span>
                        Key Metrics
                    </h2>
                    <div class="section-content">
                        <ul class="bullet-list">
                            ${education.metrics.map(metric => `
                                <li>${metric}</li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            `;
        }
        
        educationTab.innerHTML = html || '<div style="text-align: center; padding: 60px 20px; color: #999;">No educational content available for this subcomponent.</div>';
    };
    
    // Generate the Real World Use Cases section with actual company data
    function generateRealWorldUseCasesSection() {
        const subcomponentId = new URLSearchParams(window.location.search).get('id') || '1-1';
        
        // Get real examples from the database
        const realExamples = getRealCompanyExamples(subcomponentId);
        
        if (!realExamples || realExamples.length === 0) {
            return ''; // Don't show section if no examples
        }
        
        return `
            <div class="education-section">
                <h2 class="section-title">
                    <span class="section-icon">🌍</span>
                    Real World Use Cases
                </h2>
                
                <style>
                    .use-cases-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                        gap: 20px;
                        margin-top: 25px;
                    }
                    
                    .use-case-card {
                        background: linear-gradient(135deg, rgba(255, 85, 0, 0.1), rgba(255, 85, 0, 0.05));
                        border: 2px solid rgba(255, 85, 0, 0.3);
                        border-radius: 15px;
                        padding: 25px;
                        transition: all 0.3s ease;
                        cursor: pointer;
                        position: relative;
                        overflow: hidden;
                    }
                    
                    .use-case-card:hover {
                        transform: translateY(-5px);
                        border-color: #FF5500;
                        box-shadow: 0 10px 30px rgba(255, 85, 0, 0.3);
                        background: linear-gradient(135deg, rgba(255, 85, 0, 0.15), rgba(255, 85, 0, 0.08));
                    }
                    
                    .use-case-card::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        height: 4px;
                        background: linear-gradient(90deg, #FF5500, #FF8800);
                        transform: scaleX(0);
                        transition: transform 0.3s ease;
                    }
                    
                    .use-case-card:hover::before {
                        transform: scaleX(1);
                    }
                    
                    .company-header {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-bottom: 15px;
                    }
                    
                    .company-name {
                        font-size: 20px;
                        font-weight: 700;
                        color: #FF5500;
                        margin: 0;
                    }
                    
                    .company-valuation {
                        background: rgba(76, 175, 80, 0.2);
                        color: #4CAF50;
                        padding: 4px 10px;
                        border-radius: 15px;
                        font-size: 12px;
                        font-weight: 600;
                    }
                    
                    .use-case-category {
                        color: #999;
                        font-size: 13px;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                        margin-bottom: 10px;
                    }
                    
                    .use-case-description {
                        font-size: 14px;
                        color: #ccc;
                        line-height: 1.6;
                        margin-bottom: 15px;
                    }
                    
                    .use-case-outcome {
                        background: rgba(255, 85, 0, 0.1);
                        border-left: 3px solid #FF5500;
                        padding: 10px;
                        margin-top: 15px;
                        font-size: 13px;
                        color: #ffaa66;
                    }
                    
                    .use-case-tags {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 8px;
                        margin-top: 15px;
                    }
                    
                    .use-case-tag {
                        background: rgba(255, 85, 0, 0.2);
                        color: #FF8800;
                        padding: 4px 10px;
                        border-radius: 15px;
                        font-size: 11px;
                        font-weight: 600;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }
                    
                    .company-year {
                        position: absolute;
                        top: 15px;
                        right: 15px;
                        background: rgba(0, 0, 0, 0.5);
                        color: #999;
                        padding: 4px 8px;
                        border-radius: 8px;
                        font-size: 11px;
                        font-weight: 600;
                    }
                </style>
                
                <div class="use-cases-grid">
                    ${realExamples.map((example, index) => `
                        <div class="use-case-card" onclick="expandUseCase(${index})">
                            <div class="company-year">${example.year}</div>
                            <div class="company-header">
                                <h3 class="company-name">${example.company}</h3>
                                <span class="company-valuation">${example.valuation}</span>
                            </div>
                            <div class="use-case-category">${example.category}</div>
                            <p class="use-case-description">${example.useCase}</p>
                            <div class="use-case-outcome">
                                <strong>Outcome:</strong> ${example.outcome}
                            </div>
                            <div class="use-case-tags">
                                ${example.keyElements.map(element => `
                                    <span class="use-case-tag">${element}</span>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    // Get real company examples from the database
    function getRealCompanyExamples(subcomponentId) {
        // Check if the real world examples database is loaded
        if (typeof window.realWorldExamplesComplete === 'undefined') {
            console.warn('Real world examples database not loaded yet');
            return [];
        }
        
        const exampleData = window.realWorldExamplesComplete[subcomponentId];
        
        if (!exampleData || !exampleData.examples) {
            console.log(`No real world examples found for subcomponent ${subcomponentId}`);
            return [];
        }
        
        // Return all 6 examples if available
        return exampleData.examples.slice(0, 6);
    }
    
    // Global function to expand use case details
    window.expandUseCase = function(index) {
        const subcomponentId = new URLSearchParams(window.location.search).get('id') || '1-1';
        const examples = getRealCompanyExamples(subcomponentId);
        
        if (examples && examples[index]) {
            const example = examples[index];
            console.log(`Expanding ${example.company} use case:`, example);
            
            // Could open a modal with more details
            showUseCaseModal(example);
        }
    };
    
    // Show detailed modal for a use case
    function showUseCaseModal(example) {
        // Remove existing modal if any
        const existingModal = document.getElementById('use-case-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        const modal = document.createElement('div');
        modal.id = 'use-case-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.95);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        `;
        
        modal.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #1a1a1a, #0a0a0a);
                border: 2px solid #FF5500;
                border-radius: 20px;
                max-width: 800px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                padding: 40px;
                position: relative;
            ">
                <button onclick="document.getElementById('use-case-modal').remove()" style="
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: #FF5500;
                    color: white;
                    border: none;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    font-size: 20px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">✕</button>
                
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
                    <h2 style="color: #FF5500; font-size: 32px; margin: 0;">${example.company}</h2>
                    <span style="
                        background: linear-gradient(135deg, #4CAF50, #66BB6A);
                        color: white;
                        padding: 8px 16px;
                        border-radius: 20px;
                        font-weight: 600;
                    ">${example.valuation}</span>
                </div>
                
                <div style="color: #999; margin-bottom: 20px;">
                    <span style="margin-right: 20px;">📅 Founded: ${example.year}</span>
                    <span>🏢 ${example.category}</span>
                </div>
                
                <div style="
                    background: rgba(255, 85, 0, 0.1);
                    border-left: 4px solid #FF5500;
                    padding: 20px;
                    margin: 20px 0;
                    border-radius: 8px;
                ">
                    <h3 style="color: #FF5500; margin-top: 0;">Use Case</h3>
                    <p style="color: #ccc; line-height: 1.8; margin: 0;">${example.useCase}</p>
                </div>
                
                <div style="
                    background: rgba(76, 175, 80, 0.1);
                    border-left: 4px solid #4CAF50;
                    padding: 20px;
                    margin: 20px 0;
                    border-radius: 8px;
                ">
                    <h3 style="color: #4CAF50; margin-top: 0;">Outcome</h3>
                    <p style="color: #ccc; line-height: 1.8; margin: 0;">${example.outcome}</p>
                </div>
                
                <div style="margin-top: 30px;">
                    <h3 style="color: #FF5500; margin-bottom: 15px;">Key Success Elements</h3>
                    <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                        ${example.keyElements.map(element => `
                            <span style="
                                background: linear-gradient(135deg, rgba(255, 85, 0, 0.3), rgba(255, 85, 0, 0.1));
                                color: #FF8800;
                                padding: 8px 16px;
                                border-radius: 20px;
                                font-weight: 600;
                                border: 1px solid rgba(255, 85, 0, 0.5);
                            ">${element}</span>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close on background click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    // Add CSS for better visual hierarchy
    const style = document.createElement('style');
    style.textContent = `
        /* Ensure Real World Use Cases section stands out */
        .education-section:has(.use-cases-grid) {
            background: linear-gradient(135deg, rgba(255, 85, 0, 0.03), transparent);
            border: 2px solid rgba(255, 85, 0, 0.2);
            margin-top: 30px;
            margin-bottom: 30px;
        }
        
        .education-section:has(.use-cases-grid) .section-title {
            font-size: 28px;
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 2px solid rgba(255, 85, 0, 0.3);
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
            .use-cases-grid {
                grid-template-columns: 1fr;
            }
        }
        
        @media (min-width: 1400px) {
            .use-cases-grid {
                grid-template-columns: repeat(3, 1fr);
            }
        }
        
        /* Modal scrollbar styling */
        #use-case-modal > div::-webkit-scrollbar {
            width: 8px;
        }
        
        #use-case-modal > div::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 4px;
        }
        
        #use-case-modal > div::-webkit-scrollbar-thumb {
            background: rgba(255, 85, 0, 0.5);
            border-radius: 4px;
        }
        
        #use-case-modal > div::-webkit-scrollbar-thumb:hover {
            background: #FF5500;
        }
    `;
    document.head.appendChild(style);
    
    console.log('✅ Real World Use Cases section restoration complete!');
    console.log('📋 The section will display actual company examples from the database');
    console.log('🎨 Cards show real companies like Airbnb, Uber, Slack, etc.');
    console.log('🔍 Click on any card to see detailed information');
    
})();
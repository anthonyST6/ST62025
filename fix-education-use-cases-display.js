// Fix Education Use Cases Display
// This script enhances the education tab to display rich company use cases beautifully
// Version 2.0 - Prevents duplicate injections

(function() {
    console.log('🎯 Initializing Use Cases Display Enhancement v2.0...');
    
    // Flag to prevent multiple renderings
    let isRendering = false;
    let hasRendered = false;
    
    // Store original updateEducationTab function
    const originalUpdateEducationTab = window.updateEducationTab;
    
    // Enhanced function to render use cases with rich formatting
    window.updateEducationTab = function(education) {
        // Prevent duplicate rendering
        if (isRendering) {
            console.log('⏭️ Skipping duplicate render call');
            return;
        }
        
        isRendering = true;
        
        const educationTab = document.getElementById('education-tab');
        if (!educationTab) {
            isRendering = false;
            return;
        }
        
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
        
        // USE CASES section - NEW ENHANCED RENDERING
        const useCases = education.useCases || education.examples || [];
        if (useCases && useCases.length > 0) {
            // Check if rich format (objects with company, problem, impact)
            const isRichFormat = useCases[0] && typeof useCases[0] === 'object' && useCases[0].company;
            
            if (isRichFormat) {
                html += `
                    <div class="education-section">
                        <h2 class="section-title">
                            <span class="section-icon">🏢</span>
                            Real-World Use Cases
                        </h2>
                        <div class="use-cases-grid" style="
                            display: grid;
                            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                            gap: 20px;
                            margin-top: 20px;
                        ">
                            ${useCases.map((useCase, index) => {
                                // Generate company logo initial
                                const logoLetter = useCase.company.charAt(0);
                                // Use different colors for each card
                                const colors = ['#FF5500', '#9C27B0', '#2196F3', '#4CAF50', '#FFC107', '#E91E63'];
                                const color = colors[index % colors.length];
                                
                                return `
                                    <div class="use-case-card" style="
                                        background: rgba(255, 255, 255, 0.02);
                                        border: 2px solid ${color}33;
                                        border-radius: 15px;
                                        padding: 25px;
                                        transition: all 0.3s ease;
                                        cursor: pointer;
                                        position: relative;
                                        overflow: hidden;
                                    "
                                    onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='${color}'; this.style.boxShadow='0 10px 30px ${color}33';"
                                    onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='${color}33'; this.style.boxShadow='none';">
                                        
                                        <!-- Company Logo -->
                                        <div style="
                                            width: 60px;
                                            height: 60px;
                                            background: linear-gradient(135deg, ${color}, ${color}88);
                                            border-radius: 12px;
                                            display: flex;
                                            align-items: center;
                                            justify-content: center;
                                            font-size: 28px;
                                            font-weight: bold;
                                            color: white;
                                            margin-bottom: 15px;
                                            box-shadow: 0 4px 15px ${color}44;
                                        ">${logoLetter}</div>
                                        
                                        <!-- Company Name -->
                                        <h3 style="
                                            color: ${color};
                                            font-size: 22px;
                                            font-weight: 700;
                                            margin: 0 0 10px 0;
                                            letter-spacing: -0.5px;
                                        ">${useCase.company}</h3>
                                        
                                        <!-- Problem Statement -->
                                        <p style="
                                            color: #ccc;
                                            font-size: 14px;
                                            line-height: 1.6;
                                            margin: 0 0 15px 0;
                                            min-height: 60px;
                                        ">${useCase.problem}</p>
                                        
                                        <!-- Impact Badge -->
                                        <div style="
                                            background: linear-gradient(135deg, ${color}22, ${color}11);
                                            border: 1px solid ${color}44;
                                            border-radius: 20px;
                                            padding: 8px 16px;
                                            display: inline-block;
                                            margin-top: 10px;
                                        ">
                                            <span style="
                                                color: ${color};
                                                font-size: 13px;
                                                font-weight: 600;
                                                text-transform: uppercase;
                                                letter-spacing: 0.5px;
                                            ">Impact</span>
                                            <span style="
                                                color: white;
                                                font-size: 14px;
                                                font-weight: 700;
                                                margin-left: 8px;
                                            ">${useCase.impact}</span>
                                        </div>
                                        
                                        <!-- Decorative gradient -->
                                        <div style="
                                            position: absolute;
                                            top: 0;
                                            right: 0;
                                            width: 100px;
                                            height: 100px;
                                            background: radial-gradient(circle at top right, ${color}11, transparent);
                                            pointer-events: none;
                                        "></div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                `;
            } else {
                // Fallback for simple string examples
                html += `
                    <div class="education-section">
                        <h2 class="section-title">
                            <span class="section-icon">💼</span>
                            Examples
                        </h2>
                        <div class="section-content">
                            <ul class="bullet-list">
                                ${useCases.map(example => `
                                    <li>${example}</li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                `;
            }
        }
        
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
        
        console.log('✅ Education tab updated with rich use cases display');
    };
    
    // Also update when data is loaded from API
    const originalLoadSubcomponentData = window.loadSubcomponentData;
    if (originalLoadSubcomponentData) {
        window.loadSubcomponentData = async function() {
            const result = await originalLoadSubcomponentData.apply(this, arguments);
            
            // Check if we have rich use cases after data loads
            if (window.subcomponentData && window.subcomponentData.education) {
                const education = window.subcomponentData.education;
                if (education.useCases && education.useCases.length > 0) {
                    const firstUseCase = education.useCases[0];
                    if (typeof firstUseCase === 'object' && firstUseCase.company) {
                        console.log(`🎉 Rich use cases detected! Found ${education.useCases.length} company examples including:`, 
                            education.useCases.map(uc => uc.company).join(', '));
                    }
                }
            }
            
            return result;
        };
    }
    
    // Monitor for dynamic content updates
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target.id === 'education-tab' && mutation.addedNodes.length > 0) {
                // Check if we need to enhance the display
                const hasSimpleList = document.querySelector('#education-tab .bullet-list');
                const hasUseCaseGrid = document.querySelector('#education-tab .use-cases-grid');
                
                if (hasSimpleList && !hasUseCaseGrid && window.subcomponentData?.education?.useCases) {
                    const firstUseCase = window.subcomponentData.education.useCases[0];
                    if (typeof firstUseCase === 'object' && firstUseCase.company) {
                        console.log('🔄 Re-rendering education tab with rich use cases...');
                        window.updateEducationTab(window.subcomponentData.education);
                    }
                }
            }
        });
    });
    
    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    console.log('✅ Use Cases Display Enhancement initialized successfully!');
})();
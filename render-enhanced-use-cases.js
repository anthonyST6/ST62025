// Render Enhanced Use Cases - Always-Expanded Format
// Displays detailed use cases with Challenge, Approach, Definition, Results, Key Insight

(function() {
    console.log('📚 Enhanced Use Case Renderer v1.0 Loading...');
    
    // Override the education tab rendering
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
        
        // ENHANCED USE CASES section
        const useCases = education.useCases || education.examples || [];
        if (useCases && useCases.length > 0) {
            // Check if enhanced format (has challenge, approach, definition fields)
            const isEnhancedFormat = useCases[0] && typeof useCases[0] === 'object' && 
                                    (useCases[0].challenge || useCases[0].approach || useCases[0].definition);
            
            if (isEnhancedFormat) {
                html += `
                    <div class="education-section">
                        <h2 class="section-title">
                            <span class="section-icon">🏢</span>
                            Real-World Use Cases
                        </h2>
                        <div style="display: flex; flex-direction: column; gap: 30px; margin-top: 20px;">
                            ${useCases.map((useCase, index) => `
                                <div style="
                                    background: rgba(255, 255, 255, 0.02);
                                    border: 2px solid rgba(255, 85, 0, 0.2);
                                    border-radius: 12px;
                                    padding: 25px;
                                    transition: all 0.3s ease;
                                "
                                onmouseover="this.style.borderColor='rgba(255, 85, 0, 0.5)'; this.style.background='rgba(255, 255, 255, 0.03)';"
                                onmouseout="this.style.borderColor='rgba(255, 85, 0, 0.2)'; this.style.background='rgba(255, 255, 255, 0.02)';">
                                    
                                    <!-- Company Header -->
                                    <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid rgba(255, 85, 0, 0.2);">
                                        <h3 style="
                                            color: #FF5500;
                                            font-size: 24px;
                                            font-weight: 700;
                                            margin: 0 0 5px 0;
                                        ">${useCase.company}</h3>
                                        ${useCase.industry ? `
                                            <p style="
                                                color: #999;
                                                font-size: 14px;
                                                margin: 0;
                                                font-style: italic;
                                            ">${useCase.industry}</p>
                                        ` : ''}
                                    </div>
                                    
                                    <!-- Challenge Section -->
                                    ${useCase.challenge ? `
                                        <div style="margin-bottom: 20px;">
                                            <h4 style="
                                                color: #ffaa66;
                                                font-size: 16px;
                                                font-weight: 600;
                                                margin: 0 0 10px 0;
                                                text-transform: uppercase;
                                                letter-spacing: 0.5px;
                                            ">Challenge</h4>
                                            <p style="
                                                color: #ccc;
                                                font-size: 15px;
                                                line-height: 1.7;
                                                margin: 0;
                                            ">${useCase.challenge}</p>
                                        </div>
                                    ` : ''}
                                    
                                    <!-- Approach Section -->
                                    ${useCase.approach ? `
                                        <div style="margin-bottom: 20px;">
                                            <h4 style="
                                                color: #ffaa66;
                                                font-size: 16px;
                                                font-weight: 600;
                                                margin: 0 0 10px 0;
                                                text-transform: uppercase;
                                                letter-spacing: 0.5px;
                                            ">Approach</h4>
                                            <p style="
                                                color: #ccc;
                                                font-size: 15px;
                                                line-height: 1.7;
                                                margin: 0;
                                            ">${useCase.approach}</p>
                                        </div>
                                    ` : ''}
                                    
                                    <!-- Definition Section (HIGHLIGHTED) -->
                                    ${useCase.definition ? `
                                        <div style="
                                            margin-bottom: 20px;
                                            background: rgba(255, 85, 0, 0.1);
                                            border-left: 4px solid #FF5500;
                                            padding: 15px;
                                            border-radius: 8px;
                                        ">
                                            <h4 style="
                                                color: #FF5500;
                                                font-size: 16px;
                                                font-weight: 700;
                                                margin: 0 0 10px 0;
                                                text-transform: uppercase;
                                                letter-spacing: 0.5px;
                                            ">Their ${education.title || 'Definition'}</h4>
                                            <p style="
                                                color: #fff;
                                                font-size: 15px;
                                                line-height: 1.7;
                                                margin: 0;
                                                font-weight: 500;
                                            ">${useCase.definition}</p>
                                        </div>
                                    ` : ''}
                                    
                                    <!-- Results Section -->
                                    ${useCase.results ? `
                                        <div style="margin-bottom: 20px;">
                                            <h4 style="
                                                color: #ffaa66;
                                                font-size: 16px;
                                                font-weight: 600;
                                                margin: 0 0 10px 0;
                                                text-transform: uppercase;
                                                letter-spacing: 0.5px;
                                            ">Results</h4>
                                            <p style="
                                                color: #ccc;
                                                font-size: 15px;
                                                line-height: 1.7;
                                                margin: 0;
                                            ">${useCase.results}</p>
                                        </div>
                                    ` : ''}
                                    
                                    <!-- Key Insight Section -->
                                    ${useCase.keyInsight ? `
                                        <div style="
                                            background: rgba(76, 175, 80, 0.1);
                                            border-left: 4px solid #4CAF50;
                                            padding: 15px;
                                            border-radius: 8px;
                                        ">
                                            <h4 style="
                                                color: #4CAF50;
                                                font-size: 16px;
                                                font-weight: 700;
                                                margin: 0 0 10px 0;
                                                text-transform: uppercase;
                                                letter-spacing: 0.5px;
                                            ">💡 Key Insight</h4>
                                            <p style="
                                                color: #fff;
                                                font-size: 15px;
                                                line-height: 1.7;
                                                margin: 0;
                                                font-weight: 500;
                                            ">${useCase.keyInsight}</p>
                                        </div>
                                    ` : ''}
                                    
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            } else {
                // Fallback for simple format
                html += `
                    <div class="education-section">
                        <h2 class="section-title">
                            <span class="section-icon">💼</span>
                            Examples
                        </h2>
                        <div class="section-content">
                            <ul class="bullet-list">
                                ${useCases.map(ex => `<li>${typeof ex === 'string' ? ex : ex.problem || ex.company}</li>`).join('')}
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
                            ${education.metrics.map(metric => `<li>${metric}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        }
        
        educationTab.innerHTML = html || '<div style="text-align: center; padding: 60px 20px; color: #999;">No educational content available.</div>';
        
        console.log('✅ Education tab updated with enhanced use cases');
    };
    
    console.log('✅ Enhanced Use Case Renderer loaded successfully');
})();
// Fix Education Tab Grid Layout - Restore Original Structure with Agent Data
(function() {
    console.log('🔧 Fixing Education tab grid layout...');
    
    // Store original updateEducationTab function
    const originalUpdateEducationTab = window.updateEducationTab;
    
    // Override with fixed version that uses ORIGINAL GRID LAYOUT
    window.updateEducationTab = function(education) {
        console.log('✨ Applying ORIGINAL grid layout with agent data:', education);
        
        const educationTab = document.getElementById('education-tab');
        if (!educationTab) return;
        
        // Build the education content HTML with EXACT ORIGINAL STRUCTURE
        let educationHTML = '';
        
        // What is section - using agent data
        educationHTML += `
            <div class="education-section">
                <h2 class="section-title">
                    <span class="section-icon">🎯</span>
                    What is ${education.title || 'this component'}?
                </h2>
                <div class="section-content">
                    ${education.what || '<p>A clear understanding of this component is essential for GTM success.</p>'}
                </div>
            </div>
        `;
        
        // Why It Matters section - using agent data
        educationHTML += `
            <div class="education-section">
                <h2 class="section-title">
                    <span class="section-icon">💡</span>
                    Why It Matters
                </h2>
                <div class="section-content">
                    ${education.why || '<p>This component is critical for achieving your go-to-market objectives.</p>'}
                </div>
            </div>
        `;
        
        // How to Implement section with ORIGINAL GRID LAYOUT
        educationHTML += `
            <div class="education-section">
                <h2 class="section-title">
                    <span class="section-icon">🚀</span>
                    How to Implement
                </h2>
                <div class="section-content" style="padding-top: 10px;">
                    ${education.how ? `<div style="margin-bottom: 30px;">${education.how}</div>` : ''}
                    
                    <!-- ORIGINAL Side by side grid layout -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-top: 30px;">
                        <!-- Key Components -->
                        <div style="background: rgba(0, 0, 0, 0.5); border-radius: 12px; padding: 25px; border: 1px solid rgba(255, 255, 255, 0.1); transition: all 0.3s ease; cursor: pointer;"
                             onmouseover="this.style.borderColor='#FF5500'; this.style.background='rgba(255, 85, 0, 0.05)'; this.style.transform='translateY(-2px)'"
                             onmouseout="this.style.borderColor='rgba(255, 255, 255, 0.1)'; this.style.background='rgba(0, 0, 0, 0.5)'; this.style.transform='translateY(0)'">
                            <h3 style="color: #FF5500; margin-bottom: 20px; font-size: 18px; border-bottom: 1px solid rgba(255, 85, 0, 0.3); padding-bottom: 10px;">
                                Key Components:
                            </h3>
                            <div style="display: flex; flex-direction: column; gap: 0;">
                                ${education.keyComponents ? education.keyComponents.map((comp, i) => `
                                <div style="padding: 15px 0; ${i < education.keyComponents.length - 1 ? 'border-bottom: 1px solid rgba(255, 255, 255, 0.05);' : ''} display: flex; align-items: flex-start; gap: 15px; transition: all 0.3s ease;"
                                     onmouseover="this.style.paddingLeft='10px'; this.style.background='rgba(255, 85, 0, 0.03)'"
                                     onmouseout="this.style.paddingLeft='0'; this.style.background='transparent'">
                                    <span style="color: #FF5500; font-weight: 700; font-size: 18px; min-width: 25px;">${i + 1}.</span>
                                    <div style="flex: 1;">
                                        <strong style="color: #fff; font-size: 15px;">${typeof comp === 'string' ? comp : comp.title}</strong>
                                        ${comp.description ? `<p style="margin-top: 5px; font-size: 13px; color: #999; margin-bottom: 0; line-height: 1.5;">${comp.description}</p>` : ''}
                                    </div>
                                </div>
                                `).join('') : `
                                    <div style="padding: 15px 0;">
                                        <p style="color: #999;">Key components will be loaded based on your role.</p>
                                    </div>
                                `}
                            </div>
                        </div>
                        
                        <!-- Best Practices -->
                        <div style="background: rgba(0, 0, 0, 0.5); border-radius: 12px; padding: 25px; border: 1px solid rgba(255, 255, 255, 0.1); transition: all 0.3s ease; cursor: pointer;"
                             onmouseover="this.style.borderColor='#FF5500'; this.style.background='rgba(255, 85, 0, 0.05)'; this.style.transform='translateY(-2px)'"
                             onmouseout="this.style.borderColor='rgba(255, 255, 255, 0.1)'; this.style.background='rgba(0, 0, 0, 0.5)'; this.style.transform='translateY(0)'">
                            <h3 style="color: #FF5500; margin-bottom: 20px; font-size: 18px; border-bottom: 1px solid rgba(255, 85, 0, 0.3); padding-bottom: 10px;">
                                Best Practices:
                            </h3>
                            <div style="display: flex; flex-direction: column; gap: 0;">
                                ${education.bestPractices ? education.bestPractices.map((practice, i) => `
                                <div style="padding: 15px 0; ${i < education.bestPractices.length - 1 ? 'border-bottom: 1px solid rgba(255, 255, 255, 0.05);' : ''} display: flex; align-items: flex-start; gap: 15px; transition: all 0.3s ease;"
                                     onmouseover="this.style.paddingLeft='10px'; this.style.background='rgba(76, 175, 80, 0.03)'"
                                     onmouseout="this.style.paddingLeft='0'; this.style.background='transparent'">
                                    <span style="color: #4CAF50; font-size: 20px; min-width: 25px;">✓</span>
                                    <div style="flex: 1;">
                                        <strong style="color: #fff; font-size: 15px;">${typeof practice === 'string' ? practice : practice.title}</strong>
                                        ${practice.description ? `<p style="margin-top: 5px; font-size: 13px; color: #999; margin-bottom: 0; line-height: 1.5;">${practice.description}</p>` : ''}
                                    </div>
                                </div>
                                `).join('') : `
                                    <div style="padding: 15px 0;">
                                        <p style="color: #999;">Best practices will be loaded based on your role.</p>
                                    </div>
                                `}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Implementation Steps if available -->
                    ${education.implementationSteps ? `
                    <div style="margin-top: 40px; background: rgba(0, 0, 0, 0.5); border-radius: 15px; padding: 30px; border: 1px solid rgba(255, 255, 255, 0.1);">
                        <h3 style="color: #FF5500; margin-bottom: 25px; font-size: 20px; font-weight: 700; border-bottom: 2px solid rgba(255, 85, 0, 0.3); padding-bottom: 12px; display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 24px;">📋</span>
                            Step-by-Step Process:
                        </h3>
                        <div style="display: flex; flex-direction: column; gap: 18px;">
                            ${education.implementationSteps.map((step, i) => `
                            <div style="display: flex; align-items: flex-start; gap: 20px; padding: 18px 20px; background: linear-gradient(90deg, rgba(255, 85, 0, 0.02), transparent); border-left: 2px solid rgba(255, 85, 0, 0.4); border-radius: 8px; transition: all 0.3s ease;"
                                 onmouseover="this.style.background='linear-gradient(90deg, rgba(255, 85, 0, 0.06), transparent)'; this.style.borderLeftColor='#FF5500'; this.style.transform='translateX(3px)'"
                                 onmouseout="this.style.background='linear-gradient(90deg, rgba(255, 85, 0, 0.02), transparent)'; this.style.borderLeftColor='rgba(255, 85, 0, 0.4)'; this.style.transform='translateX(0)'">
                                <div style="background: rgba(255, 85, 0, 0.15); color: #FF5500; width: 28px; height: 28px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 14px; flex-shrink: 0; border: 1px solid rgba(255, 85, 0, 0.3);">${i + 1}</div>
                                <div style="flex: 1;">
                                    <strong style="color: #fff; font-size: 15px; display: block; margin-bottom: 5px;">${step.title || step}</strong>
                                    ${step.description ? `<span style="color: #999; font-size: 13px; line-height: 1.5;">${step.description}</span>` : ''}
                                </div>
                            </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        // Real-World Examples section with ORIGINAL GRID LAYOUT
        if (education.examples && education.examples.length > 0) {
            educationHTML += `
                <div class="education-section">
                    <h2 class="section-title">
                        <span class="section-icon">💼</span>
                        Real-World Examples
                    </h2>
                    <div class="section-content">
                        <p style="margin-bottom: 25px; color: #ccc; line-height: 1.6;">Learn from successful implementations:</p>
                        
                        <!-- ORIGINAL Grid layout for case studies -->
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 25px; margin-top: 20px;">
                            ${education.examples.map(example => {
                                // Handle both string and object formats
                                const title = example.company || example.title || (typeof example === 'string' ? example.split(':')[0] : 'Example');
                                const description = example.description || example.implementation || (typeof example === 'string' ? example : '');
                                const result = example.result || example.outcome || '';
                                
                                return `
                                <div style="background: linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 15px; padding: 25px; transition: all 0.3s ease; cursor: pointer; position: relative; overflow: hidden; min-height: 280px;"
                                     onmouseover="this.style.borderColor='#FF5500'; this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 30px rgba(255, 85, 0, 0.3)'"
                                     onmouseout="this.style.borderColor='rgba(255, 255, 255, 0.1)'; this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                                    <div style="position: absolute; top: 0; right: 0; width: 100px; height: 100px; background: radial-gradient(circle at top right, rgba(255, 85, 0, 0.2), transparent); pointer-events: none;"></div>
                                    <h3 style="color: #FF5500; margin-bottom: 15px; font-size: 22px; font-weight: 700;">${title}</h3>
                                    <div style="background: rgba(255, 85, 0, 0.1); border-left: 3px solid #FF5500; padding: 15px; margin-bottom: 15px; border-radius: 5px; flex: 1;">
                                        <p style="color: #fff; font-weight: 600; margin-bottom: 10px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Implementation:</p>
                                        <p style="color: #ccc; line-height: 1.7; font-size: 13px;">
                                            ${description}
                                        </p>
                                    </div>
                                    ${result ? `
                                    <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 15px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                                        <span style="color: #4CAF50; font-size: 24px; font-weight: 700;">${result}</span>
                                        <span style="color: #999; font-size: 13px;">Result</span>
                                    </div>
                                    ` : ''}
                                </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Metrics & KPIs section if available
        if (education.metrics && education.metrics.length > 0) {
            educationHTML += `
                <div class="education-section">
                    <h2 class="section-title">
                        <span class="section-icon">📊</span>
                        Success Metrics & KPIs
                    </h2>
                    <div class="section-content">
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                            ${education.metrics.map(metric => `
                            <div style="background: rgba(0, 0, 0, 0.5); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px; padding: 20px; text-align: center; transition: all 0.3s ease;"
                                 onmouseover="this.style.borderColor='#FF5500'; this.style.transform='translateY(-3px)'"
                                 onmouseout="this.style.borderColor='rgba(255, 255, 255, 0.1)'; this.style.transform='translateY(0)'">
                                <div style="font-size: 32px; font-weight: 700; color: #FF5500; margin-bottom: 10px;">
                                    ${metric.value || metric.target || ''}
                                </div>
                                <div style="font-size: 14px; color: #fff; font-weight: 600; margin-bottom: 5px;">
                                    ${metric.name || metric.title || metric}
                                </div>
                                ${metric.description ? `
                                <div style="font-size: 12px; color: #999; margin-top: 5px;">
                                    ${metric.description}
                                </div>
                                ` : ''}
                            </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Update the education tab content
        educationTab.innerHTML = educationHTML;
        console.log('✅ Education tab updated with ORIGINAL grid layout');
    };
    
    // Re-fetch and apply the fix immediately if data is already loaded
    const urlParams = new URLSearchParams(window.location.search);
    const subcomponentId = urlParams.get('id') || '1-1';
    
    // Wait for API data and apply fix
    setTimeout(() => {
        fetch(`/api/subcomponents/${subcomponentId}`)
            .then(response => response.json())
            .then(data => {
                if (data.education) {
                    console.log('🔄 Re-applying grid layout with fresh data');
                    window.updateEducationTab(data.education);
                }
            })
            .catch(error => console.error('Error loading data:', error));
    }, 500);
    
    console.log('✅ Grid layout fix applied successfully');
})();
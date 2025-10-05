// IMMEDIATE FIX FOR EDUCATION CONTENT DISPLAY
(function() {
    console.log('🔧 FIXING EDUCATION CONTENT DISPLAY NOW...');
    
    // Override the loadSubcomponentData function to ensure education content displays
    const originalLoadSubcomponentData = window.loadSubcomponentData;
    
    window.loadSubcomponentData = async function() {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const subcomponentId = urlParams.get('id') || '1-1';
            
            const response = await fetch(`/api/subcomponents/${subcomponentId}`);
            
            if (response.ok) {
                const data = await response.json();
                console.log('📦 API Data received:', data);
                
                // Update header
                document.getElementById('subcomponent-title').textContent = (data.education?.title || data.name || 'SUBCOMPONENT').toUpperCase();
                document.getElementById('subcomponent-description').textContent = data.description || '';
                document.getElementById('subcomponent-number').textContent = subcomponentId.replace('-', '.');
                document.getElementById('subcomponent-name').textContent = data.education?.title || data.name || 'Subcomponent';
                
                // Update block link
                const blockId = parseInt(subcomponentId.split('-')[0]);
                const blockLink = document.getElementById('block-link');
                if (blockLink) {
                    blockLink.textContent = data.blockName || 'Block';
                    blockLink.href = `block-detail.html?id=${blockId}`;
                }
                
                // FORCE UPDATE EDUCATION TAB
                const educationTab = document.getElementById('education-tab');
                if (educationTab && data.education) {
                    let educationHTML = '';
                    
                    // What is section
                    educationHTML += `
                        <div class="education-section">
                            <h2 class="section-title">
                                <span class="section-icon">🎯</span>
                                What is ${data.education.title || 'this component'}?
                            </h2>
                            <div class="section-content">
                                ${data.education.what || '<p>Understanding this component is essential for GTM success.</p>'}
                            </div>
                        </div>
                    `;
                    
                    // Why It Matters section
                    educationHTML += `
                        <div class="education-section">
                            <h2 class="section-title">
                                <span class="section-icon">💡</span>
                                Why It Matters
                            </h2>
                            <div class="section-content">
                                ${data.education.why || '<p>This component is critical for achieving your go-to-market objectives.</p>'}
                            </div>
                        </div>
                    `;
                    
                    // How to Implement section with GRID LAYOUT
                    educationHTML += `
                        <div class="education-section">
                            <h2 class="section-title">
                                <span class="section-icon">🚀</span>
                                How to Implement
                            </h2>
                            <div class="section-content" style="padding-top: 10px;">
                                ${data.education.how ? `<div style="margin-bottom: 30px;">${data.education.how}</div>` : ''}
                                
                                <!-- Grid layout -->
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-top: 30px;">
                                    <!-- Key Components -->
                                    <div style="background: rgba(0, 0, 0, 0.5); border-radius: 12px; padding: 25px; border: 1px solid rgba(255, 255, 255, 0.1); transition: all 0.3s ease; cursor: pointer;"
                                         onmouseover="this.style.borderColor='#FF5500'; this.style.background='rgba(255, 85, 0, 0.05)'; this.style.transform='translateY(-2px)'"
                                         onmouseout="this.style.borderColor='rgba(255, 255, 255, 0.1)'; this.style.background='rgba(0, 0, 0, 0.5)'; this.style.transform='translateY(0)'">
                                        <h3 style="color: #FF5500; margin-bottom: 20px; font-size: 18px; border-bottom: 1px solid rgba(255, 85, 0, 0.3); padding-bottom: 10px;">
                                            Key Components:
                                        </h3>
                                        <div style="display: flex; flex-direction: column; gap: 0;">
                                            ${data.education.keyComponents ? data.education.keyComponents.map((comp, i) => `
                                            <div style="padding: 15px 0; ${i < data.education.keyComponents.length - 1 ? 'border-bottom: 1px solid rgba(255, 255, 255, 0.05);' : ''} display: flex; align-items: flex-start; gap: 15px;">
                                                <span style="color: #FF5500; font-weight: 700; font-size: 18px; min-width: 25px;">${i + 1}.</span>
                                                <div style="flex: 1;">
                                                    <strong style="color: #fff; font-size: 15px;">${typeof comp === 'string' ? comp : comp.title || comp}</strong>
                                                    ${comp.description ? `<p style="margin-top: 5px; font-size: 13px; color: #999; margin-bottom: 0; line-height: 1.5;">${comp.description}</p>` : ''}
                                                </div>
                                            </div>
                                            `).join('') : '<p style="color: #999; padding: 15px 0;">Loading key components...</p>'}
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
                                            ${data.education.bestPractices ? data.education.bestPractices.map((practice, i) => `
                                            <div style="padding: 15px 0; ${i < data.education.bestPractices.length - 1 ? 'border-bottom: 1px solid rgba(255, 255, 255, 0.05);' : ''} display: flex; align-items: flex-start; gap: 15px;">
                                                <span style="color: #4CAF50; font-size: 20px; min-width: 25px;">✓</span>
                                                <div style="flex: 1;">
                                                    <strong style="color: #fff; font-size: 15px;">${typeof practice === 'string' ? practice : practice.title || practice}</strong>
                                                    ${practice.description ? `<p style="margin-top: 5px; font-size: 13px; color: #999; margin-bottom: 0; line-height: 1.5;">${practice.description}</p>` : ''}
                                                </div>
                                            </div>
                                            `).join('') : '<p style="color: #999; padding: 15px 0;">Loading best practices...</p>'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    
                    // Real-World Examples section with GRID LAYOUT
                    if (data.education.examples && data.education.examples.length > 0) {
                        educationHTML += `
                            <div class="education-section">
                                <h2 class="section-title">
                                    <span class="section-icon">💼</span>
                                    Real-World Examples
                                </h2>
                                <div class="section-content">
                                    <p style="margin-bottom: 25px; color: #ccc; line-height: 1.6;">Learn from successful implementations:</p>
                                    
                                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 25px; margin-top: 20px;">
                                        ${data.education.examples.map(example => {
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
                    
                    // SET THE CONTENT
                    educationTab.innerHTML = educationHTML;
                    console.log('✅ Education content FIXED and displayed');
                }
                
                // Load workspace questions
                if (data.workspace && data.workspace.questions) {
                    const container = document.getElementById('dynamic-worksheet-container');
                    if (container) {
                        let html = '<div style="display: flex; flex-direction: column; gap: 20px;">';
                        data.workspace.questions.forEach((q, index) => {
                            html += `
                                <div style="background: rgba(0, 0, 0, 0.5); border-radius: 10px; padding: 20px;">
                                    <label style="display: block; color: #FF5500; font-weight: 600; margin-bottom: 10px; text-transform: uppercase; font-size: 14px;">
                                        ${index + 1}. ${q.question || q}
                                    </label>
                                    <textarea style="width: 100%; min-height: 100px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 8px; color: #fff; padding: 12px; font-size: 14px;" 
                                              placeholder="Enter your response..."></textarea>
                                </div>
                            `;
                        });
                        html += '</div>';
                        html += `
                            <div style="display: flex; gap: 15px; margin-top: 30px;">
                                <button class="btn-primary" onclick="saveWorksheet()">Save Progress</button>
                                <button class="btn-primary" style="background: #4CAF50;" onclick="analyzeWorksheet()">🤖 Analyze Results</button>
                            </div>
                        `;
                        container.innerHTML = html;
                    }
                }
                
                // Load templates
                if (data.templates) {
                    const container = document.getElementById('resource-templates');
                    if (container) {
                        let html = '';
                        data.templates.forEach(template => {
                            const templateName = typeof template === 'string' ? template : template.name;
                            html += `
                                <div style="background: rgba(0, 0, 0, 0.5); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px; padding: 20px; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <h4 style="color: #fff; margin-bottom: 5px;">${templateName}</h4>
                                        <p style="color: #999; font-size: 13px;">Ready-to-use template for your GTM needs</p>
                                    </div>
                                    <button class="btn-primary" style="padding: 8px 20px; font-size: 14px;">Download</button>
                                </div>
                            `;
                        });
                        container.innerHTML = html;
                    }
                }
            }
        } catch (error) {
            console.error('Error loading subcomponent data:', error);
        }
    };
    
    // Re-load the data immediately
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.loadSubcomponentData);
    } else {
        window.loadSubcomponentData();
    }
    
    console.log('✅ EDUCATION CONTENT FIX APPLIED');
})();
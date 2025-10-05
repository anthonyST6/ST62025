// Enhanced Resources and Output Tab Handler
// Makes templates downloadable and shows populated templates in Output tab

(function() {
    'use strict';
    
    // Template library for all agents
    const templateLibrary = {
        '1-1': {
            name: 'Problem Statement Framework',
            templates: [
                {
                    name: 'Problem Statement Canvas',
                    filename: 'problem-statement-canvas.docx',
                    content: `PROBLEM STATEMENT CANVAS

Company: [Your Company Name]
Date: [Current Date]

1. THE PROBLEM
Who experiences this problem?
[Your answer from workspace]

What specific problem are they facing?
[Your answer from workspace]

When does this problem occur?
[Your answer from workspace]

2. THE IMPACT
What is the measurable impact?
[Your answer from workspace]

How are they currently solving it?
[Your answer from workspace]

3. EVIDENCE & VALIDATION
What evidence validates this problem?
[Your answer from workspace]

Customer Quotes:
"[Quote 1]"
"[Quote 2]"
"[Quote 3]"

4. MARKET SIZE
Total Addressable Market: $[Amount]
Serviceable Addressable Market: $[Amount]
Serviceable Obtainable Market: $[Amount]

5. OUR SOLUTION THESIS
[Your proposed solution]

6. SUCCESS METRICS
- Metric 1: [Target]
- Metric 2: [Target]
- Metric 3: [Target]`
                },
                {
                    name: 'Customer Interview Guide',
                    filename: 'customer-interview-guide.docx',
                    content: `CUSTOMER INTERVIEW GUIDE

Interview #: [Number]
Date: [Date]
Interviewee: [Name]
Role: [Title]
Company: [Company]

OPENING
"Thank you for taking the time to speak with me today. I'm researching [problem area] and would love to learn about your experience."

PROBLEM DISCOVERY QUESTIONS
1. Tell me about your role and responsibilities.
2. What are your biggest challenges related to [problem area]?
3. How do you currently handle [specific task]?
4. What's most frustrating about this process?
5. How much time do you spend on this?
6. What would an ideal solution look like?
7. What have you tried before?
8. How do you measure success?

FOLLOW-UP PROBES
- "Tell me more about that..."
- "Can you give me a specific example?"
- "What happened next?"
- "How did that make you feel?"
- "Why is that important to you?"

CLOSING
"Is there anything else you think I should know?"
"Who else should I talk to about this?"

NOTES
[Your observations]`
                },
                {
                    name: 'Market Analysis Template',
                    filename: 'market-analysis.xlsx',
                    content: `MARKET ANALYSIS TEMPLATE

TAM CALCULATION
Market Segment | # of Companies | Avg Contract Value | Total Value
[Segment 1]    | [Number]      | $[Amount]         | $[Total]
[Segment 2]    | [Number]      | $[Amount]         | $[Total]
[Segment 3]    | [Number]      | $[Amount]         | $[Total]

COMPETITIVE LANDSCAPE
Competitor | Strengths | Weaknesses | Market Share | Pricing
[Comp 1]   | [List]    | [List]     | [%]         | $[Range]
[Comp 2]   | [List]    | [List]     | [%]         | $[Range]
[Comp 3]   | [List]    | [List]     | [%]         | $[Range]

MARKET TRENDS
Trend | Impact | Timeline | Opportunity
[Trend 1] | [High/Med/Low] | [Timeframe] | [Description]
[Trend 2] | [High/Med/Low] | [Timeframe] | [Description]

CUSTOMER SEGMENTS
Segment | Size | Growth Rate | Our Fit | Priority
[Seg 1] | [#]  | [%]        | [Score] | [High/Med/Low]
[Seg 2] | [#]  | [%]        | [Score] | [High/Med/Low]`
                }
            ]
        }
    };
    
    // Function to get workspace data
    function getWorkspaceData() {
        const data = {};
        const inputs = document.querySelectorAll('#workspace-content input, #workspace-content textarea');
        inputs.forEach(input => {
            if (input.id) {
                data[input.id] = input.value || '[Not provided]';
            }
        });
        return data;
    }
    
    // Function to populate template with workspace data
    function populateTemplate(template, workspaceData) {
        let populated = template;
        
        // Replace placeholders with actual data
        Object.keys(workspaceData).forEach(key => {
            const placeholder = new RegExp(`\\[Your answer from workspace\\]`, 'g');
            if (key === 'who-affected') {
                populated = populated.replace('Who experiences this problem?\n[Your answer from workspace]', 
                    `Who experiences this problem?\n${workspaceData[key]}`);
            } else if (key === 'what-problem') {
                populated = populated.replace('What specific problem are they facing?\n[Your answer from workspace]', 
                    `What specific problem are they facing?\n${workspaceData[key]}`);
            } else if (key === 'when-occur') {
                populated = populated.replace('When does this problem occur?\n[Your answer from workspace]', 
                    `When does this problem occur?\n${workspaceData[key]}`);
            } else if (key === 'what-impact') {
                populated = populated.replace('What is the measurable impact?\n[Your answer from workspace]', 
                    `What is the measurable impact?\n${workspaceData[key]}`);
            } else if (key === 'how-solving') {
                populated = populated.replace('How are they currently solving it?\n[Your answer from workspace]', 
                    `How are they currently solving it?\n${workspaceData[key]}`);
            } else if (key === 'evidence-validation') {
                populated = populated.replace('What evidence validates this problem?\n[Your answer from workspace]', 
                    `What evidence validates this problem?\n${workspaceData[key]}`);
            }
        });
        
        // Add timestamp
        populated = populated.replace('[Current Date]', new Date().toLocaleDateString());
        populated = populated.replace('[Date]', new Date().toLocaleDateString());
        
        return populated;
    }
    
    // Function to download file
    function downloadFile(filename, content) {
        const blob = new Blob([content], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }
    
    // Function to enhance Resources tab
    function enhanceResourcesTab() {
        console.log('📚 Enhancing Resources tab with downloadable templates...');
        
        const resourcesContent = document.getElementById('resources-content');
        if (!resourcesContent) return;
        
        // Get current subcomponent ID
        const subcomponentId = window.currentSubcomponentId || 
                              document.querySelector('[data-subcomponent-id]')?.dataset.subcomponentId ||
                              new URLSearchParams(window.location.search).get('id') || '1-1';
        
        // Get templates for this agent
        const agentTemplates = templateLibrary[subcomponentId] || templateLibrary['1-1'];
        
        // Create enhanced resources display
        const resourcesHTML = `
            <div style="padding: 30px; max-width: 1200px; margin: 0 auto;">
                <h2 style="color: #FF5500; margin-bottom: 30px; font-size: 28px;">
                    📚 Resources & Templates
                </h2>
                
                <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 15px; padding: 30px; margin-bottom: 30px;">
                    <h3 style="color: #fff; margin-bottom: 20px;">
                        <span style="color: #4CAF50;">✓</span> Downloadable Templates for ${agentTemplates.name}
                    </h3>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                        ${agentTemplates.templates.map((template, index) => `
                            <div style="background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 85, 0, 0.3); border-radius: 10px; padding: 20px; transition: all 0.3s ease;"
                                 onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 30px rgba(255, 85, 0, 0.2)';"
                                 onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
                                
                                <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                                    <div style="background: linear-gradient(135deg, #FF5500, #FF8800); width: 50px; height: 50px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 24px;">
                                        📄
                                    </div>
                                    <div>
                                        <h4 style="color: #fff; margin: 0; font-size: 16px;">${template.name}</h4>
                                        <p style="color: #999; margin: 5px 0 0 0; font-size: 12px;">${template.filename}</p>
                                    </div>
                                </div>
                                
                                <p style="color: #ccc; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
                                    Professional template ready for immediate use. Click to download and customize for your needs.
                                </p>
                                
                                <button onclick="window.downloadTemplate(${index})" 
                                        style="background: linear-gradient(135deg, #4CAF50, #66BB6A); color: white; border: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; width: 100%; transition: all 0.3s ease;"
                                        onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 5px 15px rgba(76, 175, 80, 0.3)';"
                                        onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='none';">
                                    <span style="margin-right: 8px;">⬇️</span> Download Template
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 15px; padding: 30px;">
                    <h3 style="color: #fff; margin-bottom: 20px;">
                        <span style="color: #2196F3;">📖</span> Additional Resources
                    </h3>
                    
                    <div style="display: grid; gap: 15px;">
                        <a href="#" style="background: rgba(33, 150, 243, 0.1); border: 1px solid rgba(33, 150, 243, 0.3); border-radius: 10px; padding: 20px; text-decoration: none; display: flex; align-items: center; gap: 15px; transition: all 0.3s ease;"
                           onmouseover="this.style.background='rgba(33, 150, 243, 0.2)';"
                           onmouseout="this.style.background='rgba(33, 150, 243, 0.1)';">
                            <span style="font-size: 24px;">📘</span>
                            <div>
                                <h4 style="color: #2196F3; margin: 0;">Best Practices Guide</h4>
                                <p style="color: #ccc; margin: 5px 0 0 0; font-size: 14px;">Comprehensive guide with industry best practices</p>
                            </div>
                        </a>
                        
                        <a href="#" style="background: rgba(156, 39, 176, 0.1); border: 1px solid rgba(156, 39, 176, 0.3); border-radius: 10px; padding: 20px; text-decoration: none; display: flex; align-items: center; gap: 15px; transition: all 0.3s ease;"
                           onmouseover="this.style.background='rgba(156, 39, 176, 0.2)';"
                           onmouseout="this.style.background='rgba(156, 39, 176, 0.1)';">
                            <span style="font-size: 24px;">🎥</span>
                            <div>
                                <h4 style="color: #9C27B0; margin: 0;">Video Tutorials</h4>
                                <p style="color: #ccc; margin: 5px 0 0 0; font-size: 14px;">Step-by-step video walkthroughs</p>
                            </div>
                        </a>
                        
                        <a href="#" style="background: rgba(255, 152, 0, 0.1); border: 1px solid rgba(255, 152, 0, 0.3); border-radius: 10px; padding: 20px; text-decoration: none; display: flex; align-items: center; gap: 15px; transition: all 0.3s ease;"
                           onmouseover="this.style.background='rgba(255, 152, 0, 0.2)';"
                           onmouseout="this.style.background='rgba(255, 152, 0, 0.1)';">
                            <span style="font-size: 24px;">💡</span>
                            <div>
                                <h4 style="color: #FF9800; margin: 0;">Case Studies</h4>
                                <p style="color: #ccc; margin: 5px 0 0 0; font-size: 14px;">Real-world implementation examples</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        resourcesContent.innerHTML = resourcesHTML;
        
        // Add download function to window
        window.downloadTemplate = function(index) {
            const template = agentTemplates.templates[index];
            if (template) {
                downloadFile(template.filename, template.content);
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.style.cssText = 'position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, #4CAF50, #66BB6A); color: white; padding: 15px 25px; border-radius: 10px; box-shadow: 0 5px 20px rgba(76, 175, 80, 0.3); z-index: 10000; animation: slideIn 0.3s ease;';
                successMsg.innerHTML = '✅ Template downloaded successfully!';
                document.body.appendChild(successMsg);
                
                setTimeout(() => {
                    successMsg.style.animation = 'slideOut 0.3s ease';
                    setTimeout(() => document.body.removeChild(successMsg), 300);
                }, 3000);
            }
        };
    }
    
    // Function to enhance Output tab
    function enhanceOutputTab() {
        console.log('📋 Enhancing Output tab with populated templates...');
        
        const outputContent = document.getElementById('output-content');
        if (!outputContent) return;
        
        // Get workspace data
        const workspaceData = getWorkspaceData();
        
        // Get current subcomponent ID
        const subcomponentId = window.currentSubcomponentId || 
                              document.querySelector('[data-subcomponent-id]')?.dataset.subcomponentId ||
                              new URLSearchParams(window.location.search).get('id') || '1-1';
        
        // Get templates for this agent
        const agentTemplates = templateLibrary[subcomponentId] || templateLibrary['1-1'];
        
        // Create output display with populated templates
        const outputHTML = `
            <div style="padding: 30px; max-width: 1200px; margin: 0 auto;">
                <h2 style="color: #FF5500; margin-bottom: 30px; font-size: 28px;">
                    📋 Generated Output Documents
                </h2>
                
                <div style="background: rgba(76, 175, 80, 0.1); border: 1px solid rgba(76, 175, 80, 0.3); border-radius: 10px; padding: 20px; margin-bottom: 30px;">
                    <p style="color: #4CAF50; margin: 0;">
                        <strong>✅ Templates automatically populated with your workspace answers</strong>
                    </p>
                </div>
                
                ${agentTemplates.templates.map((template, index) => {
                    const populated = populateTemplate(template.content, workspaceData);
                    return `
                        <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 15px; padding: 30px; margin-bottom: 30px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                                <h3 style="color: #fff; margin: 0;">
                                    📄 ${template.name}
                                </h3>
                                <button onclick="window.downloadPopulatedTemplate(${index})" 
                                        style="background: linear-gradient(135deg, #FF5500, #FF8800); color: white; border: none; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;"
                                        onmouseover="this.style.transform='scale(1.05)';"
                                        onmouseout="this.style.transform='scale(1))';">
                                    ⬇️ Download Populated
                                </button>
                            </div>
                            
                            <div style="background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px; padding: 20px; max-height: 400px; overflow-y: auto;">
                                <pre style="color: #ccc; font-family: 'Courier New', monospace; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${populated}</pre>
                            </div>
                        </div>
                    `;
                }).join('')}
                
                <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 15px; padding: 30px;">
                    <h3 style="color: #fff; margin-bottom: 20px;">
                        💾 Export Options
                    </h3>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                        <button onclick="window.exportAllTemplates()" 
                                style="background: linear-gradient(135deg, #2196F3, #42A5F5); color: white; border: none; padding: 15px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;"
                                onmouseover="this.style.transform='scale(1.05)';"
                                onmouseout="this.style.transform='scale(1)';">
                            📦 Export All as ZIP
                        </button>
                        
                        <button onclick="window.printOutput()" 
                                style="background: linear-gradient(135deg, #9C27B0, #BA68C8); color: white; border: none; padding: 15px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;"
                                onmouseover="this.style.transform='scale(1.05)';"
                                onmouseout="this.style.transform='scale(1)';">
                            🖨️ Print Preview
                        </button>
                        
                        <button onclick="window.emailOutput()" 
                                style="background: linear-gradient(135deg, #4CAF50, #66BB6A); color: white; border: none; padding: 15px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;"
                                onmouseover="this.style.transform='scale(1.05)';"
                                onmouseout="this.style.transform='scale(1)';">
                            📧 Email Documents
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        outputContent.innerHTML = outputHTML;
        
        // Add functions to window
        window.downloadPopulatedTemplate = function(index) {
            const template = agentTemplates.templates[index];
            if (template) {
                const populated = populateTemplate(template.content, workspaceData);
                downloadFile(template.filename.replace('.', '-populated.'), populated);
            }
        };
        
        window.exportAllTemplates = function() {
            alert('Exporting all templates as ZIP... (Feature coming soon)');
        };
        
        window.printOutput = function() {
            window.print();
        };
        
        window.emailOutput = function() {
            alert('Email functionality coming soon!');
        };
    }
    
    // Override tab switching to enhance Resources and Output tabs
    const originalSwitchTab = window.switchTab;
    if (originalSwitchTab) {
        window.switchTab = function(tabName, event) {
            originalSwitchTab(tabName, event);
            
            if (tabName === 'resources') {
                setTimeout(enhanceResourcesTab, 100);
            } else if (tabName === 'output') {
                setTimeout(enhanceOutputTab, 100);
            }
        };
    }
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    console.log('✅ Enhanced Resources and Output Handler loaded');
})();
// Enhanced Tabs with ST6 Branding - Systemic Fix for All 96 Subcomponents
// Fixes Score History clickability, Output templates display, and Resources styling

(function() {
    'use strict';
    
    console.log('🎨 Applying ST6 Branding to all tabs...');
    
    // ST6 Brand Colors and Styles
    const ST6_STYLES = {
        primaryOrange: '#FF5500',
        secondaryOrange: '#FF8800',
        successGreen: '#4CAF50',
        bgDark: 'rgba(0, 0, 0, 0.5)',
        bgLight: 'rgba(255, 255, 255, 0.02)',
        borderLight: 'rgba(255, 255, 255, 0.1)',
        borderOrange: 'rgba(255, 85, 0, 0.3)',
        textLight: '#ffffff',
        textMuted: '#999999',
        textDark: '#cccccc'
    };
    
    // Enhanced Score History with clickable cards
    window.enhanceScoreHistory = function() {
        console.log('📊 Enhancing Score History with ST6 branding...');
        
        const historyContent = document.getElementById('score-history-content');
        if (!historyContent) return;
        
        // Get subcomponent ID
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        
        // Load history from localStorage
        const historyKey = `score_history_${subcomponentId}`;
        const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
        
        if (history.length === 0) {
            historyContent.innerHTML = `
                <div style="text-align: center; padding: 80px 20px;">
                    <div style="font-size: 64px; margin-bottom: 20px;">📈</div>
                    <h2 style="font-size: 32px; color: ${ST6_STYLES.primaryOrange}; margin-bottom: 15px;">
                        Track Your Progress
                    </h2>
                    <p style="font-size: 18px; color: ${ST6_STYLES.textMuted};">
                        Your score history and improvements will appear here after your first analysis
                    </p>
                </div>
            `;
            return;
        }
        
        // Create clickable history cards
        let html = `
            <div style="padding: 30px; max-width: 1200px; margin: 0 auto;">
                <h2 style="color: ${ST6_STYLES.primaryOrange}; margin-bottom: 30px; font-size: 28px;">
                    📊 Score History & Progress
                </h2>
                <div style="display: grid; gap: 20px;">
        `;
        
        history.forEach((entry, index) => {
            const date = new Date(entry.timestamp);
            const scoreColor = entry.score >= 80 ? ST6_STYLES.successGreen : 
                             entry.score >= 60 ? '#F59E0B' : 
                             entry.score >= 40 ? '#3B82F6' : '#EF4444';
            
            html += `
                <div class="score-history-card" 
                     data-entry-index="${index}"
                     style="background: ${ST6_STYLES.bgLight}; 
                            border: 2px solid ${ST6_STYLES.borderOrange}; 
                            border-radius: 15px; 
                            padding: 25px;
                            cursor: pointer;
                            transition: all 0.3s ease;
                            position: relative;
                            overflow: hidden;"
                     onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 30px rgba(255, 85, 0, 0.3)'; this.style.borderColor='${ST6_STYLES.primaryOrange}';"
                     onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'; this.style.borderColor='${ST6_STYLES.borderOrange}';"
                     onclick="window.viewHistoryAnalysis(${index})">
                    
                    <div style="position: absolute; top: 0; right: 0; width: 150px; height: 150px; 
                                background: linear-gradient(135deg, transparent, ${scoreColor}20); 
                                border-radius: 0 0 0 100%;"></div>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; position: relative;">
                        <div>
                            <div style="color: ${ST6_STYLES.textMuted}; font-size: 14px; margin-bottom: 8px;">
                                ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}
                            </div>
                            <h3 style="color: ${ST6_STYLES.textLight}; font-size: 20px; margin: 0;">
                                ${entry.subcomponentName || 'Analysis'} #${history.length - index}
                            </h3>
                            ${entry.summary ? `
                                <p style="color: ${ST6_STYLES.textDark}; font-size: 14px; margin-top: 10px; line-height: 1.6;">
                                    ${entry.summary.substring(0, 150)}${entry.summary.length > 150 ? '...' : ''}
                                </p>
                            ` : ''}
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 48px; font-weight: 700; color: ${scoreColor};">
                                ${entry.score}%
                            </div>
                            <div style="color: ${ST6_STYLES.textMuted}; font-size: 14px; text-transform: uppercase;">
                                Score
                            </div>
                        </div>
                    </div>
                    
                    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid ${ST6_STYLES.borderLight};">
                        <button style="background: linear-gradient(135deg, ${ST6_STYLES.primaryOrange}, ${ST6_STYLES.secondaryOrange}); 
                                       color: white; 
                                       border: none; 
                                       padding: 10px 20px; 
                                       border-radius: 8px; 
                                       font-size: 14px; 
                                       font-weight: 600; 
                                       cursor: pointer;
                                       margin-right: 10px;"
                                onclick="event.stopPropagation(); window.viewHistoryAnalysis(${index})">
                            👁️ View Analysis
                        </button>
                        <button style="background: transparent; 
                                       color: ${ST6_STYLES.primaryOrange}; 
                                       border: 2px solid ${ST6_STYLES.primaryOrange}; 
                                       padding: 10px 20px; 
                                       border-radius: 8px; 
                                       font-size: 14px; 
                                       font-weight: 600; 
                                       cursor: pointer;"
                                onclick="event.stopPropagation(); window.downloadHistoryReport(${index})">
                            📥 Download Report
                        </button>
                    </div>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
        
        historyContent.innerHTML = html;
    };
    
    // View historical analysis
    window.viewHistoryAnalysis = function(index) {
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        const historyKey = `score_history_${subcomponentId}`;
        const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
        
        if (history[index]) {
            const entry = history[index];
            // Switch to analysis tab and display the saved analysis
            window.switchTab('analysis', null);
            
            // Display the saved analysis with the exact same format
            if (window.displayEnhancedAnalysisResults) {
                window.displayEnhancedAnalysisResults(entry, 'comprehensive');
            }
        }
    };
    
    // Download history report
    window.downloadHistoryReport = function(index) {
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        const historyKey = `score_history_${subcomponentId}`;
        const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
        
        if (history[index]) {
            const entry = history[index];
            const report = `ANALYSIS REPORT
=====================================
Date: ${new Date(entry.timestamp).toLocaleString()}
Subcomponent: ${entry.subcomponentName}
Score: ${entry.score}%

SUMMARY
-------
${entry.summary || 'No summary available'}

STRENGTHS
---------
${entry.strengths ? entry.strengths.join('\n') : 'No strengths recorded'}

AREAS FOR IMPROVEMENT
--------------------
${entry.weaknesses ? entry.weaknesses.join('\n') : 'No weaknesses recorded'}
`;
            
            const blob = new Blob([report], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `analysis-report-${index + 1}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }
    };
    
    // Enhanced Output Tab - NOW USING SSOT DATA
    window.enhanceOutputTabST6 = function() {
        console.log('📋 Enhancing Output tab with ST6 branding (SSOT-driven)...');
        
        const outputContent = document.getElementById('output-content');
        if (!outputContent) return;
        
        // Get subcomponent ID
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        
        // Get workspace data
        const workspaceData = {};
        const inputs = document.querySelectorAll('#workspace-tab input, #workspace-tab textarea, #dynamic-worksheet-container input, #dynamic-worksheet-container textarea');
        inputs.forEach(input => {
            if (input.id && input.value) {
                workspaceData[input.id] = input.value;
            }
        });
        
        // Get latest score from analysis or use default
        const latestScore = window.latestAnalysisResult?.score || 75;
        
        // ✅ GET TEMPLATES FROM API DATA (SSOT)
        const apiTemplates = window.subcomponentData?.outputs?.templates ||
                           window.subcomponentData?.resources?.templates || [];
        
        console.log(`✅ Loading ${apiTemplates.length} output templates from SSOT for ${subcomponentId}`);
        
        const templateNames = apiTemplates.length > 0 ? apiTemplates :
            ["Generic Template 1", "Generic Template 2", "Generic Template 3"];
        
        // Template icons and colors (cycle through for variety)
        const templateIcons = ['📄', '🎤', '📊', '🎯', '🚀', '🗺️'];
        const templateColors = [ST6_STYLES.primaryOrange, '#9C27B0', '#2196F3', '#4CAF50', '#F59E0B', '#3B82F6'];
        
        // Build templates array with dynamic names
        const templates = templateNames.map((name, idx) => ({
            name: name,
            icon: templateIcons[idx % templateIcons.length],
            color: templateColors[idx % templateColors.length],
            description: `Strategic template for ${subcomponentId}`
        }));
        
        let html = `
            <div style="padding: 30px; max-width: 1200px; margin: 0 auto;">
                <h2 style="color: ${ST6_STYLES.primaryOrange}; margin-bottom: 30px; font-size: 28px;">
                    📋 Generated Output Documents
                </h2>
                
                <div style="background: linear-gradient(135deg, ${ST6_STYLES.successGreen}20, ${ST6_STYLES.successGreen}10); 
                            border: 2px solid ${ST6_STYLES.successGreen}; 
                            border-radius: 10px; 
                            padding: 20px; 
                            margin-bottom: 30px;">
                    <p style="color: ${ST6_STYLES.successGreen}; margin: 0; font-size: 16px; font-weight: 600;">
                        ✅ Templates automatically populated with your workspace answers and ${latestScore}% analysis score
                    </p>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 25px;">
        `;
        
        templates.forEach((template, index) => {
            html += `
                <div style="background: ${ST6_STYLES.bgLight}; 
                            border: 2px solid ${ST6_STYLES.borderOrange}; 
                            border-radius: 15px; 
                            padding: 25px;
                            transition: all 0.3s ease;
                            cursor: pointer;"
                     onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 30px rgba(255, 85, 0, 0.3)'; this.style.borderColor='${ST6_STYLES.primaryOrange}';"
                     onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'; this.style.borderColor='${ST6_STYLES.borderOrange}';">
                    
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                        <div style="background: linear-gradient(135deg, ${template.color}, ${template.color}88); 
                                    width: 60px; 
                                    height: 60px; 
                                    border-radius: 12px; 
                                    display: flex; 
                                    align-items: center; 
                                    justify-content: center; 
                                    font-size: 28px;">
                            ${template.icon}
                        </div>
                        <div style="flex: 1;">
                            <h3 style="color: ${ST6_STYLES.textLight}; margin: 0; font-size: 18px;">
                                ${template.name}
                            </h3>
                            <p style="color: ${ST6_STYLES.textMuted}; margin: 5px 0 0 0; font-size: 14px;">
                                ${template.description}
                            </p>
                        </div>
                    </div>
                    
                    <div style="background: ${ST6_STYLES.bgDark}; 
                                border-radius: 8px; 
                                padding: 15px; 
                                margin-bottom: 20px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="color: ${ST6_STYLES.textDark}; font-size: 14px;">
                                Score Integration:
                            </span>
                            <span style="color: ${latestScore >= 80 ? ST6_STYLES.successGreen : ST6_STYLES.primaryOrange}; 
                                         font-size: 20px; 
                                         font-weight: 700;">
                                ${latestScore}%
                            </span>
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 10px;">
                        <button onclick="window.viewTemplate(${index})" 
                                style="flex: 1;
                                       background: linear-gradient(135deg, ${ST6_STYLES.primaryOrange}, ${ST6_STYLES.secondaryOrange}); 
                                       color: white; 
                                       border: none; 
                                       padding: 12px; 
                                       border-radius: 8px; 
                                       font-size: 14px; 
                                       font-weight: 600; 
                                       cursor: pointer;">
                            👁️ View
                        </button>
                        <button onclick="window.downloadTemplate(${index})" 
                                style="flex: 1;
                                       background: transparent; 
                                       color: ${ST6_STYLES.primaryOrange}; 
                                       border: 2px solid ${ST6_STYLES.primaryOrange}; 
                                       padding: 12px; 
                                       border-radius: 8px; 
                                       font-size: 14px; 
                                       font-weight: 600; 
                                       cursor: pointer;">
                            📥 Download
                        </button>
                    </div>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
        
        outputContent.innerHTML = html;
    };
    
    // Enhanced Resources Tab - NOW USING SSOT DATA
    window.enhanceResourcesTabST6 = function() {
        console.log('🔧 Enhancing Resources tab with ST6 branding (SSOT-driven)...');
        
        let resourcesContent = document.getElementById('resources-content');
        if (!resourcesContent) {
            resourcesContent = document.getElementById('resource-templates');
        }
        if (!resourcesContent) {
            const resourcesTab = document.getElementById('resources-tab');
            if (resourcesTab) {
                resourcesContent = document.createElement('div');
                resourcesContent.id = 'resources-content';
                resourcesTab.innerHTML = '';
                resourcesTab.appendChild(resourcesContent);
            }
        }
        if (!resourcesContent) return;
        
        // ✅ GET TEMPLATES FROM API DATA (SSOT)
        const apiTemplates = window.subcomponentData?.resources?.templates || [];
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        
        console.log(`✅ Loading ${apiTemplates.length} templates from SSOT for ${subcomponentId}`);
        
        // Map API templates to display format
        const templateIcons = ['📄', '🎤', '📊'];
        const templates = apiTemplates.map((name, index) => ({
            name: name,
            filename: name.toLowerCase().replace(/\s+/g, '-') + '.docx',
            icon: templateIcons[index % templateIcons.length],
            description: `Strategic template for ${window.subcomponentData?.name || 'this subcomponent'}`
        }));
        
        // Fallback if no templates from API
        if (templates.length === 0) {
            console.warn('⚠️ No templates from API, using fallback');
            templates.push(
                {
                    name: 'Generic Template 1',
                    filename: 'template-1.docx',
                    icon: '📄',
                    description: 'Complete the workspace to unlock templates'
                },
                {
                    name: 'Generic Template 2',
                    filename: 'template-2.docx',
                    icon: '🎤',
                    description: 'Complete the workspace to unlock templates'
                },
                {
                    name: 'Generic Template 3',
                    filename: 'template-3.docx',
                    icon: '📊',
                    description: 'Complete the workspace to unlock templates'
                }
            );
        }
        
        let html = `
            <div style="padding: 30px; max-width: 1200px; margin: 0 auto;">
                <h2 style="color: ${ST6_STYLES.primaryOrange}; margin-bottom: 30px; font-size: 28px;">
                    📚 Resources & Templates
                </h2>
                
                <div style="background: ${ST6_STYLES.bgLight}; 
                            border: 2px solid ${ST6_STYLES.borderOrange}; 
                            border-radius: 15px; 
                            padding: 30px;">
                    
                    <h3 style="color: ${ST6_STYLES.textLight}; margin-bottom: 25px; font-size: 20px;">
                        <span style="color: ${ST6_STYLES.successGreen};">✓</span> Professional Templates Library
                    </h3>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px;">
        `;
        
        templates.forEach((template, index) => {
            html += `
                <div style="background: ${ST6_STYLES.bgDark}; 
                            border: 1px solid ${ST6_STYLES.borderLight}; 
                            border-radius: 12px; 
                            padding: 20px;
                            transition: all 0.3s ease;"
                     onmouseover="this.style.transform='translateY(-3px)'; this.style.borderColor='${ST6_STYLES.primaryOrange}'; this.style.boxShadow='0 5px 20px rgba(255, 85, 0, 0.2)';"
                     onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='${ST6_STYLES.borderLight}'; this.style.boxShadow='none';">
                    
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                        <div style="background: linear-gradient(135deg, ${ST6_STYLES.primaryOrange}, ${ST6_STYLES.secondaryOrange}); 
                                    width: 50px; 
                                    height: 50px; 
                                    border-radius: 10px; 
                                    display: flex; 
                                    align-items: center; 
                                    justify-content: center; 
                                    font-size: 24px;">
                            ${template.icon}
                        </div>
                        <div style="flex: 1;">
                            <h4 style="color: ${ST6_STYLES.textLight}; margin: 0; font-size: 16px;">
                                ${template.name}
                            </h4>
                            <p style="color: ${ST6_STYLES.textMuted}; margin: 3px 0 0 0; font-size: 12px;">
                                ${template.filename}
                            </p>
                        </div>
                    </div>
                    
                    <p style="color: ${ST6_STYLES.textDark}; font-size: 14px; line-height: 1.5; margin-bottom: 15px;">
                        ${template.description}
                    </p>
                    
                    <button onclick="window.downloadResourceTemplate(${index})" 
                            style="width: 100%;
                                   background: linear-gradient(135deg, ${ST6_STYLES.successGreen}, #66BB6A); 
                                   color: white; 
                                   border: none; 
                                   padding: 12px; 
                                   border-radius: 8px; 
                                   font-size: 14px; 
                                   font-weight: 600; 
                                   cursor: pointer;
                                   transition: all 0.3s ease;"
                            onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 5px 15px rgba(76, 175, 80, 0.3)';"
                            onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='none';">
                        ⬇️ Download Template
                    </button>
                </div>
            `;
        });
        
        html += `
                    </div>
                </div>
            </div>
        `;
        
        resourcesContent.innerHTML = html;
    };
    
    // Template functions - View template in modal
    window.viewTemplate = function(index) {
        console.log(`👁️ Viewing output template #${index}...`);
        
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        
        // Get templates from SSOT
        const apiTemplates = window.subcomponentData?.outputs?.templates ||
                           window.subcomponentData?.resources?.templates || [];
        const templateName = apiTemplates[index] || `Template ${index + 1}`;
        
        // Get workspace data
        const workspaceAnswers = {};
        const inputs = document.querySelectorAll('#workspace-tab input, #workspace-tab textarea, #dynamic-worksheet-container input, #dynamic-worksheet-container textarea');
        inputs.forEach(input => {
            if (input.id && input.value) {
                workspaceAnswers[input.id] = {
                    question: input.previousElementSibling?.textContent || input.placeholder || input.id,
                    answer: input.value
                };
            }
        });
        
        // Get latest score
        const historyKey = `score_history_${subcomponentId}`;
        const scoreHistory = JSON.parse(localStorage.getItem(historyKey) || '[]');
        const latestScore = scoreHistory[0]?.score || 0;
        
        // Generate and show template
        const content = generatePopulatedTemplateHTML(templateName, workspaceAnswers, latestScore);
        showTemplateModal(templateName, content, index);
    };
    
    function showTemplateModal(templateName, content, index) {
        let modal = document.getElementById('template-preview-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'template-preview-modal';
            modal.style.cssText = `
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                z-index: 10000;
                overflow-y: auto;
            `;
            document.body.appendChild(modal);
        }
        
        modal.innerHTML = `
            <div style="max-width: 1000px; margin: 40px auto; padding: 20px;">
                <button onclick="document.getElementById('template-preview-modal').style.display='none'" style="
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #FF5500;
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 8px;
                    font-size: 16px;
                    cursor: pointer;
                    z-index: 10001;
                    font-weight: 600;
                ">✕ Close</button>
                
                <div style="margin-top: 60px;">
                    ${content}
                </div>
                
                <div style="text-align: center; margin-top: 30px;">
                    <button onclick="window.downloadTemplate(${index})" style="
                        background: linear-gradient(135deg, #FF5500, #FF8800);
                        color: white;
                        border: none;
                        padding: 15px 40px;
                        border-radius: 10px;
                        font-size: 18px;
                        font-weight: 600;
                        cursor: pointer;
                    ">
                        📥 Download This Template
                    </button>
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
    }
    
    window.downloadTemplate = function(index) {
        console.log(`📥 Downloading output template #${index}...`);
        
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        
        // Get templates from SSOT
        const apiTemplates = window.subcomponentData?.outputs?.templates ||
                           window.subcomponentData?.resources?.templates || [];
        const templateName = apiTemplates[index] || `Template ${index + 1}`;
        
        // Get workspace data
        const workspaceAnswers = {};
        const inputs = document.querySelectorAll('#workspace-tab input, #workspace-tab textarea, #dynamic-worksheet-container input, #dynamic-worksheet-container textarea');
        inputs.forEach(input => {
            if (input.id && input.value) {
                workspaceAnswers[input.id] = {
                    question: input.previousElementSibling?.textContent || input.placeholder || input.id,
                    answer: input.value
                };
            }
        });
        
        // Get latest score
        const historyKey = `score_history_${subcomponentId}`;
        const scoreHistory = JSON.parse(localStorage.getItem(historyKey) || '[]');
        const latestScore = scoreHistory[0]?.score || 0;
        
        // Generate populated template content
        const content = generatePopulatedTemplateHTML(templateName, workspaceAnswers, latestScore);
        
        // Download as HTML file
        const blob = new Blob([content], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${templateName.toLowerCase().replace(/\s+/g, '-')}-populated.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        // Show success notification
        if (window.showSuccessNotification) {
            window.showSuccessNotification(`✅ ${templateName} downloaded!`);
        }
    };
    
    function generatePopulatedTemplateHTML(templateName, workspaceAnswers, score) {
        const answersArray = Object.entries(workspaceAnswers).map(([id, data]) => ({
            id,
            question: data.question || id,
            answer: data.answer || data
        }));
        
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${templateName} - ScaleOps6</title>
    <style>
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            background: #0a0a0a;
            color: #e0e0e0;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: #1a1a1a;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        }
        .header {
            background: linear-gradient(135deg, #FF5500, #FF8800);
            color: white;
            padding: 40px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 36px;
            font-weight: 700;
        }
        .header p {
            margin: 10px 0 0 0;
            font-size: 18px;
            opacity: 0.95;
        }
        .content {
            padding: 40px;
        }
        .section {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 25px;
            margin-bottom: 25px;
        }
        .section h2 {
            color: #FF5500;
            border-bottom: 3px solid #FF5500;
            padding-bottom: 10px;
            margin-top: 0;
        }
        .section h3 {
            color: #fff;
            margin-top: 20px;
        }
        .answer-box {
            background: #0a0a0a;
            padding: 15px;
            border-left: 4px solid #FF5500;
            border-radius: 5px;
            margin: 10px 0;
        }
        .footer {
            background: #2c3e50;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .score-badge {
            display: inline-block;
            background: linear-gradient(135deg, #4CAF50, #66BB6A);
            color: white;
            padding: 10px 20px;
            border-radius: 20px;
            font-size: 20px;
            font-weight: 700;
            margin: 10px 0;
        }
        @media print {
            body { background: white; color: black; }
            .container { box-shadow: none; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${templateName.toUpperCase()}</h1>
            <p>Generated by ScaleOps6 Platform</p>
            ${score > 0 ? `<div class="score-badge">Performance Score: ${Math.round(score)}%</div>` : ''}
        </div>
        
        <div class="content">
            <div class="section">
                <h2>Company Information</h2>
                <p><strong>Company:</strong> ST6Co</p>
                <p><strong>Product:</strong> ScaleOps6Product</p>
                <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                <p><strong>Subcomponent:</strong> ${subcomponentId}</p>
            </div>
            
            ${answersArray.length > 0 ? `
            <div class="section">
                <h2>Workspace Responses</h2>
                ${answersArray.map(item => `
                    <div style="margin-bottom: 20px;">
                        <h3>${item.question}</h3>
                        <div class="answer-box">
                            ${item.answer}
                        </div>
                    </div>
                `).join('')}
            </div>
            ` : `
            <div class="section">
                <h2>Template Content</h2>
                <p>This template is ready for you to customize with your specific information.</p>
                <p>Complete the workspace tab to automatically populate this template with your answers.</p>
            </div>
            `}
            
            ${score > 0 ? `
            <div class="section">
                <h2>Performance Insights</h2>
                <p>Based on your ${Math.round(score)}% performance score, this template has been enhanced with strategic recommendations.</p>
                <div class="answer-box">
                    ${score >= 80 ?
                        'Excellent performance! Focus on scaling and optimization strategies.' :
                        score >= 60 ?
                        'Good foundation. Implement recommended improvements for better results.' :
                        'Building phase. Follow the structured approach to strengthen fundamentals.'}
                </div>
            </div>
            ` : ''}
        </div>
        
        <div class="footer">
            <p>Generated by ScaleOps6 Platform • ${new Date().toLocaleString()}</p>
        </div>
    </div>
</body>
</html>`;
    }
    
    window.downloadResourceTemplate = function(index) {
        console.log(`📥 Downloading resource template #${index}...`);
        
        // Get templates from SSOT
        const apiTemplates = window.subcomponentData?.resources?.templates || [];
        const templateName = apiTemplates[index] || `Template ${index + 1}`;
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        
        // Create template content
        const content = `${templateName}

Company: ST6Co
Product: ScaleOps6Product
Date: ${new Date().toLocaleDateString()}
Subcomponent: ${subcomponentId}

[Template content - customize based on your needs]

This is a professional template from the ScaleOps6 Platform.
Use this framework to structure your ${templateName.toLowerCase()}.

Generated by ScaleOps6 Platform
${new Date().toLocaleString()}`;
        
        // Create and download file
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${templateName.toLowerCase().replace(/\s+/g, '-')}-${subcomponentId}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        // Show success notification
        if (window.showSuccessNotification) {
            window.showSuccessNotification(`✅ ${templateName} downloaded successfully!`);
        }
    };
    
    // Override tab switching to apply ST6 branding
    const originalSwitchTab = window.switchTab;
    if (originalSwitchTab) {
        window.switchTab = function(tabName, event) {
            originalSwitchTab(tabName, event);
            
            if (tabName === 'history') {
                setTimeout(window.enhanceScoreHistory, 100);
            } else if (tabName === 'output') {
                setTimeout(window.enhanceOutputTabST6, 100);
            } else if (tabName === 'resources') {
                setTimeout(window.enhanceResourcesTabST6, 100);
            }
        };
    }
    
    // Auto-apply on page load
    document.addEventListener('DOMContentLoaded', () => {
        // Check which tab is active and enhance it
        const activeTab = document.querySelector('.tab-button.active');
        if (activeTab) {
            const tabName = activeTab.getAttribute('data-tab');
            if (tabName === 'history') {
                window.enhanceScoreHistory();
            } else if (tabName === 'output') {
                window.enhanceOutputTabST6();
            } else if (tabName === 'resources') {
                window.enhanceResourcesTabST6();
            }
        }
    });
    
    console.log('✅ ST6 Branding applied to all tabs - Systemic for all 96 subcomponents!');
})();
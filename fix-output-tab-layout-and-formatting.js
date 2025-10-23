/**
 * FIX: Output Tab Layout Consistency and Response Formatting - FINAL OVERRIDE
 * 
 * Issues Fixed:
 * 1. Maintains consistent dark theme and Inter fonts when viewing templates (no layout changes)
 * 2. Removes percentage displays from Output tab interface
 * 3. Formats workspace responses as bullet points with summarization
 * 
 * This script MUST load LAST to properly override all other implementations
 */

(function() {
    'use strict';
    
    console.log('🎨 Applying Output Tab Layout and Formatting Fixes - FINAL OVERRIDE...');
    
    const fontFamily = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";
    
    /**
     * Format workspace responses as bullet points (one bullet per sentence)
     * Smart sentence splitting that preserves numbers like "2.3" and "1.5x"
     */
    function formatWorkspaceResponses(workspaceAnswers) {
        if (!workspaceAnswers || Object.keys(workspaceAnswers).length === 0) {
            return '<p style="color: #999; font-style: italic;">No workspace data available. Complete the workspace tab to populate templates.</p>';
        }
        
        const entries = Object.entries(workspaceAnswers);
        let html = '<div style="display: flex; flex-direction: column; gap: 20px;">';
        
        entries.forEach(([id, data]) => {
            const question = data.question || id;
            const answer = data.answer || data;
            
            // Smart sentence splitting that preserves decimal numbers
            // Split on period/exclamation/question mark followed by space and capital letter
            // This preserves "2.3" but splits "sentence. Next sentence"
            const sentences = String(answer)
                .split(/(?<=[.!?])\s+(?=[A-Z])/)
                .map(s => s.trim())
                .filter(s => s.length > 10); // Filter out very short fragments
            
            html += '<div style="background: rgba(255, 255, 255, 0.02); border-left: 3px solid #FF5500; padding: 15px 20px; border-radius: 8px;">';
            html += '<h4 style="color: #FF5500; font-size: 14px; font-weight: 600; margin: 0 0 10px 0; font-family: ' + fontFamily + ';">' + question + '</h4>';
            html += '<div style="color: #e0e0e0; font-size: 15px; line-height: 1.8; font-family: ' + fontFamily + ';">';
            
            // If we got good sentence splits, use them as bullets
            if (sentences.length > 1) {
                sentences.forEach(sentence => {
                    html += '<div style="display: flex; align-items: start; gap: 10px; margin-bottom: 8px;">';
                    html += '<span style="color: #FF5500; font-size: 18px; flex-shrink: 0;">•</span>';
                    html += '<span>' + sentence + '</span>';
                    html += '</div>';
                });
            } else {
                // If no good splits (single sentence or complex text), show as single bullet
                html += '<div style="display: flex; align-items: start; gap: 10px;">';
                html += '<span style="color: #FF5500; font-size: 18px; flex-shrink: 0;">•</span>';
                html += '<span>' + answer + '</span>';
                html += '</div>';
            }
            
            html += '</div></div>';
        });
        
        html += '</div>';
        return html;
    }
    
    /**
     * Generate template card WITHOUT percentage displays
     */
    function generateTemplateCardNoPct(templateName, index, workspaceAnswers, score, subcomponentId) {
        const colors = ['#FF5500', '#9C27B0', '#2196F3', '#4CAF50'];
        const icons = ['📄', '🎤', '📊', '✅'];
        const color = colors[index % colors.length];
        const icon = icons[index % icons.length];
        
        // Store workspace answers globally to avoid JSON escaping issues
        if (!window.templateWorkspaceData) {
            window.templateWorkspaceData = {};
        }
        window.templateWorkspaceData[index] = workspaceAnswers;
        
        let html = '<div style="background: rgba(255, 255, 255, 0.02); border: 2px solid rgba(255, 255, 255, 0.1); border-radius: 20px; padding: 30px; transition: all 0.3s ease; font-family: ' + fontFamily + ';" ';
        html += 'onmouseover="this.style.transform=\'translateY(-5px)\'; this.style.borderColor=\'' + color + '\'; this.style.boxShadow=\'0 15px 40px rgba(255, 85, 0, 0.2)\';" ';
        html += 'onmouseout="this.style.transform=\'translateY(0)\'; this.style.borderColor=\'rgba(255, 255, 255, 0.1)\'; this.style.boxShadow=\'none\';">';
        
        html += '<div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">';
        html += '<div style="background: linear-gradient(135deg, ' + color + ', ' + color + '88); width: 60px; height: 60px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 28px;">' + icon + '</div>';
        html += '<div style="flex: 1;">';
        html += '<h3 style="color: white; margin: 0; font-size: 18px; font-weight: 600; font-family: ' + fontFamily + ';">' + templateName + '</h3>';
        html += '<p style="color: #999; margin: 5px 0 0 0; font-size: 13px; font-family: ' + fontFamily + ';">Strategic template for ' + subcomponentId + '</p>';
        html += '</div></div>';
        
        html += '<div style="margin-bottom: 20px;">';
        html += '<div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px; color: #ccc; font-size: 14px; font-family: ' + fontFamily + ';"><span style="color: #4CAF50;">✓</span><span>Workspace data integrated</span></div>';
        html += '<div style="display: flex; align-items: center; gap: 10px; color: #ccc; font-size: 14px; font-family: ' + fontFamily + ';"><span style="color: #4CAF50;">✓</span><span>Strategic recommendations included</span></div>';
        html += '</div>';
        
        html += '<div style="display: flex; gap: 10px;">';
        html += '<button onclick="event.stopPropagation(); viewPopulatedTemplateFixed(' + index + ', \'' + templateName.replace(/'/g, "\\'") + '\', ' + score + ')" ';
        html += 'style="flex: 1; background: linear-gradient(135deg, ' + color + ', ' + color + 'CC); color: white; border: none; padding: 12px; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; font-family: ' + fontFamily + ';" ';
        html += 'onmouseover="this.style.transform=\'scale(1.05)\';" onmouseout="this.style.transform=\'scale(1)\';">👁️ View</button>';
        
        html += '<button onclick="event.stopPropagation(); downloadPopulatedTemplateFixed(' + index + ', \'' + templateName.replace(/'/g, "\\'") + '\', ' + score + ')" ';
        html += 'style="flex: 1; background: transparent; color: ' + color + '; border: 2px solid ' + color + '; padding: 12px; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; font-family: ' + fontFamily + ';" ';
        html += 'onmouseover="this.style.background=\'' + color + '\'; this.style.color=\'white\';" onmouseout="this.style.background=\'transparent\'; this.style.color=\'' + color + '\';">📥 Download</button>';
        
        html += '</div></div>';
        
        return html;
    }
    
    /**
     * Override the template generation to maintain consistent styling
     */
    function generatePopulatedTemplateHTMLFixed(templateName, workspaceAnswers, score) {
        const formattedResponses = formatWorkspaceResponses(workspaceAnswers);
        
        let html = '<div style="font-family: ' + fontFamily + '; color: #e0e0e0; background: #0a0a0a; padding: 40px; border-radius: 15px; max-width: 900px; margin: 0 auto;">';
        
        // Header
        html += '<div style="background: linear-gradient(135deg, #FF5500, #FF8800); color: white; padding: 40px; border-radius: 15px; margin-bottom: 30px; text-align: center;">';
        html += '<h1 style="margin: 0; font-size: 36px; font-weight: 700; font-family: ' + fontFamily + ';">' + templateName.toUpperCase() + '</h1>';
        html += '<p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.95; font-family: ' + fontFamily + ';">Generated by ScaleOps6 Platform</p>';
        html += '</div>';
        
        // Workspace Responses
        html += '<div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 30px; margin-bottom: 30px;">';
        html += '<h2 style="color: #FF5500; font-size: 24px; font-weight: 700; margin: 0 0 25px 0; font-family: ' + fontFamily + '; border-bottom: 2px solid #FF5500; padding-bottom: 10px;">Workspace Responses</h2>';
        html += formattedResponses;
        html += '</div>';
        
        // Strategic Recommendations
        html += '<div style="background: linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(76, 175, 80, 0.05)); border: 2px solid #4CAF50; border-radius: 12px; padding: 30px; margin-bottom: 30px;">';
        html += '<h2 style="color: #4CAF50; font-size: 24px; font-weight: 700; margin: 0 0 20px 0; font-family: ' + fontFamily + ';">Strategic Recommendations</h2>';
        html += '<div style="font-family: ' + fontFamily + '; color: #e0e0e0; line-height: 1.8;"><ul style="margin: 0; padding-left: 25px;">';
        
        if (score >= 80) {
            html += '<li style="margin-bottom: 12px;">Scale your validated solution across new market segments</li>';
            html += '<li style="margin-bottom: 12px;">Document and systematize your successful processes</li>';
            html += '<li style="margin-bottom: 12px;">Explore strategic partnerships for accelerated growth</li>';
            html += '<li style="margin-bottom: 12px;">Invest in advanced analytics and automation</li>';
            html += '<li style="margin-bottom: 12px;">Consider international expansion opportunities</li>';
        } else if (score >= 60) {
            html += '<li style="margin-bottom: 12px;">Focus on optimizing core operational processes</li>';
            html += '<li style="margin-bottom: 12px;">Implement comprehensive customer feedback systems</li>';
            html += '<li style="margin-bottom: 12px;">Strengthen product-market fit validation</li>';
            html += '<li style="margin-bottom: 12px;">Build scalable infrastructure for growth</li>';
            html += '<li style="margin-bottom: 12px;">Develop clear KPIs and tracking mechanisms</li>';
        } else {
            html += '<li style="margin-bottom: 12px;">Prioritize problem validation with target customers</li>';
            html += '<li style="margin-bottom: 12px;">Establish clear value proposition</li>';
            html += '<li style="margin-bottom: 12px;">Focus on achieving initial product-market fit</li>';
            html += '<li style="margin-bottom: 12px;">Build minimum viable solution for testing</li>';
            html += '<li style="margin-bottom: 12px;">Implement agile development processes</li>';
        }
        
        html += '</ul></div></div>';
        
        // Next Steps
        html += '<div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 30px;">';
        html += '<h2 style="color: #FF5500; font-size: 24px; font-weight: 700; margin: 0 0 20px 0; font-family: ' + fontFamily + '; border-bottom: 2px solid #FF5500; padding-bottom: 10px;">Strategic Next Steps</h2>';
        html += '<ol style="margin: 0; padding-left: 25px; font-family: ' + fontFamily + '; color: #e0e0e0; line-height: 1.8;">';
        html += '<li style="margin-bottom: 12px;"><strong>Immediate (Week 1-2):</strong> Validate assumptions with customer interviews</li>';
        html += '<li style="margin-bottom: 12px;"><strong>Short-term (Month 1):</strong> Quantify problem impact with specific metrics</li>';
        html += '<li style="margin-bottom: 12px;"><strong>Medium-term (Month 2-3):</strong> Develop and test MVP solution</li>';
        html += '<li style="margin-bottom: 12px;"><strong>Long-term (Month 4-6):</strong> Scale based on validated learnings</li>';
        html += '<li style="margin-bottom: 12px;"><strong>Ongoing:</strong> Maintain continuous feedback and iteration cycles</li>';
        html += '</ol></div>';
        
        // Footer
        html += '<div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1); color: #666; font-size: 14px; font-family: ' + fontFamily + ';">';
        html += 'Generated by ScaleOps6 Platform • ' + new Date().toLocaleString();
        html += '</div></div>';
        
        return html;
    }
    
    /**
     * View template with globally stored data (avoids JSON escaping issues)
     */
    window.viewPopulatedTemplateFixed = function(index, templateName, score) {
        const workspaceAnswers = window.templateWorkspaceData?.[index] || {};
        const populatedHTML = generatePopulatedTemplateHTMLFixed(templateName, workspaceAnswers, score);
        showTemplateModalFixed(templateName, populatedHTML, index, score);
    };
    
    /**
     * Download template with globally stored data - CALLS DOCX ENDPOINT
     */
    window.downloadPopulatedTemplateFixed = function(index, templateName, score) {
        const workspaceAnswers = window.templateWorkspaceData?.[index] || {};
        
        // Get subcomponent ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        
        // Call DOCX download endpoint instead of creating HTML blob
        if (window.downloadDOCXTemplate) {
            window.downloadDOCXTemplate(templateName, subcomponentId, workspaceAnswers, score);
        } else {
            console.error('DOCX download function not available');
            if (window.showSuccessNotification) {
                window.showSuccessNotification('❌ Download service not available');
            }
        }
    };
    
    /**
     * Override modal display to use consistent styling
     */
    function showTemplateModalFixed(templateName, content, index, score) {
        let modal = document.getElementById('template-preview-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'template-preview-modal';
            modal.style.cssText = 'display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.95); z-index: 10000; overflow-y: auto; font-family: ' + fontFamily + ';';
            document.body.appendChild(modal);
        }
        
        let modalHTML = '<div style="max-width: 1000px; margin: 40px auto; padding: 20px;">';
        modalHTML += '<button onclick="document.getElementById(\'template-preview-modal\').style.display=\'none\'" style="position: fixed; top: 20px; right: 20px; background: #FF5500; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-size: 16px; cursor: pointer; z-index: 10001; font-weight: 600; font-family: ' + fontFamily + ';">✕ Close</button>';
        modalHTML += '<div style="margin-top: 60px;">' + content + '</div>';
        modalHTML += '<div style="text-align: center; margin-top: 30px;">';
        modalHTML += '<button onclick="downloadPopulatedTemplateFixed(' + index + ', \'' + templateName.replace(/'/g, "\\'") + '\', ' + score + ')" style="background: linear-gradient(135deg, #FF5500, #FF8800); color: white; border: none; padding: 15px 40px; border-radius: 10px; font-size: 18px; font-weight: 600; cursor: pointer; font-family: ' + fontFamily + ';">📥 Download This Template</button>';
        modalHTML += '</div></div>';
        
        modal.innerHTML = modalHTML;
        modal.style.display = 'block';
    }
    
    /**
     * FINAL OVERRIDE: Load template outputs WITHOUT percentages
     */
    function loadTemplateOutputsFixed() {
        console.log('📋 Loading template outputs - NO PERCENTAGES VERSION...');
        
        const outputContent = document.getElementById('output-content');
        if (!outputContent) return;
        
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
        
        // Get score history
        const urlParams = new URLSearchParams(window.location.search);
        const subcomponentId = urlParams.get('id') || '1-1';
        window.subcomponentId = subcomponentId;
        
        const historyKey = 'score_history_' + subcomponentId;
        const scoreHistory = JSON.parse(localStorage.getItem(historyKey) || '[]');
        const latestScore = scoreHistory[0]?.score || 0;
        
        // Get templates from API data
        const templates = window.subcomponentData?.resources?.templates || [];
        
        if (templates.length === 0) {
            outputContent.innerHTML = '<div style="text-align: center; padding: 60px 20px; color: #999; font-family: ' + fontFamily + ';"><div style="font-size: 48px; margin-bottom: 20px;">📋</div><h3 style="font-size: 24px; margin-bottom: 10px; color: #fff;">No Templates Available</h3><p style="font-size: 16px;">Complete the workspace to generate output templates</p></div>';
            return;
        }
        
        // Build output HTML WITHOUT percentage values
        let html = '<div style="padding: 40px; max-width: 1400px; margin: 0 auto; font-family: ' + fontFamily + ';">';
        
        // Header (NO percentage mention)
        html += '<div style="background: linear-gradient(135deg, #FF5500, #FF8800); border-radius: 20px; padding: 40px; margin-bottom: 40px; text-align: center; box-shadow: 0 10px 30px rgba(255, 85, 0, 0.3);">';
        html += '<h1 style="font-size: 36px; margin: 0 0 10px 0; color: white; font-weight: 700; font-family: ' + fontFamily + ';">📋 Generated Output Documents</h1>';
        html += '<p style="font-size: 18px; margin: 0; color: rgba(255, 255, 255, 0.9); font-family: ' + fontFamily + ';">Templates automatically populated with your workspace answers</p>';
        html += '</div>';
        
        // Templates Grid (NO percentage displays)
        html += '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 30px;">';
        templates.forEach((templateName, index) => {
            html += generateTemplateCardNoPct(templateName, index, workspaceAnswers, latestScore, subcomponentId);
        });
        html += '</div></div>';
        
        outputContent.innerHTML = html;
    }
    
    // Apply overrides with delay to ensure they take effect AFTER all other scripts
    setTimeout(() => {
        console.log('🔄 Applying FINAL overrides for Output tab...');
        
        // Override the main functions
        window.loadTemplateOutputs = loadTemplateOutputsFixed;
        window.generatePopulatedTemplateHTML = generatePopulatedTemplateHTMLFixed;
        window.showTemplateModal = showTemplateModalFixed;
        
        // Also override any ST6 branding functions
        if (window.enhanceOutputTabST6) {
            window.enhanceOutputTabST6 = function() {
                loadTemplateOutputsFixed();
            };
        }
        
        // Override the tab switching to use our fixed version
        const originalSwitchTab = window.switchTab;
        if (originalSwitchTab) {
            window.switchTab = function(tabName, event) {
                // Call original switch tab logic
                originalSwitchTab(tabName, event);
                
                // If switching to output, apply our fixed version
                if (tabName === 'output') {
                    setTimeout(() => {
                        loadTemplateOutputsFixed();
                    }, 50);
                }
            };
        }
        
        console.log('✅ FINAL Output Tab Overrides Applied!');
        console.log('   ✓ Percentage displays removed');
        console.log('   ✓ Consistent dark theme maintained');
        console.log('   ✓ Bullet-point formatting enabled');
        
    }, 500); // Delay to ensure this loads after all other scripts
    
})();
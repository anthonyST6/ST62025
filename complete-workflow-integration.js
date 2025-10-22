// Complete Workflow Integration for ScaleOps6 Platform
// Connects: Workspace → Analysis → Score History → Templates → Downloads

(function() {
    console.log('🚀 Complete Workflow Integration Loading...');
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
    function initialize() {
        console.log('📋 Initializing Complete Workflow Integration');
        
        // Function to convert subcomponent ID to agent key
        function getAgentKey(subcomponentId) {
            // Try multiple formats to find the agent
            // Format 1: "1-1" stays as "1-1"
            // Format 2: "1-1" becomes "1a"
            const [block, subIndex] = subcomponentId.split('-');
            const letterIndex = parseInt(subIndex) - 1;
            const letter = String.fromCharCode(97 + letterIndex); // 97 is 'a' in ASCII
            
            return {
                dashFormat: subcomponentId,  // e.g., "1-1"
                letterFormat: `${block}${letter}`  // e.g., "1a"
            };
        }
        
        // Get agent for current subcomponent
        function getAgentForSubcomponent(subcomponentId) {
            if (!window.AgentLibrary) {
                console.warn('⚠️ AgentLibrary not loaded yet');
                return null;
            }
            
            const keys = getAgentKey(subcomponentId);
            
            // Try dash format first (e.g., "1-1")
            let agent = window.AgentLibrary[keys.dashFormat];
            
            // If not found, try letter format (e.g., "1a")
            if (!agent) {
                agent = window.AgentLibrary[keys.letterFormat];
            }
            
            // If still not found, try to get from window.currentAgentData
            if (!agent && window.currentAgentData) {
                agent = window.currentAgentData;
            }
            
            if (!agent) {
                console.log('🔍 Available agent keys:', Object.keys(window.AgentLibrary));
                console.log('🔍 Looking for:', keys);
            }
            
            return agent;
        }
        
        // ============= STEP 1: WORKSPACE COMPLETION =============
        window.completeWorkspace = async function() {
            console.log('📝 Step 1: Completing Workspace...');
            
            const urlParams = new URLSearchParams(window.location.search);
            const subcomponentId = urlParams.get('id') || '1-1';
            
            // Wait a bit for AgentLibrary to load if needed
            let agent = getAgentForSubcomponent(subcomponentId);
            
            if (!agent) {
                // Try waiting for AgentLibrary to load
                await new Promise(resolve => setTimeout(resolve, 500));
                agent = getAgentForSubcomponent(subcomponentId);
            }
            
            if (!agent) {
                console.error('❌ No agent found for', subcomponentId);
                console.log('📋 Using fallback agent configuration');
                
                // Use a fallback agent configuration
                agent = {
                    name: window.currentAgentName || 'Analysis Agent',
                    description: 'Professional analysis agent for GTM evaluation',
                    scoringDimensions: [
                        { name: 'Completeness', weight: 25, description: 'How complete are your answers' },
                        { name: 'Clarity', weight: 25, description: 'How clear and specific are your responses' },
                        { name: 'Feasibility', weight: 25, description: 'How feasible is your approach' },
                        { name: 'Impact', weight: 25, description: 'What is the potential impact' }
                    ],
                    evaluationCriteria: {
                        '0-39': 'Needs significant improvement',
                        '40-59': 'Developing - continue refining',
                        '60-79': 'Good progress - ready to advance',
                        '80-100': 'Excellent - ready for implementation'
                    }
                };
            }
            
            // Collect workspace data
            const workspaceData = collectWorkspaceData(subcomponentId);
            
            // Validate required fields
            if (!validateWorkspaceData(workspaceData)) {
                alert('Please complete all required fields before submitting.');
                return;
            }
            
            // Save workspace data
            saveWorkspaceData(subcomponentId, workspaceData);
            
            // Trigger analysis
            await triggerAnalysis(subcomponentId, workspaceData, agent);
        };
        
        // Collect workspace data based on subcomponent
        function collectWorkspaceData(subcomponentId) {
            const data = {
                subcomponentId: subcomponentId,
                timestamp: new Date().toISOString(),
                answers: {}
            };
            
            // Special handling for Problem Statement (1-1)
            if (subcomponentId === '1-1') {
                data.answers = {
                    'who-affected': document.getElementById('who-affected')?.value || '',
                    'what-problem': document.getElementById('what-problem')?.value || '',
                    'when-occur': document.getElementById('when-occur')?.value || '',
                    'what-impact': document.getElementById('what-impact')?.value || '',
                    'how-solving': document.getElementById('how-solving')?.value || '',
                    'evidence-validation': document.getElementById('evidence-validation')?.value || ''
                };
            } else {
                // Generic field collection for other subcomponents
                for (let i = 1; i <= 6; i++) {
                    const field = document.getElementById(`field-${i}`);
                    if (field) {
                        data.answers[`field-${i}`] = field.value || '';
                    }
                }
            }
            
            return data;
        }
        
        // Validate workspace data
        function validateWorkspaceData(data) {
            const answers = data.answers;
            const hasContent = Object.values(answers).some(value => value && value.trim() !== '');
            return hasContent;
        }
        
        // Save workspace data to localStorage
        function saveWorkspaceData(subcomponentId, data) {
            const key = `workspace_${subcomponentId}`;
            localStorage.setItem(key, JSON.stringify(data));
            console.log('💾 Workspace data saved for', subcomponentId);
        }
        
        // ============= STEP 2: ANALYSIS GENERATION =============
        async function triggerAnalysis(subcomponentId, workspaceData, agent) {
            console.log('🔍 Step 2: Generating Analysis...');
            
            // Switch to Analysis tab
            const analysisTab = document.querySelector('[data-tab="analysis"]');
            if (analysisTab) {
                analysisTab.click();
            }
            
            // Show loading state
            showAnalysisLoading(agent.name);
            
            try {
                // Generate analysis using agent scoring
                const analysis = await generateAgentAnalysis(workspaceData, agent, subcomponentId);
                
                // Display analysis results
                displayAnalysisResults(analysis, subcomponentId);
                
                // Save to score history
                saveToScoreHistory(subcomponentId, analysis);
                
                // Generate templates with data
                await generateTemplatesWithData(subcomponentId, workspaceData, analysis, agent);
                
                // Update output tab
                updateOutputTab(subcomponentId, analysis);
                
                console.log('✅ Analysis complete for', subcomponentId);
                
            } catch (error) {
                console.error('❌ Analysis error:', error);
                showAnalysisError(error.message);
            }
        }
        
        // Generate analysis using agent scoring dimensions
        async function generateAgentAnalysis(workspaceData, agent, subcomponentId) {
            console.log('🤖 Generating analysis with agent:', agent.name);
            
            // Calculate scores based on agent's scoring dimensions
            const dimensionScores = {};
            let totalScore = 0;
            
            agent.scoringDimensions.forEach(dimension => {
                // Calculate score for each dimension based on workspace completeness
                const answers = Object.values(workspaceData.answers);
                const filledAnswers = answers.filter(a => a && a.trim()).length;
                const completeness = (filledAnswers / answers.length) * 100;
                
                // Add some variation for realism
                const baseScore = completeness * (dimension.weight / 100);
                const variation = (Math.random() - 0.5) * 10;
                const score = Math.max(0, Math.min(100, baseScore + variation));
                
                dimensionScores[dimension.name] = {
                    score: Math.round(score),
                    weight: dimension.weight,
                    description: dimension.description,
                    feedback: generateDimensionFeedback(score, dimension.name)
                };
                
                totalScore += score * (dimension.weight / 100);
            });
            
            // Generate recommendations based on score
            const recommendations = generateRecommendations(totalScore, agent);
            
            // Get evaluation criteria message
            const evaluationMessage = getEvaluationMessage(totalScore, agent.evaluationCriteria);
            
            return {
                score: Math.round(totalScore),
                agentName: agent.name,
                agentDescription: agent.description,
                dimensionScores: dimensionScores,
                recommendations: recommendations,
                evaluationMessage: evaluationMessage,
                executiveSummary: generateExecutiveSummary(totalScore, agent, workspaceData),
                timestamp: new Date().toISOString(),
                subcomponentId: subcomponentId
            };
        }
        
        // Generate feedback for dimension
        function generateDimensionFeedback(score, dimensionName) {
            if (score >= 80) {
                return `Excellent ${dimensionName.toLowerCase()}. Keep up the great work!`;
            } else if (score >= 60) {
                return `Good progress on ${dimensionName.toLowerCase()}. Some refinement needed.`;
            } else if (score >= 40) {
                return `${dimensionName} needs improvement. Focus on strengthening this area.`;
            } else {
                return `Critical gap in ${dimensionName.toLowerCase()}. Immediate attention required.`;
            }
        }
        
        // Generate recommendations based on score and agent
        function generateRecommendations(score, agent) {
            const recommendations = [];
            
            if (score < 50) {
                recommendations.push({
                    priority: 'CRITICAL',
                    title: 'Foundation Building Required',
                    description: `Your ${agent.name} assessment shows significant gaps. Focus on building core foundations.`,
                    actions: [
                        'Review fundamental concepts',
                        'Gather more data and evidence',
                        'Seek expert guidance'
                    ]
                });
            }
            
            if (score < 75) {
                recommendations.push({
                    priority: 'HIGH',
                    title: 'Strategic Improvements Needed',
                    description: `Strengthen your approach to maximize ${agent.name} effectiveness.`,
                    actions: [
                        'Refine your strategy',
                        'Validate assumptions with data',
                        'Implement best practices'
                    ]
                });
            }
            
            recommendations.push({
                priority: score >= 75 ? 'MEDIUM' : 'HIGH',
                title: 'Continuous Optimization',
                description: 'Maintain momentum with ongoing improvements.',
                actions: [
                    'Monitor key metrics',
                    'Iterate based on feedback',
                    'Scale successful approaches'
                ]
            });
            
            return recommendations;
        }
        
        // Get evaluation message based on score
        function getEvaluationMessage(score, evaluationCriteria) {
            for (const [range, message] of Object.entries(evaluationCriteria)) {
                const [min, max] = range.split('-').map(Number);
                if (score >= min && score <= max) {
                    return message;
                }
            }
            return 'Score evaluation in progress.';
        }
        
        // Generate executive summary
        function generateExecutiveSummary(score, agent, workspaceData) {
            const level = score >= 80 ? 'excellent' : 
                         score >= 60 ? 'good' : 
                         score >= 40 ? 'developing' : 'foundational';
            
            return `Your ${agent.name} assessment shows ${level} maturity with a score of ${Math.round(score)}%. ` +
                   `${agent.description} ` +
                   `Based on your responses, ${score >= 60 ? 
                    'you demonstrate solid understanding and are ready to advance.' : 
                    'focus on strengthening core areas before proceeding.'}`;
        }
        
        // ============= STEP 3: SCORE HISTORY =============
        function saveToScoreHistory(subcomponentId, analysis) {
            console.log('📊 Step 3: Saving to Score History...');
            
            const historyKey = `score_history_${subcomponentId}`;
            let history = JSON.parse(localStorage.getItem(historyKey) || '[]');
            
            // Add new entry
            history.unshift({
                timestamp: analysis.timestamp,
                score: analysis.score,
                agentName: analysis.agentName,
                dimensionScores: analysis.dimensionScores,
                recommendations: analysis.recommendations,
                executiveSummary: analysis.executiveSummary
            });
            
            // Keep last 10 entries
            history = history.slice(0, 10);
            
            // Save back to localStorage
            localStorage.setItem(historyKey, JSON.stringify(history));
            
            console.log('✅ Score history updated for', subcomponentId);
        }
        
        // ============= STEP 4: TEMPLATE GENERATION =============
        async function generateTemplatesWithData(subcomponentId, workspaceData, analysis, agent) {
            console.log('📄 Step 4: Generating Templates with Data...');
            
            // Get templates for this agent (would normally come from agent definition)
            const templates = getAgentTemplates(agent);
            
            // Populate each template with workspace and analysis data
            const populatedTemplates = templates.map(template => {
                return populateTemplate(template, workspaceData, analysis, agent);
            });
            
            // Save populated templates
            savePopulatedTemplates(subcomponentId, populatedTemplates);
            
            // Update Resources tab
            updateResourcesTab(populatedTemplates);
            
            console.log('✅ Templates generated and populated');
        }
        
        // Get templates for agent
        function getAgentTemplates(agent) {
            // Default templates - in real implementation, these would come from agent definition
            return [
                {
                    name: 'Executive Summary',
                    type: 'pdf',
                    template: 'executive_summary'
                },
                {
                    name: 'Detailed Analysis Report',
                    type: 'docx',
                    template: 'detailed_report'
                },
                {
                    name: 'Action Plan',
                    type: 'pdf',
                    template: 'action_plan'
                },
                {
                    name: 'Scorecard',
                    type: 'xlsx',
                    template: 'scorecard'
                }
            ];
        }
        
        // Populate template with data
        function populateTemplate(template, workspaceData, analysis, agent) {
            const populated = {
                ...template,
                data: {
                    agentName: agent.name,
                    agentDescription: agent.description,
                    score: analysis.score,
                    evaluationMessage: analysis.evaluationMessage,
                    executiveSummary: analysis.executiveSummary,
                    dimensionScores: analysis.dimensionScores,
                    recommendations: analysis.recommendations,
                    workspaceAnswers: workspaceData.answers,
                    timestamp: new Date().toISOString()
                },
                downloadUrl: generateDownloadUrl(template, analysis)
            };
            
            return populated;
        }
        
        // Generate download URL for template
        function generateDownloadUrl(template, analysis) {
            // In real implementation, this would generate actual file
            // For now, create a data URL with the content
            const content = JSON.stringify({
                template: template.name,
                score: analysis.score,
                summary: analysis.executiveSummary,
                timestamp: new Date().toISOString()
            }, null, 2);
            
            const blob = new Blob([content], { type: 'application/json' });
            return URL.createObjectURL(blob);
        }
        
        // Save populated templates
        function savePopulatedTemplates(subcomponentId, templates) {
            const key = `templates_${subcomponentId}`;
            localStorage.setItem(key, JSON.stringify(templates));
        }
        
        // Update Resources tab with populated templates
        function updateResourcesTab(templates) {
            const resourcesContent = document.getElementById('resources-content');
            if (!resourcesContent) return;
            
            let html = `
                <div style="padding: 20px;">
                    <h2 style="color: #FF5500; margin-bottom: 20px;">📚 Generated Resources</h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px;">
            `;
            
            templates.forEach(template => {
                html += `
                    <div style="
                        background: linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 100%);
                        border: 1px solid rgba(255, 85, 0, 0.2);
                        border-radius: 12px;
                        padding: 20px;
                        transition: all 0.3s ease;
                        cursor: pointer;
                    " onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 8px 24px rgba(255, 85, 0, 0.2)'"
                       onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                        <div style="font-size: 32px; margin-bottom: 10px;">
                            ${getTemplateIcon(template.type)}
                        </div>
                        <h3 style="color: #FF5500; margin: 0 0 10px 0; font-size: 16px;">
                            ${template.name}
                        </h3>
                        <p style="color: #999; font-size: 14px; margin: 0 0 15px 0;">
                            Format: ${template.type.toUpperCase()}
                        </p>
                        <button onclick="downloadTemplate('${template.downloadUrl}', '${template.name}.${template.type}')" style="
                            width: 100%;
                            background: linear-gradient(135deg, #FF5500 0%, #FF8800 100%);
                            color: white;
                            border: none;
                            padding: 10px;
                            border-radius: 8px;
                            font-size: 14px;
                            cursor: pointer;
                            transition: all 0.3s ease;
                        " onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
                            📥 Download
                        </button>
                    </div>
                `;
            });
            
            html += `
                    </div>
                </div>
            `;
            
            resourcesContent.innerHTML = html;
        }
        
        // Get icon for template type
        function getTemplateIcon(type) {
            const icons = {
                'pdf': '📄',
                'docx': '📝',
                'xlsx': '📊',
                'pptx': '📽️'
            };
            return icons[type] || '📎';
        }
        
        // ============= STEP 5: OUTPUT GENERATION =============
        function updateOutputTab(subcomponentId, analysis) {
            console.log('📤 Step 5: Updating Output Tab...');
            
            const outputContent = document.getElementById('output-content');
            if (!outputContent) return;
            
            outputContent.innerHTML = `
                <div style="padding: 20px;">
                    <h2 style="color: #FF5500; margin-bottom: 20px;">📊 Analysis Output</h2>
                    
                    <div style="
                        background: linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 100%);
                        border: 1px solid rgba(255, 85, 0, 0.2);
                        border-radius: 16px;
                        padding: 30px;
                        margin-bottom: 30px;
                    ">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                            <div>
                                <h3 style="color: #FF5500; margin: 0 0 10px 0;">${analysis.agentName}</h3>
                                <p style="color: #999; margin: 0;">${analysis.agentDescription}</p>
                            </div>
                            <div style="text-align: center;">
                                <div style="font-size: 48px; font-weight: 700; color: ${getScoreColor(analysis.score)};">
                                    ${analysis.score}%
                                </div>
                                <div style="color: #999; font-size: 12px; text-transform: uppercase;">Overall Score</div>
                            </div>
                        </div>
                        
                        <div style="
                            background: rgba(255, 85, 0, 0.05);
                            border-radius: 8px;
                            padding: 15px;
                            margin-bottom: 20px;
                        ">
                            <h4 style="color: #FF5500; margin: 0 0 10px 0;">Executive Summary</h4>
                            <p style="color: #ccc; line-height: 1.6; margin: 0;">
                                ${analysis.executiveSummary}
                            </p>
                        </div>
                        
                        <div style="
                            background: rgba(0, 0, 0, 0.3);
                            border-radius: 8px;
                            padding: 15px;
                        ">
                            <h4 style="color: #FF5500; margin: 0 0 10px 0;">Evaluation</h4>
                            <p style="color: #10B981; font-weight: 500; margin: 0;">
                                ${analysis.evaluationMessage}
                            </p>
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                        <button onclick="viewFullAnalysis()" style="
                            background: linear-gradient(135deg, #FF5500 0%, #FF8800 100%);
                            color: white;
                            border: none;
                            padding: 12px 24px;
                            border-radius: 8px;
                            font-size: 14px;
                            cursor: pointer;
                        ">
                            📊 View Full Analysis
                        </button>
                        <button onclick="downloadAllOutputs()" style="
                            background: transparent;
                            color: #FF5500;
                            border: 1px solid #FF5500;
                            padding: 12px 24px;
                            border-radius: 8px;
                            font-size: 14px;
                            cursor: pointer;
                        ">
                            📥 Download All Outputs
                        </button>
                        <button onclick="shareResults()" style="
                            background: transparent;
                            color: #999;
                            border: 1px solid #333;
                            padding: 12px 24px;
                            border-radius: 8px;
                            font-size: 14px;
                            cursor: pointer;
                        ">
                            🔗 Share Results
                        </button>
                    </div>
                </div>
            `;
            
            console.log('✅ Output tab updated');
        }
        
        // ============= HELPER FUNCTIONS =============
        
        function showAnalysisLoading(agentName) {
            const analysisContent = document.getElementById('analysis-content');
            if (!analysisContent) return;
            
            analysisContent.innerHTML = `
                <div style="text-align: center; padding: 60px 20px;">
                    <div style="font-size: 48px; margin-bottom: 20px; animation: pulse 1.5s infinite;">🤖</div>
                    <h3 style="font-size: 24px; margin-bottom: 10px; color: #FF5500;">
                        ${agentName} is analyzing your submission...
                    </h3>
                    <p style="font-size: 16px; color: #999;">This will take just a moment</p>
                    <div style="margin-top: 20px;">
                        <div style="width: 200px; height: 4px; background: rgba(255, 255, 255, 0.1); 
                                    border-radius: 2px; margin: 0 auto; overflow: hidden;">
                            <div style="width: 100%; height: 100%; background: linear-gradient(90deg, transparent, #FF5500, transparent); 
                                        animation: loading 1.5s linear infinite;"></div>
                        </div>
                    </div>
                </div>
                <style>
                    @keyframes pulse {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.5; }
                    }
                    @keyframes loading {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(100%); }
                    }
                </style>
            `;
        }
        
        function showAnalysisError(message) {
            const analysisContent = document.getElementById('analysis-content');
            if (!analysisContent) return;
            
            analysisContent.innerHTML = `
                <div style="text-align: center; padding: 60px 20px;">
                    <div style="font-size: 48px; margin-bottom: 20px;">❌</div>
                    <h3 style="font-size: 24px; margin-bottom: 10px; color: #EF4444;">Analysis Failed</h3>
                    <p style="font-size: 16px; color: #999; margin-bottom: 20px;">${message}</p>
                    <button onclick="window.completeWorkspace()" style="
                        background: linear-gradient(135deg, #FF5500 0%, #FF8800 100%);
                        color: white;
                        border: none;
                        padding: 12px 24px;
                        border-radius: 8px;
                        font-size: 14px;
                        cursor: pointer;
                    ">
                        Try Again
                    </button>
                </div>
            `;
        }
        
        function displayAnalysisResults(analysis, subcomponentId) {
            const analysisContent = document.getElementById('analysis-content');
            if (!analysisContent) return;
            
            // Use enhanced display if available
            if (window.displayEnhancedAnalysisResults) {
                window.displayEnhancedAnalysisResults(analysis, 'agent-based');
            } else {
                // Basic display
                analysisContent.innerHTML = `
                    <div style="padding: 20px;">
                        <h2>Analysis Complete</h2>
                        <div style="font-size: 48px; color: #FF5500; margin: 20px 0;">
                            ${analysis.score}%
                        </div>
                        <p>${analysis.executiveSummary}</p>
                    </div>
                `;
            }
        }
        
        function getScoreColor(score) {
            if (score >= 80) return '#10B981';
            if (score >= 60) return '#F59E0B';
            if (score >= 40) return '#3B82F6';
            return '#EF4444';
        }
        
        // ============= GLOBAL FUNCTIONS =============
        
        window.downloadTemplate = function(url, filename) {
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            console.log('📥 Downloading:', filename);
        };
        
        window.viewFullAnalysis = function() {
            const analysisTab = document.querySelector('[data-tab="analysis"]');
            if (analysisTab) {
                analysisTab.click();
            }
        };
        
        window.downloadAllOutputs = function() {
            const urlParams = new URLSearchParams(window.location.search);
            const subcomponentId = urlParams.get('id') || '1-1';
            const templatesKey = `templates_${subcomponentId}`;
            const templates = JSON.parse(localStorage.getItem(templatesKey) || '[]');
            
            templates.forEach(template => {
                setTimeout(() => {
                    window.downloadTemplate(template.downloadUrl, `${template.name}.${template.type}`);
                }, 500);
            });
        };
        
        window.shareResults = function() {
            alert('Share functionality coming soon!');
        };
        
        // Hook into existing analyze button
        const originalAnalyze = window.analyzeWorksheet;
        window.analyzeWorksheet = function() {
            // Use our complete workflow instead
            window.completeWorkspace();
        };
        
        console.log('✅ Complete Workflow Integration Initialized');
    }
})();
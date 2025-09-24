// Static Worksheet Display Module
// Displays predefined questions for each subcomponent without personalization

class StaticWorksheetDisplay {
    constructor() {
        this.name = "Static Worksheet Display";
        this.version = "1.0.0";
        
        // Questions for each subcomponent (from agent factory)
        this.worksheetQuestions = {
            // Block 1: Mission Discovery
            '1-1': [
                {
                    label: 'WHO IS AFFECTED? (CUSTOMER PERSONA)',
                    placeholder: 'e.g., B2B SaaS founders with 10-50 employees',
                    type: 'text'
                },
                {
                    label: 'WHAT IS THE PROBLEM?',
                    placeholder: 'Describe the specific problem in 2-3 sentences...',
                    type: 'textarea'
                },
                {
                    label: 'WHEN DOES IT OCCUR? (CONTEXT)',
                    placeholder: 'e.g., During quarterly planning when trying to align teams',
                    type: 'text'
                },
                {
                    label: 'WHAT IS THE IMPACT? (METRICS)',
                    placeholder: 'e.g., 20 hours/month wasted, $50K in lost productivity, 30% project delays',
                    type: 'textarea'
                },
                {
                    label: 'HOW ARE THEY SOLVING IT TODAY?',
                    placeholder: 'Describe current alternatives and their shortcomings...',
                    type: 'textarea'
                },
                {
                    label: 'EVIDENCE & VALIDATION',
                    placeholder: 'Customer quotes, data points, research findings...',
                    type: 'textarea'
                }
            ],
            
            '1-2': [
                {
                    label: 'VISION CLARITY CHALLENGES',
                    placeholder: 'What specific challenges are you experiencing with vision clarity and how do they impact your operations? Describe specific pain points, bottlenecks, or inefficiencies. Include frequency and impact.',
                    type: 'textarea'
                },
                {
                    label: 'VALUE PROPOSITION METRICS',
                    placeholder: 'What metrics do you currently track for value proposition effectiveness and what are your target benchmarks? Provide specific numbers, percentages, or measurable outcomes. Include current vs. target state.',
                    type: 'textarea'
                },
                {
                    label: 'DIFFERENTIATION STRATEGY',
                    placeholder: 'How does your approach to differentiation align with your overall business strategy? Explain how differentiation connects to your broader business objectives and long-term vision.',
                    type: 'textarea'
                },
                {
                    label: 'STAKEHOLDER ALIGNMENT EVIDENCE',
                    placeholder: 'What evidence or data supports your stakeholder alignment implementation or approach? Share concrete examples, case studies, or data points that demonstrate effectiveness.',
                    type: 'textarea'
                },
                {
                    label: 'INDUSTRY COMPARISON',
                    placeholder: 'How does your mission statement compare to industry best practices or competitors? Compare your approach with industry standards, competitors, or best practices.',
                    type: 'textarea'
                },
                {
                    label: 'MISSION ALIGNMENT PROCESSES',
                    placeholder: 'What processes do you have in place to ensure mission alignment across all teams? Describe your communication, training, and reinforcement mechanisms.',
                    type: 'textarea'
                }
            ],
            
            '1-3': [
                {
                    label: 'CUSTOMER FEEDBACK CHALLENGES',
                    placeholder: 'What specific challenges are you experiencing with customer feedback loops and how do they impact your operations? Describe pain points in collecting, analyzing, and acting on feedback.',
                    type: 'textarea'
                },
                {
                    label: 'SATISFACTION & ENGAGEMENT METRICS',
                    placeholder: 'What metrics do you currently track for customer satisfaction and engagement, and what are your target benchmarks? Provide NPS scores, CSAT ratings, response rates.',
                    type: 'textarea'
                },
                {
                    label: 'PAIN POINT STRATEGY',
                    placeholder: 'How does your approach to pain point identification align with your product development strategy? Explain how pain points drive your roadmap.',
                    type: 'textarea'
                },
                {
                    label: 'INSIGHT VALIDATION',
                    placeholder: 'What evidence validates that you are capturing the right customer insights? Share examples of insights that led to successful changes.',
                    type: 'textarea'
                },
                {
                    label: 'ENGAGEMENT FREQUENCY',
                    placeholder: 'How frequently do you engage with customers and through which channels? Detail your interview cadence, survey frequency, and channel mix.',
                    type: 'textarea'
                },
                {
                    label: 'FEEDBACK TRANSLATION SYSTEMS',
                    placeholder: 'What systems do you have to translate customer feedback into actionable insights? Describe your process for analyzing and implementing feedback.',
                    type: 'textarea'
                }
            ],
            
            '1-4': [
                {
                    label: 'TEAM SKILL GAPS',
                    placeholder: 'What specific skill gaps have you identified in your team and how do they impact execution? List technical, operational, or leadership gaps and their business impact.',
                    type: 'textarea'
                },
                {
                    label: 'PERFORMANCE METRICS',
                    placeholder: 'What performance metrics do you track for team productivity and what are your benchmarks? Provide KPIs like velocity, output quality, or efficiency metrics.',
                    type: 'textarea'
                },
                {
                    label: 'GTM ALIGNMENT',
                    placeholder: 'How does your team structure and capability align with your go-to-market strategy? Explain how team composition supports your GTM objectives.',
                    type: 'textarea'
                },
                {
                    label: 'CAPABILITY EVIDENCE',
                    placeholder: 'What evidence shows your team is capable of executing your vision? Share past achievements, credentials, or performance data.',
                    type: 'textarea'
                },
                {
                    label: 'ROLE CLARITY PROCESS',
                    placeholder: 'How do you assess and develop role clarity within your team? Describe your process for defining responsibilities and ensuring alignment.',
                    type: 'textarea'
                },
                {
                    label: 'DEVELOPMENT PROGRAMS',
                    placeholder: 'What development programs or initiatives address identified skill gaps? Detail training, mentoring, or hiring plans to close capability gaps.',
                    type: 'textarea'
                }
            ],
            
            '1-5': [
                {
                    label: 'COMPETITIVE POSITIONING CHALLENGES',
                    placeholder: 'What specific challenges do you face in competitive positioning and market differentiation? Describe how you struggle to stand out or compete for customers.',
                    type: 'textarea'
                },
                {
                    label: 'MARKET SHARE & GROWTH METRICS',
                    placeholder: 'What market share or growth metrics do you track and what are your targets? Provide TAM, SAM, SOM figures, growth rates, or market penetration percentages.',
                    type: 'textarea'
                },
                {
                    label: 'MARKET ANALYSIS STRATEGY',
                    placeholder: 'How does your market analysis inform your strategic priorities and resource allocation? Explain how market insights drive product, sales, and marketing decisions.',
                    type: 'textarea'
                },
                {
                    label: 'MARKET OPPORTUNITY VALIDATION',
                    placeholder: 'What evidence validates your market opportunity and timing? Share market research, analyst reports, or customer data supporting your thesis.',
                    type: 'textarea'
                },
                {
                    label: 'COMPETITIVE THREAT RESPONSE',
                    placeholder: 'How do you monitor and respond to competitive threats? Describe your competitive intelligence gathering and response strategies.',
                    type: 'textarea'
                },
                {
                    label: 'MARKET TRENDS & OPPORTUNITIES',
                    placeholder: 'What market trends or shifts represent your biggest opportunities or risks? Identify key market dynamics and how you plan to capitalize or mitigate.',
                    type: 'textarea'
                }
            ],
            
            '1-6': [
                {
                    label: 'GTM PREPARATION GAPS',
                    placeholder: 'What specific gaps exist in your go-to-market preparation and launch planning? Identify missing elements in product readiness, sales enablement, or marketing preparation.',
                    type: 'textarea'
                },
                {
                    label: 'LAUNCH SUCCESS METRICS',
                    placeholder: 'What success metrics and milestones have you defined for your launch? Provide specific targets for adoption, revenue, or engagement within defined timeframes.',
                    type: 'textarea'
                },
                {
                    label: 'LAUNCH STRATEGY ALIGNMENT',
                    placeholder: 'How does your launch strategy align with your overall business objectives? Explain how launch goals support funding, growth, or market positioning objectives.',
                    type: 'textarea'
                },
                {
                    label: 'BETA TESTING VALIDATION',
                    placeholder: 'What evidence from beta testing or pilots validates your launch readiness? Share feedback, metrics, or learnings from pre-launch testing.',
                    type: 'textarea'
                },
                {
                    label: 'RESOURCE ALLOCATION',
                    placeholder: 'How have you allocated resources across different launch activities? Detail budget, team, and time allocation across product, sales, and marketing.',
                    type: 'textarea'
                },
                {
                    label: 'RISK MITIGATION PLANS',
                    placeholder: 'What risk mitigation plans do you have for potential launch challenges? Describe contingency plans for technical issues, market response, or competitive reactions.',
                    type: 'textarea'
                }
            ],
            
            // Block 2: Customer Insights
            '2-1': [
                {
                    label: 'INTERVIEW SCHEDULING CHALLENGES',
                    placeholder: 'What challenges do you face in maintaining consistent customer interview schedules? Describe scheduling conflicts, resource constraints, or engagement difficulties.',
                    type: 'textarea'
                },
                {
                    label: 'MONTHLY INTERVIEW METRICS',
                    placeholder: 'How many customer interviews do you conduct monthly and what is your target frequency? Provide specific numbers of interviews, coverage across segments, and goals.',
                    type: 'textarea'
                },
                {
                    label: 'INTERVIEW CADENCE STRATEGY',
                    placeholder: 'How does your interview cadence support your product development cycle? Explain how interview timing aligns with sprint planning and feature releases.',
                    type: 'textarea'
                },
                {
                    label: 'ACTIONABLE INSIGHTS EVIDENCE',
                    placeholder: 'What evidence shows your interview frequency yields actionable insights? Share examples of insights gained and decisions influenced by interviews.',
                    type: 'textarea'
                },
                {
                    label: 'STAKEHOLDER COVERAGE',
                    placeholder: 'How do you ensure stakeholder coverage across different user personas? Describe your approach to interviewing diverse user types and decision makers.',
                    type: 'textarea'
                },
                {
                    label: 'INSIGHT SYNTHESIS SYSTEMS',
                    placeholder: 'What systems do you use to track and synthesize interview insights? Detail tools and processes for recording, analyzing, and sharing learnings.',
                    type: 'textarea'
                }
            ],
            
            '2-2': [
                {
                    label: 'PERSONA DEFINITION GAPS',
                    placeholder: 'What gaps exist in your current persona definitions and behavioral understanding? Identify missing demographic, psychographic, or behavioral data in personas.',
                    type: 'textarea'
                },
                {
                    label: 'PERSONA VALIDATION METRICS',
                    placeholder: 'How many distinct personas have you validated and what percentage of revenue do they represent? Provide number of personas, validation methods, and revenue attribution.',
                    type: 'textarea'
                },
                {
                    label: 'PERSONA-DRIVEN STRATEGY',
                    placeholder: 'How do your personas inform product, marketing, and sales strategies? Explain how personas drive messaging, feature prioritization, and go-to-market.',
                    type: 'textarea'
                },
                {
                    label: 'BEHAVIORAL DATA VALIDATION',
                    placeholder: 'What behavioral data validates your persona assumptions? Share usage patterns, conversion data, or research supporting personas.',
                    type: 'textarea'
                },
                {
                    label: 'DECISION DRIVER MAPPING',
                    placeholder: 'How do you map decision drivers and buying criteria for each persona? Detail how different personas evaluate and purchase your solution.',
                    type: 'textarea'
                },
                {
                    label: 'PERSONA USE CASES',
                    placeholder: 'What use cases are most relevant to each persona? Map specific problems and solutions to each persona type.',
                    type: 'textarea'
                }
            ],
            
            // Add more blocks as needed...
            // For now, I'll add a default set for any undefined subcomponent
            'default': [
                {
                    label: 'KEY OBJECTIVE',
                    placeholder: 'What is your primary objective for this area?',
                    type: 'textarea'
                },
                {
                    label: 'CURRENT STATE',
                    placeholder: 'Describe the current state of this area in your organization.',
                    type: 'textarea'
                },
                {
                    label: 'DESIRED OUTCOME',
                    placeholder: 'What does success look like in this area?',
                    type: 'textarea'
                },
                {
                    label: 'METRICS & MEASUREMENT',
                    placeholder: 'How will you measure progress and success?',
                    type: 'textarea'
                },
                {
                    label: 'ACTION PLAN',
                    placeholder: 'What are your next steps to improve this area?',
                    type: 'textarea'
                }
            ]
        };
    }
    
    /**
     * Initialize the worksheet display for a subcomponent
     */
    initialize(subcomponentId) {
        console.log(`📝 Initializing static worksheet for subcomponent: ${subcomponentId}`);
        
        // IMPORTANT: Skip static worksheet for Problem Statement (1-1)
        // Problem Statement should use its original implementation
        if (subcomponentId === '1-1') {
            console.log('⚠️ Skipping static worksheet for Problem Statement (1-1) - using original implementation');
            return;
        }
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initialize(subcomponentId));
            return;
        }
        
        // Find the workspace container
        const container = document.getElementById('dynamic-worksheet-container');
        if (!container) {
            console.error('Worksheet container not found');
            return;
        }
        
        // Display the worksheet
        this.displayWorksheet(container, subcomponentId);
        
        // Set up tab listeners to load analysis when Analysis tab is clicked
        this.setupTabListeners(subcomponentId);
    }
    
    /**
     * Set up tab listeners
     */
    setupTabListeners(subcomponentId) {
        const analysisTab = document.querySelector('[data-tab="analysis"]');
        if (analysisTab) {
            analysisTab.addEventListener('click', () => {
                // Small delay to ensure tab content is visible
                setTimeout(() => {
                    this.loadSavedAnalysis(subcomponentId);
                }, 100);
            });
        }
    }
    
    /**
     * Load saved analysis results
     */
    loadSavedAnalysis(subcomponentId) {
        const saved = localStorage.getItem(`analysis_${subcomponentId}`);
        if (saved) {
            try {
                const analysisData = JSON.parse(saved);
                console.log(`📊 Loading saved analysis for ${subcomponentId}`);
                
                // Display the saved analysis
                this.displayAnalysisInTab(
                    subcomponentId,
                    analysisData.overallScore,
                    analysisData.completeness,
                    analysisData.avgQuality,
                    analysisData.responses
                );
            } catch (e) {
                console.error('Error loading saved analysis:', e);
                this.showEmptyAnalysisState();
            }
        } else {
            this.showEmptyAnalysisState();
        }
    }
    
    /**
     * Show empty analysis state
     */
    showEmptyAnalysisState() {
        const analysisContainer = document.getElementById('analysis-content') ||
                                 document.getElementById('analysis-tab');
        if (analysisContainer) {
            analysisContainer.innerHTML = `
                <div class="analysis-card" style="text-align: center; padding: 40px;">
                    <h3>No Analysis Available</h3>
                    <p style="color: #888; margin-top: 20px;">
                        Complete the worksheet in the Workspace tab and click "Analyze Results" to see your analysis.
                    </p>
                    <button onclick="document.querySelector('[data-tab=\\'workspace\\']').click()" style="
                        margin-top: 20px;
                        padding: 12px 24px;
                        background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%);
                        color: white;
                        border: none;
                        border-radius: 6px;
                        font-size: 1em;
                        font-weight: 600;
                        cursor: pointer;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    ">
                        Go to Workspace
                    </button>
                </div>
            `;
        }
    }
    
    /**
     * Display the worksheet questions
     */
    displayWorksheet(container, subcomponentId) {
        // Get questions for this subcomponent
        const questions = this.worksheetQuestions[subcomponentId] || this.worksheetQuestions['default'];
        
        console.log(`📋 Displaying ${questions.length} questions for subcomponent ${subcomponentId}`);
        
        // Build the HTML
        let html = `
            <div class="static-worksheet">
                <div class="worksheet-header">
                    <h3 style="color: #ff6b35; margin-bottom: 10px;">
                        📝 Interactive Worksheet
                    </h3>
                </div>
                
                <div class="worksheet-questions">
        `;
        
        // Add each question
        questions.forEach((question, index) => {
            const fieldId = `field_${subcomponentId}_${index}`;
            
            html += `
                <div class="worksheet-question" style="margin-bottom: 25px;">
                    <label for="${fieldId}" style="
                        display: block;
                        color: #ff6b35;
                        font-size: 0.9em;
                        font-weight: 600;
                        margin-bottom: 8px;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    ">
                        ${question.label}
                    </label>
            `;
            
            if (question.type === 'textarea') {
                html += `
                    <textarea 
                        id="${fieldId}"
                        placeholder="${question.placeholder}"
                        style="
                            width: 100%;
                            min-height: 100px;
                            padding: 12px;
                            background: #1e1e1e;
                            border: 1px solid #444;
                            border-radius: 6px;
                            color: #e0e0e0;
                            font-size: 1em;
                            resize: vertical;
                            font-family: inherit;
                        "
                        onchange="staticWorksheet.saveResponse('${subcomponentId}', ${index}, this.value)"
                    ></textarea>
                `;
            } else if (question.type === 'number') {
                html += `
                    <input 
                        type="number"
                        id="${fieldId}"
                        placeholder="${question.placeholder}"
                        style="
                            width: 100%;
                            padding: 12px;
                            background: #1e1e1e;
                            border: 1px solid #444;
                            border-radius: 6px;
                            color: #e0e0e0;
                            font-size: 1em;
                        "
                        onchange="staticWorksheet.saveResponse('${subcomponentId}', ${index}, this.value)"
                    />
                `;
            } else {
                html += `
                    <input 
                        type="text"
                        id="${fieldId}"
                        placeholder="${question.placeholder}"
                        style="
                            width: 100%;
                            padding: 12px;
                            background: #1e1e1e;
                            border: 1px solid #444;
                            border-radius: 6px;
                            color: #e0e0e0;
                            font-size: 1em;
                        "
                        onchange="staticWorksheet.saveResponse('${subcomponentId}', ${index}, this.value)"
                    />
                `;
            }
            
            html += `
                </div>
            `;
        });
        
        // Close the worksheet containers
        html += `
                </div>
            </div>
        `;
        
        // Insert the HTML
        container.innerHTML = html;
        
        // Load any saved responses
        this.loadSavedResponses(subcomponentId);
    }
    
    /**
     * Save a response
     */
    saveResponse(subcomponentId, questionIndex, value) {
        const key = `worksheet_${subcomponentId}`;
        let responses = {};
        
        // Get existing responses
        const saved = localStorage.getItem(key);
        if (saved) {
            try {
                responses = JSON.parse(saved);
            } catch (e) {
                console.error('Error parsing saved responses:', e);
            }
        }
        
        // Update the response
        responses[questionIndex] = value;
        
        // Save back to localStorage
        localStorage.setItem(key, JSON.stringify(responses));
        
        console.log(`💾 Saved response for question ${questionIndex} in ${subcomponentId}`);
    }
    
    /**
     * Load saved responses
     */
    loadSavedResponses(subcomponentId) {
        const key = `worksheet_${subcomponentId}`;
        const saved = localStorage.getItem(key);
        
        if (!saved) return;
        
        try {
            const responses = JSON.parse(saved);
            
            Object.keys(responses).forEach(questionIndex => {
                const fieldId = `field_${subcomponentId}_${questionIndex}`;
                const field = document.getElementById(fieldId);
                
                if (field) {
                    field.value = responses[questionIndex];
                }
            });
            
            console.log(`📂 Loaded saved responses for ${subcomponentId}`);
        } catch (e) {
            console.error('Error loading saved responses:', e);
        }
    }
    
    /**
     * Save all progress
     */
    saveProgress(subcomponentId) {
        const questions = this.worksheetQuestions[subcomponentId] || this.worksheetQuestions['default'];
        const responses = {};
        
        questions.forEach((question, index) => {
            const fieldId = `field_${subcomponentId}_${index}`;
            const field = document.getElementById(fieldId);
            
            if (field && field.value) {
                responses[index] = field.value;
            }
        });
        
        // Save to localStorage
        const key = `worksheet_${subcomponentId}`;
        localStorage.setItem(key, JSON.stringify(responses));
        
        // Show confirmation
        alert('Progress saved successfully!');
        
        console.log(`✅ Saved all progress for ${subcomponentId}`);
    }
    
    /**
     * Analyze responses and calculate score
     */
    analyzeResponses(subcomponentId) {
        const questions = this.worksheetQuestions[subcomponentId] || this.worksheetQuestions['default'];
        const responses = {};
        let filledCount = 0;
        let totalQuality = 0;
        
        questions.forEach((question, index) => {
            const fieldId = `field_${subcomponentId}_${index}`;
            const field = document.getElementById(fieldId);
            
            if (field && field.value) {
                responses[index] = field.value;
                filledCount++;
                
                // Calculate quality score for this response
                let quality = 0;
                const value = field.value;
                
                // Basic quality metrics
                if (value.length > 10) quality += 20;
                if (value.length > 50) quality += 20;
                if (value.length > 100) quality += 20;
                if (/\d+/.test(value)) quality += 20; // Contains numbers
                if (value.split(/[.!?]+/).length > 2) quality += 20; // Multiple sentences
                
                totalQuality += Math.min(100, quality);
            }
        });
        
        // Calculate overall score
        const completeness = (filledCount / questions.length) * 100;
        const avgQuality = filledCount > 0 ? totalQuality / filledCount : 0;
        const overallScore = Math.round((completeness * 0.4) + (avgQuality * 0.6));
        
        // Save the analysis results
        this.saveAnalysisResults(subcomponentId, overallScore, completeness, avgQuality, responses);
        
        // Switch to Analysis tab (following Problem Statement model)
        const analysisTab = document.querySelector('[data-tab="analysis"]');
        if (analysisTab) {
            analysisTab.click();
        } else {
            console.error('Analysis tab not found');
        }
        
        // Display results in the Analysis tab
        this.displayAnalysisInTab(subcomponentId, overallScore, completeness, avgQuality, responses);
    }
    
    /**
     * Save analysis results to localStorage
     */
    saveAnalysisResults(subcomponentId, overallScore, completeness, avgQuality, responses) {
        const analysisData = {
            overallScore,
            completeness,
            avgQuality,
            responses,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem(`analysis_${subcomponentId}`, JSON.stringify(analysisData));
        console.log(`💾 Saved analysis results for ${subcomponentId}`);
    }
    
    /**
     * Display analysis in the Analysis tab
     */
    displayAnalysisInTab(subcomponentId, overallScore, completeness, avgQuality, responses) {
        // Find the analysis tab content area - looking for the correct ID
        const analysisContainer = document.getElementById('analysis-content') ||
                                 document.getElementById('analysis-tab');
        if (!analysisContainer) {
            console.error('Analysis tab container not found');
            return;
        }
        
        let scoreColor = '#ff6464'; // Red
        let scoreMessage = 'Needs Significant Work';
        
        if (overallScore >= 80) {
            scoreColor = '#64c864'; // Green
            scoreMessage = 'Excellent Progress!';
        } else if (overallScore >= 60) {
            scoreColor = '#ffaa00'; // Yellow
            scoreMessage = 'Good Foundation';
        }
        
        // Build the analysis HTML (similar to Problem Statement)
        const html = `
            <div class="analysis-grid">
                <div class="analysis-card">
                    <h3>Worksheet Analysis Score</h3>
                    <div style="text-align: center; margin: 30px 0;">
                        <div style="
                            font-size: 4em;
                            font-weight: 700;
                            color: ${scoreColor};
                            margin-bottom: 10px;
                        ">
                            ${overallScore}%
                        </div>
                        <div style="
                            font-size: 1.3em;
                            color: #e0e0e0;
                        ">
                            ${scoreMessage}
                        </div>
                    </div>
                    
                    <div class="dimension">
                        <div class="dimension-header">
                            <span class="dimension-name">Completeness</span>
                            <span class="dimension-score">${Math.round(completeness)}%</span>
                        </div>
                        <div class="dimension-bar">
                            <div class="dimension-fill" style="width: ${completeness}%"></div>
                        </div>
                        <p class="dimension-desc">Percentage of questions answered</p>
                    </div>
                    
                    <div class="dimension">
                        <div class="dimension-header">
                            <span class="dimension-name">Response Quality</span>
                            <span class="dimension-score">${Math.round(avgQuality)}%</span>
                        </div>
                        <div class="dimension-bar">
                            <div class="dimension-fill" style="width: ${avgQuality}%"></div>
                        </div>
                        <p class="dimension-desc">Depth and detail of your responses</p>
                    </div>
                </div>
                
                <div class="analysis-card">
                    <h3>Key Findings</h3>
                    <div class="findings">
                        <h4 style="color: #4CAF50; margin-bottom: 1rem;">✅ Strengths</h4>
                        ${this.generateStrengths(overallScore, completeness, avgQuality)}
                        
                        <h4 style="color: #FF9800; margin: 1.5rem 0 1rem 0;">⚠️ Areas for Improvement</h4>
                        ${this.generateImprovements(overallScore, completeness, avgQuality)}
                        
                        <h4 style="color: #2196F3; margin: 1.5rem 0 1rem 0;">💡 Opportunities</h4>
                        ${this.generateOpportunities(overallScore, completeness, avgQuality)}
                    </div>
                </div>
                
                <div class="analysis-card">
                    <h3>Recommendations</h3>
                    <div class="recommendations">
                        ${this.generateDetailedRecommendations(overallScore, completeness, avgQuality)}
                    </div>
                </div>
            </div>
        `;
        
        // Insert the analysis HTML
        analysisContainer.innerHTML = html;
        
        // Update score in database if API is available
        this.updateScoreInDatabase(subcomponentId, overallScore);
    }
    
    /**
     * Generate strengths based on analysis
     */
    generateStrengths(overallScore, completeness, avgQuality) {
        let strengths = [];
        
        if (completeness >= 80) {
            strengths.push('<div class="finding positive" style="margin: 0.5rem 0;"><i class="fas fa-check-circle"></i> <span>Comprehensive coverage of all questions</span></div>');
        }
        if (avgQuality >= 70) {
            strengths.push('<div class="finding positive" style="margin: 0.5rem 0;"><i class="fas fa-check-circle"></i> <span>High-quality, detailed responses</span></div>');
        }
        if (overallScore >= 60) {
            strengths.push('<div class="finding positive" style="margin: 0.5rem 0;"><i class="fas fa-check-circle"></i> <span>Good understanding of the subject area</span></div>');
        }
        
        if (strengths.length === 0) {
            strengths.push('<div class="finding positive" style="margin: 0.5rem 0;"><i class="fas fa-check-circle"></i> <span>Started the assessment process</span></div>');
        }
        
        return strengths.join('');
    }
    
    /**
     * Generate improvements based on analysis
     */
    generateImprovements(overallScore, completeness, avgQuality) {
        let improvements = [];
        
        if (completeness < 100) {
            improvements.push('<div class="finding warning" style="margin: 0.5rem 0;"><i class="fas fa-exclamation-triangle"></i> <span>Some questions remain unanswered</span></div>');
        }
        if (avgQuality < 60) {
            improvements.push('<div class="finding warning" style="margin: 0.5rem 0;"><i class="fas fa-exclamation-triangle"></i> <span>Responses need more detail and specificity</span></div>');
        }
        if (overallScore < 50) {
            improvements.push('<div class="finding warning" style="margin: 0.5rem 0;"><i class="fas fa-exclamation-triangle"></i> <span>Significant gaps in this area need attention</span></div>');
        }
        
        return improvements.join('');
    }
    
    /**
     * Generate opportunities based on analysis
     */
    generateOpportunities(overallScore, completeness, avgQuality) {
        let opportunities = [];
        
        opportunities.push('<div class="finding info" style="margin: 0.5rem 0;"><i class="fas fa-lightbulb"></i> <span>Leverage AI-powered recommendations for improvement</span></div>');
        
        if (overallScore < 80) {
            opportunities.push('<div class="finding info" style="margin: 0.5rem 0;"><i class="fas fa-lightbulb"></i> <span>Schedule a deep-dive workshop session</span></div>');
        }
        
        opportunities.push('<div class="finding info" style="margin: 0.5rem 0;"><i class="fas fa-lightbulb"></i> <span>Connect with experts in this domain</span></div>');
        
        return opportunities.join('');
    }
    
    /**
     * Generate detailed recommendations
     */
    generateDetailedRecommendations(overallScore, completeness, avgQuality) {
        let recommendations = [];
        
        if (completeness < 100) {
            recommendations.push(`
                <div class="recommendation" style="margin-bottom: 1rem;">
                    <span class="priority high" style="background: #F44336; color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.85rem;">
                        HIGH PRIORITY
                    </span>
                    <p style="margin-top: 0.5rem;">Complete all worksheet questions for a comprehensive assessment</p>
                </div>
            `);
        }
        
        if (avgQuality < 60) {
            recommendations.push(`
                <div class="recommendation" style="margin-bottom: 1rem;">
                    <span class="priority medium" style="background: #FF9800; color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.85rem;">
                        MEDIUM PRIORITY
                    </span>
                    <p style="margin-top: 0.5rem;">Add specific examples, metrics, and evidence to your responses</p>
                </div>
            `);
        }
        
        recommendations.push(`
            <div class="recommendation" style="margin-bottom: 1rem;">
                <span class="priority low" style="background: #4CAF50; color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.85rem;">
                    LOW PRIORITY
                </span>
                <p style="margin-top: 0.5rem;">Review best practices and case studies in this area</p>
            </div>
        `);
        
        return recommendations.join('');
    }
    
    
    /**
     * Update score in database
     */
    async updateScoreInDatabase(subcomponentId, score) {
        try {
            const response = await fetch('/api/scores/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: localStorage.getItem('userId') || 'guest',
                    subcomponentId: subcomponentId,
                    score: score,
                    timestamp: new Date().toISOString()
                })
            });
            
            if (response.ok) {
                console.log(`✅ Score updated in database for ${subcomponentId}: ${score}%`);
            }
        } catch (error) {
            console.error('Error updating score:', error);
        }
    }
    
    /**
     * Export results
     */
    exportResults(subcomponentId) {
        const key = `worksheet_${subcomponentId}`;
        const responses = localStorage.getItem(key);
        
        if (!responses) {
            alert('No responses to export');
            return;
        }
        
        // Create export data
        const exportData = {
            subcomponentId: subcomponentId,
            timestamp: new Date().toISOString(),
            responses: JSON.parse(responses)
        };
        
        // Create download
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `worksheet_${subcomponentId}_${Date.now()}.json`;
        a.click();
        
        console.log(`📥 Exported results for ${subcomponentId}`);
    }
}

// Create global instance
if (typeof window !== 'undefined') {
    window.staticWorksheet = new StaticWorksheetDisplay();
    window.StaticWorksheetDisplay = StaticWorksheetDisplay;
}

console.log('✅ Static Worksheet Display loaded - ready to show questions!');
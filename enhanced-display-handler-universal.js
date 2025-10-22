// Enhanced Display Handler v4.0 - Universal Action Steps for ALL Modules
// Ensures EVERY module has populated dropdown content with action steps

class EnhancedDisplayHandler {
    constructor() {
        this.initialized = false;
        console.log('🎨 Enhanced Display Handler v4.0 - Universal Action Steps');
    }

    // Initialize the handler
    init() {
        if (this.initialized) return;
        
        this.initialized = true;
        console.log('✅ Enhanced Display Handler initialized with universal action steps');
        
        // Override the global display function if it exists
        if (typeof window !== 'undefined') {
            window.displayEnhancedAnalysis = this.displayAnalysis.bind(this);
            window.displayEnhancedAnalysisResults = this.displayAnalysis.bind(this);
        }
    }

    // Main display function for analysis results
    displayAnalysis(results, targetElementOrType) {
        try {
            // Handle both calling conventions
            let targetElement;
            
            // If second parameter is a string (worksheetType), find the element
            if (typeof targetElementOrType === 'string') {
                targetElement = document.getElementById('analysis-content');
                if (!targetElement) {
                    console.error('Could not find analysis-content element');
                    this.showErrorMessage('Display area not found. Please refresh the page.');
                    return;
                }
            } else {
                targetElement = targetElementOrType;
            }
            
            if (!results) {
                console.error('No results to display');
                this.showErrorMessage('No analysis results available. Please complete the worksheet first.');
                return;
            }

            if (!targetElement) {
                console.error('Missing target element');
                this.showErrorMessage('Cannot display results. Please refresh the page.');
                return;
            }

            // Clear existing content
            targetElement.innerHTML = '';

            // Create main container
            const container = document.createElement('div');
            container.className = 'analysis-results-container';
            
            // Add overall score section
            this.addOverallScore(container, results.score, results.analysis?.executiveSummary);
            
            // Add detailed analysis section
            if (results.detailedScores) {
                this.addDetailedAnalysis(container, results.detailedScores);
            }
            
            // Add recommendations section
            if (results.recommendations && results.recommendations.length > 0) {
                this.addRecommendations(container, results.recommendations);
            }

            targetElement.appendChild(container);
            
            // Initialize collapsible functionality after adding to DOM
            setTimeout(() => this.initializeCollapsibles(), 100);
            
        } catch (error) {
            console.error('Error displaying analysis:', error);
            this.showErrorMessage('An error occurred while displaying the analysis. Please try again.');
        }
    }

    // Show error message
    showErrorMessage(message) {
        const targetElement = document.getElementById('analysis-content');
        if (targetElement) {
            targetElement.innerHTML = `
                <div style="text-align: center; padding: 60px 20px;">
                    <div style="font-size: 48px; margin-bottom: 20px;">⚠️</div>
                    <h3 style="font-size: 24px; margin-bottom: 10px; color: #FF5500;">Display Error</h3>
                    <p style="font-size: 16px; color: #999;">${message}</p>
                    <button class="btn-primary" onclick="location.reload()" style="margin-top: 20px;">
                        Refresh Page
                    </button>
                </div>
            `;
        }
    }

    // Add overall score section with improved typography
    addOverallScore(container, score, summary) {
        const scoreSection = document.createElement('div');
        scoreSection.className = 'overall-score-section';
        scoreSection.innerHTML = `
            <h2 style="
                font-size: 28px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 2px;
                color: #FF5500;
                margin-bottom: 20px;
            ">Overall Score</h2>
            <div class="score-display">
                <span class="score-value" style="
                    font-size: 72px;
                    font-weight: 800;
                    color: ${score >= 80 ? '#10B981' : score >= 60 ? '#F59E0B' : '#EF4444'};
                    display: block;
                    line-height: 1;
                    margin-bottom: 10px;
                ">${score || 0}%</span>
                <span class="score-label" style="
                    font-size: 14px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: #999;
                ">Based on GTM Best Practices</span>
            </div>
            ${summary ? `
                <div class="executive-summary" style="
                    background: rgba(0, 0, 0, 0.3);
                    border-radius: 12px;
                    padding: 24px;
                    margin-top: 30px;
                    border: 1px solid rgba(255, 85, 0, 0.2);
                ">
                    <h3 style="
                        color: #FF5500;
                        font-size: 18px;
                        font-weight: 600;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        margin-bottom: 16px;
                    ">Executive Summary</h3>
                    <p style="
                        line-height: 1.8;
                        font-size: 15px;
                        color: #ffffff;
                    ">${summary}</p>
                </div>
            ` : ''}
        `;
        container.appendChild(scoreSection);
    }

    // Add detailed analysis with improved typography
    addDetailedAnalysis(container, detailedScores) {
        const analysisSection = document.createElement('div');
        analysisSection.className = 'detailed-analysis-section';
        analysisSection.innerHTML = `
            <h2 style="
                font-size: 24px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 1.5px;
                color: #FF5500;
                margin: 40px 0 30px 0;
            ">Detailed Analysis</h2>
        `;
        
        Object.entries(detailedScores).forEach(([dimension, data]) => {
            const dimensionElement = this.createDimensionElement(dimension, data);
            analysisSection.appendChild(dimensionElement);
        });
        
        container.appendChild(analysisSection);
    }

    // Create individual dimension element with improved typography
    createDimensionElement(dimension, data) {
        const element = document.createElement('div');
        element.className = 'dimension-analysis';
        
        // Format dimension name with proper capitalization
        const dimensionName = this.formatDimensionName(dimension);
        
        // Extract strengths and weaknesses from the data
        const strengths = this.extractStrengths(data);
        const weaknesses = this.extractWeaknesses(data);
        
        // Calculate percentage safely
        const percentage = data.percentage || (data.maxScore > 0 ? Math.round((data.score/data.maxScore)*100) : 0);
        
        element.innerHTML = `
            <div class="dimension-header" style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 16px;
            ">
                <h3 style="
                    font-size: 18px;
                    font-weight: 600;
                    text-transform: capitalize;
                    letter-spacing: 0.5px;
                    color: #ffffff;
                    margin: 0;
                ">${dimensionName}</h3>
                <div class="dimension-score" style="
                    display: flex;
                    align-items: center;
                    gap: 12px;
                ">
                    <span class="score" style="
                        font-size: 16px;
                        font-weight: 700;
                        color: #FF5500;
                    ">${data.score}/${data.maxScore}</span>
                    <span class="percentage" style="
                        font-size: 20px;
                        font-weight: 700;
                        color: ${percentage >= 80 ? '#10B981' : percentage >= 60 ? '#F59E0B' : '#EF4444'};
                    ">${percentage}%</span>
                </div>
            </div>
            <div class="dimension-progress" style="margin-bottom: 20px;">
                <div class="progress-bar" style="
                    height: 8px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 4px;
                    overflow: hidden;
                ">
                    <div class="progress-fill" style="
                        width: ${percentage}%;
                        height: 100%;
                        background: linear-gradient(90deg, #FF5500, #FF8800);
                        transition: width 0.5s ease;
                    "></div>
                </div>
            </div>
            ${data.summary ? `
                <p class="dimension-summary" style="
                    margin-bottom: 20px;
                    color: #cccccc;
                    line-height: 1.6;
                    font-size: 14px;
                ">${data.summary}</p>
            ` : ''}
            <div class="strengths-weaknesses-container" style="
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
            ">
                ${strengths.length > 0 ? `
                    <div class="strengths-box" style="
                        padding: 20px;
                        background: rgba(34, 197, 94, 0.1);
                        border: 1px solid rgba(34, 197, 94, 0.3);
                        border-radius: 12px;
                    ">
                        <h4 class="box-title strengths-title" style="
                            font-size: 13px;
                            font-weight: 700;
                            text-transform: uppercase;
                            letter-spacing: 1px;
                            color: #22C55E;
                            margin: 0 0 16px 0;
                        ">STRENGTHS</h4>
                        <ul class="strengths-list" style="
                            list-style: none;
                            padding: 0;
                            margin: 0;
                        ">
                            ${strengths.map(s => `
                                <li class="strength-item" style="
                                    color: #ffffff;
                                    font-size: 14px;
                                    line-height: 1.8;
                                    margin-bottom: 8px;
                                    padding-left: 20px;
                                    position: relative;
                                ">
                                    <span style="
                                        position: absolute;
                                        left: 0;
                                        color: #22C55E;
                                    ">✓</span>
                                    ${s}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                ` : ''}
                ${weaknesses.length > 0 ? `
                    <div class="weaknesses-box" style="
                        padding: 20px;
                        background: rgba(239, 68, 68, 0.1);
                        border: 1px solid rgba(239, 68, 68, 0.3);
                        border-radius: 12px;
                    ">
                        <h4 class="box-title weaknesses-title" style="
                            font-size: 13px;
                            font-weight: 700;
                            text-transform: uppercase;
                            letter-spacing: 1px;
                            color: #EF4444;
                            margin: 0 0 16px 0;
                        ">AREAS FOR IMPROVEMENT</h4>
                        <ul class="weaknesses-list" style="
                            list-style: none;
                            padding: 0;
                            margin: 0;
                        ">
                            ${weaknesses.map(w => `
                                <li class="weakness-item" style="
                                    color: #ffffff;
                                    font-size: 14px;
                                    line-height: 1.8;
                                    margin-bottom: 8px;
                                    padding-left: 20px;
                                    position: relative;
                                ">
                                    <span style="
                                        position: absolute;
                                        left: 0;
                                        color: #EF4444;
                                    ">✗</span>
                                    ${w}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        `;
        
        // Add spacing between dimension elements
        element.style.cssText = `
            margin-bottom: 40px;
            padding: 30px;
            background: rgba(255, 255, 255, 0.02);
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.05);
        `;
        
        return element;
    }

    // Extract strengths from data
    extractStrengths(data) {
        // First check if we have structured strengths array
        if (data.strengths && Array.isArray(data.strengths)) {
            return data.strengths;
        }
        
        // Fallback: parse from feedback text
        if (data.feedback) {
            const lines = data.feedback.split('\n');
            return lines
                .filter(line => line.trim().startsWith('✓'))
                .map(line => line.replace('✓', '').trim());
        }
        
        return [];
    }

    // Extract weaknesses from data
    extractWeaknesses(data) {
        // First check if we have structured weaknesses array
        if (data.weaknesses && Array.isArray(data.weaknesses)) {
            return data.weaknesses;
        }
        
        // Fallback: parse from feedback text
        if (data.feedback) {
            const lines = data.feedback.split('\n');
            return lines
                .filter(line => line.trim().startsWith('✗'))
                .map(line => line.replace('✗', '').trim());
        }
        
        return [];
    }

    // Format dimension name with proper capitalization
    formatDimensionName(dimension) {
        const nameMap = {
            'problemClarity': 'Problem Clarity',
            'marketUnderstanding': 'Market Understanding',
            'customerEmpathy': 'Customer Empathy',
            'valueQuantification': 'Value Quantification',
            'solutionDifferentiation': 'Solution Differentiation',
            'mvpDefinition': 'MVP Definition',
            'timelineRealism': 'Timeline Realism',
            'resourcePlanning': 'Resource Planning',
            'testingStrategy': 'Testing Strategy',
            'launchReadiness': 'Launch Readiness'
        };
        
        return nameMap[dimension] || dimension
            .replace(/([A-Z])/g, ' $1')
            .trim()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    // Generate universal action steps based on area and priority
    generateActionSteps(rec, index) {
        // If action steps already exist, use them
        if (rec.actionPlan && Array.isArray(rec.actionPlan) && rec.actionPlan.length > 0) {
            return rec.actionPlan;
        }
        
        if (rec.specificSteps && Array.isArray(rec.specificSteps) && rec.specificSteps.length > 0) {
            return rec.specificSteps;
        }
        
        // Generate action steps based on the area/dimension
        const area = (rec.area || rec.dimension || `Area ${index + 1}`).toLowerCase();
        const priority = rec.priority || 'MEDIUM';
        
        // Universal action step templates based on common GTM areas
        const actionTemplates = {
            'problem clarity': [
                'Conduct 10-15 customer interviews to validate the problem statement (Week 1-2)',
                'Document specific pain points with quantifiable impact metrics (Week 2)',
                'Create a problem validation survey and gather 50+ responses (Week 3)',
                'Develop a clear problem statement with measurable success criteria (Week 4)',
                'Present findings to stakeholders and refine based on feedback (Week 4)'
            ],
            'market understanding': [
                'Perform comprehensive market analysis including TAM, SAM, and SOM calculations (Week 1)',
                'Identify and analyze top 5 competitors with feature comparison matrix (Week 2)',
                'Research market trends and growth projections for next 3-5 years (Week 2)',
                'Interview 5 industry experts to validate market assumptions (Week 3)',
                'Create market positioning strategy based on findings (Week 4)'
            ],
            'customer empathy': [
                'Develop detailed buyer personas for 3 primary customer segments (Week 1)',
                'Map complete customer journey from awareness to advocacy (Week 2)',
                'Shadow 5 customers using current solutions to identify friction points (Week 3)',
                'Create empathy maps for each persona highlighting needs and motivations (Week 3)',
                'Validate personas with sales team and customer success insights (Week 4)'
            ],
            'value quantification': [
                'Calculate ROI model with specific metrics and assumptions (Week 1)',
                'Develop value calculator tool for sales team use (Week 2)',
                'Document 3-5 customer success stories with quantified results (Week 3)',
                'Create competitive value comparison showing clear differentiation (Week 3)',
                'Test value messaging with target customers for resonance (Week 4)'
            ],
            'solution differentiation': [
                'Define 3-5 unique value propositions that competitors cannot match (Week 1)',
                'Create feature roadmap highlighting innovative capabilities (Week 2)',
                'Develop proof of concept for key differentiating features (Week 3)',
                'Gather customer feedback on proposed differentiation (Week 4)',
                'Refine positioning based on market validation (Week 4)'
            ],
            'mvp definition': [
                'Prioritize features using MoSCoW method (Must/Should/Could/Won\'t) (Week 1)',
                'Create detailed user stories for MVP features (Week 2)',
                'Develop wireframes and mockups for core functionality (Week 2)',
                'Define success metrics and acceptance criteria (Week 3)',
                'Create MVP development timeline with sprint planning (Week 4)'
            ],
            'timeline realism': [
                'Break down project into detailed work breakdown structure (Week 1)',
                'Identify critical path and potential bottlenecks (Week 1)',
                'Add 20-30% buffer time for unexpected challenges (Week 2)',
                'Create milestone-based timeline with clear deliverables (Week 2)',
                'Review timeline with development team for feasibility (Week 3)'
            ],
            'resource planning': [
                'Define required team roles and skill sets (Week 1)',
                'Calculate burn rate and runway requirements (Week 1)',
                'Identify external resources and vendor needs (Week 2)',
                'Create detailed budget with contingency planning (Week 2)',
                'Develop resource allocation timeline aligned with milestones (Week 3)'
            ],
            'testing strategy': [
                'Define testing methodology (unit, integration, UAT) (Week 1)',
                'Create test cases for all critical user paths (Week 2)',
                'Set up automated testing infrastructure (Week 2)',
                'Plan beta testing program with 20+ users (Week 3)',
                'Establish feedback collection and iteration process (Week 4)'
            ],
            'launch readiness': [
                'Develop go-to-market strategy with channel planning (Week 1)',
                'Create launch timeline with pre and post-launch activities (Week 2)',
                'Prepare marketing materials and sales enablement tools (Week 3)',
                'Set up analytics and tracking for launch metrics (Week 3)',
                'Conduct launch readiness assessment and contingency planning (Week 4)'
            ]
        };
        
        // Find matching template or use generic steps
        let steps = null;
        for (const [key, value] of Object.entries(actionTemplates)) {
            if (area.includes(key) || key.includes(area)) {
                steps = value;
                break;
            }
        }
        
        // If no specific match, use generic high-impact steps based on priority
        if (!steps) {
            if (priority === 'CRITICAL') {
                steps = [
                    'Immediately assess current state and identify critical gaps (Week 1)',
                    'Develop rapid improvement plan with quick wins (Week 1)',
                    'Allocate dedicated resources to address this area (Week 2)',
                    'Implement changes with daily progress monitoring (Week 2-3)',
                    'Measure impact and iterate based on results (Week 4)'
                ];
            } else if (priority === 'HIGH') {
                steps = [
                    'Conduct detailed analysis of current performance (Week 1)',
                    'Benchmark against industry best practices (Week 2)',
                    'Create improvement roadmap with clear milestones (Week 2)',
                    'Begin implementation of priority improvements (Week 3)',
                    'Track progress with weekly reviews and adjustments (Week 4)'
                ];
            } else {
                steps = [
                    'Document current processes and identify improvement areas (Week 1-2)',
                    'Research best practices and successful case studies (Week 2)',
                    'Develop optimization plan with resource requirements (Week 3)',
                    'Start phased implementation of improvements (Week 3-4)',
                    'Establish monitoring system for continuous improvement (Week 4)'
                ];
            }
        }
        
        return steps;
    }

    // Add recommendations section with ALWAYS POPULATED dropdowns
    addRecommendations(container, recommendations) {
        const recsSection = document.createElement('div');
        recsSection.className = 'recommendations-section';
        
        // Title with improved typography
        const title = document.createElement('h2');
        title.style.cssText = `
            color: #FF5500;
            margin: 40px 0 30px 0;
            font-size: 24px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1.5px;
        `;
        title.innerHTML = 'Strategic Recommendations to Improve Your Score';
        recsSection.appendChild(title);
        
        // Recommendations container
        const recsContainer = document.createElement('div');
        recsContainer.className = 'recommendations-container';
        recsContainer.style.cssText = 'display: flex; flex-direction: column; gap: 20px;';
        
        recommendations.forEach((rec, index) => {
            const recElement = this.createRecommendationElement(rec, index);
            recsContainer.appendChild(recElement);
        });
        
        recsSection.appendChild(recsContainer);
        
        // Add summary stats
        const statsDiv = this.createRecommendationStats(recommendations);
        recsSection.appendChild(statsDiv);
        
        container.appendChild(recsSection);
    }

    // Create individual recommendation element with GUARANTEED populated content
    createRecommendationElement(rec, index) {
        const element = document.createElement('div');
        element.className = 'recommendation-item';
        
        // Determine priority color
        const priorityColor = rec.priority === 'CRITICAL' ? '#DC2626' :
                            rec.priority === 'HIGH' ? '#EF4444' :
                            rec.priority === 'MEDIUM' ? '#F59E0B' : '#10B981';
        
        // Format expected improvement
        const expectedImprovement = rec.expectedImprovement ?
            (typeof rec.expectedImprovement === 'string' && rec.expectedImprovement.includes('+') ?
                rec.expectedImprovement : `+${rec.expectedImprovement} points`) : '+20 points';
        
        // Create unique ID for this recommendation
        const recId = `rec-${index}`;
        
        // Start with first item expanded
        const isExpanded = index === 0;
        
        // ALWAYS generate action steps
        const actionSteps = this.generateActionSteps(rec, index);
        
        // Generate success metrics if not provided
        const successMetrics = rec.successMetrics && rec.successMetrics.length > 0 ? rec.successMetrics : [
            'Score improvement of 10+ points in this dimension',
            'Positive feedback from 80% of stakeholders',
            'Measurable progress on all action items within 4 weeks',
            'Documented improvements in process efficiency',
            'Clear evidence of enhanced GTM readiness'
        ];
        
        // Generate ROI statement if not provided
        const roiStatement = rec.expectedROI || rec.detailedAnalysis?.roi || 
            `Implementing these improvements will increase your GTM success probability by ${expectedImprovement.replace('+', '').replace(' points', '%')}, reducing time to market by 20-30% and improving customer acquisition efficiency.`;
        
        element.style.cssText = `
            background: rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(255, 85, 0, 0.3);
            border-radius: 12px;
            margin-bottom: 16px;
            overflow: hidden;
            transition: all 0.3s ease;
        `;
        
        element.innerHTML = `
            <!-- Collapsible Header -->
            <div class="recommendation-header" data-rec-id="${recId}" style="
                padding: 24px;
                cursor: pointer;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: rgba(0, 0, 0, 0.3);
                border-bottom: 1px solid rgba(255, 85, 0, 0.2);
                user-select: none;
            ">
                <div style="display: flex; align-items: center; gap: 16px; flex: 1;">
                    <span class="expand-icon" id="icon-${recId}" style="
                        color: #ffffff;
                        font-size: 20px;
                        transition: transform 0.3s;
                        display: inline-block;
                        transform: rotate(${isExpanded ? '90deg' : '0'});
                    ">▶</span>
                    <div style="flex: 1;">
                        <h4 style="
                            color: #ffffff;
                            margin: 0;
                            font-size: 18px;
                            font-weight: 600;
                            text-transform: capitalize;
                            letter-spacing: 0.5px;
                        ">
                            Improve ${rec.area || rec.dimension || `Area ${index + 1}`}
                        </h4>
                        <p style="
                            color: #4CAF50;
                            margin: 6px 0 0 0;
                            font-size: 15px;
                            font-weight: 600;
                        ">
                            Expected Score Impact: ${expectedImprovement}
                        </p>
                    </div>
                </div>
                <span style="
                    background: ${priorityColor};
                    color: #ffffff;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                ">
                    ${rec.priority || 'MEDIUM'}
                </span>
            </div>
            
            <!-- Collapsible Content - ALWAYS POPULATED -->
            <div class="recommendation-content" id="content-${recId}" style="
                max-height: ${isExpanded ? '2000px' : '0'};
                overflow: hidden;
                transition: max-height 0.5s ease;
            ">
                <div style="padding: 24px;">
                    <!-- Action Steps - GUARANTEED TO EXIST -->
                    <div style="margin-bottom: 24px;">
                        <h5 style="
                            color: #FF5500;
                            margin: 0 0 16px 0;
                            font-size: 14px;
                            font-weight: 700;
                            text-transform: uppercase;
                            letter-spacing: 1px;
                            display: flex;
                            align-items: center;
                            gap: 8px;
                        ">
                            <span style="color: #FF5500; font-size: 18px;">🎯</span>
                            ACTION STEPS TO IMPROVE YOUR SCORE
                        </h5>
                        <ol style="
                            margin: 0;
                            padding-left: 24px;
                            color: #ffffff;
                            line-height: 2;
                        ">
                            ${actionSteps.map((step, i) => `
                                <li style="
                                    margin-bottom: 16px;
                                    font-size: 15px;
                                ">
                                    <strong>${step}</strong>
                                </li>
                            `).join('')}
                        </ol>
                    </div>
                
                    <!-- Success Metrics - ALWAYS INCLUDED -->
                    <div style="margin-bottom: 24px;">
                        <h5 style="
                            color: #10B981;
                            margin: 0 0 16px 0;
                            font-size: 14px;
                            font-weight: 700;
                            text-transform: uppercase;
                            letter-spacing: 1px;
                            display: flex;
                            align-items: center;
                            gap: 8px;
                        ">
                            <span style="font-size: 18px;">✅</span>
                            SUCCESS METRICS
                        </h5>
                        <ul style="
                            margin: 0;
                            padding-left: 24px;
                            color: #ffffff;
                            line-height: 2;
                        ">
                            ${successMetrics.map(metric => `
                                <li style="
                                    margin-bottom: 12px;
                                    font-size: 15px;
                                ">
                                    ${metric}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    
                    <!-- Expected ROI - ALWAYS INCLUDED -->
                    <div style="
                        margin-top: 24px;
                        padding: 20px;
                        background: rgba(255, 85, 0, 0.1);
                        border-left: 4px solid #FF5500;
                        border-radius: 8px;
                    ">
                        <h5 style="
                            color: #F59E0B;
                            margin: 0 0 12px 0;
                            font-size: 14px;
                            font-weight: 700;
                            text-transform: uppercase;
                            letter-spacing: 1px;
                        ">
                            💡 EXPECTED ROI
                        </h5>
                        <p style="
                            color: #ffffff;
                            margin: 0;
                            font-size: 15px;
                            line-height: 1.8;
                        ">
                            ${roiStatement}
                        </p>
                    </div>
                </div>
            </div>
        `;
        
        // Add click handler to the header
        const header = element.querySelector('.recommendation-header');
        header.addEventListener('click', () => {
            const content = document.getElementById(`content-${recId}`);
            const icon = document.getElementById(`icon-${recId}`);
            
            if (content && icon) {
                const isCurrentlyExpanded = content.style.maxHeight !== '0px';
                
                if (isCurrentlyExpanded) {
                    // Collapse
                    content.style.maxHeight = '0';
                    icon.style.transform = 'rotate(0deg)';
                } else {
                    // Expand
                    content.style.maxHeight = '2000px';
                    icon.style.transform = 'rotate(90deg)';
                }
            }
        });
        
        return element;
    }
    
    // Create recommendation statistics summary
    createRecommendationStats(recommendations) {
        const statsDiv = document.createElement('div');
        
        const criticalCount = recommendations.filter(r => r.priority === 'CRITICAL').length;
        const highCount = recommendations.filter(r => r.priority === 'HIGH').length;
        const totalImprovement = recommendations.reduce((sum, r) => {
            const improvement = parseInt(r.expectedImprovement?.toString().replace(/[^0-9]/g, '') || '20');
            return sum + improvement;
        }, 0);
        
        statsDiv.style.cssText = `
            display: flex;
            gap: 24px;
            margin-top: 40px;
            padding: 24px;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 16px;
            border: 1px solid rgba(255, 85, 0, 0.2);
        `;
        
        statsDiv.innerHTML = `
            <div style="flex: 1; text-align: center;">
                <div style="
                    font-size: 36px;
                    font-weight: 800;
                    color: #DC2626;
                    margin-bottom: 8px;
                ">
                    ${criticalCount}
                </div>
                <div style="
                    color: #999;
                    font-size: 13px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    font-weight: 600;
                ">
                    Critical Actions
                </div>
            </div>
            <div style="flex: 1; text-align: center;">
                <div style="
                    font-size: 36px;
                    font-weight: 800;
                    color: #EF4444;
                    margin-bottom: 8px;
                ">
                    ${highCount}
                </div>
                <div style="
                    color: #999;
                    font-size: 13px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    font-weight: 600;
                ">
                    High Priority
                </div>
            </div>
            <div style="flex: 1; text-align: center;">
                <div style="
                    font-size: 36px;
                    font-weight: 800;
                    color: #10B981;
                    margin-bottom: 8px;
                ">
                    +${totalImprovement}
                </div>
                <div style="
                    color: #999;
                    font-size: 13px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    font-weight: 600;
                ">
                    Potential Points
                </div>
            </div>
        `;
        
        return statsDiv;
    }
    
    // Initialize collapsible functionality
    initializeCollapsibles() {
        console.log('🔧 Initializing collapsible functionality');
        // Event handlers are now attached directly when creating elements
    }
}

// Add CSS styles for professional display
const enhancedStyles = `
<style>
    /* Global Typography Improvements */
    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    
    /* Analysis Container */
    .analysis-results-container {
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
    }
    
    /* Hover Effects */
    .recommendation-header:hover {
        background: rgba(255, 85, 0, 0.05) !important;
    }
    
    /* Smooth Transitions */
    .recommendation-item {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .recommendation-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(255, 85, 0, 0.15);
    }
    
    /* Responsive Design */
    @media (max-width: 768px) {
        .strengths-weaknesses-container {
            grid-template-columns: 1fr !important;
        }
        
        .recommendation-header {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 16px;
        }
        
        h2 {
            font-size: 20px !important;
        }
        
        h3 {
            font-size: 16px !important;
        }
    }
    
    /* Print Styles */
    @media print {
        .recommendation-content {
            max-height: none !important;
        }
        
        .expand-icon {
            display: none !important;
        }
    }
    
    /* Animation for smooth transitions */
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .dimension-analysis {
        animation: fadeIn 0.5s ease;
    }
    
    .recommendation-item {
        animation: fadeIn 0.5s ease;
    }
    
    /* Button Styles */
    .btn-primary, .btn-secondary {
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
        cursor: pointer;
        transition: all 0.3s ease;
        border: none;
    }
    
    .btn-primary {
        background: linear-gradient(135deg, #FF5500, #FF8800);
        color: white;
    }
    
    .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(255, 85, 0, 0.3);
    }
    
    .btn-secondary {
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.15);
    }
</style>
`;

// Auto-initialize when loaded
if (typeof document !== 'undefined') {
    // Add styles to document
    if (!document.getElementById('enhanced-display-styles-v4')) {
        const styleElement = document.createElement('div');
        styleElement.id = 'enhanced-display-styles-v4';
        styleElement.innerHTML = enhancedStyles;
        document.head.appendChild(styleElement);
    }
    
    // Initialize handler
    const handler = new EnhancedDisplayHandler();
    handler.init();
    
    // Make it globally available
    window.EnhancedDisplayHandler = EnhancedDisplayHandler;
    window.enhancedDisplayHandler = handler;
    
    console.log('✅ Enhanced Display Handler v4.0 loaded - Universal Action Steps Active');
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EnhancedDisplayHandler;
}
// Enhanced Output Tab with Expert-Level Recommendations and Better Visuals
(function() {
    'use strict';

    // Wait for DOM and ensure we're on the right page
    if (!window.location.pathname.includes('subcomponent-detail.html')) {
        return;
    }

    console.log('🚀 Enhanced Output Tab Module Loading...');

    // Configuration
    const API_BASE = window.location.origin;
    const CHART_COLORS = {
        excellent: '#28a745',
        good: '#17a2b8',
        fair: '#ffc107',
        poor: '#dc3545',
        primary: '#1a73e8',
        secondary: '#6c757d'
    };

    // Enhanced Output Tab Manager
    class EnhancedOutputManager {
        constructor() {
            this.currentAnalysis = null;
            this.currentSubcomponentId = null;
            this.expertRecommendations = [];
            this.generatedDocuments = [];
            this.charts = {};
            this.init();
        }

        init() {
            // Wait for tab to be available
            setTimeout(() => {
                this.setupOutputTab();
                this.listenForAnalysisUpdates();
            }, 1000);
        }

        setupOutputTab() {
            const outputTab = document.querySelector('[data-tab="output"]');
            if (!outputTab) {
                console.warn('Output tab not found, retrying...');
                setTimeout(() => this.setupOutputTab(), 500);
                return;
            }

            outputTab.addEventListener('click', () => {
                this.renderEnhancedOutput();
            });

            console.log('✅ Enhanced Output Tab initialized');
        }

        listenForAnalysisUpdates() {
            // Listen for analysis completion events
            window.addEventListener('analysisComplete', (event) => {
                this.currentAnalysis = event.detail;
                this.currentSubcomponentId = event.detail.subcomponentId;
                this.loadExpertRecommendations();
                
                // Auto-switch to Output tab if configured
                if (window.autoSwitchToOutput) {
                    setTimeout(() => {
                        const outputTab = document.querySelector('[data-tab="output"]');
                        if (outputTab) outputTab.click();
                    }, 500);
                }
            });

            // Listen for storage events (from other components)
            window.addEventListener('storage', (e) => {
                if (e.key && e.key.includes('analysis_')) {
                    try {
                        this.currentAnalysis = JSON.parse(e.newValue);
                        this.currentSubcomponentId = this.currentAnalysis.subcomponentId;
                        this.loadExpertRecommendations();
                    } catch (err) {
                        console.error('Error parsing analysis from storage:', err);
                    }
                }
            });
        }

        async loadExpertRecommendations() {
            if (!this.currentSubcomponentId) return;

            try {
                const response = await fetch(`${API_BASE}/api/expert-recommendations/${this.currentSubcomponentId}`);
                if (response.ok) {
                    this.expertRecommendations = await response.json();
                }
            } catch (error) {
                console.error('Error loading expert recommendations:', error);
            }
        }

        async renderEnhancedOutput() {
            const outputContent = document.getElementById('output-content');
            if (!outputContent) {
                console.warn('Output content area not found');
                return;
            }

            // Check for analysis data
            if (!this.currentAnalysis) {
                // Try to load from localStorage
                const storedAnalysis = this.loadLatestAnalysis();
                if (storedAnalysis) {
                    this.currentAnalysis = storedAnalysis;
                    this.currentSubcomponentId = storedAnalysis.subcomponentId;
                    await this.loadExpertRecommendations();
                } else {
                    outputContent.innerHTML = this.renderNoDataMessage();
                    return;
                }
            }

            // Render comprehensive output
            outputContent.innerHTML = `
                <div class="enhanced-output-container">
                    <!-- Header Section -->
                    <div class="output-header">
                        <h2 class="output-title">
                            <i class="fas fa-chart-line"></i>
                            Expert Analysis Report
                        </h2>
                        <div class="output-meta">
                            <span class="meta-item">
                                <i class="fas fa-robot"></i> ${this.currentAnalysis.agentName || 'AI Agent'}
                            </span>
                            <span class="meta-item">
                                <i class="fas fa-cube"></i> ${this.currentAnalysis.subcomponentName || 'Analysis'}
                            </span>
                            <span class="meta-item">
                                <i class="fas fa-clock"></i> ${new Date(this.currentAnalysis.timestamp).toLocaleString()}
                            </span>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="output-actions">
                        <button class="btn btn-primary" onclick="enhancedOutputManager.generatePDF()">
                            <i class="fas fa-file-pdf"></i> Generate PDF Report
                        </button>
                        <button class="btn btn-secondary" onclick="enhancedOutputManager.generateDOCX()">
                            <i class="fas fa-file-word"></i> Generate DOCX Report
                        </button>
                        <button class="btn btn-info" onclick="enhancedOutputManager.viewHistory()">
                            <i class="fas fa-history"></i> View History
                        </button>
                        <button class="btn btn-success" onclick="enhancedOutputManager.shareReport()">
                            <i class="fas fa-share-alt"></i> Share Report
                        </button>
                    </div>

                    <!-- Executive Summary -->
                    ${this.renderExecutiveSummary()}

                    <!-- Visual Score Display -->
                    ${this.renderVisualScoreDisplay()}

                    <!-- Dimension Analysis Chart -->
                    ${this.renderDimensionChart()}

                    <!-- Strengths & Weaknesses Grid -->
                    ${this.renderStrengthsWeaknessesGrid()}

                    <!-- Expert Recommendations -->
                    ${this.renderExpertRecommendations()}

                    <!-- Implementation Roadmap -->
                    ${this.renderImplementationRoadmap()}

                    <!-- Success Metrics -->
                    ${this.renderSuccessMetrics()}

                    <!-- Resources & Templates -->
                    ${this.renderResourcesSection()}

                    <!-- Next Steps -->
                    ${this.renderNextSteps()}
                </div>
            `;

            // Initialize charts after DOM update
            setTimeout(() => {
                this.initializeCharts();
                this.attachEventListeners();
            }, 100);
        }

        renderNoDataMessage() {
            return `
                <div class="no-data-message">
                    <div class="no-data-icon">
                        <i class="fas fa-chart-bar fa-4x"></i>
                    </div>
                    <h3>No Analysis Data Available</h3>
                    <p>Complete the Workspace assessment to generate your expert analysis report.</p>
                    <button class="btn btn-primary" onclick="document.querySelector('[data-tab=\\'workspace\\']').click()">
                        <i class="fas fa-clipboard-list"></i> Go to Workspace
                    </button>
                </div>
            `;
        }

        renderExecutiveSummary() {
            const score = this.currentAnalysis.overallScore || 0;
            const scoreClass = this.getScoreClass(score);
            const trend = this.calculateTrend();

            return `
                <div class="executive-summary card">
                    <div class="card-header">
                        <h3><i class="fas fa-briefcase"></i> Executive Summary</h3>
                    </div>
                    <div class="card-body">
                        <div class="summary-grid">
                            <div class="summary-score">
                                <div class="score-circle ${scoreClass}">
                                    <span class="score-value">${score}</span>
                                    <span class="score-label">Overall Score</span>
                                </div>
                                <div class="score-trend">
                                    ${trend.icon} ${trend.text}
                                </div>
                            </div>
                            <div class="summary-insights">
                                <h4>Key Insights</h4>
                                <ul class="insights-list">
                                    <li><strong>Performance Level:</strong> ${this.getPerformanceLevel(score)}</li>
                                    <li><strong>Maturity Stage:</strong> ${this.getMaturityStage(score)}</li>
                                    <li><strong>Improvement Potential:</strong> ${100 - score}% opportunity</li>
                                    <li><strong>Estimated Time to Excellence:</strong> ${this.estimateTimeToExcellence(score)}</li>
                                </ul>
                            </div>
                        </div>
                        <div class="summary-narrative">
                            <p>${this.generateExecutiveNarrative(score)}</p>
                        </div>
                    </div>
                </div>
            `;
        }

        renderVisualScoreDisplay() {
            const score = this.currentAnalysis.overallScore || 0;
            const dimensions = this.currentAnalysis.dimensionScores || {};

            return `
                <div class="visual-score-display card">
                    <div class="card-header">
                        <h3><i class="fas fa-tachometer-alt"></i> Performance Dashboard</h3>
                    </div>
                    <div class="card-body">
                        <div class="score-gauges">
                            <div class="main-gauge">
                                <canvas id="scoreGauge" width="300" height="200"></canvas>
                            </div>
                            <div class="dimension-meters">
                                ${Object.entries(dimensions).map(([dim, score]) => `
                                    <div class="dimension-meter">
                                        <label>${dim}</label>
                                        <div class="meter-bar">
                                            <div class="meter-fill ${this.getScoreClass(score)}" style="width: ${score}%">
                                                ${score}%
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        renderDimensionChart() {
            return `
                <div class="dimension-chart card">
                    <div class="card-header">
                        <h3><i class="fas fa-chart-radar"></i> Dimension Analysis</h3>
                    </div>
                    <div class="card-body">
                        <div class="chart-container">
                            <canvas id="dimensionRadar" width="400" height="400"></canvas>
                        </div>
                        <div class="dimension-insights">
                            ${this.generateDimensionInsights()}
                        </div>
                    </div>
                </div>
            `;
        }

        renderStrengthsWeaknessesGrid() {
            const strengths = this.currentAnalysis.strengths || [];
            const weaknesses = this.currentAnalysis.weaknesses || [];

            return `
                <div class="strengths-weaknesses-grid">
                    <div class="strengths-section card">
                        <div class="card-header success-header">
                            <h3><i class="fas fa-trophy"></i> Key Strengths</h3>
                        </div>
                        <div class="card-body">
                            <ul class="strength-list">
                                ${strengths.map(s => `
                                    <li class="strength-item">
                                        <i class="fas fa-check-circle"></i>
                                        <span>${s}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                    <div class="weaknesses-section card">
                        <div class="card-header warning-header">
                            <h3><i class="fas fa-exclamation-triangle"></i> Improvement Areas</h3>
                        </div>
                        <div class="card-body">
                            <ul class="weakness-list">
                                ${weaknesses.map(w => `
                                    <li class="weakness-item">
                                        <i class="fas fa-arrow-circle-up"></i>
                                        <span>${w}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            `;
        }

        renderExpertRecommendations() {
            const recommendations = this.expertRecommendations.length > 0 ? 
                this.expertRecommendations : 
                (this.currentAnalysis.recommendations || []);

            return `
                <div class="expert-recommendations card">
                    <div class="card-header">
                        <h3><i class="fas fa-lightbulb"></i> Expert Recommendations</h3>
                    </div>
                    <div class="card-body">
                        <div class="recommendations-list">
                            ${recommendations.map((rec, index) => `
                                <div class="recommendation-item priority-${rec.priority || 'medium'}">
                                    <div class="rec-header">
                                        <span class="rec-number">${index + 1}</span>
                                        <h4>${rec.title}</h4>
                                        <span class="priority-badge">${rec.priority || 'MEDIUM'}</span>
                                    </div>
                                    <p class="rec-description">${rec.description}</p>
                                    <div class="rec-meta">
                                        ${rec.impact_score ? `<span><i class="fas fa-chart-line"></i> Impact: ${rec.impact_score}%</span>` : ''}
                                        ${rec.estimated_time ? `<span><i class="fas fa-clock"></i> ${rec.estimated_time}</span>` : ''}
                                        ${rec.implementation_difficulty ? `<span><i class="fas fa-tasks"></i> Difficulty: ${rec.implementation_difficulty}</span>` : ''}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        }

        renderImplementationRoadmap() {
            const roadmap = this.generateRoadmap();

            return `
                <div class="implementation-roadmap card">
                    <div class="card-header">
                        <h3><i class="fas fa-road"></i> Implementation Roadmap</h3>
                    </div>
                    <div class="card-body">
                        <div class="roadmap-timeline">
                            ${roadmap.map((phase, index) => `
                                <div class="roadmap-phase">
                                    <div class="phase-marker">${index + 1}</div>
                                    <div class="phase-content">
                                        <h4>${phase.title}</h4>
                                        <p>${phase.description}</p>
                                        <div class="phase-tasks">
                                            ${phase.tasks.map(task => `
                                                <div class="task-item">
                                                    <input type="checkbox" id="task-${index}-${task.id}">
                                                    <label for="task-${index}-${task.id}">${task.name}</label>
                                                </div>
                                            `).join('')}
                                        </div>
                                        <div class="phase-timeline">
                                            <i class="fas fa-calendar"></i> ${phase.duration}
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        }

        renderSuccessMetrics() {
            const metrics = this.generateSuccessMetrics();

            return `
                <div class="success-metrics card">
                    <div class="card-header">
                        <h3><i class="fas fa-chart-pie"></i> Success Metrics</h3>
                    </div>
                    <div class="card-body">
                        <div class="metrics-grid">
                            ${metrics.map(metric => `
                                <div class="metric-card">
                                    <div class="metric-icon">
                                        <i class="fas ${metric.icon}"></i>
                                    </div>
                                    <div class="metric-content">
                                        <h4>${metric.name}</h4>
                                        <div class="metric-value">${metric.current}</div>
                                        <div class="metric-target">Target: ${metric.target}</div>
                                        <div class="metric-progress">
                                            <div class="progress-bar" style="width: ${metric.progress}%"></div>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        }

        renderResourcesSection() {
            return `
                <div class="resources-section card">
                    <div class="card-header">
                        <h3><i class="fas fa-folder-open"></i> Resources & Downloads</h3>
                    </div>
                    <div class="card-body">
                        <div class="resources-grid">
                            <div class="resource-item">
                                <i class="fas fa-file-pdf fa-3x"></i>
                                <h4>Analysis Report</h4>
                                <p>Comprehensive PDF report with all findings</p>
                                <button class="btn btn-sm btn-primary" onclick="enhancedOutputManager.generatePDF()">
                                    Download PDF
                                </button>
                            </div>
                            <div class="resource-item">
                                <i class="fas fa-file-word fa-3x"></i>
                                <h4>Action Plan</h4>
                                <p>Editable DOCX with implementation steps</p>
                                <button class="btn btn-sm btn-secondary" onclick="enhancedOutputManager.generateDOCX()">
                                    Download DOCX
                                </button>
                            </div>
                            <div class="resource-item">
                                <i class="fas fa-file-excel fa-3x"></i>
                                <h4>Metrics Template</h4>
                                <p>Track your progress with this spreadsheet</p>
                                <button class="btn btn-sm btn-success" onclick="enhancedOutputManager.downloadTemplate('metrics')">
                                    Download Template
                                </button>
                            </div>
                            <div class="resource-item">
                                <i class="fas fa-file-powerpoint fa-3x"></i>
                                <h4>Presentation Deck</h4>
                                <p>Share findings with your team</p>
                                <button class="btn btn-sm btn-info" onclick="enhancedOutputManager.downloadTemplate('presentation')">
                                    Download Deck
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        renderNextSteps() {
            const nextSteps = this.currentAnalysis.nextSteps || [];

            return `
                <div class="next-steps card">
                    <div class="card-header">
                        <h3><i class="fas fa-forward"></i> Next Steps</h3>
                    </div>
                    <div class="card-body">
                        <ol class="next-steps-list">
                            ${nextSteps.map(step => `
                                <li class="next-step-item">
                                    <span>${step}</span>
                                    <button class="btn btn-sm btn-outline-primary" onclick="enhancedOutputManager.scheduleStep('${step}')">
                                        <i class="fas fa-calendar-plus"></i> Schedule
                                    </button>
                                </li>
                            `).join('')}
                        </ol>
                        <div class="cta-section">
                            <button class="btn btn-lg btn-primary" onclick="enhancedOutputManager.startImplementation()">
                                <i class="fas fa-rocket"></i> Start Implementation
                            </button>
                            <button class="btn btn-lg btn-secondary" onclick="enhancedOutputManager.scheduleConsultation()">
                                <i class="fas fa-phone"></i> Schedule Consultation
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }

        // Helper Methods
        getScoreClass(score) {
            if (score >= 80) return 'excellent';
            if (score >= 60) return 'good';
            if (score >= 40) return 'fair';
            return 'poor';
        }

        getPerformanceLevel(score) {
            if (score >= 90) return 'Industry Leading';
            if (score >= 80) return 'Excellence';
            if (score >= 70) return 'Strong';
            if (score >= 60) return 'Developing';
            if (score >= 50) return 'Emerging';
            return 'Foundation Building';
        }

        getMaturityStage(score) {
            if (score >= 85) return 'Optimized';
            if (score >= 70) return 'Managed';
            if (score >= 55) return 'Defined';
            if (score >= 40) return 'Repeatable';
            return 'Initial';
        }

        estimateTimeToExcellence(score) {
            const gap = 85 - score;
            if (gap <= 0) return 'Already achieved';
            if (gap <= 15) return '30-60 days';
            if (gap <= 30) return '60-90 days';
            if (gap <= 45) return '3-6 months';
            return '6-12 months';
        }

        calculateTrend() {
            // Would compare with historical data
            return {
                icon: '<i class="fas fa-arrow-up text-success"></i>',
                text: 'Improving trend'
            };
        }

        generateExecutiveNarrative(score) {
            if (score >= 80) {
                return `Your organization demonstrates exceptional maturity in this area, positioning you among industry leaders. The analysis reveals strong operational excellence with clear opportunities for fine-tuning and optimization. Your current performance provides a solid foundation for scaling and expanding capabilities.`;
            } else if (score >= 60) {
                return `Your organization shows solid foundational capabilities with significant growth potential. The analysis identifies key strengths to build upon and specific areas where targeted improvements will yield substantial returns. With focused effort on the recommended priorities, you can achieve excellence within the projected timeline.`;
            } else {
                return `Your organization is in the early stages of developing capabilities in this area. The analysis provides a clear roadmap for building essential foundations and establishing core competencies. By following the structured implementation plan, you can achieve rapid improvements and establish competitive positioning.`;
            }
        }

        generateDimensionInsights() {
            const dimensions = this.currentAnalysis.dimensionScores || {};
            const insights = [];

            Object.entries(dimensions).forEach(([dim, score]) => {
                if (score >= 80) {
                    insights.push(`<li><strong>${dim}:</strong> Excellent performance, maintain and optimize</li>`);
                } else if (score >= 60) {
                    insights.push(`<li><strong>${dim}:</strong> Good foundation, focus on consistency</li>`);
                } else {
                    insights.push(`<li><strong>${dim}:</strong> Priority improvement area, implement quick wins</li>`);
                }
            });

            return `<ul class="dimension-insights-list">${insights.join('')}</ul>`;
        }

        generateRoadmap() {
            return [
                {
                    title: 'Phase 1: Foundation (Days 1-30)',
                    description: 'Establish baseline and quick wins',
                    duration: '30 days',
                    tasks: [
                        { id: 1, name: 'Complete detailed assessment' },
                        { id: 2, name: 'Implement quick wins' },
                        { id: 3, name: 'Set up measurement framework' }
                    ]
                },
                {
                    title: 'Phase 2: Build (Days 31-60)',
                    description: 'Develop core capabilities',
                    duration: '30 days',
                    tasks: [
                        { id: 4, name: 'Deploy priority improvements' },
                        { id: 5, name: 'Train team members' },
                        { id: 6, name: 'Establish processes' }
                    ]
                },
                {
                    title: 'Phase 3: Scale (Days 61-90)',
                    description: 'Expand and optimize',
                    duration: '30 days',
                    tasks: [
                        { id: 7, name: 'Scale successful initiatives' },
                        { id: 8, name: 'Optimize workflows' },
                        { id: 9, name: 'Measure and iterate' }
                    ]
                }
            ];
        }

        generateSuccessMetrics() {
            const score = this.currentAnalysis.overallScore || 0;
            return [
                {
                    name: 'Overall Maturity',
                    icon: 'fa-chart-line',
                    current: `${score}%`,
                    target: '85%',
                    progress: (score / 85) * 100
                },
                {
                    name: 'Implementation Progress',
                    icon: 'fa-tasks',
                    current: '3 of 10',
                    target: '10 tasks',
                    progress: 30
                },
                {
                    name: 'Time to Excellence',
                    icon: 'fa-clock',
                    current: '60 days',
                    target: '90 days',
                    progress: 67
                },
                {
                    name: 'ROI Achievement',
                    icon: 'fa-dollar-sign',
                    current: '2.5x',
                    target: '4x',
                    progress: 62.5
                }
            ];
        }

        initializeCharts() {
            // Initialize gauge chart
            this.drawGaugeChart();
            
            // Initialize radar chart
            this.drawRadarChart();
        }

        drawGaugeChart() {
            const canvas = document.getElementById('scoreGauge');
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            const score = this.currentAnalysis.overallScore || 0;
            
            // Simple gauge visualization
            // (In production, use Chart.js or similar library)
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw arc
            const centerX = canvas.width / 2;
            const centerY = canvas.height - 20;
            const radius = 100;
            
            // Background arc
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, Math.PI, 0);
            ctx.strokeStyle = '#e0e0e0';
            ctx.lineWidth = 20;
            ctx.stroke();
            
            // Score arc
            const scoreAngle = Math.PI + (score / 100) * Math.PI;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, Math.PI, scoreAngle);
            ctx.strokeStyle = this.getScoreColor(score);
            ctx.lineWidth = 20;
            ctx.stroke();
            
            // Score text
            ctx.font = 'bold 48px Arial';
            ctx.fillStyle = this.getScoreColor(score);
            ctx.textAlign = 'center';
            ctx.fillText(score, centerX, centerY - 10);
            
            ctx.font = '14px Arial';
            ctx.fillStyle = '#666';
            ctx.fillText('Overall Score', centerX, centerY + 20);
        }

        drawRadarChart() {
            const canvas = document.getElementById('dimensionRadar');
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            const dimensions = Object.entries(this.currentAnalysis.dimensionScores || {});
            
            if (dimensions.length === 0) return;

            // Simple radar chart visualization
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = 150;
            const angleStep = (2 * Math.PI) / dimensions.length;
            
            // Draw grid
            for (let i = 1; i <= 5; i++) {
                ctx.beginPath();
                ctx.strokeStyle = '#e0e0e0';
                ctx.lineWidth = 1;
                
                for (let j = 0; j < dimensions.length; j++) {
                    const angle = j * angleStep - Math.PI / 2;
                    const x = centerX + Math.cos(angle) * (radius * i / 5);
                    const y = centerY + Math.sin(angle) * (radius * i / 5);
                    
                    if (j === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                ctx.closePath();
                ctx.stroke();
            }
            
            // Draw data
            ctx.beginPath();
            ctx.fillStyle = 'rgba(26, 115, 232, 0.2)';
            ctx.strokeStyle = '#1a73e8';
            ctx.lineWidth = 2;
            
            dimensions.forEach(([dim, score], index) => {
                const angle = index * angleStep - Math.PI / 2;
                const distance = (score / 100) * radius;
                const x = centerX + Math.cos(angle) * distance;
                const y = centerY + Math.sin(angle) * distance;
                
                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
                
                // Draw point
                ctx.fillStyle = '#1a73e8';
                ctx.beginPath();
                ctx.arc(x, y, 4, 0, 2 * Math.PI);
                ctx.fill();
                
                // Draw label
                ctx.fillStyle = '#333';
                ctx.font = '12px Arial';
                ctx.textAlign = 'center';
                const labelX = centerX + Math.cos(angle) * (radius + 20);
                const labelY = centerY + Math.sin(angle) * (radius + 20);
                ctx.fillText(dim, labelX, labelY);
            });
            
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }

        getScoreColor(score) {
            if (score >= 80) return CHART_COLORS.excellent;
            if (score >= 60) return CHART_COLORS.good;
            if (score >= 40) return CHART_COLORS.fair;
            return CHART_COLORS.poor;
        }

        async generatePDF() {
            if (!this.currentAnalysis || !this.currentSubcomponentId) {
                alert('No analysis data available');
                return;
            }

            try {
                const response = await fetch(`${API_BASE}/api/generate-pdf/${this.currentSubcomponentId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.currentAnalysis)
                });

                if (response.ok) {
                    const result = await response.json();
                    window.open(result.url, '_blank');
                    this.showNotification('PDF generated successfully!', 'success');
                } else {
                    throw new Error('Failed to generate PDF');
                }
            } catch (error) {
                console.error('Error generating PDF:', error);
                this.showNotification('Error generating PDF', 'error');
            }
        }

        async generateDOCX() {
            if (!this.currentAnalysis || !this.currentSubcomponentId) {
                alert('No analysis data available');
                return;
            }

            try {
                const response = await fetch(`${API_BASE}/api/generate-docx/${this.currentSubcomponentId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.currentAnalysis)
                });

                if (response.ok) {
                    const result = await response.json();
                    window.open(result.url, '_blank');
                    this.showNotification('DOCX generated successfully!', 'success');
                } else {
                    throw new Error('Failed to generate DOCX');
                }
            } catch (error) {
                console.error('Error generating DOCX:', error);
                this.showNotification('Error generating DOCX', 'error');
            }
        }

        async downloadTemplate(type) {
            if (!this.currentSubcomponentId) {
                alert('No subcomponent selected');
                return;
            }

            try {
                const response = await fetch(`${API_BASE}/api/generate-template/${this.currentSubcomponentId}/${type}`);
                
                if (response.ok) {
                    const result = await response.json();
                    window.open(result.url, '_blank');
                    this.showNotification(`${type} template downloaded!`, 'success');
                } else {
                    throw new Error(`Failed to download ${type} template`);
                }
            } catch (error) {
                console.error('Error downloading template:', error);
                this.showNotification('Error downloading template', 'error');
            }
        }

        viewHistory() {
            // Navigate to Score History tab
            const historyTab = document.querySelector('[data-tab="score-history"]');
            if (historyTab) {
                historyTab.click();
            }
        }

        shareReport() {
            // Generate shareable link
            const shareData = {
                title: 'ScaleOps6 Analysis Report',
                text: `Check out my analysis report: Score ${this.currentAnalysis.overallScore}/100`,
                url: window.location.href
            };

            if (navigator.share) {
                navigator.share(shareData);
            } else {
                // Fallback: Copy to clipboard
                navigator.clipboard.writeText(window.location.href);
                this.showNotification('Link copied to clipboard!', 'success');
            }
        }

        scheduleStep(step) {
            // Integration with calendar/task management
            console.log('Scheduling step:', step);
            this.showNotification(`"${step}" added to your task list`, 'success');
        }

        startImplementation() {
            // Navigate to first recommendation or action item
            const firstRec = document.querySelector('.recommendation-item');
            if (firstRec) {
                firstRec.scrollIntoView({ behavior: 'smooth' });
                firstRec.classList.add('highlight');
            }
            this.showNotification('Implementation guide activated', 'success');
        }

        scheduleConsultation() {
            // Open consultation booking
            window.open('https://calendly.com/scaleops6/consultation', '_blank');
        }

        loadLatestAnalysis() {
            // Try to load from localStorage
            const keys = Object.keys(localStorage).filter(k => k.startsWith('analysis_'));
            if (keys.length > 0) {
                const latestKey = keys.sort().reverse()[0];
                try {
                    return JSON.parse(localStorage.getItem(latestKey));
                } catch (err) {
                    console.error('Error parsing stored analysis:', err);
                }
            }
            return null;
        }

        showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.innerHTML = `
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            `;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.classList.add('show');
            }, 100);

            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }

        attachEventListeners() {
            // Add any additional event listeners for interactive elements
            document.querySelectorAll('.task-item input[type="checkbox"]').forEach(checkbox => {
                checkbox.addEventListener('change', (e) => {
                    if (e.target.checked) {
                        this.showNotification('Task marked as complete!', 'success');
                    }
                });
            });
        }
    }

    // Initialize and expose globally
    window.enhancedOutputManager = new EnhancedOutputManager();

    // Add styles
    const styles = `
        <style>
            .enhanced-output-container {
                padding: 20px;
                max-width: 1400px;
                margin: 0 auto;
            }

            .output-header {
                text-align: center;
                margin-bottom: 30px;
                padding: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border-radius: 10px;
            }

            .output-title {
                font-size: 2.5em;
                margin-bottom: 10px;
            }

            .output-meta {
                display: flex;
                justify-content: center;
                gap: 30px;
                font-size: 1.1em;
            }

            .meta-item {
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .output-actions {
                display: flex;
                justify-content: center;
                gap: 15px;
                margin-bottom: 30px;
            }

            .card {
                background: white;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                margin-bottom: 25px;
                overflow: hidden;
            }

            .card-header {
                padding: 15px 20px;
                background: #f8f9fa;
                border-bottom: 2px solid #e9ecef;
            }

            .card-header h3 {
                margin: 0;
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .card-body {
                padding: 20px;
            }

            .executive-summary .summary-grid {
                display: grid;
                grid-template-columns: 200px 1fr;
                gap: 30px;
                margin-bottom: 20px;
            }

            .score-circle {
                width: 180px;
                height: 180px;
                border-radius: 50%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                position: relative;
            }

            .score-circle.excellent {
                background: linear-gradient(135deg, #28a745, #20c997);
                color: white;
            }

            .score-circle.good {
                background: linear-gradient(135deg, #17a2b8, #6f42c1);
                color: white;
            }

            .score-circle.fair {
                background: linear-gradient(135deg, #ffc107, #fd7e14);
                color: white;
            }

            .score-circle.poor {
                background: linear-gradient(135deg, #dc3545, #c82333);
                color: white;
            }

            .score-value {
                font-size: 3em;
            }

            .score-label {
                font-size: 0.9em;
                opacity: 0.9;
            }

            .score-trend {
                text-align: center;
                margin-top: 10px;
                font-size: 1.1em;
            }

            .insights-list {
                list-style: none;
                padding: 0;
            }

            .insights-list li {
                padding: 8px 0;
                border-bottom: 1px solid #e9ecef;
            }

            .summary-narrative {
                padding: 15px;
                background: #f8f9fa;
                border-radius: 8px;
                line-height: 1.6;
            }

            .dimension-meters {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }

            .dimension-meter {
                display: grid;
                grid-template-columns: 150px 1fr;
                align-items: center;
                gap: 15px;
            }

            .meter-bar {
                height: 30px;
                background: #e9ecef;
                border-radius: 15px;
                overflow: hidden;
            }

            .meter-fill {
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                transition: width 0.5s ease;
            }

            .strengths-weaknesses-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
            }

            .success-header {
                background: linear-gradient(135deg, #28a745, #20c997);
                color: white;
            }

            .warning-header {
                background: linear-gradient(135deg, #ffc107, #fd7e14);
                color: white;
            }

            .strength-list, .weakness-list {
                list-style: none;
                padding: 0;
            }

            .strength-item, .weakness-item {
                display: flex;
                align-items: flex-start;
                gap: 10px;
                padding: 10px;
                margin-bottom: 10px;
                background: #f8f9fa;
                border-radius: 8px;
            }

            .strength-item i {
                color: #28a745;
                margin-top: 3px;
            }

            .weakness-item i {
                color: #ffc107;
                margin-top: 3px;
            }

            .recommendations-list {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }

            .recommendation-item {
                border-left: 4px solid #6c757d;
                padding: 15px;
                background: #f8f9fa;
                border-radius: 0 8px 8px 0;
            }

            .recommendation-item.priority-high {
                border-left-color: #dc3545;
            }

            .recommendation-item.priority-medium {
                border-left-color: #ffc107;
            }

            .recommendation-item.priority-low {
                border-left-color: #28a745;
            }

            .rec-header {
                display: flex;
                align-items: center;
                gap: 15px;
                margin-bottom: 10px;
            }

            .rec-number {
                width: 30px;
                height: 30px;
                background: #6c757d;
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
            }

            .priority-badge {
                padding: 4px 10px;
                background: #6c757d;
                color: white;
                border-radius: 4px;
                font-size: 0.8em;
                margin-left: auto;
            }

            .rec-meta {
                display: flex;
                gap: 20px;
                margin-top: 10px;
                font-size: 0.9em;
                color: #6c757d;
            }

            .roadmap-timeline {
                position: relative;
                padding-left: 40px;
            }

            .roadmap-phase {
                display: flex;
                gap: 20px;
                margin-bottom: 30px;
                position: relative;
            }

            .phase-marker {
                width: 40px;
                height: 40px;
                background: #1a73e8;
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                position: absolute;
                left: -40px;
            }

            .phase-content {
                flex: 1;
                padding: 15px;
                background: #f8f9fa;
                border-radius: 8px;
            }

            .phase-tasks {
                margin: 15px 0;
            }

            .task-item {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 5px 0;
            }

            .metrics-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
            }

            .metric-card {
                display: flex;
                gap: 15px;
                padding: 15px;
                background: #f8f9fa;
                border-radius: 8px;
            }

            .metric-icon {
                font-size: 2em;
                color: #1a73e8;
            }

            .metric-content {
                flex: 1;
            }

            .metric-value {
                font-size: 1.5em;
                font-weight: bold;
                color: #333;
            }

            .metric-target {
                color: #6c757d;
                font-size: 0.9em;
            }

            .metric-progress {
                height: 8px;
                background: #e9ecef;
                border-radius: 4px;
                margin-top: 8px;
                overflow: hidden;
            }

            .progress-bar {
                height: 100%;
                background: #1a73e8;
                transition: width 0.5s ease;
            }

            .resources-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
            }

            .resource-item {
                text-align: center;
                padding: 20px;
                background: #f8f9fa;
                border-radius: 8px;
            }

            .resource-item i {
                color: #6c757d;
                margin-bottom: 15px;
            }

            .resource-item h4 {
                margin: 10px 0;
            }

            .resource-item p {
                color: #6c757d;
                font-size: 0.9em;
                margin-bottom: 15px;
            }

            .next-steps-list {
                padding-left: 20px;
            }

            .next-step-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px;
                margin-bottom: 10px;
                background: #f8f9fa;
                border-radius: 8px;
            }

            .cta-section {
                display: flex;
                justify-content: center;
                gap: 20px;
                margin-top: 30px;
            }

            .no-data-message {
                text-align: center;
                padding: 60px 20px;
            }

            .no-data-icon {
                color: #6c757d;
                margin-bottom: 20px;
            }

            .notification {
                position: fixed;
                bottom: 20px;
                right: 20px;
                padding: 15px 20px;
                background: white;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                display: flex;
                align-items: center;
                gap: 10px;
                transform: translateX(400px);
                transition: transform 0.3s ease;
                z-index: 10000;
            }

            .notification.show {
                transform: translateX(0);
            }

            .notification-success {
                border-left: 4px solid #28a745;
            }

            .notification-error {
                border-left: 4px solid #dc3545;
            }

            .notification-info {
                border-left: 4px solid #17a2b8;
            }

            .recommendation-item.highlight {
                animation: pulse 2s ease-in-out;
            }

            @keyframes pulse {
                0%, 100% { background-color: #f8f9fa; }
                50% { background-color: #fff3cd; }
            }

            @media (max-width: 768px) {
                .strengths-weaknesses-grid {
                    grid-template-columns: 1fr;
                }

                .executive-summary .summary-grid {
                    grid-template-columns: 1fr;
                }

                .output-meta {
                    flex-direction: column;
                    gap: 10px;
                }

                .output-actions {
                    flex-wrap: wrap;
                }
            }
        </style>
    `;

    // Inject styles
    if (!document.getElementById('enhanced-output-styles')) {
        const styleElement = document.createElement('div');
        styleElement.id = 'enhanced-output-styles';
        styleElement.innerHTML = styles;
        document.head.appendChild(styleElement);
    }

    console.log('✅ Enhanced Output Tab Module Loaded Successfully');
})();
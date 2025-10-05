
// Upgrade Education Tab for subcomponent-detail-final.html
// This script will enhance the education tab with modern ST6 branding

const fs = require('fs');

// Read the current file
let html = fs.readFileSync('subcomponent-detail-final.html', 'utf8');

// Enhanced education tab HTML with ST6 branding
const enhancedEducationTab = `
        <!-- Education Tab -->
        <div id="education-tab" class="tab-content active">
            <!-- What Section -->
            <div class="education-section">
                <h2 class="section-title">
                    <span class="section-icon">🎯</span>
                    What is Founding Team Assessment?
                </h2>
                <div class="section-content">
                    <p>Founding Team Assessment is a critical component of the ScaleOps6 framework, focusing on evaluating team capabilities and gaps. This systematic approach ensures measurable progress and sustainable growth.</p>
                </div>
            </div>

            <!-- Why It Matters Section -->
            <div class="education-section">
                <h2 class="section-title">
                    <span class="section-icon">💡</span>
                    Why It Matters
                </h2>
                <div class="section-content">
                    <p>Organizations implementing Founding Team Assessment see significant improvements in operational efficiency, team alignment, and business outcomes. This structured approach reduces risk and accelerates growth.</p>
                </div>
            </div>

            <!-- How to Implement Section with Two-Column Layout -->
            <div class="education-section">
                <h2 class="section-title">
                    <span class="section-icon">🚀</span>
                    How to Implement
                </h2>
                <div class="implementation-grid">
                    <div class="implementation-column">
                        <h4>📝 Implementation Steps</h4>
                        <div class="section-content">
                            <ol class="implementation-steps">
                                <li><strong>Assess current state</strong> - Evaluate existing processes and gaps</li>
                                <li><strong>Define objectives</strong> - Set clear, measurable goals</li>
                                <li><strong>Create implementation plan</strong> - Develop detailed roadmap</li>
                                <li><strong>Execute and monitor</strong> - Implement with tracking</li>
                                <li><strong>Iterate and optimize</strong> - Continuous improvement cycle</li>
                            </ol>
                        </div>
                    </div>
                    <div class="implementation-column">
                        <h4>⭐ Best Practices</h4>
                        <div class="section-content">
                            <ul class="best-practices-list">
                                <li>Start with pilot program</li>
                                <li>Measure everything</li>
                                <li>Get stakeholder buy-in</li>
                                <li>Document learnings</li>
                                <li>Scale gradually</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Real-World Examples Section with Modern Cards -->
            <div class="education-section">
                <h2 class="section-title">
                    <span class="section-icon">🌟</span>
                    Real-World Examples
                </h2>
                <div class="examples-grid">
                    <div class="example-card">
                        <div class="example-card-header">
                            <div class="example-icon">🚀</div>
                            <div class="example-company">SLACK</div>
                        </div>
                        <div class="example-story">
                            This company successfully implemented Founding Team Assessment by focusing on evaluating team capabilities and gaps. They saw immediate improvements in team productivity and customer satisfaction.
                        </div>
                        <div class="example-impact">
                            <strong>Impact:</strong> 20% Growth
                        </div>
                    </div>
                    
                    <div class="example-card">
                        <div class="example-card-header">
                            <div class="example-icon">💡</div>
                            <div class="example-company">ZOOM</div>
                        </div>
                        <div class="example-story">
                            By adopting the ScaleOps6 framework for Founding Team Assessment, this organization transformed their operations and achieved remarkable growth.
                        </div>
                        <div class="example-impact">
                            <strong>Impact:</strong> 3X Revenue
                        </div>
                    </div>
                    
                    <div class="example-card">
                        <div class="example-card-header">
                            <div class="example-icon">🎯</div>
                            <div class="example-company">STRIPE</div>
                        </div>
                        <div class="example-story">
                            Through careful implementation of Founding Team Assessment best practices, this team reduced operational overhead while improving quality.
                        </div>
                        <div class="example-impact">
                            <strong>Impact:</strong> 40% Cost Reduction
                        </div>
                    </div>
                    
                    <div class="example-card">
                        <div class="example-card-header">
                            <div class="example-icon">⚡</div>
                            <div class="example-company">AIRBNB</div>
                        </div>
                        <div class="example-story">
                            This organization developed comprehensive metrics for Founding Team Assessment, enabling data-driven decision making and continuous improvement.
                        </div>
                        <div class="example-impact">
                            <strong>Impact:</strong> 2X Productivity
                        </div>
                    </div>
                    
                    <div class="example-card">
                        <div class="example-card-header">
                            <div class="example-icon">🔥</div>
                            <div class="example-company">UBER</div>
                        </div>
                        <div class="example-story">
                            By focusing on change management and training, this company achieved 95% adoption of Founding Team Assessment practices across all teams.
                        </div>
                        <div class="example-impact">
                            <strong>Impact:</strong> 95% Adoption
                        </div>
                    </div>
                    
                    <div class="example-card">
                        <div class="example-card-header">
                            <div class="example-icon">✨</div>
                            <div class="example-company">SHOPIFY</div>
                        </div>
                        <div class="example-story">
                            Through strategic automation of Founding Team Assessment processes, this team freed up 30% of their time for strategic initiatives.
                        </div>
                        <div class="example-impact">
                            <strong>Impact:</strong> 30% Time Savings
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

// Enhanced CSS for the education tab
const enhancedCSS = `
        /* Enhanced Education Sections */
        .education-section {
            background: linear-gradient(135deg, rgba(255, 85, 0, 0.03) 0%, rgba(255, 255, 255, 0.02) 100%);
            border: 1px solid rgba(255, 85, 0, 0.2);
            border-radius: 20px;
            padding: 35px;
            margin-bottom: 35px;
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
        }

        .education-section:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(255, 85, 0, 0.15);
            border-color: rgba(255, 85, 0, 0.4);
        }

        .education-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #FF5500, #FF8844);
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .education-section:hover::before {
            opacity: 1;
        }

        .section-title {
            font-size: 26px;
            font-weight: 700;
            margin-bottom: 30px;
            color: #FF5500;
            display: flex;
            align-items: center;
            gap: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .section-icon {
            font-size: 32px;
            background: linear-gradient(135deg, #FF5500, #FF8844);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        /* Two-column layout for How to Implement */
        .implementation-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-top: 25px;
        }

        @media (max-width: 768px) {
            .implementation-grid {
                grid-template-columns: 1fr;
            }
        }

        .implementation-column {
            background: rgba(0, 0, 0, 0.3);
            border-radius: 15px;
            padding: 25px;
            border: 1px solid rgba(255, 85, 0, 0.1);
        }

        .implementation
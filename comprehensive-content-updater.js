/**
 * ScaleOps6 Platform - Comprehensive Content Updater
 * This script updates all 96 subcomponents with proper, specific content
 * from educational-content.js and the deliverables document
 */

const fs = require('fs');
const path = require('path');

// Load the educational content
const { educationalContent } = require('./educational-content.js');
const { missingContent } = require('./missing-content-additions.js');

// Merge the content sources
const allContent = { ...educationalContent, ...missingContent };

// Mapping of subcomponent IDs to educational content keys
const CONTENT_MAPPING = {
    // Block 1: Mission Discovery
    '1a': '1-1', // Problem Statement Definition
    '1b': '1-2', // Mission Statement
    '1c': '1-3', // Customer Insight Capture
    '1d': '1-4', // Founding Team Capability
    '1e': '1-5', // Market Insight Synthesis
    '1f': '1-6', // Prototype Launch Plan
    
    // Block 2: Customer Insights
    '2a': '2-1', // Interview Cadence Plan
    '2b': '2-2', // Personas Framework
    '2c': '2-3', // Pain Point Mapping
    '2d': '2-4', // Jobs to be Done (JTBD) Capture
    '2e': '2-5', // Signal Grading
    '2f': '2-6', // Insight-to-Action Loop
    
    // Block 3: Strategic Prioritization
    '3a': '3-1', // Use Case Scoring Model
    '3b': '3-2', // Segment Tiering
    '3c': '3-3', // Prioritization Rubric
    '3d': '3-4', // Tradeoff Tracker
    '3e': '3-5', // Hypothesis Board
    '3f': '3-6', // Decision Archive
    
    // Block 4: Prototype Launch
    '4a': '4-1', // Feature Inclusion Matrix
    '4b': '4-2', // Technical Scope Tracker
    '4c': '4-3', // Pilot Group Selection
    '4d': '4-4', // QA & Success Criteria
    '4e': '4-5', // Timeline Gantt or Roadmap
    '4f': '4-6', // Post-Mortem Template
    
    // Block 5: Early Adopter Wins
    '5a': '5-1', // Case Study Template
    '5b': '5-2', // ROI Calculation Sheet
    '5c': '5-3', // Use Case Spotlight
    '5d': '5-4', // Buyer Quotes & Testimonials
    '5e': '5-5', // Win Criteria Mapping
    '5f': '5-6', // Deal Debrief Framework
    
    // Block 6: Customer Engagement Flywheel
    '6a': '6-1', // Usage Heatmap
    '6b': '6-2', // Milestone Triggers
    '6c': '6-3', // CS Dashboard
    '6d': '6-4', // Activation Metric Model
    '6e': '6-5', // Feedback Collector
    '6f': '6-6', // Power User Behavior Signals
    
    // Block 7: Quantifiable Impact
    '7a': '7-1', // Time/Cost Savings Metrics
    '7b': '7-2', // Productivity Gains
    '7c': '7-3', // Outcome Tracking
    '7d': '7-4', // Benchmark Comparisons
    '7e': '7-5', // Attribution Models
    '7f': '7-6', // Executive Dashboard
    
    // Block 8: Customer Success Expansion
    '8a': '8-1', // Onboarding Playbook
    '8b': '8-2', // Health Score Algorithm
    '8c': '8-3', // Expansion Triggers
    '8d': '8-4', // Support Ticket Taxonomy
    '8e': '8-5', // Knowledge Base Structure
    '8f': '8-6', // Renewal Forecasting
    
    // Block 9: Proof Execution
    '9a': '9-1', // Inbound Conversion Rates
    '9b': '9-2', // Outbound Play Performance
    '9c': '9-3', // Channel Performance Metrics
    '9d': '9-4', // Sales Velocity Tracking
    '9e': '9-5', // Win Rate Analysis
    '9f': '9-6', // Pipeline Coverage Ratios
    
    // Block 10: Sales Team Empowerment
    '10a': '10-1', // Sales Hiring Profile
    '10b': '10-2', // Discovery Call Framework
    '10c': '10-3', // Demo Script Library
    '10d': '10-4', // Objection Response Matrix
    '10e': '10-5', // Commission Structure
    '10f': '10-6', // Pipeline Review Cadence
    
    // Block 11: High Performance Teams
    '11a': '11-1', // Team Structure Design
    '11b': '11-2', // Performance Metrics Framework
    '11c': '11-3', // Culture Codification
    '11d': '11-4', // Leadership Development Path
    '11e': '11-5', // Communication Protocols
    '11f': '11-6', // Talent Retention Strategy
    
    // Block 12: Customer Retention Systems
    '12a': '12-1', // Churn Prediction Model
    '12b': '12-2', // Win-Back Campaign Playbook
    '12c': '12-3', // Loyalty Program Design
    '12d': '12-4', // Pricing Optimization Framework
    '12e': '12-5', // Customer Advisory Board
    '12f': '12-6', // Engagement Scoring System
    
    // Block 13: Market Domination Strategies
    '13a': '13-1', // Category Narrative Canvas
    '13b': '13-2', // Strategic Moat Design
    '13c': '13-3', // Ecosystem Leverage Map
    '13d': '13-4', // Competitor GTM Monitoring
    '13e': '13-5', // Brand Architecture Plan
    '13f': '13-6', // Defensive GTM Tactics
    
    // Block 14: Operational Infrastructure
    '14a': '14-1', // System Architecture Diagram
    '14b': '14-2', // Revenue Engine Map
    '14c': '14-3', // Internal Dashboards
    '14d': '14-4', // Tool Consolidation Tracker
    '14e': '14-5', // RevOps Playbook
    '14f': '14-6', // Internal SLA Policy
    
    // Block 15: Leadership Expansion
    '15a': '15-1', // Executive Hiring Roadmap
    '15b': '15-2', // Board Governance Framework
    '15c': '15-3', // Succession Planning Matrix
    '15d': '15-4', // Stakeholder Alignment Plan
    '15e': '15-5', // Investor Relations Protocol
    '15f': '15-6', // Leadership Team Dynamics
    
    // Block 16: Global & Expansion Opportunities
    '16a': '16-1', // Market Entry Strategy
    '16b': '16-2', // Localization Roadmap
    '16c': '16-3', // Global Operations Playbook
    '16d': '16-4', // Regulatory Compliance Map
    '16e': '16-5', // Partnership Ecosystem Strategy
    '16f': '16-6', // Cultural Adaptation Framework
};

// Block names for reference
const BLOCK_NAMES = {
    1: "Mission Discovery",
    2: "Customer Insights", 
    3: "Strategic Prioritization",
    4: "Prototype Launch",
    5: "Early Adopter Wins",
    6: "Customer Engagement Flywheel",
    7: "Quantifiable Impact",
    8: "Customer Success Expansion",
    9: "Proof Execution",
    10: "Sales Team Empowerment",
    11: "High Performance Teams",
    12: "Customer Retention Systems",
    13: "Market Domination Strategies",
    14: "Operational Infrastructure",
    15: "Leadership Expansion",
    16: "Global & Expansion Opportunities"
};

/**
 * Generate proper content for a subcomponent
 */
function generateSubcomponentContent(subcomponentId) {
    const contentKey = CONTENT_MAPPING[subcomponentId];
    const content = allContent[contentKey];
    
    if (!content) {
        console.error(`No content found for subcomponent ${subcomponentId}`);
        return null;
    }
    
    // Extract block and subcomponent numbers
    const blockNum = parseInt(subcomponentId.match(/\d+/)[0]);
    const subLetter = subcomponentId.match(/[a-f]/)[0];
    const subNum = subLetter.charCodeAt(0) - 96; // Convert a=1, b=2, etc.
    
    // Generate workspace fields based on content
    const workspaceFields = generateWorkspaceFields(content, subcomponentId);
    
    // Generate analysis dimensions based on content
    const analysisDimensions = generateAnalysisDimensions(content, subcomponentId);
    
    return {
        title: content.title,
        blockName: BLOCK_NAMES[blockNum],
        education: {
            what: content.what,
            why: content.why,
            how: content.how || generateHowContent(content),
            examples: content.examples || [],
            templates: content.templates || [],
            metrics: content.metrics || []
        },
        workspace: workspaceFields,
        analysis: analysisDimensions,
        resources: generateResources(content),
        scoreHistory: true // Enable score history for all
    };
}

/**
 * Generate workspace fields specific to each subcomponent
 */
function generateWorkspaceFields(content, subcomponentId) {
    const baseFields = [
        {
            id: 'current_state',
            label: `Current ${content.title} Status`,
            type: 'textarea',
            placeholder: `Describe your current approach to ${content.title.toLowerCase()}...`,
            required: true
        },
        {
            id: 'target_outcome',
            label: 'Desired Outcome',
            type: 'textarea',
            placeholder: `What success looks like for ${content.title.toLowerCase()}...`,
            required: true
        },
        {
            id: 'key_challenges',
            label: 'Key Challenges',
            type: 'textarea',
            placeholder: 'Main obstacles or concerns...',
            required: false
        },
        {
            id: 'timeline',
            label: 'Implementation Timeline',
            type: 'select',
            options: ['Immediate', '1-2 weeks', '1 month', '3 months', '6+ months'],
            required: true
        },
        {
            id: 'resources_needed',
            label: 'Resources Required',
            type: 'textarea',
            placeholder: 'Team, budget, tools needed...',
            required: false
        },
        {
            id: 'success_metrics',
            label: 'Success Metrics',
            type: 'textarea',
            placeholder: `How you'll measure success for ${content.title.toLowerCase()}...`,
            required: true
        }
    ];
    
    return baseFields;
}

/**
 * Generate analysis dimensions specific to each subcomponent
 */
function generateAnalysisDimensions(content, subcomponentId) {
    // Use metrics from content if available
    if (content.metrics && content.metrics.length >= 5) {
        return content.metrics.slice(0, 5).map((metric, index) => ({
            id: `dimension_${index + 1}`,
            label: metric,
            score: 0,
            weight: 20,
            description: `Assessment of ${metric.toLowerCase()}`
        }));
    }
    
    // Default dimensions based on content type
    return [
        {
            id: 'completeness',
            label: 'Completeness',
            score: 0,
            weight: 20,
            description: `How complete is your ${content.title.toLowerCase()}?`
        },
        {
            id: 'quality',
            label: 'Quality',
            score: 0,
            weight: 20,
            description: `Quality and effectiveness of implementation`
        },
        {
            id: 'alignment',
            label: 'Strategic Alignment',
            score: 0,
            weight: 20,
            description: `Alignment with business objectives`
        },
        {
            id: 'adoption',
            label: 'Adoption/Usage',
            score: 0,
            weight: 20,
            description: `Level of adoption and regular usage`
        },
        {
            id: 'impact',
            label: 'Business Impact',
            score: 0,
            weight: 20,
            description: `Measurable impact on business outcomes`
        }
    ];
}

/**
 * Generate resources section
 */
function generateResources(content) {
    const resources = [];
    
    // Add tools if available
    if (content.workspace && content.workspace.tools) {
        resources.push({
            type: 'tools',
            title: 'Recommended Tools',
            items: content.workspace.tools
        });
    }
    
    // Add templates if available
    if (content.workspace && content.workspace.templates) {
        resources.push({
            type: 'templates',
            title: 'Templates & Frameworks',
            items: content.workspace.templates
        });
    }
    
    // Add best practices if available
    if (content.workspace && content.workspace.bestPractices) {
        resources.push({
            type: 'bestPractices',
            title: 'Best Practices',
            items: content.workspace.bestPractices
        });
    }
    
    return resources;
}

/**
 * Generate How content if not provided
 */
function generateHowContent(content) {
    let howContent = '<h4>Implementation Steps:</h4><ol>';
    
    // Generate steps based on content type
    howContent += '<li>Assess current state and gaps</li>';
    howContent += `<li>Define ${content.title.toLowerCase()} objectives</li>`;
    howContent += '<li>Develop implementation plan</li>';
    howContent += '<li>Execute and monitor progress</li>';
    howContent += '<li>Measure results and iterate</li>';
    howContent += '</ol>';
    
    if (content.examples && content.examples.length > 0) {
        howContent += '<h4>Examples:</h4><ul>';
        content.examples.forEach(example => {
            howContent += `<li>${example}</li>`;
        });
        howContent += '</ul>';
    }
    
    return howContent;
}

/**
 * Update a single HTML file with proper content
 */
function updateHTMLFile(filePath, subcomponentId) {
    try {
        // Read the current file
        let html = fs.readFileSync(filePath, 'utf8');
        
        // Generate the proper content
        const content = generateSubcomponentContent(subcomponentId);
        
        if (!content) {
            console.error(`Failed to generate content for ${subcomponentId}`);
            return false;
        }
        
        // Update the title
        html = html.replace(/<title>.*?<\/title>/, `<title>${content.title} - ${content.blockName} | ScaleOps6</title>`);
        
        // Update the main heading
        html = html.replace(/<h1[^>]*>.*?<\/h1>/, `<h1>${content.title}</h1>`);
        
        // Update Education tab content
        const educationContent = `
            <div class="content-section">
                <h3>What is ${content.title}?</h3>
                <p>${content.education.what}</p>
                
                <h3>Why It Matters</h3>
                <p>${content.education.why}</p>
                
                <h3>How to Implement</h3>
                ${content.education.how}
                
                ${content.education.examples.length > 0 ? `
                <h3>Examples</h3>
                <ul>
                    ${content.education.examples.map(ex => `<li>${ex}</li>`).join('')}
                </ul>
                ` : ''}
                
                ${content.education.metrics.length > 0 ? `
                <h3>Key Metrics</h3>
                <ul>
                    ${content.education.metrics.map(m => `<li>${m}</li>`).join('')}
                </ul>
                ` : ''}
            </div>
        `;
        
        // Replace education tab content
        html = html.replace(
            /<div id="education"[^>]*>[\s\S]*?<\/div>[\s\n]*<\/div>/,
            `<div id="education" class="tab-content active">
                ${educationContent}
            </div>`
        );
        
        // Update workspace fields
        const workspaceContent = `
            <form id="worksheetForm">
                ${content.workspace.map(field => `
                    <div class="form-group">
                        <label for="${field.id}">${field.label}${field.required ? ' *' : ''}</label>
                        ${field.type === 'textarea' ? 
                            `<textarea id="${field.id}" name="${field.id}" placeholder="${field.placeholder}" ${field.required ? 'required' : ''}></textarea>` :
                            field.type === 'select' ?
                            `<select id="${field.id}" name="${field.id}" ${field.required ? 'required' : ''}>
                                <option value="">Select...</option>
                                ${field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                            </select>` :
                            `<input type="${field.type}" id="${field.id}" name="${field.id}" placeholder="${field.placeholder}" ${field.required ? 'required' : ''}>`
                        }
                    </div>
                `).join('')}
                <button type="submit" class="submit-btn">Save Progress</button>
            </form>
        `;
        
        // Replace workspace content
        html = html.replace(
            /<div id="workspace"[^>]*>[\s\S]*?<\/div>[\s\n]*<\/div>/,
            `<div id="workspace" class="tab-content">
                ${workspaceContent}
            </div>`
        );
        
        // Update analysis dimensions
        const analysisContent = `
            <div class="analysis-grid">
                ${content.analysis.map(dim => `
                    <div class="dimension-card">
                        <h4>${dim.label}</h4>
                        <p>${dim.description}</p>
                        <div class="score-display">
                            <span class="score-value">${dim.score}</span>
                            <span class="score-label">/ 100</span>
                        </div>
                        <div class="weight-info">Weight: ${dim.weight}%</div>
                    </div>
                `).join('')}
            </div>
            <div class="overall-score">
                <h3>Overall Score</h3>
                <div class="score-circle">
                    <span class="score-number">0</span>
                    <span class="score-label">/ 100</span>
                </div>
            </div>
        `;
        
        // Replace analysis content
        html = html.replace(
            /<div id="analysis"[^>]*>[\s\S]*?<\/div>[\s\n]*<\/div>/,
            `<div id="analysis" class="tab-content">
                ${analysisContent}
            </div>`
        );
        
        // Update resources section
        const resourcesContent = `
            <div class="resources-grid">
                ${content.resources.map(section => `
                    <div class="resource-section">
                        <h3>${section.title}</h3>
                        <ul>
                            ${section.items.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Replace resources content
        html = html.replace(
            /<div id="resources"[^>]*>[\s\S]*?<\/div>[\s\n]*<\/div>/,
            `<div id="resources" class="tab-content">
                ${resourcesContent}
            </div>`
        );
        
        // Write the updated content back
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`✓ Updated ${path.basename(filePath)}`);
        return true;
        
    } catch (error) {
        console.error(`Error updating ${filePath}:`, error.message);
        return false;
    }
}

/**
 * Main function to update all subcomponent files
 */
function updateAllSubcomponents() {
    console.log('Starting comprehensive content update...\n');
    
    let successCount = 0;
    let failCount = 0;
    
    // Process each subcomponent
    Object.keys(CONTENT_MAPPING).forEach(subcomponentId => {
        const fileName = `subcomponent-${subcomponentId}-*.html`;
        const filePath = path.join(__dirname, `subcomponent-${subcomponentId}*.html`);
        
        // Find the actual file
        const files = fs.readdirSync(__dirname).filter(f => 
            f.startsWith(`subcomponent-${subcomponentId}-`) && f.endsWith('.html')
        );
        
        if (files.length > 0) {
            const actualPath = path.join(__dirname, files[0]);
            if (updateHTMLFile(actualPath, subcomponentId)) {
                successCount++;
            } else {
                failCount++;
            }
        } else {
            console.warn(`⚠ File not found for subcomponent ${subcomponentId}`);
            failCount++;
        }
    });
    
    console.log('\n' + '='.repeat(50));
    console.log('Update Complete!');
    console.log(`✓ Successfully updated: ${successCount} files`);
    if (failCount > 0) {
        console.log(`✗ Failed: ${failCount} files`);
    }
    console.log('='.repeat(50));
}

// Run the updater
if (require.main === module) {
    updateAllSubcomponents();
}

module.exports = { 
    generateSubcomponentContent, 
    updateHTMLFile, 
    updateAllSubcomponents 
};
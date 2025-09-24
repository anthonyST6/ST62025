// ScaleOps6 Platform - Locked Template Configuration
// This file defines the IMMUTABLE structure templates for all blocks and subcomponents
// DO NOT MODIFY THE STRUCTURE - Only content, agents, and scoring engines should change

const TEMPLATE_CONFIG = {
    // Version control for template structure
    version: "1.0.0",
    lockedDate: "2025-01-21",
    
    // MAIN PAGE STRUCTURE - LOCKED
    mainPageStructure: {
        layout: "grid",
        gridColumns: 3,
        blockHeight: "280px",
        blockSpacing: "20px",
        backgroundColor: "#000000",
        borderStyle: "2px solid rgba(255, 85, 0, 0.3)",
        borderRadius: "15px",
        hoverEffect: {
            transform: "translateY(-5px)",
            boxShadow: "0 10px 40px rgba(255, 85, 0, 0.3)",
            borderColor: "#FF5500"
        }
    },
    
    // BLOCK STRUCTURE - LOCKED (Mission Discovery as template)
    blockStructure: {
        // Visual structure
        header: {
            layout: "flex-between",
            numberPosition: "top-right",
            titleStyle: {
                fontSize: "32px",
                fontWeight: "800",
                textTransform: "uppercase",
                color: "#FF5500"
            },
            descriptionStyle: {
                fontSize: "18px",
                color: "#ccc",
                lineHeight: "1.6"
            }
        },
        
        // Score display
        scoreDisplay: {
            position: "center",
            size: "120px",
            fontSize: "48px",
            fontWeight: "900",
            animation: "pulse",
            colors: {
                high: "#4CAF50",    // 80-100
                medium: "#FF9800",  // 60-79
                low: "#F44336"      // 0-59
            }
        },
        
        // Subcomponents grid
        subcomponentsGrid: {
            columns: 2,
            gap: "15px",
            cardStyle: {
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "10px",
                padding: "15px",
                hoverTransform: "translateX(5px)"
            }
        },
        
        // Progress indicators
        progressBar: {
            show: true,
            position: "bottom",
            height: "4px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            fillColor: "#FF5500"
        }
    },
    
    // SUBCOMPONENT STRUCTURE - LOCKED (Problem Statement as template)
    subcomponentStructure: {
        // Page layout
        pageLayout: {
            breadcrumb: true,
            header: {
                border: "2px solid #FF5500",
                borderRadius: "15px",
                padding: "30px",
                numberPosition: "top-right"
            }
        },
        
        // Tab structure - IMMUTABLE
        tabs: [
            {
                id: "education",
                label: "📚 Education",
                order: 1,
                sections: [
                    "What Makes Great",
                    "Key Components",
                    "Common Pitfalls",
                    "Success Metrics",
                    "Best Practices"
                ]
            },
            {
                id: "workspace",
                label: "✏️ Workspace",
                order: 2,
                default: true,
                components: [
                    "interactiveWorksheet",
                    "uploadZone",
                    "actionButtons"
                ]
            },
            {
                id: "analysis",
                label: "🤖 Analysis",
                order: 3,
                requiresAgent: true
            },
            {
                id: "resources",
                label: "🔧 Resources",
                order: 4,
                sections: [
                    "templates",
                    "caseStudies"
                ]
            },
            {
                id: "history",
                label: "📊 Score History",
                order: 5,
                features: [
                    "clickableEntries",
                    "detailedPopups",
                    "trendAnalysis"
                ]
            }
        ],
        
        // Worksheet structure - LOCKED COUNT AND TYPES
        // IMPORTANT: Labels and placeholders should be CUSTOMIZED for each block/subcomponent
        // to reflect what that specific agent will score on
        worksheetFields: [
            {
                id: "field-1",
                type: "input",  // LOCKED
                required: true,  // LOCKED
                // Label and placeholder are CUSTOMIZABLE per block/subcomponent
                label: "Who is affected? (Customer Persona)",  // Example for Problem Statement
                placeholder: "e.g., B2B SaaS founders with 10-50 employees"  // Example for Problem Statement
            },
            {
                id: "field-2",
                type: "textarea",  // LOCKED
                required: true,  // LOCKED
                label: "What is the problem?",  // Example for Problem Statement
                placeholder: "Describe the specific problem in 2-3 sentences..."  // Example for Problem Statement
            },
            {
                id: "field-3",
                type: "input",  // LOCKED
                required: true,  // LOCKED
                label: "When does it occur? (Context)",  // Example for Problem Statement
                placeholder: "e.g., During quarterly planning when trying to align teams"  // Example for Problem Statement
            },
            {
                id: "field-4",
                type: "textarea",  // LOCKED
                required: true,  // LOCKED
                label: "What is the impact? (Metrics)",  // Example for Problem Statement
                placeholder: "e.g., 20 hours/month wasted, $50K in lost productivity, 30% project delays"  // Example for Problem Statement
            },
            {
                id: "field-5",
                type: "textarea",  // LOCKED
                required: true,  // LOCKED
                label: "How are they solving it today?",  // Example for Problem Statement
                placeholder: "Describe current alternatives and their shortcomings..."  // Example for Problem Statement
            },
            {
                id: "field-6",
                type: "textarea",  // LOCKED
                required: true,  // LOCKED
                label: "Evidence & Validation",  // Example for Problem Statement
                placeholder: "Customer quotes, data points, research findings..."  // Example for Problem Statement
            }
        ],
        
        // Analysis display structure - LOCKED
        analysisDisplay: {
            sections: [
                {
                    id: "overallScore",
                    type: "hero",
                    showConfidence: true,
                    showExecutiveSummary: true
                },
                {
                    id: "detailedScores",
                    type: "dimensions",
                    layout: "stacked",
                    showProsAndCons: true,
                    showPercentage: true
                },
                {
                    id: "recommendations",
                    type: "cards",
                    clickable: true,
                    showPriority: true,
                    showImpact: true,
                    maxDisplay: 5
                },
                {
                    id: "actionButtons",
                    type: "footer",
                    buttons: ["refineWorksheet", "viewHistory"]
                }
            ]
        },
        
        // Score history structure - LOCKED
        scoreHistoryDisplay: {
            clickableEntries: true,
            showImprovement: true,
            showSource: true,
            insights: {
                currentScore: true,
                averageScore: true,
                bestScore: true,
                totalAnalyses: true
            },
            entryFormat: {
                showDate: true,
                showTime: true,
                showIcon: true,
                showArrow: true
            }
        }
    },
    
    // AGENT INTEGRATION STRUCTURE - LOCKED
    agentIntegration: {
        // How agents integrate with the UI
        inputSource: "worksheetData",
        outputFormat: {
            score: "number (0-100)",
            confidence: "number (0-1)",
            timestamp: "ISO 8601",
            analysis: {
                executiveSummary: "string",
                strengthsAndWeaknesses: "object",
                criticalGaps: "array",
                opportunities: "array"
            },
            detailedScores: {
                // Each dimension must have these fields
                structure: {
                    score: "number",
                    maxScore: "number (20)",
                    percentage: "number",
                    weight: "number",
                    feedback: "string (with ✓ and ✗ markers)"
                }
            },
            recommendations: {
                // Each recommendation must have these fields
                structure: {
                    priority: "CRITICAL|HIGH|MEDIUM",
                    area: "string",
                    actionPlan: "array",
                    impact: "string",
                    expectedImprovement: "number",
                    resources: "array",
                    successMetrics: "array",
                    detailedAnalysis: "object"
                }
            }
        }
    },
    
    // SCORING ENGINE STRUCTURE - LOCKED
    scoringEngineStructure: {
        // Deterministic scoring rules
        dimensions: 5,
        maxScorePerDimension: 20,
        totalMaxScore: 100,
        
        // Score calculation method - IMMUTABLE
        calculationMethod: "weighted_average",
        weights: {
            dimension1: 20,
            dimension2: 20,
            dimension3: 20,
            dimension4: 20,
            dimension5: 20
        },
        
        // Score persistence
        autoSave: true,
        saveToHistory: true,
        updateBlockScore: true
    },
    
    // VISUAL THEME - LOCKED
    visualTheme: {
        primaryColor: "#FF5500",
        backgroundColor: "#000000",
        cardBackground: "rgba(255, 255, 255, 0.02)",
        borderColor: "rgba(255, 255, 255, 0.1)",
        textColors: {
            primary: "#ffffff",
            secondary: "#ccc",
            muted: "#999",
            accent: "#FF5500"
        },
        statusColors: {
            success: "#4CAF50",
            warning: "#FF9800",
            error: "#F44336",
            info: "#2196F3"
        },
        animations: {
            hover: "translateY(-3px)",
            click: "scale(0.98)",
            pulse: "pulse 2s infinite"
        }
    },
    
    // INTERACTION PATTERNS - LOCKED
    interactionPatterns: {
        autoSave: {
            enabled: true,
            delay: 2000,
            showNotification: false
        },
        navigation: {
            breadcrumbs: true,
            progressIndicators: true,
            tabMemory: true
        },
        feedback: {
            notifications: true,
            position: "top-right",
            duration: 5000
        },
        popups: {
            scoreHistory: true,
            recommendations: true,
            escapeToClose: true,
            clickOutsideToClose: true
        }
    },
    
    // CONTENT CUSTOMIZATION RULES
    // These are the ONLY things that should change between blocks/subcomponents
    customizableElements: {
        content: {
            titles: true,
            descriptions: true,
            worksheetFieldLabels: true,  // IMPORTANT: Customize to match agent scoring criteria
            worksheetFieldPlaceholders: true,  // IMPORTANT: Provide relevant examples for each block
            helpText: true,
            examples: true,
            caseStudies: true
        },
        agents: {
            analysisLogic: true,
            scoringRules: true,
            recommendations: true,
            insights: true
        },
        resources: {
            templates: true,
            links: true,
            documents: true,
            videos: true
        }
    },
    
    // STRUCTURE VALIDATION
    validateStructure: function(component) {
        // This function ensures no structural changes are made
        const errors = [];
        
        // Check tab structure
        if (component.tabs && component.tabs.length !== this.subcomponentStructure.tabs.length) {
            errors.push("Tab structure has been modified - reverting to template");
        }
        
        // Check worksheet fields
        if (component.worksheetFields && component.worksheetFields.length !== this.subcomponentStructure.worksheetFields.length) {
            errors.push("Worksheet structure has been modified - reverting to template");
        }
        
        // Check scoring dimensions
        if (component.dimensions && component.dimensions !== this.scoringEngineStructure.dimensions) {
            errors.push("Scoring dimensions have been modified - reverting to template");
        }
        
        return errors;
    }
};

// Deep freeze function to recursively freeze all nested objects
function deepFreeze(obj) {
    // Retrieve the property names defined on obj
    Object.getOwnPropertyNames(obj).forEach(function(name) {
        const value = obj[name];
        
        // Freeze properties before freezing self
        if (value && typeof value === 'object' && !Object.isFrozen(value)) {
            deepFreeze(value);
        }
    });
    
    return Object.freeze(obj);
}

// Export for use across the platform
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TEMPLATE_CONFIG;
}

// Make available globally (works in both browser and Node.js)
if (typeof window !== 'undefined') {
    window.TEMPLATE_CONFIG = TEMPLATE_CONFIG;
}

// Deep freeze the entire configuration to prevent ANY modifications
deepFreeze(TEMPLATE_CONFIG);

// Additional explicit freezing for critical structures
Object.freeze(TEMPLATE_CONFIG.mainPageStructure);
Object.freeze(TEMPLATE_CONFIG.mainPageStructure.hoverEffect);
Object.freeze(TEMPLATE_CONFIG.blockStructure);
Object.freeze(TEMPLATE_CONFIG.blockStructure.header);
Object.freeze(TEMPLATE_CONFIG.blockStructure.header.titleStyle);
Object.freeze(TEMPLATE_CONFIG.blockStructure.header.descriptionStyle);
Object.freeze(TEMPLATE_CONFIG.blockStructure.scoreDisplay);
Object.freeze(TEMPLATE_CONFIG.blockStructure.scoreDisplay.colors);
Object.freeze(TEMPLATE_CONFIG.blockStructure.subcomponentsGrid);
Object.freeze(TEMPLATE_CONFIG.blockStructure.subcomponentsGrid.cardStyle);
Object.freeze(TEMPLATE_CONFIG.blockStructure.progressBar);
Object.freeze(TEMPLATE_CONFIG.subcomponentStructure);
Object.freeze(TEMPLATE_CONFIG.subcomponentStructure.pageLayout);
Object.freeze(TEMPLATE_CONFIG.subcomponentStructure.pageLayout.header);
Object.freeze(TEMPLATE_CONFIG.subcomponentStructure.tabs);
TEMPLATE_CONFIG.subcomponentStructure.tabs.forEach(tab => Object.freeze(tab));
Object.freeze(TEMPLATE_CONFIG.subcomponentStructure.worksheetFields);
TEMPLATE_CONFIG.subcomponentStructure.worksheetFields.forEach(field => Object.freeze(field));
Object.freeze(TEMPLATE_CONFIG.subcomponentStructure.analysisDisplay);
TEMPLATE_CONFIG.subcomponentStructure.analysisDisplay.sections.forEach(section => Object.freeze(section));
Object.freeze(TEMPLATE_CONFIG.subcomponentStructure.scoreHistoryDisplay);
Object.freeze(TEMPLATE_CONFIG.subcomponentStructure.scoreHistoryDisplay.insights);
Object.freeze(TEMPLATE_CONFIG.subcomponentStructure.scoreHistoryDisplay.entryFormat);
Object.freeze(TEMPLATE_CONFIG.agentIntegration);
Object.freeze(TEMPLATE_CONFIG.agentIntegration.outputFormat);
Object.freeze(TEMPLATE_CONFIG.agentIntegration.outputFormat.analysis);
Object.freeze(TEMPLATE_CONFIG.agentIntegration.outputFormat.detailedScores);
Object.freeze(TEMPLATE_CONFIG.agentIntegration.outputFormat.detailedScores.structure);
Object.freeze(TEMPLATE_CONFIG.agentIntegration.outputFormat.recommendations);
Object.freeze(TEMPLATE_CONFIG.agentIntegration.outputFormat.recommendations.structure);
Object.freeze(TEMPLATE_CONFIG.scoringEngineStructure);
Object.freeze(TEMPLATE_CONFIG.scoringEngineStructure.weights);
Object.freeze(TEMPLATE_CONFIG.visualTheme);
Object.freeze(TEMPLATE_CONFIG.visualTheme.textColors);
Object.freeze(TEMPLATE_CONFIG.visualTheme.statusColors);
Object.freeze(TEMPLATE_CONFIG.visualTheme.animations);
Object.freeze(TEMPLATE_CONFIG.interactionPatterns);
Object.freeze(TEMPLATE_CONFIG.interactionPatterns.autoSave);
Object.freeze(TEMPLATE_CONFIG.interactionPatterns.navigation);
Object.freeze(TEMPLATE_CONFIG.interactionPatterns.feedback);
Object.freeze(TEMPLATE_CONFIG.interactionPatterns.popups);
Object.freeze(TEMPLATE_CONFIG.customizableElements);
Object.freeze(TEMPLATE_CONFIG.customizableElements.content);
Object.freeze(TEMPLATE_CONFIG.customizableElements.agents);
Object.freeze(TEMPLATE_CONFIG.customizableElements.resources);

console.log('✅ Template Configuration Locked - Version', TEMPLATE_CONFIG.version);
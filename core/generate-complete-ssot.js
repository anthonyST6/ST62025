/**
 * Complete SSOT Registry Generator
 *
 * Ingests data from:
 * - agent-library.js (scoring dimensions, evaluation criteria)
 * - educational-content.js (what/why/how, examples, templates, metrics)
 * - agent-generated-questions-complete.js (questions)
 * - subcomponent-names-mapping.js (canonical names)
 * - agent-correct-mapping.js (agent assignments)
 * - template-registry.js (domain-aligned templates)
 *
 * Outputs: core/complete-ssot-registry.js
 *
 * Created: 2025-10-06
 * Updated: 2025-10-06 - Added template registry integration
 */

const fs = require('fs');
const path = require('path');

// Load all source data
const AgentLibrary = require('../agent-library.js');
const { educationalContent } = require('../educational-content.js');
const agentQuestions = require('../agent-generated-questions-complete.js');
const { SUBCOMPONENT_NAMES } = require('../subcomponent-names-mapping.js');
const { AGENT_CORRECT_MAPPING } = require('../agent-correct-mapping.js');
const { getTemplatesForDomain } = require('./template-registry.js');

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║  Complete SSOT Registry Generator                          ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

// Block metadata
const BLOCK_METADATA = {
    1: { name: "Mission Discovery", phase: 1, phaseName: "Idea Market Fit" },
    2: { name: "Customer Insights", phase: 1, phaseName: "Idea Market Fit" },
    3: { name: "Strategic Prioritization", phase: 2, phaseName: "Product Market Fit" },
    4: { name: "Prototype Launch", phase: 2, phaseName: "Product Market Fit" },
    5: { name: "Go-To-Market Strategy", phase: 3, phaseName: "Go-To Market" },
    6: { name: "Customer Engagement Flywheel", phase: 3, phaseName: "Go-To Market" },
    7: { name: "Quantifiable Impact", phase: 4, phaseName: "Scaling Impact" },
    8: { name: "Customer Success Expansion", phase: 4, phaseName: "Scaling Impact" },
    9: { name: "Proof Execution", phase: 4, phaseName: "Scaling Impact" },
    10: { name: "Sales Team Empowerment", phase: 4, phaseName: "Scaling Impact" },
    11: { name: "High Performance Teams", phase: 5, phaseName: "Scale" },
    12: { name: "Retention Systems", phase: 5, phaseName: "Scale" },
    13: { name: "Market Domination Strategies", phase: 5, phaseName: "Scale" },
    14: { name: "Operational Infrastructure", phase: 5, phaseName: "Scale" },
    15: { name: "Leadership Expansion", phase: 5, phaseName: "Scale" },
    16: { name: "Global Expansion Opportunities", phase: 5, phaseName: "Scale" }
};

/**
 * Get agent key for accessing agent library
 */
function getAgentKey(subcomponentId) {
    const [blockId, subId] = subcomponentId.split('-').map(Number);
    const letter = String.fromCharCode(96 + subId); // 1=a, 2=b, etc.
    
    // Try standard key first
    let key = `${blockId}${letter}`;
    if (AgentLibrary[key]) return key;
    
    // Try with -gtm suffix (Block 5)
    key = `${blockId}${letter}-gtm`;
    if (AgentLibrary[key]) return key;
    
    // Try with -lead suffix (Block 15)
    key = `${blockId}${letter}-lead`;
    if (AgentLibrary[key]) return key;
    
    // Return standard key as fallback
    return `${blockId}${letter}`;
}

/**
 * Get category for block
 */
function getCategoryForBlock(blockId) {
    const categories = {
        1: "foundation", 2: "research", 3: "strategy", 4: "execution",
        5: "gtm", 6: "engagement", 7: "impact", 8: "expansion",
        9: "sales", 10: "enablement", 11: "performance", 12: "retention",
        13: "market", 14: "operations", 15: "leadership", 16: "global"
    };
    return categories[blockId] || "general";
}

/**
 * Generate complete registry
 */
function generateCompleteRegistry() {
    const registry = {};
    let complete = 0;
    let incomplete = 0;
    const issues = [];
    
    console.log('Generating complete registry for all 96 subcomponents...\n');
    
    for (const [id, name] of Object.entries(SUBCOMPONENT_NAMES)) {
        const [blockId, subId] = id.split('-').map(Number);
        const blockMeta = BLOCK_METADATA[blockId];
        const agentName = AGENT_CORRECT_MAPPING[id];
        const agentKey = getAgentKey(id);
        
        // Get source data
        const agentData = AgentLibrary[agentKey];
        const eduData = educationalContent[id];
        const questionData = agentQuestions[id];
        
        // Track completeness
        const hasAgent = !!agentData;
        const hasEducation = !!eduData;
        const hasQuestions = !!questionData;
        
        if (hasAgent && hasEducation && hasQuestions) {
            complete++;
        } else {
            incomplete++;
            issues.push({
                id,
                name,
                missing: {
                    agent: !hasAgent,
                    education: !hasEducation,
                    questions: !hasQuestions
                }
            });
        }
        
        // Build complete registry entry
        registry[id] = {
            // ═══════════════════════════════════════
            // IDENTITY
            // ═══════════════════════════════════════
            id,
            name,
            blockId,
            blockName: blockMeta.name,
            subId,
            phase: blockMeta.phase,
            phaseName: blockMeta.phaseName,
            category: getCategoryForBlock(blockId),
            
            // ═══════════════════════════════════════
            // AGENT INFORMATION
            // ═══════════════════════════════════════
            agent: {
                name: agentName,
                key: agentKey,
                description: agentData?.description || `Expert in ${name}`,
                domain: name
            },
            
            // ═══════════════════════════════════════
            // EDUCATIONAL CONTENT
            // ═══════════════════════════════════════
            education: {
                title: name,
                what: eduData?.what || `Information about ${name}`,
                why: eduData?.why || `Understanding ${name} is critical for success`,
                how: eduData?.how || `Implementation guidance for ${name}`,
                examples: eduData?.examples || []
            },
            
            // ═══════════════════════════════════════
            // WORKSPACE/QUESTIONS
            // ═══════════════════════════════════════
            workspace: {
                domain: name,
                questions: questionData?.questions || [],
                tools: eduData?.workspace?.tools || [],
                templates: eduData?.workspace?.templates || eduData?.templates || [],
                bestPractices: eduData?.workspace?.bestPractices || []
            },
            
            // ═══════════════════════════════════════
            // ANALYSIS FRAMEWORK
            // ═══════════════════════════════════════
            analysis: {
                domain: name,
                dimensions: agentData?.scoringDimensions || [],
                evaluationCriteria: agentData?.evaluationCriteria || {}
            },
            
            // ═══════════════════════════════════════
            // RESOURCES/TEMPLATES
            // ═══════════════════════════════════════
            resources: {
                domain: name,
                templates: getTemplatesForDomain(name), // ✅ FROM TEMPLATE REGISTRY
                metrics: eduData?.metrics || []
            },
            
            // ═══════════════════════════════════════
            // OUTPUTS (Generated Documents)
            // ═══════════════════════════════════════
            outputs: {
                domain: name,
                templates: getTemplatesForDomain(name) // ✅ SAME AS RESOURCES
            },
            
            // ═══════════════════════════════════════
            // VALIDATION RULES
            // ═══════════════════════════════════════
            validation: {
                requireDomainMatch: true,
                requireAgentAlignment: true,
                requireDimensionMatch: true,
                requireTemplateMatch: true,
                requireQuestionMatch: true,
                strictMode: true
            },
            
            // ═══════════════════════════════════════
            // METADATA
            // ═══════════════════════════════════════
            meta: {
                dependencies: subId > 1 ? [`${blockId}-${subId - 1}`] : [],
                createdAt: "2025-10-06",
                lastValidated: new Date().toISOString(),
                version: "2.0.0",
                dataSource: "complete-ssot-registry",
                completeness: {
                    hasAgent,
                    hasEducation,
                    hasQuestions,
                    isComplete: hasAgent && hasEducation && hasQuestions
                }
            }
        };
    }
    
    console.log('═══════════════════════════════════════════════════════════');
    console.log('GENERATION SUMMARY');
    console.log('═══════════════════════════════════════════════════════════\n');
    console.log(`Total Subcomponents: 96`);
    console.log(`Complete: ${complete} (${Math.round(complete/96*100)}%)`);
    console.log(`Incomplete: ${incomplete} (${Math.round(incomplete/96*100)}%)\n`);
    
    if (issues.length > 0) {
        console.log('Incomplete Subcomponents:');
        issues.forEach(issue => {
            console.log(`  ${issue.id}: ${issue.name}`);
            if (issue.missing.agent) console.log(`    - Missing agent data`);
            if (issue.missing.education) console.log(`    - Missing education data`);
            if (issue.missing.questions) console.log(`    - Missing questions`);
        });
        console.log('');
    }
    
    return registry;
}

/**
 * Write complete registry to file
 */
function writeCompleteRegistry(registry) {
    const fileContent = `/**
 * Complete SSOT Registry - Single Source of Truth
 * 
 * This registry contains ALL data for all 96 subcomponents:
 * - Identity and metadata
 * - Agent information and scoring dimensions
 * - Educational content (what/why/how)
 * - Workspace questions and tools
 * - Analysis dimensions and criteria
 * - Resource templates and metrics
 * - Output templates
 * 
 * Generated: ${new Date().toISOString()}
 * Version: 2.0.0
 * 
 * ALL systems should consume from this registry.
 * DO NOT edit manually - regenerate using core/generate-complete-ssot.js
 */

const COMPLETE_SSOT_REGISTRY = ${JSON.stringify(registry, null, 2)};

/**
 * Get complete subcomponent data
 */
function getSubcomponent(id) {
    const subcomponent = COMPLETE_SSOT_REGISTRY[id];
    if (!subcomponent) {
        throw new Error(\`Subcomponent not found: \${id}\`);
    }
    return subcomponent;
}

/**
 * Get all subcomponents for a block
 */
function getSubcomponentsForBlock(blockId) {
    return Object.values(COMPLETE_SSOT_REGISTRY)
        .filter(sub => sub.blockId === blockId)
        .sort((a, b) => a.subId - b.subId);
}

/**
 * Get all subcomponents for a phase
 */
function getSubcomponentsForPhase(phase) {
    return Object.values(COMPLETE_SSOT_REGISTRY)
        .filter(sub => sub.phase === phase)
        .sort((a, b) => {
            if (a.blockId !== b.blockId) return a.blockId - b.blockId;
            return a.subId - b.subId;
        });
}

/**
 * Validate domain consistency
 */
function validateDomainConsistency(subcomponentId) {
    const sub = getSubcomponent(subcomponentId);
    
    const domains = [
        sub.agent.domain,
        sub.education.title,
        sub.workspace.domain,
        sub.analysis.domain,
        sub.resources.domain,
        sub.outputs.domain
    ];
    
    const uniqueDomains = [...new Set(domains)];
    
    if (uniqueDomains.length > 1) {
        return {
            valid: false,
            error: \`Domain mismatch: \${uniqueDomains.join(', ')}\`
        };
    }
    
    if (uniqueDomains[0] !== sub.name) {
        return {
            valid: false,
            error: \`Domains don't match subcomponent name: \${uniqueDomains[0]} !== \${sub.name}\`
        };
    }
    
    return { valid: true };
}

/**
 * Get registry statistics
 */
function getRegistryStats() {
    const registry = Object.values(COMPLETE_SSOT_REGISTRY);
    
    return {
        total: registry.length,
        complete: registry.filter(s => s.meta.completeness.isComplete).length,
        byPhase: {
            1: registry.filter(s => s.phase === 1).length,
            2: registry.filter(s => s.phase === 2).length,
            3: registry.filter(s => s.phase === 3).length,
            4: registry.filter(s => s.phase === 4).length,
            5: registry.filter(s => s.phase === 5).length
        },
        sections: {
            withAgent: registry.filter(s => s.meta.completeness.hasAgent).length,
            withEducation: registry.filter(s => s.meta.completeness.hasEducation).length,
            withQuestions: registry.filter(s => s.meta.completeness.hasQuestions).length
        }
    };
}

// Export registry and utilities
module.exports = {
    COMPLETE_SSOT_REGISTRY,
    getSubcomponent,
    getSubcomponentsForBlock,
    getSubcomponentsForPhase,
    validateDomainConsistency,
    getRegistryStats
};

// Make available in browser
if (typeof window !== 'undefined') {
    window.COMPLETE_SSOT_REGISTRY = COMPLETE_SSOT_REGISTRY;
    window.getSubcomponent = getSubcomponent;
    window.validateDomainConsistency = validateDomainConsistency;
}
`;
    
    const outputPath = path.join(__dirname, 'complete-ssot-registry.js');
    fs.writeFileSync(outputPath, fileContent);
    console.log(`✅ Complete registry written: ${path.basename(outputPath)}`);
    console.log(`   File size: ${Math.round(fileContent.length / 1024)}KB\n`);
    
    return outputPath;
}

/**
 * Validate complete registry
 */
function validateCompleteRegistry(registry) {
    console.log('═══════════════════════════════════════════════════════════');
    console.log('VALIDATION');
    console.log('═══════════════════════════════════════════════════════════\n');
    
    let errors = 0;
    let warnings = 0;
    
    for (const [id, sub] of Object.entries(registry)) {
        // Check required sections
        const requiredSections = ['agent', 'education', 'workspace', 'analysis', 'resources', 'outputs'];
        requiredSections.forEach(section => {
            if (!sub[section]) {
                console.error(`❌ ${id}: Missing ${section} section`);
                errors++;
            }
        });
        
        // Check domain consistency
        if (sub.agent && sub.agent.domain !== sub.name) {
            console.error(`❌ ${id}: Agent domain mismatch`);
            errors++;
        }
        
        // Check analysis dimensions
        if (sub.analysis?.dimensions) {
            const totalWeight = sub.analysis.dimensions.reduce((sum, d) => sum + d.weight, 0);
            if (totalWeight !== 100 && totalWeight !== 0) {
                console.warn(`⚠️  ${id}: Dimension weights = ${totalWeight}% (should be 100%)`);
                warnings++;
            }
        }
        
        // Check templates
        if (!sub.resources?.templates || sub.resources.templates.length === 0) {
            console.warn(`⚠️  ${id}: No resource templates`);
            warnings++;
        }
        
        // Check questions
        if (!sub.workspace?.questions || sub.workspace.questions.length === 0) {
            console.error(`❌ ${id}: No workspace questions`);
            errors++;
        }
    }
    
    console.log(`\nValidation Results:`);
    console.log(`  Errors: ${errors}`);
    console.log(`  Warnings: ${warnings}\n`);
    
    return { errors, warnings };
}

/**
 * Main execution
 */
function main() {
    try {
        // Generate complete registry
        console.log('Step 1: Generating complete registry...\n');
        const registry = generateCompleteRegistry();
        
        // Validate
        console.log('Step 2: Validating complete registry...\n');
        const validation = validateCompleteRegistry(registry);
        
        if (validation.errors > 0) {
            console.error(`\n❌ Generation failed: ${validation.errors} errors found`);
            console.error('Fix errors and regenerate\n');
            process.exit(1);
        }
        
        // Write to file
        console.log('Step 3: Writing complete registry file...\n');
        const outputPath = writeCompleteRegistry(registry);
        
        // Summary
        console.log('═══════════════════════════════════════════════════════════');
        console.log('✅ COMPLETE SSOT REGISTRY GENERATED');
        console.log('═══════════════════════════════════════════════════════════\n');
        console.log(`File: ${path.basename(outputPath)}`);
        console.log(`Subcomponents: 96`);
        console.log(`Errors: ${validation.errors}`);
        console.log(`Warnings: ${validation.warnings}\n`);
        console.log('Next Steps:');
        console.log('  1. Review core/complete-ssot-registry.js');
        console.log('  2. Run: node core/validate-complete-ssot.js');
        console.log('  3. Update server to use complete registry');
        console.log('  4. Test all 96 subcomponents\n');
        
    } catch (error) {
        console.error('\n❌ Generation failed:', error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

// Run if executed directly
if (require.main === module) {
    main();
}

module.exports = { generateCompleteRegistry, validateCompleteRegistry };
/**
 * ScaleOps6 Subcomponent Registry - SINGLE SOURCE OF TRUTH
 * 
 * This is the canonical definition for all 96 subcomponents.
 * ALL other systems (agents, questions, worksheets, templates) MUST reference this registry.
 * 
 * Created: 2025-10-06
 * Purpose: Eliminate multi-layer mapping misalignment
 * Status: PRODUCTION READY
 */

// Load dependencies
const { SUBCOMPONENT_NAMES } = require('../subcomponent-names-mapping.js');
const { AGENT_CORRECT_MAPPING } = require('../agent-correct-mapping.js');

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
 * Generate complete registry from source mappings
 */
function generateRegistry() {
    const registry = {};
    
    for (const [id, name] of Object.entries(SUBCOMPONENT_NAMES)) {
        const [blockId, subId] = id.split('-').map(Number);
        const blockMeta = BLOCK_METADATA[blockId];
        const agentName = AGENT_CORRECT_MAPPING[id];
        
        registry[id] = {
            // Identity
            id,
            name,
            blockId,
            blockName: blockMeta.name,
            subId,
            
            // Phase Information
            phase: blockMeta.phase,
            phaseName: blockMeta.phaseName,
            
            // Agent Assignment
            agent: {
                name: agentName,
                domain: name,  // ✅ MUST match subcomponent name
                key: getAgentKey(id, agentName)
            },
            
            // Domain Consistency (ALL must match name)
            domains: {
                education: name,
                workspace: name,
                template: name,
                resource: name,
                analysis: name
            },
            
            // Validation Rules
            validation: {
                requireDomainMatch: true,
                requireAgentAlignment: true,
                allowedVariations: [],  // Empty = exact match only
                strictMode: true
            },
            
            // Metadata
            meta: {
                category: getCategoryForBlock(blockId),
                dependencies: getDependencies(id),
                createdAt: "2025-10-06",
                lastValidated: new Date().toISOString(),
                version: "1.0.0"
            }
        };
    }
    
    return registry;
}

/**
 * Get agent key for legacy compatibility
 */
function getAgentKey(subcomponentId, agentName) {
    const [blockId, subId] = subcomponentId.split('-').map(Number);
    const letter = String.fromCharCode(96 + subId); // 1=a, 2=b, etc.
    
    // Special cases for GTM and Leadership agents
    if (blockId === 5) return `${blockId}${letter}-gtm`;
    if (blockId === 15) return `${blockId}${letter}-lead`;
    
    return `${blockId}${letter}`;
}

/**
 * Get category for block
 */
function getCategoryForBlock(blockId) {
    const categories = {
        1: "foundation",
        2: "research",
        3: "strategy",
        4: "execution",
        5: "gtm",
        6: "engagement",
        7: "impact",
        8: "expansion",
        9: "sales",
        10: "enablement",
        11: "performance",
        12: "retention",
        13: "market",
        14: "operations",
        15: "leadership",
        16: "global"
    };
    return categories[blockId] || "general";
}

/**
 * Get dependencies for subcomponent
 */
function getDependencies(subcomponentId) {
    const [blockId, subId] = subcomponentId.split('-').map(Number);
    
    // First subcomponent of each block depends on previous block's completion
    if (subId === 1 && blockId > 1) {
        return [`${blockId - 1}-6`];  // Depends on last subcomponent of previous block
    }
    
    // Within a block, each subcomponent builds on previous
    if (subId > 1) {
        return [`${blockId}-${subId - 1}`];
    }
    
    return [];
}

// Generate the registry
const SUBCOMPONENT_REGISTRY = generateRegistry();

/**
 * Get subcomponent by ID
 */
function getSubcomponent(id) {
    const subcomponent = SUBCOMPONENT_REGISTRY[id];
    if (!subcomponent) {
        throw new Error(`Subcomponent not found: ${id}`);
    }
    return subcomponent;
}

/**
 * Get all subcomponents for a block
 */
function getSubcomponentsForBlock(blockId) {
    return Object.values(SUBCOMPONENT_REGISTRY)
        .filter(sub => sub.blockId === blockId)
        .sort((a, b) => a.subId - b.subId);
}

/**
 * Get all subcomponents for a phase
 */
function getSubcomponentsForPhase(phase) {
    return Object.values(SUBCOMPONENT_REGISTRY)
        .filter(sub => sub.phase === phase)
        .sort((a, b) => {
            if (a.blockId !== b.blockId) return a.blockId - b.blockId;
            return a.subId - b.subId;
        });
}

/**
 * Validate that a domain matches the subcomponent name
 */
function validateDomain(subcomponentId, domain, layerName) {
    const subcomponent = getSubcomponent(subcomponentId);
    
    if (domain !== subcomponent.name) {
        return {
            valid: false,
            error: {
                type: 'DOMAIN_MISMATCH',
                subcomponentId,
                layer: layerName,
                expected: subcomponent.name,
                actual: domain,
                severity: 'CRITICAL'
            }
        };
    }
    
    return { valid: true };
}

/**
 * Get registry statistics
 */
function getRegistryStats() {
    const registry = Object.values(SUBCOMPONENT_REGISTRY);
    
    return {
        total: registry.length,
        byPhase: {
            1: registry.filter(s => s.phase === 1).length,
            2: registry.filter(s => s.phase === 2).length,
            3: registry.filter(s => s.phase === 3).length,
            4: registry.filter(s => s.phase === 4).length,
            5: registry.filter(s => s.phase === 5).length
        },
        byBlock: Object.keys(BLOCK_METADATA).reduce((acc, blockId) => {
            acc[blockId] = registry.filter(s => s.blockId === parseInt(blockId)).length;
            return acc;
        }, {}),
        categories: registry.reduce((acc, sub) => {
            acc[sub.meta.category] = (acc[sub.meta.category] || 0) + 1;
            return acc;
        }, {})
    };
}

// Export registry and utilities
module.exports = {
    SUBCOMPONENT_REGISTRY,
    getSubcomponent,
    getSubcomponentsForBlock,
    getSubcomponentsForPhase,
    validateDomain,
    getRegistryStats,
    BLOCK_METADATA
};

// Make available in browser
if (typeof window !== 'undefined') {
    window.SUBCOMPONENT_REGISTRY = SUBCOMPONENT_REGISTRY;
    window.getSubcomponent = getSubcomponent;
    window.validateDomain = validateDomain;
}
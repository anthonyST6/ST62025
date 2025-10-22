/**
 * Template Field Mapper
 * Maps analysis results to template fields for auto-population
 * Implements the permanent structure + dynamic data pattern
 */

class TemplateFieldMapper {
    constructor() {
        // Define mapping rules for each subcomponent type
        this.mappingRules = this._initializeMappingRules();
    }

    /**
     * Map analysis results to template fields
     * @param {string} subcomponentId - Format: "1-1", "2-3", etc.
     * @param {object} analysisResults - Results from analysis engine
     * @param {object} worksheetData - Original worksheet data
     * @returns {object} Mapped template data
     */
    mapAnalysisToTemplate(subcomponentId, analysisResults, worksheetData = {}) {
        console.log(`📋 Mapping analysis to template for ${subcomponentId}`);

        const mappingRule = this.mappingRules[subcomponentId];
        if (!mappingRule) {
            console.warn(`⚠️ No mapping rule for ${subcomponentId}, using default mapping`);
            return this._defaultMapping(analysisResults, worksheetData);
        }

        const mappedData = {};

        // Apply field mappings
        for (const [templateField, mapping] of Object.entries(mappingRule.fields)) {
            mappedData[templateField] = this._applyMapping(
                mapping,
                analysisResults,
                worksheetData
            );
        }

        // Add metadata
        mappedData._metadata = {
            subcomponentId,
            mappedAt: new Date().toISOString(),
            analysisScore: analysisResults.score,
            version: '1.0'
        };

        return mappedData;
    }

    /**
     * Apply a single field mapping
     */
    _applyMapping(mapping, analysisResults, worksheetData) {
        if (typeof mapping === 'function') {
            return mapping(analysisResults, worksheetData);
        }

        if (typeof mapping === 'string') {
            // Direct field mapping
            return this._getNestedValue(analysisResults, mapping) ||
                   this._getNestedValue(worksheetData, mapping) ||
                   '';
        }

        if (mapping.source === 'analysis') {
            return this._getNestedValue(analysisResults, mapping.field) || mapping.default || '';
        }

        if (mapping.source === 'worksheet') {
            return this._getNestedValue(worksheetData, mapping.field) || mapping.default || '';
        }

        return mapping.default || '';
    }

    /**
     * Get nested object value by path
     */
    _getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }

    /**
     * Default mapping when no specific rule exists
     */
    _defaultMapping(analysisResults, worksheetData) {
        return {
            overall_score: analysisResults.score || 0,
            summary: analysisResults.summary || '',
            strengths: analysisResults.strengths || [],
            weaknesses: analysisResults.weaknesses || [],
            recommendations: analysisResults.recommendations || [],
            worksheet_data: worksheetData,
            _metadata: {
                mappedAt: new Date().toISOString(),
                analysisScore: analysisResults.score
            }
        };
    }

    /**
     * Initialize mapping rules for all subcomponents
     */
    _initializeMappingRules() {
        return {
            // ============================================================================
            // BLOCK 1: MISSION DISCOVERY
            // ============================================================================
            '1-1': {
                name: 'Problem Statement Definition',
                fields: {
                    problem_title: { source: 'worksheet', field: 'who-affected', default: '' },
                    target_audience: { source: 'worksheet', field: 'who-affected', default: '' },
                    problem_scope: { source: 'worksheet', field: 'what-problem', default: '' },
                    current_situation: { source: 'worksheet', field: 'how-solving', default: '' },
                    pain_points: { source: 'worksheet', field: 'what-problem', default: '' },
                    impact_metrics: { source: 'worksheet', field: 'what-impact', default: '' },
                    validation_evidence: { source: 'worksheet', field: 'evidence-validation', default: '' },
                    overall_score: { source: 'analysis', field: 'score', default: 0 },
                    strengths: { source: 'analysis', field: 'strengths', default: [] },
                    weaknesses: { source: 'analysis', field: 'weaknesses', default: [] },
                    recommendations: { source: 'analysis', field: 'recommendations', default: [] }
                }
            },

            '1-2': {
                name: 'Mission Statement',
                fields: {
                    mission_statement: { source: 'worksheet', field: 'mission-statement', default: '' },
                    vision_statement: { source: 'worksheet', field: 'vision-statement', default: '' },
                    core_values: { source: 'worksheet', field: 'core-values', default: '' },
                    market_opportunity: { source: 'worksheet', field: 'market-opportunity', default: '' },
                    competitive_advantage: { source: 'worksheet', field: 'competitive-advantage', default: '' },
                    team_fit: { source: 'worksheet', field: 'team-fit', default: '' },
                    overall_score: { source: 'analysis', field: 'score', default: 0 },
                    strengths: { source: 'analysis', field: 'strengths', default: [] },
                    weaknesses: { source: 'analysis', field: 'weaknesses', default: [] },
                    recommendations: { source: 'analysis', field: 'recommendations', default: [] }
                }
            },

            '1-3': {
                name: 'Customer Insight Capture',
                fields: {
                    interview_count: { source: 'worksheet', field: 'interview-count', default: 0 },
                    key_insights: { source: 'worksheet', field: 'key-insights', default: '' },
                    pain_points: { source: 'worksheet', field: 'pain-points', default: '' },
                    customer_quotes: { source: 'worksheet', field: 'customer-quotes', default: '' },
                    patterns_identified: { source: 'worksheet', field: 'patterns', default: '' },
                    overall_score: { source: 'analysis', field: 'score', default: 0 },
                    strengths: { source: 'analysis', field: 'strengths', default: [] },
                    weaknesses: { source: 'analysis', field: 'weaknesses', default: [] },
                    recommendations: { source: 'analysis', field: 'recommendations', default: [] }
                }
            },

            '1-4': {
                name: 'Founding Team Capability',
                fields: {
                    team_members: { source: 'worksheet', field: 'team-members', default: '' },
                    key_skills: { source: 'worksheet', field: 'key-skills', default: '' },
                    experience: { source: 'worksheet', field: 'experience', default: '' },
                    gaps: { source: 'worksheet', field: 'gaps', default: '' },
                    hiring_plan: { source: 'worksheet', field: 'hiring-plan', default: '' },
                    overall_score: { source: 'analysis', field: 'score', default: 0 },
                    strengths: { source: 'analysis', field: 'strengths', default: [] },
                    weaknesses: { source: 'analysis', field: 'weaknesses', default: [] },
                    recommendations: { source: 'analysis', field: 'recommendations', default: [] }
                }
            },

            '1-5': {
                name: 'Market Insight Synthesis',
                fields: {
                    market_size: { source: 'worksheet', field: 'market-size', default: '' },
                    growth_rate: { source: 'worksheet', field: 'growth-rate', default: '' },
                    key_trends: { source: 'worksheet', field: 'key-trends', default: '' },
                    competitors: { source: 'worksheet', field: 'competitors', default: '' },
                    market_timing: { source: 'worksheet', field: 'market-timing', default: '' },
                    overall_score: { source: 'analysis', field: 'score', default: 0 },
                    strengths: { source: 'analysis', field: 'strengths', default: [] },
                    weaknesses: { source: 'analysis', field: 'weaknesses', default: [] },
                    recommendations: { source: 'analysis', field: 'recommendations', default: [] }
                }
            },

            '1-6': {
                name: 'Prototype Launch Plan',
                fields: {
                    features: { source: 'worksheet', field: 'features', default: '' },
                    timeline: { source: 'worksheet', field: 'timeline', default: '' },
                    pilot_group: { source: 'worksheet', field: 'pilot-group', default: '' },
                    success_criteria: { source: 'worksheet', field: 'success-criteria', default: '' },
                    risks: { source: 'worksheet', field: 'risks', default: '' },
                    overall_score: { source: 'analysis', field: 'score', default: 0 },
                    strengths: { source: 'analysis', field: 'strengths', default: [] },
                    weaknesses: { source: 'analysis', field: 'weaknesses', default: [] },
                    recommendations: { source: 'analysis', field: 'recommendations', default: [] }
                }
            },

            // ============================================================================
            // BLOCK 2: CUSTOMER INSIGHTS
            // ============================================================================
            '2-1': {
                name: 'Interview Cadence Plan',
                fields: {
                    interview_frequency: { source: 'worksheet', field: 'frequency', default: '' },
                    target_segments: { source: 'worksheet', field: 'segments', default: '' },
                    question_framework: { source: 'worksheet', field: 'questions', default: '' },
                    documentation_process: { source: 'worksheet', field: 'documentation', default: '' },
                    overall_score: { source: 'analysis', field: 'score', default: 0 },
                    recommendations: { source: 'analysis', field: 'recommendations', default: [] }
                }
            },

            '2-2': {
                name: 'Personas Framework',
                fields: {
                    persona_count: { source: 'worksheet', field: 'persona-count', default: 0 },
                    persona_details: { source: 'worksheet', field: 'personas', default: '' },
                    use_cases: { source: 'worksheet', field: 'use-cases', default: '' },
                    pain_points: { source: 'worksheet', field: 'pain-points', default: '' },
                    overall_score: { source: 'analysis', field: 'score', default: 0 },
                    recommendations: { source: 'analysis', field: 'recommendations', default: [] }
                }
            },

            // Add more mappings for remaining subcomponents...
            // For now, all unmapped subcomponents will use default mapping
        };
    }

    /**
     * Get all available mapping rules
     */
    getAvailableMappings() {
        return Object.keys(this.mappingRules);
    }

    /**
     * Check if mapping exists for subcomponent
     */
    hasMappingFor(subcomponentId) {
        return !!this.mappingRules[subcomponentId];
    }
}

module.exports = TemplateFieldMapper;
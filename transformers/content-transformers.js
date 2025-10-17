/**
 * Content Transformers
 * Transform raw data into consistent structures for rendering
 */

/**
 * Real World Examples Transformer
 * Ensures consistent structure for real world examples
 */
class RealWorldExamplesTransformer {
    transform(data, subcomponentId) {
        if (!data || !Array.isArray(data)) {
            return [];
        }

        // Map each example to consistent structure
        return data.map((example, index) => {
            try {
                return this.transformExample(example, subcomponentId, index);
            } catch (error) {
                console.error(`Error transforming example ${index}:`, error);
                return null;
            }
        }).filter(Boolean); // Remove any null entries
    }

    transformExample(example, subcomponentId, index) {
        // Handle different data structures
        const transformed = {
            id: example.id || `${subcomponentId}-example-${index}`,
            company: this.extractCompany(example),
            useCase: this.extractUseCase(example),
            valuation: this.extractValuation(example),
            year: this.extractYear(example),
            category: this.extractCategory(example, subcomponentId),
            metrics: this.extractMetrics(example),
            tags: this.extractTags(example),
            source: example.source || 'database'
        };

        // Validate transformed data
        if (!transformed.company || !transformed.useCase) {
            console.warn(`Incomplete example transformation for ${transformed.id}`);
        }

        return transformed;
    }

    extractCompany(example) {
        return example.company || 
               example.name || 
               example.companyName || 
               example.organization || 
               'Unknown Company';
    }

    extractUseCase(example) {
        return example.useCase || 
               example.job || 
               example.description || 
               example.problem || 
               example.solution ||
               'No description available';
    }

    extractValuation(example) {
        const val = example.valuation || 
                   example.value || 
                   example.metric || 
                   example.worth;
        
        // Ensure proper formatting
        if (val) {
            // If it's a number, format it
            if (typeof val === 'number') {
                return this.formatCurrency(val);
            }
            // If it doesn't start with $, add it
            if (typeof val === 'string' && !val.startsWith('$')) {
                return `$${val}`;
            }
            return val;
        }
        
        return 'N/A';
    }

    extractYear(example) {
        const year = example.year || 
                    example.founded || 
                    example.establishedYear || 
                    example.startYear;
        
        // Validate year
        if (year) {
            const yearNum = parseInt(year);
            if (yearNum > 1800 && yearNum <= new Date().getFullYear()) {
                return yearNum;
            }
        }
        
        return null;
    }

    extractCategory(example, subcomponentId) {
        // Use provided category
        if (example.category) {
            return example.category;
        }

        // Infer from subcomponent ID
        if (subcomponentId) {
            const blockNumber = parseInt(subcomponentId.split('-')[0]);
            return this.getBlockCategory(blockNumber);
        }

        // Infer from tags or type
        if (example.type) {
            return example.type;
        }

        return 'General';
    }

    extractMetrics(example) {
        const metrics = {};
        
        // Extract various metric types
        if (example.revenue) metrics.revenue = example.revenue;
        if (example.users) metrics.users = example.users;
        if (example.growth) metrics.growth = example.growth;
        if (example.marketShare) metrics.marketShare = example.marketShare;
        if (example.employees) metrics.employees = example.employees;
        
        return Object.keys(metrics).length > 0 ? metrics : null;
    }

    extractTags(example) {
        const tags = [];
        
        // Extract from explicit tags
        if (example.tags) {
            if (Array.isArray(example.tags)) {
                tags.push(...example.tags);
            } else if (typeof example.tags === 'string') {
                tags.push(...example.tags.split(',').map(t => t.trim()));
            }
        }

        // Add industry if present
        if (example.industry) {
            tags.push(example.industry);
        }

        // Add sector if present
        if (example.sector) {
            tags.push(example.sector);
        }

        return tags.length > 0 ? tags : null;
    }

    formatCurrency(value) {
        if (value >= 1000000000) {
            return `$${(value / 1000000000).toFixed(1)}B`;
        } else if (value >= 1000000) {
            return `$${(value / 1000000).toFixed(1)}M`;
        } else if (value >= 1000) {
            return `$${(value / 1000).toFixed(1)}K`;
        }
        return `$${value}`;
    }

    getBlockCategory(blockNumber) {
        const categories = {
            1: 'Mission Discovery',
            2: 'Customer Insights',
            3: 'Strategic Prioritization',
            4: 'Prototype Launch',
            5: 'Go-to-Market Strategy',
            6: 'Customer Engagement Flywheel',
            7: 'Quantifiable Impact',
            8: 'Customer Success Expansion',
            9: 'Proof of Execution',
            10: 'Sales Team Empowerment',
            11: 'High Performance Teams',
            12: 'Retention Systems',
            13: 'Market Domination Strategies',
            14: 'Operational Infrastructure',
            15: 'Leadership Expansion',
            16: 'Global Expansion Opportunities'
        };
        return categories[blockNumber] || 'General';
    }
}

/**
 * Education Content Transformer
 * Normalizes education content structure
 */
class EducationContentTransformer {
    transform(data, subcomponentId) {
        if (!data || typeof data !== 'object') {
            return {};
        }

        const transformed = {
            id: subcomponentId,
            overview: this.extractOverview(data),
            whyItMatters: this.extractWhyItMatters(data),
            howToImplement: this.extractHowToImplement(data),
            keyConcepts: this.extractKeyConcepts(data),
            bestPractices: this.extractBestPractices(data),
            commonPitfalls: this.extractCommonPitfalls(data),
            resources: this.extractResources(data),
            examples: this.extractExamples(data),
            metadata: this.extractMetadata(data)
        };

        // Remove null/undefined properties
        Object.keys(transformed).forEach(key => {
            if (transformed[key] === null || transformed[key] === undefined) {
                delete transformed[key];
            }
        });

        return transformed;
    }

    extractOverview(data) {
        return data.overview || 
               data.description || 
               data.summary || 
               data.introduction || 
               null;
    }

    extractWhyItMatters(data) {
        return data.whyItMatters || 
               data.importance || 
               data.significance || 
               data.value || 
               null;
    }

    extractHowToImplement(data) {
        return data.howToImplement || 
               data.implementation || 
               data.steps || 
               data.process || 
               null;
    }

    extractKeyConcepts(data) {
        const concepts = data.keyConcepts || 
                        data.concepts || 
                        data.keyPoints || 
                        data.mainIdeas;
        
        if (!concepts) return null;

        // Normalize to array format
        if (Array.isArray(concepts)) {
            return concepts;
        }

        // Convert object to array
        if (typeof concepts === 'object') {
            return Object.entries(concepts).map(([key, value]) => ({
                name: key,
                description: value
            }));
        }

        return null;
    }

    extractBestPractices(data) {
        const practices = data.bestPractices || 
                         data.practices || 
                         data.recommendations || 
                         data.tips;
        
        // Ensure array format
        if (practices && !Array.isArray(practices)) {
            if (typeof practices === 'string') {
                return [practices];
            }
            if (typeof practices === 'object') {
                return Object.values(practices);
            }
        }

        return practices || null;
    }

    extractCommonPitfalls(data) {
        const pitfalls = data.commonPitfalls || 
                        data.pitfalls || 
                        data.mistakes || 
                        data.warnings || 
                        data.avoid;
        
        // Ensure array format
        if (pitfalls && !Array.isArray(pitfalls)) {
            if (typeof pitfalls === 'string') {
                return [pitfalls];
            }
            if (typeof pitfalls === 'object') {
                return Object.values(pitfalls);
            }
        }

        return pitfalls || null;
    }

    extractResources(data) {
        const resources = data.resources || 
                         data.references || 
                         data.links || 
                         data.furtherReading;
        
        if (!resources) return null;

        // Normalize resource format
        if (Array.isArray(resources)) {
            return resources.map(resource => {
                if (typeof resource === 'string') {
                    return { title: resource, type: 'text' };
                }
                return {
                    title: resource.title || resource.name || resource.text,
                    url: resource.url || resource.link,
                    type: resource.type || 'link',
                    description: resource.description
                };
            });
        }

        return null;
    }

    extractExamples(data) {
        return data.examples || 
               data.useCases || 
               data.scenarios || 
               null;
    }

    extractMetadata(data) {
        return {
            difficulty: data.difficulty || data.level,
            duration: data.duration || data.timeRequired,
            prerequisites: data.prerequisites || data.requirements,
            targetAudience: data.targetAudience || data.audience,
            lastUpdated: data.lastUpdated || data.updated
        };
    }
}

/**
 * Workspace Content Transformer
 * Normalizes workspace questions structure
 */
class WorkspaceContentTransformer {
    transform(data, subcomponentId) {
        if (!data) {
            return [];
        }

        let questions = [];

        // Extract questions from various formats
        if (Array.isArray(data)) {
            questions = data;
        } else if (data.questions && Array.isArray(data.questions)) {
            questions = data.questions;
        } else if (data.items && Array.isArray(data.items)) {
            questions = data.items;
        } else if (typeof data === 'object') {
            // Extract from object properties
            questions = this.extractQuestionsFromObject(data);
        }

        // Transform each question
        return questions.map((question, index) => 
            this.transformQuestion(question, index, subcomponentId)
        );
    }

    extractQuestionsFromObject(obj) {
        const questions = [];
        
        // Look for numbered properties
        const sortedKeys = Object.keys(obj).sort();
        for (const key of sortedKeys) {
            if (key.match(/^q\d+$/i) || key.match(/^question\d+$/i)) {
                questions.push(obj[key]);
            }
        }

        // If no numbered properties, treat each as a question
        if (questions.length === 0) {
            for (const [key, value] of Object.entries(obj)) {
                if (typeof value === 'string' || (typeof value === 'object' && value.text)) {
                    questions.push({
                        id: key,
                        ...((typeof value === 'object') ? value : { text: value })
                    });
                }
            }
        }

        return questions;
    }

    transformQuestion(question, index, subcomponentId) {
        // Handle string questions
        if (typeof question === 'string') {
            return {
                id: `${subcomponentId}-q${index + 1}`,
                text: question,
                type: 'text',
                required: true,
                order: index + 1
            };
        }

        // Transform object questions
        return {
            id: question.id || `${subcomponentId}-q${index + 1}`,
            text: question.text || question.question || question.label || '',
            type: this.normalizeQuestionType(question.type),
            required: question.required !== false,
            placeholder: question.placeholder || this.getDefaultPlaceholder(question.type),
            help: question.help || question.description || question.hint,
            options: this.normalizeOptions(question.options || question.choices),
            validation: this.extractValidation(question),
            order: question.order || index + 1,
            category: question.category || question.section,
            dependsOn: question.dependsOn || question.conditional
        };
    }

    normalizeQuestionType(type) {
        if (!type) return 'text';
        
        const typeMap = {
            'short': 'text',
            'long': 'textarea',
            'paragraph': 'textarea',
            'dropdown': 'select',
            'choice': 'radio',
            'multichoice': 'checkbox',
            'scale': 'rating',
            'slider': 'rating',
            'numeric': 'number',
            'integer': 'number',
            'decimal': 'number',
            'email': 'email',
            'url': 'url',
            'date': 'date',
            'time': 'time',
            'datetime': 'datetime-local'
        };

        return typeMap[type.toLowerCase()] || type.toLowerCase();
    }

    normalizeOptions(options) {
        if (!options) return null;
        
        if (!Array.isArray(options)) {
            return null;
        }

        return options.map(option => {
            if (typeof option === 'string') {
                return {
                    value: option,
                    label: option
                };
            }
            return {
                value: option.value || option.id || option.label,
                label: option.label || option.text || option.name || option.value,
                description: option.description
            };
        });
    }

    extractValidation(question) {
        const validation = {};
        
        if (question.validation) {
            return question.validation;
        }

        // Extract validation rules from question properties
        if (question.minLength !== undefined) validation.minLength = question.minLength;
        if (question.maxLength !== undefined) validation.maxLength = question.maxLength;
        if (question.min !== undefined) validation.min = question.min;
        if (question.max !== undefined) validation.max = question.max;
        if (question.pattern !== undefined) validation.pattern = question.pattern;
        if (question.step !== undefined) validation.step = question.step;

        return Object.keys(validation).length > 0 ? validation : null;
    }

    getDefaultPlaceholder(type) {
        const placeholders = {
            'text': 'Enter your answer...',
            'textarea': 'Provide a detailed response...',
            'number': 'Enter a number...',
            'email': 'your@email.com',
            'url': 'https://example.com',
            'date': 'MM/DD/YYYY',
            'time': 'HH:MM',
            'select': 'Select an option...'
        };
        return placeholders[type] || 'Enter your response...';
    }
}

/**
 * Generic Content Transformer
 * Default transformer that returns data as-is
 */
class GenericContentTransformer {
    transform(data, subcomponentId) {
        // Add subcomponent ID if not present
        if (data && typeof data === 'object' && !Array.isArray(data)) {
            data.subcomponentId = data.subcomponentId || subcomponentId;
        }
        return data;
    }
}

/**
 * Transformer Factory
 * Creates appropriate transformer for content type
 */
class TransformerFactory {
    static create(contentType) {
        switch (contentType) {
            case 'realWorldExamples':
                return new RealWorldExamplesTransformer();
            
            case 'education':
            case 'educationContent':
                return new EducationContentTransformer();
            
            case 'workspace':
            case 'questions':
                return new WorkspaceContentTransformer();
            
            default:
                return new GenericContentTransformer();
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        RealWorldExamplesTransformer,
        EducationContentTransformer,
        WorkspaceContentTransformer,
        GenericContentTransformer,
        TransformerFactory
    };
} else {
    window.RealWorldExamplesTransformer = RealWorldExamplesTransformer;
    window.EducationContentTransformer = EducationContentTransformer;
    window.WorkspaceContentTransformer = WorkspaceContentTransformer;
    window.GenericContentTransformer = GenericContentTransformer;
    window.TransformerFactory = TransformerFactory;
}
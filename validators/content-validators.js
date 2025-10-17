/**
 * Content Validators
 * Validation functions for different content types
 */

/**
 * Real World Examples Validator
 * Validates that real world examples have required fields
 */
class RealWorldExamplesValidator {
    validate(data) {
        // Check if data exists
        if (!data) {
            console.warn('❌ Real World Examples validation failed: No data');
            return false;
        }

        // Must be an array
        if (!Array.isArray(data)) {
            console.warn('❌ Real World Examples validation failed: Not an array');
            return false;
        }

        // Can be empty array (will trigger fallback)
        if (data.length === 0) {
            return true;
        }

        // Validate each example
        const isValid = data.every((example, index) => {
            // Must be an object
            if (typeof example !== 'object' || example === null) {
                console.warn(`❌ Example ${index} validation failed: Not an object`);
                return false;
            }

            // Must have company/name
            const hasCompany = example.company || example.name;
            if (!hasCompany) {
                console.warn(`❌ Example ${index} validation failed: Missing company/name`);
                return false;
            }

            // Must have use case/job/description
            const hasUseCase = example.useCase || example.job || example.description;
            if (!hasUseCase) {
                console.warn(`❌ Example ${index} validation failed: Missing use case`);
                return false;
            }

            // Should have valuation/metric (warning only)
            const hasMetric = example.valuation || example.value || example.metric;
            if (!hasMetric) {
                console.warn(`⚠️ Example ${index}: Missing valuation/metric (optional)`);
            }

            return true;
        });

        if (isValid) {
            console.log(`✅ Real World Examples validation passed: ${data.length} examples`);
        }

        return isValid;
    }
}

/**
 * Education Content Validator
 * Validates education content structure
 */
class EducationContentValidator {
    validate(data) {
        // Check if data exists
        if (!data) {
            console.warn('❌ Education Content validation failed: No data');
            return false;
        }

        // Must be an object
        if (typeof data !== 'object' || Array.isArray(data)) {
            console.warn('❌ Education Content validation failed: Not an object');
            return false;
        }

        // Check for empty object
        if (Object.keys(data).length === 0) {
            console.warn('⚠️ Education Content validation: Empty object');
            return true; // Allow empty, will show fallback
        }

        // Should have at least one of these key sections
        const keySections = [
            'overview', 'description',
            'whyItMatters', 'importance',
            'howToImplement', 'implementation',
            'keyConcepts', 'concepts',
            'bestPractices', 'practices',
            'resources'
        ];

        const hasKeySection = keySections.some(key => data[key]);
        
        if (!hasKeySection) {
            console.warn('⚠️ Education Content: No standard sections found');
        }

        console.log('✅ Education Content validation passed');
        return true;
    }
}

/**
 * Workspace Content Validator
 * Validates workspace/questionnaire content
 */
class WorkspaceContentValidator {
    validate(data) {
        // Check if data exists
        if (!data) {
            console.warn('❌ Workspace Content validation failed: No data');
            return false;
        }

        // Can be array of questions
        if (Array.isArray(data)) {
            return this.validateQuestionsArray(data);
        }

        // Can be object with questions property
        if (typeof data === 'object') {
            if (data.questions && Array.isArray(data.questions)) {
                return this.validateQuestionsArray(data.questions);
            }
            
            if (data.items && Array.isArray(data.items)) {
                return this.validateQuestionsArray(data.items);
            }

            // Check if object has question-like properties
            const hasQuestions = Object.keys(data).some(key => 
                key.match(/^q\d+$/i) || 
                key.match(/^question\d+$/i) ||
                (typeof data[key] === 'object' && (data[key].text || data[key].question))
            );

            if (!hasQuestions) {
                console.warn('⚠️ Workspace Content: No questions found in object');
                return true; // Allow, will show empty state
            }
        }

        console.log('✅ Workspace Content validation passed');
        return true;
    }

    validateQuestionsArray(questions) {
        if (!Array.isArray(questions)) {
            return false;
        }

        if (questions.length === 0) {
            console.warn('⚠️ Workspace Content: Empty questions array');
            return true; // Allow empty
        }

        // Validate each question
        const isValid = questions.every((question, index) => {
            // Can be a string (simple question)
            if (typeof question === 'string') {
                return true;
            }

            // If object, should have text/question/label
            if (typeof question === 'object' && question !== null) {
                const hasText = question.text || question.question || question.label;
                if (!hasText) {
                    console.warn(`⚠️ Question ${index}: Missing text`);
                }
                return true; // Still allow
            }

            return false;
        });

        return isValid;
    }
}

/**
 * Analysis Content Validator
 * Validates analysis results content
 */
class AnalysisContentValidator {
    validate(data) {
        if (!data) {
            console.warn('❌ Analysis Content validation failed: No data');
            return false;
        }

        // Should have score or results
        const hasResults = data.score !== undefined || 
                          data.results !== undefined || 
                          data.analysis !== undefined;

        if (!hasResults) {
            console.warn('⚠️ Analysis Content: No results found');
            return true; // Allow, will show empty state
        }

        console.log('✅ Analysis Content validation passed');
        return true;
    }
}

/**
 * Template Content Validator
 * Validates output template content
 */
class TemplateContentValidator {
    validate(data) {
        if (!data) {
            console.warn('❌ Template Content validation failed: No data');
            return false;
        }

        // Can be array of templates
        if (Array.isArray(data)) {
            return data.length > 0 || true; // Allow empty array
        }

        // Can be object with templates
        if (typeof data === 'object') {
            // Should have at least one template-like property
            const hasTemplates = Object.keys(data).some(key => 
                key.includes('template') || 
                key.includes('Template') ||
                (typeof data[key] === 'object' && (data[key].name || data[key].title))
            );

            if (!hasTemplates) {
                console.warn('⚠️ Template Content: No templates found');
            }
            return true;
        }

        return false;
    }
}

/**
 * Generic Content Validator
 * Basic validation for any content type
 */
class GenericContentValidator {
    validate(data) {
        // Basic validation - data exists and is not empty
        if (!data) {
            return false;
        }
        
        if (typeof data === 'object' && Object.keys(data).length === 0) {
            console.warn('⚠️ Generic validation: Empty object');
            return true; // Allow empty, will trigger fallback
        }
        
        if (Array.isArray(data) && data.length === 0) {
            console.warn('⚠️ Generic validation: Empty array');
            return true; // Allow empty, will trigger fallback
        }
        
        return true;
    }
}

/**
 * Composite Validator
 * Combines multiple validators
 */
class CompositeValidator {
    constructor(validators = []) {
        this.validators = validators;
    }

    addValidator(validator) {
        this.validators.push(validator);
    }

    validate(data) {
        // All validators must pass
        return this.validators.every(validator => {
            try {
                return validator.validate(data);
            } catch (error) {
                console.error('Validator error:', error);
                return false;
            }
        });
    }
}

/**
 * Validator Factory
 * Creates appropriate validator for content type
 */
class ValidatorFactory {
    static create(contentType) {
        switch (contentType) {
            case 'realWorldExamples':
                return new RealWorldExamplesValidator();
            
            case 'education':
            case 'educationContent':
                return new EducationContentValidator();
            
            case 'workspace':
            case 'questions':
                return new WorkspaceContentValidator();
            
            case 'analysis':
            case 'results':
                return new AnalysisContentValidator();
            
            case 'templates':
            case 'outputTemplates':
                return new TemplateContentValidator();
            
            default:
                return new GenericContentValidator();
        }
    }

    static createComposite(...contentTypes) {
        const validators = contentTypes.map(type => this.create(type));
        return new CompositeValidator(validators);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        RealWorldExamplesValidator,
        EducationContentValidator,
        WorkspaceContentValidator,
        AnalysisContentValidator,
        TemplateContentValidator,
        GenericContentValidator,
        CompositeValidator,
        ValidatorFactory
    };
} else {
    window.RealWorldExamplesValidator = RealWorldExamplesValidator;
    window.EducationContentValidator = EducationContentValidator;
    window.WorkspaceContentValidator = WorkspaceContentValidator;
    window.AnalysisContentValidator = AnalysisContentValidator;
    window.TemplateContentValidator = TemplateContentValidator;
    window.GenericContentValidator = GenericContentValidator;
    window.CompositeValidator = CompositeValidator;
    window.ValidatorFactory = ValidatorFactory;
}
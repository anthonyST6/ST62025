/**
 * Generate Questions for All 96 Subcomponents
 * This script generates agent-specific questions for all remaining subcomponents
 */

const fs = require('fs');
const AgentQuestionGenerator = require('./agent-question-generator.js');
const existingQuestions = require('./agent-generated-questions.js');
const { AGENT_CORRECT_MAPPING } = require('./integrated-agent-library.js');
const SUBCOMPONENT_NAMES = require('./subcomponent-names-mapping.js');

// All 96 subcomponent IDs
const ALL_SUBCOMPONENTS = [];
for (let block = 1; block <= 16; block++) {
    for (let sub = 1; sub <= 6; sub++) {
        ALL_SUBCOMPONENTS.push(`${block}-${sub}`);
    }
}

// Question templates for different agent types
const questionTemplatesByType = {
    'problem': [
        {
            text: "What is the core problem you're addressing in {domain}?",
            type: 'diagnostic',
            required: true
        },
        {
            text: "How does this problem impact your operations?",
            type: 'diagnostic',
            required: true
        },
        {
            text: "What evidence validates this problem exists?",
            type: 'validation',
            required: false
        }
    ],
    'strategy': [
        {
            text: "What is your current strategy for {domain}?",
            type: 'strategic',
            required: true
        },
        {
            text: "How do you measure success in {domain}?",
            type: 'quantitative',
            required: true
        },
        {
            text: "What are your key milestones and timelines?",
            type: 'strategic',
            required: false
        }
    ],
    'execution': [
        {
            text: "How are you currently executing {domain}?",
            type: 'diagnostic',
            required: true
        },
        {
            text: "What metrics track your {domain} performance?",
            type: 'quantitative',
            required: true
        },
        {
            text: "What challenges do you face in {domain}?",
            type: 'diagnostic',
            required: false
        }
    ],
    'analysis': [
        {
            text: "What data do you collect for {domain}?",
            type: 'quantitative',
            required: true
        },
        {
            text: "How do you analyze {domain} effectiveness?",
            type: 'diagnostic',
            required: true
        },
        {
            text: "What insights have you gained from {domain}?",
            type: 'validation',
            required: false
        }
    ],
    'optimization': [
        {
            text: "How are you optimizing {domain}?",
            type: 'strategic',
            required: true
        },
        {
            text: "What improvements have you made in {domain}?",
            type: 'validation',
            required: true
        },
        {
            text: "What are your next steps for {domain}?",
            type: 'strategic',
            required: false
        }
    ]
};

// Determine question type based on agent name
function getQuestionType(agentName) {
    const name = agentName.toLowerCase();
    
    if (name.includes('problem') || name.includes('definition') || name.includes('assessment')) {
        return 'problem';
    } else if (name.includes('strategy') || name.includes('planning') || name.includes('roadmap')) {
        return 'strategy';
    } else if (name.includes('execution') || name.includes('implementation') || name.includes('launch')) {
        return 'execution';
    } else if (name.includes('analysis') || name.includes('metrics') || name.includes('data')) {
        return 'analysis';
    } else if (name.includes('optimization') || name.includes('improvement') || name.includes('scaling')) {
        return 'optimization';
    }
    
    // Default to strategy for unknown types
    return 'strategy';
}

// Generate questions for a specific subcomponent
function generateQuestionsForSubcomponent(subcomponentId) {
    const agentName = AGENT_CORRECT_MAPPING[subcomponentId];
    const subcomponentName = SUBCOMPONENT_NAMES[subcomponentId] || agentName;
    const questionType = getQuestionType(agentName);
    const templates = questionTemplatesByType[questionType];
    
    const questions = [];
    
    // Add specific questions based on templates
    templates.forEach((template, index) => {
        const question = {
            id: `${subcomponentId}-q${index + 1}`,
            text: template.text.replace('{domain}', subcomponentName.toLowerCase()),
            type: template.type,
            required: template.required,
            minLength: 100,
            maxLength: 1000,
            hint: `Provide specific details about ${subcomponentName} for ST6Co/ScaleOps6Product`
        };
        questions.push(question);
    });
    
    // Add additional context-specific questions
    const [blockId] = subcomponentId.split('-');
    
    // Block-specific questions
    if (blockId === '1') { // Mission Discovery
        questions.push({
            id: `${subcomponentId}-q${questions.length + 1}`,
            text: "How does this align with your mission and vision?",
            type: 'strategic',
            required: false,
            minLength: 100,
            maxLength: 1000
        });
    } else if (blockId === '2') { // Customer Insights
        questions.push({
            id: `${subcomponentId}-q${questions.length + 1}`,
            text: "What customer feedback have you received?",
            type: 'validation',
            required: false,
            minLength: 100,
            maxLength: 1000
        });
    } else if (blockId === '5') { // GTM Strategy
        questions.push({
            id: `${subcomponentId}-q${questions.length + 1}`,
            text: "How does this support your go-to-market approach?",
            type: 'strategic',
            required: false,
            minLength: 100,
            maxLength: 1000
        });
    } else if (blockId === '10') { // Sales Team
        questions.push({
            id: `${subcomponentId}-q${questions.length + 1}`,
            text: "How does your sales team utilize this?",
            type: 'execution',
            required: false,
            minLength: 100,
            maxLength: 1000
        });
    } else if (blockId === '15') { // Leadership
        questions.push({
            id: `${subcomponentId}-q${questions.length + 1}`,
            text: "How does leadership drive this initiative?",
            type: 'strategic',
            required: false,
            minLength: 100,
            maxLength: 1000
        });
    }
    
    // Add scoring and analysis prompts
    questions.push({
        id: `${subcomponentId}-q${questions.length + 1}`,
        text: `What specific evidence demonstrates your ${subcomponentName} effectiveness?`,
        type: 'validation',
        required: true,
        minLength: 100,
        maxLength: 1000,
        hint: "Include metrics, examples, or case studies"
    });
    
    questions.push({
        id: `${subcomponentId}-q${questions.length + 1}`,
        text: `What are your next steps to improve ${subcomponentName}?`,
        type: 'strategic',
        required: false,
        minLength: 100,
        maxLength: 1000,
        hint: "List 3-5 actionable improvements"
    });
    
    return {
        domain: subcomponentName,
        questions: questions
    };
}

// Generate questions for all missing subcomponents
function generateAllMissingQuestions() {
    const generator = new AgentQuestionGenerator();
    const allQuestions = { ...existingQuestions };
    
    let generated = 0;
    let skipped = 0;
    
    console.log('🚀 Generating questions for all 96 subcomponents...\n');
    
    ALL_SUBCOMPONENTS.forEach(subcomponentId => {
        if (!allQuestions[subcomponentId] || allQuestions[subcomponentId] === null) {
            // Generate questions for this subcomponent
            const questionSet = generateQuestionsForSubcomponent(subcomponentId);
            allQuestions[subcomponentId] = questionSet;
            generated++;
            console.log(`✅ Generated questions for ${subcomponentId}: ${SUBCOMPONENT_NAMES[subcomponentId]}`);
        } else {
            skipped++;
            console.log(`⏭️  Skipping ${subcomponentId} (already has questions)`);
        }
    });
    
    console.log(`\n📊 Summary:`);
    console.log(`  • Generated: ${generated} new question sets`);
    console.log(`  • Existing: ${skipped} question sets preserved`);
    console.log(`  • Total: ${generated + skipped}/96 subcomponents`);
    
    return allQuestions;
}

// Save the complete question set
function saveQuestions(questions) {
    const outputPath = './agent-generated-questions-complete.js';
    
    const fileContent = `/**
 * Complete Agent-Generated Questions Library
 * Pre-generated domain-specific questions for ALL 96 subcomponents
 * Generated on: ${new Date().toISOString()}
 */

const agentGeneratedQuestions = ${JSON.stringify(questions, null, 4)};

// Export for use in the application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = agentGeneratedQuestions;
} else {
    window.agentGeneratedQuestions = agentGeneratedQuestions;
}
`;
    
    fs.writeFileSync(outputPath, fileContent);
    console.log(`\n💾 Saved complete questions to: ${outputPath}`);
}

// Main execution
if (require.main === module) {
    console.log('=' .repeat(60));
    console.log('   GENERATING QUESTIONS FOR ALL 96 SUBCOMPONENTS');
    console.log('=' .repeat(60));
    
    const allQuestions = generateAllMissingQuestions();
    saveQuestions(allQuestions);
    
    console.log('\n✅ Complete! All 96 subcomponents now have agent-specific questions.');
    console.log('📝 Next step: Update server to use agent-generated-questions-complete.js');
}

module.exports = { generateQuestionsForSubcomponent, generateAllMissingQuestions };
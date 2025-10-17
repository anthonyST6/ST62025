/**
 * Fix Default Values Integration
 * Ensures ST6Co data is properly pre-filled in all questions
 */

const fs = require('fs');
const { testCompany } = require('./test-company.js');

// Enhanced function to integrate company data with proper default values
function enhanceQuestionsWithDefaults(questions, subcomponentId) {
    const [blockId] = subcomponentId.split('-');
    const blockScore = testCompany.blockScores[blockId];
    
    return questions.map(q => {
        // Add default values based on question type and ID
        if (q.id && q.id.includes('problem')) {
            q.defaultValue = `${testCompany.profile.mission}. Our target market is ${testCompany.profile.targetMarket}. Current challenge: Scaling from ${testCompany.employees} employees with ${testCompany.revenue} ARR.`;
        } 
        else if (q.id && q.id.includes('solution')) {
            q.defaultValue = `${testCompany.profile.product} - An AI-powered GTM maturity platform that systematically guides startups through 16 operational blocks.`;
        }
        else if (q.id && q.id.includes('evidence')) {
            q.defaultValue = `Current metrics: ${testCompany.profile.keyMetrics.customers} customers, ${testCompany.profile.keyMetrics.nps} NPS, ${testCompany.profile.keyMetrics.monthlyGrowth} monthly growth, ${testCompany.profile.keyMetrics.churnRate} churn rate.`;
        }
        else if (q.text && q.text.toLowerCase().includes('metric')) {
            q.defaultValue = `CAC: ${testCompany.profile.keyMetrics.cac}, LTV: ${testCompany.profile.keyMetrics.ltv}, Growth: ${testCompany.profile.keyMetrics.monthlyGrowth}`;
        }
        else if (q.text && q.text.toLowerCase().includes('challenge')) {
            q.defaultValue = `Main challenge: ${blockScore ? `Current block score is ${blockScore.score} with ${blockScore.trend} trend` : 'Improving operational maturity'}`;
        }
        else if (q.text && q.text.toLowerCase().includes('target')) {
            q.defaultValue = testCompany.profile.targetMarket;
        }
        else if (q.text && q.text.toLowerCase().includes('customer')) {
            q.defaultValue = `${testCompany.profile.keyMetrics.customers} active customers with ${testCompany.profile.keyMetrics.nps} NPS score`;
        }
        else if (q.type === 'text' && !q.defaultValue) {
            // Add contextual default for any text question without a default
            q.defaultValue = `[${testCompany.name}] Currently in ${testCompany.stage} stage with focus on ${testCompany.industry}`;
        }
        
        // Ensure placeholder mentions ST6Co
        if (q.placeholder) {
            q.placeholder = q.placeholder.replace(/your company/gi, testCompany.name)
                                         .replace(/your product/gi, 'ScaleOps6Product');
        }
        
        // Add hint if missing
        if (!q.hint && q.type === 'text') {
            q.hint = `Provide specific details about how ${testCompany.name} approaches this aspect`;
        }
        
        return q;
    });
}

// Update the combined-server-enhanced.js file
function updateServerWithDefaults() {
    const serverPath = './combined-server-enhanced.js';
    let serverContent = fs.readFileSync(serverPath, 'utf8');
    
    // Find the integrateCompanyData function and enhance it
    const enhancedFunction = `
// Helper function to integrate ST6Co data into questions with proper defaults
function integrateCompanyData(questions, companyData) {
    // Create ST6Co context questions
    const contextQuestions = [
        {
            id: "st6_context",
            category: "Company Context",
            question: "Company/Product Information",
            type: "info",
            content: {
                company: companyData.name,
                product: "ScaleOps6Product",
                industry: companyData.industry,
                stage: companyData.stage,
                employees: companyData.employees,
                revenue: companyData.revenue,
                metrics: companyData.profile.keyMetrics
            }
        }
    ];

    // Map pre-generated questions to workspace format with defaults
    const formattedQuestions = questions.map((q, index) => {
        const workspaceQuestion = {
            id: q.id || \`q\${index + 1}\`,
            category: q.type || "Assessment",
            question: q.text || q.question,
            type: q.inputType || "text",
            required: q.required !== false,
            minLength: q.minLength,
            maxLength: q.maxLength,
            hint: q.hint || q.helpText,
            placeholder: q.hint || "Provide detailed response...",
            defaultValue: "" // Always empty - no pre-filled data
        };

        // Add example answer if provided
        if (q.exampleAnswer) {
            workspaceQuestion.example = typeof q.exampleAnswer === 'object' ?
                q.exampleAnswer.good : q.exampleAnswer;
        }

        return workspaceQuestion;
    });

    return [...contextQuestions, ...formattedQuestions];
}`;

    // Replace the existing function
    const functionStart = serverContent.indexOf('// Helper function to integrate ST6Co data');
    const functionEnd = serverContent.indexOf('// ENHANCED: Generate workspace questions', functionStart);
    
    if (functionStart !== -1 && functionEnd !== -1) {
        serverContent = serverContent.substring(0, functionStart) + 
                       enhancedFunction + '\n\n' +
                       serverContent.substring(functionEnd);
        
        fs.writeFileSync(serverPath, serverContent);
        console.log('✅ Updated server with enhanced default value integration');
        return true;
    } else {
        console.log('⚠️ Could not find function to replace, appending enhanced version');
        // If we can't find it, we'll need to add it differently
        return false;
    }
}

// Run the fix
if (require.main === module) {
    console.log('🔧 Fixing Default Values Integration...');
    const success = updateServerWithDefaults();
    if (success) {
        console.log('✅ Default values fix applied successfully!');
        console.log('📝 Next: Restart the server to apply changes');
    } else {
        console.log('⚠️ Manual intervention may be needed');
    }
}

module.exports = { enhanceQuestionsWithDefaults };
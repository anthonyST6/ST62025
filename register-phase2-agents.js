const fs = require('fs');
const path = require('path');

console.log('📝 Registering Phase 2 agents in server.js...\n');

const serverPath = path.join(__dirname, 'server.js');
let serverContent = fs.readFileSync(serverPath, 'utf8');

// Check if Phase 2 agents are already registered
if (serverContent.includes('early-adopter-wins-agent')) {
    console.log('ℹ️ Phase 2 agents already registered in server.js');
    process.exit(0);
}

// Find the agent imports section
const agentImportsSection = `
// Phase 2 Agents (Blocks 5-8)
const EarlyAdopterWinsAgent = require('./early-adopter-wins-agent.js');
const CustomerEngagementFlywheelAgent = require('./customer-engagement-flywheel-agent.js');
const QuantifiableImpactAgent = require('./quantifiable-impact-agent.js');
const CustomerSuccessExpansionAgent = require('./customer-success-expansion-agent.js');
`;

// Add imports after existing agent imports
const insertPoint = serverContent.indexOf('// Initialize agents');
if (insertPoint !== -1) {
    serverContent = serverContent.slice(0, insertPoint) + agentImportsSection + '\n' + serverContent.slice(insertPoint);
    console.log('✅ Added Phase 2 agent imports');
}

// Add agent instances
const agentInstances = `
// Phase 2 agent instances
const earlyAdopterAgent = new EarlyAdopterWinsAgent();
const customerEngagementAgent = new CustomerEngagementFlywheelAgent();
const quantifiableImpactAgent = new QuantifiableImpactAgent();
const customerSuccessAgent = new CustomerSuccessExpansionAgent();
`;

// Find where to add instances
const instancePoint = serverContent.indexOf('// Analysis endpoints');
if (instancePoint !== -1) {
    serverContent = serverContent.slice(0, instancePoint) + agentInstances + '\n' + serverContent.slice(instancePoint);
    console.log('✅ Added Phase 2 agent instances');
}

// Add Phase 2 endpoints
const phase2Endpoints = `

// Phase 2 Analysis Endpoints (Blocks 5-8)

// Block 5: Early Adopter Wins
app.post('/api/analyze/early-adopter-wins', async (req, res) => {
    try {
        const { worksheetData, subcomponentId } = req.body;
        console.log('🎯 Early Adopter Wins analysis for:', subcomponentId);
        
        const analysis = await earlyAdopterAgent.analyzeWorksheet(worksheetData, subcomponentId);
        
        // Save to database
        const userId = req.headers['x-user-id'] || '1';
        await saveAnalysisToDatabase(userId, subcomponentId, analysis.score, analysis);
        
        res.json(analysis);
    } catch (error) {
        console.error('Error in early adopter wins analysis:', error);
        res.status(500).json({ error: 'Analysis failed' });
    }
});

// Block 6: Customer Engagement Flywheel
app.post('/api/analyze/customer-engagement', async (req, res) => {
    try {
        const { worksheetData, subcomponentId } = req.body;
        console.log('🎯 Customer Engagement analysis for:', subcomponentId);
        
        const analysis = await customerEngagementAgent.analyzeWorksheet(worksheetData, subcomponentId);
        
        // Save to database
        const userId = req.headers['x-user-id'] || '1';
        await saveAnalysisToDatabase(userId, subcomponentId, analysis.score, analysis);
        
        res.json(analysis);
    } catch (error) {
        console.error('Error in customer engagement analysis:', error);
        res.status(500).json({ error: 'Analysis failed' });
    }
});

// Block 7: Quantifiable Impact
app.post('/api/analyze/quantifiable-impact', async (req, res) => {
    try {
        const { worksheetData, subcomponentId } = req.body;
        console.log('🎯 Quantifiable Impact analysis for:', subcomponentId);
        
        const analysis = await quantifiableImpactAgent.analyzeWorksheet(worksheetData, subcomponentId);
        
        // Save to database
        const userId = req.headers['x-user-id'] || '1';
        await saveAnalysisToDatabase(userId, subcomponentId, analysis.score, analysis);
        
        res.json(analysis);
    } catch (error) {
        console.error('Error in quantifiable impact analysis:', error);
        res.status(500).json({ error: 'Analysis failed' });
    }
});

// Block 8: Customer Success Expansion
app.post('/api/analyze/customer-success', async (req, res) => {
    try {
        const { worksheetData, subcomponentId } = req.body;
        console.log('🎯 Customer Success analysis for:', subcomponentId);
        
        const analysis = await customerSuccessAgent.analyzeWorksheet(worksheetData, subcomponentId);
        
        // Save to database
        const userId = req.headers['x-user-id'] || '1';
        await saveAnalysisToDatabase(userId, subcomponentId, analysis.score, analysis);
        
        res.json(analysis);
    } catch (error) {
        console.error('Error in customer success analysis:', error);
        res.status(500).json({ error: 'Analysis failed' });
    }
});
`;

// Find where to add endpoints (before the server start)
const endpointInsertPoint = serverContent.lastIndexOf('// Start server');
if (endpointInsertPoint !== -1) {
    serverContent = serverContent.slice(0, endpointInsertPoint) + phase2Endpoints + '\n\n' + serverContent.slice(endpointInsertPoint);
    console.log('✅ Added Phase 2 API endpoints');
}

// Write updated server.js
fs.writeFileSync(serverPath, serverContent);
console.log('\n✨ Server.js updated with all Phase 2 agents!');
console.log('\n📝 Next steps:');
console.log('1. The server should auto-reload with the new agents');
console.log('2. Test any Block 5-8 subcomponent');
console.log('3. All recommendations will show with "+X points" format');
console.log('4. Priority badges (CRITICAL/HIGH/MEDIUM) will be displayed');
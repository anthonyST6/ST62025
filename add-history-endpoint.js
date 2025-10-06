// Add Score History Endpoint to Server
// This script adds the missing /api/subcomponents/:id/history endpoint

const fs = require('fs');
const path = require('path');

// Read the server file
const serverPath = path.join(__dirname, 'server-with-backend.js');
let serverContent = fs.readFileSync(serverPath, 'utf8');

// Find the location to insert the new endpoint (after the subcomponents endpoint)
const insertPoint = serverContent.indexOf('// Route: POST /api/analysis');

if (insertPoint === -1) {
    console.error('Could not find insertion point in server file');
    process.exit(1);
}

// Define the new endpoint code
const historyEndpoint = `
    // Route: GET /api/subcomponents/:id/history
    const historyMatch = pathname.match(/^\\/api\\/subcomponents\\/(.+)\\/history$/);
    if (historyMatch && req.method === 'GET') {
        const subcomponentId = historyMatch[1];
        const userId = req.headers['x-user-id'] || '1';
        const limit = parseInt(parsedUrl.query.limit) || 10;
        
        console.log(\`📊 Fetching score history for subcomponent: \${subcomponentId}\`);
        
        try {
            // Get score history from database
            const history = await database.getScoreHistory(subcomponentId, limit);
            
            // Transform the data to match frontend expectations
            const transformedHistory = history.map((entry, index) => {
                // Parse JSON fields if they're strings
                let dimensionScores = {};
                let strengths = [];
                let weaknesses = [];
                let recommendations = [];
                
                try {
                    if (entry.dimension_scores) {
                        dimensionScores = typeof entry.dimension_scores === 'string' ? 
                            JSON.parse(entry.dimension_scores) : entry.dimension_scores;
                    }
                    if (entry.strengths) {
                        strengths = typeof entry.strengths === 'string' ? 
                            JSON.parse(entry.strengths) : entry.strengths;
                    }
                    if (entry.weaknesses) {
                        weaknesses = typeof entry.weaknesses === 'string' ? 
                            JSON.parse(entry.weaknesses) : entry.weaknesses;
                    }
                    if (entry.recommendations) {
                        recommendations = typeof entry.recommendations === 'string' ? 
                            JSON.parse(entry.recommendations) : entry.recommendations;
                    }
                } catch (e) {
                    console.error('Error parsing JSON fields:', e);
                }
                
                // Calculate improvement from previous entry
                let improvement = 0;
                if (index < history.length - 1) {
                    improvement = entry.overall_score - history[index + 1].overall_score;
                }
                
                return {
                    id: entry.id,
                    score: entry.overall_score || 75,
                    timestamp: entry.created_at || new Date().toISOString(),
                    source: 'Audit Score',
                    user: 'ST6C0',
                    subcomponentId: subcomponentId,
                    subcomponentName: entry.subcomponent_name || SUBCOMPONENT_NAMES[subcomponentId],
                    agentName: entry.agent_name || AGENT_CORRECT_MAPPING[subcomponentId],
                    blockName: entry.block_name,
                    analysis: {
                        executiveSummary: \`Score: \${entry.overall_score}% - \${entry.subcomponent_name || 'Analysis'}\`,
                        detailedScores: dimensionScores,
                        recommendations: recommendations
                    },
                    detailedScores: dimensionScores,
                    recommendations: recommendations,
                    executiveSummary: \`Achieved \${entry.overall_score}% score with key strengths in \${strengths.length > 0 ? strengths[0] : 'multiple areas'}\`,
                    strengths: strengths,
                    weaknesses: weaknesses,
                    improvement: improvement,
                    sessionId: entry.session_id
                };
            });
            
            console.log(\`✅ Returning \${transformedHistory.length} history entries\`);
            
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.end(JSON.stringify(transformedHistory));
        } catch (error) {
            console.error('Error fetching score history:', error);
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(500);
            res.end(JSON.stringify({ 
                error: 'Failed to fetch score history',
                message: error.message 
            }));
        }
        return;
    }
    
`;

// Insert the new endpoint
serverContent = serverContent.slice(0, insertPoint) + historyEndpoint + serverContent.slice(insertPoint);

// Write the updated server file
fs.writeFileSync(serverPath, serverContent);

console.log('✅ Successfully added /api/subcomponents/:id/history endpoint to server');
console.log('📊 The server now properly handles score history requests');
console.log('🔄 Please restart the server for changes to take effect');
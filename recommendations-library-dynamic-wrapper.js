/**
 * Wrapper for Dynamic Recommendations Library
 * Provides a simple function interface for agents to use
 */

const DynamicRecommendationsLibrary = require('./recommendations-library-dynamic');

// Create a singleton instance
const library = new DynamicRecommendationsLibrary();

/**
 * Generate dynamic recommendations for agents
 * @param {string} agentName - Name of the agent
 * @param {Object} scores - Scores object with dimensions
 * @param {Object} actions - Action descriptions for each dimension
 * @returns {Array} Array of recommendations
 */
function generateDynamicRecommendations(agentName, scores, actions = {}) {
    const recommendations = [];
    
    // Sort dimensions by score (lowest first for improvement priority)
    const sortedDimensions = Object.entries(scores)
        .sort((a, b) => {
            const scoreA = a[1].percentage || a[1].score || a[1];
            const scoreB = b[1].percentage || b[1].score || b[1];
            return scoreA - scoreB;
        });
    
    // Generate recommendations for lowest scoring dimensions
    sortedDimensions.slice(0, 3).forEach(([dimension, scoreData], index) => {
        const score = scoreData.percentage || scoreData.score || scoreData;
        const priority = index === 0 ? 'CRITICAL' : index === 1 ? 'HIGH' : 'MEDIUM';
        
        // Calculate improvement potential
        const targetScore = 80; // Target 80% achievement
        const currentScore = Math.min(score, 100);
        const improvement = Math.max(5, Math.min(20, targetScore - currentScore));
        
        // Get action description
        const action = actions[dimension] || `Improve ${dimension.replace(/([A-Z])/g, ' $1').toLowerCase()}`;
        
        recommendations.push({
            priority: priority,
            area: dimension.replace(/([A-Z])/g, ' $1').trim(),
            suggestion: action,
            action: action,
            impact: `+${improvement} points`,
            expectedImprovement: `+${improvement} points`
        });
    });
    
    // Ensure we always return at least one recommendation
    if (recommendations.length === 0) {
        recommendations.push({
            priority: 'MEDIUM',
            area: 'Overall Performance',
            suggestion: 'Continue optimizing all dimensions',
            action: 'Maintain current momentum and refine processes',
            impact: '+5 points',
            expectedImprovement: '+5 points'
        });
    }
    
    return recommendations;
}

// Export the wrapper function
module.exports = {
    generateDynamicRecommendations,
    DynamicRecommendationsLibrary
};
// API endpoint handler for score history
const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Get score history for a subcomponent
router.get('/api/subcomponents/:subcomponentId/history', (req, res) => {
    const { subcomponentId } = req.params;
    const userId = req.headers['x-user-id'] || 1;
    
    const db = new sqlite3.Database(path.join(__dirname, 'scaleops6.db'));
    
    // For Problem Statement (1-1), we get from score_history table
    if (subcomponentId === '1-1') {
        db.all(`
            SELECT 
                id,
                score,
                ai_analysis,
                created_at
            FROM score_history
            WHERE user_id = ? AND block_id = 1
            ORDER BY created_at DESC
            LIMIT 10
        `, [userId], (err, rows) => {
            if (err) {
                console.error('Error fetching score history:', err);
                res.status(500).json({ error: 'Database error' });
                db.close();
                return;
            }
            
            // Transform the data to match frontend expectations
            const history = rows.map(row => {
                let analysis = {};
                let worksheetData = {};
                
                try {
                    const aiAnalysis = JSON.parse(row.ai_analysis || '{}');
                    analysis = {
                        executiveSummary: aiAnalysis.executiveSummary || '',
                        detailedScores: aiAnalysis.detailedScores || {},
                        recommendations: aiAnalysis.recommendations || []
                    };
                    worksheetData = aiAnalysis.worksheetData || {};
                } catch (e) {
                    console.error('Error parsing AI analysis:', e);
                }
                
                return {
                    id: row.id,
                    score: row.score,
                    timestamp: row.created_at,
                    source: 'Audit Score',
                    user: 'ST6C0',
                    subcomponentId: subcomponentId,
                    analysis: analysis,
                    detailedScores: analysis.detailedScores,
                    recommendations: analysis.recommendations,
                    executiveSummary: analysis.executiveSummary,
                    worksheetData: worksheetData,
                    improvement: 0 // Calculate based on previous entry if needed
                };
            });
            
            // Calculate improvements
            for (let i = 0; i < history.length - 1; i++) {
                history[i].improvement = history[i].score - history[i + 1].score;
            }
            
            res.json(history);
            db.close();
        });
    } else {
        // For other subcomponents, check subcomponent_scores table
        db.all(`
            SELECT 
                score,
                analysis_data,
                created_at
            FROM subcomponent_scores
            WHERE user_id = ? AND subcomponent_id = ?
            ORDER BY created_at DESC
            LIMIT 10
        `, [userId, subcomponentId], (err, rows) => {
            if (err) {
                console.error('Error fetching subcomponent scores:', err);
                res.status(500).json({ error: 'Database error' });
                db.close();
                return;
            }
            
            const history = rows.map(row => {
                let analysis = {};
                
                try {
                    analysis = JSON.parse(row.analysis_data || '{}');
                } catch (e) {
                    console.error('Error parsing analysis data:', e);
                }
                
                return {
                    score: row.score,
                    timestamp: row.created_at,
                    source: 'Audit Score',
                    user: 'ST6C0',
                    subcomponentId: subcomponentId,
                    analysis: analysis,
                    detailedScores: analysis.detailedScores || {},
                    recommendations: analysis.recommendations || [],
                    executiveSummary: analysis.executiveSummary || '',
                    improvement: 0
                };
            });
            
            res.json(history);
            db.close();
        });
    }
});

// Save score history
router.post('/api/subcomponents/:subcomponentId/history', (req, res) => {
    const { subcomponentId } = req.params;
    const userId = req.headers['x-user-id'] || 1;
    const { score, analysis, worksheetData } = req.body;
    
    const db = new sqlite3.Database(path.join(__dirname, 'scaleops6.db'));
    
    if (subcomponentId === '1-1') {
        // Save to score_history table
        const aiAnalysis = {
            ...analysis,
            worksheetData: worksheetData,
            timestamp: new Date().toISOString(),
            user: 'ST6C0',
            source: 'Audit Score'
        };
        
        const subScores = {};
        if (analysis.detailedScores) {
            Object.entries(analysis.detailedScores).forEach(([key, value]) => {
                subScores[key] = typeof value.score === 'number' ? value.score : 0;
            });
        }
        
        db.run(`
            INSERT INTO score_history (user_id, block_id, score, sub_scores, evidence_links, ai_analysis, created_at)
            VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
        `, [
            userId,
            1, // Block 1 for Problem Statement
            score,
            JSON.stringify(subScores),
            JSON.stringify([]),
            JSON.stringify(aiAnalysis)
        ], (err) => {
            if (err) {
                console.error('Error saving score history:', err);
                res.status(500).json({ error: 'Database error' });
            } else {
                res.json({ success: true, message: 'Score history saved' });
            }
            db.close();
        });
    } else {
        // Save to subcomponent_scores table
        db.run(`
            INSERT INTO subcomponent_scores (user_id, block_id, subcomponent_id, score, source, analysis_data, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
            ON CONFLICT(user_id, subcomponent_id)
            DO UPDATE SET
                score = excluded.score,
                analysis_data = excluded.analysis_data,
                updated_at = datetime('now')
        `, [
            userId,
            parseInt(subcomponentId.split('-')[0]),
            subcomponentId,
            score,
            'Audit Score',
            JSON.stringify(analysis)
        ], (err) => {
            if (err) {
                console.error('Error saving subcomponent score:', err);
                res.status(500).json({ error: 'Database error' });
            } else {
                res.json({ success: true, message: 'Score saved' });
            }
            db.close();
        });
    }
});

module.exports = router;
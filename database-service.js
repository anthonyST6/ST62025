const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class DatabaseService {
    constructor() {
        this.dbPath = path.join(__dirname, 'scaleops6.db');
        this.db = new sqlite3.Database(this.dbPath);
    }

    // Save score history
    saveScoreHistory(analysisData) {
        return new Promise((resolve, reject) => {
            const {
                subcomponentId,
                subcomponentName,
                agentName,
                blockName,
                overallScore,
                dimensionScores,
                strengths,
                weaknesses,
                recommendations,
                answers,
                sessionId,
                userId = 'default'
            } = analysisData;

            // Extract block ID from subcomponentId (e.g., "1-1" -> 1)
            const blockId = parseInt(subcomponentId.split('-')[0]) || 1;

            const query = `
                INSERT INTO score_history
                (subcomponent_id, subcomponent_name, agent_name, block_name,
                 overall_score, dimension_scores, strengths, weaknesses,
                 recommendations, answers, session_id, user_id, block_id)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const params = [
                subcomponentId,
                subcomponentName,
                agentName,
                blockName,
                overallScore,
                JSON.stringify(dimensionScores),
                JSON.stringify(strengths),
                JSON.stringify(weaknesses),
                JSON.stringify(recommendations),
                JSON.stringify(answers),
                sessionId,
                userId,
                blockId  // Add block_id
            ];

            this.db.run(query, params, function(err) {
                if (err) {
                    console.error('Error saving score history:', err);
                    reject(err);
                } else {
                    resolve({
                        success: true,
                        id: this.lastID,
                        message: 'Score history saved successfully'
                    });
                }
            });
        });
    }

    // Get score history for a subcomponent
    getScoreHistory(subcomponentId, limit = 10) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM score_history
                WHERE subcomponent_id = ?
                ORDER BY created_at DESC, id DESC
                LIMIT ?
            `;

            this.db.all(query, [subcomponentId, limit], (err, rows) => {
                if (err) {
                    console.error('Error fetching score history:', err);
                    reject(err);
                } else {
                    // Parse JSON fields
                    const history = rows.map(row => ({
                        ...row,
                        dimensionScores: JSON.parse(row.dimension_scores || '{}'),
                        strengths: JSON.parse(row.strengths || '[]'),
                        weaknesses: JSON.parse(row.weaknesses || '[]'),
                        recommendations: JSON.parse(row.recommendations || '[]'),
                        answers: JSON.parse(row.answers || '{}'),
                        // Add timestamp for compatibility
                        timestamp: row.created_at || row.analyzed_at || new Date().toISOString()
                    }));
                    resolve(history);
                }
            });
        });
    }

    // Get all score history for user
    getAllScoreHistory(userId = 'default', limit = 100) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM score_history
                WHERE user_id = ?
                ORDER BY created_at DESC, id DESC
                LIMIT ?
            `;

            this.db.all(query, [userId, limit], (err, rows) => {
                if (err) {
                    console.error('Error fetching all score history:', err);
                    reject(err);
                } else {
                    const history = rows.map(row => ({
                        ...row,
                        dimensionScores: JSON.parse(row.dimension_scores || '{}'),
                        strengths: JSON.parse(row.strengths || '[]'),
                        weaknesses: JSON.parse(row.weaknesses || '[]'),
                        recommendations: JSON.parse(row.recommendations || '[]'),
                        answers: JSON.parse(row.answers || '{}'),
                        // Add timestamp for compatibility
                        timestamp: row.created_at || row.analyzed_at || new Date().toISOString()
                    }));
                    resolve(history);
                }
            });
        });
    }

    // Save workspace answers
    saveWorkspaceAnswers(subcomponentId, answers, sessionId, userId = 'default') {
        return new Promise((resolve, reject) => {
            const promises = [];

            Object.entries(answers).forEach(([questionId, answerData]) => {
                const query = `
                    INSERT OR REPLACE INTO workspace_answers 
                    (subcomponent_id, question_id, question_text, answer, 
                     answer_type, metadata, session_id, user_id, updated_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
                `;

                const params = [
                    subcomponentId,
                    questionId,
                    answerData.question || '',
                    answerData.answer || answerData,
                    answerData.type || 'text',
                    JSON.stringify(answerData.metadata || {}),
                    sessionId,
                    userId
                ];

                promises.push(
                    new Promise((res, rej) => {
                        this.db.run(query, params, (err) => {
                            if (err) rej(err);
                            else res();
                        });
                    })
                );
            });

            Promise.all(promises)
                .then(() => resolve({ success: true, message: 'Answers saved successfully' }))
                .catch(reject);
        });
    }

    // Get workspace answers
    getWorkspaceAnswers(subcomponentId, sessionId = null) {
        return new Promise((resolve, reject) => {
            let query = `
                SELECT * FROM workspace_answers 
                WHERE subcomponent_id = ?
            `;
            const params = [subcomponentId];

            if (sessionId) {
                query += ' AND session_id = ?';
                params.push(sessionId);
            }

            query += ' ORDER BY updated_at DESC';

            this.db.all(query, params, (err, rows) => {
                if (err) {
                    console.error('Error fetching workspace answers:', err);
                    reject(err);
                } else {
                    const answers = {};
                    rows.forEach(row => {
                        answers[row.question_id] = {
                            question: row.question_text,
                            answer: row.answer,
                            type: row.answer_type,
                            metadata: JSON.parse(row.metadata || '{}'),
                            updatedAt: row.updated_at
                        };
                    });
                    resolve(answers);
                }
            });
        });
    }

    // Create or update analysis session
    createAnalysisSession(subcomponentId, sessionId, userId = 'default') {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT OR REPLACE INTO analysis_sessions 
                (session_id, subcomponent_id, user_id, start_time, status)
                VALUES (?, ?, ?, CURRENT_TIMESTAMP, 'in_progress')
            `;

            this.db.run(query, [sessionId, subcomponentId, userId], function(err) {
                if (err) {
                    console.error('Error creating analysis session:', err);
                    reject(err);
                } else {
                    resolve({ 
                        success: true, 
                        sessionId,
                        id: this.lastID 
                    });
                }
            });
        });
    }

    // Update analysis session
    updateAnalysisSession(sessionId, data) {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE analysis_sessions 
                SET analysis_data = ?, 
                    end_time = CURRENT_TIMESTAMP,
                    status = ?
                WHERE session_id = ?
            `;

            const params = [
                JSON.stringify(data),
                data.status || 'completed',
                sessionId
            ];

            this.db.run(query, params, (err) => {
                if (err) {
                    console.error('Error updating analysis session:', err);
                    reject(err);
                } else {
                    resolve({ success: true, message: 'Session updated successfully' });
                }
            });
        });
    }

    // Get expert recommendations
    getExpertRecommendations(subcomponentId) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM expert_recommendations 
                WHERE subcomponent_id = ? 
                ORDER BY priority DESC, impact_score DESC
            `;

            this.db.all(query, [subcomponentId], (err, rows) => {
                if (err) {
                    console.error('Error fetching expert recommendations:', err);
                    reject(err);
                } else {
                    resolve(rows || []);
                }
            });
        });
    }

    // Add expert recommendation
    addExpertRecommendation(recommendation) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO expert_recommendations 
                (subcomponent_id, recommendation_type, title, description, 
                 priority, impact_score, implementation_difficulty, 
                 estimated_time, resources_needed, success_metrics)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const params = [
                recommendation.subcomponentId,
                recommendation.type || 'strategic',
                recommendation.title,
                recommendation.description,
                recommendation.priority || 'medium',
                recommendation.impactScore || 75,
                recommendation.difficulty || 'medium',
                recommendation.estimatedTime || 'TBD',
                recommendation.resourcesNeeded || 'TBD',
                recommendation.successMetrics || 'TBD'
            ];

            this.db.run(query, params, function(err) {
                if (err) {
                    console.error('Error adding expert recommendation:', err);
                    reject(err);
                } else {
                    resolve({ 
                        success: true, 
                        id: this.lastID,
                        message: 'Recommendation added successfully'
                    });
                }
            });
        });
    }

    // Get templates
    getTemplates(subcomponentId = null) {
        return new Promise((resolve, reject) => {
            let query = 'SELECT * FROM templates';
            const params = [];

            if (subcomponentId) {
                query += ' WHERE subcomponent_id = ?';
                params.push(subcomponentId);
            }

            query += ' ORDER BY usage_count DESC, created_at DESC';

            this.db.all(query, params, (err, rows) => {
                if (err) {
                    console.error('Error fetching templates:', err);
                    reject(err);
                } else {
                    resolve(rows || []);
                }
            });
        });
    }

    // Update template usage count
    incrementTemplateUsage(templateId) {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE templates 
                SET usage_count = usage_count + 1,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
            `;

            this.db.run(query, [templateId], (err) => {
                if (err) {
                    console.error('Error updating template usage:', err);
                    reject(err);
                } else {
                    resolve({ success: true });
                }
            });
        });
    }

    // Log analytics event
    logAnalyticsEvent(eventType, subcomponentId, eventData, userId = 'default', sessionId = null) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO analytics 
                (event_type, subcomponent_id, event_data, user_id, session_id)
                VALUES (?, ?, ?, ?, ?)
            `;

            const params = [
                eventType,
                subcomponentId,
                JSON.stringify(eventData),
                userId,
                sessionId
            ];

            this.db.run(query, params, (err) => {
                if (err) {
                    console.error('Error logging analytics event:', err);
                    // Don't reject, just log the error
                    resolve({ success: false, error: err.message });
                } else {
                    resolve({ success: true });
                }
            });
        });
    }

    // Get analytics summary
    getAnalyticsSummary(subcomponentId = null, days = 30) {
        return new Promise((resolve, reject) => {
            let query = `
                SELECT 
                    event_type,
                    COUNT(*) as count,
                    DATE(timestamp) as date
                FROM analytics 
                WHERE timestamp >= datetime('now', '-${days} days')
            `;

            const params = [];

            if (subcomponentId) {
                query += ' AND subcomponent_id = ?';
                params.push(subcomponentId);
            }

            query += ' GROUP BY event_type, DATE(timestamp) ORDER BY date DESC';

            this.db.all(query, params, (err, rows) => {
                if (err) {
                    console.error('Error fetching analytics summary:', err);
                    reject(err);
                } else {
                    resolve(rows || []);
                }
            });
        });
    }

    // Get generated documents
    getGeneratedDocuments(subcomponentId = null, limit = 50) {
        return new Promise((resolve, reject) => {
            let query = 'SELECT * FROM generated_documents';
            const params = [];

            if (subcomponentId) {
                query += ' WHERE subcomponent_id = ?';
                params.push(subcomponentId);
            }

            query += ' ORDER BY created_at DESC LIMIT ?';
            params.push(limit);

            this.db.all(query, params, (err, rows) => {
                if (err) {
                    console.error('Error fetching generated documents:', err);
                    reject(err);
                } else {
                    resolve(rows || []);
                }
            });
        });
    }

    // Close database connection
    close() {
        return new Promise((resolve, reject) => {
            this.db.close((err) => {
                if (err) {
                    console.error('Error closing database:', err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

module.exports = DatabaseService;
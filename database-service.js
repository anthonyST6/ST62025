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

    // Get latest score for a subcomponent (returns null if no analysis exists)
    getLatestSubcomponentScore(subcomponentId) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT overall_score, created_at, status
                FROM score_history
                WHERE subcomponent_id = ?
                ORDER BY created_at DESC, id DESC
                LIMIT 1
            `;
            
            this.db.get(query, [subcomponentId], (err, row) => {
                if (err) {
                    console.error('Error fetching latest score:', err);
                    reject(err);
                } else {
                    resolve(row || null);
                }
            });
        });
    }

    // Get subcomponent status (Pending/Complete)
    getSubcomponentStatus(subcomponentId) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM subcomponent_status
                WHERE subcomponent_id = ?
            `;
            
            this.db.get(query, [subcomponentId], (err, row) => {
                if (err) {
                    console.error('Error fetching subcomponent status:', err);
                    reject(err);
                } else {
                    resolve(row || { status: 'Pending', analysis_count: 0 });
                }
            });
        });
    }

    // Update subcomponent status after analysis
    updateSubcomponentStatus(subcomponentId, score) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO subcomponent_status
                (subcomponent_id, status, first_analysis_date, last_analysis_date,
                 analysis_count, latest_score, updated_at)
                VALUES (?, 'Complete', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, ?, CURRENT_TIMESTAMP)
                ON CONFLICT(subcomponent_id) DO UPDATE SET
                    status = 'Complete',
                    last_analysis_date = CURRENT_TIMESTAMP,
                    analysis_count = analysis_count + 1,
                    latest_score = ?,
                    updated_at = CURRENT_TIMESTAMP
            `;
            
            this.db.run(query, [subcomponentId, score, score], (err) => {
                if (err) {
                    console.error('Error updating subcomponent status:', err);
                    reject(err);
                } else {
                    resolve({ success: true });
                }
            });
        });
    }

    // Calculate and cache block average score (excluding N/A subcomponents)
    async calculateBlockAverage(blockId, triggerSubcomponentId = null) {
        const subcomponentIds = [];
        for (let i = 1; i <= 6; i++) {
            subcomponentIds.push(`${blockId}-${i}`);
        }
        
        const scores = [];
        for (const subId of subcomponentIds) {
            const latestScore = await this.getLatestSubcomponentScore(subId);
            if (latestScore && latestScore.overall_score !== null) {
                scores.push(latestScore.overall_score);
            }
        }
        
        const average = scores.length > 0
            ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
            : null;
        
        // Get previous score from cache to detect changes
        const previousCache = await this.getBlockScoreCache(blockId);
        const previousScore = previousCache ? previousCache.average_score : null;
        
        // Update cache
        await this.updateBlockScoreCache(blockId, average, scores.length);
        
        // ✅ SSOT: Store history snapshot if score changed
        if (average !== null && average !== previousScore) {
            const changeDescription = triggerSubcomponentId
                ? `Score updated from ${previousScore || 'N/A'}% to ${average}% after ${triggerSubcomponentId} analysis`
                : `Block score recalculated: ${average}%`;
            
            await this.saveBlockScoreHistory(
                blockId,
                average,
                scores.length,
                triggerSubcomponentId,
                changeDescription
            );
        }
        
        return {
            average,
            completedCount: scores.length,
            totalCount: 6,
            previousScore: previousScore,
            scoreChanged: average !== previousScore
        };
    }

    // Update block scores cache
    updateBlockScoreCache(blockId, averageScore, completedCount) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO block_scores_cache
                (block_id, average_score, completed_count, total_count, last_updated)
                VALUES (?, ?, ?, 6, CURRENT_TIMESTAMP)
                ON CONFLICT(block_id) DO UPDATE SET
                    average_score = ?,
                    completed_count = ?,
                    last_updated = CURRENT_TIMESTAMP
            `;
            
            this.db.run(query, [blockId, averageScore, completedCount, averageScore, completedCount], (err) => {
                if (err) {
                    console.error('Error updating block cache:', err);
                    reject(err);
                } else {
                    resolve({ success: true });
                }
            });
        });
    }

    // Get block score from cache
    getBlockScoreCache(blockId) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM block_scores_cache
                WHERE block_id = ?
            `;
            
            this.db.get(query, [blockId], (err, row) => {
                if (err) {
                    console.error('Error fetching block cache:', err);
                    reject(err);
                } else {
                    resolve(row || null);
                }
            });
        });
    }

    // Get score changes for change log
    getScoreChanges(subcomponentId, limit = 10) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT
                    sh1.id,
                    sh1.overall_score as current_score,
                    sh1.created_at as change_date,
                    sh1.analysis_event_type,
                    sh2.overall_score as previous_score,
                    (sh1.overall_score - COALESCE(sh2.overall_score, sh1.overall_score)) as score_change,
                    sh1.dimension_scores as current_dimensions,
                    sh2.dimension_scores as previous_dimensions
                FROM score_history sh1
                LEFT JOIN score_history sh2 ON
                    sh2.subcomponent_id = sh1.subcomponent_id AND
                    sh2.id = (
                        SELECT MAX(id) FROM score_history
                        WHERE subcomponent_id = sh1.subcomponent_id
                        AND id < sh1.id
                    )
                WHERE sh1.subcomponent_id = ?
                ORDER BY sh1.created_at DESC
                LIMIT ?
            `;
            
            this.db.all(query, [subcomponentId, limit], (err, rows) => {
                if (err) {
                    console.error('Error fetching score changes:', err);
                    reject(err);
                } else {
                    const changes = rows.map(row => {
                        const currentDims = JSON.parse(row.current_dimensions || '{}');
                        const previousDims = JSON.parse(row.previous_dimensions || '{}');
                        
                        return {
                            ...row,
                            currentDimensions: currentDims,
                            previousDimensions: previousDims,
                            dimensionChanges: this.calculateDimensionChanges(currentDims, previousDims)
                        };
                    });
                    resolve(changes);
                }
            });
        });
    }

    // Calculate dimension-level changes
    calculateDimensionChanges(current, previous) {
        const changes = {};
        Object.keys(current).forEach(dimension => {
            const currentScore = current[dimension] || 0;
            const previousScore = previous[dimension] || currentScore;
            changes[dimension] = {
                current: currentScore,
                previous: previousScore,
                change: currentScore - previousScore
            };
        });
        return changes;
    }

    // ==================== BLOCK SCORE HISTORY METHODS ====================

    // Save block score history snapshot
    saveBlockScoreHistory(blockId, score, completedCount, triggerSubcomponentId = null, changeDescription = null) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO block_score_history
                (block_id, score, completed_count, total_count, trigger_subcomponent_id,
                 trigger_event_type, change_description)
                VALUES (?, ?, ?, 6, ?, 'analysis_completed', ?)
            `;

            const params = [
                blockId,
                score,
                completedCount,
                triggerSubcomponentId,
                changeDescription
            ];

            this.db.run(query, params, function(err) {
                if (err) {
                    console.error('Error saving block score history:', err);
                    reject(err);
                } else {
                    console.log(`✅ Saved block ${blockId} history: ${score}% (${completedCount}/6 complete)`);
                    resolve({
                        success: true,
                        id: this.lastID,
                        message: 'Block score history saved'
                    });
                }
            });
        });
    }

    // Get block score history for graphing
    getBlockScoreHistory(blockId, days = 30) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT
                    id,
                    block_id,
                    score,
                    completed_count,
                    total_count,
                    trigger_subcomponent_id,
                    trigger_event_type,
                    change_description,
                    created_at
                FROM block_score_history
                WHERE block_id = ?
                AND created_at >= datetime('now', '-' || ? || ' days')
                ORDER BY created_at ASC
            `;

            this.db.all(query, [blockId, days], (err, rows) => {
                if (err) {
                    console.error('Error fetching block score history:', err);
                    reject(err);
                } else {
                    resolve(rows || []);
                }
            });
        });
    }

    // Get block score change events (for change log table)
    getBlockScoreChangeEvents(blockId, days = 30) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT
                    bsh1.id,
                    bsh1.score as new_score,
                    bsh1.created_at,
                    bsh1.trigger_subcomponent_id,
                    bsh1.change_description,
                    bsh1.trigger_event_type,
                    COALESCE(bsh2.score, bsh1.score) as previous_score,
                    (bsh1.score - COALESCE(bsh2.score, bsh1.score)) as improvement
                FROM block_score_history bsh1
                LEFT JOIN block_score_history bsh2 ON
                    bsh2.block_id = bsh1.block_id AND
                    bsh2.id = (
                        SELECT MAX(id) FROM block_score_history
                        WHERE block_id = bsh1.block_id
                        AND id < bsh1.id
                    )
                WHERE bsh1.block_id = ?
                AND bsh1.created_at >= datetime('now', '-' || ? || ' days')
                ORDER BY bsh1.created_at DESC
            `;

            this.db.all(query, [blockId, days], (err, rows) => {
                if (err) {
                    console.error('Error fetching block change events:', err);
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
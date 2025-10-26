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

    // ==================== USER MANAGEMENT METHODS ====================

    // Get user by Firebase UID
    getUserByFirebaseUid(firebaseUid) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE firebase_uid = ?';
            
            this.db.get(query, [firebaseUid], (err, row) => {
                if (err) {
                    console.error('Error fetching user by Firebase UID:', err);
                    reject(err);
                } else {
                    resolve(row || null);
                }
            });
        });
    }

    // Get user by ID
    getUserById(userId) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE id = ?';
            
            this.db.get(query, [userId], (err, row) => {
                if (err) {
                    console.error('Error fetching user by ID:', err);
                    reject(err);
                } else {
                    resolve(row || null);
                }
            });
        });
    }

    // Get user by email
    getUserByEmail(email) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE email = ?';
            
            this.db.get(query, [email], (err, row) => {
                if (err) {
                    console.error('Error fetching user by email:', err);
                    reject(err);
                } else {
                    resolve(row || null);
                }
            });
        });
    }

    // Create new user
    createUser(userData) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO users
                (firebase_uid, email, name, full_name, company, role, tier, subscription_status, stripe_customer_id, metadata)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const params = [
                userData.firebaseUid,
                userData.email,
                userData.fullName || userData.email.split('@')[0], // name is required
                userData.fullName || null,
                userData.metadata?.company || userData.company || null,
                userData.role || 'user',
                userData.tier || 0,
                userData.subscriptionStatus || 'free',
                userData.stripeCustomerId || null,
                JSON.stringify(userData.metadata || {})
            ];

            this.db.run(query, params, function(err) {
                if (err) {
                    console.error('Error creating user:', err);
                    reject(err);
                } else {
                    resolve({
                        success: true,
                        userId: this.lastID,
                        message: 'User created successfully'
                    });
                }
            });
        });
    }

    // Update user role
    updateUserRole(userId, role) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE users SET role = ? WHERE id = ?';
            
            this.db.run(query, [role, userId], (err) => {
                if (err) {
                    console.error('Error updating user role:', err);
                    reject(err);
                } else {
                    resolve({ success: true, message: 'Role updated' });
                }
            });
        });
    }

    // Update user tier
    updateUserTier(userId, tier) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE users SET tier = ? WHERE id = ?';
            
            this.db.run(query, [tier, userId], (err) => {
                if (err) {
                    console.error('Error updating user tier:', err);
                    reject(err);
                } else {
                    resolve({ success: true, message: 'Tier updated' });
                }
            });
        });
    }

    // Update last login
    updateLastLogin(userId) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?';
            
            this.db.run(query, [userId], (err) => {
                if (err) {
                    console.error('Error updating last login:', err);
                    reject(err);
                } else {
                    resolve({ success: true });
                }
            });
        });
    }

    // Deactivate user
    deactivateUser(userId) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE users SET is_active = 0 WHERE id = ?';
            
            this.db.run(query, [userId], (err) => {
                if (err) {
                    console.error('Error deactivating user:', err);
                    reject(err);
                } else {
                    resolve({ success: true, message: 'User deactivated' });
                }
            });
        });
    }

    // Delete user
    deleteUser(userId) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM users WHERE id = ?';
            
            this.db.run(query, [userId], (err) => {
                if (err) {
                    console.error('Error deleting user:', err);
                    reject(err);
                } else {
                    resolve({ success: true, message: 'User deleted' });
                }
            });
        });
    }

    // Get all users with filters
    getUsers(filters = {}) {
        return new Promise((resolve, reject) => {
            let query = 'SELECT * FROM users WHERE 1=1';
            const params = [];

            if (filters.role) {
                query += ' AND role = ?';
                params.push(filters.role);
            }

            if (filters.tier !== undefined) {
                query += ' AND tier = ?';
                params.push(filters.tier);
            }

            if (filters.status) {
                query += ' AND subscription_status = ?';
                params.push(filters.status);
            }

            if (filters.search) {
                query += ' AND (email LIKE ? OR full_name LIKE ?)';
                params.push(`%${filters.search}%`, `%${filters.search}%`);
            }

            if (filters.isActive !== undefined) {
                query += ' AND is_active = ?';
                params.push(filters.isActive ? 1 : 0);
            }

            query += ' ORDER BY created_at DESC';

            if (filters.limit) {
                query += ' LIMIT ?';
                params.push(filters.limit);
                
                if (filters.page && filters.page > 1) {
                    query += ' OFFSET ?';
                    params.push((filters.page - 1) * filters.limit);
                }
            }

            this.db.all(query, params, (err, rows) => {
                if (err) {
                    console.error('Error fetching users:', err);
                    reject(err);
                } else {
                    resolve(rows || []);
                }
            });
        });
    }

    // ==================== VC ASSIGNMENT METHODS ====================

    // Assign startups to VC
    assignStartupsToVC(vcUserId, startupUserIds, assignedBy, notes = null) {
        return new Promise((resolve, reject) => {
            const promises = startupUserIds.map(startupId => {
                return new Promise((res, rej) => {
                    const query = `
                        INSERT OR REPLACE INTO vc_assignments 
                        (vc_user_id, startup_user_id, assigned_by, notes)
                        VALUES (?, ?, ?, ?)
                    `;
                    
                    this.db.run(query, [vcUserId, startupId, assignedBy, notes], function(err) {
                        if (err) rej(err);
                        else res({ id: this.lastID, startupId });
                    });
                });
            });

            Promise.all(promises)
                .then(results => resolve(results))
                .catch(reject);
        });
    }

    // Remove VC assignment
    removeVCAssignment(assignmentId) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM vc_assignments WHERE id = ?';
            
            this.db.run(query, [assignmentId], (err) => {
                if (err) {
                    console.error('Error removing VC assignment:', err);
                    reject(err);
                } else {
                    resolve({ success: true, message: 'Assignment removed' });
                }
            });
        });
    }

    // Get all VC assignments
    getVCAssignments() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    va.*,
                    vc.email as vc_email,
                    vc.full_name as vc_name,
                    startup.email as startup_email,
                    startup.full_name as startup_name
                FROM vc_assignments va
                JOIN users vc ON va.vc_user_id = vc.id
                JOIN users startup ON va.startup_user_id = startup.id
                WHERE va.is_active = 1
                ORDER BY va.assigned_at DESC
            `;

            this.db.all(query, [], (err, rows) => {
                if (err) {
                    console.error('Error fetching VC assignments:', err);
                    reject(err);
                } else {
                    resolve(rows || []);
                }
            });
        });
    }

    // Get VC's portfolio with GTM scores
    getVCPortfolio(vcUserId) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    u.id,
                    u.email,
                    u.full_name,
                    u.tier,
                    u.created_at,
                    va.assigned_at,
                    va.notes
                FROM vc_assignments va
                JOIN users u ON va.startup_user_id = u.id
                WHERE va.vc_user_id = ? AND va.is_active = 1
                ORDER BY va.assigned_at DESC
            `;

            this.db.all(query, [vcUserId], async (err, rows) => {
                if (err) {
                    console.error('Error fetching VC portfolio:', err);
                    reject(err);
                } else {
                    // Enrich with GTM scores for each startup
                    const portfolio = await Promise.all(
                        rows.map(async (startup) => {
                            const gtmScores = await this.getUserGTMScores(startup.id);
                            return {
                                ...startup,
                                gtmScores
                            };
                        })
                    );
                    resolve(portfolio);
                }
            });
        });
    }

    // Get user's GTM scores summary
    getUserGTMScores(userId) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    sh.subcomponent_id,
                    sh.overall_score,
                    sh.created_at,
                    sh.block_id
                FROM score_history sh
                WHERE sh.user_id = ?
                ORDER BY sh.created_at DESC
            `;

            this.db.all(query, [userId], (err, rows) => {
                if (err) {
                    console.error('Error fetching user GTM scores:', err);
                    reject(err);
                } else {
                    // Calculate average by block
                    const blockScores = {};
                    rows.forEach(row => {
                        if (!blockScores[row.block_id]) {
                            blockScores[row.block_id] = [];
                        }
                        blockScores[row.block_id].push(row.overall_score);
                    });

                    const summary = Object.entries(blockScores).map(([blockId, scores]) => ({
                        blockId: parseInt(blockId),
                        averageScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
                        completedSubcomponents: scores.length
                    }));

                    resolve({
                        blockScores: summary,
                        totalSubcomponents: rows.length,
                        overallAverage: rows.length > 0 
                            ? Math.round(rows.reduce((sum, r) => sum + r.overall_score, 0) / rows.length)
                            : 0
                    });
                }
            });
        });
    }

    // ==================== ADMIN ANALYTICS METHODS ====================

    // Get admin overview statistics
    getAdminOverviewStats() {
        return new Promise((resolve, reject) => {
            const queries = {
                totalUsers: 'SELECT COUNT(*) as count FROM users WHERE is_active = 1',
                activeUsers: `SELECT COUNT(*) as count FROM users WHERE last_login >= datetime('now', '-7 days')`,
                paidUsers: 'SELECT COUNT(*) as count FROM users WHERE tier >= 1',
                totalAssessments: 'SELECT COUNT(*) as count FROM score_history'
            };

            const stats = {};
            const promises = Object.entries(queries).map(([key, query]) => {
                return new Promise((res, rej) => {
                    this.db.get(query, [], (err, row) => {
                        if (err) rej(err);
                        else {
                            stats[key] = row.count;
                            res();
                        }
                    });
                });
            });

            Promise.all(promises)
                .then(() => resolve(stats))
                .catch(reject);
        });
    }

    // Get GTM score analytics
    getGTMScoreAnalytics(days = 30) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    sh.subcomponent_id,
                    sh.block_id,
                    AVG(sh.overall_score) as avg_score,
                    COUNT(DISTINCT sh.user_id) as user_count,
                    COUNT(*) as assessment_count
                FROM score_history sh
                WHERE sh.created_at >= datetime('now', '-' || ? || ' days')
                GROUP BY sh.subcomponent_id, sh.block_id
                ORDER BY sh.block_id, sh.subcomponent_id
            `;

            this.db.all(query, [days], (err, rows) => {
                if (err) {
                    console.error('Error fetching GTM analytics:', err);
                    reject(err);
                } else {
                    resolve(rows || []);
                }
            });
        });
    }

    // Get agent usage logs
    getAgentUsageLogs(days = 30, limit = 100) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    sh.agent_name,
                    sh.subcomponent_id,
                    sh.user_id,
                    sh.created_at,
                    sh.overall_score,
                    sh.status
                FROM score_history sh
                WHERE sh.created_at >= datetime('now', '-' || ? || ' days')
                ORDER BY sh.created_at DESC
                LIMIT ?
            `;

            this.db.all(query, [days, limit], (err, rows) => {
                if (err) {
                    console.error('Error fetching agent usage logs:', err);
                    reject(err);
                } else {
                    resolve(rows || []);
                }
            });
        });
    }

    // ==================== ADMIN ACTION LOGGING ====================

    // Log admin action
    logAdminAction(adminUserId, actionType, targetUserId = null, actionDetails = {}, ipAddress = null) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO admin_actions 
                (admin_user_id, action_type, target_user_id, action_details, ip_address)
                VALUES (?, ?, ?, ?, ?)
            `;

            const params = [
                adminUserId,
                actionType,
                targetUserId,
                JSON.stringify(actionDetails),
                ipAddress
            ];

            this.db.run(query, params, function(err) {
                if (err) {
                    console.error('Error logging admin action:', err);
                    reject(err);
                } else {
                    resolve({
                        success: true,
                        actionId: this.lastID
                    });
                }
            });
        });
    }

    // Get admin action history
    getAdminActionHistory(filters = {}) {
        return new Promise((resolve, reject) => {
            let query = `
                SELECT 
                    aa.*,
                    admin.email as admin_email,
                    admin.full_name as admin_name,
                    target.email as target_email,
                    target.full_name as target_name
                FROM admin_actions aa
                JOIN users admin ON aa.admin_user_id = admin.id
                LEFT JOIN users target ON aa.target_user_id = target.id
                WHERE 1=1
            `;
            const params = [];

            if (filters.adminUserId) {
                query += ' AND aa.admin_user_id = ?';
                params.push(filters.adminUserId);
            }

            if (filters.actionType) {
                query += ' AND aa.action_type = ?';
                params.push(filters.actionType);
            }

            if (filters.days) {
                query += ` AND aa.timestamp >= datetime('now', '-' || ? || ' days')`;
                params.push(filters.days);
            }

            query += ' ORDER BY aa.timestamp DESC';

            if (filters.limit) {
                query += ' LIMIT ?';
                params.push(filters.limit);
            }

            this.db.all(query, params, (err, rows) => {
                if (err) {
                    console.error('Error fetching admin action history:', err);
                    reject(err);
                } else {
                    const actions = rows.map(row => ({
                        ...row,
                        action_details: JSON.parse(row.action_details || '{}')
                    }));
                    resolve(actions);
                }
            });
        });
    }

    // ==================== USER TAGS & NOTES ====================

    // Add tag to user
    addUserTag(userId, tag, createdBy) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT OR IGNORE INTO user_tags (user_id, tag, created_by)
                VALUES (?, ?, ?)
            `;

            this.db.run(query, [userId, tag, createdBy], function(err) {
                if (err) {
                    console.error('Error adding user tag:', err);
                    reject(err);
                } else {
                    resolve({
                        success: true,
                        tagId: this.lastID
                    });
                }
            });
        });
    }

    // Remove tag from user
    removeUserTag(userId, tag) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM user_tags WHERE user_id = ? AND tag = ?';
            
            this.db.run(query, [userId, tag], (err) => {
                if (err) {
                    console.error('Error removing user tag:', err);
                    reject(err);
                } else {
                    resolve({ success: true });
                }
            });
        });
    }

    // Get user tags
    getUserTags(userId) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM user_tags WHERE user_id = ? ORDER BY created_at DESC';
            
            this.db.all(query, [userId], (err, rows) => {
                if (err) {
                    console.error('Error fetching user tags:', err);
                    reject(err);
                } else {
                    resolve(rows || []);
                }
            });
        });
    }

    // Add admin note
    addAdminNote(userId, note, createdBy, isPinned = false) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO admin_notes (user_id, note, created_by, is_pinned)
                VALUES (?, ?, ?, ?)
            `;

            this.db.run(query, [userId, note, createdBy, isPinned ? 1 : 0], function(err) {
                if (err) {
                    console.error('Error adding admin note:', err);
                    reject(err);
                } else {
                    resolve({
                        success: true,
                        noteId: this.lastID
                    });
                }
            });
        });
    }

    // Get admin notes for user
    getAdminNotes(userId) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    an.*,
                    u.email as created_by_email,
                    u.full_name as created_by_name
                FROM admin_notes an
                JOIN users u ON an.created_by = u.id
                WHERE an.user_id = ?
                ORDER BY an.is_pinned DESC, an.created_at DESC
            `;

            this.db.all(query, [userId], (err, rows) => {
                if (err) {
                    console.error('Error fetching admin notes:', err);
                    reject(err);
                } else {
                    resolve(rows || []);
                }
            });
        });
    }

    // ==================== STRIPE EVENT TRACKING ====================

    // Log Stripe event
    logStripeEvent(eventData) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO stripe_events 
                (stripe_event_id, event_type, user_id, customer_id, subscription_id, event_data)
                VALUES (?, ?, ?, ?, ?, ?)
            `;

            const params = [
                eventData.stripeEventId,
                eventData.eventType,
                eventData.userId || null,
                eventData.customerId || null,
                eventData.subscriptionId || null,
                JSON.stringify(eventData.data || {})
            ];

            this.db.run(query, params, function(err) {
                if (err) {
                    console.error('Error logging Stripe event:', err);
                    reject(err);
                } else {
                    resolve({
                        success: true,
                        eventId: this.lastID
                    });
                }
            });
        });
    }

    // Mark Stripe event as processed
    markStripeEventProcessed(stripeEventId) {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE stripe_events 
                SET processed = 1, processed_at = CURRENT_TIMESTAMP
                WHERE stripe_event_id = ?
            `;

            this.db.run(query, [stripeEventId], (err) => {
                if (err) {
                    console.error('Error marking Stripe event as processed:', err);
                    reject(err);
                } else {
                    resolve({ success: true });
                }
            });
        });
    }

    // Get unprocessed Stripe events
    getUnprocessedStripeEvents() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM stripe_events 
                WHERE processed = 0 
                ORDER BY created_at ASC
            `;

            this.db.all(query, [], (err, rows) => {
                if (err) {
                    console.error('Error fetching unprocessed Stripe events:', err);
                    reject(err);
                } else {
                    const events = rows.map(row => ({
                        ...row,
                        event_data: JSON.parse(row.event_data || '{}')
                    }));
                    resolve(events);
                }
            });
        });
    }
}

module.exports = DatabaseService;
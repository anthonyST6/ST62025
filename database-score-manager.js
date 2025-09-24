// Database Score Manager - Ensures consistent scoring across the platform
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class DatabaseScoreManager {
    constructor() {
        this.db = new sqlite3.Database(path.join(__dirname, 'scaleops6.db'));
        this.initializeTables();
    }

    // Initialize score persistence tables if they don't exist
    initializeTables() {
        // Create block_scores table for persistent storage
        this.db.run(`
            CREATE TABLE IF NOT EXISTS block_scores (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                block_id INTEGER NOT NULL,
                score INTEGER NOT NULL,
                trend TEXT DEFAULT 'stable',
                last_change DATETIME DEFAULT CURRENT_TIMESTAMP,
                source TEXT DEFAULT 'manual',
                metadata TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(user_id, block_id)
            )
        `);

        // Create subcomponent_scores table
        this.db.run(`
            CREATE TABLE IF NOT EXISTS subcomponent_scores (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                block_id INTEGER NOT NULL,
                subcomponent_id TEXT NOT NULL,
                score INTEGER NOT NULL,
                source TEXT DEFAULT 'manual',
                analysis_data TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(user_id, subcomponent_id)
            )
        `);

        // Create score_history table for tracking changes
        this.db.run(`
            CREATE TABLE IF NOT EXISTS score_history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                block_id INTEGER NOT NULL,
                subcomponent_id TEXT,
                old_score INTEGER,
                new_score INTEGER,
                change_type TEXT,
                change_reason TEXT,
                metadata TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
    }

    // Get block score from database (not test company)
    getBlockScore(userId, blockId) {
        return new Promise((resolve, reject) => {
            this.db.get(
                `SELECT * FROM block_scores WHERE user_id = ? AND block_id = ?`,
                [userId, blockId],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                }
            );
        });
    }

    // Save block score to database
    saveBlockScore(userId, blockId, score, source = 'agent', metadata = {}) {
        return new Promise((resolve, reject) => {
            // First get the old score for history
            this.getBlockScore(userId, blockId).then(oldData => {
                const oldScore = oldData ? oldData.score : null;
                
                // Calculate trend
                let trend = 'stable';
                if (oldScore !== null) {
                    if (score > oldScore) trend = 'up';
                    else if (score < oldScore) trend = 'down';
                }

                // Insert or update the score
                this.db.run(
                    `INSERT INTO block_scores (user_id, block_id, score, trend, source, metadata, updated_at)
                     VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
                     ON CONFLICT(user_id, block_id) 
                     DO UPDATE SET 
                        score = excluded.score,
                        trend = excluded.trend,
                        source = excluded.source,
                        metadata = excluded.metadata,
                        last_change = CURRENT_TIMESTAMP,
                        updated_at = CURRENT_TIMESTAMP`,
                    [userId, blockId, score, trend, source, JSON.stringify(metadata)],
                    (err) => {
                        if (err) {
                            reject(err);
                            return;
                        }

                        // Log to history
                        if (oldScore !== null && oldScore !== score) {
                            this.logScoreChange(userId, blockId, null, oldScore, score, 'update', source);
                        }

                        resolve({ 
                            success: true, 
                            blockId, 
                            score, 
                            oldScore, 
                            trend,
                            change: oldScore ? score - oldScore : 0 
                        });
                    }
                );
            }).catch(reject);
        });
    }

    // Save subcomponent score
    saveSubcomponentScore(userId, blockId, subcomponentId, score, source = 'agent', analysisData = {}) {
        return new Promise((resolve, reject) => {
            // Get old score first
            this.db.get(
                `SELECT score FROM subcomponent_scores WHERE user_id = ? AND subcomponent_id = ?`,
                [userId, subcomponentId],
                (err, oldData) => {
                    const oldScore = oldData ? oldData.score : null;

                    // Save new score
                    this.db.run(
                        `INSERT INTO subcomponent_scores (user_id, block_id, subcomponent_id, score, source, analysis_data, updated_at)
                         VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
                         ON CONFLICT(user_id, subcomponent_id)
                         DO UPDATE SET
                            score = excluded.score,
                            source = excluded.source,
                            analysis_data = excluded.analysis_data,
                            updated_at = CURRENT_TIMESTAMP`,
                        [userId, blockId, subcomponentId, score, source, JSON.stringify(analysisData)],
                        (err) => {
                            if (err) {
                                reject(err);
                                return;
                            }

                            // Log to history
                            if (oldScore !== null && oldScore !== score) {
                                this.logScoreChange(userId, blockId, subcomponentId, oldScore, score, 'update', source);
                            }

                            // Now recalculate the main block score
                            this.recalculateBlockScore(userId, blockId).then(blockResult => {
                                resolve({
                                    success: true,
                                    subcomponentId,
                                    score,
                                    oldScore,
                                    blockScore: blockResult.score,
                                    change: oldScore ? score - oldScore : 0
                                });
                            }).catch(reject);
                        }
                    );
                }
            );
        });
    }

    // Recalculate block score from subcomponents
    recalculateBlockScore(userId, blockId) {
        return new Promise((resolve, reject) => {
            // Define the expected number of subcomponents per block
            const SUBCOMPONENTS_PER_BLOCK = 6;
            
            // Get all subcomponent scores for this block
            this.db.all(
                `SELECT subcomponent_id, score FROM subcomponent_scores WHERE user_id = ? AND block_id = ?`,
                [userId, blockId],
                (err, rows) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    // Create a map of existing scores
                    const scoreMap = {};
                    if (rows && rows.length > 0) {
                        rows.forEach(row => {
                            // Extract subcomponent index from ID (e.g., "2-1" -> 1)
                            const parts = row.subcomponent_id.split('-');
                            if (parts.length === 2) {
                                const subIndex = parseInt(parts[1]);
                                scoreMap[subIndex] = row.score;
                            }
                        });
                    }

                    // Build complete score array with defaults for missing subcomponents
                    const allScores = [];
                    for (let i = 1; i <= SUBCOMPONENTS_PER_BLOCK; i++) {
                        if (scoreMap[i] !== undefined) {
                            // Use the actual score from database
                            allScores.push(scoreMap[i]);
                        } else {
                            // Use a default score for unanalyzed subcomponents
                            // We'll use 30 as a conservative default for unanalyzed components
                            allScores.push(30);
                        }
                    }

                    // Calculate average of all 6 subcomponents
                    const total = allScores.reduce((sum, score) => sum + score, 0);
                    const avgScore = Math.round(total / SUBCOMPONENTS_PER_BLOCK);
                    
                    console.log(`📊 Block ${blockId} score calculation:`, {
                        analyzedSubcomponents: Object.keys(scoreMap).length,
                        totalSubcomponents: SUBCOMPONENTS_PER_BLOCK,
                        scores: allScores,
                        average: avgScore
                    });
                    
                    // Save the recalculated score
                    this.saveBlockScore(userId, blockId, avgScore, 'recalculated', {
                        subcomponentCount: SUBCOMPONENTS_PER_BLOCK,
                        analyzedCount: Object.keys(scoreMap).length,
                        subcomponentScores: allScores
                    }).then(resolve).catch(reject);
                }
            );
        });
    }

    // Log score changes for history tracking
    logScoreChange(userId, blockId, subcomponentId, oldScore, newScore, changeType, changeReason) {
        this.db.run(
            `INSERT INTO score_history (user_id, block_id, subcomponent_id, old_score, new_score, change_type, change_reason)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [userId, blockId, subcomponentId, oldScore, newScore, changeType, changeReason]
        );
    }

    // Get all block scores for a user
    getAllBlockScores(userId) {
        return new Promise((resolve, reject) => {
            this.db.all(
                `SELECT * FROM block_scores WHERE user_id = ? ORDER BY block_id`,
                [userId],
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows || []);
                }
            );
        });
    }

    // Get score history for a block
    getScoreHistory(userId, blockId, days = 30) {
        return new Promise((resolve, reject) => {
            const dateLimit = new Date();
            dateLimit.setDate(dateLimit.getDate() - days);
            
            this.db.all(
                `SELECT * FROM score_history 
                 WHERE user_id = ? AND block_id = ? 
                 AND created_at >= datetime(?)
                 ORDER BY created_at DESC`,
                [userId, blockId, dateLimit.toISOString()],
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows || []);
                }
            );
        });
    }
    
    // Get all subcomponent scores for a user
    getAllSubcomponentScores(userId) {
        return new Promise((resolve, reject) => {
            this.db.all(
                `SELECT * FROM subcomponent_scores WHERE user_id = ? ORDER BY block_id, subcomponent_id`,
                [userId],
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows || []);
                }
            );
        });
    }
    
    // Get subcomponent scores for a specific block
    getSubcomponentScoresByBlock(userId, blockId) {
        return new Promise((resolve, reject) => {
            this.db.all(
                `SELECT * FROM subcomponent_scores WHERE user_id = ? AND block_id = ? ORDER BY subcomponent_id`,
                [userId, blockId],
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows || []);
                }
            );
        });
    }

    // Initialize default scores for a new user
    initializeUserScores(userId, defaultScores = {}) {
        const promises = [];
        
        // Initialize all 16 blocks with default or provided scores
        for (let blockId = 1; blockId <= 16; blockId++) {
            const score = defaultScores[blockId] || 50; // Default to 50% if not provided
            promises.push(this.saveBlockScore(userId, blockId, score, 'initial'));
        }
        
        return Promise.all(promises);
    }

    // Close database connection
    close() {
        this.db.close();
    }
}

module.exports = DatabaseScoreManager;
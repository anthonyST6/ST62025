const { Pool } = require('pg');
const winston = require('winston');
require('dotenv').config();

// Configure Winston logger
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }),
        new winston.transports.File({ 
            filename: 'logs/error.log', 
            level: 'error' 
        }),
        new winston.transports.File({ 
            filename: 'logs/combined.log' 
        })
    ]
});

// PostgreSQL connection pool configuration
const poolConfig = {
    connectionString: process.env.DATABASE_URL,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'scaleops6',
    user: process.env.DB_USER || 'scaleops6_user',
    password: process.env.DB_PASSWORD,
    max: 20, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000, // How long a client is allowed to remain idle
    connectionTimeoutMillis: 2000, // How long to wait for a connection
    ssl: process.env.DB_SSL === 'true' ? {
        rejectUnauthorized: false
    } : false
};

// Create the connection pool
const pool = new Pool(poolConfig);

// Handle pool errors
pool.on('error', (err, client) => {
    logger.error('Unexpected error on idle PostgreSQL client', err);
});

// Test the connection
pool.on('connect', (client) => {
    logger.info('New PostgreSQL client connected to the pool');
});

// Database helper class
class Database {
    /**
     * Execute a query with automatic connection handling
     * @param {string} text - SQL query text
     * @param {Array} params - Query parameters
     * @returns {Promise<Object>} Query result
     */
    static async query(text, params = []) {
        const start = Date.now();
        try {
            const result = await pool.query(text, params);
            const duration = Date.now() - start;
            
            // Log slow queries
            if (duration > 1000) {
                logger.warn('Slow query detected', {
                    query: text,
                    duration,
                    rows: result.rowCount
                });
            }
            
            return result;
        } catch (error) {
            logger.error('Database query error', {
                query: text,
                error: error.message,
                stack: error.stack
            });
            throw error;
        }
    }

    /**
     * Get a single row
     * @param {string} text - SQL query text
     * @param {Array} params - Query parameters
     * @returns {Promise<Object|null>} Single row or null
     */
    static async getOne(text, params = []) {
        const result = await this.query(text, params);
        return result.rows[0] || null;
    }

    /**
     * Get multiple rows
     * @param {string} text - SQL query text
     * @param {Array} params - Query parameters
     * @returns {Promise<Array>} Array of rows
     */
    static async getMany(text, params = []) {
        const result = await this.query(text, params);
        return result.rows;
    }

    /**
     * Insert a row and return it
     * @param {string} table - Table name
     * @param {Object} data - Data to insert
     * @returns {Promise<Object>} Inserted row
     */
    static async insert(table, data) {
        const keys = Object.keys(data);
        const values = Object.values(data);
        const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
        
        const text = `
            INSERT INTO ${table} (${keys.join(', ')})
            VALUES (${placeholders})
            RETURNING *
        `;
        
        const result = await this.query(text, values);
        return result.rows[0];
    }

    /**
     * Update rows
     * @param {string} table - Table name
     * @param {Object} data - Data to update
     * @param {Object} where - WHERE conditions
     * @returns {Promise<Array>} Updated rows
     */
    static async update(table, data, where) {
        const dataKeys = Object.keys(data);
        const dataValues = Object.values(data);
        const whereKeys = Object.keys(where);
        const whereValues = Object.values(where);
        
        const setClause = dataKeys.map((key, i) => `${key} = $${i + 1}`).join(', ');
        const whereClause = whereKeys.map((key, i) => `${key} = $${dataValues.length + i + 1}`).join(' AND ');
        
        const text = `
            UPDATE ${table}
            SET ${setClause}, updated_at = CURRENT_TIMESTAMP
            WHERE ${whereClause}
            RETURNING *
        `;
        
        const result = await this.query(text, [...dataValues, ...whereValues]);
        return result.rows;
    }

    /**
     * Delete rows
     * @param {string} table - Table name
     * @param {Object} where - WHERE conditions
     * @returns {Promise<number>} Number of deleted rows
     */
    static async delete(table, where) {
        const keys = Object.keys(where);
        const values = Object.values(where);
        const whereClause = keys.map((key, i) => `${key} = $${i + 1}`).join(' AND ');
        
        const text = `DELETE FROM ${table} WHERE ${whereClause}`;
        const result = await this.query(text, values);
        return result.rowCount;
    }

    /**
     * Begin a transaction
     * @returns {Promise<Object>} Transaction client
     */
    static async beginTransaction() {
        const client = await pool.connect();
        await client.query('BEGIN');
        return client;
    }

    /**
     * Commit a transaction
     * @param {Object} client - Transaction client
     */
    static async commitTransaction(client) {
        await client.query('COMMIT');
        client.release();
    }

    /**
     * Rollback a transaction
     * @param {Object} client - Transaction client
     */
    static async rollbackTransaction(client) {
        await client.query('ROLLBACK');
        client.release();
    }

    /**
     * Execute a transaction with automatic rollback on error
     * @param {Function} callback - Transaction callback
     * @returns {Promise<*>} Transaction result
     */
    static async transaction(callback) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const result = await callback(client);
            await client.query('COMMIT');
            return result;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    /**
     * Set organization context for RLS
     * @param {string} organizationId - Organization UUID
     */
    static async setOrganizationContext(organizationId) {
        if (!organizationId) {
            throw new Error('Organization ID is required for context');
        }
        await this.query('SET LOCAL app.current_org_id = $1', [organizationId]);
    }

    /**
     * Check if a table exists
     * @param {string} tableName - Table name
     * @returns {Promise<boolean>} True if table exists
     */
    static async tableExists(tableName) {
        const result = await this.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = $1
            )
        `, [tableName]);
        return result.rows[0].exists;
    }

    /**
     * Get table row count
     * @param {string} tableName - Table name
     * @returns {Promise<number>} Row count
     */
    static async getTableCount(tableName) {
        const result = await this.query(`SELECT COUNT(*) FROM ${tableName}`);
        return parseInt(result.rows[0].count);
    }

    /**
     * Bulk insert
     * @param {string} table - Table name
     * @param {Array} records - Array of objects to insert
     * @returns {Promise<Array>} Inserted rows
     */
    static async bulkInsert(table, records) {
        if (!records || records.length === 0) {
            return [];
        }

        const keys = Object.keys(records[0]);
        const values = [];
        const placeholders = [];

        records.forEach((record, recordIndex) => {
            const recordPlaceholders = keys.map((key, keyIndex) => {
                const paramIndex = recordIndex * keys.length + keyIndex + 1;
                values.push(record[key]);
                return `$${paramIndex}`;
            });
            placeholders.push(`(${recordPlaceholders.join(', ')})`);
        });

        const text = `
            INSERT INTO ${table} (${keys.join(', ')})
            VALUES ${placeholders.join(', ')}
            RETURNING *
        `;

        const result = await this.query(text, values);
        return result.rows;
    }

    /**
     * Execute raw SQL file
     * @param {string} sqlContent - SQL file content
     */
    static async executeSql(sqlContent) {
        const client = await pool.connect();
        try {
            await client.query(sqlContent);
            logger.info('SQL executed successfully');
        } catch (error) {
            logger.error('Error executing SQL', error);
            throw error;
        } finally {
            client.release();
        }
    }

    /**
     * Health check
     * @returns {Promise<Object>} Database health status
     */
    static async healthCheck() {
        try {
            const result = await this.query('SELECT NOW() as current_time, version() as version');
            return {
                status: 'healthy',
                timestamp: result.rows[0].current_time,
                version: result.rows[0].version,
                pool: {
                    total: pool.totalCount,
                    idle: pool.idleCount,
                    waiting: pool.waitingCount
                }
            };
        } catch (error) {
            return {
                status: 'unhealthy',
                error: error.message,
                pool: {
                    total: pool.totalCount,
                    idle: pool.idleCount,
                    waiting: pool.waitingCount
                }
            };
        }
    }

    /**
     * Close all connections
     */
    static async close() {
        await pool.end();
        logger.info('PostgreSQL connection pool closed');
    }
}

// Export the pool and Database class
module.exports = {
    pool,
    Database,
    logger
};

// Graceful shutdown
process.on('SIGINT', async () => {
    logger.info('SIGINT received, closing database connections...');
    await Database.close();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    logger.info('SIGTERM received, closing database connections...');
    await Database.close();
    process.exit(0);
});
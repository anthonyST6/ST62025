/**
 * Update Database Schema
 * Adds the generated_documents table to the existing database
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'scaleops6.db');
const db = new sqlite3.Database(dbPath);

console.log('📊 Updating database schema...');

// Create generated_documents table
db.run(`
    CREATE TABLE IF NOT EXISTS generated_documents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subcomponent_id VARCHAR(10) NOT NULL,
        document_type VARCHAR(10) NOT NULL,
        document_name VARCHAR(255) NOT NULL,
        file_path TEXT NOT NULL,
        file_size INTEGER,
        mime_type VARCHAR(100),
        metadata TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`, (err) => {
    if (err) {
        console.error('❌ Error creating generated_documents table:', err);
    } else {
        console.log('✅ generated_documents table created successfully');
    }
});

// Create indexes
db.run(`
    CREATE INDEX IF NOT EXISTS idx_generated_docs_subcomponent 
    ON generated_documents(subcomponent_id)
`, (err) => {
    if (err) {
        console.error('❌ Error creating subcomponent index:', err);
    } else {
        console.log('✅ Subcomponent index created');
    }
});

db.run(`
    CREATE INDEX IF NOT EXISTS idx_generated_docs_type 
    ON generated_documents(document_type)
`, (err) => {
    if (err) {
        console.error('❌ Error creating document_type index:', err);
    } else {
        console.log('✅ Document type index created');
    }
    
    // Close database after all operations
    db.close((err) => {
        if (err) {
            console.error('❌ Error closing database:', err);
        } else {
            console.log('✅ Database schema update complete!');
        }
    });
});
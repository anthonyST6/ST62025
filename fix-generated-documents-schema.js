/**
 * Fix generated_documents table schema
 * Adds missing document_name and mime_type columns if they don't exist
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'scaleops6.db');
const db = new sqlite3.Database(dbPath);

console.log('🔧 Fixing generated_documents table schema...');

// Check which columns exist
db.all("PRAGMA table_info(generated_documents)", (err, columns) => {
    if (err) {
        console.error('❌ Error checking table schema:', err);
        db.close();
        return;
    }
    
    const hasDocumentName = columns.some(col => col.name === 'document_name');
    const hasMimeType = columns.some(col => col.name === 'mime_type');
    const hasMetadata = columns.some(col => col.name === 'metadata');
    
    console.log(`📊 Current columns: ${columns.map(c => c.name).join(', ')}`);
    console.log(`   document_name: ${hasDocumentName ? '✅' : '❌'}`);
    console.log(`   mime_type: ${hasMimeType ? '✅' : '❌'}`);
    console.log(`   metadata: ${hasMetadata ? '✅' : '❌'}`);
    
    const columnsToAdd = [];
    if (!hasDocumentName) columnsToAdd.push({ name: 'document_name', sql: `ALTER TABLE generated_documents ADD COLUMN document_name TEXT NOT NULL DEFAULT 'document.docx'` });
    if (!hasMimeType) columnsToAdd.push({ name: 'mime_type', sql: `ALTER TABLE generated_documents ADD COLUMN mime_type TEXT DEFAULT 'application/octet-stream'` });
    if (!hasMetadata) columnsToAdd.push({ name: 'metadata', sql: `ALTER TABLE generated_documents ADD COLUMN metadata TEXT DEFAULT '{}'` });
    
    if (columnsToAdd.length === 0) {
        console.log('✅ All required columns already exist');
        db.close();
        return;
    }
    
    console.log(`📝 Adding ${columnsToAdd.length} missing column(s)...`);
    
    // Add columns sequentially
    let completed = 0;
    let hasError = false;
    
    columnsToAdd.forEach((col, index) => {
        db.run(col.sql, (err) => {
            if (err) {
                console.error(`❌ Error adding ${col.name} column:`, err.message);
                hasError = true;
            } else {
                console.log(`✅ ${col.name} column added successfully`);
            }
            
            completed++;
            if (completed === columnsToAdd.length) {
                db.close((closeErr) => {
                    if (closeErr) {
                        console.error('❌ Error closing database:', closeErr);
                    } else {
                        console.log('✅ Database schema fix complete!');
                    }
                    process.exit(hasError ? 1 : 0);
                });
            }
        });
    });
});
/**
 * Database Migration: Add Stripe Billing Tables
 * 
 * This migration adds tables for tracking:
 * - Stripe customer records
 * - Payment transactions
 * - Subscription status
 * - Billing history
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'scaleops6.db');
const db = new sqlite3.Database(dbPath);

console.log('🔄 Starting Stripe billing database migration...');

db.serialize(() => {
    // Stripe customers table
    db.run(`
        CREATE TABLE IF NOT EXISTS stripe_customers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL UNIQUE,
            stripe_customer_id TEXT UNIQUE NOT NULL,
            email TEXT NOT NULL,
            name TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    `, (err) => {
        if (err) {
            console.error('❌ Error creating stripe_customers table:', err);
        } else {
            console.log('✅ Created stripe_customers table');
        }
    });

    // Payment transactions table
    db.run(`
        CREATE TABLE IF NOT EXISTS payment_transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            stripe_customer_id TEXT NOT NULL,
            stripe_payment_intent_id TEXT UNIQUE NOT NULL,
            amount INTEGER NOT NULL,
            currency TEXT DEFAULT 'usd',
            status TEXT NOT NULL,
            description TEXT,
            metadata TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    `, (err) => {
        if (err) {
            console.error('❌ Error creating payment_transactions table:', err);
        } else {
            console.log('✅ Created payment_transactions table');
        }
    });

    // User billing status table
    db.run(`
        CREATE TABLE IF NOT EXISTS user_billing_status (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL UNIQUE,
            has_paid BOOLEAN DEFAULT 0,
            payment_amount INTEGER,
            payment_date DATETIME,
            stripe_payment_intent_id TEXT,
            access_granted BOOLEAN DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    `, (err) => {
        if (err) {
            console.error('❌ Error creating user_billing_status table:', err);
        } else {
            console.log('✅ Created user_billing_status table');
        }
    });

    // Billing events log table
    db.run(`
        CREATE TABLE IF NOT EXISTS billing_events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            event_type TEXT NOT NULL,
            stripe_event_id TEXT,
            amount INTEGER,
            status TEXT,
            metadata TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    `, (err) => {
        if (err) {
            console.error('❌ Error creating billing_events table:', err);
        } else {
            console.log('✅ Created billing_events table');
        }
    });

    // Add indexes for better query performance
    db.run(`CREATE INDEX IF NOT EXISTS idx_stripe_customers_user_id ON stripe_customers(user_id)`, (err) => {
        if (!err) console.log('✅ Created index on stripe_customers.user_id');
    });

    db.run(`CREATE INDEX IF NOT EXISTS idx_payment_transactions_user_id ON payment_transactions(user_id)`, (err) => {
        if (!err) console.log('✅ Created index on payment_transactions.user_id');
    });

    db.run(`CREATE INDEX IF NOT EXISTS idx_user_billing_status_user_id ON user_billing_status(user_id)`, (err) => {
        if (!err) console.log('✅ Created index on user_billing_status.user_id');
    });

    db.run(`CREATE INDEX IF NOT EXISTS idx_billing_events_user_id ON billing_events(user_id)`, (err) => {
        if (!err) console.log('✅ Created index on billing_events.user_id');
    });
});

// Close database after migration
setTimeout(() => {
    db.close((err) => {
        if (err) {
            console.error('❌ Error closing database:', err);
        } else {
            console.log('✅ Stripe billing migration completed successfully!');
            console.log('📊 New tables created:');
            console.log('   - stripe_customers');
            console.log('   - payment_transactions');
            console.log('   - user_billing_status');
            console.log('   - billing_events');
        }
        process.exit(0);
    });
}, 2000);
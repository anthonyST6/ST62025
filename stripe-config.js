/**
 * Stripe Configuration Module
 * 
 * Handles all Stripe-related operations including:
 * - Customer creation
 * - Payment intent creation
 * - Payment verification
 * - Webhook handling
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'your_stripe_test_key_here');

// Import database from database-service
const DatabaseService = require('./database-service.js');
const dbService = new DatabaseService();
const db = dbService.db;

class StripeService {
    /**
     * Create a Stripe customer for a user
     */
    static async createCustomer(userId, email, name) {
        try {
            console.log(`💳 Creating Stripe customer for user ${userId} (${email})`);
            
            const customer = await stripe.customers.create({
                email: email,
                name: name,
                metadata: {
                    userId: userId.toString(),
                    platform: 'ScaleOps6'
                }
            });

            // Save customer to database
            await new Promise((resolve, reject) => {
                db.run(
                    `INSERT INTO stripe_customers (user_id, stripe_customer_id, email, name)
                     VALUES (?, ?, ?, ?)`,
                    [userId, customer.id, email, name],
                    (err) => {
                        if (err) reject(err);
                        else resolve();
                    }
                );
            });

            console.log(`✅ Stripe customer created: ${customer.id}`);
            return customer;
        } catch (error) {
            console.error('❌ Error creating Stripe customer:', error);
            throw error;
        }
    }

    /**
     * Create a payment intent for $1.00
     */
    static async createPaymentIntent(userId, customerId) {
        try {
            console.log(`💰 Creating payment intent for user ${userId}`);
            
            const paymentIntent = await stripe.paymentIntents.create({
                amount: 100, // $1.00 in cents
                currency: 'usd',
                customer: customerId,
                description: 'ScaleOps6 Platform Access Fee',
                metadata: {
                    userId: userId.toString(),
                    platform: 'ScaleOps6',
                    purpose: 'signup_fee'
                },
                automatic_payment_methods: {
                    enabled: true,
                }
            });

            // Log transaction to database
            await new Promise((resolve, reject) => {
                db.run(
                    `INSERT INTO payment_transactions 
                     (user_id, stripe_customer_id, stripe_payment_intent_id, amount, currency, status, description)
                     VALUES (?, ?, ?, ?, ?, ?, ?)`,
                    [userId, customerId, paymentIntent.id, 100, 'usd', paymentIntent.status, 'Signup fee'],
                    (err) => {
                        if (err) reject(err);
                        else resolve();
                    }
                );
            });

            console.log(`✅ Payment intent created: ${paymentIntent.id}`);
            return paymentIntent;
        } catch (error) {
            console.error('❌ Error creating payment intent:', error);
            throw error;
        }
    }

    /**
     * Verify payment completion
     */
    static async verifyPayment(paymentIntentId) {
        try {
            console.log(`🔍 Verifying payment: ${paymentIntentId}`);
            
            const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
            
            if (paymentIntent.status === 'succeeded') {
                console.log(`✅ Payment verified: ${paymentIntentId}`);
                return {
                    success: true,
                    amount: paymentIntent.amount,
                    currency: paymentIntent.currency,
                    customerId: paymentIntent.customer
                };
            } else {
                console.log(`⚠️ Payment not completed: ${paymentIntent.status}`);
                return {
                    success: false,
                    status: paymentIntent.status
                };
            }
        } catch (error) {
            console.error('❌ Error verifying payment:', error);
            throw error;
        }
    }

    /**
     * Update user billing status after successful payment
     */
    static async updateUserBillingStatus(userId, paymentIntentId, amount) {
        try {
            console.log(`📝 Updating billing status for user ${userId}`);
            
            await new Promise((resolve, reject) => {
                db.run(
                    `INSERT INTO user_billing_status 
                     (user_id, has_paid, payment_amount, payment_date, stripe_payment_intent_id, access_granted)
                     VALUES (?, 1, ?, CURRENT_TIMESTAMP, ?, 1)
                     ON CONFLICT(user_id) DO UPDATE SET
                        has_paid = 1,
                        payment_amount = excluded.payment_amount,
                        payment_date = CURRENT_TIMESTAMP,
                        stripe_payment_intent_id = excluded.stripe_payment_intent_id,
                        access_granted = 1,
                        updated_at = CURRENT_TIMESTAMP`,
                    [userId, amount, paymentIntentId],
                    (err) => {
                        if (err) reject(err);
                        else resolve();
                    }
                );
            });

            // Update payment transaction status
            await new Promise((resolve, reject) => {
                db.run(
                    `UPDATE payment_transactions 
                     SET status = 'succeeded', updated_at = CURRENT_TIMESTAMP
                     WHERE stripe_payment_intent_id = ?`,
                    [paymentIntentId],
                    (err) => {
                        if (err) reject(err);
                        else resolve();
                    }
                );
            });

            // Log billing event
            await new Promise((resolve, reject) => {
                db.run(
                    `INSERT INTO billing_events 
                     (user_id, event_type, stripe_event_id, amount, status, metadata)
                     VALUES (?, 'payment_succeeded', ?, ?, 'completed', ?)`,
                    [userId, paymentIntentId, amount, JSON.stringify({ timestamp: new Date().toISOString() })],
                    (err) => {
                        if (err) reject(err);
                        else resolve();
                    }
                );
            });

            console.log(`✅ Billing status updated for user ${userId}`);
            return true;
        } catch (error) {
            console.error('❌ Error updating billing status:', error);
            throw error;
        }
    }

    /**
     * Check if user has paid
     */
    static async checkUserPaymentStatus(userId) {
        try {
            return new Promise((resolve, reject) => {
                db.get(
                    `SELECT * FROM user_billing_status WHERE user_id = ?`,
                    [userId],
                    (err, row) => {
                        if (err) reject(err);
                        else resolve(row);
                    }
                );
            });
        } catch (error) {
            console.error('❌ Error checking payment status:', error);
            throw error;
        }
    }

    /**
     * Get Stripe customer for user
     */
    static async getStripeCustomer(userId) {
        try {
            return new Promise((resolve, reject) => {
                db.get(
                    `SELECT * FROM stripe_customers WHERE user_id = ?`,
                    [userId],
                    (err, row) => {
                        if (err) reject(err);
                        else resolve(row);
                    }
                );
            });
        } catch (error) {
            console.error('❌ Error getting Stripe customer:', error);
            throw error;
        }
    }

    /**
     * Get payment transactions for user
     */
    static async getUserTransactions(userId) {
        try {
            return new Promise((resolve, reject) => {
                db.all(
                    `SELECT * FROM payment_transactions 
                     WHERE user_id = ? 
                     ORDER BY created_at DESC`,
                    [userId],
                    (err, rows) => {
                        if (err) reject(err);
                        else resolve(rows || []);
                    }
                );
            });
        } catch (error) {
            console.error('❌ Error getting transactions:', error);
            throw error;
        }
    }

    /**
     * Handle Stripe webhook events
     */
    static async handleWebhook(event) {
        try {
            console.log(`🔔 Handling webhook event: ${event.type}`);
            
            switch (event.type) {
                case 'payment_intent.succeeded':
                    const paymentIntent = event.data.object;
                    const userId = parseInt(paymentIntent.metadata.userId);
                    
                    if (userId) {
                        await this.updateUserBillingStatus(
                            userId,
                            paymentIntent.id,
                            paymentIntent.amount
                        );
                    }
                    break;

                case 'payment_intent.payment_failed':
                    console.log('⚠️ Payment failed:', event.data.object.id);
                    // Log failed payment
                    const failedIntent = event.data.object;
                    const failedUserId = parseInt(failedIntent.metadata.userId);
                    
                    if (failedUserId) {
                        await new Promise((resolve, reject) => {
                            db.run(
                                `INSERT INTO billing_events 
                                 (user_id, event_type, stripe_event_id, amount, status, metadata)
                                 VALUES (?, 'payment_failed', ?, ?, 'failed', ?)`,
                                [
                                    failedUserId,
                                    failedIntent.id,
                                    failedIntent.amount,
                                    JSON.stringify({ error: failedIntent.last_payment_error })
                                ],
                                (err) => {
                                    if (err) reject(err);
                                    else resolve();
                                }
                            );
                        });
                    }
                    break;

                default:
                    console.log(`ℹ️ Unhandled event type: ${event.type}`);
            }

            return { received: true };
        } catch (error) {
            console.error('❌ Error handling webhook:', error);
            throw error;
        }
    }
}

module.exports = StripeService;
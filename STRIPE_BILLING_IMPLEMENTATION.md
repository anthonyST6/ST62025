# Stripe Billing Integration - Implementation Guide

## Overview
This document describes the complete Stripe billing integration for the ScaleOps6 platform, including a $1.00 signup fee that users must pay before accessing the platform.

## Architecture

### Flow Diagram
```
User Signs Up → Firebase Auth → Payment Page → Stripe Payment → Verification → Dashboard Access
```

### Components Created

1. **Database Tables** (`database-migration-stripe-billing.js`)
   - `stripe_customers` - Links users to Stripe customer IDs
   - `payment_transactions` - Records all payment attempts and completions
   - `user_billing_status` - Tracks user payment status and platform access
   - `billing_events` - Logs all billing-related events

2. **Stripe Service** (`stripe-config.js`)
   - Customer creation
   - Payment intent management
   - Payment verification
   - Webhook handling
   - Billing status tracking

3. **Payment Page** (`payment.html`)
   - Stripe Elements integration
   - $1.00 payment collection
   - Real-time payment processing
   - Success/error handling

4. **API Endpoints** (added to `server.js`)
   - `POST /api/stripe/create-payment-intent` - Initialize payment
   - `POST /api/stripe/verify-payment` - Confirm payment success
   - `GET /api/stripe/payment-status` - Check if user has paid
   - `GET /api/stripe/transactions` - Get user transaction history
   - `POST /api/stripe/webhook` - Handle Stripe webhooks
   - `GET /api/admin/billing` - Admin billing dashboard data

## Setup Instructions

### 1. Install Required Dependencies

```bash
npm install stripe
```

### 2. Configure Environment Variables

Add to your `.env` file:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### 3. Run Database Migration

```bash
node database-migration-stripe-billing.js
```

This will create the following tables:
- `stripe_customers`
- `payment_transactions`
- `user_billing_status`
- `billing_events`

### 4. Update Stripe Keys in Frontend

Edit `payment.html` line 267:
```javascript
const stripe = Stripe('pk_test_your_publishable_key_here');
```

Replace with your actual Stripe publishable key.

### 5. Configure Stripe Webhook

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://yourdomain.com/api/stripe/webhook`
3. Select events to listen for:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
4. Copy the webhook signing secret to your `.env` file

## User Flow

### 1. Signup Process
1. User fills out signup form at `/signup.html`
2. Firebase creates authentication account
3. Backend creates user record in database
4. User is redirected to `/payment.html`

### 2. Payment Process
1. Payment page loads and checks if user already paid
2. If not paid, creates Stripe customer and payment intent
3. Stripe Elements displays payment form
4. User enters payment information
5. Payment is processed through Stripe
6. Backend verifies payment and updates billing status
7. User is redirected to `/dashboard.html`

### 3. Access Control
- Dashboard checks payment status on load
- Unpaid users are redirected back to payment page
- Admin dashboard shows billing status for all users

## API Endpoints

### Create Payment Intent
```http
POST /api/stripe/create-payment-intent
Headers:
  Authorization: Bearer {firebaseToken}
  x-user-id: {userId}
Body:
  {
    "email": "user@example.com"
  }
Response:
  {
    "clientSecret": "pi_xxx_secret_xxx",
    "customerId": "cus_xxx"
  }
```

### Verify Payment
```http
POST /api/stripe/verify-payment
Headers:
  Authorization: Bearer {firebaseToken}
  x-user-id: {userId}
Body:
  {
    "paymentIntentId": "pi_xxx"
  }
Response:
  {
    "success": true,
    "message": "Payment verified successfully"
  }
```

### Check Payment Status
```http
GET /api/stripe/payment-status
Headers:
  Authorization: Bearer {firebaseToken}
  x-user-id: {userId}
Response:
  {
    "hasPaid": true,
    "accessGranted": true,
    "paymentDate": "2025-01-15T10:30:00Z",
    "amount": 100
  }
```

### Get Transactions
```http
GET /api/stripe/transactions
Headers:
  Authorization: Bearer {firebaseToken}
  x-user-id: {userId}
Response:
  [
    {
      "id": 1,
      "stripe_payment_intent_id": "pi_xxx",
      "amount": 100,
      "currency": "usd",
      "status": "succeeded",
      "created_at": "2025-01-15T10:30:00Z"
    }
  ]
```

### Admin Billing Data
```http
GET /api/admin/billing
Response:
  {
    "users": [
      {
        "id": 1,
        "email": "user@example.com",
        "name": "John Doe",
        "stripe_customer_id": "cus_xxx",
        "has_paid": 1,
        "payment_amount": 100,
        "payment_date": "2025-01-15T10:30:00Z"
      }
    ],
    "stats": {
      "totalUsers": 100,
      "paidUsers": 85,
      "totalRevenue": 8500,
      "unpaidUsers": 15
    }
  }
```

## Database Schema

### stripe_customers
```sql
CREATE TABLE stripe_customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL UNIQUE,
    stripe_customer_id TEXT UNIQUE NOT NULL,
    email TEXT NOT NULL,
    name TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### payment_transactions
```sql
CREATE TABLE payment_transactions (
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
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### user_billing_status
```sql
CREATE TABLE user_billing_status (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL UNIQUE,
    has_paid BOOLEAN DEFAULT 0,
    payment_amount INTEGER,
    payment_date DATETIME,
    stripe_payment_intent_id TEXT,
    access_granted BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### billing_events
```sql
CREATE TABLE billing_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    event_type TEXT NOT NULL,
    stripe_event_id TEXT,
    amount INTEGER,
    status TEXT,
    metadata TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## Testing

### Test Mode
Use Stripe test keys for development:
- Secret Key: `sk_test_...`
- Publishable Key: `pk_test_...`

### Test Cards
```
Success: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002
Requires Authentication: 4000 0025 0000 3155
```

Use any future expiry date, any 3-digit CVC, and any ZIP code.

### Testing Checklist
- [ ] User can sign up successfully
- [ ] User is redirected to payment page
- [ ] Payment form loads correctly
- [ ] Successful payment grants access
- [ ] Failed payment shows error message
- [ ] User cannot access dashboard without payment
- [ ] Admin can view billing data
- [ ] Webhooks are received and processed
- [ ] Database records are created correctly

## Security Considerations

1. **API Keys**: Never expose secret keys in frontend code
2. **Webhook Verification**: Always verify webhook signatures
3. **Payment Verification**: Always verify payment status server-side
4. **Access Control**: Check payment status before granting platform access
5. **HTTPS**: Use HTTPS in production for all payment pages
6. **PCI Compliance**: Stripe handles PCI compliance; never store card data

## Production Deployment

### Pre-deployment Checklist
- [ ] Replace test Stripe keys with live keys
- [ ] Configure production webhook endpoint
- [ ] Test payment flow end-to-end
- [ ] Set up monitoring for failed payments
- [ ] Configure email notifications for payment events
- [ ] Test webhook delivery
- [ ] Verify database backups include billing tables
- [ ] Set up alerts for payment failures

### Environment Variables (Production)
```env
STRIPE_SECRET_KEY=sk_live_your_live_secret_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_live_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_live_webhook_secret
```

## Admin Dashboard Integration

The billing data is available in the admin dashboard at `/admin.html`. The existing billing section will automatically display:

- Total revenue
- Number of paid users
- Number of trial/unpaid users
- Individual user billing status
- Payment transaction history

## Troubleshooting

### Payment Not Processing
1. Check Stripe API keys are correct
2. Verify webhook endpoint is accessible
3. Check browser console for errors
4. Verify user has valid session

### User Stuck on Payment Page
1. Check if payment was actually successful in Stripe dashboard
2. Manually update `user_billing_status` table if needed
3. Check for webhook delivery failures

### Webhook Not Received
1. Verify webhook URL is correct and accessible
2. Check webhook signing secret matches
3. Review Stripe webhook logs in dashboard
4. Ensure server is not blocking Stripe IPs

## Support

For issues or questions:
1. Check Stripe Dashboard for payment details
2. Review server logs for errors
3. Check database tables for billing records
4. Contact Stripe support for payment processing issues

## Future Enhancements

Potential improvements:
- Subscription billing for recurring payments
- Multiple pricing tiers
- Coupon/discount code support
- Refund processing
- Invoice generation
- Payment method management
- Automatic retry for failed payments
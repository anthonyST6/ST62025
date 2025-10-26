# Stripe Billing Setup Instructions

## Quick Start Guide

Follow these steps to set up Stripe billing integration for the ScaleOps6 platform.

## Step 1: Install Dependencies

```bash
cd "../ST6 Nexus Ops/scaleops6-platform"
npm install stripe
```

## Step 2: Run Database Migration

Create the billing tables in your SQLite database:

```bash
node database-migration-stripe-billing.js
```

Expected output:
```
✅ Created stripe_customers table
✅ Created payment_transactions table
✅ Created user_billing_status table
✅ Created billing_events table
✅ Created indexes
✅ Stripe billing migration completed successfully!
```

## Step 3: Get Stripe API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create an account or log in
3. Navigate to **Developers → API keys**
4. Copy your keys:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`)

## Step 4: Configure Environment Variables

Create a `.env` file in the project root (or update existing one):

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

## Step 5: Update Frontend Stripe Key

Edit [`payment.html`](../ST6%20Nexus%20Ops/scaleops6-platform/payment.html:267) and replace the placeholder:

```javascript
// Line 267
const stripe = Stripe('pk_test_your_publishable_key_here');
```

Replace with your actual publishable key:

```javascript
const stripe = Stripe('pk_test_51ABC123...');
```

## Step 6: Set Up Stripe Webhook (Optional for Development)

For production or testing webhooks locally:

### Option A: Use Stripe CLI (Recommended for Development)

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Run: `stripe listen --forward-to localhost:3001/api/stripe/webhook`
3. Copy the webhook signing secret (starts with `whsec_`)
4. Add to your `.env` file

### Option B: Configure Production Webhook

1. Go to Stripe Dashboard → **Developers → Webhooks**
2. Click **Add endpoint**
3. Enter your URL: `https://yourdomain.com/api/stripe/webhook`
4. Select events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the **Signing secret**
6. Add to your `.env` file

## Step 7: Start the Server

```bash
node server.js
```

Expected output should include:
```
Connected to SQLite database
Database tables created successfully
ScaleOps6 Platform 🚀
Server running at: http://localhost:3001
```

## Step 8: Test the Flow

### Test Signup Flow:

1. Navigate to `http://localhost:3001/signup.html`
2. Create a new account
3. You should be redirected to `http://localhost:3001/payment.html`
4. Use Stripe test card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits
5. Complete payment
6. You should be redirected to dashboard

### Test Cards:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Requires Authentication**: `4000 0025 0000 3155`

## Step 9: Verify in Admin Dashboard

1. Navigate to `http://localhost:3001/admin.html`
2. Scroll to **Billing & Stripe Integration** section
3. Verify:
   - Total Revenue shows $1.00
   - Paid Users shows 1
   - User appears in billing table with "Paid" status

## Troubleshooting

### Issue: "Stripe is not defined" error

**Solution**: Make sure the Stripe.js script is loaded in [`payment.html`](../ST6%20Nexus%20Ops/scaleops6-platform/payment.html:7):
```html
<script src="https://js.stripe.com/v3/"></script>
```

### Issue: "Failed to create payment intent"

**Solutions**:
1. Check that `STRIPE_SECRET_KEY` is set in `.env`
2. Verify the key starts with `sk_test_` or `sk_live_`
3. Check server logs for detailed error messages

### Issue: Payment succeeds but user can't access dashboard

**Solutions**:
1. Check browser console for errors
2. Verify [`payment-guard.js`](../ST6%20Nexus%20Ops/scaleops6-platform/payment-guard.js) is loaded in dashboard
3. Check database: `SELECT * FROM user_billing_status WHERE user_id = 1;`
4. Manually update if needed:
   ```sql
   UPDATE user_billing_status 
   SET has_paid = 1, access_granted = 1 
   WHERE user_id = 1;
   ```

### Issue: Webhook not receiving events

**Solutions**:
1. For local development, use Stripe CLI
2. Verify webhook URL is accessible
3. Check webhook signing secret matches
4. Review Stripe Dashboard → Developers → Webhooks → Logs

## Files Created/Modified

### New Files:
- [`database-migration-stripe-billing.js`](../ST6%20Nexus%20Ops/scaleops6-platform/database-migration-stripe-billing.js) - Database schema
- [`stripe-config.js`](../ST6%20Nexus%20Ops/scaleops6-platform/stripe-config.js) - Stripe service layer
- [`payment.html`](../ST6%20Nexus%20Ops/scaleops6-platform/payment.html) - Payment page
- [`payment-success.html`](../ST6%20Nexus%20Ops/scaleops6-platform/payment-success.html) - Success page
- [`payment-guard.js`](../ST6%20Nexus%20Ops/scaleops6-platform/payment-guard.js) - Access control
- [`STRIPE_BILLING_IMPLEMENTATION.md`](../ST6%20Nexus%20Ops/scaleops6-platform/STRIPE_BILLING_IMPLEMENTATION.md) - Technical docs

### Modified Files:
- [`signup.html`](../ST6%20Nexus%20Ops/scaleops6-platform/signup.html:442) - Redirects to payment page
- [`server.js`](../ST6%20Nexus%20Ops/scaleops6-platform/server.js:10) - Added Stripe endpoints
- [`dashboard.html`](../ST6%20Nexus%20Ops/scaleops6-platform/dashboard.html:329) - Added payment guard
- [`admin-dashboard.js`](../ST6%20Nexus%20Ops/scaleops6-platform/admin-dashboard.js:1454) - Updated billing data loading
- [`.env.example`](../ST6%20Nexus%20Ops/scaleops6-platform/.env.example:61) - Added Stripe config

## Database Schema

The migration creates these tables:

### stripe_customers
Links users to Stripe customer IDs

### payment_transactions
Records all payment attempts and completions

### user_billing_status
Tracks whether users have paid and have access

### billing_events
Logs all billing-related events for audit trail

## API Endpoints Added

- `POST /api/stripe/create-payment-intent` - Initialize payment
- `POST /api/stripe/verify-payment` - Verify payment completion
- `GET /api/stripe/payment-status` - Check user payment status
- `GET /api/stripe/transactions` - Get user transaction history
- `POST /api/stripe/webhook` - Handle Stripe webhooks
- `GET /api/admin/billing` - Admin billing overview

## Security Notes

1. **Never commit** your actual Stripe keys to version control
2. Use **test keys** (`sk_test_`, `pk_test_`) for development
3. Use **live keys** (`sk_live_`, `pk_live_`) only in production
4. Always verify webhook signatures
5. Always verify payment status server-side before granting access

## Production Checklist

Before deploying to production:

- [ ] Replace test Stripe keys with live keys
- [ ] Set up production webhook endpoint
- [ ] Test complete signup → payment → access flow
- [ ] Verify webhook delivery
- [ ] Set up monitoring for failed payments
- [ ] Configure email notifications
- [ ] Test with real payment methods
- [ ] Verify database backups include billing tables
- [ ] Set up alerts for payment failures
- [ ] Review Stripe Dashboard settings

## Support

For issues:
1. Check server console logs
2. Check browser console logs
3. Review Stripe Dashboard for payment details
4. Check database tables for billing records
5. Refer to [`STRIPE_BILLING_IMPLEMENTATION.md`](../ST6%20Nexus%20Ops/scaleops6-platform/STRIPE_BILLING_IMPLEMENTATION.md) for detailed documentation

## Next Steps

After setup is complete:
1. Test the complete user flow
2. Verify admin dashboard shows billing data
3. Test webhook delivery
4. Consider adding email notifications
5. Consider adding refund functionality
6. Consider adding subscription billing for recurring revenue
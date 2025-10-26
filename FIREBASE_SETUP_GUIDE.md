# 🔥 Firebase Setup Guide for ScaleOps6

**Project:** LOGIN (login-df66c)  
**Project Number:** 146663369589

---

## 📋 Step-by-Step Setup

### Step 1: Get Firebase Service Account Key

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project **LOGIN** (login-df66c)
3. Click the gear icon ⚙️ → **Project settings**
4. Go to **Service accounts** tab
5. Click **Generate new private key**
6. Save the downloaded JSON file as `firebase-service-account.json` in the project root
7. **IMPORTANT:** Add this file to `.gitignore` (already done)

### Step 2: Get Firebase Web App Configuration

1. In Firebase Console, go to **Project settings**
2. Scroll to **Your apps** section
3. If no web app exists, click **Add app** → **Web** (</>) icon
4. Register app with nickname "ScaleOps6 Web"
5. Copy the `firebaseConfig` object

### Step 3: Update Configuration Files

#### Update [`login.html`](../ST6 Nexus Ops/scaleops6-platform/login.html:267)

Replace lines 267-273 with your actual config:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY",
    authDomain: "login-df66c.firebaseapp.com",
    projectId: "login-df66c",
    storageBucket: "login-df66c.appspot.com",
    messagingSenderId: "146663369589",
    appId: "YOUR_ACTUAL_APP_ID"
};
```

#### Update [`signup.html`](../ST6 Nexus Ops/scaleops6-platform/signup.html:313)

Replace lines 313-319 with the same config.

### Step 4: Enable Authentication Methods

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable **Email/Password**
3. Enable **Google** sign-in
4. Add authorized domain: `localhost` (for development)
5. Add your production domain when deploying

### Step 5: Install Firebase Admin SDK

```bash
cd "../ST6 Nexus Ops/scaleops6-platform"
npm install firebase-admin
```

### Step 6: Test Firebase Connection

Run this test script:

```bash
node -e "const {initializeFirebase} = require('./firebase-config.js'); initializeFirebase(); console.log('✅ Firebase connected!');"
```

---

## 🔒 Security Checklist

- [ ] `firebase-service-account.json` added to `.gitignore`
- [ ] Never commit service account key to git
- [ ] Use environment variables in production
- [ ] Enable email verification
- [ ] Set up password reset flow
- [ ] Configure authorized domains
- [ ] Enable Firebase Security Rules

---

## 🌐 Environment Variables (Production)

For production deployment, use environment variables instead of the JSON file:

```bash
FIREBASE_PROJECT_ID=login-df66c
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@login-df66c.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

The [`firebase-config.js`](../ST6 Nexus Ops/scaleops6-platform/firebase-config.js:1) file will automatically use these if the JSON file is not found.

---

## 🧪 Testing Authentication

### Test Login Flow

1. Start the server: `node server-with-backend.js`
2. Open `http://localhost:3001/signup.html`
3. Create a test account
4. Verify email is sent
5. Login at `http://localhost:3001/login.html`
6. Check that you're redirected to dashboard

### Test Admin Access

1. Manually update user role in database:
   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
   ```
2. Login and navigate to `/admin.html`
3. Verify admin dashboard loads

---

## 🐛 Troubleshooting

### "Firebase not initialized" error
- Check that `firebase-service-account.json` exists
- Verify the JSON file is valid
- Check file permissions

### "Invalid API key" error
- Verify API key in `login.html` and `signup.html`
- Check that web app is registered in Firebase Console
- Ensure authorized domains include your domain

### "User not found in database" error
- This is normal on first login
- The system will auto-create the database record
- Check that database migration ran successfully

---

## 📚 Next Steps After Setup

1. ✅ Complete Phase 2 (Firebase Auth)
2. → Start Phase 3 (User Management APIs)
3. → Build Admin Dashboard UI
4. → Implement Stripe integration
5. → Add role-based access control

---

## 🆘 Need Help?

- [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- Check [`ADMIN_DASHBOARD_IMPLEMENTATION_PLAN.md`](../ST6 Nexus Ops/scaleops6-platform/ADMIN_DASHBOARD_IMPLEMENTATION_PLAN.md:1) for full architecture

---

**Status:** Ready for Firebase credentials configuration
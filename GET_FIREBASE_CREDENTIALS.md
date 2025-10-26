# 🔑 How to Get Firebase Credentials for ScaleOps6

**Your Firebase Project:**
- Project Name: LOGIN
- Project ID: login-df66c
- Project Number: 146663369589
- Status: ⚠️ **No Web App registered yet** - Need to create one

---

## 🚨 IMPORTANT: You Need to Create a Web App First

Your Firebase project exists but has **no Web API Key** because you haven't registered a web app yet. Follow these exact steps:

---

## 📱 STEP 1: Register Web App in Firebase Console

### 1.1 Open Firebase Console
1. Go to https://console.firebase.google.com/
2. Click on your **LOGIN** project (login-df66c)

### 1.2 Add Web App
1. On the Project Overview page, look for **"Get started by adding Firebase to your app"**
2. Click the **Web icon** `</>` (looks like code brackets)
3. **App nickname:** Enter `ScaleOps6`
4. ✅ **Check** "Also set up Firebase Hosting" (optional)
5. Click **"Register app"**

### 1.3 Copy Your Config
You'll see a screen with code like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "login-df66c.firebaseapp.com",
  projectId: "login-df66c",
  storageBucket: "login-df66c.appspot.com",
  messagingSenderId: "146663369589",
  appId: "1:146663369589:web:XXXXXXXXXXXXXXXX"
};
```

**📋 COPY the `apiKey` and `appId` values** - You'll need them in Step 4

---

## 🔐 STEP 2: Download Service Account Key (For Backend)

### 2.1 Navigate to Service Accounts
1. In Firebase Console, click gear icon ⚙️ → **Project settings**
2. Click **"Service accounts"** tab
3. You should see **"Firebase Admin SDK"** section

### 2.2 Generate Private Key
1. Click button **"Generate new private key"**
2. Warning dialog appears - click **"Generate key"**
3. JSON file downloads (e.g., `login-df66c-firebase-adminsdk-xxxxx.json`)

### 2.3 Save the File
1. **Rename** downloaded file to: `firebase-service-account.json`
2. **Move** to: `C:\Users\antho\ST6 Nexus Ops\scaleops6-platform\`
3. ⚠️ File is in `.gitignore` - will NOT be committed to git

**Verify file location:**
```
C:\Users\antho\ST6 Nexus Ops\scaleops6-platform\firebase-service-account.json
```

---

## 🔧 STEP 3: Enable Authentication Methods

### 3.1 Open Authentication
1. Firebase Console left sidebar → **"Authentication"**
2. If you see "Get started" button, click it
3. Click **"Sign-in method"** tab

### 3.2 Enable Email/Password
1. Find **"Email/Password"** in providers list
2. Click on it
3. Toggle **"Enable"** switch to ON
4. Click **"Save"**

### 3.3 Enable Google Sign-In
1. Find **"Google"** in providers list
2. Click on it
3. Toggle **"Enable"** switch to ON
4. **Project support email:** Select your email
5. Click **"Save"**

### 3.4 Verify Authorized Domains
1. Still in "Sign-in method" tab
2. Scroll to **"Authorized domains"** section
3. Verify `localhost` is listed
4. When deploying, add your production domain here

---

## 📝 STEP 4: Update Configuration in Code

### 4.1 Update login.html

**File:** [`login.html`](../ST6 Nexus Ops/scaleops6-platform/login.html:267)

**Find lines 267-273:**
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "login-df66c.firebaseapp.com",
    projectId: "login-df66c",
    storageBucket: "login-df66c.appspot.com",
    messagingSenderId: "146663369589",
    appId: "YOUR_APP_ID"
};
```

**Replace `YOUR_API_KEY` and `YOUR_APP_ID`** with values from Step 1.3

### 4.2 Update signup.html

**File:** [`signup.html`](../ST6 Nexus Ops/scaleops6-platform/signup.html:313)

**Find lines 313-319:**
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "login-df66c.firebaseapp.com",
    projectId: "login-df66c",
    storageBucket: "login-df66c.appspot.com",
    messagingSenderId: "146663369589",
    appId: "YOUR_APP_ID"
};
```

**Replace with SAME values** as login.html

---

## 🧪 STEP 5: Install Dependencies

```bash
cd "C:\Users\antho\ST6 Nexus Ops\scaleops6-platform"
npm install firebase-admin
```

---

## ✅ STEP 6: Verify Everything Works

### 6.1 Check Service Account File
```bash
cd "C:\Users\antho\ST6 Nexus Ops\scaleops6-platform"
dir firebase-service-account.json
```

Should show the file.

### 6.2 Test Firebase Connection
```bash
node -e "const {initializeFirebase} = require('./firebase-config.js'); initializeFirebase(); console.log('✅ Firebase connected!');"
```

Expected output: `✅ Firebase connected!`

### 6.3 Test Login Page
1. Start server: `node server-with-backend.js`
2. Open: `http://localhost:3001/login.html`
3. Page should load without errors
4. Check browser console for errors

---

## 📋 Checklist

Before proceeding to Phase 4, verify:

- [ ] Web app registered in Firebase Console
- [ ] `apiKey` and `appId` obtained
- [ ] Service account JSON downloaded and saved
- [ ] Email/Password authentication enabled
- [ ] Google sign-in enabled
- [ ] `localhost` in authorized domains
- [ ] `login.html` updated with real config
- [ ] `signup.html` updated with real config
- [ ] `firebase-admin` installed
- [ ] Firebase connection test passed

---

## 🎯 After Setup Complete

Once all credentials are configured:

1. Test signup flow
2. Test login flow
3. Verify user appears in Firebase Console → Authentication → Users
4. Check user record created in SQLite database
5. **Proceed to Phase 4** - Admin Dashboard UI

---

## 🔗 Quick Links

- **Firebase Console:** https://console.firebase.google.com/project/login-df66c
- **Authentication:** https://console.firebase.google.com/project/login-df66c/authentication
- **Project Settings:** https://console.firebase.google.com/project/login-df66c/settings/general

---

**Current Status:** Credentials setup required before Phase 4  
**Next Phase:** Admin Dashboard UI Development (8 phases remaining)
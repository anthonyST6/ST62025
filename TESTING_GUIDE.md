# 🧪 ScaleOps6 Admin Dashboard - Testing Guide

**How to test everything that's been built**

---

## 🚀 Step 1: Start the Server

Your server should already be running. If not:

```bash
cd "C:\Users\antho\ST6 Nexus Ops\scaleops6-platform"
node server-with-backend.js
```

**Expected output:**
```
🚀 Enhanced Server with Full Backend Support
📊 Open http://localhost:3001/dashboard.html to view the application
```

**Server should be running on:** `http://localhost:3001`

---

## 🔐 Step 2: Test Firebase Console

### View Your Test Users in Firebase

1. **Open Firebase Console:**
   - URL: https://console.firebase.google.com/project/login-df66c/authentication/users

2. **What you should see:**
   - **5 users** listed in the Authentication → Users tab
   - Each user shows:
     - Email address
     - User UID
     - Created date
     - Sign-in provider (Email/Password)

3. **Expected users:**
   - admin@scaleops6.com
   - john@techstart.com
   - jane@venturecap.com
   - mike@st6.com
   - sarah@startup.io

**✅ If you see all 5 users, Firebase is working correctly!**

---

## 🔑 Step 3: Test Login Page

### 3.1 Open Login Page

**URL:** `http://localhost:3001/login.html`

**What you should see:**
- ScaleOps6 logo
- Email and password fields
- "Sign In" button
- "Continue with Google" button
- Links to "Create account" and "Forgot password"

### 3.2 Test Login with Admin Account

1. **Enter credentials:**
   - Email: `admin@scaleops6.com`
   - Password: `Admin123!`

2. **Click "Sign In"**

3. **Expected behavior:**
   - Loading spinner appears
   - "Signing you in..." message
   - Redirects to `/dashboard.html`

4. **If login fails:**
   - Check browser console (F12) for errors
   - Verify Firebase credentials in login.html
   - Ensure server is running

### 3.3 Test Other User Accounts

Try logging in with each account:
- **User:** john@techstart.com / User123!
- **VC:** jane@venturecap.com / VC123!
- **ST6 Partner:** mike@st6.com / Partner123!
- **Free User:** sarah@startup.io / User123!

**All should successfully login and redirect to dashboard.**

---

## 📊 Step 4: Test Admin Dashboard

### 4.1 Access Admin Dashboard

**After logging in as admin:**

**URL:** `http://localhost:3001/admin.html`

**What you should see:**

#### Top Section - Statistics Cards
- **Total Users:** Should show a number (may be 0 or sample data)
- **Active Sessions:** Random number
- **Avg. Completion:** Percentage
- **Total Assessments:** Number

#### User Management Section
- **Tabs:** "All Users", "Active", "Inactive"
- **Table with columns:**
  - User (name + email)
  - Company
  - Joined date
  - Role & Tier (badges)
  - Status (Active/Inactive badge)
  - Actions (View, Edit, Activate/Deactivate, Delete buttons)

#### Block Performance Chart
- Bar chart showing performance across phases
- Bars should be visible with labels

#### System Analytics Table
- Database Size
- API Response Time
- Cache Hit Rate
- Error Rate

### 4.2 Test User Management Actions

**Note:** The admin dashboard controller ([`admin-dashboard.js`](../ST6 Nexus Ops/scaleops6-platform/admin-dashboard.js:1)) is loaded, but the API routes are NOT yet integrated into the server. So some actions may not work until Phase 10.

**Try these actions:**

1. **Click "Export Users" button**
   - Should trigger export (may show alert for now)

2. **Click "View" on a user**
   - Should show user details (alert for now)

3. **Click "Edit" on a user**
   - Should prompt for role change

4. **Click "Deactivate" on a user**
   - Should ask for confirmation

5. **Switch tabs** (All Users / Active / Inactive)
   - Should filter user list

---

## 🔍 Step 5: Check Browser Console

### Open Developer Tools

**Press F12** in your browser

### Check for Errors

**Console tab should show:**
```
🚀 Initializing Admin Dashboard...
✅ Authenticated as: admin@scaleops6.com
📊 Loading dashboard data...
```

**Common issues:**

❌ **"Failed to fetch"** errors:
- Means API routes not yet integrated into server
- This is expected - Phase 10 will fix this

❌ **"Unauthorized"** errors:
- Check that you're logged in
- Verify Firebase token in localStorage

❌ **"CORS"** errors:
- Server should have CORS headers
- Check server-with-backend.js

---

## 📱 Step 6: Test Signup Page

### 6.1 Open Signup Page

**URL:** `http://localhost:3001/signup.html`

**What you should see:**
- ScaleOps6 logo
- Form fields: Full Name, Company, Email, Password, Confirm Password
- "Create Account" button
- "Sign up with Google" button
- Password strength indicator
- Terms and privacy links
- "Already have an account? Sign in" link

### 6.2 Test Creating a New User

1. **Fill in the form:**
   - Full Name: Test User
   - Company: Test Company
   - Email: test@example.com
   - Password: Test123!
   - Confirm Password: Test123!

2. **Click "Create Account"**

3. **Expected behavior:**
   - Loading spinner
   - "Creating your account..." message
   - Success message
   - Redirect to dashboard

4. **Verify in Firebase Console:**
   - Go to Firebase Console → Authentication → Users
   - Should see new user: test@example.com

---

## 🗄️ Step 7: Verify Database

### Check SQLite Database

**Run this command:**
```bash
cd "C:\Users\antho\ST6 Nexus Ops\scaleops6-platform"
node -e "const sqlite3 = require('sqlite3').verbose(); const db = new sqlite3.Database('scaleops6.db'); db.all('SELECT id, email, name, role, tier FROM users WHERE firebase_uid IS NOT NULL', (err, rows) => { if (err) console.error(err); else { console.log('Users in database:'); rows.forEach(r => console.log(`  ${r.id}. ${r.email} (${r.role}, Tier ${r.tier})`)); } db.close(); });"
```

**Expected output:**
```
Users in database:
  2. admin@scaleops6.com (admin, Tier 3)
  3. john@techstart.com (user, Tier 1)
  4. jane@venturecap.com (vc, Tier 2)
  5. mike@st6.com (st6_partner, Tier 3)
  6. sarah@startup.io (user, Tier 0)
```

---

## ⚠️ Known Limitations (Until Phase 10)

**What's NOT working yet:**
- ❌ API calls from admin dashboard (routes not integrated)
- ❌ Real-time user data loading (needs server integration)
- ❌ VC portfolio features (UI not built)
- ❌ Analytics visualizations (UI not built)
- ❌ Stripe integration (not implemented)

**What IS working:**
- ✅ Firebase authentication
- ✅ Login/signup pages
- ✅ User creation in Firebase
- ✅ Database storage
- ✅ Admin dashboard UI loads
- ✅ All backend APIs ready (just need integration)

---

## 🧪 Complete Test Checklist

### Firebase Authentication
- [ ] Open Firebase Console
- [ ] See 5 test users listed
- [ ] Verify user UIDs are present

### Login Functionality
- [ ] Open http://localhost:3001/login.html
- [ ] Login with admin@scaleops6.com / Admin123!
- [ ] Redirects to dashboard
- [ ] No console errors

### Signup Functionality
- [ ] Open http://localhost:3001/signup.html
- [ ] Create new test account
- [ ] Verify in Firebase Console
- [ ] Can login with new account

### Admin Dashboard
- [ ] Open http://localhost:3001/admin.html (after login)
- [ ] See statistics cards
- [ ] See user management section
- [ ] See block performance chart
- [ ] See system analytics table

### Database
- [ ] Run verification command
- [ ] See all 5 users with Firebase UIDs
- [ ] Verify roles and tiers are correct

---

## 🐛 Troubleshooting

### Login page shows errors
**Check:**
- Server is running on port 3001
- Firebase credentials in login.html are correct
- Browser console for specific errors

### Admin dashboard is empty
**This is expected!** The API routes need to be integrated into the server (Phase 10).

For now, the dashboard shows sample/placeholder data.

### Users not in Firebase Console
**Check:**
- You're looking at the correct project (login-df66c)
- Authentication tab → Users
- Refresh the page

### Database errors
**Run migration again:**
```bash
cd "../ST6 Nexus Ops/scaleops6-platform"
node database-migration-admin-users.js
```

---

## 🎯 What to Expect

### Current State (Phase 4 Complete):
- ✅ Login/signup works
- ✅ Users created in Firebase
- ✅ Users stored in SQLite
- ✅ Admin dashboard UI loads
- ⏳ API integration pending (Phase 10)

### After Phase 10 (RBAC Integration):
- ✅ Admin dashboard shows real user data
- ✅ All CRUD operations work
- ✅ Role-based access enforced
- ✅ Full user management functional

---

## 📞 Quick Reference

**URLs:**
- Login: http://localhost:3001/login.html
- Signup: http://localhost:3001/signup.html
- Dashboard: http://localhost:3001/dashboard.html
- Admin: http://localhost:3001/admin.html
- Firebase Console: https://console.firebase.google.com/project/login-df66c/authentication/users

**Test Credentials:**
- Admin: admin@scaleops6.com / Admin123!
- User: john@techstart.com / User123!
- VC: jane@venturecap.com / VC123!

---

**The foundation is working! API integration (Phase 10) will make everything fully functional.**
# Authentication & Authorization Issues - Diagnostic Report

## Date: 2025-10-26
## Status: Diagnosis Complete - Ready for User Confirmation

---

## 🔍 Issues Identified

### Issue 1: Logout Redirect to Wrong Page
**Location:** [`nav.js:219-222`](nav.js:219)

**Current Behavior:**
```javascript
function logout() {
    localStorage.clear();
    window.location.href = '/signup.html';  // ❌ WRONG
}
```

**Expected Behavior:**
- Should redirect to `/login.html` instead of `/signup.html`

**Root Cause:**
- Hardcoded redirect URL points to signup page instead of login page

**Confidence Level:** ✅ 100% - Code inspection confirms this is the issue

---

### Issue 2: @demo.com Users Have Admin Access
**Location:** [`nav.js:84-94`](nav.js:84)

**Current Behavior:**
```javascript
${userId && !isGuest ? `
    <a href="/admin.html" class="nav-link">
        Admin
    </a>
` : ''}
```

**Problem:**
- Admin link shown for ALL non-guest users
- No check for @demo.com email domain
- @demo.com users can see and access admin dashboard

**Expected Behavior:**
- Block @demo.com domain users from seeing admin link
- Block @demo.com domain users from accessing admin routes

**Root Cause:**
- Missing email domain validation in admin access control
- Only checks `isGuest` flag, not email domain

**Confidence Level:** ✅ 95% - Code shows no domain filtering for admin access

---

### Issue 3: @st6co Domain Users Don't Get Preloaded Workspace Data
**Location:** [`server-with-backend.js:2524-2624`](server-with-backend.js:2524)

**Current Behavior:**
```javascript
// Line 2542: User email passed to API
const userEmail = req.headers['x-user-email'] || parsedUrl.query.userEmail || null;

// Line 2574: Workspace generation with email
workspace: {
    ...ssotData.workspace,
    questions: generateWorkspaceQuestions(ssotData.agent, subcomponentId, userEmail)
}

// Line 271-285: integrateCompanyData function
const isDemoUser = userEmail && userEmail.endsWith('@demo.com');
const subcomponentDemoData = isDemoUser ? {} : (st6coDemoData[subcomponentId] || {});
```

**Problem:**
- Only checks for @demo.com to provide BLANK workspace
- Does NOT check for @st6co domain to provide PRELOADED data
- @st6co users get blank workspace like everyone else

**Expected Behavior:**
- @demo.com users → BLANK workspace (currently working ✅)
- @st6co users → PRELOADED workspace with demo data (NOT working ❌)
- Other users → BLANK workspace (currently working ✅)

**Root Cause:**
- Missing logic to detect @st6co domain
- No special handling to force preload for @st6co users

**Confidence Level:** ✅ 90% - Code shows @demo.com check but no @st6co check

---

## 🧪 Diagnostic Script Deployed

**File:** `debug-auth-issues.js`
**Purpose:** Validate hypotheses with runtime logging

**What it logs:**
1. **Logout behavior** - Confirms redirect destination
2. **Admin link visibility** - Checks if @demo.com users see admin link
3. **Workspace data** - Monitors if @st6co users get preloaded data

**How to test:**
1. Open browser console (F12)
2. Navigate to dashboard
3. Look for logs starting with `🔍 DEBUG:`
4. Try logging out to see redirect behavior
5. Open a subcomponent to check workspace data

---

## 📋 Proposed Fixes

### Fix 1: Logout Redirect
**File:** `nav.js`
**Line:** 221
**Change:**
```javascript
// BEFORE
window.location.href = '/signup.html';

// AFTER
window.location.href = '/login.html';
```

### Fix 2: Block @demo.com from Admin
**File:** `nav.js`
**Lines:** 84-94
**Change:**
```javascript
// BEFORE
${userId && !isGuest ? `
    <a href="/admin.html">Admin</a>
` : ''}

// AFTER
${userId && !isGuest && userEmail && !userEmail.endsWith('@demo.com') ? `
    <a href="/admin.html">Admin</a>
` : ''}
```

**Additional:** May need server-side route protection in `server-with-backend.js`

### Fix 3: Preload Data for @st6co
**File:** `server-with-backend.js`
**Lines:** 271-285
**Change:**
```javascript
// BEFORE
const isDemoUser = userEmail && userEmail.endsWith('@demo.com');
const subcomponentDemoData = isDemoUser ? {} : (st6coDemoData[subcomponentId] || {});

// AFTER
const isDemoUser = userEmail && userEmail.endsWith('@demo.com');
const isSt6coUser = userEmail && userEmail.endsWith('@st6co');
const subcomponentDemoData = isDemoUser ? {} : 
    (isSt6coUser ? (st6coDemoData[subcomponentId] || {}) : {});
```

---

## ⚠️ Next Steps

**BEFORE APPLYING FIXES:**
1. User should test with diagnostic script active
2. Confirm logs show the expected issues
3. User approves diagnosis

**AFTER USER CONFIRMATION:**
1. Apply Fix 1 (logout redirect)
2. Apply Fix 2 (block @demo.com admin access)
3. Apply Fix 3 (preload @st6co workspace)
4. Test all three scenarios
5. Remove diagnostic script

---

## 🎯 Testing Checklist

After fixes are applied, test:

- [ ] Logout redirects to `/login.html`
- [ ] @demo.com user CANNOT see admin link
- [ ] @demo.com user CANNOT access `/admin.html` directly
- [ ] @st6co user gets PRELOADED workspace data
- [ ] @demo.com user gets BLANK workspace data
- [ ] Regular users get BLANK workspace data
- [ ] Regular users CAN see admin link (if not guest)

---

## 📊 Confidence Summary

| Issue | Confidence | Evidence |
|-------|-----------|----------|
| Logout redirect | 100% | Direct code inspection |
| @demo.com admin access | 95% | No domain check in nav.js |
| @st6co preload | 90% | No @st6co check in server |

**Overall Diagnosis Confidence: 95%**

---

## 🔗 Related Files

- [`nav.js`](nav.js) - Navigation and logout
- [`server-with-backend.js`](server-with-backend.js) - API and workspace data
- [`debug-auth-issues.js`](debug-auth-issues.js) - Diagnostic logging
- [`dashboard.html`](dashboard.html) - Loads diagnostic script

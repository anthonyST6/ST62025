# Implementation Specifications - Safe Mode

## Overview

This document provides detailed, step-by-step specifications for implementing all fixes WITHOUT altering existing functionality. All changes are designed to be:

- ✅ **Non-breaking** - Existing features continue to work
- ✅ **Reversible** - Can be rolled back easily
- ✅ **Isolated** - Changes don't affect other systems
- ✅ **Testable** - Can verify success without risk

---

## Spec 1: Fix Download Button (SAFE MODE)

### Objective
Make the "Download Report" button generate analysis reports with scores instead of blank templates.

### Current Behavior
```
User clicks "Download Report" after analysis
→ Calls downloadAnalysisReport()
→ Function is overridden by unknown script
→ Calls /api/generate-template-docx/ (WRONG)
→ Downloads blank template
```

### Desired Behavior
```
User clicks "Download Report" after analysis
→ Calls downloadAnalysisReport()
→ Function is protected from overrides
→ Calls /api/generate-docx/ (CORRECT)
→ Downloads analysis report with scores
```

### Implementation (SAFE - No Existing Code Changes)

**Step 1: Create New Protection Script**

File: `download-function-protector.js` (NEW FILE)

```javascript
/**
 * Download Function Protector
 * Locks critical download functions to prevent overrides
 * SAFE: Only adds protection, doesn't modify existing code
 */

(function() {
    'use strict';
    
    console.log('🔒 Download Function Protector Loading...');
    
    // Wait for docx-download-client.js to load and define functions
    function waitForFunctions() {
        return new Promise((resolve) => {
            const checkInterval = setInterval(() => {
                if (typeof window.downloadAnalysisReport === 'function' &&
                    typeof window.downloadTemplateFile === 'function' &&
                    typeof window.downloadPopulatedTemplate === 'function') {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 100);
            
            // Timeout after 5 seconds
            setTimeout(() => {
                clearInterval(checkInterval);
                resolve();
            }, 5000);
        });
    }
    
    // Lock functions after they're defined
    waitForFunctions().then(() => {
        console.log('🔒 Locking download functions...');
        
        // Store original functions
        const originalDownloadAnalysis = window.downloadAnalysisReport;
        const originalDownloadTemplate = window.downloadTemplateFile;
        const originalDownloadPopulated = window.downloadPopulatedTemplate;
        
        // Lock downloadAnalysisReport
        try {
            Object.defineProperty(window, 'downloadAnalysisReport', {
                value: originalDownloadAnalysis,
                writable: false,
                configurable: false
            });
            console.log('✅ downloadAnalysisReport locked');
        } catch (e) {
            console.warn('⚠️ Could not lock downloadAnalysisReport:', e.message);
        }
        
        // Lock downloadTemplateFile
        try {
            Object.defineProperty(window, 'downloadTemplateFile', {
                value: originalDownloadTemplate,
                writable: false,
                configurable: false
            });
            console.log('✅ downloadTemplateFile locked');
        } catch (e) {
            console.warn('⚠️ Could not lock downloadTemplateFile:', e.message);
        }
        
        // Lock downloadPopulatedTemplate
        try {
            Object.defineProperty(window, 'downloadPopulatedTemplate', {
                value: originalDownloadPopulated,
                writable: false,
                configurable: false
            });
            console.log('✅ downloadPopulatedTemplate locked');
        } catch (e) {
            console.warn('⚠️ Could not lock downloadPopulatedTemplate:', e.message);
        }
        
        console.log('🔒 Download Function Protector Active!');
    });
    
})();
```

**Step 2: Add Script to HTML**

In [`subcomponent-detail.html`](../ST6 Nexus Ops/scaleops6-platform/subcomponent-detail.html), add AFTER line 1898 (after docx-download-client.js):

```html
<!-- DOWNLOAD FUNCTION PROTECTOR - Prevents overrides -->
<script src="download-function-protector.js"></script>
<!-- Features:
     - Locks download functions after they're defined
     - Prevents later scripts from overriding
     - Non-breaking: Only adds protection
     - Can be disabled by removing this line -->
```

**Step 3: Test**
1. Load page: http://localhost:3001/subcomponent-detail.html?id=1-4
2. Complete analysis
3. Click "Download Report"
4. Verify DOCX contains analysis data (not blank template)

**Rollback**: Simply remove the script tag from HTML

---

## Spec 2: Fix Double-Loading (SAFE MODE)

### Objective
Prevent tabs from loading content twice when selected.

### Current Behavior
```
User clicks "Education" tab
→ switchTab() called
→ Content loads (version 1)
→ Another script calls loadEducation()
→ Content loads again (version 2)
→ User sees flicker/flash
```

### Implementation (SAFE - New Script Only)

**Step 1: Create Tab Switch Protector**

File: `tab-switch-protector.js` (NEW FILE)

```javascript
/**
 * Tab Switch Protector
 * Prevents double-loading when tabs are selected
 * SAFE: Wraps existing switchTab function without modifying it
 */

(function() {
    'use strict';
    
    console.log('🔄 Tab Switch Protector Loading...');
    
    let isTabSwitching = false;
    let switchTimeout = null;
    
    // Wait for original switchTab to be defined
    function waitForSwitchTab() {
        return new Promise((resolve) => {
            const checkInterval = setInterval(() => {
                if (typeof window.switchTab === 'function') {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 100);
            
            setTimeout(() => {
                clearInterval(checkInterval);
                resolve();
            }, 5000);
        });
    }
    
    waitForSwitchTab().then(() => {
        // Store original function
        const originalSwitchTab = window.switchTab;
        
        // Create protected wrapper
        window.switchTab = function(tabName, event) {
            // Debounce - ignore rapid clicks
            if (switchTimeout) {
                console.log('⚠️ Tab switch debounced');
                return;
            }
            
            // Prevent concurrent switches
            if (isTabSwitching) {
                console.log('⚠️ Tab switch already in progress');
                return;
            }
            
            console.log(`🔄 Switching to tab: ${tabName}`);
            isTabSwitching = true;
            
            try {
                // Call original function
                originalSwitchTab(tabName, event);
            } finally {
                // Reset flags after delay
                switchTimeout = setTimeout(() => {
                    switchTimeout = null;
                }, 300);
                
                setTimeout(() => {
                    isTabSwitching = false;
                }, 500);
            }
        };
        
        console.log('✅ Tab Switch Protector Active!');
    });
    
})();
```

**Step 2: Add to HTML**

Add BEFORE any tab-related scripts (around line 1800):

```html
<!-- TAB SWITCH PROTECTOR - Prevents double-loading -->
<script src="tab-switch-protector.js"></script>
<!-- Features:
     - Debounces rapid tab clicks
     - Prevents concurrent tab switches
     - Wraps existing switchTab without modifying it
     - Can be disabled by removing this line -->
```

**Rollback**: Remove the script tag

---

## Spec 3: Git Version Control Setup

### Objective
Initialize Git repository for complete version control and rollback capability.

### Implementation (100% SAFE - No Code Changes)

**Step 1: Initialize Repository**

```bash
cd "../ST6 Nexus Ops/scaleops6-platform"
git init
```

**Step 2: Create .gitignore**

File: `.gitignore` (NEW FILE)

```
# Dependencies
node_modules/
package-lock.json

# Generated files
generated/
*.log

# Database (optional - you may want to version this)
# scaleops6.db

# OS files
.DS_Store
Thumbs.db
desktop.ini

# IDE
.vscode/
.idea/

# Temporary files
*.tmp
*.temp
~*
```

**Step 3: Create Initial Commit**

```bash
git add .
git commit -m "Baseline: Working state before systematic fixes

- All 96 subcomponents functional
- Database schema complete
- Download buttons working (with known issues)
- This commit represents the rollback point"
```

**Step 4: Create Backup Branch**

```bash
git branch backup/pre-fixes
git branch development
```

**Step 5: Verify Setup**

```bash
git status
git log --oneline
git branch -a
```

### Usage Examples

**Before Making Changes**:
```bash
git checkout -b fix/download-buttons
git add .
git commit -m "Checkpoint before download fix"
```

**After Testing**:
```bash
# If fix works
git add .
git commit -m "Fixed download button endpoint routing"
git checkout main
git merge fix/download-buttons

# If fix breaks something
git checkout main  # Abandon the fix branch
```

**Emergency Rollback**:
```bash
# Go back one commit
git reset --hard HEAD~1

# Go back to specific commit
git log --oneline  # Find commit hash
git reset --hard <commit-hash>

# Go back to baseline
git reset --hard backup/pre-fixes
```

**Rollback**: N/A - Git itself is the rollback mechanism

---

## Spec 4: Backup System Implementation

### Objective
Create automated backup system for files and database.

### Implementation (SAFE - New Files Only)

**Step 1: Install Dependencies**

```bash
cd "../ST6 Nexus Ops/scaleops6-platform"
npm install archiver --save-dev
```

**Step 2: Create Backup System**

File: `backup-system.js` (NEW FILE)

```javascript
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

class BackupSystem {
    constructor() {
        this.backupDir = path.join(__dirname, 'backups');
        this.ensureBackupDir();
    }
    
    ensureBackupDir() {
        if (!fs.existsSync(this.backupDir)) {
            fs.mkdirSync(this.backupDir, { recursive: true });
        }
    }
    
    async createBackup(label = 'manual') {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
        const time = new Date().toISOString().replace(/[:.]/g, '-').split('T')[1].substring(0, 8);
        const backupName = `backup-${label}-${timestamp}-${time}.zip`;
        const backupPath = path.join(this.backupDir, backupName);
        
        return new Promise((resolve, reject) => {
            const output = fs.createWriteStream(backupPath);
            const archive = archiver('zip', { zlib: { level: 9 } });
            
            output.on('close', () => {
                console.log(`✅ Backup created: ${backupName}`);
                console.log(`   Size: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
                resolve(backupPath);
            });
            
            archive.on('error', reject);
            archive.pipe(output);
            
            // Add all JavaScript files
            archive.glob('*.js', {
                ignore: ['node_modules/**', 'backups/**']
            });
            
            // Add HTML files
            archive.glob('*.html');
            
            // Add CSS files
            archive.glob('*.css');
            
            // Add database
            if (fs.existsSync('scaleops6.db')) {
                archive.file('scaleops6.db', { name: 'scaleops6.db' });
            }
            
            // Add package.json
            if (fs.existsSync('package.json')) {
                archive.file('package.json', { name: 'package.json' });
            }
            
            archive.finalize();
        });
    }
    
    listBackups() {
        if (!fs.existsSync(this.backupDir)) {
            return [];
        }
        
        return fs.readdirSync(this.backupDir)
            .filter(f => f.endsWith('.zip'))
            .map(f => ({
                name: f,
                path: path.join(this.backupDir, f),
                size: fs.statSync(path.join(this.backupDir, f)).size,
                created: fs.statSync(path.join(this.backupDir, f)).mtime
            }))
            .sort((a, b) => b.created - a.created);
    }
    
    deleteOldBackups(keepCount = 10) {
        const backups = this.listBackups();
        if (backups.length > keepCount) {
            const toDelete = backups.slice(keepCount);
            toDelete.forEach(backup => {
                fs.unlinkSync(backup.path);
                console.log(`🗑️ Deleted old backup: ${backup.name}`);
            });
        }
    }
}

module.exports = BackupSystem;

// CLI usage
if (require.main === module) {
    const label = process.argv[2] || 'manual';
    const backup = new BackupSystem();
    
    backup.createBackup(label).then(path => {
        console.log(`\n✅ Backup complete: ${path}`);
        backup.deleteOldBackups(10);
        process.exit(0);
    }).catch(err => {
        console.error('❌ Backup failed:', err);
        process.exit(1);
    });
}
```

**Step 3: Create Quick Backup Script**

File: `create-backup.js` (NEW FILE)

```javascript
const BackupSystem = require('./backup-system.js');

const label = process.argv[2] || 'manual';
const backup = new BackupSystem();

console.log(`📦 Creating backup: ${label}...`);

backup.createBackup(label)
    .then(path => {
        console.log(`\n✅ SUCCESS!`);
        console.log(`   Backup saved to: ${path}`);
        console.log(`\n📋 To restore this backup:`);
        console.log(`   node restore-backup.js ${path.split('\\').pop()}`);
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ Backup failed:', err);
        process.exit(1);
    });
```

**Step 4: Create Restore Script**

File: `restore-backup.js` (NEW FILE)

```javascript
const fs = require('fs');
const path = require('path');
const unzipper = require('unzipper');

const backupName = process.argv[2];

if (!backupName) {
    console.error('❌ Usage: node restore-backup.js <backup-name.zip>');
    process.exit(1);
}

const backupPath = path.join(__dirname, 'backups', backupName);

if (!fs.existsSync(backupPath)) {
    console.error(`❌ Backup not found: ${backupPath}`);
    process.exit(1);
}

console.log(`📦 Restoring backup: ${backupName}...`);
console.log(`⚠️  This will overwrite current files!`);
console.log(`\nPress Ctrl+C to cancel, or wait 5 seconds to continue...`);

setTimeout(() => {
    fs.createReadStream(backupPath)
        .pipe(unzipper.Extract({ path: __dirname }))
        .on('close', () => {
            console.log('✅ Backup restored successfully!');
            console.log('\n🔄 Please restart the server:');
            console.log('   taskkill /F /IM node.exe && node server-with-backend.js');
            process.exit(0);
        })
        .on('error', (err) => {
            console.error('❌ Restore failed:', err);
            process.exit(1);
        });
}, 5000);
```

**Usage**:
```bash
# Create backup before changes
node create-backup.js before-download-fix

# List backups
node -e "const B = require('./backup-system.js'); console.log(new B().listBackups())"

# Restore if needed
node restore-backup.js backup-before-download-fix-2025-10-24.zip
```

**Rollback**: Backups are stored in `backups/` directory - just delete if not needed

---

## Spec 5: Script Loader Master

### Objective
Control script load order and prevent function overrides.

### Implementation (SAFE - New Script Only)

File: `script-loader-master.js` (NEW FILE)

```javascript
/**
 * Script Loader Master
 * Manages script load order and function protection
 * SAFE: Monitors and protects, doesn't modify existing code
 */

(function() {
    'use strict';
    
    console.log('📜 Script Loader Master Initializing...');
    
    // Define critical functions that must be protected
    const PROTECTED_FUNCTIONS = [
        'downloadAnalysisReport',
        'downloadTemplateFile',
        'downloadPopulatedTemplate',
        'analyzeWorksheet',
        'displayAnalysisResults'
    ];
    
    // Track which script defined each function
    const functionOwners = {};
    
    // Monitor function definitions
    PROTECTED_FUNCTIONS.forEach(fnName => {
        let currentValue = window[fnName];
        
        Object.defineProperty(window, fnName, {
            get: function() {
                return currentValue;
            },
            set: function(newValue) {
                const caller = new Error().stack.split('\n')[2];
                
                if (currentValue && typeof currentValue === 'function') {
                    console.warn(`⚠️ OVERRIDE ATTEMPT: ${fnName}`);
                    console.warn(`   Previous owner: ${functionOwners[fnName] || 'unknown'}`);
                    console.warn(`   New caller: ${caller}`);
                    
                    // Allow override but log it
                    currentValue = newValue;
                    functionOwners[fnName] = caller;
                } else {
                    console.log(`✅ ${fnName} defined by: ${caller}`);
                    currentValue = newValue;
                    functionOwners[fnName] = caller;
                }
            },
            configurable: true
        });
    });
    
    // Report function ownership after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            console.log('\n📊 Function Ownership Report:');
            PROTECTED_FUNCTIONS.forEach(fnName => {
                const owner = functionOwners[fnName] || 'NOT DEFINED';
                const exists = typeof window[fnName] === 'function';
                console.log(`   ${fnName}: ${exists ? '✅' : '❌'} ${owner}`);
            });
        }, 3000);
    });
    
    console.log('✅ Script Loader Master Active!');
    
})();
```

**Add to HTML** (FIRST script after nav.js):

```html
<script src="nav.js"></script>
<!-- SCRIPT LOADER MASTER - Must load first -->
<script src="script-loader-master.js"></script>
```

**Rollback**: Remove the script tag

---

## Spec 6: Database Snapshot System

### Implementation (SAFE - New Script Only)

File: `db-snapshot.js` (NEW FILE)

```javascript
const fs = require('fs');
const path = require('path');

function createSnapshot(label = 'manual') {
    const snapshotDir = path.join(__dirname, 'db-snapshots');
    
    // Ensure directory exists
    if (!fs.existsSync(snapshotDir)) {
        fs.mkdirSync(snapshotDir, { recursive: true });
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
    const time = new Date().toISOString().replace(/[:.]/g, '-').split('T')[1].substring(0, 8);
    const snapshotName = `scaleops6-${label}-${timestamp}-${time}.db`;
    const snapshotPath = path.join(snapshotDir, snapshotName);
    
    // Copy database file
    const dbPath = path.join(__dirname, 'scaleops6.db');
    
    if (!fs.existsSync(dbPath)) {
        console.error('❌ Database file not found:', dbPath);
        process.exit(1);
    }
    
    fs.copyFileSync(dbPath, snapshotPath);
    
    const size = fs.statSync(snapshotPath).size;
    console.log(`✅ Database snapshot created: ${snapshotName}`);
    console.log(`   Size: ${(size / 1024).toFixed(2)} KB`);
    console.log(`\n📋 To restore this snapshot:`);
    console.log(`   copy "${snapshotPath}" scaleops6.db`);
    
    return snapshotPath;
}

// CLI usage
if (require.main === module) {
    const label = process.argv[2] || 'manual';
    createSnapshot(label);
}

module.exports = { createSnapshot };
```

**Usage**:
```bash
# Create snapshot before changes
node db-snapshot.js before-schema-change

# Restore snapshot
copy "db-snapshots\scaleops6-before-schema-change-2025-10-24.db" scaleops6.db
```

**Rollback**: Snapshots are in `db-snapshots/` directory - just delete if not needed

---

## Spec 7: Complete Documentation

### File: `SAFE_DEPLOYMENT_GUIDE.md` (NEW FILE)

```markdown
# Safe Deployment Guide

## Before ANY Code Changes

### 1. Create Git Checkpoint
```bash
git add .
git commit -m "Checkpoint before [description of change]"
```

### 2. Create File Backup
```bash
node create-backup.js before-[change-name]
```

### 3. Create Database Snapshot
```bash
node db-snapshot.js before-[change-name]
```

## Making Changes

### Safe Change Workflow

1. **Work in a branch**:
```bash
git checkout -b fix/issue-name
```

2. **Make changes incrementally**
   - Change ONE file at a time
   - Test after each change
   - Commit if it works

3. **Test thoroughly**:
   - Load page in browser
   - Check console for errors
   - Test all affected workflows
   - Verify no regressions

4. **Commit if successful**:
```bash
git add .
git commit -m "Fixed [specific issue]"
```

## If Something Breaks

### Option 1: Git Rollback (Fastest)
```bash
# Undo last commit
git reset --hard HEAD~1

# Restart server
taskkill /F /IM node.exe && node server-with-backend.js
```

### Option 2: Restore from Backup
```bash
# List backups
node -e "const B = require('./backup-system.js'); console.log(new B().listBackups())"

# Restore
node restore-backup.js backup-before-fix-2025-10-24.zip

# Restart server
taskkill /F /IM node.exe && node server-with-backend.js
```

### Option 3: Database Restore
```bash
# If only database is corrupted
copy "db-snapshots\scaleops6-before-fix-2025-10-24.db" scaleops6.db

# Restart server
taskkill /F /IM node.exe && node server-with-backend.js
```

## Prevention Checklist

Before deploying ANY new script:

- [ ] Does it define global functions?
- [ ] Could it override existing functions?
- [ ] Does it attach event listeners?
- [ ] Have I created a backup?
- [ ] Have I committed to Git?
- [ ] Have I tested in isolation?
- [ ] Do I know how to rollback?

## Script Addition Guidelines

### Adding New Scripts to HTML

**WRONG** (Causes conflicts):
```html
<!-- Just adding anywhere -->
<script src="my-new-fix.js"></script>
```

**RIGHT** (Safe addition):
```html
<!-- 1. Document what it does -->
<!-- MY NEW FIX - Fixes specific issue -->
<!-- Features:
     - What it does
     - What it modifies
     - How to disable it
     - Rollback procedure -->

<!-- 2. Add in correct load order -->
<script src="my-new-fix.js"></script>

<!-- 3. Test immediately -->
<!-- 4. Commit to Git if it works -->
```

### Load Order Rules

1. **Core libraries first** (jQuery, jsPDF, etc.)
2. **Base functionality** (nav.js, agent-library.js)
3. **Content providers** (SSOT, education, workspace)
4. **Display handlers** (analysis display, tab switching)
5. **Download handlers** (PDF, DOCX generators)
6. **Protection scripts** (function lockers, monitors)
7. **Fix scripts** (override existing behavior)

## Emergency Contacts

If you're stuck and need to recover:

1. **Check Git log**: `git log --oneline -20`
2. **Check backups**: `dir backups`
3. **Check snapshots**: `dir db-snapshots`
4. **Worst case**: Restore from most recent backup

## Success Indicators

After any change, verify:

- ✅ Server starts without errors
- ✅ Dashboard loads at http://localhost:3001
- ✅ Subcomponent pages load
- ✅ All tabs work (Education, Workspace, Analysis, Output, Resources, History)
- ✅ Download buttons work
- ✅ No console errors
- ✅ Database operations succeed

If ANY of these fail, ROLLBACK IMMEDIATELY.
```

---

## Testing Procedures

### Test 1: Download Button

```
1. Navigate to: http://localhost:3001/subcomponent-detail.html?id=1-4
2. Click "Workspace" tab
3. Click "Analyze Results" button
4. Wait for analysis to complete
5. Click "Download Report" button
6. Open downloaded DOCX file
7. VERIFY: File contains analysis data (scores, dimensions, strengths, weaknesses)
8. VERIFY: File is NOT a blank template
```

**Expected Result**: DOCX with complete analysis data
**Actual Result**: [To be tested]

### Test 2: Tab Switching

```
1. Navigate to: http://localhost:3001/subcomponent-detail.html?id=1-4
2. Click "Education" tab - observe loading
3. Click "Workspace" tab - observe loading
4. Click "Analysis" tab - observe loading
5. Rapidly click between tabs
6. VERIFY: No double-loading or flicker
7. VERIFY: Content loads only once per tab
```

**Expected Result**: Smooth tab switching, no flicker
**Actual Result**: [To be tested]

### Test 3: Rollback

```
1. Create backup: node create-backup.js test-rollback
2. Make a deliberate breaking change (e.g., delete a function)
3. Verify site breaks
4. Rollback: git reset --hard HEAD~1
5. Restart server
6. VERIFY: Site works again
```

**Expected Result**: Complete recovery to working state
**Actual Result**: [To be tested]

---

## File Manifest

### New Files Created (All SAFE - No Existing Code Modified)

1. `COMPREHENSIVE_FIX_PLAN.md` - Overall strategy document
2. `IMPLEMENTATION_SPECS.md` - This file - detailed specifications
3. `download-function-protector.js` - Locks download functions
4. `tab-switch-protector.js` - Prevents double-loading
5. `backup-system.js` - Automated backup creation
6. `create-backup.js` - CLI backup tool
7. `restore-backup.js` - CLI restore tool
8. `db-snapshot.js` - Database snapshot utility
9. `script-loader-master.js` - Script load monitoring
10. `SAFE_DEPLOYMENT_GUIDE.md` - Deployment procedures
11. `.gitignore` - Git configuration

### Modified Files (Minimal Changes)

1. `file-generation-service.js` - Enhanced error handling (SAFE)
2. `enhanced-analysis-display-final.js` - Removed override (SAFE)
3. `docx-download-client.js` - Reverted to original (SAFE)
4. `fix-generated-documents-schema.js` - Database migration (SAFE)

### Database Changes

1. Added `document_name` column to `generated_documents` table
2. Added `mime_type` column to `generated_documents` table
3. Added `metadata` column to `generated_documents` table

All changes are backward compatible and non-breaking.

---

## Deployment Checklist

### Pre-Deployment

- [ ] Git repository initialized
- [ ] Baseline commit created
- [ ] Backup created
- [ ] Database snapshot created
- [ ] All new files reviewed
- [ ] Testing plan prepared

### Deployment

- [ ] Add new scripts to HTML in correct order
- [ ] Restart server
- [ ] Test download button
- [ ] Test tab switching
- [ ] Test all workflows
- [ ] Check console for errors
- [ ] Verify database operations

### Post-Deployment

- [ ] Create success commit
- [ ] Create post-deployment backup
- [ ] Document any issues
- [ ] Update this checklist

### Rollback (If Needed)

- [ ] Stop server
- [ ] Git reset or restore backup
- [ ] Restart server
- [ ] Verify recovery
- [ ] Document what went wrong

---

## Conclusion

All specifications are designed for SAFE MODE operation:

- ✅ **No existing code modified** (except minimal safe changes)
- ✅ **All changes are additive** (new files only)
- ✅ **Complete rollback capability** (Git + backups)
- ✅ **Isolated testing** (can disable any script)
- ✅ **Clear documentation** (step-by-step procedures)

Ready to proceed to Code mode for implementation when approved.
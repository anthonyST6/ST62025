# Git Setup Guide for ScaleOps6 Platform

## Why Git?

Git provides:
- ✅ **Complete change history** - See what changed and when
- ✅ **Instant rollback** - Undo any change in seconds
- ✅ **Safe experimentation** - Test fixes in branches
- ✅ **Audit trail** - Know who changed what
- ✅ **Industry standard** - Used by all professional development teams

## Quick Start (5 Minutes)

### Step 1: Initialize Repository

Open Command Prompt or PowerShell:

```bash
cd "C:\Users\antho\Documents\ST6 Nexus Ops\scaleops6-platform"
git init
```

**Expected Output**:
```
Initialized empty Git repository in C:/Users/antho/Documents/ST6 Nexus Ops/scaleops6-platform/.git/
```

### Step 2: Configure Git (First Time Only)

```bash
git config user.name "ST6Co Developer"
git config user.email "dev@st6co.com"
```

### Step 3: Create .gitignore File

Create a file named `.gitignore` in the scaleops6-platform directory:

```
# Dependencies
node_modules/
package-lock.json

# Generated files
generated/
*.log

# Backups (optional - you may want to version these)
backups/
db-snapshots/

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

### Step 4: Create Baseline Commit

```bash
git add .
git commit -m "Baseline: Working state before systematic fixes

- All 96 subcomponents functional
- Database schema complete with document_name, mime_type, metadata columns
- Download buttons working (with known endpoint routing issue)
- Tab switching functional (with known double-loading issue)
- This commit represents the safe rollback point"
```

**Expected Output**:
```
[main (root-commit) abc1234] Baseline: Working state before systematic fixes
 150 files changed, 50000 insertions(+)
 create mode 100644 dashboard.html
 create mode 100644 server-with-backend.js
 ...
```

### Step 5: Create Backup Branch

```bash
git branch backup/baseline
git branch development
```

### Step 6: Verify Setup

```bash
git status
git log --oneline
git branch -a
```

**Expected Output**:
```
On branch main
nothing to commit, working tree clean

abc1234 Baseline: Working state before systematic fixes

* main
  backup/baseline
  development
```

## Daily Workflow

### Before Making ANY Changes

```bash
# Create checkpoint
git add .
git commit -m "Checkpoint before [what you're about to do]"

# Create branch for testing (optional but recommended)
git checkout -b fix/issue-name
```

### After Making Changes

```bash
# Check what changed
git status
git diff

# If it works, commit it
git add .
git commit -m "Fixed [specific issue] - [brief description]"

# Merge back to main
git checkout main
git merge fix/issue-name
```

### If Something Breaks

```bash
# Option 1: Undo last commit (keeps files)
git reset --soft HEAD~1

# Option 2: Undo last commit (discards changes)
git reset --hard HEAD~1

# Option 3: Go back to specific commit
git log --oneline  # Find the commit hash
git reset --hard abc1234

# Option 4: Return to baseline
git reset --hard backup/baseline
```

## Common Commands

### Viewing History

```bash
# See recent commits
git log --oneline -10

# See detailed history
git log --stat

# See what changed in a commit
git show abc1234

# Compare two commits
git diff abc1234 def5678
```

### Creating Checkpoints

```bash
# Quick checkpoint
git add . && git commit -m "Checkpoint"

# Detailed checkpoint
git add .
git commit -m "Checkpoint: About to modify download functions

Current state:
- Download buttons generate blank templates
- Need to fix endpoint routing
- Database schema complete"
```

### Branching Strategy

```bash
# Create feature branch
git checkout -b fix/download-buttons

# Work on fix...
# Test thoroughly...

# If it works
git checkout main
git merge fix/download-buttons

# If it doesn't work
git checkout main
git branch -D fix/download-buttons  # Delete failed branch
```

## Emergency Recovery

### Scenario 1: "I broke something and don't know what"

```bash
# See what you changed
git status
git diff

# Undo all changes since last commit
git reset --hard HEAD

# Restart server
cd "C:\Users\antho\Documents\ST6 Nexus Ops\scaleops6-platform"
taskkill /F /IM node.exe
node server-with-backend.js
```

### Scenario 2: "The last 3 commits broke things"

```bash
# See recent commits
git log --oneline -10

# Go back 3 commits
git reset --hard HEAD~3

# Restart server
taskkill /F /IM node.exe && node server-with-backend.js
```

### Scenario 3: "I want to go back to the baseline"

```bash
# Return to baseline commit
git reset --hard backup/baseline

# Restart server
taskkill /F /IM node.exe && node server-with-backend.js
```

### Scenario 4: "I want to see what the code looked like yesterday"

```bash
# Find commits from yesterday
git log --since="yesterday" --oneline

# Checkout that commit (read-only)
git checkout abc1234

# Look around, test things...

# Return to current state
git checkout main
```

## Best Practices

### Commit Messages

**GOOD**:
```
git commit -m "Fixed download button endpoint routing

- Changed /api/generate-template-docx/ to /api/generate-docx/
- Added function locking to prevent overrides
- Tested with subcomponent 1-4
- Downloads now contain analysis data"
```

**BAD**:
```
git commit -m "fix"
git commit -m "updates"
git commit -m "changes"
```

### Commit Frequency

- ✅ **After each working feature** - "Fixed download button"
- ✅ **Before risky changes** - "Checkpoint before refactoring"
- ✅ **After testing** - "Verified download fix works"
- ❌ **Not too often** - Don't commit broken code
- ❌ **Not too rarely** - Don't wait days between commits

### Branch Naming

- `fix/download-buttons` - Bug fixes
- `feature/backup-system` - New features
- `refactor/script-loading` - Code improvements
- `test/new-approach` - Experimental changes

## Integration with Backup System

### Combined Protection Strategy

```bash
# Before major changes
git add . && git commit -m "Checkpoint before major refactor"
node create-backup.js before-refactor
node db-snapshot.js before-refactor

# Make changes...

# If it works
git add . && git commit -m "Completed refactor successfully"
node create-backup.js after-refactor

# If it breaks
git reset --hard HEAD~1  # Rollback code
# OR
node restore-backup.js backup-before-refactor-2025-10-24.zip  # Rollback everything
```

## Troubleshooting

### "Git is not recognized as a command"

**Solution**: Install Git for Windows
1. Download from: https://git-scm.com/download/win
2. Run installer with default options
3. Restart Command Prompt
4. Try `git --version`

### "Permission denied" errors

**Solution**: Run Command Prompt as Administrator
1. Right-click Command Prompt
2. Select "Run as administrator"
3. Navigate to project directory
4. Try git commands again

### "Working tree has modifications"

**Solution**: Commit or discard changes
```bash
# See what changed
git status

# Commit changes
git add .
git commit -m "Work in progress"

# OR discard changes
git reset --hard HEAD
```

## Advanced Features (Optional)

### Tagging Releases

```bash
# Tag current state as v1.0
git tag -a v1.0 -m "Version 1.0 - Stable release"

# List tags
git tag

# Go back to tagged version
git checkout v1.0
```

### Viewing File History

```bash
# See all changes to a specific file
git log --follow -- file-generation-service.js

# See who changed what
git blame file-generation-service.js
```

### Comparing Versions

```bash
# Compare current vs last commit
git diff HEAD~1

# Compare two specific commits
git diff abc1234 def5678

# Compare specific file
git diff HEAD~1 -- docx-download-client.js
```

## Quick Reference Card

```
SETUP
git init                          Initialize repository
git add .                         Stage all files
git commit -m "message"           Create commit

DAILY USE
git status                        See what changed
git diff                          See detailed changes
git log --oneline -10             See recent commits

CHECKPOINTS
git add . && git commit -m "msg"  Quick checkpoint
git checkout -b fix/name          Create fix branch

ROLLBACK
git reset --hard HEAD~1           Undo last commit
git reset --hard abc1234          Go to specific commit
git checkout main                 Return to main branch

EMERGENCY
git reset --hard backup/baseline  Return to baseline
git reflog                        See all actions (even deleted commits)
```

## Next Steps

1. ✅ Initialize Git repository (5 minutes)
2. ✅ Create baseline commit (1 minute)
3. ✅ Create backup branch (30 seconds)
4. ✅ Test rollback procedure (2 minutes)
5. ✅ Proceed with confidence knowing you can undo anything

**Total Time**: ~10 minutes for complete safety net

---

## Success Criteria

After setup, you should be able to:

- ✅ Run `git status` and see "nothing to commit, working tree clean"
- ✅ Run `git log` and see your baseline commit
- ✅ Run `git branch` and see main, backup/baseline, development
- ✅ Make a test change, commit it, then rollback successfully

**You now have professional-grade version control and can safely make ANY changes!**
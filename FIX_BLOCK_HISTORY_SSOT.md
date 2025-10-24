# Block History SSOT Compliance Issue

## Problem Identified
The `/api/blocks/:id/history` endpoint generates **FAKE/SAMPLE DATA** instead of querying the database for actual score history. This violates SSOT principles.

## Current Behavior (Lines 1092-1160 in server-with-backend.js)
```javascript
// WRONG: Generates synthetic data
for (let i = days - 1; i >= 0; i--) {
    const variation = Math.sin(i / 3) * 5;  // ❌ FAKE DATA
    const score = Math.round(Math.max(0, Math.min(100, baseScore + variation)));
    // ...
}
```

## What Should Happen (SSOT-Compliant)

### 1. Store Block Score Changes
When a subcomponent analysis completes:
- Recalculate block average (already done ✅)
- **Store block score snapshot in `block_score_history` table**
- Include timestamp, block_id, score, trigger (which subcomponent changed)

### 2. Query Real Data
`/api/blocks/:id/history` should:
```javascript
// Query actual block score history from database
const history = await database.getBlockScoreHistory(blockId, days);
```

### 3. Database Schema Needed
```sql
CREATE TABLE IF NOT EXISTS block_score_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    block_id INTEGER NOT NULL,
    score REAL NOT NULL,
    completed_count INTEGER,
    total_count INTEGER,
    trigger_subcomponent_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Impact
- ❌ Graph shows fake data that doesn't reflect actual progress
- ❌ Statistics (current, average, best) are meaningless
- ❌ Change log shows synthetic events, not real improvements
- ❌ Users cannot track actual score evolution over time

## Fix Required
1. Add `block_score_history` table to database schema
2. Update `database.calculateBlockAverage()` to store history snapshot
3. Create `database.getBlockScoreHistory(blockId, days)` method
4. Replace synthetic data generation with database query in endpoint

## Verification Steps
1. Complete a subcomponent analysis
2. Check that block score updates (already works ✅)
3. Verify block_score_history table has new entry
4. Refresh block detail page
5. Confirm graph shows actual score from database
6. Complete another analysis
7. Verify graph updates with new data point
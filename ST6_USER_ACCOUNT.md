# ST6 User Account Documentation

## Overview
ST6 (Scale Team Six) is now configured as a real user account in the ScaleOps6 platform, just like any paying customer would be. This account serves as both our internal testing account and a demonstration of how the platform works with real data.

## Account Details

### User Information
- **Email**: team@scaleteam6.com
- **Name**: Scale Team Six
- **Company**: ST6Co - ScaleOps6 Platform
- **Role**: Founder/CEO
- **User ID**: 1 (first user in the system)

### Company Profile
ST6Co is developing the ScaleOps6 Platform, an AI-powered GTM operations platform for B2B SaaS startups.

## Data Persistence

All ST6 data is stored in the SQLite database (`scaleops6.db`) and persists across sessions:

1. **User Profile**: Stored in the `users` table
2. **Block Scores**: Stored in the `user_block_scores` table
3. **Worksheet Data**: Stored in the `sessions` table
4. **Score History**: Stored in the `score_history` table
5. **Documents**: Can be uploaded and stored in the `documents` table

## Pre-populated Data

### Problem Statement Worksheet
ST6's Problem Statement worksheet is pre-filled with comprehensive data about the ScaleOps6 Platform, including:
- Problem description
- Target customer definition
- Unique insights
- Market timing rationale
- Solution overview
- Competitive advantages
- Evidence of traction

### Initial Scores
- **Block 1 (Mission Discovery)**: 85% - Completed
- **Block 2 (Customer Insights)**: 78% - In Progress
- **Block 3 (Strategic Prioritization)**: 72% - In Progress
- **Block 4 (Prototype Launch)**: 65% - Pending

## How It Works

### Automatic Data Loading
When you open the Problem Statement subcomponent page (`subcomponent-detail.html`), the system:
1. Checks if ST6 session data exists
2. Automatically loads ST6's worksheet data
3. Displays any saved analysis results
4. Persists all changes to the database

### Data Storage
- **Database**: All core data is stored in SQLite
- **LocalStorage**: Session data is cached for quick access
- **Auto-save**: Changes are automatically saved every 30 seconds

## Using ST6 Account

### For Testing
1. Open any page in the platform
2. ST6 data will automatically load
3. Make changes to test functionality
4. Data persists across page refreshes

### For Demonstrations
1. Show real company data (ST6Co)
2. Demonstrate the assessment process
3. Display AI-generated analysis
4. Show progress tracking over time

## Technical Implementation

### Database Schema
```sql
-- ST6 is user ID 1 in these tables:
users (id, email, name, company, role)
user_block_scores (user_id, block_id, score, status)
sessions (id, user_id, data)
score_history (user_id, block_id, score, sub_scores)
```

### Session Management
ST6 session data structure:
```javascript
{
  userId: 1,
  email: 'team@scaleteam6.com',
  worksheetData: {
    'problem-statement': { ... }
  },
  analysisResults: {
    'problem-statement': { ... }
  }
}
```

## Benefits

1. **Real User Experience**: ST6 functions exactly like any paying customer account
2. **Persistent Data**: All data is saved in the database, not hardcoded
3. **Scalable**: The same system supports unlimited user accounts
4. **Testable**: Can test all features with real data
5. **Demonstrable**: Perfect for showing the platform to investors/customers

## Future Enhancements

As we add features to the platform, ST6 account will automatically benefit:
- Multi-workspace support
- Team collaboration
- Advanced analytics
- API access
- Export capabilities
- Integration with external tools

## Maintenance

To reset ST6 data:
```bash
node setup-st6-sqlite.js
```

To view ST6 data in the database:
```bash
sqlite3 scaleops6.db
SELECT * FROM users WHERE email = 'team@scaleteam6.com';
```

## Summary

ST6 is not a simulation or test mode - it's a real user account in the production system. This approach ensures that:
- The platform works correctly for real users
- We can test with authentic data
- Demonstrations show actual functionality
- The system is truly multi-tenant from day one
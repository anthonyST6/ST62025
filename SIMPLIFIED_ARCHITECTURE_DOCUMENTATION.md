# ScaleOps6 Platform - Simplified Architecture Documentation

## Overview
The ScaleOps6 platform has been simplified to use a single-server architecture that handles both API endpoints and static file serving, eliminating complexity and improving maintainability.

## Architecture Components

### 1. Single Combined Server (`combined-server.js`)
- **Port**: 3001
- **Responsibilities**:
  - Serves all static HTML, CSS, and JavaScript files
  - Provides all API endpoints for dynamic data
  - Handles agent library integration
  - Manages subcomponent name mapping

### 2. Key Files

#### `combined-server.js`
- Main server file that handles everything
- Loads agent library from `agent-library.js`
- Uses subcomponent name mapping from `subcomponent-names-mapping.js`
- Provides API endpoints:
  - `GET /api/blocks` - List all blocks
  - `GET /api/blocks/:id` - Get block details with subcomponents
  - `GET /api/blocks/:id/history` - Get block history
  - `GET /api/subcomponents/:id` - Get subcomponent details
  - `POST /api/analysis` - Submit analysis
  - `GET /api/score-history/:subcomponentId` - Get score history
  - `POST /api/score-history` - Save score

#### `subcomponent-names-mapping.js`
- Contains the correct display names for all 96 subcomponents
- Maps subcomponent IDs (e.g., "1-1") to proper names (e.g., "Problem Statement Definition")
- Ensures separation between display names and agent names

#### `agent-library.js`
- Contains all 96 agent configurations
- Each agent has evaluation logic, scoring dimensions, and descriptions
- Agents are referenced by keys (e.g., "1a", "1b", etc.)

## Data Flow

### User Journey
1. **Dashboard** (`dashboard.html`)
   - User sees all 16 blocks
   - Clicks on a block

2. **Block Detail** (`block-detail.html`)
   - Fetches block data from `/api/blocks/:id`
   - Displays 6 subcomponents with CORRECT names from mapping
   - Shows scores and progress for each subcomponent
   - User clicks on a subcomponent

3. **Subcomponent Detail** (`subcomponent-detail.html`)
   - Fetches data from `/api/subcomponents/:id`
   - Shows agent-specific content (education, workspace, analysis)
   - Uses the agent name for processing but displays proper UI

## Name Mapping System

### Problem Solved
Previously, the system was incorrectly displaying agent names (e.g., "Problem Definition Evaluator") instead of proper subcomponent names (e.g., "Problem Statement Definition").

### Solution
- Created `subcomponent-names-mapping.js` with all 96 correct names
- Modified `combined-server.js` to use this mapping when returning subcomponent data
- Maintains separation between:
  - **Display Names**: What users see in the UI (from mapping)
  - **Agent Names**: Internal identifiers for processing (from agent library)

### Example Mapping
```javascript
// Block 1: Mission Discovery
'1-1': 'Problem Statement Definition',  // Display name
// Agent: Problem Definition Evaluator (1a) - Internal processing

// Block 5: Go-to-Market Strategy (Special mapping)
'5-1': 'Target Identification',  // Display name
// Agent: Market Strategy Expert (5a) - Internal processing
```

## Running the System

### Start the Server
```bash
node combined-server.js
```

### Access the Application
- Dashboard: http://localhost:3001/dashboard.html
- Direct block access: http://localhost:3001/block-detail.html?id=1
- Direct subcomponent: http://localhost:3001/subcomponent-detail.html?id=1-1

### Stop the Server
```bash
# Find the process
netstat -ano | findstr :3001

# Kill the process (replace PID with actual process ID)
taskkill /F /PID [PID]
```

## Benefits of Simplified Architecture

1. **Single Point of Control**: One server handles everything
2. **No Proxy Complexity**: Direct requests, no forwarding needed
3. **Easier Debugging**: All logs in one place
4. **Simplified Deployment**: Only one service to deploy
5. **Better Performance**: No inter-server communication overhead
6. **Clearer Data Flow**: Direct API calls from frontend to backend

## Testing Verification

### Verified Functionality
- ✅ All 16 blocks display correctly
- ✅ All 96 subcomponents show proper names (not agent names)
- ✅ Complete user journey from dashboard to subcomponent detail
- ✅ API endpoints return correct data
- ✅ Agent integration works properly
- ✅ Score tracking and history functional

### Special Cases Tested
- ✅ Block 5 (Go-to-Market Strategy) - Special name mapping
- ✅ Block 15 (Leadership Expansion) - Special name mapping
- ✅ All other blocks - Standard name mapping

## Maintenance Notes

### Adding New Subcomponents
1. Add the subcomponent name to `subcomponent-names-mapping.js`
2. Add the corresponding agent to `agent-library.js`
3. Restart the server

### Modifying Names
1. Update the name in `subcomponent-names-mapping.js`
2. Restart the server
3. No other changes needed - the system will automatically use the new name

### Troubleshooting
- If subcomponents show agent names: Check `subcomponent-names-mapping.js` is loaded
- If API fails: Ensure server is running on port 3001
- If pages don't load: Check static file paths in `combined-server.js`

## Architecture Diagram

```
┌─────────────────┐
│   Browser       │
│  (Client-side)  │
└────────┬────────┘
         │
         │ HTTP Requests
         │ (Port 3001)
         ▼
┌─────────────────┐
│ combined-server │
│      .js        │
├─────────────────┤
│ • Static Files  │
│ • API Endpoints │
│ • Agent Library │
│ • Name Mapping  │
└─────────────────┘
         │
         ▼
┌─────────────────┐
│   Data Sources  │
├─────────────────┤
│ • agent-library │
│ • subcomponent- │
│   names-mapping │
└─────────────────┘
```

## Conclusion

The simplified architecture successfully:
1. Reduces complexity from multiple servers to one
2. Fixes the subcomponent naming issue
3. Maintains all existing functionality
4. Improves system maintainability
5. Provides clear separation of concerns

The system is now production-ready with proper subcomponent names displayed throughout the user interface.
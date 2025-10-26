@echo off
echo ========================================
echo Admin Dashboard Endpoint Testing
echo ========================================
echo.

echo [TEST 1] Admin Stats Endpoint
curl -s http://localhost:3001/api/admin/stats
echo.
echo.

echo [TEST 2] Admin Users List
curl -s http://localhost:3001/api/admin/users
echo.
echo.

echo [TEST 3] GTM Analytics
curl -s "http://localhost:3001/api/admin/analytics/gtm-scores?days=30"
echo.
echo.

echo [TEST 4] VC List
curl -s http://localhost:3001/api/admin/vc/list
echo.
echo.

echo [TEST 5] VC Assignments
curl -s http://localhost:3001/api/admin/vc/assignments
echo.
echo.

echo [TEST 6] Unassigned Startups
curl -s http://localhost:3001/api/admin/vc/startups/unassigned
echo.
echo.

echo [TEST 7] Analytics Overview
curl -s http://localhost:3001/api/admin/analytics/overview
echo.
echo.

echo [TEST 8] Top Performers
curl -s "http://localhost:3001/api/admin/analytics/top-performers?limit=10"
echo.
echo.

echo [TEST 9] Most Improved
curl -s "http://localhost:3001/api/admin/analytics/most-improved?days=30&limit=10"
echo.
echo.

echo [TEST 10] Heatmap
curl -s http://localhost:3001/api/admin/analytics/heatmap
echo.
echo.

echo [TEST 11] Agent Usage
curl -s "http://localhost:3001/api/admin/analytics/agent-usage?days=30&limit=50"
echo.
echo.

echo [TEST 12] Billing Overview
curl -s http://localhost:3001/api/admin/billing/overview
echo.
echo.

echo [TEST 13] System Health
curl -s http://localhost:3001/api/admin/system/health
echo.
echo.

echo [TEST 14] Audit Log
curl -s "http://localhost:3001/api/admin/audit-log?limit=50"
echo.
echo.

echo [TEST 15] Login History
curl -s "http://localhost:3001/api/admin/system/login-history?limit=50"
echo.
echo.

echo ========================================
echo All Tests Complete!
echo ========================================
pause
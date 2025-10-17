@echo off
echo.
echo ========================================
echo  RESTARTING SERVER WITH ALIGNMENT FIX
echo ========================================
echo.
echo Stopping current server...
echo Press Ctrl+C in the server terminal to stop it
echo.
echo Then run: node server-with-backend.js
echo.
echo The server will pick up the corrected files:
echo   - educational-content.js (56 titles fixed)
echo   - agent-generated-questions-complete.js (89 domains fixed)
echo.
echo After restart, test these URLs:
echo   http://localhost:3001/subcomponent-detail.html?id=2-1
echo   http://localhost:3001/subcomponent-detail.html?id=2-5
echo   http://localhost:3001/subcomponent-detail.html?id=3-5
echo.
pause
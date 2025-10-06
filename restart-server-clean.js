/**
 * Clean Server Restart Script
 * Clears module cache and restarts with fresh modules
 */

const { spawn } = require('child_process');
const path = require('path');

console.log('🔄 Clearing module cache and restarting server...\n');

// Clear the require cache for critical modules
const modulesToClear = [
    './agent-correct-mapping.js',
    './integrated-agent-library.js',
    './agent-subcomponent-mapping.js',
    './combined-server-enhanced.js'
];

modulesToClear.forEach(modulePath => {
    const fullPath = path.resolve(modulePath);
    if (require.cache[fullPath]) {
        delete require.cache[fullPath];
        console.log(`✅ Cleared cache for: ${modulePath}`);
    }
});

// Kill any existing Node processes on port 3001
const killCommand = process.platform === 'win32' 
    ? 'netstat -ano | findstr :3001' 
    : 'lsof -ti:3001';

const killProcess = spawn(killCommand, [], { shell: true });

killProcess.on('close', (code) => {
    if (code === 0) {
        // Found process, kill it
        const kill = spawn('taskkill', ['/F', '/PID', process.pid], { shell: true });
        kill.on('close', () => {
            startServer();
        });
    } else {
        // No process found, start server
        startServer();
    }
});

function startServer() {
    console.log('\n🚀 Starting fresh server instance...\n');
    
    // Start the server with a fresh Node process
    const server = spawn('node', ['combined-server-enhanced.js'], {
        stdio: 'inherit',
        env: { ...process.env, NODE_ENV: 'production' }
    });
    
    server.on('error', (err) => {
        console.error('❌ Failed to start server:', err);
    });
    
    server.on('close', (code) => {
        console.log(`Server exited with code ${code}`);
    });
}

// Handle process termination
process.on('SIGINT', () => {
    console.log('\n👋 Shutting down...');
    process.exit(0);
});
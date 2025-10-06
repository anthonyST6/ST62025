// Minimal test server to verify template serving
const http = require('http');
const { getTemplatesForSubcomponent } = require('./get-templates.js');

const server = http.createServer((req, res) => {
    console.log(`Request: ${req.method} ${req.url}`);
    
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Simple test endpoint
    if (req.url === '/test') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Server is running!');
        return;
    }
    
    // Test template endpoint
    const match = req.url.match(/^\/api\/subcomponents\/(.+)$/);
    if (match) {
        const subcomponentId = match[1];
        console.log(`Getting templates for ${subcomponentId}`);
        
        try {
            const templates = getTemplatesForSubcomponent(subcomponentId);
            
            const response = {
                id: subcomponentId,
                templates: templates || [],
                resources: {
                    templates: templates || []
                }
            };
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(response));
        } catch (error) {
            console.error('Error:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: error.message }));
        }
        return;
    }
    
    // 404 for everything else
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
});

const PORT = 3002;
server.listen(PORT, () => {
    console.log(`\n✅ Minimal test server running on http://localhost:${PORT}`);
    console.log(`Test endpoints:`);
    console.log(`  GET http://localhost:${PORT}/test`);
    console.log(`  GET http://localhost:${PORT}/api/subcomponents/1-1`);
});
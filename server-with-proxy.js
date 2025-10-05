const http = require('http');
const fs = require('fs');
const path = require('path');
const httpProxy = require('http-proxy-middleware');

const PORT = 8080;

// Create proxy for API calls
const proxy = httpProxy.createProxyMiddleware('/api', {
    target: 'http://localhost:3001',
    changeOrigin: true,
    logLevel: 'debug'
});

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url}`);
    
    // Handle API requests - forward to API server
    if (req.url.startsWith('/api/')) {
        const apiUrl = `http://localhost:3001${req.url}`;
        
        // Make request to API server
        const apiReq = http.request(apiUrl, {
            method: req.method,
            headers: req.headers
        }, (apiRes) => {
            res.writeHead(apiRes.statusCode, apiRes.headers);
            apiRes.pipe(res);
        });
        
        apiReq.on('error', (error) => {
            console.error('API request error:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'API server error' }));
        });
        
        // Forward request body if present
        if (req.method === 'POST' || req.method === 'PUT') {
            req.pipe(apiReq);
        } else {
            apiReq.end();
        }
        
        return;
    }
    
    // Handle static files
    let filePath = '.' + req.url.split('?')[0]; // Remove query params
    if (filePath === './') {
        filePath = './dashboard.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - File Not Found</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`, 'utf-8');
            }
        } else {
            res.writeHead(200, { 
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server with API proxy running at http://localhost:${PORT}/`);
    console.log(`Static files served from port ${PORT}`);
    console.log(`API requests proxied to port 3001`);
    console.log(`Open http://localhost:${PORT}/dashboard.html to view the application`);
});
const fs = require('fs');
const path = require('path');

// Standard header HTML
const standardHeader = `    <!-- Standard Header -->
    <header style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 40px;
        background: #000000;
        border-bottom: 1px solid rgba(255, 69, 0, 0.3);
    ">
        <!-- Logo -->
        <div style="display: flex; align-items: center;">
            <img src="Official_ScaleOps6_Logo.png" alt="ScaleOps6" style="height: 40px; margin-right: 10px;">
            <a href="/" style="
                font-size: 24px;
                font-weight: bold;
                color: #ffffff;
                text-decoration: none;
            ">
                scale<span style="color: #FF4500;">ops</span><sup style="color: #FF4500; font-size: 14px;">6</sup>
            </a>
        </div>
        
        <!-- Navigation -->
        <nav style="display: flex; gap: 30px; align-items: center;">
            <a href="/" style="color: rgba(255, 255, 255, 0.8); text-decoration: none; font-weight: 500; transition: color 0.3s;">Dashboard</a>
            <a href="#" style="color: rgba(255, 255, 255, 0.8); text-decoration: none; font-weight: 500; transition: color 0.3s;">Analytics</a>
            <a href="#" style="color: rgba(255, 255, 255, 0.8); text-decoration: none; font-weight: 500; transition: color 0.3s;">Help</a>
        </nav>

        <!-- User Section -->
        <div style="display: flex; align-items: center; gap: 20px;">
            <span style="color: rgba(255, 255, 255, 0.6);">Guest User</span>
            <a href="#" onclick="logout()" style="
                padding: 8px 20px;
                border: 1px solid #FF4500;
                border-radius: 4px;
                background: transparent;
                color: #FF4500;
                cursor: pointer;
                transition: all 0.3s;
                text-decoration: none;
            ">Logout</a>
            <span style="font-size: 12px; color: rgba(255, 255, 255, 0.5);">
                powered by <a href="#" style="color: #FF4500; text-decoration: none;">scaleteam</a><sup style="font-size: 10px;">®</sup>
            </span>
        </div>
    </header>`;

// Standard styles to add to head
const standardStyles = `    <style>
        /* Standard Header Styles */
        body {
            margin: 0;
            padding: 0;
            background: #000000;
            color: #ffffff;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
        
        header a:hover {
            color: #FF4500 !important;
        }
        
        /* Logout button hover */
        header a[onclick*="logout"]:hover {
            background: #FF4500 !important;
            color: #ffffff !important;
        }
    </style>`;

// Logout script to add if not present
const logoutScript = `
        // Logout function
        function logout() {
            localStorage.removeItem('authToken');
            localStorage.removeItem('clientId');
            window.location.href = '/login.html';
        }`;

// Function to process HTML files
function processHTMLFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const fileName = path.basename(filePath);
        
        // Skip login and certain system files
        if (fileName === 'login.html' || 
            fileName === 'login-modern.html' || 
            fileName === 'login-st6.html' ||
            fileName === 'redirect-to-main.html') {
            console.log(`⏭️  Skipping ${fileName} (login/system page)`);
            return;
        }

        console.log(`📝 Processing ${fileName}...`);

        // Remove existing headers (various patterns)
        // Pattern 1: <header> tags
        content = content.replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '');
        
        // Pattern 2: Elements with class containing 'header'
        content = content.replace(/<div[^>]*class="[^"]*header[^"]*"[^>]*>[\s\S]*?<\/div>(?=\s*<(?:div|main|section))/gi, '');
        
        // Pattern 3: Navigation bars
        content = content.replace(/<nav[^>]*class="[^"]*nav[^"]*"[^>]*>[\s\S]*?<\/nav>/gi, '');

        // Add standard styles to head if not present
        if (!content.includes('/* Standard Header Styles */')) {
            content = content.replace('</head>', standardStyles + '\n</head>');
        }

        // Add standard header right after <body> tag
        const bodyMatch = content.match(/<body[^>]*>/i);
        if (bodyMatch) {
            const bodyTag = bodyMatch[0];
            const bodyIndex = content.indexOf(bodyTag) + bodyTag.length;
            
            // Insert the header after body tag
            content = content.slice(0, bodyIndex) + '\n' + standardHeader + '\n' + content.slice(bodyIndex);
        }

        // Add logout function if not present
        if (!content.includes('function logout()')) {
            // Find the last script tag or create one before </body>
            if (content.includes('</script>')) {
                // Add to existing script section
                content = content.replace(/<\/script>(?![\s\S]*<\/script>)/, logoutScript + '\n    </script>');
            } else {
                // Add new script section before </body>
                content = content.replace('</body>', '    <script>' + logoutScript + '\n    </script>\n</body>');
            }
        }

        // Write the updated content back
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Updated ${fileName}`);
        
    } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
    }
}

// Get all HTML files in the directory
function getAllHTMLFiles(dir) {
    const files = [];
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isFile() && item.endsWith('.html')) {
            files.push(fullPath);
        }
    }
    
    return files;
}

// Main execution
console.log('🚀 Starting header standardization...\n');

const platformDir = __dirname;
const htmlFiles = getAllHTMLFiles(platformDir);

console.log(`Found ${htmlFiles.length} HTML files to process.\n`);

// Process each file
htmlFiles.forEach(processHTMLFile);

console.log('\n✨ Header standardization complete!');
console.log('📌 Note: The official logo has been added to all pages.');
console.log('🔄 Refresh your browser to see the changes.');
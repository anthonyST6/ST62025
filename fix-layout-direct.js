const fs = require('fs');
const path = require('path');

// Function to ensure correct layout in HTML
function fixModuleLayout(filepath) {
    let html = fs.readFileSync(filepath, 'utf8');
    
    // Check if it has the wrong layout (missing the orange glow or wrong styles)
    const hasCorrectGlow = html.includes('radial-gradient(ellipse at center, rgba(255, 85, 0, 0.15)');
    const hasCorrectBackground = html.includes('background: #000000');
    const hasBackButton = html.includes('Back to Framework');
    
    if (!hasCorrectGlow || !hasCorrectBackground || !hasBackButton) {
        console.log(`  Fixing layout issues in ${path.basename(filepath)}`);
        
        // Replace the entire style section with the correct one
        const correctStyles = `    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: #000000;
            color: #ffffff;
            min-height: 100vh;
            padding: 20px;
            padding-top: 140px;
            position: relative;
        }

        /* Soft orange glow effect - ORIGINAL SCALEOPS6 STYLE */
        body::before {
            content: '';
            position: fixed;
            bottom: -50%;
            left: 50%;
            transform: translateX(-50%);
            width: 150%;
            height: 100%;
            background: radial-gradient(ellipse at center, rgba(255, 85, 0, 0.15) 0%, transparent 70%);
            pointer-events: none;
            z-index: 0;
        }

        .container {
            position: relative;
            z-index: 1;
            max-width: 1200px;
            margin: 0 auto;
        }

        /* Back Button */
        .back-button {
            position: fixed;
            top: 100px;
            left: 20px;
            background: transparent;
            border: 2px solid #FF5500;
            color: #FF5500;
            padding: 10px 20px;
            border-radius: 25px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .back-button:hover {
            background: #FF5500;
            color: #000;
            transform: translateX(-5px);
        }

        /* Breadcrumb Navigation */
        .breadcrumb {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 30px;
            font-size: 14px;
            color: #999;
        }

        .breadcrumb a {
            color: #FF5500;
            text-decoration: none;
            transition: opacity 0.3s ease;
        }

        .breadcrumb a:hover {
            opacity: 0.8;
        }

        .breadcrumb .separator {
            color: #666;
        }

        /* Header Section - ORIGINAL SCALEOPS6 STYLE */
        .subcomponent-header {
            background: rgba(255, 255, 255, 0.02);
            border: 2px solid #FF5500;
            border-radius: 15px;
            padding: 30px;
            margin-bottom: 30px;
            position: relative;
        }

        .subcomponent-number {
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 24px;
            color: #666;
            font-weight: 700;
        }

        .subcomponent-title {
            font-size: 32px;
            font-weight: 800;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: -0.5px;
            color: #FF5500;
        }

        .subcomponent-description {
            font-size: 18px;
            color: #ccc;
            line-height: 1.6;
        }

        /* Tab Navigation - ORIGINAL SCALEOPS6 STYLE */
        .tab-navigation {
            display: flex;
            gap: 10px;
            margin-bottom: 30px;
            border-bottom: 2px solid rgba(255, 255, 255, 0.1);
        }

        .tab-button {
            padding: 15px 25px;
            background: transparent;
            color: #999;
            border: none;
            border-bottom: 3px solid transparent;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            transition: all 0.3s ease;
        }

        .tab-button:hover {
            color: #FF5500;
        }

        .tab-button.active {
            color: #FF5500;
            border-bottom-color: #FF5500;
        }

        /* Tab Content */
        .tab-content {
            display: none;
        }

        .tab-content.active {
            display: block;
        }

        /* Section Styles - ORIGINAL SCALEOPS6 STYLE */
        .education-section, .workspace-section {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 30px;
            margin-bottom: 30px;
        }

        .section-title {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 25px;
            color: #FF5500;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .section-icon {
            font-size: 28px;
        }

        .section-content {
            font-size: 16px;
            line-height: 1.8;
            color: #ccc;
        }

        .section-content h3 {
            color: #FF5500;
            margin-top: 20px;
            margin-bottom: 10px;
        }

        /* Worksheet Fields */
        .worksheet-field {
            margin-bottom: 20px;
        }

        .worksheet-label {
            display: block;
            font-size: 14px;
            font-weight: 600;
            color: #FF5500;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .worksheet-input, .worksheet-textarea {
            width: 100%;
            padding: 12px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            color: #fff;
            font-size: 14px;
            transition: all 0.3s ease;
        }

        .worksheet-input:focus, .worksheet-textarea:focus {
            outline: none;
            border-color: #FF5500;
            background: rgba(255, 255, 255, 0.08);
        }

        .worksheet-textarea {
            min-height: 120px;
            resize: vertical;
        }

        /* Action Buttons */
        .action-buttons {
            display: flex;
            gap: 15px;
            margin-top: 30px;
        }

        .btn-primary {
            background: #FF5500;
            color: #fff;
            border: none;
            padding: 12px 30px;
            border-radius: 25px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .btn-primary:hover {
            background: #d64d2d;
            transform: translateY(-2px);
        }

        .btn-secondary {
            background: transparent;
            color: #FF5500;
            border: 2px solid #FF5500;
            padding: 12px 30px;
            border-radius: 25px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .btn-secondary:hover {
            background: rgba(255, 85, 0, 0.1);
        }

        /* Resources Grid */
        .resources-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }

        .resource-card {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 20px;
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .resource-card:hover {
            transform: translateY(-3px);
            border-color: #FF5500;
            background: rgba(255, 85, 0, 0.05);
        }

        .resource-card h4 {
            color: #FF5500;
            margin-bottom: 10px;
        }

        .resource-card p {
            font-size: 14px;
            color: #999;
        }

        .bullet-list {
            list-style: none;
            padding-left: 0;
            margin-top: 20px;
        }

        .bullet-list li {
            padding: 15px 0 15px 35px;
            position: relative;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            line-height: 1.7;
        }

        .bullet-list li:before {
            content: '▸';
            position: absolute;
            left: 10px;
            color: #FF5500;
            font-size: 20px;
            font-weight: bold;
        }

        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
        }
    </style>`;
        
        // Replace the style section
        html = html.replace(/<style>[\s\S]*?<\/style>/i, correctStyles);
        
        // Ensure back button exists
        if (!html.includes('Back to Framework')) {
            const backButton = `    <!-- Back Button -->
    <button class="back-button" onclick="goBack()">
        ← Back to Framework
    </button>`;
            
            // Insert after <body> and nav.js script
            html = html.replace(/<script src="nav\.js"><\/script>/, 
                `<script src="nav.js"></script>
    
${backButton}`);
        }
        
        // Fix the goBack function to point to module-index.html
        html = html.replace(/window\.location\.href = '\/'/g, "window.location.href = '/module-index.html'");
        html = html.replace(/window\.location\.href = '\/index\.html'/g, "window.location.href = '/module-index.html'");
        
        // Save the fixed file
        fs.writeFileSync(filepath, html);
        return true;
    }
    
    return false;
}

// Process all module files
console.log('Starting permanent layout fix for all modules...\n');

let fixedCount = 0;
let alreadyCorrectCount = 0;
let errorCount = 0;

// Get all module HTML files
const files = fs.readdirSync(__dirname).filter(f => f.match(/^module-\d+-\d+\.html$/));

console.log(`Found ${files.length} module files to check.\n`);

files.forEach(filename => {
    try {
        const filepath = path.join(__dirname, filename);
        console.log(`Checking ${filename}...`);
        
        if (fixModuleLayout(filepath)) {
            console.log(`  ✓ Fixed layout issues`);
            fixedCount++;
        } else {
            console.log(`  ✓ Layout already correct`);
            alreadyCorrectCount++;
        }
    } catch (error) {
        console.error(`  ✗ Error: ${error.message}`);
        errorCount++;
    }
});

console.log('\n=== PERMANENT LAYOUT FIX COMPLETE ===');
console.log(`✓ Fixed: ${fixedCount} modules`);
console.log(`✓ Already correct: ${alreadyCorrectCount} modules`);
if (errorCount > 0) {
    console.log(`✗ Errors: ${errorCount} modules`);
}

console.log('\nAll modules now have:');
console.log('- Black background (#000000)');
console.log('- Orange glow effect');
console.log('- Orange accent color (#FF5500)');
console.log('- Back button to framework');
console.log('- Correct ScaleOps6 styling');
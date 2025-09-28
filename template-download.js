// Template Download Functions for ScaleTeam6 Platform
function downloadTemplate(templateName) {
    let htmlContent = '';
    let filename = '';
    
    if (templateName === 'Problem Statement Canvas') {
        filename = 'ScaleTeam6-Problem-Statement-Canvas.html';
        htmlContent = generateProblemStatementCanvas();
    } else if (templateName === 'Problem Validation Scorecard') {
        filename = 'ScaleTeam6-Problem-Validation-Scorecard.html';
        htmlContent = generateValidationScorecard();
    } else if (templateName === 'Pain Point Prioritization Matrix') {
        filename = 'ScaleTeam6-Pain-Point-Matrix.html';
        htmlContent = generatePainPointMatrix();
    } else {
        if (window.showNotification) {
            window.showNotification('Template not available', 'error');
        } else {
            alert('Template not available');
        }
        return;
    }
    
    // Create blob and download
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    if (window.showNotification) {
        window.showNotification('Template downloaded! Open it and use Print > Save as PDF to create a PDF.', 'success');
    } else {
        alert('Template downloaded! Open it and use Print > Save as PDF to create a PDF.');
    }
}

// Generate Problem Statement Canvas HTML
function generateProblemStatementCanvas() {
    const date = new Date().toLocaleDateString();
    const year = new Date().getFullYear();
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ScaleTeam6 - Problem Statement Canvas</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            padding: 40px; 
            max-width: 1200px; 
            margin: 0 auto; 
            background: white;
            color: #333;
        }
        .header { 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            margin-bottom: 40px; 
            padding-bottom: 20px; 
            border-bottom: 3px solid #FF5500; 
        }
        .logo { 
            display: flex; 
            align-items: center; 
            gap: 15px; 
        }
        .logo-svg {
            width: 60px;
            height: 60px;
        }
        .logo-text { 
            font-size: 32px; 
            font-weight: 800; 
            color: #000;
            letter-spacing: -0.5px;
        }
        .logo-text .scale { 
            color: #000; 
        }
        .logo-text .team { 
            color: #FF5500; 
        }
        .logo-text .six {
            color: #000;
            font-size: 24px;
            vertical-align: super;
        }
        .tagline {
            font-size: 12px;
            color: #666;
            margin-top: 5px;
            letter-spacing: 0.5px;
            text-transform: uppercase;
        }
        h1 { 
            color: #FF5500; 
            font-size: 36px; 
            margin-bottom: 30px; 
            text-align: center;
            font-weight: 800;
            letter-spacing: -0.5px;
        }
        h2 { 
            color: #FF5500; 
            font-size: 22px; 
            margin-bottom: 15px; 
            padding-bottom: 10px; 
            border-bottom: 2px solid #f0f0f0;
            font-weight: 700;
        }
        .section { 
            background: #f9f9f9; 
            border: 1px solid #e0e0e0; 
            border-radius: 12px; 
            padding: 30px; 
            margin-bottom: 25px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        label { 
            display: block; 
            color: #666; 
            font-size: 14px; 
            font-weight: 600; 
            margin: 15px 0 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        input, textarea { 
            width: 100%; 
            padding: 12px; 
            border: 2px solid #e0e0e0; 
            border-radius: 8px; 
            font-size: 14px;
            font-family: 'Inter', sans-serif;
            transition: border-color 0.3s ease;
        }
        input:focus, textarea:focus { 
            outline: none; 
            border-color: #FF5500;
            box-shadow: 0 0 0 3px rgba(255, 85, 0, 0.1);
        }
        textarea { 
            min-height: 100px; 
            resize: vertical; 
        }
        .footer { 
            margin-top: 50px; 
            padding-top: 20px; 
            border-top: 2px solid #f0f0f0; 
            text-align: center; 
            color: #999; 
            font-size: 12px; 
        }
        .footer-logo {
            margin-bottom: 10px;
            font-weight: 700;
            color: #666;
        }
        @media print { 
            body { padding: 20px; } 
            .section { page-break-inside: avoid; } 
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">
            <svg class="logo-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="10" width="80" height="80" rx="10" fill="#FF5500"/>
                <text x="50" y="55" font-family="Inter, sans-serif" font-size="28" font-weight="800" fill="white" text-anchor="middle">ST6</text>
            </svg>
            <div>
                <div class="logo-text">
                    <span class="scale">scale</span><span class="team">team</span><span class="six">6</span>
                </div>
                <div class="tagline">Go-to-Market Excellence</div>
            </div>
        </div>
        <div style="text-align: right; color: #666;">
            <div style="font-size: 14px; font-weight: 600;">Problem Statement Canvas</div>
            <div style="font-size: 12px;">${date}</div>
        </div>
    </div>
    
    <h1>Problem Statement Canvas</h1>
    
    <div class="section">
        <h2>WHO: Target Customer</h2>
        <label>Role/Title:</label>
        <input type="text" placeholder="e.g., VP of Sales, Product Manager">
        <label>Company Size:</label>
        <input type="text" placeholder="e.g., 50-200 employees">
        <label>Industry:</label>
        <input type="text" placeholder="e.g., B2B SaaS, Healthcare">
        <label>Demographics:</label>
        <input type="text" placeholder="e.g., Age, Location, Tech-savvy level">
    </div>
    
    <div class="section">
        <h2>WHAT: The Problem</h2>
        <label>Primary Pain Point:</label>
        <textarea placeholder="What is the main problem they face?"></textarea>
        <label>Secondary Issues:</label>
        <textarea placeholder="What related problems exist?"></textarea>
        <label>Current Frustrations:</label>
        <textarea placeholder="What frustrates them most about current solutions?"></textarea>
    </div>
    
    <div class="section">
        <h2>WHEN: Context & Triggers</h2>
        <label>Trigger Events:</label>
        <input type="text" placeholder="What events trigger this problem?">
        <label>Frequency:</label>
        <input type="text" placeholder="How often does this occur?">
        <label>Urgency Level:</label>
        <input type="text" placeholder="How urgent is solving this?">
    </div>
    
    <div class="section">
        <h2>WHY: Impact & Cost</h2>
        <label>Financial Impact:</label>
        <input type="text" placeholder="$ amount lost or at risk">
        <label>Time Lost:</label>
        <input type="text" placeholder="Hours/month wasted">
        <label>Opportunity Cost:</label>
        <input type="text" placeholder="What opportunities are missed?">
    </div>
    
    <div class="section">
        <h2>HOW: Current Solutions</h2>
        <label>Current Approach:</label>
        <textarea placeholder="How do they solve this today?"></textarea>
        <label>Limitations:</label>
        <textarea placeholder="What doesn't work well?"></textarea>
        <label>Desired Outcome:</label>
        <textarea placeholder="What would ideal look like?"></textarea>
    </div>
    
    <div class="footer">
        <div class="footer-logo">scaleteam<span style="color: #FF5500;">6</span></div>
        <p>© ${year} ScaleTeam6 - Empowering GTM Success</p>
        <p style="margin-top: 10px;">This template is fillable. Use Print > Save as PDF to create a PDF version.</p>
    </div>
</body>
</html>`;
}

// Generate Problem Validation Scorecard HTML
function generateValidationScorecard() {
    const date = new Date().toLocaleDateString();
    const year = new Date().getFullYear();
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ScaleTeam6 - Problem Validation Scorecard</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            padding: 40px; 
            max-width: 1200px; 
            margin: 0 auto;
            background: white;
            color: #333;
        }
        .header { 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            margin-bottom: 40px; 
            padding-bottom: 20px; 
            border-bottom: 3px solid #FF5500; 
        }
        .logo { 
            display: flex; 
            align-items: center; 
            gap: 15px; 
        }
        .logo-svg {
            width: 60px;
            height: 60px;
        }
        .logo-text { 
            font-size: 32px; 
            font-weight: 800; 
            color: #000;
            letter-spacing: -0.5px;
        }
        .logo-text .scale { 
            color: #000; 
        }
        .logo-text .team { 
            color: #FF5500; 
        }
        .logo-text .six {
            color: #000;
            font-size: 24px;
            vertical-align: super;
        }
        .tagline {
            font-size: 12px;
            color: #666;
            margin-top: 5px;
            letter-spacing: 0.5px;
            text-transform: uppercase;
        }
        h1 { 
            color: #FF5500; 
            font-size: 36px; 
            margin-bottom: 30px; 
            text-align: center;
            font-weight: 800;
            letter-spacing: -0.5px;
        }
        h2 { 
            color: #FF5500; 
            font-size: 22px; 
            margin-bottom: 15px;
            font-weight: 700;
        }
        table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 20px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        th { 
            background: #FF5500; 
            color: white; 
            padding: 14px; 
            text-align: left;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-size: 13px;
        }
        td { 
            padding: 14px; 
            border-bottom: 1px solid #e0e0e0;
            background: white;
        }
        tr:hover { 
            background: #f9f9f9; 
        }
        input[type="number"] { 
            width: 80px; 
            padding: 8px; 
            border: 2px solid #e0e0e0; 
            border-radius: 6px; 
            text-align: center;
            font-family: 'Inter', sans-serif;
            font-weight: 600;
        }
        input[type="text"] { 
            width: 100%; 
            padding: 8px; 
            border: 2px solid #e0e0e0; 
            border-radius: 6px;
            font-family: 'Inter', sans-serif;
        }
        input:focus {
            outline: none;
            border-color: #FF5500;
            box-shadow: 0 0 0 3px rgba(255, 85, 0, 0.1);
        }
        .score-summary { 
            margin-top: 30px; 
            padding: 25px; 
            background: #fff; 
            border: 2px solid #FF5500; 
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.05);
        }
        .recommendation { 
            margin-top: 20px; 
            padding: 20px; 
            background: #fff5f0; 
            border-left: 4px solid #FF5500;
            border-radius: 8px;
        }
        .footer { 
            margin-top: 50px; 
            padding-top: 20px; 
            border-top: 2px solid #f0f0f0; 
            text-align: center; 
            color: #999; 
            font-size: 12px; 
        }
        .footer-logo {
            margin-bottom: 10px;
            font-weight: 700;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">
            <svg class="logo-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="10" width="80" height="80" rx="10" fill="#FF5500"/>
                <text x="50" y="55" font-family="Inter, sans-serif" font-size="28" font-weight="800" fill="white" text-anchor="middle">ST6</text>
            </svg>
            <div>
                <div class="logo-text">
                    <span class="scale">scale</span><span class="team">team</span><span class="six">6</span>
                </div>
                <div class="tagline">Go-to-Market Excellence</div>
            </div>
        </div>
        <div style="text-align: right; color: #666;">
            <div style="font-size: 14px; font-weight: 600;">Validation Scorecard</div>
            <div style="font-size: 12px;">${date}</div>
        </div>
    </div>
    
    <h1>Problem Validation Scorecard</h1>
    
    <table>
        <thead>
            <tr>
                <th>Criteria</th>
                <th>Score (1-10)</th>
                <th>Notes</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>Customer Pain Intensity</strong></td>
                <td><input type="number" min="1" max="10" class="score-input"></td>
                <td><input type="text" placeholder="Evidence & observations"></td>
            </tr>
            <tr>
                <td><strong>Market Size</strong></td>
                <td><input type="number" min="1" max="10" class="score-input"></td>
                <td><input type="text" placeholder="TAM/SAM/SOM estimates"></td>
            </tr>
            <tr>
                <td><strong>Urgency to Solve</strong></td>
                <td><input type="number" min="1" max="10" class="score-input"></td>
                <td><input type="text" placeholder="Time sensitivity factors"></td>
            </tr>
            <tr>
                <td><strong>Willingness to Pay</strong></td>
                <td><input type="number" min="1" max="10" class="score-input"></td>
                <td><input type="text" placeholder="Price validation data"></td>
            </tr>
            <tr>
                <td><strong>Competition Gap</strong></td>
                <td><input type="number" min="1" max="10" class="score-input"></td>
                <td><input type="text" placeholder="Differentiation opportunity"></td>
            </tr>
            <tr>
                <td><strong>Technical Feasibility</strong></td>
                <td><input type="number" min="1" max="10" class="score-input"></td>
                <td><input type="text" placeholder="Development complexity"></td>
            </tr>
            <tr>
                <td><strong>Regulatory Compliance</strong></td>
                <td><input type="number" min="1" max="10" class="score-input"></td>
                <td><input type="text" placeholder="Legal requirements"></td>
            </tr>
            <tr>
                <td><strong>Scalability Potential</strong></td>
                <td><input type="number" min="1" max="10" class="score-input"></td>
                <td><input type="text" placeholder="Growth potential"></td>
            </tr>
        </tbody>
    </table>
    
    <div class="score-summary">
        <h2>Total Score: <span id="total-score" style="color: #FF5500;">0</span>/80</h2>
        <div class="recommendation">
            <h3 style="color: #FF5500; margin-bottom: 15px;">Recommendation Guide:</h3>
            <p style="margin-bottom: 10px;"><strong style="color: #4CAF50;">70-80:</strong> Strong problem-market fit, proceed with confidence</p>
            <p style="margin-bottom: 10px;"><strong style="color: #FF9800;">50-69:</strong> Moderate fit, refine problem statement</p>
            <p><strong style="color: #F44336;">Below 50:</strong> Weak fit, consider pivoting</p>
        </div>
    </div>
    
    <div class="footer">
        <div class="footer-logo">scaleteam<span style="color: #FF5500;">6</span></div>
        <p>© ${year} ScaleTeam6 - Empowering GTM Success</p>
        <p style="margin-top: 10px;">This template is fillable. Use Print > Save as PDF to create a PDF version.</p>
    </div>
    
    <script>
        document.querySelectorAll('.score-input').forEach(input => {
            input.addEventListener('input', () => {
                let total = 0;
                document.querySelectorAll('.score-input').forEach(scoreInput => {
                    total += parseInt(scoreInput.value) || 0;
                });
                document.getElementById('total-score').textContent = total;
            });
        });
    </script>
</body>
</html>`;
}

// Generate Pain Point Prioritization Matrix HTML
function generatePainPointMatrix() {
    const date = new Date().toLocaleDateString();
    const year = new Date().getFullYear();
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ScaleTeam6 - Pain Point Prioritization Matrix</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            padding: 40px; 
            max-width: 1200px; 
            margin: 0 auto;
            background: white;
            color: #333;
        }
        .header { 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            margin-bottom: 40px; 
            padding-bottom: 20px; 
            border-bottom: 3px solid #FF5500; 
        }
        .logo { 
            display: flex; 
            align-items: center; 
            gap: 15px; 
        }
        .logo-svg {
            width: 60px;
            height: 60px;
        }
        .logo-text { 
            font-size: 32px; 
            font-weight: 800; 
            color: #000;
            letter-spacing: -0.5px;
        }
        .logo-text .scale { 
            color: #000; 
        }
        .logo-text .team { 
            color: #FF5500; 
        }
        .logo-text .six {
            color: #000;
            font-size: 24px;
            vertical-align: super;
        }
        .tagline {
            font-size: 12px;
            color: #666;
            margin-top: 5px;
            letter-spacing: 0.5px;
            text-transform: uppercase;
        }
        h1 { 
            color: #FF5500; 
            font-size: 36px; 
            margin-bottom: 30px; 
            text-align: center;
            font-weight: 800;
            letter-spacing: -0.5px;
        }
        h2 { 
            color: #333; 
            font-size: 18px; 
            margin-bottom: 15px;
            font-weight: 700;
        }
        .quadrant { 
            margin-bottom: 30px; 
            padding: 25px; 
            border-radius: 12px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .high-high { 
            background: #ffe5e5; 
            border: 2px solid #ff4444; 
        }
        .high-low { 
            background: #fff0e5; 
            border: 2px solid #ff8844; 
        }
        .low-high { 
            background: #fffbe5; 
            border: 2px solid #ffbb44; 
        }
        .low-low { 
            background: #f0f0f0; 
            border: 2px solid #999; 
        }
        label { 
            display: block; 
            color: #666; 
            font-size: 14px; 
            font-weight: 600; 
            margin: 15px 0 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        input, textarea { 
            width: 100%; 
            padding: 10px; 
            border: 2px solid #e0e0e0; 
            border-radius: 6px; 
            font-size: 14px;
            font-family: 'Inter', sans-serif;
            transition: border-color 0.3s ease;
        }
        input:focus, textarea:focus { 
            outline: none; 
            border-color: #FF5500;
            box-shadow: 0 0 0 3px rgba(255, 85, 0, 0.1);
        }
        textarea { 
            min-height: 80px; 
            resize: vertical; 
        }
        .score-row { 
            display: flex; 
            gap: 20px; 
            align-items: center; 
            margin: 15px 0; 
        }
        .score-row label { 
            margin: 0; 
            flex: 0 0 auto; 
        }
        .score-row input { 
            flex: 0 0 100px; 
        }
        .priority-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-left: 10px;
        }
        .priority-1 { background: #ff4444; color: white; }
        .priority-2 { background: #ff8844; color: white; }
        .priority-3 { background: #ffbb44; color: #333; }
        .priority-4 { background: #999; color: white; }
        .footer { 
            margin-top: 50px; 
            padding-top: 20px; 
            border-top: 2px solid #f0f0f0; 
            text-align: center; 
            color: #999; 
            font-size: 12px; 
        }
        .footer-logo {
            margin-bottom: 10px;
            font-weight: 700;
            color: #666;
        }
        @media print { 
            body { padding: 20px; } 
            .quadrant { page-break-inside: avoid; } 
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">
            <svg class="logo-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="10" width="80" height="80" rx="10" fill="#FF5500"/>
                <text x="50" y="55" font-family="Inter, sans-serif" font-size="28" font-weight="800" fill="white" text-anchor="middle">ST6</text>
            </svg>
            <div>
                <div class="logo-text">
                    <span class="scale">scale</span><span class="team">team</span><span class="six">6</span>
                </div>
                <div class="tagline">Go-to-Market Excellence</div>
            </div>
        </div>
        <div style="text-align: right; color: #666;">
            <div style="font-size: 14px; font-weight: 600;">Pain Point Matrix</div>
            <div style="font-size: 12px;">${date}</div>
        </div>
    </div>
    
    <h1>Pain Point Prioritization Matrix</h1>
    
    <div class="quadrant high-high">
        <h2>HIGH IMPACT / HIGH FREQUENCY <span class="priority-badge priority-1">Priority 1</span></h2>
        <label>Pain Point:</label>
        <textarea placeholder="Describe the pain point"></textarea>
        <div class="score-row">
            <label>Impact Score (1-10):</label>
            <input type="number" min="1" max="10">
            <label>Frequency (1-10):</label>
            <input type="number" min="1" max="10">
        </div>
        <label>Action Plan:</label>
        <textarea placeholder="How will you address this?"></textarea>
    </div>
    
    <div class="quadrant high-low">
        <h2>HIGH IMPACT / LOW FREQUENCY <span class="priority-badge priority-2">Priority 2</span></h2>
        <label>Pain Point:</label>
        <textarea placeholder="Describe the pain point"></textarea>
        <div class="score-row">
            <label>Impact Score (1-10):</label>
            <input type="number" min="1" max="10">
            <label>Frequency (1-10):</label>
            <input type="number" min="1" max="10">
        </div>
        <label>Action Plan:</label>
        <textarea placeholder="How will you address this?"></textarea>
    </div>
    
    <div class="quadrant low-high">
        <h2>LOW IMPACT / HIGH FREQUENCY <span class="priority-badge priority-3">Priority 3</span></h2>
        <label>Pain Point:</label>
        <textarea placeholder="Describe the pain point"></textarea>
        <div class="score-row">
            <label>Impact Score (1-10):</label>
            <input type="number" min="1" max="10">
            <label>Frequency (1-10):</label>
            <input type="number" min="1" max="10">
        </div>
        <label>Action Plan:</label>
        <textarea placeholder="How will you address this?"></textarea>
    </div>
    
    <div class="quadrant low-low">
        <h2>LOW IMPACT / LOW FREQUENCY <span class="priority-badge priority-4">Priority 4</span></h2>
        <label>Pain Point:</label>
        <textarea placeholder="Describe the pain point"></textarea>
        <div class="score-row">
            <label>Impact Score (1-10):</label>
            <input type="number" min="1" max="10">
            <label>Frequency (1-10):</label>
            <input type="number" min="1" max="10">
        </div>
        <label>Action Plan:</label>
        <textarea placeholder="How will you address this?"></textarea>
    </div>
    
    <div class="footer">
        <div class="footer-logo">scaleteam<span style="color: #FF5500;">6</span></div>
        <p>© ${year} ScaleTeam6 - Empowering GTM Success</p>
        <p style="margin-top: 10px;">This template is fillable. Use Print > Save as PDF to create a PDF version.</p>
    </div>
</body>
</html>`;
}

// Make functions available globally
window.downloadTemplate = downloadTemplate;
window.generateProblemStatementCanvas = generateProblemStatementCanvas;
window.generateValidationScorecard = generateValidationScorecard;
window.generatePainPointMatrix = generatePainPointMatrix;
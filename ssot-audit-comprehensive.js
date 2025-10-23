/**
 * SSOT Comprehensive Audit Script
 * 
 * This script performs a complete audit of all 96 subcomponents to verify:
 * 1. Each subcomponent has templates in both Resources and Output tabs
 * 2. Template counts match expected values (should have 3-4 templates)
 * 3. Templates are relevant to the subcomponent domain
 * 4. Template names are consistent across Resources and Output
 * 5. All required data structures are present
 * 
 * This is a READ-ONLY audit - it does not modify any data.
 */

const fs = require('fs');
const path = require('path');

// Load the SSOT registry
const { COMPLETE_SSOT_REGISTRY } = require('./core/complete-ssot-registry.js');

// Audit results storage
const auditResults = {
    timestamp: new Date().toISOString(),
    totalSubcomponents: 0,
    passed: 0,
    failed: 0,
    warnings: 0,
    details: [],
    summary: {
        templateIssues: [],
        missingTemplates: [],
        mismatchedTemplates: [],
        domainIssues: [],
        completeSubcomponents: []
    }
};

// Expected template count (most subcomponents should have 3-4 templates)
const EXPECTED_TEMPLATE_COUNT = { min: 3, max: 4 };

/**
 * Audit a single subcomponent
 */
function auditSubcomponent(id, data) {
    const result = {
        id,
        name: data.name,
        blockId: data.blockId,
        blockName: data.blockName,
        phase: data.phase,
        status: 'PASS',
        issues: [],
        warnings: [],
        checks: {
            hasResources: false,
            hasOutputs: false,
            resourceTemplates: 0,
            outputTemplates: 0,
            templatesMatch: false,
            domainConsistent: false,
            templateCountOk: false,
            hasAgent: false,
            hasEducation: false,
            hasWorkspace: false,
            hasAnalysis: false
        }
    };

    // Check 1: Resources section exists and has templates
    if (data.resources && data.resources.templates) {
        result.checks.hasResources = true;
        result.checks.resourceTemplates = data.resources.templates.length;
    } else {
        result.issues.push('Missing resources.templates array');
        result.status = 'FAIL';
    }

    // Check 2: Outputs section exists and has templates
    if (data.outputs && data.outputs.templates) {
        result.checks.hasOutputs = true;
        result.checks.outputTemplates = data.outputs.templates.length;
    } else {
        result.issues.push('Missing outputs.templates array');
        result.status = 'FAIL';
    }

    // Check 3: Template counts match between Resources and Output
    if (result.checks.hasResources && result.checks.hasOutputs) {
        if (result.checks.resourceTemplates === result.checks.outputTemplates) {
            result.checks.templatesMatch = true;
        } else {
            result.issues.push(`Template count mismatch: Resources(${result.checks.resourceTemplates}) vs Output(${result.checks.outputTemplates})`);
            result.status = 'FAIL';
        }
    }

    // Check 4: Template count is within expected range
    const templateCount = result.checks.resourceTemplates;
    if (templateCount >= EXPECTED_TEMPLATE_COUNT.min && templateCount <= EXPECTED_TEMPLATE_COUNT.max) {
        result.checks.templateCountOk = true;
    } else if (templateCount > 0) {
        result.warnings.push(`Template count (${templateCount}) outside expected range (${EXPECTED_TEMPLATE_COUNT.min}-${EXPECTED_TEMPLATE_COUNT.max})`);
        if (result.status === 'PASS') result.status = 'WARNING';
    } else {
        result.issues.push('No templates found');
        result.status = 'FAIL';
    }

    // Check 5: Domain consistency across all sections
    const domains = [];
    if (data.agent?.domain) domains.push(data.agent.domain);
    if (data.education?.title) domains.push(data.education.title);
    if (data.workspace?.domain) domains.push(data.workspace.domain);
    if (data.analysis?.domain) domains.push(data.analysis.domain);
    if (data.resources?.domain) domains.push(data.resources.domain);
    if (data.outputs?.domain) domains.push(data.outputs.domain);

    const uniqueDomains = [...new Set(domains)];
    if (uniqueDomains.length === 1 && uniqueDomains[0] === data.name) {
        result.checks.domainConsistent = true;
    } else {
        result.warnings.push(`Domain inconsistency: ${uniqueDomains.join(', ')}`);
        if (result.status === 'PASS') result.status = 'WARNING';
    }

    // Check 6: Template names match between Resources and Output
    if (result.checks.hasResources && result.checks.hasOutputs) {
        const resourceTemplates = data.resources.templates.sort();
        const outputTemplates = data.outputs.templates.sort();
        
        if (JSON.stringify(resourceTemplates) !== JSON.stringify(outputTemplates)) {
            result.issues.push('Template names differ between Resources and Output');
            result.status = 'FAIL';
            
            // Find differences
            const onlyInResources = resourceTemplates.filter(t => !outputTemplates.includes(t));
            const onlyInOutput = outputTemplates.filter(t => !resourceTemplates.includes(t));
            
            if (onlyInResources.length > 0) {
                result.warnings.push(`Only in Resources: ${onlyInResources.join(', ')}`);
            }
            if (onlyInOutput.length > 0) {
                result.warnings.push(`Only in Output: ${onlyInOutput.join(', ')}`);
            }
        }
    }

    // Check 7: Template relevance to subcomponent domain
    if (result.checks.hasResources) {
        const templates = data.resources.templates;
        const domain = data.name.toLowerCase();
        
        // Check if at least one template name relates to the domain
        const relevantTemplates = templates.filter(t => {
            const tLower = t.toLowerCase();
            const domainWords = domain.split(' ');
            return domainWords.some(word => tLower.includes(word.toLowerCase()));
        });
        
        if (relevantTemplates.length === 0) {
            result.warnings.push('No templates appear directly related to subcomponent domain');
            if (result.status === 'PASS') result.status = 'WARNING';
        }
    }

    // Check 8: Core data sections exist
    result.checks.hasAgent = !!(data.agent && data.agent.name);
    result.checks.hasEducation = !!(data.education && data.education.what);
    result.checks.hasWorkspace = !!(data.workspace && data.workspace.questions);
    result.checks.hasAnalysis = !!(data.analysis && data.analysis.dimensions);

    if (!result.checks.hasAgent) result.warnings.push('Missing agent information');
    if (!result.checks.hasEducation) result.warnings.push('Missing education content');
    if (!result.checks.hasWorkspace) result.warnings.push('Missing workspace questions');
    if (!result.checks.hasAnalysis) result.warnings.push('Missing analysis dimensions');

    // List actual templates for reference
    if (result.checks.hasResources) {
        result.templates = {
            resources: data.resources.templates,
            output: data.outputs?.templates || []
        };
    }

    return result;
}

/**
 * Run complete audit
 */
function runCompleteAudit() {
    console.log('🔍 Starting SSOT Comprehensive Audit...\n');
    console.log('=' .repeat(80));
    
    const subcomponentIds = Object.keys(COMPLETE_SSOT_REGISTRY).sort((a, b) => {
        const [aBlock, aSub] = a.split('-').map(Number);
        const [bBlock, bSub] = b.split('-').map(Number);
        if (aBlock !== bBlock) return aBlock - bBlock;
        return aSub - bSub;
    });

    auditResults.totalSubcomponents = subcomponentIds.length;

    // Audit each subcomponent
    subcomponentIds.forEach(id => {
        const data = COMPLETE_SSOT_REGISTRY[id];
        const result = auditSubcomponent(id, data);
        
        auditResults.details.push(result);
        
        if (result.status === 'PASS') {
            auditResults.passed++;
            auditResults.summary.completeSubcomponents.push(id);
        } else if (result.status === 'FAIL') {
            auditResults.failed++;
            if (result.issues.some(i => i.includes('template'))) {
                auditResults.summary.templateIssues.push({ id, issues: result.issues });
            }
        } else if (result.status === 'WARNING') {
            auditResults.warnings++;
        }
    });

    // Identify specific issues
    auditResults.details.forEach(result => {
        if (result.checks.resourceTemplates === 0 || result.checks.outputTemplates === 0) {
            auditResults.summary.missingTemplates.push({
                id: result.id,
                name: result.name,
                resourceCount: result.checks.resourceTemplates,
                outputCount: result.checks.outputTemplates
            });
        }
        
        if (result.checks.hasResources && result.checks.hasOutputs && !result.checks.templatesMatch) {
            auditResults.summary.mismatchedTemplates.push({
                id: result.id,
                name: result.name,
                resources: result.templates.resources,
                output: result.templates.output
            });
        }
        
        if (!result.checks.domainConsistent) {
            auditResults.summary.domainIssues.push({
                id: result.id,
                name: result.name,
                issue: result.warnings.find(w => w.includes('Domain'))
            });
        }
    });

    return auditResults;
}

/**
 * Generate console report
 */
function printConsoleReport(results) {
    console.log('\n' + '='.repeat(80));
    console.log('📊 SSOT AUDIT SUMMARY');
    console.log('='.repeat(80));
    console.log(`Total Subcomponents: ${results.totalSubcomponents}`);
    console.log(`✅ Passed: ${results.passed} (${Math.round(results.passed/results.totalSubcomponents*100)}%)`);
    console.log(`❌ Failed: ${results.failed} (${Math.round(results.failed/results.totalSubcomponents*100)}%)`);
    console.log(`⚠️  Warnings: ${results.warnings} (${Math.round(results.warnings/results.totalSubcomponents*100)}%)`);
    console.log('='.repeat(80));

    // Critical Issues
    if (results.summary.missingTemplates.length > 0) {
        console.log('\n❌ CRITICAL: Subcomponents with Missing Templates:');
        results.summary.missingTemplates.forEach(item => {
            console.log(`   ${item.id} - ${item.name}: Resources(${item.resourceCount}), Output(${item.outputCount})`);
        });
    }

    // Template Mismatches
    if (results.summary.mismatchedTemplates.length > 0) {
        console.log('\n⚠️  Template Mismatches Between Resources and Output:');
        results.summary.mismatchedTemplates.forEach(item => {
            console.log(`   ${item.id} - ${item.name}:`);
            console.log(`      Resources: ${item.resources.join(', ')}`);
            console.log(`      Output: ${item.output.join(', ')}`);
        });
    }

    // Domain Issues
    if (results.summary.domainIssues.length > 0) {
        console.log('\n⚠️  Domain Consistency Issues:');
        results.summary.domainIssues.slice(0, 10).forEach(item => {
            console.log(`   ${item.id} - ${item.name}: ${item.issue}`);
        });
        if (results.summary.domainIssues.length > 10) {
            console.log(`   ... and ${results.summary.domainIssues.length - 10} more`);
        }
    }

    // Sample of passing subcomponents
    console.log('\n✅ Sample of Passing Subcomponents:');
    results.summary.completeSubcomponents.slice(0, 5).forEach(id => {
        const detail = results.details.find(d => d.id === id);
        console.log(`   ${id} - ${detail.name}: ${detail.checks.resourceTemplates} templates`);
    });

    console.log('\n' + '='.repeat(80));
}

/**
 * Generate detailed HTML report
 */
function generateHTMLReport(results) {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SSOT Audit Report - ${new Date().toLocaleDateString()}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #0a0a0a;
            color: #e0e0e0;
            padding: 40px 20px;
        }
        .container {
            max-width: 1400px;
            margin: 0 auto;
        }
        .header {
            background: linear-gradient(135deg, #FF5500, #FF8800);
            border-radius: 20px;
            padding: 50px;
            margin-bottom: 40px;
            text-align: center;
            box-shadow: 0 10px 40px rgba(255, 85, 0, 0.3);
        }
        .header h1 {
            font-size: 48px;
            color: white;
            margin-bottom: 15px;
            font-weight: 800;
        }
        .header p {
            font-size: 18px;
            color: rgba(255, 255, 255, 0.9);
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 25px;
            margin-bottom: 40px;
        }
        .stat-card {
            background: rgba(255, 255, 255, 0.02);
            border: 2px solid rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 30px;
            text-align: center;
            transition: all 0.3s ease;
        }
        .stat-card:hover {
            transform: translateY(-5px);
            border-color: #FF5500;
            box-shadow: 0 10px 30px rgba(255, 85, 0, 0.2);
        }
        .stat-number {
            font-size: 48px;
            font-weight: 700;
            margin-bottom: 10px;
        }
        .stat-label {
            font-size: 14px;
            color: #999;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .section {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 35px;
            margin-bottom: 30px;
        }
        .section h2 {
            color: #FF5500;
            font-size: 28px;
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 2px solid rgba(255, 85, 0, 0.3);
        }
        .issue-item {
            background: rgba(239, 68, 68, 0.1);
            border-left: 4px solid #EF4444;
            padding: 20px;
            margin-bottom: 15px;
            border-radius: 8px;
        }
        .warning-item {
            background: rgba(245, 158, 11, 0.1);
            border-left: 4px solid #F59E0B;
            padding: 20px;
            margin-bottom: 15px;
            border-radius: 8px;
        }
        .success-item {
            background: rgba(76, 175, 80, 0.1);
            border-left: 4px solid #4CAF50;
            padding: 20px;
            margin-bottom: 15px;
            border-radius: 8px;
        }
        .item-header {
            font-weight: 600;
            margin-bottom: 10px;
            font-size: 16px;
        }
        .item-details {
            font-size: 14px;
            color: #b0b0b0;
            line-height: 1.6;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            padding: 15px;
            text-align: left;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        th {
            background: rgba(255, 85, 0, 0.1);
            color: #FF5500;
            font-weight: 600;
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: 1px;
        }
        tr:hover {
            background: rgba(255, 255, 255, 0.02);
        }
        .status-pass { color: #4CAF50; font-weight: 600; }
        .status-fail { color: #EF4444; font-weight: 600; }
        .status-warning { color: #F59E0B; font-weight: 600; }
        .filter-buttons {
            display: flex;
            gap: 15px;
            margin-bottom: 25px;
            flex-wrap: wrap;
        }
        .filter-btn {
            background: rgba(255, 255, 255, 0.05);
            border: 2px solid rgba(255, 255, 255, 0.2);
            color: #fff;
            padding: 10px 20px;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 600;
        }
        .filter-btn:hover, .filter-btn.active {
            background: #FF5500;
            border-color: #FF5500;
        }
        .hidden { display: none; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📋 SSOT Audit Report</h1>
            <p>Comprehensive analysis of all ${results.totalSubcomponents} subcomponents</p>
            <p style="margin-top: 10px; font-size: 14px;">Generated: ${new Date(results.timestamp).toLocaleString()}</p>
        </div>

        <!-- Summary Statistics -->
        <div class="stats">
            <div class="stat-card">
                <div class="stat-number" style="color: #4CAF50;">${results.passed}</div>
                <div class="stat-label">Passed</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" style="color: #EF4444;">${results.failed}</div>
                <div class="stat-label">Failed</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" style="color: #F59E0B;">${results.warnings}</div>
                <div class="stat-label">Warnings</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" style="color: #2196F3;">${Math.round(results.passed/results.totalSubcomponents*100)}%</div>
                <div class="stat-label">Success Rate</div>
            </div>
        </div>

        <!-- Critical Issues -->
        ${results.summary.missingTemplates.length > 0 ? `
        <div class="section">
            <h2>❌ Critical: Missing Templates (${results.summary.missingTemplates.length})</h2>
            ${results.summary.missingTemplates.map(item => `
                <div class="issue-item">
                    <div class="item-header">${item.id} - ${item.name}</div>
                    <div class="item-details">
                        Resources: ${item.resourceCount} templates | Output: ${item.outputCount} templates
                    </div>
                </div>
            `).join('')}
        </div>
        ` : ''}

        <!-- Template Mismatches -->
        ${results.summary.mismatchedTemplates.length > 0 ? `
        <div class="section">
            <h2>⚠️ Template Mismatches (${results.summary.mismatchedTemplates.length})</h2>
            ${results.summary.mismatchedTemplates.map(item => `
                <div class="warning-item">
                    <div class="item-header">${item.id} - ${item.name}</div>
                    <div class="item-details">
                        <strong>Resources:</strong> ${item.resources.join(', ')}<br>
                        <strong>Output:</strong> ${item.output.join(', ')}
                    </div>
                </div>
            `).join('')}
        </div>
        ` : ''}

        <!-- Detailed Results Table -->
        <div class="section">
            <h2>📊 Detailed Audit Results</h2>
            
            <div class="filter-buttons">
                <button class="filter-btn active" onclick="filterResults('all')">All (${results.totalSubcomponents})</button>
                <button class="filter-btn" onclick="filterResults('pass')">✅ Passed (${results.passed})</button>
                <button class="filter-btn" onclick="filterResults('fail')">❌ Failed (${results.failed})</button>
                <button class="filter-btn" onclick="filterResults('warning')">⚠️ Warnings (${results.warnings})</button>
            </div>

            <table id="results-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Block</th>
                        <th>Phase</th>
                        <th>Status</th>
                        <th>Resources</th>
                        <th>Output</th>
                        <th>Issues</th>
                    </tr>
                </thead>
                <tbody>
                    ${results.details.map(result => `
                        <tr class="result-row" data-status="${result.status.toLowerCase()}">
                            <td><strong>${result.id}</strong></td>
                            <td>${result.name}</td>
                            <td>${result.blockName}</td>
                            <td>Phase ${result.phase}</td>
                            <td class="status-${result.status.toLowerCase()}">${result.status}</td>
                            <td>${result.checks.resourceTemplates}</td>
                            <td>${result.checks.outputTemplates}</td>
                            <td>
                                ${result.issues.length > 0 ? `<span style="color: #EF4444;">${result.issues.length} issues</span>` : ''}
                                ${result.warnings.length > 0 ? `<span style="color: #F59E0B;">${result.warnings.length} warnings</span>` : ''}
                                ${result.issues.length === 0 && result.warnings.length === 0 ? '<span style="color: #4CAF50;">None</span>' : ''}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>

        <!-- Template Distribution Analysis -->
        <div class="section">
            <h2>📈 Template Distribution Analysis</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 20px;">
                ${generateTemplateDistribution(results)}
            </div>
        </div>
    </div>

    <script>
        function filterResults(status) {
            const rows = document.querySelectorAll('.result-row');
            const buttons = document.querySelectorAll('.filter-btn');
            
            buttons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            
            rows.forEach(row => {
                if (status === 'all' || row.dataset.status === status) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        }
    </script>
</body>
</html>`;

    return html;
}

/**
 * Generate template distribution chart data
 */
function generateTemplateDistribution(results) {
    const distribution = {};
    
    results.details.forEach(result => {
        const count = result.checks.resourceTemplates;
        distribution[count] = (distribution[count] || 0) + 1;
    });

    return Object.entries(distribution)
        .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
        .map(([count, total]) => {
            const percentage = Math.round(total / results.totalSubcomponents * 100);
            return `
                <div style="
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    padding: 25px;
                    text-align: center;
                ">
                    <div style="font-size: 36px; font-weight: 700; color: ${count >= 3 ? '#4CAF50' : '#F59E0B'}; margin-bottom: 10px;">
                        ${total}
                    </div>
                    <div style="font-size: 14px; color: #999; margin-bottom: 5px;">
                        subcomponents with
                    </div>
                    <div style="font-size: 24px; font-weight: 600; color: #FF5500;">
                        ${count} templates
                    </div>
                    <div style="font-size: 12px; color: #666; margin-top: 10px;">
                        ${percentage}% of total
                    </div>
                </div>
            `;
        }).join('');
}

/**
 * Generate JSON report for programmatic access
 */
function generateJSONReport(results) {
    return JSON.stringify(results, null, 2);
}

/**
 * Main execution
 */
function main() {
    console.log('🚀 SSOT Comprehensive Audit Tool');
    console.log('📅 ' + new Date().toLocaleString());
    console.log('');

    // Run the audit
    const results = runCompleteAudit();

    // Print console report
    printConsoleReport(results);

    // Generate HTML report
    const htmlReport = generateHTMLReport(results);
    const htmlPath = path.join(__dirname, 'ssot-audit-report.html');
    fs.writeFileSync(htmlPath, htmlReport);
    console.log(`\n📄 HTML Report saved to: ${htmlPath}`);

    // Generate JSON report
    const jsonReport = generateJSONReport(results);
    const jsonPath = path.join(__dirname, 'ssot-audit-report.json');
    fs.writeFileSync(jsonPath, jsonReport);
    console.log(`📄 JSON Report saved to: ${jsonPath}`);

    // Generate summary for quick reference
    const summary = {
        timestamp: results.timestamp,
        total: results.totalSubcomponents,
        passed: results.passed,
        failed: results.failed,
        warnings: results.warnings,
        successRate: `${Math.round(results.passed/results.totalSubcomponents*100)}%`,
        criticalIssues: {
            missingTemplates: results.summary.missingTemplates.length,
            mismatchedTemplates: results.summary.mismatchedTemplates.length,
            domainIssues: results.summary.domainIssues.length
        },
        topIssues: [
            ...results.summary.missingTemplates.slice(0, 5).map(i => `${i.id}: Missing templates`),
            ...results.summary.mismatchedTemplates.slice(0, 5).map(i => `${i.id}: Template mismatch`)
        ]
    };

    const summaryPath = path.join(__dirname, 'ssot-audit-summary.json');
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
    console.log(`📄 Summary saved to: ${summaryPath}`);

    console.log('\n✅ Audit complete!');
    console.log(`\n📊 Quick Summary:`);
    console.log(`   Total: ${summary.total} subcomponents`);
    console.log(`   Passed: ${summary.passed} (${summary.successRate})`);
    console.log(`   Failed: ${summary.failed}`);
    console.log(`   Warnings: ${summary.warnings}`);
    
    if (results.failed > 0 || results.warnings > 0) {
        console.log(`\n⚠️  Action Required: Review the HTML report for detailed findings`);
    } else {
        console.log(`\n🎉 All subcomponents passed the audit!`);
    }

    return results;
}

// Run if executed directly
if (require.main === module) {
    main();
}

// Export for use in other scripts
module.exports = {
    runCompleteAudit,
    auditSubcomponent,
    generateHTMLReport,
    generateJSONReport
};
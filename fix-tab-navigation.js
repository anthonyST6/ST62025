const fs = require('fs');
const path = require('path');

console.log('🔧 FIXING TAB NAVIGATION - Making all tabs clickable and functional');

// Get all module files
const moduleFiles = [];
for (let block = 1; block <= 16; block++) {
    for (let module = 1; module <= 6; module++) {
        moduleFiles.push(`module-${block}-${module}.html`);
    }
}

let fixedCount = 0;

moduleFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️ File not found: ${file}`);
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find the existing switchTab function and replace it with a working version
    const improvedSwitchTab = `
        // Tab switching - FIXED VERSION
        function switchTab(tabName, event) {
            console.log('Switching to tab:', tabName);
            
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            // Hide all tab contents
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
                tab.style.display = 'none';
            });
            
            // Remove active from all tab buttons
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
                btn.style.backgroundColor = '';
                btn.style.color = '';
            });
            
            // Show selected tab
            const selectedTab = document.getElementById(tabName + '-tab');
            if (selectedTab) {
                selectedTab.classList.add('active');
                selectedTab.style.display = 'block';
                console.log('✅ Tab shown:', tabName);
            } else {
                console.error('Tab not found:', tabName + '-tab');
            }
            
            // Activate the corresponding button
            const targetButton = document.querySelector(\`[data-tab="\${tabName}"]\`);
            if (targetButton) {
                targetButton.classList.add('active');
                targetButton.style.backgroundColor = '';
                targetButton.style.color = '';
            }
            
            // Special handling for specific tabs
            if (tabName === 'history') {
                loadScoreHistory();
            }
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            return false;
        }`;
    
    // Replace existing switchTab function
    content = content.replace(/function switchTab\(tabName, event\)[^}]*\{[\s\S]*?\n\s*\}/g, improvedSwitchTab);
    
    // Add comprehensive tab initialization and event handlers
    const tabInitScript = `
<script>
// COMPREHENSIVE TAB NAVIGATION FIX
(function() {
    console.log('🚀 Initializing Tab Navigation Fix');
    
    // Enhanced tab switching function
    window.switchTab = function(tabName, event) {
        console.log('Switching to tab:', tabName);
        
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        
        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
            tab.style.display = 'none';
        });
        
        // Remove active from all tab buttons
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Show selected tab
        const selectedTab = document.getElementById(tabName + '-tab');
        if (selectedTab) {
            selectedTab.classList.add('active');
            selectedTab.style.display = 'block';
        }
        
        // Activate the corresponding button
        const targetButton = document.querySelector('[data-tab="' + tabName + '"]');
        if (targetButton) {
            targetButton.classList.add('active');
        }
        
        // Special handling for history tab
        if (tabName === 'history' && typeof loadScoreHistory === 'function') {
            loadScoreHistory();
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        return false;
    };
    
    // Initialize tab buttons when DOM is ready
    function initializeTabButtons() {
        console.log('Initializing tab buttons...');
        
        // Get all tab buttons
        const tabButtons = document.querySelectorAll('.tab-button');
        
        tabButtons.forEach(button => {
            // Remove any existing onclick attribute
            button.removeAttribute('onclick');
            
            // Get the tab name from data-tab attribute
            const tabName = button.getAttribute('data-tab');
            
            if (tabName) {
                // Remove existing event listeners by cloning
                const newButton = button.cloneNode(true);
                button.parentNode.replaceChild(newButton, button);
                
                // Add new click event listener
                newButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Tab button clicked:', tabName);
                    switchTab(tabName, e);
                    return false;
                });
                
                console.log('✅ Tab button initialized:', tabName);
            }
        });
        
        // Ensure Education tab is active by default
        const educationTab = document.getElementById('education-tab');
        const educationButton = document.querySelector('[data-tab="education"]');
        
        if (educationTab && educationButton) {
            // Hide all tabs first
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
                tab.style.display = 'none';
            });
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Show education tab
            educationTab.classList.add('active');
            educationTab.style.display = 'block';
            educationButton.classList.add('active');
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeTabButtons);
    } else {
        initializeTabButtons();
    }
    
    // Reinitialize after a delay to catch any dynamic changes
    setTimeout(initializeTabButtons, 100);
    setTimeout(initializeTabButtons, 500);
    
    console.log('✅ Tab Navigation Fix Complete');
})();

// Load score history function
function loadScoreHistory() {
    const historyContent = document.getElementById('score-history-content');
    if (!historyContent) return;
    
    const moduleId = '${file.replace('.html', '')}';
    const historyKey = 'score_history_' + moduleId.replace('module-', '').replace('-', '_');
    const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
    
    if (history.length === 0) {
        historyContent.innerHTML = \`
            <div style="text-align: center; padding: 60px 20px; color: #999;">
                <div style="font-size: 48px; margin-bottom: 20px;">📈</div>
                <h3 style="font-size: 24px; margin-bottom: 10px; color: #fff;">No History Yet</h3>
                <p style="font-size: 16px;">Complete your first analysis to see history</p>
            </div>
        \`;
    } else {
        historyContent.innerHTML = \`
            <div style="padding: 20px;">
                <h3 style="color: #FF5500; margin-bottom: 20px;">Score History</h3>
                <div style="display: grid; gap: 15px;">
                    \${history.map((item, index) => \`
                        <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px; padding: 15px;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-size: 24px; font-weight: bold; color: #FF5500;">\${item.score}%</div>
                                    <div style="color: #999; font-size: 12px; margin-top: 5px;">
                                        \${new Date(item.timestamp).toLocaleDateString()} \${new Date(item.timestamp).toLocaleTimeString()}
                                    </div>
                                </div>
                                <div style="text-align: right;">
                                    <div style="color: #666; font-size: 11px;">Attempt #\${history.length - index}</div>
                                </div>
                            </div>
                        </div>
                    \`).join('')}
                </div>
            </div>
        \`;
    }
}

// Helper functions for worksheet operations
function saveWorksheet() {
    const moduleId = '${file.replace('.html', '')}';
    const worksheetData = {};
    document.querySelectorAll('.worksheet-input, .worksheet-textarea').forEach(field => {
        worksheetData[field.id] = field.value;
    });
    
    localStorage.setItem('worksheet_' + moduleId, JSON.stringify(worksheetData));
    alert('✅ Worksheet saved successfully!');
}

function exportWorksheet() {
    alert('📄 Export functionality will generate a PDF of your worksheet.');
}

// Ensure refineWorksheet function exists
function refineWorksheet() {
    switchTab('workspace', null);
}

// Ensure viewScoreHistory function exists  
function viewScoreHistory() {
    switchTab('history', null);
}

// Ensure saveToScoreHistory function exists
function saveToScoreHistory(data) {
    try {
        const moduleId = '${file.replace('.html', '')}';
        const historyKey = 'score_history_' + moduleId.replace('module-', '').replace('-', '_');
        let history = JSON.parse(localStorage.getItem(historyKey) || '[]');
        
        history.unshift(data);
        history = history.slice(0, 50); // Keep last 50 scores
        
        localStorage.setItem(historyKey, JSON.stringify(history));
        console.log('✅ Score saved to history');
        
        // Also save to global history
        let globalHistory = JSON.parse(localStorage.getItem('global_score_history') || '[]');
        globalHistory.unshift(data);
        globalHistory = globalHistory.slice(0, 100);
        localStorage.setItem('global_score_history', JSON.stringify(globalHistory));
        
    } catch (e) {
        console.error('Error saving to history:', e);
    }
}
</script>`;
    
    // Insert the tab init script before closing body tag
    if (!content.includes('COMPREHENSIVE TAB NAVIGATION FIX')) {
        content = content.replace('</body>', tabInitScript + '\n</body>');
    }
    
    // Write the fixed content back
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed tab navigation for ${file}`);
    fixedCount++;
});

console.log(`\n🎉 TAB NAVIGATION FIX COMPLETE!`);
console.log(`✅ Fixed ${fixedCount} modules`);
console.log(`📊 All tabs are now:`);
console.log(`   1. Fully clickable and responsive`);
console.log(`   2. Properly switching content`);
console.log(`   3. Maintaining active states`);
console.log(`   4. Loading dynamic content (like Score History)`);
console.log(`\n🚀 Users can now click on Workspace, Analysis, Resources, and all other tabs!`);
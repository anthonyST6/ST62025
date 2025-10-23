/**
 * Fix Workspace Buttons
 * 
 * 1. Remove "Share Results" button from Analysis tab
 * 2. Make "Export as PDF" button work in Workspace tab
 * 3. Ensure "Save Progress" button works properly
 */

(function() {
    'use strict';
    
    console.log('🔧 Fixing Workspace Buttons...');
    
    // ============================================
    // FIX 1: Remove Share Results Button from Analysis Tab
    // ============================================
    
    // Override the displayEnhancedAnalysisResults function to remove Share button
    const originalDisplayFunction = window.displayEnhancedAnalysisResults;
    
    window.displayEnhancedAnalysisResults = function(analysisData, displayMode = 'comprehensive') {
        // Call original function first
        if (originalDisplayFunction) {
            originalDisplayFunction(analysisData, displayMode);
        }
        
        // Remove the Share Results button after rendering
        setTimeout(() => {
            const analysisContent = document.getElementById('analysis-content');
            if (analysisContent) {
                // Find and remove all Share buttons
                const shareButtons = analysisContent.querySelectorAll('button');
                shareButtons.forEach(button => {
                    if (button.textContent.includes('Share Results') || 
                        button.textContent.includes('🔗')) {
                        console.log('✅ Removing Share Results button');
                        button.remove();
                    }
                });
            }
        }, 100);
    };
    
    // ============================================
    // FIX 2: Make Export as PDF Button Work in Workspace Tab
    // ============================================
    
    window.exportWorksheet = function() {
        console.log('📄 Exporting worksheet as PDF...');
        
        try {
            // Get subcomponent ID
            const urlParams = new URLSearchParams(window.location.search);
            const subcomponentId = urlParams.get('id') || '1-1';
            
            // Collect workspace data
            const workspaceData = {};
            const inputs = document.querySelectorAll('#workspace-tab input, #workspace-tab textarea, #dynamic-worksheet-container input, #dynamic-worksheet-container textarea');
            
            inputs.forEach(input => {
                if (input.id && input.value) {
                    workspaceData[input.id] = {
                        question: input.previousElementSibling?.textContent || input.placeholder || input.id,
                        answer: input.value
                    };
                }
            });
            
            // Get subcomponent title
            const title = document.getElementById('subcomponent-title')?.textContent || 'Worksheet';
            
            // Check if PDF generator is available
            if (window.generateWorksheetPDF) {
                console.log('✅ Using PDF generator');
                window.generateWorksheetPDF(subcomponentId, title, workspaceData);
            } else if (window.jsPDF) {
                // Use jsPDF directly if available
                console.log('✅ Using jsPDF directly');
                generatePDFDirectly(title, workspaceData);
            } else {
                // Fallback to HTML download
                console.log('⚠️ PDF libraries not available, using HTML fallback');
                exportAsHTML(title, workspaceData);
            }
            
            // Show success notification
            showNotification('✅ Worksheet exported successfully!', 'success');
            
        } catch (error) {
            console.error('❌ Error exporting worksheet:', error);
            showNotification('❌ Error exporting worksheet', 'error');
        }
    };
    
    // Generate PDF directly using jsPDF
    function generatePDFDirectly(title, workspaceData) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Add title
        doc.setFontSize(20);
        doc.setTextColor(255, 85, 0); // ScaleOps6 orange
        doc.text(title, 20, 20);
        
        // Add subtitle
        doc.setFontSize(12);
        doc.setTextColor(100, 100, 100);
        doc.text('ScaleOps6 Worksheet Export', 20, 30);
        doc.text(new Date().toLocaleDateString(), 20, 37);
        
        // Add content
        let yPosition = 50;
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        
        Object.entries(workspaceData).forEach(([id, data]) => {
            // Question
            doc.setFont(undefined, 'bold');
            doc.text(data.question, 20, yPosition);
            yPosition += 7;
            
            // Answer
            doc.setFont(undefined, 'normal');
            const lines = doc.splitTextToSize(data.answer, 170);
            doc.text(lines, 20, yPosition);
            yPosition += (lines.length * 7) + 10;
            
            // Check if we need a new page
            if (yPosition > 270) {
                doc.addPage();
                yPosition = 20;
            }
        });
        
        // Save the PDF
        doc.save(`${title.replace(/\s+/g, '_')}_Worksheet.pdf`);
    }
    
    // Fallback to HTML export
    function exportAsHTML(title, workspaceData) {
        let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${title} - Worksheet</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; }
        h1 { color: #FF5500; }
        .question { font-weight: bold; margin-top: 20px; color: #333; }
        .answer { margin: 10px 0 20px 20px; padding: 10px; background: #f5f5f5; border-left: 3px solid #FF5500; }
    </style>
</head>
<body>
    <h1>${title}</h1>
    <p><strong>ScaleOps6 Worksheet Export</strong></p>
    <p>${new Date().toLocaleDateString()}</p>
    <hr>
`;
        
        Object.entries(workspaceData).forEach(([id, data]) => {
            html += `
    <div class="question">${data.question}</div>
    <div class="answer">${data.answer}</div>
`;
        });
        
        html += `
</body>
</html>`;
        
        // Create and download HTML file
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title.replace(/\s+/g, '_')}_Worksheet.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    // ============================================
    // FIX 3: Ensure Save Progress Button Works
    // ============================================
    
    window.saveWorksheet = function() {
        console.log('💾 Saving worksheet progress...');
        
        try {
            // Get subcomponent ID
            const urlParams = new URLSearchParams(window.location.search);
            const subcomponentId = urlParams.get('id') || '1-1';
            
            // Collect all input data
            const workspaceData = {};
            const inputs = document.querySelectorAll('#workspace-tab input, #workspace-tab textarea, #dynamic-worksheet-container input, #dynamic-worksheet-container textarea');
            
            inputs.forEach(input => {
                if (input.id) {
                    workspaceData[input.id] = input.value;
                }
            });
            
            // Save to localStorage
            const storageKey = `worksheet_${subcomponentId}`;
            localStorage.setItem(storageKey, JSON.stringify({
                data: workspaceData,
                timestamp: new Date().toISOString(),
                subcomponentId: subcomponentId
            }));
            
            console.log('✅ Worksheet saved successfully');
            showNotification('✅ Progress saved successfully!', 'success');
            
            return true;
        } catch (error) {
            console.error('❌ Error saving worksheet:', error);
            showNotification('❌ Error saving progress', 'error');
            return false;
        }
    };
    
    // ============================================
    // UTILITY: Show Notification
    // ============================================
    
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'linear-gradient(135deg, #4CAF50, #66BB6A)' : 
                         type === 'error' ? 'linear-gradient(135deg, #F44336, #E57373)' : 
                         'linear-gradient(135deg, #2196F3, #64B5F6)'};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            font-weight: 600;
            font-size: 14px;
            animation: slideIn 0.3s ease-out;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Add animation styles
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(400px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(400px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    console.log('✅ Workspace buttons fixed successfully');
    console.log('   - Share Results button will be removed from Analysis tab');
    console.log('   - Export as PDF button now works in Workspace tab');
    console.log('   - Save Progress button enhanced with notifications');
    
})();